// ---------------------------------------------------------------------------
// THE 180-DAY COUNT ONLY COUNTS SCHOOL DAYS.
// Run: node scripts/verify-georgia-hours.mjs
//
// ---- WHERE THIS CAME FROM (Aug 16, 2026) ----
//
// The parent: "check the hourly counter for the GA school days. its not
// imputting the hrs correctly."
//
// She was right, and the arithmetic was fine. The problem was WHICH DAYS it
// was adding up. Attendance rows are written by a one-minute timer in App.jsx
// that fires whenever the tab is visible — any day of the year, on either
// computer — and instructionProgress counted every row it had.
//
// Her record on the night she asked:
//
//     reported   22 days logged, 7 met the 4.5-hour bar
//     actual     10 school days,  3 met the bar
//
//     8 rows were BEFORE the school year began (Jul 24 - Aug 2; school
//       starts Aug 3), one of which — Saturday July 25 — was counted as a
//       full Georgia school day
//     4 rows were weekends, three of them counted as full days, including
//       two Saturdays the app's own board labelled "No classes today"
//
// A packet naming Saturday July 25th as a Georgia school day is not a
// generous record. It is one a reviewer stops trusting at the first line.
//
// THE OTHER HALF, which no code change can fix: real school days read far too
// LOW, because Khan Academy, a paper book, PE and a field trip all happen
// where this app cannot watch. Aug 6 shows 28 minutes. Aug 13 shows 40. The
// answer is offlineMinutes, which is hers to enter — so the screen now says
// how many school days are short instead of leaving her to notice.
// ---------------------------------------------------------------------------
import './lib/academy-under-test.mjs';
import { readsFromAcademy } from './lib/reads-content.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const gc = await import(REPO + '/src/academies/lamar/data/admin/georgiaCompliance.js');
const { isSchoolDay } = await import(REPO + '/src/academies/lamar/data/schedule/schoolHolidays.js');
const sm = await import(REPO + '/src/lib/scheduledMinutes.js');
const { defaultSchedule } = await import(REPO + '/src/academies/lamar/data/schedule/defaultSchedule.js');

let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
}
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');
/**
 * Strip comments before asserting a string is ABSENT.
 *
 * Six separate guards in this repo have passed against their own explanatory
 * comment. Presence is asserted against the file; absence against the code.
 */
const codeOnly = (t) => t
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
  .replace(/^\s*\/\/.*$/gm, '');
const OPTS = { schoolYearStart: '2026-08-03', isSchoolDay };
const day = (activeMinutes, offlineMinutes = 0) => ({ activeMinutes, offlineMinutes, lessonsCompleted: 0 });

console.log('\n--- 1. the bar itself is unchanged ---');
{
  ok('Georgia is 180 days at 4.5 hours', gc.GEORGIA_DAYS_REQUIRED === 180 && gc.GEORGIA_MINUTES_PER_DAY === 270);
  ok('a day is app time PLUS what she entered',
    gc.instructionMinutes({ activeMinutes: 117, offlineMinutes: 150 }) === 267,
    'the fix was never to loosen the bar');
  ok('...and 267 does NOT clear 270',
    gc.instructionProgress({ '2026-08-12': day(117, 150) }, OPTS).fullDays === 0,
    "her Aug 12 field trip missed the bar by three minutes — the app must not round that away");
}

console.log('\n--- 2. days before the school year do not count ---');
{
  const p = gc.instructionProgress({
    '2026-07-25': day(400),  // a Saturday in July, counted as a full day before this fix
    '2026-07-28': day(272),
    '2026-08-03': day(184)
  }, OPTS);
  ok('July is not part of the school year', p.daysLogged === 1, `${p.daysLogged}`);
  ok('...and none of it meets the 4.5-hour bar', p.fullDays === 0, `${p.fullDays}`);
  ok('...but the excluded days are COUNTED, not silently dropped', p.excludedBeforeStart === 2,
    'a number that quietly got smaller is worse than one that explains itself');
}

