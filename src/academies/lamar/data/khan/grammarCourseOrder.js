// ---------------------------------------------------------------------------
// KHAN ACADEMY'S GRAMMAR COURSE, IN KHAN ACADEMY'S OWN ORDER.
// (Built Aug 9, 2026, after the parent reported: "language arts isnt starting
// at the beginning of the units. it is starting at unit 3 instead of unit 1.")
//
// ---- THE BUG THIS FILE EXISTS TO PREVENT ----
//
// Q1 Language Arts is Khan's general Grammar course (10 units), chosen from
// the Aug 7 IXL diagnostic because Grammar & Mechanics is his weakest strand
// at 440-500. The app had all ten units — but not in Khan's order.
//
// Nine of them were seeded together as one block (`writingQ1Rows`) and
// numbered 1-9. The tenth, "Parts of speech: the verb", had been seeded
// SEPARATELY and much earlier, as one of the two legacy rows taken straight
// from the IXL report, under the title "Verb tenses, including the perfect
// tenses" — which is what IXL called it, not what Khan calls it. When the Aug 7
// placement was written, those two legacy rows were appended to the end of Q1
// at slots 10 and 11 rather than being merged back into the course's own
// sequence.
//
// So the quarter ran: noun (Khan unit 1) -> pronoun (Khan unit 3) -> modifier
// (Khan unit 4) ... and the verb, Khan's unit 2, sat at the very end of the
// quarter, after usage and style.
//
// That is what the parent saw. It is not cosmetic:
//
//   - Khan's order is pedagogical, not alphabetical. The verb comes second
//     because almost everything after it depends on it. "Syntax: sentences and
//     clauses" and "Syntax: conventions of standard English" both assume verbs;
//     so does subject-verb agreement inside "Usage and style". Doing the verb
//     LAST means eight units taught on top of a gap.
//   - IXL's single most specific recommendation for his weakest strand was
//     "Use the perfect verb tenses". The app had it scheduled for the end of
//     October.
//   - He clicks straight through to Khan. Being on the app's unit 2 while Khan
//     shows unit 3 is the kind of mismatch that quietly teaches a twelve-year-
//     old that the app does not know what it is talking about.
//
// ---- WHY A FILE, AND NOT JUST A CORRECTED NUMBER ----
//
// The number was wrong in THREE places at once — `q1RestructureMap`,
// `elaSequenceMap` and `elaPlacementMap` in useAppStore all set Q1 sequences,
// each overriding the last. Correcting one and not the others produces two
// maps that disagree and rewrite each other on every startup.
//
// So the order lives here, once, keyed by the Khan URL slug the row already
// carries — which is the only identifier that cannot drift, because it IS the
// page the student opens. `scripts/verify-ela-sequence.mjs` checks the store's
// placement against this file and fails if they ever disagree again.
// ---------------------------------------------------------------------------

/**
 * The ten units of khanacademy.org/humanities/grammar, in course order.
 *
 * Keyed by the last path segment of the unit URL. `appTitle` is what the row
 * is called in this app — identical to Khan's for nine of them, and different
 * for the verb, which was named from the IXL report before anyone noticed it
 * was the same unit.
 */
