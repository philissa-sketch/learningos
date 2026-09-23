// ---------------------------------------------------------------------------
// Local persistence. Dexie over IndexedDB, exactly as Mission Control does it,
// so the same computer runs both apps with no server and no account.
//
// SEPARATE DATABASE NAME, DELIBERATELY. Mission Control's database is called
// 'MissionControlDB'. This one is 'PetalPestleDB'. Two databases on one
// browser profile never see each other, which is the entire safety story for
// running a sibling's app on the same machine: there is no shared table for
// one app to write into by accident.
//
// EVERY ANSWER IS STORED, not just the score. The Grown-Up Corner's history is
// built from the `answers` table, so what a parent reads is what happened,
// question by question — not a summary the app computed and then lost the
// working for.
// ---------------------------------------------------------------------------

import Dexie from 'dexie';
import {
  answerKey,
  sittingKey,
  pickStrand,
  isInProgress,
  pickJournal,
  pickMessage,
  mergeScheduleDay,
  pickReviewItem,
  pickLessonRead,
  pickProject,
  pickKhanGrade,
  pickWritingMark,
  pickBaseline,
  pickItemEvent,
  pickGoal,
  pickJournalMark,
  pickWritingDraft
} from '../lib/mergeBackup.js';


// ===========================================================================
// ⚠️ HOW THIS FILE DIFFERS FROM THE STANDALONE APP'S (Sept 23, 2026)
//
// Brought across from the standalone Petal & Pestle app so her own screens
// run on her own records. Every helper below is the standalone app's,
// unchanged. Only the CONNECTION changed:
//
//   · The standalone app opened 'PetalPestleDB' the moment this file loaded.
//     Here the database belongs to this school inside LearningOS, so it is
//     named by ownDbName() and opened on first use (the platform's guard,
//     scripts/verify-academy-db.mjs, checks both).
//   · The standalone app's twelve schema versions existed to upgrade older
//     copies of ITS database. This database started on Sept 23 with version 1
//     (reading checks only) and version 2 (every table, identical to the
//     standalone app's version 12). Those two are what is declared here, so
//     nothing that already exists is re-shaped.
//   · `db` is a stand-in that opens the real connection when first touched,
//     so every helper below reads exactly as it did.
// ===========================================================================
import { loadedAcademyId } from '../../../content/academyContent.js';

/**
 * Every table in the standalone Petal & Pestle app, schema v12, key for key.
 */
export const HER_TABLES = Object.freeze({
  meta: 'key',
  strandStates: 'strandId',
  answers: '++id, itemId, strandId, at',
  sittings: '++id, startedAt',
  ledger: 'entryId, currency, at',
  requests: 'requestId, status, at',
  journal: 'entryId, at, kind',
  messages: 'messageId, at, from, readAt',
  scheduleDays: 'dayKey',
  attempts: 'attemptId, testId, dayKey, at',
  reviewItems: 'questionId, dueOn, box',
  lessonReads: 'lessonId, lastReadAt',
  projects: 'projectId, doneAt',
  khanGrades: 'gradeId, subject, at',
  writingMarks: 'markId, pieceId, at',
  itemEvents: 'eventId, questionId, evidenceSource, dayKey',
  baselines: 'trackId',
  goals: 'goalId, strandId, status, termId',
  journalMarks: 'entryId, dayKey, at',
  writingDrafts: 'slotId, updatedAt',
  spellingResults: 'resultId, listId, dayKey, at'
});

/** Every database this school opens starts with this. Never 'LearningOSDB_'. */
export const OWN_DB_PREFIX = 'PetalPestleSchool_';

/**
 * The database name for this school. Refuses to guess one.
 *
 * ⚠️ ONE PER SCHOOL ON THIS COMPUTER, NOT PER CHILD. loadedAcademyId() answers
 * with the school's content-pack id, not the signed-in child's — the platform
 * tells only its own db.js who is signed in. Fine while one child uses this
 * school on a computer; a second would need the platform to pass that id on.
 */
export function ownDbName(academyId) {
  if (!academyId || typeof academyId !== 'string') {
    throw new Error('Petal & Pestle records: no school is loaded, so there is no database to open.');
  }
  return `${OWN_DB_PREFIX}${academyId}`;
}

let connection = null;
let connectionFor = null;

/** The real connection, built on first use and rebuilt if the school changes. */
export function openOwn() {
  const academyId = loadedAcademyId();
  if (connection && connectionFor === academyId) return connection;
  if (connection) connection.close();
  const conn = new Dexie(ownDbName(academyId));
  conn.version(1).stores({ attempts: 'attemptId, testId, dayKey, at' });
  conn.version(2).stores(HER_TABLES);
  conn.on('blocked', () => window.dispatchEvent(new CustomEvent('pp-db-blocked')));
  conn.on('versionchange', () => window.dispatchEvent(new CustomEvent('pp-db-versionchange')));
  connection = conn;
  connectionFor = academyId;
  return connection;
}

