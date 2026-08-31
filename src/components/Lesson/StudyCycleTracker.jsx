import { useAppStore } from '../../store/useAppStore.js';
import { getStudyCycleStatus, studyCycleKey } from '../../lib/studyCycle.js';
import { useToday } from '../../lib/useToday.js';

const DAY_META = [
  { day: 1, label: 'Day 1', title: 'Study Guide', desc: 'Concept + vocabulary review' },
  { day: 2, label: 'Day 2', title: 'Term Blitz — Round 1', desc: 'Retrieval practice' },
  { day: 3, label: 'Day 3', title: 'Weak-Spot Drill', desc: 'Targeted practice on your lowest scores' },
  { day: 4, label: 'Day 4', title: 'Term Blitz — Round 2', desc: 'Cumulative retrieval practice' },
  { day: 5, label: 'Day 5', title: 'Quarterly Exam', desc: 'You’re spaced and ready' }
];

/**
 * The 5-Day Study Cycle tracker (PROJECT_PLAN.md Part 4 — real spaced-
 * retrieval prep for a Quarterly Exam, see src/lib/studyCycle.js for the
 * full design). SOFT gate only: shown once the exam is unlocked
 * (all quarter lessons mastered), purely informational, never blocks
 * anything — the exam card right below it stays clickable regardless of
 * where the student is in this cycle.
 */
export function StudyCycleTracker({ subject, quarter, onOpenStudyGuide, onOpenReviewGame, onOpenWeakSpotDrill }) {
  const studyCycles = useAppStore((s) => s.studyCycles);
  const cycleRow = studyCycles[studyCycleKey(subject, quarter)];
  const today = useToday();
  const status = getStudyCycleStatus(cycleRow, today);

  const actionFor = {
    1: onOpenStudyGuide ? () => onOpenStudyGuide(subject, quarter) : null,
    2: onOpenReviewGame ? () => onOpenReviewGame(subject, quarter) : null,
    3: onOpenWeakSpotDrill ? () => onOpenWeakSpotDrill(subject, quarter) : null,
    4: onOpenReviewGame ? () => onOpenReviewGame(subject, quarter) : null,
    5: null
  };

  return (
    <div className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
      <p className="text-xs font-display uppercase tracking-widest text-ink-500">
        5-Day Study Cycle — {quarter}
      </p>
      <p className="mt-1 text-xs text-ink-500">
        Real spaced-retrieval prep, not required to take the exam. Each day unlocks a real calendar day after the
        one before it.
      </p>
      <ol className="mt-3 space-y-2">
        {DAY_META.map(({ day, label, title, desc }) => {
          const dayStatus = status[`day${day}`];
          const action = actionFor[day];
          const isClickable = day < 5 && dayStatus.available && action;
          return (
            <li
              key={day}
              className={
                'flex items-center justify-between rounded-lg border px-3 py-2 text-sm ' +
                (dayStatus.done
                  ? 'border-signal-green/40 bg-signal-green/5'
                  : dayStatus.available
                    ? 'border-signal-cyan/40 bg-signal-cyan/5'
                    : 'border-space-700 bg-space-900')
              }
            >
              <div>
                <p className="font-display text-xs uppercase tracking-widest text-ink-500">{label}</p>
                <p className="font-display font-700 text-ink-100">{title}</p>
                <p className="text-xs text-ink-500">{desc}</p>
              </div>
              {dayStatus.done ? (
                <span className="rounded-full border border-signal-green/40 bg-signal-green/10 px-2 py-1 text-xs font-display text-signal-green">
                  Done
                </span>
              ) : isClickable ? (
                <button
                  type="button"
                  onClick={action}
                  className="rounded-lg bg-signal-cyan px-3 py-1.5 text-xs font-display font-700 text-space-950 transition hover:brightness-110"
                >
                  Start
                </button>
              ) : day === 5 && dayStatus.available ? (
                <span className="rounded-full border border-signal-amber/40 bg-signal-amber/10 px-2 py-1 text-xs font-display text-signal-amber">
                  Ready
                </span>
              ) : (
                <span className="rounded-lg bg-space-700 px-3 py-1.5 text-xs font-display text-ink-500">Not Yet</span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
