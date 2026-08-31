import Dexie from 'dexie';

// ---------------------------------------------------------------------------
// Local persistence schema.
//
// Tables:
//   meta            — single row holding whole-app state (xp, streak, dates)
//   lessonProgress   — one row per lesson (mastery, best score, attempts)
//   writingEntries   — one row per journal/prompt submission (Phase 5).
//                      Skill prompts (paragraph, essay, etc.) keep only the
//                      latest submission per promptId in practice; project
//                      prompts (mission reports, space journal, etc.) are
//                      recurring — multiple rows per promptId over time,
//                      ordered by completedAt, forming an actual journal.
//   typingScores     — one row per typing passage, tracks personal-best WPM.
//
// v2 (deferred): when Supabase cloud sync is added, these same tables become
// the local cache that syncs up/down. Keep row shapes flat and JSON-safe now
// so that migration doesn't require a schema rewrite later.
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ONE DATABASE PER ACADEMY (LearningOS step 1, Aug 31 2026)
//
// `db` used to be created here, on this line, at module load:
//
//     export const db = new Dexie('OneFixedDatabaseName');
//
// It is now created by openAcademy(), after sign-in, against a name that
// belongs to one learner. Records separate by DATABASE; content separates by
// directory (src/academies/<id>/). See docs/LEARNINGOS_PACK_SPEC.md §3.
//
// This file is the only place a Dexie instance is constructed. The 136 helpers
// below all reach the database through the module-scoped `db` binding, so
// changing what `db` points at moves all of them at once — which is the whole
// reason this was one line of work instead of forty call sites.
//
// ---- WHY A RECORDER, AND NOT A defineSchema() FUNCTION ----
//
// The obvious move is to wrap the 35 version blocks in a function and call it
// after constructing the Dexie. It doesn't work here: the version blocks are
// NOT contiguous. They are interleaved with the helper functions that use
// them — v16 at line ~434, four Khan helpers, then v17, then eight admin
// helpers, then v18 — deliberately, so that each table's schema sits next to
// the code that reads it, with the note explaining why the version exists.
// Gathering them would flatten a file whose ordering is its documentation.
//
// So `db` starts as a RECORDER. The `db.version(n).stores({…})` and
// `db.on(…)` statements below execute exactly as written, unmoved and
// unreindented, but they write into a list instead of onto a connection.
// openAcademy() then replays that list, in order, onto the real Dexie.
//
// This also keeps the check scripts working: several of them read this file as
// TEXT and regex out the latest `db.version(n).stores({` block
// (verify-export-completeness.mjs, verify-handoff.mjs, generate-status.mjs).
// The text they parse is unchanged.
//
// THE ONE REAL COST: `db` is not a database at module load. Anything that
// touches a TABLE before openAcademy() runs is a boot-ordering bug, and the
// recorder makes that bug say so by name instead of throwing
// "cannot read properties of undefined".
// ---------------------------------------------------------------------------

/** Recorded by the `db.version(n)` statements below. @type {{n:number, stores:object|null, upgrade:Function|null}[]} */
const schemaVersions = [];

/** Recorded by the `db.on(...)` statements below. @type {{event:string, handler:Function}[]} */
const connectionHandlers = [];

/**
 * What `db` is before an Academy is open.
 *
 * `version` and `on` record. Every other property — every table name, every
 * Dexie method — throws, and says what went wrong, what to do about it, and
 * which property was reached for. The alternative was `null`, which produces
 * "Cannot read properties of null (reading 'meta')" six frames from the actual
 * mistake.
 */
const SCHEMA_RECORDER = new Proxy(
  {},
  {
    get(_target, prop) {
      if (prop === 'version') {
        return (n) => {
          const entry = { n, stores: null, upgrade: null };
          schemaVersions.push(entry);
          const chain = {
            stores(defs) {
              entry.stores = defs;
              return chain;
            },
            upgrade(fn) {
              entry.upgrade = fn;
              return chain;
            }
          };
          return chain;
        };
      }
      if (prop === 'on') {
        return (event, handler) => {
          connectionHandlers.push({ event, handler });
        };
      }
      if (prop === 'then') return undefined; // so `await db` doesn't detonate
      if (prop === Symbol.toStringTag) return 'NoAcademyOpen';
      if (prop === Symbol.toPrimitive || prop === 'toString') {
        return () => '[LearningOS: no Academy database is open]';
      }
      throw new Error(
        `LearningOS: the database was used before an Academy was opened ` +
          `(reached for "${String(prop)}"). openAcademy(academyId, dbName) must ` +
          `run after sign-in and before any db helper — see src/FrontDoorGate.jsx.`
      );
    }
  }
);

export let db = SCHEMA_RECORDER;

/** The id of the Academy currently open, or null. */
let openAcademyId = null;

/** @returns {string|null} the Academy this connection belongs to. */
export function currentAcademyId() {
  return openAcademyId;
}

/** @returns {boolean} whether openAcademy() has run. */
export function isAcademyOpen() {
  return db !== SCHEMA_RECORDER;
}

/**
 * Open one Academy's database and declare the recorded schema against it.
 *
 * `dbName` is passed in rather than derived, so that an import can point a new
 * Academy at a database that already exists under some other name — which is
 * how an existing school's records are read without being moved. The naming
 * rules live in src/academies/registry.js; this function does not guess.
 *
 * Idempotent for the same Academy — calling it twice returns the same
 * connection. Calling it for a DIFFERENT Academy closes the first, which is
 * what a sign-out and sign-in has to do.
 *
 * Synchronous: Dexie does not touch IndexedDB until the first query, so this
 * declares and returns.
 */
export function openAcademy(academyId, dbName) {
  if (!academyId) throw new Error('openAcademy: academyId is required');
  if (!dbName) throw new Error(`openAcademy: no database name given for "${academyId}"`);
  if (schemaVersions.length === 0) {
    // Would produce a connection with no tables, which fails later and
    // further away. Only reachable if this file stops declaring its schema.
    throw new Error('openAcademy: no schema versions were recorded — db.js declared no versions.');
  }

  if (openAcademyId === academyId && isAcademyOpen()) return db;

  if (isAcademyOpen()) {
    try {
      db.close();
    } catch {
      /* closing a connection that was never opened is not worth surfacing */
    }
  }

  db = new Dexie(dbName);
  openAcademyId = academyId;

  for (const { event, handler } of connectionHandlers) {
    db.on(event, handler);
  }
  for (const { n, stores, upgrade } of schemaVersions) {
    let chain = db.version(n);
    if (stores) chain = chain.stores(stores);
    if (upgrade) chain.upgrade(upgrade);
  }

  return db;
}

/**
 * Close the current Academy and put `db` back to the recorder. Sign-out.
 *
 * The recorded schema is kept — it was captured once at module load and is the
 * same for every Academy. The next openAcademy() replays it onto a new
 * connection.
 */
export function closeAcademy() {
  if (isAcademyOpen()) {
    try {
      db.close();
    } catch {
      /* as above */
    }
  }
  db = SCHEMA_RECORDER;
  openAcademyId = null;
}

// ---------------------------------------------------------------------------
// Failure-visibility handlers (Batch A, Aug 2026). Neither fires in normal
// use; both used to fail SILENTLY as an endless "Loading mission data…"
// screen with no explanation:
//   'blocked'       — this tab wants to upgrade the schema (26 versions
//                     below) but an older tab still holds the database
//                     open. The fix is always: close the other tab.
//   'versionchange' — another tab upgraded the schema while this one was
//                     open; this connection must close, and a reload gets
//                     this tab onto the new schema cleanly.
// Each dispatches a browser event App.jsx listens for, so the parent sees
// what actually happened and what to do about it.
// ---------------------------------------------------------------------------
db.on('blocked', () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('mc-db-blocked'));
  }
});
db.on('versionchange', () => {
  db.close();
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('mc-db-versionchange'));
  }
});

db.version(1).stores({
  meta: 'id',
  lessonProgress: 'lessonId'
});

db.version(2).stores({
  meta: 'id',
  lessonProgress: 'lessonId',
  writingEntries: '++id, promptId, completedAt',
  typingScores: 'passageId'
});

db.version(3).stores({
  meta: 'id',
  lessonProgress: 'lessonId',
  writingEntries: '++id, promptId, completedAt',
  typingScores: 'passageId',
  weeklyWordState: 'skill'
});

db.version(4).stores({
  meta: 'id',
  lessonProgress: 'lessonId',
  writingEntries: '++id, promptId, completedAt',
  typingScores: 'passageId',
  weeklyWordState: 'skill',
  schedule: 'id'
});

db.version(5).stores({
  meta: 'id',
  lessonProgress: 'lessonId',
  writingEntries: '++id, promptId, completedAt',
  typingScores: 'passageId',
  weeklyWordState: 'skill',
  schedule: 'id',
  typingLessonProgress: 'lessonId'
});

db.version(6).stores({
  meta: 'id',
  lessonProgress: 'lessonId',
  writingEntries: '++id, promptId, completedAt',
  typingScores: 'passageId',
  weeklyWordState: 'skill',
  schedule: 'id',
  typingLessonProgress: 'lessonId',
  attendance: 'date'
});

db.version(7).stores({
  meta: 'id',
  lessonProgress: 'lessonId',
  writingEntries: '++id, promptId, completedAt',
  typingScores: 'passageId',
  weeklyWordState: 'skill',
  schedule: 'id',
  typingLessonProgress: 'lessonId',
  attendance: 'date',
  parentNotes: '++id, createdAt'
});

db.version(8).stores({
  meta: 'id',
  lessonProgress: 'lessonId',
  writingEntries: '++id, promptId, completedAt',
  typingScores: 'passageId',
  weeklyWordState: 'skill',
  schedule: 'id',
  typingLessonProgress: 'lessonId',
  attendance: 'date',
  parentNotes: '++id, createdAt',
  assignments: '++id, dueDate, completed',
  readingLog: '++id, date',
  portfolio: '++id, dateCompleted'
});

db.version(9).stores({
  meta: 'id',
  lessonProgress: 'lessonId',
  writingEntries: '++id, promptId, completedAt',
  typingScores: 'passageId',
  weeklyWordState: 'skill',
  schedule: 'id',
  typingLessonProgress: 'lessonId',
  attendance: 'date',
  parentNotes: '++id, createdAt',
  assignments: '++id, dueDate, completed',
  readingLog: '++id, date',
  portfolio: '++id, dateCompleted',
  ixlCompletions: 'date'
});

db.version(10).stores({
  meta: 'id',
  lessonProgress: 'lessonId',
  writingEntries: '++id, promptId, completedAt',
  typingScores: 'passageId',
  weeklyWordState: 'skill',
  schedule: 'id',
  typingLessonProgress: 'lessonId',
  attendance: 'date',
  parentNotes: '++id, createdAt',
  assignments: '++id, dueDate, completed',
  readingLog: '++id, date',
  portfolio: '++id, dateCompleted',
  ixlCompletions: 'date',
  khanAcademyAssignments: '++id, subject, completed'
});

db.version(11).stores({
  meta: 'id',
  lessonProgress: 'lessonId',
  writingEntries: '++id, promptId, completedAt',
  typingScores: 'passageId',
  weeklyWordState: 'skill',
  schedule: 'id',
  typingLessonProgress: 'lessonId',
  attendance: 'date',
  parentNotes: '++id, createdAt',
  assignments: '++id, dueDate, completed',
  readingLog: '++id, date',
  portfolio: '++id, dateCompleted',
  ixlDiagnosticCheckins: 'date',
  khanAcademyAssignments: '++id, subject, completed'
});
// Note: the old ixlCompletions table (per-subject daily completion,
// retired now that Khan Academy is the actual teacher — see
// PROJECT_PLAN.md) is simply absent from this version's schema. No
// explicit .upgrade() migration is used, since no real user has run
// the app under the old schema yet; Dexie drops tables no longer
// listed in the current version's .stores() automatically.

db.version(12).stores({
  meta: 'id',
  lessonProgress: 'lessonId',
  writingEntries: '++id, promptId, completedAt',
  typingScores: 'passageId',
  weeklyWordState: 'skill',
  schedule: 'id',
  typingLessonProgress: 'lessonId',
  attendance: 'date',
  parentNotes: '++id, createdAt',
  assignments: '++id, dueDate, completed',
  readingLog: '++id, date',
  portfolio: '++id, dateCompleted',
  khanAcademyAssignments: '++id, subject, completed'
});
// IXL has been dropped entirely (parent canceled the subscription —
// not worth $20/month even for diagnostic-only use, see PROJECT_PLAN.md).
// The ixlDiagnosticCheckins table from v11 is retired the same way
// ixlCompletions was in v11 — simply absent from this version's schema.
// Assessment going forward uses free annual/twice-yearly benchmarks
// (ReadTheory, Khan Academy Course Challenges, CK-12) plus quarterly
// project-based Mission Evaluations instead of any recurring diagnostic.