/**
 * Stands in for the standalone app's `db`. Reading any property opens the
 * real connection first, so `db.meta.get(...)` below works unchanged.
 */
export const db = new Proxy(
  {},
  {
    get(_, prop) {
      const conn = openOwn();
      const value = conn[prop];
      return typeof value === 'function' ? value.bind(conn) : value;
    }
  }
);


/**
 * The version stamped on every backup this app writes, and the one it checks
 * on every backup it reads.
 *
 * It was typed twice — `db.version(7)` in the ladder above and a literal `7` in
 * exportAll's return block — with nothing holding them together. Every
 * hand-typed number in this project has drifted; check-import now asserts this
 * constant equals the highest db.version on disk, so the next one cannot.
 */
export const BACKUP_VERSION = 12;

export const EXPORT_TABLE_POLICY = {
  meta: true,
  strandStates: true,
  answers: true,
  sittings: true,
  ledger: true,
  requests: true,
  journal: true,
  messages: true,
  scheduleDays: true,
  attempts: true,
  reviewItems: true,
  lessonReads: true,
  projects: true,
  khanGrades: true,
  writingMarks: true,
  // Added at v8 — and the guard written at v3.56 caught both of these the
  // moment the schema changed and the policy had not. First real use, on the
  // first schema change after it was written.
  itemEvents: true,
  baselines: true,
  // Added v9.
  goals: true,
  // Added v10. Her daily journal mark — six graded pieces a year were never
  // going to measure daily writing, and this is the record that does.
  journalMarks: true,
  // Added v11. HER OWN WORDS in a book report — the artifact the portfolio is
  // actually made of. It carries more of her writing than anything else in this
  // table, so it is the last thing that may be dropped from a backup.
  writingDrafts: true,
  // Added v12. Her spelling results. Travels: it is the only record that a
  // spelling test was ever sat, and the carry-over rule reads it to decide
  // what follows her into next week.
  spellingResults: true
};


export async function readMeta(key, fallback = null) {
  const row = await db.meta.get(key);
  return row === undefined ? fallback : row.value;
}

export async function writeMeta(key, value) {
  await db.meta.put({ key, value });
}

export async function readAllStrandStates() {
  return db.strandStates.toArray();
}

export async function writeStrandState(state) {
  await db.strandStates.put(state);
}

export async function appendAnswer(record) {
  await db.answers.add(record);
}

export async function readAnswers() {
  return db.answers.orderBy('at').toArray();
}

export async function startSitting(at) {
  return db.sittings.add({ startedAt: at, endedAt: null, answered: 0 });
}

export async function endSitting(id, at, answered) {
  await db.sittings.update(id, { endedAt: at, answered });
}

export async function readSittings() {
  return db.sittings.orderBy('startedAt').toArray();
}

// ---------------------------------------------------------------------------
// Economy
// ---------------------------------------------------------------------------

export async function readLedger() {
  return db.ledger.orderBy('at').toArray();
}

export async function appendLedgerEntry(entry) {
  // put, not add: entryId is a UUID, so a re-import of the same entry should be
  // idempotent rather than throwing. That is what makes a merge safe to re-run.
  await db.ledger.put(entry);
}

export async function readRequests() {
  return db.requests.orderBy('at').toArray();
}

export async function putRequest(request) {
  await db.requests.put(request);
}

// ---------------------------------------------------------------------------
// Journal, Messages, Schedule (Phase 2)
// ---------------------------------------------------------------------------

export async function readJournal() {
  return db.journal.orderBy('at').toArray();
}

export async function putJournalEntry(entry) {
  // put, not add — entryId is a UUID, so re-importing the same entry is
  // idempotent rather than a crash. Same rule as the ledger.
  await db.journal.put(entry);
}

export async function deleteJournalEntry(entryId) {
  await db.journal.delete(entryId);
}

export async function readMessages() {
  return db.messages.orderBy('at').toArray();
}

export async function putMessage(message) {
  await db.messages.put(message);
}

export async function deleteMessage(messageId) {
  await db.messages.delete(messageId);
}

export async function readScheduleDays() {
  return db.scheduleDays.toArray();
}

export async function putScheduleDay(row) {
  await db.scheduleDays.put(row);
}

// ---------------------------------------------------------------------------
// LESSONS, TESTS AND THE REVIEW BOXES
// ---------------------------------------------------------------------------

export async function readLessonReads() {
  return db.lessonReads.toArray();
}

export async function putLessonRead(row) {
  await db.lessonReads.put(row);
}

export async function readAttempts() {
  return db.attempts.toArray();
}

export async function putAttempt(attempt) {
  await db.attempts.put(attempt);
}

export async function readReviewItems() {
  return db.reviewItems.toArray();
}

export async function putReviewItems(items) {
  // bulkPut rather than a loop: a warm-up moves three boxes at once and a
  // quarter test moves twenty-four. One write, one transaction.
  await db.reviewItems.bulkPut(items);
}

