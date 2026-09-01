// ---------------------------------------------------------------------------
// THE ASSESSMENT SYSTEM — BUILT FOR RETENTION, NOT FOR SCORING.
//
// Gigi asked for unit tests and quarterly tests, and then said: do what is best
// for her to receive the best retention. Those two sentences pull in slightly
// different directions, and it is worth saying plainly which one won.
//
// A test that only measures is a snapshot. It tells a grown-up how she did and
// does almost nothing for what she keeps. A test that is BUILT AS RETRIEVAL
// PRACTICE does both — the act of pulling an answer out of her own head is what
// makes it stick, far more than reading the lesson again. That effect has one of
// the most reliable evidence bases in learning research, and it is free: it
// costs nothing but arranging the questions differently.
//
// So every number in this file is set for retention first and record-keeping
// second. Where the two disagreed, retention won, and the reason is written next
// to the number so nobody later "tidies it up" and quietly removes it.
//
// ---- THE FOUR THINGS THAT ACTUALLY DRIVE RETENTION ----
//
// 1. RETRIEVAL — she recalls, rather than re-reads. Every lesson ends in a
//    check; every unit ends in a test; every day starts with a warm-up.
//
// 2. SPACING — the same fact comes back after 1 day, then 3, then 7, then 16,
//    then 35, then 70. Expanding gaps beat cramming by a wide margin, and the
//    gap is what does the work. See reviewIntervals below.
//
// 3. INTERLEAVING — a unit test is not only about that unit. Three of its ten
//    questions come from earlier units. Mixing feels harder in the moment and
//    is measurably better a month later. The quarterly test is cumulative for
//    the same reason.
//
// 4. ELABORATIVE FEEDBACK — every wrong choice gets its own sentence saying why
//    it is wrong, not a red X. A wrong answer she understands is worth more than
//    a right answer she guessed.
//
// ---- WHAT SHE SEES, AND WHAT IS RECORDED ----
//
// She sees a band: Got it / Nearly there / Let's go back. She does not see a
// percentage, because a nine-year-old who is a year behind in reading does not
// need a number to carry around.
//
// The Grown-Up Corner records the percentage, every question, every choice she
// picked, and which lesson each miss traces back to. That is the record a 4th
// grade transcript is built from. Nothing is softened in the record — only on
// her screen.
// ---------------------------------------------------------------------------

/**
 * THE WEEKS. Three lessons, then a review-and-test day.
 *
 * ---- WHAT HAPPENED TO UNITS (v3.8) ----
 *
 * There used to be a `UNITS` export here holding the thirteen Quarter 1 lessons
 * in four units, and a `UNIT_TEST` blueprint to go with it. Both are gone.
 *
 * The weekly test always replaced the unit test — that decision was made at
 * v3.6 and `check-assessment` has enforced it since, via the replacement rule:
 * no lesson may sit in both a WEEK and a UNIT. What that rule meant in practice
 * is that the migration could never be partial. Either every lesson lives in a
 * week or the build is red. So this is the atomic change that finishes it.
 *
 * The thirteen lessons were RE-HOMED, not deleted. Deleting them would have
 * taken the app from fourteen readable lessons to one in order to tidy a
 * screen. Their ids are unchanged — hb-1-01 through hb-1-13 — so every lesson
 * record, practice record and review box she already has survives untouched.
 * Only the four unit-test ids (hb-q1-u1..u4) are orphaned, and no unit test was
 * ever sat.
 *
 * ---- WHERE THEY WENT ----
 *
 * Into the eight-module Quarter 1 / Quarter 2 blueprint. Modules 2, 4, 6 and 8
 * are largely built out of lessons that already existed; Modules 1, 3, 5 and 7
 * are mostly new. See claude/herbalism-q1-q2-blueprint.md.
 *
 * ---- WHAT IS IN THIS EXPORT, AND WHAT IS NOT ----
 *
 * Only weeks with at least one WRITTEN lesson are registered here. WEEKS is the
 * set of things that can produce a test. The full sixteen-week plan — including
 * the nine weeks with nothing written yet — lives in curriculumPlan.js, because
 * a plan and a testable object are different things and conflating them is how
 * "130 planned against 288 needed" survived seventeen checks.
 *
 * `planned` is how many lessons the week will hold when it is finished.
 * `weekTestReady` below refuses the test until lessons.length === planned, so a
 * 2-of-3 week reads as in progress rather than as a broken test.
 *
 * Ids are `<course>-q<quarter>-w<week>` and they are also the test ids, so the
 * Gradebook, the re-take rule and the two-machine merge all keep working with
 * no new plumbing.
 *
 * TWO WEEKS ARE COMPLETE THE DAY THIS LANDS — q1-w7 and q2-w7, both built
 * entirely from lessons that already existed. Their weekly tests run
 * immediately, which is the first real proof of the Day-4 flow and it cost no
 * new lesson writing.
 */
