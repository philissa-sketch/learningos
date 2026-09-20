import { academyContent } from '../content/academyContent.js';
import { optionalContent } from '../content/slots/optional.js';

// Only what the three builders below actually use. The other four helpers
// went with the questions that needed them — see this school's practice folder.
import { choice, randInt } from './mathHelpers.js';

/** Shuffles a copy of the array in place (Fisher-Yates) — shared by bank-based generators. */
export function shuffleWithinTemplate(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = randInt(0, i);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Builds a choice question from a fact-bank entry, with per-wrong-answer
 * diagnosis that stays correctly aligned even after the choices are
 * shuffled. Each distractor carries its OWN specific feedback (not a
 * generic "that's wrong") — for historical/factual content, this means
 * explaining what the distractor actually IS and why it's a different
 * fact than what the question asked for, the same diagnostic standard
 * used throughout the Math rebuild.
 *
 * entry shape: { prompt, explanation, correct, distractors: [{ text,
 * feedback }, ...] }
 */
export function buildFactBankQuestion(entry, xp = 10) {
  const options = [{ text: entry.correct, feedback: null }, ...entry.distractors];
  const shuffled = shuffleWithinTemplate(options);
  const answerIndex = shuffled.findIndex((o) => o.text === entry.correct);
  return {
    type: 'choice',
    prompt: entry.prompt,
    choices: shuffled.map((o) => o.text),
    answer: answerIndex,
    explanation: entry.explanation,
    choiceFeedback: shuffled.map((o) => o.feedback),
    xp
  };
}

/**
 * Wraps a fact bank into a `build` function that avoids repeating any of
 * the most recently shown entries. Independent random draws from a small
 * bank are nearly guaranteed to repeat — a 4-item bank drawn 4 times has
 * a ~90% chance of showing at least one repeat, confirmed directly
 * rather than assumed. This was a real, reported issue (the same
 * question appeared twice in one practice session).
 *
 * A first fix (shuffle-once-per-cycle, avoid only an immediate repeat at
 * the reshuffle boundary) turned out insufficient: React's StrictMode
 * deliberately double-invokes `useState` lazy initializers in
 * development (confirmed directly — this app wraps <App /> in
 * <React.StrictMode>, and `npm run dev` is a development build), which
 * silently consumes an extra draw on every practice mount. That extra,
 * invisible draw can shift a bank-sized cycle out of alignment with the
 * visible question count, letting a NON-adjacent repeat slip through
 * (e.g. positions 1 and 4 matching, confirmed happening in real testing).
 *
 * This version uses a sliding-window exclusion instead of a cycle: each
 * draw excludes whichever entries were shown in the last (bank.length -
 * 1) draws, so any window of bank.length CONSECUTIVE draws is
 * guaranteed unique — regardless of how many extra silent draws happen
 * anywhere in between, not just immediately before.
 */
export function makeNoRepeatFactBankGenerator(bank) {
  let recentlyShown = [];
  return () => {
    const available = bank.filter((entry) => !recentlyShown.includes(entry));
    const entry = available.length > 0 ? choice(available) : choice(bank);
    recentlyShown.push(entry);
    if (recentlyShown.length > bank.length - 1) recentlyShown.shift();
    return buildFactBankQuestion(entry);
  };
}

// ---------------------------------------------------------------------------

/**
 * ---- WHERE THE QUESTIONS LIVE NOW (Sept 20, 2026) ----
 *
 * This file was 14,164 lines, and 14,063 of them were one child's curriculum
 * sitting in the platform's engine folder (GENERIC_CARRYOVER fault 1). The
 * questions are that school's content and moved to its own folder; the three
 * builders above are mechanism and stayed, exported for the school to use.
 *
 * Read INSIDE each accessor, never at module scope. These four functions are
 * imported by screens, by the daily-practice engine and by check scripts, and
 * a module-scope read would run at import — before any school is mounted —
 * which is the rule GENERIC_CARRYOVER records and the mistake found in
 * src/lib/fieldTrips.js two moves ago.
 *
 * A school with no practice questions gets an empty list and every accessor
 * answers honestly: no templates, rather than a throw.
 */
function templatesOf() {
  const answer = optionalContent(academyContent(), 'practice').templates;
  return Array.isArray(answer) ? answer : [];
}

export function getTemplatesFor(subject, tier) {
  return templatesOf().filter((t) => t.subject === subject && t.tier === tier);
}

/** All templates at or below the given tier — used for spaced-repetition practice sets. */
export function getTemplatesUpToTier(subject, maxTier) {
  return templatesOf().filter((t) => t.subject === subject && t.tier <= maxTier);
}

export function getAllTemplates() {
  return templatesOf();
}

export function getTemplateById(id) {
  return templatesOf().find((t) => t.id === id);
}
