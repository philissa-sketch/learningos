import { toDateStr, parseDateStr, todayDateStr } from '../../../../lib/scheduler.js';

/**
 * Georgia homeschool compliance — PROJECT_PLAN.md Part 8's "State
 * compliance checklist (Georgia)," which the plan itself flagged as
 * needing "its own research pass to get the specific requirements right
 * before building."
 *
 * THAT RESEARCH PASS WAS DONE (Aug 5, 2026) rather than written from
 * memory. Every requirement below was verified against two independent
 * sources that agree: HSLDA's Georgia compliance guide and the Georgia
 * Home Education Association's summary of O.C.G.A. § 20-2-690. Each item
 * carries its own `source` so any claim can be checked, and so a future
 * session can re-verify rather than trusting this file.
 *
 * THIS IS NOT LEGAL ADVICE, and the UI says so. Homeschool law changes,
 * and a parent should confirm against the current statute or the Georgia
 * DOE before relying on any of it. What this file is: an honest,
 * sourced checklist so she is not reconstructing the requirements from
 * memory every August.
 *
 * WHAT IS DELIBERATELY NOT CLAIMED: nothing here reports anything to the
 * state, files anything, or verifies that she has complied. It tracks
 * what she says she has done, and shows what this app can already
 * evidence from real recorded data.
 */

export const GEORGIA_LAW_CITATION = 'O.C.G.A. § 20-2-690';

const HSLDA = 'https://hslda.org/post/how-to-comply-with-georgias-homeschool-law';
const GHEA = 'https://ghea.org/georgia-law/';

/**
 * `evidence` names what in THIS APP can support the requirement, or null
 * where the app genuinely holds nothing — an honest checklist has to
 * admit which boxes it cannot help with.
 */
export const GEORGIA_REQUIREMENTS = [
  {
    id: 'declaration-of-intent',
    title: 'File the Declaration of Intent',
    detail:
      'Filed with the Georgia Department of Education within 30 days of starting a home study program, and every year after that by September 1. Includes each student\'s name and age, where the program is located, your local school system, and the 12-month period your school year covers.',
    cadence: 'annual',
    dueMonth: 9,
    dueDay: 1,
    evidence: null,
    evidenceNote: 'Filed with the state directly — this app cannot do it for you, only remind you.',
    source: HSLDA
  },
  {
    id: 'instruction-days',
    title: '180 days of instruction, at least 4.5 hours each',
    detail:
      'The program must provide the equivalent of 180 school days per year, each at least four and a half hours, unless the child is physically unable to comply.',
    cadence: 'ongoing',
    evidence: 'attendance',
    evidenceNote: 'The Attendance section tracks days with real recorded activity and foreground time.',
    source: GHEA
  },
  {
    id: 'required-subjects',
    title: 'Teach the five required subjects',
    detail:
      'Reading, language arts, mathematics, social studies, and science. Other subjects may be added, but these five are the legal minimum.',
    cadence: 'ongoing',
    evidence: 'subjects',
    evidenceNote: 'Checked against the subjects this app is actually running.',
    source: GHEA
  },
  {
    id: 'annual-progress-reports',
    title: 'Write an annual progress report for each required subject',
    detail:
      'A written report on the student\'s progress in each of the five required subjects, once a year. It is NOT submitted to anyone — but it must be kept in your records for at least three years.',
    cadence: 'annual',
    evidence: 'report-card',
    evidenceNote: 'The Report Card and Gradebook hold real per-subject grades to write the report from.',
    source: HSLDA
  },
  {
    id: 'standardized-testing',
    title: 'Standardized test at least every three years',
    detail:
      'Beginning at the end of 3rd grade, the student takes a nationally standardized test at least every three years, administered in consultation with someone trained in giving and interpreting norm-referenced tests. Results are NOT submitted to the state — you keep them.',
    cadence: 'triennial',
    evidence: 'test-records',
    evidenceNote: 'Record results in the Records section so the three-year clock is visible.',
    source: HSLDA
  },
  {
    id: 'teacher-qualification',
    title: 'Teaching parent holds a high school diploma or GED',
    detail:
      'The parent or guardian doing the teaching — and any tutor used — must have at least a high school diploma or a GED.',
    cadence: 'once',
    evidence: null,
    evidenceNote: 'A one-time fact about you, not something the app can or should verify.',
    source: GHEA
  },
  {
    id: 'record-retention',
    title: 'Keep records for at least three years',
    detail:
      'Attendance records, progress reports, and test results are kept by you, not filed with anyone. Three years is the minimum retention.',
    cadence: 'ongoing',
    evidence: 'export',
    evidenceNote: 'Use the compliance packet below, and keep a copy outside this app.',
    source: HSLDA
  }
];

