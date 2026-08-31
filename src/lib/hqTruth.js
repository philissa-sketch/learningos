/**
 * =============================================================================
 * WHAT THE ROOM KNOWS ABOUT HIM.
 * =============================================================================
 *
 * ---- WHY THIS FILE EXISTS (Phase 3, Aug 29, 2026) ----
 *
 * Eight objects in the HQ stop being decoration here. The award wall shows the
 * badges he was actually given, the telescope grows a star for every aerospace
 * lesson he masters, the aquarium a fish for every five days he practised
 * typing. From the build spec: *the only phase with meaning behind it —
 * everything else is decoration.*
 *
 * It is a separate file, in plain JavaScript, for the same reason `hqGeometry`
 * is: **a guard has to be able to run it.** The room's arithmetic lived inside
 * a .jsx file once before, and the cost was a boy standing 82px left of his own
 * desk through three rounds of complaints, because nothing in forty test suites
 * could execute the expression that put him there. Selectors that decide what a
 * twelve-year-old is told about his own record should be harder to get wrong
 * than that, not easier.
 *
 * ---- THE RULE THAT GOVERNS ALL OF IT ----
 *
 * **If a source is empty, the object shows its empty state — never a zero,
 * never a fake.** "No badges yet" is true; a grey trophy is a lie. This is the
 * rule `participationRecord.js` and `compliancePacket.js` already enforce for
 * the compliance packet, and it matters more here, not less: the packet is read
 * by an adult who knows what a placeholder looks like, and this room is read by
 * the child whose record it is.
 *
 * So every function below returns a count that is honestly zero when nothing
 * has happened, and the drawing decides what zero looks like. None of them ever
 * substitutes a sample, a demo value, or a rounded-up encouragement.
 *
 * ---- AND IT READS ONLY ----
 *
 * Nothing in this file writes. Not a grade, not a date, not an attendance
 * record, not a Georgia hour. Every function is pure: data in, a small display
 * object out. A room that could change his record by being looked at would be a
 * room worth more than it costs, and this one is not.
 * =============================================================================
 */

/**
 * The caps, in one place, because the DRAWINGS have a fixed number of slots and
 * the selectors must not hand back more things than there is room to draw.
 *
 * These are not arbitrary. Each is the number of positions that exist in that
 * object's artwork — four shoot slots in the grow box, six vial slots on the
 * bench — so a cap here and a cap there cannot drift apart into a count that
 * renders as nothing.
 */
export const HQ_CAPS = {
  /** Badges the award frame can hold. */
  awards: 3,
  /** Patches on the board — one per quarter, and there are four quarters. */
  patches: 4,
  /** Shoots the grow box has room for. */
  shoots: 4,
  /** Vials in the bench rack. */
  vials: 6,
  /** Fish the tank can hold without looking like a fish shop. */
  fish: 8,
  /** Days of typing practice that earn one fish. */
  daysPerFish: 5
};

/* ------------------------------------------------------------------------- *
 * AWARD DISPLAY — the badges actually earned.
 * ------------------------------------------------------------------------- */

/**
 * A skill counts as awarded when it has a LEVEL, which is the same test
 * `compliancePacket.js` line 402 applies: `readinessAwards[skill.id]?.level`.
 * Deliberately the same expression rather than a second opinion about what
 * "awarded" means — two definitions of an award is how a child ends up with a
 * badge on one screen and not on another.
 */
export function awardsEarned(readinessAwards = {}, skills = []) {
  const earned = skills.filter((s) => readinessAwards?.[s.id]?.level);
  return {
    count: earned.length,
    total: skills.length,
    shown: Math.min(earned.length, HQ_CAPS.awards),
    names: earned.slice(0, HQ_CAPS.awards).map((s) => s.name),
    /** True only when he has been given something. Drives the empty state. */
    any: earned.length > 0
  };
}

/* ------------------------------------------------------------------------- *
 * PATCH WALL — one patch per quarter completed.
 * ------------------------------------------------------------------------- */

