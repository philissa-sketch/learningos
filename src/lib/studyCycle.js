// The "5-Day Study Cycle" — real spaced-retrieval prep for a Quarterly
// Exam (PROJECT_PLAN.md Part 4: named as design-research input alongside
// the mastery gate/exit tickets/quarterly exams, but unlike every sibling
// item, never got its own build decision — flagged during the full
// master-plan audit as the one genuinely open item, now built).
//
// Parent-approved design (Aug 2026):
//   - SOFT gate — never blocks the Quarterly Exam. It's a structured,
//     tracked recommendation, not a hard requirement — a missed day or
//     unusual week never locks Lamar out of taking the exam.
//   - Real spacing, not five clicks in one sitting: each day only
//     becomes available once the previous day is done AND at least one
//     full calendar day has passed. That's what makes this genuinely
//     "spaced" retrieval rather than a same-day checklist.
//   - Five distinct retrieval sessions, not "Study Guide twice" —
//     Day 1 Study Guide, Day 2 Term Blitz round 1, Day 3 a real
//     weak-spot drill (not a blank rest day), Day 4 Term Blitz round 2,
//     Day 5 the exam itself. This is a deliberate interpretation of the
//     approved "Day 1-2 Study Guide / Day 3 weak-spot / Day 4-5 Term
//     Blitz" proposal — five atomic, spaced retrieval sessions serve the
//     same real research (multiple distinct sessions spread across days
//     beats a single long one) better than literally repeating the same
//     tool back-to-back.
//   - Generic across every subject with a Quarterly Exam (Aerospace now,
//     Social Studies too), matching the existing Study Guide/Term Blitz
//     precedent — never hardcoded to one subject.
//
// Reuses existing tools for Days 1/2/4 (Study Guide, Term Blitz) —
// zero new content authoring for those. Day 3 is the one new piece:
// a short, real adaptive drill pulled from the quarter's own lowest-
// accuracy lessons, using generators that already exist.

import { academyContent } from '../content/academyContent.js';

const { allLessons = [] } = academyContent().lessons;

export function studyCycleKey(subject, quarter) {
  return `${subject}::${quarter}`;
}

function isPastCalendarDay(dateStr, today) {
  return Boolean(dateStr) && dateStr < today;
}

/**
 * Given a cycle row (or undefined/null if nothing recorded yet) and
 * today's date string ('YYYY-MM-DD'), returns each day's real
 * { done, available } state. Day 5 has no activity of its own to
 * complete — `available` just means "ready to take the exam now,"
 * informational only.
 */
export function getStudyCycleStatus(cycleRow, today) {
  const day1Done = Boolean(cycleRow?.day1CompletedAt);
  const day2Done = Boolean(cycleRow?.day2CompletedAt);
  const day3Done = Boolean(cycleRow?.day3CompletedAt);
  const day4Done = Boolean(cycleRow?.day4CompletedAt);

  const day1Available = !day1Done;
  const day2Available = !day2Done && day1Done && isPastCalendarDay(cycleRow.day1CompletedAt, today);
  const day3Available = !day3Done && day2Done && isPastCalendarDay(cycleRow.day2CompletedAt, today);
  const day4Available = !day4Done && day3Done && isPastCalendarDay(cycleRow.day3CompletedAt, today);
  const examReady = day4Done && isPastCalendarDay(cycleRow.day4CompletedAt, today);

  return {
    day1: { done: day1Done, available: day1Available },
    day2: { done: day2Done, available: day2Available },
    day3: { done: day3Done, available: day3Available },
    day4: { done: day4Done, available: day4Available },
    day5: { done: false, available: examReady }
  };
}

/**
 * Returns which cycle "slot" a Term Blitz completion right now should
 * fill — slot 2 (round 1) if that's still open, slot 4 (round 2) if
 * round 1 and the weak-spot drill are both already done and spaced
 * correctly, or null if Term Blitz is just being played on its own,
 * outside the cycle's sequence (still works exactly as before — XP
 * only, no cycle change).
 */
export function nextTermBlitzSlot(cycleRow, today) {
  const status = getStudyCycleStatus(cycleRow, today);
  if (status.day2.available) return 2;
  if (status.day4.available) return 4;
  return null;
}

/**
 * Ranks a quarter's real lessons (excluding the exam itself) by
 * bestAccuracy ascending — weakest first — and returns up to `count`
 * unique practiceGeneratorIds pulled from those weakest lessons' beats.
 * Real adaptive selection, not random: this is what makes Day 3 a
 * genuine weak-spot drill instead of a rest day.
 */
export function pickWeakSpotGeneratorIds(subject, quarter, lessonProgress, count = 4) {
  const quarterLessons = allLessons.filter(
    (l) => l.subject === subject && l.quarter === quarter && !l.isQuarterlyExam
  );

  const ranked = quarterLessons
    .map((lesson) => ({ lesson, accuracy: lessonProgress[lesson.id]?.bestAccuracy ?? 0 }))
    .sort((a, b) => a.accuracy - b.accuracy);

  const ids = [];
  for (const { lesson } of ranked) {
    const beatIds = (lesson.novaIntro?.beats || []).map((b) => b.practiceGeneratorId).filter(Boolean);
    const candidateIds = beatIds.length > 0 ? beatIds : lesson.practiceGeneratorId ? [lesson.practiceGeneratorId] : [];
    for (const id of candidateIds) {
      if (!ids.includes(id)) ids.push(id);
      if (ids.length >= count) return ids;
    }
  }
  return ids;
}
