// ---------------------------------------------------------------------------
// A SHEET ONLY WHERE A SHEET EARNS ITS PLACE.
// Run: node scripts/verify-printouts.mjs
//
// ---- THE PARENT'S FRAMEWORK (Aug 16, 2026) ----
//
// She gave the rule and the reason in the same breath, and the reason is the
// part this suite exists to defend:
//
//   "No, you do not need a printout for every single lesson... forcing one into
//    every single day can cause burnout for both you and your kids. Aim for 2
//    to 3 strategic printouts per week per subject."
//
// A cap is easy to write and easy to drift past — one more useful sheet, then
// one more, and the thing she was protecting against arrives by increments and
// nobody decides it. So the ceiling is asserted, not remembered.
//
// Her four reasons a lesson EARNS a sheet: it is spatial, it is a multi-step
// process, it is a hands-on tutorial, or it is a heavy writing day. Her three
// reasons to skip: an introductory or story lesson, a review day, or a quiz
// that already tests the concept.
//
// ---- AND WHY THERE ARE NO EXTERNAL LINKS ----
//
// She asked for "printout links". Every one is a view this app renders and
// prints itself. A link to an outside printable can rot, cost money, or turn
// out never to have existed, and there is no way to promise a URL is still what
// it was without opening it. This project does not put unopened URLs in front
// of a twelve-year-old.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pr = await import(REPO + '/src/academies/lamar/data/printouts.js');
const { allLessons } = await import(REPO + '/src/academies/lamar/data/lessons/index.js');

let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
}
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');

console.log('\n--- 1. the cadence she asked for ---');
{
  /**
   * Q1 is thirteen school weeks. Her ceiling is 2-3 per subject per week, so a
   * subject may carry at most ~39 in a quarter — but the number that matters is
   * the one below it, because the real risk is a sheet on EVERY lesson.
   */
  const WEEKS_IN_QUARTER = 13;
  const MAX_PER_WEEK = 3;
  const bySubject = {};
  for (const l of allLessons) {
    if (l.quarter !== 'Q1 2026-2027' || l.isQuarterlyExam) continue;
    bySubject[l.subject] ??= [];
    bySubject[l.subject].push(l);
  }

  for (const [subject, lessons] of Object.entries(bySubject)) {
    const n = pr.printoutCountFor(lessons);
    ok(`${subject}: ${n} sheets across ${lessons.length} Q1 lessons`,
      n <= WEEKS_IN_QUARTER * MAX_PER_WEEK,
      `over the 2-3 per week ceiling`);
    ok(`...and not one on every lesson`, n < lessons.length,
      'the exact thing she said causes burnout');
  }

  const total = Object.values(bySubject).reduce((n, ls) => n + pr.printoutCountFor(ls), 0);
  const lessonTotal = Object.values(bySubject).reduce((n, ls) => n + ls.length, 0);
  ok('under half of Q1 lessons carry a sheet', total / lessonTotal < 0.5,
    `${total} of ${lessonTotal} — quality over quantity was the instruction`);
}

console.log('\n--- 2. the lessons she named as skips have none ---');
{
  /** Her words: "purely giving historical context, telling a biographical story". */
  const STORY = ['ae7-history-of-flight', 'ae7-history-of-flight-2', 'tech7-digital-citizenship',
    'tech7-artificial-intelligence'];
  for (const id of STORY) {
    ok(`${id} — story/context lesson, no sheet`, !pr.printoutFor(id),
      'let him watch, enjoy, and take the quiz');
  }

  /**
   * Her words: "If they are just practicing a skill they already learned the
   * day before". Every '-2' lesson that is a straight continuation.
   */
  const REVIEW = ['ae7-how-airplanes-fly-2', 'tech7-google-workspace-2', 'tech7-scratch-2'];
  for (const id of REVIEW) {
    ok(`${id} — review of the day before, no sheet`, !pr.printoutFor(id));
  }
}

console.log('\n--- 3. every sheet has a stated reason ---');
{
  const KINDS = Object.keys(pr.PRINTOUT_KINDS);
  ok('the four kinds are exactly her four criteria',
    KINDS.join(',') === 'diagram,steps,log,draft',
    KINDS.join(','));

  const bad = [];
  for (const [id, spec] of Object.entries(pr.LESSON_PRINTOUTS)) {
    if (!KINDS.includes(spec.kind)) bad.push(`${id}: unknown kind ${spec.kind}`);
    if (!spec.title) bad.push(`${id}: no title`);
    if (!Array.isArray(spec.prompts) || spec.prompts.length === 0) bad.push(`${id}: no prompts`);
    if ((spec.prompts || []).length > 6) bad.push(`${id}: ${spec.prompts.length} prompts`);
    if (!allLessons.some((l) => l.id === id)) bad.push(`${id}: no such lesson`);
  }
  ok('every sheet is well formed and points at a real lesson', bad.length === 0, bad.join(' · '));
  ok('...and none has more than six prompts',
    Object.values(pr.LESSON_PRINTOUTS).every((s) => s.prompts.length <= 6),
    'a sheet with twenty boxes gets abandoned at box four');

  ok('every kind states WHY it is on paper',
    Object.values(pr.PRINTOUT_KINDS).every((k) => k.why && k.blurb),
    'a sheet that arrives without a reason is busywork');
  ok('...and the sheet prints that reason',
    /\{sheet\.why\} \{sheet\.blurb\}/.test(read('src/components/Lesson/PrintoutSheet.jsx')));
}

console.log('\n--- 4. the subject journal — her better idea ---');
{
  const LIVE = ['aerospace', 'technology', 'science', 'gardening', 'socialStudies', 'robotics'];
  for (const s of LIVE) {
    ok(`${s} has a journal`, Boolean(pr.journalFor(s)));
  }
  const j = pr.journalFor('aerospace');
  ok('a journal is blank templates, printed once', j.pages.every((p) => p.count > 0 && p.lines.length > 0));
  ok('...and is substantial enough to be worth binding',
    j.pages.reduce((n, p) => n + p.count, 0) >= 10);
  const ui = read('src/components/Lesson/PrintoutSheet.jsx');
  ok('...and the screen says to print it ONCE, at the start',
    /Print this <strong>once<\/strong>, at the start of the unit/.test(ui),
    'the whole point is not printing on a school morning');
  ok('...with each page starting a new sheet of paper', /break-before-page/.test(ui));
}

console.log('\n--- 5. nothing links off to a printable nobody has opened ---');
{
  const data = read('src/academies/lamar/data/printouts.js');
  const ui = read('src/components/Lesson/PrintoutSheet.jsx');
  ok('no external URLs in the printout data', !/https?:\/\//.test(data),
    'a link to an outside printable can rot, cost money, or never have existed');
  ok('...nor in the sheet component', !/https?:\/\/(?!.*example)/.test(ui));
  ok('sheets are printed by the browser, like the Study Guide already was',
    /window\.print\(\)/.test(ui));

  const roster = read('src/components/Lesson/LessonRoster.jsx');
  ok('the roster offers a sheet only where one exists', /printoutFor\(lesson\.id\) && onOpenPrintout/.test(roster));
  ok('...and never for a lesson whose quarter has not opened', /&& !notYet/.test(roster),
    'a printable for work he cannot start yet is paper on the floor');
  ok('the journal is offered per subject', /onOpenJournal\(subject\)/.test(roster));
  ok('both are reachable from App', /<PrintoutSheet/.test(read('src/App.jsx')) && /<SubjectJournal/.test(read('src/App.jsx')));
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
