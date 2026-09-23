/* ---------------------------------------------------------------------------
 * THE ONE PLACE THAT BUILDS A KHAN GRADE ROW.
 *
 * ---- WHY THIS FILE EXISTS — v3.74 ----
 *
 * Gigi, Aug 23 2026: "When she is in her Today's Planner it is supposed to
 * connect her to the unit she is working on in Khan Academy, but it is a new
 * week and the links still have the same units connected."
 *
 * The session that diagnosed it wrote down: "It is not a bug — it is a missing
 * manual step nobody knew was load-bearing." THAT DIAGNOSIS WAS WRONG, and
 * acting on it would have put a hint on the Planner telling Gigi to do
 * something that does not work.
 *
 * `nextUnitFor(courseId, grades)` counts a unit as done only when a grade row
 * carries BOTH `courseId` and `unitN`:
 *
 *     .filter((g) => g && g.courseId === courseId && Number.isFinite(Number(g.unitN)))
 *
 * `addKhanGrade` stored `{ subject, unit, percent, at, note }`. It stored
 * NEITHER of those two fields, and no other code path in this app has ever
 * written a Khan grade. So the form saved "math · Geometry · 82%", the
 * advancement logic looked for "math2 · unit 8", and the two could never meet.
 *
 * ⚠️ RECORDING A GRADE DID NOT ADVANCE HER, AND NEVER HAD. Her record holding
 * zero grades hid it: with nothing entered, a broken writer and a working one
 * look identical from the Planner.
 *
 * ---- AND THE CHECK THAT WAS MEANT TO GUARD IT PASSED, GREEN ----
 *
 * check-khan-units §6c walks Unit 1 to 8 and then the Course Challenge, and it
 * did that by pushing grade objects IT BUILT ITSELF:
 *
 *     grades.push({ courseId: 'math2', unitN: i });
 *
 * A shape the app has never once produced. The check was testing
 * `nextUnitFor` in isolation and printing "advance one unit per grade", which
 * is a claim about the APP. Rule 4: a check must never claim more than it
 * tests. That check's own comment at §6b confesses to this exact failure one
 * section higher — "it asserted the block opens an exact unit and never once
 * asked WHICH" — and then it happened again, immediately below.
 *
 * ---- SO THE SHAPING MOVED OUT OF THE STORE ----
 *
 * Rule 11: a rule the app must follow lives in the ENGINE or a lib, where a
 * check can test it. `addKhanGrade` is a zustand action that writes to
 * IndexedDB; no check in Node can call it. This function is pure, so
 * `check-khan-advance` can put a grade through THE APP'S OWN WRITER and hand
 * the result straight to `nextUnitFor` — a round trip, not a rehearsal.
 *
 * check-khan-advance also asserts that the store still calls this and does not
 * go back to hand-building a row, because that is how the field went missing.
 *
 * ---- WHAT IT WILL NOT DO ----
 *
 * It will not guess a unit from free text. The pre-v3.20 grades were typed as
 * prose and matching them by string would quietly mark the WRONG unit
 * complete — a unit she never sat, marked done, on a record that becomes a
 * transcript. An unrecognised course or unit is refused with words, and the
 * old rows already on her record stay ignored exactly as they were.
 * ------------------------------------------------------------------------- */

import { KHAN_UNIT_COURSES, unitFor } from '../data/khan/khanUnits.js';
import { dayKeyOf } from './reviewQueue.js';

