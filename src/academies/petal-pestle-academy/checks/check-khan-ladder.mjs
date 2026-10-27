// ---------------------------------------------------------------------------
// CHECK: A FINISHED KHAN COURSE HANDS HER TO THE NEXT ONE.
//
//   node src/academies/petal-pestle-academy/checks/check-khan-ladder.mjs
//   node src/academies/petal-pestle-academy/checks/check-khan-ladder.mjs --self-test
//
// Gigi, Oct 27 2026: "Azianna has completed her course challenge for math and
// it has been graded but the next Units of math isn't opening. Make sure there
// are units available after all course challenges for each Khan Academy course.
// ... If there isn't any Khan reading, remove it from her grading system."
//
// WHAT THIS PROVES
//   1. Her real record (8 of 8 math2 units + the Course Challenge, B-, 24/30,
//      Oct 23) opens 3rd Grade Math Unit 1, on Today AND on Home.
//   2. Without the challenge grade she is still offered the challenge.
//   3. Every ladder walks all the way up: math2 -> 6, grammar -> 5-6 -> 7-8, and
//      the top says "complete" instead of offering a finished course again.
//   4. Courses she has not reached are not "waiting on a grown-up".
//   5. Khan reading is not on the grading screen, the waiting list or the card.
//   6. Every course's data is well formed: numbered 1..n, unitCount matches,
//      each unit test is a /test/ path, each challenge is a course-challenge.
//
// WHAT THIS CANNOT PROVE, AND SAYS SO
//   That Khan still serves these addresses. Khan answers HTTP 200 for a dead
//   page and renders "Page not found" afterwards, so only a real browser can
//   say. `renderedOn` records which links were opened that way; null means the
//   link was read off Khan's course page but the built address was not opened.
//
// --self-test puts each bug back in (in a temporary copy of the real source)
// and fails if this check does not catch it.
// ---------------------------------------------------------------------------

import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { dirname, join, resolve, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { tmpdir } from 'node:os';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const SELF_TEST = process.argv.includes('--self-test');

const SRC = {
  units: 'data/khan/khanUnits.js',
  grade: 'lib/khanGrade.js',
  map: 'data/khan/khanMap.js',
  waiting: 'lib/khanWaiting.js',
  links: 'lib/blockLinks.js',
  scope: 'data/khan/khanScope.js',
  catalog: 'lib/courseCatalog.js'
};
const read = (rel) => readFileSync(join(ROOT, rel), 'utf8');

let tmp = null;
let n = 0;
// `over` maps a source path (relative to ROOT) to the URL of a broken copy, so a
// bug put into khanUnits.js reaches the files that import it. Without this the
// copy of blockLinks.js would quietly import the REAL khanUnits.js and the bug
// would go uncaught - the same trap check-morning-circle hit on Oct 15.
async function loadModule(rel, source, over = {}) {
  if (source == null && !Object.keys(over).length) return import(pathToFileURL(join(ROOT, rel)).href);
  tmp = tmp || mkdtempSync(join(tmpdir(), 'pp-ladder-'));
  const dir = dirname(join(ROOT, rel));
  const text = source ?? read(rel);
  const fixed = text.replace(/from\s+'(\.{1,2}\/[^']+)'/g, (_, p) => {
    const abs = resolve(dir, p);
    const key = relative(ROOT, abs).split('\\').join('/');
    return `from '${over[key] || pathToFileURL(abs).href}'`;
  });
  const file = join(tmp, `m${n++}.js`);
  writeFileSync(file, fixed);
  return import(pathToFileURL(file).href).then((m) => ({ ...m, __url: pathToFileURL(file).href }));
}

// ---- HER REAL RECORD, Oct 27 2026 (a1b86bb2-azianna-work-2026-10-27) --------
const unitRow = (courseId, unitN, percent, at) => ({ courseId, unitN, kind: 'unit', percent, at, grade: 'x' });
const MATH2_UNITS = [[1, 80], [2, 88], [3, 77], [4, 73], [5, 80], [6, 100], [7, 80], [8, 90]]
  .map(([n, p]) => unitRow('math2', n, p, '2026-10-19'));
