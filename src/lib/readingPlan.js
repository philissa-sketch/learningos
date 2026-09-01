import { toDateStr, parseDateStr, todayDateStr } from './scheduler.js';
import { QUARTER_SPANS } from './yearPlan.js';
import { academyContent } from '../content/academyContent.js';

const { EXCLUDED_RANGES = [] } = academyContent().academicCenter;

/**
 * Reading pacing — PROJECT_PLAN.md Part 9's "Intelligent Book Assignment
 * System," which asks the app to work out "how many pages should be read
 * each week."
 *
 * Until now a Reading Assignment said "work through it this quarter at a
 * steady pace," which is the vaguest thing left in the Center. A
 * 12-year-old cannot tell from that whether he is behind, and neither
 * can his parent. Once she enters how many chapters (or pages) the book
 * actually has, this turns it into "read chapters 5-6 this week."
 *
 * NOTHING IS INVENTED. If she hasn't said how long the book is, there is
 * no plan — the UI says so and asks for the number rather than guessing
 * a length. Same rule as everywhere else in this Center.
 *
 * HOLIDAYS COME FROM ONE PLACE. `EXCLUDED_RANGES` is imported from the
 * assignment scheduler rather than redeclared here. Two lists of school
 * breaks in two files is a drift bug waiting to happen — the second one
 * gets updated next year and the first doesn't.
 */

const FRIDAY = 5;

/**
 * ===========================================================================
 * THE QUARTER COMES FROM THE YEAR PLAN. (Audit item O-4, fixed Aug 25, 2026.)
 * ===========================================================================
 *
 * This file used to carry its own table of quarter boundaries, hand-written as
 * month/day pairs. **Four of the five disagreed with `yearPlan.QUARTER_SPANS`,
 * which is the calendar the rest of the app runs on:**
 *
 *     Q2      ended Dec 18   the year plan says Dec 31
 *     Q3      Jan 5 - Mar 31  the year plan says Jan 4 - Mar 26
 *     Q4      Apr 1 - May 22  the year plan says Apr 5 - May 26
 *     Summer  began Jun 1     the year plan says Jun 7
 *
 * Only Q1 matched, which is exactly why nobody caught it: the quarter anyone
 * would check by hand was the one that agreed.
 *
 * The dates were not careless — they are a hand-made approximation of where
 * the school breaks fall. But that is the job `EXCLUDED_RANGES` already does,
 * two lines below, under a comment in this very file reading **"HOLIDAYS COME
 * FROM ONE PLACE... Two lists of school breaks in two files is a drift bug
 * waiting to happen — the second one gets updated next year and the first one
 * doesn't."**
 *
 * That is precisely what had happened. The doctrine was written down here and
 * applied to the holidays while the quarter boundaries beside them stayed a
 * second copy. So the boundaries come from the year plan now, and the breaks
 * keep coming from the scheduler, and this file states neither.
 *
 * WHAT STAYS TRUE: reading still runs the FULL quarter. Assignments start
 * about three weeks in so the lessons they depend on get taught first; reading
 * is the opposite — he can open the book on day one, and starting three weeks
 * late would waste a quarter of the reading time.
 */
function isExcluded(dateStr) {
  return EXCLUDED_RANGES.some(([from, to]) => dateStr >= from && dateStr <= to);
}

/**
 * The quarter's real span, by the label an assignment carries.
 *
 * `batchLabel` is the same string the Academic Center stores on every
 * assignment ("Q1 2026-2027", "Summer 2027"), so this is a direct lookup
 * rather than a parse of the year out of the text — which is what the old
 * code did, and which is how a second calendar gets built by accident.
 */
function spanFor(quarterLabel) {
  return QUARTER_SPANS.find((q) => q.batchLabel === quarterLabel) || null;
}

/**
 * Every week in a quarter, identified by the Friday it ends on. Weeks
 * lost to a school break are dropped, so a plan never asks him to read
 * over Christmas.
 */
export function readingWeeks(quarterLabel) {
  const span = spanFor(quarterLabel);
  if (!span) return [];

  const start = parseDateStr(span.start);
  const end = parseDateStr(span.end);

  const weeks = [];
  const cursor = new Date(start);
  cursor.setDate(cursor.getDate() + ((FRIDAY - cursor.getDay() + 7) % 7));
  while (cursor <= end) {
    const dateStr = toDateStr(cursor);
    if (!isExcluded(dateStr)) weeks.push(dateStr);
    cursor.setDate(cursor.getDate() + 7);
  }
  return weeks;
}

/**
 * Splits a book across a quarter's weeks.
 *
 * Deliberately front-loads the remainder rather than trailing it. With
 * 25 chapters over 10 weeks, the early weeks take 3 and the later ones 2
 * — because the end of a quarter is when the book report, the
 * presentation and everything else lands. Reading heavier while the
 * calendar is light is the whole point of pacing.
 *
 * Returns [] when there's nothing real to plan from, which the UI turns
 * into "tell me how long the book is" rather than a fake schedule.
 */
export function buildReadingPlan({ totalUnits, unit = 'chapters', quarter }) {
  const weeks = readingWeeks(quarter);
  if (!weeks.length || !Number.isInteger(totalUnits) || totalUnits <= 0) return [];

  const base = Math.floor(totalUnits / weeks.length);
  const remainder = totalUnits % weeks.length;

  const plan = [];
  let cursor = 1;
  for (let i = 0; i < weeks.length; i++) {
    const thisWeek = base + (i < remainder ? 1 : 0);
    if (thisWeek === 0) continue; // more weeks than units — skip empty weeks
    plan.push({
      weekEnding: weeks[i],
      from: cursor,
      to: cursor + thisWeek - 1,
      count: thisWeek,
      unit
    });
    cursor += thisWeek;
  }
  return plan;
}

/**
 * The week he's currently in — the first whose Friday hasn't passed.
 * After the last week, returns null (the plan is over, finished or not).
 */
export function currentReadingWeek(plan, today = todayDateStr()) {
  return plan.find((week) => week.weekEnding >= today) || null;
}

/**
 * Where he should be by now, versus where he actually is.
 *
 * `expected` is the end of the most recent week that has fully passed —
 * not the current week's target, because being mid-week and mid-chapter
 * is not being behind. That distinction is the difference between a
 * useful nudge and a tracker that always says you're failing.
 */
export function readingStatus(plan, unitsDone = 0, today = todayDateStr()) {
  if (!plan.length) return null;

  const passed = plan.filter((week) => week.weekEnding < today);
  const expected = passed.length ? passed[passed.length - 1].to : 0;
  const total = plan[plan.length - 1].to;
  const done = Math.max(0, Math.min(unitsDone, total));

  let state;
  if (done >= total) state = 'finished';
  else if (done >= expected) state = 'on-track';
  else state = 'behind';

  return {
    state,
    done,
    expected,
    total,
    unit: plan[0].unit,
    behindBy: Math.max(0, expected - done)
  };
}
