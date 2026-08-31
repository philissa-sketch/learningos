import { useMemo, useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { allLessons } from '../../academies/lamar/data/lessons/index.js';
import { scheduledMinutesByDate } from '../../lib/scheduledMinutes.js';
import { GEORGIA_MINUTES_PER_DAY } from '../../academies/lamar/data/admin/georgiaCompliance.js';
import { PercentGradeInput, LetterGradePicker } from './GradeControls.jsx';
import { writingPrompts } from '../../academies/lamar/data/writing/writingPrompts.js';
import { SUBJECT_LABELS } from '../../academies/lamar/subjects.js';
import { getCurrentQuarter } from '../../lib/schoolQuarter.js';
import { todayDateStr, toDateStr, parseDateStr, addDays, formatShortDate } from '../../lib/scheduler.js';
import { buildPlannerItems, splitPlannerItems } from '../../lib/plannerCalendar.js';
import { nextDeclarationDeadline, daysUntil, declarationCoversToday } from '../../academies/lamar/data/admin/georgiaCompliance.js';

/**
 * THE MISSION CONTROL BOARD — the Parent Dashboard's front page.
 *
 * The parent, Aug 7 2026: "Can you create a Mission Control Board for the
 * Parent dashboard with a checklist of what i should do for the week and what
 * i should look for. There are so many tabs, I don't want to miss anything."
 *
 * Grouping the twenty-six sections into five cadences earlier the same day
 * made them findable. It did not make them ACTIONABLE — she still had to open
 * each one to discover whether it needed her. This board inverts that: it
 * reads her real data and reports only what is actually waiting, with a button
 * that jumps straight to the screen that clears it.
 *
 * TWO DESIGN RULES, both learned the hard way in this project:
 *
 *   1. NOTHING IS STORED. Every item is computed from the underlying tables on
 *      each render. A stored checklist is a checklist that goes stale, and a
 *      stale to-do list is worse than none — it teaches her to distrust it.
 *      Ticking an item here is impossible on purpose: an item disappears when
 *      the underlying work is genuinely done, and not before.
 *
 *   2. AN EMPTY BOARD MUST BE BELIEVABLE. If nothing is waiting, it says so
 *      plainly rather than inventing filler. That is the only way "the board is
 *      clear" ever comes to mean something.
 *
 * "Do this week" is work with her name on it. "Look for" is not a task list —
 * it is the set of signals that only a human can judge, surfaced with the
 * number attached so she can decide whether it matters.
 */

const DAY_MS = 86400000;

function Row({ tone = 'do', label, detail, count, actionLabel, onAction }) {
  const toneClass =
    tone === 'urgent'
      ? 'border-signal-red/40 bg-signal-red/5'
      : tone === 'watch'
        ? 'border-space-700 bg-space-900'
        : 'border-space-700 bg-space-900';

  return (
    <div className={'flex flex-wrap items-center gap-3 rounded-lg border px-3 py-2.5 ' + toneClass}>
      {count !== undefined && (
        <span
          className={
            'flex h-7 min-w-7 flex-none items-center justify-center rounded-md px-1.5 font-display text-sm font-700 ' +
            (tone === 'urgent'
              ? 'bg-signal-red/20 text-signal-red'
              : tone === 'watch'
                ? 'bg-space-700 text-ink-300'
                : 'bg-signal-cyan/15 text-signal-cyan')
          }
        >
          {count}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block text-sm text-ink-100">{label}</span>
        {detail && <span className="block text-xs text-ink-500">{detail}</span>}
      </span>
      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className="flex-none rounded-lg border border-signal-cyan/40 px-3 py-1.5 text-xs font-display text-signal-cyan transition hover:bg-signal-cyan/10"
        >
          {actionLabel || 'Open'}
        </button>
      )}
    </div>
  );
}

/**
 * EVERYTHING WAITING ON A GRADE, GRADEABLE HERE.
 *
 * The parent, Aug 7 2026: "for anything I have to grade can it appear there so
 * I won't have to search for it?"
 *
 * The board already counted this work and offered a button to the right
 * screen. That still left her opening a section, finding the row in a list,
 * and grading it there — for a Khan unit, a journal entry and a book report
 * that meant three different screens for three pieces of work finished on the
 * same afternoon.
 *
 * So the work comes to her. Each row names the actual item and carries the
 * right control: a percentage box for a Khan unit (the number Khan shows), a
 * letter picker for a journal entry or a report, which have no percentage.
 * Both controls are the same components the full screens use — imported, not
 * copied, because two implementations of a grade entry would drift.
 *
 * Rows do NOT vanish the moment they are graded. Grading a row removes it from
 * "needs grading", which would pull every row below it up a slot mid-keystroke
 * — the exact bug that lost a score on the Khan screen earlier today. Graded
 * rows stay, marked, until the next time the board is opened.
 */
/**
 * A letter grade, plus one line back to him — for written answers only.
 *
 * ---- WHY THIS EXISTS (Aug 9, 2026) ----
 *
 * "In His Own Words" is the one place in the whole app where he is asked to
 * think out loud, and the only thing that came back was a letter. For a maths
 * answer a letter is enough: it was right or it was not. For "explain how a
 * wing makes lift, in your own words", a B tells him nothing he can act on —
 * not which part was the good part, not what was missing.
 *
 * Optional on purpose. A parent grading a dozen reflections on a Sunday should
 * not owe a dozen paragraphs, so the note field only opens when she asks for
 * it and the grade saves with or without one. When she does write something it
 * travels in the export and appears beside what he wrote.
 */
/**
 * HIS WRITING GETS A REPLY, NOT A LETTER. (Aug 9, 2026.)
 *
 * The parent, looking at seven typing reflections reading "ASDFGHJKL;":
 * "I am wonder if it is useful to have this graded."
 *
 * It was not. The lesson screen promises him twice that the step is ungraded,
 * this board put a Set grade button on it, and the grade it saved reached no
 * transcript, no average, no compliance packet -- a letter that landed in a row
 * and stopped. What it did cost was her Sunday.
 *
 * So: read it, optionally say one specific thing back, and it clears. "Read
 * it" is a real action rather than a formality -- it is the whole reason the
 * step exists, and it is the only thing here that reaches him.
 */
function ReadAndReply({ note, grade, onRespond, onGrade }) {
  const [open, setOpen] = useState(Boolean(note));
  const [draft, setDraft] = useState(note || '');

  return (
    <span className="flex flex-none flex-col items-end gap-1">
      <span className="flex items-center gap-2">
        {/**
          * THE GRADE CAME BACK, AND IT REACHES THE AVERAGE THIS TIME.
          * (Aug 21, 2026.)
          *
          * The parent: **"In HIs own words isn't graded?"** She removed the
          * grade herself on Aug 9 — correctly, because it landed in a row and
          * stopped. Asked again now that he is writing paragraphs rather than
          * "mile stone", she chose to grade it AND have it count, so the letter
          * goes into the subject grade through letterToPercent.
          *
          * The reply stays beside it and is still the half that reaches HIM. A
          * letter tells him where he landed; one specific sentence tells him
          * what to do differently.
          */}
        {onGrade && <LetterGradePicker grade={grade} onPick={(g) => onGrade(g, draft)} />}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={
            'rounded-md border px-2 py-1 text-[11px] font-display transition ' +
            (note
              ? 'border-signal-green/40 bg-signal-green/10 text-signal-green'
              : 'border-space-600 text-ink-500 hover:text-ink-100')
          }
        >
          {note ? 'Replied' : 'Say something back'}
        </button>
        {/**
          * KEPT, and it is not redundant. A two-word answer is worth clearing
          * without putting a grade in his record for it — and forcing a letter
          * on every row is how a queue becomes the Sunday chore she removed.
          */}
        <button
          type="button"
          onClick={() => onRespond(draft)}
          className="rounded-md border border-signal-cyan/40 px-2 py-1 text-[11px] font-display text-signal-cyan transition hover:bg-signal-cyan/10"
        >
          Mark read
        </button>
      </span>
      {open && (
        <span className="flex w-full min-w-[16rem] items-center gap-1.5">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="The bit about air pressure was exactly right."
            className="w-full rounded-md border border-space-600 bg-space-950 px-2 py-1 text-xs text-ink-100 placeholder:text-ink-500"
          />
          <button
            type="button"
            onClick={() => onRespond(draft)}
            className="flex-none rounded-md bg-signal-cyan px-2 py-1 text-[11px] font-display font-700 text-space-950"
          >
            Send
          </button>
        </span>
      )}
    </span>
  );
}

function LetterGradeWithNote({ grade, note, onCommit }) {
  const [open, setOpen] = useState(Boolean(note));
  const [draft, setDraft] = useState(note || '');

  return (
    <span className="flex flex-none flex-col items-end gap-1">
      <span className="flex items-center gap-2">
        <LetterGradePicker grade={grade} onPick={(g) => onCommit(g, draft)} />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={
            'rounded-md border px-2 py-1 text-[11px] font-display transition ' +
            (note
              ? 'border-signal-green/40 bg-signal-green/10 text-signal-green'
              : 'border-space-600 text-ink-500 hover:text-ink-100')
          }
        >
          {note ? 'Note added' : 'Say something back'}
        </button>
      </span>
      {open && (
        <span className="flex w-full min-w-[16rem] items-center gap-1.5">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="The bit about air pressure was exactly right."
            className="w-full rounded-md border border-space-600 bg-space-950 px-2 py-1 text-xs text-ink-100 placeholder:text-ink-500"
          />
          <button
            type="button"
            onClick={() => onCommit(grade, draft)}
            className="flex-none rounded-md bg-signal-cyan px-2 py-1 text-[11px] font-display font-700 text-space-950"
          >
            Save
          </button>
        </span>
      )}
    </span>
  );
}

/**
 * Shown only when the quote above it was actually cut short — a "Read it all"
 * link under a sentence he finished is noise, and this list is long enough.
 */
function FullText({ text }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="mt-1 block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="text-xs text-signal-cyan underline underline-offset-2 hover:brightness-125"
      >
        {open ? 'Hide' : 'Read it all'}
      </button>
      {open && (
        <span className="mt-1 block whitespace-pre-wrap rounded-lg border border-space-700 bg-space-950 px-3 py-2 text-sm leading-relaxed text-ink-200">
          {text}
        </span>
      )}
    </span>
  );
}

