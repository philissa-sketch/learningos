// ---------------------------------------------------------------------------
// WHAT ORDER THESE LISTS COME IN.
//
// ---- WHY THIS EXISTS (Aug 16, 2026) ----
//
// The parent: **"The books, assignments, and portfolios aren't in order."**
//
// She was right about all three, and for three different reasons.
//
// ASSIGNMENTS. Five screens rendered `rows.filter(a => a.subject === subject)`
// and mapped straight over the result. `filter` preserves array order, the
// array is `db.academicAssignments.toArray()`, and Dexie returns rows in
// primary-key order — so the list was in the order the rows happened to be
// WRITTEN, which is seed order first and anything added since at the bottom.
// Nine places in her live record showed a later deadline above an earlier one.
// The worst of them, on the day she reported it:
//
//     Aerospace
//       Apollo 8: The Mission That Changed Everything   due Oct 16
//       Bottle rocket — design, launch, and write-up    due Aug 16   <- today
//
// That is the same assignment she had already reported once, in different
// words: *"Lamar has a rocket project due and it didnt show up."* It did show
// up. It was underneath a book report due eight weeks later.
//
// BOOKS. Same cause, plus a second one: nothing distinguished the book he is
// reading right now from the eighteen he is not. A library that lists in row-
// creation order is a shelf; the screen's own comment calls it a "what am I
// reading" screen, and those are different things.
//
// PORTFOLIO. This one WAS sorted, which is why it took longest to see. It
// sorted on the raw stored value, and the two sources store different shapes:
// writing entries and assignments store a full ISO timestamp (UTC), while
// hand-logged portfolio rows store a bare local 'YYYY-MM-DD'. The file's own
// comment already described the correct fix —
//
//     "Both sort correctly against each other as strings when compared on
//      their FIRST 10 CHARACTERS"
//
// — and the code never did the slice. Two consequences. Same-day items always
// put the timestamped one on top regardless of what time either happened. And
// worse: an entry finished after 8pm Eastern is stored as TOMORROW in UTC, so
// it sorted above things genuinely dated tomorrow while its own card, which
// converts back to local for display, printed yesterday's date. A row above
// another row with a later date on its face.
//
// **This app has now been bitten by local-vs-UTC dates four times.** Ordering
// is just the newest surface. The rule the codebase already settled on stands:
// a date in this app is a LOCAL day, and anything that compares dates converts
// first.
//
// ---- WHY IT LIVES IN ONE FILE ----
//
// Books and assignments are each listed in two places — the student's view and
// the parent's setup view — and she reads both. Two lists of the same rows in
// two different orders is worse than one list in a bad order, because then
// neither screen can be trusted. So the order is defined once here and both
// call it.
// ---------------------------------------------------------------------------
import { toDateStr } from './scheduler.js';

/**
 * The slot number inside a slotId like 'book::reading::3'. Seeded rows carry
 * one; a book or assignment the parent added herself does not, and those sort
 * after the seeded slots rather than being mixed in at an arbitrary point.
 */
function slotNumber(row) {
  const m = /(\d+)\s*$/.exec(row?.slotId || '');
  return m ? Number(m[1]) : Number.MAX_SAFE_INTEGER;
}

function byTitle(a, b) {
  return String(a?.title || '').localeCompare(String(b?.title || ''));
}

/**
 * ASSIGNMENTS, EARLIEST DEADLINE FIRST.
 *
 * Undated rows go last, not first. An unscheduled slot has no claim on his
 * attention and an empty `dueDate` sorting as '' would put every one of them
 * above the thing due tomorrow — which is precisely the failure being fixed.
 *
 * Completed work is NOT pushed to the bottom. This list is the quarter's
 * record as much as it is a to-do list, and a finished assignment belongs on
 * the date it was due; its status badge already says it is done.
 */
export function orderAssignments(rows = []) {
  return [...rows].sort((a, b) => {
    const ad = a?.dueDate || '';
    const bd = b?.dueDate || '';
    if (ad !== bd) {
      if (!ad) return 1;
      if (!bd) return -1;
      return ad.localeCompare(bd);
    }
    const as = slotNumber(a);
    const bs = slotNumber(b);
    if (as !== bs) return as - bs;
    return byTitle(a, b);
  });
}

