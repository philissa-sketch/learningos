import { useAppStore } from '../../store/useAppStore.js';

/**
 * IS THERE A RECENT COPY OF HIS YEAR ANYWHERE? (go-live open item 1.)
 *
 * ---- WHY THIS SHIPPED ON AUGUST 9, 2026 ----
 *
 * Everything this app knows lives in one browser's IndexedDB on one laptop.
 * Not a file she can see in a folder, not a document in Drive — a database
 * inside a browser profile. Clearing site data wipes it. A browser reinstall
 * can wipe it. A dead drive certainly does. And what goes with it is the
 * attendance log Georgia asks for, the portfolio, every grade, the ledger, and
 * a year of his written work.
 *
 * Nothing in the app had ever said this out loud, and nothing knew when a copy
 * had last been made. The go-live checklist listed a backup reminder as an
 * open item with a stated precondition — "before Credits start converting into
 * real outings". That precondition was already breached: the store has been
 * live, and three items involving real money were auto-approving with no
 * parent at all. So this is not early. It is late.
 *
 * ---- WHY IT REPORTS SIZE AND ROW COUNT ----
 *
 * A date alone hides the failure worth catching. An export that ran, produced
 * a nearly-empty file, and stamped today's date reads as a healthy backup and
 * is worth nothing. "1.4 MB · 3,812 records" is checkable at a glance: if next
 * week's says 4 KB, something is wrong and she can see it.
 *
 * Two voices, one card. `tone="parent"` for the dashboard, `tone="student"`
 * for the handoff screen — he should be nudged to send his work, not warned
 * about data loss.
 */

function formatDate(iso) {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString(undefined, { weekday: 'short', month: 'long', day: 'numeric' });
}

function formatBytes(n) {
  if (!n && n !== 0) return null;
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${Math.round(n / 1024)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

function relativeDays(days) {
  if (days === null || days === undefined) return null;
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  return `${days} days ago`;
}

export function BackupStatusCard({ tone = 'parent', onExport }) {
  const getBackupStatus = useAppStore((s) => s.getBackupStatus);
  // Subscribed so the card updates the instant an export finishes, rather
  // than on the next navigation.
  const lastExportAt = useAppStore((s) => s.lastExportAt);
  const lastImportAt = useAppStore((s) => s.lastImportAt);
  const status = getBackupStatus();

  const when = formatDate(lastExportAt);
  const ago = relativeDays(status.daysSinceExport);
  const size = formatBytes(status.lastExportBytes);
  const rows = status.lastExportRowCount;

  const calm = !status.stale;
  const border = calm
    ? 'border-signal-green/30 bg-signal-green/5'
    : status.neverExported
      ? 'border-signal-red/40 bg-signal-red/5'
      : 'border-signal-amber/40 bg-signal-amber/5';
  const heading = calm ? 'text-signal-green' : status.neverExported ? 'text-signal-red' : 'text-signal-amber';

  if (tone === 'student') {
    return (
      <div className={'mt-3 rounded-lg border px-3 py-2 ' + border}>
        <p className={'font-display text-xs uppercase tracking-widest ' + heading}>Last sent to Mom</p>
        <p className="mt-0.5 text-xs text-ink-300">
          {status.neverExported
            ? 'You have never sent your work across. Everything you have done is only on this computer — send it today.'
            : `${when} (${ago}).${size ? ` ${size}` : ''}${rows ? ` · ${rows.toLocaleString()} records` : ''}`}
          {!status.neverExported && status.stale
            ? ' That is longer than a week — send today so nothing is stuck here.'
            : ''}
        </p>
      </div>
    );
  }

  return (
    <div className={'rounded-xl border p-4 shadow-panel ' + border}>
      <p className={'text-xs font-display uppercase tracking-widest ' + heading}>
        {status.neverExported ? 'No backup exists' : calm ? 'Backup is current' : 'Backup is out of date'}
      </p>
      <h3 className="mt-1 font-display text-base font-700 text-ink-100">
        {status.neverExported
          ? 'This computer has never exported a backup'
          : `Last verified export: ${when}`}
      </h3>

      {status.neverExported ? (
        <p className="mt-2 text-sm text-ink-300">
          Everything — attendance, grades, the portfolio, the Credit ledger, and every word he has
          written — lives inside this browser on this computer. Clearing browsing data or losing the
          drive loses the school year with it, including the attendance record Georgia asks for.
          Export once now, and keep the file somewhere that is not this machine.
        </p>
      ) : (
        <>
          <p className="mt-1 text-sm text-ink-300">
            {ago}
            {size ? ` · ${size}` : ''}
            {rows ? ` · ${rows.toLocaleString()} records` : ''}
            {lastImportAt ? ` · last import ${formatDate(lastImportAt)}` : ''}
          </p>
          <p className="mt-2 text-xs text-ink-500">
            Worth a glance at that size each week. A backup that suddenly gets much smaller is the
            failure a date on its own would hide.
          </p>
          {status.stale && (
            <p className="mt-2 text-sm text-ink-300">
              That is more than {status.staleAfterDays} days ago. A week is about the most this is
              worth risking now that the record is the year — and now that Credits buy real outings,
              the ledger is part of what a lost drive would take.
            </p>
          )}
        </>
      )}

      {onExport && (
        <button
          type="button"
          onClick={onExport}
          className="mt-3 rounded-lg bg-signal-cyan px-4 py-2 font-display text-sm font-700 text-space-950 transition hover:brightness-110"
        >
          {status.neverExported ? 'Export the first backup' : 'Export a fresh backup'}
        </button>
      )}
    </div>
  );
}