export const WEEKS = {
  herbalism: [
    // ===================== QUARTER 1 =====================

    // MODULE 1 · The Plant Life Cycle
    { id: 'herbalism-q1-w1', course: 'herbalism', quarter: 1, n: 1, module: 1,
      title: 'Seeds',
      lessons: ['hb-m1-01', 'hb-m1-02', 'hb-1-09'], planned: 3,
      blurb: 'What a seed is made of, the circle it turns, and how seeds travel.' },

    { id: 'herbalism-q1-w2', course: 'herbalism', quarter: 1, n: 2, module: 1,
      title: 'Coming back, and coming up',
      lessons: ['hb-m1-04', 'hb-m1-05', 'hb-1-12'], planned: 3,
      blurb: 'Which herbs return, what a plant needs, and the first rule of the field.' },

    // MODULE 2 · Roots, Shoots and Soil
    { id: 'herbalism-q1-w3', course: 'herbalism', quarter: 1, n: 3, module: 2,
      title: 'Roots and what they do',
      lessons: ['hb-1-01', 'hb-1-02', 'hb-m2-03'], planned: 3,
      blurb: 'The parts of a plant, what roots do, and the Root Race.' },

    { id: 'herbalism-q1-w4', course: 'herbalism', quarter: 1, n: 4, module: 2,
      title: 'Stems, leaves and soil',
      lessons: ['hb-1-03', 'hb-1-04', 'hb-m2-06'], planned: 3,
      blurb: 'What holds a plant up, what makes its food, and what soil actually is.' },

    // MODULE 3 · The Garden Is an Ecosystem — S4L1a-d, the first Georgia elements taught
    { id: 'herbalism-q1-w5', course: 'herbalism', quarter: 1, n: 5, module: 3,
      title: 'Who eats what',
      lessons: ['hb-m3-01', 'hb-m3-02', 'hb-m3-03'], planned: 3,
      blurb: 'Producers, consumers and decomposers, and where the energy starts.' },

    { id: 'herbalism-q1-w6', course: 'herbalism', quarter: 1, n: 6, module: 3,
      title: 'The web, and what breaks it',
      lessons: ['hb-m3-04', 'hb-m3-05', 'hb-m3-06'], planned: 3,
      blurb: 'Her own food web, what follows when one thing changes, and the pollinators.' },

    // MODULE 4 · Adaptations and Protection
    { id: 'herbalism-q1-w7', course: 'herbalism', quarter: 1, n: 7, module: 4,
      title: 'Reading a leaf',
      lessons: ['hb-1-05', 'hb-1-06', 'hb-1-07'], planned: 3,
      blurb: 'Shape, edge, and how leaves sit on the stem.' },

    { id: 'herbalism-q1-w8', course: 'herbalism', quarter: 1, n: 8, module: 4,
      title: 'How plants defend themselves',
      lessons: ['hb-m4-04', 'hb-m4-05', 'hb-m4-06'], planned: 3,
      blurb: 'Thorns and fuzz, why herbs smell strong, and climbing for the light.' },

    // ===================== QUARTER 2 =====================

    // MODULE 5 · Water — S4E3a-b
    { id: 'herbalism-q2-w1', course: 'herbalism', quarter: 2, n: 1, module: 5,
      title: 'Where rain comes from',
      lessons: ['hb-m5-01', 'hb-m5-02', 'hb-m5-03'], planned: 3,
      blurb: 'The water cycle, a jar on the windowsill, and a bag on a living leaf.' },

    { id: 'herbalism-q2-w2', course: 'herbalism', quarter: 2, n: 2, module: 5,
      title: 'Water in the plant',
      lessons: ['hb-m5-04', 'hb-m5-05', 'hb-m5-06'], planned: 3,
      blurb: 'Root to top leaf, the Drainage Investigation, and reading a thirsty plant.' },

    // MODULE 6 · Pollination and Partnership
    { id: 'herbalism-q2-w3', course: 'herbalism', quarter: 2, n: 3, module: 6,
      title: 'What a flower is for',
      lessons: ['hb-1-08', 'hb-m6-02', 'hb-m6-03'], planned: 3,
      blurb: 'Why a flower exists, what is inside one, and who comes to visit.' },

    { id: 'herbalism-q2-w4', course: 'herbalism', quarter: 2, n: 4, module: 6,
      title: 'Partners',
      lessons: ['hb-m6-04', 'hb-m6-05', 'hb-m6-06'], planned: 3,
      blurb: 'A pollinator patch, fruit as a seed\'s ride, and the fungi under the soil.' },

    // MODULE 7 · Herbs in History
    { id: 'herbalism-q2-w5', course: 'herbalism', quarter: 2, n: 5, module: 7,
      title: 'Before the drugstore',
      lessons: ['hb-m7-01', 'hb-m7-02', 'hb-m7-03'], planned: 3,
      blurb: 'What people did before pharmacies, kitchen physic, and storing for winter.' },

    { id: 'herbalism-q2-w6', course: 'herbalism', quarter: 2, n: 6, module: 7,
      title: 'The knowledge that was carried',
      lessons: ['hb-m7-04', 'hb-m7-05', 'hb-m7-06'], planned: 3,
      blurb: 'The granny midwives and root doctors, the plants that crossed the ocean, and a flower press.' },

    // MODULE 8 · The Plant Detective
    { id: 'herbalism-q2-w7', course: 'herbalism', quarter: 2, n: 7, module: 8,
      title: 'Naming and keying',
      lessons: ['hb-1-10', 'hb-1-11', 'hb-1-13'], planned: 3,
      blurb: 'Plant families, keying out a specimen, and keeping a field journal.' },

    { id: 'herbalism-q2-w8', course: 'herbalism', quarter: 2, n: 8, module: 8,
      title: 'The plant detective',
      lessons: ['hb-m8-04', 'hb-m8-05', 'hb-m8-06'], planned: 3,
      blurb: 'The Solar Tea Lab, measuring change over time, and how you test a claim.' },

    // ===================== QUARTER 3 =====================
    { id: 'herbalism-q3-w1', course: 'herbalism', quarter: 3, n: 1, module: 9,
      title: 'Weather you can measure',
      lessons: ['hb-m9-01', 'hb-m9-02', 'hb-m9-03'], planned: 3,
      blurb: '' },
    { id: 'herbalism-q3-w2', course: 'herbalism', quarter: 3, n: 2, module: 9,
      title: 'Clouds and what they tell you',
      lessons: ['hb-m9-04', 'hb-m9-05', 'hb-m9-06'], planned: 3,
      blurb: '' },
    { id: 'herbalism-q3-w3', course: 'herbalism', quarter: 3, n: 3, module: 10,
      title: 'Reading the map',
      lessons: ['hb-m10-01', 'hb-m10-02', 'hb-m10-03'], planned: 3,
      blurb: '' },
    { id: 'herbalism-q3-w4', course: 'herbalism', quarter: 3, n: 4, module: 10,
      title: 'Weather is not climate',
      lessons: ['hb-m10-04', 'hb-m10-05', 'hb-m10-06'], planned: 3,
      blurb: '' },
    { id: 'herbalism-q3-w5', course: 'herbalism', quarter: 3, n: 5, module: 11,
      title: 'The bench and the balance',
      lessons: ['hb-m11-01', 'hb-m11-02', 'hb-m11-03'], planned: 3,
      blurb: '' },
    { id: 'herbalism-q3-w6', course: 'herbalism', quarter: 3, n: 6, module: 11,
      title: 'Extraction, spoilage and the label',
      lessons: ['hb-m11-04', 'hb-m11-05', 'hb-m11-06'], planned: 3,
      blurb: '' },
    { id: 'herbalism-q3-w7', course: 'herbalism', quarter: 3, n: 7, module: 12,
      title: 'Planning the season',
      lessons: ['hb-m12-01', 'hb-m12-02', 'hb-m12-03'], planned: 3,
      blurb: '' },
    { id: 'herbalism-q3-w8', course: 'herbalism', quarter: 3, n: 8, module: 12,
      title: 'Saving seed, closing the year',
      lessons: ['hb-m12-04', 'hb-m12-05', 'hb-m12-06'], planned: 3,
      blurb: '' },

    // ===================== QUARTER 4 =====================
    { id: 'herbalism-q4-w1', course: 'herbalism', quarter: 4, n: 1, module: 13,
      title: 'Why plants make chemicals',
      lessons: ['hb-m13-01', 'hb-m13-02', 'hb-m13-03'], planned: 3,
      blurb: '' },
    { id: 'herbalism-q4-w2', course: 'herbalism', quarter: 4, n: 2, module: 13,
      title: 'From a leaf to a pill',
      lessons: ['hb-m13-04', 'hb-m13-05', 'hb-m13-06'], planned: 3,
      blurb: '' },
    { id: 'herbalism-q4-w3', course: 'herbalism', quarter: 4, n: 3, module: 14,
      title: 'Evidence and the fair test',
      lessons: ['hb-m14-01', 'hb-m14-02', 'hb-m14-03'], planned: 3,
      blurb: '' },
    { id: 'herbalism-q4-w4', course: 'herbalism', quarter: 4, n: 4, module: 14,
      title: 'Placebo, labels and changing your mind',
      lessons: ['hb-m14-04', 'hb-m14-05', 'hb-m14-06'], planned: 3,
      blurb: '' },
    { id: 'herbalism-q4-w5', course: 'herbalism', quarter: 4, n: 5, module: 15,
      title: 'The first doctors',
      lessons: ['hb-m15-01', 'hb-m15-02', 'hb-m15-03'], planned: 3,
      blurb: '' },
    { id: 'herbalism-q4-w6', course: 'herbalism', quarter: 4, n: 6, module: 15,
      title: 'The science they did',
      lessons: ['hb-m15-04', 'hb-m15-05', 'hb-m15-06'], planned: 3,
      blurb: '' },
    { id: 'herbalism-q4-w7', course: 'herbalism', quarter: 4, n: 7, module: 16,
      title: 'Reading your own year back',
      lessons: ['hb-m16-01', 'hb-m16-02', 'hb-m16-03'], planned: 3,
      blurb: '' },
    { id: 'herbalism-q4-w8', course: 'herbalism', quarter: 4, n: 8, module: 16,
      title: 'The investigation, and the end',
      lessons: ['hb-m16-04', 'hb-m16-05', 'hb-m16-06'], planned: 3,
      blurb: '' }
  ],

  // =========================================================================
  // THE SCIENCE LAB — registered v3.25.
  //
  // Its six Module 1 lessons were written at v3.24 and WEEKS had exactly one
  // key, 'herbalism'. A course with no weeks cannot produce a test, cannot
  // interleave, and cannot open a quarter exam — so the six lessons existed
  // and Thursday could never ask her a single question about any of them.
  //
  // Same shape as Herbalism: three lessons Monday to Wednesday, then the
  // review game and the test on day 4. The block is half an hour rather than
  // three quarters, which changes the lesson length and nothing about the
  // week.
  //
  // Quarters 1 and 3 only — the 2:10 block is The Human Body in Q2 and Q4,
  // declared in curriculumPlan.js and enforced by check-curriculum-volume.
  // =========================================================================
  // ---- SOCIAL STUDIES · Quarters 1 to 3, TWO lessons a week (v3.34) ----
  //
  // Two lessons a week, not three, because this course shares the 2:45 block
  // with The Human Body — Mondays and Wednesdays. `planned: 2` is what makes
  // the weekly test five questions instead of eight and what stops the quarter
  // exam unlocking on a quarter that is not built.
  //
  // Weeks 3 to 8 of Quarter 1 are NOT registered here yet. A week with no
  // lessons in it is a week she could open and find empty, and check-delivery
  // asserts every registered week has its lessons. They arrive with their
  // modules.
  social: [
    {
      id: 'social-q1-w1',
      course: 'social',
      quarter: 1,
      n: 1,
      module: 1,
      title: 'The bill, and the people who refused',
      lessons: ['ss-m1-01', 'ss-m1-02'],
      planned: 2,
      blurb: 'Britain won a war it could not pay for, and the colonists who would not pay either.'
    },
    {
      id: 'social-q1-w2',
      course: 'social',
      quarter: 1,
      n: 2,
      module: 1,
      title: 'Sides, and the first shot',
      lessons: ['ss-m1-03', 'ss-m1-04'],
      planned: 2,
      blurb: 'Who chose which side — and the morning at Lexington when the arguing stopped.'
    },
    {
      id: 'social-q1-w3',
      course: 'social',
      quarter: 1,
      n: 3,
      module: 2,
      title: 'The paper, and how it was won',
      lessons: ['ss-m2-01', 'ss-m2-02'],
      planned: 2,
      blurb: 'The Declaration and the rights it claimed, then Saratoga and Yorktown.'
    },
    {
      id: 'social-q1-w4',
      course: 'social',
      quarter: 1,
      n: 4,
      module: 2,
      title: 'The ground, and the room',
      lessons: ['ss-m2-03', 'ss-m2-04'],
      planned: 2,
      blurb: 'How the land itself decided battles — and the summer they built a government.'
    },
    {
      id: 'social-q1-w5',
      course: 'social',
      quarter: 1,
      n: 5,
      module: 3,
      title: 'Two arguments that nearly broke it',
      lessons: ['ss-m3-01', 'ss-m3-02'],
      planned: 2,
      blurb: 'Big states against small states — and the compromise that counted people as fractions.'
    },
    {
      id: 'social-q1-w6',
      course: 'social',
      quarter: 1,
      n: 6,
      module: 3,
      title: 'Who agreed, and who decides',
      lessons: ['ss-m3-03', 'ss-m3-04'],
      planned: 2,
      blurb: 'What "We the People" meant in 1787, and why she elects somebody instead of voting on everything.'
    },
    {
      id: 'social-q1-w7',
      course: 'social',
      quarter: 1,
      n: 7,
      module: 4,
      title: 'Who holds what, and who stops whom',
      lessons: ['ss-m4-01', 'ss-m4-02'],
      planned: 2,
      blurb: 'Federal, state and shared powers — then three branches that each stop the other two.'
    },
    {
      id: 'social-q1-w8',
      course: 'social',
      quarter: 1,
      n: 8,
      module: 4,
      title: 'Limits, and five freedoms',
      lessons: ['ss-m4-03', 'ss-m4-04'],
      planned: 2,
      blurb: 'Ten amendments that bind the government, and the one sentence doing five jobs at once.'
    },
    {
      id: 'social-q2-w1',
      course: 'social',
      quarter: 2,
      n: 1,
      module: 5,
      title: 'A second war with Britain',
      lessons: ['ss-m5-01', 'ss-m5-02'],
      planned: 2,
      blurb: 'The year they burned the Capitol, and the song written while a fort was shelled.'
    },
    {
      id: 'social-q2-w2',
      course: 'social',
      quarter: 2,
      n: 2,
      module: 5,
      title: 'The country doubles',
      lessons: ['ss-m5-03', 'ss-m5-04'],
      planned: 2,
      blurb: 'A purchase that doubled the map, and the two men sent to find out what was on it.'
    },
    {
      id: 'social-q2-w3',
      course: 'social',
      quarter: 2,
      n: 3,
      module: 6,
      title: 'Going west',
      lessons: ['ss-m6-01', 'ss-m6-02'],
      planned: 2,
      blurb: 'The Shoshone woman the expedition needed, and the trails and gold that pulled families across.'
    },
    {
      id: 'social-q2-w4',
      course: 'social',
      quarter: 2,
      n: 4,
      module: 6,
      title: 'And what it cost',
      lessons: ['ss-m6-03', 'ss-m6-04'],
      planned: 2,
      blurb: 'Cherokee removal from Georgia, and a battle won that changed nothing about the reservations.'
    },
    {
      id: 'social-q2-w5',
      course: 'social',
      quarter: 2,
      n: 5,
      module: 7,
      title: 'The shape of the country',
      lessons: ['ss-m7-01', 'ss-m7-02'],
      planned: 2,
      blurb: 'Six features that shape everything, and the six places people chose to build.'
    },
    {
      id: 'social-q2-w6',
      course: 'social',
      quarter: 2,
      n: 6,
      module: 7,
      title: 'Barriers, gateways and choices',
      lessons: ['ss-m7-03', 'ss-m7-04'],
      planned: 2,
      blurb: 'What stopped people and what carried them — and the first real question of economics.'
    },
    {
      id: 'social-q2-w7',
      course: 'social',
      quarter: 2,
      n: 7,
      module: 8,
      title: 'Price, and the point of trading',
      lessons: ['ss-m8-01', 'ss-m8-02'],
      planned: 2,
      blurb: 'Why a farmer planted cotton, and how two people can both walk away better off.'
    },
    {
      id: 'social-q2-w8',
      course: 'social',
      quarter: 2,
      n: 8,
      module: 8,
      title: 'Four machines',
      lessons: ['ss-m8-03', 'ss-m8-04'],
      planned: 2,
      blurb: 'The gin, the steamboat, the locomotive and the telegraph — and what the gin did to slavery.'
    },
    {
      id: 'social-q3-w1',
      course: 'social',
      quarter: 3,
      n: 1,
      module: 9,
      title: 'Two who would not be quiet',
      lessons: ['ss-m9-01', 'ss-m9-02'],
      planned: 2,
      blurb: 'A man who taught himself to read, and a woman who went back nineteen times.'
    },
    {
      id: 'social-q3-w2',
      course: 'social',
      quarter: 3,
      n: 2,
      module: 9,
      title: 'The vote, a book and a raid',
      lessons: ['ss-m9-03', 'ss-m9-04'],
      planned: 2,
      blurb: 'Fifty years asking for the vote, then the novel and the raid that lit the fuse.'
    },
    {
      id: 'social-q3-w3',
      course: 'social',
      quarter: 3,
      n: 3,
      module: 10,
      title: 'The break, and the first shot',
      lessons: ['ss-m10-01', 'ss-m10-02'],
      planned: 2,
      blurb: 'What right the states were claiming, then Fort Sumter and the turning at Gettysburg.'
    },
    {
      id: 'social-q3-w4',
      course: 'social',
      quarter: 3,
      n: 4,
      module: 10,
      title: 'Through Georgia, and the two men in charge',
      lessons: ['ss-m10-03', 'ss-m10-04'],
      planned: 2,
      blurb: 'Atlanta and the March to the Sea, and the two presidents holding two things together.'
    },
    {
      id: 'social-q3-w5',
      course: 'social',
      quarter: 3,
      n: 5,
      module: 11,
      title: 'How it ended, and who it touched',
      lessons: ['ss-m11-01', 'ss-m11-02'],
      planned: 2,
      blurb: 'Four generals and a surrender in a parlour, then the people who never fought at all.'
    },
    {
      id: 'social-q3-w6',
      course: 'social',
      quarter: 3,
      n: 6,
      module: 11,
      title: 'Three promises',
      lessons: ['ss-m11-03', 'ss-m11-04'],
      planned: 2,
      blurb: 'The 13th, 14th and 15th Amendments, and the bureau asked to make them real.'
    },
    {
      id: 'social-q3-w7',
      course: 'social',
      quarter: 3,
      n: 7,
      module: 12,
      title: 'Taken back',
      lessons: ['ss-m12-01', 'ss-m12-02'],
      planned: 2,
      blurb: 'Slavery ended and the field did not change — and the vote was won and then removed.'
    },
    {
      id: 'social-q3-w8',
      course: 'social',
      quarter: 3,
      n: 8,
      module: 12,
      title: 'The laws, and how long they lasted',
      lessons: ['ss-m12-03', 'ss-m12-04'],
      planned: 2,
      blurb: 'Jim Crow written down, and the last lesson of the course: go and ask somebody.'
    }
  ],

  sciencelab: [
    // ===================== QUARTER 1 =====================

    // MODULE 1 · Push, Pull, and What Wins — S4P3a
    { id: 'sciencelab-q1-w1', course: 'sciencelab', quarter: 1, n: 1, module: 1,
      title: 'Naming the forces',
      lessons: ['sl-m1-01', 'sl-m1-02', 'sl-m1-03'], planned: 3,
      blurb: 'What a force is, what balanced means, and a tug of war she measures herself.' },

    { id: 'sciencelab-q1-w2', course: 'sciencelab', quarter: 1, n: 2, module: 1,
      title: 'What slows a thing down',
      lessons: ['sl-m1-04', 'sl-m1-05', 'sl-m1-06'], planned: 3,
      blurb: 'Friction, direction and speed, and the air pushing back on a parachute.' },

    // MODULE 2 · Gravity, and Which Way Is Down — S4P3b
    { id: 'sciencelab-q1-w3', course: 'sciencelab', quarter: 1, n: 3, module: 2,
      title: 'The pull that never stops',
      lessons: ['sl-m2-01', 'sl-m2-02', 'sl-m2-03'], planned: 3,
      blurb: 'What gravity is, why a stone and a pebble land together, and a root that finds down on its own.' },

    { id: 'sciencelab-q1-w4', course: 'sciencelab', quarter: 1, n: 4, module: 2,
      title: 'Mass, weight, and the moon',
      lessons: ['sl-m2-04', 'sl-m2-05', 'sl-m2-06'], planned: 3,
      blurb: 'Two words people mix up daily, what she would weigh on six worlds, and the argument Georgia asks her to build.' },

    // MODULE 3 · Six Simple Machines in the Garden Shed — S4P3c
    { id: 'sciencelab-q1-w5', course: 'sciencelab', quarter: 1, n: 5, module: 3,
      title: 'Lever, wheel, pulley',
      lessons: ['sl-m3-01', 'sl-m3-02', 'sl-m3-03'], planned: 3,
      blurb: 'The trowel under the pot, why the barrow beats dragging, and pulling down to lift up.' },

    { id: 'sciencelab-q1-w6', course: 'sciencelab', quarter: 1, n: 6, module: 3,
      title: 'Ramp, wedge, screw',
      lessons: ['sl-m3-04', 'sl-m3-05', 'sl-m3-06'], planned: 3,
      blurb: 'The plank to the raised bed, the spade going into the soil, and the ramp wound round a rod.' },

    // MODULE 4 · Light, and What It Meets — S4P1a · S4P1b · S4P1c
    { id: 'sciencelab-q1-w7', course: 'sciencelab', quarter: 1, n: 7, module: 4,
      title: 'What light meets, and how it travels',
      lessons: ['sl-m4-01', 'sl-m4-02', 'sl-m4-03'], planned: 3,
      blurb: 'Transparent, translucent and opaque; the shadow an opaque thing throws; and light going in straight lines.' },

    { id: 'sciencelab-q1-w8', course: 'sciencelab', quarter: 1, n: 8, module: 4,
      title: 'Bouncing and bending',
      lessons: ['sl-m4-04', 'sl-m4-05', 'sl-m4-06'], planned: 3,
      blurb: 'The mirror and the angle, the pencil that is not really broken, and a water drop working as a lens.' },

    // ===================== QUARTER 3 =====================
    //
    // The 2:10 block is The Human Body in Q2, so The Science Lab picks up again
    // in January. Same shape: three lessons Monday to Wednesday, the review game
    // and the test on day 4.

    // MODULE 5 · Sound in the Greenhouse — S4P2a · S4P2b
    { id: 'sciencelab-q3-w1', course: 'sciencelab', quarter: 3, n: 1, module: 5,
      title: 'What a sound is',
      lessons: ['sl-m5-01', 'sl-m5-02', 'sl-m5-03'], planned: 3,
      blurb: 'Something has to shake; how hard it shakes makes it loud; how fast it shakes makes it high.' },

    { id: 'sciencelab-q3-w2', course: 'sciencelab', quarter: 3, n: 2, module: 5,
      title: 'Carrying a sound',
      lessons: ['sl-m5-04', 'sl-m5-05', 'sl-m5-06'], planned: 3,
      blurb: 'Sound needs a road, a hollow box makes it louder, and a tight string carries a message across the garden.' },

    // MODULE 6 · The Sun and the Stars — S4E1a · S4E1b · S4E1c
    { id: 'sciencelab-q3-w3', course: 'sciencelab', quarter: 3, n: 3, module: 6,
      title: 'The sun, and how bright a star looks',
      lessons: ['sl-m6-01', 'sl-m6-02', 'sl-m6-03'], planned: 3,
      blurb: 'The sun is a star; distance makes a star faint; and size does too, so looking alone cannot tell her which.' },

    { id: 'sciencelab-q3-w4', course: 'sciencelab', quarter: 3, n: 4, module: 6,
      title: 'Stars, planets and the telescope',
      lessons: ['sl-m6-04', 'sl-m6-05', 'sl-m6-06'], planned: 3,
      blurb: 'One makes light and one borrows it, how to spot a planet from the back step, and four dots beside Jupiter.' },

    // MODULE 7 · The Solar System, and What a Model Gets Wrong — S4E1d · S4E1a
    { id: 'sciencelab-q3-w5', course: 'sciencelab', quarter: 3, n: 5, module: 7,
      title: 'Eight worlds, and a model of size',
      lessons: ['sl-m7-01', 'sl-m7-02', 'sl-m7-03'], planned: 3,
      blurb: 'The order, the split between rock and gas, and a size model built on the kitchen bench.' },

    { id: 'sciencelab-q3-w6', course: 'sciencelab', quarter: 3, n: 6, module: 7,
      title: 'Distance, limits, and better tools',
      lessons: ['sl-m7-04', 'sl-m7-05', 'sl-m7-06'], planned: 3,
      blurb: 'A distance model walked down the garden, why it cannot agree with the size model, and seeing from above the air.' },

    // MODULE 8 · The Moon, the Day and the Year — S4E2a · S4E2b · S4E2c
    { id: 'sciencelab-q3-w7', course: 'sciencelab', quarter: 3, n: 7, module: 8,
      title: 'The day, the month, and the changing moon',
      lessons: ['sl-m8-01', 'sl-m8-02', 'sl-m8-03'], planned: 3,
      blurb: 'A shadow clock, the moon log opened for a month, and why the moon changes shape without changing at all.' },

    { id: 'sciencelab-q3-w8', course: 'sciencelab', quarter: 3, n: 8, module: 8,
      title: 'Naming the phases, and the tilt',
      lessons: ['sl-m8-04', 'sl-m8-05', 'sl-m8-06'], planned: 3,
      blurb: 'Her own month labelled, why the days grow and shrink, and the tilt behind every frost date on a seed packet.' }
  ],

  // =========================================================================
  // THE HUMAN BODY — Tuesdays and Thursdays, all four quarters.
  //
  // TWO lessons a week, not three. That is what makes a module a fortnight
  // here and six lessons long in Herbalism — the week shape is per course and
  // has been since v3.22, and `planned: 2` is what check-assessment reads to
  // build a FIVE-question Thursday paper instead of an eight-question one.
  //
  // At v3.34 the engine used the global eight for every course, so a two-lesson
  // week would have handed a nine-year-old an eight-question test drawn from
  // two lessons. A rule enforced on the number in the config and not on the
  // paper the child is handed is half a rule.
  //
  // Modules 2–16 register their weeks as they are written. Registering a week
  // with no lessons behind it would be worse than leaving it out: the quarter
  // exam counts built weeks, and unwritten is not finished.
  // =========================================================================
  humanbody: [
    // MODULE 1 · What a Doctor Does First — no Georgia element, enrichment
    { id: 'humanbody-q1-w1', course: 'humanbody', quarter: 1, n: 1, module: 1,
      title: 'Looking, and the heart underneath',
      lessons: ['body-m1-01', 'body-m1-02'], planned: 2,
      blurb: 'What a doctor does before touching anybody, and finding the pulse in her own wrist.' },

    { id: 'humanbody-q1-w2', course: 'humanbody', quarter: 1, n: 2, module: 1,
      title: 'Counting it, and making it change',
      lessons: ['body-m1-03', 'body-m1-04'], planned: 2,
      blurb: 'Fifteen seconds times four, then running on the spot and watching four numbers come back down.' },

    // MODULE 2 · Skin, the Cover
    { id: 'humanbody-q1-w3', course: 'humanbody', quarter: 1, n: 3, module: 2,
      title: 'The wall, and the thermostat',
      lessons: ['body-m2-01', 'body-m2-02'], planned: 2,
      blurb: 'Skin as the largest organ she owns, and the two opposite ways it holds her temperature steady.' },

    { id: 'humanbody-q1-w4', course: 'humanbody', quarter: 1, n: 4, module: 2,
      title: 'Repair, and a wrong idea',
      lessons: ['body-m2-03', 'body-m2-04'], planned: 2,
      blurb: 'Reading the four stages of a healed cut, and the bath-wrinkle explanation that everybody believed until somebody tested it.' },

    // MODULE 3 · Bones, the Frame — carries BOTH measurement floors
    { id: 'humanbody-q1-w5', course: 'humanbody', quarter: 1, n: 5, module: 3,
      title: 'The frame, and what is inside it',
      lessons: ['body-m3-01', 'body-m3-02'], planned: 2,
      blurb: 'Height and arm span in two units, then her own hand on squared paper for area and perimeter.' },

    { id: 'humanbody-q1-w6', course: 'humanbody', quarter: 1, n: 6, module: 3,
      title: 'Joints, and mending',
      lessons: ['body-m3-03', 'body-m3-04'], planned: 2,
      blurb: 'A survey of seven of her own joints, and why a cast is a clamp rather than a cure.' },

    // MODULE 4 · Muscles, the Pull
    { id: 'humanbody-q1-w7', course: 'humanbody', quarter: 1, n: 7, module: 4,
      title: 'Only pulling, so always in pairs',
      lessons: ['body-m4-01', 'body-m4-02'], planned: 2,
      blurb: 'The one fact the body runs on — a muscle can only get shorter — and the pair of muscles every joint needs because of it.' },

    { id: 'humanbody-q1-w8', course: 'humanbody', quarter: 1, n: 8, module: 4,
      title: 'The route, and the reflex',
      lessons: ['body-m4-03', 'body-m4-04'], planned: 2,
      blurb: 'Brain, nerve, muscle in order — then the dropped ruler, which measures elapsed time on her own hand.' },

    // ===================== QUARTER 2 =====================

    // MODULE 5 · The Heart, a Pump
    { id: 'humanbody-q2-w1', course: 'humanbody', quarter: 2, n: 1, module: 5,
      title: 'Inside the pump',
      lessons: ['body-m5-01', 'body-m5-02'], planned: 2,
      blurb: 'Four rooms, one-way valves, and the two trips blood makes — the short one to the lungs and the long one everywhere else.' },

    { id: 'humanbody-q2-w2', course: 'humanbody', quarter: 2, n: 2, module: 5,
      title: 'A hundred thousand beats, and two readings',
      lessons: ['body-m5-03', 'body-m5-04'], planned: 2,
      blurb: 'The arithmetic of one day of heartbeats, then resting and working pulse read as one finding rather than two numbers.' },

    // MODULE 6 · Blood, and What It Carries
    { id: 'humanbody-q2-w3', course: 'humanbody', quarter: 2, n: 3, module: 6,
      title: 'What blood is, and the pipes it runs in',
      lessons: ['body-m6-01', 'body-m6-02'], planned: 2,
      blurb: 'Plasma and three kinds of part with three jobs, then arteries, veins and the tiny pipes where the delivery happens.' },

    { id: 'humanbody-q2-w4', course: 'humanbody', quarter: 2, n: 4, module: 6,
      title: 'Eighty thousand kilometres, and the cuff',
      lessons: ['body-m6-03', 'body-m6-04'], planned: 2,
      blurb: 'The scale of her own plumbing, and what the band on an arm is actually measuring when a doctor pumps it up.' },

    // MODULE 7 · The Lungs
    { id: 'humanbody-q2-w5', course: 'humanbody', quarter: 2, n: 5, module: 7,
      title: 'Two lungs, and what moves them',
      lessons: ['body-m7-01', 'body-m7-02'], planned: 2,
      blurb: 'The branching tree of air pipes, and the discovery that lungs have no muscle — the diaphragm does all the work.' },

    { id: 'humanbody-q2-w6', course: 'humanbody', quarter: 2, n: 6, module: 7,
      title: 'Counting breaths, measuring one',
      lessons: ['body-m7-03', 'body-m7-04'], planned: 2,
      blurb: 'Why counting your own breathing changes it, and one breath measured in millilitres with a marked bottle.' },

    // MODULE 8 · Listening to a Chest
    { id: 'humanbody-q2-w7', course: 'humanbody', quarter: 2, n: 7, module: 8,
      title: 'The instrument, and the two sounds',
      lessons: ['body-m8-01', 'body-m8-02'], planned: 2,
      blurb: 'Why a stethoscope needs no batteries, and what the lub and the dub of a heartbeat actually are.' },

    { id: 'humanbody-q2-w8', course: 'humanbody', quarter: 2, n: 8, module: 8,
      title: 'Lungs, spots, and what listening is for',
      lessons: ['body-m8-03', 'body-m8-04'], planned: 2,
      blurb: 'Mapping six listening spots on a real chest, then repeating Module 1 with three measurements instead of one.' },

    // MODULE 9 · The Mouth and the Stomach
    { id: 'humanbody-q3-w1', course: 'humanbody', quarter: 3, n: 1, module: 9,
      title: 'Teeth are tools',
      lessons: ['body-m9-01', 'body-m9-02'], planned: 2,
      blurb: 'Three shapes of tooth for three different jobs, and the discovery that most of a tooth is buried in the jaw.' },

    { id: 'humanbody-q3-w2', course: 'humanbody', quarter: 3, n: 2, module: 9,
      title: 'Where digestion actually starts',
      lessons: ['body-m9-03', 'body-m9-04'], planned: 2,
      blurb: 'A plain cracker timed until it turns sweet, then the stomach modelled as a bag that squeezes.' },

    // MODULE 10 · The Gut, a Long Tube
    { id: 'humanbody-q3-w3', course: 'humanbody', quarter: 3, n: 3, module: 10,
      title: 'One tube, and seven metres of it',
      lessons: ['body-m10-01', 'body-m10-02'], planned: 2,
      blurb: 'The gut as one connected tube pushed by muscle waves, then seven metres of string measured out and walked beside.' },

    { id: 'humanbody-q3-w4', course: 'humanbody', quarter: 3, n: 4, module: 10,
      title: 'Folded to catch, and what lives there',
      lessons: ['body-m10-03', 'body-m10-04'], planned: 2,
      blurb: 'Why a folded lining catches more than a smooth one, worked out in area and perimeter, and the useful passengers in the last stretch.' },

    // MODULE 11 · The Kidneys and Water
    { id: 'humanbody-q3-w5', course: 'humanbody', quarter: 3, n: 5, module: 11,
      title: 'Two filters, and how a filter works',
      lessons: ['body-m11-01', 'body-m11-02'], planned: 2,
      blurb: 'Two fist-sized kidneys found by pressing on her own back, then a real filter built from a bottle and measured in millilitres both ways.' },

    { id: 'humanbody-q3-w6', course: 'humanbody', quarter: 3, n: 6, module: 11,
      title: 'Two ways water leaves',
      lessons: ['body-m11-03', 'body-m11-04'], planned: 2,
      blurb: 'Waste travelling out dissolved in water and waiting in a stretchy bag, then the discovery that a wet hand only cools once it starts to dry.' },

    // MODULE 12 · The Brain and the Nerves
    { id: 'humanbody-q3-w7', course: 'humanbody', quarter: 3, n: 7, module: 12,
      title: 'The brain, and the wires that reach it',
      lessons: ['body-m12-01', 'body-m12-02'], planned: 2,
      blurb: 'Twelve hundred millilitres held in both hands, then a real bedside test done in millimetres on four patches of her own skin.' },

    { id: 'humanbody-q3-w8', course: 'humanbody', quarter: 3, n: 8, module: 12,
      title: 'Faster than thinking, and sometimes wrong',
      lessons: ['body-m12-03', 'body-m12-04'], planned: 2,
      blurb: 'Why a reflex beats a decision every time, and the reason a doctor always asks exactly where it hurts.' },

    // ===================== QUARTER 4 =====================

    // MODULE 13 · Eyes and Ears
    { id: 'humanbody-q4-w1', course: 'humanbody', quarter: 4, n: 1, module: 13,
      title: 'What a sense does, and the hole in the picture',
      lessons: ['body-m13-01', 'body-m13-02'], planned: 2,
      blurb: 'Every sense turning the world into one kind of message, then her own blind spot found with a card and measured in centimetres.' },

    { id: 'humanbody-q4-w2', course: 'humanbody', quarter: 4, n: 2, module: 13,
      title: 'A drum, a chain, and what keeps her upright',
      lessons: ['body-m13-03', 'body-m13-04'], planned: 2,
      blurb: 'Rice dancing on a stretched skin, the three smallest bones she owns, and the discovery that balance is an ear job.' },

    // MODULE 14 · Growing
    { id: 'humanbody-q4-w3', course: 'humanbody', quarter: 4, n: 3, module: 14,
      title: 'Cells, and where a bone gets longer',
      lessons: ['body-m14-01', 'body-m14-02'], planned: 2,
      blurb: 'One bean becoming two and two becoming four, then a single dated pencil mark on a doorframe — hers alone, compared with nobody.' },

    { id: 'humanbody-q4-w4', course: 'humanbody', quarter: 4, n: 4, module: 14,
      title: 'Why growing stops, and what never does',
      lessons: ['body-m14-03', 'body-m14-04'], planned: 2,
      blurb: 'There is no right height and no right speed, and fourteen days of a fingernail measured in millimetres becomes her first line graph.' },

    // MODULE 15 · Staying Well
    { id: 'humanbody-q4-w5', course: 'humanbody', quarter: 4, n: 5, module: 15,
      title: 'Germs, soap, and the walls she already has',
      lessons: ['body-m15-01', 'body-m15-02'], planned: 2,
      blurb: 'A real controlled experiment on her own two hands with oil, pepper and a timer, and every defence traced back to an earlier module.' },

    { id: 'humanbody-q4-w6', course: 'humanbody', quarter: 4, n: 6, module: 15,
      title: 'Fever, and what sleep is for',
      lessons: ['body-m15-03', 'body-m15-04'], planned: 2,
      blurb: 'A fever explained as something the body does on purpose — and a grown-up still decides — then a week of her own body clock, counted across midnight.' },

    // MODULE 16 · Black Women in Medicine
    { id: 'humanbody-q4-w7', course: 'humanbody', quarter: 4, n: 7, module: 16,
      title: 'Dr. Crumpler, and Dr. Bath',
      lessons: ['body-m16-01', 'body-m16-02'], planned: 2,
      blurb: 'The first Black woman doctor in America in 1864, and the woman who invented the laser that removes a cloudy lens — on a timeline she measures herself.' },

    { id: 'humanbody-q4-w8', course: 'humanbody', quarter: 4, n: 8, module: 16,
      title: 'Dr. Canady, Dr. Jemison, and her own notebook',
      lessons: ['body-m16-03', 'body-m16-04'], planned: 2,
      blurb: 'The first Black woman neurosurgeon, the first Black woman in space — and the last thing the course asks her for is a question she still has.' }
  ]
};

