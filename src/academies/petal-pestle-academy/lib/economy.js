// ---------------------------------------------------------------------------
// THE PETAL & PESTLE ECONOMY — two currencies, one append-only ledger.
//
// Structurally this is her brother's Mission Control economy (lib/economy.js
// there): passive earning derived from a monotonic counter, discrete events in
// a ledger that merges by union, balance folded from both and never stored.
// That design solved two real problems in his app — a parent with no way to
// grant or deduct, and two computers that could not reconcile a "spent" total —
// and both problems are identical here.
//
// ONE THING IS DELIBERATELY DIFFERENT, AND IT IS THE WHOLE POINT.
//
// His app pays for XP, and XP comes from correct answers. That is right for a
// teaching app. It would be wrong here, and the parent chose the alternative
// explicitly.
//
// This app's main activity is a DIAGNOSTIC. If correct answers pay, a bright
// nine-year-old works out inside one sitting that hard questions cost her money
// — and the rational response is to guess safe, rush the strands she finds
// difficult, and stop trying on anything unfamiliar. At that point the
// assessment is measuring her strategy rather than her knowledge, and the
// gaps it exists to find are the exact things it stops being able to see.
//
// So NOTHING in this file pays for being right. Every earning rule below counts
// effort: questions answered, strands finished, sittings completed, days she
// came back. A wrong answer earns exactly what a right one earns. She can be
// told that, truthfully, and it costs the measurement nothing.
//
// When the Herbalism lessons are built (Phase 3), accuracy-based earning
// belongs there — a lesson is a place where being right is the goal. Add it
// there. Do not add it here.
// ---------------------------------------------------------------------------

/**
 * 🌸 PETALS — the fun currency. Earned quickly, spent in the Petal Market on
 * things that cost a grown-up nothing: greenhouse decorations, apron and
 * avatar pieces, jars for her shelf. Never needs anyone's permission.
 *
 * 🌟 GOLDEN SEEDS — the scarce one. Real time or real money sits behind every
 * seed, so they buy real-world rewards and always involve a grown-up.
 *
 * WHY TWO. With one currency she faces "cute watering can, or save toward the
 * botanical garden trip?" every single week. A sensible nine-year-old picks the
 * trip every time, and every decoration in the app goes untouched forever — or
 * she spends impulsively and never saves, which loses the part of this that
 * teaches saving. Two currencies let her play freely AND save deliberately,
 * without either one eating the other.
 */
export const CURRENCIES = {
  petal: { id: 'petal', name: 'Petals', short: 'Petals', icon: '🌸' },
  seed: { id: 'seed', name: 'Golden Seeds', short: 'Seeds', icon: '🌟' }
};

export const CURRENCY_IDS = ['petal', 'seed'];

/**
 * EARNING RATES — effort only. Read the header above before changing any of
 * these, and never add a rule keyed on `correct`.
 *
 * The four counters below are all MONOTONIC: they only ever go up, so the
 * passive half of the balance merges across two computers by taking the max,
 * exactly like XP does in her brother's app. A counter that could go down
 * (a current streak, say) would let a balance shrink after a merge and is the
 * reason `daysActive` counts total days rather than the streak.
 */
export const EARN_RATES = {
  /** Every question she answers. Right or wrong — identical. */
  perQuestion: { petal: 1, seed: 0 },
  /** Every strand the diagnostic finishes measuring. */
  perStrandSettled: { petal: 10, seed: 0 },
  /** Every full sitting completed. Rewards coming back and doing a proper
   *  block rather than answering two questions a day for a month. */
  perSitting: { petal: 5, seed: 0 },
  /** Every distinct day she opens it and answers something. */
  perDayActive: { petal: 5, seed: 0 }
};

/**
 * THE RATES BEFORE THE v3.12 REBALANCE. Frozen, and never edited again.
 *
 * Kept because her balance is COMPUTED from these counters rather than stored.
 * Lowering a rate does not just change what she earns next — it retroactively
 * reduces what she already has. Without this table to compare against, the
 * rebalance would have quietly taken about 350 petals and 200 seeds off a child
 * who had done nothing wrong.
 *
 * `legacyTopUp()` below uses it once, to grandfather her existing balance.
 */
