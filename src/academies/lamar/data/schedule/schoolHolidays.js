/**
 * The days school does not run.
 *
 * UNTIL AUG 9 2026 THIS FILE DID NOT EXIST, and nothing in the app subtracted a
 * single holiday from anything. Every day count — the year planner, the Georgia
 * 180-day math, the "how many sessions does this quarter have" reasoning behind
 * the curriculum pacing — was raw Monday-to-Friday. schoolQuarter.js even
 * DOCUMENTS real day counts (Q1 ~58, Q2 ~30, Q3 ~56, Q4 ~35) taken off the
 * district calendar, but no code ever read them, so the two quietly disagreed.
 *
 * THIS FAMILY'S CALENDAR IS NOT THE DISTRICT'S, and that is the reason this
 * file's contents are what they are. The parent, Aug 9 2026: *"we dont
 * celebrate christmas and thanksgiving"* and then, exactly: *"we will take the
 * actual holiday off for rest but not the weeks."* Asked to confirm the list
 * below she answered *"those single days are all off for rest."*
 *
 * So: SINGLE DAYS, NEVER WEEKS. Thanksgiving Day is off; the Monday, Tuesday,
 * Wednesday and Friday around it are ordinary school days. Christmas Day is
 * off; the rest of that week is school. This is not an edge case to be handled
 * — it is the whole design of this family's year, and QUARTER_SPANS in
 * yearPlan.js was re-spanned on the same day to match it (Q2 now runs through
 * Dec 31 rather than stopping Dec 18 and discarding eleven weekdays).
 *
 * WHY DATES AND NOT RULES. No floating-holiday arithmetic ("fourth Thursday in
 * November"), because a rule that computes the wrong day is silent and a date
 * that is wrong is obvious. Re-verify and extend this list each school year;
 * the guard fails loudly if the year runs past the last date here.
 */

export const SCHOOL_HOLIDAYS = [
  { date: '2026-09-07', name: 'Labor Day' },
  { date: '2026-10-12', name: 'Columbus Day' },
  { date: '2026-11-11', name: 'Veterans Day' },
  { date: '2026-11-26', name: 'Thanksgiving Day' },
  { date: '2026-12-25', name: 'Christmas Day' },
  { date: '2027-01-01', name: "New Year's Day" },
  { date: '2027-01-18', name: 'Martin Luther King Jr. Day' },
  { date: '2027-02-15', name: 'Presidents Day' },
  // Falls after Q4's last day (May 28), so it costs no instructional day. Kept
  // on the list anyway: it is a real day off, and leaving it out would make the
  // list look like an oversight the first time someone extends Q4.
  { date: '2027-05-31', name: 'Memorial Day' },
  // Saturday — no school day lost. Same reasoning as above.
  { date: '2027-06-19', name: 'Juneteenth' },
  { date: '2027-07-05', name: 'Independence Day (observed)' }
];

/** The last date this list is known to cover. Past it, the app is guessing. */
export const HOLIDAYS_VERIFIED_THROUGH = '2027-07-31';

const HOLIDAY_BY_DATE = new Map(SCHOOL_HOLIDAYS.map((h) => [h.date, h.name]));

/** 'YYYY-MM-DD' for a Date, in local time — never toISOString, which is UTC. */
export function toLocalDateStr(date) {
  const d = date instanceof Date ? date : new Date(date);
  return (
    d.getFullYear() +
    '-' + String(d.getMonth() + 1).padStart(2, '0') +
    '-' + String(d.getDate()).padStart(2, '0')
  );
}

/** The holiday's name if this date is one, otherwise null. */
export function holidayName(date) {
  return HOLIDAY_BY_DATE.get(typeof date === 'string' ? date : toLocalDateStr(date)) || null;
}

export function isHoliday(date) {
  return holidayName(date) !== null;
}

/**
 * True only for a real instructional day: Monday-Friday and not a holiday.
 * The single place the rest of the app should ask.
 */
export function isSchoolDay(date) {
  const d = date instanceof Date ? date : new Date(date + 'T00:00:00');
  const dow = d.getDay();
  if (dow === 0 || dow === 6) return false;
  return !isHoliday(d);
}

/** Holidays falling on a weekday inside a span — the ones that actually cost a day. */
export function holidaysInSpan(startDateStr, endDateStr) {
  return SCHOOL_HOLIDAYS.filter((h) => {
    if (h.date < startDateStr || h.date > endDateStr) return false;
    const d = new Date(h.date + 'T00:00:00');
    return d.getDay() >= 1 && d.getDay() <= 5;
  });
}
