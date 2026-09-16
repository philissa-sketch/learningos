/**
 * ---- A FULL BACKUP FILE, FROM A BUTTON ----  (Sept 16, 2026)
 *
 * The daily "Send my work" file is deliberately partial (EXPORT_TABLE_POLICY).
 * It cannot rebuild a computer that has lost everything. The only file that
 * could was the migration export, and that was a console snippet.
 *
 * This is the same file, same format (lib/migrationFile.js), made by a button.
 * It reads EVERY LearningOS database at this address — the household (who
 * signs in, the passcode) and every Academy — read-only, never upgrading.
 *
 * Restoring it uses the path that already exists and is already verified:
 * set up the computer, then Import → "from a file".
 */
import { buildMigrationFile } from './migrationFile.js';
import { DB_PREFIX } from '../academies/registry.js';

function openExisting(name) {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(name); // no version: adopt, never upgrade
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
    req.onupgradeneeded = () => {
      req.transaction.abort();
      reject(new Error(`"${name}" does not exist at this address.`));
    };
  });
}

function readStore(tx, store) {
  return new Promise((resolve, reject) => {
    const req = tx.objectStore(store).getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}

/** Names of this platform's databases at this address. */
export async function listPlatformDatabases() {
  const listed = (await indexedDB.databases?.()) || [];
  return listed.map((d) => d.name).filter((n) => n && n.startsWith(DB_PREFIX)).sort();
}

/** Build the full backup object (does not download). */
export async function buildFullBackup() {
  const names = await listPlatformDatabases();
  if (!names.length) throw new Error('There are no school records at this address to back up.');
  const tables = {};
  for (const name of names) {
    const conn = await openExisting(name);
    try {
      const stores = [...conn.objectStoreNames];
      if (!stores.length) continue;
      const tx = conn.transaction(stores, 'readonly');
      for (const store of stores) tables[`${name}::${store}`] = await readStore(tx, store);
    } finally {
      conn.close();
    }
  }
  return buildMigrationFile(tables, { sourceOrigin: location.origin, sourceDatabase: names.join(', ') });
}

/** Build and download. Returns {bytes, rows, fileName} for the status card. */
export async function downloadFullBackup() {
  const file = await buildFullBackup();
  const text = JSON.stringify(file);
  const day = new Date();
  const stamp = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
  const fileName = `learningos-migration-${stamp}.json`;
  const blob = new Blob([text], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
  const record = { at: day.toISOString(), bytes: blob.size, rows: file.manifest.totalRows, fileName };
  try { localStorage.setItem('learningos.lastFullBackup', JSON.stringify(record)); } catch { /* advisory */ }
  return record;
}

/** When this computer last made a full backup, or null. */
export function lastFullBackup() {
  try { return JSON.parse(localStorage.getItem('learningos.lastFullBackup') || 'null'); } catch { return null; }
}
