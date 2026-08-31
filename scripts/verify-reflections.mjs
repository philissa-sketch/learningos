// ---------------------------------------------------------------------------
// "IN HIS OWN WORDS" — read and replied to, never graded, never asked for on a
// drill. Run: node scripts/verify-reflections.mjs
//
// The parent, Aug 9 2026, looking at seven queued reflections reading
// "ASDFGHJKL;" and "MPH FOR WORDS": "the app currently has this setup for
// Typing in Tech but I am wonder if it is useful to have this graded."
//
// Three separate faults sat behind that screen:
//
//   1. THE APP CONTRADICTED ITSELF. LessonEngine tells him, in these words,
//      "There's no wrong answer here, and it isn't graded" and "Ungraded --
//      this is just for you to check your own understanding." The Parent
//      Dashboard then put a **Set grade** button on every one.
//   2. THE GRADE REACHED NOTHING. Not the transcript, not the gradebook
//      average, not the compliance packet, not Learning Analytics.
//   3. THE QUESTION HAD NO CONTENT. "Explain the home row in your own words"
//      has a correct answer and it is "asdfghjkl;". Teach-it-back works on
//      ideas; it has nothing to grab onto in a motor-skill drill.
//
// These checks are written so that each of the three fails loudly if it comes
// back.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { allLessons } from '../src/academies/lamar/data/lessons/index.js';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
}
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');

const engine = read('src/engine/LessonEngine.jsx');
const board = read('src/components/Dashboard/MissionControlBoard.jsx');
const store = read('src/store/useAppStore.js');

// ---------------------------------------------------------------------------
console.log('\n--- 1. the app does not contradict itself ---');
// ---------------------------------------------------------------------------
/**
 * ---- THIS SECTION WAS REVERSED ON AUG 21, 2026, DELIBERATELY ----
 *
 * The check that used to stand here read:
 *
 *     ok('the lesson still promises him the step is ungraded', ...
 *        'if this promise is ever removed, decide deliberately -- do not let
 *         it rot');
 *
 * It did its job. It failed the moment the grade came back, and it failed for
 * the right reason — the Aug 9 decision was the parent's, and undoing it had to
 * be hers too.
 *
 * It was. Asked directly, she chose *grade it, and make it count*. What changed
 * between the two decisions is the writing: the reflections behind the first
 * were "fortnit" and "mile stone", and the ones on screen when she asked again
 * were 26 to 43 word paragraphs.
 *
 * **The property being guarded is not "ungraded". It is that the lesson and the
 * board tell him the same thing.** That is what the original check was really
 * protecting, and it is what is enforced below — in the other direction now.
 */
const ENGINE_SAYS_GRADED = /she may put a grade on how/.test(engine);
ok('the lesson tells him his answer may be graded',
  ENGINE_SAYS_GRADED,
  'it promised the opposite until Aug 21 — telling him it is not graded and then grading it is the one thing that would make him stop writing honestly');
ok('...and no line anywhere still claims it is ungraded',
  !/it isn.t graded/.test(engine) && !/Ungraded — this is just for you/.test(engine),
  'both promises were on the same screen; removing one would have left the app arguing with itself');
ok('...while keeping the low-stakes framing the technique depends on',
  /There.s no single right answer/.test(engine),
  'a self-explanation only works if he writes what he thinks rather than what scores');

// The board must now agree with it.
const reflectionStart = board.indexOf('readQueue.push({');
const reflectionRow = board.slice(reflectionStart, board.indexOf('});', reflectionStart));
ok('the board offers a grade on a reflection row',
  /onGrade:/.test(reflectionRow),
  'the lesson says it may be graded; a board with no grade control would be the same contradiction, mirrored');
ok('...and still saves a reply beside it',
  /onRespond:/.test(reflectionRow),
  'the letter says where he landed; one specific sentence says what to do differently, and only the second reaches him');
ok('...and the board hint no longer says it is ungraded',
  !/Not graded/.test(board));
