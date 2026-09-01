import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { academyContent } from '../../content/academyContent.js';

const { RUBRIC_LEVELS, criteriaForFormat, findFormat, formatsForType, sizeFor, suggestedGradeFromRubric, wordProgress } = academyContent().academicCenter;

/**
 * Parent-side format picker and rubric (PROJECT_PLAN.md Part 9's Book
 * Report Center and Presentation Center).
 *
 * Two jobs:
 *   1. Pick the FORMAT, so five book reports in a year aren't five
 *      identical reports. The format decides required sections and the
 *      student's checklist.
 *   2. Score the rubric after reading it, which produces a SUGGESTED
 *      letter grade. Suggested, never automatic — she still picks. The
 *      point is to remove the arithmetic and keep the standard steady
 *      from October to May, not to have software decide what a piece of
 *      writing is worth.
 */
export function AssignmentFormatPicker({ assignment }) {
  const setAssignmentFormat = useAppStore((s) => s.setAssignmentFormat);
  const [open, setOpen] = useState(false);

  const options = formatsForType(assignment.type);
  if (options.length === 0 || !assignment.title) return null;

  const chosen = findFormat(assignment.type, assignment.format);

  return (
    <div className="mt-3 border-t border-space-700 pt-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[10px] font-display uppercase tracking-widest text-ink-600">Format</p>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-xs font-display font-600 text-signal-cyan hover:brightness-110"
        >
          {chosen ? 'Change' : `Choose one of ${options.length}`}
        </button>
      </div>

      {chosen ? (
        <div className="mt-1.5">
          <p className="font-display text-sm font-700 text-ink-100">{chosen.name}</p>
          <p className="text-xs text-ink-500">{chosen.bestFor}</p>
        </div>
      ) : (
        <p className="mt-1.5 text-xs text-ink-500">
          No format picked yet — he'll see a generic assignment until you choose one.
        </p>
      )}

      {open && (
        <div className="mt-2 space-y-1.5">
          {options.map((format) => (
            <button
              key={format.id}
              type="button"
              onClick={() => {
                setAssignmentFormat(assignment.id, format.id === assignment.format ? null : format.id);
                setOpen(false);
              }}
              className={
                'block w-full rounded-lg border px-3 py-2 text-left transition-colors ' +
                (format.id === assignment.format
                  ? 'border-signal-cyan/40 bg-signal-cyan/10'
                  : 'border-space-700 bg-space-900 hover:border-space-600')
              }
            >
              <span className="block font-display text-sm font-600 text-ink-100">{format.name}</span>
              <span className="block text-xs text-ink-500">{format.bestFor}</span>
            </button>
          ))}
        </div>
      )}

      {chosen && assignment.status === 'completed' && <RubricScorer assignment={assignment} format={chosen} />}
    </div>
  );
}

/**
 * Shown only once the work is actually completed — a rubric offered
 * before there's anything to read is just clutter.
 */
function RubricScorer({ assignment, format }) {
  const setAssignmentRubricScore = useAppStore((s) => s.setAssignmentRubricScore);
  const gradeAcademicAssignment = useAppStore((s) => s.gradeAcademicAssignment);

  const criteria = criteriaForFormat(format);
  const scores = assignment.rubricScores || {};
  const suggested = suggestedGradeFromRubric(scores, criteria);

  /**
   * ---- SHE WAS GRADING WORK SHE COULD NOT READ. (Aug 26, 2026.) ----
   *
   * Found while answering **"there isn't a location for the edit and finish.
   * Is he to write this in Google Docs?"** — and it would have made that fix
   * hollow. He types the report into the app; this screen asked her to score
   * "Evidence — specific examples from the source" with the text nowhere on it.
   * The only way to grade honestly was to go and find it on his side of the
   * app, which is precisely the trip a rubric is supposed to save.
   *
   * FINAL FIRST, DRAFT ONLY AS A FALLBACK, and it says which it is showing.
   * Grading a rough draft while believing it is the finished copy is a worse
   * failure than not showing it at all.
   */
  const shown = assignment.finalText
    ? { text: assignment.finalText, label: 'His finished copy' }
    : assignment.draftText
      ? { text: assignment.draftText, label: 'His rough draft — he has not saved a finished copy yet' }
      : null;
  const size = sizeFor(format);
  const shownWords = shown?.text?.trim() ? shown.text.trim().split(/\s+/).filter(Boolean).length : 0;
  const progress = wordProgress(size, shownWords);

  return (
    <div className="mt-3 rounded-lg border border-space-700 bg-space-900 px-3 py-3">
      {shown && (
        <div className="mb-3 rounded-lg border border-space-700 bg-space-950 p-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[10px] font-display uppercase tracking-widest text-signal-cyan">
              {shown.label}
            </p>
            <span className="text-[11px] text-ink-500">
              {progress ? progress.label : `${shownWords} words`}
              {size ? ` · target ${size.headline}` : ''}
            </span>
          </div>
          <div className="mt-2 max-h-72 overflow-y-auto whitespace-pre-line text-sm leading-relaxed text-ink-200">
            {shown.text}
          </div>
        </div>
      )}

      <p className="text-[10px] font-display uppercase tracking-widest text-ink-600">
        Rubric — score each, then take the suggested grade or pick your own
      </p>

      <div className="mt-2 space-y-2.5">
        {criteria.map((criterion) => (
          <div key={criterion.id}>
            <p className="font-display text-sm font-600 text-ink-100">{criterion.label}</p>
            <p className="text-xs text-ink-500">{criterion.lookFor}</p>
            <div className="mt-1 flex flex-wrap gap-1">
              {RUBRIC_LEVELS.map((level) => (
                <button
                  key={level.score}
                  type="button"
                  title={level.hint}
                  onClick={() => setAssignmentRubricScore(assignment.id, criterion.id, level.score)}
                  aria-pressed={scores[criterion.id] === level.score}
                  className={
                    'rounded-md px-2.5 py-1 text-xs font-display font-600 transition-colors ' +
                    (scores[criterion.id] === level.score
                      ? 'bg-signal-cyan/15 text-signal-cyan'
                      : 'text-ink-500 hover:text-ink-100')
                  }
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {suggested ? (
        <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-space-700 pt-2">
          <p className="text-xs text-ink-300">
            {suggested.total} of {suggested.max} — suggests{' '}
            <span className="font-display font-700 text-signal-cyan">{suggested.letter}</span>
          </p>
          {assignment.grade !== suggested.letter && (
            <button
              type="button"
              onClick={() => gradeAcademicAssignment(assignment.id, suggested.letter)}
              className="rounded-lg bg-signal-cyan px-3 py-1 text-xs font-display font-700 text-space-950 transition hover:brightness-110"
            >
              Use {suggested.letter}
            </button>
          )}
          <span className="text-xs text-ink-600">Or pick any grade below — this is a suggestion, not a rule.</span>
        </div>
      ) : (
        <p className="mt-3 border-t border-space-700 pt-2 text-xs text-ink-600">
          Score all {criteria.length} to see a suggested grade.
        </p>
      )}
    </div>
  );
}
