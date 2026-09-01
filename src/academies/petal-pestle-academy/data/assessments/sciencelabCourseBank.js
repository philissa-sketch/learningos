// ---------------------------------------------------------------------------
// THE SCIENCE LAB — THE WHOLE QUESTION BANK. One import point.
//
// ---- WHY THIS FILE EXISTS, AND IT IS NOT TIDINESS ----
//
// Before v3.25 there was no course-level bank for The Science Lab. There was
// one module file, the Module 1 bank, and `check-sciencelab.mjs` reached for it
// BY NAME — it destructured SCIENCELAB_M1_BANK out of a hard-coded path and
// assigned it to a constant called BANK.
//
// That is fine with one module and quietly wrong with two. The check's answer-
// spread rule — the one written after 42 of 60 answers turned up in slot B —
// would have gone on measuring Module 1's sixty questions for ever, however
// many modules were added on top. A second module could ship with every answer
// in slot A and the build would stay green.
//
// So the bank is a LIST that modules are added to, and the check reads the
// list. Adding a module here is the only way to add one at all, and forgetting
// to add it is now a failure rather than a silence: check-delivery asserts that
// every module in SCIENCELAB_MODULES has questions behind it in this file.
//
// ---- WHY IT IS NOT MERGED INTO herbalismCourseBank.js ----
//
// Because that file is Herbalism's, it is imported by name in five places, and
// mixing two courses into a file named after one of them is how the next person
// ends up reading Herbalism's header to find out about gravity. The app-wide
// join happens one level up, in appBank.js, where both courses are equals.
//
// ---- SHAPE ----
//
// Ten questions per lesson. They do NOT go at the end of a lesson: hers is
// thirty minutes with a hands-on activity inside it. Inside the lesson she
// answers five — two Apply-Its in the beats and a three-question check. These
// ten feed Thursday's weekly test, the quarter exam, the morning warm-up and
// the practice gate.
// ---------------------------------------------------------------------------

import { SCIENCELAB_M1_BANK } from './sciencelabM1Bank.js';
import { SCIENCELAB_M2_BANK } from './sciencelabM2Bank.js';
import { SCIENCELAB_M3_BANK } from './sciencelabM3Bank.js';
import { SCIENCELAB_M4_BANK } from './sciencelabM4Bank.js';
import { SCIENCELAB_M5_BANK } from './sciencelabM5Bank.js';
import { SCIENCELAB_M6_BANK } from './sciencelabM6Bank.js';
import { SCIENCELAB_M7_BANK } from './sciencelabM7Bank.js';
import { SCIENCELAB_M8_BANK } from './sciencelabM8Bank.js';

/** Every Science Lab question the app has. Add a module by adding it here. */
export const SCIENCELAB_COURSE_BANK = [
  ...SCIENCELAB_M1_BANK,
  ...SCIENCELAB_M2_BANK,
  ...SCIENCELAB_M3_BANK,
  ...SCIENCELAB_M4_BANK,
  ...SCIENCELAB_M5_BANK,
  ...SCIENCELAB_M6_BANK,
  ...SCIENCELAB_M7_BANK,
  ...SCIENCELAB_M8_BANK
];

/**
 * Keyed by module, the same shape as Herbalism's BANKS.
 *
 * The key is `sciencelab-m<n>` and it must match the module number in
 * SCIENCELAB_MODULES. check-delivery walks the modules and looks each one up
 * here, so a module written without a bank fails the build instead of shipping
 * sixty questions short.
 */
export const SCIENCELAB_BANKS = {
  'sciencelab-m1': SCIENCELAB_M1_BANK,
  'sciencelab-m2': SCIENCELAB_M2_BANK,
  'sciencelab-m3': SCIENCELAB_M3_BANK,
  'sciencelab-m4': SCIENCELAB_M4_BANK,
  'sciencelab-m5': SCIENCELAB_M5_BANK,
  'sciencelab-m6': SCIENCELAB_M6_BANK,
  'sciencelab-m7': SCIENCELAB_M7_BANK,
  'sciencelab-m8': SCIENCELAB_M8_BANK
};

export function sciencelabItemsForLesson(lessonId) {
  return SCIENCELAB_COURSE_BANK.filter((q) => q.lesson === lessonId);
}

export default SCIENCELAB_COURSE_BANK;
