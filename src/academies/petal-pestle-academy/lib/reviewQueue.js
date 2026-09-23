// ---------------------------------------------------------------------------
// SPACED REVIEW — the part of this build that does the most for what she keeps.
//
// Unit tests and quarterly tests were what Gigi asked for. On their own they
// measure. This file is what makes them TEACH.
//
// Every question she has ever answered — in a lesson check, a warm-up, or a test
// — sits in a box. The box decides how many days pass before she sees it again:
//
//     box 0 →  1 day      (new, or just missed)
//     box 1 →  3 days
//     box 2 →  7 days
//     box 3 → 16 days
//     box 4 → 35 days
//     box 5 → 70 days     (as good as known)
//
// Right answer, move up a box. Wrong answer, straight back to box 0.
//
// ---- WHY THE GAPS EXPAND ----
//
// A fact answered right six times in one week is a fact she will have lost by
// half term. The same fact answered right at 1, 3, 7, 16, 35 and 70 days has
// been retrieved across four months, each time from a memory that had begun to
// fade — and the effort of pulling it back from a fading memory is precisely
// what makes it durable.
//
// It feels worse. Every gap makes the next recall a little harder, and a child
// who has just got something wrong looks like she is going backwards. She is
// not. Easy repetition feels like learning and mostly is not; effortful recall
// feels like failing and mostly is not.
//
// ---- WHAT THIS IS NOT ----
//
// It is not a deadline system. Items go overdue and nothing happens. There is no
// streak to break, no red number climbing on the home screen, no "you have 47
// cards due". That kind of pressure is what makes people quit spaced review in
// week three, and a system she abandons has a retention benefit of zero.
//
// Three questions a morning. Whatever is most overdue. That is the whole of it.
// ---------------------------------------------------------------------------

import { REVIEW_INTERVALS, MAX_BOX } from '../config/assessment.js';

/** 'YYYY-MM-DD' for a local date. Local, not UTC — a 7pm session in Georgia
 *  must not count as tomorrow. */