/**
 * Wipe everything and start over.
 *
 * Gated behind the Grown-Up Corner and a typed confirmation, because there is
 * no undo and no backup on another machine. A child clicking around must not
 * be able to reach this.
 *
 * ---- WHAT RESET DOES NOT TOUCH ----
 *
 * Her journal, her messages, her attendance, her test results, her lessons read
 * and her review boxes all survive a reset, deliberately.
 *
 * This button exists so the diagnostic can be retaken. It is not "delete the
 * child's work". Her writing cannot be regenerated by taking a test again, and
 * neither can a note her grandmother wrote her — wiping those as a side effect
 * of redoing an assessment would be destroying the only irreplaceable things in
 * the database to fix the most replaceable one.
 *
 * The same argument covers her school record. This button exists to redo the
 * placement Check-In. A unit test she sat in October is a fact about a day that
 * happened, and a transcript is not something to clear as a side effect of
 * re-measuring her reading level.
 *
 * The Grown-Up Corner says so in the confirmation, so the person pressing it
 * knows exactly what stays.
 */
export async function resetEverything() {
  await db.transaction('rw', db.meta, db.strandStates, db.answers, db.sittings, db.ledger, db.requests, async () => {
    await db.strandStates.clear();
    await db.answers.clear();
    await db.sittings.clear();
    // The ledger and her shelf go too. Resetting the diagnostic zeroes the
    // effort counters that the earned half of every balance is derived from, so
    // leaving purchases and grants behind would hand her a negative balance and
    // a shelf of things she can no longer explain owning.
    await db.ledger.clear();
    await db.requests.clear();
    await db.meta.delete('unlockedItems');
    await db.meta.delete('equippedGear');
    await db.meta.delete('dreamGoalId');
    // meta survives on purpose: her name and the parent passcode are settings,
    // not results. Clearing them would lock the parent out of the app she just
    // reset.
    await db.meta.delete('diagnosticStartedAt');
    await db.meta.delete('diagnosticCompletedAt');
  });
}

/** Everything, as one JSON object, for the Grown-Up Corner's export button.
 *  A local-only app with no cloud backup needs a way to get the data OUT. */

// ---------------------------------------------------------------------------
// LOADING A BACKUP BACK IN
//
// WHY THIS EXISTS. The export button said "Download backup" and there was no
// way to put one back, which meant it was not a backup — it was a snapshot you
// could read and never restore. That was a real flaw sitting behind a
// reassuring label.
//
// The immediate need is different and more practical: the app is BUILT on one
// computer and USED on another. Reviewing what needs changing means being able
// to see the real thing — her actual levels, her actual journal, her actual
// day — on the machine where the work happens.
//
// ---- THE ONE THING THAT MAKES THIS DANGEROUS ----
//
// `answers` and `sittings` are keyed by an AUTO-INCREMENT id. Her answer #12 on
// one computer and a different answer #12 on another are not the same event,
// and a naive import keyed on id would silently destroy one of them. So the
// incoming id is thrown away and rows are matched on what they actually are:
// an answer is (itemId, at); a sitting is (startedAt).
//
// This is the exact hazard the ledger was designed around from the start — its
// entryId is a UUID precisely so two machines can merge. The diagnostic tables
// predate that decision, which is why they need the workaround.
//
// ---- MERGE, NOT REPLACE ----
//
// Nothing is deleted. Every table takes the union, and where a row exists on
// both sides the rule is written down below rather than being whatever the
// last write happened to be. Importing the same file twice changes nothing the
// second time, which is what makes it safe to press again if you are not sure
// it worked.
// ---------------------------------------------------------------------------

// The rules themselves live in lib/mergeBackup.js as pure functions, because
// Dexie cannot run outside a browser and a merge rule nobody can test is a
// merge rule nobody should trust with a child's only copy of her writing.
// scripts/check-import.mjs tests them against a real two-machine collision.

/**
 * What WOULD change, without changing anything.
 *
 * Shown before the button is pressed, because "import" is the kind of word that
 * makes people hesitate — reasonably. Seeing "adds 61 answers, 0 already here"
 * turns it from a leap into a decision.
 */
