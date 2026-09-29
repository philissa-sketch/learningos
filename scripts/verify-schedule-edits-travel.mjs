import './lib/academy-under-test.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * =============================================================================
 * A DUE DATE SHE MOVES HAS TO REACH THE OTHER COMPUTER.
 * =============================================================================
 *
 * WHY THIS EXISTS. (Sep 29, 2026.)
 *
 * The parent, twice: **"he had due dates changed because work was due too
 * close together and now all those have reverted back"**, and **"there were
 * projects due before he was given the assignments. The projects were moved to
 * where he was learning about that particular subject."**
 *
 * The daily-handoff import splits every assignment field into HIS (how far
 * along he is) and HERS (what the assignment is). The HERS side -- title,
 * note, dueDate, type -- was declared and then carried by nothing at all. Her
 * re-spacing of a week lived only on the machine she typed it on.
 *
 * It could not simply be switched on. His build is routinely days behind hers,
 * so his copy of a row holds whatever the seed said last week; carrying it
 * back unconditionally would overwrite the correction she had just made. That
 * is the Aug 11 reasoning and it still holds.
 *
 * `scheduleUpdatedAt` is what separates a correction from a leftover. It is
 * written in ONE place, by a person, only when a value actually moved.
 *
 * The properties held here:
 *
 *   1. The tuple is declared once and both sides use that one declaration.
 *   2. The stamp is written by the scheduling action and by nothing else --
 *      not hydrate, not the corrections pass, not the seeder.
 *   3. The action stamps only when a value really changed.
 *   4. An unstamped incoming row changes nothing, however stale it is.
 *   5. An equal or older stamp changes nothing.
 *   6. A strictly newer stamp carries the whole tuple, together.
 *   7. A blank title never travels.
 *   8. Nothing of HIS is reachable from this path.
 *   9. The merge actually calls it.
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

const src = read('src/store/useAppStore.js');
const code = strip(src);

const grab = (startMarker, endMarker) => {
  const i = src.indexOf(startMarker);
  if (i < 0) throw new Error(`could not find ${startMarker} in the store`);
  const j = src.indexOf(endMarker, i);
  if (j < 0) throw new Error(`could not find the end of ${startMarker}`);
  return src.slice(i, j);
};

/**
 * scheduleChanges is a closure inside importProgressData. It is lifted out of
 * the shipped text and run here, so these tests exercise the code that ships
 * rather than a restatement of it that could quietly drift.
 */
const lifted = [
  grab('const SCHEDULE_EDIT_FIELDS = [', '\n'),
  grab('const hasText = (v) =>', '\n'),
  grab('function scheduleChanges(', '\n    /**')
].join('\n');
const { scheduleChanges, SCHEDULE_EDIT_FIELDS } = await import(
  'data:text/javascript;base64,' +
  Buffer.from(lifted + '\nexport { scheduleChanges, SCHEDULE_EDIT_FIELDS };').toString('base64')
);

console.log('\n--- 0. the logic was found and lifted ---');
ok('scheduleChanges was lifted from the shipped store', typeof scheduleChanges === 'function');

console.log('\n--- 1. one declaration, used by both sides ---');
ok('the tuple is title, dueDate, type, note',
  SCHEDULE_EDIT_FIELDS.join() === 'title,dueDate,type,note',
  `got ${JSON.stringify(SCHEDULE_EDIT_FIELDS)}`);
ok('it is declared exactly once in the store',
  (code.match(/const SCHEDULE_EDIT_FIELDS\s*=/g) || []).length === 1,
  'a second declaration is how two copies of a list drift apart');
