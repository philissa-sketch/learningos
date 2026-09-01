/**
 * ===========================================================================
 * CHANGING THE BOOK ON A READING ASSIGNMENT.
 * ===========================================================================
 *
 * The parent, Aug 28 2026: *"There is a book report and the book is Hatchet.
 * Can I change that book to another book that is in his book list?"*
 *
 * She could not. The Academic Success Center's assignments are seeded slots,
 * and the Parent Dashboard could CREATE a custom assignment but never retitle
 * an existing one. Nineteen books are scheduled across the year, so "ask me to
 * edit the code" was the wrong answer nineteen times over.
 *
 * ---- WHY THE LOGIC LIVES HERE AND NOT IN THE COMPONENT ----
 *
 * Because a guard cannot execute a component. Every rule below is a pure
 * function over plain data, so `verify-book-swap.mjs` runs the real thing
 * rather than a copy of it — the same reason `hqGeometry.js` and `pacing.js`
 * exist as libraries.
 *
 * ---- THE TWO SLOTS RULE ----
 *
 * A book is almost never one assignment. Q1 reading is:
 *
 *     asg::reading::Q1::1   Reading Assignment   "Hatchet — Gary Paulsen"
 *     asg::reading::Q1::2   Book Report          "Hatchet — book jacket redesign"
 *
 * Change only the report and he writes about a book he was never assigned to
 * read. **They move together, or not at all.**
 */

import { academyContent } from '../content/academyContent.js';

const { bookRecommendations } = academyContent().academicCenter;

/** The book name at the front of an assignment title, before the first dash. */
export const TITLE_SEPARATOR = ' — ';

export function bookNameFromTitle(title) {
  const t = String(title == null ? '' : title).trim();
  const i = t.indexOf(TITLE_SEPARATOR);
  return i >= 0 ? t.slice(0, i).trim() : t;
}

export function titleSuffix(title) {
  const t = String(title == null ? '' : title).trim();
  const i = t.indexOf(TITLE_SEPARATOR);
  return i >= 0 ? t.slice(i + TITLE_SEPARATOR.length).trim() : '';
}

/**
 * Rebuild an assignment title around a different book.
 *
 * The half after the dash is one of two completely different things:
 *
 *     "Hatchet — Gary Paulsen"                  <- an AUTHOR
 *     "Hatchet — book jacket redesign"          <- a description of the WORK
 *     "A Long Walk to Water — weekly chapter pacing"
 *
 * Replacing an author is required (leaving "Ghost — Gary Paulsen" would be a
 * lie on her records). Replacing a work description would destroy the
 * assignment — the report is still a book-jacket redesign, just of a different
 * book.
 *
 * The two are told apart by evidence, not by guessing: the suffix is an author
 * when it matches the old book's author OR any author the app knows. Anything
 * else is the work, and survives untouched.
 *
 * `library` is the list of his books: [{ title, author }, ...].
 */
export function retitleForBook(oldTitle, newBook, library = [], knownAuthors = KNOWN_AUTHORS) {
  const newTitle = String(newBook?.title || '').trim();
  if (!newTitle) return String(oldTitle == null ? '' : oldTitle);

  const oldName = bookNameFromTitle(oldTitle);
  const suffix = titleSuffix(oldTitle);
  if (!suffix) return newTitle;

  const oldEntry = library.find((b) => bookNameFromTitle(b?.title) === oldName || b?.title === oldName);
  const oldAuthor = String(oldEntry?.author || '').trim();

  /**
   * ---- WHY THERE IS A SECOND TEST HERE. (Caught by rendering it, Aug 28.) ----
   *
   * The first version only asked the LIBRARY for the old book's author. That
   * looked right in the code and produced **"Ghost — Gary Paulsen"** the moment
   * a frame was rendered — because Hatchet is not in his library. It was swapped
   * out of `book::reading::1` on Aug 7 and replaced by Ghost, so the assignment
   * still names a book the library no longer holds, and the lookup came back
   * empty. The suffix was then treated as a description of the work and kept —
   * putting Gary Paulsen's name on a Jason Reynolds novel, on her records.
   *
   * `knownAuthors` is every author string the app knows, from the library AND
   * the recommendation catalogue, which is where Hatchet's author still lives.
   * A suffix that IS one of those names is an author, whatever happened to the
   * book it belonged to.
   *
   * The renderer exists for exactly this. Reading the code, the first version
   * was obviously correct.
   */
  const authorSet = new Set(
    [...knownAuthors, ...library.map((b) => b?.author)]
      .map((a) => String(a == null ? '' : a).trim())
      .filter(Boolean)
  );

  if ((oldAuthor && suffix === oldAuthor) || authorSet.has(suffix)) {
    const newAuthor = String(newBook?.author || '').trim();
    return newAuthor ? newTitle + TITLE_SEPARATOR + newAuthor : newTitle;
  }

  // Otherwise the suffix describes the work. Keep it exactly.
  return newTitle + TITLE_SEPARATOR + suffix;
}

