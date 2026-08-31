/**
 * Science — the full-year Khan Academy sequence.
 *
 * WHY THIS FILE EXISTS (Aug 7, 2026). Science was the only Khan-driven
 * subject with no coverage: 14 units for a 36-week year, three of them in
 * a nine-week Q1. Lamar would have run out of Science in three weeks. No
 * test caught it, because the Khan sequences lived as 25 copy-pasted
 * blocks inside useAppStore.js's hydrate function, where nothing could
 * read them.
 *
 * Moving the ROWS out (the seeding loops stay in the store, unchanged)
 * makes two things possible: scripts/verify-curriculum.mjs can now assert
 * that every quarter carries enough work, and adding a unit is a line in
 * a table instead of fourteen lines of boilerplate. That cost is why this
 * rotted in the first place.
 *
 * SCOPE, decided with the parent: Science is Khan-driven (it sits in
 * KHAN_TAUGHT_SUBJECTS in config/subjects.js, alongside Math and Reading —
 * "archived" there means "taught through Khan Academy", not abandoned).
 * The 39 legacy lessons in data/lessons/science7.js stay frozen and stay
 * in her parent-facing records. They are not touched by this file.
 *
 * CHEMISTRY was added at Lamar's request — he told his mother he was
 * interested in it. Middle School Chemistry is a real NGSS-aligned Khan
 * course, and two of its four units were already sitting in this app's
 * Summer batch. Bringing chemistry (and physics, and Earth & space) into
 * the school year is a deliberate departure from Georgia's public
 * sequence, which places Physical Science in 8th grade. Georgia homeschool
 * law requires science instruction, not adherence to the state's
 * grade-by-grade order, so this is the parent's call and she made it.
 *
 * EVERY URL BELOW was read off the live Khan Academy page in a browser,
 * not constructed from a pattern. That matters more than it sounds:
 * Earth and space science lives at /science/middle-school-earth-and-space-science,
 * NOT the /science/ms-... prefix the other three courses use. Pattern-
 * matching it 404s.
 *
 * `items` is the count of graded exercises + quizzes + unit test in that
 * Khan unit, counted off the course page. The guard uses it to check
 * pacing; it is not displayed anywhere.
 */

/** School weeks per quarter, used by the coverage guard. Summer is open-ended. */
export const QUARTER_WEEKS = {
  'Q1 2026-2027': 9,
  'Q2 2026-2027': 7,
  'Q3 2026-2027': 9,
  'Q4 2026-2027': 9
};

const BIO = 'https://www.khanacademy.org/science/ms-biology/x0c5bb03129646fd6:';
const CHEM = 'https://www.khanacademy.org/science/ms-chemistry/xc370bc422b7f75fc:';
const PHYS = 'https://www.khanacademy.org/science/ms-physics/x1baed5db7c1bb50b:';
const EARTH = 'https://www.khanacademy.org/science/middle-school-earth-and-space-science/x87d03b443efbea0a:';

/**
 * ---- THE FOUR KHAN COURSES, AS KHAN ACTUALLY PRESENTS THEM ----
 * (Read live from the course pages Aug 9, 2026, after the parent asked why
 * "science only has 5 instead of 10 and the course challenge 11 is teacher
 * unit." She was right about unit 11.)
 *
 * Khan's own headline unit count is INFLATED on every one of these courses,
 * because it includes two units that are not student work:
 *
 *   Middle school biology      "11 UNITS"  -> 10 his (9 graded + simulations), 11 = teacher
 *   Middle school chemistry     "6 UNITS"  ->  5 his (4 graded + simulations),  6 = teacher
 *   Middle school physics       "6 UNITS"  ->  5 his (4 graded + simulations),  6 = teacher
 *   MS Earth and space science  "7 UNITS"  ->  6 his (5 graded + simulations),  7 = teacher
 *
 * ---- CORRECTED Aug 9, 2026: ONLY THE TEACHER UNIT IS NOT HIS ----
 *
 * An earlier version of this note lumped the last two units together and
 * counted biology as 9. The parent corrected it: "it literally has 10 units for
 * biology for middle school." She is right, and the distinction matters.
 *
 * The teacher-resources unit says "This unit does not include exercises" — it
 * is the NGSS unit guides, written for her. The simulations unit says something
 * different: "This unit's exercises do not count toward course MASTERY." It HAS
 * exercises — PhET interactives and a challenge. They earn no mastery points,
 * which is not the same as not being work, and for a boy heading for aerospace
 * engineering an interactive physics simulation is not the part to cut.
 *
 * So `contentUnits` is now the student-facing count (everything but the teacher
 * unit) and `gradedUnits` is the subset carrying mastery points.
 *
 * ---- WHY RECORDING THIS MATTERS ----
 *
 * Two reasons, and the second is the one that produced her question.
 *
 * 1. Anyone comparing this file to a Khan course page will count a different
 *    number of units and reasonably conclude something is missing. Writing
 *    down which units are deliberately excluded, and why, ends that.
 * 2. A quarter here mixes courses — Q1 is three biology-level units and two
 *    chemistry — and nothing on screen said so. Five rows under one heading
 *    called "Science" read as five of biology's eleven. `courseId` is what
 *    lets the card say "Biology · unit 1" and "Chemistry · unit 1" instead.
 */
