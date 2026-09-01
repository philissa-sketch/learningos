// ---------------------------------------------------------------------------
// HERBALISM & BOTANY — THE WHOLE COURSE, QUARTERS 1 AND 2.
//
// One import point for 48 lessons across 8 modules and 16 teaching weeks.
//
// ---- WHY THIS FILE EXISTS ----
//
// Before v3.8 the app imported two lesson arrays directly — Quarter 1 and
// Module 1 — and My Lessons rendered them as two panels side by side, because
// that was the honest state of a build with thirteen lessons in one shape and
// one lesson in another.
//
// Now there are 48 lessons in eight modules, and every screen that wants
// "the course" should ask one place for it rather than knowing the file
// layout. Add a module here and nothing downstream changes.
//
// ---- WHERE THE 48 CAME FROM ----
//
//   14 already existed   1 written to the beats spec (hb-m1-01)
//                       13 written to the older flat-card shape (hb-1-01..13),
//                          re-homed here into Modules 2, 4, 6 and 8. Their ids
//                          are UNCHANGED, so her lesson records, practice
//                          records and review boxes all survive.
//   34 are new           written to the §10 beats spec, each with a verified
//                          video and ten bank questions.
//
// ---- WHAT IS STILL OWED, STATED PLAINLY ----
//
// The thirteen re-homed lessons are still on the flat-card shape: they have
// `core` cards rather than `beats`, and five bank questions rather than ten.
// LessonReader renders them correctly — the beats block is guarded on
// `lesson.beats` — so nothing is broken and nothing is hidden. They are listed
// in FLAT_CARD_LESSONS below so the number is countable instead of remembered.
// ---------------------------------------------------------------------------

import { HERBALISM_M1 } from './herbalismM1.js';
import { HERBALISM_Q1 } from './herbalismQ1.js';
import { HERBALISM_M1_NEW, HERBALISM_M2_NEW } from './herbalismM1M2.js';
import { HERBALISM_M3 } from './herbalismM3.js';
import { HERBALISM_M4_NEW, HERBALISM_M8_NEW } from './herbalismM4M8.js';
import { HERBALISM_M5 } from './herbalismM5.js';
import { HERBALISM_M6_NEW } from './herbalismM6.js';
import { HERBALISM_M7 } from './herbalismM7.js';
// ---- Quarters 3 and 4, added v3.9 ----
import { HERBALISM_M9 } from './herbalismM9.js';
import { HERBALISM_M10 } from './herbalismM10.js';
import { HERBALISM_M11 } from './herbalismM11.js';
import { HERBALISM_M12 } from './herbalismM12.js';
import { HERBALISM_M13 } from './herbalismM13.js';
import { HERBALISM_M14 } from './herbalismM14.js';
import { HERBALISM_M15 } from './herbalismM15.js';
import { HERBALISM_M16 } from './herbalismM16.js';

/** Every Herbalism lesson the app has, in no particular order. */
export const ALL_HERBALISM_LESSONS = [
  ...HERBALISM_M1,
  ...HERBALISM_M1_NEW,
  ...HERBALISM_M2_NEW,
  ...HERBALISM_M3,
  ...HERBALISM_M4_NEW,
  ...HERBALISM_M5,
  ...HERBALISM_M6_NEW,
  ...HERBALISM_M7,
  ...HERBALISM_M8_NEW,
  ...HERBALISM_Q1,
  ...HERBALISM_M9,
  ...HERBALISM_M10,
  ...HERBALISM_M11,
  ...HERBALISM_M12,
  ...HERBALISM_M13,
  ...HERBALISM_M14,
  ...HERBALISM_M15,
  ...HERBALISM_M16
];

/**
 * The eight modules, in teaching order, each naming its lessons in the order
 * she meets them. This is the spine every screen should read.
 *
 * `lessons` are ids, not objects, so this stays readable and so a typo is a
 * check failure rather than a silent empty module.
 */
