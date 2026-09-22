// ---------------------------------------------------------------------------
// THE WRITING SLOT: THE CALENDAR AND LESSONS ARE THE SCHOOL'S; FINDING THIS
// WEEK IS THE PLATFORM'S. Run: node scripts/verify-slot-writing.mjs
//
// `getSchoolWeekNumber`, `getThisWeeksScheduledIds`, `lessonForPrompt` and
// `requirementsFor` moved to src/content/slots/writing.js on Sept 21, 2026.
// Old against new on the first school: 440 dates (from 20 days before the
// first day to a year after, at every hour of the day) plus every prompt —
// 461 comparisons, 0 differences, with the start given as a Date AND as the
// date string a stored school would send.
//
// Asked of the slot as content.js exports it, so a dropped table fails here.
// ---------------------------------------------------------------------------
import { writing as W } from '../src/academies/lamar/content.js';
import {
  WRITING_QUESTIONS, getSchoolWeekNumber, getThisWeeksScheduledIds, lessonForPrompt, requirementsFor
} from '../src/content/slots/writing.js';

// ---- RUN TWICE: ONCE HERE, ONCE IN A TIME ZONE WEST OF GREENWICH ----
//
// Reading '2026-08-03' as UTC midnight instead of local midnight is invisible
// on a machine set to UTC — which is what the checking machine is. The first
// mutation run proved it: the UTC mistake passed. So this file re-runs itself
// with the clock set to Chicago, where UTC midnight is 7 p.m. the day before,
// and fails if that run fails.
if (!process.env.__WRITING_TZ_RUN) {
  const { spawnSync } = await import('node:child_process');
  const { fileURLToPath } = await import('node:url');
  const r = spawnSync(process.execPath, [fileURLToPath(import.meta.url)], {
    env: { ...process.env, TZ: 'America/Chicago', __WRITING_TZ_RUN: '1' }, encoding: 'utf8'
  });
  if (r.status !== 0) {
    console.log(r.stdout + r.stderr);
    console.log('FAIL  the whole check also holds in a time zone behind UTC (America/Chicago)');
    process.exit(1);
  }
  console.log('PASS  the whole check also holds in a time zone behind UTC (America/Chicago)');
}

let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
}
const C = { writing: W };
const start = W.SCHOOL_YEAR_START;
const day = (n, h = 12) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + n, h);

console.log(`\nquestions: ${WRITING_QUESTIONS.join(', ')}`);

console.log('\n--- 1. the school answers what the slot asks ---');
ok('every question is answered', WRITING_QUESTIONS.every((q) => W[q] !== undefined),
  WRITING_QUESTIONS.filter((q) => W[q] === undefined).join(', '));

console.log('\n--- 2. counting school weeks ---');
{
  ok('the day before the first day is week 0', getSchoolWeekNumber(C, day(-1)) === 0);
  // One day early rounds to 0 by arithmetic alone; ten days early is where a
  // missing guard shows, as week -1. The first run of this check only asked
  // about the day before, and the guard could be deleted under it.
  ok('...and so is a fortnight before, not a negative week',
    getSchoolWeekNumber(C, day(-10)) === 0 && getSchoolWeekNumber(C, day(-60)) === 0);
  ok('the first day is week 1, morning and night', getSchoolWeekNumber(C, day(0, 0)) === 1 && getSchoolWeekNumber(C, day(0, 23)) === 1);
  ok('the seventh day is still week 1', getSchoolWeekNumber(C, day(6, 23)) === 1);
  ok('the eighth day is week 2', getSchoolWeekNumber(C, day(7, 0)) === 2);
  ok('week numbers climb one a week', getSchoolWeekNumber(C, day(7 * 20 + 3)) === 21);
  const asString = { writing: { ...W, SCHOOL_YEAR_START: `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, '0')}-${String(start.getDate()).padStart(2, '0')}` } };
  // Late on the seventh day is the hour that tells local from UTC apart: read
  // as UTC, the start is the evening before, so 11 p.m. on day 7 is already
  // week 2 west of Greenwich.
  const same = [-1, 0, 6, 7, 100, 300].every((n) => [0, 12, 23].every((h) =>
    getSchoolWeekNumber(asString, day(n, h)) === getSchoolWeekNumber(C, day(n, h))));
  ok('a start sent as a date string counts exactly like a Date, at midnight', same,
    'read as UTC, a string start moves every school week to the evening before in the Americas');
  ok('a school with no start day is always week 0, never week 1',
    getSchoolWeekNumber({}, day(40)) === 0 && getSchoolWeekNumber({ writing: { SCHOOL_YEAR_START: 'soon' } }, day(40)) === 0);
}

console.log('\n--- 3. this week’s prompts ---');
{
  const weeks = Object.keys(W.weeklyWritingSchedule).map(Number).filter((n) => n > 0);
  const w = weeks[Math.floor(weeks.length / 2)];
  ok('a date in a scheduled week gets that week’s prompts',
    JSON.stringify(getThisWeeksScheduledIds(C, day((w - 1) * 7 + 2))) === JSON.stringify(W.weeklyWritingSchedule[w]));
  ok('...every day of that week, not just one',
    [0, 1, 2, 3, 4, 5, 6].every((d) => getThisWeeksScheduledIds(C, day((w - 1) * 7 + d)) === W.weeklyWritingSchedule[w]));
  ok('before school starts there is nothing scheduled', getThisWeeksScheduledIds(C, day(-3)).length === 0);
  ok('a school with no calendar gets an empty list', Array.isArray(getThisWeeksScheduledIds({}, day(10))) && getThisWeeksScheduledIds({}, day(10)).length === 0);
}

console.log('\n--- 4. lessons and requirements ---');
{
  const pid = Object.keys(W.PROMPT_LESSONS)[0];
  ok('a prompt with a lesson gets it', lessonForPrompt(C, pid) === W.PROMPT_LESSONS[pid]);
  ok('a prompt without one gets null', lessonForPrompt(C, 'no-such-prompt') === null);
  const rid = Object.keys(W.DRILL_REQUIREMENTS)[0];
  ok('a drill with requirements gets them', requirementsFor(C, rid) === W.DRILL_REQUIREMENTS[rid]);
  ok('a drill without gets an empty list, not null', Array.isArray(requirementsFor(C, 'no-such-drill')) && requirementsFor(C, 'no-such-drill').length === 0,
    'a screen that maps over the answer must not crash on a drill with no rules');
  ok('an inherited property name is not a prompt', lessonForPrompt(C, 'constructor') === null && requirementsFor(C, 'toString').length === 0);
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) { console.log('\nFAILED:'); for (const f of failures) console.log('  ' + f); process.exit(1); }
console.log('\nALL CHECKS PASSED');
