// ---------------------------------------------------------------------------
// WHAT THE SCHOOL ASKS AN ACADEMY FOR. Run: node scripts/scan-content-needs.mjs
//
// Writes scripts/academy-content-needs.json — the list of names the school
// reaches into an Academy folder for, and the slots the platform defines.
//
// ---- WHY THIS IS SCANNED AND NOT TYPED ----
//
// It is the contract's inventory, and an inventory maintained by hand is a
// document that disagrees with the code within a week. Generated, it can be
// re-run after any change and diffed: a name appearing here that nobody
// expected is a school file reaching for content it should not need.
//
// ---- WHY IT PARSES RATHER THAN GREPS ----
//
// Import clauses in this codebase run across several lines, and a regex over
// them silently mis-splits names — an earlier count using one was wrong by 81.
// Every specifier here is read from the syntax tree, and every path is resolved
// to a real file on disk rather than matched as a string, because the number of
// `../` segments depends on how deep the importing file sits.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parse } from '@babel/parser';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(REPO, 'src');
const ACADEMIES = path.join(SRC, 'academies');

/**
 * Which slot a path inside an Academy folder belongs to.
 *
 * Ordered — the first match wins, so specific paths sit above general ones.
 *
 * This lives here, in the scan, rather than in the manifest generator, because
 * three things need to agree about it: the manifest that fills a slot, the
 * school files that read one, and this inventory. Two copies of a mapping is
 * one copy too many.
 */
