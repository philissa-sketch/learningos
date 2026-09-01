// ---------------------------------------------------------------------------
// GOLDEN SEED REWARDS — the real-world half.
//
// Every seed spent here costs a grown-up real time, real money, or both. So
// this catalogue is EDITABLE BY DESIGN: the rewards below are a starting
// ladder, not a fixed menu. A grown-up can add, remove and re-price rewards
// from the Grown-Up Corner without touching code, and those live edits are
// stored in the database and override this file. This is the default list she
// sees on day one.
//
// PRICED FOR A NINE-YEAR-OLD, and lower than her brother's ladder on purpose.
// His tops out at 2,000 Credits — a year of saving, which is the right horizon
// for a twelve-year-old and far too long for a nine-year-old, for whom "next
// year" is not a real place. A full diagnostic yields roughly 232 seeds (see
// projectedEarnings in lib/economy.js), so finishing the whole assessment
// reaches the 200-seed tier once. One real reward for finishing the thing. The
// 500-seed Dream Reward needs saving across the diagnostic AND the lessons that
// follow, which is what makes the Seed Match worth having.
//
// `requiresGrownUp: true` means a grown-up says yes REGARDLESS of price. Cheap
// and still needing permission is a normal, sensible combination — a trip to
// the library costs nothing and still needs somebody to drive. Getting this
// wrong is how an app cheerfully clears an outing with nobody asked, which is
// exactly what happened in her brother's app before the flag existed.
// ---------------------------------------------------------------------------

export const SEED_TIERS = [
  {
    id: 'privilege',
    seeds: 25,
    label: 'Small privilege',
    blurb: 'Costs nobody anything. Clears instantly.',
    pace: 'About once a week'
  },
  {
    id: 'treat',
    seeds: 60,
    label: 'A treat',
    blurb: 'Small, and someone has to say yes.',
    pace: 'Every two weeks or so'
  },
  {
    id: 'outing',
    seeds: 120,
    label: 'Outing or small thing',
    blurb: 'Needs a grown-up and probably the car.',
    pace: 'Monthly'
  },
  {
    id: 'real',
    seeds: 200,
    label: 'Something real',
    blurb: 'A thing that lasts. Roughly what finishing the whole Check-In earns.',
    pace: 'Every couple of months'
  },
  {
    id: 'big',
    seeds: 350,
    label: 'A big one',
    blurb: 'Worth saving several weeks for.',
    pace: 'Twice a year'
  },
  {
    id: 'dream',
    seeds: 500,
    label: 'Dream Reward',
    blurb: 'The one to save toward. Grown-ups add 1 seed for every 4 you save.',
    pace: 'Once a year'
  }
];

/** Tiers where a grown-up is required by JUDGEMENT, not just by price. */
export const TIERS_REQUIRING_GROWNUP = ['treat', 'outing', 'real', 'big', 'dream'];

