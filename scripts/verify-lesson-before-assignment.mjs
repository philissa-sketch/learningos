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
// ---- THE PACE IS TAKEN FROM THE SCHEDULE, NOT ASSUMED ----
//
// `schoolQuarter.js` states ~12 lessons per quarter, but says in its own words
// that this is the Khan Academy pace — and Aerospace and Technology are
// ACTIVE_SUBJECTS, taught by Mission Control on its own timetable. So the rate
// here is read from WEEK_PATTERN: the number of days a week that subject
// actually meets. Aerospace runs Monday and Wednesday, Technology Tuesday and
// Thursday — two sessions each.
//
// ONE LESSON PER SESSION is deliberately the most optimistic rate a learner
// could manage. If a lesson really takes two sittings, every date here is
// earlier than the truth. That direction is chosen on purpose: this check can
// fail to flag something late, and can never flag something that is fine.
// A guard that cries wolf gets switched off.
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
const { daysForSubject } = await import(REPO + '/src/academies/lamar/data/schedule/weekPattern.js');
const { SCHOOL_YEAR_START_DATE } = await import(REPO + '/src/lib/schoolQuarter.js');

// Real breaks, from assignmentRecommendations.js's own list.
const EXCLUDED_RANGES = [
  ['2026-11-23', '2026-11-27'],
  ['2026-12-19', '2027-01-04'],
  ['2027-05-23', '2027-05-31']
];
const pad = (n) => String(n).padStart(2, '0');
const toStr = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const excluded = (s) => EXCLUDED_RANGES.some(([f, t]) => s >= f && s <= t);
const DAY = { Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6 };

/** Every lesson list this Academy teaches, in the order it teaches them. */
const lessonPosition = new Map();
for (const file of ['aerospace7', 'technology7', 'science7', 'robotics7', 'socialStudies7', 'reading7', 'writing7', 'math7']) {
  try {
    const mod = await import(`${REPO}/src/academies/lamar/data/lessons/${file}.js`);
    const arr = Object.values(mod).find((v) => Array.isArray(v) && v[0] && v[0].id);
    if (arr) arr.forEach((l, i) => lessonPosition.set(l.id, { file, index: i + 1, total: arr.length }));
  } catch { /* a subject with no lesson file is not an error here */ }
}

/**
 * The earliest date the Nth lesson of a subject can be reached, counting only
 * the days that subject actually meets and skipping the real school breaks.
 */
function reachableOn(subject, n) {
  const meets = new Set((daysForSubject(subject) || []).map((d) => DAY[d]));
  if (!meets.size) return null;
  const cursor = new Date(SCHOOL_YEAR_START_DATE);
  let taught = 0;
  for (let guard = 0; guard < 1000; guard += 1) {
    const day = toStr(cursor);
    if (meets.has(cursor.getDay()) && !excluded(day)) {
      taught += 1;
      if (taught >= n) return day;
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return null; // not reachable inside the school year at all
}

const rows = [];
for (const [subject, quarters] of Object.entries(quarterlyAcademicPlaceholders)) {
  for (const list of Object.values(quarters)) {
    for (const a of list) if (a.slotId) rows.push({ ...a, subject });
  }
}

console.log('\n--- 1. every declared dependency resolves ---');
const withLesson = rows.filter((r) => r.needsLesson);
ok('at least one assignment declares the lesson it needs',
  withLesson.length > 0,
  'nothing carries needsLesson — the link is gone and this check measures nothing');

const unknown = withLesson.filter((r) => !lessonPosition.has(r.needsLesson));
ok('...and every one names a lesson that exists',
  unknown.length === 0,
  unknown.map((r) => `${r.slotId} -> ${r.needsLesson}`).join(', '));

const noPace = withLesson.filter((r) => !(daysForSubject(r.subject) || []).length);
ok('...in a subject the timetable actually teaches',
  noPace.length === 0,
  noPace.map((r) => `${r.slotId} (${r.subject})`).join(', ') + ' — no scheduled days, so nothing paces it');

console.log('\n--- 2. the lesson comes first ---');
const late = [];
const unreachable = [];
for (const r of withLesson) {
  const pos = lessonPosition.get(r.needsLesson);
  if (!pos || !r.dueDate) continue;
  const reach = reachableOn(r.subject, pos.index);
  if (!reach) {
    unreachable.push(`${r.slotId}: ${r.needsLesson} is #${pos.index} of ${pos.total} — not reachable in the school year at ${(daysForSubject(r.subject) || []).length}/week`);
    continue;
  }
  if (r.dueDate < reach) {
    late.push(`${r.slotId} due ${r.dueDate}, but ${r.needsLesson} (#${pos.index} of ${pos.total}) is not reachable until ${reach}`);
  }
}

ok('no assignment is due before its own lesson',
  late.length === 0,
  late.join('; '));

ok('...and no assignment depends on a lesson the year never reaches',
  unreachable.length === 0,
  unreachable.join('; ') + ' — move the assignment, or the lesson');

console.log('\n--- 3. what each dependency resolves to ---');
for (const r of withLesson.sort((a, b) => String(a.dueDate).localeCompare(String(b.dueDate)))) {
  const pos = lessonPosition.get(r.needsLesson);
  const reach = pos ? reachableOn(r.subject, pos.index) : null;
  const slack = reach && r.dueDate ? Math.round((new Date(r.dueDate) - new Date(reach)) / 86400000) : null;
  console.log(`      ${String(r.dueDate).padEnd(12)} ${r.subject.padEnd(12)} ${String(r.needsLesson).padEnd(34)} #${pos?.index}/${pos?.total}  reachable ${reach}  (+${slack}d)`);
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
