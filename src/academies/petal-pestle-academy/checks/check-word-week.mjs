// ---------------------------------------------------------------------------
// check-word-week — Spelling & Vocabulary in Lamar's format (Sept 24 2026).
//
// Run from the learningos folder:
//     node src/academies/petal-pestle-academy/checks/check-word-week.mjs
//     node src/academies/petal-pestle-academy/checks/check-word-week.mjs --self-test
//
// ---- WHAT IT ASSERTS ----
//  1. EVERY WORD IS READY — all 320 spelling words have 3 different
//     misspellings, none of them the word itself and none a word that appears
//     anywhere in her lessons (a real word would teach the wrong thing); all 320
//     vocabulary words have a meaning and a short sentence that contains them.
//  2. FROZEN ON MONDAY — a lesson read or a test sat during the week never
//     changes that week's lists.
//  3. WHAT CARRIES — right on a Friday test: gone. Missed: carried, first in
//     line. Never tested: all carried. Topped up to ten. Both lists. A daily
//     activity never counts as a test; a vocabulary test never counts for
//     spelling.
//  4. TODAY'S TASK — Lamar's rule: the earliest weekday not done up to today,
//     marked catch-up; Friday is done only by the test; weekends have none.
//  5. THE ACTIVITIES — four spellings with one right; gaps that are neither
//     none nor the whole word; a word search that really contains every word;
//     vocabulary questions with four different choices and the answer among
//     them; a blank that really removes the word; a Friday test of ten, one per
//     word, three kinds mixed.
//  6. THE DAY AND THE SCREENS — Language Arts 45 minutes then Spelling &
//     Vocabulary 15, her day no longer; the block opens the word screen through
//     the Morning Circle reminder; the route exists; Language Arts no longer
//     offers the words; the store saves activities and vocabulary tests; the
//     spelling test refuses to run without speech; the Reading note no longer
//     says Khan.
//  7. GRADES — a daily activity never reaches a grade; a vocabulary test
//     reaches Language Arts as its own quarter grade; spelling stays spelling.
//
// --self-test puts each bug back in (in a temporary copy of the real source)
// and fails if this check does not catch it.
// ---------------------------------------------------------------------------

import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { tmpdir } from 'node:os';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const SELF_TEST = process.argv.includes('--self-test');

const SRC = {
  week: 'lib/wordWeek.js',
  practice: 'data/words/wordPractice.js',
  schedule: 'config/schedule.js',
  links: 'lib/blockLinks.js',
  gradebook: 'lib/gradebook.js',
  today: 'components/Schedule/TodayView.jsx',
  school: 'screens/HerSchool/HerSchool.jsx',
  store: 'store/useAppStore.js',
  view: 'components/Assess/WordWeekView.jsx',
  study: 'data/words/wordStudy.js'
};
const read = (rel) => readFileSync(join(ROOT, rel), 'utf8');

let tmp = null;
let n = 0;
async function loadModule(rel, source) {
  if (source == null) return import(pathToFileURL(join(ROOT, rel)).href + `?v=${n++}`);
  tmp = tmp || mkdtempSync(join(tmpdir(), 'pp-words-'));
  const dir = dirname(join(ROOT, rel));
  const fixed = source.replace(/from\s+'(\.{1,2}\/[^']+)'/g, (_, p) => `from '${pathToFileURL(resolve(dir, p)).href}'`);
  const file = join(tmp, `m${n++}.js`);
  writeFileSync(file, fixed);
  return import(pathToFileURL(file).href);
}

const { WORD_STUDY_WEEKS } = await import(pathToFileURL(join(ROOT, 'data/words/wordStudy.js')).href);
const { ALL_LESSONS, lessonById } = await import(pathToFileURL(join(ROOT, 'data/lessons/appCourses.js')).href);

