import { getNextRank, getProgressToNextRank } from '../../lib/ranks.js';
import { useAppStore } from '../../store/useAppStore.js';
import { rocketColorFor } from '../../lib/rewards.js';

const TRACK_WIDTH = 640;
const TRACK_HEIGHT = 90;
const TICK_COUNT = 10;

/**
 * ---- THE SKIN NOW COLOURS THE ROCKET, NOT ONE PATH OF IT (Aug 25, 2026) ----
 *
 * The parent: **"the rocket skin all look the same in the store."** They did in
 * the store, and they very nearly did here too.
 *
 * `rocketColor` was applied to the body tube and nothing else — the fins stayed
 * hardcoded amber, the window cyan, the flame red — so a 275-coin skin changed
 * one shape inside a rocket made of five. The fins take the skin now, shaded so
 * they still read as a separate surface. The flame stays red and the window
 * stays on the accent on purpose: one is fire and the other is the theme.
 */
export function RocketProgressMeter({ xp, totalMastered, currentRank }) {
  // Rocket-skin cosmetic (Part 5): the equipped rocket recolors the body.
  const equippedRocket = useAppStore((s) => s.equippedRocket);
  const rocketColor = rocketColorFor(equippedRocket);
  const next = getNextRank(currentRank.tier);
  const progress = getProgressToNextRank(xp, totalMastered, currentRank);
  const usableWidth = TRACK_WIDTH - 48;
  const rocketX = 24 + usableWidth * progress;

  return (
    <div className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-display uppercase tracking-widest text-ink-500">Launch Progress</p>
        <p className="text-xs text-ink-500">
          {next ? `Next: ${next.name}` : 'Top tier reached'}
        </p>
      </div>
      <svg
        viewBox={`0 0 ${TRACK_WIDTH} ${TRACK_HEIGHT}`}
        className="w-full"
        role="img"
        aria-label={`Progress toward next rank: ${Math.round(progress * 100)}%`}
      >
        {/* altitude gauge ticks */}
        {Array.from({ length: TICK_COUNT + 1 }).map((_, i) => {
          const x = 24 + (usableWidth / TICK_COUNT) * i;
          return (
            <line
              key={i}
              x1={x}
              y1={60}
              x2={x}
              y2={i % 5 === 0 ? 72 : 66}
              stroke="#2A3752"
              strokeWidth="2"
            />
          );
        })}
        {/* track */}
        <line x1="24" y1="60" x2={TRACK_WIDTH - 24} y2="60" stroke="#1C273D" strokeWidth="4" />
        <line
          x1="24"
          y1="60"
          x2={rocketX}
          y2="60"
          stroke="url(#trackGradient)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="trackGradient" x1="0" x2="1">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#F5A524" />
          </linearGradient>
        </defs>
        {/* launch pad */}
        <rect x="14" y="60" width="20" height="6" rx="2" fill="#2A3752" />
        {/* destination marker */}
        <circle cx={TRACK_WIDTH - 24} cy="60" r="5" fill="#34D399" />
        {/* rocket */}
        <g transform={`translate(${rocketX}, 60) rotate(90)`}>
          <path
            d="M0 -16 C6 -10 6 4 6 10 L6 16 L-6 16 L-6 10 C-6 4 -6 -10 0 -16 Z"
            fill={rocketColor}
          />
          <path d="M-6 8 L-14 18 L-6 16 Z" fill={rocketColor} opacity="0.72" />
          <path d="M6 8 L14 18 L6 16 Z" fill={rocketColor} opacity="0.72" />
          <circle cx="0" cy="-2" r="2.5" fill="#0B1120" opacity="0.55" />
          <path d="M-4 16 L0 26 L4 16 Z" fill="#F0555A">
            <animate attributeName="d" values="M-4 16 L0 24 L4 16 Z;M-4 16 L0 30 L4 16 Z;M-4 16 L0 24 L4 16 Z" dur="0.6s" repeatCount="indefinite" />
          </path>
        </g>
      </svg>
      <p className="mt-1 text-center text-xs text-ink-500">{Math.round(progress * 100)}% to next rank</p>
    </div>
  );
}
