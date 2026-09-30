// ---------------------------------------------------------------------------
// HER REPORT CARD — every subject on one table, the same columns for all
// (Sept 24 2026).
//
// Gigi: "The grade book is confusing. Can we clean it up so that it is more
// uniform and makes sense?" Then, choosing from the plan: Math and Grammar on
// the report card too, and the grades first. Then, the same evening: "I
// wanted to see the grades separate because I wanted to see her improvements."
//
// ---- ONE ROW, ONE SHAPE ----
// Every row has the same cells: Quarter 1, 2, 3, 4, the Year, and her
// PROGRESS (her first score → her latest, with an arrow). A quarter cell is one
// of three things, and only three:
//   'graded'      — a letter and a percentage
//   'not-reached' — a quarter this subject has, with nothing sat yet. "—".
//                   Never a zero: a quarter not sat is not a quarter failed.
//   'no-class'    — a quarter this subject was never built for (Science Lab
//                   has no Quarter 2). Not coming, so not "not reached".
// One number per cell: the grade of record (her latest attempt). Her best
// attempt is shown inside the quarter.
//
// ---- THREE GROUPS, THE WAY A SCHOOL REPORT CARD READS ----
//   Courses       — Herbalism, Science Lab, Social Studies, Human Body
//   Language Arts — Writing, Spelling, Vocabulary, Grammar (Khan), Reading with
//                   read-aloud, Reading on her own. EACH PART IS ITS OWN ROW,
//                   NEVER BLENDED: Gigi wants to see her improve in each one.
//                   A combined Language Arts grade would hide exactly that (a
//                   good spelling month can cover a bad writing month).
//   Math          — 2nd Grade Math (Khan)
//
// Opening a quarter lists EVERY result in it, oldest first — each Friday
// spelling test, each writing piece, each Khan unit — so the week-to-week climb
// is visible, not just the average.
//
// ---- WHERE EACH ROW COMES FROM ----
// Course grades: lib/gradebook.js (getSubjectGrades), unchanged — including
// its exam weighting. Reading: lib/readingProgress.js (readingScores). Writing:
// the marked pieces (gradePiece). Spelling and Vocabulary: the Friday tests.
// Khan rows: what Gigi enters on the Khan tab.
//
// ⚠️ KHAN ROWS ARE READ, NEVER BLENDED. Khan grades are entered and kept on
// the Khan tab. A Khan row's Year is courseAverage — the exact number the Khan
// tab prints — so the two screens can never disagree. Unit tests only; a
// Course Challenge is shown inside the row, never averaged in.
// ---------------------------------------------------------------------------

import { getSubjectGrades, sourceSentence, quarterForDate, YEAR_QUARTERS } from './gradebook.js';
import { readingScores } from './readingProgress.js';
import { KHAN_GRADEABLE_COURSES, courseAverage, challengeFor, isChallenge, letterForPercent } from './khanGrade.js';
import { gradePiece } from '../data/writing/writingPieces.js';

export const QUARTERS = [1, 2, 3, 4];
export const CELL = { graded: 'graded', notReached: 'not-reached', noClass: 'no-class' };
export const GROUPS = [
  { id: 'courses', label: 'Courses' },
  { id: 'language-arts', label: 'Language Arts · each part on its own' },
  { id: 'math', label: 'Math' }
];

/** Always-shown Khan courses. Any other Khan course appears once it has a result. */
export const KHAN_ALWAYS = ['math2', 'grammar'];

const isNum = (v) => typeof v === 'number' && Number.isFinite(v);
const mean = (xs) => (xs.length ? Math.round(xs.reduce((n, x) => n + x, 0) / xs.length) : null);
const pct = (right, total) => (total ? Math.round((100 * right) / total) : null);

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

/**
 * Her first score and her latest, in the order the work happened.
 * Null until there are two, because one score is not a direction.
 */
export function progressOf(scores) {
  const list = (scores || []).filter(isNum);
  if (list.length < 2) return null;
  const first = list[0];
  const latest = list[list.length - 1];
  return { first, latest, count: list.length, direction: latest > first ? 'up' : latest < first ? 'down' : 'same' };
}

/** The one place progress is written, so every row says it the same way. */
export function progressText(p) {
  if (!p) return '—';
  const arrow = p.direction === 'up' ? '↑' : p.direction === 'down' ? '↓' : '→';
  return `${p.first}% → ${p.latest}% ${arrow}`;
}

/**
 * A row built from a list of dated results, each one its own line inside its
 * quarter. `items`: { id, label, day, quarter, percent, score }.
 */
