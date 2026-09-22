// ---------------------------------------------------------------------------
// SLOT QUESTIONS: WHAT THE PLATFORM ASKS FOR, EVERY SCHOOL CAN ANSWER AS DATA.
// Run: node scripts/verify-slot-questions.mjs
//
// ---- WHAT THIS GUARDS ----
//
// A slot interface in src/content/slots/ exists so the platform asks a school
// for a PLAN instead of for a FUNCTION. A stored Academy — a row in a database,
// a folder a parent fills in through a form — cannot hold a function. Every
// function a slot still hands over is a reason a second family can only get a
// curriculum by someone writing JavaScript and deploying it.
//
// Each of those files writes down what it asks for in an exported `*_QUESTIONS`
// array, so nothing here retypes the words.
//
// ---- THE FAULT THAT PROMPTED IT (Sept 20, 2026) ----
//
// scripts/generate-academy-manifest.mjs emitted two kinds of name: the ones the
// inventory records (destructured reads), and — for a slot the inventory names
// NOTHING from — every export the folder has. Names read through a slot helper
// fell between the two, and it never showed, because `guide`, `projects` and
// `theme` each happened to reach ZERO inventory names when they were converted.
//
// `pe` was the first mixed slot: six names the platform still destructures,
// three the helper asks for. The generator would have dropped WEEKLY_PLAN,
// WORKOUT_NOTES and EXERCISE_DEMO_VIDEOS from every manifest it wrote, printed
// its per-slot summary, and said success — the exact shape of the Sept 19 fault
// that deleted four working slots.
//
// So check 2 below is the one that matters: a question this folder HAS an
// answer for must arrive in content.js. It fails if the generator's questions
// pass is removed.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SLOTS_DIR = path.join(REPO, 'src/content/slots');
const ACADEMIES = path.join(REPO, 'src/academies');

let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
}

// ---- what each slot interface asks for ----
const questionsBySlot = new Map();
for (const file of fs.readdirSync(SLOTS_DIR).filter((f) => f.endsWith('.js'))) {
  const src = fs.readFileSync(path.join(SLOTS_DIR, file), 'utf8');
  const names = [];
  for (const m of src.matchAll(/[A-Z_]+_QUESTIONS\s*=\s*Object\.freeze\(\[([\s\S]*?)\]\)/g)) {
    for (const q of m[1].matchAll(/'([A-Za-z_$][\w$]*)'/g)) names.push(q[1]);
  }
  if (names.length) questionsBySlot.set(file.replace(/\.js$/, ''), [...new Set(names)]);
}

const academies = fs.readdirSync(ACADEMIES, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

console.log(`\nslot interfaces asking questions: ${questionsBySlot.size}   academies: ${academies.length}`);

console.log('\n--- 1. every slot interface states its questions, and stays importable alone ---');
{
  ok('at least one slot interface declares questions', questionsBySlot.size > 0,
    'if this drops to zero the whole file has stopped guarding anything');

  const empty = [...questionsBySlot].filter(([, n]) => n.length === 0).map(([s]) => s);
  ok('no slot declares an empty question list', empty.length === 0, empty.join(', '));

  // The slot interfaces are the one layer the Academy loader, the scheduler and
  // the screens all sit on top of. An import here is how a cycle gets built.
  const importers = [];
  for (const file of fs.readdirSync(SLOTS_DIR).filter((f) => f.endsWith('.js'))) {
    const src = fs.readFileSync(path.join(SLOTS_DIR, file), 'utf8');
    if (/^\s*import\s/m.test(src)) importers.push(file);
  }
  ok('no slot interface imports anything at all', importers.length === 0,
    `${importers.join(', ')} — these files are read by every screen; an import here is a cycle waiting`);
}

// Every .js file under an Academy folder, read once. content.js is left out:
// it re-exports, and a question it passes on is what check 2 is asking about.
const sourceCache = new Map();
function sourcesOf(folder) {
  if (!sourceCache.has(folder)) {
    const out = [];
    const walk = (dir) => {
      for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) walk(p);
        else if (e.name.endsWith('.js') && p !== path.join(folder, 'content.js')) out.push([p, fs.readFileSync(p, 'utf8')]);
      }
    };
    walk(folder);
    sourceCache.set(folder, out);
  }
  return sourceCache.get(folder);
}