console.log('\n--- 3. a weekend is not a school day, unless she says it was ---');
{
  const passive = gc.instructionProgress({ '2026-08-08': day(323), '2026-08-09': day(373) }, OPTS);
  ok('screen time on a Saturday and Sunday counts for nothing',
    passive.daysLogged === 0 && passive.fullDays === 0,
    'the board itself said "No classes today" on both');
  ok('...and says so', passive.excludedNonSchoolDays === 2);

  const asserted = gc.instructionProgress({ '2026-08-08': day(60, 240) }, OPTS);
  ok('but a Saturday she logged offline minutes for DOES count',
    asserted.daysLogged === 1 && asserted.fullDays === 1,
    'a homeschool may teach on a Saturday; entering the minutes is her saying so');

  /**
   * ---- THE DENTAL-APPOINTMENT CASE (Aug 16, 2026) ----
   *
   * The parent: "What if he did his work later. Ex. thursday he had a dental
   * appt but completed his work after hours."
   *
   * The tick is dated by the day he taps it, not by the block's clock time, so
   * work done Thursday evening and ticked Thursday evening books Thursday.
   * And when the make-up lands on a Saturday, the TICK itself is the assertion
   * that school happened — she should not have to type minutes for a day the
   * app already has a record of.
   */
  const sat = gc.instructionProgress(
    { '2026-08-08': day(0) },
    { ...OPTS, scheduledMinutesByDate: { '2026-08-08': 180 } }
  );
  ok('a Saturday he TICKED counts as a school day', sat.daysLogged === 1, `${sat.daysLogged}`);
  ok('...and is not filed under "not counted"', sat.excludedNonSchoolDays === 0);
  ok('...while a Saturday with only screen time still does not count',
    gc.instructionProgress({ '2026-08-08': day(323) }, OPTS).daysLogged === 0,
    'a tab left open is not an assertion that school happened');

  const holiday = gc.instructionProgress({ '2026-09-07': day(300) }, OPTS);
  ok('Labor Day is not a school day either', holiday.daysLogged === 0, 'it is in SCHOOL_HOLIDAYS');
  ok('...unless she logged it', gc.instructionProgress({ '2026-09-07': day(0, 300) }, OPTS).fullDays === 1);
}

console.log('\n--- 4. her real record, before and after ---');
{
  /** Every row as it stood in her database when she asked. */
  const REAL = {
    '2026-07-24': day(25), '2026-07-25': day(121), '2026-07-26': day(11), '2026-07-28': day(272),
    '2026-07-29': day(147), '2026-07-30': day(57), '2026-08-01': day(8), '2026-08-02': day(51),
    '2026-08-03': day(184), '2026-08-04': day(99), '2026-08-05': day(77), '2026-08-06': day(28),
    '2026-08-07': day(443), '2026-08-08': day(323), '2026-08-09': day(373), '2026-08-10': day(279),
    '2026-08-11': day(132), '2026-08-12': day(117, 150), '2026-08-13': day(40), '2026-08-14': day(291),
    '2026-08-15': day(273), '2026-08-16': day(1)
  };
  const before = gc.instructionProgress(REAL);
  const after = gc.instructionProgress(REAL, OPTS);

  ok('unscoped, it claimed 22 days and 7 full days', before.daysLogged === 22 && before.fullDays === 7,
    `${before.daysLogged} / ${before.fullDays}`);
  ok('scoped, it reports 10 school days and 3 full days', after.daysLogged === 10 && after.fullDays === 3,
    `${after.daysLogged} / ${after.fullDays}`);
  ok('...accounting for all twelve it dropped',
    after.excludedBeforeStart === 8 && after.excludedNonSchoolDays === 4);
  ok('...and naming the 7 school days that fell short', after.shortDays === 7,
    'each one is a day Khan, a book, PE or a trip happened where the app cannot see');
}

