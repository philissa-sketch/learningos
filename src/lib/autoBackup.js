/**
 * ---- AUTOMATIC BACKUP TO A REAL FOLDER ----  (Sept 16, 2026)
 *
 * Clearing a browser's cookies and site data erases every record this app
 * keeps. Files in a folder on the computer are not touched by that. So while
 * the school is open, this writes a FULL backup (lib/fullBackup.js — the
 * migration format, restorable with Import → From a file) into a folder the
 * family chose once:
 *
 *   learningos-migration-auto-latest.json      — always the newest
 *   learningos-migration-auto-YYYY-MM-DD.json  — one per day, newest 14 kept
 *
 * WHEN: shortly after the school opens, every 5 minutes while it is open, and
 * whenever the window is hidden or closed. Nothing is written if nothing
 * changed since the last write.
 *
 * WHERE THE FOLDER CHOICE LIVES: in its own small database, deliberately NOT
 * named with DB_PREFIX, so it is never swept into a backup (a folder handle is
 * not something a JSON file can carry anyway).
 *
 * AFTER A BROWSER CLEAR the folder choice is gone with everything else, but
 * the files are not. Restore from the latest file, then choose the same
 * folder again and backups carry on.
 *
 * Chrome and Edge only (File System Access API). Other browsers report
 * `supported: false` and the Parent Dashboard says so.
 */
import { buildFullBackup } from './fullBackup.js';

export const AUTO_PREFIX = 'learningos-migration-auto-';
export const LATEST_NAME = `${AUTO_PREFIX}latest.json`;
export const KEEP_DAILY = 14;
export const INTERVAL_MS = 5 * 60 * 1000;
export const FOLDER_NAME = 'LearningOS Backups';
const SETTINGS_DB = 'LearningOS-backup-folder';

export function isSupported() {
  return typeof window !== 'undefined' && typeof window.showDirectoryPicker === 'function';
}

function settingsDb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(SETTINGS_DB, 1);
    req.onupgradeneeded = () => req.result.createObjectStore('kv');
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
async function kv(mode, fn) {
  const db = await settingsDb();
  try {
    return await new Promise((resolve, reject) => {
      const tx = db.transaction('kv', mode);
      const req = fn(tx.objectStore('kv'));
      tx.oncomplete = () => resolve(req?.result);
      tx.onerror = () => reject(tx.error);
    });
  } finally {
    db.close();
  }
}
// Test hook: a folder handle made in Node cannot be structured-cloned, so the
// guard swaps in a plain Map. Never called by the app.
let memorySettings = null;
export function __useMemorySettingsForTest() {
  memorySettings = new Map();
}
const getSetting = (k) =>
  memorySettings ? Promise.resolve(memorySettings.get(k)) : kv('readonly', (s) => s.get(k));
const setSetting = (k, v) =>
  memorySettings ? Promise.resolve(void memorySettings.set(k, v)) : kv('readwrite', (s) => s.put(v, k));

/** Day stamp in local time, e.g. 2026-09-16. */
export function dayStamp(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** Daily file names that should be removed, keeping the newest `keep`. */
export function dailyFilesToPrune(names, keep = KEEP_DAILY) {
  const daily = names
    .filter((n) => new RegExp(`^${AUTO_PREFIX}\\d{4}-\\d{2}-\\d{2}\\.json$`).test(n))
    .sort()
    .reverse();
  return daily.slice(keep);
}

/** Cheap content fingerprint, so an unchanged school is not rewritten. */
export function fingerprint(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return `${text.length}:${(h >>> 0).toString(16)}`;
}

/**
 * 'unsupported' | 'off' (no folder chosen) | 'needs-permission' | 'on'
 */
export async function getAutoBackupState() {
  if (!isSupported()) return { state: 'unsupported' };
  try {
    const handle = await getSetting('folder');
    const last = (await getSetting('last')) || null;
    if (!handle) return { state: 'off', last };
    const perm = await handle.queryPermission({ mode: 'readwrite' });
    return { state: perm === 'granted' ? 'on' : 'needs-permission', folderName: handle.name, last };
  } catch {
    return { state: 'off', last: null };
  }
}

/** Must be called from a click. Lets the family pick the folder. */
export async function chooseBackupFolder() {
  let picked = await window.showDirectoryPicker({ id: 'learningos-backups', mode: 'readwrite', startIn: 'documents' });
  // Picking "Documents" itself is fine — the backups get their own subfolder.
  if (picked.name !== FOLDER_NAME) {
    picked = await picked.getDirectoryHandle(FOLDER_NAME, { create: true });
  }
  await setSetting('folder', picked);
  await setSetting('lastFingerprint', null);
  return runAutoBackup({ force: true });
}

/** Must be called from a click, after a restart or browser clear asks again. */
export async function resumeBackupPermission() {
  const handle = await getSetting('folder');
  if (!handle) return { ok: false, reason: 'no-folder' };
  const perm = await handle.requestPermission({ mode: 'readwrite' });
  if (perm !== 'granted') return { ok: false, reason: 'denied' };
  return runAutoBackup({ force: true });
}

async function writeFile(dir, name, text) {
  const fh = await dir.getFileHandle(name, { create: true });
  const w = await fh.createWritable();
  await w.write(text);
  await w.close();
}

let running = false;

/** Write a backup if a folder is ready and something changed. Never throws. */
export async function runAutoBackup({ force = false } = {}) {
  if (!isSupported() || running) return { ok: false, reason: running ? 'busy' : 'unsupported' };
  running = true;
  try {
    const dir = await getSetting('folder');
    if (!dir) return { ok: false, reason: 'no-folder' };
    if ((await dir.queryPermission({ mode: 'readwrite' })) !== 'granted') {
      return { ok: false, reason: 'needs-permission' };
    }
    const file = await buildFullBackup();
    // Fingerprint the records only — exportedAt changes on every build.
    const fp = fingerprint(JSON.stringify(file.tables));
    if (!force && fp === (await getSetting('lastFingerprint'))) return { ok: true, skipped: true };

    const text = JSON.stringify(file);
    await writeFile(dir, LATEST_NAME, text);
    await writeFile(dir, `${AUTO_PREFIX}${dayStamp()}.json`, text);

    const names = [];
    for await (const name of dir.keys()) names.push(name);
    for (const old of dailyFilesToPrune(names)) {
      try { await dir.removeEntry(old); } catch { /* a stale extra file is harmless */ }
    }

    const last = { at: new Date().toISOString(), bytes: text.length, rows: file.manifest.totalRows, folderName: dir.name };
    await setSetting('lastFingerprint', fp);
    await setSetting('last', last);
    return { ok: true, last };
  } catch (e) {
    return { ok: false, reason: 'error', error: e?.message || String(e) };
  } finally {
    running = false;
  }
}
