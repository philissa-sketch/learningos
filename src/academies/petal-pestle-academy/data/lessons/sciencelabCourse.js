// ---------------------------------------------------------------------------
// THE SCIENCE LAB — one import point for the course.
//
// Same shape as herbalismCourse.js and for the same reason: before v3.8 the app
// imported lesson arrays directly and every new module meant editing every
// screen that showed one. Screens import from here; modules are added here.
//
// The course carries the fifteen Georgia fourth-grade science elements a garden
// cannot honestly reach. Khan cannot help — /science/3rd-, 4th- and
// 5th-grade-science were all rendered on Aug 16 2026 and every one returns
// "Page not found". Khan's science index starts at 6th grade now.
//
//   Q1  Modules 1-4   forces, gravity, simple machines, light   24 lessons
//   Q3  Modules 5-8   sound, stars and planets, the moon        24 lessons
// ---------------------------------------------------------------------------

import { SCIENCELAB_M1, SCIENCELAB_M1_META } from './sciencelabM1.js';
import { SCIENCELAB_M2, SCIENCELAB_M2_META } from './sciencelabM2.js';
import { SCIENCELAB_M3, SCIENCELAB_M3_META } from './sciencelabM3.js';
import { SCIENCELAB_M4, SCIENCELAB_M4_META } from './sciencelabM4.js';
import { SCIENCELAB_M5, SCIENCELAB_M5_META } from './sciencelabM5.js';
import { SCIENCELAB_M6, SCIENCELAB_M6_META } from './sciencelabM6.js';
import { SCIENCELAB_M7, SCIENCELAB_M7_META } from './sciencelabM7.js';
import { SCIENCELAB_M8, SCIENCELAB_M8_META } from './sciencelabM8.js';

export const ALL_SCIENCELAB_LESSONS = [
  ...SCIENCELAB_M1,
  ...SCIENCELAB_M2,
  ...SCIENCELAB_M3,
  ...SCIENCELAB_M4,
  ...SCIENCELAB_M5,
  ...SCIENCELAB_M6,
  ...SCIENCELAB_M7,
  ...SCIENCELAB_M8
];

export const SCIENCELAB_MODULES = [
  {
    n: 1,
    ...SCIENCELAB_M1_META,
    quarter: 1,
    weeks: [1, 2],
    elements: ['S4P3a'],
    lessons: SCIENCELAB_M1.map((l) => l.id)
  },
  {
    n: 2,
    ...SCIENCELAB_M2_META,
    quarter: 1,
    weeks: [3, 4],
    elements: ['S4P3b'],
    lessons: SCIENCELAB_M2.map((l) => l.id)
  },
  {
    n: 3,
    ...SCIENCELAB_M3_META,
    quarter: 1,
    weeks: [5, 6],
    elements: ['S4P3c'],
    lessons: SCIENCELAB_M3.map((l) => l.id)
  },
  {
    n: 4,
    ...SCIENCELAB_M4_META,
    quarter: 1,
    weeks: [7, 8],
    // The only Quarter 1 module carrying more than one element. Georgia
    // genuinely splits light into three questions and each gets two lessons.
    elements: ['S4P1a', 'S4P1b', 'S4P1c'],
    lessons: SCIENCELAB_M4.map((l) => l.id)
  },
  // ===================== QUARTER 3 =====================
  {
    n: 5,
    ...SCIENCELAB_M5_META,
    quarter: 3,
    weeks: [1, 2],
    elements: ['S4P2a', 'S4P2b'],
    lessons: SCIENCELAB_M5.map((l) => l.id)
  },
  {
    n: 6,
    ...SCIENCELAB_M6_META,
    quarter: 3,
    weeks: [3, 4],
    elements: ['S4E1a', 'S4E1b', 'S4E1c'],
    lessons: SCIENCELAB_M6.map((l) => l.id)
  },
  {
    n: 7,
    ...SCIENCELAB_M7_META,
    quarter: 3,
    weeks: [5, 6],
    // Lesson 42 is a TOOLS lesson, not a model lesson, so this module carries
    // S4E1a alongside S4E1d — the same shape as Module 4 carrying three.
    elements: ['S4E1d', 'S4E1a'],
    lessons: SCIENCELAB_M7.map((l) => l.id)
  },
  {
    n: 8,
    ...SCIENCELAB_M8_META,
    quarter: 3,
    weeks: [7, 8],
    elements: ['S4E2a', 'S4E2b', 'S4E2c'],
    lessons: SCIENCELAB_M8.map((l) => l.id)
  }
];

export function sciencelabLessonById(id) {
  return ALL_SCIENCELAB_LESSONS.find((l) => l.id === id) || null;
}

export function sciencelabModuleFor(lessonId) {
  return SCIENCELAB_MODULES.find((m) => m.lessons.includes(lessonId)) || null;
}

export default ALL_SCIENCELAB_LESSONS;
