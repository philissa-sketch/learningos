// ---------------------------------------------------------------------------
// Weekly schedule for the Writing Journal's 31 total items (9 skill
// prompts, 5 project/journal prompts, 3 hands-on Aerospace projects, 13
// hands-on Science experiments) — closes the real gap the parent found:
// none of this had any date logic before, so nothing ever told the student
// what to do this week on their own dashboard. Confirmed the school year's
// real start date directly from schoolQuarter.js's own header comment
// (Aug 3, 2026, verified against the real Clayton County Public Schools
// calendar) rather than assuming one.
//
// Q1 (weeks 1-9) sequencing reasoning (matches the parent's own "scope and
// sequence" principle — foundations before complex tasks): starts with a
// simple foundational skill (Paragraph Writing), pairs each hands-on
// Aerospace project with a thematically-matching documentation prompt in
// the same week (Bottle Rocket -> Mission Report, Parachute Drop ->
// Scientific Observation, Wind Tunnel -> Lab Report), and saves the more
// demanding skill types (Research Paper, Persuasive Writing, Presentation
// Skills) for later weeks.
//
// Q2-Summer (weeks 10-42) extends the same pattern using the 13
// previously-unused scienceExperiments.js hands-on projects, several of
// which already had a `relatedLessonId` cross-link into a specific
// Aerospace lesson from earlier curriculum work — those are scheduled in
// the same quarter as their matching lesson: Bridge Building ->
// Aircraft Design (Q2), Satellite Model -> Satellites (Q3), Mars Rover
// Model -> Mars Missions (Q3), Drone Concepts -> Drones (Q4), Egg Drop ->
// Engineering Design Process (Q4). The 3 Q1-tagged experiments (Paper
// Airplane, Balloon Rocket, Rubber Band Airplane) didn't get a Q1 slot the
// first time through, so they open Q2 as review/reinforcement of already-
// taught concepts rather than sitting unused all year. The remaining
// general-purpose experiments (Baking Soda & Vinegar, Homemade Compass,
// Solar Oven, Marble Roller Coaster, Catapult) are placed where they fit
// thematically even without a formal cross-link — Solar Oven specifically
// lands in Summer to echo that quarter's Reentry & Heat Shields lesson.
//
// Every skill prompt (w7-*, category 'skill') can be redone up to 6 times
// total before its topicPool of alternate variations repeats (confirmed
// via WritingPromptEngine.jsx's own cycling logic — this schedule doesn't
// need to track which specific variation shows, only which week the id is
// due); several reuses below were deliberately chosen because a specific
// topicPool variation is a strong thematic match for that quarter (e.g.
// the Lab Report topicPool's "bridge design" variation lands the same
// week as the Bridge Building experiment; "a country's space program"
// lands during NASA/Moon Missions in Q3). Project prompts (category
// 'project') are recurring journal entries with no reuse limit — every
// submission is kept as a real journal over time.
//
// Q2 gets 9 weeks (10-18), Q3 gets 9 weeks (19-27), and Q4 gets 9 weeks
// (28-36), matching Q1's own 9-week pace rather than trying to fill every
// raw calendar week (Q1 didn't either — weeks 10-12 were always left open
// as quarter-end buffer/review time before the Quarterly Exam, and that
// same buffer pattern repeats at the end of Q2-Q4 here). Summer gets only
// 6 weeks (37-42), deliberately lighter, matching the real 3-day/week
// summer pace confirmed in schoolQuarter.js rather than the regular
// school year's 5-day/week pace.
// ---------------------------------------------------------------------------

import { SCHOOL_YEAR_START_DATE } from '../../../../lib/schoolQuarter.js';

export const SCHOOL_YEAR_START = SCHOOL_YEAR_START_DATE; // kept as an alias so existing imports of this name still work

/** Returns the school week number (1-based) for a given date, relative to
 * the confirmed real school year start date. Returns 0 if the date is
 * before the school year has started. */
export function getSchoolWeekNumber(date = new Date()) {
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  const diff = date.getTime() - SCHOOL_YEAR_START.getTime();
  if (diff < 0) return 0;
  return Math.floor(diff / msPerWeek) + 1;
}

