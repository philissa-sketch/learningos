// ---------------------------------------------------------------------------
// BACKUP, AND BRINGING HER WORK HERE. (Sept 23, 2026)
//
// This school keeps her records in a database of its own, which the platform's
// backup does not cover. So this is her backup, and the only one: the file it
// saves is the standalone Petal & Pestle app's own format, and the loader
// reads that app's backups.
//
// The loader shows exactly what a file would add before anything is written,
// only ever ADDS, and shows the counts before and after (db/herRecords.js).
// ---------------------------------------------------------------------------

import { useEffect, useState } from 'react';
import {
  HER_TABLES,
  countHerRecords,
  exportHerRecords,
  importBackup,
  previewBackup,
  replaceWithBackup,
  dayKeyOf
} from '../../db/herRecords.js';
import { useAppStore } from '../../store/useAppStore.js';

const card = 'rounded-xl border border-space-700 bg-space-800 px-4 py-4';
const primary = 'rounded-full bg-signal-cyan px-4 py-2 text-xs font-display font-700 text-space-900 hover:opacity-90';
const quiet = 'rounded-full border border-space-600 px-4 py-2 text-xs font-display font-700 text-ink-100 hover:border-signal-cyan';

/** Plain names for the tables, for a grown-up reading the counts. */
const LABELS = {
  meta: 'Settings and progress markers',
  strandStates: 'Levels (Check-In)',
  answers: 'Check-In answers',
  sittings: 'Check-In sittings',
  ledger: 'Petals and seeds',
  requests: 'Reward requests',
  journal: 'Journal entries',
  messages: 'Messages',
  scheduleDays: 'School days',
  attempts: 'Tests and reading checks',
  reviewItems: 'Review questions',
  lessonReads: 'Lessons read',
  projects: 'Projects',
  khanGrades: 'Khan grades',
  writingMarks: 'Writing marks',
  itemEvents: 'Answer history',
  baselines: 'Starting points',
  goals: 'Goals',
  journalMarks: 'Journal marks',
  writingDrafts: 'Writing drafts',
  spellingResults: 'Spelling tests'
};

