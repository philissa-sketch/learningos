/**
 * Maps a date to the school-year period structure for this platform
 * (see PROJECT_PLAN.md Part 0/5): four themed quarters during the
 * regular school year, plus Summer as its own distinct period — not
 * folded into Q4, and not treated as a break.
 *
 * Boundaries verified directly against the real Clayton County Public
 * Schools 2026-2027 calendar (parent-provided): school year runs
 * Aug 3, 2026 (first day) through May 26, 2027 (last day); June-July is
 * summer. Month-level boundaries are used here rather than the exact
 * first/last day, since the few days at each edge (e.g. Aug 1-2, or
 * May 27-31) have no real instructional difference either way — but
 * the school year's real END (May, not July) was a genuine bug in an
 * earlier version of this file, which had extended Q4 through July to
 * avoid leaving any month unassigned. Fixed: Q4 now correctly ends at
 * April-May, and Summer (June-July) is its own tracked period with its
 * own pace, not absorbed into Q4.
 *
 * Confirmed with the parent: Summer keeps the SAME simultaneous model
 * as the regular school year (all Khan Academy subjects together, not
 * sequential), just at a lighter pace — 3 school days/week instead of
 * 5. Real school-day counts, calculated against the actual 2026-2027
 * calendar (holidays/breaks subtracted): Q1 ~58 days (~12 lessons/
 * subject at ~1 unit/week), Q2 ~30 days (~6 lessons), Q3 ~56 days
 * (~11 lessons), Q4 ~35 days (~7 lessons), Summer ~26 instructional
 * days at the 3-day/week pace (~5 lessons). These targets should guide
 * how many lessons get planned per subject per period — confirmed
 * directly with the parent, not assumed.
 *
 * Note for future school years: exact holiday/break dates shift year to
 * year — re-verify against that year's real district calendar before
 * relying on the specific lesson-count targets above, though the
 * month-based period boundaries below should remain a reasonable
 * approximation without needing code changes each year.
 */

const PERIODS = [
  { id: 'Q1', label: 'Becoming an Engineer', months: [8, 9, 10] },
  { id: 'Q2', label: 'Building & Creating', months: [11, 12] },
  { id: 'Q3', label: 'Innovation', months: [1, 2, 3] },
  { id: 'Q4', label: 'Leadership & Life', months: [4, 5] },
  { id: 'Summer', label: 'Summer Session', months: [6, 7] }
];

// The real, exact first day of school (confirmed against the actual
// Clayton County Public Schools 2026-2027 calendar) — distinct from the
// month-level PERIODS boundaries above. Those intentionally treat the
// few days right at each edge (e.g. Aug 1-2) as already "Q1" purely for
// QUARTER-LABELING purposes, since it doesn't matter which quarter a
// Khan Academy batch is filed under a day or two early. This constant
// answers a different, real question the parent raised directly: should
// lessons be ACCESSIBLE/completable at all before the real first day —
// answer is no, so this is used to gate the Lesson Roster and Khan
// Academy assignments, not to relabel anything.
export const SCHOOL_YEAR_START_DATE = new Date(2026, 7, 3); // August 3, 2026

export function hasSchoolStarted(date = new Date()) {
  return date.getTime() >= SCHOOL_YEAR_START_DATE.getTime();
}

export function getCurrentQuarter(date = new Date()) {
  const month = date.getMonth() + 1; // JS months are 0-indexed
  const calendarYear = date.getFullYear();
  const period = PERIODS.find((p) => p.months.includes(month));

  // Aug-Dec (Q1/Q2) belong to the school year starting THIS calendar
  // year; Jan-Jul (Q3/Q4/Summer) belong to the school year that started
  // LAST calendar year — e.g. June 2027 is still part of "2026-2027."
  const schoolYearStart = month >= 8 ? calendarYear : calendarYear - 1;
  const schoolYearLabel = `${schoolYearStart}-${schoolYearStart + 1}`;

  // Summer uses a distinct batchLabel format ("Summer 2027") rather than
  // the quarter format ("Q1 2026-2027") — it's not another themed
  // quarter in the same elective-rotation sense as Q1-Q4, just a
  // lighter-pace continuation of the same core subjects.
  const batchLabel =
    period.id === 'Summer' ? `Summer ${schoolYearStart + 1}` : `${period.id} ${schoolYearLabel}`;

  return {
    id: period.id,
    label: period.label,
    schoolYearLabel,
    batchLabel
  };
}

