// ---------------------------------------------------------------------------
// READING & LITERATURE — THE COURSE REGISTER.
//
// Gigi, Sept 23 2026: Reading becomes her own course, laid out like Lamar's.
// The app teaches it. Khan's six themed reading units (ela2 1–3, ela3 1–3)
// become optional watches inside Modules 1–3. Blueprint, with her four
// decisions: claude/reading-course-blueprint.md.
//
// ---- THE WHOLE YEAR IS DECLARED HERE, WRITTEN OR NOT ----
// v3.94 is the reason. A Khan course carried 2 of its 10 units for thirteen
// days and every check was green, because nothing said how many there should
// be. So all 16 modules are listed below from day one. A module is either
// 'written' (its file is imported into READING_MODULES) or 'planned'. The
// check prints "N of 16 written" on every run and fails if a module says
// 'written' and is not, or is imported and still says 'planned'.
//
// ---- NOT WIRED TO A SCREEN YET ----
// Sept 23 2026: written as data only, so moving day (Sept 24) is not
// disturbed. Wiring onto Today and the Gradebook comes after she has settled.
//
// ---- THREE RULES THAT MUST SURVIVE THE WIRING ----
// 1. Thursday tests and quarter tests have NO read-aloud (Gigi, Sept 23).
//    They are her ON HER OWN score. Lessons keep read-aloud, recorded per
//    answer.
// 2. ON HER OWN is BLANK, not zero, until she has sat a test.
// 3. Nothing here is ever written as a Khan grade.
// ---------------------------------------------------------------------------

import { READING_M1 } from './readingM1.js';
import { READING_M2 } from './readingM2.js';
import { READING_M3 } from './readingM3.js';
import { READING_M4 } from './readingM4.js';

export const READING_PLAN = {
  modules: 16,
  lessonsPerModule: 6,
  testsPerModule: 2,
  quarters: 4,
  questionsPerLesson: 4,
  questionsPerTest: 6,
  questionsPerQuarterPart: 6,
  quarterParts: 2,
};

/** All sixteen, in order. `status` is what the check holds each one to. */
export const READING_REGISTER = [
  { n: 1, quarter: 1, title: 'Fairy Tales Retold', status: 'written' },
  { n: 2, quarter: 1, title: 'The Moon', status: 'written' },
  { n: 3, quarter: 1, title: 'Where People Live', status: 'written' },
  { n: 4, quarter: 1, title: 'From Seed to Sprout', status: 'written' },
  { n: 5, quarter: 2, title: 'Stories from the Garden', status: 'planned' },
  { n: 6, quarter: 2, title: 'Herbs in the Kitchen', status: 'planned' },
  { n: 7, quarter: 2, title: 'Bees, Butterflies and Helpers', status: 'planned' },
  { n: 8, quarter: 2, title: 'Poems for Every Season', status: 'planned' },
  { n: 9, quarter: 3, title: 'Black Americans Who Healed', status: 'planned' },
  { n: 10, quarter: 3, title: 'Black Growers and Plant Scientists', status: 'planned' },
  { n: 11, quarter: 3, title: 'Inside the Body', status: 'planned' },
  { n: 12, quarter: 3, title: 'Garden Mysteries', status: 'planned' },
  { n: 13, quarter: 4, title: 'Plant Tales from Around the World', status: 'planned' },
  { n: 14, quarter: 4, title: 'How a Doctor Thinks', status: 'planned' },
  { n: 15, quarter: 4, title: 'One Long Story, Six Parts', status: 'planned' },
  { n: 16, quarter: 4, title: 'Two Texts, One Topic', status: 'planned' },
];

/** Only the modules that exist on disk. The register says what is owed. */
export const READING_MODULES = [READING_M1, READING_M2, READING_M3, READING_M4];

export function readingModule(n) {
  return READING_MODULES.find((m) => m.module === n) || null;
}

export default READING_MODULES;