ok('the scheduling action reads that declaration rather than its own list',
  /SCHEDULE_EDIT_FIELDS\.some\(/.test(code));
ok('the import reads it too',
  /for \(const field of SCHEDULE_EDIT_FIELDS\)[\s\S]{0,120}incoming\[field\]/.test(code));

console.log('\n--- 2. the stamp has exactly one author ---');
{
  const writes = code.match(/scheduleUpdatedAt\s*[:=]\s*new Date\(\)/g) || [];
  ok('the stamp is set from the clock in exactly one place', writes.length === 1,
    `found ${writes.length} — hydrate, the corrections pass or the seeder stamping a row would make every plain seed copy look like a deliberate edit`);
}
{
  const action = grab('async scheduleAcademicAssignment(', '\n  /**');
  ok('and that one place is scheduleAcademicAssignment',
    /scheduleUpdatedAt = new Date\(\)\.toISOString\(\)/.test(strip(action)));
}
{
  // The hydrate pipeline must never mint one. Scoped to hydrate's body.
  const hydrate = code.slice(
    code.indexOf('const missingAssignmentSeeds = [];'),
    code.indexOf('function dedupeBySlot(')
  );
  ok('the hydrate pipeline never mints a stamp',
    hydrate.length > 400 && !/scheduleUpdatedAt\s*[:=]\s*new Date/.test(hydrate),
    'a seeded or corrected row must carry no evidence of a human edit');
}

console.log('\n--- 3. the action stamps only on a real change ---');
{
  const action = strip(grab('async scheduleAcademicAssignment(', '\n  /**'));
  ok('the stamp is behind a comparison against the existing row',
    /SCHEDULE_EDIT_FIELDS\.some\(\(field\) => changes\[field\] !== existing\[field\]\)/.test(action),
    'an unconditional stamp would lift this row above the other machine every time the dialog is saved');
}

console.log('\n--- 4. an unstamped incoming row changes nothing ---');
{
  const local = { title: 'Cell model', dueDate: '2026-09-25', type: 'Portfolio Entry', note: null };
  const incoming = { title: 'Cell model', dueDate: '2026-08-14', type: 'Portfolio Entry', note: null };
  ok('a stale copy with no stamp cannot move her date',
    scheduleChanges(local, incoming) === null,
    'this is his week-old build handing back the date she just corrected');
  ok('an empty-string stamp is not a stamp',
    scheduleChanges(local, { ...incoming, scheduleUpdatedAt: '' }) === null);
  ok('a non-string stamp is not a stamp',
    scheduleChanges(local, { ...incoming, scheduleUpdatedAt: 20260929 }) === null);
}

console.log('\n--- 5. equal or older never wins ---');
{
  const local = { title: 'Cell model', dueDate: '2026-11-02', scheduleUpdatedAt: '2026-09-28T18:00:00.000Z' };
  ok('an older stamp changes nothing',
    scheduleChanges(local, { title: 'Cell model', dueDate: '2026-10-09', scheduleUpdatedAt: '2026-09-28T14:00:00.000Z' }) === null);
  ok('an equal stamp changes nothing',
    scheduleChanges(local, { title: 'Cell model', dueDate: '2026-10-09', scheduleUpdatedAt: '2026-09-28T18:00:00.000Z' }) === null,
    'the same file imported twice must be a no-op');
}

console.log('\n--- 6. a strictly newer stamp carries the whole tuple ---');
{
  const local = { title: 'Cell model', dueDate: '2026-09-25', type: 'Portfolio Entry', note: null };
  const incoming = {
    title: 'Cell model — build it and label it',
    dueDate: '2026-10-09',
    type: 'Portfolio Entry',
    note: 'moved to the week we cover cells',
    scheduleUpdatedAt: '2026-09-29T09:00:00.000Z'
  };
  const out = scheduleChanges(local, incoming);
  ok('her new date crosses', out?.dueDate === '2026-10-09');
  ok('...and the retitle crosses with it', out?.title === incoming.title);
  ok('...and the note', out?.note === incoming.note);
  ok('...and the stamp travels so the next import can compare',
    out?.scheduleUpdatedAt === '2026-09-29T09:00:00.000Z');
  ok('a first stamp beats no stamp at all',
    scheduleChanges({ title: 'Cell model', dueDate: '2026-09-25' }, incoming)?.dueDate === '2026-10-09');
  ok('a cleared due date crosses too, because the stamp proves she meant it',
    scheduleChanges(local, { ...incoming, dueDate: null })?.dueDate === null);
}

console.log('\n--- 7. a blank title never travels ---');
{
  const local = { title: 'Cell model', dueDate: '2026-09-25', status: 'completed' };
  const stamp = '2026-09-29T09:00:00.000Z';
  ok('a null title is refused', scheduleChanges(local, { title: null, dueDate: '2026-10-09', scheduleUpdatedAt: stamp }) === null,
    'status is his and does not cross, so a blank title alone would leave his copy marked complete with nothing on it');
  ok('a whitespace title is refused', scheduleChanges(local, { title: '   ', dueDate: '2026-10-09', scheduleUpdatedAt: stamp }) === null);
  ok('a missing title is refused', scheduleChanges(local, { dueDate: '2026-10-09', scheduleUpdatedAt: stamp }) === null);
}

console.log('\n--- 8. nothing of his is reachable from here ---');
{
  const local = { title: 'Cell model', dueDate: '2026-09-25' };
  const out = scheduleChanges(local, {
    title: 'Cell model', dueDate: '2026-10-09', type: 'Portfolio Entry', note: null,
    scheduleUpdatedAt: '2026-09-29T09:00:00.000Z',
    status: 'placeholder', completedAt: null, startedAt: null, grade: null, gradedAt: null,
    milestones: [], notesText: '', draftText: '', finalText: '', reflection: '',
    photoUrl: '', rubricScores: null, feedback: null
  });
  const HIS = ['status', 'completedAt', 'startedAt', 'grade', 'gradedAt', 'feedback',
    'milestones', 'notesText', 'draftText', 'finalText', 'reflection', 'photoUrl', 'rubricScores'];
  const leaked = HIS.filter((f) => f in out);
  ok('no field of his can be written by the schedule path', leaked.length === 0,
    `leaked ${JSON.stringify(leaked)} — an incoming row that says his work is empty must never be able to say so through this door`);
  ok('...and only the tuple plus its stamp comes out',
    Object.keys(out).sort().join() === 'dueDate,note,scheduleUpdatedAt,title,type',
    `got ${JSON.stringify(Object.keys(out).sort())}`);
  // A field the sending build does not have at all must not be written as
  // undefined over a value the receiving build does have.
  const partial = scheduleChanges({ title: 'Cell model', note: 'keep me' },
    { title: 'Cell model', dueDate: '2026-10-09', scheduleUpdatedAt: '2026-09-29T09:00:00.000Z' });
  ok('a field absent from the incoming row is left alone, not blanked',
    !('note' in partial) && !('type' in partial),
    `got ${JSON.stringify(Object.keys(partial).sort())}`);
}

console.log('\n--- 9. the merge actually calls it ---');
{
  const merge = code.slice(
    code.indexOf('function mergeBySlot('),
    code.indexOf('const bookMerge = mergeBySlot(')
  );
  ok('mergeBySlot was located', merge.length > 400 && merge.length < code.length);
  ok('scheduleChanges is called inside the slot merge', /scheduleChanges\(local, incoming\)/.test(merge),
    'a helper nothing calls is the most expensive kind of dead code: it reads as fixed');
  const call = merge.indexOf('scheduleChanges(local, incoming)');
  const assign = merge.indexOf('Object.assign(changes, scheduled)');
  ok('...and its result is merged into the changes', assign > call && assign - call < 200);
  ok('...before the row is written', assign < merge.indexOf('writes.push(updateFn('));
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log('\nFAILED:');
  for (const f of failures) console.log('  - ' + f);
  process.exit(1);
}
console.log('\nALL CHECKS PASSED');
