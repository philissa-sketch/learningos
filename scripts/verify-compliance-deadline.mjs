// ---------------------------------------------------------------------------
// THE DECLARATION BANNER ANSWERS THE TICK. Run: node scripts/verify-compliance-deadline.mjs
//
// ---- WHERE THIS CAME FROM (Aug 21, 2026) ----
//
// The parent: "I ticked that i completed the Declaration of Intent in the
// parent dashboard. The app still shows that it is due."
//
// It did, and it always would have. The banner was computed from the calendar
// alone and never once read `complianceChecks['declaration-of-intent']` — the
// only record that she had done it. Ticking the box changed the checklist and
// nothing else, so the single item on that screen with a real legal date sat
// permanently reading "due" whatever she did.
//
// Her record at the time: the tick was there, done, completedAt 2026-08-21.
// The app had it and never asked.
// ---------------------------------------------------------------------------
import './lib/academy-under-test.mjs';
import { readsFromAcademy } from './lib/reads-content.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const gc = await import(REPO + '/src/academies/lamar/data/admin/georgiaCompliance.js');

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

const SRC = 'src/components/Dashboard/ComplianceSection.jsx';
const src = read(SRC);
const code = codeOnly(src);

console.log('\n--- 1. the banner reads the tick at all ---');
{
  ok('it looks up the declaration check',
    /complianceChecks\['declaration-of-intent'\]/.test(code),
    'the whole bug: the banner was pure calendar arithmetic');
  ok('...and the checks are subscribed',
    /const complianceChecks = useAppStore\(\(s\) => s\.complianceChecks\);/.test(code));
  ok('...and only a DONE tick counts',
    /declarationCheck\?\.done \? declarationCheck\.completedAt \|\| null : null/.test(code),
    'un-ticking it has to bring the deadline back');
  /**
   * THE CHECK THAT ACTUALLY BITES. The arithmetic below is exercised against a
   * mirror of the rule, which proves the RULE is right and proves nothing about
   * the component — reverting the component to `nextDeclarationDeadline(today)`
   * left every one of those cases passing. So the component's own expression is
   * pinned here: the deadline must be a function of whether she has filed.
   */
  ok('the deadline the banner shows depends on the tick',
    /const deadline = filedForThisYear\s*\n?\s*\?/.test(code),
    'a deadline computed from the calendar alone is the bug she reported');
  ok('...and rolls to the FOLLOWING September once filed',
    /Number\(today\.slice\(0, 4\)\) \+ \(today <= nextDeclarationDeadline\(today\) \? 1 : 2\)/.test(code),
    'filing in August 2026 covers 2026-27, so the next one is September 2027');
  /**
   * ---- THIS CHECK PINNED THE BUG (rewritten Aug 26, 2026) ----
   *
   * It asserted the component contained
   * `toDateStr(new Date(year - 1, 8, 1))` — the "after last September 1" test —
   * and that test is WRONG for a Declaration filed even two days late. So the
   * guard was holding a compliance bug in place and passing, which is the third
   * time this week a check has asserted punctuation instead of a property.
   *
   * The property: the banner decides "filed" by asking whether the tick belongs
   * to the same SCHOOL YEAR, through the shared rule — not by re-deriving a date
   * comparison of its own, which is how the two came to disagree.
   */
  ok('the filed test asks whether the tick covers THIS school year',
    /declarationCoversToday\(declarationFiledAt, today\)/.test(code),
    'a September-1 comparison calls a late filing from last year this year\'s');
  ok('...through the shared rule, not a second copy of the arithmetic',
    readsFromAcademy(code, 'declarationCoversToday'),
    'two implementations of one legal rule is how they drift');
}

console.log('\n--- 2. the arithmetic, on the cases that actually occur ---');
{
  /**
   * Mirrors the component. Georgia's declaration is annual, due September 1,
   * and the record keeps ONE entry per requirement rather than one per year —
   * so the test is whether the tick is newer than the last September 1 that
   * has already gone by.
   */
  const toDateStr = (d) => {
    const p = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
  };
  /**
   * The REAL rule now, imported — not mirrored. A test that reimplements the
   * thing it is testing proves only that my copy agrees with itself, and this
   * one did: it mirrored the September-1 comparison and therefore agreed with
   * the bug on every case below.
   */
  const calc = (today, filedAt) => {
    const filedForThisYear = gc.declarationCoversToday(filedAt, today);
    const deadline = filedForThisYear
      ? toDateStr(new Date(Number(today.slice(0, 4)) + (today <= gc.nextDeclarationDeadline(today) ? 1 : 2), 8, 1))
      : gc.nextDeclarationDeadline(today);
    return { filedForThisYear, deadline };
  };

  const cases = [
    ['2026-08-21', null, false, '2026-09-01', 'not filed, before Sep 1'],
    ['2026-08-21', '2026-08-21T16:49:04Z', true, '2027-09-01', 'filed today — HER CASE'],
    ['2026-09-15', '2026-08-21T16:49:04Z', true, '2027-09-01', 'filed in Aug, now past Sep 1'],
    ['2026-09-15', null, false, '2027-09-01', 'not filed, past Sep 1'],
    ['2027-08-01', '2026-08-21T16:49:04Z', false, '2027-09-01', "LAST year's tick, new year"],
    ['2027-08-01', '2027-07-30T10:00:00Z', true, '2028-09-01', 'filed for this year'],
    /**
     * ---- THE CASES THE OLD RULE GOT WRONG ----
     *
     * Filing a few days late is not exotic. Under "after last September 1"
     * every one of these read as FILED the following August, and the banner
     * would have sat green through a deadline she had actually missed.
     */
    ['2027-08-20', '2026-09-03T10:00:00Z', false, '2027-09-01', 'filed 2 days LATE for 26-27 — still due for 27-28'],
    ['2027-08-20', '2026-10-15T10:00:00Z', false, '2027-09-01', 'filed in October for 26-27 — still due for 27-28'],
    ['2027-08-20', '2027-01-20T10:00:00Z', false, '2027-09-01', 'filed in January for 26-27 — still due for 27-28'],
    /** ...and the cases it must NOT break while fixing those. */
    ['2027-02-10', '2026-10-15T10:00:00Z', true, '2028-09-01', 'a late filing still covers the year it was for'],
    ['2026-08-26', '2026-08-21T16:49:04Z', true, '2027-09-01', 'HER REAL TICK, on the day she confirmed it']
  ];
  for (const [today, filedAt, wantFiled, wantDeadline, label] of cases) {
    const r = calc(today, filedAt);
    ok(`${label}`,
      r.filedForThisYear === wantFiled && r.deadline === wantDeadline,
      `got filed=${r.filedForThisYear} next=${r.deadline}`);
  }
  ok("a stale tick does NOT keep the banner quiet forever",
    calc('2027-08-01', '2026-08-21T16:49:04Z').filedForThisYear === false,
    'one entry per requirement, not per year — the year has to be checked');
}

