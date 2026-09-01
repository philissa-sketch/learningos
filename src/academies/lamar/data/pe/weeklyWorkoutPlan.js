/**
 * PE & Nutrition — Weekly Workout Plan
 *
 * The 7-day structure is fixed, per PROJECT_PLAN.md Part 4's exact
 * spec (Mon-Upper Body, Tue-Lower Body, Wed-Cardio+Stretching,
 * Thu-Core, Fri-Full Body, Sat-Outdoor/Sports, Sun-Recovery/Mobility)
 * — this legitimately repeats every week for the full 36-week school
 * year, same as real fitness programming (progressive overload comes
 * from doing the same movement patterns consistently, not from a new
 * plan structure every week). What DOES vary week to week is WHICH
 * exercises get pulled from that day's pool in `exerciseLibrary.js`,
 * via a simple, deterministic rotation keyed off the ISO week number
 * — so a student doing this program for 36 weeks sees real variety
 * within each day-type instead of the identical 3 exercises every
 * single Monday.
 */

import { exerciseLibrary, CATEGORY_LABELS } from './exerciseLibrary.js';
import { getWeekNumber } from '../../../../lib/scheduler.js';

// Fixed day-of-week -> category mapping (JS Date.getDay(): 0=Sunday).
export const WEEKLY_PLAN = [
  { dayIndex: 0, dayName: 'Sunday', category: 'recovery', title: 'Recovery & Mobility' },
  { dayIndex: 1, dayName: 'Monday', category: 'upperBody', title: 'Upper Body Strength' },
  { dayIndex: 2, dayName: 'Tuesday', category: 'lowerBody', title: 'Lower Body Strength' },
  { dayIndex: 3, dayName: 'Wednesday', category: 'cardioStretch', title: 'Cardio + Stretching' },
  { dayIndex: 4, dayName: 'Thursday', category: 'core', title: 'Core' },
  { dayIndex: 5, dayName: 'Friday', category: 'fullBody', title: 'Full Body' },
  { dayIndex: 6, dayName: 'Saturday', category: 'outdoorSports', title: 'Outdoor / Sports' }
];

const EXERCISES_PER_WORKOUT = 4;

// getWeekNumber moved to src/lib/scheduler.js on Sept 1, 2026. It is used here
// as a rotation seed, but which week of the year it is has never been a fact
// about a school. §3c Step 1.

export function getDayPlan(date = new Date()) {
  const dayIndex = date.getDay();
  return WEEKLY_PLAN.find((d) => d.dayIndex === dayIndex);
}

/**
 * Deterministically picks N exercises from a category's pool, rotating
 * the starting offset by week number so the same weekday shows a
 * different slice of the pool most weeks, cycling back around once the
 * whole pool has been covered. Pure function — same (category, week)
 * input always returns the same exercises, so "today's workout" doesn't
 * change if the student reloads the app the same day.
 */
export function pickExercisesForWeek(category, weekNumber, count = EXERCISES_PER_WORKOUT) {
  const pool = exerciseLibrary[category] || [];
  if (pool.length === 0) return [];
  const n = Math.min(count, pool.length);
  const offset = (weekNumber % pool.length + pool.length) % pool.length;
  const picked = [];
  for (let i = 0; i < n; i++) {
    picked.push(pool[(offset + i) % pool.length]);
  }
  return picked;
}

/**
 * Builds a full workout object for a given date: the day's category/
 * title plus a real, rotating set of exercises for that day. This is
 * the single function student-facing UI should call for "today's
 * workout" or "this date's workout."
 */
export function getWorkoutForDate(date = new Date()) {
  const dayPlan = getDayPlan(date);
  const weekNumber = getWeekNumber(date);
  const exercises = pickExercisesForWeek(dayPlan.category, weekNumber, EXERCISES_PER_WORKOUT);
  return {
    dayName: dayPlan.dayName,
    category: dayPlan.category,
    categoryLabel: CATEGORY_LABELS[dayPlan.category],
    title: dayPlan.title,
    weekNumber,
    exercises,
    warmup:
      dayPlan.category === 'recovery'
        ? 'No warm-up needed today — recovery days are meant to be gentle from the start.'
        : '3-5 minutes of light movement (easy jogging in place, arm circles, bodyweight squats) to raise your heart rate and warm up your joints before starting.',
    cooldown:
      'A few minutes of easy walking and gentle stretching for the muscles you just used, plus water.'
  };
}

export function getTodaysWorkout() {
  return getWorkoutForDate(new Date());
}
