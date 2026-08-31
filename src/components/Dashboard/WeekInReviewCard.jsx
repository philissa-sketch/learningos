import { useMemo, useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { STUDENT_NAME } from '../../lib/novaVoice.js';

/**
 * THE FRIDAY DEBRIEF (audit MISSING 3, built Aug 9 2026).
 *
 * ---- THE GAP ----
 *
 * PE has weekly goals. Academics had nothing. There was no moment in the week
 * where he stopped and looked back at it — no week-in-review anywhere in the
 * app. Everything pointed forward: today's mission, the next lesson, what is
 * due. That is the self-regulated-learning piece the platform was missing, and
 * it is the habit that separates a student who is carried through a curriculum
 * from one who runs his own.
 *
 * ---- WHY IT COSTS HIM NOTHING TO DO ----
 *
 * Every figure here is derived from records the app already keeps. No new
 * tracking, no new field to fill in, nothing extra to remember. He opens it,
 * reads it, picks one thing for next week. Ninety seconds.
 *
 * ---- THREE RULES IT IS BUILT AROUND ----
 *
 * 1. ONE thing that slipped, never a list. A debrief that opens with six
 *    failures is a debrief a twelve-year-old learns to close. The store picks
 *    the single item by consequence — genuinely overdue work outranks a missed
 *    practice round.
 * 2. If nothing slipped, it says so. A review that has to find a fault every
 *    week teaches him that finishing was never going to be enough.
 * 3. Next week's focus is a CHOICE, not a target he can fail. Nothing scores
 *    it, nothing chases it. Practising the choice is the point — that is the
 *    skill an engineering degree will actually demand of him.
 */
export function WeekInReviewCard({ alwaysShow = false }) {
  const getWeekInReview = useAppStore((s) => s.getWeekInReview);
  const lessonProgress = useAppStore((s) => s.lessonProgress);
  const academicAssignments = useAppStore((s) => s.academicAssignments);
  const assignments = useAppStore((s) => s.assignments);
  const weeklyWords = useAppStore((s) => s.weeklyWords);
  const peWorkoutLog = useAppStore((s) => s.peWorkoutLog);
  const readingLog = useAppStore((s) => s.readingLog);

  const review = useMemo(
    () => getWeekInReview(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getWeekInReview, lessonProgress, academicAssignments, assignments, weeklyWords, peWorkoutLog, readingLog]
  );

  // Kept in component state on purpose: next week's focus is a thinking
  // exercise, not a commitment the app holds him to. Storing it would turn a
  // choice into a target with a pass/fail, which is the one thing rule 3 says
  // it must never become.
  const [focus, setFocus] = useState(null);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;
  if (!alwaysShow && !review.isReviewDay) return null;

  return (
    <div className="mt-4 rounded-xl border border-signal-cyan/30 bg-signal-cyan/5 p-4 shadow-panel">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Week in review</p>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="text-[11px] text-ink-500 underline hover:text-ink-100"
        >
          Close
        </button>
      </div>
      <h3 className="mt-1 font-display text-lg font-700 text-ink-100">
        {review.quiet ? 'A quiet week' : `Here is your week, ${STUDENT_NAME}`}
      </h3>

      {review.quiet ? (
        <p className="mt-2 text-sm text-ink-300">
          Nothing landed in the records this week. That happens — a week off, a week away, a week
          where it did not click. Monday is a clean start, and nothing you have already earned
          went anywhere.
        </p>
      ) : (
        <>
          <p className="mt-2 text-xs font-display uppercase tracking-widest text-ink-500">What you did</p>
          <ul className="mt-1 space-y-1">
            {review.wins.map((w) => (
              <li key={w.key} className="text-sm text-ink-100">
                <span className="mr-1.5 text-signal-green">✓</span>
                {w.label}
                {w.detail && <span className="block pl-5 text-[11px] text-ink-500">{w.detail}</span>}
              </li>
            ))}
          </ul>
          {review.subjectsTouched >= 4 && (
            <p className="mt-1 text-[11px] text-ink-500">
              {review.subjectsTouched} different areas this week. Breadth is a result too.
            </p>
          )}
        </>
      )}

      <div className="mt-3 border-t border-space-700 pt-3">
        <p className="text-xs font-display uppercase tracking-widest text-ink-500">One thing that slipped</p>
        {review.slipped ? (
          <>
            <p className="mt-1 text-sm text-ink-100">{review.slipped.label}</p>
            {review.slipped.detail && <p className="text-[11px] text-ink-500">{review.slipped.detail}</p>}
            {review.slipped.fix && <p className="mt-1 text-xs text-signal-amber">{review.slipped.fix}</p>}
          </>
        ) : (
          <p className="mt-1 text-sm text-signal-green">
            Nothing. Everything due is in and the daily work is done — that is a finished week.
          </p>
        )}
      </div>

      <div className="mt-3 border-t border-space-700 pt-3">
        <p className="text-xs font-display uppercase tracking-widest text-ink-500">Pick next week's focus</p>
        <p className="text-[11px] text-ink-500">
          Nothing checks up on this. Choosing it is the exercise.
        </p>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {review.focusOptions.map((o) => (
            <button
              key={o.key}
              type="button"
              onClick={() => setFocus(o.key === focus ? null : o.key)}
              className={
                'rounded-full border px-3 py-1 text-xs font-display transition ' +
                (focus === o.key
                  ? 'border-signal-cyan bg-signal-cyan/15 text-signal-cyan'
                  : 'border-space-600 text-ink-300 hover:text-ink-100')
              }
            >
              {o.label}
            </button>
          ))}
        </div>
        {focus && (
          <p className="mt-2 text-sm text-signal-cyan">
            Good. That is Monday's first move — you do not have to decide it again on Monday morning.
          </p>
        )}
      </div>
    </div>
  );
}
