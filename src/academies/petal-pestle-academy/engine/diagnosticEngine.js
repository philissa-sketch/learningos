// ---------------------------------------------------------------------------
// THE ADAPTIVE DIAGNOSTIC. Pure functions only — no React, no database, no
// randomness that isn't passed in. Every rule the assessment follows lives in
// this one file so it can be read, argued with, and changed in one place.
//
// This is modelled on how IXL's Real-Time Diagnostic behaves from the outside:
// it does not ask "did she pass 4th grade fractions", it estimates a POINT ON
// A CONTINUOUS SCALE for each strand, moves that estimate after every single
// answer, and takes smaller steps as it gets more confident.
//
// It is deliberately NOT an item-response-theory model. IRT needs thousands of
// students answering each item to calibrate its difficulty parameters. We have
// one child. A step-down staircase is the honest tool at this sample size: it
// converges quickly, its behaviour is obvious to a parent reading the history,
// and it cannot produce a confident-looking number out of three answers.
// ---------------------------------------------------------------------------

import { STRAND_IDS } from '../config/strands.js';

/** The measurable range. Below 2.0 and above 6.5 the item bank runs out, and
 *  reporting a level the bank cannot actually test would be a made-up number. */
/**
 * The lowest level the engine can report.
 *
 * Was 2.0, and that number was a trap: the ITEM BANK's easiest question was
 * 2.3–2.5, so a child below that could never be measured — her estimate fell to
 * 2.0 and then the engine, having exhausted the easy items, started serving her
 * HARDER ones because they were the nearest that existed. Four of Azianna's
 * nine strands pinned there. The floor measured the bank, not the child.
 *
 * Then 1.5 — and the simulation, newly given a scenario for a child at 1.8,
 * still read her half a grade HIGH. The cause is structural: a clamp is
 * one-sided. Wrong answers below the floor get truncated, right answers do not,
 * so error can only accumulate upward. To measure a child at 1.5 without bias
 * the estimator needs room BELOW her.
 *
 * 1.2 now, with the easiest question in every strand sitting at 1.2 — and
 * verify-itembank.mjs fails the build if any strand's easiest question is ever
 * above it. A floor is only honest when there is something under it.
 */
export const MIN_LEVEL = 1.2;
export const MAX_LEVEL = 6.5;

/** Everyone starts in the middle. Not at her age-grade — at the middle of the
 *  scale. Starting at "4th grade because she is nine" bakes the assumption into
 *  the answer, and the entire point is to find out. */
export const START_LEVEL = 3.5;

/**
 * How far the estimate moves after each answer, by how many questions she has
 * already answered IN THAT STRAND.
 *
 * Big first steps so a badly-wrong starting guess is corrected in two or three
 * questions instead of fifteen. Small last steps so the final number is a
 * measurement rather than a bounce. Index past the end of the array and the
 * last value repeats.
 */
/**
 * These are the DOWN-steps. Up-steps are 0.6x these (see UP_STEP_RATIO below).
 *
 * The sum matters as much as the shape. Everyone starts at 3.5, so the total
 * up-travel available across eight questions is 0.6 x sum(schedule) = 3.2 —
 * just enough to carry a genuinely advanced child from 3.5 to the top of the
 * scale before her strand settles. An earlier, gentler schedule summed to 3.53
 * and could only climb 2.1, which quietly capped every strong reader at about
 * 5.6 and reported a child working at 6.3 as a full grade lower. Chosen by
 * sweeping four candidate schedules through the simulation, not by feel.
 */

