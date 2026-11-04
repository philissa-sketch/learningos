/**
 * The 2:15 block used to have to name the course that was actually in it,
 * because it could hold any one of several specialized subjects depending on
 * the day and the quarter.
 *
 * Guards the fix made Aug 9 2026 after the parent said, in her words: "I dont
 * understand the rotating block. Let's fix that to have the actual course that
 * will be there for the week."
 *
 * ---- AND THEN, NOV 3 2026, SHE RETIRED THE ROTATION ITSELF ----
 *
 * "i don't want aerospace robotics and tech to be rotating... I want them to
 * be daily. social studies should be daily as well." Social Studies had
 * already left the rotation that same day for its own block (block-5c);
 * Aerospace, Technology and Robotics followed it immediately after, each
 * getting a real block of its own (block-9, block-9b, block-9c). Every
 * `WEEK_PATTERN[d].subjects` list is empty now — there is nothing left for
 * `liveRotatingSubjects` to resolve, on any weekday, in any quarter.
 *
 * Sections 1-7 below used to assert WHICH subject the block resolved to on
 * which day. They now assert the opposite and simpler thing: nothing does,
 * because nothing shares a block any more. Section 8 (the 10:30 slot) was
 * already rewritten this way on Nov 3 for Social Studies and is unchanged.
 */
import './lib/academy-under-test.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
/**
 * A repo-relative path as a module URL.
 *
 * `await import(root + '/src/…')` worked everywhere it was ever run and could
 * never work on Windows: root is `C:\Users\…` there, so the string handed to
 * import() begins `C:` and Node rejects it as an unknown URL scheme —
 * ERR_UNSUPPORTED_ESM_URL_SCHEME, protocol 'c:'. pathToFileURL is the Node API
 * for exactly this; do not hand-build a file:// string, because a drive letter,
 * a space in a folder name and a backslash each break a different naive version.
 */
const moduleUrl = (rel) => pathToFileURL(path.join(root, rel)).href;

const {
  liveRotatingSubjects, rotatingBlockLabel, resolveBlockLabel, rotatingWeek,
  SHIPPED_ROTATING_LABELS, ROTATING_BLOCK_ID,
  liveMorningSubject, MORNING_BLOCK_ID
} = await import(moduleUrl('src/lib/rotatingBlock.js'));
const { defaultSchedule } = await import(moduleUrl('src/academies/lamar/data/schedule/defaultSchedule.js'));
const { WEEK_PATTERN } = await import(moduleUrl('src/academies/lamar/data/schedule/weekPattern.js'));
const { getCurrentQuarter } = await import(moduleUrl('src/lib/schoolQuarter.js'));
const { SUBJECT_LABELS } = await import(moduleUrl('src/academies/lamar/subjects.js'));

let pass = 0, fail = 0;
const ok = (name, cond, extra = '') => { if (cond) pass++; else { fail++; console.log('  FAIL:', name, extra); } };

// Khan rows as they really are: Social Studies runs on Khan in Q1 and Summer.
// (Aerospace/Technology/Robotics never need a Khan row to appear on their own
// block any more — they aren't competing with anyone for it.)
const KHAN = [
  ...Array.from({ length: 10 }, () => ({ subject: 'socialStudies', batchLabel: 'Q1 2026-2027' })),
  ...Array.from({ length: 6 }, () => ({ subject: 'socialStudies', batchLabel: 'Summer 2027' }))
];
const D = (y, m, d) => new Date(y, m - 1, d);

console.log('--- 1. WEEK_PATTERN names no rotating subject on any weekday ---');
for (const d of [1, 2, 3, 4, 5]) {
  ok(WEEK_PATTERN[d].label + ' has an empty subjects list',
    Array.isArray(WEEK_PATTERN[d].subjects) && WEEK_PATTERN[d].subjects.length === 0,
    JSON.stringify(WEEK_PATTERN[d].subjects));
}

console.log('--- 2. liveRotatingSubjects resolves to nothing, every weekday, every quarter ---');
for (const [y, m, d, q] of [[2026,8,10,'Q1'],[2026,11,9,'Q2'],[2027,2,8,'Q3'],[2027,4,5,'Q4'],[2027,6,7,'Summer']]) {
  for (const off of [0, 1, 2, 3, 4]) {
    const day = D(y, m, d + off);
    ok(`${q} ${WEEK_PATTERN[day.getDay()].label}: liveRotatingSubjects is empty`,
      liveRotatingSubjects(day, KHAN).length === 0,
      liveRotatingSubjects(day, KHAN).join(','));
  }
}
ok('empty even with no Khan rows supplied at all (there is nothing left to default to)',
  liveRotatingSubjects(D(2026, 8, 11), null).length === 0);

