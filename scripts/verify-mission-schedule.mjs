/**
 * ===========================================================================
 * QUARTERLY MISSIONS GET DATES, A CALENDAR, AND A DUPLICATE CHECK.
 * ===========================================================================
 *
 * The parent, Aug 29 2026: *"i would like thos to be scheduled for me"* and
 * *"the water bottle rocket was scheduled for him already or is that a
 * different one? ... make sure there aren't any duplicate projects located
 * elsewhere in the app."*
 *
 * ---- WHY Q1'S MISSION WAS NEVER STARTED ----
 *
 * A mission row carried a QUARTER and no date. The heaviest assessment in the
 * app — weighted like a quarterly exam, the thing that replaced IXL and every
 * paid diagnostic — appeared on no calendar, in no Coming Up panel, and in no
 * weekly view. Five weeks into Q1, nothing had ever said it was owed.
 *
 * Third instance in two days of one fault: field trips had real dates and
 * reached no calendar; Engineer Readiness had real awards and reached no
 * record; a mission had a real deadline and reached nothing.
 *
 * ---- TWO BUGS THE FIRST VERSION SHIPPED, BOTH PINNED BELOW ----
 *
 *   1. Q2's mission landed on **December 25th** — the quarter's last Friday is
 *      Christmas. Section 2.
 *   2. Due on the quarter's own last day, leaving no room to score and approve
 *      it inside the quarter it grades. Section 3.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(REPO, p), 'utf8');

let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed++; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? '  ' + detail : '')); }
}

const ms = await import(REPO + '/src/lib/missionSchedule.js');
const me = await import(REPO + '/src/academies/lamar/data/admin/missionEvaluations.js');
const sched = await import(REPO + '/src/lib/scheduler.js');
const hol = await import(REPO + '/src/academies/lamar/data/schedule/schoolHolidays.js');

const POOLS = [
  ...(await import(REPO + '/src/academies/lamar/data/aerospace/aerospaceProjects.js')).aerospaceProjects,
  ...(await import(REPO + '/src/academies/lamar/data/science/scienceExperiments.js')).scienceExperiments,
  ...(await import(REPO + '/src/academies/lamar/data/technology/technologyProjects.js')).technologyProjects,
  ...(await import(REPO + '/src/academies/lamar/data/robotics/roboticsProjects.js')).roboticsProjects
];

const asDate = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };

// ===========================================================================
console.log('--- 1. every quarter yields dates ---');
// ===========================================================================
ok('there are four mission quarters', me.MISSION_QUARTERS.length === 4);
for (const q of me.MISSION_QUARTERS) {
  const d = ms.missionDates(q, 'Three Fridays');
  ok(`${q} has a due date, a start-by and a scoring day`,
    Boolean(d && d.dueDate && d.startBy && d.scoreBy));
  ok(`${q} start-by comes before its due date`, d.startBy < d.dueDate, `${d.startBy} / ${d.dueDate}`);
}
ok('an unparseable quarter yields null rather than a guess',
  ms.missionDates('nonsense', 'Two Fridays') === null && ms.quarterEndsOn('') === null);

// ===========================================================================
console.log('\n--- 2. NO MISSION LANDS ON A HOLIDAY ---');
// ===========================================================================
/**
 * The first version put Q2's mission on December 25th. A deadline nobody can
 * meet is worse than no deadline.
 */
ok('Christmas Day really is not a school day', hol.isSchoolDay(asDate('2026-12-25')) === false);
for (const q of me.MISSION_QUARTERS) {
  for (const p of me.proposalsForQuarter(q)) {
    const d = ms.missionDates(q, p.timeEstimate);
    ok(`${q.slice(0, 2)} "${p.title.slice(0, 30)}" is due on a real school day`,
      hol.isSchoolDay(asDate(d.dueDate)), d.dueDate);
    ok(`  ...and on a Friday`, asDate(d.dueDate).getDay() === 5, d.dueDate);
  }
}
/**
 * The SCORING day has to be a school day too — and this check was missing.
 * A mutation that removed the holiday walk-back survived the whole suite,
 * because only `dueDate` was being checked: `scoreBy` still landed on
 * December 25th, so the app would have told her to score the quarter's
 * heaviest assessment on Christmas Day.
 *
 * Every date this module hands to a human gets checked, not just the one that
 * happened to be checked first.
 */
