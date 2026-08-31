// ---------------------------------------------------------------------------
// A KHAN UNIT IS FINISHED BY A SCORE, NOT BY A TAP.
// Run: node scripts/verify-khan-unit-completion.mjs
//
// ---- READ THIS FIRST: THIS FILE REVERSED ITSELF (Aug 12, 2026) ----
//
// For two days it asserted the opposite of what it asserts now. That is not an
// embarrassment to hide, it is the most useful thing in the file, so the whole
// arc stays written down.
//
// Aug 10 - the parent had to ask twice in two days for units to be ticked off
// by hand, because the only "Mark Complete" in the app lived in a component
// nothing renders. She said what she wanted: "i want him to get the xp so can
// he select that he completed unit 2 and it opens to unit 3 tomorrow?" So a
// "Unit done" button went on his home screen. It asked twice. It named the
// unit. It was, by every check below, correct.
//
// Aug 12 - it had walked his computer four units past where he actually was.
//
// Nothing was broken. The button did precisely what it said. The fault was in
// the premise: A KHAN UNIT IS THREE OR FOUR SCHOOL DAYS OF WORK, AND A BUTTON
// BESIDE A LESSON GETS PRESSED AT THE END OF A SESSION. A twelve-year-old
// finishing his math for the day and tapping the only control that visibly
// does something is not misbehaving - he is using the screen as designed. And
// this app CANNOT SEE KHAN ACADEMY, so nothing could ever contradict him.
//
// The parent: "can we remove the done buttons. The check box should be good
// enough so that he won't select the done multiple times."
//
// The measurement that settled it, taken across every completed unit on her
// machine: every unit carrying a GRADE matched a real Khan unit test. Every
// unit without one had no test behind it at all. The score is evidence. The
// tap never was. So completion moved to the one event with something real
// behind it - the parent entering the score off Khan's own screen - and the
// 20 XP moved with it, paid once per unit.
//
// THE LESSON, which outlives this feature: a confirm dialog does not make an
// unverifiable claim verifiable. It only makes it deliberate. When the app
// cannot check a fact, the fix is to move the fact to whoever can.
//
// ---- WHAT WAS WRONG (Aug 10, 2026) ----
//
// The parent, twice in two days: "he did the first unit of math already can you
// start math at the 2nd unit", then "He completed unit 2 today for math. Open
// unit 3." And then the sentence that explained why she was having to ask:
//
//     "i want him to get the xp so can he select that he completed unit 2 and
//      it opens to unit 3 tomorrow?"
//
// He could not. `markKhanAcademyAssignmentComplete` — 20 XP, attendance, and
// the row advances to the next unit — was called from exactly one place in the
// app: KhanSubjectGroup, inside KhanAcademyMissionsCard. KhanSubjectGroup is
// rendered only by TodaysMissionCard. AND NOTHING IMPORTS TodaysMissionCard.
//
// So the button was real, correct, styled, and unreachable. TodayRow's own
// comment described "marking the UNIT finished" as "a separate, permanent
// action" — describing a design rather than the code, which is how this hid.
//
// ---- THE CHECK THAT WOULD HAVE CAUGHT IT ----
//
// Not "does a Mark Complete button exist" — one did. The question is whether
// the component holding it is REACHABLE FROM App.jsx. So this file walks the
// real import graph from the app's entry point and asserts the completion path
// is inside it. A component nothing renders is dead code, and dead code that
// holds the only copy of a feature reads as a working feature in every review.
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
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');

// ---------------------------------------------------------------------------
// The import graph, walked from the entry point the browser actually loads.
// ---------------------------------------------------------------------------
function resolveImport(fromRel, spec) {
  if (!spec.startsWith('.')) return null; // node_modules — not our code
  const abs = path.resolve(path.dirname(path.join(REPO, fromRel)), spec);
  for (const candidate of [abs, abs + '.js', abs + '.jsx', path.join(abs, 'index.js'), path.join(abs, 'index.jsx')]) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return path.relative(REPO, candidate).split(path.sep).join('/');
    }
  }
  return null;
}

