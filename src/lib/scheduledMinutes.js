// ---------------------------------------------------------------------------
// THE SCHOOL DAY IS THE TIMETABLE, NOT THE STOPWATCH.
//
// ---- WHY THIS EXISTS (Aug 16, 2026) ----
//
// The parent, after finding the 180-day counter was counting July and
// Saturdays: **"it can enter in kahn hrs via the schedule time in the
// scheduler. Lamar goes by the scheduler for his school day. when he selects
// that he's done the time should be entered."**
//
// That is the right answer to the problem the previous fix could only report.
//
// Attendance minutes came from ONE source: a timer in App.jsx counting every
// minute this tab was visible. Which is not the school day. It misses Khan
// Academy entirely — a different website, where the core academics actually
// happen — along with a paper book, PE, the guitar and the garden. Her record
// showed 28 minutes for Aug 6 and 40 for Aug 13, both full school days.
//
// But the app has always known how long each block is. She set those times
// herself. **Mathematics is 09:00-10:00 because she decided it was, and when he
// ticks Mathematics done, sixty minutes of instruction happened whether or not
// this tab was in front.**
//
// ---- THE DOUBLE-COUNTING TRAP, AND WHY THIS COUNTS BLOCKS NOT TICKS ----
//
// The rotating 2:15 block is shared — Aerospace, Technology, Social Studies and
// Robotics take turns in block-9. Tick two of them on one day and a naive sum
// books ninety minutes for a forty-five minute block.
//
// So the unit of credit is the **BLOCK, not the tick**. Today's minutes are the
// sum of the DISTINCT blocks that at least one completed thing maps to. Ticking
// two rotating subjects credits block-9 exactly once, because the block only
// happened once.
//
// This also makes the whole thing idempotent: it is recomputed from the logs,
// never incremented. Unticking removes the credit for free, and there is no
// running total to drift.
//
// ---- WHAT IS DELIBERATELY NOT COUNTED ----
//
// Break and Lunch. They are on the timetable and they are not instruction, and
// a records packet that counts lunch toward Georgia's 4.5 hours is the same
// kind of wrong as one that counts a Saturday in July.
// ---------------------------------------------------------------------------
import { defaultSchedule } from '../academies/lamar/data/schedule/defaultSchedule.js';
import { toMinutes } from './classBell.js';
import { localDayOf } from './academicOrder.js';
import { toDateStr, addDays, parseDateStr } from './scheduler.js';
import { allLessons } from '../academies/lamar/data/lessons/index.js';
import { khanGrammarUnitByUrl } from '../academies/lamar/data/khan/grammarCourseOrder.js';
import { getCurrentQuarter } from './schoolQuarter.js';

/** Monday-first day keys, as weeklyWordState stores them in completedDayTasks. */
const WORD_DAY_OFFSET = { mon: 0, tue: 1, wed: 2, thu: 3, fri: 4, sat: 5, sun: 6 };

/**
 * The dates word study was actually done. weeklyWordState records a week start
 * and which day-tasks inside it are finished, so the date is derivable — no new
 * record needed, and no second place for the same fact to live.
 */
export function wordStudyDates(weeklyWordState = {}) {
  const out = new Set();
  for (const row of Object.values(weeklyWordState || {})) {
    /**
     * THE WRITTEN-DOWN DATES FIRST, AND THEY ARE NEVER CLEARED.
     *
     * `creditedDates` is appended the moment a day-task is finished and
     * survives the Monday rotation, the rotation-rule repair, and the parent's
     * "start the next list now" button. Deriving the dates from
     * `completedDayTasks` — which all three of those reset — meant a day he
     * genuinely worked could leave the Georgia record when the word list
     * moved, without anything failing or saying so.
     */
    for (const date of row?.creditedDates || []) {
      if (typeof date === 'string' && date) out.add(date);
    }

    /**
     * The derivation stays for rows written before creditedDates existed. It
     * is a union, not a fallback: a row part-way through the change has real
     * days in both places and both count. Duplicates collapse in the Set.
     */
    if (!row?.weekStartDate) continue;
    for (const key of row.completedDayTasks || []) {
      const offset = WORD_DAY_OFFSET[key];
      if (offset === undefined) continue;
      out.add(toDateStr(addDays(parseDateStr(row.weekStartDate), offset)));
    }
  }
  return out;
}

