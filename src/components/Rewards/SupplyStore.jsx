import { useMemo, useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { MISSION_EQUIPMENT, AVATAR_GEAR, HQ_ITEMS, affordable } from '../../academies/lamar/data/rewardCatalog.js';
import { playAchievement, playCrate, unlockAudio } from '../../lib/sfx.js';

// ---------------------------------------------------------------------------
// MISSION SUPPLY — equipment, avatar gear, and the Mission Control HQ.
// (Part 10, built Aug 8, 2026.)
//
// Forty-four items bought with COINS, so none of it costs a parent anything and
// none of it ever waits for approval. That split is deliberate: the fun half of
// the economy should not be rationed by someone else's calendar, and the half
// that spends real money is separately gated.
//
// Ownership reuses `unlockedCosmetics` rather than adding an inventory table.
// It is already an id list, it already merges, and it is already in the export.
// A second owned-items store would be a second thing to keep in sync for no
// gain — and this project has been bitten twice by exactly that.
// ---------------------------------------------------------------------------

const CATEGORIES = [
  { id: 'equipment', label: 'Mission Equipment', accent: 'text-signal-cyan', items: MISSION_EQUIPMENT },
  { id: 'gear', label: 'Avatar Gear', accent: 'text-signal-green', items: AVATAR_GEAR },
  { id: 'hq', label: 'Mission Control HQ', accent: 'text-signal-amber', items: HQ_ITEMS }
];

function SupplyCard({ item, owned, canAfford, onBuy }) {
  return (
    <div
      className={
        'rounded-xl border p-3 shadow-panel ' +
        (owned ? 'border-signal-green/40 bg-signal-green/5' : 'border-space-700 bg-space-900')
      }
    >
      <div className="flex items-start gap-2">
        <span className="text-xl">{item.icon}</span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-sm font-700 text-ink-100">{item.name}</p>
          <p className="text-[11px] text-signal-amber">{owned ? 'Owned' : `🪙 ${item.cost}`}</p>
        </div>
      </div>

      {item.desc && <p className="mt-2 text-[11px] leading-relaxed text-ink-500">{item.desc}</p>}

      <div className="mt-2">
        {owned ? (
          <div className="rounded-lg border border-signal-green/40 bg-signal-green/10 py-1.5 text-center font-display text-xs font-700 text-signal-green">
            In inventory
          </div>
        ) : (
          <button
            type="button"
            disabled={!canAfford}
            onClick={() => onBuy(item)}
            className={
              'w-full rounded-lg py-1.5 font-display text-xs font-700 transition ' +
              (canAfford
                ? 'bg-signal-cyan text-space-950 hover:brightness-110'
                : 'border border-space-700 text-ink-600')
            }
          >
            {canAfford ? 'Buy' : `Need 🪙 ${item.cost}`}
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * THE MONTHLY SUPPLY CRATE.
 *
 * Design decision D11, approved months ago and never built. The safety is all
 * in lib/supplyCrate.js — monthly, Coins only, a guaranteed floor so he cannot
 * lose, and a deterministic month-seeded item so there is nothing to reroll.
 *
 * What this component has to get right is the TELLING. It says the floor out
 * loud, before he opens it: "always worth at least what it costs." A surprise
 * he knows he cannot lose on is a different experience from one he hopes he
 * won't — and only one of them is fair to sell a twelve-year-old.
 *
 * No countdown, per D10. "Next month" is a fact; a ticking clock is pressure.
 */
function SupplyCrateCard() {
  const getSupplyCrate = useAppStore((s) => s.getSupplyCrate);
  const openSupplyCrate = useAppStore((s) => s.openSupplyCrate);
  const ledger = useAppStore((s) => s.ledger);
  const unlocked = useAppStore((s) => s.unlockedCosmetics);
  const [revealed, setRevealed] = useState(null);

  // ledger + unlocked are selected so this re-renders the moment it is opened.
  // ledger and unlockedCosmetics are selected purely so this component
  // re-renders when they change — getSupplyCrate reads from get() itself. A
  // Zustand getter's reference never changes, so without these two selectors
  // the card would still say "not opened" after he opened it.
  void ledger; void unlocked;
  const crate = getSupplyCrate();
  if (!crate.enabled) return null;

  const open = async () => {
    unlockAudio();
    const res = await openSupplyCrate();
    if (res.ok) { setRevealed(res.item); playCrate(); }
  };

  return (
    <div className="mb-4 rounded-xl border border-signal-amber/40 bg-signal-amber/5 p-5 shadow-panel">
      <p className="text-xs font-display uppercase tracking-widest text-signal-amber">Supply Crate</p>
      <h3 className="mt-1 font-display text-lg font-700 text-ink-100">
        {crate.opened ? "This month's crate is open" : 'One crate a month'}
      </h3>

      {revealed && (
        <div className="mt-3 rounded-lg border border-signal-green/40 bg-signal-green/5 p-3">
          <p className="text-[10px] font-display uppercase tracking-widest text-signal-green">You got</p>
          <p className="mt-0.5 font-display text-base font-700 text-ink-100">
            {revealed.icon} {revealed.name}
          </p>
          <p className="text-xs text-ink-400">{revealed.desc}</p>
        </div>
      )}

      {!crate.opened && !revealed && (
        <>
          <p className="mt-2 text-sm text-ink-300">
            One piece of equipment, picked for this month. You will not know which until you open it —
            but it is <strong className="text-ink-100">always worth at least the {crate.cost} Coins it
            costs</strong>, so you cannot lose on it. One per month, and it is the same crate however
            many times you look.
          </p>
          {crate.soldOut ? (
            <p className="mt-3 text-sm text-ink-400">
              You already own everything a crate could give you. Nothing to sell you.
            </p>
          ) : (
            <button
              type="button"
              onClick={open}
              disabled={!crate.canAfford}
              className={
                'mt-3 rounded-lg px-4 py-2 font-display text-sm font-700 transition ' +
                (crate.canAfford
                  ? 'bg-signal-amber text-space-950 hover:brightness-110'
                  : 'border border-space-700 text-ink-600')
              }
            >
              {crate.canAfford ? `Open — ${crate.cost} Coins` : `Need ${crate.cost} Coins`}
            </button>
          )}
        </>
      )}

      {crate.opened && !revealed && (
        <p className="mt-2 text-sm text-ink-400">
          You opened it this month. The next one is in {"next month's"} supply drop — no rush, it will
          be there.
        </p>
      )}
    </div>
  );
}

export function SupplySection() {
  const unlocked = useAppStore((s) => s.unlockedCosmetics);
  const ledger = useAppStore((s) => s.ledger);
  const xp = useAppStore((s) => s.xp);
  const getCoinBalance = useAppStore((s) => s.getCoinBalance);
  const redeemCosmetic = useAppStore((s) => s.redeemCosmetic);
  const [msg, setMsg] = useState(null);
  const [onlyAffordable, setOnlyAffordable] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const coinBalance = useMemo(() => getCoinBalance(), [getCoinBalance, ledger, xp]);

  const owns = (item) => (unlocked || []).includes(item.id);

  const buy = async (item) => {
    unlockAudio();
    const res = await redeemCosmetic(item);
    if (res.ok) {
      playAchievement();
      setMsg(`${item.name} added to your inventory.`);
    } else {
      setMsg(res.reason === 'already-owned' ? 'You already own that one.' : 'Not enough coins yet — keep going!');
    }
  };

  const allItems = useMemo(() => CATEGORIES.flatMap((c) => c.items), []);

  /**
   * "What can I afford?" — the budgeting view.
   *
   * Cheapest-first, deliberately. Expensive-first reads as an upsell, and this
   * feature exists to teach him to plan a purchase, not to move inventory.
   */
  const affordableNow = useMemo(
    () => affordable(coinBalance, allItems.map((i) => ({ ...i, currency: 'coin' }))),
    [coinBalance, allItems]
  );

  return (
    <div className="space-y-5">
      {msg && (
        <div className="rounded-lg border border-signal-cyan/40 bg-signal-cyan/10 px-3 py-2 text-sm text-ink-100">{msg}</div>
      )}

      <SupplyCrateCard />

      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-space-700 bg-space-900 p-3">
        <div>
          <p className="font-display text-xs uppercase tracking-widest text-signal-cyan">Mission Supply</p>
          <p className="text-[11px] text-ink-500">
            {affordableNow.length > 0
              ? `${affordableNow.length} item${affordableNow.length === 1 ? '' : 's'} you can afford right now.`
              : 'Nothing in range yet — the cheapest item is 🪙 50.'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOnlyAffordable((v) => !v)}
          className={
            'rounded-lg px-3 py-1.5 font-display text-xs font-700 transition ' +
            (onlyAffordable
              ? 'bg-signal-cyan/15 text-signal-cyan'
              : 'border border-space-700 text-ink-300 hover:text-ink-100')
          }
        >
          {onlyAffordable ? 'Showing what I can afford' : 'What can I afford?'}
        </button>
      </div>

      {CATEGORIES.map((cat) => {
        const items = onlyAffordable
          ? cat.items.filter((i) => i.cost <= coinBalance && !owns(i))
          : cat.items;
        if (onlyAffordable && items.length === 0) return null;
        return (
          <div key={cat.id}>
            <p className={`text-xs font-display uppercase tracking-widest ${cat.accent}`}>{cat.label}</p>
            <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {items.map((item) => (
                <SupplyCard
                  key={item.id}
                  item={item}
                  owned={owns(item)}
                  canAfford={coinBalance >= item.cost}
                  onBuy={buy}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
