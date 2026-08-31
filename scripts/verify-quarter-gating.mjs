// ---------------------------------------------------------------------------
// A LESSON HE CANNOT DO TODAY IS NOT OFFERED TODAY — ON EVERY SCREEN.
// Run: node scripts/verify-quarter-gating.mjs
//
// ---- WHERE THIS CAME FROM (Aug 14-16, 2026) ----
//
// The parent: "Social studies isn't opened on Lamar's app."
//
// The blank screen was a stale build. The thing underneath it took two more
// days to see, and it was not really about Social Studies.
//
// **The daily board gates by quarter. The Lesson Roster did not.**
// getTodaysMission calls isQuarterAvailable, so a Q2 lesson is never served in
// Q1. The roster walked allLessons, grouped by subject and put a live Start on
// every one of them. In Q1 that meant:
//
//     Social Studies    0 of 29 available  ->  29 Start buttons
//     Robotics          0 of  9 available  ->   9 Start buttons
//     Technology       23 of 43 available  ->  43 Start buttons
//     Aerospace        11 of 54 available  ->  54 Start buttons
//
// He could open a Q4 robotics lesson on sensor calibration in August, months
// before the lesson that teaches it. Neither screen was wrong on its own terms.
// Together they were incoherent, and the one that let him through was the one
// with the buttons.
//
// And `hasLaterQuarterLessons` had sat in the store since Aug 6, written for
// exactly this, with a comment naming the harm — "would tell a 12-year-old he
// was done with Social Studies for the year" — and never once called.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sq = await import(REPO + '/src/lib/schoolQuarter.js');
const qa = await import(REPO + '/src/lib/quarterAvailability.js');
const { allLessons } = await import(REPO + '/src/academies/lamar/data/lessons/index.js');

let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
}
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');
const AUG = new Date('2026-08-16T12:00:00');

console.log('\n--- 1. a quarter knows when it opens ---');
{
  ok('Q2 of 2026-2027 opens Nov 1 2026', sq.quarterOpensOn('Q2 2026-2027') === '2026-11-01');
  ok('...Q3 rolls into the NEXT calendar year', sq.quarterOpensOn('Q3 2026-2027') === '2027-01-01',
    'Aug-Dec sit in the year the school year began; Jan-Jul in the one after');
  ok('...Q4 too', sq.quarterOpensOn('Q4 2026-2027') === '2027-04-01');
  ok('...and Summer', sq.quarterOpensOn('Summer 2027') === '2027-06-01');
  ok('an untagged lesson has no open date and does not throw',
    sq.quarterOpensOn(undefined) === null && sq.quarterOpensOn('nonsense') === null);
}

console.log('\n--- 2. what each subject is really offering in Q1 ---');
{
  const status = (s) => qa.subjectQuarterStatus(s, {
    lessons: allLessons, khanAcademyAssignments: [], currentBatchLabel: 'Q1 2026-2027', date: AUG
  });

  const ss = status('socialStudies');
  ok('Social Studies has nothing to start in Q1', ss.openNow === 0, `${ss.openNow}`);
  ok('...but is NOT finished — 29 lessons wait in later quarters', ss.laterCount === 29, `${ss.laterCount}`);
  ok('...which is exactly the distinction the note has to make',
    ss.quietThisQuarter === true,
    'saying "you finished Social Studies" in August is the harm hasLaterQuarterLessons was written to stop');
  ok('...and it can name the quarter and the date',
    ss.nextQuarter === 'Q2 2026-2027' && ss.nextQuarterOpensOn === '2026-11-01');

  const rb = status('robotics');
  ok('Robotics is a Q4 subject and says so', rb.quietThisQuarter && rb.nextQuarter === 'Q4 2026-2027');

  const tech = status('technology');
  ok('Technology has Q1 work, so it gets NO note', tech.quietThisQuarter === false,
    `${tech.openNow} open now — a note here would be noise`);

  /**
   * The Khan line is counted from real assignments, never from a constant.
   * KHAN_TAUGHT_SUBJECTS is math/reading/science — Social Studies is not in it
   * and is nonetheless on Khan this quarter, because the parent assigned World
   * History units. What he is doing lives in his assignments.
   */
  const withKhan = qa.subjectQuarterStatus('socialStudies', {
    lessons: allLessons,
    khanAcademyAssignments: [
      { subject: 'socialStudies', batchLabel: 'Q1 2026-2027', completed: true },
      { subject: 'socialStudies', batchLabel: 'Q1 2026-2027', completed: false },
      { subject: 'socialStudies', batchLabel: 'Q2 2026-2027', completed: false },
      { subject: 'math', batchLabel: 'Q1 2026-2027', completed: false }
    ],
    currentBatchLabel: 'Q1 2026-2027',
    date: AUG
  });
  ok('the Khan count is this subject, this quarter — not another subject or another quarter',
    withKhan.khanUnitsThisQuarter === 2 && withKhan.khanUnitsLeft === 1,
    `${withKhan.khanUnitsThisQuarter} / ${withKhan.khanUnitsLeft}`);
}

