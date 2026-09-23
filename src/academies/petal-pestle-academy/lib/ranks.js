// ---------------------------------------------------------------------------
// The seven-tier ladder, and the one thing it deliberately does NOT do.
//
// Mission Control gates its ranks on XP AND lessons mastered, because it teaches
// lessons. This app teaches nothing yet — it measures. So ranks here are earned
// by DOING THE WORK OF BEING MEASURED: questions answered, strands finished,
// days returned to. Not by scoring well.
//
// That is a deliberate refusal. Ranking a child by her diagnostic level would
// mean the app congratulates her for arriving already ahead and quietly
// penalises her for the gaps it exists to find — which would give her a reason
// to guess high, or to avoid the strands she is weakest in. The measurement has
// to be safe to fail, or it stops measuring anything.
//
// So: every child who finishes the diagnostic reaches the top of this ladder,
// whatever it says about her. The levels live on My Levels; the ladder is for
// showing up.
// ---------------------------------------------------------------------------

/**
 * RECALIBRATED for nine strands. The gates were tuned against twelve, and the
 * three science strands came out of the diagnostic — which would have left the
 * top rank permanently unreachable, because minStrandsSettled: 12 can no longer
 * happen. A ladder whose last rung does not exist is worse than no ladder.
 *
 * Sized against a real run now: ~60 questions across 9 strands.
 */
export const RANKS = [
  { tier: 1, name: 'Little Seed', plant: '🌱', minAnswered: 0, minStrandsSettled: 0, blurb: 'Everything starts underground. Answer your first question.' },
  { tier: 2, name: 'Sprout', plant: '🌿', minAnswered: 6, minStrandsSettled: 0, blurb: 'You have broken through. Keep going.' },
  { tier: 3, name: 'Bud', plant: '🌷', minAnswered: 15, minStrandsSettled: 2, blurb: 'Two strands measured. You are finding your shape.' },
  { tier: 4, name: 'Blossom', plant: '🌸', minAnswered: 26, minStrandsSettled: 3, blurb: 'Open and growing. A third of the way through.' },
  { tier: 5, name: 'Petal Keeper', plant: '🌺', minAnswered: 38, minStrandsSettled: 5, blurb: 'More than half measured. You keep coming back.' },
  { tier: 6, name: "Apothecary's Apprentice", plant: '🪴', minAnswered: 50, minStrandsSettled: 7, blurb: 'Seven strands done. The shelf is nearly full.' },
  { tier: 7, name: 'Master Herbalist', plant: '🌼', minAnswered: 58, minStrandsSettled: 9, blurb: 'Every strand measured. You finished the whole thing.' }
];

/** Both gates must clear. Answering a lot of questions in one strand should not
 *  carry her to the top while eleven strands sit untouched. */
export function getCurrentRank(answered, strandsSettled) {
  let current = RANKS[0];
  for (const rank of RANKS) {
    if (answered >= rank.minAnswered && strandsSettled >= rank.minStrandsSettled) {
      current = rank;
    }
  }
  return current;
}

export function getNextRank(tier) {
  return RANKS.find((r) => r.tier === tier + 1) || null;
}

/** 0–1 toward the next tier, using whichever gate is further behind — so the
 *  meter never claims she is nearly there when a gate has barely moved. */
export function progressToNext(answered, strandsSettled, currentRank) {
  const next = getNextRank(currentRank.tier);
  if (!next) return 1;
  const aSpan = next.minAnswered - currentRank.minAnswered;
  const sSpan = next.minStrandsSettled - currentRank.minStrandsSettled;
  const aProg = aSpan > 0 ? (answered - currentRank.minAnswered) / aSpan : 1;
  const sProg = sSpan > 0 ? (strandsSettled - currentRank.minStrandsSettled) / sSpan : 1;
  return Math.max(0, Math.min(1, Math.min(aProg, sProg)));
}