function ReadyToGrade({ items, onGoTo }) {
  if (items.length === 0) {
    return (
      <p className="rounded-lg border border-signal-green/30 bg-signal-green/5 px-3 py-4 text-center text-sm text-signal-green">
        Nothing is waiting on a grade.
      </p>
    );
  }

  return (
    <>
      {items.map((item) => (
        <div
          key={item.key}
          className="flex flex-wrap items-center gap-3 rounded-lg border border-space-700 bg-space-900 px-3 py-2.5"
        >
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-1.5">
              <span className="rounded-full border border-space-600 px-2 py-0.5 text-[10px] font-display uppercase tracking-widest text-ink-500">
                {item.kind}
              </span>
              <span className="min-w-0 truncate text-sm text-ink-100">{item.title}</span>
            </span>
            {item.detail && <span className="mt-0.5 block text-xs text-ink-500">{item.detail}</span>}
            {item.fullText && item.fullText.length > 90 && <FullText text={item.fullText} />}
          </span>

          {item.type === 'percent' ? (
            <PercentGradeInput
              id={`board-${item.key}`}
              label={`${item.title} score`}
              percent={item.percent}
              raw={item.raw}
              onCommit={item.onGrade}
            />
          ) : item.type === 'reply' ? (
            <ReadAndReply
              note={item.note}
              grade={item.grade}
              onRespond={item.onRespond}
              onGrade={item.onGrade}
            />
          ) : item.type === 'letter-with-note' ? (
            <LetterGradeWithNote grade={item.grade} note={item.note} onCommit={item.onGrade} />
          ) : (
            <LetterGradePicker grade={item.grade} onPick={item.onGrade} />
          )}

          {item.openSection && (
            <button
              type="button"
              onClick={() => onGoTo(item.openSection)}
              className="flex-none text-xs text-ink-500 underline hover:text-ink-100"
            >
              {item.openLabel || 'Open'}
            </button>
          )}
        </div>
      ))}
    </>
  );
}


/**
 * Where to go, indexed by the MOMENT rather than the filing category.
 *
 * Measured before building: the board could reach 9 of 27 sections, and only
 * ever when something was wrong. There was no path for "the quarter just ended,
 * where is the report card" — the moment she is most likely to go hunting.
 *
 * "Records & Reports" was the real culprit: nine sections in one drawer, sorted
 * by what they ARE rather than when she would want them. Report Card,
 * Compliance and Reading Log have almost nothing in common except being paper.
 *
 * Only sections the board has no other reason to mention are listed. The urgent
 * paths above already carry Attendance, Khan grades, Gradebook, Writing
 * Journal, Academic Success Center, Coming Up, Mission Comms, Rewards, Notes.
 */
