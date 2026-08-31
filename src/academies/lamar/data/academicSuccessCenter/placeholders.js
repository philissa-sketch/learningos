/**
 * Academic Success Center — STATIC SEED DATA.
 *
 * This file is the seed layer only. It defines which book slots and
 * which quarterly assignment slots each subject *should* have; the
 * parent's real books, real titles/topics, real due dates, and real
 * completion status live in the `academicBooks` / `academicAssignments`
 * Dexie tables (db.js v16) and are hydrated from these seeds once per
 * `slotId`, never overwritten afterward. Same "static seed + persisted
 * override" pattern already used for Khan Academy assignments — see
 * useAppStore.js's hydrate().
 *
 * HISTORY: this file originally existed as scheduling hooks/placeholders
 * ONLY, built before the Academic Success Center existed, so the real
 * Center could attach a real book/report/due date later without the
 * curriculum needing to be rewritten (PROJECT_PLAN.md Part 9's
 * "Development Note"). That Center is now built (v1 — Books,
 * Assignments, Portfolio) and these seeds feed it directly.
 *
 * REAL CONTENT ONLY: `title`/`author` are deliberately null and topics
 * are deliberately unset. No book title in this app is ever guessed —
 * the parent fills in the real book she actually has or actually
 * assigns. A slot's `note` describes what the slot is FOR (which is
 * real information, derived from that subject's real curriculum), never
 * what book fills it.
 *
 * BLACK AMERICAN EXCELLENCE: four subjects carry a slot flagged
 * `blackExcellence: true`, per Part 9's requirement that "every
 * applicable subject should intentionally include Black American experts
 * and innovators." These are still title-less like every other slot —
 * what makes them different is that a real, verified list of candidate
 * titles exists for them in blackExcellenceLibrary.js, offered in the
 * Book Library with one click. The slot is Required rather than
 * Recommended on purpose: this was an explicit ask, not a nice-to-have.
 *
 * SLOT IDS: every seed entry carries a stable `slotId`. Hydration is
 * idempotent per slotId, which means (a) re-running hydrate never
 * duplicates a slot, and (b) adding new subjects/quarters to this file
 * later automatically seeds them for an existing user without touching
 * any slot she has already filled in. Never renumber or reuse an
 * existing slotId — that would orphan the parent's real data.
 */

