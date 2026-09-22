/**
 * =============================================================================
 * THE WRITING SLOT — the school writes the prompts, the lessons and the
 * calendar; the platform finds this week's.
 * =============================================================================
 *
 * ---- WHY THIS EXISTS (audit finding 1 — "a school cannot be data") ----
 *
 * The `writing` slot used to hand over four FUNCTIONS: `getSchoolWeekNumber`,
 * `getThisWeeksScheduledIds`, `lessonForPrompt` and `requirementsFor`. A stored
 * Academy cannot hold a function. Three were lookups into the school's own
 * tables; the fourth counted weeks from the school's first day.
 *
 * ---- A FINDING ON THE WAY, NOT FIXED HERE ----
 *
 * Counting weeks needs the school's first day, and the first school's
 * `SCHOOL_YEAR_START` is not its own: it re-exports a date typed into
 * src/lib/schoolQuarter.js, in the platform. One family's calendar is sitting
 * in the platform's quarter logic. That belongs to the timetable slot, which
 * is the next conversion, and it is recorded in docs/GENERIC_CARRYOVER.md
 * rather than moved in passing.
 *
 * `SCHOOL_YEAR_START` may be a Date or a date string ('2026-08-03'): a string
 * is what a stored school will send. A string is read as LOCAL midnight, not
 * UTC, so a school week never starts the evening before in the Americas.
 */

/** What the platform asks this slot for. */
export const WRITING_QUESTIONS = Object.freeze([
  'SCHOOL_YEAR_START',
  'weeklyWritingSchedule',
  'PROMPT_LESSONS',
  'DRILL_REQUIREMENTS'
]);

const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;
const slot = (content) => (content && typeof content.writing === 'object' && content.writing) || {};
const own = (obj, key) => obj && typeof obj === 'object' && Object.prototype.hasOwnProperty.call(obj, key);

function startOf(content) {
  const start = slot(content).SCHOOL_YEAR_START;
  if (start instanceof Date) return Number.isNaN(start.getTime()) ? null : start;
  if (typeof start === 'string') {
    const m = start.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (m) return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  }
  return null;
}

/**
 * Which week of the school year a date falls in, from 1.
 *
 * 0 before the first day — and 0 for a school that has not said when it
 * starts, because "week 1" would put a whole calendar's first week of work on
 * a school that never agreed to it.
 */
export function getSchoolWeekNumber(content, date = new Date()) {
  const start = startOf(content);
  if (!start) return 0;
  const diff = date.getTime() - start.getTime();
  if (diff < 0) return 0;
  return Math.floor(diff / MS_PER_WEEK) + 1;
}

/** The writing prompts this school scheduled for the week containing a date. */
export function getThisWeeksScheduledIds(content, date = new Date()) {
  const schedule = slot(content).weeklyWritingSchedule;
  const week = getSchoolWeekNumber(content, date);
  return (own(schedule, week) && schedule[week]) || [];
}

/** The mini-lesson that teaches a prompt's structure, or null. */
export function lessonForPrompt(content, promptId) {
  const lessons = slot(content).PROMPT_LESSONS;
  return (own(lessons, promptId) && lessons[promptId]) || null;
}

/** What a drill's answer must contain, or an empty list. */
export function requirementsFor(content, promptId) {
  const reqs = slot(content).DRILL_REQUIREMENTS;
  return (own(reqs, promptId) && reqs[promptId]) || [];
}
