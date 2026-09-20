// ---------------------------------------------------------------------------
// ONE FAMILY'S REPAIRS LEFT THE PLATFORM STORE.
// Run: ACADEMY=lamar node scripts/verify-assignment-migrations.mjs
//
// ---- WHAT MOVED (Sept 20, 2026 — GENERIC_CARRYOVER fault 2) ----
//
// `src/store/useAppStore.js` carried 32 `asg::` and 8 `book::` slot ids across
// four migrations that ran for EVERY Academy that ever booted:
//
//   ASSIGNMENT_CORRECTIONS     one school's due dates, formats, notes, retypes
//   RETIRED_ASSIGNMENT_SLOTS   three of that school's dropped slots
//   bookSwapMap                eight of that school's book titles
//
// They were inert for a second school only because the ids would not match.
// The carryover doc named that for what it was: luck, not design.
//
// The MECHANISM stayed. "A seed edit cannot reach a row that is already
// hydrated" is true for every school, and the pass that fixes it is real
// platform work. Only the entries are a family's.
//
// ---- WHAT THIS PINS, AND WHY IT IS NOT JUST A COUNT ----
//
// A migration runs against rows a parent has been editing for two months. The
// guards are the whole safety story, and they are easy to lose in a move:
//
//   * every entry says what the wrong value WAS, and applies only on an exact
//     match — a date she changed herself is hers, and is walked past
//   * `fromDueDate` and `fromNote` accept ARRAYS on purpose. A database that
//     took an earlier correction sits on different data than one that never
//     did, and both have to be reachable. This is on the repo's explicit
//     "do not relitigate" list, so it gets an assertion rather than a comment.
//   * formats are only ever ADDED, never replaced
//
// So this file checks the guards are still THERE and still SHAPED that way,
// not merely that the table is the right size.
// ---------------------------------------------------------------------------

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { academyUnderTest } from './lib/academy-under-test.mjs';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');
const load = (rel) => import(pathToFileURL(path.join(REPO, rel)).href);

let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
}

const store = src('src/store/useAppStore.js');
const content = await load(`src/academies/${academyUnderTest}/content.js`);
const repairs = content.migrations || {};

