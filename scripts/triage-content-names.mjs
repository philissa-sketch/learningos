// ---------------------------------------------------------------------------
// WHICH CONTRACT NAMES ARE BEHAVIOUR. Run: node scripts/triage-content-names.mjs
//
// Writes scripts/content-name-triage.json — for every name in the contract
// inventory, whether it is a fact about a school or logic the platform should
// own, and for the ones that cannot move, the chain that binds them.
//
// This is the measurement §3c Step 1 acts on. Step 1 takes the logic names out
// of the slots and into lib/; this file decides which names those are, and it
// decides it by reading the code rather than by reading the names.
//
// ---- WHY A NAME IS NOT ENOUGH TO JUDGE A NAME ----
//
// `affordable` and `instructionMinutes` read like pure arithmetic, and a triage
// done by eye classified them that way. The spec says why that is not safe:
//
//   isSchoolDay -> isHoliday -> holidayName -> one family's own holiday list
//
// is three levels deep, and every level but the last looks like calendar logic.
// Move it as "pure logic" and one family's Christmas is compiled into the
// platform. No name-based guard catches that, because a date is not a name.
//
// So the question this file asks is not "does this name sound generic" but:
//
//   Following every identifier this name's definition reaches, and everything
//   THOSE reach, does the closure ever touch data that lives in an Academy
//   folder?
//
// Touches it -> the logic is bound to one school and stays with that school.
// Never touches it -> it is behaviour, it is the same for every Academy, and
// making each school reimplement it is the exact opposite of "fix a bug once,
// every Academy gets it."
//
// A function that takes the data as an ARGUMENT is pure. That is the whole
// shape Step 1 is moving toward, and it is why the distinction is worth
// computing rather than guessing.
//
// ---- THE BIAS IS DELIBERATE ----
//
// Anything this file cannot resolve stays with the school. A name wrongly left
// behind is untidy; a name wrongly moved welds one family into the bones of
// every school that will ever be enrolled. The debt list may shrink and must
// never grow, so the uncertain case shrinks nothing.
//
// ---- THE LIMIT OF THIS TOOL, WHICH IT CANNOT FIX ITSELF ----
//
// **It follows references. It cannot see a fact typed straight into the code.**
//
// Three of the names it first called behaviour were caught by hand afterwards,
// and all three for the same reason — the school data was a LITERAL rather than
// a lookup:
//
//   nextDeclarationDeadline   `new Date(year, 8, 1)` — month index 8 is
//                             September 1, which is one state's statutory
//                             filing deadline and no other state's
//   declarationSchoolYear     `month >= 7` — a July school-year boundary, while
//                             lib/schoolQuarter.js already owns a start date
//                             that says August. Moving it would install a
//                             second, disagreeing answer to the same question
//   suggestedGradeFromRubric  seven percentage bands that disagree with the
//                             thirteen in lib/gradeScale.js. 85% is an A- to
//                             one of them and a B to the other
//
// A general magic-number detector would flag `86400000` and `4` and every
// sensible constant in the codebase, so there is nothing useful to automate
// here. **The mitigation is that the behaviour list is short by construction —
// read it before you move it.** Nine names is ten minutes; that pass caught
// three, which is a third of them.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from '@babel/parser';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ACADEMIES = path.join(REPO, 'src', 'academies');
const INVENTORY = path.join(REPO, 'scripts', 'academy-content-needs.json');
const OUT = path.join(REPO, 'scripts', 'content-name-triage.json');

const rel = (abs) => path.relative(REPO, abs).split(path.sep).join('/');

// ---------------------------------------------------------------------------
// Parsing
// ---------------------------------------------------------------------------

const parseFile = (abs) =>
  parse(fs.readFileSync(abs, 'utf8'), {
    sourceType: 'module',
    plugins: ['jsx'],
    errorRecovery: true
  });

/** Resolve a relative specifier from one file to an absolute path on disk. */
function resolveSpecifier(fromAbs, specifier) {
  if (!specifier.startsWith('.')) return null; // a package, never an Academy's
  const target = path.resolve(path.dirname(fromAbs), specifier);
  for (const candidate of [target, `${target}.js`, `${target}.jsx`, path.join(target, 'index.js')]) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate;
  }
  return null;
}

/**
 * Every identifier an AST node reads, minus the ones it declares itself.
 *
 * Parameters and inner locals are subtracted because a function whose argument
 * happens to share a name with a module-level constant does not depend on that
 * constant — and counting it would bind a genuinely pure function to a school.
 */
