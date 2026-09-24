// ---------------------------------------------------------------------------
// DR. MARIGOLD SPEAKS WITHOUT THE BUTTON.
//
// Gigi, Sept 23 2026: "Marigold should speak not just when the speaker is
// selected. ex. she can say good morning azianna dont forget your morning
// circle and warm up."
//
// Only her greeting and her reminders (approved scope). Everything else stays
// on the 🔊 button, so lesson reading is never talked over.
//
// ---- THE ONE THING THIS CANNOT DO ----
//
// Chrome will not let a page speak until someone has tapped it. That rule is
// why an open tab cannot start talking at you, so it is not defeated here.
// In LearningOS she taps her name to sign in, and that tap counts, so the
// greeting plays straight after. If the page has not been tapped yet, the line
// waits and is spoken on her FIRST tap, anywhere. It is only marked "said" once
// it has actually been spoken, so a line that never got its chance is not
// silently lost for the day.
//
// ---- ONCE A DAY, ON THIS COMPUTER ----
//
// Remembered in this browser's storage, not in her records. Her records are
// real and backed up; which day Dr. Marigold last said good morning is not
// worth a row in them. On a second computer she may hear it once more.
//
// The on/off switch lives in the Grown-Up Corner beside the voice picker, and
// like the voice, it is saved on this computer only.
// ---------------------------------------------------------------------------

import { speechSupported, speakChunks } from './speech.js';
import { shouldSay } from './morningCircle.js';

const SAID_KEY = 'pp-marigold-said-v1';
const ON_KEY = 'pp-marigold-speaks-v1';

function readJson(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

/** Speaking out loud is ON unless a grown-up turned it off. */
export function marigoldSpeaksAloud() {
  try {
    return window.localStorage.getItem(ON_KEY) !== 'off';
  } catch {
    return true;
  }
}

export function setMarigoldSpeaksAloud(on) {
  try {
    window.localStorage.setItem(ON_KEY, on ? 'on' : 'off');
  } catch {
    /* storage blocked: the default (on) stands */
  }
}

export function saidOnRecord() {
  return readJson(SAID_KEY, {});
}

function markSaid(kind, dayKey) {
  try {
    const rec = readJson(SAID_KEY, {});
    rec[kind] = dayKey;
    window.localStorage.setItem(SAID_KEY, JSON.stringify(rec));
  } catch {
    /* storage blocked: she may hear it twice, which is harmless */
  }
}

function pageHasBeenTapped() {
  const ua = typeof navigator !== 'undefined' ? navigator.userActivation : null;
  // Browsers without the userActivation API: try, and let the browser decide.
  return ua ? ua.hasBeenActive : true;
}

let pending = null;

function speakNow(kind, text, dayKey) {
  if (speakChunks([text])) markSaid(kind, dayKey);
}

// pointerup, not pointerdown: on a touch screen Chrome only counts the tap as
// "the person used the page" when the finger LIFTS. Speaking on pointerdown
// would be refused on her Chromebook's screen and work with a mouse.
function onFirstTap() {
  window.removeEventListener('pointerup', onFirstTap, true);
  window.removeEventListener('keydown', onFirstTap, true);
  const p = pending;
  pending = null;
  if (p) speakNow(p.kind, p.text, p.dayKey);
}

/**
 * Say `text` out loud if this kind of line has not been said today.
 * Returns true when it was spoken or queued for her first tap.
 */
export function sayOncePerDay(kind, text, dayKey) {
  if (typeof window === 'undefined') return false;
  if (!marigoldSpeaksAloud() || !speechSupported()) return false;
  if (!text || !shouldSay(kind, saidOnRecord(), dayKey)) return false;

  if (pageHasBeenTapped()) {
    speakNow(kind, text, dayKey);
    return true;
  }
  // One line waits, the first one. A reminder queued behind a greeting would
  // only repeat it, and two lines on one tap is the app talking over itself.
  if (pending) return true;
  window.addEventListener('pointerup', onFirstTap, true);
  window.addEventListener('keydown', onFirstTap, true);
  pending = { kind, text, dayKey };
  return true;
}
