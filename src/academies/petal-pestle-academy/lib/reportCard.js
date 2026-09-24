// ---------------------------------------------------------------------------
// HER REPORT CARD — every subject on one table, the same columns for all
// (Sept 24 2026).
//
// Gigi: "The grade book is confusing. Can we clean it up so that it is more
// uniform and makes sense?" Then, choosing from the plan: Math and Grammar on
// the report card too, and the grades first.
//
// Before this, every subject card on the Gradebook was its own shape: courses
// showed quarters, Language Arts showed a mix, Reading showed two boxes and no
// quarters, and a subject not started said "Not yet graded", "—" or "Blank"
// depending on which card you were reading. Math and Grammar were not on the
// screen at all.
//
// ---- ONE ROW, ONE SHAPE ----
// Every row has the same five cells: Quarter 1, 2, 3, 4 and the Year. A cell
// is one of three things, and only three:
//   'graded'      — a letter and a percentage
//   'not-reached' — a quarter this subject has, with nothing sat yet. "—".
//                   Never a zero: a quarter not sat is not a quarter failed.
//   'no-class'    — a quarter this subject was never built for (Science Lab
//                   has no Quarter 2). Not coming, so not "not reached".
// One number per cell: the grade of record (her latest attempt). Her best
// attempt is still on the screen, inside the quarter, where it has room to be
// read as what it is.
//
// ---- WHERE EACH ROW COMES FROM ----
// The app's own work is graded by lib/gradebook.js (getSubjectGrades) and by
// lib/readingProgress.js (readingScores), unchanged. This file only lays those
// numbers out by quarter. Nothing here re-weights anything.
//
// Reading keeps its two numbers apart as two rows — "with read-aloud" and "on
// her own" — because the whole point of her reading tests is the number with
// no read-aloud, and one blended row would bury it.
//
// ⚠️ KHAN ROWS ARE READ, NEVER BLENDED. Aug 29 Gigi said "Khan has its own
// tab", and Khan grades are still entered and kept there. Sept 24 she chose
// to SEE Math and Grammar on the report card as well. So Khan gets its own
// group of rows, labelled as Khan, and no Khan result reaches any app subject
// (getSubjectGrades still takes no Khan row, and check-gradebook-uniform
// proves it). A Khan row's Year is courseAverage — the exact number the Khan
// tab prints — so the two screens can never disagree. Unit tests only; a
// Course Challenge is shown inside the row, never averaged in (it would count
// the same material twice).
// ---------------------------------------------------------------------------

import { getSubjectGrades, sourceSentence, quarterForDate, YEAR_QUARTERS } from './gradebook.js';
import { readingScores } from './readingProgress.js';
import { KHAN_GRADEABLE_COURSES, courseAverage, challengeFor, isChallenge, letterForPercent } from './khanGrade.js';

export const QUARTERS = [1, 2, 3, 4];
export const CELL = { graded: 'graded', notReached: 'not-reached', noClass: 'no-class' };

/** Always-shown Khan courses. Any other Khan course appears once it has a result. */
export const KHAN_ALWAYS = ['math2', 'grammar'];

const isNum = (v) => typeof v === 'number' && Number.isFinite(v);

function graded(percent) {
  return isNum(percent) ? { state: CELL.graded, percent, letter: letterForPercent(percent) } : null;
}

function cell(quarter, built, percent) {
  if (!built) return { quarter, state: CELL.noClass, percent: null, letter: null };
  return { quarter, ...(graded(percent) || { state: CELL.notReached, percent: null, letter: null }) };
}

function dayOf(a) {
  return String(a?.dayKey || a?.at || '').slice(0, 10);
}

// ---------------------------------------------------------------------------

function appRows({ attempts, writingMarks, spellingResults }) {
  const subjects = getSubjectGrades({ attempts, khanGrades: [], writingMarks, spellingResults });
  return subjects.map((s) => ({
    id: s.id,
    label: s.label,
    emoji: s.emoji,
    group: 'app',
    detail: s.kind === 'course' ? 'course' : 'blended',
    subject: s,
    counts: s.assessedCount > 0 ? sourceSentence(s.sources) : 'Nothing graded yet',
    cells: QUARTERS.map((q) => {
      const row = s.quarters.find((x) => x.quarter === q);
      return cell(q, s.builtQuarters.includes(q), row ? row.percent : null);
    }),
    year: graded(s.percent),
    itemsByQuarter: Object.fromEntries(
      QUARTERS.map((q) => [
        q,
        s.assessments
          .filter((a) => a.quarter === q)
          .map((a) => ({ id: a.id, label: a.label, score: `${a.percent}%`, best: a.percentBest !== a.percent ? a.percentBest : null }))
      ])
    ),
    outside: s.outside.length
  }));
}