export function allWeeks() {
  return Object.values(WEEKS).flat();
}

export function weekById(id) {
  return allWeeks().find((w) => w.id === id) || null;
}

export function weekForLesson(lessonId) {
  return allWeeks().find((w) => w.lessons.includes(lessonId)) || null;
}

/** Every week taught before this one, in the same course. The interleaving pool. */
export function weeksBefore(weekId) {
  const w = weekById(weekId);
  if (!w) return [];
  return allWeeks().filter(
    (x) => x.course === w.course && (x.quarter < w.quarter || (x.quarter === w.quarter && x.n < w.n))
  );
}

/** A week is ready to test when every lesson it PLANS has been written and read. */
export function weekTestReady(week, lessonsRead) {
  if (week.lessons.length < week.planned) {
    return {
      ready: false,
      reason: `${week.lessons.length} of ${week.planned} lessons written. The rest of this week is still being built.`,
      missing: []
    };
  }
  const missing = week.lessons.filter((l) => !lessonsRead.includes(l));
  return {
    ready: missing.length === 0,
    reason: missing.length ? 'Read the lessons above first.' : null,
    missing
  };
}

// ---------------------------------------------------------------------------
// TEST BLUEPRINTS
// ---------------------------------------------------------------------------

/**
 * THE WEEKLY TEST — eight questions, six from this week and two from earlier.
 *
 * This REPLACES the unit test for every course built to the week shape. It does
 * not sit alongside it. A unit test over three or four lessons and a weekly test
 * over three lessons are the same test with two names, and running both would
 * double her testing to buy nothing.
 *
 * ---- WHY A WEEK AND NOT A UNIT ----
 *
 * The unit was a curriculum idea. The week is a thing a nine-year-old can feel.
 * Unit boundaries landed on a Tuesday, then a Thursday, then a Monday, and there
 * was no rhythm in the app at all — which is most of what "it feels all over the
 * place" actually was.
 *
 * It also shortens the gap between learning something and being asked about it
 * from three or four lessons to at most three days, which is exactly the window
 * the expanding review schedule is built to exploit.
 *
 * ---- WHY EIGHT AND NOT TEN ----
 *
 * The unit test was ten because it covered three or four lessons. This covers
 * three, every single week, thirty-two times a year. Ten questions weekly is a
 * child who dreads Thursday. Eight keeps the same 3-in-10 interleaving
 * proportion (2 of 8) at a length she will still sit down for in April.
 */
