// ---------------------------------------------------------------------------
// THE RULES FOR COMBINING TWO COPIES OF THE APP.
//
// Pulled out of db.js as pure functions for one reason: they are the part that
// can silently destroy something, and Dexie cannot be run outside a browser, so
// anything left inside db.js is untestable. A merge rule nobody can test is a
// merge rule nobody should trust with a child's only copy of her writing.
//
// ---- THE HAZARD, NAMED ----
//
// `answers` and `sittings` are keyed by an AUTO-INCREMENT id. Azianna's answer
// #12 on her laptop and a different answer #12 on her grandmother's are not the
// same event. Any merge that trusts that id will treat them as one row and lose
// one of them, and it will do it quietly.
//
// So the id is thrown away on import and rows are matched on what they actually
// are. An answer is (which question, when). A sitting is (when it started).
//
// The ledger and the journal never had this problem because their ids are
// UUIDs — chosen at the start precisely so two machines could merge. These
// tables predate that decision.
// ---------------------------------------------------------------------------

/** What an answer IS, independent of which machine numbered it. */
export function answerKey(a) {
  return `${a.itemId}|${a.at}`;
}

/** What a sitting IS. Two sittings cannot start on the same millisecond. */
export function sittingKey(s) {
  return String(s.startedAt);
}

/**
 * Is this strand mid-re-measure — an unfinished reading with real evidence?
 *
 * `asked > 0` is not decoration. A re-measure that has been STARTED and not yet
 * answered is an empty row, and an empty row must never beat a real measurement.
 */
export function isInProgress(s) {
  return !!s && s.settled === false && (s.asked || 0) > 0;
}

/**
 * Which copy of a strand result to keep.
 *
 * The machine that actually sat the test is the authority for that strand. A
 * strand answered 8 times beats the same strand answered 0 times, every time,
 * regardless of which side is "local".
 *
 * ---- AND THAT RULE INVERTS DURING A RE-MEASURE. FOUND Aug 19. ----
 *
 * A re-measure STARTS THE COUNT OVER. So while one is running, the higher
 * `asked` belongs to the OLD reading, and "more answers wins" hands the merge to
 * the file that knows less.
 *
 * This was not hypothetical. Read off her two real files on Aug 19:
 *
 *   geometry          Aug 13: asked 8, settled, 2.00  |  Aug 18: asked 3, running, 2.70
 *   measurement-data  Aug 13: asked 7, settled, 2.00  |  Aug 18: asked 3, running, 2.70
 *   writing-strategies Aug 13: asked 7, settled, 2.45 |  Aug 18: asked 3, running, 2.70
 *   grammar-usage     Aug 13: asked 7, settled, 2.15  |  Aug 18: asked 4, running, 2.20
 *
 * Loading the Aug 13 file would have reverted ALL FOUR and re-flagged them
 * `settled: true` — which would also have let the goals engine set targets on
 * numbers that had just been thrown away. Geometry and Measurement would have
 * gone back to 2.00, the item-bank FLOOR that was never a measurement of her.
 *
 * So: A READING STILL BEING TAKEN BEATS A FINISHED OLDER ONE, whichever side it
 * is on and whatever the counts say. When both are running, or neither is, the
 * original rule stands and the count decides.
 *
 * ---- THE LIMIT OF THIS, SAID OUT LOUD (rule 17) ----
 *
 * `strandStates` carries no timestamp, so two half-finished re-measures on two
 * machines still fall back to the count, and the count cannot tell which was
 * started later. That case does not exist today — the re-measure runs on her
 * laptop only. THE WAY BACK: if a strand row ever carries a `lastAnsweredAt`,
 * prefer it over `asked` here and this whole branch becomes unnecessary.
 */
/**
 * Is `candidate` the SAME measurement as `base`, carried further?
 *
 * A re-measure serves specific items and records them in `seenItemIds`. If one
 * side has asked everything the other asked AND more, it is not a rival reading
 * — it is the same reading, continued. That is the only signal in this table
 * that can tell "later" from "different", because a strand row carries no
 * timestamp.
 *
 * The empty guard matters: a row with no `seenItemIds` is vacuously a subset of
 * everything, and would make every comparison a "continuation".
 */
export function isContinuationOf(candidate, base) {
  const seen = base?.seenItemIds || [];
  if (seen.length === 0) return false;
  const has = new Set(candidate?.seenItemIds || []);
  if (has.size <= seen.length) return false;
  return seen.every((id) => has.has(id));
}

