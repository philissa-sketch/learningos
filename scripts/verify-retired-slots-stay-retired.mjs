import './lib/academy-under-test.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { fileURLToPath } from 'node:url';

/**
 * =============================================================================
 * A DROPPED ASSIGNMENT MUST STAY DROPPED, AND A NEW ROW IS BORN WITH ITS DATE.
 * =============================================================================
 *
 * WHY THIS EXISTS. (Sept 28, 2026.)
 *
 * The parent sent a full export of her live app. In it was a row for
 * `asg::aerospace::Q2::2` — an assignment she had DROPPED on Sept 5 — carrying
 * id 125, `dueDate: null`, and a createdAt five seconds before she pressed
 * Export. Ids 24, 31 and 50 were missing from the same array.
 *
 * Two mistakes, one loop, and they fed each other:
 *
 *   1. The retired-slot cleanup deleted the rows for the three retired slots.
 *      The seeding loop below it then saw those slotIds missing from the array
 *      and BUILT THEM AGAIN. Every app load: delete three, create three, id
 *      counter up by three, the dropped assignment back on his board. Forever.
 *
 *   2. Every row the seeding loop created was given `dueDate: null`. The
 *      backfill that fills an empty due date from the seed runs ABOVE the
 *      seeding loop and only looks at rows already in the array, so a new row
 *      always spent a full hydrate with no date — and a retired row, deleted
 *      again before the next hydrate, never got one at all.
 *
 * The properties held here:
 *
 * Running this guard for the first time found the cause, which was worse than
 * either mistake above: `asg::aerospace::Q2::2` was retired on Aug 8 when it
 * was the *Chasing Space* book report, and the slot id was later REUSED for
 * the bottle rocket's second launch, due 2026-12-04. The retirement line was
 * never removed. A live assignment was being deleted and rebuilt on every
 * load. The other two retired slots were clean — they are genuinely gone from
 * placeholders.js, which is what retiring a slot is supposed to look like.
 *
 * The properties held here:
 *
 *   1. NO retired slot is also live in placeholders.js. A slot cannot be both
 *      dropped and scheduled; when it is, the app churns it forever and the
 *      only visible symptom is a due date that will not stick.
 *   2. The seeding loop skips retired slots anyway, and skips them BEFORE the
 *      push — belt and braces, so a future contradiction costs a dropped row
 *      rather than an infinite delete/recreate loop.
 *   3. A seeded row is created with the slot's own due date, not null.
 *   4. The cleanup that deletes retired rows still refuses to touch a row
 *      carrying a grade, a completion, or milestones.
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

const { RETIRED_ASSIGNMENT_SLOTS } = await import(
  pathToFileURL(path.join(REPO, 'src/academies/lamar/data/migrations/assignmentMigrations.js')).href
);
const { quarterlyAcademicPlaceholders } = await import(
  pathToFileURL(path.join(REPO, 'src/academies/lamar/data/academicSuccessCenter/placeholders.js')).href
);

const allSeedSlots = [];
for (const byQuarter of Object.values(quarterlyAcademicPlaceholders)) {
  for (const slots of Object.values(byQuarter)) {
    for (const slot of slots) allSeedSlots.push(slot);
  }
}
const seedById = new Map(allSeedSlots.map((s) => [s.slotId, s]));

console.log('\n--- 1. nothing is both retired and live ---');
ok('the school has retired slots', (RETIRED_ASSIGNMENT_SLOTS || []).length > 0,
  'nothing to protect if the list is empty');
ok('the seeds were read', allSeedSlots.length > 20, String(allSeedSlots.length));
for (const slotId of RETIRED_ASSIGNMENT_SLOTS) {
  const live = seedById.get(slotId);
  ok(`${slotId} is retired and NOT seeded`, !live,
    live ? `placeholders.js still schedules it: "${live.title}" due ${live.dueDate} — ` +
           'the cleanup deletes it and the seeder rebuilds it on every load' : '');
}

console.log('\n--- 2. the seeding loop skips them ---');
const code = strip(read('src/store/useAppStore.js'));

/**
 * Scoped to the seeding loop and anchored on the PUSH, for the same reason the
 * dedupe guard is: `retiredSlots.has` also appears in the cleanup block three
 * hundred lines above, and a whole-file indexOf would have matched that one and
 * reported PASS no matter what the seeder did.
 */
const loopStart = code.indexOf('const missingAssignmentSeeds = [];');
ok('the seeding loop was found', loopStart > 0, String(loopStart));
const loop = code.slice(loopStart, code.indexOf('const asgBackfill = [];', loopStart));
ok('the seeding loop has an end', loop.length > 0 && loop.length < code.length, String(loop.length));

const skipAt = loop.indexOf('retiredSlots.has(slot.slotId)');
const pushAt = loop.indexOf('missingAssignmentSeeds.push(');
ok('the seeder tests the retired list', skipAt > 0, String(skipAt));
ok('it tests it BEFORE building the row', skipAt > 0 && pushAt > 0 && skipAt < pushAt,
  `skip at ${skipAt}, push at ${pushAt} — a skip after the push rebuilds it anyway`);
ok('the test is a skip, not a flag', /retiredSlots\.has\(slot\.slotId\)\)\s*continue;/.test(loop));

console.log('\n--- 3. a new row is born with its due date ---');
ok('the seed object takes the slot\'s own due date', /dueDate:\s*slot\.dueDate\s*\?\?\s*null/.test(loop),
  'a hard null leaves the row undated until the next hydrate, and sorted wrong meanwhile');
ok('the hard null is gone from the seed object', !/\n\s*dueDate:\s*null,/.test(loop),
  'this is the exact line that shipped the undated rows');

console.log('\n--- 4. the cleanup still protects real work ---');
const cleanupStart = code.indexOf('const retiredSlots = new Set(RETIRED_ASSIGNMENT_SLOTS)');
const cleanup = code.slice(cleanupStart, loopStart);
ok('the cleanup block was found', cleanupStart > 0 && cleanup.length > 0, String(cleanupStart));
for (const field of ['grade', 'completedAt', 'gradedAt', 'startedAt']) {
  /**
   * Anchored on the `&&` that follows it. `!a.grade` on its own is a substring
   * of `!a.gradedAt`, so the loose version reported PASS with the grade check
   * deleted — a mutation run found it. Every field in this chain is followed
   * by `&&`, so the tighter anchor is safe and it actually distinguishes them.
   */
  ok(`a row with a ${field} is never deleted as retired`,
    new RegExp(`!a\\.${field}\\s*&&`).test(cleanup),
    'a dropped assignment is never worth deleting real work over');
}
ok('a row with milestones is never deleted as retired', /!a\.milestones\?\.length/.test(cleanup));
ok('only an untouched status is eligible',
  /a\.status === 'not-started'/.test(cleanup) && /a\.status === 'placeholder'/.test(cleanup));

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) { console.log(`\n${failures.length} CHECK(S) FAILED`); process.exit(1); }
console.log('\nALL CHECKS PASSED');
