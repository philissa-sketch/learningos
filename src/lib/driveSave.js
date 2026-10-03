/**
 * SAVING A FILE INTO A FOLDER HE PICKS, ONCE. (Oct 3, 2026.)
 *
 * The folder is chosen with the browser's own folder picker and remembered. If
 * that folder is Student Work Samples as seen through Google Drive for desktop
 * (signed in as HIS account -- see the Oct 1 Drive arrangement), the file lands
 * in her Drive with no upload step and no Google sign-in inside this app.
 *
 * Chrome and Edge only (File System Access API). Anywhere else `driveSaveSupported`
 * is false and the button says so instead of failing.
 *
 * The remembered folder handle lives in its own tiny IndexedDB, not in the Dexie
 * schema: it is a per-computer setting, must never travel in an export to the
 * other computer, and a schema bump for it would be a migration for no reason.
 */
const DB = 'mc-drive-folders';
const STORE = 'handles';

export const driveSaveSupported = () =>
  typeof window !== 'undefined' && typeof window.showDirectoryPicker === 'function';

const open = () =>
  new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });

async function idb(mode, fn) {
  const db = await open();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, mode);
    const out = fn(tx.objectStore(STORE));
    tx.oncomplete = () => { db.close(); resolve(out?.result); };
    tx.onerror = () => { db.close(); reject(tx.error); };
  });
}

export const rememberedFolder = async (key) => {
  try { return (await idb('readonly', (s) => s.get(key))) || null; } catch { return null; }
};

/** Must be called from a click: the picker needs a user gesture. */
export async function chooseFolder(key) {
  const handle = await window.showDirectoryPicker({ id: `mc-${key}`, mode: 'readwrite' });
  await idb('readwrite', (s) => s.put(handle, key));
  return handle;
}

/** Re-asks for permission when the browser has forgotten it (click required). */
async function writable(handle) {
  const opts = { mode: 'readwrite' };
  if ((await handle.queryPermission(opts)) === 'granted') return true;
  return (await handle.requestPermission(opts)) === 'granted';
}

/**
 * Writes `bytes` as `fileName` in the remembered folder (choosing one first if
 * there is none). Same name overwrites, so saving again UPDATES the document
 * instead of leaving "report (2)" behind.
 * Returns { ok, folderName, fileName } or { ok:false, error, cancelled? }.
 */
export async function saveToFolder(key, fileName, bytes) {
  try {
    let handle = await rememberedFolder(key);
    if (!handle) handle = await chooseFolder(key);
    if (!(await writable(handle))) return { ok: false, error: 'The folder is not allowed to be written to.' };
    const file = await handle.getFileHandle(fileName, { create: true });
    const w = await file.createWritable();
    await w.write(bytes);
    await w.close();
    return { ok: true, folderName: handle.name, fileName };
  } catch (e) {
    if (e?.name === 'AbortError') return { ok: false, cancelled: true, error: 'No folder chosen.' };
    return { ok: false, error: e?.message || 'That did not save.' };
  }
}
