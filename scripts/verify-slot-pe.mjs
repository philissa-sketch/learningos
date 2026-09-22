// ---------------------------------------------------------------------------
// THE PE SLOT: THE SCHOOL SUPPLIES A PLAN, THE PLATFORM BUILDS THE WORKOUT.
// Run: node scripts/verify-slot-pe.mjs
//
// ---- WHAT CHANGED (Sept 20, 2026) ----
//
// The `pe` slot used to hand the platform three FUNCTIONS — `getTodaysWorkout`,
// `curatedDemoFor`, `demoLinkFor`. A stored Academy cannot hold a function, so
// each one was a reason a second family could only get PE by someone writing
// JavaScript and deploying it. None of them was a fact about a school either:
// rotating a pool by week number and ranking a parent's saved video above a
// curated one are identical for everybody.
//
// They moved to src/content/slots/pe.js. What stayed behind is what a school
// actually decides — which day is which kind of session, which exercises are
// in each pool, which videos, and what it says to a child before and after.
//
// ---- THE THING THIS FILE EXISTS TO PIN ----
//
// `getWorkoutForDate` had TWO SENTENCES OF ENGLISH inside it: the warm-up and
// the cool-down advice. Prose baked into mechanism is content wearing
// mechanism's clothes — it cannot be translated, a parent cannot change a word
// of it, and it would have ridden along into the platform with the rotation
// logic and become every school's warm-up advice forever, with nothing
// reporting that it had happened.
//
// It is `WORKOUT_NOTES` in the school's folder now, and section 3 below fails
// if the platform ever stops reading it from there. That check was written
// because the first mutation run found NOTHING guarding it.
//
// The video precedence rules are guarded by scripts/verify-pe-videos.mjs; the
// slot-is-data-not-code contract by scripts/verify-slot-questions.mjs.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import {
  PE_QUESTIONS, HIDDEN_VIDEO, workoutForDate, dayPlanFor, pickExercisesForWeek, curatedDemoFor
} from '../src/content/slots/pe.js';
import { pe } from '../src/academies/lamar/content.js';

let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
}

// The slot as the school actually exports it, not a table rebuilt here.
const CONTENT = { pe };
const dateOn = (dayIndex) => {
  // Sun 2026-09-20 … Sat 2026-09-26.
  const d = new Date(2026, 8, 20 + dayIndex);
  if (d.getDay() !== dayIndex) throw new Error('bad fixture');
  return d;
};

console.log(`\nquestions: ${PE_QUESTIONS.join(', ')}`);

console.log('\n--- 1. the school answers every question the slot asks ---');
{
  const unanswered = PE_QUESTIONS.filter((q) => pe[q] === undefined);
  ok('this school answers all of them', unanswered.length === 0, unanswered.join(', '));
  ok('the plan covers all seven days',
    Array.isArray(pe.WEEKLY_PLAN)
    && new Set(pe.WEEKLY_PLAN.map((d) => d.dayIndex)).size === 7);
  ok('every day names a category and a title',
    pe.WEEKLY_PLAN.every((d) => d.category && d.title && d.dayName));
  ok('every category in the plan has a pool of exercises',
    pe.WEEKLY_PLAN.every((d) => Array.isArray(pe.exerciseLibrary[d.category]) && pe.exerciseLibrary[d.category].length),
    pe.WEEKLY_PLAN.filter((d) => !pe.exerciseLibrary[d.category]?.length).map((d) => d.category).join(', '));
  ok('...and a label a child can read',
    pe.WEEKLY_PLAN.every((d) => typeof pe.CATEGORY_LABELS[d.category] === 'string'));
}

console.log('\n--- 2. the day you ask for is the day you get ---');
{
  let matched = 0;
  for (let i = 0; i < 7; i += 1) {
    const w = workoutForDate(CONTENT, dateOn(i), 3);
    const planned = pe.WEEKLY_PLAN.find((d) => d.dayIndex === i);
    if (w && w.category === planned.category && w.title === planned.title && w.dayName === planned.dayName) matched += 1;
  }
  ok('all seven days match the school’s own plan', matched === 7, `${matched}/7`);
  ok('the day lookup agrees with the workout',
    [0, 3, 6].every((i) => dayPlanFor(CONTENT, dateOn(i)).category === workoutForDate(CONTENT, dateOn(i), 1).category));
  ok('the week number it was asked for is the week number it reports',
    workoutForDate(CONTENT, dateOn(1), 17).weekNumber === 17,
    'a screen that prints the week must print the one the rotation used');
}

