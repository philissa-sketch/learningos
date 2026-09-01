/**
 * The real 2026-2027 calendar: single days off, no week-long breaks.
 *
 * Guards the work of Aug 9 2026. The parent: "we will take the actual holiday
 * off for rest but not the weeks" and, confirming the list, "those single days
 * are all off for rest."
 */
import './lib/academy-under-test.mjs';
import { readsFromAcademy } from './lib/reads-content.mjs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const H = await import(ROOT + '/src/academies/lamar/data/schedule/schoolHolidays.js');
const { QUARTER_SPANS, schoolDaysBetween, holidaysBetween } = await import(ROOT + '/src/lib/yearPlan.js');
const { dayPattern, isSchoolDay } = await import(ROOT + '/src/academies/lamar/data/schedule/weekPattern.js');
const { GEORGIA_DAYS_REQUIRED } = await import(ROOT + '/src/academies/lamar/data/admin/georgiaCompliance.js');
const { gardenCalendar } = await import(ROOT + '/src/academies/lamar/data/gardening/gardenCalendar.js');

let pass = 0, fail = 0;
const ok = (n, c, e = '') => { if (c) pass++; else { fail++; console.log('  FAIL:', n, e); } };
const D = (s) => new Date(s + 'T12:00:00');

console.log('--- the holiday list itself ---');
const dates = H.SCHOOL_HOLIDAYS.map((h) => h.date);
ok('every date is YYYY-MM-DD', dates.every((d) => /^\d{4}-\d{2}-\d{2}$/.test(d)));
ok('every date is real', dates.every((d) => !Number.isNaN(D(d).getTime())));
ok('no duplicate dates', new Set(dates).size === dates.length);
ok('sorted ascending', dates.join() === [...dates].sort().join());
ok('every entry is named', H.SCHOOL_HOLIDAYS.every((h) => typeof h.name === 'string' && h.name.length > 2));

console.log('--- SINGLE DAYS, NEVER WEEKS: this is the parent\'s rule ---');
for (const h of H.SCHOOL_HOLIDAYS) {
  const d = D(h.date);
  if (d.getDay() === 0 || d.getDay() === 6) continue;
  for (const delta of [-1, 1]) {
    const n = new Date(d); n.setDate(d.getDate() + delta);
    if (n.getDay() === 0 || n.getDay() === 6) continue;
    ok(`the weekday ${delta < 0 ? 'before' : 'after'} ${h.name} is a school day`,
      isSchoolDay(n), n.toDateString());
  }
}
ok('no two weekday holidays are consecutive weekdays',
  !H.SCHOOL_HOLIDAYS.some((h, i) => {
    const next = H.SCHOOL_HOLIDAYS[i + 1]; if (!next) return false;
    const a = D(h.date), b = D(next.date);
    return (b - a) / 86400000 <= 3 && a.getDay() >= 1 && a.getDay() <= 5 && b.getDay() >= 1 && b.getDay() <= 5;
  }));

console.log('--- the two accessors agree ---');
for (const h of H.SCHOOL_HOLIDAYS) {
  const d = D(h.date);
  ok('isSchoolDay is false on ' + h.name, !isSchoolDay(d));
  if (d.getDay() >= 1 && d.getDay() <= 5) {
    ok('dayPattern says holiday on ' + h.name, dayPattern(d).kind === 'holiday', dayPattern(d).kind);
    ok('dayPattern names it: ' + h.name, dayPattern(d).holiday === h.name);
    ok('a holiday carries no subjects: ' + h.name, dayPattern(d).subjects.length === 0);
  } else {
    ok('a weekend holiday stays a weekend: ' + h.name, dayPattern(d).kind === 'weekend');
  }
}

function shift(dateStr, n) {
  const d = new Date(dateStr + 'T12:00:00');
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}
const nextDay = (d) => shift(d, 1);
const prevDay = (d) => shift(d, -1);

console.log('--- quarter spans ---');
for (const q of QUARTER_SPANS) {
  ok(q.id + ' starts on a school day', isSchoolDay(D(q.start)), q.start);
  ok(q.id + ' start is before its end', q.start < q.end);
}
for (let i = 1; i < QUARTER_SPANS.length; i++) {
  ok(QUARTER_SPANS[i].id + ' starts after ' + QUARTER_SPANS[i - 1].id + ' ends',
    QUARTER_SPANS[i].start > QUARTER_SPANS[i - 1].end);
}
ok('Q2 runs through Dec 31 — the December gap is closed',
  QUARTER_SPANS.find((q) => q.id === 'Q2').end === '2026-12-31');
ok('Q3 opens Jan 4, the first school day of the year',
  QUARTER_SPANS.find((q) => q.id === 'Q3').start === '2027-01-04');

