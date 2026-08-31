/**
 * =============================================================================
 * THE HQ'S PERSPECTIVE, IN PLAIN JAVASCRIPT.
 * =============================================================================
 *
 * ---- WHY THIS FILE EXISTS (Aug 25, 2026) ----
 *
 * The parent, on the third round of HQ complaints: **"The Avatar arms just
 * moves a little. Its not doing anything with the workstation."**
 *
 * She was right, and measuring her screenshot against the room's own maths said
 * how badly: at the workstation he stood **82px left of the desk centre** with
 * his hands **65px below the desk surface**, in front of a desk whose top was
 * level with his shoulders, and his shadow floating 16px below his boots.
 *
 * Every one of those is arithmetic, and every one of them shipped because this
 * arithmetic lived inside a .jsx file that no guard in this repo can execute.
 * Forty suites, and not one could answer "do his hands reach the desk?" — the
 * only way to find out was to open the app and look, which meant she found it
 * instead of me. Three times.
 *
 * So the geometry moves here, where it is importable by a guard, and the
 * invariant becomes a check: **a station's hands land on that station's
 * surface.** Nothing about it is React, so nothing about it needs a browser.
 */

/** The room's own coordinate box. Everything below is in these units. */
export const VB = { w: 1600, h: 900 };

/** The vanishing box — the back wall. Side walls, ceiling and floor run to it. */
export const BACK = { x1: 430, y1: 150, x2: 1170, y2: 570 };

/**
 * How big a thing standing at screen-y `y` is drawn. 0.55 against the back
 * wall, 1.20 at the very front — the single scale every object in the room
 * shares, which is what keeps the furniture and the boy in the same world.
 */
export function depth(y) {
  const t = Math.max(0, Math.min(1, (y - BACK.y2) / (VB.h - BACK.y2)));
  return 0.55 + t * 0.65;
}

/**
 * Floor coordinates to screen. `u` runs 0..1 across the floor AT THAT DEPTH,
 * `v` runs 0 at the back wall to 1 at the front edge.
 */
export function projectFloor(u, v) {
  const y = BACK.y2 + v * (VB.h - BACK.y2);
  const xLeft = BACK.x1 * (1 - v);
  const xRight = BACK.x2 + (VB.w - BACK.x2) * v;
  return { x: xLeft + u * (xRight - xLeft), y };
}

/**
 * HOW BIG THE BOY IS.
 *
 * Was 0.61, which made him 1.8x the height of his own desk — correct
 * arithmetic for a 150cm twelve-year-old and a 75cm desk, and wrong on the
 * screen. This figure's head is a third of its height, so its shoulders sit at
 * 58% of its height where a real person's sit at 82%. Scaled by real
 * proportions he stood at his own workstation like a toddler at a kitchen
 * counter, which is exactly what the first rendered picture showed.
 *
 * Cartoon figures are sized against the FURNITURE, not against anthropometry.
 */
export const FIGURE_SCALE = 0.78;

/**
 * The avatar is drawn with its feet at +29 in its own coordinates, and placed
 * with a translate of -29 so those feet land on the floor point.
 */
export const FIGURE_FEET_Y = 29;

/**
 * WHERE THE WORKING SURFACE IS, IN THE FIGURE'S OWN COORDINATES.
 *
 * The stance says what shape the arms make. This says at what HEIGHT — the one
 * number that was missing, and the reason every station got the same hands in
 * the same place regardless of what he had walked up to.
 *
 * Computed from where the piece IS rather than where it was designed to be, so
 * it survives him dragging the desk across the room. Returns null when the
 * station has no surface — a poster, the rug — and the arms fall back to the
 * stance's own shape.
 */
export function reachYFor(station, pieceSpot, standSpot) {
  if (!station || !Number.isFinite(station.surfaceY) || !pieceSpot || !standSpot) return null;
  const piece = projectFloor(pieceSpot.u, pieceSpot.v);
  const stand = projectFloor(standSpot.u, standSpot.v);
  const kFigure = depth(stand.y) * FIGURE_SCALE;
  if (!kFigure) return null;
  const surfaceRoomY = piece.y + station.surfaceY * depth(piece.y);
  return FIGURE_FEET_Y + (surfaceRoomY - stand.y) / kFigure;
}

/**
 * The inverse, for the guard: given a reach in figure coordinates, where do the
 * hands actually land on the screen? A check that recomputed this from the same
 * expression as `reachYFor` would prove only that multiplication is
 * deterministic; going back the other way and landing on the surface is a real
 * assertion.
 */
export function handRoomY(reachY, standSpot) {
  const stand = projectFloor(standSpot.u, standSpot.v);
  return stand.y + (reachY - FIGURE_FEET_Y) * depth(stand.y) * FIGURE_SCALE;
}

