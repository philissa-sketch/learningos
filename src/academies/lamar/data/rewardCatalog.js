// ---------------------------------------------------------------------------
// THE MISSION SUPPLY CATALOG — everything that can be bought, and for what.
// (Part 10, built Aug 8, 2026.)
//
// ---- WHY THIS FILE IS SEPARATE FROM lib/rewards.js ----
//
// `lib/rewards.js` holds the Aug 6 cosmetics and the DEFAULT_REWARDS that were
// already SEEDED into the parent's database. Those seeded rows are live data
// now: re-pricing the constant would not change them, and re-seeding would
// resurrect rewards she deliberately deleted. So nothing here edits that file.
// This is additive, exactly like every other change in this project.
//
// ---- THE PRICE RECONCILIATION, WRITTEN DOWN ----
//
// Two price lists existed and disagreed:
//
//   The parent's list      200 / 300 / 800 / 1,000 / 2,500 / 3,000 / 5,000
//   CREDIT_LADDER (built)   50 / 150 / 400 /   800 / 1,500 / 2,000
//
// It looked like a conflict. It is not. Her ORDERING is exactly right — every
// item sits in the correct relative position, and each maps cleanly onto a
// ladder tier at a scale factor of about 0.4:
//
//   Choose dinner      200 x 0.4 =   80  -> tier 50    (small privilege)
//   Movie night        300 x 0.4 =  120  -> tier 150   (treat or outing)
//   New STEM book      800 x 0.4 =  320  -> tier 400   (book or small kit)
//   Bookstore trip   1,000 x 0.4 =  400  -> tier 400
//   Science museum   2,500 x 0.4 = 1,000 -> tier 1500  (big day out)
//   Day with Mom     3,000 x 0.4 = 1,200 -> tier 1500
//   LEGO set         5,000 x 0.4 = 2,000 -> tier 2000  (Dream Reward)
//
// So the ladder is adopted and her list is priced onto it. The alternative —
// raising the Credit rate to match her absolute numbers — was rejected because
// the ladder was already simulated against real earn rates and the 2,000 tier
// verified at ~47% of a year. Re-rating would have put the annual Dream Reward
// at under 20% of a year, which stops it being a year's goal at all.
//
// ---- WHY COSMETICS NEEDED RE-PRICING TOO ----
//
// Coins moved from 1-per-5-XP to 1-per-2-XP, so they arrive 2.5x faster. The
// Aug 6 cosmetics (40-120) would now be cleared in about two weeks, and an
// empty store is a dead store. Prices below are the old ones scaled by 2.5 and
// rounded, which keeps their relative value identical to what was already
// approved rather than re-litigating it.
// ---------------------------------------------------------------------------

/* -------------------------------------------------------------------------
 * Credit tiers — mirrors CREDIT_LADDER in lib/economy.js
 * ---------------------------------------------------------------------- */

export const CREDIT_TIERS = [50, 150, 400, 800, 1500, 2000];

/** Snap any price to the nearest legal ladder tier. Keeps the ladder honest. */
export function tierForCredits(credits) {
  let best = CREDIT_TIERS[0];
  for (const t of CREDIT_TIERS) {
    if (Math.abs(t - credits) < Math.abs(best - credits)) best = t;
  }
  return best;
}

/* -------------------------------------------------------------------------
 * COSMETIC RE-PRICING — existing items, new Coin rate
 *
 * Applied as a map rather than by editing lib/rewards.js, so the original
 * definitions stay the single source of truth for names, icons and colours and
 * only the cost is overridden.
 * ---------------------------------------------------------------------- */

export const COSMETIC_REPRICE = {
  'avatar-cadet': 0, // free default — must stay 0
  'avatar-astronaut': 100,
  'avatar-robot': 150,
  'avatar-alien': 200,
  'avatar-satellite': 250,
  'avatar-planet': 300,
  // Added Aug 25 2026 with the drawn-character rebuild. Priced into the same
  // ladder as the six above rather than at the bottom — a new character is not
  // worth less than an old one, and a cheap shelf of new arrivals would make
  // the ones he already bought feel like a mistake.
  'avatar-engineer': 225,
  'avatar-pilot': 275,
  'avatar-rover': 325,
  'avatar-commander': 400,
  'rocket-classic': 0, // free default — must stay 0
  'rocket-cyan': 125,
  'rocket-amber': 175,
  'rocket-green': 225,
  'rocket-violet': 275
};

