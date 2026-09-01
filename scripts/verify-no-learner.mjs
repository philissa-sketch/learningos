// ---------------------------------------------------------------------------
// THE PLATFORM CONTAINS NO LEARNER. Run: node scripts/verify-no-learner.mjs
//
// The rule LearningOS is built on:
//
//   "If a file in learningos/src/ names a child, a subject, an age or a
//    reading level, it is in the wrong folder."
//
// ---- WHY THIS IS NOT ONE RULE BUT THREE ZONES ----
//
// When only the front door existed, that rule was absolute and the check was a
// one-liner. Then a whole school moved in, and a flat rule would have had two
// possible outcomes, both useless: fail on 131 files from the first commit and
// get switched off, or be watered down until it caught nothing.
//
// So the tree is read as three zones, each with its own rule:
//
//   PLATFORM  src/db/, registry.js, main.jsx, the gate, the front door, the
//             Academy shell, and the four platform libs.
//             → ABSOLUTE. Not one learner name, ever. This is the code every
//               family runs, and a default that leaks here is how a platform
//               quietly becomes single-tenant.
//
//   ACADEMY   src/academies/<id>/
//             → EXEMPT, by definition. This is one child's curriculum. Naming
//               their subjects here is not a violation, it is the point.
//
//   SCHOOL    components/, lib/, store/, engine/, App.jsx
//             → A RATCHET. These arrived built for one learner and are being
//               made generic. scripts/generic-debt.json lists every file that
//               still names an Academy. A file not on that list failing is an
//               error; a file on it that has become clean is progress and the
//               list should lose a line.
//
// The list may shrink. It must never grow. That is the whole mechanism: nobody
// has to fix 131 files today, and nobody can add a 132nd by accident.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');

const DEBT = JSON.parse(read('scripts/generic-debt.json'));

/** Files and folders that are the platform itself. */
const PLATFORM = [
  'src/main.jsx',
  'src/FrontDoorGate.jsx',
  'src/index.css',
  'src/db/',
  'src/academies/registry.js',
  // The content interface. Held to the platform standard deliberately: it is
  // the one file the whole school reaches content through, and a subject name
  // leaking into it would re-weld the platform to one Academy in the single
  // place designed to prevent exactly that.
  'src/content/',
  'src/components/FrontDoor/',
  'src/components/Academy/',
  'src/lib/frontDoor.js',
  'src/lib/parentAuth.js',
  'src/lib/importSchool.js',
  'src/lib/buildStamp.js'
];

function zoneOf(rel) {
  if (rel.startsWith('src/academies/') && rel !== 'src/academies/registry.js') return 'academy';
  for (const p of PLATFORM) {
    if (rel === p || (p.endsWith('/') && rel.startsWith(p))) return 'platform';
  }
  return 'school';
}

function sourceFiles(dir = 'src', acc = []) {
  for (const entry of fs.readdirSync(path.join(REPO, dir), { withFileTypes: true })) {
    const rel = `${dir}/${entry.name}`;
    if (entry.isDirectory()) sourceFiles(rel, acc);
    else if (/\.(jsx?|css)$/.test(entry.name)) acc.push(rel);
  }
  return acc;
}

/**
 * Names of real children this platform was built out of. Checked in COMMENTS as
 * well as code, deliberately: a comment saying "because Lamar's records live
 * under the old name" is documentation for one family that reads as confusion
 * to everyone else, and it is how a generic file quietly becomes a specific one.
 */
const LEARNER_NAMES = ['lamar', 'azianna'];
const SCHOOL_NAMES = ['mission control', 'missioncontrol', 'petal & pestle', 'petal and pestle'];
const GUIDES = ['commander nova', 'nova_name', 'student_name', 'marigold'];

/**
 * Subject IDENTIFIERS, not subject words. `'aerospace'` as a quoted string or a
 * property key is a curriculum decision compiled into code; "an aerospace
 * engineer" in the home page's marketing copy is an example of an answer a
 * child might give, which is what that page is about. The pattern requires
 * quotes or a key position, because the difference is the whole point.
 */
const SUBJECT_IDS = [
  'aerospace',
  'herbalism',
  'robotics',
  'gardening',
  'guitar',
  'khan',
  'socialStudies',
  'social-studies'
];

function findings(text) {
  const low = text.toLowerCase();
  const hits = [];
  if (LEARNER_NAMES.some((n) => new RegExp(`\\b${n}\\b`).test(low))) hits.push('learner');
  if (SCHOOL_NAMES.some((s) => low.includes(s))) hits.push('school-name');
  if (GUIDES.some((g) => low.includes(g))) hits.push('guide');
  if (SUBJECT_IDS.some((s) => new RegExp(`['"\`]${s}['"\`]|\\b${s}\\s*:`, 'i').test(text))) {
    hits.push('subject');
  }
  return hits;
}

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

const files = sourceFiles();
const zones = { platform: [], academy: [], school: [] };
for (const f of files) zones[zoneOf(f)].push(f);

console.log(
  `--- ${files.length} files: ${zones.platform.length} platform · ` +
    `${zones.academy.length} academy · ${zones.school.length} school ---\n`
);

