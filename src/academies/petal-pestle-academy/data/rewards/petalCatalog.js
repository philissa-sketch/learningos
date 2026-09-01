import { onSurface } from '../../config/room.js';

// ---------------------------------------------------------------------------
// THE PETAL MARKET — 58 things she can buy with 🌸 Petals.
//
// Everything here costs a grown-up nothing and nothing here ever waits for
// approval. That split is deliberate: the fun half of the economy should not be
// rationed by somebody else's calendar. The half that spends real money is
// gated separately, in seedRewards.js.
//
// PRICED AGAINST A YEAR OF SCHOOL, NOT AGAINST THE CHECK-IN — changed v3.15.
//
// The old note priced this against the diagnostic's ~715 Petals. v3.12 cut that
// to a flat completion bonus and moved the earning into the schoolwork, so the
// number that matters now is what a YEAR pays: about 2,126 Petals — 96 lessons
// at 6, 32 weekly tests at 15, 4 quarter tests at 40, 16 projects at 25, and
// roughly 170 warm-ups at 3.
//
// Against that, a 32-item shop topping out at 200 had a problem Gigi named:
// nothing was worth SAVING for. The dearest thing in the app cost about three
// weeks of school, so every purchase was an impulse and none was a decision.
//
// So: 58 items, and four KEYSTONE pieces at 300–450 — roughly half a term of
// work each. The cheapest is still 25, affordable in the first sitting, because
// a shop where the first thing is out of reach is a shop she stops opening.
//
// OWNERSHIP is one list of ids in `unlockedItems`. Not an inventory table: an
// id list already merges by union, already goes in the export, and a second
// owned-items store would be a second thing to keep in sync for no gain.
// ---------------------------------------------------------------------------

/**
 * Decorations for the greenhouse on her home screen.
 *
 * ---- POSITIONS ARE ROOM COORDINATES, NOT PIXELS ----
 *
 * `spot: { u, t }` — t is depth (0 at the back wall, 1 at the front), u is
 * across the room at that depth (0 = left wall, 1 = right wall). Screen x, y
 * and SCALE are all computed from those two numbers in config/room.js.
 *
 * This replaced twelve hand-picked pixel positions. Those had drifted into a
 * flat scale from back to front — a bookshelf at the far wall drawn the same
 * size as a cat by the viewer's feet — which removed the room's only depth cue
 * and made everything read as scattered. Scale can no longer disagree with
 * depth, because nobody sets it.
 *
 * `lift` raises a thing off the floor in room units: the window box sits on the
 * back sill, the bee hotel is mounted up the right wall.
 *
 * ---- THE ZONES ----
 *
 * Real greenhouses are organised around their walls, so this one is too:
 *   left wall  (u ≈ 0.10) — the potting bench, and the field guides beside it
 *   right wall (u ≈ 0.88) — the shelf, the bee hotel, the birdbath below
 *   back wall  (u ≈ 0.50) — the sill, the window box, the arch in front of it
 *   the middle (u ≈ 0.50, t > 0.6) — deliberately kept clear for the rug,
 *                                    the stool and the cat
 *
 * Keeping the centre of the floor mostly empty is what stops a room with twelve
 * things in it from looking cluttered.
 */
