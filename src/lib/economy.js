// ---------------------------------------------------------------------------
// The Mission Control economy — two currencies, one append-only ledger.
// (Part 10, built Aug 8, 2026.)
//
// ---- WHY A LEDGER AND NOT A RUNNING TOTAL ----
//
// The old balance was `floor(xp / 5) - coinsSpent`, with coinsSpent stored as a
// single number. That has two fatal problems here:
//
//   1. THE PARENT COULD NOT TOUCH IT. There was nowhere to put a bonus, a
//      deduction, a refund, or a challenge payout, which silently made about a
//      third of the parent-control spec impossible to build.
//
//   2. IT CANNOT SURVIVE TWO COMPUTERS. This project's data moves between the
//      parent's machine and the student's as a JSON export. Two machines cannot
//      reconcile "spent: 340" against "spent: 290" — one of those numbers is
//      wrong no matter which you keep, and either purchases get double-counted
//      or some vanish. There is no third option.
//
// An append-only ledger fixes both. Every discrete money event is a row with a
// globally unique id, so merging two machines is a UNION of two lists — an
// operation that cannot conflict. Balance is FOLDED from the rows and never
// stored, so it cannot drift from the events that produced it.
//
// ---- WHY EARNING IS STILL DERIVED FROM XP ----
//
// Passive earning is deliberately NOT a ledger entry per lesson. XP is already
// monotonic (it only ever goes up) and already merges correctly by taking the
// max, so deriving the earned side from XP is safe across machines and avoids
// emitting thousands of rows and touching all ~24 places that award XP.
//
//   balance = floor(xp / rate)  +  sum of ledger entries
//             \_____________/     \____________________/
//              passive, merges     discrete events, merge
//              by max              by union
//
// Both halves are merge-safe, which is the whole requirement.
// ---------------------------------------------------------------------------

/**
 * 🪙 Mission Coins — the fun currency. Earned twice as fast as Credits and
 * spent on things that cost the parent nothing: avatars, HQ items, Nova voice
 * packs, mystery crates.
 *
 * 🎟️ Mission Credits — the scarce one. Real money or real time sits behind
 * every Credit, so they buy real-world rewards, experiences and Dream Rewards.
 *
 * WHY TWO. With a single currency the student faces "cosmetic helmet, or save
 * toward the LEGO set?" every week. A sensible 12-year-old picks the LEGO set
 * every time — and every cosmetic ever built goes untouched. Or he spends
 * impulsively and never saves, which kills the financial-literacy purpose this
 * whole system was asked for. Splitting them lets him play freely AND learn to
 * save, without those two goals eating each other.
 */
export const XP_PER_COIN = 2;
export const XP_PER_CREDIT = 5;

export const CURRENCIES = {
  coin: { id: 'coin', name: 'Mission Coins', short: 'Coins', icon: '🪙', xpPer: XP_PER_COIN },
  credit: { id: 'credit', name: 'Mission Credits', short: 'Credits', icon: '🎟️', xpPer: XP_PER_CREDIT }
};

export const CURRENCY_IDS = ['coin', 'credit'];

/** Ledger entry kinds. `sign` documents the direction each one moves. */
export const ENTRY_KINDS = {
  opening: 'Opening balance',
  spend: 'Purchase',
  refund: 'Refund',
  grant: 'Parent bonus',
  deduct: 'Parent adjustment',
  challenge: 'Challenge reward',
  crate: 'Supply crate',
  match: 'Dream Match'
};

/**
 * The Credit ladder, priced against MEASURED earning (~50-95 Credits in a
 * four-day school week, ~1,800-3,400 a year).
 *
 * The parent's original ladder topped out at 20,000, which at real earn rates
 * is a six-to-ten-year goal — it would have sat greyed out forever. These
 * numbers give one Dream Reward a year and one solid reward a quarter, which
 * is a rhythm a 12-year-old can actually feel.
 */
