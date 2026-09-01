// ---------------------------------------------------------------------------
// BOOK REPORTS AND RESEARCH PAPERS — THE WRITING THAT IS GRADED.
//
// ---- WHY THESE EXIST SEPARATELY FROM THE JOURNAL ----
//
// The Journal is never graded and never corrected. That is locked. But a record
// with no graded writing in it has no evidence of writing at all, which is a
// problem at a records review and a bigger problem for her.
//
// So the graded thing is a FINISHED PIECE SHE CHOSE TO MAKE, not the private
// page she writes on every day. She sees the rubric before she starts. Nothing
// here ever reaches back into the Journal.
//
// ---- HOW MANY, AND WHY NOT MORE ----
//
// FOUR book reports — one a quarter.
// TWO research papers — not four.
//
// The second number is deliberate. A research paper a nine-year-old abandons
// teaches her she cannot write one. Two finished papers beat four started ones,
// and the first is short on purpose.
//
// ---- THE READ-ALOUD RULE, AND WHY IT IS RECORDED ----
//
// TEN OF HER THIRTEEN Reading and Vocabulary questions on the Check-In were
// READ ALOUD to her. Her Reading 3.46 and Vocabulary 2.91 are LISTENING scores.
// Her independent reading is lower than both.
//
// That matters most here, because a book report requires reading a book. So
// read-aloud is ALLOWED and RECORDED, exactly as the Check-In records it.
// Hiding it would make the record wrong, and pretending she read alone when she
// did not would make the grade meaningless.
// ---------------------------------------------------------------------------

/* ---------------------------------------------------------------------------
 * HOW A RUBRIC MARK BECOMES A PERCENTAGE — AND WHY NOT BY DIVIDING BY FOUR.
 *
 * ---- WHAT THIS USED TO DO, FOR SEVENTEEN VERSIONS ----
 *
 *     percent = total / (rows × 4) × 100
 *
 * Four rows, all 3s — "meets the standard" on every single line — is 12 out of
 * 16, which is 75%, which on the ladder below is a C. All 2s was 50%: an F.
 * All 1s was 25%: also an F. THE BOTTOM TWO LEVELS OF A FOUR-LEVEL RUBRIC BOTH
 * COLLAPSED INTO FAILURE, and doing exactly what was asked came out average.
 *
 * ---- THIS IS A NAMED FAILURE MODE, NOT A MATTER OF TASTE ----
 *
 * BLUEPRINT_A_LOCAL_FIRST §3.6, on rubric scoreMapping:
 *
 *   "State how rubric levels map to whatever scale your records use, THEN CHECK
 *    THE MIDDLE OF THE RANGE. A rubric where 'meets the standard' lands on a
 *    failing percentage teaches the learner that meeting the standard is
 *    failure. This is a documented, recurring failure mode in rubric design,
 *    not a hypothetical — it happens whenever a 4-level rubric is divided by 4
 *    and mapped onto a percentage scale where 75% is a C."
 *
 * Divided by four. Mapped onto a scale where 75% is a C. Both halves, exactly.
 *
 * ---- THE LADDER, AND WHOSE IT IS ----
 *
 * Lamar settled this for Mission Control on Aug 13 2026, in PROJECT_LOG.md:
 *
 *   "The average maps 1->60, 2->73, 3->87, 4->100 rather than straight out of
 *    16, BECAUSE A RUBRIC THAT GRADES 'SOLID' AS A C TEACHES HIM THAT MEETING
 *    THE STANDARD IS FAILURE."
 *
 * The same four criteria carry across both apps, so the vocabulary carries too.
 * Now:  all 4s = 100 = A  ·  all 3s = 87 = B+  ·  all 2s = 73 = C  ·  all 1s = 60 = D-
 *
 * ---- WHY THE BOTTOM IS A D- AND NOT AN F ----
 *
 * Level 1 is the lowest DESCRIBED level of a rubric she was shown before she
 * started. It is work that exists, at the bottom of the scale — which is not
 * the same fact as work that was never handed in. The blueprint keeps those two
 * apart everywhere (§3.13.1: "a missing grade and a zero are opposite facts"),
 * and its own rubric mapToScale puts the bottom of a rubric at "introduced",
 * not at failed.
 *
 * So F is reserved for a piece that is not there. A piece that is there and
 * weak is a D-.
 *
 * ---- CONFIRMED BY GIGI, Aug 18 2026 ----
 *
 * Asked directly whether a bottom-marks piece should be an F or a D-, she chose
 * to keep Lamar's ladder as it stands: "Stays at Lamar's level." Both children
 * are marked on the same four criteria and now on the same scale, which is the
 * point of borrowing it.
 *
 * THE WAY BACK, so this does not become permanent by accident: change
 * RUBRIC_LEVEL_PERCENT[1] and invert the assertion in check-writing again, with
 * the new decision and its date written beside it. Never delete it.
 * ------------------------------------------------------------------------ */