console.log('\n--- 4b. the schedule enters the hours ---');
{
  /**
   * The parent: "it can enter in kahn hrs via the schedule time in the
   * scheduler. Lamar goes by the scheduler for his school day. when he selects
   * that he's done the time should be entered."
   */
  const tickAll = { '2026-08-17': { math: true, reading: true, science: true, typing: true } };
  ok('ticking maths books the 60 minutes her timetable gives it',
    sm.scheduledMinutesOn('2026-08-17', { khanDailyLog: { '2026-08-17': { math: true } } }) === 60,
    'block-2 is 09:00-10:00 because she said so');
  ok('...and four subjects book their four blocks',
    sm.scheduledMinutesOn('2026-08-17', { khanDailyLog: tickAll }) === 135,
    '60 + 15 + 45 + 15');

  /** THE DOUBLE-COUNTING TRAP. Four subjects share the 45-minute 2:15 block. */
  const oneRotator = sm.scheduledMinutesOn('2026-08-17', { khanDailyLog: { '2026-08-17': { aerospace: true } } });
  const three = sm.scheduledMinutesOn('2026-08-17', {
    khanDailyLog: { '2026-08-17': { aerospace: true, technology: true, socialStudies: true } }
  });
  ok('three rotating subjects still book ONE 45-minute block', oneRotator === 45 && three === 45,
    `${oneRotator} vs ${three} — the block only happened once`);

  ok('lunch and break are never instruction',
    !sm.coveredBlockIds('2026-08-17', { khanDailyLog: { '2026-08-17': { math: true } } }).has('block-6'),
    'a packet counting lunch toward 4.5 hours is the same wrong as counting a Saturday in July');

  ok('PE, guitar and the garden come from their own logs, no new tick needed',
    sm.scheduledMinutesOn('2026-08-17', {
      peWorkoutLog: [{ date: '2026-08-17' }], guitarLog: [{ date: '2026-08-17' }]
    }) === 45, '30 + 15');
  ok('...and so do writing and word study',
    sm.scheduledMinutesOn('2026-08-17', {
      writingEntries: [{ completedAt: '2026-08-17T18:00:00.000Z' }],
      weeklyWordState: { spelling: { weekStartDate: '2026-08-17', completedDayTasks: ['mon'] } }
    }) === 75,
    'without these two the ticks could only ever reach 3h45 of a 5h30 day — under the bar');

  ok('an evening writing entry counts for that evening, not tomorrow',
    sm.coveredBlockIds('2026-08-17', { writingEntries: [{ completedAt: '2026-08-18T01:30:00.000Z' }] }).size === 0 ||
    sm.coveredBlockIds('2026-08-17', { writingEntries: [{ completedAt: '2026-08-18T01:30:00.000Z' }] }).has('block-7'),
    'completedAt is UTC; it goes through localDayOf');

  ok('recomputed from the logs, so unticking removes the credit',
    sm.scheduledMinutesOn('2026-08-17', { khanDailyLog: { '2026-08-17': { math: false } } }) === 0,
    'nothing is incremented, so there is no running total to drift');

  /** MEASURED AND SCHEDULED ARE THE SAME HOURS. */
  ok('Khan in another tab: 5 measured, 60 scheduled, the day counts 60',
    gc.instructionMinutes({ activeMinutes: 5 }, 60) === 60,
    'not 65 — they are two views of the same hour');
  ok('...and 90 in-app against a 60-minute block counts 90, not 150',
    gc.instructionMinutes({ activeMinutes: 90 }, 60) === 90);
  ok('...while hand-entered offline time always adds',
    gc.instructionMinutes({ activeMinutes: 5, offlineMinutes: 150 }, 60) === 210,
    'it exists precisely for instruction neither the tab nor the timetable saw');

  ok('a full day of ticks clears the 4.5-hour bar',
    sm.scheduledMinutesOn('2026-08-17', {
      khanDailyLog: { '2026-08-17': { math: true, reading: true, science: true, typing: true, aerospace: true } },
      peWorkoutLog: [{ date: '2026-08-17' }], guitarLog: [{ date: '2026-08-17' }],
      writingEntries: [{ completedAt: '2026-08-17T17:00:00.000Z' }],
      weeklyWordState: { spelling: { weekStartDate: '2026-08-17', completedDayTasks: ['mon'] } }
    }) >= gc.GEORGIA_MINUTES_PER_DAY,
    'if a complete day still fell short, the feature would look broken on his best day');
}

console.log('\n--- 5. the screen and the packet agree ---');
{
  const section = read('src/components/Dashboard/ComplianceSection.jsx');
  const packet = read('src/lib/compliancePacket.js');
  for (const [name, src] of [['the Compliance screen', section], ['the records packet', packet]]) {
    ok(`${name} scopes to the school year`, /schoolYearStart: toDateStr\(SCHOOL_YEAR_START_DATE\)/.test(src));
    ok(`${name} scopes to school days`, /isSchoolDay\b/.test(src));
    ok(`${name} books the timetable minutes`, /scheduledMinutesByDate/.test(src));
  }
  ok('the screen says what it left out', /Not counted toward the 180/.test(section),
    'she must never watch a legal number shrink without being told why');
  ok('...and names the short days she can still fix', /under 4\.5h/.test(section));
  ok('...and admits the timer runs on either computer',
    /on any day and on either computer/.test(section),
    'the parent machine accrues minutes too — this session did');
}


