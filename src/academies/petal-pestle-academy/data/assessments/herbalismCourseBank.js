// ---------------------------------------------------------------------------
// HERBALISM & BOTANY — THE WHOLE QUESTION BANK, QUARTERS 1 AND 2.
//
// One import point. 405 questions across 48 lessons.
//
//   340   ten per lesson, across the 34 lessons written to the beats spec
//    65   five per lesson, across the 13 lessons still on the flat-card shape
//
// The uneven depth is real and it is not hidden. A week built from three new
// lessons has a 30-question pool for its 8-question weekly test; a week built
// from three older lessons has 15. Both are enough for the test and for a
// re-take to be a different paper, which is the floor that matters. Bringing
// the thirteen up to ten each is the next content job.
//
// None of these are asked at the end of a lesson. They feed Friday.
// ---------------------------------------------------------------------------

import { HERBALISM_M1_BANK } from './herbalismM1Bank.js';
import { HERBALISM_Q1_BANK } from './herbalismQ1Bank.js';
import { HERBALISM_M1_NEW_BANK, HERBALISM_M2_NEW_BANK } from './herbalismM1M2Bank.js';
import { HERBALISM_M3_BANK } from './herbalismM3Bank.js';
import { HERBALISM_M4_NEW_BANK, HERBALISM_M8_NEW_BANK } from './herbalismM4M8Bank.js';
import { HERBALISM_M5_BANK } from './herbalismM5Bank.js';
import { HERBALISM_M6_NEW_BANK } from './herbalismM6Bank.js';
import { HERBALISM_M7_BANK } from './herbalismM7Bank.js';
// ---- Quarters 3 and 4, added v3.9 ----
import { HERBALISM_M9_BANK } from './herbalismM9Bank.js';
import { HERBALISM_M10_BANK } from './herbalismM10Bank.js';
import { HERBALISM_M11_BANK } from './herbalismM11Bank.js';
import { HERBALISM_M12_BANK } from './herbalismM12Bank.js';
import { HERBALISM_M13_BANK } from './herbalismM13Bank.js';
import { HERBALISM_M14_BANK } from './herbalismM14Bank.js';
import { HERBALISM_M15_BANK } from './herbalismM15Bank.js';
import { HERBALISM_M16_BANK } from './herbalismM16Bank.js';

export const HERBALISM_COURSE_BANK = [
  ...HERBALISM_M1_BANK,
  ...HERBALISM_M1_NEW_BANK,
  ...HERBALISM_M2_NEW_BANK,
  ...HERBALISM_M3_BANK,
  ...HERBALISM_M4_NEW_BANK,
  ...HERBALISM_M5_BANK,
  ...HERBALISM_M6_NEW_BANK,
  ...HERBALISM_M7_BANK,
  ...HERBALISM_M8_NEW_BANK,
  ...HERBALISM_Q1_BANK,
  ...HERBALISM_M9_BANK,
  ...HERBALISM_M10_BANK,
  ...HERBALISM_M11_BANK,
  ...HERBALISM_M12_BANK,
  ...HERBALISM_M13_BANK,
  ...HERBALISM_M14_BANK,
  ...HERBALISM_M15_BANK,
  ...HERBALISM_M16_BANK
];

/**
 * Every bank in the app, keyed by module.
 *
 * The shape is kept from the pre-v3.8 `BANKS` export in herbalismQ1Bank.js
 * because the practice gate, the review boxes and every test reach in here by
 * the same names. ONE pool, one id space, one memory of how she did — a lesson
 * whose questions live somewhere else is a lesson the spaced review cannot see.
 */
export const BANKS = {
  'herbalism-m1': [...HERBALISM_M1_BANK, ...HERBALISM_M1_NEW_BANK],
  'herbalism-m2': HERBALISM_M2_NEW_BANK,
  'herbalism-m3': HERBALISM_M3_BANK,
  'herbalism-m4': HERBALISM_M4_NEW_BANK,
  'herbalism-m5': HERBALISM_M5_BANK,
  'herbalism-m6': HERBALISM_M6_NEW_BANK,
  'herbalism-m7': HERBALISM_M7_BANK,
  'herbalism-m8': HERBALISM_M8_NEW_BANK,
  // The thirteen lessons written before the restructure. Their ids are unchanged
  // and so are their questions; only which week they belong to moved.
  'herbalism-q1-legacy': HERBALISM_Q1_BANK,
  'herbalism-m9': HERBALISM_M9_BANK,
  'herbalism-m10': HERBALISM_M10_BANK,
  'herbalism-m11': HERBALISM_M11_BANK,
  'herbalism-m12': HERBALISM_M12_BANK,
  'herbalism-m13': HERBALISM_M13_BANK,
  'herbalism-m14': HERBALISM_M14_BANK,
  'herbalism-m15': HERBALISM_M15_BANK,
  'herbalism-m16': HERBALISM_M16_BANK
};

/** One flat list of every question in the app. */
export function allBankItems() {
  return HERBALISM_COURSE_BANK;
}

export function itemsForLesson(lessonId) {
  return HERBALISM_COURSE_BANK.filter((q) => q.lesson === lessonId);
}

export function itemsForLessons(lessonIds) {
  const set = new Set(lessonIds);
  return HERBALISM_COURSE_BANK.filter((q) => set.has(q.lesson));
}

export function bankItemById(id) {
  return HERBALISM_COURSE_BANK.find((q) => q.id === id) || null;
}

export default HERBALISM_COURSE_BANK;
