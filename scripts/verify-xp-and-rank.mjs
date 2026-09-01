// ---------------------------------------------------------------------------
// XP IS EARNED ONCE, AND THE SCREEN TELLS THE TRUTH ABOUT RANK.
// Run: node scripts/verify-xp-and-rank.mjs
//
// ---- WHERE THIS CAME FROM (Aug 13, 2026) ----
//
// The parent sent a screenshot of the Progress screen:
//
//     TOTAL XP        1085 / 500
//     [bar completely full]
//     0 XP to Flight Cadet
//     CURRENT RANK    Junior Engineer — Tier 1 of 8
//
// and then: "check how the xp works, whats it for, and what needs to be
// updated."
//
// Nothing was miscalculated. Rank is a DUAL gate — XP *and* lessons mastered —
// and he had 6 mastered against Flight Cadet's 32. Three separate faults were
// stacked on top of each other, and every one of them was individually
// defensible:
//
//   1. THE COUNT WAS MEASURING THE WRONG BOY. `totalMastered` was computed in
//      nineteen places as lessonProgress-mastered only. Math, Science and
//      Reading had moved to Khan Academy months earlier — four of the five
//      subjects he touches on a normal day. All of that work paid XP and moved
//      his rank not at all. The two halves of the gate had stopped measuring
//      the same activity, and nothing said so.
//
//   2. XP WAS PAYABLE MORE THAN ONCE. Re-opening a mastered lesson re-paid the
//      20-point mastery bonus, every time, forever. Editing today's PE log paid
//      5 XP an edit. Untick/retick on an assignment milestone paid 5 a cycle.
//      The mastered COUNT was correctly sticky in all three — only the XP
//      moved. So the two numbers diverged by construction.
//
//   3. THE CARD RENDERED ONE AXIS OF A TWO-AXIS SYSTEM. XPBar never received
//      `totalMastered`. Its bar clamped at 100% and its remainder floored at
//      zero — two defensive guards that between them turned a missing input
//      into a confident wrong answer, fifteen pixels above a rocket meter
//      reading "19% to next rank".
//
// The lesson worth keeping: a widget showing one gate of a two-gate system
// does not look broken. It looks finished.
// ---------------------------------------------------------------------------
import './lib/academy-under-test.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { RANKS, getCurrentRank, getNextRank, getProgressToNextRank } = await import(REPO + '/src/lib/ranks.js');
const { scoreLessonAttempt } = await import(REPO + '/src/engine/lessonScoring.js');
const { totalMasteredCount } = await import(REPO + '/src/store/useAppStore.js');
const { ACTIVE_SUBJECTS, LESSON_TRACK_SUBJECTS } = await import(REPO + '/src/academies/lamar/subjects.js');

let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
}
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');

console.log('\n--- 1. the mastery count includes the work he actually does ---');
{
  ok('the store exports ONE mastery count', typeof totalMasteredCount === 'function',
    'nineteen copies of one expression is how two of them come to disagree');

  const state = {
    lessonProgress: { a: { mastered: true }, b: { mastered: false }, c: { mastered: true } },
    khanAcademyAssignments: [
      { completed: true, gradePercent: 100 },  // counts
      { completed: true, gradePercent: 91 },   // counts
      { completed: true, gradePercent: 90 },   // counts — the bar is inclusive
      { completed: true, gradePercent: 80 },   // does NOT: 80% is not mastery
      { completed: true, gradePercent: null }, // does NOT: finished, never scored
      { completed: false, gradePercent: 100 }  // does NOT: not finished
    ]
  };
  ok('Mission Control lessons still count', totalMasteredCount({ lessonProgress: state.lessonProgress }) === 2);
  ok('a Khan unit graded 90%+ counts too', totalMasteredCount(state) === 5,
    `got ${totalMasteredCount(state)} — expected 2 lessons + 3 units`);
  ok('...and 90 exactly is enough',
    totalMasteredCount({ khanAcademyAssignments: [{ completed: true, gradePercent: 90 }] }) === 1);
  ok('a unit graded BELOW 90 does not count',
    totalMasteredCount({ khanAcademyAssignments: [{ completed: true, gradePercent: 89 }] }) === 0,
    'the word in the gate is *mastered*; a gate that counts 70% as mastery means nothing');
  ok('a unit marked finished but never scored does not count',
    totalMasteredCount({ khanAcademyAssignments: [{ completed: true, gradePercent: null }] }) === 0,
    'that combination is the signature of a mis-tap, not of mastery');
  ok('an ungraded, unfinished unit does not count',
    totalMasteredCount({ khanAcademyAssignments: [{ completed: false, gradePercent: 95 }] }) === 0);
  ok('it survives empty / missing input', totalMasteredCount({}) === 0 && totalMasteredCount(undefined) === 0);

  // The duplication that caused this must not creep back.
  const store = read('src/store/useAppStore.js');
  ok('no inline copy of the old count survives in the store',
    !/Object\.values\(state\.lessonProgress\)\.filter\(\(p\) => p\.mastered\)\.length/.test(store) &&
    !/Object\.values\(s\.lessonProgress\)\.filter\(\(p\) => p\.mastered\)\.length/.test(store),
    'there were nineteen; there is now one function');
  for (const rel of ['src/components/Dashboard/ProgressView.jsx', 'src/components/Dashboard/ParentDashboard.jsx']) {
    ok(`${rel.split('/').pop()} uses the shared count`,
      !/Object\.values\(lessonProgress\)\.filter\(\(p\) => p\.mastered\)\.length/.test(read(rel)) &&
      /totalMasteredCount/.test(read(rel)));
  }
}

