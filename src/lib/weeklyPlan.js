
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
import { academyContent } from '../content/academyContent.js';

const { gardenProjects = [] } = academyContent().electives;
const { aerospaceProjects = [], roboticsProjects = [], scienceExperiments = [], technologyProjects = [] } = academyContent().projects;
const { getThisWeeksScheduledIds = () => null, writingPrompts = [] } = academyContent().writing;
