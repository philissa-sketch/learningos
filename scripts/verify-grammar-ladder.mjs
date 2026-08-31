/**
 * ===========================================================================
 * THE GRAMMAR LADDER — one grade band per quarter, and nothing in the wrong one.
 * ===========================================================================
 *
 * Written Aug 28, 2026, after the parent sent a screenshot of her son's 12:30
 * Language Arts row reading **"Nouns · 15 units left this quarter"** in Q1.
 *
 * ---- THE BUG THIS GUARD EXISTS TO PREVENT ----
 *
 * On Aug 25 `khanGrammarUnitByUrl` was widened to recognise Khan's grade 7-8
 * grammar course, so those rows would credit the 60-minute block instead of the
 * 15-minute one. That was correct. What was not checked is who ELSE called it:
 * hydrate pass (a2) does, and pass (a2) stamps whatever it matches into
 * `batchLabel: 'Q1 2026-2027'` — a hardcoded label that is only true for the
 * general course.
 *
 * Result, on every single app start: ten grade 7-8 rows dragged out of Q2-Q4
 * into Q1, renamed to bare Khan titles, numbered 1-9 on top of the general
 * course's own units 1-10. A tie at sequence 1 decided what he opened.
 *
 * **The lesson, and the thing these checks encode: widening a lookup is a
 * schedule change when somebody downstream writes a quarter from it.**
 *
 * ---- WHY THE CHECKS EXECUTE THE SPEC INSTEAD OF READING IT ----
 *
 * The guard that was supposed to cover this asserted the literal text
 * `'Q3 2026-2027': [3, 4, 5, 6]`. It passed for three days while the app was
 * doing the wrong thing, because the seed plan was never what was broken — the
 * repair pass downstream of it was. So this file extracts GRAMMAR_LADDER_SPEC
 * from the shipped store, runs it through the shipped title/URL builders, and
 * asserts properties of the ROWS THAT RESULT.
 */
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

const gco = await import(REPO + '/src/academies/lamar/data/khan/grammarCourseOrder.js');
const sm = await import(REPO + '/src/lib/scheduledMinutes.js');
const storeSrc = read('src/store/useAppStore.js');

// ===========================================================================
console.log('--- 1. the three courses, as read off Khan on Aug 28 ---');
// ===========================================================================
const COURSES = gco.GRAMMAR_COURSES;
ok('there are exactly three grammar courses', Object.keys(COURSES).length === 3,
  Object.keys(COURSES).join(', '));

ok('the general course has Khan\'s ten units', COURSES.general.units.length === 10);
ok('the 5-6 course has all nine units', COURSES.g56.units.length === 9);
ok('the 7-8 course has all nine units', COURSES.g78.units.length === 9);

ok('every 5-6 slug carries the course id read off the live page',
  COURSES.g56.units.every((u) => u.slug.startsWith('x90cef5375e9bcad6:')),
  'nothing here was inferred from the pattern');
ok('every 7-8 slug carries the course id read off the live page',
  COURSES.g78.units.every((u) => u.slug.startsWith('x9e6f4267f632f2c6:')));

for (const id of ['general', 'g56', 'g78']) {
  ok(`the ${id} course has a course-challenge URL`,
    typeof COURSES[id].challengePath === 'string' && COURSES[id].challengePath.includes('course-challenge'),
    'her rule: "Unit tests and Course Challenges is what would be graded"');
}

/**
 * THE CHECK THAT JUSTIFIES THE COURSE LABEL.
 *
 * If these two courses ever stop sharing unit titles, the label becomes
 * optional and someone will drop it. While they DO collide, a bare title is
 * ambiguous on his screen and one quarter boundary away from a de-duplication
 * pass merging two different units.
 */
const g56Titles = COURSES.g56.units.map((u) => u.khanTitle);
const g78Titles = COURSES.g78.units.map((u) => u.khanTitle);
ok('the 5-6 and 7-8 courses use IDENTICAL unit titles',
  g56Titles.every((t, i) => t === g78Titles[i]),
  'this is WHY the course label is part of the row title');
ok('...so the row titles built from them are still distinct',
  new Set([
    ...g56Titles.map((t) => gco.grammarRowTitle('g56', t)),
    ...g78Titles.map((t) => gco.grammarRowTitle('g78', t))
  ]).size === 18);
ok('...and the general course takes no label, so graded rows are not renamed',
  gco.grammarRowTitle('general', 'Parts of speech: the noun') === 'Parts of speech: the noun',
  'renaming a row he has been graded on is how you lose a grade');

