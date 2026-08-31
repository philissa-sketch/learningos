// ---------------------------------------------------------------------------
// BLOOKET, KAHOOT AND GIMKIT. Run: node scripts/verify-quiz-games.mjs
//
// ---- WHERE THIS CAME FROM (Aug 20, 2026) ----
//
// The parent: "add blooket, kahoot, and gimkit to Lamar game section"
//
// All three are TEACHER-HOSTED. She builds or assigns a set and he joins with
// a code or an assignment link that is different every time — so unlike every
// other entry in the games library, there is no address that can be written
// down once and stay right.
//
// Asked how he should get in, she chose to paste the link herself. This guard
// holds the three properties that makes that safe and useful:
//
//   1. NO GUESSED URLs. externalGamesLibrary.js states the rule this project
//      follows — "verified live via direct fetch/search ... never guessed" —
//      and the three homepages could NOT be fetched in the session that added
//      this. So none is written down. The only link is hers.
//   2. NO DEAD ENDS. A platform with no link set says "ask Mom" rather than
//      opening a page with a game-code box he cannot fill. Work he is told
//      about but cannot reach is the fault this project keeps having.
//   3. IT REACHES HIS COMPUTER. A link that lives only on her machine is a
//      link he never sees.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { QUIZ_PLATFORMS, QUIZ_PLATFORM_IDS, quizPlatformById } =
  await import(REPO + '/src/academies/lamar/data/games/quizPlatforms.js');

let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
}
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');
const codeOnly = (t) => t
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
  .replace(/^\s*\/\/.*$/gm, '');

const DATA = 'src/academies/lamar/data/games/quizPlatforms.js';
const GAMES = 'src/components/Games/GamesHome.jsx';
const PARENT = 'src/components/Dashboard/ParentDashboard.jsx';
const STORE = 'src/store/useAppStore.js';

console.log('\n--- 1. the three she named, and nothing invented ---');
{
  ok('all three platforms exist',
    JSON.stringify(QUIZ_PLATFORM_IDS) === JSON.stringify(['blooket', 'kahoot', 'gimkit']),
    JSON.stringify(QUIZ_PLATFORM_IDS));
  for (const p of QUIZ_PLATFORMS) {
    ok(`${p.label} explains itself to him`, Boolean(p.blurb && p.blurb.length > 20),
      'a bare product name tells a twelve-year-old nothing about what he is opening');
    ok(`${p.label} tells HER what to paste`, Boolean(p.parentHint && p.parentHint.length > 20));
  }
  ok('lookup by id works', quizPlatformById('kahoot')?.label === 'Kahoot');
  ok('...and an unknown id returns null, not undefined-dot-crash',
    quizPlatformById('nope') === null);
}

console.log('\n--- 2. NO GUESSED URLs ANYWHERE ---');
{
  /**
   * The standing rule, quoted from externalGamesLibrary.js: every link is
   * "verified live via direct fetch/search before being added ... never
   * guessed." The three homepages could not be fetched, so none was written
   * down — not in the data, not as a fallback in the card.
   */
  const dataCode = codeOnly(read(DATA));
  ok('the platform data contains no URL at all',
    !/https?:\/\//i.test(dataCode),
    'a guessed address for a child to tap breaks the rule this project set itself');
  ok('...and no url-ish field either',
    !/\burl\b\s*:/.test(dataCode) && !/joinUrl|homeUrl|siteUrl/.test(dataCode),
    'an empty url field is an invitation to fill it in with a guess');

  const gamesCode = codeOnly(read(GAMES));
  const quizBlock = gamesCode.slice(
    gamesCode.indexOf('QUIZ_PLATFORMS.map'),
    gamesCode.indexOf('EXTERNAL_GAMES_LIBRARY') > gamesCode.indexOf('QUIZ_PLATFORMS.map')
      ? gamesCode.indexOf('EXTERNAL_GAMES_LIBRARY')
      : gamesCode.length
  );
  ok('the card hard-codes no address of its own',
    !/https?:\/\//i.test(quizBlock),
    JSON.stringify((quizBlock.match(/https?:\/\/\S+/) || [])[0] || ''));
  ok('...the only href is the one she pasted',
    /href=\{link\}/.test(gamesCode));
}