const MATH2_CHALLENGE = { courseId: 'math2', unitN: null, kind: 'course-challenge', correct: 24, total: 30, percent: 80, at: '2026-10-23', grade: 'B-' };
const GRAMMAR_SO_FAR = [[1, 90], [2, 82], [3, 91], [4, 70], [5, 90], [6, 86]].map(([n, p]) => unitRow('grammar', n, p, '2026-10-19'));
// Her measured levels that day. Measurement & Data is the lowest of the math strands.
const HER_STRANDS = {
  'numbers-operations': { level: 3.48, asked: 6 },
  'fractions-decimals': { level: 3.89, asked: 7 },
  geometry: { level: 2.67, asked: 7 },
  'measurement-data': { level: 2.44, asked: 8 }
};
const MATH_BLOCK = { id: 'blk-math', subject: 'math' };
const allUnits = (U, id, at = '2026-11-01') => U.KHAN_UNIT_COURSES[id].units.map((u) => unitRow(id, u.n, 85, at));
const challengeOf = (id) => ({ courseId: id, unitN: null, kind: 'course-challenge', correct: 20, total: 30, percent: 67, at: '2026-11-20', grade: 'D+' });

function run(ctx) {
  const out = [];
  const fail = (m) => out.push(m);
  const { U, G, M, W, L, S, K } = ctx;
  const target = (grades, strands = HER_STRANDS) => L.resolveBlockTarget(MATH_BLOCK, strands, grades, null, new Date(2026, 9, 27, 9, 0));

  // 1. HER REAL RECORD OPENS 3RD GRADE MATH
  const t1 = target([...MATH2_UNITS, MATH2_CHALLENGE]);
  if (!t1 || t1.courseId !== 'math3' || t1.unitN !== 1) fail(`1. with the challenge graded she gets ${JSON.stringify(t1 && { c: t1.courseId, u: t1.unitN, l: t1.label })}, expected math3 Unit 1`);
  else if (t1.url !== 'https://www.khanacademy.org/math/cc-third-grade-math/intro-to-multiplication') fail(`1. wrong Unit 1 address: ${t1.url}`);
  const home = M.unitForStrand('measurement-data', 2.44, [...MATH2_UNITS, MATH2_CHALLENGE]);
  if (!home || home.unitCourse !== 'math3' || home.unitN !== 1) fail(`1. Home says ${home && home.unitCourse} unit ${home && home.unitN}, Today says math3 unit 1 - the two must agree`);

  // 2. NO CHALLENGE GRADE YET: STILL OFFERED THE CHALLENGE
  const t2 = target(MATH2_UNITS);
  if (!t2 || !t2.challenge || t2.courseId !== 'math2') fail('2. all eight units graded but no challenge row: she should be offered the Course Challenge');
  // a challenge for ANOTHER course must not finish this one
  const t2b = target([...MATH2_UNITS, challengeOf('math3')]);
  if (!t2b || !t2b.challenge) fail('2. a math3 challenge grade finished math2');

  // 3. THE WHOLE LADDER
  let g = [];
  const seen = [];
  for (let i = 0; i < 6; i++) {
    const t = target(g);
    seen.push(t && t.courseId);
    if (!t || t.courseComplete) break;
    g = [...g, ...allUnits(U, t.courseId), challengeOf(t.courseId)];
  }
  if (seen.join() !== 'math2,math3,math4,math5,math6,math6') fail(`3. walking the math ladder visited ${seen.join(' > ')}`);
  const top = target(g);
  if (!top || !top.courseComplete || top.challenge) fail('3. at the top of the math ladder the block should say complete, not offer a finished challenge');
  // grammar: a finished Grammar course goes to 5th-6th, then 7th-8th
  const gStrands = { 'grammar-usage': { level: 2.35, asked: 7 } };
  const gBlock = { id: 'blk-lang', subject: 'writing' };
  let gg = [...allUnits(U, 'grammar'), challengeOf('grammar')];
  const t3 = L.resolveBlockTarget(gBlock, gStrands, gg, null, new Date(2026, 10, 30, 9, 0));
  if (!t3 || t3.courseId !== 'grammar56') fail(`3. a finished Grammar course should open Grammar 5th-6th, got ${t3 && t3.courseId}`);
  gg = [...gg, ...allUnits(U, 'grammar56'), challengeOf('grammar56')];
  const t3b = L.resolveBlockTarget(gBlock, gStrands, gg, null, new Date(2026, 11, 30, 9, 0));
  if (!t3b || t3b.courseId !== 'grammar78') fail(`3. a finished Grammar 5th-6th should open 7th-8th, got ${t3b && t3b.courseId}`);

  // 3c. a child measured at 3rd grade starts IN 3rd grade math, with units
  const level3 = { 'numbers-operations': { level: 3.5, asked: 6 }, 'measurement-data': { level: 3.5, asked: 6 } };
  const t3c = target([], level3);
  if (!t3c || t3c.courseId !== 'math3' || !t3c.exact) fail(`3. measured at 3.5 she should start at math3 Unit 1 with an exact link, got ${t3c && t3c.courseId}`);

  // 4. WAITING LIST
  const waiting = (grades) => W.khanWaiting(grades, '2026-10-27').map((r) => r.courseId);
  const w = waiting([...MATH2_UNITS, MATH2_CHALLENGE, ...GRAMMAR_SO_FAR]);
  for (const id of ['math4', 'math5', 'math6', 'grammar56', 'grammar78']) if (w.includes(id)) fail(`4. ${id} is waiting on a grown-up but she has not reached it`);
  if (!w.includes('math3')) fail('4. math3 is her course now and should be waiting for its first result');
  if (!w.includes('grammar')) fail('4. grammar has 4 units left and should be waiting');
  if (w.includes('math2')) fail('4. finished math2 is still waiting');
  if (waiting([]).some((id) => !['math2', 'grammar'].includes(id))) fail(`4. an empty record lists ${waiting([]).join()} as waiting`);

  // 5. KHAN READING IS OFF THE GRADING SYSTEM
  const ids = G.KHAN_GRADEABLE_COURSES.map((c) => c.courseId);
  for (const id of ['ela2', 'ela3']) if (ids.includes(id)) fail(`5. ${id} is still on the grading screen`);
  for (const id of ['math2', 'math3', 'math4', 'math5', 'math6', 'grammar', 'grammar56', 'grammar78']) if (!ids.includes(id)) fail(`5. ${id} is missing from the grading screen`);
  if (G.KHAN_GRADEABLE_COURSES.some((c) => c.graded !== 'khan')) fail('5. a course Khan built no test for is on the grading screen');
  if (w.includes('ela2') || w.includes('ela3')) fail('5. Khan reading is on the waiting list');

  // 6. DATA SHAPE
  for (const ladder of U.KHAN_LADDERS) for (const id of ladder) if (!U.KHAN_UNIT_COURSES[id]) fail(`6. ladder names ${id}, which has no units`);
  const chains = U.KHAN_LADDERS.map((l) => l.join('>'));
  if (!chains.includes('math2>math3>math4>math5>math6')) fail(`6. math ladder is ${chains.join(' | ')}`);
  if (!chains.includes('grammar>grammar56>grammar78')) fail(`6. grammar ladder is ${chains.join(' | ')}`);
  for (const c of Object.values(U.KHAN_UNIT_COURSES)) {
    if (c.unitCount !== c.units.length) fail(`6. ${c.courseId} says ${c.unitCount} units and lists ${c.units.length}`);
    c.units.forEach((u, i) => {
      if (u.n !== i + 1) fail(`6. ${c.courseId} unit ${u.n} is in position ${i + 1}`);
      if (!u.slug || !u.name) fail(`6. ${c.courseId} unit ${u.n} has no name or slug`);
      if (c.graded === 'khan' && !(u.test && u.test.includes('/test/') && u.test.startsWith(u.slug + '/'))) fail(`6. ${c.courseId} unit ${u.n} test path is not under its own unit: ${u.test}`);
      if (U.unitUrl(c.courseId, u.n) === `https://www.khanacademy.org${c.base}`) fail(`6. ${c.courseId} unit ${u.n} opens the course front page`);
    });
    if (c.graded === 'khan' && !(c.courseChallenge && /course-challenge$/.test(c.courseChallenge))) fail(`6. ${c.courseId} has no course-challenge path`);
    if (!c.confirmedOn) fail(`6. ${c.courseId} has no confirmedOn`);
  }
  if (U.CHALLENGE_KIND !== G.KIND_CHALLENGE) fail('6. khanUnits CHALLENGE_KIND and khanGrade KIND_CHALLENGE disagree');

  // 7. THE QUARTER-BY-QUARTER SCOPE NAMES REAL UNITS, EVERY ONE ONCE
  for (const id of ['math3', 'math4', 'math5', 'math6']) {
    const names = (S.COURSE_SCOPE[id] || []).flatMap((q) => q.units || []);
    const real = U.KHAN_UNIT_COURSES[id].units.map((u) => u.name);
    for (const nm of names) if (!real.includes(nm)) fail(`7. ${id} scope names "${nm}", which is not a unit on Khan's page`);
    for (const nm of real) if (names.filter((x) => x === nm).length !== 1) fail(`7. ${id} unit "${nm}" appears ${names.filter((x) => x === nm).length} times in the quarter scope`);
  }

  // 8. THE PARENT'S LIST HOLDS EVERY COURSE, REACHED OR NOT
  const cat = K.buildCourseCatalog({ khanGrades: [...MATH2_UNITS, MATH2_CHALLENGE], lessonReads: {} });
  const listed = cat.khan.map((c) => c.courseId);
  for (const id of Object.keys(U.KHAN_UNIT_COURSES)) if (!listed.includes(id)) fail(`8. the parent's course list is missing ${id}`);
  const st = Object.fromEntries(cat.khan.map((c) => [c.courseId, c.status]));
  if (st.math2 !== 'finished' || st.math3 !== 'nextUp' || st.math4 !== 'ahead') fail(`8. statuses are ${JSON.stringify(st)}, expected math2 finished, math3 nextUp, math4 ahead`);
  if (!cat.app.some((c) => c.id === 'reading') || cat.app.length < 5) fail('8. the parent\'s list is missing an app course');
  return out;
}

