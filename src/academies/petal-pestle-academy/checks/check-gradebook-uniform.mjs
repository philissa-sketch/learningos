// ---------------------------------------------------------------------------
// check-gradebook-uniform — one report card, every subject the same shape
// (Sept 24 2026).
//
// Run from the learningos folder:
//     node src/academies/petal-pestle-academy/checks/check-gradebook-uniform.mjs
//     node src/academies/petal-pestle-academy/checks/check-gradebook-uniform.mjs --self-test
//
// ---- WHY THIS EXISTS ----
// Gigi: "The grade book is confusing. Can we clean it up so that it is more
// uniform and makes sense?" Every subject card was its own shape, "nothing yet"
// was written three ways, two numbers sat in one cell, and Math and Grammar
// were not on the screen. She took the plan as recommended.
//
// ---- WHAT IT ASSERTS (by calling lib/reportCard.js on made-up records) ----
//  1. SAME SHAPE — every row has Quarter 1, 2, 3, 4 in order and a Year, and a
//     cell is only ever graded, not reached, or no class.
//  2. NEVER A ZERO — a quarter not sat says "—"; a quarter a course was never
//     built for says "no class"; a subject with nothing has no Year grade.
//  3. ONE NUMBER — a cell is the grade of record (her latest attempt); her best
//     is still reachable inside the quarter.
//  4. EVERY SUBJECT — every app subject, and Reading as two rows (with
//     read-aloud / on her own, never blended), each work landing in its quarter.
//  5. KHAN — Math and Grammar rows always there, their Year is exactly the Khan
//     tab's average, a Course Challenge is not averaged in, and no Khan result
//     changes any of this app's grades.
//  6. THE SCREEN — opens on Grades; the report card and every subject card
//     print cells through cellText() only; What is sticking, Every test and
//     Lesson checks are tabs, and What is sticking keeps its four counts.
// ---------------------------------------------------------------------------

import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { tmpdir } from 'node:os';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const SELF_TEST = process.argv.includes('--self-test');
const SRC = {
  card: 'lib/reportCard.js',
  panel: 'components/Parent/GradebookPanel.jsx'
};
const read = (rel) => readFileSync(join(ROOT, rel), 'utf8');

let tmp = null;
let n = 0;
async function loadModule(rel, source) {
  if (source == null) return import(pathToFileURL(join(ROOT, rel)).href + `?v=${n++}`);
  tmp = tmp || mkdtempSync(join(tmpdir(), 'pp-gb-'));
  const dir = dirname(join(ROOT, rel));
  const fixed = source.replace(/from\s+'(\.{1,2}\/[^']+)'/g, (_, p) => `from '${pathToFileURL(resolve(dir, p)).href}'`);
  const file = join(tmp, `m${n++}.js`);
  writeFileSync(file, fixed);
  return import(pathToFileURL(file).href);
}

const { allWeeks } = await import(pathToFileURL(join(ROOT, 'config/assessment.js')).href);
const { GRADEBOOK_SUBJECTS } = await import(pathToFileURL(join(ROOT, 'lib/gradebook.js')).href);
const { courseAverage } = await import(pathToFileURL(join(ROOT, 'lib/khanGrade.js')).href);

const Q1 = '2026-09-10';
const Q3 = '2027-02-10';
const firstHerb = allWeeks().find((w) => w.course === 'herbalism' && w.quarter === 1);

