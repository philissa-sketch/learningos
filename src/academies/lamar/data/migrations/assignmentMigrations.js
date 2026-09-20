// ---------------------------------------------------------------------------
// THIS SCHOOL'S ONE-OFF DATA REPAIRS.
//
// Moved out of src/store/useAppStore.js on Sept 20, 2026 — GENERIC_CARRYOVER
// fault 2, "Forty of one school's slot ids are embedded in the platform
// store". Thirty-two `asg::` ids and eight `book::` ids ran, as code, for
// every Academy that ever booted. They were inert for a second school only
// because the ids would not match — which the carryover doc called what it is:
// luck, not design.
//
// WHAT STAYED BEHIND, AND WHY
//
// The MECHANISM is the platform's and did not move. "A seed edit cannot reach
// a row that is already hydrated" is true for every school, and the correction
// pass that fixes it is real platform work. Only the ENTRIES are this family's.
//
// THE GUARD SEMANTICS ARE LOAD-BEARING. Every entry states what the wrong
// value WAS, and applies only on an exact match:
//
//   * a date the parent has since changed herself is HERS, and is walked past
//   * `fromDueDate` and `fromNote` accept ARRAYS on purpose — a database that
//     took an earlier correction sits on different data than one that never
//     did, and both have to be reachable. Removing that lands a second fix on
//     half the databases. This is on the "do not relitigate" list.
//   * formats are only ever ADDED, never replaced. Choosing a different format
//     is a real editorial decision and a migration must not undo one.
//
// Nothing here was retyped. The three tables were cut from the store whole and
// pasted, and scripts/verify-assignment-migrations.mjs pins their sizes and
// asserts the guards still refuse to touch an edited row.
// ---------------------------------------------------------------------------

