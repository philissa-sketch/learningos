// ---------------------------------------------------------------------------
// MUTATION TEST FOR THE PHASE 3 GUARD — "the room tells the truth".
// Run: node scripts/mutate-hq-truth.mjs
//
// ---- WHY ----
//
// The empty-state rule is the whole value of Phase 3: an empty source draws an
// empty object, never a zero dressed up as a thing. It is also the easiest rule
// in this project to break by accident, because breaking it LOOKS LIKE A FIX.
// "Show at least one badge so the wall doesn't look broken" is one line, it is
// well-meant, and it turns the award wall back into a thing that tells a
// twelve-year-old he earned something he did not.
//
// So every check added in section 10 gets broken here on purpose, and has to go
// red. A check that stays green while its invariant is violated is worse than
// no check, because it is the reason nobody looks.
//
// Nothing here touches the real files: everything happens in a temp copy.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const HQ = 'src/components/Rewards/HQRoom.jsx';
const TRUTH = 'src/lib/hqTruth.js';

const MUTATIONS = [
  /* ---- the empty-state rule, from the selector end ---- */
  { name: 'the award wall shows a badge for nothing', file: TRUTH,
    from: '    shown: Math.min(earned.length, HQ_CAPS.awards),',
    to: '    shown: Math.max(1, Math.min(earned.length, HQ_CAPS.awards)),',
    expect: 'empty award record earns no badges' },

  { name: 'an untouched year is handed a patch', file: TRUTH,
    from: '    count: Math.min(earned.length, HQ_CAPS.patches),',
    to: '    count: Math.max(1, Math.min(earned.length, HQ_CAPS.patches)),',
    expect: 'untouched year earns no patches' },

  { name: 'the sky starts with a star in it', file: TRUTH,
    from: '    count: mastered.length,\n    total: lessons.length,',
    to: '    count: Math.max(1, mastered.length),\n    total: lessons.length,',
    expect: 'no mastered aerospace lesson means no stars' },

  { name: 'the computer invents a lesson he never finished', file: TRUTH,
    from: "  if (!best) return null;",
    to: "  if (!best) return { title: 'Getting Started', subject: '', date: '', mastered: false };",
    expect: 'nothing finished means no lesson on the screen' },

  { name: 'the grow box sprouts on an empty log', file: TRUTH,
    from: '    count: Math.min(days.size, HQ_CAPS.shoots),',
    to: '    count: Math.max(1, Math.min(days.size, HQ_CAPS.shoots)),',
    expect: 'empty garden log grows no shoots' },

  { name: 'a vial fills itself', file: TRUTH,
    from: '    count: Math.min(graded.length, HQ_CAPS.vials),',
    to: '    count: Math.max(1, Math.min(graded.length, HQ_CAPS.vials)),',
    expect: 'no graded science unit fills no vials' },

  { name: 'the tank stocks one fish for free', file: TRUTH,
    from: '    count: Math.min(earned, HQ_CAPS.fish),',
    to: '    count: Math.max(1, Math.min(earned, HQ_CAPS.fish)),',
    expect: 'empty typing log stocks no fish' },

  /* ---- the empty-state rule, from the DRAWING end ---- */
  { name: 'the wall draws all three medals regardless', file: HQ,
    from: '            {i < n && (', to: '            {true && (',
    expect: 'the wall draws none of them' },

  { name: 'the patch board fills itself in', file: HQ,
    from: 'const earned = !s.solid || i < n;', to: 'const earned = true;',
    expect: 'draws them as empty stitch outlines' },

  { name: 'the grow box draws every shoot whatever the log says', file: HQ,
    from: 'if (!grown) return null;', to: 'if (false) return null;',
    expect: 'the grow box draws bare soil' },

  { name: 'the computer drops its waiting message', file: HQ,
    from: '<text x="-28" y="-102" fontSize="6" fill="rgba(142,240,255,.65)">Awaiting first mission</text>',
    to: '<text x="-28" y="-102" fontSize="6" fill="rgba(142,240,255,.65)">Mission log</text>',
    expect: 'says so in words rather than showing empty bars' },

  { name: 'the window shows a constellation he has not earned', file: HQ,
    from: "{owned.has('hq-telescope') && truth['hq-telescope']?.count > 0 ? (",
    to: "{owned.has('hq-telescope') ? (",
    expect: 'window shows its own night sky instead of his' },

  { name: 'a zero-day streak is printed as a streak', file: HQ,
    from: '{t.streak > 0 && (', to: '{true && (',
    expect: 'zero-day streak is not printed' },

  /* ---- what the counts mean ---- */
  { name: 'an unmarked unit counts as graded', file: TRUTH,
    from: "    (k) => k?.subject === subject && k?.grade && k?.gradedAt",
    to: "    (k) => k?.subject === subject",
    expect: 'finished-but-unmarked science unit does not fill a vial' },

  { name: 'the bench counts every subject', file: TRUTH,
    from: "    (k) => k?.subject === subject && k?.grade && k?.gradedAt",
    to: "    (k) => k?.grade && k?.gradedAt",
    expect: 'graded MATHS unit does not fill a science vial' },

  { name: 'typing counts sessions instead of days', file: TRUTH,
    from: '  const earned = Math.floor(days.size / HQ_CAPS.daysPerFish);',
    to: '  const earned = Math.floor((typingLog || []).length / HQ_CAPS.daysPerFish);',
    expect: 'five typing entries in one day earn no fish' },

  { name: 'the garden counts rows instead of days', file: TRUTH,
    from: '    count: Math.min(days.size, HQ_CAPS.shoots),\n    days: days.size,',
    to: '    count: Math.min(sessions.length, HQ_CAPS.shoots),\n    days: days.size,',
    expect: 'two garden sessions on one day grow one shoot' },

  { name: 'a sun reading counts as a garden day', file: TRUTH,
    from: "  const sessions = (gardenLog || []).filter((r) => r?.kind === 'session');",
    to: '  const sessions = (gardenLog || []);',
    expect: 'a sun reading is not a session' },

  { name: 'a patch is handed out for the calendar alone', file: TRUTH,
    from: "    (q) => q.status === 'complete' && ((q.daysLogged || 0) > 0 || (q.mastered || 0) > 0)",
    to: "    (q) => q.status === 'complete'",
    expect: 'quarter that merely elapsed earns no patch' },

  { name: 'a quarter still running earns its patch early', file: TRUTH,
    from: "    (q) => q.status === 'complete' && ((q.daysLogged || 0) > 0 || (q.mastered || 0) > 0)",
    to: '    (q) => ((q.daysLogged || 0) > 0 || (q.mastered || 0) > 0)',
    expect: 'quarter still running earns nothing yet' },

  /* ---- caps ---- */
  { name: 'the tank overflows its lanes', file: TRUTH,
    from: '    count: Math.min(earned, HQ_CAPS.fish),', to: '    count: earned,',
    expect: 'more things than the drawing has room for' },

  { name: 'a cap drifts away from the slots drawn', file: TRUTH,
    from: '  vials: 6,', to: '  vials: 9,',
    expect: 'each cap matches the number of slots' },

  /* ---- the sky ---- */
  { name: 'the constellation reshuffles on every render', file: TRUTH,
    from: '    const a = (i + 1) * 0.6180339887498949;',
    to: '    const a = (i + 1) * 0.6180339887498949 + Math.random();',
    expect: 'always draws the same sky' },

  { name: 'earning a star moves the others', file: TRUTH,
    from: '    const a = (i + 1) * 0.6180339887498949;',
    to: '    const a = (i + 1 + n * 0.01) * 0.6180339887498949;',
    expect: 'without moving the others' },

  { name: 'the constellation spills out of the window', file: TRUTH,
    from: '      x: Math.round(((a % 1) * w - w / 2) * 100) / 100,',
    to: '      x: Math.round(((a % 1) * w * 1.8 - w / 2) * 100) / 100,',
    expect: 'stays inside the window frame' },

  /* ---- read-only ---- */
  { name: 'the selectors reach for the store', file: TRUTH,
    from: "export const HQ_CAPS = {",
    to: "export const _persist = (v) => saveMeta({ hq: v });\nexport const HQ_CAPS = {",
    expect: 'nothing in them can write to his record' },

  { name: 'an object quietly stops reading real data', file: HQ,
    from: "    'hq-aquarium': aquariumFish(typingLog)",
    to: "    'hq-aquarium': { count: 3, days: 15, any: true }",
    expect: 'hq-aquarium reads real data' }
];

