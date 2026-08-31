// ---------------------------------------------------------------------------
// Gardening — Q1 Friday calendar (Aug 14 - Oct 30 2026).
//
// TWELVE Fridays fall in this window and only EIGHT carry a brief. The four
// open ones are not gaps to be filled later — they are the design's own answer
// to "a brief lesson every Friday," which was revised because some Fridays are
// field trips and some weeks the garden genuinely needs nothing. A lesson that
// exists because it is Friday rather than because the garden needs it is
// padding, which this project refuses everywhere else.
//
// An open Friday still carries a `suggestion`, because "open" should not read
// as "nothing here." Tending, catch-up, and a field trip are real recorded
// school activity — and Friday counts toward Georgia's 180 days as long as
// real activity is recorded on it (see data/schedule/weekPattern.js).
//
// WHY THIS FILE IS SEPARATE from gardenBriefs.js: the briefs are content and
// the calendar is scheduling. Q2 will add dates without touching a single word
// of Q1's teaching, and a field trip landing on Oct 16 changes this file only.
//
// DATE FORMAT is 'YYYY-MM-DD' and every date is parsed at local noon
// ('T12:00:00') wherever it is compared, never at bare midnight — a bare
// 'YYYY-MM-DD' is parsed as UTC by JS and lands on the PREVIOUS day for anyone
// west of Greenwich, which would have silently shifted every Friday here to a
// Thursday in America/New_York. scripts/verify-gardening.mjs asserts all twelve
// resolve to day 5.
// ---------------------------------------------------------------------------

export const GARDEN_Q1_START = '2026-08-14';
export const GARDEN_Q1_END = '2026-10-30';
export const GARDEN_Q2_START = '2026-11-06';
export const GARDEN_Q2_END = '2026-12-25';
export const GARDEN_Q3_START = '2027-01-01';
export const GARDEN_Q3_END = '2027-03-26';
export const GARDEN_Q4_START = '2027-04-02';
export const GARDEN_Q4_END = '2027-05-28';
export const GARDEN_SUMMER_START = '2027-06-04';
export const GARDEN_SUMMER_END = '2027-07-30';

/**
 * CLOSED Fridays. A Friday the school is not open is NOT the same thing as an
 * open Friday with nothing scheduled, and collapsing the two would be a lie in
 * two directions: it would make a holiday look like a garden day he skipped,
 * and it would leave an unexplained gap in a calendar whose Fridays are
 * otherwise exactly seven days apart.
 *
 * Only closures that are certain are marked here. Clayton County's spring break
 * and any teacher days are NOT guessed at — those Fridays stay `open`, which
 * already absorbs a break without the content pretending to know the district
 * calendar.
 */