export const ASSIGNMENT_CORRECTIONS = {
  // --- dates: filed in one quarter, due in another -------------------
  'asg::math::Q1::1':         { fromDueDate: '2026-09-16', dueDate: '2026-10-02', format: 'applied-math' },
  'asg::math::Q2::1':         { fromDueDate: '2026-09-16', dueDate: '2026-11-06', format: 'applied-math' },
  'asg::math::Q3::1':         { fromDueDate: '2026-09-16', dueDate: '2027-02-05', format: 'applied-math' },
  'asg::math::Q4::1':         { fromDueDate: ['2026-09-16', '2027-04-16'], dueDate: '2027-04-30', format: 'applied-math' },
  'asg::math::Summer::1':     { fromDueDate: '2026-09-16', dueDate: '2027-07-09', format: 'applied-math' },
  // --- dates: nine assignments on one day ----------------------------
  // --- dates: a project due before the lesson that teaches it ---------
  //
  // Sept 5, 2026. The parent: "Mission Control has projects due that he
  // hasn't learned about."
  //
  // The Tinkercad Nameplate needs lesson `tech7-cad`, number 20 of
  // Technology's 40. Technology runs two sessions a week, so at one
  // lesson per session that is 2026-10-08 at the earliest. Sept 11 would
  // have needed four lessons a week against two scheduled sessions.
  //
  // Both earlier shipped dates are named: a row that took the Aug 30
  // correction sits on 2026-09-11, one that never did on 2026-09-16.
  'asg::technology::Q1::1':   { fromDueDate: ['2026-09-16', '2026-09-11'], dueDate: '2026-10-16', format: 'build' },
  'asg::science::Q1::1':      { fromDueDate: '2026-09-16', dueDate: '2026-09-25', format: 'build' },
  'asg::writing::Q1::1':      { fromDueDate: '2026-09-16', dueDate: '2026-10-23', format: 'writing-sample' },
  // --- dates: two book reports whose run-ups overlapped ---------------
  //
  // Sept 5, 2026. The parent: the Hatchet report should not start until
  // the A Long Walk to Water report is turned in.
  //
  // A Book Report carries four weekly milestones and a 21-day lead on the
  // first, so the day it LANDS ON HIS BOARD is its due date minus 42, not
  // minus seven. At 2026-10-09 that was Aug 28 — three weeks before the
  // report it was meant to follow was even due, and both sat on his board
  // together. 2026-10-30 is the earliest date whose minus-42 lands on
  // Sept 18, the day the other report is due.
  //
  // The seed in placeholders.js moved too, and moving it was NOT enough:
  // his row was hydrated weeks ago and seeds never overwrite an existing
  // row. That is the mistake this whole table exists to catch, and it was
  // made again here before the table was remembered.
  'asg::reading::Q1::2':      { fromDueDate: '2026-10-09', dueDate: '2026-10-30' },
  // And the BOOK itself. A Reading Assignment carries a 21-day lead, so
  // Hatchet DUE Sept 18 had been saying "start now" since Aug 28 — on his
  // board beside the report he was supposed to be finishing. The parent
  // asked for the book to start Sept 18, when that report is due, which
  // means finishing Oct 9. It lands on the date the report above just
  // vacated, and Oct 30 is then three weeks after it: the pattern every
  // other report in this file uses.
  'asg::reading::Q1::1':      { fromDueDate: '2026-09-18', dueDate: '2026-10-09' },
  // --- dates: outside their own quarter, or inside a school break ----
  //
  // Found Aug 30, 2026 by scripts/verify-assignment-dates.mjs, written
  // after the parent asked why Q1 looked heavier than the other quarters.
  // The rules these break — QUARTER_DUE_WINDOWS and EXCLUDED_RANGES — were
  // already in assignmentRecommendations.js, but only ever governed dates
  // the app SUGGESTED. Hand-written seed dates were never measured.
  //
  // The worst was the aerospace Book Report on 2027-04-02: after Q3 ends
  // and before Q4 begins, so NO quarter's grade would have collected it.
  'asg::aerospace::Q4::1':    { fromDueDate: '2027-05-26', dueDate: '2027-05-21' },
  // --- dates: two research papers due together, and a Saturday -------
  'asg::socialStudies::Q2::1':{ fromDueDate: '2026-12-04', dueDate: '2026-11-13' },
  'asg::socialStudies::Q2::2':{ fromDueDate: '2026-12-18', dueDate: '2026-12-04', format: 'historical-investigation' },
  'asg::socialStudies::Q3::2':{ fromDueDate: '2027-02-13', dueDate: '2027-02-19', format: 'build' },
  'asg::writing::Q3::1':      { fromDueDate: '2027-02-13', dueDate: '2027-03-05', format: 'writing-sample' },
  // --- formats only: the row's date was already right ----------------
  'asg::writing::Q2::1':      { format: 'person-study' },
  'asg::writing::Q4::1':      { fromDueDate: '2027-05-26', dueDate: '2027-05-21', format: 'failure-analysis' },
  'asg::writing::Summer::1':  { format: 'writing-sample' },
  // `asg::aerospace::Q1::2` WAS CORRECTED HERE UNTIL SEPT 15, 2026, and the
  // slot it named no longer exists. Aerospace Q1 was cut to slots 1 and 4 on
  // Sept 5 -- the parent, against the usual middle-school load: about one
  // book report per quarter and ONLY in language arts. The correction was
  // left behind, so this list and placeholders.js disagreed about a slot,
  // and whichever ran last would have won.
  //
  // Removing it takes nothing off his screen. The seeder only ever creates
  // rows from placeholders.js, so no row with that id can be made again; any
  // row an older database still holds was corrected on an earlier hydrate
  // and keeps that format. Caught by verify-academic-schedule.
  'asg::aerospace::Summer::2':{ format: 'build' },
  'asg::science::Q2::1':      { fromDueDate: '2026-11-25', dueDate: '2026-12-02', format: 'investigation' },
  'asg::science::Q4::1':      { format: 'investigation' },
  'asg::technology::Q2::1':   { fromDueDate: '2026-11-25', dueDate: '2026-12-02', format: 'investigation' },
  // --- notes that promised a report nothing scheduled ----------------
  //
  // Each `fromNote` names EVERY text this row has ever shipped with, for
  // the same reason `fromDueDate` does: a database that took the Sept 1
  // correction sits on different text than one that never did, and both
  // are still untouched by her. Naming only the original would land the
  // second fix on half the databases.
  //
  // Sept 5, 2026: these three notes promised reports that no longer
  // exist — the historical analysis was dropped, and the scientific
  // review and engineering analysis became lab work. A note promising a
  // report nothing schedules is the exact fault this section was written
  // to fix, and dropping the reports without it would have recreated it
  // pointing the other way.
  'asg::socialStudies::Q1::2': {
    fromNote: [
      'Historical-analysis report on a world-regional history read',
      'Weekly chapter pacing. The historical analysis is due three weeks after you finish it.'
    ],
    note: 'Weekly chapter pacing. Read it for itself — the historical analysis that used to follow it was dropped Sept 5, 2026, and Q2\'s writing is the family-history research paper instead.'
  },
  'asg::science::Q3::1': {
    fromNote: [
      'Scientific-review report on a Q3 life-science read',
      'Weekly chapter pacing. The scientific review below is due three weeks after you finish it.'
    ],
    note: 'Weekly chapter pacing. Read it for itself — what used to be a scientific review of it is now the genetics investigation below, three weeks after you finish.'
  },
  'asg::aerospace::Q3::2': {
    fromNote: [
      'Engineering-analysis or biography report on a Q3 Aerospace read — book and format TBD',
      'Weekly chapter pacing. The engineering analysis is due three weeks after you finish it.'
    ],
    note: 'Weekly chapter pacing. Read it for itself — what used to be an engineering analysis of it is now the Q4 flight test.'
  },
  // --- retypes: book reports outside language arts -------------------
  //
  // Sept 5, 2026. The parent, against the usual middle-school load: about
  // one book report per quarter and ONLY in language arts — at most one
  // all year in history, none in science or aerospace. Four of his seven
  // were outside reading.
  //
  // The type is not a label here. 'Book Report' carries four weekly steps
  // and a 21-day lead on the first, so each of these occupied his board
  // for 42 days; 'Portfolio Entry' carries seven days and no chain. So
  // this changes what is ON HIS BOARD, not what it is called, and it has
  // to reach rows hydrated weeks ago or only a brand-new Academy gets it.
  //
  // FORMAT IDS ARE NOT INTERCHANGEABLE ACROSS TYPES. formatsForType()
  // returns four ids for a Portfolio Entry — build, applied-math,
  // investigation, writing-sample — and findFormat() returns null for
  // anything else, which means no required sections, no checklist and no
  // rubric. 'creative-project', 'parent-interview' and 'oral-presentation'
  // are Book Report and Presentation ids and would all have silently
  // produced a blank rubric here. That failure has happened in this file
  // before, to all three research papers.
  'asg::socialStudies::Q1::3': {
    fromType: 'Book Report', fromFormat: 'creative-project',
    type: 'Portfolio Entry', format: 'build',
    fromNote: 'Model or labelled cross-section of the borehole well from the end of the book, plus the explanation page the format asks for. The engineering in the last chapters is the point.',
    note: 'Model or labelled cross-section of the borehole well from the end of the book. Photograph it, label the parts that matter, and write down the real measurements you used. The engineering in the last chapters is the point.'
  },
  'asg::science::Q3::2': {
    fromType: 'Book Report', fromFormat: 'oral-presentation',
    type: 'Portfolio Entry', format: 'investigation',
    title: 'Genetics investigation — trace one inherited trait through three generations',
    fromNote: 'The report the reading note promised. What question the science answers, how it was tested, what the evidence shows, and what is still unknown.',
    note: 'Pick one simple trait — attached earlobes, tongue rolling, widow\'s peak — and chart who has it across three generations of the family. Then predict the next generation with a Punnett square and say what could skew the result. The genetics book is the reading behind it; this is the lab.'
  },
  'asg::aerospace::Q4::3': {
    // The date fix from the Aug 30 pass still has to reach any database
    // that never took it, so it stays here alongside the retype.
    fromDueDate: '2027-04-02', dueDate: '2027-04-23',
    fromType: 'Book Report', fromFormat: 'parent-interview',
    type: 'Portfolio Entry', format: 'investigation',
    title: 'Flight test — glide ratio across three wing shapes',
    fromNote: 'The report the Q3 reading note promised. What was being built, the problem it had to solve, the trade-offs, and what he would do differently.',
    note: 'Three wing shapes on the same fuselage, five launches each, distance and height recorded every time. Keep the runs that went badly. The data goes into the Engineering Showcase in May.'
  }
};

