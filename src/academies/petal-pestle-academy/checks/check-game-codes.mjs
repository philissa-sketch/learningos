// ---------------------------------------------------------------------------
// check-game-codes — Today's game: Gigi types the code or link for a Gimkit,
// Kahoot or Blooket game, and it shows on Azianna's Play tab that day
// (Oct 1 2026).
//
// Run from the learningos folder:
//     node src/academies/petal-pestle-academy/checks/check-game-codes.mjs
//     node src/academies/petal-pestle-academy/checks/check-game-codes.mjs --self-test
//
// Gigi: "build for Gimkit, Kahoot and Blooket, so when the scheduled day comes
// I can add the code."
//
// ---- WHAT IT ASSERTS ----
//  1. THE RULES (data/games/gameCodes.js): a code with spaces or dashes is
//     taken; a link is taken only if https and the SITE'S OWN host (look-alike
//     domains, javascript:, other sites, links with a sign-in inside are
//     refused); the rotation is Mon Kahoot, Tue Blooket, Wed Gimkit, Thu Kahoot,
//     Fri Blooket and agrees with the guide's table; an entry shows only on its
//     own day; the date pre-fills to the next day that site is her game.
//  2. A REAL TRADE — two pretend computers in a test database, through the real
//     exportAll / previewImport / importVerdict / importBackup:
//       · a code typed on Gigi's computer reaches her laptop, EVEN WHEN the file
//         is older than her laptop and the code is its only news (the guard
//         must not call it "adds nothing");
//       · the newer entry wins, the older never overwrites;
//       · a hostile file (another site's link, javascript:, markup) cannot plant
//         anything, however new it claims to be.
//  3. THE SCREENS (read as source): her Play tab shows only entries for today,
//     builds the button from playUrl, uses short sentences; Gigi's panel is on
//     the Review games screen, validates before saving, pre-fills the day;
//     the store cleans what it loads; the import preview names Game codes.
// ---------------------------------------------------------------------------

import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { tmpdir } from 'node:os';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const REPO = join(ROOT, '../../..');
const SELF_TEST = process.argv.includes('--self-test');
const SRC = {
  gc: 'data/games/gameCodes.js',
  db: 'db/db.js',
  guard: 'lib/importGuard.js',
  view: 'components/Games/GamesView.jsx',
  panel: 'components/Parent/GamesGuidePanel.jsx',
  tgp: 'components/Parent/TodaysGamePanel.jsx',
  store: 'store/useAppStore.js',
  parent: 'components/Parent/ParentDashboard.jsx'
};
const read = (rel) => readFileSync(join(ROOT, rel), 'utf8');

await import(pathToFileURL(join(REPO, 'node_modules/fake-indexeddb/auto/index.mjs')).href);
globalThis.window = globalThis;
globalThis.dispatchEvent = () => true;
const DEXIE = pathToFileURL(join(REPO, 'node_modules/dexie/dist/dexie.mjs')).href;

let tmp = null;
let n = 0;
/** Write a school module to a temp copy (imports pointed at the real files) and return its address. */
function emit(rel, source, swaps = {}) {
  tmp = tmp || mkdtempSync(join(tmpdir(), 'pp-gamecodes-'));
  const dir = dirname(join(ROOT, rel));
  let fixed = (source ?? read(rel))
    .replace(/import \{ loadedAcademyId \} from '[^']+';/, 'const loadedAcademyId = () => globalThis.__SCHOOL__;')
    .replace("from 'dexie'", `from '${DEXIE}'`);
  for (const [from, to] of Object.entries(swaps)) fixed = fixed.split(from).join(to);
  fixed = fixed.replace(/from\s+'(\.{1,2}\/[^']+)'/g, (_, p) => `from '${pathToFileURL(resolve(dir, p)).href}'`);
  const file = join(tmp, `m${n++}.mjs`);
  writeFileSync(file, fixed);
  return pathToFileURL(file).href;
}
const loadModule = (rel, source, swaps) => import(emit(rel, source, swaps));

