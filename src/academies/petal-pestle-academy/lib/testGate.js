// ---------------------------------------------------------------------------
// MAY SHE START THIS TEST NOW?  (Sept 23 2026)
//
// retakeStatus() in assessmentEngine.js already holds two rules: a re-take
// waits two days, and three attempts is the limit. Her record showed what those
// two rules still let through:
//
//   · Sept 18: THREE Herbalism tests in one sitting (a Week 4 re-take, Week 5,
//     a Week 2 re-take). 24 questions, 9 right.
//   · Re-takes sat without going back to the lessons first. Herbalism Week 4
//     went 38% → 38% → 50%. On Sept 23 the lessons she had re-read that week
//     came back right and the ones she had not came back wrong.
//
// Gigi approved two more rules, Sept 23 2026:
//   1. ONE TEST A DAY. REMOVED Oct 15 2026. Gigi: "Remove the one test a day
//      rule. The retake in 2 days can stay." Azianna had nothing to do and
//      eleven failed tests had attempts left. There is now NO limit on how many
//      tests she may sit in a day. Do not add one back without Gigi asking.
//   2. A RE-TAKE OPENS ONLY AFTER SHE HAS GONE BACK OVER the lessons she missed
//      questions from on her last attempt, AFTER that attempt. (Still in force.)
//
// STILL IN FORCE, in assessmentEngine.js retakeStatus(): a re-take waits TWO
// DAYS, and three attempts is the limit.
//
// ---- WHY THIS IS NOT "A NUDGE, NEVER A LOCK" ----
//
// LessonsView says of the FIRST attempt: "A nudge, never a lock. A child who
// hits a wall she cannot pass stops opening the app." That still holds, and a
// first attempt is not gated here at all. A re-take is different:
// it is only worth anything after the lessons have been gone over, and the wall
// has a door she can see: each lesson is named and opens from the test card.
//
// The reasons below are written for HER to read. They say what to do next.
// ---------------------------------------------------------------------------

import { retakeStatus } from './assessmentEngine.js';

/**
 * The lessons she still has to go back over before a re-take.
 *
 * Every lesson named in her LAST attempt's `revisit` list, whose most recent
 * read is not later than that attempt.
 */
export function lessonsToReReadFirst(attemptsForTest, lessonReads) {
  const list = attemptsForTest || [];
  if (!list.length) return [];
  const latest = list[list.length - 1];
  const reads = lessonReads || {};
  const wanted = [...new Set((latest.revisit || []).map((r) => r.lesson).filter(Boolean))];
  return wanted.filter((lessonId) => {
    const row = reads[lessonId];
    return !(row && row.lastReadAt && latest.at && row.lastReadAt > latest.at);
  });
}

/**
 * `allAttempts` is still accepted so callers need not change, but it is not
 * used: since Oct 15 2026 nothing about OTHER tests she has sat decides whether
 * this one opens.
 *
 * @returns { allowed, reason, reReadFirst: lessonId[], attemptNumber, done? }
 */
export function testGate({ attemptsForTest, allAttempts, lessonReads, todayKey, titleOf = (id) => id }) {
  const base = retakeStatus(attemptsForTest, todayKey);
  if (!base.allowed) return { ...base, reReadFirst: [] };

  const reReadFirst = lessonsToReReadFirst(attemptsForTest, lessonReads);
  if (reReadFirst.length) {
    const names = reReadFirst.map((id) => titleOf(id)).join(', ');
    return {
      allowed: false,
      reason: `Before you take it again, go back over: ${names}. Then this test opens.`,
      reReadFirst,
      attemptNumber: base.attemptNumber
    };
  }

  return { ...base, reReadFirst: [] };
}
