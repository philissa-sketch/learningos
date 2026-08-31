// Migration simulation for the Technology Khan Academy seed — same method
// used to verify the math passes: order, counts, duplicates, and the
// idempotency of the missing-rows check against an existing install.
import { readFileSync } from 'node:fs';
const src = readFileSync(new URL('../src/store/useAppStore.js', import.meta.url), 'utf8');

function grabRows(varName) {
  const start = src.indexOf(`const ${varName} = [`);
  if (start === -1) throw new Error(`${varName} not found`);
  const open = src.indexOf('[', start);
  let depth = 0, i = open;
  for (; i < src.length; i++) {
    if (src[i] === '[') depth++;
    else if (src[i] === ']') { depth--; if (depth === 0) break; }
  }
  const body = src.slice(open, i + 1);
  const rows = [];
  for (const m of body.matchAll(/\{[^{}]*\}/g)) {
    const o = m[0];
    const g = (k) => (o.match(new RegExp(`${k}:\\s*'([^']*)'`)) || [])[1];
    const n = (k) => { const r = o.match(new RegExp(`${k}:\\s*(\\d+)`)); return r ? Number(r[1]) : null; };
    rows.push({
      subject: g('subject'), skillTitle: g('skillTitle'), url: g('khanAcademyUrl'),
      seq: n('sequenceInQuarter'), gradedBy: g('gradedBy'),
      isCourseChallenge: /isCourseChallenge:\s*true/.test(o)
    });
  }
  return rows;
}

let fail = 0;
const ok = (c, m, d) => { console.log(`${c ? 'PASS' : 'FAIL'}  ${m}`); if (!c) { fail++; if (d) console.log('      ' + d); } };

const q1 = grabRows('technologyQ1Rows');
const q3 = grabRows('technologyQ3Rows');
console.log(`Technology Q1: ${q1.length} rows · Q3: ${q3.length} rows · total ${q1.length + q3.length}\n`);

for (const [label, rows] of [['Q1', q1], ['Q3', q3]]) {
  console.log(`--- ${label} in seeded order ---`);
  for (const r of rows) console.log(`  ${String(r.seq).padStart(2)}  ${r.skillTitle}${r.gradedBy ? '  [project-graded]' : ''}${r.isCourseChallenge ? '  [course challenge]' : ''}`);
  console.log('');
}

const all = [...q1, ...q3];
ok(all.every((r) => r.subject === 'technology'), 'every row is subject "technology"');
ok(all.every((r) => r.url && r.url.startsWith('https://www.khanacademy.org/computing/')), 'every URL is a real Khan Academy computing URL');
const titles = all.map((r) => r.skillTitle);
const dupT = titles.filter((t, i) => titles.indexOf(t) !== i);
ok(dupT.length === 0, 'no duplicate skill titles across quarters', dupT.join(', '));
const urls = all.map((r) => r.url);
const dupU = urls.filter((u, i) => urls.indexOf(u) !== i);
ok(dupU.length === 0, 'no duplicate unit URLs', dupU.join(', '));

for (const [label, rows] of [['Q1', q1], ['Q3', q3]]) {
  const normal = rows.filter((r) => r.seq !== 99).map((r) => r.seq);
  const expected = Array.from({ length: normal.length }, (_, i) => i + 1);
  ok(JSON.stringify(normal) === JSON.stringify(expected), `${label} sequenceInQuarter is 1..${normal.length} with no gaps or repeats`, `got ${normal.join(',')}`);
}
ok(q1.filter((r) => r.isCourseChallenge).every((r) => r.seq === 99), 'each Course Challenge sorts last (sequence 99)');

