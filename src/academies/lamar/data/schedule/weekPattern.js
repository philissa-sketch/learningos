/**
 * The five-day week — one specialized subject a day, and an open Friday.
 *
 * THIS WAS A 4+1 WEEK UNTIL AUG 9 2026: four deep-work days plus a light
 * Friday that introduced no new academic material. The parent moved it back,
 * in her words: *"I'm also thinking of returning it to mon-fri because of the
 * lessons in the Units in Kahn Academy, some of them are long and will need a
 * full week to finish. Those Fridays that we scheduled a field trip in advance
 * will be scheduled around."*
 *
 * Two things changed together, and neither works without the other:
 *
 *   - ONE SUBJECT PER DAY IN THE 2:15 BLOCK. It used to hold Social Studies
 *     AND Technology on Tuesday and Thursday — about 22 minutes each. Her
 *     words: *"we have social studies and tech on the same 45min slot. I don't
 *     think that will work."* Each now gets the full 45 on its own day.
 *   - FRIDAY IS OPEN. That is what absorbs the overflow the split creates, and
 *     it is what gives a long Khan unit Monday THROUGH Friday to finish.
 *
 * `subjects` on each day is an ORDER OF PREFERENCE, not a list of what runs.
 * The first subject with real lessons in the current quarter owns the day; see
 * lib/rotatingBlock.js, which is the only place that resolves it.
 *
 * ---- AEROSPACE, TECHNOLOGY AND ROBOTICS WENT DAILY NOV 3, 2026 ----------
 *
 * The line that used to live here said Aerospace stayed at 2x/week on
 * purpose, so a career interest wouldn't become a chore. The parent decided
 * otherwise, in her own words: "i don't want aerospace robotics and tech to
 * be rotating... I want them to be daily. social studies should be daily as
 * well." Each of the three (and Social Studies, confirmed the same day) now
 * runs every school day in its own real block — block-9 Aerospace, block-9b
 * Technology, block-9c Robotics, block-5c Social Studies, all in
 * defaultSchedule.js — instead of taking one or two weekdays each. Every
 * `subjects` list below that used to name one of them is now empty; see the
 * per-day comments for the history.
 *
 * GEORGIA ATTENDANCE. Five real instructional days a week, 200 days Aug-May
 * against the required 180, plus 39 in summer. Friday counts on its own terms
 * now rather than needing a logged field trip to count at all.
 *
 * GARDENING IS NO LONGER AN ACADEMIC BLOCK. It moved after school — her words,
 * "Gardening will be after school" — because garden briefs run 60 to 300
 * minutes and average 102. They never fitted a 45-minute slot, which is the
 * real reason Friday had been a buffer day. See `afterSchool` on Friday below
 * and block-11 in defaultSchedule.js.
 */

import { SCHOOL_HOLIDAYS } from './schoolHolidays.js';
import { patternSubjects, dayPattern as patternForDate } from '../../../../content/slots/timetable.js';

// This school's own timetable, in the shape the platform slot reads. The two
// helpers below are this folder's, not the platform's, and they ask the same
// question the app asks rather than keeping a second copy of the rules.
// Built when asked, not at import: WEEK_PATTERN is declared below this line.
const own = () => ({ timetable: { WEEK_PATTERN, SCHOOL_HOLIDAYS, HOLIDAY_NOTE } });
const dayPattern = (date) => patternForDate(own(), date);

