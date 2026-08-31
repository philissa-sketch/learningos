import { getTemplatesUpToTier } from './problemTemplates.js';
import { choice } from './mathHelpers.js';
import { todayDateStr, toDateStr, parseDateStr } from '../lib/scheduler.js';

export function todayStr() {
  return todayDateStr();
}

export function addDays(dateStr, days) {
  // WAS local-parse then UTC-format, which shifted every review date by a day
  // for anyone west of Greenwich. Both halves are local now.
  const d = parseDateStr(dateStr);
  d.setDate(d.getDate() + days);
  return toDateStr(d);
}

// Real 1/3/7-day spaced-repetition schedule (PROJECT_PLAN.md, "Queued fix
// — instructional-design audit," gap 1). First correct review comes due
// the next day, then 3 days later, then 7 — after that, each further
// correct review roughly doubles the interval (capped) so well-known
// material fades from daily rotation without disappearing entirely. A
// miss resets straight back to a 1-day interval, same as a brand-new item.
const REVIEW_MAX_INTERVAL_DAYS = 60;

/**
 * Pure scheduling step — given the prior schedule row for a practice
 * generator (or undefined, if this is the first time it's been answered
 * in the daily practice pool) and whether the most recent answer was
 * correct, returns the next row to persist. Kept here (not in the store)
 * so the actual interval math is unit-testable independent of Dexie/
 * Zustand, and reusable by any future subject's practice content without
 * new per-subject code — it works off `template.id` alone.
 */
export function nextReviewScheduleEntry(prior, correct, today = todayStr()) {
  if (!correct) {
    return { intervalDays: 1, nextDueDate: addDays(today, 1), lastResult: 'miss', lastReviewedDate: today };
  }

  const priorInterval = prior?.intervalDays ?? 0;
  let nextInterval;
  if (priorInterval < 1) nextInterval = 1;
  else if (priorInterval < 3) nextInterval = 3;
  else if (priorInterval < 7) nextInterval = 7;
  else nextInterval = Math.min(priorInterval * 2, REVIEW_MAX_INTERVAL_DAYS);

  return {
    intervalDays: nextInterval,
    nextDueDate: addDays(today, nextInterval),
    lastResult: 'correct',
    lastReviewedDate: today
  };
}

/**
 * Generates a fresh, lesson-shaped practice set (same shape the Lesson
 * Engine already consumes) by sampling templates with replacement, so
 * repeated topics reinforce recall rather than the student "running out"
 * of content once curated lessons are mastered. Pulls from every tier at
 * or below the student's current tier — not just the current tier — so
 * earlier material (fractions, decimals, etc.) keeps showing up instead of
 * disappearing the moment he advances. A new set each calendar day (id
 * includes the date) so it reads as "today's homework," not the same
 * static drill re-shown.
 *
 * `reviewSchedule` (optional, a map of generatorId -> { nextDueDate, ... }
 * from the store) puts anything genuinely due today at the FRONT of the
 * set, ahead of fresh/random material — real 1/3/7-day spaced repetition,
 * not just interleaving every tier's material randomly. Every built
 * question is tagged with `templateId` so the engine can report the
 * result back into the schedule once it's answered (see
 * useAppStore.recordLessonResult).
 */
export function generateDailyPracticeSet(subject, tier, count = 8, reviewSchedule = {}) {
  const pool = getTemplatesUpToTier(subject, tier);
  if (pool.length === 0) return null;

  const today = todayStr();
  const dueTemplates = pool.filter((t) => {
    const entry = reviewSchedule[t.id];
    return entry && entry.nextDueDate <= today;
  });

  const questions = [];
  let i = 0;

  // Due-for-review material first, each generator used once so a due item
  // doesn't crowd out everything else in a short set.
  for (const template of dueTemplates) {
    if (i >= count) break;
    const built = template.build();
    questions.push({ id: `q${i + 1}`, templateId: template.id, ...built });
    i += 1;
  }

  // Fill any remaining slots with fresh/random material, same as before.
  for (; i < count; i += 1) {
    const template = choice(pool);
    const built = template.build();
    questions.push({ id: `q${i + 1}`, templateId: template.id, ...built });
  }

  return {
    id: `daily-practice-${subject}-${tier}-${today}`,
    subject,
    tier,
    title: 'Daily Practice Drill',
    theme:
      dueTemplates.length > 0
        ? `Includes ${Math.min(dueTemplates.length, count)} item${Math.min(dueTemplates.length, count) === 1 ? '' : 's'} due for review today, plus fresh mixed practice`
        : 'Fresh mixed practice across everything you’ve learned so far',
    isPractice: true,
    questions
  };
}
