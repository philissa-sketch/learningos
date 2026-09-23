// ---------------------------------------------------------------------------
// HOW SHE IS DOING IN EACH SUBJECT. (v3.95, Aug 29 2026.)
//
// Gigi: "The long list of randomness in the Test tab under Gradebook is
// confusing. I want to open one place and see how she is doing in each
// subject."
//
// ---- WHAT WAS ACTUALLY WRONG ----
//
// The Gradebook was written for Herbalism and three courses were added around
// it. One bug, repeated four times in one file:
//
//   · the Tests table called allWeeks() — 104 weeks across FOUR courses — and
//     printed every one under a heading reading "Herbalism · Quarter 1", with
//     no column saying which course a row belonged to. Two courses both
//     printed "Q1 Week 1". She had sat 11 tests and scrolled 104 rows.
//   · the practice gate filtered HERBALISM_Q1, so 23 lessons read could only
//     ever show the Herbalism ones.
//   · lessonLabel() searched HERBALISM_Q1, so every Science Lab, Social
//     Studies and Human Body question printed a raw id — `sl-m2-04`.
//   · the exam rows were hardcoded to `herbalism-q1-final` and `q2-final`,
//     while assessmentEngine.js line 317 generates `${course}-q${n}-final` for
//     every course and every quarter. FOURTEEN possible exam results had
//     nowhere on the screen to appear.
//
// Every part needed to fix it already existed. `appCourses.js` has exported
// ALL_LESSONS and lessonById across all four courses since v3.25; five other
// files import it. The Gradebook was the one screen never wired to it.
//
// ---- WHY THIS IS A LIB AND NOT COMPUTED IN THE PANEL ----
//
// Lamar's app states the reason and it is the right one: "A store action
// cannot be called from a check; a pure function can." `check-gradebook`
// calls getSubjectGrades() with built data and asserts the shape. A number
// worked out inside JSX can only be tested by reading the JSX, and this
// project has been bitten three times by a check that read text instead of
// asking the code.
//
// So the panel renders. It does not calculate.
// ---------------------------------------------------------------------------

import { APP_COURSES } from '../data/lessons/appCourses.js';
import { allWeeks, RETAKE } from '../config/assessment.js';
import { officialAttempt } from './assessmentEngine.js';
import { KHAN_LETTER_BANDS, letterForPercent } from './khanGrade.js';
import { gradePiece } from '../data/writing/writingPieces.js';
import { SCHOOL_YEAR, periodFor } from '../config/calendar.js';

/**
 * The four teaching quarters, derived from the calendar rather than typed.
 *
 * SCHOOL_YEAR.periods also holds `summer`, which is a real term and not a
 * quarter. Work recorded in it is counted toward the subject and reported on
 * its own row — never silently folded into Q4, and never dropped.
 */
export const YEAR_QUARTERS = SCHOOL_YEAR.periods
  .filter((p) => /^q[1-4]$/.test(p.id))
  .map((p) => Number(p.id.slice(1)));

/**
 * ===========================================================================
 * THE FIVE SUBJECTS. FOUR ARE GENERATED; ONE IS NOT A COURSE.
 * ===========================================================================
 *
 * ⚠️ THERE IS NO MATHEMATICS CARD, AND THAT IS DELIBERATE. Gigi, Aug 29:
 * "Maths lives on the Khan grades tab and stays there." Khan maths rows carry
 * subject 'math' and are excluded here by name, not by being forgotten —
 * `check-gradebook` asserts the exclusion so a future hand cannot add it back
 * by tidying.
 *
 * The four course subjects come from APP_COURSES, so a fifth course added
 * tomorrow appears on this screen tomorrow with no edit here. That is the
 * whole failure this version exists to fix, and a hand-typed list would
 * reintroduce it on the first course added.
 */
export const GRADEBOOK_SUBJECTS = [
  ...APP_COURSES.map((c) => ({
    id: c.id,
    label: c.label,
    emoji: c.emoji,
    kind: 'course',
    /**
     * WHICH QUARTERS THIS COURSE WAS BUILT FOR — declared on the course, not
     * counted from its weeks.
     *
     * sciencelab is [1, 3] and social is [1, 2, 3]. A quarter a course was
     * never built to cover is NOT "not reached yet" — it is not coming, and
     * showing it greyed would promise work that does not exist. Lamar's rule
     * 3: "a wall of blank rows on day one reads as failure."
     */
    builtQuarters: [...(c.quarters || [])].sort((a, b) => a - b)
  })),
  {
    id: 'language-arts',
    label: 'Language Arts & Writing',
    emoji: '✍️',
    /**
     * Not a course. It has no weekly tests and never will — allWeeks() returns
     * exactly four courses and this is not one of them. Its grade is built
     * from the writing pieces this app sets and marks, and the spelling tests
     * it writes. ⚠️ NOT from Khan Grammar, which is graded on the Khan tab.
     */
    kind: 'blended',
    builtQuarters: [...YEAR_QUARTERS]
  }
];