/**
 * How close to the floor a result has to be before it stops being a number.
 *
 * WHY THIS EXISTS. After the easy band was added, the simulation was given two
 * new scenarios — a child at 1.8 and a child at 1.5. The 1.8 case came right.
 * The 1.5 case did not, and no amount of extra easy questions fixed it, because
 * the cause is not the item bank:
 *
 *   Four-choice questions have a 25% guess floor. A child sitting AT the lowest
 *   level the app can report will get some right by luck, and those pushes are
 *   all upward because the clamp truncates the downward ones. Bias at the
 *   boundary is structural. You cannot estimate a point that lies on the edge
 *   of your own measuring range.
 *
 * The wrong response is to keep tuning until the number looks unbiased. The
 * right one is to stop reporting a number. A result this low is a BOUND — "at
 * or below 2.0" — and saying so is both truthful and more useful to a parent
 * than a precise-looking 1.53 that is quietly half a grade high.
 *
 * The band is 0.8 rather than something tighter because that is where the
 * measurement actually stops being trustworthy, not because it makes a test
 * pass. Below roughly 2.0 the guess floor dominates: a simulated child at 1.3
 * was being handed a confident-looking number more than half the time, and the
 * number was wrong.
 */
export const FLOOR_BAND = 0.8;

/**
 * True when a settled result is too near the floor to be a point estimate.
 *
 * Two ways to qualify, because there are two ways to be below the bank:
 *   1. The staircase itself landed in the floor band.
 *   2. She was served the easiest questions that exist and missed most of them
 *      — which is direct evidence, regardless of where the steps ended up.
 */
export function isFloorBounded(state) {
  if (!state || !state.settled) return false;
  if (state.level <= MIN_LEVEL + FLOOR_BAND) return true;

  // She was served the easiest questions in the bank and missed most of them.
  const easyAsked = state.easyAsked || 0;
  const easyMissed = state.easyMissed || 0;
  if (easyAsked >= 2 && easyMissed / easyAsked > 0.5) return true;

  // ---- THE ACCURACY TELL ----
  //
  // This is the signal that finally caught the case the other two missed, and
  // it comes from the design of the staircase itself.
  //
  // Up-steps are 0.6x down-steps, so the estimate settles where she is getting
  // 1 / (1 + 0.6) = 62.5% right. That is not an observation, it is arithmetic —
  // it is what the ratio was chosen to produce.
  //
  // So if a strand SETTLED and she was only getting a third of them right, the
  // estimate did not settle where she is. It stopped where it ran out of room
  // to fall. A number reached that way is an upper bound wearing a decimal
  // point, and the honest thing is to say so.
  //
  // Note what this does NOT do: it never fires on a child whose accuracy is
  // near the design rate, however low her level. Being behind is not the
  // trigger. Being behind the FLOOR is.
  const acc = state.asked > 0 ? state.correct / state.asked : 1;
  return state.asked >= MIN_ITEMS_BEFORE_EARLY_SETTLE && acc < SETTLE_ACCURACY - 0.2;
}

/**
 * The accuracy a settled staircase is built to produce.
 *
 * Derived, not chosen: a staircase converges where p x up = (1 - p) x down, so
 * with up-steps at UP_STEP_RATIO of the down-steps it settles at
 * 1 / (1 + ratio). Any settled strand whose real accuracy is far from this did
 * not settle — it stopped.
 */
export const SETTLE_ACCURACY = 1 / (1 + 0.6);

/** What to SAY about a strand's level — a number, or a bound. */
export function describeMeasuredLevel(state) {
  if (!state || state.asked === 0) return { text: 'not measured yet', bounded: false };
  if (isFloorBounded(state)) {
    return {
      text: `at or below ${(MIN_LEVEL + FLOOR_BAND).toFixed(1)}`,
      bounded: true,
      note: 'This is the bottom of what the Check-In can measure. Her real level may be lower — the number would not be trustworthy, so the app does not print one.'
    };
  }
  return { text: state.level.toFixed(1), bounded: false };
}

export const STEP_SCHEDULE = [2.0, 1.2, 0.8, 0.5, 0.3, 0.2, 0.15, 0.15];