console.log('\n--- 3. what it says, and what it must not claim ---');
{
  ok('a filed year says Filed, not Next deadline',
    /filedForThisYear \? 'Filed' : 'Next deadline'/.test(code));
  ok('...and still names the NEXT date rather than going silent',
    /The next one is due/.test(src),
    'a banner that just disappears leaves her with no date at all');
  ok('...and says when she marked it done',
    /You marked this done/.test(src));
  ok('the honesty line survives',
    /This records what you told the app\. It files nothing with the state\./.test(src),
    'a tick is her saying she filed it; the app has sent nothing to anybody');
  ok('the amber styling is tied to the deadline, not hard-coded',
    /daysLeft <= 45 \? 'border-signal-amber/.test(code));
}

console.log('\n--- 4. reflections: a row that collapses N clears N ---');
{
  /**
   * The parent, the same evening: "I responded and marked read and nothing
   * happened."
   *
   * Something did — her reply and the readAt were both written and both were
   * in the database. What did not happen is the row going away. It reads
   * "3 attempts, newest shown", it is answered once, and it cleared exactly
   * one of the three; the group came back with attempts: 2 and a different
   * word count, which is indistinguishable from nothing happening.
   */
  const board = codeOnly(read('src/components/Dashboard/MissionControlBoard.jsx'));
  ok('the group keeps every attempt id',
    /seen\.ids\.push\(e\.id\);/.test(board) && /ids: \[e\.id\]/.test(board),
    'grouping used to discard them, so only the newest could ever be cleared');
  ok('...and replying marks all of them read',
    /for \(const otherId of \(e\.ids \|\| \[\]\)\.filter\(\(id\) => id !== e\.id\)\) \{/.test(board)
      && /respondToSelfExplanation\(otherId, ''\);/.test(board));
  ok('...with the note landing only on the one she read',
    /respondToSelfExplanation\(e\.id, note\);/.test(board),
    'the others are earlier drafts of the same answer, not things she replied to');
  ok('the count she sees is the group count',
    /const reflectionsUnread = \[\.\.\.byBeat\.values\(\)\]/.test(board));
}

console.log('\n--- 5. EVERY screen that mentions the Declaration reads her tick ---');
{
  /**
   * =====================================================================
   * THE SAME COMPLAINT, TWICE, FIVE DAYS APART.
   * =====================================================================
   *
   * Aug 21: *"I ticked that I completed the Declaration of Intent in the parent
   * dashboard. The app still shows that it is due."*
   * Aug 26: *"i dont want that there"* — a screenshot of the Mission Control
   * Board still counting down to a deadline she had already met.
   *
   * The August 21 fix went into ComplianceSection and stopped there. The board
   * called `nextDeclarationDeadline(today)` and nothing else, and did not even
   * SUBSCRIBE to complianceChecks — so it could not have noticed. Two screens,
   * one legal question, one of them fixed.
   *
   * FIXING ONE CALL SITE IS NOT FIXING A RULE. This section is the rule: any
   * file that renders the Declaration deadline must decide through the shared
   * helper and must subscribe to the tick that feeds it. A fourth screen fails
   * here rather than in a screenshot.
   */
  const files = fs.readdirSync(path.join(REPO, 'src/components/Dashboard'))
    .filter((f) => f.endsWith('.jsx'))
    .map((f) => ['src/components/Dashboard/' + f, codeOnly(read('src/components/Dashboard/' + f))]);

  const mentions = files.filter(([, c]) => /nextDeclarationDeadline\(/.test(c));
  ok('at least the two known screens render this deadline', mentions.length >= 2,
    mentions.map(([f]) => path.basename(f)).join(', '));

  for (const [rel, code] of mentions) {
    const name = path.basename(rel);
    ok(`${name} decides "filed" through the shared rule`,
      /declarationCoversToday\(/.test(code),
      'a second date comparison is how these two screens came to disagree');
    ok(`${name} subscribes to the tick it depends on`,
      /useAppStore\(\(s\) => s\.complianceChecks\)/.test(code),
      'an unsubscribed source cannot notice she has done the thing it is nagging her about');
  }

  const board = codeOnly(read('src/components/Dashboard/MissionControlBoard.jsx'));
  ok('the board hides the card once it is filed rather than always showing it',
    /!board\.declarationFiled &&/.test(board),
    'a board promising items disappear when the work is done must let this one disappear');
  ok('...and complianceChecks is in the memo dependencies',
    /complianceChecks\s*\n?\s*\]\)/.test(board),
    'computed once and never recomputed is the same silence in a different shape');
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
