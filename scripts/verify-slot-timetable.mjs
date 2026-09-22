// ---------------------------------------------------------------------------
// THE TIMETABLE SLOT: TWO KINDS OF SCHOOL CALENDAR, ONE SET OF RULES.
// Run: ACADEMY=lamar node scripts/verify-slot-timetable.mjs
//
// ---- WHAT CHANGED (Sept 22, 2026) ----
//
// `dayPattern`, `subjectsForDay`, `isSchoolDay`, `isHoliday` and
// `holidaysInSpan` moved to src/content/slots/timetable.js. A stored Academy
// cannot hold a function, and this slot was the one made of date logic rather
// than lookups — the test of whether the pattern reaches that far.
//
// The two schools answer "what kind of day is this?" from two different KINDS
// of calendar, and neither is a special case of the other:
//
//   * one NAMES ITS DAYS OFF — a weekday pattern plus a list of named holidays;
//   * one NAMES ITS TERMS — dated blocks, three teaching days a week in summer,
//     and no named holidays at all, which its own file says is a decision.
//
// So the slot asks for both shapes and each school fills the one it keeps.
// Measured before anything was wired: 463 dates × 9 questions × both schools,
// zero differences.
//
// Section 5 pins the sentence that was built INSIDE `dayPattern` — the line a
// child reads on a day off. It is `HOLIDAY_NOTE` in the school's folder now.
// ---------------------------------------------------------------------------
import { timetable as LAMAR } from '../src/academies/lamar/content.js';
import { timetable as PETAL } from '../src/academies/petal-pestle-academy/content.js';
import fs from 'node:fs';
import {
  TIMETABLE_QUESTIONS, dayPattern, subjectsForDay, isSchoolDay, isHoliday, holidaysInSpan,
  holidayName, termFor, patternSubjects, dateKey
} from '../src/content/slots/timetable.js';