export const RUBRIC_LEVEL_PERCENT = { 1: 60, 2: 73, 3: 87, 4: 100 };

/**
 * §3.6 requires the mapping method to be DECLARED rather than implied by
 * whatever the arithmetic happens to do. It is stated here, once, and
 * check-writing reads it.
 */
export const RUBRIC_SCORE_MAPPING = {
  method: 'levelAverage',
  levelPercent: RUBRIC_LEVEL_PERCENT,
  reason:
    "Lamar's ladder, Aug 13 2026. Dividing by four puts 'meets the standard' on a C, " +
    'which teaches her that doing what was asked is average.',
  /** Where the middle of the rubric must land. check-writing asserts this. */
  meetsTheStandardIsAtLeast: 'B',
  /** F is for a piece that was never handed in, not for a weak one. */
  bottomOfRubric: 'D-'
};

/* ---------------------------------------------------------------------------
 * ⚠️ THERE WAS A SECOND LADDER HERE, AND IT DISAGREED WITH THE FIRST — v3.84.
 *
 * `RUBRIC_BANDS` was a twelve-band table declared in this file. `KHAN_LETTER_BANDS`
 * in khanGrade.js has thirteen. The difference was the top one:
 *
 *      100%  ·  Khan unit -> A+   ·  book report -> A
 *       99%  ·  Khan unit -> A+   ·  book report -> A
 *       97%  ·  Khan unit -> A+   ·  book report -> A
 *
 * Every band below 97 was identical, which is exactly why it survived: the
 * two ladders agreed everywhere anyone had looked. A book report where she
 * scored 4 on every row — the top of a rubric she was shown before she started
 * — came out an A, while the same 100% on Khan came out an A+.
 *
 * SAME PERCENTAGE, TWO LETTERS, ON ONE GEORGIA RECORD.
 *
 * v3.78 wrote the rule: "two implementations of one metric drift, and the day
 * they disagree neither number can be trusted." check-annual-report asserts the
 * REPORT uses one ladder; nothing asserted the two ladders WERE one. It became
 * visible on Aug 26 2026 only because Lamar's running app became readable and
 * his thirteen-band gradeScale.js could be compared against both.
 *
 * Gigi, asked directly whether a perfect book report should become an A+:
 * "yes". Her call, and it raises a grade on a record kept for three years.
 *
 * THE WAY BACK, so this cannot become permanent by accident: re-declare a table
 * here and invert the one-ladder assertion in check-writing, with the new
 * decision and its date beside it. Never delete it.
 *
 * ---- C2: WHERE THE ONE LADDER LIVES NOW ----
 *
 * It used to be `KHAN_LETTER_BANDS` in this Academy's own app, at
 * `lib/khanGrade.js`. That file was not content and did not travel — it was
 * one school's bones, and this folder holds only curriculum.
 *
 * The ladder is now read from the PLATFORM's `lib/gradeScale.js`, which is
 * where it always belonged: a percentage-to-letter scale describes no learner
 * and no subject. The note above records that the two tables were compared
 * band for band on Aug 26 2026 and matched at all thirteen thresholds, so
 * this is the same ladder under a new address, not a new one.
 *
 * `GRADE_SCALE` carries `{ letter, min, max }`; this file has always used
 * `{ min, grade }`. Reshaped here rather than at the source, because the
 * platform's shape is not this Academy's business to change — and it is
 * DERIVED rather than retyped, so a change to the scale cannot leave a stale
 * copy behind in a curriculum folder.
 * ------------------------------------------------------------------------ */