/* ---------------------------------------------------------------------------
 * LAMAR'S KHAN LADDER — v3.74, and it is HIS, read off HIS disk.
 *
 * Gigi, Aug 24: "I want the grading to be exactly like Lamar's."
 *
 * ⚠️ AND IT IS NOT THE LADDER THIS APP ALREADY CALLS LAMAR'S. `RUBRIC_BANDS`
 * in writingPieces.js is a twelve-band percent ladder — A 93, A- 90, B+ 87,
 * down to D- 60 — and its comment calls it "Lamar's +/- ladder". That is the
 * ladder his WRITING rubric uses. HIS KHAN GRADING IS A DIFFERENT THING, and
 * copying the writing ladder onto Khan would have been the wrong answer given
 * confidently.
 *
 * Read on disk in Lamar DOC/docs, twice, in two files that agree:
 *
 *   PROJECT_LOG.md — "a Mark Complete button that reveals an inline A-F grade
 *   picker (A/A-/B+/B/C/D/F, per the rubric worked out earlier: Mastered=A,
 *   Proficient=A-/B+, Familiar 90-99%=B, Familiar 70-89%=C, below 70%=D)"
 *
 *   PROJECT_PLAN.md — "an inline A-F grade the parent assigns based on what
 *   Khan Academy shows on screen after the exercise"
 *
 * ⚠️ THAT FOLDER NO LONGER EXISTS — Gigi deleted it Aug 26 2026, so the two
 * quotations above can no longer be re-checked against their source. They are
 * kept verbatim because that is what a citation is for, and because this whole
 * block is already marked SUPERSEDED below.
 *
 * ⚠️ AND HIS APP HAS MOVED PAST THEM ANYWAY. Checked against his running code
 * on Aug 26 2026: gradeScale.js takes a percentage or a fraction and derives
 * the letter. His own note calls the mastery-word route "three lossy steps,
 * done 151 times across the year, each one a chance to grade the same
 * performance two different ways in October and March." NOTHING IN HIS src/
 * MAPS Proficient OR Familiar TO A LETTER ANY MORE.
 *
 * So KHAN_MASTERY_GUIDE stays as a FALLBACK, for the screens where Khan shows a
 * word and no fraction — and it is no longer claimed to match what his app does
 * today. The fraction is the normal path in both apps now.
 *
 * ⚠️ SUPERSEDED THE SAME DAY BY THE BLOCK BELOW — KEPT, NOT DELETED.
 *
 * v3.74 concluded from those two quotes that Khan grading is A PICKER AND NOT
 * A PERCENT BOX, and that "the app never computes the letter". Gigi corrected
 * it within the hour: "Khan Academy scores with fractions. When the fraction
 * is entered by me the app turns it into percentages and letter grades."
 *
 * BOTH HALVES OF THAT REASONING WERE WRONG, AND FOR ONE REASON: the quotes
 * describe his Khan MISSION CARD, which grades a skill off a mastery word.
 * They say nothing about a unit test, which prints a fraction. A quote read
 * accurately can still be evidence for the wrong claim.
 *
 * The rule the app now follows: SHE TYPES THE FRACTION, THE APP DOES THE
 * ARITHMETIC. That is not the app inventing a number — she supplies both
 * numbers off Khan's screen and division is not a judgement. What the app
 * still must never do is produce a score with no input from her.
 *
 * The mastery-word mapping survives as the FALLBACK, for the skills that show
 * a word and no fraction. See KHAN_MASTERY_GUIDE below.
 * ------------------------------------------------------------------------- */

/* ---------------------------------------------------------------------------
 * ⚠️ CORRECTED v3.75 — THE DOCS ON LAMAR'S DISK ARE BEHIND HIS RUNNING APP.
 *
 * v3.74 read PROJECT_LOG.md and reported his report-card scale as five bands:
 * "A 90-100, B 80-89, C 70-79, D 60-69, F below 60". Gigi then sent a
 * SCREENSHOT OF THE ACTUAL REPORT CARD, which shows:
 *
 *      Mathematics            B    86% avg
 *      English Language Arts  A    93% avg
 *      Reading & Literature   A+   99%
 *      Grammar & Writing      B    86%
 *      Science                B-   82% avg
 *
 * A+ and B- do not exist on a five-band scale. Every one of those five points
 * fits the PLUS/MINUS ladder instead, and only that ladder: 86 is a B because
 * B+ starts at 87; 82 is a B- because B starts at 83.
 *
 * ⚠️ THE LESSON, AND IT IS THE PROJECT'S OWN RULE ARRIVING FROM A NEW
 * DIRECTION: "verify against the disk, not against what I tell you — and not
 * against the app's own comments either." A DOCUMENT ABOUT AN APP IS NOT THE
 * APP. Lamar's folder is docs only, no code, so the newest thing in it is
 * still older than the screen. v3.74 stated his scale as a fact, in a build
 * log, from a file — and the running app disagreed.
 *
 * SO THIS LADDER IS DERIVED FROM THE SCREEN, and its provenance says so.
 *
 * ⚠️ ONE BAND IS ASSUMED AND IS MARKED AS ASSUMED. The screenshot proves A+
 * exists and that 99 earns it. It does not say where A+ starts. 97 is the
 * ordinary threshold and it is what is used here, so it affects marks of 97,
 * 98 and 99 and nothing else. NOT CONFIRMED AGAINST LAMAR'S APP. Ask before
 * it reaches a transcript.
 * ------------------------------------------------------------------------- */

