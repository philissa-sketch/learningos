import { useAppStore } from '../../store/useAppStore.js';
import {
  buildCalendarItems,
  getUpcomingCalendarItems,
  getOverdueCalendarItems,
  todayDateStr,
  toDateStr,
  addDays,
  parseDateStr
} from '../../lib/scheduler.js';
import { orderBooks } from '../../lib/academicOrder.js';
import { academyContent } from '../../content/academyContent.js';

const { activeMilestone = () => null, hasMilestones = () => null, leadStatus = () => null, milestoneProgress = () => null, startByFor = () => null } = academyContent().academicCenter;
const { SUBJECT_LABELS = {} } = academyContent().subjects;

const LOOKAHEAD_DAYS = 7;

/**
 * Academic Center card — the Dashboard's window into Part 9 work.
 *
 * Why this exists: the Academic Success Center shipped as its own tab,
 * which meant a Book Report due Friday was invisible unless the student
 * went looking for it. Long-horizon work is exactly the kind that gets
 * forgotten, so it needs to be visible on the screen he actually opens
 * every day — same reasoning as the Khan Academy Missions card.
 *
 * Deliberately shows a 7-DAY WINDOW plus anything overdue, not the whole
 * year. A book report due in March is not today's problem, and putting it
 * here would be the same premature clutter the "This Week's Project" card
 * was already fixed for.
 *
 * Renders nothing at all when there's no current book and nothing due —
 * an empty card that says "nothing here" is clutter, not information.
 *
 * ===========================================================================
 * EVERY ROW OPENS THE THING IT NAMES. (Aug 26, 2026.)
 * ===========================================================================
 *
 * The parent: **"there isn't a link to lead him to the assignment from his
 * mission page. Open leads to the Book library not the assignment."**
 *
 * She is right, and this is the THIRD time this fault has been reported. The
 * Writing Journal row had it first; the reading row had it on Aug 15, and that
 * fix is written down four hundred lines away in these words: *"A row that
 * names a thing must open THAT thing."*
 *
 * This card never got the rule. It listed his book, the step he was on and
 * everything due this week — and **not one row was clickable**, while the Open
 * button called the handler straight from onClick, so it received a click
 * EVENT rather than an id and fell through to the Book Library every time.
 *
 * Fixing one call site is not fixing a rule. Every row here now carries the
 * thing it is about, and Open lands on the work he is actually in the middle
 * of rather than a list of twenty books.
 */