export const CREDIT_LADDER = [
  { credits: 50, tier: 'Small privilege', example: 'Extra screen time, later bedtime, pick the movie', pace: 'Twice a month' },
  { credits: 150, tier: 'Treat or outing', example: 'Ice cream, friend over, pick the weekend', pace: 'Every 2-3 weeks' },
  { credits: 400, tier: 'Book or small kit', example: 'A book, model kit, maker supplies', pace: 'Monthly' },
  { credits: 800, tier: 'Bigger reward', example: 'LEGO set, science kit, bowling day', pace: 'Quarterly' },
  { credits: 1500, tier: 'Big day out', example: 'Museum day, large build set', pace: 'Twice a year' },
  { credits: 2000, tier: 'Dream Reward', example: 'Delta Flight Museum, model-rocket launch day, telescope', pace: 'Once a year' }
];

/**
 * Credits at or under this auto-approve; above it needs a parent.
 *
 * WHY 100: it sits just below the 150 outing tier, which cleanly separates
 * things that cost the parent NOTHING (screen time, bedtime, movie pick, chore
 * trade) from things that cost money or a car trip. It also matters more than
 * it looks on two computers: approvals travel at the speed of the export
 * round-trip, so anything needing approval may wait days. Small privileges
 * clearing instantly is what keeps the loop connected to the work.
 */
export const CREDIT_AUTO_APPROVE_MAX = 100;

/** Ceiling on auto-approved Credits per week, so he can't stack privileges. */
export const CREDIT_AUTO_APPROVE_WEEKLY_CAP = 150;

/**
 * Dream Match — the parent adds 1 Credit for every 4 the student RESERVES
 * toward a Dream Goal.
 *
 * Three things at once: it makes the annual reward reachable (he saves 1,600,
 * the parent covers 400); it rewards committed saving rather than raw earning;
 * and it teaches employer-match and compounding by direct experience, years
 * before anyone formally explains either.
 */
export const DREAM_MATCH_RATE = 0.25;

export function dreamMatchFor(reservedCredits) {
  return Math.floor(Math.max(0, reservedCredits) * DREAM_MATCH_RATE);
}

/**
 * Opening Credits when the Marketplace first launches: one-tenth the ongoing
 * rate, capped at 100, floor of 25.
 *
 * The cap does the real work — it keeps him below the 150 outing tier no
 * matter how much XP he has banked, so his first real outing is still
 * something he saves for. Without it, a large history would hand him the
 * lesson's answer on day one.
 *
 * Tell him the rate. He wants to be an engineer and there is a real chance he
 * works out the discrepancy himself; "work you did before the store opened
 * still counts, just at a tenth" is a rule he can trust, and systems a kid
 * trusts are the ones he keeps playing.
 */
export function openingCredits(historicalXp) {
  const raw = Math.floor(Math.max(0, historicalXp || 0) / 50);
  return Math.max(25, Math.min(100, raw));
}

/** Passive earning, derived from XP. Monotonic, so it merges by max. */
export function earnedFromXp(xp, currencyId) {
  const c = CURRENCIES[currencyId];
  if (!c) return 0;
  return Math.floor(Math.max(0, xp || 0) / c.xpPer);
}

/**
 * A globally unique entry id.
 *
 * MUST NOT be Dexie's `++id` auto-increment. His entry #47 and the parent's
 * entry #47 are different events on different machines, and a union merge
 * would collide and silently destroy one of them. crypto.randomUUID is
 * available in every modern browser on a secure origin (localhost counts);
 * the fallback covers anything older.
 */
