import { useState, useRef } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { BackupStatusCard } from './BackupStatusCard.jsx';

/**
 * Lamar's half of the two-computer handoff.
 *
 * Added Aug 8, 2026. Export / Import lived only inside the Parent Dashboard,
 * behind her passcode, so he had no way to send his work or load back what she
 * graded — while the board's Friday handoff panel described him doing exactly
 * that. With the sync moving to daily, this had to exist first.
 *
 * Uses the same `exportProgressData` / `importProgressData` store actions the
 * parent side uses. No second code path, so a fix to one fixes both.
 */
export function StudentHandoffCard() {
  const exportProgressData = useAppStore((s) => s.exportProgressData);
  const importProgressData = useAppStore((s) => s.importProgressData);
  const [result, setResult] = useState(null); // { ok: boolean, message: string }
  const [busy, setBusy] = useState(false);
  const fileRef = useRef(null);

  const handleSend = () => {
    exportProgressData();
    setResult({ ok: true, message: 'Saved. Send that file to Mom — then keep going, nothing here changed.' });
  };

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // so the same filename can be chosen again tomorrow
    if (!file) return;
    setBusy(true);
    setResult(null);
    try {
      const parsed = JSON.parse(await file.text());
      await importProgressData(parsed);
      setResult({ ok: true, message: 'Loaded. Your grades and any new assignments from Mom are in.' });
    } catch (err) {
      setResult({
        ok: false,
        message: "That file did not load — " + (err.message || 'it may not be the right file.') + ' Nothing was changed. Ask Mom to send it again.'
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mt-4 rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
      <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Sending work to Mom</p>
      <p className="mt-1 text-xs text-ink-500">
        Do this at the end of the day. Send yours first, then load hers back when she sends it.
      </p>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <button
          type="button"
          onClick={handleSend}
          className="rounded-lg bg-signal-cyan px-4 py-2.5 text-left font-display text-sm font-700 text-space-950 transition hover:brightness-110"
        >
          1 · Send my work to Mom
          <span className="mt-0.5 block text-xs font-400 opacity-80">Saves a file to your downloads</span>
        </button>

        <button
          type="button"
          disabled={busy}
          onClick={() => fileRef.current?.click()}
          className="rounded-lg border border-signal-cyan/40 px-4 py-2.5 text-left font-display text-sm font-700 text-signal-cyan transition hover:bg-signal-cyan/10 disabled:opacity-50"
        >
          {busy ? 'Loading…' : '2 · Get my graded work back'}
          <span className="mt-0.5 block text-xs font-400 text-ink-500">Pick the file Mom sent you</span>
        </button>
      </div>

      <input ref={fileRef} type="file" accept="application/json,.json" onChange={handleFile} className="hidden" />

      {result && (
        <p
          className={
            'mt-3 rounded-lg border px-3 py-2 text-xs ' +
            (result.ok
              ? 'border-signal-green/40 bg-signal-green/10 text-signal-green'
              : 'border-signal-red/40 bg-signal-red/10 text-signal-red')
          }
        >
          {result.message}
        </p>
      )}

      <p className="mt-2 text-xs text-ink-500">
        Loading the same file twice is safe — the second time does nothing.
      </p>

      {/* Go-live open item 1, in his voice. He does not need warning about
          data loss; he needs to know whether his work is stuck on this
          machine. Same underlying figure the Parent Dashboard shows. */}
      <BackupStatusCard tone="student" />
    </div>
  );
}
