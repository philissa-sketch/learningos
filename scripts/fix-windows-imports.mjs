// ---------------------------------------------------------------------------
// fix-windows-imports.mjs — make every check script's dynamic import() work on
// Windows.
//
// ---- THE BUG ----
//
//     const fd = await import(REPO + '/src/lib/frontDoor.js');
//
// On Windows REPO is `C:\Users\pknot\Downloads\learningos`, so the string handed
// to import() begins `C:` and Node rejects it:
//
//     ERR_UNSUPPORTED_ESM_URL_SCHEME ... Received protocol 'c:'
//
// The same line works on a POSIX path, where the string starts with `/` and
// happens to parse as a path. So the suite could only ever be green in a Linux
// sandbox, and the standing rule — run the checks on her machine, not in a
// sandbox — has never been satisfiable. 37 of 65 verify scripts carry this.
//
// ---- WHY A CODEMOD AND NOT 36 HAND EDITS ----
//
// Three scripts in this folder already carry a hand-rolled Windows-safe helper.
// So this was hit three times before and fixed one file at a time, never as a
// class — the same habit this repo's notes already name in its guards. 150 hand
// edits across 36 files is how the fourth instance gets missed too.
//
// ---- THE FIX IT APPLIES ----
//
// One helper per file, named for what it returns, using the Node API built for
// this. Never a hand-built 'file://' string: a drive letter, a space in a folder
// name and a backslash each break a different naive version, which is why there
// are already three different hand-rolled ones here.
//
//     const moduleUrl = (rel) => pathToFileURL(path.join(REPO, rel)).href;
//     ...
//     const fd = await import(moduleUrl('src/lib/frontDoor.js'));
//
// ---- WHAT IT WILL NOT TOUCH ----
//
//   - relative imports: import('./x.js'), import('../x.js')
//   - bare and node: specifiers: import('fake-indexeddb/auto'), import('node:fs')
//   - already-correct calls: import(moduleUrl(...)), import(url(...)),
//     import(pathToFileURL(...)), import(someVariable)
//   - the three existing hand-rolled url() helpers — they work; churning them
//     would put 3 files of noise in a diff for no behaviour change
//
// ---- USE ----
//
//     node scripts/fix-windows-imports.mjs           dry run, writes nothing
//     node scripts/fix-windows-imports.mjs --write    applies
//
// It runs `node --check` on every file it is about to write and aborts the whole
// run without writing anything if any file fails to parse. All-or-nothing on
// purpose: a half-applied codemod across 36 files is worse than none.
// ---------------------------------------------------------------------------

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SCRIPTS = path.join(REPO, 'scripts');
const WRITE = process.argv.includes('--write');
const SELF = path.basename(fileURLToPath(import.meta.url));

/** The base-path identifiers this repo's scripts use. */
const BASE_VARS = ['REPO', 'ROOT', 'root', 'repo'];

/* ==========================================================================
 * Finding an import() call and its argument.
 *
 * A regex cannot do this: several call sites span lines, and one argument is a
 * template literal containing its own ${...}. So the argument is read by
 * walking forward from the open paren, counting depth and honouring quotes,
 * template literals and escapes — the same shape of scan verify-parses trusts a
 * real parser for, kept small here because it only has to find a boundary.
 * ======================================================================== */
/**
 * The source with every comment blanked to spaces, same length, same offsets.
 *
 * ⚠️ THE REASON THIS EXISTS, AND IT IS NOT HYPOTHETICAL.
 *
 * The first version of this codemod scanned the raw source and reported a broken
 * call site in verify-front-door.mjs — which had already been fixed. What it had
 * found was the sentence `await import(REPO + '/src/…')` inside the comment
 * explaining the fix. It was about to rewrite prose.
 *
 * That is the sixth instance in this repo of a guard matching its own
 * explanation instead of code, and the first one committed by a tool built after
 * the habit was written down. Offsets are preserved rather than the comments
 * removed, so every edit still lands on the real file.
 */
