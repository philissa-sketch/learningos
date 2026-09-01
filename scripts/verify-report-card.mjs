// ---------------------------------------------------------------------------
// KHAN GRADES REACH THE RECORD. Run: node scripts/verify-report-card.mjs
//
// The parent, Aug 10 2026: "The grades from Kahn Academy arent being saved
// anywhere."
//
// They WERE being saved. setKhanAcademyAssignmentPercent wrote gradePercent and
// a letter to the row, correctly, and always had. Nothing read them back.
// getReportCardData -- the single source for the report card, the transcript
// download, the compliance packet and the student's own grades screen --
// computed every subject's grade from lessonProgress alone.
//
// Math, Science and Language Arts are taught on Khan Academy this year and have
// no Mission Control lessons in play, so all three scored
// `attemptedLessons.length === 0` and came back "Not yet graded" no matter how
// many percentages she entered. Three of the five subjects Georgia requires.
//
// The blend is arithmetic, so it is checked as arithmetic: this file rebuilds
// the same calculation the store does and asserts against it, plus the source
// checks that keep the wiring honest.
// ---------------------------------------------------------------------------
import './lib/academy-under-test.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { letterToPercent, GRADE_SCALE } from '../src/lib/gradeScale.js';
import { appendQuizResult, quizAveragesByQuarter, computeWeeklyWordState } from '../src/lib/weeklyWords.js';
import { spellingWordPool } from '../src/academies/lamar/data/writing/spellingWordPool.js';
import { SCHOOL_YEAR_START_DATE } from '../src/lib/schoolQuarter.js';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
}
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');

// The store's rule, restated: equal weight per assessment, Khan percentages
// converted to the same 0-1 scale the lesson accuracies already use.
function blend(lessonAccuracies, khanPercents) {
  const all = [...lessonAccuracies, ...khanPercents.map((p) => p / 100)];
  if (all.length === 0) return null;
  return all.reduce((a, n) => a + n, 0) / all.length;
}
function letter(acc) {
  if (acc === null) return null;
  const pct = acc * 100;
  if (pct >= 90) return 'A';
  if (pct >= 80) return 'B';
  if (pct >= 70) return 'C';
  if (pct >= 60) return 'D';
  return 'F';
}

console.log('\n--- 1. a Khan-only subject gets a grade at all ---');
{
  // This is the exact shape of Math, Science and Language Arts this year:
  // no attempted Mission Control lessons, several graded Khan units.
  const khanOnly = blend([], [82, 80, 90]);
  ok('three graded Khan units produce an average', khanOnly !== null);
  ok('...and it is right', Math.round(khanOnly * 100) === 84, `${Math.round(khanOnly * 100)}%`);
  ok('...and it becomes a letter', letter(khanOnly) === 'B');
  ok('nothing graded at all is still "not yet graded"', blend([], []) === null,
    'a subject with no evidence must never be given a grade');
}

console.log('\n--- 2. equal weight, and the old behaviour preserved ---');
{
  ok('a lessons-only subject is unchanged',
    Math.round(blend([0.9, 0.8], []) * 100) === 85);
  ok('one Khan unit counts the same as one lesson',
    blend([1.0], [0]) === blend([0], [100]));
  ok('a blended subject averages across both',
    Math.round(blend([1.0, 0.8], [90, 70]) * 100) === 85);
  ok('order does not change the answer',
    blend([0.5, 0.9], [70]) === blend([0.9, 0.5], [70]));
}

console.log('\n--- 3. the arithmetic holds across the whole range ---');
{
  let bad = 0;
  for (let n = 0; n <= 100; n += 1) {
    const a = blend([], [n]);
    if (Math.abs(a - n / 100) > 1e-9) bad += 1;
    if (a < 0 || a > 1) bad += 1;
  }
  ok('a single Khan percentage round-trips exactly', bad === 0, `${bad} off`);
  ok('all-correct is an A', letter(blend([], [100])) === 'A');
  ok('a zero is an F and is not silently dropped', letter(blend([], [0])) === 'F');
}