/** Effective Coin cost for a cosmetic, re-priced if we have a new value. */
export function costForCosmetic(id, originalCost) {
  return Object.prototype.hasOwnProperty.call(COSMETIC_REPRICE, id)
    ? COSMETIC_REPRICE[id]
    : originalCost;
}

/* -------------------------------------------------------------------------
 * MISSION EQUIPMENT — Coins
 *
 * Bought with Coins, so it costs the parent nothing and never needs approval.
 * This is the half of the store he can use freely, which is deliberate: the
 * fun should not be rationed by a parent's calendar.
 * ---------------------------------------------------------------------- */

/**
 * ===========================================================================
 * EQUIPMENT IS WORN NOW, NOT JUST OWNED. (Aug 25, 2026.)
 * ===========================================================================
 *
 * The parent: **"Lamar wants to use the equipment he purchases not just have
 * it sitting in the equipment app."**
 *
 * He is right, and the reason is one missing field. `equipGear` refuses any
 * item without a `slot` (`useAppStore`: *"if (!item || !item.slot) return
 * { ok: false, reason: 'no-slot' }"*), and only AVATAR_GEAR had one. So the
 * fourteen gear pieces could be put on and the twelve equipment pieces could
 * not — they hung on a rack and that was the end of them.
 *
 * He owns a **Gold Visor (400), a Flight Helmet (150) and Mission Boots
 * (200)** — 750 coins of things he could look at and never wear.
 *
 * SLOTS ARE CHOSEN SO CONFLICTS ARE REAL ONES. `eq-suit-flight` takes `body`,
 * the same slot as the Avatar Gear uniforms, because you wear one suit at a
 * time. The jetpack and the life-support pack share `back` for the same
 * reason. The visor gets its own slot rather than sharing `eyes` with the
 * glasses: a gold EVA visor comes down OVER whatever is on your face, which is
 * exactly what it does on a real spacewalk.
 *
 * The four ship parts stay slotless on purpose — they bolt onto the
 * spacecraft, and a boy cannot wear a heat shield.
 */
export const MISSION_EQUIPMENT = [
  { id: 'eq-helmet-basic', name: 'Flight Helmet', icon: '🪖', cost: 150, slot: 'head', desc: 'Standard issue. Everyone starts somewhere.' },
  { id: 'eq-suit-flight', name: 'Flight Suit', icon: '🧥', cost: 200, slot: 'body', desc: 'Orange, like a real test pilot’s.' },
  { id: 'eq-jetpack', name: 'Manoeuvring Unit', icon: '🎒', cost: 350, slot: 'back', desc: 'The real ones are called MMUs. Nitrogen thrusters, no fuel to spare.' },
  { id: 'eq-toolkit', name: 'Engineering Toolkit', icon: '🧰', cost: 250, slot: 'carry', desc: 'Torque wrench, multimeter, and the patience to use them.' },
  { id: 'eq-tether', name: 'Safety Tether', icon: '🪢', cost: 175, slot: 'belt', desc: 'Unglamorous. Also the reason spacewalkers come back.' },
  { id: 'eq-visor-gold', name: 'Gold Visor', icon: '🥽', cost: 400, slot: 'visor', desc: 'Real EVA visors are gold-coated — it blocks infrared.' },
  { id: 'eq-boots', name: 'Mission Boots', icon: '🥾', cost: 200, slot: 'feet', desc: 'Lunar boots left prints that will outlast every city on Earth.' },
  { id: 'eq-pack-life', name: 'Life Support Pack', icon: '🎽', cost: 500, slot: 'back', desc: 'Oxygen, cooling, and CO₂ scrubbing. The backpack that keeps you alive.' },
  { id: 'eq-booster', name: 'Booster Upgrade', icon: '🔥', cost: 600, desc: 'More thrust. Also more mass — which is the whole problem.' },
  { id: 'eq-heatshield', name: 'Heat Shield', icon: '🛡️', cost: 550, desc: 'Re-entry hits about 1,650°C. This is what stands between you and it.' },
  { id: 'eq-antenna', name: 'High-Gain Antenna', icon: '📡', cost: 450, desc: 'A spacecraft that cannot talk is a spacecraft you have lost.' },
  { id: 'eq-solar', name: 'Solar Array', icon: '☀️', cost: 500, desc: 'The ISS arrays cover about an acre.' }
];