ok('grading it reaches the store',
  /gradeSelfExplanation/.test(board),
  'the whole point of reversing this was that the letter reaches a real average');

// ---------------------------------------------------------------------------
console.log('\n--- 2. it is counted as reading, not as grading ---');
// ---------------------------------------------------------------------------
const outstanding = store.length && board.slice(board.indexOf('const outstanding ='), board.indexOf('const outstanding =') + 320);
ok('the "needs a grade" count excludes reflections',
  !/reflections/i.test(outstanding),
  'counting them there turned four things to grade into eleven');
ok('unread reflections have their own queue', /const readQueue = \[\]/.test(board));
ok('the panel only renders when something is unread', /readQueue\.length > 0 &&/.test(board));

ok('respondToSelfExplanation exists and stamps readAt',
  /async respondToSelfExplanation\(id, note\)/.test(store) && /readAt/.test(store));
ok('the two-computer merge carries readAt back with the note',
  /readAt: local\.readAt/.test(store),
  'without this a reflection she has answered reappears unread on the other machine');

// ---------------------------------------------------------------------------
console.log('\n--- 3. retakes collapse, and the row says which lesson ---');
// ---------------------------------------------------------------------------
ok('attempts are grouped by lesson and beat', /const byBeat = new Map\(\)/.test(board));
ok('the newest attempt is the one shown, with a count',
  /attempts \+= 1/.test(board) && /attempts, newest shown/.test(board),
  'four retakes of one lesson read as four separate assignments before this');
ok('the row is titled with the lesson, not just the beat',
  /lessonTitleById\[e\.lessonId\]/.test(board),
  '"The Home Row" four times gave no clue it was all Typing Fundamentals');

// ---------------------------------------------------------------------------
console.log('\n--- 4. a drill beat is never asked to explain itself ---');
// ---------------------------------------------------------------------------
ok('the engine lets a beat decline', /export function beatWantsReflection\(beat\)/.test(engine));
ok('declining is opt-OUT, so a new conceptual lesson still gets the step',
  /beat\?\.reflect !== false/.test(engine));
ok('the engine advances past a declining beat instead of hanging',
  (engine.match(/advanceFromBeat\(\)/g) || []).length >= 3,
  'both entry points to beat-reflect plus the reflect handler itself');

const TYPING_LESSONS = ['tech7-typing', 'tech7-typing-2'];
const typing = allLessons.filter((l) => TYPING_LESSONS.includes(l.id));
ok('both typing lessons are still in the curriculum', typing.length === 2);
const typingBeats = typing.flatMap((l) => (l.novaIntro?.beats || []));
ok('every typing beat declines the reflection',
  typingBeats.length > 0 && typingBeats.every((b) => b.reflect === false),
  typingBeats.filter((b) => b.reflect !== false).map((b) => b.label).join(', '));

// The typing lessons keep their real assessment -- this is the part that IS
// graded, and it grades itself.
ok('typing is still assessed by its own test',
  typing.every((l) => Array.isArray(l.questions) && l.questions.length >= 10),
  'dropping the reflection must not drop the lesson grade with it');

// And the concept lessons must NOT have been swept up in this.
const conceptual = allLessons.filter(
  (l) => !TYPING_LESSONS.includes(l.id) && Array.isArray(l.novaIntro?.beats) && l.novaIntro.beats.length > 0
);
const optedOut = conceptual.filter((l) => l.novaIntro.beats.some((b) => b.reflect === false));
ok('no conceptual lesson lost its teach-it-back step',
  optedOut.length === 0,
  optedOut.slice(0, 5).map((l) => l.id).join(', '));
ok('there are plenty of lessons still asking', conceptual.length > 50, `${conceptual.length} lessons with beats`);


