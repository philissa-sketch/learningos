/**
 * =============================================================================
 * A LADDER OF GRADE LEVELS, WHERE EACH RUNG IS EARNED BEFORE THE NEXT OPENS.
 * =============================================================================
 *
 * WHY THIS EXISTS. (Sept 28, 2026.)
 *
 * A review of one school against its student's stated career found the subject
 * that decides that career carrying the WEAKEST verification of any subject in
 * the app. Every other subject had quarterly exams. This one was assessed
 * entirely by percentages a parent typed in by hand, unit by unit, with nothing
 * checking that a whole grade level had actually been learned before the next
 * one started.
 *
 * That matters because the plan behind it is a catch-up plan: four grade levels
 * inside one school year, each one the foundation of the next. A plan like that
 * either holds or it quietly doesn't, and "quietly" was the problem — nothing
 * in the app could tell the difference.
 *
 * The cumulative end-of-course tests were already there, already seeded, and
 * were being treated as one more optional unit at the end of a quarter. This
 * turns them into the gate they were built to be.
 *
 * ---- THE PARENT CHOSE A HARD STOP ----
 *
 * Asked whether a missed test should lock the next level or merely warn, she
 * chose lock. So a level does not open until the level below it is passed. That
 * is a real cost — a stall stops the year — and it is the point: a stall that
 * stops the year is visible, and a stall that doesn't is what this exists to
 * prevent.
 *
 * ---- WHY THIS FILE NAMES NO SUBJECT AND NO SERVICE ----
 *
 * It takes rows and returns state. It does not know which subject it is
 * looking at, which site the work is done on, or what a level is called beyond
 * the text in the data. Any Academy with levelled work and an end-of-level test
 * gets this for free, and a school that renames its levels needs no change here.
 */

/**
 * The bar a cumulative end-of-level test must clear.
 *
 * 80, not the 90 used for a single lesson. A course challenge is adaptive and
 * cumulative across a whole year of material — it is a harder instrument than a
 * ten-question lesson, and holding it to the lesson bar would fail a student
 * who has genuinely learned the course. 80 is a B-minus on the same scale the
 * report card already uses.
 */
export const PASS_MARK = 80;

/**
 * Levels sort by the number in them, not alphabetically.
 *
 * '10th' must come after '9th'. A string sort puts it before, which would
 * silently invert the top of any ladder that reaches double figures — a bug
 * that would not show up until the year it mattered.
 */
export function levelRank(gradeLevel) {
  const n = parseInt(String(gradeLevel ?? '').trim(), 10);
  return Number.isFinite(n) ? n : Number.POSITIVE_INFINITY;
}

/** Every level present in these rows, lowest first. Unparseable levels sort last. */
export function ladderLevels(rows) {
  const seen = new Set();
  for (const r of rows || []) if (r?.gradeLevel) seen.add(r.gradeLevel);
  return [...seen].sort((a, b) => levelRank(a) - levelRank(b) || String(a).localeCompare(String(b)));
}

/** The end-of-level test for one level, or null. */
export function challengeRowFor(rows, gradeLevel) {
  return (rows || []).find((r) => r?.isCourseChallenge && r.gradeLevel === gradeLevel) || null;
}

/**
 * ---- FOUR STATES, NOT TWO ----
 *
 * "Not passed" hides a distinction the parent needs: a test he has not sat is
 * his to go and do, and a test he sat three weeks ago that she has not graded
 * yet is HERS. Collapsing those into one locked door would have the app blame
 * the child for the adult's backlog.
 */
export const CHALLENGE_STATES = ['missing', 'not-started', 'awaiting-grade', 'below-pass', 'passed'];

export function challengeState(row, passMark = PASS_MARK) {
  if (!row) return 'missing';
  if (!row.completed) return 'not-started';
  const pct = typeof row.gradePercent === 'number' ? row.gradePercent : null;
  if (pct === null) return 'awaiting-grade';
  return pct >= passMark ? 'passed' : 'below-pass';
}

