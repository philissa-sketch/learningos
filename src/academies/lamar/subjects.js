/**
 * Explicit subject status, replacing the old approach of deriving "what
 * subjects exist" purely from which lessons happen to be in the data.
 * That approach couldn't express "this subject is archived but its data
 * should stay" or "this subject is planned but has no lessons yet" — both
 * of which matter now that Math/Reading/Writing/Science are archived in
 * favor of Khan Academy (see PROJECT_PLAN.md Part 0) while Mission
 * Control's own curriculum for Aerospace, Technology, and future subjects
 * continues.
 *
 * ACTIVE: Mission Control currently teaches these directly — they drive
 * Today's Mission, the Lesson Roster, and the Cumulative Review pool.
 *
 * ARCHIVED: superseded by Khan Academy. Lesson data and code stay in the
 * repo (never deleted), but these are removed from the active
 * student-facing flow. Parent-facing historical views (Gradebook, Report
 * Card, Notes, Portfolio) still surface them, since he genuinely did that
 * work and it shouldn't disappear from his records.
 */
// 'robotics' added Aug 8, 2026. A Q4-only course that takes over Technology's
// Tuesday/Thursday slot as Technology finishes — the two never run in the same
// quarter, so the parent's "no more than two specialized subjects a day" rule
// holds even though those weekdays now name three subjects. See the comment in
// data/schedule/weekPattern.js and the per-quarter check in
// scripts/verify-curriculum.mjs, which counts LIVE subjects rather than names.
export const ACTIVE_SUBJECTS = ['aerospace', 'technology', 'socialStudies', 'pe', 'robotics'];

/**
 * SUBJECTS TAUGHT ON KHAN ACADEMY, NOT SUBJECTS THAT ENDED.
 *
 * This list used to be called ARCHIVED_SUBJECTS, and the Parent Dashboard
 * printed "(Archived)" after each of these three names in six different
 * dropdowns. The parent: "They say archived. That needs to be removed."
 *
 * She is right, and it was worse than untidy. These three are **Mathematics,
 * English Language Arts and Science** -- three of the five subjects Georgia
 * names, the ones he spends most of every school day on, and the ones whose
 * grades a reviewer will look for first. What is retired is the app's own
 * lesson track for them; the SUBJECTS are the most active thing on his
 * timetable.
 *
 * A records screen calling them archived is not a label problem. It is the
 * records screen saying something false about the core of his education.
 *
 * `academicUi.js` had this right from the start -- it renders these as
 * "(Khan Academy)". The name follows that now, so nothing can call them
 * archived again without renaming this constant first.
 */
export const KHAN_TAUGHT_SUBJECTS = ['math', 'reading', 'science'];

/**
 * Subjects that belong on his record but are recorded by PARTICIPATION
 * rather than by grade.
 *
 * PE & Nutrition has no lessons and no assessments, deliberately: it is a
 * daily workout program, a nutrition library and a set of trackers. Until
 * Aug 8, 2026 that meant it was missing from the report card, the transcript
 * and the compliance packet entirely — getSubjects() builds the record list
 * by walking the lessons, and a subject with no lessons fell out before
 * anything was drawn. He was doing it every day and none of it counted.
 *
 * Hand-listed on purpose. Deriving this as "active subjects with no lessons"
 * would mean adding Gardening to ACTIVE_SUBJECTS before writing its lessons
 * silently put an empty Gardening line on his transcript. A subject earns a
 * participation row by decision.
 *
 * These are NOT added to getSubjects(). That getter drives his home screen's
 * missions and the Lesson Roster, where a lesson-less subject is a broken row.
 */
export const PARTICIPATION_SUBJECTS = ['pe', 'gardening', 'guitar'];

/**
 * 'guitar' added Aug 8, 2026, and — like gardening — DELIBERATELY NOT added to
 * ACTIVE_SUBJECTS. The decision was put to the parent explicitly before a single
 * data file was written, and she chose participation.
 *
 * THE TRAP THIS AVOIDS, stated plainly because it is silent when it fires:
 * Electric Guitar has four short theory readings this quarter. If those readings
 * were built as rows in allLessons, getSubjects() would pick Guitar up
 * automatically, it would become a GRADED subject, and his Electric Guitar grade
 * would be computed from four theory questions — a letter on his transcript that
 * says nothing whatsoever about whether the boy can play the guitar.
 * verify-curriculum.mjs would also, correctly, start demanding ten questions and
 * per-wrong-answer choiceFeedback on each of them, which is the wrong shape for a
 * four-minute reading.
 *
 * So the theory lives in data/guitar/guitarTheory.js, OUTSIDE allLessons, and
 * scripts/verify-guitar.mjs asserts that zero-rows property directly so it
 * cannot drift back.
 *
 * There is a second, harder reason participation is not a consolation prize
 * here. THE APP CANNOT HEAR HIM. It cannot judge tone, timing or a collapsing
 * wrist. A grade would therefore have to be computed from the only things the
 * app CAN see — how many times he practised — and calling that a performance
 * grade would be a lie about what was measured. Counting the sessions and
 * calling them sessions is the honest version of the same record.
 */

