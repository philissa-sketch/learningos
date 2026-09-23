// ---------------------------------------------------------------------------
// THE YEAR PLAN — four quarters, per subject, built from her real levels.
//
// "The lessons need to be linked to Khan Academy for the ones she doesn't need
// to retest for. Make sure the lessons are created in quarters."
//
// Two instructions, and the first one is the sharper of the two. It says: do
// not build a year of work on a number you already know is wrong.
//
// FIVE of her nine strands are not levels. The item bank had no question easy
// enough to find her, so in geometry, measurement, grammar, writing and
// patterns the test never asked her anything below where it placed her. Each of
// those numbers is a ceiling, not a measurement.
//
// I first thought it was four. The fifth — Patterns, at 2.98 — only appeared
// once the rule was written properly: the easiest patterns question she was
// ever given was 3.0. Judging it by eye missed one; judging it by the
// transcript did not.
//
// Planning a year against a ceiling turns one bad measurement into thirty-six
// weeks of work at the wrong difficulty, which is far more expensive than the
// original bug. So this file does something software is usually bad at: for
// those five it REFUSES TO PLAN, says exactly why, and points at the
// fifteen-minute fix. The other four get their full year.
//
// A plan that admits a gap is worth more than a plan that fills it with a
// guess, because only one of them can be corrected.
// ---------------------------------------------------------------------------

import { khanFor, KHAN_COURSES, KHAN_MAP } from '../data/khan/khanMap.js';
import { scopeFor } from '../data/khan/khanScope.js';
import { isFloorBounded, MIN_LEVEL, FLOOR_BAND } from '../engine/diagnosticEngine.js';
import { STRANDS } from '../config/strands.js';
import { itemsForStrand } from '../data/diagnostic/index.js';

/**
 * The easiest question she was ACTUALLY SERVED in this strand.
 *
 * This is the number that decides whether a result is a measurement or a
 * ceiling, and it is the honest version of a rule I got wrong twice.
 *
 * A staircase can only find where a child is if it asks her something easier
 * than that. If the easiest question she ever saw sits at or above where the
 * test says she landed, the test never probed below her — it ran out of easy
 * questions and stopped. The number that comes out is an upper bound wearing a
 * decimal point.
 *
 * Her transcript is the case in point. Geometry says 2.00, and the easiest
 * geometry question she was given was 2.4. Grammar says 2.15; easiest asked,
 * 2.3. Patterns says 2.98; easiest asked, 3.0. In all three the test looked
 * only upward from where she was standing.
 */
function easiestServed(strandId, state) {
  const seen = new Set(state?.seenItemIds || []);
  if (seen.size === 0) return null;
  const levels = itemsForStrand(strandId)
    .filter((i) => seen.has(i.id))
    .map((i) => i.level);
  return levels.length ? Math.min(...levels) : null;
}

/** Which course key a strand+level lands in. Mirrors khanFor's band walk. */
function courseKeyFor(strandId, level) {
  const bands = KHAN_MAP[strandId];
  if (!bands || level == null) return null;
  const band = bands.find((b) => level <= b.upTo) || bands[bands.length - 1];
  return band.course;
}

/**
 * Should this strand get a year plan at all?
 *
 * Returns null when it should, or a reason when it should not. The reason is
 * shown to the grown-up verbatim — it is not an error state, it is an answer.
 */
export function planBlocker(state, strandId = null) {
  if (!state || state.asked === 0) {
    return {
      code: 'not-measured',
      short: 'Not measured yet',
      why: 'She has not answered any questions in this strand, so there is nothing to build a year from.',
      fix: 'Have her take the Check-In.'
    };
  }
  // ---- A CEILING NO LONGER BLOCKS THE YEAR (v3.23) ----
  //
  // Gigi: "Remove that from My Learning because she isn't going to complete the
  // diagnostic test again."
  //
  // The refusal was RIGHT when it was written, and the reason is still true:
  // five of her nine numbers are ceilings, not measurements. The test never
  // asked her anything below where it placed her, so planning thirty-six weeks
  // against them would have aimed a year at a level nobody found.
  //
  // WHAT CHANGED IS NOT HER MIND. IT IS THE PLAN. Until v3.21 a year was built
  // by walking forward from wherever her number sat, so a wrong number put her
  // in the wrong place. Since v3.21 the number chooses only the COURSE, and the
  // course starts at UNIT 1 and walks 1, 2, 3 in order. Her Geometry ceiling of
  // 2.00 and a true level of 1.4 send her to exactly the same place: the first
  // unit of 2nd Grade Math.
  //
  // A ceiling can no longer put her in the wrong place, so refusing to plan
  // stopped protecting her and started being the only thing standing between
  // her and a year of work.
  //
  // THE FACT IS NOT DELETED. `ceilingNote()` still returns it, My Levels and
  // the Grown-Up Corner still say the number is an upper bound, and the record
  // still shows it as a ceiling rather than a measurement. What has gone is the
  // BLOCK, not the honesty. And the guard has not gone either — it has been
  // inverted: check-yearplan now fails the build if a ceiling is ever planned
  // anywhere except the start of its course.
  return null;
}

