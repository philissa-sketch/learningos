/**
 * =============================================================================
 * WHO HAS ARRIVED, AND WHERE THEY ARE STANDING.
 * =============================================================================
 *
 * Phase 4, Aug 30, 2026. Plain JavaScript, no React, nothing that needs a
 * browser — the same reason `hqGeometry.js` and `hqTruth.js` are plain: a guard
 * has to be able to run it. Whether a twelve-year-old has earned a crew member
 * is exactly the kind of arithmetic that must not live where no suite can
 * execute it.
 *
 * ---- READ-ONLY, WITH ONE EXCEPTION THAT IS NOT HERE ----
 *
 * Nothing in this file writes. Arrival is DERIVED from his record every time it
 * is asked — never stored, never stamped, never awarded. That matters: a stored
 * "you have the Flight Engineer" flag would be a second opinion about his
 * schoolwork, and the two would eventually disagree.
 *
 * The one thing that IS stored is where he chose to post them, and that lives
 * in the store next to `hqLayout`, for the same reason: it is his arrangement
 * of his own room, not a record of anything.
 * =============================================================================
 */

import { projectFloor, depth, BACK, VB } from './hqGeometry.js';
import { academyContent } from '../content/academyContent.js';

const { HQ_CREW = [] } = academyContent().rewards;

/**
 * HAS THIS CREW MEMBER ARRIVED?
 *
 * `arrival` is a declarative record, so this is a small switch rather than a
 * function per crew member. A new arrival KIND is a deliberate addition here;
 * a new crew member using an existing kind is one row of data.
 *
 * Anything unrecognised returns FALSE. An unknown rule must never hand out a
 * crew member by accident — the failure mode has to be "he does not have it
 * yet", never "here, have it".
 */
export function hasArrived(crew, sources = {}) {
  const a = crew?.arrival;
  if (!a) return false;
  switch (a.kind) {
    case 'lessonsMastered': {
      const { lessonProgress = {}, allLessons = [] } = sources;
      const mastered = allLessons.filter(
        (l) => l.subject === a.subject && lessonProgress?.[l.id]?.mastered
      ).length;
      return mastered >= a.count;
    }
    case 'khanUnitsGraded': {
      const { khanAcademyAssignments = [] } = sources;
      const graded = khanAcademyAssignments.filter(
        (k) => k?.subject === a.subject && k?.grade && k?.gradedAt
      ).length;
      return graded >= a.count;
    }
    case 'gardenSessions': {
      const { gardenLog = [] } = sources;
      const days = new Set(
        gardenLog.filter((r) => r?.kind === 'session')
          .map((r) => String(r.date || '').slice(0, 10)).filter(Boolean)
      );
      return days.size >= a.count;
    }
    default:
      return false;
  }
}

/**
 * How far along he is toward earning them, for the panel.
 *
 * Shown ONLY for crew that have not arrived, and it is a real count against a
 * real threshold — "4 of 10 Aerospace lessons mastered". Not a percentage bar
 * with nothing behind it.
 */
export function arrivalProgress(crew, sources = {}) {
  const a = crew?.arrival;
  if (!a) return null;
  let have = 0;
  if (a.kind === 'lessonsMastered') {
    const { lessonProgress = {}, allLessons = [] } = sources;
    have = allLessons.filter((l) => l.subject === a.subject && lessonProgress?.[l.id]?.mastered).length;
  } else if (a.kind === 'khanUnitsGraded') {
    const { khanAcademyAssignments = [] } = sources;
    have = khanAcademyAssignments.filter((k) => k?.subject === a.subject && k?.grade && k?.gradedAt).length;
  } else if (a.kind === 'gardenSessions') {
    const { gardenLog = [] } = sources;
    have = new Set(gardenLog.filter((r) => r?.kind === 'session')
      .map((r) => String(r.date || '').slice(0, 10)).filter(Boolean)).size;
  } else {
    return null;
  }
  return { have: Math.min(have, a.count), need: a.count, kind: a.kind, subject: a.subject || null };
}

/**
 * WHERE A CREW MEMBER IS POSTED.
 *
 * Three rules, in this order, and the order is the whole logic:
 *
 *   1. A post he chose wins — but only if he still OWNS that station. Selling
 *      or never having bought the piece cannot leave someone standing at an
 *      outline.
 *   2. Otherwise the default post, again only if owned.
 *   3. Otherwise null — they have arrived but are not posted, and the room
 *      draws them at the muster point rather than pretending.
 */
export function postFor(crew, { posts = {}, owned = new Set() } = {}) {
  const chosen = posts?.[crew.id];
  if (chosen && owned.has(chosen)) return chosen;
  if (chosen) return null; // he chose a station he no longer owns
  if (crew.defaultPost && owned.has(crew.defaultPost)) return crew.defaultPost;
  return null;
}

/**
 * The whole roster, resolved against his record and his choices.
 *
 * Returns every crew member, arrived or not, because the panel needs to show
 * what is still to come — but `arrived: false` carries no post and the ROOM
 * never draws them. What the panel says and what the room draws are two
 * different questions, and only the panel may talk about a crew member he has
 * not earned.
 */
export function crewRoster(sources = {}, { posts = {}, owned = new Set() } = {}) {
  return HQ_CREW.map((crew) => {
    const arrived = hasArrived(crew, sources);
    return {
      ...crew,
      arrived,
      progress: arrived ? null : arrivalProgress(crew, sources),
      post: arrived ? postFor(crew, { posts, owned }) : null
    };
  });
}

