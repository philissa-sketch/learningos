// ---------------------------------------------------------------------------
// IMPORTING A SCHOOL DOES NOT LOSE OR INVENT A ROW.
// Run: node scripts/verify-import.mjs
//
// This guard exists because of a real event, and it re-runs that event on every
// commit.
//
// One child's ledger was found to contain 41 entries belonging to his sibling —
// 39 `petal` and 2 `seed` — arriving from an import of her file. The merge
// deduped by entry id; her ids had never been seen before, so 41 unknown rows
// were added with no error and no warning. Nothing was damaged (balances are
// computed per currency) and it took two weeks to notice.
//
// The fix that suggests itself is a constant: copy only `coin` and `credit`.
// That would fix the case that already happened and hide the next one. So the
// importer SUMMARISES first and copies only what a person explicitly ticked,
// and the tests below hold that behaviour — including the awkward part, which
// is that ticking nothing must copy nothing rather than defaulting to
// everything.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');
const codeOnly = (rel) =>
  read(rel)
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    .replace(/^\s*\/\/.*$/gm, '');

const {
  summarizeSource,
  buildImportPlan,
  rowsToCopy,
  verifyCopy,
  unfamiliarCurrencies
} = await import(REPO + '/src/lib/importSchool.js');

let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) {
    passed += 1;
    console.log('PASS  ' + label);
  } else {
    failures.push(label);
    console.log('FAIL  ' + label + (detail ? `  ${detail}` : ''));
  }
}

// --- the real case, rebuilt to the counts that were actually found ----------

function ledgerRows() {
  const rows = [];
  const push = (currency, n, note) => {
    for (let i = 0; i < n; i += 1) {
      rows.push({ entryId: `${currency}-${i}`, currency, note, at: '2026-08-16' });
    }
  };
  push('coin', 12, 'Lesson finished');
  push('credit', 7, 'Weekly challenge');
  push('petal', 39, 'Ribboned Braids');
  push('seed', 2, 'Morning warm-up');
  return rows;
}

const SOURCE = {
  ledger: ledgerRows(),
  attendance: Array.from({ length: 180 }, (_, i) => ({ date: `day-${i}` })),
  lessonProgress: Array.from({ length: 328 }, (_, i) => ({ lessonId: `l-${i}` })),
  parentNotes: [{ id: 1, text: 'private' }]
};

console.log('--- 1. the summary shows what is there, and decides nothing ---');

const summary = summarizeSource(SOURCE);
ok('every table is counted', summary.tables.length === 4, JSON.stringify(summary.tables));
ok('the total is the sum of the parts',
  summary.totalRows === 60 + 180 + 328 + 1, String(summary.totalRows));

const byCurrency = Object.fromEntries(summary.currencies.map((c) => [c.currency, c.rows]));
ok('the ledger is broken down by currency, all four of them',
  byCurrency.coin === 12 && byCurrency.credit === 7 && byCurrency.petal === 39 && byCurrency.seed === 2,
  JSON.stringify(byCurrency));

ok('each currency carries sample notes, so a count is not the only evidence',
  summary.currencies.every((c) => c.sample.length > 0),
  'a parent recognises “Ribboned Braids” faster than she recognises a number');

ok('the summary itself filters nothing',
  summary.currencies.reduce((n, c) => n + c.rows, 0) === SOURCE.ledger.length);

console.log('\n--- 2. only what was ticked travels ---');

const chosen = {
  tables: ['ledger', 'attendance', 'lessonProgress', 'parentNotes'],
  currencies: ['ledger:coin', 'ledger:credit']
};
const plan = buildImportPlan(summary, chosen);
const ledgerOut = rowsToCopy(plan, 'ledger', SOURCE.ledger);

ok('the 19 rows that belong to him travel', ledgerOut.length === 19, String(ledgerOut.length));
ok('...and all 41 that do not are left behind',
  ledgerOut.every((r) => r.currency === 'coin' || r.currency === 'credit'),
  [...new Set(ledgerOut.map((r) => r.currency))].join(','));
ok('the plan says out loud what it is leaving',
  plan.willSkipRows === 41 && plan.skipped.some((s) => s.name.includes('petal')),
  JSON.stringify(plan.skipped));
ok('the counted total matches the rows that actually copy',
  plan.willCopyRows === 19 + 180 + 328 + 1, String(plan.willCopyRows));