/**
 * UP-STEPS ARE SMALLER THAN DOWN-STEPS. This is the least obvious number in
 * the file and it is not a style choice — a symmetric staircase measures a
 * multiple-choice test WRONG, and the first version of this engine did.
 *
 * The simulation in scripts/simulate-diagnostic.mjs caught it: every simulated
 * student came out reading HIGH, and the further below grade level she really
 * was, the worse the overstatement got (+0.57 of a grade for a child working at
 * 2.8). For an assessment whose entire job is finding the strand that needs
 * help, systematically flattering the weakest strand is the worst possible
 * failure mode — it is the one that tells a parent nothing is wrong.
 *
 * The cause is guessing. With four choices she has a 25% floor on every item,
 * however hard. A staircase that steps up and down by the same amount settles
 * where she gets 50% right — and 50% right on four-choice items is 33% real
 * knowledge plus luck, which happens at a difficulty ABOVE her actual level.
 * The theoretical overstatement is about +0.4 of a grade, which is what the
 * simulation measured.
 *
 * The fix is to make the staircase settle at a higher success rate instead.
 * A staircase converges where p x up = (1 - p) x down, so an up:down ratio of
 * 0.6 settles at p = 0.625 — and 0.625 observed is exactly 0.5 real knowledge
 * once the 25% guessing floor is taken out. That is the point where the item
 * difficulty equals her ability, which is the number we want to report.
 *
 * Changing this constant changes what the whole app measures. Re-run the
 * simulation after touching it; the bias line is the one to watch.
 */
export const UP_STEP_RATIO = 0.6;

/** No strand asks more than this in a full diagnostic. 9 strands x 8 = 72
 *  questions at the absolute maximum; the early-settle rule below usually
 *  brings it in around 60. */
export const MAX_ITEMS_PER_STRAND = 8;

/** Fewest questions before a strand is allowed to settle early. Four answers
 *  can be four lucky guesses; six cannot, often enough to matter. */
export const MIN_ITEMS_BEFORE_EARLY_SETTLE = 6;

/** How tightly the estimate must have been oscillating over the last three
 *  answers to call it converged and stop early. */
export const CONVERGED_BAND = 0.25;

/** One sitting. Confirmed with the parent: 12 questions, roughly 15-20 minutes
 *  for a nine-year-old. Progress is written to the database after every single
 *  answer, so this is a suggestion about when to take a break, never a limit on
 *  when she is allowed to stop. */
export const SITTING_LENGTH = 12;

export function clampLevel(level) {
  return Math.max(MIN_LEVEL, Math.min(MAX_LEVEL, level));
}

/** A strand nobody has answered a question in yet. */
export function initialStrandState(strandId) {
  return {
    strandId,
    level: START_LEVEL,
    asked: 0,
    correct: 0,
    settled: false,
    /** Every level the estimate has held, oldest first, starting at START_LEVEL.
     *  Drives both the convergence check and the Grown-Up Corner's history. */
    levelHistory: [START_LEVEL],
    /** Questions served at or near the very bottom of the bank, and how many of
     *  them she missed. See applyAnswer for why these are counted separately. */
    easyAsked: 0,
    easyMissed: 0,
    /** Item ids already served, so nothing is ever asked twice. */
    seenItemIds: []
  };
}

/**
 * The state a strand goes back to for a RE-TAKE.
 *
 * Everything that constitutes a measurement is thrown away — the level goes
 * back to the start, the counts go to zero, the strand is unsettled so the
 * Check-In picks it up again. Exactly one thing survives: the list of items she
 * has already been served.
 *
 * WHY THAT ONE THING SURVIVES. The locked rule for tests is that a re-take is a
 * different paper — otherwise she is showing she remembers the paper, not the
 * material. Until v3.14 this function did not exist and reopenStrand() called
 * initialStrandState(), which cleared seenItemIds, so a re-take could hand her
 * the questions she had just answered. It is the diagnostic that the whole year
 * plan is built on, so that matters MORE here than it does on a weekly test.
 *
 * WHY IT WAS CLEARED. Not carelessness — at v2.2 the 81 foundation items had
 * just been added and a settled strand would never have walked back down to
 * reach them. Resetting `level` to START_LEVEL does that job on its own: the
 * staircase walks down from 3.5 and finds the easy items by targeting, which is
 * the mechanism that was supposed to do it all along.
 *
 * WHAT THIS DOES NOT PROMISE. A strand with fewer than MAX_ITEMS_PER_STRAND * 2
 * items cannot give two clean papers, and chooseItem() falls back to repeats
 * rather than crashing when the unseen pool runs dry. verify-itembank.mjs fails
 * the build if any strand is that thin, so the promise this function makes is
 * kept by the bank, not assumed by the engine.
 */