export const gardenCalendar = [
  { date: '2026-08-14', quarter: 'Q1 2026-2027', briefId: 'gd7-q1-b1-changeover', suggestion: null },
  { date: '2026-08-21', quarter: 'Q1 2026-2027', briefId: 'gd7-q1-b2-reading-the-survey', suggestion: null },
  { date: '2026-08-28', quarter: 'Q1 2026-2027', briefId: 'gd7-q1-b3-water', suggestion: null },
  { date: '2026-09-04', quarter: 'Q1 2026-2027', briefId: 'gd7-q1-b4-second-window', suggestion: null },
  {
    date: '2026-09-11',
    quarter: 'Q1 2026-2027',
    briefId: null,
    suggestion:
      'Open Friday. Water, weed, and check on the second-window transplants — the first two weeks after planting are when they are most likely to fail. Log what you see.'
  },
  { date: '2026-09-18', quarter: 'Q1 2026-2027', briefId: 'gd7-q1-b5-ph', suggestion: null },
  { date: '2026-09-25', quarter: 'Q1 2026-2027', briefId: 'gd7-q1-b6-nasa-water', suggestion: null },
  {
    date: '2026-10-02',
    quarter: 'Q1 2026-2027',
    briefId: null,
    suggestion:
      'Open Friday. A good week for a field trip — a farmers market, a community garden, or a garden centre to price out what build 2 will need. Or simply catch up on anything unfinished from Mon-Thu.'
  },
  { date: '2026-10-09', quarter: 'Q1 2026-2027', briefId: 'gd7-q1-b7-succession', suggestion: null },
  {
    date: '2026-10-16',
    quarter: 'Q1 2026-2027',
    briefId: null,
    suggestion:
      'Open Friday. Second radish batch goes in around now if you followed the succession plan — that reminder was the whole technique. Otherwise tend and log.'
  },
  { date: '2026-10-23', quarter: 'Q1 2026-2027', briefId: 'gd7-q1-b8-harvest-and-zinnia', suggestion: null },
  {
    date: '2026-10-30',
    quarter: 'Q1 2026-2027',
    briefId: null,
    suggestion:
      'Open Friday, and the last of Q1. Read back through the whole garden log — the sun map, the watering totals, the pH numbers, the harvest. What does the garden do now that it did not do in August? Answer that in the Journal if you want it on the record.'
  }
,

  // ---- Q2 · Building & Creating (Nov-Dec 2026) --------------------------
  // 8 Fridays, 2 of them closed, 4 carrying a brief. Light on purpose — the
  // design said "light in Nov when the work is planning and soil tests," and
  // UGA's C943 calendar independently says the same for Nov-Dec.
  { date: '2026-11-06', quarter: 'Q2 2026-2027', briefId: 'gd7-q2-b1-frost', suggestion: null },
  { date: '2026-11-13', quarter: 'Q2 2026-2027', briefId: 'gd7-q2-b2-build-self-watering', suggestion: null },
  {
    date: '2026-11-20',
    quarter: 'Q2 2026-2027',
    briefId: null,
    suggestion:
      'Open Friday. The three buckets from last week need watching, not managing — check them, log every watering separately, and resist improving the plain one. Good week for a frost cover trial run if a cold night is forecast.'
  },
  {
    // WAS CLOSED AS "Thanksgiving break — school is out." UNTIL AUG 9 2026.
    // That was the district's calendar, not this family's. The parent, in her
    // own words: "we dont celebrate christmas and thanksgiving" and "we will
    // take the actual holiday off for rest but not the weeks." Thanksgiving
    // DAY — Thursday Nov 26 — is off and is in schoolHolidays.js. This Friday
    // is an ordinary school day and an ordinary garden Friday, and closing it
    // was costing a real one.
    date: '2026-11-27',
    quarter: 'Q2 2026-2027',
    briefId: null,
    suggestion:
      'Open Friday. First hard-frost window for north Georgia — check the covers, mulch anything still in the ground, and write down what survived the first cold snap and what did not.'
  },
  { date: '2026-12-04', quarter: 'Q2 2026-2027', briefId: 'gd7-q2-b3-comparison', suggestion: null },
  {
    date: '2026-12-11',
    quarter: 'Q2 2026-2027',
    briefId: null,
    suggestion:
      'Open Friday. Keep the watering log running through the cold, and start pulling seed catalogues or a seed list together for the winter audit next week.'
  },
  { date: '2026-12-18', quarter: 'Q2 2026-2027', briefId: 'gd7-q2-b4-winter-audit', suggestion: null },
  {
    date: '2026-12-25',
    quarter: 'Q2 2026-2027',
    briefId: null,
    closed: true,
    closedReason: 'Christmas Day — school is out.',
    suggestion: null
  }
,

  // ---- Q3 · Innovation (Jan-Mar 2027) -----------------------------------
  // 13 Fridays, 1 closed, 6 carrying a brief. The heaviest build quarter of
  // the year — the rack and the trellis rebuild both land here. Six open
  // Fridays, and several of them carry real planting work: north Georgia's
  // cool-season spring window opens in February, which falls between briefs.
  {
    date: '2027-01-01',
    quarter: 'Q3 2026-2027',
    briefId: null,
    closed: true,
    closedReason: "New Year's Day — school is out.",
    suggestion: null
  },
  { date: '2027-01-08', quarter: 'Q3 2026-2027', briefId: 'gd7-q3-b1-paper-season', suggestion: null },
  {
    date: '2027-01-15',
    quarter: 'Q3 2026-2027',
    briefId: null,
    suggestion:
      'Open Friday. Order anything the spring plan needs that has not arrived, and get seed trays and containers cleaned and ready. Dull work that makes next week possible.'
  },
  { date: '2027-01-22', quarter: 'Q3 2026-2027', briefId: 'gd7-q3-b2-seed-starting', suggestion: null },
  {
    date: '2027-01-29',
    quarter: 'Q3 2026-2027',
    briefId: null,
    suggestion:
      'Open Friday. Check the seedlings daily this week and log stocky or stretched — a tray moved two feet toward better light shows a difference within days. Fastest feedback loop in the subject.'
  },
  { date: '2027-02-05', quarter: 'Q3 2026-2027', briefId: 'gd7-q3-b3-build-vertical', suggestion: null },
  {
    date: '2027-02-12',
    quarter: 'Q3 2026-2027',
    briefId: null,
    suggestion:
      'Open Friday, and a real one: the north Georgia cool-season window is open now. Cabbage, carrots, lettuce, mustard, peas, potatoes, radishes, spinach and turnips can go in — UGA chart dates plus about two weeks. Log every planting.'
  },
  {
    date: '2027-02-19',
    quarter: 'Q3 2026-2027',
    briefId: null,
    suggestion:
      'Open Friday. Finish the cool-season planting and keep the rack loaded and watched. If anything on the bottom tier is leaning toward the open edge, note it — next week you measure why.'
  },
  { date: '2027-02-26', quarter: 'Q3 2026-2027', briefId: 'gd7-q3-b4-bottom-shelf', suggestion: null },
  {
    date: '2027-03-05',
    quarter: 'Q3 2026-2027',
    briefId: null,
    suggestion:
      'Open Friday. Second plantings of the quick-maturing crops — succession, the free way to get more out of the same square feet. Collards and broccoli windows are open now too.'
  },
  { date: '2027-03-12', quarter: 'Q3 2026-2027', briefId: 'gd7-q3-b5-build-trellis', suggestion: null },
  {
    date: '2027-03-19',
    quarter: 'Q3 2026-2027',
    briefId: null,
    suggestion:
      'Open Friday. Harden off the indoor seedlings — a few hours outside a day, building up — so they are not going straight from a windowsill into April weather. And keep a frost cover within reach.'
  },
  { date: '2027-03-26', quarter: 'Q3 2026-2027', briefId: 'gd7-q3-b6-spring-windows', suggestion: null }
,

  // ---- Q4 · Leadership & Life (Apr-May 2027) ----------------------------
  // 9 Fridays, 1 closed, 4 carrying a brief. Build-dominated — the writing
  // load lives in the projects, which is why the brief count drops while the
  // work does not. May 28 falls after the last day of school (May 26).
  //
  // APR 2 IS THE SPRING BREAK FRIDAY. Mar 29 - Apr 2 was ruled a rest week on
  // Aug 9 2026, so no academic work is scheduled against it — but the garden
  // does not stop needing attention for a week, which is why this Friday still
  // carries a suggestion rather than being marked closed.
  {
    date: '2027-04-02',
    quarter: 'Q4 2026-2027',
    briefId: null,
    suggestion:
      'Open Friday, spring break week — no lessons, but the seedlings still need you. Keep hardening them off a little longer each day and have the frost cover where you can reach it: the average last frost has passed, but a late one still happens.'
  },
  { date: '2027-04-09', quarter: 'Q4 2026-2027', briefId: 'gd7-q4-b1-warm-season', suggestion: null },
  {
    date: '2027-04-16',
    quarter: 'Q4 2026-2027',
    briefId: null,
    suggestion:
      'Open Friday. Finish the warm-season planting and watch the transplants closely for their first week — that is when a hardening-off shortcut shows up. Keep logging every watering.'
  },
  { date: '2027-04-23', quarter: 'Q4 2026-2027', briefId: 'gd7-q4-b2-build-irrigation', suggestion: null },
  {
    date: '2027-04-30',
    quarter: 'Q4 2026-2027',
    briefId: null,
    suggestion:
      'Open Friday. Let the irrigation run and watch for leaks, kinks and clogged emitters. Check the far bucket by feel a few inches down, not by looking at the surface.'
  },
  { date: '2027-05-07', quarter: 'Q4 2026-2027', briefId: 'gd7-q4-b3-irrigation-results', suggestion: null },
  {
    date: '2027-05-14',
    quarter: 'Q4 2026-2027',
    briefId: null,
    suggestion:
      'Open Friday. Build and test the sensor circuit in Tinkercad before next week, so the capstone Friday is spent on calibration rather than on debugging a circuit.'
  },
  { date: '2027-05-21', quarter: 'Q4 2026-2027', briefId: 'gd7-q4-b4-capstone', suggestion: null },
  // This calendar has said since it was built that the year ends May 26, and on
  // Aug 9 2026 QUARTER_SPANS was corrected to agree with it. May 28 is the
  // Friday after the last day of school.
  {
    date: '2027-05-28',
    quarter: 'Q4 2026-2027',
    briefId: null,
    closed: true,
    closedReason: 'After the last day of school (May 26, 2027) — the school year has ended.',
    suggestion: null
  }
,

  // ---- Summer 2027 (Jun-Jul) --------------------------------------------
  // 9 Fridays, 3 carrying a brief, none closed — Independence Day 2027 falls
  // on a Sunday. The lightest period of the year on purpose: Summer already
  // runs at 3 school days a week, and July in Georgia is survival rather than
  // planting. The garden, however, needs the MOST water it will need all year,
  // which is why several open Fridays here are about keeping things alive.
  { date: '2027-06-04', quarter: 'Summer 2027', briefId: 'gd7-su-b1-sensor-report', suggestion: null },
  {
    date: '2027-06-11',
    quarter: 'Summer 2027',
    briefId: null,
    suggestion:
      'Open Friday. Heat is the test everything you built this year was made for. Watch the top tier — highest, most exposed, dries fastest — and let the sensor and your own judgement keep disagreeing so you learn which to trust when.'
  },
  {
    date: '2027-06-18',
    quarter: 'Summer 2027',
    briefId: null,
    suggestion:
      'Open Friday. Harvest properly: cut-and-come-again on the leafy crops, whole-plant on the rest. A crop picked the wrong way ends a bucket a month early.'
  },
  {
    date: '2027-06-25',
    quarter: 'Summer 2027',
    briefId: null,
    suggestion:
      'Open Friday. Check the irrigation for clogged emitters and algae in the line, and re-run the one-minute cup test if anything looks uneven. Systems drift, and you have the baseline to prove it.'
  },
  { date: '2027-07-02', quarter: 'Summer 2027', briefId: 'gd7-su-b2-highest-sun', suggestion: null },
  {
    date: '2027-07-09',
    quarter: 'Summer 2027',
    briefId: null,
    suggestion:
      'Open Friday. Finish the second sun survey if clouds interrupted it — a cloudy day is not bad data, it is no data, so take the extra day rather than a shaky number.'
  },
  {
    date: '2027-07-16',
    quarter: 'Summer 2027',
    briefId: null,
    suggestion:
      'Open Friday. UGA says plant fall crops by mid-July for the longest-season ones. Start anything that needs a head start, and keep everything alive — this is the hardest stretch of the year for a container garden.'
  },
  { date: '2027-07-23', quarter: 'Summer 2027', briefId: 'gd7-su-b3-round-two', suggestion: null },
  {
    date: '2027-07-30',
    quarter: 'Summer 2027',
    briefId: null,
    suggestion:
      'Open Friday, and the last of the year. Finish the changeover so the buckets are ready before the August 15 window. Then read the two sun maps side by side one more time — that is what a year of Fridays bought.'
  }
];

