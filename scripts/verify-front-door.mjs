// ---------------------------------------------------------------------------
// THE FRONT DOOR TELLS NOBODY ANYTHING. Run: node scripts/verify-front-door.mjs
//
// LearningOS step 2 (Aug 31 2026). The rule, from the spec and from the
// approved mockup's own copy:
//
//   "No names, ages, goals, or schedules appear on this page. A child's
//    information exists only after that child signs in."
//
// That rule has two halves, and only one of them is obvious.
//
// The obvious half: don't render a child's name. Easy to write, easy to keep.
//
// The half that gets lost: don't let the door ANSWER the question either. A
// screen that says "no one by that name" for a wrong name and "wrong numbers"
// for a wrong PIN has published the guest list to anyone willing to type. The
// door must fail identically both ways — same message, same work, same time.
// That is the check most likely to be undone by a well-meaning edit six months
// from now trying to be helpful, so it is the one this file argues hardest.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');
const codeOnly = (rel) =>
  read(rel)
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    .replace(/^\s*\/\/.*$/gm, '');

function sourceFiles(dir = 'src', acc = []) {
  for (const entry of fs.readdirSync(path.join(REPO, dir), { withFileTypes: true })) {
    const rel = `${dir}/${entry.name}`;
    if (entry.isDirectory()) sourceFiles(rel, acc);
    else if (/\.jsx?$/.test(entry.name)) acc.push(rel);
  }
  return acc;
}

let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) {
    passed += 1;
    console.log('PASS  ' + label);
  } else {
    failures.push(label);
    console.log('FAIL  ' + label + (detail ? `  ${detail}` : ''));
  }
}

const fd = await import(REPO + '/src/lib/frontDoor.js');

console.log('--- 1. a wrong name and a wrong PIN are the same failure ---');

