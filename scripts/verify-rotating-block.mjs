/**
 * The 2:15 block must name the course that is actually in it.
 *
 * Guards the fix made Aug 9 2026 after the parent said, in her words: "I dont
 * understand the rotating block. Let's fix that to have the actual course that
 * will be there for the week."
 */
import './lib/academy-under-test.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const {
  liveRotatingSubjects, rotatingBlockLabel, resolveBlockLabel, rotatingWeek,
  SHIPPED_ROTATING_LABELS, ROTATING_BLOCK_ID,
  liveMorningSubject, MORNING_BLOCK_ID
} = await import(root + '/src/lib/rotatingBlock.js');
const { defaultSchedule } = await import(root + '/src/academies/lamar/data/schedule/defaultSchedule.js');
const { WEEK_PATTERN } = await import(root + '/src/academies/lamar/data/schedule/weekPattern.js');
const { getCurrentQuarter } = await import(root + '/src/lib/schoolQuarter.js');
const { SUBJECT_LABELS } = await import(root + '/src/academies/lamar/subjects.js');

let pass = 0, fail = 0;
const ok = (name, cond, extra = '') => { if (cond) pass++; else { fail++; console.log('  FAIL:', name, extra); } };

// Khan rows as they really are: Social Studies runs on Khan in Q1 and Summer.
const KHAN = [
  ...Array.from({ length: 10 }, () => ({ subject: 'socialStudies', batchLabel: 'Q1 2026-2027' })),
  ...Array.from({ length: 6 }, () => ({ subject: 'socialStudies', batchLabel: 'Summer 2027' }))
];
const D = (y, m, d) => new Date(y, m - 1, d);

// ONE SUBJECT A DAY SINCE AUG 9 2026. These used to assert TWO subjects on
// Tuesday and Thursday. The parent: "we have social studies and tech on the
// same 45min slot. I don't think that will work." Every core day now resolves
// to exactly one subject with the whole 45 minutes.
console.log('--- Q1: Technology owns both its days while Social Studies is Khan-only ---');
const q1Tue = liveRotatingSubjects(D(2026, 8, 11), KHAN);
ok('Q1 Tuesday is Technology alone', q1Tue.length === 1 && q1Tue[0] === 'technology', q1Tue.join(','));
const q1Thu = liveRotatingSubjects(D(2026, 8, 13), KHAN);
ok('Q1 Thursday is Technology too — Social Studies has no Q1 lessons to teach here',
  q1Thu.length === 1 && q1Thu[0] === 'technology', q1Thu.join(','));

console.log('--- Q2 onward: Thursday hands back to Social Studies ---');
const q2Thu = liveRotatingSubjects(D(2026, 11, 12), KHAN);
ok('Q2 Thursday is Social Studies alone', q2Thu.length === 1 && q2Thu[0] === 'socialStudies', q2Thu.join(','));
const q2Tue = liveRotatingSubjects(D(2026, 11, 10), KHAN);
ok('Q2 Tuesday is still Technology', q2Tue.length === 1 && q2Tue[0] === 'technology', q2Tue.join(','));

console.log('--- Q4: Robotics replaces Technology on Tuesday ---');
const q4Tue = liveRotatingSubjects(D(2027, 4, 6), KHAN);
ok('Q4 Tuesday is Robotics alone', q4Tue.length === 1 && q4Tue[0] === 'robotics', q4Tue.join(','));
const q4Thu = liveRotatingSubjects(D(2027, 4, 8), KHAN);
ok('Q4 Thursday is Social Studies alone', q4Thu.length === 1 && q4Thu[0] === 'socialStudies', q4Thu.join(','));

// NEVER TWO. That is the whole change — two subjects in one 45-minute block was
// the thing the parent called out. Zero is legitimate and must stay legitimate:
// a holiday resolves to none, and Summer's Tue/Thu genuinely have no rotating
// lessons. So the invariant asserted everywhere is "at most one", and "exactly
// one" is asserted only where a subject really is scheduled.
console.log('--- no core day ever resolves to two subjects ---');
for (const [y, m, d, q] of [[2026,8,10,'Q1'],[2026,11,9,'Q2'],[2027,2,8,'Q3'],[2027,4,5,'Q4'],[2027,6,7,'Summer']]) {
  for (const off of [0, 1, 2, 3, 4]) {
    const day = D(y, m, d + off);
    const live = liveRotatingSubjects(day, KHAN);
    ok(`${q} ${WEEK_PATTERN[day.getDay()].label}: never two subjects in one block`,
      live.length <= 1, live.join(','));
  }
  // Friday owns no subject in any quarter — that is what keeps it open.
  ok(`${q} Friday owns no subject — it is the open day`,
    liveRotatingSubjects(D(y, m, d + 4), KHAN).length === 0);
}

