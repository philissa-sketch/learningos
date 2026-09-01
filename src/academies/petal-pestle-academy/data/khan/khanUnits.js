// ---------------------------------------------------------------------------
// THE REAL KHAN UNITS, WITH THE LINK THAT OPENS EACH ONE.
//
// Gigi, Aug 16 2026: "Every unit, Unit 1 through the last unit of each course
// she is in, with the correct, verified Khan link for that unit — not just a
// link to the course front page."
//
// ---- HOW EVERY LINE IN THIS FILE WAS OBTAINED ----
//
// Each unit below was read off Khan Academy's OWN RENDERED COURSE PAGE in
// Gigi's browser on Aug 16 2026, together with its unit test. Not from a search
// result, not from memory, not from the old unit names in khanMap.js.
//
// That distinction is not pedantry. Searching Khan for "2nd grade math units"
// returns a MIXTURE of two eras — cc-2nd-measurement-data (old) alongside
// x3184e0ec:geometry (new) — because Khan reorganised the course and search
// still indexes both. Only the rendered page knows which list is current.
//
// ---- WHY A CHECK CANNOT VERIFY THESE ARE ALIVE, AND MUST NOT CLAIM TO ----
//
// This file exists because khanMap.js shipped a DEAD URL for months:
// /math/cc-second-grade-math returns "Oops! Page not found". Her Geometry and
// Measurement both measured at the floor of 2nd grade, so that was the course
// her plan sent her to most, and the Maths block opened an error page.
//
// Nothing caught it, and nothing automatic ever could:
//
//   * Khan serves HTTP **200** for the dead URL and renders "Page not found"
//     afterwards, in JavaScript. A status check passes.
//   * The served HTML's <title> is byte-identical to a working course, so
//     reading the shell does not help either.
//   * Khan's public API is GONE — /api/v1/topic/<slug> answers
//     "410 API removed". There is no endpoint left to ask.
//
// So scripts/check-khan-units.mjs asserts SHAPE and PROVENANCE — that a unit
// link is never a bare course front page, that every entry carries the date it
// was confirmed, that numbering is 1..n with no gaps — and it says out loud
// that it cannot test whether Khan still serves the page. A check must never
// claim more than it tests. Re-confirming these links is a browser job for a
// human or an agent with a browser, and `confirmedOn` is how you tell when it
// was last done.
//
// ---- TWO DIFFERENT CLAIMS, AND THEY ARE NOT THE SAME CLAIM ----
//
//   confirmedOn  the unit NAME, NUMBER and SLUG were read off Khan's own
//                rendered course page.
//   renderedOn   the assembled URL below was opened in a real browser and the
//                page came back with the matching heading.
//
// The second one exists because the first is not enough. A slug can be correct
// and the URL still wrong - the base could be stale, the join could be wrong,
// a rename could have moved the page. Reading a slug off a list is not the same
// as opening the address this file builds.
//
// ---- THE RENDER PASS OF Aug 16 2026 ----
//
// 28 addresses opened in Gigi's browser, one at a time:
//   16 units        every h1 matched its name exactly - "Unit 6: Measurement"
//   10 unit tests   every title matched - "Measurement: Unit test"
//    2 course challenges
// Not one returned "Oops!". Nothing failed, and there is nothing to write down
// as unconfirmed.
//
// ---- SCOPE: QUARTER 1 ----
//
// Only what Quarter 1 (Aug 3 – Oct 31) actually needs. Her year plan puts
// 3rd grade maths in Q2, and 4th grade maths in Q3 — those get added to this
// file when the quarter that needs them is being built, confirmed the same way,
// on that day. Writing down a link months before it is used is how a file fills
// with unit names that were true once.
// ---------------------------------------------------------------------------

const KHAN = 'https://www.khanacademy.org';

/**
 * @typedef {Object} KhanUnit
 * @property {number} n     Unit number as Khan prints it on the course page.
 * @property {string} name  Unit title, character for character off the page.
 * @property {string} slug  Path segment under the course base.
 * @property {string|null} test  Path to that unit's own unit test, or null when
 *                               Khan built none for this course.
 */

