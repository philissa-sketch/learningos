// ---------------------------------------------------------------------------
// SPELLING & VOCABULARY — HER WORD WEEK, IN LAMAR'S FORMAT (Sept 24 2026).
//
// Gigi, Sept 24 2026: Spelling and Vocabulary get their own class on Today, and
// "I want the format of her spelling and vocabulary to be like Lamar's."
// Approved with three defaults: the list changes every MONDAY; Friday's
// spelling test is HEARD, not read; one 15-minute class holds both.
//
// ---- THE WEEK ----
// Two lists, ten words each, a different activity each weekday:
//
//          SPELLING                         VOCABULARY
//   Mon    read the list                    read word, sentence, meaning
//   Tue    spot the right spelling (1 of 4)  word → meaning
//   Wed    word search                      fill the blank
//   Thu    missing letters                  meaning → word
//   Fri    SPELLING TEST (hear it, type it)  VOCABULARY TEST
//
// A missed day is never lost and never locks anything: the earliest weekday
// not yet done shows as today's task, marked catch-up, until it is done.
// Weekends have no task.
//
// ---- THE LISTS ARE FROZEN ON MONDAY ----
// Each list is worked out from what was true BEFORE this Monday: the lessons
// she had read, and the tests she had sat. So reading a lesson on Wednesday
// cannot swap her words mid-week, and Friday tests the list Monday gave her.
//
// ---- WHAT CARRIES ----
// Lamar's rule, already hers for spelling: a word she gets right on a Friday
// test is done. Everything else from earlier weeks carries, first in line, and
// new words top the list up to ten. A week never tested counts as fully missed
// and is never silently dropped. Vocabulary now follows the same rule, because
// it now has a Friday test.
//
// ---- READ-ALOUD ----
// Hearing the word IS the spelling test, as it is in every school. So nothing
// here records an "unaided" number. Everywhere else the rule is the opposite,
// and lib/wordStudy.js explains why.
//
// Everything here is pure: dates, reads and results in, lists and tasks out.
// check-word-week.mjs calls these same functions.
// ---------------------------------------------------------------------------

import { WORD_STUDY_WEEKS, WORDS_PER_WEEK } from '../data/words/wordStudy.js';
import { MISSPELLINGS, VOCABULARY_CARDS } from '../data/words/wordPractice.js';
import { spineWeek, quarterOfWeek, weekWithinQuarter } from './bookReportSchedule.js';
import { WEEKS } from '../config/assessment.js';
import { lessonById } from '../data/lessons/appCourses.js';
import { letterForPercent, percentFromFraction } from './khanGrade.js';

export { WORDS_PER_WEEK };

export const SKILLS = ['spelling', 'vocabulary'];
export const DAY_TASK_ORDER = ['mon', 'tue', 'wed', 'thu', 'fri'];

/** How each piece of her word work is filed in the spellingResults table. */
export const WORD_KINDS = {
  spellingTest: 'spelling',
  vocabularyTest: 'vocab-test',
  activity: 'word-activity'
};

export const WORD_ACTIVITIES = {
  spelling: {
    mon: { type: 'read', label: 'Read the list', instructions: 'Read your ten words. Tap the speaker to hear each one. Next to each word are spellings that look close but are wrong.' },
    tue: { type: 'choose', label: 'Spot the spelling', instructions: 'Four spellings of the same word. Pick the one that is right.' },
    wed: { type: 'wordsearch', label: 'Word search', instructions: 'Find all ten words in the grid. Tap the first letter, then the last letter.' },
    thu: { type: 'missing', label: 'Missing letters', instructions: 'Some letters are gone. Type the whole word, spelled correctly.' },
    fri: { type: 'test', label: 'Spelling test', instructions: 'Tap the flower button to hear each word, then type it. The word is not on the screen.' }
  },
  vocabulary: {
    mon: { type: 'read', label: 'Read the list', instructions: 'Read each word, its sentence, and what it means.' },
    tue: { type: 'meaning', label: 'Word to meaning', instructions: 'Read the sentence. Choose what the word means.' },
    wed: { type: 'blank', label: 'Fill the blank', instructions: 'One word is missing from each sentence. Choose the one that fits.' },
    thu: { type: 'recall', label: 'Meaning to word', instructions: 'The meaning comes first this time. You name the word.' },
    fri: { type: 'test', label: 'Vocabulary test', instructions: 'Ten questions, one for each word. You find out how you did at the end.' }
  }
};