export const DEFAULT_SEED_REWARDS = [
  // ---- 25: costs nobody anything, clears instantly ----
  { id: 'sr-movie', tier: 'privilege', seeds: 25, name: 'Pick the film', icon: '🎬', desc: 'Family film night, your choice, no debate.' },
  { id: 'sr-bedtime', tier: 'privilege', seeds: 25, name: 'Stay up 30 minutes', icon: '🌙', desc: 'One night, half an hour later.' },
  { id: 'sr-dinner', tier: 'privilege', seeds: 25, name: 'Choose dinner', icon: '🍽️', desc: 'You pick what everyone eats.' },
  { id: 'sr-music', tier: 'privilege', seeds: 25, name: 'Pick the music', icon: '🎵', desc: 'The car, the kitchen, a whole afternoon.' },
  { id: 'sr-chore', tier: 'privilege', seeds: 25, name: 'Swap a chore', icon: '🔄', desc: 'Trade one job for one you like better.' },

  // ---- 60: a treat ----
  { id: 'sr-icecream', tier: 'treat', seeds: 60, name: 'Ice cream trip', icon: '🍦', desc: 'Out for it, not from the freezer.' },
  { id: 'sr-snack', tier: 'treat', seeds: 60, name: 'Pick the special snack', icon: '🧁', desc: 'The one you have to ask for.' },
  { id: 'sr-friend-call', tier: 'treat', seeds: 60, name: 'Long call with a friend', icon: '📞', desc: 'A proper one, not five minutes.' },
  { id: 'sr-baking', tier: 'treat', seeds: 60, name: 'Baking afternoon', icon: '🍪', desc: 'You choose the recipe, a grown-up helps.' },

  // ---- 120: outing or small thing ----
  { id: 'sr-library', tier: 'outing', seeds: 120, name: 'Library trip', icon: '📚', desc: 'Stay as long as you want. Take out the limit.' },
  { id: 'sr-craft', tier: 'outing', seeds: 120, name: 'Craft supplies', icon: '🎨', desc: 'Something for a project you have been planning.' },
  { id: 'sr-book', tier: 'outing', seeds: 120, name: 'A book you chose', icon: '📖', desc: 'New, yours, nobody else has read it.' },
  { id: 'sr-friend-over', tier: 'outing', seeds: 120, name: 'Friend comes over', icon: '👭', desc: 'A whole afternoon.' },
  { id: 'sr-nursery', tier: 'outing', seeds: 120, name: 'Trip to the plant nursery', icon: '🪴', desc: 'Walk every aisle. Ask every question.' },

  // ---- 200: something real ----
  { id: 'sr-herb-plant', tier: 'real', seeds: 200, name: 'A herb plant of your own', icon: '🌿', desc: 'Yours to keep alive. Your pot, your windowsill.' },
  { id: 'sr-botany-book', tier: 'real', seeds: 200, name: 'A real field guide', icon: '📗', desc: 'The proper kind, with keys and drawings.' },
  { id: 'sr-loupe', tier: 'real', seeds: 200, name: 'A real hand lens', icon: '🔍', desc: 'Glass, not plastic. The one botanists actually use.' },
  { id: 'sr-press', tier: 'real', seeds: 200, name: 'A flower press', icon: '🌸', desc: 'Start the collection properly.' },

  // ---- 350: a big one ----
  { id: 'sr-microscope', tier: 'big', seeds: 350, name: 'A beginner microscope', icon: '🔬', desc: 'See what the chamomile is really made of.' },
  { id: 'sr-garden-kit', tier: 'big', seeds: 350, name: 'Your own garden bed', icon: '🌱', desc: 'Soil, seeds, tools, and a patch that is yours.' },
  { id: 'sr-day-out', tier: 'big', seeds: 350, name: 'A day out you plan', icon: '🗺️', desc: 'You decide where. A grown-up drives.' },

  // ---- 500: the Dream Reward ----
  { id: 'sr-botanical', tier: 'dream', seeds: 500, name: 'Botanical garden day', icon: '🏞️', desc: 'The Atlanta Botanical Garden, a whole day, with the guidebook.' },
  { id: 'sr-doctor-kit', tier: 'dream', seeds: 500, name: 'Junior doctor kit', icon: '🩺', desc: 'A real stethoscope and the anatomy books to go with it.' },
  { id: 'sr-herbal-course', tier: 'dream', seeds: 500, name: 'A herbalism class', icon: '🎓', desc: 'A proper class for young people, with a real herbalist.' }
];

export function rewardRequiresGrownUp(reward) {
  return TIERS_REQUIRING_GROWNUP.includes(reward?.tier);
}

export function tierFor(tierId) {
  return SEED_TIERS.find((t) => t.id === tierId) || null;
}

/** Live catalogue = the defaults, with any grown-up edits layered on top.
 *  Edits are stored as { removed: [ids], added: [rewards], repriced: {id: seeds} }. */
export function resolveRewards(edits) {
  const e = edits || {};
  const removed = new Set(e.removed || []);
  const repriced = e.repriced || {};
  const base = DEFAULT_SEED_REWARDS.filter((r) => !removed.has(r.id)).map((r) =>
    repriced[r.id] != null ? { ...r, seeds: Number(repriced[r.id]) } : r
  );
  return [...base, ...(e.added || [])].sort((a, b) => a.seeds - b.seeds);
}
