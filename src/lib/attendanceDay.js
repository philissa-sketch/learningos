/**
 * =============================================================================
 * ONE DAY'S ATTENDANCE STATUS — for the Attendance calendar.
 * =============================================================================
 *
 * WHY (Sept 17, 2026): audit gate 31 — "open any past date and see that day's
 * status." The dashboard showed a total and the last fourteen days, with no way
 * to open a date and no word for what the day was.
 *
 * NO SECOND OPINION. A day's status is decided by the SCHOOL's own
 * `instructionProgress`, asked about that one day. It is the same function the
 * compliance screen and packet use for the year, so the calendar and the
 * year's count cannot disagree: a day this calls "full" is a day that counts
 * as full there. The school's thresholds never appear in this file.
 *
 * THE PARENT'S MARK SITS BESIDE THE RECORD, NEVER ON IT. She can mark a day
 * Present, Absent, Sick, Field trip or Excused with a note. The mark is her
 * statement and is shown next to the status; it changes no minutes and no
 * count. Time that happened away from the screen is entered as offline
 * minutes, the one existing, deliberate way to add instruction to a day.
 *
 * Marks are `adminRecords` rows, `kind: 'attendance-mark'` — the parent's own
 * table, which a file from another computer cannot overwrite. One live mark per
 * date: the newest row wins, and clearing writes a row with `mark: null`, so
 * the history of what she said stays on the record.
 *
 * Pure functions only; the school's rule is passed in.
 */

export const ATTENDANCE_MARK_KIND = 'attendance-mark';

export const ATTENDANCE_MARKS = [
  { id: 'present', label: 'Present' },
  { id: 'absent', label: 'Absent' },
  { id: 'sick', label: 'Sick' },
  { id: 'field-trip', label: 'Field trip' },
  { id: 'excused', label: 'Excused' }
];

export function markLabel(id) {
  return ATTENDANCE_MARKS.find((m) => m.id === id)?.label || null;
}

/**
 * Status codes, in the order a legend lists them.
 *   full       counted, and met the school's daily minimum
 *   short      counted, under the daily minimum
 *   none       a school day with nothing recorded
 *   off        not a school day (weekend, holiday, break), nothing recorded
 *   offWork    work recorded on a day the school does not count — kept, not counted
 *   before     before the first day of school
 *   future     has not happened yet
 */
export const DAY_STATUSES = {
  full: { label: 'Full day', tone: 'green' },
  short: { label: 'Short day', tone: 'amber' },
  none: { label: 'No work recorded', tone: 'red' },
  off: { label: 'Not a school day', tone: 'muted' },
  offWork: { label: 'Work on a day off (not counted)', tone: 'muted' },
  before: { label: 'Before the school year', tone: 'muted' },
  future: { label: 'Upcoming', tone: 'muted' }
};

/**
 * @param {string} date                'YYYY-MM-DD'
 * @param {object} ctx
 *   row                attendance row for the date (may be undefined)
 *   scheduled          scheduled minutes credited to the date
 *   today              'YYYY-MM-DD'
 *   schoolYearStart    'YYYY-MM-DD'
 *   isSchoolDay        (date) => boolean — the school's calendar
 *   instructionProgress the school's year rule, asked about one day
 *   minutesOf          (row, scheduled) => credited minutes (platform rule)
 */
export function dayStatus(date, ctx = {}) {
  const {
    row = {},
    scheduled = 0,
    today,
    schoolYearStart,
    isSchoolDay = () => true,
    instructionProgress,
    minutesOf = () => 0
  } = ctx;
  const minutes = minutesOf(row, scheduled);
  const activities = (row.lessonsCompleted || 0) + (row.writingEntries || 0) + (row.typingSessions || 0);
  const base = { date, minutes, activities };

  if (today && date > today) return { ...base, code: 'future', counted: false };
  if (schoolYearStart && date < schoolYearStart) return { ...base, code: 'before', counted: false };

  const one = typeof instructionProgress === 'function'
    ? instructionProgress({ [date]: row }, {
        schoolYearStart,
        isSchoolDay,
        scheduledMinutesByDate: { [date]: scheduled }
      })
    : null;

  if (one && one.fullDays > 0) return { ...base, code: 'full', counted: true };
  if (one && one.daysLogged > 0) return { ...base, code: 'short', counted: true };
  if (one && one.excludedNonSchoolDays > 0) return { ...base, code: 'offWork', counted: false };
  if (!isSchoolDay(date)) {
    return { ...base, code: activities > 0 ? 'offWork' : 'off', counted: false };
  }
  return { ...base, code: 'none', counted: false };
}

/** date → the newest mark row for it (a cleared mark has `mark: null`). */
export function latestMarks(records = []) {
  const out = {};
  for (const r of records) {
    if (r?.kind !== ATTENDANCE_MARK_KIND || !r.date) continue;
    const at = r.updatedAt || r.createdAt || '';
    const prev = out[r.date];
    const prevAt = prev ? prev.updatedAt || prev.createdAt || '' : '';
    if (!prev || at > prevAt || (at === prevAt && (r.id || 0) > (prev.id || 0))) out[r.date] = r;
  }
  return out;
}

/** A new mark row. `mark: null` clears the day. */
export function markRecord({ date, mark, note = '', now = new Date() }) {
  const iso = now.toISOString();
  const id = mark && markLabel(mark) ? mark : null;
  return {
    kind: ATTENDANCE_MARK_KIND,
    date,
    title: id ? markLabel(id) : 'Mark cleared',
    mark: id,
    detail: String(note || '').trim() || null,
    createdAt: iso,
    updatedAt: iso
  };
}

/** Counts for one month's grid, for the line above the calendar. */
export function monthCounts(statuses = []) {
  const counts = { full: 0, short: 0, none: 0 };
  for (const s of statuses) if (s.code in counts) counts[s.code] += 1;
  return counts;
}
