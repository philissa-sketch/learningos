import { useMemo, useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { GreenhouseScene } from './GreenhouseScene.jsx';
import { MarigoldMessage } from '../Mentor/MarigoldMessage.jsx';
import { marketLine } from '../../lib/marigold.js';
import { PETAL_CATEGORIES, ALL_PETAL_ITEMS, CHEAPEST_PETAL_ITEM } from '../../data/rewards/petalCatalog.js';
import { SEED_TIERS, resolveRewards, rewardRequiresGrownUp } from '../../data/rewards/seedRewards.js';
import {
  affordable,
  SEED_AUTO_APPROVE_MAX,
  SEED_MATCH_RATE,
  EARN_RATES
} from '../../lib/economy.js';

// ---------------------------------------------------------------------------
// THE MARKET — 🌸 Petals for things in the app, 🌟 Golden Seeds for things in
// the world.
//
// The one line that has to be on this screen and never come off it: coins are
// earned for WORK DONE, not for right answers. She will notice — children
// always notice how a game pays — and the honest version is the one that keeps
// the Check-In truthful. Saying it plainly is also the whole lesson: showing up
// is the thing that pays.
// ---------------------------------------------------------------------------

function Coin({ currency, amount, size = 'base' }) {
  const icon = currency === 'seed' ? '🌟' : '🌸';
  const cls = size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-xs' : 'text-sm';
  return (
    <span className={`tnum font-700 ${cls}`}>
      {icon} {amount.toLocaleString()}
    </span>
  );
}

function EarningPanel({ currency }) {
  const rows = useAppStore((s) => s.earningBreakdownFor(currency));
  const total = useAppStore((s) => s.totalEarned(currency));
  const label = currency === 'seed' ? 'Golden Seeds' : 'Petals';
  return (
    <div className="panel px-4 py-4">
      <p className="label-caps">Where your {label} came from</p>
      <table className="mt-2 w-full text-left text-xs">
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-b border-cream-300 last:border-0">
              <td className="py-1.5 text-ink-700">{r.label}</td>
              <td className="py-1.5 text-right tnum text-ink-500">
                {r.count} × {r.rate}
              </td>
              <td className="py-1.5 pl-3 text-right tnum font-700 text-ink-900">{r.total}</td>
            </tr>
          ))}
          <tr>
            <td className="pt-2 font-700 text-ink-900" colSpan={2}>
              Earned altogether
            </td>
            <td className="pt-2 text-right tnum font-700 text-ink-900">{total}</td>
          </tr>
        </tbody>
      </table>
      <p className="mt-3 rounded-xl bg-sage-300/30 px-3 py-2 text-[0.72rem] leading-relaxed text-ink-900">
        <span className="font-700">Getting a question wrong pays exactly the same as getting it
        right.</span>{' '}
        Every {label.toLowerCase().slice(0, -1)} on this list came from work you did, not from
        answers you got. That is on purpose — the Check-In can only find what you need if it is
        safe to get things wrong.
      </p>
    </div>
  );
}

