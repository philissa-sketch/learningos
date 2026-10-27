// ---------------------------------------------------------------------------
// EVERY COURSE SHE HAS, IN ONE LIST FOR A GROWN-UP.
//
// Gigi, Oct 27 2026: "In the parent area I want to be able to see all of her
// courses to make sure they are there. Cause it is locked for her and me."
//
// The Khan grading screen only ever showed the course she was in, and the
// student screens only show what is open to her. Neither could answer "is
// 4th grade math in the app at all?" - which is exactly the question that
// mattered when 3rd grade math was missing and nothing said so.
//
// This lists every course the app knows, reached or not, with where she stands
// in it. It is PURE (record in, rows out) so a check can call it, and it never
// hides a course because she has not reached it. Hiding unreached courses is
// what the waiting list does on purpose; this screen is the opposite.
// ---------------------------------------------------------------------------

import { APP_COURSES } from '../data/lessons/appCourses.js';
import { READING_MODULES } from '../data/reading/course/readingCourse.js';
import { readingLine } from './readingProgress.js';
import {
  KHAN_UNIT_COURSES,
  courseComplete,
  nextUnitFor,
  nextCourseInLadder,
  previousCourseInLadder,
  countsAsUnitDone,
  unitUrl,
  unitTestUrl,
  courseChallengeUrl
} from '../data/khan/khanUnits.js';

export const KHAN_STATUS = {
  finished: 'Finished',
  inProgress: 'In progress',
  nextUp: 'Next up',
  ahead: 'Ahead of her'
};

/** Where she stands in one Khan course. */
export function khanStatus(courseId, grades = []) {
  if (courseComplete(courseId, grades)) return 'finished';
  const any = (grades || []).some((g) => g && g.courseId === courseId);
  if (any) return 'inProgress';
  const prev = previousCourseInLadder(courseId);
  if (prev && courseComplete(prev, grades)) return 'nextUp';
  // An entry course with no result yet is where she starts.
  return prev ? 'ahead' : 'nextUp';
}

/**
 * @returns {{ app: object[], khan: object[] }}
 */
export function buildCourseCatalog({ khanGrades = [], lessonReads = {} } = {}) {
  const read = new Set(Object.keys(lessonReads || {}));

  const app = APP_COURSES.map((c) => ({
    id: c.id,
    label: c.label,
    emoji: c.emoji,
    quarters: c.quarters,
    modules: c.modules.length,
    lessons: c.lessons.length,
    lessonsRead: c.lessons.filter((l) => read.has(l.id)).length,
    minutes: c.minutes || null
  }));
  // Her Reading course is taught by the app too, but lives outside appCourses.
  app.push({
    id: 'reading',
    label: 'Reading (her own course)',
    emoji: '📖',
    quarters: [1],
    modules: READING_MODULES.length,
    lessons: readingLine().length,
    lessonsRead: null,
    minutes: null
  });

  const khan = Object.values(KHAN_UNIT_COURSES).map((c) => {
    const done = new Set(
      (khanGrades || []).filter((g) => g && g.courseId === c.courseId && countsAsUnitDone(g)).map((g) => Number(g.unitN))
    );
    const challenge = (khanGrades || []).find((g) => g && g.courseId === c.courseId && g.kind === 'course-challenge') || null;
    const next = nextUnitFor(c.courseId, khanGrades);
    return {
      courseId: c.courseId,
      label: c.label,
      subject: c.subject,
      graded: c.graded,
      status: khanStatus(c.courseId, khanGrades),
      unitCount: c.units.length,
      unitsGraded: done.size,
      nextUnit: next ? { n: next.n, name: next.name } : null,
      hasChallenge: Boolean(c.courseChallenge),
      challenge: challenge ? { percent: challenge.percent, grade: challenge.grade, at: challenge.at } : null,
      challengeUrl: courseChallengeUrl(c.courseId),
      thenCourse: nextCourseInLadder(c.courseId),
      units: c.units.map((u) => ({
        n: u.n,
        name: u.name,
        graded: done.has(u.n),
        url: unitUrl(c.courseId, u.n),
        testUrl: unitTestUrl(c.courseId, u.n)
      }))
    };
  });

  return { app, khan };
}