/** A strand sits at the ceiling of its measurement when it lands this low... */
export const PINNED_LEVEL_CEILING = 2.5;
/** ...and got most of it wrong. */
export const PINNED_ACCURACY = 0.45;

/**
 * Is this strand's result a CEILING rather than a measurement?
 *
 * The honest test — the same one floorBlocker() applies in lib/yearPlan.js — is
 * whether the easiest question she was actually SERVED sits at or above where
 * the test placed her. If it does, the staircase only ever looked upward from
 * where she was standing, and the number that came out is an upper bound
 * wearing a decimal point.
 *
 * THIS LIVES IN THE ENGINE so it can be tested. It used to live inline in
 * useAppStore.strandsPinnedAtFloor(), where a variable named `easiestSeen` was
 * computed from the whole bank instead of from her seen items. Once the
 * foundation items landed at 1.2 that made the guard a constant, and a warning
 * meant for "the bank had nothing easy enough" quietly became "low and
 * struggling" — which the report already says, and which is not a reason to
 * re-measure. The store cannot be imported under node; this can.
 */
export function isPinnedAtFloor(state, items) {
  if (!state || !state.settled || state.asked === 0) return false;
  if (state.level > PINNED_LEVEL_CEILING) return false;
  if (state.correct / state.asked >= PINNED_ACCURACY) return false;
  const seen = new Set(state.seenItemIds || []);
  const served = items.filter((i) => seen.has(i.id)).map((i) => i.level);
  if (served.length === 0) return false;
  return Math.min(...served) >= state.level;
}

// ---------------------------------------------------------------------------
// A FLOORED STRAND IS INCONCLUSIVE, NOT A SCORE — v3.55
// ---------------------------------------------------------------------------

/**
 * What a strand result actually IS, for anything that shows it to a grown-up.
 *
 * ---- WHY THIS EXISTS ----
 *
 * Geometry 2.00 and Measurement 2.00 have been printed as numbers since Aug 13
 * and they are not numbers. They are the FLOOR OF THE ITEM BANK. The test never
 * asked her anything below where it placed her, so the staircase only ever
 * looked uphill and the result pinned. `isPinnedAtFloor()` has always known
 * this and `ceilingNote()` has always said so in prose — but the figure beside
 * the prose was still rendered as "2.00", and a number wins an argument with a
 * caveat every time.
 *
 * The framework Gigi is building to has a word for this and it is not "low":
 *
 *   "INCONCLUSIVE — a diagnostic band with too little evidence to judge;
 *    NOT THE SAME AS FAILED."
 *
 * Two of her nine strands have never been measured. That is a different fact
 * from "she scored badly in two of nine", it points at a different action, and
 * the record should hold the one that is true.
 *
 * This returns the reading; it does not decide how to draw it. Anything that
 * puts a level in front of a grown-up asks here first.
 */