/* -------------------------------------------------------------------------
 * AVATAR GEAR — Coins
 * ---------------------------------------------------------------------- */

/**
 * Avatar Gear — every item is something the drawn cadet can actually WEAR.
 *
 * The first version of this list was incoherent and the parent caught it:
 * hairstyles were whole-person emoji, "expressions" were face emoji layered on
 * a face, and "victory animations" did not animate. None of it was wearable,
 * because the avatar was a single emoji glyph and nothing layers onto a glyph.
 *
 * With the cadet drawn in SVG (components/Rewards/CadetAvatar.jsx) each slot
 * became real, so the list is rebuilt around what the figure can actually
 * render. Poses replace the animations: a still frame that genuinely changes
 * the drawing is worth more than a promise of motion the app cannot keep.
 *
 * Safe to renumber ids: the Supply store shipped the same day and nothing had
 * been bought yet. Any later change to these ids WOULD strand owned items,
 * because ownership is stored by id.
 */
export const AVATAR_GEAR = [
  // Hair — drawn shapes, not emoji.
  { id: 'av-hair-fade', name: 'Low Fade', icon: '💇🏿‍♂️', cost: 100, slot: 'hair', desc: 'Clean fade, a little height on top.' },
  { id: 'av-hair-afro', name: 'Afro', icon: '🧑🏿', cost: 100, slot: 'hair', desc: 'Full and round.' },
  { id: 'av-hair-locs', name: 'Locs', icon: '🧑🏿‍🦱', cost: 120, slot: 'hair', desc: 'Shoulder-length locs.' },

  // Eyes — sits over the face.
  { id: 'av-glasses', name: 'Safety Glasses', icon: '🥽', cost: 120, slot: 'eyes', desc: 'Clear wrap-around. Worn in every real lab.' },
  { id: 'av-glasses-cool', name: 'Aviators', icon: '🕶️', cost: 180, slot: 'eyes', desc: 'What test pilots actually wore.' },

  // Body — replaces the torso.
  { id: 'av-uniform-flight', name: 'Flight Suit', icon: '🧥', cost: 300, slot: 'body', desc: 'Orange, like a shuttle-era launch suit.' },
  { id: 'av-uniform-eng', name: 'Engineering Coveralls', icon: '👖', cost: 300, slot: 'body', desc: 'Navy coveralls for hangar work.' },
  { id: 'av-uniform-lab', name: 'Lab Coat', icon: '🥼', cost: 250, slot: 'body', desc: 'White coat for the bench.' },

  // Hands.
  { id: 'av-gloves', name: 'Work Gloves', icon: '🧤', cost: 120, slot: 'hands', desc: 'Insulated, for handling hardware.' },

  // Expression — changes the drawn face.
  { id: 'av-expr-focused', name: 'Focused', icon: '😐', cost: 150, slot: 'expression', desc: 'Brow down, eyes narrowed.' },
  { id: 'av-expr-grin', name: 'Mission Grin', icon: '😄', cost: 150, slot: 'expression', desc: 'The look after a good launch.' },

  // Pose — moves the arms. These replace the old "victory animations".
  { id: 'av-pose-salute', name: 'Salute', icon: '🫡', cost: 400, slot: 'pose', desc: 'Hand to the brow.' },
  { id: 'av-pose-liftoff', name: 'Liftoff', icon: '🙌', cost: 500, slot: 'pose', desc: 'Both arms up.' },
  { id: 'av-pose-float', name: 'Zero-G Float', icon: '🧘', cost: 500, slot: 'pose', desc: 'Legs tucked, arms out.' }
];

