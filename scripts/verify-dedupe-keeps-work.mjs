import './lib/academy-under-test.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * =============================================================================
 * CLEANING UP DUPLICATES MUST NEVER COST ANYBODY THEIR WORK.
 * =============================================================================
 *
 * WHY THIS EXISTS. (Sept 28, 2026.)
 *
 * The parent: **"I have graded and the app removed the grades, also, he had due
 * dates changed because work was due too close together and now all those have
 * reverted back."**
 *
 * Both halves were one function. Duplicate assignments keyed by slotId were
 * resolved with `group.find(hasRealWork)`, where hasRealWork was
 * `Boolean(a.title) || a.status !== 'placeholder' || a.milestones?.length`.
 *
 * Every seeded assignment has a title. So every copy passed, `find` returned
 * whichever sat first in the array, and the rest were DELETED. When a fresh
 * seed copy sorted ahead of her real one, the row holding her grade and her
 * rescheduled date was permanently removed and the seed copy took its place —
 * grades gone, dates reverted, silently, on hydrate.
 *
 * The test also named nothing she does: not a grade, not feedback, not a due
 * date she moved, not a rubric score.
 *
 * The properties held here are about the LOGIC, tested directly, because the
 * failure is invisible from any screen and only shows up weeks later as work
 * that has quietly gone.
 *
 *   1. A copy carrying a grade always beats one that does not.
 *   2. A copy carrying a due date she chose — always LATER than the shipped
 *      one — beats the shipped date, and a date EARLIER than shipped loses.
 *   3. When two copies each carry different work, nothing is lost — the
 *      keeper is topped up from the losers before they are deleted.
 *   4. A keeper's own values are never overwritten by a loser's.
 *   5. Rows she created herself are never touched.
 *   6. The write that rescues work happens BEFORE the delete.
 */

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');
const strip = (src) => src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

let passed = 0;
const failures = [];
const ok = (label, cond, detail = '') => {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
};

/**
 * The scorer and the deduper are closures inside hydrate() and cannot be
 * imported. They are lifted out of the source and evaluated here, so this
 * tests the SHIPPED text rather than a copy that could drift from it.
 */
const src = read('src/store/useAppStore.js');
const grab = (startMarker, endMarker) => {
  const i = src.indexOf(startMarker);
  if (i < 0) throw new Error(`could not find ${startMarker} in the store`);
  const j = src.indexOf(endMarker, i);
  if (j < 0) throw new Error(`could not find the end of ${startMarker}`);
  return src.slice(i, j);
};

const lifted = [
  // Module scope, referenced by both the scorer and the rescue pass. Lifted
  // from the store rather than restated here, so a change to the tuple shows
  // up in this test instead of drifting past it.
  grab("const SCHEDULE_EDIT_FIELDS = [", '\n'),
  grab('const WORK_FIELDS = [', 'function dedupeBySlot'),
  grab('function dedupeBySlot(', '\n    const seededDueDate')
].join('\n');
const { dedupeBySlot, workScore, SCHEDULE_EDIT_FIELDS } = await import(
  'data:text/javascript;base64,' +
  Buffer.from(lifted + '\nexport { dedupeBySlot, workScore, SCHEDULE_EDIT_FIELDS };').toString('base64')
);

console.log('\n--- 0. the logic was found and lifted ---');
ok('the deduper was lifted from the shipped store', typeof dedupeBySlot === 'function');
ok('the scorer was lifted from the shipped store', typeof workScore === 'function');

const SEED_DUE = '2026-09-25';
const seedCopy = (over = {}) => ({
  id: 1, slotId: 'asg::science::Q1::1', title: 'Cell model', status: 'placeholder',
  dueDate: SEED_DUE, grade: null, ...over
});
const run = (rows) => dedupeBySlot(rows, (r) => workScore(r, SEED_DUE));

