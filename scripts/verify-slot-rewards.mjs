// ---------------------------------------------------------------------------
// THE REWARDS SLOT: THE CATALOG AND THE SHEETS ARE THE SCHOOL'S; THE SHAPING IS
// THE PLATFORM'S. Run: node scripts/verify-slot-rewards.mjs
//
// `printoutFor`, `journalFor`, `costForCosmetic` and `catalogRewardRows` moved
// to src/content/slots/rewards.js on Sept 21, 2026. Old against new on the
// first school: 75 comparisons, 0 differences, all 34 reward rows identical.
//
// Two values were typed inside `catalogRewardRows` — the dream tier's NAME and
// a fallback ICON. The tier name also decides whether a parent must approve,
// so section 3 pins that the school's own word still does that job.
//
// Asked of the slot as content.js exports it, so a dropped table fails here.
// ---------------------------------------------------------------------------
import { rewards as R } from '../src/academies/lamar/content.js';
import {
  REWARD_QUESTIONS, printoutFor, journalFor, costForCosmetic, catalogRewardRows
} from '../src/content/slots/rewards.js';

let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
}
const C = { rewards: R };

console.log(`\nquestions: ${REWARD_QUESTIONS.join(', ')}`);

console.log('\n--- 1. the school answers what the slot asks ---');
{
  const missing = REWARD_QUESTIONS.filter((q) => R[q] === undefined);
  ok('every question is answered', missing.length === 0, missing.join(', '));
}

console.log('\n--- 2. sheets and journals ---');
{
  const [id, spec] = Object.entries(R.LESSON_PRINTOUTS)[0];
  const sheet = printoutFor(C, id);
  ok('a lesson with a sheet gets one', Boolean(sheet));
  ok('...carrying its own prompts', sheet && sheet.prompts === spec.prompts);
  ok('...and its kind’s explanation merged in', sheet && sheet.why === R.PRINTOUT_KINDS[spec.kind].why && sheet.kind === spec.kind);
  ok('a lesson without one gets null, not an empty sheet', printoutFor(C, 'no-such-lesson') === null);
  ok('an inherited property name is not a lesson', printoutFor(C, 'constructor') === null && journalFor(C, 'toString') === null,
    'a plain lookup would hand back a function as a printable sheet');
  const subj = Object.keys(R.SUBJECT_JOURNALS)[0];
  ok('a subject with a journal gets it', journalFor(C, subj) === R.SUBJECT_JOURNALS[subj]);
  ok('a subject without one gets null', journalFor(C, 'no-such-subject') === null);
}

console.log('\n--- 3. prices and parent approval ---');
{
  const free = Object.entries(R.COSMETIC_REPRICE).filter(([, v]) => v === 0).map(([k]) => k);
  ok('a free default stays free even when it came with a price',
    free.length > 0 && free.every((id) => costForCosmetic(C, id, 999) === 0),
    'zero is a price; a falsy check would charge him for his starting avatar');
  const [pid, price] = Object.entries(R.COSMETIC_REPRICE).find(([, v]) => v > 0);
  ok('a repriced item takes the school’s price', costForCosmetic(C, pid, 1) === price);
  ok('anything not repriced keeps its own', costForCosmetic(C, 'not-repriced', 77) === 77);

  const rows = catalogRewardRows(C);
  ok('one row per catalog item', rows.length === R.REAL_WORLD_REWARDS.length + R.DREAM_REWARDS.length);
  const dreams = rows.filter((r) => r.kind === 'dream');
  ok('dream rows carry the school’s tier name', dreams.length > 0 && dreams.every((r) => r.tier === R.DREAM_TIER));
  ok('...which is one of the tiers that need a parent', [...R.TIERS_REQUIRING_PARENT].includes(R.DREAM_TIER));
  ok('every dream reward needs a parent', dreams.every((r) => r.requiresParent === true));
  // Every dream reward the first school lists names its own icon, so filtering
  // its catalog for iconless ones finds none, and an every() over nothing
  // passes. The first run of this check did exactly that. Asked of one item.
  const bare = catalogRewardRows({ rewards: { ...R, REAL_WORLD_REWARDS: [], DREAM_REWARDS: [{ id: 'd', name: 'D', credits: 1 }] } });
  ok('a dream with no icon shows the school’s', bare.length === 1 && bare[0].icon === R.DREAM_ICON);
  const world = rows.filter((r) => r.kind === 'reward');
  ok('a reward needs a parent exactly when its tier is listed',
    world.every((r) => r.requiresParent === [...R.TIERS_REQUIRING_PARENT].includes(r.tier)));
  ok('...and both answers occur, so the rule is really being applied',
    world.some((r) => r.requiresParent) && world.some((r) => !r.requiresParent));
  ok('a list of tiers works as well as a Set',
    JSON.stringify(catalogRewardRows({ rewards: { ...R, TIERS_REQUIRING_PARENT: [...R.TIERS_REQUIRING_PARENT] } }))
      === JSON.stringify(rows), 'a stored school sends a list');
  ok('costs are the catalog’s own', rows.every((r) => typeof r.cost === 'number' && r.cost > 0));
}

console.log('\n--- 4. a school with no rewards ---');
{
  ok('no rows, no throw', Array.isArray(catalogRewardRows({})) && catalogRewardRows({}).length === 0);
  ok('no sheets, no journals', printoutFor({}, 'x') === null && journalFor({}, 'x') === null);
  ok('no repricing means the original price', costForCosmetic({}, 'x', 5) === 5);
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) { console.log('\nFAILED:'); for (const f of failures) console.log('  ' + f); process.exit(1); }
console.log('\nALL CHECKS PASSED');
