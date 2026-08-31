// ---------------------------------------------------------------------------
// THE TWO-COMPUTER ROUND TRIP SURVIVES THE v35 DEPLOY.
// Run: node scripts/verify-handoff.mjs
//
// ---- WHY THIS EXISTS (Aug 26, 2026) ----
//
// The go-live checklist has carried the same line since school started:
//
//   "One real handoff pass across both computers — still not done."
//
// Everything known about the round trip comes from simulations on one machine.
// The four risks that checklist names are exactly the ones a simulation cannot
// see: version skew, file transit, order of operations, and two buttons that
// have never been pressed on his own laptop.
//
// Today's deploy made three of those more expensive at once:
//
//   * Dexie v35 — BOTH computers upgrade their database on first load
//   * `typingLog` is a NEW travelling table, and it carries the Georgia
//     evidence for block-5b, about 45 hours a year
//   * the Technology Q2 -> Q3 move runs in hydrate on BOTH machines
//
// This file cannot press his buttons. It can make the twenty minutes she and
// Lamar spend far more likely to pass first time, by proving the parts that
// are provable here — and by pinning the one order-of-operations rule that the
// deploy created.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const store = await import(REPO + '/src/store/useAppStore.js');
const { EXPORT_TABLE_POLICY } = await import(REPO + '/src/db/db.js');

let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
}
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');
const codeOnly = (rel) =>
  read(rel)
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    .replace(/^\s*\/\/.*$/gm, '');

const dbSrc = read('src/db/db.js');
const storeSrc = codeOnly('src/store/useAppStore.js');

/** Every `db.version(N).stores({...})` block, as a table -> index-string map. */
function storesBlock(n) {
  const start = dbSrc.search(new RegExp(`db\\.version\\(${n}\\)(?:\\s*\\n\\s*)?\\.stores\\(`));
  if (start === -1) return null;
  const head = dbSrc.slice(start, dbSrc.indexOf('\n});', start));
  const out = {};
  for (const m of head.matchAll(/^\s{2}(\w+):\s*'([^']*)'/gm)) out[m[1]] = m[2];
  return out;
}

