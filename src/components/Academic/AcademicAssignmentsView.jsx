import { useState, useEffect, useRef } from 'react';
import { AssignmentWriter } from './AssignmentWriter.jsx';
import { useAppStore } from '../../store/useAppStore.js';
import { getCurrentQuarter } from '../../lib/schoolQuarter.js';
import {
  milestonesFor,
  hasMilestones,
  milestoneProgress,
  startByFor,
  leadStatus
} from '../../academies/lamar/data/academicSuccessCenter/assignmentMilestones.js';
import { todayDateStr } from '../../lib/scheduler.js';
import {
  findFormat,
  formatsForType,
  reflectionPromptFor,
  sizeFor
} from '../../academies/lamar/data/academicSuccessCenter/reportFormats.js';
import { WritingCheckerLink } from '../Writing/WritingCheckerLink.jsx';
import { orderAssignments } from '../../lib/academicOrder.js';
import {
  ASSIGNMENT_STATUS_LABELS,
  statusBadgeClass,
  subjectHeading,
  orderedSubjects,
  orderedQuarters,
  formatDueDate,
  dueDateStatus
} from './academicUi.js';

/**
 * Assignments — student-facing view of the real, scheduled Academic
 * Success Center work (PROJECT_PLAN.md Part 9's "Book Report Center,"
 * "Research Center," and "Major Academic Projects," at v1 scope).
 *
 * Defaults to the CURRENT quarter, the same way the Khan Academy
 * Missions card does, so opening this tab shows what's actually
 * happening now instead of the whole year at once.
 *
 * Placeholder slots (no real title yet) are hidden from the student by
 * default and summarized as a count instead. That's deliberate: an
 * unscheduled slot isn't work he can do, and listing six "TBD" rows as
 * if they were assignments is exactly the false-precision this project
 * avoids. The parent sees and fills them in the Parent Setup tab, and
 * the toggle below reveals them here too.
 */
