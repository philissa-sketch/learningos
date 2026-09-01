// ---------------------------------------------------------------------------
// WHAT THE SCHOOL ASKS AN ACADEMY FOR. Run: node scripts/scan-content-needs.mjs
//
// Writes scripts/academy-content-needs.json — every name the school reads out
// of an Academy, and which slot it reads it from. That file is the contract's
// inventory, and the manifest generator builds each Academy's content.js from it.
//
// ---- THE TRAP THIS FILE WALKED INTO ONCE ----
//
// The first version scanned for imports that pointed INTO an Academy folder:
//
//   import { WEEK_PATTERN } from '../academies/<id>/data/schedule/weekPattern.js';
//
// That was the right question before C1 and the wrong one immediately after,
// because C1's whole purpose was to remove every one of those imports. Re-run
// after the migration it found zero, wrote an empty inventory, and the
// generator faithfully produced an empty manifest — a school with no
// curriculum, from a tool reporting success.
//
// It now reads the shape the school actually uses:
//
//   const { WEEK_PATTERN, isSchoolDay } = academyContent().timetable;
//
// The legacy form is still counted, and any remaining one is reported, because
// a static import into an Academy folder is a C1 regression rather than a
// normal state.
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
 * Used by the manifest generator to decide where a module's exports belong.
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
  [/^data\/printouts\.js$/, 'rewards'],

  // ---- A SECOND ACADEMY, LAID OUT ITS OWN WAY ----
  //
  // These rules exist because the ones above were derived from a single
  // folder, and a rule list written against one Academy is a rule list only
  // that Academy can satisfy. Nothing below renames a slot: the slots are the
  // platform's, and these say only which of one folder's paths answers to
  // which. That is exactly the adapting a manifest is for.
  //
  // Note `data/movement/` -> `pe`. The slot is PE because PE is what this
  // platform calls it; the folder is `movement` because that is what its
  // author called it. A folder name is not a vocabulary change.
  [/^data\/assessments\//, 'exams'],
  [/^data\/reading\//, 'exams'],
  [/^data\/herbs\//, 'electives'],
  [/^data\/movement\//, 'pe'],
  [/^data\/journal\//, 'writing'],
  [/^data\/words\//, 'writing'],
  [/^data\/standards\//, 'compliance'],
  [/^data\/rewards\//, 'rewards'],
  [/^data\/skillsCatalog\.js$/, 'subjects'],

  // `config/` is this Academy's equivalent of the loose files above — the
  // small decisions a school makes about itself. Three of its files are NOT
  // mapped on purpose: navigation.js, senders.js and buildStamp.js are that
  // app's own shell, not its curriculum, and a slot rule for them would put
  // one school's furniture into the contract.
  [/^config\/strands\.js$/, 'subjects'],
  [/^config\/curriculumPlan\.js$/, 'subjects'],
  [/^config\/schedule\.js$/, 'timetable'],
  [/^config\/calendar\.js$/, 'timetable'],
  [/^config\/assessment\.js$/, 'exams'],
  [/^config\/evidence\.js$/, 'compliance'],
  [/^config\/projects\.js$/, 'projects'],
  [/^config\/room\.js$/, 'rewards']
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

function resolve(fromFile, spec) {
  if (!spec.startsWith('.')) return null;
  const base = path.resolve(path.dirname(fromFile), spec);
  for (const c of [base, `${base}.js`, `${base}.jsx`, path.join(base, 'index.js')]) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
  }
  return null;
}

// registry.js sits in src/academies/ but is PLATFORM, not content. The zone
// check in verify-no-learner.mjs carves out the same exception, and the two
// must agree: counting it as content put four platform helpers on the list of
// things every Academy has to supply.
const REGISTRY = path.join(ACADEMIES, 'registry.js');
const isAcademyFile = (abs) => abs && abs.startsWith(ACADEMIES + path.sep) && abs !== REGISTRY;

/** `const { A, B: c } = academyContent().slot;` — the shape the school uses. */
const SLOT_READ = /const \{([^}]*)\} = academyContent\(\)\.(\w+);/g;

export function scan({ quiet = false } = {}) {
  const schoolFiles = walk(SRC).filter((f) => !f.startsWith(ACADEMIES + path.sep));

  const nameToSlot = {};
  const byFile = {};
  const conflicts = [];
  const legacyImports = [];
  let reads = 0;

  for (const file of schoolFiles) {
    const source = fs.readFileSync(file, 'utf8');
    const rel = path.relative(SRC, file).split(path.sep).join('/');

    // A static import into an Academy folder is a C1 regression. Reported, not
    // silently absorbed.
    let ast;
    try {
      ast = parse(source, { sourceType: 'module', plugins: ['jsx', 'importAssertions', 'topLevelAwait'] });
    } catch (error) {
      throw new Error(`${rel}: ${error.message}`);
    }
    for (const node of ast.program.body) {
      if (node.type !== 'ImportDeclaration') continue;
      const spec = node.source.value;
      const target = spec.endsWith('.css')
        ? path.resolve(path.dirname(file), spec)
        : resolve(file, spec);
      if (isAcademyFile(target)) legacyImports.push(`${rel} → ${spec}`);
    }

    for (const m of source.matchAll(SLOT_READ)) {
      reads += 1;
      const slot = m[2];
      const names = m[1]
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
        // `IMPORTED: local` — the contract is the imported name, on the left.
        .map((s) => s.split(':')[0].trim());

      byFile[rel] = byFile[rel] || [];
      byFile[rel].push({ slot, names });

      for (const n of names) {
        if (nameToSlot[n] && nameToSlot[n] !== slot) {
          conflicts.push(`${n}: ${nameToSlot[n]} vs ${slot} (${rel})`);
        }
        nameToSlot[n] = slot;
      }
    }
  }

  if (conflicts.length) {
    throw new Error(
      `One name is read from two different slots — it cannot mean two things:\n  ${conflicts.join('\n  ')}`
    );
  }

  // The slot list is read from the platform's own file rather than repeated
  // here, so the two can never disagree.
  const contentModule = fs.readFileSync(path.join(SRC, 'content/academyContent.js'), 'utf8');
  const slots = contentModule
    .match(/CONTENT_SLOTS = Object\.freeze\(\[([\s\S]*?)\]\)/)[1]
    .match(/'[A-Za-z]+'/g)
    .map((s) => s.replace(/'/g, ''));

  const undeclared = [...new Set(Object.values(nameToSlot))].filter((s) => !slots.includes(s));
  if (undeclared.length) {
    throw new Error(`The school reads slots the platform does not declare: ${undeclared.join(', ')}`);
  }

  const names = Object.keys(nameToSlot).sort();

  // A scan that finds nothing is the empty-inventory failure described at the
  // top of this file. An Academy legitimately has few names; the SCHOOL asking
  // for none of them means the scan is looking for the wrong thing.
  if (names.length === 0) {
    throw new Error(
      'Found no content reads at all. Either the school genuinely reads no Academy ' +
        'content, or this scan is looking for the wrong shape — do NOT write an empty ' +
        'inventory, because the generator will build an empty manifest from it.'
    );
  }

  const out = {
    _generated: 'scripts/scan-content-needs.mjs — do not edit by hand',
    _why: 'Every name the school reads out of an Academy, and the slot it reads it from. Each Academy manifest must supply these.',
    slots,
    files: Object.keys(byFile).length,
    reads,
    legacyImports,
    names,
    nameToSlot,
    byFile
  };

  fs.writeFileSync(path.join(REPO, 'scripts/academy-content-needs.json'), `${JSON.stringify(out, null, 1)}\n`);

  if (!quiet) {
    console.log(`${out.files} school files read Academy content`);
    console.log(`${reads} slot reads, ${names.length} distinct names`);
    console.log(`${slots.length} slots declared: ${slots.join(', ')}`);
    if (legacyImports.length) {
      console.log(`\n!! ${legacyImports.length} static import(s) into an Academy folder — a C1 regression:`);
      legacyImports.forEach((l) => console.log('   ' + l));
    }
    console.log('wrote scripts/academy-content-needs.json');
  }
  return out;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) scan();
