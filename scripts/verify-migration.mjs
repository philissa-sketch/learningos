// ---------------------------------------------------------------------------
// MOVING A SCHOOL LOSES NOTHING. Run: node scripts/verify-migration.mjs
//
// Browser records belong to the exact URL that created them, so moving a school
// to a new web address means it travels as a file. That file is the only copy
// in flight, and the failure it invites is silent: a table quietly absent, not
// noticed until the year it is needed.
//
// The specific trap this guards is subtle and worth stating plainly. The app
// ALREADY has an export — the daily "send my work to Mom" handoff — and it
// deliberately excludes nine tables. That exclusion is correct: those tables
// are the parent's (her compliance checklist, her course descriptions, her
// notes about her son), and a file arriving from a child's computer must not
// overwrite them.
//
// Reaching for that export to move a school would look right, run cleanly, and
// silently drop the Georgia compliance record. So a migration file is a
// different format with the opposite rule — EVERYTHING travels — and these
// checks hold the two apart.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');
const codeOnly = (rel) =>
  read(rel)
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    .replace(/^\s*\/\/.*$/gm, '');

const M = await import(REPO + '/src/lib/migrationFile.js');
const { EXPORT_TABLE_POLICY } = await import(REPO + '/src/db/db.js');
const { summarizeSource, buildImportPlan, rowsToCopy, verifyCopy } = await import(
  REPO + '/src/lib/importSchool.js'
);

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

// A school shaped like the real one: the excluded tables are non-empty,
// because a guard whose fixture leaves them out proves nothing.
const SCHOOL = {
  ledger: [
    ...Array.from({ length: 12 }, (_, i) => ({ entryId: `c${i}`, currency: 'coin', note: 'Lesson' })),
    ...Array.from({ length: 7 }, (_, i) => ({ entryId: `r${i}`, currency: 'credit', note: 'Challenge' })),
    ...Array.from({ length: 39 }, (_, i) => ({ entryId: `p${i}`, currency: 'petal', note: 'Ribboned Braids' })),
    ...Array.from({ length: 2 }, (_, i) => ({ entryId: `s${i}`, currency: 'seed', note: 'Warm-up' }))
  ],
  attendance: Array.from({ length: 180 }, (_, i) => ({ date: `d${i}` })),
  adminRecords: [{ id: 1, kind: 'declaration' }],
  complianceChecks: [{ key: 'doi', done: true }],
  courseDescriptions: [{ subject: 'aerospace', text: '…' }],
  parentNotes: [{ id: 1, text: 'private' }],
  missionEvaluations: [{ quarter: 'Q1', grade: 'A' }]
};
const HOUSEHOLD = { academies: [{ id: 'x' }], parentAuth: [{ id: 'singleton' }], session: [] };

const prefixed = {};
for (const [t, rows] of Object.entries(SCHOOL)) prefixed[`SchoolDB::${t}`] = rows;
for (const [t, rows] of Object.entries(HOUSEHOLD)) prefixed[`HouseholdDB::${t}`] = rows;

const file = M.buildMigrationFile(prefixed, {
  sourceOrigin: 'https://old.example',
  sourceDatabase: 'SchoolDB'
});

console.log('--- 1. a migration file carries everything ---');

ok('the file identifies itself as a migration, not a handoff',
  file.kind === 'learningos-migration', file.kind);
ok('it records where it came from', file.source.origin === 'https://old.example');
ok('...and when', typeof file.exportedAt === 'string' && file.exportedAt.includes('T'));

// The heart of it. Every table the daily handoff excludes must be present.
const excluded = Object.entries(EXPORT_TABLE_POLICY).filter(([, v]) => v !== true).map(([k]) => k);
const presentInFile = new Set(Object.keys(file.tables).map((k) => k.split('::').pop()));
const carriedExclusions = excluded.filter((t) => t in SCHOOL);
ok('every table the daily handoff excludes still travels',
  carriedExclusions.every((t) => presentInFile.has(t)),
  `${carriedExclusions.filter((t) => !presentInFile.has(t)).join(', ')} would have been lost`);
ok('...and there are real ones to lose', carriedExclusions.length >= 5,
  `only ${carriedExclusions.length} excluded tables in the fixture`);

console.log('\n--- 2. a truncated file is caught before it is restored ---');

ok('a good file validates', M.validateMigrationFile(file).ok);

