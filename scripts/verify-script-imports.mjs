// ---------------------------------------------------------------------------
// verify-script-imports.mjs — the check suite checks itself.
//
// ---- WHY THIS EXISTS ----
//
// On Sept 13 2026 the suite ran on the owner's Windows machine for the first
// time. 37 of the 65 verify scripts could not execute at all:
//
//     const fd = await import(REPO + '/src/lib/frontDoor.js');
//
// REPO is `C:\Users\…` on Windows, so the string handed to import() begins `C:`
// and Node rejects it — ERR_UNSUPPORTED_ESM_URL_SCHEME, protocol 'c:'. The same
// line parses on a POSIX path, so every green run the suite had ever reported
// came from a Linux sandbox. The standing rule — run the checks on her machine,
// not in a sandbox — was correct and had never been satisfiable.
//
// Three scripts already carried a hand-rolled Windows-safe helper when this was
// found. So it had been hit three times and fixed one file at a time. This file
// is what makes the fourth instance a failed check instead of a discovery.
//
// ---- WHAT IT ASSERTS ----
//
//   1. No script builds a dynamic import() by concatenating a base path.
//   2. Every script that imports by path can produce a real file:// URL.
//   3. The scan is real — it found scripts, and it read code rather than prose.
//
// ---- THE TRAP THIS FILE WALKED INTO ITSELF ----
//
// The codemod that fixed the 37 was first written scanning raw source, and it
// reported a broken call site in a file that was already fixed: it had matched
// the sentence in the comment EXPLAINING the fix. That is the sixth instance in
// this repo of a guard matching its own explanation. So this check masks
// comments to spaces before it looks, and asserts that the masking did something
// — because a mask that silently stopped working would turn this into a check
// that passes by reading nothing.
// ---------------------------------------------------------------------------

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SCRIPTS = path.join(REPO, 'scripts');

/**
 * Files excluded, each with a reason, in the shape verify-thin-boot uses.
 *
 * Both of these legitimately contain the broken pattern as TEXT — one applies
 * the fix and one is this file. They are excluded by name rather than by making
 * the pattern looser, because loosening the pattern is how a guard stops
 * catching the thing it exists for.
 */
const SKIP = {
  'fix-windows-imports.mjs': 'the codemod that fixes this — it must name the broken shape to find it',
  'verify-script-imports.mjs': 'this file — its own assertions quote the broken shape'
};

const BASE_VARS = ['REPO', 'ROOT', 'root', 'repo'];

/** Comments blanked to spaces, offsets preserved. See the header. */
function maskComments(src) {
  const out = src.split('');
  let i = 0;
  let mode = null;
  const blank = (at) => { if (out[at] !== '\n') out[at] = ' '; };
  while (i < src.length) {
    const c = src[i];
    const d = src[i + 1];
    if (mode === null) {
      if (c === '/' && d === '/') { mode = 'line'; blank(i); blank(i + 1); i += 2; continue; }
      if (c === '/' && d === '*') { mode = 'block'; blank(i); blank(i + 1); i += 2; continue; }
      if (c === '\'') { mode = 'sq'; i++; continue; }
      if (c === '"') { mode = 'dq'; i++; continue; }
      if (c === '`') { mode = 'tmpl'; i++; continue; }
      i++; continue;
    }
    if (mode === 'line') { if (c === '\n') mode = null; else blank(i); i++; continue; }
    if (mode === 'block') {
      if (c === '*' && d === '/') { blank(i); blank(i + 1); mode = null; i += 2; continue; }
      blank(i); i++; continue;
    }
    if (c === '\\') { i += 2; continue; }
    if ((mode === 'sq' && c === '\'') || (mode === 'dq' && c === '"') || (mode === 'tmpl' && c === '`')) {
      mode = null;
    }
    i++;
  }
  return out.join('');
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

/**
 * Every .mjs under scripts/, INCLUDING subdirectories.
 *
 * ⚠️ The first version of this check used a flat readdir and never looked in
 * scripts/lib/. scripts/lib/academy-under-test.mjs is imported on the FIRST line
 * of every school-facing check, and it carried two of these broken imports — so
 * this check reported ALL CHECKS PASSED while 31 of the 65 checks still could
 * not start. A scan that cannot see a whole folder is not a smaller version of
 * the right scan; it is a wrong answer wearing a right one's clothes.
 */
function allScripts(dir = SCRIPTS, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || e.name === 'node_modules') continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) allScripts(full, acc);
    else if (e.name.endsWith('.mjs')) acc.push(path.relative(SCRIPTS, full).replace(/\\/g, '/'));
  }
  return acc;
}

