// ---------------------------------------------------------------------------
// THE JOURNEY — the mission arc as a route through space, not a number.
// (Part 10 redesign, built Aug 8, 2026. Parent-approved: "adopt the redesign".)
//
// WHAT CHANGED AND WHY: the eight ranks already existed and already worked —
// they gate on XP *and* lessons mastered, they never demote, and they are
// re-calibrated against the real curriculum. Nothing about that machinery is
// wrong. What was wrong is what the student saw: "Tier 6 of 8" and a progress
// bar.
//
// "Tier 6 of 8" is an abstraction about a counter. Distance to Mars is not.
// The gates underneath are IDENTICAL — this file changes nothing about how
// advancement is earned, it changes what advancement MEANS on screen. Same
// work, same thresholds, a destination instead of an integer.
//
// DESTINATIONS ARE EARNED, NEVER BOUGHT. The original Part 10 spec listed
// Planet Exploration as a purchasable Marketplace category. That is the one
// place the redesign contradicts it, deliberately: buying Mars is a
// transaction, reaching Mars after five months of work is a moment. Coins buy
// cosmetics. Credits buy real-world rewards. Progress buys nothing — it is the
// thing the money cannot touch, which is precisely what keeps it meaningful.
//
// Each destination carries a REAL fact. Not decoration: it is the difference
// between a themed progress bar and a boy learning where Europa actually is.
// ---------------------------------------------------------------------------

import { RANKS, getCurrentRank, getNextRank, getProgressToNextRank } from './ranks.js';

/**
 * One destination per rank tier, so the route and the ranks can never drift
 * apart — the tier IS the index. Ordered outward from Earth, which also
 * happens to be roughly the order of difficulty in real spaceflight.
 */
export const DESTINATIONS = [
  {
    tier: 1,
    name: 'Launch Pad',
    icon: '🗼',
    system: 'Earth',
    blurb: 'Every mission starts here. Systems check, fundamentals, good habits.',
    fact: 'A Saturn V burned 20 tonnes of fuel per second for the first two and a half minutes — most of a rocket is fuel to lift its own fuel.'
  },
  {
    tier: 2,
    name: 'Low Earth Orbit',
    icon: '🛰️',
    system: 'Earth',
    blurb: 'You are off the ground. Orbit is less about height than about speed.',
    fact: 'Orbit is not "being far from Earth" — it is falling sideways fast enough to keep missing it. The ISS moves about 7.7 km every second.'
  },
  {
    tier: 3,
    name: 'The Moon',
    icon: '🌕',
    system: 'Earth-Moon',
    blurb: 'The first place humans went that was not Earth.',
    fact: 'The Apollo guidance computer had about 4 KB of memory. Your phone has millions of times more. Careful engineering beat raw power.'
  },
  {
    tier: 4,
    name: 'The Asteroid Belt',
    icon: '☄️',
    system: 'Inner System',
    blurb: 'Between Mars and Jupiter. Emptier than the films suggest.',
    fact: 'The belt is so spread out that spacecraft fly through it without aiming to avoid anything. Objects average roughly a million kilometres apart.'
  },
  {
    tier: 5,
    name: 'Mars',
    icon: '🔴',
    system: 'Inner System',
    blurb: 'The one everyone is trying to reach. Landing is the hard part.',
    fact: 'Radio takes 4 to 24 minutes each way, so a Mars lander cannot be flown by a human. It has to land itself — which is why the software matters as much as the engines.'
  },
  {
    tier: 6,
    name: 'Europa',
    icon: '🧊',
    system: 'Jupiter',
    blurb: 'An ice moon of Jupiter, with an ocean underneath it.',
    fact: 'Europa likely holds more liquid water than every ocean on Earth combined, under an ice shell kilometres thick.'
  },
  {
    tier: 7,
    name: 'Titan',
    icon: '🟠',
    system: 'Saturn',
    blurb: "Saturn's largest moon. Rivers and seas — of methane.",
    fact: 'Titan has a thicker atmosphere than Earth and gravity so low that a person with strapped-on wings could genuinely fly by flapping.'
  },
  {
    tier: 8,
    name: 'Deep Space',
    icon: '✨',
    system: 'Interstellar',
    blurb: 'Past the planets. Where the long missions go — and where you are headed.',
    fact: 'Voyager 1 launched in 1977 and is still transmitting from interstellar space on roughly the power of a household light bulb.'
  }
];

export function destinationForTier(tier) {
  return DESTINATIONS.find((d) => d.tier === tier) || DESTINATIONS[0];
}

/**
 * The whole route with each stop's state, plus live progress to the next one.
 *
 * Reads the SAME gates the rank system already uses — this is a presentation
 * layer over existing truth, not a second source of it. If the gates are
 * recalibrated, the map follows automatically.
 */
export function getJourney(xp, totalMastered, currentRank = null) {
  const rank = currentRank || getCurrentRank(xp, totalMastered);
  const next = getNextRank(rank.tier);
  const progress = getProgressToNextRank(xp, totalMastered, rank);

  const stops = DESTINATIONS.map((d) => ({
    ...d,
    rankName: (RANKS.find((r) => r.tier === d.tier) || {}).name || '',
    state: d.tier < rank.tier ? 'reached' : d.tier === rank.tier ? 'current' : 'ahead'
  }));

  return {
    stops,
    current: destinationForTier(rank.tier),
    next: next ? destinationForTier(next.tier) : null,
    rank,
    nextRank: next,
    progress,
    /** What is still needed for the next stop — the honest "how far" answer. */
    remaining: next
      ? {
          xp: Math.max(0, next.minXp - xp),
          lessons: Math.max(0, next.minMasteredForTier - totalMastered)
        }
      : null,
    complete: !next
  };
}

/**
 * A short line for the dashboard and for Nova to say out loud.
 * Deliberately concrete: a number he can act on, not "keep going!".
 */
export function journeySummary(journey) {
  if (!journey || journey.complete) return 'Deep Space reached — the whole route is behind you.';
  const { next, remaining } = journey;
  const bits = [];
  if (remaining.lessons > 0) bits.push(`${remaining.lessons} more lesson${remaining.lessons === 1 ? '' : 's'}`);
  if (remaining.xp > 0) bits.push(`${remaining.xp} XP`);
  if (!bits.length) return `${next.name} is within reach.`;
  return `Next stop ${next.name} — ${bits.join(' and ')} to go.`;
}