/**
 * A letter to a percentage, taking the MIDDLE of the band and never the top.
 *
 * Lamar's `letterToPercent` in src/lib/gradeScale.js, mirrored exactly:
 * "taking the top would inflate every rubric-graded piece of work by up to
 * three points against the scored work it sits beside, all year, in one
 * direction."
 *
 * ⚠️ NOT `bandForGrade`, which already exists in khanGrade.js and takes the
 * BOTTOM of the band. That function answers a different question — which band
 * Azianna is shown — and using it here would deflate every letter-only Khan
 * row by the same three points in the other direction.
 *
 * The ladder itself is imported. There is one grading ladder in this app and
 * v3.75 is the version that made sure of it.
 */
export function percentForLetter(grade) {
  const i = KHAN_LETTER_BANDS.findIndex((b) => b.grade === grade);
  if (i < 0) return null;
  const min = KHAN_LETTER_BANDS[i].min;
  const max = i === 0 ? 100 : KHAN_LETTER_BANDS[i - 1].min - 1;
  return Math.round((min + max) / 2);
}

/** The quarter a dated record belongs to: 1-4, 'summer', or null if outside the year. */
export function quarterForDate(dayKey) {
  const p = periodFor(String(dayKey || '').slice(0, 10));
  if (!p) return null;
  return /^q[1-4]$/.test(p.id) ? Number(p.id.slice(1)) : p.id;
}

/** Weighted mean over `field`, or null when there is nothing. */
function weightedPercent(list, field = 'percent') {
  const rows = (list || []).filter((r) => Number.isFinite(r[field]) && r.weight > 0);
  if (!rows.length) return null;
  const w = rows.reduce((n, r) => n + r.weight, 0);
  return Math.round(rows.reduce((n, r) => n + r[field] * r.weight, 0) / w);
}

/**
 * ===========================================================================
 * HER BEST ATTEMPT, ALONGSIDE HER LATEST. (v3.95, Gigi's call.)
 * ===========================================================================
 *
 * ⚠️ THE LATEST IS STILL THE HEADLINE AND STILL THE RECORD. This adds a
 * column; it does not replace one, and it hides no re-take. The screen's own
 * rule stands — "a re-take that is hidden is a record nobody can trust."
 *
 * WHY IT WAS ADDED. Read off her real record on Aug 29: on Aug 26 she sat FOUR
 * assessments and scored 75, 63, 60, 50 in that order; on Aug 28 she sat THREE
 * and scored 38, 38, 38 — three out of eight, three times. Where she re-took on
 * a lighter day she went UP (Social Studies 40 → 60, the reading check 25 →
 * 75). Every drop landed on a heavy day.
 *
 * So the latest attempt is the honest record AND, on those two days, the
 * reading of a tired child rather than of what she knows. Both numbers are
 * true and they answer different questions. Showing only one of them was
 * losing the second question.
 */
function bestAttempt(list) {
  const scored = (list || []).filter((a) => Number.isFinite(a.percent));
  if (!scored.length) return null;
  return scored.reduce((best, a) => (a.percent > best.percent ? a : best), scored[0]);
}

/**
 * ===========================================================================
 * EVERY GRADE IN THE APP, PER SUBJECT.
 * ===========================================================================
 *
 * Pure. Takes the state slices it needs and returns plain data, so
 * `check-gradebook` can build a record and assert what this screen would show
 * without rendering anything.
 *
 * ---- WEIGHTING: AN EXAM WEIGHS WHAT THE QUARTER WEIGHS ----
 *
 * Gigi's decision, Aug 29 2026, taken with the arithmetic in front of her.
 *
 * Lamar's app held the opposite rule first — "equal weight per assessment,
 * any other weighting is a judgement someone has to defend to a reviewer",
 * Aug 10 — and his parent overturned it on Aug 23 after it was measured: a
 * Quarterly Exam was 0.7% of Aerospace, and "a student could fail every
 * quarterly exam and finish with an A."
 *
 * Herbalism is 32 weekly tests and 4 quarter exams. Under equal weight an exam
 * is 1 of 36 — 2.8%. Weighted, it is 8 of 64 — 12.5%. Azianna could have
 * failed all four and finished with an A.
 *
 * So an exam's weight is THE NUMBER OF THAT QUARTER'S WEEKLY TESTS SHE
 * ACTUALLY SAT, minimum 1. Sat, not scheduled: an exam cannot outweigh work
 * that never happened. Everything else stays at weight 1, so no other
 * proportion moves.
 *
 * ---- AND EVERY SOURCE IS REPORTED SEPARATELY AS WELL AS BLENDED ----
 *
 * Lamar's rule 2 — "so the blend is never something she has to take on
 * trust." `sources` carries the count behind every card.
 */
