/**
 * ============================================================================
 * THE WATERING LOG — DOES IT KNOW WHETHER IT IS BEING KEPT?
 * ============================================================================
 *
 * ---- WHY THIS EXISTS (Aug 24, 2026) ----
 *
 * The parent, on the November build: **"The self watering buckets isnt until
 * Nov. What is he doing to prepare for that?"**
 *
 * The answer is in the briefs: twelve Friday sessions between the sun survey
 * and Build 2, and the through-line across all twelve is the watering log. The
 * Aug 28 brief starts it — *"One row per watering: zone and amount carried.
 * Every week from here to April."* The Sep 25 brief totals four weeks of it,
 * ranks the zones thirstiest-to-least, and **that ranking is what chooses the
 * zone Build 2 goes in.** The Q4 moisture-sensor capstone is named in August
 * for the same reason: eight months of rows are its only possible dataset.
 *
 * So the whole November build, and the whole April capstone, rest on a weekly
 * habit — and `GardenLogView` printed exactly one number about it: the total
 * amount of water carried. A total cannot tell you whether the habit is being
 * kept. Twelve rows in one week and nothing since reads identically to twelve
 * weeks in a row.
 *
 * That is the sun survey's fault again, one week later: the app asks for a
 * SUSTAINED MEASUREMENT and the screen never reports whether it is sustained.
 * Sixteenth instance this month of the app knowing and the screen not asking.
 *
 * ---- AND A SMALLER ONE FOUND ON THE WAY ----
 *
 * The "Water carried, all season" figure summed `data.amount` across every
 * watering row REGARDLESS OF UNIT — cups and gallons added together into one
 * meaningless number. A gallon is 16 cups. Totals are kept per unit here.
 *
 * Lives in lib/ for the same reason sunSurvey.js does: more than one screen
 * needs this answer, and this project has been bitten before by two components
 * deciding the same thing separately.
 */
import { toDateStr, addDays, startOfWeek, parseDateStr, todayDateStr } from './scheduler.js';

/** How many recent weeks the "N of the last M" signal looks back over. */
export const WEEKS_TRACKED = 4;

/** The Sep 25 brief totals four weeks of rows to rank the zones. */
export const WEEKS_NEEDED_FOR_ZONE_RANKING = 4;

/** Monday of the week containing a yyyy-mm-dd string, as a yyyy-mm-dd string. */
export function weekKeyOf(dateStr) {
  if (!dateStr) return null;
  return toDateStr(startOfWeek(parseDateStr(dateStr)));
}

/** 'Aug 24' — short enough for a four-across strip. */
function shortLabel(dateStr) {
  const d = parseDateStr(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/**
 * Everything the garden log and the build track need to know about whether the
 * watering habit is actually being kept.
 *
 * `streak` counts consecutive weeks backwards, and deliberately does NOT break
 * on an empty CURRENT week — it is Monday morning at some point every week, and
 * a streak that resets every Monday and rebuilds by Friday is noise, not a
 * signal. An empty current week simply is not counted yet.
 */
export function wateringStats(gardenLog = [], today = todayDateStr()) {
  const rows = (gardenLog || []).filter((r) => r?.kind === 'watering' && r?.date);
  const sorted = [...rows].sort((a, b) => a.date.localeCompare(b.date));

  /** weekKey -> { count, amountByUnit } */
  const byWeek = new Map();
  const totalsByUnit = {};
  /** zone -> { count, amountByUnit } — the Sep 25 thirstiest-zone ranking. */
  const byZone = {};

  for (const r of rows) {
    const key = weekKeyOf(r.date);
    if (!byWeek.has(key)) byWeek.set(key, { count: 0, amountByUnit: {} });
    const week = byWeek.get(key);
    week.count += 1;

    const amount = typeof r?.data?.amount === 'number' ? r.data.amount : null;
    const unit = r?.data?.unit || 'cups';
    if (amount !== null) {
      week.amountByUnit[unit] = (week.amountByUnit[unit] || 0) + amount;
      totalsByUnit[unit] = (totalsByUnit[unit] || 0) + amount;
    }

    const zone = r?.data?.zone || 'unspecified';
    if (!byZone[zone]) byZone[zone] = { count: 0, amountByUnit: {} };
    byZone[zone].count += 1;
    if (amount !== null) {
      byZone[zone].amountByUnit[unit] = (byZone[zone].amountByUnit[unit] || 0) + amount;
    }
  }

  // --- the last WEEKS_TRACKED weeks, oldest first, current week last ---
  const currentWeekKey = weekKeyOf(today);
  const weeks = [];
  for (let i = WEEKS_TRACKED - 1; i >= 0; i -= 1) {
    const start = toDateStr(addDays(parseDateStr(currentWeekKey), -7 * i));
    const found = byWeek.get(start);
    weeks.push({
      weekStart: start,
      label: shortLabel(start),
      isCurrent: i === 0,
      count: found?.count || 0,
      amountByUnit: found?.amountByUnit || {},
      logged: Boolean(found?.count)
    });
  }
  const weeksCovered = weeks.filter((w) => w.logged).length;

  // --- consecutive weeks back from now ---
  let streak = 0;
  let cursor = currentWeekKey;
  if (!byWeek.has(cursor)) cursor = toDateStr(addDays(parseDateStr(cursor), -7));
  while (byWeek.has(cursor)) {
    streak += 1;
    cursor = toDateStr(addDays(parseDateStr(cursor), -7));
  }

  const lastDate = sorted.length ? sorted[sorted.length - 1].date : null;
  const firstDate = sorted.length ? sorted[0].date : null;
  const daysSinceLast = lastDate
    ? Math.round((parseDateStr(today) - parseDateStr(lastDate)) / 86400000)
    : null;

  return {
    rows,
    totalRows: rows.length,
    totalsByUnit,
    byZone,
    weeks,
    weeksCovered,
    weeksTracked: WEEKS_TRACKED,
    weeksLoggedAllTime: byWeek.size,
    streak,
    firstDate,
    lastDate,
    daysSinceLast,
    /** True once four distinct weeks exist — the Sep 25 brief's precondition. */
    canRankZones: byWeek.size >= WEEKS_NEEDED_FOR_ZONE_RANKING,
    weeksUntilRanking: Math.max(0, WEEKS_NEEDED_FOR_ZONE_RANKING - byWeek.size)
  };
}

/** '12 cups · 2 gallons' — never one number across mixed units. */
export function formatAmounts(amountByUnit = {}) {
  const parts = Object.entries(amountByUnit)
    .filter(([, n]) => n > 0)
    .map(([unit, n]) => `${Math.round(n * 10) / 10} ${unit}`);
  return parts.length ? parts.join(' · ') : null;
}

/**
 * Thirstiest zone first — the ranking the Sep 25 brief asks him to produce, and
 * the thing that decides which zone Build 2 goes in.
 *
 * Ranks on cups-equivalent so a gallon does not sort below a cup. Rows with no
 * amount recorded still count toward the visit count but not the volume.
 */
const CUPS_PER = { cups: 1, gallons: 16, oz: 0.125 };
export function zonesByThirst(byZone = {}) {
  return Object.entries(byZone)
    .map(([zone, v]) => {
      const cups = Object.entries(v.amountByUnit).reduce(
        (n, [unit, amt]) => n + amt * (CUPS_PER[unit] ?? 0),
        0
      );
      return { zone, cups, count: v.count, amountByUnit: v.amountByUnit };
    })
    .sort((a, b) => b.cups - a.cups || b.count - a.count);
}