export function strandReading(state, items) {
  if (!state || !state.settled || !state.asked) {
    return { kind: 'unmeasured', level: null, display: '—', why: 'Not sat yet.' };
  }
  if (isPinnedAtFloor(state, items)) {
    return {
      kind: 'inconclusive',
      // The number is CARRIED, not shown. It is still the honest upper bound and
      // the year plan still uses it to pick a course — it is simply not a score,
      // so nothing may print it as one.
      level: state.level,
      display: 'Inconclusive',
      why:
        'The test never asked her anything easier than where it placed her, so it could not find ' +
        'her level. This is too little evidence to judge, which is not the same as a low score.'
    };
  }
  return {
    kind: 'measured',
    level: state.level,
    display: state.level.toFixed(2),
    why: null
  };
}

// ---------------------------------------------------------------------------
// THE RE-DIAGNOSTIC TRIGGER — v3.55
// ---------------------------------------------------------------------------

/**
 * GIGI'S DECISION, WITH THE REASON AND THE DATE, AND A WAY BACK.
 *
 * ---- WHAT SHE ACTUALLY DECIDED ----
 *
 * Gigi, Aug 2026: "For the Diagnostic I was at a time crunch because school had
 * already started as I explained when i decided for her not to do the diagnostic
 * test again. school started 8/3 and she was already behind in the work."
 *
 * That is a SCHEDULING decision and it was the right one. Three days of
 * re-testing in the second week of term costs three days of teaching, and the
 * app was already built so a ceiling cannot misplace her: every Khan course
 * starts at Unit 1, so a Geometry ceiling of 2.00 and a true 1.4 send her to
 * exactly the same first unit. Refusing to re-test cost her nothing.
 *
 * ---- WHAT WAS WRONG WAS THE RECORDING, NOT THE DECISION ----
 *
 * It went into the master plan under "Settled and not to be reopened" —
 * permanent, with no expiry and nothing that would ever raise it again. A
 * time-bound call was written down as a forever one.
 *
 * That is this project's own tenth bug, in its own words: "a decision, correctly
 * made and correctly recorded, that nobody revisited when the thing it was about
 * changed. The check did not have a gap. IT HAD A LIST." And v3.42: "an
 * exemption that cannot expire is not an exemption, it is a hole."
 *
 * ---- THE TRIGGER IS AN EVENT, NOT A DATE ----
 *
 * The timetable has no calendar and does not get one here either. The trigger
 * fires when THE TEACHING HAS HAPPENED: The Human Body was built to attack
 * exactly these floors — units, area, perimeter and elapsed time, module by
 * module, per master plan section 31. Once she has read the modules that teach
 * a floored strand, the app has taught the thing the test could not measure, and
 * re-measuring costs her no school days because the work is already done.
 *
 * The module lists below are CONTENT, declared once with a written reason, the
 * same shape as DECLARED_OMISSIONS. What is DERIVED is whether the trigger has
 * fired, and check-placement fails the build if any module named here does not
 * exist or holds no lessons — so this cannot rot quietly the way a list does.
 */
export const RE_DIAGNOSTIC = {
  decidedBy: 'Gigi',
  decidedOn: '2026-08-13',
  reason:
    'School started Aug 3 and she was already behind. Re-sitting the Check-In in the second week ' +
    'of term would have cost teaching days to re-measure something that could not misplace her, ' +
    'because every course starts at Unit 1 regardless of the number.',
  triggers: [
    {
      strandId: 'measurement-data',
      courseId: 'humanbody',
      afterModules: [3, 7, 10, 12, 14],
      why:
        'Units 0 of 3 and elapsed time 0 of 1 at the Check-In. M3 measures her in cm AND inches, ' +
        'M7 one breath in millilitres, M10 seven metres of string in metres and cm, M12 the ' +
        'two-point test in mm, M14 a fingernail in mm every third day. By the end of those five ' +
        'she has kept a notebook of her own measurements and the strand can be measured honestly.'
    },
    {
      strandId: 'geometry',
      courseId: 'humanbody',
      afterModules: [3, 10],
      why:
        'Perimeter 0 of 3 and area 0 of 2 at the Check-In. M3 traces her hand on squared paper for ' +
        'area AND perimeter; M10 asks why a folded lining catches more. Those are the only two ' +
        'modules in the app that teach either, so the trigger cannot fire before the teaching does.'
    }
  ]
};