const truncated = structuredClone(file);
truncated.tables['SchoolDB::attendance'] = truncated.tables['SchoolDB::attendance'].slice(0, 100);
const caught = M.validateMigrationFile(truncated);
ok('a file that lost rows in transit is refused', !caught.ok, JSON.stringify(caught));
ok('...and the message says which table', /attendance/.test(caught.error || ''), caught.error);

const handoffShaped = { version: 3, xp: 400, lessonProgress: [] };
const wrongKind = M.validateMigrationFile(handoffShaped);
ok('a daily handoff file is refused, not silently half-restored', !wrongKind.ok);
ok('...and the message explains the difference',
  /leaves out your own records|different thing/i.test(wrongKind.error || ''), wrongKind.error);

console.log('\n--- 3. the file is taken apart correctly ---');

const dbs = M.databasesInFile(file);
ok('both databases are seen', dbs.length === 2 && dbs.includes('SchoolDB') && dbs.includes('HouseholdDB'),
  dbs.join(', '));
ok('the bigger one is offered first', M.likeliestSchoolDatabase(file) === 'SchoolDB');

const flat = M.tablesForDatabase(file, 'SchoolDB');
ok('the prefix comes off', Object.keys(flat).every((k) => !k.includes('::')), Object.keys(flat).join(','));
ok('and only that database travels', !('academies' in flat) && 'ledger' in flat);
ok('nothing is lost taking it apart',
  Object.values(flat).reduce((n, r) => n + r.length, 0) ===
    Object.values(SCHOOL).reduce((n, r) => n + r.length, 0));

console.log('\n--- 4. restoring from a file obeys the same rules as any import ---');

const summary = summarizeSource(flat);
const plan = buildImportPlan(summary, {
  tables: Object.keys(flat),
  currencies: ['ledger:coin', 'ledger:credit']
});
const ledgerOut = rowsToCopy(plan, 'ledger', flat.ledger);

ok('the ledger filter still applies to a file restore', ledgerOut.length === 19, String(ledgerOut.length));
ok('...so the 41 rows that belong to a sibling still do not travel',
  ledgerOut.every((r) => r.currency === 'coin' || r.currency === 'credit'));

const landed = Object.fromEntries(
  Object.keys(flat).map((t) => [t, rowsToCopy(plan, t, flat[t])])
);
ok('a correct restore verifies', verifyCopy(plan, flat, landed).ok);
ok('a restore that dropped the compliance table fails',
  !verifyCopy(plan, flat, { ...landed, complianceChecks: [] }).ok,
  'silently losing this is the whole reason this guard exists');

console.log('\n--- 5. the parent is told what a handoff would have missed ---');

// Flat tables, not the file — see the note on the function. Passing the file
// returns an empty list with no error, which is exactly the bug this caught.
const missed = M.tablesTheHandoffWouldMiss(flat, EXPORT_TABLE_POLICY);
ok('passing the whole file instead of its tables returns nothing, as it must not',
  M.tablesTheHandoffWouldMiss(file, EXPORT_TABLE_POLICY).length === 0,
  'this asserts the trap still exists, so the note explaining it stays honest');
ok('the excluded tables are surfaced by name', missed.length >= 5, JSON.stringify(missed.map((m) => m.name)));
ok('...with the reason they are normally excluded',
  missed.every((m) => typeof m.reason === 'string' && m.reason.length > 10));
ok('...and only ones that actually have rows',
  missed.every((m) => m.rows > 0));

const ui = read('src/components/Academy/ImportSchool.jsx');
ok('the restore screen renders that list', /missedByHandoff\.map/.test(ui));
ok('...and says plainly that a move must not leave them', /a move must not/i.test(ui));

console.log('\n--- 6. the export snippet only reads ---');

const snippet = read('docs/migration-export-snippet.js');
ok('the snippet never writes to a store',
  !/\.put\(|\.add\(|\.delete\(|\.clear\(/.test(snippet));
ok('...opens without a version, so nothing is upgraded',
  /indexedDB\.open\(name\)/.test(snippet) && !/indexedDB\.open\(name,/.test(snippet));
ok('...and aborts rather than leaving an empty database behind',
  /onupgradeneeded/.test(snippet) && /transaction\.abort\(\)/.test(snippet),
  'opening a name that does not exist would otherwise CREATE it');
ok('it writes the same format the app reads',
  /kind: 'learningos-migration'/.test(snippet) && /format: FORMAT/.test(snippet));
ok('...and the same manifest the validator checks',
  /manifest: \{ tableCount/.test(snippet));
ok('it takes every database at the address, not a chosen one',
  /for \(const \{ name \} of listed\)/.test(snippet),
  'a household database left behind is a passcode and every PIN lost');

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
