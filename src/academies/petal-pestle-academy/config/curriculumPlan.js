// ---------------------------------------------------------------------------
// THE CURRICULUM PLAN — the year, the quarter, the week, and who owns what.
//
// This file exists because of a real failure. The schedule was built as a full
// school day with three app-taught courses running four days a week, and the
// curriculum was sized as a sample: 130 lessons planned against 288 needed,
// with 14 actually written. Nothing in the app was comparing those two numbers,
// so the disagreement survived every one of the seventeen checks.
//
// Gigi's words for it were "it feels all over the place," and the arithmetic
// above is what that feeling was.
//
// From here the volume is DATA, and scripts/check-curriculum-volume.mjs holds
// the courses to it.
//
// ---- THE WEEK. THIS IS THE PART THAT WAS MISSING ENTIRELY ----
//
// The app had lessons, unit tests every three or four lessons, and a quarter
// test. Nothing marked a Friday. A unit boundary landed on a Tuesday, then a
// Thursday, then a Monday, and no child or grandmother can feel a rhythm like
// that.
//
//   Day 1  new lesson
//   Day 2  new lesson
//   Day 3  new lesson
//   Day 4  REVIEW GAME + WEEKLY TEST — 8 questions on this week's three
//
// The weekly test REPLACES the unit test. It does not stack on top of it. A
// unit test over three or four lessons and a weekly test over three lessons are
// the same test with two names, and running both would double her testing to
// buy nothing.
//
// ---- THE QUARTER ----
//
//   Weeks 1-8   24 lessons, 8 weekly tests
//   Week 9      Study Guide -> Review Game -> QUARTERLY EXAM, 24 questions,
//               cumulative across that quarter and nothing beyond it
//
// Four quarters of nine weeks is a 36-week year.
//
// ---- WHY THE 2:10 BLOCK ALTERNATES BY QUARTER ----
//
// The Human Body is the course she opens the app for — she intends to be a
// doctor. It is also not a Georgia fourth-grade science standard; cells and
// inherited traits are FIFTH grade. So it stays, and it is labeled enrichment
// rather than quietly counted as her science.
//
// The Science Lab covers what a garden honestly cannot reach: stars and
// planets, light, sound, forces and simple machines.
//
// Alternating by QUARTER rather than by day keeps the week shape intact for
// both — each gets whole quarters with their own weekly tests and their own
// quarterly exam. Alternating by day would have given each course two lessons a
// week and no coherent week at all, which is the problem this file exists to
// fix.
// ---------------------------------------------------------------------------

/** The week. Four school days. */
export const WEEK = {
  // ---- FIVE DAYS, NOT FOUR (v3.10) ----
  //
  // The app modelled a four-day week because that is what the teaching week is.
  // Gigi's week has always been Monday to Friday:
  //
  //   Mon · Tue · Wed   three new lessons
  //   Thu               review game, then the weekly test
  //   Fri               CATCH-UP. Anything she did not finish, plus projects due.
  //
  // Friday is an ADDITION, not a redefinition. It adds no new lesson, so
  // newLessonDays stays 3, the year stays 32 teaching weeks and 96 lessons a
  // course, and nothing already written moves. What changes is that the app now
  // knows the day exists — before this it had no way to say "you are behind, and
  // Friday is when you catch up."
  schoolDays: 5,
  newLessonDays: 3,
  reviewDay: 4,
  /** Day 5. No new lesson. Unfinished lessons, missed tests and projects due. */
  catchUpDay: 5,
  weeklyTestQuestions: 8,
  /** Weekly-test questions drawn from earlier weeks. Interleaving, same as the
   *  unit test it replaces — 3 of 10 there, 2 of 8 here, same proportion. */
  interleavedFromEarlier: 2
};

/** The quarter. Nine weeks: eight teaching, one to review and sit the exam. */
export const QUARTER = {
  weeks: 9,
  teachingWeeks: 8,
  examWeek: 9,
  lessonsPerQuarter: 24,
  weeklyTestsPerQuarter: 8,
  quarterExamQuestions: 24
};

/** The year. */
export const YEAR = {
  quarters: 4,
  weeks: 36,
  lessonsPerCoursePerYear: 96,
  weeklyTestsPerCoursePerYear: 32,
  quarterExamsPerCoursePerYear: 4
};

