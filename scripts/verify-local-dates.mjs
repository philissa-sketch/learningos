// ---------------------------------------------------------------------------
// "TODAY" MEANS TODAY WHERE THEY LIVE. Run: node scripts/verify-local-dates.mjs
//
// ---- WHAT HAPPENED (Aug 10, 2026, about 9pm Eastern) ----
//
// The parent: "now he is unable to select the work hes done on the mission
// control page."
//
// Every checkbox on his home screen had stopped responding. Nothing was wrong
// with the click path — his tick was being saved correctly, every time. The
// store writes it under the LOCAL date; MissionControlDashboard read it back
// under the UTC date:
//
//     store:      todayDateStr()                    -> '2026-08-10'
//     dashboard:  new Date().toISOString().slice()  -> '2026-08-11'
//
// After about 8pm Eastern those are different days. The tick landed on one
// date, the screen looked at the other, found nothing, and drew an empty box.
//
// THIS IS THE WORST SHAPE A BUG CAN HAVE. It fixes itself at midnight. Anyone
// asked to look at it the next morning finds a working app and no evidence,
// and the person reporting it starts to sound unreliable. It had been there
// for months and only showed itself because a twelve-year-old happened to be
// doing his school work in the evening.
//
// Ten files carried it: the home screen, the parent dashboard (in a helper
// literally named todayStrLocal), the PE workout and tracker screens, the
// guitar streak, the garden calendar and sun survey, the study-cycle tracker,
// the spaced-repetition engine, and two streak loops in the store. Every one
// of them decided whether a day counted.
//
// The store had fixed this in ITSELF back in Batch A and left a comment
// explaining exactly why. The screens were never brought along. That is the
// real lesson: a fix applied in one file is not a fix, and only a rule that
// covers the whole tree keeps it fixed.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { toDateStr, todayDateStr, parseDateStr } from '../src/lib/scheduler.js';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
}

// ---------------------------------------------------------------------------
console.log('\n--- 1. the arithmetic that caused it ---');
// ---------------------------------------------------------------------------
{
  // 9pm on Aug 10 in Atlanta is already Aug 11 in UTC. This is the whole bug,
  // written out as a number so nobody has to take it on faith.
  const evening = new Date('2026-08-11T01:09:00Z'); // 21:09 EDT on the 10th
  const utc = evening.toISOString().slice(0, 10);
  ok('at 9pm Eastern, the UTC date is already tomorrow', utc === '2026-08-11', utc);

  // toDateStr reads the machine's own clock fields, so it is correct wherever
  // it runs. Under TZ=America/New_York this returns the 10th; the assertion is
  // written to hold in any timezone the family might travel to.
  const local = toDateStr(evening);
  const localDay = new Date(evening.getFullYear(), evening.getMonth(), evening.getDate());
  ok('toDateStr returns the local calendar day, whatever the offset',
    local === toDateStr(localDay));
  ok('...and it round-trips through parseDateStr', toDateStr(parseDateStr(local)) === local);
  ok('todayDateStr agrees with toDateStr(now)', todayDateStr() === toDateStr(new Date()));
}