// ---- 1. THE RULES ----
function rules(gc, guideData) {
  const out = [];
  const fail = (m) => out.push(m);
  const P = gc.parseGameEntry;

  const spaced = P('gimkit', '123 456');
  if (!spaced.ok || spaced.kind !== 'code' || spaced.value !== '123456') fail('"123 456" was not taken as the code 123456');
  const dashed = P('kahoot', '123-4567');
  if (!dashed.ok || dashed.value !== '1234567') fail('a code with a dash was not taken');
  if (P('gimkit', '').ok || P('gimkit', '   ').ok) fail('an empty box was accepted');
  if (P('gimkit', '12').ok) fail('a two-digit code was accepted');

  const goodLinks = [
    ['gimkit', 'https://www.gimkit.com/join?gc=123456'],
    ['gimkit', 'https://www.gimkit.com/view/abc123'],
    ['kahoot', 'https://kahoot.it/challenge/123456'],
    ['blooket', 'https://play.blooket.com/play?x=1'],
    ['blooket', 'https://www.blooket.com/play/abc']
  ];
  for (const [site, link] of goodLinks) {
    const r = P(site, link);
    if (!r.ok || r.kind !== 'link') fail(`a real ${site} link was refused: ${link}`);
  }
  const upgraded = P('gimkit', 'http://www.gimkit.com/join?gc=1');
  if (!upgraded.ok || !upgraded.value.startsWith('https://')) fail('an http link was not upgraded to https');
  const bare = P('gimkit', 'www.gimkit.com/join?gc=1');
  if (!bare.ok || bare.kind !== 'link') fail('a link pasted without https:// was not understood');

  const bad = [
    ['gimkit', 'javascript:alert(1)', 'a javascript: link'],
    ['gimkit', 'https://gimkit.com.evil.example/join', 'a look-alike domain (gimkit.com.evil…)'],
    ['gimkit', 'https://evil.example/gimkit.com', 'another site with the name in the path'],
    ['gimkit', 'https://kahoot.it/challenge/1', 'another game site’s link in the Gimkit box'],
    ['kahoot', 'https://www.gimkit.com/join', 'a Gimkit link in the Kahoot box'],
    ['gimkit', 'https://user:pw@www.gimkit.com/join', 'a link with a sign-in inside it'],
    ['gimkit', 'data:text/html,<script>alert(1)</script>', 'a data: link'],
    ['gimkit', 'ftp://www.gimkit.com/x', 'an ftp link']
  ];
  for (const [site, text, what] of bad) if (P(site, text).ok) fail(`${what} was accepted`);

  // rotation, and agreement with the guide's table
  const week = { 1: 'kahoot', 2: 'blooket', 3: 'gimkit', 4: 'kahoot', 5: 'blooket' };
  const days = { '2026-09-28': 1, '2026-09-29': 2, '2026-09-30': 3, '2026-10-01': 4, '2026-10-02': 5 };
  for (const [day, wd] of Object.entries(days)) {
    if (gc.scheduledSiteFor(day) !== week[wd]) fail(`${day} should be ${week[wd]}, got ${gc.scheduledSiteFor(day)}`);
  }
  if (gc.scheduledSiteFor('2026-10-03') !== null || gc.scheduledSiteFor('2026-10-04') !== null) fail('a weekend has a scheduled game');
  const names = { Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5 };
  for (const d of guideData.GAME_WEEK) {
    if (gc.SITE_BY_WEEKDAY[names[d.day]] !== d.site.toLowerCase().replace('!', '')) fail(`the guide says ${d.day} is ${d.site} but the code box says ${gc.SITE_BY_WEEKDAY[names[d.day]]}`);
  }

  // an entry shows only on its own day
  const E = (site, raw, day, at) => gc.makeGameEntry(site, raw, day, at).entry;
  const map = {
    gimkit: E('gimkit', '123456', '2026-09-30', '2026-09-30T10:00:00.000Z'),
    kahoot: E('kahoot', '654321', '2026-10-01', '2026-10-01T10:00:00.000Z')
  };
  const thu = gc.entriesForDay(map, '2026-10-01');
  if (thu.length !== 1 || thu[0].site !== 'kahoot') fail('Thursday showed something other than Thursday’s entry (yesterday’s code must not show)');
  if (gc.entriesForDay(map, '2026-10-02').length !== 0) fail('Friday showed an entry made for another day');
  const both = { ...map, gimkit: E('gimkit', '123456', '2026-10-01', '2026-10-01T10:00:00.000Z') };
  if (gc.entriesForDay(both, '2026-10-01')[0].site !== 'kahoot') fail('her scheduled site did not come first');
  if (gc.makeGameEntry('gimkit', '123456', 'not-a-day').ok) fail('an entry with no real day was accepted');

  // links go where they should
  if (gc.playUrl(E('gimkit', '123456', '2026-10-01')) !== 'https://www.gimkit.com/join') fail('a code’s button does not open the site’s join page');
  const lk = E('kahoot', 'https://kahoot.it/challenge/123456', '2026-10-01');
  if (gc.playUrl(lk) !== 'https://kahoot.it/challenge/123456') fail('a link’s button does not open the link');
  if (gc.displayCode('123456') !== '123 456') fail('a six-digit code is not shown in two groups');

  // pre-filled day
  if (gc.nextScheduledDay('gimkit', '2026-09-28') !== '2026-09-30') fail('Gimkit’s date from a Monday should be that Wednesday');
  if (gc.nextScheduledDay('gimkit', '2026-09-30') !== '2026-09-30') fail('on its own day the date should be today');
  if (gc.nextScheduledDay('kahoot', '2026-10-02') !== '2026-10-05') fail('Kahoot’s date from a Friday should be the next Monday');

  // merge
  const old = E('gimkit', '111111', '2026-10-07', '2026-10-01T09:00:00.000Z');
  const mid = E('gimkit', '222222', '2026-10-07', '2026-10-01T10:00:00.000Z');
  const neu = E('gimkit', '333333', '2026-10-07', '2026-10-01T11:00:00.000Z');
  if (gc.mergeGameEntries({ gimkit: mid }, { gimkit: neu }).gimkit.value !== '333333') fail('the newer entry did not win');
  if (gc.mergeGameEntries({ gimkit: mid }, { gimkit: old }).gimkit.value !== '222222') fail('an older entry overwrote a newer one');
  const hostile = { gimkit: { site: 'gimkit', kind: 'link', value: 'https://evil.example/x', forDay: '2026-10-07', setAt: '2031-01-01T00:00:00.000Z' } };
  if (gc.mergeGameEntries({ gimkit: mid }, hostile).gimkit.value !== '222222') fail('a hostile entry beat a real one by claiming to be newer');
  if (gc.mergeGameEntries({}, hostile).gimkit) fail('a hostile entry was kept on a computer that had nothing');
  if (gc.countNewEntries({ gimkit: mid }, { gimkit: mid }) !== 0) fail('an identical entry was counted as new');
  if (gc.countNewEntries({}, { gimkit: mid }) !== 1) fail('a new entry was not counted');
  return out;
}

