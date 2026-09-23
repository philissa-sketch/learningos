// ---------------------------------------------------------------------------
// A SCHOOL CAN BRING ITS OWN SCREENS. Run: node scripts/verify-school-views.mjs
//
// Sept 17, 2026. The parent, about two activities only her son does: *"They are
// supposed to be in his school only."*
//
// Half of that was the content, and `optional.js` took those twenty names off
// every other school's bill. The other half is the screens. The shell imported
// them by name and routed them by name, so it could render exactly the screens
// someone had written into it: a school could already declare a tab of its own
// and there was nothing behind it, because no Academy could supply one.
//
// The rule now: a school declares `views` — tab id to loader — and the shell
// renders one for any id it does not own itself.
//
// What this holds:
//   1. the reader: only real loaders, never for an id the shell owns, no throw
//   2. the slot is declared and OPTIONAL — a school with no screens still boots
//   3. the shell renders a school's screen, and names no activity of its own
//   4. this Academy's declarations point at screens that exist, lazily
//   5. every tab a school declares can actually open something
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');
const codeOnly = (src) => src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `\n      ${detail}` : '')); }
}

const MODULE = 'src/content/slots/views.js';
const slot = await import(pathToFileURL(path.join(REPO, MODULE)).href);

console.log('--- 1. the reader ---');
{
  const load = () => Promise.resolve({ default: () => null });
  const content = { views: { alpha: { load }, beta: { load } } };
  ok('a school\'s screens resolve', slot.schoolViewIds(content).sort().join(',') === 'alpha,beta');
  ok('...and one is answerable by tab id', slot.schoolViewLoader(content, 'alpha') === load);
  ok('an id the school did not declare answers null', slot.schoolViewLoader(content, 'gamma') === null);

  ok('the shell keeps its own screens',
    slot.PLATFORM_VIEWS.includes('dashboard') && slot.PLATFORM_VIEWS.includes('parent'));
  const hijack = { views: { dashboard: { load }, parent: { load } } };
  ok('a school cannot replace a screen the shell owns',
    slot.schoolViewIds(hijack).length === 0 && slot.schoolViewLoader(hijack, 'dashboard') === null,
    'an Academy that could replace the parent area could replace the passcode screen');

  const junk = [
    ['nothing', undefined], ['null', null], ['an empty pack', {}],
    ['views that is an array', { views: [1] }],
    ['views that is a string', { views: 'x' }],
    ['an entry with no loader', { views: { alpha: {} } }],
    ['an entry that is a component, not a loader', { views: { alpha: () => null } }],
    ['a loader that is not a function', { views: { alpha: { load: 'GardenHome' } } }],
    ['an empty id', { views: { '': { load } } }]
  ];
  for (const [label, content2] of junk) {
    let threw = false; let ids;
    try { ids = slot.schoolViewIds(content2); slot.schoolViewLoader(content2, 'alpha'); } catch { threw = true; }
    ok(`${label} is ignored instead of thrown`, !threw && Array.isArray(ids) && ids.length === 0,
      'a throw here reaches the shell and a child sees a school that will not open');
  }
  // A list is the one bad shape that would otherwise LOOK usable: Object.entries
  // of an array hands back real loaders filed under "0", "1". So the pack has to
  // be rejected for its type, not merely come out empty by luck.
  ok('a views slot that is a LIST, not a pack, supplies nothing',
    slot.schoolViewIds({ views: [{ load }, { load }] }).length === 0
      && slot.schoolViewLoader({ views: [{ load }] }, '0') === null,
    'a list yields screens at the ids "0" and "1" — ids no nav can name, so the tab is unreachable and the mistake is invisible');

  ok('an unusable entry never hides a usable one beside it',
    slot.schoolViewIds({ views: { alpha: { load }, broken: { load: 3 } } }).join(',') === 'alpha');
}

