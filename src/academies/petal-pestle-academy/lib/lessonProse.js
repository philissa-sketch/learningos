/**
 * THE PROSE SHE READS, AND THE NAMES INSIDE IT.
 *
 * ---- WHY THIS IS A LIB AND NOT A HELPER INSIDE A CHECK ----
 *
 * Rule 11: a rule the app must follow lives where a check can test it.
 *
 * These two rules were written twice — once inside check-lesson-prose and once
 * inside the word-study generator — and the second copy was WRONG. It called
 * 623 ordinary words proper nouns, among them `garlic`, `ginger`, `seeds` and
 * `winter`: exactly the words a herbalism spelling list is for.
 *
 * ⚠️ AND check-word-study DID NOT CATCH IT, BECAUSE IT USED THE SAME BROKEN
 * COPY. The generator excluded a word, the check agreed the word was excluded,
 * and both were wrong together. Two implementations of one rule agreeing is not
 * evidence — it is the failure this project met at v3.78 and again at v3.84,
 * where two grading ladders agreed everywhere anyone had looked and disagreed
 * above 97%.
 *
 * One definition. Imported by both. That is the whole point of this file.
 *
 * ---- NOTE ON THE REGEXES BELOW ----
 *
 * No quote character appears inside a character class. The straight and curly
 * quotes are written as ", ’ and ” instead.
 *
 * ⚠️ THIS FILE BROKE THAT RULE ON ITS FIRST SAVE — in the version that carried
 * this very note. check-sources caught it in four seconds: it strips strings
 * before counting brackets and has no concept of a regex literal, so a quote
 * inside [ ] reads as an unclosed bracket. Writing a rule down at the top of a
 * file does not make the code below it obey.
 */

/**
 * The prose she actually reads on the lesson screen.
 *
 * ⚠️ BEATS **OR** CORE, BECAUSE THAT IS WHAT THE SCREEN DOES. 243 of the 256
 * lessons carry both. LessonReader branches on `beats?.length > 0` and falls to
 * `core` only when there are none — so `core` on those 243 is dead data, and
 * measuring it adds text that is on no screen. It turned nineteen lessons red
 * the one time it was tried.
 *
 * ⚠️ AND EACH PART IS CLOSED BEFORE JOINING. Headings have no full stop, so a
 * plain join glues a heading onto the paragraph below it and invents a sentence
 * nobody reads — one measured at 29 words.
 */
export function proseOf(lesson) {
  const parts = [];

  if (lesson.checkIn) parts.push(lesson.checkIn.text, lesson.checkIn.question);
  if (lesson.hook) parts.push(lesson.hook.text, lesson.hook.question);

  if (lesson.beats?.length > 0) {
    for (const b of lesson.beats) parts.push(b.hook, b.teachingText, b.example);
  } else {
    for (const c of lesson.core || []) parts.push(c.heading, c.text);
  }

  return parts
    .filter(Boolean)
    .map((s) => (/[.!?][\u0022\u2019\u201D\u0029]*\s*$/.test(s) ? s.trim() : `${s.trim()}.`))
    .join(' ');
}

/**
 * Every word that behaves like a name somewhere in the lessons.
 *
 * ---- ⚠️ HOW THIS GOES WRONG, BECAUSE IT DID ----
 *
 * The rule is "capitalised, and not at the start of a sentence." The broken
 * version tokenised the text FIRST:
 *
 *     const toks = text.match(/[A-Za-z][A-Za-z]*​/g);
 *     if (/^[A-Z]/.test(raw) && !/[.!?]$/.test(toks[i - 1])) → a name
 *
 * Tokenising strips the punctuation. So `toks[i - 1]` can NEVER end in a full
 * stop, the sentence-start guard never fires, and EVERY first word of EVERY
 * sentence is filed as a proper noun. 1,013 words, of which 623 were ordinary.
 *
 * The fix is order: split the RAW text into sentences, then look inside each
 * one. A capitalised word that is not its sentence's first word is a name.
 *
 * Detected, never hand-typed. A list of names would go stale the first time a
 * lesson mentioned someone new — and this corpus names Emma Dupree, Francis,
 * Coley, Albany, Georgia and Gigi herself.
 */
export function properNounsIn(lessons) {
  const names = new Set();
  for (const lesson of lessons) {
    for (const sentence of proseOf(lesson).split(/(?<=[.!?])[\u0022\u2019\u201D\u0029]*\s+/)) {
      const words = sentence.match(/[A-Za-z][A-Za-z\u2019\u002D]*/g) || [];
      words.forEach((raw, i) => {
        if (i > 0 && /^[A-Z]/.test(raw)) names.add(raw.toLowerCase());
      });
    }
  }
  return names;
}

/** Rough syllable count — vowel groups, with a silent final e removed. */
export function syllablesIn(word) {
  return (String(word).toLowerCase().replace(/e$/, '').match(/[aeiouy]+/g) || ['x']).length;
}
