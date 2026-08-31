// ---------------------------------------------------------------------------
// THE CLASS BELL — what block is running, how long is left, what is next.
// (Built Aug 9, 2026. The parent: "Is there anyway a timer and an alarm can be
// added to the schedule so he know when to switch classes.")
//
// ---- WHY THIS IS PURE ----
//
// Every function here takes the time as an argument and returns a value. No
// clock is read inside, no state is held, nothing is scheduled. That is what
// lets scripts/verify-class-bell.mjs run the real logic against 9:07am on a
// Tuesday and against 4:30pm on a Sunday without a browser, a fake timer, or
// waiting for the day to come round.
//
// The component owns the ticking; this file owns the arithmetic.
//
// ---- THE TWO HONEST LIMITS, WRITTEN DOWN HERE SO THE UI CAN SAY THEM ----
//
// 1. A browser will not play a sound until the person has interacted with the
//    page. Not a bug and not something code can work around — an alarm armed
//    without a tap is an alarm that silently never rings, which is worse than
//    no alarm because he would be relying on it. The card therefore requires
//    one deliberate tap to arm, and says so.
// 2. This only runs while the app is open in a tab. It is a classroom bell,
//    not a phone alarm. Said plainly on the card rather than discovered on the
//    morning he needed it.
// ---------------------------------------------------------------------------

/** 'HH:MM' -> minutes since midnight. Returns null for anything malformed. */
export function toMinutes(hhmm) {
  const m = /^(\d{1,2}):(\d{2})$/.exec(String(hhmm || '').trim());
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h > 23 || min > 59) return null;
  return h * 60 + min;
}

/** Minutes since midnight -> '9:05 AM'. */
/**
 * MINUTES SINCE MIDNIGHT, from a Date.
 *
 * THIS EXISTS BECAUSE THE CLASS BELL HAD THE UNITS WRONG, silently, from the
 * day it shipped. ClassBellCard computed:
 *
 *     const minutes = now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;
 *
 * which is HOURS as a decimal. At 10:52 in the morning it handed 10.87 to
 * scheduleStatus, which reads that as 12 minutes past midnight -- so the card
 * said "School starts at 8:30 AM, starts in 8 hr 19 min" at ten to eleven, and
 * the bell could never ring, because the whole school day sat 500 minutes in
 * the future from where the card thought it was standing. Every value in the
 * card was internally consistent and wrong, which is why it looked fine.
 *
 * `verify-class-bell.mjs` passed the entire time. It tests scheduleStatus and
 * bellDue by handing them minutes directly -- the library was always correct.
 * NOTHING TESTED THE CALLER'S ARITHMETIC, so the one line between the clock and
 * the library was the one line with no guard on it.
 *
 * Now there is exactly one conversion in the app and it is tested against real
 * Date objects.
 */
export function minutesSinceMidnight(date = new Date()) {
  return date.getHours() * 60 + date.getMinutes() + date.getSeconds() / 60;
}