console.log('\n--- 3. no dead ends ---');
{
  const src = read(GAMES);
  const code = codeOnly(src);
  ok('a platform with no link still appears',
    /if \(!link\) \{/.test(code),
    'hiding it would leave her wondering whether the app knows about the site at all');
  ok('...and says to ask her, naming the platform',
    /No game set — ask Mom for this week&apos;s \{platform\.label\} link\./.test(src));
  ok('...and is not a link',
    !/if \(!link\) \{[\s\S]{0,600}<a\b/.test(code),
    'a link to a game-code box he cannot fill is the dead end this avoids');
  ok('a platform WITH a link opens in a new tab, safely',
    /target="_blank"/.test(code) && /rel="noreferrer"/.test(code));
  ok('the section explains who sets these up',
    /Quiz Games — Mom sets these up/.test(src));
}

console.log('\n--- 4. she can set them, and only to something safe ---');
{
  const store = codeOnly(read(STORE));
  ok('there is a setter', /async setQuizLink\(platformId, url\) \{/.test(store));
  ok('...that refuses an unknown platform',
    /!QUIZ_PLATFORM_IDS\.includes\(platformId\)/.test(store)
      && /import \{ QUIZ_PLATFORM_IDS \} from '\.\.\/academies\/lamar\/data\/games\/quizPlatforms\.js';/.test(store));
  ok('...and refuses anything that is not http(s)',
    /!\/\^https\?:\\\/\\\/\/i\.test\(trimmed\)/.test(store),
    'a javascript: or data: URL here is handed straight to a link a child taps');
  ok('...and an empty value clears it rather than storing blank',
    /else delete next\[platformId\];/.test(store),
    'a stale link from three weeks ago is worse than no link');
  ok('...persisted to meta, not just memory',
    /await saveMeta\(\{ quizLinks: next \}\);/.test(store));

  const parent = read(PARENT);
  const pcode = codeOnly(parent);
  ok('she has a screen for it', /function QuizGameLinksSection\(\)/.test(pcode));
  ok('...that is actually rendered',
    /\{section === 'quiz-games' && <QuizGameLinksSection \/>\}/.test(pcode),
    'an unreferenced component is a decision that did not ship — this repo has three');
  ok('...and reachable from the navigation',
    /\{ id: 'quiz-games', label: 'Blooket \/ Kahoot \/ Gimkit' \}/.test(pcode));
  ok('...with a box per platform, driven by the data file',
    /QUIZ_PLATFORMS\.map\(\(platform\) => \{/.test(pcode)
      && /import \{ QUIZ_PLATFORMS \} from '\.\.\/\.\.\/academies\/lamar\/data\/games\/quizPlatforms\.js';/.test(pcode));
  ok('...and a bad address is explained, not swallowed',
    /That needs to start with http:\/\/ or https:\/\//.test(parent));
}

console.log('\n--- 5. the link reaches his computer ---');
{
  const store = codeOnly(read(STORE));
  ok('quizLinks is in the export payload',
    /quizLinks: state\.quizLinks \|\| \{\}/.test(store),
    'a link that lives only on her machine is a link he never sees');
  ok('...read back on import, with her copy winning',
    /const quizLinks = \{ \.\.\.\(importedData\.quizLinks \|\| \{\}\), \.\.\.\(state\.quizLinks \|\| \{\}\) \};/.test(store),
    'same rule as exerciseVideos — she curates, nothing is dropped');
  ok('...reaching the live store after an import',
    /\n      quizLinks,\n/.test(store));
  /**
   * ---- ASSERT MEMBERSHIP, NOT ADJACENCY (Aug 25, 2026) ----
   *
   * This read `/equippedGear, quizLinks, exerciseVideos/` — the literal
   * argument list, in order. It broke the moment `hqLayout` was inserted
   * between the first two, and `quizLinks` was still being persisted exactly
   * as required. The check was pinned to its NEIGHBOURS.
   *
   * That is the fifth guard this week to fail on punctuation while its
   * property held. What has to be true is that quizLinks is inside the
   * saveMeta call on the import path, so that is what is asked.
   */
  const saveCalls = [...store.matchAll(/saveMeta\(\{[^}]*\}\)/g)].map((m) => m[0]);
  // The import-path call is the big one — identified by a field only it
  // writes, rather than by being first in the file. There are several
  // saveMeta calls and the first is a much shorter one.
  const importSave = saveCalls.find((c) => /unlockedCosmetics/.test(c)) || '';
  ok('...and written to meta on that path too',
    /\bquizLinks\b/.test(importSave),
    'merged in memory and not persisted would be undone by the next reload');
  ok('...and hydrated on startup',
    /quizLinks: meta\?\.quizLinks \?\? \{\}/.test(store));
  ok('his screen subscribes to it',
    /const quizLinks = useAppStore\(\(s\) => s\.quizLinks\);/.test(codeOnly(read(GAMES))),
    'unsubscribed, it is undefined at render');
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