export const GREENHOUSE_ITEMS = [
  // ---- the middle of the floor: only the things you actually stand among ----
  // The watering can used to be here, at u 0.63, standing in the open middle of
  // the room since v2.1. Nobody leaves the good copper can in the middle of the
  // floor — it lives beside the bench, within reach of the bench. Moved to the
  // left wall at v3.15, which also gave the middle back a slot.
  { id: 'gh-stool', spot: { u: 0.38, t: 0.60 }, name: 'Wooden Stool', icon: '🪑', cost: 25, desc: 'Somewhere to sit while the tea steeps.' },
  { id: 'gh-watering-can', spot: { u: 0.22, t: 0.50 }, name: 'Copper Watering Can', icon: '🪣', cost: 35, desc: 'The good one, with the long spout.' },
  { id: 'gh-cat', spot: { u: 0.56, t: 0.80 }, name: 'Greenhouse Cat', icon: '🐈', cost: 70, desc: 'Every greenhouse has one. Nobody knows whose she is.' },
  { id: 'gh-rug', layer: 'floor', spot: { u: 0.48, t: 0.76 }, name: 'Woven Rug', icon: '🧶', cost: 90, desc: 'Handmade, a little muddy, much loved.' },

  // ---- the back wall ----
  { id: 'gh-window-box', spot: { u: 0.50, t: 0.03, lift: 30 }, name: 'Window Box', icon: '🪟', cost: 45, desc: 'Herbs on the sill, where the light is best.' },
  { id: 'gh-arch', spot: { u: 0.50, t: 0.18 }, name: 'Climbing Rose Arch', icon: '🌹', cost: 140, desc: 'Takes three years to fill in. Worth it.' },

  // ---- the left wall ----
  { id: 'gh-bookshelf', spot: { u: 0.11, t: 0.72 }, name: 'Field Guide Shelf', icon: '📚', cost: 105, desc: 'For the guides you keep going back to.' },
  { id: 'gh-pond', layer: 'floor', spot: { u: 0.22, t: 0.94 }, name: 'Little Pond', icon: '💧', cost: 160, desc: 'Frogs eat the slugs. This is a real gardening fact.' },

  // ---- the right wall ----
  { id: 'gh-bee-hotel', spot: { u: 0.95, t: 0.52, lift: 340 }, name: 'Bee Hotel', icon: '🐝', cost: 80, desc: 'Somewhere for the pollinators to rest.' },
  { id: 'gh-birdbath', spot: { u: 0.74, t: 0.88 }, name: 'Stone Birdbath', icon: '🕊️', cost: 120, desc: 'The robins arrive within a week.' },

  // ---- overhead ----
  { id: 'gh-lantern', layer: 'hang', spot: { u: 0.50, t: 0.62, lift: 470 }, name: 'Paper Lantern', icon: '🏮', cost: 55, desc: 'Warm light for working late.' },
  { id: 'gh-glasshouse', layer: 'roof', spot: { u: 0.50, t: 0.0, lift: 430 }, name: 'Glass Roof Panels', icon: '✨', cost: 200, desc: 'The whole greenhouse fills with light.' },

  // ---- ON THE WINDOW SILL ------------------------------------------------
  // Gigi named the windows. Until v3.15 the only thing that ever sat on the
  // sill was the window box, and the rest of it — the whole width of the back
  // glass, the best light in the room — was bare.
  { id: 'gh-sill-seedlings', spot: onSurface('sill', 0.14), name: 'Seedling Pots', icon: '🌱', cost: 40, desc: 'Six little pots in a row, all at different heights.' },
  { id: 'gh-sill-bottles', spot: onSurface('sill', 0.30), name: 'Coloured Bottles', icon: '🫗', cost: 60, desc: 'Green, blue and amber. The light comes through them.' },
  { id: 'gh-sill-orchid', spot: onSurface('sill', 0.72), name: 'Windowsill Orchid', icon: '🌸', cost: 95, desc: 'Fussy, dramatic, and worth every bit of it.' },
  { id: 'gh-stained-glass', layer: 'roof', spot: { u: 0.78, t: 0.02, lift: 300 }, name: 'Stained Glass Panel', icon: '🪟', cost: 340, desc: 'Leaves and petals in coloured glass, set high in the back window. It throws colour across the floor.' },

  // ---- ON THE WALL SHELVES -----------------------------------------------
  // The lower board was drawn at v2.1 and completely bare until v3.15, and the
  // upper one carried nothing for sale either.
  { id: 'gh-shelf-baskets', spot: onSurface('shelfLower', 0.50), name: 'Woven Baskets', icon: '🧺', cost: 45, desc: 'Stacked three deep. One always has something in it.' },
  { id: 'gh-shelf-tins', spot: onSurface('shelfUpper', 0.40), name: 'Seed Tins', icon: '🥫', cost: 55, desc: 'Labelled in pencil so they can be changed.' },
  { id: 'gh-shelf-clock', spot: onSurface('shelfUpper', 0.85), name: 'Greenhouse Clock', icon: '🕰️', cost: 115, desc: 'Runs four minutes slow. Nobody has ever fixed it.' },

  // ---- ON THE POTTING BENCH ----------------------------------------------
  { id: 'gh-bench-sieve', spot: onSurface('benchTop', 0.30), name: 'Soil Sieve', icon: '🪤', cost: 35, desc: 'Shakes the stones out of the compost.' },
  { id: 'gh-bench-propagator', spot: onSurface('benchTop', 0.62), name: 'Propagator Lid', icon: '🫧', cost: 130, desc: 'A little warm world. Cuttings root twice as fast under it.' },
  { id: 'gh-bench-terrarium', spot: onSurface('benchTop', 0.94), name: 'Glass Terrarium', icon: '🔮', cost: 175, desc: 'Seals shut and waters itself. Genuinely.' },

  // ---- MOUNTED ON THE WALLS ----------------------------------------------
  //
  // Gigi, looking at v3.15: "there isn't anything on the walls or ceiling
  // everything is jammed in the same area." She was right, and check-room said
  // otherwise because it counted an item's u — how far ACROSS the room it is —
  // so a bookshelf standing on the FLOOR beside the left wall counted as "the
  // left wall carries something". It does not.
  //
  // Measured before this block existed: thirteen of twenty-two things sat in one
  // ~100px band around the horizon, nothing at all was above y 344 except two
  // items both at x 800, and NOTHING was mounted high on either side wall. A
  // greenhouse's walls are its most used surface and both of hers were bare.
  //
  // These carry real lift, so they land high, and they sit at u 0.02 and 0.98 —
  // hard against the walls — which is also the only way to reach the near side
  // wedges of the picture, left of x 270 and right of x 1360, that nothing had
  // ever occupied.
  { id: 'gh-thermometer', spot: { u: 0.02, t: 0.35, lift: 310 }, name: 'Greenhouse Thermometer', icon: '🌡️', cost: 50, desc: 'Tells you when to open the vents. Reads two degrees high.' },
  { id: 'gh-pegboard', spot: { u: 0.02, t: 0.65, lift: 400 }, name: 'Tool Pegboard', icon: '🪛', cost: 90, desc: 'Every tool outlined in pencil, so you know what is missing.' },
  { id: 'gh-drying-bunches', spot: { u: 0.98, t: 0.30, lift: 320 }, name: 'Drying Bunches', icon: '🌾', cost: 75, desc: 'Hung upside down in the dark half of the wall.' },
  { id: 'gh-wreath', spot: { u: 0.98, t: 0.76, lift: 430 }, name: 'Everlasting Wreath', icon: '🎍', cost: 110, desc: 'Made in October from whatever was left. It keeps.' },

  // ---- HANGING FROM THE ROOF ---------------------------------------------
  // The top third of the picture had two things in it, both at x 800.
  { id: 'gh-wind-chime', layer: 'hang', spot: { u: 0.15, t: 0.72, lift: 545 }, name: 'Shell Wind Chime', icon: '🐚', cost: 75, desc: 'Only sounds when somebody leaves the door open.' },
  { id: 'gh-hanging-baskets', layer: 'hang', spot: { u: 0.28, t: 0.48, lift: 520 }, name: 'Hanging Baskets', icon: '🪴', cost: 125, desc: 'Trailing over the edges. They drip on you.' },
  { id: 'gh-string-lights', layer: 'hang', spot: { u: 0.50, t: 0.28, lift: 555 }, name: 'Fairy Lights', icon: '💡', cost: 145, desc: 'Strung along the roof line. Worth it in December.' },
  { id: 'gh-drying-rail', layer: 'hang', spot: { u: 0.72, t: 0.52, lift: 505 }, name: 'Overhead Drying Rail', icon: '🪝', cost: 165, desc: 'A whole harvest hung above your head, out of the way.' }
];

