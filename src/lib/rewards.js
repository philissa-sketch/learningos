// Gamification — Rewards catalog (Part 5, built Aug 6, 2026).
//
// Cosmetic unlocks the student buys with COINS. Coins are earned purely as a
// byproduct of XP (see useAppStore XP_PER_COIN), and XP is only ever awarded
// on verified real completions — so every coin, and therefore every unlock,
// is tied to real work (the Habitica/Prodigy principle from PROJECT_PLAN.md
// Part 2). Cosmetics are instant unlocks; real-world rewards are separate,
// parent-defined, and parent-approved (see the Parent Rewards Manager).
//
// Cost 0 = a free default everyone starts with (never "bought", always
// equippable), so the student always has one avatar and one rocket.

/**
 * ===========================================================================
 * THE AVATARS ARE DRAWN CHARACTERS NOW. (Aug 25, 2026.)
 * ===========================================================================
 *
 * The parent: **"he stated that he purchased the robo helper from the store
 * and nothing happened, it didn't go anywhere. The avatars look the same."**
 *
 * Both true. These six were emoji, and the only two places an equipped avatar
 * was ever rendered were a glyph in the nav bar and a glyph beside a heading —
 * both the size of a word. The drawn figure that actually represents him,
 * `CadetAvatar`, never read `equippedAvatar` at all.
 *
 * Worse, two of them were indistinguishable at render size: Cadet 🧑🏿‍🚀 and
 * Astronaut 👨🏿‍🚀 differ by one invisible byte. He could have paid 100 coins
 * and watched nothing change even in the one place it did render.
 *
 * Every id below now has a hand-drawn form in `components/Rewards/CadetAvatar.jsx`
 * and equipping it redraws the whole character. `verify-store-visibility.mjs`
 * asserts the two lists match, so an avatar can never again exist in the shop
 * without a drawing behind it.
 *
 * TWO CHANGES TO THE OLD SIX:
 *   - `avatar-planet` "Ringed Planet" is now **Stargazer**. A ringed planet is
 *     not a person, which is exactly why it was an emoji and never grew into
 *     anything. It is a cadet at a starfield visor with the ringed planet as
 *     the emblem on it. Nobody owns this one, so no coins are affected.
 *   - `icon` is kept on every row because the nav-bar chip is genuinely too
 *     small for a drawing. It is no longer the whole product.
 *
 * The four new ones answer the second half of what she asked for: more options.
 */
export const AVATARS = [
  // The cadet IS the student. He is a Black American boy, and the default
  // avatar should look like him rather than requiring him to go and find
  // himself in a shop — a child should not have to unlock his own reflection.
  { id: 'avatar-cadet', type: 'avatar', name: 'Cadet', icon: '🧑🏿‍🚀', cost: 0 },
  { id: 'avatar-astronaut', type: 'avatar', name: 'EVA Astronaut', icon: '👨🏿‍🚀', cost: 40 },
  { id: 'avatar-robot', type: 'avatar', name: 'Robo-Helper', icon: '🤖', cost: 60 },
  { id: 'avatar-alien', type: 'avatar', name: 'Friendly Visitor', icon: '👽', cost: 80 },
  { id: 'avatar-satellite', type: 'avatar', name: 'Satellite', icon: '🛰️', cost: 100 },
  { id: 'avatar-planet', type: 'avatar', name: 'Stargazer', icon: '🪐', cost: 120 },
  // ---- added Aug 25, 2026 ----
  { id: 'avatar-engineer', type: 'avatar', name: 'Flight Engineer', icon: '🎧', cost: 90 },
  { id: 'avatar-pilot', type: 'avatar', name: 'Test Pilot', icon: '🕶️', cost: 110 },
  { id: 'avatar-rover', type: 'avatar', name: 'Rover Bot', icon: '🛻', cost: 130 },
  { id: 'avatar-commander', type: 'avatar', name: 'Mission Commander', icon: '🎖️', cost: 160 }
];

export const ROCKETS = [
  { id: 'rocket-classic', type: 'rocket', name: 'Classic White', icon: '🚀', color: '#E8ECF4', cost: 0 },
  { id: 'rocket-cyan', type: 'rocket', name: 'Telemetry Cyan', icon: '🚀', color: '#22D3EE', cost: 50 },
  { id: 'rocket-amber', type: 'rocket', name: 'Booster Amber', icon: '🚀', color: '#F5A524', cost: 70 },
  { id: 'rocket-green', type: 'rocket', name: 'Mastery Green', icon: '🚀', color: '#34D399', cost: 90 },
  { id: 'rocket-violet', type: 'rocket', name: 'Deep-Space Violet', icon: '🚀', color: '#A78BFA', cost: 110 }
];

