import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { XP_PER_COIN, XP_PER_CREDIT, CREDIT_AUTO_APPROVE_MAX, CREDIT_AUTO_APPROVE_WEEKLY_CAP } from '../../lib/economy.js';

/**
 * THE PARENT'S HAND ON THE ECONOMY.
 *
 * ---- WHY THIS EXISTS (Aug 16, 2026) ----
 *
 * `adjustCurrency` has been in the store since the ledger shipped, with a
 * comment saying "roughly a third of the parent-control spec depended on it" —
 * and no screen ever called it. The fourth helper this project has found
 * written, reasoned about, and wired to nothing.
 *
 * What that cost in practice: every Coin and Credit he holds was minted by an
 * algorithm. There was no way to reward the thing the app cannot see — helping
 * without being asked, sticking with something hard, a genuinely good day — and
 * no way to correct the record when the app got it wrong. An economy a parent
 * cannot reach into is not an allowance; it is a scoreboard.
 *
 * ---- TWO DECISIONS ----
 *
 * **A note is required, not optional.** Money that appears with no reason
 * attached teaches nothing and, on his earn history, reads as arbitrary. The
 * button stays disabled until she has said what it is for, and what she types
 * is what he reads.
 *
 * **Deducting is offered, and is not hidden.** It is how a correction is made
 * — a unit marked done that was not, a reward given twice. The ledger is
 * append-only, so a deduction is recorded as its own event rather than editing
 * history, and the balance is clamped at zero for spending while the ledger
 * itself stays truthful.
 */