/** True if a batchLabel matches the "Q1 2026-2027" quarterly format. */
export function isQuarterlyBatchLabel(batchLabel) {
  return /^Q[1-4] \d{4}-\d{4}$/.test(batchLabel || '');
}

/** True if a batchLabel matches the "Summer 2027" format. */
export function isSummerBatchLabel(batchLabel) {
  return /^Summer \d{4}$/.test(batchLabel || '');
}

/**
 * Groups a list of rows (each with a `batchLabel`) by period (quarter or
 * summer), with non-period (legacy, pre-quarterly-system) rows grouped
 * under "Earlier" and always sorted last. Pure function — components
 * should call this directly against reactively-selected state rather
 * than through a Zustand store getter, since a getter function's
 * reference never changes and won't trigger a re-render when the
 * underlying data does (confirmed as a real bug during testing, not
 * theoretical).
 */
export function groupByQuarter(rows) {
  const groups = {};
  for (const row of rows) {
    const isRecognizedPeriod = isQuarterlyBatchLabel(row.batchLabel) || isSummerBatchLabel(row.batchLabel);
    const key = isRecognizedPeriod ? row.batchLabel : 'Earlier';
    groups[key] ??= [];
    groups[key].push(row);
  }
  return Object.entries(groups).sort(([a], [b]) => {
    if (a === 'Earlier') return 1;
    if (b === 'Earlier') return -1;
    return a.localeCompare(b);
  });
}

/**
 * Rank a period id so quarters can be compared chronologically.
 * Q1 < Q2 < Q3 < Q4 < Summer, matching the real school year order.
 */
const PERIOD_RANK = { Q1: 1, Q2: 2, Q3: 3, Q4: 4, Summer: 5 };

/**
 * Rank a lesson's `quarter` string ("Q2 2026-2027" / "Summer 2027").
 * Returns null for lessons with no quarter tag — the Trailblazer
 * biographies, deliberately untagged as a browsable library.
 */
export function quarterRank(quarterLabel) {
  if (typeof quarterLabel !== 'string') return null;
  const id = quarterLabel.startsWith('Summer') ? 'Summer' : (quarterLabel.match(/^Q(\d)/) ? quarterLabel.slice(0, 2) : null);
  return id ? PERIOD_RANK[id] ?? null : null;
}

/**
 * Which SCHOOL YEAR a quarter label belongs to, as the starting calendar year.
 *
 * "Q2 2026-2027" -> 2026. "Summer 2027" -> 2026, because summer 2027 is the
 * tail of the 2026-2027 year, exactly as getCurrentQuarter labels it.
 * Returns null for an untagged label.
 */
export function quarterSchoolYear(quarterLabel) {
  if (typeof quarterLabel !== 'string') return null;
  const quarterly = quarterLabel.match(/^Q[1-4] (\d{4})-\d{4}$/);
  if (quarterly) return Number(quarterly[1]);
  const summer = quarterLabel.match(/^Summer (\d{4})$/);
  if (summer) return Number(summer[1]) - 1;
  return null;
}

/**
 * Ranked position of a quarter across YEARS, not just within one.
 *
 * ---- THE YEAR-2 BUG THIS FIXES (found Aug 9, 2026) ----
 *
 * `quarterRank` deliberately ignores the school year, which was correct while
 * only one year of curriculum existed and quietly wrong the moment a second
 * one did. This platform is meant to carry a twelve-year-old through to
 * college applications; on 1 August 2027 the old rule would have done two
 * things, both bad:
 *
 *   1. Every unmastered Q2/Q3/Q4 lesson from 2026-2027 would RE-LOCK. The
 *      current period becomes Q1 (rank 1), the lesson is Q2 (rank 2), 2 > 1,
 *      so it is "ahead of schedule" — and work he simply had not finished
 *      yet becomes work he is not allowed to finish. The one case the
 *      original note says must never happen ("a student who is BEHIND still
 *      needs to finish an earlier quarter's unmastered lessons") is precisely
 *      the case that would break.
 *   2. Next year's content would be indistinguishable from this year's, so
 *      "Q1 2027-2028" would unlock during Q1 2026-2027 — a whole year early.
 *
 * Ranking on (school year, period) rather than (period) alone fixes both with
 * the same comparison, and the "at or before" rule keeps its original meaning:
 * anything from a past year is always available, and nothing from a future
 * year ever is.
 */
