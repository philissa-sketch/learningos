// ---------------------------------------------------------------------------
// TYPING: THE LESSON AND THE TOOL AGREE. Run: node scripts/verify-typing.mjs
//
// The parent, Aug 9 2026: "The typing II Typing II: Ergonomics & Accuracy I
// thought was linked to the typing in the dropdown. How should these work
// together?"
//
// They did not work together. Two systems with the same subject and no wire
// between them: Technology lessons that TEACH typing (graded, on the
// transcript, tested in the Q1 exam) and a Typing screen where he actually
// TYPES. This guard holds the wire in place.
// ---------------------------------------------------------------------------
import './lib/academy-under-test.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { allLessons } from '../src/academies/lamar/data/lessons/index.js';
import {
  ERGONOMICS_CHECKLIST,
  TYPING_II_LESSON_ID,
  TYPING_II_BEAT_LABELS,
  EDCLUB_PORTAL_URL
} from '../src/academies/lamar/data/writing/typingLessons.js';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sm = await import(REPO + '/src/lib/scheduledMinutes.js');
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');
/**
 * The file with every comment removed. A presence check whose subject is also
 * named in prose passes on the day the code is deleted and the comment stays.
 */
const codeOnly = (rel) =>
  read(rel)
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    .replace(/^\s*\/\/.*$/gm, '');
const tr = await import(REPO + '/src/lib/typingRecord.js');
let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
}

console.log('--- 1. the lessons hand off to the tool ---');
for (const id of ['tech7-typing', TYPING_II_LESSON_ID]) {
  const lesson = allLessons.find((l) => l.id === id);
  ok(`${id} exists`, !!lesson);
  ok(`${id} has a practiceLink`, !!lesson?.practiceLink, JSON.stringify(lesson?.practiceLink));
  ok(`${id} points at the typing screen`, lesson?.practiceLink?.view === 'typing');
  ok(`${id}'s handoff has a label`, !!lesson?.practiceLink?.label);
}

console.log('\n--- 2. the handoff is rendered and can actually navigate ---');
const panel = fs.readFileSync(path.join(REPO, 'src/components/Lesson/FeedbackPanel.jsx'), 'utf8');
ok('the debrief renders practiceLink', /lesson\.practiceLink/.test(panel));
ok('it only renders when a navigator was passed', /lesson\.practiceLink && onOpenView/.test(panel),
  'a dead button is worse than no button');
