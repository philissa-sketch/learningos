// ---------------------------------------------------------------------------
// IMPORTING THE PLATFORM'S OWN MODULES INTO PLAIN NODE.
//
// Import this FIRST in a check that needs to run real modules rather than read
// them as text:
//
//   import { loadedFiles } from './lib/jsx-loader.mjs';
//
// ---- WHY A CHECK WOULD WANT THIS ----
//
// Every text-based guard in this folder asserts what a file SAYS. None of them
// asserts that the platform can be loaded at all. That gap is not theoretical:
// a module-scope read of a slot an Academy does not fill threw while the school
// was being imported, before React mounted anything, and the result was a white
// page with no error on screen. A guard that greps cannot see it. A guard that
// imports sees it immediately.
//
// ---- WHAT IT DOES ----
//
// Two transforms, both the smallest thing that works:
//
//   .jsx  — sucrase, JSX only. Not a build: no bundling, no minifying, no
//           resolution changes. The module graph Node walks is the real one.
//   .css  — an empty module. A stylesheet import is a bundler instruction, and
//           in Node it is noise; stubbing it is not weakening anything, because
//           no assertion anywhere depends on a rule loading.
//
// It also RECORDS every file the graph pulls in, which is the point of loading
// the platform rather than reading it: what a module imports transitively is a
// fact no regex can reach, and "the platform reaches into no school's folder"
// is exactly that kind of fact.
//
// ---- WHY SUCRASE AND NOT THE BUILD ----
//
// `npm run build` is the real answer and cannot run here — node_modules carries
// platform-specific rollup and esbuild binaries. verify-parses.mjs already made
// this trade for @babel/parser: a pure-JavaScript tool that is already present
// runs anywhere, and covers a class of fault nothing else can see. Same trade,
// same reasoning. This does NOT replace the build.
//
// sucrase arrives as a transitive dependency rather than a declared one, so it
// can disappear on an unrelated install. That is why the absence below throws
// with an instruction instead of failing somewhere confusing three imports
// later. If it does disappear, declaring it as a devDependency is the fix.
// ---------------------------------------------------------------------------
import { registerHooks } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

const SUCRASE = path.join(REPO, 'node_modules/sucrase/dist/index.js');
if (!fs.existsSync(SUCRASE)) {
  throw new Error(
    'scripts/lib/jsx-loader.mjs needs sucrase to read .jsx in plain Node, and it is not ' +
      'in node_modules. It has been arriving as a transitive dependency; declare it: ' +
      'npm install --save-dev sucrase'
  );
}
const { transform } = await import(pathToFileURL(SUCRASE).href);

/**
 * Every file this process loaded, repo-relative.
 *
 * Populated as the graph is walked, so a check can assert what the platform
 * actually reached rather than what its import lines appear to say.
 */
export const loadedFiles = new Set();

/** How many .jsx files the transform handled. Zero means the hook is not firing. */
export let transformedJsx = 0;

registerHooks({
  load(url, context, nextLoad) {
    if (url.startsWith('file:')) {
      const file = fileURLToPath(url);
      if (file.startsWith(REPO + path.sep) && !file.includes('node_modules')) {
        loadedFiles.add(path.relative(REPO, file).split(path.sep).join('/'));
      }
      if (url.endsWith('.css')) {
        return { format: 'module', shortCircuit: true, source: 'export default {};' };
      }
      if (url.endsWith('.jsx')) {
        transformedJsx += 1;
        return {
          format: 'module',
          shortCircuit: true,
          source: transform(fs.readFileSync(file, 'utf8'), {
            transforms: ['jsx'],
            jsxRuntime: 'automatic',
            filePath: file
          }).code
        };
      }
    }
    return nextLoad(url, context);
  }
});