/** 0=Sunday .. 6=Saturday, matching Date#getDay(). */
export const WEEK_PATTERN = {
  1: {
    label: 'Monday',
    kind: 'core',
    // ---- AEROSPACE LEFT THIS LIST NOV 3, 2026 ----------------------------
    //
    // Monday was Aerospace's first of two weekly rotation days (with
    // Wednesday) until the parent retired the whole rotating-block
    // mechanism: "i don't want aerospace robotics and tech to be
    // rotating... I want them to be daily." Aerospace now runs every
    // school day in its own real block (block-9 in defaultSchedule.js)
    // instead of taking turns for one weekday's worth of time.
    subjects: [],
    note: 'Core academics. Aerospace, Technology and Robotics each run every day now, in their own blocks (block-9/9b/9c) — see defaultSchedule.js.'
  },
  // TUESDAY AND THURSDAY BOTH CARRIED SOCIAL STUDIES *AND* TECHNOLOGY UNTIL
  // AUG 9 2026, sharing one 45-minute block. The parent: "we have social
  // studies and tech on the same 45min slot. I don't think that will work."
  // She was right — it was about 22 minutes each. Splitting them one per day
  // is only possible because Friday became a real school day the same day and
  // can absorb the overflow; see Friday below.
  2: {
    label: 'Tuesday',
    kind: 'core',
    // ---- TECHNOLOGY AND ROBOTICS LEFT THIS LIST NOV 3, 2026 -------------
    //
    // Tuesday and Thursday were Technology's (Robotics' in Q4) rotation
    // days until the parent retired the rotating-block mechanism itself:
    // "i don't want aerospace robotics and tech to be rotating... I want
    // them to be daily." Each now runs every school day in its own real
    // block (block-9b Technology, block-9c Robotics) instead of splitting
    // the week between them.
    subjects: [],
    /**
     * ---- THE SECOND ROTATING SLOT, AT 10:30 — RETIRED NOV 3, 2026. ----
     *
     * From Aug 29 to Nov 3, Tuesday borrowed Science's 10:15 block for Social
     * Studies via `morningSubjects` below, because Social Studies owned no
     * weekday of its own and was 30 days behind on the year's pacing. That
     * was always a display trick, not real time — it renamed block-5 for the
     * day without ever telling Science's own Khan row to step aside, which is
     * exactly the bug the parent caught: "why are all these subjects in the
     * same time slot?"
     *
     * Social Studies now has its own real block every school day (block-5c in
     * defaultSchedule.js, right after Science), so it no longer needs to
     * borrow anyone else's time — on any day. `morningSubjects` is gone from
     * every day in this file, Science keeps its own block every day, and this
     * whole mechanism (`liveMorningSubject`, `MORNING_BLOCK_ID` in
     * rotatingBlock.js) is now permanently dormant rather than removed, in
     * case a future subject genuinely needs a second rotating slot of its
     * own.
     */
    note: 'Core academics. Technology and Robotics each run every day now, in their own blocks (block-9b/9c) — see defaultSchedule.js.'
  },
  // ORDER OF PREFERENCE, same rule as Thursday: Technology owns Tuesday
  // wherever it has lessons, and hands the day to Robotics in Q4 where it has
  // none. At most ONE of them is ever live in a quarter, so the block always
  // resolves to a single subject with the whole 45 minutes.
  // ---- WEDNESDAY BECAME SOCIAL STUDIES DAY (Aug 20, 2026) ----------------
  //
  // The student, via his parent: **"he has social studies to complete but it's
  // not on Today's routine."**
  //
  // He was right, and it was not a display fault. Social Studies owned NO
  // WEEKDAY AT ALL in Q1. Thursday is its designated day, but the ownership
  // rule hands a day to the first subject with Mission Control lessons in the
  // quarter, and Social Studies is Khan-only until Q2 — so Technology took
  // Thursday, and Social Studies was left with Friday's shared open block.
  //
  // The arithmetic on the day it was found, with 50 school days left in Q1:
  //
  //     Aerospace       9 lessons          18 days   (Mon + Wed)
  //     Technology      22 lessons + 12 Khan units   21 days   (Tue + Thu)
  //     Social Studies  10 Khan units       0 days
  //
  // Aerospace was the one with room: nine lessons across eighteen days is a
  // lesson every other day. Technology had none to give — thirty-four items on
  // twenty-one days is already tight, and taking Thursday back off it is what
  // the Tue/Thu split was created to prevent.
  //
  // So Aerospace keeps Monday, which still leaves it about ten days for nine
  // lessons — one per day — and Wednesday goes to Social Studies. The parent
  // chose this over three alternatives, including moving units to Q2.
  //
  // AEROSPACE STAYS AS THE FALLBACK, second in the list. The ownership rule
  // reads this array in order, so if Social Studies ever has nothing live in a
  // quarter, Wednesday returns to Aerospace by itself rather than sitting
  // empty — the same shape Thursday already uses.
  // ---- SOCIAL STUDIES LEFT THIS LIST NOV 3, 2026 ----------------------
  //
  // Wednesday was Social Studies' one guaranteed rotation day from Aug 20
  // (see the long comment below, kept for the Q1 history it explains) until
  // Social Studies got a real daily block of its own (block-5c). Keeping it
  // in this preference list too, on top of a daily block, would have been
  // over-provisioning one subject at the cost of a day Aerospace, Technology
  // or Robotics could use — exactly the kind of silent imbalance this file's
  // own comments have fought since August. Wednesday is Aerospace's alone now.
  3: {
    label: 'Wednesday',
    kind: 'core',
    // ---- AEROSPACE LEFT THIS LIST TOO, NOV 3, 2026 -----------------------
    //
    // Wednesday was Aerospace's second weekly rotation day (with Monday)
    // until the parent retired the rotating-block mechanism itself: "I
    // want them to be daily." Aerospace now runs every school day in its
    // own real block (block-9), so it no longer needs a specific weekday
    // at all.
    subjects: [],
    note: 'Core academics. Aerospace, Technology and Robotics each run every day now, in their own blocks (block-9/9b/9c). Social Studies runs every day too, in its own block-5c.'
  },
  // THURSDAY'S LIST IS AN ORDER OF PREFERENCE, NOT A LIST OF WHAT RUNS. The
  // first subject with real lessons in the quarter owns the day and gets all 45
  // minutes; the rest are fallbacks. Social Studies has NO Mission Control
  // lessons until Q2 — Q1 is Khan-only — so Thursday would sit empty all of Q1
  // while Technology spilled onto ten of Q1's thirteen Fridays. Technology
  // takes Q1's Thursdays for that reason and hands them back in Q2.
  //
  // The parent, Aug 9 2026: "I don't want the lessons to be out of order." This
  // is what makes that possible. The alternative was moving six Technology
  // lessons two quarters away from their Part I halves.
  // THURSDAY NOW LISTS TECHNOLOGY FIRST (Aug 20, 2026), and the change is
  // real rather than cosmetic. Ownership stopped being decided by "which of
  // these has Mission Control lessons" on the same day — it is decided by THIS
  // ORDER, against a liveness test that finally counts Khan work (see
  // liveRotatingSubjects). Left as it was, Social Studies would have taken
  // Thursday as well as its new Wednesday and Technology would have been left
  // with Tuesday alone for 22 lessons and 12 Khan units.
  //
  // The parent chose Wednesday for Social Studies over exactly that option.
  // ---- SOCIAL STUDIES LEFT THIS LIST, AND ITS BORROWED 10:30 SLOT,
  // NOV 3, 2026 ----------------------------------------------------------
  //
  // Thursday had carried Social Studies three ways by the end: the main
  // rotation day below, plus a second borrowed Science slot added Sept 16
  // because "the one x per week isn't enough." Both are retired now that
  // Social Studies runs every school day in its own block (block-5c) —
  // five real sessions a week is strictly more than the three this day alone
  // used to patch together, without needing to touch Science's block at all.
  // Thursday reverts to Technology, its other listed subject.
  4: {
    label: 'Thursday',
    kind: 'core',
    // ---- TECHNOLOGY AND ROBOTICS LEFT THIS LIST NOV 3, 2026 -------------
    //
    // Thursday was Technology's (Robotics' in Q4) second rotation day, with
    // Tuesday, until the parent retired the rotating-block mechanism
    // itself: "I want them to be daily." Each now runs every school day in
    // its own real block (block-9b, block-9c), so neither needs a specific
    // weekday any more.
    subjects: [],
    note: 'Core academics. Technology and Robotics each run every day now, in their own blocks (block-9b/9c). Social Studies runs every day too, in its own block-5c.'
  },
  // FRIDAY WAS A 'buffer' DAY UNTIL AUG 9 2026 — no new academic material, and
  // the garden owned the afternoon. The parent moved it back to a full Mon-Fri
  // week, in her words: "some of them are long and will need a full week to
  // finish", about Khan Academy units. That is the reason this day exists as a
  // school day, and it is why Friday is `flex` rather than carrying a fixed
  // rotating subject:
  //
  //   - A long Khan unit gets Monday THROUGH FRIDAY to finish instead of four
  //     days. That was the whole ask.
  //   - Whichever rotating subject is behind gets the block. Technology needs
  //     more Tuesdays than a quarter has; Social Studies needs more Thursdays.
  //     Friday is where that overflow goes, which is what makes one-subject-
  //     per-day possible at all.
  //   - Field trips are scheduled here in advance, also her words.
  //
  // `subjects: []` is deliberate. A fixed subject here would take the day back
  // off the overflow that the Tuesday/Thursday split now depends on.
  //
  // GARDENING IS NO LONGER IN THIS BLOCK. It moved after school (block-11) on
  // Aug 9 2026 — the parent: "Gardening will be after school." Garden briefs
  // run 60 to 300 minutes and average 102; they never fitted a 45-minute slot,
  // which is why they had a buffer day. `afterSchool` keeps Friday as the
  // garden's scheduled home so daysForSubject('gardening') still answers
  // 'Friday' without putting it back in the academic rotation.
  5: {
    label: 'Friday',
    kind: 'core',
    flex: true,
    // `subjects: []` has been true since Aug 9 2026 for the reason above —
    // a fixed rotating subject here would have spent the day's overflow
    // capacity. As of Nov 3, 2026 there is no rotation left to overflow:
    // Aerospace, Technology, Robotics and Social Studies each own their own
    // block every school day, Friday included, the same as any other day
    // (see DAILY_SPECIALIZED_SUBJECTS in MissionControlDashboard.jsx). This
    // stays empty anyway — Friday is still `flex` for whatever ELSE falls
    // behind during the week (an unfinished Khan set, a rough draft, a
    // missed word-study day), just no longer for a rotating subject that
    // "ran out of Tuesdays," because none can any more.
    subjects: [],
    afterSchool: ['gardening'],
    note: 'A full school day — Aerospace, Technology, Robotics and Social Studies each run in their own block today too, same as every other day. The open part of Friday now catches up on anything else that fell behind, or a field trip planned in advance. The garden is after school.'
  },
  0: { label: 'Sunday', kind: 'weekend', subjects: [], note: 'Weekend.' },
  6: { label: 'Saturday', kind: 'weekend', subjects: [], note: 'Weekend.' }
};