console.log('\n--- 1. a grade always wins ---');
{
  // Her real row is SECOND in the array — the exact arrangement that lost.
  const rows = [seedCopy({ id: 1 }), seedCopy({ id: 2, grade: 92, gradedAt: '2026-09-26' })];
  const { idsToDelete } = run(rows);
  ok('the graded copy is kept even when the seed copy sorts first',
    idsToDelete.includes(1) && !idsToDelete.includes(2),
    `deleted ${JSON.stringify(idsToDelete)} — this is the arrangement that deleted her grade`);
}
{
  const rows = [seedCopy({ id: 1, grade: 88 }), seedCopy({ id: 2 })];
  ok('...and when it sorts first', run(rows).idsToDelete.join() === '2');
}

console.log('\n--- 2. a due date she chose wins ---');
{
  const rows = [seedCopy({ id: 1 }), seedCopy({ id: 2, dueDate: '2026-10-09' })];
  const { idsToDelete } = run(rows);
  ok('the rescheduled copy is kept', idsToDelete.join() === '1',
    `deleted ${JSON.stringify(idsToDelete)} — she moved this one because the week was overloaded`);
}
{
  const rows = [seedCopy({ id: 1 }), seedCopy({ id: 2 })];
  ok('two untouched copies still resolve to the lower id', run(rows).idsToDelete.join() === '2');
}
{
  /**
   * The asymmetry, and why it is not symmetric. (Sept 28, 2026.)
   *
   * This parent has only ever moved a date LATER, and has said why twice:
   * "work was due too close together", and "there were projects due before he
   * was given the assignments."
   *
   * A date EARLIER than the shipped one is therefore not a choice of hers, it
   * is a row that predates a correction. The first version of the scorer said
   * `!== seedDueDate`, which scored those stale rows fifty points above the
   * corrected copy — so the deduper would have deleted the corrected row and
   * put the too-early date back on his board. The bug, rebuilt inside its fix.
   */
  const rows = [seedCopy({ id: 1 }), seedCopy({ id: 2, dueDate: '2026-08-14' })];
  ok('a date EARLIER than the shipped one loses to the shipped one',
    run(rows).idsToDelete.join() === '2',
    'an earlier date is a row from before a correction, not a date she picked');
}
{
  const rows = [seedCopy({ id: 1, dueDate: '2026-08-14' }), seedCopy({ id: 2, dueDate: '2026-10-09' })];
  ok('a date she moved later beats a stale earlier one',
    run(rows).idsToDelete.join() === '1');
}

console.log('\n--- 3. when each copy holds different work, nothing is lost ---');
{
  const hers = seedCopy({ id: 1, grade: 90, gradedAt: '2026-09-26', feedback: 'Good labels' });
  const his = seedCopy({
    id: 2, status: 'completed', completedAt: '2026-09-24', startedAt: '2026-09-20',
    photoUrl: 'https://drive.google.com/x', finalText: 'The cell model I built...'
  });
  const { idsToDelete, rescued } = run([hers, his]);
  ok('one copy is kept', idsToDelete.length === 1);
  const patch = rescued[0]?.patch || {};
  const keptId = idsToDelete.includes(1) ? 2 : 1;
  ok('the work from the deleted copy is carried over first', rescued.length === 1,
    JSON.stringify(rescued));
  const survives = (field, value) =>
    (keptId === 1 ? hers : his)[field] === value || patch[field] === value;
  ok('his completion survives', survives('completedAt', '2026-09-24'));
  ok('his photo survives', survives('photoUrl', 'https://drive.google.com/x'));
  ok('his writing survives', survives('finalText', 'The cell model I built...'));
  ok('her grade survives', survives('grade', 90));
  ok('her feedback survives', survives('feedback', 'Good labels'));
}

