/**
 * =============================================================================
 * CHECK IT BEFORE IT IS SAVED.
 * =============================================================================
 *
 * ---- WHY THIS EXISTS (Aug 25, 2026) ----
 *
 * Two D- grades in two days. The parent, asked why:
 *
 *   **"He received D minuses because he rushed, didn't use punctuation marks,
 *   capitalization, or complete sentences on both entries."**
 *
 * She is right, and the app made it easy. Run over his real entries, sentences
 * beginning with a lowercase letter separate the good work from the bad
 * perfectly:
 *
 *     w7-essay            B+   0 of 3
 *     wd-w03-d2           B+   0 of 3
 *     wd-w03-d3           B+   0 of 5
 *     w7-scientific-obs   D-   1 of 3
 *     wd-w04-d2           D-   8 of 8      ...and "the the" in it
 *
 * **Every one of those is machine-detectable and the app never looked.** The
 * Save button unlocked the moment the word count passed zero. The only
 * proofreading help on the screen was a link to an external checker he had to
 * choose to click and leave the app for — and did not.
 *
 * So the first anyone knew of it was his mother reading it days later and
 * writing a D-. **A five-day feedback loop on a mistake visible in five
 * seconds.**
 *
 * ---- THE WORSE HALF: HE WROTE TO THE COUNTER ----
 *
 * `wd-w04-d2` asked for four claims, each followed by a sentence beginning
 * "For example,". He wrote **zero**. He wrote about Minecraft. The app counted
 * eight sentences, saw `minSentences: 8`, said nothing, saved it and paid him
 * 15 XP.
 *
 * `w7-scientific-observation` asked for an observation with measurable detail
 * and a minimum of 50 words. He wrote 50 words — exactly 50 — of fiction, and
 * the screen said **"Goal reached."**
 *
 * He did not beat the system. **The system only ever counted, so he wrote to
 * the count.** A number is the one thing a twelve-year-old can satisfy without
 * doing the work, and it was the only thing being asked.
 *
 * ---- WHAT THIS DOES AND DOES NOT CLAIM ----
 *
 * This is a MECHANICS AND REQUIREMENTS check, not a grader. It can see a
 * missing capital, a missing full stop, a doubled word, a required phrase that
 * is absent. It cannot see whether a scientific observation is actually about
 * science — that entry was a Minecraft story and no string test will ever say
 * so. That judgment stays with his mother, which is why the rubric still has
 * four criteria and she still reads every entry.
 *
 * Every issue is phrased for HIM, in the second person, naming the count and
 * showing the first offending sentence. "8 sentences don't start with a capital
 * letter" is actionable; "mechanics: poor" is a verdict.
 */

/**
 * Splits into sentences on terminal punctuation, keeping the punctuation with
 * the sentence it ends.
 *
 * A trailing fragment with no terminal punctuation IS a sentence for this
 * purpose — it is exactly the thing the missing-full-stop check is looking for,
 * and dropping it would make the check unable to see its own subject.
 */
