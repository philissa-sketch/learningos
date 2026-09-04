// ---------------------------------------------------------------------------
// A PARENT CAN REACH EVERY ACADEMY.  Run: node scripts/verify-three-doors.mjs
//
// C4 step 1. Three doors that the spec assumed and the app did not have.
//
//   1. CHOOSE   which Academy to open
//   2. ADD      another one, once one already exists
//   3. REPOINT  a working Academy at a different curriculum
//
// ---- WHY THIS FILE EXISTS ----
//
// The separation underneath LearningOS was real and provable for weeks before
// anyone could use it. Records lived in separate databases, content in separate
// folders, and 57 checks said so. Then a parent sat down and said:
//
//   "There isn't an option to choose either school. It just takes me back to
//    Mission Control."
//
// She was right, and every check passed. The cause was one line —
// `enter(academies[0].id, 'parent')` — and nothing in the repo was watching the
// question *can a person get there*, because every guard was watching whether
// the thing underneath was correct.
//
// So this file checks REACHABILITY, and it is the first one that does.
//
// ---- THE SHAPE IT IS REALLY GUARDING ----
//
// Twice now this repo has shipped a field that was read in many places and
// written in none, or written only from a screen you could reach only when the
// thing was already broken. `contentPack` was the second. Both times it cost a
// real outage on a real child's school.
//
// A read with no writer is a one-way door. A write reachable only from a
// failure state is not a writer. Section 3 below is that rule, executable.
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

const gate = codeOnly('src/FrontDoorGate.jsx');
const corner = codeOnly('src/components/FrontDoor/ParentCorner.jsx');
const shell = codeOnly('src/components/Academy/AcademyShell.jsx');

// ---------------------------------------------------------------------------
console.log('--- 1. the parent door ends at a choice, never at an Academy ---');
// ---------------------------------------------------------------------------

// The regression this whole file was written for. Indexing a list of children
// on the parent's behalf is not a shortcut once the list has more than one row
// in it — it is the app deciding which of her children she meant.
const indexed = [...gate.matchAll(/academies\s*\[\s*\d+\s*\]/g)].map((m) => m[0]);
ok('no code path enters an Academy by list position',
  indexed.length === 0,
  `${indexed.join(', ')} — this is the line that made LearningOS single-school`);

