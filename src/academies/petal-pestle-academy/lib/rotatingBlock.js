// ---------------------------------------------------------------------------
// A BLOCK THAT NAMES A DIFFERENT COURSE ON DIFFERENT DAYS.
//
// Gigi, Aug 16 2026: "I will like social studies and the human body to be 2
// days a week. They can rotate ex. mon social studies, tues Human Body, etc."
//
// ---- WHY THIS CANNOT BE DONE BY EDITING THE BLOCK'S LABEL ----
//
// `DEFAULT_SCHEDULE` is ONE day template reused Monday through Friday. There is
// no Monday row and no Tuesday row. So no stored string can be correct on more
// than one day — a label saying "Social Studies" is wrong every Tuesday, and a
// label saying "Social Studies / The Human Body" is a slash list that tells her
// nothing about what today actually is.
//
// Her brother's app hit this exact wall and solved it the same way, in
// `src/lib/rotatingBlock.js`. His parent's words, from his log: "I dont
// understand the rotating block. Let's fix that to have the actual course that
// will be there for the week." A label listing everything a slot could be tells
// you nothing about what it is.
//
// So the label is RESOLVED AT RENDER TIME against the day being displayed.
//
// ---- WHY TWO DAYS A WEEK, AND WHAT IT COST ----
//
// `blk-science` carries a comment from v3.5 rejecting exactly this:
//
//     "Alternating by quarter rather than by day keeps the three-lessons-then-
//      a-review-day week intact for both. Alternating by day would give each
//      course two lessons a week and no week at all."
//
// That objection was real and Gigi has overruled it on purpose, so it is
// answered here rather than deleted. A two-day course now has a two-lesson week
// and a SHORTER Thursday test — five questions instead of eight — declared per
// course in `curriculumPlan.js` rather than assumed globally. The week shape did
// not break; it stopped being one-size-fits-all.
//
// What her rotation buys, and it is the reason it is worth the change:
//
//   * Social Studies drops from 96 lessons to 64. It was the largest single
//     body of unwritten work in the app.
//   * The Human Body stops sitting idle for half the year. It ran Q2 and Q4
//     only; it now appears every week of all four quarters.
//
// ---- ONE COURSE NOW ENDS BEFORE THE YEAR DOES (v3.31) ----
//
// Gigi, Aug 17 2026: "I would prefer the human body to have full year courses.
// Social Studies can have 2 qtrs or 1 if it doesn't really matter."
//
// The Human Body keeps Tuesday and Thursday every week of all four quarters.
// Social Studies runs Quarters 1 to 3 and then stops, so Monday and Wednesday
// have no course for the last eight teaching weeks.
//
// ---- AND THE APP CANNOT ASK WHICH QUARTER TODAY IS IN ----
//
// There is no date-to-quarter function anywhere in src/, and that is deliberate.
// catchUp.js states the reason: "The app does not map curriculum week 1 onto a
// date, and it should not: she is homeschooled, weeks get moved, and a schedule
// that scolds her for a family trip is a schedule she stops opening."
//
// So this file does NOT learn about the calendar. It uses the marker the app
// already trusts everywhere else — HER OWN PROGRESS. Monday and Wednesday hand
// to Social Studies for as long as it has a week she has not finished. When she
// has read every lesson of its last week, those two half-hours read open.
//
// That is self-correcting in both directions. If she runs long, the days stay
// hers until she is actually done. If she races ahead, the garden time arrives
// early because she earned it. Nothing needs a date to be right.
//
// ---- A COURSE WITH NO WEEKS HAS NOT RUN OUT ----
//
// Social Studies has zero lessons written today, so WEEKS.social does not
// exist. That is UNWRITTEN, which is a different thing from FINISHED, and
// conflating them would quietly delete the course from her timetable before a
// word of it was ever written. A course runs out only when it HAS weeks and she
// has read every lesson in all of them.
//
// ---- THE ONE RULE THIS FILE MUST NEVER BREAK ----
//
// If a grown-up has typed her own name for a block, HERS IS SHOWN, untouched.
// Same rule every migration in this app follows. The rotation renames a block
// the app owns; it does not overwrite something Gigi wrote.
// ---------------------------------------------------------------------------