// Her made-up record: one Herbalism test sat twice (90 then 40), a reading
// lesson in Q1 and a Thursday reading test in Q3, and Khan Math and Grammar.
const ATTEMPTS = [
  { attemptId: 'a1', testId: firstHerb.id, kind: 'weekly', title: 'W1', at: `${Q1}T10:00:00Z`, dayKey: Q1, right: 9, total: 10, percent: 90, bandId: 'got-it', attempt: 1 },
  { attemptId: 'a2', testId: firstHerb.id, kind: 'weekly', title: 'W1', at: `${Q1}T11:00:00Z`, dayKey: '2026-09-12', right: 4, total: 10, percent: 40, bandId: 'go-back', attempt: 2 },
  { attemptId: 'a3', testId: 'rd-m1-l1', kind: 'reading-lesson', title: 'Reading lesson', at: `${Q1}T12:00:00Z`, dayKey: Q1, right: 3, total: 4, percent: 75 },
  { attemptId: 'a4', testId: 'rd-m5-t1', kind: 'reading-test', title: 'Thursday test', at: `${Q3}T12:00:00Z`, dayKey: Q3, right: 1, total: 2, percent: 50 }
];
const KHAN = [
  { gradeId: 'k1', courseId: 'math2', kind: 'unit', unitN: 1, unit: 'Add and subtract within 20', grade: 'B', percent: 84, at: Q1 },
  { gradeId: 'k2', courseId: 'math2', kind: 'unit', unitN: 2, unit: 'Place value', grade: 'D', percent: 64, at: Q3 },
  { gradeId: 'k3', courseId: 'math2', kind: 'course-challenge', unitN: null, unit: 'Course Challenge', grade: 'F', percent: 20, at: Q3 },
  { gradeId: 'k4', courseId: 'grammar', kind: 'unit', unitN: 1, unit: 'Nouns', grade: 'A', percent: 95, at: Q1 }
];

