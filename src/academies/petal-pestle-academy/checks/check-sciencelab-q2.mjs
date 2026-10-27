// ---------------------------------------------------------------------------
// CHECK: THE SCIENCE LAB RUNS QUARTER 1 AND QUARTER 2 (it used to be 1 and 3).
//
//   node src/academies/petal-pestle-academy/checks/check-sciencelab-q2.mjs
//   node src/academies/petal-pestle-academy/checks/check-sciencelab-q2.mjs --self-test
//
// Gigi, Oct 27 2026: "Science lab skipped the exam and went to qtr 3. Add the
// exam and move qtr 3 to qtr 2."
//
// WHAT THIS PROVES
//   1. The course says quarters [1, 2] on both the course card and the plan.
//   2. No Science Lab lesson, module, week or standard is still in quarter 3.
//   3. Quarter 2 holds the 8 weeks (modules 5-8, 24 lessons) that were Quarter 3.
//   4. Her saved results survive. Her two real attempts are keyed
//      sciencelab-q3-w1 / -w2 (75% and 50%); the test ids were kept on purpose,
//      and the gradebook now shows them under Quarter 2 with the same 63%.
//   5. A Quarter 2 EXAM exists and builds (24 questions, id sciencelab-q2-final),
//      and a Quarter 3 exam does not.
//   6. Her Quarter 2 exam result would reach the gradebook as "Quarter 2 Exam".
//
// WHAT THIS CANNOT PROVE: how the screen looks. It reads the code's output.
//
// --self-test puts each bug back into a temporary copy of src/ and fails if the
// check does not catch it.
// ---------------------------------------------------------------------------
import { cpSync, mkdtempSync, readFileSync, writeFileSync, symlinkSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';

const HERE = dirname(fileURLToPath(import.meta.url));
const argRoot = process.argv.find((a) => a.startsWith('--root='));
const ROOT = argRoot ? argRoot.slice(7) : join(HERE, '..');
const SELF_TEST = process.argv.includes('--self-test');

if (SELF_TEST) {
  const REPO = join(HERE, '..', '..', '..', '..');
  const A = 'src/academies/petal-pestle-academy/';
  const BUGS = [
    ['course card still says quarters [1, 3]', A + 'data/lessons/appCourses.js', "quarters: [1, 2],\n    modules: SCIENCELAB_MODULES", "quarters: [1, 3],\n    modules: SCIENCELAB_MODULES"],
    ['plan still says quarters [1, 3]', A + 'config/curriculumPlan.js', "quarters: [1, 2],\n    lessonDaysPerWeek: 3,\n    weeklyTestQuestions: 8,\n    kind: 'science'", "quarters: [1, 3],\n    lessonDaysPerWeek: 3,\n    weeklyTestQuestions: 8,\n    kind: 'science'"],
    ['a week is still in quarter 3', A + 'config/assessment.js', "{ id: 'sciencelab-q3-w5', course: 'sciencelab', quarter: 2,", "{ id: 'sciencelab-q3-w5', course: 'sciencelab', quarter: 3,"],
    ['a lesson is still in quarter 3', A + 'data/lessons/sciencelabM7.js', "id: 'sl-m7-03', course: 'sciencelab', module: 7, quarter: 2,", "id: 'sl-m7-03', course: 'sciencelab', module: 7, quarter: 3,"],
    ['a module is still in quarter 3', A + 'data/lessons/sciencelabCourse.js', "quarter: 2,\n    weeks: [7, 8],", "quarter: 3,\n    weeks: [7, 8],"],
    ['a standard is still in quarter 3', A + 'config/curriculumPlan.js', "element: 'S4E1d', course: 'sciencelab', quarter: 2", "element: 'S4E1d', course: 'sciencelab', quarter: 3"],
    ['test ids renamed (her saved results orphaned)', A + 'config/assessment.js', "id: 'sciencelab-q3-w1'", "id: 'sciencelab-q2-w1'"]
  ];
  let missed = 0;
  for (const [name, rel, good, bad] of BUGS) {
    const tmp = mkdtempSync(join(tmpdir(), 'pp-sl-'));
    cpSync(join(REPO, 'src'), join(tmp, 'src'), { recursive: true });
    try { symlinkSync(join(REPO, 'node_modules'), join(tmp, 'node_modules')); } catch {}
    const f = join(tmp, rel);
    const text = readFileSync(f, 'utf8');
    if (!text.includes(good)) { console.log(`  SETUP FAIL  ${name}: text to break not found`); missed++; continue; }
    writeFileSync(f, text.replace(good, bad));
    const r = spawnSync(process.execPath, [fileURLToPath(import.meta.url), `--root=${join(tmp, A)}`], { encoding: 'utf8' });
    if (r.status === 0) { console.log(`  NOT CAUGHT  ${name}`); missed++; } else console.log(`  caught      ${name}`);
  }
  console.log(missed ? `\n${missed} bug(s) NOT caught.` : `\nAll ${BUGS.length} bugs caught.`);
  process.exit(missed ? 1 : 0);
}

const imp = (rel) => import(pathToFileURL(join(ROOT, rel)).href);
const [{ APP_COURSES }, { allWeeks }, plan, engine, { getSubjectGrades }, { ALL_SCIENCELAB_LESSONS, SCIENCELAB_MODULES }] = await Promise.all([
  imp('data/lessons/appCourses.js'), imp('config/assessment.js'), imp('config/curriculumPlan.js'),
  imp('lib/assessmentEngine.js'), imp('lib/gradebook.js'), imp('data/lessons/sciencelabCourse.js')
]);

let fails = 0;
const ok = (c, msg) => { if (!c) { fails++; console.log('  FAIL  ' + msg); } else console.log('  ok    ' + msg); };
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// 1
const card = APP_COURSES.find((c) => c.id === 'sciencelab');
const planCourse = (plan.COURSES || plan.CURRICULUM_COURSES || Object.values(plan).find(Array.isArray) || []).find?.((c) => c.id === 'sciencelab');
ok(same(card.quarters, [1, 2]), 'course card runs quarters 1 and 2');
ok(!planCourse || same(planCourse.quarters, [1, 2]), 'plan runs quarters 1 and 2');
// 2
const weeks = allWeeks().filter((w) => w.course === 'sciencelab');
ok(!weeks.some((w) => w.quarter === 3), 'no Science Lab week is in quarter 3');
ok(!ALL_SCIENCELAB_LESSONS.some((l) => l.quarter === 3), 'no Science Lab lesson is in quarter 3');
ok(!SCIENCELAB_MODULES.some((m) => m.quarter === 3), 'no Science Lab module is in quarter 3');
const stds = Object.values(plan).flat().filter?.((x) => x && x.course === 'sciencelab') || [];
ok(stds.length > 0 && !stds.some((s) => s.quarter === 3), 'no Science Lab standard is planned for quarter 3');
// 3
const q2 = weeks.filter((w) => w.quarter === 2);
ok(q2.length === 8, 'quarter 2 holds 8 weeks');
ok(same([...new Set(q2.map((w) => w.module))], [5, 6, 7, 8]), 'quarter 2 is modules 5 to 8');
ok(ALL_SCIENCELAB_LESSONS.filter((l) => l.quarter === 2).length === 24, 'quarter 2 has 24 lessons');
// 4  her real attempts, Oct 20 and 22
const attempt = (testId, right, at) => ({ testId, kind: 'weekly', attempt: 1, at, right, total: 8, fraction: right / 8, percent: Math.round((right / 8) * 100) });
const attempts = [attempt('sciencelab-q3-w1', 6, '2026-10-20T13:27:04.662Z'), attempt('sciencelab-q3-w2', 4, '2026-10-22T13:30:55.370Z')];
ok(q2.some((w) => w.id === 'sciencelab-q3-w1') && q2.some((w) => w.id === 'sciencelab-q3-w2'), 'her saved test ids are still there');
const sub = getSubjectGrades({ attempts }).find((s) => s.id === 'sciencelab');
const row = (q) => sub.quarters.find((x) => x.quarter === q);
ok(row(2)?.sat === 2 && row(2)?.percent === 63, 'her two results show under Quarter 2 at 63%');
ok(!sub.quarters.some((x) => x.quarter === 3), 'there is no Quarter 3 row');
ok(sub.assessments.every((a) => a.quarter === 2), 'every result is labelled Quarter 2');
// 5
const test = engine.buildQuarterTest('sciencelab-q2');
ok(test && test.testId === 'sciencelab-q2-final' && test.questionIds.length === 24, 'Quarter 2 exam builds: 24 questions, id sciencelab-q2-final');
ok(engine.buildQuarterTest('sciencelab-q3') === null, 'there is no Quarter 3 exam');
// 6
const withExam = getSubjectGrades({ attempts: [...attempts, { testId: 'sciencelab-q2-final', kind: 'quarter', attempt: 1, at: '2026-12-15T14:00:00.000Z', right: 18, total: 24, fraction: 0.75, percent: 75 }] }).find((s) => s.id === 'sciencelab');
ok(withExam.assessments.some((a) => a.source === 'quarter-exam' && a.label === 'Quarter 2 Exam'), 'her Quarter 2 exam reaches the gradebook');

console.log(fails ? `\n${fails} FAILED` : '\nPASS');
process.exit(fails ? 1 : 0);
