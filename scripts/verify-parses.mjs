// ---------------------------------------------------------------------------
// EVERY SOURCE FILE PARSES. Run: node scripts/verify-parses.mjs
//
// WHY THIS EXISTS. `npm run build` is the real check and it cannot run on the
// Linux side of the Cowork bridge — node_modules carries win32 rollup and
// esbuild binaries, and installing is blocked there. That left a gap where a
// syntax error in a .jsx file would pass all ten other guards (none of them
// import a component) and only surface when the parent ran the app.
//
// @babel/parser is already in node_modules and is pure JavaScript, so it runs
// anywhere. This does NOT replace the build — it will not catch a bad import
// path, a missing export or a type error. It catches the one class of mistake
// the other guards structurally cannot see: a file that is not valid syntax.
//
// Still run START-MISSION-CONTROL.bat on Windows before go-live.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { parse } from '../node_modules/@babel/parser/lib/index.js';

let checked = 0;
const failures = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
      walk(full);
    } else if (/\.(jsx?|mjs)$/.test(entry.name)) {
      checked += 1;
      try {
        parse(fs.readFileSync(full, 'utf8'), { sourceType: 'module', plugins: ['jsx'] });
      } catch (e) {
        failures.push(`${full}: ${e.message}`);
      }
    }
  }
}

walk('src');
walk('scripts');

for (const f of failures) console.log('FAIL  ' + f);
console.log(`\n${checked - failures.length}/${checked} files parse`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('ALL CHECKS PASSED');
}