/** What she wears and who she is on the screen. */
export const APRON_ITEMS = [
  { id: 'av-apron-linen', slot: 'body', name: 'Linen Apron', icon: '🥼', cost: 25, desc: 'Plain, sturdy, pockets everywhere.' },
  { id: 'av-apron-floral', slot: 'body', name: 'Floral Apron', icon: '🌷', cost: 45, desc: 'Small print, big pockets.' },
  { id: 'av-gloves', slot: 'hands', name: 'Gardening Gloves', icon: '🧤', cost: 40, desc: 'For the nettles, mostly.' },
  { id: 'av-hat', slot: 'hat', name: 'Wide Straw Hat', icon: '👒', cost: 60, desc: 'The whole afternoon in the sun, no problem.' },
  { id: 'av-boots', slot: 'feet', name: 'Green Wellingtons', icon: '🥾', cost: 65, desc: 'Never once been clean.' },
  { id: 'av-satchel', slot: 'bag', name: 'Foraging Satchel', icon: '🎒', cost: 85, desc: 'Canvas, one strap, smells faintly of thyme.' },
  { id: 'av-glasses', slot: 'neck', name: 'Botanist\'s Loupe', icon: '🔍', cost: 100, desc: 'Ten times magnification, worn on a cord.' },
  { id: 'av-coat', slot: 'body', name: 'White Coat', icon: '🩺', cost: 130, desc: 'For the doctor half of the plan.' },
  { id: 'av-braids', slot: 'hair', name: 'Ribboned Braids', icon: '🎀', cost: 55, desc: 'Out of the way, and pretty about it.' },
  { id: 'av-crown', slot: 'hat', name: 'Flower Crown', icon: '👑', cost: 150, desc: 'Made fresh each morning. Wilts by supper.' },
  { id: 'av-clogs', slot: 'feet', name: 'Garden Clogs', icon: '🥿', cost: 55, desc: 'On and off at the door in one second flat.' },
  { id: 'av-scarf', slot: 'hair', name: 'Printed Head Wrap', icon: '🧣', cost: 70, desc: 'Tied high. Keeps the sun and the sawdust off.' },
  { id: 'av-belt', slot: 'bag', name: 'Tool Belt', icon: '🧰', cost: 95, desc: 'Snips, twine and a pencil, always in the same three pockets.' },
  { id: 'av-apron-canvas', slot: 'body', name: 'Canvas Work Apron', icon: '🦺', cost: 110, desc: 'Heavy duck cotton. Will outlast the greenhouse.' },
  { id: 'av-stethoscope', slot: 'neck', name: 'Stethoscope', icon: '🩻', cost: 175, desc: 'The other half of the plan, worn round the neck.' },
  { id: 'av-cloak', slot: 'body', name: 'Herbalist\'s Cloak', icon: '🧥', cost: 300, desc: 'Deep green, deep hood, deeper pockets. For the long walk out to the field.' }
];