export const WEEKLY_TEST = {
  total: 8,
  fromThisWeek: 6,
  fromEarlierWeeks: 2,
  minutes: 12
};

/**
 * THE REVIEW DAY. Day 4 of every week.
 *
 * Not a lesson. A review game she cannot fail, then the weekly test. The game
 * comes FIRST on purpose — retrieval practice before the graded retrieval is
 * the single cheapest thing that improves a test score, and it costs ten
 * minutes she was going to spend anyway.
 */
export const REVIEW_DAY = {
  day: 4,
  gameMinutes: 10,
  testMinutes: WEEKLY_TEST.minutes,
  /** Petals for sitting it. Never for the score. Same rule as every other test. */
  scored: true
};

/**
 * A quarterly test: twenty-four questions, cumulative across the whole year so
 * far — not just the quarter that has just ended.
 *
 * Half from this quarter, half from everything before it. In Quarter 1 there is
 * nothing before it, so all twenty-four come from Q1 and the split is a no-op.
 * From Quarter 2 onward it is what stops the year becoming four unrelated
 * quarters she forgets in turn.
 *
 * Twenty-four is long for her. It may be taken over two days; the app saves
 * after every question and offers to stop at the halfway mark.
 */
/**
 * THE CATCH-UP DAY. Day 5 of every week — Friday.
 *
 * No new lesson and no new test. It exists so that falling behind has a landing
 * place instead of becoming a quiet debt she never clears.
 *
 * What opens here: any lesson from this week she has not read, any weekly test
 * she has not sat, and any project that is due. If she is fully caught up it
 * says so and the day is hers.
 *
 * It is NOT scored and it earns Petals the same way everything else does — for
 * doing it. A make-up day that costs her something is a make-up day she avoids.
 */
