
// ---------------------------------------------------------------------------
// THE WEEK'S WRITING AND PROJECT PLAN — one lookup, shared.
// (Extracted Aug 9, 2026.)
//
// WHY THIS EXISTS. The parent opened the Weekly schedule and found Nova saying
// "Nothing is due this week" directly above a card listing that week's writing
// plan. Both were correct and together they were wrong: the plan is keyed off
// the SCHOOL WEEK NUMBER and carries no due date, so it is invisible to
// buildCalendarItems, which only knows about dated assignments.
//
// To a twelve-year-old that distinction does not exist. He sees a screen
// contradicting itself, and the cost is not confusion — it is that he stops
// believing the parts of the app that tell him where he stands.
//
// The lookup was already written inside WeeklyView. Rather than copy it into
// Nova's guide — which is how this project has twice ended up with two versions
// of one fact quietly drifting apart — it moves here and both read it.
// ---------------------------------------------------------------------------

/**
 * ===========================================================================
 * THIS MODULE THREW ON IMPORT UNTIL Sep 8, 2026 — AND NOTHING SAID SO.
 * ===========================================================================
 *
 * The content-pack rewrite appended these declarations to the BOTTOM of the
 * file. `const SOURCES = [writingPrompts, ...]` a few lines below runs at
 * module-evaluation time, before them, so the module died on its own first
 * line with
 *
 *     ReferenceError: Cannot access 'writingPrompts' before initialization
 *
 * `import` is hoisted; `const` is not. Anything that imports this file went
 * with it — `NovaScheduleGuide.jsx` is the one that does.
 *
 * They live at the top now, where a declaration used by module-level code has
 * to live. Nothing else about them changed.
 */
import { academyContent } from '../content/academyContent.js';
import { projectPools, findProjectById } from '../content/slots/projects.js';

const { getThisWeeksScheduledIds = () => [], writingPrompts = [] } = academyContent().writing;

/**
 * Resolve a scheduled id against everything it could belong to.
 *
 * Was a hand-written list of six pools, five of them subjects the platform had
 * chosen in advance. The project half comes from the slot now.
 */
export function findScheduledItemById(id) {
  return (writingPrompts || []).find((p) => p.id === id)
    || findProjectById(academyContent(), id)
    || null;
}

/**
 * Everything scheduled for the school week containing `date`.
 *
 * Returns resolved items, not ids — an id that no longer matches anything is
 * dropped rather than rendered as a blank row, which is the failure mode when a
 * project gets renamed.
 */
export function getWeeklyPlanItems(date = new Date()) {
  return getThisWeeksScheduledIds(date)
    .map(findScheduledItemById)
    .filter(Boolean);
}

/**
 * Just the writing prompt for the week, if there is one.
 *
 * Kept separate because it is the piece Nova names by default: the hands-on
 * builds already have their own home on the dashboard, and listing all of it
 * turns a one-line orientation into an inventory.
 */
export function getWeeklyWritingItem(date = new Date()) {
  const ids = getThisWeeksScheduledIds(date);
  for (const id of ids) {
    const hit = (writingPrompts || []).find((p) => p.id === id);
    if (hit) return hit;
  }
  return null;
}

