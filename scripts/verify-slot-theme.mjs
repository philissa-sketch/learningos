// ---------------------------------------------------------------------------
// THE THEME SLOT ANSWERS A QUESTION. Run: node scripts/verify-slot-theme.mjs
//                                        (no ACADEMY — it checks every folder)
//
// The fault this exists to prevent:
//
//   The platform demanded a named function from every school — `theme.load()`
//   — so a school could only ever be a JavaScript module. A stored school
//   cannot export a function, and a platform that asks for one can never read
//   a school that is data.
//
// The rule now: the platform asks `appearance` and decides what to do with the
// answer. A school answers with a loader (a folder) or with CSS text (data).
//
// ---- WHY THIS CALLS THE CODE INSTEAD OF READING IT ----
//
// Section 2 hands `applyAppearance` a stand-in document and asserts what it
// ACTUALLY did with each shape of answer. A regex over the source would assert
// the punctuation of a function whose whole value is its behaviour — and this
// repo has already paid twice for a guard that matched text, including one that
// matched the comments explaining the decision it was testing.
//
// Section 3 does read text, and only for a question text can answer: does any
// platform file still name a function on the slot. Comments are stripped first,
// because a guard that reads prose fails on the paragraph explaining it.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');
const load = (rel) => import(pathToFileURL(path.join(REPO, rel)).href);

/** Source with comments removed, so a guard never reads its own explanation. */
const codeOnly = (src) => src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

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

/** The smallest thing `applyAppearance` needs to attach a string answer to. */
function standInDocument() {
  const head = { children: [], appendChild(el) { this.children.push(el); } };
  return {
    head,
    getElementById: (id) => head.children.find((el) => el.id === id) || null,
    createElement: () => ({ id: '', textContent: '' })
  };
}

// ---------------------------------------------------------------------------

console.log('--- 1. the platform asks a question ---');

const slot = await load('src/content/slots/theme.js');

ok('the slot declares its questions', Array.isArray(slot.THEME_QUESTIONS) && slot.THEME_QUESTIONS.length > 0,
  'THEME_QUESTIONS is what a check reads instead of retyping the word');
ok("'appearance' is one of them", (slot.THEME_QUESTIONS || []).includes('appearance'));
ok('the platform provides the answer handler', typeof slot.applyAppearance === 'function',
  'the school must not be the one deciding what to do with its own answer');

// ---------------------------------------------------------------------------

console.log('\n--- 2. every shape of answer does the right thing ---');

let called = 0;
const asModule = await slot.applyAppearance({ appearance: () => { called += 1; return Promise.resolve(); } });
ok('a loader answer is called and reported as a module', called === 1 && asModule.applied === 'module',
  `called ${called} time(s), applied '${asModule.applied}'`);

const doc = standInDocument();
const asCss = await slot.applyAppearance({ appearance: ':root { --accent: 1 2 3; }' }, doc);
ok('a text answer is attached to the document',
  asCss.applied === 'css' && asCss.attached === true && doc.head.children.length === 1 &&
    doc.head.children[0].textContent.includes('--accent'),
  `applied '${asCss.applied}', ${doc.head.children.length} element(s) attached`);

await slot.applyAppearance({ appearance: ':root { --accent: 9 9 9; }' }, doc);
ok('a second answer replaces the first rather than stacking',
  doc.head.children.length === 1 && doc.head.children[0].textContent.includes('9 9 9'),
  `${doc.head.children.length} element(s) after two applications`);

const blank = await slot.applyAppearance({}, standInDocument());
ok('an unanswered slot is absent, not broken', blank.applied === 'none' && blank.reason === 'unanswered',
  'a school with no styling of its own inherits the template rather than failing to open');

const empty = await slot.applyAppearance(undefined, standInDocument());
ok('a missing slot is absent, not broken', empty.applied === 'none',
  'a blank slot must render as an absent screen rather than a broken one');