/**
 * HOLIDAYS OVERLAY THE WEEKDAY PATTERN, they are not entries in it.
 *
 * Added Aug 9 2026 alongside schoolHolidays.js. WEEK_PATTERN answers "what does
 * a Tuesday look like" and must keep answering exactly that — it is indexed by
 * getDay() and a date-specific hole in it would be a different kind of object.
 * So the three accessors below, which are what the rest of the app actually
 * calls, resolve the date first and hand back a fourth kind: 'holiday'.
 *
 * Doing it here rather than at each call site is deliberate. There are four
 * consumers (the class bell, the dashboard, the daily scheduler, the rotating
 * block label) and a holiday that half of them knew about would be worse than
 * one none of them knew about — the bell would ring for a class nobody is in.
 *
 * 'holiday' is NOT 'weekend'. A weekend is structural and repeating; a holiday
 * is a named day the parent chose, and naming it on screen is the point.
 */

/** What kind of day this is: 'core' | 'buffer' | 'weekend' | 'holiday'. */
export function dayKind(date = new Date()) {
  return dayPattern(date).kind;
}

/** The rotating Mission Control subjects scheduled for this day. */
/**
 * THE ROTATING BLOCK IS ALLOCATED PER QUARTER, NOT PER YEAR.
 *
 * ---- WHY (Aug 20, 2026) ----
 *
 * The student, via his parent: **"he has social studies to complete but it's
 * not on Today's routine."** He had ten open Social Studies units in Q1 and no
 * weekday that ran them, because Q1's Social Studies is Khan-only and the day
 * went to whichever subject had Mission Control lessons.
 *
 * The parent's fix, chosen over three alternatives: give Social Studies
 * Wednesday. But a permanent swap would have been wrong from Q2 onwards, and
 * quietly so. The lesson counts say why:
 *
 *     Q1   aerospace 11   technology 23   socialStudies  0 (+10 Khan units)
 *     Q2   aerospace 11   technology 11   socialStudies 11
 *     Q3   aerospace 11   technology  9   socialStudies  9
 *     Q4   aerospace 11   robotics    9   socialStudies  9
 *
 * Q1 is the odd quarter: Technology carries 23 lessons and genuinely needs two
 * days, while Social Studies has none of its own and needs somewhere to put
 * its Khan units. From Q2 the three even out at ~11 each on four core days, so
 * exactly one subject can hold two — and it should be **Aerospace**, which has
 * the most in every remaining quarter and is the reason this whole curriculum
 * exists.
 *
 * Taking Wednesday off Aerospace for the year to solve a Q1 problem would have
 * left his dream subject on Mondays alone for eleven lessons a quarter, from
 * November, and nothing would ever have said so.
 *
 * So the swap is scoped to the quarter that needs it. `subjects` is the normal
 * shape of the week; `subjectsByQuarter` overrides it where a quarter is
 * genuinely different, keyed by quarter id ('Q1').
 */