console.log('--- and it is exactly one on every day that has lessons ---');
for (const [y, m, d, q, label] of [
  [2026, 8, 10, 'Q1', 'Monday'], [2026, 8, 11, 'Q1', 'Tuesday'],
  [2026, 8, 12, 'Q1', 'Wednesday'], [2026, 8, 13, 'Q1', 'Thursday'],
  [2026, 11, 9, 'Q2', 'Monday'], [2026, 11, 10, 'Q2', 'Tuesday'],
  [2026, 11, 12, 'Q2', 'Thursday'],
  [2027, 2, 8, 'Q3', 'Monday'], [2027, 2, 9, 'Q3', 'Tuesday'], [2027, 2, 11, 'Q3', 'Thursday'],
  [2027, 4, 5, 'Q4', 'Monday'], [2027, 4, 6, 'Q4', 'Tuesday'], [2027, 4, 8, 'Q4', 'Thursday'],
  [2027, 6, 7, 'Summer', 'Monday']
]) {
  const live = liveRotatingSubjects(D(y, m, d), KHAN);
  ok(`${q} ${label} names exactly one course`, live.length === 1, live.join(','));
}

console.log('--- Mon/Wed is one subject, with the whole 45 minutes ---');
for (const [y, m, d] of [[2026,8,10],[2026,11,9],[2027,2,8],[2027,4,5]]) {
  const live = liveRotatingSubjects(D(y, m, d), KHAN);
  ok(`${y}-${m}-${d} Monday is Aerospace alone`, live.length === 1 && live[0] === 'aerospace', live.join(','));
}

console.log('--- labels ---');
ok('Monday label names the course', rotatingBlockLabel(D(2026, 8, 10), KHAN) === 'Aerospace Engineering',
  rotatingBlockLabel(D(2026, 8, 10), KHAN));
ok('no label still contains a slash list', !rotatingBlockLabel(D(2026, 8, 11), KHAN).includes('STEM Project'));
// FRIDAY NAMED THE GARDEN UNTIL AUG 9 2026. Gardening moved after school, so
// the garden must NOT be in this label any more — and Friday must read as open,
// which is what protects the overflow the Tue/Thu split depends on.
const friLabel = rotatingBlockLabel(D(2026, 8, 14), KHAN);
ok('Friday reads as the open day', /^Open/.test(friLabel), friLabel);
ok('Friday no longer names the garden — it is after school now',
  !/Gardening/i.test(friLabel), friLabel);
ok('Friday names the long Khan units, which are the reason it exists',
  /Khan/.test(friLabel), friLabel);
/**
 * ---- ASSERT THE PROPERTY, NOT THE ANSWER (rewritten Aug 20, 2026) ----
 *
 * This used to read: `Q1 Friday names Khan-only Social Studies`. It was true
 * when written and it is false now, for the best possible reason — Social
 * Studies OWNS WEDNESDAY in Q1 since the parent reallocated the block, so it
 * is no longer a homeless subject that Friday has to advertise.
 *
 * The check was encoding an answer. The rule it meant to protect is:
 *
 *     a subject that is live this quarter and owns no weekday must be named
 *     on Friday, or it is invisible on the schedule
 *
 * — which is the bug this project shipped twice, and a third time in the
 * student's own words: "he has social studies to complete but it's not on
 * Today's routine." That rule is quarter-independent and survives her moving
 * subjects around, which an answer never can.
 */
{
  const ROTATING = ['aerospace', 'technology', 'socialStudies', 'robotics'];
  for (const [qLabel, anchor] of [
    ['Q1', D(2026, 8, 14)], ['Q2', D(2026, 11, 20)],
    ['Q3', D(2027, 2, 19)], ['Q4', D(2027, 5, 14)]
  ]) {
    // Who owns a weekday this quarter, asked of the week the Friday sits in.
    const owners = new Set();
    for (let i = 1; i <= 5; i += 1) {
      const day = new Date(anchor);
      day.setDate(day.getDate() - 5 + i);
      const w = liveRotatingSubjects(day, KHAN)[0];
      if (w) owners.add(w);
    }
    // Who has real work this quarter but no day of their own.
    const batch = getCurrentQuarter(anchor).batchLabel;
    const khanLive = new Set(KHAN.filter((a) => a.batchLabel === batch).map((a) => a.subject));
    const homeless = ROTATING.filter(
      (s) => khanLive.has(s) && !owners.has(s)
    );
    const label = rotatingBlockLabel(anchor, KHAN);
    const named = homeless.every((s) => label.includes(SUBJECT_LABELS[s] || s));
    ok(`${qLabel} Friday names every live subject that owns no weekday`,
      named, `homeless=[${homeless}] label="${label}"`);
    // And the converse: it must not advertise a subject that already has a day.
    const doubleBooked = [...owners].filter((s) => label.includes(SUBJECT_LABELS[s] || s));
    ok(`${qLabel} Friday does not re-advertise a subject that owns a weekday`,
      doubleBooked.length === 0,
      `already owns a day: [${doubleBooked}] label="${label}"`);
  }
}
ok('weekend says no school', rotatingBlockLabel(D(2026, 8, 15), KHAN) === 'No school');