const wrong = await slot.applyAppearance({ appearance: 42 }, standInDocument());
ok('an unusable answer degrades rather than throwing', wrong.applied === 'none' && wrong.reason === 'unusable',
  'section 4 is what refuses this before it can ship');

// ---------------------------------------------------------------------------

console.log('\n--- 3. the platform no longer names a function on the slot ---');

const SHELL = 'src/components/Academy/AcademyShell.jsx';
const shell = codeOnly(read(SHELL));

ok('the shell reaches appearance through the platform', /applyAppearance\s*\(/.test(shell),
  `${SHELL} must call applyAppearance, not a function the school named`);
ok('the shell imports it from the slot module', /from\s+'[^']*content\/slots\/theme\.js'/.test(shell),
  'import it rather than reimplementing the two answer shapes at the call site');

// Anywhere in the platform, not only the shell: the whole point is that no
// screen anywhere may reach past the question and call the school's own code.
function platformSources(dir = 'src', acc = []) {
  for (const entry of fs.readdirSync(path.join(REPO, dir), { withFileTypes: true })) {
    const rel = `${dir}/${entry.name}`;
    if (entry.isDirectory()) {
      if (rel === 'src/academies') continue;
      platformSources(rel, acc);
    } else if (/\.jsx?$/.test(entry.name)) acc.push(rel);
  }
  return acc;
}

// Optional chaining is part of the shape being refused: `theme?.load?.()` is
// the exact line this slice removed, and a pattern that only matched
// `theme.load(` would have passed straight over it. It did, once, until the
// negative test put the old line back.
const CALLS_A_NAMED_FUNCTION = /theme\s*(?:\?\.|\.)\s*load\s*(?:\?\.)?\s*\(/;
const stillCalling = platformSources().filter((f) => CALLS_A_NAMED_FUNCTION.test(codeOnly(read(f))));
ok('no platform file calls a named function on the theme slot', stillCalling.length === 0,
  stillCalling.join(', '));

ok('the platform was actually read', platformSources().length > 100,
  'if this is empty the assertion above passed for free');

// ---------------------------------------------------------------------------

console.log('\n--- 4. every school answers, in a shape the platform can use ---');

const ACADEMIES = path.join(REPO, 'src/academies');
const folders = fs
  .readdirSync(ACADEMIES, { withFileTypes: true })
  .filter((e) => e.isDirectory() && fs.existsSync(path.join(ACADEMIES, e.name, 'content.js')))
  .map((e) => e.name);

ok('there are schools to check', folders.length > 0, 'no folder carries a content.js');

for (const folder of folders) {
  const manifest = await load(`src/academies/${folder}/content.js`);
  const answer = manifest.theme?.appearance;
  const usable = typeof answer === 'function' || (typeof answer === 'string' && answer.trim().length > 0);
  const hasSheet = fs.existsSync(path.join(ACADEMIES, folder, 'academy.css')) ||
    fs.existsSync(path.join(ACADEMIES, folder, 'theme/template.css'));
  // A folder with no stylesheet of its own is entitled to leave the slot blank.
  // A folder that HAS one and does not answer is the real fault: styling that
  // exists and never reaches a screen.
  ok(`${folder} answers appearance usably`, usable || !hasSheet,
    hasSheet
      ? `it ships a stylesheet but its theme slot answers ${typeof answer}`
      : '');
}

// ---------------------------------------------------------------------------

console.log('\n--- 5. a new school is generated asking the same question ---');

const generator = codeOnly(read('scripts/generate-academy-manifest.mjs'));
ok('the generator emits an appearance answer', /appearance:/.test(generator),
  'a folder generated today would answer a question the platform stopped asking');
ok('the generator emits no load answer', !/theme\s*=\s*\{\s*load\s*:/.test(generator),
  'the old shape would come back with the next generated Academy');

// ---------------------------------------------------------------------------

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
