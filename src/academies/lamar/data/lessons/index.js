// ---------------------------------------------------------------------------
// Central lesson index. Combines every tier's curated lessons, in curriculum
// order, so `getTodaysMission` always hands the student the next logical
// topic rather than jumping around. Adding a new subject or tier later means
// adding one new array here — never touching the engine or the store.
// ---------------------------------------------------------------------------
import { mathLessons7 } from './math7.js';
import { mathLessonsTier2 } from './mathTier2.js';
import { mathLessonsTier3 } from './mathTier3.js';
import { mathLessonsTier4 } from './mathTier4.js';
import { mathLessonsTier8 } from './mathTier8.js';
import { readingLessons7 } from './reading7.js';
import { writingLessons7 } from './writing7.js';
import { scienceLessons7 } from './science7.js';
import { aerospaceLessons7 } from './aerospace7.js';
import { technologyLessons7 } from './technology7.js';
import { socialStudiesLessons7 } from './socialStudies7.js';
import { roboticsLessons7 } from './robotics7.js';
import { trailblazerBios7 } from '../socialStudies/trailblazerBios.js';
import { aerospaceQ1Exam } from '../exams/aerospaceQ1Exam.js';
import { aerospaceQ2Exam } from '../exams/aerospaceQ2Exam.js';
import { aerospaceQ3Exam } from '../exams/aerospaceQ3Exam.js';
import { aerospaceQ4Exam } from '../exams/aerospaceQ4Exam.js';
import { aerospaceSummerExam } from '../exams/aerospaceSummerExam.js';
import { socialStudiesQ1Exam } from '../exams/socialStudiesQ1Exam.js';
import { socialStudiesQ2Exam } from '../exams/socialStudiesQ2Exam.js';
import { socialStudiesQ4Exam } from '../exams/socialStudiesQ4Exam.js';
import { technologyQ1Exam } from '../exams/technologyQ1Exam.js';
import { technologyQ2Exam } from '../exams/technologyQ2Exam.js';
import { technologyQ3Exam } from '../exams/technologyQ3Exam.js';
import { roboticsQ4Exam } from '../exams/roboticsQ4Exam.js';

// Quarterly exams are inserted directly into a subject's lesson sequence,
// right after the last lesson of the quarter they cover. Since
// `getTodaysMission` simply serves the next unmastered lesson in array
// order, this means the exam naturally becomes "next" the moment all of
// that quarter's real lessons are mastered — a genuine mastery gate on
// the quarter as a whole, not just a label or a separate menu item.
//
// HOW THE INSERT POINT IS FOUND (changed Aug 2026 — read this before
// adding a lesson): every subject now names the LESSON ID its exam
// follows, and the position is looked up at runtime. This used to be
// done with hard-coded index constants ("Q1 = the first 10 lessons"),
// which was a real trap: inserting a single new lesson mid-quarter
// silently shifted every later lesson down one slot, so the exam ended
// up filed in the MIDDLE of the next quarter — no error, no warning,
// just a mastery gate quietly guarding the wrong material. Technology
// already used the id-lookup approach because its Robotics lessons sit
// interspersed; Aerospace and Social Studies now use it too, so adding
// lessons to any subject is safe.
//
// Adding a lesson to the END of a quarter is the one case that still
// needs a human decision — update that quarter's `after` id below so the
// exam covers the new lesson (and add it to the exam's `unlocksAfter`).
function spliceExamsByLastLessonId(lessons, examPlacements, subjectLabel) {
  const placed = [];
  for (const { after, exam } of examPlacements) {
    const index = lessons.findIndex((lesson) => lesson.id === after);
    if (index === -1) {
      // Degrade instead of throwing: a throw here happens at import time,
      // before React mounts, and would white-screen the whole app over a
      // curriculum typo. Appending keeps the exam reachable (just later
      // than intended) and the console error plus the guard test in
      // scripts/verify-curriculum.mjs make it impossible to miss.
      console.error(
        `[lessons/index] ${subjectLabel}: exam "${exam.id}" is anchored to lesson id "${after}", which is not in this subject's lesson array. Appending it to the end of the subject instead — fix the anchor id.`
      );
      placed.push({ index: lessons.length - 1, exam });
      continue;
    }
    placed.push({ index, exam });
  }
  const out = [...lessons];
  // Insert from the back so earlier insert positions stay valid.
  placed
    .slice()
    .sort((a, b) => b.index - a.index)
    .forEach(({ index, exam }) => out.splice(index + 1, 0, exam));
  return out;
}

// Aerospace runs a full five-period year: Q1-Q4 plus Summer. Summer's exam
// is anchored to the final lesson of the course, so it lands at the end.
const aerospaceWithExams = spliceExamsByLastLessonId(
  aerospaceLessons7,
  [
    { after: 'ae7-thrust-2', exam: aerospaceQ1Exam },
    { after: 'ae7-spacecraft-2', exam: aerospaceQ2Exam },
    { after: 'ae7-mars-missions-2', exam: aerospaceQ3Exam },
    { after: 'ae7-engineering-design-process-2', exam: aerospaceQ4Exam },
    { after: 'ae7-engineering-careers-2', exam: aerospaceSummerExam }
  ],
  'Aerospace'
);

