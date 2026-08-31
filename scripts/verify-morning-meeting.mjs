// ---------------------------------------------------------------------------
// THE MORNING MEETING. Run: node scripts/verify-morning-meeting.mjs
//
// ---- WHERE THIS CAME FROM (Aug 20, 2026) ----
//
// The parent: "Lamar logs in at 8:30 every morning and is working on his
// school work until he completes everything. It has to be longer than 4 1/2
// hrs."
//
// It was. Her record disagreed, and one reason was `block-1` — "Morning
// Meeting, Goals & Calendar", 08:30-09:00, thirty minutes. It appeared in
// exactly ONE file, defaultSchedule.js, and nowhere else in 293 others. No
// screen, no content, no completion record, no entry in BLOCK_FOR_SUBJECT.
//
// It could not book a minute, ever. Thirty minutes a day across a 180-day year
// is NINETY HOURS that were structurally impossible to count — not missed,
// not under-recorded, impossible.
//
// Offered a checkbox or a real screen she chose the screen, and named what
// belongs on it:
//
//   "In there it can mention to check his email for downloads, export to
//    import, view what will be worked on for the day, talk to mom regarding
//    anything that he is confused about, etc."
//
// This guard holds all four of those, the record behind them, and the one
// property that made the feature necessary: that running the meeting credits
// the block.
//
// ---- ASSERT PRESENCE AGAINST THE FILE, ABSENCE AGAINST THE CODE ----
//
// Six guards in this repo have passed against their own explanatory comment.
// `codeOnly()` below strips comments; every negative assertion uses it.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sm = await import(REPO + '/src/lib/scheduledMinutes.js');
const { defaultSchedule } = await import(REPO + '/src/academies/lamar/data/schedule/defaultSchedule.js');
const { EXPORT_TABLE_POLICY } = await import(REPO + '/src/db/db.js');

let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
}
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');
const codeOnly = (t) => t
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
  .replace(/^\s*\/\/.*$/gm, '');

const MM = 'src/components/Morning/MorningMeeting.jsx';

console.log('\n--- 1. the block is real, and it is worth what the timetable says ---');
{
  const block1 = defaultSchedule.find((b) => b.id === 'block-1');
  ok('block-1 is still 08:30-09:00', block1?.startTime === '08:30' && block1?.endTime === '09:00');
  ok('...and worth 30 minutes', sm.blockMinutes(block1) === 30);
  ok('...and it is instruction, not a break',
    !sm.NON_INSTRUCTIONAL_BLOCKS.has('block-1'),
    'Break and Lunch are the only two blocks that do not count');
  ok('a subject key now points at it',
    sm.BLOCK_FOR_SUBJECT.morningMeeting === 'block-1',
    'this entry did not exist, which is the whole reason the block could never credit');
}

console.log('\n--- 2. running the meeting books the 30 minutes ---');
{
  const done = sm.scheduledMinutesOn('2026-08-20', {
    morningMeetings: { '2026-08-20': { date: '2026-08-20', completedAt: '2026-08-20T12:35:00.000Z' } },
    scheduleBlocks: defaultSchedule
  });
  ok('a completed meeting credits 30 minutes', done === 30, `got ${done}`);

  /**
   * A row without completedAt is a draft. He can open the screen, type half a
   * goal and walk away; the block only books on work that finished.
   */
  const draft = sm.scheduledMinutesOn('2026-08-20', {
    morningMeetings: { '2026-08-20': { date: '2026-08-20', goal: 'half a thou' } },
    scheduleBlocks: defaultSchedule
  });
  ok('...but an unfinished row credits nothing', draft === 0, `got ${draft}`);

  const other = sm.scheduledMinutesOn('2026-08-19', {
    morningMeetings: { '2026-08-20': { date: '2026-08-20', completedAt: 'x' } },
    scheduleBlocks: defaultSchedule
  });
  ok('...and it books on its own date only', other === 0, `got ${other}`);

  /**
   * The date-set half. `scheduledMinutesByDate` builds its list of dates from
   * the sources it knows about — a day whose ONLY record is a meeting has to
   * be in that list or the credit vanishes exactly as it did before.
   */
  const byDate = sm.scheduledMinutesByDate({
    morningMeetings: { '2026-08-20': { date: '2026-08-20', completedAt: 'x' } },
    scheduleBlocks: defaultSchedule
  });
  ok('a day whose only work was the meeting still appears',
    byDate['2026-08-20'] === 30,
    JSON.stringify(byDate));

  /**
   * And it stacks with the rest of the day rather than replacing it — the unit
   * of credit is the block, and block-1 is not any other block.
   */
  const full = sm.scheduledMinutesByDate({
    morningMeetings: { '2026-08-20': { date: '2026-08-20', completedAt: 'x' } },
    khanDailyLog: { '2026-08-20': { math: true } },
    scheduleBlocks: defaultSchedule
  });
  ok('...and adds to the blocks he ticked, not instead of them',
    full['2026-08-20'] === 90, `got ${full['2026-08-20']} — 30 meeting + 60 maths`);
}