// ---- 2. A REAL TRADE ----
let school = 0;
async function trade(ctx) {
  const out = [];
  const fail = (m) => out.push(m);
  const { db, guard, gc } = ctx;
  const run = school++;
  const LAPTOP = `gc-laptop-${run}`;
  const GIGI = `gc-gigi-${run}`;
  const on = async (who, fn) => {
    globalThis.__SCHOOL__ = who;
    return fn(db.openOwn());
  };
  const send = async (who) => {
    globalThis.__SCHOOL__ = who;
    return JSON.parse(JSON.stringify(await db.exportAll()));
  };
  const entries = (who) => on(who, async (d) => (await d.meta.get('gameEntries'))?.value || {});
  const E = (site, raw, day, at) => gc.makeGameEntry(site, raw, day, at).entry;
  const setMeta = (who, value) => on(who, (d) => d.meta.put({ key: 'gameEntries', value }));
  const importRaw = async (who, file) => {
    globalThis.__SCHOOL__ = who;
    await db.importBackup(file);
  };

  const i1 = { itemId: 'i1', strandId: 's1', at: 1790000000000, correct: true };
  const i9 = { itemId: 'i9', strandId: 's1', at: 1790090000000, correct: true };
  await on(LAPTOP, async (d) => {
    await d.meta.put({ key: 'learnerName', value: 'Azianna' });
    await d.answers.add(i1);
    await d.answers.add(i9); // her laptop has newer work than Gigi's computer
  });
  await on(GIGI, async (d) => {
    await d.meta.put({ key: 'learnerName', value: 'Azianna' });
    await d.answers.add(i1); // Gigi's computer has only the older work: the file adds NOTHING but the code
  });

  // 1. a code typed on Gigi's computer reaches her laptop, though the file is older
  await setMeta(GIGI, { gimkit: E('gimkit', '123 456', '2026-10-07', '2026-10-01T12:00:00.000Z') });
  const file1 = await send(GIGI);
  globalThis.__SCHOOL__ = LAPTOP;
  const preview = await db.previewImport(file1);
  const verdict = guard.importVerdict(preview);
  if (verdict.blocked) fail('a file whose only news is a game code was refused as "adds nothing"');
  if (preview.gameEntries?.new !== 1) fail(`the import preview does not count the game code (says ${preview.gameEntries?.new})`);
  if (!verdict.blocked) await importRaw(LAPTOP, file1);
  const e1 = await entries(LAPTOP);
  if (e1.gimkit?.value !== '123456' || e1.gimkit?.forDay !== '2026-10-07') fail('a code typed on Gigi’s computer did not reach her laptop');

  // 2. newer wins, older never overwrites
  await setMeta(GIGI, { gimkit: E('gimkit', '999999', '2026-10-07', '2026-10-01T09:00:00.000Z') });
  await importRaw(LAPTOP, await send(GIGI));
  if ((await entries(LAPTOP)).gimkit?.value !== '123456') fail('an older file overwrote the newer code on her laptop');
  await setMeta(GIGI, { gimkit: E('gimkit', '654 321', '2026-10-07', '2026-10-02T09:00:00.000Z'), kahoot: E('kahoot', 'https://kahoot.it/challenge/777777', '2026-10-08', '2026-10-02T09:00:00.000Z') });
  await importRaw(LAPTOP, await send(GIGI));
  const e2 = await entries(LAPTOP);
  if (e2.gimkit?.value !== '654321') fail('a newer code did not replace the older one on her laptop');
  if (e2.kahoot?.kind !== 'link') fail('a Kahoot link did not arrive alongside the Gimkit code');

  // 3. a hostile file plants nothing
  const hostileFile = await send(GIGI);
  const hostile = {
    gimkit: { site: 'gimkit', kind: 'link', value: 'https://evil.example/join', forDay: '2026-10-07', setAt: '2031-01-01T00:00:00.000Z' },
    kahoot: { site: 'kahoot', kind: 'link', value: 'javascript:alert(1)', forDay: '2026-10-08', setAt: '2031-01-01T00:00:00.000Z' },
    blooket: { site: 'blooket', kind: 'code', value: '<script>x</script>', forDay: '2026-10-09', setAt: '2031-01-01T00:00:00.000Z' }
  };
  hostileFile.meta = (hostileFile.meta || []).filter((m) => m.key !== 'gameEntries').concat([{ key: 'gameEntries', value: hostile }]);
  globalThis.__SCHOOL__ = LAPTOP;
  const hp = await db.previewImport(hostileFile);
  if (hp.gameEntries?.new !== 0) fail('a hostile file’s entries were counted as new');
  await importRaw(LAPTOP, hostileFile);
  const e3 = await entries(LAPTOP);
  if (e3.gimkit?.value !== '654321') fail('a hostile file replaced a real code');
  if (e3.kahoot?.value && e3.kahoot.value.startsWith('javascript')) fail('a javascript: link from a file was kept');
  if (e3.blooket) fail('an entry with markup in it was kept');
  return out;
}