// socialStudiesLessons7 runs quarter by quarter: Q1 (Genealogy, Racial
// Reclassification, Evaluating Historical Evidence, and the two Guided
// Investigations), Q2 (Geography of Africa & Southwest/Southern-Eastern
// Asia, Government & Political Systems, Economics), Q3, and Q4. Each
// quarterly exam is anchored to the id of its quarter's last lesson.
const socialStudiesWithExams = spliceExamsByLastLessonId(
  socialStudiesLessons7,
  [
    { after: 'ss7-guided-investigation-human-origins-2', exam: socialStudiesQ1Exam },
    { after: 'ss7-economic-growth-money-management', exam: socialStudiesQ2Exam },
    { after: 'ss7-east-asia-culture', exam: socialStudiesQ4Exam }
  ],
  'Social Studies'
);

// technologyLessons7 is NOT laid out contiguously by quarter the same
// simple way Aerospace/Social Studies are — the 2 untouched, un-quarter-
// tagged Robotics Programming lessons sit interspersed at their original
// positions (tech7-robotics-programming between Q1's last lesson and
// Q2's first lesson; tech7-robotics-programming-2 at the very end — see
// technology7.js's header comment). So instead of slicing by a fixed
// count, each exam is spliced in right after the real array INDEX of
// that quarter's own last lesson (tech7-automation for Q1,
// tech7-automation-2 for Q2), found by id — robust regardless of the
// Robotics lessons' exact position, and it never touches or reorders
// either Robotics lesson.
const technologyWithExams = spliceExamsByLastLessonId(
  technologyLessons7,
  [
    // Q1 grew from 16 lessons to 22 on Aug 9 2026, but each moved lesson was
    // placed directly behind its Part I half, so Automation is still the last
    // Q1 lesson in file order and this anchor still lands the exam correctly.
    { after: 'tech7-automation', exam: technologyQ1Exam },
    { after: 'tech7-automation-2', exam: technologyQ2Exam },
    { after: 'tech7-assemblies-tolerances-2', exam: technologyQ3Exam }
  ],
  'Technology'
);

// Robotics & Automation — a Q4-only course, so a single exam anchored to the
// last lesson. It ABSORBED tech7-robotics-programming and -2, which were
// quiz-only stubs (4 questions, no teaching) and are removed from
// technology7.js in the same change, so no lesson exists in two places.
const roboticsWithExams = spliceExamsByLastLessonId(
  roboticsLessons7,
  [{ after: 'rb7-design-challenge', exam: roboticsQ4Exam }],
  'Robotics'
);

export const allLessons = [
  ...mathLessons7, // Tier 1 — Junior Engineer
  ...readingLessons7, // Tier 1 — Junior Engineer (Reading & Literature)
  ...writingLessons7, // Tier 1 — Junior Engineer (Language Arts & Writing)
  ...scienceLessons7, // Tier 1 — Junior Engineer (Science)
  ...aerospaceWithExams, // Tier 1 — Junior Engineer (Aerospace Engineering — signature course, quarterly exams included)
  ...technologyWithExams, // Tier 1 — Junior Engineer (Technology & Computer Science — semester-paced, quarterly exams included; the 2 Robotics Programming lessons are untouched and ungated by either exam)
  ...socialStudiesWithExams, // Tier 1 — Junior Engineer (Social Studies — Mission Control's enrichment track, runs alongside real Khan Academy Africa/Middle East/Asia content seeded in useAppStore.js; COMPLETE for 2026-2027: Q2 = 10 lessons + exam (genealogy, records, evidence evaluation, guided investigations), Q3 = 8 lessons + exam (geography, government, economics), Q4 = 8 lessons + 30-item exam (environmental issues and cultural characteristics of Africa, Southwest Asia, and Southern & Eastern Asia). Q1 has no Mission Control lessons by design — Khan Academy World History carries it, and it is seeded for all four quarters in useAppStore.js)
  ...roboticsWithExams, // Tier 1 — Junior Engineer (Robotics & Automation — Q4 only, takes Technology's Tue/Thu slot as Technology finishes; 8 lessons + 30-item exam)
  ...trailblazerBios7, // Tier 1 — Social Studies (Black STEM & Aerospace Trailblazers — 17 biographies, untagged by quarter, browsable library not gated by mastery — see that file's header comment)
  ...mathLessonsTier2, // Tier 2 — Systems Cadet
  ...mathLessonsTier3, // Tier 3 — Flight Trainee
  ...mathLessonsTier4, // Tier 4 — Mission Specialist
  ...mathLessonsTier8 // Tier 8 — College Ready Engineer (capstone)
];

export function getLessonById(lessonId) {
  return allLessons.find((l) => l.id === lessonId) || null;
}