export function dayKeyOf(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function addDays(dayKey, days) {
  const d = new Date(`${dayKey}T00:00:00`);
  d.setDate(d.getDate() + days);
  return dayKeyOf(d);
}

export function daysBetween(fromKey, toKey) {
  const a = new Date(`${fromKey}T00:00:00`);
  const b = new Date(`${toKey}T00:00:00`);
  return Math.round((b - a) / 86400000);
}

/**
 * A question she has just met for the first time.
 *
 * It starts in box 0 and is due TOMORROW, not today. Asking the same question
 * twice in one day is massed practice wearing a spaced-review badge.
 */
export function newReviewItem(questionId, source, dayKey) {
  return {
    questionId,
    box: 0,
    dueOn: addDays(dayKey, REVIEW_INTERVALS[0]),
    lastSeen: dayKey,
    // Kept for the Grown-Up Corner: "she has seen this five times and missed it
    // three" is a far more useful sentence than any single score.
    seen: 1,
    missed: 0,
    // Where it first came from. Lets the gradebook say whether a weak spot
    // showed up in a test or only ever in practice.
    source: source || 'lesson'
  };
}

/**
 * Move an item after she answers it.
 *
 * Correct  → up one box, next due after the longer interval.
 * Wrong    → back to box 0, due tomorrow.
 *
 * A wrong answer resets all the way rather than dropping one box. That is the
 * strict version of Leitner and it is the right one here: if she has lost it,
 * the interval that failed to hold it is not the interval to try again.
 */
export function applyReviewAnswer(item, correct, dayKey) {
  const box = correct ? Math.min(MAX_BOX, (item.box ?? 0) + 1) : 0;
  return {
    ...item,
    box,
    dueOn: addDays(dayKey, REVIEW_INTERVALS[box]),
    lastSeen: dayKey,
    seen: (item.seen || 0) + 1,
    missed: (item.missed || 0) + (correct ? 0 : 1)
  };
}

/** Everything due on or before today, most overdue first. */
export function dueItems(items, dayKey) {
  return Object.values(items || {})
    .filter((it) => it && it.dueOn <= dayKey)
    .sort((a, b) => {
      // Most overdue first. Then lowest box — the shakiest things come back
      // soonest, which is where the practice is worth most.
      if (a.dueOn !== b.dueOn) return a.dueOn < b.dueOn ? -1 : 1;
      return (a.box ?? 0) - (b.box ?? 0);
    });
}

/**
 * How many BRAND-NEW questions a single warm-up may introduce.
 *
 * ---- WHY THIS NUMBER EXISTS AT ALL (v3.52) ----
 *
 * It did not, and simulate-year.mjs caught what that cost. The old pickWarmUp
 * filled every spare slot with questions that had never been seen, so on a day
 * with nothing due she met three strangers and no old friends. Across a full
 * simulated year the average question was retrieved 2.0 times — and a question
 * met twice in a year has not been reviewed, it has been glanced at.
 *
 * The failure got WORSE as the app got better. Every module written adds forty
 * questions to the eligible pool, and the old rule spent the warm-up on
 * whichever of them happened to be new. Twelve Human Body modules pushed the
 * average under the line and the simulation went red. That is the check doing
 * exactly its job: a slow bug, visible only over months.
 *
 * ---- WHY ONE, AND NOT ZERO ----
 *
 * Zero would mean the warm-up never showed her anything new, and new questions
 * would only ever enter a box through a lesson check or a test. One a day is
 * about a hundred and seventy across a school year, which the three daily slots
 * can carry back round several times each. Consolidation beats coverage — the
 * same trade already made when the warm-up was set at three questions and not
 * ten.
 */
export const NEW_PER_WARM_UP = 1;

/**
 * The three questions for this morning's warm-up.
 *
 * In order:
 *   1. Anything DUE, most overdue first.
 *   2. At most NEW_PER_WARM_UP question she has never met.
 *   3. Anything she HAS met that is not due yet, soonest-due first — pulled
 *      forward rather than left while new material piles up behind it.
 *
 * It does NOT top up with questions from lessons she has not read. A warm-up
 * that quizzes her on Thursday's lesson on Tuesday is not spaced review, it is
 * an ambush.
 *
 * Step 3 shortens a gap, which sounds like it works against expanding
 * intervals. It does not: pulling an item forward on a quiet day is still a
 * retrieval from a partly faded memory, and the box it lands in afterwards is
 * longer than the one it came from. What it replaces — meeting a stranger and
 * never returning to it — has no interval at all.
 */
/**
 * The RETRIEVE beat's questions — §3.2's ladder opener.
 *
 * ---- THIS DELIBERATELY CALLS pickWarmUp RATHER THAN REIMPLEMENTING IT ----
 *
 * There must be ONE retrieval policy in this app, not two. The warm-up's
 * ordering took three versions and a simulate-year failure to get right — due
 * items first, then at most one stranger, then fewest-retrievals-first, because
 * "met once in October and never again" is the item actually at risk. A second
 * picker written beside it would start identical and drift, and the drift would
 * be invisible: both would return plausible questions forever.
 *
 * WHAT IS DIFFERENT IS THE POOL, NOT THE POLICY.
 *
 *   · only lessons she has already read IN THIS COURSE
 *   · never this lesson's own questions — she has not been taught it yet, and
 *     "a lesson may only ask for what it gave her" is not suspended just
 *     because the asking happens at the top of the page
 *   · never anything she has already answered today, so the doorway cannot
 *     rehearse her for this afternoon's test and inflate a recorded score
 *
 * ---- ALL OR NOTHING, AND THE RULE LIVES HERE ----
 *
 * Below `minimum` it returns []. A doorway with one question in it is a routine
 * being performed rather than anything being retrieved, and on the first lesson
 * of a course there is genuinely nothing to pull back.
 *
 * This guard was written in the store first, where no check could call it —
 * rule 13, caught before it shipped rather than after.
 *
 * @param excludeQuestionIds this lesson's own items, plus today's answers
 */
export function pickLessonRetrieve(
  reviewItems,
  dayKey,
  courseQuestionIds,
  excludeQuestionIds = [],
  count = 2,
  minimum = 2
) {
  const blocked = new Set(excludeQuestionIds);
  const pool = (courseQuestionIds || []).filter((id) => !blocked.has(id));
  const picked = pickWarmUp(reviewItems, dayKey, pool, count);
  return picked.length >= minimum ? picked : [];
}

export function pickWarmUp(reviewItems, dayKey, eligibleQuestionIds, count = 3) {
  const eligible = new Set(eligibleQuestionIds || []);
  const chosen = [];
  const taken = new Set();

  for (const it of dueItems(reviewItems, dayKey)) {
    if (chosen.length >= count) break;
    if (!eligible.has(it.questionId) || taken.has(it.questionId)) continue;
    chosen.push(it.questionId);
    taken.add(it.questionId);
  }
  if (chosen.length >= count) return chosen;

  const known = new Set(Object.keys(reviewItems || {}));
  let introduced = 0;
  for (const id of eligibleQuestionIds || []) {
    if (chosen.length >= count || introduced >= NEW_PER_WARM_UP) break;
    if (known.has(id) || taken.has(id)) continue;
    chosen.push(id);
    taken.add(id);
    introduced++;
  }
  if (chosen.length >= count) return chosen;

  // MET ONCE AND NEVER AGAIN IS THE THING TO FIX FIRST.
  //
  // Sorting this pool by due date looked sensible and was wrong. It pulls
  // forward whichever item happens to be next in the queue, and an item she has
  // already retrieved four times is next in the queue as often as one she met
  // once in a test in October and has not seen since. The second is the one at
  // risk. So: fewest retrievals first, then lowest box, then soonest due.
  const notYetDue = Object.values(reviewItems || {})
    .filter((it) => it && eligible.has(it.questionId) && !taken.has(it.questionId))
    .sort((a, b) => {
      if ((a.seen ?? 0) !== (b.seen ?? 0)) return (a.seen ?? 0) - (b.seen ?? 0);
      if ((a.box ?? 0) !== (b.box ?? 0)) return (a.box ?? 0) - (b.box ?? 0);
      if (a.dueOn !== b.dueOn) return a.dueOn < b.dueOn ? -1 : 1;
      return 0;
    });
  for (const it of notYetDue) {
    if (chosen.length >= count) break;
    chosen.push(it.questionId);
    taken.add(it.questionId);
  }
  if (chosen.length >= count) return chosen;

  // ---- AND ONLY THEN, TOP UP WITH MORE NEW ONES (v3.52) ----
  //
  // The cap above is a PREFERENCE, not a ceiling on the warm-up's length. The
  // first version of this made it a ceiling and check-assessment caught it
  // within the hour: on a morning when nothing is due and nothing is known —
  // which is every child's first week — the warm-up came back with one question
  // instead of three. A shorter warm-up was never the point. The point was that
  // a stranger must not beat a question she has already met.
  //
  // So when there is genuinely nothing to review, strangers fill the rest, and
  // that is correct: on day one there is nothing else it could honestly ask.
  for (const id of eligibleQuestionIds || []) {
    if (chosen.length >= count) break;
    if (taken.has(id)) continue;
    if (known.has(id)) continue;
    chosen.push(id);
    taken.add(id);
  }
  return chosen;
}

/**
 * A plain-language read on how a body of questions is holding up.
 *
 * Deliberately not a percentage. "Eleven of these are solid, four are still
 * settling, two keep slipping" is something a grown-up can act on. "78%" is not.
 */
export function reviewSummary(reviewItems, questionIds) {
  const ids = questionIds || Object.keys(reviewItems || {});
  let solid = 0;
  let settling = 0;
  let slipping = 0;
  let unseen = 0;
  for (const id of ids) {
    const it = (reviewItems || {})[id];
    if (!it) {
      unseen++;
      continue;
    }
    // "Slipping" is about the pattern, not the last answer: something she has
    // met three times and missed more than half of is a different problem from
    // something she got wrong once.
    if (it.seen >= 3 && it.missed / it.seen > 0.5) slipping++;
    else if ((it.box ?? 0) >= 3) solid++;
    else settling++;
  }
  return { solid, settling, slipping, unseen, total: ids.length };
}

/** The questions she keeps losing, worst first. For the Grown-Up Corner. */
export function troubleSpots(reviewItems, limit = 8) {
  return Object.values(reviewItems || {})
    .filter((it) => it.seen >= 2 && it.missed > 0)
    .sort((a, b) => b.missed / b.seen - a.missed / a.seen || b.missed - a.missed)
    .slice(0, limit);
}
