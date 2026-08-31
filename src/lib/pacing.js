import { QUARTER_SPANS } from './yearPlan.js';
import { liveRotatingSubjects, liveMorningSubject, ROTATING_BLOCK_ID } from './rotatingBlock.js';
import { isSchoolDay } from '../academies/lamar/data/schedule/schoolHolidays.js';
import { allLessons } from '../academies/lamar/data/lessons/index.js';

/**
 * =============================================================================
 * DOES EACH SUBJECT HAVE ENOUGH DAYS TO TEACH WHAT IT IS CARRYING?
 * =============================================================================
 *
 * ---- WHY THIS EXISTS (Audit item O-3, Aug 26, 2026) ----
 *
 * The 2:15 rotating block gives each specialized subject a set number of days
 * per quarter. Each subject carries a set number of things to teach. **Nothing
 * in this app has ever compared those two numbers.**
 *
 * Every input was already here — the lesson table, the week pattern, the
 * holiday list, the quarter spans, and `liveRotatingSubjects`, which decides
 * who owns a day. The arithmetic simply was not done, so a quarter could be
 * over-subscribed for months and the only way to find out was to run out of
 * Thursdays in December.
 *
 * ---- WHAT COUNTS AS A DAY OF WORK ----
 *
 * A subject's load is its Mission Control lessons PLUS its Khan Academy units,
 * because both land in the same 45 minutes: `BLOCK_FOR_SUBJECT` sends
 * aerospace, technology, socialStudies and robotics — lesson or Khan tick
 * alike — to block-9. Counting only Mission Control lessons said Social
 * Studies owned thirteen Q1 days with nothing to do in them, when it had ten
 * Khan units; and it said Technology had three spare Q1 days when it had
 * twelve more units to get through.
 *
 * ONE KHAN UNIT IS COUNTED AS ONE DAY, AND THAT IS A FLOOR, NOT AN ESTIMATE.
 * This app's own dashboard says so out loud, in the comment explaining why
 * there is no "finish this unit" button: *"a Khan unit is three or four school
 * days."* His board offers exactly one open unit at a time
 * (`nextOpenKhanRow`), so twelve units is at minimum twelve sittings and
 * realistically three times that.
 *
 * A floor is the right thing to report and the wrong thing to trust. It is
 * right because it is defensible — every number here can be checked against a
 * list you can count. It is not to be trusted because a quarter that only
 * *just* fits at one-day-per-unit does not fit at all in practice, which is
 * why `khanDriven` is on every quarter that has Khan units in the rotating
 * block, and why the sentences say "at least" rather than "needs".
 *
 * ---- WHY OVERFLOW IS NOT AUTOMATICALLY A PROBLEM ----
 *
 * The open Friday exists for exactly this. `FRIDAY_BUFFER_PLAN` says so in as
 * many words: *"whatever is behind from Mon-Thu ... or the rotating subject
 * that ran out of Tuesdays."* So this module does NOT move anything or invent
 * a schedule. It reports, and it says whether the buffer covers the gap —
 * because "over by five, seven Fridays free" is a plan, and "over by five" on
 * its own is an alarm.
 *
 * ---- ZERO SLACK IS ITS OWN STATE, AND IT IS THE ONE TO WATCH ----
 *
 * A subject that is exactly subscribed is not comfortable, it is brittle:
 * eleven lessons and eleven Mondays means **one sick day and the quarter
 * cannot recover.** A subject with a spare day absorbs a bad week; a subject
 * with none is one flu away from a quarter that never finished — and nothing
 * on any screen said so before this.
 */

/** Subjects taught in the 2:15 rotating block. The core subjects have their own. */
export const ROTATING_SUBJECTS = ['aerospace', 'technology', 'socialStudies', 'robotics'];

/** Mission Control lessons per `subject|quarter`, counted once at module load. */
const LESSONS_BY_SUBJECT_QUARTER = (() => {
  const map = new Map();
  for (const lesson of allLessons) {
    if (!lesson.quarter || !ROTATING_SUBJECTS.includes(lesson.subject)) continue;
    const key = lesson.subject + '|' + lesson.quarter;
    map.set(key, (map.get(key) || 0) + 1);
  }
  return map;
})();

