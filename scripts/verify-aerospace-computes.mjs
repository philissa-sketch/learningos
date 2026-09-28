import './lib/academy-under-test.mjs';
import { allLessons } from '../src/academies/lamar/data/lessons/index.js';
import { isAnswerCorrect, isAutoGradable } from '../src/engine/lessonScoring.js';

/**
 * =============================================================================
 * THE AEROSPACE TRACK ASKS HIM TO CALCULATE, NOT ONLY TO RECOGNISE.
 * =============================================================================
 *
 * WHY THIS EXISTS. (Sept 28, 2026.)
 *
 * A review of the school against the child's stated career found the aerospace
 * lessons to be real instruction — they name mass ratio, specific impulse in
 * seconds, lift coefficient, and they correct the popular half-truth about
 * Bernoulli. And then every single one of their 600 questions was multiple
 * choice. Not one asked him to work anything out.
 *
 * He would finish the year able to EXPLAIN specific impulse without ever having
 * USED it. Engineering is computation; that gap is the whole distance between a
 * boy who knows about rockets and a boy becoming an engineer.
 *
 * It is also the best available answer to "why do I have to do the maths",
 * which matters more than it sounds for a student whose maths plan is four
 * grade levels in one year.
 *
 * What is held here:
 *
 *   1. Every Q1 aerospace lesson makes him calculate.
 *   2. Every calculation grades its own answer as correct. A question that
 *      marks a right answer wrong is worse than no question.
 *   3. No wrong-answer note is itself a correct answer.
 *   4. Every calculation explains the working, not just the result.
 *   5. The maths stays inside what he can actually do this year.
 *   6. A comma-formatted number is still right.
 */

let passed = 0;
const failures = [];
const ok = (label, cond, detail = '') => {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
};

const Q1 = allLessons.filter((l) => l.subject === 'aerospace' && l.quarter === 'Q1 2026-2027');

console.log('\n--- 1. every lesson makes him calculate ---');
ok('the sweep found the quarter', Q1.length >= 10, `${Q1.length} rows`);
const MIN_PER_LESSON = 2;
for (const l of Q1) {
  const numeric = (l.questions || []).filter((q) => q.type === 'numeric');
  ok(`${l.id} asks him to work something out`, numeric.length >= MIN_PER_LESSON,
    `${numeric.length} of ${MIN_PER_LESSON} — recognising the word is not using the idea`);
}
const allNumeric = Q1.flatMap((l) => (l.questions || []).filter((q) => q.type === 'numeric'));
ok('the quarter is no longer recall-only', allNumeric.length >= 20, `${allNumeric.length} calculations`);
const exam = Q1.find((l) => /exam/i.test(l.id));
ok('the quarter exam tests it too', !!exam && (exam.questions || []).some((q) => q.type === 'numeric'),
  'a quarter that teaches calculation and then tests only recall grades the wrong thing');

console.log('\n--- 2. every calculation grades its own answer right ---');
const selfWrong = allNumeric.filter((q) => !isAnswerCorrect(q, q.answer));
ok('no question marks its own answer wrong', selfWrong.length === 0,
  selfWrong.map((q) => q.id).join(', '));
ok('every calculation is auto-gradable', allNumeric.every(isAutoGradable));
ok('every calculation has a non-empty answer',
  allNumeric.every((q) => String(q.answer ?? '').trim().length > 0));

console.log('\n--- 3. no wrong-answer note is secretly a right answer ---');
const clashes = [];
for (const q of allNumeric) {
  for (const key of Object.keys(q.commonMistakes || {})) {
    if (isAnswerCorrect(q, key)) clashes.push(`${q.id}:${key}`);
  }
}
ok('no distractor also grades correct', clashes.length === 0, clashes.join(', '));

console.log('\n--- 4. the working is explained, not just the result ---');
const thin = allNumeric.filter((q) => !q.explanation || q.explanation.length < 60);
ok('every calculation explains how to get there', thin.length === 0, thin.map((q) => q.id).join(', '));
const noHelp = allNumeric.filter((q) => Object.keys(q.commonMistakes || {}).length < 2);
ok('every calculation names at least two ways to get it wrong', noHelp.length === 0,
  noHelp.map((q) => q.id).join(', ') + '  <- a wrong answer with no diagnosis teaches nothing');

console.log('\n--- 5. the maths stays inside what he can do this year ---');
/**
 * His maths plan reaches 8th grade by next summer and is on 5th this quarter.
 * An aerospace question that needs algebra would be unanswerable and would
 * teach him the subject is out of reach — the opposite of the point.
 */