/**
 * Which timetable block a completed thing belongs to, BY BLOCK ID.
 *
 * Ids, not labels — she can rename "Science" or move it an hour later and this
 * keeps working. Renaming is a thing parents do; changing ids is not something
 * the UI even offers.
 *
 * The four rotating subjects all point at block-9 on purpose. See the header:
 * the block is the unit of credit, so they collapse into one another rather
 * than stacking.
 */
export const BLOCK_FOR_SUBJECT = {
  /**
   * The 08:30 block. It had no entry here until Aug 20, 2026, and no record
   * anywhere else either — thirty minutes a day, 180 days a year, that the app
   * was structurally unable to count. See db.js v33.
   */
  morningMeeting: 'block-1',
  math: 'block-2',
  reading: 'block-3',
  science: 'block-5',
  typing: 'block-5b',
  ela: 'block-7',
  wordStudy: 'block-7b',
  pe: 'block-8',
  aerospace: 'block-9',
  technology: 'block-9',
  socialStudies: 'block-9',
  robotics: 'block-9',
  guitar: 'block-10',
  gardening: 'block-11'
};

/**
 * lessonId -> subject, so a lesson he finished IN THIS APP can find its block.
 *
 * ---- WHY THIS EXISTS (Aug 20, 2026) ----
 *
 * The parent: **"Lamar logs in at 8:30 every morning and is working on his
 * school work until he completes everything. It has to be longer than 4 1/2
 * hrs."**
 *
 * She was right, and the record disagreed with her on every day of the week:
 *
 *     Aug 17   240 min credited   Rotating Block: 0
 *     Aug 18   255 min credited   Rotating Block: 0
 *     Aug 19   225 min credited   Rotating Block: 0
 *
 * The Rotating Block is 45 minutes a day and it had booked nothing since
 * Aug 14. Not because he skipped it — on Aug 19 he mastered
 * `ae7-history-of-flight-2`, an Aerospace lesson, and lessonProgress recorded
 * the date. `coveredBlockIds` read the Khan tick log, the PE log, the guitar
 * log, the garden log, the writing entries and word study, and it did not read
 * **the app's own record of the lessons the app itself teaches**.
 *
 * So the four rotating subjects — Aerospace, Technology, Social Studies,
 * Robotics — were the only subjects on the timetable with no path to credit at
 * all unless she happened to tick them on the Khan checklist, which is not
 * where they live. Forty-five minutes a day, every day, on the work that IS
 * this app.
 *
 * Same family as the last three: the record existed and the screen never
 * asked for it.
 */
const LESSON_SUBJECT = (() => {
  const map = new Map();
  for (const l of allLessons) map.set(l.id, l.subject);
  return map;
})();

/** lessonId -> strand, for the one subject that has two ('reading'). */
const LESSON_STRAND = (() => {
  const map = new Map();
  for (const l of allLessons) if (l.strand) map.set(l.id, l.strand);
  return map;
})();