/**
 * THE KHAN ROWS ARE NOT OPTIONAL, and this is the reason they are demanded
 * rather than defaulted.
 *
 * `liveRotatingSubjects` treats a missing list as "I was not told" and falls
 * back to naming the day's first subject — sensible on a screen, wrong in a
 * calculation, because it hands days to subjects that have nothing to teach.
 * My own first pass at this file made exactly that mistake and reported Q1
 * Aerospace with thirteen days of slack when it has none.
 *
 * An empty array is a legitimate answer ("there is no Khan work"). `null`,
 * `undefined` and anything else is a caller who forgot, and gets an error
 * instead of a plausible wrong number.
 */
function requireKhanRows(rows) {
  if (!Array.isArray(rows)) {
    throw new TypeError('pacing: khanAcademyAssignments must be an array — the day-ownership calculation is wrong without it');
  }
  return rows;
}

/**
 * How many days each subject actually OWNS in a quarter, plus the open Fridays.
 *
 * Walks the real calendar rather than multiplying weeks by a day count: school
 * holidays land unevenly, and a quarter with two Mondays off has two fewer
 * Aerospace days than the multiplication says.
 */
export function ownedDaysInQuarter(quarter, khanAcademyAssignments) {
  requireKhanRows(khanAcademyAssignments);
  const owned = {};
  let openDays = 0;
  const start = new Date(quarter.start + 'T12:00:00');
  const end = new Date(quarter.end + 'T12:00:00');
  for (const day = new Date(start); day <= end; day.setDate(day.getDate() + 1)) {
    if (!isSchoolDay(day)) continue;
    /**
     * BOTH SLOTS, since Aug 29 2026. Science gave up Tuesday at 10:30 so Social
     * Studies could have a second day, and a subject that owns two blocks on
     * different days owns two days. Counting only the 2:15 block would have
     * reported Social Studies as still one-day-a-week and still 30 days short —
     * the exact number the second slot was created to close.
     */
    const morning = liveMorningSubject(day, khanAcademyAssignments);
    if (morning) owned[morning] = (owned[morning] || 0) + 1;

    const live = liveRotatingSubjects(day, khanAcademyAssignments);
    if (live.length === 0) {
      // An open 2:15 is still an open Friday for buffer purposes, whether or
      // not the morning slot was taken by somebody.
      openDays += 1;
      continue;
    }
    for (const subject of live) owned[subject] = (owned[subject] || 0) + 1;
  }
  return { owned, openDays };
}

/**
 * ===========================================================================
 * WHAT A KHAN UNIT ACTUALLY COSTS. (Aug 29, 2026.)
 * ===========================================================================
 *
 * The header above says a unit is counted as one day and that this is "a floor,
 * not an estimate" — and that a unit is "realistically three times that". The
 * floor was honest, and it was also the reason nothing ever warned her that
 * Technology was over by a factor of three. A model that is defensible but
 * always wrong in the same direction does not protect anybody.
 *
 * The parent, Aug 29 2026, on one Technology unit at one session a week:
 * *"since Tech is only 1 day a week and it may have 7 lessons, how should he
 * complete all the lessons?"*
 *
 * ---- MEASURED, NOT GUESSED ----
 *
 * Three course pages were opened and counted on 2026-08-29:
 *
 *   Technology  "Digital information"     20 videos + 10 exercises + 3 quizzes
 *                                         + 1 unit test  = 34 items -> 8 days
 *   Science     "Cells and Organisms"     8 exercises + 3 quizzes + 1 test
 *                                         = 12 items, no video column
 *   Social St.  World History units       4 to 17 graded items, ~10 typical
 *
 * The lesson of that morning: **units are not interchangeable.** Applying the
 * Technology figure to Science inflated Science by roughly three times and
 * nearly cost Lamar two courses he and his mother had chosen on purpose. So
 * this function prefers real data over any per-subject number:
 *
 *   1. `row.items` when the row carries it — the science sequence records the
 *      exercise count for every unit, which is the closest thing to a measured
 *      size that exists in this app.
 *   2. A measured per-subject figure for courses counted by hand.
 *   3. The old one-day floor for anything else, so this is never WORSE than
 *      what it replaces.
 */
const ITEMS_PER_DAY = 3;

/** Counted off the live Khan course pages on 2026-08-29. */
const MEASURED_UNIT_DAYS = {
  technology: 8,
  socialStudies: 4
};

export function khanUnitDays(row) {
  const items = Number(row && row.items);
  if (Number.isFinite(items) && items > 0) {
    return Math.max(1, Math.ceil(items / ITEMS_PER_DAY));
  }
  const measured = MEASURED_UNIT_DAYS[row && row.subject];
  if (measured) return measured;
  return 1;
}