const SIGNPOST = [
  ['Every Friday', [
    ['field-trips', 'Field Trips', 'Log where you went. A logged trip is a real school day toward the 180.'],
    ['reading-log', 'Reading Log', 'What he read on his own, separate from any lesson.']
  ]],
  ['When a quarter ends', [
    // Report Card and Mission Evaluations were REMOVED from this list on
    // Aug 8. The board now reminds her about both by name when the quarter is
    // ending, an exam has been sat, or an evaluation is unapproved — and a
    // reminder that arrives on its own beats a directory entry she has to
    // remember to open. Her question, and it was the right one: "do I really
    // need the where do I go for if the reminders send me to the links that I
    // need to go to?"
    //
    // What stays here is the set nothing can remind her about, because there
    // is nothing to remind: you are not reminded to look at the Year Plan.
    ['analytics', 'Learning Analytics', 'Pace, time on task, and which subject is quietly slipping.'],
    ['weekly-report', 'Weekly Report', 'A printable seven-day summary — useful mid-quarter too.']
  ]],
  ['Before a deadline or a review', [
    ['compliance', 'Compliance (GA)', 'Declaration of Intent, the 180-day count, the packet you would hand someone.'],
    ['course-descriptions', 'Course Descriptions', 'What each subject covered, written for someone else to read.'],
    ['records', 'Records', 'Volunteer hours, activities, awards, test scores.']
  ]],
  ['When you are planning ahead', [
    ['planner', 'Planner', 'Create or change an assignment, and see what is coming next.'],
    ['year-plan', 'Year Plan', 'The whole year at once, and semester by semester.'],
    ['readiness', 'Engineer Readiness', 'The long-run skills list — the years-out view, not this week.']
  ]],
  ['As it happens', [
    ['pe-fitness-nutrition', 'PE & Nutrition', 'Workouts, meals, water, sleep and body metrics.'],
    ['portfolio', 'Portfolio', 'Finished projects worth keeping.']
  ]],
  ['Rarely', [
    ['sync', 'Export / Import', 'Move progress between your computer and his. Nothing syncs on its own.']
  ]]
];

function Panel({ title, hint, children }) {
  return (
    <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
      <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">{title}</p>
      {hint && <p className="mt-1 text-xs text-ink-500">{hint}</p>}
      <div className="mt-3 space-y-1.5">{children}</div>
    </div>
  );
}

