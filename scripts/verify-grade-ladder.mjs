import './lib/academy-under-test.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

/**
 * =============================================================================
 * A GRADE LEVEL IS EARNED BEFORE THE NEXT OPENS — AND THE DOOR ALWAYS HAS A KEY.
 * =============================================================================
 *
 * WHY THIS EXISTS. (Sept 28, 2026.)
 *
 * A review of one school against its student's stated career found the subject
 * that decides that career carrying the weakest verification in the app. Every
 * other subject had quarterly exams. Maths had none — assessed entirely by
 * percentages the parent typed in, unit by unit, with nothing checking that a
 * grade level had been learned before the next one began. The plan behind it is
 * four grade levels in one year, each the foundation of the next.
 *
 * The parent chose a HARD STOP over a warning. That choice makes two failure
 * modes possible that a warning could not, and both would land on the child:
 *
 *   1. LOCKING THE KEY. If the test that opens a level is itself behind the
 *      lock, he is stranded with no way forward and no way to explain it.
 *      Section 3 exists entirely for this.
 *
 *   2. BLAMING HIM FOR HER BACKLOG. A test he sat three weeks ago that nobody
 *      has graded is not the same as a test he never took, and a gate that
 *      cannot tell them apart shuts the year on an adult's admin. Section 2.
 *
 * The rest holds the ordering (a ladder that sorts '10th' before '9th' inverts
 * itself the year it matters) and the two screens that render it.
 */

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const load = (rel) => import(pathToFileURL(path.join(REPO, rel)).href);
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');
const strip = (src) => src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

let passed = 0;
const failures = [];
const ok = (label, cond, detail = '') => {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
};

const G = await load('src/lib/gradeLadder.js');

/** Rows shaped exactly as the store holds them. */
const units = (level, n, done) =>
  Array.from({ length: n }, (_, i) => ({
    id: `${level}-u${i + 1}`, subject: 'x', gradeLevel: level,
    skillTitle: `${level} unit ${i + 1}`, completed: i < done
  }));
const challenge = (level, over = {}) => ({
  id: `${level}-cc`, subject: 'x', gradeLevel: level, isCourseChallenge: true,
  skillTitle: `${level} — Course Challenge`, completed: false, gradePercent: null, ...over
});

console.log('\n--- 1. the module is executable and ordered by number ---');
ok('gradeLadder.js is plain JavaScript a guard can run', typeof G.ladderState === 'function');
ok('the pass mark is stated once, as a constant', typeof G.PASS_MARK === 'number');
ok('a cumulative test is not held to the single-lesson bar', G.PASS_MARK < 90,
  `PASS_MARK ${G.PASS_MARK} — an adaptive year-long test is a harder instrument than a ten-question lesson`);
ok("'10th' sorts after '9th'", G.levelRank('10th') > G.levelRank('9th'),
  'a string sort inverts the top of the ladder the year it reaches double figures');
ok('levels come back lowest first',
  G.ladderLevels([...units('9th', 1, 0), ...units('10th', 1, 0), ...units('8th', 1, 0)]).join(',') === '8th,9th,10th');
ok('an unparseable level sorts last rather than crashing',
  G.ladderLevels([...units('later', 1, 0), ...units('7th', 1, 0)])[0] === '7th');

console.log('\n--- 2. four states, because two of them are hers ---');
ok('a test nobody sat is not-started', G.challengeState(challenge('5th')) === 'not-started');
ok('a test sat but ungraded is awaiting-grade',
  G.challengeState(challenge('5th', { completed: true, gradePercent: null })) === 'awaiting-grade',
  'collapsing this into "not passed" makes the app blame the child for the adult backlog');
ok('a test under the bar is below-pass',
  G.challengeState(challenge('5th', { completed: true, gradePercent: G.PASS_MARK - 1 })) === 'below-pass');
ok('a test on the bar passes',
  G.challengeState(challenge('5th', { completed: true, gradePercent: G.PASS_MARK })) === 'passed',
  'the bar must be inclusive — exactly 80 is a pass, not a near miss');
ok('a level with no test at all is missing', G.challengeState(null) === 'missing');
const waiting = G.ladderState([
  ...units('5th', 4, 4), challenge('5th', { completed: true, gradePercent: null }),
  ...units('6th', 4, 0), challenge('6th')
]);
ok('an ungraded test says the grown-up owns it', /grown-up|Parent Dashboard/i.test(waiting[1].opensWhen),
  waiting[1].opensWhen);
const failed = G.ladderState([
  ...units('5th', 4, 4), challenge('5th', { completed: true, gradePercent: 60 }),
  ...units('6th', 4, 0), challenge('6th')
]);
ok('a failed test says it can be taken again', /again/i.test(failed[1].opensWhen), failed[1].opensWhen);

console.log('\n--- 3. THE DOOR ALWAYS HAS A KEY ---');
const shut = G.ladderState([
  ...units('5th', 16, 11), challenge('5th'),
  ...units('6th', 11, 0), challenge('6th'),
  ...units('7th', 20, 0), challenge('7th')
]);
ok('an ordinary unit behind the gate is locked',
  G.rowIsLocked(shut, { gradeLevel: '6th', skillTitle: 'x' }) === true);
