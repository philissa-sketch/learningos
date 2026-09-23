// ---------------------------------------------------------------------------
// THE CLASS BELL.
//
// "Scheduled like Lamar's with a bell." His app rings between blocks, and it is
// the thing that makes a homeschool day feel like a school day — a start, an
// end, and a sound that means "that subject is finished now" so nobody has to
// be the one to say it.
//
// ---- WHY THIS IS SYNTHESISED AND NOT AN MP3 ----
//
// A bell sound file would be the obvious approach and it is the wrong one here.
// This app has to run with no internet, from a folder on a laptop, forever. An
// audio file is one more thing that can go missing when the folder is copied to
// another computer, and a silent bell is worse than no bell because nobody can
// tell whether it is broken or just not time yet.
//
// The Web Audio API is in the browser already. Two detuned oscillators through
// a decaying gain envelope is a recognisable bell, it weighs nothing, it cannot
// fail to copy, and it cannot 404.
//
// ---- THE AUTOPLAY RULE ----
//
// Browsers refuse to make sound until the user has interacted with the page.
// That is not a bug to work around — it is why a tab you opened this morning
// cannot start ringing at you now. The consequence: the FIRST bell after the app
// loads may be silent if she has not clicked anything yet.
//
// So the schedule screen has an explicit "Turn the bell on" button. Pressing it
// is the interaction, and it also lets her hear what the bell sounds like before
// trusting it. Pretending the restriction does not exist would produce a bell
// that works on the developer's machine and silently never rings on hers.
// ---------------------------------------------------------------------------

let ctx = null;

/** Lazily created, because constructing an AudioContext before any user gesture
 *  leaves it suspended on some browsers and confuses the state below. */
function audioContext() {
  if (typeof window === 'undefined') return null;
  const Ctor = window.AudioContext || window.webkitAudioContext;
  if (!Ctor) return null;
  if (!ctx) {
    try {
      ctx = new Ctor();
    } catch {
      return null;
    }
  }
  return ctx;
}

export function bellSupported() {
  if (typeof window === 'undefined') return false;
  return !!(window.AudioContext || window.webkitAudioContext);
}

/** True once the browser will actually let us make noise. */
export function bellReady() {
  return !!ctx && ctx.state === 'running';
}

/**
 * Call from a click handler. Resolves true if sound is now permitted.
 * Safe to call repeatedly.
 */
export async function unlockBell() {
  const c = audioContext();
  if (!c) return false;
  try {
    if (c.state === 'suspended') await c.resume();
    return c.state === 'running';
  } catch {
    return false;
  }
}

/**
 * How loud the bell is, and it is a NAMED CONSTANT because Gigi has to be able
 * to change it without reading the synthesis code underneath.
 *
 * v3.43: was 0.22 and Gigi asked for "a louder type of bell". It is 0.62 now —
 * a little under three times — AND the character changed, which does more for
 * carrying through a wall than the number does. See below.
 *
 * Above about 0.8 the summed partials clip and a clipped bell sounds like a
 * buzzer, so the master gain below hard-limits rather than letting a well-meant
 * edit make it worse. A louder bell is the point; a distorted one is not.
 */
export const BELL_VOLUME = 0.62;

/** The bell rings three times, the way a school bell actually goes. */
export const BELL_STRIKES = 3;

/**
 * One ring of the bell.
 *
 * ---- WHY IT SOUNDS DIFFERENT AT v3.43 ----
 *
 * The old bell was two sine partials a fifth apart. That is a CHIME — pretty,
 * and it dies inside the room it is played in. Gigi asked for a bell she can
 * hear, and the honest answer to "make it louder" is not only a bigger number:
 *
 *   · A REAL BELL IS INHARMONIC. Struck metal rings at ratios that are not
 *     whole numbers — the tierce and the nominal are what your ear hears as
 *     "bell" rather than "organ". The ratios below are a school bell's, not a
 *     musical instrument's.
 *   · THE CLANG LIVES IN THE HIGH PARTIALS. They decay in a fifth of a second
 *     and they are the entire reason a bell cuts through a closed door. The old
 *     one had none.
 *   · A HARD STRIKE CARRIES. The attack is 2ms now instead of 6ms. A slow
 *     attack is a swell; a fast one is a hammer.
 *
 * Everything still comes from two oscillators per partial and nothing else. No
 * audio file, for the reason in the header: this app has to survive being
 * copied to another laptop with no internet, and a bell that 404s is worse than
 * no bell because nobody can tell whether it is broken or just not time yet.
 */
