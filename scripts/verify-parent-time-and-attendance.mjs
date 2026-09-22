// ---------------------------------------------------------------------------
// verify-parent-time-and-attendance.mjs — audit gates 1, 31 and 56.
// Run: node scripts/verify-parent-time-and-attendance.mjs
//
// Sept 17, 2026. The audit's fast gates found three things a parent could not
// do: time her own weekly upkeep (56), open a past date and see what it
// counted as (31), and follow written steps to set up a new computer (1).
// This checks the behaviour of each fix, not how it is spelled:
//
//   1. Parent Time: a running session survives a reload because only its start
//      is stored; Stop records whole minutes; a correction moves the end time
//      to match; the week total counts a running session live.
//   2. Attendance: a day's status comes from the SCHOOL's rule asked about that
//      one day, so the calendar cannot disagree with the year's count; a mark
//      is the parent's statement and changes no minutes; the newest mark wins.
//   3. Wiring: both record kinds are refused by anything but their own two
//      store actions, never travel in the learner's export, never print in
//      the compliance packet, and the dashboard reload keeps parentMinutes.
//   4. The new files hold no school's numbers or names.
//   5. The set-up screen carries the written steps.
// ---------------------------------------------------------------------------

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');
const moduleUrl = (rel) => pathToFileURL(path.join(REPO, rel)).href;
const codeOnly = (text) => text.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) {
    passed += 1;
    console.log('PASS  ' + label);
  } else {
    failures.push(label);
    console.log('FAIL  ' + label + (detail ? `\n      ${detail}` : ''));
  }
}

const pt = await import(moduleUrl('src/lib/parentTime.js'));
const ad = await import(moduleUrl('src/lib/attendanceDay.js'));

console.log('--- 1. Parent Time ---');
{
  const t0 = new Date(2026, 8, 21, 9, 0, 0); // Mon Sept 21, 9:00 local
  const row = { id: 1, ...pt.startRecord({ task: 'grading', now: t0 }) };
  ok('a started session is a parent-time row dated the local day, with no end',
    row.kind === 'parent-time' && row.date === '2026-09-21' && row.endedAt === null && row.startedAt === t0.toISOString());
  ok('...and it is the open session', pt.openSession([row])?.id === 1);

  const later = new Date(t0.getTime() + 47 * 60000 + 20000).toISOString();
  ok('a running session counts from its stored start (a reload loses nothing)',
    pt.sessionMinutes(row, later) === 47, `got ${pt.sessionMinutes(row, later)}`);

  const stop = pt.stopChanges(row, { now: new Date(t0.getTime() + 47 * 60000), note: '  quiz 3  ' });
  const done = { ...row, ...stop };
  ok('Stop records whole minutes and the note', stop.minutes === 47 && stop.detail === 'quiz 3' && !!stop.endedAt);
  ok('...and a stopped session is no longer open', pt.openSession([done]) === null);
  ok('...and counts its stored minutes whatever the clock says',
    pt.sessionMinutes(done, new Date(2030, 0, 1).toISOString()) === 47);

  const forgot = { id: 2, ...pt.startRecord({ task: 'planning', now: new Date(2026, 8, 22, 20, 0) }) };
  const forgotDone = { ...forgot, ...pt.stopChanges(forgot, { now: new Date(2026, 8, 23, 7, 0) }) };
  const wk = pt.weekSummary([done, forgotDone], '2026-09-21', new Date(2026, 8, 23, 8).toISOString());
  ok('a session over the long limit is flagged', wk.long.length === 1 && wk.long[0].id === 2);

  const fix = pt.correctionChanges(forgotDone, { minutes: 30, task: 'records', note: 'forgot to stop' });
  const fixed = { ...forgotDone, ...fix.changes };
  ok('a correction sets the minutes and moves the end time to match',
    fix.ok && fixed.minutes === 30
      && new Date(fixed.endedAt) - new Date(fixed.startedAt) === 30 * 60000
      && fixed.task === 'records' && fixed.detail === 'forgot to stop' && !!fixed.correctedAt);
  ok('...and refuses more than a day', pt.correctionChanges(forgotDone, { minutes: 1441 }).ok === false);

  const running = { id: 3, ...pt.startRecord({ task: 'checking', now: new Date(2026, 8, 24, 10, 0) }) };
  const prevWeek = { ...pt.startRecord({ now: new Date(2026, 8, 20, 10, 0) }), id: 4, endedAt: 'x', minutes: 99 };
  const other = { id: 5, kind: 'field-trip', date: '2026-09-22', minutes: 500 };
  const w = pt.weekSummary([done, fixed, running, prevWeek, other], '2026-09-21', new Date(2026, 8, 24, 10, 15).toISOString());
  ok('the week total is Monday–Sunday, parent-time rows only, running session live',
    w.minutes === 47 + 30 + 15 && w.sessions.length === 3, `got ${w.minutes} over ${w.sessions.length}`);
  ok('...split by task and by day',
    w.byTask.grading === 47 && w.byTask.records === 30 && w.byTask.checking === 15 && w.byDay['2026-09-22'] === 30);
  ok('the week of a Sunday starts the Monday before', pt.weekStartOf('2026-09-27') === '2026-09-21');
  ok('the week of a Monday starts that Monday', pt.weekStartOf('2026-09-21') === '2026-09-21');
  ok('a stop before the start never counts negative time',
    pt.minutesBetween('2026-09-21T10:00:00.000Z', '2026-09-21T09:00:00.000Z') === 0);
}

