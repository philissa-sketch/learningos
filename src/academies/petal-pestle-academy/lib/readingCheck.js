// ---------------------------------------------------------------------------
// THE READING CHECK — building it, grading it, and the one number it exists for.
//
// ---- WHY THIS FILE EXISTS ----
//
// Gigi, Aug 25 2026: "There are no unit tests. How can we test her. In Lamar's
// app we have passages that he has to read and is tested on it."
//
// Khan built no assessments for elementary ELA — counted on the rendered page,
// 77 links, zero of them a test — so `ela2` carries `graded: 'parent'` and the
// grade was always meant to come from Gigi by hand. This is what replaces the
// hand.
//
// ---- ⚠️ THE NUMBER THIS EXISTS TO PRODUCE IS NOT THE PERCENTAGE ----
//
// It is `readAloud`, per answer.
//
// 54 of her 86 recorded answers were read aloud to her — 63% — and 5 of her 6
// Reading Comprehension answers. Her diagnostic file has said since Aug 13:
// "Reading 3.46 and Vocabulary 2.91 are listening scores, not reading scores.
// Her independent reading level is likely lower than both."
//
// HER INDEPENDENT READING HAS NEVER BEEN MEASURED, by this app or anything else
// it knows about. A reading check that does not record whether she was read to
// produces one more listening score wearing a reading score's name, which is
// worse than no score at all — it would look like it filled the blank.
//
// So `unaidedPercent` is computed and reported SEPARATELY and is null when she
// used read-aloud on everything. Null, never zero: a measurement not taken and
// a measurement of zero are opposite facts (§3.13.1, and the Number(null) bug
// three times in two days at v3.75).
//
// ---- WHAT IT MAY NEVER DO ----
//
// It may never write a Khan grade. v3.76 keeps a unit test and a Course
// Challenge apart in both directions; this is a THIRD kind — a test this app
// wrote, about a Khan unit, sat here. Filing it in khanGrades would put a number
// Khan never produced onto what becomes a transcript, and `nextUnitFor` would
// then advance her Khan unit on the strength of a paper Khan has never seen.
// ---------------------------------------------------------------------------

import { readingUnitFor, readingUnitById } from '../data/reading/ela2Unit1.js';
import { letterForPercent } from './khanGrade.js';
import { khanFor } from '../data/khan/khanMap.js';
import { nextUnitFor } from '../data/khan/khanUnits.js';

/** Which strands feed the reading subject. Same list blockLinks uses. */
const READING_STRANDS = ['reading-comprehension', 'vocabulary'];

/**
 * The reading check for the Khan unit she is actually sitting in, or null.
 *
 * ⚠️ IT ASKS THE SAME QUESTION THE BLOCK ASKS, and gets there the same way:
 * lowest measured strand chooses the course, the course chooses the unit in
 * order, skipping only units she has a grade for. Two implementations of "which
 * unit is she on" would drift, and the day they disagree the Planner offers her
 * a check on a unit she is not reading.
 *
 * PURE: strands and grades in, a unit out. No store, no date.
 *
 * Returns null when there is no check written for her unit yet — ONE of the
 * three ela2 units has one. A button that appears for units with nothing behind
 * it is the dead end this app has built five times.
 */
export function currentReadingCheck(strands = {}, grades = []) {
  const measured = READING_STRANDS.map((id) => ({ id, state: strands[id] }))
    .filter((s) => s.state && s.state.asked > 0)
    .sort((a, b) => a.state.level - b.state.level);
  if (!measured.length) return null;

  const khan = khanFor(measured[0].id, measured[0].state.level);
  if (!khan || !khan.unitCourse) return null;

  const unit = nextUnitFor(khan.unitCourse, grades);
  if (!unit) return null;

  return readingUnitFor(khan.unitCourse, unit.n);
}

/**
 * Lay the check out for the screen.
 *
 * The questions are NOT shuffled and the choices are NOT dealt in a fresh
 * order, unlike the weekly tests. Deliberate: the questions walk the passage in
 * the order the passage tells it, and for a child being measured on reading for
 * the first time, "find the part that answers this" is the skill. Shuffling
 * would turn a reading task into a searching task.
 */
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

/** The passage a question is asked about, or null. */
export function passageFor(form, questionId) {
  const q = (form?.questions || []).find((x) => x.id === questionId);
  if (!q) return null;
  return (form.passages || []).find((p) => p.id === q.passage) || null;
}

const isNum = (v) => v !== null && v !== undefined && v !== '' && Number.isFinite(Number(v));

/**
 * Mark it.
 *
 * `responses` is { [questionId]: { chosen, readAloud } }. A question she never
 * reached has no entry at all — not an entry with chosen null, because a
 * question she did not reach and a question she got wrong are different facts.
 *
 * ---- THE TWO PERCENTAGES ----
 *
 * `percent` is all eight questions: how much of the passage she understood, by
 * whatever route. That is the honest headline and it is what a report should
 * print.
 *
 * `unaidedPercent` is ONLY the questions she answered without pressing "read it
 * to me". ⚠️ It is null when she used read-aloud on every question — there is
 * no independent reading to report, and reporting 0% would say she read nothing
 * correctly rather than that she read nothing.
 *
 * It also carries `unaidedCount`, because a percentage over two questions is
 * not a measurement and a screen that prints "100%" over 2 of 8 is lying with
 * true arithmetic. The panel prints the count beside it, always.
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
  const unaidedPercent = unaided.length
    ? Math.round((unaidedRight / unaided.length) * 100)
    : null;

  const aloudCount = rows.filter((r) => r.readAloud).length;

  return {
    testId: form?.testId ?? null,
    right,
    total,
    percent,
    letter: isNum(percent) ? letterForPercent(percent) : null,
    // ⚠️ ONE LADDER. letterForPercent is imported, never restated — v3.78's
    // rule. Two implementations of one metric drift, and the day they disagree
    // neither number can be trusted.
    unaidedRight,
    unaidedCount: unaided.length,
    unaidedPercent,
    unaidedLetter: isNum(unaidedPercent) ? letterForPercent(unaidedPercent) : null,
    aloudCount,
    skipped: rows.filter((r) => r.skipped).length,
    rows
  };
}

/**
 * Is this the first independent reading measurement in her record?
 *
 * TRUE only when she answered every question without being read to. Anything
 * less is a mixed sitting: useful, and not the clean number.
 *
 * It is asked rather than assumed because it is the thing worth telling a
 * grown-up about, and because §5.4 says the app does not get to overstate what
 * it knows. "She read four of eight herself" is a fact. "Her reading level is
 * X" is not, from one paper.
 */
export function isFullyUnaided(grade) {
  return Boolean(grade) && grade.total > 0 && grade.aloudCount === 0 && grade.skipped === 0;
}