export const CATCH_UP_DAY = {
  day: 5,
  scored: false,
  /** Nothing new is taught on a catch-up day. Guarded by check-assessment. */
  newLessons: 0
};

export const QUARTER_TEST = {
  total: 24,
  fromThisQuarterShare: 0.5,
  minutes: 35,
  restAfter: 12
};

// ---------------------------------------------------------------------------
// MASTERY BANDS
// ---------------------------------------------------------------------------

/**
 * Three bands, not a percentage, and not a letter grade.
 *
 * 70% is the line for "go back". On ten four-choice questions, pure guessing
 * scores 25%, so 70% is comfortably above chance and genuinely means she knows
 * most of it. Below that, more lessons on top of a shaky floor is how a child
 * ends up quietly lost.
 */
export const BANDS = [
  {
    id: 'got-it',
    min: 0.9,
    label: 'Got it',
    icon: '✓',
    tone: 'sage',
    child: 'You have this. Every bit of it.',
    grownUp: 'Secure. Move on.'
  },
  {
    id: 'nearly',
    min: 0.7,
    label: 'Nearly there',
    icon: '~',
    tone: 'gold',
    child: 'Almost all of it. A couple of bits will come back to you in your warm-ups.',
    grownUp: 'Sound enough to move on. The missed items are queued for spaced review.'
  },
  {
    id: 'go-back',
    min: 0,
    label: "Let's go back",
    icon: '↩',
    tone: 'clay',
    child: 'Some of this has not stuck yet. That is what going back is for.',
    grownUp: 'Re-read the listed lessons, then re-take. Not the same day — see RETAKE.'
  }
];

