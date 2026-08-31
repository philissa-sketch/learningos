import { dayPattern, WEEK_PATTERN, patternSubjects } from '../academies/lamar/data/schedule/weekPattern.js';
import { getCurrentQuarter } from './schoolQuarter.js';
import { allLessons } from '../academies/lamar/data/lessons/index.js';
import { SUBJECT_LABELS } from '../academies/lamar/subjects.js';

/**
 * WHAT IS ACTUALLY IN THE 2:15 BLOCK TODAY.
 *
 * The parent, Aug 9 2026: *"I dont understand the rotating block. Let's fix
 * that to have the actual course that will be there for the week. That will
 * show us if that is enough time."*
 *
 * She is right, and the label was the problem. block-9 read:
 *
 *   "Aerospace / Social Studies / Coding / Robotics / STEM Project ·
 *    Fridays: Gardening or Guitar Theory"
 *
 * Five subject names and a Friday clause, for a slot that only ever holds ONE
 * or TWO of them on any real day. A printed routine that lists everything it
 * could be tells you nothing about what it is, and — the reason this matters
 * beyond tidiness — it makes the block impossible to time. You cannot ask "is
 * 45 minutes enough" about a slash list.
 *
 * THE SCHEDULE IS A SINGLE DAY TEMPLATE; THE ROTATION IS WEEKLY. That mismatch
 * is why the label was written that way in the first place. One stored
 * `scheduleBlocks` array is reused for Monday through Friday, so no stored
 * string can be right on more than one day. The fix is therefore NOT to edit
 * the stored label — it is to resolve it at render time against the date being
 * displayed. The parent's own customisations to every other block are
 * untouched by this, and if she renames block-9 herself, hers wins (see
 * resolveBlockLabel below).
 *
 * "LIVE" MEANS THE SAME THING IT MEANS IN verify-curriculum.mjs, deliberately —
 * a subject is live in a quarter if it has quarter-tagged Mission Control
 * lessons in that quarter, OR Khan Academy rows batched to it. The second half
 * is not optional: Social Studies runs entirely on Khan Academy in Q1 and again
 * over Summer, so a Mission-Control-only test would silently drop it from every
 * Tuesday and Thursday of the first quarter — the exact kind of "the schedule
 * didn't tell him to do it" gap this project has already been caught by twice.
 *
 * WHEN IN DOUBT, SHOW MORE, NOT LESS. If the Khan rows are not available to the
 * caller, or if the filter would leave the block empty, every subject the week
 * pattern names for that day is shown. An over-full label is a cosmetic
 * problem; a missing subject is a missed lesson.
 */

export const ROTATING_BLOCK_ID = 'block-9';

/** Mission Control lessons per `subject|batchLabel`, counted once. */
const mcCounts = (() => {
  const map = new Map();
  for (const lesson of allLessons) {
    if (!lesson.quarter) continue;
    const key = lesson.subject + '|' + lesson.quarter;
    map.set(key, (map.get(key) || 0) + 1);
  }
  return map;
})();

/**
 * The specialized subjects genuinely running in the 2:15 block on `date`.
 *
 * @param {Date} date
 * @param {Array} khanAcademyAssignments  rows from the store; when this is not
 *   an array the Khan half of the test is skipped and nothing is filtered out.
 */