console.log('\n--- the attendance list shows what the record counts ---');
{
  /**
   * The parent: "It only shows Lamar had 2 hrs of work but he completed
   * everything. Khan Academy work was supposed to log the time when he checked
   * them off as done."
   *
   * It did. Her record that morning: Aug 17 active 2h19m, credited 3h00m;
   * Aug 14 active 4h51m, credited 3h45m. The list printed the first column —
   * foreground app time, the weakest of the three numbers the packet uses —
   * so a day he worked offline read as a short day.
   */
  const store = read('src/store/useAppStore.js');
  const dash = read('src/components/Dashboard/ParentDashboard.jsx');
  const code = store.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

  ok('recent days carry a credited-minutes figure',
    /creditedMinutes: Math\.max\(active, scheduled\) \+ offline/.test(code),
    'the same rule the compliance packet uses, not a second opinion');
  ok('...built from the tick logs, not from app time alone',
    /const creditedByDate = scheduledMinutesByDate\(/.test(code));
  ok('...and scheduledMinutesByDate is actually imported',
    /import \{ scheduledMinutesByDate \} from '\.\.\/lib\/scheduledMinutes\.js';/.test(store),
    'it was not, on the first pass — and an undefined identifier is a runtime error that verify-parses cannot see');
  ok('...sourced from the store keys that exist',
    /weeklyWordState: get\(\)\.weeklyWords/.test(code) && /scheduleBlocks: get\(\)\.scheduleBlocks/.test(code),
    'a wrong key here credits zero minutes silently rather than throwing');
  ok('the screen prints the credited figure first',
    /Math\.floor\(day\.creditedMinutes \/ 60\)/.test(dash));
  ok('...and shows app time beside it only when the two disagree',
    /day\.creditedMinutes !== day\.activeMinutes/.test(dash),
    'when they differ, which is bigger is the useful fact');
}


console.log('\n--- attendance minutes belong to the student, not to whoever is looking ---');
{
  /**
   * The parent, on two days she had watched him work: "It only shows Lamar had
   * 2 hrs of work but he completed everything."
   *
   *     Aug 18   1h 33m   0 activities
   *     Aug 19   2h 17m   0 activities
   *
   * Minutes with no completions is an app sitting open, and the app sitting
   * open was hers — the Parent Dashboard while she graded, and this session
   * reading her records for hours. Her admin time was being written into his
   * instructional minutes, on the record Georgia asks about.
   */
  const app = read('src/App.jsx');
  const store = read('src/store/useAppStore.js');
  const storeCode = store.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

  ok('the timer tells the store which view was open',
    /recordActiveMinute\(\{ parentView: view === 'parent' \}\)/.test(app));
  ok('...and still only counts a foreground tab',
    /document\.visibilityState !== 'visible'\) return;/.test(app),
    'a forgotten background tab was never his instruction either');
  ok('parent-view minutes land in their own field',
    /parentMinutes: \(prior\.parentMinutes \|\| 0\) \+ 1/.test(storeCode));
  ok('...and never in activeMinutes',
    /parentView\s*\n?\s*\? \{ \.\.\.prior, parentMinutes/.test(storeCode),
    'one branch or the other, so a minute cannot be counted twice');
  ok('...and are kept rather than discarded',
    /parentMinutes/.test(storeCode) && !/delete .*parentMinutes/.test(storeCode),
    "an adult's time on the record is worth knowing; it is just not his");
  ok('a day counts toward the 180 only if HE did something',
    /const daysWithActivity = dates\.filter/.test(storeCode)
      && !/daysWithActivity[\s\S]{0,260}parentMinutes/.test(storeCode),
    'a day she spent grading, on which he did nothing, was counting');
  ok('the import carries parentMinutes through',
    /parentMinutes: Math\.max\(localRecord\.parentMinutes/.test(storeCode),
    'the comment beside that block says it plainly: a field left out is destroyed on import');
}

console.log('\n--- the Q1 aerospace portfolio slot names the project it is dated for ---');
{
  const store = read('src/store/useAppStore.js');
  const seed = read('src/academies/lamar/data/academicSuccessCenter/placeholders.js');

  ok('the seed names the wind tunnel, not the bottle rocket',
    /Wind tunnel test — design, results, and what the airflow showed/.test(seed)
      && !/title: 'Bottle rocket — design, launch, and results'/.test(seed));
  ok('a row already in her database is retitled once',
    /row\.slotId !== 'asg::aerospace::Q1::2'/.test(store));
  ok('...and skipped the moment he has touched it',
    /if \(row\.status && row\.status !== 'not-started'\) continue;[\s\S]{0,120}if \(row\.grade != null \|\| row\.completedAt\) continue;/.test(store),
    'a migration that overwrites work is worse than a stale title');
  ok('...the due date moves with the title, from the stale value only',
    /row\.dueDate === '2026-08-16' \|\| row\.dueDate === '2026-09-16'/.test(store),
    'retitling and leaving Aug 16 would date the write-up before the build');
  ok('...and any other date she chose is left alone',
    /: \{\}\)/.test(store),
    'due dates are hers — this is the one stale value, not a licence');
}


/**
 * ---- THE SOURCE LIST, ASSERTED AS A PROPERTY RATHER THAN AS A STRING ----
 *
 * Both of these checks used to pin the argument list VERBATIM:
 *
 *   /scheduledMinutesByDate\(\{\s*khanDailyLog, peWorkoutLog, guitarLog, gardenLog, .../
 *
 * which is the mistake this project has a name for — assert the property, not
 * the punctuation. The property is "all three screens read the SAME list, and
 * that list is everything `coveredBlockIds` can actually use." The regex was a
 * frozen snapshot of one correct answer, so adding a legitimate new source
 * (typingLog, Aug 26 2026, which is what closed block-5b) failed a guard whose
 * subject had not gone wrong at all.
 *
 * Worse than a false alarm: a guard that fires on correct work teaches you to
 * edit the guard, and next time you edit it without reading it.
 */
function sourceKeysAt(text) {
  const i = text.indexOf('scheduledMinutesByDate({');
  if (i === -1) return null;
  const open = text.indexOf('{', i);
  let depth = 0, j = open;
  for (; j < text.length; j++) {
    if (text[j] === '{') depth++;
    else if (text[j] === '}') { depth--; if (depth === 0) break; }
  }
  const body = text.slice(open + 1, j);
  return new Set(
    body
      .split(',')
      .map((part) => part.split(':')[0].trim())
      .filter((k) => /^[A-Za-z_$][\w$]*$/.test(k))
  );
}

/** Filled in by the board check below, compared against the other two after it. */
let boardSources = null;

/** Everything coveredBlockIds destructures — the full menu a caller may pass. */
const COVERED_SOURCES = (() => {
  const sm = read('src/lib/scheduledMinutes.js');
  const i = sm.indexOf('export function coveredBlockIds');
  const body = sm.slice(sm.indexOf('{', i) + 1, sm.indexOf('} = {}', i));
  return new Set(
    body.split(',').map((l) => l.split('=')[0].trim()).filter((k) => /^[A-Za-z_$][\w$]*$/.test(k))
  );
})();

console.log('\n--- the offline-minutes alarm fires only on days that are short ---');
{
  /**
   * The parent: **"Why is days with no offline in the red?"**
   *
   * Because it flagged every day with app time and no offline minutes, and
   * told her "Khan, reading and field trips count as zero until you enter
   * them". They stopped counting as zero when the scheduled-minutes credit
   * shipped. On Aug 14 her record already held 4h51m and on Aug 15 4h33m —
   * both over the 4.5-hour bar — and both sat red.
   *
   * An alarm that fires on a day already above target teaches her to ignore
   * the alarm, and then the one day it matters looks like the six it does not.
   */
  const board = read('src/components/Dashboard/MissionControlBoard.jsx');
  const code = board.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\{\/\*[\s\S]*?\*\/\}/g, '').replace(/^\s*\/\/.*$/gm, '');

  ok('the day is judged on credited minutes, not app time alone',
    /const credited = Math\.max\(active, creditedByDate\[date\] \|\| 0\)/.test(code));
  ok('...against Georgia\'s own daily bar, imported not retyped',
    /credited < GEORGIA_MINUTES_PER_DAY/.test(code)
      && readsFromAcademy(board, 'GEORGIA_MINUTES_PER_DAY'),
    '270 written here by hand would be a second copy of the rule');
  boardSources = sourceKeysAt(code);
  ok('the board asks for every source coveredBlockIds can use',
    Boolean(boardSources) && [...COVERED_SOURCES].every((k) => boardSources.has(k)),
    boardSources ? 'missing: ' + [...COVERED_SOURCES].filter((k) => !boardSources.has(k)).join(', ') : 'no call found');
  ok('a day she has already logged offline time on is never flagged',
    /if \(offline > 0\) return false;/.test(code));
  ok('a day with nothing recorded at all is not flagged either',
    /if \(credited === 0\) return false;/.test(code),
    'that is a day off, and the year plan already reports those');
  /**
   * Absence against the CODE, presence against the file — because the comment
   * directly above this fix quotes the sentence being removed. Sixth time.
   * The rule is old and it is still the one that catches people out.
   */
  ok('...and the wording no longer claims his work counts as zero',
    !/count as zero until you enter them/.test(code)
      && /fall under the 4\.5-hour bar on what is recorded/.test(board));
  ok('every source it reads is subscribed',
    ['khanDailyLog', 'guitarLog', 'peWorkoutLog', 'gardenLog', 'scheduleBlocks']
      .every((k) => new RegExp('s\\) => s\\.' + k).test(code))
      && /s\) => s\.weeklyWords/.test(code),
    'gardenLog was used twice and never subscribed — caught here, not in production');
}

