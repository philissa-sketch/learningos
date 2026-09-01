/**
 * =============================================================================
 * READING THE SHAPE OF A TIMETABLE, WITHOUT KNOWING WHOSE IT IS.
 * =============================================================================
 *
 * ---- WHY THIS IS THE PLATFORM'S AND NOT A SCHOOL'S (Sept 1, 2026) ----
 *
 * Arrived here from a curriculum folder in §3c Step 1, slice 1.
 *
 * A week pattern is a school's: which days exist, what runs on them, and which
 * quarters differ are all teaching decisions and none of them belong here.
 * Pulling the right list out of one of those patterns is not a teaching
 * decision at all — it is the same two lines for every school that will ever
 * be enrolled, and it was in a curriculum folder only because the patterns
 * were.
 *
 * This file is deliberately small. §3c Step 3 turns `timetable` from a list of
 * names into a shape — *"is today a school day, and what is on it?"* — and this
 * is the first piece of that shape to have no school in it.
 */

/**
 * The subjects a pattern runs, for a given quarter.
 *
 * A pattern carries a default list and may carry per-quarter overrides. A null
 * quarterId means the caller does not know or does not care and gets the
 * default shape.
 *
 * It never returns undefined. A day with neither key would otherwise crash
 * every caller that maps over the result, and a school legitimately has days
 * with nothing on them.
 */
export function patternSubjects(pattern, quarterId = null) {
  if (!pattern) return [];
  const override = quarterId && pattern.subjectsByQuarter?.[quarterId];
  return override || pattern.subjects || [];
}
