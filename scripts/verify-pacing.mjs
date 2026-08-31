// ---------------------------------------------------------------------------
// DOES EACH SUBJECT HAVE ENOUGH DAYS FOR WHAT IT IS CARRYING?
// Run: node scripts/verify-pacing.mjs
//
// ---- WHERE THIS CAME FROM (audit item O-3, Aug 26 2026) ----
//
// The 2:15 rotating block hands each specialized subject a fixed number of days
// per quarter, and each of those subjects carries a fixed amount of work.
// Nothing in this app had ever compared the two numbers. Every input was
// present — the lesson table, the week pattern, the holiday list, the quarter
// spans, and `liveRotatingSubjects`, which decides who owns a day — so the
// arithmetic was always possible and simply was never done. A quarter could be
// over-subscribed from August and the way you found out was running out of
// Thursdays in December.
//
// ---- WHAT THIS GUARD IS ACTUALLY FOR ----
//
// Not for freezing today's counts. She adds lessons; a check that asserts
// "Technology has 23 Q1 lessons" fails the first time she writes a 24th, and a
// guard that locks in yesterday's truth is worse than no guard.
//
// It asserts the PROPERTIES the report has to keep:
//
//   1. the Khan rows are demanded, not defaulted — the fault that made the
//      first draft of pacing.js report thirteen spare Aerospace days in a
//      quarter that has none;
//   2. Khan units count as load, because they land in block-9 like everything
//      else that subject does;
//   3. the days come from the real calendar, not from weeks x days;
//   4. the open Fridays are SHARED, so shortfalls add up before the buffer is
//      consulted;
//   5. "exactly enough" is its own state and is not reported as healthy;
//   6. the shipped Mission Control lesson table, on its own, still fits.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const P = await import(REPO + '/src/lib/pacing.js');
const { liveMorningSubject } = await import(REPO + '/src/lib/rotatingBlock.js');
const { QUARTER_SPANS } = await import(REPO + '/src/lib/yearPlan.js');
const { isSchoolDay } = await import(REPO + '/src/academies/lamar/data/schedule/schoolHolidays.js');
const { BLOCK_FOR_SUBJECT } = await import(REPO + '/src/lib/scheduledMinutes.js');
const { ROTATING_BLOCK_ID } = await import(REPO + '/src/lib/rotatingBlock.js');

let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
}
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');

/**
 * The file with every comment removed. A presence check whose subject is also
 * named in prose passes on the day the code is deleted and the comment stays —
 * this project has been caught by that eight times now.
 */
const codeOnly = (rel) =>
  read(rel)
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    .replace(/^\s*\/\/.*$/gm, '');

const Q1 = QUARTER_SPANS[0];
const rotatingRow = (subject, batchLabel, n) =>
  Array.from({ length: n }, (_, i) => ({
    subject,
    batchLabel,
    skillTitle: `synthetic ${subject} ${i + 1}`,
    completed: false,
    sequenceInQuarter: i + 1
  }));

console.log('\n--- 1. the Khan rows are demanded, never defaulted ---');
{
  /**
   * THE FAULT THIS PREVENTS, in full, because it is subtle and it already
   * happened once: `liveRotatingSubjects` treats a missing list as "I was not
   * told" and falls back to naming the day's first subject rather than drawing
   * an empty block. That is right on a screen — show more, not less — and
   * catastrophic in a calculation, because it hands days to subjects that have
   * nothing to teach and inflates every slack figure in the report.
   */
  for (const [label, bad] of [['null', null], ['undefined', undefined], ['a number', 3], ['an object', {}]]) {
    let threw = false;
    try { P.yearPacing(bad); } catch { threw = true; }
    ok(`yearPacing refuses ${label} rather than guessing`, threw,
      'a plausible wrong number is worse than an error');
  }
  let threwOnEmpty = false;
  try { P.yearPacing([]); } catch { threwOnEmpty = true; }
  ok('...but an empty array is a legitimate answer and is accepted', !threwOnEmpty,
    '"there is no Khan work" is a real state, not a missing argument');

  let quarterThrew = false;
  try { P.quarterPacing(Q1, null); } catch { quarterThrew = true; }
  ok('quarterPacing enforces it too, not just the year wrapper', quarterThrew,
    'a rule enforced at one call site is not a rule');
  let ownedThrew = false;
  try { P.ownedDaysInQuarter(Q1, null); } catch { ownedThrew = true; }
  ok('...and so does ownedDaysInQuarter, which is where it actually matters', ownedThrew);
}