import { GRADE_SCALE } from '../../../../lib/gradeScale.js';

/**
 * The one ladder, under the name this file has always used it by.
 *
 * Highest first, `min` inclusive — the same order and the same contract the
 * twelve-band table it replaced had, so every reader below is untouched.
 */
export const RUBRIC_BANDS = GRADE_SCALE.map(({ min, letter }) => ({ min, grade: letter }));

/**
 * A rubric row is scored 1 to 4. She sees the words for every level BEFORE she
 * starts, which is the whole point — a rubric she only meets afterwards is a
 * mark scheme, not a teaching tool.
 */
export const BOOK_REPORT = {
  id: 'book-report',
  kind: 'book report',
  title: 'Book report',
  perYear: 4,
  quarters: [1, 2, 3, 4],
  minutes: 45,
  readAloudAllowed: true,

  /**
   * FOUR WEEKLY STEPS. v3.82, and it is Lamar's shape.
   *
   * Gigi, Aug 25 2026: "Also, do the book report like Lamar's. Structured so she
   * will know what to do."
   *
   * ---- WHERE THIS COMES FROM ----
   *
   * His build log, Aug 2026, quoting the parent's own source:
   *
   *     "Break a single project down into tiny daily pieces instead of asking
   *      for a full paper at once... Write exactly one short paragraph per day.
   *      By Friday, he will easily have a full rough draft done without a single
   *      late-night writing session."
   *
   * And his diagnosis of the thing it fixed: "A Research Paper had been one task
   * with one date six weeks out — which for a 12-year-old means nothing happens
   * for five weeks and then a bad weekend."
   *
   * A book report worth 45 minutes, announced once and then left alone, is that
   * same bad weekend at nine years old.
   *
   * ---- ⚠️ WHAT COULD NOT BE COPIED, AND WHY ----
   *
   * HIS STEPS ARE DATED. They count backward from a real due date, one week
   * apart, the last landing ON it. THIS APP HAS NO CALENDAR AND REFUSES ONE —
   * five files say so, and §7.1's own words: "A quarter here means roughly nine
   * weeks. It is a sequence, not a set of dates. Anyone who treats these as
   * deadlines has turned a plan into a stick."
   *
   * So the mechanism is translated rather than copied: the steps pace on HER
   * PROGRESS, the way every other pacing decision in this app works. See
   * src/lib/bookReportSchedule.js.
   *
   * Copying the dates would have been §38 in a new place — a document about an
   * app is not the app, and neither is a mechanism lifted out of one that has
   * something this one deliberately does not.
   *
   * ---- ⚠️ EVERY STEP CARRIES A REAL INSTRUCTION, NEVER A LABEL ----
   *
   * His log again: "Steps carry real instructions, not labels... The
   * verification enforces a minimum instruction length so a future step can't
   * ship as a bare label." check-book-report asserts the same here.
   *
   * "Rough draft" tells a nine-year-old nothing. "One short paragraph a day,
   * and none of it has to be good yet" tells her exactly what tomorrow is.
   */
  steps: [
    {
      n: 1,
      id: 'read',
      step: 'Read the book',
      ask:
        'Just read it. When something matters, mark the page — a line you liked, ' +
        'a moment where somebody changes. A scrap of paper is enough. ' +
        'You do not write anything this week.',
      example: 'Marking as you go is the trick. Those places are very hard to find again later.'
    },
    {
      n: 2,
      id: 'notes',
      step: 'Notes and what it will say',
      ask:
        'Go back to the places you marked. Out of those, choose the three or four ' +
        'things your report will say. Write them in the notes box as short lines, ' +
        'not sentences. This is a plan, not writing.',
      example: 'Next week you write one paragraph for each line. That is why there are three or four.'
    },
    {
      n: 3,
      id: 'draft',
      step: 'Rough draft',
      ask:
        'One paragraph a day. One for each line in your plan. Give a real bit of ' +
        'the book each time. None of it has to be good yet. Do not go back and ' +
        'fix anything this week.',
      example: 'Four short days and the whole draft is done. No long afternoon at the end.'
    },
    {
      n: 4,
      id: 'polish',
      step: 'Edit and finish',
      ask:
        'Read your draft out loud to somebody. Reading it out loud finds more than ' +
        'your eyes do. Fix the places where you stumble, copy it into the last box, ' +
        'and tick the list.',
      example: 'You are listening for the parts where you run out of breath.'
    }
  ],

  frame: [
    { n: 1, heading: 'What happened', ask: 'Tell the story in your own words. Do not tell me the ending in the first line.' },
    { n: 2, heading: 'A character worth talking about', ask: 'Pick one person in the book. What did they want, and did they get it?' },
    { n: 3, heading: 'A part I would change', ask: 'Find one part you would write differently, and say exactly how.' },
    { n: 4, heading: 'Would I pass it to a friend', ask: 'Yes or no, and one real reason. Both answers are fine.' }
  ],
  rubric: [
    {
      row: 'It is your own words',
      l4: 'All of it is in your words. Nothing is copied.',
      l3: 'Nearly all your words. One phrase borrowed.',
      l2: 'Some copying from the book or the back cover.',
      l1: 'Mostly copied.'
    },
    {
      row: 'You answered all four parts',
      l4: 'All four, and each one has something real in it.',
      l3: 'All four, one of them thin.',
      l2: 'Three of the four.',
      l1: 'Two or fewer.'
    },
    {
      row: 'You gave reasons',
      l4: 'Every opinion has a reason attached to it.',
      l3: 'Most opinions have reasons.',
      l2: 'Opinions with no reasons.',
      l1: 'No opinions given at all.'
    },
    {
      row: 'Sentences and punctuation',
      l4: 'Full sentences, capitals and full stops throughout.',
      l3: 'Mostly right, a few slips.',
      l2: 'Several run-ons or fragments.',
      l1: 'Hard to read aloud without stopping.'
    }
  ]
};

