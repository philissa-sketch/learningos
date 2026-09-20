/**
 * =============================================================================
 * SCHOOL WORDS — the three words a school says that belong to one family.
 * =============================================================================
 *
 * ---- THE GAP THIS FILLS (audit finding 7, Sept 15 2026) ----
 *
 * *"The platform speaks one family's language on screen."*
 *
 * Twenty-three live lines name the child. Forty-three name one US state.
 * Thirty-three name the grown-up by one household's word for her. The audit
 * called these the cheapest repairs on the page and the most visible, and it
 * was half right: the REPLACEMENTS are cheap, and there was nowhere to get a
 * replacement FROM. That is what this file is.
 *
 * ---- THE THREE SOURCES ----
 *
 *     the child's name     the household record's `displayName`
 *     the grown-up's word  the household record's `guardianWord`
 *     the state            the Academy's `compliance.stateName`
 *
 * The first two are the HOUSEHOLD's, not the curriculum's: two children on one
 * machine may call the same adult different things, and a child who is called
 * something new next year should not need a rebuild. The third is the
 * CURRICULUM's, because it is a claim about law, and the law belongs to the
 * school year being taught rather than to the machine it is taught on.
 *
 * ---- WHY READS NEVER THROW, WHEN academyContent() DOES ----
 *
 * `academyContent()` throws when it is read before an Academy is loaded, and
 * that is right: a screen rendering with no curriculum is a bug, and a loud
 * failure is cheaper than a school with nothing in it.
 *
 * These are words in sentences, and the same strictness would be wrong. A
 * throw here blanks a whole screen over a missing noun. Worse, it would make
 * every caller defensive, and a defensive caller writes its own fallback,
 * which is how one family's words got compiled in the first time. So a read
 * before install is not an error. It returns the generic word and the screen
 * still reads like English.
 *
 * ---- WHY THERE IS NO GENERIC WORD FOR A CHILD ----
 *
 * `guardianWord()` and `stateWord()` fall back to a noun phrase that works in
 * a sentence: "your grown-up", "your state". `learnerWord()` falls back to the
 * EMPTY STRING, on purpose.
 *
 * There is no honest generic substitute for a person's name when you are
 * speaking to them. "Welcome back, your learner" is not a greeting, it is a
 * form letter, and a child reads the difference instantly. The honest move
 * when the name is not known is to drop the address and keep the sentence:
 * "Welcome back." is a real thing to say. So vocative lines carry the name in
 * a token that takes its own punctuation with it when it goes — see
 * `fillWords` below.
 *
 * ---- WHAT COUNTS AS NOT KNOWING ----
 *
 * A blank field is not an answer. A parent who clears the box, or types only
 * spaces, gets the generic word rather than a sentence with a hole in it:
 * "Here is your week, " shipped once and is exactly what this guards against.
 */

/**
 * What the platform says when the family has not said.
 *
 * Exported so a check can assert against these rather than retyping them, and
 * so a screen that needs to explain the default can quote it.
 */
export const GENERIC_WORDS = Object.freeze({
  learner: '',
  guardian: 'your grown-up',
  state: 'your state'
});

let words = null;

/** A value is only a word if somebody actually typed something into it. */
function clean(value) {
  return typeof value === 'string' && value.trim() ? value.trim() : '';
}

/**
 * Set the words for the school now being entered.
 *
 * Takes the two records rather than reaching for them itself, for the same
 * reason the content loader does: a module that fetches its own dependencies
 * cannot be run by a check script without a database behind it.
 *
 * @param {object} o
 * @param {object} [o.record]   the household's record for this Academy
 * @param {object} [o.content]  the loaded content manifest
 */
export function installSchoolWords({ record = null, content = null } = {}) {
  words = Object.freeze({
    // Which record these came from. Held because a screen that lets a parent
    // CHANGE one of these words has to patch the right record, and the id it
    // would otherwise reach for — the loaded content pack — is not it:
    // contentPackFor() falls back to the id but may be a different pack
    // entirely, so a save keyed on it would edit the wrong household row.
    academyId: clean(record?.id),
    learner: clean(record?.displayName),
    guardian: clean(record?.guardianWord),
    state: clean(content?.compliance?.stateName)
  });
  return words;
}

/** Forget them on sign-out, so a line firing during teardown cannot name whoever was here last. */
export function unloadSchoolWords() {
  words = null;
}

/** Which words are installed, or null. For checks and for debugging a blank greeting. */
export function installedSchoolWords() {
  return words;
}

/** Which household record the words came from, or '' before install. */
export function schoolWordsAcademyId() {
  return words?.academyId || '';
}

/** The child's name, or '' — there is no generic name. See the note above. */
export function learnerWord() {
  return words?.learner || GENERIC_WORDS.learner;
}

/** This household's word for the adult, or 'your grown-up'. */
export function guardianWord() {
  return words?.guardian || GENERIC_WORDS.guardian;
}

/** The state whose homeschool law this curriculum is built against, or 'your state'. */
export function stateWord() {
  return words?.state || GENERIC_WORDS.state;
}

const WORD_READERS = Object.freeze({
  learner: learnerWord,
  guardian: guardianWord,
  state: stateWord
});

/**
 * Substitute the word tokens in a line of text.
 *
 * Two forms, and the second is the one that matters:
 *
 *     {learner}            the word, or nothing
 *     {, |learner}         ", " and the word — or nothing at all
 *
 * Everything before the pipe is a LITERAL PREFIX that only survives if the
 * word does. That is what lets a vocative line lose its address cleanly:
 *
 *     `Welcome back{, |learner}. I kept everything where you left it.`
 *
 * becomes "Welcome back, Ada. I kept everything where you left it." for a
 * family that has said who they are, and "Welcome back. I kept everything
 * where you left it." for one that has not. No trailing comma, no hole, no
 * second version of the sentence to keep in step with the first.
 *
 * This is the same trick the greeting lines already use for `{n}` in the
 * streak note — a token replaced at the moment the line is picked, never at
 * the moment it is written. Written-in values are how a name gets baked into
 * a module that is imported once and never re-evaluated.
 *
 * Unknown tokens are left alone rather than blanked. A typo should look like
 * a typo on screen, not like a word the family forgot to fill in.
 */
export function fillWords(text) {
  if (typeof text !== 'string' || !text) return text;
  return text.replace(/\{(?:([^|{}]*)\|)?(learner|guardian|state)\}/g, (_, prefix, key) => {
    const word = WORD_READERS[key]();
    return word ? `${prefix || ''}${word}` : '';
  });
}