/** Where a piece's working surface sits on screen. */
export function surfaceRoomY(station, pieceSpot) {
  const piece = projectFloor(pieceSpot.u, pieceSpot.v);
  return piece.y + station.surfaceY * depth(piece.y);
}

/* ===========================================================================
 * THE LIGHT. (Phase 0, Aug 29, 2026.)
 *
 * ---- WHY IT IS HERE AND NOT IN THE .JSX ----
 *
 * The same reason the projection is. A rendered frame on Aug 29 showed a room
 * where every object floated: eighteen pieces standing on a floor plane and not
 * one of them touching it, because a drawn shape only meets a drawn floor if
 * something draws the meeting. That is arithmetic — how wide a shadow, how dark,
 * how it shrinks with distance — and arithmetic that lives inside JSX is
 * arithmetic no guard in this repo can execute. That is exactly how the avatar
 * came to stand 82px left of his own desk for three rounds of complaints.
 *
 * So the numbers live here, the component spends them, and the guard checks
 * them. Nothing below knows what React is.
 *
 * ---- WHAT THE VALUES ARE, AND WHY THOSE ----
 *
 * From the build spec's palette section, unchanged. The brand tokens are NOT
 * replaced: light is added on top with `mix-blend-mode: screen`, so retheming
 * the app still propagates through a lit room. A light layer that hard-coded
 * the room's colours would be a second copy of the palette, and this project
 * has shipped a second copy of something twice.
 * =========================================================================== */

export const LIGHT = {
  /** The task lamp. Warm, and the only warm thing in the room. */
  lamp: { hot: '#ffc266', edge: '#ff8c1a', max: 0.55 },
  /** Screens, the window, the aquarium. Cool, and there are several. */
  screen: { hot: '#7ee6ff', edge: '#22d3ee', max: 0.42 },
  /**
   * A wash from the front of the room, so a shape standing away from the lamp
   * keeps its form instead of going to silhouette. Without it the left third of
   * the room reads as a hole.
   */
  fill: { color: '#3d7fa8', opacity: 0.16 },
  /** Enough to frame the picture. Not enough to swallow the corners. */
  vignette: 0.34,
  /** Contact shadow: black at the object's foot, gone by its edge. */
  contact: { from: 0.6, to: 0 }
};

/**
 * CONTACT SHADOW SHAPE.
 *
 * A shadow is drawn INSIDE the piece's own group, which is already scaled by
 * `depth(y)` — so distance scaling comes from the transform and must not be
 * applied twice. These two constants are the shape in the piece's own units,
 * and `contactShadow` below is the same shape resolved to the screen, which is
 * what the guard asserts against.
 */
export const CONTACT_RX = 1.06;   // × the piece's half-width footprint
export const CONTACT_RATIO = 0.24; // ry as a fraction of rx — the floor's rake

/**
 * The shadow a piece of half-width `foot` casts, standing at screen-y `y`, in
 * SCREEN units. Identical by construction to what the component draws locally
 * and then scales; going the other way round and landing on the same number is
 * a real assertion, the same trick `handRoomY` uses for his hands.
 */
export function contactShadow(foot, y) {
  const rx = foot * CONTACT_RX * depth(y);
  return { rx, ry: rx * CONTACT_RATIO, opacity: LIGHT.contact.from };
}

/**
 * WHERE THE WARM LIGHT COMES FROM.
 *
 * The lamp's shade is drawn at y -110..-142 in its own coordinates, so the bulb
 * sits about -124 above its foot. The glow is centred there rather than on the
 * floor spot, because a lamp that lights the carpet it stands on and nothing at
 * desk height is a lamp drawn by someone who never looked at one.
 *
 * It reads the lamp's LIVE spot, so when he drags the lamp across the room the
 * light goes with it. The alternative — a fixed warm patch where the lamp was
 * designed to stand — is the Aug 25 station bug again: a place that was never a
 * place. Costs nothing to do properly, because the lamp already knows where it
 * is.
 */
/**
 * The radius was 560 in the first lit frame and it was fog. A pool of light
 * nearly a third of the room wide has no edge, and light with no edge is not a
 * lamp — it is weather. 360 puts a readable pool around the desk and leaves the
 * far corners for the screens to do, which is the two-temperature split the
 * whole look depends on.
 */
export const LAMP_GLOW = { dy: -124, r: 360 };

export function lampLightAt(spot) {
  const p = projectFloor(spot.u, spot.v);
  const k = depth(p.y);
  return { x: p.x, y: p.y + LAMP_GLOW.dy * k, r: LAMP_GLOW.r * k };
}