/** The five subjects Georgia actually names, mapped to this app's ids. */
export const GEORGIA_REQUIRED_SUBJECTS = [
  { law: 'Reading', subjectIds: ['reading'] },
  { law: 'Language arts', subjectIds: ['reading'] }, // merged into English Language Arts, Aug 6 2026
  { law: 'Mathematics', subjectIds: ['math'] },
  { law: 'Social studies', subjectIds: ['socialStudies'] },
  { law: 'Science', subjectIds: ['science'] }
];

/**
 * The next September 1 deadline as a real local date.
 *
 * If today is on or before September 1 this year, that's the deadline;
 * otherwise it rolls to next year. Built from local Date parts and
 * toDateStr — never toISOString, which could shift the date across a
 * timezone boundary and misreport a legal deadline by a day.
 */
export function nextDeclarationDeadline(today = todayDateStr()) {
  const year = Number(today.slice(0, 4));
  const thisYear = toDateStr(new Date(year, 8, 1)); // September = month index 8
  return today <= thisYear ? thisYear : toDateStr(new Date(year + 1, 8, 1));
}

/**
 * WHICH SCHOOL YEAR A DATE BELONGS TO.
 *
 * ---- WHY THIS EXISTS (Aug 26, 2026) ----
 *
 * The parent confirmed she filed the Declaration of Intent for 2026-27, which
 * sent me to check the banner agreed with her. It did — and the rule underneath
 * it was wrong in a way that would only ever show up a year later.
 *
 * The banner asked *"was this ticked after LAST September 1?"* For a filing
 * made in August, as hers was, that is right. For a filing made even two days
 * LATE — September 3, which is not an exotic thing to do — it says the
 * following August that the Declaration is already filed. It is not. It was
 * last year's, filed late, and the app would sit green through a deadline she
 * had actually missed.
 *
 * A false "due" is a nudge. A false "filed" is a missed legal filing, so this
 * errs toward asking again.
 *
 * THE RULE INSTEAD: a date belongs to the school year that was running when it
 * happened. July onward is the year starting that August; January to June is
 * the year that began the previous August. Two filings are for the same school
 * year only when they land in the same one of those windows — which is what
 * "filed for this year" has always meant, and never what it asked.
 */
export function declarationSchoolYear(dateStr) {
  if (!dateStr) return null;
  const year = Number(String(dateStr).slice(0, 4));
  const month = Number(String(dateStr).slice(5, 7)); // 1-12
  return month >= 7 ? year : year - 1;
}

/** Does a Declaration ticked on `filedAt` cover the school year `today` is in? */
export function declarationCoversToday(filedAt, today = todayDateStr()) {
  const filedYear = declarationSchoolYear(String(filedAt || '').slice(0, 10));
  if (filedYear === null) return false;
  return filedYear === declarationSchoolYear(today);
}

export function daysUntil(dateStr, today = todayDateStr()) {
  return Math.round((parseDateStr(dateStr) - parseDateStr(today)) / 86400000);
}

