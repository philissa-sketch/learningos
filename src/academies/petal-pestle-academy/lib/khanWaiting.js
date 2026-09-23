// ---------------------------------------------------------------------------
// WHICH KHAN UNITS ARE WAITING ON A GROWN-UP.
//
// ---- WHY THIS FILE EXISTS ----
//
// Gigi, Sep 12 2026: "Reading and Language Arts isn't correctly connected to
// Khan Academy. The lessons aren't moving along."
//
// Her record, read off her own Aug 31 export before a line of this was written:
// THREE khanGrades rows, all typed on Aug 29 — grammar unit 1, math2 unit 1,
// math2 unit 2. Not one row for ela2 or ela3, ever.
//
// So nothing was broken. `nextUnitFor('ela2', grades)` finds no reading row and
// correctly returns Unit 1, every day, for ever. Grammar advanced to Unit 2 on
// Aug 29 and has sat there a fortnight for the same reason. The app was telling
// the truth and the truth was invisible.
//
// ---- ⚠️ THE SAME COMPLAINT, THE SECOND TIME ----
//
// Gigi, Aug 23 2026: "When she is in her Today's Planner it is supposed to
// connect her to the unit she is working on in Khan Academy, but it is a new
// week and the links still have the same units connected."
//
// That time it WAS a bug — `addKhanGrade` never wrote courseId or unitN, so
// every grade she entered was invisible to the thing that advances Azianna.
// check-khan-advance exists because of it and covers all six courses, ela2 and
// ela3 included, through the app's own writer.
//
// So the mechanism is tested and works. What has never existed is anything that
// ASKS. The app has "Waiting on a grown-up" on the rewards screen and "Not yet"
// on goals. It has nothing for the one action that gates her whole week.
//
// A system that depends on an adult doing something, and never tells the adult,
// will be reported as broken every time — and the report will be right about the
// experience and wrong about the cause, which is the most expensive kind.
//
// ---- WHY IT IS A PURE FUNCTION AND NOT A BLOCK OF JSX ----
//
// Lamar's rule, quoted in his own store and followed here since v3.95: "A store
// action cannot be called from a check; a pure function can." Grades in, rows
// out. No store, no clock of its own, no React.
//
// ---- WHAT IT DELIBERATELY DOES NOT DO ----
//
// It does not say how long the CURRENT unit has been current. Nothing on disk
// records when a unit became her next one — it is derived, not stored — so any
// such number would be invented. It reports two things it can prove: how many
// units carry a letter, and how long since the last one was recorded.
// ---------------------------------------------------------------------------

import { KHAN_GRADEABLE_COURSES } from './khanGrade.js';
import { nextUnitFor, countsAsUnitDone } from '../data/khan/khanUnits.js';

/**
 * Whole days between two YYYY-MM-DD strings, or null if either is missing.
 *
 * Parsed as UTC on purpose. `new Date('2026-08-29')` is already UTC midnight but
 * `new Date(2026, 7, 29)` is local, and mixing the two puts the answer out by a
 * day for half the world — the kind of off-by-one that only shows up in the
 * evening and cannot be reproduced in the morning.
 */
export function daysBetween(fromKey, toKey) {
  if (!fromKey || !toKey) return null;
  const a = Date.parse(`${fromKey}T00:00:00Z`);
  const b = Date.parse(`${toKey}T00:00:00Z`);
  if (!Number.isFinite(a) || !Number.isFinite(b)) return null;
  return Math.round((b - a) / 86400000);
}

/**
 * Every Khan course that is waiting on a grown-up, newest silence first.
 *
 * A course is WAITING when it still has an unrecorded unit — which is every
 * course until the day its last unit is graded. That is the honest reading: the
 * unit on her Planner today cannot move until somebody records the one she is
 * on.
 *
 * `lastAt` is the most recent date a unit result was recorded for that course,
 * or null if none ever has been. `daysSince` is null in that same case — never
 * zero. A silence that has never been broken and a silence broken today are
 * opposite facts, and this project has now written the Number(null) bug into
 * three files by treating them as the same one.
 */
export function khanWaiting(grades = [], today = null) {
  const rows = [];

  for (const c of KHAN_GRADEABLE_COURSES) {
    const unit = nextUnitFor(c.courseId, grades);
    // null means every unit carries a letter — the Course Challenge signal, and
    // the one state that is not waiting on anybody.
    if (!unit) continue;

    const mine = (grades || []).filter(
      (g) => g && g.courseId === c.courseId && countsAsUnitDone(g)
    );
    const dates = mine.map((g) => g.at).filter(Boolean).sort();
    const lastAt = dates.length ? dates[dates.length - 1] : null;

    rows.push({
      courseId: c.courseId,
      label: c.label,
      subject: c.subject,
      graded: c.graded,
      unitN: unit.n,
      unitName: unit.name,
      unitsGraded: mine.length,
      unitCount: c.units.length,
      lastAt,
      daysSince: daysBetween(lastAt, today),
      neverRecorded: mine.length === 0
    });
  }

  // The longest silence first, and a course never recorded at all above any
  // course that has been. "Never" is not a big number; it is a different answer,
  // so it is sorted as its own class rather than as Infinity days.
  return rows.sort((a, b) => {
    if (a.neverRecorded !== b.neverRecorded) return a.neverRecorded ? -1 : 1;
    return (b.daysSince ?? 0) - (a.daysSince ?? 0);
  });
}

/**
 * The one-line reason, in words rather than a number.
 *
 * Kept here beside the data so the screen cannot write a second version of it.
 * v3.70's rule — two copies of a sentence drift, and the day they disagree the
 * panel explains the lock differently from the list.
 */
export function waitingReason(row, { threshold = 7 } = {}) {
  if (row.neverRecorded) {
    return row.graded === 'parent'
      ? 'No result has ever been recorded. Khan built no test for this course, so this mark is yours to give.'
      : 'No result has ever been recorded, so she is still on Unit 1.';
  }
  if (row.daysSince === null) return 'A result is recorded, but not dated.';
  if (row.daysSince === 0) return 'Recorded today.';
  if (row.daysSince === 1) return 'Last recorded yesterday.';
  if (row.daysSince < threshold) return `Last recorded ${row.daysSince} days ago.`;
  return `Last recorded ${row.daysSince} days ago — she has been on this unit since.`;
}

/** True when anything at all is waiting. The screen asks this before rendering. */
export function anyKhanWaiting(grades = [], today = null) {
  return khanWaiting(grades, today).length > 0;
}