/**
 * Which copy of a strand result to keep.
 *
 * ---- ⚠️ THIS WAS WRONG FOR ONE DAY AND IT NEARLY COST HER RE-MEASURE ----
 *
 * Aug 19, morning: `pickStrand` kept whichever side had the higher `asked`, and
 * a RE-MEASURE RESTARTS THE COUNT — so the Aug 13 file (geometry asked 8,
 * settled, 2.00) beat the in-progress Aug 18 reading (asked 3, 2.70). Loading
 * the old file would have reverted all four strands. The fix: an in-progress
 * reading beats a finished one.
 *
 * Aug 19, evening. Gigi: "she worked today." Azianna FINISHED the re-measure on
 * her laptop, so the incoming reading is asked 12 and SETTLED, and the local
 * one is still the half-done asked-3 stub. THE MORNING'S FIX THEN KEPT THE
 * STUB AND THREW AWAY THE COMPLETED MEASUREMENT — the exact loss it was written
 * to prevent, running in the opposite direction, twelve hours later.
 *
 * "In progress" was never the real signal. It is a proxy for "more recent", and
 * it is only a good proxy while the re-measure is unfinished.
 *
 * ---- THE SIGNAL THAT ACTUALLY WORKS: seenItemIds ----
 *
 * Read off her real files, geometry:
 *
 *   Aug 13 settled: ge-area-v2, ge-sides-v1, ge-sides-v0, ge-sides-v2,
 *                   ge-perim-v2, ge-perim-v0, ge-perim-v1, ge-area-v0
 *   Aug 18 running: ge-area-v1, fo-nameshape-v2, fo-sameshape-v0
 *
 * NOT ONE ITEM IN COMMON. The re-measure served easier items that had not
 * existed before, so the old file is plainly a DIFFERENT reading, not a later
 * one. But a file taken after she carries on today holds those same three ids
 * plus the rest — it is the SAME reading, continued, and it must win.
 *
 * So: continuation first, and only then the in-progress rule for the case where
 * the two sides share no history at all.
 */
export function pickStrand(local, incoming) {
  if (!local) return incoming;
  if (!incoming) return local;

  // 1. THE SAME MEASUREMENT, CARRIED FURTHER. Beats everything below, because
  //    it is not a competing reading — it is more of this one.
  if (isContinuationOf(incoming, local)) return incoming;
  if (isContinuationOf(local, incoming)) return local;

  // 2. NO SHARED HISTORY: the sides are different readings. A reading still
  //    being taken is the newer one, and the finished older one must not
  //    overwrite it. This is the Aug 13 case.
  if (isInProgress(incoming) && !isInProgress(local)) return incoming;
  if (isInProgress(local) && !isInProgress(incoming)) return local;

  // 3. Same kind of reading, no shared history: the count decides, as it always did.
  return (incoming.asked || 0) > (local.asked || 0) ? incoming : local;
}

/**
 * Which copy of a journal entry to keep — the one edited most recently.
 *
 * Her writing is the only thing in this database that cannot be regenerated, so
 * when the same entry exists on both sides the newer edit wins rather than
 * whichever happened to be written last.
 */
export function pickJournal(local, incoming) {
  if (!local) return incoming;
  if (!incoming) return local;
  const stamp = (x) => String(x?.editedAt || x?.at || '');
  return stamp(incoming) > stamp(local) ? incoming : local;
}

/**
 * Which copy of a message to keep. Union, and READ beats unread — a note she
 * has opened must not go back to looking new because a stale copy was merged.
 */
export function pickMessage(local, incoming) {
  if (!local) return incoming;
  if (!incoming) return local;
  if (!local.readAt && incoming.readAt) return { ...local, readAt: incoming.readAt };
  return local;
}

/** A day's attendance is the union of the blocks ticked on either machine. */
export function mergeScheduleDay(local, incoming) {
  if (!local) return incoming;
  if (!incoming) return local;
  return { dayKey: local.dayKey, done: { ...local.done, ...incoming.done } };
}

/**
 * Merge two lists keyed by identity rather than by stored id.
 * Returns the rows from `incoming` that are genuinely new.
 */
export function newRows(localRows, incomingRows, keyOf) {
  const have = new Set((localRows || []).map(keyOf));
  return (incomingRows || []).filter((r) => !have.has(keyOf(r)));
}

/**
 * Which copy of a spaced-review box to keep.
 *
 * The LOWER box and the EARLIER due date win. That is the cautious direction and
 * it is chosen on purpose: if her laptop says a question is in box 4 and her
 * grandmother's copy says she missed it yesterday and it is back in box 0, the
 * true state of her memory is box 0. Taking the higher box would quietly retire
 * a question she has actually lost, and nothing would ever surface it again.
 *
 * Seen and missed counts are the MAXIMUM of the two, not the sum — the same
 * sitting synced twice must not double-count into "she has missed this six
 * times" when she missed it three.
 */