console.log('\n--- 3. the warm-up and cool-down are the SCHOOL’S words ---');
{
  // The check the first mutation run proved was missing. If the platform stops
  // reading WORKOUT_NOTES, every one of these fails.
  const notes = pe.WORKOUT_NOTES;
  ok('the school supplies all three notes',
    Boolean(notes && notes.warmup && notes.recoveryWarmup && notes.cooldown));

  const monday = workoutForDate(CONTENT, dateOn(1), 5);
  ok('a training day gets the school’s warm-up, verbatim', monday.warmup === notes.warmup,
    'a warm-up sentence written into the platform is one no parent can change');
  ok('...and the school’s cool-down, verbatim', monday.cooldown === notes.cooldown);

  const recovery = pe.WEEKLY_PLAN.find((d) => d.category === 'recovery');
  const rest = workoutForDate(CONTENT, dateOn(recovery.dayIndex), 5);
  ok('a recovery day gets the recovery warm-up instead', rest.warmup === notes.recoveryWarmup);
  ok('...and it is a different sentence from the training one',
    notes.recoveryWarmup !== notes.warmup);

  ok('no note text is hard-coded in the platform slot', (() => {
    const src = fs.readFileSync(new URL('../src/content/slots/pe.js', import.meta.url), 'utf8');
    return !/warm.?up needed today|light movement|easy walking and gentle/i.test(src);
  })(), 'the sentences belong to the school, not to every school');

  const silent = workoutForDate({ pe: { ...pe, WORKOUT_NOTES: undefined } }, dateOn(1), 5);
  ok('a school with no notes gets no advice, and no crash',
    silent !== null && silent.warmup === undefined && silent.cooldown === undefined);
}

console.log('\n--- 4. the rotation is deterministic, and it really rotates ---');
{
  const cat = pe.WEEKLY_PLAN.find((d) => d.category !== 'recovery').category;
  const a = pickExercisesForWeek(CONTENT, cat, 4).map((e) => e.id).join();
  const b = pickExercisesForWeek(CONTENT, cat, 4).map((e) => e.id).join();
  ok('the same week gives the same exercises', a === b,
    'otherwise today’s workout changes when he reloads the page');

  const weeks = new Set();
  for (let w = 0; w < 36; w += 1) weeks.add(pickExercisesForWeek(CONTENT, cat, w).map((e) => e.id).join());
  ok('36 weeks are not 36 copies of one workout', weeks.size > 3, `${weeks.size} distinct sets`);

  const pool = pe.exerciseLibrary[cat];
  const covered = new Set();
  for (let w = 0; w < pool.length; w += 1) for (const e of pickExercisesForWeek(CONTENT, cat, w)) covered.add(e.id);
  ok('a full cycle reaches every exercise in the pool', covered.size === pool.length,
    `${covered.size} of ${pool.length}`);

  // Across EVERY category, not just one: asking for the first pool in the
  // library and asking for the right pool give the same answer for whichever
  // category happens to be listed first, and a one-category check passes a
  // rotation that has stopped reading the category at all.
  const strayed = [];
  for (const d of pe.WEEKLY_PLAN) {
    const own = pe.exerciseLibrary[d.category] || [];
    for (let w = 0; w < 6; w += 1) {
      for (const e of pickExercisesForWeek(CONTENT, d.category, w)) {
        if (!own.some((x) => x.id === e.id)) strayed.push(`${d.category} w${w}: ${e.id}`);
      }
    }
  }
  ok('every exercise picked really is from that day’s own pool', strayed.length === 0,
    strayed.slice(0, 4).join('; '));

  const byCategory = new Set(pe.WEEKLY_PLAN.map((d) =>
    pickExercisesForWeek(CONTENT, d.category, 2).map((e) => e.id).join()));
  ok('...and seven different days are not seven copies of one pool',
    byCategory.size === pe.WEEKLY_PLAN.length, `${byCategory.size} distinct of ${pe.WEEKLY_PLAN.length}`);
  ok('a negative week number still lands inside the pool',
    pickExercisesForWeek(CONTENT, cat, -3).length > 0);
  ok('a pool shorter than the ask is not padded',
    pickExercisesForWeek({ pe: { exerciseLibrary: { x: [{ id: 'one' }] } } }, 'x', 1).length === 1);
}

console.log('\n--- 5. a school that has not filled this slot ---');
{
  ok('no plan means no workout, not an empty card',
    workoutForDate({}, dateOn(1), 1) === null,
    'a title with no exercises under it is worse than nothing on his screen');
  ok('a plan that skips today gives null for today',
    workoutForDate({ pe: { WEEKLY_PLAN: [{ dayIndex: 2, dayName: 'Tue', category: 'c', title: 'T' }] } }, dateOn(1), 1) === null);
  ok('...and a real workout on a day it does cover',
    workoutForDate({ pe: { WEEKLY_PLAN: [{ dayIndex: 2, dayName: 'Tue', category: 'c', title: 'T' }] } }, dateOn(2), 1)?.title === 'T');
  ok('nothing here throws on an empty school',
    [() => dayPlanFor({}, dateOn(0)), () => pickExercisesForWeek({}, 'x', 1), () => curatedDemoFor({}, 'x')]
      .every((f) => { try { f(); return true; } catch { return false; } }));
  ok('the hidden sentinel is the platform’s, not a school’s',
    HIDDEN_VIDEO === 'none' && pe.HIDDEN_VIDEO === undefined,
    'it is written into saved data, so a school changing it would orphan what a parent already saved');
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log('\nFAILED:');
  for (const f of failures) console.log('  ' + f);
  process.exit(1);
}
console.log('\nALL CHECKS PASSED');