// ---------------------------------------------------------------------------
// DATES
// ---------------------------------------------------------------------------

export function localKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** The Monday of this date's week (Mon–Sun), as a local date key. */
export function mondayOf(date = new Date()) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const shift = (d.getDay() + 6) % 7; // Mon → 0 … Sun → 6
  d.setDate(d.getDate() - shift);
  return localKey(d);
}

export function dayTaskKey(date = new Date()) {
  return { 1: 'mon', 2: 'tue', 3: 'wed', 4: 'thu', 5: 'fri' }[date.getDay()] || null;
}

// ---------------------------------------------------------------------------
// THE TWO LISTS, FROZEN ON MONDAY
// ---------------------------------------------------------------------------

function entryFor(week) {
  return WORD_STUDY_WEEKS.find((w) => w.quarter === quarterOfWeek(week) && w.n === weekWithinQuarter(week)) || null;
}

export function listIdFor(skill, quarter, n) {
  return skill === 'spelling' ? `word-study-q${quarter}-w${n}` : `vocab-q${quarter}-w${n}`;
}

function testKind(skill) {
  return skill === 'spelling' ? WORD_KINDS.spellingTest : WORD_KINDS.vocabularyTest;
}

/** A spelling-test row filed before Sept 24 2026 has no `kind`; it is a spelling test. */
function isTestOf(skill, r) {
  if (!r) return false;
  if (skill === 'spelling') return r.kind === 'spelling' || r.kind == null;
  return r.kind === WORD_KINDS.vocabularyTest;
}

/**
 * One skill's ten words for a word week.
 * `lessonsRead` and `results` must already be cut off at the week's Monday.
 */
export function listFor(skill, lessonsRead = [], results = [], weeks = WEEKS) {
  const week = spineWeek(lessonsRead, weeks);
  const quarter = quarterOfWeek(week);
  const n = weekWithinQuarter(week);
  const tests = (results || []).filter((r) => isTestOf(skill, r));
  const correct = new Set();
  const tested = new Set();
  for (const r of tests) {
    tested.add(r.listId);
    for (const row of r.rows || []) if (row && row.correct) correct.add(String(row.word).toLowerCase());
  }
  const carried = [];
  for (let wk = 1; wk < week; wk += 1) {
    const e = entryFor(wk);
    if (!e) continue;
    const id = listIdFor(skill, e.quarter, e.n);
    for (const item of e[skill]) {
      if (correct.has(item.word.toLowerCase())) continue;
      carried.push({ word: item.word, from: item.from, missedIn: id, neverTested: !tested.has(id) });
    }
  }
  const e = entryFor(week);
  const freshPool = e ? e[skill].filter((i) => !correct.has(i.word.toLowerCase())) : [];
  const kept = carried.slice(0, WORDS_PER_WEEK);
  const room = WORDS_PER_WEEK - kept.length;
  const fresh = room > 0 ? freshPool.slice(0, room) : [];
  return {
    skill,
    week,
    quarter,
    weekInQuarter: n,
    listId: listIdFor(skill, quarter, n),
    carried: kept,
    carriedTotal: carried.length,
    fresh,
    list: [...kept, ...fresh].map((i) => ({ ...i, ...extrasFor(skill, i) })),
    stalled: kept.length >= WORDS_PER_WEEK
  };
}

/** Misspellings for a spelling word; meaning and sentence for a vocabulary word. */
export function extrasFor(skill, item) {
  if (skill === 'spelling') return { misspellings: MISSPELLINGS[item.word] || [] };
  const card = VOCABULARY_CARDS[item.word] || {};
  let meaning = card.meaning || null;
  if (!meaning) {
    const g = (lessonById(item.from)?.glossary || []).find((x) => x.word.toLowerCase() === item.word.toLowerCase());
    meaning = g ? g.plain : null;
  }
  return { meaning, sentence: card.sentence || null };
}

/**
 * Her word week, frozen on this date's Monday.
 * @param lessonReads { [lessonId]: { firstReadAt } } — the store's shape
 * @param results     every row in spellingResults
 */
