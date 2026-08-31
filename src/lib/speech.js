// ---------------------------------------------------------------------------
// Commander Nova's speaking voice (Release A, built Aug 8, 2026).
//
// WHY THIS EXISTS: the parent, in her words — *"I would like for Nova to have
// a voice. I think my son would love it. even if it is robotic."* An earlier
// assessment had ruled this out for lack of audio assets, which was wrong:
// every browser ships a speech engine. No files, no API key, no network, no
// cost. Nova's written lines already live in one place (novaVoice.js), so
// giving him a voice is a matter of speaking text that already exists.
//
// WHY SETTINGS LIVE IN localStorage AND NOT THE DEXIE DATABASE: the installed
// voice list is a property of the MACHINE, not the student. The parent works
// on one Windows computer and Lamar on another; a voice chosen on hers may
// simply not exist on his. Everything in the Dexie tables travels between the
// two in the JSON export, so putting the voice choice there would sync a
// setting that is meaningless on the other side — and would collide with a
// database that is being actively rebuilt elsewhere. localStorage is scoped to
// the origin, which is exactly the scope a device preference should have.
//
// This module deliberately holds NO React and NO store imports, so it can be
// called from anywhere (components, engines, future Marketplace screens)
// without creating a dependency cycle.
//
// EVERY FUNCTION HERE IS SAFE TO CALL ON A BROWSER WITH NO SPEECH SUPPORT.
// The whole feature is additive: if it cannot run, it does nothing at all and
// the rest of the app behaves exactly as it did before. That is a deliberate
// property, not an accident — this shipped two days before school started, and
// silent no-op is the only acceptable failure mode.
// ---------------------------------------------------------------------------

const STORAGE_KEY = 'mc.voice.v1';

/**
 * Voice "packs" — the unlockable presets the Marketplace will eventually sell.
 *
 * These are NOT four different recorded performances; browsers cannot do that.
 * They are voice/rate/pitch presets, which produce a real and clearly audible
 * difference without a single audio file. `voiceIndex` picks the Nth installed
 * English voice when a pack wants a different speaker rather than a different
 * delivery — resolved defensively, since we cannot know what is installed on
 * any given machine.
 *
 * `chirp: true` asks callers to bracket the line with the radio blip from
 * sfx.js. The blip is a real sound; a radio *filter* over the speech is not
 * possible, because browsers expose no audio stream for synthesized speech.
 */
export const VOICE_PACKS = [
  {
    id: 'nova',
    name: 'Commander Nova',
    desc: 'His standard voice — clear and even.',
    rate: 1.0,
    pitch: 1.0,
    chirp: false,
    free: true
  },
  {
    id: 'deep-space',
    name: 'Deep Space',
    desc: 'Lower and slower, like a long-range transmission.',
    rate: 0.88,
    pitch: 0.7,
    chirp: false
  },
  {
    id: 'mission-control',
    name: 'Mission Control',
    desc: 'Brisk, with a radio chirp on either side.',
    rate: 1.14,
    pitch: 1.08,
    chirp: true
  },
  {
    id: 'ground-team',
    name: 'Ground Team',
    desc: 'A different speaker entirely, if this computer has one.',
    rate: 1.0,
    pitch: 1.0,
    chirp: false,
    voiceIndex: 1
  }
];

export const DEFAULT_PACK_ID = 'nova';

export function packById(id) {
  return VOICE_PACKS.find((p) => p.id === id) || VOICE_PACKS[0];
}

// --- settings -------------------------------------------------------------

const DEFAULT_SETTINGS = {
  // OFF by default, deliberately. He may want to read in silence, and a
  // feature that starts talking unprompted is a feature that gets muted
  // permanently in week one. He turns it on himself, which also supplies
  // the user gesture browsers require before any audio may play.
  enabled: false,
  voiceURI: '',
  packId: DEFAULT_PACK_ID,
  rate: 1.0,
  volume: 1.0,
  // Auto-speak only the moments worth interrupting for. Briefings, hints and
  // lesson text stay tap-to-hear. See shouldAutoSpeak().
  autoSpeak: true
};

function readSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_SETTINGS, ...(parsed && typeof parsed === 'object' ? parsed : {}) };
  } catch {
    // Private browsing, disabled storage, corrupt JSON — all non-fatal.
    return { ...DEFAULT_SETTINGS };
  }
}

