/**
 * =============================================================================
 * THE SCHOOL-YEAR SLOT — the school says when its year starts and how it is
 * divided; the platform answers "which period is this date in, what is it
 * called, and is this piece of work open yet?"
 * =============================================================================
 *
 * ---- WHY THIS EXISTS (Sept 22, 2026) ----
 *
 * `src/lib/schoolQuarter.js` sat in the platform holding one family's first day
 * of school as a typed-in Date and one family's four themed period names. Every
 * school that ever booted inherited both: the same first day, the same month
 * boundaries, the same names. It was the largest piece of a single school still
 * inside the platform, and 24 files read it.
 *
 * The rules in that file were never the family's. Mapping a date to a period,
 * writing the period's label for a row, ranking labels across years so work
 * from a past year is never re-locked and work from a future year never opens
 * early — that is the same for every school. Only the calendar is theirs.
 *
 * ---- WHAT A SCHOOL ANSWERS ----
 *
 *   FIRST_DAY   'YYYY-MM-DD', its first day of instruction. Before it, nothing
 *               is completable. A Date is accepted too; a stored school sends a
 *               string. Read as LOCAL midnight, never UTC.
 *
 *   PERIODS     its year, in order, first period first:
 *                 { id, label, months: [m, m, ...], labelYear }
 *               `months` are 1-12, consecutive, and together should cover the
 *               year. The first month of the first period is where the school
 *               year turns over. `labelYear` is how a row is labelled:
 *                 'span'      (default) '<id> 2026-2027'
 *                 'calendar'  '<id> 2027' — the calendar year the period
 *                             falls in, for a period the school files that way
 *
 * Both are optional. A school that answers neither gates nothing: every date
 * has started, no period is current, and no piece of work is ever locked. That
 * is the honest answer for a school that has not said when its year runs.
 *
 * ---- WHY THE LABEL FORMAT IS PRESERVED EXACTLY ----
 *
 * Period labels are not display text — they are written into saved rows as
 * `batchLabel` and `quarter`, and compared as strings. A school's rows written
 * last month must still match this month, so the label is built from the
 * school's own period id in the format rows already carry, and the recognisers
 * accept exactly what the old rules accepted.
 *
 * ---- ONE BEHAVIOUR KEPT DELIBERATELY, AND NAMED ----
 *
 * A legacy label with a period but no year is ranked in the CURRENT year —
 * the real now, even when a caller asks about another date. That is how it has
 * always behaved and changing it would move gates on saved work, which is a
 * decision for a parent, not a side effect of a move.
 */

/** What the platform asks this slot for. */
export const SCHOOL_YEAR_QUESTIONS = Object.freeze(['FIRST_DAY', 'PERIODS']);

const slot = (content) => (content && typeof content.schoolYear === 'object' && content.schoolYear) || {};
const pad = (n) => String(n).padStart(2, '0');
const escape = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** The school's periods, keeping only entries the rules can use. */
export function periodsOf(content) {
  const raw = slot(content).PERIODS;
  if (!Array.isArray(raw)) return [];
  return raw.filter((p) =>
    p && typeof p === 'object' &&
    (typeof p.id === 'string' && p.id.length > 0) &&
    Array.isArray(p.months) && p.months.length > 0 &&
    p.months.every((m) => Number.isInteger(m) && m >= 1 && m <= 12)
  );
}

const usesCalendarYear = (p) => p.labelYear === 'calendar';

/** The month the school year turns over in. */
function turnoverMonth(periods) {
  return periods.length ? periods[0].months[0] : 1;
}

/** The school's first day as a fresh local-midnight Date, or null. */
export function schoolYearStart(content) {
  const v = slot(content).FIRST_DAY;
  if (v instanceof Date) {
    return Number.isNaN(v.getTime()) ? null : new Date(v.getFullYear(), v.getMonth(), v.getDate());
  }
  if (typeof v === 'string') {
    const m = v.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!m) return null;
    const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    return Number.isNaN(d.getTime()) ? null : d;
  }
  return null;
}

