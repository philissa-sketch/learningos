// ---------------------------------------------------------------------------
// THE HOURS LEDGER — Georgia's home study record.
//
// Gigi, backlog §4.1: "Where are the hours counted for the Georgia standards?
// There is no hours ledger anywhere in the app. For a homeschool record in
// Georgia this is not optional."
//
// ---- WHAT THE LAW ACTUALLY SAYS ----
//
// Looked up rather than remembered, because it is a legal figure and being
// roughly right about one of those is worse than saying you do not know.
// O.C.G.A. § 20-2-690, as summarised by HSLDA and the Georgia Home Education
// Association (both fetched Aug 16 2026):
//
//   · the equivalent of 180 days of education a year
//   · each school day at least FOUR AND A HALF hours
//   · covering reading, language arts, mathematics, social studies and science
//   · an annual progress report per required subject, kept three years
//   · attendance is NO LONGER REPORTED to the state — it is kept privately
//   · a Declaration of Intent filed yearly with the Georgia DOE
//   · standardised testing at least every three years from the end of 3rd grade
//
// The last two are Gigi's paperwork, not the app's. What the app can do is keep
// the private record honestly, and that is what this file is for.
//
// ---- WHAT THIS COUNTS, AND WHAT IT CANNOT ----
//
// It counts the minutes of schedule blocks she TICKED OFF, per day and per
// subject, from the same data the garden grows on — one source, not a second
// count that could drift from the first.
//
// It cannot count a nature walk, a trip to the library, or an afternoon in the
// garden that nobody ticked. The screen has to say that out loud, because a
// ledger that quietly under-reports is worse than no ledger: it would have Gigi
// believe she is behind a legal requirement she has actually met.
// ---------------------------------------------------------------------------

/** Georgia's requirement, as fetched Aug 16 2026. Sources in the header. */
export const GEORGIA = {
  daysPerYear: 180,
  minutesPerDay: 270, // four and a half hours
  get hoursPerDay() {
    return this.minutesPerDay / 60;
  },
  get hoursPerYear() {
    return (this.daysPerYear * this.minutesPerDay) / 60;
  },
  /** The five the statute names. Mapped to this app's subject ids. */
  requiredSubjects: [
    { statute: 'Reading', subjects: ['reading'] },
    { statute: 'Language arts', subjects: ['writing'] },
    { statute: 'Mathematics', subjects: ['math'] },
    { statute: 'Social studies', subjects: ['social'] },
    { statute: 'Science', subjects: ['science', 'herbalism'] }
  ]
};

/** Minutes a block is worth. A block with no subject is a break and counts nothing. */
function minutesOf(block) {
  return block && block.subject ? Number(block.minutes) || 0 : 0;
}

/**
 * One row per day she did anything, newest last.
 *
 * `metRequirement` is the honest per-day flag: Georgia asks for four and a half
 * hours on a school day, so a day of two ticked blocks is a real day of school
 * and is NOT a qualifying day, and the ledger says both things rather than
 * rounding one into the other.
 */
export function dailyLedger({ scheduleDays = {}, blocks = [] } = {}) {
  const byId = new Map(blocks.map((b) => [b.id, b]));
  const rows = [];
  for (const [dayKey, day] of Object.entries(scheduleDays || {})) {
    const done = Object.keys(day?.done || {}).filter((id) => day.done[id]);
    if (done.length === 0) continue;
    let minutes = 0;
    const subjects = {};
    for (const id of done) {
      const block = byId.get(id);
      const m = minutesOf(block);
      if (!m) continue;
      minutes += m;
      subjects[block.subject] = (subjects[block.subject] || 0) + m;
    }
    // A day on which only BREAKS were ticked is not a day of school. Lunch and
    // Stretch & Reset carry no subject and therefore no minutes, and a row with
    // zero minutes would still inflate the day count on a LEGAL record — and
    // would put the ledger out of step with the garden, which counts subject
    // blocks only. Found by the negative test for this file, not by reasoning.
    if (minutes === 0) continue;
    rows.push({
      dayKey,
      minutes,
      subjects,
      blocksTicked: done.length,
      metRequirement: minutes >= GEORGIA.minutesPerDay
    });
  }
  rows.sort((a, b) => (a.dayKey < b.dayKey ? -1 : 1));
  return rows;
}

/** Totals for the whole record, plus per subject. */
export function hoursSummary({ scheduleDays = {}, blocks = [] } = {}) {
  const rows = dailyLedger({ scheduleDays, blocks });
  const perSubject = {};
  let minutes = 0;
  for (const row of rows) {
    minutes += row.minutes;
    for (const [sub, m] of Object.entries(row.subjects)) {
      perSubject[sub] = (perSubject[sub] || 0) + m;
    }
  }
  const daysMet = rows.filter((r) => r.metRequirement).length;

  return {
    daysWithWork: rows.length,
    daysMeetingRequirement: daysMet,
    daysRemaining: Math.max(0, GEORGIA.daysPerYear - daysMet),
    minutes,
    hours: minutes / 60,
    hoursRemaining: Math.max(0, GEORGIA.hoursPerYear - minutes / 60),
    perSubject,
    /** Statute subject → hours, so the annual progress report can be written
     *  against the five the law actually names rather than the app's own list. */
    perStatuteSubject: GEORGIA.requiredSubjects.map((r) => ({
      statute: r.statute,
      hours: r.subjects.reduce((a, s) => a + (perSubject[s] || 0), 0) / 60,
      from: r.subjects
    })),
    rows
  };
}

/**
 * A subject the statute names that has NO hours against it yet.
 *
 * This is the part of the ledger that does work rather than just reporting. An
 * annual progress report has to cover all five, and the useful moment to find
 * out that Social Studies has nothing in it is October, not June.
 */
export function subjectsWithNoHours(summary) {
  return summary.perStatuteSubject.filter((s) => s.hours <= 0).map((s) => s.statute);
}