/**
 * ============================================================================
 * ENGLISH IS TWO BLOCKS, NOT ONE.
 * ============================================================================
 *
 * ---- WHY (Aug 20, 2026) ----
 *
 * The parent: **"The 'Rest of the Day' is supposed to match 'Today's
 * Routine'."**
 *
 * It did not, and this was the last place it disagreed. His list printed
 *
 *     10:00  LANGUAGE ARTS  Punctuation: the comma and the apostrophe
 *
 * while the rail four inches away printed
 *
 *     10:00  Reading Lesson
 *     12:30  Language Arts & Writing Journal
 *
 * Language Arts at ten o'clock, and again at half past twelve. Two names for
 * one hour and no hour for the other.
 *
 * The cause is that `reading` is ONE subject code carrying TWO real subjects.
 * config/subjects.js has said so since August 6 and even names them —
 * SUBJECT_STRANDS.reading is `[Reading & Literature, Grammar & Writing]` — and
 * the comment beside the card label spells out this exact trap:
 *
 *   > "Language Arts and Reading" was the cause: it sat on the Khan row, whose
 *   > Q1 units are ALL grammar (parts of speech, punctuation, verb tenses), and
 *   > implied that row also covered the 10:00 independent-reading block.
 *   > **It did not.**
 *
 * That was written about a LABEL. The same fault was still in the block map,
 * where it was also costing hours: `BLOCK_FOR_SUBJECT.reading` sent every
 * piece of English work to block-3, the fifteen-minute Reading Lesson, so a
 * day of grammar booked fifteen minutes instead of the sixty its own block is
 * worth.
 *
 * So the block follows the STRAND, not the subject code:
 *
 *     Grammar & Writing     -> block-7   12:30  Language Arts & Writing Journal
 *     Reading & Literature  -> block-3   10:00  Reading Lesson
 *
 * Both blocks stay reachable, which matters: a block nothing can credit is
 * ninety hours a year that cannot be counted, and this project has already
 * shipped exactly that once, in block-1.
 */
export const STRAND_BLOCK = {
  'language-arts': 'block-7',
  reading: 'block-3'
};

/**
 * Which strand a Khan row belongs to, decided the same way the report card
 * decides it — BY URL, never by title.
 *
 * grammarCourseOrder.js explains why: a title can differ from the seed because
 * of an older build, an import from the other computer, or a hand edit. The
 * URL is what Khan itself keys on.
 */
export function khanReadingStrand(row) {
  return khanGrammarUnitByUrl(row?.khanAcademyUrl) ? 'language-arts' : 'reading';
}

/**
 * The Khan row a subject's daily tick actually refers to: the next unfinished
 * unit in the current quarter, which is exactly the row his board offered him.
 *
 * The daily tick is per SUBJECT, not per unit, so it carries no strand of its
 * own. Resolving it through the row he was shown keeps the credit honest —
 * he ticked the thing on the screen, and the screen named a unit.
 */
export function nextOpenKhanRow(subject, rows = [], dateStr = null) {
  /**
   * SCOPED TO THE QUARTER OF THE DAY BEING CREDITED, and that is not a detail.
   *
   * `sequenceInQuarter` restarts at 1 every quarter, so sorting across all
   * quarters puts Q2's first unit ahead of Q1's second. Unfiltered, this
   * returned a Q2 reading unit while he was working through Q1's grammar — and
   * credited the wrong block for it, silently.
   *
   * The quarter comes from the DATE being credited rather than from today, so
   * re-crediting an old day in November still asks what was running in August.
   */
  const batchLabel = dateStr
    ? getCurrentQuarter(parseDateStr(dateStr)).batchLabel
    : getCurrentQuarter().batchLabel;
  return [...(rows || [])]
    .filter((a) => a && a.subject === subject && !a.completed && a.batchLabel === batchLabel)
    .sort((a, b) => (a.sequenceInQuarter || 0) - (b.sequenceInQuarter || 0))[0] || null;
}

/** The block a Khan daily tick credits, strand-aware for English. */
export function blockForKhanTick(subject, khanAcademyAssignments, dateStr = null) {
  if (subject !== 'reading') return BLOCK_FOR_SUBJECT[subject];
  const row = nextOpenKhanRow('reading', khanAcademyAssignments, dateStr);
  /**
   * No open row left — the course is finished, or the caller did not supply
   * the rows. Fall back to the subject's default block rather than crediting
   * nothing: an unsupplied list is not evidence that no work happened.
   */
  if (!row) return BLOCK_FOR_SUBJECT.reading;
  return STRAND_BLOCK[khanReadingStrand(row)] || BLOCK_FOR_SUBJECT.reading;
}