ok("THE LOCKED LEVEL'S OWN TEST IS NEVER LOCKED",
  G.rowIsLocked(shut, { gradeLevel: '6th', isCourseChallenge: true }) === false,
  'locking the key strands him with no way forward and no way to say why');
ok('no course challenge at any level is ever locked',
  ['5th', '6th', '7th'].every((l) => G.rowIsLocked(shut, { gradeLevel: l, isCourseChallenge: true }) === false));
ok('the level he is on is open', G.rowIsLocked(shut, { gradeLevel: '5th' }) === false);
ok('the lowest level is never locked', shut[0].locked === false,
  'a ladder whose bottom rung is shut has no way in at all');

console.log('\n--- 4. one blocker named, not a chain of them ---');
ok('every shut level names the SAME test', new Set(shut.filter((r) => r.locked).map((r) => r.blockedBy)).size === 1,
  'telling him level 7 waits on level 6 while level 6 is also shut reads as two problems when there is one');
ok('and it is the first unpassed one', shut.filter((r) => r.locked).every((r) => r.blockedBy === '5th'));
const opened = G.ladderState([
  ...units('5th', 4, 4), challenge('5th', { completed: true, gradePercent: 88 }),
  ...units('6th', 4, 1), challenge('6th'),
  ...units('7th', 4, 0), challenge('7th')
]);
ok('passing a test opens exactly one level', opened[1].locked === false && opened[2].locked === true);
ok('the summary follows him up the ladder', G.ladderSummary(opened).here === '6th',
  JSON.stringify(G.ladderSummary(opened)));
ok('a ladder with no tests at all locks nothing',
  G.ladderState([...units('5th', 3, 0), ...units('6th', 3, 0)]).every((r) => !r.locked),
  'a gate with nothing behind it is a wall');

console.log('\n--- 5. the two screens that render it ---');
const cardCode = strip(read('src/components/Dashboard/KhanAcademyMissionsCard.jsx'));
ok('the student board computes the ladder', /ladderState\(/.test(cardCode));
ok("...from the whole subject, not just this quarter", /khanAcademyAssignments[\s\S]{0,200}filter\([\s\S]{0,80}subject/.test(cardCode),
  'the test that opens this quarter was sat in a previous one');
ok('...and never offers a locked row as the next thing', /openRows\.find\(\(l\) => !l\.completed\)/.test(cardCode));
ok('an all-locked quarter does not claim he is caught up', /Nothing more opens until/.test(cardCode),
  '"all caught up" over a shut gate is a lie he would act on by stopping for the day');
/**
 * ---- THE KEY MUST BE ON THE SCREEN, NOT JUST IN THE SENTENCE ----
 *
 * Found while testing the gate rather than by a mutation: the board renders
 * the CURRENT quarter only, and the challenge that opens it belongs to an
 * earlier one. Without this the door names a test the page never shows, which
 * is the module's own stranding rule broken one level up.
 */
ok('the blocking challenge is pulled in from its own quarter', /gateKey/.test(cardCode),
  'the door names a test the board would otherwise never render');
ok('...and it is rendered as the thing to do', /assignment=\{gateKey\}/.test(cardCode));
ok('...and only when it is not already on this board', /already on this quarter's board|if \(here\) return null/.test(cardCode),
  'showing it twice in the quarter it belongs to is the duplicate-lesson bug again');

ok('the shut units are counted on his screen', /\{shut\.length\}/.test(cardCode),
  'a locked door with no count does not tell him how much is behind it');
ok('...and each shut unit is still named, greyed, in the full sequence',
  /shut\.map\(/.test(cardCode),
  'hiding them entirely would make the quarter look shorter than it is');

const parentCode = strip(read('src/components/Dashboard/GradeLadderCard.jsx'));
ok('the parent card exists and reads the same ladder', /ladderState\(/.test(parentCode));
/**
 * Matched as a rendered heading, not as bare text. The first version of this
 * check used /Waiting on you/ and a mutation run proved it toothless: the
 * status label "Waiting on your grade" contains that phrase, so deleting the
 * banner entirely still passed.
 */
ok('it surfaces what is waiting on HER first',
  /needsHer\.length > 0/.test(parentCode) && />Waiting on you</.test(parentCode),
  'a gate that silently waits on an adult backlog is worse than no gate');
ok('it offers a retake rather than a verdict', /take it again/i.test(parentCode));
ok('it is mounted in the Parent Dashboard',
  /GradeLadderCard/.test(strip(read('src/components/Dashboard/ParentDashboard.jsx'))));
ok('neither screen invents its own pass mark',
  !/\b(80|90)\b/.test(cardCode.replace(/className="[^"]*"/g, '')) || /PASS_MARK/.test(parentCode),
  'a second copy of the bar is a bar that will drift');

console.log('\n--- 6. it stays generic ---');
const libCode = read('src/lib/gradeLadder.js').toLowerCase();
for (const word of ['khan', 'math', 'lamar', 'aerospace']) {
  ok(`the ladder module never says "${word}"`, !libCode.includes(word),
    'this file takes rows and returns state; the school names its own levels');
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) { console.log(`\n${failures.length} CHECK(S) FAILED`); process.exit(1); }
console.log('\nALL CHECKS PASSED');