function PetalMarket() {
  const balance = useAppStore((s) => s.petalBalance());
  const unlocked = useAppStore((s) => s.unlockedItems);
  const buy = useAppStore((s) => s.buyPetalItem);
  const [msg, setMsg] = useState(null);
  const [onlyAffordable, setOnlyAffordable] = useState(false);

  const owns = (id) => unlocked.includes(id);
  const canBuy = useMemo(
    () => affordable(balance, ALL_PETAL_ITEMS.filter((i) => !owns(i.id))),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [balance, unlocked]
  );

  async function handleBuy(item) {
    const res = await buy(item.id);
    if (res.ok) {
      setMsg(
        res.equipped
          ? `${item.name} is yours — and you are wearing it. Look at "Where it all goes".`
          : `${item.name} is yours. It is in your greenhouse now.`
      );
    }
    else if (res.reason === 'already-owned') setMsg('You already own that one.');
    else setMsg('Not quite enough Petals yet — keep going.');
  }

  return (
    <div className="space-y-5">
      {msg && (
        <div className="rounded-xl border border-sage-500 bg-sage-300/30 px-4 py-2.5 text-sm text-ink-900">
          {msg}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 panel px-4 py-3">
        <div>
          <p className="label-caps">Petal Market</p>
          <p className="text-xs text-ink-700">
            {canBuy.length > 0
              ? `${canBuy.length} thing${canBuy.length === 1 ? '' : 's'} you can afford right now.`
              : `Nothing in range yet — the cheapest is 🌸 ${CHEAPEST_PETAL_ITEM}.`}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOnlyAffordable((v) => !v)}
          className={`rounded-full px-4 py-1.5 text-sm font-700 ${
            onlyAffordable
              ? 'bg-lavender-500 text-white'
              : 'border border-cream-300 bg-white text-ink-700 hover:border-lavender-500'
          }`}
        >
          {onlyAffordable ? 'Showing what I can afford' : 'What can I afford?'}
        </button>
      </div>

      {PETAL_CATEGORIES.map((cat) => {
        const items = onlyAffordable
          ? cat.items.filter((i) => i.cost <= balance && !owns(i.id))
          : cat.items;
        if (items.length === 0) return null;
        return (
          <section key={cat.id}>
            <h3 className="font-display text-lg text-ink-900">{cat.label}</h3>
            <p className="text-xs text-ink-500">{cat.blurb}</p>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {items.map((item) => {
                const owned = owns(item.id);
                const afford = balance >= item.cost;
                return (
                  <div
                    key={item.id}
                    className={`rounded-petal border-2 px-3 py-3 shadow-petal ${
                      owned ? 'border-sage-500 bg-sage-300/25' : 'border-cream-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-2xl leading-none">{item.icon}</span>
                      <div className="min-w-0">
                        <p className="text-[0.8rem] font-700 leading-tight text-ink-900">{item.name}</p>
                        <p className="text-[0.7rem] text-blush-700">
                          {owned ? 'Yours' : `🌸 ${item.cost}`}
                        </p>
                      </div>
                    </div>
                    <p className="mt-2 text-[0.68rem] leading-relaxed text-ink-500">{item.desc}</p>
                    <div className="mt-2.5">
                      {owned ? (
                        <div className="rounded-full bg-sage-500/20 py-1.5 text-center text-[0.7rem] font-700 text-sage-700">
                          On your shelf
                        </div>
                      ) : (
                        <button
                          type="button"
                          disabled={!afford}
                          onClick={() => handleBuy(item)}
                          className={`w-full rounded-full py-1.5 text-[0.75rem] font-700 ${
                            afford
                              ? 'bg-blush-500 text-white hover:bg-blush-700'
                              : 'border border-cream-300 text-ink-500'
                          }`}
                        >
                          {afford ? 'Buy it' : `Need 🌸 ${item.cost - balance} more`}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      <EarningPanel currency="petal" />
    </div>
  );
}

function DreamGoalPanel({ rewards }) {
  const dreamGoalId = useAppStore((s) => s.dreamGoalId);
  const setDreamGoal = useAppStore((s) => s.setDreamGoal);
  const progress = useAppStore((s) => s.dreamGoalProgress());
  const seedBalance = useAppStore((s) => s.seedBalance());
  const reserveToGoal = useAppStore((s) => s.reserveToGoal);
  const unreserveFromGoal = useAppStore((s) => s.unreserveFromGoal);
  const requestDreamGoal = useAppStore((s) => s.requestDreamGoal);
  const requests = useAppStore((s) => s.requests);
  const [amount, setAmount] = useState('');
  const [msg, setMsg] = useState(null);

  const dreamRewards = rewards.filter((r) => r.tier === 'dream');
  const goal = rewards.find((r) => r.id === dreamGoalId) || null;
  const alreadyRequested = requests.some((r) => r.fromGoal && r.status === 'pending');

  if (!goal) {
    return (
      <div className="panel px-4 py-4">
        <p className="label-caps">Dream Reward</p>
        <p className="mt-1 text-sm text-ink-700">
          Pick one big thing to save toward. Once you choose it, grown-ups add{' '}
          <span className="font-700">1 seed for every {Math.round(1 / SEED_MATCH_RATE)} you save</span>{' '}
          toward it.
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {dreamRewards.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setDreamGoal(r.id)}
              className="rounded-petal border-2 border-cream-300 bg-white px-3 py-3 text-left hover:border-gold-500"
            >
              <p className="text-xl leading-none">{r.icon}</p>
              <p className="mt-1.5 text-sm font-700 leading-tight text-ink-900">{r.name}</p>
              <p className="mt-0.5 text-[0.7rem] text-ink-500">{r.desc}</p>
              <p className="mt-1.5 text-xs font-700 text-gold-700">🌟 {r.seeds}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const pct = Math.min(1, progress.total / goal.seeds);
  const short = Math.max(0, goal.seeds - progress.total);

  return (
    <div className="rounded-petal border-2 border-gold-500 bg-gold-300/20 px-4 py-4">
      {msg && <p className="mb-3 rounded-xl bg-white px-3 py-2 text-sm text-ink-900">{msg}</p>}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="label-caps">Dream Reward</p>
          <p className="mt-1 font-display text-xl text-ink-900">
            {goal.icon} {goal.name}
          </p>
          <p className="text-xs text-ink-700">{goal.desc}</p>
        </div>
        <button
          type="button"
          onClick={() => setDreamGoal(null)}
          className="text-xs text-ink-500 underline-offset-2 hover:underline"
        >
          Choose a different one
        </button>
      </div>

      <div className="mt-4 h-4 w-full overflow-hidden rounded-full bg-white">
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold-300 to-gold-500 transition-all duration-500"
          style={{ width: `${Math.round(pct * 100)}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-ink-700">
        <span className="font-700 tnum">{progress.reserved}</span> saved
        {progress.match > 0 && (
          <>
            {' '}+ <span className="font-700 tnum">{progress.match}</span> grown-up match
          </>
        )}{' '}
        = <span className="font-700 tnum">{progress.total}</span> of {goal.seeds}
        {short > 0 && <> · {short} to go</>}
      </p>

      {short === 0 ? (
        alreadyRequested ? (
          <p className="mt-3 rounded-xl bg-white px-3 py-2 text-sm text-ink-900">
            Asked. A grown-up will see it in the Grown-Up Corner.
          </p>
        ) : (
          <button
            type="button"
            onClick={async () => {
              const res = await requestDreamGoal(goal);
              setMsg(res.ok ? 'Asked! A grown-up has to say yes to this one.' : 'Not quite there yet.');
            }}
            className="mt-3 w-full rounded-full bg-gold-500 px-6 py-3 font-700 text-white hover:bg-gold-700"
          >
            🌟 Ask for it
          </button>
        )
      ) : (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <input
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="How many?"
            className="w-32 rounded-full border border-cream-300 bg-white px-4 py-2 text-sm outline-none focus:border-gold-500"
          />
          <button
            type="button"
            onClick={async () => {
              const res = await reserveToGoal(amount);
              setMsg(res.ok ? `Saved ${amount} seeds toward it.` : 'You do not have that many spare seeds.');
              setAmount('');
            }}
            className="rounded-full bg-gold-500 px-5 py-2 text-sm font-700 text-white hover:bg-gold-700"
          >
            Save toward it
          </button>
          {progress.reserved > 0 && (
            <button
              type="button"
              onClick={async () => {
                const res = await unreserveFromGoal(amount);
                setMsg(res.ok ? `Took ${amount} seeds back out.` : 'You have not saved that many.');
                setAmount('');
              }}
              className="rounded-full border border-cream-300 bg-white px-5 py-2 text-sm font-700 text-ink-700"
            >
              Take some back
            </button>
          )}
          <span className="text-xs text-ink-500">🌟 {seedBalance} spare</span>
        </div>
      )}
    </div>
  );
}

function SeedRewards() {
  const balance = useAppStore((s) => s.seedBalance());
  const rewardEdits = useAppStore((s) => s.rewardEdits);
  const requestSeedReward = useAppStore((s) => s.requestSeedReward);
  const requests = useAppStore((s) => s.requests);
  const cancelRequest = useAppStore((s) => s.cancelRequest);
  const [msg, setMsg] = useState(null);

  const rewards = useMemo(() => resolveRewards(rewardEdits), [rewardEdits]);
  const pending = requests.filter((r) => r.status === 'pending');
  const decided = requests.filter((r) => r.status !== 'pending').slice(-6).reverse();

  async function ask(reward) {
    const res = await requestSeedReward(reward);
    if (!res.ok) return setMsg('Not enough seeds for that one yet.');
    setMsg(
      res.auto
        ? `${reward.name} — done! That one clears straight away.`
        : `Asked for ${reward.name}. ${res.reason}`
    );
  }

  return (
    <div className="space-y-5">
      {msg && (
        <div className="rounded-xl border border-gold-500 bg-gold-300/25 px-4 py-2.5 text-sm text-ink-900">
          {msg}
        </div>
      )}

      <DreamGoalPanel rewards={rewards} />

      {pending.length > 0 && (
        <div className="panel px-4 py-4">
          <p className="label-caps">Waiting on a grown-up</p>
          <ul className="mt-2 space-y-2">
            {pending.map((r) => (
              <li key={r.requestId} className="flex flex-wrap items-center gap-2 text-sm">
                <span>{r.icon}</span>
                <span className="flex-1 text-ink-900">{r.name}</span>
                <span className="tnum text-xs text-ink-500">🌟 {r.seeds}</span>
                <button
                  type="button"
                  onClick={() => cancelRequest(r.requestId)}
                  className="text-xs text-ink-500 underline-offset-2 hover:underline"
                >
                  Never mind
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[0.7rem] text-ink-500">
            Your seeds stay yours until a grown-up says yes. Nothing is taken while you wait.
          </p>
        </div>
      )}

      {SEED_TIERS.map((tier) => {
        const items = rewards.filter((r) => r.tier === tier.id);
        if (items.length === 0) return null;
        return (
          <section key={tier.id}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-lg text-ink-900">
                {tier.label} <span className="text-sm text-gold-700">🌟 {tier.seeds}</span>
              </h3>
              <p className="text-xs text-ink-500">{tier.pace}</p>
            </div>
            <p className="text-xs text-ink-700">{tier.blurb}</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((r) => {
                const afford = balance >= r.seeds;
                const needsGrownUp = rewardRequiresGrownUp(r) || r.seeds > SEED_AUTO_APPROVE_MAX;
                const already = requests.some((x) => x.rewardId === r.id && x.status === 'pending');
                return (
                  <div
                    key={r.id}
                    className="rounded-petal border-2 border-cream-300 bg-white px-3 py-3 shadow-petal"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-xl leading-none">{r.icon}</span>
                      <div className="min-w-0">
                        <p className="text-sm font-700 leading-tight text-ink-900">{r.name}</p>
                        <p className="text-[0.7rem] text-gold-700">🌟 {r.seeds}</p>
                      </div>
                    </div>
                    <p className="mt-1.5 text-[0.7rem] leading-relaxed text-ink-500">{r.desc}</p>
                    <button
                      type="button"
                      disabled={!afford || already}
                      onClick={() => ask(r)}
                      className={`mt-2.5 w-full rounded-full py-1.5 text-[0.75rem] font-700 ${
                        already
                          ? 'bg-cream-200 text-ink-500'
                          : afford
                            ? 'bg-gold-500 text-white hover:bg-gold-700'
                            : 'border border-cream-300 text-ink-500'
                      }`}
                    >
                      {already
                        ? 'Already asked'
                        : afford
                          ? needsGrownUp
                            ? 'Ask a grown-up'
                            : 'Get it now'
                          : `Need 🌟 ${r.seeds - balance} more`}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      {decided.length > 0 && (
        <div className="panel px-4 py-4">
          <p className="label-caps">Recently decided</p>
          <ul className="mt-2 space-y-1.5 text-sm">
            {decided.map((r) => (
              <li key={r.requestId} className="flex flex-wrap items-center gap-2">
                <span>{r.icon}</span>
                <span className="flex-1 text-ink-900">{r.name}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[0.65rem] font-700 ${
                    r.status === 'declined'
                      ? 'bg-cream-200 text-ink-500'
                      : 'bg-sage-300/50 text-sage-700'
                  }`}
                >
                  {r.status === 'delivered' ? 'Got it' : r.status === 'approved' ? 'Approved' : 'Not this time'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <EarningPanel currency="seed" />
    </div>
  );
}

function Shelf({ onNavigate }) {
  const unlocked = useAppStore((s) => s.unlockedItems);
  const owned = ALL_PETAL_ITEMS.filter((i) => unlocked.includes(i.id));

  return (
    <div className="space-y-4">
      <div className="panel px-4 py-4">
        <p className="label-caps">Where it all goes</p>
        <p className="mt-1 text-sm text-ink-700">
          Nothing you buy here is just a receipt. Greenhouse things get placed in the greenhouse,
          shelf things stand on the shelf, and anything from Apron &amp; Kit goes straight onto you.
        </p>
        <button
          type="button"
          onClick={() => onNavigate('greenhouse')}
          className="mt-3 rounded-full bg-sage-500 px-6 py-2.5 font-700 text-white hover:bg-sage-700"
        >
          🏡 Open my greenhouse
        </button>
      </div>

      <div className="overflow-hidden rounded-petal border border-cream-300 shadow-petal">
        <GreenhouseScene owned={unlocked} showGhosts />
      </div>

      <p className="text-center text-xs text-ink-500">
        {owned.length} of {ALL_PETAL_ITEMS.length} things collected. The dotted outlines show what is
        still missing and what each one costs.
      </p>
    </div>
  );
}

export function MarketView({ onNavigate }) {
  const petals = useAppStore((s) => s.petalBalance());
  const unlocked = useAppStore((s) => s.unlockedItems);
  const seeds = useAppStore((s) => s.seedBalance());
  const reserved = useAppStore((s) => s.seedsReserved());
  const [tab, setTab] = useState('petals');

  const TABS = [
    ['petals', '🌸 Petal Market'],
    ['seeds', '🌟 Real Rewards'],
    ['shelf', '🏡 Where it all goes']
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <p className="label-caps">The Market</p>
      <h1 className="mt-1 font-display text-3xl text-ink-900">Spend what you have earned</h1>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-petal border-2 border-blush-500 bg-blush-300/25 px-4 py-3">
          <p className="text-[0.7rem] uppercase tracking-widest text-ink-700">Petals</p>
          <Coin currency="petal" amount={petals} size="lg" />
          <p className="mt-0.5 text-[0.7rem] text-ink-700">
            For things in here. No permission needed, ever.
          </p>
        </div>
        <div className="rounded-petal border-2 border-gold-500 bg-gold-300/25 px-4 py-3">
          <p className="text-[0.7rem] uppercase tracking-widest text-ink-700">Golden Seeds</p>
          <Coin currency="seed" amount={seeds} size="lg" />
          <p className="mt-0.5 text-[0.7rem] text-ink-700">
            For things out in the world.
            {reserved > 0 && ` ${reserved} more saved toward your Dream Reward.`}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <MarigoldMessage
          text={marketLine({
            petals,
            canAfford: ALL_PETAL_ITEMS.filter((i) => !unlocked.includes(i.id) && i.cost <= petals).length,
            unlockedCount: unlocked.length
          })}
          size="sm"
        />
      </div>

      <p className="mt-3 rounded-xl bg-cream-200 px-4 py-2.5 text-xs leading-relaxed text-ink-700">
        You earn <span className="font-700">{EARN_RATES.perQuestion.petal} Petals and{' '}
        {EARN_RATES.perQuestion.seed} Golden Seed for every question you answer</span> — whether you
        get it right or not — plus a bigger handful for finishing a strand, finishing a sitting, and
        every day you come back.
      </p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {TABS.map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`rounded-full px-4 py-1.5 text-sm font-700 ${
              tab === id ? 'bg-blush-500 text-white' : 'text-ink-700 hover:bg-cream-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-5">
        {tab === 'petals' && <PetalMarket />}
        {tab === 'seeds' && <SeedRewards />}
        {tab === 'shelf' && <Shelf onNavigate={onNavigate} />}
      </div>
    </div>
  );
}
