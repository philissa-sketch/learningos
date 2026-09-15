// ---------------------------------------------------------------------------
// THE GUIDE SLOT ANSWERS A QUESTION. Run: node scripts/verify-slot-guide.mjs
//                                        (no ACADEMY — it checks every folder)
//
// The fault this exists to prevent:
//
//   The platform demanded a named function from every school — a `getDailyLine`
//   it destructured at module scope — and fell back to one that returned null
//   into a caller that immediately read a property off it. Three faults: a
//   school could only ever be a JavaScript module, the slot was read once
//   before a school could be switched, and a school with no lines threw instead
//   of showing none.
//
// The rule now: the platform asks `dailyLines` and owns the pick. A school
// answers with a pool (data) or with its own picker (a folder).
//
// ---- WHY THIS CALLS THE CODE INSTEAD OF READING IT ----
//
// Sections 2 to 4 hand `dailyLineFor` stand-in schools and assert what it
// ACTUALLY returned for each shape of answer. A regex over the source would
// assert the punctuation of a function whose whole value is its behaviour — and
// this repo has already paid more than once for a guard that matched text.
//
// Section 5 is the exception and is deliberately textual: "no platform file
// pulls this name out of the slot at module scope" is a fact about the SOURCE,
// and there is no behaviour to call that would reveal it.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');
const load = (rel) => import(pathToFileURL(path.join(REPO, rel)).href);

/** Comments are not code. Stripped before any textual assertion. */
const codeOnly = (src) => src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

let passed = 0;
const failures = [];
function ok(desc, cond, hint) {
  if (cond) {
    passed += 1;
    console.log('PASS  ' + desc);
  } else {
    failures.push(desc);
    console.log('FAIL  ' + desc + (hint ? `\n      ${hint}` : ''));
  }
}

const SLOT = 'src/content/slots/guide.js';
const PANEL = 'src/components/Dashboard/NovaProgressPanel.jsx';

console.log('--- 1. the slot module exists and states its question ---');

ok('the slot module is present', fs.existsSync(path.join(REPO, SLOT)),
  `${SLOT} is missing — the panel imports it, so the platform will not load`);

const slot = await load(SLOT);

ok('it names the question it asks', Array.isArray(slot.GUIDE_QUESTIONS) && slot.GUIDE_QUESTIONS.includes('dailyLines'),
  'a check cannot assert against a question the slot will not name');
ok('it exports the resolver the school calls', typeof slot.dailyLineFor === 'function');
ok('it exports the pick, so the pick can be tested', typeof slot.pickIndexForDate === 'function');

console.log('\n--- 2. a school that is DATA can answer ---');

const asStrings = slot.dailyLineFor({ dailyLines: ['only line'] }, '2026-09-15');
ok('a pool of plain strings resolves', asStrings.text === 'only line',
  `got ${JSON.stringify(asStrings)} — a parent typing a list into a form types strings`);
ok('...and an unattributed line has who = null', asStrings.who === null);

const attributed = slot.dailyLineFor(
  { dailyLines: [{ text: 'only line', who: 'A Named Person' }] }, '2026-09-15');
ok('a pool of objects carries the attribution', attributed.who === 'A Named Person');

const mixed = slot.dailyLineFor({ dailyLines: ['a', { text: 'b', who: 'c' }] }, '2026-09-15');
ok('a mixed pool is accepted rather than refused', Boolean(mixed.text));

const holed = slot.dailyLineFor({ dailyLines: ['', '   ', 'the only usable one'] }, '2026-09-15');
ok('a blank entry costs that school a line, not a silent day', holed.text === 'the only usable one',
  'an empty string in the middle of a pool must not become an empty screen');

console.log('\n--- 3. a school that is a FOLDER can still answer ---');

let calledWith = null;
const asFunction = slot.dailyLineFor(
  { getDailyLine: (d) => { calledWith = d; return { text: 'from the folder', who: null }; } },
  '2026-09-15');
ok('a folder picker is called', calledWith === '2026-09-15');
ok('...and its answer is used', asFunction.text === 'from the folder');

const dataWins = slot.dailyLineFor(
  { dailyLines: ['from the pool'], getDailyLine: () => ({ text: 'from the folder', who: null }) },
  '2026-09-15');
ok('a school answering both ways is read as data', dataWins.text === 'from the pool',
  'the pool is the answer being migrated TO — a folder that has both has finished migrating');

console.log('\n--- 4. an unanswered or unusable slot degrades, and never throws ---');