/* -------------------------------------------------------------------------
 * MISSION CONTROL HQ — Coins
 *
 * His room, essentially. Cheapest category on purpose: it is the one that
 * rewards him for simply being here a while, and a visibly filling room is a
 * better long-run motivator than a one-off cosmetic.
 * ---------------------------------------------------------------------- */

export const HQ_ITEMS = [
  { id: 'hq-desk', name: 'Engineering Workstation', icon: '🖥️', cost: 200 },
  /**
   * A SECOND WORKING POSITION. (Added Aug 30, 2026.)
   *
   * The parent, once the Flight Engineer was posted: **"Can there be another
   * work station added since there will be a helper?"**
   *
   * Right — with one console, a posted crew member and the cadet share it,
   * standing on opposite sides. That works and is even quite nice, but it is
   * one desk doing two jobs, and her reference picture of a control room is
   * full of PAIRED consoles rather than one.
   *
   * Deliberately purchasable like everything else here rather than arriving
   * free with the crew member. Crew are earned by schoolwork and furniture is
   * bought with coins; a third category — "furniture that arrives when you earn
   * a person" — would blur the one rule this catalogue has. It also makes a
   * good loop: earn the engineer, then buy the engineer a desk.
   */
  { id: 'hq-console', name: 'Crew Console', icon: '🎛️', cost: 250 },
  { id: 'hq-computer', name: 'Mission Computer', icon: '💻', cost: 250 },
  { id: 'hq-rocket-model', name: 'Rocket Display', icon: '🚀', cost: 300 },
  { id: 'hq-satellite', name: 'Satellite Model', icon: '🛰️', cost: 250 },
  { id: 'hq-robot', name: 'Workshop Robot', icon: '🤖', cost: 400 },
  { id: 'hq-telescope', name: 'Telescope', icon: '🔭', cost: 350 },
  { id: 'hq-lab', name: 'Laboratory Bench', icon: '⚗️', cost: 300 },
  { id: 'hq-plant', name: 'Desk Plant', icon: '🪴', cost: 50 },
  { id: 'hq-garden-box', name: 'Grow Box', icon: '🌱', cost: 150 },
  { id: 'hq-aquarium', name: 'Aquarium', icon: '🐠', cost: 400 },
  { id: 'hq-poster-apollo', name: 'Apollo Poster', icon: '🖼️', cost: 75 },
  { id: 'hq-poster-mars', name: 'Mars Map', icon: '🗺️', cost: 75 },
  { id: 'hq-award-wall', name: 'Award Display', icon: '🏆', cost: 200 },
  { id: 'hq-patch-wall', name: 'Patch Wall', icon: '🎖️', cost: 200 },
  { id: 'hq-holo', name: 'Holographic Display', icon: '📊', cost: 400 },
  { id: 'hq-chair', name: 'Flight Chair', icon: '🪑', cost: 150 },
  { id: 'hq-lamp', name: 'Task Lamp', icon: '💡', cost: 50 },
  { id: 'hq-rug', name: 'Orbit Rug', icon: '🌀', cost: 100 }
];

/* -------------------------------------------------------------------------
 * REAL-WORLD REWARDS — Credits
 *
 * The parent's own list, priced onto the ladder. `parentNamed: true` marks the
 * seven she wrote herself, so the Rewards Manager can show them first.
 *
 * Everything above 100 Credits needs her approval, which on two computers may
 * mean waiting for the next export round-trip. That delay is not a flaw — it
 * is the delayed-gratification lesson expressed as a mechanic.
 * ---------------------------------------------------------------------- */

