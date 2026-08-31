// ---------------------------------------------------------------------------
// WHAT A SUBJECT IS ACTUALLY OFFERING HIM THIS QUARTER.
//
// ---- WHY THIS EXISTS (Aug 16, 2026) ----
//
// The parent, Aug 14: **"Social studies isn't opened on Lamar's app."**
//
// The first look found the cause of the blank screen — a stale build — and the
// deeper fact: **zero of Social Studies' 29 lessons are tagged Q1.** Her
// decision was to leave Q1 Khan-only, which is right. What was left open, and
// stayed open for two days, was that nothing on his screen said so.
//
// Looking properly, it is worse and simpler than "Social Studies is empty."
//
// ---- TWO SCREENS, TWO TRUTHS ----
//
// The daily board gates by quarter. `getTodaysMission` calls
// isQuarterAvailable, so a Q2 lesson is never served in Q1.
//
// **The Lesson Roster does not gate at all.** It walks `allLessons`, groups by
// subject, and puts a live Start button on every one. In Q1 that means:
//
//     Social Studies    0 of 29 lessons available   -> 29 Start buttons
//     Robotics          0 of  9 lessons available   ->  9 Start buttons
//     Technology       23 of 43 lessons available   -> 43 Start buttons
//     Aerospace        11 of 54 lessons available   -> 54 Start buttons
//
// He could open a Q4 robotics lesson on sensors in August, months before the
// lesson that teaches it. The board says the subject has nothing today; the
// roster says here are twenty-nine, help yourself. **Neither screen was lying
// on its own terms, and together they were incoherent.**
//
// ---- AND A FUNCTION WRITTEN FOR THIS, NEVER CALLED ----
//
// `hasLaterQuarterLessons` has been in the store since Aug 6 with a comment
// naming this exact problem:
//
//     "Lets the dashboard tell two very different situations apart: 'you have
//      finished this whole subject' versus 'you are caught up for THIS quarter
//      and more arrives next quarter.' Saying the first when the second is
//      true would tell a 12-year-old he was done with Social Studies for the
//      year."
//
// It had zero callers. The reasoning was done, written down, and never wired
// to a screen — which is this project's most repeated failure and worth naming
// again: **an unreferenced helper is a decision that did not ship.**
//
// ---- WHY A PURE FUNCTION AND NOT A STORE GETTER ----
//
// Same reason academicPortfolio.js gives: a Zustand getter's reference never
// changes, so a component reading through one does not re-render when the
// underlying data does. Components select the state and call this.
// ---------------------------------------------------------------------------
import { isQuarterAvailable, quarterOpensOn, absoluteQuarterRank } from './schoolQuarter.js';

/**
 * Can he start this lesson today?
 *
 * Untagged lessons — the 17 Black STEM & Aerospace Trailblazer biographies —
 * are deliberately never gated, and isQuarterAvailable already returns true for
 * them. That behaviour is load-bearing here: the Trailblazer library must stay
 * browsable in every quarter, and it is the one thing in Social Studies he can
 * open today.
 */
export function isLessonOpen(lesson, date = new Date()) {
  return isQuarterAvailable(lesson?.quarter, date);
}

/**
 * The state of one subject's Mission Control track right now.
 *
 * `khanRowsThisQuarter` is passed in rather than inferred from a hardcoded list
 * of Khan subjects. KHAN_TAUGHT_SUBJECTS is math, reading and science —
 * Social Studies is not in it, yet Social Studies IS being taught on Khan this
 * quarter, because the parent assigned World History units. The truth about
 * what he is doing lives in his assignments, not in a constant.
 */
export function subjectQuarterStatus(subject, {
  lessons = [],
  khanAcademyAssignments = [],
  currentBatchLabel = null,
  date = new Date()
} = {}) {
  const mine = lessons.filter((l) => l.subject === subject && !l.isTrailblazerBio);
  const openNow = mine.filter((l) => isLessonOpen(l, date));
  const later = mine.filter((l) => !isLessonOpen(l, date));

  // The soonest quarter that has anything, so the message can name a date
  // instead of saying "later".
  let nextQuarter = null;
  for (const l of later) {
    if (!l.quarter) continue;
    const rank = absoluteQuarterRank(l.quarter);
    const bestRank = nextQuarter ? absoluteQuarterRank(nextQuarter) : null;
    if (bestRank === null || (rank !== null && rank < bestRank)) nextQuarter = l.quarter;
  }

  const khanRowsThisQuarter = khanAcademyAssignments.filter(
    (k) => k.subject === subject && (!currentBatchLabel || k.batchLabel === currentBatchLabel)
  );

  return {
    total: mine.length,
    openNow: openNow.length,
    laterCount: later.length,
    /** Nothing in Mission Control this quarter, but the subject is not finished. */
    quietThisQuarter: openNow.length === 0 && later.length > 0,
    nextQuarter,
    nextQuarterOpensOn: nextQuarter ? quarterOpensOn(nextQuarter) : null,
    khanUnitsThisQuarter: khanRowsThisQuarter.length,
    khanUnitsLeft: khanRowsThisQuarter.filter((k) => !k.completed).length
  };
}
