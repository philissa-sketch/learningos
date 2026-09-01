// ---------------------------------------------------------------------------
// THE YEAR, IN FOUR QUARTERS.
//
// khanMap.js answers "where does she start TODAY". This file answers "and then
// what" — the whole year laid out, quarter by quarter, so a grown-up can see
// the shape of it instead of one unit at a time.
//
// ---- WHAT IS AND IS NOT CLAIMED HERE ----
//
// Maths unit names are Khan's own and are stable enough to print. ELA is
// different: Khan's reading courses are built around themed units that change,
// so naming them would be inventing detail I cannot stand behind. For those,
// each quarter names a SKILL FOCUS — mine, sequenced properly — and the button
// opens the course. The screen says which is which rather than blurring them.
//
// The same rule khanMap already follows applies: the COURSE URL is the stable
// part and is what every button actually opens. A unit name that goes out of
// date is a wrong label, never a broken link.
//
// ---- FOUR QUARTERS, NOT A FIXED CALENDAR ----
//
// A quarter here means roughly nine weeks of her four-day, four-hour week. It
// is a sequence, not a set of dates. A child who moves faster moves on; a child
// who needs longer takes longer. Anyone who treats these as deadlines has
// turned a plan into a stick.
// ---------------------------------------------------------------------------

/**
 * Ordered quarter plans per course.
 *
 * `units` are Khan's own unit names where those are stable.
 * `focus` is a skill description where naming a unit would be a guess.
 */
