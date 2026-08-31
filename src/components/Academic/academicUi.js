import { SUBJECT_LABELS, isKhanTaughtSubject } from '../../academies/lamar/subjects.js';
import {
  ACADEMIC_SUBJECT_ORDER,
  ACADEMIC_SUCCESS_CENTER_QUARTER_ORDER
} from '../../academies/lamar/data/academicSuccessCenter/placeholders.js';
import { parseDateStr, todayDateStr } from '../../lib/scheduler.js';

/**
 * Small shared display helpers for the Academic Success Center views.
 * Kept out of the components so the four views can't drift on how a
 * status or a subject heading is labeled.
 */

export const BOOK_STATUS_LABELS = {
  empty: 'No book yet',
  'not-started': 'Not started',
  'in-progress': 'Reading',
  completed: 'Finished'
};

export const ASSIGNMENT_STATUS_LABELS = {
  placeholder: 'Not scheduled',
  'not-started': 'Not started',
  'in-progress': 'In progress',
  completed: 'Completed'
};

/** Badge classes per status — same palette conventions as the rest of the app. */
export function statusBadgeClass(status) {
  switch (status) {
    case 'completed':
      return 'border-signal-cyan/40 bg-signal-cyan/10 text-signal-cyan';
    case 'in-progress':
      return 'border-signal-amber/40 bg-signal-amber/10 text-signal-amber';
    case 'not-started':
      return 'border-ink-600/40 bg-ink-900/20 text-ink-300';
    default:
      return 'border-ink-600/40 bg-ink-900/20 text-ink-500';
  }
}

export function subjectHeading(subject) {
  const label = SUBJECT_LABELS[subject] || subject;
  return isKhanTaughtSubject(subject) ? `${label} (Khan Academy)` : label;
}

/**
 * Subjects in the Center's display order, with any subject that has
 * rows but isn't in ACADEMIC_SUBJECT_ORDER appended rather than dropped
 * — so adding a subject to the seed file can never make it silently
 * invisible here.
 */
export function orderedSubjects(rows) {
  const present = new Set(rows.map((r) => r.subject));
  const ordered = ACADEMIC_SUBJECT_ORDER.filter((s) => present.has(s));
  const extras = [...present].filter((s) => !ACADEMIC_SUBJECT_ORDER.includes(s)).sort();
  return [...ordered, ...extras];
}

/** Quarters in real school-year order, unknown ones appended alphabetically. */
export function orderedQuarters(rows) {
  const present = new Set(rows.map((r) => r.quarter));
  const ordered = ACADEMIC_SUCCESS_CENTER_QUARTER_ORDER.filter((q) => present.has(q));
  const extras = [...present].filter((q) => !ACADEMIC_SUCCESS_CENTER_QUARTER_ORDER.includes(q)).sort();
  return [...ordered, ...extras];
}

/**
 * Formats a 'YYYY-MM-DD' due date for display. Uses parseDateStr, never
 * `new Date('YYYY-MM-DD')` — the latter parses as UTC midnight and can
 * render as the previous day in US timezones (a bug class this project
 * has already hit and fixed once; see lib/scheduler.js).
 */
export function formatDueDate(dateStr) {
  if (!dateStr) return null;
  return parseDateStr(dateStr).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Days until a due date, comparing local date STRINGS rather than Date
 * objects so a time-of-day component can never make "due today" read as
 * overdue. Returns null when there's no due date.
 */
export function dueDateStatus(dateStr, today = todayDateStr()) {
  if (!dateStr) return null;
  if (dateStr === today) return 'today';
  return dateStr < today ? 'overdue' : 'upcoming';
}

export function formatCompletedAt(value) {
  if (!value) return null;
  // Academic/writing rows store full ISO timestamps; hand-logged
  // portfolio rows store a bare 'YYYY-MM-DD'. Parse each with the tool
  // that's correct for its shape.
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return parseDateStr(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  }
  return new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}