/**
 * BOOKS: what he is reading, then what is next, then what is done.
 *
 * Reading order is not deadline order — a book has no due date of its own,
 * the assignment about it does. So the useful sort is by state:
 *
 *   0  reading now      the answer to "where am I", and there is usually one
 *   1  not started yet  the queue, kept in the parent's slot order
 *   2  finished         the record, still here, out of the way
 *   3  empty slot       a slot with no book chosen; last, and never hidden
 *
 * Empty slots stay visible on purpose — the Library's own comment makes that
 * decision and it is the right one — they just stop sitting between two real
 * books.
 */
const BOOK_BUCKET = { 'in-progress': 0, 'not-started': 1, completed: 2, empty: 3 };

export function orderBooks(rows = []) {
  return [...rows].sort((a, b) => {
    const ab = a?.title ? BOOK_BUCKET[a?.status] ?? 1 : 3;
    const bb = b?.title ? BOOK_BUCKET[b?.status] ?? 1 : 3;
    if (ab !== bb) return ab - bb;
    const as = slotNumber(a);
    const bs = slotNumber(b);
    if (as !== bs) return as - bs;
    return byTitle(a, b);
  });
}

/**
 * The LOCAL day a completion belongs to, whatever shape it was stored in.
 *
 * A bare 'YYYY-MM-DD' is already a local day and is returned untouched — never
 * fed through `new Date()`, which would read it as UTC midnight and hand back
 * the day before in every US timezone. A full timestamp is converted through
 * toDateStr, which is this codebase's one local-date conversion.
 *
 * The point of this function is that the day a row SORTS by and the day its
 * card DISPLAYS are computed from the same instant. Before it, they were not.
 */
export function localDayOf(value) {
  if (typeof value !== 'string' || !value) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? '' : toDateStr(d);
}

/** The time inside a timestamp, or '' for a value that only names a day. */
function timeOf(value) {
  if (typeof value !== 'string') return '';
  const i = value.indexOf('T');
  return i === -1 ? '' : value.slice(i + 1);
}

/**
 * PORTFOLIO: newest day first, and inside a day, latest known time first.
 *
 * A hand-logged row records a day and no time, which is honest — nobody knows
 * what hour the field trip finished. Those sit at the foot of their own day
 * rather than being given an invented time that would rank them against work
 * whose time is real.
 *
 * Rows with no date at all go last, because an undated item is not new.
 */
export function comparePortfolioNewestFirst(a, b) {
  const ad = localDayOf(a?.completedAt);
  const bd = localDayOf(b?.completedAt);
  if (ad !== bd) {
    if (!ad) return 1;
    if (!bd) return -1;
    return bd.localeCompare(ad);
  }
  return timeOf(b?.completedAt).localeCompare(timeOf(a?.completedAt));
}

/**
 * THE WRITING JOURNAL CATALOGUE: SOONEST DUE FIRST, LAST DUE OF THE YEAR LAST.
 *
 * ---- WHY (Aug 17, 2026) ----
 *
 * The parent, the day after the cards first showed their dates:
 * **"filter the cards so that its from the latest due to the last due."**
 *
 * Forty-six cards were grouped by kind - Science, Aerospace, Technology,
 * Robotics, Garden, Writing Skills, Recurring Projects. That grouping is the
 * shape of the DATA (six source files), not the shape of his year. Every card
 * now carries a date, and a dated list grouped by kind still cannot answer
 * "what is next" without reading all seven sections and comparing by eye.
 *
 * Each row here is { item, schedule } where schedule is what scheduleForItem
 * returned, or null for the handful with no date at all (today: the moisture
 * capstone, deliberately undated).
 *
 * The date a card sorts on is the date its own line PRINTS:
 *
 *   - something still coming     -> its next due date
 *   - something overdue/finished -> the date shown on its face
 *   - nothing scheduled          -> no date, and it goes last
 *
 * Undated last, for the same reason assignments do it: an item with no
 * deadline has no claim on the top of the page. Ties break on title so the
 * order is stable across renders - five garden builds share a Friday.
 */
export function scheduleSortDate(schedule) {
  if (!schedule) return '';
  if (schedule.next) return schedule.next.dueDate || '';
  return schedule.show?.dueDate || '';
}

export function orderScheduledCards(rows = []) {
  return [...rows].sort((a, b) => {
    const ad = scheduleSortDate(a?.schedule);
    const bd = scheduleSortDate(b?.schedule);
    if (ad !== bd) {
      if (!ad) return 1;
      if (!bd) return -1;
      return ad.localeCompare(bd);
    }
    return byTitle(a?.item, b?.item);
  });
}
