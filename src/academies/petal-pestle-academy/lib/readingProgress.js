// ---------------------------------------------------------------------------
// HER READING COURSE — WHICH PIECE IS NEXT, AND HOW SHE IS DOING.
//
// Gigi, Sept 24 2026: "The reading never changes to the next lesson after the
// questions are answered." And: "She's already completed all the Khan courses.
// Since there were no tests to grade she just moved along."
//
// ---- WHY IT NEVER MOVED ----
// The Reading block chose its reading from Khan's 2nd Grade Reading course, and
// moved on only when that Khan unit had a GRADE. Khan gives no tests there, so
// the grade could only come from a grown-up by hand, and her own answers are
// (rightly) never written as a Khan grade. So the block sat on Fairy Tales
// Retold, Unit 1, however much she did.
//
// ---- WHAT DECIDES IT NOW ----
// HER PROGRESS, NOT A CALENDAR AND NOT A KHAN GRADE (Gigi, Sept 23 2026). The
// course is laid out as a line of pieces, in order:
//
//   Module 1:  lesson 1 · lesson 2 · lesson 3 · TEST 1 · lesson 4 · 5 · 6 · TEST 2
//   Module 2 … Module 4, then the Quarter 1 test.
//
// What is next is the first piece in that line she has not done. Finishing a
// piece is what moves her on, the moment it is saved.
//
// ---- ONE PIECE A DAY, EXCEPT FRIDAY ----
// 25 minutes of the 60-minute block, then her book. Once today's piece is done
// the block says so and names the next one for tomorrow. Friday is catch-up
// (Gigi): she may keep going. The day of the week never CHANGES which piece is
// next; it only says how many she may do today and what the day is called.
//
// ---- A TEST ONLY ASKS FOR WHAT SHE WAS GIVEN ----
// A Thursday test comes after its week's three lessons in the line, so it can
// never open before them. If she is behind on Thursday, she gets the lesson.
//
// ---- HER TWO SCORES ----
//   LESSONS     — every lesson question, read-aloud allowed.
//   ON HER OWN  — every Thursday test and quarter test question. Tests have no
//                 read-aloud. BLANK (null), not zero, until she has sat one.
// Her reading-check attempts on Fairy Tales Retold (the same two passages as
// lessons 1 and 2) count as LESSONS: read-aloud was offered on them.
//
// ---- IT NEVER WRITES A KHAN GRADE ----
// Nothing here touches her Khan grades. check-reading-wiring fails if this
// file, the lesson screen or the store action ever calls the Khan grade writer.
// ---------------------------------------------------------------------------

import { READING_MODULES, READING_REGISTER } from '../data/reading/course/readingCourse.js';
import { READING_UNITS } from '../data/reading/ela2Unit1.js';
import { letterForPercent } from './khanGrade.js';

/** How her reading work is filed in the attempts table. */
export const READING_KINDS = {
  lesson: 'reading-lesson',
  test: 'reading-test',
  quarter: 'reading-quarter'
};
const LESSON_KINDS = [READING_KINDS.lesson, 'reading-check'];
const OWN_KINDS = [READING_KINDS.test, READING_KINDS.quarter];

export const READING_MINUTES = { lesson: 25, block: 60 };

// ---------------------------------------------------------------------------
// THE LINE
// ---------------------------------------------------------------------------

const PASSAGES = new Map();
const PASSAGE_QUESTIONS = new Map();
for (const u of READING_UNITS) {
  for (const p of u.passages || []) PASSAGES.set(p.id, p);
  for (const q of u.questions || []) {
    PASSAGE_QUESTIONS.set(q.passage, [...(PASSAGE_QUESTIONS.get(q.passage) || []), q]);
  }
}

/**
 * Every piece of the written course, in the order she does them.
 * `modules` is injectable so a check can hand in a broken course.
 */
export function readingLine(modules = READING_MODULES) {
  const line = [];
  const sorted = [...modules].sort((a, b) => a.module - b.module);
  for (const m of sorted) {
    for (const week of [...new Set(m.lessons.map((l) => l.week))].sort((a, b) => a - b)) {
      m.lessons
        .filter((l) => l.week === week)
        .sort((a, b) => a.day - b.day)
        .forEach((l) => line.push({ type: 'lesson', id: l.id, module: m.module, quarter: m.quarter, week, title: l.title }));
      m.tests
        .filter((t) => t.week === week)
        .forEach((t) => line.push({ type: 'test', id: t.id, module: m.module, quarter: m.quarter, week, title: t.title }));
    }
    if (m.quarterTest) {
      const q = m.quarterTest;
      line.push({ type: 'quarter', id: q.id, module: m.module, quarter: q.quarter, week: null, title: `Quarter ${q.quarter} Reading Test` });
    }
  }
  return line;
}

/**
 * The piece, laid out for the screen: passages on top, questions under them.
 * A reused lesson resolves to the passage she already knows, with its questions.
 */