// ===========================================================================
console.log('\n--- 2. the ladder climbs one band per quarter ---');
// ===========================================================================
const specSrc = (storeSrc.match(/const GRAMMAR_LADDER_SPEC = (\[[\s\S]*?\n    \]);/) || [])[1];
ok('GRAMMAR_LADDER_SPEC is present in the shipped store', Boolean(specSrc));
const SPEC = specSrc ? eval(specSrc) : [];

const expectedLadder = [
  ['Q1 2026-2027', 'general'],
  ['Q2 2026-2027', 'g56'],
  ['Q3 2026-2027', 'g78'],
  ['Q4 2026-2027', 'g78']
];
for (const [label, courseId] of expectedLadder) {
  const rung = SPEC.find((r) => r.batchLabel === label);
  ok(`${label} teaches the ${courseId} course`, rung && rung.courseId === courseId,
    rung ? rung.courseId : 'no rung for this quarter');
}
ok('the ladder does not skip a rung — no quarter jumps from 5th to 7th-8th',
  SPEC.findIndex((r) => r.courseId === 'g56') < SPEC.findIndex((r) => r.courseId === 'g78'),
  'grammar is his weakest IXL strand at 440-500; a strand that is behind climbs one band at a time');

// ===========================================================================
console.log('\n--- 3. the rows the ladder actually produces ---');
// ===========================================================================
const rows = [];
for (const rung of SPEC) {
  const course = COURSES[rung.courseId];
  rung.unitIndexes.forEach((idx, i) => {
    const u = course.units[idx];
    rows.push({
      title: gco.grammarRowTitle(course.id, u.khanTitle),
      url: gco.grammarUnitUrl(course.id, u.slug),
      batchLabel: rung.batchLabel,
      sequenceInQuarter: 20 + i,
      isCourseChallenge: false,
      courseId: course.id
    });
  });
  if (rung.challenge) {
    rows.push({
      title: course.challengeTitle,
      url: 'https://www.khanacademy.org' + course.challengePath,
      batchLabel: rung.batchLabel,
      sequenceInQuarter: 97,
      isCourseChallenge: true,
      courseId: course.id
    });
  }
}

ok('every row has a unique URL', new Set(rows.map((r) => r.url)).size === rows.length,
  'two rows on one URL is the same unit graded twice');
ok('every row has a unique title', new Set(rows.map((r) => r.title)).size === rows.length);

for (const id of ['g56', 'g78']) {
  const placed = rows.filter((r) => r.courseId === id && !r.isCourseChallenge);
  ok(`all nine ${id} units are placed, none dropped and none twice`,
    placed.length === 9 && new Set(placed.map((r) => r.url)).size === 9,
    String(placed.length));
}

/**
 * THE LOAD-BEARING CHECK — the one that would have caught the bug.
 *
 * Q1 is the general course and nothing else. If a row from any other grammar
 * course reaches Q1, something upstream is stamping a quarter it does not own.
 */
const q1 = rows.filter((r) => r.batchLabel === 'Q1 2026-2027');
ok('NOTHING but the general course reaches Q1',
  q1.every((r) => r.courseId === 'general'),
  q1.filter((r) => r.courseId !== 'general').map((r) => r.title).join(', '));

// Quarter lengths, from the same place the pacing model reads them.
const WEEKS = { 'Q2 2026-2027': 7, 'Q3 2026-2027': 11, 'Q4 2026-2027': 7 };
const unitsIn = (label) => rows.filter((r) => r.batchLabel === label && !r.isCourseChallenge).length;
ok('the longest quarter carries at least as many units as the shortest',
  unitsIn('Q3 2026-2027') >= unitsIn('Q4 2026-2027'),
  `Q3 ${unitsIn('Q3 2026-2027')} units in ${WEEKS['Q3 2026-2027']} weeks vs Q4 ${unitsIn('Q4 2026-2027')} in ${WEEKS['Q4 2026-2027']}`);

// ===========================================================================
console.log('\n--- 4. every challenge is graded as a challenge ---');
// ===========================================================================
const challenges = rows.filter((r) => r.isCourseChallenge);
ok('all three course challenges have a row', challenges.length === 3, String(challenges.length));
ok('...including the general course, which he has already started',
  challenges.some((r) => r.url.includes('/humanities/grammar/test/')),
  'that test reached no grade and appeared on no record until Aug 28');
ok('...and every one is flagged isCourseChallenge',
  challenges.every((r) => r.isCourseChallenge === true),
  'without the flag the gradebook labels it a Unit Test');