/** Local-noon parse, so a date string never slides to the previous day. */
function atNoon(dateStr) {
  return new Date(dateStr + 'T12:00:00');
}

/** 'YYYY-MM-DD' for a Date, in LOCAL time. */
function toKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** The calendar entry for an exact date, or null. */
export function getGardenDayForDate(date = new Date()) {
  return gardenCalendar.find((d) => d.date === toKey(date)) || null;
}

/**
 * The garden day for the school week containing `date` — the Friday entry,
 * whichever day of that week you ask on. Monday through Sunday of the same
 * calendar week resolve to that week's Friday, so the Dashboard can show
 * "this Friday in the garden" on a Wednesday.
 */
export function getGardenDayForWeekOf(date = new Date()) {
  const d = new Date(date);
  d.setHours(12, 0, 0, 0);
  // getDay(): 0=Sun..6=Sat. Walk forward to Friday; Saturday looks back one day.
  const shift = d.getDay() === 6 ? -1 : 5 - d.getDay();
  d.setDate(d.getDate() + shift);
  return getGardenDayForDate(d);
}

/** The next OPEN garden day on or after `date`, brief-carrying or open. */
export function getNextGardenDay(date = new Date()) {
  const key = toKey(date);
  return gardenCalendar.find((d) => d.date >= key && !d.closed) || null;
}

/** True when school is closed that Friday — not a garden day he skipped. */
export function isClosedGardenDay(day) {
  return Boolean(day && day.closed);
}

/** Every calendar entry that actually carries a brief. */
export function getScheduledBriefDays() {
  return gardenCalendar.filter((d) => d.briefId);
}
