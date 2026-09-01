// ---------------------------------------------------------------------------
// AN ACADEMY'S CONTENT IS LOADED, NOT COMPILED IN.
// Run: node scripts/verify-content-interface.mjs
//
// C1's guard. Before it, 205 import statements across 87 files named one
// Academy's folder, so a second Academy — its own database, its own sign-in,
// not one row of anybody else's records — rendered the FIRST Academy's school:
// its subjects, its guide, its timetable, and a field trip belonging to another
// child, marked past due.
//
// Records separated correctly the whole time. Curriculum had no concept of
// whose it was.
//
// These checks hold the four properties that fixed it. Each one has a way of
// being quietly undone by an ordinary-looking change, which is why each is
// asserted rather than trusted.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from '@babel/parser';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(REPO, 'src');
const ACADEMIES = path.join(SRC, 'academies');
const REGISTRY = path.join(ACADEMIES, 'registry.js');

let passed = 0;
const failures = [];
const ok = (label, cond, detail = '') => {
  if (cond) {
    passed += 1;
    console.log('PASS  ' + label);
  } else {
    failures.push(label);
    console.log('FAIL  ' + label + (detail ? `\n      ${detail}` : ''));
  }
};

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
  for (const c of [base, `${base}.js`, `${base}.jsx`, path.join(base, 'index.js')]) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
  }
  return null;
}

const ast = (f) =>
  parse(fs.readFileSync(f, 'utf8'), {
    sourceType: 'module',
    plugins: ['jsx', 'importAssertions', 'topLevelAwait']
  });

/** Static imports only — a dynamic import() is exactly what these checks allow. */
function staticImports(file) {
  const out = [];
  for (const node of ast(file).program.body) {
    if (node.type === 'ImportDeclaration') out.push(node.source.value);
  }
  return out;
}

const rel = (f) => path.relative(REPO, f).split(path.sep).join('/');
const all = walk(SRC);
const school = all.filter((f) => !f.startsWith(ACADEMIES + path.sep));

// ---------------------------------------------------------------------------
console.log('\n--- 1. the acceptance test: no file compiles an Academy in ---');
// ---------------------------------------------------------------------------
// docs/LEARNINGOS_PACK_SPEC.md §1: "Delete academies/<id>/ and the app must
// still run." That is only true if nothing outside those folders imports one
// STATICALLY — a static import is a build-time dependency, so a missing folder
// becomes a build error rather than the empty state the spec asks for.

const staticAcademyImporters = [];
for (const f of school) {
  for (const spec of staticImports(f)) {
    const target = spec.endsWith('.css')
      ? path.resolve(path.dirname(f), spec)
      : resolveSpec(f, spec);
    if (target && target.startsWith(ACADEMIES + path.sep) && target !== REGISTRY) {
      staticAcademyImporters.push(`${rel(f)} → ${spec}`);
    }
  }
}
ok(
  'no file outside an Academy folder statically imports one',
  staticAcademyImporters.length === 0,
  staticAcademyImporters.slice(0, 10).join('\n      ')
);

// ---------------------------------------------------------------------------
console.log('\n--- 2. the platform does not pull the school in with it ---');
// ---------------------------------------------------------------------------
// Every school module reads its content at the top of the module. That is only
// safe because the platform reaches the school through ONE dynamic import, made
// after loadAcademyContent() resolves. A static import anywhere on the boot
// path would evaluate a school module before its Academy exists — and it would
// also drag one curriculum into the chunk that renders the front door, which is
// what kept the bundle at 4,866 kB.

const BOOT = ['src/main.jsx', 'src/FrontDoorGate.jsx', 'src/components/Academy/AcademyShell.jsx'];
const SCHOOL_ROOTS = ['App.jsx', 'store/useAppStore.js', 'SchoolBoot.jsx'];

const bootLeaks = [];
for (const b of BOOT) {
  const file = path.join(REPO, b);
  for (const spec of staticImports(file)) {
    const target = resolveSpec(file, spec);
    if (!target) continue;
    const r = path.relative(SRC, target).split(path.sep).join('/');
    if (SCHOOL_ROOTS.includes(r)) bootLeaks.push(`${b} statically imports ${r}`);
  }
}
ok(
  'the boot path reaches the school only through a dynamic import',
  bootLeaks.length === 0,
  bootLeaks.join('\n      ')
);

