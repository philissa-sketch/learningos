import { missionCalendarItems } from './missionSchedule.js';
import { academyContent } from '../content/academyContent.js';

/**
 * ---- THIS FILE READS CONTENT INSIDE ITS FUNCTIONS, NOT AT THE TOP ----
 *
 * Every other school file destructures its slot at module scope, which is safe
 * because the platform only reaches the school after an Academy's content has
 * loaded. This file is one of two exceptions, and the reason is a genuine
 * circular dependency rather than a style preference.
 *
 * Three of the Academy's own content files import the date helpers below
 * (`toDateStr`, `parseDateStr`, `addDays`). So loading a manifest evaluates
 * this module — while that manifest is still being loaded. A read at the top of
 * this file therefore asks for content that is, at that exact moment, halfway
 * through arriving, and throws.
 *
 * The rule it produces, worth keeping: A MODULE THAT ACADEMY CONTENT IMPORTS
 * MUST NOT READ ACADEMY CONTENT AT MODULE SCOPE. Only two files are in that
 * position today — this one and missionSchedule.js — and both read inside the
 * one function that needs the values, by which time loading has finished.
 *
 * The longer-term fix is to move these date helpers somewhere content can
 * import without reaching into the school at all. That is a Tier 2 item, and
 * this comment is what should send someone looking for it.
 */
/**
 * Pure date/calendar helpers for the Daily/Weekly/Monthly Scheduler
 * (PROJECT_PLAN.md Part 5 — parent asked directly for "a clear view of
 * everything so I can plan ahead," Aug 2026). Kept separate from any
 * component so the date math is unit-testable and reusable across all
 * three views without duplicating logic.
 *
 * Deliberately does NOT put Quarterly Exams on the calendar — exams are
 * mastery-gated (unlock when content is learned), not date-scheduled, so
 * giving them a fake calendar date would be inventing false precision.
 * What DOES appear here are the two things that genuinely have real
 * dates: Planner assignments (`dueDate`) and the weekly writing/project
 * schedule (`weeklySchedule.js`, already real school-week-numbered).
 */

/** Local-timezone 'YYYY-MM-DD', never UTC-shifted (toISOString() is UTC
 * and can silently roll a late-evening local date to the next day —
 * confirmed the wrong tool for this, same class of bug this project has
 * hit before with date handling). */
export function toDateStr(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function todayDateStr() {
  return toDateStr(new Date());
}

/** Parses a 'YYYY-MM-DD' string as a local-midnight Date, never UTC —
 * `new Date('2026-08-03')` parses as UTC midnight, which can display as
 * the previous day in US timezones. This is the safe counterpart. */
export function parseDateStr(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
}

const WEEKDAY_LABELS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export function weekdayLabel(date) {
  return WEEKDAY_LABELS[date.getDay()];
}

export function formatMonthLabel(date) {
  return date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
}

export function formatShortDate(date) {
  return date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
}

export function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

/** The Monday on/before the given date (US school-week convention,
 * matching this project's existing Mon-Fri daily schedule). */
export function startOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0=Sun..6=Sat
  const diffToMonday = day === 0 ? -6 : 1 - day;
  return addDays(d, diffToMonday);
}

/** 7 real Date objects, Monday through Sunday, for the week containing `date`. */
export function getWeekDates(date) {
  const monday = startOfWeek(date);
  return Array.from({ length: 7 }, (_, i) => addDays(monday, i));
}

/**
 * A full calendar grid for the given month: an array of weeks, each an
 * array of 7 Date objects (always starts on a Monday, always ends on a
 * Sunday, padded with days from the adjacent months so every week is a
 * real 7-day row — the standard month-grid convention).
 */
export function getMonthGrid(year, monthIndex) {
  const firstOfMonth = new Date(year, monthIndex, 1);
  const gridStart = startOfWeek(firstOfMonth);
  const lastOfMonth = new Date(year, monthIndex + 1, 0);
  const gridEnd = startOfWeek(lastOfMonth);
  const lastGridDay = addDays(gridEnd, 6);

  const weeks = [];
  let cursor = gridStart;
  while (cursor <= lastGridDay) {
    const week = Array.from({ length: 7 }, (_, i) => addDays(cursor, i));
    weeks.push(week);
    cursor = addDays(cursor, 7);
  }
  return weeks;
}

/** Real assignments due on this exact date (from the Planner). */
export function getAssignmentsForDate(assignments, dateStr) {
  return assignments.filter((a) => a.dueDate === dateStr);
}

