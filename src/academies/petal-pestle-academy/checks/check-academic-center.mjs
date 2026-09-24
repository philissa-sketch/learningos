// ---------------------------------------------------------------------------
// check-academic-center — her Academic Center (Sept 24 2026).
//
// Run from the learningos folder:
//     node src/academies/petal-pestle-academy/checks/check-academic-center.mjs
//     node src/academies/petal-pestle-academy/checks/check-academic-center.mjs --self-test
//
// ---- WHAT IT ASSERTS ----
//  1. SHE CAN GET THERE — an Academic Center tab in her top bar (still within
//     MAX_TABS), the Journal kept as its second section, and the route.
//  2. SIX TABS — Book Reports, Projects, Research Papers, Book Library,
//     Portfolio, Grown-Up Setup; and Setup is behind the grown-up passcode.
//  3. BOOK REPORTS — each quarter's state is honest: later, this quarter,
//     started, finished (step 4 AND a finished piece), marked.
//  4. PROJECTS — the current module's project is first; earlier unfinished ones
//     are next; done ones are marked done; a grown-up can set one aside.
//  5. RESEARCH PAPERS — closed before its quarter unless a grown-up opens it;
//     steps in order; a step cannot be ticked with its box empty or out of
//     order; un-ticking takes the later steps with it.
//  6. GROWN-UP SETUP — saved in writingDrafts ('academic-setup') so backups
//     carry it; a book chosen for a quarter fills in her book report.
//  7. BOOK LIBRARY — each written Reading module shows its verified book; a
//     module not written yet shows no guessed book.
//  8. PORTFOLIO — finished work only: never a half-done piece, never a daily
//     word activity.
//
// --self-test puts each bug back in and fails if this check misses it.
// ---------------------------------------------------------------------------

import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { tmpdir } from 'node:os';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const SELF_TEST = process.argv.includes('--self-test');
const SRC = {
  lib: 'lib/academicCenter.js',
  nav: 'config/navigation.js',
  view: 'components/Academic/AcademicCenterView.jsx',
  school: 'screens/HerSchool/HerSchool.jsx',
  store: 'store/useAppStore.js'
};
const read = (rel) => readFileSync(join(ROOT, rel), 'utf8');

let tmp = null;
let n = 0;
async function loadModule(rel, source) {
  if (source == null) return import(pathToFileURL(join(ROOT, rel)).href + `?v=${n++}`);
  tmp = tmp || mkdtempSync(join(tmpdir(), 'pp-academic-'));
  const dir = dirname(join(ROOT, rel));
  const fixed = source.replace(/from\s+'(\.{1,2}\/[^']+)'/g, (_, p) => `from '${pathToFileURL(resolve(dir, p)).href}'`);
  const file = join(tmp, `m${n++}.js`);
  writeFileSync(file, fixed);
  return import(pathToFileURL(file).href);
}

const { WEEKS } = await import(pathToFileURL(join(ROOT, 'config/assessment.js')).href);
const { READING_REGISTER } = await import(pathToFileURL(join(ROOT, 'data/reading/course/readingCourse.js')).href);
const spine = WEEKS.herbalism;
const readThrough = (week) => spine.slice(0, week - 1).flatMap((w) => w.lessons);

