// ---------------------------------------------------------------------------
// THE SUBJECTS SLOT: EACH SCHOOL'S SPELLING RULES ARE DATA, AND BOTH STILL HOLD.
// Run: node scripts/verify-slot-subjects.mjs
//
// ---- WHAT CHANGED (Sept 21, 2026) ----
//
// `canonicalSubject`, `isKhanTaughtSubject`, `subjectCardLabel` and
// `strandsForSubject` moved out of both Academy folders into
// src/content/slots/subjects.js. A stored Academy cannot hold a function.
//
// Unlike PE, the two schools had written DIFFERENT functions — one folds case,
// one must not; one aliases five spellings, one aliases a retired subject. So
// this file pins each school's own rules separately, asked through the ONE
// platform lookup, against the school's real exported tables. Measured before
// the move, on 65 inputs per function: the second school was unchanged on
// every one; the first changed only where the parent chose it to.
//
// ---- THE ONE DECISION PINNED HERE ----
//
// Records still filed under the first school's retired writing id now read as
// the subject it merged into and count as Khan-taught. Asked and answered by
// the parent on Sept 21, 2026. The report card already treated them that way.
// ---------------------------------------------------------------------------
// Both schools read through content.js — the slot AS EXPORTED — so a table
// dropped from the export, or a broken import behind it, fails here rather
// than in whichever unrelated check happens to load the pack first.
import { subjects as LAMAR } from '../src/academies/lamar/content.js';
import { subjects as PETAL } from '../src/academies/petal-pestle-academy/content.js';
import {
  SUBJECT_QUESTIONS, canonicalSubject, isKhanTaughtSubject, subjectCardLabel, strandsForSubject, strandLabel
} from '../src/content/slots/subjects.js';

let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
}
const L = { subjects: LAMAR };
const P = { subjects: PETAL };

console.log(`\nquestions: ${SUBJECT_QUESTIONS.join(', ')}`);

console.log('\n--- 1. the first school keeps its ids exactly as written ---');
{
  ok('a camelCase id is not folded', canonicalSubject(L, 'socialStudies') === 'socialStudies',
    'folding would file it under a subject nobody has');
  ok('the school does not ask for folding', LAMAR.SUBJECT_ID_CASE === undefined);
  ok('its retired subject maps onto the one that absorbed it', canonicalSubject(L, 'writing') === 'reading');
  ok('an unknown id passes through unchanged', canonicalSubject(L, 'somethingElse') === 'somethingElse');
  ok('the card name wins over the formal name', subjectCardLabel(L, 'reading') === LAMAR.SUBJECT_CARD_LABELS.reading
    && LAMAR.SUBJECT_CARD_LABELS.reading !== LAMAR.SUBJECT_LABELS.reading);
  ok('the formal name is the fallback', subjectCardLabel(L, 'math') === LAMAR.SUBJECT_LABELS.math);
  ok('a card-only subject still has a name', subjectCardLabel(L, 'typing') === LAMAR.SUBJECT_CARD_LABELS.typing);
  ok('Khan-taught subjects are the school’s list', LAMAR.KHAN_TAUGHT_SUBJECTS.every((s) => isKhanTaughtSubject(L, s)));
  ok('...and nothing else is', !isKhanTaughtSubject(L, 'pe') && !isKhanTaughtSubject(L, 'aerospace'));
}

console.log('\n--- 2. the parent’s decision: an old writing record is its merged subject ---');
{
  ok('it reads as the merged subject’s card name',
    subjectCardLabel(L, 'writing') === subjectCardLabel(L, 'reading'));
  ok('and counts as Khan-taught, as the report card already did',
    isKhanTaughtSubject(L, 'writing') === isKhanTaughtSubject(L, 'reading'));
}

console.log('\n--- 3. the first school’s strands, in its own order ---');
{
  const r = strandsForSubject(L, 'reading');
  ok('the merged subject carries two strands', r.length === 2, String(r.length));
  ok('...in the order the school wrote them', r.map((s) => s.id).join() === LAMAR.STRANDS.filter((s) => s.subject === 'reading').map((s) => s.id).join());
  ok('a strand keeps its id — lessons are filed by it', r.every((s) => ['reading', 'language-arts'].includes(s.id)),
    'renaming a strand id silently unfiles every lesson that carries it');
  ok('every other subject has none, so nothing else changes', strandsForSubject(L, 'math').length === 0);
  ok('a strand’s name is looked up by its id', strandLabel(L, 'language-arts') === LAMAR.STRANDS.find((s) => s.id === 'language-arts').label);
}

console.log('\n--- 4. the second school folds every spelling, as it always did ---');
{
  ok('it asks for folding', PETAL.SUBJECT_ID_CASE === 'lower');
  ok('three spellings of one subject become one', ['reading', 'Writing', 'ENGLISH'].every((s) => canonicalSubject(P, s) === 'ela'));
  ok('two spellings of another become one', ['maths', 'Mathematics'].every((s) => canonicalSubject(P, s) === 'math'));
  ok('an unaliased id is folded, not left capitalised', canonicalSubject(P, 'Science') === 'science');
  ok('Khan-taught is checked AFTER the spelling is tidied',
    isKhanTaughtSubject(P, 'Maths') && isKhanTaughtSubject(P, 'reading'),
    'a record filed as reading would otherwise count as a different subject');
  const ela = PETAL.STRANDS.find((s) => s.subject === 'ela');
  ok('a strand id reads as the strand’s card name', subjectCardLabel(P, ela.id) === (ela.cardLabel || ela.label));
  ok('every alias points at a subject the school labels',
    Object.values(PETAL.SUBJECT_ALIASES).every((t) => PETAL.SUBJECT_LABELS[t]),
    'an alias onto an unlabelled id files work under a subject no screen can name');
  ok('its strands are listed by subject', strandsForSubject(P, 'ela').length === PETAL.STRANDS.filter((s) => s.subject === 'ela').length);
}

console.log('\n--- 5. a school that has not filled this slot ---');
{
  ok('no spelling rules means the id as written', canonicalSubject({}, 'Anything') === 'Anything');
  ok('no Khan list means nothing is Khan-taught', isKhanTaughtSubject({}, 'math') === false);
  ok('no labels means the id is its own name', subjectCardLabel({}, 'geology') === 'geology');
  ok('no strands means none', Array.isArray(strandsForSubject({}, 'x')) && strandsForSubject({}, 'x').length === 0);
  ok('nothing is a blank or a throw',
    canonicalSubject(L, undefined) === null && canonicalSubject(L, '') === null && subjectCardLabel({}, null) === null);
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) { console.log('\nFAILED:'); for (const f of failures) console.log('  ' + f); process.exit(1); }
console.log('\nALL CHECKS PASSED');