console.log('\n--- 2. Khan units are load, because they land in the same block ---');
{
  /**
   * The premise, asserted rather than assumed: every rotating subject sends its
   * Khan tick to block-9. If that ever stops being true this check fails here
   * instead of the report quietly double-booking a subject's days.
   */
  ok('every rotating subject credits the rotating block',
    P.ROTATING_SUBJECTS.every((s) => BLOCK_FOR_SUBJECT[s] === ROTATING_BLOCK_ID),
    P.ROTATING_SUBJECTS.map((s) => `${s}->${BLOCK_FOR_SUBJECT[s]}`).join(' '));

  const base = P.quarterPacing(Q1, []);
  const withKhan = P.quarterPacing(Q1, rotatingRow('aerospace', Q1.batchLabel, 5));
  const beforeRow = base.rows.find((r) => r.subject === 'aerospace');
  const afterRow = withKhan.rows.find((r) => r.subject === 'aerospace');
  ok('five Khan units raise that subject\'s load by five',
    afterRow.needs === beforeRow.needs + 5,
    `${beforeRow.needs} -> ${afterRow.needs}`);
  ok('...and are reported separately from the lessons, so the working is visible',
    afterRow.khanUnits === 5 && afterRow.lessons === beforeRow.lessons);
  ok('...and the breakdown sentence names both', /lessons \+ 5 Khan units/.test(P.loadBreakdown(afterRow)),
    P.loadBreakdown(afterRow));

  /**
   * A Khan row for math must not touch this report. Math has its own daily
   * block; counting it here would charge the rotating block for work that never
   * enters it.
   */
  const withMath = P.quarterPacing(Q1, rotatingRow('math', Q1.batchLabel, 9));
  ok('Khan units for a non-rotating subject change nothing',
    JSON.stringify(withMath.rows.map((r) => [r.subject, r.needs])) ===
      JSON.stringify(base.rows.map((r) => [r.subject, r.needs])));

  /** Another quarter's rows are another quarter's problem. */
  const otherQuarter = P.quarterPacing(Q1, rotatingRow('aerospace', 'Q3 2026-2027', 9));
  ok('Khan units batched to a different quarter change nothing',
    otherQuarter.rows.find((r) => r.subject === 'aerospace').needs === beforeRow.needs);
}

console.log('\n--- 3. the days are walked, not multiplied ---');
{
  /**
   * School holidays land unevenly. A quarter with two Mondays off has two fewer
   * Aerospace days than weeks x days says, and getting that wrong in the
   * optimistic direction is how a pacing report reassures you into a problem.
   * The test: every school day in the span is either owned by somebody or open.
   * Nothing is invented and nothing goes missing.
   */
  let totalMorningSlots = 0;
  for (const span of QUARTER_SPANS) {
    const { owned, openDays } = P.ownedDaysInQuarter(span, []);
    let schoolDays = 0;
    const start = new Date(span.start + 'T12:00:00');
    const end = new Date(span.end + 'T12:00:00');
    for (const d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      if (isSchoolDay(d)) schoolDays += 1;
    }
    /**
     * ---- A DAY CAN NOW YIELD TWO OWNED SLOTS. (Aug 29, 2026.) ----
     *
     * Science gave up Tuesday at 10:30 so Social Studies could run twice a
     * week, so a Tuesday is owned by Social Studies in the morning AND by
     * Technology at 2:15. The old invariant — owned + open === school days —
     * was true only while there was one rotating block, and it fails now for
     * the right reason.
     *
     * The property it was really protecting is unchanged and still worth
     * asserting: **nothing is invented and nothing goes missing.** Expressed
     * against the real calendar, that is now "every school day is accounted
     * for once at 2:15, plus one extra for each day the morning slot is taken".
     */
    let morningSlots = 0;
    for (const d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      if (!isSchoolDay(d)) continue;
      if (liveMorningSubject(d, [])) morningSlots += 1;
    }
    const accounted = Object.values(owned).reduce((n, v) => n + v, 0) + openDays;
    ok(`${span.batchLabel}: every school day is accounted for, none invented`,
      accounted === schoolDays + morningSlots,
      `${accounted} accounted vs ${schoolDays} school days + ${morningSlots} morning slots`);
    totalMorningSlots += morningSlots;
  }
}