let settings = readSettings();
const listeners = new Set();

export function getVoiceSettings() {
  return { ...settings };
}

/** Merge-and-persist. Returns the new settings. Never throws. */
export function setVoiceSettings(changes) {
  settings = { ...settings, ...changes };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    /* storage unavailable — the setting still applies for this session */
  }
  if (!settings.enabled) cancelSpeech();
  for (const fn of listeners) {
    try {
      fn(getVoiceSettings());
    } catch {
      /* a broken listener must never take the audio system down */
    }
  }
  return getVoiceSettings();
}

/** Subscribe to setting changes. Returns an unsubscribe function. */
export function onVoiceSettingsChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

// --- capability + voice list ---------------------------------------------

export function isSpeechSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && typeof window.SpeechSynthesisUtterance === 'function';
}

/**
 * The installed voices, English first.
 *
 * THE ASYNCHRONOUS-LIST TRAP: on Chrome the first call to getVoices() very
 * often returns an empty array, and the real list only arrives later on the
 * 'voiceschanged' event. Code that reads it once at startup renders an empty
 * voice picker and looks broken. This returns whatever is available right now;
 * callers that need to WAIT should use loadVoices() below.
 */
export function listVoices() {
  if (!isSpeechSupported()) return [];
  let voices = [];
  try {
    voices = window.speechSynthesis.getVoices() || [];
  } catch {
    return [];
  }
  const isEnglish = (v) => (v.lang || '').toLowerCase().startsWith('en');
  return [...voices.filter(isEnglish), ...voices.filter((v) => !isEnglish(v))];
}

/**
 * Resolve the voice list, waiting for 'voiceschanged' if it is not ready yet.
 * Resolves with whatever exists after `timeoutMs` rather than hanging forever —
 * some machines never fire the event at all.
 */
export function loadVoices(timeoutMs = 2000) {
  return new Promise((resolve) => {
    if (!isSpeechSupported()) return resolve([]);
    const immediate = listVoices();
    if (immediate.length) return resolve(immediate);

    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      try {
        window.speechSynthesis.removeEventListener('voiceschanged', finish);
      } catch {
        /* older engines expose only the onvoiceschanged property */
      }
      resolve(listVoices());
    };
    try {
      window.speechSynthesis.addEventListener('voiceschanged', finish);
    } catch {
      /* fall through to the timeout */
    }
    setTimeout(finish, timeoutMs);
  });
}

/** The SpeechSynthesisVoice a pack + settings resolve to, or null for the engine default. */
function resolveVoice(pack) {
  const voices = listVoices();
  if (!voices.length) return null;
  // A pack that wants a *different speaker* takes priority over the saved
  // voice, which is the entire point of that pack.
  if (typeof pack.voiceIndex === 'number') {
    return voices[pack.voiceIndex] || voices[0] || null;
  }
  if (settings.voiceURI) {
    const saved = voices.find((v) => v.voiceURI === settings.voiceURI);
    if (saved) return saved;
    // The saved voice does not exist on THIS machine — expected when a build
    // moves between the two computers. Fall through to the default rather
    // than going silent.
  }
  return null;
}

// --- speaking -------------------------------------------------------------

/**
 * Sentence-ish chunks, each short enough for Chrome.
 *
 * THE TRUNCATION TRAP: Chrome stops speaking after roughly 15 seconds of a
 * single utterance and does not report an error — Nova simply cuts off
 * mid-sentence. Splitting into short utterances and queueing them keeps every
 * line intact. Splitting on sentence boundaries (rather than a hard character
 * count) also keeps the prosody natural.
 */
