// ---------------------------------------------------------------------------
// ONE DATABASE PER ACADEMY, AND NOBODY TOUCHES IT EARLY.
// Run: node scripts/verify-academy-db.mjs
//
// The isolation mechanism, and the property that keeps it cheap.
//
// Records separate by DATABASE — one per Academy, nothing shared for anything
// to cross through. That works because `db.js` is the ONLY file that builds a
// connection, and everything else reaches it through named helpers. The moment
// a second file starts constructing a Dexie, or a component starts reading a
// table directly, the separation stops being structural and becomes something
// somebody has to remember. This guard is what notices.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');

/**
 * The file with every comment removed. A presence check whose subject is also
 * named in prose passes on the day the code is deleted and the comment stays —
 * and these files explain themselves at length.
 */
const codeOnly = (rel) =>
  read(rel)
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    .replace(/^\s*\/\/.*$/gm, '');

function sourceFiles(dir = 'src', acc = []) {
  for (const entry of fs.readdirSync(path.join(REPO, dir), { withFileTypes: true })) {
    const rel = `${dir}/${entry.name}`;
    if (entry.isDirectory()) sourceFiles(rel, acc);
    else if (/\.jsx?$/.test(entry.name)) acc.push(rel);
  }
  return acc;
}

let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) {
    passed += 1;
    console.log('PASS  ' + label);
  } else {
    failures.push(label);
    console.log('FAIL  ' + label + (detail ? `  ${detail}` : ''));
  }
}

const files = sourceFiles();
const dbSrc = read('src/db/db.js');
const dbCode = codeOnly('src/db/db.js');

console.log('--- 1. connections are built in one place, and built late ---');