export const SCIENCE_COURSES = {
  bio: {
    id: 'bio',
    label: 'Biology',
    fullName: 'Middle school biology',
    coursePath: 'https://www.khanacademy.org/science/ms-biology',
    contentUnits: 10,
    gradedUnits: 9,
    khanShowsUnits: 11,
    simulationsUrl: BIO + 'explore-biology-through-simulations-ms-bio',
    teacherResourcesUrl: BIO + 'teacher-resources'
  },
  chem: {
    id: 'chem',
    label: 'Chemistry',
    fullName: 'Middle school chemistry',
    coursePath: 'https://www.khanacademy.org/science/ms-chemistry',
    contentUnits: 5,
    gradedUnits: 4,
    khanShowsUnits: 6,
    simulationsUrl: CHEM + 'explore-chemistry-through-simulations',
    teacherResourcesUrl: CHEM + 'teacher-resources'
  },
  phys: {
    id: 'phys',
    label: 'Physics',
    fullName: 'Middle school physics',
    coursePath: 'https://www.khanacademy.org/science/ms-physics',
    contentUnits: 5,
    gradedUnits: 4,
    khanShowsUnits: 6,
    simulationsUrl: PHYS + 'explore-physics-through-simulations',
    teacherResourcesUrl: PHYS + 'teacher-resources'
  },
  earth: {
    id: 'earth',
    label: 'Earth & Space',
    fullName: 'Middle school Earth and space science',
    coursePath: 'https://www.khanacademy.org/science/middle-school-earth-and-space-science',
    contentUnits: 6,
    gradedUnits: 5,
    khanShowsUnits: 7,
    simulationsUrl: EARTH + 'explore-earth-and-space-science-through-simulations-ms-ess',
    teacherResourcesUrl: EARTH + 'teacher-resources'
  }
};

/**
 * Quarter -> units, in the order he works them.
 *
 * Biology is the spine (Georgia S7L1-S7L5, all 9 Khan MS Biology units).
 * The second strand rotates: Chemistry in Q1-Q2, Earth & space in Q3,
 * Physics in Q4. Chemistry finishes at the mid-year mark on purpose, so
 * the subject Lamar asked for is the first course he completes.
 */
