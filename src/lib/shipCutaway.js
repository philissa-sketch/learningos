/**
 * =============================================================================
 * THE SHIP AS A CUTAWAY — the layout the decks are drawn on.
 * =============================================================================
 *
 * The parent, Sept 27 2026, asked for the moving parts to work like the shelter
 * game her son plays: the whole place open in cross-section, people walking
 * about inside it doing jobs, crew you post to a station, and rooms that visibly
 * get better as they fill.
 *
 * The first version of the interior drew ONE deck at a time in perspective,
 * inherited from the HQ room. That is the wrong shape for this: the appeal of a
 * cutaway is seeing the whole vehicle at once and watching somebody cross it.
 * So the decks are stacked in a flat elevation — no perspective, no depth
 * scaling — and the ladder shaft runs between them as the lift does.
 *
 * ---- WHY THIS IS ITS OWN PLAIN-JS MODULE ----
 *
 * Same rule as `hqGeometry.js`: geometry a guard can run. "Do two rooms
 * overlap", "is the figure standing on the floor", "does every station have a
 * cell" are questions that must be answerable in Node, without a browser.
 *
 * ---- WHAT THIS FILE DOES NOT DECIDE ----
 *
 * What a station READS. That is `shipInterior.js`, and it stays the only
 * source of truth for the numbers. This file is where things are, not what
 * they say.
 */

/** The drawing box. Taller than it is wide: a vehicle standing on its engines. */
export const VIEW = { w: 1200, h: 900 };

/** The hull, inside which everything is drawn. */
export const HULL = { x: 200, y: 30, w: 800, h: 900 };

/** The lift shaft — the ladder, in the shelter game's terms. */
export const SHAFT = { x: 880, w: 110 };

/**
 * The decks, top to bottom, as bands of the hull.
 *
 * `floor` is the y a figure's feet sit on. `head` is the top of the room box.
 * Both are absolute so a guard can check a figure is inside its own deck
 * without re-deriving anything.
 */
/**
 * The nose needs room to be a nose. The first rendered frame put the top deck
 * at y=150, which left about a hundred pixels for the cone across nine hundred
 * of width — and a wide, shallow triangle reads as the roof of a house. The
 * decks start lower now so the cone is tall enough to be one.
 */
export const DECKS = [
  { id: 'flight-deck', name: 'Flight Deck', head: 250, floor: 500 },
  { id: 'hold', name: 'Cargo Hold', head: 540, floor: 790 }
];

export const DECK_IDS = DECKS.map((d) => d.id);

/** How tall a room box is, and how much air sits above the floor line. */
export const ROOM = { h: 300, floorPad: 20 };

/**
 * ---- THE CELLS ----
 *
 * One row of rooms per deck, left to right, the shaft always last. Widths are
 * proportional and resolved against the hull so the row always fills it
 * exactly — a fixed pixel width per room is how a row ends up with a gap on
 * the right the day a station is added.
 */
export const CELLS = {
  'flight-deck': [
    { id: 'viewport', span: 1.35 },
    { id: 'pilot-seat', span: 1 },
    { id: 'guidance-console', span: 1 },
    { id: 'comms-station', span: 1 },
    { id: 'sensor-bank', span: 1 }
  ],
  hold: [
    { id: 'fuel-tanks', span: 1.25 },
    { id: 'systems-locker', span: 1 },
    { id: 'life-support-bay', span: 1 },
    { id: 'crew-quarters', span: 1 },
    { id: 'badge-rack', span: 1 }
  ]
};

/** Every cell on a deck, resolved to real x and width. */
export function cellsOn(deckId) {
  const row = CELLS[deckId] || [];
  const total = row.reduce((n, c) => n + c.span, 0) || 1;
  const usable = SHAFT.x - HULL.x;
  const deck = DECKS.find((d) => d.id === deckId);
  let x = HULL.x;
  return row.map((c) => {
    const w = (c.span / total) * usable;
    const cell = { ...c, deck: deckId, x, w, y: deck.head, h: deck.floor - deck.head, floor: deck.floor };
    x += w;
    return cell;
  });
}

/** Where one station's room is, or null. */
export function cellFor(stationId) {
  for (const deckId of DECK_IDS) {
    const found = cellsOn(deckId).find((c) => c.id === stationId);
    if (found) return found;
  }
  return null;
}

/** Which deck a station's room is on, or null. */
export function deckOfCell(stationId) {
  const cell = cellFor(stationId);
  return cell ? cell.deck : null;
}

/** The middle of a room, at floor level — where somebody working there stands. */
export function standingSpot(stationId) {
  const cell = cellFor(stationId);
  if (!cell) return null;
  return { x: cell.x + cell.w / 2, y: cell.floor };
}

/** The foot of the lift on a deck. */
export function shaftSpot(deckId) {
  const deck = DECKS.find((d) => d.id === deckId) || DECKS[0];
  return { x: SHAFT.x + SHAFT.w / 2, y: deck.floor };
}

/**
 * ---- WALKING ----
 *
 * A route from one spot to another, as the points a figure passes through.
 * Same deck is a straight walk. A different deck goes to the lift, rides it,
 * and walks out — which is what makes the shaft read as a lift rather than as
 * a ladder drawn on a wall.
 *
 * Returned as plain points so the component can animate them with CSS and the
 * guard can assert the shape of the journey without rendering anything.
 */
export function routeBetween(fromDeck, fromX, toStationId) {
  const target = standingSpot(toStationId);
  if (!target) return [];
  const toDeck = deckOfCell(toStationId);
  const from = { x: fromX, y: (DECKS.find((d) => d.id === fromDeck) || DECKS[0]).floor };

  if (fromDeck === toDeck) return [from, target];

  const lift = shaftSpot(fromDeck);
  const out = shaftSpot(toDeck);
  return [from, lift, out, target];
}

/**
 * ---- HOW BUILT A ROOM LOOKS ----
 *
 * Four tiers, because "a slightly fuller bar" is not visible across a room and
 * a twelve-year-old should be able to see the difference from the doorway. The
 * tier is DERIVED from the same percentage the hull reports — there is no
 * stored level, nothing to upgrade with coins, and nothing that can drift from
 * the work behind it.
 *
 *   0  bare      nothing done yet
 *   1  working   started
 *   2  fitted    half or more
 *   3  complete  flight-ready
 */
export const TIER_THRESHOLDS = [0, 0.01, 0.5, 1];

export function tierFor(pct) {
  if (typeof pct !== 'number' || Number.isNaN(pct)) return 0;
  if (pct >= 1) return 3;
  if (pct >= 0.5) return 2;
  if (pct > 0) return 1;
  return 0;
}

export const TIER_NAMES = ['bare', 'working', 'fitted', 'complete'];
