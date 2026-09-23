// ---------------------------------------------------------------------------
// BUILDING AND GRADING A TEST.
//
// Two jobs live here and nothing else does: turn a bank of questions into a
// specific paper, and turn her answers into a band, a percentage and a list of
// lessons to go back to.
//
// ---- WHY THE PAPER IS BUILT, NOT STORED ----
//
// Every form is generated from the bank by rule. That is what makes a re-take
// mean something: attempt 2 gets mostly different questions about exactly the
// same ideas, so passing it is evidence she learned the material rather than
// evidence she remembers the paper.
//
// ---- WHY IT IS DETERMINISTIC ----
//
// The shuffle is seeded from the unit id and the attempt number, so the same
// attempt always produces the same paper. This matters more than it sounds:
// without it, a page refresh mid-test would silently deal her a new set of
// questions and throw away the ones she had already answered. It also means the
// checks can test a real paper rather than a random one.
//
// Math.random() is never called in this file. Nothing here should ever be a
// surprise twice.
// ---------------------------------------------------------------------------

import {
  QUARTER_TEST,
  RETAKE,
  bandFor,
  WEEKLY_TEST,
  weekById,
  weeksBefore,
  allWeeks,
  weekTestReady
} from '../config/assessment.js';
// v3.25 — was herbalismCourseBank.js, a file named after ONE course standing in
// for the whole app. That is why sixty written Science Lab questions could never
// appear in a weekly test. appBank.js is both courses; Herbalism's set through it
// is identical, by id, and check-delivery fails the build if that ever stops
// being true.
import { BANKS, itemsForLessons, bankItemById } from '../data/assessments/appBank.js';
import { QUARTER, APP_COURSES as PLAN_COURSES } from '../config/curriculumPlan.js';
import { courseById } from '../data/lessons/appCourses.js';
import { daysBetween } from './reviewQueue.js';

// ---------------------------------------------------------------------------
// A small, boring, repeatable random number generator.
// ---------------------------------------------------------------------------

