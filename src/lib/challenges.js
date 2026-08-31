// ---------------------------------------------------------------------------
// CHALLENGES — daily missions, weekly challenges, seasonal operations.
// (Part 10, built Aug 8, 2026.)
//
// ---- WHY THIS FILE EXISTS, AND WHY IT IS NOT OPTIONAL ----
//
// The Credit ladder in `economy.js` was approved on the assumption that this
// file gets built. Its own log entry records the dependency: the 2,000-Credit
// Dream Reward sits at ~47% of a typical year WITH challenge income, and ~65%
// WITHOUT it. Sixty-five percent means choosing the annual reward costs him
// nearly everything else all year, which is punishing rather than motivating.
//
// So challenges are not decoration on top of the economy. They are the second
// half of it. If this file is ever dropped, the top of CREDIT_LADDER has to
// come down with it.
//
// Target: ~940 Credits a year from challenges (36 school weeks x 15, plus
// 4 seasonal x 100). That figure is asserted by the verification script rather
// than left as a comment, because it is load-bearing.
//
// ---- WHY EVERYTHING HERE IS DATE-SEEDED, NEVER RANDOM ----
//
// This project already learned this the hard way: `getMasteryMessage()` called
// a random-choice function directly in JSX, so Nova's text silently rewrote
// itself on every re-render — harmless until he had a voice, at which point it
// restarted him mid-sentence. The rule that came out of it is that anything
// with a random flavour must be seeded from the date.
//
// Here it matters more than cosmetically. A daily mission that reshuffles on
// re-render is a mission he can never finish, because the goalposts move while
// he is walking toward them. Same day in, same missions out — always.
//
// ---- WHY EVALUATION IS PURE ----
//
// Like `badges.js`, nothing in this file reads the store. Every function takes
// a plain snapshot and returns a plain result, so the whole system can be
// simulated in node without a browser — which is the only way it gets verified
// in this project, since Vite builds cannot run in the sandbox.
// ---------------------------------------------------------------------------

/* -------------------------------------------------------------------------
 * Deterministic seeding
 * ---------------------------------------------------------------------- */

/** FNV-1a. Small, fast, and stable across machines — which matters, because
 *  both computers must generate the SAME missions for the same day. */
