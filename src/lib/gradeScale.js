/**
 * Percentage → letter grade, in one place.
 *
 * The parent, Aug 7 2026: "I will like to enter in the percentage of the Unit
 * and Course Challenge. Based on the percentage Mission Control creates the
 * letter grade. I will like both the percentage and letter grade to be shown
 * side by side."
 *
 * Before this, grading a Khan unit meant reading Khan's mastery wording
 * ("Proficient", "Familiar") off the screen, mentally converting it to a
 * letter, and picking from seven buttons. Three lossy steps, done 151 times
 * across the year, each one a chance to grade the same performance two
 * different ways in October and March. The percentage is the number Khan
 * actually shows; the letter should be derived from it, not guessed alongside
 * it.
 *
 * THE SCALE is the standard US 10-point scale with plus/minus. Georgia does
 * not prescribe a grading scale for home study programs — the parent sets it —
 * so the right default is the one a college admissions office reads without
 * needing a key, which is this one. It is defined as data below rather than a
 * chain of if-statements so it can be printed on the screen next to the entry
 * box: a scale the parent cannot see is a scale she cannot trust.
 */

export const GRADE_SCALE = [
  { letter: 'A+', min: 97, max: 100 },
  { letter: 'A', min: 93, max: 96 },
  { letter: 'A-', min: 90, max: 92 },
  { letter: 'B+', min: 87, max: 89 },
  { letter: 'B', min: 83, max: 86 },
  { letter: 'B-', min: 80, max: 82 },
  { letter: 'C+', min: 77, max: 79 },
  { letter: 'C', min: 73, max: 76 },
  { letter: 'C-', min: 70, max: 72 },
  { letter: 'D+', min: 67, max: 69 },
  { letter: 'D', min: 63, max: 66 },
  { letter: 'D-', min: 60, max: 62 },
  { letter: 'F', min: 0, max: 59 }
];

/** Colour by letter FAMILY, so A+/A/A- all read the same at a glance. The
 *  point of colour here is "how is he doing", not "which of thirteen buckets". */
const FAMILY_COLOR = {
  A: 'text-signal-green',
  B: 'text-signal-cyan',
  C: 'text-amber-400',
  D: 'text-orange-400',
  F: 'text-signal-red'
};

export function gradeColor(letter) {
  if (!letter) return 'text-ink-100';
  return FAMILY_COLOR[String(letter).charAt(0).toUpperCase()] || 'text-ink-100';
}

/**
 * ===========================================================================
 * WHATEVER KHAN PUT ON HER SCREEN, TYPED STRAIGHT IN. (Aug 10, 2026.)
 * ===========================================================================
 *
 * The parent: "the grades for Kahn Academy are in fractions not percentage. So
 * is there a way that i put the fractions in and the app creates the
 * percentage and letter grade?"
 *
 * Khan's progress page reports a unit test as **9/11**, **8/10**, **4/6** — a
 * fraction, and the denominator is not even constant between units. This box
 * only took a percentage, so every single grade she entered began with mental
 * arithmetic she had to get right: 9/11 is 82%, and 9/11 is NOT 90%, which is
 * a whole letter grade of difference on a record she has to keep for years.
 *
 * The conversion is the computer's job. She types what she is looking at.
 *
 * Accepts, in any of these shapes:
 *   '82'  '82%'  ' 82.4 '  82        — a percentage, as before
 *   '9/11'  '9 / 11'  '8/10'         — correct over total, as Khan prints it
 *
 * Rejects '', 'abc', -5, 120, '12/10' (more right than there were), 'x/0'.
 * An out-of-range number is a typo, and silently clamping it to 100 would
 * record a grade she did not mean.
 *
 * Rounds to a whole number: Khan reports whole percentages, and 81.8181% on a
 * report card gains nothing over 82%.
 */
export function parseScore(input) {
  if (input === null || input === undefined) return null;
  const cleaned = String(input).trim().replace(/%$/, '').trim();
  if (cleaned === '') return null;

  // ---- a fraction, exactly as Khan shows it ----
  const fraction = cleaned.match(/^(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)$/);
  if (fraction) {
    const correct = Number(fraction[1]);
    const total = Number(fraction[2]);
    if (!Number.isFinite(correct) || !Number.isFinite(total)) return null;
    // A zero total is a division by zero, and more correct than there were
    // questions is a typo. Neither should quietly become a grade.
    if (total <= 0 || correct < 0 || correct > total) return null;
    return {
      percent: Math.round((correct / total) * 100),
      raw: `${fraction[1]}/${fraction[2]}`,
      correct,
      total
    };
  }

  // ---- a plain percentage ----
  const n = Number(cleaned);
  if (!Number.isFinite(n)) return null;
  if (n < 0 || n > 100) return null;
  return { percent: Math.round(n), raw: null, correct: null, total: null };
}

/**
 * The percentage alone. Every existing caller passes a number or a numeric
 * string and is unaffected; it now also understands '9/11', because there is
 * one parser in this app and adding a second would be how the two come to
 * disagree.
 */
export function parsePercent(input) {
  const parsed = parseScore(input);
  return parsed === null ? null : parsed.percent;
}

/**
 * A letter back to a percentage — the MIDDLE of its band.
 *
 * Needed because a book report is graded against a rubric and carries a letter
 * with no number behind it, and the subject grade averages numbers. B- is the
 * 80-82 band, so it counts as 81.
 *
 * The midpoint rather than the top of the band: taking the top would quietly
 * inflate every rubric-graded piece of work by up to three points against the
 * scored work it is averaged with, all year, in one direction.
 */
export function letterToPercent(letter) {
  const band = GRADE_SCALE.find((b) => b.letter === String(letter || '').trim().toUpperCase());
  if (!band) return null;
  return Math.round((band.min + band.max) / 2);
}

/** The letter for a percentage, or null if the percentage isn't usable. */
export function percentToLetter(percent) {
  const pct = parsePercent(percent);
  if (pct === null) return null;
  const band = GRADE_SCALE.find((b) => pct >= b.min && pct <= b.max);
  return band ? band.letter : null;
}

/**
 * The two things shown side by side, ready to render: `{ percent, letter }`.
 * Rows graded BEFORE this feature existed have a letter and no percentage —
 * they come back with `percent: null` and keep their letter, because
 * back-filling a percentage from a letter would be inventing a number she
 * never entered.
 */
export function displayGrade(row) {
  if (!row) return { percent: null, letter: null };
  const percent = parsePercent(row.gradePercent);
  return { percent, letter: row.grade || percentToLetter(percent) };
}

/** One-line summary of the scale, for printing next to the entry box. */
export const GRADE_SCALE_SUMMARY = GRADE_SCALE.map(
  (b) => `${b.letter} ${b.min === 0 ? `below ${b.max + 1}` : `${b.min}–${b.max}`}`
).join(' · ');
