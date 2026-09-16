// ---------------------------------------------------------------------------
// THE PROJECTS SLOT ANSWERS A QUESTION. Run: node scripts/verify-slot-projects.mjs
//                                          (no ACADEMY — it checks every folder)
//
// The fault this exists to prevent:
//
//   Five pools of hands-on work, named one by one, rebuilt by hand in nine
//   different places. One of the nine had already drifted — it lists four of
//   the five, so every garden project is invisible to the duplicate check that
//   list exists to perform, under a comment reading "built from the pools
//   themselves so a project added later is covered without anyone remembering
//   to update a list here."
//
//   And a school that runs pottery cannot say so. It must supply five names
//   the platform chose in advance, three of them subjects it may not teach.
//
// The rule now: the platform asks `projectPools` and never names a subject.
//
// ---- WHY MOST OF THIS CALLS THE CODE INSTEAD OF READING IT ----
//
// Sections 2 to 5 hand `projectPools` stand-in schools and assert what it
// ACTUALLY returned for each shape. Section 6 is textual on purpose: "no
// screen rebuilds the list by hand" is a fact about the SOURCE, and there is no
// behaviour to call that would reveal it.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');
const load = (rel) => import(pathToFileURL(path.join(REPO, rel)).href);
const codeOnly = (src) => src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

let passed = 0;
const failures = [];
function ok(desc, cond, hint) {
  if (cond) { passed += 1; console.log('PASS  ' + desc); }
  else { failures.push(desc); console.log('FAIL  ' + desc + (hint ? `\n      ${hint}` : '')); }
}

const SLOT = 'src/content/slots/projects.js';

console.log('--- 1. the slot module exists and states its question ---');

ok('the slot module is present', fs.existsSync(path.join(REPO, SLOT)), `${SLOT} is missing`);
const slot = await load(SLOT);
ok('it names the question it asks',
  Array.isArray(slot.PROJECT_QUESTIONS) && slot.PROJECT_QUESTIONS.includes('projectPools'));
ok('it exports the four readers the screens need',
  ['projectPools', 'allProjects', 'findProjectById', 'poolForProject'].every((n) => typeof slot[n] === 'function'));
ok('it names the legacy pools it still understands', Array.isArray(slot.LEGACY_POOLS) && slot.LEGACY_POOLS.length > 0);

const P = (id, subject) => ({ id, title: id, subject });

console.log('\n--- 2. a school that is DATA can answer ---');

const modern = { projects: { projectPools: [
  { subject: 'pottery', label: 'Pottery', items: [P('pot-1'), P('pot-2')] },
  { subject: 'fencing', label: 'Fencing', items: [P('fen-1')] }
] } };
ok('two pools resolve', slot.projectPools(modern).length === 2);
ok('...flattened to every project', slot.allProjects(modern).length === 3);
ok('...found by id across pools', slot.findProjectById(modern, 'fen-1')?.id === 'fen-1');
ok('...and the pool it came from is answerable', slot.poolForProject(modern, 'pot-2')?.label === 'Pottery');
ok('a pool with only a label still works',
  slot.projectPools({ projects: { projectPools: [{ label: 'Pottery', items: [P('p')] }] } })[0]?.subject === 'Pottery');
ok('a pool with only a subject gets a readable label',
  slot.projectPools({ projects: { projectPools: [{ subject: 'pottery', items: [P('p')] }] } })[0]?.label === 'Pottery');
ok('a pool that names nothing takes its id from its own items',
  slot.projectPools({ projects: { projectPools: [{ items: [P('p', 'pottery')] }] } })[0]?.subject === 'pottery',
  'the school stays the source of its subject ids, never a table in the platform');

console.log('\n--- 3. the schools in this build still answer, and ALL FIVE pools count ---');

/**
 * A legacy school, its items carrying the subject they always carried. The pool
 * names itself from its contents, because nothing in the platform zone may name
 * a subject — which is what verify-no-learner enforces there, and what this
 * module got wrong on its first commit.
 */
