// ---------------------------------------------------------------------------
// THE UNIT NAMES IN THIS APP ARE KHAN'S OWN UNIT NAMES.
// Run: node scripts/verify-khan-unit-names.mjs
//
// ---- WHY (Aug 11, 2026) ----
//
// The parent: "the add fractions with unlike denominators is incorrect. He is
// at add and subtractions Unit 4."
//
// She was right, and it was not one bad title. Read against Khan's live
// 5th-grade course page, three of the sixteen Q1 maths rows were wrong:
//
//   #2  "Add and Subtract Decimals" — Khan calls it "Add decimals". The
//       invented "and Subtract" made the real Unit 3, "Subtract decimals",
//       look like a duplicate of the row above it.
//   #4  "Add fractions with unlike denominators" — Khan's Unit 4 is "Add and
//       subtract fractions", and the link pointed at ONE EXERCISE inside the
//       unit (.../e/adding_fractions) rather than the unit. The row named a
//       fraction of the work he was actually doing.
//   #11 "Volume of cubes and rectangular prisms: word problems" pointed at
//       grade-5-math-fl-best — FLORIDA'S COURSE, not the one he is enrolled
//       in — so it could never line up with anything on his screen.
//
// ---- WHY IT MATTERS MORE THAN A TYPO ----
//
// He works from Khan's list. She reads this one. The "Unit done" button marks
// whichever row the app is showing. When the two lists disagree, he finishes
// Unit 4 on Khan, taps done here, and a different unit gets ticked — which is
// exactly what happened the morning she reported this: two units appeared in
// her grading queue that Khan had no test for.
//
// So the names are not decoration, they are the join key between two systems.
// This file pins them to what Khan publishes.
//
// The list below was read off https://www.khanacademy.org/math/cc-fifth-grade-math
// on Aug 11, 2026. If Khan renumbers its course, this test SHOULD fail — that
// is the signal to go and look, not a reason to loosen the check.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
}

// Khan Academy, 5th grade math — unit number, exact title, unit URL slug.
const KHAN_5TH = [
  [1, 'Decimal place value', 'imp-place-value-and-decimals'],
  [2, 'Add decimals', 'imp-addition-and-subtraction-3'],
  [3, 'Subtract decimals', 'subtract-decimals'],
  [4, 'Add and subtract fractions', 'imp-fractions-3'],
  [5, 'Multi-digit multiplication and division', 'multi-digit-multiplication-and-division'],
  [6, 'Multiply fractions', '5th-multiply-fractions'],
  [7, 'Divide fractions', 'divide-fractions'],
  [8, 'Multiply decimals', 'imp-multiplication-and-division-3'],
  [9, 'Divide decimals', 'divide-decimals'],
  [10, 'Powers of ten', 'powers-of-ten'],
  [11, 'Volume', '5th-volume'],
  [12, 'Coordinate plane', 'imp-geometry-3'],
  [13, 'Algebraic thinking', 'imp-algebraic-thinking'],
  [14, 'Converting units of measure', 'imp-measurement-and-data-3'],
  [15, 'Line plots', 'line-plots'],
  [16, 'Properties of shapes', 'properties-of-shapes']
];

const store = fs.readFileSync(path.join(REPO, 'src/store/useAppStore.js'), 'utf8');
const block = store.slice(store.indexOf('const mathQ1Rows = ['), store.indexOf('const missingMathQ1Rows'));
const rows = [...block.matchAll(/skillTitle: '((?:[^'\\]|\\.)*)'[^\n]*?khanAcademyUrl: '([^']+)'[^\n]*?sequenceInQuarter: (\d+)/g)]
  .map((m) => ({ title: m[1].replace(/\\'/g, "'"), url: m[2], seq: Number(m[3]) }));

console.log(`\nseeded Q1 maths rows: ${rows.length}`);

console.log('\n--- 1. every unit Khan teaches is here, in Khan\'s order ---');
{
  ok('all sixteen units are seeded', rows.filter((r) => r.seq <= 16).length === 16,
    `${rows.filter((r) => r.seq <= 16).length} found`);
  for (const [num, title] of KHAN_5TH) {
    const row = rows.find((r) => r.seq === num);
    ok(`unit ${num} is "${title}"`,
      Boolean(row) && row.title.toLowerCase() === title.toLowerCase(),
      row ? `app says "${row.title}"` : 'missing');
  }
}

console.log('\n--- 2. every link opens the UNIT, in the right course ---');
{
  for (const [num, title, slug] of KHAN_5TH) {
    const row = rows.find((r) => r.seq === num);
    if (!row) continue;
    ok(`unit ${num} links to /${slug}`,
      row.url === `https://www.khanacademy.org/math/cc-fifth-grade-math/${slug}`,
      row.url);
  }
  const exercises = rows.filter((r) => /\/e\//.test(r.url));
  ok('no row links to a single exercise instead of its unit', exercises.length === 0,
    exercises.map((r) => r.title).join(', ') +
    ' — an exercise link names a fraction of the work and can never match his unit test');
  const otherCourse = rows.filter((r) => r.seq <= 16 && !r.url.includes('/cc-fifth-grade-math/'));
  ok('no row points at a different course', otherCourse.length === 0,
    otherCourse.map((r) => `${r.title} -> ${r.url}`).join('; '));
}

console.log('\n--- 3. rows already in her database get corrected too ---');
{
  // Fixing the seed alone reaches nobody — both machines have carried these
  // rows since July. Same lesson as the schedule corrections.
  ok('a correction map exists for existing rows', /const MATH_Q1_CORRECTIONS = new Map\(\[/.test(store));
  const map = store.slice(store.indexOf('const MATH_Q1_CORRECTIONS'), store.indexOf('const mathRetitled'));
  for (const wrong of ['Add and Subtract Decimals', 'Add fractions with unlike denominators', 'Volume of cubes and rectangular prisms: word problems']) {
    ok(`"${wrong.slice(0, 34)}…" is corrected`, map.includes(wrong));
  }
  ok('it is keyed on the WRONG title, so a rename of hers is left alone',
    /MATH_Q1_CORRECTIONS\.get\(a\.skillTitle\)/.test(store));
  ok('...and the correction is written to disk',
    /mathRetitled\.map\(\(r\) => updateKhanAcademyAssignmentRecord\(r\.id, r\)\)/.test(store));
  ok('every corrected title matches what the seed now says',
    ['Add decimals', 'Add and subtract fractions', 'Volume'].every((t) => map.includes(`skillTitle: '${t}'`)),
    'the seed and the migration must not disagree');
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