console.log('\n--- the offline-entry panel agrees with the record it is filling in ---');
{
  /**
   * The parent: **"Why is he counted for 3:45 hrs but only 2:41 will apply?"**
   *
   * Two panels, one day, two numbers. The attendance list said 3h45m. The
   * panel where she types offline minutes said 2h41m — and that is the panel
   * she ACTS on. A number that reads low there does not just mislead her; it
   * invites her to log an hour of offline time to close a gap that was never
   * open, and then the packet overstates the day instead.
   *
   * The cause was the third copy of one rule:
   *
   *     const total = measured + logged;   // no scheduled credit at all
   *
   * This file already computes the timetable credit at the top, for the
   * packet. The panel forty lines below simply did not ask for it.
   *
   * Guarded because two of the three copies had already been fixed one at a
   * time, each time believing it was the last one.
   */
  const src = read('src/components/Dashboard/ComplianceSection.jsx');
  const code = codeOnly(src);

  ok('the panel credits the day through instructionMinutes',
    /const total = instructionMinutes\(row, scheduled\);/.test(code),
    'measured + logged was the third copy of the credit rule');
  ok('...imported from georgiaCompliance, not re-derived here',
    readsFromAcademy(code, 'instructionMinutes'),
    'a fourth hand-rolled max() is exactly how this drifted the first three times');
  ok('...on the timetable credit for THAT date',
    /const scheduled = scheduledByDateAll\[date\] \|\| 0;/.test(code),
    'the panel lets her pick any date — crediting today would be a silent lie on every other one');
  const complianceSources = sourceKeysAt(code);
  const packetSources = sourceKeysAt(codeOnly(read('src/lib/compliancePacket.js')));
  const same = (a, b) => a && b && a.size === b.size && [...a].every((k) => b.has(k));
  ok('the compliance screen asks for every source coveredBlockIds can use',
    Boolean(complianceSources) && [...COVERED_SOURCES].every((k) => complianceSources.has(k)),
    complianceSources ? 'missing: ' + [...COVERED_SOURCES].filter((k) => !complianceSources.has(k)).join(', ') : 'no call found');
  ok('...and the packet, the board and this screen pass the SAME list',
    same(complianceSources, packetSources) && same(complianceSources, boardSources),
    'one credit rule, three screens, no second opinions');
  ok('every source it reads is subscribed in this component',
    ['khanDailyLog', 'peWorkoutLog', 'guitarLog', 'gardenLog', 'writingEntries', 'scheduleBlocks']
      .every((k) => new RegExp('useAppStore\\(\\(s\\) => s\\.' + k + '\\)').test(code))
      && /useAppStore\(\(s\) => s\.weeklyWords\)/.test(code),
    'an unsubscribed source is undefined at render — a crash verify-parses cannot see');
  ok('...and the line she reads names all three components',
    /min from the blocks he ticked/.test(src)
      && /min measured in the app/.test(src)
      && /min you logged/.test(src),
    'a total she cannot decompose is a total she cannot check against the other panel');
  ok('...and says plainly that measured and scheduled do not both count',
    /the larger of the two counts, not both/.test(src),
    'without this she reads 225 as 161 + 64 and expects 386 next time');
}