export const KHAN_UNIT_COURSES = {
  // -------------------------------------------------------------- MATHEMATICS
  math2: {
    courseId: 'math2',
    label: '2nd Grade Math',
    subject: 'math',
    quarter: 1,
    // THE CORRECTION. khanMap.js had cc-SECOND-grade-math, which 404s.
    base: '/math/cc-2nd-grade-math',
    confirmedOn: '2026-08-16',
    renderedOn: '2026-08-16',
    skills: 75,
    graded: 'khan',
    // Counted on Khan's own course page. See the Grammar note and
    // check-khan-units §8 — a course shorter than this FAILS the build.
    unitCount: 8,
    courseChallenge: 'test/x3184e0ec:course-challenge',
    units: [
      { n: 1, name: 'Add and subtract within 20', slug: 'x3184e0ec:add-and-subtract-within-20', test: 'x3184e0ec:add-and-subtract-within-20/x3184e0ec:untitled-177/test/x3184e0ec:add-and-subtract-within-20-unit-test' },
      { n: 2, name: 'Place value', slug: 'cc-2nd-place-value', test: 'cc-2nd-place-value/cc-2nd-skip-counting/test/cc-2nd-place-value-unit-test' },
      { n: 3, name: 'Add and subtract within 100', slug: 'cc-2nd-add-subtract-100', test: 'cc-2nd-add-subtract-100/cc-2nd-more-fewer-100/test/cc-2nd-add-subtract-100-unit-test' },
      { n: 4, name: 'Add and subtract within 1,000', slug: 'cc-2nd-add-subtract-1000', test: 'cc-2nd-add-subtract-1000/x3184e0ec:adding-up-to-four-2-digit-numbers/test/cc-2nd-add-subtract-1000-unit-test' },
      { n: 5, name: 'Money and time', slug: 'x3184e0ec:money-and-time', test: 'x3184e0ec:money-and-time/cc-2nd-time/test/x3184e0ec:money-and-time-unit-test' },
      { n: 6, name: 'Measurement', slug: 'cc-2nd-measurement-data', test: 'cc-2nd-measurement-data/cc-2nd-length-word-problems/test/cc-2nd-measurement-data-unit-test' },
      { n: 7, name: 'Data', slug: 'x3184e0ec:data', test: 'x3184e0ec:data/cc-2nd-line-plots/test/x3184e0ec:data-unit-test' },
      { n: 8, name: 'Geometry', slug: 'x3184e0ec:geometry', test: 'x3184e0ec:geometry/x3184e0ec:partition-rectangles/test/x3184e0ec:geometry-unit-test' }
    ]
  },

  // ------------------------------------------------------------------ READING
  //
  // KHAN BUILT NO TESTS FOR THIS COURSE, AND THAT IS NOT A GAP IN THE RESEARCH.
  // Counted on the rendered page: 77 links — 49 videos, 15 exercises, 6
  // articles, ZERO assessments. The words "unit test", "quiz" and "course
  // challenge" do not appear anywhere on it. Khan's elementary ELA is themed
  // reading, not a graded course; its gradeable ELA starts at 4th grade.
  //
  // So Q1 runs this at her measured level as COVERAGE — a bridge — and the
  // grades come from Gigi's own marking, recorded as hers and never dressed up
  // as a Khan result.
  //
  // The old khanMap.js named these units "Reading informational text" and
  // "Vocabulary". NEITHER EXISTS. The link resolved, so the wrong label was
  // never caught by anything.
  ela3: {
    courseId: 'ela3',
    label: '3rd Grade Reading & Vocabulary',
    subject: 'reading',
    quarter: 1,
    base: '/ela/cc-3rd-reading-vocab',
    confirmedOn: '2026-08-16',
    renderedOn: '2026-08-16',
    skills: 15,
    graded: 'parent',
    unitCount: 3,
    courseChallenge: null,
    units: [
      { n: 1, name: 'Pets', slug: 'xaf0c1b5d7010608e:cc-3rd-pets', test: null },
      { n: 2, name: 'Homes', slug: 'xaf0c1b5d7010608e:cc-3rd-homes', test: null },
      { n: 3, name: 'Extreme Environments', slug: 'xaf0c1b5d7010608e:cc-3rd-extreme-environments', test: null }
    ]
  },

  // Same story one grade down, and her Vocabulary 2.91 lands here - so this is
  // the course her Reading block actually opens in Quarter 1. Also three themed
  // units, also zero tests. khanMap.js called these units 'Reading for
  // understanding', 'Building vocabulary' and 'Writing about what you read';
  // none of the three exists.
  ela2: {
    courseId: 'ela2',
    label: '2nd Grade Reading & Vocabulary',
    subject: 'reading',
    quarter: 1,
    base: '/ela/cc-2nd-reading-vocab',
    confirmedOn: '2026-08-16',
    renderedOn: '2026-08-16',
    graded: 'parent',
    unitCount: 3,
    courseChallenge: null,
    units: [
      { n: 1, name: 'Fairy Tales Retold', slug: 'xfb4fc0bf01437792:cc-2nd-fairy-tales-retold', test: null },
      { n: 2, name: 'The Moon', slug: 'xfb4fc0bf01437792:cc-2nd-the-moon', test: null },
      { n: 3, name: 'Rural, Suburban, Urban', slug: 'xfb4fc0bf01437792:cc-2nd-rural-suburban-urban', test: null }
    ]
  },

  // ------------------------------------------------ LANGUAGE ARTS AND WRITING
  //
  // Khan has NO elementary grammar course. Its graded grammar runs 5th–6th,
  // 7th–8th and 9th–10th. /humanities/grammar is the general overview, and its
  // Unit 1 is exactly where her Grammar & Usage 2.15 lands.
  //
  // ---- ⚠️ THIS COURSE HELD 2 OF ITS 10 UNITS FOR THIRTEEN DAYS — v3.94 ----
  //
  // The comment that stood here said: "Only the two units Quarter 1 teaches are
  // here. Units 3 onward arrive with the quarters that teach them. Units 8–10
  // are middle-school syntax and are not part of a fourth-grade finish at all."
  //
  // Gigi found it by opening the Khan grades screen and asking why Language Arts
  // and Writing stopped at the verb. SHE COULD NOT RECORD A GRADE FOR A UNIT
  // THIS FILE HAD NEVER HEARD OF — so seven units of work Azianna could do had
  // nowhere to be written down.
  //
  // ⚠️ AND check-khan-units WAS GREEN THE WHOLE TIME. Its assertion is that
  // units run 1..n with no gaps. Units 1 and 2 have no gaps. A course carrying
  // a fifth of itself passed every run. That is fixed in the same version: a
  // course now declares `unitCount` — what Khan's own page says it has — and a
  // shorter list FAILS. See check-khan-units §8.
  //
  // ---- THE RULE THIS BROKE, WHICH WAS ALREADY WRITTEN DOWN ----
  //
  // claude/mission-control-vs-petal-pestle.md, Aug 13, quoting Lamar's locked
  // decisions: "anything generative or content-based must be sized for a FULL
  // SCHOOL YEAR of use, not a sample or a 'good start' … treat anything short of
  // a full year as an INCOMPLETE BUILD, not a phase to revisit eventually."
  //
  // Section 6 of that document is titled "The rule of yours that Petal & Pestle
  // is currently breaking." It was written sixteen days before this was found,
  // and it was broken again in a file nobody thought to re-read. A rule that is
  // only written down gets broken again; a rule with a check does not.
  //
  // ---- ALL TEN OPENED IN GIGI'S BROWSER, Aug 29 2026 ----
  //
  // The course page rendered and says "10 UNITS". Every title below was read off
  // that page character for character, and every unit-test path was taken from
  // the real link rather than built from a pattern. Every unit has a test; the
  // Course Challenge is live and its path is unchanged from Aug 16.
  //
  // ⚠️ UNIT 6 IS WHY THIS WAS DONE IN A BROWSER AND NOT COPIED. Lamar's app
  // (src/data/khan/grammarCourseOrder.js) carries this identical course with all
  // ten units, and its Unit 6 reads "Punctuation: the comma and the apostrophe".
  // KHAN HAS RENAMED IT and kept the address. Copying his file would have put a
  // stale title on screen behind a working link — invisible, and exactly bug #2
  // from check-khan-units' own header for the third time. HIS SLUG WAS RIGHT.
  // The name below is Khan's current one.
  //
  // ---- SCOPE: GIGI'S CALL, Aug 29 2026 ----
  //
  // Asked whether the lane should stop short of Units 8–9 — subject-verb
  // agreement, dangling modifiers, parallel structure, against her measured
  // Grammar & Usage of 2.15 — she chose the full ladder: "add the full 1-10 and
  // course challenge." Recorded here rather than argued again later. The lane in
  // STRAND_LANES below is 1..10 because she said so, and for no other reason.
  grammar: {
    courseId: 'grammar',
    label: 'Grammar',
    subject: 'writing',
    quarter: 1,
    base: '/humanities/grammar',
    confirmedOn: '2026-08-29',
    renderedOn: '2026-08-29',
    skills: 100,
    graded: 'khan',
    // What Khan's own course page prints. check-khan-units compares this to
    // units.length and FAILS if the list is short. Raising it without adding the
    // units breaks the build, which is the point.
    unitCount: 10,
    courseChallenge: 'test/x00307e86:course-challenge',
    units: [
      { n: 1, name: 'Parts of speech: the noun', slug: 'parts-of-speech-the-noun', test: 'parts-of-speech-the-noun/irregular-plural-nouns-mutant-and-foreign-plurals/test/parts-of-speech-the-noun-unit-test' },
      { n: 2, name: 'Parts of speech: the verb', slug: 'parts-of-speech-the-verb', test: 'parts-of-speech-the-verb/verb-aspect-and-modal-verbs/test/parts-of-speech-the-verb-unit-test' },
      { n: 3, name: 'Parts of speech: the pronoun', slug: 'parts-of-speech-the-pronoun', test: 'parts-of-speech-the-pronoun/indefinite-pronouns-pronoun-vagueness-and-emphatic-pronouns/test/parts-of-speech-the-pronoun-unit-test' },
      { n: 4, name: 'Parts of speech: the modifier', slug: 'parts-of-speech-the-modifier', test: 'parts-of-speech-the-modifier/comparative-superlative-intensifiers-and-adverbs-of-degree/test/parts-of-speech-the-modifier-unit-test' },
      { n: 5, name: 'Parts of speech: the preposition and the conjunction', slug: 'parts-of-speech-the-preposition-and-the-conjunction', test: 'parts-of-speech-the-preposition-and-the-conjunction/correlative-conjunctions-and-starting-sentences/test/parts-of-speech-the-preposition-and-the-conjunction-unit-test' },
      // ⚠️ Khan's CURRENT title. Lamar's file still says "Punctuation: the comma
      // and the apostrophe" — same slug, renamed unit. See the note above.
      { n: 6, name: 'Punctuation: end-of-sentence punctuation, the comma, and the apostrophe', slug: 'punctuation-the-comma-and-the-apostrophe', test: 'punctuation-the-comma-and-the-apostrophe/its-vs-its/test/punctuation-the-comma-and-the-apostrophe-unit-test' },
      { n: 7, name: 'Punctuation: the colon, semicolon, and more', slug: 'punctuation-the-colon-semicolon-and-more', test: 'punctuation-the-colon-semicolon-and-more/hyphens-dashes-and-ellipses/test/punctuation-the-colon-semicolon-and-more-unit-test' },
      { n: 8, name: 'Syntax: sentences and clauses', slug: 'syntax-sentences-and-clauses', test: 'syntax-sentences-and-clauses/phrases-and-clauses/test/syntax-sentences-and-clauses-unit-test' },
      { n: 9, name: 'Syntax: conventions of standard English', slug: 'syntax-conventions-of-standard-english', test: 'syntax-conventions-of-standard-english/dangling-modifiers-and-parallel-structure/test/syntax-conventions-of-standard-english-unit-test' },
      { n: 10, name: 'Usage and style', slug: 'usage-and-style', test: 'usage-and-style/style/test/usage-and-style-unit-test' }
    ]
  }
};

