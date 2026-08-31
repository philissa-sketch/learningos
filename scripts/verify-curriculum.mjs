// ---------------------------------------------------------------------------
// Curriculum guard test. Run with: node scripts/verify-curriculum.mjs
// Checks the invariants this project has repeatedly relied on by hand.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import { allLessons } from '../src/academies/lamar/data/lessons/index.js';
import { getAllTemplates, getTemplateById } from '../src/engine/problemTemplates.js';
import { ACTIVE_SUBJECTS } from '../src/academies/lamar/subjects.js';
import { CALIBRATED_LESSON_COUNT, RANKS } from '../src/lib/ranks.js';
const problemTemplates = getAllTemplates();

let failures = 0;
const ok = (cond, msg, detail) => {
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${msg}`);
  if (!cond) { failures++; if (detail) console.log('      ' + detail); }
};

// 0. Rank gates are still calibrated against the curriculum that exists.
//
// WHY THIS TEST EXISTS: ranks.js gates advancement on ABSOLUTE lesson counts,
// deliberately — a percentage gate would demote the student every time a new
// subject shipped. The cost is that the numbers drift as content grows, and a
// comment in ranks.js claimed this suite already caught that. It did not: the
// constant was referenced nowhere but its own declaration, and the curriculum
// grew 331 -> 356 with nobody noticing until it was read line by line. This is
// that check, written for real. If it fails, re-scale minMasteredForTier and
// raise the constant together — never raise the constant alone, which would
// silence the alarm without fixing the drift.
ok(
  allLessons.length <= CALIBRATED_LESSON_COUNT,
  `rank gates calibrated against current curriculum (${allLessons.length} lessons vs CALIBRATED_LESSON_COUNT ${CALIBRATED_LESSON_COUNT})`,
  `The curriculum has outgrown the rank calibration. Re-scale minMasteredForTier in src/lib/ranks.js by ${allLessons.length}/${CALIBRATED_LESSON_COUNT} and set CALIBRATED_LESSON_COUNT = ${allLessons.length}.`
);

// The top rank must stay reachable. If it ever needs ~everything in the app,
// finishing the arc becomes a completionist grind rather than a milestone.
{
  const top = RANKS[RANKS.length - 1];
  const pct = Math.round((top.minMasteredForTier / allLessons.length) * 100);
  ok(pct <= 95, `top rank reachable (Tier ${top.tier} needs ${top.minMasteredForTier}/${allLessons.length} = ${pct}% of the curriculum)`,
     'Lower the top gate, or the final rank is effectively unreachable.');
}

// Gates must increase strictly, or two ranks share a bar and one is decorative.
{
  let strictly = true, detail = '';
  for (let i = 1; i < RANKS.length; i++) {
    if (RANKS[i].minMasteredForTier <= RANKS[i - 1].minMasteredForTier || RANKS[i].minXp <= RANKS[i - 1].minXp) {
      strictly = false; detail = `Tier ${RANKS[i].tier} does not advance past Tier ${RANKS[i - 1].tier}`;
    }
  }
  ok(strictly, 'every rank gate is strictly harder than the one below it', detail);
}

// 1. No duplicate lesson ids anywhere.
const ids = allLessons.map((l) => l.id);
const dupes = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];
ok(dupes.length === 0, `no duplicate lesson ids (${ids.length} lessons)`, dupes.join(', '));

// 2. Every quarterly exam sits AFTER every lesson it claims to unlock after.
for (const exam of allLessons.filter((l) => l.isQuarterlyExam)) {
  const examIndex = ids.indexOf(exam.id);
  const bad = (exam.unlocksAfter || []).filter((lid) => {
    const i = ids.indexOf(lid);
    return i === -1 || i > examIndex;
  });
  ok(bad.length === 0, `exam ${exam.id} is positioned after all ${(exam.unlocksAfter || []).length} lessons it gates`, bad.join(', '));
}

// 3. Every practiceGeneratorId resolves AND its build() actually runs.
const byId = new Map(problemTemplates.map((t) => [t.id, t]));
const missing = [];
const broken = [];
for (const lesson of allLessons) {
  for (const beat of lesson.novaIntro?.beats || []) {
    const gid = beat.practiceGeneratorId;
    if (!gid) continue;
    const gen = byId.get(gid);
    if (!gen) { missing.push(`${lesson.id} -> ${gid}`); continue; }
    try {
      const p = gen.build();
      if (!p || !p.prompt) broken.push(`${gid} (built an empty problem)`);
    } catch (e) {
      broken.push(`${gid} (${e.message})`);
    }
  }
}
ok(missing.length === 0, 'every practiceGeneratorId resolves to a real generator', missing.join('; '));
ok(broken.length === 0, 'every referenced generator build() runs and returns a problem', broken.join('; '));

// 4. Question shape: 10 per lesson, choiceFeedback aligned, null at the answer.
const shapeErrors = [];
for (const lesson of allLessons) {
  if (!Array.isArray(lesson.questions)) { shapeErrors.push(`${lesson.id}: no questions array`); continue; }
  // The 10-question rule applies to the subjects Mission Control actively
  // builds. Archived Math/Reading/Science lessons predate it (4 questions
  // each) and are deliberately frozen — see subjects.js ARCHIVED_SUBJECTS.
  const activeBuilt = ACTIVE_SUBJECTS.includes(lesson.subject) && !lesson.isQuarterlyExam && !lesson.isTrailblazerBio;
  if (activeBuilt && lesson.questions.length !== 10) {
    shapeErrors.push(`${lesson.id}: ${lesson.questions.length} questions (expected 10)`);
  }
  for (const q of lesson.questions) {
    if (q.type !== 'choice') continue;
    if (!Array.isArray(q.choices)) { shapeErrors.push(`${lesson.id}/${q.id}: no choices`); continue; }
    if (typeof q.answer !== 'number' || q.answer < 0 || q.answer >= q.choices.length) {
      shapeErrors.push(`${lesson.id}/${q.id}: answer index out of range`);
    }
    if (Array.isArray(q.choiceFeedback)) {
      if (q.choiceFeedback.length !== q.choices.length) {
        shapeErrors.push(`${lesson.id}/${q.id}: choiceFeedback length ${q.choiceFeedback.length} != choices ${q.choices.length}`);
      } else if (q.choiceFeedback[q.answer] !== null) {
        shapeErrors.push(`${lesson.id}/${q.id}: choiceFeedback[answer] should be null (misaligned feedback)`);
      }
    }
  }
}
ok(shapeErrors.length === 0, 'question shape valid across every lesson', shapeErrors.slice(0, 12).join('\n      '));

// 5. Standing rule: every socialStudies/aerospace generator has >= 6 bank entries.
//    Bank size isn't exposed, so probe: build many times and count distinct prompts.
const thin = [];
for (const t of problemTemplates.filter((t) => t.subject === 'socialStudies')) {
  const seen = new Set();
  for (let i = 0; i < 60; i++) { try { seen.add(t.build().prompt); } catch { /* counted elsewhere */ } }
  if (seen.size < 6) thin.push(`${t.id} (${seen.size} distinct prompts)`);
}
ok(thin.length === 0, 'every Social Studies generator offers at least 6 distinct prompts', thin.join('; '));


// ---------------------------------------------------------------------------
// 6. TEACHING DEPTH — added Aug 6, 2026.
//
// Why this check exists: the Technology lessons passed every structural
// check above. They had novaIntro, beats, glossary, generators, videos —
// the whole shape — and were recorded in PROJECT_PLAN.md as "rebuilt to
// the full beats teaching standard." They were not. Averaged 734
// characters of teaching against Social Studies' 2,123, with zero test
// questions, and the parent found it before any check did: "it just has
// questions."
//
// Shape is checkable and was checked. Substance was not, so this measures
// it. The floor is deliberately low — 900 characters is about six
// sentences across two beats, well under any of the genuinely-built
// subjects — because this is a "this was never really written" alarm, not
// a style rule.
// ---------------------------------------------------------------------------
const TEACHING_FLOOR = 900;
const depth = new Map();
for (const lesson of allLessons) {
  if (!ACTIVE_SUBJECTS.includes(lesson.subject)) continue;
  if (lesson.isQuarterlyExam || lesson.isTrailblazerBio) continue;
  const beats = lesson.novaIntro?.beats;
  if (!beats) continue;
  const chars = beats.reduce((n, b) => n + (b.teachingText || '').length + (b.example || '').length, 0);
  if (!depth.has(lesson.subject)) depth.set(lesson.subject, []);
  depth.get(lesson.subject).push({ id: lesson.id, chars });
}
console.log('\n--- teaching depth by subject (teachingText + example, per lesson) ---');
const thinLessons = [];
for (const [subject, rows] of depth) {
  const avg = Math.round(rows.reduce((n, r) => n + r.chars, 0) / rows.length);
  const under = rows.filter((r) => r.chars < TEACHING_FLOOR);
  console.log(`    ${subject.padEnd(15)} ${rows.length} lessons · avg ${avg} chars · ${under.length} below the ${TEACHING_FLOOR}-char floor`);
  thinLessons.push(...under.map((r) => `${r.id} (${r.chars})`));
}
ok(
  thinLessons.length === 0,
  `every active-subject lesson carries at least ${TEACHING_FLOOR} characters of teaching`,
  `${thinLessons.length} thin lessons — e.g. ` + thinLessons.slice(0, 5).join(', ')
);

// The per-lesson floor above only catches outright stubs. The Technology
// problem was subtler and worse: every lesson cleared a low bar while the
// SUBJECT as a whole taught at roughly half the depth of the others, which
// is invisible one lesson at a time. So check the subject average too.
// 1,200 sits below Aerospace and Social Studies and above what a set of
// lessons written to a length target produced.
const SUBJECT_AVG_FLOOR = 1200;
const shallowSubjects = [];
for (const [subject, rows] of depth) {
  const avg = Math.round(rows.reduce((n, r) => n + r.chars, 0) / rows.length);
  if (avg < SUBJECT_AVG_FLOOR) shallowSubjects.push(`${subject} (avg ${avg})`);
}
ok(
  shallowSubjects.length === 0,
  `every active subject averages at least ${SUBJECT_AVG_FLOOR} characters of teaching per lesson`,
  shallowSubjects.join(', ') + ' — built to the beats SHAPE but not to the teaching standard'
);

// ---------------------------------------------------------------------------
// A subject can be fully built and still never reach him.
//
// The parent, Aug 7 2026, on hearing Robotics would need its own days: "so
// when robotics and the other lessons are created they will be added to the
// correct days of the week?" The answer was no, and the failure is silent:
// WEEK_PATTERN is a hardcoded weekday -> subject map, and Mission Control
// filters each core day down to the subjects named in it. A subject missing
// from that map is filtered out of Monday through Thursday entirely and
// surfaces only on Friday's catch-up list — lessons written, verified,
// quarter-tagged, exam spliced, and never handed to him on a school day.
//
// Simulated once against a hypothetical 'robotics' subject: it appeared on
// ZERO core days. Nothing in the app said so.
//
// So: any subject with quarter-tagged Mission Control lessons must appear on
// at least one core day. Khan-driven subjects (math, reading, science) carry
// untagged practice lessons and run daily through their own schedule blocks,
// so they are exempt by construction rather than by a hardcoded allow-list.
// ---------------------------------------------------------------------------
const { WEEK_PATTERN } = await import('../src/academies/lamar/data/schedule/weekPattern.js');

const coreDaySubjects = new Set(
  Object.values(WEEK_PATTERN)
    .filter((p) => p.kind === 'core')
    .flatMap((p) => p.subjects)
);

const quarterTaggedSubjects = new Set(
  allLessons.filter((l) => l.quarter).map((l) => l.subject)
);

const unreachable = [...quarterTaggedSubjects].filter((s) => !coreDaySubjects.has(s));
ok(
  unreachable.length === 0,
  'every subject with quarter-tagged lessons appears on at least one core day',
  unreachable
    .map((s) => `${s} has quarter-tagged lessons but is on NO core day — it would only ever show on Friday. Add it to WEEK_PATTERN.`)
    .join(' | ')
);

// AT LEAST TWICE A WEEK UNTIL AUG 9 2026, when the 2:15 block went to ONE
// subject a day so Social Studies and Technology would stop splitting 45
// minutes. A subject gets its own day and the open Friday for overflow, so the
// floor is once. Aerospace still runs twice — asserted separately below.
// Aerospace is the one subject held to twice a week, and on purpose: it is his
// dream, it has 54 lessons against 95 Mon/Wed sessions, and a career interest
// studied once a week is a subject rather than a spark. If it ever drops to one
// day, that was not a rebalance — it was an accident.
ok(
  Object.values(WEEK_PATTERN).filter((p) => p.subjects.includes('aerospace')).length === 2,
  'Aerospace still runs twice a week'
);

for (const subject of coreDaySubjects) {
  const days = Object.values(WEEK_PATTERN).filter((p) => p.subjects.includes(subject)).length;
  ok(
    days >= 1,
    `${subject} appears on at least one core day`,
    `only ${days} day(s) — the 4+1 rotation assumes two sessions per specialized subject`
  );
}

// "He never handles more than two specialized subjects in one day" is the
// parent's rule, quoted in weekPattern.js.
//
// REWRITTEN Aug 8, 2026. This counted NAMES IN THE LIST, which is not the
// rule. Tuesday and Thursday now name three subjects, and that is correct:
// Technology has zero Q4 lessons and Robotics has only Q4 lessons, so they
// hand off and never run together. Counting the list would have blocked a
// change that fully respects her rule, and — worse — it would still have
// passed if two subjects genuinely overlapped in a quarter under a
// two-name list. What matters is how many are LIVE on the same day in the
// same quarter, so that is what this counts now.
const QUARTERS = [...new Set(allLessons.filter((l) => l.quarter).map((l) => l.quarter))];
const lessonsPerSubjectQuarter = new Map();
for (const l of allLessons) {
  if (!l.quarter || l.isQuarterlyExam) continue;
  const k = l.subject + '|' + l.quarter;
  lessonsPerSubjectQuarter.set(k, (lessonsPerSubjectQuarter.get(k) || 0) + 1);
}
const overloaded = [];
for (const day of Object.values(WEEK_PATTERN)) {
  if (day.kind !== 'core') continue;
  for (const q of QUARTERS) {
    const live = day.subjects.filter((s) => (lessonsPerSubjectQuarter.get(s + '|' + q) || 0) > 0);
    if (live.length > 2) overloaded.push(`${day.label} in ${q} has ${live.length} live: ${live.join(', ')}`);
  }
}
ok(
  overloaded.length === 0,
  'no core day carries more than two specialized subjects LIVE in any quarter',
  overloaded.join(' | ')
);

console.log('\n--- live specialized subjects per core day, by quarter ---');
for (const day of Object.values(WEEK_PATTERN)) {
  if (day.kind !== 'core') continue;
  const cells = QUARTERS.map((q) => {
    const live = day.subjects.filter((s) => (lessonsPerSubjectQuarter.get(s + '|' + q) || 0) > 0);
    return `${q.split(' ')[0]}:${live.length}`;
  });
  console.log('    ' + day.label.padEnd(10) + cells.join('  ') + '   [' + day.subjects.join(', ') + ']');
}


// ---------------------------------------------------------------------------
// KHAN COVERAGE — added Aug 7, 2026.
//
// Why this exists: every check above passed while Science carried three Khan
// units for a nine-week Q1. Lamar would have run out of Science in three
// weeks. The subject was correctly marked Khan-driven, correctly exempt from
// the lesson-shape checks, correctly scheduled on Monday and Wednesday — and
// completely empty. "Has no work" and "is correctly Khan-driven" were
// indistinguishable to this file.
//
// So: a Khan-driven subject must carry enough graded work per quarter to
// actually fill it. The unit is Khan "items" (graded exercises + quizzes +
// unit test), counted off the live course pages.
//
// The floor is 3 items/week. At 30-45 min/day x 4 days he clears 4-5, so 3 is
// a "this quarter is empty" alarm, not a pacing rule. The ceiling is the
// parent's own cap, stated directly: no more than 12 units in a quarter.
// ---------------------------------------------------------------------------
const { SCIENCE_KHAN_SEQUENCE, QUARTER_WEEKS, SCIENCE_COURSE_CHALLENGES } =
  await import('../src/academies/lamar/data/khan/scienceSequence.js');

const ITEMS_PER_WEEK_FLOOR = 3;
const MAX_UNITS_PER_QUARTER = 12;

console.log('\n--- Khan coverage: science ---');
const thinQuarters = [];
const fatQuarters = [];
for (const [label, units] of Object.entries(SCIENCE_KHAN_SEQUENCE)) {
  const weeks = QUARTER_WEEKS[label];
  const items = units.reduce((n, u) => n + (u.items || 0), 0);
  const unmeasured = units.filter((u) => u.items == null).length;
  const pace = weeks ? (items / weeks) : null;
  console.log(
    '    ' + label.padEnd(16) + units.length + ' units · ' + items + ' items' +
    (weeks ? ' · ' + pace.toFixed(1) + ' items/week over ' + weeks + ' weeks' : ' · summer, open-ended') +
    (unmeasured ? ' · ' + unmeasured + ' unmeasured' : '')
  );
  if (weeks && pace < ITEMS_PER_WEEK_FLOOR) {
    thinQuarters.push(label + ' (' + pace.toFixed(1) + ' items/week)');
  }
  if (units.length > MAX_UNITS_PER_QUARTER) {
    fatQuarters.push(label + ' (' + units.length + ' units)');
  }
}
ok(
  thinQuarters.length === 0,
  `every science quarter carries at least ${ITEMS_PER_WEEK_FLOOR} Khan items per week`,
  thinQuarters.join(', ') + ' — he would run out of work before the quarter ends'
);
ok(
  fatQuarters.length === 0,
  `no science quarter exceeds the parent's ${MAX_UNITS_PER_QUARTER}-unit cap`,
  fatQuarters.join(', ')
);

