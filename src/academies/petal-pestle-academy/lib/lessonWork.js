// ---------------------------------------------------------------------------
// HER WORK IN A LESSON — what she tapped, kept so it is still there when she
// comes back (Oct 2 2026).
//
// Gigi: "The lessons … don't save the work. If she leaves the lesson or
// completes the lesson and goes back to it, the work isn't saved."
//
// ---- WHAT WENT WRONG ----
// Every answer on a lesson screen lived in React state and nowhere else. The
// screen even cleared itself on purpose when a lesson opened. The Gradebook
// was fine — finish() writes the record — but the CHILD never saw her own work
// again, and a lesson she left half-done lost every tap.
//
// ---- WHAT THIS FILE IS ----
// Pure rules, no screen and no database, so a check can call every one of them.
//
// 1. PICKS ARE SAVED BY WORDS, NOT BY POSITION. The extra-practice round deals
//    her choices in a different order each day, so "she picked B" means nothing
//    tomorrow. The text she picked still does.
// 2. A PICK IS LOCKED. The first answer to a question stands, as on the screen.
// 3. NOTHING HERE WRITES A RECORD. Restoring her screen must never count an
//    answer a second time. The Gradebook is written by finish() and the warm-up
//    and nowhere else.
// 4. A LESSON SHE FINISHED BEFORE THIS EXISTED is rebuilt from what finish()
//    recorded: her Quick check answers are in the item events with the choice
//    she made. (Warm-up and extra practice were not recorded that way and
//    cannot be rebuilt.)
// ---------------------------------------------------------------------------

export const WORK_VERSION = 1;

/** The four kinds of pick, each keyed by something that survives a re-deal. */
export const BUCKETS = ['check', 'extra', 'warm', 'apply'];
export const FLAGS = ['extraOpen', 'warmDone'];

export function emptyWork() {
  return { v: WORK_VERSION, check: {}, extra: {}, warm: {}, apply: {}, warmIds: null, warmDone: false, extraOpen: false, updatedAt: null };
}

const isText = (x) => typeof x === 'string' && x.length > 0 && x.length < 600;

function cleanPicks(raw) {
  const out = {};
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return out;
  for (const [k, v] of Object.entries(raw)) if (isText(k) && isText(v)) out[k] = v;
  return out;
}

/** One lesson's saved work, with anything malformed dropped. Never throws. */
export function cleanWork(raw) {
  const w = emptyWork();
  if (!raw || typeof raw !== 'object') return w;
  for (const b of BUCKETS) w[b] = cleanPicks(raw[b]);
  w.warmIds = Array.isArray(raw.warmIds) && raw.warmIds.every((x) => isText(x)) && raw.warmIds.length ? raw.warmIds.slice(0, 12) : null;
  w.warmDone = raw.warmDone === true;
  w.extraOpen = raw.extraOpen === true;
  w.updatedAt = typeof raw.updatedAt === 'string' ? raw.updatedAt : null;
  return w;
}

/** The whole saved map: { lessonId: work }. */
export function cleanAllWork(map) {
  const out = {};
  if (!map || typeof map !== 'object' || Array.isArray(map)) return out;
  for (const [id, w] of Object.entries(map)) if (isText(id)) out[id] = cleanWork(w);
  return out;
}

/**
 * Save one pick. Returns a NEW work object, or the SAME one (===) when nothing
 * changed — a repeat tap, a bad bucket, an empty key — so callers can skip the
 * write. The first answer stands.
 */
export function recordPick(work, bucket, key, text, now = new Date().toISOString()) {
  if (!BUCKETS.includes(bucket) || !isText(key) || !isText(text)) return work;
  if (work[bucket]?.[key] !== undefined) return work;
  return { ...work, [bucket]: { ...work[bucket], [key]: text }, updatedAt: now };
}

export function setFlag(work, flag, value, now = new Date().toISOString()) {
  if (!FLAGS.includes(flag) || typeof value !== 'boolean' || work[flag] === value) return work;
  return { ...work, [flag]: value, updatedAt: now };
}

/** Freeze the warm-up questions she was dealt, so they are the same when she returns. Set once. */
export function setWarmIds(work, ids, now = new Date().toISOString()) {
  if (work.warmIds || !Array.isArray(ids) || !ids.length || !ids.every(isText)) return work;
  return { ...work, warmIds: ids.slice(0, 12), updatedAt: now };
}

const indexOfText = (choices, text) => {
  const i = (choices || []).indexOf(text);
  return i < 0 ? undefined : i;
};

/** The Quick check: { questionNumber: choiceIndex } for every question she answered. */
export function restoreCheck(lesson, work) {
  const out = {};
  (lesson?.check || []).forEach((c, i) => {
    const idx = indexOfText(c.choices, work?.check?.[c.prompt]);
    if (idx !== undefined) out[i] = idx;
  });
  return out;
}

/** The extra round, matched by question id and the words she picked, against TODAY's dealt order. */
export function restoreExtra(pool, work) {
  const out = {};
  (pool || []).forEach((q, qi) => {
    const idx = indexOfText(q.choices, work?.extra?.[q.id]);
    if (idx !== undefined) out[qi] = idx;
  });
  return out;
}

/** The warm-up: { questionId: choiceIndex }. */
export function restoreWarm(questions, work) {
  const out = {};
  for (const q of questions || []) {
    const idx = indexOfText(q.choices, work?.warm?.[q.id]);
    if (idx !== undefined) out[q.id] = idx;
  }
  return out;
}

/** The "Try it now" question under a part of the lesson: a choice index or null. */
export function restoreApply(q, work) {
  const idx = indexOfText(q?.choices, work?.apply?.[q?.prompt]);
  return idx === undefined ? null : idx;
}

/**
 * A finished lesson's Quick check, rebuilt from the item events finish() wrote:
 * questionId `<lessonId>-check-<n>`, evidence `instruction`, with the choice she
 * made. The LATEST event for each question wins. Events for other lessons, other
 * kinds of evidence, or a choice that is not on the question are ignored.
 */
export function checkFromEvents(lesson, events) {
  const out = {};
  if (!lesson || !Array.isArray(events)) return out;
  (lesson.check || []).forEach((c, i) => {
    const qid = `${lesson.id}-check-${i + 1}`;
    let best = null;
    for (const e of events) {
      if (!e || e.questionId !== qid || e.lessonId !== lesson.id || e.evidenceSource !== 'instruction') continue;
      if (!Number.isInteger(e.chosen) || e.chosen < 0 || e.chosen >= (c.choices || []).length) continue;
      if (!best || String(e.at) >= String(best.at)) best = e;
    }
    if (best) out[i] = best.chosen;
  });
  return out;
}

/** Saved picks win; rebuilt ones only fill the gaps. */
export function mergeCheck(saved, rebuilt) {
  return { ...(rebuilt || {}), ...(saved || {}) };
}
