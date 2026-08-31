import { getNextRank } from '../../lib/ranks.js';

/**
 * TOTAL XP, AND THE HONEST DISTANCE TO THE NEXT RANK.
 *
 * ---- WHAT THIS CARD USED TO SAY (fixed Aug 13, 2026) ----
 *
 * The parent sent a screenshot of it:
 *
 *     TOTAL XP        1085 / 500
 *     [bar completely full]
 *     0 XP to Flight Cadet
 *
 * ...sitting directly above a rank badge reading "Junior Engineer — Tier 1 of
 * 8", and about fifteen pixels below a rocket meter reading "19% to next rank".
 * Three cards, one screen, three different answers.
 *
 * Nothing was miscalculated. Advancement is a DUAL gate — XP *and* lessons
 * mastered (ranks.js) — and this component only ever received `xp`. So:
 *
 *   - the denominator was the next tier's XP alone (500)
 *   - the bar was Math.min(100, 217) — clamped, so overflow was invisible
 *   - "0 XP to Flight Cadet" came from `next.minXp - xp > 0 ? ... : 0`, a
 *     ternary flooring -585 at zero
 *
 * Every one of those statements was TRUE. He really did need 0 more XP. And
 * together they told a twelve-year-old he had arrived somewhere he had not,
 * with no hint of the 26 lessons actually standing between him and it.
 *
 * That is the failure mode worth naming: a widget that renders one axis of a
 * two-axis system does not look broken. It looks finished. The clamp and the
 * floor — both defensive, both individually correct — are what turned a
 * missing input into a confident wrong answer.
 *
 * So this card now takes `totalMastered` and shows whichever gate is actually
 * holding him back. It is allowed to say "1085 / 500 · done" for the XP half
 * while the headline number tracks the half that is not done, because that is
 * the true shape of where he is.
 */
export function XPBar({ xp, currentRank, totalMastered = 0 }) {
  const next = getNextRank(currentRank.tier);

  if (!next) {
    return (
      <div className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-ink-500">Total XP</p>
        <div className="mt-2 telemetry text-3xl font-700 text-signal-cyan">{xp}</div>
        <p className="mt-1 text-xs text-ink-500">You&apos;ve reached the top tier.</p>
      </div>
    );
  }

  const xpNeeded = Math.max(0, next.minXp - xp);
  const lessonsNeeded = Math.max(0, next.minMasteredForTier - totalMastered);

  // Each gate as its own fraction of the way from this rank to the next, and
  // the bar shows the SLOWER one — because that is the one he has to move.
  const xpSpan = next.minXp - currentRank.minXp;
  const lessonSpan = next.minMasteredForTier - currentRank.minMasteredForTier;
  const xpPct = xpSpan > 0 ? (xp - currentRank.minXp) / xpSpan : 1;
  const lessonPct = lessonSpan > 0 ? (totalMastered - currentRank.minMasteredForTier) / lessonSpan : 1;
  const pct = Math.max(0, Math.min(100, Math.round(Math.min(xpPct, lessonPct) * 100)));

  const bothDone = xpNeeded === 0 && lessonsNeeded === 0;

  return (
    <div className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
      <div className="flex items-center justify-between">
        <p className="text-xs font-display uppercase tracking-widest text-ink-500">Total XP</p>
        <span className="telemetry text-sm text-ink-300">
          {xp}
          <span className={xpNeeded === 0 ? 'text-signal-green' : 'text-ink-500'}>
            {' / '}
            {next.minXp}
            {xpNeeded === 0 ? ' ✓' : ''}
          </span>
        </span>
      </div>

      <div className="mt-2 telemetry text-3xl font-700 text-signal-cyan">{xp}</div>

      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-space-700">
        <div
          className="h-full rounded-full bg-gradient-to-r from-signal-cyan to-signal-amber transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/**
        * The sentence names the gate that is actually in the way. Saying "0 XP
        * to Flight Cadet" while 26 lessons stood in the way is what sent the
        * parent looking for a bug that was not there.
        */}
      <p className="mt-1 text-xs text-ink-500">
        {bothDone ? (
          <span className="font-display text-signal-green">{next.name} unlocked.</span>
        ) : lessonsNeeded > 0 && xpNeeded > 0 ? (
          <>
            {xpNeeded} XP and {lessonsNeeded} lesson{lessonsNeeded === 1 ? '' : 's'} to {next.name}
          </>
        ) : lessonsNeeded > 0 ? (
          <>
            <span className="text-signal-green">XP done.</span>{' '}
            {lessonsNeeded} more lesson{lessonsNeeded === 1 ? '' : 's'} mastered to {next.name}
          </>
        ) : (
          <>
            <span className="text-signal-green">Lessons done.</span> {xpNeeded} XP to {next.name}
          </>
        )}
      </p>
    </div>
  );
}
