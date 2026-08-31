/**
 * ---- THE ACADEMY REGISTRY ----
 *
 * LearningOS is a platform. It contains no learner — not a name, not an age,
 * not a subject, not a lesson. That rule has a consequence this file exists to
 * carry: **the platform cannot know, at build time, which Academies exist.**
 *
 * A family creates theirs at the front door, on their own computer, minutes
 * after they first open the app. There is no commit that could have listed it.
 *
 * So the real registry is a TABLE — `academies` in the household database
 * (src/db/householdDb.js) — and this file holds only the naming rules that
 * turn an Academy id into a database name, plus the empty static list below.
 */

/** Every Academy database name is built from this. */
export const DB_PREFIX = 'LearningOSDB_';

/**
 * Academies the PLATFORM ships with. Always empty, and checked by
 * scripts/verify-no-learner.mjs.
 *
 * This is not dead code and it is not a placeholder for a list that fills up
 * later. It is the rule written as something that executes: if a name ever
 * appears here, a learner has been welded into the platform, and the guard
 * fails on the commit that did it. Real Academies live in the household
 * database, created by the family who owns them.
 *
 * @type {Array<never>}
 */
export const ACADEMIES = [];

/**
 * The database that holds one Academy's records.
 *
 * One database per Academy is the whole isolation mechanism: nothing crosses,
 * because there is no shared table for it to cross through. See
 * docs/LEARNINGOS_PACK_SPEC.md §3.
 */
export function dbNameFor(academyId) {
  if (!academyId) throw new Error('dbNameFor: academyId is required');
  return `${DB_PREFIX}${academyId}`;
}

/**
 * Turn a typed name into an id usable as a folder name and a database suffix.
 *
 * Ids are derived from the name once, at creation, and then never re-derived —
 * the id is stored on the Academy record. That matters because a child can
 * rename their Academy, and a renamed Academy must not become a different
 * database with none of their work in it.
 *
 * A short random suffix is appended rather than checking for collisions,
 * because two children in one household really can share a first name, and
 * "Alex" and "Alex" must not resolve to one set of records.
 */
export function newAcademyId(displayName) {
  const slug = (displayName || '')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLocaleLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 24);
  const suffix = Math.random().toString(36).slice(2, 6);
  return `${slug || 'academy'}-${suffix}`;
}

/**
 * @param {Array<{id:string}>} records  the household's `academies` rows
 * @param {string} academyId
 * @throws if the id is not registered — a typo must not silently open a new,
 *         empty database under a misspelled name.
 */
export function getAcademy(records, academyId) {
  const found = (records || []).find((a) => a.id === academyId);
  if (!found) {
    throw new Error(
      `Unknown Academy "${academyId}". This machine has ${(records || []).length} registered.`
    );
  }
  return found;
}
