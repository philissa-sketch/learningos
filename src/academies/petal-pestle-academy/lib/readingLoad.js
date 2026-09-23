// ---------------------------------------------------------------------------
// READING LOAD — one metric, two checks.
//
// ---- WHY THIS FILE EXISTS ----
//
// `check-readability.mjs` measures whether she can READ a diagnostic item.
// `check-lesson-prose.mjs` measures whether she can read a LESSON. Those are
// the same question asked of different text, and until v3.70 the metric lived
// inside the first script.
//
// A second copy would have been the real danger. Two implementations of
// "how hard is this to read" drift, and the day they disagree you have two
// numbers that cannot be compared and no way to tell which one moved. So the
// metric moved here, unchanged, and both checks import it.
//
// EVERYTHING IN THIS FILE WAS LIFTED VERBATIM from check-readability.mjs at
// v3.69 — the syllable counter, both word lists, and analyse(). The extraction
// was proved by running that check before and after and comparing the output
// byte for byte. If you change anything here, do that again.
//
// ---- WHY NOT JUST FLESCH-KINCAID (kept from the original) ----
//
// The first version of the readability script gated on FK and failed 62 of 189
// items, which is a number that means "your metric is wrong" at least as loudly
// as it means "your items are wrong". FK is a regression fitted to long prose.
// On a nine-word question with four two-word answers it is close to noise.
//
// So this measures FK's two honest ingredients separately:
//
//   SENTENCE LENGTH — how much she has to hold in her head at once. The single
//   biggest driver of reading difficulty for a child, and the easiest thing to
//   fix: split the sentence.
//
//   HARD-WORD RATE — the share of words with three or more syllables. Also
//   fixable: choose a shorter word.
//
// Both are interpretable and both tell you what to DO, which "FK 8.4" does not.
// FK is still computed and printed as a familiar cross-check. It is not a gate.
// ---------------------------------------------------------------------------

// NOTE ON THE ESCAPES BELOW. check-sources counts brackets after blanking
// comments and strings, and blankNonCode() has NO concept of a regex
// literal — so a quote character inside a character class opens a string
// in its parser, swallows the closing bracket and reports a phantom
// unbalanced bracket. It never bit before because check-sources scans
// src/ only, and this metric used to live in scripts/. Quotes inside a
// character class are therefore written as \u0022 and \u0027 here.
// Behaviour is identical; the escapes are for the checker, not the regex.
// Same family as the curly-apostrophe rule for JSX text.

/** Content words a question or lesson is allowed to use because they ARE the content. */
export const SUBJECT_TERMS = new Set([
  // botany / the herbs themselves
  'photosynthesis', 'chamomile', 'calendula', 'elderberry', 'elderberries', 'echinacea',
  'perennial', 'perennials', 'annual', 'pollination', 'pollinate', 'pollinates', 'dormant',
  'chlorophyll', 'rhizome', 'herbalist', 'herbalism', 'botanist', 'edible', 'medicine',
  'medicines', 'medicinal', 'organism', 'organisms', 'offspring', 'generations', 'generation',
  // body / medicine
  'circulatory', 'respiratory', 'digestive', 'skeleton', 'intestine', 'oxygen', 'nutrients',
  'immune', 'infection', 'diagnosis', 'symptoms', 'patient', 'patients', 'stethoscope',
  // method
  'experiment', 'experiments', 'variable', 'variables', 'independent', 'dependent',
  'scientific', 'scientist', 'scientists', 'evidence', 'measurement', 'measurements',
  'inconclusive', 'conclusion', 'correlation', 'causation', 'controlled',
  // maths
  'multiply', 'multiplied', 'multiplies', 'multiplication', 'division', 'divided',
  'subtract', 'subtracting', 'denominator', 'denominators', 'numerator', 'fraction',
  'fractions', 'decimal', 'decimals', 'perimeter', 'symmetry', 'triangle', 'rectangle',
  'rectangular', 'equation', 'expression', 'kilogram', 'kilograms', 'millilitres',
  'centimetre', 'centimetres', 'average', 'estimate', 'remainder', 'quantity',
  // ELA metalanguage — the words a grammar question needs to name its own topic
  'adverb', 'adjective', 'pronoun', 'pronouns', 'apostrophe', 'punctuation', 'punctuated',
  'sentence', 'sentences', 'paragraph', 'vocabulary', 'comprehension', 'counterargument',
  'opinion', 'opinions',
  'transition', 'evidence', 'conclusion', 'parallel', 'modifier', 'ambiguous',
  'identical', 'abundant', 'fragile', 'potent', 'faint', 'moist', 'carefully',
  // The herbs. Every question in the app is flavoured with one, they are the
  // reason she opens it, and not one of them is ever load-bearing for the
  // answer — "Grandma dried 24 peppermint leaves" needs no decoding of
  // "peppermint" to add 24 and 31. Exempting them is the same allowance already
  // made for "photosynthesis": a word that IS the content.
  'peppermint', 'rosemary', 'lavender', 'calendula', 'elderberry', 'dandelion',
  'hibiscus', 'echinacea', 'marshmallow', 'spearmint', 'chamomile'
]);

