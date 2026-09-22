/**
 * =============================================================================
 * THE TIMETABLE SLOT — the school says which days it teaches and what runs on
 * them; the platform answers "is today a school day, and what is on it?"
 * =============================================================================
 *
 * ---- WHY THIS IS THE HARD ONE ----
 *
 * The `timetable` slot used to hand over five FUNCTIONS: `dayPattern`,
 * `subjectsForDay`, `isSchoolDay`, `isHoliday` and `holidaysInSpan`. A stored
 * Academy cannot hold a function.
 *
 * Every earlier slot was a lookup. This one is date logic, and the two schools
 * in this build do not merely fill the same table differently — they answer
 * "what kind of day is this?" from two different KINDS of calendar:
 *
 *   * ONE NAMES ITS DAYS OFF. A fixed weekday pattern, plus a list of named
 *     holidays. Everything else is a school day.
 *   * ONE NAMES ITS TERMS. Blocks of dates with a label and, for the summer
 *     term, three teaching days a week rather than five. A weekday outside
 *     every term is a day off, and it has no named holidays at all — its own
 *     file says the empty list is a decision, not a stub.
 *
 * Both are real ways to run a school year and neither is a special case of the
 * other, so the slot asks for BOTH shapes and a school fills the one it keeps:
 * `SCHOOL_HOLIDAYS` for named days off, `TERMS` for dated blocks. A school may
 * answer with either, both, or neither.
 *
 * ---- ONE SENTENCE THAT WAS INSIDE THE MECHANISM ----
 *
 * `dayPattern` built the line a child reads on a day off — the day's name, a
 * dash, and two short sentences about resting — inside the function. That is
 * content wearing mechanism's clothes: it cannot be translated and no parent
 * can change a word of it. The wording is quoted nowhere in this file, on
 * purpose. It is asked for as `HOLIDAY_NOTE`, a template whose `{holiday}` is
 * filled in, and `OUTSIDE_TERM_LABEL` for a school that names terms instead.
 *
 * ---- WHY DATES ARE READ AS LOCAL, NEVER UTC ----
 *
 * Every date here is compared as 'YYYY-MM-DD' in LOCAL time. `toISOString` is
 * UTC and would move a school day to the evening before everywhere west of
 * Greenwich — which is where both of these schools are.
 */

/** What the platform asks this slot for. */
export const TIMETABLE_QUESTIONS = Object.freeze([
  'WEEK_PATTERN',
  'SCHOOL_HOLIDAYS',
  'TERMS',
  'HOLIDAY_NOTE',
  'OUTSIDE_TERM_LABEL',
  'SUBJECTS_BY_TERM'
]);

const slot = (content) => (content && typeof content.timetable === 'object' && content.timetable) || {};
const arr = (v) => (Array.isArray(v) ? v : []);

