// ---------------------------------------------------------------------------
// THE ACADEMY A CHECK SCRIPT RUNS AGAINST.
//
// Import this FIRST, before any school module:
//
//   import './lib/academy-under-test.mjs';
//
// ---- WHY THIS EXISTS ----
//
// School modules read their content at the top of the module now:
//
//   const { WEEK_PATTERN } = academyContent().timetable;
//
// In the browser that is safe, because the platform reaches the school through
// one dynamic import made only after the Academy's content has loaded. A check
// script has no shell and no sign-in, so it has to do that step itself.
//
// A static import is evaluated before the importing module's body, so one line
// at the top of a check does the whole job — the awaited imports further down
// then find content already installed.
//
// ---- WHY IT FINDS THE ACADEMY RATHER THAN NAMING ONE ----
//
// Same rule as everywhere else: nothing in the platform or its tooling names an
// Academy. This reads whichever folders exist and, when there is exactly one,
// uses it. With more than one it asks to be told, because a check that silently
// picks the first of several would pass or fail depending on alphabetical order.
//
//   ACADEMY=petal-pestle-academy node scripts/verify-typing.mjs
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const ACADEMIES = path.join(REPO, 'src/academies');

const folders = fs
  .readdirSync(ACADEMIES, { withFileTypes: true })
  .filter((e) => e.isDirectory() && !e.name.startsWith('_'))
  .map((e) => e.name)
  .filter((name) => fs.existsSync(path.join(ACADEMIES, name, 'content.js')));

const chosen = process.env.ACADEMY || (folders.length === 1 ? folders[0] : null);

if (!chosen) {
  throw new Error(
    folders.length
      ? `This build carries ${folders.length} Academies (${folders.join(', ')}). ` +
        'Say which one this check runs against: ACADEMY=<folder> node scripts/<check>.mjs'
      : 'No Academy folder with a content.js. Run: node scripts/generate-academy-manifest.mjs <folder>'
  );
}

const manifest = await import(path.join(ACADEMIES, chosen, 'content.js'));
const { installAcademyContent } = await import(path.join(REPO, 'src/content/academyContent.js'));

installAcademyContent(manifest, chosen);

export const academyUnderTest = chosen;