/**
 * Progress against the 180-day / 4.5-hour requirement, from real
 * attendance data.
 *
 * `fullDays` counts only days that actually met the 4.5-hour bar, which
 * is the number the law cares about — reporting total days logged would
 * flatter the record. Both are returned so the difference is visible
 * rather than hidden.
 *
 * OFFLINE MINUTES (added August 6, 2026, from the first-week readiness
 * pass). The app counts a minute only while its own tab is in the
 * foreground. That was correct as far as it went, and chronically wrong
 * as a picture of the school day: Khan Academy is where the core
 * academics actually happen, and reading a physical book, PE, a field
 * trip, a lab and a hands-on build are all real instruction that this
 * app never sees.
 *
 * Left alone, "Met 4.5 Hours" would have read near zero against "Days
 * Logged: 180" for the whole year — a parent glancing at that could
 * reasonably conclude her records were deficient when they were fine.
 * Georgia counts real instruction, not app time.
 *
 * The fix is to let her record what happened away from the screen, NOT
 * to loosen the bar. `offlineMinutes` is a number she enters; it is
 * added to app-recorded time for the 4.5-hour test and reported
 * separately so the two never get confused for one another.
 */
export const GEORGIA_DAYS_REQUIRED = 180;
export const GEORGIA_MINUTES_PER_DAY = 270;

/**
 * Total instruction minutes for one attendance row.
 *
 * ---- THREE SOURCES, AND WHY THEY ARE NOT ALL ADDED (Aug 16, 2026) ----
 *
 *   activeMinutes     MEASURED   every minute this tab was visible
 *   scheduledMinutes  SCHEDULED  the timetable blocks his completed work covers
 *   offlineMinutes    ENTERED    hours she types in for work away from a screen
 *
 * The parent: "Lamar goes by the scheduler for his school day. when he selects
 * that he's done the time should be entered." Exactly right — the app cannot
 * see Khan Academy, but it has always known that Mathematics is 09:00-10:00
 * because she said so.
 *
 * **The measured and the scheduled minutes are two views of the SAME hours, so
 * the record takes the larger of the two rather than the sum.** He does Khan in
 * another tab during the 60-minute maths block: measured says 5, scheduled says
 * 60, and the truth is 60 — not 65. He spends 90 minutes in this app during a
 * 60-minute block: measured says 90, and adding the scheduled 60 on top would
 * invent half an hour.
 *
 * offlineMinutes is added, because it is the one source that is disjoint by
 * definition — it exists precisely to record instruction that happened where
 * neither the tab nor the timetable was watching.
 */
export function instructionMinutes(row = {}, scheduledMinutes = 0) {
  const onScreen = row.activeMinutes || 0;
  const scheduled = scheduledMinutes || row.scheduledMinutes || 0;
  return Math.max(onScreen, scheduled) + (row.offlineMinutes || 0);
}

/**
 * ---- WHICH DAYS ARE EVEN ELIGIBLE (Aug 16, 2026) ----
 *
 * The parent: "check the hourly counter for the GA school days. its not
 * imputting the hrs correctly."
 *
 * She was right, and the cause was not the arithmetic. It counted **every
 * attendance row it had**, and rows are created by a one-minute timer in
 * App.jsx that fires whenever the tab is visible — on any day, on either
 * computer. So her record claimed, toward Georgia's 180:
 *
 *     8 days BEFORE the school year began   (Jul 24 - Aug 2; school starts Aug 3)
 *     4 weekend days                        (incl. two the board itself labelled
 *                                            "No classes today")
 *
 * Of the seven days reported as meeting the 4.5-hour bar, **four were a
 * Saturday, a Sunday, another Saturday, and a day in July.** A records packet
 * naming Saturday July 25th as a Georgia school day is not a generous record;
 * it is one a reviewer stops trusting at the first line.
 *
 * A day is eligible when the school calendar says school was in session — and
 * ALSO when she has entered offline minutes for it, because that is her
 * explicit statement that instruction happened, and a homeschool may
 * legitimately teach on a Saturday. Screen time alone on a day off is not a
 * statement about anything.
 *
 * What is excluded is counted and returned, never silently dropped: a number
 * that quietly got smaller is worse than one that explains itself.
 */
