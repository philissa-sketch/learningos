// ---------------------------------------------------------------------------
// THE MONTHLY SUPPLY CRATE — AND WHY IT IS NOT A LOOT BOX.
//
// ---- WHY THIS EXISTS (Aug 16, 2026) ----
//
// Design decision D11, approved months ago and never built: "Mystery crates
// adopted with the parent disable toggle, default on. Monthly, Coins only,
// guaranteed floor, no reroll."
//
// Every clause in that sentence is doing safety work, and it is worth writing
// down what each one prevents, because a crate built without them is a slot
// machine aimed at a twelve-year-old.
//
//   MONTHLY          Twelve a year. There is no loop to fall into.
//   COINS ONLY       Coins buy things that cost his mother nothing. Real money
//                    is never on the other side of a random outcome.
//   GUARANTEED FLOOR The item is always worth at least what the crate cost.
//                    **He cannot lose.** This is the single line that separates
//                    a surprise from a gamble — the thrill is which one, never
//                    whether.
//   NO REROLL        The month's crate is DETERMINISTIC, seeded by the month
//                    itself. Refreshing does not change it, closing the tab
//                    does not change it, and there is nothing to chase.
//
// ---- THE SEED, WHICH IS THE PART THAT COULD GO WRONG QUIETLY ----
//
// Math.random() here would mean a new item on every render — and a boy who
// noticed that would have found a reroll button nobody built. This project has
// made that exact mistake before, in getMasteryMessage() and again in the daily
// missions, and both times the fix was the same: seed from the date.
//
// The seed also includes what he already owns, so the offer moves as his
// collection grows rather than pointing at something he cannot receive.
// ---------------------------------------------------------------------------
import { academyContent } from '../content/academyContent.js';

const { COIN_CATALOG = [] } = academyContent().rewards;

/** What a crate costs. Deliberately below the cheapest guaranteed contents. */
export const CRATE_COST = 250;

/** 'YYYY-MM' — one crate per calendar month, from a LOCAL date string. */
export function crateMonthKey(dateStr) {
  return typeof dateStr === 'string' && dateStr.length >= 7 ? dateStr.slice(0, 7) : '';
}

/** The claim key a ledger entry carries, so a month can only be opened once. */
export function crateSourceKey(monthKey) {
  return `crate:${monthKey}`;
}

/** Small deterministic string hash. Not cryptographic — it only has to be stable. */
function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

/**
 * What this month's crate contains.
 *
 * Only items worth AT LEAST the crate price are eligible — the guaranteed
 * floor, in one filter. Returns null when he already owns everything eligible,
 * and the caller must then refuse to sell him a crate rather than taking his
 * Coins for nothing.
 */
export function crateOfferFor(monthKey, ownedIds = [], catalog = COIN_CATALOG) {
  if (!monthKey) return null;
  const owned = new Set(ownedIds || []);
  const eligible = (catalog || [])
    .filter((i) => i && i.id && !owned.has(i.id) && (Number(i.cost) || 0) >= CRATE_COST)
    .sort((a, b) => String(a.id).localeCompare(String(b.id))); // stable order in, stable pick out
  if (eligible.length === 0) return null;
  return eligible[hash(`${monthKey}|${eligible.length}`) % eligible.length];
}

/** Has this month's crate already been opened? Read from the ledger, not a flag. */
export function crateOpenedIn(monthKey, ledger = []) {
  const key = crateSourceKey(monthKey);
  return (ledger || []).some((e) => e && e.source === key);
}
