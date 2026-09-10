// ---------------------------------------------------------------------------
// THE PLATFORM BOOTS FOR A SCHOOL THAT SUPPLIES ALMOST NOTHING.
// Run: node scripts/verify-thin-boot.mjs        (no ACADEMY — that is the point)
//
// ---- WHAT IT ASSERTS ----
//
// Build a manifest that fills every REQUIRED slot with an empty object, lay it
// over the template the way the loader does, and then IMPORT EVERY PLATFORM
// MODULE against it. Nothing may throw.
//
// That manifest is the floor: a school that has said only "I have subjects, I
// have lessons, I have a timetable" and answered nothing else. If the platform
// loads against it, the platform is not depending on any school's content to
// exist. If it does not, the missing thing is a platform assumption, named by
// the file that threw.
//
// ---- WHY THIS EXISTS ----
//
// Every other guard in this folder asserts what a file SAYS. None asserts that
// the code can be loaded at all, and that gap has already cost a real morning:
// a module-scope destructure of an unfilled slot threw while the school was
// being imported, before React mounted anything. No component existed to catch
// it and nothing was rendered, so the symptom was a white page with no error on
// screen. A text search cannot see that. An import sees it on the first run.
//
// It is also the safety net under the next two pieces of platform work — taking
// behaviour out of the slot contract, and taking single-school screens out of
// the platform. Both DELETE things the platform currently reaches for. This is
// the check that says whether what is left still stands up on its own.
//
// ---- THE FOUR THINGS IT WOULD BE EASY TO FAKE, AND WHY IT CANNOT ----
//
//   1. An empty walk passes for free. Section 2 asserts the module count is
//      real, so a broken walk fails instead of reporting a clean sweep.
//   2. A growing skip list. Section 3 states every exemption with a reason and
//      fails on one that no longer exists, so a skip is a visible decision.
//   3. A manifest quietly enriched until everything loads. Section 1 asserts the
//      manifest fills nothing but REQUIRED_SLOTS, read from the contract rather
//      than retyped here.
//   4. A pass bought by loading a real school. Section 4 reads what the module
//      graph ACTUALLY pulled in and fails if the platform reached into any
//      Academy folder but the template.
//   5. A seed baseline quietly raised to meet whatever the platform now does.
//      Section 6 grows only by an edit to a checked-in file, in the diff.
//
// ---- IT ALSO HYDRATES, AND THAT IS WHERE IT FOUND SOMETHING ----
//
// Loading proves no module throws. Hydrating proves what the platform DOES to a
// school on its first morning — and against a school that supplied no
// curriculum at all, it seeds a regional field trip calendar on real dates, one
// course's assignment sequence, and a reward catalog. None of that is the
// platform's to give. Section 6 counts it against
// scripts/thin-boot-seed-baseline.json, which may shrink freely and grows only
// by an edit somebody has to make on purpose.
//
// Seeding runs against Dexie and Node has no IndexedDB, so this needs
// `fake-indexeddb` in devDependencies. It is installed dynamically at the top
// of this file, BEFORE any platform module loads — Dexie reads the global once,
// at its own import, and an IndexedDB installed after the store has been
// imported is installed too late. That failure is quiet in a way worth knowing
// about: every table call fails, the store catches it, logs it, and resolves.
// `hydrate()` returning is not evidence. The flag it sets is.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { loadedFiles, transformedJsx } from './lib/jsx-loader.mjs';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const rel = (abs) => path.relative(REPO, abs).split(path.sep).join('/');
const load = (relPath) => import(pathToFileURL(path.join(REPO, relPath)).href);

let passed = 0;
const failures = [];
function ok(desc, cond, hint) {
  if (cond) {
    passed += 1;
    console.log(`PASS  ${desc}`);
  } else {
    failures.push(desc);
    console.log(`FAIL  ${desc}${hint ? `\n      ${hint}` : ''}`);
  }
}

/**
 * Modules deliberately left out of the sweep, each with the reason.
 *
 * The list is here rather than inline so that adding to it is an edit somebody
 * reads. Section 3 fails on an entry whose file has gone, so a skip cannot
 * outlive the thing it was covering.
 */