export function bandFor(fraction) {
  return BANDS.find((b) => fraction >= b.min) || BANDS[BANDS.length - 1];
}

/**
 * RE-TAKES — allowed, and deliberately not allowed the same day.
 *
 * This is the one rule in the file that will look unkind and is not. Re-taking
 * a test twenty minutes after failing it measures what is still echoing in
 * short-term memory. She would pass, nothing would have been learned, and the
 * record would say she knew it. Two days later, after re-reading, a pass means
 * she actually kept it.
 *
 * Both attempts stay in the record. The report card uses the later one and says
 * it was a second attempt — honest, and she still gets the win.
 */
export const RETAKE = {
  minDaysBetween: 2,
  maxAttempts: 3,
  // A re-take must not be the same ten questions. The bank is large enough that
  // a second form overlaps the first as little as this allows.
  maxRepeatedQuestions: 3
};

// ---------------------------------------------------------------------------
// SPACED REVIEW — the biggest lever in this whole file
// ---------------------------------------------------------------------------

/**
 * Expanding intervals, in days. A Leitner box scheme.
 *
 * Answer a question right and it moves up a box, so it comes back later. Get it
 * wrong and it drops to box 0 and comes back tomorrow. Six boxes:
 *
 *   box 0 → 1 day     (new, or just missed)
 *   box 1 → 3 days
 *   box 2 → 7 days
 *   box 3 → 16 days
 *   box 4 → 35 days
 *   box 5 → 70 days   (as good as known; still checked twice more in a year)
 *
 * The gaps roughly double. That specific shape — expanding rather than fixed —
 * is what turns "she knew it last week" into "she knows it". A fact answered
 * correctly at 1, 3, 7, 16, 35 and 70 days has been retrieved six times across
 * four months, which is a completely different thing from six times in one week.
 *
 * Nothing here is a deadline. An item that comes due while she is on holiday
 * simply waits.
 */
