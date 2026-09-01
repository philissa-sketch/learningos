import { toDateStr, parseDateStr } from './scheduler.js';
import { instructionMinutes } from './instructionTime.js';
import { academyContent } from '../content/academyContent.js';

const { GEORGIA_DAYS_REQUIRED, findProposal, missionScoreTotals } = academyContent().compliance;
const { holidaysInSpan, isSchoolDay } = academyContent().timetable;

/**
 * Annual and semester planning — PROJECT_PLAN.md Part 8.
 *
 * ONE MODULE, TWO ZOOM LEVELS. The plan lists "annual homeschool
 * planner" and "semester planner" as separate items, but they are the
 * same view over the same data at different resolutions. Building them
 * separately would mean two places to fix when a quarter's dates change,
 * and they would drift.
 *
 * NOT A NEW PLANNING SYSTEM. Everything below is derived from what the
 * app already holds — quarters, lessons, assignments, books, missions,
 * attendance. There is deliberately nothing here for her to fill in: a
 * planner that needs maintaining is a planner that goes stale by
 * October, and she has a business to run. The value is seeing the year
 * laid out, not typing it in.
 */

/**
 * Real quarter date spans for the 2026-2027 year.
 *
 * Dates rather than the month-buckets in schoolQuarter.js PERIODS: those
 * exist to LABEL a Khan Academy batch and treat Aug 1-2 as Q1, which is
 * fine for filing. A planner draws boxes on a calendar and needs real
 * edges. Q1 starts on the real first day of school (August 3, 2026,
 * confirmed against the district calendar), and Q4 ends where the
 * assignment due-window logic already ends the year.
 */
export const QUARTER_SPANS = [
  { id: 'Q1', label: 'Becoming an Engineer', batchLabel: 'Q1 2026-2027', start: '2026-08-03', end: '2026-10-30' },
  // Q2 RAN TO DEC 18 UNTIL AUG 9 2026, and Q3 began Jan 5, which threw away
  // Dec 21 - Jan 4 entirely: eleven weekdays, nine of them core days, gone
  // because the spans were drawn around a district calendar this family does
  // not follow. The parent: "we will take the actual holiday off for rest but
  // not the weeks." Christmas Day is off (see schoolHolidays.js); the rest of
  // that fortnight is school. Recovering it takes Q2 from 28 core sessions to
  // 36 and is most of the fix for Q2 being the one quarter with more lessons
  // than sessions to teach them in.
  { id: 'Q2', label: 'Building & Creating', batchLabel: 'Q2 2026-2027', start: '2026-11-02', end: '2026-12-31' },
  // Jan 4 is the Monday. Jan 1 is a holiday and Q2 owns Dec 31, so this is the
  // first instructional day of the new year with nothing skipped between them.
  // Mar 29 - Apr 2 belongs to NEITHER quarter, and that is deliberate as of
  // Aug 9 2026: it is the year's one spring break. This is not the same rule as
  // Thanksgiving and Christmas, where the parent takes the day and works the
  // week -- it is a rest week ruled on directly, and the year still clears
  // Georgia's 180 by a wide margin without it. Do not "close" this gap.
  { id: 'Q3', label: 'Innovation', batchLabel: 'Q3 2026-2027', start: '2027-01-04', end: '2027-03-26' },
  // ENDED MAY 28 UNTIL AUG 9 2026, against a gardening calendar that had said
  // May 26 was the last day since it was built. Two calendars, one of them
  // wrong, and nothing checking. May 26 is the last day of school.
  { id: 'Q4', label: 'Leadership & Life', batchLabel: 'Q4 2026-2027', start: '2027-04-05', end: '2027-05-26' },
  { id: 'Summer', label: 'Summer Session', batchLabel: 'Summer 2027', start: '2027-06-07', end: '2027-07-31' }
];

/**
 * Semesters. Summer sits outside both on purpose — it is a lighter
 * continuation, not a third semester, and folding it into Spring would
 * inflate that semester's day count against Georgia's 180.
 */
export const SEMESTERS = [
  { id: 'fall', label: 'Fall Semester', quarters: ['Q1', 'Q2'] },
  { id: 'spring', label: 'Spring Semester', quarters: ['Q3', 'Q4'] }
];