const engine = fs.readFileSync(path.join(REPO, 'src/engine/LessonEngine.jsx'), 'utf8');
ok('the lesson engine threads onOpenView through', /onOpenView=\{onOpenView\}/.test(engine));
const app = fs.readFileSync(path.join(REPO, 'src/App.jsx'), 'utf8');
ok('App supplies a real navigator', /onOpenView=\{\(target\) =>/.test(app));
ok('App clears the lesson before navigating', /setActiveLesson\(null\);\s*\n\s*setView\(target\)/.test(app),
  'otherwise the lesson renders on top of the destination');

console.log('\n--- 3. the checklist has not drifted from the lesson it came from ---');
// ERGONOMICS_CHECKLIST is a hand-condensed COPY of tech7-typing-2's teaching
// beats. A copy that nothing checks is a copy that goes stale, and a posture
// checklist contradicting the lesson is worse than no checklist.
const typingII = allLessons.find((l) => l.id === TYPING_II_LESSON_ID);
const beatLabels = (typingII?.novaIntro?.beats || []).map((b) => b.label);
ok('Typing II still teaches exactly the beats the checklist was drawn from',
  JSON.stringify(beatLabels) === JSON.stringify(TYPING_II_BEAT_LABELS),
  `lesson has [${beatLabels.join(' | ')}]`);
ok('the checklist is not empty', ERGONOMICS_CHECKLIST.length >= 3);
const checklistText = ERGONOMICS_CHECKLIST.map((c) => c.text).join(' ').toLowerCase();
for (const idea of ['wrist', 'feet', 'accuracy']) {
  ok(`the checklist still covers "${idea}"`, checklistText.includes(idea));
}
const home = fs.readFileSync(path.join(REPO, 'src/components/Writing/TypingHome.jsx'), 'utf8');
ok('the typing screen renders the checklist', /ERGONOMICS_CHECKLIST/.test(home));
ok('the typing screen credits the lesson it came from', /Typing II/.test(home),
  'so he can tell it is the same teaching, not new rules');

console.log('\n--- 4. the measurement matches what the lesson teaches ---');
const practice = fs.readFileSync(path.join(REPO, 'src/components/Writing/TypingPractice.jsx'), 'utf8');
const headline = practice.indexOf('text-3xl');
const accIdx = practice.indexOf('result.accuracy', headline);
const wpmIdx = practice.indexOf('result.wpm', headline);
ok('accuracy is the headline number, not WPM', accIdx !== -1 && accIdx < wpmIdx,
  'Typing II teaches accuracy before speed; the biggest number on the screen IS the instruction');
ok('a low-accuracy run says to slow down', /run it again slower/i.test(practice));

console.log('\n--- 5. the link he is sent to ---');
ok('the EdClub URL is intact', EDCLUB_PORTAL_URL === 'https://www.edclub.com/sportal/', EDCLUB_PORTAL_URL);

console.log('\n--- 6. typing carries a date, so it can be counted (O-6, Aug 26 2026) ---');
{
  /**
   * ===================================================================
   * THE FIFTEEN MINUTES THAT COULD NOT BE COUNTED.
   * ===================================================================
   *
   * block-5b is Typing Practice, fifteen minutes a day, five days a week —
   * about **45 hours a school year**, and until today none of it could reach
   * his Georgia record. Not because a branch was forgotten: `typingScores` is
   * keyed by passage and `typingLessonProgress` by lesson, and **neither has
   * ever carried a date**, so there was nothing for a calendar to read. A
   * personal best is not evidence of a school day.
   *
   * These checks hold the shape of the fix rather than any one line of it.
   */
  const dbSrc = read('src/db/db.js');
  const versionNums = [...dbSrc.matchAll(/db\.version\((\d+)\)(?:\s*\n\s*)?\.stores\(/g)].map((m) => Number(m[1]));
  const latest = Math.max(...versionNums);
  const latestStart = dbSrc.search(new RegExp(`db\\.version\\(${latest}\\)(?:\\s*\\n\\s*)?\\.stores\\(`));
  const latestHead = dbSrc.slice(latestStart, dbSrc.indexOf('\n});', latestStart));

  ok('the CURRENT schema declares typingLog',
    /^\s{2}typingLog:/m.test(latestHead),
    `v${latest} — a later version that drops this table loses the block-5b evidence again`);
  ok('...keyed by date, which is the entire point of it',
    /typingLog: '\+\+id, date, kind'/.test(latestHead),
    'without a date index this is another table a calendar cannot read');
  ok('...and both loader and writer are exported',
    /export async function loadAllTypingLog/.test(dbSrc) && /export async function saveTypingLogEntry/.test(dbSrc));
  ok('...and it is declared to travel in the export',
    /typingLog: true/.test(dbSrc),
    'typing happens on HIS computer and the Georgia record is assembled on HERS');

  /**
   * THE SCREEN MUST NOT WRITE TO THE DATABASE BEHIND THE STORE. That is what
   * it did — four lines saving a personal best, and no attendance bump, no
   * dated row, no block credit. A screen that bypasses the store is a screen
   * that keeps missing whichever of those gets added next.
   */
  const practiceCode = codeOnly('src/components/Writing/TypingPractice.jsx');
  ok('the speed test records through the store, not straight into Dexie',
    /recordTypingSpeedTest\(passage\.id/.test(practiceCode) && !/saveTypingScore\(/.test(practiceCode),
    'saveTypingScore direct from the screen is how a finished passage booked nothing');

  const store = codeOnly('src/store/useAppStore.js');
  ok('...and that action writes the dated row',
    /_logTyping\(\{ kind: 'speed'/.test(store));
  ok('...and bumps the day’s attendance',
    /recordTypingSpeedTest[\s\S]{0,900}?bumpTodayAttendance\('typingSessions'\)/.test(store));
  ok('a completed typing LESSON writes one too',
    /_logTyping\(\{ kind: 'lesson'/.test(store),
    'the lessons are the other half of the fifteen minutes');
  ok('...and the log is hydrated, exported and merged back',
    /typingLog: \[\.\.\.typingLogRows\]/.test(store)
      && /typingLog: dbTypingLog/.test(store)
      && /db\.typingLog\.bulkAdd\(newTypingRows/.test(store),
    'a one-way export is half a round trip');

  /**
   * The credit itself, EXECUTED. A regex would have found the `ids.add` line
   * and passed while the rows feeding it carried no date — exactly how this
   * stayed broken while looking fine.
   */
  const D = '2026-09-15';
  const withTyping = sm.coveredBlockIds(D, { typingLog: [{ date: D }] });
  const without = sm.coveredBlockIds(D, { typingLog: [{ date: '2026-09-14' }] });
  ok('a dated typing row credits the typing block',
    withTyping.has(sm.BLOCK_FOR_SUBJECT.typing), [...withTyping].join(', '));
  ok('...on its own date only',
    !without.has(sm.BLOCK_FOR_SUBJECT.typing),
    'a row that credits every day would inflate the record rather than fill it');
  ok('...and two passages in one day still book the block once',
    sm.coveredBlockIds(D, { typingLog: [{ date: D }, { date: D }] }).size === withTyping.size,
    'sessions and school days are different numbers');
}

console.log('\n--- 7. and she can see it ---');
{
  /**
   * "Stored nowhere and displayed nowhere" was the audit's wording. Stored was
   * the serious half; displayed was real too — his speed lived on the practice
   * screen, one passage at a time, and nowhere she could look.
   */
  const rec = tr.typingRecord([
    { date: '2026-09-01', kind: 'speed', wpm: 20, accuracy: 96 },
    { date: '2026-09-01', kind: 'speed', wpm: 22, accuracy: 97 },
    { date: '2026-09-02', kind: 'lesson', accuracy: 98 }
  ]);
  ok('sessions and days are counted separately',
    rec.sessions === 3 && rec.days === 2, `${rec.sessions} sessions / ${rec.days} days`);
  ok('...and only the speed runs produce a WPM',
    rec.speedRuns === 2 && rec.lessonRuns === 1 && rec.latestWpm === 22);
  ok('a trend needs two full windows before it claims one',
    rec.trendWpm === null,
    'three runs in a week is noise with an arrow on it, and an arrow is believed');
  ok('an empty log says so rather than reporting zeros',
    /No typing practice recorded yet/.test(tr.typingRecordSummary(tr.typingRecord([]))),
    'this project has already put a confident wrong sentence into a compliance packet once');
  ok('accuracy below 95 is what the note leads with, not speed',
    /95%/.test(tr.typingProgressNote(tr.typingRecord([{ date: '2026-09-01', kind: 'speed', wpm: 40, accuracy: 80 }]))),
    'a 40 WPM headline on an 80% run teaches the opposite of Typing II');

  const typingPanel = codeOnly('src/components/Dashboard/TypingRecordSection.jsx');
  ok('the panel reads the log from the store', /useAppStore\(\(s\) => s\.typingLog\)/.test(typingPanel));
  ok('...and takes the block length from HER timetable, not a hardcoded 15',
    /blockMinutes\(block\)/.test(typingPanel) && !/15 minutes a day/.test(typingPanel),
    'she can move the block; a quoted default would be a fourth copy of the number');
  ok('...and accuracy is placed before speed here too',
    typingPanel.indexOf('Average accuracy') < typingPanel.indexOf('Latest speed'));

  const dash = codeOnly('src/components/Dashboard/ParentDashboard.jsx');
  ok('the Records menu can actually reach it',
    /id: 'typing', label: 'Typing'/.test(dash) && /section === 'typing' && <TypingRecordSection \/>/.test(dash));
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