/** 'YYYY-MM-DD' for a Date, in local time — never toISOString, which is UTC. */
export function dateKey(value) {
  if (!value) return null;
  if (typeof value === 'string') return value.slice(0, 10);
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** 0-6, Sunday first, the way Date.getDay() counts — or null. */
function weekdayOf(value) {
  if (value instanceof Date) return value.getDay();
  const key = dateKey(value);
  return key ? new Date(`${key}T00:00:00`).getDay() : null;
}

/**
 * The subjects a pattern runs, for a given quarter.
 *
 * A pattern carries a default list and may carry per-quarter overrides. A null
 * quarterId means the caller does not know or does not care and gets the
 * default. It never returns undefined: a school legitimately has days with
 * nothing on them, and every caller maps over the answer.
 *
 * Lived in src/lib/timetable.js from Sept 1, 2026 until this slot took it on
 * Sept 22; that file still re-exports it for the screens that import it there.
 */
export function patternSubjects(pattern, quarterId = null) {
  if (!pattern) return [];
  const override = quarterId && pattern.subjectsByQuarter?.[quarterId];
  return override || pattern.subjects || [];
}

/** The holiday's name if this school calls this date one, otherwise null. */
export function holidayName(content, date) {
  const key = dateKey(date);
  if (!key) return null;
  const hit = arr(slot(content).SCHOOL_HOLIDAYS).find((h) => h && h.date === key);
  return hit ? hit.name : null;
}

/** The term a date falls in, for a school that keeps terms — otherwise null. */
export function termFor(content, date) {
  const terms = slot(content).TERMS;
  const key = dateKey(date);
  if (!Array.isArray(terms) || !key) return null;
  return terms.find((t) => t && key >= t.start && key <= t.end) || null;
}

/**
 * What kind of day this is: the school's own weekday pattern, turned into a
 * day off where the school's calendar says so.
 *
 * A named holiday landing on a Saturday STAYS a weekend — it costs no school
 * day, and marking it a holiday would put a day-off notice on a screen that
 * already says the weekend is the weekend.
 */
export function dayPattern(content, date = new Date()) {
  const s = slot(content);
  const dow = weekdayOf(date);
  const base = (s.WEEK_PATTERN && s.WEEK_PATTERN[dow]) || {};
  if (base.kind === 'weekend') return base;

  const holiday = holidayName(content, date);
  if (holiday) {
    // The weekday's own note is dropped rather than kept: it describes a
    // teaching day, and a school with no day-off wording should say nothing
    // rather than print "Core academics" under the word holiday.
    const { note: _weekdayNote, ...rest } = base;
    const note = typeof s.HOLIDAY_NOTE === 'string' ? s.HOLIDAY_NOTE.replace(/\{holiday\}/g, holiday) : undefined;
    return { ...rest, kind: 'holiday', holiday, subjects: [], ...(note === undefined ? {} : { note }) };
  }

  if (Array.isArray(s.TERMS)) {
    const term = termFor(content, date);
    if (!term) return { kind: 'holiday', holiday: s.OUTSIDE_TERM_LABEL };
    return {
      ...base,
      kind: base.kind || 'core',
      flex: Boolean(term.daysPerWeek && term.daysPerWeek < 5),
      period: term.id,
      label: term.label || base.label
    };
  }

  return base;
}

/** The subjects this school teaches on a date. Always a list. */
export function subjectsForDay(content, date = new Date(), quarterId = null) {
  const pattern = dayPattern(content, date);
  const byTerm = slot(content).SUBJECTS_BY_TERM;
  if (pattern.kind === 'core' && pattern.period && byTerm?.[pattern.period]) return byTerm[pattern.period];
  return patternSubjects(pattern, quarterId);
}

/** A weekday this school teaches on. */
export function isSchoolDay(content, date) {
  const kind = dayPattern(content, date).kind;
  return kind !== 'weekend' && kind !== 'holiday';
}

/**
 * A day this school is deliberately closed.
 *
 * A named holiday counts whatever day of the week it lands on — the date IS
 * the holiday — while a weekday outside every term counts only for a school
 * that keeps terms. A weekend is a weekend, not a day off.
 */
export function isHoliday(content, date) {
  if (holidayName(content, date) !== null) return true;
  const s = slot(content);
  if (!Array.isArray(s.TERMS)) return false;
  const dow = weekdayOf(date);
  if (dow === 0 || dow === 6 || dow === null) return false;
  return termFor(content, date) === null;
}

/**
 * The named days off inside a span that actually cost a school day.
 *
 * Weekend holidays are left out on purpose: this answers "how many teaching
 * days does this span lose", and a Saturday loses none.
 */
export function holidaysInSpan(content, startDateStr, endDateStr) {
  return arr(slot(content).SCHOOL_HOLIDAYS).filter((h) => {
    if (!h || h.date < startDateStr || h.date > endDateStr) return false;
    const dow = new Date(`${h.date}T00:00:00`).getDay();
    return dow >= 1 && dow <= 5;
  });
}