function maskComments(src) {
  const out = src.split('');
  let i = 0;
  let mode = null; // 'line' | 'block' | 'sq' | 'dq' | 'tmpl'
  const blank = (at) => { if (out[at] !== '\n') out[at] = ' '; };
  while (i < src.length) {
    const c = src[i];
    const d = src[i + 1];
    if (mode === null) {
      if (c === '/' && d === '/') { mode = 'line'; blank(i); blank(i + 1); i += 2; continue; }
      if (c === '/' && d === '*') { mode = 'block'; blank(i); blank(i + 1); i += 2; continue; }
      if (c === '\'') { mode = 'sq'; i++; continue; }
      if (c === '"') { mode = 'dq'; i++; continue; }
      if (c === '`') { mode = 'tmpl'; i++; continue; }
      i++; continue;
    }
    if (mode === 'line') { if (c === '\n') mode = null; else blank(i); i++; continue; }
    if (mode === 'block') {
      if (c === '*' && d === '/') { blank(i); blank(i + 1); mode = null; i += 2; continue; }
      blank(i); i++; continue;
    }
    // inside a string: honour escapes, do not blank
    if (c === '\\') { i += 2; continue; }
    if ((mode === 'sq' && c === '\'') || (mode === 'dq' && c === '"') || (mode === 'tmpl' && c === '`')) {
      mode = null;
    }
    i++;
  }
  return out.join('');
}