export const REAL_WORLD_REWARDS = [
  // -- Small privileges: cost her nothing, clear instantly --
  { id: 'rw-dinner', name: 'Choose dinner one night', credits: 50, tier: 'Small privilege', parentNamed: true },
  { id: 'rw-screen', name: '30 minutes extra screen time', credits: 50, tier: 'Small privilege' },
  { id: 'rw-bedtime', name: 'Stay up 30 minutes past bedtime', credits: 50, tier: 'Small privilege' },
  { id: 'rw-show', name: "Choose tonight's family show", credits: 50, tier: 'Small privilege' },
  { id: 'rw-music', name: 'Pick the music in the car', credits: 50, tier: 'Small privilege' },
  { id: 'rw-chore', name: 'Trade out one chore', credits: 50, tier: 'Small privilege' },
  { id: 'rw-maker-hour', name: 'An hour of solo maker time', credits: 50, tier: 'Small privilege' },

  // -- Treats and outings --
  { id: 'rw-movie', name: 'Movie night — his pick', credits: 150, tier: 'Treat or outing', parentNamed: true },
  { id: 'rw-icecream', name: 'Trip for a smoothie or ice cream', credits: 150, tier: 'Treat or outing' },
  { id: 'rw-friend', name: 'Have a friend over / game night', credits: 150, tier: 'Treat or outing' },
  { id: 'rw-weekend', name: 'Pick the weekend outing', credits: 150, tier: 'Treat or outing' },
  { id: 'rw-cook', name: 'Cook or bake something together', credits: 150, tier: 'Treat or outing' },
  { id: 'rw-picnic', name: 'Bike ride + picnic day', credits: 150, tier: 'Treat or outing' },

  // -- Books and kits --
  { id: 'rw-stem-book', name: 'New STEM book', credits: 400, tier: 'Book or small kit', parentNamed: true },
  { id: 'rw-bookstore', name: 'Bookstore trip', credits: 400, tier: 'Book or small kit', parentNamed: true, note: 'Set a dollar cap before you go' },
  { id: 'rw-model-kit', name: 'Small model or robotics kit', credits: 400, tier: 'Book or small kit' },
  { id: 'rw-maker-supplies', name: 'Maker supplies restock', credits: 400, tier: 'Book or small kit' },

  // -- Bigger rewards --
  { id: 'rw-bowling', name: 'Bowling, mini-golf, or trampoline park', credits: 800, tier: 'Bigger reward' },
  { id: 'rw-lego-small', name: "Small LEGO / K'Nex set", credits: 800, tier: 'Bigger reward' },
  { id: 'rw-science-kit', name: 'Science kit', credits: 800, tier: 'Bigger reward' },

  // -- Big days out --
  { id: 'rw-museum', name: 'Science museum day (Fernbank or Tellus)', credits: 1500, tier: 'Big day out', parentNamed: true },
  { id: 'rw-mom-day', name: 'Special day with Mom', credits: 1500, tier: 'Big day out', parentNamed: true },
  { id: 'rw-aviation', name: 'Museum of Aviation day out', credits: 1500, tier: 'Big day out' },

  // -- Life-skill wins: near-free, and worth rewarding --
  { id: 'rw-plant', name: 'Choose and plant something in the garden', credits: 50, tier: 'Small privilege', note: 'Life skill' },
  { id: 'rw-diy', name: 'Plan and lead a DIY project', credits: 50, tier: 'Small privilege', note: 'Life skill' },
  { id: 'rw-meal', name: 'Pick and cook one family meal', credits: 50, tier: 'Small privilege', note: 'Life skill' }
];

/* -------------------------------------------------------------------------
 * DREAM REWARDS — Credits, top tier, one a year
 *
 * These are the ones the Dream Goal system saves toward, with the 25% parent
 * match applied to reserved Credits. Every one is deliberately aerospace: the
 * point is that a year of schoolwork converts into a day that makes the dream
 * concrete.
 * ---------------------------------------------------------------------- */

export const DREAM_REWARDS = [
  { id: 'dr-delta', name: 'Delta Flight Museum day trip', credits: 2000, icon: '✈️', desc: 'Real aircraft, in Atlanta. Closest big one to home.' },
  // The parent's own top-of-list item. It lands here rather than in
  // REAL_WORLD_REWARDS because at 2,000 Credits it IS the annual Dream Goal —
  // which is exactly the position she put it in.
  { id: 'dr-lego-technic', name: 'Large LEGO Technic / aerospace build set', credits: 2000, icon: '🧱', desc: 'The big one. Weeks of building.', parentNamed: true },
  { id: 'dr-rocket-day', name: 'Model-rocket kit + launch day', credits: 2000, icon: '🚀', desc: 'Build it, then actually fly it.' },
  { id: 'dr-telescope', name: 'Beginner telescope', credits: 2000, icon: '🔭', desc: 'Saturn’s rings are visible from a backyard in Georgia.' },
  { id: 'dr-drone', name: 'Starter drone', credits: 2000, icon: '🛸', desc: 'Flight controls, but the aircraft is yours.' },
  { id: 'dr-mighty-eighth', name: 'Mighty Eighth Air Force Museum', credits: 2000, icon: '🎖️', desc: 'Pooler, GA — the long drive. Worth an overnight.' },
  { id: 'dr-stem-camp', name: 'STEM or engineering camp week', credits: 2000, icon: '🏕️', desc: 'A week with other kids who build things.' },
  { id: 'dr-university', name: 'University engineering campus visit', credits: 2000, icon: '🎓', desc: 'Georgia Tech is 20 minutes away. Go stand in it.' }
];