/**
 * Has a floored strand earned its re-measure yet?
 *
 * DERIVED from her progress, never from a date. Returns null when the strand was
 * measured properly (nothing to re-open), and when the teaching has not happened
 * yet — because asking her to re-sit a test on material she has not been taught
 * is how a re-take becomes a punishment.
 *
 * `lessonsRead` is the set of lesson ids she has finished. `modulesFor` is
 * injected rather than imported so this stays runnable under node.
 */
export function reDiagnosticDue(strandId, state, items, lessonsRead, modulesFor) {
  const trigger = RE_DIAGNOSTIC.triggers.find((t) => t.strandId === strandId);
  if (!trigger) return null;
  if (strandReading(state, items).kind !== 'inconclusive') return null;

  const read = new Set(lessonsRead || []);
  const outstanding = [];
  for (const n of trigger.afterModules) {
    const mod = (modulesFor || []).find((m) => m.module === n && m.courseId === trigger.courseId);
    // A named module that does not exist is a broken trigger, not a passed one.
    if (!mod) return { due: false, broken: true, module: n, trigger };
    for (const lessonId of mod.lessons || []) if (!read.has(lessonId)) outstanding.push(lessonId);
  }
  return {
    due: outstanding.length === 0,
    broken: false,
    outstanding: outstanding.length,
    trigger
  };
}

export function reopenStrandState(prev) {
  const fresh = initialStrandState(prev.strandId);
  return { ...fresh, seenItemIds: [...(prev.seenItemIds || [])] };
}

export function initialDiagnosticState() {
  const strands = {};
  for (const id of STRAND_IDS) strands[id] = initialStrandState(id);
  return {
    strands,
    /** Every answer she has given, in order. The parent history is built from
     *  this and nothing else, so what the report shows is what happened. */
    answers: [],
    startedAt: null,
    completedAt: null
  };
}

export function stepFor(asked) {
  return STEP_SCHEDULE[Math.min(asked, STEP_SCHEDULE.length - 1)];
}

/**
 * Has this strand's estimate stopped moving meaningfully?
 *
 * True when the last three levels all sit inside a CONVERGED_BAND-wide window
 * — which is what a staircase looks like once it is straddling the right
 * answer, alternating up-down-up around it.
 */
export function hasConverged(levelHistory) {
  if (levelHistory.length < 4) return false;
  const recent = levelHistory.slice(-3);
  return Math.max(...recent) - Math.min(...recent) <= CONVERGED_BAND;
}

/**
 * Record one answer against one strand and return the NEW strand state.
 * Never mutates its input — the caller (the store) swaps the object in.
 */
export function applyAnswer(state, correct, itemLevel = null) {
  const step = stepFor(state.asked);
  // Asymmetric on purpose — see UP_STEP_RATIO above.
  const level = clampLevel(state.level + (correct ? step * UP_STEP_RATIO : -step));
  const asked = state.asked + 1;
  const levelHistory = [...state.levelHistory, level];
  const settled =
    asked >= MAX_ITEMS_PER_STRAND ||
    (asked >= MIN_ITEMS_BEFORE_EARLY_SETTLE && hasConverged(levelHistory));

  // ---- THE SIGNAL THE STAIRCASE THROWS AWAY ----
  //
  // A staircase only remembers a direction of travel. It does not remember WHAT
  // she got wrong. But "she was given the two easiest questions in the bank and
  // missed both" is far stronger evidence about a child near the floor than
  // wherever eight noisy steps happen to land — and with four-choice questions,
  // a child at the bottom lands high often enough that a third of them were
  // being handed a confident number that was a full grade out.
  //
  // So the easiest items are counted separately. Getting them wrong is what
  // "below the floor" actually looks like.
  const isEasy = itemLevel != null && itemLevel <= MIN_LEVEL + 0.5;
  const easyAsked = (state.easyAsked || 0) + (isEasy ? 1 : 0);
  const easyMissed = (state.easyMissed || 0) + (isEasy && !correct ? 1 : 0);

  return {
    ...state,
    level,
    asked,
    correct: state.correct + (correct ? 1 : 0),
    settled,
    levelHistory,
    easyAsked,
    easyMissed
  };
}

