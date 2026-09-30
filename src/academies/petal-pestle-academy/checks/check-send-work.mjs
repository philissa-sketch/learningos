// ---------------------------------------------------------------------------
// check-send-work — she sends her work to Gigi, and loads back what Gigi sends
// (Sept 29 2026).
//
// Run from the learningos folder:
//     node src/academies/petal-pestle-academy/checks/check-send-work.mjs
//     node src/academies/petal-pestle-academy/checks/check-send-work.mjs --self-test
//
// ---- WHY THIS EXISTS ----
// Gigi: "can you add the export/import to her day so she can send me her work
// like on Lamar's." Saving and loading lived only behind the Grown-Up Corner
// passcode. And the loader on screen there since Sept 23 only ADDED rows, so a
// daily trade would have lost every edit: a draft she kept writing, a lesson
// read again, a note she read.
//
// ---- WHAT IT ASSERTS ----
//  1. A REAL TRADE, BOTH WAYS — two pretend computers (her laptop and Gigi's)
//     in a test database, trading files through the real exportAll /
//     previewImport / importVerdict / importBackup:
//       · day 1 her work reaches Gigi;
//       · day 2 her EDITS reach Gigi (draft longer, lesson read twice, a
//         review question seen more), not only new rows;
//       · Gigi's note and grade reach her laptop, and nothing of hers goes
//         backwards;
//       · no table ever has fewer rows after a load;
//       · an old file that adds nothing is refused;
//       · the file never carries the grown-up passcode.
//  2. HER CARD — on her Today; Send uses exportAll; Load uses the MERGE
//     (db/db.js), never the add-only loader; a blocked file is refused with
//     no way around it; the screen re-reads her records after a load.
//  3. GIGI'S SIDE — the Grown-Up Corner's Load tab shows "Bring her daily work
//     onto this computer" (the merge) again, and Settings points to it by its
//     real name.
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
  db: 'db/db.js',
  guard: 'lib/importGuard.js',
  card: 'components/Schedule/SendWorkCard.jsx',
  today: 'components/Schedule/TodayView.jsx',
  parent: 'components/Parent/ParentDashboard.jsx'
};
const read = (rel) => readFileSync(join(ROOT, rel), 'utf8');

// A test database in memory. Nothing here touches her real records.
await import(pathToFileURL(join(REPO, 'node_modules/fake-indexeddb/auto/index.mjs')).href);
globalThis.window = globalThis;
globalThis.dispatchEvent = () => true;
const DEXIE = pathToFileURL(join(REPO, 'node_modules/dexie/dist/dexie.mjs')).href;

let tmp = null;
let n = 0;
/** Load a school module from a temp copy, with the school id supplied by the test. */
async function loadModule(rel, source, swaps = {}) {
  tmp = tmp || mkdtempSync(join(tmpdir(), 'pp-send-'));
  const dir = dirname(join(ROOT, rel));
  let fixed = (source ?? read(rel))
    .replace(/import \{ loadedAcademyId \} from '[^']+';/, 'const loadedAcademyId = () => globalThis.__SCHOOL__;')
    .replace("from 'dexie'", `from '${DEXIE}'`);
  for (const [from, to] of Object.entries(swaps)) fixed = fixed.split(from).join(to);
  fixed = fixed.replace(/from\s+'(\.{1,2}\/[^']+)'/g, (_, p) => `from '${pathToFileURL(resolve(dir, p)).href}'`);
  const file = join(tmp, `m${n++}.mjs`);
  writeFileSync(file, fixed);
  return import(pathToFileURL(file).href);
}

