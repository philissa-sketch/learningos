// ---------------------------------------------------------------------------
// check-games-guide — the Review games guide is in the Grown-Up Corner
// (Sept 30 2026).
//
// Run from the learningos folder:
//     node src/academies/petal-pestle-academy/checks/check-games-guide.mjs
//     node src/academies/petal-pestle-academy/checks/check-games-guide.mjs --self-test
//
// Gigi: "can you create a guide … so I don't forget the steps" — "No, put it
// in the Grown-up corner."
//
// ASSERTS: the Grown-Up Corner's Her day group has a Review games section and
// the screen shows the guide there; the week is one site a day (Mon Kahoot,
// Tue Blooket, Wed Gimkit, Thu Kahoot test prep, Fri Blooket redo) — the
// routine she chose; there are upload steps for all three sites; it can be
// printed; and the Monday step names the real export button.
// ---------------------------------------------------------------------------

import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { tmpdir } from 'node:os';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const SELF_TEST = process.argv.includes('--self-test');
const SRC = { nav: 'config/navigation.js', panel: 'components/Parent/GamesGuidePanel.jsx', parent: 'components/Parent/ParentDashboard.jsx' };
const read = (rel) => readFileSync(join(ROOT, rel), 'utf8');

let tmp = null;
let n = 0;
async function loadModule(rel, source) {
  tmp = tmp || mkdtempSync(join(tmpdir(), 'pp-games-'));
  const dir = dirname(join(ROOT, rel));
  const fixed = source.replace(/from\s+'(\.{1,2}\/[^']+)'/g, (_, p) => `from '${pathToFileURL(resolve(dir, p)).href}'`);
  const file = join(tmp, `m${n++}.mjs`);
  writeFileSync(file, fixed);
  return import(pathToFileURL(file).href);
}

/** The panel's data, without React: the two exported arrays only. */
function panelData(src) {
  const start = src.indexOf('export const GAME_WEEK');
  const end = src.indexOf('const card =');
  return src.slice(start, end);
}

async function run(src) {
  const out = [];
  const fail = (m) => out.push(m);
  const nav = await loadModule(SRC.nav, src.nav);
  const day = nav.PARENT_NAV.find((g) => g.id === 'day');
  if (!day || !day.sections.some((s) => s.id === 'games' && /review games/i.test(s.label))) fail('the Grown-Up Corner has no Review games section under Her day');
  if (!nav.ALL_PARENT_VIEWS.includes('games')) fail('Review games cannot be opened');
  if (!/import \{ GamesGuidePanel \} from '\.\/GamesGuidePanel\.jsx';/.test(src.parent) || !/\{tab === 'games' && <GamesGuidePanel \/>\}/.test(src.parent)) fail('the Review games section shows nothing');
  const data = await loadModule(SRC.panel, panelData(src.panel));
  const week = data.GAME_WEEK.map((d) => `${d.day}:${d.site}`).join(',');
  if (week !== 'Monday:Kahoot,Tuesday:Blooket,Wednesday:Gimkit,Thursday:Kahoot,Friday:Blooket') fail(`the week is not one site a day as chosen (got ${week})`);
  const thu = data.GAME_WEEK.find((d) => d.day === 'Thursday');
  if (!/test/i.test(thu?.game || '') || !/before the test/i.test(thu?.holds || '')) fail('Thursday is not the test-prep game played before the test');
  for (const s of ['Kahoot', 'Blooket', 'Gimkit']) {
    const u = data.UPLOAD_STEPS.find((x) => x.site === s);
    if (!u || u.steps.length < 3) fail(`no upload steps for ${s}`);
  }
  if (!/onClick=\{\(\) => window\.print\(\)\}/.test(src.panel)) fail('the guide cannot be printed');
  if (!/Export \/ download backup/.test(src.panel) || !/Export \/ download backup/.test(src.parent)) fail('the Monday step names an export button the Grown-Up Corner does not have');
  return out;
}

const BUGS = [
  ['no section', 'nav', "      { id: 'games', label: 'Review games' }\n", ''],
  ['section shows nothing', 'parent', "        {tab === 'games' && <GamesGuidePanel />}\n", ''],
  ['rotation changed', 'panel', "{ day: 'Wednesday', site: 'Gimkit'", "{ day: 'Wednesday', site: 'Kahoot'"],
  ['test prep after the test', 'panel', 'Play it BEFORE the test.', 'Play it after.'],
  ['no Gimkit steps', 'panel', "{ site: 'Gimkit', file: '.csv', steps: ['Log in and choose New Kit.', 'Choose Import from Spreadsheet.', 'Pick the .csv file for today.', 'Save, then start a solo game.'] }", "{ site: 'Gimkit', file: '.csv', steps: [] }"],
  ['no print button', 'panel', 'onClick={() => window.print()}', 'onClick={() => {}}']
];

const real = await run({ nav: read(SRC.nav), panel: read(SRC.panel), parent: read(SRC.parent) });
if (!SELF_TEST) {
  if (real.length) {
    real.forEach((f) => console.log(`FAIL  ${f}`));
    process.exit(1);
  }
  console.log('Grown-Up Corner → Her day → Review games: the weekly routine, one site a day, upload steps for all three sites, printable.');
  console.log('NOT TESTED HERE: how the screen looks.');
  console.log('PASS');
  process.exit(0);
}
if (real.length) {
  real.forEach((f) => console.log(`  ${f}`));
  process.exit(1);
}
let missed = 0;
for (const [name, k, from, to] of BUGS) {
  const src = { nav: read(SRC.nav), panel: read(SRC.panel), parent: read(SRC.parent) };
  if (!src[k].includes(from)) {
    console.log(`CANNOT  ${name}`);
    missed++;
    continue;
  }
  src[k] = src[k].replace(from, to);
  const out = await run(src);
  if (out.length) console.log(`caught  ${name}  →  ${out[0]}`);
  else {
    console.log(`MISSED  ${name}`);
    missed++;
  }
}
console.log(missed ? `\n${missed} of ${BUGS.length} bugs NOT caught.` : `\nAll ${BUGS.length} bugs caught.`);
process.exit(missed ? 1 : 0);