export function quarterSpan(id) {
  return QUARTER_SPANS.find((q) => q.id === id || q.batchLabel === id) || null;
}

/**
 * Real instructional days between two dates, inclusive.
 *
 * COUNTED MON-FRI WITH NO HOLIDAY SUBTRACTED UNTIL AUG 9 2026. That made every
 * number downstream of it — the planner, the Georgia 180-day margin, the
 * per-quarter session counts the curriculum is paced against — optimistic by
 * exactly the number of holidays in the span. Eight weekday holidays fall
 * inside Aug 3 - May 28, so the year was being reported eight days longer than
 * it is.
 */
export function schoolDaysBetween(startDateStr, endDateStr) {
  const cursor = parseDateStr(startDateStr);
  const end = parseDateStr(endDateStr);
  let count = 0;
  while (cursor <= end) {
    if (isSchoolDay(cursor)) count += 1;
    cursor.setDate(cursor.getDate() + 1);
  }
  return count;
}

/** The named days off inside a span — what schoolDaysBetween just subtracted. */
export function holidaysBetween(startDateStr, endDateStr) {
  return holidaysInSpan(startDateStr, endDateStr);
}

function withinSpan(dateStr, span) {
  if (!dateStr) return false;
  const d = dateStr.slice(0, 10);
  return d >= span.start && d <= span.end;
}

/**
 * The year, quarter by quarter.
 *
 * `status` is computed from today rather than stored, so it can never be
 * stale — a planner whose "current quarter" has to be advanced by hand
 * is wrong within a week of anyone forgetting.
 */
export function buildYearPlan({
  today = toDateStr(new Date()),
  allLessons = [],
  lessonProgress = {},
  academicAssignments = [],
  academicBooks = [],
  missionEvaluations = [],
  allAttendance = {},
  khanAcademyAssignments = []
} = {}) {
  return QUARTER_SPANS.map((span) => {
    const status = today < span.start ? 'upcoming' : today > span.end ? 'complete' : 'current';

    // Lessons scheduled to this quarter. Tier-based subjects (math,
    // reading, writing, science) carry no quarter and run continuously,
    // so they are deliberately not counted here — showing 106 maths
    // lessons under every quarter would be four times the truth.
    const lessons = allLessons.filter((l) => l.quarter === span.batchLabel);
    const mastered = lessons.filter((l) => lessonProgress[l.id]?.mastered).length;

    const bySubject = {};
    for (const lesson of lessons) {
      bySubject[lesson.subject] ??= { total: 0, mastered: 0 };
      bySubject[lesson.subject].total += 1;
      if (lessonProgress[lesson.id]?.mastered) bySubject[lesson.subject].mastered += 1;
    }

    const assignments = academicAssignments.filter((a) => a.quarter === span.batchLabel);
    const assignmentsDone = assignments.filter(
      (a) => a.status === 'completed' || a.status === 'graded'
    ).length;
    const scheduled = assignments.filter((a) => a.dueDate).length;

    const books = academicBooks.filter((b) => b.title);
    const booksFinished = books.filter((b) => withinSpan(b.completedAt, span)).length;

    const mission = missionEvaluations.find((m) => m.quarter === span.batchLabel) || null;
    const missionTotals = mission ? missionScoreTotals(mission.scores) : null;

    // Attendance actually recorded inside this quarter's real dates.
    const daysLogged = Object.entries(allAttendance).filter(([date, row]) => {
      if (!withinSpan(date, span)) return false;
      return (
        (row.lessonsCompleted || 0) + (row.writingEntries || 0) + (row.typingSessions || 0) > 0 ||
        instructionMinutes(row) > 0
      );
    }).length;

    const khan = khanAcademyAssignments.filter((k) => k.batchLabel === span.batchLabel);

    return {
      ...span,
      status,
      schoolDays: schoolDaysBetween(span.start, span.end),
      daysLogged,
      lessons: lessons.length,
      mastered,
      bySubject,
      // A quarter with lessons on the calendar but none written is the
      // single most useful thing this view can surface — it is how a
      // January content gap gets noticed in August.
      hasNoContent: lessons.length === 0 && khan.length === 0,
      khanCount: khan.length,
      assignments: assignments.length,
      assignmentsScheduled: scheduled,
      assignmentsDone,
      booksFinished,
      mission: mission
        ? {
            title: mission.customTitle || findProposal(mission.projectId)?.title || 'Mission',
            status: mission.status,
            approved: Boolean(mission.parentApproved),
            score: missionTotals ? `${missionTotals.total}/${missionTotals.max}` : null
          }
        : null
    };
  });
}