export const RETIRED_ASSIGNMENT_SLOTS = [
  'asg::aerospace::Q2::2',
  'asg::socialStudies::Q2::3',
  'asg::aerospace::Q1::2'
];

export const BOOK_SWAPS = {
  'book::math::1': { from: 'The Number Devil: A Mathematical Adventure', title: 'Reaching for the Moon: The Autobiography of NASA Mathematician Katherine Johnson', author: 'Katherine Johnson' },
  'book::reading::1': { from: 'Hatchet', title: 'Ghost', author: 'Jason Reynolds' },
  'book::reading::3': { from: 'The Martian: Classroom Edition', title: 'Tristan Strong Punches a Hole in the Sky', author: 'Kwame Mbalia' },
  'book::writing::1': { from: 'Woe Is I Jr.: The Younger Grammarphobe\'s Guide to Better English', title: 'Just Write: Here\'s How!', author: 'Walter Dean Myers' },
  'book::aerospace::1': { from: 'Apollo 8: The Mission That Changed Everything', title: 'Black Wings: Courageous Stories of African Americans in Aviation and Space History', author: 'Von Hardesty' },
  'book::aerospace::2': { from: 'Spaceman (Adapted for Young Readers)', title: 'Eugene Bullard: World\'s First Black Fighter Pilot', author: 'Larry W. Greenly' },
  'book::science::1': { from: 'Cells: Experience Life at Its Tiniest', title: 'The Immortal Life of Henrietta Lacks: The Young Reader’s Edition', author: 'Rebecca Skloot and Gregory Mone' },
  'book::technology::2': { from: 'The Boy Who Harnessed the Wind: Young Readers Edition', title: 'Great Minds of Science (Black Lives #1): A Nonfiction Graphic Novel', author: 'Tonya Bolden' }
};