export const REVIEW_INTERVALS = [1, 3, 7, 16, 35, 70];
export const MAX_BOX = REVIEW_INTERVALS.length - 1;

/**
 * The daily warm-up: three questions, about two minutes, before the Herbalism
 * block.
 *
 * Three, not ten. This has to survive contact with a real Tuesday. A warm-up
 * she does every single day at three questions beats one she abandons in week
 * three at ten. Consistency over volume — the same rule as the rest of her day.
 *
 * The warm-up is NOT graded and NOT recorded as a score. It feeds the review
 * boxes and nothing else. The moment it counts for something it stops being
 * practice and starts being a small test every morning, which is how a child
 * learns to dread mornings.
 */
export const WARM_UP = {
  questions: 3,
  minutes: 2,
  // Immediate feedback here, on purpose. Warm-ups are practice, and practice
  // without feedback rehearses the mistake. Tests are different — see below.
  immediateFeedback: true,
  // Two goes at a warm-up question. The second attempt after a near-miss is
  // itself a retrieval, and it costs nothing.
  attempts: 2
};

// ---------------------------------------------------------------------------
// THE RETRIEVE BEAT — THE FIRST THING IN A LESSON IS A LOOK BACK
// ---------------------------------------------------------------------------

/**
 * §3.2's beat ladder opens with `retrieve`, not `teach`:
 *
 *   retrieve → teach → check → teach → check → practice → apply → test
 *
 * ---- WHY THIS IS THE FIRST THING BUILT OUT OF BATCH C ----
 *
 * Gigi, Aug 19, on being offered beat TIMING instead of beat TYPES: *"Isn't
 * this the beat that will assist with retention and learning? I don't want any
 * short cuts. I want my grandbaby to learn and improve."* She was right.
 * `beat.entered`/`beat.completed` measures her. The beat ladder teaches her.
 *
 * Retrieval before teaching is the strongest retention lever in the standard.
 * Pulling a thing back out of memory is what makes it stick — reading it again
 * is not, and feels more productive than it is.
 *
 * ---- WHAT WAS ALREADY THERE, AND WHY IT WAS NOT ENOUGH ----
 *
 * The morning warm-up already does spaced retrieval and does it well. But it
 * happens on a DIFFERENT SCREEN, disconnected from the lesson it feeds. This
 * beat is the doorway INTO the lesson: it pulls back the material this lesson
 * is about to build on, seconds before it builds on it.
 *
 * ---- THE NUMBERS, AND THEY ARE GIGI'S (rule 17) ----
 *
 * TWO, not the warm-up's three. She already answers three every morning. Three
 * more before every lesson is six questions a day put to her before she has
 * been taught anything, and a doorway that long stops being a doorway. Two
 * keeps it short enough to walk through.
 *
 * THE WAY BACK: change `questions` here. It is one number in one place, and
 * nothing else reads a literal.
 *
 * ---- WHAT IT MUST NEVER BE ----
 *
 * NOT BLOCKING and NOT GRADED. She may get both wrong and walk straight into
 * the lesson — that is not a failure, it is the app finding out what to teach.
 * A gate here would turn "what do you remember?" into "prove you deserve the
 * lesson", which is how a child learns to dread the first screen.
 *
 * It IS recorded, as `review` evidence, and it moves the Leitner boxes exactly
 * as the warm-up does. So the screen may not tell her nothing is written down —
 * v3.56 fixed that lie once already, and check-delivery fails the build on it.
 */
export const LESSON_RETRIEVE = {
  questions: 2,
  // Immediate feedback, for the warm-up's reason: practice without feedback
  // rehearses the mistake.
  immediateFeedback: true,
  attempts: 2,
  // A gate on the child, which this is not. See the header.
  blocking: false,
  // Below this, render NOTHING. A one-question "look back" on the first lesson
  // of a course is an app performing a routine rather than doing anything —
  // and v3.59's rule stands: when there is nothing to say, say nothing.
  minimumPool: 2,
  // Only lessons she has already read IN THIS COURSE. §3.6's
  // poolScope:"taughtSkillsOnly" is already app-wide; narrowing to the course
  // is what makes this a RETRIEVE beat rather than a second warm-up.
  scope: 'course'
};

// ---------------------------------------------------------------------------
// THE PRACTICE GATE
// ---------------------------------------------------------------------------

/**
 * Before a lesson counts as finished, she has to show she got it.
 *
 * ---- WHY THIS EXISTS ----
 *
 * Taken from her brother's app, which has had it for months and which this one
 * did not. In Mission Control a student below 80% on practice does not reach
 * the test — the generator serves her MORE REAL PRACTICE instead, capped at
 * twice the original target so nobody is ever trapped with no way forward.
 *
 * Without it, a child who has understood nothing can press "I have finished
 * this lesson" and walk straight into the unit test. The lesson check questions
 * existed here from the start and were purely decorative: she could miss every
 * one and the app would still record the lesson as read.
 *
 * ---- WHY THE EXTRA PRACTICE COMES FROM THE TEST BANK ----
 *
 * Because it is the only pool of questions about that lesson that is big
 * enough. Five per lesson, with per-choice feedback already written. Those are
 * bank items with stable ids, so an extra-practice answer moves the spaced
 * review boxes like any other — and, importantly, is then excluded from any
 * test she sits the same day by the same guard that stops her morning warm-up
 * leaking into the afternoon.
 *
 * ---- WHY 80% IS NOT APPLIED AS A PERCENTAGE HERE ----
 *
 * A lesson check is two or three questions. "80% of 3" is 2.4, and any
 * percentage over a sample that small is noise dressed as a measurement. So the
 * rule is stated in whole questions instead: MISS MORE THAN ONE and you get
 * more practice. On a 3-question check that is the same 2-of-3 bar his 80%
 * produces, without pretending to a precision three questions cannot support.
 */
export const PRACTICE_GATE = {
  /** More than this many misses on the lesson check triggers extra practice. */
  maxMisses: 1,
  /** Hard ceiling on extra questions served, as a multiple of the check length.
   *  Two, the same as his — a struggling child must always see the end of it. */
  extraMultiple: 2,
  /** She can always finish the lesson. The gate serves practice; it never locks
   *  a door. A nine-year-old stuck behind a wall she cannot pass stops opening
   *  the app, and then nothing else in here matters. */
  blocking: false
};

/**
 * Did this lesson's check clear the gate?
 * `results` is [{correct}] — the lesson's own check questions.
 */
export function practiceGateResult(results) {
  const asked = (results || []).length;
  const correct = (results || []).filter((r) => r.correct).length;
  const missed = asked - correct;
  return {
    asked,
    correct,
    missed,
    passed: asked === 0 ? true : missed <= PRACTICE_GATE.maxMisses,
    /** How many extra questions she may be served, at most. */
    extraAllowed: Math.max(0, asked * PRACTICE_GATE.extraMultiple)
  };
}

