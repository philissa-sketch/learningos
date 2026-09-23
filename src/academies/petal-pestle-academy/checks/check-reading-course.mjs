// ---------------------------------------------------------------------------
// check-reading-course — Azianna's Reading & Literature course.
//
// Run from the learningos folder:
//     node src/academies/petal-pestle-academy/checks/check-reading-course.mjs
//     node src/academies/petal-pestle-academy/checks/check-reading-course.mjs --self-test
//
// It lives in HER folder, not in scripts/, because the platform suite is
// shared with Lamar's school and must not grow a check that only one school
// can pass. Blueprint: claude/reading-course-blueprint.md (approved Sept 23 2026).
//
// ---- WHAT IT ASSERTS ----
//  1. SIZE — the register declares all 16 modules and the plan adds up to
//     96 lessons, 32 weekly tests and 4 quarter tests. Every module marked
//     'written' is imported, and every imported module is marked 'written'.
//     Prints "N of 16 written" on every run, so a part-built year is never
//     mistaken for a whole one (v3.94).
//  2. SHAPE — each written module has 6 lessons over two weeks (days 1–3),
//     2 Thursday tests, a verified book, and unique ids.
//  3. LEVEL — every NEW passage is inside its quarter's cap from
//     lib/readingCaps.js, measured by analyse() from lib/readingLoad.js.
//     Reused passages must resolve to a passage that really exists.
//  4. QUESTIONS — 4 choices, a valid answer, feedback null ONLY on the right
//     answer, a why; each lesson and test carries all four kinds (main idea,
//     word in context, detail, inference).
//  5. SPREAD — no answer slot above 40% in a module, and none unused.
//  6. NO READ-ALOUD ON TESTS — every weekly and quarter test has
//     readAloud === false (Gigi, Sept 23 2026).
//  7. NO KHAN GRADE — no reading course file mentions khanGrades or
//     addKhanGrade.
//  8. QUARTER TESTS — once every module in a quarter is written, that
//     quarter's test exists: 2 parts, 6 questions each, no read-aloud.
//
// ---- WHAT IT DOES NOT TEST ----
//  · Whether any screen shows this course. It is not wired yet (moving day).
//  · Whether the facts in a passage are true. Those are checked by a person
//    and written in each module's header.
//  · Whether a book link still works. It checks a verification note exists.
//
// --self-test puts each bug back in, one at a time, and fails if this check
// does not catch it.
// ---------------------------------------------------------------------------

import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const COURSE_DIR = join(ROOT, 'data', 'reading', 'course');

const { READING_PLAN, READING_REGISTER, READING_MODULES } = await import('../data/reading/course/readingCourse.js');
const { READING_UNITS } = await import('../data/reading/ela2Unit1.js');
const { analyse } = await import('../lib/readingLoad.js');
const { capsForQuarter } = await import('../lib/readingCaps.js');

const KINDS = ['main', 'word', 'detail', 'inference'];
const EXISTING_PASSAGES = new Set(READING_UNITS.flatMap((u) => u.passages.map((p) => p.id)));

function checkQuestions(qs, where, expected, out) {
  if (qs.length !== expected) out.push(`${where}: ${qs.length} questions, expected ${expected}`);
  const kinds = new Set();
  for (const q of qs) {
    kinds.add(q.kind);
    if (!KINDS.includes(q.kind)) out.push(`${q.id}: unknown kind "${q.kind}"`);
    if (!Array.isArray(q.choices) || q.choices.length !== 4) out.push(`${q.id}: needs 4 choices`);
    if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) out.push(`${q.id}: answer out of range`);
    (q.feedback || []).forEach((f, i) => {
      if (i === q.answer && f !== null) out.push(`${q.id}: feedback on the right answer must be null`);
      if (i !== q.answer && !(typeof f === 'string' && f.trim())) out.push(`${q.id}: wrong choice ${i} has no feedback`);
    });
    if ((q.feedback || []).length !== 4) out.push(`${q.id}: needs 4 feedback slots`);
    if (!q.why || !q.why.trim()) out.push(`${q.id}: no why`);
    if (!q.prompt || !q.prompt.trim()) out.push(`${q.id}: no prompt`);
  }
  for (const k of KINDS) if (!kinds.has(k)) out.push(`${where}: missing a "${k}" question`);
}

