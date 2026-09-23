/**
 * HIS SCHOOL YEAR — the first day and the four themed quarters plus Summer.
 *
 * ---- MOVED HERE Sept 22, 2026 ----
 *
 * These lived in src/lib/schoolQuarter.js, in the platform, where every school
 * that ever booted inherited his first day and his quarter names. The rules
 * that read them — which period a date is in, how a row is labelled, what is
 * open yet — moved to src/content/slots/schoolYear.js. The calendar stayed his
 * and came here.
 *
 * ---- WHAT THE ORIGINAL FILE SAID ABOUT THIS CALENDAR (kept verbatim in sense) ----
 *
 * Four themed quarters during the regular school year, plus Summer as its own
 * distinct period — not folded into Q4, and not treated as a break.
 *
 * Boundaries verified directly against the real district calendar for
 * 2026-2027 (parent-provided): school year runs Aug 3, 2026 (first day)
 * through May 26, 2027 (last day); June-July is summer. Month-level boundaries
 * are used rather than the exact first/last day, since the few days at each
 * edge (e.g. Aug 1-2, or May 27-31) have no real instructional difference
 * either way — but the school year's real END (May, not July) was a genuine
 * bug in an earlier version, which had extended Q4 through July to avoid
 * leaving any month unassigned. Fixed: Q4 ends at April-May, and Summer
 * (June-July) is its own tracked period with its own pace.
 *
 * Confirmed with the parent: Summer keeps the SAME simultaneous model as the
 * regular school year (all Khan Academy subjects together, not sequential),
 * just at a lighter pace — 3 school days/week instead of 5. Real school-day
 * counts against the actual 2026-2027 calendar (holidays/breaks subtracted):
 * Q1 ~58 days (~12 lessons/subject at ~1 unit/week), Q2 ~30 days (~6 lessons),
 * Q3 ~56 days (~11 lessons), Q4 ~35 days (~7 lessons), Summer ~26
 * instructional days at the 3-day/week pace (~5 lessons). These targets guide
 * how many lessons get planned per subject per period — confirmed directly
 * with the parent, not assumed.
 *
 * For future school years: exact holiday/break dates shift year to year —
 * re-verify against that year's real district calendar before relying on the
 * lesson-count targets above. The month-based periods should remain a
 * reasonable approximation without changes each year; FIRST_DAY will not.
 *
 * ---- WHY FIRST_DAY IS SEPARATE FROM THE MONTHS ----
 *
 * The months treat Aug 1-2 as already Q1 purely for LABELLING. FIRST_DAY
 * answers a different question the parent raised directly: should lessons be
 * ACCESSIBLE at all before the real first day? No — so it gates the Lesson
 * Roster and the Khan Academy assignments, and relabels nothing.
 *
 * ---- WHY SUMMER IS 'calendar' ----
 *
 * Its rows are labelled 'Summer 2027', not 'Summer 2026-2027': it is a lighter
 * continuation of the same subjects rather than another themed quarter in the
 * elective rotation. Saved rows carry that format, so it must not change.
 */

/** Aug 3, 2026 — his real first day, confirmed against the district calendar. */
export const FIRST_DAY = '2026-08-03';

export const PERIODS = [
  { id: 'Q1', label: 'Becoming an Engineer', months: [8, 9, 10] },
  { id: 'Q2', label: 'Building & Creating', months: [11, 12] },
  { id: 'Q3', label: 'Innovation', months: [1, 2, 3] },
  { id: 'Q4', label: 'Leadership & Life', months: [4, 5] },
  { id: 'Summer', label: 'Summer Session', months: [6, 7], labelYear: 'calendar' }
];