export function wordWeek({ date = new Date(), lessonReads = {}, results = [] } = {}) {
  const weekOf = mondayOf(date);
  const readBefore = Object.values(lessonReads || {})
    .filter((r) => r && r.firstReadAt && localKey(new Date(r.firstReadAt)) < weekOf)
    .map((r) => r.lessonId);
  const before = (results || []).filter((r) => r && r.dayKey && r.dayKey < weekOf);
  return {
    weekOf,
    spelling: listFor('spelling', readBefore, before),
    vocabulary: listFor('vocabulary', readBefore, before)
  };
}

// ---------------------------------------------------------------------------
// TODAY'S TASK
// ---------------------------------------------------------------------------

/** Which of Mon–Thu are done this week, and whether Friday's test is sat. */
export function weekProgress(skill, weekOf, results = []) {
  const mine = (results || []).filter((r) => r && r.weekOf === weekOf);
  const done = new Set(
    // Friday is only ever finished by the TEST, never by an activity row.
    mine.filter((r) => r.kind === WORD_KINDS.activity && r.skill === skill && r.task !== 'fri').map((r) => r.task)
  );
  if (mine.some((r) => isTestOf(skill, r))) done.add('fri');
  return done;
}

/**
 * Lamar's rule: the earliest weekday not yet done, up to today, is today's
 * task (marked catch-up if it is not today's own). Weekend: nothing.
 */
export function todaysTask(skill, date = new Date(), results = []) {
  const today = dayTaskKey(date);
  if (!today) return { type: 'weekend' };
  const done = weekProgress(skill, mondayOf(date), results);
  const upTo = DAY_TASK_ORDER.indexOf(today);
  for (let i = 0; i <= upTo; i += 1) {
    const key = DAY_TASK_ORDER[i];
    if (!done.has(key)) return { ...WORD_ACTIVITIES[skill][key], dayKey: key, isCatchUp: key !== today };
  }
  return { type: 'done' };
}

// ---------------------------------------------------------------------------
// THE ACTIVITIES — dealt the same way every time for the same week
// ---------------------------------------------------------------------------

