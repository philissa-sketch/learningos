/**
 * =============================================================================
 * THE SUBJECTS SLOT — the school says what its subjects are called; the
 * platform looks them up.
 * =============================================================================
 *
 * ---- WHY THIS EXISTS (audit finding 1 — "a school cannot be data") ----
 *
 * The `subjects` slot used to hand over four FUNCTIONS: `canonicalSubject`,
 * `isKhanTaughtSubject`, `subjectCardLabel` and `strandsForSubject`. A stored
 * Academy cannot hold a function, so each was a reason a second family could
 * only get a curriculum by someone writing JavaScript and deploying it.
 *
 * ---- THE TWO SCHOOLS DISAGREED, AND THE DISAGREEMENT WAS DATA ----
 *
 * Unlike the PE slot, the two Academies in this build did not hand over the same
 * functions with different tables. They wrote DIFFERENT functions:
 *
 *   * one folds every id to lower case before anything else; the other has
 *     camelCase ids that folding would break;
 *   * one maps five spellings onto two subjects; the other maps one retired
 *     subject onto the subject that absorbed it;
 *   * one looks a subject up only after tidying its spelling; the other
 *     looked it up raw, so a record filed under its retired id never matched.
 *
 * Every one of those is a fact about a school's own ids, so each is asked for
 * as data: SUBJECT_ALIASES, SUBJECT_ID_CASE and STRANDS. Measured against both
 * schools' original functions on 63 inputs each, the only differences left are
 * (a) `undefined` now reads as `null`, and (b) the first school's retired
 * writing id now reads as its merged subject's name and counts as Khan-taught, which
 * the parent chose on Sept 21, 2026 — the report card already treated it so.
 */

/**
 * What the platform asks this slot for, beyond the lists screens destructure.
 *
 * Exported so a check can assert against it rather than retyping the words.
 */
export const SUBJECT_QUESTIONS = Object.freeze([
  'SUBJECT_LABELS',
  'SUBJECT_CARD_LABELS',
  'SUBJECT_ALIASES',
  'SUBJECT_ID_CASE',
  'STRANDS',
  'KHAN_TAUGHT_SUBJECTS'
]);

const slot = (content) => (content && typeof content.subjects === 'object' && content.subjects) || {};

/**
 * One spelling for a subject.
 *
 * A school whose ids are all lower case says `SUBJECT_ID_CASE: 'lower'` and
 * every spelling is folded before it is looked up. A school that says nothing
 * keeps its ids exactly as written — folding is never the default, because it
 * would silently turn a camelCase id into a subject nobody has.
 *
 * Unknown ids pass through rather than being coerced to a default: a subject
 * nobody recognises should look wrong on the screen, not be relabelled.
 */
export function canonicalSubject(content, subject) {
  if (subject === null || subject === undefined || subject === '') return null;
  const s = slot(content);
  const aliases = s.SUBJECT_ALIASES || {};
  const id = s.SUBJECT_ID_CASE === 'lower' ? String(subject).toLowerCase() : String(subject);
  return aliases[id] ?? id;
}

/** Whether this school teaches a subject through an outside course provider. */
export function isKhanTaughtSubject(content, subject) {
  const list = slot(content).KHAN_TAUGHT_SUBJECTS;
  return Array.isArray(list) && list.includes(canonicalSubject(content, subject));
}

/** Every strand this school files under a subject, in its own order. */
export function strandsForSubject(content, subject) {
  const strands = slot(content).STRANDS;
  if (!Array.isArray(strands)) return [];
  return strands.filter((st) => st && st.subject === subject);
}

/** A strand's name, or its id when this school has not named it. */
export function strandLabel(content, strandId) {
  const strands = slot(content).STRANDS;
  const st = Array.isArray(strands) ? strands.find((x) => x && x.id === strandId) : null;
  return st?.label || strandId;
}

/**
 * What the learner reads on a card, in this order:
 *   1. the school's friendlier card name
 *   2. its formal name
 *   3. a strand's card name, then its name, when the id is a strand
 *   4. the id itself
 *
 * The id is last on purpose: an unnamed subject should show as itself rather
 * than as a blank row.
 */
export function subjectCardLabel(content, subject) {
  const id = canonicalSubject(content, subject);
  if (id === null) return null;
  const s = slot(content);
  const st = Array.isArray(s.STRANDS) ? s.STRANDS.find((x) => x && x.id === id) : null;
  return s.SUBJECT_CARD_LABELS?.[id] || s.SUBJECT_LABELS?.[id] || st?.cardLabel || st?.label || id;
}
