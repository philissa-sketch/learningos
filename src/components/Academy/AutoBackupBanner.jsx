import { useCallback, useEffect, useState } from 'react';
import { academyContent, loadedAcademyId } from '../../content/academyContent.js';
import {
  chooseBackupFolder,
  getAutoBackupState,
  INTERVAL_MS,
  resumeBackupPermission,
  runAutoBackup
} from '../../lib/autoBackup.js';

/**
 * Runs the automatic backup while a school is open, and shows a small corner
 * notice ONLY when a click is needed (no folder yet, or the browser wants the
 * permission confirmed again). When backups are working it shows nothing.
 * See lib/autoBackup.js.
 */
/**
 * ---- A SCHOOL THAT KEEPS ITS OWN RECORDS (Sept 23, 2026) ----
 *
 * This banner backs up the platform's database. A school that turns the
 * shell's bar off (nav.navShellBar === false) carries its own screens, its own
 * records and its own backup, so this banner would promise protection it does
 * not give — the parent asked for it to go. Backups still run underneath; only
 * the banner is not shown.
 *
 * The banner sits outside the school and can render before the school's
 * content has loaded, so until that is known it shows nothing and looks again
 * shortly. Every other school sees it exactly as before once it has loaded.
 */
function hiddenForThisSchool() {
  try {
    if (!loadedAcademyId()) return 'unknown';
    return academyContent().nav?.navShellBar === false;
  } catch {
    return 'unknown';
  }
}

export default function AutoBackupBanner() {
  // Re-render a moment after mount, so the check above sees the loaded school.
  const [, setLook] = useState(0);
  useEffect(() => {
    const timers = [setTimeout(() => setLook(1), 800), setTimeout(() => setLook(2), 3000)];
    return () => timers.forEach(clearTimeout);
  }, []);
  const [state, setState] = useState(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null);
  const [hidden, setHidden] = useState(false);

  const refresh = useCallback(async () => setState((await getAutoBackupState()).state), []);

  useEffect(() => {
    let live = true;
    const tick = async () => {
      await runAutoBackup();
      if (live) await refresh();
    };
    const first = setTimeout(tick, 5000);
    const every = setInterval(tick, INTERVAL_MS);
    const onHide = () => {
      if (document.visibilityState === 'hidden') runAutoBackup();
    };
    document.addEventListener('visibilitychange', onHide);
    window.addEventListener('pagehide', onHide);
    refresh();
    return () => {
      live = false;
      clearTimeout(first);
      clearInterval(every);
      document.removeEventListener('visibilitychange', onHide);
      window.removeEventListener('pagehide', onHide);
    };
  }, [refresh]);

  async function act(fn) {
    if (busy) return;
    setBusy(true);
    setMessage(null);
    try {
      const r = await fn();
      setMessage(r?.ok ? 'Backup saved. It will keep saving on its own.' : r?.error || 'Backups are not on yet.');
    } catch (e) {
      // Closing the folder picker is not an error worth shouting about.
      if (e?.name !== 'AbortError') setMessage(e?.message || String(e));
    }
    await refresh();
    setBusy(false);
  }

  const schoolHides = hiddenForThisSchool();
  if (schoolHides !== false) return null;
  if (hidden || !state || state === 'on' || state === 'unsupported') {
    return message ? <Corner><p style={{ margin: 0 }}>{message}</p></Corner> : null;
  }

  return (
    <Corner>
      <strong>{state === 'off' ? 'Turn on automatic backup' : 'Backups are paused'}</strong>
      <p style={{ margin: '4px 0 8px' }}>
        {state === 'off'
          ? 'Saves your schoolwork to a folder on this computer, so clearing the browser can never erase it. Pick your Documents folder.'
          : 'The computer restarted or the browser updated. One click and backups carry on.'}
      </p>
      <button
        type="button"
        disabled={busy}
        onClick={() => act(state === 'off' ? chooseBackupFolder : resumeBackupPermission)}
        style={{ background: '#38bdf8', color: '#0b1020', border: 0, borderRadius: 8, padding: '6px 12px', fontWeight: 700, cursor: 'pointer' }}
      >
        {busy ? 'Saving…' : state === 'off' ? 'Choose folder' : 'Keep backing up'}
      </button>
      <button
        type="button"
        onClick={() => setHidden(true)}
        style={{ marginLeft: 8, background: 'transparent', color: '#cbd5e1', border: 0, cursor: 'pointer' }}
      >
        Later
      </button>
      {message ? <p style={{ margin: '8px 0 0' }}>{message}</p> : null}
    </Corner>
  );
}

function Corner({ children }) {
  return (
    <div
      role="status"
      style={{
        position: 'fixed', right: 16, bottom: 16, zIndex: 9999, maxWidth: 320,
        background: '#111827', color: '#f1f5f9', border: '1px solid #f59e0b',
        borderRadius: 12, padding: 12, fontSize: 14, boxShadow: '0 8px 24px rgba(0,0,0,.4)'
      }}
    >
      {children}
    </div>
  );
}
