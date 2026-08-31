/**
 * ---- MOVING A SCHOOL TO A DIFFERENT WEB ADDRESS ----
 *
 * Browser records belong to the exact URL that created them. Not the app, not
 * the repository — the address string. So moving a school from one address to
 * another cannot be a copy between databases; it has to travel as a FILE.
 *
 * ---- WHY THE EXPORT YOU ALREADY HAVE WILL NOT DO IT ----
 *
 * The daily handoff export is deliberately partial. `EXPORT_TABLE_POLICY` in
 * db/db.js excludes nine tables, each for a good reason written next to it:
 * the parent's private notes about her son, her compliance checklist, her
 * course descriptions, her quarterly evaluations of him, the dashboard
 * passcode. Those are HERS, and a file arriving from a child's computer must
 * never be able to overwrite them.
 *
 * That is correct for a handoff, where the two machines already both have the
 * records and are exchanging the day's work. It is exactly wrong for a MOVE,
 * where the destination has nothing and the excluded tables are the Georgia
 * compliance file.
 *
 * So a migration file is a different thing with a different rule:
 *
 *   handoff   — what may safely travel between two computers that both have it
 *   migration — EVERYTHING, because the destination has none of it
 *
 * This module is the format and the checking. It has no Dexie in it, so the
 * rules can be tested in Node.
 */

/** Bumped only if the file format itself changes shape. */
export const MIGRATION_FORMAT = 1;

/**
 * Build the file body from raw table contents.
 *
 * @param {Record<string, object[]>} tables  table name → rows, ALL of them
 * @param {{sourceOrigin?: string, sourceDatabase?: string, dexieVersion?: number}} meta
 */
export function buildMigrationFile(tables, meta = {}) {
  const names = Object.keys(tables || {}).sort();
  const counts = {};
  let total = 0;
  for (const name of names) {
    counts[name] = (tables[name] || []).length;
    total += counts[name];
  }

  return {
    format: MIGRATION_FORMAT,
    kind: 'learningos-migration',
    exportedAt: new Date().toISOString(),
    source: {
      origin: meta.sourceOrigin ?? null,
      database: meta.sourceDatabase ?? null,
      dexieVersion: meta.dexieVersion ?? null
    },
    // The counts are written alongside the data on purpose. A file whose
    // manifest disagrees with its own contents was truncated in transit — by a
    // failed download, a full disk, an email client — and that is worth
    // catching before it is restored rather than after.
    manifest: { tableCount: names.length, totalRows: total, counts },
    tables
  };
}

/**
 * Is this actually a migration file, and is it internally consistent?
 *
 * @returns {{ok: true, file: object} | {ok: false, error: string}}
 */
export function validateMigrationFile(parsed) {
  if (!parsed || typeof parsed !== 'object') {
    return { ok: false, error: 'That file is not readable as JSON.' };
  }
  if (parsed.kind !== 'learningos-migration') {
    return {
      ok: false,
      error:
        'That is not a migration file. The daily "send my work" file is a ' +
        'different thing and leaves out your own records — use the migration ' +
        'export instead.'
    };
  }
  if (parsed.format !== MIGRATION_FORMAT) {
    return {
      ok: false,
      error: `That file is format ${parsed.format}; this app reads format ${MIGRATION_FORMAT}.`
    };
  }
  if (!parsed.tables || typeof parsed.tables !== 'object') {
    return { ok: false, error: 'The file has no tables in it.' };
  }

  const problems = manifestProblems(parsed);
  if (problems.length) {
    return {
      ok: false,
      error:
        'The file does not match its own manifest, which usually means it was ' +
        'truncated: ' + problems.slice(0, 3).join('; ')
    };
  }

  return { ok: true, file: parsed };
}

/**
 * Every disagreement between what the file says it holds and what it holds.
 * Separate from validate() so a test can assert on the list.
 */
export function manifestProblems(file) {
  const problems = [];
  const counts = file?.manifest?.counts || {};
  const tables = file?.tables || {};

  for (const [name, expected] of Object.entries(counts)) {
    const actual = (tables[name] || []).length;
    if (actual !== expected) {
      problems.push(`${name}: manifest says ${expected}, file holds ${actual}`);
    }
  }
  for (const name of Object.keys(tables)) {
    if (!(name in counts)) problems.push(`${name}: in the file but not the manifest`);
  }

  const claimed = file?.manifest?.totalRows;
  const real = Object.values(tables).reduce((n, rows) => n + (rows?.length || 0), 0);
  if (typeof claimed === 'number' && claimed !== real) {
    problems.push(`total: manifest says ${claimed}, file holds ${real}`);
  }

  return problems;
}

/**
 * ---- WHY TABLE KEYS IN THE FILE ARE PREFIXED ----
 *
 * The export takes every database at the old address, not just the school's.
 * Choosing one would mean guessing which mattered, and a household database
 * left behind is a passcode and a set of PINs lost.
 *
 * Two databases can hold a table of the same name, so keys are written as
 * `databaseName::tableName`. These two functions take them apart again.
 */

/** @returns {string[]} the databases represented in the file. */
export function databasesInFile(file) {
  const seen = new Set();
  for (const key of Object.keys(file?.tables || {})) {
    const i = key.indexOf('::');
    seen.add(i === -1 ? '(unnamed)' : key.slice(0, i));
  }
  return [...seen].sort();
}

/**
 * One database's tables, with the prefix removed, in the shape
 * summarizeSource() and the rest of the import expect.
 *
 * @returns {Record<string, object[]>}
 */
export function tablesForDatabase(file, dbName) {
  const out = {};
  for (const [key, rows] of Object.entries(file?.tables || {})) {
    const i = key.indexOf('::');
    const owner = i === -1 ? '(unnamed)' : key.slice(0, i);
    if (owner !== dbName) continue;
    out[i === -1 ? key : key.slice(i + 2)] = rows;
  }
  return out;
}

/**
 * A guess at which database in the file holds a learner's school.
 *
 * Only a starting selection for the picker — the household database is small
 * and has three tables, a school has dozens. Never used to decide anything on
 * its own, because a wrong guess that nobody is shown is how the wrong records
 * get restored.
 */
export function likeliestSchoolDatabase(file) {
  const names = databasesInFile(file);
  let best = null;
  let bestRows = -1;
  for (const name of names) {
    const rows = Object.values(tablesForDatabase(file, name)).reduce(
      (n, r) => n + (r?.length || 0),
      0
    );
    if (rows > bestRows) {
      best = name;
      bestRows = rows;
    }
  }
  return best;
}

/**
 * Tables the daily handoff would have left behind.
 *
 * Shown on the restore screen, because these are the ones a parent is most
 * likely to assume travelled and would not notice missing for months — a
 * compliance checklist is not something you look at every morning.
 *
 * ---- TAKES FLAT TABLES, NOT THE FILE ----
 *
 * The first version of this took the whole file and looked up
 * `file.tables[name]`. Keys in a file are `database::table`, so every lookup
 * missed and it returned an empty list — the reassurance the parent most needs
 * would have rendered as nothing at all, with no error anywhere. Pass the
 * output of tablesForDatabase(); the guard fails if this regresses.
 *
 * @param {Record<string, object[]>} tables  one database's tables, unprefixed
 * @param {Record<string, true|string>} handoffPolicy  EXPORT_TABLE_POLICY
 */
export function tablesTheHandoffWouldMiss(tables, handoffPolicy) {
  const source = tables || {};
  return Object.entries(handoffPolicy || {})
    .filter(([name, value]) => value !== true && (source[name] || []).length > 0)
    .map(([name, reason]) => ({ name, rows: source[name].length, reason }));
}