export function pickReviewItem(local, incoming) {
  if (!local) return incoming;
  if (!incoming) return local;
  const box = Math.min(local.box ?? 0, incoming.box ?? 0);
  const dueOn = (local.dueOn || '') < (incoming.dueOn || '') ? local.dueOn : incoming.dueOn;
  const lastSeen = (local.lastSeen || '') > (incoming.lastSeen || '') ? local.lastSeen : incoming.lastSeen;
  return {
    questionId: local.questionId,
    box,
    dueOn,
    lastSeen,
    seen: Math.max(local.seen || 0, incoming.seen || 0),
    missed: Math.max(local.missed || 0, incoming.missed || 0),
    source: local.source || incoming.source
  };
}

/**
 * Which copy of a lesson-read record to keep.
 *
 * The earlier first read, the later last read, and the higher count. A lesson
 * opened on both machines was still opened; nothing here can go backwards, which
 * matters because lesson reads are what unlock a unit test.
 */
export function pickLessonRead(local, incoming) {
  if (!local) return incoming;
  if (!incoming) return local;
  // The practice result travels with whichever side read it LAST — it is a
  // record of the most recent attempt, not a best-of. Taking the better one
  // would quietly clear the "needs another look" flag on a lesson she has since
  // fumbled, which is the one thing this field exists to surface.
  const localIsNewer = (local.lastReadAt || '') >= (incoming.lastReadAt || '');
  return {
    lessonId: local.lessonId,
    firstReadAt:
      (local.firstReadAt || '') < (incoming.firstReadAt || '') ? local.firstReadAt : incoming.firstReadAt,
    lastReadAt: localIsNewer ? local.lastReadAt : incoming.lastReadAt,
    reads: Math.max(local.reads || 1, incoming.reads || 1),
    practice: (localIsNewer ? local.practice : incoming.practice) || local.practice || incoming.practice
  };
}

/**
 * Which copy of a project row to keep.
 *
 * A project is finished ONCE, in the real world, with real glue and real dirt.
 * So finished always beats unfinished, and when both machines say finished the
 * EARLIER timestamp wins — that is when she actually did it, and a later sync
 * must not rewrite the date.
 *
 * Un-finishing never travels. If one machine says not-done and the other says
 * done, done wins: the alternative is a merge that quietly takes a finished
 * fortnight's work away from her.
 */
export function pickProject(local, incoming) {
  if (!local) return incoming;
  if (!incoming) return local;
  if (local.doneAt && incoming.doneAt) {
    return local.doneAt <= incoming.doneAt ? local : incoming;
  }
  if (incoming.doneAt && !local.doneAt) return incoming;
  if (local.doneAt && !incoming.doneAt) return local;
  if (local.startedAt && incoming.startedAt) {
    return local.startedAt <= incoming.startedAt ? local : incoming;
  }
  return local;
}

/**
 * A Khan grade entered by a grown-up.
 *
 * These are typed by hand on one machine or the other, keyed by a UUID, and
 * never edited by the app itself. So the merge is a union with one tie-break:
 * if the same id exists on both sides, the one edited most recently wins.
 *
 * NOTHING IS EVER DROPPED. A grade recorded on Gigi's laptop and a grade
 * recorded on Azianna's are two different entries with two different ids, and
 * the record needs both — this is the one table where "I typed it and it
 * vanished" would send a grown-up back to a paper notebook for good.
 */
export function pickKhanGrade(local, incoming) {
  if (!local) return incoming;
  if (!incoming) return local;
  const l = local.editedAt || local.at || 0;
  const i = incoming.editedAt || incoming.at || 0;
  return i > l ? incoming : local;
}

/**
 * A mark on a book report or a research paper.
 *
 * Same shape of problem as a Khan grade and the same answer: typed by hand on
 * one machine or the other, keyed by a UUID, never edited by the app. A union,
 * and where the same id exists on both sides the newer edit wins.
 *
 * NOTHING IS EVER DROPPED. Six pieces a year is the whole of her graded writing
 * record — lose one on a merge and a quarter of it is gone.
 */
export function pickWritingMark(local, incoming) {
  if (!local) return incoming;
  if (!incoming) return local;
  const l = local.editedAt || local.at || 0;
  const i = incoming.editedAt || incoming.at || 0;
  return i > l ? incoming : local;
}

/**
 * A BASELINE IS NEVER OVERWRITTEN — the EARLIER capture wins.
 *
 * Added v3.56 with the baselines table.
 *
 * Every other merge rule in this file asks "which side is more recent" or
 * "which side did more". This one asks the opposite question, and it has to.
 * A baseline is the first measured value, and §3.4 is blunt about why it
 * matters: "a baseline cannot be reconstructed after the fact."
 *
 * Two machines will both capture one the first time she opens a track on each.
 * Hers is the real one — it is where she actually started. Taking the later of
 * the two would quietly move the starting line to wherever the second computer
 * happened to catch up to, and every growth number computed from it afterwards
 * would understate what she did. A baseline that drifts forwards is worse than
 * none, because it looks like a measurement.
 */