import { WEEKS } from '../config/assessment.js';

/**
 * Which course a rotating block holds, by ISO weekday (1 = Monday).
 *
 * Friday is deliberately absent. Friday is catch-up and introduces nothing new,
 * so a rotating block has no course on it — `catchUp.js` owns that day.
 */
export const BLOCK_ROTATION = {
  'blk-social': {
    1: 'social',
    2: 'body',
    3: 'social',
    4: 'body'
  }
};

/** Human-readable course names for the rotation, so the label can be built. */
export const ROTATION_LABELS = {
  social: 'Social Studies',
  body: 'The Human Body'
};

export const ROTATION_ICONS = {
  social: '🌍',
  body: '🫀'
};

/**
 * The rotation's own key for a course, mapped to the id in curriculumPlan.js.
 *
 * `body` is the rotation key; `humanbody` is the course id. That mapping used
 * to be a bare ternary written out twice inside check-curriculum-volume — a
 * magic string in a check is a magic string. It lives here now, once, and the
 * check imports it.
 */
export const ROTATION_COURSE_IDS = {
  social: 'social',
  body: 'humanbody'
};

/**
 * Rotation courses that END BEFORE THE YEAR DOES, and what happens to the days.
 *
 * `lastQuarter` is a statement of intent for a human reader and for the check;
 * NOTHING here reads it at render time, because render time has no calendar.
 * What actually opens the slot is `hasRunOut` below, on her progress.
 *
 * check-curriculum-volume fails the build if a course named here disagrees with
 * its own `quarters` list in curriculumPlan.js, and fails if the days this
 * leaves empty are not DECLARED there with a reason.
 */
export const ROTATION_ENDS = {
  social: {
    lastQuarter: 3,
    why: 'Social Studies runs Quarters 1 to 3 — 48 lessons for roughly 37 Georgia elements. In Quarter 4 its Monday and Wednesday go back to the garden and her projects.'
  }
};

/** True when this block's subject depends on which day it is. */
export function isRotatingBlock(blockId) {
  return Object.prototype.hasOwnProperty.call(BLOCK_ROTATION, blockId);
}

/**
 * ISO weekday for a Date, 1 = Monday … 7 = Sunday.
 *
 * Taken from the date being DISPLAYED, never from "now". A grown-up looking at
 * Thursday's schedule on a Sunday evening must see Thursday's courses.
 */
export function isoWeekday(date) {
  const d = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(d.getTime())) return null;
  const js = d.getDay(); // 0 = Sunday
  return js === 0 ? 7 : js;
}

/**
 * The course a rotating block holds on one day, or null.
 *
 * null means: no course today. Weekends and Friday both return null, and both
 * are correct — Friday has no new lesson in any subject.
 */
/**
 * Has this rotation course run out for her?
 *
 * PURE, and deliberately so: it takes the ids she has read and the week table,
 * returns a boolean, and touches no store and no date. A check can call it with
 * a made-up list and get a real answer.
 *
 * FALSE for a course that is not in ROTATION_ENDS — a full-year course never
 * runs out. FALSE for a course with no weeks registered: unwritten is not
 * finished, see the header.
 */
export function hasRunOut(rotationKey, lessonsRead = [], weeks = WEEKS) {
  if (!ROTATION_ENDS[rotationKey]) return false;
  return courseFinished(ROTATION_COURSE_IDS[rotationKey], lessonsRead, weeks);
}

/**
 * Has she finished every written week of a course, by course id?
 *
 * ADDED v3.42, and `hasRunOut` above is now a thin wrapper on it, so there is
 * exactly one definition of "finished" in the app.
 *
 * It exists because The Science Lab needed the same question asked of it and
 * is NOT a rotating course. Its 2:10 block runs in Quarters 1 and 3 and is
 * declared open in 2 and 4 (§7.1), and the app has no calendar to know which
 * quarter it is — so the block reads her progress, exactly as the 2:45 block
 * has since v3.31. Writing that arithmetic a second time inside blockLinks.js
 * would have been two definitions of finished, drifting apart quietly.
 *
 * PURE: ids in, boolean out, no store and no date. A check can call it with a
 * made-up list and get a real answer.
 *
 * FALSE for a course with no weeks registered. UNWRITTEN IS NOT FINISHED — the
 * v3.31 rule, and the reason a course with nothing in it never hands its block
 * away to the garden.
 */