const legacy = {
  projects: {
    aerospaceProjects: [P('ae-1', 'aerospace')], scienceExperiments: [P('sci-1', 'science')],
    technologyProjects: [P('tech-1', 'technology')], roboticsProjects: [P('rb-1', 'robotics')]
  },
  electives: { gardenProjects: [P('gd-1', 'gardening')] }
};
ok('every legacy pool resolves', slot.projectPools(legacy).length === slot.LEGACY_POOLS.length,
  `${slot.projectPools(legacy).length} of ${slot.LEGACY_POOLS.length}`);
ok('THE GARDEN IS ONE OF THEM',
  slot.projectPools(legacy).some((p) => p.subject === 'gardening') && Boolean(slot.findProjectById(legacy, 'gd-1')),
  'this is the pool the hand-written list in MissionEvaluationSection leaves out');
ok('...in the order the screens used to hand-write',
  slot.projectPools(legacy).map((p) => p.subject).join(',') === 'aerospace,science,technology,robotics,gardening');
ok('a modern answer wins over a legacy one',
  slot.projectPools({ ...legacy, projects: { ...legacy.projects, projectPools: modern.projects.projectPools } }).length === 2,
  'a school that has migrated must not also get its old pools');

console.log('\n--- 4. an unanswered or unusable slot degrades, and never throws ---');

const cases = [
  ['nothing', undefined], ['null', null], ['an empty pack', {}],
  ['empty slots', { projects: {}, electives: {} }],
  ['an answer of the wrong type', { projects: { projectPools: 42 } }],
  ['a pool with no items', { projects: { projectPools: [{ subject: 'x', items: [] }] } }],
  ['a pool naming nothing, with items that declare nothing', { projects: { projectPools: [{ items: [P('a')] }] } }],
  ['items that are not objects', { projects: { projectPools: [{ subject: 'x', items: [1, null, 'a'] }] } }],
  ['items with no id', { projects: { projectPools: [{ subject: 'x', items: [{ title: 'no id' }] }] } }],
  ['a pool that is itself an array', { projects: { projectPools: [[P('a')]] } }]
];
for (const [label, content] of cases) {
  let threw = false; let r;
  try {
    r = [slot.projectPools(content), slot.allProjects(content),
         slot.findProjectById(content, 'x'), slot.poolForProject(content, 'x')];
  } catch { threw = true; }
  ok(`${label} resolves instead of throwing`, !threw,
    'a throw here reaches the shell and a child sees a school that will not open');
  ok(`...and ${label} yields an empty list, never undefined`,
    !threw && Array.isArray(r[0]) && r[0].length === 0 &&
    Array.isArray(r[1]) && r[1].length === 0 && r[2] === null && r[3] === null);
}

console.log('\n--- 5. a duplicate id is reported, never silently dropped ---');

const dup = { projects: { projectPools: [
  { subject: 'a', items: [P('x')] }, { subject: 'b', items: [P('x')] }] } };
ok('both copies survive the flatten', slot.allProjects(dup).length === 2,
  'dropping one would hide an authoring mistake this check exists to find');
ok('...and the lookup is stable — first pool wins', slot.poolForProject(dup, 'x')?.subject === 'a');

console.log('\n--- 6. no screen rebuilds the pool list by hand ---');

/**
 * THE RATCHET. Measured, not guessed: NINE files hand-listed the pools when
 * this module landed. Seven are converted — the mission
 * evaluation section, the feedback panel, the weekly view, the portfolio view,
 * the writing journal, the planner feed and the weekly plan — leaving two:
 * the dashboard and the store. Each further conversion lowers this number, which
 * may only FALL, the same mechanism as generic-debt.json.
 *
 * When it reaches 0 the five legacy names leave the mandatory inventory and
 * every Academy owes five fewer — 156 becomes 151.
 */
const HAND_LISTERS_BASELINE = 2;
const POOL_NAMES = ['aerospaceProjects', 'scienceExperiments', 'technologyProjects',
                    'roboticsProjects', 'gardenProjects'];

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

