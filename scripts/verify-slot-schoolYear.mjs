// ---------------------------------------------------------------------------
// THE SCHOOL-YEAR SLOT: EACH SCHOOL'S CALENDAR, ONE SET OF RULES.
// Run: ACADEMY=lamar node scripts/verify-slot-schoolYear.mjs
//
// ---- WHAT CHANGED (Sept 22, 2026) ----
//
// src/lib/schoolQuarter.js held one family's first day (a typed-in Date) and
// one family's four quarter names, and every school inherited both. The rules
// moved to src/content/slots/schoolYear.js; each school answers FIRST_DAY and
// PERIODS from its own calendar; schoolQuarter.js is now only a binding to the
// school that is open.
//
// Measured before anything was wired: 5,025 date-times x 263 labels, old file
// against new slot, both schools, in UTC, Chicago and Auckland — 410,980
// comparisons, zero differences. The one intended difference: the second
// school's period labels are now its own, and no screen renders a period label.
//
// This file reads each school's answer AS ITS content.js EXPORTS IT, and
// constructs calendars no school uses today — semesters, a year that turns
// over in February, twelve periods, a gap — because a check that only replays
// the two calendars we have proves nothing about the third.
// ---------------------------------------------------------------------------
import './lib/academy-under-test.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { schoolYear as LAMAR } from '../src/academies/lamar/content.js';
import * as petalContent from '../src/academies/petal-pestle-academy/content.js';
import * as lamarContent from '../src/academies/lamar/content.js';
import {
  SCHOOL_YEAR_QUESTIONS, periodsOf, schoolYearStart, hasSchoolStarted, currentPeriod,
  isSpanLabel, isCalendarYearLabel, isPeriodLabel, groupByPeriod, periodRank, periodSchoolYear,
  absolutePeriodRank, periodDateRange, periodOpensOn, isPeriodOpen
} from '../src/content/slots/schoolYear.js';
import { installAcademyContent } from '../src/content/academyContent.js';
import * as bound from '../src/lib/schoolQuarter.js';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');
const PETAL = petalContent.schoolYear;

