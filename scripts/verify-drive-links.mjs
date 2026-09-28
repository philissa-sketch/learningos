import './lib/academy-under-test.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

/**
 * =============================================================================
 * NO LINK THE APP CANNOT CHECK IS EVER PRESENTED AS ONE THAT WORKS.
 * =============================================================================
 *
 * WHY THIS EXISTS. (Sept 28, 2026.)
 *
 * The parent, on the cell-model card: **"this link leads to 404 error
 * message."** Eight Google Drive folder ids had been baked into
 * `src/lib/driveLinks.js` on Aug 6, 2026. They were real that day. The folders
 * were later deleted, and the app went on presenting all eight as working
 * links for seven weeks, because a Drive id is an opaque string on somebody
 * else's server: nothing in this codebase can open it, check it, or tell a
 * live folder from a deleted one.
 *
 * A child told "upload it here" who lands on a 404 concludes his work has
 * nowhere to go. The honest state — "no folder linked yet, here is how to link
 * one" — existed the whole time and was not used, because a seeded link made
 * the first open look finished.
 *
 * The properties held here:
 *
 *   1. No external id ships in the source. The only Google ids allowed
 *      anywhere under src/ are the eight retired ones, in the list that exists
 *      to CLEAR them.
 *   2. Nothing is seeded. Every folder starts unlinked.
 *   3. The retired list is exact, and clears only exact matches — a folder the
 *      parent pasted herself is never overruled by the app.
 *   4. Hydrate actually clears them, in the database as well as in memory.
 *      Removing the seeds from the code fixes nothing on a computer that has
 *      already run the app.
 *   5. Every card that offers a folder handles not having one.
 */

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const load = (rel) => import(pathToFileURL(path.join(REPO, rel)).href);
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');
const strip = (src) => src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

let passed = 0;
const failures = [];
const ok = (label, cond, detail = '') => {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
};

const D = await load('src/lib/driveLinks.js');

/** Every .js/.jsx under src/, walked. */
function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(js|jsx)$/.test(entry.name)) out.push(full);
  }
  return out;
}

console.log('\n--- 1. no external id ships in the source ---');
/**
 * A real id, not a placeholder. `https://drive.google.com/...` in an input's
 * placeholder is a hint to the parent, not a link, and must stay allowed.
 */
const ID_RE = /(?:drive|docs)\.google\.com\/[A-Za-z0-9/_-]*\/(?:folders|d)\/([A-Za-z0-9_-]{20,})/g;
const files = walk(path.join(REPO, 'src'));
ok('the sweep found the whole app, not an empty list', files.length > 400, `${files.length} files`);

const offenders = [];
for (const file of files) {
  const rel = path.relative(REPO, file).replace(/\\/g, '/');
  for (const m of fs.readFileSync(file, 'utf8').matchAll(ID_RE)) {
    if (rel === 'src/lib/driveLinks.js' && D.RETIRED_FOLDER_URLS.some((u) => u.includes(m[1]))) continue;
    offenders.push(`${rel}: ${m[1]}`);
  }
}
ok('no Google Drive or Docs id is hardcoded anywhere in the app', offenders.length === 0,
  offenders.join(' | ') + '  <- the app cannot check this id, so it must not present it as a working link');

console.log('\n--- 2. nothing is seeded ---');
ok('the seed map exists, so the store keeps its shape', D.SEEDED_FOLDER_URLS !== undefined);
ok('and it seeds nothing', Object.keys(D.SEEDED_FOLDER_URLS).length === 0,
  Object.keys(D.SEEDED_FOLDER_URLS).join(', ') + '  <- a seeded link makes the first open look finished when it is not');
ok('every folder slot therefore starts unlinked',
  D.EVIDENCE_FOLDER_KEYS.every((k) => !D.SEEDED_FOLDER_URLS[k]));

console.log('\n--- 3. the retired list is exact ---');
ok('all eight dead links are listed', D.RETIRED_FOLDER_URLS.length === 8, `${D.RETIRED_FOLDER_URLS.length} listed`);
ok('each one is a Drive folder url', D.RETIRED_FOLDER_URLS.every((u) => /^https:\/\/drive\.google\.com\/drive\/folders\/[A-Za-z0-9_-]{20,}$/.test(u)));
ok('no duplicates', new Set(D.RETIRED_FOLDER_URLS).size === 8);
ok('a retired link is recognised', D.isRetiredFolderUrl(D.RETIRED_FOLDER_URLS[0]) === true);
ok('...even with stray whitespace', D.isRetiredFolderUrl(`  ${D.RETIRED_FOLDER_URLS[0]} `) === true);
/**
 * The load-bearing half. Clearing too much is worse than clearing too little:
 * the app has no standing to overrule the parent about her own Drive.
 */
ok("a folder the parent pasted is NOT cleared",
  D.isRetiredFolderUrl('https://drive.google.com/drive/folders/HerOwnFolderId1234567890') === false);
ok('a retired id inside a longer url is not matched',
  D.isRetiredFolderUrl(D.RETIRED_FOLDER_URLS[0] + '/subfolder/xyz') === false,
  'substring matching would clear a real folder that happens to sit under a retired one');
for (const junk of [null, undefined, '', 42, {}]) {
  ok(`${JSON.stringify(junk)} is not a retired link`, D.isRetiredFolderUrl(junk) === false);
}

console.log('\n--- 4. hydrate clears them, in the database too ---');
const storeCode = strip(read('src/store/useAppStore.js'));
ok('the store imports the check', storeCode.includes('isRetiredFolderUrl'));
ok('hydrate tests saved links against it', /isRetiredFolderUrl\(row\.url\)/.test(storeCode),
  'a link already written to the database is not fixed by editing the code it came from');
ok('a cleared link is persisted, not just blanked in memory',
  /deadLinkKeys[\s\S]{0,200}saveEvidenceLinkRecord\(key, null\)/.test(storeCode),
  'without the write it comes back on the next open');
ok('a link the parent pasted takes the other branch',
  /else \{\s*evidenceLinks\[row\.key\] = row\.url/.test(storeCode));

console.log('\n--- 5. a card without a folder says so ---');
const photoCode = strip(read('src/components/Academic/BuildPhotoLink.jsx'));
ok('the build-photo card reads the live link, not a constant',
  /evidenceLinks\?\.portfolio/.test(photoCode) && !/SEEDED_FOLDER_URLS/.test(photoCode),
  'this is the card the parent was looking at when she found the 404');
ok('it renders the folder link only when there is one', /folder \?/.test(photoCode));
ok('and says where to set one when there is not', /Parent Dashboard/.test(photoCode),
  'a dead end with no way out is what made the 404 worse than nothing');
ok('he can still paste a photo link with no folder linked',
  /Save photo link|Remove/.test(photoCode),
  'only step 2 needs the folder; the rest of the card must keep working');

const evidenceCode = strip(read('src/components/Dashboard/EvidenceLink.jsx'));
const unguarded = [...evidenceCode.matchAll(/href=\{folderUrl\}/g)].length;
const guarded = [...evidenceCode.matchAll(/folderUrl &&/g)].length;
ok('every folder link in the shared evidence UI is guarded', guarded >= unguarded,
  `${unguarded} links, ${guarded} guards`);

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) { console.log(`\n${failures.length} CHECK(S) FAILED`); process.exit(1); }
console.log('\nALL CHECKS PASSED');