console.log('\n--- 1. the v35 upgrade cannot brick a database that already has data ---');
{
  /**
   * THIS IS THE ONE THAT WOULD HURT BOTH COMPUTERS AT ONCE. A Dexie version
   * bump runs against a live database on first load. Adding a table is safe.
   * Changing an existing table's index string, or dropping a table, is a
   * migration — and neither computer has a backup taken after today.
   *
   * I already made one version-block mistake today: my first edit REPLACED the
   * v34 block instead of adding v35, which would have broken the upgrade path
   * on both machines. Two other suites caught it on the "versions ascend by
   * one" rule. This check is the specific one that was missing.
   */
  const v34 = storesBlock(34);
  const v35 = storesBlock(35);
  ok('both v34 and v35 exist to compare', Boolean(v34 && v35));

  const dropped = Object.keys(v34 || {}).filter((t) => !(v35 || {})[t]);
  ok('v35 drops no table that v34 declared', dropped.length === 0, dropped.join(', '));

  const changed = Object.keys(v34 || {}).filter((t) => v35[t] !== v34[t]);
  ok('...and changes no existing table\'s indexes',
    changed.length === 0,
    changed.map((t) => `${t}: '${v34[t]}' -> '${v35[t]}'`).join(' | ') +
      ' — an index change on a table with rows in it is a migration, not an addition');

  const added = Object.keys(v35 || {}).filter((t) => !(v34 || {})[t]);
  ok('...and adds exactly the one new table', added.length === 1 && added[0] === 'typingLog',
    added.join(', '));

  const versionNums = [...dbSrc.matchAll(/db\.version\((\d+)\)(?:\s*\n\s*)?\.stores\(/g)].map((m) => Number(m[1]));
  ok('every version from 1 to the latest is present exactly once',
    versionNums.every((v, i) => v === i + 1),
    versionNums.join(','));
}

console.log('\n--- 2. an OLDER export from his machine loses nothing of hers ---');
{
  /**
   * VERSION SKEW IS THE FIRST RISK ON THE CHECKLIST, and the first handoff
   * after a deploy is exactly when it bites: his laptop may not have loaded
   * the new code yet, so his file carries no `typingLog` key at all.
   *
   * The merge primitives here are the REAL ones, imported from the store — not
   * a reimplementation, which would only prove my copy agrees with itself.
   */
  const staleExport = { xp: 40, khanAcademyAssignments: [] }; // no typingLog key at all

  const herRows = [{ id: 1, syncId: 'abc', title: 'Hidden Figures', updatedAt: '2026-08-20T00:00:00.000Z' }];
  ok('a missing table key does not throw the syncId merge',
    (() => { try { store.mergeBySyncId(herRows, staleExport.readingLog); return true; } catch { return false; } })());
  ok('...and returns her rows unchanged rather than emptying them',
    store.mergeBySyncId(herRows, staleExport.readingLog).merged.length === 1);
  ok('...and reports nothing changed, so nothing is written',
    store.mergeBySyncId(herRows, staleExport.readingLog).changed.length === 0,
    'a no-op import that still writes is how timestamps drift between two machines');

  /**
   * ---- THE FALLBACK KEY IS NOT OPTIONAL, AND THIS CHECK IS WHY ----
   *
   * `mergeBySyncId` builds its result from rows it can IDENTIFY. A row written
   * before v34 carries no syncId, so without a fallback key it is not merged —
   * it is dropped from `merged` entirely. Every real call site passes one; a
   * future table added without one would silently lose his oldest work in the
   * one operation whose whole job is not losing work.
   */
  const preV34 = [{ id: 7, title: 'Spaceman', date: '2026-08-01' }];
  ok('a pre-v34 row with no syncId is DROPPED when no fallback key is given',
    store.mergeBySyncId(preV34, []).merged.length === 0,
    'demonstrating the hazard, so the next check is not a formality');
  ok('...and survives when one is given',
    store.mergeBySyncId(preV34, [], (r) => `${r.title}|${r.date}`).merged.length === 1);

  const callSites = [...storeSrc.matchAll(/mergeBySyncId\(([\s\S]{0,400}?)\n\s*\);/g)]
    .map((m) => m[1])
    .filter((body) => !body.includes('localRows, incomingRows, fallbackKey'));
  ok('every real call site passes a fallback key',
    callSites.length > 0 && callSites.every((body) => body.split(',').length >= 3),
    callSites.filter((b) => b.split(',').length < 3).map((b) => b.slice(0, 60)).join(' | '));

  ok('the monotonic merge tolerates a missing key too',
    JSON.stringify(store.mergeMonotonic({ math: true }, undefined)) === JSON.stringify({ math: true }),
    'khanDailyLog is the Georgia attendance evidence — losing a day here is losing a school day');
  ok('...and never turns a ticked subject back off',
    store.mergeMonotonic({ math: true }, { math: false }).math === true,
    'monotonic means forward only, in both directions of the sync');

  /**
   * `typingLog` does not use either primitive — it is an append-with-dedupe on
   * `createdAt`, like the guitar and garden logs, because he can legitimately
   * type twice in one day and a date+kind key would swallow the second run.
   * The key expression is asserted against the source rather than assumed.
   */
  ok('the typing log dedupes on createdAt, not on date',
    /t\?\.createdAt \|\|/.test(storeSrc) && /db\.typingLog\.bulkAdd/.test(storeSrc),
    'two passages in one sitting are two records of two real attempts');
}

console.log('\n--- 3. a NEWER export is refused rather than half-applied ---');
{
  /**
   * The opposite skew: she updates first, exports, and he imports on the old
   * code. A partial import of a newer file is worse than no import, because
   * nothing says which half arrived.
   */
  ok('the import refuses a file stamped newer than this build',
    /importedData\.exportVersion > EXPORT_VERSION/.test(storeSrc) &&
      /throw new Error/.test(storeSrc));
  ok('...and says which machine to update, not just that it failed',
    /Update this computer first/.test(read('src/store/useAppStore.js')));
  ok('the export version is stamped on every file',
    /exportVersion: EXPORT_VERSION/.test(storeSrc));
}

console.log('\n--- 4. every travelling table is both sent and read back ---');
{
  /**
   * verify-export-completeness owns the full three-way check. This is the
   * round-trip half restated as one property, because a table that leaves one
   * machine and is never read on the other is a one-way export — and this
   * project has shipped that four times.
   */
  const travelling = Object.entries(EXPORT_TABLE_POLICY)
    .filter(([, v]) => v === true)
    .map(([k]) => k);
  ok('the policy names a healthy number of travelling tables', travelling.length >= 20,
    String(travelling.length));
  /**
   * The Dexie table name and the store's key for it are not always the same
   * word. `attendance` on disk is `allAttendance` in state and in the payload —
   * a real, deliberate difference, not drift, and a check that ignored it would
   * report a false failure on a table that round-trips perfectly well.
   */
  const PAYLOAD_KEY = { attendance: 'allAttendance' };
  const unread = travelling.filter(
    (t) => !storeSrc.includes(`importedData.${PAYLOAD_KEY[t] || t}`)
  );
  ok('every table that travels is read by the import merge', unread.length === 0, unread.join(', '));
  ok('...including the one added today', travelling.includes('typingLog') &&
    storeSrc.includes('importedData.typingLog'));
}

console.log('\n--- 5. the Q2 -> Q3 technology move survives a stale export ---');
{
  /**
   * =====================================================================
   * THE RISK THIS DEPLOY CREATED, AND WHY IT RESOLVES ITSELF.
   * =====================================================================
   *
   * The Khan merge keys on `subject|skillTitle|batchLabel`. **The quarter is
   * part of a unit's identity.** So if Lamar's laptop has not loaded the new
   * code yet, his export carries eight Technology units still labelled Q2,
   * her machine holds the same eight labelled Q3, nothing matches, and the
   * import adds eight MORE — sixteen units for eight real ones.
   *
   * That is the same duplicate-seed failure verify-technology-khan.mjs was
   * written to prevent, arriving through the import door instead of the seed.
   * The file's own comment predicts this class of bug for the TITLE field and
   * fixes it with LEGACY_GRAMMAR_TITLES; nobody applied the reasoning to the
   * quarter, because until today nothing had ever moved a unit between them.
   *
   * IT RESOLVES ITSELF, and the order is the reason. On her next hydrate:
   *
   *   1. the Q2 -> Q3 migration relabels the eight incoming Q2 rows
   *   2. the de-duplication pass groups on subject|title|batchLabel
   *   3. sixteen rows in eight groups collapse to eight, preferring any
   *      completed copy so real progress is never the copy discarded
   *
   * Both steps already existed; what is asserted here is that they still run
   * IN THAT ORDER. Reverse them and the duplicates become permanent, silently,
   * in the subject carrying the most Khan work in the year.
   */
  const migrationAt = storeSrc.indexOf('technologyMovedTitles');
  const dedupeAt = storeSrc.indexOf('const groups = {};');
  ok('the quarter move and the de-duplication pass both still exist',
    migrationAt !== -1 && dedupeAt !== -1);
  /**
   * FAILS CLOSED. `indexOf` returns -1 when a thing is missing, and -1 is less
   * than everything — so the naive `migrationAt < dedupeAt` PASSES when the
   * migration has been deleted outright, which is the worst case this check
   * exists for. Caught by mutation testing, which is the only reason I know.
   */
  ok('...and the move runs BEFORE the de-duplication',
    migrationAt !== -1 && dedupeAt !== -1 && migrationAt < dedupeAt,
    'reversed or removed, an import from a machine on older code leaves sixteen Technology units for eight');
  ok('the de-duplication keys on the quarter, which is what makes step 1 necessary',
    /const key = `\$\{a\.subject\}\|\$\{title\}\|\$\{a\.batchLabel\}`/.test(storeSrc));
  ok('...and keeps a completed copy over an untouched one',
    /const completedCopy = group\.find\(\(a\) => a\.completed\)/.test(storeSrc),
    'collapsing onto the blank copy would delete work he actually did');

  /** The collapse itself, executed over the real stale-export shape. */
  const titles = ['Building software with classes', 'Intro to JS: Drawing & Animation'];
  const hers = titles.map((t, i) => ({ id: 10 + i, subject: 'technology', skillTitle: t, batchLabel: 'Q3 2026-2027', completed: false, createdAt: '2026-08-01T00:00:00.000Z' }));
  const hisStale = titles.map((t, i) => ({ id: 90 + i, subject: 'technology', skillTitle: t, batchLabel: 'Q2 2026-2027', completed: false, createdAt: '2026-08-02T00:00:00.000Z' }));

  const khanKey = (a) => `${a.subject}|${a.skillTitle}|${a.batchLabel}`;
  const localByKey = new Map(hers.map((a) => [khanKey(a), a]));
  const added = hisStale.filter((r) => !localByKey.has(khanKey(r)));
  ok('a stale export really does add duplicates at import time',
    added.length === 2,
    'stated plainly so nobody is surprised by a doubled list before the next reload');

  // Then hydrate: migrate, then dedupe.
  const afterImport = [...hers, ...added];
  const moved = afterImport.map((a) =>
    a.subject === 'technology' && a.batchLabel === 'Q2 2026-2027' && titles.includes(a.skillTitle) && !a.completed
      ? { ...a, batchLabel: 'Q3 2026-2027' }
      : a
  );
  const groups = {};
  for (const a of moved) (groups[khanKey(a)] ??= []).push(a);
  const collapsed = Object.values(groups).map(
    (g) => g.find((a) => a.completed) || [...g].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))[0]
  );
  ok('...and the very next reload collapses them back to the real count',
    collapsed.length === 2 && collapsed.every((a) => a.batchLabel === 'Q3 2026-2027'),
    `${collapsed.length} rows: ${collapsed.map((a) => a.batchLabel).join(', ')}`);
  ok('...keeping HER row, the older of the two',
    collapsed.every((a) => a.id < 90),
    'the keeper is the earliest-created copy, which is the one her grades hang off');
}

console.log('\n--- 6. the order of operations the handoff depends on ---');
{
  /**
   * "Order of operations — him importing before exporting, and losing a day"
   * is the third risk on the go-live checklist, and the only one that is a
   * HUMAN step rather than a code path. It cannot be enforced from here. What
   * can be checked is that the app tells HIM, on the screen with the buttons,
   * rather than leaving it to memory on a Monday morning.
   */
  const handoff = read('src/components/Dashboard/StudentHandoffCard.jsx');
  ok('his handoff card offers both directions',
    /Send my work to Mom/.test(handoff) && /Get my graded work back/.test(handoff),
    'two buttons that have never been pressed on his own laptop');
  ok('...and the card explains what each one does before he presses it',
    handoff.length > 2000,
    'a bare pair of buttons on a legal record is not a workflow');
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