/**
 * ⚠️ `Number(null)` IS 0 AND `Number('')` IS 0, AND BOTH ARE FINITE.
 *
 * Every "is this a number?" test in this file used `Number.isFinite(Number(x))`
 * and every one of them was wrong in the same way: a missing mark scored 0,
 * which made an absent result an F, and made an ungraded unit drag a course
 * average down as though she had sat it and got nothing.
 *
 * Caught by check-khan-advance on its first run, three times over. §3.6's rule
 * about an unmarked rubric row — "an unmarked row is not a zero" — is the same
 * rule, and it has to be enforced by a guard rather than remembered.
 */
function isNum(v) {
  if (v === null || v === undefined || v === '') return false;
  return Number.isFinite(Number(v));
}

/* ---------------------------------------------------------------------------
 * THE TWO INSTRUMENTS — v3.76.
 *
 * Gigi, describing how Khan actually works: "The unit tests are what is being
 * graded by Khan Academy and the course challenge is the test after all the
 * units are completed."
 *
 * A unit test measures ONE unit. The Course Challenge is CUMULATIVE, over the
 * whole course, and Khan offers it separately — her 2nd Grade Math screenshot
 * shows it sitting under Unit 8 with its own "Resume Course challenge" link,
 * already in progress.
 *
 * They are not the same measurement and must never be added together:
 *
 *   · averaging a cumulative final in with eight unit tests counts the same
 *     material twice and quietly weights the whole course toward one sitting;
 *   · and a Course Challenge result landing on a unit row would mark a unit
 *     she never sat as DONE, which is the exact thing the pre-v3.20 free-text
 *     rows are refused for.
 *
 * So the kind is stored, and everything that walks units filters BY KIND
 * rather than by hoping a null unit number behaves itself.
 * ------------------------------------------------------------------------- */

export const KIND_UNIT = 'unit';
export const KIND_CHALLENGE = 'course-challenge';

/**
 * The kind of a stored row, for rows written before the field existed.
 *
 * ⚠️ NOT A DEFAULT FOR CONVENIENCE. Until v3.76 a Course Challenge could not be
 * recorded at all, so every row without a kind IS a unit test. That is a fact
 * about her data, and it stops being true the moment anyone writes a row
 * without a kind — which is why `khanGradeRow` always writes one.
 */
export function kindOf(g) {
  return g && g.kind === KIND_CHALLENGE ? KIND_CHALLENGE : KIND_UNIT;
}

/** True when a row is a Course Challenge rather than a unit test. */
export function isChallenge(g) {
  return kindOf(g) === KIND_CHALLENGE;
}

/** Newest first. `min` is inclusive, the same shape as RUBRIC_BANDS. */
export const KHAN_LETTER_BANDS = [
  // ⚠️ `assumed: true` CAME OFF THIS BAND AT v3.84, AND ONLY BECAUSE THE
  // EVIDENCE ARRIVED.
  //
  // v3.75 derived this ladder from a SCREENSHOT of Lamar's report card. The
  // screenshot proved A+ exists and that 99 earns one; it could not say where
  // A+ STARTS. 97 is the ordinary threshold, so 97 was used — and the flag was
  // put on it precisely so nobody would later read a guess as a fact.
  //
  // On Aug 26 2026 his running app became readable. src/lib/gradeScale.js:
  //
  //     { letter: 'A+', min: 97, max: 100 },
  //
  // The guess was right. All thirteen bands below match his file exactly,
  // threshold for threshold. The flag is removed because it is no longer a
  // guess — not because it stopped being convenient.
  //
  // ⚠️ WHAT IS STILL NOT CLAIMED: that his scale is right for her, or that
  // Georgia requires it. His own note says Georgia prescribes no scale for home
  // study and the parent sets it; this is the same scale for both children
  // because Gigi asked for that, and for no other reason.
  { min: 97, grade: 'A+' },
  { min: 93, grade: 'A' },
  { min: 90, grade: 'A-' },
  { min: 87, grade: 'B+' },
  { min: 83, grade: 'B' },
  { min: 80, grade: 'B-' },
  { min: 77, grade: 'C+' },
  { min: 73, grade: 'C' },
  { min: 70, grade: 'C-' },
  { min: 67, grade: 'D+' },
  { min: 63, grade: 'D' },
  { min: 60, grade: 'D-' },
  { min: 0, grade: 'F' }
];