function run(ctx) {
  const out = [];
  const fail = (m) => out.push(m);
  const A = ctx.lib;
  const N = ctx.nav;
  const s = ctx.src;

  // 1. SHE CAN GET THERE
  const tab = N.NAV.find((t) => t.sections.some((x) => x.id === 'academic'));
  if (!tab) fail('there is no Academic Center in her top bar');
  else if (!/Academic Center/.test(tab.label)) fail(`the tab is called "${tab.label}"`);
  if (!N.NAV.some((t) => t.sections.some((x) => x.id === 'journal'))) fail('the Journal was lost when the Academic Center came in');
  if (N.NAV.length > N.MAX_TABS) fail(`her top bar has ${N.NAV.length} tabs, over the limit of ${N.MAX_TABS}`);
  if (!/view === 'academic' && <AcademicCenterView/.test(s.school)) fail('her school has no route to the Academic Center');

  // 2. SIX TABS
  for (const id of ['reports', 'projects', 'research', 'library', 'portfolio', 'setup']) {
    if (!new RegExp(`\\{ id: '${id}',`).test(s.view)) fail(`the Academic Center has no ${id} tab`);
  }
  if (!/<ParentGate onExit=\{\(\) => setTab\('reports'\)\}>\s*<SetupTab \/>\s*<\/ParentGate>/.test(s.view)) fail('Grown-Up Setup is not behind the grown-up passcode');

  // 3. BOOK REPORTS
  const st = (q, o) => A.bookReportStatus(q, { lessonsRead: readThrough(6), ...o }).state;
  if (st(1, {}) !== 'this-quarter') fail('this quarter’s book report does not say so');
  if (st(3, {}) !== 'not-yet') fail('a later quarter’s book report is shown as due');
  if (st(1, { drafts: { 'book-report-q1': { steps: [1, 2] } } }) !== 'in-progress') fail('a started book report does not say started');
  if (st(1, { drafts: { 'book-report-q1': { steps: [1, 2, 3, 4], final: '' } } }) === 'finished') fail('a book report with no finished writing counts as finished');
  if (st(1, { drafts: { 'book-report-q1': { steps: [1, 2, 3, 4], final: 'My report.' } } }) !== 'finished') fail('a finished book report does not say finished');
  if (st(1, { marks: [{ pieceId: 'book-report', quarter: 1 }] }) !== 'marked') fail('a marked book report does not say marked');

  // 4. PROJECTS
  const board = A.projectBoard({ lessonsRead: readThrough(5), projectStatus: { 'pj-m1': { doneAt: '2026-09-01' } } });
  if (board[0].state !== 'now' || board[0].module !== A.currentModule(readThrough(5))) fail('the current project is not first');
  if (board.find((p) => p.id === 'pj-m1').state !== 'done') fail('a finished project is not marked done');
  if (board.find((p) => p.id === 'pj-m2').state !== 'earlier') fail('an unfinished earlier project is not flagged');
  const off = A.projectBoard({ lessonsRead: readThrough(5), drafts: { 'academic-setup': { projectsOff: ['pj-m3'] } } });
  if (off.find((p) => p.id === 'pj-m3').state !== 'set-aside') fail('a project a grown-up set aside is still asked for');

  // 5. RESEARCH PAPERS
  if (A.researchNow(2, { lessonsRead: readThrough(3) }).state !== 'not-yet') fail('the Quarter 2 research paper opens in Quarter 1');
  if (A.researchNow(2, { lessonsRead: readThrough(9) }).state !== 'open') fail('the Quarter 2 research paper does not open in Quarter 2');
  const early = A.researchNow(2, { lessonsRead: readThrough(3), drafts: { 'academic-setup': { researchOpen: { 2: true } } } });
  if (early.state !== 'open' || early.stepNumber !== 1) fail('a grown-up cannot open the research paper early');
  const mid = A.researchNow(2, { lessonsRead: readThrough(9), drafts: { 'research-paper-q2': { steps: [1, 2] } } });
  if (mid.stepNumber !== 3) fail(`with steps 1–2 done she is on step ${mid.stepNumber}, not 3`);
  if (A.researchNow(2, { lessonsRead: readThrough(9), drafts: { 'research-paper-q2': { steps: [1, 2, 3, 4, 5] } } }).state !== 'finished') fail('a finished research paper does not say finished');
  if (A.canTickResearch(2, 1, { steps: [] })) fail('a research step can be ticked with its box empty');
  if (!A.canTickResearch(2, 1, { steps: [], question: 'Why does mint spread?' })) fail('a research step with writing cannot be ticked');
  if (A.canTickResearch(2, 3, { steps: [1], notes: 'x', sources: 'y' })) fail('a research step can be ticked out of order');
  const tog = (s.store.match(/async toggleResearchStep\([\s\S]*?\n  \},\n/) || [''])[0];
  if (!/canTickResearch\(quarter, n, row\)/.test(tog)) fail('the store ticks research steps without checking them');
  if (!/if \(s >= n\) have\.delete\(s\)/.test(tog)) fail('un-ticking a research step leaves later steps ticked');

  // 6. GROWN-UP SETUP
  const setup = (s.store.match(/async saveAcademicSetup\([\s\S]*?\n  \},\n/) || [''])[0];
  if (!/saveWritingDraft\(SETUP_SLOT, patch/.test(setup)) fail('Grown-Up Setup is not saved where backups carry it');
  if (!/saveWritingDraft\(bookReportSlot\(Number\(q\)\), \{ bookTitle: b\.title \}\)/.test(setup)) fail('a book a grown-up chooses does not reach her book report');
  if (A.bookReportStatus(2, { drafts: { 'academic-setup': { bookFor: { 2: { title: 'Charlotte’s Web' } } } } }).book !== 'Charlotte’s Web') fail('the chosen book does not show on her book report');

  // 7. BOOK LIBRARY
  const shelf = A.libraryShelf({});
  if (shelf.course.length !== READING_REGISTER.length) fail('the library does not list every Reading module');
  for (const b of shelf.course) {
    const reg = READING_REGISTER.find((r) => r.n === b.module);
    if (reg.status === 'written' && (b.kind !== 'reading' || !b.title || !/^https:\/\//.test(b.source || ''))) fail(`Module ${b.module}'s book is missing or unverified`);
    if (reg.status !== 'written' && b.kind !== 'reading-coming') fail(`Module ${b.module} shows a book before the module is written`);
  }

  // 8. PORTFOLIO
  const items = A.portfolioItems({
    drafts: { 'book-report-q1': { steps: [1, 2], final: '' }, 'research-paper-q2': { steps: [1, 2, 3, 4, 5], question: 'Q?', final: 'Paper.' } },
    projectStatus: { 'pj-m1': { doneAt: '2026-09-02' }, 'pj-m2': { doneAt: null } },
    attempts: [{ kind: 'reading-lesson', title: 'Slow and Steady', right: 3, total: 4, at: '2026-09-24' }],
    spellingResults: [{ kind: 'word-activity', task: 'mon' }, { kind: 'spelling', listId: 'word-study-q1-w1', right: 8, total: 10, at: '2026-09-25' }],
    lessonsRead: readThrough(9)
  });
  const kinds = items.map((i) => i.kind);
  if (kinds.includes('Book report')) fail('a half-done book report is in the Portfolio');
  if (!kinds.includes('Research paper')) fail('a finished research paper is not in the Portfolio');
  if (items.filter((i) => i.kind === 'Project').length !== 1) fail('the Portfolio does not hold exactly the finished project');
  if (!kinds.includes('Reading lesson') || !kinds.includes('Spelling test')) fail('finished reading and spelling work is missing from the Portfolio');
  if (items.length !== 4) fail(`the Portfolio holds ${items.length} pieces, expected 4 (a daily word activity is not a piece of work)`);
  return out;
}

async function context(broken = {}) {
  const src = {};
  for (const [k, rel] of Object.entries(SRC)) src[k] = broken[k] ?? read(rel);
  return { src, lib: await loadModule(SRC.lib, broken.lib), nav: await loadModule(SRC.nav, broken.nav) };
}

const BUGS = [
  ['no Academic Center tab', 'nav', "      { id: 'academic', label: 'Academic Center' },\n", ''],
  ['Journal lost', 'nav', "      { id: 'journal', label: 'Journal' }\n", ''],
  ['no route', 'school', '{view === \'academic\' && <AcademicCenterView onNavigate={navigate} />}', ''],
  ['Setup not locked', 'view', "<ParentGate onExit={() => setTab('reports')}>\n            <SetupTab />\n          </ParentGate>", '<SetupTab />'],
  ['no research tab', 'view', "  { id: 'research',", "  { id: 'researchx',"],
  ['finished without writing', 'lib', "else if (steps.has(total) && String(draft?.final || '').trim()) state = 'finished';", "else if (steps.has(total)) state = 'finished';"],
  ['marks ignored', 'lib', "if (mark) state = 'marked';\n  else if", 'if (false) state = \'marked\';\n  else if'],
  ['current project buried', 'lib', "const order = { now: 0, earlier: 1, later: 2, done: 3, 'set-aside': 4 };", "const order = { now: 2, earlier: 1, later: 0, done: 3, 'set-aside': 4 };"],
  ['set aside ignored', 'lib', "if (off.has(p.id)) state = 'set-aside';\n    else if (done)", "if (false) state = 'set-aside';\n    else if (done)"],
  ['research open all year', 'lib', 'const open = nowQ >= q || !!setup.researchOpen[q];', 'const open = true;'],
  ['grown-up cannot open early', 'lib', 'const open = nowQ >= q || !!setup.researchOpen[q];', 'const open = nowQ >= q;'],
  ['empty step ticked', 'lib', 'return !!String(draft[box.field] || \'\').trim();', 'return true;'],
  ['steps out of order', 'lib', '  if (n !== first) return false;\n', ''],
  ['store skips the check', 'store', "      if (!canTickResearch(quarter, n, row)) return { ok: false, reason: 'empty-or-out-of-order' };\n", ''],
  ['chosen book not passed on', 'store', "        if (b && b.title) await get().saveWritingDraft(bookReportSlot(Number(q)), { bookTitle: b.title });\n", ''],
  ['guessed books', 'lib', "      : { kind: 'reading-coming', module: r.n, quarter: r.quarter, moduleTitle: r.title };", "      : { kind: 'reading', module: r.n, quarter: r.quarter, title: r.title, source: 'https://x' };"],
  ['half-done work in the portfolio', 'lib', "if (s.state === 'finished' || s.state === 'marked') {", "if (s.state !== 'not-yet') {"],
  ['activities in the portfolio', 'lib', "if (!r || !(r.kind === 'spelling' || r.kind == null || r.kind === 'vocab-test')) continue;", 'if (!r) continue;']
];

const real = run(await context());
if (!SELF_TEST) {
  if (real.length) {
    real.forEach((f) => console.log(`FAIL  ${f}`));
    console.log(`\n${real.length} failed.`);
    process.exit(1);
  }
  console.log('Academic Center: 6 tabs, reachable from her top bar; book reports, projects, research papers, library, portfolio, grown-up setup.');
  console.log('NOT TESTED HERE: how the screens look.');
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
