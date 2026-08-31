import { Children, isValidElement } from 'react';
import { toMinutes } from '../../lib/classBell.js';

/**
 * ============================================================================
 * TODAY'S LIST, IN THE ORDER THE TIMETABLE RUNS IT.
 * ============================================================================
 *
 * ---- WHY THIS EXISTS (Aug 20, 2026) ----
 *
 * The student, via his parent: **"Lamar is complaining that he'd like the rest
 * of his day to be in sync with his Today's Routine."**
 *
 * He was reading two different orders for the same day, side by side on one
 * screen. The rail on the left, built from the timetable:
 *
 *     9:00 Mathematics · 10:00 Reading · 10:30 Science · 11:15 Typing
 *     12:30 Language Arts · 1:30 Spelling · 1:45 PE · 2:15 Rotating · 3:00 Guitar
 *
 * "The rest of today", four inches to the right, built from the order the JSX
 * happened to be written in:
 *
 *     PE · Typing · Language Arts · Mathematics · Science · Social Studies
 *     Technology · Reading · Book · Daily Writing
 *
 * Neither was wrong about WHAT. They disagreed about WHEN, and the list is the
 * one with the buttons on it — so following the list meant doing PE at nine in
 * the morning and Mathematics fourth.
 *
 * ---- WHY A SORTER AND NOT A REORDERED FILE ----
 *
 * The old order was not careless; it was reasoned about, one row at a time,
 * over about six weeks. The comments still say so — "PE first because movement
 * comes before the academic blocks", "guitar last, because 3:00 is the last
 * thing in his day", "the book sits directly above the drill because they are
 * the same block". Every one of those is a hand-maintained copy of a fact the
 * timetable already holds, and the eleventh row added is the one that lands in
 * the wrong place.
 *
 * So the rows no longer carry an order. They carry the BLOCK they belong to —
 * the same `block-2`, `block-7b`, `block-9` the Georgia counter credits and
 * the rail draws — and this component reads her real `scheduleBlocks` for the
 * start times. Move Science to 8am in the Scheduler and this list moves with
 * it, because there is nothing here that could fail to be told.
 *
 * ---- THE TAIL ----
 *
 * A row with no block, or a block that is not on today's timetable, sorts to
 * the end rather than being dropped. Dropping it would be the fault this
 * project has already shipped twice in the parent's words — "I told him to
 * follow that schedule but that isn't there". Work he has been given always
 * appears; what changes is that it no longer pretends to be a 9am job.
 */
export function TimetableOrder({ blocks = [], children }) {
  /**
   * Start time per block id, in minutes since midnight. Built from HER
   * timetable, never from a list written down in here.
   */
  const startOf = new Map();
  for (const block of blocks) {
    if (!block?.id || !block.startTime) continue;
    const mins = toMinutes(block.startTime);
    if (Number.isFinite(mins)) startOf.set(block.id, mins);
  }

  /**
   * `Children.toArray` flattens the `.map()` groups and drops nulls and
   * `false`, which is most of what this list is made of — every row in it is
   * behind a conditional. It also preserves the keys already on those rows.
   */
  const rows = Children.toArray(children).filter(isValidElement);

  /**
   * INDEX IS THE TIEBREAK, AND IT IS LOAD-BEARING.
   *
   * Several blocks legitimately hold more than one row: the Reading lesson and
   * his book are both the 10:00 block, Spelling and Vocabulary are both 1:30,
   * the Writing Journal and the daily drill are both 12:30. Within a block the
   * file order IS the intended order — the drill before the weekly piece,
   * because the drill is today's — so the sort must not disturb it.
   *
   * Array.prototype.sort is stable in every engine this runs on, but the
   * tiebreak is written out anyway: a sort whose correctness depends on a
   * property nobody stated is one refactor away from being wrong.
   */
  const decorated = rows.map((node, index) => {
    const blockId = node.props?.blockId;
    const start = blockId ? startOf.get(blockId) : undefined;
    return { node, index, start, scheduled: start !== undefined };
  });

  decorated.sort((a, b) => {
    if (a.scheduled !== b.scheduled) return a.scheduled ? -1 : 1;
    if (a.scheduled && a.start !== b.start) return a.start - b.start;
    return a.index - b.index;
  });

  return decorated.map((row) => row.node);
}