console.log('\n--- 2. Attendance day status ---');
{
  // A school rule of the same shape as a real one, with its own threshold.
  // The file under test must get every answer from here.
  const FULL = 100;
  const minutesOf = (row = {}, scheduled = 0) => Math.max(row.activeMinutes || 0, scheduled || row.scheduledMinutes || 0) + (row.offlineMinutes || 0);
  const calendar = (date) => !['2026-09-19', '2026-09-20', '2026-11-26'].includes(date);
  const eligible = (date, row, o, sch) => {
    if (o.schoolYearStart && date < o.schoolYearStart) return false;
    if ((row.offlineMinutes || 0) > 0 || sch > 0) return true;
    return o.isSchoolDay(date);
  };
  const calls = [];
  const instructionProgress = (all, o) => {
    calls.push(Object.keys(all));
    let daysLogged = 0; let fullDays = 0; let excludedNonSchoolDays = 0;
    for (const [date, row] of Object.entries(all)) {
      const sch = o.scheduledMinutesByDate[date] || 0;
      const m = minutesOf(row, sch);
      if (!eligible(date, row, o, sch)) { if (m > 0) excludedNonSchoolDays += 1; continue; }
      const acts = (row.lessonsCompleted || 0) + (row.writingEntries || 0) + (row.typingSessions || 0);
      if (acts > 0 || m > 0) daysLogged += 1;
      if (m >= FULL) fullDays += 1;
    }
    return { daysLogged, fullDays, excludedNonSchoolDays };
  };
  const ctx = (row, scheduled = 0) => ({
    row, scheduled, today: '2026-09-25', schoolYearStart: '2026-08-10',
    isSchoolDay: calendar, instructionProgress, minutesOf
  });
  const s = (date, row, sch) => ad.dayStatus(date, ctx(row, sch)).code;

  ok('the school rule is asked about exactly that one day',
    (ad.dayStatus('2026-09-15', ctx({ activeMinutes: 5 })), calls.at(-1).length === 1 && calls.at(-1)[0] === '2026-09-15'));
  ok('at or over the school minimum is a full day', s('2026-09-15', { activeMinutes: 100 }) === 'full');
  ok('...and the threshold is the school\'s, not the file\'s', s('2026-09-15', { activeMinutes: 99 }) === 'short');
  ok('scheduled minutes from checked-off work count', s('2026-09-15', {}, 120) === 'full');
  ok('offline minutes count', s('2026-09-15', { activeMinutes: 40, offlineMinutes: 60 }) === 'full');
  ok('a lesson with no minutes is still a (short) day', s('2026-09-15', { lessonsCompleted: 1 }) === 'short');
  ok('a school day with nothing is "no work recorded"', s('2026-09-16', {}) === 'none');
  ok('a weekend with nothing is not a school day', s('2026-09-19', {}) === 'off');
  ok('a tab left open on a weekend is kept but not counted', s('2026-09-20', { activeMinutes: 90 }) === 'offWork');
  ok('real work on a weekend counts, the way the school rule says', s('2026-09-20', {}, 45) === 'short');
  ok('before the first day of school is marked so', s('2026-08-01', { activeMinutes: 300 }) === 'before');
  ok('tomorrow has no status yet', s('2026-09-26', { activeMinutes: 300 }) === 'future');
  ok('a status reports the counted minutes and activities',
    ad.dayStatus('2026-09-15', ctx({ activeMinutes: 30, lessonsCompleted: 2, writingEntries: 1 }, 50)).minutes === 50
      && ad.dayStatus('2026-09-15', ctx({ lessonsCompleted: 2, writingEntries: 1 })).activities === 3);

  const m1 = { id: 1, ...ad.markRecord({ date: '2026-09-16', mark: 'sick', note: ' fever ', now: new Date(2026, 8, 16, 8) }) };
  const m2 = { id: 2, ...ad.markRecord({ date: '2026-09-16', mark: 'excused', now: new Date(2026, 8, 16, 9) }) };
  const m3 = { id: 3, ...ad.markRecord({ date: '2026-09-15', mark: 'present', now: new Date(2026, 8, 15, 9) }) };
  const clear = { id: 4, ...ad.markRecord({ date: '2026-09-15', mark: null, now: new Date(2026, 8, 15, 10) }) };
  ok('a mark is an attendance-mark row with a trimmed note',
    m1.kind === 'attendance-mark' && m1.mark === 'sick' && m1.detail === 'fever');
  const latest = ad.latestMarks([m2, m1, m3, clear, { id: 9, kind: 'field-trip', date: '2026-09-16' }]);
  ok('the newest mark for a date wins, in any order', latest['2026-09-16'].mark === 'excused');
  ok('clearing keeps the history and shows no mark', latest['2026-09-15'].mark === null && latest['2026-09-15'].id === 4);
  ok('an unknown mark is stored as no mark', ad.markRecord({ date: '2026-09-15', mark: 'vacation' }).mark === null);
  const withMark = ad.dayStatus('2026-09-16', ctx({}));
  ok('a mark never changes the status or the minutes', withMark.code === 'none' && withMark.minutes === 0);
  ok('the month line counts full, short and empty days',
    JSON.stringify(ad.monthCounts([{ code: 'full' }, { code: 'short' }, { code: 'short' }, { code: 'none' }, { code: 'off' }]))
      === JSON.stringify({ full: 1, short: 2, none: 1 }));
}

