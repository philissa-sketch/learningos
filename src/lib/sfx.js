// ---------------------------------------------------------------------------
// Mission Control sound effects (Release A, built Aug 8, 2026).
//
// EVERY SOUND IN THIS FILE IS GENERATED FROM SCRATCH. There are no .mp3 or
// .wav files anywhere in this project and there should never need to be: the
// Web Audio API can synthesize tones directly, so the whole sound design costs
// zero bytes of download, adds nothing to the emailed zip, and sounds
// identical on any computer he ever uses. That last part matters — this app
// moves between two Windows machines and may move to a third.
//
// WHY SOUND AT ALL: it is most of what makes a reward system *feel* like a
// game rather than a spreadsheet. A coin that chimes is worth more than a coin
// that silently increments, and it costs nothing.
//
// DESIGN RULES HELD THROUGHOUT:
//   - Short. Nothing here runs past ~700ms; the rank-up sweep is the longest.
//   - Soft. Sine waves almost everywhere, with modest gain. The radio chirp is
//     the only deliberately "electronic" sound, and it is the quietest.
//   - Every tone gets an attack and a decay ramp. A raw start or stop produces
//     an audible click, which sounds like a bug even when nothing is wrong.
//   - Coins and Credits are deliberately DIFFERENT so he learns by ear which
//     currency he just earned, without reading anything. Coins are bright and
//     quick; Credits are lower, warmer and slower, because they are the scarce
//     one and should feel weightier.
//
// Like speech.js, this holds no React and no store imports, and every export
// is safe to call on a browser with no audio support — it simply does nothing.
// ---------------------------------------------------------------------------

const STORAGE_KEY = 'mc.sfx.v1';

const DEFAULT_SETTINGS = {
  // ON by default, unlike the voice. These are brief, quiet, and tied to
  // things he did on purpose, so they read as feedback rather than noise.
  // Nothing plays until his first click regardless — browsers require a user
  // gesture before any audio, which conveniently means the app never makes a
  // sound he did not initiate.
  enabled: true,
  volume: 0.6
};

function readSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_SETTINGS, ...(parsed && typeof parsed === 'object' ? parsed : {}) };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

let settings = readSettings();
const listeners = new Set();

export function getSfxSettings() {
  return { ...settings };
}

export function setSfxSettings(changes) {
  settings = { ...settings, ...changes };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    /* storage unavailable — still applies for this session */
  }
  for (const fn of listeners) {
    try {
      fn(getSfxSettings());
    } catch {
      /* a broken listener must never take the audio system down */
    }
  }
  return getSfxSettings();
}

export function onSfxSettingsChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

// --- audio context --------------------------------------------------------

let audioCtx = null;

function getCtx() {
  if (typeof window === 'undefined') return null;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  if (!audioCtx) {
    try {
      audioCtx = new AC();
      /**
       * RESUMING IS ASYNCHRONOUS, which cost an afternoon (Aug 10, 2026).
       *
       * `resume()` returns a promise; the context is still 'suspended' on the
       * line after you call it. Anything that asked "is audio on now?"
       * immediately after the arming tap got `false`, so the bell card kept
       * showing "Turn the bell on" even though the tap had worked.
       *
       * statechange is the browser telling us the truth when it is actually
       * true, rather than us guessing a moment too early.
       */
      audioCtx.onstatechange = () => notifyUnlock();
    } catch {
      return null;
    }
  }
  // Browsers start the context suspended until a user gesture. Resuming is
  // harmless if it is already running.
  if (audioCtx.state === 'suspended') {
    try {
      const p = audioCtx.resume();
      if (p && typeof p.then === 'function') p.then(notifyUnlock).catch(() => {});
    } catch {
      /* will resume on a later gesture */
    }
  }
  return audioCtx;
}

/**
 * Call once from any real user gesture (a click or tap) to wake the audio
 * engine. Without a gesture browsers keep the context suspended and every
 * sound is silently dropped — which looks like a broken feature rather than a
 * browser policy.
 */