function downloadJson(data, filename) {
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

export function BackupPanel() {
  const [counts, setCounts] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [fileName, setFileName] = useState('');
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);
  const [confirmFresh, setConfirmFresh] = useState(false);
  const [freshResult, setFreshResult] = useState(null);
  // Her screens read the store, not the database, so after any load the store
  // is re-read — otherwise the counts on every other tab are the old ones.
  const rehydrate = useAppStore((st) => st.hydrate);

  const refresh = () => countHerRecords().then(setCounts).catch((e) => setError(e.message));
  useEffect(() => {
    refresh();
  }, []);

  const total = counts ? Object.values(counts).reduce((a, b) => a + b, 0) : 0;

  async function saveBackup() {
    setError(null);
    try {
      const data = await exportHerRecords();
      downloadJson(data, `petal-pestle-learningos-backup-${dayKeyOf()}.json`);
    } catch (e) {
      setError(e.message);
    }
  }

  async function pickFile(e) {
    const file = e.target.files?.[0];
    e.target.value = '';
    setError(null);
    setPreview(null);
    setResult(null);
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      const p = await previewBackup(data);
      await refresh(); // so "replace all N records" counts what is here now
      setFileData(data);
      setFileName(file.name);
      setPreview(p);
    } catch (err) {
      setFileData(null);
      setError(err instanceof SyntaxError ? 'That file could not be read as a backup.' : err.message);
    }
  }

  async function load() {
    if (!fileData || busy) return;
    setBusy(true);
    setError(null);
    try {
      setResult(await importBackup(fileData));
      setPreview(null);
      setFileData(null);
      await refresh();
      await rehydrate();
    } catch (e) {
      setError(e.message);
    }
    setBusy(false);
  }

  /**
   * The one-time move (Sept 23, 2026). A copy of everything here is saved to a
   * file first; only then is it replaced. If the copy cannot be made, nothing
   * is replaced.
   */
  async function startFresh() {
    if (!fileData || busy) return;
    setBusy(true);
    setError(null);
    try {
      const safety = await exportHerRecords();
      downloadJson(safety, `petal-pestle-learningos-BEFORE-fresh-start-${dayKeyOf()}.json`);
      setFreshResult(await replaceWithBackup(fileData));
      setConfirmFresh(false);
      setPreview(null);
      setFileData(null);
      setResult(null);
      await refresh();
      await rehydrate();
    } catch (e) {
      setError(e.message);
    }
    setBusy(false);
  }

  return (
    <div className="space-y-4">
      <div className={card}>
        <p className="font-display text-sm font-700 text-ink-100">Back up her work</p>
        <p className="mt-1 text-xs text-ink-300">
          Her work in this school is kept only on this computer, and the app&rsquo;s own backup does not include it.
          Save a copy regularly. The file opens in the Petal &amp; Pestle app too.
        </p>
        <p className="mt-2 text-xs text-ink-500">{counts ? `${total} records here now.` : 'Counting…'}</p>
        <button type="button" onClick={saveBackup} className={`${primary} mt-3`}>Save a backup file</button>
      </div>

      <div className={card}>
        <p className="font-display text-sm font-700 text-ink-100">Bring her work here</p>
        <p className="mt-1 text-xs text-ink-300">
          Pick a backup file from the Petal &amp; Pestle app. You will see what it adds before anything is saved.
          Nothing already here is changed or removed, and loading the same file twice adds nothing the second time.
        </p>
        <label className={`${quiet} mt-3 inline-block cursor-pointer`}>
          Choose a backup file…
          <input type="file" accept=".json,application/json" onChange={pickFile} className="hidden" />
        </label>

        {preview ? (
          <div className="mt-4">
            <p className="text-xs text-ink-300">
              <span className="font-700 text-ink-100">{fileName}</span> · version {preview.fileVersion}
              {preview.exportedAt ? ` · saved ${preview.exportedAt.slice(0, 10)}` : ''}
            </p>
            <CountTable
              rows={preview.rows.filter((r) => r.inFile > 0)}
              columns={[
                ['In the file', (r) => r.inFile],
                ['Already here', (r) => r.alreadyHere],
                ['Will be added', (r) => r.toAdd]
              ]}
              flag={(r) => r.duplicatesInFile + r.unreadable}
            />
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <button type="button" onClick={load} disabled={busy || preview.totalToAdd === 0} className={preview.totalToAdd ? primary : `${quiet} cursor-not-allowed opacity-60`}>
                {busy ? 'Loading…' : preview.totalToAdd ? `Add ${preview.totalToAdd} records` : 'Nothing new to add'}
              </button>
              <button type="button" onClick={() => { setPreview(null); setFileData(null); setConfirmFresh(false); }} className={quiet}>Cancel</button>
            </div>

            {total > 0 ? (
              <div className="mt-4 rounded-xl border border-signal-amber/50 px-4 py-3">
                <p className="text-xs font-700 text-ink-100">Moving her over for good? Start fresh from this backup instead.</p>
                <p className="mt-1 text-xs text-ink-300">
                  Adding keeps what is already here, so her levels, streak and today&rsquo;s work stay at an older
                  backup&rsquo;s values. Starting fresh makes this school exactly match this file. A copy of everything
                  here now is saved to your Downloads first.
                </p>
                {confirmFresh ? (
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <span className="text-xs text-ink-100">Replace all {total} records here with this file?</span>
                    <button type="button" onClick={startFresh} disabled={busy} className={primary}>
                      {busy ? 'Working…' : 'Yes — save a copy, then start fresh'}
                    </button>
                    <button type="button" onClick={() => setConfirmFresh(false)} className={quiet}>No</button>
                  </div>
                ) : (
                  <button type="button" onClick={() => setConfirmFresh(true)} className={`${quiet} mt-3`}>
                    Start fresh from this backup…
                  </button>
                )}
              </div>
            ) : null}
          </div>
        ) : null}

        {freshResult ? (
          <div className="mt-4">
            <p className="text-xs font-700 text-ink-100">
              Done — this school now matches the file ({freshResult.totalNow} records). A copy of what was here before
              is in your Downloads. Every count below was checked after saving.
            </p>
            <CountTable
              rows={freshResult.rows.filter((r) => r.inFile > 0 || r.before > 0)}
              columns={[
                ['Before', (r) => r.before],
                ['In the file', (r) => r.inFile],
                ['Now', (r) => r.after]
              ]}
              flag={(r) => r.set}
            />
          </div>
        ) : null}

        {result ? (
          <div className="mt-4">
            <p className="text-xs font-700 text-ink-100">
              Done — {result.totalAdded} records added. Every count below was checked after saving.
            </p>
            <CountTable
              rows={result.rows.filter((r) => r.inFile > 0 || r.before > 0)}
              columns={[
                ['Before', (r) => r.before],
                ['Added', (r) => r.added],
                ['Now', (r) => r.after]
              ]}
              flag={(r) => r.duplicatesInFile + r.unreadable}
            />
          </div>
        ) : null}
      </div>

      {error ? (
        <p className="rounded-xl border border-signal-red/50 px-4 py-3 text-xs text-ink-100">{error}</p>
      ) : null}
    </div>
  );
}

function CountTable({ rows, columns, flag }) {
  const flagged = rows.filter((r) => flag(r) > 0);
  return (
    <>
      <table className="mt-2 w-full text-left text-xs">
        <thead>
          <tr className="text-ink-500">
            <th className="py-1 pr-2 font-400">Record</th>
            {columns.map(([label]) => (
              <th key={label} className="py-1 pr-2 text-right font-400">{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.table} className="border-t border-space-700 text-ink-100">
              <td className="py-1 pr-2">{LABELS[r.table] || r.table}</td>
              {columns.map(([label, get]) => (
                <td key={label} className="py-1 pr-2 text-right tabular-nums">{get(r)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {flagged.length ? (
        <p className="mt-2 text-xs text-ink-300">
          Not loaded, and why: {flagged.map((r) => (r.set !== undefined
            ? `${LABELS[r.table] || r.table} — ${r.set} repeated in the file or with no id`
            : `${LABELS[r.table] || r.table} — ${r.duplicatesInFile ? `${r.duplicatesInFile} repeated in the file` : ''}${r.duplicatesInFile && r.unreadable ? ', ' : ''}${r.unreadable ? `${r.unreadable} with no id` : ''}`)).join('; ')}.
        </p>
      ) : null}
    </>
  );
}

export const BACKUP_TABLE_COUNT = Object.keys(HER_TABLES).length;
