// ---------------------------------------------------------------------------
// MORNING CIRCLE — the rules, where a check can call them.
//
// Gigi, Sept 23 2026: "There is a morning circle that she hasn't been doing."
//
// Her record agreed and showed why nobody could tell. Morning Circle was ticked
// done on 28 of 28 school days, and on Sept 22 it was ticked seven seconds
// before Mathematics. The block was a note and a tick box. It opened nothing
// she had to finish, so a tap was the whole of it.
//
// Her morning warm-up, the spaced review that keeps what she learns, sat on a
// different screen (Home). She starts her day on Today. From Sept 12 to 23 she
// answered zero review questions and 152 of 188 cards went overdue. Test
// questions she had not seen for 11+ days came back 43% right; within a day of
// the lesson, 73%.
//
// So, approved by Gigi on Sept 23 2026:
//   1. Morning Circle is a screen: Dr. Marigold's greeting, notes from Gigi and
//      Mom, a look at the day, the warm-up, and "water something".
//   2. It is DONE when it is finished, not when it is tapped.
//   3. The warm-up is 5 questions while more than 30 cards are overdue, then 3.
//   4. Dr. Marigold says her greeting and reminders out loud, once a day each,
//      without the speaker button. A grown-up can turn that off.
//   5. Opening a class before Circle is finished gets a REMINDER, not a lock.
//      Blocking could shut her out of her whole day if the warm-up ever broke.
//
// Everything here is pure: no screen, no browser, no saved data. The screens
// ask these functions, and check-morning-circle.mjs asks the same ones.
// ---------------------------------------------------------------------------

/** The Morning Circle block in her timetable (config/schedule.js). */
export const CIRCLE_BLOCK_ID = 'blk-open';

/**
 * Warm-up size. Gigi, Sept 23 2026: "5 a morning until under 30, then 3."
 *
 * At 3 a morning the 152 overdue cards take about ten weeks to clear, and new
 * ones arrive every lesson. Five clears the backlog without turning a
 * two-minute warm-up into a test.
 */
export const WARM_UP_SIZE = {
  normal: 3,
  catchUp: 5,
  // More than this many due, and she is catching up.
  catchUpAbove: 30
};

export function warmUpSize(dueCount) {
  const n = Number(dueCount) || 0;
  return n > WARM_UP_SIZE.catchUpAbove ? WARM_UP_SIZE.catchUp : WARM_UP_SIZE.normal;
}

/**
 * Is the warm-up part of Circle satisfied?
 *
 * Done today, OR there is genuinely nothing to warm up on (her first days,
 * before any lesson). The second half matters: without it a child with no
 * review cards could never finish Circle.
 */
export function warmUpSatisfied({ lastWarmUpDay, todayKey, availableCount }) {
  if (lastWarmUpDay && lastWarmUpDay === todayKey) return true;
  return (Number(availableCount) || 0) === 0;
}

/**
 * Can she press "Finish Morning Circle"?
 * Warm-up satisfied AND the plants watered. Notes are read on the same screen,
 * but reading cannot be checked, so they are not a condition.
 */
export function circleCanFinish({ warmUpDone, watered }) {
  return !!warmUpDone && !!watered;
}

/**
 * What a tap on the Morning Circle tick does on Today.
 *
 *   not done → OPEN the Circle screen (it is finished there, not ticked here)
 *   done     → un-tick, the same as every other block (a mis-tap stays fixable)
 */
export function circleTickAction(isDone) {
  return isDone ? 'untick' : 'open';
}

/** Should a tap on some OTHER block trigger the reminder? */
export function needsCircleReminder({ blockId, circleDone }) {
  if (circleDone) return false;
  return blockId !== CIRCLE_BLOCK_ID;
}

// ---------------------------------------------------------------------------
// WHAT DR. MARIGOLD SAYS
//
// Written to be heard, not read: short sentences, her name, one instruction.
// "Doctor" is spelled out in the spoken copy so the voice does not say "Dr".
// ---------------------------------------------------------------------------

function who(name) {
  const n = String(name || '').trim();
  return n || 'friend';
}

function hello(hour) {
  return Number(hour) < 12 ? 'Good morning' : 'Hello';
}

/**
 * @param kind  'greeting' | 'reminder' | 'finished'
 * @param ctx   { name, hour, nextLabel }
 * @returns     { text } — the same words on screen and out loud
 */
export function circleLine(kind, { name, hour = 9, nextLabel } = {}) {
  const n = who(name);
  if (kind === 'greeting') {
    return { text: `${hello(hour)}, ${n}! Don't forget your Morning Circle and your warm-up.` };
  }
  if (kind === 'reminder') {
    return { text: `Wait, ${n}. Morning Circle and your warm-up come first.` };
  }
  if (kind === 'finished') {
    const next = String(nextLabel || '').trim();
    return {
      text: next
        ? `Well done, ${n}. Morning Circle is finished. Next is ${next}.`
        : `Well done, ${n}. Morning Circle is finished.`
    };
  }
  return { text: '' };
}

export const SPOKEN_KINDS = ['greeting', 'reminder', 'finished'];

/**
 * Once a day, per kind.
 *
 * @param saidOn  { [kind]: dayKey } — the last day each line was SPOKEN
 */
export function shouldSay(kind, saidOn, todayKey) {
  if (!SPOKEN_KINDS.includes(kind)) return false;
  return (saidOn || {})[kind] !== todayKey;
}

/** The greeting is only worth saying while Circle is still to do. */
export function shouldGreet({ circleDone, saidOn, todayKey }) {
  if (circleDone) return false;
  return shouldSay('greeting', saidOn, todayKey);
}