export function liveRotatingSubjects(date = new Date(), khanAcademyAssignments = null) {
  const pattern = dayPattern(date);
  if (!pattern || !Array.isArray(pattern.subjects) || pattern.subjects.length === 0) return [];
  if (pattern.kind === 'weekend' || pattern.kind === 'holiday') return [];

  const { batchLabel, id: quarterId } = getCurrentQuarter(date);

  /**
   * The preference order for THIS quarter. Q1 is the odd one — Technology
   * carries 23 lessons and needs both Tuesday and Thursday, so Wednesday goes
   * to Social Studies for that quarter only. See weekPattern.js.
   */
  const preference = patternSubjects(pattern, quarterId);

  // THIS RETURNED EVERY LIVE SUBJECT UNTIL AUG 9 2026, and on Tuesday and
  // Thursday that was two of them sharing 45 minutes. The parent: "we have
  // social studies and tech on the same 45min slot. I don't think that will
  // work." It returns AT MOST ONE now — `pattern.subjects` is an order of
  // preference and the first subject with real lessons this quarter owns the
  // day and the whole block.
  //
  // MISSION CONTROL LESSONS DECIDE OWNERSHIP, KHAN ROWS DO NOT. A subject that
  // is Khan-only this quarter has nothing to teach in a 45-minute block that
  // another subject needs — Social Studies is Khan-only in Q1, which is exactly
  // why Technology can have Q1's Thursdays and keep its lessons in order.
  // Khan-only subjects are surfaced on the open Friday instead; see
  // openDayCompanions below. Nothing is dropped, it moves.
  /**
   * ---- OWNERSHIP COUNTS KHAN WORK TOO (fixed Aug 20, 2026) ----
   *
   * The student, via his parent: **"he has social studies to complete but it's
   * not on Today's routine."**
   *
   * He had ten open Social Studies units and no day that ran them. The header
   * of this very file already states the rule that would have prevented it:
   *
   *   > a subject is live in a quarter if it has quarter-tagged Mission
   *   > Control lessons in that quarter, OR Khan Academy rows batched to it.
   *   > The second half is not optional: Social Studies runs entirely on Khan
   *   > Academy in Q1 ... the exact kind of "the schedule didn't tell him to
   *   > do it" gap this project has already been caught by twice.
   *
   * The code did not do that. It ran the Mission Control test to completion
   * FIRST and only consulted Khan when no subject on the day had lessons. So a
   * Khan-only subject could never beat a lesson-having subject to a day it was
   * listed ahead of — and Social Studies is Khan-only until Q2. It lost every
   * Thursday of Q1 to Technology, silently, and the caught-it-twice gap in the
   * comment happened a third time.
   *
   * Now it is one pass in preference order, and liveness means what the header
   * says it means. The ORDER still decides who wins: Thursday lists Technology
   * first and keeps it; Wednesday lists Social Studies first and gives it the
   * block. That is the parent's allocation, expressed where allocations belong
   * — in the week pattern, not in a liveness test.
   */
  const khanSubjects = Array.isArray(khanAcademyAssignments)
    ? new Set(
        khanAcademyAssignments.filter((a) => a && a.batchLabel === batchLabel).map((a) => a.subject)
      )
    : null;

  const isLive = (subject) => {
    if ((mcCounts.get(subject + '|' + batchLabel) || 0) > 0) return true;
    /**
     * A null set means the caller did not supply the rows — NOT that there are
     * none. Treating "I was not told" as "there is no work" is how a subject
     * disappears from a schedule that is otherwise correct, so an unsupplied
     * list falls through to the show-more default below instead.
     */
    return khanSubjects ? khanSubjects.has(subject) : false;
  };

  const owner = preference.find(isLive);
  if (owner) return [owner];

  // Nothing live on this day's list. WHEN IN DOUBT, SHOW MORE, NOT LESS: if the
  // Khan rows were never supplied, name the day's first subject rather than
  // drawing an empty block.
  if (!khanSubjects) return preference.slice(0, 1);
  return [];
}

/**
 * Subjects that are live this quarter but own no weekday — Khan-only ones.
 *
 * They surface on the open Friday. WHEN IN DOUBT, SHOW MORE, NOT LESS: this
 * project has twice shipped a schedule that failed to tell him to do something
 * he was assigned, and a subject with rows and no named day is that same bug.
 */
/** The same calendar week as `date`, moved to weekday `day` (1=Mon..5=Fri). */
function dateInQuarterFor(day, date) {
  const d = new Date(date);
  const shift = day - (d.getDay() === 0 ? 7 : d.getDay());
  d.setDate(d.getDate() + shift);
  return d;
}