/**
 * ADDRESSES OPENED IN A BROWSER AND FOUND DEAD. Written down, not deleted.
 *
 * "Never invent or guess a URL - confirm it against the real domain, and write
 * down every failed search." This is the failed-search record for Khan links,
 * and it is load-bearing: check-khan-units fails the build if any of these ever
 * appears in KHAN_COURSES again.
 *
 * Every one of these was live in the app while all the checks passed. Two of
 * them were found by Gigi using the app, not by anything automatic.
 */
export const KHAN_URLS_CONFIRMED_DEAD = [
  {
    url: 'https://www.khanacademy.org/math/cc-second-grade-math',
    renderedOn: '2026-08-16',
    saw: 'Oops! Page not found',
    instead: 'https://www.khanacademy.org/math/cc-2nd-grade-math',
    note: 'Shipped in khanMap.js for months. Her Geometry and Measurement both measured 2.00, so this was the course her plan opened most often.'
  },
  {
    url: 'https://www.khanacademy.org/science/3rd-grade-science',
    renderedOn: '2026-08-16',
    saw: 'Oops! Page not found',
    instead: null,
    note: 'Khan has removed elementary science entirely; its /science index now starts at 6th grade.'
  },
  {
    url: 'https://www.khanacademy.org/science/4th-grade-science',
    renderedOn: '2026-08-16',
    saw: 'Oops! Page not found',
    instead: null,
    note: 'What the Science block opened. Gigi found it: "Science has a link to Khan Academy but there isn\u2019t any science courses there for 4th grade." v3.2 had already recorded this course was the Philippines\u2019 curriculum; Khan has since removed the page.'
  },
  {
    url: 'https://www.khanacademy.org/science/5th-grade-science',
    renderedOn: '2026-08-16',
    saw: 'Oops! Page not found',
    instead: null,
    note: 'Same removal.'
  }
];

