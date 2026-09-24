// ---------------------------------------------------------------------------
// check-reading-wiring — her Reading course on her screens (Sept 24 2026).
//
// Run from the learningos folder:
//     node src/academies/petal-pestle-academy/checks/check-reading-wiring.mjs
//     node src/academies/petal-pestle-academy/checks/check-reading-wiring.mjs --self-test
//
// ---- WHY THIS EXISTS ----
// Gigi, Sept 24 2026: "The reading never changes to the next lesson after the
// questions are answered." Her Reading block followed Khan units that moved on
// only when a grown-up typed a grade, so it sat on Fairy Tales Retold. Nothing
// checked that finishing a piece moves her on, so nothing noticed.
//
// check-reading-course checks the COURSE (size, level, questions). This checks
// the WIRING: what she is given, in what order, and what finishing does.
//
// ---- WHAT IT ASSERTS ----
//  1. ORDER — the line is 3 lessons, the Thursday test, 3 lessons, the test, for
//     every written module, then the quarter test after the quarter's last
//     module. A test never comes before its week's lessons.
//  2. FINISHING MOVES HER ON — walked piece by piece through the whole line:
//     after each one is saved, the next one is the next in the line.
//  3. HER OLD WORK COUNTS — her Fairy Tales reading check finishes lessons 1
//     and 2, so she starts at lesson 3, and it counts as LESSONS.
//  4. ONE A DAY, FRIDAY CATCH-UP — Mon–Thu one piece a day; Friday more; the day
//     never changes WHICH piece is next.
//  5. NO READ-ALOUD ON TESTS — Thursday and quarter tests build with readAloud
//     false even if their data says otherwise; the screen shows the buttons
//     only when the form allows it.
//  6. TWO SCORES — On her own is null (blank) until a test is sat, and counts
//     tests only; Lessons counts lessons and her reading checks only.
//  7. NEVER A KHAN GRADE — no reading file calls the Khan grade writer.
//  8. THE SCREENS — Today's Reading block asks readingToday() and opens the
//     reading screen through the Morning Circle reminder; the old Khan link is
//     not shown on it; the route exists; the store saves the piece; the
//     Gradebook has the Reading card; Khan's unit is an optional watch in
//     Modules 1–3 only.
//  9. EVERY PIECE OPENS — every piece in the line builds a screen with its
//     questions; reused lessons find their passage.
//
// ---- WHAT IT DOES NOT TEST ----
//  · How the screens look. Checked by eye after the build.
//
// --self-test puts each bug back in (in a temporary copy of the real source)
// and fails if this check does not catch it.
// ---------------------------------------------------------------------------

import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { tmpdir } from 'node:os';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const SELF_TEST = process.argv.includes('--self-test');

const SRC = {
  progress: 'lib/readingProgress.js',
  view: 'components/Assess/ReadingLessonView.jsx',
  today: 'components/Schedule/TodayView.jsx',
  school: 'screens/HerSchool/HerSchool.jsx',
  store: 'store/useAppStore.js',
  gradebook: 'components/Parent/GradebookPanel.jsx',
  card: 'lib/reportCard.js'
};
const read = (rel) => readFileSync(join(ROOT, rel), 'utf8');

let tmp = null;
let n = 0;
async function loadModule(rel, source) {
  if (source == null) return import(pathToFileURL(join(ROOT, rel)).href + `?v=${n++}`);
  tmp = tmp || mkdtempSync(join(tmpdir(), 'pp-reading-'));
  const dir = dirname(join(ROOT, rel));
  const fixed = source.replace(/from\s+'(\.{1,2}\/[^']+)'/g, (_, p) => `from '${pathToFileURL(resolve(dir, p)).href}'`);
  const file = join(tmp, `m${n++}.js`);
  writeFileSync(file, fixed);
  return import(pathToFileURL(file).href);
}

const { READING_MODULES } = await import(pathToFileURL(join(ROOT, 'data/reading/course/readingCourse.js')).href);

// Her real reading-check record (backup of Sept 23): Fairy Tales Retold, both passages.
const HER_READING_CHECK = {
  testId: 'read-ela2-u1',
  kind: 'reading-check',
  dayKey: '2026-08-26',
  right: 6,
  total: 8,
  rows: [
    { passage: 'read-ela2-u1-p1', skipped: false },
    { passage: 'read-ela2-u1-p2', skipped: false }
  ]
};
const MON = new Date(2026, 8, 21, 10, 35);
const THU = new Date(2026, 8, 24, 10, 35);
const FRI = new Date(2026, 8, 25, 10, 35);
const key = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