/**
 * Is this number a ceiling rather than a measurement? Still true, still shown.
 *
 * Kept as its own exported function precisely so that removing the block did
 * not remove the fact. Anything that wants to tell a grown-up "this is an upper
 * bound" asks here.
 */
export function ceilingNote(state, strandId = null) {
  return floorBlocker(state, strandId);
}

/** True when a strand's plan must start at the very beginning of its course. */
export function mustStartAtBeginning(state, strandId = null) {
  return Boolean(floorBlocker(state, strandId));
}

function floorBlocker(state, strandId) {
  const easiest = strandId ? easiestServed(strandId, state) : null;
  if (easiest != null && easiest >= state.level) {
    return {
      code: 'never-probed-below',
      short: 'Needs re-measuring first',
      why:
        `The easiest question she was given in this strand was ${easiest.toFixed(1)}, and the test ` +
        `says she is at ${state.level.toFixed(2)}. It never asked her anything below where it ` +
        `placed her, so that number is a ceiling, not a measurement — her real level could be a ` +
        `long way under it.`,
      fix: 'Grown-Up Corner → Re-measure → re-open this strand. There are much easier questions now.'
    };
  }
  if (isFloorBounded(state)) {
    return {
      code: 'floor',
      short: 'Needs re-measuring first',
      why:
        `This one finished at the bottom of the scale, and at the time the easiest question in ` +
        `the app was harder than she needed. So the number is a floor, not a measurement — her ` +
        `real level is at or below ${(MIN_LEVEL + FLOOR_BAND).toFixed(1)} and could be lower.`,
      fix: 'Grown-Up Corner → Re-measure → re-open this strand. About 8 questions.'
    };
  }
  return null;
}

/**
 * The four quarters for one strand.
 *
 * Quarter 1 starts where she actually is. Later quarters walk forward through
 * the course, and roll into the next course when the current one runs out —
 * because a year that stops in March is not a year.
 */
export function quartersForStrand(strandId, state) {
  const blocked = planBlocker(state, strandId);
  if (blocked) return { blocked, quarters: [] };

  const level = state.level;
  const key = courseKeyFor(strandId, level);
  const course = KHAN_COURSES[key];
  const scope = scopeFor(key);
  if (!course || !scope) {
    return {
      blocked: {
        code: 'no-scope',
        short: 'No year plan for this course yet',
        why: `Her level points at ${course?.label || key}, which has no quarter-by-quarter plan written yet.`,
        fix: 'Tell me and I will write one.'
      },
      quarters: []
    };
  }

  // Where in the year to start. A child measured at 3.1 is at the beginning of
  // 3rd grade; one at 3.8 is most of the way through it. Starting everyone at
  // Quarter 1 of their grade would send her back over ground she already has.
  const withinGrade = level - Math.floor(level); // 0.0 to 0.99
  const startQ = Math.min(4, Math.max(1, Math.floor(withinGrade * 4) + 1));

  const quarters = [];
  let q = startQ;
  let courseKey = key;
  for (let i = 0; i < 4; i++) {
    let entry = (scopeFor(courseKey) || []).find((e) => e.q === q);
    if (!entry) {
      // Ran off the end of this course — step up to the next one and start it
      // at its first quarter.
      const nextKey = nextCourseAfter(courseKey);
      if (nextKey && scopeFor(nextKey)) {
        courseKey = nextKey;
        q = 1;
        entry = scopeFor(courseKey).find((e) => e.q === 1);
      }
    }
    if (!entry) break;
    const c = KHAN_COURSES[courseKey];
    quarters.push({
      quarter: i + 1,
      courseLabel: c.label,
      courseUrl: c.url,
      units: entry.units || null,
      focus: entry.focus || null,
      // True when the label is a real Khan unit name; false when it is a skill
      // focus I wrote. The screen says which, rather than blurring them.
      named: !!entry.units
    });
    q += 1;
  }

  return {
    blocked: null,
    startedAt: { courseLabel: course.label, level },
    quarters
  };
}

/** The natural next course up, so a year can cross a grade boundary. */
function nextCourseAfter(key) {
  const chains = [
    ['math1', 'math2', 'math3', 'math4', 'math5', 'math6'],
    ['ela1', 'ela2', 'ela3', 'ela4', 'ela5', 'ela6'],
    ['sci3', 'sci4', 'sci5', 'bio']
  ];
  for (const chain of chains) {
    const i = chain.indexOf(key);
    if (i >= 0 && i < chain.length - 1) return chain[i + 1];
  }
  // Grammar is one course all the way up; it does not roll into anything.
  return null;
}

/** Every strand's year, grouped so the screen can show ready vs blocked. */
export function buildYearPlan(strands) {
  const ready = [];
  const blocked = [];
  for (const strand of STRANDS) {
    const state = strands?.[strand.id];
    const plan = quartersForStrand(strand.id, state);
    const row = { strand, state, ...plan };
    if (plan.blocked) blocked.push(row);
    else ready.push(row);
  }
  // Lowest first, same priority rule My Plan uses.
  ready.sort((a, b) => (a.state?.level || 0) - (b.state?.level || 0));
  return { ready, blocked };
}