/** Absolute URL for a course front page. */
export function courseUrl(courseId) {
  const c = KHAN_UNIT_COURSES[courseId];
  return c ? KHAN + c.base : null;
}

/** Absolute URL for one unit — this is what a schedule block should open. */
export function unitUrl(courseId, n) {
  const c = KHAN_UNIT_COURSES[courseId];
  const u = c && c.units.find((x) => x.n === n);
  return u ? `${KHAN}${c.base}/${u.slug}` : null;
}

/** Absolute URL for a unit's own unit test, or null where Khan built none. */
export function unitTestUrl(courseId, n) {
  const c = KHAN_UNIT_COURSES[courseId];
  const u = c && c.units.find((x) => x.n === n);
  return u && u.test ? `${KHAN}${c.base}/${u.test}` : null;
}

/** Absolute URL for the Course Challenge, or null where Khan built none. */
export function courseChallengeUrl(courseId) {
  const c = KHAN_UNIT_COURSES[courseId];
  return c && c.courseChallenge ? `${KHAN}${c.base}/${c.courseChallenge}` : null;
}

/** One unit record, or null. */
export function unitFor(courseId, n) {
  const c = KHAN_UNIT_COURSES[courseId];
  return (c && c.units.find((x) => x.n === n)) || null;
}

/**
 * The unit a strand's measured level maps onto, for courses that carry units
 * here. Returns null for anything not yet confirmed — deliberately, so a
 * missing link shows up as no button rather than as a wrong one.
 */
