// ---------------------------------------------------------------------------
// HER GARDEN — seed to flower, and what makes it grow.
//
// Gigi: "'Your Garden' I prefer it comes from seed and grow to a flower so that
// she can see real change."
//
// WHAT IT USED TO BE, and why that could not deliver what she asked for. The
// screen drew one stem per Check-In strand and the stem's HEIGHT was her
// measured level. Two things followed from that, and both were wrong:
//
//   1. It moved only when the Check-In moved — twice a year at most. A garden
//      that stands still for four months is a picture, not a garden.
//   2. Nine plants side by side, sorted short to tall, is a ranking of her own
//      skills. The old file's own comment worried about exactly this ("a child
//      reading 4.2 next to 3.1 reads a ranking of herself") and then drew the
//      ranking anyway, in plants. Her weakest subject was a stunted stem.
//
// WHAT MAKES A PLANT GROW NOW: the days she actually worked that subject.
//
// One rule, one signal, every subject the same — the days her schedule records
// that block ticked off. It is the same rule as Petals: EFFORT, never accuracy.
// It moves every single school day. It works identically for the four subjects
// Khan teaches and the three the app teaches, which matters because there is no
// Khan grade entry yet and a garden that could only grow on app-taught work
// would leave four of her six plants as seeds all year.
//
// And nothing is ever stunted. A plant that has not been worked is a SEED, not
// a short flower — a seed is a beginning, and it is the honest picture of a
// subject she has not started.
//
// One plant per SUBJECT, not per strand. Her nine strand levels are still on
// the same screen, in words, where a level belongs.
// ---------------------------------------------------------------------------

/**
 * The five stages, in order.
 *
 * `at` is the number of days worked that reaches this stage. The gaps widen on
 * purpose: the first change comes after ONE day, because a child who works and
 * sees nothing happen does not come back, and the last one takes a term,
 * because a flower she reached in a fortnight is not worth reaching.
 */
export const STAGES = [
  { id: 'seed', at: 0, label: 'Seed', blurb: 'Planted. Nothing above the soil yet.' },
  { id: 'sprout', at: 1, label: 'Sprout', blurb: 'Up. Two little leaves.' },
  { id: 'leaf', at: 5, label: 'Leafy', blurb: 'Getting taller, putting out leaves.' },
  { id: 'bud', at: 15, label: 'Bud', blurb: 'Something is coming.' },
  { id: 'flower', at: 30, label: 'Flowering', blurb: 'Open. It took thirty days of work.' }
];

/** After it flowers, every this-many further days opens one more bloom, so the
 *  screen keeps changing for the rest of the year instead of finishing in
 *  November and standing still until June. */
export const DAYS_PER_EXTRA_BLOOM = 20;

/** More than this many blooms and the plant stops reading as a plant. */
export const MAX_BLOOMS = 8;

/**
 * The six subjects that get a plant.
 *
 * Matched by SUBJECT, not by block id, because a grown-up can rename, move or
 * add blocks in the Grown-Up Corner. A garden keyed to `blk-math` would quietly
 * stop growing the day somebody rebuilt the school day.
 */
export const GARDEN_PLANTS = [
  { subject: 'math', label: 'Mathematics', flower: '🌻', taughtBy: 'Khan' },
  { subject: 'reading', label: 'Reading', flower: '🌷', taughtBy: 'Khan' },
  { subject: 'writing', label: 'Writing', flower: '🌺', taughtBy: 'Khan' },
  { subject: 'herbalism', label: 'Herbalism & Botany', flower: '🌼', taughtBy: 'the app' },
  { subject: 'science', label: 'Science', flower: '🌸', taughtBy: 'the app' },
  { subject: 'social', label: 'Social Studies', flower: '🌹', taughtBy: 'the app' }
];

/**
 * How many days she has worked one subject.
 *
 * A day counts once, however many of that subject's blocks were ticked — two
 * maths blocks on a Tuesday is still one day of maths. Counting ticks instead
 * of days would mean a grown-up who splits a block in two doubles her garden.
 */
export function daysWorked(scheduleDays = {}, blocks = [], subject) {
  const ids = blocks.filter((b) => b.subject === subject).map((b) => b.id);
  if (ids.length === 0) return 0;
  let n = 0;
  for (const day of Object.values(scheduleDays || {})) {
    const done = day?.done || {};
    if (ids.some((id) => done[id])) n += 1;
  }
  return n;
}

/** Which stage a number of days reaches, and how far to the next one. */
export function stageFor(days = 0) {
  const d = Math.max(0, Math.floor(days));
  let index = 0;
  for (let i = 0; i < STAGES.length; i++) if (d >= STAGES[i].at) index = i;
  const stage = STAGES[index];
  const flowering = index === STAGES.length - 1;

  const blooms = flowering
    ? Math.min(MAX_BLOOMS, 1 + Math.floor((d - stage.at) / DAYS_PER_EXTRA_BLOOM))
    : 0;

  // What she is working toward. Once she is flowering with every bloom open
  // there is no next thing, and the screen says so rather than inventing one.
  let next = null;
  if (!flowering) {
    const n = STAGES[index + 1];
    next = { label: n.label, daysToGo: n.at - d };
  } else if (blooms < MAX_BLOOMS) {
    const need = stage.at + blooms * DAYS_PER_EXTRA_BLOOM;
    next = { label: 'another bloom', daysToGo: need - d };
  }

  return { days: d, stage, index, blooms, next, flowering };
}

/** The whole garden, in the order the plants are listed. */
export function gardenFor({ scheduleDays = {}, blocks = [] } = {}) {
  return GARDEN_PLANTS.map((p) => ({ ...p, ...stageFor(daysWorked(scheduleDays, blocks, p.subject)) }));
}