db.version(13).stores({
  meta: 'id',
  lessonProgress: 'lessonId',
  writingEntries: '++id, promptId, completedAt',
  typingScores: 'passageId',
  weeklyWordState: 'skill',
  schedule: 'id',
  typingLessonProgress: 'lessonId',
  attendance: 'date',
  parentNotes: '++id, createdAt',
  assignments: '++id, dueDate, completed',
  readingLog: '++id, date',
  portfolio: '++id, dateCompleted',
  khanAcademyAssignments: '++id, subject, completed',
  reviewSchedule: 'generatorId',
  selfExplanations: '++id, lessonId, completedAt'
});
// Instructional-design audit (Aug 2026, PROJECT_PLAN.md — "Queued fix —
// instructional-design audit"), gaps 1 and 3:
//   reviewSchedule — one row per practice generator (keyed by the same
//     `id` problemTemplates.js already gives each generator, e.g.
//     'gen-fractions-add'), tracking real 1/3/7-day spaced-repetition
//     due dates instead of pure random interleaving. See
//     dailyPractice.js's nextReviewScheduleEntry for the actual interval
//     logic.
//   selfExplanations — one row per "explain this to your guide in
//     your own words" free-text reflection, captured after each lesson
//     beat. Explicitly ungraded (no live AI/API integration exists in
//     this app to evaluate it — see PROJECT_PLAN.md) — stored so the
//     parent can review real reflections later if she wants to, not
//     scored or fed into mastery in any way.

db.version(14).stores({
  meta: 'id',
  lessonProgress: 'lessonId',
  writingEntries: '++id, promptId, completedAt',
  typingScores: 'passageId',
  weeklyWordState: 'skill',
  schedule: 'id',
  typingLessonProgress: 'lessonId',
  attendance: 'date',
  parentNotes: '++id, createdAt',
  assignments: '++id, dueDate, completed',
  readingLog: '++id, date',
  portfolio: '++id, dateCompleted',
  khanAcademyAssignments: '++id, subject, completed',
  reviewSchedule: 'generatorId',
  selfExplanations: '++id, lessonId, completedAt',
  studyCycle: 'key'
});
// The "5-day spaced-retrieval study cycle" (PROJECT_PLAN.md Part 4 —
// named as design-research input, flagged during the full master-plan
// audit as the one item that never got a real build decision, now
// built). One row per subject/quarter with a Quarterly Exam, keyed
// `${subject}::${quarter}` (same composite-key pattern as
// reviewGameCompletions, for the same reason — a plain quarter key
// would let Aerospace and Social Studies collide). Shape: { key,
// subject, quarter, day1CompletedAt, day2CompletedAt,
// day3CompletedAt, day4CompletedAt } — all ISO date strings or
// undefined. See src/lib/studyCycle.js for the day-unlock and
// weak-spot-selection logic.

db.version(15).stores({
  meta: 'id',
  lessonProgress: 'lessonId',
  writingEntries: '++id, promptId, completedAt',
  typingScores: 'passageId',
  weeklyWordState: 'skill',
  schedule: 'id',
  typingLessonProgress: 'lessonId',
  attendance: 'date',
  parentNotes: '++id, createdAt',
  assignments: '++id, dueDate, completed',
  readingLog: '++id, date',
  portfolio: '++id, dateCompleted',
  khanAcademyAssignments: '++id, subject, completed',
  reviewSchedule: 'generatorId',
  selfExplanations: '++id, lessonId, completedAt',
  studyCycle: 'key',
  peBodyMetrics: '++id, date',
  peDailyLog: 'date',
  peWorkoutLog: '++id, date, category',
  peWeeklyGoals: 'weekKey'
});
// PE & Nutrition (PROJECT_PLAN.md Part 4 — "Physical Education" and
// "Nutrition," built as one combined full-year subject, id `pe`, per the
// parent's confirmed scope decision). Four new tables:
//   peBodyMetrics — one row per periodic body-metric check-in (height,
//     weight, and any note), keyed by auto-id since a student may log
//     more than once on the same date in principle. Shape: { id, date,
//     heightIn, weightLb, note, createdAt }. Framed around health/growth
//     tracking only — never surfaced anywhere as an appearance metric.
//   peDailyLog — one row per calendar date, holding every quick-log
//     tracker that's naturally a once-a-day entry: water (oz), protein
//     (grams, self-estimated), sleep (hours), activity minutes, and
//     mood (a small real word, not a numeric "score"). Keyed by `date`
//     directly (not auto-id) since there's exactly one real daily log
//     per day — logging again the same day updates the same row rather
//     than creating a duplicate. Shape: { date, waterOz, proteinG,
//     sleepHours, activityMinutes, mood, updatedAt }.
//   peWorkoutLog — one row per completed workout session (the weekly
//     plan's day-type, which exercises were actually done that day, and
//     when). Multiple rows per date are valid in principle (e.g. a
//     make-up session). Shape: { id, date, category, exerciseIds,
//     completedAt }.
//   peWeeklyGoals — one row per week (keyed by a `weekKey` string, e.g.
//     an ISO year-week like "2026-W32"), holding the student's own
//     real weekly goal text plus whether it was marked achieved. Shape:
//     { weekKey, goalText, achieved, createdAt }. Deliberately free-text
//     rather than a numeric target picker — the framing requirement
//     (health/strength/energy, never appearance) is much easier to keep
//     honest with real student-written goals than with a generic
//     "lose/gain X" number field.
// See src/store/useAppStore.js for the corresponding action functions
// (recordPEBodyMetrics, recordPEDailyLog, recordPEWorkoutCompletion,
// updatePEWeeklyGoal) and src/data/pe/ for the real workout-plan,
// exercise-library, and nutrition content these trackers pair with.

db.version(16).stores({
  meta: 'id',
  lessonProgress: 'lessonId',
  writingEntries: '++id, promptId, completedAt',
  typingScores: 'passageId',
  weeklyWordState: 'skill',
  schedule: 'id',
  typingLessonProgress: 'lessonId',
  attendance: 'date',
  parentNotes: '++id, createdAt',
  assignments: '++id, dueDate, completed',
  readingLog: '++id, date',
  portfolio: '++id, dateCompleted',
  khanAcademyAssignments: '++id, subject, completed',
  reviewSchedule: 'generatorId',
  selfExplanations: '++id, lessonId, completedAt',
  studyCycle: 'key',
  peBodyMetrics: '++id, date',
  peDailyLog: 'date',
  peWorkoutLog: '++id, date, category',
  peWeeklyGoals: 'weekKey',
  academicBooks: '++id, subject, slotId, status',
  academicAssignments: '++id, subject, slotId, quarter, status, dueDate'
});
// Academic Success Center v1 (PROJECT_PLAN.md Part 9 — Books,
// Assignments, Portfolio). Two new tables, both following the exact
// "static seed + persisted override" pattern khanAcademyAssignments
// already uses: src/data/academicSuccessCenter/placeholders.js holds
// the static slot definitions, these tables hold the parent's REAL
// data, and hydrate() seeds a row per `slotId` exactly once (idempotent
// per slot, so extending the seed file later fills in only the new
// slots and never disturbs one she has already filled in).
//   academicBooks — one row per book slot (seeded) or custom book the
//     parent added herself. Shape: { id, subject, slotId (null for a
//     custom book), type ('Required'|'Recommended'|'Optional'|
//     'Reference'), title, author, note (the seed's description of what
//     the slot is FOR — kept even after a real title is entered, since
//     it explains the slot's purpose), status ('empty'|'not-started'|
//     'in-progress'|'completed'), startedAt, completedAt (ISO or null),
//     isCustom (bool), createdAt }. A seeded slot starts at status
//     'empty' with title null — it is NOT a real book until the parent
//     types the real title in. No book title is ever pre-filled or
//     guessed anywhere in this app.
//   academicAssignments — one row per quarterly assignment slot
//     (seeded) or custom assignment the parent added. Shape: { id,
//     subject, slotId (null for custom), quarter (e.g. 'Q1 2026-2027',
//     matching the batchLabel format from schoolQuarter.js), type (one
//     of ACADEMIC_ASSIGNMENT_TYPES), title, note (the seed's intent
//     description), dueDate ('YYYY-MM-DD' local-timezone string or
//     null — see lib/scheduler.js's toDateStr/parseDateStr; never
//     toISOString()), status ('placeholder'|'not-started'|'in-progress'|
//     'completed'), grade (letter grade or null until the parent grades
//     it, same manual A-F model as Khan Academy assignments and Writing
//     Journal entries — there is no automated way to score a real book
//     report), startedAt, completedAt, gradedAt, isCustom, createdAt }.
//     'placeholder' means the slot exists but has no real title yet, so
//     it is deliberately NOT shown to the student as work — the same
//     honesty rule the old preview-only version enforced.

/**
 * Khan Academy Assignments — one row per individual skill (not per
 * subject/day like ixlCompletions), since Khan Academy is now the actual
 * teacher for Math/Reading/Writing/Science and each skill is completed
 * once, not daily. Rebuilt from a fresh IXL Diagnostic Action Plan
 * roughly every 3-4 weeks — old completed rows are kept for gradebook
 * history, not deleted when a new batch is added.
 *
 * Shape: { id, subject ('math'|'reading'|'writing'|'science'),
 *   skillTitle, gradeLevel, khanAcademyUrl, completed (bool),
 *   grade (letter grade string or null until graded), completedAt
 *   (ISO date or null), createdAt (ISO date), batchLabel (e.g.
 *   "Month 1 — July 2026") }
 */
export async function loadAllKhanAcademyAssignments() {
  return db.khanAcademyAssignments.toArray();
}

export async function addKhanAcademyAssignmentRecord(record) {
  return db.khanAcademyAssignments.add(record);
}

export async function updateKhanAcademyAssignmentRecord(id, changes) {
  const existing = await db.khanAcademyAssignments.get(id);
  return db.khanAcademyAssignments.put({ ...existing, ...changes, id });
}

export async function deleteKhanAcademyAssignmentRecord(id) {
  return db.khanAcademyAssignments.delete(id);
}

db.version(17).stores({
  meta: 'id',
  lessonProgress: 'lessonId',
  writingEntries: '++id, promptId, completedAt',
  typingScores: 'passageId',
  weeklyWordState: 'skill',
  schedule: 'id',
  typingLessonProgress: 'lessonId',
  attendance: 'date',
  parentNotes: '++id, createdAt',
  assignments: '++id, dueDate, completed',
  readingLog: '++id, date',
  portfolio: '++id, dateCompleted',
  khanAcademyAssignments: '++id, subject, completed',
  reviewSchedule: 'generatorId',
  selfExplanations: '++id, lessonId, completedAt',
  studyCycle: 'key',
  peBodyMetrics: '++id, date',
  peDailyLog: 'date',
  peWorkoutLog: '++id, date, category',
  peWeeklyGoals: 'weekKey',
  academicBooks: '++id, subject, slotId, status',
  academicAssignments: '++id, subject, slotId, quarter, status, dueDate',
  adminRecords: '++id, kind, date',
  courseDescriptions: 'subject',
  complianceChecks: 'key'
});
// Homeschool Administration (PROJECT_PLAN.md Part 8). Three tables:
//   adminRecords — ONE table for every dated administrative record
//     rather than five near-identical ones. Part 8 lists Field trip log,
//     Volunteer/service hours, Extracurricular activities, Awards and
//     certificates, and Standardized test records as separate items, but
//     they are the same shape: a dated entry with a title, a note, and
//     one type-specific number (hours for service, a score for a test).
//     Five tables would be five sets of actions, five UI blocks and five
//     places for the export to forget one. Shape: { id, kind
//     ('field-trip'|'volunteer'|'extracurricular'|'award'|'test'), date
//     ('YYYY-MM-DD' local), title, detail, hours, subject, createdAt }.
//   courseDescriptions — one row per subject, keyed by subject id. The
//     formal written description Part 8 wants for transcripts and
//     college applications. Shape: { subject, description, updatedAt }.
//   complianceChecks — one row per Georgia requirement the parent has
//     ticked, keyed by the requirement id. Shape: { key, done,
//     completedAt, note }. Deliberately records what SHE says she did:
//     the app files nothing with the state and must not imply otherwise.

/**
 * Academic Success Center — see the v16 schema comment above for both
 * row shapes and the seeding rationale.
 */
/**
 * Homeschool Administration — see the v17 schema comment above.
 */
export async function loadAllAdminRecords() {
  return db.adminRecords.toArray();
}

export async function addAdminRecord(record) {
  return db.adminRecords.add(record);
}

export async function deleteAdminRecordById(id) {
  return db.adminRecords.delete(id);
}