console.log('--- 3. labels: block-9 carries its own stored label now, same as any other block ---');
// rotatingBlockLabel is the DYNAMIC resolver — still callable, now dormant,
// because nothing lives in the block any more. It must say so honestly
// rather than guess an owner.
ok("rotatingBlockLabel itself is dormant — 'Catch-up' on an ordinary weekday",
  rotatingBlockLabel(D(2026, 8, 10), KHAN) === 'Catch-up',
  rotatingBlockLabel(D(2026, 8, 10), KHAN));
// resolveBlockLabel is what every real screen calls, and it is the one that
// matters: block-9 keeps ITS OWN stored label on every date, because the
// current shipped label ('Aerospace Engineering') is no longer on the
// known-dynamic-label list — there is nothing left to resolve.
const shipped = defaultSchedule.find((b) => b.id === ROTATING_BLOCK_ID);
ok("block-9's own shipped label is 'Aerospace Engineering'", shipped.label === 'Aerospace Engineering', shipped.label);
ok('...and it is NOT on the dynamic-resolution list any more — nothing needs resolving',
  !SHIPPED_ROTATING_LABELS.has(shipped.label), shipped.label);
for (const [y, m, d] of [[2026,8,10],[2026,8,12],[2026,11,10],[2027,4,8]]) {
  ok(`resolveBlockLabel(block-9) is "Aerospace Engineering" on ${y}-${m}-${d}, regardless of date`,
    resolveBlockLabel(shipped, D(y, m, d), KHAN) === 'Aerospace Engineering',
    resolveBlockLabel(shipped, D(y, m, d), KHAN));
}
// A parent's own rename still wins, same rule every block follows.
const hers = { ...shipped, label: 'Lamar Engineering Hour' };
ok('a parent-typed label is still left alone', resolveBlockLabel(hers, D(2026, 8, 10), KHAN) === 'Lamar Engineering Hour');
for (const b of defaultSchedule.filter((x) => x.id !== ROTATING_BLOCK_ID && x.id !== MORNING_BLOCK_ID)) {
  ok('non-dynamic block untouched: ' + b.id, resolveBlockLabel(b, D(2026, 8, 10), KHAN) === b.label);
}
// Friday's label is still generated dynamically — it is still the open day,
// just no longer naming a rotating subject that "ran out of Tuesdays"
// (there are none left to name).
const friLabel = rotatingBlockLabel(D(2026, 8, 14), KHAN);
ok('Friday still reads as the open day', /^Open/.test(friLabel), friLabel);
ok('Friday still names the long Khan units, which are the reason it exists',
  /Khan/.test(friLabel), friLabel);
ok('Friday never names a rotating subject any more — there is none to name',
  !/Aerospace|Technology|Robotics/.test(friLabel), friLabel);
ok('weekend says no school', rotatingBlockLabel(D(2026, 8, 15), KHAN) === 'No school');

console.log('--- 4. the SHIPPED_ROTATING_LABELS list still matches the store migration ---');
// Kept for the labels still on it (every wording this app has EVER shipped
// for block-9, including the current Nov-3-before-derotation one) — the
// store must still know how to rename a schedule still carrying any of them.
const store = fs.readFileSync(root + '/src/store/useAppStore.js', 'utf8');
const legacy = store.slice(store.indexOf('LEGACY_BLOCK_9_LABELS = new Set('));
for (const label of SHIPPED_ROTATING_LABELS) {
  ok('store knows legacy label: ' + label.slice(0, 40), legacy.includes(label));
}

console.log('--- 5. the printed week ---');
const week = rotatingWeek(D(2026, 8, 10), KHAN);
ok('five weekdays', week.length === 5);
ok('no weekday resolves to a slash list', week.every((d) => !d.label.includes(' / ')));
console.log();
for (const d of week) console.log('   ', d.weekday.padEnd(10), d.label);