// ===========================================================================
console.log('\n--- 5. every grammar row still credits the 60-minute block ---');
// ===========================================================================
for (const r of rows) {
  const strand = sm.khanReadingStrand({ khanAcademyUrl: r.url });
  ok(`"${r.title}" credits the 12:30 Language Arts block`,
    sm.STRAND_BLOCK[strand] === 'block-7',
    `routed to ${sm.STRAND_BLOCK[strand]} — 15 minutes instead of 60`);
}
ok('...and a reading unit is still reading, not grammar',
  sm.STRAND_BLOCK[sm.khanReadingStrand({
    khanAcademyUrl: 'https://www.khanacademy.org/ela/7th-grade-reading-and-vocabulary/x7538838f96af3430:mysteries'
  })] === 'block-3',
  'over-matching would book every reading unit as an hour of grammar');

// ===========================================================================
console.log('\n--- 6. the narrow matcher stays narrow ---');
// ===========================================================================
/**
 * `generalGrammarUnitByUrl` is what pass (a2) uses to decide what goes into Q1.
 * Every check here is a way the Aug 25 bug could come back.
 */
for (const u of COURSES.general.units) {
  ok(`the general matcher claims "${u.khanTitle}"`,
    gco.generalGrammarUnitByUrl('https://www.khanacademy.org/humanities/grammar/' + u.slug)?.unit === u.unit);
}
for (const id of ['g56', 'g78']) {
  for (const u of COURSES[id].units) {
    ok(`the general matcher REFUSES ${id} "${u.khanTitle}"`,
      gco.generalGrammarUnitByUrl(gco.grammarUnitUrl(id, u.slug)) === null,
      'claiming it would stamp this unit into Q1 on every app start');
  }
  ok(`the general matcher REFUSES the ${id} course challenge`,
    gco.generalGrammarUnitByUrl('https://www.khanacademy.org' + COURSES[id].challengePath) === null);
}
ok('the general matcher refuses a non-grammar URL',
  gco.generalGrammarUnitByUrl('https://www.khanacademy.org/math/cc-fifth-grade-math') === null);
ok('the general matcher survives a missing URL',
  gco.generalGrammarUnitByUrl(undefined) === null && gco.generalGrammarUnitByUrl(null) === null);

// The wide matcher must still be wide — it answers the block-routing question.
ok('the wide matcher still claims all three courses',
  ['general', 'g56', 'g78'].every((id) =>
    gco.khanGrammarUnitByUrl(gco.grammarUnitUrl(id, COURSES[id].units[0].slug)) !== null));

// ===========================================================================
console.log('\n--- 7. the rename and the seed cannot disagree ---');
// ===========================================================================
/**
 * The re-seed loop: the seeder wrote "Nouns (7th-8th grade grammar)", the
 * rename pass turned it into "Nouns", and on the next startup the seeder could
 * not find its own row and wrote it again. Both now call `grammarRowTitle`.
 */
for (const id of ['general', 'g56', 'g78']) {
  for (const u of COURSES[id].units) {
    const url = gco.grammarUnitUrl(id, u.slug);
    ok(`canonical title matches the seeded title for ${id} "${u.khanTitle}"`,
      gco.canonicalGrammarTitle(url, 'anything else') === gco.grammarRowTitle(id, u.khanTitle),
      'a mismatch here re-creates this row on every single app start');
  }
}
ok('canonicalGrammarTitle leaves a non-grammar row alone',
  gco.canonicalGrammarTitle('https://www.khanacademy.org/math/cc-fifth-grade-math', 'Decimal Place Value') === 'Decimal Place Value');

// ===========================================================================
console.log('\n--- 8. the store repairs rather than duplicates ---');
// ===========================================================================
ok('the ladder seeder matches on the URL, not the title',
  /a\.khanAcademyUrl === target\.khanAcademyUrl/.test(storeSrc),
  'a title-keyed seeder is what doubled this roster once already');
ok('...and repairs an existing row in place instead of adding one',
  /grammarLadderRepairs\.push/.test(storeSrc) && /\.\.\.existing,/.test(storeSrc),
  'grade and completion must ride along — re-placing a unit cannot cost him credit');
ok('...and only deletes a stale row that is uncompleted',
  /staleGrammarTitles\.has\(a\.skillTitle\) &&[\s\S]{0,80}!a\.completed/.test(storeSrc),
  'a finished unit stays on his record whatever happens to the roster');
ok('pass (a2) uses the general-only matcher',
  /generalGrammarUnitByUrl\(a\.khanAcademyUrl\)/.test(storeSrc));
ok('...and nothing hands the WIDE matcher to a pass that writes a quarter',
  !/khanGrammarUnitByUrl\(a\.khanAcademyUrl\)/.test(storeSrc),
  'that is the exact shape of the Aug 25 bug');

