// ---------------------------------------------------------------------------
// KHAN'S FRACTION, TYPED STRAIGHT IN. Run: node scripts/verify-grade-entry.mjs
//
// The parent, Aug 10 2026: "the grades for Kahn Academy are in fractions not
// percentage. So is there a way that i put the fractions in and the app creates
// the percentage and letter grade?"
//
// Khan reports a unit test as 9/11, 8/10, 4/6 -- and the denominator changes
// between units. The grade box only took a percentage, so every score she
// entered began with mental arithmetic she had to get right. 9/11 is 82%. It is
// not 90%. That is a whole letter grade, on a record she keeps for years.
//
// These checks are about the ARITHMETIC being right and the record being
// checkable, which are the two things a homeschool transcript rests on.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { parseScore, parsePercent, percentToLetter, GRADE_SCALE } from '../src/lib/gradeScale.js';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
}
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');

console.log('\n--- 1. the four scores on her screenshot ---');
{
  // Read straight off Khan's progress page, Aug 7 2026.
  const HERS = [
    { typed: '9/11', percent: 82, unit: 'Decimal place value' },
    { typed: '8/10', percent: 80, unit: 'Cells and organisms' },
    { typed: '8/10', percent: 80, unit: 'Parts of speech: the noun' }
  ];
  for (const h of HERS) {
    const s = parseScore(h.typed);
    ok(`${h.unit}: ${h.typed} is ${h.percent}%`, s !== null && s.percent === h.percent,
      s ? `got ${s.percent}` : 'unparseable');
  }
  ok('9/11 does NOT land on an A', percentToLetter('9/11') !== 'A' && percentToLetter('9/11') !== 'A-',
    `got ${percentToLetter('9/11')} — the mental-arithmetic trap this removes`);
}

console.log('\n--- 2. it still takes a percentage, exactly as before ---');
{
  ok("'82' is 82", parsePercent('82') === 82);
  ok("'82%' is 82", parsePercent('82%') === 82);
  ok("' 82.4 ' rounds to 82", parsePercent(' 82.4 ') === 82);
  ok('a bare number still works', parsePercent(92) === 92);
  ok('a stored value round-trips', parsePercent(parsePercent('9/11')) === 82);
}

console.log('\n--- 3. it refuses a score it cannot trust ---');
{
  const bad = ['', 'abc', '12/10', '5/0', '1/2/3', '-5', '120', '/', '9/', '/11'];
  const wrongly = bad.filter((b) => parseScore(b) !== null);
  ok('every unusable entry is rejected rather than guessed at', wrongly.length === 0, wrongly.join(', '));
  ok('more correct than there were questions is a typo, not 120%', parseScore('12/10') === null);
  ok('a zero denominator does not divide by zero', parseScore('5/0') === null);
  ok('nothing out of range is silently clamped to 100',
    parsePercent(120) === null && parsePercent(-5) === null,
    'clamping would record a grade she did not mean');
}

console.log('\n--- 4. the arithmetic, exhaustively ---');
{
  // Every fraction a Khan unit test can realistically produce.
  let wrong = 0;
  let mismatchedLetter = 0;
  for (let total = 1; total <= 40; total++) {
    for (let correct = 0; correct <= total; correct++) {
      const s = parseScore(`${correct}/${total}`);
      if (!s) { wrong += 1; continue; }
      if (s.percent !== Math.round((correct / total) * 100)) wrong += 1;
      if (s.percent < 0 || s.percent > 100) wrong += 1;
      // The letter must come from the same scale as a typed percentage.
      if (percentToLetter(`${correct}/${total}`) !== percentToLetter(s.percent)) mismatchedLetter += 1;
    }
  }
  ok('every fraction up to 40 questions converts correctly', wrong === 0, `${wrong} wrong`);
  ok('a fraction and its percentage always get the same letter', mismatchedLetter === 0);
  ok('0 out of anything is an F', percentToLetter('0/10') === 'F');
  ok('full marks is the top band', percentToLetter('11/11') === GRADE_SCALE[0].letter);
}