console.log('--- 6. the dashboard no longer asks the rotation which subject is live today ---');
{
  const dash = fs.readFileSync(root + '/src/components/Dashboard/MissionControlDashboard.jsx', 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '').replace(/\{\/\*[\s\S]*?\*\/\}/g, '').replace(/^\s*\/\/.*$/gm, '');
  /**
   * `todaysSubjects` used to ask `liveRotatingSubjects` which ONE subject
   * owned today's block. Aerospace, Technology and Robotics each have their
   * own block now, every day, so this reads a fixed list instead
   * (`DAILY_SPECIALIZED_SUBJECTS`, shared with scheduledMinutes.js and
   * DailyView.jsx so the three screens can never disagree again).
   */
  ok('todaysSubjects is built from the fixed daily list, not a per-day rotation',
    /todaysSubjects\s*=\s*todayPattern\.kind === 'core'\s*\?\s*\[\s*\.\.\.DAILY_SPECIALIZED_SUBJECTS/.test(dash),
    'a per-day rotation would re-introduce "only one subject is live today" for subjects that are now daily');
  ok('...and it stays the same list whether or not the day is flex (Friday)',
    !/todayPattern\.flex\s*\?\s*subjectsBehindThisWeek\s*\n?\s*:\s*\[/.test(dash),
    'Friday runs Aerospace/Technology/Robotics in their own blocks too now, same as Monday-Thursday');
  ok('isOffTimetable no longer asks who owns the rotating block',
    /const isOffTimetable = \(\) => false;/.test(dash),
    'nothing can be off its own timetable now that nothing rotates');
}

console.log('\n--- 7. the second rotating slot, at 10:30 — RETIRED Nov 3, 2026 ---');
{
  /**
   * This whole mechanism — Social Studies borrowing Science's 10:30 block on
   * Tuesday (Aug 29 2026) and then Thursday too (Sept 16 2026) — is gone.
   * The parent caught the reason directly: Science's own Khan row never
   * deferred when another subject became the "morning owner", so Science and
   * whichever subject had borrowed the slot both ended up stamped with the
   * same clock time. "Why are all these subjects in the same time slot?"
   *
   * The real fix was not a defer-harder patch on this mechanism, it was
   * removing the reason for it: Social Studies now has its own real,
   * every-day block (block-5c), so nothing ever needs to borrow Science's
   * slot again. `liveMorningSubject` and `MORNING_BLOCK_ID` stay in the
   * codebase rather than being ripped out — a future subject may genuinely
   * need a second rotating slot of its own — but with every `morningSubjects`
   * list empty, this function is permanently dormant: it must return null for
   * every day, with no exceptions.
   */
  const rows = ['aerospace', 'technology', 'socialStudies', 'science']
    .map((x) => ({ subject: x, batchLabel: 'Q1 2026-2027' }));
  const day = (i) => new Date(2026, 7, 31 + i);

  for (const [i, name] of [[0, 'Monday'], [1, 'Tuesday'], [2, 'Wednesday'], [3, 'Thursday'], [4, 'Friday']]) {
    ok(name + ' 10:30 is dormant — Science owns the whole day',
      liveMorningSubject(day(i), rows) === null,
      String(liveMorningSubject(day(i), rows)));
  }
  ok('Social Studies no longer shows up at 10:30 at all',
    liveMorningSubject(day(1), rows) !== 'socialStudies' && liveMorningSubject(day(3), rows) !== 'socialStudies');
  ok('Social Studies owns its own block-5c instead, every day',
    liveRotatingSubjects(day(1), rows).includes('socialStudies') === false,
    'it is off the rotation entirely now, not just off the 10:30 slot');

  const b5 = { id: MORNING_BLOCK_ID, label: 'Science' };
  ok('the 10:30 block always resolves to its own label now',
    resolveBlockLabel(b5, day(1), rows) === 'Science' && resolveBlockLabel(b5, day(3), rows) === 'Science',
    resolveBlockLabel(b5, day(1), rows) + ' / ' + resolveBlockLabel(b5, day(3), rows));
  ok('...and a block she renamed herself is still left alone',
    resolveBlockLabel({ id: MORNING_BLOCK_ID, label: 'My Science Time' }, day(1), rows) === 'My Science Time',
    'the same rule every other block rename follows');
}

console.log('\n' + pass + ' passed, ' + fail + ' failed');
if (fail) { console.log('\n' + fail + ' CHECK(S) FAILED'); process.exit(1); }
console.log('\nALL CHECKS PASSED');