export function courseFinished(courseId, lessonsRead = [], weeks = WEEKS) {
  const courseWeeks = (weeks && weeks[courseId]) || [];
  if (!courseWeeks.length) return false;
  const read = new Set(lessonsRead || []);
  return courseWeeks.every((w) => (w.lessons || []).every((l) => read.has(l)));
}

/**
 * THE ONE LESSON SHE IS UP TO IN A COURSE. v3.79.
 *
 * ---- WHY THIS EXISTS ----
 *
 * Gigi, Aug 25 2026: "I will like it that her today prompt just sends her to
 * the lesson she is to complete and she doesn't see the other lessons.
 * Sometimes she goes ahead without completing the full lesson."
 *
 * Every app-course block resolved to `view: 'lessons'` — the whole course, every
 * module, every week, plus a quarter picker for the rest of the year. That was
 * the right answer to the v2.0 problem, which was a block that opened NOTHING.
 * It is the wrong answer to this one. A nine-year-old handed a menu picks from
 * the menu.
 *
 * ---- WHAT "UP TO" MEANS, AND WHY IT IS SAFE TO ASK ----
 *
 * The first lesson in course order she has not FINISHED. Finished is a strong
 * word here and it is earned: `markLessonRead` is called from LessonReader's
 * `finish()`, and that button is disabled until every check question is
 * answered. A lesson she opened and wandered away from was never written down.
 *
 * So an abandoned lesson is still the next lesson, tomorrow. That is not a
 * side effect — it is the whole of what Gigi asked for.
 *
 * ---- ORDER COMES FROM WEEKS, NOT FROM THE LESSON ----
 *
 * ⚠️ The 13 flat cards, hb-1-01 to hb-1-13, carry NO course, quarter or week on
 * the lesson object — the §71 finding, still open. Walking lesson metadata
 * would silently skip thirteen real lessons of Herbalism, which is this app's
 * "correct and unreachable" failure for the sixth time.
 *
 * WEEKS knows where all thirteen live. Verified rather than assumed, on all
 * four courses: every lesson sits in exactly one week, no week names a lesson
 * that does not exist, and quarter/n ascends strictly. check-lesson-gate
 * asserts that coverage on every run, so a lesson added tomorrow without a week
 * fails the build instead of becoming unreachable.
 *
 * PURE: ids in, a lesson id out, no store and no date — rule 11, so a check can
 * call it with a made-up list and get a real answer.
 *
 * Returns null when every lesson in the course is finished. Null is also what
 * an unwritten course returns, and the two are told apart by the caller, not
 * here: `courseFinished` is false for a course with no weeks, because unwritten
 * is not finished (v3.31).
 */
export function nextLessonFor(courseId, lessonsRead = [], weeks = WEEKS) {
  const courseWeeks = (weeks && weeks[courseId]) || [];
  if (!courseWeeks.length) return null;
  const read = new Set(lessonsRead || []);
  for (const w of courseWeeks) {
    for (const lessonId of w.lessons || []) {
      if (!read.has(lessonId)) return { lessonId, week: w };
    }
  }
  return null;
}

/**
 * Every lesson in a course, in the order WEEKS teaches them.
 *
 * Exported because the screen needs the SAME order the block walks. Two
 * implementations of "what order are the lessons in" drift, and the day they
 * disagree the block opens one lesson while the list says a different one is
 * next — v3.70's rule, and the reason letterForPercent has one home.
 */
export function courseLessonOrder(courseId, weeks = WEEKS) {
  return ((weeks && weeks[courseId]) || []).flatMap((w) => w.lessons || []);
}