export function absoluteQuarterRank(quarterLabel) {
  const within = quarterRank(quarterLabel);
  if (within === null) return null;
  const year = quarterSchoolYear(quarterLabel);
  // A label with a period but no parseable year (legacy rows tagged just
  // "Q2") is treated as belonging to the current year, which is how it has
  // always behaved — this change must not retroactively lock old content.
  const resolvedYear = year ?? quarterSchoolYear(getCurrentQuarter().batchLabel) ?? 0;
  return resolvedYear * 10 + within;
}

/**
 * First and last calendar day of the period containing `date`, as YYYY-MM-DD.
 *
 * Month-level, matching PERIODS above — the few days at each edge make no
 * instructional difference, and this is used for counting a quarter's work,
 * not for gating anything.
 */
export function getQuarterDateRange(date = new Date()) {
  const month = date.getMonth() + 1;
  const calendarYear = date.getFullYear();
  const period = PERIODS.find((p) => p.months.includes(month));
  const firstMonth = period.months[0];
  const lastMonth = period.months[period.months.length - 1];
  // Aug-Dec sit in the calendar year the school year started; Jan-Jul sit in
  // the following one. Every period's months fall inside a single calendar
  // year, so one year value is enough for both ends.
  const year = calendarYear;
  const pad = (n) => String(n).padStart(2, '0');
  const lastDay = new Date(year, lastMonth, 0).getDate(); // day 0 of next month
  return {
    id: period.id,
    start: `${year}-${pad(firstMonth)}-01`,
    end: `${year}-${pad(lastMonth)}-${pad(lastDay)}`
  };
}

/**
 * Is this lesson's quarter at or before the current period?
 *
 * Added Aug 6, 2026 for a real bug the parent caught: "Why is genealogy
 * even being shown when that isnt to be completed until qtr 2?"
 *
 * `getTodaysMission` served the next unmastered lesson in plain array
 * order and ignored `quarter` completely. That happened to look right
 * while every subject's first lessons were also its Q1 lessons — and
 * broke the moment Social Studies was re-quartered, since Q1 then had no
 * Mission Control lessons and the engine reached forward into Q2's
 * genealogy block. The same latent bug let a fast student run straight
 * into Q4 Aerospace content during Q1.
 *
 * "At or before" rather than "equals" on purpose: a student who is
 * BEHIND still needs to finish an earlier quarter's unmastered lessons,
 * and blocking those would strand him. Only running AHEAD is prevented.
 *
 * Khan Academy assignments already filtered by period this way
 * (KhanAcademyMissionsCard). This brings Mission Control's own lessons
 * onto the same rule, so both halves of a subject behave alike.
 */
/**
 * The first day of a quarter, from its batch label. 'Q2 2026-2027' -> Nov 1 2026.
 *
 * Added Aug 16, 2026, so a locked lesson can say WHEN it opens instead of only
 * that it is locked. Q1 and Q2 fall in the calendar year the school year began;
 * Q3, Q4 and Summer fall in the next one — the same split absoluteQuarterRank
 * already reasons about, kept in one place rather than re-derived at the call
 * site. Returns null for an untagged lesson, which is never gated anyway.
 */
export function quarterOpensOn(quarterLabel) {
  const year = quarterSchoolYear(quarterLabel);
  if (year === null) return null;
  const id = typeof quarterLabel === 'string' && quarterLabel.startsWith('Summer')
    ? 'Summer'
    : String(quarterLabel).split(' ')[0];
  const period = PERIODS.find((x) => x.id === id);
  if (!period) return null;
  const firstMonth = period.months[0];
  // Aug-Dec belong to the starting calendar year; Jan-Jul to the next.
  const calendarYear = firstMonth >= 8 ? year : year + 1;
  return `${calendarYear}-${String(firstMonth).padStart(2, '0')}-01`;
}

export function isQuarterAvailable(quarterLabel, date = new Date()) {
  const lessonRank = absoluteQuarterRank(quarterLabel);
  if (lessonRank === null) return true; // untagged (Trailblazer library) — never gated
  // Year-aware since Aug 9, 2026 — see absoluteQuarterRank for the two ways
  // the year-blind comparison broke on the first day of the second year.
  const currentRank = absoluteQuarterRank(getCurrentQuarter(date).batchLabel) ?? 0;
  return lessonRank <= currentRank;
}
