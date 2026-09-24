// ---------------------------------------------------------------------------
// DR. MARIGOLD SPEAKS WITHOUT THE BUTTON.
//
// Gigi, Sept 23 2026: "Marigold should speak not just when the speaker is
// selected. ex. she can say good morning azianna dont forget your morning
// circle and warm up."
//
// Gigi, Sept 24 2026: "Azianna will like it if Dr. Marigold can talk to her all
// the time. So every time she has a message have her say it out loud."
//
// So EVERY Dr. Marigold message is spoken when it appears on screen
// (sayMessage, called by MarigoldMessage.jsx), and the Morning Circle greeting
// and reminders are also held to once a day (sayOncePerDay).
//
// ---- SO SHE IS NEVER TALKED OVER, AND NEVER REPEATS HERSELF ----
//  · A message that arrives with another one on the same screen is QUEUED
//    after it, not cut off (Today can show two at once).
//  · A message on a NEW screen stops whatever she was still saying about the
//    last one. Pressing any "read it to me" button also stops her, because
//    that button cancels speech first.
//  · The same words are not said twice within a minute (the greeting box and
//    the greeting line are the same sentence).
//
// ---- THE ONE THING THIS CANNOT DO ----
// Chrome will not let a page speak until someone has tapped it. That rule is
// why an open tab cannot start talking at you, so it is not defeated here.
// In LearningOS she taps her name to sign in, and that tap counts. If the page
// has not been tapped yet, what she would have said waits and is spoken on her
// FIRST tap, anywhere (pointerup: a touch screen only counts the lift). A
// once-a-day line is only marked "said" once it has actually been spoken.
//
// ---- ON THIS COMPUTER ----
// Remembered in this browser's storage, not in her records. The on/off switch
// lives in the Grown-Up Corner beside the voice picker, saved on this computer.
// ---------------------------------------------------------------------------

import { speechSupported, speakChunks } from './speech.js';
import { shouldSay } from './morningCircle.js';

const SAID_KEY = 'pp-marigold-said-v1';
const ON_KEY = 'pp-marigold-speaks-v1';

/** The same words are not said again within this long. */
export const REPEAT_WINDOW_MS = 60 * 1000;
/** Messages this close together are one screen's worth: queued, not cut off. */
export const SAME_SCREEN_MS = 1500;
/** At most this many lines wait for her first tap. */
const MAX_WAITING = 3;

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

let pending = [];
let lastSpoken = null; // { key, at }
let lastStartedAt = 0;

function speakItem(item) {
  const key = item.parts.join(' ');
  const now = Date.now();
  const repeat = lastSpoken && lastSpoken.key === key && now - lastSpoken.at < REPEAT_WINDOW_MS;
  let ok = true;
  if (!repeat) {
    // Same screen: queue behind the one before. New screen: start fresh.
    const queue = now - lastStartedAt < SAME_SCREEN_MS;
    ok = speakChunks(item.parts, { queue });
    if (ok) {
      lastSpoken = { key, at: now };
      lastStartedAt = now;
    }
  }
  if (ok && item.kind) markSaid(item.kind, item.dayKey);
}

// pointerup, not pointerdown: on a touch screen Chrome only counts the tap as
// "the person used the page" when the finger LIFTS. Speaking on pointerdown
// would be refused on her Chromebook's screen and work with a mouse.
function onFirstTap() {
  window.removeEventListener('pointerup', onFirstTap, true);
  window.removeEventListener('keydown', onFirstTap, true);
  const list = pending;
  pending = [];
  list.forEach(speakItem);
}

function enqueue(item) {
  if (pageHasBeenTapped()) {
    speakItem(item);
    return true;
  }
  if (!pending.length) {
    window.addEventListener('pointerup', onFirstTap, true);
    window.addEventListener('keydown', onFirstTap, true);
  }
  if (pending.length < MAX_WAITING) pending.push(item);
  return true;
}

/**
 * Say one of her messages out loud as it appears. MarigoldMessage.jsx calls
 * this for every message she shows. Returns true when spoken or waiting.
 */
export function sayMessage(parts) {
  if (typeof window === 'undefined') return false;
  if (!marigoldSpeaksAloud() || !speechSupported()) return false;
  const clean = (Array.isArray(parts) ? parts : [parts]).map((p) => String(p || '').trim()).filter(Boolean);
  if (!clean.length) return false;
  return enqueue({ parts: clean });
}

/**
 * Say `text` out loud if this kind of line has not been said today.
 * Returns true when it was spoken or is waiting for her first tap.
 */
export function sayOncePerDay(kind, text, dayKey) {
  if (typeof window === 'undefined') return false;
  if (!marigoldSpeaksAloud() || !speechSupported()) return false;
  if (!text || !shouldSay(kind, saidOnRecord(), dayKey)) return false;
  if (pending.some((p) => p.kind === kind)) return true;
  return enqueue({ kind, dayKey, parts: [text] });
}
