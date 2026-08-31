import { useState } from 'react';
import { db, EXPORT_TABLE_POLICY } from '../../db/db.js';
import {
  databasesInFile,
  likeliestSchoolDatabase,
  tablesForDatabase,
  tablesTheHandoffWouldMiss,
  validateMigrationFile
} from '../../lib/migrationFile.js';
import {
  openSourceReadOnly,
  readAllTables,
  readTargetTables,
  writePlan
} from '../../db/importRunner.js';
import {
  buildImportPlan,
  rowsToCopy,
  summarizeSource,
  unfamiliarCurrencies,
  verifyCopy
} from '../../lib/importSchool.js';
import '../FrontDoor/frontDoor.css';

/**
 * Import an existing school's records into this Academy.
 *
 * Four steps, and the third is the point of the whole screen:
 *
 *   1. name the source database
 *   2. read it — nothing is written yet
 *   3. LOOK AT WHAT IS IN IT, and choose what travels
 *   4. copy, then re-read and check
 *
 * ---- WHY STEP 3 IS A SCREEN AND NOT A CONSTANT ----
 *
 * A real import found 41 rows in one child's ledger belonging to a sibling.
 * The obvious fix is a hardcoded allow-list of that child's two currencies.
 * That fixes the case that already happened and hides the next one.
 *
 * Showing the breakdown instead — every currency, its row count, and the first
 * few notes attached to it — turns "39 petal" into something a parent reads and
 * recognises in about a second. The notes are there because a count alone does
 * not tell you whose rows these are, and a note like "Ribboned Braids" does.
 */