/**
 * The courses the APP teaches. Khan's four are not here — Khan owns its own
 * practice, mastery and quizzing, and building a parallel set would be work
 * that buys nothing.
 *
 * `quarters` is which of the year's four quarters this course runs in. A course
 * that runs in two quarters needs half a year's lessons, not a year's, and
 * check-curriculum-volume works that out rather than being told.
 *
 * `state` is the honest one:
 *   'planned'  — outlined, no lessons required yet
 *   'building' — lessons being written; the volume check reports the gap and
 *                does not fail on it
 *   'complete' — claims to be finished. The volume check and the standards
 *                check BOTH fail if that claim is not true.
 */
export const APP_COURSES = [
  {
    id: 'herbalism',
    title: 'Herbalism & Botany',
    block: 'blk-herbalism',
    minutesPerDay: 45,
    quarters: [1, 2, 3, 4],
    lessonDaysPerWeek: 3,
    weeklyTestQuestions: 8,
    kind: 'science',
    signature: true,
    state: 'complete',
    // v3.8: Quarters 1 and 2 were COMPLETE — 48 lessons, 8 modules, 16 weeks.
    // v3.9: ALL FOUR QUARTERS BUILT — 96 lessons, 16 modules, 32 weeks.
    //
    // v3.9 to v3.30 this said 'building', with the reason: "that flag means the
    // whole app's curriculum claim, and three other courses have nothing."
    //
    // THAT WAS NEVER WHAT THE FLAG MEANT TO ANY CHECK THAT READS IT. Both
    // check-standards and check-curriculum-volume read `state` PER COURSE, and
    // check-standards only hard-fails on an element with no lesson when the
    // owning course says 'complete'. So for twenty-one versions the guard on
    // 96 lessons and 10 Georgia elements was switched off by this one word,
    // while the check printed a confident "10/10 taught · BUILDING".
    //
    // The Science Lab was marked 'complete' at v3.30 with three other courses
    // still empty, so the per-course meaning had already won in practice.
    // Herbalism was the last holdout on a meaning nothing implemented.
    //
    // check-curriculum-volume now FAILS when a course has written every lesson
    // it owes and still calls itself 'building', so this cannot drift back.
    lessonsWritten: 96,
    note: 'Her signature course, complete: 96 lessons across 16 modules. Carries all ten of its Georgia elements — S4L1 a-d, S4E3 a-b, S4E4 a-d.'
  },
  {
    id: 'sciencelab',
    title: 'The Science Lab',
    block: 'blk-science',
    minutesPerDay: 30,
    quarters: [1, 3],
    lessonDaysPerWeek: 3,
    weeklyTestQuestions: 8,
    kind: 'science',
    state: 'complete',
    lessonsWritten: 48,
    note: 'What the garden cannot reach: forces, light, sound, stars, the moon. Mon-Wed in the 2:10 block; in Q2 and Q4 that half hour is garden and project time.'
  },
  {
    id: 'humanbody',
    title: 'The Human Body',
    // MOVED off blk-science and onto the rotating 2:45 block (v3.22). Gigi:
    // "social studies and the human body to be 2 days a week. They can rotate."
    // Tuesdays and Thursdays, every week of all four quarters, instead of three
    // days a week for two quarters and nothing at all for the other two.
    block: 'blk-social',
    rotatesWith: 'social',
    minutesPerDay: 30,
    quarters: [1, 2, 3, 4],
    lessonDaysPerWeek: 2,
    // A two-lesson week gets a five-question paper, not the eight a three-lesson
    // week gets. Declared per course rather than assumed globally, which is the
    // change that let a two-day course exist at all.
    weeklyTestQuestions: 5,
    kind: 'enrichment',
    // 'complete' from v3.53 — all 64 lessons written, delivered and reachable.
    //
    // It said 'building' from v3.46, correctly, while it was. The rule it moved
    // under is v3.31's: A COURSE THAT HAS WRITTEN EVERY LESSON IT OWES MAY NOT
    // SAY 'building'. Herbalism sat at 'building' with all 96 written for
    // twenty-one versions, and that one word switched off check-standards'
    // only hard failure the whole time. A state that understates is the
    // direction that turns a check OFF, which is why understating is the
    // dangerous direction and not the safe one.
    //
    // check-curriculum-volume enforced this within seconds of the 64th lesson
    // landing, by name, and the build was red until this word changed.
    state: 'complete',
    lessonsWritten: 64,
    note: 'ENRICHMENT, stated plainly. No Georgia fourth-grade standard covers the human body; cells and inherited traits are fifth grade. It stays because it is the course she opens the app for, and it is not counted as her science.'
  },
  {
    id: 'social',
    title: 'Social Studies',
    block: 'blk-social',
    rotatesWith: 'humanbody',
    minutesPerDay: 30,
    // QUARTERS 1 TO 3, not the whole year (v3.31). Gigi, Aug 17 2026, choosing
    // shape B: "I would prefer the human body to have full year courses.
    // Social Studies can have 2 qtrs or 1 if it doesn't really matter."
    //
    // Two quarters could not hold it honestly. The 2:45 block has four lesson
    // days; The Human Body keeps two of them every week of the year, which
    // leaves two a week for Social Studies. Two quarters of that is 32 lessons
    // against roughly 37 Georgia elements — fewer lessons than elements, which
    // is a survey and not a course, and the elements that thin out first are
    // SS4H4 abolition, SS4H6c sharecropping and SS4H6d Jim Crow.
    //
    // Three quarters gives 48 lessons, about 1.3 per element. Quarter 4's
    // Monday and Wednesday go back to the garden and her projects, DECLARED in
    // check-curriculum-volume rather than left as a hole.
    quarters: [1, 2, 3],
    // Mondays and Wednesdays. This is what took the largest single body of
    // unwritten work in the app from 96 lessons to 64, and then to 48.
    lessonDaysPerWeek: 2,
    weeklyTestQuestions: 5,
    kind: 'social',
    state: 'complete',
    lessonsWritten: 48,
    // ---- THE NOTE THAT USED TO BE HERE WAS FALSE (corrected v3.31) ----
    //
    // It read: "Already built against Georgia GSE Social Studies, verbatim —
    // 13 standards, 37 elements. The standards work is done; the lessons are
    // not." NONE of that is true on the disk. src/data/standards/ contains
    // exactly one file, georgiaScience4.js, and check-standards.mjs only ever
    // imports GA_SCIENCE_4 — which is why nothing ever tested the claim.
    //
    // The 13-and-37 figures are not verified either. A county reproduction of
    // the GSE document counts 12 standards and 35 lettered elements; the gap is
    // probably SS4CG2 and SS4E2, which carry no letters. THAT IS NOT SETTLED
    // FROM A SECONDARY SOURCE. It gets transcribed from the GaDOE document.
    note: 'US History Year 2: Revolution to Reconstruction. Q1-Q3, Mon and Wed, 48 lessons owed, 0 written. ITS GEORGIA STANDARDS DO NOT EXIST ON DISK — transcribe them from GaDOE before any lesson is written.'
  }
];

