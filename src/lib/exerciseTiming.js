// ---------------------------------------------------------------------------
// READING A HOLD OUT OF AN EXERCISE'S TARGET LINE.
//
// The parent, Aug 11 2026: "can you place timers on the workouts ex. wall sit
// have a 40 sec timer on it."
//
// Every exercise already carries a target written for a person to read —
// "2-3 rounds of 20-40 seconds" — and `type: 'time'`. But `type: 'time'`
// covers two genuinely different things:
//
//   A HOLD, counted in seconds:      "2-3 rounds of 20-40 seconds"      (20 of them)
//   A SESSION, counted in minutes:   "20-40 minutes"                     (18 of them)
//
// Only the first kind gets a timer. A 40-minute bike ride does not need a
// countdown on a laptop he has left in the kitchen, and putting one there
// would teach him to stop the workout to go and press a button.
//
// The parser is deliberately strict: if a target does not clearly say rounds
// AND seconds, it returns null and no timer is offered. A wrong duration on a
// held position is worse than none — he would trust it.
// ---------------------------------------------------------------------------

/**
 * @returns {null | {
 *   roundsMin: number, roundsMax: number,
 *   secondsMin: number, secondsMax: number,
 *   perSide: boolean, sideLabel: string
 * }}
 */
export function parseTimedTarget(target) {
  const text = String(target || '');
  const m = /(\d+)\s*(?:-\s*(\d+))?\s*rounds?\s+of\s+(\d+)\s*-\s*(\d+)\s*seconds/i.exec(text);
  if (!m) return null;

  const secondsMin = Number(m[3]);
  const secondsMax = Number(m[4]);
  if (!Number.isFinite(secondsMin) || !Number.isFinite(secondsMax) || secondsMin <= 0 || secondsMax < secondsMin) {
    return null;
  }

  // "per leg", "per side", "per arm", "each direction" — the round count is
  // per side, so the real work is double. Said out loud rather than silently
  // doubled, because he is the one who has to remember to switch.
  const perSide = /(per\s+(leg|side|arm|hand)|each\s+(direction|side|arm|leg))/i.test(text);
  const sideLabel = /per\s+leg/i.test(text)
    ? 'leg'
    : /per\s+arm/i.test(text)
      ? 'arm'
      : /each\s+direction/i.test(text)
        ? 'direction'
        : 'side';

  const roundsMin = Number(m[1]);
  const roundsMax = m[2] ? Number(m[2]) : roundsMin;

  return { roundsMin, roundsMax, secondsMin, secondsMax, perSide, sideLabel };
}

/** mm:ss, for a number that is only ever seconds. */
export function formatSeconds(total) {
  const safe = Math.max(0, Math.round(total));
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return m > 0 ? `${m}:${String(s).padStart(2, '0')}` : String(s);
}

/**
 * A PLAIN MINUTES RANGE — "3-5 minutes of light movement…".
 *
 * The parent, Aug 11 2026: "the timer isn't on the lower body strength warmup
 * for 3 - 5 minutes."
 *
 * Deliberately a SEPARATE function from parseTimedTarget, and used only where
 * a caller asks for it. The reasoning in that header still holds: a 40-minute
 * bike ride must not get a countdown on a laptop left in the kitchen. But a
 * warm-up is different in the way that matters — it happens on the spot,
 * at the start, in front of the screen he just opened, and "3-5 minutes of
 * light movement" is exactly the instruction a person shortens to ninety
 * seconds when nothing is counting.
 *
 * So the distinction is not minutes-versus-seconds. It is whether the app is
 * in the room for it.
 */
export function parseMinutesRange(text) {
  const m = /(\d+)\s*(?:-\s*(\d+))?\s*minutes?/i.exec(String(text || ''));
  if (!m) return null;
  const min = Number(m[1]);
  const max = m[2] ? Number(m[2]) : min;
  if (!Number.isFinite(min) || min <= 0 || max < min) return null;
  return { minutesMin: min, minutesMax: max };
}