console.log('\n--- 3b. a reschedule she stamped is not a gap, and is not lost ---');
{
  ok('the schedule tuple is the one the store declares',
    Array.isArray(SCHEDULE_EDIT_FIELDS)
      && SCHEDULE_EDIT_FIELDS.join() === 'title,dueDate,type,note',
    `got ${JSON.stringify(SCHEDULE_EDIT_FIELDS)}`);
}
{
  /**
   * THE CASE THAT MADE THIS RULE. The graded copy wins on score, as it must.
   * The losing copy is the one she rescheduled. The fill-a-gap rescue cannot
   * carry the date, because the keeper's dueDate is not empty -- it is just
   * the old one. Before the stamped-tuple rescue existed, her new date was
   * deleted with the row and the board went back to the shipped date.
   */
  const rows = [
    seedCopy({ id: 1, grade: 92, gradedAt: '2026-09-26' }),
    seedCopy({ id: 2, dueDate: '2026-10-09', scheduleUpdatedAt: '2026-09-28T14:00:00.000Z' })
  ];
  const { idsToDelete, rescued } = run(rows);
  ok('the graded copy is still the keeper', idsToDelete.join() === '2');
  const patch = rescued.find((r) => r.id === 1)?.patch || {};
  ok('...and her rescheduled date is carried onto it before the delete',
    patch.dueDate === '2026-10-09',
    `patch was ${JSON.stringify(patch)} — the keeper already had a date, so the gap rule cannot do this`);
  ok('...along with the stamp, so the next merge knows how new it is',
    patch.scheduleUpdatedAt === '2026-09-28T14:00:00.000Z');
}
{
  // A keeper that holds the NEWER stamp must not be dragged backwards.
  const rows = [
    seedCopy({ id: 1, grade: 92, dueDate: '2026-11-02', scheduleUpdatedAt: '2026-09-28T18:00:00.000Z' }),
    seedCopy({ id: 2, dueDate: '2026-10-09', scheduleUpdatedAt: '2026-09-28T14:00:00.000Z' })
  ];
  const patch = run(rows).rescued.find((r) => r.id === 1)?.patch || {};
  ok('an older stamped edit never overwrites a newer one',
    patch.dueDate === undefined,
    `patch was ${JSON.stringify(patch)}`);
}
{
  // An unstamped loser has no evidence behind it and must change nothing.
  const rows = [
    seedCopy({ id: 1, grade: 92 }),
    seedCopy({ id: 2, dueDate: '2026-08-14' })
  ];
  const patch = run(rows).rescued.find((r) => r.id === 1)?.patch || {};
  ok('an unstamped loser cannot move the keeper\'s date',
    patch.dueDate === undefined,
    `patch was ${JSON.stringify(patch)} — a stale pre-correction row must not win`);
}
{
  // A stamped loser with no title on it must not blank the keeper's title.
  const rows = [
    seedCopy({ id: 1, grade: 92 }),
    seedCopy({ id: 2, title: null, dueDate: '2026-10-09', scheduleUpdatedAt: '2026-09-28T14:00:00.000Z' })
  ];
  const patch = run(rows).rescued.find((r) => r.id === 1)?.patch || {};
  ok('a titleless loser cannot blank the keeper',
    patch.title === undefined && patch.dueDate === undefined,
    `patch was ${JSON.stringify(patch)}`);
}
{
  /**
   * The stamp must carry weight BY ITSELF. This row keeps the shipped date --
   * she only retitled it -- so the "date later than the seed" term scores
   * nothing here and the stamp is the only thing that can win the tie.
   */
  const rows = [
    seedCopy({ id: 1 }),
    seedCopy({ id: 2, title: 'Cell model — label every organelle', scheduleUpdatedAt: '2026-09-28T14:00:00.000Z' })
  ];
  ok('a stamped copy beats an unstamped one on the stamp alone',
    run(rows).idsToDelete.join() === '1',
    'with the date unchanged, nothing but the stamp distinguishes these two');
}
{
  // A retired placeholder carries a stamp too. It must never outrank a grade.
  const rows = [
    seedCopy({ id: 1, grade: 92 }),
    seedCopy({ id: 2, title: null, dueDate: '2026-10-09', scheduleUpdatedAt: '2026-09-28T14:00:00.000Z' })
  ];
  ok('an emptied placeholder never outranks a graded row',
    run(rows).idsToDelete.join() === '2',
    'clearing a title stamps the row; if that stamp scored, the grade would be the thing deleted');
}
{
  /**
   * Two stamped losers, the newer one ranked first. The rescue has to compare
   * against what it has ALREADY taken, not only against the keeper, or the
   * second loser walks its older date over the first one's newer one.
   */
  const rows = [
    seedCopy({ id: 1, grade: 92, gradedAt: '2026-09-26' }),
    seedCopy({ id: 2, dueDate: '2026-10-09', scheduleUpdatedAt: '2026-09-29T09:00:00.000Z' }),
    seedCopy({ id: 3, dueDate: '2026-10-02', scheduleUpdatedAt: '2026-09-28T09:00:00.000Z' })
  ];
  const patch = run(rows).rescued.find((r) => r.id === 1)?.patch || {};
  ok('the newest of several stamped losers is the one that survives',
    patch.dueDate === '2026-10-09',
    `patch was ${JSON.stringify(patch)} — an older edit must not overwrite a newer one already taken`);
}