export const KHAN_GRAMMAR_UNITS = [
  { unit: 1, slug: 'parts-of-speech-the-noun', khanTitle: 'Parts of speech: the noun', appTitle: 'Parts of speech: the noun' },
  {
    unit: 2,
    slug: 'parts-of-speech-the-verb',
    khanTitle: 'Parts of speech: the verb',
    // The name the row was SEEDED with, taken from the IXL Diagnostic Action
    // Plan ("Use the perfect verb tenses") rather than from Khan. That is what
    // hid the ordering bug: under this name it reads as a remedial skill, not
    // as Khan's unit 2, so it was filed with the other remedial skill and
    // appended to the end of the quarter.
    //
    // As of Aug 9, 2026 `canonicalGrammarTitle` renames it to `khanTitle` on
    // hydrate. `appTitle` is kept as the LEGACY name so the placement maps and
    // the de-duplication pass can still recognise a row that has not been
    // through that rename yet — an old backup, an import from the other
    // computer, a database written by an earlier build.
    appTitle: 'Verb tenses, including the perfect tenses',
    legacyTitle: 'Verb tenses, including the perfect tenses'
  },
  { unit: 3, slug: 'parts-of-speech-the-pronoun', khanTitle: 'Parts of speech: the pronoun', appTitle: 'Parts of speech: the pronoun' },
  { unit: 4, slug: 'parts-of-speech-the-modifier', khanTitle: 'Parts of speech: the modifier', appTitle: 'Parts of speech: the modifier' },
  { unit: 5, slug: 'parts-of-speech-the-preposition-and-the-conjunction', khanTitle: 'Parts of speech: the preposition and the conjunction', appTitle: 'Parts of speech: the preposition and the conjunction' },
  { unit: 6, slug: 'punctuation-the-comma-and-the-apostrophe', khanTitle: 'Punctuation: the comma and the apostrophe', appTitle: 'Punctuation: the comma and the apostrophe' },
  { unit: 7, slug: 'punctuation-the-colon-semicolon-and-more', khanTitle: 'Punctuation: the colon, semicolon, and more', appTitle: 'Punctuation: the colon, semicolon, and more' },
  { unit: 8, slug: 'syntax-sentences-and-clauses', khanTitle: 'Syntax: sentences and clauses', appTitle: 'Syntax: sentences and clauses' },
  { unit: 9, slug: 'syntax-conventions-of-standard-english', khanTitle: 'Syntax: conventions of standard English', appTitle: 'Syntax: conventions of standard English' },
  { unit: 10, slug: 'usage-and-style', khanTitle: 'Usage and style', appTitle: 'Usage and style' }
];

/**
 * The one Q1 unit that is NOT part of the Grammar course.
 *
 * "Roots, prefixes, and suffixes" is a sub-skill of the 5th-grade Reading &
 * Vocabulary course, seeded from the IXL report because it covers IXL's
 * "Spell words with prefixes dis-, mis-, pre-" recommendation. It has no place
 * in the Grammar course's numbering, so it sits after all ten — position 11,
 * where it already was.
 */
export const Q1_NON_GRAMMAR_TAIL = ['Roots, prefixes, and suffixes'];

/**
 * The Q1 Language Arts order: Khan's ten grammar units in Khan's order, then
 * the vocabulary sub-skill. This is the single source the store's placement
 * map and the verification guard both read.
 */
export const Q1_ELA_ORDER = [
  // Khan's own titles — the names the rows carry after the hydrate rename,
  // and the names on the pages he opens.
  ...KHAN_GRAMMAR_UNITS.map((u) => u.khanTitle),
  ...Q1_NON_GRAMMAR_TAIL
];

/**
 * Every legacy title a grammar unit may still be wearing, mapped to Khan's.
 *
 * A row can reach this app under an old name from three directions: a database
 * written by an earlier build, a progress import from the other computer, or a
 * backup restored months from now. The rename pass in hydrate is keyed on the
 * URL and does not need this — but the title-keyed placement maps and the
 * de-duplication pass do, so an un-renamed row is still recognised as the same
 * unit rather than quietly becoming a twelfth one.
 */
export const LEGACY_GRAMMAR_TITLES = Object.fromEntries(
  KHAN_GRAMMAR_UNITS.filter((u) => u.legacyTitle).map((u) => [u.legacyTitle, u.khanTitle])
);

