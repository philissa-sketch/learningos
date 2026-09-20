// ---------------------------------------------------------------------------
// THE WORDS A SCHOOL USES FOR ITS OWN PEOPLE AND PLACE.
// Run: node scripts/verify-school-words.mjs
//
// ---- WHAT THIS IS FOR (audit finding 7, step 7 of the repair order) ----
//
// The sweep replaces one family's words with three that come from somewhere.
// A sweep is exactly the kind of work that half-lands: a file gets its import
// and never its call, or a line keeps its token and nothing ever fills it, and
// both of those look FINE on a machine where the family in question is the one
// using it — because the baked-in word and the looked-up word are the same
// word. It goes wrong on somebody else's computer, which is the one place
// nobody is testing.
//
// So this asserts the PROPERTY, not the address: not "novaVoice imports
// fillWords" but "a greeting produced with no family installed contains no
// leftover token and no stray punctuation". A rewrite that moves the code
// somewhere else keeps passing; a rewrite that breaks the behaviour goes red.
// ---------------------------------------------------------------------------

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');

let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
}

// pathToFileURL, not a concatenated path. Node on Windows refuses a bare
// absolute path in import() — the bug that took 34 of these checks out at once
// in September, and which verify-script-imports caught this file doing within
// an hour of it being written.
const load = (rel) => import(pathToFileURL(path.join(REPO, rel)).href);
const words = await load('src/lib/schoolWords.js');
const nova = await load('src/lib/novaVoice.js');

// A token that survived the fill. Deliberately matches the PREFIX form too —
// "{, |learner}" left on screen is the failure this whole file exists for.
const TOKEN = /\{(?:[^|{}]*\|)?(?:learner|guardian|state)\}/;

// ---------------------------------------------------------------------------
console.log('\n--- 1. the three words each have a source and a fallback ---');
// ---------------------------------------------------------------------------
{
  words.unloadSchoolWords();
  ok('nothing installed is not an error', typeof words.learnerWord() === 'string');
  ok('the grown-up has a generic word', words.guardianWord() === words.GENERIC_WORDS.guardian);
  ok('the place has a generic word', words.stateWord() === words.GENERIC_WORDS.state);
  ok('a child does NOT get a generic name', words.learnerWord() === '',
    'there is no honest stand-in for a name spoken to someone; the address is dropped instead');

  words.installSchoolWords({
    record: { id: 'test', displayName: ' Ada ', guardianWord: ' Nana ' },
    content: { compliance: { stateName: ' Utah ' } }
  });
  ok('the name comes from the household record', words.learnerWord() === 'Ada');
  ok('the grown-up word comes from the household record', words.guardianWord() === 'Nana');
  ok('the place comes from the Academy content', words.stateWord() === 'Utah');
  ok('which record they came from is known', words.schoolWordsAcademyId() === 'test',
    'a settings screen saving a word has to patch the right row');
}

// ---------------------------------------------------------------------------
console.log('\n--- 2. a blank answer is not an answer ---');
// ---------------------------------------------------------------------------
{
  words.installSchoolWords({
    record: { id: 't', displayName: '   ', guardianWord: '' },
    content: { compliance: { stateName: null } }
  });
  ok('whitespace is not a name', words.learnerWord() === '');
  ok('a cleared grown-up word falls back', words.guardianWord() === words.GENERIC_WORDS.guardian);
  ok('a missing place falls back', words.stateWord() === words.GENERIC_WORDS.state);
}

// ---------------------------------------------------------------------------
console.log('\n--- 3. the vocative takes its punctuation with it ---');
// ---------------------------------------------------------------------------
{
  words.unloadSchoolWords();
  ok('no name leaves no comma', words.fillWords('Welcome back{, |learner}. Ready?') === 'Welcome back. Ready?',
    '"Welcome back, . Ready?" shipped once');
  words.installSchoolWords({ record: { id: 't', displayName: 'Ada' } });
  ok('a name brings the comma', words.fillWords('Welcome back{, |learner}. Ready?') === 'Welcome back, Ada. Ready?');
  words.unloadSchoolWords();
  ok('an unknown token is left visible', words.fillWords('x {nobody}') === 'x {nobody}',
    'blanking a typo hides it; a family reads it as an answer of theirs being ignored');
}

// ---------------------------------------------------------------------------
console.log('\n--- 4. the guide speaks to a family it has not met ---');
// ---------------------------------------------------------------------------
{
  const DAYS = [null, 0, 1, 2, 3, 9];
  const KINDS = ['core', 'buffer', 'weekend', 'holiday'];
  let clean = true;
  let punctuation = true;
  words.unloadSchoolWords();
  for (const daysAway of DAYS) {
    for (const patternKind of KINDS) {
      for (const hour of [9, 15]) {
        const line = nova.getDashboardGreeting({ daysAway, patternKind, hour, today: '2026-09-19', streak: 5 });
        if (TOKEN.test(line)) clean = false;
        // ", ." and " ," are what a naive replacement leaves behind.
        if (/,\s*[.—]|\s,/.test(line)) punctuation = false;
      }
    }
  }
  ok('no greeting shows a leftover token', clean, 'a child would read "{, |learner}" on the dashboard');
  ok('no greeting is left with orphaned punctuation', punctuation);

  words.installSchoolWords({ record: { id: 't', displayName: 'Ada' } });
  const named = nova.getDashboardGreeting({ daysAway: 3, today: '2026-09-19' });
  ok('the greeting uses the installed name', named.includes('Ada'));
  ok('...and still shows no token', !TOKEN.test(named));
}

// ---------------------------------------------------------------------------
console.log('\n--- 5. nothing imports a compiled-in name any more ---');
// ---------------------------------------------------------------------------
{
  const voice = src('src/lib/novaVoice.js');
  ok('the guide file exports no student name constant',
    !/export\s+const\s+STUDENT_NAME/.test(voice),
    'src/lib/novaVoice.js:81 was the single line the audit named by file and number');

  // Strip comments before looking: this file's own history note mentions the
  // constant by name on purpose, and a check that cannot tell a comment from
  // code teaches everyone to stop believing it.
  const codeOnly = (t) => t.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
  const importers = ['src/components/Dashboard/WeekInReviewCard.jsx', 'src/components/Rewards/RewardsHome.jsx'];
  for (const rel of importers) {
    ok(`${rel.split('/').pop()} no longer imports it`, !/STUDENT_NAME/.test(codeOnly(src(rel))));
  }
}

// ---------------------------------------------------------------------------
console.log('\n--- 6. the words are set before a school can render ---');
// ---------------------------------------------------------------------------
{
  const shell = src('src/components/Academy/AcademyShell.jsx');
  const install = shell.indexOf('installSchoolWords(');
  const ready = shell.indexOf("setContent('ready')");
  ok('the shell installs them', install > -1);
  ok('...before it lets the school render', install > -1 && ready > -1 && install < ready,
    'a screen that renders first reads the generic word and never re-reads it');
  ok('sign-out forgets them', /unloadSchoolWords\(\)/.test(src('src/FrontDoorGate.jsx')),
    'a line firing during teardown must not still hold the last family\'s words');
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
