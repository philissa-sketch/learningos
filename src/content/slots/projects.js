// ---------------------------------------------------------------------------
// THE PROJECTS SLOT ANSWERS A QUESTION: WHAT HANDS-ON WORK DOES THIS SCHOOL DO?
//
// Third of the slot interfaces, after `theme.js` and `guide.js`. Read either of
// those first if this is the first one you have opened; the pattern is theirs.
//
// ---- THE FAULT THIS REPLACES ----
//
// Five pools, named one by one, in nine different places:
//
//     const { aerospaceProjects, roboticsProjects, scienceExperiments,
//             technologyProjects } = academyContent().projects;
//     const { gardenProjects } = academyContent().electives;
//
// Nine files rebuild that list by hand — the portfolio view, the journal, the
// feedback panel, the weekly view, the two dashboard sections, the planner, the
// weekly plan and the store — each in its own shape: a flat concat here, a
// lookup chain there, a labelled array somewhere else.
//
// The cost is not the repetition. It is that **one of the nine is already
// wrong**, and its own comment says why it should not be:
//
//     // Built from the pools themselves so a project added later is covered
//     // without anyone remembering to update a list here.
//     const ALL_PROJECTS = [...aerospaceProjects, ...scienceExperiments,
//                           ...technologyProjects, ...roboticsProjects];
//
// Four of five. One pool is missing, so every project in it is invisible to
// the duplicate check that list exists to perform. The comment describes this
// module and the code beneath it does the opposite.
//
// ---- AND WHY IT BLOCKS EVERYTHING ELSE ----
//
// A school that runs pottery, or fencing, or nothing at all, cannot say so. It
// must supply five names the platform has decided in advance, three of which
// name subjects it may not teach, or it fails the content interface. That is
// how one Academy came to owe 156 names and a second could supply 16.
//
// So the platform asks ONE question and stops naming subjects:
//
//     projectPools  — the pools of hands-on work this school runs.
//
// ---- THE TWO SHAPES AN ANSWER MAY TAKE ----
//
// A LIST OF POOLS, for a school that is data — and for any school from here on:
//
//     projectPools: [
//       { subject: 'pottery', label: 'Pottery', items: [...] },
//       { subject: 'fencing', label: 'Fencing', items: [...] }
//     ]
//
// `subject` is the id the rest of the app files work under; `label` is what a
// child reads. An entry missing either still works — the label falls back to
// the subject and the subject to the label, because a school with one pool and
// no strong feelings about ids should not have to care. A pool that names
// neither takes both from its own items, which carry a subject already.
//
// THE OLD NAMED POOLS, for the schools in this build:
//
//     projects:  { aerospaceProjects, roboticsProjects,
//                  scienceExperiments, technologyProjects }
//     electives: { gardenProjects }
//
// Kept working on purpose. Both schools here answer this way today and a
// migration that breaks the schools it is migrating is not a migration.
//
// THIS PATH IS THE ONE TO REMOVE, and removing it is worth five names off every
// Academy's bill: the four in `projects` and `gardenProjects` in `electives`.
// It goes when both folders answer with `projectPools`.
//
// ---- WHY THIS ONE MODULE READS TWO SLOTS ----
//
// Every other slot interface takes its own slot and nothing else. This one
// takes the whole content pack, because the thing it is unpicking is precisely
// that ONE kind of content was split across two slots for no reason a school
// could explain: a project from one pool and a project from another are the
// same shape,
// scheduled by the same planner, found by the same lookup, and filed under
// different slots. `projectPools` is one answer in one slot, and when the
// legacy path goes, so does the second argument.
//
// ---- WHY A BAD ANSWER DEGRADES INSTEAD OF THROWING ----
//
// Same rule as the other two: a throw reaches the shell's catch and a child
// sees a school that will not open. An unusable pool is an authoring mistake,
// and the place to catch one is `scripts/verify-slot-projects.mjs`, before a
// deploy — not a screen on a school morning. Every function here returns a
// usable empty value rather than raising.
// ---------------------------------------------------------------------------

/**
 * What the platform asks of this slot.
 *
 * Exported so a check can assert against it rather than retyping the word.
 */
export const PROJECT_QUESTIONS = Object.freeze(['projectPools']);