function findImportCalls(rawSrc) {
  const src = maskComments(rawSrc);
  const calls = [];
  const re = /\bimport\s*\(/g;
  let m;
  while ((m = re.exec(src))) {
    // `import.meta` is not a call; `.import(` is a method on something else.
    const before = src.slice(Math.max(0, m.index - 1), m.index);
    if (before === '.') continue;

    const open = src.indexOf('(', m.index);
    let i = open + 1;
    let depth = 1;
    let quote = null;
    let tmplDepth = 0;

    while (i < src.length && depth > 0) {
      const c = src[i];
      if (quote) {
        if (c === '\\') { i += 2; continue; }
        if (quote === '`' && c === '$' && src[i + 1] === '{') { tmplDepth++; i += 2; continue; }
        if (quote === '`' && c === '}' && tmplDepth > 0) { tmplDepth--; i++; continue; }
        if (c === quote && tmplDepth === 0) quote = null;
        i++;
        continue;
      }
      if (c === '\'' || c === '"' || c === '`') { quote = c; i++; continue; }
      if (c === '(') depth++;
      else if (c === ')') depth--;
      if (depth === 0) break;
      i++;
    }
    if (depth !== 0) continue; // unbalanced — leave it alone
    calls.push({ start: m.index, argStart: open + 1, argEnd: i, callEnd: i + 1 });
  }
  return calls;
}

/* ==========================================================================
 * Classifying one argument.
 *
 * Returns { base, rel, quoted } when it is a concatenated absolute path this
 * codemod should rewrite, and null for everything it must leave alone.
 * ======================================================================== */
function classify(arg) {
  const a = arg.trim();
  const bases = BASE_VARS.join('|');

  // Try the three broken shapes FIRST.
  //
  // ⚠️ Order matters, and the first version had it wrong. The "leave a bare
  // specifier alone" guard below matches a leading lowercase letter, so
  // `'file://' + root + '/…'` was silently classified as a package name and
  // skipped — the one call site in the repo already carrying a half-fix was the
  // one the codemod could not see. Rewrite patterns are tested before any
  // exclusion, so an exclusion can never swallow a real hit again.

  //  'file://' + root + '/src/x.js'   — the naive fix, still broken on Windows:
  //  root is C:\… so the result is `file://C:\…`, backslashes and all
  let m = a.match(
    new RegExp(`^'file://'\\s*\\+\\s*(${bases})\\s*\\+\\s*(['"])(/.+?)\\2$`, 's')
  );
  if (m) return { base: m[1], rel: m[3].replace(/^\/+/, ''), quoted: `'` };

  //  REPO + '/src/x.js'
  m = a.match(new RegExp(`^(${bases})\\s*\\+\\s*(['"])(/.+?)\\2$`, 's'));
  if (m) return { base: m[1], rel: m[3].replace(/^\/+/, ''), quoted: `'` };

  //  `${REPO}/src/x.js`  — the tail may contain further ${} of its own
  m = a.match(new RegExp(`^\`\\$\\{(${bases})\\}(/[^\`]+)\`$`, 's'));
  if (m) return { base: m[1], rel: m[2].replace(/^\/+/, ''), quoted: '`' };

  //  path.join(A, b, 'c.js')  /  path.resolve(...)
  //
  //  ⚠️ THE THIRD SHAPE, AND THE ONE THAT MATTERED MOST. path.join returns a
  //  PATH, so on Windows it starts with a drive letter and import() rejects it
  //  exactly like a concatenated string. The first version of this codemod knew
  //  only the two concatenation shapes, so it walked straight past
  //  scripts/lib/academy-under-test.mjs — the file every school-facing check
  //  imports FIRST, and therefore the single file holding 31 checks down.
  //  Arguments here can be any expression, so this shape is WRAPPED where it
  //  stands rather than rewritten into a repo-relative helper.
  if (/^path\.(join|resolve)\s*\(/.test(a)) return { wrap: true };

  // Everything else is left exactly as it is: already-correct helper calls,
  // relative and bare specifiers, and any expression this codemod cannot read.
  return null;
}

/* ==========================================================================
 * Editing one file.
 * ======================================================================== */
const HELPER_NAME = 'moduleUrl';

function helperBlock(base) {
  return `
/**
 * A repo-relative path as a module URL.
 *
 * \`await import(${base} + '/src/…')\` worked everywhere it was ever run and could
 * never work on Windows: ${base} is \`C:\\Users\\…\` there, so the string handed to
 * import() begins \`C:\` and Node rejects it as an unknown URL scheme —
 * ERR_UNSUPPORTED_ESM_URL_SCHEME, protocol 'c:'. pathToFileURL is the Node API
 * for exactly this; do not hand-build a file:// string, because a drive letter,
 * a space in a folder name and a backslash each break a different naive version.
 */
const ${HELPER_NAME} = (rel) => pathToFileURL(path.join(${base}, rel)).href;
`;
}

function transform(file, src) {
  const calls = findImportCalls(src);
  const hits = [];
  for (const c of calls) {
    const arg = src.slice(c.argStart, c.argEnd);
    const cls = classify(arg);
    if (cls) hits.push({ ...c, ...cls, arg });
  }
  if (hits.length === 0) return { changed: false, count: 0 };

  const basesUsed = [...new Set(hits.filter((h) => !h.wrap).map((h) => h.base))];
  if (basesUsed.length > 1) {
    return {
      changed: false,
      count: hits.length,
      skip: `uses more than one base identifier (${basesUsed.join(', ')}) — needs a hand edit`
    };
  }
  const base = basesUsed[0]; // undefined when this file has only wrap-shape hits

  // Rewrite call sites back-to-front so earlier offsets stay valid.
  let out = src;
  for (const h of [...hits].sort((a, b) => b.argStart - a.argStart)) {
    const replacement = h.wrap
      ? `pathToFileURL(${h.arg.trim()}).href`
      : `${HELPER_NAME}(${h.quoted === '`' ? `\`${h.rel}\`` : `'${h.rel}'`})`;
    out = out.slice(0, h.argStart) + replacement + out.slice(h.argEnd);
  }

  // Ensure pathToFileURL is imported.
  if (!/\bpathToFileURL\b/.test(out.split('\n').slice(0, 40).join('\n'))) {
    const named = out.match(/^import\s*\{([^}]*)\}\s*from\s*'node:url';\s*$/m);
    if (named) {
      const names = named[1].split(',').map((s) => s.trim()).filter(Boolean);
      if (!names.includes('pathToFileURL')) names.push('pathToFileURL');
      out = out.replace(named[0], `import { ${names.join(', ')} } from 'node:url';`);
    } else {
      const lastImport = [...out.matchAll(/^import .*;\s*$/gm)].pop();
      if (!lastImport) return { changed: false, count: hits.length, skip: 'no import block found' };
      out =
        out.slice(0, lastImport.index + lastImport[0].length) +
        `\nimport { pathToFileURL } from 'node:url';` +
        out.slice(lastImport.index + lastImport[0].length);
    }
  }

  // Ensure `path` is imported — the moduleUrl helper uses path.join. A file with
  // only wrap-shape hits already had path in scope to have written path.join.
  if (base && !/^import\s+path\s+from\s+'node:path';/m.test(out) && !/^import\s+\*\s+as\s+path/m.test(out)) {
    const lastImport = [...out.matchAll(/^import .*;\s*$/gm)].pop();
    out =
      out.slice(0, lastImport.index + lastImport[0].length) +
      `\nimport path from 'node:path';` +
      out.slice(lastImport.index + lastImport[0].length);
  }

  // Insert the helper after the base declaration, so it reads in dependency
  // order even though it does not depend on the base at module scope.
  if (base && !new RegExp(`const\\s+${HELPER_NAME}\\s*=`).test(out)) {
    const decl = out.match(new RegExp(`^const\\s+${base}\\s*=.*$`, 'm'));
    if (!decl) return { changed: false, count: hits.length, skip: `no \`const ${base} =\` line to anchor the helper` };
    const at = decl.index + decl[0].length;
    out = out.slice(0, at) + helperBlock(base) + out.slice(at);
  }

  return { changed: out !== src, count: hits.length, out, base };
}

/* ==========================================================================
 * Run.
 * ======================================================================== */
/**
 * Every .mjs under scripts/, INCLUDING subdirectories.
 *
 * ⚠️ The first version used a flat readdirSync and therefore never looked in
 * scripts/lib/. That is where academy-under-test.mjs lives — the file every
 * school-facing check imports on its first line — so the fix reported success
 * while 31 checks still could not start. A scan that cannot see a whole folder
 * is not a smaller version of the right scan; it is a wrong answer that looks
 * like a right one.
 */
function allScripts(dir = SCRIPTS, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || e.name === 'node_modules') continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) allScripts(full, acc);
    else if (e.name.endsWith('.mjs')) acc.push(path.relative(SCRIPTS, full));
  }
  return acc;
}

