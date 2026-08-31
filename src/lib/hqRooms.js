/**
 * =============================================================================
 * WHICH ROOM A THING IS IN.
 * =============================================================================
 *
 * Phase 5 groundwork, Aug 30, 2026. The written version of this is
 * `docs/hq-room-model.md`; this is the executable one, and where the two
 * disagree this file is right, because this is the one a guard can run.
 *
 * Plain JavaScript. No React, no store import, nothing that needs a browser —
 * the same reason `hqGeometry.js`, `hqTruth.js`, `hqCrew.js` and `hqWander.js`
 * are plain. "Which rooms does he have" is exactly the kind of question that
 * must not live where no suite can execute it.
 *
 * ---- WHAT A ROOM IS ----
 *
 * A set of piece ids and a name. That is all of it.
 *
 * Every room is the same box: `hqGeometry.js` unchanged — same `VB`, same
 * `BACK`, same `depth`, same `projectFloor`. There is no second projection and
 * there will not be one. Two copies of a projection is the drift this project
 * has already shipped twice, and it is the reason `standingSpotFor` was moved
 * into `hqCrew.js` where the room and the guard could both call the one copy.
 *
 * Because every room shares one coordinate system and every piece belongs to
 * exactly ONE room, a piece's stored `(u, v)` in `hqLayout` is already
 * unambiguous. **Splitting the room into four needs no migration and loses no
 * arrangement he has made.** That is not a lucky accident to be relied on
 * quietly — `verify-hq-room.mjs` asserts the partition, so the day somebody
 * puts a piece in two rooms the suite says so instead of the layout silently
 * meaning two different places.
 *
 * ---- NO TIERS ----
 *
 * Spec v2 section 11 has a level-2/level-3 upgrade table. Its own addendum,
 * dated later, says "no tiers", and the parent restated it. The addendum wins.
 * Nothing here has a level, and nothing downstream should add one.
 * =============================================================================
 */

import { HQ_ITEMS } from '../academies/lamar/data/rewardCatalog.js';
import { BACK } from './hqGeometry.js';

/**
 * THE HUB.
 *
 * Mission Control is always present, even when he owns nothing at all. It is
 * the room he opens into, the room unposted crew muster in, and the room every
 * other room's door leads back to. A boy with no furniture still has somewhere
 * to stand.
 */
export const HOME_ROOM = 'mission-control';

/**
 * THE BACK WALL'S OWN COORDINATES, AS A FRACTION ACROSS IT.
 *
 * The back wall is flat, so anything hung on it takes `x` like `hq-holo` does
 * rather than a floor `(u, v)`. Kept because the guard measures the back wall's
 * furniture against the door, and both should read one conversion.
 */
export function backWallX(u) {
  return BACK.x1 + u * (BACK.x2 - BACK.x1);
}

/** Door leaf size, in room units. */
export const DOOR = { w: 72, h: 168 };