console.log('\n--- 2. rank still needs BOTH gates ---');
{
  // Her real numbers on the day this was found.
  const HER_XP = 1085;
  const HER_MASTERED = 6;
  ok('1085 XP with 6 mastered is still Tier 1', getCurrentRank(HER_XP, HER_MASTERED).tier === 1,
    'the rank was never the bug — the screen describing it was');
  ok('...and clearing only the XP gate is never enough',
    getCurrentRank(999999, 0).tier === 1);
  ok('...nor only the mastery gate', getCurrentRank(0, 999).tier === 1);
  ok('clearing both advances', getCurrentRank(500, 32).tier === 2);
  ok('the progress fraction is the SLOWER gate',
    Math.abs(getProgressToNextRank(HER_XP, HER_MASTERED, RANKS[0]) - 6 / 32) < 0.001,
    'blending or averaging the two would flatter him past the thing holding him up');
}

console.log('\n--- 3. the XP card shows the gate that is actually in the way ---');
{
  const bar = read('src/components/Dashboard/XPBar.jsx');
  ok('XPBar takes the mastery count', /totalMastered = 0 \}/.test(bar) || /totalMastered/.test(bar));
  ok('...and ProgressView passes it',
    /<XPBar xp=\{xp\} currentRank=\{currentRank\} totalMastered=\{totalMastered\} \/>/.test(read('src/components/Dashboard/ProgressView.jsx')));
  ok('the old single-gate sentence is gone',
    !/\$\{next\.minXp - xp > 0 \? next\.minXp - xp : 0\} XP to/.test(bar),
    '"0 XP to Flight Cadet" was true, and told a twelve-year-old he had arrived somewhere he had not');
  ok('it can say the lessons are what is left',
    /more lesson\{lessonsNeeded === 1 \? '' : 's'\} mastered to/.test(bar));
  ok('...and names when a gate is already cleared', /XP done\./.test(bar) && /Lessons done\./.test(bar));
  ok('...and when both are', /unlocked\./.test(bar));
  ok('the bar tracks the slower gate, not the XP',
    /Math\.min\(xpPct, lessonPct\)/.test(bar),
    'a full bar beside an unmoved rank is what she reported');
}