// ---------------------------------------------------------------------------
// THE SCORED LESSON TEST — Gigi's decision, Aug 18 2026
// ---------------------------------------------------------------------------

/**
 * SIX PRACTICE QUESTIONS INSIDE THE LESSON, FOUR SCORED AT THE END.
 *
 * ---- WHY THIS EXISTS ----
 *
 * Gigi, Aug 18 2026: "I believe Azianna isn't doing the work in her lessons. I
 * want their to be practice questions in the lessons and scored questions that
 * she can't immediately retake unless unlocked by parent."
 *
 * She was right, and this file said so twenty lines up: the lesson check
 * questions "were purely decorative: she could miss every one and the app would
 * still record the lesson as read." The practice gate fixed half of that in
 * v3.3 by serving more practice. It never fixed the other half — NOTHING IN A
 * LESSON HAS EVER ENTERED HER RECORD. A lesson she slept through and a lesson
 * she aced looked identical, because only Thursday's weekly test was scored.
 *
 * ---- WHAT GIGI CHOSE, IN HER OWN WORDS ----
 *
 * The counts, Aug 18: "For a 9-year-old at a 2nd-grade level, keep lessons
 * short. Include 5 to 8 low-stakes practice questions during the lesson for
 * immediate feedback... Follow this with 3 to 5 scored assessment questions to
 * check for retention without causing fatigue or frustration." She then chose
 * SIX and FOUR out of the ten each lesson already owns.
 *
 * Practice: "Mix them into the lesson content. Do not group them all at the
 * end. Give help right away if the child makes a mistake."
 * Scored: "Place them at the very end." No hints.
 *
 * On timing she said to ignore the 5-7 minute ceiling I had proposed, so a
 * lesson runs as long as it runs. NOTHING CHECKS THE INTERNAL MINUTE SPLIT —
 * check-schedule guards the DAY's blocks, not a lesson's shape — so that
 * instruction costs nothing here. The §10.2 table in the master plan is
 * documentation, and it is marked rather than left to go stale.
 *
 * ---- THE CONSEQUENCE, WRITTEN DOWN RATHER THAN DISCOVERED LATER ----
 *
 * All ten of a lesson's bank questions are now spent inside the lesson. The
 * weekly test therefore RE-ASKS questions she has already met. That is correct
 * only because Gigi also moved the grade: the LESSON is the graded unit now,
 * Lamar's model, and the week became review. If the grade ever moves back to
 * the week, this split has to be re-cut with it.
 */
export const LESSON_TEST = {
  /** Unscored, interleaved through the lesson, feedback the moment she is wrong. */
  practice: 6,
  /** Scored, at the very end, no hints. */
  scored: 4
};

/**
 * How many bank questions a lesson must own before it can run this at all.
 *
 * DERIVED, never typed. The thirteen re-homed Herbalism lessons carried five
 * questions each for twenty-one versions while every other lesson carried ten,
 * and no check ever counted them — both documents called those thirteen "flat
 * cards" and meant the prose. A hand-typed 10 here would be the same fault
 * again: a number that is right today and drifts the moment the split changes.
 */
export const LESSON_BANK_MINIMUM = LESSON_TEST.practice + LESSON_TEST.scored;

// ---------------------------------------------------------------------------
// EXIT TICKETS
// ---------------------------------------------------------------------------

/**
 * After a test, re-ask up to two of the questions she actually missed.
 *
 * Also taken from her brother's app. There it reuses the questions from that
 * same test the student got wrong — so no new content has to be written, and
 * the check is far more targeted than a generic extra question. It re-asks
 * exactly what did not stick.
 *
 * ---- WHAT IT IS NOT ----
 *
 * NOT scored. It does not touch the attempt record, the percentage, or the
 * band. She has already sat the test; the grade is the grade.
 *
 * AND IT DOES NOT MOVE THE SPACED REVIEW BOXES. This is the subtle one and it
 * is worth being explicit, because "she got it right, move it up" looks
 * obviously correct and is wrong here. She just read the answer thirty seconds
 * ago on the review screen. Counting that as a successful retrieval would push
 * a question she genuinely does not know into a longer interval — the exact
 * failure the whole schedule exists to prevent. The miss stands; the item comes
 * back tomorrow morning as it should.
 *
 * So what is it for? Catching confusion while she is still sitting there, and
 * letting her leave a hard test having got something right. Both are worth
 * having, and neither needs to be recorded.
 */
export const EXIT_TICKET = {
  maxQuestions: 2,
  scored: false,
  movesReviewBoxes: false
};

/**
 * TESTS give their feedback at the END, all at once.
 *
 * Not because it is stricter — because a test that explains each answer as she
 * goes has turned into a lesson, and she starts using question three to work out
 * question four. Reviewing the whole paper afterwards, with the lessons to go
 * back to, is both a fairer measurement and a second retrieval pass.
 */
export const TEST_FEEDBACK_AT_END = true;

// ---------------------------------------------------------------------------
// PETALS
// ---------------------------------------------------------------------------

/**
 * Petals are earned for TAKING a test and for doing the warm-up. Never for the
 * score.
 *
 * The same rule the Journal already follows. Paying for right answers teaches a
 * child to avoid anything she might get wrong, which is the exact opposite of
 * what a diagnostic-driven app is for. She should be able to walk into a test
 * she might fail without it costing her anything.
 */
export const PETALS = {
  warmUp: 3,
  unitTest: 15,
  quarterTest: 40,
  // For going back and re-reading a lesson after a miss. Paid for the repair,
  // which is the behaviour actually worth encouraging.
  lessonRevisit: 5,
  /** A project is a fortnight's work. Paid ONCE, on finishing, and never for how
   *  it turned out — same rule as the Journal. Worth more than a test because it
   *  took two weeks, and worth nothing extra for being good. */
  project: 25,
  /** Reading a lesson for the FIRST time. Added v3.12.
   *
   *  Before the rebalance only a RE-read paid anything, which meant a child could
   *  read all 96 lessons and earn nothing for any of them. The revisit award was
   *  right — going back after a miss is the behaviour worth paying for — but
   *  "nothing for the work itself" was never the intention, it was an omission. */
  lessonRead: 6
};

/**
 * GOLDEN SEEDS FROM SCHOOLWORK — new at v3.12, and the heart of the fix.
 *
 * Before this, the ONLY ways to get a seed were the Check-In and a grown-up's
 * match. Doing school — every lesson, every test, every project, every exam —
 * earned exactly zero of the currency that buys real rewards. The scarce
 * currency was unreachable by the activity the whole app exists for.
 *
 * Across a year this is about 316 seeds: 32 weekly tests, 4 quarterly exams and
 * 16 projects. Roughly five times what finishing the Check-In pays, which is the
 * ratio that makes the year matter more than day one.
 *
 * Same rule as petals, without exception: paid for SITTING and for FINISHING.
 * Never for the score. She has to be able to walk into a test she might fail
 * without it costing her anything.
 */
export const SEEDS = {
  weeklyTest: 9,
  quarterTest: 40,
  project: 22
};

/**
 * WHY THOSE THREE NUMBERS.
 *
 * They are not picked, they are derived — from the paces the seed tiers already
 * promise in seedRewards.js:
 *
 *   25 seeds · a small privilege · "about once a week"
 *   60 · a treat · "every two weeks or so"
 *  120 · an outing · "monthly"
 *  200 · something real · "every couple of months"
 *  500 · the Dream Reward · "once a year"
 *
 * "About once a week" at 25 seeds means income of roughly 25 seeds a week. Over
 * 32 teaching weeks that is 800 a year, and 32 weekly tests, 4 exams and 16
 * projects at these rates comes to exactly 800 — 25 a week.
 *
 * The exam is 40 rather than 35 for a reason worth keeping: at 35 a full quarter
 * came to 195 seeds against the 200 the "something real" tier costs, so a child
 * who did an entire term of work finished five seeds short of the reward the app
 * had promised her for it. verify-economy caught it. A quarter now lands on 200
 * exactly.
 *
 * The uncomfortable part, recorded rather than smoothed over: under the OLD
 * rates those paces were never reachable either. The Check-In paid 260 seeds and
 * then school paid nothing, so after the first fortnight her seed income was
 * zero for the rest of the year and every pace in that table was fiction.
 *
 * These are real rewards costing a grown-up real time or money, so this is the
 * one place in the app where the right number is a parent's decision rather than
 * a designer's. Turn all three down together to slow the whole ladder.
 */
