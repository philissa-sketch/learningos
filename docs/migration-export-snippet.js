/* ===========================================================================
 * LEARNINGOS — MIGRATION EXPORT
 *
 * Copy this whole file, paste it into the browser console at the web address
 * the school currently lives at, and press Enter. It saves a .json file with
 * EVERY record in it.
 *
 * HOW TO OPEN THE CONSOLE
 *   Chrome / Edge on Windows:  F12, then click the "Console" tab
 *   Paste, press Enter, and wait. A file will download.
 *
 * WHY THIS IS A CONSOLE SNIPPET AND NOT A BUTTON IN THE APP
 *   Browser records belong to the exact URL that created them. To read the
 *   records at the old address, the code doing the reading has to be RUNNING at
 *   the old address. Adding a button would mean deploying a new version of the
 *   old app over a child who is using it. This reads the same data without
 *   deploying anything and without disturbing anyone.
 *
 * WHAT IT DOES NOT DO
 *   It never writes, never deletes, never upgrades. It opens each database
 *   without declaring a version — declaring one would trigger an upgrade, and
 *   an upgrade is a write to the one thing that must not be written. If a
 *   database is not already there, it stops rather than creating an empty one.
 *
 * WHAT MAKES IT DIFFERENT FROM "SEND MY WORK TO MOM"
 *   That file deliberately leaves out nine tables — your compliance checklist,
 *   your course descriptions, your notes about your son, your quarterly
 *   evaluations. Correct for a daily handoff between two computers that both
 *   already have the records. Wrong for a move, where the destination has
 *   nothing. This takes everything.
 * ======================================================================== */

(async () => {
  const FORMAT = 1;

  const listed = (await indexedDB.databases?.()) || [];
  if (!listed.length) {
    console.error(
      '%cNo databases at this address.',
      'color:#c00;font-weight:bold',
      '\nRecords belong to the exact URL that created them. Check you are on ' +
        'the address the school actually runs at.'
    );
    return;
  }

  console.log('%cDatabases found at ' + location.origin, 'font-weight:bold');
  listed.forEach((d) => console.log('   ' + d.name + '  (v' + d.version + ')'));

  // Everything at this origin travels. Choosing here would mean guessing which
  // database matters, and a household one left behind is a passcode lost.
  const out = {};
  const sources = [];

  for (const { name } of listed) {
    // No version argument: adopt whatever schema is already there.
    const db = await new Promise((resolve, reject) => {
      const req = indexedDB.open(name);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
      req.onupgradeneeded = () => {
        // Only fires if the database did not exist. Nothing to export, and we
        // must not leave a new empty one behind.
        req.transaction.abort();
        reject(new Error(`"${name}" does not exist at this address.`));
      };
    });

    const storeNames = [...db.objectStoreNames];
    if (storeNames.length) {
      const tx = db.transaction(storeNames, 'readonly');
      for (const store of storeNames) {
        out[`${name}::${store}`] = await new Promise((resolve, reject) => {
          const req = tx.objectStore(store).getAll();
          req.onsuccess = () => resolve(req.result || []);
          req.onerror = () => reject(req.error);
        });
      }
    }

    sources.push({ database: name, version: db.version, stores: storeNames.length });
    db.close();
  }

  const counts = {};
  let total = 0;
  for (const key of Object.keys(out).sort()) {
    counts[key] = out[key].length;
    total += counts[key];
  }

  const file = {
    format: FORMAT,
    kind: 'learningos-migration',
    exportedAt: new Date().toISOString(),
    source: { origin: location.origin, databases: sources },
    manifest: { tableCount: Object.keys(counts).length, totalRows: total, counts },
    tables: out
  };

  const stamp = new Date().toISOString().slice(0, 10);
  const blob = new Blob([JSON.stringify(file)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `learningos-migration-${stamp}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(a.href);

  console.log(
    '%cSaved learningos-migration-' + stamp + '.json',
    'color:#0a0;font-weight:bold'
  );
  console.log(
    `   ${total.toLocaleString()} rows across ${Object.keys(counts).length} tables, ` +
      `from ${sources.length} database(s).`
  );
  console.table(counts);
  console.log(
    '%cNothing was changed at this address.',
    'color:#666',
    'The original records are exactly as they were.'
  );
})();