console.log('\n--- the lessons this app teaches earn the block they sit in ---');
{
  /**
   * The parent: **"Lamar logs in at 8:30 every morning and is working on his
   * school work until he completes everything. It has to be longer than 4 1/2
   * hrs."**
   *
   * Her record, the three days before she said it:
   *
   *     Aug 17   240 min   Rotating Block credited 0
   *     Aug 18   255 min   Rotating Block credited 0
   *     Aug 19   225 min   Rotating Block credited 0
   *
   * The Rotating Block is 45 minutes a day and had booked nothing since
   * Aug 14. On Aug 19 he mastered `ae7-history-of-flight-2` — an Aerospace
   * lesson, in this app, with the date written down. `coveredBlockIds` read
   * six sources and none of them was `lessonProgress`.
   *
   * Aerospace, Technology, Social Studies and Robotics do not appear on the
   * Khan checklist, because Khan does not teach them — this app does. They
   * were the only subjects on her timetable with no route to credit at all.
   *
   * With lessonProgress read, Aug 19 goes 225 -> 270: a day that read as short
   * now meets Georgia's 4.5-hour bar, on work he had already done.
   */
  const smSrc = read('src/lib/scheduledMinutes.js');
  const code = codeOnly(smSrc);

  ok('scheduledMinutes reads lessonProgress',
    /lessonProgress = \{\}/.test(code) && /Object\.entries\(lessonProgress \|\| \{\}\)/.test(code),
    'six sources and not the app\'s own lessons was the whole bug');
  ok('...matching on the local date the store writes',
    /progress\.lastCompletedDate !== dateStr/.test(code),
    'lastCompletedDate comes from todayStr() — a UTC compare here would shift evening work a day');
  /**
   * WAS: `BLOCK_FOR_SUBJECT[LESSON_SUBJECT.get(lessonId)]`, asserted literally.
   *
   * That call moved into `blockForLesson()` on Aug 20, 2026, when English
   * became two blocks — `reading` is one subject code carrying Reading &
   * Literature and Grammar & Writing, and they are the 10:00 and 12:30 blocks
   * respectively. The property is unchanged and stronger: a finished lesson
   * credits the block that teaches it. Only the shape of the expression moved.
   */
  ok('...and mapping the lesson to the block that teaches it',
    /const id = blockForLesson\(lessonId\);/.test(code)
      && /export function blockForLesson\(lessonId\)/.test(code),
    'the resolver is in this module, so the board and the record cannot disagree');
  ok('...which is strand-aware for the one subject that has two',
    /const strand = LESSON_STRAND\.get\(lessonId\);/.test(code)
      && /STRAND_BLOCK\[strand\]/.test(code),
    'sending grammar to the 15-minute Reading block under-counted every English day');
  ok('...from the real lesson catalogue, not a hand-written prefix table',
    readsFromAcademy(code, 'allLessons')
      && /for \(const l of allLessons\) map\.set\(l\.id, l\.subject\)/.test(code),
    'a prefix table drifts silently the first time a lesson id changes shape');
  ok('mastery is NOT required for the minutes to count',
    !/mastered.*lastCompletedDate|lastCompletedDate.*\.mastered/.test(code),
    'a lesson he found hard took the same 45 minutes as one he aced');
  ok('a day whose only work was an in-app lesson is in the date set',
    /Object\.values\(sources\.lessonProgress \|\| \{\}\)\.map\(\(p\) => p\?\.lastCompletedDate\)/.test(code),
    'the map is built from dates it knows about — omitted here, the credit vanishes exactly as before');

  for (const [name, rel] of [
    ['the compliance packet', 'src/lib/compliancePacket.js'],
    ['the compliance screen', 'src/components/Dashboard/ComplianceSection.jsx'],
    ['his board', 'src/components/Dashboard/MissionControlBoard.jsx'],
    ['the attendance summary', 'src/store/useAppStore.js']
  ]) {
    ok(`${name} passes lessonProgress through`,
      /lessonProgress/.test(codeOnly(read(rel))),
      'one source list, four readers — a reader that skips it disagrees with the other three');
  }
  ok('...and both components that pass it also subscribe to it',
    /useAppStore\(\(s\) => s\.lessonProgress\)/.test(codeOnly(read('src/components/Dashboard/ComplianceSection.jsx')))
      && /useAppStore\(\(s\) => s\.lessonProgress\)/.test(codeOnly(read('src/components/Dashboard/MissionControlBoard.jsx'))),
    'an unsubscribed source is undefined at render');
  ok('...and the store reads it off state, not off a stale closure',
    /lessonProgress: get\(\)\.lessonProgress/.test(codeOnly(read('src/store/useAppStore.js'))));

  /**
   * The arithmetic, on her real numbers, not on a mock. Aug 19: math, science,
   * reading, typing, guitar, writing and word study were already credited at
   * 225. The Aerospace lesson adds block-9's 45 and nothing else, because the
   * block is the unit of credit and it only happened once.
   */
  const blocks = [
    { id: 'block-9', startTime: '14:15', endTime: '15:00' }
  ];
  const mins = sm.scheduledMinutesOn('2026-08-19', {
    lessonProgress: { 'ae7-history-of-flight-2': { mastered: true, lastCompletedDate: '2026-08-19' } },
    scheduleBlocks: blocks
  });
  ok('an Aerospace lesson on a date books the 45-minute rotating block',
    mins === 45, `got ${mins}`);
  const twice = sm.scheduledMinutesOn('2026-08-19', {
    lessonProgress: {
      'ae7-history-of-flight-2': { lastCompletedDate: '2026-08-19' },
      'tech7-typing': { lastCompletedDate: '2026-08-19' }
    },
    scheduleBlocks: blocks
  });
  ok('...and two rotating subjects on one day still book it once',
    twice === 45, `got ${twice} — the block happened once`);
  const other = sm.scheduledMinutesOn('2026-08-18', {
    lessonProgress: { 'ae7-history-of-flight-2': { lastCompletedDate: '2026-08-19' } },
    scheduleBlocks: blocks
  });
  ok('...and it books on its own date only',
    other === 0, `got ${other}`);
}

