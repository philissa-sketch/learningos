// ---------------------------------------------------------------------------
// SPELLING & VOCABULARY: THE ANSWER STAYS PUT. Run: node scripts/verify-word-study.mjs
//
// The parent, Aug 9 2026: "When the answer is selected for a question the
// answer is moved around so that the correct answer cannot be submitted."
//
// She was right, and the cause was that buildQuestionForWord called
// Math.random() while both engines rebuilt their questions on every render —
// the store getter they read hands back a fresh array each call, so the memo
// guarding the shuffle never held. Clicking a choice re-rendered, re-shuffled,
// and moved both the options and the answer index.
//
// The class of bug matters more than the instance: a "pure" builder that
// returns something different for the same input. So these checks are written
// against the BUILDER, not the components — they would have failed on the old
// code and they fail again if anyone reintroduces an unseeded shuffle.
// ---------------------------------------------------------------------------
import './lib/academy-under-test.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  buildQuestionForWord,
  buildBlankQuestion,
  buildRecallQuestion,
  buildMissingLettersPrompt,
  buildSpellingTestPrompt,
  buildWordSearch,
  isTypedAnswerCorrect,
  applyResultsToMastery,
  masteryCounts,
  computeWeeklyWordState,
  mondayOnOrBefore,
  getTodaysWordTask,
  activityFor,
  WORD_ACTIVITIES,
  DAY_TASK_ORDER,
  MASTERY_ACTIVITIES,
  MASTERY_STREAK,
  MAX_WEEKS_ON_LIST,
  WORDS_PER_WEEK,
  getWordsByIds,
  MIN_NEW_WORDS_PER_WEEK,
  ROTATION_RULE,
  stalledWordIds,
  mergeWordHistories,
  advanceToNextList
} from '../src/lib/weeklyWords.js';
// Loaded with await, not as a static import: the harness above installs an
// Academy's content using top-level await, and a sibling static import would
// race it — this module reads content the moment it is evaluated.
const { wordStudyDates } = await import('../src/lib/scheduledMinutes.js');
import { spellingWordPool } from '../src/academies/lamar/data/writing/spellingWordPool.js';
import { vocabularyWordPool } from '../src/academies/lamar/data/writing/vocabularyWordPool.js';

// Mirrors WORD_POOLS in useAppStore.js, which is module-private there.
const WORD_POOLS = { spelling: spellingWordPool, vocabulary: vocabularyWordPool };

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
}

const SKILLS = Object.keys(WORD_POOLS);
console.log('pools: ' + SKILLS.map((s) => `${s} ${WORD_POOLS[s].length}`).join(', '));

console.log('\n--- 1. rebuilding mid-question does not move anything ---');
// This IS the bug, reproduced: React re-rendered and rebuilt the question while
// he had an answer selected.
let unstable = 0;
let wrongAnswer = 0;
for (const skill of SKILLS) {
  for (const entry of WORD_POOLS[skill]) {
    const seed = 4242;
    const first = buildQuestionForWord(skill, entry, seed);
    for (let render = 0; render < 5; render++) {
      const again = buildQuestionForWord(skill, entry, seed);
      if (JSON.stringify(again.choices) !== JSON.stringify(first.choices)) unstable += 1;
      if (again.answerIndex !== first.answerIndex) unstable += 1;
    }
    const correct = skill === 'spelling' ? entry.word : entry.correct;
    if (first.choices[first.answerIndex] !== correct) wrongAnswer += 1;
  }
}
ok('every question is identical across 5 rebuilds', unstable === 0, `${unstable} drifted`);
ok('answerIndex always points at the genuinely correct choice', wrongAnswer === 0, `${wrongAnswer} wrong`);

console.log('\n--- 2. a retake still reshuffles ---');
// Stability must not become "the answer is always in slot 3 forever".
let reshuffled = 0;
let total = 0;
for (const skill of SKILLS) {
  for (const entry of WORD_POOLS[skill]) {
    total += 1;
    const a = buildQuestionForWord(skill, entry, 1000);
    const b = buildQuestionForWord(skill, entry, 2000);
    if (JSON.stringify(a.choices) !== JSON.stringify(b.choices)) reshuffled += 1;
  }
}
ok('a different attempt gives a different order for most words',
  reshuffled > total * 0.5, `${reshuffled}/${total} changed`);

console.log('\n--- 3. the correct answer is not parked in one slot ---');
// One seed shared across a whole quiz would correlate every question. The word
// id is mixed into the seed to stop that; this proves it worked.
for (const skill of SKILLS) {
  const slots = {};
  for (const entry of WORD_POOLS[skill]) {
    const q = buildQuestionForWord(skill, entry, 777);
    slots[q.answerIndex] = (slots[q.answerIndex] || 0) + 1;
  }
  const counts = Object.values(slots);
  const n = WORD_POOLS[skill].length;
  ok(`${skill}: the answer lands in more than one position`, Object.keys(slots).length > 1,
    JSON.stringify(slots));
  ok(`${skill}: no single position holds more than 60% of answers`,
    Math.max(...counts) <= n * 0.6, `${JSON.stringify(slots)} of ${n}`);
}

