// Gamification — Achievement Badges (Part 5, built Aug 6, 2026).
//
// Every badge is DERIVED from real, already-tracked state — never a separate
// counter that could drift out of sync with reality. `test(stats)` reads the
// same numbers the Report Card, rank system, and trackers use, so a badge is
// earned exactly when the underlying real work is done, and un-earning is
// impossible to fake. No badge state is persisted; earned/locked is computed
// on every render from the live stats snapshot (see useAppStore
// getGamificationStats).
//
// `stats` shape: { totalMastered, rankTier, streak, longestStreak,
//   khanUnitsCompleted, writingEntries, workoutsLogged, mealsLogged,
//   portfolioEntries, assignmentsCompleted, gardenSessions, guitarSessions,
//   guitarSongsLearned, fieldTripsCompleted, booksCompleted, xp }.
//
// STREAK BADGES TEST longestStreak, NOT streak (fixed Aug 8, 2026). They used
// to read the LIVE streak, which meant an earned badge silently un-earned
// itself the moment the streak lapsed — directly contradicting the promise at
// the top of this file. Worse, the streak counted calendar days in a Mon-Fri
// school week, so it reset every Saturday and could never exceed 5: "Week
// Strong" (7) and "Unstoppable" (30) were unreachable by construction, and
// "Warmed Up" (3) appeared every Wednesday and vanished every Saturday. The
// streak now counts school days (see computeStreak in useAppStore) and these
// test the high-water mark, so a badge once earned stays earned.

import { RANKS } from './ranks.js';

const RANK_BADGES = RANKS.filter((r) => r.tier >= 2).map((r) => ({
  id: `rank-${r.tier}`,
  name: r.name,
  icon: '🎖️',
  category: 'Rank',
  desc: `Reach the rank of ${r.name}.`,
  test: (s) => s.rankTier >= r.tier,
  progress: (s) => ({ current: s.rankTier || 1, target: r.tier })
}));

/**
 * Every badge carries a `progress(stats)` returning { current, target }.
 *
 * WHY: a locked badge used to render as a grey icon and nothing else — no
 * indication of whether it was one workout away or fifty. "7 of 10" with a bar
 * is one of the cheapest motivational wins available, and it turns the locked
 * half of the grid from decoration into a to-do list.
 *
 * A tiny helper keeps the definitions below readable — count-style badges are
 * all the same shape.
 */
const countProgress = (field, target) => (s) => ({ current: s[field] || 0, target });