/** The whole unit record for a URL, or null if it is not a Grammar-course unit. */
/**
 * ===========================================================================
 * KHAN'S GRADE-LEVEL GRAMMAR COURSE. (Audit item O-2, Aug 25, 2026.)
 * ===========================================================================
 *
 * ---- WHY THIS EXISTS ----
 *
 * The parent: **"Add the kahn academy work assignments."**
 *
 * Q1 teaches Khan's GENERAL Grammar course — ten units, all of them consumed
 * by the end of October. When this app was built in August 2026 that course
 * was the only grammar Khan had, so from November there was simply no more
 * grammar to assign, and the 12:30 Language Arts block ran on the daily
 * writing drill alone.
 *
 * That is no longer true. Khan added grade-banded grammar courses for grades
 * 5-10 in its summer 2026 back-to-school rollout, announced June 8, 2026 —
 * **after** this app's roster was written. One of them is aimed squarely at
 * him: `Grammar: 7th and 8th grade`, nine units, 74 skills, described by Khan
 * as covering "essential grammar skills and standards taught in 7th and 8th
 * grade in all 50 states."
 *
 * His weakest strand on the IXL diagnostic was Grammar & Mechanics at 440-500.
 * A second pass through the same territory at grade level, after a
 * foundational quarter, is the right answer for the strand he is behind in.
 *
 * ---- EVERY SLUG BELOW WAS READ OFF THE LIVE COURSE PAGE ----
 *
 * Opened in the browser on 2026-08-25 with her approval, and the nine unit
 * links were read out of the rendered page. NOTHING HERE IS INFERRED FROM THE
 * PATTERN, even though the pattern is obvious — the same week, a guessed
 * JustinGuitar URL in the guitar ladder would have been `bg-1207` when the
 * real one is `bg-1203`. A guessed link looks perfectly plausible in review
 * and 404s the first day he clicks it.
 *
 * ---- WHY IT HAD TO BE ADDED HERE AND NOT ONLY TO THE SEED ----
 *
 * `khanReadingStrand()` decides which timetable block a Khan ELA row credits,
 * and it decides BY URL through this function. Grammar goes to block-7 (12:30
 * Language Arts, 60 minutes); reading goes to block-3 (10:00 Reading Lesson,
 * 15 minutes). Seeding these rows without teaching this function to recognise
 * them would have booked a grade-level grammar unit as fifteen minutes of
 * reading — which is the exact fault this audit item is about, recreated
 * inside its own fix.
 */
export const KHAN_G78_GRAMMAR_COURSE = '/ela/7th-and-8th-grade-grammar';

/**
 * ===========================================================================
 * THE GRADE 5-6 COURSE, AND THE BUG THAT MADE THIS FILE GROW UP. (Aug 28, 2026.)
 * ===========================================================================
 *
 * The parent, looking at his 12:30 row: *"He clicked the link and it took him
 * to 7th Grade Nouns with 15 units left this qtr."*
 *
 * ---- WHAT I BROKE ON AUG 25 ----
 *
 * `khanGrammarUnitByUrl` was taught to recognise the grade 7-8 course so those
 * rows would credit block-7 instead of block-3. I did not check who else
 * called it. **Hydrate pass (a2) does**, and pass (a2) does this:
 *
 *     const unit = khanGrammarUnitByUrl(a.khanAcademyUrl) || ...
 *     const target = { skillTitle: unit.khanTitle,
 *                      batchLabel: 'Q1 2026-2027',   // <- hardcoded
 *                      sequenceInQuarter: unit.unit };
 *
 * That pass was written in August for the general course, when "every grammar
 * unit belongs in Q1" was a true sentence. Widening the matcher made it false
 * and left the hardcoded label behind. So on EVERY app start all ten grade 7-8
 * rows were dragged out of Q2-Q4 into Q1, renamed to bare Khan titles, and
 * numbered 1-9 — on top of the general course's own units 1-10. A tie at
 * sequence 1 decided what he was handed, and he was handed Nouns.
 *
 * It also re-seeded: the seeder looks for the row under its SEEDED title in
 * Q2, the rename had made that title unfindable, so it created the row again
 * every single load. The exact trap `khan-ela-restructure-risk.md` describes.
 *
 * ---- THE RULE THIS FILE NOW ENFORCES ----
 *
 * **A course-scoped question gets a course-scoped matcher.** `khanGrammarUnitByUrl`
 * answers "is this grammar at all" — that is the block-routing question, and it
 * is right for all three courses. `generalGrammarUnitByUrl` answers "is this a
 * unit of the ONE course Q1 teaches", and that is the only question pass (a2)
 * was ever asking. Two questions, two functions.
 *
 * **And one title function.** `grammarRowTitle` is used by the seeder AND by
 * `canonicalGrammarTitle`. They cannot disagree, because they are the same
 * code — which is what stops the re-seed loop above from ever coming back.
 *
 * ---- WHY THE 5-6 COURSE, WHEN SHE ASKED FOR 6TH ----
 *
 * The parent: *"I need the 5th grade links put back where they were. I also
 * want the 6th grade added for Qtr 2 and 7th and grade for qtr 3 and 4 and if
 * its not full for qtr 4 add 8th grade."*
 *
 * Khan does not publish a standalone 6th-grade grammar course. Its summer 2026
 * rollout is banded in PAIRS — 5th-and-6th, 7th-and-8th, 9th-and-10th — and the
 * help centre says the complexity rises across each band. So `Grammar: 5th and
 * 6th grade` IS the 6th-grade rung, and the 8th grade she wants in Q4 is the
 * back half of the 7-8 course, not a separate one.
 *
 * EVERY slug below was read off the live course page on 2026-08-28, including
 * all three course-challenge URLs. Nothing here is inferred from the pattern,
 * even though the pattern is obvious — the same rule that caught a guessed
 * JustinGuitar link that would have been wrong by four digits.
 */