/* ---- a throwaway copy of everything the suite reads ---- */
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'hq-truth-'));
fs.cpSync(path.join(REPO, 'src'), path.join(tmp, 'src'), { recursive: true });
fs.mkdirSync(path.join(tmp, 'scripts'));
fs.cpSync(path.join(REPO, 'scripts/verify-hq-room.mjs'), path.join(tmp, 'scripts/verify-hq-room.mjs'));

const pristine = Object.fromEntries(
  [HQ, TRUTH].map((f) => [f, fs.readFileSync(path.join(tmp, f), 'utf8')])
);

function runSuite() {
  try {
    execFileSync('node', [path.join(tmp, 'scripts/verify-hq-room.mjs')], { encoding: 'utf8' });
    return { failed: false, out: '' };
  } catch (e) {
    return { failed: true, out: (e.stdout || '') + (e.stderr || '') };
  }
}

const base = runSuite();
if (base.failed) {
  console.log('The suite does not pass on an UNMUTATED copy. Nothing below means anything.');
  console.log(base.out.split('\n').filter((l) => l.startsWith('FAIL')).join('\n'));
  process.exit(1);
}
console.log('baseline: suite passes on an unmutated copy\n');

let survived = 0;
for (const m of MUTATIONS) {
  const file = path.join(tmp, m.file);
  const src = pristine[m.file];
  if (!src.includes(m.from)) {
    console.log(`SKIP  ${m.name}  — the text this mutation edits is not in the file any more`);
    survived += 1;
    continue;
  }
  fs.writeFileSync(file, src.replace(m.from, m.to));
  const r = runSuite();
  fs.writeFileSync(file, src);

  const killedBy = r.out.split('\n').filter((l) => l.startsWith('FAIL') && l.includes(m.expect));
  if (r.failed && killedBy.length) {
    console.log(`KILLED  ${m.name}`);
  } else if (r.failed) {
    console.log(`WRONG   ${m.name}  — suite failed, but not on "${m.expect}"`);
    console.log('        ' + r.out.split('\n').filter((l) => l.startsWith('FAIL')).join('\n        '));
    survived += 1;
  } else {
    console.log(`SURVIVED  ${m.name}  — nothing noticed. The check for "${m.expect}" does not check.`);
    survived += 1;
  }
}

fs.rmSync(tmp, { recursive: true, force: true });

console.log(`\n${MUTATIONS.length - survived}/${MUTATIONS.length} mutations killed`);
if (survived) {
  console.log(`\n${survived} MUTATION(S) SURVIVED`);
  process.exitCode = 1;
} else {
  console.log('\nEVERY NEW CHECK IS LOAD-BEARING');
}