console.log('--- 1. the platform zone is absolutely clean ---');

const dirtyPlatform = zones.platform
  .map((f) => ({ f, hits: findings(read(f)) }))
  .filter((x) => x.hits.length);
ok('no platform file names a learner, school, guide or subject',
  dirtyPlatform.length === 0,
  dirtyPlatform.map((x) => `${x.f} (${x.hits.join(', ')})`).join('\n      '));

ok('the platform zone is not empty — the check is actually looking at something',
  zones.platform.length >= 10, `${zones.platform.length} files`);

console.log('\n--- 2. the school zone may only get cleaner ---');

const listed = new Set(Object.keys(DEBT.files));
const dirtyNow = new Map();
for (const f of zones.school) {
  const hits = findings(read(f));
  if (hits.length) dirtyNow.set(f, hits);
}

const newlyDirty = [...dirtyNow.keys()].filter((f) => !listed.has(f));
ok('no file has newly started naming an Academy',
  newlyDirty.length === 0,
  newlyDirty.map((f) => `${f} (${dirtyNow.get(f).join(', ')})`).join('\n      ') +
    '\n      Reach content through the Academy, or add it to scripts/generic-debt.json with a reason.');

const nowClean = [...listed].filter((f) => !dirtyNow.has(f) && fs.existsSync(path.join(REPO, f)));
const gone = [...listed].filter((f) => !fs.existsSync(path.join(REPO, f)));
ok('every listed file still exists', gone.length === 0, gone.join(', '));

console.log(
  `\n      generic debt: ${dirtyNow.size} of ${zones.school.length} school files still name an Academy` +
    (nowClean.length
      ? `\n      ${nowClean.length} listed file(s) are now clean — remove them from generic-debt.json:\n        ` +
        nowClean.slice(0, 12).join('\n        ')
      : '')
);

console.log('\n--- 3. no age, grade or reading level is assumed in the platform ---');

const LEVEL_PATTERNS = [
  /\bgradeLevel\s*[:=]\s*['"`]?\d/,
  /\breadingLevel\s*[:=]/,
  /\bstrandLevels\s*[:=]\s*\{[^}]*\d/,
  /\bage\s*[:=]\s*\d{1,2}\b/
];
const levelFiles = zones.platform.filter((f) => LEVEL_PATTERNS.some((p) => p.test(read(f))));
ok('no platform file hardcodes an age, grade or reading level',
  levelFiles.length === 0, levelFiles.join(', '));

console.log('\n--- 4. the static registry is empty, and stays empty ---');

const registry = read('src/academies/registry.js');
ok('registry.js exports an empty ACADEMIES array',
  /export const ACADEMIES = \[\];/.test(registry),
  'a name here means a learner has been welded into the platform');

const { ACADEMIES, DB_PREFIX, newAcademyId } = await import(REPO + '/src/academies/registry.js');
ok('...and it really is empty at runtime',
  Array.isArray(ACADEMIES) && ACADEMIES.length === 0, JSON.stringify(ACADEMIES));
ok('the database prefix belongs to the platform, not to a school',
  DB_PREFIX === 'LearningOSDB_', DB_PREFIX);

const a = newAcademyId('Alex');
const b = newAcademyId('Alex');
ok('two Academies created from the same name get different ids', a !== b, `${a} vs ${b}`);
ok('...and both are usable as a folder name and a database suffix',
  /^[a-z0-9-]+$/.test(a) && /^[a-z0-9-]+$/.test(b), `${a} / ${b}`);

console.log('\n--- 5. content lives under an Academy, and only there ---');

// The old rule was "nothing imports from src/data". src/data no longer exists;
// what replaced it is that content imports must resolve INTO an academy folder.
const contentImporters = [...zones.platform].filter((f) =>
  /from '[^']*\/(data|config)\//.test(read(f))
);
ok('no platform file imports curriculum content', contentImporters.length === 0,
  contentImporters.join(', '));

ok('there is no loose src/data directory', !fs.existsSync(path.join(REPO, 'src/data')));
ok('there is no loose src/config directory', !fs.existsSync(path.join(REPO, 'src/config')));
ok('the Academy zone is not empty', zones.academy.length > 0, `${zones.academy.length} files`);

console.log('\n--- 6. the acceptance test: it boots with nothing in it ---');

const main = read('src/main.jsx');
ok('the entry point renders only the boot gate', /<FrontDoorGate \/>/.test(main));

const gate = read('src/FrontDoorGate.jsx').replace(/\/\*[\s\S]*?\*\//g, '');
ok('the gate handles an empty machine explicitly',
  /academies\.length === 0/.test(gate),
  'a platform whose first screen assumes an Academy exists cannot onboard anybody');
ok('...and offers to create one', /first-run/.test(gate) && /onCreateAcademy/.test(gate));

// An Academy with no curriculum must not render a school. It renders the Empty
// state, which is a screen a family genuinely sits in for twenty-five minutes.
const shell = read('src/components/Academy/AcademyShell.jsx');
ok('an Empty Academy does not render the school',
  /state !== 'empty'/.test(shell) && /<App /.test(shell));

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
