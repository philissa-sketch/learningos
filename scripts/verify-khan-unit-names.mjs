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
import { fileURLToPath, pathToFileURL } from 'node:url';
import { academyUnderTest } from './lib/academy-under-test.mjs';

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

// The 132 seeded Khan rows moved into this Academy's own folder on Sept 20,
// 2026 (GENERIC_CARRYOVER fault 2). The seeding PASS is still the platform's
// and is still what the rest of this file guards; the rows are asked for
// rather than scraped out of the store.
//
// Read as DATA, not by regex over source. The old version matched three
// fields on one line and would have gone quiet the moment a row was
// reformatted onto two — reporting "0 found" as if the curriculum had
// vanished, which is exactly what it did when the rows moved.
const store = fs.readFileSync(path.join(REPO, 'src/store/useAppStore.js'), 'utf8');
const batches = (await import(
  pathToFileURL(path.join(REPO, `src/academies/${academyUnderTest}/data/khanSeed/khanSeedBatches.js`)).href
)).KHAN_SEED_BATCHES;
const rows = (batches.mathQ1Rows || []).map((r) => ({
  title: r.skillTitle,
  url: r.khanAcademyUrl,
  seq: r.sequenceInQuarter
}));

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
  // Split on Sept 20, 2026: the Map is built in the store, its ENTRIES come
  // from this school. Assert both — a pass with no entries and entries nothing
  // applies each fail silently in their own way.
  const retitles = (await import(
    pathToFileURL(path.join(REPO, `src/academies/${academyUnderTest}/data/khanSeed/khanSeedBatches.js`)).href
  )).KHAN_RETITLES;
  ok('a correction map exists for existing rows',
    /const MATH_Q1_CORRECTIONS = new Map\(khanRetitleEntries\(\)\)/.test(store)
      && Array.isArray(retitles) && retitles.length > 0,
    'the pass is the platform\'s and the titles are the school\'s');
  const map = JSON.stringify(retitles);
  for (const wrong of ['Add and Subtract Decimals', 'Add fractions with unlike denominators', 'Volume of cubes and rectangular prisms: word problems']) {
    ok(`"${wrong.slice(0, 34)}…" is corrected`, map.includes(wrong));
  }
  ok('it is keyed on the WRONG title, so a rename of hers is left alone',
    /MATH_Q1_CORRECTIONS\.get\(a\.skillTitle\)/.test(store));
  ok('...and the correction is written to disk',
    /mathRetitled\.map\(\(r\) => updateKhanAcademyAssignmentRecord\(r\.id, r\)\)/.test(store));
  // Read from the parsed entries, not from their source text. The old version
  // matched `skillTitle: 'X'` as a STRING, which stopped meaning anything the
  // moment the entries became data rather than a literal in this file's view.
  const correctedTitles = retitles.map(([, fix]) => fix.skillTitle);
  ok('every corrected title matches what the seed now says',
    ['Add decimals', 'Add and subtract fractions', 'Volume'].every((t) => correctedTitles.includes(t)),
    'the seed and the migration must not disagree');
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
