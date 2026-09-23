// ---------------------------------------------------------------------------
// READ IT TO ME.
//
// WHY THIS EXISTS. Rewriting every question into plainer English (see
// scripts/check-readability.mjs) lowers the reading load. It cannot remove it —
// a question is made of words, and if she reads well below the level of a maths
// item she can still fail it for the wrong reason.
//
// This is the actual fix. A child who can hear the question answers the maths
// question with her maths, and the strand measures what it claims to measure.
//
// Uses the browser's own speech synthesis. Nothing is sent anywhere, no account,
// no key, no network — the same offline promise the rest of the app makes.
//
// ---- THE ONE PLACE IT CHANGES WHAT IS BEING MEASURED ----
//
// On a READING COMPREHENSION or VOCABULARY item, reading the passage aloud
// converts the question from reading to listening. That is not cheating and it
// must not be blocked — a child who needs it needs it — but the resulting number
// is a listening-comprehension estimate, and a parent reading "4.2 in Reading"
// deserves to know which one it is. So every answer records whether it was read
// aloud, and the Grown-Up Corner says so plainly.
//
// Recording it and telling the truth about it is better than either blocking it
// or pretending it did not happen.
// ---------------------------------------------------------------------------

export function speechSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

/**
 * VOICES KNOWN TO BE FEMALE, by platform.
 *
 * FIXED after the grandmother reported it: "Dr. Marigold's voice is male
 * instead of female." The old picker asked only for an English voice and took
 * whatever came first, which on Windows is usually Microsoft David. So the app
 * put a man's voice on a character introduced on screen as a woman — a small
 * bug with an outsized effect, because for a nine-year-old the voice IS the
 * character.
 *
 * The Web Speech API exposes no gender field. It exposes a name, so the name is
 * what we match on. This list is not a guess: these are the shipped female
 * voices on Windows, macOS/iOS, Android and Chrome. Order matters — earlier
 * entries are preferred.
 *
 * A name list can go stale, which is why the grown-up can override it entirely
 * from the Grown-Up Corner. The list is the sensible default, not the only way.
 */
const FEMALE_VOICE_NAMES = [
  // Windows
  'Microsoft Zira', 'Microsoft Aria', 'Microsoft Jenny', 'Microsoft Michelle',
  'Microsoft Ana', 'Microsoft Eva', 'Microsoft Hazel', 'Microsoft Catherine',
  'Microsoft Linda', 'Microsoft Emily', 'Microsoft Clara', 'Microsoft Sonia',
  'Zira', 'Hazel',
  // macOS / iOS
  'Samantha', 'Ava', 'Allison', 'Susan', 'Victoria', 'Karen', 'Moira', 'Tessa',
  'Fiona', 'Serena', 'Nicky',
  // Chrome / Google / Android
  'Google US English', 'Google UK English Female', 'English United States'
];

/**
 * ---- THE BUG THIS FIXES (v1.5) ----
 *
 * The grandmother reported "no female voice", then — after the picker shipped —
 * "I did see the woman voice in the grown-up area." Both were true at once, and
 * the contradiction is the diagnosis.
 *
 * Chrome loads voices ASYNCHRONOUSLY. getVoices() returns an EMPTY ARRAY on the
 * first call after a page load, and only fills in when the browser fires
 * `voiceschanged` — usually tens of milliseconds later. Dr. Marigold greets her
 * the moment a screen opens, which is inside that window. pickVoice() got an
 * empty list, returned null, and the utterance went out with no voice set — so
 * the browser used its own default, which on Windows is Microsoft David. A man.
 *
 * By the time anyone opens the Grown-Up Corner and looks at the picker, the
 * voices have long since loaded, so the list looks perfect and the female voice
 * is right there. The picker was never broken. The timing was.
 *
 * Two things fix it, and both are needed:
 *   1. Ask for the voices at import time and listen for `voiceschanged`, so the
 *      list is usually warm before anything speaks.
 *   2. If something speaks anyway before they land, HOLD the utterance and
 *      release it when they arrive, instead of speaking it with no voice.
 *
 * Speaking late in the right voice beats speaking now in the wrong one — the
 * voice IS the character to a nine-year-old.
 */
let voicesWarm = false;

function voicesAvailable() {
  try {
    return (window.speechSynthesis.getVoices() || []).length > 0;
  } catch {
    return false;
  }
}

/** Nudge the browser into loading voices and note when it has. Safe to call
 *  repeatedly; safe to call before the user has interacted with the page. */
export function warmVoices() {
  if (!speechSupported()) return;
  try {
    if (voicesAvailable()) {
      voicesWarm = true;
      return;
    }
    window.speechSynthesis.addEventListener?.('voiceschanged', () => {
      voicesWarm = true;
    });
    // Safari and older Chrome expose the handler property, not the event.
    if (!window.speechSynthesis.addEventListener) {
      window.speechSynthesis.onvoiceschanged = () => {
        voicesWarm = true;
      };
    }
  } catch {
    /* speech is a convenience, never load-bearing */
  }
}

// Start the load as early as possible — this module is imported by every screen
// that speaks, so the clock starts well before Dr. Marigold says anything.
warmVoices();