/**
 * May she open this lesson yet?
 *
 * TRUE for anything she has finished — going back is always allowed, and the
 * re-read is the behaviour §3.12 most wants to encourage.
 * TRUE for the one she is up to.
 * FALSE for everything past it.
 *
 * ⚠️ THIS IS A WALL, AND GIGI HAS TURNED ONE DOWN BEFORE. At v3.63 she was
 * offered a Play tab locked until the day's work was done and said no: "a wall
 * makes a child stop trying." She chose this one deliberately on Aug 25 2026,
 * for a different surface and a different reason — a games tab she may or may
 * not open is not a curriculum with an order that matters.
 *
 * IT IS WRITTEN TO BE INVERTED WITH A DATE RATHER THAN DELETED, the same way
 * check-writing was at v3.68 and check-yearplan at v3.23. A rule deleted is a
 * rule nobody can argue with later. To open the course back up, make this
 * return true and say who decided and when.
 */
export function lessonIsOpen(lessonId, courseId, lessonsRead = [], weeks = WEEKS) {
  const read = new Set(lessonsRead || []);
  if (read.has(lessonId)) return true;
  const next = nextLessonFor(courseId, lessonsRead, weeks);
  return Boolean(next) && next.lessonId === lessonId;
}

/** Every rotation course she has finished, as keys. */
export function finishedRotationCourses(lessonsRead = [], weeks = WEEKS) {
  return rotatingCourseIds().filter((k) => hasRunOut(k, lessonsRead, weeks));
}

/**
 * The course a rotating block holds on one day, or null.
 *
 * null means: no course today. Weekends and Friday both return null, and both
 * are correct — Friday has no new lesson in any subject. Since v3.31 a day whose
 * course she has FINISHED also returns null, which is the same answer for a
 * different and equally honest reason.
 *
 * `lessonsRead` is optional. Omitting it means "do not apply the run-out rule",
 * which is the pre-v3.31 behaviour and is right for a caller that genuinely has
 * no progress to hand. It is NOT right for her timetable, so
 * check-curriculum-volume asserts that TodayView passes it.
 */
export function courseForBlockOnDay(blockId, date, lessonsRead = null) {
  const rota = BLOCK_ROTATION[blockId];
  if (!rota) return null;
  const dow = isoWeekday(date);
  if (!dow) return null;
  const key = rota[dow] || null;
  if (!key) return null;
  if (lessonsRead && hasRunOut(key, lessonsRead)) return null;
  return key;
}

/**
 * What the block should be CALLED on this day.
 *
 * `storedLabel` is whatever is saved on the block. If a grown-up has renamed it,
 * that wins and nothing here applies — the rotation may rename the app's own
 * block, never Gigi's words.
 */
export function blockLabelOnDay(block, date, appDefaultLabel = 'Social Studies', lessonsRead = null) {
  if (!block || !isRotatingBlock(block.id)) return block?.label || '';
  if (block.label && block.label !== appDefaultLabel && block.custom) return block.label;
  const course = courseForBlockOnDay(block.id, date, lessonsRead);
  if (!course) return isoWeekday(date) >= 5 ? 'Catch-up' : 'Garden & Projects';
  return ROTATION_LABELS[course] || block.label || '';
}

/** The icon for the block on this day. */
export function blockIconOnDay(block, date, lessonsRead = null) {
  if (!block || !isRotatingBlock(block.id)) return block?.icon || '';
  const course = courseForBlockOnDay(block.id, date, lessonsRead);
  return course ? ROTATION_ICONS[course] || block.icon : '🌿';
}

/** How many days a week a rotating block gives one course. */
export function daysPerWeekFor(courseId) {
  let n = 0;
  for (const rota of Object.values(BLOCK_ROTATION)) {
    for (const c of Object.values(rota)) if (c === courseId) n++;
  }
  return n;
}

/** Every course that appears in any rotation. */
export function rotatingCourseIds() {
  const s = new Set();
  for (const rota of Object.values(BLOCK_ROTATION)) {
    for (const c of Object.values(rota)) s.add(c);
  }
  return [...s];
}