export const COURSE_SCOPE = {
  // ------------------------------- MATHS -------------------------------
  math1: [
    { q: 1, units: ['Addition and subtraction within 20', 'Place value'] },
    { q: 2, units: ['Addition and subtraction within 100', 'Measurement and data'] },
    { q: 3, units: ['Geometry', 'Halves and fourths'] },
    { q: 4, units: ['Telling time', 'Counting money'] }
  ],
  math2: [
    { q: 1, units: ['Add and subtract within 20', 'Place value'] },
    { q: 2, units: ['Add and subtract within 100', 'Measurement'] },
    { q: 3, units: ['Geometry', 'Add and subtract within 1000'] },
    { q: 4, units: ['Money and time', 'Data'] }
  ],
  math3: [
    { q: 1, units: ['Intro to multiplication', 'Addition, subtraction and estimation'] },
    { q: 2, units: ['Intro to division', 'More with multiplication and division'] },
    { q: 3, units: ['Understand fractions', 'Equivalent fractions and comparing fractions'] },
    { q: 4, units: ['Area and perimeter', 'Measurement and data'] }
  ],
  math4: [
    { q: 1, units: ['Place value', 'Multiply by 1-digit numbers'] },
    { q: 2, units: ['Multiply by 2-digit numbers', 'Division'] },
    { q: 3, units: ['Equivalent fractions and comparing fractions', 'Add and subtract fractions'] },
    { q: 4, units: ['Understand decimals', 'Units of measurement'] }
  ],
  math5: [
    { q: 1, units: ['Place value and decimals', 'Add and subtract decimals'] },
    { q: 2, units: ['Multi-digit multiplication and division', 'Multiply fractions'] },
    { q: 3, units: ['Add and subtract fractions with unlike denominators', 'Divide fractions'] },
    { q: 4, units: ['Volume', 'Coordinate plane'] }
  ],
  math6: [
    { q: 1, units: ['Arithmetic operations', 'Ratios and rates'] },
    { q: 2, units: ['Arithmetic with rational numbers', 'Negative numbers'] },
    { q: 3, units: ['Variables and expressions', 'Equations and inequalities'] },
    { q: 4, units: ['Data and statistics', 'Geometry'] }
  ],

  // -------------------------------- ELA --------------------------------
  // Focus areas, not unit names — see the note at the top of this file.
  ela1: [
    { q: 1, focus: 'Sounding out words and reading short sentences' },
    { q: 2, focus: 'Reading a short story and saying what happened' },
    { q: 3, focus: 'Who, what and where in a text' },
    { q: 4, focus: 'Reading for facts — labels, lists and simple how-to' }
  ],
  ela2: [
    { q: 1, focus: 'Reading a story and retelling it in order' },
    { q: 2, focus: 'Finding the main idea of a short passage' },
    { q: 3, focus: 'Reading for facts, and using a picture or caption' },
    { q: 4, focus: 'Comparing two texts about the same thing' }
  ],
  ela3: [
    { q: 1, focus: 'Main idea and supporting detail' },
    { q: 2, focus: 'Reading informational text — headings, captions, diagrams' },
    { q: 3, focus: 'Character, setting and how a story is built' },
    { q: 4, focus: 'Using what the text says to answer a question' }
  ],
  ela4: [
    { q: 1, focus: 'Summarising a passage in her own words' },
    { q: 2, focus: 'Point of view — who is telling this, and how do you know' },
    { q: 3, focus: 'Text structure: cause and effect, compare and contrast' },
    { q: 4, focus: 'Using evidence from the text to back up an answer' }
  ],
  ela5: [
    { q: 1, focus: 'Theme and how a text develops it' },
    { q: 2, focus: 'Comparing how two texts treat the same subject' },
    { q: 3, focus: 'Figurative language and word choice' },
    { q: 4, focus: 'Quoting accurately when explaining a text' }
  ],
  ela6: [
    { q: 1, focus: 'Central idea and how it is developed' },
    { q: 2, focus: 'Word meaning from roots, prefixes and context' },
    { q: 3, focus: 'Author’s purpose and argument' },
    { q: 4, focus: 'Citing evidence precisely' }
  ],
  // EIGHT quarters, not four.
  //
  // Grammar is the one course with nothing above it — maths rolls 1st into 2nd
  // into 3rd, reading does the same, but Grammar is a single course that covers
  // everything from nouns to syntax. So a child starting in its third quarter
  // ran off the end and got a year that stopped in March, with no next course
  // to roll into. check-yearplan.mjs caught it at four different levels.
  //
  // The fix is not a trick: Khan's Grammar course genuinely holds about two
  // years of work. Writing eight quarters of it means any starting point still
  // yields a full year ahead.
  grammar: [
    { q: 1, units: ['Parts of speech: the noun', 'Parts of speech: the verb'] },
    { q: 2, units: ['Parts of speech: the pronoun', 'Parts of speech: the modifier'] },
    { q: 3, units: ['Parts of speech: the preposition', 'Parts of speech: the conjunction'] },
    { q: 4, units: ['Punctuation: the comma', 'Punctuation: the apostrophe'] },
    { q: 5, units: ['Punctuation: the colon and semicolon', 'Punctuation: quotation marks'] },
    { q: 6, units: ['Syntax: sentences and clauses', 'Syntax: types of sentences'] },
    { q: 7, units: ['Sentence construction', 'Fragments and run-ons'] },
    { q: 8, units: ['Usage and style', 'Conventions of standard English'] }
  ],

  // ------------------------------ SCIENCE ------------------------------
  sci3: [
    { q: 1, focus: 'Living things and what they need' },
    { q: 2, focus: 'Weather and the sky' },
    { q: 3, focus: 'Forces and motion' },
    { q: 4, focus: 'Earth and its materials' }
  ],
  sci4: [
    { q: 1, focus: 'Plants, animals and how they survive' },
    { q: 2, focus: 'Energy, light and sound' },
    { q: 3, focus: 'Earth’s systems and change over time' },
    { q: 4, focus: 'Asking a question and testing it' }
  ],
  sci5: [
    { q: 1, focus: 'Matter and its properties' },
    { q: 2, focus: 'Ecosystems and food webs' },
    { q: 3, focus: 'Earth and space' },
    { q: 4, focus: 'Designing a fair test' }
  ],
  bio: [
    { q: 1, focus: 'Cells and how they work' },
    { q: 2, focus: 'Body systems' },
    { q: 3, focus: 'Heredity and traits' },
    { q: 4, focus: 'Ecosystems and change' }
  ]
};

/** The four quarters of one course, or null if that course has no scope yet. */
export function scopeFor(courseKey) {
  return COURSE_SCOPE[courseKey] || null;
}