/**
 * ---- THE MASTER BUS, AND WHY THE ALARMS CAN NOW BE LOUD (Aug 11, 2026) ----
 *
 * The parent: "make the alarms louder I could barely hear it."
 *
 * She was right, and the fix is not simply a bigger number. Everything here
 * ran straight into ctx.destination, so raising the alarm gains would have
 * pushed the school bell — seven inharmonic partials, struck twenty times a
 * second, overlapping — past 1.0 and into hard clipping. That does not sound
 * louder, it sounds broken: crackle instead of metal.
 *
 * So there is a limiter across the whole output now. It leaves ordinary
 * sounds untouched and catches only the peaks, which is exactly what lets the
 * alarms be raised roughly three times without distorting.
 *
 * A compressor with a low threshold, a high ratio and a fast attack IS a
 * limiter — no extra dependency, and it is the same node a mixing desk would
 * put in this position.
 */
let masterNode = null;

function getMaster() {
  const ctx = audioCtx;
  if (!ctx) return null;
  if (masterNode) return masterNode;
  try {
    const limiter = ctx.createDynamicsCompressor();
    limiter.threshold.setValueAtTime(-8, ctx.currentTime);   // start working just below peak
    limiter.knee.setValueAtTime(0, ctx.currentTime);         // hard knee — a limiter, not a squasher
    limiter.ratio.setValueAtTime(20, ctx.currentTime);       // effectively a ceiling
    limiter.attack.setValueAtTime(0.002, ctx.currentTime);   // fast enough to catch a bell strike
    limiter.release.setValueAtTime(0.15, ctx.currentTime);
    limiter.connect(ctx.destination);
    masterNode = limiter;
  } catch {
    masterNode = ctx.destination;
  }
  return masterNode;
}

export function unlockAudio() {
  getCtx();
  notifyUnlock();
}

export function isAudioSupported() {
  return typeof window !== 'undefined' && Boolean(window.AudioContext || window.webkitAudioContext);
}

/**
 * ---- WHY THIS EXISTS (Aug 10, 2026) ----
 *
 * The parent: "the bell keeps turning off when he leaves the mission control."
 *
 * ClassBellCard held `armed` in React state, so every time he navigated away
 * from the dashboard the card unmounted and the bell disarmed itself. He then
 * had to find and press "Turn the bell on" again, which is exactly the kind of
 * thing a twelve-year-old stops doing after the third time — and then the bell
 * he is relying on to switch subjects silently never rings.
 *
 * The old reasoning was half right. Arming DOES need a real tap, and it is
 * right to be pessimistic about it. But the browser's gate is per PAGE LOAD,
 * not per component mount: once the AudioContext is running it stays running
 * until the page is reloaded. So the context itself is the honest source of
 * truth — it survives navigation exactly as it should, and resets on reload
 * exactly as it should.
 *
 * Any sound at all unlocks it, which is also correct: if a coin can chime, so
 * can the bell.
 */
export function isAudioUnlocked() {
  return Boolean(audioCtx && audioCtx.state === 'running');
}

const unlockListeners = new Set();

function notifyUnlock() {
  for (const fn of unlockListeners) {
    try {
      fn(isAudioUnlocked());
    } catch {
      /* a broken listener must never take the audio system down */
    }
  }
}

/** Subscribe to "audio became playable". Returns an unsubscribe function. */
export function onAudioUnlockChange(fn) {
  unlockListeners.add(fn);
  return () => unlockListeners.delete(fn);
}

// --- primitives -----------------------------------------------------------

/**
 * One shaped tone.
 *
 * @param {object} o
 * @param {number} o.freq     starting frequency in Hz
 * @param {number} [o.to]     glide to this frequency across the note
 * @param {number} o.dur      seconds
 * @param {string} [o.type]   oscillator type
 * @param {number} [o.gain]   peak gain BEFORE the master volume
 * @param {number} [o.delay]  seconds to wait before starting
 */
function tone({ freq, to = null, dur = 0.15, type = 'sine', gain = 0.2, delay = 0 }) {
  const ctx = getCtx();
  if (!ctx || !settings.enabled) return;
  try {
    const start = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const amp = ctx.createGain();
    const peak = Math.max(0.0001, gain * (settings.volume ?? 1));

    osc.type = type;
    osc.frequency.setValueAtTime(freq, start);
    if (to && to !== freq) {
      // Exponential glide reads as musical; linear reads as a siren.
      osc.frequency.exponentialRampToValueAtTime(Math.max(1, to), start + dur);
    }

    // Attack then exponential decay. exponentialRamp cannot reach zero, hence
    // the tiny floor — ramping to a true 0 throws in some engines.
    amp.gain.setValueAtTime(0.0001, start);
    amp.gain.exponentialRampToValueAtTime(peak, start + Math.min(0.015, dur * 0.2));
    amp.gain.exponentialRampToValueAtTime(0.0001, start + dur);

    osc.connect(amp);
    amp.connect(getMaster() || ctx.destination);
    osc.start(start);
    osc.stop(start + dur + 0.02);
  } catch {
    /* audio must never break the UI */
  }
}

