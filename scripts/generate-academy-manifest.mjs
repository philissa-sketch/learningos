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
// That is what lets two schools built to different shapes meet one contract:
// one folder organises its physical education content one way, another does it
// differently, and both fill the `pe` slot.
//
// ---- HOW A NAME FINDS ITS MODULE ----
//
// The inventory (scripts/academy-content-needs.json) says WHAT the school needs
// and which slot it reads it from. It does not say which file in a given
// Academy holds it — it cannot, because that differs per Academy and is exactly
// what this file works out.
//
// So for each needed name: find the modules in this folder that export it AND
// whose path maps to the right slot. Exactly one is the answer. None means this
// Academy does not have it. More than one is ambiguous and stops the run —
// see below.
//
// ---- WHY AMBIGUITY IS A HARD STOP ----
//
// This Academy had two files exporting `isSchoolDay`, with two implementations,
// each documented as the only one anyone should ask. Picking one silently would
// have put a coin-flip in the middle of attendance. It is now deleted, and the
// check that caught it stays.
//
// Names are NEVER renamed here. The school's use sites keep the identifiers
// they already had.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from '@babel/parser';

// Defined once, in the scan — three things have to agree about slots.
import { slotFor } from './scan-content-needs.mjs';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ACADEMIES = path.join(REPO, 'src/academies');

function walk(dir, base = dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, base, acc);
    else if (/\.jsx?$/.test(entry.name)) acc.push(path.relative(base, full).split(path.sep).join('/'));
  }
  return acc;
}