function identifiersRead(node) {
  const read = new Set();
  const declared = new Set();

  const walk = (n, parent) => {
    if (!n || typeof n !== 'object') return;
    if (Array.isArray(n)) return n.forEach((child) => walk(child, parent));
    if (typeof n.type !== 'string') return;

    if (n.type === 'Identifier') {
      // A property key, a non-computed member (`.foo`), a label: not a read.
      const isKey = parent?.type === 'ObjectProperty' && parent.key === n && !parent.computed;
      const isMember = parent?.type === 'MemberExpression' && parent.property === n && !parent.computed;
      if (!isKey && !isMember) read.add(n.name);
      return;
    }

    if (n.type === 'FunctionDeclaration' || n.type === 'FunctionExpression' || n.type === 'ArrowFunctionExpression') {
      collectPatternNames(n.params, declared);
    }
    if (n.type === 'VariableDeclarator') collectPatternNames([n.id], declared);
    if (n.type === 'CatchClause' && n.param) collectPatternNames([n.param], declared);

    for (const key of Object.keys(n)) {
      if (key === 'loc' || key === 'leadingComments' || key === 'trailingComments') continue;
      walk(n[key], n);
    }
  };

  walk(node, null);
  for (const name of declared) read.delete(name);
  return read;
}

function collectPatternNames(patterns, into) {
  const walk = (p) => {
    if (!p || typeof p !== 'object') return;
    if (Array.isArray(p)) return p.forEach(walk);
    if (p.type === 'Identifier') into.add(p.name);
    else if (p.type === 'ObjectPattern') p.properties.forEach((prop) => walk(prop.value ?? prop.argument));
    else if (p.type === 'ArrayPattern') p.elements.forEach(walk);
    else if (p.type === 'AssignmentPattern') walk(p.left);
    else if (p.type === 'RestElement') walk(p.argument);
  };
  walk(patterns);
}

/**
 * What kind of thing a declaration is.
 *
 * `data` is a value sitting in the file — a list of holidays, a rank ladder, a
 * catalog. It is a fact about one school by definition and never moves.
 *
 * `derived` is a value computed once at module load. It reads as code but it is
 * a value, and it is treated as data on purpose: whatever it computed from is
 * baked into it.
 */
function kindOf(init) {
  if (!init) return 'data';
  switch (init.type) {
    case 'ArrowFunctionExpression':
    case 'FunctionExpression':
      return 'function';
    case 'ObjectExpression':
    case 'ArrayExpression':
    case 'StringLiteral':
    case 'NumericLiteral':
    case 'BooleanLiteral':
    case 'TemplateLiteral':
    case 'NullLiteral':
      return 'data';
    default:
      return 'derived';
  }
}

// ---------------------------------------------------------------------------
// The module graph, one Academy folder deep
// ---------------------------------------------------------------------------

const modules = new Map(); // abs path -> { decls, imports, reexports, starFrom }

function moduleOf(abs) {
  if (modules.has(abs)) return modules.get(abs);

  const record = { decls: new Map(), imports: new Map(), reexports: new Map(), aliases: new Map(), starFrom: [] };
  modules.set(abs, record);

  let ast;
  try {
    ast = parseFile(abs);
  } catch {
    return record; // unparseable: contributes nothing, and nothing moves on it
  }

  const declare = (name, kind, node) =>
    record.decls.set(name, { kind, refs: identifiersRead(node), file: abs });

  for (const node of ast.program.body) {
    if (node.type === 'ImportDeclaration') {
      for (const s of node.specifiers) {
        const imported =
          s.type === 'ImportSpecifier' ? s.imported.name ?? s.imported.value : s.type === 'ImportDefaultSpecifier' ? 'default' : '*';
        record.imports.set(s.local.name, { source: node.source.value, imported });
      }
      continue;
    }

    if (node.type === 'ExportNamedDeclaration' && node.source) {
      for (const s of node.specifiers) {
        record.reexports.set(s.exported.name ?? s.exported.value, {
          source: node.source.value,
          imported: s.local?.name ?? s.exported.name
        });
      }
      continue;
    }

    if (node.type === 'ExportAllDeclaration') {
      record.starFrom.push(node.source.value);
      continue;
    }

    // `export { READING_QUARTERS as ACADEMIC_SUCCESS_CENTER_QUARTER_ORDER }` —
    // a rename with no source. The contract knows one name and the file knows
    // the other, and without this the contract's name resolves to nothing at
    // all. It was reported unresolved once, which is the safe verdict but the
    // wrong reason, and a wrong reason is how a later triage gets talked out of
    // a correct answer.
    if (node.type === 'ExportNamedDeclaration' && !node.source && !node.declaration) {
      for (const s of node.specifiers) {
        const exported = s.exported.name ?? s.exported.value;
        if (s.local && s.local.name !== exported) record.aliases.set(exported, s.local.name);
      }
      continue;
    }

    const decl = node.type === 'ExportNamedDeclaration' || node.type === 'ExportDefaultDeclaration' ? node.declaration : node;
    if (!decl) continue;

    if (decl.type === 'FunctionDeclaration' && decl.id) {
      declare(decl.id.name, 'function', decl.body);
    } else if (decl.type === 'ClassDeclaration' && decl.id) {
      declare(decl.id.name, 'derived', decl.body);
    } else if (decl.type === 'VariableDeclaration') {
      for (const d of decl.declarations) {
        if (d.id.type !== 'Identifier') continue;
        declare(d.id.name, kindOf(d.init), d.init ?? d);
      }
    }
  }

  return record;
}

