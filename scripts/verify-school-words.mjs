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

// ---------------------------------------------------------------------------
console.log('\n--- 7. the sweep only moves forward ---');
// ---------------------------------------------------------------------------
{
  /**
   * A count that may GROW and must never SHRINK — the same ratchet
   * generic-debt.json runs, pointed the other way.
   *
   * The debt list measures what is still wrong. This measures what has been
   * PUT RIGHT, and the two can come apart in one specific way that would
   * otherwise pass both: a file can leave the debt list by having its sentence
   * DELETED rather than reworded. "Send my work to Mom" scores exactly as
   * clean when the button says nothing at all, and a screen that has quietly
   * lost its words is a worse outcome than the one the audit complained about.
   *
   * Raise SWEPT_BASELINE in the same commit that sweeps a file, exactly as
   * KNOWN_RED_BASELINE is lowered when a red is cleared.
   */
  const SWEPT_BASELINE = 23;

  const walk = (dir, acc = []) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) walk(full, acc);
      else if (/\.(js|jsx)$/.test(e.name)) acc.push(full);
    }
    return acc;
  };

  const ACCESSORS = ['learnerWord', 'guardianWord', 'stateWord', 'fillWords', 'installSchoolWords', 'unloadSchoolWords', 'schoolWordsAcademyId', 'GENERIC_WORDS'];
  const importers = walk(path.join(REPO, 'src'))
    .map((f) => [path.relative(REPO, f).split(path.sep).join('/'), fs.readFileSync(f, 'utf8')])
    .filter(([, text]) => /from '[^']*schoolWords\.js'/.test(text));

  ok(`at least ${SWEPT_BASELINE} files ask the platform for their words`,
    importers.length >= SWEPT_BASELINE,
    `${importers.length} do — a file that stopped asking either regressed or had its sentence deleted`);

  const dead = importers.filter(([, text]) => {
    const body = text.replace(/^import[\s\S]*?from '[^']*schoolWords\.js';$/m, '');
    return !ACCESSORS.some((a) => new RegExp(`[^a-zA-Z]${a}\\b`).test(body));
  }).map(([rel]) => rel);

  ok('no file imports the words and then does not use them', dead.length === 0,
    `${dead.join(', ')} — a dead import is what is left when a sentence was deleted instead of reworded`);
}

// ---------------------------------------------------------------------------
console.log('\n--- 8. every token reaches a fillWords ---');
// ---------------------------------------------------------------------------
{
  /**
   * A token is only half a repair. `'{state} asks for one'` in a string is not
   * a sentence until something calls fillWords on it, and an unfilled one does
   * not throw or look broken in the source — it prints a literal `{state}` on
   * a parent's screen.
   *
   * ---- WHY THIS CHECKS THE FIELD AND NOT THE FILE ----
   *
   * The first version asked "does this file mention fillWords?" and MISSED
   * both mutations written against it: deleting the call left the import
   * behind, and the word `fillWords` was still in the file. A check that an
   * import exists is not a check that anything is filled.
   *
   * So it works field by field. A token lives in a data table under some key
   * — `what`, `blurb`, `speak` — and the screen reads it back as `guide.what`.
   * EVERY read of that key must sit inside a fillWords call. That is the
   * property; which file it happens in does not matter, which is what makes it
   * survive the table and the screen being moved apart.
   */
  const TOKEN_FIELDS = [
    { carrier: 'src/lib/driveLinks.js', field: 'blurb', readers: ['src/components/Dashboard/EvidenceLink.jsx'] },
    { carrier: 'src/components/Dashboard/NovaParentGuide.jsx', field: 'what', readers: ['src/components/Dashboard/NovaParentGuide.jsx'] },
    { carrier: 'src/components/Rewards/NovaTabGuide.jsx', field: 'speak', readers: ['src/components/Rewards/NovaTabGuide.jsx'] },
    { carrier: 'src/components/Academic/NovaAcademicGuide.jsx', field: 'speak', readers: ['src/components/Academic/NovaAcademicGuide.jsx'] },
    { carrier: 'src/components/Dashboard/AdminRecordsSection.jsx', field: 'blurb', readers: ['src/components/Dashboard/AdminRecordsSection.jsx'] }
  ];

  const walk = (dir, acc = []) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) walk(full, acc);
      else if (/\.(js|jsx)$/.test(e.name)) acc.push(full);
    }
    return acc;
  };

  const TOKEN_IN_SOURCE = /\{(?:[^|{}]*\|)?(?:learner|guardian|state)\}/;
  const carriers = walk(path.join(REPO, 'src'))
    .map((f) => path.relative(REPO, f).split(path.sep).join('/'))
    .filter((rel) => TOKEN_IN_SOURCE.test(src(rel)));

  ok('some file still carries a token', carriers.length > 0,
    'the token form is how a vocative keeps its punctuation — losing it is a regression');

  // Every token-carrying file is either declared above or fills inline.
  const declared = new Set(TOKEN_FIELDS.map((t) => t.carrier));
  const undeclared = carriers.filter((rel) => !declared.has(rel) && !/fillWords\(/.test(src(rel)));
  ok('no token-carrying file is unaccounted for', undeclared.length === 0,
    `${undeclared.join(', ')} — add it to TOKEN_FIELDS or fill its tokens inline`);

  for (const { carrier, field, readers } of TOKEN_FIELDS) {
    ok(`${carrier.split('/').pop()} still carries tokens in \`${field}\``,
      carriers.includes(carrier),
      'the entry is stale — remove it if the tokens are gone');

    for (const reader of readers) {
      const text = src(reader);
      const reads = [...text.matchAll(new RegExp(`\\w+\\.${field}\\b`, 'g'))].map((m) => m[0]);
      const filled = [...text.matchAll(new RegExp(`fillWords\\(\\s*\\w+\\.${field}\\b`, 'g'))].length;
      ok(`${reader.split('/').pop()}: all ${reads.length} read(s) of .${field} go through fillWords`,
        reads.length > 0 && filled === reads.length,
        `${filled} of ${reads.length} filled — an unfilled read prints a literal token on screen`);
    }
  }
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