/**
 * THE CROSSWALK.
 *
 * Every one of Georgia's 25 fourth-grade science elements, owned by exactly one
 * course, in one named quarter. check-standards.mjs fails if an element has no
 * owner, if two courses claim the same element, or if a course marked
 * 'complete' has an owned element with no lesson behind it.
 *
 * Ten elements went to Herbalism and fifteen to the Science Lab, and the split
 * is not arbitrary — it is the line between what a garden can teach honestly
 * and what it cannot. A rain gauge and a compost bin are real herbalism. A
 * mirror at forty-five degrees is not.
 */
/**
 * THE SOCIAL STUDIES CROSSWALK — 37 units, all owned by Social Studies (v3.32).
 *
 * Written BEFORE a single lesson, on purpose. Science learned this the hard way:
 * a subject with no crosswalk and no check reading it can claim anything about
 * itself, and this one did for nine versions.
 *
 * ---- WHY 37 AND NOT 35 ----
 *
 * SS4CG2 (First Amendment freedoms) and SS4E2 (personal budget) carry NO
 * lettered elements. Owning only lettered elements would leave those two owned
 * by nobody and invisible to the check — a gap of exactly the shape this
 * crosswalk exists to prevent. georgiaSS4.js emits them as whole-standard units
 * so they can be owned like everything else.
 *
 * ---- THE QUARTERS ----
 *
 *   Q1 · 14 units in 16 lessons — Revolution, the Constitution, and all of
 *        civics, because the government she is learning about is the one those
 *        two events produced. Civics taught anywhere else is trivia.
 *   Q2 · 13 units in 16 lessons — westward expansion, the geography of the
 *        country, and every economic concept, each attached to the historical
 *        event Georgia attaches it to.
 *   Q3 · 10 units in 16 lessons — abolition, the Civil War, Reconstruction.
 *        THE LIGHTEST QUARTER ON PURPOSE. SS4H4, SS4H6c and SS4H6d are the
 *        elements Gigi has said the Black-American-educator requirement is not
 *        a nice-to-have for, and six spare lessons is what teaching them
 *        properly rather than listing them costs.
 */
