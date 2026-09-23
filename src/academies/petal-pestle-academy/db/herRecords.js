// ---------------------------------------------------------------------------
// WHERE THIS SCHOOL'S OWN RECORDS GO. (Sept 23, 2026)
//
// The parent chose option A: this school keeps its records in a database of
// its own, not in the platform's tables, so the two schools share nothing. She
// then allowed the one change it needed outside this folder — the platform's
// database guard (scripts/verify-academy-db.mjs) now accepts a school's own
// database, under rules that file checks:
//
//   · it is opened only from this folder's db/ directory, and nothing outside
//     this folder imports it;
//   · its name is built by ownDbName() (db/db.js) from OWN_DB_PREFIX and this school's
//     id, so it can never be a platform database (those all start
//     LearningOSDB_) and never another school's;
//   · it is opened on first use, never at module load.
//
// ---- ⚠️ THE PLATFORM'S BACKUP DOES NOT COVER THIS ----
//
// The platform's automatic backup and "send my work to your grown-up" copy the
// platform's database, not this one. Her own Backup & settings screen has to
// come across before she relies on anything saved here. That is the cost of
// keeping the schools separate, and the parent accepted it.
//
// ---- ROW SHAPES ----
//
// Every row is field-for-field the standalone Petal & Pestle app's (schema
// v12), so bringing her records across later is a copy, not a translation.
// ---------------------------------------------------------------------------

// ---- ONE CONNECTION FOR THE WHOLE SCHOOL (Sept 23, 2026) ----
//
// This file used to open the database itself. Her own app's helpers now live
// in db/db.js, which owns the only connection; this file uses it, so there is
// never a second connection declaring a different shape of the same database.
import { HER_TABLES, openOwn } from './db.js';

export { HER_TABLES };

/** True once results survive a reload. The screen tells her when it is false. */
export const RECORDS_ARE_SAVED = true;

/** The backup format this school reads and writes: the standalone app's. */
export const BACKUP_APP = 'Petal & Pestle Academy';
export const BACKUP_VERSION = 12;

/** The field each table is keyed by — the first entry of its schema line. */
export function keyFieldOf(table) {
  return HER_TABLES[table].split(',')[0].trim().replace(/^\+\+/, '');
}


/** Every reading-check sitting recorded so far. */
export async function loadReadingAttempts() {
  const rows = await openOwn().attempts.toArray();
  return rows.filter((a) => a && a.kind === 'reading-check');
}

/** Record one sitting. `add`, not `put`: an existing row is never overwritten. */
export async function saveReadingAttempt(row) {
  await openOwn().attempts.add(row);
  return row;
}

