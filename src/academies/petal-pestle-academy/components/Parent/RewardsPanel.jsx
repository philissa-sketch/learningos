import { useMemo, useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import {
  ENTRY_KINDS,
  CURRENCIES,
  SEED_AUTO_APPROVE_MAX,
  SEED_AUTO_APPROVE_WEEKLY_CAP,
  SEED_MATCH_RATE,
  projectedEarnings,
  EARN_RATES
} from '../../lib/economy.js';
import { resolveRewards, DEFAULT_SEED_REWARDS, SEED_TIERS } from '../../data/rewards/seedRewards.js';
import { ALL_PETAL_ITEMS } from '../../data/rewards/petalCatalog.js';

/**
 * The grown-up half of the economy: approve or decline, mark delivered, grant a
 * bonus, make a correction, and re-price or remove any real-world reward.
 *
 * Either grown-up can approve — that was the parent's choice — so nothing here
 * records WHO decided, only WHEN. Two people sharing one passcode and a visible
 * date is the honest model of how this household actually runs; inventing per-
 * person accounts would add a login nobody asked for and still not stop them
 * sharing the code.
 */

function Money({ currency, amount }) {
  const icon = CURRENCIES[currency]?.icon || '';
  const positive = amount >= 0;
  return (
    <span className={`tnum font-700 ${positive ? 'text-sage-700' : 'text-clay-500'}`}>
      {positive ? '+' : ''}
      {amount} {icon}
    </span>
  );
}

function Pending() {
  const requests = useAppStore((s) => s.requests);
  const decideRequest = useAppStore((s) => s.decideRequest);
  const markDelivered = useAppStore((s) => s.markDelivered);
  const seedBalance = useAppStore((s) => s.seedBalance());
  const [note, setNote] = useState({});
  const [msg, setMsg] = useState(null);

  const pending = requests.filter((r) => r.status === 'pending');
  const approved = requests.filter((r) => r.status === 'approved');

  return (
    <div className="space-y-4">
      {msg && <p className="rounded-xl bg-cream-200 px-3 py-2 text-sm text-ink-900">{msg}</p>}

      <div className="panel px-4 py-4">
        <h3 className="font-display text-base text-ink-900">
          Waiting on you {pending.length > 0 && <span className="text-blush-700">({pending.length})</span>}
        </h3>
        {pending.length === 0 ? (
          <p className="mt-2 text-sm text-ink-500">Nothing waiting.</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {pending.map((r) => (
              <li key={r.requestId} className="rounded-xl border border-cream-300 bg-white px-3 py-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-700 text-ink-900">
                      {r.icon} {r.name}
                    </p>
                    <p className="text-xs text-ink-500">
                      🌟 {r.seeds} · asked {new Date(r.at).toLocaleDateString()}
                      {r.fromGoal && ' · Dream Reward, cashing in her savings'}
                    </p>
                    {r.fromGoal && (
                      <p className="mt-1 text-[0.7rem] text-gold-700">
                        She saved {r.reservedAtRequest} and your match adds {r.matchAtRequest}.
                      </p>
                    )}
                  </div>
                  <span className="tnum text-xs text-ink-500">She has 🌟 {seedBalance} spare</span>
                </div>
                <input
                  value={note[r.requestId] || ''}
                  onChange={(e) => setNote({ ...note, [r.requestId]: e.target.value })}
                  placeholder="Optional note to her"
                  className="mt-2 w-full rounded-full border border-cream-300 px-4 py-1.5 text-xs outline-none focus:border-lavender-500"
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={async () => {
                      const res = await decideRequest(r.requestId, true, note[r.requestId] || '');
                      setMsg(res.ok ? `Approved: ${r.name}.` : 'She does not have enough seeds for that now.');
                    }}
                    className="rounded-full bg-sage-500 px-5 py-1.5 text-xs font-700 text-white hover:bg-sage-700"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      await decideRequest(r.requestId, false, note[r.requestId] || '');
                      setMsg(`Declined: ${r.name}. Her seeds were not touched.`);
                    }}
                    className="rounded-full border border-cream-300 px-5 py-1.5 text-xs font-700 text-ink-700"
                  >
                    Not this time
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-3 text-[0.7rem] leading-relaxed text-ink-500">
          Seeds are only taken when you approve. A request you decline or never answer costs her
          nothing. Rewards at or under 🌟 {SEED_AUTO_APPROVE_MAX} that cost you nothing clear on
          their own, up to 🌟 {SEED_AUTO_APPROVE_WEEKLY_CAP} a week.
        </p>
      </div>

      {approved.length > 0 && (
        <div className="panel px-4 py-4">
          <h3 className="font-display text-base text-ink-900">Approved — not handed over yet</h3>
          <ul className="mt-2 space-y-2">
            {approved.map((r) => (
              <li key={r.requestId} className="flex flex-wrap items-center gap-2 text-sm">
                <span>{r.icon}</span>
                <span className="flex-1 text-ink-900">{r.name}</span>
                <button
                  type="button"
                  onClick={() => markDelivered(r.requestId)}
                  className="rounded-full border border-sage-500 px-4 py-1 text-xs font-700 text-sage-700 hover:bg-sage-300/30"
                >
                  Mark as given
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function Adjust() {
  const adjustBalance = useAppStore((s) => s.adjustBalance);
  const petals = useAppStore((s) => s.petalBalance());
  const seeds = useAppStore((s) => s.seedBalance());
  const [currency, setCurrency] = useState('petal');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [msg, setMsg] = useState(null);

  return (
    <div className="space-y-4">
      <div className="panel px-4 py-4">
        <h3 className="font-display text-base text-ink-900">Give a bonus, or make a correction</h3>
        <p className="mt-1 text-xs text-ink-700">
          Use a positive number to add, a negative one to take away. Every adjustment is recorded
          with your note, and she can see it in her own earning history — so nothing here happens
          behind her back.
        </p>
        <p className="mt-2 text-xs text-ink-500">
          Right now: 🌸 {petals} · 🌟 {seeds}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="rounded-full border border-cream-300 bg-white px-4 py-2 text-sm outline-none"
          >
            <option value="petal">🌸 Petals</option>
            <option value="seed">🌟 Golden Seeds</option>
          </select>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 50 or -20"
            className="w-32 rounded-full border border-cream-300 bg-white px-4 py-2 text-sm outline-none focus:border-lavender-500"
          />
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What is it for?"
            className="min-w-[12rem] flex-1 rounded-full border border-cream-300 bg-white px-4 py-2 text-sm outline-none focus:border-lavender-500"
          />
          <button
            type="button"
            onClick={async () => {
              const res = await adjustBalance(currency, amount, note);
              setMsg(res.ok ? 'Recorded.' : 'Enter an amount other than zero.');
              setAmount('');
              setNote('');
            }}
            className="rounded-full bg-lavender-500 px-5 py-2 text-sm font-700 text-white hover:bg-lavender-700"
          >
            Record it
          </button>
        </div>
        {msg && <p className="mt-2 text-sm text-sage-700">{msg}</p>}
      </div>

      <div className="panel px-4 py-4">
        <h3 className="font-display text-base text-ink-900">How the earning works</h3>
        <p className="mt-1 text-xs text-ink-700">
          She earns for <span className="font-700">effort, never for correct answers</span> — the
          choice you made when this was built. A wrong answer pays exactly what a right one pays.
          If being right paid more, she would learn inside one sitting to guess safe and skip the
          strands she finds hard, and the Check-In would stop being able to find the gaps it exists
          to find.
        </p>
        <table className="mt-3 w-full text-left text-xs">
          <thead>
            <tr className="border-b border-cream-300 text-ink-500">
              <th className="py-1 font-700">Earned for</th>
              <th className="py-1 text-right font-700">🌸</th>
              <th className="py-1 text-right font-700">🌟</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Each question answered', 'perQuestion'],
              ['Each strand finished', 'perStrandSettled'],
              ['Each sitting completed', 'perSitting'],
              ['Each day she comes back', 'perDayActive']
            ].map(([label, key]) => (
              <tr key={key} className="border-b border-cream-300 last:border-0">
                <td className="py-1.5 text-ink-900">{label}</td>
                <td className="py-1.5 text-right tnum">{EARN_RATES[key].petal}</td>
                <td className="py-1.5 text-right tnum">{EARN_RATES[key].seed}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 text-[0.7rem] text-ink-500">
          A complete diagnostic works out to about 🌸 {projectedEarnings().petal} and 🌟{' '}
          {projectedEarnings().seed}. The catalogues are priced against those numbers, so if you
          change a rate in <span className="font-mono">src/lib/economy.js</span>, re-check both.
        </p>
      </div>
    </div>
  );
}

function Catalogue() {
  const rewardEdits = useAppStore((s) => s.rewardEdits);
  const setRewardEdits = useAppStore((s) => s.setRewardEdits);
  const [draft, setDraft] = useState({ name: '', seeds: '', tier: 'outing', desc: '' });
  const [msg, setMsg] = useState(null);

  const edits = rewardEdits || { removed: [], added: [], repriced: {} };
  const rewards = useMemo(() => resolveRewards(edits), [edits]);

  async function update(next) {
    await setRewardEdits(next);
  }

  return (
    <div className="space-y-4">
      <div className="panel px-4 py-4">
        <h3 className="font-display text-base text-ink-900">Add your own reward</h3>
        <p className="mt-1 text-xs text-ink-700">
          The starting list is a suggestion. Anything you add here shows up in her Market straight
          away.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <input
            value={draft.name}
            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            placeholder="What is it?"
            className="min-w-[10rem] flex-1 rounded-full border border-cream-300 bg-white px-4 py-2 text-sm outline-none focus:border-lavender-500"
          />
          <input
            type="number"
            value={draft.seeds}
            onChange={(e) => setDraft({ ...draft, seeds: e.target.value })}
            placeholder="🌟 cost"
            className="w-28 rounded-full border border-cream-300 bg-white px-4 py-2 text-sm outline-none focus:border-lavender-500"
          />
          <select
            value={draft.tier}
            onChange={(e) => setDraft({ ...draft, tier: e.target.value })}
            className="rounded-full border border-cream-300 bg-white px-4 py-2 text-sm outline-none"
          >
            {SEED_TIERS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={async () => {
              if (!draft.name.trim() || !Number(draft.seeds)) return setMsg('Needs a name and a cost.');
              await update({
                ...edits,
                added: [
                  ...(edits.added || []),
                  {
                    id: `custom-${Date.now().toString(36)}`,
                    tier: draft.tier,
                    seeds: Math.round(Number(draft.seeds)),
                    name: draft.name.trim(),
                    icon: '🎁',
                    desc: draft.desc || 'Added by a grown-up.'
                  }
                ]
              });
              setDraft({ name: '', seeds: '', tier: 'outing', desc: '' });
              setMsg('Added. She can see it now.');
            }}
            className="rounded-full bg-gold-500 px-5 py-2 text-sm font-700 text-white hover:bg-gold-700"
          >
            Add
          </button>
        </div>
        {msg && <p className="mt-2 text-sm text-sage-700">{msg}</p>}
      </div>

      <div className="panel px-4 py-4">
        <h3 className="font-display text-base text-ink-900">The current list ({rewards.length})</h3>
        <ul className="mt-2 max-h-[24rem] space-y-1.5 overflow-y-auto pr-1">
          {rewards.map((r) => (
            <li
              key={r.id}
              className="flex flex-wrap items-center gap-2 rounded-xl border border-cream-300 bg-white px-3 py-2 text-sm"
            >
              <span>{r.icon}</span>
              <span className="flex-1 text-ink-900">{r.name}</span>
              <input
                type="number"
                defaultValue={r.seeds}
                onBlur={async (e) => {
                  const v = Math.round(Number(e.target.value) || 0);
                  if (v > 0 && v !== r.seeds) {
                    await update({ ...edits, repriced: { ...(edits.repriced || {}), [r.id]: v } });
                  }
                }}
                className="w-20 rounded-full border border-cream-300 px-3 py-1 text-right text-xs tnum outline-none focus:border-lavender-500"
              />
              <button
                type="button"
                onClick={async () => {
                  if (DEFAULT_SEED_REWARDS.some((d) => d.id === r.id)) {
                    await update({ ...edits, removed: [...(edits.removed || []), r.id] });
                  } else {
                    await update({ ...edits, added: (edits.added || []).filter((a) => a.id !== r.id) });
                  }
                }}
                className="text-xs text-clay-500 underline-offset-2 hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        {(edits.removed?.length || edits.added?.length || Object.keys(edits.repriced || {}).length) > 0 && (
          <button
            type="button"
            onClick={() => update({ removed: [], added: [], repriced: {} })}
            className="mt-3 text-xs text-ink-500 underline-offset-2 hover:underline"
          >
            Put everything back to the starting list
          </button>
        )}
      </div>
    </div>
  );
}

function Ledger() {
  const ledger = useAppStore((s) => s.ledger);
  const unlocked = useAppStore((s) => s.unlockedItems);
  const reserved = useAppStore((s) => s.seedsReserved());

  return (
    <div className="space-y-4">
      <div className="panel px-4 py-4">
        <h3 className="font-display text-base text-ink-900">Her shelf</h3>
        <p className="mt-1 text-xs text-ink-700">
          {unlocked.length} of {ALL_PETAL_ITEMS.length} Petal Market items bought.
          {reserved > 0 && ` 🌟 ${reserved} saved toward her Dream Reward (your match adds ${Math.floor(reserved * SEED_MATCH_RATE)}).`}
        </p>
      </div>

      <div className="panel px-4 py-4">
        <h3 className="font-display text-base text-ink-900">Every money event ({ledger.length})</h3>
        <p className="mt-1 text-xs text-ink-500">
          Newest first. Earning is not listed here — it is worked out from what she has done, and
          the breakdown is on her Market screen.
        </p>
        <div className="mt-3 max-h-[26rem] space-y-1.5 overflow-y-auto pr-1">
          {[...ledger].reverse().map((e) => (
            <div
              key={e.entryId}
              className="flex flex-wrap items-center gap-2 rounded-xl border border-cream-300 bg-white px-3 py-2 text-xs"
            >
              <span className="flex-1 text-ink-900">
                {ENTRY_KINDS[e.kind]}
                {e.note && <span className="text-ink-500"> — {e.note}</span>}
              </span>
              <span className="text-ink-500">{new Date(e.at).toLocaleDateString()}</span>
              {e.kind === 'reserve' || e.kind === 'unreserve' ? (
                <span className="tnum text-gold-700">
                  {e.kind === 'reserve' ? '→' : '←'} {e.amount} 🌟
                </span>
              ) : (
                <Money currency={e.currency} amount={e.amount} />
              )}
            </div>
          ))}
          {ledger.length === 0 && (
            <p className="py-6 text-center text-sm text-ink-500">Nothing spent or granted yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function RewardsPanel() {
  const [tab, setTab] = useState('pending');
  const pendingCount = useAppStore((s) => s.pendingRequests().length);

  const TABS = [
    ['pending', `Approvals${pendingCount ? ` (${pendingCount})` : ''}`],
    ['adjust', 'Bonuses & rates'],
    ['catalogue', 'Reward list'],
    ['ledger', 'Money history']
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-1.5">
        {TABS.map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`rounded-full px-4 py-1.5 text-xs font-700 ${
              tab === id ? 'bg-gold-500 text-white' : 'text-ink-700 hover:bg-cream-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tab === 'pending' && <Pending />}
        {tab === 'adjust' && <Adjust />}
        {tab === 'catalogue' && <Catalogue />}
        {tab === 'ledger' && <Ledger />}
      </div>
    </div>
  );
}