/**
 * The same data at semester resolution, plus the one number Georgia
 * actually cares about.
 */
export function buildSemesterPlan(yearPlan = []) {
  return SEMESTERS.map((semester) => {
    const quarters = yearPlan.filter((q) => semester.quarters.includes(q.id));
    if (quarters.length === 0) return { ...semester, quarters: [] };

    const sum = (key) => quarters.reduce((n, q) => n + (q[key] || 0), 0);
    return {
      ...semester,
      start: quarters[0].start,
      end: quarters[quarters.length - 1].end,
      status: quarters.every((q) => q.status === 'complete')
        ? 'complete'
        : quarters.some((q) => q.status === 'current')
          ? 'current'
          : 'upcoming',
      schoolDays: sum('schoolDays'),
      daysLogged: sum('daysLogged'),
      lessons: sum('lessons'),
      mastered: sum('mastered'),
      assignments: sum('assignments'),
      assignmentsDone: sum('assignmentsDone'),
      booksFinished: sum('booksFinished'),
      missionsApproved: quarters.filter((q) => q.mission?.approved).length,
      quarters
    };
  });
}

/**
 * Days toward Georgia's 180, across the whole year.
 *
 * `projected` is what the calendar physically allows if every remaining
 * school day is used — NOT a prediction. It answers "is 180 still
 * reachable," which is the question worth asking in February, and it is
 * labelled that way in the UI rather than presented as a forecast.
 */
export function yearProgress(yearPlan = [], today = toDateStr(new Date())) {
  const logged = yearPlan.reduce((n, q) => n + q.daysLogged, 0);
  const remaining = yearPlan
    .filter((q) => q.id !== 'Summer')
    .reduce((n, q) => {
      if (q.status === 'complete') return n;
      const from = q.status === 'current' ? today : q.start;
      return n + schoolDaysBetween(from, q.end);
    }, 0);

  return {
    logged,
    required: GEORGIA_DAYS_REQUIRED,
    remaining: Math.max(0, GEORGIA_DAYS_REQUIRED - logged),
    schoolDaysLeft: remaining,
    // True when the calendar still holds enough days. False is a real
    // signal that summer sessions need to count.
    onTrack: logged + remaining >= GEORGIA_DAYS_REQUIRED
  };
}

/**
 * Benchmark growth — PROJECT_PLAN.md Part 8's "benchmark assessments."
 *
 * The standardized test RECORD already exists as an adminRecords kind.
 * What was missing is the comparison: a score with nothing to compare it
 * to says whether he passed, not whether he grew, and growth is the
 * entire reason the plan chose free annual benchmarks over a paid
 * recurring diagnostic.
 *
 * Grouped by test NAME, because "Iowa Assessments" in October and "Iowa
 * Assessments" in April are the same instrument and the only pair worth
 * comparing. Two different tests with different scales are not a trend,
 * and averaging them would invent one.
 */
export function benchmarkGrowth(adminRecords = []) {
  const tests = adminRecords
    .filter((r) => r.kind === 'test' && typeof r.score === 'number')
    .sort((a, b) => (a.date || '').localeCompare(b.date || ''));

  const byName = {};
  for (const record of tests) {
    const name = (record.title || '').trim();
    if (!name) continue;
    (byName[name] ??= []).push(record);
  }

  return Object.entries(byName)
    .map(([name, records]) => {
      const first = records[0];
      const latest = records[records.length - 1];
      return {
        name,
        administrations: records.length,
        points: records.map((r) => ({ date: r.date, score: r.score, subject: r.subject || null })),
        first: { date: first.date, score: first.score },
        latest: records.length > 1 ? { date: latest.date, score: latest.score } : null,
        change: records.length > 1 ? latest.score - first.score : null
      };
    })
    .sort((a, b) => b.administrations - a.administrations || a.name.localeCompare(b.name));
}
