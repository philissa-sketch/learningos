// ---------------------------------------------------------------------------
// SOCIAL STUDIES — ONE IMPORT POINT FOR THE WHOLE COURSE.
//
// United States History Year 2: Revolution to Reconstruction.
// Quarters 1 to 3, Mondays and Wednesdays, 48 lessons when finished.
//
// ---- WHY THIS FILE EXISTS BEFORE THE COURSE DOES ----
//
// At v3.24 The Science Lab shipped six lessons, sixty questions, a verified
// video on each, its own check passing, and a build-log line saying it was
// wired in. NOTHING IN THE APP IMPORTED IT. Twenty-four checks were green while
// a whole course sat unreachable.
//
// So this course gets its door, its week registration and its bank entry in the
// SAME version as its first module — not afterwards. check-delivery asserts the
// reachability triple on every run: every lesson sits in exactly one week, has
// bank questions behind it, and is findable app-wide.
//
// Add a module here and to socialCourseBank.js, and add its weeks to
// config/assessment.js. Forgetting any one of the three is a build failure
// rather than a silence.
// ---------------------------------------------------------------------------

import { SOCIAL_M1, SOCIAL_M1_META } from './socialM1.js';
import { SOCIAL_M2, SOCIAL_M2_META } from './socialM2.js';
import { SOCIAL_M3, SOCIAL_M3_META } from './socialM3.js';
import { SOCIAL_M4, SOCIAL_M4_META } from './socialM4.js';
import { SOCIAL_M5, SOCIAL_M5_META } from './socialM5.js';
import { SOCIAL_M6, SOCIAL_M6_META } from './socialM6.js';
import { SOCIAL_M7, SOCIAL_M7_META } from './socialM7.js';
import { SOCIAL_M8, SOCIAL_M8_META } from './socialM8.js';
import { SOCIAL_M9, SOCIAL_M9_META } from './socialM9.js';
import { SOCIAL_M10, SOCIAL_M10_META } from './socialM10.js';
import { SOCIAL_M11, SOCIAL_M11_META } from './socialM11.js';
import { SOCIAL_M12, SOCIAL_M12_META } from './socialM12.js';

export const ALL_SOCIAL_LESSONS = [
  ...SOCIAL_M1,
  ...SOCIAL_M2,
  ...SOCIAL_M3,
  ...SOCIAL_M4,
  ...SOCIAL_M5,
  ...SOCIAL_M6,
  ...SOCIAL_M7,
  ...SOCIAL_M8,
  ...SOCIAL_M9,
  ...SOCIAL_M10,
  ...SOCIAL_M11,
  ...SOCIAL_M12
];

/**
 * The modules, in teaching order. A module is a FORTNIGHT — two lessons a week
 * for two weeks, because this course runs two days a week rather than three.
 *
 * Quarter 1 is 14 Georgia units in 16 lessons. Quarters 2 and 3 are listed here
 * with their titles and no lessons yet, so the year plan can show her the shape
 * of the course rather than only the part that exists.
 */
export const SOCIAL_MODULES = [
  {
    n: 1,
    quarter: 1,
    weeks: [1, 2],
    title: SOCIAL_M1_META.title,
    blurb: SOCIAL_M1_META.blurb,
    lessons: SOCIAL_M1.map((l) => l.id)
  },
  {
    n: 2,
    quarter: 1,
    weeks: [3, 4],
    title: SOCIAL_M2_META.title,
    blurb: SOCIAL_M2_META.blurb,
    lessons: SOCIAL_M2.map((l) => l.id)
  },
  {
    n: 3,
    quarter: 1,
    weeks: [5, 6],
    title: SOCIAL_M3_META.title,
    blurb: SOCIAL_M3_META.blurb,
    lessons: SOCIAL_M3.map((l) => l.id)
  },
  {
    n: 4,
    quarter: 1,
    weeks: [7, 8],
    title: SOCIAL_M4_META.title,
    blurb: SOCIAL_M4_META.blurb,
    lessons: SOCIAL_M4.map((l) => l.id)
  },
  {
    n: 5,
    quarter: 2,
    weeks: [1, 2],
    title: SOCIAL_M5_META.title,
    blurb: SOCIAL_M5_META.blurb,
    lessons: SOCIAL_M5.map((l) => l.id)
  },
  {
    n: 6,
    quarter: 2,
    weeks: [3, 4],
    title: SOCIAL_M6_META.title,
    blurb: SOCIAL_M6_META.blurb,
    lessons: SOCIAL_M6.map((l) => l.id)
  },
  {
    n: 7,
    quarter: 2,
    weeks: [5, 6],
    title: SOCIAL_M7_META.title,
    blurb: SOCIAL_M7_META.blurb,
    lessons: SOCIAL_M7.map((l) => l.id)
  },
  {
    n: 8,
    quarter: 2,
    weeks: [7, 8],
    title: SOCIAL_M8_META.title,
    blurb: SOCIAL_M8_META.blurb,
    lessons: SOCIAL_M8.map((l) => l.id)
  },
  {
    n: 9,
    quarter: 3,
    weeks: [1, 2],
    title: SOCIAL_M9_META.title,
    blurb: SOCIAL_M9_META.blurb,
    lessons: SOCIAL_M9.map((l) => l.id)
  },
  {
    n: 10,
    quarter: 3,
    weeks: [3, 4],
    title: SOCIAL_M10_META.title,
    blurb: SOCIAL_M10_META.blurb,
    lessons: SOCIAL_M10.map((l) => l.id)
  },
  {
    n: 11,
    quarter: 3,
    weeks: [5, 6],
    title: SOCIAL_M11_META.title,
    blurb: SOCIAL_M11_META.blurb,
    lessons: SOCIAL_M11.map((l) => l.id)
  },
  {
    n: 12,
    quarter: 3,
    weeks: [7, 8],
    title: SOCIAL_M12_META.title,
    blurb: SOCIAL_M12_META.blurb,
    lessons: SOCIAL_M12.map((l) => l.id)
  }
];

/**
 * The rest of the plan, named but not written.
 *
 * Kept OUT of SOCIAL_MODULES on purpose. A module with no lessons in the list
 * the app reads is a module that would show her an empty room. This is a
 * separate list so the shape can be described without pretending it exists —
 * the same reason FLAT_CARD_LESSONS is countable in herbalismCourse.js.
 */
export const SOCIAL_MODULES_PLANNED = [
];

export function socialLessonById(id) {
  return ALL_SOCIAL_LESSONS.find((l) => l.id === id) || null;
}

export function moduleForLesson(id) {
  return SOCIAL_MODULES.find((m) => m.lessons.includes(id)) || null;
}

export function lessonsOfModule(n) {
  const mod = SOCIAL_MODULES.find((m) => m.n === n);
  if (!mod) return [];
  return mod.lessons.map(socialLessonById).filter(Boolean);
}

export default ALL_SOCIAL_LESSONS;