// patternSubjects moved to src/lib/timetable.js on Sept 1, 2026. WEEK_PATTERN
// stays here — the shape of a week is this school's. Pulling the right list out
// of one is every school's. §3c Step 1.

/**
 * The sentence a child reads on a named day off.
 *
 * It was built inside `dayPattern` until Sept 22, 2026, which meant no parent
 * could change a word of it and it would have been carried into the platform
 * as every school's wording. `{holiday}` is filled in with the day's name.
 */
export const HOLIDAY_NOTE = '{holiday} — day off for rest. No school today.';

// `dayPattern` and `subjectsForDay` moved to src/content/slots/timetable.js on
// the same day. A holiday landing on a Saturday still stays a weekend there —
// it costs no school day, and calling it a holiday would put "no school today"
// on a screen that already says the weekend is the weekend.

/**
 * ---- isSchoolDay LIVED HERE TOO, AND WAS REMOVED (Aug 31, 2026) ----
 *
 * There were two of them: this one, derived from `dayPattern`, and the one in
 * `schoolHolidays.js`, derived from the holiday list. Both were documented as
 * the only one anyone should ask — *"The one question the UI should ask"* here,
 * *"The single place the rest of the app should ask"* there.
 *
 * Nothing imported this one. Everything that files a Georgia hour — the
 * compliance packet, pacing, the year plan, the compliance section, the mission
 * schedule — imports the other. So the legal record already had a single source
 * of truth and nothing was ever wrong.
 *
 * Checked before deleting rather than assumed: both were run over 400 days from
 * Aug 2026 and agreed on every one. Then this one went, because two functions
 * with one name, each believing it is authoritative, is a disagreement waiting
 * for the day someone edits the holiday list in only one place.
 *
 * Ask `schoolHolidays.js`. Through the content interface that is
 * `academyContent().timetable.isSchoolDay`.
 */