export const KHAN_G56_GRAMMAR_COURSE = '/ela/5th-and-6th-grade-grammar';

export const KHAN_G56_GRAMMAR_UNITS = [
  { unit: 1, slug: 'x90cef5375e9bcad6:nouns-5', khanTitle: 'Nouns' },
  { unit: 2, slug: 'x90cef5375e9bcad6:pronouns-5', khanTitle: 'Pronouns' },
  { unit: 3, slug: 'x90cef5375e9bcad6:verbs-5', khanTitle: 'Verbs' },
  { unit: 4, slug: 'x90cef5375e9bcad6:adjectives-and-adverbs-5', khanTitle: 'Adjectives and adverbs' },
  { unit: 5, slug: 'x90cef5375e9bcad6:prepositions-and-interjections-5', khanTitle: 'Prepositions and interjections' },
  { unit: 6, slug: 'x90cef5375e9bcad6:sentences-clauses-and-phrases-5', khanTitle: 'Sentences, clauses, and phrases' },
  { unit: 7, slug: 'x90cef5375e9bcad6:punctuation-and-capitalization-5', khanTitle: 'Punctuation and capitalization' },
  { unit: 8, slug: 'x90cef5375e9bcad6:word-study-5', khanTitle: 'Word study' },
  { unit: 9, slug: 'x90cef5375e9bcad6:style-and-tone-5', khanTitle: 'Style and tone' }
];

export const KHAN_G56_GRAMMAR_CHALLENGE = '/ela/5th-and-6th-grade-grammar/test/x90cef5375e9bcad6:course-challenge';

/**
 * The general course's challenge — the one he has ALREADY STARTED.
 *
 * Read off the live page on 2026-08-28, where the button reads "Resume Course
 * challenge". It had no row in this app at all, so the test he is sitting
 * right now reached no grade and appeared on no record. The parent's rule,
 * stated when the Khan gradebook was designed and never fully implemented:
 * **"Unit tests and Course Challenges is what would be graded."**
 */
export const KHAN_GENERAL_GRAMMAR_CHALLENGE = '/humanities/grammar/test/x00307e86:course-challenge';

export const KHAN_G78_GRAMMAR_UNITS = [
  { unit: 1, slug: 'x9e6f4267f632f2c6:nouns-7', khanTitle: 'Nouns' },
  { unit: 2, slug: 'x9e6f4267f632f2c6:pronouns-7', khanTitle: 'Pronouns' },
  { unit: 3, slug: 'x9e6f4267f632f2c6:verbs-7', khanTitle: 'Verbs' },
  { unit: 4, slug: 'x9e6f4267f632f2c6:adjectives-and-adverbs-7', khanTitle: 'Adjectives and adverbs' },
  { unit: 5, slug: 'x9e6f4267f632f2c6:prepositions-and-interjections-7', khanTitle: 'Prepositions and interjections' },
  { unit: 6, slug: 'x9e6f4267f632f2c6:sentences-clauses-and-phrases-7', khanTitle: 'Sentences, clauses, and phrases' },
  { unit: 7, slug: 'x9e6f4267f632f2c6:punctuation-and-capitalization-7', khanTitle: 'Punctuation and capitalization' },
  { unit: 8, slug: 'x9e6f4267f632f2c6:word-study-7', khanTitle: 'Word study' },
  { unit: 9, slug: 'x9e6f4267f632f2c6:style-and-tone-7', khanTitle: 'Style and tone' }
];