console.log('\n--- 4. the source of the bug cannot come back ---');
// Comments are stripped first — this file EXPLAINS the old Math.random() bug at
// length, and a guard that trips over its own documentation is a guard people
// learn to ignore.
function stripComments(src) {
  let out = '';
  for (let i = 0; i < src.length; ) {
    const c = src[i];
    if (c === '/' && src[i + 1] === '/') { const j = src.indexOf('\n', i); i = j === -1 ? src.length : j; continue; }
    if (c === '/' && src[i + 1] === '*') { const j = src.indexOf('*/', i); i = j === -1 ? src.length : j + 2; continue; }
    if (c === '"' || c === "'" || c === '`') {
      const q = c; out += c; i += 1;
      while (i < src.length) {
        if (src[i] === '\\') { out += src.slice(i, i + 2); i += 2; continue; }
        out += src[i];
        if (src[i] === q) { i += 1; break; }
        i += 1;
      }
      continue;
    }
    out += c; i += 1;
  }
  return out;
}
const lib = stripComments(fs.readFileSync(path.join(REPO, 'src/lib/weeklyWords.js'), 'utf8'));
ok('weeklyWords.js runs no bare Math.random()', !/Math\.random\(\)/.test(lib),
  'an unseeded shuffle here is exactly what made the quiz unanswerable');
ok('the shuffle takes a seed', /function shuffle\(arr, seed\)/.test(lib));
for (const file of ['WeeklyQuizEngine', 'WordPracticeEngine']) {
  const src = fs.readFileSync(path.join(REPO, `src/components/Writing/${file}.jsx`), 'utf8');
  ok(`${file} pins one seed per sitting`, /useState\(\(\) => Date\.now\(\)\)/.test(src));
  ok(`${file} passes that seed to the builder`, /buildQuestionForWord\(skill, w, attemptSeed\)/.test(src));
  // The original memo depended on an array the store rebuilt every render.
  ok(`${file} no longer memoises questions on the raw words array`,
    !/\[skill, words\]/.test(src), 'depend on stable ids, not array identity');
  ok(`${file} keys its memo on word ids`, /wordKey/.test(src));
}

// ---------------------------------------------------------------------------
// 5. THE WORD WEEK STARTS ON A MONDAY.
//
// The Mon-Fri rhythm (introduce / practice / practice / review / test) is the
// whole design, and it is carried by weekStartDate + a 7-day rotation. Her
// real database had both skills anchored to THURSDAY 2026-08-06, because the
// anchor used to be "whatever day the app was first opened". That rotation
// would have fired mid-cycle: Monday's introduce and Tue/Wed's practice wiped
// on Thursday morning, Thursday's review pointed at words he had never seen,
// Friday's test run on a two-day-old list.
// ---------------------------------------------------------------------------
console.log('\n--- 5. the word week starts on a Monday ---');
{
  const iso = (d) => d.toISOString().slice(0, 10);
  const dayOf = (s) => new Date(s + 'T00:00:00Z').getUTCDay();

  // Every day of a fortnight, from a cold start.
  let allMon = true;
  let idempotent = true;
  for (let i = 0; i < 400; i++) {
    const d = new Date(Date.UTC(2026, 7, 1));
    d.setUTCDate(d.getUTCDate() + i);
    const today = iso(d);
    const fresh = computeWeeklyWordState(spellingWordPool, null, today);
    if (dayOf(fresh.weekStartDate) !== 1) allMon = false;
    if (mondayOnOrBefore(fresh.weekStartDate) !== fresh.weekStartDate) idempotent = false;
  }
  ok('a first-ever week always starts on a Monday', allMon);
  ok('snapping an already-Monday anchor changes nothing', idempotent);

  // Her actual stored row, as read out of IndexedDB on Aug 9 2026.
  const hers = {
    weekNumber: 3,
    weekStartDate: '2026-08-06', // a Thursday
    currentWordIds: spellingWordPool.slice(0, 10).map((w) => w.id),
    poolCursor: 10,
    quizTakenThisWeek: false,
    lastQuizMissedIds: [],
    completedDayTasks: [],
    dayMissedIds: {}
  };
  const repaired = computeWeeklyWordState(spellingWordPool, hers, '2026-08-09');
  ok('a Thursday-anchored row is re-anchored to its Monday',
    repaired.weekStartDate === '2026-08-03', `got ${repaired.weekStartDate}`);
  ok('re-anchoring does not silently burn a week',
    repaired.weekNumber === 3, `week ${repaired.weekNumber}`);
  ok('re-anchoring does not wipe work already done this week',
    repaired.currentWordIds.length === 10);

  // Every rotation from here lands on a Monday, for a year, including the
  // "app was not opened for a month" catch-up path.
  let rotationsAllMon = true;
  for (let i = 1; i <= 365; i++) {
    const d = new Date(Date.UTC(2026, 7, 9));
    d.setUTCDate(d.getUTCDate() + i);
    const next = computeWeeklyWordState(spellingWordPool, hers, iso(d));
    if (dayOf(next.weekStartDate) !== 1) rotationsAllMon = false;
  }
  ok('every later rotation also lands on a Monday', rotationsAllMon);

  // The rhythm itself, on a normal week.
  const monday = { ...hers, weekStartDate: '2026-08-10' };
  const at = (dateStr, state = monday) => getTodaysWordTask(state, new Date(dateStr + 'T12:00:00Z'));
  // 'introduce' became 'read' when the five real activities landed. This line
  // is why the rename was safe: the guard failed the moment the string drifted.
  ok('Monday reads the list', at('2026-08-10').type === 'read');
  // Catching up comes first by design, so Monday has to be marked done before
  // Tuesday's own activity is what the day returns.
  const caughtUp = { ...monday, completedDayTasks: ['mon', 'tue'] };
  ok('Wednesday is a different activity from Monday',
    getTodaysWordTask(caughtUp, new Date('2026-08-12T12:00:00Z'), 'spelling').type !== 'read');
  ok('spelling and vocabulary get different Wednesdays',
    getTodaysWordTask(caughtUp, new Date('2026-08-12T12:00:00Z'), 'spelling').type !==
      getTodaysWordTask(caughtUp, new Date('2026-08-12T12:00:00Z'), 'vocabulary').type);
  ok('an unfinished Monday is still offered on Tuesday, labelled as catch-up',
    at('2026-08-11').type === 'read' && at('2026-08-11').isCatchUp === true);
  ok('Saturday has no task', at('2026-08-15').type === 'weekend');
  ok('Sunday has no task', at('2026-08-16').type === 'weekend');
}

