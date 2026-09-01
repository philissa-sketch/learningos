// ---------------------------------------------------------------------------
// A MISSION GRADES THE SUBJECTS IT NAMES.
// Run: node scripts/verify-mission-grades.mjs
//
// ---- WHERE THIS CAME FROM (audit item O-6(a), Aug 26 2026) ----
//
// The audit said the Quarterly Mission Evaluation "reaches no subject average."
// My first read was that this was correct by design — a mission is cross-subject,
// so of course it belongs to no single subject.
//
// Wrong, and the file it was wrong about says so in its own words. Above the
// twelve proposals in data/admin/missionEvaluations.js:
//
//   "Each is cross-subject on purpose. A mission that only touches Aerospace
//    GRADES AEROSPACE; a mission that needs the math to size it, the writing to
//    document it and the science to explain it GRADES THE QUARTER."
//
// Every proposal carries a `subjects` array written for exactly that, and
// nothing in the app had ever read it for grading. The design was written down,
// the data was built to match, and the code never did the thing.
//
// It mattered more than most, because lib/compliancePacket.js calls these
// evaluations "the assessment evidence — it stands in for the standardized
// testing this family deliberately does not do." The app's own primary
// assessment counted for nothing on the transcript, while a book report counted.
// ---------------------------------------------------------------------------
import './lib/academy-under-test.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MG = await import(REPO + '/src/lib/missionGrades.js');
const { MISSION_PROPOSALS, MISSION_RUBRIC_CRITERIA, MISSION_QUARTERS } =
  await import(REPO + '/src/academies/lamar/data/admin/missionEvaluations.js');
const { SUBJECT_LABELS, PARTICIPATION_SUBJECTS } = await import(REPO + '/src/academies/lamar/subjects.js');

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
 * this project has been caught by that nine times now.
 */
const codeOnly = (rel) =>
  read(rel)
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    .replace(/^\s*\/\/.*$/gm, '');

/** A full-marks rubric, so tests are about attribution rather than arithmetic. */
const FULL = Object.fromEntries(MISSION_RUBRIC_CRITERIA.map((c) => [c.id, 4]));
const HALF = Object.fromEntries(MISSION_RUBRIC_CRITERIA.map((c) => [c.id, 2]));

const approved = (over = {}) => ({
  quarter: 'Q1 2026-2027',
  projectId: 'q1-glider',
  scores: FULL,
  parentApproved: true,
  completedAt: '2026-10-01T12:00:00.000Z',
  ...over
});

console.log('\n--- 1. the proposals still carry the subjects this depends on ---');
{
  const all = Object.values(MISSION_PROPOSALS).flat();
  ok('every proposal names at least one subject',
    all.every((p) => Array.isArray(p.subjects) && p.subjects.length > 0),
    all.filter((p) => !p.subjects?.length).map((p) => p.id).join(', '));
  /**
   * A subject that does not exist grades nothing and says nothing — the exact
   * silent failure this file exists to prevent, one typo away.
   */
  const unknown = [...new Set(all.flatMap((p) => p.subjects))].filter((s) => !SUBJECT_LABELS[s]);
  ok('...and every subject named is a real one', unknown.length === 0, unknown.join(', '));
  /**
   * A participation subject has no average for a mission to move. Attaching one
   * would score a mission into a void.
   */
  const participation = [...new Set(all.flatMap((p) => p.subjects))]
    .filter((s) => PARTICIPATION_SUBJECTS.includes(s));
  ok('...and none is a participation subject with no average to move',
    participation.length === 0, participation.join(', '));
  ok('every mission quarter has proposals to choose from',
    MISSION_QUARTERS.every((q) => (MISSION_PROPOSALS[q] || []).length > 0),
    MISSION_QUARTERS.filter((q) => !(MISSION_PROPOSALS[q] || []).length).join(', '));
}

