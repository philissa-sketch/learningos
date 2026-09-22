// ---------------------------------------------------------------------------
// EVERY IMPORT RESOLVES, AND EVERY NAME IT ASKS FOR IS REALLY EXPORTED.
// Run: node scripts/verify-import-graph.mjs
//
// ---- THE GAP THIS CLOSES ----
//
// scripts/verify-parses.mjs says so itself, in its own header:
//
//     "This does NOT replace the build — it will not catch a bad import path,
//      a missing export or a type error."
//
// That is the exact class of mistake this programme makes on purpose, several
// times a week. Moving content out of the platform means DELETING EXPORTS and
// REPOINTING IMPORTS, and `npm run build` — the only thing that was catching a
// stale one — cannot run on the Linux side of the bridge, because node_modules
// carries win32 rollup and esbuild binaries. So a file left importing a name
// that moved would go green through all 83 checks and break for the parent the
// first time she opened the app.
//
// It happened on Sept 20, 2026, when `getTodaysWorkout`, `curatedDemoFor`,
// `demoLinkFor` and `HIDDEN_VIDEO` left the `pe` slot and peVideoSource.js was
// deleted outright. Five files imported those. Nothing in the suite could have
// told me if I had missed one.
//
// @babel/parser is already in node_modules and is pure JavaScript, so this runs
// anywhere. It still does not replace the build — it does not typecheck, does
// not follow package imports, and does not execute anything. It answers one
// question, statically, for every relative import in the tree: is that file
// there, and does it export that name?
//
// A `export * from './x.js'` re-export is followed. A default import is checked
// for a default export. A namespace import (`import * as m`) is not checked
// beyond the file existing, because what it reads off `m` is not knowable here.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from '../node_modules/@babel/parser/lib/index.js';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `\n      ${detail}` : '')); }
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name.startsWith('.')) continue;
      walk(full, out);
    } else if (/\.(jsx?|mjs)$/.test(e.name)) out.push(full);
  }
  return out;
}

const astCache = new Map();
const unparseable = [];
const EMPTY_AST = { program: { body: [] } };
function ast(file) {
  if (!astCache.has(file)) {
    try {
      astCache.set(file, parse(fs.readFileSync(file, 'utf8'), {
        sourceType: 'module', plugins: ['jsx'], errorRecovery: true
      }));
    } catch (err) {
      // verify-parses.mjs owns syntax. This check reports the file and carries
      // on rather than dying, so one bad file does not hide every other edge.
      unparseable.push(`${path.relative(REPO, file).replace(/\\/g, '/')}: ${err.message}`);
      astCache.set(file, EMPTY_AST);
    }
  }
  return astCache.get(file);
}

/** Every name a file exports, following `export * from`. */
const exportCache = new Map();
function exportsOf(file, seen = new Set()) {
  if (exportCache.has(file)) return exportCache.get(file);
  if (seen.has(file)) return new Set();
  seen.add(file);
  const names = new Set();
  for (const node of ast(file).program.body) {
    if (node.type === 'ExportNamedDeclaration') {
      if (node.declaration) {
        const d = node.declaration;
        if (d.id?.name) names.add(d.id.name);
        for (const decl of d.declarations || []) {
          if (decl.id.type === 'Identifier') names.add(decl.id.name);
          else for (const p of decl.id.properties || []) if (p.key?.name) names.add(p.key.name);
        }
      }
      for (const s of node.specifiers) names.add(s.exported.name || s.exported.value);
    } else if (node.type === 'ExportDefaultDeclaration') {
      names.add('default');
    } else if (node.type === 'ExportAllDeclaration') {
      const target = resolve(file, node.source.value);
      if (target) for (const n of exportsOf(target, seen)) names.add(n);
    }
  }
  exportCache.set(file, names);
  return names;
}

/** A relative specifier to a real file on disk, or null. */
function resolve(from, spec) {
  if (!spec.startsWith('.')) return null; // a package; not this check's job
  const base = path.resolve(path.dirname(from), spec);
  for (const c of [base, `${base}.js`, `${base}.jsx`, `${base}.mjs`,
                   path.join(base, 'index.js'), path.join(base, 'index.jsx')]) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
  }
  return null;
}

