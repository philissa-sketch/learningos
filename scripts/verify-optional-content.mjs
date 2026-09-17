// ---------------------------------------------------------------------------
// WHAT A SCHOOL DOES NOT RUN, IT DOES NOT OWE.
// Run: node scripts/verify-optional-content.mjs   (no ACADEMY needed)
//
// Sept 17, 2026. Ten screens for two activities only one child does read their
// content the mandatory way, so every Academy was billed for twenty names —
// twenty of the hundred and forty a second school owed. The parent: *"They are
// supposed to be in his school only."*
//
// `src/content/slots/optional.js` makes the two shapes different in the source:
//
//   REQUIRED   const { isSchoolDay } = academyContent().timetable;
//   OPTIONAL   const { someList = [] } = optionalContent(academyContent(), 'electives');
//
// What this check holds:
//   1. the reader itself — an absent slot yields an empty object, never a throw
//   2. the platform file names no school, subject or activity
//   3. every optional read supplies a default, so an empty answer is handled
//   4. the twenty names really have left the mandatory inventory
//   5. the slot stays optional — nothing reads it the mandatory way again
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');
const codeOnly = (src) => src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `\n      ${detail}` : '')); }
}

const MODULE = 'src/content/slots/optional.js';
const OPTIONAL_SLOT = 'electives';

console.log('--- 1. the reader answers, and never throws ---');
const mod = await import(pathToFileURL(path.join(REPO, MODULE)).href);
{
  ok('the module is present and exports its reader', typeof mod.optionalContent === 'function');
  const filled = { [OPTIONAL_SLOT]: { aList: [1, 2], aLookup: () => 'x' } };
  ok('a school that fills the slot gets its own content',
    mod.optionalContent(filled, OPTIONAL_SLOT).aList?.length === 2);
  const cases = [
    ['nothing', undefined], ['null', null], ['an empty pack', {}],
    ['a pack without that slot', { timetable: {} }],
    ['a slot holding an array', { [OPTIONAL_SLOT]: [1, 2] }],
    ['a slot holding a string', { [OPTIONAL_SLOT]: 'not an object' }],
    ['a slot holding null', { [OPTIONAL_SLOT]: null }]
  ];
  for (const [label, content] of cases) {
    let threw = false; let result;
    try { result = mod.optionalContent(content, OPTIONAL_SLOT); } catch { threw = true; }
    ok(`${label} yields an empty object instead of throwing`,
      !threw && result && typeof result === 'object' && Object.keys(result).length === 0,
      'a throw here reaches the shell and a child sees a school that will not open');
  }
  ok('a missing slot name is answered too', Object.keys(mod.optionalContent({ a: 1 })).length === 0);
  const empty = mod.optionalContent(null, OPTIONAL_SLOT);
  ok('the empty answer is frozen, so no screen can write into it', Object.isFrozen(empty));
  ok('...and it is the same object every time', mod.optionalContent({}, OPTIONAL_SLOT) === empty);
  ok('a school can be asked whether it filled the slot at all',
    mod.hasOptionalContent({ [OPTIONAL_SLOT]: { a: 1 } }, OPTIONAL_SLOT) === true
      && mod.hasOptionalContent({}, OPTIONAL_SLOT) === false);
}

console.log('\n--- 2. the reader belongs to the platform, so it names nobody ---');
{
  const text = read(MODULE);
  ok('it names no learner, school, guide or activity',
    !/lamar|azianna|mission control|petal|commander nova|garden|guitar|herbal/i.test(text),
    'src/content/ is the platform zone — see scripts/verify-no-learner.mjs');
  ok('...and takes the slot from its caller rather than deciding one',
    /export function optionalContent\(content, slot\)/.test(codeOnly(text)));
}

console.log('\n--- 3. every optional read says what it does with no answer ---');
const OPTIONAL_READ = /const \{([\s\S]*?)\} = optionalContent\(academyContent\(\), '(\w+)'\);/g;
// The whole tree, Academy folders included. On Sept 17 the ten screens that
// read this way MOVED into src/academies/<id>/screens/, because the two
// activities belong to one child; a walk that skipped Academies would have
// found nought readers and called it progress.
const sources = (() => {
  const acc = [];
  const walk = (dir) => {
    for (const e of fs.readdirSync(path.join(REPO, dir), { withFileTypes: true })) {
      const rel = `${dir}/${e.name}`;
      if (e.isDirectory()) walk(rel);
      else if (/\.jsx?$/.test(e.name)) acc.push(rel);
    }
  };
  walk('src');
  return acc;
})();

/** Section 5's zone: the mandatory shape is what puts a name on EVERY school's
 *  bill, and only a file outside the Academy folders is counted that way. */
const schoolSources = sources.filter((rel) => !rel.startsWith('src/academies/'));

const readers = [];
for (const rel of sources) {
  if (rel === MODULE) continue;
  const text = read(rel);
  for (const m of codeOnly(text).matchAll(OPTIONAL_READ)) {
    const names = m[1].split(',').map((s) => s.trim()).filter(Boolean);
    readers.push({ rel, slot: m[2], names, importsReader: /content\/slots\/optional\.js'/.test(text) });
  }
}
ok('the screens that ask this way are actually there', readers.length >= 10,
  `${readers.length} reads — they live in the Academy folder now, not src/components/`);
{
  const noImport = readers.filter((r) => !r.importsReader).map((r) => r.rel);
  ok('every one of them imports the reader', noImport.length === 0, noImport.join(', '));
  const undefaulted = readers.flatMap((r) => r.names.filter((n) => !n.includes('=')).map((n) => `${r.rel}: ${n}`));
  ok('every name asked for has a default', undefaulted.length === 0,
    `${undefaulted.slice(0, 8).join(' | ')}\n      an optional read with no default renders "undefined" for a school that does not run it`);
}

console.log('\n--- 4. the names have left the mandatory inventory ---');
{
  const needs = JSON.parse(read('scripts/academy-content-needs.json'));
  const stillRequired = Object.entries(needs.nameToSlot || {})
    .filter(([, slot]) => slot === OPTIONAL_SLOT)
    .map(([name]) => name);
  ok(`no ${OPTIONAL_SLOT} name is required of every Academy`, stillRequired.length === 0,
    `${stillRequired.length} still required: ${stillRequired.slice(0, 8).join(', ')}`);
  ok('...and the inventory still holds the names that ARE required',
    needs.names.length > 50 && needs.nameToSlot?.isSchoolDay === 'timetable',
    'an empty or broken inventory would pass the line above for the wrong reason');
}

console.log('\n--- 5. nothing reads the optional slot the mandatory way again ---');
{
  const regressions = schoolSources
    .filter((rel) => new RegExp(`academyContent\\(\\)\\.${OPTIONAL_SLOT}\\b`).test(codeOnly(read(rel))))
    .filter((rel) => rel !== MODULE);
  ok(`no file reads academyContent().${OPTIONAL_SLOT} directly`, regressions.length === 0,
    `${regressions.join(', ')} — that shape puts every name back on every school's bill`);
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
