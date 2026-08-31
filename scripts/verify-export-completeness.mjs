// ---------------------------------------------------------------------------
// THE EXPORT GUARD. Run with: node scripts/verify-export-completeness.mjs
//
// ---- WHY THIS EXISTS ----
//
// One bug has now shipped in this project four separate times, wearing a
// different table's name each time:
//
//   offlineMinutes      — the attendance field rebuilt object-by-object on
//                         import, so anything omitted was destroyed
//   unlockedCosmetics   — coins left his balance on both machines, and the
//                         thing he bought existed on only one
//   selfExplanations    — every written answer he gave, unreadable by the one
//                         person the feature exists for
//   rewardRedemptions   — Credits spent, request never delivered, approval
//                         impossible; "waiting for a parent" forever
//
// Every one is the same failure: `exportProgressData` is a hand-maintained
// list of fields, a new table gets added to the schema, and nobody remembers
// to add it to the list. Nothing failed. Nothing warned. The data simply did
// not travel, and it was found weeks later by a human reading code.
//
// This guard makes that impossible to ship again. It cross-checks three
// artefacts that must agree:
//
//   1. the LATEST db.version(n).stores({...}) block  — what tables exist
//   2. EXPORT_TABLE_POLICY in src/db/db.js           — what should travel
//   3. the payload exportProgressData actually builds — what does travel
//
// Adding a table to the schema without deciding about it fails here, in a
// second, with the table's name in the message.
//
// ---- ASSERT THE PROPERTY, NOT THE PUNCTUATION ----
//
// Following the rule the gardening guard writes down: this reads the real
// EXPORT_TABLE_POLICY object (imported, not regexed) and brace-matches the
// schema and the payload rather than pattern-matching prose. The one thing it
// cannot do is execute exportProgressData — that needs IndexedDB and a
// browser — so the payload keys are read from the source of the object
// literal, which is checked for shape as it goes.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { EXPORT_TABLE_POLICY } from '../src/db/db.js';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let failures = 0;
const ok = (cond, msg, detail) => {
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${msg}`);
  if (!cond) { failures++; if (detail) console.log('      ' + detail); }
};

const dbSrc = fs.readFileSync(path.join(REPO, 'src/db/db.js'), 'utf8');
const storeSrc = fs.readFileSync(path.join(REPO, 'src/store/useAppStore.js'), 'utf8');

/** The contents of a brace-delimited block starting at the first `{` after `from`. */
function braceBlock(src, from) {
  const open = src.indexOf('{', from);
  if (open === -1) return '';
  let depth = 0;
  for (let i = open; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') {
      depth--;
      if (depth === 0) return src.slice(open + 1, i);
    }
  }
  return '';
}

// ===========================================================================
console.log('\n--- 1. the schema: which tables exist ---');
// ===========================================================================
const versionNums = [...dbSrc.matchAll(/db\.version\((\d+)\)(?:\s*\n\s*)?\.stores\(/g)].map((m) => Number(m[1]));
ok(versionNums.length > 0, 'db.js declares at least one Dexie version');
const latest = Math.max(...versionNums);
const latestIdx = dbSrc.search(new RegExp(`db\\.version\\(${latest}\\)(?:\\s*\\n\\s*)?\\.stores\\(`));
const schemaBlock = braceBlock(dbSrc, dbSrc.indexOf('.stores(', latestIdx));
const schemaTables = [...schemaBlock.matchAll(/^\s{2,6}(\w+)\s*:/gm)].map((m) => m[1]);
ok(schemaTables.length > 10, `v${latest} declares ${schemaTables.length} tables`);
ok(new Set(schemaTables).size === schemaTables.length, 'no table is declared twice in the latest version');

// ===========================================================================
console.log('\n--- 2. the policy: every table has a decision ---');
// ===========================================================================
const policyTables = Object.keys(EXPORT_TABLE_POLICY);
const undecided = schemaTables.filter((t) => !Object.prototype.hasOwnProperty.call(EXPORT_TABLE_POLICY, t));
ok(
  undecided.length === 0,
  'every table in the latest schema appears in EXPORT_TABLE_POLICY',
  undecided.length
    ? `UNDECIDED: ${undecided.join(', ')}\n      Add each to EXPORT_TABLE_POLICY in src/db/db.js — either the value true (it\n      travels in the progress export) or a string saying why it deliberately does not.`
    : ''
);

const ghosts = policyTables.filter((t) => !schemaTables.includes(t));
ok(
  ghosts.length === 0,
  'EXPORT_TABLE_POLICY lists no table that the schema no longer has',
  ghosts.join(', ')
);

const badValues = policyTables.filter((t) => {
  const v = EXPORT_TABLE_POLICY[t];
  return v !== true && !(typeof v === 'string' && v.trim().length >= 20);
});
ok(
  badValues.length === 0,
  'every exclusion carries a real written reason (not `false`, not a stub)',
  badValues.length ? `${badValues.join(', ')} — use \`true\`, or a sentence explaining the exclusion.` : ''
);

const shouldTravel = policyTables.filter((t) => EXPORT_TABLE_POLICY[t] === true);
const deliberatelyExcluded = policyTables.filter((t) => typeof EXPORT_TABLE_POLICY[t] === 'string');
console.log(`      ${shouldTravel.length} tables travel, ${deliberatelyExcluded.length} deliberately do not.`);

// ===========================================================================
console.log('\n--- 3. the payload: what exportProgressData actually builds ---');
// ===========================================================================
const payloadIdx = storeSrc.indexOf('const exportPayload = {');
ok(payloadIdx !== -1, 'exportProgressData builds a literal named `exportPayload`');
const payloadBlock = braceBlock(storeSrc, payloadIdx);
const payloadKeys = [...payloadBlock.matchAll(/^\s{6}(\w+)\s*:/gm)].map((m) => m[1]);
ok(payloadKeys.length > 20, `payload declares ${payloadKeys.length} top-level keys`);
ok(new Set(payloadKeys).size === payloadKeys.length, 'no payload key is declared twice');

/**
 * Two tables travel under a different key name than the table name, and both
 * are deliberate rather than sloppy. Keeping the exceptions HERE, in a list of
 * two, is what stops the guard being loosened into uselessness the next time
 * a name does not line up.
 */
const PAYLOAD_KEY_FOR_TABLE = {
  // The Dexie table is `attendance`; the payload has always called it
  // `allAttendance`, matching the store slice the merge reads.
  attendance: 'allAttendance',
  // The Dexie table is `studyCycle` (singular, keyed by `key`); the payload
  // and the store slice are both `studyCycles`.
  studyCycle: 'studyCycles'
};

const missingFromPayload = shouldTravel.filter(
  (t) => !payloadKeys.includes(PAYLOAD_KEY_FOR_TABLE[t] || t)
);
ok(
  missingFromPayload.length === 0,
  'every table the policy says should travel IS in the export payload',
  missingFromPayload.length
    ? `NOT EXPORTED: ${missingFromPayload.join(', ')}\n      This is the bug that has shipped four times. Add each to exportPayload in\n      exportProgressData (and give it a merge rule in importProgressData), or\n      change its EXPORT_TABLE_POLICY entry to a written exclusion reason.`
    : ''
);

const leaked = deliberatelyExcluded.filter((t) => payloadKeys.includes(PAYLOAD_KEY_FOR_TABLE[t] || t));
ok(
  leaked.length === 0,
  'nothing the policy excludes has quietly appeared in the payload',
  leaked.length
    ? `EXPORTED BUT SHOULD NOT BE: ${leaked.join(', ')} — these are the parent's own\n      records, or the dashboard passcode. Check EXPORT_TABLE_POLICY.`
    : ''
);

// ===========================================================================
console.log('\n--- 4. the merge: an exported table is also imported ---');
// ===========================================================================
/**
 * Exporting a table and then ignoring it on import is half a fix, and it is
 * how `assignments` would have looked if only step one had been done. Every
 * travelling table must be READ from `importedData` somewhere in the merge.
 */
const importIdx = storeSrc.indexOf('async importProgressData(');
ok(importIdx !== -1, 'importProgressData exists');
const importBody = storeSrc.slice(importIdx, storeSrc.indexOf('\n  },', storeSrc.indexOf('return summary;', importIdx)));
const notMerged = shouldTravel.filter((t) => {
  const key = PAYLOAD_KEY_FOR_TABLE[t] || t;
  return !importBody.includes(`importedData.${key}`);
});
ok(
  notMerged.length === 0,
  'every exported table is read back by the import merge',
  notMerged.length
    ? `EXPORTED BUT NEVER MERGED: ${notMerged.join(', ')}\n      A one-way export is half a round trip — the data leaves one machine and\n      is dropped on the floor by the other.`
    : ''
);

// ===========================================================================
console.log('\n--- 5. cross-machine identity on the tables that need it ---');
// ===========================================================================
/**
 * Dexie's `++id` is a per-database counter. For any table where BOTH machines
 * can create rows, her row #12 and his row #12 are different things wearing
 * the same key, and a merge keyed on it destroys one of them. Those tables
 * carry a generated `syncId` instead — the same reasoning that made the
 * ledger's primary key a UUID.
 */
const NEEDS_SYNC_ID = ['rewards', 'rewardRedemptions', 'fieldTrips', 'assignments', 'selfExplanations'];
for (const table of NEEDS_SYNC_ID) {
  const decl = schemaBlock.match(new RegExp(`^\\s{2,6}${table}\\s*:\\s*'([^']*)'`, 'm'));
  ok(Boolean(decl), `${table} is declared in the latest schema`);
  if (decl) {
    ok(decl[1].includes('syncId'), `${table} indexes syncId (cross-machine identity)`, decl[1]);
  }
}
ok(
  /export function newSyncId\(/.test(dbSrc),
  'db.js exports newSyncId'
);
ok(
  (storeSrc.match(/syncId: newSyncId\(\)/g) || []).length >= 6,
  'the store stamps a syncId at every creation site that needs one',
  `found ${(storeSrc.match(/syncId: newSyncId\(\)/g) || []).length}`
);

// ===========================================================================
console.log('\n--- 6. deletions can travel (tombstones, not holes) ---');
// ===========================================================================
/**
 * A hard delete cannot be represented in a merge: the row is simply absent,
 * which is indistinguishable from "the other machine has not seen it yet", so
 * the next import puts it straight back. Deleting a reward has to STICK.
 */
for (const fn of ['deleteRewardRecord', 'deleteFieldTripRecord', 'deleteAssignment']) {
  const idx = dbSrc.indexOf(`export async function ${fn}(`);
  ok(idx !== -1, `${fn} exists`);
  if (idx === -1) continue;
  const body = dbSrc.slice(idx, dbSrc.indexOf('\n}', idx));
  ok(body.includes('deletedAt'), `${fn} writes a deletedAt tombstone`);
  ok(!/\.delete\(/.test(body), `${fn} does not hard-delete the row`, body.trim().split('\n')[1] || '');
}

// ===========================================================================
console.log('\n--- 7. the export version was bumped with the payload ---');
// ===========================================================================
const versionMatch = storeSrc.match(/const EXPORT_VERSION = (\d+);/);
ok(Boolean(versionMatch), 'EXPORT_VERSION is declared');
ok(Number(versionMatch?.[1]) >= 3, `EXPORT_VERSION is at or past 3 (found ${versionMatch?.[1]})`);

// ===========================================================================
console.log('\n--- 8. the merge, actually run ---');
// ===========================================================================
/**
 * Sections 1-7 read source text. This section runs the real merge functions
 * over real payloads, because a static check can confirm a table is listed and
 * still miss a merge rule that quietly drops a grade.
 *
 * Every scenario below is one that actually happened, or would have.
 */
const { mergeBySyncId, mergeMonotonic } = await import('../src/store/useAppStore.js');

// (a) A row that exists on only one machine survives, and does not double.
{
  const hers = [{ id: 1, syncId: 'a', name: 'Museum day', updatedAt: '2026-08-01' }];
  const his = [{ id: 7, syncId: 'b', name: 'Ice cream', updatedAt: '2026-08-02' }];
  const { merged } = mergeBySyncId(hers, his);
  ok(merged.length === 2, 'a row from each machine survives the merge');
  const twice = mergeBySyncId(merged, his).merged;
  ok(twice.length === 2, 'importing the same file twice adds nothing (idempotent)');
}

// (b) The later edit wins, and it keeps THIS machine's primary key.
{
  const local = [{ id: 3, syncId: 'a', cost: 250, updatedAt: '2026-08-01T00:00:00Z' }];
  const incoming = [{ id: 99, syncId: 'a', cost: 1500, updatedAt: '2026-08-09T00:00:00Z' }];
  const { merged } = mergeBySyncId(local, incoming);
  ok(merged.length === 1 && merged[0].cost === 1500, 'the later edit wins');
  ok(merged[0].id === 3, "the merged row keeps THIS machine's Dexie id, not the other one's");
}

// (c) A tie leaves the local row standing — never overwrite on a coin toss.
{
  const local = [{ id: 1, syncId: 'a', grade: 'A', updatedAt: '2026-08-05T00:00:00Z' }];
  const incoming = [{ id: 2, syncId: 'a', grade: 'C', updatedAt: '2026-08-05T00:00:00Z' }];
  ok(mergeBySyncId(local, incoming).merged[0].grade === 'A', 'a timestamp tie leaves the local row alone');
}

// (d) THE ONE THAT MATTERS MOST: a deletion sticks instead of being
// resurrected by the other machine's older copy of the same row.
{
  const herDeleted = [{ id: 1, syncId: 'a', name: 'Trip for ice cream', deletedAt: '2026-08-09T10:00:00Z', updatedAt: '2026-08-09T10:00:00Z' }];
  const hisStale = [{ id: 4, syncId: 'a', name: 'Trip for ice cream', updatedAt: '2026-08-02T00:00:00Z' }];
  const backOnHers = mergeBySyncId(herDeleted, hisStale).merged;
  ok(backOnHers[0].deletedAt, 'his stale copy does not resurrect a reward she deleted');
  const overOnHis = mergeBySyncId(hisStale, herDeleted).merged;
  ok(overOnHis[0].deletedAt, 'and the deletion travels TO his machine');
}

// (e) Pre-v31 rows with no syncId are paired by their natural key rather
// than being duplicated on the first merge after the upgrade.
{
  const local = [{ id: 1, name: 'Movie night', cost: 40 }];
  const incoming = [{ id: 5, name: 'Movie night', cost: 40 }];
  const { merged } = mergeBySyncId(local, incoming, (r) => (r?.name ? `name:${r.name}` : null));
  ok(merged.length === 1, 'rows written before syncId existed pair up instead of doubling');
}

// (f) Rows with no identity at all are skipped, not merged blindly.
{
  const { merged } = mergeBySyncId([], [{ id: 1 }], () => null);
  ok(merged.length === 0, 'an unidentifiable row is not merged (it cannot be, safely)');
}

// (g) Monotonic merges never go backwards. A personal best does not get
// worse, and a day he worked does not become a day he did not.
{
  ok(mergeMonotonic({ bestWpm: 41, attempts: 9 }, { bestWpm: 38, attempts: 12 }).bestWpm === 41,
    'a typing personal best never regresses');
  ok(mergeMonotonic({ bestWpm: 41, attempts: 9 }, { bestWpm: 38, attempts: 12 }).attempts === 12,
    'attempts take the higher count');
  const khan = mergeMonotonic({ math: true, science: false }, { math: false, science: true });
  ok(khan.math === true && khan.science === true, 'Khan day check-offs OR together, never un-tick');
  ok(mergeMonotonic(undefined, { a: 1 }).a === 1, 'a day only the other machine has is taken whole');
}

// ===========================================================================
// ---------------------------------------------------------------------------
// "DID THE IMPORT ACTUALLY RUN?" — ANSWERABLE ON THE SCREEN. (Aug 11, 2026.)
//
// The parent: "I uploaded this and do not see anything new on my side."
//
// Her database said the import had never run: no lastImportAt, XP untouched,
// none of his rows present. His file was still just a file on her disk.
//
// Nothing on the sync screen could have told her that. The import result is a
// single line that appears after the click and is gone on the next render, so
// five minutes later "did it work?" was unanswerable — and the true answer,
// NEVER, looked exactly like the answer "an hour ago". Both timestamps were
// already being stored on every export and every import. Neither was shown.
// ---------------------------------------------------------------------------
{
  const parent = fs.readFileSync(path.join(REPO, 'src/components/Dashboard/ParentDashboard.jsx'), 'utf8');
  const store = fs.readFileSync(path.join(REPO, 'src/store/useAppStore.js'), 'utf8');

  ok(
    /useAppStore\(\(s\) => s\.lastImportAt\)/.test(parent) && /useAppStore\(\(s\) => s\.lastExportAt\)/.test(parent),'the sync screen reads both timestamps');
  ok( /Last import from his computer/.test(parent) && /Last export from this computer/.test(parent),'...and shows them');
  ok(
    /his work has not arrived here yet/.test(parent),'"never imported" is stated in words, not left blank',
    'a blank space reads as "fine" — this is the state she was actually in');
  ok( /border-signal-amber\/40[\s\S]{0,80}text-signal-amber/.test(parent),'...and it is flagged, not quiet');
  ok( /function formatSyncStamp\(iso\)/.test(parent),'the stamps are human-readable, not ISO');

  ok( /await saveMeta\(\{ lastImportAt, lastImportedExportAt \}\)/.test(store),'the store still writes lastImportAt on every import');
    ok(/await saveMeta\(\{ lastExportAt, lastExportBytes, lastExportRowCount \}\)/.test(store), 'the store still writes lastExportAt on every export');
  ok( /lastImportAt: meta\?\.lastImportAt \?\? null/.test(store) && /lastExportAt: meta\?\.lastExportAt \?\? null/.test(store),'both survive a reload');
}


console.log('\n--- an import says how current the file was, not just when you clicked ---');
{
  /**
   * ---- THE EVENING THIS COST (Aug 20, 2026) ----
   *
   * She was certain the app had lost two days of his work: Khan ticks on the
   * 18th and 19th, Tuesday and Wednesday spelling, his typing speed tests. He
   * insisted he had done them. He had.
   *
   * Her Downloads folder held three files with nearly the same name -
   * ...2026-08-17.json, ...2026-08-17 (1).json and ...2026-08-19.json. She
   * picked an August 17 one. Every table in her database matched that file
   * exactly: the import had worked perfectly and had nothing to add.
   *
   * The app knew the file's own export date and the date of the last import,
   * and never showed them together. "Imported" with an empty list of changes
   * reads exactly like a quiet success.
   */
  const parent = fs.readFileSync(path.join(REPO, 'src/components/Dashboard/ParentDashboard.jsx'), 'utf8');
  const store = fs.readFileSync(path.join(REPO, 'src/store/useAppStore.js'), 'utf8');
  const storeCode = store.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

  ok(/lastImportedExportAt =\s*\n?\s*typeof importedData\.exportedAt === 'string'/.test(storeCode),
    "the file's own export stamp is recorded, not just the import time");
  ok(/lastImportedExportAt: meta\?\.lastImportedExportAt \?\? null/.test(storeCode),
    '...and survives a reload');
  ok(/: get\(\)\.lastImportedExportAt;/.test(storeCode),
    '...falling back rather than blanking on a file with no stamp');
  ok(/fileExportedAt <= lastImportedExportAt/.test(parent),
    'choosing a file that is not newer asks first');
  ok(/This file was exported/.test(parent) && /You already imported one from/.test(parent),
    '...naming BOTH dates, so the answer is obvious');
  ok(/it just will not add anything new/.test(parent),
    '...and saying plainly that importing it is safe, just pointless');
  ok(/if \(!proceed\) \{ setImporting\(false\); return; \}/.test(parent),
    '...and cancelling actually stops the import');
  ok(/that file was his work as of/.test(parent),
    'the sync card shows how current the last imported file was');
}

// ===========================================================================
console.log('\n--- 9. the three tables that hard-deleted while travelling ---');
// ===========================================================================
/**
 * Audit item N-2, fixed on Dexie v34 (Aug 25, 2026).
 *
 * `readingLog`, `portfolio` and `peMeals` all travel in the export and all
 * three deleted rows outright. That produced two bugs from one omission:
 *
 *   1. A deletion could not travel. A hard-deleted row is an ABSENCE, and the
 *      other computer cannot tell an absence from "never had it" — so his next
 *      export put the row she deleted straight back.
 *   2. An EDIT could not travel either, which is the quieter half. The merge
 *      skipped whole any row whose natural key it already had, so a corrected
 *      title or a Drive link added later never crossed at all, and nothing
 *      about that looked like a failure.
 *
 * These run the REAL merge over real rows rather than pattern-matching the
 * source of it — the same standard the rest of this file holds.
 */
{
  const { mergeBySyncId } = await import('../src/store/useAppStore.js');
  const dbSource = fs.readFileSync(path.join(REPO, 'src/db/db.js'), 'utf8');
  const dbCode = dbSource.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
  const storeSrc = fs.readFileSync(path.join(REPO, 'src/store/useAppStore.js'), 'utf8');
  // Absence is asserted against code with comments stripped — the notes on
  // these fixes quote the old lines on purpose.
  const storeCodeOnly = storeSrc.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

  // ---- the delete helpers must tombstone, not remove ----
  for (const fn of ['deleteReadingLogEntry', 'deletePortfolioEntry', 'deletePEMealRecord']) {
    const body = (dbCode.match(new RegExp(`export async function ${fn}\\(id\\) \\{([\\s\\S]*?)\\n\\}`)) || [, ''])[1];
    ok(/deletedAt/.test(body) && !/\.delete\(id\)/.test(body),
      `${fn} writes a tombstone instead of removing the row`,
      'a hard delete cannot travel — the other machine cannot tell it from "never had it"');
  }

  // ---- writers must stamp updatedAt, or last-write-wins cannot decide ----
  for (const fn of ['saveReadingLogEntry', 'savePortfolioEntry', 'addPEMealRecord', 'updatePortfolioEntryFields']) {
    const body = (dbCode.match(new RegExp(`export async function ${fn}\\([^)]*\\) \\{([\\s\\S]*?)\\n\\}`)) || [, ''])[1];
    ok(/updatedAt/.test(body) && /syncId/.test(body),
      `${fn} stamps syncId and updatedAt`,
      'a merge with no timestamp on one side falls through to "local stands" forever, and the edit still never travels');
  }

  // ---- and the store must actually merge rather than append ----
  ok(/mergeBySyncId\(allReadingRows, importedData\.readingLog/.test(storeSrc),
    'the reading log is merged, not appended');
  ok(/mergeBySyncId\(allPortfolioRows, importedData\.portfolio/.test(storeSrc),
    'the portfolio is merged, not appended');
  ok(/mergeBySyncId\(dbPeMeals, importedData\.peMeals/.test(storeSrc),
    'the meal log is merged, not appended');
  ok(!/existingReadingKeys\.has\(readingKey\(row\)\)\) continue/.test(storeCodeOnly),
    '...and the skip-whole-row append is gone',
    'that one line is why an edit could never cross between the two computers');

  /**
   * Merged against the FULL Dexie table, never `state`. State has tombstones
   * filtered out of it, so merging against state would make a row she deleted
   * look absent, re-add it from his copy, and let the resurrection bug survive
   * its own fix. This is the shape of the mistake made on Aug 23 with
   * khanDailyLog, where the baseline was built from the wrong thing.
   */
  ok(/loadAllReadingLog\(\),\s*\n\s*loadAllPortfolio\(\)/.test(storeSrc),
    '...against the full Dexie tables, not the tombstone-filtered state');

  // ---- behaviour: a deletion survives an import that still has the row ----
  const hers = [{ id: 1, syncId: 'r1', title: 'Hatchet', date: '2026-08-10', deletedAt: '2026-08-20T10:00:00Z', updatedAt: '2026-08-20T10:00:00Z' }];
  const his = [{ id: 7, syncId: 'r1', title: 'Hatchet', date: '2026-08-10', updatedAt: '2026-08-12T10:00:00Z' }];
  const afterDelete = mergeBySyncId(hers, his, (r) => (r?.title ? `${r.title}|${r.date}` : null));
  ok(afterDelete.merged.length === 1 && Boolean(afterDelete.merged[0].deletedAt),
    'a row she deleted stays deleted when his older copy arrives',
    'this is the resurrection bug, run as an actual merge');

  // ---- behaviour: an edit crosses ----
  const mineOld = [{ id: 1, syncId: 'p1', title: 'Bottle Rocket', dateCompleted: '2026-08-10', driveUrl: '', updatedAt: '2026-08-10T10:00:00Z' }];
  const theirsNew = [{ id: 4, syncId: 'p1', title: 'Bottle Rocket', dateCompleted: '2026-08-10', driveUrl: 'https://drive/x', updatedAt: '2026-08-22T10:00:00Z' }];
  const afterEdit = mergeBySyncId(mineOld, theirsNew, (p) => (p?.title ? `${p.title}|${p.dateCompleted}` : null));
  ok(afterEdit.merged.length === 1 && afterEdit.merged[0].driveUrl === 'https://drive/x' && afterEdit.merged[0].id === 1,
    'an edit made on the other computer arrives, keeping this machine\'s primary key',
    'the half of this bug that never looked like a failure');

  // ---- behaviour: pre-v34 rows pair up on the natural key rather than doubling ----
  const legacyLocal = [{ id: 1, title: 'Hatchet', date: '2026-08-10', amount: 2 }];
  const legacyIncoming = [{ id: 9, title: 'Hatchet', date: '2026-08-10', amount: 3, updatedAt: '2026-08-22T10:00:00Z' }];
  const paired = mergeBySyncId(legacyLocal, legacyIncoming, (r) => (r?.title ? `${r.title}|${r.date}` : null));
  ok(paired.merged.length === 1,
    'rows written before v34, which carry no syncId, pair up instead of doubling');
}

const label = failures === 0 ? 'ALL CHECKS PASSED' : `${failures} CHECK(S) FAILED`;
console.log(`\n${label}\n`);
process.exit(failures === 0 ? 0 : 1);
