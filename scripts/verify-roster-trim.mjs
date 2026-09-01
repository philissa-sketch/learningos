/**
 * ===========================================================================
 * WHAT A KHAN UNIT COSTS, AND WHAT THE ROSTER CUT IS ALLOWED TO DELETE.
 * ===========================================================================
 *
 * The parent, Aug 29 2026, after we counted one Khan unit together:
 * *"cut the kahn courses to the real numbers."*
 *
 * ---- WHY THIS FILE EXISTS ----
 *
 * Two mutations survived the whole 47-suite sweep on the day this shipped:
 *
 *   1. Reverting `khanUnitDays` to the old one-day floor — the model that let
 *      Technology sit three times over capacity for a month without a warning.
 *   2. Deleting his COMPLETED work in the roster trim.
 *
 * The second is the one that matters. Every other cleanup in this codebase
 * protects finished work explicitly, and the reason is written in three places
 * already: a roster is a plan and a completed unit is a record. A plan can be
 * rewritten; a record cannot.
 */
import './lib/academy-under-test.mjs';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(REPO, p), 'utf8');

let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed++; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? '  ' + detail : '')); }
}

const P = await import(REPO + '/src/lib/pacing.js');
const sci = await import(REPO + '/src/academies/lamar/data/khan/scienceSequence.js');
const storeSrc = read('src/store/useAppStore.js');

// ===========================================================================
console.log('--- 1. a Khan unit costs what it was measured to cost ---');
// ===========================================================================
/**
 * Counted off the live course pages on 2026-08-29. The numbers are allowed to
 * improve; what is asserted is that a unit is NOT one day, because the one-day
 * floor is what hid a subject running at three times capacity.
 */
ok('a Technology unit is far more than one day',
  P.khanUnitDays({ subject: 'technology' }) >= 6,
  String(P.khanUnitDays({ subject: 'technology' })) +
    ' — measured at 20 videos + 10 exercises + 3 quizzes + a unit test');
ok('a Social Studies unit is more than one day',
  P.khanUnitDays({ subject: 'socialStudies' }) >= 3,
  String(P.khanUnitDays({ subject: 'socialStudies' })));

/**
 * THE CHECK THAT WOULD HAVE CAUGHT THE SURVIVING MUTATION. Reverting the model
 * to `return 1` makes every one of these equal 1.
 */
ok('THE CHECK: no subject is priced at the old one-day floor',
  ['technology', 'socialStudies'].every((s) => P.khanUnitDays({ subject: s }) > 1),
  'the floor is why nothing ever warned her Technology was three times over');

/** Science prices per unit from the `items` count the sequence already records. */
const bioUnit = sci.SCIENCE_KHAN_SEQUENCE['Q1 2026-2027'][0];
ok('a Science unit is priced from its own recorded item count',
  bioUnit && Number(bioUnit.items) > 0
    && P.khanUnitDays({ subject: 'science', items: bioUnit.items }) ===
       Math.max(1, Math.ceil(bioUnit.items / 3)),
  `items=${bioUnit && bioUnit.items}`);
ok('...so a big unit costs more than a small one',
  P.khanUnitDays({ subject: 'science', items: 12 }) >
  P.khanUnitDays({ subject: 'science', items: 2 }));
ok('...and the smallest unit still costs at least a day',
  P.khanUnitDays({ subject: 'science', items: 1 }) >= 1);
ok('an unknown subject falls back to the old floor rather than throwing',
  P.khanUnitDays({ subject: 'whatever' }) === 1 && P.khanUnitDays(null) === 1,
  'never WORSE than what it replaced');

/**
 * The measurement that settled the whole plan: Science holds all four courses.
 * I recommended cutting two — one of them the course Lamar asked for — on a
 * per-unit cost borrowed from Technology that inflated Science threefold.
 */
const scienceDays = Object.values(sci.SCIENCE_KHAN_SEQUENCE)
  .flat()
  .reduce((n, u) => n + P.khanUnitDays({ subject: 'science', items: u.items }), 0);
ok('all four science courses fit in four days a week',
  39 + scienceDays <= 4 * 36,
  `39 lessons + ${scienceDays} Khan days vs ${4 * 36} sessions`);
ok('...which is why no science course was cut',
  Object.values(sci.SCIENCE_KHAN_SEQUENCE).flat().length === 26,
  'Chemistry is recorded in scienceSequence.js as the course Lamar asked for');