function seeded(seedText) {
  let h = 2166136261;
  for (const ch of String(seedText)) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

function shuffle(list, rand) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Tuesday spelling: the word and its three misspellings, shuffled. */
export function chooseRound(list, seed) {
  const rand = seeded(`${seed}|choose`);
  return list.map((w) => ({ word: w.word, options: shuffle([w.word, ...(w.misspellings || []).slice(0, 3)], rand) }));
}

/**
 * Thursday spelling: which letters to hide. The letters her misspellings get
 * wrong are the letters that trip people, so those are the gaps. Never all of
 * the word, never none of it.
 */
export function missingPattern(word, misspellings = []) {
  const w = String(word);
  const gaps = new Set();
  for (const m of misspellings) {
    // Letters that match from the front and from the back are safe; what is
    // between them is where this misspelling goes wrong.
    let a = 0;
    while (a < w.length && a < m.length && w[a] === m[a]) a += 1;
    let b = 0;
    while (b < w.length - a && b < m.length - a && w[w.length - 1 - b] === m[m.length - 1 - b]) b += 1;
    const from = Math.min(a, w.length - 1);
    const to = Math.max(from, w.length - 1 - b);
    for (let i = from; i <= to; i += 1) if (/[a-z]/i.test(w[i])) gaps.add(i);
  }
  const letters = [...w].map((_, i) => i).filter((i) => /[a-z]/i.test(w[i]));
  let hide = letters.filter((i) => gaps.has(i));
  if (!hide.length) hide = letters.filter((i) => /[aeiou]/i.test(w[i])).slice(0, 1);
  const max = Math.max(1, Math.floor(letters.length / 2));
  if (hide.length > max) hide = hide.slice(0, max);
  return [...w].map((ch, i) => (hide.includes(i) ? '_' : ch)).join('');
}

/**
 * Wednesday spelling: a word search. Words go left-to-right or top-to-bottom
 * only, never backwards or diagonal: she is nine.
 */
export function wordSearch(words, seed) {
  const clean = words.map((w) => String(w).toUpperCase().replace(/[^A-Z]/g, '')).filter(Boolean);
  const longest = Math.max(...clean.map((w) => w.length), 8);
  for (let size = Math.max(10, longest + 1); size <= 16; size += 1) {
    const rand = seeded(`${seed}|search|${size}`);
    const grid = Array.from({ length: size }, () => Array(size).fill(null));
    const placements = [];
    let ok = true;
    for (const w of [...clean].sort((a, b) => b.length - a.length)) {
      let placed = false;
      for (let tries = 0; tries < 300 && !placed; tries += 1) {
        const across = rand() < 0.5;
        const r = Math.floor(rand() * (across ? size : size - w.length + 1));
        const c = Math.floor(rand() * (across ? size - w.length + 1 : size));
        let fits = true;
        for (let k = 0; k < w.length && fits; k += 1) {
          const cell = grid[across ? r : r + k][across ? c + k : c];
          if (cell !== null && cell !== w[k]) fits = false;
        }
        if (!fits) continue;
        for (let k = 0; k < w.length; k += 1) grid[across ? r : r + k][across ? c + k : c] = w[k];
        placements.push({ word: w, r, c, across });
        placed = true;
      }
      if (!placed) {
        ok = false;
        break;
      }
    }
    if (!ok) continue;
    const letters = 'ABCDEFGHIJKLMNOPRSTUW';
    const rows = grid.map((row) => row.map((ch) => ch || letters[Math.floor(rand() * letters.length)]).join(''));
    return { size, rows, placements };
  }
  return null;
}

/** Is the stretch from cell a to cell b one of the placed words? */
export function findPlacement(search, a, b) {
  return (
    (search?.placements || []).find((p) => {
      const endR = p.across ? p.r : p.r + p.word.length - 1;
      const endC = p.across ? p.c + p.word.length - 1 : p.c;
      return (
        (a.r === p.r && a.c === p.c && b.r === endR && b.c === endC) ||
        (b.r === p.r && b.c === p.c && a.r === endR && a.c === endC)
      );
    }) || null
  );
}

/** The sentence with the word taken out. */
export function blankSentence(sentence, word) {
  const esc = String(word).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return String(sentence || '').replace(new RegExp(`\\b${esc}\\b`, 'i'), '_____');
}

function othersFrom(list, word, pick, rand, n = 3) {
  return shuffle(list.filter((w) => w.word !== word && pick(w)), rand).slice(0, n).map(pick);
}

/**
 * One vocabulary question.
 * type 'meaning': word + sentence → which meaning
 * type 'blank'  : sentence with a gap → which word
 * type 'recall' : meaning → which word
 */
export function vocabQuestion(type, item, list, rand) {
  if (type === 'meaning') {
    const options = shuffle([item.meaning, ...othersFrom(list, item.word, (w) => w.meaning, rand)], rand);
    return { type, word: item.word, prompt: `What does “${item.word}” mean?`, context: item.sentence, options, answer: item.meaning };
  }
  const options = shuffle([item.word, ...othersFrom(list, item.word, (w) => w.word, rand)], rand);
  if (type === 'blank') {
    return { type, word: item.word, prompt: 'Which word fits?', context: blankSentence(item.sentence, item.word), options, answer: item.word };
  }
  return { type, word: item.word, prompt: 'Which word means this?', context: item.meaning, options, answer: item.word };
}

export function vocabRound(type, list, seed) {
  const rand = seeded(`${seed}|${type}`);
  return list.map((item) => vocabQuestion(type, item, list, rand));
}

/** Friday: one question per word, the three kinds mixed. */
export function vocabTest(list, seed) {
  const rand = seeded(`${seed}|test`);
  const kinds = ['meaning', 'blank', 'recall'];
  return shuffle(list, rand).map((item, i) => vocabQuestion(kinds[i % 3], item, list, rand));
}

/** Marks Friday's vocabulary test. Same letter ladder as everything else. */
export function gradeVocab(questions, picked = {}) {
  const rows = questions.map((q, i) => ({
    word: q.word,
    type: q.type,
    chosen: picked[i] ?? null,
    correct: picked[i] === q.answer
  }));
  const right = rows.filter((r) => r.correct).length;
  const percent = percentFromFraction(right, rows.length);
  return { rows, right, total: rows.length, percent, letter: letterForPercent(percent) };
}