export function buildReadingForm(pieceId, modules = READING_MODULES) {
  for (const m of modules) {
    const lesson = m.lessons.find((l) => l.id === pieceId);
    if (lesson) {
      if (lesson.reuses) {
        const p = PASSAGES.get(lesson.reuses);
        if (!p) return null;
        return form(m, 'lesson', lesson.id, lesson.title, true, [
          { id: p.id, title: p.title || lesson.title, text: p.text, questions: PASSAGE_QUESTIONS.get(p.id) || [] }
        ]);
      }
      return form(m, 'lesson', lesson.id, lesson.title, true, [
        { id: `${lesson.id}-p`, title: lesson.title, text: lesson.text, questions: lesson.questions || [] }
      ]);
    }
    const test = m.tests.find((t) => t.id === pieceId);
    if (test) {
      return form(m, 'test', test.id, test.title, false, [
        { id: `${test.id}-p`, title: test.title, text: test.text, questions: test.questions || [] }
      ]);
    }
    if (m.quarterTest && m.quarterTest.id === pieceId) {
      const q = m.quarterTest;
      return form(m, 'quarter', q.id, `Quarter ${q.quarter} Reading Test`, false, q.parts.map((p) => ({ ...p })));
    }
  }
  return null;
}

function form(m, type, id, title, readAloud, parts) {
  return {
    testId: id,
    type,
    kind: READING_KINDS[type],
    title,
    module: m.module,
    moduleTitle: m.title,
    book: m.book || null,
    // Gigi, Sept 23 2026: read-aloud on lessons; OFF on Thursday and quarter
    // tests. It is taken from the TYPE, not only from the data, so a test file
    // that forgot `readAloud: false` still gets no button.
    readAloud: type === 'lesson' ? readAloud : false,
    passages: parts.map((p) => ({ id: p.id, title: p.title, text: p.text })),
    questions: parts.flatMap((p) => (p.questions || []).map((q) => ({ ...q, passage: p.id })))
  };
}

// ---------------------------------------------------------------------------
// WHAT SHE HAS DONE
// ---------------------------------------------------------------------------

/**
 * The set of piece ids she has finished.
 * Her old reading-check attempts finish the lessons that reuse their passages.
 */
export function readingDone(attempts = [], modules = READING_MODULES) {
  const reuse = new Map();
  for (const m of modules) for (const l of m.lessons) if (l.reuses) reuse.set(l.reuses, l.id);
  const done = new Set();
  for (const a of attempts || []) {
    if (!a) continue;
    if (Object.values(READING_KINDS).includes(a.kind)) done.add(a.testId);
    if (a.kind === 'reading-check') {
      for (const r of a.rows || []) if (!r.skipped && reuse.has(r.passage)) done.add(reuse.get(r.passage));
    }
  }
  return done;
}

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function localKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/**
 * What her Reading block offers today.
 *
 * @returns {
 *   next:       the first piece not done (null when the written course is finished),
 *   canStart:   whether she may start it today,
 *   doneToday:  pieces finished today,
 *   dayName, isCatchUp, isTestDay,
 *   written:    "4 of 16 modules written"
 * }
 */
export function readingToday(attempts = [], date = new Date(), modules = READING_MODULES) {
  const line = readingLine(modules);
  const done = readingDone(attempts, modules);
  const next = line.find((p) => !done.has(p.id)) || null;
  const today = localKey(date);
  const doneToday = (attempts || []).filter(
    (a) => a && a.dayKey === today && Object.values(READING_KINDS).includes(a.kind)
  ).length;
  const dow = date.getDay();
  const isCatchUp = dow === 5;
  return {
    next,
    canStart: !!next && (isCatchUp || doneToday === 0),
    doneToday,
    dayName: DAY_NAMES[dow],
    isCatchUp,
    isTestDay: dow === 4,
    position: next ? line.indexOf(next) + 1 : line.length,
    of: line.length,
    written: `${READING_REGISTER.filter((r) => r.status === 'written').length} of ${READING_REGISTER.length} modules written`
  };
}

/** Khan's matching unit, offered as an OPTIONAL watch in Modules 1–3 only. */
export function khanWatchFor(piece, modules = READING_MODULES) {
  if (!piece) return null;
  const m = modules.find((x) => x.module === piece.module);
  return m && m.khanWatch && m.module <= 3 ? m.khanWatch : null;
}

// ---------------------------------------------------------------------------
// HER TWO SCORES
// ---------------------------------------------------------------------------

function pct(right, total) {
  return total ? Math.round((right / total) * 100) : null;
}

/**
 * { lessons: { right, total, percent, letter }, own: {…} | null }
 * `own` is null until she has sat a test. Null, never zero.
 */
export function readingScores(attempts = []) {
  let lr = 0;
  let lt = 0;
  let or = 0;
  let ot = 0;
  let tests = 0;
  for (const a of attempts || []) {
    if (!a) continue;
    if (LESSON_KINDS.includes(a.kind)) {
      if (a.kind === 'reading-check' && !String(a.testId).startsWith('read-ela2-')) continue;
      lr += a.right || 0;
      lt += a.total || 0;
    } else if (OWN_KINDS.includes(a.kind)) {
      or += a.right || 0;
      ot += a.total || 0;
      tests++;
    }
  }
  const lp = pct(lr, lt);
  const op = pct(or, ot);
  return {
    lessons: lt ? { right: lr, total: lt, percent: lp, letter: letterForPercent(lp) } : null,
    own: tests && ot ? { right: or, total: ot, percent: op, letter: letterForPercent(op), tests } : null
  };
}