console.log('\n--- 4. the open Fridays are shared, so shortfalls add up first ---');
{
  /**
   * The mistake this rules out: asking "is this subject's shortfall smaller
   * than the buffer?" once per subject. Two subjects each four days short in a
   * quarter with six open Fridays both pass that test and the quarter is still
   * two days short. The buffer is one pool.
   */
  const q = P.quarterPacing(Q1, []);
  const openDays = q.openDays;
  ok('Q1 has open Fridays to reason about at all', openDays > 0, String(openDays));

  /**
   * The two subjects are looked UP rather than named, so this section keeps
   * testing the rule after she reallocates a day in weekPattern.js. Naming
   * them would make a scheduling change look like a pacing bug.
   */
  const [a, b] = q.rows.filter((r) => r.days > 0).map((r) => r.subject);
  ok('Q1 has at least two subjects owning days, which is what makes a shared pool a question',
    Boolean(a && b), q.rows.map((r) => `${r.subject}:${r.days}`).join(' '));

  /** Each subject overshoots by a bit more than half the pool. */
  const half = Math.ceil((openDays + 2) / 2);
  const surplus = (subject) => {
    const row = q.rows.find((r) => r.subject === subject);
    return Math.max(0, row.slack) + half;
  };
  const overloaded = P.quarterPacing(Q1, [
    ...rotatingRow(a, Q1.batchLabel, surplus(a)),
    ...rotatingRow(b, Q1.batchLabel, surplus(b))
  ]);
  ok('two subjects that each fit the buffer alone still fail together',
    overloaded.fits === false && overloaded.over.length >= 2,
    `shortfall ${overloaded.shortfall} vs ${overloaded.openDays} open, over=[${overloaded.over}]`);
  ok('...and the shortfall is the sum of both, not the larger of the two',
    overloaded.shortfall >= half * 2, String(overloaded.shortfall));

  /**
   * AND THE SENTENCE SAYS WHY. A row four days short in a quarter with seven
   * open Fridays cannot explain itself from its own numbers — "only 7 Fridays
   * to absorb 4 days, this does not fit" is a sentence that argues against
   * itself. It has to name the pool the other subject already spent.
   */
  const overRow = overloaded.rows.find((r) => r.state === 'over' && -r.slack < overloaded.openDays);
  ok('a row short by less than the whole pool explains that the pool is already spent',
    Boolean(overRow) && /whole quarter is/.test(P.pacingNote(overRow, overloaded)),
    overRow ? P.pacingNote(overRow, overloaded) : 'no such row to test');

  /** One subject short by less than the pool is buffered, not broken. */
  const oneOver = q.rows.find((r) => r.days > 0);
  const small = P.quarterPacing(
    Q1,
    rotatingRow(oneOver.subject, Q1.batchLabel, Math.max(0, oneOver.slack) + 1)
  );
  const smallRow = small.rows.find((r) => r.subject === oneOver.subject);
  ok('one day over, with Fridays free, reads as buffered rather than broken',
    smallRow.state === 'buffered' && small.fits === true,
    `${smallRow.state} slack=${smallRow.slack}`);
  ok('...and fridaysLeft says what the buffer has left afterwards',
    small.fridaysLeft === small.openDays - small.shortfall,
    `${small.fridaysLeft} of ${small.openDays}`);
}