function checkLevel(id, text, quarter, out) {
  const caps = capsForQuarter(quarter);
  if (!caps) { out.push(`${id}: no reading cap for quarter ${quarter}`); return; }
  const a = analyse(text);
  if (a.meanSentence > caps.meanSentence) out.push(`${id}: ${a.meanSentence.toFixed(1)} words a sentence, cap ${caps.meanSentence}`);
  if (caps.floor != null && a.meanSentence < caps.floor) out.push(`${id}: ${a.meanSentence.toFixed(1)} words a sentence, floor ${caps.floor}`);
  if (a.hardRate > caps.hardRate) out.push(`${id}: ${(a.hardRate * 100).toFixed(1)}% long words, cap ${caps.hardRate * 100}% [${a.hardWords.join(', ')}]`);
}

export function problems({ plan, register, modules, fileTexts }) {
  const out = [];

  // 1. SIZE
  if (register.length !== plan.modules) out.push(`register lists ${register.length} modules, plan says ${plan.modules}`);
  if (plan.modules * plan.lessonsPerModule !== 96) out.push(`plan adds up to ${plan.modules * plan.lessonsPerModule} lessons, not 96`);
  if (plan.modules * plan.testsPerModule !== 32) out.push(`plan adds up to ${plan.modules * plan.testsPerModule} weekly tests, not 32`);
  register.forEach((r, i) => { if (r.n !== i + 1) out.push(`register out of order at ${i + 1}`); });
  for (const r of register) {
    const m = modules.find((x) => x.module === r.n);
    if (r.status === 'written' && !m) out.push(`module ${r.n} says written but is not imported`);
    if (r.status !== 'written' && m) out.push(`module ${r.n} is imported but still says ${r.status}`);
    if (m && m.quarter !== r.quarter) out.push(`module ${r.n}: quarter ${m.quarter}, register says ${r.quarter}`);
  }

  const ids = new Set();
  const seen = (id) => { if (ids.has(id)) out.push(`duplicate id ${id}`); ids.add(id); };

  for (const m of modules) {
    const tag = `module ${m.module}`;
    seen(m.id);
    // 2. SHAPE
    if (m.lessons.length !== plan.lessonsPerModule) out.push(`${tag}: ${m.lessons.length} lessons, expected ${plan.lessonsPerModule}`);
    if (m.tests.length !== plan.testsPerModule) out.push(`${tag}: ${m.tests.length} tests, expected ${plan.testsPerModule}`);
    const firstWeek = (m.module - 1) * 2 + 1;
    m.lessons.forEach((l, i) => {
      seen(l.id);
      const wantWeek = firstWeek + Math.floor(i / 3);
      const wantDay = (i % 3) + 1;
      if (l.week !== wantWeek || l.day !== wantDay) out.push(`${l.id}: week ${l.week} day ${l.day}, expected week ${wantWeek} day ${wantDay}`);
      if (l.reuses) {
        if (!EXISTING_PASSAGES.has(l.reuses)) out.push(`${l.id}: reuses ${l.reuses}, which does not exist`);
        return;
      }
      // 3. LEVEL, 4. QUESTIONS
      if (!l.text || !l.text.trim()) { out.push(`${l.id}: no passage text`); return; }
      checkLevel(l.id, l.text, m.quarter, out);
      (l.questions || []).forEach((q) => seen(q.id));
      checkQuestions(l.questions || [], l.id, plan.questionsPerLesson, out);
    });
    m.tests.forEach((t, i) => {
      seen(t.id);
      // 6. NO READ-ALOUD ON TESTS
      if (t.readAloud !== false) out.push(`${t.id}: a Thursday test must have readAloud: false`);
      if (t.week !== firstWeek + i) out.push(`${t.id}: week ${t.week}, expected ${firstWeek + i}`);
      checkLevel(t.id, t.text, m.quarter, out);
      (t.questions || []).forEach((q) => seen(q.id));
      checkQuestions(t.questions || [], t.id, plan.questionsPerTest, out);
    });
    if (m.quarterTest) {
      const qt = m.quarterTest;
      seen(qt.id);
      if (qt.readAloud !== false) out.push(`${qt.id}: a quarter test must have readAloud: false`);
      if ((qt.parts || []).length !== plan.quarterParts) out.push(`${qt.id}: ${(qt.parts || []).length} parts, expected ${plan.quarterParts}`);
      for (const p of qt.parts || []) {
        seen(p.id);
        checkLevel(p.id, p.text, m.quarter, out);
        checkQuestions(p.questions || [], p.id, plan.questionsPerQuarterPart, out);
      }
    }
    // Book
    const b = m.book;
    if (!b || !b.title || !b.author || !b.verifiedOn || !b.source) out.push(`${tag}: book is missing, or has no verification note`);

    // 5. SPREAD
    const slots = [0, 0, 0, 0];
    const all = [
      ...m.lessons.flatMap((l) => l.questions || []),
      ...m.tests.flatMap((t) => t.questions || []),
      ...(m.quarterTest ? m.quarterTest.parts.flatMap((p) => p.questions || []) : []),
    ];
    all.forEach((q) => { if (q.answer >= 0 && q.answer < 4) slots[q.answer] += 1; });
    const total = all.length || 1;
    slots.forEach((s, i) => {
      if (s / total > 0.4) out.push(`${tag}: answer slot ${i} holds ${s} of ${total} (over 40%)`);
      if (s === 0 && all.length) out.push(`${tag}: answer slot ${i} is never the right answer`);
    });
  }

  // 8. QUARTER TESTS
  for (let q = 1; q <= plan.quarters; q += 1) {
    const inQ = register.filter((r) => r.quarter === q);
    const allWritten = inQ.length && inQ.every((r) => r.status === 'written');
    const tests = modules.filter((m) => m.quarter === q && m.quarterTest);
    if (allWritten && tests.length !== 1) out.push(`quarter ${q}: every module is written but there are ${tests.length} quarter tests, expected 1`);
    if (!allWritten && tests.length) out.push(`quarter ${q}: has a quarter test before all its modules are written`);
  }

  // 7. NO KHAN GRADE
  for (const [name, text] of Object.entries(fileTexts)) {
    if (/khanGrades|addKhanGrade/.test(text)) out.push(`${name}: mentions a Khan grade. Reading may never write one.`);
  }

  return out;
}