function reachableFrom(entryRel) {
  const seen = new Set();
  const queue = [entryRel];
  while (queue.length) {
    const rel = queue.shift();
    if (seen.has(rel)) continue;
    seen.add(rel);
    let src;
    try { src = read(rel); } catch { continue; }
    // static imports, side-effect imports, and lazy(() => import('...'))
    const specs = [
      ...[...src.matchAll(/(?:^|\n)\s*import\s[^;]*?from\s*['"]([^'"]+)['"]/g)].map((m) => m[1]),
      ...[...src.matchAll(/(?:^|\n)\s*import\s*['"]([^'"]+)['"]/g)].map((m) => m[1]),
      ...[...src.matchAll(/import\(\s*['"]([^'"]+)['"]\s*\)/g)].map((m) => m[1])
    ];
    for (const spec of specs) {
      const next = resolveImport(rel, spec);
      if (next) queue.push(next);
    }
  }
  return seen;
}

/**
 * Walked from main.jsx, not App.jsx (changed Aug 31 2026, LearningOS step 2).
 *
 * App.jsx used to be what main.jsx rendered, so starting here and starting
 * there were the same set. They stopped being the same when FrontDoorGate went
 * in above App: the gate is unmistakably live — it is the first thing the
 * browser runs — but nothing imports it except main.jsx, so a walk from App.jsx
 * cannot see it, and every action only the gate calls reads as stranded.
 *
 * main.jsx is the real entry point and always was. Starting from it makes the
 * reachable set strictly larger and strictly more honest.
 */
const live = reachableFrom('src/main.jsx');
console.log(`\nfiles reachable from main.jsx: ${live.size}`);