/** Every letter, highest first. The override picker renders this. */
export const KHAN_GRADE_LETTERS = KHAN_LETTER_BANDS.map((b) => b.grade);

/**
 * A percentage to a letter. THE ONLY PLACE THIS CONVERSION HAPPENS.
 *
 * Returns null for a non-number rather than falling through to F — an absent
 * mark is not a failing one, the same rule `addWritingMark` keeps for an
 * unmarked rubric row.
 */
export function letterForPercent(percent) {
  if (!isNum(percent)) return null;
  const p = Number(percent);
  return KHAN_LETTER_BANDS.find((b) => p >= b.min).grade;
}

/**
 * Khan prints a fraction — "8 of 10" — so that is what Gigi types.
 *
 * Gigi, Aug 24: "I'll type 8/10. The app will make that into a percentage and
 * a letter grade."
 *
 * ⚠️ AND THE FRACTION IS WHAT GETS STORED, not the percentage.
 *
 * That is `addWritingMark`'s rule, deliberately: "what is stored is the MARKS
 * — one integer 1 to 4 per rubric row — never the percentage. The percent and
 * the letter are computed by gradePiece(), so a total can never quietly
 * disagree with the rubric it came from." Same here. 8 and 10 are what she
 * read off Khan; 80 and B- are what this app worked out from them, and a
 * stored conclusion drifts from its source the first time the ladder changes.
 */
/**
 * ONE BOX. A fraction or a percentage, whichever Khan is showing her. v3.84.
 *
 * ---- WHY THIS EXISTS ----
 *
 * Gigi, Aug 26 2026: "i want the format the same. when putting in a fraction
 * for kahn academy the learning app converts the fraction to a percentage and
 * letter grade."
 *
 * v3.75 already converted a fraction — but through TWO little number boxes, one
 * for 8 and one for 10. His takes ONE text box and works out which shape it is.
 * His parser, `parseScore` in src/lib/gradeScale.js, read off his running app
 * on Aug 26.
 *
 * ---- AND ONE BOX IS NOT A COSMETIC DIFFERENCE ----
 *
 * Khan does not print a constant denominator. His note: "Khan's progress page
 * reports a unit test as 9/11, 8/10, 4/6 — a fraction, and the denominator is
 * not even constant between units." Two boxes make her decide which number goes
 * where, 151 times a year. One box takes what is on the screen in front of her.
 *
 * It also takes a plain percentage, because a Course Challenge and a mastery
 * screen sometimes give one, and making her convert it back into a fraction to
 * fit the form would be the same lossy step in the other direction.
 *
 * ---- WHAT IT REFUSES, AND WHY IT REFUSES RATHER THAN GUESSES ----
 *
 * His rejects, kept exactly: blank, 'abc', -5, 120, '12/10' (more right than
 * there were), 'x/0'. His reason, which is the right one: "An out-of-range
 * number is a typo, and silently clamping it to 100 would record a grade she
 * did not mean."
 *
 * Returns { percent, raw, correct, total } or null. `raw` keeps the fraction as
 * she typed it — v3.75's rule: keep what she observed, compute the conclusion
 * every time it is shown, so a total can never quietly disagree with what it
 * came from. A percentage typed straight in has raw null, because there was no
 * fraction to keep.
 */