/**
 * Patch fields on an existing administrative record. Exists so a Drive
 * link can be attached AFTER the record was logged — which is the normal
 * order of events: you log the field trip the evening it happened and
 * upload the photos that weekend.
 */
export async function updateAdminRecordFields(id, changes) {
  const existing = await db.adminRecords.get(id);
  if (!existing) return null;
  return db.adminRecords.put({ ...existing, ...changes, id });
}

export async function loadAllCourseDescriptions() {
  return db.courseDescriptions.toArray();
}

export async function saveCourseDescriptionRecord(subject, description) {
  return db.courseDescriptions.put({ subject, description, updatedAt: new Date().toISOString() });
}

export async function loadAllComplianceChecks() {
  return db.complianceChecks.toArray();
}

export async function saveComplianceCheckRecord(key, state) {
  return db.complianceChecks.put({ key, ...state });
}

db.version(18).stores({
  meta: 'id',
  lessonProgress: 'lessonId',
  writingEntries: '++id, promptId, completedAt',
  typingScores: 'passageId',
  weeklyWordState: 'skill',
  schedule: 'id',
  typingLessonProgress: 'lessonId',
  attendance: 'date',
  parentNotes: '++id, createdAt',
  assignments: '++id, dueDate, completed',
  readingLog: '++id, date',
  portfolio: '++id, dateCompleted',
  khanAcademyAssignments: '++id, subject, completed',
  reviewSchedule: 'generatorId',
  selfExplanations: '++id, lessonId, completedAt',
  studyCycle: 'key',
  peBodyMetrics: '++id, date',
  peDailyLog: 'date',
  peWorkoutLog: '++id, date, category',
  peWeeklyGoals: 'weekKey',
  academicBooks: '++id, subject, slotId, status',
  academicAssignments: '++id, subject, slotId, quarter, status, dueDate',
  adminRecords: '++id, kind, date',
  courseDescriptions: 'subject',
  complianceChecks: 'key',
  evidenceLinks: 'key'
});
// Evidence links (parent's request, August 6, 2026): "For storage can we
// add Google Drive links".
//
// This closes the one Part 8 item that stayed blocked. Student work
// samples, field trip photos, award certificates and test score reports
// all needed file storage, and putting scans and photos into IndexedDB
// was declined for good reason — a browser reset would take records
// Georgia asks you to retain for three years.
//
// A URL costs a few dozen bytes and the file itself lives in Drive,
// where it is backed up and outlives this app. Two places hold links:
//   evidenceLinks — one row per named FOLDER slot (see lib/driveLinks.js
//     EVIDENCE_FOLDERS), keyed by slot. Shape: { key, url, updatedAt }.
//     Keyed rather than auto-increment because the slots are a fixed,
//     known set and a `put` should overwrite, not accumulate.
//   a `driveUrl` field on individual portfolio and adminRecords rows —
//     the link to THAT specific certificate or photo. Stored on the row
//     rather than in a join table so it exports with the record and is
//     deleted with it; an orphaned link table would quietly rot.
//
// No index on `driveUrl` deliberately: nothing looks records up by URL,
// and an unused index is just write cost. Adding a non-indexed field to
// existing rows needs no migration in Dexie — old rows simply read back
// with `driveUrl` undefined, which every consumer treats as "no link".

export async function loadAllEvidenceLinks() {
  return db.evidenceLinks.toArray();
}

export async function saveEvidenceLinkRecord(key, url) {
  return db.evidenceLinks.put({ key, url, updatedAt: new Date().toISOString() });
}

db.version(19).stores({
  meta: 'id',
  lessonProgress: 'lessonId',
  writingEntries: '++id, promptId, completedAt',
  typingScores: 'passageId',
  weeklyWordState: 'skill',
  schedule: 'id',
  typingLessonProgress: 'lessonId',
  attendance: 'date',
  parentNotes: '++id, createdAt',
  assignments: '++id, dueDate, completed',
  readingLog: '++id, date',
  portfolio: '++id, dateCompleted',
  khanAcademyAssignments: '++id, subject, completed',
  reviewSchedule: 'generatorId',
  selfExplanations: '++id, lessonId, completedAt',
  studyCycle: 'key',
  peBodyMetrics: '++id, date',
  peDailyLog: 'date',
  peWorkoutLog: '++id, date, category',
  peWeeklyGoals: 'weekKey',
  academicBooks: '++id, subject, slotId, status',
  academicAssignments: '++id, subject, slotId, quarter, status, dueDate',
  adminRecords: '++id, kind, date',
  courseDescriptions: 'subject',
  complianceChecks: 'key',
  evidenceLinks: 'key',
  parentAuth: 'id'
});
// Parent Dashboard passcode (built August 6, 2026). A single row keyed
// 'singleton', holding { id, salt, hash, recoverySalt, recoveryHash,
// iterations, hint, createdAt, declined }.
//
// Its own table rather than a field on `meta` for a specific reason:
// saveMeta() does a full `put` of { xp, streak, lastActiveDate }, so any
// extra field parked on meta gets wiped by the next XP award. That is a
// live hazard in this codebase, not a hypothetical — saveMeta is called
// from roughly twenty places.
//
// NEVER stores the passcode itself; see lib/parentAuth.js for what is
// derived and why, including the honest limits of a client-side lock.
// `declined` records that she chose to run without a passcode, so the
// setup prompt asks once and then stops nagging.

export const PARENT_AUTH_ID = 'singleton';

export async function loadParentAuth() {
  return db.parentAuth.get(PARENT_AUTH_ID);
}

export async function saveParentAuth(record) {
  return db.parentAuth.put({ id: PARENT_AUTH_ID, ...record });
}

export async function loadAllAcademicBooks() {
  return db.academicBooks.toArray();
}

export async function addAcademicBookRecord(record) {
  return db.academicBooks.add(record);
}

export async function updateAcademicBookRecord(id, changes) {
  const existing = await db.academicBooks.get(id);
  return db.academicBooks.put({ ...existing, ...changes, id });
}

export async function deleteAcademicBookRecord(id) {
  return db.academicBooks.delete(id);
}

export async function loadAllAcademicAssignments() {
  return db.academicAssignments.toArray();
}

export async function addAcademicAssignmentRecord(record) {
  return db.academicAssignments.add(record);
}

export async function updateAcademicAssignmentRecord(id, changes) {
  const existing = await db.academicAssignments.get(id);
  return db.academicAssignments.put({ ...existing, ...changes, id });
}

export async function deleteAcademicAssignmentRecord(id) {
  return db.academicAssignments.delete(id);
}

// Gamification — parent-defined rewards catalog + coin-spend/redemption
// history (Part 5, Aug 6, 2026).
export async function loadAllRewards() {
  return db.rewards.toArray();
}
export async function addRewardRecord(record) {
  return db.rewards.add(record);
}
export async function updateRewardRecord(id, changes) {
  const existing = await db.rewards.get(id);
  return db.rewards.put({ ...existing, ...changes, id });
}
/**
 * SOFT delete, from v31. The row stays, carrying a `deletedAt` tombstone.
 *
 * A hard delete cannot travel: the parent removes "Trip for ice cream" on her
 * computer, the student's copy still has it, and his next export puts it
 * straight back. A tombstone is a fact both machines can merge, exactly like
 * the ledger's refund-instead-of-deletion rule. Everything that reads this
 * table filters `deletedAt` out, so it disappears from the UI either way.
 */
export async function deleteRewardRecord(id) {
  const existing = await db.rewards.get(id);
  if (!existing) return null;
  const deletedAt = new Date().toISOString();
  return db.rewards.put({ ...existing, deletedAt, updatedAt: deletedAt, active: false, id });
}
/** Merge-time writer: upsert whole rows that arrived from the other computer. */
export async function bulkPutRewards(rows) {
  if (!rows || !rows.length) return null;
  return db.rewards.bulkPut(rows);
}
export async function loadAllRewardRedemptions() {
  return db.rewardRedemptions.toArray();
}
export async function addRewardRedemptionRecord(record) {
  return db.rewardRedemptions.add(record);
}
export async function updateRewardRedemptionRecord(id, changes) {
  const existing = await db.rewardRedemptions.get(id);
  return db.rewardRedemptions.put({ ...existing, ...changes, id });
}
export async function bulkPutRewardRedemptions(rows) {
  if (!rows || !rows.length) return null;
  return db.rewardRedemptions.bulkPut(rows);
}

// The Marketplace ledger (Part 10, Aug 8, 2026). See the v30 schema note.
/* ---- Dream Goals (v32) ---- */

export async function loadAllDreamGoals() {
  return db.dreamGoals.toArray();
}

export async function putDreamGoalRecord(goal) {
  return db.dreamGoals.put(goal);
}

export async function loadAllLedgerEntries() {
  return db.ledger.toArray();
}

/**
 * Write entries. bulkPut, not bulkAdd, and that matters: entryId is the primary
 * key, so re-importing a file the student has already imported overwrites the
 * identical rows instead of throwing on a duplicate key. Importing the same
 * backup twice must be a no-op, never an error and never a double-count.
 */
export async function addLedgerEntries(entries) {
  if (!entries || !entries.length) return null;
  return db.ledger.bulkPut(entries);
}

// Engineer Readiness — parent-awarded soft-skill levels (Part 5, Aug 6, 2026).
export async function loadAllReadinessAwards() {
  return db.readinessAwards.toArray();
}
export async function saveReadinessAwardRecord(record) {
  return db.readinessAwards.put(record);
}
/**
 * Clearing an award keeps the ROW, with `level: null`.
 *
 * Same tombstone reasoning as the rewards catalog, plus one more: the row also
 * holds the dated Bronze -> Silver -> Gold history, which is the part of this
 * record a transcript actually needs six years from now. Deleting the row to
 * un-award a level would throw that away, and would be undone by the next
 * import from the other machine anyway.
 */
export async function deleteReadinessAwardRecord(skillId) {
  const existing = await db.readinessAwards.get(skillId);
  const updatedAt = new Date().toISOString();
  return db.readinessAwards.put({
    ...(existing || { skillId, history: [] }),
    skillId,
    level: null,
    note: existing?.note || '',
    updatedAt
  });
}
export async function bulkPutReadinessAwards(rows) {
  if (!rows || !rows.length) return null;
  return db.readinessAwards.bulkPut(rows);
}

// Field Trip Planner (Part 5, Aug 6, 2026).
export async function loadAllFieldTrips() {
  return db.fieldTrips.toArray();
}
export async function addFieldTripRecord(record) {
  return db.fieldTrips.add(record);
}
export async function updateFieldTripRecord(id, changes) {
  const existing = await db.fieldTrips.get(id);
  return db.fieldTrips.put({ ...existing, ...changes, id });
}
/** Soft delete — see the note on deleteRewardRecord. */
export async function deleteFieldTripRecord(id) {
  const existing = await db.fieldTrips.get(id);
  if (!existing) return null;
  const deletedAt = new Date().toISOString();
  return db.fieldTrips.put({ ...existing, deletedAt, updatedAt: deletedAt, id });
}
export async function bulkPutFieldTrips(rows) {
  if (!rows || !rows.length) return null;
  return db.fieldTrips.bulkPut(rows);
}

// Mission Comms (Part 5) — two-way parent/student messages.
export async function loadAllMessages() {
  return db.messages.toArray();
}
export async function addMessageRecord(record) {
  // record: { sender, body, createdAt, readByParent, readByStudent }
  return db.messages.add(record);
}
export async function updateMessageRecord(id, changes) {
  const existing = await db.messages.get(id);
  return db.messages.put({ ...existing, ...changes, id });
}

export async function loadAllAssignments() {
  return db.assignments.toArray();
}
export async function saveAssignment(assignment) {
  return db.assignments.add(assignment);
}
export async function updateAssignment(id, fullRecord) {
  return db.assignments.put({ id, ...fullRecord });
}
/** Soft delete — see the note on deleteRewardRecord. */
export async function deleteAssignment(id) {
  const existing = await db.assignments.get(id);
  if (!existing) return null;
  const deletedAt = new Date().toISOString();
  return db.assignments.put({ ...existing, deletedAt, updatedAt: deletedAt, id });
}
export async function bulkPutAssignments(rows) {
  if (!rows || !rows.length) return null;
  return db.assignments.bulkPut(rows);
}
export async function bulkPutSelfExplanations(rows) {
  if (!rows || !rows.length) return null;
  return db.selfExplanations.bulkPut(rows);
}

/**
 * ---- READING LOG AND PORTFOLIO JOINED THE v31 CLUB ON v34 (Aug 25, 2026) ----
 *
 * Both used to hard-delete while travelling in the export, so a removal on one
 * computer was undone by the other's next import, and an EDIT never crossed at
 * all — the merge skipped any row whose natural key it already had. See the
 * v34 note in the schema, and `deleteRewardRecord` for the original reasoning.
 *
 * Every writer below now stamps `syncId` and `updatedAt`, because a
 * last-write-wins merge with no timestamp on one side cannot decide anything —
 * it would fall through to "local stands" forever and the edit still would not
 * travel. The tombstone alone would have fixed half the bug and left the half
 * nobody notices.
 */