// Mar 29 - Apr 2 is the year's one spring break, ruled on Aug 9 2026. It is a
// GAP ON PURPOSE, so it is pinned rather than closed: if either boundary drifts
// the break silently changes length, and a rest week that quietly became four
// days would show up as nothing but a schedule that felt wrong.
const q3 = QUARTER_SPANS.find((q) => q.id === 'Q3'), q4 = QUARTER_SPANS.find((q) => q.id === 'Q4');
const springBreak = schoolDaysBetween(nextDay(q3.end), prevDay(q4.start));
ok('spring break is exactly the 5 weekdays Mar 29 - Apr 2', springBreak === 5, springBreak + ' weekdays');
ok('Q3 ends Mar 26 and Q4 opens Apr 5', q3.end === '2027-03-26' && q4.start === '2027-04-05',
  q3.end + ' / ' + q4.start);

// Spring break is the ONLY gap between quarters. Any other unassigned weekday
// is a mistake — invisible until someone counts, and nobody counts.
ok('no OTHER unassigned weekday sits between two quarters',
  QUARTER_SPANS.slice(1).every((q, i) => {
    const prev = QUARTER_SPANS[i];
    if (q.id === 'Summer' || q.id === 'Q4') return true; // summer break, spring break
    return schoolDaysBetween(nextDay(prev.end), prevDay(q.start)) === 0;
  }));

// The last day of school. The gardening calendar closes Fri May 28 on the
// grounds that the year has ended; that claim and this date must not drift
// apart again.
ok('the school year ends Wed May 26 2027', q4.end === '2027-05-26', q4.end);

console.log('--- Georgia compliance ---');
const regular = QUARTER_SPANS.filter((q) => q.id !== 'Summer')
  .reduce((n, q) => n + schoolDaysBetween(q.start, q.end), 0);
console.log('  Aug-May instructional days:', regular, '· required:', GEORGIA_DAYS_REQUIRED);
ok('the Aug-May year clears Georgia\'s requirement without summer',
  regular >= GEORGIA_DAYS_REQUIRED, regular + ' vs ' + GEORGIA_DAYS_REQUIRED);
ok('holidays are actually being subtracted',
  schoolDaysBetween('2026-11-23', '2026-11-27') === 4, schoolDaysBetween('2026-11-23', '2026-11-27'));
ok('the week of Christmas still teaches four days',
  schoolDaysBetween('2026-12-21', '2026-12-25') === 4, schoolDaysBetween('2026-12-21', '2026-12-25'));

console.log('--- the garden calendar and the holiday list must agree ---');
// The gardening module has carried its OWN closed-Friday list since it was
// built, before schoolHolidays.js existed — and on Aug 9 2026 it was found to
// be closing Friday Nov 27 for a "Thanksgiving break" this family does not
// take. Two calendars, one of them wrong, and nothing checking. Now they are
// checked against each other in both directions.

// (a) no garden Friday carrying real work falls on a day off
const working = gardenCalendar.filter((g) => g.briefId && !isSchoolDay(D(g.date)));
ok('no garden BRIEF lands on a day off', working.length === 0, working.map((c) => c.date).join(','));

// (b) every closed row is closed for a reason the app can point at: it is a
//     holiday on the list, or it is past the end of the school year
const lastQuarterEnd = QUARTER_SPANS.filter((q) => q.id !== 'Summer').map((q) => q.end).sort().pop();
for (const row of gardenCalendar.filter((g) => g.closed)) {
  ok('closed garden Friday is justified: ' + row.date,
    H.isHoliday(row.date) || row.date >= lastQuarterEnd,
    row.closedReason);
  ok('a closed garden Friday carries no brief: ' + row.date, !row.briefId);
}

// (c) and the reverse — every Friday holiday inside the garden season IS closed.
//     Only Fridays matter here; the garden calendar has no other weekday.
const gardenStart = gardenCalendar[0].date, gardenEnd = gardenCalendar[gardenCalendar.length - 1].date;
for (const h of H.SCHOOL_HOLIDAYS) {
  if (D(h.date).getDay() !== 5) continue;
  if (h.date < gardenStart || h.date > gardenEnd) continue;
  const row = gardenCalendar.find((g) => g.date === h.date);
  ok(h.name + ' appears in the garden calendar', !!row, h.date);
  ok(h.name + ' is closed in the garden calendar', !!row && row.closed === true);
}

// (d) the drift that started all this
const nov27 = gardenCalendar.find((g) => g.date === '2026-11-27');
ok('Friday Nov 27 is OPEN — the day after Thanksgiving is a school day here',
  !!nov27 && !nov27.closed, nov27 && nov27.closedReason);