/* -------------------------------------------------------------------------
 * WIRING THE LADDER TO THE STORE THE STUDENT ACTUALLY SEES (Aug 9, 2026)
 *
 * The audit found this file was dead. Every price above was designed,
 * simulated against real earn rates, reconciled with the parent's own list and
 * verified by 41 passing tests — and no component imported any of it. What the
 * student saw was the `rewards` Dexie table, seeded on Aug 6 from
 * DEFAULT_REWARDS in lib/rewards.js at the OLD coin-era prices, then charged
 * as Credits. So "Day at a science center" cost 250 instead of the 1,500 it
 * was designed to cost, and three items involving real money or the car —
 * "Pick the weekend outing" (90), "Trip for a smoothie" (80) and "Have a
 * friend over" (80) — sat under the 100-Credit auto-approve line and cleared
 * with no parent involved at all.
 *
 * The tests passed because they tested the file, not the wiring: the exact
 * failure this project's own log has a name for — logic shipped without the
 * control that reaches it.
 *
 * The fix is a MIGRATION, not a re-seed. Those rows are live data now: the
 * parent may have edited a price, renamed something, or deleted a reward she
 * decided against, and re-seeding would resurrect all of it. So the map below
 * pairs each Aug 6 seeded NAME with the catalog item it was always meant to
 * be, and useAppStore's `migrateRewardsToLadder` re-prices exactly those rows,
 * skipping any whose price she has edited herself.
 *
 * A name NOT in this map is a reward she wrote, and nothing touches it.
 * ---------------------------------------------------------------------- */

export const SEEDED_REWARD_LADDER_MAP = {
  '30 minutes extra screen/game time': 'rw-screen',
  'Stay up 30 minutes past bedtime': 'rw-bedtime',
  "Choose tonight's family show": 'rw-show',
  'Pick the music in the car': 'rw-music',
  'Movie-night pick': 'rw-movie',
  'Trade out one chore': 'rw-chore',
  'Choose dinner one night': 'rw-dinner',
  'Cook or bake something together': 'rw-cook',
  'Have a friend over / game night': 'rw-friend',
  'Trip for a smoothie or ice cream': 'rw-icecream',
  'Pick the weekend outing': 'rw-weekend',
  'An hour of solo maker/tinker time': 'rw-maker-hour',
  'Bowling, mini-golf, or trampoline park': 'rw-bowling',
  'New book or a small model kit': 'rw-model-kit',
  'Bike ride + picnic day': 'rw-picnic',
  "Small LEGO / K'Nex / robotics set": 'rw-lego-small',
  'Day at a science center (Tellus or Fernbank)': 'rw-museum',
  'Museum of Aviation day out': 'rw-aviation',
  'Choose and plant something in the garden': 'rw-plant',
  'Plan and lead a DIY project': 'rw-diy',
  'Pick and cook one family meal': 'rw-meal',
  // These four were seeded as ordinary rewards at 400-800 coins. On the
  // ladder they are Dream Rewards at 2,000 Credits — which is where the
  // parent's own list put the big LEGO set, and what makes a Dream Reward
  // worth roughly half a school year rather than a fortnight.
  'Delta Flight Museum day trip': 'dr-delta',
  'Model-rocket kit + launch day': 'dr-rocket-day',
  'Bigger LEGO Technic / aerospace build set': 'dr-lego-technic',
  'Beginner telescope or starter drone': 'dr-telescope'
};

