// ---------------------------------------------------------------------------
// EVERY COURSE THE APP TEACHES ITSELF. The spine My Lessons reads.
//
// ---- WHY, v3.25 ----
//
// My Lessons imported `herbalismCourse.js` directly and rendered
// HERBALISM_MODULES. That was honest while Herbalism was the only course the
// app taught. It stopped being honest at v3.24, when six Science Lab lessons
// were written and the screen had no way to show them — the course existed on
// disk and its only appearance anywhere in src/components was a microscope
// emoji printed beside its name on the year plan.
//
// A screen that names one course cannot grow a second one. So the screen now
// asks THIS file what courses there are, and each course says where its
// modules, its lessons and its weeks live.
//
// ---- WHAT A COURSE OWES ----
//
//   id          matches curriculumPlan.js and the `course` field on every week
//   label       what she sees at the top of the screen
//   emoji       one character, hers
//   modules     in teaching order, each with n, quarter, weeks[], title, blurb,
//               lessons[] as ids
//   lessons     every written lesson object
//   quarters    which quarters this course actually runs in
//   weeksKey    its key in WEEKS — the same string as `id`, asserted by check
//
// ---- THE RULE ----
//
// A course added here is reachable. A course NOT added here is invisible, which
// is exactly the failure this file exists because of — so check-delivery fails
// the build if any course in curriculumPlan.js has lessons written and is not
// in APP_COURSES below.
// ---------------------------------------------------------------------------

import {
  ALL_HERBALISM_LESSONS,
  HERBALISM_MODULES,
  herbalismLessonById
} from './herbalismCourse.js';
import { ALL_SCIENCELAB_LESSONS, SCIENCELAB_MODULES } from './sciencelabCourse.js';
import { ALL_SOCIAL_LESSONS, SOCIAL_MODULES } from './socialCourse.js';
import { ALL_HUMANBODY_LESSONS, HUMANBODY_MODULES } from './humanbodyCourse.js';

export const APP_COURSES = [
  {
    id: 'herbalism',
    label: 'Herbalism & Botany',
    emoji: '🌿',
    blurb:
      'Sixteen modules. Three lessons Monday to Wednesday, a review game and a test on Thursday, and Friday to catch up anything unfinished.',
    minutes: 45,
    quarters: [1, 2, 3, 4],
    modules: HERBALISM_MODULES,
    lessons: ALL_HERBALISM_LESSONS
  },
  {
    id: 'sciencelab',
    label: 'The Science Lab',
    emoji: '🔬',
    blurb:
      'The Georgia science a garden cannot honestly reach — forces, gravity, simple machines, light, sound, the stars and the moon. Half an hour a day in the 2:10 block.',
    minutes: 30,
    quarters: [1, 3],
    modules: SCIENCELAB_MODULES,
    lessons: ALL_SCIENCELAB_LESSONS
  },
  {
    id: 'social',
    label: 'Social Studies',
    emoji: '🌍',
    blurb:
      'United States History Year 2 — the Revolution, the Constitution, westward expansion, the Civil War and Reconstruction. Mondays and Wednesdays in the 2:45 block, Quarters 1 to 3.',
    minutes: 30,
    quarters: [1, 2, 3],
    modules: SOCIAL_MODULES,
    lessons: ALL_SOCIAL_LESSONS
  },
  {
    id: 'humanbody',
    label: 'The Human Body',
    emoji: '🫀',
    blurb:
      'What a doctor actually does — take a pulse, listen to a chest, test a reflex, read a growth chart. Sixteen modules, Tuesdays and Thursdays in the 2:45 block, all four quarters.',
    minutes: 30,
    quarters: [1, 2, 3, 4],
    modules: HUMANBODY_MODULES,
    lessons: ALL_HUMANBODY_LESSONS
  }
];

/** Every lesson in the app, from every course. */
export const ALL_LESSONS = APP_COURSES.flatMap((c) => c.lessons);

/** Every module in the app, tagged with the course it belongs to. */
export const ALL_MODULES = APP_COURSES.flatMap((c) =>
  c.modules.map((m) => ({ ...m, course: c.id }))
);

export function courseById(id) {
  return APP_COURSES.find((c) => c.id === id) || null;
}

/**
 * One lookup across every lesson in the app, whatever course it belongs to.
 *
 * This is deliberately NOT herbalismLessonById with a fallback. A lookup that
 * tries one course first and another second reads as a hierarchy, and the next
 * course added would go to the bottom of it.
 */
export function lessonById(id) {
  return ALL_LESSONS.find((l) => l.id === id) || null;
}

export function courseOfLesson(id) {
  return APP_COURSES.find((c) => c.lessons.some((l) => l.id === id))?.id || null;
}

export function moduleForLesson(id) {
  return ALL_MODULES.find((m) => m.lessons.includes(id)) || null;
}

export function modulesOfQuarter(courseId, quarter) {
  return (courseById(courseId)?.modules || []).filter((m) => m.quarter === quarter);
}

/** Kept so nothing that already imports it has to change. */
export { herbalismLessonById };

export default APP_COURSES;