/**
 * Find where a name actually lives, following imports and re-exports.
 *
 * Returns null when the trail leaves the Academy folder — a platform import, a
 * package, a global. Those are not bindings: they travel with the code.
 */
function locate(abs, name, seen = new Set()) {
  const key = `${abs}::${name}`;
  if (seen.has(key)) return null;
  seen.add(key);

  if (!abs.startsWith(ACADEMIES)) return null;
  const mod = moduleOf(abs);

  if (mod.decls.has(name)) return { file: abs, name, decl: mod.decls.get(name) };
  if (mod.aliases.has(name)) return locate(abs, mod.aliases.get(name), seen);

  const via = mod.imports.get(name) ?? mod.reexports.get(name);
  if (via) {
    const next = resolveSpecifier(abs, via.source);
    if (!next || !next.startsWith(ACADEMIES)) return null;
    return locate(next, via.imported === 'default' ? 'default' : via.imported, seen);
  }

  for (const source of mod.starFrom) {
    const next = resolveSpecifier(abs, source);
    if (next?.startsWith(ACADEMIES)) {
      const found = locate(next, name, seen);
      if (found) return found;
    }
  }

  return null;
}

/**
 * Breadth-first from a name to the nearest piece of school data it depends on.
 *
 * Breadth-first rather than depth-first so the path reported is the SHORTEST
 * one — the clearest explanation of why a name cannot move, rather than the
 * first one the walk happened to find.
 */
function bindingPath(start) {
  const queue = [{ at: start, path: [start.name] }];
  const visited = new Set([`${start.file}::${start.name}`]);
  let depth = 0;

  while (queue.length) {
    const { at, path: trail } = queue.shift();
    depth = Math.max(depth, trail.length);

    if (at.decl.kind !== 'function') return { path: trail, depth: trail.length };

    for (const ref of at.decl.refs) {
      const found = locate(at.file, ref);
      if (!found) continue; // left the folder: platform code, not a binding
      const key = `${found.file}::${found.name}`;
      if (visited.has(key)) continue;
      visited.add(key);
      queue.push({ at: found, path: [...trail, found.name] });
    }
  }

  return null; // nothing in the closure is data: this is behaviour
}

/**
 * Everything inside the Academy folder a name reaches, split by what it would
 * cost to move that name into the platform.
 *
 * `tables` become PARAMETERS — the data stays with the school and is handed in.
 * `helpers` TRAVEL — they are logic the name calls, so they move with it.
 *
 * The split is the scope of the move, and it is bigger than the name suggests
 * whenever a chain is involved: taking `isSchoolDay` also takes `isHoliday` and
 * `holidayName`, because they sit between it and the data. Reporting only the
 * 62 names in the contract would undercount the work by every intermediate that
 * was never in the contract to begin with.
 */
