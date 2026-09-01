import { toDateStr, parseDateStr } from './scheduler.js';
import { instructionMinutes } from './instructionTime.js';

/**
 * Learning Analytics — PROJECT_PLAN.md Part 8.
 *
 * The plan is unusually careful about which questions this dashboard can
 * honestly answer, and that triage is worth preserving rather than
 * quietly flattening into "here are some charts":
 *
 *   ANSWERABLE, and answered here — which subject is improving fastest,
 *   mastery pace, time on task, weekly reading, habit consistency, and
 *   the exercise and nutrition numbers that were blocked until PE and
 *   Nutrition existed. They exist now; that blocker is cleared.
 *
 *   NOT ANSWERABLE, and said so in the UI rather than faked — which
 *   learning style works best (needs a defined taxonomy first: a real
 *   research question, not a feature), and whether he is on track for
 *   yearly goals (yearly goals do not exist as a concept anywhere in
 *   this app yet).
 *
 *   NOT ANSWERABLE YET, but now accumulating — which lessons take
 *   longest. Duration was never recorded; as of August 6, 2026 it is.
 *   Nothing to show until attempts pile up, which is honest rather than
 *   disappointing.
 *
 *   DELIBERATELY NOT HERE — "what should he focus on next week." That is
 *   the Phase 5 recommendations engine, already scoped. Building a
 *   second one here would mean maintaining two.
 *
 * THE ONE RULE THIS FILE MUST NOT BREAK: app-measured minutes and
 * parent-entered minutes stay distinguishable everywhere. They are
 * different kinds of evidence — one is observed, one is asserted — and
 * a dashboard that silently sums them makes the record look more
 * precise than it is. Same principle the compliance section follows.
 */