/**
 * ONE DOOR, IN THE SAME PLACE IN EVERY ROOM. RIGHT WALL, AT THE FRONT.
 *
 * ---- THREE DESIGNS, AND THE TWO THE PICTURE KILLED (Aug 30, 2026) ----
 *
 * **One door per destination.** Mission Control would carry three, spaced along
 * the back wall. Measured before it was drawn and it does not fit: the back
 * wall is x 430..1170 with the window at x 700..900, and the floor spot in
 * front of each door has to clear `WANDER_MIN_GAP_PX` (90px) from the muster
 * point and from every standing spot in the room. Searching every position in
 * both bands, the best three doors that exist come out **78px apart** — twelve
 * pixels short, which is two people standing inside each other.
 *
 * That was the right thing to drop rather than shave, because v1 section 6
 * already says what to build: *"A door on the back wall; a room switcher"* — a
 * door, singular, and a switcher that says where it goes. A door in a fixed
 * place is also a thing he learns once, where three doors whose count changes
 * as he buys furniture is a wall that rearranges itself.
 *
 * **One door on the back wall, at u 0.86.** Cleared every standing spot in
 * every room by at least 117px, cleared the window, and passed every check.
 * Then the room was rendered and looked at, and the door was standing **behind
 * the right-hand wall shelf and the Satellite Model.** The shelves are fixtures
 * at x 462..670 and x 930..1138, y 505..536; the door reaches the floor, so it
 * crosses that band by construction. Excluding the window and both shelves
 * leaves four gaps in the back wall of 30 to 32 pixels — **there is nowhere on
 * that wall a door fits.** Every number was right and the picture was wrong,
 * which is the third time this project has shipped exactly that and the reason
 * the rule about rendering frames is a rule.
 *
 * **So: the right wall, at the front.** Both side walls hang art at p 0.32 and
 * p 0.64 and nothing forward of that, so p 0.88 is clear in every room, and the
 * front of a side wall is where a door belongs in a one-point-perspective box —
 * it is the wall you would actually walk in through.
 *
 * The arrival spot clears every standing spot in all four rooms: **Mission
 * Control 101px, Workshop 319, Observatory 182, Greenhouse 101.** Searched
 * across both walls and the full depth of each rather than picked, and only
 * three positions in the whole room satisfy every constraint at once. This one
 * is the best of them.
 */
export const DOOR_SIDE = 'right';

/** How far along the side wall, back (0) to front (1). Art sits at 0.32 and 0.64. */
export const DOOR_P = 0.88;

/**
 * WHERE SOMEBODY STANDS WHEN THEY COME THROUGH IT.
 *
 * Hard against the right wall and near the front, which is where the door is.
 * Not on the wall: a figure at u 1 is standing IN it, which is the Aug 16 Task
 * Lamp fault — a place that was never a place.
 */
export const DOOR_SPOT = { u: 0.94, v: 0.92 };

/**
 * THE ROOMS.
 *
 * Ordered, and the order is fixed rather than derived from what he owns. The
 * switcher reads this list, so the Greenhouse is always last whether he bought
 * the grow box first or last — a list that reshuffles itself as he shops is a
 * list he has to read every time instead of learning once.
 *
 * `unlock` is metadata for the SLOWER presence rule described below. It is not
 * consulted by the shipped default and it is not dead: it is the v1 section 6
 * pacing rule, kept executable so switching to it is one constant.
 *
 * No door lives here. Every room's door is in the same place — see `DOOR_SIDE`,
 * `DOOR_P` and `DOOR_SPOT` above, and the measurement that put them there.
 */
export const HQ_ROOMS = [
  {
    id: 'mission-control',
    name: 'Mission Control',
    blurb: 'The flight deck. Where the work is run from.',
    unlock: null,
    pieces: [
      'hq-desk',
      'hq-console',
      'hq-computer',
      'hq-holo',
      'hq-chair',
      'hq-lamp',
      'hq-rug',
      'hq-award-wall',
      'hq-patch-wall'
    ]
  },
  {
    id: 'workshop',
    name: 'Workshop',
    blurb: 'Where things get built, and taken apart to see how.',
    unlock: 'year-1',
    pieces: ['hq-lab', 'hq-robot', 'hq-rocket-model', 'hq-satellite']
  },
  {
    id: 'observatory',
    name: 'Observatory',
    blurb: 'Where you look outward.',
    unlock: 'year-2',
    pieces: ['hq-telescope', 'hq-poster-apollo', 'hq-poster-mars']
  },
  {
    id: 'greenhouse',
    name: 'Greenhouse',
    blurb: 'The three living things.',
    unlock: 'year-2-spring',
    pieces: ['hq-garden-box', 'hq-plant', 'hq-aquarium']
  }
];

/**
 * PIECE -> ROOM, built from the list above rather than written twice.
 *
 * A hand-maintained second map is how a piece ends up in one room according to
 * the switcher and another according to the drawing. Derived once, at module
 * load, so there is nothing to keep in step.
 */
export const ROOM_OF = (() => {
  const m = {};
  for (const room of HQ_ROOMS) for (const id of room.pieces) m[id] = room.id;
  return m;
})();

