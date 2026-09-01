// ---------------------------------------------------------------------------
// THE HUMAN BODY — the course question bank.
//
// One module written so far. It joins the app-wide bank in appBank.js on the
// same day it is written, for the reason set out in humanbodyCourse.js: at
// v3.24 sixty written Science Lab questions could never appear in a test,
// because every consumer read a file named after one course.
//
// BANKS is keyed by module so check-delivery can assert that every module of a
// course has questions behind it — a module cannot be written and left sixty
// questions short in silence.
// ---------------------------------------------------------------------------

import { HUMANBODY_M1_BANK } from './humanbodyM1Bank.js';
import { HUMANBODY_M2_BANK } from './humanbodyM2Bank.js';
import { HUMANBODY_M3_BANK } from './humanbodyM3Bank.js';
import { HUMANBODY_M4_BANK } from './humanbodyM4Bank.js';
import { HUMANBODY_M5_BANK } from './humanbodyM5Bank.js';
import { HUMANBODY_M6_BANK } from './humanbodyM6Bank.js';
import { HUMANBODY_M7_BANK } from './humanbodyM7Bank.js';
import { HUMANBODY_M8_BANK } from './humanbodyM8Bank.js';
import { HUMANBODY_M9_BANK } from './humanbodyM9Bank.js';
import { HUMANBODY_M10_BANK } from './humanbodyM10Bank.js';
import { HUMANBODY_M11_BANK } from './humanbodyM11Bank.js';
import { HUMANBODY_M12_BANK } from './humanbodyM12Bank.js';
import { HUMANBODY_M13_BANK } from './humanbodyM13Bank.js';
import { HUMANBODY_M14_BANK } from './humanbodyM14Bank.js';
import { HUMANBODY_M15_BANK } from './humanbodyM15Bank.js';
import { HUMANBODY_M16_BANK } from './humanbodyM16Bank.js';

export const HUMANBODY_COURSE_BANK = [
  ...HUMANBODY_M1_BANK,
  ...HUMANBODY_M2_BANK,
  ...HUMANBODY_M3_BANK,
  ...HUMANBODY_M4_BANK,
  ...HUMANBODY_M5_BANK,
  ...HUMANBODY_M6_BANK,
  ...HUMANBODY_M7_BANK,
  ...HUMANBODY_M8_BANK,
  ...HUMANBODY_M9_BANK,
  ...HUMANBODY_M10_BANK,
  ...HUMANBODY_M11_BANK,
  ...HUMANBODY_M12_BANK,
  ...HUMANBODY_M13_BANK,
  ...HUMANBODY_M14_BANK,
  ...HUMANBODY_M15_BANK,
  ...HUMANBODY_M16_BANK
];

export const HUMANBODY_BANKS = {
  'humanbody-m1': HUMANBODY_M1_BANK,
  'humanbody-m2': HUMANBODY_M2_BANK,
  'humanbody-m3': HUMANBODY_M3_BANK,
  'humanbody-m4': HUMANBODY_M4_BANK,
  'humanbody-m5': HUMANBODY_M5_BANK,
  'humanbody-m6': HUMANBODY_M6_BANK,
  'humanbody-m7': HUMANBODY_M7_BANK,
  'humanbody-m8': HUMANBODY_M8_BANK,
  'humanbody-m9': HUMANBODY_M9_BANK,
  'humanbody-m10': HUMANBODY_M10_BANK,
  'humanbody-m11': HUMANBODY_M11_BANK,
  'humanbody-m12': HUMANBODY_M12_BANK,
  'humanbody-m13': HUMANBODY_M13_BANK,
  'humanbody-m14': HUMANBODY_M14_BANK,
  'humanbody-m15': HUMANBODY_M15_BANK,
  'humanbody-m16': HUMANBODY_M16_BANK
};

export default HUMANBODY_COURSE_BANK;
