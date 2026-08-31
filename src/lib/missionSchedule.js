/**
 * ===========================================================================
 * WHEN A QUARTERLY MISSION IS ACTUALLY DUE.
 * ===========================================================================
 *
 * The parent, Aug 29 2026: *"i would like thos to be scheduled for me."*
 *
 * ---- WHY IT WAS NEVER STARTED ----
 *
 * A mission row carries a QUARTER and no date at all. Not a due date, not a
 * start date. So the single heaviest assessment in the app — weighted like a
 * quarterly exam, and the thing that replaced IXL and every paid diagnostic —
 * appeared on no calendar, in no Coming Up panel, and in no weekly view.
 *
 * Five weeks into Q1, Q1's mission has not been begun. That is not neglect;
 * **nothing ever told her it was owed.**
 *
 * This is the third time in two days: field trips had real dates and reached no
 * calendar, Engineer Readiness had real awards and reached no record, and a
 * mission has a real deadline and reaches nothing. Same fault each time — the
 * app knew and the screen never said.
 *
 * ---- WHY A LEAD TIME AND NOT JUST A DEADLINE ----
 *
 * `scheduler.js` already learned this for book reports: *"a book report due Oct
 * 9 needs the book read by Sep 18. Until now every dated view showed only the
 * deadline, so a four-week project and a one-day worksheet looked identical
 * right up until the week it was due."*
 *
 * A mission is the extreme case. Every proposal states its own cost — "Two
 * Fridays, outdoors", "Three Fridays" — and a glider is not a weekend. The
 * start-by date is read from that sentence rather than guessed, so a
 * three-Friday mission starts three weeks earlier than a two-Friday one.
 */

import { isSchoolDay } from '../academies/lamar/data/schedule/schoolHolidays.js';

const PERIOD_MONTHS = {
  Q1: [8, 9, 10],
  Q2: [11, 12],
  Q3: [1, 2, 3],
  Q4: [4, 5],
  Summer: [6, 7]
};

function pad(n) {
  return String(n).padStart(2, '0');
}

/** Quarter id and school-year start from a batch label: 'Q2 2026-2027' -> ['Q2', 2026]. */
export function parseQuarterLabel(quarterLabel) {
  const str = String(quarterLabel == null ? '' : quarterLabel).trim();
  if (!str) return null;
  const id = str.startsWith('Summer') ? 'Summer' : str.split(' ')[0];
  if (!PERIOD_MONTHS[id]) return null;
  const yearPart = str.split(' ')[1] || '';
  const year = Number(String(yearPart).split('-')[0]);
  if (!Number.isFinite(year)) return null;
  return [id, year];
}

/** The last calendar day of a quarter. 'Q1 2026-2027' -> '2026-10-31'. */
export function quarterEndsOn(quarterLabel) {
  const parsed = parseQuarterLabel(quarterLabel);
  if (!parsed) return null;
  const [id, year] = parsed;
  const months = PERIOD_MONTHS[id];
  const lastMonth = months[months.length - 1];
  const calendarYear = months[0] >= 8 ? year : year + 1;
  // Day 0 of the following month is the last day of this one, leap years included.
  const last = new Date(calendarYear, lastMonth, 0);
  return `${last.getFullYear()}-${pad(last.getMonth() + 1)}-${pad(last.getDate())}`;
}

/**
 * How many weeks of work a proposal says it needs, read from its own words.
 *
 * Every proposal states this in prose — "Two Fridays, outdoors", "Three
 * Fridays", "Two to three Fridays". A range takes the LONGER end: running out
 * of time on a mission is worse than starting one a week early, and the whole
 * reason this exists is that Q1's has not been started at all.
 *
 * Falls back to three weeks for a mission she typed in herself, which is the
 * longest any built-in proposal claims.
 */
export function missionWeeks(timeEstimate) {
  const text = String(timeEstimate == null ? '' : timeEstimate).toLowerCase();
  const WORDS = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6 };
  const found = [];
  for (const [word, n] of Object.entries(WORDS)) {
    if (new RegExp('\\b' + word + '\\b').test(text)) found.push(n);
  }
  for (const m of text.matchAll(/\b(\d+)\b/g)) {
    const n = Number(m[1]);
    if (n >= 1 && n <= 12) found.push(n);
  }
  if (found.length === 0) return 3;
  return Math.max(...found);
}

