export function RankBadge({ currentRank }) {
  return (
    <div className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
      <p className="text-xs font-display uppercase tracking-widest text-ink-500">Current Rank</p>
      <div className="mt-2 flex items-center gap-3">
        <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-signal-cyan/50 bg-signal-cyan/10">
          <span className="telemetry text-sm font-700 text-signal-cyan">{currentRank.tier}</span>
        </div>
        <div>
          <p className="font-display text-lg font-700 leading-tight text-ink-100">{currentRank.name}</p>
          <p className="text-xs text-ink-500">Tier {currentRank.tier} of 8</p>
        </div>
      </div>
    </div>
  );
}
