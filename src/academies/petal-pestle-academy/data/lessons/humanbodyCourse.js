// ---------------------------------------------------------------------------
// THE HUMAN BODY — the course index.
//
// ⚠️ THIS FILE EXISTS BEFORE THE COURSE DOES, AND THAT IS DELIBERATE.
//
// At v3.24 The Science Lab shipped a module and NOTHING IN THE APP IMPORTED IT.
// Twenty-four checks were green while a whole course sat unreachable, because
// every consumer imported a file named after one course. The same failure had
// already happened at v3.3 and what came out of it was a sentence in a log —
// and a sentence in a log is not a rule.
//
// So this course is wired into the app-wide door with its FIRST module rather
// than its last. check-delivery asserts every written lesson sits in a week,
// has questions behind it, and is findable app-wide. Module 1 satisfies that on
// the day it is written, and every module after it joins something that already
// works.
//
// 16 modules, 64 lessons, four lessons to a module, a module to a fortnight.
// Tuesday and Thursday, all four quarters. QUARTER 1 COMPLETE at v3.48;
// QUARTER 2 COMPLETE at v3.50 — Modules 5 to 8. Modules 9–16 owed.
// ---------------------------------------------------------------------------

import { HUMANBODY_M1, HUMANBODY_M1_META } from './humanbodyM1.js';
import { HUMANBODY_M2, HUMANBODY_M2_META } from './humanbodyM2.js';
import { HUMANBODY_M3, HUMANBODY_M3_META } from './humanbodyM3.js';
import { HUMANBODY_M4, HUMANBODY_M4_META } from './humanbodyM4.js';
import { HUMANBODY_M5, HUMANBODY_M5_META } from './humanbodyM5.js';
import { HUMANBODY_M6, HUMANBODY_M6_META } from './humanbodyM6.js';
import { HUMANBODY_M7, HUMANBODY_M7_META } from './humanbodyM7.js';
import { HUMANBODY_M8, HUMANBODY_M8_META } from './humanbodyM8.js';
import { HUMANBODY_M9, HUMANBODY_M9_META } from './humanbodyM9.js';
import { HUMANBODY_M10, HUMANBODY_M10_META } from './humanbodyM10.js';
import { HUMANBODY_M11, HUMANBODY_M11_META } from './humanbodyM11.js';
import { HUMANBODY_M12, HUMANBODY_M12_META } from './humanbodyM12.js';
import { HUMANBODY_M13, HUMANBODY_M13_META } from './humanbodyM13.js';
import { HUMANBODY_M14, HUMANBODY_M14_META } from './humanbodyM14.js';
import { HUMANBODY_M15, HUMANBODY_M15_META } from './humanbodyM15.js';
import { HUMANBODY_M16, HUMANBODY_M16_META } from './humanbodyM16.js';

export const ALL_HUMANBODY_LESSONS = [
  ...HUMANBODY_M1,
  ...HUMANBODY_M2,
  ...HUMANBODY_M3,
  ...HUMANBODY_M4,
  ...HUMANBODY_M5,
  ...HUMANBODY_M6,
  ...HUMANBODY_M7,
  ...HUMANBODY_M8,
  ...HUMANBODY_M9,
  ...HUMANBODY_M10,
  ...HUMANBODY_M11,
  ...HUMANBODY_M12,
  ...HUMANBODY_M13,
  ...HUMANBODY_M14,
  ...HUMANBODY_M15,
  ...HUMANBODY_M16
];

export const HUMANBODY_MODULES = [
  {
    n: 1,
    ...HUMANBODY_M1_META,
    quarter: 1,
    weeks: [1, 2],
    // No Georgia element. This course is enrichment and carries none by
    // design — an empty list here is a statement, not an omission, and
    // check-standards reads the course's `kind` rather than this.
    elements: [],
    lessons: HUMANBODY_M1.map((l) => l.id)
  },
  {
    n: 2,
    ...HUMANBODY_M2_META,
    quarter: 1,
    weeks: [3, 4],
    elements: [],
    lessons: HUMANBODY_M2.map((l) => l.id)
  },
  {
    n: 3,
    ...HUMANBODY_M3_META,
    quarter: 1,
    weeks: [5, 6],
    elements: [],
    lessons: HUMANBODY_M3.map((l) => l.id)
  },
  {
    n: 4,
    ...HUMANBODY_M4_META,
    quarter: 1,
    weeks: [7, 8],
    elements: [],
    lessons: HUMANBODY_M4.map((l) => l.id)
  },
  {
    n: 5,
    ...HUMANBODY_M5_META,
    quarter: 2,
    weeks: [1, 2],
    elements: [],
    lessons: HUMANBODY_M5.map((l) => l.id)
  },
  {
    n: 6,
    ...HUMANBODY_M6_META,
    quarter: 2,
    weeks: [3, 4],
    elements: [],
    lessons: HUMANBODY_M6.map((l) => l.id)
  },
  {
    n: 7,
    ...HUMANBODY_M7_META,
    quarter: 2,
    weeks: [5, 6],
    elements: [],
    lessons: HUMANBODY_M7.map((l) => l.id)
  },
  {
    n: 8,
    ...HUMANBODY_M8_META,
    quarter: 2,
    weeks: [7, 8],
    elements: [],
    lessons: HUMANBODY_M8.map((l) => l.id)
  },
  {
    n: 9,
    ...HUMANBODY_M9_META,
    quarter: 3,
    weeks: [1, 2],
    elements: [],
    lessons: HUMANBODY_M9.map((l) => l.id)
  },
  {
    n: 10,
    ...HUMANBODY_M10_META,
    quarter: 3,
    weeks: [3, 4],
    elements: [],
    lessons: HUMANBODY_M10.map((l) => l.id)
  },
  {
    n: 11,
    ...HUMANBODY_M11_META,
    quarter: 3,
    weeks: [5, 6],
    elements: [],
    lessons: HUMANBODY_M11.map((l) => l.id)
  },
  {
    n: 12,
    ...HUMANBODY_M12_META,
    quarter: 3,
    weeks: [7, 8],
    elements: [],
    lessons: HUMANBODY_M12.map((l) => l.id)
  },
  {
    n: 13,
    ...HUMANBODY_M13_META,
    quarter: 4,
    weeks: [1, 2],
    elements: [],
    lessons: HUMANBODY_M13.map((l) => l.id)
  },
  {
    n: 14,
    ...HUMANBODY_M14_META,
    quarter: 4,
    weeks: [3, 4],
    elements: [],
    lessons: HUMANBODY_M14.map((l) => l.id)
  },
  {
    n: 15,
    ...HUMANBODY_M15_META,
    quarter: 4,
    weeks: [5, 6],
    elements: [],
    lessons: HUMANBODY_M15.map((l) => l.id)
  },
  {
    n: 16,
    ...HUMANBODY_M16_META,
    quarter: 4,
    weeks: [7, 8],
    elements: [],
    lessons: HUMANBODY_M16.map((l) => l.id)
  }
];

export function humanbodyLessonById(id) {
  return ALL_HUMANBODY_LESSONS.find((l) => l.id === id) || null;
}

export function humanbodyModuleFor(lessonId) {
  return HUMANBODY_MODULES.find((m) => m.lessons.includes(lessonId)) || null;
}

export default ALL_HUMANBODY_LESSONS;