console.log('\n--- 5. "exactly enough" is not reported as healthy ---');
{
  /**
   * A subject with zero slack is not comfortable, it is brittle: one sick day
   * and the quarter cannot recover. Reporting it as "fits" is the single most
   * misleading thing this module could do, so zero slack has its own state and
   * its own sentence.
   */
  const q = P.quarterPacing(Q1, []);
  /** A subject with room to fill, so the boundary can be walked up to. */
  const spare = q.rows.filter((r) => r.slack >= 2).sort((x, y) => y.slack - x.slack)[0];
  ok('Q1 has a subject with spare days to fill, so the boundary is testable',
    Boolean(spare), q.rows.map((r) => `${r.subject}:${r.slack}`).join(' '));

  const at = (n) =>
    P.quarterPacing(Q1, rotatingRow(spare.subject, Q1.batchLabel, n))
      .rows.find((r) => r.subject === spare.subject);

  const exactRow = at(spare.slack);
  ok('zero slack is "tight", never "ok"', exactRow.state === 'tight' && exactRow.slack === 0,
    `${exactRow.state} slack=${exactRow.slack}`);
  ok('...and one spare day is "ok", so the boundary is where it claims to be',
    at(spare.slack - 1).state === 'ok', at(spare.slack - 1).state);
  ok('...and one day past it is not "tight" either', at(spare.slack + 1).state !== 'tight',
    at(spare.slack + 1).state);

  const exact = P.quarterPacing(Q1, rotatingRow(spare.subject, Q1.batchLabel, spare.slack));
  ok('the quarter lists its tight subjects, so a card can surface them without rescanning',
    exact.tight.includes(spare.subject), `[${exact.tight}]`);
  /**
   * ---- AND THE SENTENCE TELLS THE TRUTH ABOUT WHICH KIND OF TIGHT IT IS ----
   *
   * "One sick day and this quarter cannot catch up" is right only when the
   * Fridays are gone. Q1 Aerospace is zero-slack with four open Fridays behind
   * it — a missed Monday has somewhere to go, and crying wolf there teaches her
   * to scroll past the row that matters.
   */
  ok('a tight subject with Fridays left is told where a missed day goes',
    exact.fridaysLeft > 0 && /still free/.test(P.pacingNote(exactRow, exact)) &&
      !/cannot catch up/.test(P.pacingNote(exactRow, exact)),
    P.pacingNote(exactRow, exact));
  ok('...and a tight subject with the Fridays already spent gets the real alarm',
    /cannot catch up/.test(P.pacingNote(exactRow, { ...exact, fridaysLeft: 0 })),
    P.pacingNote(exactRow, { ...exact, fridaysLeft: 0 }));
}

console.log('\n--- 6. the floor is declared wherever Khan units are counted ---');
{
  /**
   * One Khan unit is counted as one day. The dashboard's own comment says a
   * unit is "three or four school days", so every figure involving Khan work is
   * a FLOOR — and a floor presented as an estimate is the reassurance this
   * module exists to stop giving. The caveat therefore travels with the number.
   */
  const clean = P.quarterPacing(Q1, []);
  const withKhan = P.quarterPacing(Q1, rotatingRow('aerospace', Q1.batchLabel, 3));
  ok('a quarter with no Khan units in the block is not flagged as a floor', clean.khanDriven === false);
  ok('...and one with them is', withKhan.khanDriven === true);
  ok('the quarter sentence carries the caveat only when it applies',
    /one day/.test(P.quarterPacingNote(withKhan)) && !/one day/.test(P.quarterPacingNote(clean)),
    P.quarterPacingNote(withKhan));
  const khanRow = withKhan.rows.find((r) => r.subject === 'aerospace');
  const cleanRow = clean.rows.find((r) => r.subject === 'aerospace');
  ok('a row sentence says "at least" when Khan units are in the count',
    /at least/.test(P.pacingNote(khanRow, withKhan)),
    P.pacingNote(khanRow, withKhan));
  ok('...and does not when the load is lessons only',
    !/at least/.test(P.pacingNote(cleanRow, clean)),
    P.pacingNote(cleanRow, clean));
}