/**
 * Very high-frequency words that happen to be long.
 *
 * Syllable-counting metrics have always over-punished these — it is the known
 * weakness the Dale-Chall formula exists to fix, by checking words against a
 * familiar-word list instead of counting their parts. "Another" is three
 * syllables and every six-year-old reads it.
 *
 * ---- EXTENDED AT v3.70, FOR PROSE ----
 *
 * The original list was tuned on diagnostic items — short, controlled text.
 * Lesson prose is narrative and it exposed the gap immediately: `hb-1-08`
 * scored 16.7% long words on the strength of "every" and "visitor", because the
 * counter reads e-ve-ry as three syllables.
 *
 * The words added below are the ones the metric gets WRONG, not the ones that
 * are genuinely hard. Each one is a word a nine-year-old reads without pausing.
 * "Altogether" and "correctly" are still not on it, and both got rewritten
 * instead. Keep it that way.
 */
export const COMMON_WORDS = new Set([
  'another', 'together', 'everyone', 'everything', 'anything', 'somebody',
  'family', 'remember', 'different', 'beautiful', 'favourite', 'favorite',
  'animal', 'animals', 'usually', 'probably', 'yesterday', 'tomorrow',
  'afternoon', 'understand', 'important', 'grandmother', 'grandma',
  // ---- added v3.70 for prose ----
  'every', 'nobody', 'something', 'nothing', 'already', 'sometimes',
  'afterwards', 'underneath', 'somewhere', 'anywhere', 'everywhere',
  'seventy', 'sixty', 'seventeen', 'nineteen', 'eighteen', 'fourteen',
  'thirteen', 'fifteen', 'sixteen', 'twenty', 'plenty', 'visitor',
  'quietly', 'slowly', 'suddenly', 'finally', 'easily', 'happily',
  'yourself', 'herself', 'himself', 'themselves', 'everybody'
]);

/**
 * Syllable count.
 *
 * CORRECTED after the first run flagged "angle" and "cycle" as three-syllable
 * words. The old version counted the vowel groups INCLUDING the final silent e,
 * then added one more for the consonant+le ending — double-counting the same
 * syllable. It was inflating the long-word rate of every item containing an
 * ordinary two-syllable word ending in -le, and three geometry items failed on
 * the strength of the word "angle".
 *
 * A metric that fails an item for a word a seven-year-old can read is not
 * measuring reading difficulty; it is measuring its own bug. Strip the silent e
 * FIRST, then count, then add one back for consonant+le.
 */
export function syllables(word) {
  const w = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!w) return 0;
  if (w.length <= 3) return 1;
  const endsConsonantLe = /[^aeiouy]le$/.test(w);
  const stripped = w.replace(/(?:es|ed|e)$/, '').replace(/^y/, '');
  const groups = stripped.match(/[aeiouy]{1,2}/g);
  let count = groups ? groups.length : 1;
  if (endsConsonantLe) count += 1;
  return Math.max(1, count);
}

const EMPTY = { words: 0, sentences: 0, meanSentence: 0, hardRate: 0, fk: 0, hardWords: [] };

