// ---------------------------------------------------------------------------
// WHICH WRITING DRILL IS DUE TODAY, AND WHETHER HE HAS DONE IT.
//
// The parent, Aug 13 2026: "I want Lamar to have daily journals, not weekly. He
// needs assistance building ELA and I think that will help him to begin to
// create structural sentences and paragraphs."
//
// Her chosen shape: a short structure drill Monday to Thursday, and on Friday
// the week's real piece from the existing weekly schedule. So this module
// answers exactly two questions — what is due, and is it done — and nothing
// else lives here.
//
// ---- TWO RULES THAT LOOK SMALL AND ARE NOT ----
//
// **Everything is a LOCAL date.** `todayDateStr()` and `toDateStr()` from
// scheduler.js, never `toISOString().slice(0,10)`. After about 8pm Eastern the
// UTC date is tomorrow, and the last time a screen in this app compared a
// stored local date against a computed UTC one, every checkbox on the home
// screen stopped responding and fixed itself at midnight.
//
// **"Done" means done TODAY.** The weekly journal got this wrong in a way worth
// copying the fix from rather than repeating: it built a set of every prompt he
// had EVER written and marked the week complete if the id was in it. Because
// the weekly pool repeats — "Mission Report" is scheduled seven times — writing
// it once in week 2 marked weeks 8, 15, 22, 29 and 36 as already done. Drills
// never repeat, but a drill can be re-attempted, and the same trap is one line
// away. So the check is always (id AND date), never id alone.
// ---------------------------------------------------------------------------
import { todayDateStr, toDateStr } from './scheduler.js';
import { academyContent } from '../content/academyContent.js';

// An Academy that fills no `writing` slot has no drill ladder and no school-week
// numbering of its own. `getSchoolWeekNumber` returning null makes drillForDate
// answer "no drill today", which is true, instead of throwing on the dashboard.
const { dailyDrills = [], getSchoolWeekNumber = () => null } = academyContent().writing;

/** Monday..Thursday. Friday is the week's real piece; the weekend is the weekend. */
export const DRILL_DAYS = [1, 2, 3, 4];

/** Is this a drill day? Mon-Thu only. */
export function isDrillDay(date = new Date()) {
  return DRILL_DAYS.includes(date.getDay());
}

/**
 * The drill for one calendar date, or null on a Friday, a weekend, or a week
 * the ladder does not reach yet.
 *
 * Day 1 is Monday, matching `Date#getDay()` — the drills are authored in the
 * order they should be met, so the mapping is deliberately dumb.
 */
export function drillForDate(date = new Date()) {
  if (!isDrillDay(date)) return null;
  const week = getSchoolWeekNumber(date);
  if (!week) return null;
  return dailyDrills.find((d) => d.week === week && d.day === date.getDay()) || null;
}

/** Every drill scheduled in one school week, in order. */
export function drillsForWeek(week) {
  return dailyDrills.filter((d) => d.week === week).sort((a, b) => a.day - b.day);
}

/**
 * Has this drill been written on this date? Both halves matter — see the header.
 * `writingEntries` rows carry `completedAt` as a full ISO timestamp, so it is
 * converted to a LOCAL date before comparing.
 */
export function drillDoneOn(writingEntries, drillId, dateStr = todayDateStr()) {
  if (!drillId) return false;
  return (writingEntries || []).some(
    (e) => e.promptId === drillId && e.completedAt && toDateStr(new Date(e.completedAt)) === dateStr
  );
}

/** The entry he wrote for this drill today, if there is one. */
export function drillEntryOn(writingEntries, drillId, dateStr = todayDateStr()) {
  if (!drillId) return null;
  return (
    (writingEntries || []).find(
      (e) => e.promptId === drillId && e.completedAt && toDateStr(new Date(e.completedAt)) === dateStr
    ) || null
  );
}

/** A drill id looks like wd-w03-d2. Used to tell drills from weekly prompts. */
export function isDrillId(id) {
  return typeof id === 'string' && /^wd-w\d{2}-d\d$/.test(id);
}

export function drillById(id) {
  return dailyDrills.find((d) => d.id === id) || null;
}

/**
 * How the ladder is going: drills met, drills written, and the skills he has
 * actually practised. Counted across the whole year, not this week, because the
 * point of a ladder is the climb.
 */
export function drillProgress(writingEntries, date = new Date()) {
  const week = getSchoolWeekNumber(date) || 0;
  const offered = dailyDrills.filter((d) => d.week <= week);
  const writtenIds = new Set((writingEntries || []).map((e) => e.promptId));
  const done = offered.filter((d) => writtenIds.has(d.id));
  const skills = [...new Set(done.map((d) => d.skillLabel))];
  return {
    week,
    offered: offered.length,
    done: done.length,
    missed: offered.length - done.length,
    skillsPractised: skills,
    totalInLadder: dailyDrills.length
  };
}