/** The subject::quarter a slot belongs to — 'asg::reading::Q1::2' -> 'reading::Q1'. */
export function slotGroup(slotId) {
  const parts = String(slotId == null ? '' : slotId).split('::');
  return parts.length >= 4 ? parts[1] + '::' + parts[2] : null;
}

/** An assignment nobody has touched yet. Started or finished work is never rewritten. */
export function isUnstarted(assignment) {
  const s = assignment?.status;
  return !s || s === 'not-started';
}

/**
 * Everything a book swap would change, worked out before anything is written.
 *
 * Returns `{ ok, reason, changes: [{ id, slotId, type, from, to }], blocked: [...] }`
 * so the UI can SHOW her the result before she commits to it, and so a guard
 * can assert the plan without touching a database.
 *
 * Companions are the other slots in the same subject::quarter whose title
 * starts with the same book — the Book Report, the Presentation. A slot in that
 * group about a DIFFERENT book is left alone: Social Studies Q1 holds both
 * "A Long Walk to Water" and "Red-Tail Angels", and swapping one must not
 * touch the other.
 */
export function planBookSwap({ assignmentId, newBook, assignments = [], library = [], knownAuthors = KNOWN_AUTHORS }) {
  const target = assignments.find((a) => a.id === assignmentId);
  if (!target) return { ok: false, reason: 'no-such-assignment', changes: [], blocked: [] };
  if (!newBook || !String(newBook.title || '').trim()) {
    return { ok: false, reason: 'no-book-chosen', changes: [], blocked: [] };
  }
  if (!isUnstarted(target)) {
    return { ok: false, reason: 'already-started', changes: [], blocked: [target] };
  }

  const oldName = bookNameFromTitle(target.title);
  if (!oldName) return { ok: false, reason: 'no-current-book', changes: [], blocked: [] };
  if (bookNameFromTitle(newBook.title) === oldName) {
    return { ok: false, reason: 'same-book', changes: [], blocked: [] };
  }

  const group = slotGroup(target.slotId);
  const family = assignments.filter(
    (a) => a.id === target.id || (group && slotGroup(a.slotId) === group && bookNameFromTitle(a.title) === oldName)
  );

  const changes = [];
  const blocked = [];
  for (const a of family) {
    if (!isUnstarted(a)) { blocked.push(a); continue; }
    const to = retitleForBook(a.title, newBook, library, knownAuthors);
    if (to === a.title) continue;
    changes.push({ id: a.id, slotId: a.slotId, type: a.type, from: a.title, to });
  }

  // The companion is blocked but the main one is not: refuse the whole swap
  // rather than leaving a report about a book he is no longer reading.
  if (blocked.length > 0) {
    return { ok: false, reason: 'companion-started', changes: [], blocked };
  }
  if (changes.length === 0) return { ok: false, reason: 'nothing-to-change', changes: [], blocked: [] };
  return { ok: true, reason: null, changes, blocked: [] };
}

/** Plain-English reason a swap was refused, for the parent rather than the log. */
export const SWAP_REFUSAL_TEXT = {
  'no-such-assignment': 'That assignment is no longer in the list.',
  'no-book-chosen': 'Pick a book first.',
  'already-started': 'He has already started this one. Changing the book now would rewrite work he has done.',
  'companion-started': 'He has already started the book report for this book, so the pair cannot be changed together.',
  'no-current-book': 'This assignment has no book on it to replace.',
  'same-book': 'That is already the book on this assignment.',
  'nothing-to-change': 'Nothing would change.'
};

/**
 * Every author name the app knows, from the recommendation catalogue.
 *
 * Built once and exported so the store, the picker and the guard all use the
 * SAME list. The catalogue is the right source because it outlives the library:
 * a book can be swapped out of his shelves and the assignment can still name it.
 */
export function catalogueAuthors(recommendations) {
  const out = new Set();
  const walk = (node) => {
    if (!node) return;
    if (Array.isArray(node)) { node.forEach(walk); return; }
    if (typeof node === 'object') {
      const a = String(node.author == null ? '' : node.author).trim();
      if (a) out.add(a);
      Object.values(node).forEach(walk);
    }
  };
  walk(recommendations);
  return [...out];
}

/**
 * The author index, built once at module load.
 *
 * Exported as a DEFAULT argument rather than something each caller passes,
 * because "every call site must remember to pass this" is the shape of bug this
 * project has now hit nine times. A caller that forgets gets the right answer.
 */
export const KNOWN_AUTHORS = catalogueAuthors(bookRecommendations);
