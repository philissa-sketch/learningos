// ---------------------------------------------------------------------------
// THE WORK THAT HAD NO DATE ON IT.
//
// ---- WHY THIS EXISTS (Aug 14, 2026) ----
//
// The parent: "there are writing journals with projects that I do not see the
// due dates for. If they aren't assigned, please assign them." And separately:
// "Add the garden to his planner."
//
// She was right on both, and the two turned out to be the same fault.
//
// **Forty-six pieces of real work carried no date.** Thirty of them — every
// writing prompt, the three aerospace builds, the thirteen science experiments
// — were scheduled only by SCHOOL WEEK NUMBER in weeklyWritingSchedule. The
// planner's own source file already named the consequence:
//
//     "the plan is keyed off the SCHOOL WEEK NUMBER and carries no due date,
//      so it is invisible to buildCalendarItems, which only knows about dated
//      assignments."
//
// The other sixteen — four Tinkercad projects, six robotics projects, and all
// six garden projects — were not scheduled anywhere at all. Three separate
// screens import gardenProjects and search for them by id, and none of those
// searches can ever match, because no gd7-* id appears in the schedule.
//
// So the garden had 42 dated Fridays, five builds with a start brief and a
// finish brief each, and three planting windows the app itself calls "the one
// deadline in this whole app that does not move" — and not one of them reached
// a planner, a calendar, or his board.
//
// ---- WHAT THIS FILE DOES, AND WHAT IT DELIBERATELY DOES NOT ----
//
// It DERIVES calendar items from schedules that already exist. It does not add
// a dueDate field to writingPrompts, gardenProjects or the experiment arrays,
// and that is the important decision: those arrays describe WHAT the work is.
// The week it falls in is a scheduling fact, and it already lives in
// weeklyWritingSchedule and gardenCalendar. Copying a date into the content
// file would create a second place to change it, and this codebase has been
// bitten four separate times by one fact living in two places.
//
// ---- THE DATE RULE ----
//
// Parent's decision, Aug 14 2026: **a week-numbered item is due on the FRIDAY
// of that week.** It matches how the daily writing drills already run — Monday
// to Thursday drills, Friday the real piece — and it lands the deadline on the
// flex day that exists to absorb what is behind.
// ---------------------------------------------------------------------------
import { weeklyWritingSchedule, SCHOOL_YEAR_START, getSchoolWeekNumber } from '../academies/lamar/data/writing/weeklySchedule.js';
import { writingPrompts } from '../academies/lamar/data/writing/writingPrompts.js';
import { aerospaceProjects } from '../academies/lamar/data/aerospace/aerospaceProjects.js';
import { scienceExperiments } from '../academies/lamar/data/science/scienceExperiments.js';
import { technologyProjects } from '../academies/lamar/data/technology/technologyProjects.js';
import { roboticsProjects } from '../academies/lamar/data/robotics/roboticsProjects.js';
import { gardenProjects } from '../academies/lamar/data/gardening/gardenProjects.js';
import { gardenCalendar } from '../academies/lamar/data/gardening/gardenCalendar.js';
import { gardenBuildTrack } from '../academies/lamar/data/gardening/gardenBuildTrack.js';
import { gardenBriefs } from '../academies/lamar/data/gardening/gardenBriefs.js';
import { toDateStr, addDays, todayDateStr, parseDateStr } from './scheduler.js';
import { isHoliday } from '../academies/lamar/data/schedule/schoolHolidays.js';

/** Every pool a scheduled id might resolve against. Same six as weeklyPlan.js. */
const POOLS = [writingPrompts, aerospaceProjects, scienceExperiments, technologyProjects, roboticsProjects, gardenProjects];

function findItemById(id) {
  for (const pool of POOLS) {
    const hit = (pool || []).find((p) => p.id === id);
    if (hit) return hit;
  }
  return null;
}

/**
 * The last SCHOOL day of a given school week — normally the Friday.
 *
 * Week 1 begins on SCHOOL_YEAR_START (a Monday), so the Friday of week N is
 * four days into that week. Computed through addDays/toDateStr rather than
 * date arithmetic on a timestamp, because everything in this app is a LOCAL
 * date and toISOString() has broken this codebase before.
 *
 * ---- THE HOLIDAY WALK-BACK (Aug 16, 2026) ----
 *
 * This returned the raw Friday when it shipped on Aug 14, and two of the
 * forty-two land on days the school calendar already calls closed:
 *
 *     week 21  ->  Fri Dec 25 2026   Christmas Day
 *     week 22  ->  Fri Jan  1 2027   New Year's Day
 *
 * Which meant a science experiment and a writing piece were both dated to
 * Christmas Day, in a planner whose entire purpose is telling a twelve-year-old
 * what is due. Nothing crashed and nothing looked broken — the date was simply
 * a day nobody was going to work.
 *
 * The app already owns a list of the days it is closed. It just was not asked.
 * A deadline now walks BACK to the last open day of its own week — never
 * forward, because moving a deadline later is a decision about his workload and
 * this function does not get to make one. If a whole week is closed there is no
 * deadline to give, and it returns null rather than inventing one.
 */