/**
 * ONE CREW MEMBER PER STATION.
 *
 * This is what makes assignment a choice rather than a formality — with no
 * limit he would eventually post everybody everywhere and the decision would
 * stop meaning anything.
 *
 * Returns the crew id already holding a station, or null. The store checks this
 * before writing, so a second assignment moves the first out rather than
 * silently stacking two people on one desk.
 */
export function occupantOf(stationId, roster = []) {
  const held = roster.find((c) => c.arrived && c.post === stationId);
  return held ? held.id : null;
}

/**
 * WHERE A POSTED CREW MEMBER STANDS — NOT WHERE HE STANDS.
 *
 * ---- WHY THIS IS NOT THE STATION'S OWN OFFSET (Aug 30, 2026) ----
 *
 * The first render posted the Flight Engineer at the workstation using the
 * station's `du/dv` — the same offset the cadet uses — and the frame showed
 * exactly what that means: **the engineer stood in front of the Mission
 * Computer with his back to it, covering the screen.**
 *
 * That offset answers "where do I stand to USE this", and it is correct for
 * that. A crew member is not using it for a minute; they are posted there all
 * day. Standing in the user's spot means permanently occupying the place he
 * walks to, and permanently hiding whatever the piece displays — which for the
 * Mission Computer is the entire point of Phase 3.
 *
 * So a crew member takes the OTHER side: the offset mirrored across the piece,
 * and pushed a little further out. That reads the way a colleague at a bench
 * reads — working the far side, leaving the near side for him.
 *
 * Clamped, because a mirrored offset near the edge of the floor would put
 * somebody in a wall, which is the Aug 16 Task Lamp fault wearing a new hat.
 */
/**
 * ---- AND HOW FAR OFF DEPENDS ON THE PIECE (Aug 30, 2026) ----
 *
 * This was a flat `-station.du - 0.04`, which happened to land correctly beside
 * the Engineering Workstation and was verified there. The Crew Console arrived
 * — a narrower piece, foot 62 against the workstation's 96 — and the frame
 * showed the engineer standing **50px clear of it with his arms out**, reaching
 * for a console that was not under his hands.
 *
 * A fixed offset cannot serve two pieces of different widths, and there are
 * seventeen more of them. So the standoff is measured from the piece's own
 * FOOTPRINT — the half-width Phase 0 already records for every object — plus a
 * small gap in pixels. Stand just off the edge of whatever you are posted to.
 *
 * The workstation lands at almost exactly where it was hand-verified before
 * (−0.0856 against the old −0.085), which is the check that this generalisation
 * did not quietly move the one case that was known good.
 */
export const CREW_STANDOFF_PX = 12;

export function crewSpotFor(station, base, foot = 0) {
  if (!station || !base) return null;
  if (station.du === undefined) return { u: station.u, v: station.v, stance: station.stance };

  // The floor's width in screen pixels at the depth this piece stands, so a
  // footprint measured in the piece's own units can be turned into a u offset.
  const p = projectFloor(base.u, base.v);
  const xLeft = BACK.x1 * (1 - base.v);
  const xRight = BACK.x2 + (VB.w - BACK.x2) * base.v;
  const floorWidth = xRight - xLeft;
  const halfU = floorWidth > 0 ? (foot * depth(p.y) + CREW_STANDOFF_PX) / floorWidth : 0.04;

  return {
    u: Math.min(0.97, Math.max(0.03, base.u - halfU)),
    v: Math.min(0.95, Math.max(0.04, base.v + station.dv)),
    stance: station.stance
  };
}

/**
 * WHERE ANY FIGURE STANDS AT ANY STATION — the one implementation.
 *
 * ---- WHY THIS IS NOT TWO FUNCTIONS (Aug 30, 2026) ----
 *
 * Phase 2 needs to ask "if this figure went there, where would they be?" in
 * two places: the room, to keep roamers from overlapping, and the guard, to
 * prove they cannot. The first version answered it twice — the room had its
 * own copy and `verify-hq-room.mjs` reimplemented the same arithmetic to check
 * it — and the mutation suite showed exactly what that is worth: breaking the
 * room's copy left the suite green, because the guard was marking its own
 * homework against a second copy that still agreed with itself.
 *
 * That is the "two copies of a projection" drift this project has already
 * shipped twice. One function. The room calls it, the guard calls it, and
 * breaking it goes red.
 *
 * The cadet takes the NEAR side of a piece — the spot you stand in to use it.
 * A crew member takes the FAR side, because they are posted there all day and
 * the near side is his. For a wall piece there is only one place to stand, so
 * the crew offset collapses to the same absolute spot.
 */
export function standingSpotFor(figureId, station, base, foot = 0) {
  if (!station) return null;
  const isCadet = figureId === 'cadet';
  if (station.du === undefined) {
    const at = { u: station.u, v: station.v };
    return isCadet ? { ...at, stance: station.stance } : crewSpotFor(station, at, 0);
  }
  if (!base) return null;
  if (!isCadet) return crewSpotFor(station, base, foot);
  return {
    u: Math.min(0.97, Math.max(0.03, base.u + station.du)),
    v: Math.min(0.95, Math.max(0.04, base.v + station.dv)),
    stance: station.stance
  };
}

/** Stations he owns that nobody is posted to. What the panel offers. */
export function openStations(stationIds = [], roster = [], owned = new Set()) {
  return stationIds.filter((id) => owned.has(id) && !occupantOf(id, roster));
}