export function MissionControlBoard({ onGoTo }) {
  const khanAcademyAssignments = useAppStore((s) => s.khanAcademyAssignments);
  const writingEntries = useAppStore((s) => s.writingEntries);
  const selfExplanations = useAppStore((s) => s.selfExplanations);
  const academicAssignments = useAppStore((s) => s.academicAssignments);
  const academicBooks = useAppStore((s) => s.academicBooks);
  const assignments = useAppStore((s) => s.assignments);
  const allAttendance = useAppStore((s) => s.allAttendance);
  // Everything scheduledMinutesByDate reads. Same source list the Compliance
  // screen uses — one credit rule, not a second opinion on the board.
  const khanDailyLog = useAppStore((s) => s.khanDailyLog);
  const guitarLog = useAppStore((s) => s.guitarLog);
  const typingLog = useAppStore((s) => s.typingLog);
  const peWorkoutLog = useAppStore((s) => s.peWorkoutLog);
  const gardenLog = useAppStore((s) => s.gardenLog);
  const weeklyWordState = useAppStore((s) => s.weeklyWords);
  const scheduleBlocks = useAppStore((s) => s.scheduleBlocks);
  const messages = useAppStore((s) => s.messages);
  const rewardRedemptions = useAppStore((s) => s.rewardRedemptions);
  const parentNotes = useAppStore((s) => s.parentNotes);
  const lessonProgress = useAppStore((s) => s.lessonProgress);
  const morningMeetings = useAppStore((s) => s.morningMeetings);
  const missionEvaluations = useAppStore((s) => s.missionEvaluations);
  /**
   * HER TICK. This board never read it — see the Declaration block below.
   * An unsubscribed source is a screen that cannot notice she has done the
   * thing it is nagging her about.
   */
  const complianceChecks = useAppStore((s) => s.complianceChecks);
  const setKhanPercent = useAppStore((s) => s.setKhanAcademyAssignmentPercent);
  const gradeWritingEntry = useAppStore((s) => s.gradeWritingEntry);
  const respondToSelfExplanation = useAppStore((s) => s.respondToSelfExplanation);
  const gradeSelfExplanation = useAppStore((s) => s.gradeSelfExplanation);
  const gradeAcademicAssignment = useAppStore((s) => s.gradeAcademicAssignment);

  /**
   * Rows graded during THIS sitting, held in the queue.
   *
   * Caught by grading a real unit on the board and watching the row vanish —
   * which is precisely what the comment above the queue claimed it would not
   * do. The queue is derived from "completed and ungraded", so the moment a
   * grade lands the row stops qualifying and every row beneath it jumps up a
   * slot. With one row that is only disorienting. With five it is the bug that
   * swallowed a score on the Khan screen this morning: Tab lands in whichever
   * input slid into the vacated position.
   *
   * A comment asserting a safety property the code does not have is worse than
   * no comment, so: pin them. They clear when the board is next opened.
   */
  const [justGraded, setJustGraded] = useState(() => new Set());
  const pin = (key) => setJustGraded((prev) => new Set(prev).add(key));

  const today = todayDateStr();
  const quarter = getCurrentQuarter().batchLabel;

  const board = useMemo(() => {
    const weekAgo = toDateStr(addDays(parseDateStr(today), -7));
    const weekAhead = toDateStr(addDays(parseDateStr(today), 7));

    // ---- DO: grading waiting on her ----
    /**
     * WORK WAITING ON HER IS NOT A PROPERTY OF THE CURRENT QUARTER.
     *
     * ---- WHERE THIS CAME FROM (Aug 18, 2026) ----
     *
     * The parent, after importing his export: "there is issues regarding what
     * was turned in and what was graded and what needs to be graded."
     *
     * Her record held exactly one completed, ungraded unit:
     *
     *     reading · "Themes, figures of speech, and comparing texts"
     *     completed 2026-08-06 · batchLabel "Q2 2026-2027"
     *
     * August 6 is Q1. The unit is tagged Q2 — early work, or a tag that
     * disagrees with its own date; either happens. This filter read
     * `batchLabel === quarter`, so the row was **turned in, ungraded, and
     * invisible**. The Khan grading screen hid it too: its quarter chip
     * defaults to the current quarter.
     *
     * A queue scoped to the current quarter also loses the other direction. A
     * Q1 unit finished on November 1st never appears again, because the moment
     * Q2 opens the queue stops asking about Q1.
     *
     * **The quarter tells her WHEN it was meant to happen. It has no business
     * deciding whether she is told it needs marking.** So the queue asks the
     * only question that matters — finished, and not yet graded — and carries
     * the quarter on the row when it is not this one, so an August unit
     * surfacing in November explains itself.
     */
    const finishedUngraded = khanAcademyAssignments
      .filter((a) => a.completed && !a.grade && a.gradedBy !== 'project')
      .sort((a, b) => String(a.completedAt || '').localeCompare(String(b.completedAt || '')));

    /**
     * ---- AND THEN SHE SAID IT DOES NOT BELONG HERE (Aug 20, 2026) ----
     *
     * The first version of this made the queue quarter-agnostic, because a
     * completed ungraded unit had been invisible on every screen. She looked
     * at the result: **"Q2 work shouldn't be in ready to grade."**
     *
     * She is right, and for a reason the first fix walked past. The unit —
     * "Themes, figures of speech, and comparing texts" — is seeded Q2, and he
     * marked it finished on Aug 6, which is week 1 of Q1. **A Q2 unit finished
     * in Q1 week 1 is not a grading task. It is a question about what
     * happened**: he worked a quarter ahead, or he ticked the wrong row.
     *
     * Grading it makes a Q2 score out of a Q1 week. Hiding it was the original
     * bug. So it goes to the watch panel — the place this board keeps
     * judgement calls — and the grading queue goes back to this quarter's work,
     * which is what a daily list should be.
     */
    const khanUngraded = finishedUngraded.filter((a) => a.batchLabel === quarter);
    const ungradedOtherQuarter = finishedUngraded.filter((a) => a.batchLabel !== quarter);
    const writingUngraded = writingEntries.filter((e) => !e.grade);
    // Reflections he wrote and nobody has read. Newest first — an explanation
    // written this morning is more useful to respond to than one from a month
    // ago, which is the opposite of how the other three sources are ordered.
    /**
     * ONE ROW PER THING HE WROTE ABOUT, NOT ONE PER ATTEMPT.
     *
     * Her queue showed "The Home Row" four times and "Measuring Speed: WPM"
     * three times. Those are not seven pieces of work -- they are the two beats
     * of Typing Fundamentals, written again on each of four retakes, with
     * nothing collapsing them. Reading the same sentence four times is not
     * four times the insight, and a queue that grows every time he practises
     * punishes the practising.
     *
     * Newest attempt wins and carries the count, so "4 attempts" is visible
     * rather than lost -- that he redid a lesson four times is worth knowing;
     * seeing it as four separate assignments is not.
     */
    const unreadReflections = [...selfExplanations]
      .filter((e) => !e.grade && !e.readAt && (e.text || '').trim().length > 0)
      .sort((a, b) => String(b.completedAt).localeCompare(String(a.completedAt)));
    const byBeat = new Map();
    for (const e of unreadReflections) {
      const key = `${e.lessonId || ''}|${e.beatLabel || ''}`;
      const seen = byBeat.get(key);
      if (seen) {
        seen.attempts += 1;
        /**
         * ---- EVERY ATTEMPT IN THE GROUP, NOT JUST THE NEWEST ----
         *
         * The parent: **"I responded and marked read and nothing happened."**
         *
         * Something did happen — her reply and the readAt were both written,
         * and both are in the database. What did not happen is the row going
         * away, and from where she was sitting that is the same thing.
         *
         * The row says "3 attempts, newest shown". It presents as ONE item, it
         * is answered once, and it was clearing exactly one of the three. The
         * other two still had `readAt: null`, so the group came straight back
         * with `attempts: 2` and a different word count — near-identical, and
         * unanswerable, because replying again would clear one more.
         *
         * On her record: nine reflections on one Aerospace lesson, she replied
         * to two, four were still unread.
         *
         * **A row that collapses N things has to act on N things.**
         */
        seen.ids.push(e.id);
      } else {
        byBeat.set(key, { ...e, attempts: 1, ids: [e.id] });
      }
    }
    const reflectionsUnread = [...byBeat.values()];
    const academicUngraded = academicAssignments.filter(
      (a) => a.title && a.status === 'completed' && !a.grade
    );

    const creditedByDate = scheduledMinutesByDate({
      khanDailyLog, peWorkoutLog, guitarLog, typingLog, gardenLog, writingEntries, weeklyWordState, scheduleBlocks,
      lessonProgress,
      morningMeetings,
      khanAcademyAssignments
    });

    /**
     * ---- DAYS THAT ARE ACTUALLY SHORT (rewritten Aug 20, 2026) ----
     *
     * The parent: **"Why is days with no offline in the red?"**
     *
     * Because it was answering a question that stopped being true. It flagged
     * every day with any app time and no offline minutes, and told her "Khan,
     * reading and field trips count as zero until you enter them".
     *
     * They have not counted as zero since the scheduled-minutes credit
     * shipped: ticking a Khan unit credits its whole timetable block. On Aug 18
     * her record already held 4h 15m from his ticks alone — over the 4.5-hour
     * bar's neighbourhood and nowhere near zero — while this item sat red
     * telling her the day was empty.
     *
     * An alarm that fires on a day already above target teaches her to ignore
     * the alarm, and the one day it matters looks the same as the six it does
     * not.
     *
     * So it flags the days that are genuinely SHORT: credited time below
     * Georgia's daily bar, with nothing logged offline to close the gap. On a
     * day he worked in the app and nowhere else, that is silent. On a day he
     * spent two hours at the kitchen table, it asks.
     */
    const daysMissingOfflineTime = Object.entries(allAttendance)
      .filter(([date, rec]) => {
        if (date < weekAgo || date > today) return false;
        const active = rec?.activeMinutes || 0;
        const offline = rec?.offlineMinutes || 0;
        if (offline > 0) return false;
        const credited = Math.max(active, creditedByDate[date] || 0);
        // Nothing at all recorded is not a missing-offline-minutes problem;
        // it is a day off, and the year plan already reports those.
        if (credited === 0) return false;
        return credited < GEORGIA_MINUTES_PER_DAY;
      })
      .map(([date]) => date)
      .sort();

    const unreadMessages = messages.filter((m) => m.sender === 'student' && !m.readByParent);
    const pendingRewards = rewardRedemptions.filter((r) => r.kind === 'reward' && r.status === 'pending');

    // ---- DO: dated work ----
    /**
     * THE DONE-CHECK NEEDS THE WORK TO CHECK AGAINST.
     *
     * ---- WHERE THIS CAME FROM (Aug 20, 2026) ----
     *
     * The parent: **"Why is the rocket bottle still due? I already read and
     * graded it."**
     *
     * She had. Two feeds computed the same fact and disagreed:
     *
     *     writingScheduleCalendarItems({ writingEntries })  ->  done: true
     *     buildPlannerItems({ assignments, academicAssignments })  ->  overdue
     *
     * Same function, underneath. `derivedPlannerItems` passes its sources
     * straight through to the writing and garden feeds, and those decide `done`
     * by looking for a matching entry in `writingEntries` / `gardenLog`. This
     * call site passed neither, so both defaulted to `[]`, and **every writing
     * journal item and every garden task in the app was permanently
     * unfinished** — here, and on the Daily, Weekly and Monthly Scheduler
     * views, which made the same omission.
     *
     * Bottle Rocket and Mission Report were both graded weeks ago and both sat
     * in Past Due. So did garden work she may well have done.
     *
     * A default of `[]` for "the evidence that this was finished" reads as
     * "nothing was finished" and never errors.
     */
    const plannerItems = buildPlannerItems({
      assignments,
      academicAssignments,
      writingEntries,
      gardenLog
    });
    const { due, steps } = splitPlannerItems(plannerItems);
    const overdue = due.filter((i) => !i.done && i.dueDate < today);
    const dueThisWeek = due.filter((i) => !i.done && i.dueDate >= today && i.dueDate <= weekAhead);
    const stepsThisWeek = steps.filter((s) => !s.done && s.dueDate >= today && s.dueDate <= weekAhead);

    // ---- DO: quarterly exams ----
    //
    // The board said NOTHING about exams before this, and there are twelve of
    // them across the year. They are the largest graded event of a quarter and
    // she would only have found out by going to look.
    //
    // "Ready" means every lesson it gates is mastered, which is exactly the
    // condition the Roster uses to unlock it — so this never tells her he can
    // sit an exam he cannot actually open.
    const examsThisQuarter = allLessons.filter((l) => l.isQuarterlyExam && l.quarter === quarter);
    const examsReady = examsThisQuarter.filter((ex) => {
      const attempted = (lessonProgress[ex.id]?.attempts ?? 0) > 0;
      if (attempted) return false;
      const gates = ex.unlocksAfter || [];
      return gates.length > 0 && gates.every((id) => lessonProgress[id]?.mastered);
    });
    const examsTaken = examsThisQuarter
      .filter((ex) => (lessonProgress[ex.id]?.attempts ?? 0) > 0)
      .map((ex) => ({ exam: ex, pct: Math.round((lessonProgress[ex.id]?.bestAccuracy ?? 0) * 100) }));

    // ---- DO: the quarter itself is ending ----
    //
    // Report card, mission evaluation and course descriptions all cluster here,
    // and the only countdown that existed was the Declaration of Intent. Same
    // treatment: name the date, count the days.
    const QUARTER_END_MONTH = { Q1: 10, Q2: 12, Q3: 3, Q4: 5, Summer: 7 };
    const qid = String(quarter).split(' ')[0];
    const endMonth = QUARTER_END_MONTH[qid];
    let quarterEndsInDays = null;
    let quarterEndDate = null;
    if (endMonth) {
      const now = parseDateStr(today);
      const yr = endMonth >= 8 ? now.getFullYear() : (now.getMonth() + 1 >= 8 ? now.getFullYear() + 1 : now.getFullYear());
      quarterEndDate = new Date(yr, endMonth, 0); // day 0 of next month = last day of endMonth
      quarterEndsInDays = Math.ceil((quarterEndDate.getTime() - now.getTime()) / 86400000);
      if (quarterEndsInDays < 0 || quarterEndsInDays > 21) quarterEndsInDays = null;
    }

    // ---- DO: her own quarterly evaluation ----
    const evalThisQuarter = missionEvaluations.find((e) => e.quarter === quarter);
    const evaluationUnapproved = Boolean(evalThisQuarter) && !evalThisQuarter.parentApproved;

    // ---- LOOK FOR: signals, not tasks ----
    const gradedThisQuarter = khanAcademyAssignments.filter((a) => a.batchLabel === quarter && a.gradePercent != null);
    const lowScores = gradedThisQuarter.filter((a) => a.gradePercent < 70);
    const bySubjectLow = {};
    for (const a of lowScores) bySubjectLow[a.subject] = (bySubjectLow[a.subject] || 0) + 1;
    const strugglingSubject = Object.entries(bySubjectLow).sort((a, b) => b[1] - a[1])[0] || null;

    // A book that has been "reading" for more than three weeks, or a current
    // book never opened. Both are the kind of quiet drift that only shows up
    // if someone looks for it.
    const stalledBooks = academicBooks.filter((b) => {
      if (!b.title || b.status !== 'in-progress') return false;
      if (!b.startedAt) return false;
      return (parseDateStr(today) - new Date(b.startedAt)) / DAY_MS > 21;
    });

    /**
     * REFLECTIONS THAT ARE NOT REFLECTIONS.
     *
     * ---- WHERE THIS CAME FROM (Aug 20, 2026) ----
     *
     * The parent, looking at her own board: **"What is in his own words?"**
     *
     * A fair question, because of the four reflections waiting on her, this is
     * what he had written:
     *
     *     "fortnit"                 (twice)
     *     "mile stone"
     *     "gilider in fortnite and the battal bus"
     *     "ASDFGHJKL;"              (three times, on the typing lesson)
     *
     * The queue counted them, dated them and asked her to read them. Nothing
     * anywhere said they were one word long. A reflection beat that accepts
     * "fortnit" and files it as work done is not measuring understanding — it
     * is measuring that a box was typed in, and it hands the parent a queue of
     * four items that are really one conversation to have.
     *
     * Two or fewer words is not a judgement about him. It is the signal that
     * the beat did not land, which is exactly what this panel is for: not a
     * task, a judgement call, with the number attached so she can decide
     * whether it matters.
     */
    const thinReflections = selfExplanations.filter((e) => {
      // Only ones still waiting on her. Once she has read it or said something
      // back, the conversation happened — leaving it flagged would make three
      // one-word answers from August a permanent fixture on her board.
      if (e.readAt || e.grade || e.gradeNote) return false;
      const words = String(e.text || '').trim().split(/\s+/).filter(Boolean);
      return words.length > 0 && words.length <= 2;
    });

    const currentBookNotStarted = academicAssignments.filter(
      (a) =>
        a.type === 'Reading Assignment' &&
        a.title &&
        a.quarter === quarter &&
        a.status === 'not-started' &&
        a.dueDate &&
        a.dueDate <= weekAhead
    );

    // Khan subjects with nothing marked finished this quarter yet — either he
    // is stuck or nobody has been marking units complete. Worth knowing which.
    const khanSubjectsQuiet = [];
    const subjects = [...new Set(khanAcademyAssignments.filter((a) => a.batchLabel === quarter).map((a) => a.subject))];
    for (const subject of subjects) {
      const rows = khanAcademyAssignments.filter((a) => a.batchLabel === quarter && a.subject === subject);
      if (rows.length && rows.every((a) => !a.completed)) khanSubjectsQuiet.push(subject);
    }

    const daysSinceNote = parentNotes.length
      ? Math.round((parseDateStr(today) - new Date(parentNotes[0].createdAt)) / DAY_MS)
      : null;

    /**
     * ==================================================================
     * THE THIRD SCREEN TO COMPUTE THIS FROM THE CALENDAR ALONE.
     * ==================================================================
     *
     * The parent, Aug 26 2026, looking at a board still counting down to a
     * deadline she had already met: **"i dont want that there."**
     *
     * This is the SAME fault she reported on Aug 21 — *"I ticked that I
     * completed the Declaration of Intent in the parent dashboard. The app
     * still shows that it is due."* That fix went into ComplianceSection and
     * stopped there. This board asks `nextDeclarationDeadline(today)` and
     * nothing else, so it never saw her tick; `complianceChecks` was not even
     * subscribed here.
     *
     * FIXING ONE CALL SITE IS NOT FIXING A RULE, which this project has now
     * relearned at a cost of the same complaint twice. Both screens go through
     * `declarationCoversToday` — one implementation of one legal question.
     */
    const declarationCheck = complianceChecks?.['declaration-of-intent'];
    const declarationFiled = declarationCoversToday(
      declarationCheck?.done ? declarationCheck.completedAt : null,
      today
    );
    const declarationDue = nextDeclarationDeadline(today);
    const declarationDays = daysUntil(declarationDue, today);

    return {
      khanUngraded, writingUngraded, academicUngraded, reflectionsUnread,
      daysMissingOfflineTime, unreadMessages, pendingRewards,
      overdue, dueThisWeek, stepsThisWeek,
      examsReady, examsTaken, quarterEndsInDays, quarterEndDate, evaluationUnapproved,
      strugglingSubject, stalledBooks, currentBookNotStarted, khanSubjectsQuiet, thinReflections,
      ungradedOtherQuarter,
      daysSinceNote, declarationDue, declarationDays, declarationFiled
    };
  }, [
    khanAcademyAssignments, writingEntries, selfExplanations, academicAssignments, academicBooks,
    lessonProgress, missionEvaluations,
    assignments, allAttendance, messages, rewardRedemptions, parentNotes, today, quarter,
    complianceChecks
  ]);

  /**
   * One flat queue across all three tables, newest work first.
   *
   * Deliberately NOT memoised on the grade fields: this list is rebuilt from
   * store state on every render, so a row she grades updates in place rather
   * than disappearing. It leaves the queue when the board is next opened.
   */
  const promptTitleById = Object.fromEntries(writingPrompts.map((p) => [p.id, p.title]));
  const gradeQueue = [];
  // His own writing is not in the grading queue any more -- it is read and
  // replied to, and it is counted separately so "3 things need a grade" stays
  // true. See ReadAndReply above.
  const readQueue = [];
  const lessonTitleById = Object.fromEntries(allLessons.map((l) => [l.id, l.title]));
  const pinnedKhan = khanAcademyAssignments.filter(
    (a) => justGraded.has(`khan-${a.id}`) && !board.khanUngraded.some((u) => u.id === a.id)
  );
  const pinnedWriting = writingEntries.filter(
    (e) => justGraded.has(`writing-${e.id}`) && !board.writingUngraded.some((u) => u.id === e.id)
  );
  const pinnedReflections = selfExplanations.filter(
    (e) => justGraded.has(`reflection-${e.id}`) && !board.reflectionsUnread.some((u) => u.id === e.id)
  );
  const pinnedAcademic = academicAssignments.filter(
    (a) => justGraded.has(`academic-${a.id}`) && !board.academicUngraded.some((u) => u.id === a.id)
  );

  for (const row of [...board.khanUngraded, ...pinnedKhan]) {
    gradeQueue.push({
      key: `khan-${row.id}`,
      kind: SUBJECT_LABELS[row.subject] || row.subject,
      title: row.skillTitle,
      /**
       * An out-of-period row says so on its face. Without this the queue is
       * honest and baffling: a unit finished in August appears in November's
       * list with nothing to explain why it waited.
       */
      detail: (row.isCourseChallenge ? 'Course Challenge' : 'Unit Test') + " · type Khan's score, e.g. 9/11",
      type: 'percent',
      percent: row.gradePercent ?? null,
      raw: row.gradeRaw ?? null,
      onGrade: (value, raw) => { setKhanPercent(row.id, value, raw); pin(`khan-${row.id}`); },
      openSection: 'khan-academy',
      openLabel: 'Full list'
    });
  }
  for (const entry of [...board.writingUngraded, ...pinnedWriting]) {
    gradeQueue.push({
      key: `writing-${entry.id}`,
      kind: 'Writing Journal',
      title: promptTitleById[entry.promptId] || 'Journal entry',
      detail: `${entry.wordCount || 0} words · read it before grading`,
      type: 'letter',
      grade: entry.grade || null,
      onGrade: (g) => { gradeWritingEntry(entry.id, g); pin(`writing-${entry.id}`); },
      openSection: 'writing-journal',
      openLabel: 'Read'
    });
  }
  for (const e of [...board.reflectionsUnread, ...pinnedReflections]) {
    const words = (e.text || '').trim().split(/\s+/).filter(Boolean).length;
    const lessonTitle = lessonTitleById[e.lessonId] || null;
    const attempts = e.attempts || 1;
    readQueue.push({
      key: `reflection-${e.id}`,
      kind: 'In His Own Words',
      // THE LESSON, then the beat. It printed only the beat label, so four rows
      // reading "The Home Row" gave no clue they were all Typing Fundamentals.
      title: lessonTitle
        ? `${lessonTitle}${e.beatLabel ? ' — ' + e.beatLabel : ''}`
        : e.beatLabel || 'Explained it back to Commander Nova',
      detail:
        `${words} word${words === 1 ? '' : 's'}` +
        (attempts > 1 ? ` · ${attempts} attempts, newest shown` : '') +
        ` · "${(e.text || '').trim().slice(0, 90)}${(e.text || '').trim().length > 90 ? '…' : ''}"`,
      /**
       * THE WHOLE THING HE WROTE.
       *
       * The parent: **"In his words there isn't an option for me to read what
       * he wrote."**
       *
       * The row quoted the first 90 characters and trailed off, and its only
       * link went to the Gradebook, which does not carry reflection text. So
       * anything longer than a sentence could be counted, dated, queued and
       * answered — without ever being readable.
       *
       * It did not show while his reflections were "fortnit" and "mile stone";
       * 90 characters was the whole answer. His real ones arrived tonight.
       *
       * **A queue that asks her to respond to writing has to let her read the
       * writing.**
       */
      fullText: (e.text || '').trim(),
      type: 'reply',
      note: e.gradeNote || null,
      grade: e.grade || null,
      /**
       * A grade clears the whole group, exactly as a reply does — the row
       * collapses N attempts and has to act on N. The letter goes on the
       * attempt she read; the earlier drafts are marked read without one,
       * because grading a draft she never opened would be inventing a
       * judgement.
       */
      onGrade: (g, note) => {
        gradeSelfExplanation(e.id, g, note);
        for (const otherId of (e.ids || []).filter((id) => id !== e.id)) {
          respondToSelfExplanation(otherId, '');
        }
        pin(`reflection-${e.id}`);
      },
      /**
       * The note lands on the attempt she is looking at — it is a reply to
       * what she just read. The rest are marked read without one, because they
       * are earlier drafts of the same answer and she has now read the newest.
       */
      onRespond: (note) => {
        respondToSelfExplanation(e.id, note);
        for (const otherId of (e.ids || []).filter((id) => id !== e.id)) {
          respondToSelfExplanation(otherId, '');
        }
        pin(`reflection-${e.id}`);
      },
      openSection: 'gradebook',
      openLabel: 'Gradebook'
    });
  }
  for (const a of [...board.academicUngraded, ...pinnedAcademic]) {
    gradeQueue.push({
      key: `academic-${a.id}`,
      kind: a.type || 'Assignment',
      title: a.title,
      detail: a.dueDate ? `Due ${formatShortDate(parseDateStr(a.dueDate))}` : null,
      type: 'letter',
      grade: a.grade || null,
      onGrade: (g) => { gradeAcademicAssignment(a.id, g); pin(`academic-${a.id}`); },
      openSection: 'academic-success-center',
      openLabel: 'Open'
    });
  }

  // Reflections are NOT in this number. It drives "needs a grade", and his
  // reflections do not need one -- counting them there is what made a Sunday
  // look like eleven pieces of grading when there were four.
  const outstanding =
    board.khanUngraded.length + board.writingUngraded.length + board.academicUngraded.length;

  const doItems = [];
  if (board.examsReady.length)
    doItems.push({
      tone: 'urgent',
      count: board.examsReady.length,
      label: board.examsReady.length === 1 ? 'A quarterly exam is ready and not taken' : 'Quarterly exams ready and not taken',
      detail: board.examsReady.map((e) => (SUBJECT_LABELS[e.subject] || e.subject) + ' — every lesson it covers is done').join(' · '),
      go: 'gradebook',
      actionLabel: 'See'
    });
  if (board.examsTaken.length)
    doItems.push({
      tone: 'do',
      count: board.examsTaken.length,
      label: 'Quarterly exam results this quarter',
      detail: board.examsTaken.map((e) => (SUBJECT_LABELS[e.exam.subject] || e.exam.subject) + ' ' + e.pct + '%').join(' · '),
      go: 'report-card',
      actionLabel: 'Report Card'
    });
  if (board.quarterEndsInDays !== null)
    doItems.push({
      tone: board.quarterEndsInDays <= 7 ? 'urgent' : 'do',
      count: board.quarterEndsInDays,
      label: 'Days until this quarter ends',
      detail: 'Report card, the mission evaluation and course descriptions all come due together. Worth starting before the last week.',
      go: 'report-card',
      actionLabel: 'Report Card'
    });
  if (board.evaluationUnapproved)
    doItems.push({
      tone: 'do',
      label: 'This quarter\'s Mission Evaluation is not approved yet',
      detail: 'It does not count toward his record until you have read it and approved it.',
      go: 'mission-evaluations',
      actionLabel: 'Review'
    });
  if (board.overdue.length)
    doItems.push({ tone: 'urgent', count: board.overdue.length, label: 'Past due', detail: board.overdue.slice(0, 2).map((i) => i.title).join(' · '), go: 'coming-up', actionLabel: 'Review' });
  if (board.daysMissingOfflineTime.length)
    doItems.push({ tone: 'urgent', count: board.daysMissingOfflineTime.length, label: 'Days with no offline minutes logged', detail: 'These days fall under the 4.5-hour bar on what is recorded. If he worked away from the app — reading, a field trip, work at the table — logging it closes the gap', go: 'attendance', actionLabel: 'Log' });
  if (board.unreadMessages.length)
    doItems.push({ count: board.unreadMessages.length, label: 'Unread messages from Lamar', go: 'mission-comms', actionLabel: 'Read' });
  if (board.pendingRewards.length)
    doItems.push({
      tone: 'urgent',
      count: board.pendingRewards.length,
      label: 'Reward requests waiting on your approval',
      // The Credits are ALREADY gone from his balance while a request sits
      // here — that is what makes this urgent rather than housekeeping. A
      // denial refunds them as a new ledger entry, so nothing is lost either
      // way, but nothing moves at all until she answers.
      detail: 'His Credits are already spent while these wait. Denying refunds them.',
      go: 'rewards-manager',
      actionLabel: 'Review'
    });
  if (board.stepsThisWeek.length)
    doItems.push({ count: board.stepsThisWeek.length, label: 'Project steps he should work on this week', detail: board.stepsThisWeek.slice(0, 2).map((s) => `${s.title} — ${s.parentTitle}`).join(' · '), go: 'coming-up', actionLabel: 'See' });
  if (board.dueThisWeek.length)
    doItems.push({ count: board.dueThisWeek.length, label: 'Due in the next 7 days', detail: board.dueThisWeek.slice(0, 2).map((i) => `${i.title} (${formatShortDate(parseDateStr(i.dueDate))})`).join(' · '), go: 'coming-up', actionLabel: 'See' });

  const watchItems = [];
  if (board.strugglingSubject)
    watchItems.push({ tone: 'watch', count: board.strugglingSubject[1], label: `Scores under 70% in ${SUBJECT_LABELS[board.strugglingSubject[0]] || board.strugglingSubject[0]}`, detail: 'One low score is a bad day. A pattern is a placement problem — worth checking whether the level is right.', go: 'khan-academy', actionLabel: 'Look' });
  if (board.khanSubjectsQuiet.length)
    watchItems.push({ tone: 'watch', count: board.khanSubjectsQuiet.length, label: 'Subjects with nothing finished yet this quarter', detail: board.khanSubjectsQuiet.map((s) => SUBJECT_LABELS[s] || s).join(' · ') + ' — either he is stuck, or units are not being marked finished', go: 'khan-academy', actionLabel: 'Look' });
  if (board.currentBookNotStarted.length)
    watchItems.push({ tone: 'watch', count: board.currentBookNotStarted.length, label: 'A book is due soon and not started', detail: board.currentBookNotStarted.map((a) => a.title.split(' — ')[0]).join(' · '), go: 'academic-success-center', actionLabel: 'Look' });
  if (board.stalledBooks.length)
    watchItems.push({ tone: 'watch', count: board.stalledBooks.length, label: 'Books open longer than three weeks', detail: board.stalledBooks.map((b) => b.title).join(' · '), go: 'academic-success-center', actionLabel: 'Look' });
  if (board.ungradedOtherQuarter.length)
    watchItems.push({
      tone: 'watch',
      count: board.ungradedOtherQuarter.length,
      label: 'Finished units from another quarter, still ungraded',
      detail:
        board.ungradedOtherQuarter
          .map((a) => `${a.skillTitle} · ${a.batchLabel}, marked done ${String(a.completedAt || '').slice(0, 10)}`)
          .join(' · ')
        + ' — he worked ahead, or the wrong row got ticked. Worth deciding which before it takes a score.',
      go: 'khan-academy',
      actionLabel: 'Look'
    });
  if (board.thinReflections.length)
    watchItems.push({
      tone: 'watch',
      count: board.thinReflections.length,
      label: 'Reflections of two words or fewer',
      detail:
        board.thinReflections.slice(0, 4).map((e) => `"${String(e.text || '').trim()}"`).join(' · ')
        + ' — the box was filled, not the thinking. Worth asking him out loud rather than marking it.',
      go: 'writing-journal',
      actionLabel: 'Read'
    });
  if (board.daysSinceNote === null)
    watchItems.push({ tone: 'watch', label: 'No observations recorded yet', detail: 'Notes are your own record and never travel to his copy. They are what a portfolio review is built from.', go: 'notes', actionLabel: 'Write' });
  else if (board.daysSinceNote > 14)
    watchItems.push({ tone: 'watch', count: board.daysSinceNote, label: 'Days since your last written observation', detail: 'Worth one line a week — it is what a portfolio review is built from.', go: 'notes', actionLabel: 'Write' });

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-signal-cyan/40 bg-gradient-to-br from-[#16233b] to-space-800 p-5 shadow-glow">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Mission Control Board</p>
        <h3 className="mt-1 font-display text-xl font-700 text-ink-100">
          {doItems.length + outstanding === 0
            ? 'Nothing is waiting on you'
            : `${doItems.length + outstanding} thing${doItems.length + outstanding === 1 ? ' needs' : 's need'} you this week`}
        </h3>
        <p className="mt-2 text-sm text-ink-300">
          Built from your real records every time you open it — nothing here is a saved to-do list, so an item
          disappears only when the work behind it is actually done. {quarter}.
        </p>
      </div>

      {/**
        * The one thing with a real, dated legal deadline — shown until she has
        * met it, and NOT AFTER.
        *
        * It used to say "Always shown", and that was the whole bug: a board
        * whose own header promises "an item disappears only when the work
        * behind it is actually done" kept a filed legal deadline on screen
        * counting down. Every other item here earns its place from her records.
        * This one asserted its place regardless of them.
        *
        * Filed is not hidden, it is just not HERE — Compliance (GA) shows
        * "Declaration of Intent — filed" and the date she marked it. This
        * board is for what still needs her.
        */}
      {!board.declarationFiled && (
      <div
        className={
          'rounded-xl border p-4 shadow-panel ' +
          (board.declarationDays <= 30 ? 'border-signal-amber/50 bg-signal-amber/5' : 'border-space-700 bg-space-800')
        }
      >
        <p className="text-xs font-display uppercase tracking-widest text-signal-amber">Georgia deadline</p>
        <p className="mt-1 text-sm text-ink-100">
          Declaration of Intent — due{' '}
          <span className="font-display font-700">
            {parseDateStr(board.declarationDue).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
          {board.declarationDays >= 0 ? (
            <span className={board.declarationDays <= 30 ? 'text-signal-amber' : 'text-ink-500'}> · {board.declarationDays} days</span>
          ) : (
            <span className="text-signal-red"> · overdue</span>
          )}
        </p>
        <button
          type="button"
          onClick={() => onGoTo('compliance')}
          className="mt-2 text-xs text-signal-cyan underline hover:brightness-110"
        >
          Open Compliance
        </button>
      </div>
      )}

      <Panel
        title={`Ready to grade${outstanding ? ' · ' + outstanding : ''}`}
        hint={
          justGraded.size > 0
            ? `Graded rows stay put so the list doesn't move while you type. ${justGraded.size} done this sitting.`
            : 'Everything waiting on a score, gradeable right here. Khan units take the percentage; journal entries and reports take a letter.'
        }
      >
        <ReadyToGrade items={gradeQueue} onGoTo={onGoTo} />
      </Panel>

      {/**
        * A SEPARATE PANEL, BECAUSE IT IS SEPARATE WORK.
        *
        * These rows sat inside "Ready to grade" and were counted in its
        * number, which is how a Sunday with four things to grade looked like
        * eleven. Nothing here needs a score. It needs two minutes of reading,
        * and at most one sentence back.
        *
        * It renders nothing at all when there is nothing unread -- an empty
        * "well done" panel every day would train her to scroll past this spot.
        */}
      {readQueue.length > 0 && (
        <Panel
          title={`In his own words · ${readQueue.length}`}
          hint="Read what he wrote. Give it a letter if it earns one — it counts toward his subject grade — and say one specific thing back. Either clears it."
        >
          <ReadyToGrade items={readQueue} onGoTo={onGoTo} />
        </Panel>
      )}

      <Panel title="Do this week" hint="Work with your name on it. Each button goes straight to the screen that clears it.">
        {doItems.length === 0 ? (
          <p className="rounded-lg border border-signal-green/30 bg-signal-green/5 px-3 py-4 text-center text-sm text-signal-green">
            Nothing outstanding. Grading is current, the record is complete, and nothing is overdue.
          </p>
        ) : (
          doItems.map((item, i) => (
            <Row
              key={i}
              tone={item.tone}
              count={item.count}
              label={item.label}
              detail={item.detail}
              actionLabel={item.actionLabel}
              onAction={() => onGoTo(item.go)}
            />
          ))
        )}
      </Panel>

      <Panel title="What to look for" hint="Not tasks — judgment calls. The number is here so you can decide whether it matters.">
        {watchItems.length === 0 ? (
          <p className="rounded-lg border border-space-700 bg-space-900 px-3 py-4 text-center text-sm text-ink-400">
            No signals worth flagging. Scores are steady, books are moving, and your notes are current.
          </p>
        ) : (
          watchItems.map((item, i) => (
            <Row
              key={i}
              tone={item.tone}
              count={item.count}
              label={item.label}
              detail={item.detail}
              actionLabel={item.actionLabel}
              onAction={() => onGoTo(item.go)}
            />
          ))
        )}
      </Panel>

      <Panel
        title="The daily handoff"
        hint="The loop between his computer and yours. Daily for the first few weeks while the routine settles, then Wednesday and Friday."
      >
        <ol className="space-y-1.5 text-sm text-ink-300">
          {[
            'He taps "Send my work to Mom" at the bottom of his dashboard, and sends you the file',
            'You import it here — Settings → Export / Import',
            'You grade — the four screens under Grading',
            'You log offline minutes — Every Day → Attendance',
            'You export and send it back',
            'He taps "Get my graded work back" and picks your file'
          ].map((step, i) => (
            <li key={i} className="flex gap-2.5">
              <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-space-700 font-display text-[11px] text-ink-300">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <p className="mt-2 text-xs text-ink-500">
          Importing the same file twice is always safe — the second time does nothing.
          A missed day is not a problem either; the next import carries everything since the last one.
        </p>
      </Panel>

      {/* Built from Panel and Row so it looks like the rest of the board rather
          than a second visual language bolted on. */}
      <Panel
        title="Where do I go for…?"
        hint="Everything else on this dashboard, sorted by when you would need it — not by what it is filed under."
      >
        {SIGNPOST.map(([when, rows]) => (
          <div key={when} className="pt-1">
            <p className="pb-1 font-display text-[11px] uppercase tracking-widest text-ink-500">{when}</p>
            <div className="space-y-1.5">
              {rows.map(([go, label, why]) => (
                <Row key={go} tone="watch" label={label} detail={why} actionLabel="Open" onAction={() => onGoTo(go)} />
              ))}
            </div>
          </div>
        ))}
      </Panel>
    </div>
  );
}