/** A new id for a row, the same way the standalone app makes one. */
export function newRecordId() {
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  } catch {
    /* fall through */
  }
  return `e-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/** Today as YYYY-MM-DD in her local time, never UTC. */
export function dayKeyOf(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// ---------------------------------------------------------------------------
// BACKUP AND "BRING HER WORK HERE" (Sept 23, 2026)
//
// The platform's backup does not cover this database (see the top of this
// file), so this school carries its own, in the standalone app's own file
// format — a backup made here opens in the standalone app and the other way
// round.
//
// ---- ⚠️ THE IMPORT ONLY EVER ADDS ----
//
// Her data is real. A row whose key is already here is left exactly as it is
// and counted as "already here"; nothing is overwritten and nothing is
// removed. The whole import runs in one transaction and then counts every
// table: if any table does not end at (before + new), the transaction is
// thrown away and nothing is written. Loading the same file twice adds nothing
// the second time.
//
// This is deliberately simpler than the standalone app's two-computer merge,
// which also reconciles EDITS to the same row. That merge is for trading files
// every day; this is for bringing her record across. If files ever need to be
// traded daily, the merge comes across then.
// ---------------------------------------------------------------------------

/** Rows per table, right now. */
export async function countHerRecords() {
  const db = openOwn();
  const out = {};
  for (const table of Object.keys(HER_TABLES)) out[table] = await db.table(table).count();
  return out;
}

/** Her whole record, as a backup file's contents. The passcode never leaves. */
export async function exportHerRecords() {
  const db = openOwn();
  const data = { app: BACKUP_APP, version: BACKUP_VERSION, exportedAt: new Date().toISOString() };
  for (const table of Object.keys(HER_TABLES)) {
    const rows = await db.table(table).toArray();
    data[table] = table === 'meta' ? rows.filter((m) => m.key !== 'parentPasscode') : rows;
  }
  return data;
}

const NOT_TABLES = new Set(['app', 'version', 'exportedAt']);

/**
 * What a file would do, before anything is written.
 * Throws, with a sentence a grown-up can act on, for a file this cannot read
 * safely: not a Petal & Pestle backup, made by a newer version, or carrying a
 * kind of record this school has no table for (which would otherwise be
 * dropped without a word).
 */
export async function previewBackup(data) {
  if (!data || typeof data !== 'object' || data.app !== BACKUP_APP) {
    throw new Error('That file is not a Petal & Pestle backup.');
  }
  const fileVersion = Number(data.version) || 0;
  if (fileVersion > BACKUP_VERSION) {
    throw new Error(
      `That backup was made by a newer version of Petal & Pestle (file v${fileVersion}, this school reads up to v${BACKUP_VERSION}). ` +
        'Loading it here could leave out records this version does not know. Nothing was loaded.'
    );
  }
  const unknown = Object.keys(data).filter((k) => !NOT_TABLES.has(k) && !HER_TABLES[k]);
  if (unknown.length) {
    throw new Error(`That backup holds records this school has nowhere to keep (${unknown.join(', ')}). Nothing was loaded.`);
  }

  const db = openOwn();
  const rows = [];
  for (const table of Object.keys(HER_TABLES)) {
    const incoming = Array.isArray(data[table]) ? data[table] : [];
    const key = keyFieldOf(table);
    const usable = incoming.filter((r) => r && r[key] !== undefined && r[key] !== null && !(table === 'meta' && r.key === 'parentPasscode'));
    const keys = [...new Set(usable.map((r) => r[key]))];
    const existing = keys.length ? await db.table(table).bulkGet(keys) : [];
    const already = new Set(keys.filter((k, i) => existing[i] !== undefined));
    const fresh = [];
    const seen = new Set();
    for (const r of usable) {
      if (already.has(r[key]) || seen.has(r[key])) continue;
      seen.add(r[key]);
      fresh.push(r);
    }
    rows.push({
      table,
      inFile: incoming.length,
      alreadyHere: usable.filter((r) => already.has(r[key])).length,
      duplicatesInFile: usable.length - fresh.length - usable.filter((r) => already.has(r[key])).length,
      unreadable: incoming.length - usable.length,
      toAdd: fresh.length,
      fresh
    });
  }
  return {
    fileVersion,
    exportedAt: data.exportedAt || null,
    rows,
    totalToAdd: rows.reduce((n, r) => n + r.toAdd, 0),
    totalInFile: rows.reduce((n, r) => n + r.inFile, 0)
  };
}

/** Add what previewBackup found new. Returns before/after counts per table. */
export async function importBackup(data) {
  const preview = await previewBackup(data);
  const db = openOwn();
  const before = await countHerRecords();
  await db.transaction('rw', Object.keys(HER_TABLES).map((t) => db.table(t)), async () => {
    for (const row of preview.rows) {
      if (row.fresh.length) await db.table(row.table).bulkAdd(row.fresh);
    }
    for (const row of preview.rows) {
      const now = await db.table(row.table).count();
      if (now !== before[row.table] + row.toAdd) {
        throw new Error(`${row.table}: expected ${before[row.table] + row.toAdd} rows after loading, found ${now}. Nothing was loaded.`);
      }
    }
  });
  const after = await countHerRecords();
  return {
    rows: preview.rows.map((r) => ({
      table: r.table,
      inFile: r.inFile,
      before: before[r.table],
      added: r.toAdd,
      after: after[r.table],
      alreadyHere: r.alreadyHere,
      duplicatesInFile: r.duplicatesInFile,
      unreadable: r.unreadable
    })),
    totalAdded: preview.totalToAdd
  };
}