let school = 0;
async function trade(ctx) {
  const out = [];
  const fail = (m) => out.push(m);
  const { db, guard } = ctx;
  const run = school++;
  const LAPTOP = `test-laptop-${run}`;
  const GIGI = `test-gigi-${run}`;
  const on = async (who, fn) => {
    globalThis.__SCHOOL__ = who;
    return fn(db.openOwn());
  };
  const counts = (who) => on(who, async (d) => Object.fromEntries(await Promise.all(Object.keys(db.HER_TABLES).map(async (t) => [t, await d.table(t).count()]))));
  // The path her card and Gigi's panel both take.
  const load = async (who, file) => {
    globalThis.__SCHOOL__ = who;
    const before = await counts(who);
    globalThis.__SCHOOL__ = who;
    const preview = await db.previewImport(file);
    const verdict = guard.importVerdict(preview);
    if (!verdict.blocked) {
      globalThis.__SCHOOL__ = who;
      await db.importBackup(file);
    }
    const after = await counts(who);
    for (const t of Object.keys(before)) if (after[t] < before[t]) fail(`loading on ${who.split('-')[1]} dropped ${before[t] - after[t]} ${t} row(s)`);
    return verdict;
  };
  const send = async (who) => {
    globalThis.__SCHOOL__ = who;
    return JSON.parse(JSON.stringify(await db.exportAll()));
  };

  // Day 1, her laptop.
  await on(LAPTOP, async (d) => {
    await d.meta.put({ key: 'parentPasscode', value: '1234' });
    await d.meta.put({ key: 'learnerName', value: 'Azianna' });
    await d.answers.add({ itemId: 'i1', strandId: 's1', at: 1790000000000, correct: true });
    await d.attempts.put({ attemptId: 'a1', testId: 't1', dayKey: '2026-09-28', at: '2026-09-28T15:00:00Z', percent: 60 });
    await d.lessonReads.put({ lessonId: 'l1', firstReadAt: '2026-09-28T14:00:00Z', lastReadAt: '2026-09-28T14:00:00Z', reads: 1 });
    await d.writingDrafts.put({ slotId: 'book-report-q1', draft: 'Once there was', steps: [1], updatedAt: '2026-09-28T14:10:00Z' });
    await d.reviewItems.put({ questionId: 'q1', box: 1, dueOn: '2026-09-29', lastSeen: '2026-09-28', seen: 1, missed: 0 });
  });
  const day1 = await send(LAPTOP);
  if ((day1.meta || []).some((m) => m.key === 'parentPasscode')) fail('her work file carries the grown-up passcode');
  await load(GIGI, day1);
  const g1 = await on(GIGI, async (d) => ({ a: await d.attempts.get('a1'), l: await d.lessonReads.get('l1') }));
  if (!g1.a || !g1.l) fail('day 1: her work did not reach Gigi’s computer');

  // Day 2, her laptop: she keeps going. These are EDITS to rows that exist.
  await on(LAPTOP, async (d) => {
    await d.answers.add({ itemId: 'i2', strandId: 's1', at: 1790090000000, correct: false });
    await d.attempts.put({ attemptId: 'a2', testId: 't2', dayKey: '2026-09-29', at: '2026-09-29T15:00:00Z', percent: 80 });
    await d.lessonReads.put({ lessonId: 'l1', firstReadAt: '2026-09-28T14:00:00Z', lastReadAt: '2026-09-29T14:00:00Z', reads: 2 });
    await d.writingDrafts.put({ slotId: 'book-report-q1', draft: 'Once there was a girl who grew mint.', steps: [1, 2], updatedAt: '2026-09-29T14:10:00Z' });
    await d.reviewItems.put({ questionId: 'q1', box: 1, dueOn: '2026-09-30', lastSeen: '2026-09-29', seen: 3, missed: 1 });
  });
  const day2 = await send(LAPTOP);
  const v2 = await load(GIGI, day2);
  if (v2.blocked) fail(`day 2: Gigi’s computer refused her newer work (${v2.headline})`);
  const g2 = await on(GIGI, async (d) => ({
    a2: await d.attempts.get('a2'),
    l: await d.lessonReads.get('l1'),
    w: await d.writingDrafts.get('book-report-q1'),
    r: await d.reviewItems.get('q1')
  }));
  if (!g2.a2) fail('day 2: her new test did not reach Gigi');
  if (g2.l?.reads !== 2) fail(`day 2: a lesson she read again did not update on Gigi’s computer (reads ${g2.l?.reads})`);
  if (!String(g2.w?.draft || '').includes('grew mint') || !(g2.w?.steps || []).includes(2)) fail('day 2: the draft she kept writing did not update on Gigi’s computer');
  if (g2.r?.seen !== 3) fail(`day 2: a review question she saw again did not update on Gigi’s computer (seen ${g2.r?.seen})`);

  // Gigi writes back: a note and a grade.
  await on(GIGI, async (d) => {
    await d.messages.put({ messageId: 'm1', from: 'gigi', at: '2026-09-29T20:00:00Z', text: 'Proud of you!', readAt: null });
    await d.khanGrades.put({ gradeId: 'k1', subject: 'math', courseId: 'math2', kind: 'unit', unitN: 4, grade: 'B', percent: 84, at: '2026-09-29' });
  });
  const back = await send(GIGI);
  // Meanwhile she keeps working on her laptop, so Gigi's file is OLDER than her work.
  await on(LAPTOP, async (d) => {
    await d.writingDrafts.put({ slotId: 'book-report-q1', draft: 'Once there was a girl who grew mint. She sold it at the market.', steps: [1, 2, 3], updatedAt: '2026-09-30T14:10:00Z' });
    await d.lessonReads.put({ lessonId: 'l1', firstReadAt: '2026-09-28T14:00:00Z', lastReadAt: '2026-09-30T14:00:00Z', reads: 3 });
  });
  const vb = await load(LAPTOP, back);
  if (vb.blocked) fail(`Gigi’s file with a new note was refused on her laptop (${vb.headline})`);
  const l3 = await on(LAPTOP, async (d) => ({
    m: await d.messages.get('m1'),
    k: await d.khanGrades.get('k1'),
    w: await d.writingDrafts.get('book-report-q1'),
    l: await d.lessonReads.get('l1'),
    pass: await d.meta.get('parentPasscode')
  }));
  if (!l3.m) fail('Gigi’s note did not reach her laptop');
  if (!l3.k) fail('Gigi’s grade did not reach her laptop');
  if (!String(l3.w?.draft || '').includes('sold it at the market') || !(l3.w?.steps || []).includes(3)) fail('loading Gigi’s older file set her draft back');
  if (l3.l?.reads !== 3) fail(`loading Gigi’s older file set her lesson back (reads ${l3.l?.reads})`);
  if (l3.pass?.value !== '1234') fail('loading a file changed her laptop’s grown-up passcode');

  // An old file that adds nothing is refused.
  const vOld = await load(LAPTOP, day1);
  if (!vOld.blocked) fail('an old file that adds nothing was not refused');
  return out;
}