// Every word that appears anywhere in her lessons: a misspelling must not be one.
const CORPUS = new Set();
(function walk(x) {
  if (typeof x === 'string') x.toLowerCase().split(/[^a-z']+/).forEach((w) => w && CORPUS.add(w));
  else if (Array.isArray(x)) x.forEach(walk);
  else if (x && typeof x === 'object') Object.values(x).forEach(walk);
})(ALL_LESSONS);

// British spellings with an American form she should see instead.
const BRITISH = /\b(\w*vapour\w*|mould\w*|defence\w*|\w*tumour\w*|standardis\w*|recognis\w*|organis\w*|\w*colour\w*|favourite|behaviour|neighbour\w*|flavour\w*|harbour\w*|odour\w*|labour\w*|centimetre\w*|millimetre\w*|metres?|litres?|centre\w*|fibre\w*|towards|grey\w*|travell\w*|practise\w*|analys\w*|aluminium)\b/i;

const at = (y, m, d) => new Date(y, m - 1, d, 12, 0);
const MON = at(2026, 9, 21);
const TUE = at(2026, 9, 22);
const WED = at(2026, 9, 23);
const THU = at(2026, 9, 24);
const FRI = at(2026, 9, 25);
const SAT = at(2026, 9, 26);
const NEXT_MON = at(2026, 9, 28);

function run(ctx) {
  const out = [];
  const fail = (m) => out.push(m);
  const W = ctx.week;
  const P = ctx.practice;

  // 0. A SCHOOL SPELLING LIST, IN AMERICAN SPELLING (Sept 24 2026)
  // Gigi: "the correct spelling words that she would learn in school", 3rd
  // grade, and vocabulary kept but spelled the American way.
  const YEAR = ctx.study.WORD_STUDY_WEEKS;
  const vocabWords = new Set(YEAR.flatMap((w) => w.vocabulary.map((v) => v.word.toLowerCase())));
  const seen = new Set();
  for (const wk of YEAR) {
    if (!String(wk.pattern || '').trim()) fail(`spelling week Q${wk.quarter} W${wk.n} has no spelling pattern`);
    for (const s of wk.spelling) {
      const w = s.word.toLowerCase();
      if (!/^[a-z]+$/.test(w)) fail(`spelling "${s.word}" is not letters only (the test says it with no sentence, and the word search drops anything else)`);
      if (vocabWords.has(w)) fail(`"${s.word}" is on both the spelling and the vocabulary list`);
      if (seen.has(w)) fail(`spelling "${s.word}" comes twice in the year`);
      seen.add(w);
    }
    for (const v of wk.vocabulary) {
      const card = ctx.practice.VOCABULARY_CARDS[v.word] || {};
      const gloss = (lessonById(v.from)?.glossary || []).find((x) => x.word.toLowerCase() === v.word.toLowerCase());
      const shown = [v.word, card.meaning || gloss?.plain || '', card.sentence || ''].join(' ');
      const brit = shown.match(BRITISH);
      if (brit) fail(`vocabulary "${v.word}" shows the British spelling "${brit[0]}"`);
    }
  }

  // 1. EVERY WORD IS READY
  for (const wk of YEAR) {
    for (const s of wk.spelling) {
      const m = P.MISSPELLINGS[s.word] || [];
      if (m.length !== 3 || new Set(m).size !== 3) fail(`spelling "${s.word}" does not have 3 different misspellings`);
      for (const x of m) {
        if (x.toLowerCase() === s.word.toLowerCase()) fail(`"${s.word}" lists itself as a misspelling`);
        else if (CORPUS.has(x.toLowerCase())) fail(`"${x}" (a misspelling of ${s.word}) is a real word in her lessons`);
      }
    }
    for (const v of wk.vocabulary) {
      const card = P.VOCABULARY_CARDS[v.word];
      // The meaning the screen will show: the card's, or the lesson glossary's.
      const gloss = (lessonById(v.from)?.glossary || []).find((x) => x.word.toLowerCase() === v.word.toLowerCase());
      const extra = { meaning: card?.meaning || gloss?.plain || null };
      if (!card || !card.sentence) fail(`vocabulary "${v.word}" has no sentence`);
      else {
        if (W.blankSentence(card.sentence, v.word) === card.sentence) fail(`the sentence for "${v.word}" does not contain it`);
        if (card.sentence.split(/\s+/).length > 14) fail(`the sentence for "${v.word}" is over 14 words`);
      }
      if (!extra.meaning) fail(`vocabulary "${v.word}" has no meaning`);
    }
  }

  // 2. FROZEN ON MONDAY
  const reads = { 'hb-m1-01': { lessonId: 'hb-m1-01', firstReadAt: '2026-08-20T12:00:00Z' } };
  const monWeek = W.wordWeek({ date: MON, lessonReads: reads, results: [] });
  // Two whole weeks of lessons read on the Tuesday: a list worked out from
  // today's reads would jump two weeks ahead.
  const midReads = { ...reads };
  for (const l of ctx.readThrough(3)) if (!midReads[l]) midReads[l] = { lessonId: l, firstReadAt: '2026-09-22T15:00:00Z' };
  const midResults = [{ kind: 'spelling', listId: monWeek.spelling.listId, dayKey: '2026-09-23', rows: monWeek.spelling.list.map((w) => ({ word: w.word, correct: true })) }];
  const wedWeek = W.wordWeek({ date: WED, lessonReads: midReads, results: midResults });
  for (const skill of ['spelling', 'vocabulary']) {
    const a = monWeek[skill].list.map((w) => w.word).join(',');
    const b = wedWeek[skill].list.map((w) => w.word).join(',');
    if (a !== b || monWeek[skill].listId !== wedWeek[skill].listId) fail(`the ${skill} list changed in the middle of the week`);
  }
  if (monWeek.weekOf !== '2026-09-21' || W.mondayOf(SAT) !== '2026-09-21' || W.mondayOf(NEXT_MON) !== '2026-09-28') fail('the word week does not start on Monday');

  // 3. WHAT CARRIES
  const wk1 = WORD_STUDY_WEEKS.find((w) => w.quarter === 1 && w.n === 1);
  const allWk1 = (list) => list.map((w) => w.word).join(',');
  const neverTested = W.listFor('spelling', ctx.readThrough(2), []);
  if (allWk1(neverTested.list) !== wk1.spelling.map((w) => w.word).join(',')) fail('a week never tested was not carried in full');
  const halfRight = [{ kind: 'spelling', listId: 'word-study-q1-w1', dayKey: '2026-09-11', rows: wk1.spelling.map((w, i) => ({ word: w.word, correct: i < 5 })) }];
  const afterHalf = W.listFor('spelling', ctx.readThrough(2), halfRight);
  const words = afterHalf.list.map((w) => w.word);
  if (words.length !== 10) fail(`the spelling list has ${words.length} words, not 10`);
  if (wk1.spelling.slice(0, 5).some((w) => words.includes(w.word))) fail('a word spelled right on a Friday test came back');
  if (wk1.spelling.slice(5).map((w) => w.word).join(',') !== words.slice(0, 5).join(',')) fail('missed words are not first in line');
  const activityOnly = [{ kind: 'word-activity', skill: 'spelling', task: 'thu', dayKey: '2026-09-11', rows: wk1.spelling.map((w) => ({ word: w.word, correct: true })) }];
  if (W.listFor('spelling', ctx.readThrough(2), activityOnly).list.length !== 10 || W.listFor('spelling', ctx.readThrough(2), activityOnly).list[0].word !== wk1.spelling[0].word) {
    fail('a daily activity counted as a Friday test');
  }
  const vocabRight = [{ kind: 'vocab-test', listId: 'vocab-q1-w1', dayKey: '2026-09-11', rows: wk1.vocabulary.map((w) => ({ word: w.word, correct: true })) }];
  if (W.listFor('vocabulary', ctx.readThrough(2), vocabRight).list.some((w) => wk1.vocabulary.some((v) => v.word === w.word))) fail('vocabulary words right on a test came back');
  if (W.listFor('spelling', ctx.readThrough(2), vocabRight).list[0].word !== wk1.spelling[0].word) fail('a vocabulary test counted for spelling');
  if (W.listFor('vocabulary', ctx.readThrough(2), []).list[0].word !== wk1.vocabulary[0].word) fail('vocabulary does not carry a week never tested');

  // 4. TODAY'S TASK
  const act = (task, skill = 'spelling') => ({ kind: 'word-activity', skill, task, weekOf: '2026-09-21', dayKey: '2026-09-21' });
  const t = (date, res, skill = 'spelling') => W.todaysTask(skill, date, res);
  if (t(MON, []).type !== 'read') fail('Monday is not "read the list"');
  if (t(WED, [act('mon')]).dayKey !== 'tue' || !t(WED, [act('mon')]).isCatchUp) fail('a missed Tuesday does not come back as catch-up');
  if (t(WED, [act('mon'), act('tue')]).type !== 'wordsearch') fail('Wednesday is not the word search');
  if (t(THU, [act('mon'), act('tue'), act('wed')]).type !== 'missing') fail('Thursday is not missing letters');
  const monToThu = ['mon', 'tue', 'wed', 'thu'].map((k) => act(k));
  if (t(FRI, monToThu).type !== 'test') fail('Friday is not the spelling test');
  if (t(FRI, [...monToThu, { kind: 'word-activity', skill: 'spelling', task: 'fri', weekOf: '2026-09-21' }]).type === 'done') fail('Friday was marked done without the test');
  if (t(FRI, [...monToThu, { kind: 'spelling', weekOf: '2026-09-21', listId: 'x', rows: [] }]).type !== 'done') fail('sitting the spelling test does not finish Friday');
  if (t(SAT, []).type !== 'weekend') fail('there is word work on a Saturday');
  if (t(MON, [], 'vocabulary').type !== 'read' || t(TUE, [act('mon', 'vocabulary')], 'vocabulary').type !== 'meaning') fail('the vocabulary days are out of order');
  if (t(TUE, [act('mon', 'spelling')], 'vocabulary').dayKey !== 'mon') fail('spelling work counted for vocabulary');

  // 5. THE ACTIVITIES
  const sList = monWeek.spelling.list;
  const vList = monWeek.vocabulary.list;
  for (const q of W.chooseRound(sList, 's')) {
    if (q.options.length !== 4 || new Set(q.options).size !== 4 || !q.options.includes(q.word)) fail(`"${q.word}": Tuesday does not offer four spellings with the right one among them`);
  }
  for (const w of sList) {
    const pat = W.missingPattern(w.word, w.misspellings);
    const gaps = [...pat].filter((c) => c === '_').length;
    if (gaps < 1 || gaps > Math.floor(w.word.length / 2)) fail(`"${w.word}" → "${pat}": Thursday hides ${gaps} letters`);
    if ([...pat].some((c, i) => c !== '_' && c !== w.word[i])) fail(`"${pat}" does not match "${w.word}"`);
  }
  const search = W.wordSearch(sList.map((w) => w.word), 'seed');
  if (!search) fail('the word search could not be built');
  else {
    for (const w of sList) {
      const up = w.word.toUpperCase();
      const p = search.placements.find((x) => x.word === up);
      if (!p) {
        fail(`"${w.word}" is not in the word search`);
        continue;
      }
      const read = [...up].map((_, k) => search.rows[p.across ? p.r : p.r + k][p.across ? p.c + k : p.c]).join('');
      if (read !== up) fail(`the word search says "${read}" where "${up}" should be`);
      const end = { r: p.across ? p.r : p.r + up.length - 1, c: p.across ? p.c + up.length - 1 : p.c };
      if (!W.findPlacement(search, { r: p.r, c: p.c }, end) || !W.findPlacement(search, end, { r: p.r, c: p.c })) fail(`tapping the ends of "${w.word}" does not find it`);
    }
  }
  for (const type of ['meaning', 'blank', 'recall']) {
    for (const q of W.vocabRound(type, vList, 'v')) {
      if (q.options.length !== 4 || new Set(q.options).size !== 4 || !q.options.includes(q.answer)) fail(`${type} "${q.word}": not four different choices with the answer among them`);
      if (type === 'blank' && new RegExp(`\\b${q.word}\\b`, 'i').test(q.context)) fail(`the blank for "${q.word}" still shows the word`);
    }
  }
  const test = W.vocabTest(vList, 'v');
  if (test.length !== vList.length || new Set(test.map((q) => q.word)).size !== vList.length) fail('the vocabulary test is not one question per word');
  if (new Set(test.map((q) => q.type)).size !== 3) fail('the vocabulary test does not mix the three kinds');
  const g = W.gradeVocab(test, Object.fromEntries(test.map((q, i) => [i, i < 7 ? q.answer : 'nope'])));
  if (g.right !== 7 || g.percent !== 70) fail(`grading 7 of 10 gave ${g.right} / ${g.percent}%`);

  // 6. THE DAY AND THE SCREENS
  const S = ctx.schedule;
  const writing = S.DEFAULT_SCHEDULE.find((b) => b.id === 'blk-writing');
  const wordsB = S.DEFAULT_SCHEDULE.find((b) => b.id === 'blk-words');
  if (!wordsB) fail('there is no Spelling & Vocabulary class on her day');
  else {
    if (writing.minutes + wordsB.minutes !== 60 || wordsB.minutes !== 15) fail('Language Arts and Spelling & Vocabulary no longer add up to her old 60 minutes');
    const [h, m] = writing.start.split(':').map(Number);
    const end = h * 60 + m + writing.minutes;
    const [h2, m2] = wordsB.start.split(':').map(Number);
    if (h2 * 60 + m2 !== end) fail('Spelling & Vocabulary does not start when Language Arts ends');
  }
  const reading = S.DEFAULT_SCHEDULE.find((b) => b.id === 'blk-reading');
  if (/khan/i.test(reading?.note || '')) fail('the Reading class note still says Khan (Dr. Marigold reads it out loud)');
  const target = ctx.links.resolveBlockTarget({ id: 'blk-words', subject: 'words' }, {}, [], [], new Date());
  if (!target || target.view !== 'wordWeek') fail('the Spelling & Vocabulary class does not open the word screen');
  if (!/view === 'wordWeek' && <WordWeekView/.test(ctx.src.school)) fail('her school has no route to the word screen');
  if (!/const wordStudy = null;/.test(ctx.src.today)) fail('Language Arts still offers the word study');
  if (!/todaysTask\('spelling', new Date\(\), spellingResults\)/.test(ctx.src.today)) fail('the Spelling & Vocabulary class does not show today’s tasks');
  if (!/onClick=\{\(\) =>\s*b\.id === CIRCLE_BLOCK_ID\s*\?[\s\S]{0,120}throughCircle\(b\.id/.test(ctx.src.today)) fail('opening a class skips the Morning Circle reminder');
  const actAction = (ctx.src.store.match(/async recordWordActivity\([\s\S]*?\n  \},\n/) || [''])[0];
  const vocAction = (ctx.src.store.match(/async recordVocabTest\([\s\S]*?\n  \},\n/) || [''])[0];
  if (!/await putSpellingResult\(row\)/.test(actAction)) fail('a finished word activity is never saved, so the day never moves on');
  if (/percent/.test(actAction)) fail('a daily word activity carries a percent and could reach a grade');
  if (!/await putSpellingResult\(row\)/.test(vocAction) || !/kind: 'vocab-test'/.test(vocAction)) fail('the vocabulary test is never saved');
  if (!/weekOf: meta\.weekOf \?\? null,/.test(ctx.src.store)) fail('the spelling test does not say which word week it closes');
  if (!/The spelling test needs this computer to say the words out loud/.test(ctx.src.view)) fail('the spelling test no longer refuses to run without speech');
  if (/saveActivity\('spelling', 'fri'/.test(ctx.src.view)) fail('Friday spelling is saved as an activity instead of a test');

  // 7. GRADES
  const G = ctx.gradebook;
  const base = { attempts: [], khanGrades: [], writingMarks: [] };
  const la = (rows) => G.getSubjectGrades({ ...base, spellingResults: rows }).find((s) => s.id === 'language-arts');
  const onlyActivity = la([{ kind: 'word-activity', percent: 10, quarter: 1, dayKey: '2026-09-21' }]);
  if (onlyActivity && onlyActivity.assessedCount > 0) fail('a daily word activity reached her grade');
  const vocab = la([{ kind: 'vocab-test', percent: 80, quarter: 1, dayKey: '2026-09-25' }]);
  if (!vocab || !vocab.assessments.some((a) => a.source === 'vocabulary-quarter' && a.percent === 80)) fail('a vocabulary test does not reach Language Arts');
  if (vocab && vocab.assessments.some((a) => a.source === 'spelling-quarter')) fail('a vocabulary test counted as spelling');
  const spell = la([{ kind: 'spelling', percent: 90, quarter: 1, dayKey: '2026-09-25' }, { percent: 70, quarter: 1, dayKey: '2026-09-11' }]);
  if (!spell || !spell.assessments.some((a) => a.source === 'spelling-quarter' && a.percent === 80)) fail('spelling tests (old and new) no longer average into one quarter grade');
  return out;
}

async function context(broken = {}) {
  const src = {};
  for (const [k, rel] of Object.entries(SRC)) src[k] = broken[k] ?? read(rel);
  const { WEEKS } = await import(pathToFileURL(join(ROOT, 'config/assessment.js')).href);
  const spine = WEEKS.herbalism || Object.values(WEEKS)[0];
  const readThrough = (week) => spine.slice(0, week - 1).flatMap((w) => w.lessons);
  return {
    src,
    week: await loadModule(SRC.week, broken.week),
    practice: await loadModule(SRC.practice, broken.practice),
    study: await loadModule(SRC.study, broken.study),
    schedule: await loadModule(SRC.schedule, broken.schedule),
    links: await loadModule(SRC.links, broken.links),
    gradebook: await loadModule(SRC.gradebook, broken.gradebook),
    readThrough
  };
}

const BUGS = [
  ['a misspelling that is a real word', 'practice', "black: ['blak', 'blaack', 'blakc'],", "black: ['blak', 'blaack', 'the'],"],
  ['a word with two misspellings', 'practice', "crab: ['krab', 'crabb', 'crabe'],", "crab: ['krab', 'crabb'],"],
  ['a week with no pattern', 'study', "pattern: 'Short a and short i',", "pattern: '',"],
  ['a contraction on the spelling list', 'study', "{ word: 'black' }", "{ word: 'can\\'t' }"],
  ['a vocabulary word on the spelling list', 'study', "{ word: 'pond' }", "{ word: 'fruit' }"],
  ['a spelling word twice', 'study', "{ word: 'crab' }", "{ word: 'black' }"],
  ['a British vocabulary word', 'study', "{ word: 'tumor', from: 'hb-m15-04' }", "{ word: 'tumour', from: 'hb-m15-04' }"],
  ['a British meaning', 'practice', "stratus: { meaning: 'A low flat gray sheet", "stratus: { meaning: 'A low flat grey sheet"],
  ['a British sentence', 'practice', "sentence: 'The kettle puts water vapor into the air.'", "sentence: 'The kettle puts water vapor into the air, and mould loves it.'"],
  ['a sentence without its word', 'practice', "embryo: { meaning: 'The tiny baby plant curled up inside a seed.', sentence: 'Split the bean and you can see the embryo inside.' },", "embryo: { meaning: 'The tiny baby plant curled up inside a seed.', sentence: 'Split the bean and look inside.' },"],
  ['a word with no meaning', 'practice', "root: { meaning: 'The part of a plant under the ground. It holds the plant in place and drinks water.',", "root: { meaning: null,"],
  ['list changes mid-week', 'week', '.filter((r) => r && r.firstReadAt && localKey(new Date(r.firstReadAt)) < weekOf)', '.filter((r) => r && r.firstReadAt)'],
  ['tests this week change the list', 'week', 'const before = (results || []).filter((r) => r && r.dayKey && r.dayKey < weekOf);', 'const before = results || [];'],
  ['week starts on Sunday', 'week', 'const shift = (d.getDay() + 6) % 7;', 'const shift = d.getDay();'],
  ['right words come back', 'week', 'if (correct.has(item.word.toLowerCase())) continue;\n      carried.push(', 'carried.push('],
  ['never-tested weeks dropped', 'week', 'for (let wk = 1; wk < week; wk += 1) {', 'for (let wk = week; wk < week; wk += 1) {'],
  ['activities count as tests', 'week', "if (skill === 'spelling') return r.kind === 'spelling' || r.kind == null;", "if (skill === 'spelling') return true;"],
  ['no catch-up', 'week', 'for (let i = 0; i <= upTo; i += 1) {', 'for (let i = upTo; i <= upTo; i += 1) {'],
  ['Friday done by an activity', 'week', "r.skill === skill && r.task !== 'fri').map((r) => r.task)", "r.skill === skill).map((r) => r.task)"],
  ['word work at the weekend', 'week', "return { 1: 'mon', 2: 'tue', 3: 'wed', 4: 'thu', 5: 'fri' }[date.getDay()] || null;", "return { 0: 'mon', 1: 'mon', 2: 'tue', 3: 'wed', 4: 'thu', 5: 'fri', 6: 'fri' }[date.getDay()] || null;"],
  ['Tuesday has three choices', 'week', "options: shuffle([w.word, ...(w.misspellings || []).slice(0, 3)], rand)", "options: shuffle([w.word, ...(w.misspellings || []).slice(0, 2)], rand)"],
  ['Thursday hides the whole word', 'week', 'if (hide.length > max) hide = hide.slice(0, max);', 'hide = letters;'],
  ['word search loses a word', 'week', 'for (const w of [...clean].sort((a, b) => b.length - a.length)) {', 'for (const w of [...clean].sort((a, b) => b.length - a.length).slice(1)) {'],
  ['blank keeps the word', 'week', "return String(sentence || '').replace(new RegExp(`\\\\b${esc}\\\\b`, 'i'), '_____');", "return String(sentence || '') + ' _____';"],
  ['test of one kind', 'week', "const kinds = ['meaning', 'blank', 'recall'];", "const kinds = ['recall'];"],
  ['no Spelling & Vocabulary class', 'schedule', "    id: 'blk-words',", "    id: 'blk-words-x',"],
  ['a longer day', 'schedule', "    minutes: 45,\n    kind: 'core',", "    minutes: 60,\n    kind: 'core',"],
  ['Reading note back to Khan', 'schedule', "note: 'Today’s reading lesson, then your book.'", "note: 'Khan Academy, then read anything she likes.'"],
  ['class opens nothing', 'links', "if (block?.id === 'blk-words') {", "if (block?.id === 'blk-words-x') {"],
  ['no route', 'school', "{view === 'wordWeek' && <WordWeekView onExit={() => navigate('today')} />}", ''],
  ['words still in Language Arts', 'today', 'const wordStudy = null;', 'const wordStudy = b.subject === \'writing\' ? { list: [1] } : null;'],
  ['activity never saved', 'store', "    await putSpellingResult(row);\n    set({ spellingResults: [...get().spellingResults, row] });\n    await get().addLedgerEntry(\n      makeEntry({ currency: 'petal', amount: PETALS.warmUp", "    set({ spellingResults: [...get().spellingResults, row] });\n    await get().addLedgerEntry(\n      makeEntry({ currency: 'petal', amount: PETALS.warmUp"],
  ['test shows the word without speech', 'view', 'The spelling test needs this computer to say the words out loud', 'Here are your words'],
  ['activity graded', 'gradebook', "        if (r?.kind && r.kind !== 'spelling') continue;\n", ''],
  ['vocabulary never graded', 'gradebook', "        if (r?.kind !== 'vocab-test' || !Number.isFinite(r?.percent)) continue;", "        if (true) continue;"]
];

const real = run(await context());
if (!SELF_TEST) {
  if (real.length) {
    real.forEach((f) => console.log(`FAIL  ${f}`));
    console.log(`\n${real.length} failed.`);
    process.exit(1);
  }
  console.log(`${WORD_STUDY_WEEKS.length} weeks · ${WORD_STUDY_WEEKS.length * 10} spelling words with 3 misspellings each · ${WORD_STUDY_WEEKS.length * 10} vocabulary words with a meaning and a sentence.`);
  console.log('Frozen on Monday, carry-over for both lists, Lamar’s five days, Friday tests graded, activities never graded.');
  console.log('NOT TESTED HERE: how the screens look, and whether her Chromebook speaks the words.');
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
  if (out.length) console.log(`caught  ${name}  →  ${out[0]}`);
  else {
    console.log(`MISSED  ${name}`);
    missed++;
  }
}
console.log(missed ? `\n${missed} of ${BUGS.length} bugs NOT caught.` : `\nAll ${BUGS.length} bugs caught.`);
process.exit(missed ? 1 : 0);