/**
 * Which room a piece lives in, or null.
 *
 * NULL, not the home room. A piece nobody assigned is a mistake and must
 * surface as one — defaulting it into Mission Control would hide exactly the
 * bug the partition check exists to catch, and the twentieth catalogue item
 * would appear on the flight deck because nobody said where it went.
 */
export function roomOf(pieceId) {
  return Object.prototype.hasOwnProperty.call(ROOM_OF, pieceId) ? ROOM_OF[pieceId] : null;
}

/** A room record by id, or null. */
export function roomById(roomId) {
  return HQ_ROOMS.find((r) => r.id === roomId) || null;
}

/**
 * IS EVERY CATALOGUE PIECE IN EXACTLY ONE ROOM?
 *
 * Returns what is wrong rather than a boolean, because "false" tells a guard
 * nothing it can print. `missing` are catalogue items no room claims;
 * `unknown` are ids a room claims that are not in the catalogue; `duplicated`
 * are ids claimed twice.
 *
 * It reads `HQ_ITEMS` directly. Checking the partition against a hand-copied
 * list of nineteen ids would be the guard marking its own homework against a
 * second copy — the Aug 30 lesson, written down in the session prompt as trap
 * number two.
 */
export function partitionReport() {
  const catalog = HQ_ITEMS.map((i) => i.id);
  const seen = new Map();
  const duplicated = [];
  for (const room of HQ_ROOMS) {
    for (const id of room.pieces) {
      if (seen.has(id)) duplicated.push(id);
      else seen.set(id, room.id);
    }
  }
  return {
    missing: catalog.filter((id) => !seen.has(id)),
    unknown: [...seen.keys()].filter((id) => !catalog.includes(id)),
    duplicated,
    count: seen.size,
    catalogCount: catalog.length
  };
}

/* ===========================================================================
 * WHEN A ROOM APPEARS.
 *
 * ---- THE SHIPPED RULE ----
 *
 * He owns at least one piece that lives in it. Mission Control regardless.
 *
 * Two properties, and both of them are the point:
 *
 *   - It works when he owns TWO pieces. Desk and lamp is one room, the room he
 *     has today. Desk and telescope is two rooms, neither empty.
 *   - He is never shown an empty room. An empty room is the dashed outline one
 *     level up, and Phase 3's whole discipline is that the room does not draw
 *     what he has not got.
 *
 * ---- THE RULE IT REPLACES, WHICH IS NOT DELETED ----
 *
 * v1 section 6 unlocks rooms by YEAR OF STUDY, not coins, so the base grows
 * with him rather than with his wallet. The principle is right. The calendar is
 * the problem: Year 1 completes around May 2027, so shipping Phase 5 with the
 * year rule gives him one room for nine months and a feature he cannot tell was
 * built.
 *
 * Nor is ownership the wallet rule v1 was refusing. He cannot buy a ROOM —
 * there is none in the catalogue and there will not be one. A room is a
 * consequence of furniture he chose, and furniture is what v1 always meant him
 * to buy with coins.
 *
 * So both rules live here, behind one interface. Changing the pace is changing
 * `ROOM_PRESENCE`, and the guard runs both.
 * ======================================================================== */

/** `'owned'` — the shipped default. `'year'` — v1 section 6's pacing. */
export const ROOM_PRESENCE = 'owned';

/**
 * Is this room present?
 *
 * `milestones` is a Set supplied by the caller and is only consulted under the
 * year rule. It is INJECTED rather than imported for the same reason the
 * roaming rolls are: this file has to stay runnable by a guard, and "has he
 * finished Year 1" is a question about his record that belongs to the store.
 */