console.log('--- never blank, never wrong when data is missing ---');
for (const day of [D(2026,8,11), D(2026,11,10), D(2027,2,9), D(2027,4,8), D(2027,6,8)]) {
  ok('label is non-empty with no Khan rows: ' + day.toDateString(), (rotatingBlockLabel(day, null) || '').length > 0);
  // WITHOUT KHAN ROWS THIS USED TO SHOW THE WHOLE ROTATION. It cannot any more
  // — the whole point is one subject in the block — so the fallback narrowed to
  // the day's FIRST preference rather than all of them. Still never blank.
  ok('a subject is still named with no Khan rows: ' + day.toDateString(),
    liveRotatingSubjects(day, null).length === 1,
    liveRotatingSubjects(day, null).join(','));
}

console.log('--- the parent\'s own wording always wins ---');
const shipped = defaultSchedule.find((b) => b.id === ROTATING_BLOCK_ID);
ok('the current shipped default is on the known-shipped list', SHIPPED_ROTATING_LABELS.has(shipped.label), shipped.label);
ok('a shipped label IS resolved', resolveBlockLabel(shipped, D(2026, 8, 10), KHAN) === 'Aerospace Engineering');
const hers = { ...shipped, label: 'Lamar Engineering Hour' };
ok('a parent-typed label is NOT resolved', resolveBlockLabel(hers, D(2026, 8, 10), KHAN) === 'Lamar Engineering Hour');
for (const b of defaultSchedule.filter((x) => x.id !== ROTATING_BLOCK_ID)) {
  ok('non-rotating block untouched: ' + b.id, resolveBlockLabel(b, D(2026, 8, 10), KHAN) === b.label);
}

console.log('--- kept in sync with the store migration ---');
const store = fs.readFileSync(root + '/src/store/useAppStore.js', 'utf8');
const legacy = store.slice(store.indexOf('LEGACY_BLOCK_9_LABELS = new Set('));
for (const label of SHIPPED_ROTATING_LABELS) {
  if (label === shipped.label) continue;
  ok('store knows legacy label: ' + label.slice(0, 30), legacy.includes(label));
}

console.log('--- the printed week ---');
const week = rotatingWeek(D(2026, 8, 10), KHAN);
ok('five weekdays', week.length === 5);
ok('no weekday resolves to a slash list', week.every((d) => !d.label.includes(' / ')));
console.log();
for (const d of week) console.log('   ', d.weekday.padEnd(10), d.label);

// ---------------------------------------------------------------------------
// FRIDAY, THE CATCH-UP DAY, MUST ACTUALLY HAVE SOMETHING ON IT.
//
// Found Aug 12 2026, answering the parent's question about a missed field-trip
// day: "they will stay the same correct except the ones that changes
// throughout the week ex aerospace?"
//
// Friday is `kind: 'core'` with `subjects: []` — deliberately empty, because a
// fixed subject there would take the day back off the overflow that the
// Tue/Thu one-subject-per-day split depends on. The dashboard filtered
// `allSubjects` against that empty list, so Friday's `todaysSubjects` came out
// EMPTY: no Start Here card, no Aerospace / Technology / Social Studies /
// Robotics row, and no Social Studies or Technology Khan row.
//
// The day that exists to absorb a missed Monday had nothing on it to absorb
// with. `flex` is the flag that separates "this day names its subject" from
// "this day takes whatever is behind".
// ---------------------------------------------------------------------------
console.log('--- friday shows everything, because it is the overflow day ---');
{
  const dash = fs.readFileSync(root + '/src/components/Dashboard/MissionControlDashboard.jsx', 'utf8');
  ok('a flex day is not filtered down to its (empty) subject list',
    /todayPattern\.kind === 'core' && !todayPattern\.flex/.test(dash));
  ok('...and Friday is still the flex day in the pattern',
    WEEK_PATTERN[5].flex === true && WEEK_PATTERN[5].subjects.length === 0);
  const { subjectsForDay } = await import(root + '/src/academies/lamar/data/schedule/weekPattern.js');
  ok('...so subjectsForDay(Friday) is empty and the dashboard must not filter on it',
    subjectsForDay(D(2026, 8, 14)).length === 0);
}