function sequence(notes) {
  for (const n of notes) tone(n);
}

/**
 * A short band-passed noise burst — the CLACK of metal being struck. A pure
 * oscillator cannot make this; without it a bell sounds like a doorbell, which
 * is the note the twelve-year-old this was built for gave it.
 */
function noiseBurst({ dur = 0.05, gain = 0.08, freq = 3200, q = 1.2, delay = 0 }) {
  const ctx = getCtx();
  if (!ctx || !settings.enabled) return;
  try {
    const start = ctx.currentTime + delay;
    const frames = Math.max(1, Math.floor(ctx.sampleRate * dur));
    const buf = ctx.createBuffer(1, frames, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < frames; i += 1) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(freq, start);
    bp.Q.setValueAtTime(q, start);
    const amp = ctx.createGain();
    const peak = Math.max(0.0001, gain * (settings.volume ?? 1));
    amp.gain.setValueAtTime(peak, start);
    amp.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    src.connect(bp);
    bp.connect(amp);
    amp.connect(getMaster() || ctx.destination);
    src.start(start);
    src.stop(start + dur + 0.02);
  } catch {
    /* audio must never break the UI */
  }
}

/**
 * ONE STRIKE OF A METAL BELL.
 *
 * A bell is not a note. Its partials are INHARMONIC — not 2x, 3x, 4x the
 * fundamental the way a guitar string is, but the irrational-ish ratios below,
 * which is precisely why a bell sounds like a bell and a sine wave sounds like
 * a test tone. The ratios here are the classic strike-tone set (hum, prime,
 * tierce, quint, nominal), rounded.
 */
const BELL_PARTIALS = [
  { ratio: 0.5, gain: 0.35, dur: 0.9 },
  { ratio: 1.0, gain: 1.0, dur: 0.75 },
  { ratio: 1.2, gain: 0.5, dur: 0.5 },
  { ratio: 1.5, gain: 0.4, dur: 0.4 },
  { ratio: 2.0, gain: 0.5, dur: 0.35 },
  { ratio: 2.76, gain: 0.3, dur: 0.25 },
  { ratio: 5.4, gain: 0.16, dur: 0.14 }
];

function bellStrike({ freq = 740, gain = 0.13, delay = 0, decay = 1 }) {
  for (const p of BELL_PARTIALS) {
    tone({
      freq: freq * p.ratio,
      dur: Math.max(0.04, p.dur * decay),
      type: 'sine',
      gain: gain * p.gain,
      delay
    });
  }
  noiseBurst({ dur: 0.035, gain: gain * 0.5, freq: freq * 4.5, delay });
}

// --- the sound set --------------------------------------------------------

/** Radio blip that brackets Nova's speech. Deliberately the quietest sound here. */
export function playChirp() {
  tone({ freq: 1180, dur: 0.045, type: 'square', gain: 0.05 });
}

/** Coins earned — bright, quick, two rising blips. */
export function playCoin() {
  sequence([
    { freq: 1046, dur: 0.075, gain: 0.16 },
    { freq: 1568, dur: 0.11, gain: 0.14, delay: 0.06 }
  ]);
}

/** Credits earned — lower, warmer, slower. The scarce currency should feel heavier. */
export function playCredit() {
  sequence([
    { freq: 523, dur: 0.13, type: 'triangle', gain: 0.16 },
    { freq: 784, dur: 0.2, type: 'triangle', gain: 0.15, delay: 0.11 }
  ]);
}

/** Lesson mastered — a soft major triad, the "that clicked" sound. */
export function playMastery() {
  sequence([
    { freq: 523, dur: 0.18, gain: 0.15 },
    { freq: 659, dur: 0.18, gain: 0.15, delay: 0.08 },
    { freq: 784, dur: 0.3, gain: 0.16, delay: 0.16 }
  ]);
}

