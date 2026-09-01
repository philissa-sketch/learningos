// ---------------------------------------------------------------------------
// GENERATE ONE ACADEMY'S content.js
//
//   node scripts/generate-academy-manifest.mjs <academy-folder-name>
//
// ---- WHAT A MANIFEST IS FOR ----
//
// The school reads slots. An Academy's files are whatever that Academy's files
// happen to be. The manifest is the adapter between the two, and it lives in
// the Academy's own folder because the adapting is that Academy's business.
//
// That is what lets two schools built to different shapes meet the same
// contract: one folder calls its physical education content one thing, another
// calls it another, and both fill the `pe` slot.
//
// ---- WHY THIS IS GENERATED ----
//
// The mapping is 77 modules and ~190 exported names. Typed by hand it would be
// wrong on the first day and stale by the second. Generated, it is re-runnable:
// add a file to an Academy folder, re-run, and the manifest grows a line.
//
// Names are NEVER renamed here. The school's use sites keep the identifiers
// they already had — the whole conversion is an import-line change, and a
// manifest that renamed things would turn it into a rewrite of every call site.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from '@babel/parser';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ACADEMIES = path.join(REPO, 'src/academies');

// The slot mapping is defined once, in the scan, and imported here — three
// things have to agree about it and two copies is one too many.
import { slotFor } from './scan-content-needs.mjs';

/** Every name a module exports. Parsed, never guessed. */
function exportsOf(file) {
  const ast = parse(fs.readFileSync(file, 'utf8'), {
    sourceType: 'module',
    plugins: ['jsx']
  });
  const names = [];
  for (const node of ast.program.body) {
    if (node.type === 'ExportNamedDeclaration') {
      if (node.declaration) {
        const d = node.declaration;
        if (d.type === 'VariableDeclaration') {
          for (const decl of d.declarations) if (decl.id.type === 'Identifier') names.push(decl.id.name);
        } else if (d.id) names.push(d.id.name);
      }
      for (const s of node.specifiers) {
        const exported = s.exported.name ?? s.exported.value;
        if (exported !== 'default') names.push(exported);
      }
    }
  }
  return names;
}

const academy = process.argv[2];
if (!academy) {
  console.error('usage: node scripts/generate-academy-manifest.mjs <academy-folder-name>');
  process.exit(1);
}

const folder = path.join(ACADEMIES, academy);
if (!fs.existsSync(folder)) {
  console.error(`No such Academy folder: src/academies/${academy}`);
  process.exit(1);
}

// Only names the school actually reaches for, and only from the module it
// reaches for them in. An Academy's internals stay internal; publishing every
// export as contract would make private helpers impossible to change later.
//
// Keyed by module rather than matched by name, because this Academy exports
// `isSchoolDay` from two different files with two different implementations.
const NEEDS = JSON.parse(fs.readFileSync(path.join(REPO, 'scripts/academy-content-needs.json'), 'utf8'));

const bySlot = new Map();
const skipped = [];
const unresolved = [];

for (const [rel, wanted] of Object.entries(NEEDS.byModule)) {
  const slot = slotFor(rel);
  if (!slot) {
    skipped.push(rel);
    continue;
  }
  const full = path.join(folder, rel);
  if (!fs.existsSync(full)) {
    unresolved.push(rel);
    continue;
  }
  const has = new Set(exportsOf(full));
  const absent = wanted.filter((n) => !has.has(n));
  if (absent.length) unresolved.push(`${rel} does not export: ${absent.join(', ')}`);
  const names = wanted.filter((n) => has.has(n));
  if (!names.length) continue;
  if (!bySlot.has(slot)) bySlot.set(slot, []);
  bySlot.get(slot).push({ rel, names: [...names].sort() });
}

/**
 * A name wanted from two different modules that land in the same slot.
 *
 * This is a hard stop, not a warning. The two are different values — the
 * school's two games each define their own SCORE_LABELS — so a flat slot
 * cannot serve both, and emitting one anyway produces a duplicate binding that
 * is not valid JavaScript. The Academy has to say which is which.
 */