export function pickBaseline(local, incoming) {
  if (!local) return incoming;
  if (!incoming) return local;
  return String(incoming.capturedOn) < String(local.capturedOn) ? incoming : local;
}

/**
 * An item event is a thing that HAPPENED. Union by eventId, never overwrite.
 *
 * The same reasoning as the ledger: an answer she gave on her laptop and a
 * different answer given on Gigi's are two events, not one row to reconcile.
 * eventId is a UUID precisely so that combining two lists cannot collide — the
 * failure the auto-increment `answers` table has to work around with
 * answerKey().
 *
 * If the same eventId does arrive twice it is the SAME event arriving twice
 * (the file was loaded twice), so keeping the local copy is correct and
 * loading a backup a second time adds nothing.
 */
export function pickItemEvent(local, incoming) {
  return local || incoming;
}

/**
 * A goal is MEANT to change, so the newer edit wins.
 *
 * Added v3.58. Deliberately the opposite of pickBaseline two functions up, and
 * the pair is worth reading together before either is changed: a BASELINE is
 * where she started and must never move, a GOAL has a lifecycle — proposed,
 * approved, checkpointed, reviewed, met, carried, retired — and the machine
 * that last acted on it is the one telling the truth.
 */
/**
 * Which copy of a journal MARK to keep — the one edited most recently.
 *
 * Same rule as a Khan grade and a writing mark, and for the same reason: a mark
 * is a grown-up's judgement, and the most recent judgement is the one she meant.
 * Unlike a baseline, which never moves, a mark is meant to be changeable — she
 * may re-read an entry and think better of it.
 *
 * NOTHING HERE TOUCHES THE ENTRY. The mark lives in its own table keyed by
 * entryId, so the worst a bad merge can do is lose a mark, never a word of what
 * Azianna wrote.
 */
export function pickJournalMark(local, incoming) {
  if (!local) return incoming;
  if (!incoming) return local;
  const stamp = (x) => String(x?.editedAt || x?.at || '');
  return stamp(incoming) > stamp(local) ? incoming : local;
}

export function pickGoal(local, incoming) {
  if (!local) return incoming;
  if (!incoming) return local;
  return String(incoming.updatedAt || '') >= String(local.updatedAt || '') ? incoming : local;
}

/**
 * Merge one book report draft. v11 / v3.82.
 *
 * ⚠️ THIS IS THE ONLY MERGE IN THIS FILE THAT MAY NEVER LOSE TEXT, AND IT IS
 * NOT DECIDED BY TIMESTAMP.
 *
 * Every other row here takes the newer of two. That is right for a mark, a goal
 * or a grade — the newer one is the correction. It is WRONG for prose. A stale
 * export loaded onto the wrong machine, or a draft opened and saved without
 * typing, is newer and shorter, and "newer wins" would silently delete a
 * paragraph she wrote.
 *
 * db.js's own words about the journal, from v3: "A lost maths answer is an
 * inconvenience; a lost page of her own writing is not."
 *
 * So each FIELD is merged on its own and the longer text wins, per field. The
 * fields cannot overwrite one another — notes and draft stay two boxes through
 * the merge as well as on the screen, which is the whole reason they are two.
 *
 * Ticked steps take the UNION. A step ticked on either machine happened on one
 * of them, and un-ticking is a thing she does deliberately on the machine she is
 * sitting at, never something a merge should do for her.
 */
export function pickWritingDraft(local, incoming) {
  if (!local) return incoming;
  if (!incoming) return local;
  const longer = (a, b) => (String(b || '').length > String(a || '').length ? b : a);
  const steps = [
    ...new Set([...(local.steps || []), ...(incoming.steps || [])])
  ].sort((a, b) => a - b);
  return {
    ...local,
    ...incoming,
    notes: longer(local.notes, incoming.notes),
    draft: longer(local.draft, incoming.draft),
    // v3.83 — the finished piece, merged the same way and for the same reason.
    final: longer(local.final, incoming.final),
    bookTitle: longer(local.bookTitle, incoming.bookTitle),
    // A format chosen on either machine is a choice she made. Local wins only
    // when incoming has none, so loading a backup never silently re-picks it.
    formatId: incoming.formatId || local.formatId || null,
    checked: { ...(local.checked || {}), ...(incoming.checked || {}) },
    steps,
    updatedAt:
      String(incoming.updatedAt || '') > String(local.updatedAt || '')
        ? incoming.updatedAt
        : local.updatedAt
  };
}
