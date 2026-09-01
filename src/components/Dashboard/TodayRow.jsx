
/**
 * ONE LINE PER THING TO DO. Aug 7, 2026, from the parent looking at the real
 * screen: "It looks cluttered and unorganized."
 *
 * She was right, and the measurement was worse than it sounded: the home
 * screen ran 3,152px — three and a half viewports — across 14 cards, with the
 * phrase "Today's Lesson" appearing five separate times and no answer to
 * "which one do I actually do?"
 *
 * The cause was not too much content. It was chrome. Showing one Khan lesson
 * took FOUR nested bordered boxes and THREE stacked headings:
 *
 *     card  "Today's Social Studies Mission — On Khan Academy"
 *       panel  "Social Studies · 0 of 10 this quarter"
 *         label  "Today's Lesson"
 *           box  Origins of History        [Mark Complete]
 *
 * This component is that same information as a single row: subject, title,
 * one action. No nesting. Every row is the same height, so the eye can scan a
 * column of names instead of parsing a stack of boxes.
 *
 * THE DAILY CHECKBOX is the other half, and it is not decoration. A Khan unit
 * is not a day's work — Math Q1 is 17 units across roughly 12 weeks, about one
 * unit every three or four school days. Before this, he could work for
 * 45 minutes and nothing on the screen changed. The checkbox records that he
 * showed up today; it is keyed by date, so tomorrow it is empty again. Marking
 * the UNIT finished is a separate, permanent action that carries the grade.
 *
 * ---- AND THEN THE SECOND ACTION WAS TAKEN BACK OUT (Aug 12, 2026) ----
 *
 * For two days this row carried BOTH: a daily checkbox and, beside it, a
 * "Unit done" button that finished the unit outright — 20 XP, attendance, and
 * the subject advanced to the next unit.
 *
 * It advanced his computer four units past where he actually was.
 *
 * The reason is arithmetic, not carelessness. A Khan unit is three or four
 * school days of work, and the button was the only control on the row that
 * visibly DID something. Tap it at the end of a session — which is what a
 * button beside a lesson invites — and the subject jumps a unit for a day's
 * work. Nothing on the screen could contradict him, because this app cannot
 * see Khan Academy; it only ever knew that a button had been pressed.
 *
 * The parent: "can we remove the done buttons. The check box should be good
 * enough so that he won't select the done multiple times."
 *
 * So the row is back to ONE control, and it is the safe one. The checkbox
 * means "I worked on this today" — five XP, keyed to the date, undoable,
 * harmless if he taps it ten times.
 *
 * A unit is now finished by exactly one event: THE PARENT ENTERING THE KHAN
 * SCORE. That is not a workaround, it is the only signal in this system with
 * anything real behind it. Measured across every completed unit on Aug 11:
 * each one carrying a grade matched a genuine Khan unit test; each one
 * without a grade had no test behind it at all. The score is the evidence.
 * A tap never was.
 *
 * If a student-facing "finish this unit" control is ever proposed again, this
 * is the paragraph to read first. verify-khan-unit-completion.mjs fails if one
 * comes back.
 */