// ---------------------------------------------------------------------------
// 6. A ROW THAT IS NOT DUE IS NOT A ROW THAT IS FINISHED.
//
// The weekend fix borrowed kind='done' to stop the two word rows vanishing on
// a Saturday. 'done' draws a filled green tick and strikes the title through,
// so the parent read the screen as drawn: "spelling and vocab are marked off
// as completed when its not."
// ---------------------------------------------------------------------------
console.log('\n--- 6. the weekend row does not claim to be done ---');
{
  const dash = fs.readFileSync(path.join(REPO, 'src/components/Dashboard/MissionControlDashboard.jsx'), 'utf8');
  const row = fs.readFileSync(path.join(REPO, 'src/components/Dashboard/TodayRow.jsx'), 'utf8');
  const weekendBlock = dash.slice(dash.indexOf("if (task.type === 'weekend')"), dash.indexOf("if (task.type === 'done')"));
  ok('the weekend word row is kind=rest, not kind=done', /kind="rest"/.test(weekendBlock) && !/kind="done"/.test(weekendBlock));
  ok('the weekend word row still opens the word list', /onStudyWords\(skill\)/.test(weekendBlock));
  ok('TodayRow knows what a rest row is', /const isRest = kind === 'rest';/.test(row));
  ok('a rest row is not struck through', /isDone \? 'text-ink-500 line-through' : isRest \?/.test(row));
  ok('only a done row gets the filled green box', /isDone \? 'border-signal-green bg-signal-green' : 'border-space-600'/.test(row));
  ok("a finished day says 'done for today', not 'for this week'",
    dash.includes("' — done for today'") && !dash.includes("' — done for this week'"));
}

// ---------------------------------------------------------------------------
// 7. FIVE DIFFERENT ACTIVITIES PER SKILL, NOT ONE REPEATED.
//
// The parent: "There was daily skills to do for each day until the end of the
// week... 1st was reading the list, 2nd day choosing the correct spelt word,
// 3rd word search." DAY_TASK_INFO used to hold Monday's read and then the SAME
// multiple-choice round four times under four different labels.
// ---------------------------------------------------------------------------
console.log('\n--- 7. five different activities per skill ---');
{
  for (const skill of ['spelling', 'vocabulary']) {
    const types = DAY_TASK_ORDER.map((d) => activityFor(skill, d).type);
    ok(`${skill}: five distinct activities`, new Set(types).size === 5, types.join(' -> '));
    ok(`${skill}: every weekday has a label and an instruction`,
      DAY_TASK_ORDER.every((d) => {
        const a = activityFor(skill, d);
        return a && a.label && a.instructions && a.instructions.length > 15;
      }));
    ok(`${skill}: Monday reads and Friday tests`, types[0] === 'read' && ['test', 'spell'].includes(types[4]));
  }
  ok('the two skills do not run the same week',
    DAY_TASK_ORDER.some((d) => activityFor('spelling', d).type !== activityFor('vocabulary', d).type));
  ok('the word search is asked for by the schedule', activityFor('spelling', 'wed').type === 'wordsearch');

  // Recognition must never bank a mastery streak — see MASTERY_ACTIVITIES.
  ok('reading the list earns no mastery', !MASTERY_ACTIVITIES.has('read'));
  ok('the word search earns no mastery', !MASTERY_ACTIVITIES.has('wordsearch'));
  ok('every other activity does', ['choose', 'missing', 'spell', 'meaning', 'blank', 'recall', 'test']
    .every((t) => MASTERY_ACTIVITIES.has(t)));

  // The router and the dashboard must not hold their own copy of the schedule.
  const router = fs.readFileSync(path.join(REPO, 'src/components/Writing/WordActivityRouter.jsx'), 'utf8');
  ok('the router reads the schedule instead of restating it', /activityFor\(skill, dayKey\)/.test(router));
  const dash2 = fs.readFileSync(path.join(REPO, 'src/components/Dashboard/MissionControlDashboard.jsx'), 'utf8');
  ok('the dashboard routes every day through one door', /const act = \(\) => onPracticeWords\(skill, task\.dayKey\)/.test(dash2));
}