export function parseScore(input) {
  if (input === null || input === undefined) return null;
  const cleaned = String(input).trim().replace(/%$/, '').trim();
  if (cleaned === '') return null;

  // A fraction, exactly as Khan prints it. Spaces around the slash are allowed
  // because she is copying, not typing to a format.
  const fraction = cleaned.match(/^(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)$/);
  if (fraction) {
    const correct = Number(fraction[1]);
    const total = Number(fraction[2]);
    if (!Number.isFinite(correct) || !Number.isFinite(total)) return null;
    // A zero total is a division by zero. More correct than there were is a
    // typo. Neither may quietly become a grade on a record kept for three years.
    if (total <= 0 || correct < 0 || correct > total) return null;
    return {
      percent: Math.round((correct / total) * 100),
      raw: `${fraction[1]}/${fraction[2]}`,
      correct,
      total
    };
  }

  const n = Number(cleaned);
  if (!Number.isFinite(n)) return null;
  if (n < 0 || n > 100) return null;
  return { percent: Math.round(n), raw: null, correct: null, total: null };
}

/** The percentage alone, or null. One parser — a second is how two disagree. */
export function parsePercent(input) {
  const parsed = parseScore(input);
  return parsed === null ? null : parsed.percent;
}

/** One line describing the whole scale, to print beside the box she types in. */
export const GRADE_SCALE_SUMMARY = KHAN_LETTER_BANDS.map((b, i, all) => {
  const max = i === 0 ? 100 : all[i - 1].min - 1;
  return b.min === 0 ? `F below ${max + 1}` : `${b.grade} ${b.min}–${max}`;
}).join(' · ');

export function percentFromFraction(correct, total) {
  if (!isNum(correct) || !isNum(total)) return null;
  const c = Number(correct);
  const t = Number(total);
  if (t <= 0) return null;
  if (c < 0 || c > t) return null;
  return Math.round((c / t) * 100);
}

/**
 * What Khan's own screen says, for the times it shows a WORD and no fraction.
 *
 * Khan prints "8 of 10" on a unit test and a mastery word on a skill. The
 * fraction is the normal path and this is the fallback, so the letters here
 * are the ones Lamar's Khan mission card uses — his own mapping, not this
 * app's arithmetic. `letters` is a list because he left Proficient as a
 * judgement for the grown-up, and narrowing it would be overruling him.
 */
export const KHAN_MASTERY_GUIDE = [
  { says: 'Mastered', letters: ['A'] },
  { says: 'Proficient', letters: ['A-', 'B+'] },
  { says: 'Familiar, 90–99%', letters: ['B'] },
  { says: 'Familiar, 70–89%', letters: ['C'] },
  { says: 'Below 70%', letters: ['D'] },
  { says: 'Not done', letters: ['F'] }
];

/**
 * The words Azianna sees. Every score in this app gives her a band, never a
 * letter — the letter is for the record and the grown-up.
 *
 * Bands on the PERCENT rather than the letter, because the ladder now has
 * thirteen rungs and listing them would be a second copy of it. The
 * thresholds are the ones this panel has always used: 90 and 70.
 */
export function bandForPercent(percent) {
  if (!isNum(percent)) return null;
  const p = Number(percent);
  if (p >= 90) return 'Got it';
  if (p >= 70) return 'Nearly there';
  return 'Let’s go back';
}

/** The band for a letter, by way of the bottom of that letter's band. */
export function bandForGrade(grade) {
  const band = KHAN_LETTER_BANDS.find((b) => b.grade === grade);
  return band ? bandForPercent(Math.max(band.min, 60)) : null;
}

/**
 * A course's average across the units that have been recorded, and its letter.
 *
 * This is the line Lamar's report card prints — "5 Khan Academy units graded,
 * 86% average". Averaged over what has been RECORDED, never over the whole
 * course: a unit she has not sat is not a zero, and counting it as one would
 * make an unfinished course look like a failing one. Same rule his report card
 * states for a subject with no attempts — "Not yet graded", not 0%.
 */
export function courseAverage(courseId, grades = []) {
  const rows = (grades || []).filter(
    // isNum, not Number.isFinite(Number(...)) — a letter-only row stores
    // percent: null, and null would average in as a zero.
    //
    // ⚠️ AND UNIT TESTS ONLY. The Course Challenge covers the same material a
    // second time; averaging it in here would count it twice and let one
    // sitting outweigh the eight that led to it. It is reported beside this,
    // never inside it.
    (g) => g && g.courseId === courseId && !isChallenge(g) && isNum(g.percent)
  );
  if (rows.length === 0) return null;
  const percent = Math.round(
    rows.reduce((sum, g) => sum + Number(g.percent), 0) / rows.length
  );
  return { units: rows.length, percent, grade: letterForPercent(percent) };
}

