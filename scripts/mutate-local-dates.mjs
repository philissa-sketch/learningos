// ---------------------------------------------------------------------------
// MUTATION TEST FOR THE LOCAL-DATE FIXES. Run: node scripts/mutate-local-dates.mjs
//
// ---- WHY ----
//
// Three date fixes landed on Aug 29, 2026, and a green suite afterwards proves
// nothing on its own: two of the three only misbehave at particular times of day
// or particular weeks of the year, which is exactly how they survived for months
// in the first place.
//
//   1. verify-guitar seeded dates with toISOString (UTC) and asserted against a
//      streak counter that uses toDateStr (local). Red every night after 8pm
//      Eastern — the hours she and Lamar actually use the app.
//   2. verify-gardening measured the gap between Fridays by dividing
//      milliseconds, which is 7 days ± an hour across the two daylight-saving
//      boundaries. Red twice a year, in her own timezone.
//   3. verify-local-dates only scanned src/, so the rule that exists to catch
//      exactly bug 1 did not cover the file carrying it.
//
// So each fix is reverted here, in a throwaway copy, and the suite has to notice.
// A fix whose guard cannot tell it was undone is a fix waiting to be undone.
//
// Deliberately run under a FIXED timezone and a FIXED fake clock where the bug
// is live, so this script gives the same answer at 9am as it does at 9pm.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/**
 * 01:30 UTC is 21:30 the previous evening in New York — inside the window where
 * UTC and local disagree about the date. Every run below is pinned here, so the
 * result does not depend on when someone happens to run it.
 */
const FAKE_NOW = '2026-09-16T01:30:00Z'; // 9:30pm Tue Sep 15 in America/New_York

/** A loader that freezes Date.now() and `new Date()` at FAKE_NOW. */
const CLOCK = `
const REAL = Date;
const FIXED = new REAL(${JSON.stringify(FAKE_NOW)}).getTime();
class FrozenDate extends REAL {
  constructor(...args) { if (args.length === 0) super(FIXED); else super(...args); }
  static now() { return FIXED; }
}
globalThis.Date = FrozenDate;
`;

const MUTATIONS = [
  {
    name: 'verify-guitar goes back to seeding its dates in UTC',
    file: 'scripts/verify-guitar.mjs',
    from: '  return toDateStr(d);',
    to: '  return d.toISOString().slice(0, 10);',
    suite: 'scripts/verify-guitar.mjs',
    tz: 'America/New_York',
    clock: true,
    expect: 'streak of 3'
  },
  {
    name: 'verify-gardening goes back to dividing milliseconds',
    file: 'scripts/verify-gardening.mjs',
    from: 'const dayNumber = (dateStr) => Math.round(Date.parse(dateStr + \'T00:00:00Z\') / 86400000);\nconst gaps = dates.slice(1).map((d, i) => dayNumber(d) - dayNumber(dates[i]));',
    to: "const gaps = dates.slice(1).map((d, i) => (new Date(d + 'T12:00:00') - new Date(dates[i] + 'T12:00:00')) / 86400000);",
    suite: 'scripts/verify-gardening.mjs',
    tz: 'America/New_York',
    clock: false,
    expect: 'no Friday is missing'
  },
  {
    name: 'a guard starts reading the clock and formatting it as UTC',
    file: 'scripts/verify-typing.mjs',
    from: 'import fs from',
    to: "const _bad = new Date().toISOString().slice(0, 10);\nimport fs from",
    suite: 'scripts/verify-local-dates.mjs',
    tz: 'America/New_York',
    clock: false,
    expect: 'asks UTC what day it is'
  },
  {
    name: 'the local-date rule stops covering the guards',
    file: 'scripts/verify-local-dates.mjs',
    from: '    if (isExempt(rel)) return false;',
    to: '    return false;',
    // With the rule disabled, plant the offence too — otherwise there is
    // nothing for the disabled rule to have missed.
    also: {
      file: 'scripts/verify-typing.mjs',
      from: 'import fs from',
      to: "const _bad = new Date().toISOString().slice(0, 10);\nimport fs from"
    },
    suite: 'scripts/verify-local-dates.mjs',
    tz: 'America/New_York',
    clock: false,
    expect: 'asks UTC what day it is',
    invert: true // this mutation should make the suite MISS the offence
  }
];

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'hq-dates-'));
fs.cpSync(path.join(REPO, 'src'), path.join(tmp, 'src'), { recursive: true });
fs.cpSync(path.join(REPO, 'scripts'), path.join(tmp, 'scripts'), { recursive: true });
fs.cpSync(path.join(REPO, 'package.json'), path.join(tmp, 'package.json'));
if (fs.existsSync(path.join(REPO, 'node_modules'))) {
  try { fs.symlinkSync(path.join(REPO, 'node_modules'), path.join(tmp, 'node_modules'), 'dir'); } catch { /* best effort */ }
}
fs.writeFileSync(path.join(tmp, 'clock.mjs'), CLOCK);

