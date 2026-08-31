/**
 * =============================================================================
 * THE DRILLS WHOSE TASK NAMES A PHRASE THE APP CAN CHECK FOR.
 * =============================================================================
 *
 * ---- WHY THIS EXISTS (Aug 25, 2026) ----
 *
 * `wd-w04-d2` asked for four claims, each followed by a sentence beginning
 * "For example,". He wrote **zero** — he wrote about Minecraft — and the app
 * counted eight sentences, matched `minSentences: 8`, saved it and paid him 15
 * XP. His mother found out days later and graded it D-.
 *
 * The requirement was written down in the drill the whole time, in its `task`
 * and again in its `checkFor`. Both are prose, written for a human. Nothing
 * could read them.
 *
 * ---- WHY A SEPARATE FILE, KEYED BY ID ----
 *
 * The alternative was a `requires` field on each drill, which means editing four
 * data files holding 308 drills to add a field that 298 of them will never use.
 * This keeps the machine-checkable spec in one place a person can audit in a
 * minute, and a guard asserts every id here exists in the real drill set.
 *
 * ---- WHY NOT DERIVE IT FROM THE TASK TEXT ----
 *
 * Tempting, and wrong. Eight drills quote a phrase; **three of the eight are
 * quoting something that is not a requirement at all** — `wd-w07-d3` quotes the
 * overloaded sentence he is meant to BREAK UP, `wd-w19-d3` quotes an abstract
 * form, `wd-w24-d3` quotes the name of a fallacy. A rule that derived
 * requirements from quotation marks would fail him for not copying out the
 * sentence he was asked to rewrite. Judgment is required, so judgment is
 * recorded — once, here.
 *
 * `REVIEWED_NO_REQUIREMENT` below is the other half of that judgment and is
 * load-bearing: a guard requires that EVERY drill whose task contains a quoted
 * phrase appears in one list or the other. A new drill with a quote in it
 * cannot be silently missed — the guard fails until someone decides which list
 * it belongs in.
 */

/**
 * Shapes, all three of which occur in the real set:
 *
 *   { phrase, min }        at least N occurrences
 *   { anyOf: [...], min }  N occurrences across accepted alternatives
 *   { phrase, max }        at most N — the drill that forbids a phrase
 *
 * `note` is shown to him with the issue, so a miss explains itself.
 */
export const DRILL_REQUIREMENTS = {
  'wd-w04-d2': [
    {
      phrase: 'For example,',
      min: 4,
      note: 'One under each of your four claims.'
    }
  ],
  'wd-w10-d3': [
    {
      phrase: 'So what?',
      min: 2,
      note: 'One after each paragraph, then answer it.'
    }
  ],
  'wd-w11-d1': [
    {
      phrase: 'and then',
      max: 0,
      note: 'That is the crutch this drill exists to break. Use a real time transition instead.'
    }
  ],
  'wd-w14-d1': [
    {
      anyOf: ['That shows', 'What that means is'],
      min: 3,
      note: 'One explaining sentence after each of your three facts.'
    }
  ],
  'wd-w14-d3': [
    {
      anyOf: ['Admittedly', 'It is true that'],
      min: 2,
      note: 'One in each paragraph — the objection you then answer.'
    }
  ]
};

/**
 * Drills whose task quotes something that is NOT a requirement. Reviewed by
 * hand on Aug 25, 2026; listed so the coverage guard can tell "decided against"
 * apart from "never looked at".
 */
export const REVIEWED_NO_REQUIREMENT = {
  'wd-w07-d3': 'The quote is the overloaded sentence he must BREAK UP. Requiring it would fail him for rewriting it, which is the task.',
  'wd-w19-d3': 'The quote is an abstract form — "X, because A, B and C" — not text to reproduce.',
  'wd-w24-d3': 'The quote names a fallacy ("after it, therefore because of it"). He writes examples of it, not the words.'
};

/** Requirements for a prompt id, or [] — every non-drill prompt has none. */
export function requirementsFor(promptId) {
  return DRILL_REQUIREMENTS[promptId] || [];
}