const collisions = [];
for (const [slot, modules] of bySlot) {
  const owners = new Map();
  for (const { rel, names } of modules) {
    for (const n of names) {
      if (!owners.has(n)) owners.set(n, []);
      owners.get(n).push(rel);
    }
  }
  for (const [n, mods] of owners) if (mods.length > 1) collisions.push({ slot, name: n, mods });
}

if (collisions.length) {
  console.error(`\n${collisions.length} name collision(s) — manifest NOT written:\n`);
  for (const c of collisions) {
    console.error(`  slot "${c.slot}" would get ${c.name} from ${c.mods.length} modules:`);
    for (const m of c.mods) console.error(`      ${m}`);
  }
  console.error(
    '\nTwo modules in one slot exporting the same name are two different values.\n' +
      'Give one of them a distinct exported name in the Academy folder, or split\n' +
      'the slot. Do not let one silently win.\n'
  );
  process.exit(1);
}

if (unresolved.length) {
  console.error('\nThe school asks this Academy for content it does not have:\n');
  for (const u of unresolved) console.error(`  ${u}`);
  console.error('');
  process.exit(1);
}

const hasCss = fs.existsSync(path.join(folder, 'academy.css'));

const lines = [];
lines.push('// ---------------------------------------------------------------------------');
lines.push('// GENERATED by scripts/generate-academy-manifest.mjs — do not edit by hand.');
lines.push('//');
lines.push("// This Academy's answer to the platform's content contract. The school reads");
lines.push('// slots (src/content/academyContent.js); this file says what this Academy puts');
lines.push('// in each one. Re-run the generator after adding or removing a content file.');
lines.push('//');
lines.push('// A slot this Academy has nothing for is simply absent. Blank is expected.');
lines.push('// ---------------------------------------------------------------------------');
lines.push('');

const slotOrder = [...bySlot.keys()].sort();
for (const slot of slotOrder) {
  for (const { rel, names } of bySlot.get(slot)) {
    lines.push(`import { ${names.join(', ')} } from './${rel}';`);
  }
}
lines.push('');

for (const slot of slotOrder) {
  const names = bySlot.get(slot).flatMap((m) => m.names).sort();
  lines.push(`export const ${slot} = { ${names.join(', ')} };`);
  lines.push('');
}

if (hasCss) {
  lines.push('/**');
  lines.push(" * This Academy's palette and print rules.");
  lines.push(' *');
  lines.push(' * A function rather than a static import so the stylesheet travels in this');
  lines.push(" * Academy's chunk and loads when this Academy does. A static import here");
  lines.push(" * would put every Academy's theme in every learner's download, which is the");
  lines.push(' * thing the folder split exists to prevent.');
  lines.push(' */');
  lines.push('export const theme = { load: () => import(\'./academy.css\') };');
  lines.push('');
}

fs.writeFileSync(path.join(folder, 'content.js'), lines.join('\n'));

const total = slotOrder.reduce((a, s) => a + bySlot.get(s).flatMap((m) => m.names).length, 0);
console.log(`src/academies/${academy}/content.js`);
console.log(`  ${slotOrder.length} slots filled, ${total} names, from ${[...bySlot.values()].flat().length} modules`);
for (const slot of slotOrder) {
  const n = bySlot.get(slot).flatMap((m) => m.names).length;
  console.log(`    ${slot.padEnd(16)} ${String(n).padStart(3)} names`);
}
if (hasCss) console.log('    theme             (stylesheet)');
const unfilled = JSON.parse(
  fs.readFileSync(path.join(REPO, 'scripts/academy-content-needs.json'), 'utf8')
).slots.filter((s) => !slotOrder.includes(s) && !(s === 'theme' && hasCss));
if (unfilled.length) console.log(`  left blank: ${unfilled.join(', ')}`);
if (skipped.length) console.log(`  ${skipped.length} file(s) not mapped to a slot (internal to this Academy)`);
