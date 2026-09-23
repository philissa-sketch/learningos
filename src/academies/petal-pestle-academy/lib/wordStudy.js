/**
 * WORD STUDY — which ten words are hers this week, and what carries.
 *
 * ---- ⚠️ HIS RULE IS A CALENDAR. THIS APP REFUSES ONE. ----
 *
 * The carry-over rule was decided months ago and written into year-plan-03,
 * taken from Lamar's app:
 *
 *   "The list rotates on a strict 7-day calendar whether or not the test was
 *    passed. Words missed carry into next week and are topped up to ten. A test
 *    never taken carries the whole list forward, treated as fully missed —
 *    never silently dropped."
 *
 * THE SEVEN DAYS CANNOT COME ACROSS. §7.1: "a quarter is a sequence, not a set
 * of dates", and this app has no calendar and has refused one twice. Lifting a
 * mechanism out of an app that has something this one deliberately does not is
 * §38, and it is the mistake §44 caught when his book-report DUE DATES were
 * translated to her pace instead of copied.
 *
 * So the rotation is translated the same way: THE LIST ROTATES WHEN HER WEEK
 * ADVANCES, and her week advances when she finishes the lessons in it. That is
 * `spineWeek`, which is what "week 3" already means everywhere else in this app
 * — the book reports, the Khan blocks and the planner all read it.
 *
 * ⚠️ WHAT SURVIVES THE TRANSLATION IS THE PART THAT MATTERS: the list moves on
 * WHETHER OR NOT SHE PASSED. A rotation gated on passing is a child stuck on
 * week 4 in April. His rule says so in six words and hers must too.
 *
 * ---- WHAT DOES NOT CARRY ----
 *
 * A word she spelled correctly. That is the whole of it.
 *
 * ---- ⚠️ AND READ-ALOUD HERE IS NOT AN AID ----
 *
 * Everywhere else in this app, read-aloud is help, and `unaidedPercent` exists
 * because a score earned while being read to is a listening score wearing a
 * reading score's name (v3.80).
 *
 * A SPELLING TEST IS THE OPPOSITE. Hearing the word IS the test — that is how
 * every spelling test in every school works, and the word must NOT be on screen
 * while she types it. So nothing here records an "unaided" percentage, and
 * nothing should ever be added. A number that means nothing is worse than no
 * number, because somebody will grade her against it.
 */

import { WEEKS } from '../config/assessment.js';
import { WORD_STUDY_WEEKS, WORDS_PER_WEEK } from '../data/words/wordStudy.js';
import { spineWeek, quarterOfWeek, weekWithinQuarter } from './bookReportSchedule.js';
import { letterForPercent, percentFromFraction } from './khanGrade.js';

export { WORDS_PER_WEEK };

/** The list id for one week — stable, and what a result is filed under. */
export function listIdFor(quarter, n) {
  return `word-study-q${quarter}-w${n}`;
}

/** The frozen ten for one week of the year, or null when there is no such week. */
export function weekEntry(quarter, n) {
  return WORD_STUDY_WEEKS.find((w) => w.quarter === quarter && w.n === n) || null;
}

/**
 * Every week up to and including `throughWeek`, in order, oldest first.
 * `throughWeek` is a spine week (1..32), not a week within a quarter.
 */
function weeksThrough(throughWeek) {
  const out = [];
  for (let wk = 1; wk <= throughWeek; wk += 1) {
    const entry = weekEntry(quarterOfWeek(wk), weekWithinQuarter(wk));
    if (entry) out.push({ spineWeek: wk, entry });
  }
  return out;
}