/**
 * Merges the two real sources of dated work into ONE list the calendar
 * views can render: the Parent Dashboard's Planner (`assignments`) and
 * the Academic Success Center (`academicAssignments`).
 *
 * Why this exists: the Scheduler was built when the Planner was the only
 * table with real due dates. The Academic Success Center (Part 9) added
 * a second one, which meant a Book Report due Nov 20 had a real due date
 * that never appeared on the calendar the parent actually looks at —
 * defeating the whole point of "a clear view of everything so I can plan
 * ahead." This closes that seam.
 *
 * Two things it must get right:
 *   1. `key`, not `id`. Both tables auto-increment their own ids, so
 *      Planner #3 and Academic #3 both exist and would collide as React
 *      keys. The source prefix makes the key genuinely unique.
 *   2. Untitled Academic slots are excluded. A placeholder isn't work,
 *      and it has no due date anyway — same rule the Center itself uses.
 */
/**
 * ---- AND THE THIRD DATED TABLE. (Aug 28, 2026.) ----
 *
 * The parent: *"the field trip planner didnt notify me of a field trip due."*
 *
 * She was right, and the reason is written directly above this line. That note
 * describes closing this exact seam for the Academic Success Center — "a Book
 * Report due Nov 20 had a real due date that never appeared on the calendar the
 * parent actually looks at" — and `fieldTrips` is a THIRD table with real dates
 * that nobody added when it was built.
 *
 * A trip dated today sat in the Field Trip Planner list, twenty-one rows deep,
 * and appeared on no calendar, no weekly view, and no board. The app knew and
 * the screen never said — the same fault this project keeps finding, now for
 * the third table in a row.
 *
 * A trip is `done` when it is completed. `status: 'planned'` on a date that has
 * passed is not done, and should keep showing as missed rather than vanish.
 */
export function buildCalendarItems({ assignments = [], academicAssignments = [], fieldTrips = [], missionEvaluations = [] }) {
  // Read here rather than at module scope — see the note at the top of the file.
  const { leadStatus, startByFor } = academyContent().academicCenter;
  const { MISSION_QUARTERS, findProposal } = academyContent().compliance;

  const items = assignments
    .filter((a) => a.dueDate)
    .map((a) => ({
      key: `planner::${a.id}`,
      title: a.title,
      subject: a.subject || null,
      typeLabel: a.assignmentType || 'Assignment',
      dueDate: a.dueDate,
      done: Boolean(a.completed),
      source: 'planner'
    }));

  for (const a of academicAssignments) {
    if (!a.dueDate || !a.title) continue;
    items.push({
      key: `academic::${a.id}`,
      title: a.title,
      subject: a.subject || null,
      typeLabel: a.type,
      dueDate: a.dueDate,
      done: a.status === 'completed',
      source: 'academic',
      /**
       * WHEN IT HAS TO BE UNDERWAY, not just when it is due. (Aug 14, 2026.)
       *
       * The parent asked for "the time needed that leads to the due date to
       * start any pre-requisites." A book report due Oct 9 needs the book read
       * by Sep 18. Until now every dated view showed only the deadline, so a
       * four-week project and a one-day worksheet looked identical right up
       * until the week it was due.
       */
      startBy: startByFor(a),
      leadStatus: leadStatus(a, todayDateStr())
    });
  }

  /**
   * ---- AND THE FOURTH DATED THING. (Aug 29, 2026.) ----
   *
   * The parent: *"i would like thos to be scheduled for me."*
   *
   * A quarterly mission is the heaviest assessment in the app — weighted like a
   * quarterly exam — and it carried a quarter and no date at all. Five weeks
   * into Q1, Q1's had not been started, because nothing ever said it was owed.
   *
   * Driven by the QUARTER LIST, not by existing rows: a mission nobody has
   * chosen yet is exactly the one she needs to see.
   */
  for (const item of missionCalendarItems({
    missionEvaluations,
    quarters: MISSION_QUARTERS,
    findProposal,
    today: todayDateStr()
  })) {
    items.push(item);
  }

  for (const t of fieldTrips) {
    if (!t.date || !t.destination) continue;
    items.push({
      key: `fieldtrip::${t.id}`,
      title: t.destination,
      subject: Array.isArray(t.subjects) && t.subjects.length ? t.subjects[0] : null,
      typeLabel: 'Field Trip',
      dueDate: t.date,
      done: t.status === 'completed',
      source: 'fieldTrip'
    });
  }

  return items;
}

/** Merged calendar items due on one exact date. */
export function getCalendarItemsForDate(items, dateStr) {
  return items.filter((i) => i.dueDate === dateStr);
}