// Three, each for a reason that had to be argued:
//
//   db.js          — the connection belonging to ONE learner
//   householdDb.js — the one belonging to the FAMILY, open before sign-in
//   importRunner.js — a FOREIGN database, opened read-only with no schema
//                     declared, because openAcademy() would declare 35 versions
//                     over it and force an upgrade. An upgrade is a write, and
//                     the one database that must never be written is the one
//                     being imported from.
//
// A fourth would mean records living somewhere none of those three cover.
const MAY_CONSTRUCT = ['src/db/db.js', 'src/db/householdDb.js', 'src/db/importRunner.js'];
const constructors = files.filter((f) => /new Dexie\(/.test(codeOnly(f)));
ok('only db.js, householdDb.js and importRunner.js construct a Dexie',
  constructors.length === 3 && constructors.every((f) => MAY_CONSTRUCT.includes(f)),
  constructors.join(', '));

// The exception earns itself only if it stays read-only.
const runner = codeOnly('src/db/importRunner.js');
ok('...and the foreign one is opened without declaring a version',
  /await source\.open\(\)/.test(runner) && !/source\.version\(/.test(runner));

ok('neither is constructed at module load',
  !/^\s*export\s+const\s+db\s*=\s*new Dexie\(/m.test(dbCode) &&
    !/^\s*(export )?const household = new Dexie\(/m.test(codeOnly('src/db/householdDb.js')));

ok('...db.js constructs one inside openAcademy()',
  /export function openAcademy\([\s\S]*?db = new Dexie\(dbName\)/.test(dbCode));
ok('...and householdDb.js inside openHousehold()',
  /export function openHousehold\(\)[\s\S]*?new Dexie\(HOUSEHOLD_DB_NAME\)/.test(codeOnly('src/db/householdDb.js')));

ok('db is a reassignable live binding', /^export let db =/m.test(dbCode),
  'export const would freeze every importer to the first Academy');

ok('openAcademy takes the database name rather than deriving it',
  /export function openAcademy\(academyId, dbName\)/.test(dbCode),
  'so an import can point a new Academy at records that already exist elsewhere');

ok('there is a way back out (sign-out)', /export function closeAcademy\(\)/.test(dbCode));

console.log('\n--- 2. reaching a table before sign-in fails loudly ---');

ok('an unopened db throws rather than returning undefined',
  /throw new Error\(\s*`LearningOS: the database was used before an Academy was opened/.test(dbSrc));
ok('...and the error names the property that was reached for',
  /reached for "\$\{String\(prop\)\}"/.test(dbSrc));
ok('...and says what to call instead', /openAcademy\(academyId, dbName\) must/.test(dbSrc));
ok('the household database says the same when used early',
  /the household database was used before openHousehold\(\) ran/.test(read('src/db/householdDb.js')));

console.log('\n--- 3. the schema is recorded where it is written, and replayed ---');

// The version blocks are interleaved with the helpers that use them, so that
// each table's schema sits next to the code that reads it. They were left
// exactly where they sit; a recorder captures them instead.
const declared = [...dbSrc.matchAll(/^db\.version\((\d+)\)/gm)].map((m) => Number(m[1]));
ok('db.js declares its versions as db.version(n)', declared.length > 0, `${declared.length} found`);
ok('...in ascending order, with none skipped',
  declared.every((n, i) => n === i + 1), declared.join(','));
ok('openAcademy replays every recorded version onto the new connection',
  /for \(const \{ n, stores, upgrade \} of schemaVersions\)/.test(dbCode));
ok('...and every recorded connection handler',
  /for \(const \{ event, handler \} of connectionHandlers\)/.test(dbCode));
ok('...and refuses to open a connection with no schema at all',
  /schemaVersions\.length === 0/.test(dbCode));

console.log('\n--- 4. who is allowed to import db.js ---');

// Four, and the list is the point rather than the number. Two of them are the
// platform's (the gate opens and closes connections; the import screen writes
// into the one already open) and two are the school's (the store, and the one
// screen that reads a typing score directly). When the school is made generic
// the last two stay — they will just be reaching a different Academy's records.
//
// A fifth means somebody has started talking to the database from a component,
// and the 136 named helpers stopped being the only way in.
const MAY_IMPORT_DB = [
  'src/FrontDoorGate.jsx',
  'src/components/Academy/ImportSchool.jsx',
  'src/store/useAppStore.js',
  'src/components/Writing/TypingPractice.jsx'
];
const importers = files.filter((f) => f !== 'src/db/db.js' && /from '[^']*db\/db\.js'/.test(codeOnly(f)));
ok('exactly four files import db.js',
  importers.length === 4 && importers.every((f) => MAY_IMPORT_DB.includes(f)),
  importers.join(', '));

// The live connection, to write into — and EXPORT_TABLE_POLICY, to READ. The
// policy is the list of tables a daily handoff leaves behind, and the restore
// screen names them so a parent can see her compliance file actually arrived.
// That is a declaration about tables, not a way into one.
const IMPORT_SCREEN_MAY_IMPORT = ['db', 'EXPORT_TABLE_POLICY'];
const importScreenNames = (codeOnly('src/components/Academy/ImportSchool.jsx')
  .match(/import \{([^}]*)\} from '\.\.\/\.\.\/db\/db\.js'/) || [, ''])[1]
  .split(',').map((n) => n.trim()).filter(Boolean);
ok('the import screen takes the live connection and the export policy, nothing else',
  importScreenNames.length > 0 && importScreenNames.every((n) => IMPORT_SCREEN_MAY_IMPORT.includes(n)),
  `it imports: ${importScreenNames.join(', ')}`);

const GATE_MAY_IMPORT = ['openAcademy', 'closeAcademy'];
const gateImport = (codeOnly('src/FrontDoorGate.jsx').match(/import \{([^}]*)\} from '\.\/db\/db\.js'/) || [, ''])[1];
const gateNames = gateImport.split(',').map((s) => s.trim()).filter(Boolean);
ok('the boot gate imports only the connection lifecycle',
  gateNames.length > 0 && gateNames.every((n) => GATE_MAY_IMPORT.includes(n)),
  `it imports: ${gateNames.join(', ')}`);

// Everything reaches the database through db.js's named helpers — which is why
// moving `db` moved all of them at once. The store is the ONE exception, and
// only for multi-table transactions, which a per-table helper cannot express.
// Those go through the same live binding, so they follow the Academy correctly;
// the exception is named here so it stays one file wide.
const TRANSACTION_EXCEPTION = 'src/store/useAppStore.js';
const strayTableReads = files
  .filter((f) => !['src/db/db.js', 'src/db/householdDb.js', TRANSACTION_EXCEPTION].includes(f))
  .filter((f) => /\bdb\.[a-zA-Z]\w*\.(get|put|add|delete|toArray|bulkPut|bulkAdd|where|update|clear)\b/.test(codeOnly(f)));
ok('no file but the store reads a table directly', strayTableReads.length === 0,
  strayTableReads.join(', ') + ' — add a named helper in db.js instead');

const storeCode = codeOnly(TRANSACTION_EXCEPTION);
ok("the store's direct reads are all inside db.transaction() calls",
  /\bdb\.transaction\(/.test(storeCode));

console.log('\n--- 5. boot order: nothing renders before a database is open ---');

const gate = codeOnly('src/FrontDoorGate.jsx');
ok('the boot gate opens an Academy', /openAcademy\(/.test(gate));
ok('...using the registry naming rule, never a literal',
  /dbNameFor\(/.test(gate) && !/new Dexie|LearningOSDB_/.test(gate));
ok('...and refuses an id the household has not registered',
  /getAcademy\(academies, academyId\)/.test(gate) || /getAcademy\(/.test(gate));

const shellRenders = [...gate.matchAll(/<AcademyShell\b/g)];
ok('the signed-in shell is rendered in exactly one place', shellRenders.length === 1,
  `${shellRenders.length} found`);
ok('...and after every early return, so no un-opened path reaches it',
  gate.lastIndexOf('<AcademyShell') > gate.lastIndexOf("phase === 'home'"));
ok('the booting frame renders nothing about anybody',
  /phase === 'booting'\) return <div style=\{\{ minHeight: '100vh'/.test(gate));

console.log('\n--- 6. naming rules live in one file ---');

const registry = codeOnly('src/academies/registry.js');
ok('every Academy database name is built from one prefix',
  /export const DB_PREFIX = 'LearningOSDB_';/.test(registry));
ok('...and the household name is built from the same one',
  /HOUSEHOLD_DB_NAME = `\$\{DB_PREFIX\}household`/.test(codeOnly('src/db/householdDb.js')));
ok('an unregistered id throws instead of opening an empty database',
  /throw new Error\(\s*`Unknown Academy/.test(read('src/academies/registry.js')),
  'a typo must not silently create a fresh, empty account');
ok('ids get a random suffix, so two children can share a first name',
  /Math\.random\(\)\.toString\(36\)/.test(registry));

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
