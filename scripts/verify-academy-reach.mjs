// ---------------------------------------------------------------------------
// NOTHING AN ACADEMY RELIES ON DISAPPEARS ON ITS OWN.
// Run: node scripts/verify-academy-reach.mjs
//
// ---- THE RULE THIS ENFORCES ----
//
//   A PLATFORM CHANGE THAT REMOVES SOMETHING AN ACADEMY RELIES ON DOES NOT SHIP
//   WITHOUT THE REPLACEMENT, IN THE SAME COMMIT.
//
// Not a convention. This check is why it holds.
//
// ---- WHY IT EXISTS ----
//
// On Sept 9, 2026 the nav bar stopped hardcoding a tab list, so tabs come from
// each Academy's own manifest. That was correct platform work. It was committed
// and deployed on its own, and a live school lost two tabs it had every day —
// the screens still existed, nothing in the records changed, and there was no
// way to reach them.
//
// A guard caught it and went red. The commit shipped anyway. So detection was
// never the problem; releasing over a red check was. This check exists to make
// that impossible to do quietly: it fails while any Academy is missing a tab it
// used to reach, and it is wired into `npm run build`, so a build cannot carry
// the removal without the replacement.
//
// ---- WHY A BASELINE AND NOT AN INFERENCE ----
//
// The tempting version guesses which screens an Academy needs from the names in
// its content — "this one exports guitarSkillLadder, so it wants a guitar tab."
// Short view ids make that fragile: `pe` is a substring of `recipeLibrary`, and
// this repo has already paid for matching on labels instead of identifiers.
//
// So the answer is a ratchet, the same mechanism `generic-debt.json` uses. The
// recorded set may GROW freely — a new tab is progress. It may only shrink by
// editing this file, which puts the decision in the diff where a person sees it.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { slotFor } from './scan-content-needs.mjs';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');
const url = (rel) => 'file:///' + path.join(REPO, rel).replace(/\\/g, '/');

let passed = 0;
const failures = [];
function ok(desc, cond, hint) {
  if (cond) { passed += 1; console.log(`PASS  ${desc}`); }
  else { failures.push(desc); console.log(`FAIL  ${desc}${hint ? `\n      ${hint}` : ''}`); }
}

const BASE = JSON.parse(read('scripts/academy-reach-baseline.json'));
const app = read('src/App.jsx');
const RENDERABLE = new Set([...app.matchAll(/view === '([a-zA-Z-]+)'/g)].map((m) => m[1]));

const ACADEMIES = path.join(REPO, 'src/academies');
const folders = fs.readdirSync(ACADEMIES, { withFileTypes: true })
  .filter((e) => e.isDirectory() && !e.name.startsWith('_'))
  .map((e) => e.name);

ok('there is at least one Academy to check', folders.length > 0);
ok('the shell was actually read', RENDERABLE.size > 5,
  'if this is empty every tab below passed for free');

const template = await import(url('src/academies/_template/content.js'));

for (const id of folders) {
  console.log(`\n--- ${id} ---`);
  const manifest = `src/academies/${id}/content.js`;
  const academy = fs.existsSync(path.join(REPO, manifest)) ? await import(url(manifest)) : {};

  // The nav this Academy actually receives: the template's, with its own over the top.
  const nav = { ...(template.nav || {}), ...(academy.nav || {}) };
  const groups = nav.navGroups || [];
  const reach = new Set([
    ...groups.flatMap((g) => (g.tabs || []).map((t) => t.id)),
    ...(nav.navParentTab?.id ? [nav.navParentTab.id] : [])
  ]);

  const recorded = BASE.academies?.[id]?.tabs;
  ok(`${id}: is recorded in the baseline`, Array.isArray(recorded),
    `add "${id}" to scripts/academy-reach-baseline.json with the tabs it must reach`);
  if (!Array.isArray(recorded)) continue;

  const lost = recorded.filter((t) => !reach.has(t));
  ok(`${id}: still reaches every tab it used to`, lost.length === 0,
    lost.length
      ? `MISSING: ${lost.join(', ')}\n      `
        + `This Academy relied on these and can no longer reach them. Either declare them in\n      `
        + `src/academies/${id}/content.js (nav slot) IN THE SAME COMMIT as the change that\n      `
        + `removed them, or, if the removal is intended, delete them from the baseline here.`
      : '');

  const gained = [...reach].filter((t) => !recorded.includes(t));
  if (gained.length) console.log(`NOTE  ${id}: also reaches ${gained.join(', ')} — record them if they are meant to stay`);

  const broken = [...reach].filter((t) => !RENDERABLE.has(t));
  ok(`${id}: every tab points at a screen the shell renders`, broken.length === 0,
    broken.length ? `not renderable: ${broken.join(', ')}` : '');
}

// ---- THE GENERATOR MUST NOT SKIP A SHAPE SLOT ----
//
// A shape slot is optional, so its names are deliberately absent from the
// inventory the manifest generator walks. That is exactly how it came to be
// skipped silently: an Academy could author the file correctly and the
// generator would emit nothing, leaving the slot fillable only by the
// template. Nothing failed, and the slot simply never worked.
//
// So the property is asserted on the OUTPUT: if an Academy has files that map
// to a shape slot, its manifest exports that slot.
const contract = read('src/content/academyContent.js');
const shapeSlots = (contract.match(/SHAPE_SLOTS = Object\.freeze\(\[([\s\S]*?)\]\)/)?.[1] || '')
  .match(/'[A-Za-z]+'/g)?.map((x) => x.replace(/'/g, '')) || [];
ok('the contract names its shape slots', shapeSlots.length > 0,
  'without SHAPE_SLOTS the generator has nothing to emit optional content for');

function filesUnder(dir, base = dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) filesUnder(full, base, acc);
    else acc.push(path.relative(base, full).split(path.sep).join('/'));
  }
  return acc;
}

for (const id of folders) {
  const dir = path.join(ACADEMIES, id);
  const manifestPath = path.join(dir, 'content.js');
  if (!fs.existsSync(manifestPath)) continue;
  const manifest = fs.readFileSync(manifestPath, 'utf8');
  for (const slot of shapeSlots) {
    const has = filesUnder(dir).some((rel) => rel !== 'content.js' && slotFor(rel) === slot);
    if (!has) continue;
    ok(`${id}: its manifest exports the '${slot}' slot it has content for`,
      new RegExp(`export const ${slot} = \\{`).test(manifest),
      `content exists under src/academies/${id}/ for '${slot}' but the manifest does not\n      `
      + `export it. Re-run: node scripts/generate-academy-manifest.mjs ${id}\n      `
      + `If regenerating does not fix it, the generator is skipping shape slots again.`);
  }
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  console.log('\nA removal and its replacement belong in ONE commit. See this file\'s header.');
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