/**
 * ---- THE CHECKS SECTIONS 3-5 CANNOT MAKE. ----
 *
 * Those sections rebuild the ladder's rows here in the guard, from the shipped
 * SPEC and the shipped title/URL builders. That is close to the store — but it
 * is not the store, and a mutation test proved it: deleting `isCourseChallenge:
 * true` from the store's challenge row left all 116 checks passing, because the
 * guard was reading its own reconstruction of that field.
 *
 * This project has been here before, in the opposite direction, and wrote it
 * down: *"when a simulation disagrees with a direct read of the data, check the
 * simulation first."* A simulation that AGREES for the wrong reason is the
 * quieter version of the same fault. So every field the reconstruction supplies
 * from its own literal is pinned against the shipped source here.
 */
const ladderBlock = (storeSrc.match(/const grammarLadderRows = \[\];[\s\S]*?\n    \}\n/) || [''])[0];
ok('the store builds its row titles with grammarRowTitle, not a template string',
  /skillTitle: grammarRowTitle\(course\.id, unit\.khanTitle\)/.test(ladderBlock),
  'a hand-built title is what drifted from the rename pass and caused the re-seed loop');
ok('the store builds its URLs with grammarUnitUrl',
  /khanAcademyUrl: grammarUnitUrl\(course\.id, unit\.slug\)/.test(ladderBlock));
ok('the store numbers units at 20 + i, after the quarter\'s reading rows',
  /sequenceInQuarter: 20 \+ i/.test(ladderBlock),
  'reading is the 10:00 block, grammar the 12:30 — the list order should say so');
ok('the store puts the course challenge last, at 97',
  /sequenceInQuarter: 97/.test(ladderBlock));
ok('the store FLAGS the course challenge row isCourseChallenge: true',
  /challengeTitle[\s\S]{0,600}isCourseChallenge: true/.test(ladderBlock),
  'without the flag her gradebook labels a Course Challenge a Unit Test');
ok('...and flags the unit rows false',
  /grammarUnitUrl\(course\.id, unit\.slug\)[\s\S]{0,600}isCourseChallenge: false/.test(ladderBlock));
ok('the repair pass carries the challenge flag too',
  /Boolean\(existing\.isCourseChallenge\) !== target\.isCourseChallenge/.test(storeSrc),
  'a row already in her database must gain the flag, not just new ones');

// ===========================================================================
console.log('\n--- 9. the shipped repair, run against the damaged database ---');
// ===========================================================================
/**
 * Every check above this line reads the ladder. This one RUNS it.
 *
 * The block is extracted from useAppStore.js as text and executed, so what is
 * under test is the shipped code and not a copy of it — the same method the
 * Aug 7 ELA re-placement used. The input is her database as the Aug 25 bug
 * actually left it: ten grade 7-8 rows sitting in Q1 wearing bare Khan titles,
 * on top of the general course he is seven units into.
 *
 * The assertion that matters is the last one: **his 12:30 row opens Khan unit
 * 8**, which is what her screenshot said it should have been all along.
 */
const start = storeSrc.indexOf('    const GRAMMAR_LADDER_SPEC = [');
const endMark = '    if (staleGrammarIds.length > 0) {';
const endIdx = storeSrc.indexOf(endMark);
ok('the ladder block can be located in the shipped store', start >= 0 && endIdx > start);
const BLOCK = storeSrc.slice(start, storeSrc.indexOf('\n    }\n', endIdx) + 7);

let nextId = 1;
const mk = (o) => ({ id: nextId++, subject: 'reading', completed: false, grade: null, ...o });
let db = [];
COURSES.general.units.forEach((u) => db.push(mk({
  skillTitle: u.khanTitle, gradeLevel: '5th',
  khanAcademyUrl: 'https://www.khanacademy.org/humanities/grammar/' + u.slug,
  batchLabel: 'Q1 2026-2027', sequenceInQuarter: u.unit,
  completed: u.unit <= 7, grade: u.unit <= 7 ? 'B' : null
})));
db.push(mk({ skillTitle: 'Roots, prefixes, and suffixes', gradeLevel: '5th',
  khanAcademyUrl: 'https://www.khanacademy.org/ela/5th-grade-reading-and-vocab/x:roots',
  batchLabel: 'Q1 2026-2027', sequenceInQuarter: 11 }));