/** Has instruction begun? True when the school has not said when it begins. */
export function hasSchoolStarted(content, date = new Date()) {
  const start = schoolYearStart(content);
  if (!start) return true;
  return date.getTime() >= start.getTime();
}

/**
 * The period a month belongs to. A month outside every period belongs to the
 * most recent period before it, so a gap in a school's calendar reads as "still
 * the last period" rather than as no period at all.
 */
function periodForMonth(periods, month) {
  for (let back = 0; back < 12; back += 1) {
    const m = ((month - 1 - back + 120) % 12) + 1;
    const period = periods.find((p) => p.months.includes(m));
    if (period) return { period, month: m, back };
  }
  return null;
}

/** The calendar year a period month falls in, given the school year's start year. */
function calendarYearOf(periods, month, schoolYearStartYear) {
  return month >= turnoverMonth(periods) ? schoolYearStartYear : schoolYearStartYear + 1;
}

const NO_PERIOD = Object.freeze({ id: null, label: null, schoolYearLabel: null, batchLabel: null });

/** The period containing `date`: its id, label, school year and row label. */
export function currentPeriod(content, date = new Date()) {
  const periods = periodsOf(content);
  const month = date.getMonth() + 1;
  const found = periods.length ? periodForMonth(periods, month) : null;
  if (!found) return { ...NO_PERIOD };
  const { period } = found;
  const calendarYear = date.getFullYear();
  // Months from the turnover onward belong to the school year starting THIS
  // calendar year; months before it, to the one that started LAST year.
  const schoolYearStartYear = month >= turnoverMonth(periods) ? calendarYear : calendarYear - 1;
  const schoolYearLabel = `${schoolYearStartYear}-${schoolYearStartYear + 1}`;
  const periodYear = calendarYearOf(periods, found.month, schoolYearStartYear);
  const batchLabel = usesCalendarYear(period)
    ? `${period.id} ${periodYear}`
    : `${period.id} ${schoolYearLabel}`;
  return {
    id: period.id,
    label: typeof period.label === 'string' ? period.label : period.id,
    schoolYearLabel,
    batchLabel
  };
}

function idsPattern(periods) {
  // Longest first, so an id that is a prefix of another never wins by accident.
  return [...periods].sort((a, b) => b.id.length - a.id.length).map((p) => escape(p.id)).join('|');
}

/** True if a label is a school-year-span row label for one of this school's periods. */
export function isSpanLabel(content, batchLabel) {
  const periods = periodsOf(content).filter((p) => !usesCalendarYear(p));
  if (!periods.length) return false;
  return new RegExp(`^(?:${idsPattern(periods)}) \\d{4}-\\d{4}$`).test(batchLabel || '');
}

/** True if a label is a calendar-year row label for one of this school's periods. */
export function isCalendarYearLabel(content, batchLabel) {
  const periods = periodsOf(content).filter(usesCalendarYear);
  if (!periods.length) return false;
  return new RegExp(`^(?:${idsPattern(periods)}) \\d{4}$`).test(batchLabel || '');
}

/** True if a label names one of this school's periods in either format. */
export function isPeriodLabel(content, batchLabel) {
  return isSpanLabel(content, batchLabel) || isCalendarYearLabel(content, batchLabel);
}

/**
 * Rows grouped by period label, oldest-format rows under 'Earlier' and always
 * last. Pure: call it against reactively selected state, never through a store
 * getter, whose reference never changes and so never re-renders.
 */
export function groupByPeriod(content, rows) {
  const groups = {};
  for (const row of rows) {
    const key = isPeriodLabel(content, row.batchLabel) ? row.batchLabel : 'Earlier';
    groups[key] ??= [];
    groups[key].push(row);
  }
  return Object.entries(groups).sort(([a], [b]) => {
    if (a === 'Earlier') return 1;
    if (b === 'Earlier') return -1;
    return a.localeCompare(b);
  });
}