export function unitByName(courseId, name) {
  const c = KHAN_UNIT_COURSES[courseId];
  if (!c || !name) return null;
  const want = String(name).trim().toLowerCase();
  return c.units.find((u) => u.name.trim().toLowerCase() === want) || null;
}

/**
 * THE NEXT UNIT SHE HAS NOT BEEN GRADED ON — the lowest-numbered one.
 *
 * ---- WHY THIS EXISTS: "Math just skips to unit 6 instead of starting at
 *      unit 1" (Gigi, Aug 16 2026, from actually using it) ----
 *
 * v2.0 decided a block sends her to her LOWEST MEASURED STRAND's unit, because
 * "the point of measuring was to find where to start". Her Measurement and
 * Geometry both measured 2.00, so Mathematics opened Unit 6, Measurement.
 *
 * That rule was written when there was no unit list and no unit-by-unit
 * grading. There is now, and her brief is explicit: "Every unit, Unit 1 through
 * the last unit of each course she is in" and "the Course Challenge when she
 * finishes ALL the units in a course". Starting at Unit 6 means Units 1-5 are
 * never done and the Course Challenge can never unlock.
 *
 * ---- HOW THE TWO RULES ARE BOTH KEPT ----
 *
 * They were never really in conflict, they were answering different questions:
 *
 *     her measured level chooses the COURSE   <- v2.0's rule, untouched
 *     the unit sequence chooses the UNIT      <- this function
 *
 * She is in 2nd Grade Math *because* Geometry and Measurement came out at 2.00.
 * Inside it she goes 1, 2, 3 in order like anybody else.
 *
 * ---- WHAT COUNTS AS DONE ----
 *
 * A unit is done when a grown-up has entered its Khan score, keyed by courseId
 * and unit number. Rows without those two fields are ignored rather than
 * guessed at from their free text - the pre-v3.20 grades were typed as prose
 * and matching them by string would quietly mark the wrong unit complete.
 *
 * Returns null when every unit is graded, which is the signal that the Course
 * Challenge is now available and nothing before it is outstanding.
 */