export default function ImportSchool({ academy, onDone, onCancel }) {
  const [step, setStep] = useState('name');
  const [sourceName, setSourceName] = useState('');
  // 'database' — a school at THIS web address
  // 'file'     — a school that lived at a different one
  const [mode, setMode] = useState('database');
  const [migration, setMigration] = useState(null); // the parsed file
  const [missedByHandoff, setMissedByHandoff] = useState([]);
  const [sourceTables, setSourceTables] = useState(null);
  const [summary, setSummary] = useState(null);
  const [tables, setTables] = useState(new Set());
  const [currencies, setCurrencies] = useState(new Set());
  const [progress, setProgress] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  async function read(event) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const { db: source } = await openSourceReadOnly(sourceName.trim());
      const read = await readAllTables(source);
      source.close();
      const found = summarizeSource(read);
      setSourceTables(read);
      setSummary(found);
      setTables(new Set(found.tables.filter((t) => t.rows > 0).map((t) => t.name)));
      setCurrencies(new Set());
      setStep('choose');
    } catch (e) {
      setError(e.message || String(e));
    }
    setBusy(false);
  }

  /**
   * Read a migration file instead of a database at this address.
   *
   * Same destination, same plan, same verification — only the source differs.
   * The file carries every database from the old address, so which school's
   * records to restore is a choice, not a guess.
   */
  async function readFile(event) {
    const chosen = event.target.files?.[0];
    if (!chosen) return;
    setBusy(true);
    setError(null);
    try {
      const parsed = JSON.parse(await chosen.text());
      const checked = validateMigrationFile(parsed);
      if (!checked.ok) {
        setError(checked.error);
        setBusy(false);
        return;
      }

      const which = likeliestSchoolDatabase(checked.file);
      const flat = tablesForDatabase(checked.file, which);
      const found = summarizeSource(flat);

      setMigration({ file: checked.file, database: which, databases: databasesInFile(checked.file) });
      setSourceTables(flat);
      setSummary(found);
      setTables(new Set(found.tables.filter((t) => t.rows > 0).map((t) => t.name)));
      setCurrencies(new Set());
      // Named on the next screen, because these are the tables a parent is
      // most likely to assume travelled and least likely to notice missing:
      // a compliance checklist is not something you open every morning.
      setMissedByHandoff(tablesTheHandoffWouldMiss(flat, EXPORT_TABLE_POLICY));
      setStep('choose');
    } catch (e) {
      setError(e.message || String(e));
    }
    setBusy(false);
  }

  function switchDatabase(name) {
    const flat = tablesForDatabase(migration.file, name);
    const found = summarizeSource(flat);
    setMigration({ ...migration, database: name });
    setSourceTables(flat);
    setSummary(found);
    setTables(new Set(found.tables.filter((t) => t.rows > 0).map((t) => t.name)));
    setCurrencies(new Set());
    // Recomputed, not carried over: it describes the database being restored,
    // and showing the previous one's list would be worse than showing none.
    setMissedByHandoff(tablesTheHandoffWouldMiss(flat, EXPORT_TABLE_POLICY));
  }

  async function run() {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const plan = buildImportPlan(summary, {
        tables: [...tables],
        currencies: [...currencies]
      });
      const { unmatched } = await writePlan(db, plan, sourceTables, rowsToCopy, setProgress);
      const landed = await readTargetTables(db, plan);
      const check = verifyCopy(plan, sourceTables, landed);
      setResult({ plan, unmatched, check });
      setStep('done');
    } catch (e) {
      setError(e.message || String(e));
    }
    setBusy(false);
  }

  const plan = summary
    ? buildImportPlan(summary, { tables: [...tables], currencies: [...currencies] })
    : null;

  return (
    <Panel onCancel={onCancel}>
      {step === 'name' ? (
        <div className="fd-body">
          <p className="fd-steps">Import · Step 1 of 3</p>
          <h1>Where is the school now?</h1>
          <p className="fd-hint">
            Nothing is written to the original either way. This reads a copy and leaves the school
            it came from exactly as it is.
          </p>

          <div className="fd-tabs" style={{ marginBottom: '22px' }}>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'database'}
              onClick={() => {
                setMode('database');
                setError(null);
              }}
            >
              At this address
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'file'}
              onClick={() => {
                setMode('file');
                setError(null);
              }}
            >
              From a file
            </button>
          </div>

          {error ? (
            <p className="fd-error" role="alert">
              {error}
            </p>
          ) : null}

          {mode === 'database' ? (
            <form onSubmit={read}>
              <p className="fd-note">
                Use this when the old school ran at <em>this same web address</em>. Browser records
                belong to the exact URL that created them, so a school from a different address
                cannot be seen from here — it has to come as a file.
              </p>

              <label htmlFor="imp-name">Database name</label>
              <input
                id="imp-name"
                type="text"
                autoComplete="off"
                spellCheck="false"
                value={sourceName}
                onChange={(e) => setSourceName(e.target.value)}
              />

              <button className="fd-btn" type="submit" disabled={busy || !sourceName.trim()}>
                {busy ? 'Reading…' : 'Read it'}
              </button>
            </form>
          ) : (
            <div>
              <p className="fd-note">
                A <strong>migration file</strong>, made at the school&apos;s old address. This is
                not the daily &ldquo;send my work&rdquo; file — that one deliberately leaves your
                own records behind, and a move needs all of them. See{' '}
                <code>docs/MIGRATION.md</code>.
              </p>

              <label htmlFor="imp-file">Migration file</label>
              <input id="imp-file" type="file" accept=".json,application/json" onChange={readFile} />

              {busy ? <p className="fd-hint">Reading…</p> : null}
            </div>
          )}
        </div>
      ) : null}

      {step === 'choose' && summary ? (
        <div className="fd-body">
          <p className="fd-steps">Import · Step 2 of 3</p>
          <h1>What is in it</h1>
          <p className="fd-hint">
            {summary.totalRows.toLocaleString()} rows across{' '}
            {summary.tables.filter((t) => t.rows > 0).length} tables. Untick anything that should
            not travel.
          </p>

          {migration ? (
            <>
              <p className="fd-note">
                From <strong>{migration.database}</strong>, exported{' '}
                {new Date(migration.file.exportedAt).toLocaleDateString()} at{' '}
                {migration.file.source?.origin || 'an unrecorded address'}.
              </p>

              {migration.databases.length > 1 ? (
                <>
                  <p className="fd-steps">
                    The file holds {migration.databases.length} databases — restore which?
                  </p>
                  <div style={{ marginBottom: '18px' }}>
                    {migration.databases.map((name) => (
                      <label
                        key={name}
                        style={{
                          display: 'flex',
                          gap: '10px',
                          alignItems: 'center',
                          textTransform: 'none',
                          letterSpacing: 0,
                          fontSize: '13px',
                          marginBottom: '6px',
                          color: 'var(--fd-text)'
                        }}
                      >
                        <input
                          type="radio"
                          name="which-db"
                          style={{ width: 'auto', margin: 0 }}
                          checked={migration.database === name}
                          onChange={() => switchDatabase(name)}
                        />
                        <span>{name}</span>
                      </label>
                    ))}
                  </div>
                </>
              ) : null}

              {/*
                Named explicitly, because these are the tables a parent is most
                likely to assume came across and least likely to notice
                missing. A compliance checklist is not something you open every
                morning — you open it once a year, and by then the file that
                should have carried it is long gone.
              */}
              {missedByHandoff.length ? (
                <p className="fd-note">
                  <strong>In this file, and not in a daily handoff:</strong>{' '}
                  {missedByHandoff.map((t) => `${t.name} (${t.rows})`).join(', ')}. These are your
                  own records — the compliance file, the course descriptions, your notes. A
                  &ldquo;send my work&rdquo; file leaves them behind on purpose; a move must not.
                </p>
              ) : null}
            </>
          ) : null}

          {summary.currencies.length ? (
            <>
              <p className="fd-steps" style={{ marginTop: '4px' }}>
                Currencies found — tick the ones that belong to this learner
              </p>
              <p className="fd-note">
                Nothing is ticked to begin with, on purpose. Records from two children can end up in
                one file, and the notes below are usually enough to tell whose is whose.
              </p>
              {summary.currencies.map((c) => {
                const key = `${c.table}:${c.currency}`;
                return (
                  <label
                    key={key}
                    style={{
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'flex-start',
                      textTransform: 'none',
                      letterSpacing: 0,
                      fontSize: '13.5px',
                      marginBottom: '12px',
                      color: 'var(--fd-text)'
                    }}
                  >
                    <input
                      type="checkbox"
                      style={{ width: 'auto', margin: '3px 0 0' }}
                      checked={currencies.has(key)}
                      onChange={(e) => {
                        const next = new Set(currencies);
                        if (e.target.checked) next.add(key);
                        else next.delete(key);
                        setCurrencies(next);
                      }}
                    />
                    <span>
                      <strong>
                        {c.currency} — {c.rows} {c.rows === 1 ? 'entry' : 'entries'}
                      </strong>
                      {c.sample.length ? (
                        <span style={{ display: 'block', color: 'var(--fd-text-dim)' }}>
                          e.g. {c.sample.map((s) => `“${s}”`).join(', ')}
                        </span>
                      ) : null}
                    </span>
                  </label>
                );
              })}
            </>
          ) : null}

          <p className="fd-steps" style={{ marginTop: '18px' }}>
            Tables
          </p>
          <div style={{ maxHeight: '190px', overflowY: 'auto', marginBottom: '18px' }}>
            {summary.tables
              .filter((t) => t.rows > 0)
              .map((t) => (
                <label
                  key={t.name}
                  style={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center',
                    textTransform: 'none',
                    letterSpacing: 0,
                    fontSize: '13px',
                    marginBottom: '6px',
                    color: 'var(--fd-text)'
                  }}
                >
                  <input
                    type="checkbox"
                    style={{ width: 'auto', margin: 0 }}
                    checked={tables.has(t.name)}
                    onChange={(e) => {
                      const next = new Set(tables);
                      if (e.target.checked) next.add(t.name);
                      else next.delete(t.name);
                      setTables(next);
                    }}
                  />
                  <span>
                    {t.name} <span style={{ color: 'var(--fd-text-dim)' }}>· {t.rows}</span>
                  </span>
                </label>
              ))}
          </div>

          {error ? (
            <p className="fd-error" role="alert">
              {error}
            </p>
          ) : null}

          <p className="fd-note">
            <strong>{plan.willCopyRows.toLocaleString()} rows will be copied.</strong>{' '}
            {plan.willSkipRows > 0
              ? `${plan.willSkipRows.toLocaleString()} will be left behind.`
              : 'Nothing will be left behind.'}
          </p>

          <button className="fd-btn" type="button" onClick={run} disabled={busy}>
            {busy
              ? progress
                ? `Copying ${progress.table} (${progress.done}/${progress.total})…`
                : 'Copying…'
              : 'Copy into this Academy'}
          </button>
        </div>
      ) : null}

      {step === 'done' && result ? (
        <div className="fd-body">
          <p className="fd-steps">Import · Step 3 of 3</p>
          <h1>{result.check.ok ? 'Copied and checked' : 'Copied, with problems'}</h1>

          {result.check.ok ? (
            <p className="fd-hint">
              {result.plan.willCopyRows.toLocaleString()} rows were written and then read back, and
              every count matches. The original database is untouched.
            </p>
          ) : (
            <>
              <p className="fd-error" role="alert">
                The copy finished but the check did not agree with the plan. Nothing was removed
                from the original — you can run this again.
              </p>
              <ul style={{ fontSize: '13px', color: 'var(--fd-text-mid)', paddingLeft: '18px' }}>
                {result.check.problems.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </>
          )}

          {result.plan.skipped.length ? (
            <p className="fd-note">
              <strong>Left behind on purpose:</strong>{' '}
              {result.plan.skipped.map((s) => `${s.name} (${s.rows})`).join(', ')}
            </p>
          ) : null}

          {result.unmatched.length ? (
            <p className="fd-note">
              <strong>No home in this Academy&apos;s records:</strong>{' '}
              {result.unmatched.map((u) => `${u.table} (${u.rows})`).join(', ')}. These stayed in the
              original.
            </p>
          ) : null}

          <button className="fd-btn" type="button" onClick={() => onDone(result.check)}>
            Done
          </button>
        </div>
      ) : null}
    </Panel>
  );
}

function Panel({ children, onCancel }) {
  return (
    <div className="fd" style={{ background: 'var(--fd-paper)' }}>
      <div className="fd-panel-wrap" style={{ maxWidth: '520px' }}>
        <div className="fd-panel">
          <div className="fd-panel-top">
            <div className="fd-glyph" aria-hidden="true">
              L
            </div>
            <div className="fd-brandname">
              Learning<span>OS</span>
            </div>
          </div>
          {onCancel ? (
            <button className="fd-close" type="button" onClick={onCancel} aria-label="Close">
              ×
            </button>
          ) : null}
          {children}
        </div>
      </div>
    </div>
  );
}
