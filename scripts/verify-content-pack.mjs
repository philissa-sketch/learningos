// ---------------------------------------------------------------------------
// AN ACADEMY CAN BE POINTED AT A CURRICULUM.
//
//   node scripts/verify-content-pack.mjs
//
// ---- THE NIGHT THIS EXISTS BECAUSE OF ----
//
// `contentPackFor(academy)` returns `academy.contentPack || academy.id`. That
// field was READ in one place and WRITTEN in none, and nothing failed loudly
// about it, because the one Academy that existed happened to have the field
// already set.
//
// Two things followed, and both happened for real.
//
//   A second Academy could be created at the front door — named, given a
//   passcode, given its own database — and then pointed at no curriculum at
//   all. There was no screen anywhere that could do it. "Multiple schools"
//   stopped one step short of working, every time.
//
//   And an Academy that LOST the field was unrecoverable from inside the app. A
//   record with id `lamar-junt`, whose curriculum folder is `lamar`, fell back
//   to the id, found no folder called that, and showed the empty room. Every
//   record was intact — passcode, state, a year of work — and the school was
//   unreachable over one missing string. It took a hand-typed database write,
//   on two separate computers, to put back.
//
// A read with no writer is not a small gap. It is a one-way door, and this
// check is the thing that would have refused to let it ship.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => fs.readFileSync(path.join(REPO, p), 'utf8');

let failures = 0;
function ok(label, condition, detail = '') {
  if (condition) console.log(`PASS  ${label}`);
  else {
    failures += 1;
    console.log(`FAIL  ${label}`);
    if (detail) console.log(`      ${detail}`);
  }
}

const shell = read('src/components/Academy/AcademyShell.jsx');
const gate = read('src/FrontDoorGate.jsx');
const content = read('src/content/academyContent.js');

console.log('\n--- the field is still a field ---');

// §3a. If the curriculum ever becomes the id, changing what a child works
// toward changes her database and costs her everything she has earned.
ok(
  'the pack is read from a field, falling back to the id',
  /contentPack \|\| academy\.id/.test(content),
  'if this becomes the id itself, a track change becomes a records loss — spec §3a'
);

console.log('\n--- something can WRITE it ---');

ok(
  'a control offers the Academy folders this build carries',
  /availableAcademyFolders\(\)/.test(shell),
  'the picker must list what actually exists, never a typed folder name'
);

ok(
  'choosing one writes contentPack to the household record',
  /onAcademyChanged\?\.\(\{\s*contentPack/.test(shell),
  'THE GAP THIS FILE EXISTS FOR: a read with no writer is a one-way door'
);

ok(
  'the write is persisted, not held in a component',
  /putAcademyRecord\(next\)/.test(gate),
  'a component unmounts; the household record is where this has to live'
);

console.log('\n--- both screens a family can be stranded on ---');

// An Academy with no curriculum reaches one of exactly two screens. Before this
// control, the first offered only "import an existing school" — useless to a
// family starting fresh — and the second offered nothing at all.
const emptyScreen = shell.slice(shell.indexOf('Nothing in it yet'));
ok(
  'the Empty screen offers it',
  /<ContentPackPicker/.test(emptyScreen),
  'a newly created Academy lands here with nothing to press'
);

const noCurriculum = shell.slice(shell.indexOf('function NoCurriculum'));
ok(
  'the no-curriculum screen offers it',
  /<ContentPackPicker/.test(noCurriculum),
  'this is the screen an Academy that LOST its pack lands on — it must not be a dead end'
);

console.log('\n--- who may change it ---');

ok(
  'only a grown-up is offered the choice',
  /canChoose=\{enteredAs === 'parent'\}/.test(shell),
  'a learner must not swap her own curriculum mid-morning'
);

ok(
  'a learner is told a grown-up can do it, rather than shown nothing',
  /grown-up signed in can choose/.test(shell),
  'a dead end with no explanation is how tonight looked from the outside'
);

console.log('\n--- it never guesses ---');

ok(
  'no Academy folder name is hardcoded in the shell',
  !/'(lamar|petal-pestle-academy)'/.test(shell),
  'the platform names no Academy — the picker lists what the glob found'
);

console.log(`\n${failures === 0 ? 'ALL CHECKS PASSED' : `${failures} CHECK(S) FAILED`}\n`);
process.exit(failures === 0 ? 0 : 1);