export const SLOT_RULES = [
  [/^subjects\.js$/, 'subjects'],
  [/^data\/lessons\//, 'lessons'],
  [/^data\/socialStudies\//, 'lessons'],
  [/^data\/diagnostic\//, 'placement'],
  [/^data\/schedule\//, 'timetable'],
  [/^data\/mentor\//, 'guide'],
  [/^data\/exams\//, 'exams'],
  [/^data\/writing\//, 'writing'],
  [/^data\/khan\//, 'khanSequences'],
  [/^data\/pe\//, 'pe'],
  [/^data\/guitar\//, 'electives'],
  [/^data\/gardening\//, 'electives'],
  [/^data\/games\//, 'games'],
  [/^data\/academicSuccessCenter\//, 'academicCenter'],
  [/^data\/admin\//, 'compliance'],
  [/^data\/(aerospace|robotics|technology|science)\//, 'projects'],
  [/^data\/rewardCatalog\.js$/, 'rewards'],
  [/^data\/hqCrew\.js$/, 'rewards'],
  [/^data\/printouts\.js$/, 'rewards']
];

export const slotFor = (rel) => SLOT_RULES.find(([re]) => re.test(rel))?.[1] ?? null;

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (/\.jsx?$/.test(entry.name)) acc.push(full);
  }
  return acc;
}

/** Resolve a relative specifier the way the bundler will. */
function resolve(fromFile, spec) {
  if (!spec.startsWith('.')) return null;
  const base = path.resolve(path.dirname(fromFile), spec);
  for (const candidate of [base, `${base}.js`, `${base}.jsx`, path.join(base, 'index.js')]) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate;
  }
  return null;
}

/**
 * registry.js sits in src/academies/ but is PLATFORM, not content — it holds
 * the naming rules that turn an Academy id into a database name and nothing
 * about anybody's curriculum. scripts/verify-no-learner.mjs carves out the same
 * exception when it decides zones, and the two must agree: counting it as
 * content put four platform helpers on the list of things every Academy has to
 * supply.
 */
const REGISTRY = path.join(ACADEMIES, 'registry.js');
const isAcademyFile = (abs) => abs && abs.startsWith(ACADEMIES + path.sep) && abs !== REGISTRY;

/**
 * Everything below runs only when this file is invoked directly.
 *
 * The manifest generator imports `slotFor` from here so the two cannot disagree
 * about slots. Without this guard that import would re-run the whole scan as a
 * side effect of asking one question.
 */
export function scan({ quiet = false } = {}) {
// School files only. An Academy importing its own files is not the school
// reaching for content, and counting those inflated an earlier estimate by 29.
const schoolFiles = walk(SRC).filter((f) => !f.startsWith(ACADEMIES + path.sep));

const names = new Set();
const byFile = {};
/**
 * Which module each name is wanted FROM, keyed relative to the Academy folder.
 *
 * Matching by name alone is not good enough, and this codebase proves it: two
 * different files in one Academy both export `isSchoolDay`, with two different
 * implementations. A manifest built by name would have imported both, which is
 * a duplicate binding and not even valid JavaScript — and if it had somehow
 * loaded, one of them would silently have won and started answering questions
 * about attendance.
 */
const byModule = {};
let statements = 0;
let cssImports = 0;

for (const file of schoolFiles) {
  let ast;
  try {
    ast = parse(fs.readFileSync(file, 'utf8'), {
      sourceType: 'module',
      plugins: ['jsx', 'importAssertions', 'topLevelAwait']
    });
  } catch (error) {
    throw new Error(`${path.relative(REPO, file)}: ${error.message}`);
  }
  for (const node of ast.program.body) {
    if (node.type !== 'ImportDeclaration') continue;
    const spec = node.source.value;

    if (spec.endsWith('.css')) {
      if (isAcademyFile(path.resolve(path.dirname(file), spec))) cssImports += 1;
      continue;
    }
    const target = resolve(file, spec);
    if (!isAcademyFile(target)) continue;

    statements += 1;
    const rel = path.relative(SRC, file).split(path.sep).join('/');
    // Relative to the Academy folder, so the shape describes any Academy
    // rather than the one that happens to be here.
    const insideAcademy = path
      .relative(ACADEMIES, target)
      .split(path.sep)
      .slice(1)
      .join('/');

    byFile[rel] = byFile[rel] || [];
    byModule[insideAcademy] = byModule[insideAcademy] || [];

    const taken = [];
    for (const s of node.specifiers) {
      if (s.type !== 'ImportSpecifier') {
        throw new Error(
          `${rel} uses a default or namespace import from an Academy folder ` +
            '— the manifest carries named exports only.'
        );
      }
      const imported = s.imported.name ?? s.imported.value;
      names.add(imported);
      taken.push(imported);
      if (!byModule[insideAcademy].includes(imported)) byModule[insideAcademy].push(imported);
    }
    byFile[rel].push({ module: insideAcademy, names: taken, local: node.specifiers.map((s) => s.local.name) });
  }
}

for (const list of Object.values(byModule)) list.sort();

/**
 * Which slot each imported name lives in.
 *
 * This is the map the import rewrite is driven by, and the reason it is derived
 * rather than typed: a name that cannot be placed in a slot is a school file
 * reaching for content the contract has no room for, and it should stop the
 * run rather than be quietly dropped.
 */
const nameToSlot = {};
const unslotted = [];
for (const [mod, list] of Object.entries(byModule)) {
  const slot = slotFor(mod);
  if (!slot) {
    unslotted.push(mod);
    continue;
  }
  for (const n of list) {
    if (nameToSlot[n] && nameToSlot[n] !== slot) {
      throw new Error(
        `"${n}" is wanted from two different slots (${nameToSlot[n]} and ${slot}). ` +
          'One name cannot mean two things to the school.'
      );
    }
    nameToSlot[n] = slot;
  }
}
if (unslotted.length) {
  throw new Error(
    `No slot for: ${unslotted.join(', ')}\n` +
      'Add a rule to SLOT_RULES, or the school is reaching for content the contract has no room for.'
  );
}

// The slot list is read from the platform's own file rather than repeated here,
// so the two can never disagree.
const contentModule = fs.readFileSync(path.join(SRC, 'content/academyContent.js'), 'utf8');
const slots = contentModule
  .match(/CONTENT_SLOTS = Object\.freeze\(\[([\s\S]*?)\]\)/)[1]
  .match(/'[A-Za-z]+'/g)
  .map((s) => s.replace(/'/g, ''));

const out = {
  _generated: 'scripts/scan-content-needs.mjs — do not edit by hand',
  _why: 'The names the school reaches into an Academy folder for. Every one must appear in every Academy manifest that fills that slot.',
  slots,
  files: Object.keys(byFile).length,
  statements,
  cssImports,
  names: [...names].sort(),
  nameToSlot,
  byModule,
  byFile
};

fs.writeFileSync(path.join(REPO, 'scripts/academy-content-needs.json'), `${JSON.stringify(out, null, 1)}\n`);

if (!quiet) {
  console.log(`${out.files} school files reach into an Academy`);
  console.log(`${statements} import statements, ${out.names.length} distinct names`);
  console.log(`${cssImports} stylesheet import(s)`);
  console.log(`${slots.length} slots: ${slots.join(', ')}`);
  console.log('wrote scripts/academy-content-needs.json');
}
return out;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) scan();