/**
 * GEORGIA UNITS DELIBERATELY NOT TAUGHT, AND WHO DECIDED (v3.33).
 *
 * ---- WHY THIS TABLE EXISTS RATHER THAN A DELETED LINE ----
 *
 * check-standards fails when a Georgia unit is owned by nobody, and that is the
 * one thing it actually fails on. The easy way to drop a standard is to delete
 * its crosswalk line, and then the check goes quiet and the record silently
 * covers 36 of 37 while every screen still says the course is aligned to GSE.
 *
 * That is the same failure the app has now made four times in different
 * clothes: a rule kept in someone's head instead of in code. A quarter with no
 * course is a hole unless DECLARED (v3.22). A reading exemption is derived, not
 * listed (v3.25). A dead URL is written down, never deleted (v3.21). This is
 * that rule applied to a state standard.
 *
 * So an unowned unit is STILL an error unless it appears here, WITH a reason,
 * a date, and the person who decided. check-standards prints every entry on
 * every run, and fails if one of them is stale — a unit that is declared
 * dropped AND owned by a course is two people disagreeing in writing.
 *
 * ---- AND IT IS NOT A LEGAL PROBLEM, WHICH IS WHY IT IS ALLOWED AT ALL ----
 *
 * Georgia's home study law names five subjects and sets NO curriculum. GSE is
 * the public-school standard; aligning to it was Gigi's choice and it is above
 * what the law asks. Dropping one unit does not put her out of compliance. It
 * changes what the app may claim, which is what this table governs.
 */
export const DECLARED_OMISSIONS = [
  {
    element: 'SS4E2',
    subject: 'social studies',
    decidedBy: 'Gigi',
    decidedOn: '2026-08-17',
    reason:
      "\u201cIt\u2019s out. I\u2019ll teach her about money in the 5th grade.\u201d Personal budgeting \u2014 income, expenditures, saving. Not required by Georgia\u2019s home study law, which names five subjects and no curriculum; it is a GSE unit and GSE alignment is Gigi\u2019s own choice, above what the law asks. Social Studies therefore covers 36 of Georgia\u2019s 37 fourth-grade units, deliberately, and this is the one."
  }
];

