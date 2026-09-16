import { useEffect, useState } from 'react';
import { getStorageStatus, requestPersistentStorage } from '../../lib/storageSafety.js';
import { downloadFullBackup, lastFullBackup } from '../../lib/fullBackup.js';
import { chooseBackupFolder, getAutoBackupState, resumeBackupPermission, FOLDER_NAME, LATEST_NAME } from '../../lib/autoBackup.js';

/**
 * WILL THE SCHOOL STILL BE HERE AFTER A RESTART?  (Sept 16, 2026)
 *
 * Two answers on one card: is this browser protecting the records
 * (persistent storage), and when was a FULL backup file last made — the only
 * file that can rebuild a computer that has lost everything. See
 * lib/storageSafety.js and lib/fullBackup.js.
 */
function fmtBytes(n) {
  if (!n && n !== 0) return null;
  if (n < 1024 * 1024) return `${Math.round(n / 1024)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}
function fmtDate(iso) {
  const d = iso ? new Date(iso) : null;
  return d && !Number.isNaN(d.getTime())
    ? d.toLocaleDateString(undefined, { weekday: 'short', month: 'long', day: 'numeric' })
    : null;
}
function daysSince(iso) {
  if (!iso) return null;
  return Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
}

export function StorageSafetyCard() {
  const [status, setStatus] = useState(null);
  const [last, setLast] = useState(() => lastFullBackup());
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [auto, setAuto] = useState(null);

  useEffect(() => {
    let live = true;
    (async () => {
      await requestPersistentStorage();
      const s = await getStorageStatus();
      if (live) setStatus(s);
      const a = await getAutoBackupState();
      if (live) setAuto(a);
    })();
    return () => { live = false; };
  }, []);

  async function backup() {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      setLast(await downloadFullBackup());
    } catch (e) {
      setError(e.message || String(e));
    }
    setBusy(false);
  }

  async function autoAction() {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const r = await (auto?.state === 'needs-permission' ? resumeBackupPermission() : chooseBackupFolder());
      if (r && !r.ok && r.error) setError(r.error);
    } catch (e) {
      if (e?.name !== 'AbortError') setError(e.message || String(e));
    }
    setAuto(await getAutoBackupState());
    setBusy(false);
  }

  const protectedOn = status?.persisted;
  const age = daysSince(last?.at);
  const backupStale = age === null || age > 7;
  const good = protectedOn && !backupStale;
  const border = good ? 'border-signal-green/30 bg-signal-green/5' : 'border-signal-amber/40 bg-signal-amber/5';
  const heading = good ? 'text-signal-green' : 'text-signal-amber';

  return (
    <div className={'rounded-xl border p-4 shadow-panel ' + border}>
      <p className={'text-xs font-display uppercase tracking-widest ' + heading}>
        Restart protection
      </p>

      <h3 className="mt-1 font-display text-base font-700 text-ink-100">
        {status === null
          ? 'Checking this browser…'
          : protectedOn
            ? 'This browser will keep the school after a restart'
            : 'This browser may clear the school on its own'}
      </h3>

      {status && !protectedOn && (
        <div className="mt-2 text-sm text-ink-300">
          <p>The browser has not agreed to keep these records. To turn protection on:</p>
          <ol className="mt-1 list-decimal pl-5 space-y-0.5">
            <li>Install the school as an app: in Chrome or Edge, click the install icon at the right end of the address bar (or ⋮ → Cast, save and share → Install page as app).</li>
            <li>Open the school from that app icon from now on.</li>
            <li>In browser settings, make sure “Clear cookies and site data when you close all windows” is <strong>off</strong>.</li>
          </ol>
        </div>
      )}

      <p className="mt-3 text-sm text-ink-300">
        <strong>Full backup file:</strong>{' '}
        {last
          ? `${fmtDate(last.at)} · ${fmtBytes(last.bytes)} · ${Number(last.rows).toLocaleString()} records`
          : 'none made on this computer yet'}
        {last && backupStale ? ' — more than a week old.' : ''}
      </p>
      <p className="mt-1 text-xs text-ink-500">
        This file holds everything, including your own records. If a computer ever opens empty:
        set the computer up, then Import → from a file, and choose this file. Save it to Google
        Drive, not only to this computer.
      </p>

      <div className="mt-3 rounded-lg border border-space-700 p-3">
        <p className="text-sm text-ink-100">
          <strong>Automatic backup to a folder:</strong>{' '}
          {auto === null
            ? 'checking…'
            : auto.state === 'on'
              ? `ON — saving to “${auto.folderName}” every 5 minutes while school is open.`
              : auto.state === 'needs-permission'
                ? 'PAUSED — the browser wants one click to continue.'
                : auto.state === 'unsupported'
                  ? 'not available in this browser. Use Chrome or Edge.'
                  : 'OFF on this computer.'}
        </p>
        {auto?.last && (
          <p className="mt-1 text-xs text-ink-500">
            Last automatic save: {new Date(auto.last.at).toLocaleString()} · {fmtBytes(auto.last.bytes)} ·{' '}
            {Number(auto.last.rows).toLocaleString()} records
          </p>
        )}
        <p className="mt-1 text-xs text-ink-500">
          Files land in Documents › {FOLDER_NAME}. Clearing the browser does not touch them. To
          restore: set the computer up, then Import → From a file → <em>{LATEST_NAME}</em>. Then
          choose the same folder again here.
        </p>
        {auto && (auto.state === 'off' || auto.state === 'needs-permission') && (
          <button
            type="button"
            onClick={autoAction}
            disabled={busy}
            className="mt-2 rounded-lg bg-signal-amber px-4 py-2 font-display text-sm font-700 text-space-950 disabled:opacity-60"
          >
            {auto.state === 'off' ? 'Turn on automatic backup' : 'Resume automatic backup'}
          </button>
        )}
      </div>

      {error && <p className="mt-2 text-sm text-signal-red">{error}</p>}

      <button
        type="button"
        onClick={backup}
        disabled={busy}
        className="mt-3 rounded-lg bg-signal-cyan px-4 py-2 font-display text-sm font-700 text-space-950 transition hover:brightness-110 disabled:opacity-60"
      >
        {busy ? 'Making the backup…' : 'Download full backup'}
      </button>
    </div>
  );
}
