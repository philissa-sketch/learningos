#!/usr/bin/env node
// ---------------------------------------------------------------------------
// run-checks.mjs — the build gate. (Audit finding 3, Sept 17, 2026.)
//
// WHY: until now `prebuild` ran exactly one check, so a red check could not
// stop a release. That is how the 6 September regression shipped. This runs
// every scripts/verify-*.mjs for every gated Academy and exits 1 on any red
// that is not on the known-red list, which stops `npm run build` — on this
// computer and on Netlify alike. A failed Netlify build publishes nothing;
// the site stays on the last good version.
//
// WHAT IT READS: scripts/build-gate.json
//   gatedAcademies — the Academy folders the gate checks. It sets ACADEMY
//                    itself, so no build environment variable is needed.
//   knownRed       — reds that are allowed for now, each with a reason and
//                    the step that clears it.
//
// THE RATCHET (same rule as generic-debt.json): the known-red list may
// shrink and must never grow.
//   * more entries than KNOWN_RED_BASELINE            -> red
//   * an entry whose check now PASSES                  -> red (remove it)
//   * an entry naming a check file that does not exist -> red
//   * a gated Academy with no folder                   -> red
// When an entry is removed, lower KNOWN_RED_BASELINE in the same commit.
//
// This file must never be named verify-*.mjs, or RUN-THE-CHECKS.bat would
// run it inside its own loop.
// ---------------------------------------------------------------------------

import { spawnSync } from 'node:child_process';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const KNOWN_RED_BASELINE = 1;

const SCRIPTS = dirname(fileURLToPath(import.meta.url));
const ROOT = join(SCRIPTS, '..');
const ACADEMIES_DIR = join(ROOT, 'src', 'academies');
const TAIL_LINES = 40;

const problems = [];
const gate = JSON.parse(readFileSync(join(SCRIPTS, 'build-gate.json'), 'utf8'));
const gated = Array.isArray(gate.gatedAcademies) ? gate.gatedAcademies : [];
const knownRed = Array.isArray(gate.knownRed) ? gate.knownRed : [];

if (gated.length === 0) problems.push('build-gate.json names no gated Academy — the gate would check nothing.');
if (knownRed.length > KNOWN_RED_BASELINE) {
  problems.push(`known-red list has ${knownRed.length} entries; the baseline is ${KNOWN_RED_BASELINE}. The list may shrink, never grow.`);
}

const checks = readdirSync(SCRIPTS)
  .filter((f) => /^verify-.*\.mjs$/.test(f))
  .sort()
  .map((f) => f.replace(/\.mjs$/, ''));

for (const k of knownRed) {
  if (!checks.includes(k.check)) problems.push(`known-red names "${k.check}", which is not a check in scripts/.`);
  if (!gated.includes(k.academy)) problems.push(`known-red entry "${k.check}" names Academy "${k.academy}", which the gate does not check.`);
  if (!k.reason || !k.clearsAt) problems.push(`known-red entry "${k.check}" must give a reason and clearsAt.`);
}

const isKnownRed = (check, academy) => knownRed.some((k) => k.check === check && k.academy === academy);

const started = Date.now();
let passed = 0;
const newRed = [];
const allowedRed = [];

for (const academy of gated) {
  if (!existsSync(join(ACADEMIES_DIR, academy))) {
    problems.push(`gated Academy "${academy}" has no folder under src/academies.`);
    continue;
  }
  console.log(`\n=== build gate: ${checks.length} checks, ACADEMY=${academy} ===`);
  for (const check of checks) {
    const t0 = Date.now();
    const r = spawnSync(process.execPath, [join(SCRIPTS, `${check}.mjs`)], {
      cwd: ROOT,
      env: { ...process.env, ACADEMY: academy },
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024,
    });
    const secs = ((Date.now() - t0) / 1000).toFixed(1);
    const ok = r.status === 0 && !r.error;
    const known = isKnownRed(check, academy);

    if (ok && known) {
      console.log(`  pass*  ${check}  (${secs}s)  — on the known-red list but now passes`);
      problems.push(`"${check}" (${academy}) now passes. Remove it from build-gate.json and lower KNOWN_RED_BASELINE.`);
      passed++;
    } else if (ok) {
      console.log(`  pass   ${check}  (${secs}s)`);
      passed++;
    } else if (known) {
      console.log(`  red    ${check}  (${secs}s)  — known red, allowed`);
      allowedRed.push(`${check} (${academy})`);
    } else {
      console.log(`  FAIL   ${check}  (${secs}s)`);
      const out = `${r.stdout || ''}${r.stderr || ''}${r.error ? String(r.error) : ''}`.trimEnd().split('\n');
      for (const line of out.slice(-TAIL_LINES)) console.log(`         | ${line}`);
      newRed.push(`${check} (${academy})`);
    }
  }
}

const total = ((Date.now() - started) / 1000).toFixed(0);
console.log('\n=== build gate summary ===');
console.log(`passed      : ${passed}`);
console.log(`known red   : ${allowedRed.length}${allowedRed.length ? '  ' + allowedRed.join(', ') : ''}`);
console.log(`NEW red     : ${newRed.length}${newRed.length ? '  ' + newRed.join(', ') : ''}`);
console.log(`gate issues : ${problems.length}`);
for (const p of problems) console.log(`  - ${p}`);
console.log(`time        : ${total}s`);

if (newRed.length || problems.length) {
  console.log('\nBUILD STOPPED. Nothing was published.\n');
  process.exit(1);
}
console.log('\nGate green. Building.\n');