/**
 * The named pools this module still understands, and the slot each was filed
 * under. Ordered: it is the order the screens used to hand-write, so a school
 * on the legacy path sees exactly the list it saw before.
 *
 * ---- WHY THERE IS NO SUBJECT OR LABEL HERE ----
 *
 * There was, for about an hour, and `verify-no-learner` was right to refuse it.
 * `src/content/` is the platform zone and the standard there is absolute: a
 * quoted subject id in the one file the whole school reaches content through is
 * a curriculum decision compiled into the place built to prevent exactly that.
 *
 * It is also unnecessary. Every project already carries its own subject, set by
 * the school that owns it, so the pool takes its id from its contents instead
 * of from a table here. That is strictly better than the table would have been:
 * the school stays the source.
 *
 * Exported so the check can assert the legacy path covers all five rather than
 * four — which is the specific bug that prompted this module.
 */
export const LEGACY_POOLS = Object.freeze([
  { slot: 'projects', name: 'aerospaceProjects' },
  { slot: 'projects', name: 'scienceExperiments' },
  { slot: 'projects', name: 'technologyProjects' },
  { slot: 'projects', name: 'roboticsProjects' },
  { slot: 'electives', name: 'gardenProjects' }
]);

/** An array, whatever was handed over. */
const asArray = (v) => (Array.isArray(v) ? v : []);

/**
 * One pool, in the shape every screen reads.
 *
 * Returns null for a pool with nothing in it, so an empty entry costs that
 * school one pool rather than putting an empty heading on a child's screen.
 */
function normalizePool(entry) {
  if (!entry || typeof entry !== 'object' || Array.isArray(entry)) return null;
  const items = asArray(entry.items).filter((i) => i && typeof i === 'object' && i.id);
  if (!items.length) return null;
  const str = (v) => (typeof v === 'string' && v.trim() ? v.trim() : null);
  // The pool's own words first; then the subject its items already declare.
  // A pool is never named by this file.
  const fromItems = str(items.find((i) => str(i.subject))?.subject);
  const subject = str(entry.subject) || fromItems;
  // And the school's own name for that subject before any guess of ours. A
  // school that has already said what it calls a subject has said it once; a
  // second opinion here is how two screens come to disagree about one word.
  const label = str(entry.label) || str(entry.labels?.[subject])
    || (subject ? subject[0].toUpperCase() + subject.slice(1) : null);
  if (!subject && !label) return null;
  return Object.freeze({ subject: subject || label, label: label || subject, items });
}

/**
 * Every pool of hands-on work this school runs, in reading order.
 *
 * ALWAYS returns an array. A school that answers neither way gets `[]`, and
 * every screen below renders an empty list rather than breaking — which is the
 * correct state for a school whose curriculum has no hands-on work yet.
 *
 * `content` is the whole pack rather than one slot; see the note above on why.
 */
export function projectPools(content) {
  // The school's own names for its subjects, if it has said them. Handed to
  // every pool so a heading reads what the rest of the app already reads.
  const labels = content?.subjects?.SUBJECT_LABELS;
  const answer = content?.projects?.projectPools;
  if (Array.isArray(answer)) {
    return answer.map((e) => normalizePool({ ...e, labels })).filter(Boolean);
  }

  const pools = [];
  for (const { slot, name } of LEGACY_POOLS) {
    const pool = normalizePool({ items: content?.[slot]?.[name], labels });
    if (pool) pools.push(pool);
  }
  return pools;
}

/**
 * Every hands-on project, flat.
 *
 * What the six hand-written concats were each building. Duplicate ids are left
 * alone rather than collapsed: two pools sharing an id is an authoring mistake
 * the check reports, and silently dropping one here would hide it.
 */
export function allProjects(content) {
  return projectPools(content).flatMap((p) => p.items);
}

/**
 * The project with this id, or null.
 *
 * Replaces the lookup chains. First match wins, in pool order, so the answer
 * does not depend on which screen asked.
 */
export function findProjectById(content, id) {
  if (!id) return null;
  for (const pool of projectPools(content)) {
    const hit = pool.items.find((i) => i.id === id);
    if (hit) return hit;
  }
  return null;
}

/**
 * The pool a project belongs to, or null — for a screen that has an id and
 * needs to say which subject it came from.
 */
export function poolForProject(content, id) {
  if (!id) return null;
  for (const pool of projectPools(content)) {
    if (pool.items.some((i) => i.id === id)) return pool;
  }
  return null;
}