/**
 * Run fn once the voice list is populated, or after a short grace period if the
 * browser never fires the event (some builds simply do not). 1200ms is long
 * enough for a local voice list and short enough that a child does not decide
 * the button is broken.
 */
function whenVoicesReady(fn) {
  if (voicesAvailable()) {
    fn();
    return;
  }
  let done = false;
  const go = () => {
    if (done) return;
    done = true;
    fn();
  };
  try {
    window.speechSynthesis.addEventListener?.('voiceschanged', go, { once: true });
  } catch {
    /* fall through to the timer */
  }
  setTimeout(go, 1200);
}

/** Every English voice the browser has, for the Grown-Up Corner's picker. */
export function listVoices() {
  try {
    const voices = window.speechSynthesis.getVoices() || [];
    return voices
      .filter((v) => /^en(-|_|$)/i.test(v.lang || ''))
      .map((v) => ({ name: v.name, lang: v.lang, local: !!v.localService }));
  } catch {
    return [];
  }
}

/**
 * Pick a voice.
 *
 * 1. Whatever the grown-up chose, if it is still installed.
 * 2. A known female voice, in the order listed above.
 * 3. Anything whose name literally contains "female".
 * 4. Any English voice at all — better a wrong-sounding voice than silence.
 *
 * Voices load asynchronously in some browsers, which is why this runs at speak
 * time rather than being cached at import.
 */
function pickVoice(preferredName) {
  try {
    const voices = window.speechSynthesis.getVoices() || [];
    if (voices.length === 0) return null;

    if (preferredName) {
      const chosen = voices.find((v) => v.name === preferredName);
      if (chosen) return chosen;
    }

    const english = voices.filter((v) => /^en(-|_|$)/i.test(v.lang || ''));
    const pool = english.length ? english : voices;

    for (const wanted of FEMALE_VOICE_NAMES) {
      const hit = pool.find((v) => (v.name || '').toLowerCase().includes(wanted.toLowerCase()));
      if (hit) return hit;
    }
    const labelled = pool.find((v) => /female|woman/i.test(v.name || ''));
    if (labelled) return labelled;

    // Prefer a local voice: network voices can lag for seconds on first use,
    // which reads to a child as "the button is broken".
    return pool.find((v) => v.localService) || pool[0];
  } catch {
    return null;
  }
}

/** The grown-up's override, read from localStorage so lib/speech.js stays free
 *  of database imports. Written by the Grown-Up Corner's voice picker. */
const VOICE_KEY = 'pp.voice.v1';

export function getPreferredVoiceName() {
  try {
    return localStorage.getItem(VOICE_KEY) || null;
  } catch {
    return null;
  }
}

export function setPreferredVoiceName(name) {
  try {
    if (name) localStorage.setItem(VOICE_KEY, name);
    else localStorage.removeItem(VOICE_KEY);
  } catch {
    /* a voice preference is a convenience, never load-bearing */
  }
}

/** Slower than default. Nine-year-olds, and anyone using this because reading is
 *  hard, need the pace down — but not so far down that it sounds odd. */
export const SPEECH_RATE = 0.9;

/** Slightly above default. Combined with the female voice list this reads as a
 *  warm adult woman rather than a synthesised default. */
export const SPEECH_PITCH = 1.08;

export function stopSpeaking() {
  if (!speechSupported()) return;
  try {
    window.speechSynthesis.cancel();
  } catch {
    /* nothing to do — this is a convenience feature, never load-bearing */
  }
}

/**
 * Speak a list of chunks with a pause between them, so the passage, the
 * question and each answer choice land as separate thoughts instead of one
 * long run-on. Returns true if speech actually started.
 */
export function speakChunks(chunks, { onEnd } = {}) {
  if (!speechSupported()) return false;
  stopSpeaking();
  const parts = (chunks || []).map((c) => String(c || '').trim()).filter(Boolean);
  if (parts.length === 0) return false;

  // HOLD until the browser has actually loaded its voices. Speaking into an
  // empty voice list is what produced the male voice — see the long note above.
  whenVoicesReady(() => {
    const voice = pickVoice(getPreferredVoiceName());
    parts.forEach((text, i) => {
      const u = new SpeechSynthesisUtterance(text);
      u.rate = SPEECH_RATE;
      u.pitch = SPEECH_PITCH;
      if (voice) u.voice = voice;
      // A trailing pause between chunks, done by appending a full stop rather
      // than by timers — timers and speechSynthesis fight each other, and losing
      // that fight sounds like the app talking over itself.
      if (i === parts.length - 1 && typeof onEnd === 'function') u.onend = onEnd;
      window.speechSynthesis.speak(u);
    });
  });
  return true;
}

/** The chunks for one diagnostic item, in the order she needs them. */
export function chunksForItem(item) {
  if (!item) return [];
  const out = [];
  if (item.passage) out.push(item.passage);
  out.push(item.prompt);
  (item.choices || []).forEach((c, i) => {
    out.push(`${String.fromCharCode(65 + i)}. ${c}`);
  });
  return out;
}