/** Rank up — a launch sweep with a triad over the top. The biggest sound here. */
export function playRankUp() {
  tone({ freq: 220, to: 880, dur: 0.55, type: 'triangle', gain: 0.13 });
  sequence([
    { freq: 659, dur: 0.22, gain: 0.14, delay: 0.3 },
    { freq: 880, dur: 0.22, gain: 0.14, delay: 0.38 },
    { freq: 1319, dur: 0.42, gain: 0.15, delay: 0.46 }
  ]);
}

/** Mystery crate — a rising build, then the reveal. */
export function playCrate() {
  tone({ freq: 300, to: 1200, dur: 0.42, type: 'triangle', gain: 0.1 });
  sequence([
    { freq: 1568, dur: 0.22, gain: 0.15, delay: 0.44 },
    { freq: 2093, dur: 0.34, gain: 0.13, delay: 0.5 }
  ]);
}

/** Purchase confirmed — one soft click-tone, no fanfare. */
export function playPurchase() {
  tone({ freq: 880, dur: 0.07, gain: 0.13 });
}

/** Progress toward a saved goal — gentle, encouraging, easy to hear often. */
export function playProgress() {
  sequence([
    { freq: 659, dur: 0.1, gain: 0.1 },
    { freq: 880, dur: 0.16, gain: 0.1, delay: 0.08 }
  ]);
}

/** Badge or certificate earned — bright and a little ceremonial. */
export function playAchievement() {
  sequence([
    { freq: 784, dur: 0.14, gain: 0.14 },
    { freq: 1046, dur: 0.14, gain: 0.14, delay: 0.1 },
    { freq: 1568, dur: 0.36, gain: 0.15, delay: 0.2 }
  ]);
}

/* --- the class bell -----------------------------------------------------
 *
 * ---- ROUND ONE (Aug 9, 2026) ----
 *
 * DELIBERATELY NOT REWARD-SHAPED. Every sound above rises — that is what makes
 * a reward feel like a reward. A bell that rises would read as "you earned
 * something" at the exact moment it means "stop and move to the next subject",
 * and after a week of that the two become indistinguishable. So the bell fell,
 * and it was a plain two-note chime.
 *
 * ---- ROUND TWO (Aug 10, 2026): HE SAID IT WAS DISAPPOINTING ----
 *
 * The parent: "the bell is disappointing to him, he wants it to ring like a
 * school bell."
 *
 * He is right and the first version was wrong. Two sine notes is a DOORBELL.
 * A real school bell is a struck metal gong with a clapper hammering it many
 * times a second, and three things make that sound what it is — none of which
 * a two-note chime has:
 *
 *   1. INHARMONIC PARTIALS. Struck metal rings at ratios like 1.2x, 2.76x,
 *      5.4x the fundamental, not at whole multiples. This is the single
 *      biggest reason a sine chime reads as "app noise" and a bell reads as
 *      "bell". See BELL_PARTIALS above.
 *   2. A NOISE TRANSIENT. The clack of the hammer hitting metal is broadband,
 *      not tonal. Without it the strike has no impact.
 *   3. REPETITION. An electric school bell is not one ding — the clapper
 *      strikes ~12 times a second for as long as the circuit is closed. The
 *      RATTLE is the whole character of the thing.
 *
 * All three are synthesized here. There are still no audio files anywhere in
 * this project, so this costs zero bytes of download and sounds the same on
 * both computers — which matters, because it now has to survive the trip to
 * his machine as source rather than as a .mp3 nobody remembered to copy.
 *
 * It is still not reward-shaped. It does not rise, and it does not resolve.
 */

/**
 * THE SCHOOL BELL. An electric bell: one struck gong, hammered repeatedly.
 *
 * @param seconds  how long the clapper runs
 * @param freq     the gong's fundamental — 740Hz is bright without being shrill
 * @param gain     peak per strike, BEFORE her master volume
 */
