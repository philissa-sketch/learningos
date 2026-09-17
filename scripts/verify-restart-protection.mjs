/**
 * verify-restart-protection — Sept 16, 2026. PLATFORM scope.
 * A restart left a family computer showing "not set up". Guards the three
 * defences: persistent-storage request at boot, installable app manifest,
 * and a full-backup file that restores through Import -> from a file.
 */
import 'fake-indexeddb/auto';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
// One call builds the whole file URL — Windows drive letters break string joins.
const mod = (rel) => pathToFileURL(path.join(process.cwd(), rel)).href;
import fs from 'node:fs';
import Dexie from 'dexie';
const root = process.cwd();
globalThis.location = { origin: 'https://test.example' };
const mem = {}; globalThis.localStorage = { getItem:k=>mem[k]??null, setItem:(k,v)=>{mem[k]=v;} };
const { buildFullBackup } = await import(mod('src/lib/fullBackup.js'));
const { validateMigrationFile, likeliestSchoolDatabase, tablesForDatabase } = await import(mod('src/lib/migrationFile.js'));
const h = new Dexie('LearningOSDB_household'); h.version(1).stores({ academies: 'id', session: 'id' });
await h.academies.put({ id: 'kid', name: 'Kid' }); await h.session.put({ id: 'current', academyId: 'kid' });
const a = new Dexie('LearningOSDB_kid'); a.version(3).stores({ attendance: '++id', grades: '++id' });
await a.attendance.bulkAdd([{d:1},{d:2},{d:3}]); await a.grades.add({g:'A'});
const other = new Dexie('SomethingElse'); other.version(1).stores({ x: '++id' }); await other.x.add({});
h.close(); a.close(); other.close();
const f = await buildFullBackup();
const v = validateMigrationFile(JSON.parse(JSON.stringify(f)));
const fails = [];
const ok = (c, m) => { console.log((c?'PASS ':'FAIL ') + m); if(!c) fails.push(m); };
ok(v.ok, 'file validates as a migration file');
ok(f.manifest.totalRows === 6, 'all 6 rows captured: ' + f.manifest.totalRows);
ok(!Object.keys(f.tables).some(k=>k.startsWith('SomethingElse')), 'foreign databases excluded');
ok(likeliestSchoolDatabase(f) === 'LearningOSDB_kid', 'restore picks the school database: ' + likeliestSchoolDatabase(f));
ok(Object.keys(tablesForDatabase(f,'LearningOSDB_kid')).length === 2, 'school tables readable for restore');
const re = new Dexie('LearningOSDB_kid'); await re.open(); ok(re.verno === 3, 'backup did not upgrade the database'); re.close();

const read = (p) => fs.readFileSync(root + '/' + p, 'utf8');
ok(/requestPersistentStorage\(\)/.test(read('src/main.jsx')), 'boot asks the browser for persistent storage');
ok(read('index.html').includes('rel="manifest"'), 'index.html links the app manifest');
ok(fs.existsSync(root + '/public/manifest.webmanifest') && fs.existsSync(root + '/public/icon-192.png') && fs.existsSync(root + '/public/icon-512.png'), 'manifest and both icons exist');
ok(/<StorageSafetyCard\s*\/>/.test(read('src/components/Dashboard/ParentDashboard.jsx')), 'restart-protection card is mounted on the Parent Dashboard');
ok(!/^Go to:.*mission-control-homeschool/m.test(read('READ-ME-FIRST.txt')), 'READ-ME-FIRST does not send anyone to the old address');

// ---- automatic backup to a folder ----
const ab = await import(mod('src/lib/autoBackup.js'));
const names = ['learningos-migration-auto-latest.json', 'notes.txt'];
for (let i = 1; i <= 20; i++) names.push(`learningos-migration-auto-2026-09-${String(i).padStart(2, '0')}.json`);
const pruned = ab.dailyFilesToPrune(names);
ok(pruned.length === 6, 'keeps the newest 14 daily files, prunes 6: ' + pruned.length);
ok(!pruned.includes('learningos-migration-auto-latest.json') && !pruned.includes('notes.txt'), 'never prunes the latest file or unrelated files');
ok(pruned.every((n) => n < 'learningos-migration-auto-2026-09-07.json'), 'prunes only the OLDEST days');
ok(ab.fingerprint('abc') === ab.fingerprint('abc') && ab.fingerprint('abc') !== ab.fingerprint('abd'), 'fingerprint detects a change');
ok(ab.LATEST_NAME.startsWith('learningos-migration-'), 'auto file is named like a restorable migration file');
ok(!read('src/lib/autoBackup.js').includes("SETTINGS_DB = 'LearningOSDB_"), 'folder-choice database is outside the backup prefix');
ok(/<AutoBackupBanner\s*\/>/.test(read('src/FrontDoorGate.jsx')), 'automatic backup runs while a school is open');
ok(/<AutoBackupBanner/.test(read('src/FrontDoorGate.jsx').slice(read('src/FrontDoorGate.jsx').lastIndexOf('return ('))), 'banner mounted in the signed-in branch only');

// ---- end to end with a fake folder (the real API exists only in Chrome/Edge) ----
{
  const files = new Map();
  let perm = 'granted';
  const dir = {
    name: 'LearningOS Backups',
    queryPermission: async () => perm,
    requestPermission: async () => (perm = 'granted'),
    getDirectoryHandle: async () => dir,
    getFileHandle: async (n) => ({ createWritable: async () => { let buf = ''; return { write: async (t) => { buf += t; }, close: async () => { files.set(n, buf); } }; } }),
    removeEntry: async (n) => { files.delete(n); },
    keys: async function* () { yield* [...files.keys()]; }
  };
  // Structured clone of a fake handle is not possible; keep it in memory instead.
  globalThis.window = { showDirectoryPicker: async () => dir };
  for (let i = 1; i <= 16; i++) files.set(`learningos-migration-auto-2026-08-${String(i).padStart(2, '0')}.json`, '{}');
  const ab2 = await import(mod('src/lib/autoBackup.js') + '?e2e');
  ab2.__useMemorySettingsForTest();
  let r;
  try { r = await ab2.chooseBackupFolder(); } catch (e) { r = { ok: false, error: e.message }; }
  {
    ok(r.ok, 'first automatic backup writes: ' + (r.error || ''));
    ok(files.has(ab2.LATEST_NAME), 'latest file written');
    const parsed = JSON.parse(files.get(ab2.LATEST_NAME));
    ok(validateMigrationFile(parsed).ok, 'the automatic file restores through Import -> From a file');
    ok([...files.keys()].filter((n) => /\d{4}-\d{2}-\d{2}\.json$/.test(n)).length === 14, 'daily files capped at 14');
    const again = await ab2.runAutoBackup();
    ok(again.ok && again.skipped, 'unchanged school is not rewritten');
    perm = 'prompt';
    const paused = await ab2.runAutoBackup({ force: true });
    ok(!paused.ok && paused.reason === 'needs-permission', 'no permission -> reports paused, writes nothing');
    ok((await ab2.getAutoBackupState()).state === 'needs-permission', 'state shows paused for the banner');
  }
}
process.exit(fails.length ? 1 : 0);