console.log('\n--- 3. the Trailblazer library stays open, always ---');
{
  const bios = allLessons.filter((l) => l.isTrailblazerBio);
  ok('the biographies exist and are untagged by quarter', bios.length > 0 && bios.every((b) => !b.quarter),
    `${bios.length} bios`);
  ok('...and every one is startable in Q1', bios.every((b) => qa.isLessonOpen(b, AUG)),
    'a browsable library, per Part 4 — and the one thing in Social Studies he CAN open today');
  ok('...and in every other month too',
    bios.every((b) => qa.isLessonOpen(b, new Date('2027-02-01T12:00:00'))));
}

console.log('\n--- 4. the roster no longer offers what the board refuses ---');
{
  const roster = read('src/components/Lesson/LessonRoster.jsx');
  const code = roster.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

  ok('the roster asks whether the lesson is open', /const notYet = !isLessonOpen\(lesson\)/.test(code));
  ok('...and refuses to start it when it is not', /disabled=\{isLocked \|\| needsRepractice \|\| notYet\}/.test(code),
    'this screen had a live Start on every lesson in the school year');
  ok('...telling him WHEN instead of just no', /Opens in \{lesson\.quarter\.split/.test(code) && /quarterOpensOn\(lesson\.quarter\)/.test(code));
  ok('the out-of-quarter lessons are still LISTED, not hidden',
    !/filter\(\(l\) => isLessonOpen/.test(code) && !/isLessonOpen\(lesson\) &&/.test(code),
    "the year's plan is worth seeing — the same call the Book Library makes about empty slots");
  ok('the quiet-quarter note is rendered per subject', /<QuietQuarterNote/.test(code));
  ok('...from reactively selected state, not a store getter',
    /useAppStore\(\(s\) => s\.khanAcademyAssignments\)/.test(code),
    "a getter's reference never changes, so the note would not update when he finishes a unit");

  const note = read('src/components/Lesson/QuietQuarterNote.jsx');
  ok('the note never says he finished the subject',
    !/finished (the |this )?(subject|year)/i.test(note.replace(/\/\*[\s\S]*?\*\//g, '')),
    'the exact sentence hasLaterQuarterLessons was written on Aug 6 to prevent');
  ok('...and says the listed lessons are early, not late',
    /not because they are late/.test(note));
  ok('...and only appears when the quarter really is quiet',
    /if \(!status\?\.quietThisQuarter\) return null;/.test(note));

  /** The board was already right. It must stay right. */
  const store = read('src/store/useAppStore.js');
  const mission = store.slice(store.indexOf('getTodaysMission(subject)'));
  ok('the daily board still gates by quarter',
    /isQuarterAvailable\(lesson\.quarter\)/.test(mission.slice(0, mission.indexOf('\n  },'))));
  ok('...and still refuses to serve a Trailblazer bio as a daily mission',
    /!lesson\.isTrailblazerBio/.test(mission.slice(0, mission.indexOf('\n  },'))),
    'the first time quarter gating shipped, Social Studies fell through to the first bio');
}

console.log('\n--- 5. no other screen can start an out-of-quarter lesson ---');
{
  /**
   * The roster was the only hole, and the point of this check is that it stays
   * the only place with a Start button that has to think about quarters.
   */
  const dash = read('src/components/Dashboard/MissionControlDashboard.jsx');
  ok('the dashboard only ever starts what getTodaysMission handed it',
    !/allLessons\.find\([\s\S]{0,200}onStartLesson/.test(dash));
  ok('...and every mission row comes from that one gated call',
    (dash.match(/getTodaysMission\(/g) || []).length >= 2 && /const mission = getTodaysMission\(subject\)/.test(dash));
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
