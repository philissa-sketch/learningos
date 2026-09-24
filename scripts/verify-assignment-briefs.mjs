// ---------------------------------------------------------------------------
// verify-assignment-briefs — Sept 24, 2026. SCHOOL scope (lamar).
//
// The parent, on the Math project: "there's no explanation of what needs to be
// done. It is very vague."
//
// Every project's `note` had been written for HER — "Applied-math project",
// "Lab-report write-up of a hands-on Science experiment" — which is why it is
// on the calendar, not what he is supposed to make.
//
// What this holds, and what it deliberately does NOT:
//   * it does not pin wording. She rewrites these; a guard that freezes her
//     text fails the first time she improves one.
//   * it holds the PROPERTIES of a brief: addressed to him, long enough to
//     say something, carrying an instruction and something countable, and
//     never one of the known parent-facing labels.
//   * a TBD topic is a brief that has not been written yet, and says so.
// ---------------------------------------------------------------------------
import './lib/academy-under-test.mjs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const load = (rel) => import(pathToFileURL(path.join(REPO, rel)).href);

let passed = 0;
const failures = [];
const ok = (label, cond, detail = '') => {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
};

const { quarterlyAcademicPlaceholders } = await load('src/academies/lamar/data/academicSuccessCenter/placeholders.js');

/** Types where the student has to MAKE something — these need a brief. */
const PROJECT_TYPES = ['Portfolio Entry', 'Writing Portfolio Entry', 'Research Paper', 'Project', 'Presentation', 'Book Report'];

/** Labels that describe the slot to a parent rather than the work to him. */
const PARENT_LABELS = [
  /^applied-math project$/i,
  /^lab-report write-up/i,
  /^summer engineering project write-up/i,
  /^best skill-prompt entry/i,
  /^first research paper of the year/i,
  /^year-end capstone research paper/i
];

/** A brief tells him to DO something. */
const DO_WORDS = /\b(pick|choose|build|draw|design|measure|plot|find|follow|write|record|compute|visit|revise|trace|photograph|label|price|test|launch|run|present|demo|show|chart|predict|explain|change|take|turn|name|keep|include|walk|pitch|practise|practice|give|track)\b/i;

/** Something countable — a digit, or a counted noun in words. */
const COUNTABLE = /\d|\b(one|two|three|four|five|six|seven|eight|nine|ten|twice|each|every)\b/i;

const rows = [];
for (const [subject, byQuarter] of Object.entries(quarterlyAcademicPlaceholders)) {
  for (const [quarter, list] of Object.entries(byQuarter)) {
    for (const row of list) rows.push({ subject, quarter, ...row });
  }
}
const projects = rows.filter((r) => PROJECT_TYPES.includes(r.type));

console.log(`\n--- ${projects.length} projects across ${rows.length} scheduled assignments ---`);
ok('there are projects to check', projects.length >= 12, String(projects.length));

for (const p of projects) {
  const note = (p.note || '').trim();
  const problems = [];
  if (!note) problems.push('no note at all');
  if (note && note.length < 120) problems.push(`only ${note.length} characters`);
  if (PARENT_LABELS.some((re) => re.test(note))) problems.push('a parent-facing label, not an instruction');
  if (note && !DO_WORDS.test(note)) problems.push('names no action to take');
  if (note && !COUNTABLE.test(note)) problems.push('nothing countable — no number anywhere');
  if (/\bTBD\b/i.test(note)) problems.push('topic still TBD');
  ok(`${p.slotId} says what to do`, problems.length === 0, problems.join('; '));
}

console.log('\n--- the note has to match its own title ---');
{
  const map = projects.find((p) => p.slotId === 'asg::socialStudies::Q3::2');
  ok('the map portfolio is not briefed as a budget',
    map && /map/i.test(map.note) && !/budget/i.test(map.note),
    'its note described the SS7E10 money-management project — a leftover from another slot, found Sept 24 2026');
}

console.log('\n--- the fix reaches rows already on both computers ---');
{
  const { ASSIGNMENT_CORRECTIONS } = await load('src/academies/lamar/data/migrations/assignmentMigrations.js');
  const briefed = Object.entries(ASSIGNMENT_CORRECTIONS).filter(([, fix]) => fix.note);
  ok('every rewritten brief has a correction entry', briefed.length >= 21, String(briefed.length));
  ok('every one of them is guarded on the old text',
    briefed.every(([, fix]) => fix.fromNote !== undefined),
    'an unguarded note would overwrite one she wrote herself');
  const seeded = new Map(projects.map((p) => [p.slotId, p.note]));
  const mismatched = briefed
    .filter(([slot]) => seeded.has(slot))
    .filter(([slot, fix]) => fix.note !== seeded.get(slot))
    .map(([slot]) => slot);
  ok('the correction and the seed say the same thing', mismatched.length === 0, mismatched.join(', '));
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) { console.log(`\n${failures.length} CHECK(S) FAILED`); process.exit(1); }
console.log('\nALL CHECKS PASSED');
