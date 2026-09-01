import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { formatDueDate } from './academicUi.js';
import { academyContent } from '../../content/academyContent.js';

const { assignmentCandidatesForSlot = () => null, nextAssignmentRecommendation = () => null, resolveSuggestedDueDate = () => null } = academyContent().academicCenter;

/**
 * A proposed assignment topic, awaiting a yes or no.
 *
 * The parent's stated preference: "I don't want to set up any
 * assignments. I want the option to but I prefer not to. I will like AI
 * to do so and I can just accept it or not." So the default path here is
 * one tap, with the due date already filled in — accepting must not turn
 * into "great, now pick a date."
 *
 * Every topic points at a real lesson in this app's own curriculum, and
 * Reading Assignment topics are generated from the book actually
 * approved for that subject. Nothing proposes work against curriculum
 * that doesn't exist.
 */
export function PendingAssignmentSuggestion({ assignment, booksForSubject }) {
  const approveAssignmentRecommendation = useAppStore((s) => s.approveAssignmentRecommendation);
  const rejectAssignmentRecommendation = useAppStore((s) => s.rejectAssignmentRecommendation);
  const resetAssignmentRecommendations = useAppStore((s) => s.resetAssignmentRecommendations);

  const suggestion = nextAssignmentRecommendation(assignment, booksForSubject);
  const rejectedCount = (assignment.rejectedRecommendationIds || []).length;

  if (!suggestion) {
    // Reading Assignments have nothing to propose until a book exists —
    // say that plainly rather than showing an empty box.
    if (assignment.type === 'Reading Assignment' && !assignment.title && rejectedCount === 0) {
      return (
        <div className="mb-2 rounded-lg border border-space-700 bg-space-900 px-3 py-2">
          <p className="text-xs text-ink-500">
            No reading topic to suggest yet — approve a book for this subject on the Books tab and one
            appears here automatically.
          </p>
        </div>
      );
    }
    if (rejectedCount === 0) return null;
    return (
      <div className="mb-2 rounded-lg border border-space-700 bg-space-900 px-3 py-2">
        <p className="text-xs text-ink-500">
          You've passed on all the suggestions for this one. Write your own below, or{' '}
          <button
            type="button"
            onClick={() => resetAssignmentRecommendations(assignment.id)}
            className="text-signal-cyan underline hover:brightness-110"
          >
            see them again
          </button>
          .
        </p>
      </div>
    );
  }

  const total = suggestion.generated ? 1 : assignmentCandidatesForSlot(assignment.slotId).length;
  const remaining = total - rejectedCount;
  const suggestedDue = resolveSuggestedDueDate(assignment.quarter, suggestion.dueHint);

  return (
    <div className="mb-2 rounded-lg border border-signal-cyan/40 bg-signal-cyan/5 px-3 py-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[10px] font-display uppercase tracking-widest text-signal-cyan">Suggested assignment</p>
        {remaining > 1 && (
          <p className="text-[10px] font-display uppercase tracking-widest text-ink-600">
            {remaining} option{remaining === 1 ? '' : 's'} left
          </p>
        )}
      </div>

      <p className="mt-1.5 font-display text-base font-700 text-ink-100">{suggestion.title}</p>
      <p className="mt-1 text-sm text-ink-300">{suggestion.about}</p>
      <p className="mt-1 text-xs text-ink-500">
        <span className="font-display uppercase tracking-widest text-ink-600">Why now — </span>
        {suggestion.why}
      </p>
      {suggestedDue && (
        <p className="mt-1 text-xs text-ink-500">
          <span className="font-display uppercase tracking-widest text-ink-600">Suggested due — </span>
          {formatDueDate(suggestedDue)} (change it any time)
        </p>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => approveAssignmentRecommendation(assignment.id, suggestion, suggestedDue)}
          className="rounded-lg bg-signal-cyan px-3 py-1.5 text-xs font-display font-700 text-space-950 transition hover:brightness-110"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => rejectAssignmentRecommendation(assignment.id, suggestion.id)}
          className="rounded-lg border border-space-600 px-3 py-1.5 text-xs font-display font-600 text-ink-300 transition hover:text-ink-100"
        >
          {remaining > 1 ? 'Not this one — show another' : 'Skip this one'}
        </button>
      </div>
    </div>
  );
}