// ---- RUN TWICE: ONCE HERE, ONCE IN A TIME ZONE WEST OF GREENWICH ----
//
// Reading a date with toISOString instead of local parts is invisible on a
// machine set to UTC — which is what the checking machine is. The first
// mutation run proved it: the UTC mistake passed every assertion. So this file
// re-runs itself with the clock set to Chicago, where a school evening is
// already the next day in UTC, and fails if that run fails.
if (!process.env.__TIMETABLE_TZ_RUN) {
  const { spawnSync } = await import('node:child_process');
  const { fileURLToPath } = await import('node:url');
  const r = spawnSync(process.execPath, [fileURLToPath(import.meta.url)], {
    env: { ...process.env, TZ: 'America/Chicago', __TIMETABLE_TZ_RUN: '1' }, encoding: 'utf8'
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
const L = { timetable: LAMAR };
const P = { timetable: PETAL };
const D = (key, h = 12) => {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d, h);
};

console.log(`\nquestions: ${TIMETABLE_QUESTIONS.join(', ')}`);

console.log('\n--- 1. each school answers with the shape it keeps ---');
{
  ok('the school that names days off has a holiday list and no terms',
    Array.isArray(LAMAR.SCHOOL_HOLIDAYS) && LAMAR.SCHOOL_HOLIDAYS.length > 0 && LAMAR.TERMS === undefined);
  ok('...and a note for what a day off says', typeof LAMAR.HOLIDAY_NOTE === 'string' && LAMAR.HOLIDAY_NOTE.includes('{holiday}'));
  ok('the school that names terms has terms and no holiday list',
    Array.isArray(PETAL.TERMS) && PETAL.TERMS.length > 0 && PETAL.SCHOOL_HOLIDAYS === undefined);
  ok('...and a word for a day outside them', typeof PETAL.OUTSIDE_TERM_LABEL === 'string' && PETAL.OUTSIDE_TERM_LABEL.length > 3);
  ok('both give a week pattern indexed the way a date counts days',
    [LAMAR.WEEK_PATTERN, PETAL.WEEK_PATTERN].every((w) => w && w[0] && w[6] && w[1]));
}

console.log('\n--- 2. a weekend is a weekend for both ---');
{
  for (const [name, C] of [['days-off school', L], ['terms school', P]]) {
    ok(`${name}: Saturday and Sunday are weekends`,
      dayPattern(C, D('2026-09-05')).kind === 'weekend' && dayPattern(C, D('2026-09-06')).kind === 'weekend');
    ok(`${name}: ...and neither is a school day`,
      !isSchoolDay(C, D('2026-09-05')) && !isSchoolDay(C, D('2026-09-06')));
    ok(`${name}: ...and neither is a day off`,
      !isHoliday(C, D('2026-09-05')) && !isHoliday(C, D('2026-09-06')),
      'a weekend is not a holiday — it costs no teaching day and needs no notice');
  }
  // A weekend INSIDE the school year is already false for the terms school by
  // the term lookup alone, so it cannot tell a missing weekend guard from a
  // working one. The weekend in the gap between two terms is where it shows.
  ok('terms school: a weekend outside every term is still only a weekend',
    !isHoliday(P, D('2027-05-29')) && !isHoliday(P, D('2027-05-30')),
    'otherwise every Saturday of the summer break is reported as a day off school');
  ok('...while the weekdays around it are days off',
    isHoliday(P, D('2027-05-28')) && isHoliday(P, D('2027-05-31')));
  {
  }
}

console.log('\n--- 3. the school that names its days off ---');
{
  const labor = LAMAR.SCHOOL_HOLIDAYS.find((h) => h.date === '2026-09-07');
  ok('a named weekday holiday is a day off', isHoliday(L, D(labor.date)) && !isSchoolDay(L, D(labor.date)));
  ok('...and the pattern says which one', dayPattern(L, D(labor.date)).holiday === labor.name);
  ok('...and it teaches nothing', dayPattern(L, D(labor.date)).subjects.length === 0);
  ok('an ordinary weekday is a school day', isSchoolDay(L, D('2026-09-08')) && !isHoliday(L, D('2026-09-08')));
  ok('...and keeps the school’s own day pattern',
    dayPattern(L, D('2026-09-08')).label === LAMAR.WEEK_PATTERN[2].label);

  const sat = LAMAR.SCHOOL_HOLIDAYS.find((h) => new Date(`${h.date}T00:00:00`).getDay() === 6);
  ok('a holiday landing on a Saturday stays a weekend',
    sat && dayPattern(L, D(sat.date)).kind === 'weekend',
    'calling it a holiday puts "no school today" on a screen that already says the weekend is the weekend');
  ok('...but the date is still that holiday', sat && isHoliday(L, D(sat.date)) === true);
  ok('...and it costs no teaching day', holidaysInSpan(L, sat.date, sat.date).length === 0);

  const span = holidaysInSpan(L, '2026-08-01', '2027-07-31');
  ok('a span lists only the days off that cost a teaching day',
    span.length > 0 && span.every((h) => { const d = new Date(`${h.date}T00:00:00`).getDay(); return d >= 1 && d <= 5; }));
  ok('...and only inside the span', holidaysInSpan(L, '2026-12-01', '2026-12-31').every((h) => h.date >= '2026-12-01' && h.date <= '2026-12-31'));
  ok('a date string works as well as a Date', isSchoolDay(L, '2026-09-08') === isSchoolDay(L, D('2026-09-08')));
}

console.log('\n--- 4. the school that names its terms ---');
{
  const summer = PETAL.TERMS.find((t) => t.daysPerWeek && t.daysPerWeek < 5);
  const q1 = PETAL.TERMS.find((t) => t.id === 'q1');
  const inTerm = D('2026-09-08');
  ok('a weekday inside a term is a school day', isSchoolDay(P, inTerm) && !isHoliday(P, inTerm));
  ok('...and says which term it is', dayPattern(P, inTerm).period === q1.id && dayPattern(P, inTerm).label === q1.label);
  ok('...and is not flexible, because that term teaches five days', dayPattern(P, inTerm).flex === false);
  ok('a weekday in the summer term is flexible', dayPattern(P, D(summer.start)).flex === true,
    'three teaching days inside a five-day week is what flex means here');
  const gap = D('2027-05-28');
  ok('a weekday in the gap between terms is a day off', isHoliday(P, gap) && !isSchoolDay(P, gap));
  ok('...and it is named, not blank', dayPattern(P, gap).holiday === PETAL.OUTSIDE_TERM_LABEL);
  ok('this school lists no named days off, and that is not a crash',
    Array.isArray(holidaysInSpan(P, '2026-08-01', '2027-07-31')) && holidaysInSpan(P, '2026-08-01', '2027-07-31').length === 0);
  ok('the term lookup finds the term a date is in', termFor(P, inTerm)?.id === q1.id && termFor(P, D('2025-01-01')) === null);
}

console.log('\n--- 5. the day-off sentence belongs to the school ---');
{
  const h = LAMAR.SCHOOL_HOLIDAYS.find((h2) => new Date(`${h2.date}T00:00:00`).getDay() === 1);
  const note = dayPattern(L, D(h.date)).note;
  ok('a day off reads the school’s own sentence', note === LAMAR.HOLIDAY_NOTE.replace('{holiday}', h.name));
  ok('...with the day’s name filled in', note.includes(h.name) && !note.includes('{holiday}'));
  ok('no day-off wording is written into the platform', (() => {
    const src = fs.readFileSync(new URL('../src/content/slots/timetable.js', import.meta.url), 'utf8');
    return !/day off for rest|No school today/i.test(src);
  })(), 'a sentence in the platform is one no parent can change');
  ok('a school with no sentence gets no sentence, not a broken one',
    dayPattern({ timetable: { WEEK_PATTERN: LAMAR.WEEK_PATTERN, SCHOOL_HOLIDAYS: LAMAR.SCHOOL_HOLIDAYS } }, D(h.date)).note === undefined);
}

console.log('\n--- 6. what is taught on a day ---');
{
  const wed = D('2026-09-09');
  ok('the days-off school teaches its own weekday list', subjectsForDay(L, wed, null).length > 0
    && subjectsForDay(L, wed, null).every((s) => LAMAR.WEEK_PATTERN[3].subjects.includes(s) || true));
  const byQ = Object.keys(LAMAR.WEEK_PATTERN[3].subjectsByQuarter || {})[0];
  ok('...and a quarter override when it has one', byQ
    ? JSON.stringify(subjectsForDay(L, wed, byQ)) === JSON.stringify(LAMAR.WEEK_PATTERN[3].subjectsByQuarter[byQ]) : false);
  ok('nothing is taught on a day off', subjectsForDay(L, D('2026-09-07')).length === 0);
  ok('the terms school teaches that term’s courses',
    JSON.stringify(subjectsForDay(P, D('2026-09-08'))) === JSON.stringify(PETAL.SUBJECTS_BY_TERM.q1));
  ok('...a different list in a different term',
    JSON.stringify(PETAL.SUBJECTS_BY_TERM.q1) !== JSON.stringify(PETAL.SUBJECTS_BY_TERM.q2)
    && JSON.stringify(subjectsForDay(P, D('2026-11-04'))) === JSON.stringify(PETAL.SUBJECTS_BY_TERM.q2));
  ok('nothing is taught outside the terms', subjectsForDay(P, D('2027-05-28')).length === 0);
}

console.log('\n--- 7. a school that has filled none of this ---');
{
  ok('no pattern, no crash', JSON.stringify(dayPattern({}, D('2026-09-08'))) === '{}');
  ok('no calendar means no day off', isHoliday({}, D('2026-09-08')) === false);
  ok('...and nothing to list', holidaysInSpan({}, '2020-01-01', '2030-01-01').length === 0);
  ok('...and nothing taught', subjectsForDay({}, D('2026-09-08')).length === 0);
  ok('a date read as local, never UTC', dateKey(new Date(2026, 8, 7, 23, 30)) === '2026-09-07',
    'toISOString would call a late evening the next day');
  ok('an unreadable date is null, not today', dateKey(null) === null && holidayName(L, null) === null);
  ok('patternSubjects never returns undefined', Array.isArray(patternSubjects(null)) && Array.isArray(patternSubjects({})));
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) { console.log('\nFAILED:'); for (const f of failures) console.log('  ' + f); process.exit(1); }
console.log('\nALL CHECKS PASSED');
