// Proves the id-based splicing produces EXACTLY the order the old
// hard-coded index constants produced, for all three subjects.
import { aerospaceLessons7 } from '../src/academies/lamar/data/lessons/aerospace7.js';
import { technologyLessons7 } from '../src/academies/lamar/data/lessons/technology7.js';
import { socialStudiesLessons7 } from '../src/academies/lamar/data/lessons/socialStudies7.js';
import { aerospaceQ1Exam } from '../src/academies/lamar/data/exams/aerospaceQ1Exam.js';
import { aerospaceQ2Exam } from '../src/academies/lamar/data/exams/aerospaceQ2Exam.js';
import { aerospaceQ3Exam } from '../src/academies/lamar/data/exams/aerospaceQ3Exam.js';
import { aerospaceQ4Exam } from '../src/academies/lamar/data/exams/aerospaceQ4Exam.js';
import { aerospaceSummerExam } from '../src/academies/lamar/data/exams/aerospaceSummerExam.js';
import { socialStudiesQ1Exam } from '../src/academies/lamar/data/exams/socialStudiesQ1Exam.js';
import { socialStudiesQ2Exam } from '../src/academies/lamar/data/exams/socialStudiesQ2Exam.js';
import { technologyQ1Exam } from '../src/academies/lamar/data/exams/technologyQ1Exam.js';
import { technologyQ2Exam } from '../src/academies/lamar/data/exams/technologyQ2Exam.js';
import { allLessons } from '../src/academies/lamar/data/lessons/index.js';

const OLD_aero = [
  ...aerospaceLessons7.slice(0, 10), aerospaceQ1Exam,
  ...aerospaceLessons7.slice(10, 20), aerospaceQ2Exam,
  ...aerospaceLessons7.slice(20, 30), aerospaceQ3Exam,
  ...aerospaceLessons7.slice(30, 40), aerospaceQ4Exam,
  ...aerospaceLessons7.slice(40), aerospaceSummerExam
].map((l) => l.id);

const OLD_ss = [
  ...socialStudiesLessons7.slice(0, 10), socialStudiesQ1Exam,
  ...socialStudiesLessons7.slice(10, 18), socialStudiesQ2Exam,
  ...socialStudiesLessons7.slice(18)
].map((l) => l.id);

const t1 = technologyLessons7.findIndex((l) => l.id === 'tech7-automation');
const t2 = technologyLessons7.findIndex((l) => l.id === 'tech7-automation-2');
const OLD_tech = [
  ...technologyLessons7.slice(0, t1 + 1), technologyQ1Exam,
  ...technologyLessons7.slice(t1 + 1, t2 + 1), technologyQ2Exam,
  ...technologyLessons7.slice(t2 + 1)
].map((l) => l.id);

const ids = allLessons.map((l) => l.id);
function sub(expected, label) {
  const start = ids.indexOf(expected[0]);
  const got = ids.slice(start, start + expected.length);
  const same = JSON.stringify(got) === JSON.stringify(expected);
  console.log(`${same ? 'PASS' : 'FAIL'}  ${label} (${expected.length} entries)`);
  if (!same) {
    for (let i = 0; i < expected.length; i++) {
      if (got[i] !== expected[i]) { console.log(`   first diff @${i}: old=${expected[i]} new=${got[i]}`); break; }
    }
    process.exitCode = 1;
  }
}
sub(OLD_aero, 'Aerospace order unchanged');
sub(OLD_tech, 'Technology order unchanged');
sub(OLD_ss, 'Social Studies order unchanged');
const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
console.log(`${dupes.length === 0 ? 'PASS' : 'FAIL'}  zero duplicate lesson ids (${ids.length} total lessons)`);
if (dupes.length) { console.log('   dupes:', [...new Set(dupes)]); process.exitCode = 1; }