console.log('\n--- 1. nothing he can reach marks a unit finished ---');
{
  const store = read('src/store/useAppStore.js');
  ok('the student-facing completion action is gone from the store',
    !/async markKhanAcademyAssignmentComplete\(/.test(store),
    'it took a tap as proof of three days of work; deleting it is the fix, not hiding the button');
  ok('...and the deletion is explained where the action used to be',
    /markKhanAcademyAssignmentComplete IS GONE/.test(store),
    'a silently missing function reads as an oversight and gets helpfully restored');

  const FORBIDDEN = /markKhanAcademyAssignmentComplete|onFinishUnit|finishUnit\(/;
  const offenders = [...live].filter((rel) => {
    if (rel === 'src/store/useAppStore.js') return false;
    if (!rel.endsWith('.jsx') && !rel.endsWith('.js')) return false;
    return FORBIDDEN.test(read(rel));
  });
  ok('no reachable screen can finish a Khan unit', offenders.length === 0,
    offenders.join(', ') + ' - this is exactly how his computer ran four units ahead');

  const dead = fs.readdirSync(path.join(REPO, 'src/components/Dashboard'))
    .filter((f) => f.endsWith('.jsx'))
    .map((f) => 'src/components/Dashboard/' + f)
    .filter((rel) => !live.has(rel) && FORBIDDEN.test(read(rel)));
  ok('...and no dead component is holding a copy of it', dead.length === 0,
    dead.join(', ') + ' - an unmounted component is where a removed behaviour waits to come back');
}

console.log('\n--- 2. no feature lives ONLY in a component nothing renders ---');
{
  /**
   * The generalised failure, which is the one worth guarding.
   *
   * Nine components under Dashboard/ are orphaned — leftovers from the Aug 7
   * redesign that replaced a stack of cards with one TodayRow per line. Dead
   * code is untidy but harmless. What is NOT harmless is a store action whose
   * only caller is dead code: on every reading of the source the feature looks
   * present and wired, and in the running app it cannot be reached. That is
   * exactly what happened to markKhanAcademyAssignmentComplete, and the parent
   * paid for it by asking twice for units to be ticked off by hand.
   *
   * So: for every action the store exposes, at least one caller must be alive.
   */
  const store = read('src/store/useAppStore.js');
  const actions = [...store.matchAll(/^\s{2}(?:async )?([a-z][A-Za-z0-9]*)\(/gm)].map((m) => m[1]);
  const unique = [...new Set(actions)].filter((a) => a.length > 3);

  const componentFiles = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith('.jsx') || entry.name.endsWith('.js')) {
        componentFiles.push(path.relative(REPO, full).split(path.sep).join('/'));
      }
    }
  };
  walk(path.join(REPO, 'src'));

  const sources = new Map();
  for (const rel of componentFiles) {
    if (rel === 'src/store/useAppStore.js') continue;
    sources.set(rel, read(rel));
  }

  /**
   * ---- WHY THIS IS A TWO-PASS SCAN (Aug 11, 2026) ----
   *
   * The first version built a RegExp per action and tested it against every
   * source file: ~400 actions x ~230 files = 90,000 regex runs over the whole
   * tree, and it grew every time the app did. It crossed 40 seconds and
   * started timing out. A guard that is too slow to run is a guard nobody
   * runs, which is the same as not having it.
   *
   * A plain substring test rules out ~99% of pairs in a fraction of the time,
   * and only the survivors pay for a regex. Same answer, seconds instead of
   * a minute.
   */
  const strandedActions = [];
  for (const action of unique) {
    const needle = new RegExp('s\\.' + action + '\\b|\\b' + action + '\\(');
    let hasCaller = false;
    let reachable = false;
    const callers = [];
    for (const [rel, src] of sources) {
      if (!src.includes(action)) continue;   // cheap reject first
      if (!needle.test(src)) continue;
      hasCaller = true;
      callers.push(rel);
      if (live.has(rel)) { reachable = true; break; }
    }
    if (!hasCaller || reachable) continue;
    strandedActions.push(`${action} (only in ${callers.join(', ')})`);
  }
  ok('every store action with a caller has a caller the app can reach',
    strandedActions.length === 0,
    strandedActions.join('; '));

  const dashDir = path.join(REPO, 'src/components/Dashboard');
  const orphaned = fs.readdirSync(dashDir)
    .filter((f) => f.endsWith('.jsx'))
    .map((f) => 'src/components/Dashboard/' + f)
    .filter((rel) => !live.has(rel));
  console.log(`      dead components under Dashboard/ (harmless, but real): ${orphaned.length}`);
  for (const rel of orphaned) console.log('        ' + rel.replace('src/components/Dashboard/', ''));
  ok('the amount of dead code has not grown', orphaned.length <= 9, `${orphaned.length} orphans`);
}