export const LEGACY_EARN_RATES = Object.freeze({
  perQuestion: { petal: 4, seed: 2 },
  perStrandSettled: { petal: 35, seed: 10 },
  perSitting: { petal: 20, seed: 6 },
  perDayActive: { petal: 12, seed: 4 }
});

/**
 * FINISHING THE CHECK-IN. One flat bonus, paid once, when every strand settles.
 *
 * The old design paid per question, which made a sixty-question placement test
 * the single biggest earning event of the year — 715 petals and 260 seeds, against
 * 30 petals and no seeds for a full week of actual school. Gigi's words: "she
 * seems to have received awards for not doing anything."
 *
 * She is still paid properly for sitting it, because it is long and it is dull
 * and finishing it is a real thing. It is just no longer worth more than a term.
 */
export const DIAGNOSTIC_COMPLETE_BONUS = { petal: 100, seed: 60 };

/**
 * What a complete diagnostic is worth under the v3.12 rates, against the real
 * run length (~60 questions, 9 strands, ~5 sittings, ~5 days):
 *
 *   Petals:  60 + 90 + 25 + 25 = 200, plus the 100 completion bonus  =  ~300
 *   Seeds:   0                       plus the  60 completion bonus  =    60
 *
 * Against a full school year — 96 lessons, 32 weekly tests, 4 exams, 16 projects
 * and the daily warm-up — which is about 2,100 petals and 316 seeds.
 *
 * That ratio is the point. Before the rebalance the Check-In was 32% of every
 * petal she would earn all year and 100% of every seed. Now the year is roughly
 * seven times the Check-In in petals and five times in seeds, and SEEDS ARE
 * EARNABLE BY DOING SCHOOL, which they simply were not before.
 *
 * Both catalogues were priced against the old numbers. verify-economy checks the
 * new ones against them, so if a rate moves here, that check will say so.
 */
export function projectedEarnings(questions = 60, strands = 9, sittings = 5, days = 5) {
  const total = { petal: 0, seed: 0 };
  for (const c of CURRENCY_IDS) {
    total[c] =
      questions * EARN_RATES.perQuestion[c] +
      strands * EARN_RATES.perStrandSettled[c] +
      sittings * EARN_RATES.perSitting[c] +
      days * EARN_RATES.perDayActive[c];
  }
  return total;
}

/** Passive earning from the four monotonic effort counters. */
export function earnedFromEffort(counters, currencyId) {
  if (!CURRENCIES[currencyId]) return 0;
  const c = counters || {};
  const n = (v) => Math.max(0, Math.floor(Number(v) || 0));
  return (
    n(c.questionsAnswered) * EARN_RATES.perQuestion[currencyId] +
    n(c.strandsSettled) * EARN_RATES.perStrandSettled[currencyId] +
    n(c.sittingsCompleted) * EARN_RATES.perSitting[currencyId] +
    n(c.daysActive) * EARN_RATES.perDayActive[currencyId]
  );
}

/** A readable breakdown for the "where did my Petals come from?" panel. Children
 *  ask this, and a currency that cannot explain itself is not teaching anything. */
export function earningBreakdown(counters, currencyId) {
  const c = counters || {};
  const n = (v) => Math.max(0, Math.floor(Number(v) || 0));
  return [
    {
      label: 'Questions answered',
      count: n(c.questionsAnswered),
      rate: EARN_RATES.perQuestion[currencyId],
      total: n(c.questionsAnswered) * EARN_RATES.perQuestion[currencyId]
    },
    {
      label: 'Strands finished',
      count: n(c.strandsSettled),
      rate: EARN_RATES.perStrandSettled[currencyId],
      total: n(c.strandsSettled) * EARN_RATES.perStrandSettled[currencyId]
    },
    {
      label: 'Sittings completed',
      count: n(c.sittingsCompleted),
      rate: EARN_RATES.perSitting[currencyId],
      total: n(c.sittingsCompleted) * EARN_RATES.perSitting[currencyId]
    },
    {
      label: 'Days you came back',
      count: n(c.daysActive),
      rate: EARN_RATES.perDayActive[currencyId],
      total: n(c.daysActive) * EARN_RATES.perDayActive[currencyId]
    }
  ];
}