/**
 * Which tiers cost real money, real time, or the car.
 *
 * Anything in these tiers needs a parent's yes regardless of price. The
 * 100-Credit auto-approve line is a good rule that was doing the wrong job on
 * its own: it is a BUDGET control (how much can clear in a week without her),
 * and it was also being asked to be a JUDGMENT control (is this the kind of
 * thing that needs a parent at all). Those are different questions, and the
 * day a price is set slightly too low the second one silently stops being
 * asked — which is exactly what happened to the weekend outing.
 *
 * Small privileges — a later bedtime, the car radio, picking the show — cost
 * her nothing and still clear instantly on purpose: the reward should feel
 * connected to the work that earned it, not arrive by post.
 */
export const TIERS_REQUIRING_PARENT = new Set([
  'Treat or outing',
  'Book or small kit',
  'Bigger reward',
  'Big day out',
  'Dream Reward'
]);

/** Look up any Credit-priced catalog item by its id. */
export function catalogItemById(id) {
  return (
    REAL_WORLD_REWARDS.find((i) => i.id === id) ||
    DREAM_REWARDS.find((i) => i.id === id) ||
    null
  );
}

/**
 * The full Credit catalog, shaped as `rewards` table rows.
 *
 * One shape for both halves of the store, so the Real-World Rewards list and
 * the Dream Goal read the same table and can never disagree about what
 * something costs. `kind` is what separates them on screen.
 */
export function catalogRewardRows() {
  const rows = [];
  for (const item of REAL_WORLD_REWARDS) {
    rows.push({
      catalogId: item.id,
      name: item.name,
      cost: item.credits,
      note: item.note || '',
      tier: item.tier,
      kind: 'reward',
      requiresParent: TIERS_REQUIRING_PARENT.has(item.tier),
      parentNamed: Boolean(item.parentNamed)
    });
  }
  for (const item of DREAM_REWARDS) {
    rows.push({
      catalogId: item.id,
      name: item.name,
      cost: item.credits,
      note: item.desc || '',
      tier: 'Dream Reward',
      kind: 'dream',
      icon: item.icon || '⭐',
      requiresParent: true,
      parentNamed: Boolean(item.parentNamed)
    });
  }
  return rows;
}

/* -------------------------------------------------------------------------
 * Helpers
 * ---------------------------------------------------------------------- */

/** Everything bought with Coins, in one list. */
export const COIN_CATALOG = [
  ...MISSION_EQUIPMENT.map((i) => ({ ...i, category: 'Mission Equipment', currency: 'coin' })),
  ...AVATAR_GEAR.map((i) => ({ ...i, category: 'Avatar Gear', currency: 'coin' })),
  ...HQ_ITEMS.map((i) => ({ ...i, category: 'Mission Control HQ', currency: 'coin' }))
];

/** Everything bought with Credits, in one list. */
export const CREDIT_CATALOG = [
  ...REAL_WORLD_REWARDS.map((i) => ({ ...i, category: 'Parent Rewards', currency: 'credit' })),
  ...DREAM_REWARDS.map((i) => ({ ...i, category: 'Dream Rewards', currency: 'credit' }))
];

// "What can I afford right now?" moved to src/lib/economy.js on Sept 1, 2026.
// The catalog above is this school's; deciding which rows a balance reaches is
// every school's, so it is the platform's. §3c Step 1.

/**
 * The opportunity-cost line, or null when it should stay quiet.
 *
 * Fires only when a purchase is a serious dent in an active Dream Goal, and is
 * phrased as arithmetic rather than advice. It never blocks the purchase — the
 * point is that he sees the trade-off and still gets to make the call, because
 * a choice with no real option is not a lesson.
 */
export function opportunityCost(purchaseCredits, goal) {
  if (!goal || !goal.target) return null;
  const remaining = Math.max(0, goal.target - (goal.reserved || 0));
  if (remaining <= 0) return null;
  if (purchaseCredits < goal.target * 0.25) return null;
  return `Spending ${purchaseCredits} Credits here leaves ${remaining + purchaseCredits} to go for ${goal.label}.`;
}
