/**
 * ---- KEEPING THE SCHOOL ON THIS COMPUTER ----  (Sept 16, 2026)
 *
 * Reported on both family computers: after a restart, the app said the
 * school was no longer on the computer.
 *
 * Every record lives in this browser's IndexedDB. By default a browser files
 * that storage as "best effort", which means the browser is ALLOWED to throw
 * it away — when disk space runs low, when a cleanup tool or a "clear data on
 * close" setting runs, when a restart comes with an update. Nothing warns
 * anyone. The next launch finds an empty household database and the front
 * door truthfully says "This computer isn't set up yet."
 *
 * Two defences, both here:
 *
 *   1. Ask the browser to mark this site's storage PERSISTENT. A persistent
 *      site is never evicted automatically; only a person clearing it can
 *      remove it. Chrome and Edge grant it silently to sites that are
 *      installed as an app or bookmarked / used often.
 *
 *   2. Report the answer, so the Parent Dashboard can say plainly whether the
 *      protection is on — and what to do if it is not.
 *
 * Neither replaces a backup FILE. A dead drive or a browser reset still takes
 * everything, which is why lib/fullBackup.js exists beside this.
 */

/** Ask once per load. Safe to call repeatedly; never throws. */
export async function requestPersistentStorage() {
  try {
    if (!navigator?.storage?.persist) return { supported: false, persisted: false };
    const already = await navigator.storage.persisted();
    if (already) return { supported: true, persisted: true };
    const granted = await navigator.storage.persist();
    return { supported: true, persisted: Boolean(granted) };
  } catch {
    return { supported: false, persisted: false };
  }
}

/**
 * What the Parent Dashboard shows.
 * @returns {Promise<{supported:boolean, persisted:boolean, usageBytes:number|null, quotaBytes:number|null, installed:boolean}>}
 */
export async function getStorageStatus() {
  const out = { supported: false, persisted: false, usageBytes: null, quotaBytes: null, installed: false };
  try {
    if (navigator?.storage?.persisted) {
      out.supported = true;
      out.persisted = await navigator.storage.persisted();
    }
    if (navigator?.storage?.estimate) {
      const est = await navigator.storage.estimate();
      out.usageBytes = est.usage ?? null;
      out.quotaBytes = est.quota ?? null;
    }
    out.installed = Boolean(window.matchMedia?.('(display-mode: standalone)').matches);
  } catch {
    /* status is advisory; a failure here must never block school */
  }
  return out;
}