function realInput() {
  const fileTexts = {};
  for (const f of readdirSync(COURSE_DIR)) if (f.endsWith('.js')) fileTexts[f] = readFileSync(join(COURSE_DIR, f), 'utf8');
  return { plan: READING_PLAN, register: READING_REGISTER, modules: READING_MODULES, fileTexts };
}

const clone = (x) => JSON.parse(JSON.stringify(x));

// Each mutation puts one bug back in. The check must catch every one.
const MUTATIONS = [
  ['a module dropped from the register', (s) => { s.register.pop(); }],
  ['a written module that is not imported', (s) => { s.register[4].status = 'written'; }],
  ['an imported module still marked planned', (s) => { s.register[0].status = 'planned'; }],
  ['a lesson removed', (s) => { s.modules[0].lessons.pop(); }],
  ['a Thursday test with read-aloud on', (s) => { s.modules[1].tests[0].readAloud = true; }],
  ['a Thursday test with read-aloud missing', (s) => { delete s.modules[1].tests[1].readAloud; }],
  ['a quarter test with read-aloud on', (s) => { s.modules[3].quarterTest.readAloud = true; }],
  ['a passage over the cap', (s) => { s.modules[0].lessons[2].text = 'This is a very long sentence that keeps going on and on and on with no stop at all for her to rest.'; }],
  ['a reuse of a passage that does not exist', (s) => { s.modules[0].lessons[0].reuses = 'read-ela2-u9-p1'; }],
  ['a lesson missing its word-in-context question', (s) => { s.modules[0].lessons[2].questions[1].kind = 'detail'; }],
  ['feedback on the right answer', (s) => { const q = s.modules[0].lessons[2].questions[0]; q.feedback[q.answer] = 'oops'; }],
  ['a wrong choice with no feedback', (s) => { const q = s.modules[0].lessons[2].questions[0]; q.feedback[(q.answer + 1) % 4] = null; }],
  ['three choices instead of four', (s) => { s.modules[0].lessons[2].questions[0].choices.pop(); }],
  // Moves the right answer to slot 0 WITH its feedback, so every question
  // stays valid and only the spread rule can catch it.
  ['every answer in slot 0', (s) => {
    const m = s.modules[2];
    [...m.lessons.flatMap((l) => l.questions || []), ...m.tests.flatMap((t) => t.questions)].forEach((q) => {
      const a = q.answer;
      [q.choices[0], q.choices[a]] = [q.choices[a], q.choices[0]];
      [q.feedback[0], q.feedback[a]] = [q.feedback[a], q.feedback[0]];
      q.answer = 0;
    });
  }],
  ['a book with no verification note', (s) => { delete s.modules[2].book.verifiedOn; }],
  ['a lesson on the wrong day', (s) => { s.modules[1].lessons[4].day = 3; }],
  ['a duplicate id', (s) => { s.modules[1].lessons[3].id = s.modules[1].lessons[2].id; }],
  ['the quarter test removed', (s) => { delete s.modules[3].quarterTest; }],
  ['a quarter test with one part', (s) => { s.modules[3].quarterTest.parts.pop(); }],
  ['a Khan grade written from Reading', (s) => { s.fileTexts['readingM1.js'] += '\naddKhanGrade({})'; }],
];