console.log('\n--- 2. the slot is declared, and optional ---');
{
  // Comments stripped first: a commented-out slot still reads as the slot name
  // in the raw text, and a slot the pack loader never carries is one no school
  // can fill.
  const contract = codeOnly(read('src/content/academyContent.js'));
  const slots = (contract.match(/CONTENT_SLOTS = Object\.freeze\(\[([\s\S]*?)\]\)/) || [])[1] || '';
  ok("'views' is a content slot", /'views',/.test(slots),
    'the pack loader carries only the slots on this list');
  const required = (contract.match(/REQUIRED_SLOTS = Object\.freeze\(\[([\s\S]*?)\]\)/) || [])[1] || '';
  ok("'views' is NOT required", !/'views'/.test(required),
    'a school with no screens of its own must still boot');
  const needs = JSON.parse(read('scripts/academy-content-needs.json'));
  ok('...and no name inside it is billed to every Academy',
    !Object.values(needs.nameToSlot || {}).includes('views'),
    'the shell reads this slot through src/content/slots/views.js, never by name');
}

console.log('\n--- 3. the shell renders one, and names no activity ---');
{
  const app = read('src/App.jsx');
  const appCode = codeOnly(app);
  ok('the shell asks for a screen for the current tab',
    /schoolViewLoader\(academyContent\(\), view\)/.test(appCode));
  ok('...wrapped so it is fetched only when that tab is open',
    /lazy\(load\)/.test(appCode) && /useMemo\(/.test(appCode));
  ok('...and rendered exactly once', (appCode.match(/<SchoolScreen /g) || []).length === 1);
  ok('...reading the pack per render, never at module scope',
    appCode.indexOf('schoolViewLoader(academyContent()') > appCode.indexOf('export default function App'),
    'a content-pack read at module scope runs before the pack is installed');
  const named = ['garden', 'guitar', 'lamar', 'petal', 'aerospace', 'nova']
    .filter((n) => new RegExp(`\\b${n}`, 'i').test(appCode));
  ok('the shell names no school, learner or activity screen', named.length === 0, named.join(', '));
  const platform = slot.PLATFORM_VIEWS.slice().sort();
  const routed = [...new Set([...appCode.matchAll(/view === '([a-zA-Z-]+)'/g)].map((m) => m[1]))].sort();
  ok('the shell\'s own list of screens is the list it actually routes',
    JSON.stringify(platform) === JSON.stringify(routed),
    `slot: ${platform.join(', ')}\n      app:  ${routed.join(', ')}`);
}

console.log('\n--- 4. this Academy\'s screens exist and load lazily ---');
const ACADEMY = process.env.ACADEMY;
const MANIFEST = `src/academies/${ACADEMY}/content.js`;
const OWN_VIEWS = `src/academies/${ACADEMY}/views.js`;
let declaredIds = [];
{
  ok(`${ACADEMY} has a manifest`, fs.existsSync(path.join(REPO, MANIFEST)));
  const manifest = read(MANIFEST);

  // The manifest is GENERATED. Nothing in a data folder says which tab opens
  // which screen, so a school declares that by hand in views.js and the
  // generated file only re-exports it. Anything else and the next regeneration
  // is what silently removes this school's own tabs.
  const hasOwn = fs.existsSync(path.join(REPO, OWN_VIEWS));
  const declaringRel = hasOwn ? OWN_VIEWS : MANIFEST;
  const source = read(declaringRel);
  const block = (source.match(/export const views = \{([\s\S]*?)\n\};/) || [])[1];

  if (!block) {
    ok(`${ACADEMY} declares no screens of its own`, !/\bviews\b/.test(manifest),
      'a views export that this check cannot read is worse than none');
  } else {
    if (hasOwn) {
      // The generator's own line, taken from the generator, so the two can
      // never drift apart in wording.
      const emitted = (read('scripts/generate-academy-manifest.mjs')
        .match(/lines\.push\("(export \{ views \} from '\.\/views\.js';)"\)/) || [])[1];
      ok('the generator knows this slot is hand-written',
        Boolean(emitted) && /views\.js'\)\)/.test(read('scripts/generate-academy-manifest.mjs')),
        'without this, re-running the generator deletes this school\'s tabs and nothing says so');
      ok('...and the generated manifest re-exports it rather than declaring its own',
        emitted ? codeOnly(manifest).includes(emitted) : false,
        `${MANIFEST} should carry: ${emitted || "export { views } from './views.js';"}`);
    }

    const entries = [...block.matchAll(/(\w+):\s*\{\s*load:\s*\(\) =>\s*import\('([^']+)'\)/g)];
    declaredIds = entries.map((m) => m[1]);
    ok('every entry is a lazy loader', entries.length === (block.match(/\w+:\s*\{/g) || []).length,
      'an entry that is not `{ load: () => import(...) }` is ignored at runtime');
    const fromDir = path.dirname(path.join(REPO, declaringRel));
    const missing = entries.filter(([, , spec]) => !fs.existsSync(path.resolve(fromDir, spec)));
    ok('...pointing at a screen that exists', missing.length === 0, missing.map((m) => m[2]).join(', '));
    // A move is only finished when the old copy is gone. Nothing goes red on a
    // leftover: the shell imports the new path, every other check reads the new
    // path, and the stale twin sits in the shared folder being built into every
    // school's download and edited by mistake a month later.
    const shared = [];
    const sweep = (dir) => {
      const abs = path.join(REPO, dir);
      if (!fs.existsSync(abs)) return;
      for (const e of fs.readdirSync(abs, { withFileTypes: true })) {
        if (e.isDirectory()) sweep(`${dir}/${e.name}`);
        else if (entries.some(([, , spec]) => path.basename(spec) === e.name)) {
          shared.push(`${dir}/${e.name}`);
        }
      }
    };
    sweep('src/components');
    ok('...and no copy of it was left behind in the shared folder', shared.length === 0,
      `${shared.join(', ')} — a school's screen that still exists in src/components/ ships to every school`);

    ok('...and nothing this file imports would stop Node reading it',
      !/from 'react'/.test(source) && !/from 'react'/.test(manifest),
      'every check script loads the manifest in plain Node');
  }
}

console.log('\n--- 5. every tab this school declares can open something ---');
{
  const mod = await import(pathToFileURL(path.join(REPO, MANIFEST)).href);
  // The slot's own reader, not a regex: this is the answer the shell gets.
  const liveIds = slot.schoolViewIds(mod).sort();
  ok('what the source declares is what the manifest actually exports',
    JSON.stringify(liveIds) === JSON.stringify(declaredIds.slice().sort()),
    `source: ${declaredIds.join(', ') || '(none)'}\n      export: ${liveIds.join(', ') || '(none)'}`);

  const tabs = (mod.nav?.navGroups || []).flatMap((g) => g.tabs || []).map((t) => t.id);
  const appCode = codeOnly(read('src/App.jsx'));
  const routed = new Set([...appCode.matchAll(/view === '([a-zA-Z-]+)'/g)].map((m) => m[1]));
  const orphans = tabs.filter((id) => !routed.has(id) && !liveIds.includes(id));
  ok('no tab opens nothing', orphans.length === 0,
    `${orphans.join(', ')} — declare a screen for it in the views slot, or drop the tab`);

  // The parent button is part of the nav too (Sept 22, 2026). A school may
  // point it at a grown-up screen of its own instead of the shared one, so the
  // property is "every button opens something, and every screen has a button"
  // — not "every screen is in a group". Asserting the groups alone failed a
  // correct school whose only screen so far sits behind its parent button.
  const parentId = mod.nav?.navParentTab?.id || null;
  ok('the parent button opens something',
    !parentId || routed.has(parentId) || liveIds.includes(parentId),
    `${parentId} — not a shell screen and not one this school declares`);
  const reachable = new Set([...tabs, ...(parentId ? [parentId] : [])]);
  const unused = liveIds.filter((id) => !reachable.has(id));
  ok('...and no screen is declared with no tab to reach it', unused.length === 0, unused.join(', '));
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