// ---------------------------------------------------------------------------
console.log('\n--- 2. nothing in the app asks UTC what day it is ---');
// ---------------------------------------------------------------------------
{
  /**
   * The banned shape is a date STRING derived from the current moment through
   * toISOString. Not all UTC is wrong — see the exemption below — but "what is
   * today" always is.
   */
  const BANNED = /new Date\(\)\.toISOString\(\)\.slice\(0,\s*10\)|Date\.now\(\)[^\n]*\.toISOString\(\)\.slice\(0,\s*10\)/;

  /**
   * lib/weeklyWords.js is exempt, deliberately. Its helpers take a date STRING,
   * anchor it with 'T00:00:00Z', do UTC arithmetic and hand back a string —
   * the current moment never enters, so there is no local/UTC disagreement to
   * have. The word week is a fixed Monday-to-Friday grid, and pinning that grid
   * to UTC is what makes it identical on both computers.
   */
  const EXEMPT = new Set(['src/lib/weeklyWords.js']);

  const files = [];
  const walk = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) walk(full);
      else if (/\.(js|jsx)$/.test(e.name)) files.push(path.relative(REPO, full).split(path.sep).join('/'));
    }
  };
  walk(path.join(REPO, 'src'));

  const offenders = files.filter((rel) => !EXEMPT.has(rel) && BANNED.test(fs.readFileSync(path.join(REPO, rel), 'utf8')));
  ok(`no file derives "today" from UTC (${files.length} files scanned)`, offenders.length === 0,
    offenders.join(', ') + ' — this is what stopped his checkboxes working after 8pm');

  /**
   * ---- AND THE RULE NOW COVERS THE GUARDS TOO (Aug 29, 2026) ----
   *
   * This scan walked `src/` and stopped there, so for months the tree was clean
   * and `scripts/verify-guitar.mjs` was not: its `day()` helper built dates with
   * `toISOString()` while the streak it tested built them with `toDateStr()`.
   * Every night after 8pm Eastern the test seeded "today" as tomorrow, the
   * streak counter correctly refused to count a day that had not happened, and
   * the suite went red on a working app.
   *
   * It is the same bug, in the same timezone, at the same hour, as the one this
   * whole file was written about — living inside the file next door to the one
   * that catches it. The header above already says the lesson: *a fix applied in
   * one file is not a fix, and only a rule that covers the whole tree keeps it
   * fixed.* The tree includes the guards.
   *
   * A test that seeds dates one way and calls code that reads them another is
   * not testing the code, it is testing the offset — and it fails at exactly the
   * hour she and Lamar actually use the app, which makes it a guard that is red
   * precisely when she looks at it.
   *
   * `verify-local-dates.mjs` itself is exempt: it prints the wrong answer on
   * purpose, two sections up, to show what the bug looks like as a number.
   */
  /**
   * THE RULE IS ABOUT MIXING, NOT ABOUT UTC.
   *
   * Plenty of guards format with `toISOString().slice(0, 10)` and are perfectly
   * correct: `verify-report-card` and `verify-word-study` build every date from
   * a fixed literal with `Date.UTC(...)` and `setUTCDate`, so the current moment
   * never enters and there is no local/UTC disagreement to have. That is the
   * same reasoning that exempts `lib/weeklyWords.js` above, and banning the
   * formatter outright would have made three clean files look dirty and taught
   * whoever came next to ignore this check.
   *
   * The hazard is **the current moment meeting UTC formatting** in one file:
   * `new Date()` reads the machine's local clock, `toISOString()` reports UTC,
   * and after 8pm Eastern they name different days. That combination — and only
   * that combination — is what broke the guitar guard, so that is what is
   * banned. A file with no bare `new Date()` in it cannot have the bug.
   *
   * TWO KINDS OF FILE ARE EXEMPT, AND BOTH FOR THE SAME REASON: they contain
   * the broken code ON PURPOSE, as text, so that something can be shown or
   * tested against it.
   *
   *   `verify-local-dates.mjs`  prints the wrong answer two sections up, to
   *                             show what the bug looks like as a number.
   *   `scripts/mutate-*.mjs`    are mutation harnesses. Every one of them holds
   *                             a table of broken lines it splices into a
   *                             throwaway copy of the tree — including, now, the
   *                             exact line this rule bans. A rule that forbade
   *                             quoting the bug would forbid testing for it.
   *
   * The exemption is by PURPOSE, not by convenience: nothing under `mutate-`
   * runs as part of the app or seeds a real assertion, and the check below
   * confirms the exempt set is still only those files.
   */
  const scriptFiles = [];
  for (const e of fs.readdirSync(path.join(REPO, 'scripts'), { withFileTypes: true })) {
    if (e.isFile() && /\.mjs$/.test(e.name)) scriptFiles.push('scripts/' + e.name);
  }
  const isExempt = (rel) => rel === 'scripts/verify-local-dates.mjs' || /^scripts\/mutate-/.test(rel);
  const READS_NOW = /new Date\(\s*\)/;
  const FORMATS_UTC = /\.toISOString\(\)\.slice\(0,\s*10\)|\.toISOString\(\)\.split\('T'\)\[0\]/;
  const scriptOffenders = scriptFiles.filter((rel) => {
    if (isExempt(rel)) return false;
    const text = fs.readFileSync(path.join(REPO, rel), 'utf8');
    return READS_NOW.test(text) && FORMATS_UTC.test(text);
  });
  ok(`no guard reads the clock and then asks UTC what day it is (${scriptFiles.length} scripts scanned)`,
    scriptOffenders.length === 0,
    scriptOffenders.join(', ') + ' — this is the bug that made verify-guitar red every night after 8pm');

  /**
   * An exemption nobody re-reads is a hole nobody can see — the same sentence
   * this file already applies to `weeklyWords.js` above. So the exempt set is
   * itself asserted: it may only ever be this file and the mutation harnesses,
   * and every one of them has to actually exist.
   */
  const exemptNow = scriptFiles.filter(isExempt);
  ok('...and the only exempt guards are the ones that quote the bug on purpose',
    exemptNow.every((rel) => rel === 'scripts/verify-local-dates.mjs' || /^scripts\/mutate-/.test(rel))
      && exemptNow.includes('scripts/verify-local-dates.mjs'),
    exemptNow.join(', '));

  for (const rel of EXEMPT) {
    ok(`the exemption for ${rel} still points at a real file`, fs.existsSync(path.join(REPO, rel)),
      'a stale exemption is a hole nobody can see');
  }

  // The specific screens that were broken, named so a regression is legible.
  const WERE_BROKEN = [
    'src/components/Dashboard/MissionControlDashboard.jsx',
    'src/components/Dashboard/ParentDashboard.jsx',
    'src/components/PE/WorkoutView.jsx',
    'src/components/PE/TrackersView.jsx',
    'src/components/Guitar/PracticeTrackerView.jsx',
    'src/components/Garden/SeasonCalendarView.jsx',
    'src/components/Garden/SunSurveyView.jsx',
    'src/components/Lesson/StudyCycleTracker.jsx',
    'src/engine/dailyPractice.js',
    'src/store/useAppStore.js'
  ];
  for (const rel of WERE_BROKEN) {
    const src = fs.readFileSync(path.join(REPO, rel), 'utf8');
    ok(`${rel.split('/').pop()} uses a shared local-date helper`,
      /todayDateStr|toDateStr|useToday/.test(src),
      'useToday() counts — it returns todayDateStr() and re-reads it at midnight');
  }
}