// The awkward property, and the one worth having.
const nothingTicked = buildImportPlan(summary, { tables: ['ledger'], currencies: [] });
ok('ticking no currency copies no ledger rows, rather than defaulting to all',
  rowsToCopy(nothingTicked, 'ledger', SOURCE.ledger).length === 0,
  'a default of "everything" is how 41 foreign rows arrived in the first place');

const unticked = buildImportPlan(summary, { tables: ['attendance'], currencies: [] });
ok('an unticked table copies nothing at all',
  rowsToCopy(unticked, 'parentNotes', SOURCE.parentNotes).length === 0);

console.log('\n--- 3. a currency nobody has heard of is surfaced, not silently dropped ---');

const strange = unfamiliarCurrencies(summary, ['coin', 'credit']);
ok('the two foreign currencies are named as unfamiliar',
  strange.length === 2 && strange.every((c) => ['petal', 'seed'].includes(c.currency)),
  strange.map((c) => c.currency).join(','));

// A currency invented after this code was written must behave the same way.
const withNewOne = summarizeSource({
  ledger: [...SOURCE.ledger, { entryId: 'x', currency: 'acorn', note: 'who knows' }]
});
ok('...and so is one that did not exist when this was written',
  unfamiliarCurrencies(withNewOne, ['coin', 'credit']).some((c) => c.currency === 'acorn'),
  'an allow-list of known currencies would have passed this one through or dropped it silently');

console.log('\n--- 4. the check after the copy actually checks ---');

const landedWell = {
  ledger: ledgerOut,
  attendance: SOURCE.attendance,
  lessonProgress: SOURCE.lessonProgress,
  parentNotes: SOURCE.parentNotes
};
ok('a correct copy verifies', verifyCopy(plan, SOURCE, landedWell).ok);

const oneRowLost = { ...landedWell, attendance: SOURCE.attendance.slice(1) };
const lost = verifyCopy(plan, SOURCE, oneRowLost);
ok('one missing row fails the check', !lost.ok && lost.problems[0].includes('attendance'),
  JSON.stringify(lost.problems));

const contaminated = { ...landedWell, ledger: SOURCE.ledger };
ok('rows that should have been left behind failing to be left behind is a failure',
  !verifyCopy(plan, SOURCE, contaminated).ok,
  'this is the exact shape of the event this guard was written for');

const skippedTable = buildImportPlan(summary, { tables: ['ledger'], currencies: ['ledger:coin'] });
const strayArrived = { ledger: rowsToCopy(skippedTable, 'ledger', SOURCE.ledger), parentNotes: [{ id: 1 }] };
ok('a table nobody selected arriving anyway is a failure',
  !verifyCopy(skippedTable, SOURCE, strayArrived).ok);

console.log('\n--- 5. copy, never mutate ---');

const runner = codeOnly('src/db/importRunner.js');
ok('the runner never writes to the source',
  !/source(Db)?\.(table\([^)]*\)\.)?(put|add|bulkPut|bulkAdd|delete|clear|update)/.test(runner),
  'there is no cleanup step and there must never be one');
ok('...and never deletes a database', !/Dexie\.delete|\.delete\(\)/.test(runner));
ok('the source is opened with no version declared',
  /await source\.open\(\)/.test(runner) && !/source\.version\(/.test(runner),
  'declaring a schema over a foreign database would upgrade — that is a write');
ok('a missing source database says why, in terms of the likely mistake',
  /IndexedDB belongs to/.test(read('src/db/importRunner.js')));

const ui = read('src/components/Academy/ImportSchool.jsx');
ok('the screen warns that records belong to one web address',
  /same web address/i.test(ui),
  'pointing a new site at a new origin is how a year of records appears to vanish');
ok('nothing is pre-ticked among the currencies',
  /setCurrencies\(new Set\(\)\)/.test(codeOnly('src/components/Academy/ImportSchool.jsx')));
ok('the result screen re-reads rather than trusting the writes',
  /readTargetTables/.test(codeOnly('src/components/Academy/ImportSchool.jsx')) &&
    /verifyCopy/.test(codeOnly('src/components/Academy/ImportSchool.jsx')));

console.log('\n--- 6. no learner or currency is named in the platform ---');

const logic = read('src/lib/importSchool.js');
ok('the importer hardcodes no currency name',
  !/'(coin|credit|petal|seed)'/.test(codeOnly('src/lib/importSchool.js')),
  'the fix for the real event was a screen, not a constant');
ok('...and no database name', !/LearningOSDB_|MissionControl/.test(codeOnly('src/lib/importSchool.js')));
ok('the reason it is a screen is written down next to the code',
  /must be shown what is in the file before it moves/i.test(logic));

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