// ---- 3. THE SCREENS ----
function sentencesIn(block) {
  // Words she reads sit in two places: plain JSX text, and quoted strings inside
  // {expressions} such as {cond ? 'one sentence.' : 'another.'}. Read both.
  const literals = [...block.matchAll(/'([^'\n]{3,})'/g)]
    .map((m) => m[1])
    .concat([...block.matchAll(/`([^`]*)`/g)].map((m) => m[1].replace(/\$\{[^}]*\}/g, ' X ')));
  const text = block
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    .replace(/<[^>]*>/g, '|')
    .replace(/\{[^{}]*\}/g, ' X ');
  return [...text.split('|'), ...literals]
    .flatMap((f) => f.split(/[.!?]/))
    .map((s) => s.replace(/\s+/g, ' ').trim())
    .filter((s) => /[A-Za-z]{3}/.test(s));
}

function screens(src) {
  const out = [];
  const fail = (m) => out.push(m);
  const { view, panel, tgp, store, parent } = src;

  if (!/import \{[^}]*\bentriesForDay\b[^}]*\} from '\.\.\/\.\.\/data\/games\/gameCodes\.js';/.test(view)) fail('her Play tab does not read today’s game from gameCodes.js');
  if (!/const today = dayKeyOf\(\);\s*const gameEntries = useAppStore\(\(s\) => s\.gameEntries\);\s*const todays = entriesForDay\(gameEntries, today\);/.test(view)) fail('her Play tab does not limit the game to today’s entries');
  const start = view.indexOf('{/* ---- YOUR GAME TODAY');
  const end = view.indexOf('{/* ---- WHAT IS LEFT');
  const block = start >= 0 && end > start ? view.slice(start, end) : '';
  if (!block) fail('her Play tab has no "Your game today" card');
  if (!/href=\{playUrl\(e\)\}/.test(block)) fail('her button does not come from playUrl');
  if (!/rel="noopener noreferrer"/.test(block) || !/target="_blank"/.test(block)) fail('her button opens the site without noopener');
  if (!/displayCode\(e\.value\)/.test(block)) fail('her card does not show the code');
  if (!/Today’s game is \{scheduled\.label\}/.test(block)) fail('with no code yet her card does not say which game is today');
  const sentences = sentencesIn(block);
  if (!sentences.some((s) => /Open it, then type your code/.test(s))) fail('the sentence reader found nothing to read in her card (the check itself is broken)');
  for (const s of sentences) if (s.split(' ').length > 11) fail(`a sentence on her card is longer than eleven words: "${s}"`);

  if (!/import \{ TodaysGamePanel \} from '\.\/TodaysGamePanel\.jsx';/.test(panel) || !/<TodaysGamePanel \/>/.test(panel)) fail('Gigi’s Review games screen does not show the code box');
  if (!/GAME_SITES\.map\(\(s\) => \(\s*<SiteRow key=\{s\.id\} site=\{s\} today=\{today\} \/>/.test(tgp)) fail('the code box is not one row per site');
  if (!/useState\(nextScheduledDay\(site\.id, today\)\)/.test(tgp)) fail('the code box does not pre-fill the day');
  if (!/type="date"/.test(tgp)) fail('the code box has no day picker');
  if (!/await save\(site\.id, text, day\)/.test(tgp) || !/setMsg\(\{ good: false, words: r\.reason \}\)/.test(tgp)) fail('the code box does not say why an entry was refused');

  if (!/const made = makeGameEntry\(siteId, raw, forDay\);\s*if \(!made\.ok\) return made;/.test(store)) fail('the store saves an entry without checking it');
  if ((store.match(/writeMeta\('gameEntries', next\)/g) || []).length !== 2) fail('the store does not save both saving and clearing');
  if (!/const gameEntries = cleanEntries\(await readMeta\('gameEntries', \{\}\)\);/.test(store)) fail('the store does not clean the entries it loads');
  if (!/^\s+gameEntries,$/m.test(store)) fail('the store does not put the loaded entries into state');
  if (!/gameEntries: 'Game codes'/.test(parent)) fail('the Load preview does not name Game codes');
  return out;
}

async function context(broken = {}) {
  const gcUrl = emit(SRC.gc, broken.gc);
  const gc = await import(gcUrl);
  const swaps = { "'../data/games/gameCodes.js'": `'${gcUrl}'` };
  const db = await loadModule(SRC.db, broken.db, swaps);
  const guard = await loadModule(SRC.guard, broken.guard);
  const panel = broken.panel ?? read(SRC.panel);
  const start = panel.indexOf('export const GAME_WEEK');
  const guideData = await loadModule(SRC.panel, panel.slice(start, panel.indexOf('const card =')));
  const src = {};
  for (const k of ['view', 'panel', 'tgp', 'store', 'parent']) src[k] = broken[k] ?? read(SRC[k]);
  return { gc, db, guard, guideData, src };
}

async function run(ctx) {
  return [...rules(ctx.gc, ctx.guideData), ...(await trade(ctx)), ...screens(ctx.src)];
}

const BUGS = [
  ['link host not checked', 'gc', 'if (!site.hosts.includes(url.hostname.toLowerCase())) {', 'if (false) {'],
  ['http not upgraded', 'gc', "if (url.protocol === 'http:') url.protocol = 'https:';", ''],
  ['sign-in inside a link allowed', 'gc', 'if (url.username || url.password) return', 'if (false) return'],
  ['spaces in a code not removed', 'gc', "const code = text.replace(/[\\s-]+/g, '');", 'const code = text;'],
  ['any day shows', 'gc', 'clean[id].forDay === dayKey', 'true'],
  ['older entry wins', 'gc', 'Date.parse(inn[id].setAt) > Date.parse(have[id].setAt)', 'Date.parse(inn[id].setAt) < Date.parse(have[id].setAt)'],
  ['incoming entries not cleaned', 'gc', 'const inn = cleanEntries(incoming);', 'const inn = incoming || {};'],
  ['stored entries not re-checked', 'gc', 'return again.ok && again.kind === entry.kind && again.value === entry.value;', 'return true;'],
  ['Wednesday is Kahoot', 'gc', "3: 'gimkit'", "3: 'kahoot'"],
  ['date never pre-fills ahead', 'gc', 'if (scheduledSiteFor(key) === siteId) return key;', 'return key;'],
  ['preview ignores game codes', 'db', 'new: countNewEntries(localGameEntries, incomingGameEntries)', 'new: 0'],
  ['import never merges the code', 'db', "await db.meta.put({ key: 'gameEntries', value: mergeGameEntries(local, metaIn.get('gameEntries')) });", ''],
  ['import takes the file as is', 'db', "value: mergeGameEntries(local, metaIn.get('gameEntries')) }", "value: metaIn.get('gameEntries') }"],
  ['Play tab shows every day', 'view', 'const todays = entriesForDay(gameEntries, today);', 'const todays = Object.values(gameEntries || {});'],
  ['button ignores playUrl', 'view', 'href={playUrl(e)}', 'href={e.value}'],
  ['a long sentence for her', 'view', 'It opens in a new tab.', 'It opens in a new tab, so when you are done with the game just close that tab and come back here.'],
  ['code box not on the screen', 'panel', '      <TodaysGamePanel />\n\n', ''],
  ['store saves without checking', 'store', 'if (!made.ok) return made;', ''],
  ['store trusts what it loads', 'store', "cleanEntries(await readMeta('gameEntries', {}))", "await readMeta('gameEntries', {})"],
  ['day not pre-filled', 'tgp', 'useState(nextScheduledDay(site.id, today))', 'useState(today)'],
  ['preview has no name for it', 'parent', "  journalMarks: 'Journal marks',\n  gameEntries: 'Game codes'\n};", "  journalMarks: 'Journal marks'\n};"]
];

const real = await run(await context());
if (!SELF_TEST) {
  if (real.length) {
    real.forEach((f) => console.log(`FAIL  ${f}`));
    process.exit(1);
  }
  console.log('Rules: codes and links read correctly; only a site’s own https link is taken; rotation matches the guide; an entry shows only on its day.');
  console.log('Two pretend computers: a code reaches her laptop even from an older file; newer wins; a hostile file plants nothing.');
  console.log('Screens: her Play tab shows today’s game in short sentences; Gigi’s box is on Review games.');
  console.log('NOT TESTED HERE: how the screens look, and that Gimkit, Kahoot or Blooket accept the code. Look at it in the browser.');
  console.log('PASS');
  process.exit(0);
}
if (real.length) {
  console.log('The real code fails, so the self-test means nothing. Fix these first:');
  real.forEach((f) => console.log(`  ${f}`));
  process.exit(1);
}
let missed = 0;
for (const [name, k, from, to] of BUGS) {
  const original = read(SRC[k]);
  if (!original.includes(from)) {
    console.log(`CANNOT  ${name}: the line to break is not in ${SRC[k]}`);
    missed++;
    continue;
  }
  const out = await run(await context({ [k]: original.replace(from, to) }));
  if (out.length) console.log(`caught  ${name}  →  ${out[0]}`);
  else {
    console.log(`MISSED  ${name}`);
    missed++;
  }
}
console.log(missed ? `\n${missed} of ${BUGS.length} bugs NOT caught.` : `\nAll ${BUGS.length} bugs caught.`);
process.exit(missed ? 1 : 0);