export function openDayCompanions(date = new Date(), khanAcademyAssignments = null) {
  if (!Array.isArray(khanAcademyAssignments)) return [];
  const { batchLabel, id: quarterId } = getCurrentQuarter(date);
  /**
   * WHO ALREADY HAS A DAY THIS QUARTER — asked the same way the days answer it
   * themselves: per quarter, and counting Khan work. Asked any other way, this
   * lists a subject on Friday that already owns a weekday, or hides one that
   * owns none. It used to count Mission Control lessons only, which is exactly
   * how Social Studies came to be "surfaced on Friday" while owning nothing.
   */
  const owned = new Set();
  for (const day of [1, 2, 3, 4, 5]) {
    const winner = liveRotatingSubjects(dateInQuarterFor(day, date), khanAcademyAssignments)[0];
    if (winner) owned.add(winner);
  }
  const rotating = new Set(
    [1, 2, 3, 4, 5].flatMap((d) => patternSubjects(WEEK_PATTERN[d], quarterId))
  );
  return [...new Set(
    khanAcademyAssignments
      .filter((a) => a && a.batchLabel === batchLabel && rotating.has(a.subject) && !owned.has(a.subject))
      .map((a) => a.subject)
  )];
}

/** The label the 2:15 block should carry on `date`. */
export function rotatingBlockLabel(date = new Date(), khanAcademyAssignments = null) {
  const pattern = dayPattern(date);
  if (!pattern) return 'No school';
  if (pattern.kind === 'holiday') return `${pattern.holiday} — no school`;
  if (pattern.kind === 'weekend') return 'No school';

  // FRIDAY IS THE OPEN DAY and says so. Giving it a fixed subject would spend
  // the very day that lets Tuesday and Thursday each hold one subject, and it
  // would take back the room a long Khan unit needs to run Mon-Fri.
  if (pattern.flex) {
    const companions = openDayCompanions(date, khanAcademyAssignments)
      .map((s) => SUBJECT_LABELS[s] || s);
    const tail = companions.length ? `${companions.join(' + ')} (Khan) · ` : '';
    return `Open · ${tail}Long Khan units, catch-up & field trips`;
  }

  const live = liveRotatingSubjects(date, khanAcademyAssignments);
  const names = live.map((s) => SUBJECT_LABELS[s] || s);
  return names.length ? names.join(' + ') : 'Catch-up';
}

/**
 * The label to DISPLAY for any block on a given date.
 *
 * Every block except the rotating one returns its own stored label untouched.
 * The rotating one returns its stored label too if the parent has renamed it —
 * only labels this app itself shipped are resolved, which is the same rule
 * every schedule migration in useAppStore.js follows.
 */
export function resolveBlockLabel(block, date = new Date(), khanAcademyAssignments = null) {
  if (!block) return '';
  /**
   * The 10:30 block resolves too, since Aug 29 2026 — Social Studies takes it
   * on Tuesdays. Handled HERE rather than at each screen because every surface
   * that draws a timetable already calls this one function: the Daily view, the
   * Morning Meeting, the printed schedule. Teaching them one at a time is how
   * a block ends up saying "Science" on his screen and "Social Studies" on
   * hers.
   *
   * Only the SHIPPED label is replaced. A block she renamed herself is hers.
   */
  if (block.id === MORNING_BLOCK_ID) {
    if (block.label !== 'Science') return block.label;
    return morningBlockLabel(date, khanAcademyAssignments);
  }
  if (block.id !== ROTATING_BLOCK_ID) return block.label;
  if (!isShippedRotatingLabel(block.label)) return block.label;
  return rotatingBlockLabel(date, khanAcademyAssignments);
}

/**
 * Every wording this app has ever shipped for block-9. A label that is not on
 * this list was typed by the parent and is never overwritten or resolved away.
 * Kept in sync with LEGACY_BLOCK_9_LABELS in useAppStore.js — verify-rotating
 * -block.mjs fails if the current default is missing from either.
 */