console.log('\n--- the board notices a reflection that is not one ---');
{
  /**
   * The parent, reading her own board: "What is in his own words?"
   *
   * Four reflections were queued for her to read. Three of them were "fortnit",
   * "fortnit" and "mile stone". The queue counted them as work; nothing said
   * they were one word long.
   */
  const board = read('src/components/Dashboard/MissionControlBoard.jsx');
  const code = board.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\{\/\*[\s\S]*?\*\/\}/g, '').replace(/^\s*\/\/.*$/gm, '');

  ok('a one- or two-word reflection is a signal, not silence',
    /const thinReflections = selfExplanations\.filter/.test(code));
  ok('...measured in words, not characters',
    /split\(\/\\s\+\/\)\.filter\(Boolean\)/.test(code) && /length <= 2/.test(code),
    'a character count would call "ASDFGHJKL;" a long answer');
  ok('...and it clears once she has read it or answered it',
    /if \(e\.readAt \|\| e\.grade \|\| e\.gradeNote\) return false;/.test(code),
    'otherwise three one-word answers from August are on her board forever');
  ok('...and an empty box is not counted as a thin answer',
    /words\.length > 0 &&/.test(code),
    'nothing written is a different fact from something written badly');
  ok('...it reaches the watch panel',
    /board\.thinReflections\.length/.test(code) && /Reflections of two words or fewer/.test(board));
  ok('...quoting what he actually wrote, so she can see it without navigating',
    /thinReflections\.slice\(0, 4\)/.test(code));
  ok('...and it is framed as a conversation, not a mark',
    /Worth asking him out loud rather than marking it/.test(board),
    'the panel is judgement calls; this one is about the beat not landing');
  ok('...and it is a WATCH item, never in the grading queue',
    !/gradeQueue\.push[\s\S]{0,400}thinReflections/.test(code),
    'reflections are read, not graded — that decision predates this and stands');
}


console.log('\n--- she can read the whole thing he wrote ---');
{
  /**
   * The parent, once his real reflections finally arrived: **"In his words
   * there isn't an option for me to read what he wrote."**
   *
   * The queue row quoted the first 90 characters and trailed off, and its only
   * link went to the Gradebook, which does not carry reflection text. Anything
   * longer than a sentence could be counted, dated, queued and replied to —
   * without ever being readable.
   *
   * It stayed hidden while his answers were "fortnit" and "mile stone", where
   * 90 characters was the whole answer.
   */
  const board = read('src/components/Dashboard/MissionControlBoard.jsx');
  const code = board.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\{\/\*[\s\S]*?\*\/\}/g, '').replace(/^\s*\/\/.*$/gm, '');

  ok('the full text travels with the queue row',
    /fullText: \(e\.text \|\| ''\)\.trim\(\)/.test(code),
    'the 90-character quote is a preview, not the record');
  ok('...and the row can open it',
    /item\.fullText && item\.fullText\.length > 90 && <FullText/.test(code));
  ok('...only when the quote was actually cut short',
    /length > 90/.test(code),
    'a "read it all" link under a finished sentence is noise in a long list');
  ok('...rendered with his line breaks intact',
    /whitespace-pre-wrap/.test(code),
    'he writes in short lines; collapsing them changes what he wrote');
  ok('...and it toggles shut again',
    /\{open \? 'Hide' : 'Read it all'\}/.test(code));
  /**
   * This pinned the element's exact one-line JSX. It broke when the component
   * gained a grade prop and wrapped across lines — on a behaviour that had not
   * changed. Same fault as five other guards in this repo: asserting the
   * punctuation instead of the property.
   */
  const readAndReplyTag = (code.match(/<ReadAndReply[\s\S]*?\/>/) || [''])[0];
  ok('the reply box is still there beside it',
    /onRespond=\{item\.onRespond\}/.test(readAndReplyTag),
    'reading and answering are the same moment');
  ok('...and the grade sits on the same control',
    /onGrade=\{item\.onGrade\}/.test(readAndReplyTag),
    'two separate places to judge one paragraph is two chances to do half the job');
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