const handListers = platformSources()
  .filter((f) => f !== SLOT)
  .map((f) => ({ f, named: POOL_NAMES.filter((n) => new RegExp(`\\b${n}\\b`).test(codeOnly(read(f)))) }))
  .filter((x) => x.named.length >= 2);

ok(`at most ${HAND_LISTERS_BASELINE} files still name the pools one by one`,
  handListers.length <= HAND_LISTERS_BASELINE,
  handListers.map((x) => `${x.f} (${x.named.length})`).join('\n      ') +
    `\n      ${handListers.length} of a permitted ${HAND_LISTERS_BASELINE}. Reach the pools through ${SLOT}.`);

/**
 * THE DRIFT ITSELF. A file that names SOME of the pools but not all of them is
 * building a list that is wrong for one subject and right for the others — the
 * exact fault in MissionEvaluationSection, where four of five are listed and
 * every garden project falls out of the duplicate check.
 *
 * While a file is on the legacy path it must at least be on it completely.
 */
const partial = handListers.filter((x) => x.named.length < POOL_NAMES.length);
ok('...and none of them names only SOME of the pools',
  partial.length === 0,
  partial.map((x) => `${x.f} names ${x.named.length} of ${POOL_NAMES.length}: missing ` +
    POOL_NAMES.filter((n) => !x.named.includes(n)).join(', ')).join('\n      '));

console.log('\n--- 6b. the slot module names no subject of its own ---');

/**
 * `src/content/` is the platform zone and verify-no-learner holds it to the
 * ABSOLUTE standard: not one learner, school, guide or subject, ever. This
 * module failed that on its first commit — LEGACY_POOLS carried a subject and a
 * label per pool, which is a curriculum decision compiled into the one file the
 * whole school reaches content through.
 *
 * verify-no-learner catches it from outside. This says it again from inside,
 * next to the table, so the reason is readable at the place someone would
 * otherwise put it back.
 */
const slotSrc = read(SLOT);
const QUOTED_SUBJECT = /['"`](aerospace|herbalism|robotics|gardening|guitar|khan|socialStudies|social-studies)['"`]/;
ok('no subject id is quoted anywhere in the slot module', !QUOTED_SUBJECT.test(slotSrc),
  'a pool takes its id from its items, which the school owns');
ok('...and the legacy table carries export names and nothing else',
  slot.LEGACY_POOLS.every((p) => Object.keys(p).sort().join(',') === 'name,slot'),
  JSON.stringify(slot.LEGACY_POOLS[0]));

console.log('\n--- 7. every Academy in this build answers usably ---');

const ACADEMIES = path.join(REPO, 'src/academies');
const folders = fs.readdirSync(ACADEMIES, { withFileTypes: true })
  .filter((e) => e.isDirectory() && fs.existsSync(path.join(ACADEMIES, e.name, 'content.js')))
  .map((e) => e.name);
ok('there is at least one content folder to check', folders.length > 0);

for (const name of folders) {
  let content = null; let err = null;
  try { const mod = await load(`src/academies/${name}/content.js`); content = mod.default ?? mod; }
  catch (e) { err = e.message; }
  ok(`${name}: its content loads`, !err, err || '');
  if (err) continue;

  const pools = slot.projectPools(content);
  ok(`${name}: its answer is a usable list`,
    Array.isArray(pools) && pools.every((p) => p.subject && p.label && p.items.length),
    JSON.stringify(pools.map((p) => `${p.subject}:${p.items.length}`)));

  const seen = new Map();
  const clashes = [];
  for (const p of pools) {
    for (const i of p.items) {
      if (seen.has(i.id)) clashes.push(`${i.id} in both ${seen.get(i.id)} and ${p.subject}`);
      else seen.set(i.id, p.subject);
    }
  }
  ok(`${name}: no project id appears in two pools`, clashes.length === 0, clashes.join('; '));
}

// ---------------------------------------------------------------------------

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