export function newEntryId() {
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  } catch {
    /* fall through */
  }
  return `e-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

const DEVICE_KEY = 'mc.device.v1';

/**
 * A stable per-machine tag, so the earn history can say WHERE an entry came
 * from and a merge is auditable. Deliberately in localStorage rather than the
 * database: it identifies the computer, not the student, and must never travel
 * in the export.
 */
export function getDeviceTag() {
  try {
    let tag = localStorage.getItem(DEVICE_KEY);
    if (!tag) {
      tag = `d-${Math.random().toString(36).slice(2, 8)}`;
      localStorage.setItem(DEVICE_KEY, tag);
    }
    return tag;
  } catch {
    return 'd-unknown';
  }
}

/** Build a well-formed ledger entry. Amount is signed: negative spends. */
export function makeEntry({ currency, amount, kind, source = '', note = '', at = null }) {
  return {
    entryId: newEntryId(),
    currency: CURRENCIES[currency] ? currency : 'coin',
    amount: Math.round(Number(amount) || 0),
    kind: ENTRY_KINDS[kind] ? kind : 'grant',
    source,
    note,
    at: at || new Date().toISOString(),
    device: getDeviceTag()
  };
}

/** Sum of ledger entries for one currency. */
export function sumEntries(entries, currencyId) {
  let total = 0;
  for (const e of entries || []) {
    if (e && e.currency === currencyId) total += Number(e.amount) || 0;
  }
  return total;
}

/**
 * Spendable balance for one currency.
 *
 * Clamped at zero for SPENDING while the ledger itself stays truthful — a
 * parent deduction larger than the balance is recorded honestly and simply
 * leaves nothing to spend, rather than being quietly rounded away.
 */
export function balanceFor(entries, currencyId, xp) {
  return Math.max(0, earnedFromXp(xp, currencyId) + sumEntries(entries, currencyId));
}

/** Merge two ledgers by union on entryId. Cannot conflict — that is the point. */
export function mergeLedgers(local, incoming) {
  const byId = new Map();
  for (const e of local || []) if (e && e.entryId) byId.set(e.entryId, e);
  for (const e of incoming || []) if (e && e.entryId && !byId.has(e.entryId)) byId.set(e.entryId, e);
  return [...byId.values()].sort((a, b) => String(a.at).localeCompare(String(b.at)));
}

/** Credits auto-approved in the 7 days ending now, for the weekly cap. */
export function autoApprovedCreditsThisWeek(entries, nowIso = null) {
  const now = nowIso ? new Date(nowIso) : new Date();
  const cutoff = new Date(now.getTime() - 7 * 864e5).toISOString();
  let total = 0;
  for (const e of entries || []) {
    if (e && e.currency === 'credit' && e.kind === 'spend' && e.source === 'auto' && e.at >= cutoff) {
      total += Math.abs(Number(e.amount) || 0);
    }
  }
  return total;
}

/**
 * Can this Credit purchase clear without a parent?
 * Returns { auto, reason } — `reason` is shown to the student when it can't.
 */
export function creditPurchaseApproval(cost, entries, options = {}) {
  /**
   * A parent's yes is required by KIND as well as by price (Aug 9, 2026).
   *
   * The price line alone was doing two jobs and only one of them well. It is a
   * BUDGET control — how many Credits can clear in a week without her — and it
   * was also, silently, the only thing deciding whether something needed a
   * parent at all. So when three items involving real money or the car were
   * seeded below the line (weekend outing 90, smoothie 80, friend over 80),
   * the app cheerfully cleared a trip out of the house with nobody asked.
   *
   * Tier now answers the judgment question and price still answers the budget
   * one. A reward can be cheap and still need her; it can never be expensive
   * and not need her. See TIERS_REQUIRING_PARENT in data/rewardCatalog.js.
   */
  if (options.requiresParent) {
    return { auto: false, reason: 'This one costs real time or money — a parent says yes to it.' };
  }
  if (cost > CREDIT_AUTO_APPROVE_MAX) {
    return { auto: false, reason: `Over ${CREDIT_AUTO_APPROVE_MAX} Credits — a parent approves this one.` };
  }
  const used = autoApprovedCreditsThisWeek(entries);
  if (used + cost > CREDIT_AUTO_APPROVE_WEEKLY_CAP) {
    return { auto: false, reason: `That would pass this week's ${CREDIT_AUTO_APPROVE_WEEKLY_CAP}-Credit instant limit — a parent approves this one.` };
  }
  return { auto: true, reason: '' };
}