const SKIP = [
  {
    file: 'src/main.jsx',
    why: 'the browser entry — it mounts React onto a real document, so it is not a module a school loads'
  }
];

// ---------------------------------------------------------------------------

/**
 * The in-memory IndexedDB, installed BEFORE anything else is loaded.
 *
 * Not a detail of ordering — a fault this check found on its first run. Dexie
 * reads `indexedDB` off the global at ITS OWN import and keeps the answer, so
 * installing one after the store has been imported is installing it too late:
 * every table call then fails with "IndexedDB API missing", the store catches
 * that, logs it, and resolves anyway. `hydrate()` returning is therefore not
 * evidence of anything. The flag it sets is.
 *
 * Dynamic rather than a static import so a missing package is a named
 * assertion with the command to fix it, instead of a module-resolution stack
 * trace before the first line of output.
 */
let inMemoryIndexedDb = true;
try {
  await import('fake-indexeddb/auto');
} catch {
  inMemoryIndexedDb = false;
}

console.log('--- 1. the manifest is the floor, not a school ---');

const contract = await load('src/content/academyContent.js');
const { REQUIRED_SLOTS, CONTENT_SLOTS, mergeContent, installAcademyContent, academyContent } = contract;

const thin = {};
for (const slot of REQUIRED_SLOTS) thin[slot] = {};

ok('the manifest fills the required slots and nothing else',
  Object.keys(thin).length === REQUIRED_SLOTS.length &&
    Object.keys(thin).every((s) => REQUIRED_SLOTS.includes(s)),
  'it is built from REQUIRED_SLOTS, so this only fails if something was added by hand');

ok('there are required slots to fill', REQUIRED_SLOTS.length > 0,
  'if the contract lists none, every assertion below passes for free');

const template = await load('src/academies/_template/content.js');
const merged = mergeContent({ ...template }, thin);

ok('every required slot is filled after the merge',
  REQUIRED_SLOTS.every((slot) => merged[slot]),
  'the template plus three empty declarations should satisfy the loader');

installAcademyContent(merged, '(thin boot)');

const installed = academyContent();
ok('every declared slot is present, empty rather than missing',
  CONTENT_SLOTS.every((slot) => installed[slot] !== undefined),
  'a slot that is undefined throws the moment a module destructures it');

// ---------------------------------------------------------------------------

console.log('\n--- 2. every platform module loads against it ---');

/** Platform modules: everything under src/ that is not a school's folder. */
function platformModules(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Academy folders are content, not platform. What the platform pulls in
      // from one is section 4's business.
      if (rel(full) === 'src/academies') continue;
      platformModules(full, acc);
    } else if (/\.jsx?$/.test(entry.name)) {
      acc.push(rel(full));
    }
  }
  return acc;
}

const skipped = new Set(SKIP.map((s) => s.file));
const modules = platformModules(path.join(REPO, 'src')).sort();
const swept = modules.filter((m) => !skipped.has(m));

const broke = [];
for (const module of swept) {
  try {
    await load(module);
  } catch (e) {
    broke.push(`${module}  ::  ${String(e && e.message).split('\n')[0]}`);
  }
}

ok('the sweep found the platform', swept.length > 100,
  `only ${swept.length} modules — the walk is not reaching src/, so nothing below was tested`);

ok(`all ${swept.length} platform modules load`, broke.length === 0,
  broke.slice(0, 12).join('\n      '));

ok('the .jsx transform ran', transformedJsx > 0,
  'no .jsx was transformed, so the components in the sweep were never really loaded');

// ---------------------------------------------------------------------------

console.log('\n--- 3. the exemptions are honest ---');

for (const { file, why } of SKIP) {
  ok(`skipped: ${file} — ${why}`, fs.existsSync(path.join(REPO, file)),
    'this exemption names a file that no longer exists; delete the entry');
}

ok('the sweep skips no more than it declares', modules.length - swept.length === SKIP.length,
  'a module is being left out by something other than the SKIP list');

// ---------------------------------------------------------------------------

console.log('\n--- 4. the platform reached no school ---');