// Subject-level book slots (Required / Recommended / Optional /
// Reference), per Part 9's "Personal Book Library" and "Subject Reading
// Libraries."
export const subjectBookPlaceholders = {
  math: [
    { slotId: 'book::math::1', type: 'Recommended', title: 'Reaching for the Moon: The Autobiography of NASA Mathematician Katherine Johnson', author: 'Katherine Johnson', blackExcellence: true, note: 'Math history / applied-math biography' }
  ],
  reading: [
    { slotId: 'book::reading::1', type: 'Required', title: 'Ghost', author: 'Jason Reynolds', blackExcellence: true, note: 'Required grade-level novel' },
    { slotId: 'book::reading::2', type: 'Recommended', title: 'Hidden Figures: Young Readers\' Edition', author: 'Margot Lee Shetterly', blackExcellence: true, note: 'Recommended independent read' },
    { slotId: 'book::reading::3', type: 'Optional', title: 'Tristan Strong Punches a Hole in the Sky', author: 'Kwame Mbalia', blackExcellence: true, note: 'Optional free-choice read' },
    // Came from the retired `writing` subject in the merge (Aug 6, 2026),
    // placed here in ACADEMIC_BOOK_TYPES order rather than appended —
    // Required, Recommended, Optional, Reference. A grammar or
    // writing-craft book is a Reference in the literal sense: it gets
    // consulted, not read front to back, and 'Reference' already existed
    // as a type for exactly this.
    //
    // The slotId deliberately keeps its old `writing` key. Slot ids are
    // the stable identity a seeded row is matched on, so renaming one
    // would orphan whatever the parent had already recorded against it
    // and seed a duplicate beside it.
    { slotId: 'book::writing::1', type: 'Reference', title: 'Just Write: Here\'s How!', author: 'Walter Dean Myers', blackExcellence: true, note: 'Writing-craft or grammar reference' }
  ],
  socialStudies: [
    { slotId: 'book::socialStudies::1', type: 'Required', title: 'A Long Walk to Water', author: 'Linda Sue Park', note: 'World regional history read (Africa, Middle East, or Southern/Eastern Asia)' },
    { slotId: 'book::socialStudies::2', type: 'Recommended', title: 'National Geographic Kids Guide to Genealogy', author: 'T. J. Resler', note: 'Genealogy or family-history-methods read' },
    { slotId: 'book::socialStudies::3', type: 'Required', title: 'Red-Tail Angels: The Story of the Tuskegee Airmen of World War II', author: 'Patricia C. McKissack and Fredrick L. McKissack', blackExcellence: true, note: 'Black American Excellence — Black American history, aviation, or civil-rights read pairing with the Trailblazers unit (see the Black American Excellence Library for real, verified titles)' }
  ],
  // Aerospace, Science, and Technology did not exist as built subjects
  // when this file was first written. Their slots below are described
  // against what those courses ACTUALLY cover in this app — Aerospace's
  // 49 quarter-tagged lessons across Q1-Q4 + Summer, Science's Khan
  // Academy MS Biology sequence plus the hands-on experiments in
  // scienceExperiments.js, and Technology's semester-paced Q1-Q2 (web
  // development, automation, robotics programming) — not against a
  // generic reading list.
  aerospace: [
    { slotId: 'book::aerospace::1', type: 'Required', title: 'Black Wings: Courageous Stories of African Americans in Aviation and Space History', author: 'Von Hardesty', blackExcellence: true, note: 'Aerospace/aviation nonfiction or a NASA publication, paced alongside the quarterly Aerospace lessons' },
    { slotId: 'book::aerospace::2', type: 'Recommended', title: 'Eugene Bullard: World\'s First Black Fighter Pilot', author: 'Larry W. Greenly', blackExcellence: true, note: 'Biography or autobiography of a real aerospace engineer, astronaut, or aviation pioneer' },
    { slotId: 'book::aerospace::3', type: 'Reference', title: 'Rocketry: Investigate the Science and Technology of Rockets and Ballistics', author: 'Carla Mooney', note: 'Reference kept on the shelf all year (rocketry, flight, or engineering-design handbook)' },
    { slotId: 'book::aerospace::4', type: 'Required', title: 'Chasing Space: Young Readers\' Edition', author: 'Leland Melvin', blackExcellence: true, note: 'Black American Excellence — biography or memoir of a Black American aerospace engineer, astronaut, mathematician, or aviator (see the Black American Excellence Library for real, verified titles)' }
  ],
  science: [
    { slotId: 'book::science::1', type: 'Recommended', title: 'The Immortal Life of Henrietta Lacks: The Young Reader’s Edition', author: 'Rebecca Skloot and Gregory Mone', blackExcellence: true, note: 'Life-science read paced alongside Khan Academy MS Biology (cells, body systems, genetics, ecosystems)' },
    { slotId: 'book::science::2', type: 'Optional', title: 'Janice VanCleave\'s A+ Science Fair Projects', author: 'Janice VanCleave', note: 'Hands-on experiment or science-project book to pair with the Science experiments already in the Writing Journal' },
    { slotId: 'book::science::3', type: 'Required', title: 'Find Where the Wind Goes: Moments from My Life', author: 'Mae Jemison', blackExcellence: true, note: 'Black American Excellence — biography or collective biography of Black American scientists (see the Black American Excellence Library for real, verified titles)' }
  ],
  // PE & Nutrition was missed in the v1 pass and added in the Part 9
  // completion audit (Aug 2026) — it is a real active subject with a
  // full curriculum, and Part 9 names it directly ("sports science,
  // nutrition, fitness, exercise physiology"). Framing rule for this
  // subject applies here exactly as it does everywhere else in PE: books
  // are about strength, health, and how the body works — never
  // appearance, weight loss, or body comparison.
  pe: [
    { slotId: 'book::pe::1', type: 'Recommended', title: 'The Way We Work: Getting to Know the Amazing Human Body', author: 'David Macaulay', note: 'How the body works — sports science, exercise physiology, or strength-training fundamentals for a young athlete' },
    { slotId: 'book::pe::2', type: 'Optional', title: 'The Complete Cookbook for Young Chefs', author: 'America\'s Test Kitchen Kids', note: 'Nutrition or real cooking reference to pair with the Nutrition track' }
  ],
  technology: [
    { slotId: 'book::technology::1', type: 'Recommended', title: 'Python for Kids, 2nd Edition: A Playful Introduction to Programming', author: 'Jason R. Briggs', note: 'Coding or computer-science read paced alongside the Q1-Q2 Technology lessons' },
    { slotId: 'book::technology::2', type: 'Recommended', title: 'Great Minds of Science (Black Lives #1): A Nonfiction Graphic Novel', author: 'Tonya Bolden', blackExcellence: true, note: 'Biography of a real computer scientist, programmer, or inventor' },
    { slotId: 'book::technology::3', type: 'Required', title: 'African American Inventors (Black Stars)', author: 'Otha Richard Sullivan with Jim Haskins', blackExcellence: true, note: 'Black American Excellence — Black American inventors, engineers, or computing pioneers (see the Black American Excellence Library for real, verified titles)' }
  ]
};

