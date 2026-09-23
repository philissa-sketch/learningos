// ---------------------------------------------------------------------------
// WHAT IS SHE BEHIND ON — the engine behind Friday.
//
// ---- WHY (v3.10) ----
//
// Gigi's week is Monday to Friday: three lessons, a test on Thursday, and
// "if she didnt finish everything she will have to make it up friday."
//
// The app had no way to answer that. It knew which lessons she had read and
// which tests she had sat, and it had no concept of being behind at all — so
// falling behind became a quiet debt with no landing place.
//
// ---- THE HARD PART: WHAT DOES "BEHIND" MEAN WITH NO CALENDAR? ----
//
// The app does not map curriculum week 1 onto a date, and it should not: she is
// homeschooled, weeks get moved, and a schedule that scolds her for a family trip
// is a schedule she stops opening.
//
// So "behind" is defined by HER OWN PROGRESS, not by the calendar:
//
//   Her FURTHEST WEEK is the latest week containing a lesson she has read.
//   Anything unfinished at or before that week is behind. Anything after it is
//   simply not started yet, and is not her fault.
//
// That means moving forward is what surfaces the debt — which is the right way
// round. Reading week 5's first lesson is what makes week 4's unread lesson
// appear on Friday. Nothing nags her about work she was never going to have done.
//
// ---- WHAT IT NEVER DOES ----
//
// It never blocks anything, never scores anything, and never counts how late she
// is. It is a list of what is still open, in the order she met it. Same principle
// as the practice gate: a nine-year-old behind a wall she cannot pass stops
// opening the app, and then nothing else in here matters.
// ---------------------------------------------------------------------------

import { allWeeks } from '../config/assessment.js';
import { PROJECTS, PROJECTS_COURSE } from '../config/projects.js';
// v3.25 — Friday could not offer a Science Lab lesson she had missed, because
// this asked Herbalism for the lesson and got null.
import { lessonById as herbalismLessonById, moduleForLesson } from '../data/lessons/appCourses.js';

/** Weeks in teaching order: quarter first, then week number. */
function orderedWeeks() {
  return [...allWeeks()].sort((a, b) => a.quarter - b.quarter || a.n - b.n);
}

/** The distinct courses that have any registered week at all. */
function courseIds() {
  return [...new Set(allWeeks().map((w) => w.course))];
}

/** Weeks of one course, in teaching order. */
function orderedWeeksOf(courseId) {
  return orderedWeeks().filter((w) => w.course === courseId);
}

/**
 * The latest week she has touched. Everything up to and including it counts as
 * work in progress; everything after it has not started.
 *
 * Returns null when she has read nothing at all — a child on day one is not
 * behind on anything, and Friday should say so rather than showing her a list.
 */
export function furthestWeek(lessonsRead, courseId = null) {
  const read = new Set(lessonsRead || []);
  let furthest = null;
  const weeks = courseId ? orderedWeeksOf(courseId) : orderedWeeks();
  for (const w of weeks) {
    if (w.lessons.some((l) => read.has(l))) furthest = w;
  }
  return furthest;
}

/**
 * THE MARKER IS PER COURSE, AND v3.25 IS WHERE THAT STOPPED BEING OPTIONAL.
 *
 * Until The Science Lab was registered in WEEKS there was one course, so one
 * marker was the same thing as one marker per course and the distinction cost
 * nothing. With two courses it is the difference between Friday being useful
 * and Friday being a liar.
 *
 * Herbalism runs sixteen weeks a year; The Science Lab runs eight, in Quarters
 * 1 and 3 only. A single marker sorted on quarter-then-number would read her
 * Herbalism week 5 and conclude she was five weeks into EVERYTHING — so every
 * Science Lab lesson up to that point would appear on Friday as unfinished
 * work, including weeks of a course she had not opened once.
 *
 * That is precisely what the header of this file forbids: nothing nags her
 * about work she was never going to have done. So each course gets its own
 * marker, and a course she has not started produces no debt at all.
 */
export function markersByCourse(lessonsRead) {
  const out = {};
  for (const c of courseIds()) {
    const m = furthestWeek(lessonsRead, c);
    if (m) out[c] = m;
  }
  return out;
}

function isAtOrBefore(week, marker) {
  if (!marker) return false;
  if (marker.course && week.course !== marker.course) return false;
  return week.quarter < marker.quarter || (week.quarter === marker.quarter && week.n <= marker.n);
}

/**
 * Everything still open, in the order she met it.
 *
 * @param lessonsRead    array of lesson ids she has read
 * @param attemptsByTest object keyed by test id -> array of attempts
 * @param projectStatus  object keyed by project id -> { projectId, doneAt, ... }
 */
export function catchUpList({ lessonsRead = [], attemptsByTest = {}, projectStatus = {} } = {}) {
  const read = new Set(lessonsRead);
  const markers = markersByCourse(lessonsRead);
  // The overall marker is still reported, for the one line Friday prints about
  // where she has got to. It is no longer what decides what is owed.
  const marker = furthestWeek(lessonsRead);

  const lessons = [];
  const tests = [];
  const projects = [];

  if (!marker) {
    return { started: false, marker: null, lessons, tests, projects, total: 0 };
  }

  for (const w of orderedWeeks()) {
    if (!isAtOrBefore(w, markers[w.course])) continue;

    for (const lid of w.lessons) {
      if (read.has(lid)) continue;
      const lesson = herbalismLessonById(lid);
      lessons.push({
        lessonId: lid,
        title: lesson?.title || lid,
        quarter: w.quarter,
        week: w.n,
        weekTitle: w.title,
        module: moduleForLesson(lid)?.n ?? null
      });
    }

    // A weekly test is only owed once every lesson in that week has been read.
    // Offering a test on lessons she has not had is a trick question with extra
    // steps — the same rule the Lessons screen already enforces.
    const weekComplete = w.lessons.length === w.planned && w.lessons.every((l) => read.has(l));
    const sat = (attemptsByTest[w.id] || []).length > 0;
    if (weekComplete && !sat) {
      tests.push({ testId: w.id, quarter: w.quarter, week: w.n, weekTitle: w.title });
    }
  }

  // A project is due against the marker of the course that OWNS it, not against
  // the furthest week of anything she happens to have opened. See PROJECTS_COURSE.
  const projectMarker = markers[PROJECTS_COURSE] || null;
  for (const p of PROJECTS) {
    if (!projectMarker) break;
    const dueMarker = { quarter: p.quarter, n: p.dueWeek };
    const due =
      dueMarker.quarter < projectMarker.quarter ||
      (dueMarker.quarter === projectMarker.quarter && dueMarker.n <= projectMarker.n);
    if (!due) continue;
    // `doneAt` is the field the store persists — a timestamp, not a boolean, so
    // the record says WHEN she finished rather than just that she did. An earlier
    // draft of this line read `.done`, which no writer ever sets, so every project
    // would have stayed on Friday forever no matter how many she finished.
    // check-projects caught it on its first run.
    if (projectStatus[p.id]?.doneAt) continue;
    projects.push(p);
  }

  return {
    started: true,
    marker: { quarter: marker.quarter, week: marker.n, title: marker.title },
    lessons,
    tests,
    projects,
    total: lessons.length + tests.length + projects.length
  };
}

/** True when there is nothing open. Friday should celebrate this, not hide it. */
export function isCaughtUp(args) {
  return catchUpList(args).total === 0;
}

export default catchUpList;