// ---------------------------------------------------------------------------
console.log('\n--- 1. the store carries no school\'s slot ids ---');
// ---------------------------------------------------------------------------
{
  ok('no correction table is declared in the store',
    !/const ASSIGNMENT_CORRECTIONS = \{/.test(store));
  ok('no retired-slot list is declared in the store',
    !/const RETIRED_ASSIGNMENT_SLOTS = new Set/.test(store));
  ok('no book-swap map is declared in the store',
    !/const bookSwapMap = \{/.test(store));

  // The real measure: how many of one family's row ids are compiled in.
  const codeOnly = store.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
  const asg = [...new Set([...codeOnly.matchAll(/'(asg::[^']+)'/g)].map((m) => m[1]))];
  const book = [...new Set([...codeOnly.matchAll(/'(book::[^']+)'/g)].map((m) => m[1]))];
  ok(`slot ids left in the store: ${asg.length + book.length} (was 40)`,
    asg.length + book.length === 0,
    `${[...asg, ...book].join(', ')} — each one is a row in one family's database`);
}

// ---------------------------------------------------------------------------
console.log('\n--- 2. the school supplies them, optionally ---');
// ---------------------------------------------------------------------------
{
  ok('the Academy fills a migrations slot', Object.keys(repairs).length > 0);
  ok('the corrections came across', Object.keys(repairs.ASSIGNMENT_CORRECTIONS || {}).length === 28,
    `${Object.keys(repairs.ASSIGNMENT_CORRECTIONS || {}).length} — the move must not drop one`);
  ok('the retired slots came across', (repairs.RETIRED_ASSIGNMENT_SLOTS || []).length === 3);
  ok('the book swaps came across', Object.keys(repairs.BOOK_SWAPS || {}).length === 8);
  ok('the slot is not required of every Academy',
    !/REQUIRED_SLOTS[\s\S]{0,400}'migrations'/.test(src('src/content/academyContent.js')),
    'a school that has needed no repairs must owe the contract nothing');
  ok('...and no name of it entered the required inventory',
    !JSON.parse(src('scripts/academy-content-needs.json')).names.includes('ASSIGNMENT_CORRECTIONS'));
}

// ---------------------------------------------------------------------------
console.log('\n--- 3. every entry still refuses to touch an edited row ---');
// ---------------------------------------------------------------------------
{
  const corrections = Object.entries(repairs.ASSIGNMENT_CORRECTIONS || {});
  // A from-guard is how an entry proves it is not about to overwrite a choice.
  // There is ONE shape that needs none: an entry that only supplies a `format`.
  // The mechanism guards that one itself — `if (fix.format && !row.format)` —
  // so it can only ever FILL a blank, never replace a format she picked.
  //
  // The first version of this check did not know that and called four
  // legitimate entries unguarded. Naming the exception here, with the line of
  // code that earns it, is better than widening the rule until it passes.
  const GUARDS = ['fromDueDate', 'fromNote', 'fromTitle', 'fromFormat', 'fromType'];
  const formatOnly = ([, fix]) => Object.keys(fix).every((k) => k === 'format');
  const unguarded = corrections
    .filter(([, fix]) => !GUARDS.some((g) => g in fix))
    .filter((entry) => !formatOnly(entry));
  ok('every correction either states the wrong value, or only fills a blank format',
    unguarded.length === 0,
    `${unguarded.map(([id]) => id).join(', ')} — an unguarded entry overwrites a value she chose`);
  ok('...and the format rule that excuses the rest is actually in the store',
    /if \(fix\.format && !row\.format\) changes\.format = fix\.format;/.test(store),
    'without this line those format-only entries ARE unguarded, and this check would be lying');

  const arrayGuards = corrections.filter(([, fix]) =>
    Array.isArray(fix.fromDueDate) || Array.isArray(fix.fromNote));
  ok(`array-valued from-guards survive the move (${arrayGuards.length})`, arrayGuards.length >= 5,
    'a database that took an earlier correction sits on different data than one that never did');

  const swaps = Object.entries(repairs.BOOK_SWAPS || {});
  ok('every book swap names the title it replaces', swaps.every(([, s]) => typeof s.from === 'string' && s.from),
    'without `from`, a title she chose herself would be overwritten');
}

// ---------------------------------------------------------------------------
console.log('\n--- 4. the mechanism stayed, and still honours the guards ---');
// ---------------------------------------------------------------------------
{
  ok('the store still applies corrections', /assignmentCorrections\[row\.slotId\]/.test(store));
  ok('...comparing against the stated old value',
    /fromDueDate/.test(store) && /fromNote/.test(store));
  ok('...and accepts an ARRAY of old values',
    /Array\.isArray\(fix\.fromDueDate\)/.test(store) || /\[\]\.concat\(fix\.fromDueDate/.test(store),
    'the do-not-relitigate rule: removing this lands a second fix on half the databases');
  ok('the store still applies book swaps', /BOOK_SWAPS\[row\.slotId\]/.test(store));
  ok('...only when the title is the one it expects', /row\.title !== swap\.from/.test(store));
  ok('the store still retires slots', /retiredSlots\.has\(a\.slotId\)/.test(store));
  ok('the store still retitles by table, not by name',
    /ASSIGNMENT_RETITLES\[row\.slotId\]/.test(store),
    'the wind-tunnel repair was one school\'s slot id written inline');
  ok('...and moves a date only FROM a value the entry names',
    /\[\]\.concat\(retitle\.fromDueDate \|\| \[\]\)\.includes\(row\.dueDate\)/.test(store),
    'any other date is one she chose; 240 row shapes were compared against the old inline logic, 0 differed');
  const retitles = Object.entries(repairs.ASSIGNMENT_RETITLES || {});
  ok('the retitle entry came across', retitles.length === 1);
  ok('...and still names the title it replaces', retitles.every(([, r]) => (r.fromTitle || []).length > 0));
  ok('...and the date it is allowed to move from', retitles.every(([, r]) => (r.fromDueDate || []).length > 0));
}

// ---------------------------------------------------------------------------
console.log('\n--- 5. nothing is read before a school is mounted ---');
// ---------------------------------------------------------------------------
{
  ok('the repairs are read through a function, not a module-scope constant',
    /function academyRepairs\(\)/.test(store),
    'a module-scope read runs at import, where no school is loaded');
  ok('...and that function is not called at module scope',
    !/^const .*= academyRepairs\(\)/m.test(store));
  ok('a school with no repairs reads as empty',
    Object.keys((await load('src/content/slots/optional.js')).optionalContent({}, 'migrations')).length === 0);
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