export async function previewImport(data) {
  if (!data || data.app !== 'Petal & Pestle Academy') {
    throw new Error('That file is not a Petal & Pestle backup.');
  }

  // ---- THE VERSION GATE ----
  //
  // exportAll has always stamped a version, and the comment beside it says why
  // it matters: "an export that calls itself v6 while carrying v7 data is a
  // file that lies about itself." THE READER NEVER LOOKED. This function gated
  // on data.app alone, for seven versions.
  //
  // Old into new is safe and must stay safe — her Aug 13 file says version 2
  // and still holds real work. Every field the merge wants is either there or
  // absent, and absent means "nothing to merge".
  //
  // NEW INTO OLD IS NOT SAFE. A v8 file carrying a table this build has never
  // heard of would merge everything it recognised and drop the rest without a
  // word, and the only sign would be a count looking wrong weeks later. On a
  // household running two machines that update at different times, that is not
  // hypothetical — it is what a Tuesday looks like.
  const fileVersion = Number(data.version) || 0;
  if (fileVersion > BACKUP_VERSION) {
    throw new Error(
      `That backup was made by a newer version of Petal & Pestle (file v${fileVersion}, this app ` +
        `v${BACKUP_VERSION}). Loading it here would quietly drop anything this version does not ` +
        `know about. Update this computer first, then load it.`
    );
  }

  const [
    answers, strandStates, journal, messages, ledger, sittings, scheduleDays, attempts,
    lessonReads, projects, khanGrades, writingMarks, requests, itemEvents, baselines, goals,
    journalMarks, writingDrafts, spellingResults
  ] = await Promise.all([
      db.answers.toArray(),
      db.strandStates.toArray(),
      db.journal.toArray(),
      db.messages.toArray(),
      db.ledger.toArray(),
      db.sittings.toArray(),
      db.scheduleDays.toArray(),
      db.attempts.toArray(),
      db.lessonReads.toArray(),
      db.projects.toArray(),
      db.khanGrades.toArray(),
      db.writingMarks.toArray(),
      db.requests.toArray(),
      db.itemEvents.toArray(),
      db.baselines.toArray(),
      db.goals.toArray(),
      db.journalMarks.toArray(),
      db.writingDrafts.toArray(),
      db.spellingResults.toArray()
    ]);
  const haveAttempts = new Set(attempts.map((a) => a.attemptId));
  const haveLessons = new Set(lessonReads.map((l) => l.lessonId));

  const haveAnswers = new Set(answers.map(answerKey));
  const haveSittings = new Set(sittings.map(sittingKey));
  const haveJournal = new Set(journal.map((j) => j.entryId));
  const haveMessages = new Set(messages.map((m) => m.messageId));
  const haveLedger = new Set(ledger.map((e) => e.entryId));
  const haveDays = new Set(scheduleDays.map((d) => d.dayKey));
  const haveProjects = new Set(projects.map((p) => p.projectId));
  const haveKhan = new Set(khanGrades.map((g) => g.gradeId));
  const haveMarks = new Set(writingMarks.map((w) => w.markId));
  const haveRequests = new Set(requests.map((r) => r.requestId));
  const haveEvents = new Set(itemEvents.map((e) => e.eventId));
  const haveBaselines = new Set(baselines.map((b) => b.trackId));
  const haveGoals = new Set(goals.map((g) => g.goalId));
  const haveJournalMarks = new Set(journalMarks.map((m) => m.entryId));
  const haveDrafts = new Map(writingDrafts.map((w) => [w.slotId, w]));
  const haveSpelling = new Set(spellingResults.map((r) => r.resultId));
  const localStrands = new Map(strandStates.map((s) => [s.strandId, s]));

  const inAnswers = data.answers || [];
  const inStrands = data.strandStates || [];
  const name = (data.meta || []).find((m) => m.key === 'learnerName')?.value || null;

  // Computed once and used twice — in the answers row and in `freshness` below.
  // Two places counting the same thing is how the preview came to describe
  // eleven tables while the import merged fifteen.
  const newAnswers = inAnswers.filter((a) => !haveAnswers.has(answerKey(a))).length;
  const newestAt = (rows) => rows.reduce((m, a) => Math.max(m, a.at || 0), 0);

  return {
    learnerName: name,
    answers: { incoming: inAnswers.length, new: newAnswers },
    strands: {
      incoming: inStrands.length,
      // A strand is taken when the incoming side did MORE of it. Whichever
      // machine actually sat the test is the authority for that strand.
      willReplace: inStrands.filter((s) => pickStrand(localStrands.get(s.strandId), s) === s).length,

      // ---- THE STRANDS THE MERGE RULE REFUSED TO GO BACKWARDS ON ----
      //
      // Named rather than counted, because "3 strand results replaced" and
      // "geometry went from 2.70 back to 2.00" are not the same sentence to the
      // person holding the mouse. These are the rows where the incoming file
      // holds a FINISHED older reading and this machine is mid-re-measure —
      // pickStrand keeps the local one, and the screen says so instead of
      // asking her to trust that it did.
      // ⚠️ ASKS pickStrand, NEVER RE-IMPLEMENTS ITS RULE. The first version
      // duplicated the in-progress test here, and when pickStrand was corrected
      // on Aug 19 evening this copy would have gone on reporting the old answer
      // — a preview that disagrees with the merge it is previewing.
      protectedInProgress: inStrands
        .filter((s) => {
          const local = localStrands.get(s.strandId);
          return !!local && pickStrand(local, s) === local && (s.asked || 0) > (local.asked || 0);
        })
        .map((s) => {
          const local = localStrands.get(s.strandId);
          return {
            strandId: s.strandId,
            keptLevel: local.level,
            keptAsked: local.asked || 0,
            fileLevel: s.level,
            fileAsked: s.asked || 0
          };
        })
    },
    journal: { incoming: (data.journal || []).length, new: (data.journal || []).filter((j) => !haveJournal.has(j.entryId)).length },
    messages: { incoming: (data.messages || []).length, new: (data.messages || []).filter((m) => !haveMessages.has(m.messageId)).length },
    ledger: { incoming: (data.ledger || []).length, new: (data.ledger || []).filter((e) => !haveLedger.has(e.entryId)).length },
    sittings: { incoming: (data.sittings || []).length, new: (data.sittings || []).filter((s) => !haveSittings.has(sittingKey(s))).length },
    scheduleDays: { incoming: (data.scheduleDays || []).length, new: (data.scheduleDays || []).filter((d) => !haveDays.has(d.dayKey)).length },
    attempts: {
      incoming: (data.attempts || []).length,
      new: (data.attempts || []).filter((a) => !haveAttempts.has(a.attemptId)).length
    },
    lessonReads: {
      incoming: (data.lessonReads || []).length,
      new: (data.lessonReads || []).filter((l) => !haveLessons.has(l.lessonId)).length
    },
    reviewItems: { incoming: (data.reviewItems || []).length },

    // ---- FOUR TABLES THE PREVIEW NEVER MENTIONED ----
    //
    // importBackup merges fifteen tables. This function described eleven. Three
    // of the four missing ones are her SCHOOL RECORD — sixteen projects a year,
    // every Khan grade a grown-up typed, and all six pieces of graded writing —
    // and they were merged on the strength of a summary that did not list them.
    //
    // A diffing import whose diff is incomplete is worse than no diff: it looks
    // like a full account of what is about to happen, and a grown-up reads it
    // as one before pressing the button.
    projects: {
      incoming: (data.projects || []).length,
      new: (data.projects || []).filter((p) => !haveProjects.has(p.projectId)).length
    },
    khanGrades: {
      incoming: (data.khanGrades || []).length,
      new: (data.khanGrades || []).filter((g) => !haveKhan.has(g.gradeId)).length
    },
    writingMarks: {
      incoming: (data.writingMarks || []).length,
      new: (data.writingMarks || []).filter((w) => !haveMarks.has(w.markId)).length
    },
    requests: {
      incoming: (data.requests || []).length,
      new: (data.requests || []).filter((r) => !haveRequests.has(r.requestId)).length
    },
    itemEvents: {
      incoming: (data.itemEvents || []).length,
      new: (data.itemEvents || []).filter((e) => !haveEvents.has(e.eventId)).length
    },
    baselines: {
      incoming: (data.baselines || []).length,
      new: (data.baselines || []).filter((b) => !haveBaselines.has(b.trackId)).length
    },
    goals: {
      incoming: (data.goals || []).length,
      new: (data.goals || []).filter((g) => !haveGoals.has(g.goalId)).length
    },
    writingDrafts: {
      incoming: (data.writingDrafts || []).length,
      new: (data.writingDrafts || []).filter((w) => !haveDrafts.has(w.slotId)).length
    },
    spellingResults: {
      incoming: (data.spellingResults || []).length,
      new: (data.spellingResults || []).filter((r) => !haveSpelling.has(r.resultId)).length
    },
    journalMarks: {
      incoming: (data.journalMarks || []).length,
      new: (data.journalMarks || []).filter((m) => !haveJournalMarks.has(m.entryId)).length
    },

    // ---- HOW OLD IS THIS FILE, RELATIVE TO WHAT IS ALREADY HERE ----
    //
    // §32.7, in Gigi's words: the green button "does not say how old its file is
    // relative to her live data." A date on its own cannot answer that. Aug 13
    // is not old if this machine is empty, and it is very old if this machine
    // already holds Aug 18.
    //
    // So both sides are reported and the SCREEN does the comparing. No `incoming`
    // key here on purpose — the row builder walks entries that have one, and this
    // is not a table of hers.
    freshness: {
      newestInFile: newestAt(inAnswers),
      newestHere: newestAt(answers),
      newAnswers
    }
  };
}

