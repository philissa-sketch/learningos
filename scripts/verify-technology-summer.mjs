// ---------------------------------------------------------------------------
// THE UNFINISHED TECHNOLOGY KHAN UNITS ARE IN SUMMER. Run: ACADEMY=lamar node scripts/verify-technology-summer.mjs
//
// The parent, Oct 16, 2026: "Add it to the summer." Q1 Technology carried 23
// lessons plus four more Khan units on 26 Tuesdays and Thursdays; Summer's
// Tuesdays and Thursdays had nothing on them. The migration and the seed are
// simulated TOGETHER over his real install shape, as verify-technology-khan does
// for the Q2 -> Q3 move, because the seed matches on (subject, skillTitle,
// batchLabel) and a relabelled seed alone would hand him a second copy.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
}

const { installAcademyContent, academyContent } = await import('../src/content/academyContent.js');
installAcademyContent(await import('../src/academies/lamar/content.js'), 'lamar');
const batches = (await import('../src/academies/lamar/data/khanSeed/khanSeedBatches.js')).KHAN_SEED_BATCHES;
const summerSeed = batches.technologySummerRows;
const q1Seed = batches.technologyQ1Rows.filter((r) => /computers-and-internet/.test(r.khanAcademyUrl));
const Q1 = 'Q1 2026-2027';
const SUMMER = 'Summer 2027';

// The store's two passes, as written, in order.
function hydrate(install) {
  const byTitle = new Map(summerSeed.map((r) => [r.skillTitle, r]));
  const after = install.map((a) => {
    if (a.subject !== 'technology') return a;
    const inQ1 = a.batchLabel === Q1;
    if (!inQ1 && a.batchLabel !== SUMMER) return a;
    const t = byTitle.get(a.skillTitle);
    if (!t) return a;
    if (inQ1 && a.completed) return a;
    if (a.batchLabel === SUMMER && a.sequenceInQuarter === t.sequenceInQuarter && a.lessons === t.lessons) return a;
    return { ...a, batchLabel: SUMMER, sequenceInQuarter: t.sequenceInQuarter, lessons: t.lessons };
  });
  const missing = summerSeed.filter(
    (r) => !after.some((a) => a.subject === r.subject && a.skillTitle === r.skillTitle && (a.batchLabel === SUMMER || a.completed))
  );
  return [...after, ...missing.map((r) => ({ ...r, batchLabel: SUMMER, completed: false }))];
}

// His install as of Oct 12: five course units + challenge in Q1, the first two finished.
const title = (t) => q1Seed.concat(summerSeed).find((r) => r.skillTitle === t);
const his = ['Digital information', 'Computers', 'The Internet', 'Online data security', 'Computing innovations', 'Course Challenge — Computers and the Internet']
  .map((t, i) => ({ subject: 'technology', skillTitle: t, batchLabel: Q1, completed: i < 2, sequenceInQuarter: i < 5 ? i + 1 : 99 }));

const after = hydrate(his);
const inSummer = after.filter((a) => a.batchLabel === SUMMER).map((a) => a.skillTitle);
const inQ1 = after.filter((a) => a.batchLabel === Q1).map((a) => a.skillTitle);
ok('his install ends with the same six rows, no second copies', after.length === 6, `${after.length}`);
ok('the four unfinished rows are in Summer', inSummer.length === 4 && ['The Internet', 'Online data security', 'Computing innovations', 'Course Challenge — Computers and the Internet'].every((t) => inSummer.includes(t)), inSummer.join(' | '));
ok('the two finished units stay in Q1 where their grades were earned', inQ1.length === 2 && inQ1.includes('Digital information') && inQ1.includes('Computers'), inQ1.join(' | '));
ok('Khan order holds inside Summer, challenge last', JSON.stringify(after.filter((a) => a.batchLabel === SUMMER).sort((a, b) => a.sequenceInQuarter - b.sequenceInQuarter).map((a) => a.sequenceInQuarter)) === '[1,2,3,99]');
ok('running it again changes nothing', hydrate(after).length === after.length && JSON.stringify(hydrate(after)) === JSON.stringify(after));

// The counts are real and the pacing model uses them: 10 + 7 + 4 + 1 = 22 sittings.
ok('the four Summer rows carry the lesson counts taken off Khan', summerSeed.map((r) => r.lessons).join(',') === '10,7,4,1', summerSeed.map((r) => r.lessons).join(','));
ok('every moved row ends up carrying its count', after.filter((a) => a.batchLabel === SUMMER).map((a) => a.lessons).sort().join(',') === '1,10,4,7');
const pcMod = await import('../src/lib/pacing.js');
ok('pacing costs the four units at 22 days, not 32', summerSeed.reduce((n, r) => n + pcMod.khanUnitDays(r), 0) === 22);

// A finished unit is never handed back to him under the new label.
const finishedAll = his.map((a) => ({ ...a, completed: a.skillTitle === 'The Internet' || a.completed }));
const f = hydrate(finishedAll);
ok('a finished unit never moves and is never seeded a second time', f.filter((a) => a.skillTitle === 'The Internet').length === 1 && f.find((a) => a.skillTitle === 'The Internet').batchLabel === Q1);

// A fresh install.
const fresh = hydrate([]);
ok('a fresh install seeds the four straight into Summer', fresh.length === 4 && fresh.every((a) => a.batchLabel === SUMMER));
ok('the Q1 seed no longer carries the four moved titles', !batches.technologyQ1Rows.some((r) => summerSeed.some((s) => s.skillTitle === r.skillTitle)));

// The store really runs the move, before the seed, on every hydrate.
const store = fs.readFileSync(path.join(REPO, 'src/store/useAppStore.js'), 'utf8');
const move = store.indexOf("technologySummerMoved = []");
const seed = store.indexOf("missingTechnologySummerRows = ");
ok('the store relabels existing rows before it seeds Summer', move > 0 && seed > move);
ok('the store never moves a finished unit', /if \(inQ1 && a\.completed\) return a;/.test(store));

// Pacing: the effect she asked for.
const pc = await import('../src/lib/pacing.js');
const ys = await import('../src/lib/yearPlan.js');
const rows = [
  ...his.map((a) => ({ ...a, batchLabel: a.batchLabel })),
].map((a) => ({ ...a }));
const moved = hydrate(rows);
const q1p = pc.quarterPacing(ys.QUARTER_SPANS[0], moved).rows.find((r) => r.subject === 'technology');
const sp = pc.quarterPacing(ys.QUARTER_SPANS[4], moved).rows.find((r) => r.subject === 'technology');
ok('Q1 Technology now carries only the two finished units, not 48 days of Khan', q1p.khanUnits === 2, `${q1p.khanUnits}`);
ok('Summer Technology now carries the four units', sp && sp.khanUnits === 4, JSON.stringify(sp));

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) process.exit(1);