export function getSubjectGrades({
  attempts = [],
  khanGrades = [],
  writingMarks = [],
  spellingResults = []
} = {}) {
  // Every attempt grouped by test id — the same shape the store's
  // attemptsByTest() returns, rebuilt here so this function needs no store.
  const byTest = {};
  for (const a of attempts) (byTest[a.testId] ||= []).push(a);
  for (const list of Object.values(byTest)) list.sort((x, y) => (x.at < y.at ? -1 : 1));

  const weeks = allWeeks();

  /**
   * =========================================================================
   * ⚠️ NO KHAN RESULT REACHES THIS SCREEN. ANY KHAN RESULT. (Gigi, Aug 29.)
   * =========================================================================
   *
   * Her words, correcting me mid-build: **"I asked for grades for the lessons
   * that the app creates on this screen. Kahn has its own tab."**
   *
   * The first cut of this file counted Khan GRAMMAR toward Language Arts &
   * Writing while keeping Khan MATHS off, on the reasoning that Language Arts
   * had app-owned work beside it and Maths did not. That was a distinction I
   * invented. Hers is simpler and it is the one that holds:
   *
   *   THIS SCREEN GRADES WORK THIS APP MADE. Khan is somebody else's
   *   curriculum, it is recorded on its own tab, and it is graded there.
   *
   * So the line is drawn by WHO WROTE THE WORK, not by which subject it lands
   * in — a rule that needs no exceptions and cannot drift. Weekly tests,
   * quarter exams, writing pieces and spelling are this app's. Khan units and
   * the Course Challenge are not.
   *
   * ⚠️ AND NOTHING IS STRANDED BY THIS. Khan grades have their own screen that
   * shows every one of them; they are not a grade nobody reads, which is the
   * failure Lamar's app was rebuilt to fix. `khanGrades` is still ACCEPTED as
   * an argument on purpose — so that a future hand adding it back has to walk
   * past this note and `check-gradebook`, which proves no Khan row of any
   * subject reaches any card.
   */

  return GRADEBOOK_SUBJECTS.map((subject) => {
    /** Every graded thing in this subject: { source, id, label, quarter, percent, weight }. */
    const assessments = [];

    if (subject.kind === 'course') {
      const courseWeeks = weeks.filter((w) => w.course === subject.id);

      // ---- weekly tests, weight 1 ----
      for (const w of courseWeeks) {
        const list = byTest[w.id] || [];
        const off = officialAttempt(list);
        if (!off || !Number.isFinite(off.percent)) continue;
        assessments.push({
          source: 'weekly-test',
          id: w.id,
          label: `Q${w.quarter} Week ${w.n} · ${w.title}`,
          quarter: w.quarter,
          percent: off.percent,
          percentBest: bestAttempt(list)?.percent ?? off.percent,
          attempts: list.length,
          weight: 1
        });
      }

      // ---- quarter exams, weight = weekly tests SAT that quarter ----
      for (const q of subject.builtQuarters) {
        const testId = `${subject.id}-q${q}-final`;
        const list = byTest[testId] || [];
        const off = officialAttempt(list);
        if (!off || !Number.isFinite(off.percent)) continue;
        const satThatQuarter = assessments.filter(
          (a) => a.source === 'weekly-test' && a.quarter === q
        ).length;
        assessments.push({
          source: 'quarter-exam',
          id: testId,
          label: `Quarter ${q} Exam`,
          quarter: q,
          percent: off.percent,
          percentBest: bestAttempt(list)?.percent ?? off.percent,
          attempts: list.length,
          weight: Math.max(1, satThatQuarter)
        });
      }
    } else {
      // ---- writing pieces, weight 1. The quarter is ON the mark. ----
      for (const m of writingMarks) {
        const graded = gradePiece(m.pieceId, m.marks);
        if (!graded || !Number.isFinite(graded.percent)) continue;
        assessments.push({
          source: 'writing-piece',
          id: m.markId,
          label: m.title || m.pieceId,
          quarter: Number(m.quarter) || quarterForDate(m.at),
          percent: graded.percent,
          // One mark, one record — there is no re-take of a marked piece.
          percentBest: graded.percent,
          attempts: 1,
          weight: 1
        });
      }

      /**
       * ---- spelling, COLLAPSED TO ONE GRADE PER QUARTER ----
       *
       * She sits a spelling test most Fridays. Counting all of them would make
       * a ten-word quiz the dominant assessment in this subject — Lamar's app
       * measured exactly this and found reflections at 64% of a subject grade,
       * and collapsed them for that reason. Four grades a year, proportionate
       * to a writing piece.
       *
       * Nothing is thrown away: every individual week is still in the spelling
       * record. This is the grade; that is the record.
       */
      const spellingByQuarter = new Map();
      for (const r of spellingResults) {
        if (!Number.isFinite(r?.percent)) continue;
        const q = Number(r.quarter) || quarterForDate(r.at || r.dayKey);
        if (!q) continue;
        const b = spellingByQuarter.get(q) || { q, total: 0, n: 0 };
        b.total += r.percent;
        b.n += 1;
        spellingByQuarter.set(q, b);
      }
      for (const b of spellingByQuarter.values()) {
        assessments.push({
          source: 'spelling-quarter',
          id: `spelling-q${b.q}`,
          label: `Spelling · Quarter ${b.q} (${b.n} test${b.n === 1 ? '' : 's'})`,
          quarter: b.q,
          percent: Math.round(b.total / b.n),
          // Already a quarter's average, so best and latest are the same number.
          percentBest: Math.round(b.total / b.n),
          attempts: b.n,
          weight: 1
        });
      }
    }

    const countOf = (s) => assessments.filter((a) => a.source === s).length;
    const sources = {
      weeklyTests: countOf('weekly-test'),
      quarterExams: countOf('quarter-exam'),
      writingPieces: countOf('writing-piece'),
      spellingQuarters: countOf('spelling-quarter')
    };

    /**
     * The quarter rows. Every quarter this subject was BUILT for gets one —
     * never a blank, never a zero.
     *
     * `of` is how many weekly tests that quarter holds, so a row can say
     * "3 of 8 sat". A blended subject has no scheduled count, so it reports
     * null and the panel says "N graded" instead of inventing a denominator.
     */
    const quarters = subject.builtQuarters.map((q) => {
      const inQ = assessments.filter((a) => a.quarter === q);
      const of =
        subject.kind === 'course'
          ? weeks.filter((w) => w.course === subject.id && w.quarter === q).length
          : null;
      const sat = subject.kind === 'course'
        ? inQ.filter((a) => a.source === 'weekly-test').length
        : inQ.length;
      const percent = weightedPercent(inQ);
      const percentBest = weightedPercent(inQ, 'percentBest');
      return {
        quarter: q,
        label: `Quarter ${q}`,
        of,
        sat,
        count: inQ.length,
        percent,
        letter: percent === null ? null : letterForPercent(percent),
        percentBest,
        letterBest: percentBest === null ? null : letterForPercent(percentBest),
        /** 'graded' — there is work. 'not-reached' — built, nothing sat yet. */
        state: percent === null ? 'not-reached' : 'graded'
      };
    });

    /**
     * Work recorded in the summer term, or outside the school year entirely.
     * It counts toward the subject and gets its own row rather than being
     * pushed into a quarter it did not happen in.
     */
    const outside = assessments.filter(
      (a) => a.quarter === null || !YEAR_QUARTERS.includes(a.quarter)
    );

    const percent = weightedPercent(assessments);
    const percentBest = weightedPercent(assessments, 'percentBest');

    return {
      id: subject.id,
      label: subject.label,
      emoji: subject.emoji,
      kind: subject.kind,
      builtQuarters: subject.builtQuarters,
      assessments,
      sources,
      assessedCount: assessments.length,
      percent,
      letter: percent === null ? null : letterForPercent(percent),
      percentBest,
      letterBest: percentBest === null ? null : letterForPercent(percentBest),
      quarters,
      outside,
      /**
       * Work that exists and reaches no grade on this screen, named so it
       * cannot be mistaken for work that is not there. Currently: her Khan
       * Reading & Vocabulary units, which are waiting for Reading to become
       * its own subject.
       */
      /**
       * ⚠️ WORK THIS APP MADE THAT REACHES NO SUBJECT GRADE.
       *
       * Only the reading check is in this position, and only because Reading
       * is not a subject yet. It is app-written work — `readingCheck.js` and
       * `ela2Unit1.js` — so unlike a Khan unit it has no other home to be
       * graded in, and it belongs on this screen the moment that card exists.
       *
       * ⚠️ Khan is NOT listed here. Khan work is not stranded: it has its own
       * tab and is graded there. Naming it as "not counted" would imply it
       * ought to be, which is the thing Gigi corrected.
       *
       * Her two attempts at `read-ela2-u1` — 25% then 75%, Aug 25 and 26 — are
       * visible in "Every attempt, question by question" and reach no subject.
       */
      notCounted:
        subject.id === 'language-arts'
          ? { readingChecks: (attempts || []).filter((a) => a.kind === 'reading-check').length }
          : null
    };
  });
}