// ---------------------------------------------------------------------------
// THE Q2 -> Q3 MOVE (Aug 26, 2026, audit item O-3).
//
// THIS CHECK USED TO BE VACUOUS AND IT MATTERS THAT IT WAS. It built a fake
// install with `batchLabel: 'x'` and then filtered on subject and title only —
// so it could not have caught a quarter change, which is precisely the change
// that has now happened. A check that omits the field the real filter uses is
// a check that passes for the wrong reason.
//
// The real seed matches on (subject, skillTitle, batchLabel). With the label
// moved to Q3 and the rows still sitting in Q2, that match fails and the seed
// adds a SECOND copy — sixteen units instead of eight. So the migration and
// the seed are simulated TOGETHER, over a pre-move install, and the assertion
// is about where the rows end up.
// ---------------------------------------------------------------------------
const Q2 = 'Q2 2026-2027';
const Q3 = 'Q3 2026-2027';

/** The migration and the seed, as the store runs them, in that order. */
function hydrate(install) {
  const movedTitles = new Set(q3.map((r) => r.skillTitle));
  const after = install.map((a) =>
    a.subject === 'technology' && a.batchLabel === Q2 && movedTitles.has(a.skillTitle) && !a.completed
      ? { ...a, batchLabel: Q3 }
      : a
  );
  const missing = q3.filter(
    (r) => !after.some((a) => a.subject === r.subject && a.skillTitle === r.skillTitle && a.batchLabel === Q3)
  );
  return [...after, ...missing.map((r) => ({ ...r, batchLabel: Q3, completed: false }))];
}

{
  /** His install as it stands today: eight rows, in Q2, none finished. */
  const before = q3.map((r) => ({ subject: 'technology', skillTitle: r.skillTitle, batchLabel: Q2, completed: false }));
  const after = hydrate(before);
  const inQ3 = after.filter((a) => a.batchLabel === Q3);
  const leftInQ2 = after.filter((a) => a.batchLabel === Q2);
  ok(after.length === q3.length, 'the move relabels the existing rows instead of adding a second copy',
    `${after.length} rows, expected ${q3.length}`);
  ok(inQ3.length === q3.length && leftInQ2.length === 0, 'all eight end up in Q3 and none are left behind in Q2',
    `Q3=${inQ3.length} Q2=${leftInQ2.length}`);

  /** Running it again changes nothing — it runs on every hydrate. */
  const twice = hydrate(after);
  ok(twice.length === after.length, 'running it a second time adds nothing', `${twice.length} vs ${after.length}`);

  /** A fresh install has no rows to move and seeds straight into Q3. */
  const fresh = hydrate([]);
  ok(fresh.length === q3.length && fresh.every((a) => a.batchLabel === Q3),
    'a fresh install seeds these units into Q3, not Q2');

  /**
   * A FINISHED UNIT STAYS WHERE IT WAS GRADED. Its grade belongs to the
   * quarter it was earned in; dragging it forward would rewrite a quarter she
   * has already reported on. The seed then fills the Q3 slot behind it, which
   * is correct — the unit is done, the quarter still needs its content listed.
   */
  const withOneDone = q3.map((r, i) => ({
    subject: 'technology', skillTitle: r.skillTitle, batchLabel: Q2, completed: i === 0, grade: i === 0 ? 'A' : null
  }));
  const afterDone = hydrate(withOneDone);
  const stayed = afterDone.find((a) => a.completed);
  ok(Boolean(stayed) && stayed.batchLabel === Q2, 'a completed unit is not dragged into another quarter',
    stayed ? stayed.batchLabel : 'the completed row vanished');
}

/** Quarter targets from PROJECT_PLAN (Q1 ~12, and ~8 for the second batch). */
ok(Math.abs(q1.length - 12) <= 1, `Q1 row count (${q1.length}) matches the ~12 target`);
ok(Math.abs(q3.length - 8) <= 1, `Q3 row count (${q3.length}) matches the ~8 target`);

console.log(`\n${fail === 0 ? 'ALL CHECKS PASSED' : fail + ' CHECK(S) FAILED'}`);
process.exit(fail === 0 ? 0 : 1);