export const RESEARCH_PAPER = {
  id: 'research-paper',
  kind: 'research paper',
  title: 'Research paper',
  perYear: 2,
  quarters: [2, 4],
  minutes: 45,
  readAloudAllowed: true,
  /**
   * Taught as a SEQUENCE, not assigned as a finished expectation. Each step is
   * a session. She is never handed the whole thing at once.
   */
  sequence: [
    { n: 1, step: 'Choose a question', ask: 'Pick a question you actually want answered. Not a topic — a question.', example: 'Not "mint". Instead: why does mint take over a whole bed?' },
    { n: 2, step: 'Find two sources', ask: 'Find two places that answer it. Write down where each one came from.', example: 'A seed packet and a library book both count.' },
    { n: 3, step: 'Take notes in your own words', ask: 'Close the book, then write what it said. If you cannot, read it again.', example: 'This is the step that stops copying happening later.' },
    { n: 4, step: 'Write it', ask: 'Answer your question first, then say how you found out.', example: 'Four paragraphs is plenty for the first one.' },
    { n: 5, step: 'Check it', ask: 'Read it out loud. Check every fact against your notes.', example: 'Anywhere you stumble is a sentence to change.' }
  ],
  suggestedTopics: [
    'One herb, and what it needs to grow well',
    'A plant family, and what its members share',
    'A Black American herbalist or doctor, and the science they did',
    'One body system, and one thing that can go wrong with it',
    'A Georgia native plant, and where it grows wild'
  ],
  rubric: [
    {
      row: 'You had a real question',
      l4: 'A question with an answer you did not already know.',
      l3: 'A question, but one you mostly knew the answer to.',
      l2: 'A topic rather than a question.',
      l1: 'No question stated.'
    },
    {
      row: 'Two sources, both named',
      l4: 'Two sources, both named, both actually used.',
      l3: 'Two sources named, one barely used.',
      l2: 'One source, or sources not named.',
      l1: 'No sources given.'
    },
    {
      row: 'Your own words',
      l4: 'All in your words. Any quote is in quotation marks.',
      l3: 'Nearly all your words.',
      l2: 'Several copied sentences.',
      l1: 'Mostly copied.'
    },
    {
      row: 'You answered your own question',
      l4: 'The question is answered clearly, near the start.',
      l3: 'Answered, but buried at the end.',
      l2: 'Partly answered.',
      l1: 'Not answered.'
    },
    {
      row: 'Sentences and punctuation',
      l4: 'Full sentences, capitals and full stops throughout.',
      l3: 'Mostly right, a few slips.',
      l2: 'Several run-ons or fragments.',
      l1: 'Hard to read aloud without stopping.'
    }
  ]
};