/** Tools and jars for the apothecary shelf — the collector's row. */
export const SHELF_ITEMS = [
  { id: 'sh-jar-blue', shelf: { row: 1, x: 120 }, name: 'Blue Glass Jar', icon: '🫙', cost: 30, desc: 'Blue glass keeps the light out.' },
  { id: 'sh-jar-amber', shelf: { row: 1, x: 250 }, name: 'Amber Jar', icon: '🍯', cost: 40, desc: 'The classic apothecary jar.' },
  { id: 'sh-mortar', shelf: { row: 0, x: 140 }, name: 'Mortar & Pestle', icon: '⚗️', cost: 75, desc: 'The one the whole academy is named after.' },
  { id: 'sh-scales', shelf: { row: 0, x: 320 }, name: 'Brass Scales', icon: '⚖️', cost: 90, desc: 'Balanced to the tenth of a gram.' },
  { id: 'sh-press', shelf: { row: 2, x: 130 }, name: 'Flower Press', icon: '📗', cost: 100, desc: 'Two boards, four bolts, infinite patience.' },
  { id: 'sh-labels', shelf: { row: 1, x: 380 }, name: 'Handwritten Labels', icon: '🏷️', cost: 50, desc: 'Latin name on top, date underneath.' },
  { id: 'sh-microscope', shelf: { row: 0, x: 500 }, name: 'Brass Microscope', icon: '🔬', cost: 145, desc: 'Where the chamomile turns into hundreds of flowers.' },
  { id: 'sh-journal', shelf: { row: 1, x: 505 }, name: 'Field Journal', icon: '📓', cost: 65, desc: 'Waterproof cover. Every page will get muddy.' },
  { id: 'sh-drying-rack', shelf: { row: 2, x: 320 }, name: 'Drying Rack', icon: '🪢', cost: 110, desc: 'Bunches hung upside down in the dark.' },
  { id: 'sh-cabinet', shelf: { row: 2, x: 520 }, name: 'Apothecary Cabinet', icon: '🗄️', cost: 200, desc: 'Forty tiny drawers. All of them labelled.' },
  { id: 'sh-seed-envelopes', shelf: { row: 1, x: 60 }, name: 'Seed Envelopes', icon: '✉️', cost: 45, desc: 'Folded from paper, dated in the corner.' },
  { id: 'sh-recipe-box', shelf: { row: 1, x: 620 }, name: 'Recipe Box', icon: '🗃️', cost: 70, desc: 'Index cards, some in handwriting older than she is.' },
  { id: 'sh-oil-burner', shelf: { row: 2, x: 420 }, name: 'Oil Burner', icon: '🕯️', cost: 95, desc: 'Warms the room and the whole hallway smells of it.' },
  { id: 'sh-herbarium', shelf: { row: 2, x: 60 }, name: 'Herbarium Folder', icon: '🗂️', cost: 120, desc: 'Pressed specimens, each one mounted and named.' },
  { id: 'sh-tincture-rack', shelf: { row: 0, x: 60 }, name: 'Tincture Rack', icon: '🧪', cost: 145, desc: 'Twelve stoppered bottles in a wooden frame.' },
  { id: 'sh-still', shelf: { row: 0, x: 620 }, name: 'Copper Still', icon: '⚗️', cost: 380, desc: 'For distilling flower water. The most serious thing on the shelf.' }
];