function run(ctx) {
  const out = [];
  const fail = (m) => out.push(m);
  const C = ctx.card;
  const card = C.reportCard({ attempts: ATTEMPTS, khanGrades: KHAN, writingMarks: [], spellingResults: [] });
  const rows = card.groups.flatMap((g) => g.rows);
  const row = (id) => rows.find((r) => r.id === id);
  const at = (id, q) => row(id)?.cells.find((c) => c.quarter === q);

  // 1. SAME SHAPE
  for (const r of rows) {
    if (r.cells.map((c) => c.quarter).join(',') !== '1,2,3,4') fail(`${r.label} does not have Quarter 1–4 in order`);
    for (const c of r.cells) if (!Object.values(C.CELL).includes(c.state)) fail(`${r.label} Q${c.quarter} is "${c.state}", not one of the three cell kinds`);
    if (!('year' in r)) fail(`${r.label} has no Year`);
    if (!r.counts) fail(`${r.label} does not say what counts`);
  }

  // 2. NEVER A ZERO
  const blankQ = at('social', 1);
  if (!blankQ || blankQ.state !== C.CELL.notReached || C.cellText(blankQ) !== '—') fail('a quarter she has not sat does not say "—"');
  if (row('social')?.year !== null) fail('a subject with nothing sat has a Year grade');
  if (rows.some((r) => r.cells.some((c) => c.state !== C.CELL.graded && c.percent === 0))) fail('a quarter not sat reads as zero');
  const sl = row('sciencelab');
  if (sl && !sl.subject.builtQuarters.includes(2)) {
    if (at('sciencelab', 2).state !== C.CELL.noClass || C.cellText(at('sciencelab', 2)) !== 'no class') fail('a quarter Science Lab was never built for does not say "no class"');
  }

  // 3. ONE NUMBER, THE LATEST
  const hq1 = at('herbalism', 1);
  if (!hq1 || hq1.percent !== 40) fail(`Herbalism Q1 is not her latest attempt (40%), got ${hq1?.percent}`);
  if (C.cellText(hq1 || {}) !== `${hq1?.letter} · 40%` || /best/.test(C.cellText(hq1 || {}))) fail('a cell shows more than one number');
  const best = (row('herbalism')?.itemsByQuarter[1] || []).find((i) => i.best === 90);
  if (!best) fail('her best attempt (90%) is no longer inside the quarter');

  // 4. EVERY SUBJECT
  for (const s of GRADEBOOK_SUBJECTS) if (!row(s.id)) fail(`${s.label} is not on the report card`);
  const rl = row('reading-lessons');
  const ro = row('reading-own');
  if (!rl || !ro) fail('Reading is not two rows');
  else {
    if (at('reading-lessons', 1).percent !== 75) fail('a Q1 reading lesson is not in Reading · with read-aloud, Q1');
    if (at('reading-own', 3).percent !== 50) fail('a Q3 Thursday test is not in Reading · on her own, Q3');
    if (at('reading-own', 1).state !== C.CELL.notReached) fail('Reading · on her own shows a grade in a quarter with no test (read-aloud leaked in)');
    if (at('reading-lessons', 3).state !== C.CELL.notReached) fail('a Thursday test leaked into Reading · with read-aloud');
  }

  // 5. KHAN
  const math = row('khan-math2');
  const gram = row('khan-grammar');
  if (!math || !gram) fail('Math and Grammar are not on the report card');
  if (math && math.group !== 'khan') fail('Math is not in the Khan group');
  if (math && math.year?.percent !== courseAverage('math2', KHAN).percent) fail(`Math's Year (${math.year?.percent}) is not the Khan tab's average (${courseAverage('math2', KHAN).percent})`);
  if (math && at('khan-math2', 3).percent !== 64) fail('the Course Challenge was averaged into Math');
  if (math && at('khan-math2', 1).percent !== 84) fail('a Q1 Khan unit is not in Q1');
  const emptyKhan = C.reportCard({ attempts: [], khanGrades: [] }).groups.flatMap((g) => g.rows);
  if (!emptyKhan.find((r) => r.id === 'khan-math2') || !emptyKhan.find((r) => r.id === 'khan-grammar')) fail('Math and Grammar vanish when nothing is entered');
  const noKhan = C.reportCard({ attempts: ATTEMPTS, khanGrades: [] }).groups.flatMap((g) => g.rows).filter((r) => r.group === 'app');
  const withKhan = rows.filter((r) => r.group === 'app');
  if (JSON.stringify(noKhan.map((r) => [r.id, r.cells, r.year])) !== JSON.stringify(withKhan.map((r) => [r.id, r.cells, r.year]))) fail('a Khan result changed one of this app’s grades');

  // 6. THE SCREEN
  const p = ctx.src.panel;
  if (!/export const GRADEBOOK_TABS = \[\s*\{ id: 'grades'/.test(p) || !/useState\('grades'\)/.test(p)) fail('the Gradebook does not open on Grades');
  for (const t of ['sticking', 'tests', 'lessons']) if (!new RegExp(`\\{tab === '${t}' && <`).test(p)) fail(`the "${t}" tab shows nothing`);
  for (const s of ['label="Solid"', 'label="Settling"', 'label="Slipping"', 'label="Not yet met"']) if (!p.includes(s)) fail(`What is sticking lost its ${s} count`);
  if (/percentBest|letterBest|her best ·/.test(p)) fail('the screen prints a second number next to a grade');
  if ((p.match(/cellText\(/g) || []).length < 4) fail('the screen writes grades itself instead of through cellText()');
  if (/\{\s*\w+\.letter\s*\}\s*·/.test(p)) fail('the screen formats a grade by hand instead of through cellText()');
  if (!/row\.detail === 'course' \?/.test(p)) fail('subject cards no longer open into their weeks');
  return out;
}

async function context(broken = {}) {
  const src = {};
  for (const [k, rel] of Object.entries(SRC)) src[k] = broken[k] ?? read(rel);
  return { src, card: await loadModule(SRC.card, broken.card) };
}

const BUGS = [
  ['a zero for a quarter not sat', 'card', "return { quarter, ...(graded(percent) || { state: CELL.notReached, percent: null, letter: null }) };", "return { quarter, ...(graded(percent ?? 0)) };"],
  ['no-class shown as not reached', 'card', 'if (!built) return { quarter, state: CELL.noClass, percent: null, letter: null };', ''],
  ['two numbers in a cell', 'card', "return `${c.letter} · ${c.percent}%`;", "return `${c.letter} · ${c.percent}%${c.best ? ` best ${c.best}%` : ''} (best)`;"],
  ['best shown as the grade', 'card', 'return cell(q, s.builtQuarters.includes(q), row ? row.percent : null);', 'return cell(q, s.builtQuarters.includes(q), row ? row.percentBest : null);'],
  ['best lost from the quarter', 'card', "best: a.percentBest !== a.percent ? a.percentBest : null", 'best: null'],
  ['Reading blended into one row', 'card', "cells: QUARTERS.map((q) => cell(q, true, byQ[q].own?.percent ?? null)),", "cells: QUARTERS.map((q) => cell(q, true, byQ[q].own?.percent ?? byQ[q].lessons?.percent ?? null)),"],
  ['Reading dropped', 'card', '...readingRows(attempts)', ''],
  ['Khan rows dropped', 'card', "{ id: 'khan', label: 'Khan Academy · entered on the Khan tab', rows: khanRows(khanGrades) }", "{ id: 'khan', label: 'Khan Academy · entered on the Khan tab', rows: [] }"],
  ['Khan blended into the app', 'card', 'rows: [...appRows({ attempts, writingMarks, spellingResults }), ...readingRows(attempts)]', "rows: [...appRows({ attempts, writingMarks, spellingResults: [...spellingResults, ...khanGrades.map((g) => ({ kind: 'spelling', percent: g.percent, dayKey: g.at }))] }), ...readingRows(attempts)]"],
  ['Course Challenge averaged in', 'card', 'const units = mine.filter((g) => !isChallenge(g));', 'const units = mine;'],
  ['Khan Year not the Khan tab’s', 'card', 'year: avg ? graded(avg.percent) : null,', 'year: graded(quarterAvg(1)),'],
  ['empty Khan rows hidden', 'card', "export const KHAN_ALWAYS = ['math2', 'grammar'];", 'export const KHAN_ALWAYS = [];'],
  ['quarters out of order', 'card', 'export const QUARTERS = [1, 2, 3, 4];', 'export const QUARTERS = [1, 2, 4, 3];'],
  ['opens on What is sticking', 'panel', "const [tab, setTab] = useState('grades');", "const [tab, setTab] = useState('sticking');"],
  ['sticking tab empty', 'panel', "{tab === 'sticking' && <StickingTab", "{tab === 'sticking-x' && <StickingTab"],
  ['sticking loses Slipping', 'panel', '<Stat n={summary.slipping} label="Slipping" hint="Missed more often than not" tone="clay" />', ''],
  ['grade typed by hand', 'panel', "<span className=\"tnum text-sm font-700 text-ink-900\">{row.year ? cellText(row.year) : '—'}</span>", "<span className=\"tnum text-sm font-700 text-ink-900\">{row.year ? `${row.year.letter} · ${row.year.percent}%` : '—'}</span>"],
  ['cards stop opening into weeks', 'panel', "row.detail === 'course' ? (", "row.detail === 'never' ? ("]
];

const real = run(await context());
if (!SELF_TEST) {
  if (real.length) {
    real.forEach((f) => console.log(`FAIL  ${f}`));
    process.exit(1);
  }
  console.log('One report card: every subject has Quarter 1–4 and a Year, "—" never a zero, one number a cell, Reading as two rows, Math and Grammar from the Khan tab unblended.');
  console.log('NOT TESTED HERE: how the screen looks.');
  console.log('PASS');
  process.exit(0);
}
if (real.length) {
  console.log('The real code fails, so the self-test means nothing. Fix these first:');
  real.forEach((f) => console.log(`  ${f}`));
  process.exit(1);
}
let missed = 0;
for (const [name, k, from, to] of BUGS) {
  const original = read(SRC[k]);
  if (!original.includes(from)) {
    console.log(`CANNOT  ${name}: the line to break is not in ${SRC[k]}`);
    missed++;
    continue;
  }
  const out = run(await context({ [k]: original.replace(from, to) }));
  if (out.length) console.log(`caught  ${name}  →  ${out[0]}`);
  else {
    console.log(`MISSED  ${name}`);
    missed++;
  }
}
console.log(missed ? `\n${missed} of ${BUGS.length} bugs NOT caught.` : `\nAll ${BUGS.length} bugs caught.`);
process.exit(missed ? 1 : 0);