console.log('\n--- 8. every activity builder is deterministic and answerable ---');
{
  let allStable = true;
  let allAnswerable = true;
  let maskOk = true;
  let blankOk = true;
  for (const entry of spellingWordPool) {
    const a = buildMissingLettersPrompt(entry, 99);
    const b = buildMissingLettersPrompt(entry, 99);
    if (JSON.stringify(a) !== JSON.stringify(b)) allStable = false;
    if (a.answer !== entry.word) allAnswerable = false;
    // never hollowed out, never blank the first or last letter, always some gap
    const gaps = (a.masked.match(/_/g) || []).length;
    if (gaps < 1 || gaps > Math.ceil(entry.word.length / 2)) maskOk = false;
    if (a.masked[0] === '_' || a.masked[a.masked.length - 1] === '_') maskOk = false;
    if (a.masked.length !== entry.word.length) maskOk = false;

    const t = buildSpellingTestPrompt(entry, 99);
    if (JSON.stringify(t) !== JSON.stringify(buildSpellingTestPrompt(entry, 99))) allStable = false;
    // The one day the correct spelling is never on screen before he types it.
    if (t.wrongForms.some((w) => w.toLowerCase() === entry.word.toLowerCase())) allAnswerable = false;
  }
  ok('spelling: missing-letters is byte-identical when rebuilt', allStable);
  ok('spelling: the answer is always the real word', allAnswerable);
  ok('spelling: the mask never hides the first, the last, or over half', maskOk);

  const week = vocabularyWordPool.slice(0, WORDS_PER_WEEK);
  for (const entry of vocabularyWordPool) {
    const scope = vocabularyWordPool.slice(0, WORDS_PER_WEEK).includes(entry) ? week : [entry, ...week.slice(0, 3)];
    const q = buildBlankQuestion(entry, scope, 7);
    if (JSON.stringify(q) !== JSON.stringify(buildBlankQuestion(entry, scope, 7))) allStable = false;
    if (q.choices[q.answerIndex] !== entry.word) blankOk = false;
    if (new Set(q.choices).size !== q.choices.length) blankOk = false;
    // The gap must actually be a gap.
    if (q.prompt.includes('{word}') || q.prompt.includes(entry.word)) blankOk = false;
    const r = buildRecallQuestion(entry, scope, 7);
    if (r.choices[r.answerIndex] !== entry.word) blankOk = false;
    if (r.prompt !== entry.correct) blankOk = false;
  }
  ok('vocabulary: fill-the-blank and recall are stable and correct', allStable && blankOk);

  ok('typed answers forgive case and spaces',
    isTypedAnswerCorrect('  receive ', 'Receive') && !isTypedAnswerCorrect('recieve', 'Receive'));

  // The word search: every word placed, grid readable back, same seed same grid.
  let searchOk = true;
  for (let w = 0; w < 12; w++) {
    const words = spellingWordPool.slice(w * 10, w * 10 + 10);
    if (words.length < 10) break;
    const puzzle = buildWordSearch(words, 1234 + w);
    if (puzzle.placements.length !== words.length) searchOk = false;
    if (JSON.stringify(puzzle.grid) !== JSON.stringify(buildWordSearch(words, 1234 + w).grid)) searchOk = false;
    for (const p of puzzle.placements) {
      const read = p.cells.map(([r, c]) => puzzle.grid[r][c]).join('');
      if (read !== p.letters) searchOk = false;
      if (p.cells.some(([r, c]) => r < 0 || c < 0 || r >= puzzle.size || c >= puzzle.size)) searchOk = false;
    }
  }
  ok('word search: all ten placed, in the grid, same every rebuild', searchOk);
}