export async function loadAllReadingLog() {
  return db.readingLog.toArray();
}
export async function saveReadingLogEntry(entry) {
  const now = new Date().toISOString();
  return db.readingLog.add({ syncId: newSyncId(), updatedAt: now, ...entry });
}
export async function updateReadingLogEntry(id, changes) {
  const existing = await db.readingLog.get(id);
  if (!existing) return null;
  const now = new Date().toISOString();
  return db.readingLog.put({
    ...existing,
    ...changes,
    syncId: existing.syncId || newSyncId(),
    updatedAt: now,
    id
  });
}
/** Soft delete — see the note on deleteRewardRecord. */
export async function deleteReadingLogEntry(id) {
  const existing = await db.readingLog.get(id);
  if (!existing) return null;
  const deletedAt = new Date().toISOString();
  return db.readingLog.put({
    ...existing,
    syncId: existing.syncId || newSyncId(),
    deletedAt,
    updatedAt: deletedAt,
    id
  });
}
/** Merge-time writer: upsert whole rows that arrived from the other computer. */
export async function bulkPutReadingLog(rows) {
  if (!rows || !rows.length) return null;
  return db.readingLog.bulkPut(rows);
}

export async function loadAllPortfolio() {
  return db.portfolio.toArray();
}
export async function savePortfolioEntry(entry) {
  const now = new Date().toISOString();
  return db.portfolio.add({ syncId: newSyncId(), updatedAt: now, ...entry });
}
/** Soft delete — see the note on deleteRewardRecord. */
export async function deletePortfolioEntry(id) {
  const existing = await db.portfolio.get(id);
  if (!existing) return null;
  const deletedAt = new Date().toISOString();
  return db.portfolio.put({
    ...existing,
    syncId: existing.syncId || newSyncId(),
    deletedAt,
    updatedAt: deletedAt,
    id
  });
}
/**
 * Patch fields on an existing portfolio entry — the same "log it now,
 * add the photo link later" flow as updateAdminRecordFields.
 *
 * Stamps `updatedAt` from v34: this is the exact edit that never travelled.
 * She adds the Drive link to a project on her computer and, before this, his
 * copy kept the linkless version forever.
 */
export async function updatePortfolioEntryFields(id, changes) {
  const existing = await db.portfolio.get(id);
  if (!existing) return null;
  const now = new Date().toISOString();
  return db.portfolio.put({
    ...existing,
    ...changes,
    syncId: existing.syncId || newSyncId(),
    updatedAt: now,
    id
  });
}
/** Merge-time writer: upsert whole rows that arrived from the other computer. */
export async function bulkPutPortfolio(rows) {
  if (!rows || !rows.length) return null;
  return db.portfolio.bulkPut(rows);
}

/**
 * Parent notes/observations are deliberately NOT cleared by
 * resetAllProgress — these are the parent's own written observations
 * about their child's growth over time, not student game progress, and
 * shouldn't disappear just because XP/mastery gets reset for a fresh
 * start (same reasoning as the schedule being left untouched).
 */
export async function loadAllParentNotes() {
  return db.parentNotes.toArray();
}

export async function saveParentNote(note) {
  // note: { text, subject, createdAt }
  return db.parentNotes.add(note);
}

export async function deleteParentNote(id) {
  return db.parentNotes.delete(id);
}

/**
 * Attendance is honest about what this app can and can't measure. It
 * tracks: (1) `activeMinutes` — real foreground time, only accumulated
 * while the browser tab is actually visible (via the Page Visibility
 * API), not just "the tab was open" — and (2) counts of real completed
 * activities (lessons, writing entries, typing sessions) as evidence a
 * day had genuine engagement, not just a login. This is intentionally a
 * proxy for Georgia's 180-day / 4.5-hour requirement, not a claim of
 * exact compliance — the parent should treat it as supporting
 * recordkeeping, not a certified attendance log.
 */
export async function loadAttendanceRecord(date) {
  return db.attendance.get(date);
}

export async function loadAllAttendance() {
  return db.attendance.toArray();
}

export async function saveAttendanceRecord(date, record) {
  // record: { activeMinutes, lessonsCompleted, writingEntries, typingSessions }
  return db.attendance.put({ date, ...record });
}

export async function loadAllTypingLessonProgress() {
  return db.typingLessonProgress.toArray();
}

export async function saveTypingLessonProgress(lessonId, progress) {
  // progress: { mastered, bestAccuracy, attempts }
  return db.typingLessonProgress.put({ lessonId, ...progress });
}

export const SCHEDULE_ID = 'daily';

export async function loadSchedule() {
  return db.schedule.get(SCHEDULE_ID);
}

export async function saveSchedule(blocks) {
  // blocks: [{ id, startTime, endTime, label, colorKey }, ...]
  return db.schedule.put({ id: SCHEDULE_ID, blocks });
}

export const META_ID = 'singleton';

export async function loadMeta() {
  return db.meta.get(META_ID);
}

// Merges into the existing meta doc rather than replacing it. The many XP
// award sites call this with just {xp, streak, lastActiveDate}; merging lets
// gamification fields (coinsSpent, unlockedCosmetics, equippedAvatar,
// equippedRocket) live in the same singleton doc without those calls wiping
// them. Added Aug 6, 2026 for Part 5 gamification.
export async function saveMeta(metaState) {
  const existing = await db.meta.get(META_ID);
  return db.meta.put({ id: META_ID, ...(existing || {}), ...metaState });
}

export async function loadAllLessonProgress() {
  return db.lessonProgress.toArray();
}

export async function saveLessonProgress(lessonId, progress) {
  return db.lessonProgress.put({ lessonId, ...progress });
}

export async function loadAllWritingEntries() {
  return db.writingEntries.toArray();
}

export async function saveWritingEntry(entry) {
  // entry: { promptId, text, wordCount, completedAt }
  return db.writingEntries.add(entry);
}

export async function updateWritingEntryRecord(id, changes) {
  const existing = await db.writingEntries.get(id);
  return db.writingEntries.put({ ...existing, ...changes, id });
}

export async function loadTypingScore(passageId) {
  return db.typingScores.get(passageId);
}

/**
 * Full-table loaders for the three keyed tables that had none, added Aug 9
 * 2026 when the export audit found all three missing from the backup.
 *
 * `loadTypingScore` / `loadWeeklyWordState` fetch one row at a time because
 * that is all the UI ever needs. A backup needs every row, and a table with no
 * way to read it whole is a table that quietly cannot be backed up — which is
 * precisely how his spelling and vocabulary work, done four or five days a
 * week, ended up existing in no record anywhere.
 */
export async function loadAllTypingScores() {
  return db.typingScores.toArray();
}

export async function bulkPutTypingScores(rows) {
  if (!rows || !rows.length) return null;
  return db.typingScores.bulkPut(rows);
}

export async function loadAllWeeklyWordState() {
  return db.weeklyWordState.toArray();
}

export async function bulkPutWeeklyWordState(rows) {
  if (!rows || !rows.length) return null;
  return db.weeklyWordState.bulkPut(rows);
}

export async function loadAllMorningMeetings() {
  return db.morningMeetings.toArray();
}

export async function loadAllKhanDailyLog() {
  return db.khanDailyLog.toArray();
}

export async function bulkPutMorningMeetings(rows) {
  if (!rows || !rows.length) return null;
  return db.morningMeetings.bulkPut(rows);
}

export async function bulkPutKhanDailyLog(rows) {
  if (!rows || !rows.length) return null;
  return db.khanDailyLog.bulkPut(rows);
}

export async function saveTypingScore(passageId, score) {
  // score: { bestWpm, lastAccuracy, attempts }
  return db.typingScores.put({ passageId, ...score });
}

export async function loadWeeklyWordState(skill) {
  return db.weeklyWordState.get(skill);
}

export async function saveWeeklyWordState(skill, state) {
  // state: { weekNumber, weekStartDate, currentWordIds, poolCursor,
  //          quizTakenThisWeek, lastQuizMissedIds }
  return db.weeklyWordState.put({ skill, ...state });
}

/**
 * Spaced-repetition schedule — one row per practice generator id (see
 * dailyPractice.js). state: { intervalDays, nextDueDate ('YYYY-MM-DD'),
 * lastResult ('correct'|'miss'), lastReviewedDate }.
 */
export async function loadAllReviewSchedule() {
  return db.reviewSchedule.toArray();
}

export async function saveReviewScheduleEntry(generatorId, state) {
  return db.reviewSchedule.put({ generatorId, ...state });
}

/**
 * Self-explanation reflections ("explain this to your guide in your
 * own words") — ungraded, captured for the parent's own review, never
 * scored. entry: { lessonId, beatLabel, text, completedAt }.
 */
export async function loadAllSelfExplanations() {
  return db.selfExplanations.toArray();
}

export async function saveSelfExplanationEntry(entry) {
  return db.selfExplanations.add(entry);
}

/**
 * Grade a reflection. `grade` and `gradedAt` are NON-INDEXED fields, so no
 * Dexie version bump is required — the schema stays at v27 and no migration
 * runs. Rows written before grading existed simply have no grade, which is
 * exactly what "ungraded" already means to the queue.
 */
export async function updateSelfExplanationEntry(id, changes) {
  const existing = await db.selfExplanations.get(id);
  if (!existing) return undefined;
  return db.selfExplanations.put({ ...existing, ...changes, id });
}

/**
 * 5-Day Study Cycle progress — see the v14 schema comment above for the
 * row shape and design rationale.
 */
export async function loadAllStudyCycle() {
  return db.studyCycle.toArray();
}

export async function saveStudyCycleEntry(key, state) {
  return db.studyCycle.put({ key, ...state });
}

/**
 * PE & Nutrition trackers — see the v15 schema comment above for the
 * full design rationale of each table.
 */
export async function loadAllPEBodyMetrics() {
  return db.peBodyMetrics.toArray();
}

export async function savePEBodyMetricsEntry(entry) {
  // entry: { date, heightIn, weightLb, note, createdAt }
  return db.peBodyMetrics.add(entry);
}

export async function loadAllPEDailyLog() {
  return db.peDailyLog.toArray();
}

export async function savePEDailyLogEntry(date, entry) {
  // entry: { waterOz, proteinG, sleepHours, activityMinutes, mood, updatedAt }
  return db.peDailyLog.put({ date, ...entry });
}

export async function loadAllPEWorkoutLog() {
  return db.peWorkoutLog.toArray();
}

export async function savePEWorkoutLogEntry(entry) {
  // entry: { date, category, exerciseIds, completedAt }
  return db.peWorkoutLog.add(entry);
}

export async function loadAllPEWeeklyGoals() {
  return db.peWeeklyGoals.toArray();
}

export async function savePEWeeklyGoalEntry(weekKey, entry) {
  // entry: { goalText, achieved, createdAt }
  return db.peWeeklyGoals.put({ weekKey, ...entry });
}

export async function loadAllPEMeals() {
  return db.peMeals.toArray();
}

export async function addPEMealRecord(entry) {
  // entry: { date, mealType, description, proteinG, createdAt }
  const now = new Date().toISOString();
  return db.peMeals.add({ syncId: newSyncId(), updatedAt: now, ...entry });
}

/** Soft delete from v34 — see the note on deleteRewardRecord and the v34 block. */
export async function deletePEMealRecord(id) {
  const existing = await db.peMeals.get(id);
  if (!existing) return null;
  const deletedAt = new Date().toISOString();
  return db.peMeals.put({
    ...existing,
    syncId: existing.syncId || newSyncId(),
    deletedAt,
    updatedAt: deletedAt,
    id
  });
}

/** Merge-time writer: upsert whole rows that arrived from the other computer. */
export async function bulkPutPEMeals(rows) {
  if (!rows || !rows.length) return null;
  return db.peMeals.bulkPut(rows);
}

/**
 * Academic Success Center rows hold BOTH the parent's configuration
 * (real book titles/authors, real assignment titles and due dates —
 * work she did, not the student) and the student's progress (reading
 * status, completion, grade). Clearing the tables outright on Reset All
 * Progress would throw away her setup, and leaving them untouched would
 * leave stale completions behind. So this resets only the progress
 * fields in place and returns the updated rows, keeping every real
 * title/author/topic/due date she entered. Same principle already
 * applied to the schedule and parent notes, just at field level rather
 * than table level.
 */
