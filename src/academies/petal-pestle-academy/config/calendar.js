// ---------------------------------------------------------------------------
// HER SCHOOL YEAR, AS DATA. Added v3.58.
//
// ---- WHY THIS FILE HAD TO EXIST BEFORE A GOAL COULD ----
//
// The dates below have been real since v3.25 and they lived in ONE PLACE: §25
// of the master plan, in a markdown table. Nothing in the app could read them.
//
// That was fine while nothing needed to count days. A goal with a deadline is
// the thing that needs to count days — "5th grade by the start of next school
// year" is unanswerable without knowing how many school days that is. And the
// answer must never be typed by hand, because every hand-typed number in this
// project has drifted: the video counts, the lesson counts, the version in two
// files, her strand levels. Rule 20 exists because of the other nine.
//
// BLUEPRINT_A_LOCAL_FIRST §3.12.1 asks for exactly this — the term calendar as
// data, not as prose.
//
// ---- THE TWO RULES THAT MAKE THIS YEAR UNUSUAL, IN GIGI'S WORDS ----
//
//   "The long breaks RUN AT THREE DAYS A WEEK rather than closing, and SUMMER
//    IS A REAL TERM."
//
// Against Georgia's required 810 hours, her year gives 1,188. And the summer
// term is not a detail: it is 26 school days, and it is the difference between
// "5th grade by next school year" reading UNREALISTIC on five strands and
// reading STRETCH on them. A structural decision made in July decided whether
// a goal set in August was possible.
//
// ---- WHY THE DAY COUNTS ARE DATA AND NOT COMPUTED ----
//
// They are Gigi's PLAN, not an arithmetic result. Counting weekdays between two
// dates would give a different number, because the breaks run at three days a
// week rather than five and the break dates are not written down anywhere. So
// the plan is the source of truth, and check-schedule asserts the parts sum to
// the declared total — the number is verified rather than trusted.
// ---------------------------------------------------------------------------

/** Source: master plan §25, "HER SCHOOL YEAR — Clayton County 2026–27". */
export const SCHOOL_YEAR = {
  termId: '2026-27',
  label: 'Clayton County 2026–27',
  start: '2026-08-03',
  end: '2027-07-31',
  /** What §25 declares. Asserted against the sum of the periods below. */
  declaredSchoolDays: 216,
  /** Georgia's requirement, for the record this year has to satisfy. */
  georgiaHoursRequired: 810,
  periods: [
    { id: 'q1', label: 'Quarter 1', start: '2026-08-03', end: '2026-10-31', schoolDays: 58 },
    { id: 'q2', label: 'Quarter 2', start: '2026-11-01', end: '2026-12-31', schoolDays: 38 },
    { id: 'q3', label: 'Quarter 3', start: '2027-01-01', end: '2027-03-31', schoolDays: 56 },
    { id: 'q4', label: 'Quarter 4', start: '2027-04-01', end: '2027-05-26', schoolDays: 38 },
    {
      id: 'summer',
      label: 'Summer term',
      start: '2027-06-01',
      end: '2027-07-31',
      schoolDays: 26,
      daysPerWeek: 3,
      note: 'Not optional. Gigi’s condition, and the 26 days that make an ambitious goal answerable.'
    }
  ]
};

/** Derived, never typed. */
export const TOTAL_SCHOOL_DAYS = SCHOOL_YEAR.periods.reduce((n, p) => n + p.schoolDays, 0);

/** The two dates a goal is likely to be set against. */
export const END_OF_CLASSES = '2027-05-26';
export const END_OF_SUMMER = '2027-07-31';

/** A typical school year of instruction, used to express a pace as a multiple. */
export const DAYS_IN_A_TYPICAL_YEAR = 180;

function ms(key) {
  return new Date(`${key}T00:00:00`).getTime();
}

/** Which period a date falls in, or null if it is outside the year. */
export function periodFor(dayKey) {
  return SCHOOL_YEAR.periods.find((p) => dayKey >= p.start && dayKey <= p.end) || null;
}

/**
 * School days between two dates.
 *
 * Whole periods are counted exactly, from the plan. A PARTIAL period is
 * pro-rated across its calendar span — approximate on purpose, and said out
 * loud here rather than presented as exact. The alternative is a list of every
 * break day for a year nobody has written down, and a wrong list would be worse
 * than an honest approximation.
 */
export function schoolDaysBetween(fromKey, toKey) {
  if (!fromKey || !toKey || fromKey >= toKey) return 0;
  let total = 0;
  for (const p of SCHOOL_YEAR.periods) {
    if (p.end < fromKey || p.start > toKey) continue;
    const spanStart = p.start > fromKey ? p.start : fromKey;
    const spanEnd = p.end < toKey ? p.end : toKey;
    const whole = ms(p.end) - ms(p.start);
    const part = ms(spanEnd) - ms(spanStart);
    total += whole <= 0 ? p.schoolDays : Math.round(p.schoolDays * (part / whole));
  }
  return total;
}

/** School days left between a date and a deadline. */
export function schoolDaysRemaining(fromKey, toKey = END_OF_SUMMER) {
  return schoolDaysBetween(fromKey, toKey);
}

/**
 * How much of a typical school year's instruction is left.
 *
 * This is the denominator in every feasibility verdict: a gap of two grade
 * levels across 1.18 years of instruction is a different ask from the same gap
 * across 0.85 of one, and the summer term is the whole of that difference.
 */
export function yearsOfInstructionLeft(fromKey, toKey = END_OF_SUMMER) {
  return schoolDaysRemaining(fromKey, toKey) / DAYS_IN_A_TYPICAL_YEAR;
}

export default SCHOOL_YEAR;