export function formatClock(minutes) {
  const total = ((Math.round(minutes) % 1440) + 1440) % 1440;
  const h24 = Math.floor(total / 60);
  const m = total % 60;
  const period = h24 >= 12 ? 'PM' : 'AM';
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, '0')} ${period}`;
}

/**
 * A countdown, as a human would say it.
 *
 * Seconds appear only under a minute. "12 min left" is what he needs for most
 * of a block; "40 seconds" is what he needs at the end of one, and a ticking
 * seconds display for the whole 45 minutes is just something to watch instead
 * of working.
 */
export function formatCountdown(totalSeconds) {
  const s = Math.max(0, Math.round(totalSeconds));
  if (s < 60) return `${s} sec`;
  const mins = Math.floor(s / 60);
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const rem = mins % 60;
  return rem ? `${h} hr ${rem} min` : `${h} hr`;
}

/**
 * Schedule blocks, cleaned and sorted, with their minute boundaries.
 *
 * A block whose times will not parse is DROPPED rather than defaulted to
 * midnight — a malformed block silently sorting to the top of the day would
 * put the bell on the wrong thing all morning. Blocks are also clipped to
 * ascending order by start time, because the parent can reorder them freely
 * and the arithmetic here assumes a timeline.
 */
/**
 * @param {Array} scheduleBlocks
 * @param {number|null} weekday  0=Sunday..6=Saturday. A block carrying a `days`
 *   array runs ONLY on those weekdays and is dropped from every other day.
 *   Pass null to keep every block regardless — printing a full week, say.
 *
 * `days` ADDED AUG 9 2026 with the after-school garden block, which is Friday
 * only. One day template is reused Mon-Fri, so a block with no way to say
 * "not today" is a block the bell will announce on the wrong day.
 */
export function normaliseBlocks(scheduleBlocks, weekday = null) {
  return (scheduleBlocks || [])
    .filter((b) => !b || !Array.isArray(b.days) || weekday === null || b.days.includes(weekday))
    .map((b) => {
      const start = toMinutes(b.startTime);
      const end = toMinutes(b.endTime);
      if (start === null || end === null || end <= start) return null;
      return { ...b, startMin: start, endMin: end };
    })
    .filter(Boolean)
    .sort((a, b) => a.startMin - b.startMin);
}

/**
 * Where we are in the day.
 *
 * Returns, for a given wall-clock time:
 *   phase    'before' | 'in-block' | 'gap' | 'after' | 'no-school'
 *   current  the running block, or null
 *   next     the block that starts next today, or null
 *   secondsLeftInBlock   until the current block ends
 *   secondsUntilNext     until the next block starts
 *
 * A GAP is a real state and is kept distinct from being in a block: the parent
 * can leave ten minutes between two blocks, and during those ten minutes he is
 * not late for anything. Collapsing gaps into "in the previous block" would
 * make the bell ring for a switch that already happened.
 */
export function scheduleStatus(scheduleBlocks, { minutes, isSchoolDay = true, weekday = null }) {
  const blocks = normaliseBlocks(scheduleBlocks, weekday);
  if (!blocks.length) {
    return { phase: 'no-school', blocks, current: null, next: null, secondsLeftInBlock: null, secondsUntilNext: null };
  }
  if (!isSchoolDay) {
    return { phase: 'no-school', blocks, current: null, next: blocks[0], secondsLeftInBlock: null, secondsUntilNext: null };
  }

  const current = blocks.find((b) => minutes >= b.startMin && minutes < b.endMin) || null;
  const next = blocks.find((b) => b.startMin > minutes) || null;
  const first = blocks[0];
  const last = blocks[blocks.length - 1];

  let phase;
  if (current) phase = 'in-block';
  else if (minutes < first.startMin) phase = 'before';
  else if (minutes >= last.endMin) phase = 'after';
  else phase = 'gap';

  return {
    phase,
    blocks,
    current,
    next,
    // Fractional minutes are supported so the component can pass seconds and
    // get a real countdown rather than a value that only moves once a minute.
    secondsLeftInBlock: current ? Math.max(0, Math.round((current.endMin - minutes) * 60)) : null,
    secondsUntilNext: next ? Math.max(0, Math.round((next.startMin - minutes) * 60)) : null
  };
}

/**
 * Which bell, if any, should have rung at this exact moment.
 *
 * Returns null, or { kind, blockId, atMinute } where kind is:
 *   'warning'  the current block ends in `warningMinutes`
 *   'switch'   a block just ended — time to move
 *   'start'    the school day's first block just began
 *
 * ---- WHY THIS RETURNS A BOUNDARY RATHER THAN "RING NOW" ----
 *
 * The caller compares the returned boundary against the last one it rang and
 * fires only on a change. That makes the bell idempotent: a component that
 * re-renders five times in the same second rings once, and a tab that was
 * throttled in the background and wakes up late rings the boundary it missed
 * exactly once rather than not at all or eleven times.
 *
 * Counting ticks would have been simpler and wrong. Browsers throttle timers
 * in background tabs — a 1-second interval can fire once a minute — so
 * anything that accumulates elapsed time drifts badly over a school day.
 * Everything here is computed from the wall clock instead.
 */
export function bellDue(scheduleBlocks, { minutes, warningMinutes = 2, isSchoolDay = true, toleranceSeconds = 90, weekday = null }) {
  if (!isSchoolDay) return null;
  const blocks = normaliseBlocks(scheduleBlocks, weekday);
  if (!blocks.length) return null;
  const tolMin = toleranceSeconds / 60;
  const same = (a, b) => Math.abs(a - b) < 1e-9;

  /**
   * Two bells can want the same minute. When the parent's warning lead is as
   * long as a block — a 2-minute warning on a 2-minute block, or the 15-minute
   * lead on the 15-minute Break — "two minutes to go" lands on the very moment
   * he was told to start. Ringing that would teach him the bell means nothing
   * in particular, which costs more than the missed warning.
   *
   * So a warning is DROPPED outright if it falls on any block's start or end,
   * and where bells still tie, the more urgent one wins: a switch says move
   * now, a start says begin, a warning only says soon.
   */
  const RANK = { switch: 3, start: 2, warning: 1 };
  const isBoundary = (m) => blocks.some((b) => same(b.startMin, m) || same(b.endMin, m));

  // Most recent boundary at or before now, within tolerance. Tolerance exists
  // for the throttled-tab case: if the app only gets a turn 40 seconds after
  // the block ended, the bell should still ring, late but correct.
  let best = null;
  const consider = (kind, atMinute, blockId) => {
    if (minutes + 1e-9 < atMinute) return; // not yet
    if (minutes - atMinute > tolMin) return; // too long ago to be worth ringing
    if (kind === 'warning' && isBoundary(atMinute)) return;
    if (!best) { best = { kind, atMinute, blockId }; return; }
    if (atMinute > best.atMinute + 1e-9) { best = { kind, atMinute, blockId }; return; }
    if (same(atMinute, best.atMinute) && RANK[kind] > RANK[best.kind]) best = { kind, atMinute, blockId };
  };

  for (const b of blocks) {
    consider('switch', b.endMin, b.id);
    if (warningMinutes > 0) consider('warning', b.endMin - warningMinutes, b.id);
  }
  consider('start', blocks[0].startMin, blocks[0].id);

  return best;
}

/** A stable id for one boundary on one day, so each rings exactly once. */
export function bellKey(dateStr, due) {
  return due ? `${dateStr}|${due.kind}|${due.blockId}|${due.atMinute}` : null;
}
