// ---------------------------------------------------------------------------
// External Games Library — free, real, currently-live game sites for
// subjects Mission Control doesn't build its own games for (Math and
// Science, both Khan-Academy-taught/archived per PROJECT_PLAN.md Part 0)
// plus a supplement for Social Studies alongside Nation Command. Khan
// Academy itself has no games — this fills that real gap the parent asked
// about directly.
//
// Every link below was verified live via direct fetch/search before being
// added (same standard as every video link in this project — never
// guessed). No sign-in-walled or paid-tier resource is listed as the
// PRIMARY link; where a site nudges toward an optional free account
// (iCivics), that's noted explicitly rather than hidden.
//
// This is intentionally a small, curated list, not an exhaustive directory
// — quality and real subject alignment over quantity.
// ---------------------------------------------------------------------------

export const EXTERNAL_GAMES_LIBRARY = [
  {
    subject: 'math',
    label: 'Hooda Math — 7th Grade Games',
    url: 'https://www.hoodamath.com/games/seventh-grade.html',
    description:
      'Free, no sign-up, no ads — built by a classroom math teacher. Real 7th-grade topics: integers, fractions, algebra, coordinate plane, geometry.',
    source: 'Hooda Math'
  },
  {
    subject: 'math',
    label: 'Math-Play — 7th Grade Math Games',
    url: 'https://www.math-play.com/7th-grade-math-games.html',
    description:
      'Free, no sign-up. Jeopardy- and sports-themed games covering integers, algebraic expressions, one-step equations, and the coordinate plane.',
    source: 'Math-Play.com'
  },
  {
    subject: 'science',
    label: 'PhET Interactive Simulations — Biology',
    url: 'https://phet.colorado.edu/en/simulations/filter?subjects=biology&type=html',
    description:
      'Free, no sign-up required to play. University of Colorado Boulder’s real interactive science sims — genetics, cells, and ecosystems included, matching Life Science (S7L1-S7L5).',
    source: 'PhET Interactive Simulations (University of Colorado Boulder)'
  },
  {
    subject: 'science',
    label: 'PhET — Natural Selection',
    url: 'https://phet.colorado.edu/en/simulations/natural-selection',
    description:
      'A direct match for the Natural and Artificial Selection lesson (S7L5) — run real generations of bunnies through selection pressure and watch traits actually change.',
    source: 'PhET Interactive Simulations (University of Colorado Boulder)'
  },
  {
    subject: 'socialStudies',
    label: 'iCivics — Games',
    url: 'https://ed.icivics.org/games',
    description:
      'Free nonprofit civics/government games — Executive Command (branches of government), Cast Your Vote, Argument Wars, and People’s Pie (national budgeting, pairs well with Nation Command). A free student account may be prompted to save progress, but play itself is free.',
    source: 'iCivics'
  },
  {
    subject: 'socialStudies',
    label: 'Seterra — Free Geography Map Quizzes',
    url: 'https://www.geoguessr.com/seterra',
    description:
      'Free map-quiz games for Africa and Asia — matches this year’s real World Area Studies focus (Africa, Southwest Asia, Southern & Eastern Asia).',
    source: 'Seterra (GeoGuessr)'
  }
];

export function getExternalGamesForSubject(subject) {
  return EXTERNAL_GAMES_LIBRARY.filter((g) => g.subject === subject);
}