export function ringBell({ strikes = BELL_STRIKES, volume = BELL_VOLUME } = {}) {
  const c = audioContext();
  if (!c || c.state !== 'running') return false;

  const now = c.currentTime;
  const gap = 0.62;

  // One master gain for the whole ring, hard-limited. Eleven partials summing
  // at full level would clip on the laptop speaker, and clipping is what turns
  // a loud bell into a nasty one.
  const master = c.createGain();
  master.gain.setValueAtTime(Math.max(0.05, Math.min(0.8, volume)), now);
  master.connect(c.destination);

  const BASE = 784;

  // Ratio, how long it rings, how loud. The short bright ones at the top are
  // the strike; the long low one at the bottom is the hum that follows.
  const partials = [
    { ratio: 0.5, decay: 2.6, level: 0.5 }, // hum — the note left in the room
    { ratio: 1.0, decay: 2.2, level: 1.0 }, // prime
    { ratio: 1.19, decay: 1.6, level: 0.6 }, // tierce — the sour one that says "bell"
    { ratio: 1.51, decay: 1.3, level: 0.5 }, // quint
    { ratio: 2.0, decay: 1.0, level: 0.55 }, // nominal
    { ratio: 2.66, decay: 0.5, level: 0.34 },
    { ratio: 3.01, decay: 0.34, level: 0.3 },
    { ratio: 4.07, decay: 0.22, level: 0.24 }, // ---- the clang ----
    { ratio: 5.43, decay: 0.16, level: 0.19 },
    { ratio: 6.79, decay: 0.11, level: 0.14 },
    { ratio: 8.21, decay: 0.08, level: 0.1 }
  ];

  for (let s = 0; s < Math.max(1, Math.min(4, strikes)); s++) {
    const t0 = now + s * gap;
    for (const p of partials) {
      const freq = BASE * p.ratio;
      if (freq > 16000) continue; // above hearing, and it only wastes headroom
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t0);
      // Struck metal falls slightly in pitch as it rings. Without this it
      // sounds synthetic in a way children notice even if they cannot say why.
      osc.frequency.exponentialRampToValueAtTime(freq * 0.994, t0 + p.decay);

      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.exponentialRampToValueAtTime(p.level, t0 + 0.002); // hammer, not swell
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + p.decay);

      osc.connect(gain).connect(master);
      osc.start(t0);
      osc.stop(t0 + p.decay + 0.05);
    }
  }
  return true;
}

/** Minutes since midnight, local. The schedule works in these throughout. */
export function nowMinutes(d = new Date()) {
  return d.getHours() * 60 + d.getMinutes();
}

/**
 * When the school day ends, in minutes since midnight — DERIVED from the
 * timetable, never typed.
 *
 * Gigi: "it will not turn off until the end of the school day once it is turned
 * on." That sentence needs the app to know when the end of the school day is,
 * and there was no such function. The temptation is to write `return 955` —
 * 3:55pm, which is the right answer today.
 *
 * A NUMBER THAT HAPPENS TO BE CORRECT TODAY IS NOT A MEASUREMENT (v3.34). Move
 * Singing later, add a block, shorten one, and a literal 955 goes quietly wrong
 * — the bell would switch itself off mid-afternoon and the only symptom would
 * be a child saying the bell stopped working. So it is read off the last block
 * that actually exists.
 *
 * Takes the schedule so a check can hand it a made-up day and get a real
 * answer, the same way courseFinished() does.
 */
export function schoolDayEndsAt(schedule) {
  const blocks = schedule || [];
  let end = 0;
  for (const b of blocks) {
    if (!b || typeof b.start !== 'string') continue;
    const [h, m] = b.start.split(':').map(Number);
    if (Number.isNaN(h) || Number.isNaN(m)) continue;
    const finishes = h * 60 + m + (b.minutes || 0);
    if (finishes > end) end = finishes;
  }
  return end;
}

/**
 * Should the bell still be on?
 *
 * TRUE while it was switched on TODAY and the school day has not ended.
 *
 * ---- WHY THIS IS A FUNCTION AND NOT AN `if` INSIDE THE SCREEN ----
 *
 * The bug Gigi reported is that the bell "turns off". It was never turning off:
 * `bellOn` was plain component state in TodayView, so it reset to false the
 * moment she left the Today tab or the page reloaded. Nothing anywhere had an
 * opinion about how long the bell should stay on, because nothing anywhere knew
 * what "the school day" was.
 *
 * A rule the app must follow lives in a lib where a check can test it. This one
 * is pure: a day key, today's key, a clock and a timetable in; a boolean out.
 */
export function bellShouldBeOn({ bellOnDayKey, todayKey, minutesNow, schedule }) {
  if (!bellOnDayKey || bellOnDayKey !== todayKey) return false;
  return minutesNow < schoolDayEndsAt(schedule);
}