console.log('\n--- 3. a score is what finishes a unit, and it pays once ---');
{
  const store = read('src/store/useAppStore.js');

  ok('there is a single, shared award for finishing a unit',
    /_unitXpChanges\(existing\)/.test(store) && /  _unitXpChanges\(existing\) \{/.test(store),
    'two copies of "pay 20 XP" is how the two entry fields come to pay different amounts');

  const hi = store.indexOf('  _unitXpChanges(existing) {');
  const helper = store.slice(hi, hi + 900);
  ok('it is still 20 XP - the same as the button paid', /KHAN_ACADEMY_COMPLETION_XP = 20/.test(helper),
    'moving WHEN he earns it must not change WHAT he earns');
  ok('it pays only if this unit has never been paid for',
    /if \(!existing \|\| existing\.unitXpAwardedAt\) return null;/.test(helper),
    'without the receipt, re-grading a typo is a payday');
  ok('...and it writes that receipt onto the row',
    /unitXpAwardedAt: new Date\(\)\.toISOString\(\)/.test(helper));
  ok('it re-derives his rank', /getCurrentRank\(/.test(helper),
    '20 XP that does not move the rank is 20 XP he cannot see');

  for (const [name, label] of [
    ['setKhanAcademyAssignmentPercent', 'the percentage she copies off Khan'],
    ['setKhanAcademyAssignmentGrade', 'the letter-only entry']
  ]) {
    const i = store.indexOf('async ' + name + '(');
    const fn = store.slice(i, i + 2600);
    ok(label + ' marks the unit completed', /completed: true/.test(fn));
    ok('...and pays the unit XP through the shared award', /_unitXpChanges\(existing\)/.test(fn));
    ok('...and persists the new total', /saveMeta\(\{ xp: award\.xp/.test(fn),
      'XP held only in memory is XP lost when she closes the tab');
  }

  const dash = read('src/components/Dashboard/MissionControlDashboard.jsx');
  ok('"next" is still the lowest-sequence unfinished unit',
    /const open = rows\.filter\(\(r\) => !r\.completed\)/.test(dash) &&
    /sequenceInQuarter \|\| 0\) - \(b\.sequenceInQuarter \|\| 0\)\)\[0\]/.test(dash),
    'so scoring unit 2 opens unit 3 - the original request, just triggered by evidence');
  ok('the home screen explains why there is no finish control here',
    /THERE IS NO "FINISH THIS UNIT" CONTROL HERE/.test(dash),
    'the next person to read this row will otherwise assume it was forgotten');
}

console.log('\n--- 4. his row has exactly one control, and it is the harmless one ---');
{
  const row = read('src/components/Dashboard/TodayRow.jsx');
  const dashSrc = read('src/components/Dashboard/MissionControlDashboard.jsx');

  ok('the finish button is gone from the row', !/onFinishUnit/.test(row),
    'the parent: "can we remove the done buttons"');
  ok('...along with its two-tap confirm machinery',
    !/confirming/.test(row) && !/Done on Khan\?/.test(row),
    'a confirm for an action that no longer exists invites the action back');
  ok('...and no unused react hooks were left behind',
    !/useState|useEffect/.test(row),
    'an unused import is a small thing that fails a build on a stricter day');

  ok('the daily tick survives, and it is the only control', /onToggleDaily/.test(row));
  /**
   * The tick is keyed off `onToggleDaily`, not off `kind` — the book row got
   * one on Aug 15 2026 so tonight's reading could be logged from the board.
   * What must NOT change is which rows supply the callback. A MISSION row
   * never does: a Mission Control lesson is done by mastering it, and a tick
   * there would let him claim work he has not done.
   */
  ok('the tick is offered by the row that owns the fact, not by kind',
    /\{onToggleDaily \? \(/.test(row));
  ok('...and a MISSION row never supplies one',
    !/kind="mission"[\s\S]{0,400}onToggleDaily/.test(dashSrc),
    'mastering the lesson is what completes it — a checkbox there is a claim, not a record');
  ok('...and the row says out loud that a Khan tick records THE DAY, not the unit',
    /Khan rows record THE DAY, not the unit/.test(row),
    'this row has now been wrong in both directions; the comment is what stops a third');

  ok('the whole reversal is written down where the next person will look',
    /AND THEN THE SECOND ACTION WAS TAKEN BACK OUT/.test(row) &&
    /can we remove the done buttons/.test(row),
    'without the reason, "he cannot mark his own work done" reads as a missing feature');
}


console.log('\n--- 5. a wrongly-ticked unit can be put back ---');
{
  /**
   * The parent, Aug 11 2026: "on my son's computer the app moved his classes
   * for math and science up towards the next units... I deleted the folder in
   * his computer and sent him the folder in my computer and it is still
   * showing the incorrect lessons." And then: "I looked in the grades and it
   * is showing the correct grades so I don't know why it is doing this."
   *
   * Three true things met, and each one was individually reasonable:
   *
   *   1. PROGRESS IS NOT IN THE FOLDER. It lives in the browser's own
   *      storage. Replacing the folder replaces the app and touches not one
   *      row of what he has done — which is why a clean copy changed nothing.
   *   2. THE IMPORT CANNOT UNDO A COMPLETION, on purpose: it takes
   *      `local.completed || row.completed` so a stale export can never
   *      un-finish real work.
   *   3. THERE WAS NO CONTROL ANYWHERE to mark a unit not-done.
   *
   * Together they made a wrongly-ticked unit permanent on that machine.
   *
   * And the reason it looked fine in the gradebook is the fourth thing: those
   * rows carry NO GRADE. The grades screen was showing her the truth — every
   * grade was right — while the thing pushing his lessons forward was
   * `completed`, which that screen never shows.
   */
  const store = read('src/store/useAppStore.js');
  const parent = read('src/components/Dashboard/ParentDashboard.jsx');

  ok('the store can mark a unit not-done', /async markKhanAcademyAssignmentNotDone\(id\)/.test(store));
  ok('it clears the grade with it', /grade: null,[\s\S]{0,80}gradePercent: null/.test(
    store.slice(store.indexOf('async markKhanAcademyAssignmentNotDone'), store.indexOf('async markKhanAcademyAssignmentNotDone') + 1200)),
    'a score belongs to a finished unit — leaving one attached is a worse record than either state');
  ok('it writes to disk, not just to state',
    /await updateKhanAcademyAssignmentRecord\(id, changes\)/.test(
      store.slice(store.indexOf('async markKhanAcademyAssignmentNotDone'), store.indexOf('async markKhanAcademyAssignmentNotDone') + 1400)));
  ok('it refuses on a unit that is not marked done',
    /if \(!existing \|\| !existing\.completed\) return \{ ok: false \};/.test(store));
  ok('XP and attendance are not clawed back',
    !/xp:/.test(store.slice(store.indexOf('async markKhanAcademyAssignmentNotDone'), store.indexOf('async markKhanAcademyAssignmentNotDone') + 1400)),
    'he did the work that earned them — taking points back would punish him for our bookkeeping');

  ok('she has a control for it on the grades screen', /'Not done'/.test(parent));
  ok('...and it asks twice, because it clears the grade', /Clear grade too\?/.test(parent));
  /**
   * And the confirm must NAME THE UNIT. Found by testing this button on her
   * live records: every graded unit is on screen at once, so there are eight
   * or more identical "Not done" buttons, and "Clear grade too?" is a question
   * with no subject. The wrong row was armed and un-finished that way.
   */
  ok('...and the armed state says which unit it is about to undo',
    /Putting <span className="font-700">\{row\.skillTitle\}<\/span> back on his list/.test(parent),
    'eight identical buttons and a subjectless question is how the wrong row gets cleared');
  ok('...and says what score it is about to clear',
    /clearing \$\{row\.gradePercent\}%/.test(parent),
    'the percentage is the part she cannot get back without a snapshot');
  ok('a completed-but-unscored unit is flagged where she reads grades',
    /Marked finished, never scored/.test(parent),
    'that combination is the signature of the wrong row being ticked, and it is invisible everywhere else');

  // The import must still refuse to un-finish work — that rule is what makes
  // a stale export safe, and this new control is the deliberate exception.
  ok('the import still only ever moves completion FORWARD',
    /Boolean\(local\.completed \|\| row\.completed\)/.test(store),
    'a stale file must never un-finish something he really did');

  /**
   * The receipt has to SURVIVE the undo. "Not done" clears the grade so she
   * can re-enter it; if it also cleared unitXpAwardedAt, every correction
   * would quietly pay him another 20 XP the next time she typed the score.
   */
  const nd = store.indexOf('async markKhanAcademyAssignmentNotDone');
  const notDone = store.slice(nd, nd + 1400);
  ok('undoing a completion does NOT tear up the XP receipt',
    !/unitXpAwardedAt: /.test(notDone),
    'otherwise fixing a mis-tick pays him for the unit a second time when it is graded for real');

  const pi = store.indexOf('async setKhanAcademyAssignmentPercent(');
  const percentFn = store.slice(pi, pi + 1200);
  ok('...and neither does clearing a grade',
    /const cleared = \{ gradePercent: null, gradeRaw: null, grade: null, gradedAt/.test(percentFn) &&
    !/cleared[\s\S]{0,140}unitXpAwardedAt/.test(percentFn));
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