export const SCIENCE_KHAN_SEQUENCE = {
  /**
   * ================================================================
   * ONE COURSE PER QUARTER, FINISHED. (Re-placed Aug 9, 2026.)
   * ================================================================
   *
   * The parent, after three rounds of me explaining instead of doing:
   * "what is the problem with fixing science and adding all of the biology
   * units."
   *
   * There was no problem. I had been treating "roughly 4-5 Khan items a week"
   * as a constraint on what could be scheduled. It is not a constraint — it is
   * an ESTIMATE a previous session made about how fast Lamar works, and his
   * mother knows that better than an estimate does. Nothing in the app enforced
   * it, no guard checked it, and it was quietly deciding the shape of his
   * science year.
   *
   * ---- AND SCHEDULING MORE THAN A QUARTER HOLDS COSTS NOTHING ----
   *
   * This is the part that makes the worry empty. `isQuarterAvailable` in
   * lib/schoolQuarter.js says it outright: "a student who is BEHIND still needs
   * to finish an earlier quarter's unmastered lessons, and blocking those would
   * strand him. Only running AHEAD is prevented." An unfinished Q1 unit stays
   * available in Q2 and every quarter after it. The quarter label is a PLAN,
   * not a gate — so a full quarter cannot lock him out of anything, it can only
   * describe more than he happens to get through.
   *
   * ---- THE NEW SHAPE ----
   *
   *   Q1  Biology, all ten units, + Course Challenge
   *   Q2  Chemistry, all five, + CC
   *   Q3  Earth & Space, all six, + CC
   *   Q4  Physics, all five, + CC
   *   Summer  empty
   *
   * One course per quarter, start to finish, ending in its own Course
   * Challenge. That is a better structure than the rotating spine it replaces,
   * for reasons beyond the unit count: he finishes a whole Khan course four
   * times instead of carrying three unfinished ones for a year, each quarter
   * has a single subject to think about, and the Course Challenge lands while
   * the material is still fresh rather than two quarters later.
   *
   * Summer is now free, which matches what the Aug 7 ELA placement already
   * decided for Language Arts: "Summer — 0 units. Reserved for summer reading
   * and book reports." Science had been quietly overflowing into it.
   *
   * Q1 is the heavy quarter — 75 Khan items over 9 weeks, about 8 a week
   * against 4-5 elsewhere. That is stated plainly rather than smoothed over,
   * and it is why the carry-forward paragraph above matters.
   *
   * ---- HUMAN BODY SYSTEMS IS GONE (Aug 9, 2026) ----
   *
   * A high-school biology unit that had been seeded here as a "supplement"
   * before today, on the reasoning that MS Biology unit 1 covers organization
   * in the human body but not at that depth. The parent, on being told what it
   * was: "if the human body system dont belong in this year dont add it."
   *
   * It did not belong. It is not one of the ten, it is not middle school, it
   * overlaps unit 1 rather than filling a gap, and it was the only row in the
   * whole science year with no measured item count — so it sat outside the
   * pacing arithmetic that every other unit is held to. It also made Q1 read as
   * 12 rows when she had asked, repeatedly and precisely, for the ten units and
   * the Course Challenge.
   *
   * Removing it from this file is not enough on its own: the reconcile below
   * only considers titles this sequence OWNS, which is the rule that stops it
   * deleting rows the parent added herself. A title dropped from here becomes
   * invisible to the cleanup and would survive in her database forever. So it
   * is also listed in RETIRED_SCIENCE_TITLES in useAppStore, which is the
   * mechanism that actually removes it — uncompleted copies only.
   */
  'Q1 2026-2027': [
    { skillTitle: 'Cells and Organisms', gradeLevel: '7th', khanAcademyUrl: BIO + 'cells-and-organisms', sequenceInQuarter: 1, items: 8, courseId: 'bio', khanUnit: 1 },
    { skillTitle: 'Organism Growth and Reproduction', gradeLevel: '7th', khanAcademyUrl: BIO + 'organism-growth-and-reproduction', sequenceInQuarter: 2, items: 8, courseId: 'bio', khanUnit: 2 },
    { skillTitle: 'Matter and Energy in Organisms', gradeLevel: '7th', khanAcademyUrl: BIO + 'matter-and-energy-in-organisms', sequenceInQuarter: 3, items: 7, courseId: 'bio', khanUnit: 3 },
    { skillTitle: 'Interactions in Ecosystems', gradeLevel: '7th', khanAcademyUrl: BIO + 'interactions-in-ecosystems', sequenceInQuarter: 4, items: 8, courseId: 'bio', khanUnit: 4 },
    { skillTitle: 'Matter and Energy in Ecosystems', gradeLevel: '7th', khanAcademyUrl: BIO + 'matter-and-energy-in-ecosystems', sequenceInQuarter: 5, items: 4, courseId: 'bio', khanUnit: 5 },
    { skillTitle: 'Ecosystems and Biodiversity', gradeLevel: '7th', khanAcademyUrl: BIO + 'ecosystems-and-biodiversity', sequenceInQuarter: 6, items: 9, courseId: 'bio', khanUnit: 6 },
    { skillTitle: 'Inheritance and Variation', gradeLevel: '7th', khanAcademyUrl: BIO + 'inheritance-and-variation', sequenceInQuarter: 7, items: 12, courseId: 'bio', khanUnit: 7 },
    { skillTitle: 'Evolution', gradeLevel: '7th', khanAcademyUrl: BIO + 'evolution', sequenceInQuarter: 8, items: 12, courseId: 'bio', khanUnit: 8 },
    { skillTitle: 'Natural and Artificial Selection', gradeLevel: '7th', khanAcademyUrl: BIO + 'natural-and-artificial-selection', sequenceInQuarter: 9, items: 5, courseId: 'bio', khanUnit: 9 },
    // Khan's biology unit 10. Slug verified off the live page: it carries an
    // `-ms-bio` suffix the other courses do not, so a constructed URL 404s.
    { skillTitle: 'Explore Biology Through Simulations', gradeLevel: '7th', khanAcademyUrl: BIO + 'explore-biology-through-simulations-ms-bio', sequenceInQuarter: 10, items: 2, courseId: 'bio', khanUnit: 10, noMastery: true }
  ],
  /** Chemistry, whole — the course Lamar asked for. */
  'Q2 2026-2027': [
    { skillTitle: 'Classifying Matter', gradeLevel: '7th', khanAcademyUrl: CHEM + 'classifying-matter', sequenceInQuarter: 1, items: 8, courseId: 'chem', khanUnit: 1 },
    { skillTitle: 'Physical Properties of Matter', gradeLevel: '7th', khanAcademyUrl: CHEM + 'physical-properties-of-matter', sequenceInQuarter: 2, items: 11, courseId: 'chem', khanUnit: 2 },
    { skillTitle: 'Chemical Changes', gradeLevel: '7th', khanAcademyUrl: CHEM + 'chemical-changes', sequenceInQuarter: 3, items: 10, courseId: 'chem', khanUnit: 3 },
    { skillTitle: 'Thermal Energy and Heat', gradeLevel: '7th', khanAcademyUrl: CHEM + 'thermal-energy-and-heat', sequenceInQuarter: 4, items: 5, courseId: 'chem', khanUnit: 4 },
    { skillTitle: 'Explore Chemistry Through Simulations', gradeLevel: '7th', khanAcademyUrl: CHEM + 'explore-chemistry-through-simulations', sequenceInQuarter: 5, items: 2, courseId: 'chem', khanUnit: 5, noMastery: true }
  ],
  /** Earth & Space, whole — the parent flagged it as "a big part of his career choice." */
  'Q3 2026-2027': [
    { skillTitle: 'Earth in Space', gradeLevel: '7th', khanAcademyUrl: EARTH + 'earth-in-space', sequenceInQuarter: 1, items: 6, courseId: 'earth', khanUnit: 1 },
    { skillTitle: 'The Earth-Sun-Moon System', gradeLevel: '7th', khanAcademyUrl: EARTH + 'the-earth-sun-moon-system', sequenceInQuarter: 2, items: 6, courseId: 'earth', khanUnit: 2 },
    { skillTitle: 'Weather and Climate', gradeLevel: '7th', khanAcademyUrl: EARTH + 'weather-and-climate', sequenceInQuarter: 3, items: 7, courseId: 'earth', khanUnit: 3 },
    { skillTitle: 'The Geosphere', gradeLevel: '7th', khanAcademyUrl: EARTH + 'the-geosphere', sequenceInQuarter: 4, items: 8, courseId: 'earth', khanUnit: 4 },
    { skillTitle: 'Earth and Society', gradeLevel: '7th', khanAcademyUrl: EARTH + 'earth-and-society', sequenceInQuarter: 5, items: 7, courseId: 'earth', khanUnit: 5 },
    // Verified slug — this one carries an `-ms-ess` suffix.
    { skillTitle: 'Explore Earth and Space Science Through Simulations', gradeLevel: '7th', khanAcademyUrl: EARTH + 'explore-earth-and-space-science-through-simulations-ms-ess', sequenceInQuarter: 6, items: 2, courseId: 'earth', khanUnit: 6, noMastery: true }
  ],
  /** Physics, whole. Motion, forces and energy — the closest course to aerospace. */
  'Q4 2026-2027': [
    { skillTitle: 'Motion and Forces', gradeLevel: '7th', khanAcademyUrl: PHYS + 'motion-and-forces', sequenceInQuarter: 1, items: 11, courseId: 'phys', khanUnit: 1 },
    { skillTitle: 'Non-Contact Interactions', gradeLevel: '7th', khanAcademyUrl: PHYS + 'non-contact-interactions', sequenceInQuarter: 2, items: 7, courseId: 'phys', khanUnit: 2 },
    { skillTitle: 'Energy', gradeLevel: '7th', khanAcademyUrl: PHYS + 'energy', sequenceInQuarter: 3, items: 9, courseId: 'phys', khanUnit: 3 },
    { skillTitle: 'Waves', gradeLevel: '7th', khanAcademyUrl: PHYS + 'waves', sequenceInQuarter: 4, items: 8, courseId: 'phys', khanUnit: 4 },
    { skillTitle: 'Explore Physics Through Simulations', gradeLevel: '7th', khanAcademyUrl: PHYS + 'explore-physics-through-simulations', sequenceInQuarter: 5, items: 2, courseId: 'phys', khanUnit: 5, noMastery: true }
  ],
  /**
   * Summer carries NO Khan science.
   *
   * All four courses finish inside the school year now, so nothing needs to
   * overflow — and the Aug 7 ELA placement had already reserved Summer for
   * summer reading and book reports. Science had been quietly taking it back.
   */
  'Summer 2027': []
};