/** Every name a module exports. Parsed, never guessed. */
function exportsOf(file) {
  const ast = parse(fs.readFileSync(file, 'utf8'), { sourceType: 'module', plugins: ['jsx'] });
  const names = [];
  for (const node of ast.program.body) {
    if (node.type !== 'ExportNamedDeclaration') continue;
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

const NEEDS = JSON.parse(fs.readFileSync(path.join(REPO, 'scripts/academy-content-needs.json'), 'utf8'));
if (!NEEDS.names?.length) {
  console.error(
    'The inventory is empty. Run scripts/scan-content-needs.mjs first — and if it\n' +
      'reports nothing, fix the scan rather than writing an empty manifest.'
  );
  process.exit(1);
}

// name -> [{ module, slot }] for every module in this folder that exports it.
const exporters = new Map();
for (const rel of walk(folder)) {
  if (rel === 'content.js') continue;
  const slot = slotFor(rel);
  if (!slot) continue;
  for (const name of exportsOf(path.join(folder, rel))) {
    if (!exporters.has(name)) exporters.set(name, []);
    exporters.get(name).push({ module: rel, slot });
  }
}

const bySlot = new Map();
const missing = [];
const ambiguous = [];

for (const name of NEEDS.names) {
  const slot = NEEDS.nameToSlot[name];
  const candidates = (exporters.get(name) || []).filter((c) => c.slot === slot);

  if (candidates.length === 0) {
    missing.push(`${name} (slot ${slot})`);
    continue;
  }
  if (candidates.length > 1) {
    ambiguous.push(`${name} exported by ${candidates.map((c) => c.module).join(' AND ')}`);
    continue;
  }
  const { module } = candidates[0];
  if (!bySlot.has(slot)) bySlot.set(slot, new Map());
  const mods = bySlot.get(slot);
  if (!mods.has(module)) mods.set(module, []);
  mods.get(module).push(name);
}

// ---- SHAPE SLOTS ----
//
// The loop above walks the INVENTORY: the names every Academy must provide.
// That is the right list for a slot whose names screens ask for individually,
// and the wrong one for a slot that is a single shape read by one component.
// The contract names those in SHAPE_SLOTS and says why; this pass emits
// whatever an Academy puts in one, without demanding every Academy fill it.
const contentSrc = fs.readFileSync(path.join(REPO, 'src/content/academyContent.js'), 'utf8');
const shapeSlots = (contentSrc.match(/SHAPE_SLOTS = Object\.freeze\(\[([\s\S]*?)\]\)/)?.[1] || '')
  .match(/'[A-Za-z]+'/g)?.map((x) => x.replace(/'/g, '')) || [];

let shapeNames = 0;
for (const [name, candidates] of exporters) {
  const bySlotName = new Map();
  for (const c of candidates.filter((c) => shapeSlots.includes(c.slot))) {
    if (!bySlotName.has(c.slot)) bySlotName.set(c.slot, []);
    bySlotName.get(c.slot).push(c.module);
  }
  for (const [slot, modules] of bySlotName) {
    if (modules.length > 1) {
      ambiguous.push(`${name} exported by ${modules.join(' AND ')}`);
      continue;
    }
    if (!bySlot.has(slot)) bySlot.set(slot, new Map());
    const mods = bySlot.get(slot);
    if (!mods.has(modules[0])) mods.set(modules[0], []);
    if (!mods.get(modules[0]).includes(name)) {
      mods.get(modules[0]).push(name);
      shapeNames += 1;
    }
  }
}

if (ambiguous.length) {
  console.error(`\n${ambiguous.length} ambiguous name(s) — manifest NOT written:\n`);
  for (const a of ambiguous) console.error('  ' + a);
  console.error(
    '\nTwo modules in one slot exporting one name are two different values, and\n' +
      'one would silently win. Rename one at the source, or split the slot.\n'
  );
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

const slotNames = [...bySlot.keys()].sort();
for (const slot of slotNames) {
  for (const [module, names] of [...bySlot.get(slot)].sort()) {
    lines.push(`import { ${[...names].sort().join(', ')} } from './${module}';`);
  }
}
lines.push('');

for (const slot of slotNames) {
  const names = [...bySlot.get(slot).values()].flat().sort();
  lines.push(`export const ${slot} = { ${names.join(', ')} };`);
  lines.push('');
}

if (hasCss) {
  lines.push('/**');
  lines.push(" * This Academy's palette and print rules.");
  lines.push(' *');
  lines.push(' * The theme slot answers one question: what does this school look like?');
  lines.push(' *');
  lines.push(' * A loader rather than a static import so the stylesheet travels in this');
  lines.push(" * Academy's chunk and loads when this Academy does. A static import here");
  lines.push(" * would put every Academy's theme in every learner's download, which is the");
  lines.push(' * thing the folder split exists to prevent.');
  lines.push(' */');
  lines.push("export const theme = { appearance: () => import('./academy.css') };");
  lines.push('');
}

fs.writeFileSync(path.join(folder, 'content.js'), lines.join('\n'));

const total = slotNames.reduce((a, s) => a + [...bySlot.get(s).values()].flat().length, 0);
console.log(`src/academies/${academy}/content.js`);
console.log(
  `  ${slotNames.length} slots filled, ${total - shapeNames} of ` +
    `${NEEDS.names.length} required names` +
    (shapeNames ? `, plus ${shapeNames} in shape slots` : '')
);
for (const slot of slotNames) {
  console.log(`    ${slot.padEnd(16)} ${String([...bySlot.get(slot).values()].flat().length).padStart(3)}`);
}
if (hasCss) console.log('    theme             (stylesheet)');

const blank = NEEDS.slots.filter((s) => !slotNames.includes(s) && !(s === 'theme' && hasCss));
if (blank.length) console.log(`  left blank: ${blank.join(', ')}`);

/**
 * What the template already answers.
 *
 * A name the template provides is not missing — the Academy inherits it. Only
 * what neither side supplies is a real gap, and for a new Academy that
 * remainder IS the worklist. Reporting inherited names as missing would make it
 * look far longer than it is.
 */
const templateManifest = path.join(ACADEMIES, '_template', 'content.js');
const inherited = new Set();
if (fs.existsSync(templateManifest)) {
  const t = fs.readFileSync(templateManifest, 'utf8');
  for (const m of t.matchAll(/export const (\w+) = \{([^}]*)\}/g)) {
    if (m[1] === 'theme') continue;
    for (const n of m[2].split(',').map((s) => s.split(':')[0].trim())) {
      if (/^[A-Za-z_$][\w$]*$/.test(n)) inherited.add(n);
    }
  }
}

const inheritedHere = missing.filter((m) => inherited.has(m.split(' ')[0]));
const reallyMissing = missing.filter((m) => !inherited.has(m.split(' ')[0]));

if (inheritedHere.length) {
  console.log(`\n  ${inheritedHere.length} name(s) inherited from the template — nothing to do:`);
  console.log('    ' + inheritedHere.map((m) => m.split(' ')[0]).join(', '));
}

if (reallyMissing.length) {
  console.log(`\n  ${reallyMissing.length} name(s) neither this Academy nor the template has:`);
  for (const m of reallyMissing.slice(0, 25)) console.log('    ' + m);
  if (reallyMissing.length > 25) console.log(`    …and ${reallyMissing.length - 25} more`);
  console.log(
    '\n  A school that reads these will fail at runtime. For a new Academy this is\n' +
      '  the worklist: each line is either content to write, or a default the\n' +
      '  template should grow so no Academy has to write it twice.'
  );
}