async function context(broken = {}) {
  const U = await loadModule(SRC.units, broken.units);
  const over = U.__url ? { [SRC.units]: U.__url } : {};
  const G = await loadModule(SRC.grade, broken.grade, over);
  const M = await loadModule(SRC.map, broken.map, over);
  const over2 = { ...over, [SRC.map]: M.__url || pathToFileURL(join(ROOT, SRC.map)).href };
  const W = await loadModule(SRC.waiting, broken.waiting, { ...over2, [SRC.grade]: G.__url || pathToFileURL(join(ROOT, SRC.grade)).href });
  const L = await loadModule(SRC.links, broken.links, over2);
  const S = await loadModule(SRC.scope, broken.scope, over);
  const K = await loadModule(SRC.catalog, broken.catalog, over);
  return { U, G, M, W, L, S, K };
}

const BUGS = [
  ['no next course after a challenge', 'units', 'if (i >= 0 && i < ladder.length - 1) return ladder[i + 1];', 'if (false) return ladder[i + 1];'],
  ['challenge not needed to finish', 'units', 'if (c.courseChallenge && !hasChallengeRow(courseId, grades)) return false;', ''],
  ['any course\'s challenge finishes this one', 'units', "g && g.courseId === courseId && g.kind === CHALLENGE_KIND", "g && g.kind === CHALLENGE_KIND"],
  ['never leaves the first course', 'units', 'if (!courseComplete(id, grades)) break;', 'break;'],
  ['math ladder stops at 4th grade', 'units', "['math2', 'math3', 'math4', 'math5', 'math6'],", "['math2', 'math3', 'math4'],"],
  ['grammar ladder removed', 'units', "['grammar', 'grammar56', 'grammar78']", "['grammar']"],
  ['5th grade says 17 units', 'units', 'unitCount: 16,', 'unitCount: 17,'],
  ['wrong challenge kind string', 'units', "export const CHALLENGE_KIND = 'course-challenge';", "export const CHALLENGE_KIND = 'challenge';"],
  ['Today ignores the ladder', 'links', 'const unitCourseId = currentCourseFor(khan.unitCourse, grades);', 'const unitCourseId = khan.unitCourse;'],
  ['finished challenge offered again', 'links', 'if (challenge && !courseComplete(unitCourseId, grades)) {', 'if (challenge) {'],
  ['Home ignores the ladder', 'map', 'const courseId = currentCourseFor(khan.unitCourse, grades);', 'const courseId = khan.unitCourse;'],
  ['3rd grade level gets no units', 'map', 'unitCourse: band.unitCourse || (KHAN_UNIT_COURSES[band.course] ? band.course : null),', 'unitCourse: band.unitCourse || null,'],
  ['unreached courses are waiting', 'waiting', 'if (!courseIsActive(c.courseId, grades)) continue;', ''],
  ['3rd grade scope names a unit Khan does not have', 'scope', "'Intro to multiplication', '1-digit multiplication'", "'Intro to multiplication', 'Fractions of a pizza'"],
  ['4th grade scope drops a unit', 'scope', "'Multiply fractions', 'Understand decimals', 'Plane figures'", "'Multiply fractions', 'Understand decimals'"],
  ['parent list hides courses she has not reached', 'catalog', 'const khan = Object.values(KHAN_UNIT_COURSES).map((c) => {', "const khan = Object.values(KHAN_UNIT_COURSES).filter((c) => khanStatus(c.courseId, khanGrades) !== 'ahead').map((c) => {"],
  ['parent list forgets the reading course', 'catalog', "id: 'reading',\n    label: 'Reading (her own course)'", "id: 'reading-x',\n    label: 'Reading (her own course)'"],
  ['Khan reading back on the grading screen', 'grade', ".filter((c) => c.graded === 'khan')", '.filter(() => true)']
];