export function nextUnitFor(courseId, grades = []) {
  const c = KHAN_UNIT_COURSES[courseId];
  if (!c) return null;
  const done = new Set(
    (grades || [])
      .filter((g) => g && g.courseId === courseId && countsAsUnitDone(g))
      .map((g) => Number(g.unitN))
  );
  return c.units.find((u) => !done.has(u.n)) || null;
}

/* ---------------------------------------------------------------------------
 * ONE LANE PER STRAND — v3.81. Gigi's call, Aug 25 2026: "B".
 *
 * ---- THE PROBLEM SHE FOUND ----
 *
 * Her three maths strands all route to 2nd Grade Math, and `nextUnitFor` above
 * offers Unit 1 to every one of them, because units run in order and her record
 * holds no grades. So:
 *
 *     Measurement & Data  2.50  — her LOWEST strand — is Unit 6
 *     Geometry            2.82  — her second lowest — is Unit 8
 *     and she was being sent to Unit 1, "Add and subtract within 20"
 *
 * ⚠️ AND UNITS 1 TO 4 TEACH NUMBERS & OPERATIONS, WHICH IS 3.48 — her second
 * STRONGEST strand, and a level that does not even route to this course. The
 * unit-order rule was spending her weakest strands' time on her strongest one.
 *
 * ---- WHY THIS IS NOT THE v3.20 BUG COMING BACK ----
 *
 * Gigi, Aug 16: "math just skips to unit 6 instead of starting at unit 1." That
 * was ONE strand choosing the course AND the unit, so Measurement 2.00 landed
 * her on Unit 6 with Units 1-5 never opened and the Course Challenge forever
 * unreachable.
 *
 * This is different, and the difference is the whole design: each strand walks
 * ITS OWN units, IN ORDER, starting at the first one. Nothing skips inside a
 * lane. Measurement starts at Unit 5 because Unit 5 is the first Measurement
 * unit, not because anything was jumped over. Every unit still belongs to
 * exactly one lane, so the Course Challenge still unlocks when all eight are
 * done — check-strand-lanes asserts that coverage.
 *
 * ---- ⚠️ THESE LANES ARE READ OFF KHAN'S UNIT NAMES. THAT IS AN INFERENCE. ----
 *
 * "Unit 6 · Measurement" teaches Measurement & Data; "Unit 8 · Geometry"
 * teaches Geometry. Both are plainly true from the title and neither was
 * observed inside the unit, because this app cannot see inside a Khan unit —
 * v3.74's rule, and the reason no grade here is ever computed.
 *
 * So the names are recorded beside the lanes and a check fails the build if a
 * unit's name stops matching the lane it was put in. A guess that stops
 * announcing itself becomes a fact (v3.75).
 *
 * ---- ⚠️ AND SOME STRANDS HAVE NO LANE. THEY SAY SO. ----
 *
 * PATTERNS & ALGEBRA routes to 2nd Grade Math and NOT ONE of its eight units
 * teaches it. Khan's 2nd grade course has no patterns or algebra unit at all.
 * Inventing a lane for it — folding it into Place Value, say — would aim a
 * child's weakest-strand time at something that does not teach it, which is the
 * §35 mistake: "a Measurement & Data game set built on `scale` would have been
 * aimed at the wrong child."
 *
 * READING has no lanes either, and for a better reason: `ela2`'s units are
 * Fairy Tales Retold, The Moon, and Rural/Suburban/Urban. They are THEMES. Each
 * one teaches vocabulary and comprehension together, and splitting them would
 * be a claim about the inside of a unit nobody has seen.
 *
 * A strand with no lane falls back to the whole course in order — exactly the
 * behaviour above, unchanged. Falling back is honest; inventing is not.
 * --------------------------------------------------------------------------- */