console.log('\n--- 4. the store actually does this ---');
{
  const store = read('src/store/useAppStore.js');
  // The WHOLE method, not a fixed-length slice — it has outgrown 7k twice now
  // and a short slice silently turns a real check into a false failure.
  const rcStart = store.indexOf('  getReportCardData() {');
  const fn = store.slice(rcStart, store.indexOf('\n  },', rcStart));
  ok('the report card reads Khan rows', /khanAcademyAssignments \|\| \[\]/.test(fn));
  ok('...filtered to this subject', /canonicalSubject\(a\.subject\) === subject/.test(fn));
  ok('...and only where a real percentage was entered',
    /typeof a\.gradePercent === 'number'/.test(fn) && /Number\.isFinite\(a\.gradePercent\)/.test(fn),
    'a project-graded row has a letter and no percentage and must not count as zero');
  ok('the average is taken over lessons AND Khan units together', /const allScores = \[/.test(fn));
  ok('the letter comes from the blended average', /accuracyToLetterGrade\(averageAccuracy\)/.test(fn));
  // These two live in the return block, past the 7k slice above. Both strings
  // are unique in the file, so the whole source is the right scope for them.
  ok('both halves are reported separately',
    /khanAverage,\n/.test(store) && /lessonAverage,\n/.test(store),
    'so the blend is never something she has to take on trust');
  ok('assessedCount exists for "is there any grade here"', /assessedCount: allScores\.length/.test(store));
  // Also past the 7k slice now that the strand block has grown. Unique string.
  ok('attemptedCount still means lessons only',
    /attemptedCount: attemptedLessons\.length/.test(store),
    'several screens print it against totalLessons');
  ok('a participation subject carries the same shape',
    /khanGradedCount: 0,[\s\S]{0,240}assessedCount: 0/.test(store),
    'six screens read this shape and a missing field throws rather than degrades');
}

console.log('\n--- 5. the screens follow it ---');
{
  const parent = read('src/components/Dashboard/ParentDashboard.jsx');
  ok('the report card re-renders when a Khan grade lands',
    /\[getReportCardData, lessonProgress, khanAcademyAssignments\]/.test(parent),
    'without this she grades a unit and the card does not move until a reload');
  ok('the transcript names the Khan units behind the grade',
    /Khan Academy unit\$\{row\.khanGradedCount === 1 \? '' : 's'\} graded/.test(parent),
    'a grade with no denominator is not a record');
  const student = read('src/components/Dashboard/StudentGradesCard.jsx');
  ok('his own grades screen shows Khan-only subjects',
    /row\.assessedCount > 0/.test(student),
    'filtering on attemptedCount hid Math, Science and Language Arts entirely');
  ok('...and says where the grade came from', /Khan Academy units/.test(student));
}

// ---------------------------------------------------------------------------
// 6. THE GRADEBOOK IS A GRADEBOOK.
//
// After the report card was fixed: "i still dont see the grades in the grade
// book." A different screen, the same shape of fault. getGradebookData walked
// `allLessons` and nothing else, so the section literally called Gradebook --
// "Lesson-by-Lesson Record" -- showed only Mission Control lessons and read
// "No lessons attempted yet in this subject" for Math, Science and Language
// Arts, which are taught entirely on Khan.
// ---------------------------------------------------------------------------
console.log('\n--- 6. Khan units are rows in the gradebook ---');
{
  const store = read('src/store/useAppStore.js');
  const fn = store.slice(store.indexOf('getGradebookData(subject)'), store.indexOf('getGradebookData(subject)') + 4200);
  ok('the gradebook reads Khan rows', /khanAcademyAssignments \|\| \[\]/.test(fn));
  ok('...for this subject only', /canonicalSubject\(a\.subject\) === subject/.test(fn));
  ok('...in the order he works them', /quarterRank\(a\.batchLabel\)/.test(fn));
  ok('every row says which kind of evidence it is',
    /kind: 'lesson'/.test(fn) && /kind: 'khan'/.test(fn));
  ok('a Khan row carries the fraction she typed', /gradeRaw: a\.gradeRaw/.test(fn),
    'the record should show 9/11, not only 82%');
  ok('a Khan row carries its letter', /letterGrade: a\.grade/.test(fn));
  ok('an ungraded Khan unit counts as not started',
    /attempted: Boolean\(a\.completed \|\| hasPercent \|\| a\.grade\)/.test(fn));
  ok('a score with no percentage is not treated as zero',
    /const hasPercent = typeof a\.gradePercent === 'number'/.test(fn));

  const parent = read('src/components/Dashboard/ParentDashboard.jsx');
  const section = parent.slice(parent.indexOf('function GradebookSection'), parent.indexOf('function GradebookSection') + 6000);
  ok('the gradebook screen re-renders when a Khan grade lands',
    /khanAcademyAssignments, selectedSubject\]/.test(section),
    'without this the row does not appear until the app is reloaded');
  ok('the screen renders Khan rows differently from lessons', /row\.kind === 'khan'/.test(section));
  ok('the empty state points her at where to enter a score',
    /waiting for a score/.test(section),
    '"No lessons attempted" was true and useless');
  ok('the description no longer says lessons only',
    /Mission Control lessons and Khan Academy/.test(section));
}

