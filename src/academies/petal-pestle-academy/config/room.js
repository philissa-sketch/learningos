// ---------------------------------------------------------------------------
// THE ROOM — its geometry, and where things are allowed to stand.
//
// WHY THIS FILE EXISTS.
//
// The grandmother: "The greenhouse looks cluttered. There's nothing on the
// walls and everything looks placed randomly around." All three were true, and
// the third had a cause the first two did not.
//
// Every object had been given a hand-picked x, y and scale, one at a time, by
// eye. That produced this:
//
//     bookshelf   far back    drawn at 1.00
//     bee hotel   far back    drawn at 0.90
//     birdbath    middle      drawn at 1.00
//     cat         near front  drawn at 0.95
//     rug         front       drawn at 1.15
//
// Scale was flat from the back wall to the front. In one-point perspective that
// is not a small error — it removes the only depth cue the drawing has. A far
// bookshelf the same size as a near cat cannot read as standing in a room, so
// it reads as a sticker on a picture. THAT is what "placed randomly" was: not
// bad taste in positions, a missing dimension.
//
// So positions are no longer pixels. A thing is placed at (u, t):
//
//     t = depth.  0 at the back wall, 1 at the front edge.
//     u = across. 0 at the left wall, 1 at the right wall, AT THAT DEPTH.
//
// Both x and scale are then computed. Scale cannot disagree with depth, because
// it is derived from it. Nobody can nudge one and forget the other.
//
// The second consequence is the useful one: because the room widens toward the
// viewer, u = 0.05 means "against the left wall" at every depth. Furniture can
// run ALONG a wall, which is what a real greenhouse looks like and what was
// missing.
// ---------------------------------------------------------------------------

/** The drawing surface. */
export const VB = { w: 1600, h: 900 };

/** The vanishing box — the glass back wall. Everything runs to it. */
export const BACK = { x1: 440, y1: 170, x2: 1160, y2: 580 };

/**
 * How small things are at the back wall.
 *
 * 0.55 is not arbitrary: the back wall is 720 units wide and the front edge is
 * 1600, so the room is 2.2× wider at the front. Half of that ratio applied to
 * object size reads as depth without making the far end look like dollhouse
 * furniture — objects at the back are still recognisable, which matters when
 * the bee hotel she is saving for lives back there.
 */
export const SCALE_AT_BACK = 0.55;

/** Left edge of the floor at depth t. */
export function leftEdgeAt(t) {
  return BACK.x1 * (1 - t);
}

/** Right edge of the floor at depth t. */
export function rightEdgeAt(t) {
  return BACK.x2 + (VB.w - BACK.x2) * t;
}

/** Screen y of the floor at depth t. */
export function floorYAt(t) {
  return BACK.y2 + (VB.h - BACK.y2) * t;
}

/** How big something standing at depth t should be drawn. */
export function scaleAt(t) {
  return SCALE_AT_BACK + (1 - SCALE_AT_BACK) * t;
}

/**
 * Turn a room position into a draw transform.
 *
 * `lift` raises the object off the floor in ROOM units before scaling — used
 * for things standing on the bench or mounted on a wall, so a pot on the bench
 * shrinks with depth exactly like the bench under it.
 */
export function place({ u = 0.5, t = 0.5, lift = 0 } = {}) {
  const left = leftEdgeAt(t);
  const right = rightEdgeAt(t);
  const s = scaleAt(t);
  return {
    x: left + u * (right - left),
    y: floorYAt(t) - lift * s,
    s
  };
}

// ---------------------------------------------------------------------------
// THE ROOM'S OWN FURNITURE
//
// This is not for sale and never was. It is the greenhouse itself: staging down
// the left wall, a shelf and pegboard on the right, a sill along the back.
//
// It exists because "there is nothing on the walls" is a fact about the ROOM,
// not about what she has bought. An empty greenhouse should still look like a
// greenhouse on day one, before a single Petal is spent — and the things she
// buys should have somewhere to go that is not the middle of the floor.
// ---------------------------------------------------------------------------

/**
 * The potting bench down the left wall.
 *
 * uOuter / uInner rather than a centre and a depth. The first version used a
 * centre line and drifted 70–110 units clear of the wall, so it read as a table
 * marooned in the middle of the floor — which is the exact problem the bench was
 * added to solve. Anchoring the outer edge at u = 0 means "against the wall" at
 * every depth, and the gap cannot come back.
 */
export const LEFT_BENCH = { from: 0.13, to: 0.62, uOuter: 0.0, uInner: 0.145, height: 118 };