export const BADGES = [
  // Mastery milestones.
  // Extended past 100 on Aug 8, 2026: the curriculum is 356 lessons and the app
  // has to hold a student for six years, but the ladder used to stop at 100 —
  // so from lesson 101 onward (70% of everything, and most of the journey) the
  // badge system stopped responding to mastery entirely.
  { id: 'first-lesson', name: 'Liftoff', icon: '🚀', category: 'Mastery', desc: 'Master your very first lesson.', test: (s) => s.totalMastered >= 1, progress: countProgress('totalMastered', 1) },
  { id: 'ten-lessons', name: 'Ten Down', icon: '🔟', category: 'Mastery', desc: 'Master 10 lessons.', test: (s) => s.totalMastered >= 10, progress: countProgress('totalMastered', 10) },
  { id: 'twentyfive-lessons', name: 'Building Momentum', icon: '📈', category: 'Mastery', desc: 'Master 25 lessons.', test: (s) => s.totalMastered >= 25, progress: countProgress('totalMastered', 25) },
  { id: 'fifty-lessons', name: 'Half-Century', icon: '⭐', category: 'Mastery', desc: 'Master 50 lessons.', test: (s) => s.totalMastered >= 50, progress: countProgress('totalMastered', 50) },
  { id: 'hundred-lessons', name: 'Centurion', icon: '💯', category: 'Mastery', desc: 'Master 100 lessons.', test: (s) => s.totalMastered >= 100, progress: countProgress('totalMastered', 100) },
  { id: 'onefifty-lessons', name: 'Double Century', icon: '🏅', category: 'Mastery', desc: 'Master 150 lessons.', test: (s) => s.totalMastered >= 150, progress: countProgress('totalMastered', 150) },
  { id: 'twohundred-lessons', name: 'Deep Space', icon: '🌌', category: 'Mastery', desc: 'Master 200 lessons.', test: (s) => s.totalMastered >= 200, progress: countProgress('totalMastered', 200) },
  { id: 'twofifty-lessons', name: 'Long Haul', icon: '🪐', category: 'Mastery', desc: 'Master 250 lessons.', test: (s) => s.totalMastered >= 250, progress: countProgress('totalMastered', 250) },
  { id: 'threehundred-lessons', name: 'Mission Veteran', icon: '🛸', category: 'Mastery', desc: 'Master 300 lessons.', test: (s) => s.totalMastered >= 300, progress: countProgress('totalMastered', 300) },
  { id: 'threefifty-lessons', name: 'Full Mission', icon: '🌟', category: 'Mastery', desc: 'Master 350 lessons.', test: (s) => s.totalMastered >= 350, progress: countProgress('totalMastered', 350) },
  // Streaks
  { id: 'streak-3', name: 'Warmed Up', icon: '🔥', category: 'Streak', desc: 'Learn 3 school days in a row.', test: (s) => (s.longestStreak ?? s.streak) >= 3, progress: countProgress('longestStreak', 3) },
  { id: 'streak-7', name: 'Week Strong', icon: '🔥', category: 'Streak', desc: 'Learn 7 school days in a row.', test: (s) => (s.longestStreak ?? s.streak) >= 7, progress: countProgress('longestStreak', 7) },
  { id: 'streak-30', name: 'Unstoppable', icon: '☄️', category: 'Streak', desc: 'Learn 30 school days in a row.', test: (s) => (s.longestStreak ?? s.streak) >= 30, progress: countProgress('longestStreak', 30) },
  { id: 'streak-60', name: 'Full Quarter', icon: '🌠', category: 'Streak', desc: 'Learn 60 school days in a row.', test: (s) => (s.longestStreak ?? s.streak) >= 60, progress: countProgress('longestStreak', 60) },
  { id: 'streak-100', name: 'Hundred Days', icon: '🏆', category: 'Streak', desc: 'Learn 100 school days in a row.', test: (s) => (s.longestStreak ?? s.streak) >= 100, progress: countProgress('longestStreak', 100) },
  // Khan Academy
  { id: 'first-khan', name: 'Course Cadet', icon: '📘', category: 'Courses', desc: 'Finish your first Khan Academy unit.', test: (s) => s.khanUnitsCompleted >= 1, progress: countProgress('khanUnitsCompleted', 1) },
  { id: 'ten-khan', name: 'Course Navigator', icon: '🧭', category: 'Courses', desc: 'Finish 10 Khan Academy units.', test: (s) => s.khanUnitsCompleted >= 10, progress: countProgress('khanUnitsCompleted', 10) },
  { id: 'twentyfive-khan', name: 'Course Commander', icon: '🛰️', category: 'Courses', desc: 'Finish 25 Khan Academy units.', test: (s) => s.khanUnitsCompleted >= 25, progress: countProgress('khanUnitsCompleted', 25) },
  { id: 'fifty-khan', name: 'Course Captain', icon: '🚁', category: 'Courses', desc: 'Finish 50 Khan Academy units.', test: (s) => s.khanUnitsCompleted >= 50, progress: countProgress('khanUnitsCompleted', 50) },
  { id: 'hundred-khan', name: 'Flight Director', icon: '🎛️', category: 'Courses', desc: 'Finish 100 Khan Academy units.', test: (s) => s.khanUnitsCompleted >= 100, progress: countProgress('khanUnitsCompleted', 100) },
  // Habits / whole-child
  { id: 'first-workout', name: 'Engines On', icon: '💪', category: 'Healthy Habits', desc: 'Log your first workout.', test: (s) => s.workoutsLogged >= 1, progress: countProgress('workoutsLogged', 1) },
  { id: 'ten-workouts', name: 'Mission Fit', icon: '🏋️', category: 'Healthy Habits', desc: 'Log 10 workouts.', test: (s) => s.workoutsLogged >= 10, progress: countProgress('workoutsLogged', 10) },
  { id: 'fifty-workouts', name: 'Flight Ready', icon: '🚴', category: 'Healthy Habits', desc: 'Log 50 workouts.', test: (s) => s.workoutsLogged >= 50, progress: countProgress('workoutsLogged', 50) },
  // Nutrition had NO badge at all, despite mealsLogged already being computed
  // in getGamificationStats and sitting unused (found in the Aug 8 review).
  { id: 'first-meal', name: 'Fuel Log', icon: '🥗', category: 'Healthy Habits', desc: 'Log your first meal.', test: (s) => (s.mealsLogged || 0) >= 1, progress: countProgress('mealsLogged', 1) },
  { id: 'fifty-meals', name: 'Mission Nutrition', icon: '🍎', category: 'Healthy Habits', desc: 'Log 50 meals.', test: (s) => (s.mealsLogged || 0) >= 50, progress: countProgress('mealsLogged', 50) },
  { id: 'first-writing', name: 'Log Keeper', icon: '✍️', category: 'Writing', desc: 'Complete your first Writing Journal entry.', test: (s) => s.writingEntries >= 1, progress: countProgress('writingEntries', 1) },
  { id: 'ten-writing', name: 'Mission Chronicler', icon: '📓', category: 'Writing', desc: 'Complete 10 Writing Journal entries.', test: (s) => s.writingEntries >= 10, progress: countProgress('writingEntries', 10) },
  { id: 'fifty-writing', name: 'Ship\u2019s Log', icon: '📖', category: 'Writing', desc: 'Complete 50 Writing Journal entries.', test: (s) => s.writingEntries >= 50, progress: countProgress('writingEntries', 50) },
  { id: 'first-portfolio', name: 'Maker', icon: '🛠️', category: 'Projects', desc: 'Add your first project to the Portfolio.', test: (s) => s.portfolioEntries >= 1, progress: countProgress('portfolioEntries', 1) },
  { id: 'ten-portfolio', name: 'Chief Engineer', icon: '⚙️', category: 'Projects', desc: 'Add 10 projects to the Portfolio.', test: (s) => s.portfolioEntries >= 10, progress: countProgress('portfolioEntries', 10) },
  { id: 'ten-assignments', name: 'On the Board', icon: '📋', category: 'Projects', desc: 'Finish 10 Academic Center assignments.', test: (s) => (s.assignmentsCompleted || 0) >= 10, progress: countProgress('assignmentsCompleted', 10) },

  // ---- Gardening, Guitar, Field Trips, Books ----
  // These four subjects existed with ZERO badges between them until Aug 8,
  // 2026. The badge set was written on Aug 6 and never revisited as the
  // platform grew, which meant the whole-child half of this project —
  // self-sufficiency, music, real-world trips, independent reading — earned
  // nothing, while academics earned twenty-three. Whatever gets celebrated is
  // what gets repeated, so that gap was quietly steering him away from the
  // things the platform exists to build.
  { id: 'first-garden', name: 'First Dig', icon: '🌱', category: 'Garden', desc: 'Log your first real session in the garden.', test: (s) => (s.gardenSessions || 0) >= 1, progress: countProgress('gardenSessions', 1) },
  { id: 'ten-garden', name: 'Green Thumb', icon: '🪴', category: 'Garden', desc: 'Log 10 garden sessions.', test: (s) => (s.gardenSessions || 0) >= 10, progress: countProgress('gardenSessions', 10) },
  { id: 'thirty-garden', name: 'Life Support', icon: '🌻', category: 'Garden', desc: 'Log 30 garden sessions — closed-loop food is how Mars missions eat.', test: (s) => (s.gardenSessions || 0) >= 30, progress: countProgress('gardenSessions', 30) },

  { id: 'first-guitar', name: 'First Chord', icon: '🎸', category: 'Guitar', desc: 'Log your first guitar practice.', test: (s) => (s.guitarSessions || 0) >= 1, progress: countProgress('guitarSessions', 1) },
  { id: 'twentyfive-guitar', name: 'Steady Hands', icon: '🎵', category: 'Guitar', desc: 'Log 25 guitar practices.', test: (s) => (s.guitarSessions || 0) >= 25, progress: countProgress('guitarSessions', 25) },
  { id: 'hundred-guitar', name: 'Crew Morale', icon: '🎶', category: 'Guitar', desc: 'Log 100 guitar practices — astronauts have carried instruments since Gemini.', test: (s) => (s.guitarSessions || 0) >= 100, progress: countProgress('guitarSessions', 100) },
  { id: 'five-songs', name: 'Setlist', icon: '🎼', category: 'Guitar', desc: 'Learn 5 songs all the way through.', test: (s) => (s.guitarSongsLearned || 0) >= 5, progress: countProgress('guitarSongsLearned', 5) },

  { id: 'first-trip', name: 'Boots on the Ground', icon: '🧭', category: 'Field Trips', desc: 'Complete your first field trip.', test: (s) => (s.fieldTripsCompleted || 0) >= 1, progress: countProgress('fieldTripsCompleted', 1) },
  { id: 'five-trips', name: 'Field Researcher', icon: '🗺️', category: 'Field Trips', desc: 'Complete 5 field trips.', test: (s) => (s.fieldTripsCompleted || 0) >= 5, progress: countProgress('fieldTripsCompleted', 5) },
  { id: 'fifteen-trips', name: 'Expedition Lead', icon: '🏛️', category: 'Field Trips', desc: 'Complete 15 field trips.', test: (s) => (s.fieldTripsCompleted || 0) >= 15, progress: countProgress('fieldTripsCompleted', 15) },

  { id: 'first-book', name: 'Cover to Cover', icon: '📕', category: 'Reading', desc: 'Finish your first book from the library.', test: (s) => (s.booksCompleted || 0) >= 1, progress: countProgress('booksCompleted', 1) },
  { id: 'ten-books', name: 'Well Read', icon: '📚', category: 'Reading', desc: 'Finish 10 books.', test: (s) => (s.booksCompleted || 0) >= 10, progress: countProgress('booksCompleted', 10) },
  { id: 'thirty-books', name: 'Ship\u2019s Library', icon: '🏫', category: 'Reading', desc: 'Finish 30 books.', test: (s) => (s.booksCompleted || 0) >= 30, progress: countProgress('booksCompleted', 30) },
  // Rank badges (auto-generated for tiers 2–8)
  ...RANK_BADGES
];

/** Returns every badge with an `earned` boolean for the given stats snapshot. */
export function evaluateBadges(stats) {
  return BADGES.map((b) => {
    const earned = Boolean(b.test(stats));
    let progress = null;
    if (!earned && typeof b.progress === 'function') {
      const p = b.progress(stats);
      if (p && p.target > 0) {
        progress = {
          current: Math.max(0, Math.min(p.current, p.target)),
          target: p.target,
          pct: Math.max(0, Math.min(1, p.current / p.target))
        };
      }
    }
    return { ...b, earned, progress };
  });
}

export function countEarned(stats) {
  return BADGES.reduce((n, b) => n + (b.test(stats) ? 1 : 0), 0);
}
