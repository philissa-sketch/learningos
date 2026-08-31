import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { CREDIT_LADDER, DREAM_MATCH_RATE } from '../../lib/economy.js';

/**
 * THE PLACE TO PUT MONEY SO IT STOPS BEING SPENDABLE.
 *
 * ---- WHY THIS EXISTS (Aug 16, 2026) ----
 *
 * The parent: "He's banking something he can't spend."
 *
 * Spending worked. SAVING did not exist — and without it the top half of the
 * Credit ladder was unreachable in practice. A boy with 120 Credits and a
 * 2,000-Credit goal has nowhere to hold money still, and a 50-Credit privilege
 * is always right there. Every economy with no savings account collapses to its
 * cheapest item.
 *
 * ---- WHAT THIS SCREEN HAS TO TEACH, AND HOW ----
 *
 * The match is shown as a LIVE NUMBER that grows while he watches, not as a
 * promise settled at the end. The design brief's whole argument for the match
 * is that he learns compounding "by watching his own money grow faster because
 * he didn't touch it" — which requires that he can watch it.
 *
 * "Take some back" is offered plainly, not buried or shamed. He is allowed to
 * change his mind; what he loses is the match on what he withdraws, and the
 * screen says so BEFORE he taps, because a rule discovered afterwards is a
 * trick. That sentence is the entire lesson in one line.
 */
