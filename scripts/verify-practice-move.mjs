// ---------------------------------------------------------------------------
// THE QUESTIONS LEFT THE ENGINE.
// Run: ACADEMY=lamar node scripts/verify-practice-move.mjs
//
// ---- WHAT MOVED (Sept 20, 2026 — GENERIC_CARRYOVER fault 1, last file) ----
//
// `src/engine/problemTemplates.js` was 14,164 lines. 14,063 of them were one
// child's curriculum sitting in the platform's ENGINE folder: 256 question
// generators, one state's social-studies standards named by code, aerospace
// and robotics fact banks, and Python examples using his own name as a value.
//
// The engine did not move. Three builders — how a question is assembled, how
// its options are randomised, how a bank avoids repeating itself — and four
// accessors are mechanism, and every one of them stayed.
//
// ---- WHAT THIS PINS ----
//
// A move of this size fails quietly in two ways, and neither shows up as a
// parse error:
//
//   COUNT. A generator lost in the cut is a topic a child silently stops being
//   drilled on. Nothing fails; the practice set is just smaller.
//
//   REACH. The generators call helpers — randInt, choice, gcd — that lived
//   beside them and now live across a folder boundary. A missing import throws
//   only when that ONE generator happens to be drawn, which could be weeks
//   later, on his screen, mid-practice.
//
// So this builds EVERY generator, not a sample, and asserts the accessors
// still answer through the platform rather than the school.
// ---------------------------------------------------------------------------

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { academyUnderTest } from './lib/academy-under-test.mjs';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');
const load = (rel) => import(pathToFileURL(path.join(REPO, rel)).href);

let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
}

const engine = await load('src/engine/problemTemplates.js');
const engineSrc = src('src/engine/problemTemplates.js');

// ---------------------------------------------------------------------------
console.log('\n--- 1. the engine folder carries no curriculum ---');
// ---------------------------------------------------------------------------
{
  ok('the engine declares no template list', !/^const templates = \[/m.test(engineSrc));
  const lines = engineSrc.split('\n').length;
  ok(`the engine is mechanism-sized (${lines} lines, was 14,164)`, lines < 400,
    'a file this size in an engine folder is a curriculum wearing an engine\'s name');
  ok('...and still exports its three builders',
    /export function buildFactBankQuestion/.test(engineSrc)
      && /export function makeNoRepeatFactBankGenerator/.test(engineSrc)
      && /export function shuffleWithinTemplate/.test(engineSrc),
    'the school imports these — the move was meant to take the questions, not the engine');
  ok('...and its four accessors', ['getTemplatesFor', 'getTemplatesUpToTier', 'getAllTemplates', 'getTemplateById']
    .every((f) => typeof engine[f] === 'function'));
}

// ---------------------------------------------------------------------------
console.log('\n--- 2. every generator came across, and every one still builds ---');
// ---------------------------------------------------------------------------
{
  const all = engine.getAllTemplates();
  ok('all 256 generators are reachable through the platform', all.length === 256,
    `${all.length} — a generator lost in the cut is a topic he silently stops being drilled on`);
  ok('...with no id colliding', new Set(all.map((t) => t.id)).size === all.length);

  // Not a sample. A missing import throws only when that one generator is
  // drawn, which could be weeks from now, on his screen, mid-practice.
  const broken = [];
  for (const t of all) {
    try {
      const q = t.build();
      if (!q || typeof q.prompt !== 'string' || !q.prompt) broken.push(`${t.id} (no prompt)`);
    } catch (error) {
      broken.push(`${t.id}: ${error.message}`);
    }
  }
  ok(`every generator builds a question (${all.length} run)`, broken.length === 0,
    broken.slice(0, 5).join(' | '));

  const subjects = [...new Set(all.map((t) => t.subject))];
  ok(`every subject still has generators (${subjects.length})`, subjects.length >= 7,
    subjects.join(', '));
}

// ---------------------------------------------------------------------------
console.log('\n--- 3. the accessors read the school, not a constant ---');
// ---------------------------------------------------------------------------
{
  ok('the engine reads the practice slot', /optionalContent\(academyContent\(\), 'practice'\)/.test(engineSrc));
  ok('...inside a function, not at module scope',
    /function templatesOf\(\)/.test(engineSrc) && !/^const .*= *templatesOf\(\)/m.test(engineSrc),
    'a module-scope read runs at import, before any school is mounted');
  ok('a school with no practice questions gets an empty list, not a throw',
    Array.isArray(engine.getAllTemplates()) );
  ok('the slot is not required of every Academy',
    !/REQUIRED_SLOTS[\s\S]{0,400}'practice'/.test(src('src/content/academyContent.js')));
  ok('...and no name of it entered the required inventory',
    !JSON.parse(src('scripts/academy-content-needs.json')).names.includes('templates'));
}

// ---------------------------------------------------------------------------
console.log('\n--- 4. the school\'s copy imports the engine, not the reverse ---');
// ---------------------------------------------------------------------------
{
  const dataPath = `src/academies/${academyUnderTest}/data/practice/problemTemplates.js`;
  const dataSrc = src(dataPath);
  ok('the school exports the templates', /export const templates = \[/.test(dataSrc));
  ok('...and imports the builders from the platform',
    /from '\.\.\/\.\.\/\.\.\/\.\.\/engine\/problemTemplates\.js'/.test(dataSrc));
  ok('...and the maths helpers it actually uses',
    /from '\.\.\/\.\.\/\.\.\/\.\.\/engine\/mathHelpers\.js'/.test(dataSrc),
    'these lived beside the questions and now live across a folder boundary');
  ok('the engine does NOT import the school',
    !/academies\//.test(engineSrc),
    'the platform reaching into one school by path is the fault this move exists to end');
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