function hashString(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

/** mulberry32 — a tiny deterministic PRNG. Same seed, same sequence, forever. */
function seededRandom(seed) {
  let a = seed >>> 0;
  return function next() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Pick `count` distinct items from `pool`, deterministically for `seedKey`. */
function seededSample(pool, count, seedKey) {
  const items = [...pool];
  const rand = seededRandom(hashString(seedKey));
  const out = [];
  const n = Math.min(count, items.length);
  for (let i = 0; i < n; i++) {
    const idx = Math.floor(rand() * items.length);
    out.push(items.splice(idx, 1)[0]);
  }
  return out;
}

/* -------------------------------------------------------------------------
 * Period identifiers
 *
 * These double as the ledger idempotency keys, so their exact shape matters:
 * a claim key must name one period unambiguously and identically on both
 * machines. All are derived from a local date string, never from a timestamp,
 * because this project already fixed a UTC bug that stamped evening work with
 * tomorrow's date.
 * ---------------------------------------------------------------------- */

/** 'YYYY-MM-DD' -> itself. The daily period IS the date. */
export function dailyPeriodId(dateStr) {
  return String(dateStr || '').slice(0, 10);
}

/**
 * ISO week id, e.g. '2026-W33'.
 *
 * Uses the ISO-8601 rule (weeks start Monday, week 1 contains the first
 * Thursday) so the school week Mon-Fri never straddles two ids — a Friday and
 * the Monday before it must belong to the same challenge.
 */
export function weeklyPeriodId(dateStr) {
  const [y, m, d] = String(dateStr).slice(0, 10).split('-').map(Number);
  const dt = new Date(Date.UTC(y, (m || 1) - 1, d || 1));
  const day = dt.getUTCDay() || 7; // Sunday = 7
  dt.setUTCDate(dt.getUTCDate() + 4 - day); // shift to the week's Thursday
  const yearStart = new Date(Date.UTC(dt.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((dt - yearStart) / 864e5 + 1) / 7);
  return `${dt.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
}

/** The claim key a ledger entry carries in its `source`. Must be exact. */
export function claimKey(kind, periodId, challengeId) {
  return `challenge:${kind}:${periodId}:${challengeId}`;
}

/**
 * Has this exact challenge already been paid?
 *
 * Ledger entries carry a random `entryId`, so a union merge cannot dedupe a
 * double-claim by id — two machines would each generate a different id for the
 * same reward. The `source` key is what makes it detectable, and this is the
 * function that must be called before writing a challenge payout.
 */
export function alreadyClaimed(entries, key) {
  for (const e of entries || []) {
    if (e && e.source === key) return true;
  }
  return false;
}

/* -------------------------------------------------------------------------
 * DAILY MISSIONS
 *
 * Three small tasks drawn from the work already on his schedule. The point is
 * NOT to add anything to his day — it is to name three things he was going to
 * do anyway, put them in one place, and let him finish them. A daily mission
 * that asks for extra work is just more homework wearing a badge.
 *
 * Reward is Coins only. The everyday loop should never cost the parent real
 * money, or the economy stops being sustainable in about a month.
 * ---------------------------------------------------------------------- */

export const DAILY_REWARD_COINS = 10;

/**
 * The pool. `field` names a day-scoped count supplied by the caller; `need` is
 * how many of it the task wants.
 *
 * `requires` gates a task on the subject actually being active — there is no
 * point offering a guitar task before guitar exists, and a mission he cannot
 * complete is worse than no mission at all.
 */
export const DAILY_TASK_POOL = [
  { id: 'lesson-1', label: 'Master 1 lesson', field: 'lessonsMastered', need: 1, icon: '🚀' },
  { id: 'lesson-2', label: 'Master 2 lessons', field: 'lessonsMastered', need: 2, icon: '🚀' },
  { id: 'khan-1', label: 'Finish 1 Khan unit', field: 'khanUnits', need: 1, icon: '📘' },
  { id: 'writing-1', label: 'Write 1 journal entry', field: 'writingEntries', need: 1, icon: '✍️' },
  { id: 'workout-1', label: 'Log a workout', field: 'workouts', need: 1, icon: '💪' },
  { id: 'meals-2', label: 'Log 2 meals', field: 'meals', need: 2, icon: '🥗' },
  { id: 'reading-15', label: 'Read for 15 minutes', field: 'readingMinutes', need: 15, icon: '📕' },
  { id: 'garden-1', label: 'Spend a session in the garden', field: 'gardenSessions', need: 1, icon: '🌱', requires: 'garden' },
  { id: 'guitar-1', label: 'Practice guitar', field: 'guitarSessions', need: 1, icon: '🎸', requires: 'guitar' },
  { id: 'assignment-1', label: 'Finish 1 assignment', field: 'assignmentsCompleted', need: 1, icon: '📋' }
];

/**
 * Today's three missions.
 *
 * `active` is the set of optional subjects that exist right now, e.g.
 * ['garden','guitar']. Anything gated on a subject not in that set is dropped
 * before sampling, so the pool can grow as the platform does without ever
 * offering him something he cannot do.
 */
export function getDailyMissions(dateStr, active = []) {
  const periodId = dailyPeriodId(dateStr);
  const pool = DAILY_TASK_POOL.filter((t) => !t.requires || active.includes(t.requires));
  const tasks = seededSample(pool, 3, `daily:${periodId}`);
  return {
    kind: 'daily',
    periodId,
    title: 'Daily Mission',
    tasks,
    reward: { coin: DAILY_REWARD_COINS, credit: 0 }
  };
}

/** Evaluate today's missions against day-scoped counts. */
export function evaluateDaily(mission, todayCounts) {
  // `= {}` is not enough: a default only applies to `undefined`, and a store
  // selector that has not hydrated yet returns null, not undefined. That
  // difference crashes the screen this renders on, so coalesce explicitly.
  const counts = todayCounts || {};
  const tasks = mission.tasks.map((t) => {
    const current = Number(counts[t.field] || 0);
    return { ...t, current: Math.min(current, t.need), done: current >= t.need };
  });
  const doneCount = tasks.filter((t) => t.done).length;
  return {
    ...mission,
    tasks,
    doneCount,
    total: tasks.length,
    complete: doneCount === tasks.length,
    key: claimKey('daily', mission.periodId, 'set')
  };
}

/* -------------------------------------------------------------------------
 * WEEKLY CHALLENGES
 *
 * One themed goal across the school week. This is the first tier that pays
 * Credits, because a week of sustained effort is the smallest unit that
 * genuinely represents commitment rather than a good afternoon.
 * ---------------------------------------------------------------------- */

export const WEEKLY_REWARD = { coin: 40, credit: 15 };

export const WEEKLY_CHALLENGE_POOL = [
  { id: 'w-lessons-8', title: 'Steady Thrust', icon: '🚀', desc: 'Master 8 lessons this week.', field: 'lessonsMastered', need: 8 },
  { id: 'w-khan-3', title: 'Course Correction', icon: '📘', desc: 'Finish 3 Khan units this week.', field: 'khanUnits', need: 3 },
  { id: 'w-workouts-4', title: 'Flight Ready', icon: '💪', desc: 'Log 4 workouts this week.', field: 'workouts', need: 4 },
  { id: 'w-writing-3', title: 'Comms Check', icon: '✍️', desc: 'Write 3 journal entries this week.', field: 'writingEntries', need: 3 },
  { id: 'w-reading-120', title: 'Sensor Sweep', icon: '📕', desc: 'Read for 120 minutes this week.', field: 'readingMinutes', need: 120 },
  { id: 'w-meals-15', title: 'Life Support', icon: '🥗', desc: 'Log 15 meals this week.', field: 'meals', need: 15 },
  { id: 'w-assignments-4', title: 'Clear the Board', icon: '📋', desc: 'Finish 4 assignments this week.', field: 'assignmentsCompleted', need: 4 },
  { id: 'w-allfive', title: 'All Systems', icon: '🛰️', desc: 'Do something in 5 different subjects this week.', field: 'subjectsTouched', need: 5 },
  { id: 'w-fourplusone', title: 'The 4+1 Week', icon: '🗓️', desc: 'Finish the week’s work by Thursday.', field: 'finishedByThursday', need: 1 },
  { id: 'w-garden-2', title: 'Closed Loop', icon: '🌱', desc: 'Two garden sessions this week.', field: 'gardenSessions', need: 2, requires: 'garden' },
  { id: 'w-guitar-3', title: 'Crew Morale', icon: '🎸', desc: 'Practice guitar 3 times this week.', field: 'guitarSessions', need: 3, requires: 'guitar' }
];

export function getWeeklyChallenge(dateStr, active = []) {
  const periodId = weeklyPeriodId(dateStr);
  const pool = WEEKLY_CHALLENGE_POOL.filter((c) => !c.requires || active.includes(c.requires));
  const [challenge] = seededSample(pool, 1, `weekly:${periodId}`);
  return { kind: 'weekly', periodId, ...challenge, reward: { ...WEEKLY_REWARD } };
}

export function evaluateWeekly(challenge, weekCounts) {
  const counts = weekCounts || {};
  const current = Number(counts[challenge.field] || 0);
  return {
    ...challenge,
    current: Math.min(current, challenge.need),
    complete: current >= challenge.need,
    pct: Math.max(0, Math.min(1, current / challenge.need)),
    key: claimKey('weekly', challenge.periodId, challenge.id)
  };
}

/* -------------------------------------------------------------------------
 * SEASONAL OPERATIONS
 *
 * One multi-week arc per quarter, pre-authored rather than generated. These
 * are the closest thing in the system to a real mission: a named operation
 * with a reason, several tasks across different subjects, a finish line, and a
 * debrief.
 *
 * Every task is work already on the curriculum. Nothing here is added
 * academically — what changes is that it now has a frame and an ending.
 *
 * The reward is the only routine path to a large Credit block, which is what
 * makes finishing a quarter mean something.
 * ---------------------------------------------------------------------- */

export const SEASONAL_REWARD = { coin: 150, credit: 100 };

export const SEASONAL_OPERATIONS = [
  {
    id: 'op-skyhook',
    quarter: 'Q1',
    name: 'OPERATION SKYHOOK',
    icon: '🚀',
    brief:
      'We have a payload problem. Before anything flies, somebody has to prove the wing math works. That is you.',
    debrief:
      'Wing math checks out and the report is filed. Flight test is cleared. Good work, engineer.',
    tasks: [
      { id: 'sky-1', label: 'Master 15 lessons', field: 'lessonsMastered', need: 15 },
      { id: 'sky-2', label: 'Log 12 workouts — flight crews stay flight-ready', field: 'workouts', need: 12 },
      { id: 'sky-3', label: 'Write 4 journal entries', field: 'writingEntries', need: 4 },
      { id: 'sky-4', label: 'Add 1 project to the Portfolio', field: 'portfolioEntries', need: 1 }
    ]
  },
  {
    id: 'op-groundtruth',
    quarter: 'Q2',
    name: 'OPERATION GROUND TRUTH',
    icon: '🛰️',
    brief:
      'Instruments are only as good as what you check them against. This quarter you build the evidence — read it, test it, write it down.',
    debrief:
      'Sensors calibrated. You can tell what is measured from what is assumed now, which is most of engineering.',
    tasks: [
      { id: 'gt-1', label: 'Master 15 lessons', field: 'lessonsMastered', need: 15 },
      { id: 'gt-2', label: 'Finish 6 Khan units', field: 'khanUnits', need: 6 },
      { id: 'gt-3', label: 'Finish 2 books', field: 'booksCompleted', need: 2 },
      { id: 'gt-4', label: 'Complete a field trip', field: 'fieldTripsCompleted', need: 1 }
    ]
  },
  {
    id: 'op-lifesupport',
    quarter: 'Q3',
    name: 'OPERATION LIFE SUPPORT',
    icon: '🌱',
    brief:
      'A Mars crew eats what it grows and stays strong enough to work. Life support is not a side system — it is the one that keeps the crew alive.',
    debrief:
      'Closed loop holding. Food, fuel and fitness all logged. The crew flies.',
    tasks: [
      { id: 'ls-1', label: 'Master 15 lessons', field: 'lessonsMastered', need: 15 },
      { id: 'ls-2', label: 'Log 60 meals', field: 'meals', need: 60 },
      { id: 'ls-3', label: 'Log 15 workouts', field: 'workouts', need: 15 },
      { id: 'ls-4', label: 'Log 8 garden sessions', field: 'gardenSessions', need: 8 }
    ]
  },
  {
    id: 'op-deepfield',
    quarter: 'Q4',
    name: 'OPERATION DEEP FIELD',
    icon: '🔭',
    brief:
      'Long missions are won before launch, in the work nobody watches. Close the year the way a flight crew closes a campaign — everything finished, everything documented.',
    debrief:
      'Campaign complete. Everything you built this year is on the record. That record is what gets you to the next one.',
    tasks: [
      { id: 'df-1', label: 'Master 15 lessons', field: 'lessonsMastered', need: 15 },
      { id: 'df-2', label: 'Add 2 projects to the Portfolio', field: 'portfolioEntries', need: 2 },
      { id: 'df-3', label: 'Write 5 journal entries', field: 'writingEntries', need: 5 },
      { id: 'df-4', label: 'Finish 8 assignments', field: 'assignmentsCompleted', need: 8 }
    ]
  }
];

/** The operation for a quarter label like 'Q3 2026-2027' (or plain 'Q3'). */
export function getSeasonalOperation(quarterLabel) {
  const q = String(quarterLabel || '').trim().slice(0, 2).toUpperCase();
  return SEASONAL_OPERATIONS.find((o) => o.quarter === q) || null;
}

/**
 * Evaluate an operation against quarter-scoped counts.
 *
 * `periodId` is the full quarter label, so the claim key distinguishes Q1 of
 * 2026-2027 from Q1 of 2027-2028 — the same operation runs again next year and
 * must be payable again.
 */
export function evaluateSeasonal(operation, quarterLabel, quarterCounts) {
  if (!operation) return null;
  const counts = quarterCounts || {};
  const periodId = String(quarterLabel || operation.quarter);
  const tasks = operation.tasks.map((t) => {
    const current = Number(counts[t.field] || 0);
    return { ...t, current: Math.min(current, t.need), done: current >= t.need };
  });
  const doneCount = tasks.filter((t) => t.done).length;
  return {
    ...operation,
    kind: 'seasonal',
    periodId,
    tasks,
    doneCount,
    total: tasks.length,
    complete: doneCount === tasks.length,
    pct: tasks.length ? doneCount / tasks.length : 0,
    reward: { ...SEASONAL_REWARD },
    key: claimKey('seasonal', periodId, operation.id)
  };
}

/* -------------------------------------------------------------------------
 * Projected income — the number the ladder depends on
 * ---------------------------------------------------------------------- */

export const SCHOOL_WEEKS_PER_YEAR = 36;
export const SCHOOL_DAYS_PER_YEAR = 180;

/**
 * What challenges are expected to pay in a full year, at full completion.
 *
 * This is checked by the verification script against the assumption baked into
 * CREDIT_LADDER. If someone later re-tunes a reward here, the check fails and
 * the ladder gets revisited — which is exactly the drift this project keeps
 * catching itself in.
 */
export function projectedAnnualIncome() {
  return {
    coin:
      DAILY_REWARD_COINS * SCHOOL_DAYS_PER_YEAR +
      WEEKLY_REWARD.coin * SCHOOL_WEEKS_PER_YEAR +
      SEASONAL_REWARD.coin * SEASONAL_OPERATIONS.length,
    credit:
      WEEKLY_REWARD.credit * SCHOOL_WEEKS_PER_YEAR +
      SEASONAL_REWARD.credit * SEASONAL_OPERATIONS.length
  };
}