/**
 * Same merged items, but keyed by due date in a Map so calendar grids can
 * do an O(1) lookup per cell instead of a full linear scan. The Monthly
 * view alone renders 42 cells; with getCalendarItemsForDate that was 42
 * full scans of every assignment ever created, on every render. Build the
 * Map once (memoized in the view), then each cell is `map.get(dateStr)`.
 * (Batch B, Aug 2026.)
 */
export function buildCalendarItemsByDate(sources) {
  const byDate = new Map();
  for (const item of buildCalendarItems(sources)) {
    const list = byDate.get(item.dueDate);
    if (list) list.push(item);
    else byDate.set(item.dueDate, [item]);
  }
  return byDate;
}

/**
 * Merged items due within a window of date strings, sorted by date then
 * title. Used by the Dashboard's "what's coming up" card.
 */
export function getUpcomingCalendarItems(items, fromDateStr, throughDateStr) {
  return items
    .filter((i) => i.dueDate >= fromDateStr && i.dueDate <= throughDateStr)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate) || a.title.localeCompare(b.title));
}

/**
 * THE NEXT FEW THINGS PAST THE END OF THE WINDOW.
 *
 * ---- WHY THIS EXISTS (Aug 13, 2026) ----
 *
 * The parent: "in the parent dashboard there is a things due for the week and
 * its not showing me whats due... Lamar has a rocket project due and it didnt
 * show up."
 *
 * Nothing was broken. The Coming Up panel looks fourteen days ahead, and on
 * Aug 13 her nearest dated item was Aug 28 — ONE DAY past the edge. The bottle
 * rocket is Sept 16. So the panel correctly reported "Nothing due in the next
 * 14 days" while she had nine real projects and book reports on the calendar.
 *
 * A true sentence that leaves the reader with a false belief is a bug. "Nothing
 * due" reads as "nothing exists" or "this screen is broken", and both are worse
 * than the number being slightly wrong. The fix is not a longer window — any
 * window has an edge, and the day something falls off it is the day she stops
 * trusting the panel. The fix is for the empty state to say what is beyond the
 * edge and how far away it is.
 */
export function getNextCalendarItemsBeyond(items, throughDateStr, limit = 3) {
  return items
    .filter((i) => !i.done && i.dueDate > throughDateStr)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate) || a.title.localeCompare(b.title))
    .slice(0, limit);
}

// NOTE: no daysUntil() here on purpose. ParentDashboard.jsx already has one
// (module scope, local-midnight safe) and this codebase has been bitten before
// by two implementations of one small calculation drifting apart.

/**
 * Anything still not done whose due date has already passed. Compared as
 * date STRINGS so a time-of-day component can never make something due
 * today read as overdue.
 */
export function getOverdueCalendarItems(items, todayStr) {
  return items
    .filter((i) => !i.done && i.dueDate < todayStr)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
}

/** Real assignments due anywhere within a list of date strings (e.g. a week). */
export function getAssignmentsForDates(assignments, dateStrs) {
  const set = new Set(dateStrs);
  return assignments.filter((a) => a.dueDate && set.has(a.dueDate));
}

/**
 * ===========================================================================
 * ARRIVED FROM A CURRICULUM FOLDER — §3c Step 1, slice 1. (Sept 1, 2026.)
 * ===========================================================================
 *
 * Both of these were sitting inside one Academy's content, which meant every
 * Academy enrolled after it would have had to supply its own copy of "how many
 * days until a date" and "which week of the year is this". Neither is a fact
 * about a school. They are here because the platform should answer them once.
 */

/**
 * Whole days from `today` to `dateStr`. Negative when the date has passed.
 *
 * Both arguments are date STRINGS, and the arithmetic runs through
 * parseDateStr, which anchors at local midnight. A deadline counted in UTC
 * reads one day short every evening after 8pm here — see
 * scripts/verify-local-dates.mjs, which exists because that shipped once.
 */
export function daysUntil(dateStr, today = todayDateStr()) {
  return Math.round((parseDateStr(dateStr) - parseDateStr(today)) / 86400000);
}

/**
 * The ISO-8601 week number for a date.
 *
 * The UTC calls here are the safe kind and the distinction matters: the date's
 * LOCAL parts are read first and rebuilt as a UTC midnight, so the current
 * moment never enters the arithmetic. What is banned is asking UTC what day it
 * is today; doing fixed arithmetic on a date already pinned down is how you
 * avoid daylight-saving hours shifting a week boundary.
 */
export function getWeekNumber(date = new Date()) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}
