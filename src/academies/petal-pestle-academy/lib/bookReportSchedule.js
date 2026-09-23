// ---------------------------------------------------------------------------
// WHEN A BOOK REPORT HAPPENS — AND IT IS NOT A DATE.
//
// ---- WHY THIS FILE EXISTS ----
//
// Gigi, Aug 25 2026: "Azianna is also supposed to have book reports but I don't
// see them anywhere."
//
// They were there. Four a year, one per quarter, with a four-part frame and a
// four-row rubric, sitting at the bottom of the Journal screen under "Writing
// you hand in" since v3.38. She could read what a good one looks like.
//
// ⚠️ AND NOTHING EVER SAID IT WAS TIME TO DO ONE. Not the schedule, not Today's
// Planner, not one line anywhere. Four book reports a year with no date, no
// block, and nothing that knocks. Her record holds ZERO writing marks, which is
// exactly what that produces.
//
// It is the inverse of the Singing & Movement bug at v3.64 — that was a
// tick-box with no door; this was a door nothing ever knocked on. Both are the
// same family: correct, and unreachable in practice.
//
// ---- ⚠️ WHY THERE ARE NO DUE DATES IN THIS FILE ----
//
// Lamar's app dates his milestones: four steps, one week apart, counting
// BACKWARD from a real due date so the last lands on it. It is a good design and
// it cannot be copied here.
//
// THIS APP HAS NO CALENDAR AND REFUSES ONE, in five files and on purpose:
//
//   rotatingBlock.js  "NOTHING here reads it at render time, because render
//                      time has no calendar."
//   blockLinks.js     "There is no calendar in this app and this did not grow
//                      one: when she has finished every written Science Lab
//                      week, the block hands itself to the greenhouse."
//   khanScope.js      "A quarter here means roughly nine weeks of her four-day,
//                      four-hour week. It is a sequence, not a set of dates.
//                      Anyone who treats these as deadlines has turned a plan
//                      into a stick."
//
// So the mechanism is TRANSLATED, not lifted: the steps pace on HER PROGRESS,
// the way every other pacing decision in this app already works. A child who
// moves faster moves on; a child who needs longer takes longer, and a book
// report never becomes a date she has missed.
//
// ---- ONE FACT, ONE PLACE ----
//
// Lamar's log, in the rule that sits above his own scheduling code:
//
//     "plannerFeeds.js DERIVES dates from weeklyWritingSchedule and
//      gardenCalendar. Do not add a dueDate field to writingPrompts,
//      gardenProjects or the experiment arrays — those describe what the work
//      IS. One fact, one place; this codebase has been bitten four separate
//      times."
//
// So nothing here is stored on BOOK_REPORT, which describes what the work is.
// Everything below is computed from her lesson reads. check-book-report fails
// the build if a due date or week number ever appears on the piece definition.
//
// ---- WHY HERBALISM IS THE SPINE ----
//
// The pacing has to hang on something she does every week all year. Herbalism
// runs three days a week for 32 weeks — eight in every quarter, all four
// quarters. The Human Body matches it; the Science Lab runs only in Quarters 1
// and 3, and Social Studies stops after Quarter 3.
//
// Herbalism is also the subject this whole app was built around, so a child who
// is behind in it is behind in the thing that paces her, which is the honest
// place for the pacing to live.
// ---------------------------------------------------------------------------

import { WEEKS } from '../config/assessment.js';
import { BOOK_REPORT } from '../data/writing/writingPieces.js';

/** The course whose weeks the writing calendar hangs on. */
export const SPINE_COURSE = 'herbalism';

/**
 * The book report of a quarter runs in the SECOND HALF of it.
 *
 * Each quarter is eight Herbalism weeks. The report opens at week 5 and its
 * four steps are weeks 5, 6, 7 and 8 — so it finishes as the quarter does, and
 * the first half of every quarter is clear of it.
 *
 * ⚠️ THE FIRST HALF IS CLEAR ON PURPOSE. A quarter that opens with a book
 * report opens with the heaviest thing in it, and §9's rule about her week is
 * that the load has to be survivable. It also gives her four weeks of the
 * quarter's actual reading before she is asked to write about a book.
 */