/**
 * ===========================================================================
 * HOW MUCH SHE SAT IN ONE DAY. (v3.95, Gigi's call.)
 * ===========================================================================
 *
 * Gigi, Aug 29: "I don't want to overwhelm her. Her grades aren't doing so
 * well."
 *
 * ⚠️ THIS IS THE NUMBER THAT WOULD HAVE SAID SOMETHING FIRST, AND NOTHING WAS
 * COUNTING IT. Her record on Aug 29 held eleven assessments across ten days —
 * and they were not spread across ten days:
 *
 *     Aug 26   FOUR assessments   75, 63, 60, 50   (falling through the day)
 *     Aug 28   THREE assessments  38, 38, 38       (three out of eight, thrice)
 *
 * Every score she re-took on a LIGHT day went up — Social Studies 40 → 60, the
 * reading check 25 → 75. Every drop landed on a heavy one. The grades looked
 * like a child who did not know the work; the dates say a child who had sat
 * too much in one morning.
 *
 * A test score says how one morning went. THIS says how much was asked of her
 * that morning, which is the thing a grown-up can actually change.
 *
 * ⚠️ IT COUNTS EVERY ASSESSMENT, not just weekly tests — a reading check and a
 * spelling test cost her the same attention as a course test, and counting
 * only the ones that reach a grade would under-report the load by exactly the
 * things this app does not grade yet.
 */