function screens(ctx) {
  const out = [];
  const fail = (m) => out.push(m);
  const { card, today, parent } = ctx.src;
  if (!/import \{ SendWorkCard \} from '\.\/SendWorkCard\.jsx';/.test(today) || !/<SendWorkCard \/>/.test(today)) fail('her Today has no Send your work card');
  const fromDb = (card.match(/import \{([^}]*)\} from '\.\.\/\.\.\/db\/db\.js';/) || [])[1] || '';
  for (const fn of ['exportAll', 'previewImport', 'importBackup']) if (!new RegExp(`\\b${fn}\\b`).test(fromDb)) fail(`her card does not use ${fn} from db/db.js (the Grown-Up Corner’s own path)`);
  if (/import \{[^}]*\bimportBackup\b[^}]*\} from '\.\.\/\.\.\/db\/herRecords\.js'/.test(card)) fail('her card uses the add-only loader, so her edits would never cross');
  const loadFn = (card.match(/async function load\(e\) \{[\s\S]*?\n  \}\n/) || [''])[0];
  if (!/const verdict = importVerdict\(preview\);\s*if \(verdict\.blocked\) \{[^}]*setResult\(\{ ok: false/.test(loadFn)) fail('her card does not refuse a file the guard blocks');
  if (/agreed|confirm\(/i.test(loadFn)) fail('her card offers a way to load around the guard');
  const elseBranch = (loadFn.match(/\} else \{([\s\S]*?)\n      \}/) || [])[1] || '';
  if (!/await importBackup\(data\);\s*await hydrate\(\);/.test(elseBranch)) fail('her card does not re-read her records after loading (the screens would show the old ones)');
  if (!/async function send\(\) \{[\s\S]*?download\(await exportAll\(\), name\)/.test(card)) fail('Send does not save her whole record');
  if (!/\{tab === 'import' && \(\s*<div className="space-y-5">\s*<ImportPanel \/>/.test(parent)) fail('the Grown-Up Corner Load tab does not show "Bring her daily work onto this computer"');
  if (!/Bring her daily work onto this computer<\/h2>/.test(parent)) fail('the Load tab panel lost its heading');
  if (!/<span className="font-700">Bring her daily work onto this computer<\/span>, on the Load tab/.test(parent)) fail('Settings sends Gigi to a panel by a name it does not have');
  if (!/Send my work to Gigi/.test(parent) || !/Load what Gigi sent/.test(parent)) fail('the Grown-Up Corner steps do not name her two buttons');
  return out;
}

async function context(broken = {}) {
  const src = {};
  for (const [k, rel] of Object.entries(SRC)) src[k] = broken[k] ?? read(rel);
  const db = await loadModule(SRC.db, broken.db);
  const guard = await loadModule(SRC.guard, broken.guard);
  return { src, db, guard };
}

async function run(ctx) {
  return [...(await trade(ctx)), ...screens(ctx)];
}

const BUGS = [
  ['the add-only loader (edits lost)', 'db', "      for (const lr of data.lessonReads || []) {\n        const local = await db.lessonReads.get(lr.lessonId);\n        await db.lessonReads.put(pickLessonRead(local, lr));", "      for (const lr of data.lessonReads || []) {\n        const local = await db.lessonReads.get(lr.lessonId);\n        if (!local) await db.lessonReads.put(lr);"],
  ['drafts never update', 'db', 'await db.writingDrafts.put(pickWritingDraft(local, w));', 'if (!local) await db.writingDrafts.put(w);'],
  ['review questions never update', 'db', 'await db.reviewItems.put(pickReviewItem(local, ri));', 'if (!local) await db.reviewItems.put(ri);'],
  ['Gigi’s notes never arrive', 'db', 'if (keep !== local) await db.messages.put(keep);', 'if (keep !== local && local) await db.messages.put(keep);'],
  ['the passcode travels', 'db', "const safeMeta = meta.filter((m) => m.key !== 'parentPasscode');", 'const safeMeta = meta;'],
  ['an incoming file overwrites newer work', 'db', 'await db.writingDrafts.put(pickWritingDraft(local, w));', 'await db.writingDrafts.put(w);'],
  ['stale files let through', 'guard', 'const blocked = stale || protectsWork;', 'const blocked = protectsWork;'],
  ['no card on her Today', 'today', '<SendWorkCard />', ''],
  ['card uses the add-only loader', 'card', "import { exportAll, previewImport, importBackup } from '../../db/db.js';", "import { exportAll, previewImport } from '../../db/db.js';\nimport { importBackup } from '../../db/herRecords.js';"],
  ['card loads around the guard', 'card', 'if (verdict.blocked) {', 'if (false) {'],
  ['card forgets to re-read her records', 'card', '        await importBackup(data);\n        await hydrate();', '        await importBackup(data);'],
  ['Load tab hides the daily panel', 'parent', '            <ImportPanel />\n', ''],
  ['Settings points at a missing name', 'parent', '<span className="font-700">Bring her daily work onto this computer</span>, on the Load tab', '<span className="font-700">Bring her work onto this computer</span>, on the Load tab']
];

const real = await run(await context());
if (!SELF_TEST) {
  if (real.length) {
    real.forEach((f) => console.log(`FAIL  ${f}`));
    process.exit(1);
  }
  console.log('Two pretend computers traded three files through the real code: her work and her edits reach Gigi, Gigi’s note and grade reach her, nothing is dropped or set back, an old file is refused, the passcode never travels.');
  console.log('Her Today has the card; Gigi’s Load tab shows the daily panel again.');
  console.log('NOT TESTED HERE: how the screens look, and the download itself (a browser saves the file).');
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