function rowFromItems({ id, label, emoji, group, items, counts, source }) {
  const inOrder = [...items].sort((a, b) => String(a.day || '').localeCompare(String(b.day || '')));
  const scored = inOrder.filter((i) => isNum(i.percent));
  return {
    id,
    label,
    emoji,
    group,
    source,
    detail: 'list',
    counts,
    cells: QUARTERS.map((q) => cell(q, true, mean(scored.filter((i) => i.quarter === q).map((i) => i.percent)))),
    year: graded(mean(scored.map((i) => i.percent))),
    progress: progressOf(scored.map((i) => i.percent)),
    itemsByQuarter: Object.fromEntries(QUARTERS.map((q) => [q, inOrder.filter((i) => i.quarter === q)])),
    outside: inOrder.filter((i) => !YEAR_QUARTERS.includes(i.quarter)).length
  };
}

const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

// ---------------------------------------------------------------------------
// COURSES
// ---------------------------------------------------------------------------

function courseRows({ attempts }) {
  const subjects = getSubjectGrades({ attempts, khanGrades: [], writingMarks: [], spellingResults: [] });
  return subjects
    .filter((s) => s.kind === 'course')
    .map((s) => {
      // Weekly tests in week order, each quarter's exam after its weeks.
      const ordered = [...s.assessments].sort((a, b) => a.quarter - b.quarter || (a.source === 'quarter-exam') - (b.source === 'quarter-exam'));
      return {
        id: s.id,
        label: s.label,
        emoji: s.emoji,
        group: 'courses',
        source: 'app',
        detail: 'course',
        subject: s,
        counts: s.assessedCount > 0 ? sourceSentence(s.sources) : 'Nothing graded yet',
        cells: QUARTERS.map((q) => {
          const row = s.quarters.find((x) => x.quarter === q);
          return cell(q, s.builtQuarters.includes(q), row ? row.percent : null);
        }),
        year: graded(s.percent),
        progress: progressOf(ordered.map((a) => a.percent)),
        itemsByQuarter: Object.fromEntries(
          QUARTERS.map((q) => [
            q,
            ordered
              .filter((a) => a.quarter === q)
              .map((a) => ({ id: a.id, label: a.label, score: `${a.percent}%`, percent: a.percent, best: a.percentBest !== a.percent ? a.percentBest : null }))
          ])
        ),
        outside: s.outside.length
      };
    });
}

// ---------------------------------------------------------------------------
// LANGUAGE ARTS — every part its own row
// ---------------------------------------------------------------------------

function writingRow(writingMarks = []) {
  const items = [];
  for (const m of writingMarks || []) {
    const g = gradePiece(m.pieceId, m.marks);
    if (!g || !isNum(g.percent)) continue;
    const day = String(m.at || '').slice(0, 10);
    items.push({ id: m.markId || `${m.pieceId}-${day}`, label: m.title || m.pieceId, day, quarter: Number(m.quarter) || quarterForDate(day), percent: g.percent, score: `${g.percent}%` });
  }
  return rowFromItems({
    id: 'writing',
    label: 'Writing',
    emoji: '✍️',
    group: 'language-arts',
    source: 'app',
    items,
    counts: items.length ? `${plural(items.length, 'writing piece', 'writing pieces')} marked` : 'Nothing marked yet'
  });
}

function fridayTestRow({ id, label, emoji, spellingResults, isTest, what }) {
  const items = [];
  for (const r of spellingResults || []) {
    if (!r || !isTest(r) || !isNum(r.percent)) continue;
    const day = dayOf(r);
    items.push({
      id: r.resultId || r.id || `${id}-${day}-${r.listId || ''}`,
      label: `${what}${r.listId ? ` · ${r.listId}` : ''}`,
      day,
      quarter: Number(r.quarter) || quarterForDate(day),
      percent: r.percent,
      score: isNum(r.right) && isNum(r.total) ? `${r.right}/${r.total} · ${r.percent}%` : `${r.percent}%`
    });
  }
  return rowFromItems({
    id,
    label,
    emoji,
    group: 'language-arts',
    source: 'app',
    items,
    counts: items.length ? `${plural(items.length, 'Friday test', 'Friday tests')}; each quarter is their average` : 'No Friday test yet'
  });
}

/** Her two Reading numbers, one row each, never blended. */
function readingRows(attempts) {
  const all = readingScores(attempts);
  const pick = (own) =>
    (attempts || [])
      .filter((a) => a && (own ? ['reading-test', 'reading-quarter'] : ['reading-lesson', 'reading-check']).includes(a.kind))
      .filter((a) => !(a.kind === 'reading-check' && !String(a.testId).startsWith('read-ela2-')))
      .map((a) => {
        const day = dayOf(a);
        return { id: a.attemptId || `${a.testId}-${a.at}`, label: a.title || a.testId, day, quarter: quarterForDate(day), percent: pct(a.right || 0, a.total || 0), score: `${a.right}/${a.total}` };
      });
  // A quarter's reading grade is its questions right over questions asked
  // (readingScores' own rule), not an average of percentages.
  const byQuarter = (own) =>
    QUARTERS.map((q) => {
      const inQ = (attempts || []).filter((a) => quarterForDate(dayOf(a)) === q);
      const s = readingScores(inQ);
      return cell(q, true, (own ? s.own : s.lessons)?.percent ?? null);
    });
  const lessons = rowFromItems({ id: 'reading-lessons', label: 'Reading · with read-aloud', emoji: '📖', group: 'language-arts', source: 'app', items: pick(false), counts: all.lessons ? `${all.lessons.right} of ${all.lessons.total} questions in her reading lessons` : 'Nothing graded yet' });
  lessons.cells = byQuarter(false);
  lessons.year = graded(all.lessons?.percent ?? null);
  const own = rowFromItems({ id: 'reading-own', label: 'Reading · on her own', emoji: '📖', group: 'language-arts', source: 'app', items: pick(true), counts: all.own ? `${plural(all.own.tests, 'test', 'tests')}, no read-aloud` : 'Nothing graded yet: her first Thursday reading test fills this in' });
  own.cells = byQuarter(true);
  own.year = graded(all.own?.percent ?? null);
  return [lessons, own];
}

