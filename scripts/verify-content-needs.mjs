// ---------------------------------------------------------------------------
// THE LIST OF NAMES EVERY ACADEMY OWES IS TRUE AND CURRENT.
// Run: node scripts/verify-content-needs.mjs   (no ACADEMY needed)
//
// Sept 17, 2026. `scripts/academy-content-needs.json` is the contract every
// school is checked against. It had not been regenerated since Sept 9, and when
// it was, the scanner — a regex written before the school's reads had
// fallbacks — wrote 109 names instead of 151: defaults kept as part of the name
// (`allLessons = []`), whole lines dropped at a `= {}`, and a comment counted as
// a name. It reported success.
//
// Two ways that list can lie, both checked here:
//   1. STALE  — the platform's reads changed and nobody re-ran the scan. The
//      contract then demands names nothing asks for, or misses ones it does.
//   2. WRONG  — the scanner misreads the code. So its reading is tested on a
//      stand-in file holding every shape the school writes, before it is
//      trusted on the real ones.
//
// The fix for a red section 3 is `UPDATE-CONTENT-LIST.bat`, never editing the
// JSON by hand.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parse } from '@babel/parser';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { scan } = await import(pathToFileURL(path.join(REPO, 'scripts/scan-content-needs.mjs')).href);

let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `\n      ${detail}` : '')); }
}

console.log('--- 1. the scanner reads every shape the school writes ---');
{
  // The stand-in is scanned through the same exported reader the real scan
  // uses, by parsing it here and handing the tree over.
  const mod = await import(pathToFileURL(path.join(REPO, 'scripts/scan-content-needs.mjs')).href);
  ok('the scanner exposes its tree reader', typeof mod.slotReadsIn === 'function');
  const src = [
    "const { plain, renamed: local, withList = [], withObject = {}, withFn = () => null,",
    "  // commentedOut,",
    "  last } = academyContent().alpha;",
    "function inside() {",
    "  const { nested = { a: 1 } } = academyContent().beta;",
    "  return nested;",
    "}",
    "const { notContent } = somethingElse().alpha;",
    "const whole = academyContent().gamma;"
  ].join('\n');
  const reads = typeof mod.slotReadsIn === 'function'
    ? mod.slotReadsIn(parse(src, { sourceType: 'module', plugins: ['jsx'] }))
    : [];
  const alpha = reads.find((r) => r.slot === 'alpha')?.names || [];
  ok('a plain name is read', alpha.includes('plain'));
  ok('a renamed read lists the EXPORTED name, not the local one',
    alpha.includes('renamed') && !alpha.includes('local'));
  ok('a default is not part of the name',
    ['withList', 'withObject', 'withFn'].every((n) => alpha.includes(n)) && !alpha.some((n) => /=/.test(n)),
    JSON.stringify(alpha));
  ok('a `= {}` default does not cut the line short', alpha.includes('last'),
    'this is what dropped 15 files from the inventory');
  ok('a comment is never a name', !alpha.some((n) => /commentedOut|\/\//.test(n)), JSON.stringify(alpha));
  ok('exactly the six names on that line', alpha.length === 6, JSON.stringify(alpha));
  ok('a read inside a function counts, with a nested default',
    JSON.stringify(reads.find((r) => r.slot === 'beta')?.names) === '["nested"]');
  ok('a destructure from anything else is ignored', reads.every((r) => !r.names.includes('notContent')));
  ok('a whole-slot read names nothing', !reads.some((r) => r.slot === 'gamma'));
}

console.log('\n--- 2. every name in the saved list is a real name ---');
const saved = JSON.parse(fs.readFileSync(path.join(REPO, 'scripts/academy-content-needs.json'), 'utf8'));
{
  const bad = saved.names.filter((n) => !/^[A-Za-z_$][\w$]*$/.test(n));
  ok('no name carries a default, a space or a comment', bad.length === 0, bad.slice(0, 8).join(' | '));
  ok('the list is not empty', saved.names.length > 0);
  ok('every name says which slot it comes from',
    saved.names.every((n) => typeof saved.nameToSlot?.[n] === 'string'));
}

console.log('\n--- 3. the saved list matches the code as it is today ---');
{
  const fresh = scan({ quiet: true, write: false });
  const missing = fresh.names.filter((n) => !saved.names.includes(n));
  const extra = saved.names.filter((n) => !fresh.names.includes(n));
  ok('nothing the platform reads is missing from the list', missing.length === 0,
    `${missing.length} missing: ${missing.slice(0, 8).join(', ')} — run UPDATE-CONTENT-LIST.bat`);
  ok('nothing is listed that the platform no longer reads', extra.length === 0,
    `${extra.length} no longer read: ${extra.slice(0, 8).join(', ')} — run UPDATE-CONTENT-LIST.bat`);
  ok('each name is filed under the slot the code reads it from',
    fresh.names.every((n) => fresh.nameToSlot[n] === saved.nameToSlot?.[n]));
  console.log(`      ${fresh.names.length} names across ${Object.keys(fresh.byFile).length} files`);
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