const cases = [
  ['an absent slot', undefined],
  ['a null slot', null],
  ['a slot with no answer', {}],
  ['an empty pool', { dailyLines: [] }],
  ['a pool of nothing usable', { dailyLines: ['', null, 7] }],
  ['an answer of the wrong type', { dailyLines: 42 }],
  ['a picker that returns null', { getDailyLine: () => null }],
  ['a picker that throws', { getDailyLine: () => { throw new Error('school bug'); } }]
];
for (const [label, guide] of cases) {
  let result;
  let threw = false;
  try {
    result = slot.dailyLineFor(guide, '2026-09-15');
  } catch {
    threw = true;
  }
  ok(`${label} resolves instead of throwing`, !threw,
    'a throw here reaches the shell and a child sees a school that will not open');
  ok(`...and ${label} yields empty text with who = null`,
    !threw && result && result.text === '' && result.who === null,
    `got ${JSON.stringify(result)} — every caller reads .text and .who unguarded`);
}

console.log('\n--- 5. the pick is a pick, not a re-roll ---');

const pool = Array.from({ length: 31 }, (_, i) => `line ${i}`);
const school = { dailyLines: pool };

const twice = [slot.dailyLineFor(school, '2026-09-15'), slot.dailyLineFor(school, '2026-09-15')];
ok('the same date gives the same line', twice[0].text === twice[1].text,
  'a re-roll rewrites the line mid-screen on the next render');

let inRange = true;
let distinct = new Set();
for (let d = 0; d < 366; d += 1) {
  const day = new Date(Date.UTC(2026, 0, 1 + d)).toISOString().slice(0, 10);
  const i = slot.pickIndexForDate(day, pool.length);
  if (!Number.isInteger(i) || i < 0 || i >= pool.length) inRange = false;
  distinct.add(slot.dailyLineFor(school, day).text);
}
ok('every day of a year lands inside the pool', inRange);
ok('...and a year does not speak one line', distinct.size > 1, `${distinct.size} distinct line(s)`);

ok('an empty pool has no index rather than index 0', slot.pickIndexForDate('2026-09-15', 0) < 0);
ok('a date it cannot read still yields a line', slot.pickIndexForDate(null, 31) === 0,
  'a guide that goes silent over an odd clock reading is worse than one that repeats');

console.log('\n--- 6. the platform reaches the slot through this module ---');

const panel = codeOnly(read(PANEL));

ok('the panel imports the resolver', /dailyLineFor/.test(panel) && /content\/slots\/guide\.js/.test(panel),
  'import it rather than reimplementing the two answer shapes at the call site');
ok('the panel reads the slot inside the component, not at module scope',
  /useMemo\(\s*\(\)\s*=>\s*dailyLineFor\(/.test(panel),
  'a module-scope read is evaluated once, before a school can be switched');

const LEGACY_DESTRUCTURE = /\{[^}]*\bgetDailyLine\b[^}]*\}\s*=/;
const platformSources = () => {
  const acc = [];
  const walk = (dir) => {
    for (const e of fs.readdirSync(path.join(REPO, dir), { withFileTypes: true })) {
      const rel = `${dir}/${e.name}`;
      if (rel.startsWith('src/academies')) continue;
      if (e.isDirectory()) walk(rel);
      else if (/\.jsx?$/.test(e.name)) acc.push(rel);
    }
  };
  walk('src');
  return acc;
};
const stillDestructuring = platformSources()
  .filter((f) => f !== SLOT)
  .filter((f) => LEGACY_DESTRUCTURE.test(codeOnly(read(f))));
ok('no platform file pulls the old name out of the slot itself',
  stillDestructuring.length === 0, stillDestructuring.join(', '));

console.log('\n--- 7. every Academy in this build answers usably ---');

const ACADEMIES = path.join(REPO, 'src/academies');
const folders = fs
  .readdirSync(ACADEMIES, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name)
  .filter((name) => fs.existsSync(path.join(ACADEMIES, name, 'content.js')));

ok('there is at least one content folder to check', folders.length > 0);

for (const name of folders) {
  let guide = null;
  let loadError = null;
  try {
    const mod = await load(`src/academies/${name}/content.js`);
    guide = (mod.default ?? mod).guide ?? null;
  } catch (err) {
    loadError = err.message;
  }
  ok(`${name}: its content loads`, !loadError, loadError || '');
  if (loadError) continue;

  const line = slot.dailyLineFor(guide, '2026-09-15');
  const answers = Boolean(guide && (Array.isArray(guide.dailyLines) || typeof guide.getDailyLine === 'function'));
  if (name === '_template') {
    // The template is the floor. A school created at the front door tonight
    // speaks with this and nothing else, so an unanswered template is a guide
    // that says nothing to every new Academy — the one case where silence is
    // not an acceptable degrade.
    ok('_template: the floor answers', answers, 'a new Academy would have a guide with nothing to say');
    ok('_template: and its answer produces a line', Boolean(line.text));
  } else {
    ok(`${name}: its answer is usable or absent, never broken`,
      typeof line.text === 'string' && (line.who === null || typeof line.who === 'string'),
      `resolved to ${JSON.stringify(line)}`);
  }
}

// ---------------------------------------------------------------------------

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
