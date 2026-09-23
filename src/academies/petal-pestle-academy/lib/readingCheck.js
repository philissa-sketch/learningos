// ---------------------------------------------------------------------------
// THE READING CHECK — grading and the unit order. (Sept 23, 2026)
//
// Brought across from the standalone Petal & Pestle app (src/lib/readingCheck.js)
// with the grading unchanged, question for question, so a result here means
// exactly what a result there means.
//
// ---- WHAT CHANGED, AND WHY ----
//
// The standalone app chose her unit from her reading strand level and her Khan
// grades. Neither exists in this school yet, so that choice cannot be made here
// honestly. Instead the units are offered in their course order with one rule,
// the parent's: **no next unit until the one before it has been sat with every
// question read by her alone** (project notes, Sept 12). Unit 1 is always open.
//
// ---- ⚠️ THE LETTER SCALE IS HER APP'S, COPIED EXACTLY ----
//
// The same thirteen bands as the standalone app's KHAN_LETTER_BANDS. A second
// scale would give the same paper two letters.
// ---------------------------------------------------------------------------

import { READING_UNITS, readingUnitById } from '../data/reading/ela2Unit1.js';

export const LETTER_BANDS = [
  { min: 97, grade: 'A+' }, { min: 93, grade: 'A' }, { min: 90, grade: 'A-' },
  { min: 87, grade: 'B+' }, { min: 83, grade: 'B' }, { min: 80, grade: 'B-' },
  { min: 77, grade: 'C+' }, { min: 73, grade: 'C' }, { min: 70, grade: 'C-' },
  { min: 67, grade: 'D+' }, { min: 63, grade: 'D' }, { min: 60, grade: 'D-' },
  { min: 0, grade: 'F' }
];

const isNum = (v) => v !== null && v !== undefined && v !== '' && Number.isFinite(Number(v));

/** A percentage to a letter. Null for no number — an absent mark is not an F. */
export function letterForPercent(percent) {
  if (!isNum(percent)) return null;
  const p = Number(percent);
  return LETTER_BANDS.find((b) => p >= b.min).grade;
}

/** Every unit, in the order her course walks them. */
export function readingUnits() {
  return READING_UNITS;
}

/** The paper for one unit, or null. */
export function buildReadingCheck(unitId, { attempt = 1 } = {}) {
  const unit = readingUnitById(unitId);
  if (!unit) return null;
  return {
    testId: unit.id,
    kind: 'reading-check',
    title: unit.label,
    unitName: unit.unitName,
    khanCourse: unit.khanCourse,
    khanUnit: unit.khanUnit,
    attempt,
    passages: unit.passages,
    questions: unit.questions
  };
}

/**
 * Grade one sitting. Unchanged from the standalone app.
 *
 * `unaidedPercent` counts only questions she answered with nothing read to
 * her. It is null — not zero — when every question was read aloud, because
 * null means "not measured" and zero means "measured and got none".
 */
export function gradeReadingCheck(form, responses = {}) {
  const questions = form?.questions || [];
  const rows = questions.map((q) => {
    const r = responses[q.id];
    const answered = r && isNum(r.chosen);
    return {
      questionId: q.id,
      passage: q.passage,
      chosen: answered ? Number(r.chosen) : null,
      answer: q.answer,
      correct: answered ? Number(r.chosen) === q.answer : false,
      skipped: !answered,
      readAloud: Boolean(r && r.readAloud)
    };
  });

  const total = rows.length;
  const right = rows.filter((r) => r.correct).length;
  const percent = total ? Math.round((right / total) * 100) : null;

  const unaided = rows.filter((r) => !r.readAloud && !r.skipped);
  const unaidedRight = unaided.filter((r) => r.correct).length;
  const unaidedPercent = unaided.length ? Math.round((unaidedRight / unaided.length) * 100) : null;

  return {
    testId: form?.testId ?? null,
    right,
    total,
    percent,
    letter: isNum(percent) ? letterForPercent(percent) : null,
    unaidedRight,
    unaidedCount: unaided.length,
    unaidedPercent,
    unaidedLetter: isNum(unaidedPercent) ? letterForPercent(unaidedPercent) : null,
    aloudCount: rows.filter((r) => r.readAloud).length,
    skipped: rows.filter((r) => r.skipped).length,
    rows
  };
}

/** Every question answered, and none of it read to her. */
export function isFullyUnaided(grade) {
  return Boolean(grade) && grade.total > 0 && grade.aloudCount === 0 && grade.skipped === 0;
}

/** Was this saved attempt sat entirely unaided? Reads the stored row. */
export function attemptWasUnaided(attempt) {
  return Boolean(attempt) && attempt.total > 0 && attempt.aloudCount === 0
    && (attempt.rows || []).every((r) => !r.skipped && !r.readAloud);
}

/**
 * Each unit with whether it is open and what she has done on it.
 *
 * Unit 1 is always open. Every later unit opens only when the unit before it
 * has at least one attempt sat entirely unaided. A read-aloud sitting counts as
 * sat, not as passed-for-gating — the rule is about measuring her own reading.
 */
export function unitStatuses(attempts = []) {
  const units = readingUnits();
  return units.map((unit, i) => {
    const mine = attempts.filter((a) => a && a.testId === unit.id);
    const prev = i === 0 ? null : units[i - 1];
    const open = i === 0 || attempts.some((a) => a && a.testId === prev.id && attemptWasUnaided(a));
    return {
      unit,
      open,
      sittings: mine.length,
      sittingsUnaided: mine.filter(attemptWasUnaided).length,
      waitingOn: open ? null : prev.unitName
    };
  });
}

/** The row saved for one sitting. Same shape as the standalone app's, field for field. */
export function attemptRow(form, grade, { id, dayKey, at }) {
  return {
    attemptId: id,
    testId: form.testId,
    kind: 'reading-check',
    title: form.title,
    attempt: form.attempt ?? 1,
    dayKey,
    at,
    right: grade.right,
    total: grade.total,
    percent: grade.percent,
    letter: grade.letter,
    unaidedRight: grade.unaidedRight,
    unaidedCount: grade.unaidedCount,
    unaidedPercent: grade.unaidedPercent,
    unaidedLetter: grade.unaidedLetter,
    aloudCount: grade.aloudCount,
    khanCourse: form.khanCourse,
    khanUnit: form.khanUnit,
    rows: grade.rows.map((r) => ({
      questionId: r.questionId,
      passage: r.passage,
      chosen: r.chosen,
      answer: r.answer,
      correct: r.correct,
      skipped: r.skipped,
      readAloud: r.readAloud
    }))
  };
}
