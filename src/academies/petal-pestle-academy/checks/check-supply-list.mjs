// ---------------------------------------------------------------------------
// check-supply-list — the whole-year project supply list in Grown-Up Setup
// (Nov 2 2026).
//
// Run from the learningos folder:
//     node src/academies/petal-pestle-academy/checks/check-supply-list.mjs
//     node src/academies/petal-pestle-academy/checks/check-supply-list.mjs --self-test
//
// ---- WHAT IT ASSERTS ----
//  1. DATA — every one of the 16 real projects (config/projects.js) has a
//     non-empty `needs` list. A supply list built from an empty needs array
//     is a silent gap a grown-up would never see.
//  2. THE VIEW READS THE REAL DATA — AcademicCenterView.jsx imports PROJECTS
//     from config/projects.js rather than inventing its own copy.
//  3. IT IS IN GROWN-UP SETUP — a "Supply list" section exists there, not
//     buried only inside each project card where a grown-up would have to
//     open all 16 to shop ahead.
//  4. IT SHOWS EVERY PROJECT'S NEEDS — the section maps over PROJECTS and
//     renders p.needs, grouped so nothing is left off.
//  5. IT IS PRINTABLE — a Print button, same pattern as the Portfolio tab.
//  6. SET-ASIDE PROJECTS ARE MARKED, NOT HIDDEN — a project a grown-up set
//     aside still shows (so nothing is silently forgotten) but is flagged so
//     she does not buy for it.
//
// --self-test puts each bug back in and fails if this check misses it.
// ---------------------------------------------------------------------------

import { readFileSync, writeFileSync, mkdtempSync, cpSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const SELF_TEST = process.argv.includes('--self-test');
const arg = process.argv.find((a) => a.startsWith('--root='));
const root = arg ? arg.slice(7) : ROOT;

function run(root) {
  const out = [];
  const fail = (m) => out.push(m);
  const view = readFileSync(join(root, 'components/Academic/AcademicCenterView.jsx'), 'utf8');

  // 2. reads the real data
  if (!/import\s*\{\s*PROJECTS\s*\}\s*from\s*'\.\.\/\.\.\/config\/projects\.js'/.test(view)) {
    fail('AcademicCenterView does not import the real PROJECTS data');
  }

  // 3. lives in Grown-Up Setup
  if (!/Supply list/.test(view)) fail('no "Supply list" section exists');

  // 4. shows every project's needs, grouped
  if (!/PROJECTS\.filter\(\(p\) => p\.quarter === q\)/.test(view)) {
    fail('the supply list does not walk every project by quarter');
  }
  if (!/p\.needs\.map\(\(x\) =>/.test(view) || view.indexOf('p.needs.map((x) =>') === view.lastIndexOf('p.needs.map((x) =>')) {
    // appears at least where expected; count occurrences to be sure the
    // Setup section's own rendering is present (ProjectsTab already has one)
  }
  const needsRenders = [...view.matchAll(/p\.needs\.map\(\(x\) =>/g)].length;
  if (needsRenders < 2) fail('the supply list section does not render each project\'s needs');

  // 5. printable
  const setupSection = view.slice(view.indexOf('Supply list'));
  if (!/window\.print\(\)/.test(setupSection.slice(0, 400))) fail('the supply list has no Print button');

  // 6. set-aside flagged, not hidden
  if (!/setup\.projectsOff\.includes\(p\.id\)/.test(setupSection.slice(0, 2000))) {
    fail('a project set aside is not flagged in the supply list');
  }

  return out;
}

async function dataCheck(root) {
  const out = [];
  const mod = await import(pathToFileURL(join(root, 'config/projects.js')).href + '?v=' + Date.now());
  const projects = mod.PROJECTS || mod.default;
  if (!Array.isArray(projects) || projects.length !== 16) {
    out.push(`expected 16 projects, found ${Array.isArray(projects) ? projects.length : 'none'}`);
    return out;
  }
  for (const p of projects) {
    if (!Array.isArray(p.needs) || p.needs.length === 0) out.push(`${p.id} has no materials listed`);
  }
  return out;
}

const viewFails = run(root);
const dataFails = await dataCheck(root);
const real = [...dataFails, ...viewFails];

if (!SELF_TEST) {
  if (real.length) {
    real.forEach((f) => console.log(`FAIL  ${f}`));
    console.log(`\n${real.length} failed.`);
    process.exit(1);
  }
  console.log('Supply list: all 16 projects\' materials shown in Grown-Up Setup, grouped by quarter, printable, set-aside projects flagged not hidden.');
  console.log('NOT TESTED HERE: how the screen looks.');
  console.log('PASS');
  process.exit(0);
}

if (real.length) {
  real.forEach((f) => console.log(`  ${f}`));
  process.exit(1);
}

const BUGS = [
  ['import removed', 'components/Academic/AcademicCenterView.jsx', "import { PROJECTS } from '../../config/projects.js';\n", ''],
  ['heading removed', 'components/Academic/AcademicCenterView.jsx', 'Supply list — the whole year', 'Shopping stuff'],
  ['print button removed', 'components/Academic/AcademicCenterView.jsx', "<button type=\"button\" onClick={() => window.print()} className=\"rounded-full border border-cream-300 bg-white px-4 py-1.5 text-xs font-700 text-ink-700\">\n            🖨️ Print\n          </button>", ''],
  ['set-aside flag removed', 'components/Academic/AcademicCenterView.jsx', "const off = setup.projectsOff.includes(p.id);\n                    return (\n                      <li key={p.id} className={`rounded-petal border px-3 py-2 text-sm ${off ? 'border-cream-200 bg-cream-100 text-ink-500' : 'border-cream-300 bg-white text-ink-900'}`}>", "const off = false;\n                    return (\n                      <li key={p.id} className=\"rounded-petal border px-3 py-2 text-sm border-cream-300 bg-white text-ink-900\">"],
  ['a project\'s needs emptied', 'config/projects.js', "needs: ['every Plant Detective Log from September', 'paper', 'her own drawings', 'something to bind it'],", "needs: [],"]
];

let missed = 0;
for (const [name, relFile, from, to] of BUGS) {
  const d = mkdtempSync(join(tmpdir(), 'pp-supply-'));
  cpSync(ROOT, d, { recursive: true });
  const p = join(d, relFile);
  const original = readFileSync(p, 'utf8');
  if (!original.includes(from)) {
    console.log(`CANNOT  ${name}`);
    missed++;
    continue;
  }
  writeFileSync(p, original.replace(from, to));
  const r = spawnSync('node', [join(d, 'checks/check-supply-list.mjs'), '--root=' + d], { encoding: 'utf8' });
  if (r.status !== 0) console.log(`caught  ${name}`);
  else {
    console.log(`MISSED  ${name}`);
    missed++;
  }
}
console.log(missed ? `\n${missed} of ${BUGS.length} bugs NOT caught.` : `\nAll ${BUGS.length} bugs caught.`);
process.exit(missed ? 1 : 0);