ok('and it is a real school day by the calendar too', isSchoolDay(D('2026-11-27')));

console.log('--- the list covers the year it is used for ---');
const lastEnd = QUARTER_SPANS[QUARTER_SPANS.length - 1].end;
ok('holidays are verified through the end of the school year',
  H.HOLIDAYS_VERIFIED_THROUGH >= lastEnd, H.HOLIDAYS_VERIFIED_THROUGH + ' vs ' + lastEnd);

console.log('\n--- the year as it now stands ---');
for (const q of QUARTER_SPANS) {
  const hs = holidaysBetween(q.start, q.end).map((h) => h.name);
  console.log('  ' + q.id.padEnd(7) + (q.start + ' → ' + q.end).padEnd(26) +
    String(schoolDaysBetween(q.start, q.end)).padStart(3) + ' days   ' + (hs.join(', ') || '—'));
}

console.log('\n--- ONE CALENDAR (audit item O-4) ---');
{
  /**
   * ---- FOUR CALENDARS, AND THE READING ONE HAD ITS OWN ----
   *
   * `readingPlan.js` carried a hand-written table of quarter boundaries as
   * month/day pairs. **Four of the five disagreed with QUARTER_SPANS:**
   *
   *     Q2      ended Dec 18   the year plan says Dec 31
   *     Q3      Jan 5 - Mar 31  the year plan says Jan 4 - Mar 26
   *     Q4      Apr 1 - May 22  the year plan says Apr 5 - May 26
   *     Summer  began Jun 1     the year plan says Jun 7
   *
   * Only Q1 matched — which is why nobody caught it. The quarter anyone would
   * check by hand was the one that agreed.
   *
   * The real cost: a Q4 reading plan started pacing his book on **Apr 2, three
   * days before the quarter existed**, and Summer a week early. Both quarters
   * lost a week when the boundaries were corrected, which means every plan
   * built for them had been dividing the book across weeks he was not in
   * school for.
   *
   * The doctrine was already written in that file, about the holidays sitting
   * two lines below: "Two lists of school breaks in two files is a drift bug
   * waiting to happen — the second one gets updated next year and the first
   * one doesn't." It was applied to the holidays and not to the boundaries
   * beside them.
   */
  const fs = await import('node:fs');
  const rp = await import(ROOT + '/src/lib/readingPlan.js');
  const src = fs.readFileSync(ROOT + '/src/lib/readingPlan.js', 'utf8');
  const code = src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

  ok('the reading plan keeps no second copy of the quarter boundaries',
    !/QUARTER_READING_WINDOWS/.test(code) && !/start: \[\d+, \d+\]/.test(code),
    'a hand-written month/day table is how the second calendar was built');
  ok('...it reads them from the year plan',
    /import \{ QUARTER_SPANS \} from '\.\/yearPlan\.js'/.test(code)
      && /QUARTER_SPANS\.find\(\(q\) => q\.batchLabel === quarterLabel\)/.test(code),
    'matched on the same label the Academic Center stores on every assignment');
  ok('...and still takes the breaks from the assignment scheduler',
    readsFromAcademy(code, 'EXCLUDED_RANGES'),
    'holidays come from one place — that half was always right');

  /** The behaviour: every reading week must fall inside its own quarter. */
  for (const q of QUARTER_SPANS) {
    const weeks = rp.readingWeeks(q.batchLabel);
    ok(`${q.id}: the reading plan has weeks at all`, weeks.length > 0, q.batchLabel);
    const strays = weeks.filter((w) => w < q.start || w > q.end);
    ok(`${q.id}: no reading week falls outside the quarter`, strays.length === 0,
      `${strays.join(', ')} — Q4 used to start three days before the quarter did`);
    const onBreak = weeks.filter((w) => H.isHoliday(D(w)));
    ok(`${q.id}: no reading week ends on a holiday`, onBreak.length === 0, onBreak.join(', '));
  }

  /** And a label nobody recognises produces nothing, rather than a guess. */
  ok('an unknown quarter label yields no plan, not an invented one',
    rp.readingWeeks('Q9 1999-2000').length === 0);
  ok('...and a book with no length still yields no plan',
    rp.buildReadingPlan({ totalUnits: null, quarter: QUARTER_SPANS[0].batchLabel }).length === 0,
    'NOTHING IS INVENTED — the UI asks her for the number instead of guessing');
}

console.log('\n' + pass + ' passed, ' + fail + ' failed');
if (fail) { console.log('\n' + fail + ' CHECK(S) FAILED'); process.exit(1); }
console.log('\nALL CHECKS PASSED');
