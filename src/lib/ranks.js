// ---------------------------------------------------------------------------
// 8-tier mission structure (locked decision).
// Advancement gates on BOTH minimum XP AND a minimum number of lessons
// mastered — never XP alone. Both gates are enforced in getCurrentRank()
// below, which is the single place rank is derived; the store calls it on
// every XP change and never stores a rank it computed some other way.
//
// (An earlier version of this comment pointed at `checkTierGate()` and
// `useAppStore.recomputeRank()`. Neither function ever existed — the
// gating was always in getCurrentRank. Corrected August 6, 2026 rather
// than left to send the next reader hunting for code that isn't there.)
//
// minMasteredForTier counts TOTAL lessons mastered across the whole
// curriculum, not just the current tier's own lessons.
//
// ---- CALIBRATION, and why these are absolute counts ----
//
// Recalibrated August 6, 2026 against the 331 lessons that exist today.
// The previous numbers were tuned for 287 and never revisited as content
// grew, which had pushed the top rank to 87% of everything in the app and
// left Tiers 6 and 7 sharing an identical mastery gate — so only XP
// separated two supposedly distinct ranks.
//
// These stay ABSOLUTE rather than becoming percentages of the curriculum,
// and that is deliberate: a percentage gate would DEMOTE him every time a
// new subject shipped. Master 100 of 200 lessons and you are Tier 3; add
// 200 more lessons overnight and the same 100 becomes 25% and the rank
// evaporates. No child should lose a rank for content he did not ask for.
//
// The cost of absolute numbers is that they drift as the curriculum grows,
// which is exactly what happened here — twice.
//
// RECALIBRATED AGAIN August 8, 2026, against 356 lessons. The Aug 6 pass
// claimed "the verification suite fails when the real curriculum outgrows
// it." That check was never actually written: CALIBRATED_LESSON_COUNT was
// referenced nowhere but its own declaration, so nothing could fail, and the
// curriculum quietly grew 331 -> 356 while the gates stayed put. Tier 8 drifted
// back to ~87% of the curriculum — the exact number the Aug 6 pass existed to
// correct. A comment describing a safety net is not a safety net.
//
// The check now genuinely exists, in scripts/verify-curriculum.mjs, and fails
// loudly when allLessons outgrows the constant below. Gates were scaled by
// 356/331 so the intended difficulty curve is preserved rather than reinvented.
//
// Raising these gates can in principle DEMOTE a student who had already passed
// the old bar. It cannot here (rank is a high-water mark now — see
// useAppStore's getCurrentRank wrapper), and it could not have today anyway,
// since the student is at Tier 1 with the school year not yet started. Both
// facts were checked before changing a single number.
// ---------------------------------------------------------------------------

/** The curriculum size the thresholds below were last tuned against. */
export const CALIBRATED_LESSON_COUNT = 356;

// Names unified Aug 6, 2026 to Part 1's 8-mission arc (parent-confirmed), so
// ranks, badges, and the Mission Map all speak one language. Each rank IS a
// mission; the tier gates (minXp + minMasteredForTier) are unchanged — only
// the names changed, plus a short `blurb` used by the Mission Map. Mission N
// unlocks when its tier's XP + mastery gates are both cleared.
export const RANKS = [
  { tier: 1, name: 'Junior Engineer', minXp: 0, minMasteredForTier: 0, blurb: 'Every engineer starts here — learn the fundamentals and build strong habits.' },
  { tier: 2, name: 'Flight Cadet', minXp: 500, minMasteredForTier: 32, blurb: 'Take flight. Sharpen your core skills across every subject.' },
  { tier: 3, name: 'Rocket Builder', minXp: 1200, minMasteredForTier: 75, blurb: 'Start building. Put what you know to work on real problems.' },
  { tier: 4, name: 'Aircraft Designer', minXp: 2100, minMasteredForTier: 129, blurb: 'Design and refine. Think like an engineer solving for people.' },
  { tier: 5, name: 'Mission Specialist', minXp: 3200, minMasteredForTier: 188, blurb: 'Own the mission. Go deep in your specialties.' },
  { tier: 6, name: 'Space Explorer', minXp: 4500, minMasteredForTier: 242, blurb: 'Push the frontier. Take on advanced, unfamiliar challenges.' },
  { tier: 7, name: 'Aerospace Innovator', minXp: 6000, minMasteredForTier: 290, blurb: 'Invent. Combine everything you have mastered into new ideas.' },
  { tier: 8, name: 'College Ready Engineer', minXp: 7800, minMasteredForTier: 333, blurb: 'Mission complete — ready for college-level engineering.' }
];

/**
 * Determine the highest rank the student qualifies for, given total XP and
 * total lessons mastered so far. Gate is XP AND mastery — both must clear a
 * tier's bar for that tier (or higher) to be reached.
 */
export function getCurrentRank(totalXp, totalMastered) {
  let current = RANKS[0];
  for (const rank of RANKS) {
    if (totalXp >= rank.minXp && totalMastered >= rank.minMasteredForTier) {
      current = rank;
    }
  }
  return current;
}

export function getNextRank(currentTier) {
  return RANKS.find((r) => r.tier === currentTier + 1) || null;
}

/**
 * Progress (0–1) toward the next rank, blending the XP gate and the mastery
 * gate so the rocket meter reflects whichever gate is further behind.
 */
export function getProgressToNextRank(totalXp, totalMastered, currentRank) {
  const next = getNextRank(currentRank.tier);
  if (!next) return 1;
  const xpSpan = next.minXp - currentRank.minXp;
  const masterySpan = next.minMasteredForTier - currentRank.minMasteredForTier;
  const xpProgress = xpSpan > 0 ? (totalXp - currentRank.minXp) / xpSpan : 1;
  const masteryProgress =
    masterySpan > 0 ? (totalMastered - currentRank.minMasteredForTier) / masterySpan : 1;
  const blended = Math.min(xpProgress, masteryProgress);
  return Math.max(0, Math.min(1, blended));
}