export function sentencesOf(text) {
  return String(text || '')
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function wordsOf(text) {
  const t = String(text || '').trim();
  return t ? t.split(/\s+/).filter(Boolean) : [];
}

/** First 60 characters of a sentence, for showing him which one it means. */
function snippet(sentence) {
  const s = String(sentence || '').trim();
  return s.length > 60 ? s.slice(0, 57) + '…' : s;
}

/**
 * ---- MECHANICS ----
 *
 * Four checks, all of them things his mother named and all of them things a
 * string can honestly answer. Deliberately NOT spelling: this app has no
 * dictionary, and flagging "idae" would mean flagging "Tinkercad", "Salva" and
 * every rocket part he owns. Spelling stays with the external checker and with
 * her.
 */
export function mechanicsIssues(text) {
  const sentences = sentencesOf(text);
  const issues = [];
  if (sentences.length === 0) return issues;

  const lower = sentences.filter((s) => /^[a-z]/.test(s));
  if (lower.length > 0) {
    issues.push({
      id: 'capitals',
      severity: 'mechanics',
      count: lower.length,
      label:
        lower.length === 1
          ? '1 sentence does not start with a capital letter'
          : `${lower.length} sentences do not start with a capital letter`,
      example: snippet(lower[0])
    });
  }

  /**
   * Only the LAST sentence can legitimately lack terminal punctuation in a
   * split that keys on terminal punctuation — the earlier ones ended somewhere
   * or they would not have been split. So this check is precisely "he stopped
   * typing without finishing the sentence", which is the real habit.
   */
  const unfinished = sentences.filter((s) => !/[.!?]["')\]]?$/.test(s));
  if (unfinished.length > 0) {
    issues.push({
      id: 'end-punctuation',
      severity: 'mechanics',
      count: unfinished.length,
      label:
        unfinished.length === 1
          ? '1 sentence has no full stop, question mark or exclamation mark at the end'
          : `${unfinished.length} sentences have no punctuation mark at the end`,
      example: snippet(unfinished[0])
    });
  }

  const doubled = String(text || '').match(/\b(\w+)\s+\1\b/gi) || [];
  if (doubled.length > 0) {
    issues.push({
      id: 'doubled-words',
      severity: 'mechanics',
      count: doubled.length,
      label: `A word is typed twice in a row: "${doubled[0]}"`,
      example: doubled.slice(0, 3).join(', ')
    });
  }

  const lowerI = (String(text || '').match(/(?:^|[^\w'])i(?![\w'])/g) || []).length;
  if (lowerI > 0) {
    issues.push({
      id: 'lowercase-i',
      severity: 'mechanics',
      count: lowerI,
      label: lowerI === 1 ? 'The word "i" should be a capital I' : `The word "i" is lowercase ${lowerI} times — it is always a capital I`,
      example: null
    });
  }

  return issues;
}

/**
 * ---- DID HE DO WHAT IT ASKED ----
 *
 * A requirement is one of three shapes, all of which appear in the real drill
 * set (see `drillRequirements.js`):
 *
 *   { phrase, min }          at least N occurrences  — "For example," x4
 *   { anyOf: [...], min }    N occurrences across a set of accepted openers
 *   { phrase, max }          at most N — the "do not use 'and then'" drill
 *
 * Matching is case-insensitive and punctuation-exact. "For example" without the
 * comma still counts: the drill teaches the move, not the typography, and
 * failing him on a comma inside a check about examples would teach the wrong
 * lesson.
 */
function occurrences(text, phrase) {
  const hay = String(text || '').toLowerCase();
  const needle = String(phrase || '').toLowerCase().replace(/,$/, '');
  if (!needle) return 0;
  let n = 0;
  let i = hay.indexOf(needle);
  while (i !== -1) {
    n += 1;
    i = hay.indexOf(needle, i + needle.length);
  }
  return n;
}

export function taskIssues(text, requirements = []) {
  const issues = [];
  for (const req of requirements || []) {
    const phrases = req.anyOf || [req.phrase];
    const found = phrases.reduce((n, p) => n + occurrences(text, p), 0);

    if (Number.isFinite(req.max) && found > req.max) {
      issues.push({
        id: `avoid:${phrases[0]}`,
        severity: 'task',
        count: found - req.max,
        label:
          req.max === 0
            ? `The drill says not to use "${phrases[0]}" — you used it ${found} time${found === 1 ? '' : 's'}`
            : `"${phrases[0]}" is used ${found} times; the drill allows ${req.max}`,
        example: null
      });
      continue;
    }

    if (Number.isFinite(req.min) && found < req.min) {
      const naming = phrases.length > 1
        ? phrases.map((p) => `"${p}"`).join(' or ')
        : `"${phrases[0]}"`;
      issues.push({
        id: `require:${phrases[0]}`,
        severity: 'task',
        count: req.min - found,
        label:
          found === 0
            ? `The drill asks for ${req.min} ${req.min === 1 ? 'sentence' : 'sentences'} using ${naming} — there are none`
            : `The drill asks for ${req.min} using ${naming} — there ${found === 1 ? 'is' : 'are'} ${found}`,
        example: req.note || null
      });
    }
  }
  return issues;
}

/**
 * ---- THE LENGTH FLOOR IS A FLOOR, NOT A TARGET ----
 *
 * He hit `minWords: 50` with exactly 50 words. The screen said "Goal reached",
 * which is true and was read as "done". This does not block anything — landing
 * on the minimum is allowed — it just stops the screen calling the floor a
 * finish line.
 */
export function lengthNote(text, { minWords = 0, minSentences = 0 } = {}) {
  const words = wordsOf(text).length;
  const sentences = sentencesOf(text).length;
  if (minWords > 0 && words >= minWords && words <= Math.ceil(minWords * 1.1)) {
    return `${words} words — that is the minimum, not the target. The best entries go past it.`;
  }
  if (minSentences > 0 && sentences === minSentences) {
    return `${sentences} sentences — exactly the minimum. Worth one more.`;
  }
  return null;
}

/**
 * Everything the Save button needs to decide what to say.
 *
 * `issues` is ordered TASK FIRST, then mechanics. Not doing the assignment is a
 * bigger problem than a missing capital, and the first line he reads should be
 * the one that matters most.
 */
export function checkWriting(text, { requirements = [], minWords = 0, minSentences = 0 } = {}) {
  const task = taskIssues(text, requirements);
  const mechanics = mechanicsIssues(text);
  return {
    issues: [...task, ...mechanics],
    taskCount: task.length,
    mechanicsCount: mechanics.length,
    note: lengthNote(text, { minWords, minSentences }),
    words: wordsOf(text).length,
    sentences: sentencesOf(text).length
  };
}

/**
 * ===========================================================================
 * ARRIVED FROM A CURRICULUM FOLDER — §3c Step 1, slice 1. (Sept 1, 2026.)
 * ===========================================================================
 *
 * "234 of 350–500 words" — where a draft stands against its target, for the
 * live counter on the box it is being typed into.
 *
 * The TARGET is the school's: how long a book report should be is a teaching
 * decision, and it is handed in as `size`. Comparing a count to a range is
 * not, and it lived in a curriculum folder only because the targets did.
 *
 * Returns null when the format is not measured in words — a podcast, a
 * debate — because a word count there is a number that means nothing.
 */
export function wordProgress(size, count) {
  if (!size?.words) return null;
  const [min, max] = size.words;
  return {
    min,
    max,
    count,
    /** 'short' | 'in-range' | 'over' — 'over' is not a failure, just worth knowing. */
    state: count < min ? 'short' : count <= max ? 'in-range' : 'over',
    label: `${count} of ${min}–${max} words`
  };
}