// ---------------------------------------------------------------------------
// The ledger
// ---------------------------------------------------------------------------

export const ENTRY_KINDS = {
  spend: 'Purchase',
  refund: 'Refund',
  grant: 'Grown-up bonus',
  deduct: 'Grown-up adjustment',
  reserve: 'Saved toward a goal',
  unreserve: 'Taken back off a goal',
  match: 'Grown-up match'
};

/**
 * A globally unique entry id.
 *
 * MUST NOT be the database's auto-increment. Her entry #12 on one computer and
 * a grown-up's entry #12 on another are different events, and a union merge
 * would collide and silently destroy one of them.
 */
export function newEntryId() {
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
  } catch {
    /* fall through */
  }
  return `e-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/** Build a well-formed entry. `amount` is signed — negative spends. */
export function makeEntry({ currency, amount, kind, source = '', note = '', at = null }) {
  return {
    entryId: newEntryId(),
    currency: CURRENCIES[currency] ? currency : 'petal',
    amount: Math.round(Number(amount) || 0),
    kind: ENTRY_KINDS[kind] ? kind : 'grant',
    source,
    note,
    at: at || new Date().toISOString()
  };
}

/**
 * Sum of entries that MOVE money.
 *
 * `reserve` and `unreserve` are deliberately skipped. Reserving seeds toward a
 * Dream Reward does not destroy them — it makes them unspendable, which is a
 * different thing and has to be modelled as a different thing. Their magnitude
 * lives in `amount` so reservedSeeds() can read it; counting it here as well
 * would take the seeds away twice and quietly punish her for saving.
 */
export const NON_MOVING_KINDS = ['reserve', 'unreserve'];

export function sumEntries(entries, currencyId) {
  let total = 0;
  for (const e of entries || []) {
    if (!e || e.currency !== currencyId) continue;
    if (NON_MOVING_KINDS.includes(e.kind)) continue;
    total += Number(e.amount) || 0;
  }
  return total;
}

/**
 * Spendable balance.
 *
 * Clamped at zero for SPENDING while the ledger itself stays truthful — a
 * grown-up deduction larger than the balance is recorded honestly and simply
 * leaves nothing to spend, rather than being quietly rounded away.
 */
export function balanceFor(entries, currencyId, counters) {
  return Math.max(0, earnedFromEffort(counters, currencyId) + sumEntries(entries, currencyId));
}

/** Merge two ledgers by union on entryId. Cannot conflict — that is the point. */
export function mergeLedgers(local, incoming) {
  const byId = new Map();
  for (const e of local || []) if (e && e.entryId) byId.set(e.entryId, e);
  for (const e of incoming || []) if (e && e.entryId && !byId.has(e.entryId)) byId.set(e.entryId, e);
  return [...byId.values()].sort((a, b) => String(a.at).localeCompare(String(b.at)));
}

// ---------------------------------------------------------------------------
// Golden Seeds: approval, saving, matching
// ---------------------------------------------------------------------------

/**
 * Seeds at or under this clear instantly; anything above waits for a grown-up.
 *
 * WHY 25: it sits just under the 60-seed treat tier, which cleanly separates
 * things that cost a grown-up NOTHING — picking the film, staying up half an
 * hour, choosing dinner — from anything involving money or the car. A reward
 * can also be cheap and STILL need a yes; see `requiresGrownUp` on the reward
 * itself. Price answers the budget question, the flag answers the judgement
 * one, and a reward is never expensive AND unsupervised.
 */
export const SEED_AUTO_APPROVE_MAX = 25;

/** Ceiling on instantly-cleared seeds in any 7 days, so she cannot stack five
 *  late bedtimes into one week without anyone noticing. */
export const SEED_AUTO_APPROVE_WEEKLY_CAP = 50;

/**
 * THE SEED MATCH — a grown-up adds 1 seed for every 4 she RESERVES toward her
 * Dream Reward.
 *
 * Three things at once: it makes the top of the ladder genuinely reachable
 * (she saves 400, the grown-ups cover 100); it rewards committed saving rather
 * than raw earning, which is the harder and more useful habit; and it teaches
 * her what an employer match and compounding feel like by direct experience,
 * years before anyone sits her down and explains either.
 */
export const SEED_MATCH_RATE = 0.25;

export function seedMatchFor(reservedSeeds) {
  return Math.floor(Math.max(0, reservedSeeds) * SEED_MATCH_RATE);
}

/** Seeds auto-approved in the 7 days ending now, for the weekly cap. */
export function autoApprovedSeedsThisWeek(entries, nowIso = null) {
  const now = nowIso ? new Date(nowIso) : new Date();
  const cutoff = new Date(now.getTime() - 7 * 864e5).toISOString();
  let total = 0;
  for (const e of entries || []) {
    if (e && e.currency === 'seed' && e.kind === 'spend' && e.source === 'auto' && e.at >= cutoff) {
      total += Math.abs(Number(e.amount) || 0);
    }
  }
  return total;
}

/**
 * Can this seed purchase clear without a grown-up?
 * `reason` is shown to her when it cannot, so a wait never looks like a bug.
 */
export function seedPurchaseApproval(cost, entries, options = {}) {
  if (options.requiresGrownUp) {
    return {
      auto: false,
      reason: 'This one takes real time or money, so a grown-up says yes to it.'
    };
  }
  if (cost > SEED_AUTO_APPROVE_MAX) {
    return {
      auto: false,
      reason: `Over ${SEED_AUTO_APPROVE_MAX} seeds — a grown-up approves this one.`
    };
  }
  const used = autoApprovedSeedsThisWeek(entries);
  if (used + cost > SEED_AUTO_APPROVE_WEEKLY_CAP) {
    return {
      auto: false,
      reason: `That would pass this week's ${SEED_AUTO_APPROVE_WEEKLY_CAP}-seed instant limit — a grown-up approves this one.`
    };
  }
  return { auto: true, reason: '' };
}