export function testLoadByDay(attempts = [], { heavyAt = 3 } = {}) {
  const byDay = new Map();
  for (const a of attempts) {
    const day = String(a?.dayKey || a?.at || '').slice(0, 10);
    if (!day) continue;
    const row = byDay.get(day) || { day, count: 0, scores: [] };
    row.count += 1;
    if (Number.isFinite(a.percent)) row.scores.push(a.percent);
    byDay.set(day, row);
  }
  return [...byDay.values()]
    .map((r) => ({
      ...r,
      heavy: r.count >= heavyAt,
      /** Her lowest and highest that day — the spread a heavy day produces. */
      low: r.scores.length ? Math.min(...r.scores) : null,
      high: r.scores.length ? Math.max(...r.scores) : null
    }))
    .sort((a, b) => (a.day < b.day ? 1 : -1));
}

/**
 * How many attempts remain on a test before the app refuses another.
 *
 * ⚠️ READ FROM `RETAKE`, NEVER TYPED. The cap is 3 and the gap is 2 days, and
 * both are declared in config/assessment.js. A screen carrying its own copy of
 * a rule is how two answers to one question get onto her screen — v3.92, and
 * v3.78 and v3.84 before it. `check-gradebook` asserts this reads the config.
 *
 * Surfaced because she HAS hit the cap: Science Lab week 1 was sat three times,
 * 50 then 63 then 38. Whether a third attempt is a good idea is Gigi's call,
 * and she could not make it while nothing on screen said the third was allowed.
 */
export function retakeState(attemptCount) {
  const used = Number(attemptCount) || 0;
  return {
    used,
    cap: RETAKE.maxAttempts,
    left: Math.max(0, RETAKE.maxAttempts - used),
    atCap: used >= RETAKE.maxAttempts,
    minDaysBetween: RETAKE.minDaysBetween
  };
}

/** The one-line "what the number is made of", built from the counts. */
export function sourceSentence(sources) {
  const parts = [];
  const add = (n, one, many) => {
    if (n > 0) parts.push(`${n} ${n === 1 ? one : many}`);
  };
  add(sources.weeklyTests, 'test sat', 'tests sat');
  add(sources.quarterExams, 'quarter exam', 'quarter exams');
  add(sources.writingPieces, 'writing piece marked', 'writing pieces marked');
  add(sources.spellingQuarters, 'quarter of spelling', 'quarters of spelling');
  return parts.join(' · ');
}

export default getSubjectGrades;