/** The block a finished Mission Control lesson credits, strand-aware. */
export function blockForLesson(lessonId) {
  const subject = LESSON_SUBJECT.get(lessonId);
  if (subject !== 'reading') return BLOCK_FOR_SUBJECT[subject];
  const strand = LESSON_STRAND.get(lessonId);
  return STRAND_BLOCK[strand] || BLOCK_FOR_SUBJECT.reading;
}

/** Blocks that are on the timetable but are not instruction. */
export const NON_INSTRUCTIONAL_BLOCKS = new Set(['block-4', 'block-6']);

function blocksFor(scheduleBlocks) {
  return Array.isArray(scheduleBlocks) && scheduleBlocks.length ? scheduleBlocks : defaultSchedule;
}

/** How long a block runs, in minutes. Zero if its times are unusable. */
export function blockMinutes(block) {
  if (!block?.startTime || !block?.endTime) return 0;
  const mins = toMinutes(block.endTime) - toMinutes(block.startTime);
  return Number.isFinite(mins) && mins > 0 ? mins : 0;
}

/**
 * Every block id a day's completed work touches.
 *
 * Reads the records that already exist rather than asking for a new kind of
 * tick: the Khan daily log, the PE workout log, the guitar log, the garden log.
 * Each of those is already the student saying "I did this today", and each one
 * sits in a block on her timetable.
 */
export function coveredBlockIds(dateStr, {
  khanDailyLog = {},
  peWorkoutLog = [],
  guitarLog = [],
  typingLog = [],
  gardenLog = [],
  writingEntries = [],
  weeklyWordState = {},
  lessonProgress = {},
  morningMeetings = {},
  khanAcademyAssignments = []
} = {}) {
  const ids = new Set();
  const onDate = (rows) => (rows || []).some((r) => r?.date === dateStr);

  const ticked = khanDailyLog?.[dateStr] || {};
  for (const [subject, done] of Object.entries(ticked)) {
    if (!done) continue;
    const id = blockForKhanTick(subject, khanAcademyAssignments, dateStr);
    if (id) ids.add(id);
  }

  if (onDate(peWorkoutLog)) ids.add(BLOCK_FOR_SUBJECT.pe);
  if (onDate(guitarLog)) ids.add(BLOCK_FOR_SUBJECT.guitar);
  if (onDate(gardenLog)) ids.add(BLOCK_FOR_SUBJECT.gardening);
  /**
   * ---- BLOCK-5b, THE SECOND UNCREDITABLE BLOCK. (Aug 26, 2026.) ----
   *
   * The comment eight lines above says a block nothing can credit is ninety
   * hours a year that cannot be counted, and that this project has shipped
   * exactly that once, in block-1. It shipped it twice. Typing Practice is
   * fifteen minutes a day, five days a week — about 45 hours — and no line
   * here could ever have credited it.
   *
   * Not because anyone forgot. `typingScores` is keyed by passage and
   * `typingLessonProgress` by lesson, and NEITHER HAS EVER CARRIED A DATE, so
   * there was nothing to test `dateStr` against. He could type every school
   * day for a year and the only record was a set of personal bests. That is
   * why the fix was a new table (`typingLog`, db.js v35) and not a new `if`.
   */
  if (onDate(typingLog)) ids.add(BLOCK_FOR_SUBJECT.typing);

  /**
   * Writing and word study have no daily tick and never needed one — a journal
   * entry and a finished day-task ARE the record. Without these two the ticks
   * could only ever account for 3h45 of a 5h30 day, which is under Georgia's
   * 4.5-hour bar: the feature would have looked broken on a day he did
   * everything asked of him.
   *
   * completedAt is a UTC timestamp, so it goes through localDayOf. An entry
   * finished at 8pm Eastern belongs to that evening, not to tomorrow.
   */
  if ((writingEntries || []).some((e) => e?.completedAt && localDayOf(e.completedAt) === dateStr)) {
    ids.add(BLOCK_FOR_SUBJECT.ela);
  }
  if (wordStudyDates(weeklyWordState).has(dateStr)) ids.add(BLOCK_FOR_SUBJECT.wordStudy);

  /**
   * Lessons he finished in this app, on this day.
   *
   * `lastCompletedDate` is written by `todayStr()` — already a local
   * 'YYYY-MM-DD' — so it compares directly and needs no timezone handling.
   *
   * Mastery is deliberately NOT required. A lesson he sat through and got 60%
   * on took the same forty-five minutes as one he aced, and Georgia counts
   * hours of instruction, not hours of success. Requiring `mastered` here
   * would have quietly punished exactly the days he found hardest.
   */
  for (const [lessonId, progress] of Object.entries(lessonProgress || {})) {
    if (!progress || progress.lastCompletedDate !== dateStr) continue;
    const id = blockForLesson(lessonId);
    if (id) ids.add(id);
  }

  /**
   * The morning meeting, if he actually ran it.
   *
   * `completedAt` is required, not just the row's existence — a row could
   * exist as a draft, and a block only books on work that finished. The row is
   * keyed by date, so this is a lookup rather than a scan.
   */
  if (morningMeetings?.[dateStr]?.completedAt) ids.add(BLOCK_FOR_SUBJECT.morningMeeting);

  for (const id of NON_INSTRUCTIONAL_BLOCKS) ids.delete(id);
  return ids;
}

