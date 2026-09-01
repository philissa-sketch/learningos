// ---------------------------------------------------------------------------
// THE DAILY JOURNAL IS GRADED NOW. Gigi's decision, Aug 19 2026.
//
// ---- ⚠️ THIS OVERTURNS A LOCKED RULE, AND THAT IS WHY IT IS WRITTEN DOWN ----
//
// Since v3.6 the rule was: "nothing in this Journal is ever graded or
// corrected." It was Gigi's rule. Two checks enforced it and still do.
//
// HER REASON, Aug 19: she wants Azianna's daily writing marked, and asked
// whether a separate graded daily piece would be better. Her answer:
//
//     "she isn't going to want to do the daily writing and the journal."
//
// That is the whole argument and it is a good one. Two writing tasks a day for
// a nine-year-old means one of them gets done badly and the other resented.
// One task, graded, beats two where the graded one is the chore.
//
// ---- WHAT DID NOT CHANGE, AND MUST NOT ----
//
//   · The MINI-LESSON inside the journal is still never graded. It teaches and
//     gets out of the way; check-writing still bans an input inside that block.
//   · "SAY SOMETHING BACK" IS STILL A NOTE, NEVER A MARK. Feedback and grading
//     are different things, Gigi drew that line herself in the backlog, and
//     check-writing still fails the build if a score appears in that box.
//   · Her writing is NEVER EDITED. The mark lives in its own table keyed by
//     entryId; not one character of what she wrote is touched.
//
// ---- WHY THE SAME LADDER AS THE BOOK REPORTS ----
//
// 1 -> 60, 2 -> 73, 3 -> 87, 4 -> 100. Lamar's ladder, settled Aug 13 2026 with
// its reason: "a rubric that grades 'Solid' as a C teaches him that meeting the
// standard is failure." The journal cannot use a different scale from the
// graded pieces or the same word means two things on one record.
//
// ---- WHY THREE ROWS AND NOT SIX ----
//
// A book report is a fortnight's work and carries five rows. This is eight
// minutes at the end of a school day. A six-row rubric on a daily entry is a
// grown-up's form, not a child's feedback, and it would take longer to mark
// than the entry took to write — which is how daily marking stops happening in
// week three.
//
// ROW 2 IS THE ONE THAT MATTERS MOST. Grammar & Usage is her lowest strand at
// 2.20, no course in this app teaches it, and this is now the only place in her
// week where sentence-level writing is looked at by an adult on purpose.
// ---------------------------------------------------------------------------

import { RUBRIC_LEVEL_PERCENT, RUBRIC_BANDS } from '../writing/writingPieces.js';

/** Re-exported so nothing downstream can drift onto a second ladder. */
export { RUBRIC_LEVEL_PERCENT, RUBRIC_BANDS };

export const JOURNAL_RUBRIC = [
  {
    id: 'answered',
    row: 'You answered the question',
    l4: 'You answered it, and said something you actually thought.',
    l3: 'You answered it.',
    l2: 'You wrote about something else nearby.',
    l1: 'The question is not answered.'
  },
  {
    id: 'sentences',
    row: 'Sentences and punctuation',
    l4: 'Full sentences. Capitals and full stops in the right places.',
    l3: 'Full sentences, one or two slips.',
    l2: 'Some of it runs together, or the capitals are missing.',
    l1: 'Hard to tell where one sentence ends.'
  },
  {
    id: 'enough',
    row: 'You said enough',
    l4: 'More than one idea, and they join up.',
    l3: 'One real idea, finished.',
    l2: 'Started, then stopped.',
    l1: 'A few words.'
  }
];

/**
 * The mark for one entry — three levels in, one percent out.
 *
 * ⚠️ EACH LEVEL IS MAPPED TO A PERCENT AND THE PERCENTS AVERAGED. That is NOT
 * the same operation as adding the levels and dividing by 12, and the
 * difference is the whole point — the second one is the v3.56 defect that made
 * "meets the standard on every row" a C.
 *
 * A row left unmarked is EXCLUDED, never counted as a zero. §3.13.1: "a missing
 * grade and a zero are opposite facts."
 */
export function gradeJournalEntry(levels) {
  const given = JOURNAL_RUBRIC.map((r) => levels?.[r.id]).filter(
    (l) => typeof l === 'number' && l >= 1 && l <= 4
  );
  if (given.length === 0) return null;
  const percents = given.map((l) => RUBRIC_LEVEL_PERCENT[l]);
  const percent = Math.round(percents.reduce((a, b) => a + b, 0) / percents.length);
  return { percent, rowsMarked: given.length, rowsTotal: JOURNAL_RUBRIC.length };
}

/** The letter, from the one band table the whole app uses. */
export function journalBand(percent) {
  if (percent == null) return null;
  return RUBRIC_BANDS.find((b) => percent >= b.min) || RUBRIC_BANDS[RUBRIC_BANDS.length - 1];
}

/**
 * What SHE reads. Never a bare percentage on its own.
 *
 * §3.7.2 rule 2: warm, and never softened. "Two of three" stays "two of three".
 * A number with no words beside it is the thing a child takes to bed.
 */
export function journalMarkForHer(mark) {
  const g = gradeJournalEntry(mark?.levels);
  if (!g) return null;
  const band = journalBand(g.percent);
  const strong = JOURNAL_RUBRIC.filter((r) => (mark.levels?.[r.id] || 0) >= 3);
  const weak = JOURNAL_RUBRIC.filter(
    (r) => mark.levels?.[r.id] >= 1 && mark.levels?.[r.id] <= 2
  );
  return {
    percent: g.percent,
    letter: band?.grade || null,
    strong: strong.map((r) => r.row),
    working: weak.map((r) => r.row)
  };
}