ok('a verified passcode lands on the choosing phase',
  /onParentSignedIn=\{\(\) => \{[\s\S]{0,400}setPhase\(/.test(gate) &&
    /setPhase\(academies\.length === 0 \? 'first-run' : 'choose'\)/.test(gate),
  'the parent door must route by whether there is anything to choose between');

ok('...and an empty machine goes to creating the first Academy instead',
  /academies\.length === 0 \? 'first-run'/.test(gate),
  'a choice between nothing is a dead end');

ok('the gate has a choosing phase at all',
  /phase === 'choose'/.test(gate) && /<ParentCorner/.test(gate));

ok('opening a chosen Academy passes THAT id',
  /onOpenAcademy=\{\(academyId\) => enter\(academyId, 'parent'\)\}/.test(gate),
  'the id has to come from the row the parent pressed');

// ---------------------------------------------------------------------------
console.log('\n--- 2. the screen that shows names is behind the passcode ---');
// ---------------------------------------------------------------------------
//
// The front-door rule and this screen look like they contradict each other, and
// they do not: FrontDoor.jsx is shown to whoever sits down at the keyboard, and
// ParentCorner is shown only after a PBKDF2 verification. Refusing to show a
// parent her own children's names would protect nobody.
//
// The rule is kept checkable by keeping them in two files. A guard that had to
// decide whether a given `.map()` sat before or after authentication would
// eventually be wrong; a guard that counts entrances cannot be.

const rendersCorner = sourceFiles().filter((f) => /<ParentCorner\b/.test(codeOnly(f)));
ok('ParentCorner has exactly one caller',
  rendersCorner.length === 1 && rendersCorner[0] === 'src/FrontDoorGate.jsx',
  rendersCorner.join(', '));

// Everything the gate can render before a passcode. If ParentCorner ever moves
// into one of these, the door starts publishing the household's guest list.
const homePhase = gate.slice(gate.indexOf("phase === 'home'"));
ok('...and it is not rendered from the home phase',
  !/<ParentCorner/.test(homePhase),
  'the home page is shown to whoever sits down — it may not list children');

ok('the door itself still renders no name',
  !/<ParentCorner/.test(codeOnly('src/components/FrontDoor/FrontDoor.jsx')),
  'FrontDoor.jsx is pre-authentication and stays that way');

ok('ParentCorner says in prose why it may do what the door may not',
  /passcode has been verified|after a PBKDF2|other side of it/i.test(
    read('src/components/FrontDoor/ParentCorner.jsx')
  ),
  'a rule with no stated reason is a rule that gets optimised away');

// ---------------------------------------------------------------------------
console.log('\n--- 3. adding a second Academy does not sign into the first ---');
// ---------------------------------------------------------------------------

ok('the grown-up corner offers adding one',
  /onAddAcademy/.test(corner) && /Add an Academy/.test(read('src/components/FrontDoor/ParentCorner.jsx')));

ok('...and the gate routes that to first run',
  /onAddAcademy=\{\(\) => setPhase\('first-run'\)\}/.test(gate));

ok('...which does not ask for a passcode that already exists',
  /needsPasscode=\{!parentAuth\?\.hash\}/.test(gate),
  'a parent who just signed in must not be asked to invent a second passcode');

ok('...and cancelling returns to the corner she came from',
  /setPhase\(parentAuth\?\.hash && academies\.length > 0 \? 'choose' : 'home'\)/.test(gate),
  'dropping her on the home page makes her retype the passcode to get back');

// ---------------------------------------------------------------------------
console.log('\n--- 4. contentPack has a writer reachable from a WORKING school ---');
// ---------------------------------------------------------------------------
//
// This is the section that matters most, and the one whose absence has already
// caused an outage. `contentPack` was written in two places and BOTH were
// screens you could only reach once the Academy was broken. The field could be
// wrong on a school that ran perfectly, and nothing could change it and nothing
// displayed it.

const readyBranch = shell.slice(shell.indexOf("content === 'ready'"));
ok('the working-school branch can reach the curriculum picker',
  /ContentPackPicker/.test(readyBranch),
  'a writer you can only reach when the thing is already broken is not a writer');

ok('...and it is offered to a parent only',
  /enteredAs === 'parent' \?[\s\S]{0,200}CurriculumChip/.test(shell),
  'a learner must not swap her own curriculum mid-morning');

ok('a working school displays which curriculum it is running',
  /Curriculum: \{pack\}/.test(read('src/components/Academy/AcademyShell.jsx')),
  'a field nobody can see is a field nobody can correct');

ok('repointing writes the field and then reloads',
  /async function repointCurriculum\(contentPack\)[\s\S]{0,300}onAcademyChanged\?\.\(\{ contentPack \}\)[\s\S]{0,200}window\.location\.reload\(\)/.test(shell),
  'the school read its content at module scope — swapping it underneath leaves it holding the old pack');

ok('the change screen names the current pack before offering to change it',
  /This Academy is working through/.test(read('src/components/Academy/AcademyShell.jsx')),
  '§3a: a parent has to be able to see a wrong choice to recognise it');

// ---------------------------------------------------------------------------
console.log('\n--- 5. nothing here learned a learner\'s name ---');
// ---------------------------------------------------------------------------
//
// The three doors are platform. They handle a family's Academies by id and by
// whatever displayName the family typed, and they must not import anything that
// carries one child's curriculum, guide or name.

const NEW_PLATFORM = [
  'src/FrontDoorGate.jsx',
  'src/components/FrontDoor/ParentCorner.jsx',
  'src/components/Academy/AcademyShell.jsx'
];
const leaks = NEW_PLATFORM.filter((f) => /novaVoice|STUDENT_NAME|NOVA_NAME/.test(codeOnly(f)));
ok('no door imports a guide or a learner name', leaks.length === 0, leaks.join(', '));

const fromAcademyFolder = NEW_PLATFORM.filter((f) => /from '[^']*academies\/(?!registry)[a-z]/.test(codeOnly(f)));
ok('...and no door imports one Academy\'s folder',
  fromAcademyFolder.length === 0,
  fromAcademyFolder.join(', '));

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