/**
 * ---- WHAT "A QUARTER COMPLETED" MEANS, AND WHY IT IS NOT WHAT THE PLANNER
 *      MEANS (decided Aug 29, 2026) ----
 *
 * `buildYearPlan` already marks a quarter `status: 'complete'`, and it would
 * have been one line to use it. But that status is computed purely from the
 * calendar — `today > span.end` — so it says the quarter's DATES have passed.
 * A patch awarded on that basis is a badge for time going by, handed to a boy
 * who may not have opened the app once inside it.
 *
 * The build spec's whole claim for this phase is that the room tells the truth,
 * and "you were alive in October" is not an achievement. So a patch needs the
 * quarter to be over AND to have something real in it — a day logged, or a
 * lesson mastered.
 *
 * This is deliberately STRICTER than the planner, and that is a second
 * definition of quarter completion living in the codebase, which is a thing
 * this project has been bitten by. It is named differently on purpose —
 * `quartersEarned`, not `quartersComplete` — and it is only ever used to decide
 * what to draw on a wall. **No record, report card, transcript or compliance
 * document reads this function.** If that ever stops being true, this comment
 * is the warning.
 */
export function quartersEarned(yearPlan = []) {
  const earned = yearPlan.filter(
    (q) => q.status === 'complete' && ((q.daysLogged || 0) > 0 || (q.mastered || 0) > 0)
  );
  return {
    count: Math.min(earned.length, HQ_CAPS.patches),
    total: yearPlan.length || HQ_CAPS.patches,
    labels: earned.slice(0, HQ_CAPS.patches).map((q) => q.batchLabel || q.label || ''),
    any: earned.length > 0
  };
}

/* ------------------------------------------------------------------------- *
 * HOLOGRAPHIC DISPLAY — real numbers, live.
 * ------------------------------------------------------------------------- */

/**
 * The one object that shows figures as figures. `any` is false only on a
 * genuinely untouched account: rank tier 1 is real from the first day, so the
 * display is not blank just because he has not earned anything yet — it says
 * Junior Engineer, 0 XP, which is true and is the thing he is standing at the
 * bottom of.
 *
 * A zero here is NOT the fake the empty-state rule forbids. The rule forbids
 * inventing a value where there is no fact; "0 XP" is a fact.
 */
export function holoReadout({ xp = 0, rank = null, streak = 0 } = {}) {
  return {
    rankName: rank?.name || 'Junior Engineer',
    tier: rank?.tier || 1,
    xp: Math.max(0, Math.round(xp || 0)),
    streak: Math.max(0, Math.round(streak || 0)),
    any: true
  };
}

/* ------------------------------------------------------------------------- *
 * TELESCOPE — one star per mastered aerospace lesson.
 * ------------------------------------------------------------------------- */

/**
 * The constellation fills over the year. 54 aerospace lessons exist, so a fully
 * mastered year is a full sky, and today it is empty — which is the point of
 * drawing it at all.
 */
export function masteredStars(lessonProgress = {}, allLessons = [], subject = 'aerospace') {
  const lessons = allLessons.filter((l) => l.subject === subject);
  const mastered = lessons.filter((l) => lessonProgress?.[l.id]?.mastered);
  return {
    count: mastered.length,
    total: lessons.length,
    any: mastered.length > 0
  };
}

/**
 * WHERE THE STARS GO.
 *
 * Deterministic, so the same number of mastered lessons always draws the same
 * sky — a constellation that reshuffled on every render would be decoration, not
 * a record of anything, and he would notice.
 *
 * A hash rather than a stored table: 54 hard-coded coordinate pairs is 54 more
 * things to keep in agreement with a lesson count that has already grown twice
 * (287 → 331 → 356). This grows with the curriculum on its own.
 */
export function starField(n, w = 128, h = 84) {
  const out = [];
  for (let i = 0; i < n; i += 1) {
    // Two cheap independent hashes of the index. Golden-ratio and √2
    // multipliers keep successive points from lining up into visible rows.
    const a = (i + 1) * 0.6180339887498949;
    const b = (i + 1) * 0.4142135623730951;
    out.push({
      x: Math.round(((a % 1) * w - w / 2) * 100) / 100,
      y: Math.round(((b % 1) * h - h) * 100) / 100,
      r: 1 + ((i * 7) % 3) * 0.45
    });
  }
  return out;
}

/* ------------------------------------------------------------------------- *
 * MISSION COMPUTER — the last thing he finished, on the screen.
 * ------------------------------------------------------------------------- */

/**
 * Most recent by `lastCompletedDate`. Returns null when he has finished
 * nothing, and the screen then shows a waiting prompt rather than a blank
 * rectangle or an invented lesson title.
 */