// ---------------------------------------------------------------------------
// 9. THE LIST MOVES.
//
// Her database on Aug 9 2026: week 3, poolCursor 10 — three weeks in, still on
// spelling words 1-10, because rotation read ONE thing: whether the Friday test
// had been sat. No test meant all ten carried and zero new words arrived, and
// the four days of work he actually did counted for nothing.
// ---------------------------------------------------------------------------
console.log('\n--- 9. the list moves, in every scenario ---');
{
  const iso = (d) => d.toISOString().slice(0, 10);
  const runYear = (pool, accuracy, days, weeks = 36) => {
    let st = computeWeeklyWordState(pool, null, '2026-08-10');
    let rnd = 12345;
    const rand = () => { rnd = (rnd * 1103515245 + 12345) % 2147483648; return rnd / 2147483648; };
    let minList = 99;
    let sawDuplicate = false;
    for (let w = 0; w < weeks; w++) {
      minList = Math.min(minList, st.currentWordIds.length);
      if (new Set(st.currentWordIds).size !== st.currentWordIds.length) sawDuplicate = true;
      const words = getWordsByIds(pool, st.currentWordIds);
      for (const d of days) {
        const results = words.map((x) => ({ wordId: x.id, correct: rand() < accuracy }));
        st = { ...st, wordMastery: applyResultsToMastery(st.wordMastery, results, true) };
      }
      const day = new Date(Date.UTC(2026, 7, 10));
      day.setUTCDate(day.getUTCDate() + 7 * (w + 1));
      st = computeWeeklyWordState(pool, st, iso(day));
    }
    return { st, minList, sawDuplicate, ...masteryCounts(st.wordMastery) };
  };

  const good = runYear(spellingWordPool, 0.85, ['tue', 'thu', 'fri']);
  ok('a solid year clears well over 100 words', good.mastered > 100, `${good.mastered} mastered`);

  // THE SCENARIO THAT WAS BROKEN: the Friday test never gets sat.
  const noFriday = runYear(spellingWordPool, 0.85, ['tue', 'thu']);
  ok('the list still moves in a year with NO Friday test ever taken',
    noFriday.mastered > 50, `${noFriday.mastered} mastered without a single test`);
  ok('...and it reaches new words, not the same ten',
    noFriday.st.poolCursor > WORDS_PER_WEEK * 4, `cursor ${noFriday.st.poolCursor}`);

  // THE OTHER STALL: he cannot get any of them. The list must still turn over.
  const stuck = runYear(spellingWordPool, 0.0, ['tue', 'thu', 'fri'], 20);
  ok('a word he never gets is set aside, not carried forever',
    stuck.stalled > 0 && stuck.st.poolCursor > WORDS_PER_WEEK, `${stuck.stalled} set aside`);
  ok('...and stalled words are reported rather than silently dropped', stuck.stalled >= 10);

  // Longest possible run: the pool runs out.
  const perfect = runYear(spellingWordPool, 1.0, ['tue', 'thu', 'fri'], 150);
  ok('the list is never empty, even after the pool is exhausted',
    perfect.minList === WORDS_PER_WEEK && perfect.st.currentWordIds.length === WORDS_PER_WEEK,
    `min ${perfect.minList}`);
  ok('a word is never on the list twice', !perfect.sawDuplicate && !good.sawDuplicate && !stuck.sawDuplicate);

  /**
   * ---- THE CASE THIS SUITE DID NOT MODEL (Aug 17, 2026) ----
   *
   * The parent, eight days after section 9 was written and shipped green:
   * **"Spelling and vocab has the same words from the previous week."**
   *
   * Her live row: spelling week 5, sp-01..sp-10, poolCursor 10. The identical
   * signature section 9 exists to prevent, on a suite that passes.
   *
   * Every scenario above runs `applyResultsToMastery` on at least two days. The
   * suite modelled every kind of BAD PERFORMANCE - 85%, 0%, no Friday test -
   * and no kind of ABSENCE. He had done nothing at all: no quizzes, no
   * activities, every word `correct: 0, wrong: 0`. With ten unmastered words
   * carried and ten seats to fill, the backfill loop's condition was false
   * before its first iteration, and the cursor sat on 10 for three weeks.
   *
   * **A guard that only models failure will not catch nothing happening.**
   * Zero is not the bottom of the accuracy range; it is off the axis.
   */
  const idle = runYear(spellingWordPool, 0.85, [], 12);
  ok('the list moves in a year where he does NO activities at all',
    idle.st.poolCursor >= WORDS_PER_WEEK * 10,
    `cursor ${idle.st.poolCursor} after 12 idle weeks`);
  ok('...and a word he never answered is never reported as stalled',
    idle.stalled === 0,
    'stalled means he tried and could not get it - it is a request to teach the word');

  // The invariant the caps buy, asserted week by week rather than at the end.
  {
    const iso2 = (d) => d.toISOString().slice(0, 10);
    let st = computeWeeklyWordState(spellingWordPool, null, '2026-08-10');
    let worstNew = WORDS_PER_WEEK;
    let repeated = false;
    for (let w = 0; w < 30; w++) {
      const before = new Set(st.currentWordIds);
      const day = new Date(Date.UTC(2026, 7, 10));
      day.setUTCDate(day.getUTCDate() + 7 * (w + 1));
      st = computeWeeklyWordState(spellingWordPool, st, iso2(day));
      const fresh = st.currentWordIds.filter((id) => !before.has(id)).length;
      worstNew = Math.min(worstNew, fresh);
      if (fresh === 0) repeated = true;
    }
    ok('no week ever repeats the previous week\'s list', !repeated);
    ok(`every week brings at least ${MIN_NEW_WORDS_PER_WEEK} words he has not had`,
      worstNew >= MIN_NEW_WORDS_PER_WEEK,
      `worst week introduced ${worstNew}`);
  }

  // THE ONE-TIME REPAIR, run against the exact row she reported.
  {
    const hersNow = {
      weekNumber: 5,
      weekStartDate: '2026-08-17',
      currentWordIds: spellingWordPool.slice(0, 10).map((w) => w.id),
      poolCursor: 10,
      quizTakenThisWeek: false,
      lastQuizMissedIds: [],
      completedDayTasks: [],
      dayMissedIds: {},
      quizHistory: [{ weekNumber: 2, score: 8 }],
      wordMastery: Object.fromEntries(spellingWordPool.slice(0, 10).map((w) => [
        w.id, { streak: 0, correct: 0, wrong: 0, weeks: 3, mastered: false, stalled: false }
      ]))
    };
    const fixed = computeWeeklyWordState(spellingWordPool, hersNow, '2026-08-17');
    const overlap = fixed.currentWordIds.filter((id) => hersNow.currentWordIds.includes(id));
    ok('a row stuck under the old rule is rebuilt the moment the app loads',
      overlap.length === 0,
      'waiting for the next Monday would mean another whole week of the reported list');
    ok('...without advancing the week or the calendar',
      fixed.weekNumber === 5 && fixed.weekStartDate === '2026-08-17',
      'he gets the list this week should have had; the schedule is not touched');
    ok('...and without touching the Friday test scores his grade is built from',
      fixed.quizHistory.length === 1 && fixed.quizHistory[0].score === 8);
    ok('...and the repair runs exactly once', 
      computeWeeklyWordState(spellingWordPool, fixed, '2026-08-17').currentWordIds.join() ===
        fixed.currentWordIds.join(),
      'a repair that re-fires on every load would re-roll his list under him');
  }

  /**
   * ---- HIS MACHINE, NOT HERS (Aug 17, 2026) ----
   *
   * The parent: "He has done spelling and vocabulary. He has completed all of
   * what it listed for that previous week."
   *
   * He had. This app syncs by hand-carried JSON, and every activity he does
   * writes to HIS database. The row read on her machine is her own copy - the
   * one she opens to grade - and it is empty because nothing is done on it.
   *
   * Which makes the repair destructive in a way it is not on her machine: it
   * clears completedDayTasks, and on his those are days he actually worked.
   */
  {
    const midWeek = {
      weekNumber: 5,
      weekStartDate: '2026-08-17',
      currentWordIds: spellingWordPool.slice(0, 10).map((w) => w.id),
      poolCursor: 10,
      quizTakenThisWeek: false,
      lastQuizMissedIds: [],
      completedDayTasks: ['mon', 'tue'],
      dayMissedIds: { tue: ['sp-03'] },
      quizHistory: [],
      wordMastery: Object.fromEntries(spellingWordPool.slice(0, 10).map((w, i) => [
        w.id, { streak: 1, correct: 4, wrong: i < 3 ? 2 : 0, weeks: 3, mastered: false, stalled: false }
      ]))
    };
    const after = computeWeeklyWordState(spellingWordPool, midWeek, '2026-08-19');
    ok('the repair does NOT fire on a week he has already worked in',
      after.completedDayTasks.join() === 'mon,tue' &&
        after.currentWordIds.join() === midWeek.currentWordIds.join(),
      'those two days are on HIS machine and are days he actually did');
    ok('...but the rule is stamped, so the new logic takes over at the next rotation',
      after.rotationRule === ROTATION_RULE);
    const nextMon = computeWeeklyWordState(spellingWordPool, after, '2026-08-24');
    const fresh = nextMon.currentWordIds.filter((id) => !midWeek.currentWordIds.includes(id));
    ok('...and that rotation does move the list',
      fresh.length >= MIN_NEW_WORDS_PER_WEEK, `${fresh.length} new words`);

    /**
     * THE BUG'S THREE WEEKS ARE NOT HIS THREE WEEKS.
     *
     * Every word on the frozen list carries weeks: 3. Fed to the new rule
     * unchanged they cross MAX_WEEKS_ON_LIST on the first pass and all ten are
     * set aside as STALLED - reported to the parent as ten words needing
     * teaching, for a boy who did every activity the week asked for.
     */
    const workedNotStarted = { ...midWeek, completedDayTasks: [], dayMissedIds: {} };
    const repaired = computeWeeklyWordState(spellingWordPool, workedNotStarted, '2026-08-17');
    ok('a boy who did the work is not handed ten stalled words by the repair',
      stalledWordIds(repaired.wordMastery).length === 0,
      'the three weeks on the counter were the frozen list, not his effort');
    ok('...and what he got right and wrong is carried over untouched',
      repaired.wordMastery['sp-01'].correct === 4 && repaired.wordMastery['sp-01'].wrong === 2);
    ok('...while the words he actually missed keep their seats',
      ['sp-01', 'sp-02', 'sp-03'].every((id) => repaired.currentWordIds.includes(id)),
      'three wrong answers is what a carried seat is FOR');
  }

  // The mastery bar itself.
  let m = {};
  for (let i = 0; i < MASTERY_STREAK - 1; i++) m = applyResultsToMastery(m, [{ wordId: 'x', correct: true }]);
  ok(`${MASTERY_STREAK - 1} in a row is not mastered`, !m.x.mastered);
  m = applyResultsToMastery(m, [{ wordId: 'x', correct: true }]);
  ok(`${MASTERY_STREAK} in a row is`, m.x.mastered);
  let n = applyResultsToMastery({}, [{ wordId: 'y', correct: true }, { wordId: 'y', correct: true }]);
  n = applyResultsToMastery(n, [{ wordId: 'y', correct: false }]);
  n = applyResultsToMastery(n, [{ wordId: 'y', correct: true }]);
  ok('one wrong answer resets the streak', !n.y.mastered && n.y.streak === 1);
  ok('a non-mastery activity records nothing',
    Object.keys(applyResultsToMastery({}, [{ wordId: 'z', correct: true }], false)).length === 0);
  ok('MAX_WEEKS_ON_LIST is small enough to keep the year moving', MAX_WEEKS_ON_LIST <= 4);
}