/**
 * How many times a week a subject comes up — used to explain the
 * rotation honestly in the UI ("Aerospace runs Mon & Wed") rather than
 * leaving the student wondering where a subject went.
 */
export function daysForSubject(subject, quarterId = null) {
  return Object.entries(WEEK_PATTERN)
    .filter(([, pattern]) =>
      patternSubjects(pattern, quarterId).includes(subject)
      || (pattern.afterSchool || []).includes(subject))
    .map(([, pattern]) => pattern.label);
}

/** True on a school day whose rotating block is open rather than assigned. */
export function isFlexDay(date = new Date()) {
  return dayPattern(date).flex === true;
}

/**
 * Friday's shape.
 *
 * REWRITTEN AUG 9 2026. This used to describe a buffer day — "the whole point
 * is that no new material is introduced." Friday is a full school day now, so
 * the morning is simply the morning. What is described here is the part of
 * Friday that is still genuinely different: the open 2:15 block, and the
 * garden after school.
 *
 * The export keeps its name because four files import it and renaming it would
 * be churn for nothing.
 */
export const FRIDAY_BUFFER_PLAN = [
  {
    id: 'friday-longkhan',
    title: 'Long Khan units',
    detail:
      'The reason Friday came back. A Khan Academy unit that needs more than four days now has five — start it Monday and finish it Friday instead of dropping it mid-week and picking it up cold.'
  },
  {
    id: 'friday-catchup',
    title: 'Catch-up block',
    detail:
      'Whatever is behind from Mon-Thu — an unfinished Khan set, a rough draft, a missed word-study day, or the rotating subject that ran out of Tuesdays. If everything is done, this time is his.'
  },
  {
    id: 'friday-trip',
    title: 'Field trips, planned ahead',
    detail:
      'Trips are scheduled into this day in advance rather than taking a day off the calendar. A logged trip is a real instructional day in Georgia.'
  },
  {
    id: 'friday-garden',
    title: 'The garden — after school',
    detail:
      'A 4 ft x 8 ft bucket garden under an awning, worked as a design problem: measure it, build for it, write down what changed. 3:15 onward, outside the school day. Twenty-five briefs a year, most of them 60-90 minutes; the five build projects run longer and want a weekend.'
  },
  {
    id: 'friday-project',
    title: 'Project time',
    detail:
      'A good day to move a book report or research paper forward one step, since nothing new is competing for the open block.'
  }
];
