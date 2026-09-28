import './lib/academy-under-test.mjs';
import { allLessons } from '../src/academies/lamar/data/lessons/index.js';
import {
  SCIENCE_KHAN_SEQUENCE,
  SCIENCE_COURSE_CHALLENGES,
  SCIENCE_CANONICAL_KEYS,
  SCIENCE_CANONICAL_TITLES
} from '../src/academies/lamar/data/khan/scienceSequence.js';

/**
 * =============================================================================
 * ONE WHOLE SCIENCE COURSE PER QUARTER, AND PHYSICS BESIDE THE AEROSPACE
 * LESSONS THAT DEPEND ON IT.
 * =============================================================================
 *
 * WHY THIS EXISTS. (Sept 28, 2026.)
 *
 * A review of the whole school against the child's stated career found physics
 * running LAST and SMALLEST: five Khan units arriving in Q4, after the
 * aerospace track had already taught orbits, thrust and reentry without it.
 * Aerospace engineering is applied physics. The parent asked for physics
 * earlier, so Physics and Earth & space swapped quarters.
 *
 * Two things must hold afterwards, and neither is obvious from reading the file:
 *
 *   1. THE STRUCTURE SURVIVED THE SWAP. What made the sequence good was one
 *      whole Khan course per quarter, each ending in its own Course Challenge —
 *      he finishes four courses rather than carrying three unfinished ones. A
 *      careless swap breaks that by stranding a Course Challenge in the quarter
 *      its course has just left.
 *
 *   2. PHYSICS LANDS WITH THE WORK IT EXPLAINS. Q3 aerospace is orbital
 *      mechanics, satellites and missions. That is where motion, forces and
 *      energy are worth the most.
 *
 * It also protects what makes the swap safe at all: the store deletes
 * uncompleted science rows sitting in a quarter the sequence no longer uses,
 * and re-seeds the new one. That stays safe only while the canonical sets are
 * DERIVED from the sequence rather than typed by hand — a hand-typed list is
 * exactly how the last quarter-drift survived every cleanup before it.
 */

let passed = 0;
const failures = [];
const ok = (label, cond, detail = '') => {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
};

const SEQ = SCIENCE_KHAN_SEQUENCE;
const CC = SCIENCE_COURSE_CHALLENGES;
const QUARTERS = ['Q1 2026-2027', 'Q2 2026-2027', 'Q3 2026-2027', 'Q4 2026-2027'];

console.log('\n--- 1. one whole course per quarter ---');
ok('the sequence covers the four school quarters', QUARTERS.every((q) => Array.isArray(SEQ[q])));
ok('the sweep found a real year, not an empty object', Object.values(SEQ).flat().length > 20,
  `${Object.values(SEQ).flat().length} units`);
for (const q of QUARTERS) {
  const ids = new Set((SEQ[q] || []).map((r) => r.courseId));
  ok(`${q} carries exactly one course`, ids.size === 1,
    [...ids].join(', ') + '  <- a quarter with two courses is the shape this replaced');
}
ok('Summer carries no science', (SEQ['Summer 2027'] || []).length === 0,
  'Summer is reserved for reading and book reports');

console.log('\n--- 2. each course finishes in the quarter it is taught ---');
const courseOfQuarter = Object.fromEntries(QUARTERS.map((q) => [q, (SEQ[q] || [])[0]?.courseId]));
for (const q of QUARTERS) {
  const challenge = CC.find((c) => c.batchLabel === q);
  ok(`${q} ends in a Course Challenge`, !!challenge,
    'a quarter with no cumulative test is a course nobody closed');
  if (challenge) {
    ok(`...and it is the challenge for ${courseOfQuarter[q]}`, challenge.courseId === courseOfQuarter[q],
      `${q} teaches ${courseOfQuarter[q]} but tests ${challenge.courseId}  <- the challenge was left behind when the course moved`);
  }
}
ok('no quarter holds two course challenges', new Set(CC.map((c) => c.batchLabel)).size === CC.length);

console.log('\n--- 3. physics lands with the aerospace work it explains ---');
ok('physics is taught in Q3', courseOfQuarter['Q3 2026-2027'] === 'phys',
  `Q3 teaches ${courseOfQuarter['Q3 2026-2027']}  <- aerospace engineering is applied physics`);
ok('physics is no longer the last science of the year', courseOfQuarter['Q4 2026-2027'] !== 'phys');
/**
 * The other half of the claim, asserted against the lessons rather than
 * assumed — so moving the AEROSPACE track later fails here too, not just
 * moving the science.
 */
const q3Aero = allLessons.filter((l) => l.subject === 'aerospace' && l.quarter === 'Q3 2026-2027');
ok('Q3 aerospace exists', q3Aero.length > 0, `${q3Aero.length} lessons`);
const q3Titles = q3Aero.map((l) => l.title.toLowerCase()).join(' | ');
ok('Q3 aerospace is the orbits-and-missions quarter', /orbital|satellite/.test(q3Titles),
  q3Titles.slice(0, 150) + '  <- physics was moved to Q3 to sit beside these');

console.log('\n--- 4. the reconciliation that makes a swap safe ---');
const seqUnits = Object.values(SEQ).flat();
ok('canonical titles are derived from the sequence, not typed',
  seqUnits.every((r) => SCIENCE_CANONICAL_TITLES.has(r.skillTitle))
  && CC.every((c) => SCIENCE_CANONICAL_TITLES.has(c.skillTitle)),
  'a hand-typed list is how the last quarter-drift survived every cleanup');
ok('canonical keys carry the CURRENT quarter of every unit',
  Object.entries(SEQ).every(([q, rows]) => rows.every((r) => SCIENCE_CANONICAL_KEYS.has(r.skillTitle + '||' + q))),
  'a stale key leaves the old quarter looking canonical and the swap never takes');
ok('the old physics placement is no longer canonical',
  SCIENCE_CANONICAL_KEYS.has('Motion and Forces||Q4 2026-2027') === false,
  'uncompleted rows in the old quarter are cleaned up only because their key stopped matching');
ok('the old earth placement is no longer canonical',
  SCIENCE_CANONICAL_KEYS.has('Earth in Space||Q3 2026-2027') === false);

console.log('\n--- 5. nothing was lost in the swap ---');
ok('every unit has a real Khan URL',
  seqUnits.every((r) => /^https:\/\/www\.khanacademy\.org\//.test(r.khanAcademyUrl)));
ok('no duplicate unit titles across the year',
  new Set(seqUnits.map((r) => r.skillTitle)).size === seqUnits.length);
ok('all four courses are still present', new Set(seqUnits.map((r) => r.courseId)).size === 4,
  [...new Set(seqUnits.map((r) => r.courseId))].join(', '));
ok('physics still has all five units', (SEQ['Q3 2026-2027'] || []).length === 5, `${(SEQ['Q3 2026-2027'] || []).length}`);
ok('earth & space still has all six units', (SEQ['Q4 2026-2027'] || []).length === 6, `${(SEQ['Q4 2026-2027'] || []).length}`);
ok('sequence numbers start at 1 and never repeat within a quarter',
  QUARTERS.every((q) => {
    const ns = (SEQ[q] || []).map((r) => r.sequenceInQuarter).sort((a, b) => a - b);
    return ns[0] === 1 && new Set(ns).size === ns.length;
  }));

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) { console.log(`\n${failures.length} CHECK(S) FAILED`); process.exit(1); }
console.log('\nALL CHECKS PASSED');