/** Every date string from `from` to `to` inclusive, local-safe. */
function dateRange(fromDateStr, toDateStr_) {
  const out = [];
  const end = parseDateStr(toDateStr_);
  const cursor = parseDateStr(fromDateStr);
  while (cursor <= end) {
    out.push(toDateStr(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return out;
}

/** N days back from `today`, inclusive of today. */
export function lastNDays(n, today) {
  const end = parseDateStr(today);
  const start = new Date(end.getFullYear(), end.getMonth(), end.getDate() - (n - 1));
  return dateRange(toDateStr(start), today);
}

/**
 * Time on task, split by source.
 *
 * `measured` is what the app watched happen. `recorded` is what she
 * typed in for work that happened away from the screen — Khan Academy,
 * physical books, PE, field trips. Returned separately AND as a total,
 * so a caller has to choose which it means rather than being handed one
 * blended number.
 */
export function timeOnTask(allAttendance = {}, days = 28, today = toDateStr(new Date())) {
  const window = lastNDays(days, today);
  let measured = 0;
  let recorded = 0;
  const daily = [];

  for (const date of window) {
    const row = allAttendance[date] || {};
    const m = row.activeMinutes || 0;
    const r = row.offlineMinutes || 0;
    measured += m;
    recorded += r;
    daily.push({ date, measured: m, recorded: r, total: m + r });
  }

  const activeDays = daily.filter((d) => d.total > 0).length;
  return {
    days,
    measured,
    recorded,
    total: measured + recorded,
    activeDays,
    // Averaged over days he actually worked, not over the calendar.
    // Dividing by 28 when he schooled 16 of them understates every day
    // he was there.
    avgPerActiveDay: activeDays > 0 ? Math.round((measured + recorded) / activeDays) : 0,
    daily
  };
}

/**
 * Which subject is improving fastest.
 *
 * Compares mastery in the recent window against the window before it,
 * per subject. Deliberately counts lessons MASTERED rather than
 * attempted: attempts measure activity, mastery measures learning, and
 * the plan asked which subject is improving.
 *
 * Subjects with no activity in either window are omitted entirely rather
 * than shown as a flat zero — an archived subject reading "0, no change"
 * every week is noise that trains her to stop reading the panel.
 */
export function subjectMomentum({
  allLessons = [],
  lessonProgress = {},
  subjects = [],
  windowDays = 28,
  today = toDateStr(new Date())
}) {
  const recent = new Set(lastNDays(windowDays, today));
  const priorEnd = lastNDays(windowDays, today)[0];
  const priorWindow = new Set(lastNDays(windowDays + 1, priorEnd).slice(0, windowDays));

  const rows = [];
  for (const subject of subjects) {
    const lessons = allLessons.filter((l) => l.subject === subject);
    let recentCount = 0;
    let priorCount = 0;
    let masteredTotal = 0;

    for (const lesson of lessons) {
      const progress = lessonProgress[lesson.id];
      if (!progress?.mastered) continue;
      masteredTotal += 1;
      const when = progress.lastCompletedDate;
      if (!when) continue;
      if (recent.has(when)) recentCount += 1;
      else if (priorWindow.has(when)) priorCount += 1;
    }

    if (recentCount === 0 && priorCount === 0) continue;
    rows.push({
      subject,
      recent: recentCount,
      prior: priorCount,
      change: recentCount - priorCount,
      masteredTotal,
      totalLessons: lessons.length
    });
  }

  return rows.sort((a, b) => b.change - a.change || b.recent - a.recent);
}

/**
 * Mastery pace — lessons mastered per week, and what that implies.
 *
 * `weeksRemaining` is deliberately absent: the app has no defined
 * end-of-year target to pace against (the plan notes yearly goals do not
 * exist as a concept), and inventing one here would produce a
 * confident-looking projection resting on a number nobody chose.
 */
export function masteryPace({ lessonProgress = {}, weeks = 8, today = toDateStr(new Date()) }) {
  const window = lastNDays(weeks * 7, today);
  const byWeek = [];

  for (let i = 0; i < weeks; i += 1) {
    const slice = window.slice(i * 7, i * 7 + 7);
    const dates = new Set(slice);
    const count = Object.values(lessonProgress).filter(
      (p) => p?.mastered && dates.has(p.lastCompletedDate)
    ).length;
    byWeek.push({ weekStart: slice[0], weekEnd: slice[slice.length - 1], mastered: count });
  }

  const totals = byWeek.map((w) => w.mastered);
  const active = totals.filter((n) => n > 0);
  return {
    byWeek,
    totalMastered: totals.reduce((a, b) => a + b, 0),
    bestWeek: Math.max(0, ...totals),
    // Averaged over weeks with any activity, for the same reason
    // avgPerActiveDay is: summer and breaks would drag a calendar
    // average toward a number that describes nothing.
    avgPerActiveWeek: active.length ? Math.round((active.reduce((a, b) => a + b, 0) / active.length) * 10) / 10 : 0
  };
}

/**
 * Reading, rolled up weekly. The Reading Log already holds this; the
 * plan only asked for the rollup.
 *
 * Units are NOT converted into one another. "40 pages" and "2 chapters"
 * are both real entries and there is no honest exchange rate between
 * them, so they are counted separately and reported separately.
 */
export function readingRollup({ readingLog = [], weeks = 4, today = toDateStr(new Date()) }) {
  const window = lastNDays(weeks * 7, today);
  const inWindow = new Set(window);

  const byUnit = {};
  const titles = new Set();
  let sessions = 0;

  for (const entry of readingLog) {
    const date = (entry.date || '').slice(0, 10);
    if (!inWindow.has(date)) continue;
    sessions += 1;
    if (entry.title) titles.add(entry.title);
    const unit = entry.unit || 'pages';
    byUnit[unit] = (byUnit[unit] || 0) + (Number(entry.amount) || 0);
  }

  const daysWithReading = new Set(
    readingLog.map((e) => (e.date || '').slice(0, 10)).filter((d) => inWindow.has(d))
  ).size;

  return {
    weeks,
    sessions,
    byUnit,
    booksTouched: titles.size,
    daysWithReading,
    daysInWindow: window.length
  };
}

/**
 * Habit consistency.
 *
 * Reported as days-out-of-school-days, not a streak. A streak punishes
 * one sick day by resetting to zero, which says nothing useful about
 * whether a habit is forming. Weekends are excluded because this is a
 * 4+1 school week, and counting Saturdays as misses would make a
 * perfectly run week look like 5/7.
 */
export function habitConsistency({ allAttendance = {}, weeks = 4, today = toDateStr(new Date()) }) {
  const window = lastNDays(weeks * 7, today);
  const schoolDays = window.filter((date) => {
    const day = parseDateStr(date).getDay();
    return day >= 1 && day <= 5;
  });

  const worked = schoolDays.filter((date) => {
    const row = allAttendance[date];
    if (!row) return false;
    return (
      (row.lessonsCompleted || 0) + (row.writingEntries || 0) + (row.typingSessions || 0) > 0 ||
      instructionMinutes(row) > 0
    );
  });

  return {
    weeks,
    schoolDays: schoolDays.length,
    daysWorked: worked.length,
    pct: schoolDays.length ? Math.round((worked.length / schoolDays.length) * 100) : 0,
    missed: schoolDays.filter((d) => !worked.includes(d))
  };
}

/**
 * Exercise and nutrition — the two the plan recorded as BLOCKED because
 * "the PE and Nutrition subjects don't exist." They do now.
 *
 * Averages run over days he actually logged, never over the calendar. An
 * average protein figure computed across days with no entry would read
 * as "he ate badly" when it actually means "nothing was written down,"
 * and those two want very different responses.
 */
export function wellnessSummary({
  peDailyLog = {},
  peWorkoutLog = [],
  peBodyMetrics = [],
  days = 28,
  today = toDateStr(new Date())
}) {
  const window = lastNDays(days, today);
  const inWindow = new Set(window);

  const logged = window.map((date) => peDailyLog[date]).filter(Boolean);
  const avg = (key) => {
    const values = logged.map((row) => Number(row?.[key])).filter((n) => Number.isFinite(n) && n > 0);
    if (!values.length) return null;
    return Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) / 10;
  };

  const workouts = peWorkoutLog.filter((w) => inWindow.has((w.date || '').slice(0, 10)));
  const byCategory = {};
  for (const workout of workouts) {
    byCategory[workout.category] = (byCategory[workout.category] || 0) + 1;
  }

  const metrics = [...peBodyMetrics]
    .filter((m) => m.date)
    .sort((a, b) => (a.date || '').localeCompare(b.date || ''));

  return {
    days,
    daysLogged: logged.length,
    avgProteinG: avg('proteinG'),
    avgWaterOz: avg('waterOz'),
    avgSleepHours: avg('sleepHours'),
    avgActivityMinutes: avg('activityMinutes'),
    workouts: workouts.length,
    byCategory,
    // First and last only. A 12-year-old's weight trend is not something
    // this dashboard should chart week by week; the honest use is
    // "is he growing," not a graph to watch daily.
    firstMetric: metrics[0] || null,
    latestMetric: metrics.length > 1 ? metrics[metrics.length - 1] : null
  };
}

/**
 * Which lessons took longest.
 *
 * Returns [] until duration data exists — recording only began August 6,
 * 2026, so every attempt before that has no duration and never will. The
 * UI says that rather than showing an empty chart that looks broken.
 */
export function slowestLessons({ allLessons = [], lessonProgress = {}, limit = 5 }) {
  const rows = [];
  for (const lesson of allLessons) {
    const progress = lessonProgress[lesson.id];
    if (typeof progress?.totalMinutes !== 'number' || progress.totalMinutes <= 0) continue;
    rows.push({
      id: lesson.id,
      title: lesson.title,
      subject: lesson.subject,
      minutes: progress.totalMinutes,
      attempts: progress.attempts || 1,
      mastered: Boolean(progress.mastered)
    });
  }
  return rows.sort((a, b) => b.minutes - a.minutes).slice(0, limit);
}

/**
 * The questions this dashboard deliberately does not answer, and why.
 *
 * Shipped as data rather than prose buried in a component, because a
 * dashboard that silently omits a question the parent was promised is
 * indistinguishable from one that forgot. Saying "not yet, and here is
 * what it would take" is the honest version.
 */
export const UNANSWERED_QUESTIONS = [
  {
    id: 'duration',
    question: 'Which lessons take him the longest?',
    status: 'Collecting now',
    detail:
      'Lesson duration was never recorded — only whether he finished and how accurate he was. Recording started August 6, 2026, so this fills in as he works. Attempts before that date have no time and never will.'
  },
  {
    id: 'learning-style',
    question: 'Which learning style works best for him?',
    status: 'Needs a decision first',
    detail:
      'There is no defined way to categorize a lesson’s learning style in this app, so there is nothing to correlate outcomes against. That is a real research and design question, not a missing chart.'
  },
  {
    id: 'yearly-goals',
    question: 'Is he on track for the year?',
    status: 'Needs goals to exist',
    detail:
      'Yearly goals aren’t a concept anywhere in this app yet, so “on track” has nothing to measure against. Mastery pace below is the honest substitute until targets are set.'
  },
  {
    id: 'next-week',
    question: 'What should he focus on next week?',
    status: 'Built elsewhere',
    detail:
      'This is the targeted-recommendations engine already scoped in Phase 5. Building a second one here would mean maintaining two that disagree.'
  }
];
