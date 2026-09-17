// ---------------------------------------------------------------------------
// verify-social-studies-pace — Sept 16, 2026. SCHOOL scope (lamar).
//
// The parent: "Lamar is behind in his social studies. The one x per week isn't
// enough. In each unit may have up to 11 lessons with multiple videos in each
// lesson." Counted live: the World History course is 82 Khan lessons. She chose
// three sessions a week (Tue 10:30, Thu 10:30, plus the 2:15 block) and the
// units spread across Q1-Q4 in course order.
//
// Properties kept:
//   1. every World History unit carries its measured lesson count
//   2. pacing costs a unit by its lessons, not a flat figure
//   3. units stay in Khan's course order across the quarters
//   4. a COMPLETED unit never moves quarter (its report card already counted it)
//   5. no quarter's Social Studies is 'over' — the open Fridays cover any gap
//   6. Social Studies owns three sessions a week
// ---------------------------------------------------------------------------
import './lib/academy-under-test.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const moduleUrl = (rel) => pathToFileURL(path.join(REPO, rel)).href;
const P = await import(moduleUrl('src/lib/pacing.js'));
const { QUARTER_SPANS } = await import(moduleUrl('src/lib/yearPlan.js'));
const { liveMorningSubject, liveRotatingSubjects } = await import(moduleUrl('src/lib/rotatingBlock.js'));

let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
}

const src = fs.readFileSync(path.join(REPO, 'src/store/useAppStore.js'), 'utf8');
const at = src.indexOf('const socialStudiesUnitPlan = {');
ok('the unit plan exists in the store', at > 0);
const body = src.slice(at + 'const socialStudiesUnitPlan = '.length, src.indexOf('\n    };', at) + 6);
// eslint-disable-next-line no-eval
const plan = eval('(' + body + ')');
const units = Object.entries(plan).sort((a, b) => a[1].sequenceInQuarter - b[1].sequenceInQuarter);
const order = QUARTER_SPANS.map((q) => q.batchLabel);

console.log('\n--- 1-3. counts and order ---');
ok('all ten World History entries are planned', units.length === 10, String(units.length));
ok('every unit carries a measured lesson count', units.every(([, u]) => Number.isInteger(u.lessons) && u.lessons > 0));
ok('the course totals 82 lessons', units.reduce((n, [, u]) => n + u.lessons, 0) === 82,
  String(units.reduce((n, [, u]) => n + u.lessons, 0)));
ok('pacing costs a unit by its lessons', P.khanUnitDays({ subject: 'socialStudies', lessons: 15 }) === 15);
const qIdx = units.map(([, u]) => order.indexOf(u.batchLabel));
ok('every planned quarter is a real quarter', qIdx.every((i) => i >= 0), JSON.stringify(qIdx));
ok('units stay in course order across quarters', qIdx.every((v, i) => i === 0 || v >= qIdx[i - 1]), JSON.stringify(qIdx));
ok('the course challenge comes last', units[units.length - 1][0].includes('Course Challenge'));

console.log('\n--- 4. completed work never moves ---');
ok('the relocation keeps a completed row’s quarter',
  /const batchLabel = a\.completed \? a\.batchLabel : target\.batchLabel;/.test(src));

console.log('\n--- 5. every quarter fits, with the Friday buffer ---');
const rows = units.map(([title, u], i) => ({ id: i, subject: 'socialStudies', skillTitle: title, ...u, completed: false }));
for (const q of QUARTER_SPANS.slice(0, 4)) {
  const r = P.quarterPacing(q, rows).rows.find((x) => x.subject === 'socialStudies');
  ok(`${q.batchLabel}: Social Studies is not over`, r && r.state !== 'over', JSON.stringify(r));
}

console.log('\n--- 6. three sessions a week ---');
{
  const probe = [{ subject: 'socialStudies', batchLabel: 'Q2 2026-2027' }, { subject: 'aerospace', batchLabel: 'Q2 2026-2027' }];
  let n = 0;
  for (let i = 0; i < 5; i++) {
    const d = new Date(2026, 10, 9 + i); // Mon Nov 9 .. Fri Nov 13, 2026
    if (liveMorningSubject(d, probe) === 'socialStudies') n++;
    if (liveRotatingSubjects(d, probe).includes('socialStudies')) n++;
  }
  ok('a Q2 week gives Social Studies three sessions', n === 3, String(n));
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) { console.log(`\n${failures.length} CHECK(S) FAILED`); process.exit(1); }
console.log('\nALL CHECKS PASSED');