export const SHIPPED_ROTATING_LABELS = new Set([
  'Rotating Block — Aerospace / Technology / Social Studies / Robotics',
  'Aerospace / Social Studies / Coding / Robotics / STEM Project · Fridays: Gardening or Guitar Theory',
  'Aerospace / Social Studies / Coding / Robotics / STEM Project',
  'Aerospace / Coding / Robotics / STEM Project',
  'Aerospace Engineering / Coding / Robotics / STEM Project'
]);

export function isShippedRotatingLabel(label) {
  return SHIPPED_ROTATING_LABELS.has(label);
}

/** Monday-Friday, resolved — what the printed week actually looks like. */
export function rotatingWeek(anyDateInWeek = new Date(), khanAcademyAssignments = null) {
  const d = new Date(anyDateInWeek);
  const monday = new Date(d);
  monday.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return Array.from({ length: 5 }, (_, i) => {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);
    return {
      date: day,
      weekday: dayPattern(day).label,
      kind: dayPattern(day).kind,
      subjects: liveRotatingSubjects(day, khanAcademyAssignments),
      label: rotatingBlockLabel(day, khanAcademyAssignments)
    };
  });
}

/**
 * ===========================================================================
 * THE SECOND ROTATING SLOT — 10:30, Science's block. (Aug 29, 2026.)
 * ===========================================================================
 *
 * Science ran five days a week and was the most generously supplied subject on
 * the board. It gives up Tuesday so Social Studies can have a second day; see
 * the note on Tuesday in `weekPattern.js` for why Social Studies and not
 * Aerospace, and for the numbers the choice was made on.
 *
 * Deliberately a SEPARATE function from `liveRotatingSubjects` rather than a
 * parameter on it. Every caller of that function means the 2:15 block and says
 * so — the dashboard rail, the day's mission list, `openDayCompanions`. Adding
 * a mode flag would have made every one of those call sites wrong by default,
 * which is the shape of the bug this project has now been bitten by nine times.
 * A different question gets a different function.
 */
export const MORNING_BLOCK_ID = 'block-5';

/** The subject that owns the 10:30 block on `date`, or null when Science does. */
export function liveMorningSubject(date = new Date(), khanAcademyAssignments = null) {
  const pattern = dayPattern(date);
  if (!pattern || pattern.kind === 'weekend' || pattern.kind === 'holiday') return null;
  const wanted = Array.isArray(pattern.morningSubjects) ? pattern.morningSubjects : [];
  if (wanted.length === 0) return null;
  /**
   * Liveness is asked the same way the 2:15 block asks it, and for the same
   * reason: a subject with nothing to teach this quarter must hand the slot
   * back to Science rather than draw an empty block. `liveRotatingSubjects`
   * cannot be reused here — it answers for a different day's preference list.
   */
  const { batchLabel } = getCurrentQuarter(date);
  const khanSubjects = Array.isArray(khanAcademyAssignments)
    ? new Set(khanAcademyAssignments.filter((a) => a && a.batchLabel === batchLabel).map((a) => a.subject))
    : null;
  const isLive = (subject) => {
    if ((mcCounts.get(subject + '|' + batchLabel) || 0) > 0) return true;
    return khanSubjects ? khanSubjects.has(subject) : false;
  };
  const owner = wanted.find(isLive);
  if (owner) return owner;
  /**
   * WHEN IN DOUBT, SHOW MORE, NOT LESS — the same rule, and the same shape, as
   * `liveRotatingSubjects` uses two functions up.
   *
   *   rows supplied, nothing live  -> null, and Science keeps its own block
   *   rows NOT supplied            -> name the day's subject anyway
   *
   * The second case is deliberate and it is not the cautious-looking choice.
   * A null list means "the caller did not tell me", not "there is no work", and
   * this project has twice shipped a schedule that failed to tell him to do
   * something he was assigned. Drawing the day's real owner is the safer error.
   */
  return khanSubjects ? null : wanted[0];
}

/** The 10:30 block's label for `date` — "Science" unless another subject owns it. */
export function morningBlockLabel(date = new Date(), khanAcademyAssignments = null) {
  const owner = liveMorningSubject(date, khanAcademyAssignments);
  return owner ? SUBJECT_LABELS[owner] || owner : 'Science';
}
