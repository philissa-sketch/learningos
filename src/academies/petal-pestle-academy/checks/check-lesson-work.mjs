// ---------------------------------------------------------------------------
// check-lesson-work — a lesson keeps her work (Oct 2 2026).
//
//     node src/academies/petal-pestle-academy/checks/check-lesson-work.mjs
//     node src/academies/petal-pestle-academy/checks/check-lesson-work.mjs --self-test
//
// Gigi: "The lessons (ex. Herbalism) don't save the work. If she leaves the
// lesson, or completes it and goes back, the work isn't saved."
//
// ASSERTS
//  1. THE RULES (lib/lessonWork.js): a pick is kept by its words and comes back
//     as the right choice even when the choices are dealt in another order; the
//     first answer is locked; a repeat tap changes nothing; hostile or broken
//     saved data is cleaned; a lesson finished before this existed has its Quick
//     check rebuilt from the item events (latest wins, other evidence ignored).
//  2. EVERY REAL LESSON can be saved: its check prompts, choices and "Try it now"
//     prompts are unique, so two different questions never share one saved pick.
//  3. THE BACKUP: her lesson work stays on that computer — it is not exported and
//     a file that carries it plants nothing.
//  4. THE SCREENS (read as source): every tap goes through the saver; reopening
//     does not clear; the warm-up questions are frozen; reading again does not
//     record the Quick check a second time; restoring never calls the Gradebook.
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
  lw: 'lib/lessonWork.js',
  db: 'db/db.js',
  store: 'store/useAppStore.js',
  reader: 'components/Lessons/LessonReader.jsx'
};
const read = (rel) => readFileSync(join(ROOT, rel), 'utf8');

await import(pathToFileURL(join(REPO, 'node_modules/fake-indexeddb/auto/index.mjs')).href);
globalThis.window = globalThis;
globalThis.dispatchEvent = () => true;
const DEXIE = pathToFileURL(join(REPO, 'node_modules/dexie/dist/dexie.mjs')).href;