/** Do it. Returns the same shape previewImport does, describing what happened. */
export async function importBackup(data) {
  const preview = await previewImport(data);

  await db.transaction(
    'rw',
    db.meta, db.strandStates, db.answers, db.sittings, db.ledger, db.requests,
    db.journal, db.messages, db.scheduleDays,
    db.attempts, db.reviewItems, db.lessonReads, db.projects, db.khanGrades,
    db.writingMarks, db.itemEvents, db.baselines, db.goals, db.journalMarks, db.writingDrafts,
    db.spellingResults,
    async () => {
      // ---- answers: append only what is genuinely new, id stripped ----
      const existing = new Set((await db.answers.toArray()).map(answerKey));
      for (const a of data.answers || []) {
        if (existing.has(answerKey(a))) continue;
        const { id, ...rest } = a; // eslint-disable-line no-unused-vars
        await db.answers.add(rest);
      }

      // ---- sittings: same treatment, matched on when they started ----
      const haveSit = new Set((await db.sittings.toArray()).map(sittingKey));
      for (const st of data.sittings || []) {
        if (haveSit.has(sittingKey(st))) continue;
        const { id, ...rest } = st; // eslint-disable-line no-unused-vars
        await db.sittings.add(rest);
      }

      // ---- strand states: the side that answered more wins ----
      for (const inc of data.strandStates || []) {
        const local = await db.strandStates.get(inc.strandId);
        if (pickStrand(local, inc) === inc) await db.strandStates.put(inc);
      }

      // ---- UUID-keyed tables: plain union, incoming never clobbers ----
      for (const e of data.ledger || []) {
        if (!(await db.ledger.get(e.entryId))) await db.ledger.put(e);
      }
      for (const rq of data.requests || []) {
        if (!(await db.requests.get(rq.requestId))) await db.requests.put(rq);
      }

      // ---- journal: the later edit wins, because it is her writing ----
      for (const j of data.journal || []) {
        const local = await db.journal.get(j.entryId);
        if (pickJournal(local, j) === j) await db.journal.put(j);
      }

      // ---- messages: union, and READ beats unread ----
      for (const m of data.messages || []) {
        const local = await db.messages.get(m.messageId);
        const keep = pickMessage(local, m);
        if (keep !== local) await db.messages.put(keep);
      }

      // ---- attendance: union of the blocks ticked on each day ----
      for (const d of data.scheduleDays || []) {
        const local = await db.scheduleDays.get(d.dayKey);
        await db.scheduleDays.put(mergeScheduleDay(local, d));
      }

      // ---- test attempts: union, keyed by UUID, incoming never clobbers ----
      //
      // A sat test is a historical event. There is no version of this where the
      // right answer is to overwrite one, so an attempt that already exists is
      // left exactly as it is.
      for (const at of data.attempts || []) {
        if (!(await db.attempts.get(at.attemptId))) await db.attempts.put(at);
      }

      // ---- review boxes: the LOWER box wins. See pickReviewItem. ----
      for (const ri of data.reviewItems || []) {
        const local = await db.reviewItems.get(ri.questionId);
        await db.reviewItems.put(pickReviewItem(local, ri));
      }

      // ---- lessons read: nothing can go backwards ----
      for (const lr of data.lessonReads || []) {
        const local = await db.lessonReads.get(lr.lessonId);
        await db.lessonReads.put(pickLessonRead(local, lr));
      }

      // ---- projects: finished beats unfinished, the earlier finish wins ----
      for (const pr of data.projects || []) {
        const local = await db.projects.get(pr.projectId);
        await db.projects.put(pickProject(local, pr));
      }

      // ---- Khan grades: a union, newest edit wins on a shared id ----
      //
      // Four of her six subjects are taught by Khan. A grade typed on one
      // machine and lost on the merge is the failure that sends a grown-up back
      // to a paper notebook and never brings them back.
      for (const kg of data.khanGrades || []) {
        const local = await db.khanGrades.get(kg.gradeId);
        await db.khanGrades.put(pickKhanGrade(local, kg));
      }

      // ---- writing marks: a union, newest edit wins on a shared id ----
      //
      // Six pieces a year is the whole of her graded writing. One lost on a
      // merge is a quarter of the record gone, and nothing on any screen would
      // say which machine still had it.
      for (const wm of data.writingMarks || []) {
        const local = await db.writingMarks.get(wm.markId);
        await db.writingMarks.put(pickWritingMark(local, wm));
      }

      // ---- item events: a union of two lists, never a reconciliation ----
      //
      // eventId is a UUID, so two machines combine without colliding. Loading
      // the same file twice adds nothing, because the second copy of an event
      // is the same event.
      for (const ev of data.itemEvents || []) {
        const local = await db.itemEvents.get(ev.eventId);
        await db.itemEvents.put(pickItemEvent(local, ev));
      }

      // ---- baselines: the EARLIER capture wins ----
      //
      // The one merge in this file that prefers the older side, and it has to.
      // A baseline is where she started; taking the later of two would move
      // the starting line forward and understate everything measured from it.
      for (const b of data.baselines || []) {
        const local = await db.baselines.get(b.trackId);
        await db.baselines.put(pickBaseline(local, b));
      }

      // ---- goals: the newer edit wins, because a goal has a lifecycle ----
      //
      // Unlike a baseline, a goal is MEANT to change: proposed, approved,
      // checkpointed, reviewed, met or carried. So the later edit is the true
      // one — the opposite rule to the baseline sitting two blocks above, and
      // worth reading twice before changing either.
      // A mark is meant to change — she may re-read an entry and think better of
      // it — so the later edit wins, the opposite of a baseline.
      // v11 — her own words, merged field by field so nothing she wrote is
      // dropped by a stale file being newer. See pickWritingDraft.
      // ---- spelling results: union, keyed by UUID, incoming never clobbers ----
      //
      // A sat spelling test is a historical event, exactly like an attempt. Two
      // machines can each hold one the other has never seen, and there is no
      // version of this where overwriting one is right.
      for (const r of data.spellingResults || []) {
        if (!(await db.spellingResults.get(r.resultId))) await db.spellingResults.put(r);
      }

      for (const w of data.writingDrafts || []) {
        if (!w || !w.slotId) continue;
        const local = await db.writingDrafts.get(w.slotId);
        await db.writingDrafts.put(pickWritingDraft(local, w));
      }
      for (const m of data.journalMarks || []) {
        const local = await db.journalMarks.get(m.entryId);
        await db.journalMarks.put(pickJournalMark(local, m));
      }

      for (const g of data.goals || []) {
        const local = await db.goals.get(g.goalId);
        await db.goals.put(pickGoal(local, g));
      }

      // ---- meta: only the keys that are safe to carry across ----
      //
      // parentPasscode is not in the export at all. scheduleBlocks is a setting
      // belonging to the machine it was typed on, so it is only taken when this
      // machine has none of its own.
      const metaIn = new Map((data.meta || []).map((m) => [m.key, m.value]));
      const takeIfEmpty = ['learnerName', 'scheduleBlocks', 'dreamGoalId'];
      for (const key of takeIfEmpty) {
        if (!metaIn.has(key)) continue;
        const local = await db.meta.get(key);
        if (local === undefined || local.value == null || local.value === '') {
          await db.meta.put({ key, value: metaIn.get(key) });
        }
      }
      for (const key of ['unlockedItems']) {
        if (!metaIn.has(key)) continue;
        const local = (await db.meta.get(key))?.value || [];
        await db.meta.put({ key, value: [...new Set([...local, ...(metaIn.get(key) || [])])] });
      }
      for (const key of ['equippedGear']) {
        if (!metaIn.has(key)) continue;
        const local = (await db.meta.get(key))?.value || {};
        await db.meta.put({ key, value: { ...local, ...(metaIn.get(key) || {}) } });
      }
      for (const key of ['diagnosticStartedAt', 'diagnosticCompletedAt', 'streak', 'lastActiveDay', 'pickCounter']) {
        if (!metaIn.has(key)) continue;
        const local = (await db.meta.get(key))?.value;
        if (local == null) await db.meta.put({ key, value: metaIn.get(key) });
      }
    }
  );

  return preview;
}

