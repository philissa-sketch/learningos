// ---------------------------------------------------------------------------
// check-book-report — the book report button, and the steps it opens
// (Sept 24 2026).
//
// Run from the learningos folder:
//     node src/academies/petal-pestle-academy/checks/check-book-report.mjs
//     node src/academies/petal-pestle-academy/checks/check-book-report.mjs --self-test
//
// ---- WHY THIS EXISTS ----
// Gigi: "The link went to the herbalist journal, not a book report." Today's
// button opened the top of the Journal; the book report was at the bottom.
// And, found on the way: once a week passed, the report moved her to the
// week's step even with earlier steps undone ("Rough draft" before she had
// read the book).
//
// ---- WHAT IT ASSERTS ----
//  1. THE BUTTON — Today's book report button opens the book report screen,
//     through the Morning Circle reminder, and not the Journal.
//  2. THE SCREEN — the route exists, and the screen shows the SAME step
//     component the Journal shows (so they can never disagree).
//  3. NO SKIPPING — however far the weeks have moved, she is on her first step
//     not done. Working ahead still counts. Nothing opens before week 5 of a
//     quarter.
// ---------------------------------------------------------------------------

import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { tmpdir } from 'node:os';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const SELF_TEST = process.argv.includes('--self-test');
const SRC = {
  schedule: 'lib/bookReportSchedule.js',
  today: 'components/Schedule/TodayView.jsx',
  school: 'screens/HerSchool/HerSchool.jsx',
  view: 'components/Academic/AcademicCenterView.jsx',
  journal: 'components/Journal/JournalView.jsx'
};
const read = (rel) => readFileSync(join(ROOT, rel), 'utf8');

let tmp = null;
let n = 0;
async function loadModule(rel, source) {
  if (source == null) return import(pathToFileURL(join(ROOT, rel)).href + `?v=${n++}`);
  tmp = tmp || mkdtempSync(join(tmpdir(), 'pp-book-'));
  const dir = dirname(join(ROOT, rel));
  const fixed = source.replace(/from\s+'(\.{1,2}\/[^']+)'/g, (_, p) => `from '${pathToFileURL(resolve(dir, p)).href}'`);
  const file = join(tmp, `m${n++}.js`);
  writeFileSync(file, fixed);
  return import(pathToFileURL(file).href);
}

const { WEEKS } = await import(pathToFileURL(join(ROOT, 'config/assessment.js')).href);
const spine = WEEKS.herbalism;
const readThrough = (week) => spine.slice(0, week - 1).flatMap((w) => w.lessons);

function run(ctx) {
  const out = [];
  const fail = (m) => out.push(m);
  const s = ctx.src;

  // 1. THE BUTTON
  const button = (s.today.match(/\{bookStep && bookStep\.state === 'open'[\s\S]*?<\/button>/) || [''])[0];
  if (!button) fail('Today has no book report button');
  if (/onNavigate\?\.\('journal'\)/.test(button)) fail('the book report button opens the Journal, not the book report');
  if (!/throughCircle\(b\.id, \(\) => onNavigate\?\.\('bookReport'\)\)/.test(button)) fail('the book report button does not open the book report screen through the Morning Circle reminder');

  // 2. THE SCREEN
  // Sept 24 2026: the book report screen is the Academic Center's Book Reports tab.
  if (!/view === 'bookReport' && <AcademicCenterView startTab="reports"/.test(s.school)) fail('her school has no route from the button to her book report');
  if (!/function BookReportsTab\(\) \{[\s\S]*?<ThisWeeksStep \/>/.test(s.view) || !/import \{ ThisWeeksStep \} from '\.\.\/Journal\/JournalView\.jsx';/.test(s.view)) fail('the book report screen does not show the Journal’s own book report step');
  if (!/export function ThisWeeksStep\(\)/.test(s.journal)) fail('the Journal no longer shares its book report step');

  // 3. NO SKIPPING
  const B = ctx.schedule;
  for (let week = 5; week <= 8; week += 1) {
    const now = B.bookReportNow(readThrough(week), {});
    if (now.state !== 'open' || now.stepNumber !== 1) fail(`in week ${week} with nothing done she is on step ${now.stepNumber}, not step 1`);
  }
  const one = B.bookReportNow(readThrough(8), { 'book-report-q1': [1] });
  if (one.stepNumber !== 2) fail(`with step 1 done in week 8 she is on step ${one.stepNumber}, not step 2`);
  const ahead = B.bookReportNow(readThrough(5), { 'book-report-q1': [1, 2, 3] });
  if (ahead.stepNumber !== 4) fail('working ahead no longer counts');
  const early = B.bookReportNow(readThrough(4), {});
  if (early.state !== 'not-yet') fail('the book report opens before week 5 of the quarter');
  return out;
}

async function context(broken = {}) {
  const src = {};
  for (const [k, rel] of Object.entries(SRC)) src[k] = broken[k] ?? read(rel);
  return { src, schedule: await loadModule(SRC.schedule, broken.schedule) };
}

const BUGS = [
  ['button back to the Journal', 'today', "onClick={() => throughCircle(b.id, () => onNavigate?.('bookReport'))}", "onClick={() => onNavigate?.('journal')}"],
  ['no route', 'school', "{view === 'bookReport' && <AcademicCenterView startTab=\"reports\" onNavigate={navigate} />}", ''],
  ['screen without the step', 'view', '<ThisWeeksStep />', ''],
  ['skipping back', 'schedule', 'const stepNumber = Math.min(total, n);', 'const stepNumber = Math.min(total, Math.max(n, Math.min(byWeek, total)));'],
  ['working ahead ignored', 'schedule', 'const stepNumber = Math.min(total, n);', 'const stepNumber = Math.min(total, byWeek);'],
  ['opens too early', 'schedule', 'if (inQuarter < OPENS_AT_WEEK_IN_QUARTER) {', 'if (inQuarter < 1) {']
];

const real = run(await context());
if (!SELF_TEST) {
  if (real.length) {
    real.forEach((f) => console.log(`FAIL  ${f}`));
    process.exit(1);
  }
  console.log('Today’s book report button opens her book report; she is always on her first step not done.');
  console.log('NOT TESTED HERE: how the screen looks.');
  console.log('PASS');
  process.exit(0);
}
if (real.length) {
  real.forEach((f) => console.log(`  ${f}`));
  process.exit(1);
}
let missed = 0;
for (const [name, k, from, to] of BUGS) {
  const original = read(SRC[k]);
  if (!original.includes(from)) {
    console.log(`CANNOT  ${name}`);
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
