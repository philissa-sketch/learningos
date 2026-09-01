// ---------------------------------------------------------------------------
// MOVE THE SCHOOL OFF ONE ACADEMY'S FOLDER AND ONTO THE CONTENT INTERFACE.
//
//   node scripts/rewrite-content-imports.mjs [--dry]
//
// Turns this:
//
//   import { ACTIVE_SUBJECTS, canonicalSubject } from '../../academies/x/subjects.js';
//
// into this:
//
//   import { academyContent } from '../../content/academyContent.js';
//   const { ACTIVE_SUBJECTS, canonicalSubject } = academyContent().subjects;
//
// ---- WHAT DOES NOT CHANGE ----
//
// The identifiers. Every one of the ~550 places these names are USED is left
// exactly as it was, which is what keeps this an import change rather than a
// rewrite of the whole school. An alias is preserved as an alias, so a file
// that imported `LAUNCH_SCORE_LABELS as SCORE_LABELS` still has SCORE_LABELS.
//
// ---- WHY THE DESTRUCTURE AT MODULE SCOPE IS SAFE ----
//
// `academyContent()` throws if no Academy is loaded, and this runs at module
// evaluation. That is safe only because the platform reaches the school through
// exactly one dynamic import, in AcademyShell, after `loadAcademyContent()` has
// resolved — so no school module can be evaluated before its content exists.
// scripts/verify-content-interface.mjs holds that ordering in place. If it ever
// stops being true, these lines are where it will break, loudly, on the first
// render rather than quietly later.
//
// ---- WHY IT RESOLVES RATHER THAN STRING-REPLACES ----
//
// The number of `../` segments depends on how deep the importing file sits, and
// the same target needs a different specifier from `lib/` than from
// `components/Lesson/diagrams/`. Getting that wrong fails at runtime, not at
// build. Every path here is computed with path.relative from the importing
// file's own directory.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from '@babel/parser';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(REPO, 'src');
const ACADEMIES = path.join(SRC, 'academies');
const REGISTRY = path.join(ACADEMIES, 'registry.js');
const INTERFACE = path.join(SRC, 'content/academyContent.js');

const DRY = process.argv.includes('--dry');

const NEEDS = JSON.parse(fs.readFileSync(path.join(REPO, 'scripts/academy-content-needs.json'), 'utf8'));

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (/\.jsx?$/.test(entry.name)) acc.push(full);
  }
  return acc;
}

function resolveSpec(fromFile, spec) {
  if (!spec.startsWith('.')) return null;
  const base = path.resolve(path.dirname(fromFile), spec);
  for (const candidate of [base, `${base}.js`, `${base}.jsx`, path.join(base, 'index.js')]) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate;
  }
  return null;
}

const isContent = (abs) => abs && abs.startsWith(ACADEMIES + path.sep) && abs !== REGISTRY;

/** A specifier from one file to another, always explicitly relative. */
function specifierFrom(fromFile, toFile) {
  let rel = path.relative(path.dirname(fromFile), toFile).split(path.sep).join('/');
  if (!rel.startsWith('.')) rel = `./${rel}`;
  return rel;
}

const files = walk(SRC).filter((f) => !f.startsWith(ACADEMIES + path.sep));

let changedFiles = 0;
let removedStatements = 0;
let destructures = 0;
const report = [];
const problems = [];

for (const file of files) {
  const source = fs.readFileSync(file, 'utf8');
  if (!source.includes('academies/')) continue;

  const ast = parse(source, { sourceType: 'module', plugins: ['jsx', 'importAssertions', 'topLevelAwait'] });

  const toRemove = [];
  const bySlot = new Map();
  let lastImportEnd = 0;
  let cssRemoved = 0;

  for (const node of ast.program.body) {
    if (node.type !== 'ImportDeclaration') continue;
    lastImportEnd = Math.max(lastImportEnd, node.end);

    const spec = node.source.value;

    // The stylesheet is loaded by AcademyShell once content resolves, so that
    // it travels in the Academy's own chunk instead of everyone's.
    if (spec.endsWith('.css')) {
      if (isContent(path.resolve(path.dirname(file), spec))) {
        toRemove.push(node);
        cssRemoved += 1;
      }
      continue;
    }

    const target = resolveSpec(file, spec);
    if (!isContent(target)) continue;

    toRemove.push(node);
    removedStatements += 1;

    for (const s of node.specifiers) {
      const imported = s.imported.name ?? s.imported.value;
      const slot = NEEDS.nameToSlot[imported];
      if (!slot) {
        problems.push(`${path.relative(REPO, file)}: no slot for "${imported}"`);
        continue;
      }
      if (!bySlot.has(slot)) bySlot.set(slot, []);
      bySlot.get(slot).push(
        s.local.name === imported ? imported : `${imported}: ${s.local.name}`
      );
    }
  }

  if (!toRemove.length) continue;

  // Build the replacement text by cutting the old statements out back-to-front,
  // so earlier offsets stay valid.
  let out = source;
  let removedBeforeLastImport = 0;
  const ordered = [...toRemove].sort((a, b) => b.start - a.start);
  for (const node of ordered) {
    let end = node.end;
    // Take the newline the statement sat on, so no blank line is left behind.
    if (out[end] === '\n') end += 1;
    if (node.end <= lastImportEnd) removedBeforeLastImport += end - node.start;
    out = out.slice(0, node.start) + out.slice(end);
  }

  if (bySlot.size) {
    const lines = [...bySlot.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([slot, names]) => {
        destructures += 1;
        const unique = [...new Set(names)].sort();
        return `const { ${unique.join(', ')} } = academyContent().${slot};`;
      });

    const importLine = `import { academyContent } from '${specifierFrom(file, INTERFACE)}';`;

    /**
     * Insert after the last import, adjusting for the bytes just removed.
     *
     * Deliberately NOT by re-parsing the edited text: between removing the old
     * imports and adding the destructure, a file that re-exports content —
     * `export { isSchoolDay }` — refers to a name that momentarily does not
     * exist, and the parser rejects it. The document is only invalid halfway
     * through the edit, so the offset is computed rather than re-derived.
     */
    const insertAt = lastImportEnd - removedBeforeLastImport;

    out =
      `${out.slice(0, insertAt)}\n${importLine}\n\n${lines.join('\n')}${out.slice(insertAt)}`;
  } else if (cssRemoved) {
    // Nothing to destructure — the file only imported a stylesheet.
  }

  if (!DRY) fs.writeFileSync(file, out);
  changedFiles += 1;
  report.push(
    `${path.relative(REPO, file)}  −${toRemove.length} import(s)  +${bySlot.size} slot(s)` +
      (cssRemoved ? '  (stylesheet moved to the shell)' : '')
  );
}

if (problems.length) {
  console.error(`\n${problems.length} problem(s):`);
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}

console.log(report.join('\n'));
console.log(
  `\n${DRY ? '[dry run] ' : ''}${changedFiles} files, ` +
    `${removedStatements} content imports removed, ${destructures} slot reads added`
);