export async function exportAll() {
  const [
    meta, strandStates, answers, sittings, ledger, requests, journal, messages, scheduleDays,
    attempts, reviewItems, lessonReads, projects, khanGrades, writingMarks,
    itemEvents, baselines, goals, journalMarks, writingDrafts, spellingResults
  ] = await Promise.all([
      db.meta.toArray(),
      db.strandStates.toArray(),
      db.answers.toArray(),
      db.sittings.toArray(),
      db.ledger.toArray(),
      db.requests.toArray(),
      db.journal.toArray(),
      db.messages.toArray(),
      db.scheduleDays.toArray(),
      db.attempts.toArray(),
      db.reviewItems.toArray(),
      db.lessonReads.toArray(),
      db.projects.toArray(),
      db.khanGrades.toArray(),
      db.writingMarks.toArray(),
      db.itemEvents.toArray(),
      db.baselines.toArray(),
      db.goals.toArray(),
      db.journalMarks.toArray(),
      db.writingDrafts.toArray(),
      db.spellingResults.toArray()
    ]);
  // The passcode is a household convenience, not a secret worth exporting.
  const safeMeta = meta.filter((m) => m.key !== 'parentPasscode');
  return {
    app: 'Petal & Pestle Academy',
    // An export that calls itself v6 while carrying v7 data is a file that
    // lies about itself — and until v3.56 the READER never looked. It does
    // now, in previewImport, against this same constant.
    version: BACKUP_VERSION,
    meta: safeMeta,
    strandStates,
    answers,
    sittings,
    ledger,
    requests,
    // Her writing is in here. This file IS the backup of it — there is no cloud
    // copy and no server. Worth saying out loud in the Grown-Up Corner.
    journal,
    messages,
    scheduleDays,
    // Her school record. Every test she has sat, question by question, plus the
    // spaced-review boxes and which lessons she has read. This is what a report
    // card and a transcript are built from, so it must survive a laptop dying.
    attempts,
    reviewItems,
    lessonReads,
    // Her projects. Sixteen fortnights of work across the year — the field
    // guide, the weather station, the oral history with Gigi. Missing from the
    // backup entirely from v3.10 to v3.12, which would have thrown all of it
    // away the first time she changed machines.
    projects,
    // Four of her six subjects are taught by Khan. Without these the report
    // card is a quarter of her year, so they travel with everything else.
    khanGrades,
    // Her graded writing — four book reports and two research papers a year,
    // marked against a rubric she saw first. Six rows is the entire evidence of
    // written work in the record, so it travels too.
    writingMarks,
    // Where every answer came from, and where each track started. Added v8.
    // The warm-up kept NOTHING before this — three questions a morning, 260
    // mornings a year, and only a Leitner box moving. A baseline in particular
    // cannot be reconstructed after the fact, so losing this table on a move
    // between machines would lose the only answer to "did that change help?"
    itemEvents,
    baselines,
    // What she is aiming at, and where she started when it was set.
    goals,
    // Added v10. Her DAILY journal mark. Six graded pieces a year were never
    // going to measure daily writing, and Gigi overturned the journal lock to
    // get one that does — so this is now the densest written-work evidence in
    // the record, and it travels with everything else. Kept apart from the
    // entry it grades: a bad merge can lose a mark, never a word she wrote.
    journalMarks,
    // Added v11. HER OWN WORDS — the book report itself, not the mark on it.
    // "A checkbox is not an artifact": before this, four completed book reports
    // could sit on the record with nothing she wrote behind them. This is the
    // densest piece of her own writing the app holds, and Georgia asks for the
    // portfolio, not the tick.
    writingDrafts,
    spellingResults
  };
}