/** The course challenge, which is a test rather than a unit. */
export const KHAN_G78_GRAMMAR_CHALLENGE = '/ela/7th-and-8th-grade-grammar/test/x9e6f4267f632f2c6:course-challenge';

/**
 * THE THREE GRAMMAR COURSES, IN THE ORDER HE MEETS THEM.
 *
 * `label` is what distinguishes a row on screen and in the record. It is not
 * decoration: **the 5-6 and 7-8 courses use IDENTICAL unit titles** — both have
 * a "Nouns", a "Pronouns", a "Verbs", all nine the same. Without the label he
 * would meet "Nouns" twice in one year with nothing on the row to say which,
 * and the de-duplication pass — which keys on `subject|skillTitle|batchLabel` —
 * would be one quarter boundary away from collapsing two different units into
 * one. `verify-grammar-ladder.mjs` asserts the titles collide, so that this
 * comment cannot quietly stop being true.
 *
 * The general course takes no label: its units already have distinct names
 * ("Parts of speech: the noun"), and its rows carry his grades. Renaming a row
 * he has been graded on is how you lose a grade.
 */
export const GRAMMAR_COURSES = {
  general: {
    id: 'general',
    path: '/humanities/grammar',
    label: null,
    gradeLevel: '5th',
    challengePath: KHAN_GENERAL_GRAMMAR_CHALLENGE,
    challengeTitle: 'Grammar — Course Challenge (foundations)',
    units: KHAN_GRAMMAR_UNITS
  },
  g56: {
    id: 'g56',
    path: KHAN_G56_GRAMMAR_COURSE,
    label: '5th-6th grade grammar',
    gradeLevel: '6th',
    challengePath: KHAN_G56_GRAMMAR_CHALLENGE,
    challengeTitle: 'Grammar — Course Challenge (5th-6th grade)',
    units: KHAN_G56_GRAMMAR_UNITS
  },
  g78: {
    id: 'g78',
    path: KHAN_G78_GRAMMAR_COURSE,
    label: '7th-8th grade grammar',
    gradeLevel: '7th-8th',
    challengePath: KHAN_G78_GRAMMAR_CHALLENGE,
    challengeTitle: 'Grammar — Course Challenge (7th-8th grade)',
    units: KHAN_G78_GRAMMAR_UNITS
  }
};

/** Full URL for any grammar unit, built from the slug read off the live page. */
export function grammarUnitUrl(courseId, slug) {
  const course = GRAMMAR_COURSES[courseId];
  if (!course) throw new Error('grammarUnitUrl: unknown grammar course "' + courseId + '"');
  return 'https://www.khanacademy.org' + course.path + '/' + slug;
}

/** Full URL for a grade 7-8 grammar unit. Kept for callers that predate the registry. */
export function g78GrammarUrl(slug) {
  return grammarUnitUrl('g78', slug);
}

/**
 * THE ONE PLACE A GRAMMAR ROW'S TITLE IS DECIDED.
 *
 * Used by the seeder AND by `canonicalGrammarTitle`. They cannot drift, because
 * they are the same function — and drift between those two is precisely what
 * made the app re-create nine rows on every single startup for three days.
 */
export function grammarRowTitle(courseId, khanTitle) {
  const course = GRAMMAR_COURSES[courseId];
  if (!course) throw new Error('grammarRowTitle: unknown grammar course "' + courseId + '"');
  return course.label ? khanTitle + ' (' + course.label + ')' : khanTitle;
}