console.log('\n--- 2. an approved mission grades the subjects it names, and only those ---');
{
  const rows = MG.missionScoresForSubject('aerospace', [approved()]);
  ok('the glider grades Aerospace', rows.length === 1 && rows[0].value === 1, JSON.stringify(rows));
  ok('...and Maths and Reading, which it also names',
    MG.missionScoresForSubject('math', [approved()]).length === 1 &&
      MG.missionScoresForSubject('reading', [approved()]).length === 1);
  ok('...and not Science, which it does not',
    MG.missionScoresForSubject('science', [approved()]).length === 0,
    'a mission that graded every subject would be worth nothing as evidence');
  ok('the percentage is the rubric total over its max',
    MG.missionScoresForSubject('aerospace', [approved({ scores: HALF })])[0].value === 0.5);
}

console.log('\n--- 3. only a finalized mission moves a grade ---');
{
  /**
   * The same rule the compliance packet applies, for the same reason: a
   * scored-but-unapproved rubric is a draft, and a draft that moves a letter
   * grade is a grade she never signed off on.
   */
  ok('scored but not approved grades nothing',
    MG.missionScoresForSubject('aerospace', [approved({ parentApproved: false })]).length === 0);
  ok('approved but only partly scored grades nothing',
    MG.missionScoresForSubject('aerospace', [
      approved({ scores: { understanding: 4 } })
    ]).length === 0,
    'half a rubric is not an assessment');
  ok('...and the screen says which of the two is holding it up',
    /not finalized/i.test(MG.missionGradeGap(approved({ parentApproved: false })) || ''),
    MG.missionGradeGap(approved({ parentApproved: false })) || 'no message at all');
  ok('a mission still in progress is NOT flagged as a problem',
    MG.missionGradeGap({ quarter: 'Q1 2026-2027', projectId: 'q1-glider', scores: {} }) === null,
    'an unfinished mission reaching no grade is not a fault, it is Tuesday');
}

console.log('\n--- 4. a custom mission cannot be scored into a void ---');
{
  /**
   * THE GAP THAT WOULD HAVE BEEN SILENT. A mission she types in has no
   * proposal and therefore no subjects. Before `customSubjects` it could be
   * chosen, built over a whole quarter, scored, approved, printed in the
   * compliance packet — and grade absolutely nothing.
   */
  const bare = approved({ projectId: null, customTitle: 'Backyard weather station' });
  ok('a custom mission with no subjects grades nothing',
    MG.missionScoresForSubject('science', [bare]).length === 0);
  ok('...and says so before she spends an evening scoring it',
    /not attached to any subject/i.test(MG.missionGradeGap(bare) || ''),
    MG.missionGradeGap(bare) || 'no message at all');
  const pointed = approved({
    projectId: null, customTitle: 'Backyard weather station', customSubjects: ['science', 'math']
  });
  ok('...and once she picks subjects it grades them',
    MG.missionScoresForSubject('science', [pointed]).length === 1 &&
      MG.missionScoresForSubject('math', [pointed]).length === 1 &&
      MG.missionScoresForSubject('aerospace', [pointed]).length === 0);
  ok('...with no complaint left to make', MG.missionGradeGap(pointed) === null);

  const store = codeOnly('src/store/useAppStore.js');
  ok('a finalized mission cannot be quietly re-pointed at other subjects',
    /Reopen the evaluation before changing its subjects/.test(store),
    'moving subjects after approval rewrites grades in two subjects at once');
}

