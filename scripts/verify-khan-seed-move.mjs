// ---------------------------------------------------------------------------
// THE KHAN BOARD LEFT THE STORE.
// Run: ACADEMY=lamar node scripts/verify-khan-seed-move.mjs
//
// ---- WHAT MOVED (Sept 20, 2026 — the last of GENERIC_CARRYOVER fault 2) ----
//
// `src/store/useAppStore.js` seeded one child's entire Khan Academy board —
// 132 rows across 21 batches, quarter by quarter, plus the two rows his board
// started from in July, four retitles and two corrected links. All of it ran
// for every Academy that ever booted.
//
// The SEEDING PASSES stayed. Every one is the same shape and every one is real
// platform work:
//
//     add a row only when no row with this subject + skillTitle + batchLabel
//     already exists
//
// ---- WHY A COUNT IS NOT ENOUGH ----
//
// That guard matches BY STRING. A `skillTitle` edited in the school's file is
// not recognised as the row already in his database — so it is ADDED beside
// it. Not a correction: a duplicate on a child's board, appearing on the next
// hydrate, for a row he may already have finished.
//
// The same is true of `batchLabel`, and of the retitle map, which is keyed on
// the WRONG title precisely so that a title his parent has renamed herself no
// longer matches and is left alone.
//
// So this pins a DIGEST of every (batch, subject, skillTitle, url) — not just
// how many there are. Changing any one of them has to be deliberate, with a
// red check in front of it, because the failure mode is silent and lands on
// his screen rather than in a stack trace.
// ---------------------------------------------------------------------------

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { academyUnderTest } from './lib/academy-under-test.mjs';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');

let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
}

const ROW_COUNT = 132;
const ROW_DIGEST = 'cdaa1af64a08d102';

const store = src('src/store/useAppStore.js');
const seed = await import(
  pathToFileURL(path.join(REPO, `src/academies/${academyUnderTest}/data/khanSeed/khanSeedBatches.js`)).href
);

// ---------------------------------------------------------------------------
console.log('\n--- 1. the store seeds no curriculum of its own ---');
// ---------------------------------------------------------------------------
{
  const codeOnly = store.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
  const urls = [...codeOnly.matchAll(/'(https:\/\/www\.khanacademy\.org\/[^']+)'/g)].map((m) => m[1]);
  ok(`no Khan course link is written into the store (${urls.length})`, urls.length === 0,
    urls.slice(0, 3).join(', '));
  ok('no batch of rows is declared there',
    !/const \w+Rows = \[\s*\n\s*\{ subject:/.test(codeOnly),
    'a batch in the store is a curriculum every Academy would be seeded with');
  ok('...and the retitle map is built from the school',
    /new Map\(khanRetitleEntries\(\)\)/.test(store));
}

// ---------------------------------------------------------------------------
console.log('\n--- 2. every row came across, byte for byte ---');
// ---------------------------------------------------------------------------
{
  const batches = seed.KHAN_SEED_BATCHES || {};
  const names = Object.keys(batches).sort();
  const rows = [];
  for (const name of names) for (const r of batches[name]) {
    rows.push([name, r.subject, r.skillTitle, r.khanAcademyUrl || ''].join('|'));
  }
  ok(`all ${ROW_COUNT} rows are there`, rows.length === ROW_COUNT, `${rows.length} found`);
  ok('21 batches', names.length === 21, `${names.length}`);

  const digest = crypto.createHash('sha256').update(rows.sort().join('\n')).digest('hex').slice(0, 16);
  ok('every batch, subject, title and link is unchanged', digest === ROW_DIGEST,
    `${digest} — a changed skillTitle is not recognised as the row already in his database, so it is ADDED beside it`);

  const bad = rows.filter((r) => r.split('|')[2] === '');
  ok('no row lost its skillTitle', bad.length === 0, 'the match key cannot be blank');
}

// ---------------------------------------------------------------------------
console.log('\n--- 3. the smaller pieces came too ---');
// ---------------------------------------------------------------------------
{
  ok('the first-boot seed is the school\'s', (seed.KHAN_FIRST_SEED || []).length === 2);
  ok('the four retitles are the school\'s', (seed.KHAN_RETITLES || []).length === 4);
  ok('...and are still keyed on the WRONG title',
    (seed.KHAN_RETITLES || []).every(([wrong, fix]) => typeof wrong === 'string' && wrong && fix?.skillTitle && wrong !== fix.skillTitle),
    'keyed on the right title, a rename of hers would be overwritten');
  ok('the two link corrections are the school\'s',
    Object.keys(seed.KHAN_URL_FIXES || {}).length === 2);
}

// ---------------------------------------------------------------------------
console.log('\n--- 4. the guard that makes seeding safe is untouched ---');
// ---------------------------------------------------------------------------
{
  const matches = [...store.matchAll(
    /a\.subject === r\.subject && a\.skillTitle === r\.skillTitle && a\.batchLabel === \w+/g
  )];
  ok(`every batch still matches on subject + title + label (${matches.length})`, matches.length >= 19,
    'this is what stops a row he already has being added twice');
  // Scoped to each seeding block's OWN body. The first version of this looked
  // for an update call anywhere near a `missing*Rows` and went red on the
  // correction passes, which update on purpose and are a different mechanism.
  // A negative assertion with a loose radius is a false positive waiting to
  // happen, and this one did not even wait.
  const seedBlocks = [...store.matchAll(/if \(missing(\w+)Rows\.length > 0\) \{([\s\S]*?)\n    \}/g)];
  const rewriting = seedBlocks
    .filter(([, , body]) => /updateKhanAcademyAssignmentRecord/.test(body))
    .map(([, name]) => name);
  ok(`every seeding block only ADDS (${seedBlocks.length} blocks)`, rewriting.length === 0,
    `${rewriting.join(', ')} — a seeder that updates is a seeder that can overwrite finished work`);
  ok('...and every one of them calls the add path',
    seedBlocks.every(([, , body]) => /addKhanAcademyAssignmentRecord/.test(body)),
    'a block that adds nothing is a batch he silently never receives');
}

// ---------------------------------------------------------------------------
console.log('\n--- 5. read at use time, never at module scope ---');
// ---------------------------------------------------------------------------
{
  ok('the batches are read through a function', /function khanSeedRows\(name\)/.test(store));
  ok('...and it is not called at module scope', !/^const .*= khanSeedRows\(/m.test(store));
  ok('the slot is optional',
    !/REQUIRED_SLOTS[\s\S]{0,400}'khanSeed'/.test(src('src/content/academyContent.js')));
  ok('...and owes the contract no required name',
    !JSON.parse(src('scripts/academy-content-needs.json')).names.includes('KHAN_SEED_BATCHES'));
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