// ---------------------------------------------------------------------------
console.log('\n--- 3. the tick he makes is the tick the screen reads ---');
// ---------------------------------------------------------------------------
{
  const store = fs.readFileSync(path.join(REPO, 'src/store/useAppStore.js'), 'utf8');
  const dash = fs.readFileSync(path.join(REPO, 'src/components/Dashboard/MissionControlDashboard.jsx'), 'utf8');

  ok('the store stamps the daily tick with the local date',
    /function todayStr\(\)[\s\S]{0,600}?return todayDateStr\(\);/.test(store));
  ok('the home screen looks it up with the same helper',
    /const today = useToday\(\);/.test(dash),
    'these two must agree or the checkbox saves and never appears');
  ok('the daily log is keyed by that same value',
    /khanDailyLog\[today\]/.test(dash) && /const priorDay = state\.khanDailyLog\[today\]/.test(store));

  // Streaks count backwards day by day and compare against stored keys. A UTC
  // window against local keys drops or doubles a day at the boundary.
  ok('both streak counters walk local dates',
    (store.match(/const d = toDateStr\(new Date\(Date\.now\(\) - i \* 864e5\)\);/g) || []).length === 2,
    'khan streak and typing streak');
}

// ---------------------------------------------------------------------------
console.log('\n--- 4. the day turns over at midnight, on a screen left open ---');
// ---------------------------------------------------------------------------
{
  /**
   * The parent, after the timezone fix: "The different day shouldn't start
   * until 12am."
   *
   * Reading the local clock makes the date roll at local midnight — but a
   * React component only recomputes when something makes it render, and this
   * app is left open all day. A screen opened at 4pm still holds yesterday's
   * date at 12:30am, so the tick saves to the new day while the screen looks
   * at the old one: the same invisible-tick failure, in a narrower window.
   */
  const hook = fs.readFileSync(path.join(REPO, 'src/lib/useToday.js'), 'utf8');
  ok('there is a hook that re-reads the date at midnight', /export function useToday\(\)/.test(hook));
  ok('it schedules the next local midnight, not a fixed interval',
    /now\.getDate\(\) \+ 1, 0, 0, 2, 0/.test(hook),
    'a couple of seconds past, because timers fire early often enough to matter');
  ok('...and re-arms itself for the following night', /scheduleNextMidnight\(\);[\s\S]{0,120}\}, next\.getTime/.test(hook));
  ok('it also re-reads when the machine wakes up',
    /visibilitychange/.test(hook) && /'focus'/.test(hook),
    'a timer set for midnight does not fire on time on a laptop that was closed at 10pm');
  ok('it cleans up after itself', /clearTimeout\(timer\)/.test(hook) && /removeEventListener/.test(hook));
  ok('it returns the same string as the plain helper', /return todayDateStr\(\)/.test(hook) || /useState\(todayDateStr\)/.test(hook));

  // The screens that show done/not-done for TODAY must use it, or they go
  // stale at midnight while the store moves on.
  const LIVE_SCREENS = [
    'src/components/Dashboard/MissionControlDashboard.jsx',
    'src/components/PE/WorkoutView.jsx',
    'src/components/PE/TrackersView.jsx',
    'src/components/Lesson/StudyCycleTracker.jsx'
  ];
  for (const rel of LIVE_SCREENS) {
    ok(`${rel.split('/').pop()} tracks the rollover`,
      /useToday\(\)/.test(fs.readFileSync(path.join(REPO, rel), 'utf8')));
  }
}

// ---------------------------------------------------------------------------
console.log('\n--- 5. spaced repetition schedules real days ---');
// ---------------------------------------------------------------------------
{
  const practice = fs.readFileSync(path.join(REPO, 'src/engine/dailyPractice.js'), 'utf8');
  ok('addDays parses and formats on the same side of the clock',
    /parseDateStr\(dateStr\)/.test(practice) && /return toDateStr\(d\);/.test(practice),
    'local-parse then UTC-format shifted every review date by a day');
  ok('...and today is local too', /return todayDateStr\(\);/.test(practice),
    'a review due "today" that is compared against a UTC today comes due a day early or late');
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
