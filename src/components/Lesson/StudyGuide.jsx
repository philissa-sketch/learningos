import { getQuarterGlossaryTerms } from '../../lib/glossary.js';
import { SUBJECT_LABELS } from '../../academies/lamar/subjects.js';

/**
 * A standalone, printable review screen for one quarter of a subject's
 * lessons — built to prep a student for that quarter's Quarterly Exam
 * (backward design: study guides exist to serve the exam, not the
 * other way around).
 *
 * Reuses data that already exists on every lesson rather than
 * requiring any new hand-authored content: each lesson's
 * `novaIntro.glossary` (added for the vocabulary-list build) supplies
 * the Key Vocabulary section, and each lesson's `novaIntro.connection`
 * (the existing real-world tie-in text) supplies the lesson-by-lesson
 * recap. This means the same component works for any subject/quarter
 * as soon as that quarter's lessons exist — it isn't hand-built per
 * quarter. `subject` is a real, required prop (not hardcoded to
 * 'aerospace') so this works correctly for every subject with a
 * Quarterly Exam — Social Studies included.
 */
export function StudyGuide({ subject = 'aerospace', quarter, onExit }) {
  const { lessons, terms: sortedTerms } = getQuarterGlossaryTerms(subject, quarter);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
      <div className="print-hide mb-4 flex items-center justify-between">
        <button type="button" onClick={onExit} className="text-sm text-ink-500 underline hover:text-ink-100">
          ← Back to Lessons
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-lg bg-signal-cyan px-3 py-1.5 text-sm font-display font-700 text-space-950 transition hover:brightness-110"
        >
          Print Study Guide
        </button>
      </div>

      <div className="print-content rounded-xl border border-space-700 bg-space-800 p-6 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">{SUBJECT_LABELS[subject] || subject}</p>
        <h2 className="mt-1 font-display text-2xl font-700 text-ink-100">{quarter} Study Guide</h2>
        <p className="mt-2 text-sm text-ink-300">
          Review {lessons.length} lesson{lessons.length === 1 ? '' : 's'} and {sortedTerms.length} key term
          {sortedTerms.length === 1 ? '' : 's'} before the {quarter} Quarterly Exam.
        </p>

        {sortedTerms.length > 0 && (
          <div className="mt-6">
            <h3 className="font-display text-sm font-700 uppercase tracking-wide text-signal-amber">Key Vocabulary</h3>
            <dl className="mt-3 space-y-2">
              {sortedTerms.map(({ term, definition }) => (
                <div key={term} className="border-b border-space-700 pb-2">
                  <dt className="font-display font-700 text-ink-100">{term}</dt>
                  <dd className="text-sm text-ink-300">{definition}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        <div className="mt-6">
          <h3 className="font-display text-sm font-700 uppercase tracking-wide text-signal-amber">Lesson-by-Lesson Review</h3>
          <ol className="mt-3 space-y-4">
            {lessons.map((lesson) => (
              <li key={lesson.id} className="border-b border-space-700 pb-3">
                <p className="font-display font-700 text-ink-100">{lesson.title}</p>
                <p className="text-sm text-ink-300">{lesson.theme}</p>
                {lesson.novaIntro?.connection && (
                  <p className="mt-1 text-xs text-ink-500">{lesson.novaIntro.connection}</p>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