export const WRITING_PIECES = [BOOK_REPORT, RESEARCH_PAPER];

/**
 * The step that says the report is FINISHED — derived, never typed.
 *
 * The store refuses to tick this one on an empty draft. It is computed from the
 * steps array rather than written as `4`, so adding a fifth step moves the
 * guard with it. Every hand-typed number in this project has drifted.
 */
export const WRITING_FINAL_STEP = BOOK_REPORT.steps[BOOK_REPORT.steps.length - 1].n;

/** Every piece she owes in a year, with the quarter it belongs to. */
export function piecesForYear() {
  const out = [];
  for (const p of WRITING_PIECES) {
    for (const q of p.quarters) {
      out.push({ id: `${p.id}-q${q}`, pieceId: p.id, kind: p.kind, title: `${p.title} · Quarter ${q}`, quarter: q, minutes: p.minutes });
    }
  }
  return out.sort((a, b) => a.quarter - b.quarter || a.kind.localeCompare(b.kind));
}

/**
 * Turn rubric marks (each 1-4) into a percentage and a letter on Lamar's ladder.
 *
 * Each mark is mapped to a percentage FIRST and the percentages are averaged.
 * That is not the same as summing the marks and dividing by the maximum, and
 * the difference is the whole point — see RUBRIC_SCORE_MAPPING above.
 *
 * `total` and `max` are the raw rubric points (12 of 16, say). They are still
 * returned and still shown on the panel, because a grown-up marking six rows
 * wants to see the marks she gave. They are no longer what the percentage is
 * computed from.
 */
export function gradePiece(pieceId, marks) {
  const piece = WRITING_PIECES.find((p) => p.id === pieceId);
  if (!piece) return null;
  const rows = piece.rubric.length;
  const given = (marks || []).slice(0, rows);
  if (given.length !== rows || given.some((m) => !Number.isInteger(m) || m < 1 || m > 4)) return null;
  const total = given.reduce((a, b) => a + b, 0);
  const percent = Math.round(
    given.reduce((sum, m) => sum + RUBRIC_LEVEL_PERCENT[m], 0) / rows
  );
  const band = RUBRIC_BANDS.find((b) => percent >= b.min);
  return {
    pieceId,
    rows,
    total,
    max: rows * 4,
    percent,
    grade: band.grade,
    method: RUBRIC_SCORE_MAPPING.method
  };
}

export const PIECES_PER_YEAR = piecesForYear().length;

export default WRITING_PIECES;
