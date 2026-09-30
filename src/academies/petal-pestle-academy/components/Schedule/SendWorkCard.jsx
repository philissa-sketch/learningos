// ---------------------------------------------------------------------------
// SEND YOUR WORK TO GIGI — her half of the two-computer handoff (Sept 29 2026).
//
// Gigi: "can you add the export/import to her day so she can send me her work
// like on Lamar's." Until now saving and loading a file lived only in the
// Grown-Up Corner, behind the passcode, so Azianna had no way to send her work
// or load back what Gigi graded and wrote.
//
// ---- ONE CODE PATH, BOTH SIDES ----
// Send uses exportAll and Load uses previewImport → importVerdict →
// importBackup, from db/db.js — exactly what the Grown-Up Corner's "Bring her
// work onto this computer" uses. So a fix to one fixes both.
//
// ⚠️ NOT db/herRecords.js importBackup. That loader only ADDS rows, which is
// right for the one-time move from the standalone app and wrong for a daily
// trade: a review question moving up a box, a draft she kept writing, a lesson
// read again — all edits to rows that already exist — would never cross. The
// db/db.js merge keeps whichever version of each record is further along
// (lib/mergeBackup.js) and never deletes anything.
//
// ---- A CHILD CANNOT LOAD AROUND THE GUARD ----
// When importVerdict blocks a file (older than her work and bringing nothing
// new, or one that would set back a level she is still being measured on), a
// grown-up can confirm past it in the Grown-Up Corner. Here there is no
// confirm: the file is refused, nothing changes, and she is told to ask for a
// new one.
//
// check-send-work.mjs holds all of this.
// ---------------------------------------------------------------------------

import { useRef, useState } from 'react';
import { exportAll, previewImport, importBackup } from '../../db/db.js';
import { importVerdict } from '../../lib/importGuard.js';
import { dayKeyOf } from '../../db/herRecords.js';
import { useAppStore } from '../../store/useAppStore.js';
import { marigoldCallsHer } from '../../lib/marigoldName.js';

export const SEND_TO = 'Gigi';

/** The file name she sends: her name and today's date, so Gigi can tell them apart. */
export function workFileName(date = new Date()) {
  return `${marigoldCallsHer().toLowerCase()}-work-${dayKeyOf(date)}.json`;
}

/** What arrived, in her words. Reads the same preview the Grown-Up Corner shows. */
export function arrivedSentence(preview) {
  const n = (k) => Number(preview?.[k]?.new) || 0;
  const notes = n('messages');
  const marks = n('khanGrades') + n('writingMarks') + n('journalMarks');
  const parts = [];
  if (notes) parts.push(`${notes} new note${notes === 1 ? '' : 's'}`);
  if (marks) parts.push(`${marks} new grade${marks === 1 ? '' : 's'}`);
  return parts.length ? `New from ${SEND_TO}: ${parts.join(' and ')}.` : `Everything from ${SEND_TO} is up to date.`;
}

function download(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function SendWorkCard() {
  const hydrate = useAppStore((s) => s.hydrate);
  const [result, setResult] = useState(null); // { ok, message }
  const [busy, setBusy] = useState(false);
  const fileRef = useRef(null);

  async function send() {
    if (busy) return;
    setBusy(true);
    setResult(null);
    try {
      const name = workFileName();
      download(await exportAll(), name);
      setResult({ ok: true, message: `Saved! It is in your Downloads folder, called ${name}. Send that file to ${SEND_TO}. Nothing here changed.` });
    } catch (err) {
      setResult({ ok: false, message: `That did not save: ${err?.message || 'something went wrong'}. Nothing here changed. Tell ${SEND_TO}.` });
    }
    setBusy(false);
  }

  async function load(e) {
    const file = e.target.files?.[0];
    e.target.value = ''; // so the same file name can be chosen again tomorrow
    if (!file || busy) return;
    setBusy(true);
    setResult(null);
    try {
      const data = JSON.parse(await file.text());
      const preview = await previewImport(data);
      const verdict = importVerdict(preview);
      if (verdict.blocked) {
        setResult({ ok: false, message: `That file was not loaded, because it would not add anything new or could undo your work. Nothing here changed. Ask ${SEND_TO} to send a new one.` });
      } else {
        await importBackup(data);
        await hydrate();
        setResult({ ok: true, message: `Loaded! ${arrivedSentence(preview)}` });
      }
    } catch (err) {
      setResult({ ok: false, message: `That file did not load${err instanceof SyntaxError ? ' (it is not a work file)' : `: ${err?.message || 'it may not be the right file'}`}. Nothing here changed. Ask ${SEND_TO} to send it again.` });
    }
    setBusy(false);
  }

  return (
    <section className="mt-6 rounded-petal border-2 border-blush-500 bg-blush-300/20 px-5 py-4">
      <h2 className="font-display text-base text-ink-900">📬 Send your work to {SEND_TO}</h2>
      <p className="mt-1 text-xs text-ink-700">
        Do this at the end of the day. Send yours first. When {SEND_TO} sends a file back, load it here.
      </p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <button
          type="button"
          onClick={send}
          disabled={busy}
          className="rounded-full bg-blush-500 px-5 py-2.5 text-sm font-700 text-white hover:bg-blush-700 disabled:opacity-50"
        >
          ⬆ Send my work to {SEND_TO}
        </button>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={busy}
          className="rounded-full border-2 border-blush-500 bg-white px-5 py-2.5 text-sm font-700 text-ink-900 hover:bg-blush-300/30 disabled:opacity-50"
        >
          ⬇ Load what {SEND_TO} sent
        </button>
        <input ref={fileRef} type="file" accept="application/json,.json" onChange={load} className="hidden" />
      </div>
      {busy && <p className="mt-3 text-xs text-ink-500">Working…</p>}
      {result && (
        <p className={`mt-3 rounded-petal px-3 py-2 text-xs ${result.ok ? 'bg-sage-300/30 text-ink-900' : 'bg-clay-500/10 text-clay-500'}`}>
          {result.message}
        </p>
      )}
    </section>
  );
}