console.log('\n--- 5. the weight is what she decided: as much as the quarter ---');
{
  /**
   * Her ruling, given the arithmetic: a mission weighs what a quarterly exam
   * weighs. At weight 1, four whole projects are 3.9% of Aerospace — the exact
   * failure she had already ruled on for exams, where "a student could fail
   * every quarterly exam and finish with an A".
   */
  const rows = MG.missionScoresForSubject('aerospace', [approved()], { weightFor: () => 11 });
  ok('the caller decides the weight and it reaches the row', rows[0].weight === 11);

  const store = codeOnly('src/store/useAppStore.js');
  ok('the report card asks for a quarter-sized weight, not 1',
    /weightFor: \(quarterLabel\) =>/.test(store) && /lessonsSatInQuarter\.get\(quarterLabel\)/.test(store));
  /**
   * AND IT HAS TO MEAN THAT IN EVERY SUBJECT. Maths, Reading and Science carry
   * no quarter-tagged lessons — they run on Khan — so a lessons-only weight
   * would hand a maths mission weight 1 while an aerospace mission got eleven.
   * Same rule, wildly different answers, and nothing would have said so.
   */
  ok('...counting Khan units too, so the three Khan-taught subjects are not left at weight 1',
    /khanGradedInQuarter\.get\(quarterLabel\)/.test(store),
    'aerospace 11, maths 1 — same rule, and nothing on any screen would have said so');
  ok('the mission rows are actually in the average',
    /\.\.\.missionRows\.map\(\(m\) => \(\{ value: m\.value, weight: m\.weight \}\)\)/.test(store),
    'computing them and not adding them is the fault this file is about');
}

console.log('\n--- 6. the school-year filter behaves like every other source ---');
{
  const lastYear = approved({ completedAt: '2025-11-01T12:00:00.000Z' });
  ok("last year's mission is excluded when the filter says so",
    MG.missionScoresForSubject('aerospace', [lastYear], {
      inSchoolYear: (d) => d >= '2026-08-01'
    }).length === 0);
  ok('...and this year\'s is kept',
    MG.missionScoresForSubject('aerospace', [approved()], {
      inSchoolYear: (d) => d >= '2026-08-01'
    }).length === 1);
  /**
   * A row with no timestamp is COUNTED, not dropped. The year filter exists to
   * exclude last year's work, not to discard an assessment whose date field is
   * missing — silently dropping a graded, approved mission is the worse error.
   */
  ok('a mission with no date is counted rather than silently dropped',
    MG.missionScoresForSubject('aerospace', [approved({ completedAt: null })], {
      inSchoolYear: () => false
    }).length === 1);
  ok('...and approval date stands in when completion date is missing',
    MG.missionScoresForSubject('aerospace', [
      approved({ completedAt: null, approvedAt: '2026-10-02T12:00:00.000Z' })
    ], { inSchoolYear: (d) => d >= '2026-08-01' }).length === 1);
}

console.log('\n--- 7. it reaches the documents that leave the house ---');
{
  const parent = read('src/components/Dashboard/ParentDashboard.jsx');
  ok('the transcript evidence line names the missions',
    /row\.missionEvidence/.test(codeOnly('src/components/Dashboard/ParentDashboard.jsx')),
    'a subject graded partly by a mission that names no mission is a self-contradicting transcript');
  ok('...and the store returns the phrase for it',
    /missionEvidence: missionEvidencePhrase\(missionRows\)/.test(codeOnly('src/store/useAppStore.js')));
  ok('the phrase says how many and how well',
    MG.missionEvidencePhrase([{ value: 0.9 }, { value: 0.8 }]) === '2 quarterly missions scored, 85% average',
    MG.missionEvidencePhrase([{ value: 0.9 }, { value: 0.8 }]));
  ok('...and says nothing at all when there are none',
    MG.missionEvidencePhrase([]) === null,
    '"0 missions" in a records packet is the confident wrong sentence this project has printed once already');

  const panel = codeOnly('src/components/Dashboard/MissionEvaluationSection.jsx');
  ok('the evaluation screen shows which subjects the mission grades',
    /missionSubjects\(mission\)/.test(panel) && /Grades: /.test(panel));
  ok('...and warns when it will reach no grade',
    /missionGradeGap\(mission\)/.test(panel));
  ok('...and asks for subjects when she writes her own mission',
    /setCustomMission\(quarter, customTitle, customSubjects\)/.test(panel));
  ok('the compliance packet still prints only approved evaluations',
    /m\.parentApproved && missionScoreTotals\(m\.scores\)/.test(read('src/lib/compliancePacket.js')),
    'a draft in a records packet a year later reads exactly like a finished assessment');
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
