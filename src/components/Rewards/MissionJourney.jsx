import { useMemo } from 'react';
import { getJourney, journeySummary } from '../../lib/journey.js';
import { getShipStatus, shipSummary } from '../../lib/shipSystems.js';
import { useAppStore } from '../../store/useAppStore.js';
import { ShipDiagram } from './ShipDiagram.jsx';

// ---------------------------------------------------------------------------
// THE JOURNEY AND THE SHIP — the two screens for logic that already existed.
// (Part 10 redesign, built Aug 8, 2026.)
//
// `lib/journey.js` and `lib/shipSystems.js` were written and tested but nothing
// rendered them, so neither had ever appeared on screen. This file is only the
// presentation: every number below is read from those two modules, and nothing
// here computes progress or writes state.
//
// WHY THIS REPLACES "TIER 6 OF 8": that phrasing is an abstraction about a
// counter. Distance to Mars is not. The gates underneath are unchanged — this
// changes what advancement MEANS on screen, not how it is earned.
// ---------------------------------------------------------------------------

function Bar({ pct, tone = 'cyan' }) {
  const color =
    tone === 'green' ? 'bg-signal-green' : tone === 'amber' ? 'bg-signal-amber' : 'bg-signal-cyan';
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-space-800">
      <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${Math.round(pct * 100)}%` }} />
    </div>
  );
}

/* ========================================================================
 * THE JOURNEY
 * ===================================================================== */

export function JourneySection({ xp, totalMastered, currentRank }) {
  const journey = useMemo(
    () => getJourney(xp, totalMastered, currentRank),
    [xp, totalMastered, currentRank]
  );
  const summary = journeySummary(journey);

  return (
    <div>
      <div className="mb-4 rounded-xl border border-signal-cyan/40 bg-signal-cyan/5 p-4 shadow-panel">
        <p className="font-display text-xs uppercase tracking-widest text-signal-cyan">Current position</p>
        <p className="mt-1 flex items-center gap-2 font-display text-xl font-700 text-ink-100">
          <span className="text-2xl">{journey.current.icon}</span>
          {journey.current.name}
        </p>
        <p className="mt-1 text-sm text-ink-300">{summary}</p>
        {journey.next && (
          <div className="mt-3">
            <Bar pct={journey.progress} />
            <p className="mt-1 text-[11px] text-ink-500">
              {Math.round(journey.progress * 100)}% of the way to {journey.next.name}
            </p>
          </div>
        )}
      </div>

      <div className="space-y-2">
        {journey.stops.map((stop, i) => {
          const reached = stop.state === 'reached';
          const current = stop.state === 'current';
          return (
            <div
              key={stop.tier}
              className={
                'rounded-xl border p-3 shadow-panel transition-colors ' +
                (current
                  ? 'border-signal-cyan/50 bg-signal-cyan/5'
                  : reached
                    ? 'border-signal-green/40 bg-signal-green/5'
                    : 'border-space-700 bg-space-900')
              }
            >
              <div className="flex items-start gap-3">
                {/* The route line: a stop is a point on a path, not a row in a list. */}
                <div className="flex flex-none flex-col items-center">
                  <div
                    className={
                      'flex h-9 w-9 items-center justify-center rounded-full text-lg ' +
                      (stop.state === 'ahead' ? 'bg-space-800 opacity-40 grayscale' : 'bg-space-950')
                    }
                  >
                    {reached ? '✓' : stop.icon}
                  </div>
                  {i < journey.stops.length - 1 && (
                    <div className={'mt-1 h-6 w-px ' + (reached ? 'bg-signal-green/50' : 'bg-space-700')} />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <p
                      className={
                        'font-display text-sm font-700 ' +
                        (stop.state === 'ahead' ? 'text-ink-600' : 'text-ink-100')
                      }
                    >
                      {stop.name}
                    </p>
                    <span className="text-[10px] uppercase tracking-widest text-ink-600">{stop.system}</span>
                    {current && (
                      <span className="rounded-full border border-signal-cyan/40 bg-signal-cyan/10 px-2 py-0.5 text-[10px] font-700 uppercase tracking-widest text-signal-cyan">
                        You are here
                      </span>
                    )}
                  </div>
                  {stop.rankName && (
                    <p className="text-[11px] text-ink-500">Rank: {stop.rankName}</p>
                  )}
                  <p className={'mt-1 text-xs ' + (stop.state === 'ahead' ? 'text-ink-600' : 'text-ink-300')}>
                    {stop.blurb}
                  </p>
                  {/*
                    The fact is withheld until the stop is reached, on purpose.
                    It gives arriving somewhere a small payload of its own, and
                    the facts are good enough to be worth arriving for.
                  */}
                  {(reached || current) && (
                    <p className="mt-2 rounded-lg border border-space-700 bg-space-950/60 p-2 text-[11px] leading-relaxed text-ink-400">
                      {stop.fact}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ========================================================================
 * THE SHIP
 * ===================================================================== */

export function ShipSection({ stats }) {
  const status = useMemo(() => getShipStatus(stats), [stats]);
  const summary = shipSummary(status);
  // Bought spacecraft parts mount onto the drawing.
  const unlocked = useAppStore((s) => s.unlockedCosmetics);
  const owned = useMemo(() => new Set(unlocked || []), [unlocked]);

  return (
    <div>
      <div className="mb-4 rounded-xl border border-signal-amber/40 bg-signal-amber/5 p-4 shadow-panel">
        <p className="font-display text-xs uppercase tracking-widest text-signal-amber">Vehicle status</p>
        <p className="mt-1 font-display text-xl font-700 text-ink-100">
          {status.overallPercent}% built
        </p>
        <p className="mt-1 text-sm text-ink-300">{summary}</p>
        <div className="mt-3">
          <Bar pct={status.overallPercent / 100} tone={status.flightReady ? 'green' : 'amber'} />
        </div>
      </div>

      <div className="mb-4">
        <ShipDiagram systems={status.systems} owned={owned} />
      </div>

      <p className="mb-3 text-sm text-ink-300">
        Every subject builds a real part of the vehicle. A ship does not fly without all of them.
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {status.systems.map((sys) => (
          <div
            key={sys.id}
            className={
              'rounded-xl border p-3 shadow-panel ' +
              (sys.built ? 'border-signal-green/40 bg-signal-green/5' : 'border-space-700 bg-space-900')
            }
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{sys.icon}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-sm font-700 text-ink-100">{sys.name}</p>
                <p className="text-[11px] text-ink-500">Runs on {sys.subjectLabel}</p>
              </div>
              <span
                className={
                  'flex-none font-display text-sm font-700 ' +
                  (sys.built ? 'text-signal-green' : sys.pct >= 0.5 ? 'text-signal-cyan' : 'text-ink-500')
                }
              >
                {sys.percent}%
              </span>
            </div>

            <div className="mt-2">
              <Bar pct={sys.pct} tone={sys.built ? 'green' : sys.pct >= 0.5 ? 'cyan' : 'amber'} />
            </div>

            <p className="mt-1 text-[10px] uppercase tracking-widest text-ink-600">{sys.status}</p>
            <p className="mt-2 text-xs text-ink-300">{sys.role}</p>
            <p className="mt-1 text-[11px] leading-relaxed text-ink-500">{sys.why}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
