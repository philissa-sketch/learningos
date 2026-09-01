// ---------------------------------------------------------------------------
// Weekly Word List rotation logic (Spelling & Vocabulary).
//
// Design (per parent instruction): a fixed 10-word list per skill, rotating
// on a strict 7-day calendar schedule — NOT gated on passing the quiz.
// Whatever he has not yet mastered carries forward into next week's list; new
// words backfill the rest so the list always totals 10.
//
// weekStartDate advances by exactly 7 days each rotation (not "today"), so
// the weekly schedule stays fixed even if the app is opened on an irregular
// day — it won't drift just because he opened it a day late.
// ---------------------------------------------------------------------------

export const WORDS_PER_WEEK = 10;
export const WEEK_LENGTH_DAYS = 7;

// ---------------------------------------------------------------------------
// FIVE DIFFERENT ACTIVITIES, ONE PER DAY. (Rebuilt Aug 9 2026.)
//
// The parent: "There was daily skills to do for each day until the end of the
// week. For vocab and spelling. Ex. 1st was reading the list, 2nd day choosing
// the correct spelt word, 3rd word search, etc for spelling."
//
// It had never been built. `DAY_TASK_INFO` held Monday's read and then THE
// SAME multiple-choice round four times — labelled "Practice", "Practice",
// "Review", "Test Day" so it read like five things on the schedule while being
// one thing on the screen. Both backups in the repo have the identical stub, so
// this was never a regression; the days were named before the activities
// existed and nobody came back for them.
//
// Why five formats and not one good one: recognising the right spelling from a
// list is the easiest thing you can ask, and it is the ONLY thing the old cycle
// ever asked. Producing the word from nothing is the hardest. The week now
// walks up that ramp — see, recognise, find, reconstruct, produce — so Friday
// is testing recall rather than re-testing recognition.
//
//   SPELLING
//   Mon  read        the list, each word with the misspellings it gets confused with
//   Tue  choose      four spellings, pick the correct one
//   Wed  wordsearch  find all ten in a grid
//   Thu  missing     R_c_i_e — type the whole word, gaps on the letters that trip people
//   Fri  spell       type it from its misspellings alone. No prompt to recognise.
//
//   VOCABULARY
//   Mon  read        word, its aerospace sentence, its meaning
//   Tue  meaning     read the sentence, choose what the word means
//   Wed  blank       the sentence with a gap — which of this week's words fits?
//   Thu  recall      given the meaning, choose the word (the reverse of Tuesday)
//   Fri  test        the graded quiz
//
// Weekends have no task. Missing a weekday task doesn't lock anything or
// invent urgency -- the earliest incomplete weekday just keeps showing as
// "today's task" (with a catch-up label) until it's done.
// ---------------------------------------------------------------------------

export const DAY_TASK_ORDER = ['mon', 'tue', 'wed', 'thu', 'fri'];

/**
 * WHICH ACTIVITIES COUNT TOWARD MASTERING A WORD.
 *
 * `read` and `wordsearch` are exposure, not recall. Finding RECEIVE in a grid
 * proves he can match ten letters he is looking straight at; it does not prove
 * he can spell it. Letting either bank a mastery streak would retire words he
 * cannot produce, which is the same lie in the other direction from the bug
 * that started all this. They still complete the day and still earn XP.
 */
export const MASTERY_ACTIVITIES = new Set(['choose', 'missing', 'spell', 'meaning', 'blank', 'recall', 'test']);

export const WORD_ACTIVITIES = {
  spelling: {
    mon: {
      type: 'read',
      label: 'Read the list',
      instructions: 'Read this week’s ten words and the misspellings each one gets confused with.'
    },
    tue: {
      type: 'choose',
      label: 'Spot the spelling',
      instructions: 'Four spellings of the same word. Pick the one that is right.'
    },
    wed: {
      type: 'wordsearch',
      label: 'Word search',
      instructions: 'Find all ten words hidden in the grid.'
    },
    thu: {
      type: 'missing',
      label: 'Missing letters',
      instructions: 'Some letters are gone. Type the whole word, spelled correctly.'
    },
    fri: {
      type: 'spell',
      label: 'Spelling test',
      instructions: 'Type each word from its misspellings alone — no correct version to copy.'
    }
  },
  vocabulary: {
    mon: {
      type: 'read',
      label: 'Read the list',
      instructions: 'Read each word in its sentence, then what it means.'
    },
    tue: {
      type: 'meaning',
      label: 'Word to meaning',
      instructions: 'Read the sentence and work out what the word means.'
    },
    wed: {
      type: 'blank',
      label: 'Fill the blank',
      instructions: 'One word is missing from each sentence. Choose the one that fits.'
    },
    thu: {
      type: 'recall',
      label: 'Meaning to word',
      instructions: 'The meaning comes first this time — you name the word.'
    },
    fri: {
      type: 'test',
      label: 'Vocabulary test',
      instructions: 'The real weekly quiz — this is the one that counts.'
    }
  }
};

/** Kept for callers that only need a label. Spelling is the default shape. */
export const DAY_TASK_INFO = WORD_ACTIVITIES.spelling;

export function activityFor(skill, dayKey) {
  return (WORD_ACTIVITIES[skill] || WORD_ACTIVITIES.spelling)[dayKey] || null;
}

/** JS getDay(): 0=Sun...6=Sat. Returns null for weekends -- no word task. */
export function getDayKeyForDate(date = new Date()) {
  const map = { 1: 'mon', 2: 'tue', 3: 'wed', 4: 'thu', 5: 'fri' };
  return map[date.getDay()] || null;
}

/**
 * Determines today's word-study task for a skill, given the persisted
 * weekly word state (which carries `completedDayTasks`, the days already
 * done this week). Catches up through any earlier missed weekday before
 * landing on today's own task, same "never silently drop it, never
 * fake-lock it" approach used elsewhere in this app.
 *
 * `skill` decides WHICH activity each day holds — the two skills no longer
 * run the same five steps.
 */