// ---------------------------------------------------------------------------
// 7. HIS THREE MAIN SUBJECTS ARE NOT "ARCHIVED".
//
// The parent, looking at the Gradebook's subject picker: "They say archived.
// That needs to be removed."
//
// ARCHIVED_SUBJECTS was ['math', 'reading', 'science'] -- Mathematics, English
// Language Arts and Science. The Parent Dashboard printed "(Archived)" after
// each of them in six dropdowns, including the course-description header that
// feeds the records pack. Three of the five subjects Georgia names, the ones he
// spends most of every day on, labelled on the records screens as finished.
//
// What is retired is the app's own lesson track. The subjects are the most
// active thing on his timetable.
// ---------------------------------------------------------------------------
console.log('\n--- 7. Math, ELA and Science are not labelled archived ---');
{
  const files = [
    'src/academies/lamar/subjects.js',
    'src/components/Dashboard/ParentDashboard.jsx',
    'src/components/Dashboard/AdminRecordsSection.jsx',
    'src/components/Dashboard/SubjectProgressOverview.jsx',
    'src/components/Dashboard/ProgressView.jsx',
    'src/components/Academic/academicUi.js',
    'src/store/useAppStore.js'
  ];
  // Comment lines stripped, so the note in subjects.js explaining WHY the
  // label was removed does not read as the label still being there.
  const codeOf = (f) =>
    read(f).split('\n').filter((line) => !/^\s*(\*|\/\/|\/\*)/.test(line)).join('\n');
  const offenders = files.filter((f) => /\(Archived\)/.test(codeOf(f)));
  ok('no screen prints "(Archived)" against a subject', offenders.length === 0, offenders.join(', '));

  const stillNamed = files.filter((f) =>
    read(f).split('\n').some((line) =>
      /ARCHIVED_SUBJECTS|isArchivedSubject/.test(line) && !/^\s*(\*|\/\/)/.test(line)
    )
  );
  ok('the concept is not called "archived" in code either', stillNamed.length === 0,
    stillNamed.join(', ') + ' — the name was the bug');

  const subjects = read('src/academies/lamar/subjects.js');
  ok('it is named for what it is', /export const KHAN_TAUGHT_SUBJECTS = \['math', 'reading', 'science'\]/.test(subjects));
  ok('and so is the helper', /export function isKhanTaughtSubject\(subject\)/.test(subjects));
  ok('the rename is explained where someone would undo it',
    /three of the five subjects Georgia\s+\*?\s*names/.test(subjects));

  // The student-facing screen already said the right thing and must keep it.
  ok('his progress screen still says where the work lives',
    /Now taught on Khan Academy/.test(read('src/components/Dashboard/SubjectProgressOverview.jsx')));
  ok('the academic centre still labels them Khan Academy',
    /\(Khan Academy\)/.test(read('src/components/Academic/academicUi.js')));
}