/** Her two Reading numbers, one row each, by quarter. */
function readingRows(attempts) {
  const inQ = (q) => (attempts || []).filter((a) => quarterForDate(dayOf(a)) === q);
  const all = readingScores(attempts);
  const byQ = Object.fromEntries(QUARTERS.map((q) => [q, readingScores(inQ(q))]));
  const items = (q, own) =>
    inQ(q)
      .filter((a) => (own ? ['reading-test', 'reading-quarter'] : ['reading-lesson', 'reading-check']).includes(a.kind))
      .filter((a) => !(a.kind === 'reading-check' && !String(a.testId).startsWith('read-ela2-')))
      .map((a) => ({ id: a.attemptId || `${a.testId}-${a.at}`, label: a.title || a.testId, score: `${a.right}/${a.total}`, day: dayOf(a) }));
  return [
    {
      id: 'reading-lessons',
      label: 'Reading · with read-aloud',
      emoji: '📖',
      group: 'app',
      detail: 'list',
      counts: all.lessons ? `${all.lessons.right} of ${all.lessons.total} questions in her reading lessons` : 'Nothing graded yet',
      cells: QUARTERS.map((q) => cell(q, true, byQ[q].lessons?.percent ?? null)),
      year: graded(all.lessons?.percent ?? null),
      itemsByQuarter: Object.fromEntries(QUARTERS.map((q) => [q, items(q, false)]))
    },
    {
      id: 'reading-own',
      label: 'Reading · on her own',
      emoji: '📖',
      group: 'app',
      detail: 'list',
      counts: all.own ? `${all.own.tests} test${all.own.tests === 1 ? '' : 's'}, no read-aloud` : 'Nothing graded yet: her first Thursday reading test fills this in',
      cells: QUARTERS.map((q) => cell(q, true, byQ[q].own?.percent ?? null)),
      year: graded(all.own?.percent ?? null),
      itemsByQuarter: Object.fromEntries(QUARTERS.map((q) => [q, items(q, true)]))
    }
  ];
}

/** Khan courses: unit tests averaged by quarter; the Year is the Khan tab's own average. */
function khanRows(khanGrades = []) {
  const rows = [];
  for (const c of KHAN_GRADEABLE_COURSES) {
    const mine = (khanGrades || []).filter((g) => g && g.courseId === c.courseId);
    if (!mine.length && !KHAN_ALWAYS.includes(c.courseId)) continue;
    const units = mine.filter((g) => !isChallenge(g));
    const quarterAvg = (q) => {
      const r = units.filter((g) => isNum(g.percent) && quarterForDate(g.at) === q);
      return r.length ? Math.round(r.reduce((n, g) => n + g.percent, 0) / r.length) : null;
    };
    const avg = courseAverage(c.courseId, khanGrades);
    const challenge = challengeFor(c.courseId, khanGrades);
    const letterOnly = units.filter((g) => !isNum(g.percent)).length;
    const parts = [];
    if (avg) parts.push(`${avg.units} unit test${avg.units === 1 ? '' : 's'}`);
    if (challenge) parts.push(`Course Challenge ${challenge.grade}${isNum(challenge.percent) ? ` (${challenge.percent}%)` : ''}, shown, not averaged in`);
    if (letterOnly) parts.push(`${letterOnly} letter-only result${letterOnly === 1 ? '' : 's'}, not averaged in`);
    if (c.graded === 'parent') parts.push('your marks, not Khan’s');
    rows.push({
      id: `khan-${c.courseId}`,
      label: c.label,
      emoji: c.subject === 'math' ? '🔢' : c.subject === 'writing' ? '✏️' : '📚',
      group: 'khan',
      detail: 'list',
      counts: parts.length ? parts.join(' · ') : 'Nothing entered yet on the Khan tab',
      cells: QUARTERS.map((q) => cell(q, true, quarterAvg(q))),
      year: avg ? graded(avg.percent) : null,
      itemsByQuarter: Object.fromEntries(
        QUARTERS.map((q) => [
          q,
          mine
            .filter((g) => quarterForDate(g.at) === q)
            .map((g) => ({
              id: g.gradeId || `${g.courseId}-${g.unitN}-${g.at}`,
              label: isChallenge(g) ? 'Course Challenge (not averaged in)' : `Unit ${g.unitN ?? ''} · ${g.unit || ''}`.trim(),
              score: isNum(g.percent) ? `${g.grade} · ${g.percent}%` : `${g.grade} (letter only)`,
              day: g.at
            }))
        ])
      ),
      outside: mine.filter((g) => !YEAR_QUARTERS.includes(quarterForDate(g.at))).length
    });
  }
  return rows;
}

/**
 * The whole report card.
 * @returns {{ quarters: number[], groups: { id, label, rows }[] }}
 */
export function reportCard({ attempts = [], khanGrades = [], writingMarks = [], spellingResults = [] } = {}) {
  return {
    quarters: QUARTERS,
    groups: [
      { id: 'app', label: 'Her school', rows: [...appRows({ attempts, writingMarks, spellingResults }), ...readingRows(attempts)] },
      { id: 'khan', label: 'Khan Academy · entered on the Khan tab', rows: khanRows(khanGrades) }
    ]
  };
}

/** What a cell says. The ONE place this text is written, so every row says it the same way. */
export function cellText(c) {
  if (!c || c.state === CELL.notReached) return '—';
  if (c.state === CELL.noClass) return 'no class';
  return `${c.letter} · ${c.percent}%`;
}