const real = run(await context());
if (!SELF_TEST) {
  if (real.length) {
    real.forEach((f) => console.log(`FAIL  ${f}`));
    console.log(`\n${real.length} failed.`);
    process.exit(1);
  }
  const U = (await context()).U;
  console.log(`Ladders: ${U.KHAN_LADDERS.map((l) => l.join(' > ')).join('  |  ')}`);
  console.log(`Courses with units: ${Object.keys(U.KHAN_UNIT_COURSES).join(', ')} (${U.KHAN_UNIT_COUNT} units in all)`);
  console.log('Her Oct 27 record (8 of 8 math units + Course Challenge) opens 3rd Grade Math, Unit 1.');
  console.log('NOT TESTED HERE: that Khan serves these addresses, and how the screens look.');
  console.log('PASS');
  process.exit(0);
}
if (real.length) {
  console.log('The real code fails, so the self-test means nothing. Fix these first:');
  real.forEach((f) => console.log(`  ${f}`));
  process.exit(1);
}
let missed = 0;
for (const [name, k, from, to] of BUGS) {
  const original = read(SRC[k]);
  if (!original.includes(from)) {
    console.log(`CANNOT  ${name}: the line to break is not in ${SRC[k]}`);
    missed++;
    continue;
  }
  const out = run(await context({ [k]: original.replace(from, to) }));
  if (out.length) console.log(`caught  ${name}  ->  ${out[0]}`);
  else {
    console.log(`MISSED  ${name}`);
    missed++;
  }
}
console.log(missed ? `\n${missed} of ${BUGS.length} bugs NOT caught.` : `\nAll ${BUGS.length} bugs caught.`);
process.exit(missed ? 1 : 0);