console.log('\n--- 2. a question this folder can answer reaches content.js ---');
for (const academy of academies) {
  const folder = path.join(ACADEMIES, academy);
  const contentPath = path.join(folder, 'content.js');
  if (!fs.existsSync(contentPath)) continue;
  const content = fs.readFileSync(contentPath, 'utf8');

  for (const [slot, names] of questionsBySlot) {
    const decl = content.match(new RegExp(`export const ${slot}\\s*=\\s*\\{([\\s\\S]*?)\\};`));
    if (!decl) continue; // this school does not fill this slot at all
    const exported = new Set(decl[1].split(',').map((s) => s.split(':')[0].trim()).filter(Boolean));

    for (const name of names) {
      // Does any module in this Academy's folder export this name? The whole
      // folder, not just data/ — a school may keep a slot's tables at its root
      // (subjects.js is), and a question answered there is still answered.
      const re = new RegExp(`export (const|function|let) ${name}\\b`);
      const answered = sourcesOf(folder).filter(([, s]) => re.test(s)).map(([p]) => path.relative(folder, p));
      if (answered.length === 0) continue; // a question is optional; no answer is fine

      ok(`${academy}/${slot}: answers ${name}, and content.js passes it on`,
        exported.has(name),
        `${answered.join(', ')} exports it and content.js drops it — regenerate the manifest`);
    }
  }
}

// ---- THE ONE FUNCTION STILL ALLOWED, AND WHY ----
//
// A slot may keep a legacy path through a conversion — `slots/projects.js`
// kept LEGACY_POOLS, `slots/guide.js` kept `getDailyLine` — because a
// migration that breaks the schools it is migrating is not a migration. Those
// are decisions, recorded in the slot file itself, not oversights.
//
// So they get an entry here, and the entry has to keep earning its place:
// check 3b fails if the slot has stopped documenting the path, and check 3c
// fails if no school uses it any more. This list may only SHRINK.
const KNOWN_LEGACY = {
  'guide/getDailyLine':
    'slots/guide.js reads it when a school answers with a picker instead of a '
    + 'dailyLines pool, and scripts/verify-slot-guide.mjs tests both paths. '
    + 'All three folders still answer this way (Sept 20, 2026). The path goes '
    + 'when they all answer with data, and this entry goes with it.'
};

console.log('\n--- 3. a converted slot hands over no functions ---');
const legacySeen = new Set();
{
  // The whole point. Checked against the SOURCE of content.js rather than by
  // importing it, so this still reports the right file when an import fails.
  for (const academy of academies) {
    const contentPath = path.join(ACADEMIES, academy, 'content.js');
    if (!fs.existsSync(contentPath)) continue;
    const content = fs.readFileSync(contentPath, 'utf8');

    for (const slot of questionsBySlot.keys()) {
      const decl = content.match(new RegExp(`export const ${slot}\\s*=\\s*\\{([\\s\\S]*?)\\};`));
      if (!decl) continue;
      const names = decl[1].split(',').map((s) => s.split(':')[0].trim()).filter(Boolean);

      // Where each name comes from, and whether that module defines it as one.
      const fns = [];
      for (const name of names) {
        const imp = content.match(new RegExp(`import \\{[^}]*\\b${name}\\b[^}]*\\} from '([^']+)'`));
        if (!imp) continue;
        const modPath = path.resolve(path.dirname(contentPath), imp[1]);
        if (!fs.existsSync(modPath)) continue;
        const src = fs.readFileSync(modPath, 'utf8');
        if (new RegExp(`export function ${name}\\b`).test(src)
          || new RegExp(`export const ${name}\\s*=\\s*(async\\s*)?(\\(|function\\b)`).test(src)) {
          fns.push(name);
        }
      }
      const unexpected = fns.filter((n) => {
        const key = `${slot}/${n}`;
        if (KNOWN_LEGACY[key]) { legacySeen.add(key); return false; }
        return true;
      });
      ok(`${academy}/${slot}: is data, not code`, unexpected.length === 0,
        `${unexpected.join(', ')} — a stored Academy cannot hold a function, so this slot cannot be stored`);
    }
  }
}

console.log('\n--- 3b. every allowed legacy path is still documented where it lives ---');
for (const key of Object.keys(KNOWN_LEGACY)) {
  const [slot, name] = key.split('/');
  const file = path.join(SLOTS_DIR, `${slot}.js`);
  const src = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  ok(`${key}: the slot interface still reads it`,
    new RegExp(`\\b${name}\\b`).test(src),
    `${slot}.js no longer mentions ${name} — the exception is stale, delete it from KNOWN_LEGACY`);
  ok(`${key}: the exception states why`,
    typeof KNOWN_LEGACY[key] === 'string' && KNOWN_LEGACY[key].length > 60);
}

console.log('\n--- 3c. no school is being excused for something it stopped doing ---');
{
  const unused = Object.keys(KNOWN_LEGACY).filter((k) => !legacySeen.has(k));
  ok('the allowed list has no stale entries', unused.length === 0,
    `${unused.join(', ')} — no folder hands these over any more, so the slot is storable: `
    + 'delete the entry, and the legacy path with it');
  console.log(`      (${legacySeen.size} legacy path${legacySeen.size === 1 ? '' : 's'} still in use — this list may only shrink)`);
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log('\nFAILED:');
  for (const f of failures) console.log('  ' + f);
  process.exit(1);
}
console.log('\nALL CHECKS PASSED');