/**
 * Measure a block of text.
 *
 * @param {string}  text
 * @param {object}  [opts]
 * @param {boolean} [opts.exemptProperNouns=false]
 *
 * ---- THE PROPER-NOUN ALLOWANCE, AND WHY IT DEFAULTS TO OFF ----
 *
 * Gigi, Aug 23 2026: *"Proper nouns stays. It doesn't make any sense to learn
 * about a person without their name."*
 *
 * She is right, and the evidence was blunt. Measured without this allowance,
 * Social Studies "failed" eighteen lessons for words like Charleston, Carolina,
 * Confederate, Anthony, Galileo and Jupiter — and `body-m16-03` failed for the
 * name ALEXA CANADY, the first Black woman neurosurgeon in the United States,
 * in a course written for a girl who wants to be a doctor. You cannot shorten a
 * name. A check that gates on this pressures the courses toward not naming the
 * people Georgia requires them to name, and toward not naming the four women
 * Module 16 exists for.
 *
 * That is the same pressure SUBJECT_TERMS already exists to prevent, and it is
 * the rule about a check that pressures you to falsify the data being worse
 * than no check.
 *
 * IT DEFAULTS TO FALSE ANYWAY. Turning it on globally would silently change
 * what `check-readability.mjs` reports about the item bank, and a metric that
 * moves underneath a check nobody asked to change is how a number stops meaning
 * what it used to. The lesson-prose check opts in. Whether the item bank should
 * too is a separate decision, on purpose, and it has not been made.
 *
 * DETECTION IS DELIBERATELY DUMB: capitalised, and not the first word of a
 * sentence. It will miss a name that opens a sentence and it will exempt a
 * capitalised common noun mid-sentence. Both errors are small and both fall on
 * the side of not punishing a name.
 */
export function analyse(text, opts = {}) {
  const { exemptProperNouns = false } = opts;

  const clean = String(text || '')
    .replace(/[\u0022\u0027]/g, '\u0027')
    .replace(/\s+/g, ' ')
    .trim();
  if (!clean) return { ...EMPTY, hardWords: [] };

  const sentenceCount =
    clean.split(/[.!?;:](?:\s|$)/).filter((s) => s.trim().split(/\s+/).length > 1).length || 1;
  const words = clean.split(/\s+/).filter((w) => /[a-zA-Z]/.test(w));
  if (words.length === 0) return { ...EMPTY, hardWords: [] };

  // Which token indices open a sentence. A capital there says nothing.
  const opensSentence = new Set([0]);
  for (let i = 0; i < words.length - 1; i += 1) {
    if (/[.!?][\u0027\u0022]?$/.test(words[i])) opensSentence.add(i + 1);
  }

  const hardWords = [];
  const properNouns = [];
  let syl = 0;

  words.forEach((raw, i) => {
    const w = raw.toLowerCase().replace(/[^a-z\u0027]/g, '');
    const s = syllables(w);
    syl += s;
    if (s < 3) return;
    if (SUBJECT_TERMS.has(w) || COMMON_WORDS.has(w)) return;

    // Strip any leading punctuation before testing the capital. Written as
    // "not a letter" rather than a list of quote characters on purpose:
    // check-sources reads a quote inside a character class as an opened string
    // and then reports a phantom unbalanced bracket. Same family as the curly
    // apostrophe rule for JSX.
    const isProper = /^[A-Z]/.test(raw.replace(/^[^A-Za-z]+/, '')) && !opensSentence.has(i);
    if (isProper) {
      // \u0027 is an apostrophe, written as an escape rather than typed.
      // check-sources strips strings before counting brackets, so a literal
      // quote inside a character class opens a string in its parser, swallows
      // the closing "]" and reports a phantom unbalanced bracket. Same family
      // as the curly-apostrophe rule for JSX text. Known, not fixed.
      properNouns.push(raw.replace(/[^A-Za-z\u0027-]/g, ''));
      if (exemptProperNouns) return;
    }
    hardWords.push(w);
  });

  return {
    words: words.length,
    sentences: sentenceCount,
    meanSentence: words.length / sentenceCount,
    hardRate: hardWords.length / words.length,
    fk: Math.max(0, 0.39 * (words.length / sentenceCount) + 11.8 * (syl / words.length) - 15.59),
    hardWords: [...new Set(hardWords)],
    /** Named for the record. Exempted only when exemptProperNouns is on. */
    properNouns: [...new Set(properNouns)]
  };
}

/**
 * The longest sentences in a block, worst first — so a failure can name the
 * sentence to split rather than only the lesson that contains it.
 *
 * A check that says "this lesson averages 19.6 words" sends you hunting. One
 * that hands you the sentence is a check you act on the same afternoon.
 */
export function longestSentences(text, limit = 3) {
  return String(text || '')
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.split(/\s+/).length > 1)
    .map((s) => ({ sentence: s, words: s.split(/\s+/).filter((w) => /[a-zA-Z]/.test(w)).length }))
    .sort((a, b) => b.words - a.words)
    .slice(0, limit);
}