const shell = fs.readFileSync(path.join(REPO, 'src/components/Academy/AcademyShell.jsx'), 'utf8');
ok(
  'the shell loads content BEFORE it renders the school',
  /loadAcademyContent\(/.test(shell) && /lazy\(\(\) => import\(/.test(shell),
  'the await is what makes a module-scope content read safe everywhere else'
);
ok(
  'an Academy with no content gets its own screen, never another school',
  /AcademyContentMissing/.test(shell) && /NoCurriculum/.test(shell),
  'falling through to <App /> here is the exact bug C1 fixed'
);

// ---------------------------------------------------------------------------
console.log('\n--- 3. nothing an Academy imports may read content at load time ---');
// ---------------------------------------------------------------------------
// A real circular dependency, found by the check suite rather than by a family:
// three of the Academy's own content files import date helpers out of lib/. So
// loading a manifest evaluates those lib modules WHILE the manifest is still
// loading. A module-scope read there asks for content that has not finished
// arriving, and throws — in the browser as well as in Node.

const seeds = new Set();
for (const f of walk(ACADEMIES)) {
  for (const spec of staticImports(f)) {
    const t = resolveSpec(f, spec);
    if (t && !t.startsWith(ACADEMIES + path.sep)) seeds.add(t);
  }
}
const reachable = new Set();
const stack = [...seeds];
while (stack.length) {
  const f = stack.pop();
  if (reachable.has(f)) continue;
  reachable.add(f);
  for (const spec of staticImports(f)) {
    const t = resolveSpec(f, spec);
    if (t && !t.startsWith(ACADEMIES + path.sep) && !reachable.has(t)) stack.push(t);
  }
}

// Module scope means column zero. A read indented inside a function is the fix.
const MODULE_SCOPE_READ = /^const \{[^}]*\} = academyContent\(\)/m;
const cyclic = [...reachable].filter((f) => MODULE_SCOPE_READ.test(fs.readFileSync(f, 'utf8')));
ok(
  'no module reachable from Academy content reads content at module scope',
  cyclic.length === 0,
  cyclic.map(rel).join('\n      ') +
    '\n      Move the read inside the function that needs it — see lib/scheduler.js.'
);
ok(
  'the check is actually looking at something',
  reachable.size > 0,
  `${reachable.size} modules reachable from Academy content`
);

// ---------------------------------------------------------------------------
console.log('\n--- 4. every Academy answers the contract ---');
// ---------------------------------------------------------------------------
const needs = JSON.parse(fs.readFileSync(path.join(REPO, 'scripts/academy-content-needs.json'), 'utf8'));
const contentSrc = fs.readFileSync(path.join(SRC, 'content/academyContent.js'), 'utf8');
const slots = contentSrc
  .match(/CONTENT_SLOTS = Object\.freeze\(\[([\s\S]*?)\]\)/)[1]
  .match(/'[A-Za-z]+'/g)
  .map((s) => s.replace(/'/g, ''));

// A slot the school reads but the platform never declared is a typo that would
// read undefined at runtime and render an empty screen with no error.
const usedSlots = new Set();
for (const f of school) {
  for (const m of fs.readFileSync(f, 'utf8').matchAll(/academyContent\(\)\.(\w+)/g)) usedSlots.add(m[1]);
}
const undeclared = [...usedSlots].filter((s) => !slots.includes(s));
ok('every slot the school reads is one the platform declares', undeclared.length === 0, undeclared.join(', '));

const academyFolders = fs
  .readdirSync(ACADEMIES, { withFileTypes: true })
  .filter((e) => e.isDirectory() && !e.name.startsWith('_'))
  .map((e) => e.name);

ok('there is at least one Academy to check against', academyFolders.length > 0);

for (const folder of academyFolders) {
  const manifestPath = path.join(ACADEMIES, folder, 'content.js');
  if (!fs.existsSync(manifestPath)) {
    ok(`${folder} has a content.js`, false, 'run scripts/generate-academy-manifest.mjs');
    continue;
  }
  const manifest = fs.readFileSync(manifestPath, 'utf8');

  const provided = new Map();
  for (const m of manifest.matchAll(/export const (\w+) = \{([^}]*)\}/g)) {
    for (const n of m[2].split(',').map((s) => s.trim()).filter(Boolean)) {
      if (!provided.has(n)) provided.set(n, []);
      provided.get(n).push(m[1]);
    }
  }

  // Two modules in one slot exporting one name is a duplicate object key: one
  // silently wins. This Academy had it — both its games defined SCORE_LABELS.
  const dupes = [...provided.entries()].filter(([, slotsFor]) => slotsFor.length > 1);
  ok(
    `${folder}: no name is filled twice`,
    dupes.length === 0,
    dupes.map(([n, s]) => `${n} in ${s.join(', ')}`).join('; ')
  );

  const missing = needs.names.filter((n) => !provided.has(n));
  ok(
    `${folder}: provides every name the school asks for`,
    missing.length === 0,
    `${missing.length} missing: ${missing.slice(0, 8).join(', ')}`
  );

  const declaresSlots = [...manifest.matchAll(/export const (\w+) = /g)].map((m) => m[1]);
  const strange = declaresSlots.filter((s) => !slots.includes(s));
  ok(`${folder}: fills only declared slots`, strange.length === 0, strange.join(', '));
}

// ---------------------------------------------------------------------------
console.log('\n--- 5. the platform still contains no Academy name ---');
// ---------------------------------------------------------------------------
ok(
  'the content interface names no Academy',
  !/academies\/[a-z0-9-]+\//.test(contentSrc.replace(/\*\/[^*]*/g, '')) ||
    !/import\s+.*academies\/[a-z0-9-]+\//.test(contentSrc),
  'the glob is the only way an Academy folder may be reached'
);
ok(
  'Academy folders are found by looking, not by a list',
  /import\.meta\.glob\(/.test(contentSrc) && /export const ACADEMIES = \[\];/.test(fs.readFileSync(path.join(ACADEMIES, 'registry.js'), 'utf8')),
  'a hardcoded list is how a platform quietly becomes single-tenant'
);

// ---------------------------------------------------------------------------
console.log('\n--- 6. the template is a floor, not a curriculum ---');
// ---------------------------------------------------------------------------
// Spec §1 and §3b. Without defaults the contract is all-or-nothing: the school
// reads its content at module scope, so an Academy that does not supply a name
// hands the screen `undefined` and it breaks — for a feature that Academy may
// not even have. The template is what makes a missing name a LESS TAILORED
// school rather than a broken one.
//
// The danger runs the other way too. A template that grew a default subject
// list or default lessons would let a contentless Academy open a school made of
// nothing, hiding the exact state the Empty and Configured screens exist to
// show a family.

const templateDir = path.join(ACADEMIES, '_template');
const templateManifest = path.join(templateDir, 'content.js');
ok('the template exists', fs.existsSync(templateManifest), 'src/academies/_template/content.js');

if (fs.existsSync(templateManifest)) {
  const template = fs.readFileSync(templateManifest, 'utf8');
  const templateSlots = [...template.matchAll(/export const (\w+) = /g)].map((m) => m[1]);

  ok('it fills at least one slot', templateSlots.length > 0, 'an empty template defaults nothing');
  ok(
    'it never fills subjects or lessons',
    !templateSlots.includes('subjects') && !templateSlots.includes('lessons'),
    'a default curriculum is a school made of nothing that still opens'
  );
  ok(
    'it fills only declared slots',
    templateSlots.every((s) => slots.includes(s)),
    templateSlots.filter((s) => !slots.includes(s)).join(', ')
  );

  /**
   * A default nobody reads is dead weight that still has to be maintained.
   *
   * `theme` is exempt because it is the one slot the school never destructures:
   * the Academy shell calls `theme.load()` itself, before the school mounts, so
   * its shape is a function rather than a list of names the inventory knows.
   */
  const templateNames = [...template.matchAll(/export const (\w+) = \{([^}]*)\}/g)]
    .filter(([, slot]) => slot !== 'theme')
    .flatMap(([, , body]) =>
      body
        .split(',')
        .map((s) => s.split(':')[0].trim())
        .filter((s) => /^[A-Za-z_$][\w$]*$/.test(s))
    );
  const unread = templateNames.filter((n) => !needs.names.includes(n));
  ok('every default it provides is one the school actually reads', unread.length === 0, unread.join(', '));
  ok('the check found names to check', templateNames.length > 0, 'the parse silently matched nothing');

  ok(
    'the template is not offered as an Academy',
    !academyFolders.includes('_template'),
    'signing into it would open a school with defaults and no curriculum'
  );

  const contentModule = fs.readFileSync(path.join(SRC, 'content/academyContent.js'), 'utf8');
  ok(
    'the loader merges the template under the Academy',
    /mergeContent\(/.test(contentModule) && /loadTemplate\(\)/.test(contentModule),
    'without the merge the template is a folder nobody reads'
  );
  ok(
    'the loader refuses a template that fills subjects or lessons',
    /NEVER_DEFAULTED/.test(contentModule),
    'the rule has to execute, not just be written down'
  );
  ok(
    'required slots are checked AFTER the merge',
    contentModule.indexOf('mergeContent(await loadTemplate()') <
      contentModule.indexOf('REQUIRED_SLOTS.filter((slot) => !content[slot])'),
    'an Academy that inherits a working guide and theme is not incomplete'
  );
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