function run(suite, { tz, clock }) {
  const args = clock ? ['--import', path.join(tmp, 'clock.mjs'), path.join(tmp, suite)] : [path.join(tmp, suite)];
  try {
    const out = execFileSync('node', args, { encoding: 'utf8', env: { ...process.env, TZ: tz } });
    return { failed: false, out };
  } catch (e) {
    return { failed: true, out: (e.stdout || '') + (e.stderr || '') };
  }
}

let bad = 0;

for (const m of MUTATIONS) {
  const files = [{ file: m.file, from: m.from, to: m.to }].concat(m.also ? [m.also] : []);
  const originals = files.map((f) => ({
    path: path.join(tmp, f.file),
    text: fs.readFileSync(path.join(tmp, f.file), 'utf8')
  }));

  // Baseline for THIS mutation's suite, under THIS mutation's clock and zone.
  const before = run(m.suite, m);
  if (before.failed) {
    console.log(`BASELINE RED  ${m.name}  — ${m.suite} already fails unmutated under TZ=${m.tz}${m.clock ? ' at the frozen clock' : ''}`);
    console.log('        ' + before.out.split('\n').filter((l) => l.startsWith('FAIL')).join('\n        '));
    bad += 1;
    continue;
  }

  let applied = true;
  files.forEach((f, i) => {
    if (!originals[i].text.includes(f.from)) applied = false;
    else fs.writeFileSync(originals[i].path, originals[i].text.replace(f.from, f.to));
  });

  if (!applied) {
    console.log(`SKIP  ${m.name}  — the text this mutation edits is not there any more`);
    originals.forEach((o) => fs.writeFileSync(o.path, o.text));
    bad += 1;
    continue;
  }

  const after = run(m.suite, m);
  originals.forEach((o) => fs.writeFileSync(o.path, o.text));

  const noticed = after.failed && after.out.split('\n').some((l) => l.startsWith('FAIL') && l.includes(m.expect));

  if (m.invert) {
    // Here the mutation disables the RULE, so the suite going quiet is the
    // proof that the rule was the thing doing the work.
    if (!noticed) console.log(`KILLED  ${m.name}  (the offence sailed through once the rule stopped looking)`);
    else { console.log(`SURVIVED  ${m.name}  — something else caught it, so this rule is not what protects the tree`); bad += 1; }
  } else if (noticed) {
    console.log(`KILLED  ${m.name}`);
  } else if (after.failed) {
    console.log(`WRONG   ${m.name}  — failed, but not on "${m.expect}"`);
    console.log('        ' + after.out.split('\n').filter((l) => l.startsWith('FAIL')).join('\n        '));
    bad += 1;
  } else {
    console.log(`SURVIVED  ${m.name}  — nothing noticed. The fix is not guarded.`);
    bad += 1;
  }
}

fs.rmSync(tmp, { recursive: true, force: true });

console.log(`\n${MUTATIONS.length - bad}/${MUTATIONS.length} mutations killed`);
if (bad) {
  console.log(`\n${bad} PROBLEM(S)`);
  process.exitCode = 1;
} else {
  console.log('\nALL THREE DATE FIXES ARE GUARDED');
}