/**
 * "Accept everything" — the button that matches what the parent actually
 * asked for. Collects every pending suggestion in the quarter currently
 * on screen and approves them in one go, due dates included.
 *
 * Scoped to the visible quarter on purpose: approving the entire school
 * year in one click would schedule work against lessons that are months
 * away, and she'd have no realistic way to review what she just agreed
 * to. A quarter is a reviewable amount.
 */
export function AcceptAllAssignments({ assignments, booksBySubject, quarter }) {
  const approveAll = useAppStore((s) => s.approveAllAssignmentRecommendations);
  const resetQuarter = useAppStore((s) => s.resetAcademicAssignmentsForQuarter);
  const [undoResult, setUndoResult] = useState(null);

  // Accepted-but-not-started work is what an undo can safely take back.
  const undoable = assignments.filter(
    (a) => a.slotId && !a.isCustom && a.title && (a.status === 'not-started' || a.status === 'placeholder')
  );

  const handleUndo = async () => {
    const result = await resetQuarter(quarter);
    setUndoResult(result);
  };

  const pending = assignments
    .map((a) => {
      const rec = nextAssignmentRecommendation(a, booksBySubject[a.subject] || []);
      if (!rec) return null;
      return {
        assignmentId: a.id,
        recommendation: rec,
        suggestedDueDate: resolveSuggestedDueDate(a.quarter, rec.dueHint)
      };
    })
    .filter(Boolean);

  // Nothing left to accept, but things to take back — show the undo on
  // its own. This is the state right after tapping Accept all.
  if (pending.length === 0) {
    if (undoable.length === 0 && !undoResult) return null;
    return (
      <div className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-ink-500">{quarter}</p>
        {undoResult ? (
          <UndoResult result={undoResult} />
        ) : (
          <>
            <p className="mt-1 text-sm text-ink-300">
              {undoable.length} accepted {undoable.length === 1 ? 'assignment' : 'assignments'} for this quarter,
              none started yet. Changed your mind, or just wanted to see where they'd land?
            </p>
            <button
              type="button"
              onClick={handleUndo}
              className="mt-3 rounded-lg border border-space-600 px-4 py-2 font-display text-sm font-600 text-ink-300 transition hover:text-ink-100"
            >
              Undo — unschedule all {undoable.length} for {quarter}
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-signal-cyan/40 bg-signal-cyan/5 p-4 shadow-panel">
      <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Assignments Waiting on You</p>
      <p className="mt-1 text-sm text-ink-300">
        {pending.length} suggested {pending.length === 1 ? 'assignment' : 'assignments'} for {quarter}, each with a
        topic tied to a real lesson and a due date already set. Accept them all and you're done — you can still
        change or clear any one of them afterward.
      </p>
      <button
        type="button"
        onClick={() => approveAll(pending)}
        className="mt-3 rounded-lg bg-signal-cyan px-4 py-2 font-display text-sm font-700 text-space-950 transition hover:brightness-110"
      >
        Accept all {pending.length} for {quarter}
      </button>

      {undoResult ? (
        <UndoResult result={undoResult} />
      ) : (
        undoable.length > 0 && (
          <button
            type="button"
            onClick={handleUndo}
            className="ml-2 mt-3 rounded-lg border border-space-600 px-4 py-2 font-display text-sm font-600 text-ink-300 transition hover:text-ink-100"
          >
            Undo the {undoable.length} already accepted
          </button>
        )
      )}
    </div>
  );
}

/**
 * Reports exactly what the undo did. If anything was skipped because
 * work had already started on it, say so — an undo that quietly does
 * less than the button promised is worse than one that explains itself.
 */
function UndoResult({ result }) {
  return (
    <p className="mt-3 text-sm text-ink-300">
      Unscheduled {result.reset} {result.reset === 1 ? 'assignment' : 'assignments'} — their suggestions are back.
      {result.skipped > 0 && (
        <span className="text-signal-amber">
          {' '}
          {result.skipped} left alone because {result.skipped === 1 ? 'it was' : 'they were'} already in progress or
          finished — clear {result.skipped === 1 ? 'it' : 'those'} by hand if you really want to.
        </span>
      )}
    </p>
  );
}