// The damage.
COURSES.g78.units.forEach((u, i) => db.push(mk({
  skillTitle: u.khanTitle, gradeLevel: '7th-8th',
  khanAcademyUrl: gco.grammarUnitUrl('g78', u.slug),
  batchLabel: 'Q1 2026-2027', sequenceInQuarter: i + 1
})));
db.push(mk({ skillTitle: 'Grammar course challenge', gradeLevel: '7th-8th',
  khanAcademyUrl: 'https://www.khanacademy.org' + COURSES.g78.challengePath,
  batchLabel: 'Q1 2026-2027', sequenceInQuarter: 99 }));
// A stale duplicate left by the re-seed loop.
db.push(mk({ skillTitle: 'Nouns (7th-8th grade grammar)', gradeLevel: '7th-8th',
  khanAcademyUrl: 'https://www.khanacademy.org/ela/7th-and-8th-grade-grammar/STALE',
  batchLabel: 'Q2 2026-2027', sequenceInQuarter: 20 }));

const deleted = [];
const runBlock = new Function(
  'khanAcademyAssignments', 'GRAMMAR_COURSES', 'grammarRowTitle', 'grammarUnitUrl',
  'addKhanAcademyAssignmentRecord', 'updateKhanAcademyAssignmentRecord', 'deleteKhanAcademyAssignmentRecord',
  '"use strict"; return (async () => {\n' + BLOCK + '\nreturn khanAcademyAssignments; })();'
);
const invoke = (rows) => runBlock(
  rows, COURSES, gco.grammarRowTitle, gco.grammarUnitUrl,
  async () => nextId++, async () => {}, async (id) => { deleted.push(id); }
);

const beforeNext = [...db.filter((a) => a.batchLabel === 'Q1 2026-2027' && !a.completed)]
  .sort((a, b) => a.sequenceInQuarter - b.sequenceInQuarter)[0];
ok('the damaged database really does hand him "Nouns" (the bug reproduces)',
  beforeNext.skillTitle === 'Nouns', beforeNext.skillTitle);

db = await invoke(db);

const q1rows = db.filter((a) => a.batchLabel === 'Q1 2026-2027');
ok('after the repair, NO other grammar course is left in Q1',
  q1rows.every((a) => !/(5th-and-6th|7th-and-8th)-grade-grammar/.test(a.khanAcademyUrl || '')),
  q1rows.filter((a) => /grade-grammar/.test(a.khanAcademyUrl || '')).map((a) => a.skillTitle).join(', '));

const after = [...q1rows.filter((a) => !a.completed)].sort((a, b) => a.sequenceInQuarter - b.sequenceInQuarter)[0];
ok('THE CHECK: his 12:30 row now reads "Syntax: sentences and clauses"',
  after.skillTitle === 'Syntax: sentences and clauses', after.skillTitle);
ok('...and it opens Khan unit 8 of the course he is actually in',
  after.khanAcademyUrl === 'https://www.khanacademy.org/humanities/grammar/syntax-sentences-and-clauses',
  after.khanAcademyUrl);

ok('the general course challenge now has a row, flagged, at the end of Q1',
  q1rows.some((a) => a.isCourseChallenge === true && a.sequenceInQuarter === 97
    && (a.khanAcademyUrl || '').includes('/humanities/grammar/test/')),
  'the test he is sitting right now reached no grade before this');
ok('the 5-6 course lands in Q2, all nine units plus its challenge',
  db.filter((a) => a.batchLabel === 'Q2 2026-2027' && /5th-and-6th-grade-grammar/.test(a.khanAcademyUrl || '')).length === 10);
ok('the 7-8 course splits 6 units into Q3 and 3 plus its challenge into Q4',
  db.filter((a) => a.batchLabel === 'Q3 2026-2027' && /7th-and-8th-grade-grammar/.test(a.khanAcademyUrl || '')).length === 6 &&
  db.filter((a) => a.batchLabel === 'Q4 2026-2027' && /7th-and-8th-grade-grammar/.test(a.khanAcademyUrl || '')).length === 4);
ok('the stale re-seed duplicate is gone', deleted.length === 1);

const graded = db.filter((a) => a.completed);
ok('all seven graded units kept their completion AND their grade',
  graded.length === 7 && graded.every((g) => g.grade === 'B'),
  'a roster repair that costs him credit is worse than the bug');

const fingerprint = (rows) => JSON.stringify(rows.map((a) => [a.skillTitle, a.batchLabel, a.sequenceInQuarter]).sort());
const once = fingerprint(db);
const twice = await invoke(db);
ok('a second startup changes nothing — the repair is a fixed point',
  fingerprint(twice) === once && twice.length === db.length,
  'this is the check that proves the re-seed loop is closed');

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