/** How many seeds are currently tied up in her Dream Goal and cannot be spent. */
export function reservedSeeds(entries) {
  let total = 0;
  for (const e of entries || []) {
    if (!e || e.currency !== 'seed') continue;
    if (e.kind === 'reserve') total += Math.abs(Number(e.amount) || 0);
    if (e.kind === 'unreserve') total -= Math.abs(Number(e.amount) || 0);
  }
  return Math.max(0, total);
}

/** Cheapest first, deliberately. Expensive-first reads as an upsell, and this
 *  view exists to help her plan a purchase, not to move inventory. */
export function affordable(balance, items) {
  return (items || [])
    .filter((i) => Number(i.cost) <= balance)
    .sort((a, b) => a.cost - b.cost);
}

/**
 * The one-time grandfathering entry, in each currency.
 *
 * Returns how many of each currency she must be GIVEN so that the v3.12 rates do
 * not retroactively shrink a balance she already earned. Zero or negative means
 * nothing is owed and nothing is written.
 *
 * Called once, guarded by a meta flag, the first time the app runs under the new
 * rates. It is deliberately a real ledger entry rather than a hidden adjustment,
 * so the Grown-Up Corner shows exactly what happened and why.
 */
export function legacyTopUp(counters) {
  const c = counters || {};
  const n = (v) => Math.max(0, Math.floor(Number(v) || 0));
  const out = {};
  for (const id of CURRENCY_IDS) {
    const before =
      n(c.questionsAnswered) * LEGACY_EARN_RATES.perQuestion[id] +
      n(c.strandsSettled) * LEGACY_EARN_RATES.perStrandSettled[id] +
      n(c.sittingsCompleted) * LEGACY_EARN_RATES.perSitting[id] +
      n(c.daysActive) * LEGACY_EARN_RATES.perDayActive[id];
    const after = earnedFromEffort(c, id);
    out[id] = Math.max(0, before - after);
  }
  return out;
}
