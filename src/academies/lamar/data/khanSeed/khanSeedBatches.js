// ---------------------------------------------------------------------------
// THIS SCHOOL'S KHAN ACADEMY ASSIGNMENTS — 129 rows across 21 batches.
//
// Moved out of src/store/useAppStore.js on Sept 20, 2026 — the last of
// GENERIC_CARRYOVER fault 2. The store seeded one child's whole Khan
// curriculum, quarter by quarter, for every Academy that ever booted.
//
// WHAT STAYED IN THE STORE, AND WHY
//
// The SEEDING PASS did not move, and deliberately. It is the same shape for
// every batch and it is real platform work:
//
//     add a row only when no row with this subject + skillTitle + batchLabel
//     already exists
//
// That guard is what makes the seeder safe to run on every hydrate: a row he
// has already been given — graded, completed, or simply present — is never
// added twice and never rewritten. Moving the DATA changes nothing about it,
// because the match is on strings that did not change.
//
// WHICH IS ALSO THE HAZARD. The match is BY STRING. A `skillTitle` edited
// here is not recognised as the row already in his database, so it is added
// alongside it — a duplicate on his board, not a correction. The same is true
// of `batchLabel`. scripts/verify-khan-seed-move.mjs pins the row count and a
// digest of every (label, subject, skillTitle, url) so an edit has to be
// deliberate.
//
// The Science batches are NOT here: they already came from this Academy's
// khanSequences slot via scienceRowsFor(), and still do.
//
// WHY THE COMMENTS NAME A STATE
//
// Several of these batches were resequenced against real state standards, and
// the notes say so by code — S7L1, SS8H2. The wording sweep of Sept 19 left
// them alone on purpose: a curriculum is allowed to name the law it is built
// for. The platform is not, which is why they are here now rather than there.
// ---------------------------------------------------------------------------

// One batch folds in the science course challenges, which this Academy already
// declares next door. Imported directly: both files are this school's, so the
// dependency stays inside the school rather than crossing back into the
// platform.
import { scienceCourseChallengeRows } from '../khan/scienceSequence.js';