/**
 * The ten words she practises this week.
 *
 * `results` is the list of recorded spelling results, each:
 *   { listId, rows: [{ word, correct }] }
 *
 * Returns:
 *   {
 *     week, quarter, weekInQuarter, listId,
 *     carried: [{ word, from, missedIn }],   — words that did not stick
 *     fresh:   [{ word, from }],             — this week's new words
 *     list:    [...carried, ...fresh],       — ten, unless the pool ran out
 *     stalled: boolean                       — carried alone fills the ten
 *   }
 *
 * ⚠️ CARRIED WORDS COME FIRST AND ARE NEVER DROPPED TO MAKE ROOM FOR NEW ONES.
 * If she misses enough that ten carried words fill the list, `stalled` is true
 * and NO fresh words are added that week. That is the correct outcome — moving
 * her on from words she cannot spell is how a list becomes decoration — but it
 * is surfaced rather than silent, because a child who stalls for a month is a
 * thing a grown-up has to be told about, not something for a check to notice.
 */
export function wordListFor(lessonsRead = [], results = [], weeks = WEEKS) {
  const week = spineWeek(lessonsRead, weeks);
  const quarter = quarterOfWeek(week);
  const weekInQuarter = weekWithinQuarter(week);
  const listId = listIdFor(quarter, weekInQuarter);

  // What she got right, ever. A word spelled correctly is done.
  const correct = new Set();
  const testedLists = new Set();
  for (const r of results || []) {
    if (!r) continue;
    testedLists.add(r.listId);
    for (const row of r.rows || []) {
      if (row && row.correct) correct.add(String(row.word).toLowerCase());
    }
  }

  // ---- carried: every earlier week's word she has not got right ----
  //
  // A week never tested contributes ALL ten, because "never taken" is treated
  // as fully missed. That is his rule, word for word, and it is the half that
  // stops a list being escaped by not sitting it.
  const carried = [];
  for (const { spineWeek: wk, entry } of weeksThrough(week - 1)) {
    const wasTested = testedLists.has(listIdFor(entry.quarter, entry.n));
    for (const item of entry.spelling) {
      if (correct.has(item.word.toLowerCase())) continue;
      carried.push({
        word: item.word,
        from: item.from,
        missedIn: listIdFor(entry.quarter, entry.n),
        neverTested: !wasTested,
        weekOf: wk
      });
    }
  }

  const thisWeek = weekEntry(quarter, weekInQuarter);
  const freshPool = thisWeek
    ? thisWeek.spelling.filter((i) => !correct.has(i.word.toLowerCase()))
    : [];

  const keptCarried = carried.slice(0, WORDS_PER_WEEK);
  const room = WORDS_PER_WEEK - keptCarried.length;
  const fresh = room > 0 ? freshPool.slice(0, room) : [];

  return {
    week,
    quarter,
    weekInQuarter,
    listId,
    carried: keptCarried,
    carriedTotal: carried.length,
    fresh,
    list: [...keptCarried, ...fresh],
    stalled: keptCarried.length >= WORDS_PER_WEEK
  };
}

/** This week's ten vocabulary terms — no carry-over; they are read, not tested. */
export function vocabularyFor(lessonsRead = [], weeks = WEEKS) {
  const week = spineWeek(lessonsRead, weeks);
  const entry = weekEntry(quarterOfWeek(week), weekWithinQuarter(week));
  return entry ? entry.vocabulary : [];
}

/**
 * Mark a finished spelling test.
 *
 * ⚠️ ONE LADDER. `letterForPercent` is the same thirteen-band table the Khan
 * units and the book reports use — v3.84 exists because this app once had two
 * ladders that disagreed above 97% and put two different letters on one Georgia
 * record. There is no second table here and there must never be one.
 *
 * Comparison is trimmed and case-insensitive. A nine-year-old typing `Seed `
 * has spelled seed. Capitalisation is a different skill and this is not the
 * screen that teaches it.
 */
export function gradeSpelling(list, typed = {}) {
  const rows = (list || []).map((item) => {
    const given = String(typed[item.word] ?? '').trim();
    return {
      word: item.word,
      from: item.from,
      given,
      skipped: given === '',
      correct: given.toLowerCase() === item.word.toLowerCase()
    };
  });

  const right = rows.filter((r) => r.correct).length;
  const total = rows.length;
  const percent = percentFromFraction(right, total);

  return { rows, right, total, percent, letter: letterForPercent(percent) };
}