let tmp = null;
let n = 0;
function emit(rel, source, swaps = {}) {
  tmp = tmp || mkdtempSync(join(tmpdir(), 'pp-lessonwork-'));
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
function rules(lw) {
  const out = [];
  const fail = (m) => out.push(m);
  const lesson = {
    id: 'L1',
    check: [
      { prompt: 'Which part is the root?', choices: ['leaf', 'root', 'stem'], answer: 1 },
      { prompt: 'When do you harvest?', choices: ['night', 'morning', 'winter'], answer: 1 }
    ]
  };

  let w = lw.emptyWork();
  w = lw.recordPick(w, 'check', 'Which part is the root?', 'stem');
  const again = lw.recordPick(w, 'check', 'Which part is the root?', 'root');
  if (again !== w) fail('a second tap on a question changed her answer (the first answer must stand)');
  if (lw.restoreCheck(lesson, w)[0] !== 2) fail('her Quick check answer did not come back as the choice she picked');
  if (lw.restoreCheck(lesson, w)[1] !== undefined) fail('a question she never answered came back answered');
  // choices re-dealt in another order
  const reshuffled = { ...lesson, check: [{ ...lesson.check[0], choices: ['stem', 'leaf', 'root'] }, lesson.check[1]] };
  if (lw.restoreCheck(reshuffled, w)[0] !== 0) fail('a pick was restored by position instead of by its words');

  // extra round dealt in a different order each day
  const x = lw.recordPick(lw.emptyWork(), 'extra', 'q-7', 'beta');
  const dayA = [{ id: 'q-3', choices: ['a', 'b'] }, { id: 'q-7', choices: ['alpha', 'beta', 'gamma'] }];
  const dayB = [{ id: 'q-7', choices: ['gamma', 'alpha', 'beta'] }, { id: 'q-3', choices: ['b', 'a'] }];
  if (lw.restoreExtra(dayA, x)[1] !== 1) fail('extra practice was not restored on the same day');
  if (lw.restoreExtra(dayB, x)[0] !== 2 || Object.keys(lw.restoreExtra(dayB, x)).length !== 1) fail('extra practice was not matched to the right question after a re-deal');

  // warm-up and apply
  let m = lw.setWarmIds(lw.emptyWork(), ['a-1', 'a-2']);
  if (lw.setWarmIds(m, ['z-9']) !== m) fail('the warm-up questions were replaced after they were dealt');
  if (lw.setWarmIds(lw.emptyWork(), []).warmIds) fail('an empty warm-up was frozen');
  m = lw.recordPick(m, 'warm', 'a-2', 'yes');
  if (lw.restoreWarm([{ id: 'a-1', choices: ['no', 'yes'] }, { id: 'a-2', choices: ['no', 'yes'] }], m)['a-2'] !== 1) fail('a warm-up answer did not come back');
  const ap = lw.recordPick(lw.emptyWork(), 'apply', 'Try: which?', 'two');
  if (lw.restoreApply({ prompt: 'Try: which?', choices: ['one', 'two'] }, ap) !== 1) fail('a "Try it now" answer did not come back');
  if (lw.restoreApply({ prompt: 'Other?', choices: ['one', 'two'] }, ap) !== null) fail('a "Try it now" answer showed on the wrong question');

  // flags and bad input
  const f = lw.setFlag(lw.emptyWork(), 'extraOpen', true);
  if (!f.extraOpen) fail('the extra-practice flag was not saved');
  if (lw.setFlag(f, 'extraOpen', true) !== f) fail('setting a flag to what it already is made a new save');
  if (lw.setFlag(f, 'nonsense', true) !== f) fail('an unknown flag was accepted');
  const base = lw.emptyWork();
  if (lw.recordPick(base, 'nonsense', 'k', 'v') !== base) fail('an unknown bucket was accepted');
  if (lw.recordPick(base, 'check', '', 'v') !== base || lw.recordPick(base, 'check', 'k', 5) !== base) fail('an empty key or non-text pick was accepted');

  // hostile / broken saved data
  const dirty = lw.cleanAllWork({
    L1: { check: { ok: 'yes', bad: 7, long: 'x'.repeat(5000), '': 'e' }, extra: [1, 2], warmIds: [1, 2], warmDone: 'yes', extraOpen: 1 },
    '': { check: {} },
    L2: 'junk'
  });
  if (!dirty.L1 || dirty.L1.check.ok !== 'yes') fail('good saved work was thrown away while cleaning');
  else {
    if (dirty.L1.check.bad !== undefined || dirty.L1.check.long !== undefined || dirty.L1.check[''] !== undefined) fail('broken picks survived cleaning');
    if (Array.isArray(dirty.L1.extra) || Object.keys(dirty.L1.extra).length) fail('an array was kept as a set of picks');
    if (dirty.L1.warmIds) fail('non-text warm-up ids survived cleaning');
    if (dirty.L1.warmDone !== false || dirty.L1.extraOpen !== false) fail('a non-true flag was treated as true');
  }
  if (dirty['']) fail('work with no lesson id was kept');
  if (Object.keys(lw.cleanAllWork(null)).length || Object.keys(lw.cleanAllWork([1])).length) fail('cleaning null or an array did not give an empty map');

  // a lesson finished before work was kept: rebuild from the record
  const ev = (q, chosen, at, extra = {}) => ({ questionId: q, lessonId: 'L1', evidenceSource: 'instruction', chosen, at, ...extra });
  const rebuilt = lw.checkFromEvents(lesson, [
    ev('L1-check-1', 0, '2026-09-01T00:00:00Z'),
    ev('L1-check-1', 2, '2026-09-20T00:00:00Z'),
    ev('L1-check-2', 1, '2026-09-20T00:00:00Z'),
    ev('L1-check-2', 0, '2026-10-30T00:00:00Z', { evidenceSource: 'practice' }),
    ev('L1-check-2', 0, '2026-10-30T00:00:00Z', { lessonId: 'OTHER' })
  ]);
  if (rebuilt[0] !== 2) fail('the rebuilt answer is not the LATEST one she gave');
  if (rebuilt[1] !== 1) fail('practice or another lesson’s record overrode her Quick check answer');
  if (lw.checkFromEvents(lesson, [ev('L1-check-1', 9, 'z')])[0] !== undefined) fail('a choice that is not on the question was rebuilt');
  if (lw.checkFromEvents(lesson, [ev('L1-check-1', null, 'z')])[0] !== undefined) fail('a skipped question was rebuilt as answered');
  if (Object.keys(lw.checkFromEvents(lesson, null)).length) fail('missing events did not give an empty result');
  const mg = lw.mergeCheck({ 0: 1 }, { 0: 2, 1: 0 });
  if (mg[0] !== 1 || mg[1] !== 0) fail('a rebuilt answer overrode one she saved, or did not fill a gap');
  return out;
}

// ---- 2. EVERY REAL LESSON ----
function lessons(all) {
  const out = [];
  const fail = (m) => out.push(m);
  if (!all.length) fail('no lessons were found to check');
  for (const l of all) {
    const prompts = new Set();
    for (const c of l.check || []) {
      if (!c.prompt || prompts.has(c.prompt)) fail(`${l.id}: two Quick check questions share a prompt (${c.prompt || 'empty'})`);
      prompts.add(c.prompt);
      const ch = c.choices || [];
      if (new Set(ch).size !== ch.length || ch.some((x) => typeof x !== 'string' || !x)) fail(`${l.id}: a Quick check has repeated or empty choices`);
    }
    const apply = new Set();
    for (const b of l.beats || []) {
      if (!b.applyIt) continue;
      const q = b.applyIt;
      if (!q.prompt || apply.has(q.prompt)) fail(`${l.id}: two "Try it now" questions share a prompt`);
      apply.add(q.prompt);
      if (new Set(q.choices).size !== q.choices.length) fail(`${l.id}: a "Try it now" has repeated choices`);
    }
  }
  return out;
}

// ---- 3. THE BACKUP ----
let school = 0;
async function backup(db) {
  const out = [];
  const fail = (m) => out.push(m);
  const run = school++;
  const A = `lw-a-${run}`;
  const B = `lw-b-${run}`;
  const on = async (who, fn) => {
    globalThis.__SCHOOL__ = who;
    return fn(db.openOwn());
  };
  await on(A, async (d) => {
    await d.meta.put({ key: 'learnerName', value: 'Azianna' });
    await d.meta.put({ key: 'lessonWork', value: { L1: { check: { p: 'a' } } } });
  });
  globalThis.__SCHOOL__ = A;
  const file = JSON.parse(JSON.stringify(await db.exportAll()));
  if ((file.meta || []).some((m) => m.key === 'lessonWork')) fail('her lesson work was put in the backup file');
  // a file that carries it anyway plants nothing
  await on(B, (d) => d.meta.put({ key: 'learnerName', value: 'Azianna' }));
  file.meta = (file.meta || []).concat([{ key: 'lessonWork', value: { L9: { check: { p: 'planted' } } } }]);
  globalThis.__SCHOOL__ = B;
  try {
    await db.importBackup(file);
  } catch {
    /* a refusal is also fine: nothing is planted */
  }
  const got = await on(B, async (d) => (await d.meta.get('lessonWork'))?.value);
  if (got) fail('a file could plant lesson work on a computer');
  return out;
}

// ---- 4. THE SCREENS ----
function screens(src) {
  const out = [];
  const fail = (m) => out.push(m);
  const { reader, store } = src;

  if (!/import \{[^}]*\bcheckFromEvents\b[^}]*\} from '\.\.\/\.\.\/lib\/lessonWork\.js';/.test(reader)) fail('the lesson screen does not use lessonWork.js');
  if (!/pick\('check', c\.prompt, choice\)/.test(reader)) fail('a Quick check tap is not saved');
  if (!/pick\('extra', q\.id, q\.choices\[choiceIndex\]\)/.test(reader)) fail('an extra-practice tap is not saved');
  if (!/flag\('extraOpen', true\)/.test(reader)) fail('opening the extra practice is not saved');
  if (!/pick\('apply', q\.prompt, q\.choices\[i\]\)/.test(reader)) fail('a "Try it now" tap is not saved');
  if (!/pick\('warm', q\.id, q\.choices\[i\]\)/.test(reader)) fail('a warm-up tap is not saved');
  if (!/flag\('warmDone', true\);\s*await recordReview/.test(reader)) fail('finishing the warm-up is not saved');
  if (!/const ids = work\.warmIds \|\| liveIds;/.test(reader) || !/freezeWarm\(liveIds\)/.test(reader)) fail('the warm-up questions are not kept the same when she returns');
  if (!/alreadyRead \? checkFromEvents\(lesson, itemEvents\) : \{\}/.test(reader)) fail('a lesson finished earlier does not get its Quick check rebuilt');
  if (/setAnswers|setExtraAnswers|setExtraOpen|setPicked|setDone/.test(reader)) fail('some answers still live only in screen memory');
  const eff = reader.match(/useEffect\(\(\) => \{\s*stopSpeaking\(\);[\s\S]*?\[lesson\?\.id\]\);/);
  if (!eff) fail('the lesson-change effect is missing');
  else if (/setAnswers|work|clear|empty/i.test(eff[0])) fail('opening a lesson clears her work');
  if (!/if \(!alreadyRead\) \{\s*await recordItemEvents\(/.test(reader)) fail('reading a lesson again records the Quick check a second time');
  if (!/await markLessonRead\(lesson\.id,/.test(reader)) fail('finishing no longer records the lesson as read');
  // restoring must never touch the Gradebook
  const hook = reader.slice(reader.indexOf('function useLessonWork'), reader.indexOf('const EMPTY_WORK'));
  if (!hook.includes('saveLessonWork')) fail('the lesson-work hook is missing');
  if (/markLessonRead|recordReview|recordItemEvents/.test(hook)) fail('saving her taps writes to the Gradebook');
  if (!/disabled=\{settled\}\s*onClick=\{\(\) => pick\('check'/.test(reader)) fail('a picked Quick check answer can be changed (no lock on the buttons)');
  if (!/disabled=\{reveal\}\s*onClick=\{\(\) => pick\('apply'/.test(reader)) fail('a picked "Try it now" answer can be changed (no lock on the buttons)');
  if (!/disabled=\{reveal\}\s*onClick=\{\(\) => choose\(q, i\)\}/.test(reader)) fail('a picked warm-up answer can be changed (no lock on the buttons)');

  if (!/import \{ cleanAllWork, cleanWork \} from '\.\.\/lib\/lessonWork\.js';/.test(store)) fail('the store does not use lessonWork.js');
  if (!/const lessonWork = cleanAllWork\(await readMeta\('lessonWork', \{\}\)\);/.test(store)) fail('the store does not clean the lesson work it loads');
  if (!/^\s+lessonWork,$/m.test(store)) fail('the store does not put the loaded lesson work into state');
  if (!/set\(\{ lessonWork: next \}\);\s*try \{ await writeMeta\('lessonWork', next\); \}/.test(store)) fail('the store does not write her lesson work to the database');
  return out;
}

async function context(broken = {}) {
  const lw = await loadModule(SRC.lw, broken.lw);
  const db = await loadModule(SRC.db, broken.db);
  const courses = await loadModule('data/lessons/appCourses.js');
  const src = {};
  for (const k of ['reader', 'store']) src[k] = broken[k] ?? read(SRC[k]);
  return { lw, db, all: courses.ALL_LESSONS, src };
}

async function run(ctx) {
  return [...rules(ctx.lw), ...lessons(ctx.all), ...(await backup(ctx.db)), ...screens(ctx.src)];
}

const BUGS = [
  ['first answer not locked', 'lw', 'if (work[bucket]?.[key] !== undefined) return work;', ''],
  ['restored by position', 'lw', 'const i = (choices || []).indexOf(text);', 'const i = 0;'],
  ['earliest rebuilt answer wins', 'lw', 'String(e.at) >= String(best.at)', 'String(e.at) <= String(best.at)'],
  ['practice evidence rebuilt as Quick check', 'lw', " || e.evidenceSource !== 'instruction') continue;", ') continue;'],
  ['choice off the question rebuilt', 'lw', ' || e.chosen >= (c.choices || []).length', ''],
  ['rebuilt overrides saved', 'lw', 'return { ...(rebuilt || {}), ...(saved || {}) };', 'return { ...(saved || {}), ...(rebuilt || {}) };'],
  ['saved picks not cleaned', 'lw', 'w[b] = cleanPicks(raw[b]);', 'w[b] = raw[b] || {};'],
  ['unknown bucket accepted', 'lw', '!BUCKETS.includes(bucket) || ', ''],
  ['warm-up replaced after dealt', 'lw', 'if (work.warmIds || !Array.isArray(ids)', 'if (!Array.isArray(ids)'],
  ['flag trusted as truthy', 'lw', 'w.warmDone = raw.warmDone === true;', 'w.warmDone = !!raw.warmDone;'],
  ['lesson work put in the backup', 'db', " && m.key !== 'lessonWork'", ''],
  ['store never writes her work', 'store', "try { await writeMeta('lessonWork', next); }", 'try { await Promise.resolve(next); }'],
  ['store trusts what it loads', 'store', "cleanAllWork(await readMeta('lessonWork', {}))", "(await readMeta('lessonWork', {}))"],
  ['Quick check tap not saved', 'reader', "pick('check', c.prompt, choice)", 'void 0'],
  ['extra practice tap not saved', 'reader', "pick('extra', q.id, q.choices[choiceIndex]);", ''],
  ['Try it now tap not saved', 'reader', "pick('apply', q.prompt, q.choices[i])", 'void 0'],
  ['warm-up tap not saved', 'reader', "pick('warm', q.id, q.choices[i]);", ''],
  ['warm-up questions not kept', 'reader', 'const ids = work.warmIds || liveIds;', 'const ids = liveIds;'],
  ['warm-up finish not saved', 'reader', "flag('warmDone', true);", ''],
  ['finished lesson not rebuilt', 'reader', 'alreadyRead ? checkFromEvents(lesson, itemEvents) : {}', '{}'],
  ['reading again records twice', 'reader', 'if (!alreadyRead) {\n      await recordItemEvents(', 'if (true) {\n      await recordItemEvents('],
  ['Quick check answers can be changed', 'reader', 'disabled={settled}\n                        onClick={() => pick(', 'disabled={false}\n                        onClick={() => pick('],
  ['Try it now answers can be changed', 'reader', "disabled={reveal}\n              onClick={() => pick('apply'", "disabled={false}\n              onClick={() => pick('apply'"],
  ['warm-up answers can be changed', 'reader', 'disabled={reveal}\n                  onClick={() => choose(q, i)}', 'disabled={false}\n                  onClick={() => choose(q, i)}'],
  ['saving writes to the Gradebook', 'reader', 'const save = useAppStore((s) => s.saveLessonWork);', 'const save = useAppStore((s) => s.saveLessonWork); const x = markLessonRead;']
];

const real = await run(await context());
if (!SELF_TEST) {
  if (real.length) {
    real.forEach((f) => console.log(`FAIL  ${f}`));
    process.exit(1);
  }
  console.log('Rules: picks kept by their words, locked once made, restored after a re-deal; broken saves cleaned; old finished lessons rebuilt from the record.');
  console.log('Every real lesson can be saved without two questions sharing one answer.');
  console.log('Backup: her lesson work stays on that computer and a file cannot plant any.');
  console.log('Screens: every tap is saved; reopening does not clear; reading again does not record twice.');
  console.log('NOT TESTED HERE: how it looks and behaves in the browser. Open a lesson, answer, leave, come back.');
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
