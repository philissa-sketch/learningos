/**
 * =============================================================================
 * THE PE SLOT — the platform asks for a plan, not for a function.
 * =============================================================================
 *
 * ---- WHY THIS EXISTS (audit finding 1 — "a school cannot be data") ----
 *
 * The `pe` slot used to hand over three FUNCTIONS: `getTodaysWorkout`,
 * `curatedDemoFor` and `demoLinkFor`. A stored Academy cannot hold a function,
 * so every one of them was a reason a second family could only get a
 * curriculum by someone writing JavaScript and deploying it.
 *
 * They were never really the school's, either. Rotating a pool by week number,
 * ranking a parent's saved video above a curated one — that is mechanism, and
 * it is identical for every school. What belongs to a school is the PLAN and
 * the POOLS. So the platform asks for those and does the computing itself.
 *
 * This is the same shape `slots/projects.js` established in step 4, and the
 * first test of whether it generalises past one slot.
 *
 * ---- ONE THING THAT SURFACED ON THE WAY ----
 *
 * `getWorkoutForDate` carried two sentences of English inside it — the warm-up
 * and cool-down advice. Prose in a function is content wearing mechanism's
 * clothes: it cannot be translated, cannot be changed by a parent, and would
 * have moved into the platform along with the rotation logic if nobody looked.
 * It is asked for as `WORKOUT_NOTES` instead.
 */

/**
 * What the platform asks this slot for.
 *
 * Exported so a check can assert against it rather than retyping the words.
 */
export const PE_QUESTIONS = Object.freeze([
  'WEEKLY_PLAN',
  'EXERCISE_DEMO_VIDEOS',
  'WORKOUT_NOTES',
  'exerciseLibrary',
  'CATEGORY_LABELS'
]);

/** Saved against an exercise to mean "show him nothing here". */
export const HIDDEN_VIDEO = 'none';

const EXERCISES_PER_WORKOUT = 4;

const slot = (content) => (content && typeof content.pe === 'object' && content.pe) || {};

/**
 * A curated pick for one exercise, or null.
 *
 * Always a watch URL for one specific video — never a search, never a channel.
 * The school answers with ids and titles; building the URL is this file's job,
 * which is also what stops a school being able to point a child at a search
 * page by filling the slot carelessly.
 */
export function curatedDemoFor(content, exerciseId) {
  const videos = slot(content).EXERCISE_DEMO_VIDEOS;
  const v = videos && videos[exerciseId];
  if (!v || !v.videoId) return null;
  return {
    url: `https://www.youtube.com/watch?v=${v.videoId}`,
    videoId: v.videoId,
    title: v.title,
    channel: v.channel,
    length: v.length
  };
}

/**
 * The link to show for one exercise, in priority order:
 *   1. a specific video the parent saved
 *   2. a specific curated video
 *   3. nothing
 *
 * The order is the mechanism and does not belong to a school. A parent's own
 * choice outranking a curated default is true for every family.
 */
export function demoLinkFor(content, exercise, { savedVideos = {}, enabled = true } = {}) {
  if (!enabled) return null;
  const id = exercise?.id;
  if (!id) return null;

  const saved = savedVideos[id];
  if (saved === HIDDEN_VIDEO) return null;
  if (saved) return { url: saved, kind: 'parent', label: 'Watch how it’s done' };

  const curated = curatedDemoFor(content, id);
  if (!curated) return null;
  return {
    url: curated.url,
    kind: 'curated',
    label: 'Watch how it’s done',
    title: curated.title,
    channel: curated.channel,
    length: curated.length
  };
}

/** The day's entry in this school's weekly plan, or null. */
export function dayPlanFor(content, date = new Date()) {
  const plan = slot(content).WEEKLY_PLAN;
  if (!Array.isArray(plan)) return null;
  return plan.find((d) => d.dayIndex === date.getDay()) || null;
}

/**
 * Deterministically picks N exercises from a category's pool, rotating the
 * starting offset by week number.
 *
 * Pure: the same (category, week) always returns the same exercises, so
 * "today's workout" does not change if a child reloads the app the same day.
 */
export function pickExercisesForWeek(content, category, weekNumber, count = EXERCISES_PER_WORKOUT) {
  const library = slot(content).exerciseLibrary || {};
  const pool = library[category] || [];
  if (pool.length === 0) return [];
  const n = Math.min(count, pool.length);
  const offset = ((weekNumber % pool.length) + pool.length) % pool.length;
  const picked = [];
  for (let i = 0; i < n; i++) picked.push(pool[(offset + i) % pool.length]);
  return picked;
}

/**
 * A full workout for a date, or null when this school has no plan.
 *
 * NULL, not a throw and not an empty shell. A school with no PE is a real
 * state — the dashboard already reads a null workout as "nothing today" —
 * whereas a half-built object puts an empty card on a child's screen with a
 * title and no exercises under it.
 *
 * `weekNumber` is passed in rather than computed here so this stays pure and a
 * check can ask for any week without moving the clock.
 */
export function workoutForDate(content, date, weekNumber) {
  const dayPlan = dayPlanFor(content, date);
  if (!dayPlan) return null;
  const notes = slot(content).WORKOUT_NOTES || {};
  const labels = slot(content).CATEGORY_LABELS || {};
  const isRecovery = dayPlan.category === 'recovery';
  return {
    dayName: dayPlan.dayName,
    category: dayPlan.category,
    categoryLabel: labels[dayPlan.category],
    title: dayPlan.title,
    weekNumber,
    exercises: pickExercisesForWeek(content, dayPlan.category, weekNumber, EXERCISES_PER_WORKOUT),
    warmup: isRecovery ? notes.recoveryWarmup : notes.warmup,
    cooldown: notes.cooldown
  };
}