const notPlain = allNumeric.filter((q) => !/^-?[\d.,/]+$/.test(String(q.answer).trim()));
ok('every answer is a plain number he can write down', notPlain.length === 0,
  notPlain.map((q) => `${q.id}=${q.answer}`).join(', ') + '  <- an algebraic answer is out of reach this year');
/**
 * Two of the best questions in the quarter state their quantity in words —
 * "doubles its speed", "triples its speed" — because the square law is the
 * point and a bare figure would hide it. The first version of this check
 * counted digits only and failed both. The property is that a prompt gives him
 * something definite to work from, not that it spells it with numerals.
 */
const SCALE_WORD = /\b(doubl|tripl|quadrupl|halve|half|twice|three times)/i;
const vague = allNumeric.filter(
  (q) => (String(q.prompt).match(/\d/g) || []).length < 2 && !SCALE_WORD.test(String(q.prompt))
);
ok('every prompt gives him something definite to work from', vague.length === 0,
  vague.map((q) => q.id).join(', ') + '  <- a calculation with nothing to calculate from is a guess');

console.log('\n--- 6. a comma-formatted number is still right ---');
const big = allNumeric.filter((q) => /^\d{4,}$/.test(String(q.answer).trim()));
ok('there are four-digit answers to worry about', big.length > 0, `${big.length}`);
ok('writing 24,000 the way every book writes it is accepted',
  big.every((q) => isAnswerCorrect(q, Number(q.answer).toLocaleString('en-US'))),
  'being marked wrong for punctuation is the kind of thing that makes a child stop trusting the app');

console.log('\n--- 7. the arithmetic is right, checked independently ---');
/**
 * ---- THE HOLE A MUTATION RUN FOUND. (Sept 28, 2026.) ----
 *
 * Everything above this point checks a question against ITSELF: does it grade
 * its own answer, do its distractors clash, is the explanation long enough.
 * All of that passes happily when the answer is simply WRONG. Changing 120 to
 * 121 in a wing-area question survived every check in sections 1 to 6.
 *
 * A maths question with a wrong answer is worse than no question. It marks a
 * correct child incorrect, and once that has happened twice he stops believing
 * the app — which is the one thing this whole track depends on.
 *
 * So each answer is recomputed here from the numbers its own prompt states.
 * The duplication is deliberate and is the entire value: this is a SECOND,
 * independent calculation, and it disagreeing with the file is the signal.
 * Every numeric question must appear in this table, so adding one without
 * checking its arithmetic fails rather than passing silently.
 */
const ARITHMETIC = {
  'ae7-history-of-flight': [120 / 12, Math.round(852 / 59)],
  'ae7-history-of-flight-2': [Math.round((852 / 120) * 10) / 10, Math.round((59 / 12) * 10) / 10],
  'ae7-how-airplanes-fly': [2400, 300],
  'ae7-how-airplanes-fly-2': [2100 - 1800, 5000 - 4200],
  'ae7-lift': [4 * 30, 180 / 120],
  'ae7-lift-2': [2 * 2, 1000 * (2 * 2)],
  'ae7-drag': [250 + 400, 8 / 1],
  'ae7-drag-2': [200 * (2 * 2), 60000 / 2000],
  'ae7-thrust': [12000 * 2, 15000 / 30000],
  'ae7-thrust-2': [Math.round((32000 / 25000) * 100) / 100, 900000],
  'exam-aerospace-q1-2026-2027': [400, 3 * 3]
};

const wrong = [];
const unchecked = [];
for (const lesson of Q1) {
  const numeric = (lesson.questions || []).filter((q) => q.type === 'numeric');
  const expected = ARITHMETIC[lesson.id];
  if (!expected) { if (numeric.length) unchecked.push(lesson.id); continue; }
  numeric.forEach((q, i) => {
    if (i >= expected.length) { unchecked.push(`${lesson.id}/${q.id}`); return; }
    const stated = Number(String(q.answer).replace(/,/g, ''));
    if (Math.abs(stated - expected[i]) > 1e-9) {
      wrong.push(`${lesson.id}/${q.id}: file says ${q.answer}, arithmetic says ${expected[i]}`);
    }
  });
}
ok('every answer survives an independent recalculation', wrong.length === 0, wrong.join(' | '));
ok('no calculation escapes the recheck', unchecked.length === 0,
  unchecked.join(', ') + '  <- a new question must have its arithmetic checked here too');
ok('the recheck actually covered the quarter',
  Object.values(ARITHMETIC).flat().length === allNumeric.length,
  `${Object.values(ARITHMETIC).flat().length} checked vs ${allNumeric.length} present`);

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) { console.log(`\n${failures.length} CHECK(S) FAILED`); process.exit(1); }
console.log('\nALL CHECKS PASSED');