/**
 * Is this URL a grammar unit — from ANY of the three courses?
 *
 * This answers the BLOCK-ROUTING question: all grammar belongs to the 12:30
 * Language Arts block, whichever course it came from. It deliberately does NOT
 * answer "which quarter" — see `generalGrammarUnitByUrl` below.
 */
export function khanGrammarUnitByUrl(url) {
  if (!url) return null;
  const str = String(url);
  for (const course of Object.values(GRAMMAR_COURSES)) {
    const hit = course.units.find((u) => str.includes(course.path + '/' + u.slug));
    if (hit) return { ...hit, course: course.id, title: grammarRowTitle(course.id, hit.khanTitle) };
    // A course challenge is grammar too, and it is where the course ends.
    if (str.includes(course.challengePath)) {
      return {
        unit: 99,
        slug: 'course-challenge',
        khanTitle: course.challengeTitle,
        title: course.challengeTitle,
        course: course.id,
        isCourseChallenge: true
      };
    }
  }
  return null;
}

/**
 * Is this URL a unit of the GENERAL Grammar course — the one Q1 teaches?
 *
 * Narrow on purpose. Hydrate pass (a2) places whatever this returns into Q1 at
 * Khan's unit number, and that is only ever correct for this one course. When
 * the wide matcher above was handed to that pass, it dragged all ten grade 7-8
 * rows out of Q2-Q4 and into Q1 on every app start.
 *
 * **If you widen this function, you are moving units between quarters.** That
 * is a schedule change, not a lookup change.
 */
export function generalGrammarUnitByUrl(url) {
  if (!url) return null;
  const str = String(url);
  return KHAN_GRAMMAR_UNITS.find((u) => str.includes('/humanities/grammar/' + u.slug)) || null;
}

/** Khan's unit number for a row, from the URL it links to. Null if not a Grammar unit. */
export function khanGrammarUnitForUrl(url) {
  const unit = khanGrammarUnitByUrl(url);
  return unit ? unit.unit : null;
}

/**
 * ---- THE TITLE IS NOT A RELIABLE KEY. THE URL IS. ----
 *
 * Added Aug 9, 2026, immediately after the order fix, when the parent said of
 * the verb unit: "it looks like it was already renamed."
 *
 * Nothing in the code renames it — the seed still calls it "Verb tenses,
 * including the perfect tenses". But a title can differ from the seed for
 * reasons the code cannot see: a database written by an older build, a row
 * that arrived in an import from the other computer, a hand edit. And the
 * placement maps in useAppStore are keyed on the TITLE, so a row wearing any
 * other name is silently skipped — the fix appears to ship and changes
 * nothing, which is the worst possible outcome and impossible to notice.
 *
 * So the ten grammar units are matched on their Khan URL instead. A URL cannot
 * drift, because it IS the page the student opens: if the row opens
 * `/humanities/grammar/parts-of-speech-the-verb`, it is Khan's unit 2, whatever
 * anybody has called it.
 *
 * `canonicalGrammarTitle` then settles the naming question for good. Every row
 * that opens a grammar unit takes Khan's own title for it. That is safe for the
 * two-computer merge — which matches on `subject|skillTitle|batchLabel` —
 * precisely BECAUSE it is deterministic and runs in hydrate on both machines:
 * they converge on the same name before any export/import between them, rather
 * than one being renamed and the other not. The de-duplication pass then
 * collapses any pair that had been living under two names.
 */
export function canonicalGrammarTitle(url, currentTitle) {
  const unit = khanGrammarUnitByUrl(url);
  // `unit.title` comes from grammarRowTitle — the SAME function the seeder
  // uses. Returning `unit.khanTitle` here instead is what re-created nine rows
  // on every startup: the rename stripped the course label, the seeder then
  // could not find the row it had just written, and added it again.
  return unit ? unit.title : currentTitle;
}

/** Q1 order expressed as Khan slugs, for the ten grammar units. */
export const Q1_GRAMMAR_SLUG_ORDER = KHAN_GRAMMAR_UNITS.map((u) => u.slug);