/**
 * A slot whose TITLE was wrong, not just its date.
 *
 * The parent: *"I don't understand why the rocket project was setup so late.
 * It doesn't take a month to do it."* The row carried the week-2 project's
 * title on the week-6 project's date.
 *
 * ---- THE DATE MOVES WITH THE TITLE, OR THE FIX IS WORSE THAN THE FAULT ----
 *
 * Due dates are hers and a migration has no business rewriting one. This is
 * the exception worth naming: her copy read Aug 16, chosen for the BOTTLE
 * ROCKET. Retitling and leaving Aug 16 would have produced a write-up due
 * three and a half weeks before the thing it writes up gets built.
 *
 * So `dueDate` moves only FROM the two stale values named here, and only on a
 * row he has not touched. Any other date means she chose it, and it stays.
 *
 * `fromTitleWithStaleDate` is the second entry condition: a row that already
 * took the retitle but kept the old date. Without it, a database part-way
 * through this repair is stranded — the same reason `fromDueDate` takes an
 * array elsewhere in this file.
 */
export const ASSIGNMENT_RETITLES = {
  'asg::aerospace::Q1::2': {
    fromTitle: ['Bottle rocket — design, launch, and results'],
    fromTitleWithStaleDate: { title: 'Wind tunnel test — design, results, and what the airflow showed', dueDate: '2026-08-16' },
    title: 'Wind tunnel test — design, results, and what the airflow showed',
    note: 'Engineering-journal write-up of the Wind Tunnel Test built in week 6 — the fullest hands-on Aerospace project of the quarter',
    fromDueDate: ['2026-08-16', '2026-09-16'],
    dueDate: '2026-09-16'
  }
};