export function CurrencyControlsSection() {
  const adjustCurrency = useAppStore((s) => s.adjustCurrency);
  const getCoinBalance = useAppStore((s) => s.getCoinBalance);
  const getCreditBalance = useAppStore((s) => s.getCreditBalance);
  const getLedgerHistory = useAppStore((s) => s.getLedgerHistory);
  const dreamGoals = useAppStore((s) => s.dreamGoals);
  const dreamGoalProgress = useAppStore((s) => s.dreamGoalProgress);
  const supplyCrateEnabled = useAppStore((s) => s.supplyCrateEnabled);
  const setSupplyCrateEnabled = useAppStore((s) => s.setSupplyCrateEnabled);

  const [currency, setCurrency] = useState('credit');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [sign, setSign] = useState(1);
  const [msg, setMsg] = useState(null);

  const goal = (dreamGoals || []).find((g) => g.status === 'active') || null;
  const progress = goal ? dreamGoalProgress(goal) : null;
  const recent = getLedgerHistory(null, 8);

  const n = Number(amount) || 0;
  const canSubmit = n > 0 && note.trim().length > 0;

  const submit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    const res = await adjustCurrency({ currency, amount: sign * n, note: note.trim() });
    if (res.ok) {
      setMsg(`${sign > 0 ? 'Added' : 'Removed'} ${n} ${currency === 'credit' ? 'Credits' : 'Coins'}.`);
      setAmount('');
      setNote('');
      setTimeout(() => setMsg(null), 3000);
    }
  };

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Currency Controls</p>
        <h3 className="mt-1 font-display text-lg font-700 text-ink-100">Award or Correct by Hand</h3>
        <p className="mt-2 text-sm text-ink-300">
          Everything he holds was earned by the app's own rules. This is for what the app cannot see —
          effort, character, a hard thing stuck with — and for fixing the record when it gets something
          wrong. Whatever you type as the reason is what he reads in his history.
        </p>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-space-700 bg-space-900 p-3">
            <p className="text-[10px] font-display uppercase tracking-widest text-ink-600">Coins</p>
            <p className="mt-0.5 font-display text-2xl font-700 text-ink-100">{getCoinBalance()}</p>
            <p className="text-[11px] text-ink-500">1 per {XP_PER_COIN} XP · costs you nothing</p>
          </div>
          <div className="rounded-lg border border-space-700 bg-space-900 p-3">
            <p className="text-[10px] font-display uppercase tracking-widest text-ink-600">Credits</p>
            <p className="mt-0.5 font-display text-2xl font-700 text-signal-amber">{getCreditBalance()}</p>
            <p className="text-[11px] text-ink-500">1 per {XP_PER_CREDIT} XP · real things</p>
          </div>
        </div>

        <form onSubmit={submit} className="mt-4 space-y-2">
          <div className="flex flex-wrap gap-2">
            <div className="flex overflow-hidden rounded-md border border-space-600">
              {['credit', 'coin'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCurrency(c)}
                  className={
                    'px-3 py-2 text-xs font-display font-700 transition ' +
                    (currency === c ? 'bg-signal-cyan/15 text-signal-cyan' : 'text-ink-500 hover:text-ink-200')
                  }
                >
                  {c === 'credit' ? 'Credits' : 'Coins'}
                </button>
              ))}
            </div>
            <div className="flex overflow-hidden rounded-md border border-space-600">
              {[[1, 'Add'], [-1, 'Remove']].map(([v, label]) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setSign(v)}
                  className={
                    'px-3 py-2 text-xs font-display font-700 transition ' +
                    (sign === v
                      ? v > 0 ? 'bg-signal-green/15 text-signal-green' : 'bg-signal-red/15 text-signal-red'
                      : 'text-ink-500 hover:text-ink-200')
                  }
                >
                  {label}
                </button>
              ))}
            </div>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))}
              inputMode="numeric"
              placeholder="How many"
              className="w-28 rounded-md border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-600 focus:border-signal-cyan focus:outline-none"
            />
          </div>
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What it is for — he reads this"
            className="w-full rounded-md border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-600 focus:border-signal-cyan focus:outline-none"
          />
          <button
            type="submit"
            disabled={!canSubmit}
            className={
              'rounded-md px-4 py-2 text-sm font-display font-700 transition ' +
              (canSubmit ? 'bg-signal-cyan text-space-950 hover:brightness-110' : 'border border-space-700 text-ink-600')
            }
          >
            {sign > 0 ? 'Add' : 'Remove'} {amount || ''} {currency === 'credit' ? 'Credits' : 'Coins'}
          </button>
          {!canSubmit && (amount || note) && (
            <p className="text-[11px] text-ink-600">A reason is required — it is what he sees.</p>
          )}
          {msg && <p className="text-xs font-display text-signal-green">{msg}</p>}
        </form>

        <p className="mt-3 text-[11px] text-ink-600">
          He can clear up to {CREDIT_AUTO_APPROVE_MAX} Credits at once without you, and{' '}
          {CREDIT_AUTO_APPROVE_WEEKLY_CAP} in a week. Anything costing real time or money waits for you
          whatever it costs.
        </p>
      </div>

      {/* Her side of the Dream Goal: the match is HER money, so she should see
          what it currently stands at without opening his screen. */}
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-amber">Dream Goal</p>
        {!goal ? (
          <>
            <h3 className="mt-1 font-display text-lg font-700 text-ink-100">Nothing being saved for yet</h3>
            <p className="mt-2 text-sm text-ink-300">
              When he sets one, this shows what he has put in and what your match currently stands at. You
              add 1 Credit for every 4 he leaves in — it is only charged when he claims the goal, and it is
              never paid on Credits he takes back out.
            </p>
          </>
        ) : (
          <>
            <h3 className="mt-1 font-display text-lg font-700 text-ink-100">{goal.name}</h3>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="rounded-lg border border-space-700 bg-space-900 p-3">
                <p className="text-[10px] font-display uppercase tracking-widest text-ink-600">He saved</p>
                <p className="mt-0.5 font-display text-xl font-700 text-ink-100">{progress.reserved}</p>
              </div>
              <div className="rounded-lg border border-signal-amber/40 bg-signal-amber/5 p-3">
                <p className="text-[10px] font-display uppercase tracking-widest text-signal-amber">Your match</p>
                <p className="mt-0.5 font-display text-xl font-700 text-signal-amber">{progress.match}</p>
              </div>
              <div className="rounded-lg border border-space-700 bg-space-900 p-3">
                <p className="text-[10px] font-display uppercase tracking-widest text-ink-600">Target</p>
                <p className="mt-0.5 font-display text-xl font-700 text-ink-100">{progress.target}</p>
              </div>
            </div>
            <p className="mt-2 text-xs text-ink-500">
              {progress.ready
                ? 'He can claim this now — it will arrive in your approval queue above.'
                : `${progress.remaining} Credits to go.`}
            </p>
          </>
        )}
      </div>

      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Monthly Supply Crate</p>
            <h3 className="mt-1 font-display text-lg font-700 text-ink-100">
              {supplyCrateEnabled === false ? 'Off' : 'On'}
            </h3>
            <p className="mt-2 max-w-prose text-sm text-ink-300">
              One crate a month, bought with Coins only, containing a piece of equipment always worth at
              least what it costs &mdash; so he cannot lose on it. The item is fixed for the month, so
              there is nothing to re-roll and nothing to chase. Switch it off here if you would rather he
              only ever chose what he bought.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSupplyCrateEnabled(supplyCrateEnabled === false)}
            className={
              'flex-none rounded-lg px-4 py-2 text-sm font-display font-700 transition ' +
              (supplyCrateEnabled === false
                ? 'bg-signal-cyan text-space-950 hover:brightness-110'
                : 'border border-space-600 text-ink-300 hover:border-ink-400')
            }
          >
            {supplyCrateEnabled === false ? 'Turn on' : 'Turn off'}
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Recent Money</p>
        {recent.length === 0 ? (
          <p className="mt-2 text-sm text-ink-500">Nothing yet.</p>
        ) : (
          <div className="mt-2 space-y-1">
            {recent.map((e) => (
              <div key={e.entryId} className="flex items-baseline justify-between gap-2 border-b border-space-700/60 py-1 last:border-0">
                <p className="min-w-0 truncate text-xs text-ink-300">{e.note || e.kind}</p>
                <p
                  className={
                    'flex-none font-display text-xs font-700 ' +
                    (e.amount >= 0 ? 'text-signal-green' : 'text-ink-400')
                  }
                >
                  {e.amount >= 0 ? '+' : ''}
                  {e.amount} {e.currency === 'credit' ? 'C' : 'c'}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