/**
 * Which units of a course belong to which strand.
 *
 * A course with no entry here has no lanes at all and every strand walks the
 * whole course in order. `why` records the unit name the lane was read off, so
 * the inference can be checked rather than trusted.
 */
export const STRAND_LANES = {
  math2: {
    'numbers-operations': {
      units: [1, 2, 3, 4],
      why: ['Add and subtract within 20', 'Place value', 'Add and subtract within 100', 'Add and subtract within 1,000']
    },
    'measurement-data': {
      units: [5, 6, 7],
      why: ['Money and time', 'Measurement', 'Data']
    },
    geometry: {
      units: [8],
      why: ['Geometry']
    }
    // patterns-algebra: DELIBERATELY ABSENT. No unit of 2nd Grade Math teaches
    // it. See the header — it falls back, it does not get an invented lane.
  },
  grammar: {
    'grammar-usage': {
      // ⚠️ WAS [1, 2] UNTIL v3.94, AND THAT IS WHY HER PLAN STOPPED AT THE VERB.
      //
      // The lane is what the app SENDS her to; the unit list above is what Gigi
      // can RECORD. Those are different questions and they were both answered
      // "two" by accident, because the lane was built from whatever the unit list
      // happened to hold.
      //
      // Gigi's call, Aug 29 2026: "add the full 1-10 and course challenge." She
      // was shown that Units 8-9 are subject-verb agreement, dangling modifiers
      // and parallel structure against her measured Grammar & Usage of 2.15, and
      // chose the full ladder anyway. SHE HAS WATCHED THE CHILD WORK AND I HAVE
      // READ A NUMBER — that is the whole reason this was a question and not a
      // judgement call.
      units: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      why: [
        'Parts of speech: the noun',
        'Parts of speech: the verb',
        'Parts of speech: the pronoun',
        'Parts of speech: the modifier',
        'Parts of speech: the preposition and the conjunction',
        'Punctuation: end-of-sentence punctuation, the comma, and the apostrophe',
        'Punctuation: the colon, semicolon, and more',
        'Syntax: sentences and clauses',
        'Syntax: conventions of standard English',
        'Usage and style'
      ]
    }
  }
  // ela2 and ela3: no lanes. Their units are THEMES, not strands. See header.
};

/** Does this course split into lanes at all? */
export function hasLanes(courseId) {
  return Boolean(STRAND_LANES[courseId]);
}

/** The lane a strand walks in a course, or null when it has none. */
export function laneFor(courseId, strandId) {
  return STRAND_LANES[courseId]?.[strandId] || null;
}

/**
 * The next unit for ONE STRAND, walking only that strand's lane, in order.
 *
 * Returns `{ unit, lane }` — `lane` is true when a real lane was walked and
 * false when it fell back to the whole course. The caller needs to be able to
 * tell those apart, because "this is your Measurement unit" and "this is the
 * next unit of the course" are different claims and only one of them is about
 * her strand.
 *
 * Returns null when every unit in her lane is graded. ⚠️ That is NOT the same
 * as the Course Challenge unlocking — the challenge needs every unit in the
 * COURSE, which `nextUnitFor` still answers. A child who finishes the Geometry
 * lane has finished one unit out of eight.
 */