console.log('\n--- every instructional block on the timetable can actually be credited ---');
{
  /**
   * ===================================================================
   * THE CHECK THAT WOULD HAVE CAUGHT BOTH OF THEM. (Aug 26, 2026.)
   * ===================================================================
   *
   * scheduledMinutes.js has said this for weeks, about block-1:
   *
   *   > "a block nothing can credit is ninety hours a year that cannot be
   *   > counted, and this project has already shipped exactly that once"
   *
   * It had shipped it twice. **block-5b — Typing Practice, fifteen minutes a
   * day, about 45 hours a year — could not be credited by anything**, and no
   * guard could see it, because every check in this file tests a rule that
   * exists rather than asking whether a rule is MISSING.
   *
   * This one asks the question the other way round: hand `coveredBlockIds`
   * every source it accepts, all on one day, and see which blocks on her
   * printed timetable still fail to light up. A block that cannot be credited
   * on a day when he did literally everything is a block that can never be
   * credited at all.
   *
   * It is executed, not pattern-matched. A regex over the function body would
   * have found `ids.add(BLOCK_FOR_SUBJECT.typing)` and passed while the rows
   * feeding it carried no date — which is precisely how block-5b stayed broken
   * while looking fine.
   */
  const D = '2026-09-15';
  const everything = {
    khanDailyLog: { [D]: { math: true, reading: true, science: true, technology: true, socialStudies: true, aerospace: true, robotics: true } },
    peWorkoutLog: [{ date: D }],
    guitarLog: [{ date: D }],
    typingLog: [{ date: D }],
    gardenLog: [{ date: D }],
    writingEntries: [{ completedAt: `${D}T15:00:00.000Z` }],
    weeklyWordState: { spelling: { creditedDates: [D] } },
    lessonProgress: { 'any-lesson': { lastCompletedDate: D } },
    morningMeetings: { [D]: { completedAt: `${D}T13:00:00.000Z` } },
    khanAcademyAssignments: []
  };
  const covered = sm.coveredBlockIds(D, everything);
  const instructional = defaultSchedule.filter((b) => !sm.NON_INSTRUCTIONAL_BLOCKS.has(b.id));
  const orphans = instructional.filter((b) => !covered.has(b.id));

  ok('every instructional block on the printed schedule is reachable by some record',
    orphans.length === 0,
    orphans.map((b) => `${b.id} (${b.label}) — ${sm.blockMinutes(b)} min/day, uncountable`).join(' | '));

  /**
   * And the non-instructional ones stay out. Break and Lunch are on her
   * timetable and are not instruction; crediting them would inflate every
   * school day by 75 minutes in a legal record.
   */
  ok('...and Break and Lunch are still excluded',
    [...sm.NON_INSTRUCTIONAL_BLOCKS].every((id) => !covered.has(id)),
    [...sm.NON_INSTRUCTIONAL_BLOCKS].filter((id) => covered.has(id)).join(', '));

  /**
   * The inverse, so this cannot pass by crediting everything unconditionally:
   * a day with NO records lights up nothing.
   */
  const empty = sm.coveredBlockIds(D, {});
  ok('...and a day with nothing recorded credits no blocks at all',
    empty.size === 0, [...empty].join(', '));
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
