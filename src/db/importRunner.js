/**
 * ---- THE DRIVER THAT TOUCHES INDEXEDDB ----
 *
 * All of the decisions are in lib/importSchool.js, which has no Dexie in it and
 * is tested in Node. This file does the two things that need a browser: read a
 * foreign database, and write the Academy's own.
 *
 * ---- WHY THIS CONSTRUCTS ITS OWN DEXIE ----
 *
 * db.js is otherwise the only file that builds an Academy connection, and that
 * property is guarded. This is the deliberate exception, for a reason that is
 * not negotiable: **the source database's schema is unknown.** It belongs to
 * another application, possibly an older version of one, with tables and
 * indexes this platform has never heard of. `openAcademy()` would declare 35
 * versions over it and force an upgrade — writing to the one database that must
 * not be written to.
 *
 * Opened with no version declared, Dexie reads whatever schema is already
 * there. That is the only safe way to look at a file you did not write.
 *
 * ---- COPY, NEVER MUTATE ----
 *
 * Nothing in this file writes to the source. There is no cleanup step, no
 * "delete once verified", no upgrade. The original stays exactly as it is,
 * forever, and the fix for a bad import is to run it again.
 */
import Dexie from 'dexie';

/**
 * Open a database by name WITHOUT declaring a schema, so nothing is upgraded.
 *
 * @returns {Promise<{db: Dexie, tableNames: string[]}>}
 * @throws if no database of that name exists on this origin — which is the
 *         most likely mistake by a wide margin, so it says so plainly.
 */
export async function openSourceReadOnly(name) {
  const exists = await Dexie.exists(name);
  if (!exists) {
    throw new Error(
      `No database named "${name}" exists at this address. IndexedDB belongs to ` +
        `the exact URL it was created at — records saved at one address cannot ` +
        `be seen from another, even on the same computer.`
    );
  }

  const source = new Dexie(name);
  await source.open(); // no .version() call: adopt the existing schema as-is
  return { db: source, tableNames: source.tables.map((t) => t.name) };
}

/**
 * Read every table of an opened source into memory.
 *
 * A whole school's records are tens of thousands of rows of small JSON — a few
 * megabytes. Holding it in memory keeps the summary, the plan and the copy
 * working from ONE consistent read, rather than re-querying a database that
 * another tab could be writing to between steps.
 */
export async function readAllTables(sourceDb) {
  const out = {};
  for (const table of sourceDb.tables) {
    out[table.name] = await table.toArray();
  }
  return out;
}

/**
 * Write a plan's rows into the Academy's own database.
 *
 * `targetDb` is the live connection from db.js — already open, already carrying
 * this platform's schema. Tables the source has that the target does not are
 * reported rather than written: a row with nowhere to go is information, not an
 * error to swallow.
 *
 * @param {import('dexie').Dexie} targetDb
 * @param {object} plan  from buildImportPlan()
 * @param {Record<string, object[]>} sourceTables
 * @param {(progress: {table: string, done: number, total: number}) => void} [onProgress]
 */
export async function writePlan(targetDb, plan, sourceTables, rowsToCopy, onProgress) {
  const targetNames = new Set(targetDb.tables.map((t) => t.name));
  const unmatched = [];
  let done = 0;

  for (const entry of plan.tables) {
    const rows = rowsToCopy(plan, entry.name, sourceTables[entry.name] || []);
    done += 1;
    onProgress?.({ table: entry.name, done, total: plan.tables.length });

    if (!targetNames.has(entry.name)) {
      unmatched.push({ table: entry.name, rows: rows.length });
      continue;
    }
    if (rows.length === 0) continue;

    // bulkPut rather than bulkAdd: an import re-run after a failure should
    // land on the same keys rather than colliding with its own first attempt.
    await targetDb.table(entry.name).bulkPut(rows);
  }

  return { unmatched };
}

/** Read back what actually landed, for verifyCopy(). */
export async function readTargetTables(targetDb, plan) {
  const names = new Set([
    ...plan.tables.map((t) => t.name),
    ...plan.skipped.map((s) => s.name)
  ]);
  const out = {};
  for (const table of targetDb.tables) {
    if (!names.has(table.name)) continue;
    out[table.name] = await table.toArray();
  }
  return out;
}
