// ---------------------------------------------------------------------------
// A PROJECT IS NEVER DUE BEFORE THE LESSON THAT TEACHES IT.
// Run: ACADEMY=lamar node scripts/verify-lesson-before-assignment.mjs
//
// ---- WHY THIS EXISTS (Sept 5, 2026) ----
//
// The parent, looking at Mission Control: **"Mission Control has projects due
// that he hasn't learned about."**
//
// She was right, and nothing in the app could have told her. Two of the three
// project write-ups on his board were due months before the lesson that teaches
// them, and one was due before a lesson this school year cannot reach at all:
//
//   Tinkercad Mission Nameplate   due 2026-09-11   needs tech7-cad     #20/40
//   Wind tunnel test              due 2026-09-16   needs ae7-wind-...  #43/49
//
// The dependency existed in the data the whole time — every project carries a
// `relatedLessonId` — but an ASSIGNMENT carried no link to its project. The two
// were joined only by their titles being similar, which no check can read. So
// the fact was in the repository and unreachable, and the only thing that ever
// compared them was a parent looking at a screen.
//
// Assignments now carry `needsLesson` directly. This measures it.
//
// ---- THE QUARTER IS DECLARED. DO NOT COMPUTE IT. ----
//
// The first version of this file estimated when a lesson would be reached, by
// counting the days a week that subject meets in WEEK_PATTERN and assuming one
// lesson per session. It was wrong for two of the four assignments it checked,
// and it passed them both:
//
//   ae7-rocket-design                 estimated Q1  ·  DECLARES Q2
//   ae7-wind-tunnels-flight-testing   estimated Q3  ·  DECLARES Summer 2027
//
// All 49 Aerospace lessons and all 40 Technology lessons carry a `quarter`
// field, and `verify-planner-feeds.mjs` has scheduled projects from it since
// August. The answer was in the data and a derived estimate was used instead —
// the mistake this repository's own notes name twice: **a closure walk cannot
// see a fact typed as a literal**, and **assert the property, not the address.**
//
// So the rule is now the one the data supports: an assignment may not be due in
// an EARLIER quarter than the lesson it needs. No week arithmetic, no pace
// assumption, nothing derived. If a lesson ever ships without a quarter, that
// is a failure here rather than a silent fallback to guessing.
// ---------------------------------------------------------------------------
import './lib/academy-under-test.mjs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
}

const { quarterlyAcademicPlaceholders } = await import(
  REPO + '/src/academies/lamar/data/academicSuccessCenter/placeholders.js'
);

/** Q1 < Q2 < Q3 < Q4 < Summer, the order the school year actually runs in. */
const QUARTER_ORDER = ['Q1', 'Q2', 'Q3', 'Q4', 'Summer'];
const quarterKey = (label) => String(label || '').trim().split(' ')[0];
const quarterRank = (label) => QUARTER_ORDER.indexOf(quarterKey(label));

/** Every lesson this Academy teaches, with the quarter it DECLARES. */
const lessons = new Map();
for (const file of ['aerospace7', 'technology7', 'science7', 'robotics7', 'socialStudies7', 'reading7', 'writing7', 'math7']) {
  try {
    const mod = await import(`${REPO}/src/academies/lamar/data/lessons/${file}.js`);
    const arr = Object.values(mod).find((v) => Array.isArray(v) && v[0] && v[0].id);
    if (arr) arr.forEach((l, i) => lessons.set(l.id, { file, index: i + 1, total: arr.length, quarter: l.quarter }));
  } catch { /* a subject with no lesson file is not an error here */ }
}

const rows = [];
for (const [subject, quarters] of Object.entries(quarterlyAcademicPlaceholders)) {
  for (const [quarter, list] of Object.entries(quarters)) {
    for (const a of list) if (a.slotId) rows.push({ ...a, subject, quarter });
  }
}
const withLesson = rows.filter((r) => r.needsLesson);

console.log('\n--- 1. every declared dependency resolves ---');
ok('at least one assignment declares the lesson it needs',
  withLesson.length > 0,
  'nothing carries needsLesson — the link is gone and this check measures nothing');

const unknown = withLesson.filter((r) => !lessons.has(r.needsLesson));
ok('...and every one names a lesson that exists',
  unknown.length === 0,
  unknown.map((r) => `${r.slotId} -> ${r.needsLesson}`).join(', '));

const noQuarter = withLesson.filter((r) => lessons.has(r.needsLesson) && !lessons.get(r.needsLesson).quarter);
ok('...and every needed lesson declares its quarter',
  noQuarter.length === 0,
  noQuarter.map((r) => `${r.needsLesson}`).join(', ')
    + ' — without it there is nothing to compare, and estimating one is what put two of these in the wrong quarter');

console.log('\n--- 2. the lesson comes first ---');
const early = [];
for (const r of withLesson) {
  const l = lessons.get(r.needsLesson);
  if (!l || !l.quarter) continue;
  const want = quarterRank(l.quarter);
  const got = quarterRank(r.quarter);
  if (want === -1 || got === -1) continue;
  if (got < want) {
    early.push(`${r.slotId} is filed ${quarterKey(r.quarter)} (due ${r.dueDate}), but ${r.needsLesson} is taught in ${quarterKey(l.quarter)}`);
  }
}
ok('no assignment is due in an earlier quarter than the lesson it needs',
  early.length === 0,
  early.join('; '));

console.log('\n--- 3. what each dependency resolves to ---');
for (const r of withLesson.sort((a, b) => String(a.dueDate).localeCompare(String(b.dueDate)))) {
  const l = lessons.get(r.needsLesson);
  const same = quarterKey(l?.quarter) === quarterKey(r.quarter) ? 'same quarter' : `taught ${quarterKey(l?.quarter)}`;
  console.log(`      ${String(r.dueDate).padEnd(12)} ${r.subject.padEnd(12)} ${quarterKey(r.quarter).padEnd(7)} ${String(r.needsLesson).padEnd(34)} #${l?.index}/${l?.total}  ${same}`);
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