/**
 * 'gardening' added Aug 8, 2026, and DELIBERATELY NOT added to
 * ACTIVE_SUBJECTS above. That is the whole design decision, so it is worth
 * being explicit about what each list does.
 *
 * ACTIVE_SUBJECTS drives getSubjects(), which walks the LESSONS. A subject in
 * that list is expected to have lesson rows carrying quarters, ten questions,
 * choiceFeedback and a mastery threshold — and verify-curriculum.mjs enforces
 * exactly that. Gardening has no lessons and never will: it is Friday work in
 * a real 4 ft x 8 ft bucket garden, recorded by what he did.
 *
 * Putting it in ACTIVE_SUBJECTS would therefore do three bad things at once —
 * an empty Gardening line on his transcript reading 0/0 mastered, Gardening
 * rows in Today's Mission and the Lesson Roster with nothing behind them, and
 * a failing curriculum suite. The note directly above this block predicted
 * that outcome by name before Gardening existed. It was right.
 *
 * PARTICIPATION_SUBJECTS is the correct list: getAllSubjectsForRecordkeeping()
 * appends it, so Gardening reaches the report card, the transcript and the
 * compliance packet as a participation row, and reaches nothing student-facing
 * that expects a lesson. Its written work IS graded — through the Writing
 * Journal, via data/gardening/gardenProjects.js.
 */

/**
 * MERGED August 6, 2026, at the parent's request: "I would like Reading
 * and Language Arts to be merged. There aren't many lessons in Language
 * Arts."
 *
 * She was right about the imbalance — Reading carried 40 lessons to
 * Writing's 19, and on the Khan Academy side Writing thinned from 12
 * assignments in Q1 to a single one in Q2 and Q3 and none in Q4. Two
 * subjects where one had almost nothing in it made the report card read
 * worse than the work actually was.
 *
 * `reading` is the surviving id and `writing` is retired as a SUBJECT.
 * Keeping the id that already carried two-thirds of the lessons meant
 * renaming 19 lesson entries instead of 40, and every stored row that
 * referenced the old subject is migrated in the Dexie upgrade (see
 * db.js v21) rather than left pointing at a subject that no longer
 * exists.
 *
 * IMPORTANT, and easy to get wrong: the Writing Journal is a separate
 * FEATURE (writingEntries, writingPrompts, WritingPromptEngine) and is
 * untouched by this. Only the school subject merged.
 */
export const RETIRED_SUBJECT_MERGES = { writing: 'reading' };

/**
 * The formal name — report card, transcript, course descriptions,
 * compliance packet. "English Language Arts" is what an admissions
 * office expects to read, and it covers both of the things Georgia's
 * statute names separately ("reading" and "language arts").
 */
export const SUBJECT_LABELS = {
  math: 'Mathematics',
  reading: 'English Language Arts',
  science: 'Science',
  aerospace: 'Aerospace Engineering',
  technology: 'Technology & Computer Science',
  socialStudies: 'Social Studies',
  pe: 'PE & Nutrition',
  robotics: 'Robotics & Automation',
  gardening: 'Gardening & Applied Engineering',
  guitar: 'Electric Guitar'
};

/**
 * What Lamar sees on a card, where "English Language Arts" is stiff and
 * says less about what he's actually doing today. The parent asked for
 * exactly this split: the formal name on the records, the plainer one on
 * the card.
 *
 * Only subjects that genuinely need a friendlier name appear here;
 * everything else falls through to SUBJECT_LABELS, so this never becomes
 * a second list to keep in sync.
 */
export const SUBJECT_CARD_LABELS = {
  // Aug 7, 2026 — the parent: "it has Reading, Language arts & Writing Journal
  // separate. How does that work because on mission control it page it is all
  // together." "Language Arts and Reading" was the cause: it sat on the Khan
  // row, whose Q1 units are ALL grammar (parts of speech, punctuation, verb
  // tenses), and implied that row also covered the 10:00 independent-reading
  // block. It did not. Reading a novel and studying grammar only share a
  // subject code because Writing merged into Reading on Aug 6.
  //
  // The formal name on records and transcripts stays "English Language Arts"
  // (SUBJECT_LABELS above) — unchanged, because that IS the umbrella subject.
  // This is only what a row on his screen is called, and a row should be
  // called after the work it opens.
  reading: 'Language Arts',
  // Typing is not a transcript subject — it is a daily 15-minute habit block
  // (block-5b, 11:15) with a row on his home screen. It needs a card label and
  // nothing else.
  typing: 'Typing',
  gardening: 'Garden',
  guitar: 'Guitar'
};