export function lastFinished(lessonProgress = {}, allLessons = []) {
  let best = null;
  for (const [lessonId, row] of Object.entries(lessonProgress || {})) {
    const date = row?.lastCompletedDate;
    if (!date) continue;
    if (!best || String(date) > String(best.date)) best = { lessonId, date: String(date) };
  }
  if (!best) return null;
  const lesson = allLessons.find((l) => l.id === best.lessonId) || null;
  return {
    title: lesson?.title || best.lessonId,
    subject: lesson?.subject || '',
    date: best.date,
    mastered: Boolean(lessonProgress[best.lessonId]?.mastered)
  };
}

/* ------------------------------------------------------------------------- *
 * GROW BOX — what the garden log actually records.
 * ------------------------------------------------------------------------- */

/**
 * ---- THE SPEC SAID "WHAT IS PLANTED RIGHT NOW". THE LOG DOES NOT KNOW THAT.
 *      (decided Aug 29, 2026) ----
 *
 * The build spec asks the grow box to show what is planted. `gardenLog` cannot
 * answer it: a row is `{ kind: 'session', briefId, title, date }` and a
 * sun-reading row, and nothing else. The `planting` and `watering` kinds that
 * appear in `gardenBriefs.js` are descriptions of ROWS THE BRIEF ASKS HIM TO
 * WRITE DOWN on paper — they have never been a shape the app stores.
 *
 * Two options, and only one of them is honest. Inventing a planting list, or
 * parsing crop names out of free-text notes, would put plants in his grow box
 * that the app has no evidence for — a fake, which is the exact thing the empty
 * state rule exists to prevent, dressed up as a feature.
 *
 * So the grow box shows **one shoot per day worked in the garden**, capped at
 * the four slots the drawing has. That is a true statement about a real log.
 * If a planting record is ever added, this function is the one place that has
 * to change.
 */
export function growBoxShoots(gardenLog = []) {
  const sessions = (gardenLog || []).filter((r) => r?.kind === 'session');
  const days = new Set(sessions.map((r) => String(r.date || '').slice(0, 10)).filter(Boolean));
  return {
    count: Math.min(days.size, HQ_CAPS.shoots),
    days: days.size,
    any: days.size > 0
  };
}

/* ------------------------------------------------------------------------- *
 * LABORATORY BENCH — filled flasks are science units done.
 * ------------------------------------------------------------------------- */

/**
 * Graded means graded: a `grade` AND a `gradedAt`, which is the test every
 * other screen in this app applies to a Khan row (see `MorningMeeting.jsx`
 * line 311, `FeedbackFromMomCard.jsx`). A unit he finished but that she has not
 * marked is not a filled flask, because the bench is showing checked work.
 */
export function benchFlasks(khanAcademyAssignments = [], subject = 'science') {
  const graded = (khanAcademyAssignments || []).filter(
    (k) => k?.subject === subject && k?.grade && k?.gradedAt
  );
  return {
    count: Math.min(graded.length, HQ_CAPS.vials),
    graded: graded.length,
    cap: HQ_CAPS.vials,
    any: graded.length > 0
  };
}

/* ------------------------------------------------------------------------- *
 * AQUARIUM — one fish per five days practised.
 * ------------------------------------------------------------------------- */

/**
 * DAYS, not sessions. Five entries in one afternoon is one day of practice, and
 * counting them as five would hand him a tank full of fish for a single sitting
 * — an encouragement that stops meaning anything the second he works out how it
 * is counted. He will work it out.
 */
export function aquariumFish(typingLog = []) {
  const days = new Set(
    (typingLog || []).map((r) => String(r?.date || '').slice(0, 10)).filter(Boolean)
  );
  const earned = Math.floor(days.size / HQ_CAPS.daysPerFish);
  return {
    count: Math.min(earned, HQ_CAPS.fish),
    days: days.size,
    /** How many more days until the next fish. Zero when the tank is full. */
    toNext: earned >= HQ_CAPS.fish ? 0 : HQ_CAPS.daysPerFish - (days.size % HQ_CAPS.daysPerFish),
    any: earned > 0
  };
}

/**
 * Where the fish swim. Deterministic like the stars, and inset from the glass
 * so a fish is never drawn half outside its own tank.
 */
export function fishField(n) {
  const lanes = [
    { x: -26, y: -56 }, { x: 16, y: -66 }, { x: -6, y: -44 },
    { x: 30, y: -50 }, { x: -34, y: -70 }, { x: 4, y: -76 },
    { x: 24, y: -38 }, { x: -18, y: -36 }
  ];
  return lanes.slice(0, Math.max(0, Math.min(n, lanes.length)));
}
