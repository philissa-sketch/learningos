/**
 * ============================================================================
 * THE SUN SURVEY — ONE PLACE THAT DECIDES WHAT THE READINGS MEAN.
 * ============================================================================
 *
 * ---- WHY THIS EXISTS (Aug 24, 2026) ----
 *
 * The parent, looking at the Build Track: **"The readings didn't move over to
 * the project. The directions are not clear either."**
 *
 * The readings HAD moved. All 32 of them — eight zones across four hours on
 * Aug 23, every one carrying a real condition. They were in the database, they
 * were in the export, they arrived on the deployed copy intact.
 *
 * What had not moved was the ANSWER. `BuildTrackView` already loads
 * `gardenLog` and already counts the readings, and then prints the sentence
 * "Direct-sun hours per zone — eight numbers that did not exist before" and
 * stops. It describes the eight numbers on a screen that is holding them.
 * Same fault as the rest of this month's audit: the app knew, and the screen
 * never asked.
 *
 * ---- AND A SECOND ONE, WHICH IS WORSE ----
 *
 * `SunSurveyView` reported "direct hours per day" as `directCount / daysSeen`.
 * That equivalence — one direct reading equals one hour of direct sun — is
 * only true if EVERY hour of the day was checked. He checked four (10, 11, 12
 * and 2) out of ten. So zone A1, which was in direct sun at every hour he
 * looked, reported "4.0 h/day" and was classified `marginal`, when the honest
 * statement is "4 direct out of 4 checked, day not finished".
 *
 * A partial day read as a whole one is not a rounding problem. It decides
 * where he puts a raised bed for a year.
 *
 * So: a day counts as a survey day only when all ten hourly checks exist, and
 * per-day figures are computed from complete days ONLY. An unfinished day is
 * still shown — it is real work — but it is labelled as unfinished rather than
 * averaged into a number that looks finished.
 *
 * Lives in lib/ because two screens need the same answer, and this project has
 * been bitten before by two components deciding the same thing separately.
 */

/** Two rows of four across a 4 ft x 8 ft floor. A is the row nearest the wall. */
export const SUN_ZONES = ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4'];

/** 9am to 6pm inclusive — the daylight window the survey samples. */
export const SUN_HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

/** A day is only a survey day when every one of these hours has been checked. */
export const CHECKS_PER_DAY = SUN_HOURS.length;

/** How many complete days the project asks for before the numbers are trusted. */
export const SURVEY_DAYS_WANTED = 2;

export const SUN_CONDITIONS = [
  { id: 'direct', label: 'Direct', hint: 'Sun falling straight on it' },
  { id: 'bright', label: 'Bright shade', hint: 'No direct sun, but bright' },
  { id: 'full', label: 'Full shade', hint: 'Dark' }
];

/** '10 am', '12 noon', '2 pm'. */
export function sunHourLabel(h) {
  if (h === 12) return '12 noon';
  return h < 12 ? `${h} am` : `${h - 12} pm`;
}

/**
 * Everything both screens need, computed once.
 *
 * `hoursPerDay` is null until at least one day is complete — that is the
 * point. A number that cannot honestly be produced is not produced.
 */
export function sunSurveyStats(gardenLog = [], today = null) {
  const readings = (gardenLog || []).filter((r) => r?.kind === 'sun-reading');

  /** date -> Set of hours checked that date. */
  const hoursByDate = new Map();
  for (const r of readings) {
    const date = r?.date;
    const hour = r?.data?.hour;
    if (!date || !Number.isFinite(hour)) continue;
    if (!hoursByDate.has(date)) hoursByDate.set(date, new Set());
    hoursByDate.get(date).add(hour);
  }

  const completeDates = new Set(
    [...hoursByDate.entries()].filter(([, hours]) => hours.size >= CHECKS_PER_DAY).map(([date]) => date)
  );

  const zones = {};
  for (const zone of SUN_ZONES) {
    zones[zone] = { direct: 0, bright: 0, full: 0, checked: 0, directOnCompleteDays: 0, hoursPerDay: null };
  }
  for (const r of readings) {
    const zone = r?.data?.zone;
    const condition = r?.data?.condition;
    const entry = zones[zone];
    if (!entry) continue;
    if (entry[condition] !== undefined) entry[condition] += 1;
    entry.checked += 1;
    if (condition === 'direct' && completeDates.has(r.date)) entry.directOnCompleteDays += 1;
  }
  for (const zone of SUN_ZONES) {
    const entry = zones[zone];
    entry.hoursPerDay = completeDates.size > 0 ? entry.directOnCompleteDays / completeDates.size : null;
  }

  const hoursCheckedToday = today ? (hoursByDate.get(today)?.size ?? 0) : 0;

  return {
    readings,
    totalReadings: readings.length,
    daysStarted: hoursByDate.size,
    completeDays: completeDates.size,
    completeDates,
    hoursByDate,
    hoursCheckedToday,
    checksLeftToday: Math.max(0, CHECKS_PER_DAY - hoursCheckedToday),
    hasTrustworthyNumbers: completeDates.size > 0,
    zones
  };
}

/**
 * What a zone is good for, from its direct-sun hours per day.
 *
 * Returns `null` for `hoursPerDay` when no day is complete, and the caller is
 * expected to say so rather than print a class it cannot stand behind. The
 * thresholds are the standard growing ones: 6+ hours fruits, 4+ greens, 2+ is
 * marginal, below that is storage or shade-tolerant only.
 */
export function zoneClass(hoursPerDay) {
  if (hoursPerDay === null || hoursPerDay === undefined) {
    return { label: 'finish a full day to classify', tone: 'text-ink-500', known: false };
  }
  if (hoursPerDay >= 6) return { label: 'fruiting — tomatoes, peppers, squash', tone: 'text-signal-green', known: true };
  if (hoursPerDay >= 4) return { label: 'greens — lettuce, kale, herbs', tone: 'text-signal-cyan', known: true };
  if (hoursPerDay >= 2) return { label: 'marginal — leafy greens only', tone: 'text-signal-amber', known: true };
  return { label: 'too dark to grow — storage or staging', tone: 'text-ink-500', known: true };
}
