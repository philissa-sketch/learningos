
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

const { gardenProjects = [] } = academyContent().electives;
const { aerospaceProjects = [], roboticsProjects = [], scienceExperiments = [], technologyProjects = [] } = academyContent().projects;
const { getThisWeeksScheduledIds = () => [], writingPrompts = [] } = academyContent().writing;

const SOURCES = [
  writingPrompts,
  aerospaceProjects,
  scienceExperiments,
  technologyProjects,
  roboticsProjects,
  gardenProjects
];

/** Resolve a scheduled id against every pool it could belong to. */
export function findScheduledItemById(id) {
  for (const pool of SOURCES) {
    const hit = (pool || []).find((p) => p.id === id);
    if (hit) return hit;
  }
  return null;
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
 * WHICH build, when a week holds more than one: the pools are consulted in the
 * order below, so an Aerospace or Science experiment wins over the CAD and
 * robotics tasks that share some weeks. Those are lesson exercises attached to
 * a Technology unit; the experiment is the thing with a hypothesis and a
 * result, which is what these four forms are for.
 */
/**
 * ---- AND THE FORM DECIDES WHICH POOLS COUNT. (Sep 8, 2026.) ----
 *
 * Read against the real schedule, a flat "first build in the week" rule paired
 * week 13's Lab Report with `tech7-tinkercad-low-poly`. A Tinkercad model has
 * no hypothesis, no measurement and no result — there is nothing to report.
 * Design Documentation is the form for a CAD build, and it has one.
 *
 * So a Lab Report and a Scientific Observation take an experiment: Aerospace,
 * Science, Robotics or the Garden, all of which produce something that
 * happens. They never take a CAD exercise, and on a week that holds only one
 * they pair with nothing and say so — a lab report pointed at the wrong build
 * is worse than a lab report pointed at none.
 *
 * Preference order inside each list is the order below: an Aerospace or
 * Science experiment wins over the robotics task that shares some weeks.
 */
const EXPERIMENT_POOLS = () => [aerospaceProjects, scienceExperiments, roboticsProjects, gardenProjects];
const ALL_BUILD_POOLS = () => [aerospaceProjects, scienceExperiments, technologyProjects, roboticsProjects, gardenProjects];

/**
 * The four writing forms that DOCUMENT something built rather than invent a
 * subject of their own, each with the pools its form can honestly describe.
 * The rest of the pool (essay, creative writing, the space journal) is about
 * whatever he chooses, and pinning those to the week's build would take that
 * choice away for no gain.
 */
const POOLS_FOR_FORM = {
  'w7-lab-report': EXPERIMENT_POOLS,
  'w7-scientific-observation': EXPERIMENT_POOLS,
  'w7-mission-report': ALL_BUILD_POOLS,
  'w7-design-documentation': ALL_BUILD_POOLS
};

export const BUILD_DOCUMENTATION_PROMPTS = new Set(Object.keys(POOLS_FOR_FORM));

/**
 * The hands-on build this documentation prompt is scheduled beside, or null.
 *
 * Null is a real answer and a common one: many weeks schedule writing with no
 * build, and on those the prompt keeps its own general instructions. Nothing
 * here invents a pairing that the schedule did not make.
 */
export function pairedBuildFor(promptId, date = new Date()) {
  const pools = POOLS_FOR_FORM[promptId];
  if (!pools) return null;
  const ids = getThisWeeksScheduledIds(date);
  if (!ids.includes(promptId)) return null;
  for (const pool of pools()) {
    const hit = (pool || []).find((p) => ids.includes(p.id));
    if (hit) return hit;
  }
  return null;
}
