/**
 * PE & Nutrition — this school's weekly workout plan.
 *
 * ---- WHAT IS HERE AND WHAT IS NOT (changed Sept 20, 2026) ----
 *
 * This file used to hold both the plan AND the machinery that turned it into a
 * workout: a day lookup, a pool rotation, and `getTodaysWorkout`. The rotation
 * was never a fact about this school — picking four exercises out of a pool by
 * week number is identical for every family that ever uses this app — and a
 * stored Academy cannot hold a function at all, so every one of them was a
 * reason a second family could only get PE by someone writing JavaScript.
 *
 * The machinery now lives in `src/content/slots/pe.js`. What stays here is what
 * a school actually decides: WHICH day is which kind of session, and WHAT it
 * tells a child before and after one.
 *
 * ---- WHY THE SEVEN DAYS DO NOT VARY ----
 *
 * The 7-day structure is fixed, per PROJECT_PLAN.md Part 4's exact spec
 * (Mon-Upper Body, Tue-Lower Body, Wed-Cardio+Stretching, Thu-Core,
 * Fri-Full Body, Sat-Outdoor/Sports, Sun-Recovery/Mobility) — this
 * legitimately repeats every week for the full 36-week school year, same as
 * real fitness programming (progressive overload comes from doing the same
 * movement patterns consistently, not from a new plan structure every week).
 * What DOES vary week to week is WHICH exercises get pulled from that day's
 * pool in `exerciseLibrary.js`, by the deterministic rotation in the slot — so
 * a student doing this program for 36 weeks sees real variety within each
 * day-type instead of the identical exercises every single Monday.
 */

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

/**
 * What this school says before and after a session.
 *
 * ---- WHY THESE ARE DATA AND NOT THREE LINES INSIDE A FUNCTION ----
 *
 * They were three lines inside a function, until Sept 20, 2026. Prose baked
 * into mechanism is content wearing mechanism's clothes: it cannot be
 * translated, a parent cannot change a word of it, and when the rotation moved
 * to the platform these sentences would have ridden along with it and become
 * every school's warm-up advice forever.
 *
 * `recoveryWarmup` is the one a recovery day gets instead of `warmup`. Which
 * day counts as recovery is set by `category` in WEEKLY_PLAN above.
 */
export const WORKOUT_NOTES = {
  warmup:
    '3-5 minutes of light movement (easy jogging in place, arm circles, bodyweight squats) to raise your heart rate and warm up your joints before starting.',
  recoveryWarmup:
    'No warm-up needed today — recovery days are meant to be gentle from the start.',
  cooldown:
    'A few minutes of easy walking and gentle stretching for the muscles you just used, plus water.'
};