/** The student-facing name, falling back to the formal one. */
export function subjectCardLabel(subject) {
  return SUBJECT_CARD_LABELS[subject] || SUBJECT_LABELS[subject] || subject;
}

/**
 * Strands — a subject that carries two genuinely different skills inside
 * one transcript line.
 *
 * Added August 6, 2026 from the parent's question: *"Should I still have
 * a separate test for Language Arts because he is weak in that area?"*
 * The right answer was yes to separate MEASUREMENT and no to separate
 * SUBJECT, and this is what makes that possible.
 *
 * The problem it solves is specific and easy to miss: an 80% that is
 * 95/65 and an 80% that is 80/80 look identical on a report card and
 * mean completely different things about what he needs Tuesday morning.
 * Merging Reading and Language Arts was right for the transcript and
 * would have been wrong if it also merged the diagnosis.
 *
 * So: ONE grade on the record, TWO numbers where decisions get made.
 * A lesson with no strand simply doesn't appear in a breakdown, which is
 * why every other subject needs no changes at all.
 */
/**
 * THE LABELS COLLIDED WITH THE SUBJECT'S OWN NAME. (Aug 10, 2026.)
 *
 * The parent, sending a screenshot of her son's grades screen: "What is this?"
 *
 *     Language Arts                    B 80%
 *       1 Khan unit graded
 *       Reading                   Not started
 *       Language Arts             Not started
 *
 * A subject called Language Arts, containing a strand called Language Arts.
 * The ids were fine -- the LABELS were the two halves named after the two
 * things that had been merged, which stopped making sense the moment the
 * merged subject took one of those names on his screen.
 *
 * Named after the work now, which is also more useful: "Grammar & Writing" is
 * something he can go and practise. The ids are untouched, because every
 * lesson in the curriculum carries `strand: 'reading'` or
 * `strand: 'language-arts'` and renaming those would silently unfile them.
 */
export const SUBJECT_STRANDS = {
  reading: [
    { id: 'reading', label: 'Reading & Literature' },
    { id: 'language-arts', label: 'Grammar & Writing' }
  ]
};

export function strandsForSubject(subject) {
  return SUBJECT_STRANDS[subject] || [];
}

export function strandLabel(subject, strandId) {
  return strandsForSubject(subject).find((s) => s.id === strandId)?.label || strandId;
}

/** Map a retired subject id onto the one that absorbed it. */
export function canonicalSubject(subject) {
  return RETIRED_SUBJECT_MERGES[subject] || subject;
}

// Registered as one combined full-year subject ("PE & Nutrition", id `pe`),
// not two separate subjects — a confirmed scope decision with the parent.
// PE (fitness/workouts/body-metric tracking) and Nutrition (food
// education/trackers/recipes) share this one subject id and one 36-week
// content budget, with two content tracks inside it. See
// docs/PROJECT_LOG.md's PE & Nutrition build entry and PROJECT_PLAN.md
// Part 4's Physical Education/Nutrition sections.

export function isKhanTaughtSubject(subject) {
  return KHAN_TAUGHT_SUBJECTS.includes(subject);
}

/**
 * A Khan-taught subject that ALSO has a live Mission Control lesson track.
 *
 * English Language Arts is both, and until Aug 10 2026 it was served as
 * neither: the Khan grammar units ran in the 12:30 block, and the forty
 * Reading & Literature lessons -- Bessie Coleman, Mae Jemison, Hidden Figures,
 * Guion Bluford, Annie Easley, main idea, inference, context clues -- were
 * unreachable. `getSubjects()` walks ACTIVE_SUBJECTS, `reading` is not in it,
 * so those forty appeared in neither the Lesson Roster nor a daily mission.
 *
 * The parent's report card read "Reading 0/40 mastered". Not 0 because he was
 * behind: 0 because he had never been shown one.
 *
 * They are not added to ACTIVE_SUBJECTS, because that list also decides which
 * subject can take the rotating 2:15 block and which are grouped as
 * Khan-taught -- both of which stay true. This is the narrower fact: the
 * subject has lessons that should be offered.
 */
export const LESSON_TRACK_SUBJECTS = ['reading'];
