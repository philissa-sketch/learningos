// ---------------------------------------------------------------------------
// ONE FAMILY'S OUTINGS LEFT THE PLATFORM, AND NOBODY'S PLANNER MOVED.
// Run: ACADEMY=lamar node scripts/verify-field-trip-move.mjs
//
// ---- WHAT MOVED (Sept 20, 2026 — GENERIC_CARRYOVER fault 1) ----
//
// `DEFAULT_FIELD_TRIPS` — 21 real venues, real 2026-2027 dates, travel times
// measured from one family's front door — and `LIBRARY_TRIP_RENAMES` lived in
// `src/lib/fieldTrips.js` and were seeded into EVERY Academy that ever booted.
// A family in another state got library programmes on dates already past.
//
// They now live in that Academy's own folder, behind an optional slot. The
// planner that reads them is mechanism and stayed in the platform.
//
// ---- WHY THIS CHECK EXISTS AND WHAT IT PINS ----
//
// A content move is usually safe because content is inert. This one is not,
// because two live mechanisms are keyed off those exact strings:
//
//   THE SEEDER matches an existing planner row by `destination`. A changed
//   string is not recognised as the same trip, so it is ADDED — a duplicate in
//   a parent's planner rather than a fix.
//
//   THE MERGE KEY. `fieldTripSyncId()` slugs the destination, resolving the
//   rename map, and that slug is how the two computers agree that one trip is
//   one trip. A changed key means one trip becomes two on the next handoff.
//   That exact bug was reported on 28 August: "multiple repeat field trips".
//
// The rename map is now a PARAMETER with a `{}` default, which is convenient
// and dangerous in the same breath: a caller that forgets it still works, still
// returns a plausible key, and silently stops resolving renames. So this file
// pins the 21 keys literally, and asserts no call site forgets the map.
//
// A pinned list is usually a smell — an enumeration is an assertion, and this
// one will need updating when a venue's name legitimately changes. That is the
// point. Changing one of these strings must be a deliberate act with a red
// check in front of it, not a typo fixed on the way past.
// ---------------------------------------------------------------------------

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');
const load = (rel) => import(pathToFileURL(path.join(REPO, rel)).href);

let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
}

// The 21 merge keys, as they were the day the list moved. Nothing but a
// deliberate rename may change one.
const PINNED_SYNC_IDS = [
  'ft::fab-stem-friday-clayton-county-library-lovejoy',
  'ft::homeschool-day-clayton-county-library-lovejoy',
  'ft::world-space-week-build-a-telescope-clayton-county-library-morrow',
  'ft::chess-club-clayton-county-library-lovejoy',
  'ft::kids-steam-clayton-county-library-lovejoy',
  'ft::fire-emergency-services-lithium-batteries-clayton-county-library-forest-park',
  'ft::michael-c-carlos-museum-emory',
  'ft::center-for-puppetry-arts',
  'ft::panola-mountain-state-park',
  'ft::chattahoochee-nature-center',
  'ft::mimms-museum-of-technology-and-art',
  'ft::children-s-museum-of-atlanta',
  'ft::fernbank-museum-of-natural-history',
  'ft::museum-of-aviation',
  'ft::go-fish-education-center',
  'ft::atlanta-history-center',
  'ft::delta-flight-museum',
  'ft::coca-cola-space-science-center',
  'ft::tellus-science-museum',
  'ft::georgia-aquarium',
  'ft::national-museum-of-the-mighty-eighth-air-force'
];

const ft = await load('src/lib/fieldTrips.js');
const content = await load('src/academies/lamar/content.js');
const seed = content.fieldTrips || {};

// ---------------------------------------------------------------------------
console.log('\n--- 1. the platform no longer carries one family\'s outings ---');
// ---------------------------------------------------------------------------
{
  const planner = src('src/lib/fieldTrips.js');
  ok('the planner declares no trip list', !/export const DEFAULT_FIELD_TRIPS/.test(planner));
  ok('...and no rename map', !/export const LIBRARY_TRIP_RENAMES\s*=/.test(planner));
  ok('...and still exports the mechanism',
    typeof ft.fieldTripSyncId === 'function' && typeof ft.planFieldTripDedupe === 'function',
    'the move was meant to take the content, not the planner');
  ok('the planner reads no content at module scope',
    !/^const \{[^}]*\} = academyContent\(\)/m.test(planner),
    'a module-scope read makes this file unimportable by a check with no school mounted');
}

// ---------------------------------------------------------------------------
console.log('\n--- 2. the school supplies them, through an OPTIONAL slot ---');
// ---------------------------------------------------------------------------
{
  ok('the Academy fills a fieldTrips slot', Array.isArray(seed.DEFAULT_FIELD_TRIPS));
  ok('...with the rename map beside it', !!seed.LIBRARY_TRIP_RENAMES);
  ok('the slot is declared in the contract',
    /'fieldTrips'/.test(src('src/content/academyContent.js')));
  ok('...and is NOT required of every Academy',
    !/REQUIRED_SLOTS[\s\S]{0,400}'fieldTrips'/.test(src('src/content/academyContent.js')),
    'a family with nothing planned must owe the contract nothing');
  ok('...and no name of it entered the required inventory',
    !JSON.parse(src('scripts/academy-content-needs.json')).names.includes('DEFAULT_FIELD_TRIPS'),
    'a destructure would have made these names every Academy\'s debt');
}