export function playSchoolBell({ seconds = 1.9, freq = 740, gain = 0.3 } = {}) {
  const STRIKE_EVERY = 0.08; // ~12 strikes a second, as a real clapper runs
  const strikes = Math.max(1, Math.round(seconds / STRIKE_EVERY));
  for (let i = 0; i < strikes; i += 1) {
    // Each strike is a touch quieter and a touch shorter than the last, the
    // way a real clapper loses energy — a flat loop sounds like a machine.
    const fade = 1 - (i / strikes) * 0.35;
    bellStrike({
      freq: freq * (i % 2 === 0 ? 1 : 1.008), // the tiniest wobble; a gong is not perfectly repeatable
      gain: gain * fade,
      delay: i * STRIKE_EVERY,
      decay: 0.5
    });
  }
  // The ring-out: one last full-length strike so it ends on metal rather than
  // stopping dead.
  bellStrike({ freq, gain: gain * 0.9, delay: strikes * STRIKE_EVERY, decay: 1.6 });
}

/**
 * Two minutes to go — ONE strike of the same bell, no rattle.
 *
 * Deliberately the same instrument as the switch bell but a single tap: he
 * should recognise it instantly as "the bell, but not yet", which a completely
 * different sound would not achieve. Quiet enough to ignore mid-thought.
 */
export function playBellWarning() {
  bellStrike({ freq: 740, gain: 0.17, decay: 1.1 });
}

/** Time to switch — the school bell. This is the one he asked for. */
export function playBellSwitch() {
  playSchoolBell({ seconds: 1.9 });
}

/**
 * The school day opening — the same bell, run longer.
 *
 * A real school marks the start of the day with a longer ring than a period
 * change, and that is a distinction worth keeping: it is the only bell all day
 * that means "begin" rather than "move".
 */
export function playBellStart() {
  playSchoolBell({ seconds: 2.8 });
}

/* --- the exercise timer (Aug 11, 2026) ----------------------------------
 *
 * The parent: "can you place timers on the workouts ex. wall sit have a 40
 * sec timer on it."
 *
 * A held position needs a sound at the end, because the whole point of
 * holding a wall sit is that you are NOT looking at a screen — you are staring
 * at the floor with your legs shaking. If he has to watch the number, the
 * timer has not helped.
 *
 * Deliberately not the class bell: that one means "stop and switch subjects"
 * and it rings across the whole house. This is three quick rising blips —
 * short, bright, unmistakably "that's the set". A ten-second warning uses one
 * quiet blip of the same shape so it reads as the same instrument.
 */

/**
 * ---- LOUDER, ON PURPOSE (Aug 11, 2026) ----
 *
 * The parent: "make the alarms louder I could barely hear it."
 *
 * These were set at reward-sound levels — right for a coin that chimes beside
 * you, wrong for a signal that has to cross a room and land on someone lying
 * on the floor mid-plank, possibly out of breath. Raised roughly three times,
 * which the limiter on the master bus makes safe.
 *
 * The end-of-set chime also SOUNDS TWICE now. One flourish is easy to miss
 * when you are counting your own breathing; a second one a third of a second
 * later is not, and it still finishes inside a second and a half.
 */

/** Ten seconds left — one blip. Loud enough to notice, short enough to ignore. */
export function playTimerWarning() {
  tone({ freq: 880, dur: 0.12, type: 'sine', gain: 0.22 });
}

/** The set is done. Twice, because once is missable. */
export function playTimerDone() {
  const phrase = (at) => [
    { freq: 880, dur: 0.11, type: 'sine', gain: 0.4, delay: at },
    { freq: 1174, dur: 0.11, type: 'sine', gain: 0.4, delay: at + 0.12 },
    { freq: 1568, dur: 0.3, type: 'sine', gain: 0.42, delay: at + 0.24 }
  ];
  sequence([...phrase(0), ...phrase(0.62)]);
}

/** Named lookup, for callers that carry a string rather than an import. */
export const SOUNDS = {
  chirp: playChirp,
  coin: playCoin,
  credit: playCredit,
  mastery: playMastery,
  rankUp: playRankUp,
  crate: playCrate,
  purchase: playPurchase,
  progress: playProgress,
  achievement: playAchievement,
  bellWarning: playBellWarning,
  bellSwitch: playBellSwitch,
  bellStart: playBellStart,
  schoolBell: playSchoolBell,
  timerWarning: playTimerWarning,
  timerDone: playTimerDone
};

export function play(name) {
  const fn = SOUNDS[name];
  if (fn) fn();
}