// ---------------------------------------------------------------------------
// KHAN — Grammar and any Khan reading go in Language Arts, Math in Math
// ---------------------------------------------------------------------------

function khanRow(c, khanGrades = []) {
  const mine = (khanGrades || []).filter((g) => g && g.courseId === c.courseId);
  const units = mine.filter((g) => !isChallenge(g));
  const avg = courseAverage(c.courseId, khanGrades);
  const challenge = challengeFor(c.courseId, khanGrades);
  const letterOnly = units.filter((g) => !isNum(g.percent)).length;
  const parts = [];
  if (avg) parts.push(plural(avg.units, 'unit test', 'unit tests'));
  if (challenge) parts.push(`Course Challenge ${challenge.grade}${isNum(challenge.percent) ? ` (${challenge.percent}%)` : ''}, shown, not averaged in`);
  if (letterOnly) parts.push(`${plural(letterOnly, 'letter-only result', 'letter-only results')}, not averaged in`);
  if (c.graded === 'parent') parts.push('your marks, not Khan’s');
  const items = mine.map((g) => ({
    id: g.gradeId || `${g.courseId}-${g.unitN}-${g.at}`,
    label: isChallenge(g) ? 'Course Challenge (not averaged in)' : `Unit ${g.unitN ?? ''} · ${g.unit || ''}`.trim(),
    day: g.at,
    quarter: quarterForDate(g.at),
    // A Course Challenge and a letter-only row are listed but never averaged.
    percent: !isChallenge(g) && isNum(g.percent) ? g.percent : null,
    score: isNum(g.percent) ? `${g.grade} · ${g.percent}%` : `${g.grade} (letter only)`
  }));
  const row = rowFromItems({
    id: `khan-${c.courseId}`,
    label: `${c.label} (Khan)`,
    emoji: c.subject === 'math' ? '🔢' : c.subject === 'writing' ? '✏️' : '📚',
    group: c.subject === 'math' ? 'math' : 'language-arts',
    source: 'khan',
    items,
    counts: parts.length ? `${parts.join(' · ')} · entered on the Khan tab` : 'Nothing entered yet on the Khan tab'
  });
  // The Year is the Khan tab's own number, so the two screens never disagree.
  row.year = avg ? graded(avg.percent) : null;
  return row;
}

function khanRows(khanGrades = []) {
  return KHAN_GRADEABLE_COURSES.filter(
    (c) => KHAN_ALWAYS.includes(c.courseId) || (khanGrades || []).some((g) => g && g.courseId === c.courseId)
  ).map((c) => khanRow(c, khanGrades));
}

// ---------------------------------------------------------------------------

/**
 * The whole report card.
 * @returns {{ quarters: number[], groups: { id, label, rows }[] }}
 */
export function reportCard({ attempts = [], khanGrades = [], writingMarks = [], spellingResults = [] } = {}) {
  const khan = khanRows(khanGrades);
  const languageArts = [
    writingRow(writingMarks),
    fridayTestRow({ id: 'spelling', label: 'Spelling', emoji: '🔤', spellingResults, isTest: (r) => r.kind === 'spelling' || r.kind == null, what: 'Spelling test' }),
    fridayTestRow({ id: 'vocabulary', label: 'Vocabulary', emoji: '📝', spellingResults, isTest: (r) => r.kind === 'vocab-test', what: 'Vocabulary test' }),
    ...khan.filter((r) => r.group === 'language-arts'),
    ...readingRows(attempts)
  ];
  const rows = { courses: courseRows({ attempts }), 'language-arts': languageArts, math: khan.filter((r) => r.group === 'math') };
  return {
    quarters: QUARTERS,
    groups: GROUPS.map((g) => ({ ...g, rows: rows[g.id] }))
  };
}

/** What a cell says. The ONE place this text is written, so every row says it the same way. */
export function cellText(c) {
  if (!c || c.state === CELL.notReached) return '—';
  if (c.state === CELL.noClass) return 'no class';
  return `${c.letter} · ${c.percent}%`;
}
