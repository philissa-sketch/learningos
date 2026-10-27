// ---------------------------------------------------------------------------
// CHECK: BOOK REPORT AND PROJECTS PROMPT HER, ONE THING AT A TIME.
//
//   node src/academies/petal-pestle-academy/checks/check-guided-work.mjs
//   node src/academies/petal-pestle-academy/checks/check-guided-work.mjs --self-test
//
// Gigi, Oct 27 2026: "For her book report it is confusing for her... She isn't
// doing any of it. She will need prompts and also not a choice of what kind of
// book report. ... there are books for the year and none of the books showed up
// in the book report area so she checked out a different book. Her projects
// just shows up once and do not prompt her throughout the week to finish before
// giving her a new project."
//
// WHAT THIS PROVES
//   BOOK REPORT
//    1. No choice of report kind: the screen offers one format and no chips.
//    2. The book is picked from her shelf. Her Quarter 1 books are offered, a
//       grown-up's choice is the only book when there is one, a quarter with no
//       written books still offers the written ones, and the screen has no
//       free-text title box.
//    3. One report at a time, oldest first: with her real position (Quarter 2,
//       week 5 of the quarter) and Quarter 1 not done, she is on QUARTER 1.
//    4. The steps ask for one thing each, with sentence starters; steps 2 and 3
//       cannot be ticked with their box empty.
//   PROJECTS
//    5. Exactly one project is 'now', in every situation tried.
//    6. A started project stays hers until it is finished; the module's project
//       waits behind it as 'next'; finishing it releases the next.
//    7. Today shows that one project, today's step, a tick, and no "pick any
//       one" list. The finish button needs every step ticked.
//    8. A step tick from either machine survives a backup merge.
//
// WHAT THIS CANNOT PROVE: how the screens look, or that she opens them. It reads
// what the code decides and what the screens are written to show.
//
// --self-test puts each bug back into a temporary copy of src/ and fails if the
// check does not catch it.
// ---------------------------------------------------------------------------
import { cpSync, mkdtempSync, readFileSync, writeFileSync, symlinkSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';

const HERE = dirname(fileURLToPath(import.meta.url));
const argRoot = process.argv.find((a) => a.startsWith('--root='));
const ROOT = argRoot ? argRoot.slice(7) : join(HERE, '..');
const SELF_TEST = process.argv.includes('--self-test');

if (SELF_TEST) {
  const REPO = join(HERE, '..', '..', '..', '..');
  const A = 'src/academies/petal-pestle-academy/';
  const J = A + 'components/Journal/JournalView.jsx';
  const T = A + 'components/Schedule/TodayView.jsx';
  const L = A + 'lib/academicCenter.js';
  const BUGS = [
    // [name, file, text to find (the fix), text to put in its place (the bug)]
    ['Quarter 1 skipped for Quarter 2', A + 'lib/bookReportSchedule.js', 'if (have.size < total) {', 'if (false) {'],
    ['no books offered', L, 'const pool = ofQuarter.length ? ofQuarter : written;', 'const pool = [];'],
    ['a quarter with no written books offers none', L, 'const pool = ofQuarter.length ? ofQuarter : written;', 'const pool = ofQuarter;'],
    ['grown-up choice ignored', L, "const assigned = chosen?.title ?", "const assigned = false ?"],
    ['kind-of-report chips are back', J, 'const fmt = formatById(DEFAULT_FORMAT_ID);', 'const fmt = formatById(DEFAULT_FORMAT_ID); const x = <span>What kind of report</span>;'],
    ['free-text title box is back', J, '<span className="label-caps text-ink-500">Your book</span>', '<input placeholder="What are you reading?" />'],
    ['step 2 can be ticked with nothing written', A + 'store/useAppStore.js', "n === 2 && !String(row.notes", "n === 99 && !String(row.notes"],
    ['step 3 can be ticked with nothing written', A + 'store/useAppStore.js', "n === 3 && !String(row.draft", "n === 99 && !String(row.draft"],
    ['no sentence starters', A + 'data/writing/writingPieces.js', "'It is about ___.',", ''],
    ['a started project does not stay hers', L, 'live.filter((p) => started(p.id)).sort(byModule)[0]?.id ||', ''],
    ['several projects are "now"', L, "else if (p.id === activeId) state = 'now';", "else if (p.module <= mod) state = 'now';"],
    ['project can be finished with steps undone', L, 'project.steps.every((_, i) => have.has(i + 1))', 'project.steps.some((_, i) => have.has(i + 1)) || true'],
    ['project steps can be ticked out of order', L, 'return n === first;', 'return true;'],
    ['Today offers a pick-any-one list again', T, 'Your next project starts when this one is finished.', 'You have 3 projects to make. Pick any one.'],
    ['Today has no daily project tick', T, 'I did this step ✓\n              </button>\n            )}\n            <button', 'x\n              </button>\n            )}\n            <button'],
    ['Today has no book report knock', T, 'Do today’s step', 'Open'],
    ['a backup merge drops project steps', A + 'lib/mergeBackup.js', 'return stepsDone.length ? { ...keep, stepsDone } : keep;', 'return keep;']
  ];
  // --from=N starts at the Nth bug (1-based): the whole run is slow because each
  // bug gets its own copy of src/, so it can be done in two halves.
  const fromArg = process.argv.find((a) => a.startsWith('--from='));
  const from = fromArg ? Number(fromArg.slice(7)) : 1;
  let missed = 0;
  for (const [name, rel, good, bad] of BUGS.slice(from - 1)) {
    const tmp = mkdtempSync(join(tmpdir(), 'pp-gw-'));
    cpSync(join(REPO, 'src'), join(tmp, 'src'), { recursive: true });
    try { symlinkSync(join(REPO, 'node_modules'), join(tmp, 'node_modules')); } catch {}
    const f = join(tmp, rel);
    const text = readFileSync(f, 'utf8');
    if (!text.includes(good)) { console.log(`  SETUP FAIL  ${name}: text to break not found`); missed++; continue; }
    writeFileSync(f, text.replace(good, bad));
    const r = spawnSync(process.execPath, [fileURLToPath(import.meta.url), `--root=${join(tmp, A)}`], { encoding: 'utf8' });
    if (r.status === 0) { console.log(`  NOT CAUGHT  ${name}`); missed++; } else console.log(`  caught      ${name}`);
  }
  console.log(missed ? `\n${missed} bug(s) NOT caught.` : `\nAll ${BUGS.length} bugs caught.`);
  process.exit(missed ? 1 : 0);
}

const imp = (rel) => import(pathToFileURL(join(ROOT, rel)).href);
const src = (rel) => readFileSync(join(ROOT, rel), 'utf8');
const [AC, BR, { WEEKS }, { BOOK_REPORT }, { PROJECTS }, MB] = await Promise.all([
  imp('lib/academicCenter.js'), imp('lib/bookReportSchedule.js'), imp('config/assessment.js'),
  imp('data/writing/writingPieces.js'), imp('config/projects.js'), imp('lib/mergeBackup.js')
]);

let fails = 0;
const ok = (c, msg) => { if (!c) { fails++; console.log('  FAIL  ' + msg); } else console.log('  ok    ' + msg); };

// Her real position on Oct 27: Herbalism Quarter 1 read (8 weeks) and 4 weeks of
// Quarter 2, so she is in Quarter 2, week 5, which is module 7.
const readWeeks = (n) => WEEKS.herbalism.slice(0, n).flatMap((w) => w.lessons);
const HER = readWeeks(12);

console.log('\n--- BOOK REPORT ---');
const J = src('components/Journal/JournalView.jsx');
ok(!/BOOK_REPORT_FORMATS/.test(J) && !/What kind of report/i.test(J), '1. the screen offers no choice of report kind');
ok(!/placeholder="What are you reading\?"/.test(J) && /reportBookChoices/.test(J), '2. the book is picked from the shelf, not typed');

const q1 = AC.reportBookChoices(1, {});
const titles = q1.options.map((b) => b.title);
ok(['The True Story of the Three Little Pigs', 'The Moon Seems to Change', 'If You Lived Here: Houses of the World', 'A Seed Is Sleepy'].every((t) => titles.includes(t)), '   her four Quarter 1 books are offered');
ok(q1.assigned === null, '   no book is assigned until a grown-up chooses one');
const asg = AC.reportBookChoices(1, { 'academic-setup': { bookFor: { 1: { title: 'Gigi’s pick', author: 'Someone' } } } });
ok(asg.assigned?.title === 'Gigi’s pick', '   a grown-up’s choice is the assigned book');
const q2 = AC.reportBookChoices(2, {});
ok(q2.options.length >= 4 && q2.fromQuarter === false, '   a quarter with no written books still offers the written ones');
const added = AC.reportBookChoices(1, { 'academic-setup': { library: [{ id: 'x', title: 'Added Book', author: 'A' }] } });
ok(added.options.some((b) => b.title === 'Added Book'), '   a book a grown-up added to her library is offered');

const onQ1 = BR.bookReportNow(HER, {});
ok(onQ1.state === 'open' && onQ1.quarter === 1 && onQ1.carriedOver === true, '3. in Quarter 2 with Quarter 1 not done, she is on the QUARTER 1 report');
const q1done = BR.bookReportNow(HER, { 'book-report-q1': [1, 2, 3, 4] });
ok(q1done.state === 'open' && q1done.quarter === 2 && !q1done.carriedOver, '   with Quarter 1 finished she moves to Quarter 2');
const allDone = BR.bookReportNow(HER, { 'book-report-q1': [1, 2, 3, 4], 'book-report-q2': [1, 2, 3, 4] });
ok(allDone.allDone === true, '   with both finished it says all done');

ok(BOOK_REPORT.steps.length === 4 && BOOK_REPORT.steps.every((s) => 'starters' in s && 'box' in s), '4. every step says which box it uses and has its starters');
ok(BOOK_REPORT.steps[1].starters.length === 4 && BOOK_REPORT.steps[2].starters.length === 4, '   steps 2 and 3 have four sentence starters each');
const store = src('store/useAppStore.js');
ok(/n === 2 && !String\(row\.notes/.test(store) && /n === 3 && !String\(row\.draft/.test(store), '   steps 2 and 3 cannot be ticked with their box empty');

console.log('\n--- PROJECTS ---');
const count = (board, st) => board.filter((p) => p.state === st).length;
const T0 = AC.projectBoard({ lessonsRead: HER, projectStatus: {} });
ok(AC.currentModule(HER) === 7, 'her real position is module 7');
ok(count(T0, 'now') === 1 && T0[0].id === 'pj-m7', '5. nothing started: one project is now, this module’s (pj-m7)');
const started = { 'pj-m3': { projectId: 'pj-m3', stepsDone: [1], startedAt: '2026-10-20T00:00:00Z' } };
const T1 = AC.projectBoard({ lessonsRead: HER, projectStatus: started });
ok(count(T1, 'now') === 1 && T1[0].id === 'pj-m3', '6. a started project stays hers (pj-m3), still only one now');
ok(T1.find((p) => p.id === 'pj-m7').state === 'next', '   this module’s project waits behind it as next');
const today = AC.projectToday(T1, started);
ok(today.project.id === 'pj-m3' && today.stepNumber === 2 && today.next?.id === 'pj-m7', '   Today asks for step 2 of pj-m3 and knows pj-m7 is next');
const T2 = AC.projectBoard({ lessonsRead: HER, projectStatus: { ...started, 'pj-m3': { ...started['pj-m3'], doneAt: '2026-10-25T00:00:00Z' } } });
ok(count(T2, 'now') === 1 && T2[0].id === 'pj-m7', '   finishing it releases the next project (pj-m7)');
const T3 = AC.projectBoard({ lessonsRead: HER, projectStatus: { 'pj-m7': { doneAt: '2026-10-25T00:00:00Z' } } });
ok(count(T3, 'now') === 1 && T3[0].id === 'pj-m6', '   this module’s done: the most recent earlier one is offered, still one');
const T4 = AC.projectBoard({ lessonsRead: HER, projectStatus: {}, drafts: { 'academic-setup': { projectsOff: ['pj-m7'] } } });
ok(count(T4, 'now') === 1 && T4.find((p) => p.id === 'pj-m7').state === 'set-aside', '   a grown-up setting one aside hands her another, still one');
const p3 = PROJECTS.find((p) => p.id === 'pj-m3');
ok(AC.canFinishProject(p3, { stepsDone: [1] }) === false && AC.canFinishProject(p3, { stepsDone: [1, 2, 3, 4] }) === true, '7. a project can be finished only with every step ticked');
ok(AC.canTickProjectStep(p3, 2, { stepsDone: [1] }) && !AC.canTickProjectStep(p3, 3, { stepsDone: [1] }), '   steps tick in order');
const TV = src('components/Schedule/TodayView.jsx');
ok(/projectToday\(/.test(TV) && /I did this step ✓/.test(TV) && !/Pick any one/.test(TV), '   Today shows one project, today’s step and a tick, and no pick-any-one list');
ok(/Do today’s step/.test(TV) && /bookReportNow\(lessonsRead, stepsBySlot\)/.test(TV), '   Today knocks for the book report with today’s step');
ok(/Your next project starts when this one is finished/.test(TV), '   Today says the next project waits');
const merged = MB.pickProject({ projectId: 'a', startedAt: '2026-10-01', stepsDone: [1, 2] }, { projectId: 'a', startedAt: '2026-10-02', stepsDone: [1, 3] });
ok(JSON.stringify(merged.stepsDone) === JSON.stringify([1, 2, 3]), '8. a backup merge keeps a step ticked on either machine');

console.log(fails ? `\n${fails} FAILED` : '\nPASS');
process.exit(fails ? 1 : 0);