/** Khan units per subject in one quarter, and the days they actually cost. */
function khanUnitsBySubject(quarter, khanAcademyAssignments) {
  const counts = {};
  const days = {};
  for (const row of khanAcademyAssignments) {
    if (!row || row.batchLabel !== quarter.batchLabel) continue;
    if (!ROTATING_SUBJECTS.includes(row.subject)) continue;
    counts[row.subject] = (counts[row.subject] || 0) + 1;
    days[row.subject] = (days[row.subject] || 0) + khanUnitDays(row);
  }
  return { counts, days };
}

/**
 * One quarter's pacing.
 *
 * `state` is one of:
 *   'over'        needs more days than it owns, and the open Fridays do not cover it
 *   'buffered'    needs more days than it owns, but the open Fridays do cover it
 *   'tight'       exactly as many days as it needs — no room for a sick day
 *   'ok'          at least one spare day
 *   'idle'        owns days and has nothing at all to teach in them
 */
export function quarterPacing(quarter, khanAcademyAssignments) {
  requireKhanRows(khanAcademyAssignments);
  const { owned, openDays } = ownedDaysInQuarter(quarter, khanAcademyAssignments);
  const { counts: khanUnits, days: khanDays } = khanUnitsBySubject(quarter, khanAcademyAssignments);

  const subjects = new Set([
    ...Object.keys(owned).filter((s) => ROTATING_SUBJECTS.includes(s)),
    ...Object.keys(khanUnits),
    ...ROTATING_SUBJECTS.filter(
      (s) => (LESSONS_BY_SUBJECT_QUARTER.get(s + '|' + quarter.batchLabel) || 0) > 0
    )
  ]);

  const rows = [...subjects].sort().map((subject) => {
    const lessons = LESSONS_BY_SUBJECT_QUARTER.get(subject + '|' + quarter.batchLabel) || 0;
    const units = khanUnits[subject] || 0;
    /**
     * The COST of those units, not the count of them. A quarter with two
     * Technology units is carrying sixteen sittings, not two.
     */
    const unitDays = khanDays[subject] || 0;
    const needs = lessons + unitDays;
    const days = owned[subject] || 0;
    return { subject, lessons, khanUnits: units, khanUnitDays: unitDays, needs, days, slack: days - needs };
  });

  /** Fridays are shared, so the shortfalls are added up before asking. */
  const shortfall = rows.reduce((n, r) => n + Math.max(0, -r.slack), 0);
  const covered = shortfall <= openDays;

  for (const row of rows) {
    if (row.days > 0 && row.needs === 0) row.state = 'idle';
    else if (row.slack < 0) row.state = covered ? 'buffered' : 'over';
    else if (row.slack === 0) row.state = 'tight';
    else row.state = 'ok';
  }

  return {
    quarter: quarter.batchLabel,
    quarterId: quarter.id,
    rows,
    openDays,
    shortfall,
    /** How many open Fridays are left after the overflow is absorbed. */
    fridaysLeft: Math.max(0, openDays - shortfall),
    /** True when every subject fits, counting the open Friday buffer. */
    fits: covered,
    /** Subjects with no spare day at all — the ones a single sick day breaks. */
    tight: rows.filter((r) => r.state === 'tight').map((r) => r.subject),
    /** Subjects the buffer cannot rescue. Empty is the healthy answer. */
    over: rows.filter((r) => r.state === 'over').map((r) => r.subject),
    /**
     * True when Khan units are part of this quarter's load — which makes every
     * figure above a FLOOR, because a unit is counted here as one day and is
     * three or four in real life.
     */
    khanDriven: rows.some((r) => r.khanUnits > 0),
    blockId: ROTATING_BLOCK_ID
  };
}

/** Every quarter, in order. */
export function yearPacing(khanAcademyAssignments) {
  requireKhanRows(khanAcademyAssignments);
  return QUARTER_SPANS.map((q) => quarterPacing(q, khanAcademyAssignments));
}

/**
 * One sentence for a row, written for HER — the shape of every other
 * explanation in this app. A number with no sentence beside it is a number
 * somebody has to interpret at the end of a long day.
 */