export async function resetAcademicProgressStatuses() {
  const [books, assignments] = await Promise.all([
    db.academicBooks.toArray(),
    db.academicAssignments.toArray()
  ]);

  const resetBooks = books.map((b) => ({
    ...b,
    status: b.title ? 'not-started' : 'empty',
    startedAt: null,
    completedAt: null
  }));
  const resetAssignments = assignments.map((a) => ({
    ...a,
    status: a.title ? 'not-started' : 'placeholder',
    startedAt: null,
    completedAt: null,
    grade: null,
    gradedAt: null
  }));

  await Promise.all([db.academicBooks.bulkPut(resetBooks), db.academicAssignments.bulkPut(resetAssignments)]);
  return { books: resetBooks, assignments: resetAssignments };
}

/**
 * Wipes all recorded progress — XP, streak, lesson mastery, writing
 * journal entries, typing scores, typing lesson mastery, and weekly
 * word rotation state. Deliberately does NOT touch the `schedule` table
 * — a parent's customized daily schedule is configuration, not progress,
 * and shouldn't be lost when resetting a student's learning history
 * (e.g., before their first real session, after a period of testing).
 */
export async function resetAllProgress() {
  await Promise.all([
    db.meta.clear(),
    db.lessonProgress.clear(),
    db.writingEntries.clear(),
    db.typingScores.clear(),
    db.weeklyWordState.clear(),
    db.typingLessonProgress.clear(),
    db.attendance.clear(),
    db.reviewSchedule.clear(),
    db.selfExplanations.clear(),
    db.studyCycle.clear(),
    db.peBodyMetrics.clear(),
    db.peDailyLog.clear(),
    db.peWorkoutLog.clear(),
    db.peWeeklyGoals.clear(),
    db.peMeals.clear(),
    // Gardening participation. His work, so it resets with his work — same
    // rule as the PE tables directly above.
    db.gardenLog.clear(),
    // Electric Guitar participation. His work, so it resets with his work —
    // same rule as the PE and gardening tables directly above.
    db.guitarLog.clear(),
    // Coin-spend history is student game state (coins themselves reset with
    // meta). The parent-authored `rewards` catalog is deliberately NOT
    // cleared — like notes/assignments, it's a parent record, not progress.
    db.rewardRedemptions.clear(),
    // The economy is student progress: coins and credits reset with the XP
    // that earned them. The parent-authored `rewards` catalog is deliberately
    // NOT cleared, same rule as notes and assignments — it's her record, not
    // his progress.
    db.ledger.clear()
  ]);
}


db.version(20).stores({
  meta: 'id',
  lessonProgress: 'lessonId',
  writingEntries: '++id, promptId, completedAt',
  typingScores: 'passageId',
  weeklyWordState: 'skill',
  schedule: 'id',
  typingLessonProgress: 'lessonId',
  attendance: 'date',
  parentNotes: '++id, createdAt',
  assignments: '++id, dueDate, completed',
  readingLog: '++id, date',
  portfolio: '++id, dateCompleted',
  khanAcademyAssignments: '++id, subject, completed',
  reviewSchedule: 'generatorId',
  selfExplanations: '++id, lessonId, completedAt',
  studyCycle: 'key',
  peBodyMetrics: '++id, date',
  peDailyLog: 'date',
  peWorkoutLog: '++id, date, category',
  peWeeklyGoals: 'weekKey',
  academicBooks: '++id, subject, slotId, status',
  academicAssignments: '++id, subject, slotId, quarter, status, dueDate',
  adminRecords: '++id, kind, date',
  courseDescriptions: 'subject',
  complianceChecks: 'key',
  evidenceLinks: 'key',
  parentAuth: 'id',
  missionEvaluations: 'quarter'
});
// Quarterly Mission Evaluations (PROJECT_PLAN.md Part 8, built August 6,
// 2026). Project-based assessment in place of the recurring paid
// diagnostic dropped in Part 0.
//
// Keyed by `quarter` ("Q1 2026-2027") rather than auto-increment,
// because there is exactly ONE mission per quarter by design. An
// auto-increment table would happily hold three Q1 missions and then
// the growth comparison has to guess which one counts.
//
// Shape: { quarter, projectId, customTitle, status, scores, feedback,
//   parentApproved, driveUrl, startedAt, completedAt, approvedAt,
//   declinedIds }.
//   scores      — criterion id -> 1-4, see data/admin/missionEvaluations.js
//   feedback    — the narrative, drafted from the scores and then EDITED
//                 by the parent. Stored as her final text, never
//                 regenerated over the top of her edits.
//   declinedIds — proposals she said no to, so they are not re-offered.

export async function loadAllMissionEvaluations() {
  return db.missionEvaluations.toArray();
}

export async function saveMissionEvaluation(quarter, changes) {
  const existing = await db.missionEvaluations.get(quarter);
  return db.missionEvaluations.put({ ...existing, ...changes, quarter });
}

export async function deleteMissionEvaluation(quarter) {
  return db.missionEvaluations.delete(quarter);
}

db.version(21).stores({
  meta: 'id',
  lessonProgress: 'lessonId',
  writingEntries: '++id, promptId, completedAt',
  typingScores: 'passageId',
  weeklyWordState: 'skill',
  schedule: 'id',
  typingLessonProgress: 'lessonId',
  attendance: 'date',
  parentNotes: '++id, createdAt',
  assignments: '++id, dueDate, completed',
  readingLog: '++id, date',
  portfolio: '++id, dateCompleted',
  khanAcademyAssignments: '++id, subject, completed',
  reviewSchedule: 'generatorId',
  selfExplanations: '++id, lessonId, completedAt',
  studyCycle: 'key',
  peBodyMetrics: '++id, date',
  peDailyLog: 'date',
  peWorkoutLog: '++id, date, category',
  peWeeklyGoals: 'weekKey',
  academicBooks: '++id, subject, slotId, status',
  academicAssignments: '++id, subject, slotId, quarter, status, dueDate',
  adminRecords: '++id, kind, date',
  courseDescriptions: 'subject',
  complianceChecks: 'key',
  evidenceLinks: 'key',
  parentAuth: 'id',
  missionEvaluations: 'quarter'
}).upgrade(async (tx) => {
  /**
   * Subject merge: `writing` retired into `reading` (Aug 6, 2026), at
   * the parent's request — "I would like Reading and Language Arts to be
   * merged. There aren't many lessons in Language Arts." The combined
   * subject is English Language Arts.
   *
   * The lesson DATA was renamed in source, which handles anything
   * derived from `allLessons`. This upgrade exists for the rows already
   * SAVED in her database — a portfolio entry tagged to Language Arts, a
   * Khan assignment, a course description she wrote. Without it those
   * rows point at a subject id that no longer appears in any list, so
   * they vanish from the report card, the gradebook and the compliance
   * packet without ever erroring. Silent, and exactly the kind of loss
   * that is noticed a year later.
   *
   * Runs inside the version transaction, so it either completes or the
   * upgrade rolls back — a half-migrated database is worse than either
   * outcome.
   */
  const FROM = 'writing';
  const TO = 'reading';

  const retag = async (table) => {
    const rows = await tx.table(table).toArray();
    for (const row of rows) {
      if (row.subject !== FROM) continue;
      await tx.table(table).put({ ...row, subject: TO });
    }
  };

  for (const table of [
    'portfolio',
    'parentNotes',
    'assignments',
    'readingLog',
    'khanAcademyAssignments',
    'academicBooks',
    'academicAssignments',
    'adminRecords'
  ]) {
    await retag(table);
  }

  // courseDescriptions is keyed BY subject, so it needs a real move
  // rather than a field edit. If she has written both, hers for Reading
  // wins and the Language Arts text is appended rather than discarded —
  // losing a paragraph she wrote for a transcript would be the worse
  // failure.
  const descriptions = await tx.table('courseDescriptions').toArray();
  const old = descriptions.find((d) => d.subject === FROM);
  if (old?.description) {
    const existing = descriptions.find((d) => d.subject === TO);
    const merged = existing?.description
      ? `${existing.description}\n\n${old.description}`
      : old.description;
    await tx.table('courseDescriptions').put({
      subject: TO,
      description: merged,
      updatedAt: new Date().toISOString()
    });
    await tx.table('courseDescriptions').delete(FROM);
  }
});

// v22 (Aug 6, 2026) — Gamification rewards (Part 5). Adds two tables:
// `rewards` (parent-defined real-world rewards catalog) and
// `rewardRedemptions` (coin-spend history + parent-approval queue). Coin
// balance, unlocked cosmetics, and the equipped avatar/rocket live in the
// singleton `meta` doc, so they need no schema change. New tables
// auto-create; no data migration required.
db.version(22).stores({
  meta: 'id',
  lessonProgress: 'lessonId',
  writingEntries: '++id, promptId, completedAt',
  typingScores: 'passageId',
  weeklyWordState: 'skill',
  schedule: 'id',
  typingLessonProgress: 'lessonId',
  attendance: 'date',
  parentNotes: '++id, createdAt',
  assignments: '++id, dueDate, completed',
  readingLog: '++id, date',
  portfolio: '++id, dateCompleted',
  khanAcademyAssignments: '++id, subject, completed',
  reviewSchedule: 'generatorId',
  selfExplanations: '++id, lessonId, completedAt',
  studyCycle: 'key',
  peBodyMetrics: '++id, date',
  peDailyLog: 'date',
  peWorkoutLog: '++id, date, category',
  peWeeklyGoals: 'weekKey',
  academicBooks: '++id, subject, slotId, status',
  academicAssignments: '++id, subject, slotId, quarter, status, dueDate',
  adminRecords: '++id, kind, date',
  courseDescriptions: 'subject',
  complianceChecks: 'key',
  evidenceLinks: 'key',
  parentAuth: 'id',
  missionEvaluations: 'quarter',
  rewards: '++id, active, createdAt',
  rewardRedemptions: '++id, status, createdAt'
});

// v23 (Aug 6, 2026) — Engineer Readiness (Part 5). A parent-awarded soft-skill
// badge track. `readinessAwards` is keyed by skillId (one row per skill):
// { skillId, level, note, updatedAt }. NOT cleared on progress reset — like
// the portfolio, it's a parent record of demonstrated skill, not game state.
db.version(23).stores({
  meta: 'id',
  lessonProgress: 'lessonId',
  writingEntries: '++id, promptId, completedAt',
  typingScores: 'passageId',
  weeklyWordState: 'skill',
  schedule: 'id',
  typingLessonProgress: 'lessonId',
  attendance: 'date',
  parentNotes: '++id, createdAt',
  assignments: '++id, dueDate, completed',
  readingLog: '++id, date',
  portfolio: '++id, dateCompleted',
  khanAcademyAssignments: '++id, subject, completed',
  reviewSchedule: 'generatorId',
  selfExplanations: '++id, lessonId, completedAt',
  studyCycle: 'key',
  peBodyMetrics: '++id, date',
  peDailyLog: 'date',
  peWorkoutLog: '++id, date, category',
  peWeeklyGoals: 'weekKey',
  academicBooks: '++id, subject, slotId, status',
  academicAssignments: '++id, subject, slotId, quarter, status, dueDate',
  adminRecords: '++id, kind, date',
  courseDescriptions: 'subject',
  complianceChecks: 'key',
  evidenceLinks: 'key',
  parentAuth: 'id',
  missionEvaluations: 'quarter',
  rewards: '++id, active, createdAt',
  rewardRedemptions: '++id, status, createdAt',
  readinessAwards: 'skillId'
});

// v24 (Aug 6, 2026) — Field Trip Planner (Part 5). `fieldTrips`: planned and
// completed learning experiences, each with an optional Learning Pack. A parent
// record; not cleared on progress reset.
db.version(24).stores({
  meta: 'id',
  lessonProgress: 'lessonId',
  writingEntries: '++id, promptId, completedAt',
  typingScores: 'passageId',
  weeklyWordState: 'skill',
  schedule: 'id',
  typingLessonProgress: 'lessonId',
  attendance: 'date',
  parentNotes: '++id, createdAt',
  assignments: '++id, dueDate, completed',
  readingLog: '++id, date',
  portfolio: '++id, dateCompleted',
  khanAcademyAssignments: '++id, subject, completed',
  reviewSchedule: 'generatorId',
  selfExplanations: '++id, lessonId, completedAt',
  studyCycle: 'key',
  peBodyMetrics: '++id, date',
  peDailyLog: 'date',
  peWorkoutLog: '++id, date, category',
  peWeeklyGoals: 'weekKey',
  academicBooks: '++id, subject, slotId, status',
  academicAssignments: '++id, subject, slotId, quarter, status, dueDate',
  adminRecords: '++id, kind, date',
  courseDescriptions: 'subject',
  complianceChecks: 'key',
  evidenceLinks: 'key',
  parentAuth: 'id',
  missionEvaluations: 'quarter',
  rewards: '++id, active, createdAt',
  rewardRedemptions: '++id, status, createdAt',
  readinessAwards: 'skillId',
  fieldTrips: '++id, date, status'
});

