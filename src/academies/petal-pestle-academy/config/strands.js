/**
 * The nine things the diagnostic measures, and the two subjects they roll up
 * into.
 *
 * WHY STRANDS AND NOT SUBJECTS. A single "Math: grade 3.8" tells you almost
 * nothing you can act on. A child who is 5.1 in Numbers & Operations and 2.9
 * in Fractions averages to 4.0 and looks perfectly on-level — while the thing
 * she actually needs is sitting two grades back, invisible. Mission Control
 * learned this the hard way with English Language Arts (see its
 * config/subjects.js, SUBJECT_STRANDS) and had to bolt strands on afterwards.
 * This app starts with them.
 *
 * ONE GRADE ON THE RECORD, NINE NUMBERS WHERE DECISIONS GET MADE.
 */

export const SUBJECTS = {
  math: {
    id: 'math',
    label: 'Math',
    icon: '🌿',
    accent: 'sage',
    khanCourseFamily: 'math'
  },
  ela: {
    id: 'ela',
    label: 'Reading & Writing',
    icon: '📖',
    accent: 'lavender',
    khanCourseFamily: 'ela'
  },
  /**
   * SCIENCE IS NOT IN THE DIAGNOSTIC. Removed at the grandmother's instruction:
   * "she doesn't need testing for this, she doesn't know any of this."
   *
   * She is right, and it is an assessment error rather than a preference. An
   * adaptive test measures where a child sits on a scale of material she has
   * been TAUGHT. Run it over content she has never met and every answer is a
   * guess, the staircase walks straight to the floor, and the number it reports
   * is not a low level — it is no measurement at all, dressed up as one. Worse,
   * it costs a nine-year-old forty minutes of not knowing anything, which is
   * exactly how you teach a child that science is the subject she is bad at.
   *
   * The science QUESTIONS are kept in data/diagnostic/scienceItems.js, unloaded.
   * They belong to the Herbalism & Botany course, where the content will have
   * been taught first. See that file's header.
   */
};

export const SUBJECT_ORDER = ['math', 'ela'];

/**
 * `label` is what a grown-up reads on the report. `cardLabel` is what SHE
 * reads on her own screen — plainer, and named after the work rather than
 * after the standard. Mission Control needed the same split and added it
 * late; it is here from the start.
 *
 * `plant` is the flower each strand grows in the My Levels garden. Every
 * strand gets a different one so the garden is readable at a glance without
 * reading a single word.
 */
export const STRANDS = [
  // ---- Math -------------------------------------------------------------
  {
    id: 'numbers-operations',
    subject: 'math',
    label: 'Numbers & Operations',
    cardLabel: 'Counting & Calculating',
    plant: '🌻',
    blurb: 'Adding, subtracting, multiplying and dividing whole numbers.'
  },
  {
    id: 'fractions-decimals',
    subject: 'math',
    label: 'Fractions & Decimals',
    cardLabel: 'Parts of a Whole',
    plant: '🌼',
    blurb: 'Halves, thirds, quarters, decimals — the maths of a recipe.'
  },
  {
    id: 'measurement-data',
    subject: 'math',
    label: 'Measurement & Data',
    cardLabel: 'Measuring & Charts',
    plant: '🌷',
    blurb: 'Weight, volume, time, and reading a chart or graph.'
  },
  {
    id: 'geometry',
    subject: 'math',
    label: 'Geometry',
    cardLabel: 'Shapes & Space',
    plant: '🌸',
    blurb: 'Shapes, angles, area, perimeter, symmetry.'
  },
  {
    id: 'patterns-algebra',
    subject: 'math',
    label: 'Patterns & Early Algebra',
    cardLabel: 'Patterns & Puzzles',
    plant: '💐',
    blurb: 'Patterns, rules, and finding the missing number.'
  },
  // ---- Reading & Writing ------------------------------------------------
  {
    id: 'reading-comprehension',
    subject: 'ela',
    label: 'Reading Comprehension',
    cardLabel: 'Understanding What I Read',
    plant: '🌺',
    blurb: 'Main idea, details, inference, and what a passage is really saying.'
  },
  {
    id: 'vocabulary',
    subject: 'ela',
    label: 'Vocabulary',
    cardLabel: 'Word Meanings',
    plant: '🪻',
    blurb: 'Word meanings, context clues, roots and prefixes.'
  },
  {
    id: 'grammar-usage',
    subject: 'ela',
    label: 'Grammar & Usage',
    cardLabel: 'How Sentences Work',
    plant: '🌹',
    blurb: 'Parts of speech, punctuation, and building a correct sentence.'
  },
  {
    id: 'writing-strategies',
    subject: 'ela',
    label: 'Writing Strategies',
    cardLabel: 'Putting Ideas Together',
    plant: '🏵️',
    blurb: 'Organising ideas, topic sentences, ordering, and evidence.'
  }
];

export const STRAND_IDS = STRANDS.map((s) => s.id);

/**
 * The strands where hearing the question READ ALOUD may change what was
 * measured — derived from the subject, never listed by hand.
 *
 * ---- WHY THIS IS HERE AND NOT IN THE REPORT COMPONENT ----
 *
 * It was `READING_STRANDS = ['reading-comprehension', 'vocabulary']`, typed
 * inside ParentDashboard where no check could reach it (rule 13, rule 20). Two
 * of the four ELA strands were missing from it, so the One-Page Report told a
 * grown-up that hearing a GRAMMAR question aloud "removes the reading load" —
 * about 9 of Azianna's 42 read-aloud answers, on the strand she is about to be
 * re-measured in.
 *
 * ---- THE CONSTRUCT CLAIM, STATED SO IT CAN BE ARGUED WITH (rule 17) ----
 *
 * The claim is: reading is part of what an ELA strand measures, and is not part
 * of what a MATHS strand measures. On maths, read-aloud removes a load that was
 * never the point and the number gets CLEANER. On ELA it changes the question.
 *
 * That is a defensible reading and it is not the only one — whether a grammar
 * item read aloud measures the same skill is a real question, and it is Gigi's,
 * not this file's. What the app must not do is decide it silently on a
 * hand-typed list of two. It is derived, it is visible on the report, and the
 * per-strand numbers are printed beside it so she can judge it herself.
 *
 * THE WAY BACK: if she rules that grammar read aloud measures the same thing,
 * this becomes an explicit per-strand flag on STRANDS and stops being derived
 * from the subject.
 */
export const READ_ALOUD_CHANGES_CONSTRUCT = STRANDS.filter((s) => s.subject === 'ela').map(
  (s) => s.id
);

export function getStrand(id) {
  return STRANDS.find((s) => s.id === id) || null;
}

export function strandsForSubject(subjectId) {
  return STRANDS.filter((s) => s.subject === subjectId);
}

export function strandLabel(id) {
  return getStrand(id)?.label || id;
}

export function strandCardLabel(id) {
  const s = getStrand(id);
  return s?.cardLabel || s?.label || id;
}