ok('there is exactly one student failure message', typeof fd.SIGN_IN_FAILED === 'string');
ok("...and it does not mention names", !/name/i.test(fd.SIGN_IN_FAILED), fd.SIGN_IN_FAILED);
ok('...and it does not confirm or deny that anyone was found',
  !/(not found|no such|unknown|doesn't exist|no one)/i.test(fd.SIGN_IN_FAILED), fd.SIGN_IN_FAILED);

const doorCode = codeOnly('src/lib/frontDoor.js');
const studentErrors = [...doorCode.matchAll(/return \{ ok: false, error: ([^}]+) \}/g)]
  .map((m) => m[1].trim());
// Bounded at signInParent: the parent door is allowed to be specific, because
// there is nobody to enumerate there — one grown-up, whose email she typed.
const studentFn = doorCode.slice(
  doorCode.indexOf('export async function signInStudent'),
  doorCode.indexOf('export async function signInParent')
);
const inStudent = [...studentFn.matchAll(/error: ([A-Za-z_$][\w$]*|'[^']*')/g)].map((m) => m[1]);
ok('signInStudent returns only the one shared constant',
  inStudent.length > 0 && inStudent.every((e) => e === 'SIGN_IN_FAILED'),
  inStudent.join(' | '));

ok('a missed name still costs a verification, so the clock says nothing either',
  /const decoy =/.test(studentFn) && /decoy\?\.pin/.test(studentFn),
  'without a decoy, an unknown name returns instantly and a known one does not');

// Behaviour, not just shape: three different wrong answers, one message.
const pinRecord = { salt: 'a1b2c3d4a1b2c3d4a1b2c3d4a1b2c3d4', hash: 'deadbeef', iterations: 1 };
const records = [{ id: 'lamar', displayName: 'Lamar', pin: pinRecord }];
const outcomes = await Promise.all([
  fd.signInStudent(records, 'Nobody', '1234'),
  fd.signInStudent(records, 'Lamar', '9999'),
  fd.signInStudent(records, '', '')
]);
ok('unknown name, wrong PIN, and empty form all return the identical message',
  new Set(outcomes.map((o) => o.error)).size === 1 && outcomes.every((o) => o.ok === false),
  outcomes.map((o) => o.error).join(' | '));

console.log('\n--- 2. the door renders nothing about a child ---');

const door = read('src/components/FrontDoor/FrontDoor.jsx');
const doorMarkup = codeOnly('src/components/FrontDoor/FrontDoor.jsx');
ok('the door receives academies only to verify against', /academies/.test(doorMarkup));
ok('...and never maps over them into markup',
  !/academies[\s\S]{0,80}\.map\(/.test(doorMarkup),
  'a list of children to pick from is the exact thing the rule forbids');
ok('...and never renders a displayName',
  !/\{[^}]*displayName[^}]*\}/.test(doorMarkup),
  'displayName is for matching typed input, not for showing');
ok('...and never renders how many Academies exist',
  !/academies\.length/.test(doorMarkup),
  'a count is information about the family too');
ok('the rule is written down where the next editor will see it',
  /may not do|never RENDER|only after that child signs in/i.test(door),
  'a rule with no stated reason is a rule that gets optimised away');

const gate = codeOnly('src/FrontDoorGate.jsx');
ok('the pre-sign-in frame renders no text at all',
  /phase === 'booting'\) return <div style=\{\{ minHeight: '100vh'/.test(gate));

// Nothing on the pre-sign-in path may import an Academy's content. novaVoice.js
// holds STUDENT_NAME and Commander Nova's lines — Lamar's guide, his name.
const PRE_SIGN_IN = [
  'src/FrontDoorGate.jsx',
  'src/components/FrontDoor/FrontDoor.jsx',
  'src/components/FrontDoor/FirstRun.jsx',
  'src/lib/frontDoor.js',
  'src/db/householdDb.js',
  'src/academies/registry.js'
];
const leaks = PRE_SIGN_IN.filter((f) => /novaVoice|STUDENT_NAME|NOVA_NAME/.test(codeOnly(f)));
ok('no pre-sign-in file imports a guide or a learner name', leaks.length === 0, leaks.join(', '));

console.log('\n--- 3. secrets are hashed; nothing else pretends to be ---');

const household = codeOnly('src/db/householdDb.js');
ok('the household schema stores a pin record, not a pin',
  !/pin: *['"`]/.test(household) && /academies: 'id'/.test(household));
ok('PINs go through the same PBKDF2 as the parent passcode',
  /buildSecretRecord/.test(codeOnly('src/components/FrontDoor/FirstRun.jsx')));
ok('...and are verified with the shared verifyPasscode',
  /verifyPasscode/.test(doorCode));
const auth = codeOnly('src/lib/parentAuth.js');
ok('buildSecretRecord salts and stretches like the passcode builder',
  /export async function buildSecretRecord/.test(auth) &&
    /randomBytes\(16\)/.test(auth.slice(auth.indexOf('buildSecretRecord'))) &&
    /iterations: ITERATIONS/.test(auth.slice(auth.indexOf('buildSecretRecord'))));
ok('a PIN is refused at setup if it is four the same or four in a row',
  fd.isGuessablePin('1111') && fd.isGuessablePin('1234') && fd.isGuessablePin('4321') &&
    !fd.isGuessablePin('4071'));
ok('...but never refused at SIGN-IN, where an existing PIN must always be typed in',
  !/isGuessablePin/.test(codeOnly('src/components/FrontDoor/FrontDoor.jsx')),
  'a rule change must not lock a child out of a PIN they already have');

console.log('\n--- 4. a forgotten passcode is not a lockout ---');

const firstRun = codeOnly('src/components/FrontDoor/FirstRun.jsx');
ok('first run creates a passcode', /buildPasscodeRecord\(/.test(firstRun));
ok('...with a recovery code, shown once',
  /generateRecoveryCode\(\)/.test(firstRun) &&
    /written it down/i.test(read('src/components/FrontDoor/FirstRun.jsx')));

// THE REGRESSION THIS EXISTS TO PREVENT.
//
// The gate wraps the whole app. A parent who forgets the passcode, with no
// recovery path on the screen in front of her, is locked out of a year of
// attendance, grades and compliance records that are sitting intact in
// IndexedDB three feet away. There is no server to email a reset link from.
// verifyRecoveryCode has always existed; only the screen was ever missing.
const doorFile = codeOnly('src/components/FrontDoor/FrontDoor.jsx');
ok('the parent tab offers the recovery code as a way in',
  /verifyRecoveryCode/.test(doorFile),
  'without this, a forgotten passcode is a lockout with the records intact and unreachable');
ok('...and the link is actually rendered, not just imported',
  /use my recovery code/i.test(read('src/components/FrontDoor/FrontDoor.jsx')));
ok('a used recovery code forces a NEW passcode',
  /mode === 'reset'/.test(doorFile) && /buildPasscodeRecord\(/.test(doorFile),
  'otherwise one written-down string opens the dashboard forever');
ok('...and issues a NEW recovery code with it',
  /generateRecoveryCode\(\)/.test(doorFile));
ok('...and the old one is said to be dead, in as many words',
  /old recovery code no longer works/i.test(read('src/components/FrontDoor/FrontDoor.jsx')));

console.log('\n--- 5. a remembered learner still lands in school ---');

ok('the gate remembers the last Academy', /loadSession\(\)/.test(gate));
ok('...and opens it without showing the door',
  /remembered[\s\S]{0,200}setPhase\('in'\)/.test(gate));
ok('the session record holds an id and a time, and nothing else',
  /academyId,\s*signedInAt/.test(household),
  'a remembered session must not become a place child data accumulates');
ok('signing out forgets it and closes the connection',
  /clearSession\(\)/.test(gate) && /closeAcademy\(\)/.test(gate));
ok('...and returns to the home page rather than a bare panel',
  /setPhase\('home'\)/.test(gate));

console.log('\n--- 5b. the sign-in panel opens over the home page ---');

const home = codeOnly('src/components/FrontDoor/HomePage.jsx');
ok('the home page exists and is what the signed-out state renders',
  /<HomePage/.test(gate));
ok('it carries both logins and a way to create an Academy',
  /onOpenStudent/.test(home) && /onOpenParent/.test(home) && /onCreateAcademy/.test(home));
ok('the panel is a dialog over it, closable',
  /role="dialog"/.test(doorFile) && /onClose/.test(doorFile));
ok('...and Escape closes it', /e\.key === 'Escape'/.test(doorFile));
ok('the home page reads nothing from the household database',
  !/loadAcademyRecords|academies\./.test(home),
  'nothing about a real learner may reach this page');

console.log('\n--- 6. the door works with no network ---');

// Comments stripped: the file's own header explains at length that it does NOT
// load the mockup's Google Fonts, and naming them there must not trip this.
const css = read('src/components/FrontDoor/frontDoor.css').replace(/\/\*[\s\S]*?\*\//g, '');
ok('the front door loads no external font', !/fonts\.googleapis|fonts\.gstatic|@import url\(/.test(css),
  'this app has to work on a morning when the internet does not');
ok('...and names real fallbacks for the faces it asks for',
  /Karla,[^;]*sans-serif/.test(css) && /Newsreader,[^;]*serif/.test(css));

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