// v25 (Aug 6, 2026) — Meal Log (Part 5). `peMeals`: one row per logged meal or
// snack (date, mealType, what he ate, optional protein grams). Student daily
// health data like peDailyLog — cleared on progress reset. Framed around fuel,
// energy, and strength, never appearance or calorie restriction.
db.version(25).stores({
  meta: 'id',
  lessonProgress: 'lessonId',
  writingEntries: '++id, promptId, completedAt',
  typingScores: 'passageId',
  weeklyWordState: 'skill',
  schedule: 'id',
  typingLessonProgress: 'lessonId',
  attendance: 'date',
  parentNotes: '++id, createdAt',
  assignments: '++id, dueDate, completed',
  readingLog: '++id, date',
  portfolio: '++id, dateCompleted',
  khanAcademyAssignments: '++id, subject, completed',
  reviewSchedule: 'generatorId',
  selfExplanations: '++id, lessonId, completedAt',
  studyCycle: 'key',
  peBodyMetrics: '++id, date',
  peDailyLog: 'date',
  peWorkoutLog: '++id, date, category',
  peWeeklyGoals: 'weekKey',
  peMeals: '++id, date, mealType',
  academicBooks: '++id, subject, slotId, status',
  academicAssignments: '++id, subject, slotId, quarter, status, dueDate',
  adminRecords: '++id, kind, date',
  courseDescriptions: 'subject',
  complianceChecks: 'key',
  evidenceLinks: 'key',
  parentAuth: 'id',
  missionEvaluations: 'quarter',
  rewards: '++id, active, createdAt',
  rewardRedemptions: '++id, status, createdAt',
  readinessAwards: 'skillId',
  fieldTrips: '++id, date, status'
});

// v26 (Aug 6, 2026) — Mission Comms (Part 5). `messages`: a two-way parent ⇄
// student conversation thread. Each row: sender ('parent'|'student'), body,
// createdAt, and readByParent/readByStudent flags for unread badges. A
// communication record — NOT cleared on progress reset (like parentNotes).
db.version(26).stores({
  meta: 'id',
  lessonProgress: 'lessonId',
  writingEntries: '++id, promptId, completedAt',
  typingScores: 'passageId',
  weeklyWordState: 'skill',
  schedule: 'id',
  typingLessonProgress: 'lessonId',
  attendance: 'date',
  parentNotes: '++id, createdAt',
  assignments: '++id, dueDate, completed',
  readingLog: '++id, date',
  portfolio: '++id, dateCompleted',
  khanAcademyAssignments: '++id, subject, completed',
  reviewSchedule: 'generatorId',
  selfExplanations: '++id, lessonId, completedAt',
  studyCycle: 'key',
  peBodyMetrics: '++id, date',
  peDailyLog: 'date',
  peWorkoutLog: '++id, date, category',
  peWeeklyGoals: 'weekKey',
  peMeals: '++id, date, mealType',
  academicBooks: '++id, subject, slotId, status',
  academicAssignments: '++id, subject, slotId, quarter, status, dueDate',
  adminRecords: '++id, kind, date',
  courseDescriptions: 'subject',
  complianceChecks: 'key',
  evidenceLinks: 'key',
  parentAuth: 'id',
  missionEvaluations: 'quarter',
  rewards: '++id, active, createdAt',
  rewardRedemptions: '++id, status, createdAt',
  readinessAwards: 'skillId',
  fieldTrips: '++id, date, status',
  messages: '++id, createdAt'
});

// ---------------------------------------------------------------------------
// v27 (Aug 7, 2026) — khanDailyLog. A daily check-off per Khan subject, so
// working a unit that spans several days still produces a visible win every
// day and a real attendance signal. Restores the daily rhythm that went away
// with the retired ixlCompletions table at v11, on Khan Academy's terms.
//
// Keyed by date, so it "resets" without any midnight job — tomorrow is simply
// a key that does not exist yet. Purely additive: new table, no existing
// definition touched, no data migration needed.
// ---------------------------------------------------------------------------
db.version(27).stores({
  meta: 'id',
  lessonProgress: 'lessonId',
  writingEntries: '++id, promptId, completedAt',
  typingScores: 'passageId',
  weeklyWordState: 'skill',
  schedule: 'id',
  typingLessonProgress: 'lessonId',
  attendance: 'date',
  parentNotes: '++id, createdAt',
  assignments: '++id, dueDate, completed',
  readingLog: '++id, date',
  portfolio: '++id, dateCompleted',
  khanAcademyAssignments: '++id, subject, completed',
  reviewSchedule: 'generatorId',
  selfExplanations: '++id, lessonId, completedAt',
  studyCycle: 'key',
  peBodyMetrics: '++id, date',
  peDailyLog: 'date',
  peWorkoutLog: '++id, date, category',
  peWeeklyGoals: 'weekKey',
  peMeals: '++id, date, mealType',
  academicBooks: '++id, subject, slotId, status',
  academicAssignments: '++id, subject, slotId, quarter, status, dueDate',
  adminRecords: '++id, kind, date',
  courseDescriptions: 'subject',
  complianceChecks: 'key',
  evidenceLinks: 'key',
  parentAuth: 'id',
  missionEvaluations: 'quarter',
  rewards: '++id, active, createdAt',
  rewardRedemptions: '++id, status, createdAt',
  readinessAwards: 'skillId',
  fieldTrips: '++id, date, status',
  messages: '++id, createdAt',
  // See the header note in _build/daily/db.mjs: one row per DAY, holding a
  // boolean per subject. Separate from khanAcademyAssignments on purpose —
  // "did he work today" and "is this unit finished" are different questions.
  khanDailyLog: 'date'
});

// ---------------------------------------------------------------------------
// v28 (Aug 8, 2026) — gardenLog. Gardening's single record table.
//
// Gardening is a PARTICIPATION subject (config/subjects.js), the same as PE:
// it is recorded by what he actually did, not by a grade. Every row here is one
// real thing that happened in a 4 ft x 8 ft bucket garden under an awning.
//
// ONE TABLE, NOT FIVE, and the contrast with PE is the reason. PE needed five
// tables because a workout, a meal and a body measurement are genuinely
// different records with different shapes. A garden log is one journal with a
// type column: a watering, a planting and a sun reading are all "something I
// did in the garden on a date." Splitting them would multiply the hydrate,
// export, import and reset wiring by five for no gain.
//
//   kind — 'changeover' | 'session' | 'sun-reading' | 'planting' | 'watering'
//          | 'observation' | 'measurement' | 'harvest'
//   data — the structured payload for that kind. A sun reading carries
//          { hour, zone, condition }; a watering carries { zone, amount, unit }.
//          Deliberately free-form: the fall crops of 2026 and whatever he tries
//          in 2029 should not need a schema migration between them.
//
// INDEXED ON date AND kind because both real queries need them — "what happened
// this week" (attendance, the Friday card) and "every watering since August"
// (the Q4 moisture-sensor build, which is the whole reason the log exists).
//
// Purely additive: new table, no existing definition touched, no migration.
// ---------------------------------------------------------------------------
db.version(28).stores({
  meta: 'id',
  lessonProgress: 'lessonId',
  writingEntries: '++id, promptId, completedAt',
  typingScores: 'passageId',
  weeklyWordState: 'skill',
  schedule: 'id',
  typingLessonProgress: 'lessonId',
  attendance: 'date',
  parentNotes: '++id, createdAt',
  assignments: '++id, dueDate, completed',
  readingLog: '++id, date',
  portfolio: '++id, dateCompleted',
  khanAcademyAssignments: '++id, subject, completed',
  reviewSchedule: 'generatorId',
  selfExplanations: '++id, lessonId, completedAt',
  studyCycle: 'key',
  peBodyMetrics: '++id, date',
  peDailyLog: 'date',
  peWorkoutLog: '++id, date, category',
  peWeeklyGoals: 'weekKey',
  peMeals: '++id, date, mealType',
  academicBooks: '++id, subject, slotId, status',
  academicAssignments: '++id, subject, slotId, quarter, status, dueDate',
  adminRecords: '++id, kind, date',
  courseDescriptions: 'subject',
  complianceChecks: 'key',
  evidenceLinks: 'key',
  parentAuth: 'id',
  missionEvaluations: 'quarter',
  rewards: '++id, active, createdAt',
  rewardRedemptions: '++id, status, createdAt',
  readinessAwards: 'skillId',
  fieldTrips: '++id, date, status',
  messages: '++id, createdAt',
  // See the header note in _build/daily/db.mjs: one row per DAY, holding a
  // boolean per subject. Separate from khanAcademyAssignments on purpose —
  // "did he work today" and "is this unit finished" are different questions.
  khanDailyLog: 'date',
  gardenLog: '++id, date, kind'
});

// ---------------------------------------------------------------------------
// v29 (Aug 8, 2026) — guitarLog. Electric Guitar's single record table.
//
// ONE TABLE, NOT FIVE, for exactly the reason gardenLog is one table: a
// practice session, a theory item read, a song he picked for himself, a song he
// finished, and a recording are all "something he did with the guitar on a
// date". Splitting them would multiply the hydrate, export, import and reset
// wiring by five for no gain whatsoever.
//
//   kind — 'practice' | 'theory' | 'skill-cleared' | 'song-picked'
//          | 'song-learned' | 'recording'
//   data — the structured payload for that kind. A practice row carries
//          { minutes, skillNumber }; a theory row carries { itemId, correct };
//          a skill-cleared row carries { skillNumber }; a song row carries
//          { title, artist, url }. Deliberately free-form, so the songs he
//          picks in 2026 and whatever he is playing in 2029 never need a
//          schema migration between them.
//
// INDEXED ON date AND kind because both real queries need them: "did he
// practise today, and what is the streak" (the daily card, attendance) and
// "how many practice sessions this year" (the participation record on his
// transcript).
//
// Purely additive: new table, no existing definition touched, no migration.
// ---------------------------------------------------------------------------
db.version(29).stores({
  meta: 'id',
  lessonProgress: 'lessonId',
  writingEntries: '++id, promptId, completedAt',
  typingScores: 'passageId',
  weeklyWordState: 'skill',
  schedule: 'id',
  typingLessonProgress: 'lessonId',
  attendance: 'date',
  parentNotes: '++id, createdAt',
  assignments: '++id, dueDate, completed',
  readingLog: '++id, date',
  portfolio: '++id, dateCompleted',
  khanAcademyAssignments: '++id, subject, completed',
  reviewSchedule: 'generatorId',
  selfExplanations: '++id, lessonId, completedAt',
  studyCycle: 'key',
  peBodyMetrics: '++id, date',
  peDailyLog: 'date',
  peWorkoutLog: '++id, date, category',
  peWeeklyGoals: 'weekKey',
  peMeals: '++id, date, mealType',
  academicBooks: '++id, subject, slotId, status',
  academicAssignments: '++id, subject, slotId, quarter, status, dueDate',
  adminRecords: '++id, kind, date',
  courseDescriptions: 'subject',
  complianceChecks: 'key',
  evidenceLinks: 'key',
  parentAuth: 'id',
  missionEvaluations: 'quarter',
  rewards: '++id, active, createdAt',
  rewardRedemptions: '++id, status, createdAt',
  readinessAwards: 'skillId',
  fieldTrips: '++id, date, status',
  messages: '++id, createdAt',
  // See the header note in _build/daily/db.mjs: one row per DAY, holding a
  // boolean per subject. Separate from khanAcademyAssignments on purpose —
  // "did he work today" and "is this unit finished" are different questions.
  khanDailyLog: 'date',
  gardenLog: '++id, date, kind',
  // See the header note above: one row per real thing done with the guitar.
  guitarLog: '++id, date, kind'
});