console.log('\n--- 7. the shipped lesson table still fits on its own ---');
{
  /**
   * The one check about real content, written so that adding a lesson does not
   * break it. It asserts no counts. It asserts that the Mission Control lesson
   * table alone — before a single Khan unit is assigned — does not put any
   * rotating subject beyond the Friday buffer in any quarter.
   *
   * If this ever fails, the quarter named in the failure is over-subscribed by
   * lessons alone, which no amount of Khan-unit accounting will rescue.
   */
  for (const q of P.yearPacing([])) {
    ok(`${q.quarter} fits on Mission Control lessons alone`, q.fits,
      q.over.map((s) => `${s} over`).join(', '));
  }

  /**
   * IDLE MEANS NOTHING TO TEACH, NOT NOTHING IN MISSION CONTROL — and that
   * distinction is the whole reason Khan units are counted here. Social Studies
   * runs entirely on Khan Academy in Q1 and again over Summer. Called idle, it
   * would read as thirteen wasted Wednesdays in a quarter where it has ten
   * units to get through, and that misreading is exactly what the first draft
   * of this module produced.
   */
  const khanOnly = P.ROTATING_SUBJECTS.find(
    (s) => P.quarterPacing(Q1, []).rows.every((r) => r.subject !== s)
  );
  ok('Q1 has a subject carrying no Mission Control lessons, which is what idle has to get right',
    Boolean(khanOnly), String(khanOnly));
  const seeded = P.quarterPacing(Q1, rotatingRow(khanOnly, Q1.batchLabel, 6));
  const seededRow = seeded.rows.find((r) => r.subject === khanOnly);
  /**
   * `needs === 6` was pinned here while one Khan unit counted as one day. That
   * floor is gone — a unit now costs what it was measured to cost — so the
   * number moves whenever the measurement improves, and pinning it would make
   * this guard fail every time the model got MORE accurate.
   *
   * The property is what it always was: a subject carrying Khan work and no
   * Mission Control lessons is not idle, and its load is at least one day per
   * unit. Both survive any future re-measurement.
   */
  ok('a Khan-only subject is not called idle — it has six units to get through',
    seededRow && seededRow.state !== 'idle' && seededRow.needs >= 6,
    seededRow ? `${seededRow.state} needs=${seededRow.needs}` : 'no row at all');
  ok('...and its six units cost at least six days, never fewer',
    seededRow && seededRow.khanUnits === 6 && seededRow.khanUnitDays >= 6,
    seededRow ? `units=${seededRow.khanUnits} days=${seededRow.khanUnitDays}` : 'no row');
  ok('...and idle still exists for a subject that truly has nothing',
    P.pacingNote(
      { state: 'idle', days: 4, needs: 0, slack: 4, khanUnits: 0 },
      { openDays: 7, shortfall: 0 }
    ).includes('nothing scheduled'));
}

console.log('\n--- 8. the report reaches a screen ---');
{
  /**
   * The recurring fault in this whole project: the app knew and the screen
   * never said. A pacing module nothing renders is that fault with extra steps,
   * so the wiring is checked against the CODE, not the comments explaining it.
   */
  const yearPlan = codeOnly('src/components/Dashboard/YearPlanSection.jsx');
  ok('the year planner imports the pacing panel',
    /import \{ PacingSection \} from '\.\/PacingSection\.jsx'/.test(yearPlan));
  ok('...and renders it', /<PacingSection\s*\/>/.test(yearPlan));
  ok('...behind a zoom the parent can actually reach',
    /id: 'pacing'/.test(yearPlan) && /zoom === 'pacing'/.test(yearPlan));

  const panel = codeOnly('src/components/Dashboard/PacingSection.jsx');
  ok('the panel reads the Khan rows from the store rather than omitting them',
    /useAppStore\(\(s\) => s\.khanAcademyAssignments\)/.test(panel),
    'omitting them is the exact fault check 1 exists for');
  ok('...and shows the working — what a subject carries, and the days it owns',
    /loadBreakdown\(row\)/.test(panel) && /row\.days/.test(panel));
  ok('...and prints the sentence beside the number',
    /pacingNote\(row, quarter\)/.test(panel),
    'a figure with no sentence is a figure somebody has to interpret at the end of a long day');
  ok('...and states the one-day-per-unit floor on the screen, not only in the source',
    /three or four/.test(read('src/components/Dashboard/PacingSection.jsx')));
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