export function DreamGoalSection() {
  const dreamGoals = useAppStore((s) => s.dreamGoals);
  const getActiveDreamGoal = useAppStore((s) => s.getActiveDreamGoal);
  const dreamGoalProgress = useAppStore((s) => s.dreamGoalProgress);
  const createDreamGoal = useAppStore((s) => s.createDreamGoal);
  const reserveToDreamGoal = useAppStore((s) => s.reserveToDreamGoal);
  const unreserveFromDreamGoal = useAppStore((s) => s.unreserveFromDreamGoal);
  const claimDreamGoal = useAppStore((s) => s.claimDreamGoal);
  const abandonDreamGoal = useAppStore((s) => s.abandonDreamGoal);
  const getCreditBalance = useAppStore((s) => s.getCreditBalance);

  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const [amount, setAmount] = useState('');
  const [msg, setMsg] = useState(null);
  const [confirmingBack, setConfirmingBack] = useState(false);

  const goal = getActiveDreamGoal();
  const progress = goal ? dreamGoalProgress(goal) : null;
  const balance = getCreditBalance();
  const achieved = (dreamGoals || []).filter((g) => g.status === 'achieved');

  const say = (m) => { setMsg(m); setTimeout(() => setMsg(null), 3500); };

  const onCreate = async () => {
    const res = await createDreamGoal({ name, targetCredits: Number(target) });
    if (res.ok) { setName(''); setTarget(''); say(`Goal set — ${res.goal.name}.`); }
    else say(res.reason === 'already-active' ? 'You already have a goal running.' : 'Give it a name and a number.');
  };

  const onReserve = async () => {
    const n = Number(amount);
    const res = await reserveToDreamGoal(n);
    if (res.ok) { setAmount(''); say(`${n} Credits saved. Your match went up.`); }
    else say(res.reason === 'insufficient' ? "You don't have that many Credits right now." : 'Enter an amount.');
  };

  const onTakeBack = async () => {
    const n = Number(amount);
    const res = await unreserveFromDreamGoal(n);
    if (res.ok) { setAmount(''); setConfirmingBack(false); say(`${n} Credits are back in your balance.`); }
    else say(res.reason === 'over-reserved' ? "That's more than you've saved." : 'Enter an amount.');
  };

  const onClaim = async () => {
    const res = await claimDreamGoal();
    say(res.ok
      ? `Claimed — ${res.total} Credits, including ${res.match} from your match. Mom has to say yes to this one.`
      : 'Not there yet.');
  };

  return (
    <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
      <p className="text-xs font-display uppercase tracking-widest text-signal-amber">Dream Goal</p>

      {!goal && (
        <>
          <h3 className="mt-1 font-display text-lg font-700 text-ink-100">Save for something big</h3>
          <p className="mt-2 text-sm text-ink-300">
            Pick one thing worth saving for. Credits you put in stop being spendable — and for every{' '}
            <span className="font-display font-700 text-ink-100">4</span> you save, Mom adds{' '}
            <span className="font-display font-700 text-signal-amber">1</span>. That is a{' '}
            {Math.round(DREAM_MATCH_RATE * 100)}% match, and it is why saving beats spending.
          </p>

          <div className="mt-3 space-y-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="What are you saving for?"
              className="w-full rounded-md border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-600 focus:border-signal-amber focus:outline-none"
            />
            <div className="flex flex-wrap gap-2">
              <input
                value={target}
                onChange={(e) => setTarget(e.target.value.replace(/\D/g, ''))}
                inputMode="numeric"
                placeholder="Credits"
                className="w-32 rounded-md border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-600 focus:border-signal-amber focus:outline-none"
              />
              <button
                type="button"
                onClick={onCreate}
                className="rounded-md bg-signal-amber px-4 py-2 text-sm font-display font-700 text-space-950 transition hover:brightness-110"
              >
                Start saving
              </button>
            </div>
          </div>

          <p className="mt-3 text-[10px] font-display uppercase tracking-widest text-ink-600">What things cost</p>
          <div className="mt-1 space-y-0.5">
            {CREDIT_LADDER.map((t) => (
              <p key={t.credits} className="text-xs text-ink-500">
                <span className="font-display font-700 text-ink-300">{t.credits}</span> — {t.tier} · {t.example}
              </p>
            ))}
          </div>
        </>
      )}

      {goal && progress && (
        <>
          <h3 className="mt-1 font-display text-lg font-700 text-ink-100">{goal.name}</h3>

          <div className="mt-3">
            <div className="h-3 w-full overflow-hidden rounded-full bg-space-900">
              <div
                className="h-full rounded-full bg-signal-amber transition-all"
                style={{ width: `${progress.pct}%` }}
              />
            </div>
            <div className="mt-1.5 flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-display text-2xl font-700 text-ink-100">
                {progress.total}
                <span className="text-base font-400 text-ink-500"> / {progress.target} Credits</span>
              </p>
              <p className="text-xs text-ink-500">
                {progress.ready ? 'You made it.' : `${progress.remaining} to go`}
              </p>
            </div>
          </div>

          {/* The match as a live number he can watch move — the whole point. */}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-space-700 bg-space-900 p-3">
              <p className="text-[10px] font-display uppercase tracking-widest text-ink-600">You saved</p>
              <p className="mt-0.5 font-display text-xl font-700 text-ink-100">{progress.reserved}</p>
            </div>
            <div className="rounded-lg border border-signal-amber/40 bg-signal-amber/5 p-3">
              <p className="text-[10px] font-display uppercase tracking-widest text-signal-amber">Mom's match</p>
              <p className="mt-0.5 font-display text-xl font-700 text-signal-amber">+{progress.match}</p>
              <p className="mt-0.5 text-[11px] text-ink-500">1 for every 4 you save</p>
            </div>
          </div>

          {progress.ready ? (
            <button
              type="button"
              onClick={onClaim}
              className="mt-3 w-full rounded-lg bg-signal-amber px-4 py-2.5 font-display text-sm font-700 text-space-950 transition hover:brightness-110"
            >
              Claim it
            </button>
          ) : (
            <div className="mt-3">
              <p className="text-xs text-ink-500">
                You have <span className="font-display font-700 text-ink-200">{balance}</span> Credits to spend.
              </p>
              <div className="mt-1.5 flex flex-wrap gap-2">
                <input
                  value={amount}
                  onChange={(e) => { setAmount(e.target.value.replace(/\D/g, '')); setConfirmingBack(false); }}
                  inputMode="numeric"
                  placeholder="How many?"
                  className="w-32 rounded-md border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-600 focus:border-signal-amber focus:outline-none"
                />
                <button
                  type="button"
                  onClick={onReserve}
                  disabled={!amount}
                  className={
                    'rounded-md px-4 py-2 text-sm font-display font-700 transition ' +
                    (amount ? 'bg-signal-amber text-space-950 hover:brightness-110' : 'border border-space-700 text-ink-600')
                  }
                >
                  Save it
                </button>
              </div>

              {/* Offered plainly, and the cost is stated BEFORE the tap. A rule
                  he only discovers afterwards is a trick, not a lesson. */}
              {progress.reserved > 0 && (
                <div className="mt-2">
                  {!confirmingBack ? (
                    <button
                      type="button"
                      onClick={() => setConfirmingBack(true)}
                      className="text-xs text-ink-500 underline decoration-space-600 underline-offset-2 hover:text-ink-300"
                    >
                      Take some back
                    </button>
                  ) : (
                    <div className="rounded-lg border border-space-700 bg-space-900 p-3">
                      <p className="text-xs text-ink-300">
                        You can take it back any time — you get back exactly what you put in. The match only
                        pays on Credits you leave in, so taking{' '}
                        <span className="font-display font-700 text-ink-100">{amount || '…'}</span> out means
                        the match on those goes too.
                      </p>
                      <div className="mt-2 flex gap-2">
                        <button
                          type="button"
                          onClick={onTakeBack}
                          disabled={!amount}
                          className="rounded-md border border-space-600 px-3 py-1 text-xs font-display text-ink-200 transition hover:border-ink-400"
                        >
                          Take back {amount || ''}
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmingBack(false)}
                          className="rounded-md px-3 py-1 text-xs font-display text-ink-500 hover:text-ink-200"
                        >
                          Keep saving
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={async () => { await abandonDreamGoal(); say('Goal cancelled. Your Credits are back.'); }}
            className="mt-3 text-[11px] text-ink-600 underline decoration-space-700 underline-offset-2 hover:text-ink-400"
          >
            Pick something else instead
          </button>
        </>
      )}

      {achieved.length > 0 && (
        <div className="mt-4 border-t border-space-700 pt-3">
          <p className="text-[10px] font-display uppercase tracking-widest text-ink-600">Already earned</p>
          {achieved.map((g) => (
            <p key={g.syncId} className="mt-1 text-xs text-ink-400">
              {g.name} — {g.targetCredits} Credits
            </p>
          ))}
        </div>
      )}

      {msg && <p className="mt-2 text-xs font-display text-signal-green">{msg}</p>}
    </div>
  );
}