// Every quarter named in QUARTER_WEEKS must actually exist in the sequence.
// A typo'd label would otherwise read as a silently absent quarter.
const missingQuarters = Object.keys(QUARTER_WEEKS).filter((q) => !SCIENCE_KHAN_SEQUENCE[q]);
ok(missingQuarters.length === 0, 'every school quarter has a science sequence', missingQuarters.join(', '));

// URLs: real, absolute, on Khan Academy, and never duplicated. A duplicate
// URL is the specific bug the parent caught by hand once already, where two
// differently-titled assignments pointed at the same page.
const allKhanRows = [
  ...Object.values(SCIENCE_KHAN_SEQUENCE).flat(),
  ...SCIENCE_COURSE_CHALLENGES
];
const badUrls = allKhanRows
  .filter((r) => !/^https:\/\/www\.khanacademy\.org\//.test(r.khanAcademyUrl || ''))
  .map((r) => r.skillTitle);
ok(badUrls.length === 0, 'every science Khan URL is an absolute khanacademy.org https URL', badUrls.join(', '));

const urlCounts = new Map();
for (const r of allKhanRows) urlCounts.set(r.khanAcademyUrl, (urlCounts.get(r.khanAcademyUrl) || 0) + 1);
const dupeUrls = [...urlCounts.entries()].filter(([, n]) => n > 1).map(([u]) => u);
ok(dupeUrls.length === 0, 'no two science assignments point at the same Khan URL', dupeUrls.join(', '));

const titleCounts = new Map();
for (const r of allKhanRows) titleCounts.set(r.skillTitle, (titleCounts.get(r.skillTitle) || 0) + 1);
const dupeTitles = [...titleCounts.entries()].filter(([, n]) => n > 1).map(([t]) => t);
ok(dupeTitles.length === 0, 'no duplicate science skill titles', dupeTitles.join(', '));

// sequenceInQuarter must be unique inside a quarter, or ordering is undefined.
const seqErrors = [];
for (const [label, units] of Object.entries(SCIENCE_KHAN_SEQUENCE)) {
  const seqs = units.map((u) => u.sequenceInQuarter);
  if (new Set(seqs).size !== seqs.length) seqErrors.push(label);
}
ok(seqErrors.length === 0, 'science sequenceInQuarter is unique within every quarter', seqErrors.join(', '));

// Each course challenge must land in a quarter that actually exists, and
// carry the 99 sequence the store's ordering convention depends on.
const ccErrors = SCIENCE_COURSE_CHALLENGES
  .filter((c) => !SCIENCE_KHAN_SEQUENCE[c.batchLabel] || c.sequenceInQuarter !== 99 || !c.isCourseChallenge)
  .map((c) => c.skillTitle);
ok(ccErrors.length === 0, 'every science course challenge is well-formed and in a real quarter', ccErrors.join(', '));

// The retired-titles set in the store must not name anything the sequence
// actively seeds — that combination deletes live rows on every hydrate.
const storeSrc = fs.readFileSync(new URL('../src/store/useAppStore.js', import.meta.url), 'utf8');
const retiredBlock = storeSrc.slice(
  storeSrc.indexOf('const RETIRED_SCIENCE_TITLES'),
  storeSrc.indexOf(']);', storeSrc.indexOf('const RETIRED_SCIENCE_TITLES'))
);
const seededTitles = Object.values(SCIENCE_KHAN_SEQUENCE).flat().map((u) => u.skillTitle);
const selfDeleting = seededTitles.filter((t) => retiredBlock.includes("'" + t + "'"));
ok(
  selfDeleting.length === 0,
  'no actively-seeded science unit is also listed for retirement',
  selfDeleting.join(', ') + ' — these would be deleted on every hydrate'
);


// The reconcile in useAppStore.js deletes any science row whose title we own
// but whose (title, quarter) pair we don't. If the key set were ever built
// from a different shape than the rows we actually seed, that cleanup would
// delete live rows the moment they were created. Assert they agree.
const { SCIENCE_CANONICAL_KEYS, SCIENCE_CANONICAL_TITLES } =
  await import('../src/academies/lamar/data/khan/scienceSequence.js');
const seededKeys = [
  ...Object.entries(SCIENCE_KHAN_SEQUENCE).flatMap(([label, units]) =>
    units.map((u) => u.skillTitle + '||' + label)),
  ...SCIENCE_COURSE_CHALLENGES.map((c) => c.skillTitle + '||' + c.batchLabel)
];
const uncovered = seededKeys.filter((k) => !SCIENCE_CANONICAL_KEYS.has(k));
ok(
  uncovered.length === 0,
  'every seeded science row is covered by SCIENCE_CANONICAL_KEYS',
  uncovered.join(', ') + ' — the hydrate reconcile would delete these on sight'
);
const titlesUncovered = seededKeys
  .map((k) => k.split('||')[0])
  .filter((t) => !SCIENCE_CANONICAL_TITLES.has(t));
ok(titlesUncovered.length === 0, 'every seeded science title is in SCIENCE_CANONICAL_TITLES', titlesUncovered.join(', '));
ok(
  SCIENCE_CANONICAL_KEYS.size === seededKeys.length,
  'SCIENCE_CANONICAL_KEYS has no extra or duplicate entries',
  `set has ${SCIENCE_CANONICAL_KEYS.size}, sequence produces ${seededKeys.length}`
);


// Uniqueness alone let a real bug through: Q2 shipped with units numbered
// 2 and 3 and nothing at 1, which is unique and still wrong. Ordering must
// start at 1 and have no holes, or "what's next" is undefined.
const gapErrors = [];
for (const [label, units] of Object.entries(SCIENCE_KHAN_SEQUENCE)) {
  const seqs = units.map((u) => u.sequenceInQuarter).sort((a, b) => a - b);
  const expected = seqs.map((_, i) => i + 1);
  if (JSON.stringify(seqs) !== JSON.stringify(expected)) {
    gapErrors.push(`${label} has [${seqs.join(', ')}], expected [${expected.join(', ')}]`);
  }
}
ok(gapErrors.length === 0, 'science sequenceInQuarter runs 1..n with no gaps in every quarter', gapErrors.join(' | '));

// ===========================================================================
console.log('\n--- Khan coverage: every science course unit, exactly once ---');
// ===========================================================================
/**
 * WHY THIS EXISTS. The parent, Aug 9 2026: "science only has 5 instead of 10
 * and the course challenge 11 is teacher unit."
 *
 * Nothing was actually missing — Q1's five units are three at biology level
 * plus two chemistry, and all 22 content units are scheduled across the year.
 * But there was no way to establish that from inside this project. Every
 * existing science check verified INTERNAL consistency: unique sequences, no
 * gaps, well-formed URLs. None of them knew how many units each Khan course
 * actually has, so "is a unit missing" could only be answered by opening four
 * course pages and counting.
 *
 * These checks answer it here. They also encode the thing she spotted: Khan's
 * headline unit count includes a simulations unit and a teacher-resources unit
 * that are not student work, so the real denominator is smaller than the page
 * advertises.
 */
const { SCIENCE_COURSES, scienceCoverageByCourse } =
  await import('../src/academies/lamar/data/khan/scienceSequence.js');

const coverage = scienceCoverageByCourse();
for (const course of Object.values(coverage)) {
  const nums = course.covered.map((u) => u.khanUnit);
  const expectedUnits = Array.from({ length: course.contentUnits }, (_, i) => i + 1);
  const missing = expectedUnits.filter((n) => !nums.includes(n));
  const extra = nums.filter((n) => n > course.contentUnits);
  const dupes = nums.filter((n, i) => nums.indexOf(n) !== i);

  ok(
    missing.length === 0,
    `${course.label}: all ${course.contentUnits} content units are scheduled`,
    missing.length ? `missing unit${missing.length > 1 ? 's' : ''} ${missing.join(', ')}` : ''
  );
  ok(dupes.length === 0, `${course.label}: no unit is scheduled twice`, dupes.join(', '));
  ok(
    extra.length === 0,
    `${course.label}: nothing is scheduled beyond unit ${course.contentUnits}`,
    extra.length
      ? `unit${extra.length > 1 ? 's' : ''} ${extra.join(', ')} — units above ${course.contentUnits} are the simulations and teacher-resources units, which are not student work`
      : ''
  );
  /**
   * ONE unit is excluded, not two — corrected Aug 9, 2026 on the parent's
   * "it literally has 10 units for biology for middle school."
   *
   * The teacher-resources unit is the only one that is not his: it has no
   * exercises at all. The simulations unit HAS exercises; they simply carry no
   * mastery points. Counting it out was the error, and this assertion is what
   * now makes that error impossible to reintroduce quietly.
   */
  ok(
    course.khanShowsUnits === course.contentUnits + 1,
    `${course.label}: Khan shows ${course.khanShowsUnits} units, ${course.contentUnits} are his + 1 teacher unit`
  );
  ok(
    course.contentUnits === course.gradedUnits + 1,
    `${course.label}: ${course.gradedUnits} graded units + 1 simulations unit that earns no mastery`
  );
}

const totalScheduled = Object.values(coverage).reduce((n, c) => n + c.covered.length, 0);
const totalContent = Object.values(coverage).reduce((n, c) => n + c.contentUnits, 0);
ok(
  totalScheduled === totalContent,
  `all ${totalContent} content units across the four courses are scheduled (${totalScheduled})`
);

// A course challenge belongs in the quarter where that course's LAST unit
// lands — schedule it earlier and he sits a cumulative test on material he has
// not met yet.
const challengeErrors = [];
for (const challenge of SCIENCE_COURSE_CHALLENGES) {
  const course = coverage[challenge.courseId];
  if (!course) { challengeErrors.push(`${challenge.skillTitle}: unknown courseId`); continue; }
  const lastUnit = course.covered[course.covered.length - 1];
  if (!lastUnit) { challengeErrors.push(`${challenge.skillTitle}: course has no scheduled units`); continue; }
  if (lastUnit.batchLabel !== challenge.batchLabel) {
    challengeErrors.push(
      `${course.label}: challenge is in ${challenge.batchLabel} but the course finishes in ${lastUnit.batchLabel}`
    );
  }
}
ok(
  challengeErrors.length === 0,
  'every course challenge sits in the quarter where that course finishes',
  challengeErrors.join(' | ')
);

// The simulations unit models material from across its whole course, so it
// belongs at the end of that course — same rule as the challenge.
const simErrors = [];
for (const course of Object.values(coverage)) {
  const sim = course.covered.find((u) => u.khanUnit === course.contentUnits);
  if (!sim) { simErrors.push(`${course.label}: simulations unit not scheduled`); continue; }
  const last = course.covered[course.covered.length - 1];
  if (sim.khanUnit !== last.khanUnit) {
    simErrors.push(`${course.label}: simulations unit is not last in the course`);
  }
}
ok(
  simErrors.length === 0,
  'every simulations unit is scheduled, and last in its course',
  simErrors.join(' | ')
);

// Every course must expose its teacher-resources unit, because it is the one
// piece of these courses written for the PARENT and it reached no screen until
// the Science Course Map was built.
const teacherMissing = Object.values(SCIENCE_COURSES)
  .filter((c) => c.contentUnits !== null && !c.teacherResourcesUrl)
  .map((c) => c.label);
ok(teacherMissing.length === 0, 'every course links its teacher-resources unit', teacherMissing.join(', '));

/**
 * Q1 IS ONE COURSE. (Parent's instruction, Aug 9 2026: "chemistry was added to
 * q1 because there was supposedly not enough biology lessons but there is
 * enough. chemistry can be for qtr 2.")
 *
 * Chemistry was pulled into Q1 on a premise that turned out to be wrong —
 * biology counted at nine units instead of ten, so the quarter looked short.
 * This asserts the premise cannot quietly return: Q1 is biology (plus the
 * hs-bio supplement that deepens biology unit 1) and nothing else.
 */
const q1Courses = new Set(
  (SCIENCE_KHAN_SEQUENCE['Q1 2026-2027'] || []).map((u) => u.courseId)
);
ok(
  q1Courses.size === 1 && q1Courses.has('bio'),
  'Q1 science is biology and nothing else',
  [...q1Courses].join(', ')
);

/**
 * EXACTLY the ten units and the Course Challenge — eleven rows, no extras.
 *
 * The parent asked for this four times before it was delivered, the fourth
 * time as "i said it over and over". A stray twelfth row is not a rounding
 * error to her; it is the app not listening. This asserts the count itself.
 */
ok(
  (SCIENCE_KHAN_SEQUENCE['Q1 2026-2027'] || []).length === 10,
  `Q1 holds exactly 10 science units (${(SCIENCE_KHAN_SEQUENCE['Q1 2026-2027'] || []).length})`
);

/**
 * No high-school science anywhere this year. "If the human body system dont
 * belong in this year dont add it" — the rule generalises: this is a
 * middle-school science year, and an hs-bio or hs-chem URL slipping in is the
 * same mistake wearing a different unit's name.
 */
const hsRows = Object.entries(SCIENCE_KHAN_SEQUENCE)
  .flatMap(([label, units]) => units.filter((u) => /\/hs-|high-school/.test(u.khanAcademyUrl)).map((u) => `${label}: ${u.skillTitle}`));
ok(hsRows.length === 0, 'no high-school science units are scheduled this year', hsRows.join(', '));

/**
 * ONE COURSE PER QUARTER, WHOLE. (Parent, Aug 9 2026: "i said i want all 10
 * units and the course challenge for qtr 1.")
 *
 * Each quarter is a single Khan science course from unit 1 to its Course
 * Challenge. This is the structural rule that replaced the rotating spine, and
 * it is worth asserting rather than trusting: a unit quietly slipping into the
 * wrong quarter would restore exactly the interleave she asked to be removed.
 */
const quarterCourses = {};
for (const [label, units] of Object.entries(SCIENCE_KHAN_SEQUENCE)) {
  quarterCourses[label] = [...new Set(units.map((u) => u.courseId))];
}
const mixed = Object.entries(quarterCourses)
  .filter(([, ids]) => ids.length > 1)
  .map(([label, ids]) => `${label}: ${ids.join(' + ')}`);
ok(mixed.length === 0, 'no quarter mixes two science courses', mixed.join(' | '));

/** Every course is finished inside one quarter, so nothing spills into Summer. */
ok(
  (SCIENCE_KHAN_SEQUENCE['Summer 2027'] || []).length === 0,
  'Summer carries no Khan science — it is reserved for summer reading and book reports'
);

/** Biology, entire, in Q1 — all ten units and the Course Challenge. */
const q1Bio = (SCIENCE_KHAN_SEQUENCE['Q1 2026-2027'] || []).filter((u) => u.courseId === 'bio');
ok(
  q1Bio.length === 10,
  `all 10 biology units are in Q1 (${q1Bio.length})`,
  q1Bio.map((u) => u.khanUnit).join(', ')
);
ok(
  SCIENCE_COURSE_CHALLENGES.some((c) => c.courseId === 'bio' && c.batchLabel === 'Q1 2026-2027'),
  'the Biology Course Challenge is in Q1'
);

/** Chemistry runs start-to-finish inside Q2, per the same instruction. */
const chemQuarters = new Set(
  Object.entries(SCIENCE_KHAN_SEQUENCE)
    .flatMap(([label, units]) => units.filter((u) => u.courseId === 'chem').map(() => label))
);
ok(
  chemQuarters.size === 1 && chemQuarters.has('Q2 2026-2027'),
  'every chemistry unit sits in Q2',
  [...chemQuarters].join(', ')
);

/**
 * A course's units must run in the course's own order across the year. The
 * grammar bug earlier today was exactly this failure in another subject: unit
 * 1 followed by unit 3, with unit 2 parked at the end.
 */
const orderErrors = [];
const PERIOD_SEQUENCE = ['Q1 2026-2027', 'Q2 2026-2027', 'Q3 2026-2027', 'Q4 2026-2027', 'Summer 2027'];
for (const course of Object.values(coverage)) {
  const inYearOrder = [];
  for (const label of PERIOD_SEQUENCE) {
    (SCIENCE_KHAN_SEQUENCE[label] || [])
      .filter((u) => u.courseId === course.id && u.khanUnit !== null)
      .sort((a, b) => a.sequenceInQuarter - b.sequenceInQuarter)
      .forEach((u) => inYearOrder.push(u.khanUnit));
  }
  const ascending = inYearOrder.every((n, i) => i === 0 || n > inYearOrder[i - 1]);
  if (!ascending) orderErrors.push(`${course.label}: ${inYearOrder.join(' -> ')}`);
}
ok(
  orderErrors.length === 0,
  "every course's units run in Khan's own order across the year",
  orderErrors.join(' | ')
);

console.log(`\n${failures === 0 ? 'ALL CHECKS PASSED' : failures + ' CHECK(S) FAILED'}`);
process.exit(failures === 0 ? 0 : 1);