/** The Course Challenge result for a course, if one has been recorded. */
export function challengeFor(courseId, grades = []) {
  return (grades || []).find((g) => g && g.courseId === courseId && isChallenge(g)) || null;
}

/**
 * Every course a result can be recorded against, in the order the form shows
 * them. Generated from the catalog — never hand-typed, because every
 * hand-typed list in this project has drifted.
 */
export const KHAN_GRADEABLE_COURSES = Object.values(KHAN_UNIT_COURSES).map((c) => ({
  courseId: c.courseId,
  label: c.label,
  subject: c.subject,
  units: c.units.map((u) => ({ n: u.n, name: u.name })),
  /**
   * Whether Khan built a Course Challenge for this course. Its elementary
   * Reading has none — no unit tests either — so the panel says so rather than
   * offering a row that could never be filled in.
   */
  courseChallenge: Boolean(c.courseChallenge),
  /**
   * 'khan' means Khan built a unit test for this course. 'parent' means it did
   * not — its elementary Reading is themed reading with zero assessments, so
   * the mark is Gigi's own and must never be dressed up as a Khan result.
   */
  graded: c.graded
}));

/**
 * Build the row that gets stored for one Khan result.
 *
 * @returns {{ok: true, row: object} | {ok: false, reason: string}}
 */