export const COSMETICS = [...AVATARS, ...ROCKETS];

export const DEFAULT_AVATAR_ID = 'avatar-cadet';
export const DEFAULT_ROCKET_ID = 'rocket-classic';

export function cosmeticById(id) {
  return COSMETICS.find((c) => c.id === id) || null;
}

/** The rocket-body color for an equipped rocket id (falls back to classic). */
export function rocketColorFor(id) {
  const r = ROCKETS.find((x) => x.id === id);
  return r ? r.color : '#E8ECF4';
}

/** The avatar emoji for an equipped avatar id (falls back to the free Cadet). */
export function avatarIconFor(id) {
  const a = AVATARS.find((x) => x.id === id);
  return a ? a.icon : '🧑🏿‍🚀';
}

/**
 * Optional starter suggestions the parent can one-click add in the Rewards
 * Manager. Deliberately NOT auto-seeded — real-world rewards are the parent's
 * call, so these only appear as "quick add" chips she can accept or ignore.
 */
export const SUGGESTED_PARENT_REWARDS = [
  { name: '30 minutes extra screen time', cost: 50 },
  { name: 'Pick the movie for family night', cost: 80 },
  { name: 'A trip for ice cream', cost: 120 },
  { name: 'Stay up 30 minutes past bedtime', cost: 60 },
  { name: 'Choose dinner one night', cost: 100 }
];

/**
 * Default real-world rewards — seeded ONCE into the parent's Rewards Manager
 * (Aug 6, 2026, at her request) so the store starts populated rather than
 * empty. Priced against the 1-coin-per-5-XP economy (~50–100 coins/week):
 * everyday privileges, weekly treats, bigger outings, aerospace save-toward
 * goals, and near-free self-sufficiency wins. She can edit/delete/add any of
 * these; once seeded they never re-appear (see useAppStore defaultRewardsSeeded).
 */
export const DEFAULT_REWARDS = [
  // Everyday privileges (a few days of work)
  { name: '30 minutes extra screen/game time', cost: 40 },
  { name: 'Stay up 30 minutes past bedtime', cost: 30 },
  { name: "Choose tonight's family show", cost: 30 },
  { name: 'Pick the music in the car', cost: 20 },
  { name: 'Movie-night pick', cost: 40 },
  { name: 'Trade out one chore', cost: 40 },
  // Weekly treats & choices (about a week)
  { name: 'Choose dinner one night', cost: 60 },
  { name: 'Cook or bake something together', cost: 70 },
  { name: 'Have a friend over / game night', cost: 80 },
  { name: 'Trip for a smoothie or ice cream', cost: 80, note: 'A smoothie keeps it health-friendly' },
  { name: 'Pick the weekend outing', cost: 90 },
  { name: 'An hour of solo maker/tinker time', cost: 50 },
  // Bigger rewards & outings (2–4 weeks)
  { name: 'Bowling, mini-golf, or trampoline park', cost: 150 },
  { name: 'New book or a small model kit', cost: 180, note: 'Set a dollar cap' },
  { name: 'Bike ride + picnic day', cost: 120 },
  { name: "Small LEGO / K'Nex / robotics set", cost: 200 },
  { name: 'Day at a science center (Tellus or Fernbank)', cost: 250 },
  // Save-toward goals (a month+) — aerospace-themed
  { name: 'Delta Flight Museum day trip', cost: 500 },
  { name: 'Museum of Aviation day out', cost: 400 },
  { name: 'Model-rocket kit + launch day', cost: 500 },
  { name: 'Bigger LEGO Technic / aerospace build set', cost: 600 },
  { name: 'Beginner telescope or starter drone', cost: 800 },
  // Self-sufficiency life-skill wins (near-free for the parent)
  { name: 'Choose and plant something in the garden', cost: 40, note: 'Life skill' },
  { name: 'Plan and lead a DIY project', cost: 60, note: 'Life skill' },
  { name: 'Pick and cook one family meal', cost: 60, note: 'Life skill' }
];