/** The period a label starts with (longest id wins), and its 1-based rank. */
function periodPrefixOf(periods, label) {
  let best = null;
  periods.forEach((p, i) => {
    if (label.startsWith(p.id) && (!best || p.id.length > best.period.id.length)) {
      best = { period: p, rank: i + 1 };
    }
  });
  return best;
}

/** Rank of a label's period within one year, first period = 1. Null if untagged. */
export function periodRank(content, label) {
  if (typeof label !== 'string') return null;
  const hit = periodPrefixOf(periodsOf(content), label);
  return hit ? hit.rank : null;
}

/** The period and year a full row label names, or null. */
function parseLabel(periods, label) {
  if (typeof label !== 'string') return null;
  const span = periods.filter((p) => !usesCalendarYear(p));
  if (span.length) {
    const m = label.match(new RegExp(`^(${idsPattern(span)}) (\\d{4})-\\d{4}$`));
    if (m) return { period: span.find((p) => p.id === m[1]), schoolYear: Number(m[2]) };
  }
  const cal = periods.filter(usesCalendarYear);
  if (cal.length) {
    const m = label.match(new RegExp(`^(${idsPattern(cal)}) (\\d{4})$`));
    if (m) {
      const period = cal.find((p) => p.id === m[1]);
      const inNextCalendarYear = period.months[0] < turnoverMonth(periods);
      return { period, schoolYear: Number(m[2]) - (inNextCalendarYear ? 1 : 0) };
    }
  }
  return null;
}

/** The school year a label belongs to, as its starting calendar year. */
export function periodSchoolYear(content, label) {
  const parsed = parseLabel(periodsOf(content), label);
  return parsed ? parsed.schoolYear : null;
}

/**
 * Rank of a label across YEARS, not just within one: a past year's work is
 * always open and a future year's never is.
 */
export function absolutePeriodRank(content, label) {
  const periods = periodsOf(content);
  const within = periodRank(content, label);
  if (within === null) return null;
  const year = periodSchoolYear(content, label);
  // A label with a period but no year — legacy rows — ranks in the current
  // year. See the header: the real now, on purpose.
  const resolvedYear = year ?? periodSchoolYear(content, currentPeriod(content).batchLabel) ?? 0;
  const perYear = Math.max(10, periods.length + 1);
  return resolvedYear * perYear + within;
}

/** First and last calendar day of the period containing `date`, as YYYY-MM-DD. */
export function periodDateRange(content, date = new Date()) {
  const periods = periodsOf(content);
  const found = periods.length ? periodForMonth(periods, date.getMonth() + 1) : null;
  if (!found) return null;
  const { period, back } = found;
  const index = period.months.indexOf(found.month);
  // Count in whole months from the matched month, so a period that runs across
  // December into January still starts and ends in the right calendar years.
  const y = date.getFullYear();
  const m0 = date.getMonth() - back;
  const first = new Date(y, m0 - index, 1);
  const last = new Date(y, m0 + (period.months.length - index), 0);
  const key = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  return { id: period.id, start: key(first), end: key(last) };
}

/** The first day of the period a label names, as YYYY-MM-DD, or null. */
export function periodOpensOn(content, label) {
  const periods = periodsOf(content);
  const parsed = parseLabel(periods, label);
  if (!parsed) return null;
  const firstMonth = parsed.period.months[0];
  const calendarYear = firstMonth >= turnoverMonth(periods) ? parsed.schoolYear : parsed.schoolYear + 1;
  return `${calendarYear}-${pad(firstMonth)}-01`;
}

/**
 * Is this label's period at or before the period containing `date`?
 *
 * "At or before", not "equals": a learner who is BEHIND still finishes an
 * earlier period's work. Only running ahead is prevented. Untagged work — a
 * browsable library — is never gated.
 */
export function isPeriodOpen(content, label, date = new Date()) {
  const lessonRank = absolutePeriodRank(content, label);
  if (lessonRank === null) return true;
  const currentRank = absolutePeriodRank(content, currentPeriod(content, date).batchLabel) ?? 0;
  return lessonRank <= currentRank;
}