export function fridayOfSchoolWeek(week) {
  if (!Number.isFinite(week) || week < 1) return null;
  const monday = addDays(SCHOOL_YEAR_START, (week - 1) * 7);
  for (let back = 4; back >= 0; back -= 1) {
    const d = toDateStr(addDays(monday, back));
    if (!isHoliday(d)) return d;
  }
  return null;
}

/**
 * Every week-numbered writing prompt and hands-on project, as a dated calendar
 * item. `done` is true when a writingEntry for that prompt exists IN THAT WEEK
 * — never "ever", because the pool repeats and an ever-check is what made the
 * home screen report five weeks of writing as already finished.
 */
export function writingScheduleCalendarItems({ writingEntries = [] } = {}) {
  const items = [];
  for (const [weekStr, ids] of Object.entries(weeklyWritingSchedule || {})) {
    const week = Number(weekStr);
    const dueDate = fridayOfSchoolWeek(week);
    if (!dueDate) continue;
    const weekStart = toDateStr(addDays(SCHOOL_YEAR_START, (week - 1) * 7));
    const weekEnd = toDateStr(addDays(SCHOOL_YEAR_START, week * 7 - 1));

    for (const id of ids) {
      const item = findItemById(id);
      if (!item) continue;
      const done = writingEntries.some((e) => {
        if (e.promptId !== id || !e.completedAt) return false;
        const d = toDateStr(new Date(e.completedAt));
        return d >= weekStart && d <= weekEnd;
      });
      items.push({
        key: `writing::${id}::w${week}`,
        title: item.title,
        subject: item.subject || 'reading',
        typeLabel: item.category === 'experiment' ? 'Hands-on project' : 'Writing Journal',
        dueDate,
        done,
        source: 'writing-schedule',
        schoolWeek: week
      });
    }
  }
  return items;
}

/**
 * The garden, on real dates at last. Three feeds, because the garden genuinely
 * has three different kinds of deadline and flattening them would lose the one
 * that matters most.
 *
 *   1. THE FRIDAY BRIEF — 42 dated Fridays already in gardenCalendar. Weekly,
 *      after school, exactly where the timetable already puts it.
 *   2. THE FIVE BUILDS — each already has an opening brief and a closing brief
 *      in the data. Those two dates are a start date and a due date; nothing
 *      had ever read them as such.
 *   3. THE PLANTING WINDOWS — the hard ones. Nova's own copy on the Season tab
 *      says: "This is the one deadline in this whole app that does not move.
 *      Miss a window and you wait a year." It was rendered as a paragraph with
 *      no date attached and no warning.
 */