/**
 * Course Challenges. The parent asked for these explicitly: "he has to
 * complete the course challenges as well."
 *
 * A Course Challenge is a cumulative adaptive test over a WHOLE Khan
 * course, so each one is placed in the quarter where that course's last
 * unit lands — not one per quarter. Chemistry concludes in Q2, Biology in
 * Q4, Physics and Earth & space in Summer.
 *
 * sequenceInQuarter 99 matches the existing convention in useAppStore.js:
 * it sorts last in its quarter, so it only surfaces as "today's lesson"
 * once every unit before it is done.
 *
 * URLs read off the live "Start Course challenge" href. The pattern is
 * /science/<course>/test/<courseId>:course-challenge, but do NOT construct
 * these — the Earth & space course slug does not match the others.
 */
export const SCIENCE_COURSE_CHALLENGES = [
  { skillTitle: 'Middle School Chemistry — Course Challenge', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/science/ms-chemistry/test/xc370bc422b7f75fc:course-challenge', batchLabel: 'Q2 2026-2027', isCourseChallenge: true, sequenceInQuarter: 99, courseId: 'chem' },
  { skillTitle: 'Middle School Biology — Course Challenge', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/science/ms-biology/test/x0c5bb03129646fd6:course-challenge', batchLabel: 'Q1 2026-2027', isCourseChallenge: true, sequenceInQuarter: 99, courseId: 'bio' },
  { skillTitle: 'Middle School Physics — Course Challenge', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/science/ms-physics/test/x1baed5db7c1bb50b:course-challenge', batchLabel: 'Q4 2026-2027', isCourseChallenge: true, sequenceInQuarter: 99, courseId: 'phys' },
  { skillTitle: 'Middle School Earth and Space Science — Course Challenge', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/science/middle-school-earth-and-space-science/test/x87d03b443efbea0a:course-challenge', batchLabel: 'Q3 2026-2027', isCourseChallenge: true, sequenceInQuarter: 99, courseId: 'earth' }
];

/** Rows for one quarter, shaped the way the store's seeding loops expect. */
export function scienceRowsFor(batchLabel) {
  return (SCIENCE_KHAN_SEQUENCE[batchLabel] || []).map((r) => ({
    subject: 'science',
    skillTitle: r.skillTitle,
    gradeLevel: r.gradeLevel,
    khanAcademyUrl: r.khanAcademyUrl,
    sequenceInQuarter: r.sequenceInQuarter
  }));
}

/**
 * Which Khan course a science row belongs to, and its unit number there.
 *
 * Looked up from the URL, never stored on the row — the same rule the grammar
 * fix landed on earlier today. A URL cannot drift, a stored field can, and a
 * title certainly can. Returns null for anything that is not one of ours (a
 * unit the parent added by hand, for instance), so the card simply shows
 * nothing rather than guessing.
 */
export function scienceCourseForUrl(url) {
  if (!url) return null;
  const all = [...Object.values(SCIENCE_KHAN_SEQUENCE).flat(), ...SCIENCE_COURSE_CHALLENGES];
  const unit = all.find((u) => u.khanAcademyUrl === url);
  if (!unit || !unit.courseId) return null;
  const course = SCIENCE_COURSES[unit.courseId];
  if (!course) return null;
  return {
    courseId: unit.courseId,
    label: course.label,
    fullName: course.fullName,
    khanUnit: unit.khanUnit ?? null,
    contentUnits: course.contentUnits,
    isCourseChallenge: Boolean(unit.isCourseChallenge)
  };
}

/**
 * Every content unit of every course, and where in the year it lands.
 *
 * The guard uses this to assert that all 22 real units are covered exactly
 * once — which is the question the parent was really asking when she counted
 * five in Q1 and eleven on Khan's page.
 */
export function scienceCoverageByCourse() {
  const out = {};
  for (const [id, course] of Object.entries(SCIENCE_COURSES)) {
    if (course.contentUnits === null) continue;
    out[id] = { ...course, covered: [] };
  }
  for (const [batchLabel, units] of Object.entries(SCIENCE_KHAN_SEQUENCE)) {
    for (const u of units) {
      if (!u.courseId || !out[u.courseId] || u.khanUnit === null) continue;
      out[u.courseId].covered.push({ khanUnit: u.khanUnit, skillTitle: u.skillTitle, batchLabel });
    }
  }
  for (const entry of Object.values(out)) {
    entry.covered.sort((a, b) => a.khanUnit - b.khanUnit);
  }
  return out;
}

/** Course-challenge rows, shaped for the store's combined challenge batch. */
export function scienceCourseChallengeRows() {
  return SCIENCE_COURSE_CHALLENGES.map((r) => ({ subject: 'science', ...r }));
}

/**
 * Every (skillTitle, batchLabel) pair this sequence legitimately produces,
 * as "title||label" strings.
 *
 * WHY (Aug 7, 2026): the live database was found carrying 13 orphan Science
 * rows from an OLDER sequence the source no longer produces — Chemistry in
 * Q4, Physics in Q3, and biology units duplicated across two and three
 * quarters at once. 'Ecosystems and Biodiversity' existed in Q2, Q3 AND Q4
 * simultaneously. Earlier cleanups only ever removed rows by an explicit
 * title list, so anything not on that list survived every rewrite and
 * accumulated.
 *
 * The store uses this to reconcile. See the SAFETY note on
 * SCIENCE_CANONICAL_TITLES — the two are used together, and using the keys
 * alone would delete the parent's own manually-added assignments.
 */
export const SCIENCE_CANONICAL_KEYS = new Set([
  ...Object.entries(SCIENCE_KHAN_SEQUENCE).flatMap(([label, units]) =>
    units.map((u) => u.skillTitle + '||' + label)),
  ...SCIENCE_COURSE_CHALLENGES.map((c) => c.skillTitle + '||' + c.batchLabel)
]);

/**
 * Every title this sequence owns, regardless of quarter.
 *
 * SAFETY — this is the whole point of the pair. Reconciliation only ever
 * considers a row whose title is in THIS set. A row the parent added by
 * hand in the Parent Dashboard carries a title we do not own, so it is
 * invisible to the cleanup and can never be deleted by it. Only a unit that
 * is genuinely ours, sitting in a quarter we no longer put it in, is stale.
 */
export const SCIENCE_CANONICAL_TITLES = new Set([
  ...Object.values(SCIENCE_KHAN_SEQUENCE).flat().map((u) => u.skillTitle),
  ...SCIENCE_COURSE_CHALLENGES.map((c) => c.skillTitle)
]);

/**
 * The canonical row for a (skillTitle, batchLabel) pair, or undefined.
 *
 * WHY (Aug 7, 2026): the seeding loops in useAppStore.js only ever ADD rows
 * that are missing — by design, so they can run on every hydrate without
 * duplicating. The consequence nobody had hit until now is that a row which
 * already exists NEVER picks up a corrected field. Five Science rows were
 * found sitting on sequence numbers from a superseded ordering: Q2 had two
 * units both numbered 2 and nothing numbered 1, so "what's next" was
 * ambiguous and the quarter read wrong on screen.
 *
 * The store uses this to repair presentation fields in place. It must never
 * be used to touch completed, grade, completedAt or createdAt — those are
 * his record, not our metadata.
 */
export function scienceCanonicalRow(skillTitle, batchLabel) {
  const unit = (SCIENCE_KHAN_SEQUENCE[batchLabel] || []).find((u) => u.skillTitle === skillTitle);
  if (unit) return { ...unit, subject: 'science' };
  return SCIENCE_COURSE_CHALLENGES.find((c) => c.skillTitle === skillTitle && c.batchLabel === batchLabel);
}