export function challengePassed(row, passMark = PASS_MARK) {
  return challengeState(row, passMark) === 'passed';
}

/**
 * The whole ladder, rung by rung.
 *
 * A rung is locked when the rung BELOW it has a test that has not been passed.
 * The lowest rung is never locked, and a rung below which no test exists is
 * never locked either — a gate with nothing behind it is a wall.
 *
 * `opensWhen` is the sentence the locked rung shows. It is assembled from the
 * level's own label so it carries the school's words, not this file's.
 */
export function ladderState(rows, { passMark = PASS_MARK } = {}) {
  const levels = ladderLevels(rows);
  const out = [];
  let blockedFrom = null;

  levels.forEach((level, i) => {
    const units = (rows || []).filter((r) => r.gradeLevel === level && !r.isCourseChallenge);
    const challenge = challengeRowFor(rows, level);
    const state = challengeState(challenge, passMark);
    const below = i > 0 ? out[i - 1] : null;

    /**
     * Once a rung is locked every rung above it is locked too, and all of them
     * name the SAME test — the first unpassed one. Without that, level 8 would
     * tell him to pass level 7 while level 7 was itself shut, which reads as
     * two problems when there is one.
     */
    const locked = blockedFrom !== null;
    const blocker = locked ? blockedFrom : null;

    const rung = {
      level,
      rank: levelRank(level),
      units: units.length,
      done: units.filter((u) => u.completed).length,
      challenge,
      challengeState: state,
      challengePassed: state === 'passed',
      locked,
      blockedBy: blocker ? blocker.level : null,
      opensWhen: locked ? opensWhenSentence(blocker) : null
    };
    out.push(rung);

    if (blockedFrom === null && challenge && state !== 'passed') blockedFrom = { level, state };
  });

  return out;
}

/** What a shut rung says about itself. One sentence, no blame. */
export function opensWhenSentence(blocker) {
  if (!blocker) return null;
  const level = blocker.level;
  switch (blocker.state) {
    case 'awaiting-grade':
      return `Waiting on a grade for the ${level} Course Challenge. A grown-up enters it in the Parent Dashboard.`;
    case 'below-pass':
      return `Opens when the ${level} Course Challenge is passed — ${PASS_MARK}% or better. It can be taken again.`;
    default:
      return `Opens when the ${level} Course Challenge is passed — ${PASS_MARK}% or better.`;
  }
}

/** The rung a row sits on, or null for a row with no level. */
export function rungFor(ladder, row) {
  if (!row?.gradeLevel) return null;
  return (ladder || []).find((r) => r.level === row.gradeLevel) || null;
}

/**
 * Is this row shut away right now?
 *
 * THE TEST ITSELF IS NEVER LOCKED. Locking the thing that opens the door is
 * the one mistake that would strand him completely, so it is stated here
 * rather than left to each caller to remember.
 */
export function rowIsLocked(ladder, row) {
  if (!row || row.isCourseChallenge) return false;
  const rung = rungFor(ladder, row);
  return rung ? rung.locked === true : false;
}

/** The rung he is working on: the lowest open one that is not finished. */
export function currentRung(ladder) {
  const open = (ladder || []).filter((r) => !r.locked);
  return open.find((r) => r.done < r.units) || open[open.length - 1] || null;
}

/** One line for a dashboard: where he is and whether anything is shut. */
export function ladderSummary(ladder) {
  const rungs = ladder || [];
  const here = currentRung(rungs);
  const shut = rungs.filter((r) => r.locked);
  return {
    here: here ? here.level : null,
    done: here ? here.done : 0,
    units: here ? here.units : 0,
    lockedCount: shut.length,
    blockedBy: shut.length ? shut[0].blockedBy : null,
    opensWhen: shut.length ? shut[0].opensWhen : null
  };
}