function shiftDays(dateStr, delta) {
  const [y, m, d] = String(dateStr).split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setDate(dt.getDate() + delta);
  return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}`;
}

/**
 * Step back to the last Friday on or before a date that is a REAL SCHOOL DAY.
 *
 * The first version stopped at the nearest Friday and put Q2's mission on
 * **December 25th**. Q2's month range is Nov-Dec, its last Friday is Christmas,
 * and a deadline nobody can meet is worse than no deadline. It walks back
 * through the holiday calendar now — the same `isSchoolDay` attendance uses —
 * and gives up after eight weeks rather than looping forever on a bad range.
 */
export function fridayOnOrBefore(dateStr) {
  if (!dateStr) return null;
  const [y, m, d] = String(dateStr).split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  let cursor = shiftDays(dateStr, -((dt.getDay() - 5 + 7) % 7));
  for (let i = 0; i < 8; i++) {
    const [cy, cm, cd] = cursor.split('-').map(Number);
    if (isSchoolDay(new Date(cy, cm - 1, cd))) return cursor;
    cursor = shiftDays(cursor, -7);
  }
  return cursor;
}

/**
 * The dates a quarter's mission should carry.
 *
 * Due: the last Friday of the quarter — the deliverable is a build, and a
 * build lands on the day the work happens, not on a Sunday.
 *
 * Start by: that Friday minus one week per week of stated work. The mission is
 * "late to start" the moment today passes it, which is the signal that was
 * missing entirely.
 */
export function missionDates(quarterLabel, timeEstimate) {
  const endsOn = quarterEndsOn(quarterLabel);
  if (!endsOn) return null;
  /**
   * ---- A WEEK IS RESERVED FOR SCORING. ----
   *
   * Not a preference — a correctness rule. A mission only reaches the grade
   * once it is scored AND approved, and it counts toward the quarter it
   * belongs to. Due on the quarter's own last day leaves no room to do either,
   * so the heaviest assessment of the term would land after the term it grades.
   */
  const lastSchoolFriday = fridayOnOrBefore(endsOn);
  const dueDate = fridayOnOrBefore(shiftDays(lastSchoolFriday, -7));
  const weeks = missionWeeks(timeEstimate);
  return { dueDate, startBy: shiftDays(dueDate, -7 * weeks), weeks, scoreBy: lastSchoolFriday };
}

/**
 * Where a mission stands against today: 'done' | 'late-to-start' | 'start-now'
 * | 'ahead' | 'overdue'.
 *
 * `start-now` opens a two-week window before the start-by date, so the warning
 * arrives while there is still room to act rather than on the day it is
 * already too late — the fault this whole file exists to fix.
 */
export function missionTiming(quarterLabel, timeEstimate, status, today) {
  const dates = missionDates(quarterLabel, timeEstimate);
  if (!dates || !today) return null;
  const started = status && status !== 'proposed' && status !== 'accepted';
  const finished = status === 'completed' || status === 'scored' || status === 'approved';
  if (finished) return { ...dates, state: 'done' };
  if (today > dates.dueDate) return { ...dates, state: 'overdue' };
  if (started) return { ...dates, state: 'ahead' };
  if (today > dates.startBy) return { ...dates, state: 'late-to-start' };
  if (today > shiftDays(dates.startBy, -14)) return { ...dates, state: 'start-now' };
  return { ...dates, state: 'ahead' };
}

/** One sentence for the screen. Never a bare date — a date with no verb is not a prompt. */
export function missionTimingNote(timing) {
  if (!timing) return null;
  switch (timing.state) {
    case 'done':
      return null;
    case 'overdue':
      return `Past the quarter's deadline (${timing.dueDate}). Score what he did rather than losing the quarter's assessment.`;
    case 'late-to-start':
      return `Needs about ${timing.weeks} week${timing.weeks === 1 ? '' : 's'} and should already be underway — due ${timing.dueDate}.`;
    case 'start-now':
      return `Start it around ${timing.startBy}: it needs about ${timing.weeks} week${timing.weeks === 1 ? '' : 's'} before it is due ${timing.dueDate}.`;
    default:
      return `Due ${timing.dueDate}. Start by ${timing.startBy}.`;
  }
}

/**
 * ===========================================================================
 * THE CALENDAR ITEMS. One per quarter of the school year, row or no row.
 * ===========================================================================
 *
 * **A mission with no row still has a deadline.** That is the whole point: Q1's
 * mission was never begun, so there is nothing in `missionEvaluations` for it,
 * and anything keyed off existing rows would show her exactly nothing — which
 * is the situation she is already in.
 *
 * So the quarter list drives this, and a row only fills in detail: which
 * project she picked, how far along it is, whether it is finished.
 *
 * `startBy` and `leadStatus` match the shape `buildCalendarItems` already emits
 * for Academic Success Center work, so every dated view renders these without
 * learning anything new.
 */
export function missionCalendarItems({
  missionEvaluations = [],
  quarters = [],
  findProposal = () => null,
  today = null
} = {}) {
  const items = [];
  for (const quarter of quarters) {
    const row = missionEvaluations.find((m) => m.quarter === quarter) || null;
    const proposal = row?.projectId ? findProposal(row.projectId) : null;
    const timing = missionTiming(quarter, proposal?.timeEstimate, row?.status, today);
    const dates = timing || missionDates(quarter, proposal?.timeEstimate);
    if (!dates) continue;
    const title = row?.customTitle || proposal?.title || null;
    items.push({
      key: `mission::${quarter}`,
      // Named for what it IS when nothing has been chosen. "Quarterly Mission"
      // with no title is still a real thing she owes; a blank row is not.
      title: title ? `Quarterly Mission — ${title}` : `Quarterly Mission — ${quarter.split(' ')[0]} (not chosen yet)`,
      subject: null,
      typeLabel: 'Quarterly Mission',
      dueDate: dates.dueDate,
      startBy: dates.startBy,
      done: timing ? timing.state === 'done' : false,
      source: 'mission',
      quarter,
      missionState: timing?.state || null,
      leadStatus:
        timing?.state === 'late-to-start'
          ? 'late'
          : timing?.state === 'start-now'
            ? 'soon'
            : null,
      note: missionTimingNote(timing)
    });
  }
  return items;
}

/**
 * ===========================================================================
 * "HE HAS ALREADY BUILT THIS." (Aug 29, 2026.)
 * ===========================================================================
 *
 * The parent: *"the water bottle rocket was scheduled for him already or is
 * that a different one? ... make sure there aren't any duplicate projects
 * located elsewhere in the app."*
 *
 * Both, and she found a real one. The Q2 mission "Design and Launch a Water
 * Bottle Rocket" and the Aerospace hands-on project `ae7-bottle-rocket` are the
 * same build. He did the project in **week 2, Aug 14**, wrote it up in the
 * Writing Journal on Aug 16, and she graded it **C, 73%**.
 *
 * The mission is a genuinely harder version — launch angle AND water volume,
 * three launches per setting, a results table. Repeating a C with real method
 * is good teaching. But she was about to choose it in November with **nothing
 * on the screen saying he had built one before, or what it scored.**
 *
 * ---- MATCHED, NOT HARDCODED ----
 *
 * A sentence saying "he already did the bottle rocket" would be true today and
 * silently wrong the moment a project is renamed or a proposal is added. This
 * compares the proposal against the real project pools every time, so a future
 * overlap announces itself instead of waiting to be noticed by a parent.
 *
 * Deliberately NOT a block. It reports; she decides. An audit that removes the
 * option is worse than one that names the trade-off.
 */
const TITLE_STOPWORDS = new Set([
  'a', 'an', 'the', 'and', 'of', 'to', 'for', 'with', 'your', 'his',
  'build', 'building', 'design', 'designing', 'launch', 'make', 'test',
  'model', 'study', 'challenge', 'project', 'how', 'it', 'from', 'break'
]);

function titleWords(title) {
  return new Set(
    String(title == null ? '' : title)
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 2 && !TITLE_STOPWORDS.has(w))
  );
}

/**
 * Projects elsewhere in the app that cover the same build as this mission.
 *
 * `threshold` is the share of the SMALLER title's meaningful words that must
 * match. 0.5 catches "Water Bottle Rocket" against "Bottle Rocket" while
 * leaving "Mars Habitat Model" and "Mars Rover Model" apart — they share one
 * word out of two and three respectively.
 */
export function overlappingProjects(proposal, projectPools = [], { threshold = 0.6 } = {}) {
  const a = titleWords(proposal?.title);
  if (a.size === 0) return [];
  const out = [];
  for (const project of projectPools) {
    const b = titleWords(project?.title);
    if (b.size === 0) continue;
    const shared = [...a].filter((w) => b.has(w));
    const score = shared.length / Math.max(1, Math.min(a.size, b.size));
    if (score >= threshold) out.push({ project, shared, score });
  }
  return out.sort((x, y) => y.score - x.score);
}

/**
 * What to say about it, given what he has actually done.
 *
 * `completions` maps a project id to what happened: { completedAt, grade }.
 * A project he has NOT done is still worth naming — "this is also a scheduled
 * project" is useful before she picks a mission that duplicates one.
 */
export function overlapNotice(proposal, projectPools = [], completions = {}) {
  const hits = overlappingProjects(proposal, projectPools);
  if (hits.length === 0) return null;
  const { project } = hits[0];
  const done = completions[project.id];
  if (done && (done.completedAt || done.grade)) {
    const when = done.completedAt ? ` on ${String(done.completedAt).slice(0, 10)}` : '';
    const grade = done.grade ? `, graded ${done.grade}` : '';
    return {
      projectId: project.id,
      projectTitle: project.title,
      alreadyDone: true,
      text: `He has already built "${project.title}"${when}${grade}. This mission is a harder version of the same build — worth choosing deliberately, not by accident.`
    };
  }
  return {
    projectId: project.id,
    projectTitle: project.title,
    alreadyDone: false,
    text: `"${project.title}" is already a scheduled project in this curriculum. This mission covers the same build at greater depth.`
  };
}