function run(ctx) {
  const out = [];
  const fail = (m) => out.push(m);
  const r = ctx.progress;
  const K = r.READING_KINDS;
  const line = r.readingLine();

  // 1. ORDER
  const written = READING_MODULES.length;
  const expectLen = written * 8 + READING_MODULES.filter((m) => m.quarterTest).length;
  if (line.length !== expectLen) fail(`the line has ${line.length} pieces, expected ${expectLen}`);
  for (const m of READING_MODULES) {
    const mine = line.filter((p) => p.module === m.module && p.type !== 'quarter').map((p) => p.type).join(',');
    if (mine !== 'lesson,lesson,lesson,test,lesson,lesson,lesson,test') fail(`module ${m.module} runs ${mine}`);
    for (const t of m.tests) {
      const ti = line.findIndex((p) => p.id === t.id);
      const lessonsOfWeek = m.lessons.filter((l) => l.week === t.week).map((l) => line.findIndex((p) => p.id === l.id));
      if (lessonsOfWeek.some((li) => li > ti)) fail(`${t.id} comes before a lesson of its week`);
    }
    if (m.quarterTest) {
      const qi = line.findIndex((p) => p.id === m.quarterTest.id);
      const lastOfQuarter = Math.max(
        ...line.map((p, i) => (p.quarter === m.quarterTest.quarter && p.type !== 'quarter' ? i : -1))
      );
      if (qi < lastOfQuarter) fail('the quarter test comes before the quarter is finished');
    }
  }

  // 2. FINISHING MOVES HER ON — the exact complaint.
  let attempts = [];
  for (let i = 0; i < line.length; i++) {
    const t = r.readingToday(attempts, FRI);
    if (!t.next || t.next.id !== line[i].id) {
      fail(`after finishing ${i} piece(s), next is ${t.next?.id ?? 'nothing'}, expected ${line[i].id}`);
      break;
    }
    attempts = [...attempts, { testId: line[i].id, kind: K[line[i].type], dayKey: '2026-09-01', right: 1, total: 1 }];
  }
  if (r.readingToday(attempts, FRI).next) fail('with every piece done, something is still offered');

  // 3. HER OLD WORK
  const hers = r.readingToday([HER_READING_CHECK], THU);
  if (hers.next?.id !== 'rd-m1-03') fail(`with her Fairy Tales reading check, she starts at ${hers.next?.id}, expected rd-m1-03`);

  // 4. ONE A DAY, FRIDAY CATCH-UP
  const oneToday = [{ testId: 'rd-m1-03', kind: K.lesson, dayKey: key(THU), right: 3, total: 4 }, HER_READING_CHECK];
  const thu = r.readingToday(oneToday, THU);
  if (thu.canStart) fail('a second reading piece opens on a Thursday');
  if (thu.next?.id !== 'rd-m1-t1') fail(`after lesson 3 the next piece is ${thu.next?.id}, expected the Thursday test`);
  const friDone = [{ testId: 'rd-m1-03', kind: K.lesson, dayKey: key(FRI), right: 3, total: 4 }, HER_READING_CHECK];
  if (!r.readingToday(friDone, FRI).canStart) fail('Friday catch-up does not let her keep going');
  if (r.readingToday([HER_READING_CHECK], MON).next?.id !== hers.next?.id) fail('the day of the week changes which piece is next');
  if (!r.readingToday([HER_READING_CHECK], MON).canStart) fail('nothing opens on a fresh Monday');

  // 5. NO READ-ALOUD ON TESTS
  const noisy = READING_MODULES.map((m) => ({
    ...m,
    tests: m.tests.map((t) => ({ ...t, readAloud: true })),
    quarterTest: m.quarterTest ? { ...m.quarterTest, readAloud: true } : undefined
  }));
  for (const p of r.readingLine(noisy)) {
    const f = r.buildReadingForm(p.id, noisy);
    if (p.type !== 'lesson' && f?.readAloud !== false) fail(`${p.id} would offer read-aloud on a test`);
    if (p.type === 'lesson' && f?.readAloud !== true) fail(`${p.id} (a lesson) has no read-aloud`);
  }
  if (!/const canSpeak = form\.readAloud && speechSupported\(\);/.test(ctx.src.view)) {
    fail('the reading screen does not take read-aloud from the form');
  }
  if (!/function readPassage\(p\) \{\s*if \(!form\.readAloud\) return;/.test(ctx.src.view)) {
    fail('reading a passage aloud is not refused on a test');
  }

  // 6. TWO SCORES
  const s0 = r.readingScores([HER_READING_CHECK]);
  if (s0.own !== null) fail('On her own is not blank before any test (a test not sat would read as a score)');
  if (!s0.lessons || s0.lessons.percent !== 75) fail(`her reading check does not count as Lessons (got ${JSON.stringify(s0.lessons)})`);
  const s1 = r.readingScores([HER_READING_CHECK, { kind: K.test, testId: 'rd-m1-t1', right: 3, total: 6 }]);
  if (!s1.own || s1.own.percent !== 50) fail('a Thursday test does not reach On her own');
  if (s1.lessons.percent !== 75) fail('a Thursday test leaked into Lessons');
  const s2 = r.readingScores([{ kind: 'weekly', testId: 'herbalism-q1-w1', right: 1, total: 8 }]);
  if (s2.lessons || s2.own) fail('another course’s test reached Reading');

  // 7. NEVER A KHAN GRADE
  const khanWriter = /addKhanGrade|putKhanGrade|recordKhanGrade|\.khanGrades\s*=|khanGrades:\s*\[/;
  if (khanWriter.test(ctx.src.progress)) fail('readingProgress.js writes a Khan grade');
  if (khanWriter.test(ctx.src.view)) fail('the reading screen writes a Khan grade');
  const action = (ctx.src.store.match(/async recordReadingWork\(form, grade\) \{[\s\S]*?\n  \},\n/) || [''])[0];
  if (!action) fail('the store has no recordReadingWork');
  if (khanWriter.test(action)) fail('recordReadingWork writes a Khan grade');

  // 8. THE SCREENS
  if (!/await putAttempt\(attempt\)/.test(action)) fail('finishing a reading piece is never saved, so nothing can move her on');
  if (!/await recordReadingWork\(form, g\)/.test(ctx.src.view)) fail('the reading screen does not save what she did');
  if (!/readingToday\(useAppStore\.getState\(\)\.attempts, new Date\(\)\)/.test(ctx.src.view)) {
    fail('the reading screen does not ask readingToday() which piece is next');
  }
  if (!/const reading = b\.subject === 'reading' \? readingToday\(allAttempts, new Date\(\)\) : null;/.test(ctx.src.today)) {
    fail('Today’s Reading block does not ask readingToday()');
  }
  if (!/throughCircle\(b\.id, \(\) => onNavigate\?\.\('readingLesson'\)\)/.test(ctx.src.today)) {
    fail('the Reading block does not open the reading screen (through the Morning Circle reminder)');
  }
  if (!/\{target && !reading && \(/.test(ctx.src.today)) fail('the old Khan unit link still shows on the Reading block');
  if (!/view === 'readingLesson' && <ReadingLessonView/.test(ctx.src.school)) fail('her school has no route to the reading screen');
  // Sept 24 2026: Reading is two rows of the Gradebook's report card (with read-aloud, on her own).
  if (!/reportCard\(\{ attempts, khanGrades, writingMarks, spellingResults \}\)/.test(ctx.src.gradebook) || !/\.\.\.readingRows\(attempts\)/.test(ctx.src.card)) fail('the Gradebook has no Reading rows');
  for (const p of line) {
    const w = r.khanWatchFor(p);
    if (w && p.module > 3) fail(`${p.id} offers a Khan watch outside Modules 1–3`);
  }
  if (!r.khanWatchFor(line[0])) fail('Module 1 does not offer Khan’s unit as an optional watch');
  // Modules 4+ carry no Khan watch today, so hand in one that does: it must
  // still not be offered (Gigi: Khan is an optional watch in Modules 1–3 only).
  const withWatch = READING_MODULES.map((m) => ({ ...m, khanWatch: m.khanWatch || { course: 'ela3', unit: 1 } }));
  if (r.khanWatchFor({ module: 4 }, withWatch)) fail('a Khan watch is offered in Module 4');

  // 9. EVERY PIECE OPENS
  for (const p of line) {
    const f = r.buildReadingForm(p.id);
    if (!f || !f.questions.length || !f.passages.every((x) => x.text && x.text.trim())) fail(`${p.id} does not open with a passage and questions`);
    else if (f.questions.some((q) => !f.passages.some((x) => x.id === q.passage))) fail(`${p.id} has a question with no passage on screen`);
  }
  return out;
}

async function context(broken = {}) {
  const src = {};
  for (const [k, rel] of Object.entries(SRC)) src[k] = broken[k] ?? read(rel);
  const progress = await loadModule(SRC.progress, broken.progress);
  return { src, progress };
}

const BUGS = [
  ['stuck on one piece (the bug she saw)', 'progress', 'const next = line.find((p) => !done.has(p.id)) || null;', 'const next = line[0] || null;'],
  ['finishing is not counted', 'progress', 'if (Object.values(READING_KINDS).includes(a.kind)) done.add(a.testId);', ''],
  ['her reading check ignored', 'progress', 'if (!r.skipped && reuse.has(r.passage))', 'if (false)'],
  ['test before its lessons', 'progress', "m.tests\n        .filter((t) => t.week === week)", "m.tests\n        .filter((t) => t.week === week && false)"],
  ['quarter test dropped', 'progress', "if (m.quarterTest) {\n      const q = m.quarterTest;\n      line.push(", "if (false) {\n      const q = m.quarterTest;\n      line.push("],
  ['no limit on a Thursday', 'progress', 'canStart: !!next && (isCatchUp || doneToday === 0),', 'canStart: !!next,'],
  ['no Friday catch-up', 'progress', 'const isCatchUp = dow === 5;', 'const isCatchUp = false;'],
  ['a test built as a lesson', 'progress', "form(m, 'test', test.id, test.title, false, [", "form(m, 'lesson', test.id, test.title, true, ["],
  ['On her own reads zero', 'progress', 'own: tests && ot ?', 'own: true ?'],
  ['tests leak into Lessons', 'progress', 'if (LESSON_KINDS.includes(a.kind)) {', 'if (LESSON_KINDS.includes(a.kind) || OWN_KINDS.includes(a.kind)) {'],
  ['Khan watch in every module', 'progress', 'm.khanWatch && m.module <= 3', 'm.khanWatch'],
  ['Khan grade written', 'view', 'await recordReadingWork(form, g);', 'await recordReadingWork(form, g); addKhanGrade(g);'],
  ['screen ignores the form', 'view', 'const canSpeak = form.readAloud && speechSupported();', 'const canSpeak = speechSupported();'],
  ['passage read on a test', 'view', 'function readPassage(p) {\n    if (!form.readAloud) return;', 'function readPassage(p) {'],
  ['screen never saves', 'view', 'await recordReadingWork(form, g);', ''],
  ['store never saves', 'store', "    await putAttempt(attempt);\n    set({ attempts: [...get().attempts, attempt] });\n\n    await get().recordItemEvents(\n      attempt.rows", "    set({ attempts: [...get().attempts, attempt] });\n\n    await get().recordItemEvents(\n      attempt.rows"],
  ['block back on Khan', 'today', "const reading = b.subject === 'reading' ? readingToday(allAttempts, new Date()) : null;", 'const reading = null;'],
  ['block skips the reminder', 'today', "throughCircle(b.id, () => onNavigate?.('readingLesson'))", "onNavigate?.('readingLesson')"],
  ['old Khan link shown too', 'today', '{target && !reading && (', '{target && ('],
  ['no route', 'school', "{view === 'readingLesson' && <ReadingLessonView onExit={() => navigate('today')} />}", ''],
  ['no Gradebook rows', 'card', '...readingRows(attempts)', '']
];

const real = run(await context());
if (!SELF_TEST) {
  if (real.length) {
    real.forEach((f) => console.log(`FAIL  ${f}`));
    console.log(`\n${real.length} failed.`);
    process.exit(1);
  }
  const t = (await context()).progress.readingToday([HER_READING_CHECK], THU);
  console.log(`Reading line: ${t.of} pieces from the modules written. With her Fairy Tales reading check she starts at piece ${t.position}: ${t.next.title}.`);
  console.log('Finishing each piece moves her to the next, walked through the whole line.');
  console.log('NOT TESTED HERE: how the screens look.');
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
