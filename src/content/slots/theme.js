// ---------------------------------------------------------------------------
// THE THEME SLOT ANSWERS A QUESTION: WHAT DOES THIS SCHOOL LOOK LIKE?
//
// First of the slot interfaces. The pattern here is the pattern every other
// slot follows, so it is worth reading once even though this one is small.
//
// ---- WHAT CHANGED, AND WHY IT IS NOT A RENAME ----
//
// The slot used to be:
//
//     export const theme = { load: () => import('./academy.css') };
//
// and the shell called `theme.load()`. That is the platform demanding a named
// FUNCTION. Two things follow from it, and both are blocking:
//
//   1. A school can never be stored data. A folder is a JavaScript module and
//      can export a function; a row in a database cannot. Every slot that hands
//      over a function is a slot a stored pack can never fill.
//   2. The platform cannot check that a school answered. It can only check that
//      a name exists — which is how an Academy came to be reported 140 names
//      short of a contract most of whose names were never its to supply.
//
// So the slot now answers a QUESTION the platform asks, and the platform — not
// the school — decides what to do with the answer.
//
//     appearance  — this school's own styling.
//
// ---- THE TWO SHAPES AN ANSWER MAY TAKE, AND WHY BOTH ARE NEEDED ----
//
// A FUNCTION that loads a stylesheet, for a school that lives in a folder:
//
//     appearance: () => import('./academy.css')
//
// The sheet is compiled at build time, so it may use the whole CSS toolchain,
// and it travels in that school's own chunk rather than in every learner's
// download. That is the reason it is a function and not a static import, and
// the reason is unchanged.
//
// A STRING of plain CSS, for a school that is data:
//
//     appearance: ':root { --accent: 125 145 170; }'
//
// Attached at runtime, so no build step runs over it and no build-time
// directive works inside it — variables and ordinary rules only. That is the
// honest limit of a stored answer and it is stated here rather than discovered.
//
// A school that answers neither gets no styling of its own. It inherits the
// template's, which is a plain readable school rather than a white page.
//
// ---- WHY A BAD ANSWER DEGRADES INSTEAD OF THROWING ----
//
// A throw here reaches the shell's catch and the child sees a school that will
// not open. An unusable answer is an authoring mistake, and the right place to
// catch an authoring mistake is a check before a deploy, not a screen on a
// school morning. `scripts/verify-slot-theme.mjs` refuses an answer of the
// wrong shape, so this returning `unusable` is a state a build never reaches.
// ---------------------------------------------------------------------------

/**
 * What the platform asks of this slot.
 *
 * Exported so a check can assert against it rather than retyping the word, and
 * so the eventual "does this school answer every question its slots claim to
 * answer" check has something to read.
 */
export const THEME_QUESTIONS = Object.freeze(['appearance']);

/**
 * The element a string answer is attached to.
 *
 * One id, reused: a school that is repointed replaces its styling rather than
 * stacking a second sheet on top of the first.
 */
export const APPEARANCE_STYLE_ID = 'academy-appearance';

/**
 * Apply a school's answer to `appearance`.
 *
 * `doc` is a parameter rather than a global read so a check can call this with
 * a stand-in and assert what it actually did — the difference between testing
 * the behaviour and testing a regex over the source.
 *
 * Returns what it applied: 'module', 'css', or 'none' with a reason.
 */
export async function applyAppearance(theme, doc = globalThis.document ?? null) {
  const answer = theme?.appearance;

  if (answer === undefined || answer === null) return { applied: 'none', reason: 'unanswered' };

  if (typeof answer === 'function') {
    await answer();
    return { applied: 'module' };
  }

  if (typeof answer === 'string') {
    if (!answer.trim()) return { applied: 'none', reason: 'unanswered' };
    if (!doc) return { applied: 'css', attached: false };
    let el = doc.getElementById(APPEARANCE_STYLE_ID);
    if (!el) {
      el = doc.createElement('style');
      el.id = APPEARANCE_STYLE_ID;
      doc.head.appendChild(el);
    }
    el.textContent = answer;
    return { applied: 'css', attached: true };
  }

  return { applied: 'none', reason: 'unusable' };
}