// ---------------------------------------------------------------------------
// v30 (Aug 8, 2026) — ledger. The marketplace economy.
//
// PRIMARY KEY IS entryId, A GENERATED STRING — NOT '++id'. This is the whole
// reason the table can exist at all. Every other table here uses Dexie's
// auto-increment, which is correct for data that only ever lives on one
// machine. Money does not: the parent grants a bonus on HER computer while the
// student spends on HIS, and both sides travel in the JSON export. With
// auto-increment, her entry #47 and his entry #47 are different events wearing
// the same key, and a merge silently destroys one of them. A generated unique
// id makes merging a plain UNION, which cannot conflict.
//
// APPEND-ONLY. Rows are never edited or deleted; a refund is a new positive
// entry, not the removal of the spend. That is what keeps "where did my coins
// go" answerable, and what makes the merge safe — a deletion cannot be
// represented in a union merge, so nothing is ever deleted.
//
//   entryId  — globally unique, from crypto.randomUUID()
//   currency — 'coin' | 'credit'
//   amount   — SIGNED. Negative is a spend, positive is a grant/refund/reward.
//   kind     — 'opening' | 'spend' | 'refund' | 'grant' | 'deduct'
//              | 'challenge' | 'crate' | 'match'
//   source   — free text: 'cosmetic', 'parent', 'auto', 'weekly-challenge'...
//   note     — human-readable, shown in the earn history
//   at       — ISO timestamp
//   device   — which machine created it, so a merge is auditable
//
// NOTE ON WHAT IS *NOT* IN HERE: passive earning. Coins and Credits earned
// from XP are DERIVED (floor(xp / rate)), not stored as entries. XP is already
// monotonic and already merges by max, so deriving that half is safe and
// avoids emitting thousands of rows. See src/lib/economy.js for the full
// reasoning. Balance = derived earning + the sum of these entries.
//
// Purely additive: new table, no existing definition touched, no migration.
// ---------------------------------------------------------------------------
db.version(30).stores({
  meta: 'id',
  lessonProgress: 'lessonId',
  writingEntries: '++id, promptId, completedAt',
  typingScores: 'passageId',
  weeklyWordState: 'skill',
  schedule: 'id',
  typingLessonProgress: 'lessonId',
  attendance: 'date',
  parentNotes: '++id, createdAt',
  assignments: '++id, dueDate, completed',
  readingLog: '++id, date',
  portfolio: '++id, dateCompleted',
  khanAcademyAssignments: '++id, subject, completed',
  reviewSchedule: 'generatorId',
  selfExplanations: '++id, lessonId, completedAt',
  studyCycle: 'key',
  peBodyMetrics: '++id, date',
  peDailyLog: 'date',
  peWorkoutLog: '++id, date, category',
  peWeeklyGoals: 'weekKey',
  peMeals: '++id, date, mealType',
  academicBooks: '++id, subject, slotId, status',
  academicAssignments: '++id, subject, slotId, quarter, status, dueDate',
  adminRecords: '++id, kind, date',
  courseDescriptions: 'subject',
  complianceChecks: 'key',
  evidenceLinks: 'key',
  parentAuth: 'id',
  missionEvaluations: 'quarter',
  rewards: '++id, active, createdAt',
  rewardRedemptions: '++id, status, createdAt',
  readinessAwards: 'skillId',
  fieldTrips: '++id, date, status',
  messages: '++id, createdAt',
  // See the header note in _build/daily/db.mjs: one row per DAY, holding a
  // boolean per subject. Separate from khanAcademyAssignments on purpose —
  // "did he work today" and "is this unit finished" are different questions.
  khanDailyLog: 'date',
  gardenLog: '++id, date, kind',
  // See the header note above: one row per real thing done with the guitar.
  guitarLog: '++id, date, kind',
  // Part 10's money record. See the header note above this version block.
  ledger: 'entryId, currency, kind, at'
});

// ---------------------------------------------------------------------------
// v31 (Aug 9, 2026) — `syncId` on the five tables that cross machines and
// cannot be matched by a natural key.
//
// THE BUG CLASS THIS CLOSES, FOR THE FOURTH TIME. `offlineMinutes`, then
// cosmetics, then selfExplanations, then rewardRedemptions: every time, a
// table was written on the student's computer and silently never reached the
// parent's, because the export payload was hand-maintained and something got
// left off it. The export is now guarded by scripts/verify-export-completeness
// (every table in this schema must be exported or explicitly excluded with a
// written reason), and the tables that had no safe merge key now have one.
//
// WHY NOT JUST '++id'. The v30 ledger note above says it plainly: Dexie's
// auto-increment is correct for data that only ever lives on one machine, and
// wrong for anything that travels. Her redemption #12 and his redemption #12
// are different events wearing the same key. The ledger solved this by making
// the generated id the PRIMARY key; here the primary key is left alone (an
// alter-primary-key migration on live data the parent already has is a risk
// with no upside) and `syncId` is added ALONGSIDE it as the merge identity.
// Local code keeps using `id`; only the merge uses `syncId`.
//
// WHY THESE FIVE:
//   rewards           — her catalog. Edits and deletions have to reach him.
//   rewardRedemptions — his requests and her approvals. Both directions.
//   fieldTrips        — either machine can add one.
//   assignments       — Planner items. She writes them, he has to see them.
//   selfExplanations  — his written answers, and the grade + note coming back.
//
// `updatedAt` is stamped alongside so a merge can pick the later edit rather
// than guessing. `deletedAt` is a TOMBSTONE: from v31 these tables soft-delete
// instead of dropping the row, because a deletion cannot be represented in a
// union merge — a row she deleted would be resurrected by his next import,
// which is the same reasoning that made the ledger append-only.
//
// The upgrade backfills every existing row, so rows created before today merge
// exactly as well as rows created after it.
// ---------------------------------------------------------------------------
db.version(31)
  .stores({
    meta: 'id',
    lessonProgress: 'lessonId',
    writingEntries: '++id, promptId, completedAt',
    typingScores: 'passageId',
    weeklyWordState: 'skill',
    schedule: 'id',
    typingLessonProgress: 'lessonId',
    attendance: 'date',
    parentNotes: '++id, createdAt',
    assignments: '++id, dueDate, completed, syncId',
    readingLog: '++id, date',
    portfolio: '++id, dateCompleted',
    khanAcademyAssignments: '++id, subject, completed',
    reviewSchedule: 'generatorId',
    selfExplanations: '++id, lessonId, completedAt, syncId',
    studyCycle: 'key',
    peBodyMetrics: '++id, date',
    peDailyLog: 'date',
    peWorkoutLog: '++id, date, category',
    peWeeklyGoals: 'weekKey',
    peMeals: '++id, date, mealType',
    academicBooks: '++id, subject, slotId, status',
    academicAssignments: '++id, subject, slotId, quarter, status, dueDate',
    adminRecords: '++id, kind, date',
    courseDescriptions: 'subject',
    complianceChecks: 'key',
    evidenceLinks: 'key',
    parentAuth: 'id',
    missionEvaluations: 'quarter',
    rewards: '++id, active, createdAt, syncId',
    rewardRedemptions: '++id, status, createdAt, syncId',
    readinessAwards: 'skillId',
    fieldTrips: '++id, date, status, syncId',
    messages: '++id, createdAt',
    khanDailyLog: 'date',
    gardenLog: '++id, date, kind',
    guitarLog: '++id, date, kind',
    ledger: 'entryId, currency, kind, at'
  })
  .upgrade(async (tx) => {
    // Backfill deterministically-unique ids for rows that predate this
    // version. The device tag is included so two machines that both hold a
    // pre-v31 copy of the SAME seeded row still produce different ids — which
    // is correct: they are genuinely two rows until something ties them
    // together, and the seeded-reward migration below does that by name.
    const stamp = new Date().toISOString();
    for (const table of ['rewards', 'rewardRedemptions', 'fieldTrips', 'assignments', 'selfExplanations']) {
      const rows = await tx.table(table).toArray();
      for (const row of rows) {
        if (row.syncId) continue;
        await tx.table(table).put({
          ...row,
          syncId: newSyncId(),
          updatedAt: row.updatedAt || row.resolvedAt || row.createdAt || row.completedAt || stamp
        });

      }
    }
  });

/**
 * ---- v32 (Aug 16, 2026) — DREAM GOALS ----
 *
 * The parent: "He's banking something he can't spend."
 *
 * Half right, and the half she was wrong about is the important one. Spending
 * already worked — `redeemReward` has taken Credits and raised an approval
 * since Aug 9. What did not exist, in any file, was **saving**: the Dream Goal
 * and its 25% match. `dreamMatchFor()` has sat in economy.js since the economy
 * shipped, exported, documented, and called by nothing.
 *
 * Which means the ladder's whole top half was unreachable in practice. A boy
 * with 120 Credits and a 2,000-Credit goal has no way to hold money still, and
 * the 50-Credit privilege is always right there. **Without a place to save,
 * every economy collapses to its cheapest item.**
 *
 * One table, additive, no migration: goals are their own rows and the money
 * stays in the ledger where it has always been.
 */
db.version(32).stores({
  meta: 'id',
  lessonProgress: 'lessonId',
  writingEntries: '++id, promptId, completedAt',
  typingScores: 'passageId',
  weeklyWordState: 'skill',
  schedule: 'id',
  typingLessonProgress: 'lessonId',
  attendance: 'date',
  parentNotes: '++id, createdAt',
  assignments: '++id, dueDate, completed, syncId',
  readingLog: '++id, date',
  portfolio: '++id, dateCompleted',
  khanAcademyAssignments: '++id, subject, completed',
  reviewSchedule: 'generatorId',
  selfExplanations: '++id, lessonId, completedAt, syncId',
  studyCycle: 'key',
  peBodyMetrics: '++id, date',
  peDailyLog: 'date',
  peWorkoutLog: '++id, date, category',
  peWeeklyGoals: 'weekKey',
  peMeals: '++id, date, mealType',
  academicBooks: '++id, subject, slotId, status',
  academicAssignments: '++id, subject, slotId, quarter, status, dueDate',
  adminRecords: '++id, kind, date',
  courseDescriptions: 'subject',
  complianceChecks: 'key',
  evidenceLinks: 'key',
  parentAuth: 'id',
  missionEvaluations: 'quarter',
  rewards: '++id, active, createdAt, syncId',
  rewardRedemptions: '++id, status, createdAt, syncId',
  readinessAwards: 'skillId',
  fieldTrips: '++id, date, status, syncId',
  messages: '++id, createdAt',
  khanDailyLog: 'date',
  gardenLog: '++id, date, kind',
  guitarLog: '++id, date, kind',
  ledger: 'entryId, currency, kind, at',
  dreamGoals: 'syncId, status, createdAt'
});

/**
 * ---- v33 (Aug 20, 2026) — THE MORNING MEETING ----
 *
 * A parent, on why a school day needed a real record: **"He logs in at 8:30
 * every morning and works until he completes everything. It has to be longer
 * than 4 1/2 hrs."**
 *
 * It was. Her record disagreed, and one of the reasons was that
 * `block-1` — "Morning Meeting, Goals & Calendar", 08:30-09:00, thirty
 * minutes — existed in exactly one file, `defaultSchedule.js`, and nowhere
 * else in the codebase. No screen, no content, no completion record, no entry
 * in BLOCK_FOR_SUBJECT. **It could not book a minute, ever.** Thirty minutes a
 * day across a 180-day year is ninety hours that were structurally impossible
 * to count.
 *
 * Her answer when given the choice between a checkbox and a real screen: build
 * the meeting. Check email for a new build, load back what Mom graded, read
 * what today holds, name a goal, and say what he is stuck on before he is
 * sitting alone with it at two in the afternoon.
 *
 * ONE ROW PER DAY, KEYED BY DATE — the same shape as `attendance`,
 * `khanDailyLog` and `peDailyLog`, and for the same reason: a day is done or
 * it is not, doing it twice is not a thing, and the merge across two computers
 * is then trivially idempotent.
 *
 * Additive. No migration: there is no prior data to reshape.
 */
db.version(33).stores({
  meta: 'id',
  lessonProgress: 'lessonId',
  writingEntries: '++id, promptId, completedAt',
  typingScores: 'passageId',
  weeklyWordState: 'skill',
  schedule: 'id',
  typingLessonProgress: 'lessonId',
  attendance: 'date',
  parentNotes: '++id, createdAt',
  assignments: '++id, dueDate, completed, syncId',
  readingLog: '++id, date',
  portfolio: '++id, dateCompleted',
  khanAcademyAssignments: '++id, subject, completed',
  reviewSchedule: 'generatorId',
  selfExplanations: '++id, lessonId, completedAt, syncId',
  studyCycle: 'key',
  peBodyMetrics: '++id, date',
  peDailyLog: 'date',
  peWorkoutLog: '++id, date, category',
  peWeeklyGoals: 'weekKey',
  peMeals: '++id, date, mealType',
  academicBooks: '++id, subject, slotId, status',
  academicAssignments: '++id, subject, slotId, quarter, status, dueDate',
  adminRecords: '++id, kind, date',
  courseDescriptions: 'subject',
  complianceChecks: 'key',
  evidenceLinks: 'key',
  parentAuth: 'id',
  missionEvaluations: 'quarter',
  rewards: '++id, active, createdAt, syncId',
  rewardRedemptions: '++id, status, createdAt, syncId',
  readinessAwards: 'skillId',
  fieldTrips: '++id, date, status, syncId',
  messages: '++id, createdAt',
  khanDailyLog: 'date',
  gardenLog: '++id, date, kind',
  guitarLog: '++id, date, kind',
  ledger: 'entryId, currency, kind, at',
  dreamGoals: 'syncId, status, createdAt',
  morningMeetings: 'date'
});

