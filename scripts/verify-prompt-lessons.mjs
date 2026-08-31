// ---------------------------------------------------------------------------
// THE JOURNAL TEACHES THE FORM BEFORE IT ASKS FOR IT.
// Run: node scripts/verify-prompt-lessons.mjs
//
// ---- WHERE THIS CAME FROM (Aug 17, 2026) ----
//
// The parent: "I was looking at the daily journal, and it's not teaching a
// lesson. Ex. He is to write about why he decided to be an engineer. The lesson
// should be how to write an introduction, what should be in the body, and how
// to write a conclusion."
//
// The gap was precise and slightly embarrassing. The Essay prompt already said
// *"aim for at least 3 paragraphs: an introduction, one or two body paragraphs,
// a conclusion"* — it NAMED all three parts and taught none of them. A
// twelve-year-old reading that knows how many paragraphs to produce and nothing
// about what goes in them.
//
// **Naming a structure is not teaching it**, and all fourteen prompts had the
// same shape: a topic, a word count, and an assumption the form was known.
//
// This is the third time this project has found teaching assigned to nobody.
// Aug 13: composition to the journal, mechanics to Khan, sentence-and-paragraph
// construction to no one. That built the daily drills for sentences and
// paragraphs — and nothing ever taught the FORMS themselves.
//
// HER RULE ABOUT WHEN IT SHOWS, which this suite also protects: "This doesn't
// have to be in every journal, but since this is his real first journal that
// should apply to any other journal that will be asking him to do something
// new." Mission Report comes round seven times a year.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { PROMPT_LESSONS, lessonForPrompt } = await import(REPO + '/src/academies/lamar/data/writing/promptLessons.js');
const { writingPrompts } = await import(REPO + '/src/academies/lamar/data/writing/writingPrompts.js');

let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
}
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');

console.log('\n--- 1. every journal form is taught ---');
{
  const missing = writingPrompts.filter((p) => !lessonForPrompt(p.id)).map((p) => p.id);
  ok('all 14 prompts carry a structure lesson', missing.length === 0, missing.join(', '));
  ok('...and no lesson points at a prompt that does not exist',
    Object.keys(PROMPT_LESSONS).every((id) => writingPrompts.some((p) => p.id === id)),
    Object.keys(PROMPT_LESSONS).filter((id) => !writingPrompts.some((p) => p.id === id)).join(', '));
}

console.log('\n--- 2. her example, specifically ---');
{
  /**
   * The one she named. It has to teach all three parts by name, because that is
   * the exact thing she said was missing.
   */
  const essay = lessonForPrompt('w7-essay');
  const names = essay.parts.map((p) => p.name.toLowerCase());
  ok('the essay lesson teaches an Introduction', names.some((n) => n.includes('introduction')));
  ok('...a Body', names.some((n) => n.includes('body')));
  ok('...and a Conclusion', names.some((n) => n.includes('conclusion')));
  ok('...in that order', names.join('|').indexOf('introduction') < names.join('|').indexOf('body') &&
    names.join('|').indexOf('body') < names.join('|').indexOf('conclusion'));
  ok('and it says what a thesis IS, not just that one is required',
    /thesis/i.test(essay.teach) && essay.teach.length > 120);
}

console.log('\n--- 3. every lesson is a lesson, not a label ---');
{
  const bad = [];
  for (const [id, l] of Object.entries(PROMPT_LESSONS)) {
    if (!l.form) bad.push(`${id}: no form name`);
    if (!l.teach || l.teach.length < 80) bad.push(`${id}: teach too thin`);
    if (!Array.isArray(l.parts) || l.parts.length < 3) bad.push(`${id}: fewer than 3 parts`);
    if ((l.parts || []).some((p) => !p.name || !p.what || !p.tip)) bad.push(`${id}: a part is incomplete`);
    if (!l.weak || !l.strong) bad.push(`${id}: no weak/strong pair`);
    if (!l.checkFor) bad.push(`${id}: nothing to check before turning in`);
  }
  ok('every lesson has a form, teaching, parts, a weak/strong pair and a check',
    bad.length === 0, bad.slice(0, 4).join(' · '));

  /**
   * The load-bearing part, carried over from the daily drills: a rule stated is
   * a rule read; a rule shown beside its violation is a rule he can see.
   */
  ok('the strong example is always more developed than the weak one',
    Object.values(PROMPT_LESSONS).every((l) => l.strong.length > l.weak.length),
    'a "good" example no longer than the bad one demonstrates nothing');
  ok('every part carries a tip, not just a description',
    Object.values(PROMPT_LESSONS).every((l) => l.parts.every((p) => p.tip.length > 20)));
}

console.log('\n--- 4. it shows the first time and gets out of the way after ---');
{
  const engine = read('src/components/Writing/WritingPromptEngine.jsx');
  const code = engine.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

  ok('the lesson is open by default on a first attempt',
    /const firstTime = pastEntries\.length === 0;/.test(code) &&
    /lessonOpen === null \? firstTime : lessonOpen/.test(code));
  ok('...and collapses once he has written that form before',
    /You have done this before/.test(engine),
    'Mission Report comes round seven times; teaching shoved at him on the seventh trains him to scroll past it');
  ok('...but can always be reopened', /setLessonOpen\(!open\)/.test(code),
    'collapsed is not hidden');
  ok('the check-before-you-turn-it-in line is shown for journal prompts too',
    /structure && !isDrill/.test(code) && /structure\.checkFor/.test(code),
    'the drills had this and the journals did not');
  ok('a daily drill still uses its OWN teaching, not this',
    /structure && !isDrill/.test(code) && !/structure && isDrill/.test(code),
    'two teaching blocks on one screen is worse than none');
}

console.log('\n--- 5. the instructions no longer carry the whole burden ---');
{
  /**
   * The Essay prompt's instructions named the three parts. That was the app's
   * entire structural teaching for the form. It stays — it is a useful reminder
   * of the shape — but it is no longer the only thing he has.
   */
  const essayPrompt = writingPrompts.find((p) => p.id === 'w7-essay');
  ok('the prompt still names the shape', /introduction/i.test(essayPrompt.instructions));
  ok('...and the lesson now teaches it as well',
    lessonForPrompt('w7-essay').parts.length >= 3,
    'naming a structure is not teaching it');
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
