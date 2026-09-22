/**
 * =============================================================================
 * THE REWARDS SLOT — the school writes the catalog and the sheets; the
 * platform shapes them.
 * =============================================================================
 *
 * ---- WHY THIS EXISTS (audit finding 1 — "a school cannot be data") ----
 *
 * The `rewards` slot used to hand over four FUNCTIONS: `printoutFor`,
 * `journalFor`, `costForCosmetic` and `catalogRewardRows`. A stored Academy
 * cannot hold a function. Each was a lookup, a merge or a reshape — the same
 * for every school — wrapped around tables that were the school's.
 *
 * ---- TWO VALUES THAT WERE HIDING INSIDE THE REWARD ROWS ----
 *
 * `catalogRewardRows` wrote the dream half of the catalog with a tier NAME and
 * a fallback ICON typed into the function. Both are what a child reads, both
 * belong to the school, and the tier name is also what decides whether a
 * parent has to approve — so it is asked for as `DREAM_TIER` and `DREAM_ICON`,
 * rather than being carried into the platform and fixed for every family.
 *
 * `TIERS_REQUIRING_PARENT` may be a list or a Set. A list is what a stored
 * school will send; a Set is what the first school had.
 */

/** What the platform asks this slot for. */
export const REWARD_QUESTIONS = Object.freeze([
  'LESSON_PRINTOUTS',
  'PRINTOUT_KINDS',
  'SUBJECT_JOURNALS',
  'COSMETIC_REPRICE',
  'REAL_WORLD_REWARDS',
  'DREAM_REWARDS',
  'TIERS_REQUIRING_PARENT',
  'DREAM_TIER',
  'DREAM_ICON'
]);

const slot = (content) => (content && typeof content.rewards === 'object' && content.rewards) || {};
const own = (obj, key) => obj && typeof obj === 'object' && Object.prototype.hasOwnProperty.call(obj, key);

/** The printable sheet for one lesson, or null — the answer for most lessons. */
export function printoutFor(content, lessonId) {
  const s = slot(content);
  const spec = own(s.LESSON_PRINTOUTS, lessonId) ? s.LESSON_PRINTOUTS[lessonId] : null;
  if (!spec) return null;
  return { ...spec, ...(s.PRINTOUT_KINDS?.[spec.kind] || {}), kind: spec.kind };
}

/** A subject's printable journal, or null. */
export function journalFor(content, subject) {
  const journals = slot(content).SUBJECT_JOURNALS;
  return (own(journals, subject) && journals[subject]) || null;
}

/**
 * What a cosmetic costs in this school.
 *
 * A repriced id takes the school's price — INCLUDING zero, which is how a free
 * default stays free. Anything not repriced keeps the price it came with.
 */
export function costForCosmetic(content, id, originalCost) {
  const reprice = slot(content).COSMETIC_REPRICE;
  return own(reprice, id) ? reprice[id] : originalCost;
}

function requiresParent(tiers, tier) {
  if (tiers instanceof Set) return tiers.has(tier);
  return Array.isArray(tiers) && tiers.includes(tier);
}

/**
 * The whole Credit catalog as `rewards` table rows.
 *
 * One shape for both halves, so the rewards list and the dream goal read the
 * same table and can never disagree about what something costs. A dream reward
 * always needs a parent, whatever tier list the school keeps: it is the half of
 * the catalog that costs a family real money and a real day.
 */
export function catalogRewardRows(content) {
  const s = slot(content);
  const tiers = s.TIERS_REQUIRING_PARENT;
  const rows = [];
  for (const item of Array.isArray(s.REAL_WORLD_REWARDS) ? s.REAL_WORLD_REWARDS : []) {
    rows.push({
      catalogId: item.id,
      name: item.name,
      cost: item.credits,
      note: item.note || '',
      tier: item.tier,
      kind: 'reward',
      requiresParent: requiresParent(tiers, item.tier),
      parentNamed: Boolean(item.parentNamed)
    });
  }
  for (const item of Array.isArray(s.DREAM_REWARDS) ? s.DREAM_REWARDS : []) {
    rows.push({
      catalogId: item.id,
      name: item.name,
      cost: item.credits,
      note: item.desc || '',
      tier: s.DREAM_TIER,
      kind: 'dream',
      icon: item.icon || s.DREAM_ICON,
      requiresParent: true,
      parentNamed: Boolean(item.parentNamed)
    });
  }
  return rows;
}
