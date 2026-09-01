// ---------------------------------------------------------------------------
// SOCIAL STUDIES — THE WHOLE QUESTION BANK. One import point.
//
// A LIST that modules are added to, not a file reached for by name. The Science
// Lab's check destructured SCIENCELAB_M1_BANK directly until v3.25, which was
// fine with one module and quietly wrong with two: a second module could have
// shipped with every answer in slot A and the build would have stayed green.
//
// Ten questions per lesson. Inside the lesson she answers five — two Apply-Its
// and a three-question check. These ten feed Thursday's weekly test, the
// quarter exam, the morning warm-up and the practice gate.
//
// This course sits a FIVE-question weekly test, not eight, because it teaches
// two lessons a week rather than three. That is declared per course in
// curriculumPlan.js, and check-curriculum-volume fails a test larger than three
// questions per lesson actually taught.
// ---------------------------------------------------------------------------

import { SOCIAL_M1_BANK } from './socialM1Bank.js';
import { SOCIAL_M2_BANK } from './socialM2Bank.js';
import { SOCIAL_M3_BANK } from './socialM3Bank.js';
import { SOCIAL_M4_BANK } from './socialM4Bank.js';
import { SOCIAL_M5_BANK } from './socialM5Bank.js';
import { SOCIAL_M6_BANK } from './socialM6Bank.js';
import { SOCIAL_M7_BANK } from './socialM7Bank.js';
import { SOCIAL_M8_BANK } from './socialM8Bank.js';
import { SOCIAL_M9_BANK } from './socialM9Bank.js';
import { SOCIAL_M10_BANK } from './socialM10Bank.js';
import { SOCIAL_M11_BANK } from './socialM11Bank.js';
import { SOCIAL_M12_BANK } from './socialM12Bank.js';

export const SOCIAL_COURSE_BANK = [
  ...SOCIAL_M1_BANK,
  ...SOCIAL_M2_BANK,
  ...SOCIAL_M3_BANK,
  ...SOCIAL_M4_BANK,
  ...SOCIAL_M5_BANK,
  ...SOCIAL_M6_BANK,
  ...SOCIAL_M7_BANK,
  ...SOCIAL_M8_BANK,
  ...SOCIAL_M9_BANK,
  ...SOCIAL_M10_BANK,
  ...SOCIAL_M11_BANK,
  ...SOCIAL_M12_BANK
];

/** Keyed by module, for the per-module answer-spread rule. */
export const SOCIAL_BANKS = {
  'social-m1': SOCIAL_M1_BANK,
  'social-m2': SOCIAL_M2_BANK,
  'social-m3': SOCIAL_M3_BANK,
  'social-m4': SOCIAL_M4_BANK,
  'social-m5': SOCIAL_M5_BANK,
  'social-m6': SOCIAL_M6_BANK,
  'social-m7': SOCIAL_M7_BANK,
  'social-m8': SOCIAL_M8_BANK,
  'social-m9': SOCIAL_M9_BANK,
  'social-m10': SOCIAL_M10_BANK,
  'social-m11': SOCIAL_M11_BANK,
  'social-m12': SOCIAL_M12_BANK
};

export default SOCIAL_COURSE_BANK;