export function nextUnitForStrand(courseId, strandId, grades = []) {
  const c = KHAN_UNIT_COURSES[courseId];
  if (!c) return null;

  const lane = laneFor(courseId, strandId);
  if (!lane) {
    const unit = nextUnitFor(courseId, grades);
    return unit ? { unit, lane: false } : null;
  }

  const done = new Set(
    (grades || [])
      .filter((g) => g && g.courseId === courseId && countsAsUnitDone(g))
      .map((g) => Number(g.unitN))
  );
  // Ascending, always. The lane is written in order and sorted anyway, because
  // a lane listed out of order would skip inside itself — the one thing this
  // design promises it never does.
  const n = [...lane.units].sort((a, b) => a - b).find((num) => !done.has(num));
  if (n === undefined) return null;
  const unit = c.units.find((u) => u.n === n);
  return unit ? { unit, lane: true } : null;
}

/* ---------------------------------------------------------------------------
 * ⚠️ THIS TEST USED TO BE `Number.isFinite(Number(g.unitN))` AND IT WAS TWO
 * BUGS WAITING — v3.76.
 *
 * `Number(null)` is 0, and 0 is finite. So the moment a row existed that
 * carried no unit number, this function read it as "unit 0 is done". It was
 * harmless only because no Khan course has a unit 0, which is luck rather than
 * a design, and v3.76 introduced exactly such a row: the Course Challenge.
 *
 * The same `Number(null)` trap was found three times in khanGrade.js on the
 * same day, where it made an absent mark an F and averaged an ungraded unit in
 * as a zero. Third file, same mistake.
 *
 * AND A COURSE CHALLENGE IS NOT A UNIT. Gigi: "The unit tests are what is
 * being graded by Khan Academy and the course challenge is the test after all
 * the units are completed." Letting a cumulative result mark a unit done would
 * skip a unit she never sat — the thing this whole file exists to prevent.
 *
 * Kept here rather than imported from lib/khanGrade.js on purpose: this is a
 * data-layer file and blockLinks already imports FROM here, so importing back
 * would close a cycle. The rule is small enough to state twice and
 * check-khan-advance asserts the two agree.
 *
 * ---- ⚠️ EXPORTED SO A CHECK CAN ASK IT DIRECTLY ----
 *
 * Two negative tests came back GREEN against this rule: one deleted the null
 * guard, the other deleted the kind guard, and NOTHING OBSERVABLE CHANGED.
 * Both are true — the two guards are redundant with each other, and a null
 * unit number lands on "unit 0", which no course has.
 *
 * So through `nextUnitFor` the rule is UNTESTABLE: every wrong answer it can
 * give happens to produce the right unit anyway. A rule whose failure cannot
 * be observed is a rule nothing is protecting, and the redundancy is only
 * defence while BOTH halves are still there.
 *
 * Rule 11 — a rule the app must follow lives where a check can test it. So the
 * predicate is exported and asserted on its own, rather than inferred from a
 * unit number that comes out right for the wrong reason.
 * ------------------------------------------------------------------------- */
export function countsAsUnitDone(g) {
  if (g.kind === 'course-challenge') return false;
  const n = g.unitN;
  if (n === null || n === undefined || n === '') return false;
  return Number.isFinite(Number(n));
}

/** True once every unit in the course carries a grade. */
export function courseUnitsAllGraded(courseId, grades = []) {
  const c = KHAN_UNIT_COURSES[courseId];
  return Boolean(c) && nextUnitFor(courseId, grades) === null;
}

/** Every course this file currently carries. */
export const KHAN_UNIT_COURSE_IDS = Object.keys(KHAN_UNIT_COURSES);

/** Total units on file — printed by the check so the number cannot drift. */
export const KHAN_UNIT_COUNT = KHAN_UNIT_COURSE_IDS.reduce(
  (n, id) => n + KHAN_UNIT_COURSES[id].units.length,
  0
);