function chunkText(text, maxLen = 180) {
  const clean = String(text).replace(/\s+/g, ' ').trim();
  if (!clean) return [];
  const sentences = clean.match(/[^.!?]+[.!?]*\s*/g) || [clean];
  const chunks = [];
  let current = '';
  for (const s of sentences) {
    if (current && (current + s).length > maxLen) {
      chunks.push(current.trim());
      current = s;
    } else {
      current += s;
    }
    // A single sentence longer than the cap still has to be broken up.
    while (current.length > maxLen) {
      const cut = current.lastIndexOf(' ', maxLen);
      const at = cut > 40 ? cut : maxLen;
      chunks.push(current.slice(0, at).trim());
      current = current.slice(at);
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks.filter(Boolean);
}

// Chrome can leave the synthesizer stuck in a paused state on long queues.
// A periodic resume() while speaking is the standard workaround; the timer is
// cleared the moment nothing is speaking so it never runs idle.
let keepAliveTimer = null;

function startKeepAlive() {
  if (keepAliveTimer || !isSpeechSupported()) return;
  keepAliveTimer = setInterval(() => {
    try {
      const s = window.speechSynthesis;
      if (!s.speaking) return stopKeepAlive();
      if (s.paused) s.resume();
    } catch {
      stopKeepAlive();
    }
  }, 8000);
}

function stopKeepAlive() {
  if (keepAliveTimer) {
    clearInterval(keepAliveTimer);
    keepAliveTimer = null;
  }
}

/** Stop anything Nova is currently saying. Safe to call at any time. */
export function cancelSpeech() {
  stopKeepAlive();
  if (!isSpeechSupported()) return;
  try {
    window.speechSynthesis.cancel();
  } catch {
    /* nothing to cancel */
  }
}

/**
 * Speak a line as Nova.
 *
 * @param {string} text
 * @param {object} [opts]
 * @param {boolean} [opts.force]  speak even when auto-speak is off (a tapped
 *                                speaker button is an explicit request)
 * @param {string}  [opts.packId] override the saved pack
 * @param {Function} [opts.onStart]
 * @param {Function} [opts.onEnd]
 * @returns {boolean} whether speech was actually started
 */
export function speak(text, opts = {}) {
  if (!isSpeechSupported()) return false;
  if (!settings.enabled && !opts.force) return false;

  const chunks = chunkText(text);
  if (!chunks.length) return false;

  const pack = packById(opts.packId || settings.packId);
  const voice = resolveVoice(pack);

  cancelSpeech();

  // Chrome intermittently drops an utterance queued in the same tick as a
  // cancel(). One frame of delay is enough to avoid it.
  setTimeout(() => {
    try {
      let started = false;
      chunks.forEach((chunk, i) => {
        const u = new window.SpeechSynthesisUtterance(chunk);
        if (voice) u.voice = voice;
        u.rate = Math.max(0.5, Math.min(2, (pack.rate || 1) * (settings.rate || 1)));
        u.pitch = Math.max(0, Math.min(2, pack.pitch || 1));
        u.volume = Math.max(0, Math.min(1, settings.volume ?? 1));
        if (i === 0) {
          u.onstart = () => {
            started = true;
            startKeepAlive();
            if (opts.onStart) opts.onStart();
          };
        }
        if (i === chunks.length - 1) {
          u.onend = () => {
            stopKeepAlive();
            if (opts.onEnd) opts.onEnd();
          };
          u.onerror = () => {
            stopKeepAlive();
            if (opts.onEnd) opts.onEnd();
          };
        }
        window.speechSynthesis.speak(u);
      });
      // Some engines never fire onstart; keep-alive should still run.
      if (!started) startKeepAlive();
    } catch {
      stopKeepAlive();
      if (opts.onEnd) opts.onEnd();
    }
  }, 30);

  return true;
}

/**
 * Which moments Nova speaks on his own.
 *
 * THIS IS A DESIGN RULE, NOT A TECHNICAL ONE, and it is the difference between
 * a companion and a nuisance. A voice that fires on every render becomes noise
 * within a week, gets switched off, and never gets switched back on. Nova
 * speaks unprompted only at moments that genuinely matter; everything else is
 * available on the speaker button, which puts him under the student's control
 * rather than the app's.
 */
const AUTO_SPEAK_TONES = new Set(['mastery', 'rankup', 'celebration']);

export function shouldAutoSpeak(tone) {
  if (!settings.enabled || !settings.autoSpeak) return false;
  return AUTO_SPEAK_TONES.has(tone);
}

/**
 * A short, friendly preview line — used by the voice picker so a voice can be
 * judged by ear, which is the only way to judge one.
 */
export function previewLine() {
  return 'Commander Nova here. Systems nominal, cadet — ready when you are.';
}