// Quarter-level scheduling hooks — reading assignments and major
// assignments, per Part 9's "Intelligent Book Assignment System,"
// "Book Report Center," and "Major Academic Projects." Each entry is a
// SLOT with a real intent and no real content: the parent gives it a
// real title/topic and (optionally) a real due date in the Academic
// Success Center's Parent Setup tab, which is what turns it from a
// placeholder into a real, trackable assignment.
const READING_QUARTERS = ['Q1 2026-2027', 'Q2 2026-2027', 'Q3 2026-2027', 'Q4 2026-2027', 'Summer 2027'];

export const quarterlyAcademicPlaceholders = {
  math: {
    'Q1 2026-2027': [{ slotId: 'asg::math::Q1::1', type: 'Portfolio Entry', format: 'applied-math', dueDate: '2026-10-02', title: 'Decimal place value in the real world — cost out a build', note: 'Applied-math project' }],
    'Q2 2026-2027': [{ slotId: 'asg::math::Q2::1', type: 'Portfolio Entry', format: 'applied-math', dueDate: '2026-11-06', title: 'Ratios and proportion — build a scale model to spec', note: 'Applied-math project' }],
    'Q3 2026-2027': [{ slotId: 'asg::math::Q3::1', type: 'Portfolio Entry', format: 'applied-math', dueDate: '2027-02-05', title: 'Negative numbers — chart altitude against temperature', note: 'Applied-math project' }],
    'Q4 2026-2027': [{ slotId: 'asg::math::Q4::1', type: 'Portfolio Entry', format: 'applied-math', dueDate: '2027-04-30', title: 'Geometry — surface area of a payload fairing', note: 'Applied-math project' }],
    'Summer 2027': [{ slotId: 'asg::math::Summer::1', type: 'Portfolio Entry', format: 'applied-math', dueDate: '2027-07-09', title: 'Transformations — design a tiled heat-shield pattern', note: 'Applied-math project' }]
  },
  reading: {
    'Q1 2026-2027': [
      { slotId: 'asg::reading::Q1::1', type: 'Reading Assignment', dueDate: '2026-09-18', title: 'Hatchet — Gary Paulsen', note: 'Weekly chapter pacing. Survival story, short chapters, strong momentum — chosen to keep him reading while Q1 rebuilds grammar.' },
      { slotId: 'asg::reading::Q1::2', type: 'Book Report', dueDate: '2026-10-09', format: 'creative-project', title: 'Hatchet — book jacket redesign', note: 'Redesign the cover and write a 150-word back-cover blurb. Deliberately a visual project: his writing is two strands behind his reading, and Q1 is grammar catch-up.' },
      { slotId: 'asg::writing::Q1::1', type: 'Writing Portfolio Entry', format: 'writing-sample', dueDate: '2026-10-23', title: 'Q1 writing portfolio — his strongest Journal entry', note: 'Best skill-prompt entry this quarter — selected later' }
    ],
    'Q2 2026-2027': [
      { slotId: 'asg::reading::Q2::1', type: 'Reading Assignment', dueDate: '2026-11-20', title: 'Hidden Figures: Young Readers\' Edition — Margot Lee Shetterly', note: 'Weekly chapter pacing. Pairs with the genealogy quarter in Social Studies and with his aerospace goal.' },
      { slotId: 'asg::reading::Q2::2', type: 'Book Report', dueDate: '2026-12-11', format: 'biography', title: 'Hidden Figures — figure profile and letter to the author', note: 'Profile one of the mathematicians, then write a letter to Margot Lee Shetterly. First real structured writing of the year, still scaffolded.' },
      { slotId: 'asg::writing::Q2::1', type: 'Research Paper', format: 'person-study', dueDate: '2026-12-18', title: 'Research paper — a Black American aviator or engineer, three sources', note: 'First research paper of the year — shorter, cross-curricular, finished before winter break. Topic TBD' }
    ],
    'Q3 2026-2027': [
      { slotId: 'asg::reading::Q3::1', type: 'Reading Assignment', dueDate: '2027-01-29', title: 'The Martian: Classroom Edition — Andy Weir', note: 'Weekly chapter pacing. Engineering problem-solving in the field he wants to work in.' },
      { slotId: 'asg::reading::Q3::2', type: 'Presentation', dueDate: '2027-03-19', format: 'speech', title: 'The Martian — 3-minute pitch', note: 'Spoken, not written: high thinking load, low writing load, which suits a reader whose comprehension outruns his writing.' },
      { slotId: 'asg::writing::Q3::1', type: 'Writing Portfolio Entry', format: 'writing-sample', dueDate: '2027-03-05', title: 'Q3 writing portfolio — his strongest Journal entry', note: 'Best skill-prompt entry this quarter — selected later' }
    ],
    'Q4 2026-2027': [
      { slotId: 'asg::reading::Q4::1', type: 'Reading Assignment', dueDate: '2027-04-23', title: 'March: Book One — John Lewis, Andrew Aydin, and Nate Powell', note: 'Weekly chapter pacing. Graphic memoir, 128 pages — serious content in an accessible format.' },
      { slotId: 'asg::reading::Q4::2', type: 'Book Report', dueDate: '2027-05-14', format: 'character-study', title: 'March: Book One — literary analysis', note: 'Theme and character growth. The one full formal essay of the year, placed last on purpose: by April his grammar is a year stronger than it was in August.' },
      { slotId: 'asg::writing::Q4::1', type: 'Research Paper', format: 'failure-analysis', dueDate: '2027-05-21', title: 'Capstone research paper — an engineering failure and what it changed', note: 'Year-end capstone research paper — the longest piece of the year, built over about a month. Topic TBD' }
    ],
    'Summer 2027': [
      { slotId: 'asg::reading::Summer::1', type: 'Reading Assignment', dueDate: '2027-06-25', title: 'Free choice — Skyward, Space Case, or Ungifted', note: 'Independent summer reading, his pick. Book-club style discussion with a parent instead of a write-up — the point of summer is protecting the habit.' },
      { slotId: 'asg::writing::Summer::1', type: 'Writing Portfolio Entry', format: 'writing-sample', dueDate: '2027-06-30', title: 'Summer writing portfolio — his strongest Journal entry', note: 'Khan Academy has zero real Summer Language Arts content left — Writing Journal carries this quarter instead' }
    ]
  },
  socialStudies: {
    // Q1 is Khan Academy World History alone now — Mission Control's own
    // Social Studies lessons start in Q2 — so this quarter's work is paced
    // against Khan's Early Agrarian Societies unit rather than a lesson.
    'Q1 2026-2027': [
      { slotId: 'asg::socialStudies::Q1::1', type: 'Reading Assignment', dueDate: '2026-08-28', title: 'A Long Walk to Water — weekly chapter pacing', note: 'Paced alongside Khan Academy\'s Early Agrarian Societies World History unit' },
      { slotId: 'asg::socialStudies::Q1::2', type: 'Reading Assignment', dueDate: '2026-10-30', title: 'Red-Tail Angels: The Tuskegee Airmen — weekly chapter pacing', note: 'Weekly chapter pacing. The historical analysis is due three weeks after you finish it.' },
      /**
       * THE BOOK REPORT FOR A LONG WALK TO WATER. (Added Aug 10, 2026.)
       *
       * The parent, looking at the reading row: "Is he supposed to be doing a
       * book report to this book. It doesn't show, it just states that it is
       * due." He was not — Social Studies Q1 had two Reading Assignments and
       * no graded writing of any kind, so the quarter's grade rested entirely
       * on Khan unit tests.
       *
       * Same format she chose for the Hatchet report: Creative Project. That
       * format asks for a made thing plus a written page explaining what it
       * represents, which chapter it comes from, and what he would change.
       *
       * The made thing here is Salva's well, because the end of this book is
       * literally water engineering — a drilled borehole, a casing, a pump —
       * and he wants to be an engineer. A labelled cross-section counts as
       * much as a physical model.
       *
       * DUE THREE WEEKS AFTER THE BOOK, not with it. The four Book Report
       * milestones run one a week (read, notes, draft, polish), so a report
       * due the same day as the reading leaves no room for three of them.
       * Sept 18 is a Friday and a full school day.
       */
      { slotId: 'asg::socialStudies::Q1::3', type: 'Book Report', dueDate: '2026-09-18', format: 'creative-project', title: 'A Long Walk to Water — build or draw Salva\'s well', note: 'Model or labelled cross-section of the borehole well from the end of the book, plus the explanation page the format asks for. The engineering in the last chapters is the point.' }
    ],
    // Q2 is the Genealogy quarter, on its own.
    'Q2 2026-2027': [
      /**
       * A REPORT THE NOTE PROMISED AND NOTHING SCHEDULED. (Added Aug 10, 2026.)
       *
       * The reading assignment for this book carried a note describing a
       * report — but its TYPE was Reading Assignment, so the app never asked
       * for the report, never scaffolded it, and never graded it. Three books
       * were in that state. The parent found the same fault on A Long Walk to
       * Water: "Is he supposed to be doing a book report to this book. It
       * doesn't show, it just states that it is due."
       *
       * Dated three weeks after the book, so the four weekly Book Report
       * milestones (read, notes, draft, polish) land one per week with the
       * reading deadline as week one.
       */
      { slotId: 'asg::socialStudies::Q2::3', type: 'Book Report', dueDate: '2026-11-20', format: 'compare-contrast', title: 'Red-Tail Angels: The Tuskegee Airmen — historical analysis', note: 'The report the Q1 reading note promised. Set the scene with a real date and place, name the author\'s point of view, and quote the book at least once.' },
      { slotId: 'asg::socialStudies::Q2::1', type: 'Reading Assignment', dueDate: '2026-11-13', title: 'National Geographic Kids Guide to Genealogy — read alongside the genealogy unit', note: 'Paced alongside the Genealogy & Historical Evidence unit — see the Black American Excellence shelf for genealogy and primary-source reads' },
      { slotId: 'asg::socialStudies::Q2::2', type: 'Research Paper', format: 'historical-investigation', dueDate: '2026-12-04', title: 'Family history research paper — one ancestor, three independent sources', note: 'Apply this quarter\'s evidence-evaluation methods (corroboration, bias, cross-referencing) to a real family or local-history investigation' }
    ],
    // Q3 now holds Geography, Government & Political Systems, and Economics.
    'Q3 2026-2027': [
      { slotId: 'asg::socialStudies::Q3::1', type: 'Reading Assignment', dueDate: '2027-02-12', title: 'The Royal Kingdoms of Ghana, Mali, and Songhay — weekly chapter pacing', note: 'Paced alongside the Geography & Economics unit and Khan Academy\'s World History' },
      { slotId: 'asg::socialStudies::Q3::2', type: 'Portfolio Entry', format: 'build', dueDate: '2027-02-19', title: 'Map portfolio — physical features of Africa, Southwest Asia, and Southern & Eastern Asia', note: 'Apply the personal money management lesson (SS7E10) to build a real personal budget' }
    ],
    // Q4 now holds Environment & Culture (SS7G2/SS7G4, plus the rest of the
    // geography strand as those lessons are completed).
    'Q4 2026-2027': [
      { slotId: 'asg::socialStudies::Q4::1', type: 'Reading Assignment', dueDate: '2027-05-07', title: 'The Night Diary — weekly chapter pacing', note: 'Paced alongside the Environment & Culture unit and Khan Academy\'s World History' }
    ],
    'Summer 2027': [
      { slotId: 'asg::socialStudies::Summer::1', type: 'Reading Assignment', dueDate: '2027-07-16', title: 'Free choice from the Black American Excellence Library', note: 'Independent summer reading' }
    ]
  },
  // Aerospace runs all five periods — it has real quarter-tagged lessons
  // in every one (Q1-Q4 ten each, Summer nine) plus a real Quarterly
  // Exam per period, so a per-quarter major assignment has real content
  // to attach to in each.
  aerospace: {
    'Q1 2026-2027': [
      { slotId: 'asg::aerospace::Q1::1', type: 'Reading Assignment', dueDate: '2026-10-16', title: 'Apollo 8: The Mission That Changed Everything — weekly chapter pacing', note: 'Paced alongside the Q1 Aerospace lessons' },
      // ---- RETITLED Aug 20, 2026 ----
      // Called "Bottle rocket" and dated Sept 16, this slot named the week-2
      // project (Aug 14) and carried the date of the week-6 one. The parent:
      // "I don't understand why the rocket project was setup so late. It
      // doesn't take a month to do it." She was reading a title and a date
      // that belonged to two different projects.
      //
      // The date was always the right one: Sept 16 is the Wednesday after the
      // Wind Tunnel Test (Fri Sept 11), the last hands-on Aerospace project of
      // Q1. The title is what was wrong. The bottle rocket already has its
      // write-up — he wrote it in the Writing Journal on Aug 16 and she graded
      // it C, 73%.
      { slotId: 'asg::aerospace::Q1::2', type: 'Portfolio Entry', format: 'investigation', dueDate: '2026-09-16', title: 'Wind tunnel test — design, results, and what the airflow showed', note: 'Engineering-journal write-up of the Wind Tunnel Test built in week 6 — the fullest hands-on Aerospace project of the quarter' }
    ],
    'Q2 2026-2027': [
      // *Chasing Space: Young Readers' Edition* (Leland Melvin) was dropped
      // from Q2 on Aug 8, 2026 at the parent's direction. Q2 is seven weeks
      // and carried four books — two of them astronaut memoirs adapted for
      // young readers, running at the same time as each other. The title is
      // still on his shelf as book::aerospace::4 and still in the Black
      // American Excellence Library; only the Q2 due date is gone.
      //
      // *Spaceman* moved Dec 11 -> Dec 18 with the slot removed, so the three
      // remaining Q2 books land exactly two weeks apart: Nov 20 / Dec 4 /
      // Dec 18. See readingStaggerMap in useAppStore.js, which is what
      // actually moves a row already in her database.
      { slotId: 'asg::aerospace::Q2::1', type: 'Reading Assignment', dueDate: '2026-12-18', title: 'Spaceman (Adapted for Young Readers) — weekly chapter pacing', note: 'Paced alongside the Q2 Aerospace lessons' }
    ],
    'Q3 2026-2027': [
      { slotId: 'asg::aerospace::Q3::1', type: 'Reading Assignment', dueDate: '2027-03-26', title: 'Rocketry: Investigate the Science and Technology of Rockets — reference reading', note: 'Paced alongside the Q3 Aerospace lessons' },
      { slotId: 'asg::aerospace::Q3::2', type: 'Reading Assignment', dueDate: '2027-03-12', title: 'Higher, Steeper, Faster: The Daredevils Who Conquered the Skies — weekly pacing', note: 'Weekly chapter pacing. The engineering analysis is due three weeks after you finish it.' }
    ],
    'Q4 2026-2027': [
      /**
       * A REPORT THE NOTE PROMISED AND NOTHING SCHEDULED. (Added Aug 10, 2026.)
       *
       * The reading assignment for this book carried a note describing a
       * report — but its TYPE was Reading Assignment, so the app never asked
       * for the report, never scaffolded it, and never graded it. Three books
       * were in that state. The parent found the same fault on A Long Walk to
       * Water: "Is he supposed to be doing a book report to this book. It
       * doesn't show, it just states that it is due."
       *
       * Dated three weeks after the book, so the four weekly Book Report
       * milestones (read, notes, draft, polish) land one per week with the
       * reading deadline as week one.
       */
      { slotId: 'asg::aerospace::Q4::3', type: 'Book Report', dueDate: '2027-04-23', format: 'parent-interview', title: 'Higher, Steeper, Faster — engineering analysis', note: 'The report the Q3 reading note promised. What was being built, the problem it had to solve, the trade-offs, and what he would do differently.' },
      { slotId: 'asg::aerospace::Q4::1', type: 'Reading Assignment', dueDate: '2027-05-21', title: 'The Wright Brothers: How They Invented the Airplane — weekly chapter pacing', note: 'Paced alongside the Q4 Aerospace lessons' },
      { slotId: 'asg::aerospace::Q4::2', type: 'Presentation', dueDate: '2027-05-19', format: 'engineering-showcase', title: 'Engineering showcase — a year of aerospace builds', note: 'Present a real completed Aerospace project or design — format TBD' }
    ],
    'Summer 2027': [
      { slotId: 'asg::aerospace::Summer::1', type: 'Reading Assignment', dueDate: '2027-07-30', title: 'The Space Race: How the Cold War Put Humans on the Moon — weekly pacing', note: 'Independent summer aerospace reading' },
      { slotId: 'asg::aerospace::Summer::2', type: 'Portfolio Entry', format: 'build', dueDate: '2027-06-30', title: 'Summer build — glider or wind tunnel, documented end to end', note: 'Summer engineering project write-up — project TBD' }
    ]
  },
  // Science runs all five periods because Khan Academy MS Biology is
  // really scheduled across Q1-Q4 + Summer in this app (see the Khan
  // Academy seed batches in useAppStore.js), even though Mission
  // Control's own Science lessons are archived.
  science: {
    'Q1 2026-2027': [
      { slotId: 'asg::science::Q1::1', type: 'Portfolio Entry', format: 'build', dueDate: '2026-09-25', title: 'Cell model — build it, label it, explain what each part does', note: 'Lab-report write-up of a hands-on Science experiment actually run this quarter — experiment selected from the Writing Journal' }
    ],
    'Q2 2026-2027': [
      { slotId: 'asg::science::Q2::1', type: 'Portfolio Entry', format: 'investigation', dueDate: '2026-12-02', title: 'Body systems — trace one path from breath to working muscle', note: 'Lab-report write-up of a hands-on Science experiment actually run this quarter — experiment selected from the Writing Journal' }
    ],
    'Q3 2026-2027': [
      { slotId: 'asg::science::Q3::1', type: 'Reading Assignment', dueDate: '2027-02-26', title: 'Genetics: Breaking the Code of Your DNA — weekly chapter pacing', note: 'Weekly chapter pacing. The scientific review below is due three weeks after you finish it.' },
      /**
       * A REPORT THE NOTE PROMISED AND NOTHING SCHEDULED. (Added Aug 10, 2026.)
       *
       * The reading assignment for this book carried a note describing a
       * report — but its TYPE was Reading Assignment, so the app never asked
       * for the report, never scaffolded it, and never graded it. Three books
       * were in that state. The parent found the same fault on A Long Walk to
       * Water: "Is he supposed to be doing a book report to this book. It
       * doesn't show, it just states that it is due."
       *
       * Dated three weeks after the book, so the four weekly Book Report
       * milestones (read, notes, draft, polish) land one per week with the
       * reading deadline as week one.
       */
      { slotId: 'asg::science::Q3::2', type: 'Book Report', dueDate: '2027-03-26', format: 'oral-presentation', title: 'Genetics: Breaking the Code of Your DNA — scientific review', note: 'The report the reading note promised. What question the science answers, how it was tested, what the evidence shows, and what is still unknown.' }
    ],
    'Q4 2026-2027': [
      { slotId: 'asg::science::Q4::1', type: 'Portfolio Entry', format: 'investigation', dueDate: '2027-04-28', title: 'Ecosystem study — one Georgia habitat, observed across four weeks', note: 'Lab-report write-up of a hands-on Science experiment actually run this quarter — experiment selected from the Writing Journal' }
    ],
    'Summer 2027': [
      { slotId: 'asg::science::Summer::1', type: 'Presentation', dueDate: '2027-07-23', format: 'science-fair-display', title: 'Science fair display — the summer experiment', note: 'Present a real completed experiment or science-fair-style investigation — format TBD' }
    ]
  },
  // Technology is deliberately Q1-Q2 ONLY. It is semester-paced — 32
  // real quarter-tagged lessons across Q1 and Q2 and nothing beyond
  // them — so seeding Q3/Q4/Summer slots here would invent scheduled
  // work against curriculum that does not exist. If Technology content
  // is extended later, add those quarters here then (new slotIds seed
  // automatically without disturbing existing data).
  technology: {
    'Q1 2026-2027': [
      { slotId: 'asg::technology::Q1::1', type: 'Portfolio Entry', format: 'build', dueDate: '2026-09-11', title: 'Tinkercad Mission Nameplate — designed, dimensioned, documented', note: 'Real built artifact from the Q1 web-development lessons (a working page or small project) — project TBD' }
    ],
    'Q2 2026-2027': [
      { slotId: 'asg::technology::Q2::1', type: 'Portfolio Entry', format: 'investigation', dueDate: '2026-12-02', title: 'The Change-One-Number Test — parametric design write-up', note: 'Real built artifact from the Q2 automation/robotics-programming lessons — project TBD' },
      { slotId: 'asg::technology::Q2::2', type: 'Presentation', dueDate: '2026-12-11', format: 'demonstration', title: 'Demo your CAD build — walk through one design decision', note: 'Demo a real working program he wrote — format TBD' }
    ]
  }
};