/** Every project row she has. */
export async function readProjects() {
  return db.projects.toArray();
}

export async function putProject(row) {
  await db.projects.put(row);
}

/** Every Khan grade a grown-up has entered. */
export async function readKhanGrades() {
  return db.khanGrades.toArray();
}

export async function putKhanGrade(row) {
  await db.khanGrades.put(row);
}

export async function deleteKhanGrade(gradeId) {
  await db.khanGrades.delete(gradeId);
}

/** Every mark a grown-up has given on a book report or research paper. */
export async function readWritingMarks() {
  return db.writingMarks.toArray();
}

export async function putWritingMark(row) {
  await db.writingMarks.put(row);
}

export async function deleteWritingMark(markId) {
  await db.writingMarks.delete(markId);
}

/** Every answer she has given, from every surface. Added v8. */
export async function readItemEvents() {
  return db.itemEvents.toArray();
}

export async function appendItemEvents(rows) {
  if (rows?.length) await db.itemEvents.bulkPut(rows);
}

/** Every goal, at every stage of its life. Added v9. */
export async function readGoals() {
  return db.goals.toArray();
}

export async function putGoal(row) {
  await db.goals.put(row);
}

/** Every journal mark. One row per graded entry, keyed by entryId. Added v10. */
export async function readJournalMarks() {
  return db.journalMarks.toArray();
}