export function gardenCalendarItems({ gardenLog = [], year = 2026 } = {}) {
  const items = [];

  // --- 1. the weekly Friday brief ---
  for (const day of gardenCalendar || []) {
    if (!day?.date || day.closed) continue;
    const brief = (gardenBriefs || []).find((b) => b.id === day.briefId) || null;
    items.push({
      key: `garden-brief::${day.date}`,
      title: brief ? `Garden — ${brief.title}` : 'Garden — Friday session',
      subject: 'gardening',
      typeLabel: 'Garden (after school)',
      dueDate: day.date,
      schoolWeek: getSchoolWeekNumber(parseDateStr(day.date)),
      done: (gardenLog || []).some((r) => r.date === day.date),
      source: 'garden'
    });
  }

  // --- 2. the five builds: opened by one brief, closed by another ---
  for (const build of gardenBuildTrack || []) {
    const opens = (gardenBriefs || []).find((b) => b.opensProjectId === build.projectId);
    const closes = (gardenBriefs || []).find((b) => b.closesProjectId === build.projectId);
    if (!closes?.date) continue;
    items.push({
      key: `garden-build::${build.projectId}`,
      title: `Build ${build.number} — ${build.title}`,
      subject: 'gardening',
      typeLabel: 'Garden build',
      dueDate: closes.date,
      startBy: opens?.date || null,
      // Derived, not stored — the journal prints "week N" for every item and a
      // dash beside a garden build looked like missing data rather than a
      // different kind of scheduling.
      schoolWeek: getSchoolWeekNumber(parseDateStr(closes.date)),
      done: false, // written up through the Writing Journal; see below
      source: 'garden'
    });
  }

  /**
   * --- 3. the planting windows ---
   *
   * Hardcoded in SeasonCalendarView as three text rows with no year on them.
   * They are given the school year here rather than being read from that
   * component, because a display component is the wrong owner for a deadline —
   * but the strings are kept identical so the two cannot describe different
   * crops.
   */
  const PLANTING_WINDOWS = [
    { date: `${year}-08-15`, crops: 'Beets, broccoli, cabbage, carrots, collards, kale, leeks, mustard, spinach, Swiss chard' },
    { date: `${year}-08-30`, crops: 'Brussels sprouts, Chinese cabbage, cauliflower, garlic, onions' },
    { date: `${year}-10-15`, crops: 'Leaf lettuces, radishes (window opened Sep 15)' }
  ];
  for (const w of PLANTING_WINDOWS) {
    items.push({
      key: `garden-planting::${w.date}`,
      title: `Planting window closes — ${w.crops}`,
      subject: 'gardening',
      typeLabel: 'Planting deadline',
      dueDate: w.date,
      // Counted done if anything was planted inside the fortnight before it.
      done: (gardenLog || []).some(
        (r) => r.kind === 'planting' && r.date && r.date <= w.date && r.date >= toDateStr(addDays(new Date(`${w.date}T12:00:00`), -14))
      ),
      source: 'garden',
      immovable: true
    });
  }

  return items;
}

/**
 * WHEN IS THIS ONE DUE — for any journal item, from either feed.
 *
 * ---- WHY (Aug 17, 2026) ----
 *
 * The parent, looking at the Writing Journal: "Why doesn't it show where all
 * the journals are linked to and when they are due?"
 *
 * Because that screen groups by CATEGORY and prints difficulty and minutes. The
 * dates have existed since Aug 14 — 93 dated writing items and 5 dated garden
 * builds — and the journal read neither. **The fourth time in this project that
 * the data was right and the screen was not asking.**
 *
 * Two feeds have to be consulted, which is why this helper exists rather than
 * the component doing it inline: week-numbered work is dated by
 * writingScheduleCalendarItems, and the six garden builds are dated by
 * gardenCalendarItems from their own opening and closing briefs. A component
 * that knew about only one would show six items as unscheduled, and be wrong.
 *
 * Returns the NEXT occurrence on or after today, how many times it is scheduled
 * across the year, and how many have been missed — because a prompt like
 * Mission Report comes round seven times, and "due Aug 14" is the wrong answer
 * in December.
 */
export function scheduleForItem(itemId, { writingEntries = [], gardenLog = [], today = todayDateStr(), year = 2026 } = {}) {
  const writing = writingScheduleCalendarItems({ writingEntries })
    .filter((i) => i.key.startsWith('writing::' + itemId + '::'));
  const builds = gardenCalendarItems({ gardenLog, year })
    .filter((i) => i.key === 'garden-build::' + itemId);
  const all = [...writing, ...builds].sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  if (all.length === 0) return null;

  const next = all.find((i) => i.dueDate >= today && !i.done) || null;
  const missed = all.filter((i) => i.dueDate < today && !i.done);
  const shown = next || all[all.length - 1];

  return {
    times: all.length,
    all,
    next,
    missed: missed.length,
    doneCount: all.filter((i) => i.done).length,
    /** What a card should print: what is coming, or the last one if all are past. */
    show: shown,
    startBy: shown.startBy || null
  };
}

/** Everything this module produces, in one call. */
export function derivedPlannerItems(sources = {}) {
  return [...writingScheduleCalendarItems(sources), ...gardenCalendarItems(sources)];
}

/** The garden work for one specific day, for the Mission Control board. */
export function gardenForDate(dateStr = todayDateStr(), { gardenLog = [] } = {}) {
  const day = (gardenCalendar || []).find((d) => d.date === dateStr);
  if (!day || day.closed) return null;
  const brief = (gardenBriefs || []).find((b) => b.id === day.briefId) || null;
  return {
    date: day.date,
    briefId: day.briefId,
    title: brief?.title || 'Garden session',
    estMinutes: brief?.estMinutes ?? null,
    whyToday: brief?.whyToday || day.suggestion || null,
    done: (gardenLog || []).some((r) => r.date === dateStr)
  };
}

export { getSchoolWeekNumber };