export const HERBALISM_MODULES = [
  {
    n: 1,
    quarter: 1,
    weeks: [1, 2],
    title: 'The Plant Life Cycle',
    blurb: 'It starts inside a seed. What one is made of, what wakes it up, and the circle it turns.',
    lessons: ['hb-m1-01', 'hb-m1-02', 'hb-1-09', 'hb-m1-04', 'hb-m1-05', 'hb-1-12']
  },
  {
    n: 2,
    quarter: 1,
    weeks: [3, 4],
    title: 'Roots, Shoots and Soil',
    blurb: 'How a plant is built, what each part does, and what dirt actually is.',
    lessons: ['hb-1-01', 'hb-1-02', 'hb-m2-03', 'hb-1-03', 'hb-1-04', 'hb-m2-06']
  },
  {
    n: 3,
    quarter: 1,
    weeks: [5, 6],
    title: 'The Garden Is an Ecosystem',
    blurb: 'Who eats what, where the energy starts, and what happens when one thing changes.',
    lessons: ['hb-m3-01', 'hb-m3-02', 'hb-m3-03', 'hb-m3-04', 'hb-m3-05', 'hb-m3-06']
  },
  {
    n: 4,
    quarter: 1,
    weeks: [7, 8],
    title: 'Adaptations and Protection',
    blurb: 'Reading a leaf, and every trick a plant uses to defend itself and reach the light.',
    lessons: ['hb-1-05', 'hb-1-06', 'hb-1-07', 'hb-m4-04', 'hb-m4-05', 'hb-m4-06']
  },
  {
    n: 5,
    quarter: 2,
    weeks: [1, 2],
    title: 'Water — the Cycle and the Plant',
    blurb: 'Where rain comes from, how it gets to the top leaf, and why roots need air too.',
    lessons: ['hb-m5-01', 'hb-m5-02', 'hb-m5-03', 'hb-m5-04', 'hb-m5-05', 'hb-m5-06']
  },
  {
    n: 6,
    quarter: 2,
    weeks: [3, 4],
    title: 'Pollination and Partnership',
    blurb: 'What a flower is for, who comes to visit, and the partners underground nobody sees.',
    lessons: ['hb-1-08', 'hb-m6-02', 'hb-m6-03', 'hb-m6-04', 'hb-m6-05', 'hb-m6-06']
  },
  {
    n: 7,
    quarter: 2,
    weeks: [5, 6],
    title: 'Herbs in History',
    blurb:
      'What people did before pharmacies, the granny midwives and root doctors of the South, and the plants that crossed the ocean.',
    lessons: ['hb-m7-01', 'hb-m7-02', 'hb-m7-03', 'hb-m7-04', 'hb-m7-05', 'hb-m7-06']
  },
  {
    n: 8,
    quarter: 2,
    weeks: [7, 8],
    title: 'The Plant Detective',
    blurb: 'Naming, keying, measuring, and how you find out whether a thing is actually true.',
    lessons: ['hb-1-10', 'hb-1-11', 'hb-1-13', 'hb-m8-04', 'hb-m8-05', 'hb-m8-06']  },
  {
    n: 9,
    quarter: 3,
    weeks: [1, 2],
    title: 'Weather in the Garden',
    blurb: 'A weather station she builds herself, and two weeks of her own readings turned into a pattern.',
    lessons: ['hb-m9-01', 'hb-m9-02', 'hb-m9-03', 'hb-m9-04', 'hb-m9-05', 'hb-m9-06']
  },
  {
    n: 10,
    quarter: 3,
    weeks: [3, 4],
    title: 'Reading the Sky and the Map',
    blurb: 'A real forecast turned into a real planting decision, and why weather is not climate.',
    lessons: ['hb-m10-01', 'hb-m10-02', 'hb-m10-03', 'hb-m10-04', 'hb-m10-05', 'hb-m10-06']
  },
  {
    n: 11,
    quarter: 3,
    weeks: [5, 6],
    title: 'The Apothecary',
    blurb: 'Weighing, drying, extracting and labelling — the craft, done properly and written down.',
    lessons: ['hb-m11-01', 'hb-m11-02', 'hb-m11-03', 'hb-m11-04', 'hb-m11-05', 'hb-m11-06']
  },
  {
    n: 12,
    quarter: 3,
    weeks: [7, 8],
    title: 'The Growing Year',
    blurb: 'Counting backwards from the last frost to find a real sowing date, and putting the garden to bed.',
    lessons: ['hb-m12-01', 'hb-m12-02', 'hb-m12-03', 'hb-m12-04', 'hb-m12-05', 'hb-m12-06']
  },
  {
    n: 13,
    quarter: 4,
    weeks: [1, 2],
    title: 'From Plant to Medicine',
    blurb: 'Willow bark to aspirin. How a plant becomes a drug, and why the dose is the whole question.',
    lessons: ['hb-m13-01', 'hb-m13-02', 'hb-m13-03', 'hb-m13-04', 'hb-m13-05', 'hb-m13-06']
  },
  {
    n: 14,
    quarter: 4,
    weeks: [3, 4],
    title: 'How a Claim Gets Tested',
    blurb: 'Evidence, fair tests, controls, the placebo — and why changing your mind is the strong move.',
    lessons: ['hb-m14-01', 'hb-m14-02', 'hb-m14-03', 'hb-m14-04', 'hb-m14-05', 'hb-m14-06']
  },
  {
    n: 15,
    quarter: 4,
    weeks: [5, 6],
    title: 'Black Women in Medicine and Botany',
    blurb: 'Six women and the science each of them did — Crumpler, Cole, Steward, Daly, Wright, Canady, Corbett.',
    lessons: ['hb-m15-01', 'hb-m15-02', 'hb-m15-03', 'hb-m15-04', 'hb-m15-05', 'hb-m15-06']
  },
  {
    n: 16,
    quarter: 4,
    weeks: [7, 8],
    title: "The Herbalist's Year",
    blurb: 'The capstone. A year of her own records, her own field guide, her own investigation, presented.',
    lessons: ['hb-m16-01', 'hb-m16-02', 'hb-m16-03', 'hb-m16-04', 'hb-m16-05', 'hb-m16-06']
  }
];

/**
 * The thirteen lessons still on the older flat-card shape.
 *
 * Named, counted and printed rather than remembered. They render correctly —
 * LessonReader guards the beats block on `lesson.beats` — but they have `core`
 * cards instead of two beats, and five bank questions instead of ten.
 *
 * Rebuilding them to beats is the next content job after Quarters 3 and 4.
 */
export const FLAT_CARD_LESSONS = [
  'hb-1-01', 'hb-1-02', 'hb-1-03', 'hb-1-04', 'hb-1-05', 'hb-1-06', 'hb-1-07',
  'hb-1-08', 'hb-1-09', 'hb-1-10', 'hb-1-11', 'hb-1-12', 'hb-1-13'
];

export function herbalismLessonById(id) {
  return ALL_HERBALISM_LESSONS.find((l) => l.id === id) || null;
}

export function moduleForLesson(id) {
  return HERBALISM_MODULES.find((m) => m.lessons.includes(id)) || null;
}

/** The lessons of a module, as objects, in teaching order. Skips any not yet written. */
export function lessonsOfModule(n) {
  const mod = HERBALISM_MODULES.find((m) => m.n === n);
  if (!mod) return [];
  return mod.lessons.map(herbalismLessonById).filter(Boolean);
}

export default ALL_HERBALISM_LESSONS;
