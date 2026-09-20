// ---------------------------------------------------------------------------
// A MANIFEST MUST NOT LOSE A SLOT THAT HAS CONTENT IN IT.
// Run: node scripts/verify-manifest-slots.mjs
//
// ---- WHAT HAPPENED (Sept 19, 2026) ----
//
// `node scripts/generate-academy-manifest.mjs lamar` was run, exactly as the
// header of every content.js tells you to. It printed a summary and the word
// success. It also deleted four working slots — `guide`, `projects`,
// `electives` and `exams` — and 21 import lines, from a folder where every one
// of those data directories still existed and still had files in it.
//
// ---- WHY ----
//
// The generator emits only the names in scripts/academy-content-needs.json.
// That file is the REQUIRED contract: 131 names the school destructures out of
// a slot by name. It has no list of optional content, and no list of slots the
// platform reads WHOLE — and reading a slot whole is a normal thing to do:
//
//     const line = dailyLineFor(academyContent().guide, today);
//
// No name is destructured there, so the scan never records one, so the
// generator concludes the Academy needs nothing from that slot and emits
// nothing. "Not required" became "not wanted".
//
// Nothing crashed. withAbsentSlots() fills an absent slot with an empty
// object, which is the very thing that keeps a school with gaps running — so
// the guide simply went quiet and the app looked fine. That is the same
// failure this repo has already paid for once: a tool reports success and
// produces nothing.
//
// ---- WHAT THIS ASSERTS, AND WHY IT IS A RATCHET ----
//
// The first version of this check asked "does every slot with files behind it
// appear in the manifest?" and went red four times on the first run. One was
// real. Three were an Academy still being built, where content sitting in the
// tree ahead of being wired up is the NORMAL state, not a fault — and an
// Academy's own screens are allowed to import their data directly, which is
// exactly what the garden and instrument screens were moved to do in step 4.
//
// A check that cries wolf teaches whoever reads the output to stop believing
// it, which costs more than the category is worth. So the detector was fixed
// rather than the tree excused.
//
// What it asserts now is the property that actually failed: A SLOT A MANIFEST
// ALREADY EXPORTS MUST NOT DISAPPEAR. scripts/manifest-slots.json records
// today's answer per Academy. That list may GROW freely — wiring new content
// up is progress — and must never SHRINK. Deleting four slots while printing
// success goes red on the next run instead of going unnoticed for weeks.
//
// Slots with files but no export are printed as NOTES, not failures. They are
// worth a human's eye and are not evidence of a regression.
// ---------------------------------------------------------------------------

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { slotFor } from './scan-content-needs.mjs';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ACADEMIES = path.join(REPO, 'src', 'academies');

let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
}

function walk(dir, base = dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, base, acc);
    else if (e.name.endsWith('.js')) acc.push(path.relative(base, full).split(path.sep).join('/'));
  }
  return acc;
}

const BASELINE = JSON.parse(fs.readFileSync(path.join(REPO, 'scripts/manifest-slots.json'), 'utf8'));

const folders = fs.readdirSync(ACADEMIES, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name);

ok('there is at least one Academy to check', folders.length > 0);
ok('the baseline lists the Academies in the tree',
  folders.every((f) => BASELINE.slots[f] !== undefined),
  `${folders.filter((f) => !BASELINE.slots[f]).join(', ')} is in the tree with no baseline — add it`);

const notes = [];

for (const folder of folders) {
  const dir = path.join(ACADEMIES, folder);
  const manifestPath = path.join(dir, 'content.js');
  if (!fs.existsSync(manifestPath)) continue;
  const manifest = fs.readFileSync(manifestPath, 'utf8');
  const exported = new Set([...manifest.matchAll(/^export const (\w+)\s*=/gm)].map((m) => m[1]));

  console.log(`\n--- ${folder} ---`);

  const expected = BASELINE.slots[folder] || [];
  const lost = expected.filter((slot) => !exported.has(slot));
  ok(`${folder}: keeps every slot it already had (${expected.length})`, lost.length === 0,
    `${lost.join(', ')} disappeared — the school has silently stopped receiving that content`);

  const gained = [...exported].filter((slot) => !expected.includes(slot));
  ok(`${folder}: any new slot is recorded in the baseline`, gained.length === 0,
    `${gained.join(', ')} is exported but not listed — add it to scripts/manifest-slots.json in this commit`);

  // Information only. Files ahead of their wiring are a normal state.
  for (const rel of walk(dir)) {
    if (rel === 'content.js' || /^content-\d+\.js$/.test(rel)) continue;
    const slot = slotFor(rel);
    if (slot && !exported.has(slot)) notes.push(`${folder}: ${slot} has files in the tree but no slot exports them (${rel})`);
  }
}

// ---------------------------------------------------------------------------
console.log('\n--- the generic contract keys the platform reads ---');
// ---------------------------------------------------------------------------
{
  // A compliance slot that answers only in one state's names is a slot the
  // platform cannot read without naming that state itself, which is finding 7
  // in one line. Any Academy that fills the slot at all must answer this.
  for (const folder of folders) {
    const manifestPath = path.join(ACADEMIES, folder, 'content.js');
    if (!fs.existsSync(manifestPath)) continue;
    const manifest = fs.readFileSync(manifestPath, 'utf8');
    const m = manifest.match(/export const compliance = \{([^}]*)\}/);
    if (!m) continue;
    ok(`${folder}: compliance answers with a generic stateName`, /\bstateName\b/.test(m[1]),
      'screens fall back to "your state" without it, including for the family this was built for');
  }
}

if (notes.length) {
  console.log('\n--- notes (not failures) ---');
  const seen = new Set();
  for (const n of notes) {
    const key = n.split(' (')[0];
    if (seen.has(key)) continue;
    seen.add(key);
    console.log('NOTE  ' + n);
  }
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
