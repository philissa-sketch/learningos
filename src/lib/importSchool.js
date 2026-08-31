/**
 * ---- IMPORTING AN EXISTING SCHOOL ----
 *
 * A family may already have a school. Its records — a year of attendance,
 * grades, XP, a portfolio, a state compliance file — live in an IndexedDB
 * database under some other name. Importing means COPYING those into a new
 * Academy's own database, and it is the single most dangerous thing this
 * platform does.
 *
 * Everything decidable lives in this file as plain functions over plain data,
 * with no Dexie anywhere in it, so the rules can be tested without a browser.
 * The driver that actually touches IndexedDB is db/importRunner.js.
 *
 * ---- TWO RULES ----
 *
 * **1. Copy, never mutate.** The source database is opened for reading and is
 * never written, cleared or deleted — not at the end, not "once it verifies".
 * If the import goes wrong the original is still there, and the fix is to try
 * again rather than to recover from a backup.
 *
 * **2. Nothing is filtered silently.** A real import found 41 rows in one
 * child's ledger that belonged to a sibling — 39 `petal`, 2 `seed`, arriving
 * from an import of her file, deduped only by an entry id that did not collide.
 * Nothing was damaged, because balances are computed per currency, but the rows
 * were sitting in the wrong child's record and nobody knew for two weeks.
 *
 * The lesson is not "hardcode a currency filter". It is that **the person
 * running the import must be shown what is in the file before it moves.** So
 * this module summarises first, and copies only what was explicitly chosen. A
 * hardcoded allow-list would have fixed that one case and hidden the next one.
 */

/**
 * Tables whose rows carry a currency, and are therefore worth breaking down
 * before the copy rather than after it.
 *
 * `ledger` is the one that exists today. The list is here rather than inline so
 * that a second currency-bearing table gets the same treatment automatically.
 */
export const CURRENCY_TABLES = ['ledger'];

/** The field a currency-bearing row keeps its currency in. */
export const CURRENCY_FIELD = 'currency';

/**
 * Describe what is in a source database, without deciding anything.
 *
 * @param {Record<string, object[]>} tables  table name → rows
 * @returns {{
 *   tables: Array<{name: string, rows: number}>,
 *   currencies: Array<{table: string, currency: string, rows: number, sample: string[]}>,
 *   totalRows: number
 * }}
 */
export function summarizeSource(tables) {
  const names = Object.keys(tables || {}).sort();
  const summary = {
    tables: [],
    currencies: [],
    totalRows: 0
  };

  for (const name of names) {
    const rows = tables[name] || [];
    summary.tables.push({ name, rows: rows.length });
    summary.totalRows += rows.length;

    if (!CURRENCY_TABLES.includes(name)) continue;

    const byCurrency = new Map();
    for (const row of rows) {
      const currency = row?.[CURRENCY_FIELD] ?? '(none)';
      if (!byCurrency.has(currency)) byCurrency.set(currency, []);
      byCurrency.get(currency).push(row);
    }

    for (const [currency, group] of [...byCurrency.entries()].sort()) {
      summary.currencies.push({
        table: name,
        currency,
        rows: group.length,
        // A count alone does not tell you whose rows these are. Three notes do
        // — "Ribboned Braids" reads as someone else's the moment you see it.
        sample: group
          .slice(0, 3)
          .map((r) => (r?.note ?? r?.reason ?? '').toString().trim())
          .filter(Boolean)
      });
    }
  }

  return summary;
}

/**
 * Turn a summary plus explicit choices into a plan.
 *
 * Selections are opt-IN for currencies. A currency nobody ticked does not
 * travel — including one that appears in the source after this code was
 * written, which is the case a hardcoded allow-list gets wrong.
 *
 * @param {ReturnType<typeof summarizeSource>} summary
 * @param {{tables?: string[], currencies?: string[]}} selections
 *   `currencies` entries are "table:currency", matching the summary's rows.
 */
export function buildImportPlan(summary, selections = {}) {
  const wantedTables = new Set(
    selections.tables ?? summary.tables.map((t) => t.name)
  );
  const wantedCurrencies = new Set(selections.currencies ?? []);

  const plan = { tables: [], skipped: [], willCopyRows: 0, willSkipRows: 0 };

  for (const { name, rows } of summary.tables) {
    if (!wantedTables.has(name)) {
      plan.skipped.push({ name, rows, reason: 'not selected' });
      plan.willSkipRows += rows;
      continue;
    }

    const currencies = summary.currencies.filter((c) => c.table === name);
    if (currencies.length === 0) {
      plan.tables.push({ name, currencies: null });
      plan.willCopyRows += rows;
      continue;
    }

    const keep = currencies.filter((c) => wantedCurrencies.has(`${name}:${c.currency}`));
    const drop = currencies.filter((c) => !wantedCurrencies.has(`${name}:${c.currency}`));

    plan.tables.push({ name, currencies: keep.map((c) => c.currency) });
    plan.willCopyRows += keep.reduce((n, c) => n + c.rows, 0);

    for (const c of drop) {
      plan.skipped.push({
        name: `${name} · ${c.currency}`,
        rows: c.rows,
        reason: 'currency not selected'
      });
      plan.willSkipRows += c.rows;
    }
  }

  return plan;
}

/**
 * Apply a plan to one table's rows.
 *
 * Pure, and separate from the copy, so that what travels can be asserted in a
 * test rather than inspected in a browser afterwards.
 */
export function rowsToCopy(plan, tableName, rows) {
  const entry = plan.tables.find((t) => t.name === tableName);
  if (!entry) return [];
  if (entry.currencies === null) return rows;
  const allowed = new Set(entry.currencies);
  return rows.filter((r) => allowed.has(r?.[CURRENCY_FIELD] ?? '(none)'));
}

/**
 * Compare what was planned against what is actually in the target afterwards.
 *
 * An import that reports success without re-reading has verified nothing. This
 * runs after the copy, against a fresh read, and any mismatch is a failure even
 * when every write returned without error — a silently dropped row is exactly
 * the failure mode that took two weeks to notice last time.
 */
export function verifyCopy(plan, sourceTables, targetTables) {
  const problems = [];

  for (const entry of plan.tables) {
    const expected = rowsToCopy(plan, entry.name, sourceTables[entry.name] || []).length;
    const actual = (targetTables[entry.name] || []).length;
    if (actual !== expected) {
      problems.push(`${entry.name}: expected ${expected} rows, found ${actual}`);
    }
  }

  for (const skipped of plan.skipped) {
    // A skipped whole table must be empty in the target. A skipped CURRENCY is
    // checked by its table's count above, so it is not re-checked here.
    if (skipped.name.includes(' · ')) continue;
    const actual = (targetTables[skipped.name] || []).length;
    if (actual !== 0) {
      problems.push(`${skipped.name}: was not selected, but ${actual} rows arrived`);
    }
  }

  return { ok: problems.length === 0, problems };
}

/**
 * A currency the importer has never been told about.
 *
 * Used to draw attention in the UI rather than to decide anything: a currency
 * that is not one of the Academy's own is the shape the contamination took, and
 * it is worth a second look before it is ticked.
 */
export function unfamiliarCurrencies(summary, knownCurrencies = []) {
  const known = new Set(knownCurrencies);
  return summary.currencies.filter((c) => !known.has(c.currency));
}