// ---------------------------------------------------------------------------
// 10. VOCABULARY IS AEROSPACE-BASED.
//
// The parent: "Vocab is supposed to be aerospace based." The first ~120 words
// were; the rest had drifted into general science, math, civics and academic
// vocabulary, so a word he met in November taught him nothing about the career
// the whole curriculum points at.
//
// The mechanical half of "the sentence must teach the meaning" is checkable and
// is checked. The rest is a reading job, not a script's.
// ---------------------------------------------------------------------------
console.log('\n--- 10. every vocabulary sentence is aerospace, and usable ---');
{
  const AEROSPACE = /rocket|space|orbit|satellit|engineer|flight|aircraft|aviat|astronaut|launch|nasa|mission control|spacecraft|propuls|aerodynam|wing|thrust|payload|telescope|planet|mars|moon|lunar|shuttle|probe|booster|fuselage|altitude|jet|pilot|cockpit|runway|turbine|drone|robot|capsule|module|trajector|apollo|solar|comet|asteroid|gravity|wind tunnel|hangar|telemetr|avionic|crew|rover|airfield|airport|spaceport|antenna|thruster|glider|balloon|radar|reentry|heat shield|simulator|control room|test stand|nozzle|fuel|landing|machinist|technician|wrench|bolt|airframe|cabin|station|inspector|wreckage|airline|air show|cadet|navigation|sensor|cubesat|parachute|countdown|plane|engine|exhaust|mission|iss|star|drag|martian|dish|crash|sound|airfield|design review/i;
  const offTheme = vocabularyWordPool.filter((w) => !AEROSPACE.test(w.sentence));
  ok('every sentence is set in aerospace or engineering', offTheme.length === 0,
    offTheme.slice(0, 5).map((w) => w.id).join(', '));

  ok('every sentence still carries the {word} slot exactly once',
    vocabularyWordPool.every((w) => (w.sentence.match(/\{word\}/g) || []).length === 1));

  // The sentence is the teaching -- Tuesday infers the meaning from it and
  // Wednesday blanks the word out of it. A sentence containing the answer
  // gives Tuesday away; one containing the word gives Wednesday away.
  const leaks = vocabularyWordPool.filter((w) =>
    w.sentence.toLowerCase().replace('{word}', ' ').includes(w.word.toLowerCase()));
  ok('no sentence contains the word it is hiding', leaks.length === 0,
    leaks.slice(0, 5).map((w) => w.id).join(', '));

  ok('sentences stay short enough to read in a 15-minute block',
    vocabularyWordPool.every((w) => w.sentence.length < 130));
  ok('no sentence is a stub', vocabularyWordPool.every((w) => w.sentence.trim().split(/\s+/).length >= 8));
  ok('meanings and distractors were left alone',
    vocabularyWordPool.every((w) => w.correct && Array.isArray(w.distractors) && w.distractors.length === 3));
  ok('every word is still unique', new Set(vocabularyWordPool.map((w) => w.word)).size === vocabularyWordPool.length);
}