function closureOf(start) {
  const tables = new Map();
  const helpers = new Map();
  const seen = new Set([`${start.file}::${start.name}`]);
  const queue = [start];

  while (queue.length) {
    const at = queue.shift();
    if (at !== start) {
      const into = at.decl.kind === 'function' ? helpers : tables;
      into.set(at.name, rel(at.file));
    }
    if (at.decl.kind !== 'function') continue;

    for (const ref of at.decl.refs) {
      const found = locate(at.file, ref);
      if (!found) continue;
      const key = `${found.file}::${found.name}`;
      if (seen.has(key)) continue;
      seen.add(key);
      queue.push(found);
    }
  }

  return { tables: [...tables.keys()].sort(), helpers: [...helpers.keys()].sort() };
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

function academyFolders() {
  return fs
    .readdirSync(ACADEMIES, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith('_'))
    .map((e) => e.name);
}

/**
 * Which Academy this triage reads.
 *
 * Not hardcoded, and chosen by coverage rather than by name: the contract's
 * names have to be READ somewhere to be judged, and the folder that answers the
 * most of them is the only one that can answer for most of them. Printed, so
 * the run says out loud whose code it measured.
 */
function pickAcademy(names) {
  let best = null;
  for (const id of academyFolders()) {
    const manifest = path.join(ACADEMIES, id, 'content.js');
    if (!fs.existsSync(manifest)) continue;
    const mod = moduleOf(manifest);
    const covered = names.filter((n) => mod.imports.has(n) || mod.decls.has(n) || mod.reexports.has(n)).length;
    if (!best || covered > best.covered) best = { id, manifest, covered };
  }
  return best;
}

function main() {
  const inventory = JSON.parse(fs.readFileSync(INVENTORY, 'utf8'));
  const names = inventory.names ?? [];

  // scan-content-needs.mjs once reported success over an empty inventory and
  // the generator built an empty manifest from it. Both refuse that now.
  if (!names.length) {
    console.error('REFUSED: the inventory is empty. Re-run scripts/scan-content-needs.mjs first.');
    process.exit(1);
  }

  const academy = pickAcademy(names);
  if (!academy) {
    console.error('REFUSED: no Academy folder carries a content.js to read these names from.');
    process.exit(1);
  }

  const results = [];
  for (const name of names) {
    const slot = inventory.nameToSlot?.[name] ?? null;
    const found = locate(academy.manifest, name);

    if (!found) {
      results.push({
        name,
        slot,
        verdict: 'unresolved',
        why: 'No definition reachable from this Academy\'s manifest. Left with the school: an unresolved name moves nothing.'
      });
      continue;
    }

    if (found.decl.kind !== 'function') {
      results.push({
        name,
        slot,
        verdict: 'school-data',
        kind: found.decl.kind,
        definedIn: rel(found.file),
        why: found.decl.kind === 'derived'
          ? 'A value computed once at module load. Whatever it was computed from is baked into it.'
          : 'A value sitting in an Academy folder. A fact about one school.'
      });
      continue;
    }

    const binding = bindingPath(found);
    if (binding) {
      const { tables, helpers } = closureOf(found);
      results.push({
        name,
        slot,
        verdict: 'school-bound',
        definedIn: rel(found.file),
        bindsVia: binding.path,
        depth: binding.depth,
        // What it would take to move this one anyway: the data it would have to
        // be handed, and the logic that would have to come with it.
        needsTables: tables,
        carriesHelpers: helpers,
        why: `Logic, but its closure reaches school data ${binding.depth === 2 ? 'directly' : `${binding.depth - 1} levels down`}: ${binding.path.join(' -> ')}.`
      });
    } else {
      results.push({
        name,
        slot,
        verdict: 'behaviour',
        definedIn: rel(found.file),
        why: 'Logic whose whole closure touches no school data. The same for every Academy.'
      });
    }
  }

  const count = (v) => results.filter((r) => r.verdict === v).length;
  const summary = {
    behaviour: count('behaviour'),
    schoolBound: count('school-bound'),
    schoolData: count('school-data'),
    unresolved: count('unresolved'),
    total: results.length
  };

  fs.writeFileSync(
    OUT,
    `${JSON.stringify(
      {
        _generated: 'scripts/triage-content-names.mjs — do not edit by hand',
        _why: 'Which contract names are behaviour the platform should own, and for the rest, the chain that binds them to one school.',
        _readAgainst: academy.id,
        summary,
        names: results
      },
      null,
      1
    )}\n`
  );

  // Printed because a tool can report success and produce nothing. Read these.
  console.log(`Read against Academy folder: ${academy.id} (answers ${academy.covered} of ${names.length} names)`);
  console.log('');
  console.log(`  behaviour     ${String(summary.behaviour).padStart(4)}   moves to lib/ in Step 1`);
  console.log(`  school-bound  ${String(summary.schoolBound).padStart(4)}   logic tied to one school's data — stays`);
  console.log(`  school-data   ${String(summary.schoolData).padStart(4)}   facts about a school — stays`);
  console.log(`  unresolved    ${String(summary.unresolved).padStart(4)}   not reachable — stays`);
  console.log(`  ${'-'.repeat(14)}`);
  console.log(`  total         ${String(summary.total).padStart(4)}`);
  console.log('');
  console.log(`Wrote ${rel(OUT)}`);

  if (summary.total !== names.length) {
    console.error('REFUSED: the triage did not judge every name in the inventory.');
    process.exit(1);
  }
}

main();