// ---- RUN TWICE: ONCE HERE, ONCE WEST OF GREENWICH ----
// This machine runs on UTC, where a local-vs-UTC date mistake is invisible.
if (!process.env.__SCHOOLYEAR_TZ_RUN) {
  const { spawnSync } = await import('node:child_process');
  const r = spawnSync(process.execPath, [fileURLToPath(import.meta.url)], {
    env: { ...process.env, TZ: 'America/Chicago', __SCHOOLYEAR_TZ_RUN: '1' }, encoding: 'utf8'
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
const D = (y, m, d, h = 12, min = 0) => new Date(y, m - 1, d, h, min);
const L = { schoolYear: LAMAR };
const P = { schoolYear: PETAL };
const eachDay = (from, to, fn) => {
  for (let d = new Date(from); d <= to; d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1)) fn(d);
};

console.log('\n--- 1. the slot is data in, answers out ---');
{
  const src = read('src/content/slots/schoolYear.js');
  ok('the slot file imports nothing', !/^\s*import\s/m.test(src));
  ok('it asks for exactly FIRST_DAY and PERIODS',
    JSON.stringify([...SCHOOL_YEAR_QUESTIONS]) === JSON.stringify(['FIRST_DAY', 'PERIODS']));
  for (const [name, answer] of [['first school', LAMAR], ['second school', PETAL]]) {
    ok(`${name}: answers both questions through content.js`, !!answer && typeof answer.FIRST_DAY === 'string' && Array.isArray(answer.PERIODS));
    ok(`${name}: hands over no function`, !Object.values(answer || {}).some((v) => typeof v === 'function')
      && !(answer?.PERIODS || []).some((p) => Object.values(p).some((v) => typeof v === 'function')));
    ok(`${name}: every period survives validation`, periodsOf({ schoolYear: answer }).length === (answer?.PERIODS || []).length);
  }
}

console.log('\n--- 2. no school\'s calendar is left in the platform ---');
{
  const platform = ['src/lib/schoolQuarter.js', 'src/content/slots/schoolYear.js'].map((f) => [f, read(f)]);
  const words = [...LAMAR.PERIODS, ...PETAL.PERIODS].map((p) => p.label).filter((w) => w && w.length > 3);
  for (const [f, src] of platform) {
    const hits = words.filter((w) => src.includes(`'${w}'`) || src.includes(`"${w}"`));
    ok(`${f} quotes no school's period name`, hits.length === 0, hits.join(', '));
    ok(`${f} types in no first day`, !/new Date\(\s*20\d\d\s*,/.test(src) && !/['"]20\d\d-\d\d-\d\d['"]/.test(src));
  }
  ok('nothing in the platform imports a school\'s calendar file',
    !platform.some(([, s]) => /academies\//.test(s.split('\n').filter((l) => /^\s*import\s/.test(l)).join('\n'))));
}

console.log('\n--- 3. the first school, pinned to the calendar the parent confirmed ---');
{
  ok('first day is 3 August 2026, local midnight',
    schoolYearStart(L).getTime() === new Date(2026, 7, 3).getTime());
  ok('a minute before midnight on 2 August, school has not started', hasSchoolStarted(L, D(2026, 8, 2, 23, 59)) === false);
  ok('at midnight on 3 August, it has', hasSchoolStarted(L, D(2026, 8, 3, 0, 0)) === true);
  const want = [
    [D(2026, 8, 1), 'Q1 2026-2027', 'Becoming an Engineer'],
    [D(2026, 10, 31), 'Q1 2026-2027'], [D(2026, 11, 1), 'Q2 2026-2027'],
    [D(2027, 1, 1, 0, 0), 'Q3 2026-2027'], [D(2026, 12, 31, 23, 59), 'Q2 2026-2027'],
    [D(2027, 4, 1), 'Q4 2026-2027'], [D(2027, 5, 31), 'Q4 2026-2027'],
    [D(2027, 6, 1), 'Summer 2027', 'Summer Session'], [D(2027, 7, 31, 23, 59), 'Summer 2027'],
    [D(2027, 8, 1, 0, 0), 'Q1 2027-2028']
  ];
  for (const [d, label, name] of want) {
    const got = currentPeriod(L, d);
    ok(`${d.toDateString()} ${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')} is ${label}`,
      got.batchLabel === label && (!name || got.label === name), JSON.stringify(got));
  }
  ok('Summer 2027 belongs to the 2026-2027 school year', currentPeriod(L, D(2027, 7, 1)).schoolYearLabel === '2026-2027');
  ok('November runs 1 Nov to 31 Dec', JSON.stringify(periodDateRange(L, D(2026, 11, 15))) === JSON.stringify({ id: 'Q2', start: '2026-11-01', end: '2026-12-31' }));
  ok('Q3 in a leap year ends 31 March, and starts 1 Jan', JSON.stringify(periodDateRange(L, D(2028, 2, 29))) === JSON.stringify({ id: 'Q3', start: '2028-01-01', end: '2028-03-31' }));
  ok('Q4 ends on 31 May, not in July', periodDateRange(L, D(2027, 4, 10)).end === '2027-05-31');
  ok('Q2 opens 1 Nov 2026', periodOpensOn(L, 'Q2 2026-2027') === '2026-11-01');
  ok('Q3 opens in the NEXT calendar year', periodOpensOn(L, 'Q3 2026-2027') === '2027-01-01');
  ok('Summer 2027 opens 1 June 2027', periodOpensOn(L, 'Summer 2027') === '2027-06-01');
  ok('an untagged lesson has no opening day', periodOpensOn(L, undefined) === null);
}

console.log('\n--- 4. what is open, and the year-2 rule ---');
{
  ok('a Q2 lesson is closed in September', isPeriodOpen(L, 'Q2 2026-2027', D(2026, 9, 15)) === false);
  ok('...and open on 1 November', isPeriodOpen(L, 'Q2 2026-2027', D(2026, 11, 1, 0, 0)) === true);
  ok('a Q1 lesson stays open all year for a learner who is behind', isPeriodOpen(L, 'Q1 2026-2027', D(2027, 5, 1)) === true);
  ok('last year\'s unfinished Q4 does NOT re-lock next August', isPeriodOpen(L, 'Q4 2026-2027', D(2027, 8, 10)) === true);
  ok('last year\'s Summer does not re-lock either', isPeriodOpen(L, 'Summer 2027', D(2027, 9, 1)) === true);
  ok('next year\'s Q1 does NOT open during this year\'s Q1', isPeriodOpen(L, 'Q1 2027-2028', D(2026, 9, 1)) === false);
  ok('next year\'s Q1 does not open during this Summer', isPeriodOpen(L, 'Q1 2027-2028', D(2027, 7, 31)) === false);
  ok('untagged work is never gated', isPeriodOpen(L, null, D(2026, 8, 3)) === true && isPeriodOpen(L, undefined) === true);
  ok('ranks order across years', absolutePeriodRank(L, 'Summer 2027') < absolutePeriodRank(L, 'Q1 2027-2028')
    && absolutePeriodRank(L, 'Q4 2026-2027') < absolutePeriodRank(L, 'Summer 2027'));
  ok('a legacy label with no year ranks in the current year',
    absolutePeriodRank(L, 'Q2') === absolutePeriodRank(L, `Q2 ${currentPeriod(L).schoolYearLabel}`));
  ok('within-year rank follows the school\'s own order', ['Q1', 'Q2', 'Q3', 'Q4', 'Summer'].map((id) => periodRank(L, `${id} x`)).join() === '1,2,3,4,5');
}

console.log('\n--- 5. row labels: exactly the formats saved rows already carry ---');
{
  const yes = ['Q1 2026-2027', 'Q4 2030-2031', 'Summer 2027'];
  const no = ['Q5 2026-2027', 'Summer 2026-2027', 'q1 2026-2027', 'Q1 2026-2027 ', ' Q1 2026-2027', 'Summer 27', 'Q1', 'Earlier', '', null];
  ok('every real label is recognised', yes.every((l) => isPeriodLabel(L, l)), yes.filter((l) => !isPeriodLabel(L, l)).join(' | '));
  ok('no near-miss is recognised', no.every((l) => !isPeriodLabel(L, l)), no.filter((l) => isPeriodLabel(L, l)).join(' | '));
  ok('the two formats do not cross', !isSpanLabel(L, 'Summer 2027') && !isCalendarYearLabel(L, 'Q1 2026-2027'));
  const rows = [{ batchLabel: 'Summer 2027' }, { batchLabel: 'legacy' }, { batchLabel: 'Q2 2026-2027' }, { batchLabel: 'Q1 2026-2027' }];
  const keys = groupByPeriod(L, rows).map(([k]) => k);
  ok('grouping sorts periods and puts Earlier last', keys.join('|') === 'Q1 2026-2027|Q2 2026-2027|Summer 2027|Earlier', keys.join('|'));
  // Mutation run, Sept 22: with the unrecognised rows arriving LAST, the sort
  // put Earlier last even when the rule for it was deleted. Every order is
  // tried, so the answer cannot depend on where the old rows happen to sit.
  const perms = (xs) => xs.length <= 1 ? [xs] : xs.flatMap((x, i) => perms([...xs.slice(0, i), ...xs.slice(i + 1)]).map((r) => [x, ...r]));
  const bad = perms(rows).map((order) => groupByPeriod(L, order).map(([k]) => k).join('|'))
    .filter((k) => k !== 'Q1 2026-2027|Q2 2026-2027|Summer 2027|Earlier');
  ok('...whatever order the rows arrive in (all 24)', bad.length === 0, bad[0]);
}

console.log('\n--- 6. the second school answers from its own calendar ---');
{
  const cal = petalContent.timetable.SCHOOL_YEAR;
  ok('its first day is its calendar\'s start', PETAL.FIRST_DAY === cal.start);
  ok('its period names are its own, not the first school\'s',
    !PETAL.PERIODS.some((p) => LAMAR.PERIODS.some((q) => q.label === p.label)));
  // Every single day of its year, the period is the term the calendar says.
  const ROW = (termId) => PETAL.PERIODS[cal.periods.findIndex((t) => t.id === termId)].id;
  const wrong = [];
  for (const term of cal.periods) {
    const [sy, sm, sd] = term.start.split('-').map(Number);
    const [ey, em, ed] = term.end.split('-').map(Number);
    eachDay(new Date(sy, sm - 1, sd), new Date(ey, em - 1, ed), (d) => {
      if (currentPeriod(P, d).id !== ROW(term.id)) wrong.push(`${d.toDateString()} ${currentPeriod(P, d).id} != ${term.id}`);
    });
  }
  ok('every day inside each dated term reads as that term', wrong.length === 0, wrong.slice(0, 4).join('; '));
  ok('its rows keep the labels already written for it', currentPeriod(P, D(2026, 9, 1)).batchLabel === 'Q1 2026-2027'
    && currentPeriod(P, D(2027, 6, 15)).batchLabel === 'Summer 2027');
}

console.log('\n--- 7. a school that has said nothing gates nothing ---');
{
  for (const [name, c] of [['no schoolYear', {}], ['empty answer', { schoolYear: {} }], ['junk periods', { schoolYear: { PERIODS: [{ id: '', months: [1] }, { id: 'X', months: [13] }, null] } }]]) {
    ok(`${name}: school has started`, hasSchoolStarted(c, D(2000, 1, 1)) === true);
    ok(`${name}: no period is current`, currentPeriod(c, D(2026, 9, 1)).batchLabel === null);
    ok(`${name}: nothing is locked`, isPeriodOpen(c, 'Q4 2099-2100', D(2026, 9, 1)) === true);
    ok(`${name}: every row is Earlier`, groupByPeriod(c, [{ batchLabel: 'Q1 2026-2027' }]).map(([k]) => k).join() === 'Earlier');
    ok(`${name}: no range, no opening day`, periodDateRange(c) === null && periodOpensOn(c, 'Q1 2026-2027') === null);
  }
  ok('a Date answer works as well as a string', schoolYearStart({ schoolYear: { FIRST_DAY: new Date(2026, 7, 3, 15) } }).getTime() === new Date(2026, 7, 3).getTime());
  ok('a nonsense first day is no first day', schoolYearStart({ schoolYear: { FIRST_DAY: 'soon' } }) === null);
}

console.log('\n--- 8. calendars no school uses today ---');
{
  const SEM = { schoolYear: { FIRST_DAY: '2026-08-20', PERIODS: [
    { id: 'Fall', months: [8, 9, 10, 11, 12] }, { id: 'Spring', months: [1, 2, 3, 4, 5] },
    { id: 'Break', months: [6, 7], labelYear: 'calendar' }] } };
  ok('semesters: January is Spring of the year that began last August', currentPeriod(SEM, D(2027, 1, 10)).batchLabel === 'Spring 2026-2027');
  ok('semesters: Fall runs Aug-Dec', JSON.stringify(periodDateRange(SEM, D(2026, 10, 1))) === JSON.stringify({ id: 'Fall', start: '2026-08-01', end: '2026-12-31' }));
  ok('semesters: Spring is closed in Fall and open in Spring', !isPeriodOpen(SEM, 'Spring 2026-2027', D(2026, 12, 31)) && isPeriodOpen(SEM, 'Spring 2026-2027', D(2027, 1, 1, 0, 0)));

  // A year that turns over in February, with a term running across New Year.
  const FEB = { schoolYear: { PERIODS: [
    { id: 'T1', months: [2, 3, 4] }, { id: 'T2', months: [5, 6, 7] },
    { id: 'T3', months: [8, 9, 10] }, { id: 'T4', months: [11, 12, 1] }] } };
  ok('Feb turnover: January belongs to the year that began last February', currentPeriod(FEB, D(2027, 1, 15)).batchLabel === 'T4 2026-2027');
  ok('Feb turnover: February starts a new year', currentPeriod(FEB, D(2027, 2, 1, 0, 0)).batchLabel === 'T1 2027-2028');
  ok('a term across New Year starts and ends in the right years',
    JSON.stringify(periodDateRange(FEB, D(2027, 1, 15))) === JSON.stringify({ id: 'T4', start: '2026-11-01', end: '2027-01-31' }),
    JSON.stringify(periodDateRange(FEB, D(2027, 1, 15))));
  ok('...seen from December too', JSON.stringify(periodDateRange(FEB, D(2026, 12, 5))) === JSON.stringify({ id: 'T4', start: '2026-11-01', end: '2027-01-31' }));
  ok('Feb turnover: T4 opens in November of the starting year', periodOpensOn(FEB, 'T4 2026-2027') === '2026-11-01');

  // Twelve periods, where one id is a prefix of another and ranks pass nine.
  const MONTHLY = { schoolYear: { PERIODS: Array.from({ length: 12 }, (_, i) => ({ id: `P${i + 1}`, months: [((i + 7) % 12) + 1] })) } };
  ok('P10 is not mistaken for P1', periodRank(MONTHLY, 'P10 2026-2027') === 10 && periodRank(MONTHLY, 'P1 2026-2027') === 1);
  ok('the twelfth period of one year ranks below the first of the next',
    absolutePeriodRank(MONTHLY, 'P12 2026-2027') < absolutePeriodRank(MONTHLY, 'P1 2027-2028'));
  ok('...so the last month of a year never opens early', !isPeriodOpen(MONTHLY, 'P12 2026-2027', D(2027, 6, 1)) && isPeriodOpen(MONTHLY, 'P12 2026-2027', D(2027, 7, 1)));

  // A gap: no summer period at all.
  const GAP = { schoolYear: { PERIODS: [{ id: 'A', months: [9, 10, 11, 12] }, { id: 'B', months: [1, 2, 3, 4, 5] }] } };
  ok('a month in a gap is still the last period, not no period', currentPeriod(GAP, D(2027, 7, 4)).batchLabel === 'B 2026-2027');
  ok('...and its range is that period\'s', JSON.stringify(periodDateRange(GAP, D(2027, 7, 4))) === JSON.stringify({ id: 'B', start: '2027-01-01', end: '2027-05-31' }));
  ok('an id with regex characters is matched literally', isPeriodLabel({ schoolYear: { PERIODS: [{ id: 'Q.1', months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }] } }, 'QX1 2026-2027') === false);
}

console.log('\n--- 9. the binding reads the OPEN school, on every call ---');
{
  installAcademyContent(petalContent, 'petal-pestle-academy');
  const second = bound.getCurrentQuarter(D(2026, 9, 1)).label;
  installAcademyContent(lamarContent, 'lamar');
  const first = bound.getCurrentQuarter(D(2026, 9, 1)).label;
  ok('switching school changes the answer without re-importing anything', second !== first && first === LAMAR.PERIODS[0].label, `${second} / ${first}`);
  ok('the first day is read from the open school', bound.schoolYearStartKey() === LAMAR.FIRST_DAY);
  const src = read('src/lib/schoolQuarter.js');
  ok('the binding computes nothing at module scope',
    !src.split('\n').some((l) => /^(export )?const \w+ = [^(]*academyContent\(\)/.test(l) && !/=>/.test(l)));
  ok('no screen still reads the old constant', !['src/components', 'src/lib', 'src/store'].some((dir) =>
    fs.readdirSync(path.join(REPO, dir), { recursive: true }).filter((f) => /\.jsx?$/.test(f))
      .some((f) => /\bSCHOOL_YEAR_START_DATE\b|\bisSummerBatchLabel\b/.test(read(path.join(dir, f)).replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '')))));
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) { console.log(`${failures.length} CHECK(S) FAILED`); process.exit(1); }