/**
 * ===========================================================================
 * v34 — THE THREE TABLES THAT WERE MISSED ON v31. (Aug 25, 2026.)
 * ===========================================================================
 *
 * Found by the Aug 23 audit, item N-2.
 *
 * v31 gave five tables a `syncId` and a `deletedAt` tombstone so that a
 * deletion could travel between the two computers instead of being resurrected
 * by the next import. `readingLog`, `portfolio` and `peMeals` were missed, and
 * all three travel in the export. The consequence was two bugs at once:
 *
 *   1. **DELETIONS RESURRECT.** She removes a book from the reading log on her
 *      computer. His copy still has it. His next export puts it straight back,
 *      and it is not obvious that it ever left — so she deletes it again.
 *   2. **EDITS NEVER TRAVEL AT ALL.** The merge for these three was purely
 *      additive on a natural key: a row whose key already existed was SKIPPED
 *      whole. Fix a title, add the page count, correct a protein figure — none
 *      of it crosses. This half is the quieter one and probably the worse one,
 *      because nothing about it looks like a failure.
 *
 * Additive schema change: `syncId` becomes an index on the three, matching the
 * five that already carry it. No data is reshaped and no upgrade function is
 * needed — rows written before today simply have no `syncId`, and the merge
 * pairs those up on a natural key (title+date, title+dateCompleted,
 * date+mealType+description) exactly the way `mergeBySyncId`'s `fallbackKey`
 * was built for on v31. After one merge every row has one.
 *
 * Deliberately NOT retired here: the `ixlCompletions` and
 * `ixlDiagnosticCheckins` object stores inherited from v9-v11. They are empty,
 * and removing them needs `tableName: null` rather than omission — see the
 * correction to the comment at the top of this file. That is its own change
 * with its own verification, not a passenger on this one.
 *
 * ---- WHY THIS BLOCK REPEATS EVERY TABLE ----
 *
 * Dexie's `stores()` is cumulative, so a three-line version block would work
 * at runtime. It is written out in full anyway, matching v33 and every version
 * before it, because `scripts/verify-export-completeness.mjs` reads the LATEST
 * block as the definitive list of what tables exist — and that guard is the
 * thing standing between this project and a fifth export that silently omits a
 * table. A partial block would make the newest version of the schema the
 * least informative place to read it, which is backwards.
 */
db.version(34).stores({
  meta: 'id',
  lessonProgress: 'lessonId',
  writingEntries: '++id, promptId, completedAt',
  typingScores: 'passageId',
  weeklyWordState: 'skill',
  schedule: 'id',
  typingLessonProgress: 'lessonId',
  attendance: 'date',
  parentNotes: '++id, createdAt',
  assignments: '++id, dueDate, completed, syncId',
  readingLog: '++id, date, syncId', // v34: syncId
  portfolio: '++id, dateCompleted, syncId', // v34: syncId
  khanAcademyAssignments: '++id, subject, completed',
  reviewSchedule: 'generatorId',
  selfExplanations: '++id, lessonId, completedAt, syncId',
  studyCycle: 'key',
  peBodyMetrics: '++id, date',
  peDailyLog: 'date',
  peWorkoutLog: '++id, date, category',
  peWeeklyGoals: 'weekKey',
  peMeals: '++id, date, mealType, syncId', // v34: syncId
  academicBooks: '++id, subject, slotId, status',
  academicAssignments: '++id, subject, slotId, quarter, status, dueDate',
  adminRecords: '++id, kind, date',
  courseDescriptions: 'subject',
  complianceChecks: 'key',
  evidenceLinks: 'key',
  parentAuth: 'id',
  missionEvaluations: 'quarter',
  rewards: '++id, active, createdAt, syncId',
  rewardRedemptions: '++id, status, createdAt, syncId',
  readinessAwards: 'skillId',
  fieldTrips: '++id, date, status, syncId',
  messages: '++id, createdAt',
  khanDailyLog: 'date',
  gardenLog: '++id, date, kind',
  guitarLog: '++id, date, kind',
  ledger: 'entryId, currency, kind, at',
  dreamGoals: 'syncId, status, createdAt',
  morningMeetings: 'date'
});
/**
 * ---------------------------------------------------------------------------
 * v35 — TYPING GETS A DATE. (Aug 26, 2026, audit item O-6.)
 * ---------------------------------------------------------------------------
 *
 * `typingScores` is keyed by passage and `typingLessonProgress` by lesson.
 * Neither carries a DATE. He can practise typing every day for a year and no
 * record anywhere can say which days — so `coveredBlockIds` had no branch for
 * typing, and could not have had one.
 *
 * **block-5b is fifteen minutes a day, five days a week: about 45 hours a year
 * that this app was structurally unable to count toward Georgia's 4.5-hour
 * bar.** The comment in lib/scheduledMinutes.js names this exact failure —
 *
 *   > "a block nothing can credit is ninety hours a year that cannot be
 *   > counted, and this project has already shipped exactly that once, in
 *   > block-1."
 *
 * It shipped it twice. block-5b was the second, and it went unnoticed because
 * the typing work WAS being recorded — just recorded in a shape no calendar
 * can read. A personal best is not evidence of a school day.
 *
 * `typingLog` is the same shape as `guitarLog` and `gardenLog` deliberately:
 * one row per real thing he did, carrying the date it happened. The two score
 * tables keep doing their job (bests and mastery); this one is the attendance
 * record they could never be.
 */
db.version(35).stores({
  meta: 'id',
  lessonProgress: 'lessonId',
  writingEntries: '++id, promptId, completedAt',
  typingScores: 'passageId',
  weeklyWordState: 'skill',
  schedule: 'id',
  typingLessonProgress: 'lessonId',
  attendance: 'date',
  parentNotes: '++id, createdAt',
  assignments: '++id, dueDate, completed, syncId',
  readingLog: '++id, date, syncId', // v34: syncId
  portfolio: '++id, dateCompleted, syncId', // v34: syncId
  khanAcademyAssignments: '++id, subject, completed',
  reviewSchedule: 'generatorId',
  selfExplanations: '++id, lessonId, completedAt, syncId',
  studyCycle: 'key',
  peBodyMetrics: '++id, date',
  peDailyLog: 'date',
  peWorkoutLog: '++id, date, category',
  peWeeklyGoals: 'weekKey',
  peMeals: '++id, date, mealType, syncId', // v34: syncId
  academicBooks: '++id, subject, slotId, status',
  academicAssignments: '++id, subject, slotId, quarter, status, dueDate',
  adminRecords: '++id, kind, date',
  courseDescriptions: 'subject',
  complianceChecks: 'key',
  evidenceLinks: 'key',
  parentAuth: 'id',
  missionEvaluations: 'quarter',
  rewards: '++id, active, createdAt, syncId',
  rewardRedemptions: '++id, status, createdAt, syncId',
  readinessAwards: 'skillId',
  fieldTrips: '++id, date, status, syncId',
  messages: '++id, createdAt',
  khanDailyLog: 'date',
  gardenLog: '++id, date, kind',
  guitarLog: '++id, date, kind',
  typingLog: '++id, date, kind',
  ledger: 'entryId, currency, kind, at',
  dreamGoals: 'syncId, status, createdAt',
  morningMeetings: 'date'
});

/**
 * A globally unique id for a row that has to survive being merged with the
 * same table from another computer.
 *
 * Same construction and the same reason as `newEntryId` in lib/economy.js
 * (which the ledger uses). It lives here rather than being imported from
 * there so the schema file has no dependency on the economy — the ids are a
 * database concern, not a money one.
 */
export function newSyncId() {
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  } catch {
    /* fall through — older browsers, or a non-secure context */
  }
  return `s-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Every table in the schema, and whether it travels in the progress export.
 *
 * THIS IS THE GUARD'S SOURCE OF TRUTH, and it is deliberately in this file
 * rather than the store: a table is added HERE, so the decision about whether
 * it syncs has to be made HERE, in the same edit, or the guard fails.
 * scripts/verify-export-completeness.mjs cross-checks three things against
 * each other — the v-latest `stores()` block above, this map, and the payload
 * that exportProgressData actually builds. Any table missing from any of them
 * is a hard failure, which is what four repeats of "we forgot to export it"
 * finally bought.
 *
 * A value of `true` means the export must contain a key of that name.
 * A string means it is deliberately excluded, and the string is the reason.
 */
export const EXPORT_TABLE_POLICY = {
  meta: 'Scalars and keyed maps inside it are exported individually (xp, streak, rankTierDates, cosmetics…); the row itself holds machine-local settings and the dashboard passcode.',
  lessonProgress: true,
  writingEntries: true,
  typingScores: true,
  weeklyWordState: true,
  schedule: 'Parent-set configuration, not progress. Her timetable governs her machine.',
  typingLessonProgress: true,
  attendance: true,
  parentNotes: 'Her private observations about her son. Never leaves her computer.',
  assignments: true,
  readingLog: true,
  portfolio: true,
  khanAcademyAssignments: true,
  reviewSchedule: true,
  selfExplanations: true,
  studyCycle: true,
  peBodyMetrics: true,
  peDailyLog: true,
  peWorkoutLog: true,
  peWeeklyGoals: true,
  peMeals: true,
  academicBooks: true,
  academicAssignments: true,
  adminRecords: 'Her compliance records and her judgments. A file leaving his computer must not be able to overwrite them.',
  courseDescriptions: 'Her transcript writing. Same reason as adminRecords.',
  complianceChecks: 'Her checklist. Same reason as adminRecords.',
  evidenceLinks: 'Her evidence index. Same reason as adminRecords.',
  parentAuth: 'The dashboard passcode. Exporting it would put it in a file she emails around.',
  missionEvaluations: 'Her quarterly assessment of him. Same reason as adminRecords.',
  rewards: true,
  rewardRedemptions: true,
  readinessAwards: true,
  fieldTrips: true,
  messages: true,
  khanDailyLog: true,
  gardenLog: true,
  guitarLog: true,
  /**
   * His dated typing practice — the Georgia evidence for block-5b. A table
   * that stayed on his laptop would understate every school day by fifteen
   * minutes, which is the whole reason it exists.
   */
  typingLog: true,
  ledger: true,
  dreamGoals: true,
  /**
   * His morning meeting travels. The goal he set and the question he asked
   * are things she needs to see, and the completion is thirty minutes of
   * instruction on his Georgia record — a table that stayed on his laptop
   * would understate every school day by half an hour, which is the exact
   * bug this feature was built to fix.
   */
  morningMeetings: true
};

// ---------------------------------------------------------------------------
// Windowed hydrate loaders (Aug 2026). The two unbounded history tables
// (peMeals, messages) grow forever, so hydrate loads only a WORKING WINDOW
// of each into the in-memory store; the loadAll* functions above remain for
// export/import/full-history needs — a backup must always contain every row,
// and import dedup must baseline against the full table, never the window.
// Both queries run against indexes that already exist: peMeals has `date`
// indexed since the v25 schema ('++id, date, mealType') and messages has
// `createdAt` indexed since v26 ('++id, createdAt') — no schema change
// needed, and none is made here.
// ---------------------------------------------------------------------------
export async function loadKhanDailyLog(sinceDateStr) {
  return db.khanDailyLog.where('date').aboveOrEqual(sinceDateStr).toArray();
}

export async function saveKhanDailyLogRecord(date, subjects) {
  return db.khanDailyLog.put({ date, subjects });
}

export async function loadMorningMeetings(sinceDateStr) {
  return db.morningMeetings.where('date').aboveOrEqual(sinceDateStr).toArray();
}

export async function saveMorningMeetingRecord(row) {
  // row: { date, completedAt, goal, question, checkedForUpdate, syncedWork,
  //        checkedPlanner, checkedProgress, buildStamp }
  return db.morningMeetings.put(row);
}

export async function loadRecentPEMeals(sinceDateStr) {
  return db.peMeals.where('date').aboveOrEqual(sinceDateStr).toArray();
}

export async function loadAllGardenLog() {
  return db.gardenLog.toArray();
}

export async function saveGardenLogEntry(entry) {
  // entry: { date, kind, briefId, projectId, title, notes, data, createdAt }
  return db.gardenLog.add(entry);
}

export async function loadAllGuitarLog() {
  return db.guitarLog.toArray();
}

export async function saveGuitarLogEntry(entry) {
  // entry: { date, kind, skillId, theoryId, title, notes, data, createdAt }
  return db.guitarLog.add(entry);
}

export async function loadAllTypingLog() {
  return db.typingLog.toArray();
}

export async function saveTypingLogEntry(entry) {
  // entry: { date, kind, passageId, lessonId, wpm, accuracy, createdAt }
  return db.typingLog.add(entry);
}

export async function loadRecentMessages(limit = 500) {
  const rows = await db.messages.orderBy('createdAt').reverse().limit(limit).toArray();
  return rows.reverse();
}

