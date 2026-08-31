import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { getCurrentQuarter, isQuarterlyBatchLabel, isSummerBatchLabel, hasSchoolStarted, SCHOOL_YEAR_START_DATE } from '../../lib/schoolQuarter.js';
import { subjectCardLabel } from '../../academies/lamar/subjects.js';
import { khanGrammarUnitForUrl } from '../../academies/lamar/data/khan/grammarCourseOrder.js';
import { scienceCourseForUrl } from '../../academies/lamar/data/khan/scienceSequence.js';

// Deliberately short labels for this card only — the full names
// ("English Language Arts") do not fit the mission tiles. `writing`
// was removed when the subject merged into `reading` (Aug 6, 2026).
const SUBJECT_LABELS = {
  math: 'Math',
  reading: 'Language Arts and Reading',
  science: 'Science',
  socialStudies: 'Social Studies',
  technology: 'Technology'
};

// FIXED Aug 6, 2026: this was a hard-coded list of four subjects, so the 20
// Technology Khan Academy units seeded the same day were written to the
// database and then rendered nowhere — present in storage, invisible on
// screen. Hard-coding it also meant every future Khan subject would hit the
// same trap silently.
//
// Now it's derived: the known order first (so Math still leads and the
// familiar layout is unchanged), then ANY other subject that actually has
// Khan rows, appended rather than dropped. Same defensive pattern
// academicUi.js already uses for ACADEMIC_SUBJECT_ORDER. A new Khan subject
// now shows up on its own instead of requiring someone to remember this
// file exists.
const KNOWN_SUBJECT_ORDER = ['math', 'reading', 'science', 'socialStudies', 'technology'];

function orderedSubjectsWithRows(assignments) {
  const present = new Set(assignments.map((a) => a.subject));
  const known = KNOWN_SUBJECT_ORDER.filter((s) => present.has(s));
  const extras = [...present].filter((s) => !KNOWN_SUBJECT_ORDER.includes(s)).sort();
  return [...known, ...extras];
}

/**
 * Sort key for ordering a subject's lessons within a quarter. Prefers the
 * explicit `sequenceInQuarter` field (used for real planned batches);
 * falls back to `createdAt` for legacy pre-sequence records so they still
 * sort sensibly rather than randomly.
 */
function sequenceKey(a) {
  return typeof a.sequenceInQuarter === 'number' ? a.sequenceInQuarter : new Date(a.createdAt).getTime();
}