/**
 * ROOM LOOKS — a category that did not exist before v3.15.
 *
 * Gigi asked for "more backgrounds", and there were none: the greenhouse had
 * exactly one look and no purchase had ever changed it. She also asked that
 * every "spend what you earned" path change how something LOOKS, and this is
 * the one that changes the whole screen at once.
 *
 * A look is a palette, not a picture. It overrides the greenhouse's own colours
 * — the glass, the frames, the walls, the floor — so the room she built stays
 * exactly where she put it and only the light changes. A picture would have
 * meant redrawing every item for every background.
 *
 * She can own several and pick between them; the chosen one lives in meta as
 * \`roomLook\`. Owning one does not force it on her.
 */
export const BACKGROUND_ITEMS = [
  {
    id: 'bg-dawn',
    look: { glass: '#F3E4E8', glassDeep: '#E7CFD8', frame: '#C3A9AE', frameDark: '#A08B90', wallSide: '#F6ECE4', wallSideDark: '#EBDCD0', floor: '#DCC6B4', floorFar: '#E9D9CA' },
    name: 'Early Morning', icon: '🌅', cost: 120, desc: 'First light through the glass, everything still pink.'
  },
  {
    id: 'bg-summer',
    look: { glass: '#E4F4DA', glassDeep: '#CCE8BC', frame: '#A8C193', frameDark: '#88A177', wallSide: '#F4F0DE', wallSideDark: '#E9E2C8', floor: '#DFC9A8', floorFar: '#EDDCC0' },
    name: 'High Summer', icon: '☀️', cost: 160, desc: 'The middle of July. Too warm to work past noon.'
  },
  {
    id: 'bg-autumn',
    look: { glass: '#F6E7CE', glassDeep: '#EBD3AC', frame: '#C0A177', frameDark: '#9C8055', wallSide: '#F2E5D2', wallSideDark: '#E5D2B8', floor: '#D3B48E', floorFar: '#E3C9A9' },
    name: 'Autumn Gold', icon: '🍂', cost: 200, desc: 'Everything drying, everything golden, nothing left to plant.'
  },
  {
    id: 'bg-starlight',
    look: { glass: '#2C3B54', glassDeep: '#1E2A3E', frame: '#4A5B78', frameDark: '#33425C', wallSide: '#3A4460', wallSideDark: '#2C3550', floor: '#4A4258', floorFar: '#5A5168', night: true },
    name: 'Night Greenhouse', icon: '🌙', cost: 450, desc: 'The whole glasshouse under stars, with the lantern doing all the work.'
  }
];

export const PETAL_CATEGORIES = [
  { id: 'greenhouse', label: 'The Greenhouse', blurb: 'Make the place yours.', items: GREENHOUSE_ITEMS },
  { id: 'apron', label: 'Apron & Kit', blurb: 'What you wear to work.', items: APRON_ITEMS },
  { id: 'shelf', label: 'Apothecary Shelf', blurb: 'Tools and jars worth collecting.', items: SHELF_ITEMS },
  { id: 'background', label: 'Room Looks', blurb: 'Change the light in the whole greenhouse.', items: BACKGROUND_ITEMS }
];

export const ALL_PETAL_ITEMS = PETAL_CATEGORIES.flatMap((c) => c.items);

export function getPetalItem(id) {
  return ALL_PETAL_ITEMS.find((i) => i.id === id) || null;
}

export const CHEAPEST_PETAL_ITEM = Math.min(...ALL_PETAL_ITEMS.map((i) => i.cost));

/** What owning the whole shop costs. Read by verify-economy, which fails the
 *  build if a single year of school could buy all of it — a shop that empties
 *  is a shop with nothing left to save for. */
export const CATALOGUE_TOTAL = ALL_PETAL_ITEMS.reduce((a, i) => a + i.cost, 0);

/** The dearest tier. Named so the check can assert something exists up here at
 *  all, rather than trusting that nobody quietly capped the shop at 200 again. */
export const KEYSTONE_FLOOR = 300;

export function getBackgroundLook(id) {
  return BACKGROUND_ITEMS.find((b) => b.id === id)?.look || null;
}