/** Every book report draft on this machine. */
export async function readWritingDrafts() {
  return db.writingDrafts.toArray();
}

/**
 * Save a draft. v11.
 *
 * ⚠️ NOTES AND DRAFT ARE SEPARATE FIELDS AND MERGING THEM IS A BUG, not a
 * tidy-up. Week 2's marked places are what makes week 3's draft possible, and a
 * single box means week 3 overwrites week 2 — the milestone then protects
 * nothing. Lamar's app wrote that rule down after making the mistake.
 *
 * `steps` is the list of step numbers she has ticked. It lives beside the words
 * rather than in its own table because a tick with no writing behind it is the
 * thing this whole table exists to prevent: they should be impossible to
 * separate.
 */
export async function loadSpellingResults() {
  return db.spellingResults.toArray();
}

/** Append one sat spelling test. Never an update — see db.version(12). */
export async function putSpellingResult(row) {
  await db.spellingResults.put(row);
}

export async function putWritingDraft(row) {
  await db.writingDrafts.put({ ...row, updatedAt: new Date().toISOString() });
}

/**
 * Mark one journal entry.
 *
 * ⚠️ NOTHING HERE READS OR WRITES THE ENTRY. It is keyed by entryId and lives in
 * its own table, so marking an entry cannot alter a character of what she wrote.
 * That was the condition on overturning the journal lock.
 */
export async function putJournalMark(row) {
  await db.journalMarks.put(row);
}

/** Un-mark. An entry with no row is UNMARKED, which is not the same as zero. */
export async function clearJournalMark(entryId) {
  await db.journalMarks.delete(entryId);
}

/** Where each track started. One row per track, written once. Added v8. */
export async function readBaselines() {
  return db.baselines.toArray();
}

/**
 * Write a baseline ONLY if the track has never had one.
 *
 * A baseline that can be overwritten is not a baseline. Guarded here, at the
 * boundary, rather than in the caller — a caller can be added tomorrow.
 */
export async function captureBaselineOnce(row) {
  const existing = await db.baselines.get(row.trackId);
  if (existing) return existing;
  await db.baselines.put(row);
  return row;
}