/**
 * How much weight the number deserves. Shown to the parent next to every
 * level, and deliberately NOT shown to the child — "we are still working this
 * one out" is a useful caveat for an adult reading a report and a discouraging
 * thing to put in front of a nine-year-old mid-test.
 */
export function confidenceFor(state) {
  if (!state || state.asked < 1) return 'none';
  if (state.asked < 4) return 'low';
  if (state.asked < MIN_ITEMS_BEFORE_EARLY_SETTLE) return 'medium';

  // ---- WHY THIS IS NOT JUST A COUNT OF QUESTIONS ----
  //
  // It used to be: six questions answered, therefore "Confident". That measures
  // how much data was collected, not whether the data agreed — and those are
  // very different things.
  //
  // The case that exposed it: a simulated child sitting at the very bottom of
  // the scale. Four-choice questions give her a 25% floor, so she gets a few
  // right by luck, her estimate drifts up, and after six questions the app
  // printed a number a full grade too high and labelled it Confident. A parent
  // reading "2.4, Confident" would have no reason to doubt it.
  //
  // Two things now block "high", and both are reasons a number deserves doubt:
  //
  //   1. She is against a boundary. At the floor or the ceiling the estimate
  //      can only err in one direction, so it is a bound, not a measurement.
  //   2. The estimate never stopped moving. If the last three steps are still
  //      spread wide, the staircase had not converged when it ran out of
  //      questions — it stopped, which is not the same as settling.
  if (isFloorBounded(state) || state.level >= MAX_LEVEL - 0.3) return 'medium';

  const h = state.levelHistory || [];
  const tail = h.slice(-3);
  if (tail.length === 3) {
    const spread = Math.max(...tail) - Math.min(...tail);
    if (spread > CONVERGED_BAND * 1.5) return 'medium';
  }
  return 'high';
}

export const CONFIDENCE_LABEL = {
  none: 'Not started',
  low: 'Rough estimate',
  medium: 'Treat as approximate',
  high: 'Confident'
};

/**
 * Which strand to ask about next.
 *
 * Rule 1: never an already-settled strand while any unsettled one remains.
 * Rule 2: among unsettled strands, the one with the FEWEST questions asked —
 *         so the diagnostic spreads evenly instead of finishing Math while
 *         Science has never been touched, which is what happens if you just
 *         walk the list in order and she stops halfway through.
 * Rule 3: don't repeat the strand she was just asked about, if there is any
 *         alternative. Three fraction questions in a row reads as "the app
 *         thinks I'm bad at fractions" to a child, and interleaving is better
 *         for attention anyway.
 * Rule 4: ties broken by the caller-supplied index rather than Math.random, so
 *         a session can be replayed exactly when debugging.
 */
export function pickNextStrand(strands, lastStrandId, tieBreaker = 0) {
  const all = STRAND_IDS.map((id) => strands[id]).filter(Boolean);
  let pool = all.filter((s) => !s.settled);
  if (pool.length === 0) return null; // diagnostic complete

  if (pool.length > 1 && lastStrandId) {
    const withoutLast = pool.filter((s) => s.strandId !== lastStrandId);
    if (withoutLast.length > 0) pool = withoutLast;
  }

  const fewest = Math.min(...pool.map((s) => s.asked));
  const candidates = pool.filter((s) => s.asked === fewest);
  return candidates[tieBreaker % candidates.length].strandId;
}

