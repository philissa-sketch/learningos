export function StreakCounter({ streak }) {
  return (
    <div className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
      <p className="text-xs font-display uppercase tracking-widest text-ink-500">Mission Streak</p>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="telemetry text-3xl font-700 text-signal-amber">{streak}</span>
        <span className="text-sm text-ink-300">{streak === 1 ? 'day' : 'days'}</span>
      </div>
      <p className="mt-1 text-xs text-ink-500">
        {streak > 0 ? 'Show up tomorrow to keep it climbing.' : 'Complete a mission today to start your streak.'}
      </p>
    </div>
  );
}