// ---------------------------------------------------------------------------
// 10. TWO COMPUTERS, ONE LEDGER.
//
// The parent: "He has done spelling and vocabulary. He has completed all of
// what it listed for that previous week."
//
// He had — on HIS computer. This app syncs by hand-carried JSON and her copy is
// the one she opens to grade, so it reads empty. The import merge let the higher
// week number win the whole row, and both machines rotate on the same calendar
// whether or not work happens on them. A week she opens and he does not leaves
// her one ahead with an empty ledger; one import would have taken his year.
// ---------------------------------------------------------------------------
console.log('\n--- 10. an import never costs him a year of answers ---');
{
  const his = {
    skill: 'spelling',
    weekNumber: 5,
    quizHistory: [{ weekNumber: 3, score: 9 }, { weekNumber: 4, score: 7 }],
    wordMastery: {
      'sp-01': { streak: 2, correct: 6, wrong: 1, weeks: 2, mastered: false, stalled: false },
      'sp-02': { streak: 3, correct: 9, wrong: 0, weeks: 1, mastered: true, stalled: false },
      'sp-03': { streak: 0, correct: 1, wrong: 8, weeks: 4, mastered: false, stalled: true }
    }
  };
  const hers = { skill: 'spelling', weekNumber: 6, quizHistory: [], wordMastery: {} };

  const won = { ...hers, ...mergeWordHistories(his, hers) };
  ok('her week is ahead, and his answers still survive it',
    Object.keys(won.wordMastery).length === 3,
    'the week number decides which week is current, not who he is');
  ok('...including every Friday test his English grade is built from',
    won.quizHistory.length === 2);
  ok('...and a mastered word stays mastered', won.wordMastery['sp-02'].mastered);

  const bothWays = mergeWordHistories(hers, his);
  ok('the merge is symmetric — it cannot matter which machine exports first',
    JSON.stringify(bothWays.wordMastery) === JSON.stringify(won.wordMastery));

  const partial = {
    wordMastery: { 'sp-01': { streak: 0, correct: 2, wrong: 4, weeks: 1, mastered: false, stalled: false } },
    quizHistory: [{ weekNumber: 3, score: 4 }]
  };
  const both = mergeWordHistories(his, partial);
  ok('a word answered on both machines takes the higher count from each',
    both.wordMastery['sp-01'].correct === 6 && both.wordMastery['sp-01'].wrong === 4);
  ok('...and the same week sat twice keeps the better score',
    both.quizHistory.find((q) => q.weekNumber === 3).score === 9,
    'the union is by week, so re-importing an older file cannot lower a grade');
  ok('set aside on one machine and still worked on the other means still worked',
    mergeWordHistories(his, {
      wordMastery: { 'sp-03': { streak: 1, correct: 3, wrong: 8, weeks: 2, mastered: false, stalled: false } }
    }).wordMastery['sp-03'].stalled === false);

  const store = fs.readFileSync(new URL('../src/store/useAppStore.js', import.meta.url), 'utf8');
  const importFn = store.slice(store.indexOf('const wordWrites = []'));
  const branch = importFn.slice(0, importFn.indexOf('const khanDailyLog'));
  ok('every branch of the real import merges the histories',
    (branch.match(/mergeWordHistories\(/g) || []).length === 4,
    'ahead, behind, level-same-list and level-different-list — the one that skips it loses the year');
  ok('...and the branch really was found, so the count above is not vacuous',
    branch.length > 500 && /mergeWordHistories/.test(branch));
  /**
   * THE STATE THAT ACTUALLY EXISTS TONIGHT.
   *
   * Her machine has the new build and repaired to sp-11..20 with nothing done.
   * His still has the old build, is on sp-01..10, and has a week of work in it.
   * Same week number, two different lists — a case that could not arise while
   * both were frozen on the identical first ten.
   */
  {
    const store = fs.readFileSync(new URL('../src/store/useAppStore.js', import.meta.url), 'utf8');
    const from = store.slice(store.indexOf('const wordWrites = []'));
    const merge = from.slice(0, from.indexOf('const khanDailyLog'));
    ok('the import merge block was located', merge.length > 500);
    ok('a same-week import compares the two lists before unioning the days',
      /currentWordIds \|\| \[\]\)\.join\(\) ===/.test(merge),
      'unioning Tuesday across two different lists credits words Tuesday never showed');
    ok('...and when they differ, the side with more work done owns the week',
      /incomingWork > localWork \? incoming : local/.test(merge));
    ok('...taking its days and missed words with it, not a blend of both',
      !/\.\.\.\(incomingWork > localWork \? incoming : local\),\s*completedDayTasks/.test(merge));
  }

}