// ---- THREE FILES THIS DOES NOT FOLLOW, AND WHY ----
//
// content-1.js, content-2.js and content-3.js are stale copies of an Academy's
// content.js, all three dated Sept 14 2026. Nothing imports them — the loader's
// glob is `academies/*/content.js` — and every one of them is now provably
// broken: they import modules that no longer exist and names that have since
// moved out of the platform. They are dead weight in a source tree, not a
// consumer whose imports mean anything.
//
// They are NAMED here rather than pattern-skipped, and check 4 fails once they
// are gone, so this list can only shrink. Delete the files, delete the entry.
//
// Sept 21, 2026: all three deleted by the parent the day after this check
// named them, and this check reported the entries stale the same afternoon.
// The list is empty now. Leave it empty; a new entry needs a reason as good.
const STALE_COPIES = [];
const isStale = (f) => STALE_COPIES.includes(path.relative(REPO, f).replace(/\\/g, '/'));

const files = [...walk(path.join(REPO, 'src')), ...walk(path.join(REPO, 'scripts'))]
  .filter((f) => !isStale(f));
console.log(`\nfiles: ${files.length}`);

const unresolved = [];
const missingNames = [];
let edges = 0;

for (const file of files) {
  for (const node of ast(file).program.body) {
    const isImport = node.type === 'ImportDeclaration';
    const isReExport = node.type === 'ExportNamedDeclaration' && node.source;
    const isExportAll = node.type === 'ExportAllDeclaration';
    if (!isImport && !isReExport && !isExportAll) continue;

    const spec = node.source.value;
    if (!spec.startsWith('.')) continue;
    edges += 1;
    const target = resolve(file, spec);
    const rel = path.relative(REPO, file).replace(/\\/g, '/');
    if (!target) { unresolved.push(`${rel} -> ${spec}`); continue; }

    // A stylesheet, an image or anything else that is not JavaScript: the file
    // existing is the whole question. Same for a package reached by a relative
    // path into node_modules — its shape is CommonJS and not this check's job.
    if (!/\.(jsx?|mjs|cjs)$/.test(target) || target.includes(`${path.sep}node_modules${path.sep}`)) continue;

    const available = exportsOf(target);
    const wanted = [];
    for (const s of node.specifiers || []) {
      if (s.type === 'ImportNamespaceSpecifier') continue;          // unknowable here
      if (s.type === 'ImportDefaultSpecifier') wanted.push('default');
      else if (s.type === 'ImportSpecifier') wanted.push(s.imported.name || s.imported.value);
      else if (s.type === 'ExportSpecifier') wanted.push(s.local.name);
    }
    const tgt = path.relative(REPO, target).replace(/\\/g, '/');
    for (const name of wanted) {
      if (!available.has(name)) missingNames.push(`${rel} imports { ${name} } from ${tgt} — not exported`);
    }
  }
}

console.log(`relative imports checked: ${edges}`);

console.log('\n--- 0. every file could be read ---');
ok('nothing in the tree failed to parse', unparseable.length === 0,
  unparseable.slice(0, 8).join('\n      '));

console.log('\n--- 1. every relative import points at a file that exists ---');
ok('no import resolves to nothing', unresolved.length === 0,
  unresolved.slice(0, 12).join('\n      ')
  + (unresolved.length > 12 ? `\n      ...and ${unresolved.length - 12} more` : ''));

console.log('\n--- 2. every name imported is really exported ---');
ok('no import asks for a name that is not there', missingNames.length === 0,
  missingNames.slice(0, 12).join('\n      ')
  + (missingNames.length > 12 ? `\n      ...and ${missingNames.length - 12} more` : ''));

console.log('\n--- 3. the check is actually looking at something ---');
{
  // A resolver that silently matched nothing would make checks 1 and 2 pass on
  // an empty set. This is the same guard verify-content-interface keeps on its
  // own scan, and for the same reason.
  ok('it found a real number of imports to follow', edges > 300, String(edges));
  ok('it read real export lists', exportsOf(path.join(REPO, 'src/content/slots/pe.js')).size > 3);
  ok('a name that is not exported really is reported as missing',
    !exportsOf(path.join(REPO, 'src/content/slots/pe.js')).has('getTodaysWorkout'),
    'if this ever passes by accident the two checks above prove nothing');
}

console.log('\n--- 4. the skipped-file list has not gone stale ---');
{
  const gone = STALE_COPIES.filter((f) => !fs.existsSync(path.join(REPO, f)));
  ok('every file this check skips still exists', gone.length === 0,
    `${gone.join(', ')} — deleted, so remove the entry from STALE_COPIES`);
  console.log(`      (${STALE_COPIES.length} stale copies skipped — safe to delete, and this list may only shrink)`);
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) { console.log('\nFAILED:'); for (const f of failures) console.log('  ' + f); process.exit(1); }
console.log('\nALL CHECKS PASSED');