/**
 * Pick the item to serve: the unseen item in this strand whose level sits
 * closest to the current estimate.
 *
 * `tieBreaker` again rather than Math.random — with a bank this size, two
 * items frequently sit the same distance from the target, and rotating through
 * them by a counter means a retake three weeks later does not serve the exact
 * same paper.
 */
export function chooseItem(items, targetLevel, seenItemIds, tieBreaker = 0) {
  const unseen = items.filter((i) => !seenItemIds.includes(i.id));
  // Every item seen already? Allow repeats rather than crashing — that is the
  // right failure for a fourth retake, and MAX_ITEMS_PER_STRAND makes it rare.
  const pool = unseen.length > 0 ? unseen : items;
  if (pool.length === 0) return null;

  let best = Infinity;
  for (const item of pool) {
    const d = Math.abs(item.level - targetLevel);
    if (d < best) best = d;
  }
  const closest = pool.filter((i) => Math.abs(i.level - targetLevel) - best < 0.001);
  return closest[tieBreaker % closest.length];
}

/** Whole-subject level: the mean of its strands, weighted by nothing. A strand
 *  she has barely been asked about counts the same as one that is settled,
 *  which is why the subject number is reported WITH the strand breakdown and
 *  never on its own. */
export function subjectLevel(strands, strandIdsInSubject) {
  const states = strandIdsInSubject.map((id) => strands[id]).filter((s) => s && s.asked > 0);
  if (states.length === 0) return null;
  const sum = states.reduce((acc, s) => acc + s.level, 0);
  return sum / states.length;
}

export function diagnosticProgress(strands) {
  const all = STRAND_IDS.map((id) => strands[id]).filter(Boolean);
  const settledCount = all.filter((s) => s.settled).length;
  const askedCount = all.reduce((acc, s) => acc + s.asked, 0);
  // The denominator is what a full run would ask at most, so the bar never
  // jumps backwards when a strand settles early — it jumps FORWARD, which is
  // the pleasant direction for a surprise.
  const maxQuestions = all.length * MAX_ITEMS_PER_STRAND;
  return {
    settledCount,
    strandCount: all.length,
    askedCount,
    maxQuestions,
    complete: settledCount === all.length,
    fraction: all.length === 0 ? 0 : settledCount / all.length
  };
}

/**
 * Turn 4.2 into "4th grade, about halfway through".
 *
 * The decimal is the truth and the parent report shows it, but "4.2" means
 * nothing to a child and surprisingly little to most adults. The words are
 * what goes on screen.
 */
/** A level this close to the top means the bank ran out of harder questions,
 *  not that we found her limit. Reported as "or above" rather than as a number,
 *  because a ceiling reading is a floor on the truth. */
export const CEILING_THRESHOLD = 6.3;
export const FLOOR_THRESHOLD = 2.2;

export function describeLevel(level) {
  if (level == null) return { grade: null, text: 'Not measured yet', short: '—' };
  if (level >= CEILING_THRESHOLD) {
    return {
      grade: 6,
      text: '6th grade or above — this check-in stops measuring here',
      short: '6th grade+',
      decimal: Math.round(level * 10) / 10,
      atCeiling: true
    };
  }
  if (level <= FLOOR_THRESHOLD) {
    return {
      grade: 2,
      text: '2nd grade or below — this check-in stops measuring here',
      short: '2nd grade or below',
      decimal: Math.round(level * 10) / 10,
      atFloor: true
    };
  }
  const grade = Math.floor(level);
  const into = level - grade;
  let where;
  if (into < 0.2) where = 'just starting';
  else if (into < 0.45) where = 'early in';
  else if (into < 0.7) where = 'about halfway through';
  else if (into < 0.9) where = 'well into';
  else where = 'nearly finished with';
  const ord = ordinal(grade);
  return {
    grade,
    text: `${where} ${ord} grade`,
    short: `${ord} grade`,
    decimal: Math.round(level * 10) / 10
  };
}

export function ordinal(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