export function AcademicAssignmentsView({ focusAssignmentId = null }) {
  const academicAssignments = useAppStore((s) => s.academicAssignments);
  const setAcademicAssignmentStatus = useAppStore((s) => s.setAcademicAssignmentStatus);
  const toggleAssignmentMilestone = useAppStore((s) => s.toggleAssignmentMilestone);
  const saveAssignmentReflection = useAppStore((s) => s.saveAssignmentReflection);
  const saveAssignmentWriting = useAppStore((s) => s.saveAssignmentWriting);

  const currentQuarter = getCurrentQuarter().batchLabel;
  const quarters = orderedQuarters(academicAssignments);
  const [quarter, setQuarter] = useState(
    quarters.includes(currentQuarter) ? currentQuarter : quarters[0] || currentQuarter
  );
  const [showUnscheduled, setShowUnscheduled] = useState(false);

  const inQuarter = academicAssignments.filter((a) => a.quarter === quarter);
  const scheduled = inQuarter.filter((a) => a.status !== 'placeholder');
  const unscheduledCount = inQuarter.length - scheduled.length;
  const visible = showUnscheduled ? inQuarter : scheduled;
  const subjects = orderedSubjects(visible);

  const completed = scheduled.filter((a) => a.status === 'completed').length;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Assignments</p>
        <h3 className="mt-1 font-display text-lg font-700 text-ink-100">
          Book Reports, Research Papers, Presentations &amp; Projects
        </h3>
        <p className="mt-2 text-sm text-ink-300">
          {scheduled.length === 0
            ? 'Nothing scheduled for this quarter yet. Slots are waiting in the Parent Setup tab.'
            : `${completed} of ${scheduled.length} scheduled ${scheduled.length === 1 ? 'assignment' : 'assignments'} completed this quarter.`}
        </p>

        <div className="mt-3 flex flex-wrap gap-1 rounded-lg bg-space-900 p-1">
          {quarters.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => setQuarter(q)}
              className={
                'rounded-md px-2.5 py-1 text-xs font-display font-600 transition-colors ' +
                (quarter === q ? 'bg-signal-cyan/15 text-signal-cyan' : 'text-ink-500 hover:text-ink-100')
              }
            >
              {q}
              {q === currentQuarter ? ' • now' : ''}
            </button>
          ))}
        </div>

        {unscheduledCount > 0 && (
          <button
            type="button"
            onClick={() => setShowUnscheduled((v) => !v)}
            className="mt-3 text-xs font-display font-600 text-ink-500 hover:text-ink-100"
          >
            {showUnscheduled ? 'Hide' : 'Show'} {unscheduledCount} unscheduled{' '}
            {unscheduledCount === 1 ? 'slot' : 'slots'}
          </button>
        )}
      </div>

      {visible.length === 0 && (
        <p className="text-sm text-ink-500">Nothing to show for {quarter}.</p>
      )}

      {subjects.map((subject) => {
        const rows = orderAssignments(visible.filter((a) => a.subject === subject));
        return (
          <div key={subject} className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
            <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">
              {subjectHeading(subject)}
            </p>
            <div className="mt-3 space-y-2">
              {rows.map((assignment) => (
                <AssignmentRow
                  key={assignment.id}
                  assignment={assignment}
                  focused={focusAssignmentId != null && assignment.id === focusAssignmentId}
                  onSetStatus={setAcademicAssignmentStatus}
                  onToggleMilestone={toggleAssignmentMilestone}
                  onSaveReflection={saveAssignmentReflection}
                  onSaveWriting={saveAssignmentWriting}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const STATUS_ACTIONS = [
  { status: 'not-started', label: 'Not started' },
  { status: 'in-progress', label: 'In progress' },
  { status: 'completed', label: 'Completed' }
];

const DUE_CLASSES = {
  overdue: 'text-signal-red',
  today: 'text-signal-amber',
  upcoming: 'text-ink-500'
};

/**
 * The start-by half of the pair. Amber once the start date has arrived or
 * passed and nothing has been started — the same state the Parent Dashboard
 * calls out, finally visible to the person who has to do the work.
 */
const START_CLASSES = {
  'not-yet': 'text-ink-500',
  'start-now': 'text-signal-amber',
  behind: 'text-signal-amber'
};

function AssignmentRow({ assignment, focused = false, onSetStatus, onToggleMilestone, onSaveReflection, onSaveWriting }) {
  /**
   * Scroll the assignment he was sent here for into view, and ring it.
   *
   * Opening the right TAB is not enough on a screen that can hold twenty rows
   * across six subjects — he would still be scanning for the title he had just
   * tapped. `block: 'center'` rather than 'start' so the row does not land
   * under the sticky header.
   */
  const rowRef = useRef(null);
  useEffect(() => {
    if (focused && rowRef.current) {
      rowRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [focused]);

  const isReal = Boolean(assignment.title);
  const steps = isReal && hasMilestones(assignment.type) ? milestonesFor(assignment) : [];
  const progress = milestoneProgress(assignment);
  const format = isReal ? findFormat(assignment.type, assignment.format) : null;
  const size = sizeFor(format);
  // A type that HAS formats but hasn't had one picked yet is worth
  // saying out loud — otherwise he just sees a vaguer assignment and
  // has no idea a format was meant to be chosen.
  const formatPending = isReal && !format && formatsForType(assignment.type).length > 0;
  const due = formatDueDate(assignment.dueDate);
  // Overdue/today styling only matters for work that isn't finished —
  // a completed assignment turned in late shouldn't keep shouting red.
  const dueState = assignment.status === 'completed' ? 'upcoming' : dueDateStatus(assignment.dueDate);

  /**
   * When it has to be UNDERWAY — see the comment on the date line below.
   *
   * Shown only while it has not been started: 'underway' and 'done' mean the
   * question is already answered, and a start-by date on work he is in the
   * middle of is nagging, not information.
   */
  const startState = isReal ? leadStatus(assignment, todayDateStr()) : null;
  const rawStartBy = isReal ? startByFor(assignment) : null;
  const startBy =
    rawStartBy && rawStartBy !== assignment.dueDate && (startState === 'not-yet' || startState === 'start-now' || startState === 'behind')
      ? rawStartBy
      : null;

  return (
    <div
      ref={rowRef}
      className={
        'rounded-lg border px-3 py-3 transition ' +
        (focused
          ? 'border-signal-cyan bg-signal-cyan/5 shadow-glow'
          : 'border-space-700 bg-space-900')
      }
    >
      {focused && (
        <p className="mb-2 text-[10px] font-display uppercase tracking-widest text-signal-cyan">
          Sent here from your board
        </p>
      )}
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-ink-600/40 bg-ink-900/20 px-2 py-0.5 text-[10px] font-display uppercase tracking-widest text-ink-500">
              {assignment.type}
            </span>
            <span
              className={
                'rounded-full border px-2 py-0.5 text-[10px] font-display uppercase tracking-widest ' +
                statusBadgeClass(assignment.status)
              }
            >
              {ASSIGNMENT_STATUS_LABELS[assignment.status] || assignment.status}
            </span>
            {assignment.grade && (
              <span className="rounded-full border border-signal-cyan/40 bg-signal-cyan/10 px-2 py-0.5 text-[10px] font-display uppercase tracking-widest text-signal-cyan">
                Grade {assignment.grade}
              </span>
            )}
          </div>

          {/*
            Feedback from his mom, shown to HIM. The grade tells him where
            he landed; this is the half he can act on, so it gets real
            visual weight rather than being tucked in as small print.
          */}
          {assignment.feedback && (
            <div className="mt-2 rounded-lg border border-signal-cyan/30 bg-signal-cyan/5 px-3 py-2">
              <p className="text-[10px] font-display uppercase tracking-widest text-signal-cyan">
                Feedback from Mom
              </p>
              <p className="mt-1 whitespace-pre-line text-sm text-ink-200">{assignment.feedback}</p>
            </div>
          )}

          {isReal ? (
            <p className="mt-1.5 font-display font-700 text-ink-100">{assignment.title}</p>
          ) : (
            <p className="mt-1.5 text-sm text-ink-500">{assignment.note}</p>
          )}

          {/*
            ---- THE DATE HAD TO SAY WHAT IT WAS THE DATE OF. (Aug 26, 2026.) ----

            The parent, looking at "Hatchet — Gary Paulsen · Due Fri, Sep 18 ·
            Weekly chapter pacing": **"Does this actually mean to start Sept
            18th?"**

            A fair reading of what the row said. It said "Due Sep 18" and
            nothing else, on an assignment whose entire content is three weeks
            of reading — so the one date on the row could plausibly have been
            the day the work begins.

            It is not. The app has known the answer since Aug 14: `startByFor`
            puts a Reading Assignment's lead time at 21 days, which makes
            Hatchet's start date Aug 28 and Sep 18 the day it must be FINISHED.
            That fact was rendered in exactly one place — the Parent Dashboard's
            Coming Up list — and nowhere he can see it.

            So the row names both ends. Same rule the board's step rows got the
            same day: a row carrying two dates has to say which is which.
          */}
          {due && (
            <p className={'mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs'}>
              {startBy && (
                <span className={START_CLASSES[startState] || 'text-ink-500'}>
                  Start by {formatDueDate(startBy)}
                  {startState === 'behind' ? ' — start now' : startState === 'start-now' ? ' — start today' : ''}
                  {' ·'}
                </span>
              )}
              <span className={DUE_CLASSES[dueState] || 'text-ink-500'}>
                {startBy ? 'Finish by' : 'Due'} {due}
                {dueState === 'overdue' ? ' — past due' : dueState === 'today' ? ' — today' : ''}
              </span>
            </p>
          )}
        </div>

        {isReal && (
          <div className="flex flex-none flex-wrap gap-1">
            {STATUS_ACTIONS.map((action) => (
              <button
                key={action.status}
                type="button"
                onClick={() => onSetStatus(assignment.id, action.status)}
                aria-pressed={assignment.status === action.status}
                className={
                  'rounded-md px-2.5 py-1 text-xs font-display font-600 transition-colors ' +
                  (assignment.status === action.status
                    ? 'bg-signal-cyan/15 text-signal-cyan'
                    : 'text-ink-500 hover:text-ink-100')
                }
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {isReal && assignment.note && <p className="mt-2 text-xs text-ink-600">{assignment.note}</p>}

      {formatPending && (
        <p className="mt-2 text-xs text-ink-600">Format not chosen yet — check with your parent before starting.</p>
      )}

      {format && (
        <div className="mt-3 border-t border-space-700 pt-2">
          <p className="text-[10px] font-display uppercase tracking-widest text-signal-cyan">
            {format.name}
          </p>
          <p className="mt-0.5 text-xs text-ink-500">{format.bestFor}</p>

          <p className="mt-2 text-[10px] font-display uppercase tracking-widest text-ink-600">
            Must include — this is your outline
          </p>
          <ul className="mt-1 space-y-0.5">
            {format.sections.map((section) => (
              <li key={section} className="text-xs text-ink-300">• {section}</li>
            ))}
          </ul>

          {/*
            ---- HOW LONG. (Aug 26, 2026.) ----

            The parent: **"when it states 1 paragraph a day. There should be an
            amt of paragraphs that is needed."**

            The outline above says what must be IN it and never said how much of
            it there should be. "One paragraph a day" with no total is a
            treadmill with no off switch — he can follow it exactly and have no
            idea whether he is a fifth of the way in or done.
          */}
          {size && (
            <>
              <p className="mt-2 text-[10px] font-display uppercase tracking-widest text-ink-600">
                How long
              </p>
              <p className="mt-1 text-xs font-display font-700 text-ink-200">{size.headline}</p>
              <p className="mt-0.5 text-xs text-ink-500">{size.pace}</p>
            </>
          )}

          {/* The checklist used to be printed here as static bullets. It moved
              into "Write it here" -> Edit & finish, where he can actually work
              through it. Printing it in both places would be the same list
              twice on one card, and he would tick neither. */}

          {/* Only on written formats — a poster or a spoken presentation
              has nothing for a sentence checker to read. */}
          {format.rubricKind === 'written' && (
            <div className="mt-2">
              {/* The citation generator only on research papers — they are the
                  only assignments whose checklist demands a source list. */}
              <WritingCheckerLink compact citations={assignment.type === 'Research Paper'} />
            </div>
          )}
        </div>
      )}

      {/* WHERE HE WRITES IT. Only on real assignments — an empty placeholder
          slot has no format, no milestones and nothing to write yet. */}
      {isReal && steps.length > 0 && (
        <AssignmentWriter
          assignment={assignment}
          format={format}
          steps={steps}
          onSave={onSaveWriting}
        />
      )}

      {isReal && assignment.status === 'completed' && (
        <ReflectionBox assignment={assignment} onSave={onSaveReflection} />
      )}

      {steps.length > 0 && (
        <div className="mt-3 border-t border-space-700 pt-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[10px] font-display uppercase tracking-widest text-ink-600">
              One step a week — {progress.done} of {progress.total} done
            </p>
            {assignment.status !== 'completed' && progress.done < progress.total && (
              <p className="text-[10px] font-display uppercase tracking-widest text-signal-cyan">
                Next: {steps.find((m) => !m.completedAt)?.label}
              </p>
            )}
          </div>
          <div className="mt-2 space-y-1.5">
            {steps.map((step) => (
              <MilestoneRow
                key={step.id}
                step={step}
                onToggle={() => onToggleMilestone(assignment.id, step.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * One question after finishing. Ungraded on purpose, and skippable —
 * a reflection that gets scored stops being honest.
 */
function ReflectionBox({ assignment, onSave }) {
  const [text, setText] = useState(assignment.reflection || '');
  const [saved, setSaved] = useState(false);
  const dirty = text !== (assignment.reflection || '');

  const handleSave = async () => {
    await onSave(assignment.id, text);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="mt-3 border-t border-space-700 pt-2">
      <p className="text-[10px] font-display uppercase tracking-widest text-ink-600">
        Reflection — not graded
      </p>
      <p className="mt-1 text-sm text-ink-300">{reflectionPromptFor(assignment.type)}</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={2}
        placeholder="A sentence or two is plenty."
        className="mt-2 w-full resize-none rounded-lg border border-space-600 bg-space-950 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500 focus:border-signal-cyan focus:outline-none"
      />
      <div className="mt-1.5 flex items-center gap-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={!dirty}
          className="rounded-lg bg-signal-cyan px-3 py-1 text-xs font-display font-700 text-space-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Save
        </button>
        {saved && <span className="text-xs text-signal-cyan">Saved</span>}
        {assignment.reflectedAt && !dirty && <span className="text-xs text-ink-600">Written</span>}
      </div>
    </div>
  );
}

/**
 * One weekly step. A checkbox rather than a status picker on purpose —
 * the whole point of breaking a paper into weeks is that each week's
 * question is just "did I do it," not another decision to make.
 */
function MilestoneRow({ step, onToggle }) {
  const done = Boolean(step.completedAt);
  const overdue = !done && dueDateStatus(step.dueDate) === 'overdue';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={done}
      className={
        'flex w-full items-start gap-2.5 rounded-lg border px-3 py-2 text-left transition-colors ' +
        (done ? 'border-signal-cyan/40 bg-signal-cyan/5' : 'border-space-700 bg-space-900 hover:border-space-600')
      }
    >
      <span
        aria-hidden="true"
        className={
          'mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded border text-[10px] font-700 ' +
          (done ? 'border-signal-cyan bg-signal-cyan text-space-950' : 'border-space-600 text-transparent')
        }
      >
        ✓
      </span>
      <span className="min-w-0">
        <span className={'block font-display text-sm font-600 ' + (done ? 'text-ink-500 line-through' : 'text-ink-100')}>
          {step.label}
        </span>
        <span className="mt-0.5 block text-xs text-ink-500">{step.detail}</span>
        <span className={'mt-0.5 block text-[10px] ' + (overdue ? 'text-signal-red' : 'text-ink-600')}>
          By {formatDueDate(step.dueDate)}
          {overdue ? ' — behind' : ''}
        </span>
      </span>
    </button>
  );
}