export const SOCIAL_STANDARD_OWNERS = [
  // ---- QUARTER 1 · Revolution, Constitution, and the government they made ----
  { element: 'SS4H1a', course: 'social', quarter: 1, vehicle: 'The road to revolt as a chain of causes, from the French and Indian War to the Tea Party.' },
  { element: 'SS4H1b', course: 'social', quarter: 1, vehicle: 'The people on both sides, including the Black regiments Georgia names by name.' },
  { element: 'SS4H1c', course: 'social', quarter: 1, vehicle: 'Lexington and Concord, Saratoga, Yorktown — and why the smaller army won.' },
  { element: 'SS4H1d', course: 'social', quarter: 1, vehicle: 'Reading the Declaration itself: who wrote it, and what it accuses a king of.' },
  { element: 'SS4H2a', course: 'social', quarter: 1, vehicle: 'The men in the room at Philadelphia, and what each of them wanted.' },
  { element: 'SS4H2b', course: 'social', quarter: 1, vehicle: 'The arguments that nearly broke it: the Articles, the Great Compromise, and the Three-Fifths Compromise stated plainly.' },
  { element: 'SS4CG1a', course: 'social', quarter: 1, vehicle: 'Natural rights, in the words the Declaration actually uses.' },
  { element: 'SS4CG1b', course: 'social', quarter: 1, vehicle: '"We the People" — consent of the governed, and who was left out of it in 1787.' },
  { element: 'SS4CG1c', course: 'social', quarter: 1, vehicle: 'Federal, state and shared powers sorted into three piles she builds herself.' },
  { element: 'SS4CG1d', course: 'social', quarter: 1, vehicle: 'Representative democracy: why she elects someone instead of voting on everything.' },
  { element: 'SS4CG2', course: 'social', quarter: 1, vehicle: 'The five First Amendment freedoms, one at a time, with a real situation for each.' },
  { element: 'SS4CG3a', course: 'social', quarter: 1, vehicle: 'Three branches, checks and balances, traced through one bill from idea to law.' },
  { element: 'SS4CG3b', course: 'social', quarter: 1, vehicle: 'The Bill of Rights as limits ON government, and why 1791 needed them written down.' },
  { element: 'SS4G2a', course: 'social', quarter: 1, vehicle: 'The ground itself at Lexington, Saratoga and Yorktown, and who used it better.' },

  // ---- QUARTER 2 · Westward expansion, the map, and the economics ----
  { element: 'SS4H3a', course: 'social', quarter: 2, vehicle: 'The War of 1812, the burning of the Capitol, and a song written during a bombardment.' },
  { element: 'SS4H3b', course: 'social', quarter: 2, vehicle: 'What expansion cost American Indians: the Trail of Tears, Little Bighorn, the reservations.' },
  { element: 'SS4H3c', course: 'social', quarter: 2, vehicle: 'The Louisiana Purchase, Lewis and Clark, Texas, Oregon and California, on one growing map.' },
  { element: 'SS4G1a', course: 'social', quarter: 2, vehicle: 'Coastal Plain, Great Plains, Continental Divide, Gulf, Mississippi, Great Lakes — found and labelled.' },
  { element: 'SS4G1b', course: 'social', quarter: 2, vehicle: 'Six places people built, and what each was built for.' },
  { element: 'SS4G2b', course: 'social', quarter: 2, vehicle: 'Mountains that stopped people and rivers that carried them, 1801 to 1861.' },
  { element: 'SS4E1a', course: 'social', quarter: 2, vehicle: 'Opportunity cost: what a family gave up to go west, listed in their own words.' },
  { element: 'SS4E1b', course: 'social', quarter: 2, vehicle: 'Price incentives: why a farmer planted cotton instead of food.' },
  { element: 'SS4E1c', course: 'social', quarter: 2, vehicle: 'Specialization: why the North made things and the South grew them.' },
  { element: 'SS4E1d', course: 'social', quarter: 2, vehicle: 'Voluntary exchange in a Gold Rush town, where both sides walked away better off.' },
  { element: 'SS4E1e', course: 'social', quarter: 2, vehicle: 'Trade across the Atlantic, and what each side sent the other.' },
  { element: 'SS4E1f', course: 'social', quarter: 2, vehicle: 'Cotton gin, steamboat, locomotive, telegraph — four machines and what each one changed.' },

  // ---- QUARTER 3 · Abolition, the Civil War, Reconstruction ----
  { element: 'SS4H4a', course: 'social', quarter: 3, vehicle: 'Anthony, Douglass, Stanton, Truth and Tubman — five people, and the risk each one took.' },
  { element: 'SS4H5a', course: 'social', quarter: 3, vehicle: "Uncle Tom's Cabin and Harper's Ferry: a book and a raid, and how each lit a fuse." },
  { element: 'SS4H5b', course: 'social', quarter: 3, vehicle: "States' rights and slavery, and how the two arguments were the same argument." },
  { element: 'SS4H5c', course: 'social', quarter: 3, vehicle: 'Fort Sumter to Appomattox, including the Atlanta Campaign and the March to the Sea in her own state.' },
  { element: 'SS4H5d', course: 'social', quarter: 3, vehicle: 'Six men who ran the war, and what each was trying to do.' },
  { element: 'SS4H5e', course: 'social', quarter: 3, vehicle: 'What the war did to ordinary people, North and South.' },
  { element: 'SS4H6a', course: 'social', quarter: 3, vehicle: 'The 13th, 14th and 15th Amendments — what each one promised.' },
  { element: 'SS4H6b', course: 'social', quarter: 3, vehicle: "The Freedmen's Bureau: schools, contracts, and what it could and could not do." },
  { element: 'SS4H6c', course: 'social', quarter: 3, vehicle: 'Sharecropping as slavery renamed, and every method used to take the vote back.' },
  { element: 'SS4H6d', course: 'social', quarter: 3, vehicle: 'Jim Crow: the laws, the practices, and how long they lasted.' }
];