for (const q of me.MISSION_QUARTERS) {
  const d = ms.missionDates(q, 'Two Fridays');
  ok(`${q.slice(0, 2)} scoring day is a real school day`,
    hol.isSchoolDay(asDate(d.scoreBy)), d.scoreBy);
  ok(`  ...and a Friday`, asDate(d.scoreBy).getDay() === 5, d.scoreBy);
}
ok('THE CHECK: no mission in the year is due on Dec 25',
  me.MISSION_QUARTERS.every((q) =>
    me.proposalsForQuarter(q).every((p) => {
      const d = ms.missionDates(q, p.timeEstimate);
      return d.dueDate !== '2026-12-25' && d.scoreBy !== '2026-12-25';
    })),
  'this is what the first version did');

// ===========================================================================
console.log('\n--- 3. A WEEK IS LEFT TO SCORE IT ---');
// ===========================================================================
/**
 * A mission only reaches the grade once scored AND approved, and it counts
 * toward its own quarter. Due on the quarter's last day leaves no room for
 * either, so the heaviest assessment of the term would land after the term.
 */
for (const q of me.MISSION_QUARTERS) {
  const d = ms.missionDates(q, 'Two Fridays');
  ok(`${q.slice(0, 2)} leaves scoring time after the due date`,
    d.dueDate < d.scoreBy, `${d.dueDate} / ${d.scoreBy}`);
  ok(`  ...and the scoring day is still inside the quarter`,
    d.scoreBy <= ms.quarterEndsOn(q), `${d.scoreBy} / ${ms.quarterEndsOn(q)}`);
}

// ===========================================================================
console.log('\n--- 4. the lead time comes from the proposal, not a guess ---');
// ===========================================================================
const weekCases = [
  ['Two Fridays, outdoors', 2],
  ['Three Fridays', 3],
  ['Two to three Fridays', 3],
  ['', 3],
  [null, 3],
  [undefined, 3]
];
for (const [text, want] of weekCases) {
  ok(`${JSON.stringify(text)} -> ${want} weeks`, ms.missionWeeks(text) === want, String(ms.missionWeeks(text)));
}
ok('a range takes the LONGER end',
  ms.missionWeeks('Two to three Fridays') === 3,
  'running out of time is worse than starting a week early');
ok('a two-week mission starts later than a three-week one in the same quarter',
  ms.missionDates('Q1 2026-2027', 'Two Fridays').startBy >
  ms.missionDates('Q1 2026-2027', 'Three Fridays').startBy);

