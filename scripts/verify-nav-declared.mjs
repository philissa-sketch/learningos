// ---------------------------------------------------------------------------
// THE NAV IS DECLARED, NOT HARDCODED. Run: node scripts/verify-nav-declared.mjs
//
// The fault this exists to prevent:
//
//   The nav bar carried a fixed list of tabs. Every Academy got all of them,
//   including two electives belonging to one child, as tabs with nothing
//   behind them — and a school had no way to declare a tab of its own.
//
// The rule now: the platform renders the `nav` slot and names no school, no
// subject and no elective. The template declares the generic entries; an
// Academy declares its own on top of them.
//
// ---- WHY THIS CHECK READS THE TEMPLATE AS A MODULE, NOT AS TEXT ----
//
// A regex over the template would assert its punctuation. Importing it asserts
// the property: these are the tabs a brand-new Academy actually receives, and
// every id is checked against what the shell can render. A typo becomes a
// failed check instead of a tab that does nothing.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');

let passed = 0;
const failures = [];
function ok(desc, cond, hint) {
  if (cond) {
    passed += 1;
    console.log(`PASS  ${desc}`);
  } else {
    failures.push(desc);
    console.log(`FAIL  ${desc}${hint ? `\n      ${hint}` : ''}`);
  }
}

const NAVBAR = 'src/components/Navigation/NavBar.jsx';
const navbar = read(NAVBAR);
const navbarCode = navbar.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
const contract = read('src/content/academyContent.js');
const app = read('src/App.jsx');

// Views the shell can actually render.
const RENDERABLE = new Set([...app.matchAll(/view === '([a-zA-Z-]+)'/g)].map((m) => m[1]));

// Names that belong to a school, never to the platform. Checked against the
// nav bar's PROSE as well as its code, on purpose: a comment naming one
// family's elective is how the next person learns the wrong rule.
const SCHOOL_NAMES = [
  'mission control', 'lamar', 'nova', 'marigold', 'petal', 'pestle',
  'garden', 'guitar', 'aerospace', 'georgia'
];

console.log('--- 1. the slot exists, and is optional ---');
ok("'nav' is a content slot", /'nav',/.test(contract),
  "add 'nav' to CONTENT_SLOTS in src/content/academyContent.js");
const requiredBlock = (contract.match(/REQUIRED_SLOTS = Object\.freeze\(\[([\s\S]*?)\]\)/) || [])[1] || '';
ok("'nav' is NOT required", !/'nav'/.test(requiredBlock),
  'an Academy with no nav of its own must inherit the template, not be refused');

console.log('\n--- 2. the nav bar declares nothing ---');
ok('no hardcoded group list', !/const\s+NAV_GROUPS/.test(navbar));
ok('no hardcoded parent tab', !/const\s+PARENT_TAB/.test(navbar));
ok('no tab literal anywhere in the file',
  !/\{\s*id:\s*'[a-zA-Z-]+'\s*,\s*label:/.test(navbarCode),
  'a tab written here is a tab every Academy receives');

const named = SCHOOL_NAMES.filter((n) => navbar.toLowerCase().includes(n));
ok('the nav bar names no school, elective or guide', named.length === 0,
  named.length ? `found: ${named.join(', ')} — this file is read by every Academy` : '');

console.log('\n--- 3. it reads the slot, and survives a blank one ---');
ok('reads the nav slot', /academyContent\(\)\.nav/.test(navbarCode),
  'read it as academyContent().nav so the platform inventory can see the slot is used');
ok('an absent slot yields no groups', /groups\s*=\s*\[\]/.test(navbarCode),
  'a blank slot must render an absent nav, never a broken one');
ok('an absent parent tab yields none', /parentTab\s*=\s*null/.test(navbarCode));
const parentGuards = (navbarCode.match(/parentTab \? \(/g) || []).length;
ok('both parent-tab buttons are conditional', parentGuards === 2,
  `found ${parentGuards} guarded renders; desktop and mobile both need one`);
ok('the slot is read per render, not at module scope',
  navbarCode.indexOf('academyContent()') > navbarCode.indexOf('export function NavBar'),
  'a content-pack destructure at module scope runs before the pack is installed');

console.log('\n--- 4. the template declares a generic nav ---');
const template = await import(
  path.join(REPO, 'src/academies/_template/content.js').replace(/\\/g, '/').replace(/^/, 'file:///')
);
const nav = template.nav;
const groups = nav?.navGroups || [];
ok('the template has a nav', !!nav && Array.isArray(nav.navGroups) && groups.length > 0);
ok('...and a parent tab', !!nav?.navParentTab?.id);
ok('...and leaves its own name blank',
  nav?.navSchoolName === '' && nav?.navSchoolTagline === '',
  'a template that names a school hands that name to every Academy that has not set one');

const tabs = groups.flatMap((g) => g.tabs || []);
const ids = tabs.map((t) => t.id);
ok('every group has an id, a label and at least one tab',
  groups.every((g) => g.id && g.label && (g.tabs || []).length > 0));
ok('no tab appears twice', new Set(ids).size === ids.length);
ok('group ids are unique', new Set(groups.map((g) => g.id)).size === groups.length);

const dirty = [...tabs, nav?.navParentTab || {}].filter((t) =>
  SCHOOL_NAMES.some((n) => `${t.id} ${t.label}`.toLowerCase().includes(n)));
ok('the template names no school, elective or guide', dirty.length === 0,
  dirty.length ? `found: ${dirty.map((t) => t.label).join(', ')}` : '');

console.log('\n--- 5. every declared id is a screen the shell renders ---');
const unrenderable = [...ids, nav?.navParentTab?.id].filter((id) => id && !RENDERABLE.has(id));
ok('no tab points at a view that does not exist', unrenderable.length === 0,
  unrenderable.length ? `not renderable: ${unrenderable.join(', ')}` : '');
ok('the shell was actually read', RENDERABLE.size > 5,
  'if this is empty the regex stopped matching App.jsx and every id above passed for free');

console.log('\n--- 6. the slot stays optional ---');
//
// The inventory in academy-content-needs.json is the list of names EVERY
// Academy must provide. Nav is optional: a school with no nav of its own
// inherits the template's. If these names ever land in that inventory, both
// Academies start failing for content they are right not to have — so the
// invariant is asserted here rather than left as a comment.
const needs = JSON.parse(read('scripts/academy-content-needs.json'));
const leaked = Object.keys(nav || {}).filter((n) => needs.names.includes(n));
ok("the nav slot's names are not in the mandatory inventory", leaked.length === 0,
  leaked.length ? `${leaked.join(', ')} — nav is optional and must stay optional` : '');

// A nested object written directly inside the slot export would be read as
// content names by verify-content-interface, which matches up to the first
// closing brace. The groups are declared above the export for that reason.
const tplSrc = read('src/academies/_template/content.js');
const slotBody = (tplSrc.match(/export const nav = \{([^}]*)\}/) || [])[1] || '';
ok('the slot export is flat', slotBody.trim().length > 0 && !/\[|\{/.test(slotBody),
  'declare the groups above the export, not inside it');

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