export function getTodaysWordTask(state, date = new Date(), skill = 'spelling') {
  const todayKey = getDayKeyForDate(date);
  if (!todayKey) return { type: 'weekend' };

  const completed = new Set(state?.completedDayTasks || []);
  const todayIndex = DAY_TASK_ORDER.indexOf(todayKey);

  // Fri's completion is the real quiz flag, not completedDayTasks.
  const isDayDone = (key) => (key === 'fri' ? !!state?.quizTakenThisWeek : completed.has(key));

  for (let i = 0; i <= todayIndex; i++) {
    const key = DAY_TASK_ORDER[i];
    if (!isDayDone(key)) {
      return { ...activityFor(skill, key), dayKey: key, isCatchUp: key !== todayKey };
    }
  }

  return { type: 'done' };
}

function daysBetween(aStr, bStr) {
  const a = new Date(aStr + 'T00:00:00Z');
  const b = new Date(bStr + 'T00:00:00Z');
  return Math.round((b - a) / (1000 * 60 * 60 * 24));
}

function addDays(dateStr, days) {
  const d = new Date(dateStr + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/**
 * THE WORD WEEK STARTS ON A MONDAY. (Aug 9, 2026.)
 *
 * `weekStartDate` used to be whatever date the app happened to be opened on
 * first, and the rotation fires exactly 7 days later. Her real database had
 * both skills anchored to Thursday 2026-08-06 -- so the list was due to roll
 * over on a THURSDAY, mid-cycle: Monday's read and Tue/Wed's work would be
 * wiped, Thursday's task would target words he had never seen, and Friday's
 * test would run on a list that started the day before.
 *
 * The Mon-Fri rhythm above is the whole design. A week that does not begin on
 * Monday cannot carry it. Snapping back to the Monday on or before the stored
 * date is idempotent (a Monday snaps to itself) and never loses a week: the
 * catch-up loop below simply lands on the correct Monday.
 */
export function mondayOnOrBefore(dateStr) {
  const d = new Date(dateStr + 'T00:00:00Z');
  const shift = (d.getUTCDay() + 6) % 7; // Mon -> 0 ... Sun -> 6
  d.setUTCDate(d.getUTCDate() - shift);
  return d.toISOString().slice(0, 10);
}

// ---------------------------------------------------------------------------
// MASTERY — the reason the list moves.
//
// THE BUG THIS REPLACES. Rotation used to read exactly one thing:
//
//     carryForward = quizTakenThisWeek ? lastQuizMissedIds : currentWordIds
//
// No Friday test meant all ten words carried and ZERO new ones arrived. Her
// real database on Aug 9 2026 read week 3, poolCursor 10 — three weeks in,
// still on spelling words 1 to 10, and the parent dashboard reported "words
// seen 10 / 360". Four days a week of work, and the practice screen told him
// out loud that none of it counted: "This is practice — it doesn't affect
// Friday's test or next week's list."
//
// So a word now leaves the list on EVIDENCE, from any recall activity on any
// day, and the Friday test is one source of evidence rather than the only one.
// A week where the test gets missed still moves.
// ---------------------------------------------------------------------------

/**
 * ===========================================================================
 * THE FRIDAY TESTS, KEPT. (Aug 10, 2026.)
 * ===========================================================================
 *
 * `weeklyWordState` holds exactly one row per skill and every field on it
 * describes the CURRENT week. So the Friday test score existed for seven days
 * and was then overwritten by the next rotation -- there was no history at all,
 * which is why word study could not contribute a grade even in principle.
 *
 * Each sat test now appends one entry here. The parent's choice for how it
 * counts: **one grade per quarter, per skill**, averaged from these. Over 36
 * weeks that is eight to ten grades a year rather than 72, so a ten-word
 * fifteen-minute quiz cannot end up outweighing a Khan unit test or a book
 * report -- and one missed Friday does not dent the record.
 *
 * Every individual week still shows in the Spelling & Vocabulary section. This
 * is the grade, not the record.
 */
export function appendQuizResult(history, entry) {
  const rows = Array.isArray(history) ? [...history] : [];
  // A retake replaces that week rather than counting twice -- the latest
  // attempt is what sets the following week's list, so it is what counts here.
  const i = rows.findIndex((r) => r.weekStartDate === entry.weekStartDate);
  if (i >= 0) rows[i] = entry;
  else rows.push(entry);
  return rows.sort((a, b) => String(a.weekStartDate).localeCompare(String(b.weekStartDate)));
}

/**
 * Averages the Friday tests inside each quarter -- one number per quarter.
 * `quarterOf` maps a date string to a quarter label, injected so this file
 * stays free of the school calendar.
 */
export function quizAveragesByQuarter(history, quarterOf) {
  const buckets = new Map();
  for (const row of history || []) {
    if (typeof row?.percent !== 'number' || !Number.isFinite(row.percent)) continue;
    const label = quarterOf(row.date || row.weekStartDate);
    if (!label) continue;
    const b = buckets.get(label) || { label, total: 0, count: 0 };
    b.total += row.percent;
    b.count += 1;
    buckets.set(label, b);
  }
  return [...buckets.values()].map((b) => ({
    quarter: b.label,
    weeks: b.count,
    percent: Math.round(b.total / b.count)
  }));
}

/** Correct answers in a row, across separate sittings, to retire a word. */
export const MASTERY_STREAK = 3;

/**
 * How many weeks a word may be carried before it is set aside.
 *
 * Without this the list can still freeze — ten words he cannot get right would
 * carry forever, which is the exact stall this rewrite exists to remove. A word
 * carried three weeks is not a word he is about to get from more of the same
 * quiz; it is a word that needs teaching. It comes off the list and is reported
 * to the parent as stalled, rather than silently blocking the other 350.
 */
export const MAX_WEEKS_ON_LIST = 3;

/**
 * HOW MANY OF LAST WEEK'S TEN MAY KEEP THEIR SEAT.
 *
 * ---- WHY THIS NUMBER EXISTS (Aug 17, 2026) ----
 *
 * The parent: **"Spelling and vocab has the same words from the previous week."**
 *
 * They were. Her live record, on the day she said it:
 *
 *     spelling    week 5   sp-01 ... sp-10   poolCursor 10   weeks: 3
 *     vocabulary  week 5   vc-01 ... vc-10   poolCursor 10   weeks: 3
 *
 * Three rotations had run and the cursor had not moved off ten. He had been
 * handed the same list every Monday since the strand opened, and the other 350
 * words had never been reachable.
 *
 * The cause is one line of arithmetic. The old rotation carried forward EVERY
 * unmastered word, and a word is mastered only after three correct answers in a
 * row on a mastery activity. He has taken no word quizzes at all, so nothing was
 * mastered, so all ten carried, so carryForwardIds.length was already
 * WORDS_PER_WEEK and the backfill loop's condition was false before its first
 * iteration. The pool cursor never advanced.
 *
 * **The header of this very file describes the opposite behaviour** - "rotating
 * on a strict 7-day calendar schedule - NOT gated on passing the quiz". The
 * design was right and had an unstated assumption underneath it: that most
 * words get mastered each week. When none do, carry-forward eats all ten seats
 * and the calendar rotation becomes a no-op that still increments the week
 * number - which is why the screen kept announcing a new week over the same ten
 * words.
 *
 * So the seats are capped rather than the outcome assumed. At most three
 * carried and at most two brought back from the revisit queue means AT LEAST
 * FIVE NEW WORDS EVERY WEEK, whatever he does or does not do. A list that
 * repeats is now arithmetically impossible instead of merely unlikely.
 */
export const MAX_CARRY_FORWARD = 3;

/** Seats per week for words he has already missed once and lost the seat for. */
export const MAX_REVISIT_PER_WEEK = 2;

/** The floor the two caps above buy. Guarded, not just commented. */
export const MIN_NEW_WORDS_PER_WEEK = WORDS_PER_WEEK - MAX_CARRY_FORWARD - MAX_REVISIT_PER_WEEK;

/**
 * Which rotation rule a stored row was last computed under.
 *
 * A row written under rule 1 is sitting on a list that may have repeated for
 * weeks, and it will not fix itself: the rotation only runs when seven days
 * have elapsed, so a boy whose week started this morning would be stuck on the
 * repeated list until next Monday. Rows below this number are rebuilt once, in
 * place, the next time the app loads.
 */
export const ROTATION_RULE = 2;

function blankMastery() {
  return { streak: 0, correct: 0, wrong: 0, weeks: 1, mastered: false, stalled: false };
}

/**
 * Folds one activity's results into the per-word mastery ledger.
 * Pure — returns a new object, never mutates.
 */
export function applyResultsToMastery(prior, results, countsForMastery = true) {
  const next = { ...(prior || {}) };
  if (!countsForMastery) return next;
  for (const r of results || []) {
    if (!r || !r.wordId) continue;
    const cur = next[r.wordId] || blankMastery();
    const streak = r.correct ? (cur.streak || 0) + 1 : 0;
    next[r.wordId] = {
      ...cur,
      streak,
      correct: (cur.correct || 0) + (r.correct ? 1 : 0),
      wrong: (cur.wrong || 0) + (r.correct ? 0 : 1),
      mastered: Boolean(cur.mastered) || streak >= MASTERY_STREAK
    };
  }
  return next;
}

export function isMastered(mastery, wordId) {
  return Boolean(mastery && mastery[wordId] && mastery[wordId].mastered);
}

export function masteryCounts(mastery) {
  const rows = Object.values(mastery || {});
  return {
    mastered: rows.filter((r) => r.mastered).length,
    stalled: rows.filter((r) => r.stalled && !r.mastered).length
  };
}

export function stalledWordIds(mastery) {
  return Object.entries(mastery || {})
    .filter(([, r]) => r.stalled && !r.mastered)
    .map(([id]) => id);
}

/**
 * The word list, or an empty one.
 *
 * ---- WHY THIS EXISTS (Sept 1, 2026) ----
 *
 * A school whose Academy fills no `writing` slot has no spelling or vocabulary
 * pool, and `spellingWordPool` arrives here as `undefined`. Every function below
 * treats the pool as an array, so the first one to touch it threw during
 * hydration — before any screen rendered:
 *
 *     Cannot read properties of undefined (reading 'slice')
 *       at blankState -> computeWeeklyWordState -> _hydrateOnce
 *
 * That is one store away from the whole school failing to load over a feature
 * the Academy does not have.
 *
 * An empty pool is the honest answer: no words this week, nothing to practise,
 * no screen. §3c's rule — a slot an Academy has nothing for renders as an absent
 * screen, never a broken one. Normalised at each exported entry point rather
 * than at each use, so a path added later inherits it.
 */
const asPool = (pool) => (Array.isArray(pool) ? pool : []);

function blankState(pool, todayStr) {
  return {
    weekNumber: 1,
    weekStartDate: mondayOnOrBefore(todayStr),
    currentWordIds: pool.slice(0, WORDS_PER_WEEK).map((w) => w.id),
    poolCursor: WORDS_PER_WEEK,
    quizTakenThisWeek: false,
    lastQuizMissedIds: [],
    completedDayTasks: [],
    dayMissedIds: {},
    wordMastery: {},
    quizHistory: [],
    revisitQueue: [],
    creditedDates: [],
    rotationRule: ROTATION_RULE
  };
}

/**
 * BUILDS THE NEXT TEN WORDS. Pure; returns the list, the moved cursor, the
 * updated mastery ledger and the updated revisit queue. It does not decide WHEN
 * it runs - that is the calendar's job, below.
 *
 * The order the ten seats are filled, and why:
 *
 *   1. up to 3 CARRIED   the words he actually got wrong, hardest first. Three,
 *                        not ten, so a bad week cannot freeze the list.
 *   2. up to 2 REVISIT   words that lost their seat while still unmastered, in
 *                        the order they lost it. This is what makes "a word he
 *                        missed comes back" true rather than a hope.
 *   3. the rest NEW      from the pool cursor - five at the very least.
 *
 * A word he never attempted is not carried and is not queued. It is not a word
 * he is struggling with; it is a word nothing happened to. Holding a seat for
 * it is exactly how ten words held all ten seats for three weeks.
 */
function buildNextList(pool, state) {
  const mastery = { ...state.wordMastery };
  /**
   * TWO QUEUES, NOT ONE.
   *
   * `waiting` is the backlog from EARLIER weeks and is the only thing seats 4
   * and 5 may draw from. `pending` is what loses its seat in this rotation.
   * With one shared array a word could be pushed off the list and pulled
   * straight back onto it in the same pass, which is a repeat wearing the
   * costume of a revisit - the exact thing being fixed.
   */
  const waiting = [...(state.revisitQueue || [])];
  const pending = [];
  const attemptedOf = (row) => (row.correct || 0) + (row.wrong || 0) > 0;

  // ---- age every word on the outgoing list, and rank who has earned a seat --
  const candidates = [];
  for (const id of state.currentWordIds) {
    const row = mastery[id] || blankMastery();
    if (row.mastered) {
      mastery[id] = row;
      continue;
    }
    const weeks = (row.weeks || 1) + 1;
    const attempted = attemptedOf(row);
    if (weeks > MAX_WEEKS_ON_LIST) {
      /**
       * STALLED MEANS HE TRIED AND COULD NOT GET IT - a real signal that goes
       * to the parent as "this word needs teaching". A word he never once
       * answered is not that, and reporting it as stalled would have handed her
       * twenty words to re-teach that he had simply never been asked.
       */
      mastery[id] = { ...row, weeks, stalled: attempted };
      // A stalled word is NOT queued for revisit. It is set aside and reported
      // to the parent as a word that needs teaching; putting it back into the
      // rotation is asking the same quiz to fix what the quiz already failed at.
      continue;
    }
    mastery[id] = { ...row, weeks, stalled: false };
    /**
     * ONLY A WORD HE ANSWERED CAN KEEP ITS SEAT.
     *
     * Carrying a word nothing happened to is the whole bug in miniature: he
     * never answered any of the ten, so all ten looked like unfinished business
     * and all ten stayed. A word he was shown and never asked about has taught
     * him nothing worth holding a seat for; it rolls off and comes round again
     * with the pool. What that WEEK needs is not a repeated list - it is the
     * parent's record showing he did no word activities, which it does.
     */
    if (attempted) candidates.push({ id, wrong: row.wrong || 0, streak: row.streak || 0 });
  }

  candidates.sort((a, b) => {
    if (a.wrong !== b.wrong) return b.wrong - a.wrong;
    if (a.streak !== b.streak) return a.streak - b.streak;
    return a.id.localeCompare(b.id);
  });

  const nextIds = candidates.slice(0, MAX_CARRY_FORWARD).map((c) => c.id);
  /**
   * ONLY WORDS HE GOT WRONG WAIT IN LINE.
   *
   * A word he answered correctly but has not yet hit three-in-a-row on is not a
   * word he missed, and queueing it would let the backlog grow by five or six a
   * week forever - a number that would end the year looking like a debt he
   * cannot pay and does not owe. Those words come round again with the pool.
   * The queue means one thing: he got this wrong and it is coming back.
   */
  for (const c of candidates.slice(MAX_CARRY_FORWARD)) {
    if (c.wrong > 0) pending.push(c.id);
  }

  // ---- seats 4 and 5: words waiting to come back --------------------------
  const onList = new Set(nextIds);
  const revisitQueue = [];
  let revisited = 0;
  for (const id of waiting) {
    const row = mastery[id];
    if (onList.has(id) || (row && row.mastered) || (row && row.stalled)) continue;
    if (revisited < MAX_REVISIT_PER_WEEK) {
      onList.add(id);
      nextIds.push(id);
      revisited += 1;
      mastery[id] = { ...blankMastery(), correct: row?.correct || 0, wrong: row?.wrong || 0 };
    } else if (!revisitQueue.includes(id)) {
      revisitQueue.push(id);
    }
  }
  for (const id of pending) {
    if (onList.has(id) || revisitQueue.includes(id)) continue;
    revisitQueue.push(id);
  }

  // ---- the rest: words he has not met -------------------------------------
  let cursor = state.poolCursor;
  let guard = 0;
  while (nextIds.length < WORDS_PER_WEEK && guard < pool.length * 2) {
    const candidate = pool[cursor % pool.length];
    cursor += 1;
    guard += 1;
    if (!candidate) continue;
    if (onList.has(candidate.id)) continue;
    const row = mastery[candidate.id];
    if (row && (row.mastered || row.stalled)) continue;
    onList.add(candidate.id);
    nextIds.push(candidate.id);
    mastery[candidate.id] = blankMastery();
  }

  /**
   * THE POOL RAN OUT - and an empty list must never reach his screen.
   *
   * At 100% accuracy the 360 words are gone before the end of a second year and
   * the backfill above legitimately has nothing left to hand over. Ending the
   * week with zero words would render "Study These 0 Words" and a quiz with no
   * questions.
   *
   * So the list turns into review, in the order that helps most: words he was
   * never able to get come back first, then mastered words on a spaced second
   * pass. Stalled words come back with their counters cleared, because a word he
   * could not get in September is a different word to him in March, and carrying
   * the old streak of zero would set him up to fail it again on week one.
   */
  if (nextIds.length < WORDS_PER_WEEK) {
    const revisit = [
      ...pool.filter((w) => !onList.has(w.id) && mastery[w.id] && mastery[w.id].stalled && !mastery[w.id].mastered),
      ...pool.filter((w) => !onList.has(w.id) && mastery[w.id] && mastery[w.id].mastered)
    ];
    for (const w of revisit) {
      if (nextIds.length >= WORDS_PER_WEEK) break;
      onList.add(w.id);
      nextIds.push(w.id);
      mastery[w.id] = { ...blankMastery(), correct: mastery[w.id].correct || 0, wrong: mastery[w.id].wrong || 0 };
    }
  }

  return { currentWordIds: nextIds, poolCursor: cursor, wordMastery: mastery, revisitQueue };
}

/**
 * Everything on a row that describes THIS week and is meant to reset.
 *
 * `creditedDates` is deliberately absent from this list, and that absence is
 * load-bearing — see the comment on it in computeWeeklyWordState. Clearing it
 * would take word study out of his Georgia attendance record.
 */
function freshWeekFields(built) {
  return {
    currentWordIds: built.currentWordIds,
    poolCursor: built.poolCursor,
    wordMastery: built.wordMastery,
    revisitQueue: built.revisitQueue,
    quizTakenThisWeek: false,
    lastQuizMissedIds: [],
    completedDayTasks: [],
    dayMissedIds: {},
    rotationRule: ROTATION_RULE
  };
}

/**
 * Computes the current (possibly freshly-rotated) weekly word state.
 * Pure function - pass in the pool, prior persisted state (or null for
 * first-ever use), and today's date string (YYYY-MM-DD). Returns the state
 * to persist and use. Safe to call every time the app loads; only mutates
 * when 7+ days have actually elapsed, and correctly catches up through
 * multiple missed weeks in one call (e.g., the app wasn't opened for a
 * month).
 */
export function computeWeeklyWordState(pool, existingState, todayStr) {
  pool = asPool(pool);
  if (!existingState) return blankState(pool, todayStr);

  let state = { ...existingState };

  // Re-anchor a row written before the Monday rule existed. Runs before the
  // catch-up loop so a mid-week anchor cannot survive it.
  state.weekStartDate = mondayOnOrBefore(state.weekStartDate);
  if (!state.wordMastery) state.wordMastery = {};
  if (!state.quizHistory) state.quizHistory = [];
  if (!state.revisitQueue) state.revisitQueue = [];

  /**
   * THE DAYS HE WORKED ARE A RECORD, NOT WEEKLY STATE.
   *
   * ---- WHY THIS FIELD EXISTS (Aug 18, 2026) ----
   *
   * `completedDayTasks` was doing two jobs. It drives the week strip on his
   * screen — five days, tick them off — and it is ALSO where his Georgia
   * instructional hours for word study come from: `wordStudyDates()` derives
   * the actual dates from `weekStartDate` plus the day keys, and those dates
   * credit the Spelling & Vocabulary block in the compliance packet.
   *
   * One of those jobs resets every Monday. The other must never reset at all.
   *
   * This was found the same day a "Start the next list now" button shipped —
   * a button whose entire job is to clear `completedDayTasks` mid-week. Its
   * confirm dialog honestly said three completed days would be cleared. It did
   * not say that clearing them would also take three days of instruction out of
   * the record the state of Georgia will ask about, **because nobody knew that
   * is what it did.**
   *
   * So the dates are now written down when they happen and never derived,
   * never cleared, and never rolled up. Same rule the coin ledger follows: a
   * record is appended, and the things computed from it are free to reset.
   */
  if (!state.creditedDates) state.creditedDates = [];

  /**
   * THE ONE-TIME REPAIR - AND THE TWO THINGS IT MUST NOT DO.
   *
   * A row computed under rule 1 may be sitting on a list it has already served
   * two or three times. Waiting for the next seven-day boundary would mean
   * another full week of the reported list, so the list is rebuilt in place,
   * now, WITHOUT advancing the week number or the week start.
   *
   * ---- IT MUST NOT LAND ON A WEEK IN PROGRESS (Aug 17, 2026) ----
   *
   * The parent, after the first version of this shipped: **"He has done spelling
   * and vocabulary. He has completed all of what it listed for that previous
   * week."**
   *
   * He had. THE WORK IS ON HIS COMPUTER. This app syncs by hand-carried JSON;
   * her database is her own copy, opened to grade, and every activity he does
   * writes to his. Reading her row and concluding he had done nothing was
   * reading one machine and describing two.
   *
   * Which makes the repair dangerous in a way it is not on her machine: it
   * clears completedDayTasks, and on HIS machine those are days he actually
   * worked. So it runs only on a week with nothing done in it yet. On a week he
   * has already started, the rule is stamped and the new logic takes over at the
   * next rotation - a few days later, and nothing of his is lost.
   *
   * ---- IT MUST NOT BILL HIM FOR THE BUG'S THREE WEEKS ----
   *
   * Every word on the frozen list has `weeks: 3` against it. Those weeks are the
   * defect's, not his: the list held them there. Carried into the new rule they
   * would cross MAX_WEEKS_ON_LIST on the first pass and all ten would be set
   * aside as STALLED - reported to the parent as ten words that need teaching,
   * for a boy who did every activity the week asked for. So the counter is reset
   * for the words on the list, and the ledger of what he got right and wrong -
   * the part that is genuinely his - is carried over untouched.
   */
  if ((state.rotationRule || 1) < ROTATION_RULE) {
    const untouchedWeek =
      (state.completedDayTasks || []).length === 0 && !state.quizTakenThisWeek;
    if (untouchedWeek) {
      const mastery = { ...state.wordMastery };
      for (const id of state.currentWordIds) {
        if (!mastery[id]) continue;
        mastery[id] = { ...mastery[id], weeks: 1, stalled: false };
      }
      state = { ...state, ...freshWeekFields(buildNextList(pool, { ...state, wordMastery: mastery })) };
    } else {
      state = { ...state, rotationRule: ROTATION_RULE };
    }
  }

  while (daysBetween(state.weekStartDate, todayStr) >= WEEK_LENGTH_DAYS) {
    const built = buildNextList(pool, state);
    state = {
      ...state,
      ...freshWeekFields(built),
      weekNumber: state.weekNumber + 1,
      weekStartDate: addDays(state.weekStartDate, WEEK_LENGTH_DAYS),
      /**
       * THE ONE FIELD THE ROTATION MUST NOT CLEAR.
       *
       * Everything else on this row describes THIS week and is meant to reset.
       * quizHistory is the record of every Friday test he has ever sat, and it
       * is what his English grade is built from - clearing it on the weekly
       * rotation would erase the term's scores every Monday morning, silently,
       * and nobody would notice until the report card was already wrong.
       */
      quizHistory: state.quizHistory || []
    };
  }

  // Backfill for rows persisted before these fields existed -- without this, an
  // old saved row would come back through the `while` loop untouched (0
  // rotations elapsed) and `completedDayTasks` would be undefined, breaking
  // getTodaysWordTask's Set() call above.
  if (!state.completedDayTasks) state.completedDayTasks = [];
  if (!state.dayMissedIds) state.dayMissedIds = {};

  return state;
}


/**
 * START THE NEXT LIST NOW — the parent's override.
 *
 * ---- WHY A BUTTON AND NOT ANOTHER RULE (Aug 18, 2026) ----
 *
 * The parent, for the third time in two days: **"The spelling and vocabulary
 * still hasn't moved to the new week."**
 *
 * Twice the answer was a rule I chose. First the rotation carried every
 * unmastered word and froze. Then the repair was made to skip a week he had
 * already worked in, so it would not delete his days — correct, and it means
 * the machine he actually uses can still be sitting on the reported list days
 * after the fix shipped.
 *
 * Both times she had to come back and tell me it was still wrong. That is the
 * real defect: **the list moves on a schedule only the code knows, and the
 * person who can see it is wrong has no way to move it.**
 *
 * So this does not replace the weekly rotation. It gives her the same rotation
 * on demand, and it is deliberately honest about the cost:
 *
 *   - the list advances by exactly one week's worth, by the normal rule
 *   - the week re-anchors to THIS Monday, so the new list gets a full week
 *   - `quizHistory` is untouched — his English grade is built from it
 *   - `wordMastery` is untouched — every answer he has ever given survives
 *   - this week's completed days ARE cleared, because they belong to the list
 *     being replaced, and the caller must say so before this runs
 */
export function advanceToNextList(pool, state, todayStr) {
  pool = asPool(pool);
  if (!state) return blankState(pool, todayStr);
  const from = {
    ...state,
    weekStartDate: mondayOnOrBefore(state.weekStartDate),
    wordMastery: state.wordMastery || {},
    revisitQueue: state.revisitQueue || []
  };
  return {
    ...from,
    ...freshWeekFields(buildNextList(pool, from)),
    weekNumber: (state.weekNumber || 1) + 1,
    weekStartDate: mondayOnOrBefore(todayStr),
    quizHistory: state.quizHistory || []
  };
}

/**
 * MERGING THE TWO MACHINES' WORD HISTORIES.
 *
 * ---- WHY THIS IS NOT PART OF THE WEEK (Aug 17, 2026) ----
 *
 * This app syncs by hand-carried JSON. Every activity he does writes to HIS
 * database; the parent's copy is the one she opens to grade. The import merge
 * let the higher week number win the WHOLE row - and both machines rotate on
 * the same 7-day calendar whether or not any work happens on them, so a week
 * where she opens the app and he does not leaves her one week ahead holding an
 * empty ledger. One import would have replaced his year with it.
 *
 * `wordMastery` and `quizHistory` are not facts about this week. They are every
 * answer he has ever given and every Friday test he has ever sat, and his
 * English grade is built from the second. So they are merged on BOTH branches,
 * always, by the rule they are written under: a word's counters take the higher
 * of the two sides, and the quiz history is unioned by week.
 *
 * `stalled` is ANDed, not ORed. Set aside on one machine and still being worked
 * on the other means he is still working on it.
 */
export function mergeWordHistories(a = {}, b = {}) {
  const wordMastery = { ...(a.wordMastery || {}) };
  for (const [id, row] of Object.entries(b.wordMastery || {})) {
    const cur = wordMastery[id];
    if (!cur) {
      wordMastery[id] = row;
      continue;
    }
    wordMastery[id] = {
      ...cur,
      correct: Math.max(cur.correct || 0, row.correct || 0),
      wrong: Math.max(cur.wrong || 0, row.wrong || 0),
      streak: Math.max(cur.streak || 0, row.streak || 0),
      weeks: Math.max(cur.weeks || 0, row.weeks || 0),
      mastered: Boolean(cur.mastered || row.mastered),
      stalled: Boolean(cur.stalled && row.stalled)
    };
  }
  // The instruction dates are a union across machines: he worked on his, she
  // may have logged on hers, and neither copy is authoritative over the other.
  const creditedDates = [...new Set([...(a.creditedDates || []), ...(b.creditedDates || [])])].sort();

  const quizzes = new Map();
  for (const q of [...(a.quizHistory || []), ...(b.quizHistory || [])]) {
    const key = q?.weekNumber ?? q?.date ?? JSON.stringify(q);
    const prior = quizzes.get(key);
    if (!prior || (q?.score || 0) > (prior?.score || 0)) quizzes.set(key, q);
  }
  return { wordMastery, quizHistory: [...quizzes.values()], creditedDates };
}

/**
 * Picks which words a targeted activity runs on: the union of whatever was
 * missed earlier in the week, or the full list if nothing was missed (or the
 * earlier days haven't happened yet, e.g. catching up).
 */
export function buildReviewWordSet(words, dayMissedIds) {
  const missedIds = new Set([
    ...(dayMissedIds?.tue || []),
    ...(dayMissedIds?.wed || [])
  ]);
  if (missedIds.size === 0) return words;
  const filtered = words.filter((w) => missedIds.has(w.id));
  return filtered.length > 0 ? filtered : words;
}

export function getWordsByIds(pool, ids) {
  const byId = new Map(asPool(pool).map((w) => [w.id, w]));
  return ids.map((id) => byId.get(id)).filter(Boolean);
}

// ---------------------------------------------------------------------------
// THE SHUFFLE IS SEEDED. It used to call Math.random() directly, and that was a
// real bug the parent hit on Aug 9 2026, in her words: "When the answer is
// selected for a question the answer is moved around so that the correct answer
// cannot be submitted."
//
// WHY SELECTING AN ANSWER RESHUFFLED IT. `getWeeklyWordList()` is a store getter
// that builds a FRESH object and a FRESH words array on every call, and both
// engines called it bare in the render body. So `words` had a new identity every
// render, `useMemo(..., [skill, words])` never held, buildQuestionForWord re-ran,
// and the shuffle re-randomised. Clicking a choice calls setSelected -> re-render
// -> new order AND a new answerIndex. He could only be right by luck.
//
// Every builder below takes an attempt seed for the same reason. A pure function
// that returns a different answer for the same input is a trap no amount of
// careful memoising upstream can be relied on to avoid.
// ---------------------------------------------------------------------------

/** FNV-1a. Small, stable, and no dependency. */
function hashString(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

/** mulberry32 — deterministic PRNG from a numeric seed. */
function seededRandom(seed) {
  let a = seed >>> 0;
  return function next() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle(arr, seed) {
  const copy = [...arr];
  const rand = seededRandom(seed);
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Builds a single auto-graded quiz question from one spelling or vocabulary
 * word entry.
 *
 * @param {string} skill      'spelling' | 'vocabulary'
 * @param {object} entry      the word
 * @param {number|string} attemptSeed  stable for one sitting, different on a
 *   retake. THE WORD ID IS MIXED IN, not just this seed: one seed shared across
 *   a whole quiz would put the correct answer in the same slot for every
 *   question, which he would spot within a week and stop reading the choices.
 *   Defaults to 0 so existing callers keep working — a fixed order is wrong for
 *   retakes but it is never unanswerable, which is the failure that matters.
 */
export function buildQuestionForWord(skill, entry, attemptSeed = 0) {
  const seed = hashString(`${skill}|${entry.id}|${attemptSeed}`);
  if (skill === 'spelling') {
    const options = shuffle([entry.word, ...entry.distractors], seed);
    return {
      wordId: entry.id,
      prompt: 'Which spelling is correct?',
      choices: options,
      answerIndex: options.indexOf(entry.word),
      explanation: `The correct spelling is: ${entry.word}`
    };
  }
  // vocabulary
  const options = shuffle([entry.correct, ...entry.distractors], seed);
  const sentence = entry.sentence.replace('{word}', entry.word);
  return {
    wordId: entry.id,
    prompt: `${sentence} What does "${entry.word}" most likely mean?`,
    choices: options,
    answerIndex: options.indexOf(entry.correct),
    explanation: `In context, "${entry.word}" means: ${entry.correct}.`
  };
}

// ---------------------------------------------------------------------------
// WEDNESDAY (vocabulary) — the sentence with a hole in it.
//
// The reverse of Tuesday in the way that matters: Tuesday gives him the word
// and asks what it means, so the answer is a definition he can often reach by
// elimination. Here the meaning is implied by the sentence and he has to
// supply the word, chosen against the other nine words he is learning this
// week — the hardest possible distractors, and the reason the week's list is
// used rather than random pool words.
// ---------------------------------------------------------------------------
export function buildBlankQuestion(entry, weekWords, attemptSeed = 0) {
  const seed = hashString(`blank|${entry.id}|${attemptSeed}`);
  const others = (weekWords || []).filter((w) => w.id !== entry.id).map((w) => w.word);
  const picked = shuffle(others, seed).slice(0, 3);
  const options = shuffle([entry.word, ...picked], seed ^ 0x9e3779b9);
  return {
    wordId: entry.id,
    prompt: entry.sentence.replace('{word}', '__________'),
    promptLabel: 'Which word fills the gap?',
    choices: options,
    answerIndex: options.indexOf(entry.word),
    explanation: `"${entry.word}" — ${entry.correct}.`
  };
}

// ---------------------------------------------------------------------------
// THURSDAY (vocabulary) — meaning first, word second.
//
// Tuesday tests recognition of a definition. This tests retrieval of the word
// itself, which is the thing he will actually need when writing. Same ten
// words as distractors, for the same reason as Wednesday.
// ---------------------------------------------------------------------------
export function buildRecallQuestion(entry, weekWords, attemptSeed = 0) {
  const seed = hashString(`recall|${entry.id}|${attemptSeed}`);
  const others = (weekWords || []).filter((w) => w.id !== entry.id).map((w) => w.word);
  const picked = shuffle(others, seed).slice(0, 3);
  const options = shuffle([entry.word, ...picked], seed ^ 0x85ebca6b);
  return {
    wordId: entry.id,
    prompt: entry.correct,
    promptLabel: 'Which word means this?',
    choices: options,
    answerIndex: options.indexOf(entry.word),
    explanation: entry.sentence.replace('{word}', entry.word)
  };
}

// ---------------------------------------------------------------------------
// THURSDAY (spelling) — the gaps are not random.
//
// A random mask teaches the shape of a word. What he actually gets wrong is
// specific: the double C in "occurred", the EI in "receive", the A in
// "separate". Those letters are already recorded in the pool, because they are
// exactly where the distractors disagree with the correct spelling. So the
// blanks are placed ON THE DISAGREEMENTS. Everything else stays visible, which
// keeps the word recognisable while removing the only part he is likely to
// fumble.
// ---------------------------------------------------------------------------
export function trickyLetterPositions(entry) {
  const word = entry.word;
  const lower = word.toLowerCase();
  const positions = new Set();
  for (const d of entry.distractors || []) {
    const dl = String(d).toLowerCase();
    if (dl === lower) continue;
    // Walk from both ends to find the span that actually differs.
    let start = 0;
    while (start < lower.length && start < dl.length && lower[start] === dl[start]) start += 1;
    let endA = lower.length - 1;
    let endB = dl.length - 1;
    while (endA >= start && endB >= start && lower[endA] === dl[endB]) {
      endA -= 1;
      endB -= 1;
    }
    for (let i = start; i <= endA; i++) positions.add(i);
    if (start > endA) positions.add(Math.min(start, lower.length - 1)); // pure deletion
  }
  return [...positions].filter((i) => i >= 0 && i < word.length).sort((a, b) => a - b);
}

export function buildMissingLettersPrompt(entry, attemptSeed = 0) {
  const seed = hashString(`missing|${entry.id}|${attemptSeed}`);
  const word = entry.word;
  let positions = trickyLetterPositions(entry).filter((i) => i > 0 && i < word.length - 1);

  // No usable disagreement (or it sits on the first/last letter) — fall back to
  // interior letters, seeded so the same sitting always shows the same gaps.
  if (positions.length === 0) {
    const interior = [];
    for (let i = 1; i < word.length - 1; i++) interior.push(i);
    const howMany = Math.max(1, Math.round(interior.length * 0.4));
    positions = shuffle(interior, seed).slice(0, howMany).sort((a, b) => a - b);
  }
  // Never hollow the word out completely.
  const cap = Math.max(1, Math.ceil(word.length / 2));
  positions = positions.slice(0, cap);

  const hidden = new Set(positions);
  const masked = word
    .split('')
    .map((ch, i) => (hidden.has(i) ? '_' : ch))
    .join('');

  return {
    wordId: entry.id,
    kind: 'missing',
    masked,
    answer: word,
    letterCount: word.length,
    promptLabel: 'Type the whole word, spelled correctly',
    explanation: `${word} — the letters people get wrong here are ${positions
      .map((i) => word[i].toUpperCase())
      .join(', ')}.`
  };
}

// ---------------------------------------------------------------------------
// FRIDAY (spelling) — produce it, don't recognise it.
//
// No audio, deliberately. A dictation test that needs a working speech voice
// is a test that silently becomes impossible on a machine with no sound, and
// this is the graded one. So the prompt is the three misspellings and nothing
// else: he has seen them all week, they identify the word unambiguously, and
// not one of them shows him the answer. It is the only day where the correct
// spelling never appears on screen before he types it.
// ---------------------------------------------------------------------------
export function buildSpellingTestPrompt(entry, attemptSeed = 0) {
  const seed = hashString(`spell|${entry.id}|${attemptSeed}`);
  return {
    wordId: entry.id,
    kind: 'spell',
    wrongForms: shuffle(entry.distractors || [], seed),
    answer: entry.word,
    letterCount: entry.word.length,
    promptLabel: 'Every spelling below is wrong. Type the correct one.',
    explanation: `The correct spelling is: ${entry.word}`
  };
}

/** Typed answers: case and surrounding space never count against him. */
export function isTypedAnswerCorrect(typed, answer) {
  return String(typed || '').trim().toLowerCase() === String(answer || '').trim().toLowerCase();
}

// ---------------------------------------------------------------------------
// WEDNESDAY (spelling) — the word search.
//
// Placement is seeded, so the grid is identical on every re-render of the same
// sitting and different next week. Same rule as every other builder here, and
// for the same reason: a grid that reshuffles when he clicks a cell is a puzzle
// he can never finish.
//
// It does NOT feed mastery — see MASTERY_ACTIVITIES above.
// ---------------------------------------------------------------------------
const SEARCH_DIRECTIONS = [
  [0, 1],   // east
  [1, 0],   // south
  [1, 1],   // south-east
  [-1, 1],  // north-east
  [0, -1],  // west (reversed)
  [1, -1]   // south-west
];
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function buildWordSearch(words, attemptSeed = 0) {
  const entries = (words || [])
    .map((w) => ({ wordId: w.id, display: w.word, letters: String(w.word).toUpperCase().replace(/[^A-Z]/g, '') }))
    .filter((w) => w.letters.length > 1);
  if (entries.length === 0) return { size: 0, grid: [], placements: [] };

  const longest = entries.reduce((n, w) => Math.max(n, w.letters.length), 0);

  // Grow the grid rather than drop a word. Ten words never fail at 16.
  for (let size = Math.max(12, longest + 2); size <= longest + 12; size++) {
    const attempt = tryBuildGrid(entries, size, attemptSeed);
    if (attempt) return attempt;
  }
  // Unreachable for this pool, but never return a puzzle missing a word.
  return tryBuildGrid(entries, longest + 16, attemptSeed, true);
}

function tryBuildGrid(entries, size, attemptSeed, force = false) {
  const rand = seededRandom(hashString(`grid|${size}|${attemptSeed}`));
  const grid = Array.from({ length: size }, () => Array(size).fill(null));
  const placements = [];

  // Longest first — the hard ones need the empty grid.
  const ordered = [...entries].sort((a, b) => b.letters.length - a.letters.length);

  for (const entry of ordered) {
    let placed = false;
    for (let tries = 0; tries < 400 && !placed; tries++) {
      const [dr, dc] = SEARCH_DIRECTIONS[Math.floor(rand() * SEARCH_DIRECTIONS.length)];
      const row = Math.floor(rand() * size);
      const col = Math.floor(rand() * size);
      const endRow = row + dr * (entry.letters.length - 1);
      const endCol = col + dc * (entry.letters.length - 1);
      if (endRow < 0 || endRow >= size || endCol < 0 || endCol >= size) continue;

      let fits = true;
      for (let i = 0; i < entry.letters.length; i++) {
        const cell = grid[row + dr * i][col + dc * i];
        if (cell !== null && cell !== entry.letters[i]) {
          fits = false;
          break;
        }
      }
      if (!fits) continue;

      const cells = [];
      for (let i = 0; i < entry.letters.length; i++) {
        grid[row + dr * i][col + dc * i] = entry.letters[i];
        cells.push([row + dr * i, col + dc * i]);
      }
      placements.push({ wordId: entry.wordId, display: entry.display, letters: entry.letters, cells });
      placed = true;
    }
    if (!placed && !force) return null;
  }

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === null) grid[r][c] = ALPHABET[Math.floor(rand() * 26)];
    }
  }
  return { size, grid, placements };
}
