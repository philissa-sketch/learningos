// ---------------------------------------------------------------------------
// Choice-order randomization for CURATED questions (lesson tests, quarterly
// exams, apply-it transfer questions).
//
// WHY THIS EXISTS — a real defect, found August 6, 2026:
//
//   The correct answer sat at index 0 in 592 of 600 Aerospace test questions
//   and 290 of 334 Social Studies test questions, and nothing anywhere
//   shuffled them. QuestionCard renders `question.choices` in author order,
//   so the first button on screen was the right answer roughly 98% of the
//   time.
//
//   A 12-year-old finds that pattern fast. Once he does, every mastery
//   score, report card letter grade, and transcript number stops measuring
//   what he learned and starts measuring that he noticed. That is a
//   correctness problem in the RECORD, not a cosmetic one.
//
//   The generated practice questions never had this problem —
//   `buildFactBankQuestion` in problemTemplates.js already shuffles options
//   and remaps the answer index. This module does exactly the same thing for
//   the hand-authored questions, so both halves of the app behave alike.
//
// WHY NOT JUST REWRITE THE 934 QUESTIONS:
//   Hand-spreading answers across positions is a one-time fix that every
//   future authoring session has to remember to repeat, and the next writer
//   drifts back to "correct answer first" without noticing. Shuffling at
//   presentation time is permanent, applies to content that doesn't exist
//   yet, and means an author can keep writing the correct answer first —
//   which is genuinely easier to read and review.
//
// THE ONE THING THAT MUST NOT BREAK:
//   `answer` is an INDEX and `choiceFeedback` is INDEX-ALIGNED to `choices`.
//   All three have to move together or a student gets the wrong-answer
//   explanation attached to the right answer — the exact bug already found
//   and fixed twice by hand in the Aerospace Q1 and Social Studies Q1 exams.
//   That is why this returns one new object with all three remapped, rather
//   than shuffling choices anywhere near the render.
// ---------------------------------------------------------------------------

/**
 * Deterministic 32-bit string hash (FNV-1a). Same input, same number,
 * every time — no Math.random anywhere in this module.
 */
export function hashSeed(...parts) {
  let h = 0x811c9dc5;
  const str = parts.join('::');
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** Small deterministic PRNG (mulberry32) — seeded, repeatable, no globals. */
function mulberry32(seed) {
  let a = seed >>> 0;
  return function next() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Returns a permutation of [0..n-1] derived only from `seed`.
 *
 * Determinism is the whole point: the engine re-renders many times per
 * question (every keystroke of state, every feedback panel), and a
 * re-randomizing shuffle would visibly reorder the buttons under the
 * student's finger mid-question. Same seed in, same order out.
 */
function seededPermutation(n, seed) {
  const rand = mulberry32(seed);
  const idx = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx;
}

/**
 * Returns a NEW question object with `choices`, `answer`, and
 * `choiceFeedback` permuted together. Every other field is carried over
 * untouched, including `id` — callers (the exit check, scoring) match on
 * id, so it must survive.
 *
 * Returns the ORIGINAL object unchanged, deliberately, when:
 *   - it isn't a choice question (numeric/text have no positions to shuffle)
 *   - `choices` is missing or has fewer than 2 entries
 *   - `answer` isn't a valid index into `choices`
 *
 * That last guard matters: a malformed question should render exactly as it
 * did before this module existed rather than get its answer index remapped
 * to something arbitrary. Silent corruption of a graded question is a worse
 * outcome than an unshuffled one.
 */
export function shuffleQuestionChoices(question, seed) {
  if (!question || question.type !== 'choice') return question;
  const { choices, answer } = question;
  if (!Array.isArray(choices) || choices.length < 2) return question;
  if (!Number.isInteger(answer) || answer < 0 || answer >= choices.length) return question;

  const order = seededPermutation(choices.length, seed);

  // `order[newIndex] = oldIndex` — read it as "which original choice lands
  // in this slot."
  const nextChoices = order.map((oldIndex) => choices[oldIndex]);
  const nextAnswer = order.indexOf(answer);

  // choiceFeedback may be absent (older lessons) or shorter than choices.
  // Only rebuild it when it's really an array, and index defensively so a
  // short array yields undefined rather than throwing — getWrongAnswerFeedback
  // already falls back to `explanation` on a missing entry.
  const nextFeedback = Array.isArray(question.choiceFeedback)
    ? order.map((oldIndex) => question.choiceFeedback[oldIndex])
    : question.choiceFeedback;

  return {
    ...question,
    choices: nextChoices,
    answer: nextAnswer,
    choiceFeedback: nextFeedback
  };
}

/**
 * Convenience wrapper for a whole question array — used by LessonEngine for
 * a lesson's test questions.
 *
 * `attemptSeed` varies per attempt (see LessonEngine), so a retake presents
 * a different order than the first sitting. That's deliberate: re-taking a
 * failed quarterly exam should re-test the material, not replay a memorized
 * button sequence. Within a single attempt the order is fixed, because the
 * seed is fixed.
 */
export function shuffleQuestionSet(questions, { lessonId, attemptSeed }) {
  if (!Array.isArray(questions)) return [];
  return questions.map((q) => shuffleQuestionChoices(q, hashSeed(lessonId, q?.id ?? '', attemptSeed)));
}
