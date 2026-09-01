// ---------------------------------------------------------------------------
// EVERY QUESTION IN THE APP, FROM EVERY COURSE. The one door.
//
// ---- WHAT THIS FIXED, v3.25 ----
//
// The Science Lab's sixty Module 1 questions were written at v3.24, checked by
// check-sciencelab, recorded in the build log as shipped — and no screen in the
// app could reach a single one of them.
//
// Not a bug in the data. A bug in the DOOR. Every consumer in the app asked
// `herbalismCourseBank.js` for questions:
//
//     assessmentEngine.js   weekly tests, quarter exams
//     WarmUpCard.jsx        her three questions every morning
//     TestView.jsx          the paper itself, and the exit ticket
//     LessonReader.jsx      the practice gate
//     GradebookPanel.jsx    the record a transcript is built from
//     useAppStore.js        which questions are eligible for review
//
// A file named after one course was standing in for "the app". So Thursday's
// test could not draw a science question, her warm-up could not serve one, and
// the Gradebook could not have shown a science miss even if she had made one.
//
// This file is what those consumers ask now. Herbalism's own file is untouched
// and still exports everything it did — nothing there moved, and check-delivery
// asserts Herbalism's question set is IDENTICAL through this door, by id, so a
// regression there fails the build rather than being noticed in April.
//
// ---- THE RULE THIS PUTS SOMEWHERE A CHECK CAN SEE IT ----
//
//   A lesson that is written is a lesson she can reach.
//
// It used to live in the build log as a sentence — "placed is not shipped",
// written at v3.3 after the identical failure. A sentence in a log is not a
// rule. This file plus check-delivery.mjs is the same rule where it can fail a
// build.
// ---------------------------------------------------------------------------

import { HERBALISM_COURSE_BANK, BANKS as HERBALISM_BANKS } from './herbalismCourseBank.js';
import { SCIENCELAB_COURSE_BANK, SCIENCELAB_BANKS } from './sciencelabCourseBank.js';
import { SOCIAL_COURSE_BANK, SOCIAL_BANKS } from './socialCourseBank.js';
import { HUMANBODY_COURSE_BANK, HUMANBODY_BANKS } from './humanbodyCourseBank.js';

/**
 * Every question in the app, one flat list.
 *
 * Order is Herbalism, The Science Lab, Social Studies, The Human Body, and
 * nothing should depend on it — every consumer filters by lesson id and every
 * test shuffles with a seed.
 */
export const ALL_BANK_ITEMS = [
  ...HERBALISM_COURSE_BANK,
  ...SCIENCELAB_COURSE_BANK,
  ...SOCIAL_COURSE_BANK,
  ...HUMANBODY_COURSE_BANK
];

/** Every bank keyed by module, across all four courses. */
export const BANKS = {
  ...HERBALISM_BANKS,
  ...SCIENCELAB_BANKS,
  ...SOCIAL_BANKS,
  ...HUMANBODY_BANKS
};

/** One flat list of every question in the app. This time it is true. */
export function allBankItems() {
  return ALL_BANK_ITEMS;
}

export function itemsForLesson(lessonId) {
  return ALL_BANK_ITEMS.filter((q) => q.lesson === lessonId);
}

export function itemsForLessons(lessonIds) {
  const set = new Set(lessonIds);
  return ALL_BANK_ITEMS.filter((q) => set.has(q.lesson));
}

export function bankItemById(id) {
  return ALL_BANK_ITEMS.find((q) => q.id === id) || null;
}

/** Which course a question belongs to, read from the lesson id prefix. */
export function courseOfQuestion(q) {
  if (!q?.lesson) return null;
  if (String(q.lesson).startsWith('sl-')) return 'sciencelab';
  if (String(q.lesson).startsWith('hb-')) return 'herbalism';
  // v3.34. A prefix this function does not know returns null, and null here
  // means "this question belongs to no course" — which is silent and wrong
  // rather than loud and wrong. Social Studies was added to the same version
  // as its first module for exactly that reason.
  if (String(q.lesson).startsWith('ss-')) return 'social';
  return null;
}

export default ALL_BANK_ITEMS;