// ---------------------------------------------------------------------------
// THE BOARD AND THE BLOCK MUST READ THE SAME ORDER FOR THE SAME DAY.
//
// The parent, Aug 26 2026: **"What day does aerospace lesson supposed to run?
// it doesn't make any sense to put that warning on the project."** Her screen
// showed, on a WEDNESDAY:
//
//     START HERE — Aerospace Engineering: How Airplanes Fly II
//     ...
//     AEROSPACE PROJECT — not on today's timetable
//
// Both true at once, about one subject. `subjectsForDay()` takes a quarter and
// the dashboard called it WITHOUT one, so it got Wednesday's default order
// (['aerospace','socialStudies']) while the 2:15 block used Q1's override
// (['socialStudies','aerospace']). The lesson loop offered the first of its
// list; `isOffTimetable` asked the block and disagreed.
//
// The Aug 20 fix declared "the list and the rail now answer the same question"
// and made the KHAN rows agree. The lesson loop kept its own answer.
// ---------------------------------------------------------------------------
{
  const { subjectsForDay, patternSubjects, dayPattern } = await import(root + '/src/academies/lamar/data/schedule/weekPattern.js');

  /** Every school day of a Q1 week, and one from Q2 where the override lifts. */
  const days = [D(2026, 8, 24), D(2026, 8, 25), D(2026, 8, 26), D(2026, 8, 27), D(2026, 11, 4)];
  for (const day of days) {
    const quarterId = getCurrentQuarter(day).id;
    const offered = subjectsForDay(day, quarterId);
    const owner = liveRotatingSubjects(day, KHAN)[0];
    const label = day.toLocaleDateString('en-US', { weekday: 'long' }) + ' ' + quarterId;
    if (!owner) continue;
    ok(`${label}: the day's first offered subject IS the one that owns the block`,
      offered[0] === owner,
      `offered ${JSON.stringify(offered)} but ${owner} owns it — the Start Here card and the warning will disagree`);
  }

  /** The Q1 Wednesday swap, named explicitly because it is the case that broke. */
  ok('Q1 Wednesday belongs to Social Studies, not Aerospace',
    patternSubjects(dayPattern(D(2026, 8, 26)), 'Q1')[0] === 'socialStudies',
    'Technology needs both Tuesday and Thursday in Q1, so Wednesday is the swap');
  ok('...and Aerospace gets Wednesday back from Q2',
    patternSubjects(dayPattern(D(2026, 11, 4)), 'Q2')[0] === 'aerospace',
    "taking Wednesday off Aerospace for the YEAR to solve a Q1 problem is what the swap avoids");
  ok('...and in Q1 Aerospace runs Monday',
    liveRotatingSubjects(D(2026, 8, 24), KHAN)[0] === 'aerospace',
    'eleven lessons, eleven Mondays — the zero-slack quarter the pacing panel reports');

  /**
   * And the dashboard must ASK with the quarter. Without this the two orders
   * come back the moment someone writes the shorter call.
   */
  const dash = fs.readFileSync(path.join(root, 'src/components/Dashboard/MissionControlDashboard.jsx'), 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '').replace(/\{\/\*[\s\S]*?\*\/\}/g, '').replace(/^\s*\/\/.*$/gm, '');
  ok('the board asks subjectsForDay WITH the quarter',
    /subjectsForDay\(new Date\(\), getCurrentQuarter\(\)\.id\)/.test(dash),
    'an unscoped call is the bug: it cannot see the Q1 Wednesday swap');
  ok('...and never calls it bare',
    !/subjectsForDay\(\)/.test(dash),
    'the no-argument form returns the default order for every quarter');

  /**
   * ---- AND THE ARGUMENT ALONE WAS NOT ENOUGH ----
   *
   * The first fix passed the quarter and then threw the result away:
   * `allSubjects.filter((s) => scheduledToday.includes(s))` keeps ALLSUBJECTS
   * order — aerospace first — so Wednesday still opened with an Aerospace
   * lesson. Shipped, and reported as fixed, without looking at his screen.
   *
   * The mission loop was the last caller reading the preference list at all.
   * It reads the BLOCK now, like the rail, the Khan rows and isOffTimetable
   * have since Aug 20.
   */
  /**
   * Pinned as `liveRotatingSubjects(...) : allSubjects` verbatim until Aug 29
   * 2026, when the 10:30 slot joined the same expression and the SHAPE changed
   * without the PROPERTY changing. What matters is that today's rows come from
   * the block owners and never from the preference list — the bug being
   * `allSubjects.filter((s) => scheduledToday.includes(s))`, which keeps
   * allSubjects order and reopened Wednesday with Aerospace.
   */
  ok("the day's rotating rows come from the block owner, not the preference list",
    /liveRotatingSubjects\(new Date\(\), khanAcademyAssignments\)/.test(dash)
      && /:\s*allSubjects/.test(dash),
    'a preference list has two names on it and the block holds one of them');
  ok('...and never by filtering allSubjects through the day list',
    !/allSubjects\.filter\(\(\w+\) => scheduledToday/.test(dash),
    'that keeps allSubjects order, which is the Aug 26 bug shipped and reported as fixed');
  ok('...and his mission list counts the 10:30 slot too',
    /liveMorningSubject\(new Date\(\), khanAcademyAssignments\)/.test(dash),
    'a subject with a day on the timetable and nothing on his screen is the bug this project keeps finding');
  ok('...and a flex day still shows everything',
    /todayPattern\.kind === 'core' && !todayPattern\.flex/.test(dash),
    'Friday is the overflow day — narrowing it is the Aug 12 bug');
}


console.log('\n--- 8. the second rotating slot, at 10:30 ---');
{
  /**
   * The parent, Aug 29 2026: *"The same issue arises with Social Studies. We
   * may have to replan the schedule. To see what classes he can do 2x a week."*
   *
   * Science gave up Tuesday at 10:30. WHICH subject got it was decided by the
   * repaired pacing model rather than by preference: across the year at one day
   * a week, Social Studies was 30 days short and Aerospace 5. Aerospace keeps
   * Monday and leans on the Friday buffer, which is what the buffer is for.
   */
  const rows = ['aerospace', 'technology', 'socialStudies', 'science']
    .map((x) => ({ subject: x, batchLabel: 'Q1 2026-2027' }));
  const day = (i) => new Date(2026, 7, 31 + i);

  ok('Tuesday 10:30 belongs to Social Studies',
    liveMorningSubject(day(1), rows) === 'socialStudies',
    String(liveMorningSubject(day(1), rows)));
  for (const [i, name] of [[0, 'Monday'], [2, 'Wednesday'], [3, 'Thursday'], [4, 'Friday']]) {
    ok(name + ' 10:30 stays Science',
      liveMorningSubject(day(i), rows) === null,
      String(liveMorningSubject(day(i), rows)));
  }
  ok('so Science keeps FOUR days a week, not three',
    [0, 2, 3, 4].filter((i) => liveMorningSubject(day(i), rows) === null).length === 4,
    'the parent held all four science courses; four days is what makes them fit');

  ok('THE POINT: Social Studies now owns two days a week',
    liveMorningSubject(day(1), rows) === 'socialStudies'
      && liveRotatingSubjects(day(2), rows)[0] === 'socialStudies',
    'Tuesday morning and Wednesday afternoon');
  ok('...and Technology still owns its two',
    liveRotatingSubjects(day(1), rows)[0] === 'technology'
      && liveRotatingSubjects(day(3), rows)[0] === 'technology');
  ok('...and Aerospace keeps Monday',
    liveRotatingSubjects(day(0), rows)[0] === 'aerospace');

  ok('a quarter where Social Studies has no work leaves Science its Tuesday',
    liveMorningSubject(day(1), []) === null,
    'an empty block is worse than no second slot');

  const b5 = { id: MORNING_BLOCK_ID, label: 'Science' };
  ok('the 10:30 block LABEL follows the owner, on every surface at once',
    resolveBlockLabel(b5, day(1), rows) === 'Social Studies'
      && resolveBlockLabel(b5, day(0), rows) === 'Science',
    resolveBlockLabel(b5, day(1), rows) + ' / ' + resolveBlockLabel(b5, day(0), rows));
  ok('...and a block she renamed herself is left alone',
    resolveBlockLabel({ id: MORNING_BLOCK_ID, label: 'My Science Time' }, day(1), rows) === 'My Science Time',
    'the same rule every other block rename follows');
}

console.log('\n' + pass + ' passed, ' + fail + ' failed');
if (fail) { console.log('\n' + fail + ' CHECK(S) FAILED'); process.exit(1); }
console.log('\nALL CHECKS PASSED');