// ---------------------------------------------------------------------------
// 8. THE STRAND BREAKDOWN — no name collision, and it counts the real work.
//
// The parent, sending a screenshot of her son's grades: "What is this?"
//
//     Language Arts                    B 80%
//       1 Khan unit graded
//       Reading                   Not started
//       Language Arts             Not started
//
// Two faults in four lines. The subject is called Language Arts on his screen
// and one of its two strands was ALSO called Language Arts. And the grade said
// 80% while both strands said not started, because the breakdown counted
// Mission Control lessons only -- and every piece of ELA work this year is a
// Khan unit.
// ---------------------------------------------------------------------------
console.log('\n--- 8. the strand breakdown ---');
{
  const subjects = read('src/academies/lamar/subjects.js');
  ok('no strand is named after the subject that contains it',
    !/\{ id: 'language-arts', label: 'Language Arts' \}/.test(subjects) &&
      !/\{ id: 'reading', label: 'Reading' \}/.test(subjects));
  ok('the strands are named after the work',
    /label: 'Reading & Literature'/.test(subjects) && /label: 'Grammar & Writing'/.test(subjects));
  ok('the strand IDS are untouched',
    /id: 'reading'/.test(subjects) && /id: 'language-arts'/.test(subjects),
    'every lesson carries one of these — renaming an id would unfile it');

  const store = read('src/store/useAppStore.js');
  ok('a Khan row is assigned to a strand', /function khanStrandFor\(subject, row\)/.test(store));
  ok('...by URL, never by title', /khanGrammarUnitByUrl\(row\?\.khanAcademyUrl\)/.test(store),
    'the same rule that fixed the Q1 ordering bug');
  ok('only ELA has strands to assign', /if \(subject !== 'reading'\) return null;/.test(store));
  ok('the strand average includes its Khan units', /const strandScores = \[/.test(store));
  ok('a strand reports how many Khan units are behind it', /khanGradedCount: strandKhan\.length/.test(store));
  ok('an empty strand is empty on BOTH counts', /if \(strandScores\.length === 0\)/.test(store),
    'not just "no lessons attempted"');

  const parent = read('src/components/Dashboard/ParentDashboard.jsx');
  /**
   * ---- THIS CHECK PINNED THE STALE SENTENCE AND CALLED IT CORRECT ----
   *
   * It asserted the header said *"Mission Control lessons and graded Khan
   * Academy units, equally weighted"* — and that sentence had been wrong for
   * months. The grade was built from six sources with two different weights by
   * August 23, and seven with three by August 26. So the guard was actively
   * holding a false explanation in place under a real number: she could check
   * her son's grade against a rule the app had stopped following, and every
   * suite passed.
   *
   * A guard that locks in yesterday's truth is worse than no guard. It now
   * asserts the PROPERTY — every source feeding `allScores` is named in the
   * sentence under the grade — by reading the source list out of the store.
   * Adding an eighth source without explaining it fails here.
   */
  const allScoresBlock = (() => {
    const i = store.indexOf('const allScores = [');
    return store.slice(i, store.indexOf('];', i));
  })();
  const spreadSources = [...allScoresBlock.matchAll(/\.\.\.(\w+)/g)].map((m) => m[1]);
  /** Each grade source, and the word the parent-facing sentence must use for it. */
  const SOURCE_WORDS = {
    attemptedLessons: 'lessons',
    khanGraded: 'Khan units',
    assignmentGraded: 'assignments',
    wordStudyQuarters: 'word tests',
    writingGraded: 'writing',
    reflectionQuarters: 'reflections',
    missionRows: 'mission'
  };
  ok('every grade source is one this guard knows the wording for',
    spreadSources.every((k) => SOURCE_WORDS[k]),
    'unmapped: ' + spreadSources.filter((k) => !SOURCE_WORDS[k]).join(', ') +
      ' — add it to SOURCE_WORDS and to the sentence under the grade');
  ok('the report card header names every source the grade averages',
    spreadSources.every((k) => !SOURCE_WORDS[k] || parent.includes(SOURCE_WORDS[k])),
    'missing from the sentence: ' +
      spreadSources.filter((k) => SOURCE_WORDS[k] && !parent.includes(SOURCE_WORDS[k]))
        .map((k) => SOURCE_WORDS[k]).join(', '));
  /**
   * ABSENCE AGAINST THE COMMENT-STRIPPED CODE. Ninth time this rule has been
   * needed: the comment directly above the fixed sentence QUOTES the phrase
   * being removed, so tested against the raw file this fails forever while the
   * screen is correct. Presence checks read the file; absence checks read the
   * code.
   */
  const parentCode = parent
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    .replace(/^\s*\/\/.*$/gm, '');
  ok('...and no longer claims they are equally weighted',
    !/equally weighted/.test(parentCode),
    'an exam and a mission each weigh a whole quarter — three weights, not one');
  ok('...and says which two carry the quarter',
    /quarterly exam and a quarterly mission/.test(parent),
    'the two heaviest items on the card should not be a surprise');
  ok('an ungraded strand says graded, not attempted', /Nothing graded yet/.test(parent));
  const student = read('src/components/Dashboard/StudentGradesCard.jsx');
  ok('his card marks which strands came from Khan', /strand\.khanGradedCount > 0/.test(student));
}

// ---------------------------------------------------------------------------
// 9. READING & LITERATURE IS ACTUALLY TESTED BY SOMETHING.
//
// The parent: "How are we testing reading and literature?" The answer was
// almost nothing. Forty lessons existed -- Bessie Coleman, Mae Jemison, Hidden
// Figures, Guion Bluford, Annie Easley, main idea, inference, context clues --
// each with a ten-question test, and `reading` is not in ACTIVE_SUBJECTS, so
// getSubjects() never returned it and not one of them was ever offered. Her
// report card read "Reading 0/40 mastered": zero because he had never been
// shown one. Q1 Khan is all grammar, and his graded book reports reached the
// subject grade through nothing at all.
// ---------------------------------------------------------------------------
console.log('\n--- 9. the reading track is served, and book reports count ---');
{
  const subjects = read('src/academies/lamar/subjects.js');
  ok('a Khan-taught subject can still have an offered lesson track',
    /export const LESSON_TRACK_SUBJECTS = \['reading'\]/.test(subjects));
  ok('...and it is not smuggled into ACTIVE_SUBJECTS',
    /export const ACTIVE_SUBJECTS = \['aerospace', 'technology', 'socialStudies', 'pe', 'robotics'\]/.test(subjects),
    'that list also decides who can take the rotating 2:15 block');

  const store = read('src/store/useAppStore.js');
  ok('there is a roster list separate from the mission list',
    /getLessonRosterSubjects\(\) \{/.test(store));
  ok('the record list cannot print a subject twice',
    /new Set\(\[\.\.\.active, \.\.\.participation, \.\.\.khanTaughtWithLessons\]\)/.test(store),
    'reading is both an offered track and Khan-taught');

  const roster = read('src/components/Lesson/LessonRoster.jsx');
  ok('the Lesson Roster offers them', /getLessonRosterSubjects\(\)/.test(roster));
  const dash = read('src/components/Dashboard/MissionControlDashboard.jsx');
  ok('the 10:00 block has a lesson row', /const readingLesson = getTodaysMission\('reading'\)/.test(dash));
  ok('...that disappears when the track is finished', /\{readingLesson && \(/.test(dash));

  // Rubric-graded work: a letter is worth the MIDDLE of its band.
  ok('B+ is 88, not 89', letterToPercent('B+') === 88);
  ok('A (93-96) is 95', letterToPercent('A') === 95);
  ok('the midpoint is used, never the top',
    GRADE_SCALE.filter((b) => b.letter !== 'F').every((b) => letterToPercent(b.letter) < b.max),
    'taking the top would inflate every rubric grade against the scored work beside it');
  ok('an unknown letter is null, not zero', letterToPercent('') === null && letterToPercent('Z') === null,
    'a zero here would be a failing grade invented out of a blank field');
  ok('every letter on the scale converts',
    GRADE_SCALE.every((b) => typeof letterToPercent(b.letter) === 'number'));

  ok('graded assignments reach the subject grade', /assignmentGraded\.map\(\(r\) => \(\{ value: r\.pct \/ 100/.test(store));
  ok('...only where a letter was actually set', /letterToPercent\(a\.grade\)/.test(store) && /r\.pct !== null/.test(store));
  ok('...for this subject only', /canonicalSubject\(a\.subject\) === subject \? letterToPercent/.test(store));
  ok('they are counted and reported', /assignmentGradedCount: assignmentGraded\.length/.test(store));
  ok('they do NOT guess at a strand',
    !/assignmentGraded[\s\S]{0,400}strand/.test(store.slice(store.indexOf('const assignmentGraded'), store.indexOf('const assignmentGraded') + 900)),
    'a book report is reading and a research paper is writing, and `type` does not reliably say which');

  /**
   * ---- "IN HIS OWN WORDS" REACHES THE AVERAGE (Aug 21, 2026) ----
   *
   * The parent removed this grade on Aug 9 because "a letter that landed in a
   * row and stopped" cost her a Sunday and bought no record. Asked again once
   * his answers had grown into paragraphs, she chose *grade it, and make it
   * count*.
   *
   * **The counting IS the decision.** A reflection grade that does not reach an
   * average is the exact thing she deleted, so it is guarded here rather than
   * left to be true by accident.
   */
  ok('graded reflections reach the subject grade',
    /\.\.\.reflectionQuarters\.map\(\(q\) => \(\{ value: q\.percent \/ 100/.test(store),
    'without this the letter lands in a row and stops — which is why it was removed the first time');
  ok('...through the same letter-to-percent path book reports take',
    /pct: canonicalSubject\(subjectOfReflection\(e\.lessonId\)\) === subject \? letterToPercent\(e\.grade\) : null/.test(store),
    'middle of the band, never the top');

  /**
   * ---- AND FOR THE TWO REFLECTIONS THAT ARE NOT ON A LESSON (Aug 25, 2026) ----
   *
   * Audit item O-6(c). This check used to assert `LESSON_SUBJECT.get(e.lessonId)`
   * — correct for every reflection that hangs off a lesson, and silently wrong
   * for the two that do not. The signature games close with a written
   * reflection stored under a fixed GAME id, the Mission Control Board offers
   * that reflection a grade picker like any other, and the lookup returned
   * `undefined`, so the letter she chose was dropped from the average.
   *
   * The guard passed the whole time, because it was checking the shape of the
   * lookup rather than whether the lookup can answer.
   *
   * So this now runs the REAL resolver over the real ids. A dangling source
   * lesson id — the one way this fix can rot — fails here rather than silently
   * going back to dropping grades.
   */
  ok('...resolved through subjectOfReflection, which knows about the two games',
    /export function subjectOfReflection/.test(store)
      && !/pct: canonicalSubject\(LESSON_SUBJECT\.get/.test(store),
    'LESSON_SUBJECT alone cannot answer for a reflection tagged with a game id');
  {
    const { subjectOfReflection } = await import('../src/store/useAppStore.js');
    ok('...a lesson-backed reflection still resolves to its lesson\'s subject',
      subjectOfReflection('ae7-rocket-design') === 'aerospace',
      String(subjectOfReflection('ae7-rocket-design')));
    ok('...Nation Command resolves to Social Studies',
      subjectOfReflection('game-nation-command') === 'socialStudies',
      String(subjectOfReflection('game-nation-command')));
    ok('...Launch Director resolves to Aerospace',
      subjectOfReflection('game-launch-director') === 'aerospace',
      String(subjectOfReflection('game-launch-director')));
    ok('...and an id nothing owns still resolves to nothing',
      subjectOfReflection('not-a-real-id') === null,
      'a made-up id must not be quietly attributed to a subject');
  }
  ok('...this school year only',
    /inSchoolYear\(r\.e\.gradedAt \|\| r\.e\.completedAt\)/.test(store));
  const reflBlock = (() => {
    const i = store.indexOf('const reflectionGraded');
    return i === -1 ? '' : store.slice(i, store.indexOf(';', store.indexOf('.filter(', i)));
  })();
  ok('...and only where a letter was actually set',
    /r\.pct !== null/.test(reflBlock),
    'an ungraded reflection must not average as a zero');
  ok('grading one also marks it read',
    /readAt: gradedAt/.test(store),
    'otherwise she grades it and the row sits there — the fault she reported about replies, one action over');
}

// ---------------------------------------------------------------------------
// 10. THIS YEAR'S WORK ONLY, AND WORD STUDY AT ONE GRADE PER QUARTER.
//
// "Remove that preschool grade" — Fuel Tank Fractions, attempted once and
// scored 0% on 23 July 2026, eleven days before the school year starts on
// 3 August, and the only assessment his Math grade was made of.
//
// "I will take the recommended weight for the English grade" — the Friday
// tests average to one number per quarter per skill, not 72 grades a year.
// ---------------------------------------------------------------------------
console.log('\n--- 10. school-year scoping and the word-study weight ---');
{
  const store = read('src/store/useAppStore.js');
  ok('the school year is 3 August 2026',
    SCHOOL_YEAR_START_DATE.getFullYear() === 2026 && SCHOOL_YEAR_START_DATE.getMonth() === 7 &&
      SCHOOL_YEAR_START_DATE.getDate() === 3);
  ok('there is one in-year test, not a rule per source', /function inSchoolYear\(dateish\)/.test(store));
  ok('a missing date is KEPT, not dropped', /if \(!dateish\) return true;/.test(store),
    'dropping his work because a field is blank is the worse mistake');
  ok('lessons are scoped to the school year',
    /inSchoolYear\(state\.lessonProgress\[l\.id\]\.lastCompletedDate\)/.test(store));
  ok('Khan units are too', /inSchoolYear\(a\.completedAt \|\| a\.gradedAt\)/.test(store));
  ok('and graded assignments', /inSchoolYear\(r\.a\.completedAt \|\| r\.a\.gradedAt\)/.test(store));
  ok('the strand breakdown uses the same rule',
    (store.match(/inSchoolYear\(state\.lessonProgress\[l\.id\]\.lastCompletedDate\)/g) || []).length === 2,
    'subject and strand must not disagree about which work is this year');

  // The Friday history itself.
  const wordsLib = read('src/lib/weeklyWords.js');
  ok('the weekly rotation must not clear the history', /quizHistory: state\.quizHistory \|\| \[\]/.test(wordsLib),
    'clearing it would erase the term every Monday, silently');
  let st = computeWeeklyWordState(spellingWordPool, null, '2026-08-10');
  st = { ...st, quizHistory: appendQuizResult(st.quizHistory, { weekStartDate: '2026-08-10', date: '2026-08-14', percent: 90 }) };
  const rolled = computeWeeklyWordState(spellingWordPool, st, '2026-08-17');
  ok('...and it survives a real rotation', rolled.quizHistory.length === 1 && rolled.weekNumber === 2);

  ok('a retake replaces its week rather than counting twice',
    appendQuizResult(
      [{ weekStartDate: '2026-08-10', date: '2026-08-14', percent: 60 }],
      { weekStartDate: '2026-08-10', date: '2026-08-14', percent: 90 }
    ).length === 1);

  // One grade per quarter per skill — the whole point of the chosen weight.
  const history = [];
  for (let w = 0; w < 9; w++) {
    const d = new Date(Date.UTC(2026, 7, 10));
    d.setUTCDate(d.getUTCDate() + 7 * w);
    history.push({ weekStartDate: d.toISOString().slice(0, 10), date: d.toISOString().slice(0, 10), percent: 80 + (w % 3) * 5 });
  }
  const q = quizAveragesByQuarter(history, () => 'Q1 2026-2027');
  ok('nine weeks of tests become ONE grade', q.length === 1 && q[0].weeks === 9,
    `${q.length} grades from ${history.length} tests`);
  ok('...at the average of those weeks', q[0].percent === 85, `${q[0].percent}%`);
  ok('two quarters make two grades',
    quizAveragesByQuarter(history, (d) => (d < '2026-09-15' ? 'Q1' : 'Q2')).length === 2);
  ok('an unscored week is ignored rather than counted as zero',
    quizAveragesByQuarter([{ date: '2026-09-01', percent: null }], () => 'Q1').length === 0);

  ok('spelling feeds Grammar & Writing and vocabulary feeds Reading',
    /\['spelling', 'language-arts'\], \['vocabulary', 'reading'\]/.test(store));
  ok('the quarterly averages reach the subject grade',
    /\.\.\.wordStudyQuarters\.map\(\(q\) => \(\{ value: q\.percent \/ 100/.test(store));
  ok('...and the strand they belong to', /\.\.\.strandWords\.map\(\(q\) => q\.percent \/ 100\)/.test(store));
  ok('only ELA has word study to add', /if \(subject === 'reading'\) \{/.test(store));

  // The schedule change that came with it.
  const sched = read('src/academies/lamar/data/schedule/defaultSchedule.js');
  ok('the 10:00 block is the reading lesson now', /label: 'Reading Lesson'/.test(sched));
  ok('...still fifteen minutes', /'block-3', startTime: '10:00', endTime: '10:15'/.test(sched));
  ok('the rename reaches a schedule she already saved',
    /b\.label === 'Reading' \|\| b\.label === 'Independent Reading'/.test(store));
  const dash = read('src/components/Dashboard/MissionControlDashboard.jsx');
  ok('his novel says it is a bedtime thing', /Read before bed ·/.test(dash),
    'the detail line grew a reading-log prompt on Aug 15 2026; the bedtime framing must survive it');
  /**
   * THE WINDOW WAS THE WRONG THING TO MEASURE. (Widened Aug 15, failed again
   * Aug 20, 2026.)
   *
   * These two read `label="Book"` followed by the property within N
   * characters. N was 900. Adding a comment to the Book row explaining why it
   * deliberately carries NO blockId — it is a bedtime thing, not a school
   * block — pushed `onToggleDaily` to 940 and failed a guard about a feature
   * that had not changed.
   *
   * A character count is a proxy for "on the same row", and a bad one: it
   * fails on documentation and passes on a property that has drifted onto the
   * NEXT row. So the row is cut out and the properties asserted against the
   * row itself. Same rule the gardening guard states — assert the property,
   * not the punctuation.
   */
  const bookRow = (() => {
    const start = dash.indexOf('label="Book"');
    if (start === -1) return '';
    const end = dash.indexOf('/>', start);
    return end === -1 ? dash.slice(start) : dash.slice(start, end);
  })();
  ok('the book row is findable at all', bookRow.length > 0,
    'every check below is vacuously true without this one');
  ok('...and does not compete with the school day',
    /kind="rest"/.test(bookRow),
    'kind="rest" is what keeps it out of the school-day list');
  ok('...and it can be logged from the row itself',
    /onToggleDaily/.test(bookRow),
    'Nova reported "No independent reading logged" while he was reading nightly, because logging meant leaving the board');
}

// ---------------------------------------------------------------------------
// EACH PARTICIPATION SUBJECT DESCRIBES ITSELF. (Aug 15, 2026.)
//
// PE, Gardening and Electric Guitar are recorded by participation rather than
// by grade, and each produces completely different counts. Three screens
// rendered them — the Georgia records packet, the transcript download, and the
// on-screen report card — and ALL THREE had PE's field names hardcoded.
//
// Gardening and Guitar have none of those keys, so every value fell through the
// `|| 0` and the packet told a reviewer, for a boy who had worked in the garden
// all season: "Gardening & Applied Engineering: participation credit — 0
// workouts completed, 0 days tracked, 0 of 0 weekly goals met." The report card
// added a fourth PE field and printed "0 meals logged" under Electric Guitar.
//
// Not a crash and not a blank — a confident, specific, WRONG sentence in a legal
// record, describing activities the subject does not have. PE was the only
// participation subject when those lines were written, and a default that is
// correct for the only case is invisible until there is a second case.
// ---------------------------------------------------------------------------
console.log('--- participation subjects report their own counts ---');
{
  const pr = await import(REPO + '/src/lib/participationRecord.js');
  const store = read('src/store/useAppStore.js');

  /**
   * The check that would have caught this: every key getParticipationRecord
   * returns for a subject must be described, and nothing may be described that
   * the subject does not produce. Add a fourth participation subject and this
   * fails until it is given its own fields.
   */
  const SUBJECT_KEYS = {
    pe: ['workouts', 'daysTracked', 'mealsLogged', 'weeklyGoalsSet', 'weeklyGoalsMet', 'checkIns'],
    gardening: ['sessions', 'daysInTheGarden', 'seasonChangeovers', 'sunReadings', 'plantings',
                'waterings', 'measurements', 'observations', 'harvests', 'entriesLogged'],
    guitar: ['practiceSessions', 'daysPractised', 'minutesPractised', 'theoryItemsRead',
             'skillsCleared', 'songsChosen', 'songsLearned', 'recordings', 'entriesLogged']
  };

  for (const [subject, keys] of Object.entries(SUBJECT_KEYS)) {
    const fields = pr.participationFieldsFor(subject);
    const described = new Set(fields.flatMap((f) => [f.key, f.pairWith].filter(Boolean)));
    const undescribed = keys.filter((k) => !described.has(k) && k !== 'entriesLogged');
    ok(`${subject}: every count it produces is described`, undescribed.length === 0,
      undescribed.join(', '));
    const invented = [...described].filter((k) => !keys.includes(k));
    ok(`${subject}: nothing is described that it does not produce`, invented.length === 0,
      invented.join(', ') + " — this is exactly how Gardening came to report workouts");
  }

  const garden = { sessions: 12, daysInTheGarden: 9, plantings: 4, harvests: 3, entriesLogged: 139 };
  const g = pr.participationSummary('gardening', garden);
  ok('the garden no longer reports workouts', !/workout/i.test(g), g);
  ok('...and reports what it actually did', /12 garden sessions/.test(g) && /4 plantings/.test(g));
  ok('the guitar no longer reports meals', !/meal/i.test(pr.participationSummary('guitar', { practiceSessions: 3 })));
  ok('PE still reports its own', /workouts completed/.test(pr.participationSummary('pe', { workouts: 9, daysTracked: 3 })));

  ok('a subject with nothing logged says so honestly',
    pr.participationSummary('chess', {}) === 'participation credit — no activity recorded yet',
    'a row of zeros is a claim; "no activity recorded yet" is the truth');
  ok('singulars read like a person wrote them',
    /1 garden session,/.test(pr.participationSummary('gardening', { sessions: 1, daysInTheGarden: 1, entriesLogged: 1 })),
    'this document is read by a stranger deciding whether the year was real');

  // All three render sites must go through it.
  const packet = read('src/lib/compliancePacket.js');
  const parent = read('src/components/Dashboard/ParentDashboard.jsx');
  ok('the compliance packet asks the subject', /participationSummary\(row\.subject, row\.participation\)/.test(packet));
  ok('the transcript asks the subject', /participationSummary\(row\.subject, r\)/.test(parent));
  ok('the report card asks the subject', /participationPhrases\(row\.subject, row\.participation\)/.test(parent));
  ok("no site hardcodes PE's fields any more",
    !/r\.workouts \|\| 0/.test(packet) && !/participation\?\.workouts \|\| 0/.test(parent),
    'three copies of one sentence is how they came to describe the wrong subject');
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
