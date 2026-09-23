/**
 * The school year of whichever school is open — read at call time.
 *
 * ---- WHAT THIS FILE WAS, AND WHY IT IS NOW ONLY A BINDING (Sept 22, 2026) ----
 *
 * Until today this file held one family's first day of school, typed in as a
 * Date, and one family's four themed quarter names. Every school inherited
 * both. The calendar went back to the school that owns it, and the rules moved
 * to src/content/slots/schoolYear.js, where every one of them takes the
 * school's answer as its first argument and nothing is assumed.
 *
 * What is left is the platform's vocabulary — "quarter", the word its screens
 * and saved rows already use for a period — bound to the school that is open
 * NOW, so the 24 files that read it did not have to change shape. Nothing here
 * is evaluated at module scope: a school is read on every call, never cached,
 * because the school can change on sign-in.
 *
 * Two names changed, both because the old name carried a school's calendar:
 *
 *   SCHOOL_YEAR_START_DATE   a constant; now schoolYearStartDate(), and
 *                            schoolYearStartKey() for the 'YYYY-MM-DD' form.
 *                            Either is null for a school that has not said.
 *   isSummerBatchLabel       now isCalendarYearBatchLabel — a period labelled
 *                            by the calendar year it falls in. Which period
 *                            that is, and what it is called, is the school's.
 */
import { academyContent } from '../content/academyContent.js';
import {
  schoolYearStart, hasSchoolStarted as slotHasSchoolStarted, currentPeriod,
  isSpanLabel, isCalendarYearLabel, groupByPeriod, periodRank, periodSchoolYear,
  absolutePeriodRank, periodDateRange, periodOpensOn, isPeriodOpen
} from '../content/slots/schoolYear.js';

/** The open school's first day, as a fresh local-midnight Date, or null. */
export const schoolYearStartDate = () => schoolYearStart(academyContent());

/** The open school's first day as 'YYYY-MM-DD' in local time, or null. */
export function schoolYearStartKey() {
  const d = schoolYearStartDate();
  if (!d) return null;
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export const hasSchoolStarted = (...args) => slotHasSchoolStarted(academyContent(), ...args);
export const getCurrentQuarter = (...args) => currentPeriod(academyContent(), ...args);
export const isQuarterlyBatchLabel = (...args) => isSpanLabel(academyContent(), ...args);
export const isCalendarYearBatchLabel = (...args) => isCalendarYearLabel(academyContent(), ...args);
export const groupByQuarter = (...args) => groupByPeriod(academyContent(), ...args);
export const quarterRank = (...args) => periodRank(academyContent(), ...args);
export const quarterSchoolYear = (...args) => periodSchoolYear(academyContent(), ...args);
export const absoluteQuarterRank = (...args) => absolutePeriodRank(academyContent(), ...args);
export const getQuarterDateRange = (...args) => periodDateRange(academyContent(), ...args);
export const quarterOpensOn = (...args) => periodOpensOn(academyContent(), ...args);
export const isQuarterAvailable = (...args) => isPeriodOpen(academyContent(), ...args);