// Week number -> array of prompt/project ids due that week. IDs match
// writingPrompts.js (w7-*) and aerospaceProjects.js (ae7-*) exactly.
export const weeklyWritingSchedule = {
  // ---- Q1 2026-2027 (weeks 1-9): Flight Fundamentals ----
  1: ['w7-paragraph'],
  2: ['ae7-bottle-rocket', 'w7-mission-report'],
  3: ['w7-essay'],
  4: ['ae7-parachute-drop', 'w7-scientific-observation'],
  5: ['w7-creative-writing'],
  6: ['ae7-wind-tunnel', 'w7-lab-report'],
  7: ['w7-technical-writing', 'w7-engineering-journal'],
  8: ['w7-research-paper', 'w7-design-documentation'],
  9: ['w7-persuasive-writing', 'w7-presentation-skills', 'w7-space-journal', 'w7-engineering-notebook'],

  // ---- Q2 2026-2027 (weeks 10-18): Structures & Propulsion ----
  10: ['sci7-paper-airplane', 'w7-lab-report'],
  11: ['sci7-balloon-rocket', 'w7-mission-report'],
  12: ['sci7-rubber-band-airplane', 'w7-engineering-journal', 'tech7-tinkercad-nameplate'],  // tech7-cad, Q1 lesson 20 of 22
  13: ['sci7-bridge-building', 'w7-lab-report', 'tech7-tinkercad-low-poly'],  // tech7-3d-modeling, Q1 lesson 21 of 22
  14: ['sci7-catapult', 'w7-technical-writing'],
  15: ['sci7-marble-roller-coaster', 'w7-scientific-observation'],
  16: ['sci7-baking-soda-vinegar', 'w7-space-journal'],
  17: ['w7-essay', 'w7-design-documentation'],
  18: ['w7-persuasive-writing', 'w7-engineering-notebook'],

  // ---- Q3 2026-2027 (weeks 19-27): Orbits & Missions ----
  19: ['sci7-satellite-model', 'w7-lab-report', 'tech7-tinkercad-parametric-shelf'],  // tech7-cad-2, Q2 lesson 8 of 10
  20: ['sci7-mars-rover-model', 'w7-mission-report', 'tech7-tinkercad-light-and-material'],  // tech7-3d-modeling-2, Q2 lesson 9 of 10
  21: ['sci7-homemade-compass', 'w7-scientific-observation'],
  22: ['w7-research-paper', 'w7-space-journal'],
  23: ['w7-creative-writing', 'w7-engineering-notebook'],
  24: ['w7-presentation-skills', 'w7-design-documentation'],
  25: ['w7-technical-writing', 'w7-mission-report'],
  26: ['w7-essay', 'w7-scientific-observation'],
  27: ['w7-persuasive-writing', 'w7-space-journal'],

  // ---- Q4 2026-2027 (weeks 28-36): Innovation & Design ----
  28: ['sci7-drone-concepts', 'w7-lab-report'],
  29: ['sci7-egg-drop', 'w7-engineering-journal'],
  30: ['w7-technical-writing', 'w7-mission-report'],
  31: ['w7-research-paper', 'w7-design-documentation'],
  32: ['w7-persuasive-writing', 'w7-scientific-observation'],
  33: ['w7-presentation-skills', 'w7-space-journal'],
  34: ['w7-creative-writing', 'w7-engineering-notebook'],
  35: ['w7-essay', 'w7-mission-report', 'rb7-project-first-reading'],  // rb7-sensors, Q4 lesson 1 of 8
  36: ['w7-paragraph', 'w7-design-documentation', 'rb7-project-threshold'],  // rb7-sensors-2, Q4 lesson 2 of 8

  // ---- Summer 2027 (weeks 37-42): Survival & Profession — lighter,
  // 3-day/week pace, so only 6 weeks scheduled instead of 9. ----
  37: ['sci7-solar-oven', 'w7-lab-report', 'rb7-project-motor-servo'],  // rb7-actuators, Q4 lesson 3 of 8
  38: ['w7-technical-writing', 'w7-mission-report', 'rb7-project-setup-loop'],  // rb7-microcontrollers, Q4 lesson 4 of 8
  39: ['w7-persuasive-writing', 'w7-scientific-observation', 'rb7-project-button-decision'],  // rb7-programming, Q4 lesson 5 of 8
  40: ['w7-presentation-skills', 'w7-engineering-notebook'],
  41: ['w7-essay', 'w7-design-documentation', 'rb7-project-line-follower'],  // rb7-feedback, Q4 lesson 7 of 8
  42: ['w7-research-paper', 'w7-space-journal'],
  /**
   * WEEK 43 IS THE LAST WEEK OF SCHOOL, AND IT WAS EMPTY. (Aug 23, 2026.)
   *
   * The schedule ran 1-42 while the year runs to week 43 (last day
   * 2027-05-26, Mon-Wed only). `ThisWeeksProjectCard` printed "Nothing
   * scheduled for this week yet" on the final week of the school year, and
   * MissionControlDashboard produced no Writing Journal row for it.
   *
   * A three-day week gets one piece, not two, and the engineering notebook is
   * the right one to end on: it asks him to look back over the year's build
   * log rather than start something he cannot finish by Wednesday.
   */
  43: ['w7-engineering-notebook']
};

/** Returns the array of prompt/project ids scheduled for the CURRENT
 * school week, or an empty array if this week isn't scheduled yet (e.g.
 * before the school year starts, or past week 9 until Q2+ get scheduled). */
export function getThisWeeksScheduledIds(date = new Date()) {
  const week = getSchoolWeekNumber(date);
  return weeklyWritingSchedule[week] || [];
}