console.log('\n--- 11. the parent can move the list without waiting for Monday ---');
{
  /**
   * The parent, a third time: "The spelling and vocabulary still hasn't moved
   * to the new week."
   *
   * Twice the answer was a rule chosen in code — and both times she had to come
   * back and say it was still wrong. The list moves on a schedule only the code
   * knows, and the one person who can see that it is wrong had no way to move
   * it. This suite covers the control that fixes that, not another rule.
   */
  const worked = {
    weekNumber: 5,
    weekStartDate: '2026-08-17',
    currentWordIds: spellingWordPool.slice(10, 20).map((w) => w.id),
    poolCursor: 20,
    quizTakenThisWeek: true,
    lastQuizMissedIds: ['sp-11'],
    completedDayTasks: ['mon', 'tue', 'wed'],
    dayMissedIds: { tue: ['sp-11'] },
    quizHistory: [{ weekNumber: 4, score: 9 }, { weekNumber: 5, score: 7 }],
    wordMastery: Object.fromEntries(spellingWordPool.slice(10, 20).map((w, i) => [
      w.id, { streak: i < 2 ? 0 : 3, correct: 5, wrong: i < 2 ? 3 : 0, weeks: 1, mastered: i >= 2, stalled: false }
    ])),
    rotationRule: ROTATION_RULE
  };
  const after = advanceToNextList(spellingWordPool, worked, '2026-08-19');

  const fresh = after.currentWordIds.filter((id) => !worked.currentWordIds.includes(id));
  ok('it moves the list on demand, mid-week',
    fresh.length >= MIN_NEW_WORDS_PER_WEEK,
    `${fresh.length} words he has not had`);
  ok('...and re-anchors to THIS Monday, so the new list gets a full week',
    after.weekStartDate === '2026-08-17',
    `got ${after.weekStartDate}`);
  ok('...counting as the next list, not a repeat of this one',
    after.weekNumber === 6);
  ok('...keeping every Friday test his English grade is built from',
    after.quizHistory.length === 2 && after.quizHistory[1].score === 7);
  ok('...keeping every answer he has ever given',
    after.wordMastery['sp-13'].mastered === true && after.wordMastery['sp-11'].wrong === 3,
    'the ledger is his, and moving a list is not a reason to lose it');
  ok('...and the words he actually got wrong keep their seats',
    after.currentWordIds.includes('sp-11') || after.currentWordIds.includes('sp-12'),
    'three wrong answers is what a carried seat is for');
  ok('this week\'s completed days ARE cleared — they belong to the old list',
    after.completedDayTasks.length === 0,
    'and the confirm dialog says so before it runs');

  const twice = advanceToNextList(spellingWordPool, after, '2026-08-19');
  ok('pressing it twice moves twice rather than doing nothing',
    twice.weekNumber === 7 && twice.currentWordIds.join() !== after.currentWordIds.join());

  /**
   * ---- THE DAYS HE WORKED OUTLIVE THE LIST (Aug 18, 2026) ----
   *
   * `completedDayTasks` was doing two jobs: the week strip on his screen, and
   * — through wordStudyDates() — his Georgia instructional hours for the
   * Spelling & Vocabulary block. One resets every Monday. The other must never
   * reset. A button built to move the list on would have taken days of
   * instruction out of the compliance record, silently.
   */
  {
    const worked2 = {
      weekNumber: 5,
      weekStartDate: '2026-08-17',
      currentWordIds: spellingWordPool.slice(10, 20).map((w) => w.id),
      poolCursor: 20,
      completedDayTasks: ['mon', 'tue'],
      creditedDates: ['2026-08-17', '2026-08-18'],
      dayMissedIds: {},
      quizHistory: [],
      wordMastery: {},
      rotationRule: ROTATION_RULE
    };
    const moved = advanceToNextList(spellingWordPool, worked2, '2026-08-19');
    ok('the dates he actually worked survive the list moving',
      (moved.creditedDates || []).join() === '2026-08-17,2026-08-18',
      'these are his Georgia instructional hours, not weekly state');

    const rotated = computeWeeklyWordState(spellingWordPool, worked2, '2026-08-24');
    ok('...and survive the ordinary Monday rotation too',
      (rotated.creditedDates || []).length === 2);

    const dates = wordStudyDates({ spelling: moved });
    ok('...and still reach the compliance record after the list moved',
      dates.has('2026-08-17') && dates.has('2026-08-18'),
      'the week strip resets; the attendance does not');

    const legacy = wordStudyDates({ spelling: { weekStartDate: '2026-08-17', completedDayTasks: ['mon', 'wed'] } });
    ok('a row written before creditedDates existed still credits its days',
      legacy.has('2026-08-17') && legacy.has('2026-08-19'),
      'union, not fallback — nothing already recorded is lost');

    const merged = mergeWordHistories(
      { creditedDates: ['2026-08-17'] },
      { creditedDates: ['2026-08-18', '2026-08-17'] }
    );
    ok('two computers union their instruction dates rather than overwriting',
      (merged.creditedDates || []).join() === '2026-08-17,2026-08-18');
  }

  const view = fs.readFileSync(new URL('../src/components/Dashboard/WordStudyRecordSection.jsx', import.meta.url), 'utf8');
  ok('the control is on the screen she already uses to check word study',
    /AdvanceListControl/.test(view) && /advanceWordListNow/.test(view));
  ok('...and the confirm names the words it is about to replace',
    /Replaces this week's ten words/.test(view),
    'a confirmation that does not say what it destroys is a formality, not a safeguard');
  ok('...and says plainly what re-opens',
    /re-open on the new words/.test(view) && /nothing re-opens/.test(view));
  /**
   * THE SENTENCE THAT WAS MISSING.
   *
   * The first version of this dialog said three completed days would be
   * cleared. True, and it did not say that clearing them also removed three
   * days of instruction from the Georgia record — because nobody had noticed
   * that `wordStudyDates()` derives his compliance hours from exactly that
   * field. The dialog was honest about the thing it knew about.
   */
  ok('...and says the attendance record survives it',
    /stay on his attendance record/.test(view),
    'this is the sentence whose absence was the defect');
  ok('...and reports what actually happened rather than claiming success',
    /Now on list \{result\.weekNumber\}/.test(view));
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
