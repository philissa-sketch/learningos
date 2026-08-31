import { useMemo } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { getDailyMissions, evaluateDaily } from '../../lib/challenges.js';

// ---------------------------------------------------------------------------
// TODAY'S MISSION — three small tasks, drawn from work already on his schedule.
// (Part 10 challenges, built Aug 8, 2026.)
//
// The point is NOT to add anything to his day. It names three things he was
// going to do anyway, puts them in one place, and lets him finish them. A daily
// mission that asks for extra work is just more homework wearing a badge.
//
// The missions are DATE-SEEDED in lib/challenges.js, so the same day always
// produces the same three. That is not a detail: a mission that reshuffles on
// re-render is one he can never finish, because the goalposts move while he is
// walking toward them.
// ---------------------------------------------------------------------------

function TaskRow({ task }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className={
          'flex h-5 w-5 flex-none items-center justify-center rounded-full border text-[11px] ' +
          (task.done
            ? 'border-signal-green/60 bg-signal-green/20 text-signal-green'
            : 'border-space-600 bg-space-950 text-ink-600')
        }
      >
        {task.done ? '✓' : ''}
      </span>
      <span className="text-sm">{task.icon}</span>
      <span className={'flex-1 text-sm ' + (task.done ? 'text-ink-500 line-through' : 'text-ink-200')}>
        {task.label}
      </span>
      {task.need > 1 && !task.done && (
        <span className="flex-none text-[11px] tabular-nums text-ink-500">
          {task.current}/{task.need}
        </span>
      )}
    </div>
  );
}

export function DailyMissionCard() {
  const getPeriodCounts = useAppStore((s) => s.getPeriodCounts);

  // Subscribe to every slice getPeriodCounts reads, then memoise. A getter
  // called bare in a render body never re-subscribes, so the card would only
  // refresh by luck — the same staleness class Batch B fixed across the
  // Parent Dashboard.
  const lessonProgress = useAppStore((s) => s.lessonProgress);
  const khanDailyLog = useAppStore((s) => s.khanDailyLog);
  const writingEntries = useAppStore((s) => s.writingEntries);
  const peWorkoutLog = useAppStore((s) => s.peWorkoutLog);
  const peMeals = useAppStore((s) => s.peMeals);
  const readingLog = useAppStore((s) => s.readingLog);
  const gardenLog = useAppStore((s) => s.gardenLog);
  const guitarLog = useAppStore((s) => s.guitarLog);
  const academicAssignments = useAppStore((s) => s.academicAssignments);

  const periods = useMemo(
    () => getPeriodCounts(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getPeriodCounts, lessonProgress, khanDailyLog, writingEntries, peWorkoutLog,
     peMeals, readingLog, gardenLog, guitarLog, academicAssignments]
  );

  // Which optional subjects exist right now. A mission he cannot complete is
  // worse than no mission, so anything gated on a subject with no activity and
  // no log stays out of the pool entirely.
  const active = useMemo(() => {
    const a = [];
    if ((gardenLog || []).length > 0) a.push('garden');
    if ((guitarLog || []).length > 0) a.push('guitar');
    return a;
  }, [gardenLog, guitarLog]);

  const mission = useMemo(
    () => evaluateDaily(getDailyMissions(periods.todayStr, active), periods.today),
    [periods, active]
  );

  const allDone = mission.complete;

  return (
    <div
      className={
        'rounded-xl border p-4 shadow-panel ' +
        (allDone ? 'border-signal-green/50 bg-signal-green/5' : 'border-signal-cyan/40 bg-space-900')
      }
    >
      <div className="flex items-center justify-between gap-2">
        <p className="font-display text-xs uppercase tracking-widest text-signal-cyan">Today&rsquo;s Mission</p>
        <span className="font-display text-xs tabular-nums text-ink-500">
          {mission.doneCount}/{mission.total}
        </span>
      </div>

      <div className="mt-3 space-y-2">
        {mission.tasks.map((t) => (
          <TaskRow key={t.id} task={t} />
        ))}
      </div>

      <div className="mt-3 border-t border-space-700 pt-2">
        {allDone ? (
          <p className="text-sm font-700 text-signal-green">
            Mission complete — {mission.reward.coin} coins earned. 🪙
          </p>
        ) : (
          <p className="text-[11px] text-ink-500">
            Finish all three for {mission.reward.coin} coins.
          </p>
        )}
      </div>
    </div>
  );
}