/** The wall shelf on the right. Outer edge pinned to u = 1: the wall. */
export const RIGHT_SHELF = { from: 0.11, to: 0.52, uOuter: 1.0, uInner: 0.855, height: 250 };

/** Vertical gap between the two boards of the right-hand shelf. Named because
 *  GreenhouseScene draws both boards from it AND SURFACES.shelfLower is derived
 *  from it — two places that must not be allowed to disagree. */
export const SHELF_BOARD_GAP = 118;

/** The sill along the bottom of the back glass. */
export const BACK_SILL = { from: 0.0, to: 0.045, height: 22 };

// ---------------------------------------------------------------------------
// SURFACES — the places in the room a bought thing can STAND ON.
//
// WHY THIS EXISTS, in Gigi's words: "Greenhouse items have nowhere to go" — and
// she named the windows. The placement check was passing the whole time,
// because it asks whether every item HAS a spot, and every item did. The gap
// was the other way round: the room had built surfaces and nothing for sale
// ever went on any of them. All twelve purchasables stood on the FLOOR. The
// bench top, the two shelf boards and the back sill were furniture nobody could
// put anything on.
//
// THE LIFT IS DERIVED, NEVER TYPED. That is the whole point of this block. A
// catalogue row saying `lift: 118` would be correct today and silently wrong
// the moment the bench height moves — the same class of failure as the twelve
// hand-picked scales that made the room read as scattered in the first place.
// A surface is named; its height comes from the same constant the furniture is
// drawn from.
//
// `along` runs 0 at the FAR end of the surface to 1 at the near end.
// ---------------------------------------------------------------------------

export const SURFACES = {
  /** The potting bench top, down the left wall. */
  benchTop: {
    label: 'the potting bench',
    from: LEFT_BENCH.from,
    to: LEFT_BENCH.to,
    u: (LEFT_BENCH.uOuter + LEFT_BENCH.uInner) / 2,
    lift: LEFT_BENCH.height
  },
  /** The upper board of the right-hand wall shelf. */
  shelfUpper: {
    label: 'the upper wall shelf',
    from: RIGHT_SHELF.from,
    to: RIGHT_SHELF.to,
    u: (RIGHT_SHELF.uOuter + RIGHT_SHELF.uInner) / 2,
    lift: RIGHT_SHELF.height
  },
  /** The lower board. Drawn since v2.1 and completely bare until v3.15. */
  shelfLower: {
    label: 'the lower wall shelf',
    from: RIGHT_SHELF.from,
    to: RIGHT_SHELF.to,
    u: (RIGHT_SHELF.uOuter + RIGHT_SHELF.uInner) / 2,
    lift: RIGHT_SHELF.height - SHELF_BOARD_GAP
  },
  /** The sill along the bottom of the back glass — the windows. */
  sill: {
    label: 'the window sill',
    from: BACK_SILL.from,
    to: BACK_SILL.to,
    u: null, // runs across the back, so a sill item names its own u
    uFrom: 0.10,
    uTo: 0.90,
    lift: BACK_SILL.height + 8
  }
};

/**
 * Where on a named surface a thing stands.
 *
 * Returns a `spot` — the same {u, t, lift} the floor items use — so nothing
 * downstream has to know the difference between standing on the floor and
 * standing on the bench. `place()` scales the lift with depth already, so a jar
 * at the far end of the shelf shrinks exactly as much as the board under it.
 *
 * For the sill, `along` runs ACROSS the window rather than into the room,
 * because that is the direction a sill actually has.
 */
export function onSurface(surfaceId, along = 0.5) {
  const S = SURFACES[surfaceId];
  if (!S) throw new Error(`Unknown surface "${surfaceId}"`);
  const a = Math.min(1, Math.max(0, along));
  if (S.u === null) {
    return { u: S.uFrom + a * (S.uTo - S.uFrom), t: (S.from + S.to) / 2, lift: S.lift };
  }
  return { u: S.u, t: S.from + a * (S.to - S.from), lift: S.lift };
}

/**
 * A quad running along a wall between two depths, as an SVG polygon.
 * Used for the bench top, the shelf boards and the sill — all of which are
 * rectangles in the room and trapezoids on screen.
 */
export function wallQuad({ from, to, uNear, uFar, liftFrom, liftTo }) {
  const a = place({ u: uFar, t: from, lift: liftFrom });
  const b = place({ u: uNear, t: from, lift: liftFrom });
  const c = place({ u: uNear, t: to, lift: liftTo });
  const d = place({ u: uFar, t: to, lift: liftTo });
  return `${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}`;
}