console.log('\n--- 5. the fraction is kept, not just the percentage ---');
{
  const s = parseScore('9/11');
  ok('the raw fraction survives parsing', s.raw === '9/11');
  ok('and so do both numbers', s.correct === 9 && s.total === 11);
  ok('spaces around the slash are tolerated', parseScore('9 / 11').raw === '9/11');
  ok('a typed percentage has no fraction to keep', parseScore('82').raw === null);

  const store = read('src/store/useAppStore.js');
  ok('the store writes gradeRaw beside gradePercent', /gradeRaw, grade, completed: true/.test(store));
  ok('clearing a grade clears the fraction too', /gradePercent: null, gradeRaw: null/.test(store));
  ok('the two-computer merge carries gradeRaw', /gradeRaw: row\.gradeRaw/.test(store),
    'a grade arriving as 82% with the 9/11 lost can no longer be checked against Khan');
  // Comment lines stripped first, so the guard does not trip over the note
  // that documents the bug it is checking for -- the same trap
  // verify-word-study.mjs hit when it grepped for Math.random().
  const storeCode = store
    .split('\n')
    .filter((line) => !/^\s*(\*|\/\/|\/\*)/.test(line))
    .join('\n');
  ok('the store no longer parses percentages a second way',
    !/Math\.round\(Number\(String\(percent\)/.test(storeCode),
    'that line would have produced NaN the moment a fraction reached it');
  ok('the store uses the one shared parser', /const gradePercent = parsePercent\(percent\)/.test(store));
}

console.log('\n--- 6. the box says what it takes, in both places ---');
{
  const controls = read('src/components/Dashboard/GradeControls.jsx');
  ok('the input parses with parseScore', /parseScore\(draft\)/.test(controls));
  ok('the placeholder shows the fraction form', /placeholder="9\/11"/.test(controls));
  ok('the computed percentage is shown live', /isFraction && parsed !== null/.test(controls));
  ok('the error text names both accepted forms', /9\/11 or 82/.test(controls));
  ok('the commit hands the fraction on', /onCommit\(parsed, score \? score\.raw : null\)/.test(controls));
  ok('a graded row re-opens showing the fraction she typed', /const initial = raw \|\|/.test(controls));

  for (const file of ['src/components/Dashboard/MissionControlBoard.jsx', 'src/components/Dashboard/ParentDashboard.jsx']) {
    const src = read(file);
    const name = file.split('/').pop();
    ok(`${name} passes the stored fraction back in`, /raw=\{/.test(src));
    ok(`${name} passes it on to the store`, /raw\)/.test(src));
  }
}


console.log('\n--- finished work is never invisible, and never in the wrong list ---');
{
  /**
   * ---- TWO CORRECTIONS, ONE DAY APART ----
   *
   * Aug 18. She imported his export: "there is issues regarding what was
   * turned in and what was graded and what needs to be graded." One unit —
   * "Themes, figures of speech, and comparing texts", seeded Q2, marked
   * finished Aug 6 which is week 1 of Q1 — was completed, ungraded, and on no
   * screen. The queue filtered `batchLabel === quarter`; the Khan screen's
   * quarter chip defaults to the current quarter. So the queue was made
   * quarter-agnostic.
   *
   * Aug 20, looking at the result: **"Q2 work shouldn't be in ready to
   * grade."**
   *
   * Also right, and the first fix had walked past why. A Q2 unit finished in
   * Q1 week 1 is not a grading task — grading it puts a Q2 score on a Q1 week.
   * It is a question about what happened. So:
   *
   *   the grading queue  -> this quarter's finished work (a daily list)
   *   the watch panel    -> finished work from any other quarter (a judgement)
   *
   * The property both versions must hold, and the only one worth guarding:
   * **finished, ungraded work appears somewhere.** Which list it belongs in is
   * a product decision that changed; being invisible was the defect.
   */
  const board = read('src/components/Dashboard/MissionControlBoard.jsx');
  const codeOnly = (t) => t.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\{\/\*[\s\S]*?\*\/\}/g, '').replace(/^\s*\/\/.*$/gm, '');
  const code = codeOnly(board);

  ok('every finished, ungraded unit is collected before anything is filtered',
    /const finishedUngraded = khanAcademyAssignments\s*\n?\s*\.filter\(\(a\) => a\.completed && !a\.grade/.test(code),
    'one source, then two destinations — so nothing can fall between them');
  ok('...this quarter goes to the grading queue',
    /const khanUngraded = finishedUngraded\.filter\(\(a\) => a\.batchLabel === quarter\)/.test(code));
  ok('...every other quarter goes to the watch panel',
    /const ungradedOtherQuarter = finishedUngraded\.filter\(\(a\) => a\.batchLabel !== quarter\)/.test(code),
    'the two filters are complements, so no row belongs to neither');
  ok('...and the watch item names the unit, its quarter and when it was ticked',
    /Finished units from another quarter, still ungraded/.test(board)
      && /a\.batchLabel\}, marked done/.test(board));
  ok('...framed as a decision, not a score to enter',
    /he worked ahead, or the wrong row got ticked/.test(board));
  ok('the queue is sorted oldest first, so the longest wait is on top',
    /completedAt \|\| ''\)\.localeCompare/.test(code));

  const dash = read('src/components/Dashboard/ParentDashboard.jsx');
  ok('the Khan screen still counts ungraded work its own filter is hiding',
    /const hiddenUngraded = gradeable\.filter/.test(dash));
  ok('...counted against the whole record, not the filtered view',
    /quarterFilter !== 'all' && a\.batchLabel !== quarterFilter/.test(dash),
    'a count computed inside the filter can only ever report zero');
  ok('...and offers one tap to show them',
    /setQuarterFilter\('all'\); setGradeFilter\('ungraded'\)/.test(dash));
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