/**
 * Scheduled instruction minutes for one day: the sum of the distinct blocks his
 * completed work covers.
 */
export function scheduledMinutesOn(dateStr, sources = {}) {
  const ids = coveredBlockIds(dateStr, sources);
  const blocks = blocksFor(sources.scheduleBlocks);
  let total = 0;
  for (const block of blocks) {
    if (!ids.has(block.id)) continue;
    // A block with a `days` list (Gardening is Fridays only) counts only on its
    // own days — but the log row is dated, so if he logged it, it happened.
    total += blockMinutes(block);
  }
  return total;
}

/** date -> scheduled minutes, for every day that has any completed work. */
export function scheduledMinutesByDate(sources = {}) {
  const dates = new Set([
    ...Object.keys(sources.khanDailyLog || {}),
    ...(sources.peWorkoutLog || []).map((r) => r?.date),
    ...(sources.guitarLog || []).map((r) => r?.date),
    ...(sources.typingLog || []).map((r) => r?.date),
    ...(sources.gardenLog || []).map((r) => r?.date),
    ...(sources.writingEntries || []).map((e) => localDayOf(e?.completedAt)),
    ...wordStudyDates(sources.weeklyWordState),
    /**
     * A day whose ONLY work was an in-app lesson is still a school day. Left
     * out of this list, `coveredBlockIds` would never be asked about it and
     * the forty-five minutes would vanish exactly as before — the map is built
     * from the dates it knows about, not from the calendar.
     */
    ...Object.values(sources.lessonProgress || {}).map((p) => p?.lastCompletedDate),
    ...Object.keys(sources.morningMeetings || {})
  ].filter(Boolean));

  const out = {};
  for (const date of dates) {
    const mins = scheduledMinutesOn(date, sources);
    if (mins > 0) out[date] = mins;
  }
  return out;
}

/**
 * The full instructional day on her timetable — what a day looks like when
 * everything on it is done. Used to tell her how much of the day the ticks can
 * actually account for, rather than letting her wonder why a complete Khan day
 * lands under the 4.5-hour bar.
 */
export function fullInstructionalDayMinutes(scheduleBlocks, { weekday = null } = {}) {
  return blocksFor(scheduleBlocks).reduce((n, b) => {
    if (NON_INSTRUCTIONAL_BLOCKS.has(b.id)) return n;
    if (Array.isArray(b.days) && weekday !== null && !b.days.includes(weekday)) return n;
    return n + blockMinutes(b);
  }, 0);
}