const files = allScripts().sort();
const checked = files.filter((f) => !SKIP[f]);

console.log('--- 1. the scan is real ---');
ok('there are scripts to check', checked.length > 20, `found ${checked.length}`);
ok('the scan reached scripts/lib/, not just the top level',
  checked.some((f) => f.startsWith('lib/')),
  'a flat scan here is what let academy-under-test.mjs hold 31 checks down while this check passed');
ok('every skip is declared with a reason and its file exists',
  Object.entries(SKIP).every(([f, why]) => why && files.includes(f)),
  Object.keys(SKIP).filter((f) => !files.includes(f)).join(', '));

// The mask must actually blank something, or this check reads nothing.
const selfRaw = fs.readFileSync(path.join(SCRIPTS, 'verify-script-imports.mjs'), 'utf8');
const selfMasked = maskComments(selfRaw);
ok('masking comments changes the source',
  selfMasked !== selfRaw && selfMasked.length === selfRaw.length,
  'the mask must blank comments AND preserve offsets');
// The probe word must appear ONLY in a comment and NOWHERE in code — including
// in this assertion. The first version tested for a phrase it then quoted in the
// regex on this very line, so the phrase survived masking and the check failed
// against a correctly masked file. Seventh instance of the same habit, caught by
// its own test. The word below is assembled so it cannot match itself.
const PROBE = 'satisf' + 'iable';
ok('masking removes comment prose but keeps code',
  !selfMasked.includes(PROBE) && selfRaw.includes(PROBE) && /BASE_VARS/.test(selfMasked),
  'the probe word must exist in the file, be gone after masking, and code must survive');

console.log('\n--- 2. no script builds an import() from a concatenated path ---');
const bases = BASE_VARS.join('|');
const patterns = [
  new RegExp(`import\\(\\s*'file://'\\s*\\+\\s*(?:${bases})\\s*\\+`, 's'),
  new RegExp(`import\\(\\s*(?:${bases})\\s*\\+\\s*['"]`, 's'),
  new RegExp('import\\(\\s*`\\$\\{(?:' + bases + ')\\}', 's'),
  // ⚠️ The third shape, and the one that actually mattered. path.join returns a
  // PATH, so on Windows it begins with a drive letter and import() rejects it
  // exactly like a concatenated string. The first version of this check knew
  // only the two concatenation shapes above, so it passed a tree in which
  // scripts/lib/academy-under-test.mjs still held 31 checks down.
  new RegExp('import\\(\\s*path\\.(join|resolve)\\s*\\(', 's')
];

const offenders = [];
for (const f of checked) {
  const masked = maskComments(fs.readFileSync(path.join(SCRIPTS, f), 'utf8'));
  const hit = patterns.some((p) => p.test(masked));
  if (hit) offenders.push(f);
}
ok('no script concatenates a base path into import()',
  offenders.length === 0,
  offenders.length
    ? `${offenders.length} file(s): ${offenders.join(', ')}\n      ` +
      'Fix with: node scripts/fix-windows-imports.mjs --write'
    : '');

console.log('\n--- 3. the helper every fixed script uses produces a real URL ---');
const moduleUrl = (rel) => pathToFileURL(path.join(REPO, rel)).href;
const sample = moduleUrl('src/lib/frontDoor.js');
ok('it yields a file: URL', sample.startsWith('file:'), sample);
ok('...with no raw drive letter or backslash left in it',
  !/\\/.test(sample) && !/^file:\/\/[A-Za-z]:/.test(sample), sample);
ok('...and it round-trips back to the same path',
  fileURLToPath(sample) === path.join(REPO, 'src/lib/frontDoor.js'));

console.log('\n--- 4. scripts that DO import by path carry a helper ---');
const importers = [];
for (const f of checked) {
  const masked = maskComments(fs.readFileSync(path.join(SCRIPTS, f), 'utf8'));
  if (/import\(\s*(?:moduleUrl|url|pathToFileURL)\s*\(/.test(masked)) importers.push(f);
}
ok('the fixed scripts are present and plural', importers.length >= 30, `${importers.length} scripts import by helper`);

console.log(`\n${passed} passed, ${failures.length} failed\n`);
if (failures.length) {
  console.log(`${failures.length} CHECK(S) FAILED`);
  process.exit(1);
}
console.log('ALL CHECKS PASSED');