console.log('\n--- 3. the record survives the two computers ---');
{
  const db = read('src/db/db.js');
  const dbCode = codeOnly(db);
  ok('the schema has a morningMeetings table',
    /morningMeetings: 'date'/.test(dbCode),
    'keyed by date — a day is done or it is not, so the merge is trivially idempotent');
  ok('...added in a NEW version, not edited into an old one',
    /db\.version\(33\)\.stores\(\{/.test(dbCode) && /db\.version\(32\)\.stores\(\{/.test(dbCode),
    'editing v32 in place would leave every existing browser without the table');
  ok('the export policy has decided about it',
    EXPORT_TABLE_POLICY.morningMeetings === true,
    'the export guard fails on an undecided table — this is that decision');

  const store = codeOnly(read('src/store/useAppStore.js'));
  ok('the export payload carries it', /morningMeetings: dbMorningMeetings/.test(store));
  ok('...loaded from the FULL table, not the 60-day window',
    /loadAllMorningMeetings\(\)\n\s*\]\);/.test(store) || /loadAllMorningMeetings\(\)/.test(store),
    'a backup that holds 60 days is not a backup');
  ok('the import merge reads it back', /importedData\.morningMeetings \|\| \[\]/.test(store));
  ok('...and a day completed on either machine stays completed',
    /completedAt: local\?\.completedAt \|\| incoming\.completedAt \|\| null/.test(store),
    'letting an older file blank a completed row would delete 30 min off the Georgia record');
  ok('...and the words he typed are never overwritten by an empty field',
    /goal: local\?\.goal \|\| incoming\.goal \|\| ''/.test(store)
      && /question: local\?\.question \|\| incoming\.question \|\| ''/.test(store));
  ok('the merged rows are actually written to Dexie',
    /bulkPutMorningMeetings\(morningWrites\)/.test(store),
    'a merge that only touches memory is undone by the next reload');
  ok('...and reach the live store too',
    /khanDailyLog: withinWorkingWindow\(khanDailyLog\),\n\s*morningMeetings: withinWorkingWindow\(morningMeetings\),\n\s*weeklyWords\n\s*\}\);/.test(store),
    'or the screen keeps showing the pre-import day');
  /**
   * Aug 23, 2026. The merge BASELINE must be the full Dexie table, not the
   * 60-day state slice. Baselining off the window made every row older than
   * sixty days read as `undefined`, which turned the monotonic OR into a
   * whole-row overwrite — on the table that IS the Georgia attendance
   * evidence. State still gets the window; disk gets everything.
   */
  ok('the import baselines off the FULL table, not the 60-day window',
    /const morningBaseline = Object\.fromEntries\(dbMorningMeetings\.map/.test(store) &&
      /const khanDailyBaseline = Object\.fromEntries\(dbKhanDailyLog\.map/.test(store),
    'a merge baselined on a window silently overwrites everything outside it');
  ok('...loading both in full alongside the other windowed tables',
    /loadAllKhanDailyLog\(\),\n\s*loadAllMorningMeetings\(\)\n\s*\]\);/.test(store));
  ok('...and re-windows before handing them to the screens',
    /const withinWorkingWindow = \(byDate\) =>/.test(store));
  ok('hydrate loads the window on startup',
    /const morningMeetingRows = await loadMorningMeetings\(/.test(store));
}

console.log('\n--- 4. completing it is idempotent, and pays once ---');
{
  const store = codeOnly(read('src/store/useAppStore.js'));
  ok('there is a completeMorningMeeting action',
    /async completeMorningMeeting\(\{/.test(store));
  ok('...keyed on today, so twice in one day is one meeting',
    /const date = todayStr\(\);/.test(store) && /const prior = state\.morningMeetings\[date\] \|\| null;/.test(store));
  ok('...keeping the FIRST completion time when he comes back to it',
    /completedAt: prior\?\.completedAt \|\| new Date\(\)\.toISOString\(\)/.test(store),
    'the record should say when the meeting was, not when he last edited it');
  ok('...and paying XP only the first time',
    /if \(!prior\) \{/.test(store),
    'the Khan tick learned this one the hard way — six taps, 20 XP');
  ok('...and stamping which build he was on',
    /buildStamp: BUILD_STAMP/.test(store)
      && /import \{ BUILD_STAMP \} from '\.\.\/lib\/buildStamp\.js';/.test(store),
    'the answer to "why did his screen disagree with mine that morning"');

  /**
   * ---- THE STAMP HAS TO KEEP MOVING (Aug 24, 2026) ----
   *
   * It was rewritten by `scripts/package-update.mjs`, the script that built
   * the zip she emailed him. Netlify ended that workflow and nobody runs the
   * script now — so the string would have frozen at '2026-08-23 22:32' and
   * gone on being printed in the top bar of both computers as though it meant
   * something.
   *
   * A version number that stops moving is worse than no version number: it
   * answers "are we current?" with a confident wrong yes, which is exactly the
   * failure the stamp was built to prevent. So it comes from the build now.
   *
   * The load-bearing check is the NEGATIVE one — a hardcoded date here is the
   * whole bug, and it is the thing a future hand-edit would reintroduce.
   */
  {
    const stampFile = read('src/lib/buildStamp.js');
    const viteConfig = read('vite.config.js');
    ok('the build stamp is injected by the build, not typed into the file',
      /__BUILD_STAMP__/.test(stampFile) && /__BUILD_STAMP__: JSON\.stringify/.test(viteConfig),
      'Netlify runs `npm run build`; that is the only thing that knows when the deployed code was made');
    ok('...with no hardcoded date left behind',
      !/BUILD_STAMP = '\d{4}-\d{2}-\d{2}/.test(stampFile),
      'a frozen stamp is a screen answering "are we current?" with a confident wrong yes');
    ok('...and it survives being imported outside Vite',
      /typeof __BUILD_STAMP__ === 'string'/.test(stampFile),
      'these guard scripts import this module in bare node, where the global does not exist');
  }

  /**
   * The attendance row. instructionProgress iterates attendance rows, so a day
   * with no row is a day that never happened however many minutes its blocks
   * are worth. The meeting opens the day WITHOUT claiming a lesson was
   * completed — half an hour of calendar and goal-setting is instruction, but
   * it is not a lesson.
   */
  ok('the meeting opens an attendance row for the day',
    /await get\(\)\.bumpTodayAttendance\('lessonsCompleted', 0\);/.test(store));
  ok('...without inflating the lesson count',
    /async bumpTodayAttendance\(field, by = 1\) \{/.test(store)
      && /\[field\]: \(prior\[field\] \|\| 0\) \+ by/.test(store),
    'passing 0 to a function hard-coded to +1 would have silently counted a lesson');
}

console.log('\n--- 5. everything she asked to be on the screen is on the screen ---');
{
  const src = read(MM);
  const code = codeOnly(src);

  /**
   * ---- THE CHECK THAT HAD TO BE INVERTED (Aug 24, 2026) ----
   *
   * This used to assert that the screen tells him to check his email for a new
   * version. It did, and that was correct until the app moved to Netlify —
   * after which there is no email, no zip, and no second build to compare
   * against. The guard was then pinning a false instruction IN PLACE.
   *
   * A guard that locks in yesterday's truth is worse than no guard, so the
   * assertion is inverted: the screen must NOT ask him to do a thing he cannot
   * do. Absence is asserted against `codeOnly()`, never the raw source — the
   * comment above the removed step explains the history and says the old words.
   */
  ok('it no longer asks him to check email for a new version',
    !/Check your email for a new version/.test(code)
      && !/unzipped the new one/.test(code),
    'Netlify serves both computers the same build; the check cannot be performed');
  ok('...and the build stamp is off this screen entirely',
    !/BUILD_STAMP/.test(code),
    'the version belongs in the nav bar, where it is not a daily chore');

  /**
   * But trading files is NOT affected and must not be quietly lost with it.
   * Netlify serves the same code to both machines; it does not merge their
   * databases. His progress still travels by file, every single day.
   */
  ok('...while trading files with Mom survives the change',
    /Trade files with Mom/.test(src),
    'the deployment changed how CODE reaches him, not how WORK reaches her');

  // "export to import"
  ok('it can load Mom\'s file', /await importProgressData\(parsed\)/.test(code));
  ok('...and send his', /exportProgressData\(\)/.test(code));
  ok('...using the SAME store actions the parent side uses',
    /useAppStore\(\(s\) => s\.exportProgressData\)/.test(code)
      && /useAppStore\(\(s\) => s\.importProgressData\)/.test(code),
    'no second code path — a fix to one fixes both');
  ok('...clearing the file input so the same filename works tomorrow',
    /e\.target\.value = ''/.test(code),
    'without this, picking yesterday-shaped filename twice silently does nothing');
  ok('...and a failed import says nothing was changed',
    /Nothing was changed\. Ask Mom to send it again\./.test(src));

  // "view what will be worked on for the day"
  ok('it lists today\'s blocks', /todaysBlocks\.map/.test(code));
  ok('...only the ones that run today',
    /!Array\.isArray\(b\.days\) \|\| b\.days\.includes\(weekday\)/.test(code),
    'Gardening carries days:[5] — listing it on a Tuesday is how a schedule stops being believed');
  ok('...with the rotating block resolved to the subject that owns today',
    /resolveBlockLabel\(b, now, khanAcademyAssignments\)/.test(code),
    'the four-name fallback label tells him nothing about what to open');
  ok('...and marks Break and Lunch as not instruction, from the shared set',
    /NON_INSTRUCTIONAL_BLOCKS\.has\(b\.id\)/.test(code)
      && /import \{ NON_INSTRUCTIONAL_BLOCKS, blockMinutes \} from '\.\.\/\.\.\/lib\/scheduledMinutes\.js';/.test(code),
    'a second hand-written list of non-instructional blocks would drift from the Georgia counter');
  ok('...and shows what is due today and what is late',
    /dueToday/.test(code) && /overdue/.test(code));
  ok('...from the same planner feed the Scheduler uses',
    /buildPlannerItems\(\{ assignments, academicAssignments, writingEntries, gardenLog \}\)/.test(code),
    'passing fewer sources marks every writing and garden item permanently unfinished — that has shipped once already');

  // "talk to mom regarding anything that he is confused about"
  ok('it asks what he is stuck on', /stuck or confused about/.test(src));
  ok('...and sends it to Mission Comms as a real message',
    /sendMessage\(\{ sender: 'student', body: text \}\)/.test(code),
    'a field she has to remember to go and read is a question that goes unanswered');
  ok('...and surfaces anything from her he has not opened',
    /m\.sender === 'parent' && !m\.readByStudent/.test(code));
  /**
   * TWO WRONG WAYS TO ASK THIS, BOTH MINE.
   *
   *   1. pinning the whole argument list — broke when a fifth field was added
   *      to a behaviour that had not changed;
   *   2. "completeMorningMeeting must not appear within 400 characters of
   *      `try {`" — which is a proxy for "inside the try block", and a bad
   *      one: it fails on correct code that simply sits close by, which is
   *      exactly what happened here.
   *
   * A character count is not block structure. This cuts out the try/catch and
   * asks the real question: is the save OUTSIDE it?
   */
  const finishBody = (() => {
    const start = code.indexOf('const handleFinish');
    if (start === -1) return '';
    const end = code.indexOf('\n  };', start);
    return end === -1 ? code.slice(start) : code.slice(start, end);
  })();
  const tryStart = finishBody.indexOf('try {');
  const catchEnd = finishBody.indexOf('}', finishBody.indexOf('catch'));
  const savePos = finishBody.indexOf('completeMorningMeeting');

  ok('the finish handler is findable', finishBody.length > 0 && savePos !== -1,
    'every check below is vacuously true without this one');
  ok('...and the words survive a failed send',
    tryStart !== -1 && catchEnd !== -1 && savePos > catchEnd,
    'the save must sit AFTER the catch, so a comms failure does not eat what he typed');
  ok('...carrying the typed text, not the raw field',
    /completeMorningMeeting\(\{[^}]*question: text[^}]*\}\)/.test(finishBody));

  // the goal
  ok('it asks for one goal for the day', /Pick one thing to get done today/.test(src));
}

console.log('\n--- 6. it does not gate the day, and it is reachable ---');
{
  const code = codeOnly(read(MM));
  ok('he can leave without finishing', /Skip for now/.test(read(MM)));
  ok('...and the button is never disabled on an empty field',
    !/onClick=\{handleFinish\}[\s\S]{0,120}disabled/.test(code),
    'a boy locked out of Mathematics by an empty text box learns to type anything into the box');

  const app = codeOnly(read('src/App.jsx'));
  ok('the app has a route for it', /view === 'morning' && \(/.test(app));
  ok('...lazily, like every other screen', /const MorningMeeting = lazy\(/.test(app));

  const nav = codeOnly(read('src/components/Navigation/NavBar.jsx'));
  ok('it is in the nav', /\{ id: 'morning', label: 'Morning Meeting' \}/.test(nav));
  ok('...FIRST, above Mission Control',
    nav.indexOf("id: 'morning'") < nav.indexOf("id: 'dashboard'"),
    'a morning routine three items down is a morning routine that gets skipped');

  const dash = codeOnly(read('src/components/Dashboard/MissionControlDashboard.jsx'));
  ok('his home screen offers it', /onOpenMorningMeeting/.test(dash));
  ok('...and stops offering it once he has run it',
    /!morningMeetings\[todayDateStr\(\)\]\?\.completedAt/.test(dash),
    'a card that is always there stops being read');
  ok('...and never on a weekend or a holiday',
    /todayPattern\.kind !== 'weekend'/.test(dash) && /todayPattern\.kind !== 'holiday'/.test(dash));
  ok('...subscribed, so it disappears without a reload',
    /useAppStore\(\(s\) => s\.morningMeetings\)/.test(dash));
}

console.log('\n--- 7. she can see what he wrote ---');
{
  const src = read('src/components/Dashboard/ComplianceSection.jsx');
  const code = codeOnly(src);
  ok('the parent screen lists his meetings', /function MorningMeetingLog\(\)/.test(code));
  ok('...and it is actually rendered', /<MorningMeetingLog \/>/.test(code),
    'an unreferenced component is a decision that did not ship');
  ok('...showing only the ones he finished', /\.filter\(\(r\) => r\?\.completedAt\)/.test(code));
  ok('...newest first', /String\(b\.date\)\.localeCompare\(String\(a\.date\)\)/.test(code));
  ok('...with the goal he set', /r\.goal \? r\.goal :/.test(code));
  ok('...and it says plainly when there is nothing yet',
    /Nothing logged yet/.test(src),
    'a blank panel reads as broken');

  /**
   * The question deliberately does NOT appear here. It is sent to Mission
   * Comms, which is where she answers him; printing it in a second place she
   * has to remember to check is how a question goes unanswered for a week.
   */
  ok('the question is not duplicated onto this panel',
    !/r\.question/.test(code),
    'it lives in Mission Comms, where she can actually reply to it');
}

console.log('\n--- 8. the dates on the screen are Dates, not strings ---');
{
  /**
   * FOUND BY OPENING THE SCREEN, NOT BY ANY GUARD ABOVE.
   *
   * The first render of this component threw
   *
   *     date.toLocaleDateString is not a function
   *
   * and the whole page fell to the error boundary. `formatShortDate(date)`
   * takes a **Date**; every date on this screen is a 'YYYY-MM-DD' **string**.
   *
   * A wrong argument TYPE parses perfectly, passes every regex, and survives
   * all 62 checks above. Thirty-five guard suites and 295 files parsing said
   * the feature was ready; clicking the button said otherwise. That is the
   * standing lesson, and this is the guard that pays for having learned it.
   *
   * parseDateStr, not `new Date(str)`: the bare constructor reads a bare
   * 'YYYY-MM-DD' as UTC midnight, which prints as the PREVIOUS day anywhere
   * west of Greenwich — Georgia included.
   */
  const code = codeOnly(read(MM));
  ok('date strings go through a Date before formatting',
    /return formatShortDate\(parseDateStr\(dateStr\)\);/.test(code),
    'formatShortDate takes a Date — handing it a string throws at render');
  /**
   * This named the exact import list and broke when the look-ahead step needed
   * `addDays` and `toDateStr` as well. What matters is that parseDateStr is
   * imported from the shared module and that no date STRING is handed to the
   * bare Date constructor — `new Date(y, m, d)` with numbers is local time and
   * is fine, which is how the end-of-month is computed.
   */
  ok('...via parseDateStr, not the bare Date constructor',
    /import \{[^}]*\bparseDateStr\b[^}]*\} from '\.\.\/\.\.\/lib\/scheduler\.js';/.test(code)
      && !/new Date\((today|i\.dueDate|dateStr|r\.date)\)/.test(code),
    "new Date('2026-08-20') is UTC midnight — Aug 19 in Georgia");
  ok('...and formatShortDate is never handed a raw string again',
    !/formatShortDate\((today|i\.dueDate|r\.date|dateStr)\)/.test(code),
    'the exact call that crashed');
  ok('the header does not print the weekday twice',
    !/WEEKDAY_LABEL/.test(code),
    'formatShortDate already prints it — "Thursday - Thu, Aug 20" read as a stutter');
}

console.log('\n--- 9. the week and the month, so nothing arrives as a surprise ---');
{
  /**
   * The parent: **"in the morning meeting section add for him to look at his
   * weekly and monthly planner so that he can see what will be due."**
   *
   * Everything else on this screen is about TODAY. A twelve-year-old who only
   * ever sees today meets a four-step project on the morning it is due, and
   * this project has the receipts — a rocket build "set up too late", a
   * paragraph-writing piece a week overdue before anyone noticed.
   */
  const src = read(MM);
  const code = codeOnly(src);

  ok('there is a look-ahead step', /Look at your week and your month/.test(src));
  /**
   * PINNING THE STEP NUMBER WAS WRONG. This asserted `<Step n={4}` and
   * `of 5 steps done`; adding the progress step ahead of it moved both, on a
   * feature that had not changed.
   *
   * The properties that matter: it IS a numbered Step (not a loose panel), and
   * the footer's total matches how many Steps are actually rendered. That
   * second one is the real risk — a hard-coded total silently lies the moment
   * a step is added, which is exactly what would have happened here.
   */
  const stepNumbers = [...src.matchAll(/<Step n=\{(\d+)\}/g)].map((m) => Number(m[1]));
  ok('...and it is a real step',
    /<Step n=\{\d+\} title="Look at your week and your month"/.test(code));
  ok('...the steps are numbered 1..n with no gaps',
    JSON.stringify(stepNumbers) === JSON.stringify(stepNumbers.map((_, i) => i + 1)),
    JSON.stringify(stepNumbers));
  /**
   * THE FOOTER TOTAL MUST BE DERIVED, NOT TYPED. It read "of 4", "of 5", "of
   * 6" — hand-edited each time a step was added — and by the seventh step it
   * was simply wrong, silently, on the line that tells him where he is.
   *
   * The countable steps are one fewer than the rendered ones: the closing
   * "anything you are stuck on" is optional, and counting it would mean a boy
   * with no question can never finish the list.
   */
  ok('the footer total is computed from the checks, not written down',
    /\$\{stepsDone\} of \$\{stepChecks\.length\} steps done/.test(code)
      && !/of \d+ steps done/.test(code),
    'every hard-coded total in this file has eventually been wrong');
  const checkCount = (code.match(/const stepChecks = \[([\s\S]*?)\];/) || [, ''])[1]
    .split(',').filter((x) => x.trim()).length;
  ok(`...counting ${checkCount} of the ${stepNumbers.length} steps, all but the optional one`,
    checkCount === stepNumbers.length - 1,
    'the question step is optional; every other step must be counted');

  ok('the next 7 days are listed', /Next 7 days/.test(src) && /soon\.map/.test(code));
  ok('...and the rest of the month', /Rest of this month/.test(src) && /later\.slice\(0, 3\)/.test(code));

  /**
   * THE MONTH IS A REAL BOUNDARY. The first version ran `later` to the end of
   * the data and printed **"and 186 more"** — the whole school year on a panel
   * whose job is this month. A number that large is wallpaper, and it makes
   * the button under it look pointless.
   */
  ok('the look-ahead stops at the end of the month',
    /const monthEnd = toDateStr\(new Date\(d\.getFullYear\(\), d\.getMonth\(\) \+ 1, 0\)\);/.test(code)
      && /i\.dueDate > weekEnd && i\.dueDate <= monthEnd/.test(code),
    'unbounded, it said "and 186 more"');
  ok('...and today is not repeated in it',
    /!i\.done && i\.dueDate > today/.test(code),
    'today has its own section three inches up');
  ok('...and finished work is not listed as coming',
    /\{ due \} = splitPlannerItems/.test(code) && /!i\.done/.test(code));

  ok('both planner buttons exist',
    /Open the weekly planner/.test(src) && /Open the monthly planner/.test(src));
  ok('...and each opens the Scheduler ON the view it names',
    /onOpenPlanner\('weekly'\)/.test(code) && /onOpenPlanner\('monthly'\)/.test(code),
    'landing him on Daily and leaving him to find the tab is the part that gets skipped');

  const app = codeOnly(read('src/App.jsx'));
  ok('the app carries the chosen view through',
    /onOpenPlanner=\{\(mode\) => \{/.test(app) && /setScheduleMode\(mode\);/.test(app));
  ok('...into the Scheduler',
    /<SchedulerHome initialMode=\{scheduleMode\} \/>/.test(app));

  const sched = codeOnly(read('src/components/Scheduler/SchedulerHome.jsx'));
  ok('the Scheduler accepts an opening view',
    /export function SchedulerHome\(\{ initialMode = 'daily' \}\)/.test(sched));
  ok('...validated against its own tab list, not trusted',
    /MODES\.some\(\(m\) => m\.id === initialMode\) \? initialMode : 'daily'/.test(sched),
    'a bad value would render no view at all — the typing-link bug, again');
  ok('...and everything else still opens on Daily',
    /setScheduleMode\('daily'\)/.test(app),
    'the nav has always landed on Daily and must keep doing so');

  const store = codeOnly(read('src/store/useAppStore.js'));
  ok('whether he looked is recorded',
    /checkedPlanner = false/.test(store) && /checkedPlanner: Boolean\(checkedPlanner\)/.test(store));
  ok('...survives the merge from either machine',
    /checkedPlanner: Boolean\(local\?\.checkedPlanner \|\| incoming\.checkedPlanner\)/.test(store));
  ok('...and reaches the meeting row from the screen',
    /completeMorningMeeting\(\{[\s\S]{0,200}?checkedPlanner[\s\S]{0,80}?\}\)/.test(code),
    'pinning the whole argument list breaks every time a field is added');
  ok('...and she can see it',
    /r\.checkedPlanner \? 'planner read' : null/.test(codeOnly(read('src/components/Dashboard/ComplianceSection.jsx'))));
}

console.log('\n--- 10. he can see that he is getting better, not just what he owes ---');
{
  /**
   * The parent: **"Add to the morning meeting to have Lamar check his
   * progress."**
   *
   * Every other step on that screen is work he owes. None of them ever tells
   * him he is getting BETTER at anything, and a list that never ends is a list
   * a twelve-year-old stops reading.
   */
  const src = read(MM);
  const code = codeOnly(src);

  ok('there is a progress step', /Check your progress/.test(src));
  ok('...placed right after the file trade',
    src.indexOf('Check your progress') > src.indexOf('Trade files with Mom')
      && src.indexOf('Check your progress') < src.indexOf('What today looks like'),
    'he has just loaded her file — anything she graded last night arrived seconds ago');

  ok('it shows his rank and streak',
    /currentRank\?\.name/.test(code) && /useAppStore\(\(s\) => s\.currentRank\)/.test(code)
      && /useAppStore\(\(s\) => s\.streak\)/.test(code));
  ok('...and lessons mastered, total and this week',
    /masteredTotal/.test(code) && /masteredThisWeek/.test(code));
  ok('...where the weekly figure is what answers "am I getting anywhere"',
    /p\.lastCompletedDate >= since/.test(code),
    'a running total only ever goes up, so it cannot say whether THIS week went well');
  ok('...and a week of nothing says so plainly',
    /No lessons mastered in the last 7 days/.test(src),
    'a zero he can see beats a total that hides it');

  /**
   * Grades live in three tables. Reading one of them would be a lie of
   * omission — plain `includes`, because escaping a regex through two layers
   * of quoting is how the first version of this check passed on nothing.
   */
  for (const table of ['writingEntries', 'selfExplanations', 'khanAcademyAssignments']) {
    ok(`newly graded ${table} are surfaced`,
      code.includes('of ' + table + ' || []'),
      'a grade she entered that he never sees is feedback that did not happen');
    ok(`...and ${table} is subscribed`,
      code.includes('useAppStore((s) => s.' + table + ')'),
      'unsubscribed, it is undefined at render');
  }
  ok('...dated in HIS timezone, not UTC',
    /localDayOf\(e\.gradedAt\) >= since/.test(code) && /localDayOf\(a\.gradedAt\) >= since/.test(code),
    'a grade entered at 9pm Eastern belongs to that evening, not the next morning');

  /**
   * Mastery is 90%, so a lesson at 80% is indistinguishable from one never
   * opened, everywhere else in the app. This is the only place that offers a
   * second go at a SPECIFIC lesson rather than the next one in the queue.
   */
  ok('lessons he attempted and did not clear are named, with the number',
    /!p\.mastered && \(p\.attempts \|\| 0\) > 0/.test(code)
      && /Math\.round\(\(p\.bestAccuracy \|\| 0\) \* 100\)/.test(code)
      && /90% masters a lesson/.test(src),
    '"you got 80%" is a reason to go back; "try again" is not');

  ok('the button opens the real progress screen',
    /onClick=\{onOpenProgress\}/.test(code)
      && /onOpenProgress=\{\(\) => setView\('progress'\)\}/.test(codeOnly(read('src/App.jsx'))));

  const store = codeOnly(read('src/store/useAppStore.js'));
  ok('whether he looked is recorded',
    /checkedProgress = false/.test(store) && /checkedProgress: Boolean\(checkedProgress\)/.test(store));
  ok('...survives the merge from either machine',
    /checkedProgress: Boolean\(local\?\.checkedProgress \|\| incoming\.checkedProgress\)/.test(store));
  ok('...and she can see it',
    /r\.checkedProgress \? 'progress read' : null/.test(codeOnly(read('src/components/Dashboard/ComplianceSection.jsx'))));
}

console.log('\n--- the deploy goes one way, and nothing says otherwise ---');
{
  /**
   * =========================================================================
   * ---- THE FIFTH SURVIVOR OF THE NETLIFY MOVE. (Aug 26, 2026.) ----
   * =========================================================================
   *
   * The parent: **"Do I run build for Netlify first? Why do I have to do that
   * when it is supposed to go to Netlify via Github?"** — and then, plainly:
   * **"We haven't done a Netlify build since we started with Github. It was
   * pointless for you to do that. I want everything to go through Github."**
   *
   * She is right twice. Netlify has built from `main` on every push since Aug
   * 24. `BUILD-FOR-NETLIFY.bat` was the pre-move deploy — build `dist` here,
   * drag it onto Netlify by hand — and its closing line still said so.
   *
   * On Aug 24 four descriptions of the pre-Netlify world were swept out: the
   * Morning Meeting's "check your email for a new version", the frozen build
   * stamp, the nav tooltip and READ-ME-FIRST. **This file survived that sweep,
   * and was then read back to her as an instruction twice.**
   *
   * That is the same failure the email step was: a false instruction sitting
   * in plain sight gets followed. A guard, not a memory, is what stops the
   * sixth one.
   *
   * SCOPE IS DELIBERATELY THE INSTRUCTION FILES, NOT `docs/`. PROJECT_LOG.md
   * is an append-only history that legitimately QUOTES the old workflow; a
   * guard that forbade the words there would fail the day someone wrote down
   * what happened, which is not a bug.
   */
  const exists = (rel) => fs.existsSync(path.join(REPO, rel));
  ok('there is no hand-build-and-drag deploy script left in the repo',
    !exists('BUILD-FOR-NETLIFY.bat'),
    'it told her to drag the dist folder onto Netlify — a route retired on Aug 24');

  /**
   * The local `.bat` that REMAINS is a different thing and must not be swept
   * up with it: START-LEARNINGOS.bat runs the app when the internet is
   * out. It deploys nothing.
   */
  ok('...but the offline fallback is still there', exists('START-LEARNINGOS.bat'),
    'READ-ME-FIRST sends her to it when the internet is down');

  for (const file of ['READ-ME-FIRST.txt', 'README.md']) {
    const text = read(file);
    /**
     * `drag` on its own, not "drag the DIST folder". The first draft of this
     * check looked for that exact phrase and a two-word rewording — "drags the
     * DIST folder" — walked straight past it. There is no innocent use of the
     * word in a file whose whole subject is how to open the app.
     */
    ok(`${file} does not tell anyone to deploy by hand`,
      !/drag/i.test(text) && !/BUILD-FOR-NETLIFY/.test(text) && !/deploy .{0,20}by hand/i.test(text),
      'the one thing she has to do is commit and push');
    ok(`...and says the push is what rebuilds the site`,
      /push/i.test(text) && /rebuild|builds from|automatically/i.test(text),
      'a deploy step nobody names is a deploy step nobody trusts');
  }
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
