// ---------------------------------------------------------------------------
// COUNTING WHAT IS COUNTABLE IN A JOURNAL ENTRY — AND NOTHING ELSE.
//
// Gigi, Aug 19 2026: "Is there a grader in the journal entry that will grade her
// work?" No, and this is not one either. It COUNTS. It does not judge.
//
// ---- WHY THIS IS NOT AUTO-GRADING, AND MUST NEVER BECOME IT ----
//
// The standard this app is measured against is Edition A — LOCAL-FIRST /
// OFFLINE, NO INTERNET, NO AI SERVICE — and §3.6's item table is explicit:
//
//     freeResponse (never auto-scored — routed to reflection/portfolio)
//     "Three item types — freeResponse, performanceTask, checklist — plus
//      every project stage cannot be auto-scored."
//
// A journal entry is free response. So the rule is not that auto-scoring is
// missing; it is that it is FORBIDDEN for this kind of writing.
//
// What this file does is different in kind. "Does this sentence start with a
// capital" is a FACT about the text, the same way a word count is. It is not an
// opinion about whether the writing is any good, and it never becomes the mark:
// the panel SUGGESTS, and Gigi accepts or overrides. Same rule the goals engine
// already follows — "engine proposes, adult approves; nothing activates on its
// own."
//
// ---- IT COVERS ROW 2 ONLY, ON PURPOSE ----
//
// Row 1 is "you answered the question". Row 3 is "you said enough". BOTH REQUIRE
// READING WHAT SHE MEANT, and a machine guessing at them is how a nine-year-old
// gets marked down for writing something interesting. They stay Gigi's, and a
// check fails the build if anything here ever suggests a level for them.
//
// ---- READ OFF HER REAL ENTRIES, Aug 17-20 ----
//
//   "did you konw the coat of the seed let it dry"   no capital, no full stop
//   "that i did good on  my  homework today ."       lowercase start, floating stop
//   "I noticed I did my home work fast"              capital, no full stop
//
// Every one of those is countable without an opinion, and every one of them is
// Grammar & Usage — her lowest strand at 2.20.
// ---------------------------------------------------------------------------

/**
 * Split into sentences on terminal punctuation, keeping a trailing fragment.
 *
 * A nine-year-old at 2.20 writes runs-on and misses full stops — which is the
 * whole point of looking. So a chunk with no terminator still counts as a
 * sentence attempt rather than vanishing from the tally.
 */
export function splitSentences(text) {
  const raw = String(text || '').trim();
  if (!raw) return [];
  const parts = raw
    .split(/(?<=[.!?])\s+/)
    .map((p) => p.trim())
    .filter(Boolean);
  return parts.length ? parts : [raw];
}

/**
 * The countable facts. No judgement, no level, no score.
 *
 * `endsWithPunctuation` deliberately tolerates a space before the mark —
 * "homework today ." is a full stop she typed, just badly placed, and calling
 * it missing would be counting a spacing slip as a punctuation failure.
 */
export function sentenceMechanics(text) {
  const sentences = splitSentences(text);
  const words = String(text || '').trim().split(/\s+/).filter(Boolean).length;

  let capitalStart = 0;
  let punctuationEnd = 0;
  for (const s of sentences) {
    const firstLetter = s.match(/[A-Za-z]/);
    if (firstLetter && firstLetter[0] === firstLetter[0].toUpperCase()) capitalStart += 1;
    if (/[.!?]\s*$/.test(s)) punctuationEnd += 1;
  }

  return {
    sentences: sentences.length,
    words,
    capitalStart,
    punctuationEnd,
    missingCapital: sentences.length - capitalStart,
    missingEnd: sentences.length - punctuationEnd
  };
}

/**
 * A SUGGESTED level for row 2. Never applied on its own.
 *
 * The bands follow the rubric's own descriptors rather than a curve invented
 * here — l4 "capitals and full stops in the right places", l3 "one or two
 * slips", l2 "some of it runs together, or the capitals are missing", l1 "hard
 * to tell where one sentence ends."
 *
 * ⚠️ IT RETURNS null FOR AN EMPTY ENTRY rather than 1. Nothing written is not
 * the same fact as written badly, and this file does not get to decide the
 * difference — §3.13.1 again.
 */
export function suggestSentenceLevel(text) {
  const m = sentenceMechanics(text);
  if (m.words === 0) return null;

  // ---- ⚠️ THE FIRST VERSION COUNTED SLIPS ABSOLUTELY AND OVER-GRADED HER ----
  //
  // It banded on the raw number: 0 slips -> 4, 1-2 -> 3, 3-4 -> 2, else 1. On a
  // long entry that is about right. On a SHORT one it is nonsense, and her
  // entries are 8, 11 and 9 words:
  //
  //   "did you konw the coat of the seed let it dry"
  //      one sentence, no capital, no full stop — EVERYTHING wrong — scored 3,
  //      whose descriptor reads "Full sentences, one or two slips."
  //
  // Two slips on a one-sentence entry is not "one or two slips", it is all of
  // it. Caught by running the first draft against her three real entries before
  // this was wired to anything.
  //
  // So it bands on the PROPORTION that is right. Each sentence offers two
  // chances — a capital at the front and a mark at the end — and the level
  // follows how many were taken.
  const chances = m.sentences * 2;
  const taken = m.capitalStart + m.punctuationEnd;
  const ratio = chances === 0 ? 0 : taken / chances;
  const level = ratio === 1 ? 4 : ratio >= 0.8 ? 3 : ratio >= 0.5 ? 2 : 1;
  const slips = m.missingCapital + m.missingEnd;

  return {
    level,
    slips,
    ratio,
    mechanics: m,
    // Said in plain words, because a number with no reason beside it is a
    // number a grown-up either trusts blindly or ignores.
    because:
      slips === 0
        ? `${m.sentences} sentence${m.sentences === 1 ? '' : 's'}, all starting with a capital and ending with a full stop.`
        : `${m.sentences} sentence${m.sentences === 1 ? '' : 's'} · ` +
          `${m.missingCapital} without a capital · ${m.missingEnd} without an end mark.`
  };
}

/**
 * The rows this file is allowed to have an opinion about. ONE.
 *
 * Exported so the check can assert the list rather than trusting the comment
 * above it — a rule that lives only in prose is a rule that erodes.
 */
export const SUGGESTIBLE_ROWS = ['sentences'];