export function isEligibleSchoolDay(date, row = {}, { schoolYearStart, isSchoolDay } = {}, scheduledMinutes = 0) {
  if (!date) return false;
  if (schoolYearStart && date < schoolYearStart) return false;
  /**
   * ---- AN ASSERTION BEATS THE CALENDAR; PASSIVE SCREEN TIME DOES NOT ----
   *
   * The parent asked what happens when he has a dental appointment on Thursday
   * and does the work afterwards — or on the weekend. The answer has to be that
   * it counts, because it happened.
   *
   * Two of the three minute sources are DELIBERATE STATEMENTS that instruction
   * took place: offlineMinutes, which she types, and scheduledMinutes, which
   * exist only because he ticked a subject done or a log row was written. Both
   * make a day count whatever the calendar says a Saturday is.
   *
   * activeMinutes is the one that does NOT, and that distinction is the whole
   * fix from earlier today: a tab left open on a Sunday is not a school day,
   * and three of those were being counted as full ones.
   */
  if ((row.offlineMinutes || 0) > 0) return true;
  if (scheduledMinutes > 0) return true;
  return isSchoolDay ? isSchoolDay(date) : true;
}

export function instructionProgress(allAttendance = {}, options = {}) {
  const scheduledBy = options.scheduledMinutesByDate || {};
  const entries = Object.entries(allAttendance).map(([date, row]) => {
    const d = row?.date || date;
    return { date: d, row: row || {}, scheduled: scheduledBy[d] || 0 };
  });

  const eligible = [];
  let excludedBeforeStart = 0;
  let excludedNonSchoolDays = 0;
  for (const { date, row, scheduled } of entries) {
    if (options.schoolYearStart && date < options.schoolYearStart) {
      if (instructionMinutes(row, scheduled) > 0) excludedBeforeStart += 1;
      continue;
    }
    if (!isEligibleSchoolDay(date, row, options, scheduled)) {
      if (instructionMinutes(row, scheduled) > 0) excludedNonSchoolDays += 1;
      continue;
    }
    // Carried on the row from here down so every total below sees the same number.
    eligible.push({ ...row, scheduledMinutes: scheduled });
  }

  const daysLogged = eligible.filter(
    (r) =>
      (r.lessonsCompleted || 0) + (r.writingEntries || 0) + (r.typingSessions || 0) > 0 ||
      instructionMinutes(r) > 0
  ).length;
  const fullDays = eligible.filter((r) => instructionMinutes(r) >= GEORGIA_MINUTES_PER_DAY).length;

  // Reported separately on purpose. Merging them would hide how much of
  // the record is measured versus entered by hand, and that distinction
  // is exactly what makes the number trustworthy.
  const appMinutes = eligible.reduce((n, r) => n + (r.activeMinutes || 0), 0);
  const offlineMinutes = eligible.reduce((n, r) => n + (r.offlineMinutes || 0), 0);
  const scheduledMinutes = eligible.reduce((n, r) => n + (r.scheduledMinutes || 0), 0);

  /**
   * Days that were school days and fell short. This is the number she can
   * actually act on — every one is a day where real instruction happened and
   * the app could only see part of it, because Khan Academy, a book, PE and a
   * field trip all happen somewhere this app cannot watch.
   */
  const shortDays = eligible.filter(
    (r) => instructionMinutes(r) > 0 && instructionMinutes(r) < GEORGIA_MINUTES_PER_DAY
  ).length;

  return {
    daysLogged,
    fullDays,
    shortDays,
    appMinutes,
    offlineMinutes,
    scheduledMinutes,
    excludedBeforeStart,
    excludedNonSchoolDays,
    required: GEORGIA_DAYS_REQUIRED,
    remaining: Math.max(0, GEORGIA_DAYS_REQUIRED - daysLogged)
  };
}