// This is what loading gets you that reading cannot: the transitive truth. A
// platform file importing straight into a curriculum folder shows up here even
// when it is four imports deep behind a name that says nothing about a school.
//
// A file has to be INSIDE a folder to belong to a school: `src/academies/` also
// holds the registry, which is the platform's own list of who is enrolled and
// names nobody. Folders beginning with `_` are inherited rather than signed
// into, so the template is expected here — it is where a thin school's guide
// and theme come from.
const reached = [...loadedFiles].filter((f) => {
  const parts = f.split('/');
  return parts[0] === 'src' && parts[1] === 'academies' && parts.length > 3 && !parts[2].startsWith('_');
});

ok('no Academy folder was pulled in by the platform', reached.length === 0,
  reached.slice(0, 12).join('\n      ') +
    '\n      the platform must reach content through a slot, never through a folder');

ok('the load record is real', loadedFiles.size > 100,
  'nothing was recorded, so the assertion above passed for free');

// ---------------------------------------------------------------------------

console.log('\n--- 5. the store hydrates against it ---');

ok('an in-memory IndexedDB is available', inMemoryIndexedDb,
  'seeding runs against Dexie and Node has no IndexedDB: npm install --save-dev fake-indexeddb');

if (inMemoryIndexedDb) {
  const { openAcademy } = await load('src/db/db.js');
  const { useAppStore } = await load('src/store/useAppStore.js');

  let opened = true;
  try {
    openAcademy('(thin boot)', 'learningos-thin-boot-check');
  } catch (e) {
    opened = false;
    console.log('      ' + String(e && e.message).split('\n')[0]);
  }
  ok('the database opens against the recorded schema', opened);

  let threw = null;
  try {
    await Promise.all([useAppStore.getState().hydrate(), useAppStore.getState().hydrate()]);
  } catch (e) {
    threw = e;
  }
  ok('hydrate resolves for a school with no curriculum', !threw,
    threw ? String(threw.message).split('\n')[0] : '');
  ok('the store reports itself hydrated', useAppStore.getState().hydrated === true,
    'hydrate resolved but left the flag unset, so the school would never mount');

  // -------------------------------------------------------------------------

  console.log('\n--- 6. what the platform seeded into a school that supplied nothing ---');

  /**
   * Everything in state that holds more than nothing.
   *
   * Collections only — arrays and plain objects. A primitive would make this
   * noisy (a streak of 1 is not seeded content) and the question here is what
   * the platform PUT somewhere, which is always a collection.
   */
  function seededCounts(state) {
    const counts = {};
    for (const [key, value] of Object.entries(state)) {
      if (Array.isArray(value)) {
        if (value.length) counts[key] = value.length;
      } else if (value && typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype) {
        const size = Object.keys(value).length;
        if (size) counts[key] = size;
      }
    }
    return counts;
  }

  const BASELINE = JSON.parse(fs.readFileSync(path.join(REPO, 'scripts/thin-boot-seed-baseline.json'), 'utf8'));
  const seeded = seededCounts(useAppStore.getState());

  const grew = Object.entries(seeded)
    .filter(([key, n]) => BASELINE.seeded[key] !== undefined && n > BASELINE.seeded[key])
    .map(([key, n]) => `${key}: ${BASELINE.seeded[key]} -> ${n}`);
  const appeared = Object.keys(seeded).filter((key) => BASELINE.seeded[key] === undefined);
  const shrank = Object.entries(BASELINE.seeded)
    .filter(([key, n]) => (seeded[key] ?? 0) < n)
    .map(([key, n]) => `${key}: ${n} -> ${seeded[key] ?? 0}`);

  ok('nothing the platform seeds into an empty school grew', grew.length === 0,
    grew.join('\n      ') + '\n      shrinking is progress; growing needs an edit to scripts/thin-boot-seed-baseline.json');
  ok('no new platform seed appeared', appeared.length === 0,
    appeared.join(', ') + '\n      a school that supplied nothing is now being given this too');
  ok('the measurement is real', Object.keys(seeded).length > 0,
    'nothing was counted, so both assertions above passed for free');

  if (shrank.length) {
    console.log('      shrank since the baseline (update the file to lock it in):');
    for (const line of shrank) console.log('        ' + line);
  }
}

// ---------------------------------------------------------------------------

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