function hashString(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** mulberry32. Small, fast, and identical on every computer. */
function seededRandom(seed) {
  let a = seed >>> 0;
  return function next() {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffled(list, rand) {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Drop anything she has already answered TODAY.
 *
 * FOUND BY simulate-year.mjs, not by reasoning. Forty simulated days threw up
 * three occasions where a question in the morning warm-up turned up again in
 * that afternoon's unit test. Two things go wrong at once when that happens,
 * and the second is worse than the first:
 *
 *   1. The warm-up stops being review of the whole course and becomes a
 *      rehearsal for the test that is coming.
 *   2. The SCORE IS INFLATED. She saw that exact question with its explanation
 *      twenty minutes earlier. The gradebook then records her as knowing
 *      something she was handed, and that number goes on a report card.
 *
 * The fallback matters: if excluding today's questions would leave too few to
 * fill the paper, the exclusion is dropped rather than serving a short test.
 * A ten-question test that quietly becomes an eight-question test changes what
 * every percentage in the record means, which is a bigger problem than the one
 * being avoided.
 */
function withoutToday(pool, answeredToday, need) {
  const ex = new Set(answeredToday || []);
  if (!ex.size) return pool;
  const kept = pool.filter((q) => !ex.has(q.id));
  return kept.length >= need ? kept : pool;
}

/**
 * Take `n` items, preferring ones she has never been asked — and when a repeat
 * is unavoidable, the one she saw LONGEST AGO.
 *
 * `alreadyAsked` arrives oldest first: attempt 1's questions, then attempt 2's.
 *
 * ---- WHY THE ORDER MATTERS, WHICH IS NOT OBVIOUS ----
 *
 * A four-lesson unit holds twenty questions. Two attempts of ten use every one
 * of them, so a third attempt MUST repeat something. The first version of this
 * shuffled the repeats at random, and simulate-year.mjs showed what that means
 * on a real calendar: on day 9 a third attempt came back with nine of the ten
 * questions she had sat two days earlier.
 *
 * She would have been re-marked on the paper she had just failed. That is the
 * exact short-term-memory measurement the two-day re-take rule exists to
 * prevent, arriving through a different door — and it would have looked like a
 * pass.
 *
 * Reaching for the oldest first means a third attempt goes back to attempt one
 * rather than re-serving attempt two. The gap is the whole point.
 *
 * Falling back to repeats at all is deliberate. A short paper would be worse:
 * ten questions quietly becoming eight changes what every percentage in the
 * record means, and nothing on screen would say so.
 */
function takePreferringUnseen(pool, n, alreadyAsked, rand) {
  const firstAskedAt = new Map();
  (alreadyAsked || []).forEach((id, i) => {
    if (!firstAskedAt.has(id)) firstAskedAt.set(id, i);
  });
  const fresh = shuffled(pool.filter((q) => !firstAskedAt.has(q.id)), rand);
  const repeats = pool
    .filter((q) => firstAskedAt.has(q.id))
    .sort((a, b) => firstAskedAt.get(a.id) - firstAskedAt.get(b.id));
  return [...fresh, ...repeats].slice(0, n);
}

// ---------------------------------------------------------------------------
// SHUFFLING THE CHOICES
// ---------------------------------------------------------------------------

/**
 * Deal one question's four choices in a different order.
 *
 * WHY THIS EXISTS. Writing sixty-five questions by hand put the right answer at
 * B twenty-three times and at D only three. check-assessment caught it. The
 * obvious fix was to go back and hand-balance the bank, and it would have been
 * the wrong fix: a fixed position per question means that once she has met a
 * question in three warm-ups she can answer it from the SHAPE of the screen
 * without reading anything. That is a real failure mode for spaced review,
 * where the whole point is meeting the same question again and again.
 *
 * So the position is not a property of the question at all. It is dealt fresh
 * per test attempt, and per day for a warm-up. Balancing the bank would have
 * fixed the symptom the check measured; this fixes the thing the check was
 * measuring it for.
 *
 * `origIndex[i]` maps a position on screen back to the position in the bank, so
 * everything downstream — grading, the record, the review boxes — keeps working
 * in the bank's own numbering and never has to know a shuffle happened.
 */
export function presentQuestion(q, seedKey) {
  if (!q) return null;
  const rand = seededRandom(hashString(`${seedKey}|${q.id}`));
  const origIndex = shuffled([0, 1, 2, 3], rand);
  return {
    ...q,
    choices: origIndex.map((i) => q.choices[i]),
    feedback: origIndex.map((i) => q.feedback[i]),
    answer: origIndex.indexOf(q.answer),
    origIndex
  };
}

// ---------------------------------------------------------------------------
// UNIT TESTS
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// WEEKLY TESTS — Day 4 of every week
// ---------------------------------------------------------------------------

/**
 * Eight questions: six from this week's three lessons, two from earlier weeks.
 *
 * This replaces buildUnitTest for every course on the week shape. Same engine
 * underneath — the same seeded shuffle, the same prefer-the-oldest repeat rule,
 * the same refusal to re-ask anything she answered in this morning's warm-up.
 * Only the boundary changed, from a curriculum unit to a calendar week.
 *
 * Week 1 has nothing before it, so its test is eight questions from week 1 and
 * the blueprint quietly adapts rather than serving a short paper — exactly as
 * the unit test does for unit 1.
 *
 * The interleaved two are the first thing anyone would cut to make the test
 * "fairer". They are why she still knows week 1 in March.
 */
export function buildWeeklyTest(weekId, { attempt = 1, alreadyAsked = [], answeredToday = [] } = {}) {
  const week = weekById(weekId);
  if (!week) return null;

  const rand = seededRandom(hashString(`${weekId}|attempt${attempt}`));
  const earlierLessons = weeksBefore(weekId).flatMap((w) => w.lessons);

  // ---- THE PAPER IS THE SIZE THE COURSE DECLARES (v3.34) ----
  //
  // v3.22 made weekly-test size a PER-COURSE number so a two-day course could
  // exist: "a two-lesson course sits a five-question paper, not the eight a
  // three-lesson week gets." curriculumPlan.js has carried
  // `weeklyTestQuestions: 5` for Social Studies ever since.
  //
  // THIS FUNCTION NEVER READ IT. It used the global eight, and the first
  // two-day week in the app got an eight-question paper drawn from two lessons
  // — more than three questions per lesson taught, which is the exact thing
  // check-curriculum-volume forbids one file away. The rule was declared in
  // config and enforced on the DECLARATION; nothing made the engine obey it.
  //
  // A rule the app must follow lives where a check can test it. It does now,
  // and check-assessment asserts the built paper against the declared number.
  const plan = PLAN_COURSES.find((c) => c.id === week.course);
  const total = plan?.weeklyTestQuestions ?? WEEKLY_TEST.total;

  // The earlier-weeks share scales with the paper rather than staying at two.
  // Two of eight is a quarter of the paper; two of five would be nearly half,
  // and a five-question test with two old questions is a three-question test
  // of this week's work.
  const wantEarlier = Math.min(
    WEEKLY_TEST.fromEarlierWeeks,
    Math.floor(total / 4),
    itemsForLessons(earlierLessons).length
  );
  const wantCurrent = total - wantEarlier;

  const currentPool = withoutToday(itemsForLessons(week.lessons), answeredToday, wantCurrent);
  const earlierPool = withoutToday(itemsForLessons(earlierLessons), answeredToday, wantEarlier);

  const current = takePreferringUnseen(currentPool, wantCurrent, alreadyAsked, rand);
  const earlier = takePreferringUnseen(earlierPool, wantEarlier, alreadyAsked, rand);

  // Mixed, not "six new then two old". A block of old questions at the end reads
  // as a bonus round and gets answered carelessly.
  const questions = shuffled([...current, ...earlier], rand);

  return {
    kind: 'weekly',
    testId: weekId,
    attempt,
    title: `Week ${week.n} · ${week.title}`,
    minutes: WEEKLY_TEST.minutes,
    questionIds: questions.map((q) => q.id),
    interleavedIds: earlier.map((q) => q.id),
    restAfter: null
  };
}

// ---------------------------------------------------------------------------
// QUARTERLY TESTS
// ---------------------------------------------------------------------------

/**
 * Twenty-four questions, cumulative across the whole year so far.
 *
 * Half from the quarter just finished, half from everything before it. In
 * Quarter 1 there is nothing before it, so all twenty-four come from Q1.
 *
 * It offers a stop at the halfway mark. Twenty-four questions is long for a
 * nine-year-old and a tired second half measures tiredness.
 */
export function buildQuarterTest(
  quarterRef,
  { attempt = 1, alreadyAsked = [], answeredToday = [] } = {}
) {
  // quarterRef is 'herbalism-q1' — the course id and the quarter number.
  const m = /^(.+)-q(\d+)$/.exec(String(quarterRef));
  if (!m) return null;
  const [, courseId, qStr] = m;
  const quarter = Number(qStr);

  const weeks = allWeeks().filter((w) => w.course === courseId && w.quarter === quarter);
  if (!weeks.length) return null;

  const rand = seededRandom(hashString(`${quarterRef}|quarter|attempt${attempt}`));
  const thisQuarterLessons = weeks.flatMap((w) => w.lessons);

  // Everything taught earlier IN THIS COURSE, in any earlier quarter.
  const earlierLessons = allWeeks()
    .filter((w) => w.course === courseId && w.quarter < quarter)
    .flatMap((w) => w.lessons);

  const wantEarlier = Math.min(
    Math.round(QUARTER_TEST.total * (1 - QUARTER_TEST.fromThisQuarterShare)),
    itemsForLessons(earlierLessons).length
  );
  const wantThis = Math.min(
    QUARTER_TEST.total - wantEarlier,
    itemsForLessons(thisQuarterLessons).length
  );

  const thisPool = withoutToday(itemsForLessons(thisQuarterLessons), answeredToday, wantThis);
  const earlierPool = withoutToday(itemsForLessons(earlierLessons), answeredToday, wantEarlier);

  const thisQ = takePreferringUnseen(thisPool, wantThis, alreadyAsked, rand);
  const earlier = takePreferringUnseen(earlierPool, wantEarlier, alreadyAsked, rand);
  const questions = shuffled([...thisQ, ...earlier], rand);

  return {
    kind: 'quarter',
    testId: `${quarterRef}-final`,
    attempt,
    title: `Quarter Test · ${labelForQuarter(quarterRef)}`,
    minutes: QUARTER_TEST.minutes,
    questionIds: questions.map((q) => q.id),
    interleavedIds: earlier.map((q) => q.id),
    restAfter: QUARTER_TEST.restAfter
  };
}

function labelForQuarter(quarterRef) {
  const m = /^(.+)-q(\d+)$/.exec(String(quarterRef));
  if (!m) return quarterRef;
  const [, courseId, q] = m;
  // v3.28 — this used to be `courseId === 'herbalism' ? 'Herbalism & Botany' : courseId`,
  // so the moment a second course sat a quarter exam the paper called itself
  // "sciencelab, Quarter 1" on a nine-year-old's screen. A raw id is a thing
  // she should never see. check-delivery fails the build if this ever hands one
  // back again.
  const nice = courseById(courseId)?.label || courseId;
  return `${nice}, Quarter ${q}`;
}

// ---------------------------------------------------------------------------
// GRADING
// ---------------------------------------------------------------------------

/**
 * Grade a completed paper.
 *
 * Returns the percentage AND the band AND the lessons to revisit. The lessons
 * are the part that matters: a score with nothing to do about it is just a
 * label, and the whole point of a unit test is that it tells her where to go
 * back to.
 */
export function gradeTest(form, responses) {
  const rows = (form.questionIds || []).map((qid) => {
    const q = bankItemById(qid);
    const chosen = responses?.[qid];
    const answered = chosen !== undefined && chosen !== null;
    const correct = answered && chosen === q?.answer;
    return {
      questionId: qid,
      lesson: q?.lesson || null,
      prompt: q?.prompt || '',
      chosen: answered ? chosen : null,
      answer: q?.answer ?? null,
      correct,
      // An unanswered question is a wrong one for the score, and flagged
      // separately in the record. "She ran out of time" and "she did not know
      // it" are different facts and a parent should be able to tell them apart.
      skipped: !answered
    };
  });

  const total = rows.length || 1;
  const right = rows.filter((r) => r.correct).length;
  const fraction = right / total;
  const band = bandFor(fraction);

  // Lessons ranked by how many questions from them she missed. A lesson she
  // missed three questions from is the one to re-read first.
  const missCount = {};
  for (const r of rows) {
    if (!r.correct && r.lesson) missCount[r.lesson] = (missCount[r.lesson] || 0) + 1;
  }
  const revisit = Object.entries(missCount)
    .sort((a, b) => b[1] - a[1])
    .map(([lesson, misses]) => ({ lesson, misses }));

  return {
    rows,
    right,
    total,
    fraction,
    percent: Math.round(fraction * 100),
    band,
    revisit,
    missedQuestionIds: rows.filter((r) => !r.correct).map((r) => r.questionId),
    correctQuestionIds: rows.filter((r) => r.correct).map((r) => r.questionId)
  };
}

// ---------------------------------------------------------------------------
// RE-TAKES
// ---------------------------------------------------------------------------

/**
 * May she re-take this test today?
 *
 * Two days must pass. This will read as harsh and it is the opposite.
 *
 * A re-take twenty minutes after a fail measures what is still echoing in
 * short-term memory. She would very likely pass, the record would say she knew
 * it, and in three weeks it would be gone — with nobody aware, because the
 * gradebook said she was fine. Two days later, after re-reading, a pass means
 * something held.
 */
export function retakeStatus(attempts, todayKey) {
  const list = attempts || [];
  if (!list.length) return { allowed: true, reason: null, attemptNumber: 1 };

  const best = list.reduce((a, b) => (b.fraction > a.fraction ? b : a));
  const latest = list[list.length - 1];

  if (best.fraction >= 0.9) {
    return {
      allowed: false,
      reason: 'She has this one. Re-taking a test she passed well takes time away from new work.',
      attemptNumber: list.length + 1,
      done: true
    };
  }
  if (list.length >= RETAKE.maxAttempts) {
    return {
      allowed: false,
      reason: `Three attempts is the limit. A fourth is not a measurement any more — it is worth sitting down with her instead.`,
      attemptNumber: list.length + 1
    };
  }
  const waited = daysBetween(latest.dayKey, todayKey);
  if (waited < RETAKE.minDaysBetween) {
    const left = RETAKE.minDaysBetween - waited;
    return {
      allowed: false,
      reason:
        `Re-takes wait ${RETAKE.minDaysBetween} days. ${left === 1 ? 'One more day' : `${left} more days`}. ` +
        `A test re-taken straight away measures what is still echoing, not what she has kept — and it would ` +
        `go in the record as though she knew it.`,
      attemptNumber: list.length + 1,
      availableOn: latest.dayKey,
      daysLeft: left
    };
  }
  return { allowed: true, reason: null, attemptNumber: list.length + 1 };
}

/** The attempt that counts: the most recent one, not the best one. */
export function officialAttempt(attempts) {
  const list = attempts || [];
  if (!list.length) return null;
  const latest = list[list.length - 1];
  return { ...latest, wasRetake: list.length > 1, attempts: list.length };
}

// ---------------------------------------------------------------------------
// WHAT IS UNLOCKED
// ---------------------------------------------------------------------------

/**
 * A quarterly test opens once every WEEKLY test in that quarter has been taken.
 *
 * Not "once she has been in the app for nine weeks", and not on a date. The exam
 * exists to check the quarter; offering it before the quarter is a trick
 * question with extra steps.
 */
export function quarterTestReady(quarterRef, attemptsByTest) {
  const m = /^(.+)-q(\d+)$/.exec(String(quarterRef));
  if (!m) return { ready: false, missing: [], unbuilt: 0 };
  const [, courseId, qStr] = m;
  const weeks = allWeeks().filter((w) => w.course === courseId && w.quarter === Number(qStr));
  const missing = weeks.filter((w) => !(attemptsByTest?.[w.id]?.length > 0));

  // ---- A QUARTER EXAM NEEDS THE WHOLE QUARTER TO EXIST (v3.25) ----
  //
  // This used to read "every REGISTERED week has been sat". That was the same
  // sentence as "every week of the quarter" for as long as every course in the
  // app was finished, and it stopped being the same sentence the moment a course
  // was registered mid-build.
  //
  // The Science Lab has two of its eight Quarter 1 weeks written. Under the old
  // rule its Quarter 1 exam — twenty-four questions, described on screen as
  // everything from all four modules mixed together — would have unlocked after
  // she sat two weekly tests, drawn every question from six lessons, and called
  // itself a quarter exam. A test that claims more than it covers is the same
  // fault as a check that claims more than it tests, on the child's side of the
  // screen.
  //
  // So the exam waits for the quarter to be BUILT as well as sat, and says which
  // it is waiting for.
  const planned = QUARTER.teachingWeeks;
  const unbuilt = Math.max(0, planned - weeks.length);
  return {
    ready: weeks.length > 0 && unbuilt === 0 && missing.length === 0,
    missing,
    unbuilt,
    built: weeks.length,
    planned
  };
}

/**
 * Every WEEK, with its state, in teaching order. Drives the course screen.
 *
 * Was `allUnits()` until v3.8. The shape of the returned object is unchanged
 * apart from the key — `week` where it used to say `unit` — so the Gradebook and
 * the course screen needed one rename each and no new plumbing.
 */
export function courseProgress({ lessonsRead, attemptsByTest, todayKey }) {
  return allWeeks().map((week) => {
    const ready = weekTestReady(week, lessonsRead || []);
    const attempts = attemptsByTest?.[week.id] || [];
    const official = officialAttempt(attempts);
    return {
      week,
      ...ready,
      attempts,
      official,
      retake: retakeStatus(attempts, todayKey),
      lessonsDone: week.lessons.filter((l) => (lessonsRead || []).includes(l)).length
    };
  });
}

export { bandFor };