export const KHAN_SEED_BATCHES = Object.freeze({

  mathQ1Rows: [
      { subject: 'math', skillTitle: 'Decimal Place Value', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-fifth-grade-math/imp-place-value-and-decimals', sequenceInQuarter: 1 },
      { subject: 'math', skillTitle: 'Add decimals', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-fifth-grade-math/imp-addition-and-subtraction-3', sequenceInQuarter: 2 },
      { subject: 'math', skillTitle: 'Subtract decimals', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-fifth-grade-math/subtract-decimals', sequenceInQuarter: 3 },
      { subject: 'math', skillTitle: 'Add and subtract fractions', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-fifth-grade-math/imp-fractions-3', sequenceInQuarter: 4 },
      { subject: 'math', skillTitle: 'Multi-Digit Multiplication and Division', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-fifth-grade-math/multi-digit-multiplication-and-division', sequenceInQuarter: 5 },
      { subject: 'math', skillTitle: 'Multiply Fractions', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-fifth-grade-math/5th-multiply-fractions', sequenceInQuarter: 6 },
      { subject: 'math', skillTitle: 'Divide Fractions', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-fifth-grade-math/divide-fractions', sequenceInQuarter: 7 },
      { subject: 'math', skillTitle: 'Multiply Decimals', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-fifth-grade-math/imp-multiplication-and-division-3', sequenceInQuarter: 8 },
      { subject: 'math', skillTitle: 'Divide decimals', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-fifth-grade-math/divide-decimals', sequenceInQuarter: 9 },
      { subject: 'math', skillTitle: 'Powers of Ten', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-fifth-grade-math/powers-of-ten', sequenceInQuarter: 10 },
      { subject: 'math', skillTitle: 'Volume', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-fifth-grade-math/5th-volume', sequenceInQuarter: 11 },
      { subject: 'math', skillTitle: 'Coordinate plane', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-fifth-grade-math/imp-geometry-3', sequenceInQuarter: 12 },
      { subject: 'math', skillTitle: 'Algebraic Thinking', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-fifth-grade-math/imp-algebraic-thinking', sequenceInQuarter: 13 },
      { subject: 'math', skillTitle: 'Converting units of measure', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-fifth-grade-math/imp-measurement-and-data-3', sequenceInQuarter: 14 },
      { subject: 'math', skillTitle: 'Line plots', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-fifth-grade-math/line-plots', sequenceInQuarter: 15 },
      { subject: 'math', skillTitle: 'Properties of shapes', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-fifth-grade-math/properties-of-shapes', sequenceInQuarter: 16 }
    ],

  mathQ3Rows: [
      { subject: 'math', skillTitle: 'Negative Numbers: Addition and Subtraction', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-negative-numbers-add-and-subtract', sequenceInQuarter: 1 },
      { subject: 'math', skillTitle: 'Negative Numbers: Multiplication and Division', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-negative-numbers-multiply-and-divide', sequenceInQuarter: 2 },
      { subject: 'math', skillTitle: 'Ratios and Proportional Relationships', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-ratio-proportion', sequenceInQuarter: 3 },
      { subject: 'math', skillTitle: 'Fractions, Decimals, and Percentages (including Rates)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-fractions-decimals', sequenceInQuarter: 4 },
      { subject: 'math', skillTitle: 'Writing and Evaluating Algebraic Expressions', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-variables-expressions/cc-7th-interpreting-lin-exp', sequenceInQuarter: 5 },
      { subject: 'math', skillTitle: 'One and Two-Step Equations', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-variables-expressions/cc-7th-2-step-equations-intro', sequenceInQuarter: 6 },
      { subject: 'math', skillTitle: 'One and Two-Step Inequalities', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-variables-expressions/cc-7th-two-step-inequalities', sequenceInQuarter: 7 },
      { subject: 'math', skillTitle: 'Geometry: Angles, Area, and Surface Area', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-geometry', sequenceInQuarter: 8 },
      { subject: 'math', skillTitle: 'Multi-Step Ratio and Percent Problems', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-fractions-decimals/cc-7th-percent-word-problems', sequenceInQuarter: 9 },
      { subject: 'math', skillTitle: 'Constant of Proportionality', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-ratio-proportion/7th-constant-of-proportionality', sequenceInQuarter: 10 },
      { subject: 'math', skillTitle: 'Scale Drawings', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-geometry/cc-7th-scale-drawings', sequenceInQuarter: 11 },
      // Added Aug 6, 2026 for full 7th-grade coverage: Khan's Unit 4
      // (Rational numbers: addition and subtraction) was the one current 7th
      // unit lacking a dedicated app item. Unit URL read live off Khan.
      { subject: 'math', skillTitle: 'Rational Numbers: Addition and Subtraction (7th grade)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-seventh-grade-math/x6b17ba59:rational-numbers-addition-and-subtraction', sequenceInQuarter: 12 }
    ],

  // Expanded Aug 6, 2026 to FULL coverage of Khan's 6th-grade course (11
  // exercise-bearing units — Unit 12 "Khan for families" has no exercises
  // and is intentionally omitted), in the course's unit order. Added the 3
  // units the earlier set was missing: Exponents & Order of Operations
  // (U4), Plane Figures (U8), Coordinate Plane (U9). Unit URLs read live
  // off Khan. mathBatchRestructure below re-sequences persisted rows.
  mathQ2Rows: [
      { subject: 'math', skillTitle: 'Ratios and Proportional Relationships (6th grade)', gradeLevel: '6th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-ratios-prop-topic', sequenceInQuarter: 1 },
      { subject: 'math', skillTitle: 'Arithmetic Operations (Fractions & Decimals)', gradeLevel: '6th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-arithmetic-operations', sequenceInQuarter: 2 },
      { subject: 'math', skillTitle: 'Rates and Percentages (6th grade)', gradeLevel: '6th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-sixth-grade-math/x0267d782:cc-6th-rates-and-percentages', sequenceInQuarter: 3 },
      { subject: 'math', skillTitle: 'Exponents and Order of Operations (6th grade)', gradeLevel: '6th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-sixth-grade-math/x0267d782:cc-6th-exponents-and-order-of-operations', sequenceInQuarter: 4 },
      { subject: 'math', skillTitle: 'Negative Numbers (6th grade)', gradeLevel: '6th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-negative-number-topic', sequenceInQuarter: 5 },
      { subject: 'math', skillTitle: 'Variables and Expressions', gradeLevel: '6th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-expressions-and-variables', sequenceInQuarter: 6 },
      { subject: 'math', skillTitle: 'Equations and Inequalities (6th grade)', gradeLevel: '6th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-equations-and-inequalities', sequenceInQuarter: 7 },
      { subject: 'math', skillTitle: 'Plane Figures (6th grade)', gradeLevel: '6th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-sixth-grade-math/x0267d782:cc-6th-plane-figures', sequenceInQuarter: 8 },
      { subject: 'math', skillTitle: 'Coordinate Plane (6th grade)', gradeLevel: '6th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-sixth-grade-math/x0267d782:coordinate-plane', sequenceInQuarter: 9 },
      { subject: 'math', skillTitle: 'Geometry (6th grade)', gradeLevel: '6th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-geometry-topic', sequenceInQuarter: 10 },
      { subject: 'math', skillTitle: 'Data and Statistics (6th grade)', gradeLevel: '6th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-data-statistics', sequenceInQuarter: 11 }
    ],

  mathQ4Rows: [
      { subject: 'math', skillTitle: 'Statistics and Probability', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-probability-statistics', sequenceInQuarter: 1 },
      { subject: 'math', skillTitle: 'Angle Relationships', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-geometry/cc-7th-angles', sequenceInQuarter: 2 },
      { subject: 'math', skillTitle: 'Circles: Area and Circumference', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-geometry/cc-7th-area-circ-challenge', sequenceInQuarter: 3 },
      { subject: 'math', skillTitle: 'Volume and Surface Area of Solids', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-geometry/cc-7th-area-volume-surface-area', sequenceInQuarter: 4 },
      { subject: 'math', skillTitle: 'Population Sampling and Inferences', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-probability-statistics/cc-7th-population-sampling', sequenceInQuarter: 5 },
      { subject: 'math', skillTitle: 'Absolute Value (7th grade)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-negative-numbers-add-and-subtract/cc-7th-absolute-value', sequenceInQuarter: 6 },
      { subject: 'math', skillTitle: 'Multiplying and Dividing Negative Fractions', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-negative-numbers-multiply-and-divide/cc-7th-mult-div-neg-fractions', sequenceInQuarter: 7 },
      { subject: 'math', skillTitle: 'Comparing Probabilities and Compound Events', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-probability-statistics/cc-7th-basic-prob', sequenceInQuarter: 8 }
    ],

  mathSummerRows: [
      { subject: 'math', skillTitle: 'Numbers and Operations (8th grade)', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-eighth-grade-math/cc-8th-numbers-operations', sequenceInQuarter: 1 },
      { subject: 'math', skillTitle: 'Solving Equations with One Unknown', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-eighth-grade-math/cc-8th-solving-equations', sequenceInQuarter: 2 },
      { subject: 'math', skillTitle: 'Linear Equations and Functions', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-eighth-grade-math/cc-8th-linear-equations-functions', sequenceInQuarter: 3 },
      { subject: 'math', skillTitle: 'Systems of Equations', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-eighth-grade-math/cc-8th-systems-topic', sequenceInQuarter: 4 },
      { subject: 'math', skillTitle: 'Geometry (8th grade)', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-eighth-grade-math/cc-8th-geometry', sequenceInQuarter: 5 },
      // Added Aug 6, 2026 for full 8th-grade coverage: Khan Units 6 & 7,
      // which complete the 7-unit course before its Course Challenge.
      { subject: 'math', skillTitle: 'Geometric Transformations (8th grade)', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-eighth-grade-math/geometric-transformations', sequenceInQuarter: 6 },
      { subject: 'math', skillTitle: 'Data and Modeling (8th grade)', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-eighth-grade-math/cc-8th-data', sequenceInQuarter: 7 }
    ],

  readingQ1Rows: [],

  readingQ2Rows: [
      { subject: 'reading', skillTitle: 'Themes, figures of speech, and comparing texts (reading strategies)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/ela/pisa-2025-english-supplement/x0fbe4cb2373ed873:7th-grade-reading-vocabulary', sequenceInQuarter: 1 },
      { subject: 'reading', skillTitle: 'How word choice/figurative language affects meaning and tone', gradeLevel: '7th-9th', khanAcademyUrl: 'https://www.khanacademy.org/ela/9th-grade-reading-and-vocabulary/xd45453bfd2ae8614:crossing-the-line-9/xd45453bfd2ae8614:interpreting-words-in-context-9/a/words-at-work-analyzing-how-authors-create-meaning-and-tone-9', sequenceInQuarter: 2 },
      { subject: 'reading', skillTitle: 'Antonyms, connotation, and word choice (vocabulary)', gradeLevel: '7th-8th', khanAcademyUrl: 'https://www.khanacademy.org/ela/pisa-2025-english-supplement/x0fbe4cb2373ed873:7th-grade-reading-vocabulary/x0fbe4cb2373ed873:trailblazing-women/a/trailblazing-women-unit-vocabulary', sequenceInQuarter: 3 },
      { subject: 'reading', skillTitle: 'Vocabulary (7th grade course)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/ela/7th-grade-reading-and-vocabulary/x7538838f96af3430:vocabulary-7th', sequenceInQuarter: 4 },
      { subject: 'reading', skillTitle: 'Craft and Structure (7th grade)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/ela/7th-grade-reading-and-vocabulary/x7538838f96af3430:uncovering-meaning', sequenceInQuarter: 5 },
      { subject: 'reading', skillTitle: 'Craft and Structure: Long Passage Practice (7th grade)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/ela/7th-grade-reading-and-vocabulary/x7538838f96af3430:uncovering-meaning-long-passage-practice', sequenceInQuarter: 6 },
      { subject: 'reading', skillTitle: 'Key Ideas and Details (7th grade)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/ela/7th-grade-reading-and-vocabulary/x7538838f96af3430:blazing-new-trails', sequenceInQuarter: 7 },
      { subject: 'reading', skillTitle: 'Key Ideas and Details: Long Passage Practice (7th grade)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/ela/7th-grade-reading-and-vocabulary/x7538838f96af3430:blazing-new-trails-long-passage-practice', sequenceInQuarter: 8 },
      { subject: 'reading', skillTitle: 'Integration of Knowledge and Ideas (7th grade)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/ela/7th-grade-reading-and-vocabulary/x7538838f96af3430:mysteries', sequenceInQuarter: 9 }
    ],

  readingQ3Rows: [
      { subject: 'reading', skillTitle: 'Integration of Knowledge and Ideas: Long Passage Practice (7th grade)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/ela/7th-grade-reading-and-vocabulary/x7538838f96af3430:mysteries-long-passage-practice', sequenceInQuarter: 1 },
      { subject: 'reading', skillTitle: 'Living Tongues (thematic reading unit)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/ela/pisa-2025-english-supplement/x0fbe4cb2373ed873:7th-grade-reading-vocabulary/x0fbe4cb2373ed873:living-tongues', sequenceInQuarter: 2 },
      { subject: 'reading', skillTitle: 'Trailblazing Women (distinct course version)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/ela/cc-7th-reading-vocab/x4aa9073b12675eb1:cc-7th-trailblazing-women', sequenceInQuarter: 3 },
      { subject: 'reading', skillTitle: 'Mysteries of the Past (thematic reading unit)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/ela/pisa-2025-english-supplement/x0fbe4cb2373ed873:mysteries-of-the-past', sequenceInQuarter: 4 },
      { subject: 'reading', skillTitle: 'Mysteries of the Past: unit vocabulary', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/ela/pisa-2025-english-supplement/x0fbe4cb2373ed873:mysteries-of-the-past/a/mysteries-of-the-past-unit-vocabulary', sequenceInQuarter: 5 },
      { subject: 'reading', skillTitle: 'Key Ideas and Details (8th grade)', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/ela/8th-grade-reading-and-vocabulary/x435b1de09a877dd7:the-mind-at-play-8', sequenceInQuarter: 6 },
      { subject: 'reading', skillTitle: 'Integration of Knowledge and Ideas (8th grade)', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/ela/8th-grade-reading-and-vocabulary/x435b1de09a877dd7:to-your-health-8', sequenceInQuarter: 7 },
      { subject: 'reading', skillTitle: 'Craft and Structure: Long Passage Practice (8th grade)', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/ela/8th-grade-reading-and-vocabulary/x435b1de09a877dd7:craft-and-structure-long-passage-practice-8', sequenceInQuarter: 8 }
    ],

  readingQ4Rows: [
      { subject: 'reading', skillTitle: 'Obscuring the Truth (8th grade thematic unit)', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/ela/pisa-2025-english-supplement/x0fbe4cb2373ed873:8th-grade-reading-vocabulary/x0fbe4cb2373ed873:obscuring-the-truth', sequenceInQuarter: 1 },
      { subject: 'reading', skillTitle: 'Obscuring the Truth: unit vocabulary', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/ela/pisa-2025-english-supplement/x0fbe4cb2373ed873:8th-grade-reading-vocabulary/x0fbe4cb2373ed873:obscuring-the-truth/a/obscuring-the-truth-unit-vocabulary', sequenceInQuarter: 2 },
      { subject: 'reading', skillTitle: 'Craft and Structure (8th grade)', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/ela/8th-grade-reading-and-vocabulary/x435b1de09a877dd7:the-world-beneath-8', sequenceInQuarter: 3 },
      { subject: 'reading', skillTitle: 'Crossing the Line (8th grade thematic unit)', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/ela/pisa-2025-english-supplement/x0fbe4cb2373ed873:8th-grade-reading-vocabulary/x0fbe4cb2373ed873:crossing-the-line', sequenceInQuarter: 4 },
      { subject: 'reading', skillTitle: 'Funny Business (8th grade thematic unit)', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/ela/pisa-2025-english-supplement/x0fbe4cb2373ed873:8th-grade-reading-vocabulary/x0fbe4cb2373ed873:funny-business', sequenceInQuarter: 5 },
      { subject: 'reading', skillTitle: 'Funny Business: unit vocabulary', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/ela/pisa-2025-english-supplement/x0fbe4cb2373ed873:8th-grade-reading-vocabulary/x0fbe4cb2373ed873:funny-business/a/funny-business-unit-vocabulary', sequenceInQuarter: 6 },
      { subject: 'reading', skillTitle: 'Vocabulary (8th grade course)', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/ela/8th-grade-reading-and-vocabulary/x435b1de09a877dd7:vocabulary-8th', sequenceInQuarter: 7 }
    ],

  /**
  * SUMMER 2027 READING — DELIBERATELY EMPTY. (Audit item O-1, Aug 25, 2026.)
  *
  * This list is `[]` on purpose and must stay that way. The comment that
  * used to sit here described five units being "pulled in" — Borders, its
  * unit vocabulary, and three 10th-grade Long Passage Practice units, "each
  * individually verified" — beside an array that adds none of them. It
  * described a plan that was reversed, and read as a statement of what the
  * app does.
  *
  * THE DECISION IT WAS REVERSED TO, quoted in `scienceSequence.js`:
  * **"Summer — 0 units. Reserved for summer reading."** Summer English is a
  * book he picks himself — the Academic Center's free-choice Reading
  * Assignment — discussed with a parent instead of written up, because the
  * point of summer is protecting the habit rather than grading it.
  *
  * The scaffolding below stays so a future decision to add Summer units is
  * one array away, and so this file keeps the same shape for every quarter.
  */

  readingSummerRows: [],

  writingQ1Rows: [
      { subject: 'reading', skillTitle: 'Parts of speech: the noun', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/grammar/parts-of-speech-the-noun', sequenceInQuarter: 1 },
      { subject: 'reading', skillTitle: 'Parts of speech: the pronoun', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/grammar/parts-of-speech-the-pronoun', sequenceInQuarter: 2 },
      { subject: 'reading', skillTitle: 'Parts of speech: the modifier', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/grammar/parts-of-speech-the-modifier', sequenceInQuarter: 3 },
      { subject: 'reading', skillTitle: 'Parts of speech: the preposition and the conjunction', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/grammar/parts-of-speech-the-preposition-and-the-conjunction', sequenceInQuarter: 4 },
      { subject: 'reading', skillTitle: 'Punctuation: the comma and the apostrophe', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/grammar/punctuation-the-comma-and-the-apostrophe', sequenceInQuarter: 5 },
      { subject: 'reading', skillTitle: 'Punctuation: the colon, semicolon, and more', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/grammar/punctuation-the-colon-semicolon-and-more', sequenceInQuarter: 6 },
      { subject: 'reading', skillTitle: 'Syntax: sentences and clauses', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/grammar/syntax-sentences-and-clauses', sequenceInQuarter: 7 },
      { subject: 'reading', skillTitle: 'Syntax: conventions of standard English', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/grammar/syntax-conventions-of-standard-english', sequenceInQuarter: 8 },
      { subject: 'reading', skillTitle: 'Usage and style', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/grammar/usage-and-style', sequenceInQuarter: 9 }
    ],

  writingQ2Rows: [],

  writingQ3Rows: [],

  // All 9 World History units + the Course Challenge, in Khan Academy's own
  // course order. See the migration comment further down for why the
  // missing-row check for THIS batch deliberately ignores batchLabel.
  socialStudiesQ1Rows: [
      { subject: 'socialStudies', skillTitle: 'Origins of History', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/world-history/x66f79d8a:origins-of-history', sequenceInQuarter: 1 },
      { subject: 'socialStudies', skillTitle: 'Early Humans (250,000 BP to 3000 BCE)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/world-history/x66f79d8a:early-humans', sequenceInQuarter: 2 },
      { subject: 'socialStudies', skillTitle: 'Early Agrarian Societies (Ancient Egypt, Ancient India & Early China)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/world-history/x66f79d8a:early-agrarian-societies', sequenceInQuarter: 3 },
      { subject: 'socialStudies', skillTitle: 'Empires and Belief Systems (Persia, Imperial China & Origins of Islam)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/world-history/x66f79d8a:empires-and-belief-systems', sequenceInQuarter: 4 },
      { subject: 'socialStudies', skillTitle: 'Regional Webs (Islamic World, Golden Age of Islam, Silk Road & Song China)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/world-history/x66f79d8a:regional-webs', sequenceInQuarter: 5 },
      { subject: 'socialStudies', skillTitle: 'The First Global Age (1200 to 1750 CE)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/world-history/x66f79d8a:the-first-global-age', sequenceInQuarter: 6 },
      { subject: 'socialStudies', skillTitle: 'Industrial Imperialism & Resisting Colonialism (Africa & Asia)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/world-history/x66f79d8a:the-long-nineteenth-century', sequenceInQuarter: 7 },
      { subject: 'socialStudies', skillTitle: 'Decolonization (Africa & Asia)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/world-history/x66f79d8a:global-conflict', sequenceInQuarter: 8 },
      { subject: 'socialStudies', skillTitle: 'Globalization (1900 CE to the Present)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/world-history/x66f79d8a:globalization', sequenceInQuarter: 9 },
      { subject: 'socialStudies', skillTitle: 'World History — Course Challenge', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/world-history/test/x66f79d8a:course-challenge', isCourseChallenge: true, sequenceInQuarter: 99 }
    ],

  // Q2 is Genealogy - the Mission Control lesson track owns this quarter
  // outright, per the parent: "Qtr 2 is Genealogy." The world-history unit
  // that used to sit here moved to Q1 with the rest of the course.
  socialStudiesQ2Rows: [],

  // Q3 is geography, government and economics on the Mission Control
  // track. Its world-history unit moved to Q1.
  socialStudiesQ3Rows: [],

  // Q4 is environment and culture on the Mission Control track. Its two
  // world-history units moved to Q1.
  socialStudiesQ4Rows: [],

  socialStudiesSummerRows: [
      { subject: 'socialStudies', skillTitle: 'Worlds collide (1491–1607)', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/us-history/precontact-and-early-colonial-era', sequenceInQuarter: 1 },
      { subject: 'socialStudies', skillTitle: 'Colonial America (1607–1754)', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/us-history/colonial-america', sequenceInQuarter: 2 },
      { subject: 'socialStudies', skillTitle: 'The Revolutionary Era (1754–1800)', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/us-history/road-to-revolution', sequenceInQuarter: 3 },
      { subject: 'socialStudies', skillTitle: 'The Early Republic (1800–1848)', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/us-history/the-early-republic', sequenceInQuarter: 4 },
      { subject: 'socialStudies', skillTitle: 'The Civil War Era (1844–1877)', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/us-history/civil-war-era', sequenceInQuarter: 5 }
    ],

  technologyQ1Rows: [
      // Course: Computers and the Internet — 5 units, in Khan's order.
      // The foundations course, and the one that maps onto Georgia's
      // digital-literacy expectations and this subject's own topic list
      // (internet research, cybersecurity, AI).
      { subject: 'technology', skillTitle: 'Digital information', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/computing/computers-and-internet/xcae6f4a7ff015e7d:digital-information', sequenceInQuarter: 1 },
      { subject: 'technology', skillTitle: 'Computers', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/computing/computers-and-internet/xcae6f4a7ff015e7d:computers', sequenceInQuarter: 2 },
      { subject: 'technology', skillTitle: 'The Internet', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/computing/computers-and-internet/xcae6f4a7ff015e7d:the-internet', sequenceInQuarter: 3 },
      { subject: 'technology', skillTitle: 'Online data security', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/computing/computers-and-internet/xcae6f4a7ff015e7d:online-data-security', sequenceInQuarter: 4 },
      { subject: 'technology', skillTitle: 'Computing innovations', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/computing/computers-and-internet/xcae6f4a7ff015e7d:computing-innovations', sequenceInQuarter: 5 },
      // Course: Intro to computer science - Python — units 1-6, Khan's order.
      // Real programming, and the language actually used in aerospace work.
      { subject: 'technology', skillTitle: 'Computational thinking with variables', gradeLevel: '7th', gradedBy: 'project', khanAcademyUrl: 'https://www.khanacademy.org/computing/intro-to-python-fundamentals/x5279a44ae0ab15d6:computational-thinking-with-variables', sequenceInQuarter: 6 },
      { subject: 'technology', skillTitle: 'Designing algorithms with conditionals', gradeLevel: '7th', gradedBy: 'project', khanAcademyUrl: 'https://www.khanacademy.org/computing/intro-to-python-fundamentals/x5279a44ae0ab15d6:designing-algorithms-with-conditionals', sequenceInQuarter: 7 },
      { subject: 'technology', skillTitle: 'Simulating phenomena with loops', gradeLevel: '7th', gradedBy: 'project', khanAcademyUrl: 'https://www.khanacademy.org/computing/intro-to-python-fundamentals/x5279a44ae0ab15d6:simulating-phenomena-with-loops', sequenceInQuarter: 8 },
      { subject: 'technology', skillTitle: 'Playing games with functions', gradeLevel: '7th', gradedBy: 'project', khanAcademyUrl: 'https://www.khanacademy.org/computing/intro-to-python-fundamentals/x5279a44ae0ab15d6:playing-games-with-functions', sequenceInQuarter: 9 },
      { subject: 'technology', skillTitle: 'Automating tasks with lists', gradeLevel: '7th', gradedBy: 'project', khanAcademyUrl: 'https://www.khanacademy.org/computing/intro-to-python-fundamentals/x5279a44ae0ab15d6:automating-tasks-with-lists', sequenceInQuarter: 10 },
      { subject: 'technology', skillTitle: 'Analyzing data with dictionaries', gradeLevel: '7th', gradedBy: 'project', khanAcademyUrl: 'https://www.khanacademy.org/computing/intro-to-python-fundamentals/x5279a44ae0ab15d6:analyzing-data-with-dictionaries', sequenceInQuarter: 11 },
      // Course Challenge for Computers and the Internet — that course
      // finishes this quarter, so its challenge sorts last here (99), same
      // convention as every math Course Challenge.
      { subject: 'technology', skillTitle: 'Course Challenge — Computers and the Internet', gradeLevel: '7th', isCourseChallenge: true, khanAcademyUrl: 'https://www.khanacademy.org/computing/computers-and-internet/test/xcae6f4a7ff015e7d:course-challenge', sequenceInQuarter: 99 }
    ],

  technologyQ3Rows: [
      { subject: 'technology', skillTitle: 'Building software with classes', gradeLevel: '7th', gradedBy: 'project', khanAcademyUrl: 'https://www.khanacademy.org/computing/intro-to-python-fundamentals/x5279a44ae0ab15d6:building-software-with-classes', sequenceInQuarter: 1 },
      { subject: 'technology', skillTitle: 'Intro to JS: Drawing & Animation', gradeLevel: '7th', gradedBy: 'project', khanAcademyUrl: 'https://www.khanacademy.org/computing/computer-programming/programming', sequenceInQuarter: 2 },
      { subject: 'technology', skillTitle: 'Intro to HTML/CSS: Making webpages', gradeLevel: '7th', gradedBy: 'project', khanAcademyUrl: 'https://www.khanacademy.org/computing/computer-programming/html-css', sequenceInQuarter: 3 },
      { subject: 'technology', skillTitle: 'Intro to SQL: Querying and managing data', gradeLevel: '7th', gradedBy: 'project', khanAcademyUrl: 'https://www.khanacademy.org/computing/computer-programming/sql', sequenceInQuarter: 4 },
      { subject: 'technology', skillTitle: 'Advanced JS: Games & Visualizations', gradeLevel: '7th', gradedBy: 'project', khanAcademyUrl: 'https://www.khanacademy.org/computing/computer-programming/programming-games-visualizations', sequenceInQuarter: 5 },
      { subject: 'technology', skillTitle: 'Advanced JS: Natural Simulations', gradeLevel: '7th', gradedBy: 'project', khanAcademyUrl: 'https://www.khanacademy.org/computing/computer-programming/programming-natural-simulations', sequenceInQuarter: 6 },
      { subject: 'technology', skillTitle: 'HTML/JS: Making webpages interactive', gradeLevel: '7th', gradedBy: 'project', khanAcademyUrl: 'https://www.khanacademy.org/computing/computer-programming/html-css-js', sequenceInQuarter: 7 },
      { subject: 'technology', skillTitle: 'HTML/JS: Making webpages interactive with jQuery', gradeLevel: '7th', gradedBy: 'project', khanAcademyUrl: 'https://www.khanacademy.org/computing/computer-programming/html-js-jquery', sequenceInQuarter: 8 }
    ],

  // Course Challenges — one per grade-level Khan Academy course, added
  // Aug 6, 2026 at the parent's request. A Course Challenge covers a whole
  // course and is taken AFTER all of that course's units, so each is
  // placed in the quarter where its grade-level content concludes and
  // given a high sequence (99) so it always sorts last in its quarter —
  // surfacing as "today's lesson" only once every unit before it is done.
  // Scored A-F in the parent-only Khan Academy Grades section, same as a
  // Unit Test. Marked isCourseChallenge:true so the UI can label it.
  // Seeded idempotently by (subject, skillTitle, batchLabel), same pattern
  // as every batch above.
  courseChallengeRows: [
      { subject: 'math', skillTitle: '5th Grade Math — Course Challenge', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-fifth-grade-math', batchLabel: 'Q1 2026-2027', isCourseChallenge: true, sequenceInQuarter: 99 },
      { subject: 'math', skillTitle: '6th Grade Math — Course Challenge', gradeLevel: '6th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-sixth-grade-math', batchLabel: 'Q2 2026-2027', isCourseChallenge: true, sequenceInQuarter: 99 },
      { subject: 'math', skillTitle: '7th Grade Math — Course Challenge', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-seventh-grade-math', batchLabel: 'Q4 2026-2027', isCourseChallenge: true, sequenceInQuarter: 99 },
      { subject: 'math', skillTitle: '8th Grade Math — Course Challenge', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-eighth-grade-math', batchLabel: 'Summer 2027', isCourseChallenge: true, sequenceInQuarter: 99 },
      { subject: 'reading', skillTitle: '7th Grade ELA — Course Challenge', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/ela/7th-grade-reading-and-vocabulary', batchLabel: 'Q3 2026-2027', isCourseChallenge: true, sequenceInQuarter: 99 },
      { subject: 'reading', skillTitle: '8th Grade ELA — Course Challenge', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/ela/8th-grade-reading-and-vocabulary', batchLabel: 'Q4 2026-2027', isCourseChallenge: true, sequenceInQuarter: 99 },
      // Science course challenges — added Aug 7, 2026 at the parent's
      // request ("he has to complete the course challenges as well").
      // Four courses now run through the year, so four challenges, each in
      // the quarter where its course concludes. See data/khan/scienceSequence.js.
      ...scienceCourseChallengeRows()
    ],

});


/**
 * The two rows this school's board started from, in July 2026.
 * Seeded ONLY into an empty board — never added to one that has rows.
 */
export const KHAN_FIRST_SEED = [
        { subject: 'reading', skillTitle: 'Roots, prefixes, and suffixes', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/ela/5th-grade-reading-and-vocab/xb350e60168d6e96f:vocabulary-5th/xb350e60168d6e96f:roots-prefixes-and-suffixes-5th-vocab/a/common-roots-prefixes-and-suffixes-5' },
        { subject: 'reading', skillTitle: 'Verb tenses, including the perfect tenses', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/grammar/parts-of-speech-the-verb' }
      ];

/**
 * Rows retitled after the fact, keyed on the WRONG title.
 *
 * Keyed that way on purpose: a row the parent has renamed herself no longer
 * matches, so it is left alone, and running twice does nothing the second
 * time. The Map the store builds from these is the platform's; the titles are
 * this school's.
 */
export const KHAN_RETITLES = [
      ['Add and Subtract Decimals', {
        skillTitle: 'Add decimals',
        khanAcademyUrl: 'https://www.khanacademy.org/math/cc-fifth-grade-math/imp-addition-and-subtraction-3'
      }],
      ['Add fractions with unlike denominators', {
        skillTitle: 'Add and subtract fractions',
        khanAcademyUrl: 'https://www.khanacademy.org/math/cc-fifth-grade-math/imp-fractions-3'
      }],
      ['Volume of cubes and rectangular prisms: word problems', {
        skillTitle: 'Volume',
        khanAcademyUrl: 'https://www.khanacademy.org/math/cc-fifth-grade-math/5th-volume'
      }],
      // "(Geometry)" was ours, not Khan's — a small thing, but the whole point
      // of this map is that the two lists read identically.
      ['Properties of Shapes (Geometry)', {
        skillTitle: 'Properties of shapes',
        khanAcademyUrl: 'https://www.khanacademy.org/math/cc-fifth-grade-math/properties-of-shapes'
      }]
    ];

/**
 * Two links this school corrected. A school that never had them fills nothing.
 */
export const KHAN_URL_FIXES = Object.freeze({
  oldAntonymsUrl: 'https://www.khanacademy.org/ela/pisa-2025-english-supplement/x0fbe4cb2373ed873:7th-grade-reading-vocabulary',
  correctedAntonymsUrl: 'https://www.khanacademy.org/ela/pisa-2025-english-supplement/x0fbe4cb2373ed873:7th-grade-reading-vocabulary/x0fbe4cb2373ed873:trailblazing-women/a/trailblazing-women-unit-vocabulary'
});
