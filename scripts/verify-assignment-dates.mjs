// ---------------------------------------------------------------------------
// EVERY DUE DATE OBEYS THE SCHEDULE'S OWN RULES.
// Run: node scripts/verify-assignment-dates.mjs
//
// ---- WHY THIS EXISTS (Aug 30, 2026) ----
//
// The parent asked why Q1 looked heavier than the other quarters. Counting the
// books to answer her turned up something else: **six dated assignments already
// sat outside the rules this app defines for itself.**
//
//   * two Portfolio Entries due 2026-11-25, inside the Thanksgiving-week range
//     that `assignmentRecommendations.js` deliberately keeps clear;
//   * a Book Report due 2027-04-02, which is after Q3 ends and before Q4
//     begins — it belongs to no quarter at all, so no quarter's grade collects
//     it;
//   * a Research Paper and a Reading Assignment both due 2027-05-26, inside the
//     end-of-year excluded range;
//   * a Math Portfolio Entry due 2027-04-16, one day before Q4's window opens.
//
// None of that was visible from any screen. The rules existed — QUARTER_DUE_WINDOWS
// and EXCLUDED_RANGES are right there in `assignmentRecommendations.js` — but
// they only governed dates the app SUGGESTED. Dates written by hand into
// `placeholders.js` were never measured against them.
//
// ---- AND IT CAUGHT ME FIRST ----
//
// Worse, and the actual reason this file exists: I proposed four date changes to
// the parent before writing this, and TWO OF THEM WERE INVALID by these same
// rules — one before Q3's window opened, one a day before Q4's. I offered her
// dates for her son's schoolwork without checking them against the constraints
// sitting in the next file over.
//
// A rule that only applies to generated values is not a rule, it is a
// suggestion. This makes it a rule, for hand-written dates and generated ones
// alike, and it runs before any date is proposed to her again.
// ---------------------------------------------------------------------------
import './lib/academy-under-test.mjs';
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

/**
 * The rules are IMPORTED, never transcribed. A second copy of a date window is
 * a second thing to keep in agreement, and this repo has shipped that mistake
 * with the perspective box and with the lesson-count calibration.
 */
const { EXCLUDED_RANGES } = await import(REPO + '/src/academies/lamar/data/academicSuccessCenter/assignmentRecommendations.js');
const recSrc = fs.readFileSync(
  path.join(REPO, 'src/academies/lamar/data/academicSuccessCenter/assignmentRecommendations.js'), 'utf8'
);
const placeholderSrc = fs.readFileSync(
  path.join(REPO, 'src/academies/lamar/data/academicSuccessCenter/placeholders.js'), 'utf8'
);

/**
 * QUARTER_DUE_WINDOWS is a module-private const, so it is parsed rather than
 * imported — and the parse is asserted to have found all five, so a rename
 * cannot silently leave this suite checking nothing.
 */
const windowBlock = recSrc.slice(
  recSrc.indexOf('const QUARTER_DUE_WINDOWS = {'),
  recSrc.indexOf('};', recSrc.indexOf('const QUARTER_DUE_WINDOWS = {'))
);
const WINDOWS = {};
for (const m of windowBlock.matchAll(/(\w+):\s*\{\s*start:\s*\[(\d+),\s*(\d+)\],\s*end:\s*\[(\d+),\s*(\d+)\]/g)) {
  WINDOWS[m[1]] = { start: [Number(m[2]), Number(m[3])], end: [Number(m[4]), Number(m[5])] };
}

console.log('--- 1. the rules themselves are readable ---');
ok('the five quarter due-windows are found', Object.keys(WINDOWS).length === 5,
  Object.keys(WINDOWS).join(', ') + ' — a rename here would leave this suite checking nothing');
ok('the excluded ranges are found', Array.isArray(EXCLUDED_RANGES) && EXCLUDED_RANGES.length >= 3);

/** Which school year a quarter's window belongs to. Q1/Q2 open the year. */
const YEAR_OF = { Q1: 2026, Q2: 2026, Q3: 2027, Q4: 2027, Summer: 2027 };
const pad = (n) => String(n).padStart(2, '0');
const windowRange = (q) => {
  const w = WINDOWS[q];
  if (!w) return null;
  const y = YEAR_OF[q];
  return [
    `${y}-${pad(w.start[0])}-${pad(w.start[1])}`,
    `${y}-${pad(w.end[0])}-${pad(w.end[1])}`
  ];
};
const excluded = (d) => EXCLUDED_RANGES.some(([a, b]) => d >= a && d <= b);

/* Every hand-written dated assignment in the placeholder seed. */
const rows = [...placeholderSrc.matchAll(
  /slotId: '(asg::(\w+)::(\w+)::\d+)', type: '([^']*)'[^}]*?dueDate: '(\d{4}-\d\d-\d\d)'/g
)].map((m) => ({ slot: m[1], subject: m[2], quarter: m[3], type: m[4], due: m[5] }));