// ===========================================================================
console.log('\n--- 5. the timing states ---');
// ===========================================================================
const Q1 = 'Q1 2026-2027';
const d1 = ms.missionDates(Q1, 'Two to three Fridays');
const before = (s, n) => { const dt = asDate(s); dt.setDate(dt.getDate() - n); return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`; };
const after = (s, n) => before(s, -n);

ok('far ahead of the start date reads as ahead',
  ms.missionTiming(Q1, 'Two to three Fridays', 'proposed', before(d1.startBy, 30)).state === 'ahead');
ok('two weeks before the start date it says START NOW',
  ms.missionTiming(Q1, 'Two to three Fridays', 'proposed', before(d1.startBy, 5)).state === 'start-now',
  'the warning has to arrive while there is still room to act');
ok('past the start date, still unstarted, it is LATE TO START',
  ms.missionTiming(Q1, 'Two to three Fridays', 'proposed', after(d1.startBy, 3)).state === 'late-to-start');
ok('past the due date it is OVERDUE',
  ms.missionTiming(Q1, 'Two to three Fridays', 'in-progress', after(d1.dueDate, 1)).state === 'overdue');
ok('work underway past its start date is not nagged',
  ms.missionTiming(Q1, 'Two to three Fridays', 'in-progress', after(d1.startBy, 3)).state === 'ahead');
ok('an approved mission is done',
  ms.missionTiming(Q1, 'Two to three Fridays', 'approved', after(d1.dueDate, 40)).state === 'done');
ok('a done mission gets no nagging sentence',
  ms.missionTimingNote(ms.missionTiming(Q1, 'x', 'approved', '2027-01-01')) === null);
for (const state of ['overdue', 'late-to-start', 'start-now', 'ahead']) {
  const note = ms.missionTimingNote({ state, dueDate: '2026-10-23', startBy: '2026-10-02', weeks: 3 });
  ok(`"${state}" produces a sentence with a date in it`,
    typeof note === 'string' && note.length > 20 && /20\d\d-\d\d-\d\d/.test(note), String(note));
}

// ===========================================================================
console.log('\n--- 6. THE MISSION REACHES THE CALENDAR ---');
// ===========================================================================
/**
 * Driven by the QUARTER LIST, not by existing rows. A mission nobody has
 * chosen is exactly the one she needs to see — that is the situation she is
 * in right now.
 */
const items = sched.buildCalendarItems({ assignments: [], academicAssignments: [], fieldTrips: [], missionEvaluations: [] });
const missionItems = items.filter((i) => i.source === 'mission');
ok('THE CHECK: all four missions appear with NO rows in the database',
  missionItems.length === 4, String(missionItems.length),
);
ok('...each with a real due date', missionItems.every((i) => /^\d{4}-\d{2}-\d{2}$/.test(i.dueDate)));
ok('...each with a start-by, like a book report',
  missionItems.every((i) => /^\d{4}-\d{2}-\d{2}$/.test(i.startBy)));
ok('...named so an unchosen one still reads as owed',
  missionItems.every((i) => i.title.startsWith('Quarterly Mission')),
  missionItems.map((i) => i.title).join(' | '));
ok('...with keys that cannot collide with the other three sources',
  missionItems.every((i) => i.key.startsWith('mission::')));
ok('an approved mission is marked done',
  sched.buildCalendarItems({
    missionEvaluations: [{ quarter: Q1, projectId: 'q1-glider', status: 'approved' }]
  }).find((i) => i.key === 'mission::' + Q1)?.done === true);
ok('a chosen mission shows its real title',
  sched.buildCalendarItems({
    missionEvaluations: [{ quarter: Q1, projectId: 'q1-glider', status: 'accepted' }]
  }).find((i) => i.key === 'mission::' + Q1)?.title.includes('Glider'));
ok('calling without missionEvaluations still works', Array.isArray(sched.buildCalendarItems({})));

/** "Fixing one call site is not fixing a rule." Fourth source, same discipline. */
const CALLERS = [
  'src/components/Dashboard/ParentDashboard.jsx',
  'src/components/Dashboard/AcademicCenterCard.jsx',
  'src/components/Mentor/NovaDashboardGreeting.jsx',
  'src/components/Scheduler/NovaScheduleGuide.jsx'
];
for (const f of CALLERS) {
  const src = read(f);
  const calls = (src.match(/buildCalendarItems\(\{/g) || []).length;
  const withMissions = (src.match(/buildCalendarItems\(\{[^}]*missionEvaluations[^}]*\}\)/g) || []).length;
  ok(`${f.split('/').pop()} passes missionEvaluations at all ${calls} call site(s)`,
    calls > 0 && calls === withMissions, `${withMissions}/${calls}`);
}
/**
 * SCOPE, not just presence. The first attempt inserted the subscription into
 * the wrong component in ParentDashboard — `ComingUpSection` referenced
 * `missionEvaluations` with nothing declaring it, which parses cleanly and
 * throws at runtime. Every identifier passed must be declared in the same
 * function that passes it.
 */
for (const f of CALLERS) {
  const src = read(f);
  const fnRe = /function\s+(\w+)\s*\([^)]*\)\s*\{/g;
  const fns = [];
  let m;
  while ((m = fnRe.exec(src))) fns.push({ name: m[1], start: m.index });
  fns.forEach((fn, i) => { fn.end = i + 1 < fns.length ? fns[i + 1].start : src.length; });
  for (const fn of fns) {
    const body = src.slice(fn.start, fn.end);
    const call = body.match(/buildCalendarItems\(\{([^}]*)\}\)/);
    if (!call) continue;
    const args = call[1].split(',').map((x) => x.trim().split(':')[0].trim()).filter(Boolean);
    for (const a of args) {
      ok(`${fn.name} declares "${a}" it passes to buildCalendarItems`,
        new RegExp('(const|let|var)\\s+' + a + '\\b').test(body),
        'parses fine, throws at runtime');
    }
  }
}

// ===========================================================================
console.log('\n--- 7. THE DUPLICATE CHECK ---');
// ===========================================================================
const COMPLETIONS = { 'ae7-bottle-rocket': { completedAt: '2026-08-16T00:00:00Z', grade: 'C' } };
const noticeFor = (title) => {
  for (const q of me.MISSION_QUARTERS) {
    const p = me.proposalsForQuarter(q).find((x) => x.title === title);
    if (p) return ms.overlapNotice(p, POOLS, COMPLETIONS);
  }
  return null;
};

const rocket = noticeFor('Design and Launch a Water Bottle Rocket');
ok('THE CHECK: the water rocket mission is flagged against the built project',
  Boolean(rocket) && rocket.projectId === 'ae7-bottle-rocket', JSON.stringify(rocket));
ok('...and says he ALREADY BUILT it', rocket?.alreadyDone === true);
ok('...naming the date and the grade',
  /2026-08-16/.test(rocket?.text || '') && /graded C/.test(rocket?.text || ''),
  rocket?.text);

const bridge = noticeFor('Design, Build and Break a Bridge');
ok('the bridge mission is flagged as overlapping a scheduled project',
  Boolean(bridge) && bridge.projectId === 'sci7-bridge-building');
ok('...but NOT as already built, because he has not built it',
  bridge?.alreadyDone === false);

/**
 * The false-positive checks. These two share ONE word with a project and are
 * genuinely different work. A duplicate detector that cries wolf gets ignored,
 * and then the real one is ignored too.
 */
ok('"Mars Habitat Model" is NOT flagged against "Mars Rover Model"',
  noticeFor('Mars Habitat Model') === null,
  'a habitat with life support is not a rover');
ok('"Drone Flight Data Study" is NOT flagged against "Drone Concepts Model"',
  noticeFor('Drone Flight Data Study') === null,
  'flying a course and running statistics is not building a model');
ok('exactly two of the twelve missions are flagged',
  me.MISSION_QUARTERS.flatMap((q) => me.proposalsForQuarter(q))
    .filter((p) => ms.overlapNotice(p, POOLS, COMPLETIONS)).length === 2,
  'the audit she asked for');

ok('the overlap is matched against the pools, not hardcoded',
  !/bottle rocket/i.test(read('src/lib/missionSchedule.js').replace(/\/\*[\s\S]*?\*\//g, '')),
  'a hardcoded sentence goes stale the moment a project is renamed');

const uiSrc = read('src/components/Dashboard/MissionEvaluationSection.jsx');
ok('the notice renders on the proposal card, where she chooses',
  /overlapNotice\(proposal, ALL_PROJECTS, completions\)/.test(uiSrc));
ok('...and does NOT disable the option',
  !/disabled=\{[^}]*notice/.test(uiSrc),
  'it reports; she decides');
ok('the project pool list is built from the pools themselves',
  /const ALL_PROJECTS = \[\s*\.\.\.aerospaceProjects/.test(uiSrc),
  'a hand-maintained list is one someone forgets to update');

const storeSrc = read('src/store/useAppStore.js');
ok('completions are read from the Writing Journal entry that records them',
  /getProjectCompletions\(\)/.test(storeSrc) && /entry\?\.promptId/.test(storeSrc),
  'the write-up IS the completion record; a second one would drift');
ok('...taking the most recent write-up per project',
  /prior\.completedAt \|\| ''\) >= String\(when\)/.test(storeSrc),
  'a redo should report the redo');

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