/**
 * The assignment types the seeds use. Also the picker list the parent
 * chooses from when adding her own custom assignment, so a custom
 * assignment has the same shape as a seeded one rather than a free-text
 * category that can't be grouped or counted.
 */
export const ACADEMIC_ASSIGNMENT_TYPES = [
  'Reading Assignment',
  'Book Report',
  'Research Paper',
  'Presentation',
  'Portfolio Entry',
  'Writing Portfolio Entry'
];

/** Book slot types — matches what the seeds above use. */
export const ACADEMIC_BOOK_TYPES = ['Required', 'Recommended', 'Optional', 'Reference'];

/**
 * Every subject with Academic Success Center seed data, in display
 * order — active Mission Control subjects first (Aerospace is the
 * signature course), then the Khan-Academy-taught/archived ones. Any
 * subject key present in either seed object above but missing here is
 * still handled by the UI (appended at the end), so adding a subject
 * to the seeds without touching this list can't make it disappear.
 */
/**
 * Canonical ordering, enforced rather than hand-maintained.
 *
 * Added August 6, 2026 after the parent caught it directly: *"Can we
 * merge them in the order they should go not just adding it randomly."*
 * She was right, and the problem was bigger than the merge that prompted
 * it — an audit found FIVE subjects already out of order, all from
 * entries appended to the end of a list instead of placed in it. The
 * Black Excellence books were the clearest case: Required reads, sitting
 * below the Recommended and Optional ones, purely because they were
 * added later.
 *
 * Sorting here rather than fixing the five by hand is the difference
 * between fixing an instance and fixing the cause. Whoever adds the next
 * book can append it to whichever array is convenient and it still comes
 * out in the right place.
 *
 * The sort is STABLE, so ordering deliberately chosen WITHIN a type —
 * which Required novel comes first, which reading assignment leads the
 * quarter — is preserved exactly as written.
 */
