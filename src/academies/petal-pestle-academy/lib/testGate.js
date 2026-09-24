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
//   1. ONE TEST A DAY. A weekly or quarter test; the reading check is not one.
//   2. A RE-TAKE OPENS ONLY AFTER SHE HAS GONE BACK OVER the lessons she missed
//      questions from on her last attempt, AFTER that attempt.
//
// ---- WHY THIS IS NOT "A NUDGE, NEVER A LOCK" ----
//
// LessonsView says of the FIRST attempt: "A nudge, never a lock. A child who
// hits a wall she cannot pass stops opening the app." That still holds, and a
// first attempt is untouched here apart from one-a-day. A re-take is different:
// it is only worth anything after the lessons have been gone over, and the wall
// has a door she can see: each lesson is named and opens from the test card.
//
// The reasons below are written for HER to read. They say what to do next.
// ---------------------------------------------------------------------------

import { retakeStatus } from './assessmentEngine.js';

/** Kinds that count toward "one test a day". The reading check does not. */
export const COUNTED_TEST_KINDS = ['weekly', 'quarter'];

/** How many counted tests she has already sat today. */
export function testsSatToday(allAttempts, todayKey) {
  return (allAttempts || []).filter(
    (a) => a && a.dayKey === todayKey && COUNTED_TEST_KINDS.includes(a.kind)
  ).length;
}

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
 * @returns { allowed, reason, reReadFirst: lessonId[], attemptNumber, done? }
 */
export function testGate({ attemptsForTest, allAttempts, lessonReads, todayKey, titleOf = (id) => id }) {
  const base = retakeStatus(attemptsForTest, todayKey);
  if (!base.allowed) return { ...base, reReadFirst: [] };

  if (testsSatToday(allAttempts, todayKey) >= 1) {
    return {
      allowed: false,
      reason: 'One test a day. You have done today’s test. This one will be here tomorrow.',
      reReadFirst: [],
      attemptNumber: base.attemptNumber
    };
  }

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