export const STANDARD_OWNERS = [
  // ---- HERBALISM & BOTANY · 10 elements the garden owns outright ----
  { element: 'S4L1a', course: 'herbalism', quarter: 1, vehicle: 'Producers, consumers and decomposers in her own compost bin.' },
  { element: 'S4L1b', course: 'herbalism', quarter: 1, vehicle: 'The food web of her containers, starting at sunlight.' },
  { element: 'S4L1c', course: 'herbalism', quarter: 1, vehicle: 'Change one thing in the garden and predict what follows.' },
  { element: 'S4L1d', course: 'herbalism', quarter: 1, vehicle: 'What happens when the pollinators stop coming.' },
  { element: 'S4E3a', course: 'herbalism', quarter: 2, vehicle: 'Ice, water and vapour in a jar on the windowsill.' },
  { element: 'S4E3b', course: 'herbalism', quarter: 2, vehicle: 'A bag tied over a living leaf. Transpiration she can see.' },
  { element: 'S4E4a', course: 'herbalism', quarter: 3, vehicle: "A gardener's weather station: rain gauge, thermometer, wind vane." },
  { element: 'S4E4b', course: 'herbalism', quarter: 3, vehicle: 'Reading a real weather map to decide whether to plant.' },
  { element: 'S4E4c', course: 'herbalism', quarter: 3, vehicle: 'Cloud types from the back step, logged for two weeks.' },
  { element: 'S4E4d', course: 'herbalism', quarter: 3, vehicle: "Weather decides today's watering. Climate decides what she can grow at all." },

  // ---- THE SCIENCE LAB · 15 elements the garden cannot honestly reach ----
  { element: 'S4P3a', course: 'sciencelab', quarter: 1, vehicle: 'Balanced and unbalanced forces, tested with string and weights.' },
  { element: 'S4P3b', course: 'sciencelab', quarter: 1, vehicle: 'Gravity — and the root that grows down whichever way the seed lay.' },
  { element: 'S4P3c', course: 'sciencelab', quarter: 1, vehicle: 'Six simple machines, and the garden tools that are each of them.' },
  { element: 'S4P1a', course: 'sciencelab', quarter: 1, vehicle: 'Opaque, transparent, translucent — tested with leaves and greenhouse plastic.' },
  { element: 'S4P1b', course: 'sciencelab', quarter: 1, vehicle: 'A mirror, a flashlight and angles.' },
  { element: 'S4P1c', course: 'sciencelab', quarter: 1, vehicle: 'A pencil bending in a glass of water.' },
  { element: 'S4P2a', course: 'sciencelab', quarter: 3, vehicle: 'Rubber bands, rulers and jars of water. Strength and speed of vibration.' },
  { element: 'S4P2b', course: 'sciencelab', quarter: 3, vehicle: 'Build a thing that sends a message across the yard.' },
  { element: 'S4E1a', course: 'sciencelab', quarter: 3, vehicle: 'From the naked eye to Galileo to James Webb.' },
  { element: 'S4E1b', course: 'sciencelab', quarter: 3, vehicle: 'Why the sun looks bigger than every other star.' },
  { element: 'S4E1c', course: 'sciencelab', quarter: 3, vehicle: 'Stars burn. Planets do not.' },
  { element: 'S4E1d', course: 'sciencelab', quarter: 3, vehicle: 'Build a scale solar system and find out what the model gets wrong.' },
  { element: 'S4E2a', course: 'sciencelab', quarter: 3, vehicle: 'Why the light lasts longer in June — and why that matters to a gardener.' },
  { element: 'S4E2b', course: 'sciencelab', quarter: 3, vehicle: 'Draw the moon every night for a month.' },
  { element: 'S4E2c', course: 'sciencelab', quarter: 3, vehicle: 'The tilt. Why Georgia has a first and last frost date at all.' }
];