export function khanGradeRow({
  courseId,
  unitN,
  kind = KIND_UNIT,
  correct,
  total,
  grade,
  at,
  note,
  gradeId
} = {}) {
  const course = KHAN_UNIT_COURSES[courseId];
  if (!course) {
    return {
      ok: false,
      reason: 'pick the course her block opens — a result has to name a real course'
    };
  }

  if (kind !== KIND_UNIT && kind !== KIND_CHALLENGE) {
    return { ok: false, reason: `"${kind}" is not a kind of assessment this app records` };
  }

  /* ---- A COURSE CHALLENGE IS NOT A UNIT, AND MUST NOT BE FILED AS ONE ----
   *
   * Gigi, Aug 23: "Unit test vs Course Challenge — addKhanGrade has no field
   * for which kind of assessment it was, and nextUnitFor treats any grade as
   * 'unit done'. A Course Challenge result has nowhere to live. Both should be
   * recorded, and they are not the same thing."
   *
   * She is describing two different instruments. A unit test measures one
   * unit; the Course Challenge is cumulative, over the whole course. Averaging
   * them together counts the same material twice, and letting a Course
   * Challenge result land on a unit row would mark a unit she never sat as
   * done — the same failure the free-text rows are refused for.
   *
   * So a challenge row carries `unitN: null` and its own kind, and everything
   * that walks units filters it out by kind rather than by hoping null behaves.
   */
  let unit = null;

  if (kind === KIND_CHALLENGE) {
    if (!course.courseChallenge) {
      return {
        ok: false,
        reason: `Khan built no Course Challenge for ${course.label} — there is nothing to record`
      };
    }
    if (unitN !== undefined && unitN !== null && unitN !== '') {
      return {
        ok: false,
        reason: 'a Course Challenge covers the whole course, so it cannot also name a unit'
      };
    }
  } else {
    unit = isNum(unitN) ? unitFor(courseId, Number(unitN)) : null;
    if (!unit) {
      return {
        ok: false,
        reason: `pick which unit of ${course.label} this result is for`
      };
    }
  }

  /* ---- THE FRACTION IS THE NORMAL WAY IN ----
   *
   * Gigi types what Khan printed — 8 of 10 — and this works out 80 and B-.
   * A letter may be given INSTEAD, for the times Khan shows only a word, and
   * `gradedFrom` records which of the two it was so a transcript is never
   * guessing where a letter came from.
   */
  const gaveFraction = correct !== undefined && correct !== '' && total !== undefined && total !== '';
  let keptPercent = null;
  let keptCorrect = null;
  let keptTotal = null;
  let letter = grade;
  let gradedFrom = 'letter';

  if (gaveFraction) {
    const p = percentFromFraction(correct, total);
    if (p === null) {
      return {
        ok: false,
        reason:
          'that fraction does not work — type how many she got right, then how many there were, ' +
          'and the first cannot be bigger than the second'
      };
    }
    keptCorrect = Math.round(Number(correct));
    keptTotal = Math.round(Number(total));
    keptPercent = p;
    gradedFrom = 'fraction';
    // A letter passed alongside a fraction is an OVERRIDE and it wins, because
    // Khan can say Proficient on a paper she also got 9 of 10 on and only a
    // grown-up can tell which one the record should carry.
    if (grade === undefined || grade === null || grade === '') {
      letter = letterForPercent(p);
    } else if (KHAN_GRADE_LETTERS.includes(grade)) {
      letter = grade;
      gradedFrom = 'overridden';
    } else {
      // ⚠️ NEVER SILENTLY DROP AN OVERRIDE. Ignoring an unrecognised letter and
      // using the fraction instead would record a grade she did not ask for
      // and look like it worked.
      return {
        ok: false,
        reason: `"${grade}" is not a letter on the ladder — ${KHAN_GRADE_LETTERS.join(', ')}`
      };
    }
  }

  if (!KHAN_GRADE_LETTERS.includes(letter)) {
    return {
      ok: false,
      reason: 'type what she got — how many right, out of how many — or pick a letter'
    };
  }

  return {
    ok: true,
    row: {
      gradeId:
        gradeId ||
        globalThis.crypto?.randomUUID?.() ||
        `kg-${Date.now()}-${Math.floor(Math.random() * 1e6)}`,

      /**
       * TAKEN FROM THE COURSE, NOT FROM THE FORM. The old form let the subject
       * be chosen separately from the unit, so "Language Arts" could be saved
       * against a maths unit and the two Grown-Up Corner tables would then
       * disagree about the same row.
       */
      subject: course.subject,

      /** The two fields whose absence was the whole bug. */
      courseId: course.courseId,
      unitN: unit ? unit.n : null,

      /**
       * WHICH INSTRUMENT THIS WAS. 'unit' or 'course-challenge'.
       *
       * Every row written before v3.76 has no kind. They are all unit tests —
       * a Course Challenge could not be recorded at all until this version —
       * so anything reading this treats a missing kind as 'unit'. That is a
       * fact about the data, not a default chosen for convenience.
       */
      kind,

      /**
       * The unit's name as Khan prints it, copied from the catalog rather than
       * typed. A name typed by hand drifts from the name on the page, and the
       * annual progress report prints this.
       */
      unit: unit ? unit.name : 'Course Challenge',
      courseLabel: course.label,

      /**
       * WHAT SHE READ OFF KHAN. Stored as the two numbers, the same way
       * addWritingMark stores rubric marks and never the total they make.
       * Null when Khan showed a word instead of a fraction.
       */
      correct: keptCorrect,
      total: keptTotal,

      /** The letter. Worked out from the fraction, or picked when there is none. */
      grade: letter,
      /** 'fraction' · 'letter' · 'overridden'. Where the letter came from. */
      gradedFrom,
      /** The band Azianna sees. She never sees the letter. */
      band: keptPercent === null ? bandForGrade(letter) : bandForPercent(keptPercent),
      percent: keptPercent,
      at: at || /* LearningOS, Sept 23 2026: her LOCAL date, not UTC — after 8pm Eastern UTC is already tomorrow. */ dayKeyOf(),
      note: String(note || '').trim(),
      editedAt: Date.now()
    }
  };
}

/**
 * True when a stored row is one `nextUnitFor` will actually count.
 *
 * The same test `nextUnitFor` applies, written once so a screen can tell Gigi
 * whether a row on her record moves Azianna on — the pre-v3.20 prose rows do
 * not, and until now nothing said so.
 */
export function gradeAdvances(g) {
  return Boolean(
    // isNum, not Number.isFinite(Number(...)) — `Number(null)` is 0 and 0 is
    // finite, so a Course Challenge row (unitN: null) would have read as
    // "unit 0". It happens to be harmless because no course has a unit 0, and
    // relying on that is exactly the kind of luck this project stops relying
    // on. And !isChallenge, because a cumulative test is not a unit.
    g && KHAN_UNIT_COURSES[g.courseId] && !isChallenge(g) && isNum(g.unitN)
  );
}

export default khanGradeRow;
