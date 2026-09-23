// ---------------------------------------------------------------------------
// WHICH SCREEN A SCHOOL OPENS ON. Run: node scripts/verify-first-screen.mjs
//
// Sept 23, 2026. A school may name its first screen (nav.navStartTab) and a
// grown-up sign-in lands on its own parent tab (nav.navParentTab). The rule is
// src/content/firstScreen.js; the shell's SchoolBoot must use it.
//
// The property: a school that names nothing opens EXACTLY as before, and a
// name is honoured only when the school can actually open it. Cases below are
// built so that a wrong rule fails — not read off whichever schools exist.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');
const mod = (rel) => import(pathToFileURL(path.join(REPO, rel)).href);
const codeOnly = (rel) => read(rel).replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '').replace(/\{\/\*[\s\S]*?\*\/\}/g, '');

let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
}

const { firstScreen, DEFAULT_START, DEFAULT_PARENT } = await mod('src/content/firstScreen.js');
const loader = { load: () => Promise.resolve({ default: () => null }) };

console.log('--- 1. naming nothing changes nothing ---');
ok('no content -> the dashboard', firstScreen(undefined, 'child') === 'dashboard');
ok('no content, grown-up -> the parent dashboard', firstScreen(undefined, 'parent') === 'parent');
ok('the defaults are the shell\'s own screens', DEFAULT_START === 'dashboard' && DEFAULT_PARENT === 'parent');
ok('an empty nav -> the dashboard', firstScreen({ nav: {} }, 'child') === 'dashboard');

console.log('\n--- 2. a name is honoured only when the school can open it ---');
ok('a school screen it supplies is honoured',
  firstScreen({ nav: { navStartTab: 'garden' }, views: { garden: loader } }, 'child') === 'garden');
ok('a shell screen is honoured', firstScreen({ nav: { navStartTab: 'progress' } }, 'child') === 'progress');
ok('a name with no screen behind it falls back',
  firstScreen({ nav: { navStartTab: 'garden' }, views: {} }, 'child') === 'dashboard');
ok('a views entry that is not a loader falls back',
  firstScreen({ nav: { navStartTab: 'garden' }, views: { garden: {} } }, 'child') === 'dashboard');
ok('a non-string name falls back', firstScreen({ nav: { navStartTab: 42 } }, 'child') === 'dashboard');

console.log('\n--- 3. a grown-up sign-in goes to the school\'s own parent tab ---');
ok('its own parent screen is honoured',
  firstScreen({ nav: { navParentTab: { id: 'corner' } }, views: { corner: loader } }, 'parent') === 'corner');
ok('...and a child sign-in never lands there',
  firstScreen({ nav: { navParentTab: { id: 'corner' } }, views: { corner: loader } }, 'child') === 'dashboard');
ok('a parent tab with nothing behind it falls back',
  firstScreen({ nav: { navParentTab: { id: 'corner' } } }, 'parent') === 'parent');
ok('...and navStartTab never decides a grown-up sign-in',
  firstScreen({ nav: { navStartTab: 'garden' }, views: { garden: loader } }, 'parent') === 'parent');

console.log('\n--- 4. the shell uses the rule ---');
const boot = codeOnly('src/SchoolBoot.jsx');
ok('SchoolBoot opens on firstScreen(...)', /initialView=\{firstScreen\(academyContent\(\), enteredAs\)\}/.test(boot));
ok('...and hard-codes no first screen', !/initialView=\{enteredAs === 'parent'/.test(boot));

console.log('\n--- 5. every real school opens somewhere it can reach ---');
const tpl = await mod('src/academies/_template/content.js');
for (const id of fs.readdirSync(path.join(REPO, 'src/academies')).filter((d) => !d.startsWith('_') && fs.existsSync(path.join(REPO, 'src/academies', d, 'content.js')))) {
  const own = await mod(`src/academies/${id}/content.js`);
  const content = { ...own, nav: { ...(tpl.nav || {}), ...(own.nav || {}) } };
  const child = firstScreen(content, 'child');
  const parent = firstScreen(content, 'parent');
  const named = own.nav && own.nav.navStartTab;
  ok(`${id}: ${named ? `opens on its own "${named}"` : 'names no first screen and opens on the dashboard'}`,
    named ? child === named : child === 'dashboard', `got ${child}`);
  ok(`${id}: a grown-up lands on "${parent}"`, parent === ((content.nav.navParentTab && content.nav.navParentTab.id) || 'parent'));
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) { console.log(`\n${failures.length} CHECK(S) FAILED`); process.exitCode = 1; }
else console.log('\nALL CHECKS PASSED');