/** Elements Georgia does NOT require in fourth grade that the app teaches anyway. */
export const TAUGHT_OFF_GRADE = [
  {
    course: 'herbalism',
    module: 1,
    realStandard: 'S2L1',
    grade: 2,
    why: 'Plant life cycles. Below grade on the state map, and the foundation everything else in a botany course stands on. Kept deliberately, recorded openly.'
  },
  {
    course: 'herbalism',
    module: '2 and 3',
    realStandard: 'S3L1',
    grade: 3,
    why: "Plants, habitats and adaptations. Third grade. Also where her measured reading sits — 2.91 to 3.46."
  },
  {
    course: 'herbalism',
    module: 4,
    realStandard: 'S3L2',
    grade: 3,
    why: 'Plant and animal adaptations, and how a feature helps a living thing survive where it lives. Third grade. Module 4 teaches thorns, fuzz, thick skin, strong scent and climbing as exactly that, and it is recorded here rather than counted as fourth-grade coverage.'
  },
  {
    course: 'humanbody',
    module: 'all',
    realStandard: 'S5L (nearest)',
    grade: 5,
    why: 'No Georgia fourth-grade standard covers the human body. This course is enrichment and the records should say so.'
  }
];

/** How many lessons a course owes for the year, from its quarters. */
export function lessonsRequired(course) {
  // PER COURSE, not one number for all of them (v3.22).
  //
  // This used to be `quarters.length * 24`, which silently assumed every course
  // runs three days a week. Social Studies and The Human Body now run two, so
  // the figure is computed from the course's own days rather than from a
  // constant that was only ever true for three of them.
  const daysPerWeek = course.lessonDaysPerWeek ?? WEEK.newLessonDays;
  return course.quarters.length * QUARTER.teachingWeeks * daysPerWeek;
}

/**
 * THE LONGEST A VIDEO MAY BE, IN MINUTES — DERIVED FROM THE COURSE'S OWN DAY.
 *
 * ---- WHY THIS EXISTS, v3.45 ----
 *
 * Nothing had ever measured how long a lesson's video was. `video.minutes` has
 * been recorded on all 192 lessons since v3.24 and NOT ONE OF THE TWENTY-SIX
 * CHECKS READ IT. A field that is recorded and never asserted is a field that
 * drifts, and it did: Social Studies reached twelve videos over six minutes,
 * one of them eleven, in a course whose System Concept is ten.
 *
 * Caught while picking videos for The Human Body, when a 9:19 video looked
 * acceptable by reasoning and was rejected by MEASURING WHAT THE FINISHED
 * COURSES ACTUALLY DO. The Science Lab has the same 30-minute shape and its 48
 * videos run 3 to 5 minutes, with one exception.
 *
 * ---- THE ARITHMETIC, WHICH IS THE WHOLE ARGUMENT ----
 *
 * §10.2 gives the System Concept 12 minutes in a 45-minute lesson and 10 in a
 * 30-minute one. That block holds THE VIDEO **AND TWO BEATS**, each with a
 * hook, an example and an unscored Apply-It. Two beats cannot be taught in
 * under about four minutes.
 *
 *     ceiling = systemConceptMinutes − 4
 *
 * 45-minute lesson → 12 − 4 = **8**.  30-minute lesson → 10 − 4 = **6**.
 *
 * A video longer than that does not leave room for the teaching. It stops being
 * one input among several and becomes the lesson — which is the thing v3.24's
 * rule was written against: *watching is not the lesson, the doing is*.
 *
 * DERIVED, not typed, for the same reason schoolDayEndsAt() is derived at
 * v3.43: 6 and 8 are correct today and would go quietly wrong the moment a
 * course's minutes change. A number that happens to be correct today is not a
 * measurement (v3.34).
 */
export function videoCeilingFor(course) {
  const c = typeof course === 'string' ? courseById(course) : course;
  if (!c) return null;
  const systemConcept = (c.minutesPerDay ?? 30) >= 45 ? 12 : 10;
  return systemConcept - 4;
}