/**
 * ===========================================================================
 * THE LAB REPORT NOW NAMES THE EXPERIMENT IT IS A REPORT ON. (Sep 8, 2026.)
 * ===========================================================================
 *
 * The parent: **"there is a Lab report writing journal that isn't connected to
 * any lab experiment."**
 *
 * The pairing was never missing from the plan — only from the screen. The very
 * first paragraph of `weeklySchedule.js` says what it built:
 *
 *   > pairs each hands-on Aerospace project with a thematically-matching
 *   > documentation prompt in the same week (Bottle Rocket -> Mission Report,
 *   > Parachute Drop -> Scientific Observation, Wind Tunnel -> Lab Report)
 *
 * Week 6 is `['ae7-wind-tunnel', 'w7-lab-report']`. He builds a wind tunnel and
 * writes a lab report in the same five days, and the two were shown to him as
 * unrelated rows: the report asked him to invent an experiment ("a paper
 * airplane distance test, or a balloon rocket") while a real one with real
 * results sat two rows above it. Asked to document nothing in particular, a
 * lab report becomes a writing exercise, which is the one thing a lab report
 * is not.
 *
 * That pairing lived in a COMMENT. This is the function that reads it, so
 * every screen that shows the prompt can say which build it is about — the
 * same rule this project keeps arriving at: a row that names a thing must open
 * that thing, and a form that documents a build must name the build.
 *
 * WHICH build, when a week holds more than one: the prompt itself says, in
 * preference order, and this function reads that order without opinion. See the
 * note below on where that decision moved to and why it is not ours to hold.
 */
/**
 * ---- AND THE FORM DECIDES WHICH POOLS COUNT. (Sep 8, 2026.) ----
 *
 * Read against the real schedule, a flat "first build in the week" rule paired
 * week 13's Lab Report with a CAD model. A CAD model has no hypothesis, no
 * measurement and no result — there is nothing to report.
 *
 * ---- WHERE THAT DECISION LIVES NOW (Sept 15, 2026) ----
 *
 * It used to live HERE, as a table mapping four of one school's writing-prompt
 * ids to lists of that school's subjects:
 *
 *     const POOLS_FOR_FORM = { [a prompt id]: [a fixed list of pools], ... };
 *
 * Two faults in one table. It is a CURRICULUM decision — which forms can
 * honestly describe which work — sitting in the engine, where the school that
 * made it could not reach it. And it named four prompts and five subjects in
 * advance, so a school whose forms or subjects differ got no pairing at all.
 *
 * A writing prompt now says for itself what it can document, in preference
 * order, and the engine only reads it:
 *
 *     { id: [a prompt id], documents: [subject ids, most apt first] }
 *
 * ---- AND WHY THIS COMMENT NAMES NEITHER ----
 *
 * The example above used to carry the real ids. `verify-no-learner` failed on
 * it, correctly: this file is in the school zone and is NOT on
 * scripts/generic-debt.json, so it is one of the files that is already clean
 * and may not become dirty again — and the check reads comments, on purpose,
 * because a comment naming one school's subjects is how a generic file quietly
 * turns back into a specific one. The fix is always to reword the prose, never
 * to loosen the check.
 *
 * The decision is unchanged; it moved. This cost the contract NOTHING — a
 * field on a prompt, inside `writingPrompts`, which every Academy already
 * supplies. A prompt with no `documents` is never paired, which is right for
 * an essay or a journal, whose subject is whatever the child chooses.
 */
const documentingPrompts = () =>
  (writingPrompts || []).filter((p) => Array.isArray(p?.documents) && p.documents.length);

export const BUILD_DOCUMENTATION_PROMPTS = new Set(documentingPrompts().map((p) => p.id));

/**
 * The hands-on build this documentation prompt is scheduled beside, or null.
 *
 * Null is a real answer and a common one: many weeks schedule writing with no
 * build, and on those the prompt keeps its own general instructions. Nothing
 * here invents a pairing that the schedule did not make.
 */
export function pairedBuildFor(promptId, date = new Date()) {
  const prompt = (writingPrompts || []).find((p) => p.id === promptId);
  const documents = Array.isArray(prompt?.documents) ? prompt.documents : null;
  if (!documents || !documents.length) return null;
  const ids = getThisWeeksScheduledIds(date);
  if (!ids.includes(promptId)) return null;
  const pools = projectPools(academyContent());
  // The prompt's own order decides which build wins on a week holding several.
  for (const subject of documents) {
    const pool = pools.find((p) => p.subject === subject);
    const hit = (pool?.items || []).find((p) => ids.includes(p.id));
    if (hit) return hit;
  }
  return null;
}