export function roomIsPresent(room, { owned = new Set(), rule = ROOM_PRESENCE, milestones = new Set() } = {}) {
  if (!room) return false;
  if (room.id === HOME_ROOM) return true;

  /**
   * NOT EMPTY, UNDER EITHER RULE.
   *
   * "He is never shown an empty room" is an INVARIANT, not a property of the
   * ownership rule that happens to imply it. Under the year rule on its own,
   * finishing Year 1 would open a Workshop with nothing in it — a door to a
   * bare floor, which is the dashed outline one level up and the exact thing
   * Phase 3 exists to refuse. So the year rule is a second condition on top of
   * this one, never a replacement for it, and the guard checks the invariant
   * against BOTH rules rather than against the shipped default.
   */
  if (!room.pieces.some((id) => owned.has(id))) return false;
  if (rule === 'year') return Boolean(room.unlock) && milestones.has(room.unlock);
  return true;
}

/**
 * The rooms the switcher shows, in order.
 *
 * Always at least one, and the first is always the hub — a switcher with
 * nothing in it, or one whose first entry moves about, is worse than no
 * switcher.
 */
export function presentRooms(opts = {}) {
  return HQ_ROOMS.filter((room) => roomIsPresent(room, opts));
}

/** The pieces of one room that he actually owns. What the room draws. */
export function ownedPiecesIn(roomId, owned = new Set()) {
  const room = roomById(roomId);
  if (!room) return [];
  return room.pieces.filter((id) => owned.has(id));
}

/**
 * Everything in a room, owned or not. What the room draws AS OUTLINES.
 *
 * Deliberately separate from `ownedPiecesIn`. Phase 3's rule is that the room
 * never draws a thing he has not earned as though he had it — but a price tag
 * on a dashed outline is not that; it is the shop, in place, which is what the
 * room has done since Aug 8. Two questions, two functions, so a check about one
 * can never be answered by the other.
 */
export function allPiecesIn(roomId) {
  const room = roomById(roomId);
  return room ? [...room.pieces] : [];
}

/**
 * WHERE A CREW MEMBER IS, BY ROOM.
 *
 * A crew member posted in the Greenhouse is not drawn in Mission Control, so
 * the panel has to say where they went. A crew member he earned who simply
 * disappears from the screen reads as a fault, not as a design — and he would
 * be right.
 *
 * Unposted crew muster in the hub, which is why this returns HOME_ROOM rather
 * than null for them: they are somewhere, and it is here.
 */
export function roomOfCrew(crew) {
  if (!crew || !crew.arrived) return null;
  if (!crew.post) return HOME_ROOM;
  return roomOf(crew.post);
}

/**
 * THE DOOR IN A ROOM. One per room, always in the same place.
 *
 * Returns null for a room that does not exist rather than a door to nowhere.
 */
export function doorIn(roomId) {
  const room = roomById(roomId);
  if (!room) return null;
  return { side: DOOR_SIDE, p: DOOR_P, w: DOOR.w, h: DOOR.h };
}

/**
 * WHERE SOMEBODY STANDS WHEN THEY COME THROUGH IT.
 *
 * The destination room's own door spot — you arrive where the door is, which is
 * the only place arriving through a door can honestly put you. Because the door
 * is in the same place in every room, so is this.
 *
 * Returns null for a room that does not exist, and null means DO NOT MOVE
 * ANYBODY. Every function in this project's `lib` that cannot answer returns
 * null for the same reason: the failure mode must never be "here, have an
 * arbitrary spot".
 */
export function arrivalSpot(toRoomId) {
  return roomById(toRoomId) ? { u: DOOR_SPOT.u, v: DOOR_SPOT.v, stance: 'stand' } : null;
}

/**
 * WHERE THE DOOR CAN TAKE HIM — every present room except the one he is in.
 *
 * This is the switcher's list, and it is deliberately not "every room": a
 * destination he cannot use is the dashed-outline problem one level up, and
 * offering to walk him into an empty Greenhouse is the shop's promise made
 * worse rather than better.
 *
 * Ordered by `HQ_ROOMS`, so the list does not reshuffle as he buys furniture.
 */
export function destinationsFrom(roomId, opts = {}) {
  return presentRooms(opts).filter((r) => r.id !== roomId);
}