export function pacingNote(row, quarter) {
  /**
   * TAKES THE WHOLE QUARTER, NOT JUST ITS FRIDAY COUNT, and that is a fix
   * rather than a tidy-up. It used to take `openDays`, so an over-subscribed
   * row read "only 7 open Fridays to absorb 3 days — this one does not fit",
   * which is a sentence that argues against itself: three is fewer than seven.
   *
   * The reason it does not fit is that the Fridays are a SHARED pool and
   * another subject has already spent them. A row cannot say that from its own
   * numbers, so it is handed the quarter's.
   */
  const { openDays, shortfall, fridaysLeft } = quarter;
  const over = -row.slack;
  const days = (n) => `${n} ${n === 1 ? 'day' : 'days'}`;
  const fridays = (n) => `${n} open ${n === 1 ? 'Friday' : 'Fridays'}`;
  /** "at least" wherever a Khan unit is in the count. See the header. */
  const needs = row.khanUnits > 0 ? `at least ${days(row.needs)}` : days(row.needs);
  switch (row.state) {
    case 'over':
      return shortfall > over
        ? `Needs ${needs} and owns ${days(row.days)} — ${days(over)} short. The whole quarter is ${days(shortfall)} short and has only ${fridays(openDays)}, so there is nothing left to cover this.`
        : `Needs ${needs} and owns ${days(row.days)}. Only ${fridays(openDays)} to absorb ${days(over)} — this one does not fit.`;
    case 'buffered':
      return `Needs ${needs} and owns ${days(row.days)}. The open Fridays cover the other ${days(over)}, but they are not free after that.`;
    case 'tight':
      /**
       * TIGHT IS NOT ALWAYS DIRE, AND SAYING SO WHEN IT ISN'T COSTS TRUST.
       *
       * This read "one sick day and this quarter cannot catch up" no matter
       * what, which was wrong for Q1 Aerospace the moment Technology's units
       * moved out: eleven lessons in eleven Mondays, yes — and four open
       * Fridays sitting unspent behind them. A missed Monday has somewhere to
       * go. An alarm that fires when there is a plan is an alarm she learns to
       * scroll past, and then it is not there when it matters.
       */
      return fridaysLeft > 0
        ? `Exactly ${days(row.needs)} of work and ${days(row.days)} to do it in — no spare day of its own. A missed one has to be made up on one of the ${fridaysLeft} open ${fridaysLeft === 1 ? 'Friday' : 'Fridays'} still free.`
        : `Exactly ${days(row.needs)} of work and ${days(row.days)} to do it in, and every open Friday is already spoken for. One sick day and this quarter cannot catch up.`;
    case 'idle':
      return `Owns ${days(row.days)} this quarter with nothing scheduled in them.`;
    default:
      return `${needs} of work, ${days(row.days)} to do it in — ${days(row.slack)} spare.`;
  }
}

/** "11 lessons + 8 Khan units", for a table cell that has to show the working. */
export function loadBreakdown(row) {
  const parts = [];
  if (row.lessons > 0) parts.push(`${row.lessons} ${row.lessons === 1 ? 'lesson' : 'lessons'}`);
  if (row.khanUnits > 0) parts.push(`${row.khanUnits} Khan ${row.khanUnits === 1 ? 'unit' : 'units'}`);
  return parts.length ? parts.join(' + ') : 'nothing scheduled';
}

/** The headline for a whole quarter, for a card that has room for one line. */
export function quarterPacingNote(q) {
  const fridays = `${q.openDays} open ${q.openDays === 1 ? 'Friday' : 'Fridays'}`;
  /**
   * The caveat is part of the sentence, not a footnote under it. A quarter
   * that "fits" on a floor and is counted three times over in real life is the
   * exact reassurance this module exists to stop giving.
   */
  const floor = q.khanDriven
    ? ' Counting each Khan unit as one day, which is the least it can be.'
    : '';
  if (q.over.length > 0) {
    return `Over-subscribed: ${q.over.length} ${q.over.length === 1 ? 'subject needs' : 'subjects need'} more days than the quarter has, even after the ${fridays}.${floor}`;
  }
  if (q.shortfall > 0) {
    return `Fits, using ${q.shortfall} of the ${fridays} — ${q.fridaysLeft} left over.${floor}`;
  }
  if (q.tight.length > 0) {
    return `Fits, but ${q.tight.length === 1 ? 'one subject has' : `${q.tight.length} subjects have`} no spare day at all.${floor}`;
  }
  return `Fits, with room to spare and ${fridays}.${floor}`;
}