export const OPENS_AT_WEEK_IN_QUARTER = 5;
export const WEEKS_PER_QUARTER = 8;

/**
 * Which Herbalism week is she up to, counting from her reads.
 *
 * A week counts as done only when EVERY lesson in it is finished — the same
 * definition `courseFinished` uses, so "week 3" means the same thing here as it
 * does everywhere else in the app.
 *
 * Returns 1 when she has finished nothing, because she is in week 1 then, not
 * week 0. PURE: ids in, a number out.
 */
export function spineWeek(lessonsRead = [], weeks = WEEKS, courseId = SPINE_COURSE) {
  const courseWeeks = (weeks && weeks[courseId]) || [];
  if (!courseWeeks.length) return 1;
  const read = new Set(lessonsRead || []);
  let done = 0;
  for (const w of courseWeeks) {
    if ((w.lessons || []).every((l) => read.has(l))) done += 1;
    else break; // Weeks run in order. A gap means she is IN that week.
  }
  return Math.min(done + 1, courseWeeks.length);
}

/** Which quarter that week sits in, 1-4. */
export function quarterOfWeek(week) {
  return Math.min(4, Math.floor((week - 1) / WEEKS_PER_QUARTER) + 1);
}

/** Which week of its own quarter, 1-8. */
export function weekWithinQuarter(week) {
  return ((week - 1) % WEEKS_PER_QUARTER) + 1;
}

/**
 * The book report she is on, and which step — or a reason there is none yet.
 *
 * ⚠️ A STEP IS NEVER OFFERED BEFORE IT OPENS. Lamar's rule, Aug 16 2026: "A
 * step is not offered before it opens. Milestones carry a finish-by date;
 * milestoneOpensOn gives them a begin date." His is a date; hers is a week.
 *
 * Putting step 1 in front of her in week 2 of the quarter is the same mistake
 * as putting a Research Paper on his board in August: his board is a list of
 * what to do NOW, and so is hers.
 *
 * Returns:
 *   { state: 'not-yet', quarter, opensAtWeek, weeksAway }  — nothing to show
 *   { state: 'open', quarter, slotId, step, stepNumber, of } — this week's step
 *
 * `stepsDone` is the list of step numbers she has ticked for this slot, so a
 * child who works ahead is not dragged back to a step she has finished. The
 * WEEK proposes; what she has actually done wins.
 */
export function bookReportNow(lessonsRead = [], stepsDoneBySlot = {}, weeks = WEEKS) {
  const week = spineWeek(lessonsRead, weeks);
  const quarter = quarterOfWeek(week);
  const inQuarter = weekWithinQuarter(week);
  const slotId = `book-report-q${quarter}`;

  if (inQuarter < OPENS_AT_WEEK_IN_QUARTER) {
    return {
      state: 'not-yet',
      quarter,
      slotId,
      opensAtWeek: OPENS_AT_WEEK_IN_QUARTER,
      weeksAway: OPENS_AT_WEEK_IN_QUARTER - inQuarter
    };
  }

  const total = BOOK_REPORT.steps.length;
  const byWeek = inQuarter - OPENS_AT_WEEK_IN_QUARTER + 1; // 1..4

  // What she has already ticked wins over what the week suggests. A child who
  // read the whole book in week 5 is on step 3, not step 1.
  const done = new Set(stepsDoneBySlot[slotId] || []);
  let n = 1;
  while (n <= total && done.has(n)) n += 1;

  const stepNumber = Math.min(total, Math.max(n, Math.min(byWeek, total)));
  const step = BOOK_REPORT.steps.find((s) => s.n === stepNumber) || null;

  return {
    state: 'open',
    quarter,
    slotId,
    step,
    stepNumber,
    of: total,
    // True when the week has moved past a step she has not ticked. Shown to a
    // grown-up, never phrased to her as being behind — §32.
    running: byWeek > stepNumber ? false : byWeek < stepNumber,
    weekOfQuarter: inQuarter,
    allDone: done.size >= total
  };
}