// ---------------------------------------------------------------------------
console.log('\n--- 3. every merge key is byte-identical to before the move ---');
// ---------------------------------------------------------------------------
{
  const ids = (seed.DEFAULT_FIELD_TRIPS || []).map((t) =>
    ft.fieldTripSyncId(t.destination, seed.LIBRARY_TRIP_RENAMES));
  ok(`all ${PINNED_SYNC_IDS.length} trips are still there`, ids.length === PINNED_SYNC_IDS.length,
    `${ids.length} found`);
  const drift = ids.filter((id, i) => id !== PINNED_SYNC_IDS[i]);
  ok('every merge key matches the pin', drift.length === 0,
    `${drift.join(', ')} — a changed key splits one trip into two on the next handoff`);
  ok('no two trips share a key', new Set(ids).size === ids.length);
}

// ---------------------------------------------------------------------------
console.log('\n--- 4. the rename map still resolves, and is needed to ---');
// ---------------------------------------------------------------------------
{
  const renames = seed.LIBRARY_TRIP_RENAMES || {};
  const pairs = Object.entries(renames);
  ok('the map has entries to resolve', pairs.length > 0);
  const resolved = pairs.every(([oldDest, newDest]) =>
    ft.fieldTripSyncId(oldDest, renames) === ft.fieldTripSyncId(newDest, renames));
  ok('an old name and its new name share one key', resolved,
    'this is what stops a renamed trip being imported as a second copy');
  const withoutMap = pairs.every(([oldDest, newDest]) =>
    ft.fieldTripSyncId(oldDest) === ft.fieldTripSyncId(newDest));
  ok('...and they do NOT without the map', !withoutMap,
    'if this passes, the map is doing nothing and section 5 is pointless');
}

// ---------------------------------------------------------------------------
console.log('\n--- 5. no caller forgets the map ---');
// ---------------------------------------------------------------------------
{
  // Comments stripped first. A prose mention of `fieldTripSyncId()` — in a note
  // explaining that the map is now an argument, say — is not a call site, and
  // this check flagged exactly that the day the note was written. A check that
  // cannot tell a comment from code teaches everyone to stop believing it.
  const codeOnly = (t) => t.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
  const store = codeOnly(src('src/store/useAppStore.js'));
  const KEYED = ['fieldTripSyncId', 'planFieldTripDedupe', 'planUndatedTripRestore', 'planDeletedTripRecovery'];
  const bare = [];
  for (const fn of KEYED) {
    for (const m of store.matchAll(new RegExp(`${fn}\\(([^)]*)\\)`, 'g'))) {
      if (!/,/.test(m[1])) bare.push(`${fn}(${m[1]})`);
    }
  }
  ok('every merge-key call in the store passes a rename map', bare.length === 0,
    `${bare.join(', ')} — silently stops resolving renames`);

  const planner = codeOnly(src('src/lib/fieldTrips.js'));
  const bareInternal = [...planner.matchAll(/fieldTripSyncId\(([^)]*)\)/g)]
    .map((m) => m[1]).filter((a) => a && !/,/.test(a) && !/^destination/.test(a));
  ok('...and so does every call inside the planner', bareInternal.length === 0,
    `${bareInternal.join(', ')}`);
}

// ---------------------------------------------------------------------------
console.log('\n--- 6. a family with nothing planned gets nothing seeded ---');
// ---------------------------------------------------------------------------
{
  const { optionalContent } = await load('src/content/slots/optional.js');
  const empty = optionalContent({ subjects: {} }, 'fieldTrips');
  ok('an Academy with no fieldTrips slot reads as empty', Object.keys(empty).length === 0);
  ok('...and the planner still answers safely with no map',
    ft.fieldTripSyncId('Somewhere Local') === 'ft::somewhere-local',
    'the generic path must not throw — an absent slot is an absent list, not a broken school');
  ok('...and an unidentifiable row is still left alone',
    ft.fieldTripSyncId('', {}) === null && ft.fieldTripSyncId(null, {}) === null);
}

// ---------------------------------------------------------------------------
console.log('\n--- 7. the seed version is not bumped by accident ---');
// ---------------------------------------------------------------------------
{
  const store = src('src/store/useAppStore.js');
  const m = store.match(/const FIELD_TRIP_SEED_VERSION = (\d+);/);
  ok('the seed version is declared', !!m);
  ok('...and is still 4', m && m[1] === '4',
    'bumping it re-runs the rename and date-backfill passes over rows a parent has since edited by hand — ' +
      'that is a migration, not a content move, and it needs its own reason');
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
