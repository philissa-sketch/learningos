/**
 * =============================================================================
 * OPTIONAL CONTENT — what a screen ASKS a school for and does without.
 * =============================================================================
 *
 * ---- THE FAULT THIS REPLACES (Sept 17, 2026) ----
 *
 * The parent, about two activities only her son does: *"They are supposed to
 * be in his school only. Not in the other school and not in the generic
 * version."*
 *
 * They were in all three. Ten screens read their content the mandatory way:
 *
 *     const { someList = [], someLookup = () => null } = academyContent().electives;
 *
 * Every read in that shape is counted by `scripts/scan-content-needs.mjs` and
 * lands in `academy-content-needs.json`, which is the list EVERY Academy must
 * supply. So a school whose child does not do those activities was failing the
 * content interface over twenty names for work it does not do — twenty of the
 * hundred and forty a second school owed.
 *
 * The defaults on those reads were already saying the truth: a screen that
 * writes `= []` has decided what to do when the answer is missing. The contract
 * disagreed with the code, and the contract was wrong.
 *
 * ---- WHAT THIS IS ----
 *
 * One function. It hands back a slot's content, or an empty object when the
 * school does not fill that slot, so the reading screen's own defaults apply:
 *
 *     const { someList = [] } = optionalContent(academyContent(), 'electives');
 *
 * REQUIRED and OPTIONAL now look different in the source, which is the whole
 * point: `academyContent().timetable` says every school must answer, and
 * `optionalContent(academyContent(), 'electives')` says this screen asks and
 * copes. The scan counts the first shape and not the second, so the inventory
 * finally means what its own description claims.
 *
 * ---- WHAT IT IS NOT ----
 *
 * It is not a way to make a required name look optional. A screen the school
 * cannot work without — the timetable, the subject list — keeps reading the
 * mandatory way. The test is whether the screen still makes sense with nothing
 * there: a tab for an activity this school does not run makes sense empty, and
 * an empty timetable does not.
 *
 * It does not decide whether a tab appears. A school declares its own tabs in
 * the `nav` slot, so a school that does not run an activity never shows its tab
 * at all; this is what the screen behind it does if it is ever opened anyway.
 *
 * It names no subject, no school and no activity, and it never will — the
 * caller names what it is asking for, because the caller is the thing that
 * belongs to one school.
 */

/**
 * A school's content for one slot, or an empty object.
 *
 * Never throws and never returns null: a screen reading this is rendering, and
 * a throw there reaches the shell's catch and shows a child a school that will
 * not open. An absent slot is an absent screen, never a broken one.
 *
 * @param {object} content  the pack — `academyContent()`
 * @param {string} slot     the slot this screen asks for
 */
export function optionalContent(content, slot) {
  if (!content || typeof content !== 'object') return EMPTY;
  if (typeof slot !== 'string' || !slot) return EMPTY;
  const answer = content[slot];
  if (!answer || typeof answer !== 'object' || Array.isArray(answer)) return EMPTY;
  return answer;
}

/** Frozen, and the same object every time — so a caller cannot write into it. */
const EMPTY = Object.freeze({});

/** True when the school filled this slot with anything at all. */
export function hasOptionalContent(content, slot) {
  return Object.keys(optionalContent(content, slot)).length > 0;
}
