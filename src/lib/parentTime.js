/**
 * =============================================================================
 * PARENT TIME — how long the grown-up's side of school actually takes.
 * =============================================================================
 *
 * WHY (Sept 17, 2026): audit gate 56 asks whether weekly guardian upkeep fits
 * the time available, "measured rather than guessed". Nothing measured it. The
 * dashboard already counts minutes it is open (`parentMinutes`), but most of a
 * parent's upkeep happens away from this screen — printing, reading a book
 * report on paper, planning at the kitchen table. So the parent presses Start,
 * does the work wherever it happens, and presses Stop.
 *
 * WHERE IT LIVES: one `adminRecords` row per session, `kind: 'parent-time'`.
 * That table is the parent's own, never travels in the learner's export, and
 * cannot be overwritten by a file from another computer (see
 * EXPORT_TABLE_POLICY in db/db.js). The full backup file does carry it. No
 * schema change was needed.
 *
 * A RUNNING SESSION IS A ROW WITH NO `endedAt`. The start time is stored, not
 * a counter, so a reload, a closed tab or a sleeping computer loses nothing:
 * the elapsed time is always now minus `startedAt`.
 *
 * Row shape: { id, kind, date, title, task, detail, startedAt, endedAt,
 *              minutes, createdAt, updatedAt }
 *
 * Pure functions only. No store, no database, no content — so the check can
 * run every line of it in Node.
 */

export const PARENT_TIME_KIND = 'parent-time';

/** Anything longer is probably a timer left running. Flagged, never changed. */
export const LONG_SESSION_MINUTES = 3 * 60;

export const PARENT_TASKS = [
  { id: 'grading', label: 'Grading' },
  { id: 'records', label: 'Attendance & records' },
  { id: 'planning', label: 'Planning' },
  { id: 'checking', label: 'Checking work' },
  { id: 'messages', label: 'Messages & check-ins' },
  { id: 'other', label: 'Other' }
];

export function taskLabel(id) {
  return (PARENT_TASKS.find((t) => t.id === id) || PARENT_TASKS[PARENT_TASKS.length - 1]).label;
}

/** A local 'YYYY-MM-DD' — never built from UTC. */
export function localDateStr(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** The Monday on or before a 'YYYY-MM-DD' date, as 'YYYY-MM-DD'. */
export function weekStartOf(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const back = (date.getDay() + 6) % 7; // Mon=0 … Sun=6
  date.setDate(date.getDate() - back);
  return localDateStr(date);
}

export function addDaysStr(dateStr, days) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() + days);
  return localDateStr(date);
}

export function isParentTime(record) {
  return record?.kind === PARENT_TIME_KIND;
}

/** The session still running, if any. The newest wins if there are two. */
export function openSession(records = []) {
  return records
    .filter((r) => isParentTime(r) && r.startedAt && !r.endedAt)
    .sort((a, b) => String(b.startedAt).localeCompare(String(a.startedAt)))[0] || null;
}

/** Whole minutes between two instants, never negative. */
export function minutesBetween(startIso, endIso) {
  const ms = new Date(endIso).getTime() - new Date(startIso).getTime();
  if (!Number.isFinite(ms) || ms <= 0) return 0;
  return Math.round(ms / 60000);
}

/** Minutes a session counts for: stored when stopped, live while running. */
export function sessionMinutes(record, nowIso = new Date().toISOString()) {
  if (!record) return 0;
  if (record.endedAt) return Math.max(0, Math.round(Number(record.minutes) || 0));
  return minutesBetween(record.startedAt, nowIso);
}

/** New row for Start. `now` is a Date so the test can fix the clock. */
export function startRecord({ task = 'other', now = new Date() } = {}) {
  const iso = now.toISOString();
  return {
    kind: PARENT_TIME_KIND,
    date: localDateStr(now),
    title: taskLabel(task),
    task,
    detail: null,
    startedAt: iso,
    endedAt: null,
    minutes: 0,
    createdAt: iso,
    updatedAt: iso
  };
}

/** Fields to patch onto a running row for Stop. */
export function stopChanges(record, { now = new Date(), note = '' } = {}) {
  const iso = now.toISOString();
  return {
    endedAt: iso,
    minutes: minutesBetween(record.startedAt, iso),
    detail: note.trim() || record.detail || null,
    updatedAt: iso
  };
}

/**
 * Fields to patch when she corrects a session by hand — the usual case is a
 * timer left running overnight. Minutes are what she types; the end time is
 * moved to match so the row never disagrees with itself.
 */
export function correctionChanges(record, { minutes, task, note, now = new Date() } = {}) {
  const value = Math.max(0, Math.round(Number(minutes) || 0));
  if (value > 24 * 60) return { ok: false, error: 'That is more time than a day holds.' };
  const start = new Date(record.startedAt).getTime();
  return {
    ok: true,
    changes: {
      minutes: value,
      endedAt: new Date(start + value * 60000).toISOString(),
      ...(task ? { task, title: taskLabel(task) } : {}),
      ...(note !== undefined ? { detail: String(note).trim() || null } : {}),
      correctedAt: now.toISOString(),
      updatedAt: now.toISOString()
    }
  };
}

/**
 * One week's upkeep, Monday through Sunday, by the day each session STARTED.
 * A running session counts up to `nowIso` so the total moves while she works.
 */
export function weekSummary(records = [], weekStart, nowIso = new Date().toISOString()) {
  const weekEnd = addDaysStr(weekStart, 6);
  const sessions = records
    .filter((r) => isParentTime(r) && r.date >= weekStart && r.date <= weekEnd)
    .sort((a, b) => String(b.startedAt).localeCompare(String(a.startedAt)));
  const byTask = {};
  const byDay = {};
  let minutes = 0;
  for (const s of sessions) {
    const m = sessionMinutes(s, nowIso);
    minutes += m;
    byTask[s.task || 'other'] = (byTask[s.task || 'other'] || 0) + m;
    byDay[s.date] = (byDay[s.date] || 0) + m;
  }
  const long = sessions.filter((s) => sessionMinutes(s, nowIso) > LONG_SESSION_MINUTES);
  return { weekStart, weekEnd, minutes, sessions, byTask, byDay, long };
}

export function formatMinutes(total) {
  const m = Math.max(0, Math.round(Number(total) || 0));
  const h = Math.floor(m / 60);
  return h ? `${h}h ${m % 60}m` : `${m}m`;
}

/** 'MM:SS' under an hour, 'H:MM:SS' after — for the running button. */
export function formatClock(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(s / 3600);
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
  const ss = String(s % 60).padStart(2, '0');
  return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}
