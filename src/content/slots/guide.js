// ---------------------------------------------------------------------------
// THE GUIDE SLOT ANSWERS A QUESTION: WHAT DOES THIS SCHOOL'S GUIDE SAY TODAY?
//
// Second of the slot interfaces. `theme.js` is the first and sets the pattern;
// read that one if this is the first you have opened.
//
// ---- WHY THIS FILE EXISTS AT ALL ----
//
// It was started and abandoned. The panel that uses it was rewritten to import
// it, the module was never written, and the half-finished panel sat in the tree
// for two days importing something that did not exist. Two checks found it on
// the same run — the boot sweep, which could not load the platform, and the
// dead-code check, which saw a component nothing imports. Neither had to guess
// what was wrong, which is the argument for both of them.
//
// ---- WHAT MOVED, AND WHY IT IS NOT A RENAME ----
//
// The slot used to hand over a named function:
//
//     const { getDailyLine = () => null } = academySlot;
//     const line = getDailyLine(today);
//
// Three faults in three lines, and they are different in kind.
//
//   1. A school could only ever be a JavaScript module. A folder can export a
//      function; a stored row cannot. Every slot that demands a function is a
//      slot a stored school can never fill — and a platform that cannot read a
//      stored school cannot add a family without a deploy.
//   2. The destructure ran at MODULE SCOPE, so it read whichever school was
//      installed when the file was first imported — once, before a school can
//      be switched. That is the exact shape of the white-page fault this repo
//      has already paid for.
//   3. The fallback returned `null` and the caller immediately read a property
//      off it. A school with no lines did not show a blank quote; it threw.
//
// So the platform now asks a question and decides what to do with the answer.
//
//     dailyLines  — the pool this school's guide speaks from.
//
// The PICK is behaviour: one line per day, the same line all day, the same on
// every machine, no storage. That is the platform's job and it is done here,
// once, rather than reimplemented by each school that wants a guide.
//
// ---- THE TWO SHAPES AN ANSWER MAY TAKE, AND WHY BOTH ARE NEEDED ----
//
// AN ARRAY, for a school that is data:
//
//     dailyLines: ['Start with the thing you are avoiding.', ...]
//
// or, where a school has a checked attribution to carry:
//
//     dailyLines: [{ text: '...', who: 'Katherine Johnson' }, ...]
//
// A string and an object are both accepted because a pool typed into a form by
// a parent is a list of strings, and demanding `{ text, who: null }` of someone
// with nothing to attribute is a tax on the common case.
//
// A FUNCTION, for a school that lives in a folder:
//
//     getDailyLine: (dateStr) => ({ text, who })
//
// Kept working on purpose, not for tidiness: every school in this build answers
// this way today, and a migration that breaks the schools it is migrating is
// not a migration. A school answering with a function owns its own pick, so it
// is exempt from nothing — if its pick re-rolls per render, that is its bug.
//
// THIS PATH IS THE ONE TO REMOVE. It goes when the template answers with an
// array, and it may go without ceremony: nothing else in the platform reads a
// name out of this slot, so the day `getDailyLine` stops being destructured
// anywhere it drops out of the generated inventory on its own, and every
// Academy owes one name fewer.
//
// ---- WHY A MISSING ANSWER IS EMPTY AND NOT A DEFAULT LINE ----
//
// A platform-owned line would be platform-owned CONTENT — a sentence in a
// child's voice that no parent chose and no Academy folder contains. The whole
// standard this build is being held to says that belongs in a school.
//
// So an unanswered slot returns empty text and the screen shows no quote. The
// panel still reports where the learner actually is, which is the part worth
// opening. A school that wants a guide with something to say inherits the
// template's pool, which is what the template is for.
//
// ---- WHY A BAD ANSWER DEGRADES INSTEAD OF THROWING ----
//
// Same rule as the theme slot, for the same reason: a throw here reaches the
// shell's catch and a child sees a school that will not open. An unusable
// answer is an authoring mistake, and the place to catch an authoring mistake
// is a check before a deploy — `scripts/verify-slot-guide.mjs` — not a screen
// on a school morning.
// ---------------------------------------------------------------------------

/**
 * What the platform asks of this slot.
 *
 * Exported so a check can assert against it rather than retyping the word, and
 * so the eventual "does this school answer every question its slots claim to
 * answer" check has something to read.
 */
export const GUIDE_QUESTIONS = Object.freeze(['dailyLines']);

/** What an unanswered slot resolves to. Shared, frozen, never null. */
export const NO_LINE = Object.freeze({ text: '', who: null });

/**
 * A stable number from a string.
 *
 * The same date must give the same line all day, on every machine, without
 * storing anything, so the seed is hashed rather than randomised. A random pick
 * re-rolls on every React render and rewrites the line mid-screen. That was a
 * real bug once, which is why it is written down here rather than remembered.
 */
function hashString(value) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

/**
 * Which line a given day gets.
 *
 * Exported so a check can assert the two properties that matter — the same date
 * gives the same index, and the index is always inside the pool — by calling
 * it, rather than by matching the punctuation of the arithmetic.
 *
 * A date it cannot read resolves to the first line rather than to nothing: a
 * guide that goes silent because a clock returned something odd is a worse
 * failure than a guide that repeats.
 */
export function pickIndexForDate(dateStr, length) {
  if (!Number.isInteger(length) || length <= 0) return -1;
  const key = String(dateStr ?? '').slice(0, 10);
  if (!key) return 0;
  return hashString(key) % length;
}

/**
 * One pool entry, in the shape the screen reads.
 *
 * Returns null for an entry with nothing to say, so an empty string sitting in
 * the middle of a pool costs that school one line rather than one silent day.
 */
function normalizeEntry(entry) {
  if (typeof entry === 'string') {
    const text = entry.trim();
    return text ? { text, who: null } : null;
  }
  if (entry && typeof entry === 'object' && typeof entry.text === 'string') {
    const text = entry.text.trim();
    if (!text) return null;
    const who = typeof entry.who === 'string' && entry.who.trim() ? entry.who.trim() : null;
    return { text, who };
  }
  return null;
}

/**
 * The guide's line for a given day.
 *
 * ALWAYS returns `{ text, who }`. Never null, never a throw. Every caller may
 * read `.text` and `.who` without guarding, and a caller that wants to know
 * whether there is anything to show tests `line.text` — which is a string, and
 * empty when this school has no answer.
 *
 * `guide` is a parameter rather than a global read for the same reason
 * `applyAppearance` takes a document: so a check can hand it a stand-in and
 * assert what it actually did, and so the caller reads the slot at render time
 * instead of at import time.
 */
export function dailyLineFor(guide, dateStr) {
  if (!guide || typeof guide !== 'object') return NO_LINE;

  const answer = guide.dailyLines;
  if (Array.isArray(answer)) {
    const pool = answer.map(normalizeEntry).filter(Boolean);
    const index = pickIndexForDate(dateStr, pool.length);
    return index < 0 ? NO_LINE : pool[index];
  }

  // The folder shape. Its pick is its own; all this does is refuse to trust the
  // result, because an exception raised inside a school must not close a school.
  if (typeof guide.getDailyLine === 'function') {
    try {
      return normalizeEntry(guide.getDailyLine(dateStr)) ?? NO_LINE;
    } catch {
      return NO_LINE;
    }
  }

  return NO_LINE;
}