export function AcademicCenterCard({ onOpenAcademicCenter }) {
  const academicBooks = useAppStore((s) => s.academicBooks);
  const academicAssignments = useAppStore((s) => s.academicAssignments);
  // Field trips are the THIRD dated table. Left out of every calendar
  // until Aug 28, when a trip came due and nothing told her.
  const fieldTrips = useAppStore((s) => s.fieldTrips);
  // Missions are the FOURTH dated thing. A quarterly mission is weighted like
  // an exam and carried no date at all until Aug 29, 2026.
  const missionEvaluations = useAppStore((s) => s.missionEvaluations);
  const assignments = useAppStore((s) => s.assignments);

  const today = todayDateStr();
  const through = toDateStr(addDays(parseDateStr(today), LOOKAHEAD_DAYS));

  // Planner items are included on purpose: from the student's side this
  // is just "what's due soon," and splitting it by which table it lives
  // in would be an implementation detail leaking into his day.
  const items = buildCalendarItems({ assignments, academicAssignments, fieldTrips, missionEvaluations });
  const upcoming = getUpcomingCalendarItems(items, today, through).filter((i) => !i.done);
  const overdue = getOverdueCalendarItems(items, today);

  const reading = orderBooks(academicBooks.filter((b) => b.title && b.status === 'in-progress'));

  /**
   * The single most useful thing this card can say: not "a paper is due in five
   * weeks" — which invites doing nothing — but "here is the step you are on."
   * Long-horizon work only gets done when the next action is visible.
   *
   * activeMilestone, NOT currentMilestone. (Aug 16, 2026.) currentMilestone
   * answers "what is the next unticked step", which has an answer for every
   * assignment in the year — so this list showed three books to read when only
   * one had been started, under a heading that said this week. activeMilestone
   * returns null until the step's window has actually opened.
   */
  const liveSteps = academicAssignments
    .filter((a) => a.title && a.status !== 'completed' && hasMilestones(a.type))
    .map((a) => ({ assignment: a, step: activeMilestone(a, today), progress: milestoneProgress(a) }))
    .filter((x) => x.step)
    .sort((a, b) => a.step.dueDate.localeCompare(b.step.dueDate));
  const thisWeeksSteps = liveSteps.slice(0, 3);

  /**
   * ===========================================================================
   * WORK THAT HAS TO START THIS WEEK, NOT JUST WORK THAT IS DUE. (Aug 26, 2026.)
   * ===========================================================================
   *
   * The parent, holding a card that read "Hatchet — Gary Paulsen · Due Fri, Sep
   * 18": **"Why isn't this mentioned. Does this actually mean to start Sept
   * 18th?"**
   *
   * It was mentioned nowhere, and here is why. This card asks one question —
   * what is DUE in the next seven days — and Sep 18 is twenty-three days out.
   * A Reading Assignment gets no milestones by design (its whole content IS
   * its pacing), so it produced no step row either. Three weeks of reading
   * were scheduled to begin on Aug 28 and his board would first have said a
   * word about it on Sep 11.
   *
   * The start date was never missing. `startByFor` has computed it since Aug
   * 14 — 21 days of lead for a novel — and it reached exactly one screen, the
   * Parent Dashboard's Coming Up list. The person who has to open the book
   * could not see it.
   *
   * A deadline you cannot meet by the time you first hear about it is not a
   * deadline, it is a surprise. So the window now catches BOTH ends: due in
   * the next seven days, or has to be underway in the next seven days.
   *
   * Excluded on purpose:
   *   - anything already due inside the window — it is in the list below.
   *   - anything with an active step — "Working on now" already has it.
   *   - anything started. leadStatus returns 'underway' the moment he marks it
   *     in progress or ticks a step, and telling him to start what he has
   *     started is how a board teaches him to stop reading it.
   */
  const stepIds = new Set(liveSteps.map((x) => x.assignment.id));
  const startingSoon = academicAssignments
    .filter((a) => {
      if (!a.title || !a.dueDate || a.status === 'completed') return false;
      if (stepIds.has(a.id)) return false;
      if (a.dueDate <= through) return false; // already counted as due
      const state = leadStatus(a, today);
      if (state !== 'start-now' && state !== 'behind' && state !== 'not-yet') return false;
      const startBy = startByFor(a);
      return Boolean(startBy) && startBy <= through;
    })
    .map((a) => ({ assignment: a, startBy: startByFor(a), state: leadStatus(a, today) }))
    .sort((x, y) => x.startBy.localeCompare(y.startBy))
    .slice(0, 3);

  /**
   * What Open should land on: the step he is mid-way through, else the next
   * thing due, else the book he is reading. In that order because that is the
   * order of "what am I supposed to be doing right now".
   */
  const primaryStep = thisWeeksSteps[0] || null;
  const primaryDue = overdue[0] || upcoming[0] || null;

  /** The assignment behind a calendar row, when there is one. */
  const assignmentFor = (item) =>
    academicAssignments.find((a) => a.title && item.title && item.title.startsWith(a.title)) || null;

  if (
    reading.length === 0 &&
    upcoming.length === 0 &&
    overdue.length === 0 &&
    liveSteps.length === 0 &&
    startingSoon.length === 0
  )
    return null;

  return (
    <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Academic Center</p>
          <h3 className="mt-1 font-display text-lg font-700 text-ink-100">Reading &amp; Big Assignments</h3>
        </div>
        {onOpenAcademicCenter && (
          <button
            type="button"
            /**
             * Lands on the work he is in the middle of.
             *
             * This was `onClick={onOpenAcademicCenter}` — the handler used
             * directly, so it received a click EVENT, failed the id check and
             * opened the Book Library. Even passing nothing deliberately would
             * be wrong: a card whose whole subject is one live assignment
             * should not open a list of twenty books.
             */
            onClick={() =>
              onOpenAcademicCenter(
                primaryStep
                  ? { kind: 'assignment', id: primaryStep.assignment.id }
                  : primaryDue
                    ? { kind: 'assignment', id: primaryDue.id }
                    : reading[0]
                      ? { kind: 'book', id: reading[0].id }
                      : null
              )
            }
            className="flex-none rounded-lg bg-signal-cyan px-3 py-1.5 text-xs font-display font-700 text-space-950 transition hover:brightness-110"
          >
            Open
          </button>
        )}
      </div>

      {reading.length > 0 && (
        <div className="mt-3">
          <p className="text-[10px] font-display uppercase tracking-widest text-ink-600">
            Currently reading
          </p>
          <div className="mt-1.5 space-y-1.5">
            {reading.map((book) => (
              <button
                key={book.id}
                type="button"
                onClick={() => onOpenAcademicCenter?.({ kind: 'book', id: book.id })}
                className="block w-full rounded-lg border border-space-700 bg-space-900 px-3 py-2 text-left transition hover:border-signal-cyan/50"
              >
                <p className="font-display text-sm font-700 text-ink-100">{book.title}</p>
                <p className="text-xs text-ink-500">
                  {book.author ? `${book.author} · ` : ''}
                  {SUBJECT_LABELS[book.subject] || book.subject}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {thisWeeksSteps.length > 0 && (
        <div className="mt-3">
          <p className="text-[10px] font-display uppercase tracking-widest text-ink-600">
            Working on now
          </p>
          <div className="mt-1.5 space-y-1.5">
            {/**
              * ---- TWO DATES, AND THE ROW SAID WHICH NEITHER WAS ----
              *
              * The parent: **"it has an assignment to build or draw a well
              * that is due Aug 28th but I don't see anything about that. I
              * found the build or draw a well but it states that it is due
              * Sept 18th."**
              *
              * Both dates are real and the data is right. The BOOK REPORT is
              * due Sep 18; step 1 of 4 of it, "Read the book", is due Aug 28.
              *
              * The row printed the PROJECT's title immediately beside the
              * STEP's date — "build or draw Salva's well · step 1 of 4 · by
              * Fri, Aug 28" — with nothing saying which date belonged to
              * which. She read it exactly as written, went looking for a well
              * due on the 28th, and found one due on the 18th.
              *
              * A row carrying two deadlines has to name both of them. It shows
              * the step's date and the project's date, each labelled, and the
              * project title on its own line so it stops touching a date that
              * is not its own.
              */}
            {thisWeeksSteps.map(({ assignment, step, progress }) => (
              <button
                key={assignment.id}
                type="button"
                onClick={() => onOpenAcademicCenter?.({ kind: 'assignment', id: assignment.id })}
                className="block w-full rounded-lg border border-space-700 bg-space-900 px-3 py-2 text-left transition hover:border-signal-cyan/50"
              >
                <p className="font-display text-sm font-700 text-ink-100">{step.label}</p>
                <p className="mt-0.5 text-xs text-ink-400">
                  Step {progress.done + 1} of {progress.total} of{' '}
                  <span className="text-ink-300">{assignment.title}</span>
                </p>
                <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px]">
                  <span className="text-signal-amber">
                    This step by {shortDay(step.dueDate)}
                  </span>
                  {assignment.dueDate && assignment.dueDate !== step.dueDate && (
                    <span className="text-ink-500">
                      · whole project due {shortDay(assignment.dueDate)}
                    </span>
                  )}
                </p>
              </button>
            ))}
            {liveSteps.length > thisWeeksSteps.length && (
              <p className="text-[11px] text-ink-600">
                + {liveSteps.length - thisWeeksSteps.length} more open — see the Academic Center
              </p>
            )}
          </div>
        </div>
      )}

      {startingSoon.length > 0 && (
        <div className="mt-3">
          <p className="text-[10px] font-display uppercase tracking-widest text-ink-600">
            Start this week
          </p>
          <div className="mt-1.5 space-y-1.5">
            {startingSoon.map(({ assignment, startBy, state }) => (
              <button
                key={assignment.id}
                type="button"
                onClick={() => onOpenAcademicCenter?.({ kind: 'assignment', id: assignment.id })}
                className="block w-full rounded-lg border border-space-700 bg-space-900 px-3 py-2 text-left transition hover:border-signal-cyan/50"
              >
                <p className="font-display text-sm font-700 text-ink-100">{assignment.title}</p>
                <p className="text-xs text-ink-400">
                  {assignment.type}
                  {assignment.subject ? ` · ${SUBJECT_LABELS[assignment.subject] || assignment.subject}` : ''}
                </p>
                {/*
                  Both ends, both named. The whole reason this row exists is
                  that one unlabelled date read as a start date, so this row
                  may never print a date without saying which end it is.
                */}
                <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px]">
                  <span className={state === 'not-yet' ? 'text-ink-400' : 'text-signal-amber'}>
                    Start by {shortDay(startBy)}
                  </span>
                  <span className="text-ink-500">· finish by {shortDay(assignment.dueDate)}</span>
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {overdue.length > 0 && (
        <div className="mt-3">
          <p className="text-[10px] font-display uppercase tracking-widest text-signal-red">Past due</p>
          <div className="mt-1.5 space-y-1.5">
            {overdue.map((item) => (
              <DueRow
                key={item.key}
                item={item}
                today={today}
                tone="overdue"
                onOpen={assignmentFor(item) && onOpenAcademicCenter
                  ? () => onOpenAcademicCenter({ kind: 'assignment', id: assignmentFor(item).id })
                  : null}
              />
            ))}
          </div>
        </div>
      )}

      {upcoming.length > 0 && (
        <div className="mt-3">
          <p className="text-[10px] font-display uppercase tracking-widest text-ink-600">
            Due in the next {LOOKAHEAD_DAYS} days
          </p>
          <div className="mt-1.5 space-y-1.5">
            {upcoming.map((item) => (
              <DueRow
                key={item.key}
                item={item}
                today={today}
                tone="upcoming"
                onOpen={assignmentFor(item) && onOpenAcademicCenter
                  ? () => onOpenAcademicCenter({ kind: 'assignment', id: assignmentFor(item).id })
                  : null}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * "Due today" / "Due tomorrow" / "Due Fri" — computed by comparing date
 * strings and stepping forward one day, never by subtracting Date
 * objects (which drags in time-of-day and daylight-saving edge cases for
 * a question that's purely about calendar days).
 */
function dueLabel(dueDate, today) {
  if (dueDate === today) return 'Due today';
  if (dueDate === toDateStr(addDays(parseDateStr(today), 1))) return 'Due tomorrow';
  const when = parseDateStr(dueDate).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
  return dueDate < today ? `Was due ${when}` : `Due ${when}`;
}

/** 'Fri, Aug 28' — one place, so two dates on one row cannot be formatted differently. */
function shortDay(dateStr) {
  return parseDateStr(dateStr).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
}

function DueRow({ item, today, tone, onOpen = null }) {
  const Tag = onOpen ? 'button' : 'div';
  return (
    <Tag
      type={onOpen ? 'button' : undefined}
      onClick={onOpen || undefined}
      className={
        'flex w-full items-center justify-between gap-3 rounded-lg border border-space-700 bg-space-900 px-3 py-2 text-left '
        + (onOpen ? 'transition hover:border-signal-cyan/50' : '')
      }
    >
      <div className="min-w-0">
        <p className="truncate font-display text-sm font-700 text-ink-100">{item.title}</p>
        <p className="text-xs text-ink-500">
          {item.typeLabel}
          {item.subject ? ` · ${SUBJECT_LABELS[item.subject] || item.subject}` : ''}
        </p>
      </div>
      <span
        className={
          'flex-none text-xs font-display font-600 ' +
          (tone === 'overdue' ? 'text-signal-red' : item.dueDate === today ? 'text-signal-amber' : 'text-ink-500')
        }
      >
        {dueLabel(item.dueDate, today)}
      </span>
    </Tag>
  );
}