// Student-facing row. He can mark a lesson complete (daily completion +
// XP) and open it on Khan Academy — but he can NOT grade it. Grading moved
// to the parent-only Khan Academy Grades section (Aug 6, 2026), so no score
// or grade is shown or set here. Course Challenges get an amber badge and,
// because they sort last in a quarter, only appear as "today's lesson" once
// every unit before them is done.
function LessonRow({ assignment, emphasized }) {
  const { id, skillTitle, gradeLevel, khanAcademyUrl, completed, isCourseChallenge } = assignment;

  /**
   * KHAN'S OWN UNIT NUMBER, SHOWN ON THE ROW. (Added Aug 9, 2026.)
   *
   * The parent found that Q1 Language Arts ran unit 1 -> unit 3 -> unit 4,
   * because Khan's grammar unit 2 had been seeded under a different name and
   * parked at the end of the quarter. Nothing on screen said which Khan unit a
   * row was, so the only way to notice was to open each link and read the
   * page. Printing the number makes any future mismatch obvious at a glance —
   * and it is derived from the URL, so it cannot disagree with the page that
   * actually opens.
   */
  const khanUnit = khanGrammarUnitForUrl(khanAcademyUrl);

  /**
   * WHICH KHAN COURSE THIS SCIENCE ROW IS FROM. (Added Aug 9, 2026.)
   *
   * The parent: "science only has 5 instead of 10." Those five were three
   * biology-level units and two chemistry — a quarter that deliberately runs
   * two courses at once — and nothing on screen said so. Five rows under a
   * single heading called "Science" read as five of biology's eleven, which is
   * why the count looked wrong. It was not wrong; it was unlabelled.
   *
   * Naming the course and the unit also answers the other half of what she
   * spotted: Khan's headline "11 UNITS" for biology counts a simulations unit
   * and a teacher-resources unit that are not student work. Showing "Biology ·
   * unit 7 of 9" states the real denominator.
   */
  const scienceCourse = scienceCourseForUrl(khanAcademyUrl);

  return (
    <div
      className={
        'rounded-lg border px-3 py-2 ' +
        (completed
          ? 'border-signal-green/40 bg-signal-green/10'
          : emphasized
            ? 'border-signal-cyan/50 bg-space-900'
            : 'border-space-700 bg-space-900')
      }
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="mr-1.5 rounded bg-space-700 px-1.5 py-0.5 text-[10px] font-display uppercase tracking-wide text-ink-500">
            {gradeLevel}
          </span>
          {khanUnit && (
            <span className="mr-1.5 rounded bg-space-700 px-1.5 py-0.5 text-[10px] font-display uppercase tracking-wide text-ink-500">
              Khan unit {khanUnit}
            </span>
          )}
          {scienceCourse && (
            <span className="mr-1.5 rounded bg-space-700 px-1.5 py-0.5 text-[10px] font-display uppercase tracking-wide text-ink-500">
              {scienceCourse.label}
              {scienceCourse.khanUnit
                ? ` · unit ${scienceCourse.khanUnit} of ${scienceCourse.contentUnits}`
                : scienceCourse.isCourseChallenge
                  ? ' · course challenge'
                  : ''}
            </span>
          )}
          {isCourseChallenge && (
            <span className="mr-1.5 rounded bg-signal-amber/15 px-1.5 py-0.5 text-[10px] font-display uppercase tracking-wide text-signal-amber">
              Course Challenge
            </span>
          )}
          <p className={'mt-1 font-display text-sm font-600 ' + (completed ? 'text-signal-green' : 'text-ink-100')}>
            {completed ? '✅' : '⬜'} {skillTitle}
          </p>
          <a
            href={khanAcademyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-0.5 inline-block text-xs text-signal-cyan underline hover:brightness-110"
          >
            Go to Khan Academy →
          </a>
        </div>

        {/**
          * NO "MARK COMPLETE" HERE EITHER. (Aug 12, 2026.)
          *
          * This card is not currently mounted anywhere — only its
          * useCurrentQuarterKhanAssignments hook is imported. That is exactly
          * why the button had to come out rather than be left alone: an
          * unmounted component is where a removed behaviour waits to be
          * remounted by someone who does not know why it went.
          *
          * A student tap is not evidence a unit is finished. The parent
          * entering the Khan score is. See TodayRow.jsx for the whole story.
          */}
        {completed ? (
          <span className="shrink-0 rounded-full border border-signal-green/40 bg-signal-green/10 px-2 py-0.5 text-xs font-display font-700 text-signal-green">
            Completed
          </span>
        ) : (
          <span className="shrink-0 rounded-full border border-space-600 px-2 py-0.5 text-xs font-display text-ink-500">
            In progress
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * One subject's card — shows the next not-yet-done lesson in the
 * quarter's sequence front and center ("today's lesson," advancing one
 * step each school day it's worked, not tied to a fixed calendar date —
 * confirmed with the parent: all four Khan Academy subjects run every
 * school day, so there's no per-weekday assignment to track, just
 * "what's next in the sequence"). The full quarter's lesson list is
 * available via an expand toggle, so the Mission Board doesn't show
 * every individual lesson as its own card and get crowded.
 */
export function KhanSubjectGroup({ subject, lessons }) {
  const [expanded, setExpanded] = useState(false);
  const sorted = [...lessons].sort((a, b) => sequenceKey(a) - sequenceKey(b));
  const doneCount = sorted.filter((l) => l.completed).length;
  const next = sorted.find((l) => !l.completed);

  return (
    <div className="rounded-lg border border-space-700 bg-space-900/60 p-3">
      <div className="flex items-center justify-between">
        <p className="font-display text-sm font-700 text-ink-100">{subjectCardLabel(subject)}</p>
        <span className="text-xs text-ink-500">
          {doneCount} of {sorted.length} this quarter
        </span>
      </div>

      {next ? (
        <div className="mt-2">
          <p className="mb-1 text-[10px] font-display uppercase tracking-widest text-signal-cyan">Today's lesson</p>
          <LessonRow assignment={next} emphasized />
        </div>
      ) : (
        <p className="mt-2 text-sm text-signal-green">✅ All caught up for this quarter — nice work.</p>
      )}

      {sorted.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="mt-2 text-xs text-ink-500 underline hover:text-ink-100"
          >
            {expanded ? 'Hide' : 'Show'} full quarter sequence ({sorted.length} lessons)
          </button>
          {expanded && (
            <div className="mt-2 space-y-1.5">
              {/* Excludes "next" (the current today's-lesson) — it's
                  already shown above, and including it again here was a
                  real bug: it made the same lesson visually appear twice
                  on screen, which looked exactly like a duplicated
                  lesson even though the underlying data was correct. */}
              {sorted
                .filter((lesson) => lesson.id !== next?.id)
                .map((lesson) => (
                  <LessonRow key={lesson.id} assignment={lesson} />
                ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

/**
 * Khan Academy Assignments — grouped one card per subject (not one card
 * per lesson, to avoid a crowded Mission Board), the real teaching+
 * practice layer for Math/Reading/Language Arts/Science now that IXL
 * has been dropped entirely (see PROJECT_PLAN.md). The student marks each
 * lesson complete here (daily completion); grading is done separately by
 * the parent in the parent-only Khan Academy Grades section, based on the
 * Unit Test score Khan Academy shows (no public API to pull scores in
 * automatically).
 */
/**
 * Khan rows belonging to the CURRENT period, shared by this card and by the
 * dashboard's per-subject mission cards so both apply exactly the same
 * period rule. Exported Aug 6, 2026 as part of the one-card-per-subject fix.
 */
export function useCurrentQuarterKhanAssignments() {
  const allKhanAcademyAssignments = useAppStore((s) => s.khanAcademyAssignments);
  const { batchLabel: currentQuarterLabel } = getCurrentQuarter();
  return allKhanAcademyAssignments.filter((a) => {
    const isRecognizedPeriod = isQuarterlyBatchLabel(a.batchLabel) || isSummerBatchLabel(a.batchLabel);
    return a.batchLabel === currentQuarterLabel || !isRecognizedPeriod;
  });
}

/**
 * `excludeSubjects` — subjects the dashboard is already showing as their own
 * mission card. Added Aug 6, 2026 for the parent's exact reason: "I don't
 * want there to be 2 cards on the screen because my son would think that he
 * has to do both in the same qtr." Social Studies (and now Technology) have
 * BOTH Khan units and Mission Control lessons, so each was appearing twice
 * on one screen — once as a mission card, once inside this block — which
 * reads to a 12-year-old as two separate workloads. Their Khan work now
 * renders inside their own subject card instead, and this block covers only
 * the Khan-only subjects (Math, Reading, Science).
 */
export function KhanAcademyMissionsCard({ excludeSubjects = [] }) {
  // Selecting the raw array (not a getter function) matters here: Zustand
  // only re-renders when the SELECTED value's reference changes. A getter
  // function's reference never changes, so selecting a function and
  // calling it silently fails to re-render this component when a skill
  // gets marked complete — the underlying store updates correctly, but
  // this card would keep showing stale state until something else forces
  // a remount. Confirmed as a real bug via testing, not theoretical.
  const allKhanAcademyAssignments = useAppStore((s) => s.khanAcademyAssignments);
  const { id: quarterId, label: quarterLabel, schoolYearLabel, batchLabel: currentQuarterLabel } = getCurrentQuarter();
  const khanAcademyAssignments = allKhanAcademyAssignments.filter((a) => {
    const isRecognizedPeriod = isQuarterlyBatchLabel(a.batchLabel) || isSummerBatchLabel(a.batchLabel);
    // Show it if it's THIS period specifically, or if it predates the
    // period system entirely (legacy content, always shown alongside
    // whatever the current period is) — but NOT if it's a different
    // quarter's or a different summer's content, which was a real bug:
    // checking only `!isQuarterlyBatchLabel` let a non-current Summer
    // batch slip through as if it were legacy content, since the old
    // check never recognized "Summer" as a real period format at all.
    return a.batchLabel === currentQuarterLabel || !isRecognizedPeriod;
  });

  const bySubject = orderedSubjectsWithRows(khanAcademyAssignments)
    .filter((subject) => !excludeSubjects.includes(subject))
    .map((subject) => ({
      subject,
      lessons: khanAcademyAssignments.filter((a) => a.subject === subject)
    }))
    .filter((g) => g.lessons.length > 0);

  if (!hasSchoolStarted()) {
    return (
      <div className="rounded-xl border border-signal-amber/40 bg-signal-amber/5 p-6 text-center shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-amber">Not Yet — School Hasn't Started</p>
        <p className="mt-2 font-display text-lg font-700 text-ink-100">
          School starts {SCHOOL_YEAR_START_DATE.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
        <p className="mt-2 text-sm text-ink-300">
          Khan Academy assignments unlock on the real first day, not before.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
      <div className="flex items-center justify-between">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Khan Academy Assignments</p>
        <span className="rounded-full border border-space-600 bg-space-900 px-2 py-0.5 text-[10px] font-display text-ink-500">
          {quarterId} · {quarterLabel} · {schoolYearLabel}
        </span>
      </div>
      <p className="mt-1 text-xs text-ink-500">
        Every school day: watch the lesson, work the practice, and mark it complete. Each subject
        advances to its next lesson automatically — miss a day and nothing falls behind or needs reshuffling.
      </p>

      {bySubject.length === 0 ? (
        <p className="mt-3 text-sm text-ink-500">
          No assignments yet for this quarter — new ones get planned each quarter against the school-year curriculum.
        </p>
      ) : (
        <div className="mt-3 space-y-3">
          {bySubject.map(({ subject, lessons }) => (
            <KhanSubjectGroup key={subject} subject={subject} lessons={lessons} />
          ))}
        </div>
      )}
    </div>
  );
}
