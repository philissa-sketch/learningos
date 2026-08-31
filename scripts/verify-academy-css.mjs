// ---------------------------------------------------------------------------
// AN ACADEMY'S STYLESHEET BUILDS ON ITS OWN.
// Run: node scripts/verify-academy-css.mjs
//
// This exists because of a build that failed, and it failed for a reason that
// is invisible when you read the file.
//
// `index.css` used to carry one Academy's theme, next to the @tailwind
// directives. Moving that theme into `academies/<id>/academy.css` and stripping
// the directives — so the framework is not emitted twice — left the `@layer
// base { }` and `@layer utilities { }` wrappers behind. That reads fine. It
// does not build:
//
//     [vite:css] [postcss] academy.css: '@layer base' is used but no matching
//     '@tailwind base' directive is present.
//
// PostCSS processes every CSS file as its own entry. An Academy stylesheet is
// imported by a component, so Tailwind runs over it ALONE, and a @layer with
// nothing to attach to is a hard error. `@apply` is fine — the plugin is
// running either way. It is only `@layer` that needs the directive.
//
// Two rules, then, for every Academy stylesheet, and both are cheap to check
// and expensive to rediscover:
//
//   1. no @layer without @tailwind in the same file
//   2. no @tailwind at all — index.css already emits it once
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');

/** CSS with comments stripped — this file's own prose names both directives. */
const cssOnly = (rel) => read(rel).replace(/\/\*[\s\S]*?\*\//g, '');

function cssFiles(dir, acc = []) {
  const full = path.join(REPO, dir);
  if (!fs.existsSync(full)) return acc;
  for (const entry of fs.readdirSync(full, { withFileTypes: true })) {
    const rel = `${dir}/${entry.name}`;
    if (entry.isDirectory()) cssFiles(rel, acc);
    else if (entry.name.endsWith('.css')) acc.push(rel);
  }
  return acc;
}

let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) {
    passed += 1;
    console.log('PASS  ' + label);
  } else {
    failures.push(label);
    console.log('FAIL  ' + label + (detail ? `\n      ${detail}` : ''));
  }
}

const all = cssFiles('src');
const entry = 'src/index.css';
const others = all.filter((f) => f !== entry);

console.log(`--- ${all.length} stylesheets: 1 entry, ${others.length} imported ---\n`);

console.log('--- 1. exactly one file emits Tailwind ---');

const emitters = all.filter((f) => /^@tailwind\s/m.test(cssOnly(f)));
ok('only index.css has @tailwind directives',
  emitters.length === 1 && emitters[0] === entry,
  emitters.join(', ') + ' — a second copy ships the whole framework twice');

ok('...and it has all three', ['base', 'components', 'utilities']
  .every((l) => new RegExp(`^@tailwind ${l};`, 'm').test(cssOnly(entry))));

console.log('\n--- 2. no imported stylesheet uses @layer ---');

const layered = others.filter((f) => /^@layer\s/m.test(cssOnly(f)));
ok('no imported stylesheet declares a @layer',
  layered.length === 0,
  layered.join(', ') +
    "\n      PostCSS runs over each file alone; @layer with no @tailwind in the" +
    '\n      SAME file is a build error. Use plain rules — @apply still works.');

console.log('\n--- 3. an Academy stylesheet is loaded by its Academy, not the platform ---');

const academyCss = all.filter((f) => f.startsWith('src/academies/'));
ok('the platform entry does not import an Academy stylesheet',
  !/@import[^;]*academies\//.test(cssOnly(entry)),
  'index.css naming one Academy is the thing splitting these files was for');

// Each Academy stylesheet must actually be reached by something, or it is a
// theme nobody wears and a build nobody notices is broken.
for (const css of academyCss) {
  const base = path.basename(css);
  const importers = [];
  const walk = (dir) => {
    for (const e of fs.readdirSync(path.join(REPO, dir), { withFileTypes: true })) {
      const rel = `${dir}/${e.name}`;
      if (e.isDirectory()) walk(rel);
      else if (/\.jsx?$/.test(e.name) && read(rel).includes(base)) importers.push(rel);
    }
  };
  walk('src');
  ok(`${base} is imported by something`, importers.length > 0, 'nothing loads it');
}

console.log('\n--- 4. the theme variables survived the move ---');

// The palette is read by tailwind.config.js as `rgb(var(--x) / <alpha-value>)`.
// A hex here instead of space-separated channels breaks every opacity modifier
// in the app silently — nothing errors, the colours just stop responding.
for (const css of academyCss) {
  const text = cssOnly(css);
  const vars = [...text.matchAll(/--(space|ink|signal)[\w-]*\s*:\s*([^;]+);/g)];
  if (vars.length === 0) continue;
  const bad = vars.filter(([, , v]) => v.trim().startsWith('#'));
  ok(`${path.basename(css)} keeps its palette as RGB channels, not hex`,
    bad.length === 0,
    bad.map(([m]) => m.trim()).join('; ') +
      ' — tailwind.config.js reads these through rgb(var(--x) / <alpha-value>)');
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