const args = process.argv.slice(2);
const real = realInput();

if (args.includes('--self-test')) {
  const base = problems(clone(real));
  if (base.length) { console.log('SELF-TEST CANNOT RUN: the real data already fails.\n  ' + base.join('\n  ')); process.exit(1); }
  let missed = 0;
  for (const [name, mutate] of MUTATIONS) {
    const s = clone(real);
    mutate(s);
    const found = problems(s);
    console.log(`${found.length ? 'caught' : 'MISSED'}  ${name}${found.length ? '  →  ' + found[0] : ''}`);
    if (!found.length) missed += 1;
  }
  console.log(missed ? `\n${missed} of ${MUTATIONS.length} bugs got through. FAIL.` : `\nAll ${MUTATIONS.length} bugs caught.`);
  process.exit(missed ? 1 : 0);
}

const found = problems(real);
const written = READING_REGISTER.filter((r) => r.status === 'written').length;
const lessons = READING_MODULES.reduce((a, m) => a + m.lessons.length, 0);
const tests = READING_MODULES.reduce((a, m) => a + m.tests.length, 0);
const qTests = READING_MODULES.filter((m) => m.quarterTest).length;
console.log(`Reading & Literature: ${written} of 16 modules written · ${lessons} of 96 lessons · ${tests} of 32 weekly tests · ${qTests} of 4 quarter tests.`);
console.log('NOT TESTED HERE: whether a screen shows it (not wired yet), whether the facts are true, whether book links still work.');
if (found.length) {
  console.log(`\nFAIL — ${found.length} problem(s):\n  ` + found.join('\n  '));
  process.exit(1);
}
console.log('PASS');