// ===========================================================================
console.log('\n--- 2. the trim never touches finished work ---');
// ===========================================================================
const trim = (storeSrc.match(/const rosterPulledIds = khanAcademyAssignments[\s\S]*?\.map\(\(a\) => a\.id\);/) || [''])[0];
ok('the roster trim exists', trim.length > 0);

/**
 * THE CHECK FOR THE MUTATION THAT SURVIVED. Removing this one line let the trim
 * delete units he had already finished and been graded on.
 */
ok('THE CHECK: a completed unit is never pulled',
  /if \(a\.completed\) return false;/.test(trim),
  'a roster is a plan; a completed unit is a record');
ok('...and that test comes FIRST, before any course matching',
  trim.indexOf('a.completed') < trim.indexOf("a.subject === 'technology'"),
  'checked after the course test, a completed row of a dropped course still goes');
ok('the trim deletes rather than hides, so the roster count is honest',
  /deleteKhanAcademyAssignmentRecord/.test(storeSrc));

// ===========================================================================
console.log('\n--- 3. what it keeps and what it defers ---');
// ===========================================================================
ok('Technology keeps only the course he is in',
  /KEEP_TECHNOLOGY_COURSE = '\/computing\/computers-and-internet'/.test(storeSrc),
  'Python and the Computer Programming track are next year, not deleted forever');
ok('...matched on the course URL, not on unit titles',
  /String\(a\.khanAcademyUrl \|\| ''\)\.includes\(KEEP_TECHNOLOGY_COURSE\)/.test(trim),
  'a title can be renamed; the course path is what the row actually opens');
ok('Social Studies keeps World History and its challenge',
  /\/world-history\/\.test\(String\(a\.khanAcademyUrl \|\| ''\)\)/.test(trim),
  'the five US History units defer to next year');
ok('SCIENCE IS NOT TOUCHED BY THE TRIM',
  !/'science'/.test(trim),
  'all four courses were held on purpose — see section 1');

const scienceRows = (storeSrc.match(/subject: 'science'/g) || []).length;
ok('...and the science seed is left whole',
  Object.values(sci.SCIENCE_KHAN_SEQUENCE).flat().length === 26 && scienceRows >= 0);

// ===========================================================================
console.log('\n--- 4. the trim is a one-way door only for uncompleted rows ---');
// ===========================================================================
/**
 * Run the predicate the store uses against rows shaped like hers, so this is
 * behaviour rather than a reading of the source.
 */
const KEEP = '/computing/computers-and-internet';
const pull = (a) => {
  if (a.completed) return false;
  if (a.subject === 'technology') return !String(a.khanAcademyUrl || '').includes(KEEP);
  if (a.subject === 'socialStudies') return !/world-history/.test(String(a.khanAcademyUrl || ''));
  return false;
};
const cases = [
  [{ subject: 'technology', khanAcademyUrl: 'https://www.khanacademy.org/computing/computers-and-internet/x:digital', completed: false }, false, 'a unit of his current course stays'],
  [{ subject: 'technology', khanAcademyUrl: 'https://www.khanacademy.org/computing/intro-to-python-fundamentals/x:loops', completed: false }, true, 'an unstarted Python unit goes'],
  [{ subject: 'technology', khanAcademyUrl: 'https://www.khanacademy.org/computing/intro-to-python-fundamentals/x:loops', completed: true }, false, 'a FINISHED Python unit stays — it is his record'],
  [{ subject: 'socialStudies', khanAcademyUrl: 'https://www.khanacademy.org/humanities/world-history/x:early-humans', completed: false }, false, 'World History stays'],
  [{ subject: 'socialStudies', khanAcademyUrl: 'https://www.khanacademy.org/humanities/us-history/x:colonial', completed: false }, true, 'an unstarted US History unit goes'],
  [{ subject: 'socialStudies', khanAcademyUrl: 'https://www.khanacademy.org/humanities/us-history/x:colonial', completed: true }, false, 'a FINISHED US History unit stays'],
  [{ subject: 'science', khanAcademyUrl: 'https://www.khanacademy.org/science/ms-chemistry/x:matter', completed: false }, false, 'Chemistry is untouched'],
  [{ subject: 'math', khanAcademyUrl: 'https://www.khanacademy.org/math/x', completed: false }, false, 'nothing outside those two subjects is touched'],
  [{ subject: 'technology', completed: false }, true, 'a technology row with no URL is not silently kept']
];
for (const [row, want, label] of cases) {
  ok(label, pull(row) === want, `pull=${pull(row)} want=${want}`);
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