export function TodayRow({
  subject,
  label,          // overrides the subject name — used by the word-study rows
  title,
  detail,
  kind,           // 'mission' | 'khan' | 'done' | 'rest'
  dailyDone,      // khan rows only — checked off for today?
  onToggleDaily,
  /**
   * WHAT HE ALREADY DID ON THIS ROW. (Aug 11, 2026.)
   *
   * The parent: "Lamar states that he has completed assignments for it and it
   * doesn't mark off on the mission control board but shows a different story
   * when he selects start so he know it went through."
   *
   * He was right, and so was the app — they simply never told each other.
   * A mission row shows the next UNMASTERED lesson. So the moment he masters
   * one, the row silently swaps to the next title and keeps saying "Start".
   * Nothing on the screen says the last one was finished. Three reading
   * lessons at 100% look, from the row, exactly like none.
   *
   * And below the mastery line it is worse: mastery is 90%, so a lesson he
   * finished at 80% stays as the SAME row with the SAME button, completely
   * indistinguishable from one he has never opened. The only way to discover
   * either fact was to press Start and read the screen that came up — which
   * is exactly what he was doing.
   */
  progressNote,   // "Tried twice · best 80%" or "Finished Mae Jemison today"
  progressTone,   // 'done' | 'partial'
  /**
   * WHICH TIMETABLE BLOCK THIS ROW BELONGS TO — e.g. 'block-2'.
   *
   * Added Aug 20, 2026. The student, via his parent: **"Lamar is complaining
   * that he'd like the rest of his day to be in sync with his Today's
   * Routine."** The list and the rail named the same work in two different
   * orders; see TimetableOrder.jsx, which reads this prop and sorts on it.
   *
   * The row does not look the time up itself. The parent can move any block in
   * the Scheduler, so the only correct start time is the one in HER
   * `scheduleBlocks`, and that is read once by the sorter rather than by every
   * row.
   */
  blockId,
  when,           // "9:00 AM" — supplied by the parent screen, printed here
  offTimetable,   // true = assigned to him, but today's timetable has no slot
  onAction,
  actionLabel
}) {
  const isDone = kind === 'done';

  /**
   * 'rest' = NOTHING DUE, AND NOTHING DONE EITHER. (Aug 9, 2026.)
   *
   * The weekend spelling and vocabulary rows were rendered as kind='done',
   * which is the only reason they existed -- to stop them vanishing on a
   * Saturday. But 'done' paints a filled green tick and strikes the title
   * through, so the parent read the screen exactly as it was drawn: "spelling
   * and vocab are marked off as completed when its not."
   *
   * A row that is not due is not a row that is finished, and the two must
   * never share a treatment. 'rest' keeps the empty box and live text, and
   * quiets the action button instead.
   */
  const isRest = kind === 'rest';

  return (
    <div className="flex items-center gap-3 border-t border-space-700 px-4 py-3 first:border-t-0">
      {/* THE TICK IS OFFERED WHEREVER A ROW SUPPLIES ONE — and the rule that
          decides which rows do has not changed. A MISSION row never gets one:
          a Mission Control lesson is "done" by mastering it, not by ticking a
          box, and a tick there would let him mark work complete he has not
          done. That is why this is keyed off `onToggleDaily` rather than off
          kind: the row that owns the fact decides.

          Khan rows record THE DAY, not the unit. The book row (Aug 15, 2026)
          records tonight's reading into the Reading Log — the parent's son was
          reading two chapters a night while Nova reported "No independent
          reading logged", because filling that log meant leaving the board and
          typing four fields about a book the app already knew he was reading.

          Both are keyed by date, both are undoable, and neither advances
          anything. That is what makes a tick safe. */}
      {onToggleDaily ? (
        <button
          type="button"
          onClick={onToggleDaily}
          aria-label={dailyDone ? `Undo today's ${subjectCardLabel(subject)} check-off` : `Mark ${subjectCardLabel(subject)} done for today`}
          className={
            'h-5 w-5 flex-none rounded border transition ' +
            (dailyDone
              ? 'border-signal-green bg-signal-green'
              : 'border-space-600 hover:border-signal-cyan')
          }
        >
          {dailyDone && (
            <svg viewBox="0 0 16 16" className="h-full w-full text-space-950" aria-hidden="true">
              <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      ) : (
        <span
          className={
            'h-5 w-5 flex-none rounded border ' +
            (isDone ? 'border-signal-green bg-signal-green' : 'border-space-600')
          }
          aria-hidden="true"
        />
      )}

      {/**
        * THE TIME, IN THE SAME COLUMN ON EVERY ROW.
        *
        * This is what makes the list readable AS the timetable rather than
        * merely sorted like it — the eye can match a row against the rail
        * without counting positions. A row with no block prints nothing here
        * and keeps its alignment, because the column is fixed width.
        */}
      <span className="w-16 flex-none font-mono text-[11px] text-ink-600" aria-hidden={!when}>
        {when || ''}
      </span>

      <span className="w-28 flex-none truncate font-display text-[11px] uppercase tracking-widest text-ink-500">
        {label || subjectCardLabel(subject)}
        {/**
          * "NOT TODAY" IS SAID, NOT IMPLIED BY POSITION.
          *
          * Social Studies has work assigned all through Q1 and no day that
          * owns it — the 2:15 block goes to Technology on Tuesday and
          * Thursday. Sorting it to the bottom of the list is not an
          * explanation; a boy reads that as "last", not as "not today". So
          * the row says so in words.
          */}
        {offTimetable && (
          <span className="mt-0.5 block truncate font-400 normal-case tracking-normal text-signal-amber">
            not on today&apos;s timetable
          </span>
        )}
      </span>

      <span className="min-w-0 flex-1">
        <span
          className={
            'block truncate text-sm ' +
            (isDone ? 'text-ink-500 line-through' : isRest ? 'text-ink-300' : 'text-ink-100')
          }
        >
          {title}
        </span>
        {detail && <span className="block truncate text-xs text-ink-500">{detail}</span>}
        {progressNote ? (
          <span
            className={
              'mt-0.5 block truncate text-xs font-display ' +
              (progressTone === 'done' ? 'text-signal-green' : 'text-signal-amber')
            }
          >
            {progressTone === 'done' ? '✓ ' : '↻ '}
            {progressNote}
          </span>
        ) : null}
      </span>

      {kind === 'khan' && (
        <span className="hidden flex-none text-[10px] uppercase tracking-widest text-ink-600 sm:inline">Khan</span>
      )}

      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className={
            'flex-none rounded-lg border px-3 py-1.5 text-xs font-display transition ' +
            (isDone || isRest
              ? 'border-space-600 text-ink-500 hover:border-signal-cyan/40 hover:text-signal-cyan'
              : 'border-signal-cyan/40 text-signal-cyan hover:bg-signal-cyan/10')
          }
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

/**
 * The single thing to do next. One card, visually dominant, one button — so
 * the screen answers "what now?" before he has to read anything else.
 */
export function StartHereCard({ subject, mission, onStart }) {
  const beats = Array.isArray(mission.novaIntro?.beats) ? mission.novaIntro.beats.length : null;
  const questions = Array.isArray(mission.questions) ? mission.questions.length : null;

  return (
    <div className="rounded-2xl border border-signal-cyan/40 bg-gradient-to-br from-[#16233b] to-space-800 p-6 shadow-glow">
      <p className="font-display text-[11px] uppercase tracking-widest text-signal-cyan">{subjectCardLabel(subject)}</p>
      <h2 className="mt-2 font-display text-3xl font-700 leading-tight text-ink-100">{mission.title}</h2>
      {mission.theme && <p className="mt-1 text-sm text-ink-300">{mission.theme}</p>}
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-500">
        {questions !== null && <span>{questions} questions</span>}
        {questions === null && beats !== null && <span>{beats} teaching beats</span>}
        {mission.passage && <><span aria-hidden="true">·</span><span>includes a reading passage</span></>}
      </div>
      <button
        type="button"
        onClick={() => onStart(mission)}
        className="mt-5 rounded-lg bg-signal-cyan px-6 py-2.5 font-display text-base font-700 text-space-950 shadow-glow transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-signal-cyan"
      >
        Launch Mission
      </button>
    </div>
  );
}

/** Compact tile for things that exist but are not due today. */
export function QuietTile({ title, detail, badge, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="rounded-xl border border-space-700 bg-space-800 px-4 py-3 text-left transition hover:border-signal-cyan/40"
    >
      <span className="flex items-center gap-2">
        <span className="font-display text-sm font-700 text-ink-100">{title}</span>
        {badge ? (
          <span className="rounded-full bg-signal-amber px-1.5 text-[10px] font-display font-700 text-space-950">{badge}</span>
        ) : null}
      </span>
      <span className="mt-0.5 block text-xs text-ink-500">{detail}</span>
    </button>
  );
}
import { academyContent } from '../../content/academyContent.js';

const { subjectCardLabel = () => null } = academyContent().subjects;