console.log('\n--- 4. no reward is payable twice for the same work ---');
{
  // The engine reports the bonus; the store decides whether to pay it.
  const lesson = { questions: [
    { id: 'q1', type: 'multiple-choice', answer: 0, xp: 10 },
    { id: 'q2', type: 'multiple-choice', answer: 0, xp: 10 }
  ] };
  const perfect = scoreLessonAttempt(lesson, { q1: 0, q2: 0 });
  ok('a mastering attempt reports its bonus separately', perfect.masteryBonusXp === 20,
    `got ${perfect.masteryBonusXp}`);
  ok('...and still includes it in the total', perfect.xpEarned === 40, `got ${perfect.xpEarned}`);
  const missed = scoreLessonAttempt(lesson, { q1: 0, q2: 1 });
  ok('a non-mastering attempt reports no bonus', missed.masteryBonusXp === 0);

  const store = read('src/store/useAppStore.js');
  ok('the store declines to pay the bonus a second time',
    /const alreadyMastered = Boolean\(prior\?\.mastered\);/.test(store) &&
    /attemptResult\.xpEarned - \(attemptResult\.masteryBonusXp \|\| 0\)/.test(store),
    're-opening a mastered lesson used to re-pay 20 XP, indefinitely');
  ok('...but re-practice still pays its per-question XP',
    /Math\.max\(0, attemptResult\.xpEarned - /.test(store),
    'the fix must not punish him for going back over something');

  ok('the PE daily log pays once a day, not once an edit',
    /const xpEarned = state\.peDailyLog\[date\] \? 0 : PE_DAILY_LOG_XP;/.test(store),
    'the row was an upsert keyed by date; the XP was not');
  ok('an assignment milestone pays once, not once per retick',
    /const alreadyPaid = Boolean\(target && target\.xpAwardedAt\);/.test(store) &&
    /if \(turnedOn && !alreadyPaid\)/.test(store),
    'unticking a step is a correction, and a correction should never be a payday');
  ok('...and records the receipt on the milestone',
    /target\.xpAwardedAt = new Date\(\)\.toISOString\(\);/.test(store));

  // The two that were already right, kept right.
  ok('a Khan unit still pays its 20 XP once ever', /if \(!existing \|\| existing\.unitXpAwardedAt\) return null;/.test(store));
  ok('the Khan daily tick is still symmetric',
    /done \? state\.xp \+ KHAN_DAILY_XP : Math\.max\(0, state\.xp - KHAN_DAILY_XP\)/.test(store));
}

console.log('\n--- 5. one coin rate, in one place ---');
{
  // Comments are stripped first — the note left where the dead constant used
  // to be quotes the line it removed, and a guard that a comment can defeat
  // (in either direction) is not a guard.
  const strip = (src) =>
    src.replace(/\/\*[\s\S]*?\*\//g, '').split('\n').filter((l) => !/^\s*(\/\/|\*)/.test(l)).join('\n');
  const store = strip(read('src/store/useAppStore.js'));
  const econ = strip(read('src/lib/economy.js'));
  ok('the stale 5-XP-per-coin constant is gone from the store',
    !/const XP_PER_COIN\s*=/.test(store),
    'a 2.5x-wrong number one file from the live one, waiting to be "used since it is already here"');
  ok('economy.js holds the real rate', /export const XP_PER_COIN = 2;/.test(econ));
  ok('...and it is the only definition',
    (store + econ).match(/XP_PER_COIN\s*=/g).length === 1);
}

console.log('\n--- 6. the top ranks: still out of reach, and still logged ---');
{
  /**
   * NOT FIXED, DELIBERATELY — recorded here so it cannot be forgotten.
   *
   * minMasteredForTier counts the whole 356-lesson curriculum, but Math (106)
   * and Science (39) are archived: Khan owns them, and LessonRoster refuses to
   * render a lesson outside ACTIVE_SUBJECTS + LESSON_TRACK_SUBJECTS. With Khan
   * units now counting toward mastery the ceiling has risen, but tiers 6-8
   * still ask for 242, 290 and 333, and the parent chose to count Khan units
   * rather than rescale the ladder. This check states the arithmetic out loud
   * every time the suite runs.
   */
  const active = new Set([...(ACTIVE_SUBJECTS || []), ...(LESSON_TRACK_SUBJECTS || [])]);
  ok('archived subjects are still archived', !active.has('math') && !active.has('science'),
    'if this flips, the reachability arithmetic below changes and should be revisited');

  const top = RANKS[RANKS.length - 1];
  console.log(`      top tier needs ${top.minMasteredForTier} mastered items`);
  console.log('      reachable pool = browsable lessons + Khan units graded 90%+');
  console.log('      OPEN ITEM: tiers 6-8 may still be unreachable. Parent chose to');
  console.log('      count Khan units rather than rescale the ladder (Aug 13, 2026).');
  ok('the ladder is still strictly harder each step on BOTH axes',
    RANKS.every((r, i) => i === 0 || (r.minXp > RANKS[i - 1].minXp && r.minMasteredForTier >= RANKS[i - 1].minMasteredForTier)));
  ok('the top tier still ends the ladder', getNextRank(top.tier) === null);
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