console.log('\n--- 4. a keeper is never overwritten by a loser ---');
{
  const rows = [
    seedCopy({ id: 1, grade: 95, gradedAt: '2026-09-27' }),
    seedCopy({ id: 2, grade: 40, gradedAt: '2026-09-20' })
  ];
  const { rescued } = run(rows);
  const patch = rescued[0]?.patch || {};
  ok('the losing grade does not overwrite the kept one', patch.grade === undefined,
    JSON.stringify(patch) + '  <- filling a gap is not the same as replacing a value');
}
{
  const ticked = (n) => Array.from({ length: 4 }, (_, i) => ({ id: i, completedAt: i < n ? 'x' : null }));
  const rows = [seedCopy({ id: 1, milestones: ticked(1) }), seedCopy({ id: 2, milestones: ticked(3) })];
  const { idsToDelete } = run(rows);
  ok('the copy with more ticked steps is kept', idsToDelete.join() === '1',
    'a corrected duplicate must never cost him a step he did');
}

console.log('\n--- 5. her own rows are never touched ---');
{
  const custom = { id: 9, slotId: null, title: 'Museum of Aviation write-up', grade: 100 };
  const rows = [custom, { ...custom, id: 10 }];
  ok('rows with no slot id are left alone', run(rows).idsToDelete.length === 0,
    'a custom assignment is hers; the cleanup has no business in it');
}
{
  ok('a slot with a single copy is never touched', run([seedCopy({ id: 1, grade: 70 })]).idsToDelete.length === 0);
}

console.log('\n--- 6. the shipped code rescues before it deletes ---');
const code = strip(src);
/**
 * Anchored on the WRITE CALLS, not on the variable names. The first version
 * looked for `assignmentDupes.rescued.map` and matched the earlier line that
 * only builds a lookup Map — so it reported the right order no matter what
 * order the awaits were in, and a mutation run proved it toothless.
 */
/**
 * Scoped to the dedupe block and anchored on the WRITE CALLS.
 *
 * Two earlier drafts of this check were toothless and a mutation run found
 * both: the first matched `assignmentDupes.rescued.map` on the line that only
 * builds a lookup Map, and the second matched a `deleteAcademicAssignmentRecord(id)`
 * belonging to a different cleanup three hundred lines above. A check that
 * reports the right answer regardless of the code is worse than no check.
 */
const block = code.slice(code.indexOf('const assignmentDupes = dedupeBySlot'));
const rescueAt = block.indexOf('updateAcademicAssignmentRecord(r.id, r.patch)');
const deleteAt = block.indexOf('deleteAcademicAssignmentRecord(id)');
ok('both steps exist inside the dedupe block', rescueAt > 0 && deleteAt > 0, `${rescueAt} / ${deleteAt}`);
ok('the rescue is written before the delete', rescueAt < deleteAt,
  'a failure between the two must leave a harmless duplicate, never a grade that exists nowhere');
ok('the old title-only test is gone', !/Boolean\(a\.title\) \|\| a\.status !== 'placeholder'/.test(code),
  'every seeded assignment has a title, so that test passed every copy and deleted at random');
ok('the scorer weighs a grade above everything else',
  workScore({ grade: 80 }, null) > workScore({ title: 'x', status: 'completed', milestones: [{ completedAt: 'x' }] }, null),
  'a mark she entered weeks ago cannot be reconstructed; a lesson can be redone');

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) { console.log(`\n${failures.length} CHECK(S) FAILED`); process.exit(1); }
console.log('\nALL CHECKS PASSED');
