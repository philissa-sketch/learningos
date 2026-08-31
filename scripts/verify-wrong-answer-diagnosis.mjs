// ---------------------------------------------------------------------------
// WHEN HE GETS IT WRONG, THE APP TELLS HIM WHY *HIS* ANSWER WAS WRONG.
// Run: node scripts/verify-wrong-answer-diagnosis.mjs
//
// ---- WHERE THIS CAME FROM (Aug 18, 2026) ----
//
// The parent, after a framework audit she had not asked for a grade on:
// **"I'm not wanting to stop using the app. I want the app to be at its best
// to my son's learning."**
//
// So the audit was re-run against that question instead, and one number came
// out of it that is about him and not about architecture:
//
//     aerospace     600 of 600 questions diagnose the wrong answer
//     technology    472 of 472
//     robotics      110 of 110
//     socialStudies 336 of 404
//     math           70 of 466   <--
//     reading         0 of 236   <--
//     science         0 of 156   <--
//
// (The first count of that table was wrong and said math had 19 of 466. It
// only looked at `choiceFeedback`, and 421 of math's 466 questions are typed
// `numeric` — they carry `commonMistakes`, a map from the wrong number he
// actually typed to what that number means. That is the same contract done
// better, and counting one field while two exist under-reported his math by
// 51 questions. Both mechanisms are counted below.)
//
// **The three subjects he does every single day are the three without it.**
// The rotating-block subjects — the ones he does twice a week — have it
// everywhere. Pick a wrong answer in Aerospace and the app tells him what
// thinking led there. Pick a wrong answer in Math and it restates the right
// method at him, which is the one thing a boy who just got it wrong already
// knows he did not follow.
//
// ---- WHAT A DIAGNOSIS IS, AND WHAT DOES NOT COUNT ----
//
// A distractor is not filler. It is a hypothesis about a mistake, and its
// feedback names that mistake back to him:
//
//     "It looks like you compared the numerators (3 and 5) directly without
//      converting to a shared denominator first. 3/4 actually equals 6/8."
//
// Three things are checked, because the first one alone is easy to satisfy
// without doing the work:
//
//   1. every wrong choice has its own feedback
//   2. no two wrong choices share the same string  — one line pasted four
//      times passes a presence check and teaches nothing
//   3. the feedback is not a copy of the explanation — restating the method
//      is what this whole exercise is replacing
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { allLessons } = await import(REPO + '/src/academies/lamar/data/lessons/index.js');

let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log(`PASS  ${label}`); }
  else { failures.push(label); console.log(`FAIL  ${label}${detail ? '  ' + detail : ''}`); }
}

const norm = (s) => String(s || '').trim().toLowerCase().replace(/\s+/g, ' ');

/**
 * SUBJECTS UNDER THE RULE.
 *
 * Listed explicitly rather than "all of them", so that finishing a subject is
 * a line in this file — a decision someone made — instead of a threshold that
 * drifts up and down with the question count.
 */
const REQUIRED_SUBJECTS = ['aerospace', 'technology', 'robotics', 'science', 'reading', 'socialStudies'];

/**
 * THE RATCHET.
 *
 * The subjects still being authored get a number instead of a pass/fail, and
 * the number may only go down. A count that can only fall is the difference
 * between work in progress and work that quietly stopped — and it means a
 * half-finished subject never has to be a red line in a suite that is
 * otherwise green, which is how red lines start getting ignored.
 *
 * Lower these as batches land. Never raise one.
 */
const CEILINGS = { socialStudies: 0, math: 396, reading: 0, science: 0 };

const stats = {};
const offenders = { missing: [], duplicate: [], echo: [] };

for (const lesson of allLessons) {
  const subject = lesson.subject || 'unknown';
  const s = (stats[subject] = stats[subject] || { total: 0, full: 0 });
  for (const q of lesson.questions || []) {
    const where = `${lesson.id}/${q.id}`;

    /**
     * A TYPED ANSWER IS DIAGNOSED BY THE NUMBER HE TYPED.
     *
     * `numeric` questions have no distractors to attach feedback to — he types
     * "3/5" and the app has to recognise that particular wrong answer. That is
     * what `commonMistakes` is: a map from the specific wrong value to what
     * thinking produces it. Same contract, better mechanism, and it must be
     * counted or 421 of his math questions read as undiagnosed when 51 of them
     * are not.
     */
    if (q.type === 'numeric') {
      s.total += 1;
      const cm = q.commonMistakes && typeof q.commonMistakes === 'object' ? q.commonMistakes : null;
      const entries = cm ? Object.entries(cm).filter(([, v]) => String(v || '').trim()) : [];
      if (entries.length === 0) { offenders.missing.push(where); continue; }
      const texts = entries.map(([, v]) => norm(v));
      if (new Set(texts).size !== texts.length) { offenders.duplicate.push(where); continue; }
      if (texts.some((t) => t === norm(q.explanation))) { offenders.echo.push(where); continue; }
      s.full += 1;
      continue;
    }

    const choices = q.choices || [];
    if (choices.length < 2 || typeof q.answer !== 'number') continue;
    s.total += 1;

    const fb = Array.isArray(q.choiceFeedback) ? q.choiceFeedback : [];
    const wrong = choices.map((_, i) => i).filter((i) => i !== q.answer);
    const given = wrong.filter((i) => fb[i] && String(fb[i]).trim().length > 0);

    if (given.length < wrong.length) { offenders.missing.push(where); continue; }

    const texts = given.map((i) => norm(fb[i]));
    if (new Set(texts).size !== texts.length) { offenders.duplicate.push(where); continue; }
    if (texts.some((t) => t === norm(q.explanation))) { offenders.echo.push(where); continue; }

    s.full += 1;
  }
}

console.log('\n--- 1. coverage by subject ---');
for (const [subject, s] of Object.entries(stats).sort((a, b) => b[1].total - a[1].total)) {
  const pct = s.total ? Math.round((s.full / s.total) * 100) : 100;
  console.log(`      ${String(s.full).padStart(4)} of ${String(s.total).padStart(4)}  ${String(pct).padStart(3)}%  ${subject}`);
}

console.log('\n--- 2. the subjects that are finished stay finished ---');
for (const subject of REQUIRED_SUBJECTS) {
  const s = stats[subject];
  ok(`${subject}: every wrong answer is diagnosed`,
    Boolean(s) && s.full === s.total,
    s ? `${s.total - s.full} question(s) short` : 'subject not found');
}

console.log('\n--- 3. no shortcut passes as a diagnosis ---');
ok('no question pastes the same feedback under two different wrong answers',
  offenders.duplicate.length === 0,
  offenders.duplicate.slice(0, 5).join(', '));
ok('no feedback is just the explanation repeated',
  offenders.echo.length === 0,
  offenders.echo.slice(0, 5).join(', '));

console.log('\n--- 4. the subjects still being authored: the count only moves down ---');
for (const [subject, ceiling] of Object.entries(CEILINGS)) {
  const s = stats[subject] || { total: 0, full: 0 };
  const left = s.total - s.full;
  ok(`${subject}: ${left} left to diagnose`, left <= ceiling,
    `ceiling is ${ceiling} — raising it is not a fix`);
}

const remaining = offenders.missing.length;
const total = Object.values(stats).reduce((n, s) => n + s.total, 0);
const done = Object.values(stats).reduce((n, s) => n + s.full, 0);
console.log(`\n      ${done} of ${total} questions diagnosed · ${remaining} to go`);
ok('the whole-curriculum count only ever moves down', remaining <= 856,
  `was 856 on Aug 18 2026; now ${remaining}`);

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