console.log('\n--- 3. Wiring ---');
{
  const store = codeOnly(read('src/store/useAppStore.js'));
  ok('a reload keeps the dashboard minutes (parentMinutes is loaded)',
    /allAttendance\[row\.date\] = \{[\s\S]{0,400}parentMinutes: row\.parentMinutes/.test(store),
    'without it the first minute after a reload wrote the day back at zero');

  const kinds = store.match(/const PARENT_RECORD_KINDS = \[([^\]]*)\]/);
  ok('only the two parent kinds can be written by the parent-record actions',
    !!kinds && /'parent-time'/.test(kinds[1]) && /'attendance-mark'/.test(kinds[1]) && kinds[1].split(',').length === 2);
  ok('...adding checks the kind',
    /async addParentRecord\(record\) \{\s*if \(!record \|\| !PARENT_RECORD_KINDS\.includes\(record\.kind\)/.test(store));
  ok('...and updating checks the stored row\'s kind and cannot change it',
    /async updateParentRecord\(id, changes\) \{[\s\S]{0,200}!PARENT_RECORD_KINDS\.includes\(current\.kind\)[\s\S]{0,120}kind: _kind/.test(store));

  const db = read('src/db/db.js');
  const policy = db.slice(db.indexOf('export const EXPORT_TABLE_POLICY'));
  ok('the parent\'s rows never travel in the learner export', /\n\s*adminRecords: '/.test(policy.slice(0, 4000)));

  const packet = read('src/lib/compliancePacket.js');
  const labels = packet.match(/KIND_LABELS\s*=\s*\{([\s\S]*?)\}/);
  ok('the compliance packet prints only the kinds it names', !!labels && /Object\.keys\(KIND_LABELS\)/.test(packet));
  ok('...and neither parent kind is one of them',
    !!labels && !/parent-time|attendance-mark/.test(labels[1]));

  const dash = read('src/components/Dashboard/ParentDashboard.jsx');
  const dashCode = codeOnly(dash);
  const groups = dashCode.slice(dashCode.indexOf('const SECTION_GROUPS'), dashCode.indexOf('const GROUP_OF_SECTION'));
  const groupBlock = (id) => {
    const i = groups.indexOf(`id: '${id}'`);
    return i < 0 ? '' : groups.slice(i, groups.indexOf(']', groups.indexOf('sections:', i)));
  };
  ok('Attendance is its own tab with the calendar first',
    /sections: \[\s*\{ id: 'attendance-calendar'/.test(groupBlock('attendance')) && /id: 'attendance', label/.test(groupBlock('attendance')));
  ok('...and is listed in exactly one tab', (groups.match(/id: 'attendance',/g) || []).length === 2 /* group id + section id */
    && !/'attendance'/.test(groupBlock('daily')));
  ok('the calendar renders for its section with the school\'s numbers passed in',
    /section === 'attendance-calendar' && \(\s*<AttendanceCalendar\s+minutesPerDay=\{GEORGIA_DAILY_MINUTES_TARGET\}\s+daysRequired=\{GEORGIA_DAYS_TARGET\}/.test(dashCode));
  ok('the old summary still renders', /section === 'attendance' && <AttendanceSection \/>/.test(dashCode));
  ok('Parent Time is listed under Records and renders', /id: 'parent-time'/.test(groupBlock('records'))
    && /section === 'parent-time' && <ParentTimeSection \/>/.test(dashCode));
  const main = dashCode.slice(dashCode.indexOf('export function ParentDashboard'));
  const timerAt = main.indexOf('<ParentTimeTimer');
  ok('the timer is on every tab — mounted once, outside any section condition',
    timerAt > 0 && (main.match(/<ParentTimeTimer/g) || []).length === 1
      && timerAt < main.indexOf("{section === 'mission-control-board'")
      && !/section === '[^']+' && \(?\s*<ParentTimeTimer/.test(main));
  ok('...and its log link opens the Parent Time section',
    /onOpenLog=\{\(\) => \{\s*setOpenGroup\('records'\);\s*setSection\('parent-time'\);/.test(main));
}

console.log('\n--- 4. The new files hold no school ---');
{
  const NEW = [
    'src/lib/parentTime.js',
    'src/lib/attendanceDay.js',
    'src/components/Dashboard/ParentTimeTimer.jsx',
    'src/components/Dashboard/AttendanceCalendar.jsx'
  ];
  for (const rel of NEW) {
    const text = read(rel);
    const code = codeOnly(text);
    ok(`${rel.split('/').pop()}: no state, school, learner or family word`,
      !/georgia|lamar|mission control|nova|\bmom\b/i.test(text));
    ok(`${rel.split('/').pop()}: no school threshold in code`, !/\b(180|270)\b/.test(code));
    ok(`${rel.split('/').pop()}: never asks UTC what day it is`,
      !/toISOString\(\)\.(slice\(0,\s*10\)|split\('T'\))/.test(code));
    ok(`${rel.split('/').pop()}: reads the content pack only inside a function`,
      !/^const \{[^}]*\} = academyContent\(\)/m.test(code));
  }
  const cal = codeOnly(read('src/components/Dashboard/AttendanceCalendar.jsx'));
  // Looked for the words `academyContent().timetable` until Sept 22, 2026, when
  // the timetable's rules moved to a platform slot the calendar now imports.
  // The property is that the calendar asks THIS SCHOOL which days count rather
  // than deciding itself, so it is asked that way: the slot, the school's pack
  // handed to it, and the school's own compliance rule.
  ok('the calendar asks the school for its rule and its calendar',
    /academyContent\(\)\.compliance/.test(cal) && /instructionProgress/.test(cal)
    && /content\/slots\/timetable\.js/.test(cal)
    && /[Ii]sSchoolDay\(academyContent\(\)/.test(cal),
    'a calendar that works out school days for itself has stopped asking the school');
  ok('...and writes the rule on the page', /What counts as a school day/.test(cal));
  ok('offline minutes go through the existing store action', /setOfflineInstructionMinutes\(date/.test(cal));
}

console.log('\n--- 5. The set-up steps are where a new computer lands ---');
{
  const door = read('src/components/FrontDoor/FrontDoor.jsx');
  const fn = door.slice(door.indexOf('function SetUpThisComputer('), door.indexOf('function ParentTab('));
  const steps = (fn.match(/<li>/g) || []).length;
  ok('the set-up screen lists the seven written steps', steps === 7, `${steps} steps`);
  ok('...including the restore file and turning backup back on',
    /learningos-migration-auto-latest\.json/.test(fn) && /turn on automatic backup/i.test(fn));
  ok('...and names no address of its own', !/netlify\.app|https?:\/\//.test(fn));
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('ALL CHECKS PASSED');
}