/**
 * Videos already shipped that are over their course's ceiling.
 *
 * ---- GIGI'S CALL, Aug 17 2026: leave them, record the exception ----
 *
 * These were chosen and signed off before anything measured length, and they
 * sit in two courses marked complete. Quietly re-cutting a grown woman's
 * finished curriculum to make a new check pass is the wrong way round — the
 * check is new, not the content.
 *
 * So they are DECLARED, by name, with a date and a reason, exactly the way
 * SS4E2 is declared in DECLARED_OMISSIONS and the way the advocacy exclusions
 * are written into their lesson files. **A declaration names specific ids and
 * nothing else** — it is not a raised ceiling, and a video that drifts over the
 * limit tomorrow still fails.
 *
 * ⚠️ ONE OF THESE IS NOT LIKE THE OTHERS. `ss-m9-01` is Frederick Douglass
 * taught by **Seed of Melanin Kids** — one of only four videos in the entire
 * app that answer the standing Black-American-educator requirement, after two
 * whole courses failed it. Cutting it for being three minutes long would have
 * traded the app's scarcest thing for its newest rule.
 */
/**
 * ⚠️ EMPTY, AND THAT IS THE ANSWER — v3.46.
 *
 * At v3.45 this held thirteen lesson ids and a fourteenth was coming: measuring
 * Herbalism turned up eighteen more videos over the derived ceiling, two of
 * them over half an hour.
 *
 * Then Gigi said: **"Just leave the videos alone the way they are. It maybe
 * good to have her watch the full videos."**
 *
 * ---- WHY THAT SETTLES IT, RATHER THAN OVERRULING A CHECK ----
 *
 * The ceiling was MY INFERENCE, not her rule. I derived it from §10.2's
 * arithmetic — ten minutes of System Concept must hold a video and two beats —
 * and that arithmetic is sound as a DEFAULT. It is not a law about how a
 * grandmother is allowed to spend forty-five minutes with her granddaughter.
 * She may want a lesson to run long, or a video to BE the activity, or a
 * half-hour talk watched across two afternoons. None of that is my call.
 *
 * And the content already knew what it was doing. `hb-m12-05` carries a note
 * written when it was chosen: *"PREVIEW BEFORE USE… Watch it first and pick the
 * two or three minutes that show the actual seed being handled."* The lesson
 * never asked her to sit through thirty-one minutes.
 *
 * ---- AND THE COST OF GETTING THIS WRONG WAS NEARLY REAL ----
 *
 * I recommended replacing the two longest. One of them, `hb-m12-05`, is IRA
 * WALLACE — a Black American seed saver and worker-owner of Southern Exposure
 * Seed Exchange, teaching this lesson's exact content. Its own file calls it
 * "the strongest close in the module". Cutting it on a number would have thrown
 * away the best Black-educator find in Herbalism, from a course that took 33
 * searches to find none. **Gigi stopped that.**
 *
 * ---- WHAT SURVIVES ----
 *
 * Length is still MEASURED, still RECORDED on all 192, and still PRINTED on
 * every run so drift is visible. What is gone is the hard failure. A number
 * that is visible is not the same as a number that is enforced, and only one of
 * those was ever mine to decide.
 *
 * Kept as an empty export rather than deleted, so the shape is here if she ever
 * does want a ceiling enforced.
 */
export const DECLARED_LONG_VIDEOS = [];

export function courseById(id) {
  return APP_COURSES.find((c) => c.id === id) || null;
}

/** Which of the 25 elements a given course owns. */
export function elementsOwnedBy(courseId) {
  return STANDARD_OWNERS.filter((o) => o.course === courseId);
}

/** Where a lesson sits: week 1-9 of its quarter, day 1-4 of its week. */
export function placeLesson(indexInQuarter) {
  const week = Math.floor(indexInQuarter / WEEK.newLessonDays) + 1;
  const day = (indexInQuarter % WEEK.newLessonDays) + 1;
  return { week, day };
}

/** The id of the weekly test for a course, quarter and week. */
export function weeklyTestId(courseId, quarter, week) {
  return `${courseId}-q${quarter}-w${week}`;
}

export function quarterExamId(courseId, quarter) {
  return `${courseId}-q${quarter}-exam`;
}