function sortByCanonicalType(list, typeOrder) {
  return [...list].sort((a, b) => {
    const ai = typeOrder.indexOf(a.type);
    const bi = typeOrder.indexOf(b.type);
    // An unrecognized type sorts last rather than to the front, so a
    // typo in a new entry is visible instead of silently promoted.
    return (ai === -1 ? typeOrder.length : ai) - (bi === -1 ? typeOrder.length : bi);
  });
}

for (const subject of Object.keys(subjectBookPlaceholders)) {
  subjectBookPlaceholders[subject] = sortByCanonicalType(
    subjectBookPlaceholders[subject],
    ACADEMIC_BOOK_TYPES
  );
}

for (const subject of Object.keys(quarterlyAcademicPlaceholders)) {
  for (const quarter of Object.keys(quarterlyAcademicPlaceholders[subject])) {
    quarterlyAcademicPlaceholders[subject][quarter] = sortByCanonicalType(
      quarterlyAcademicPlaceholders[subject][quarter],
      ACADEMIC_ASSIGNMENT_TYPES
    );
  }
}

export const ACADEMIC_SUBJECT_ORDER = [
  'aerospace',
  'technology',
  'socialStudies',
  'science',
  'pe',
  'reading',
  'math'
];

export { READING_QUARTERS as ACADEMIC_SUCCESS_CENTER_QUARTER_ORDER };