console.log('\n--- 2. every due date falls inside its own quarter ---');
ok(`there are dated assignments to check (${rows.length} found)`, rows.length > 30);

{
  const orphans = rows.filter((r) => {
    const w = windowRange(r.quarter);
    return !w || r.due < w[0] || r.due > w[1];
  });
  /**
   * The worst shape this takes: a Book Report dated 2027-04-02, which is after
   * Q3's last day and before Q4's first. It belongs to no quarter, so NO
   * quarter's grade collects it — the work gets done and counts toward nothing.
   */
  ok('no assignment is due outside its own quarter\'s window',
    orphans.length === 0,
    orphans.map((r) => `${r.due} ${r.subject}/${r.type} (${r.quarter})`).join('; '));
}

console.log('\n--- 3. nothing is due when school is closed or closing ---');
{
  const inBreak = rows.filter((r) => excluded(r.due));
  /**
   * Thanksgiving week, the winter break, and the last week of the year are
   * kept clear on purpose — the comment in `assignmentRecommendations.js` says
   * so. A due date inside one is work assigned into a holiday.
   */
  ok('no assignment is due inside an excluded range',
    inBreak.length === 0,
    inBreak.map((r) => `${r.due} ${r.subject}/${r.type}`).join('; '));
}

console.log('\n--- 4. the shape of the load ---');
{
  /**
   * Not a pass/fail on doubling-up: eight days already carry two items and that
   * is a legitimate way to run a week, since the two are usually different
   * subjects. What is NOT legitimate is three or more landing together, or two
   * of them in the SAME subject — that is one subject's work stacked on itself.
   */
  const byDay = {};
  for (const r of rows) (byDay[r.due] ||= []).push(r);

  const heavy = Object.entries(byDay).filter(([, v]) => v.length >= 3);
  ok('no single day carries three or more due items', heavy.length === 0,
    heavy.map(([d, v]) => `${d} (${v.length})`).join('; '));

  const sameSubject = Object.entries(byDay).filter(([, v]) => {
    const subs = v.map((r) => r.subject);
    return new Set(subs).size !== subs.length;
  });
  ok('...and no day stacks two pieces of the same subject on itself',
    sameSubject.length === 0,
    sameSubject.map(([d, v]) => `${d}: ${v.map((r) => r.subject + '/' + r.type).join(' + ')}`).join('; '));

  /**
   * ---- THIS CHECK WAS WRONG ON ITS FIRST RUN (Aug 30, 2026) ----
   *
   * It flagged any day carrying both a Reading Assignment and a Book Report,
   * and fired on three days that are perfectly fine — 2026-09-18 is Hatchet
   * (Reading) alongside the Salva's well report (Social Studies). Two subjects,
   * two different books, one day. That is a normal week, and the check above
   * already decides whether a day is overloaded.
   *
   * The fault it was reaching for is narrower: a book and a report **in the
   * same subject** on the same day, which is a subject's reading and its own
   * written work colliding, leaving no room for the four report milestones that
   * run one a week.
   *
   * A check that fires on correct data is worse than no check — it trains
   * whoever runs the suite to scroll past red. Narrowed to the real thing.
   */
  const sameSubjectBookAndReport = Object.entries(byDay).filter(([, v]) =>
    v.some((r) => r.type === 'Reading Assignment')
    && v.some((r) => r.type === 'Book Report' && v.some(
      (o) => o.type === 'Reading Assignment' && o.subject === r.subject)));
  ok('no subject has a book and one of its own reports due the same day',
    sameSubjectBookAndReport.length === 0,
    sameSubjectBookAndReport.map(([d, v]) => `${d}: ${v.map((r) => r.subject + '/' + r.type).join(' + ')}`).join('; ')
      + ' — the four report milestones run one a week and need the room');
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