const files = allScripts().filter((f) => f !== SELF).sort();

const planned = [];
const skipped = [];
let clean = 0;

for (const f of files) {
  const full = path.join(SCRIPTS, f);
  const src = fs.readFileSync(full, 'utf8');
  const res = transform(f, src);
  if (res.skip) skipped.push({ f, ...res });
  else if (res.changed) planned.push({ f, full, src, ...res });
  else clean++;
}

console.log(`\n${WRITE ? 'APPLYING' : 'DRY RUN — nothing will be written'}`);
console.log(`scripts scanned: ${files.length}   already clean: ${clean}\n`);

if (planned.length) {
  console.log(`to fix: ${planned.length} files, ${planned.reduce((n, p) => n + p.count, 0)} call sites`);
  for (const p of planned.sort((a, b) => b.count - a.count)) {
    console.log(`  ${String(p.count).padStart(3)}  ${p.f}   (base: ${p.base})`);
  }
} else {
  console.log('to fix: nothing');
}

if (skipped.length) {
  console.log(`\nSKIPPED — needs a hand edit: ${skipped.length}`);
  for (const s of skipped) console.log(`  ${String(s.count).padStart(3)}  ${s.f}  — ${s.skip}`);
}

if (!WRITE) {
  console.log('\nNothing written. Re-run with --write to apply.\n');
  process.exit(0);
}

// ---- syntax-check everything BEFORE writing anything -----------------------
const tmp = path.join(SCRIPTS, '.fix-windows-imports-tmp');
fs.mkdirSync(tmp, { recursive: true });
const bad = [];
for (const p of planned) {
  const probe = path.join(tmp, p.f.replace(/[\\/]/g, '__'));
  fs.writeFileSync(probe, p.out, 'utf8');
  try {
    execFileSync(process.execPath, ['--check', probe], { stdio: 'pipe' });
  } catch (e) {
    bad.push({ f: p.f, err: String(e.stderr || e.message).split('\n').slice(0, 4).join('\n') });
  }
}
fs.rmSync(tmp, { recursive: true, force: true });

if (bad.length) {
  console.log(`\nABORTED — ${bad.length} file(s) would not parse. NOTHING was written.`);
  for (const b of bad) console.log(`\n  ${b.f}\n${b.err}`);
  process.exit(1);
}

for (const p of planned) fs.writeFileSync(p.full, p.out, 'utf8');
console.log(`\nWrote ${planned.length} files. All parsed clean before writing.`);
console.log('Next: RUN-THE-CHECKS.bat, and expect checks that have never executed here to have opinions.\n');
