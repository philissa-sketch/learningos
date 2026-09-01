import { useMemo, useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { academyContent } from '../../content/academyContent.js';

const { BUDGET_CATEGORIES, BUDGET_TOTAL_POINTS, ECONOMIC_SYSTEMS, GOVERNMENT_TYPES, NATION_SCORE_LABELS: SCORE_LABELS, TRADE_EVENT } = academyContent().games;

const SCORE_KEYS = Object.keys(SCORE_LABELS);

function emptyScores() {
  return SCORE_KEYS.reduce((acc, key) => ({ ...acc, [key]: 0 }), {});
}

function addPoints(scores, points) {
  const next = { ...scores };
  for (const [key, value] of Object.entries(points || {})) {
    next[key] = (next[key] || 0) + value;
  }
  return next;
}

/**
 * "Nation Command: Build Your World" — the signature Social Studies
 * simulation game (PROJECT_PLAN.md games section), built directly from the
 * real Q2 lessons (government types, economic systems, trade tools,
 * personal-budget logic — see `data/games/nationCommandContent.js`). Every
 * choice's point effect is explained in real terms via `flavor`/
 * `resultText`, not an arbitrary game mechanic — the scoring is a layer on
 * top of the real content, not a replacement for it.
 *
 * 5 turns, per the confirmed design: government type -> economic system ->
 * trade event response -> national budget split -> scorecard (with a
 * closing self-explanation sentence, ungraded, closing the loop with gap 3
 * in the same mechanic).
 */
export function NationCommand({ onExit }) {
  const submitNationCommand = useAppStore((s) => s.submitNationCommand);

  const [step, setStep] = useState('intro'); // intro -> government -> economy -> trade -> budget -> scorecard
  const [governmentId, setGovernmentId] = useState(null);
  const [economyId, setEconomyId] = useState(null);
  const [tradeChoiceId, setTradeChoiceId] = useState(null);
  const [budget, setBudget] = useState(() => BUDGET_CATEGORIES.reduce((acc, c) => ({ ...acc, [c.id]: 25 }), {}));
  const [reflectionText, setReflectionText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  const government = GOVERNMENT_TYPES.find((g) => g.id === governmentId);
  const economy = ECONOMIC_SYSTEMS.find((e) => e.id === economyId);
  const tradeChoice = TRADE_EVENT.options.find((o) => o.id === tradeChoiceId);

  const budgetTotal = Object.values(budget).reduce((sum, v) => sum + v, 0);
  const budgetValid = budgetTotal === BUDGET_TOTAL_POINTS;

  const scores = useMemo(() => {
    let s = emptyScores();
    if (government) s = addPoints(s, government.points);
    if (economy) s = addPoints(s, economy.points);
    if (tradeChoice) s = addPoints(s, tradeChoice.points);
    for (const category of BUDGET_CATEGORIES) {
      const value = budget[category.id] || 0;
      s[category.scoreField] = (s[category.scoreField] || 0) + Math.round(value / 25);
    }
    return s;
  }, [government, economy, tradeChoice, budget]);

  const topScoreKey = useMemo(() => {
    let best = SCORE_KEYS[0];
    for (const key of SCORE_KEYS) {
      if (scores[key] > scores[best]) best = key;
    }
    return best;
  }, [scores]);

  const setBudgetValue = (id, raw) => {
    const value = Math.max(0, Math.min(BUDGET_TOTAL_POINTS, Number(raw) || 0));
    setBudget((prev) => ({ ...prev, [id]: value }));
  };

  const handleFinish = async () => {
    const result = await submitNationCommand(reflectionText);
    setXpEarned(result?.xpEarned || 0);
    setSubmitted(true);
  };

  const ExitBar = () => (
    <div className="mb-4 flex items-center justify-between">
      <button type="button" onClick={onExit} className="text-sm text-ink-500 hover:text-ink-100">
        ← Exit Nation Command
      </button>
      <span className="text-sm text-ink-500">🌍 Nation Command: Build Your World</span>
    </div>
  );

  const NextButton = ({ onClick, disabled, children }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="mt-4 w-full rounded-lg bg-signal-cyan px-4 py-2 font-display font-700 text-space-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );

  if (step === 'intro') {
    return (
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
        <ExitBar />
        <div className="rounded-xl border border-space-700 bg-space-800 p-6 shadow-panel">
          <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Mission Briefing</p>
          <h2 className="mt-2 font-display text-2xl font-700 text-ink-100">Build Your World</h2>
          <p className="mt-3 text-ink-300">
            You're leading a brand-new nation. Every choice you make — your government, your economy, how
            you respond to a real trade dispute, and how you budget what you have — uses the REAL definitions
            and real tradeoffs from this quarter's Social Studies unit. There's no single "correct" path here;
            every option is a genuine tradeoff, the same way it is for real countries.
          </p>
          <p className="mt-3 text-sm text-ink-500">5 decisions, then a scorecard at the end. Not graded — this is a low-stakes strategy game.</p>
        </div>
        <NextButton onClick={() => setStep('government')}>Begin — Choose Your Government</NextButton>
      </div>
    );
  }

  if (step === 'government') {
    return (
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
        <ExitBar />
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Turn 1 of 5 — Government Type</p>
        <p className="mt-2 text-ink-300">Choose how your nation's leader will be chosen and how power will work.</p>
        <div className="mt-4 space-y-3">
          {GOVERNMENT_TYPES.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setGovernmentId(g.id)}
              className={
                'block w-full rounded-xl border p-4 text-left transition ' +
                (governmentId === g.id
                  ? 'border-signal-cyan bg-signal-cyan/10'
                  : 'border-space-700 bg-space-800 hover:border-signal-cyan/50')
              }
            >
              <p className="font-display text-base font-700 text-ink-100">{g.name}</p>
              <p className="text-xs text-signal-amber">Real-world example: {g.basedOn}</p>
              <p className="mt-1 text-sm text-ink-300">{g.description}</p>
              <p className="mt-2 text-xs text-ink-500">{g.flavor}</p>
            </button>
          ))}
        </div>
        <NextButton onClick={() => setStep('economy')} disabled={!governmentId}>
          Next — Choose Your Economic System
        </NextButton>
      </div>
    );
  }

  if (step === 'economy') {
    return (
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
        <ExitBar />
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Turn 2 of 5 — Economic System</p>
        <p className="mt-2 text-ink-300">Choose how your nation will answer the three questions every economy has to answer: what, how, and for whom to produce.</p>
        <div className="mt-4 space-y-3">
          {ECONOMIC_SYSTEMS.map((e) => (
            <button
              key={e.id}
              type="button"
              onClick={() => setEconomyId(e.id)}
              className={
                'block w-full rounded-xl border p-4 text-left transition ' +
                (economyId === e.id
                  ? 'border-signal-cyan bg-signal-cyan/10'
                  : 'border-space-700 bg-space-800 hover:border-signal-cyan/50')
              }
            >
              <p className="font-display text-base font-700 text-ink-100">{e.name}</p>
              <p className="mt-1 text-sm text-ink-300">{e.description}</p>
              <p className="mt-2 text-xs text-ink-500">{e.flavor}</p>
            </button>
          ))}
        </div>
        <NextButton onClick={() => setStep('trade')} disabled={!economyId}>
          Next — Respond to a Trade Event
        </NextButton>
      </div>
    );
  }

  if (step === 'trade') {
    return (
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
        <ExitBar />
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Turn 3 of 5 — Trade Event</p>
        <div className="mt-2 rounded-lg border border-signal-amber/30 bg-signal-amber/5 p-3">
          <p className="text-sm text-ink-200">{TRADE_EVENT.scenario}</p>
        </div>
        <div className="mt-4 space-y-3">
          {TRADE_EVENT.options.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => setTradeChoiceId(o.id)}
              className={
                'block w-full rounded-xl border p-4 text-left transition ' +
                (tradeChoiceId === o.id
                  ? 'border-signal-cyan bg-signal-cyan/10'
                  : 'border-space-700 bg-space-800 hover:border-signal-cyan/50')
              }
            >
              <p className="font-display text-base font-700 text-ink-100">{o.name}</p>
              <p className="mt-1 text-sm text-ink-300">{o.description}</p>
            </button>
          ))}
        </div>
        {tradeChoice && (
          <div className="mt-4 rounded-lg border border-signal-green/30 bg-signal-green/5 p-3 text-sm text-ink-200">
            {tradeChoice.resultText}
          </div>
        )}
        <NextButton onClick={() => setStep('budget')} disabled={!tradeChoiceId}>
          Next — Balance Your National Budget
        </NextButton>
      </div>
    );
  }

  if (step === 'budget') {
    return (
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
        <ExitBar />
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Turn 4 of 5 — National Budget</p>
        <p className="mt-2 text-ink-300">
          Split exactly {BUDGET_TOTAL_POINTS} budget points across these 4 real categories — the same
          "live within your income, plan ahead" logic Economics II covers for a personal budget, just at
          national scale.
        </p>
        <div className="mt-4 space-y-4">
          {BUDGET_CATEGORIES.map((c) => (
            <div key={c.id} className="rounded-xl border border-space-700 bg-space-800 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-display text-sm font-700 text-ink-100">{c.name}</p>
                  <p className="text-xs text-ink-500">{c.description}</p>
                </div>
                <input
                  type="number"
                  min={0}
                  max={BUDGET_TOTAL_POINTS}
                  value={budget[c.id]}
                  onChange={(e) => setBudgetValue(c.id, e.target.value)}
                  className="w-20 rounded-lg border border-space-600 bg-space-900 px-2 py-1 text-right text-ink-100 focus:border-signal-cyan focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
        <p className={'mt-3 text-sm ' + (budgetValid ? 'text-signal-green' : 'text-signal-amber')}>
          Total: {budgetTotal} / {BUDGET_TOTAL_POINTS} {budgetValid ? '— balanced' : '— must total exactly ' + BUDGET_TOTAL_POINTS}
        </p>
        <NextButton onClick={() => setStep('scorecard')} disabled={!budgetValid}>
          Next — See Your Scorecard
        </NextButton>
      </div>
    );
  }

  // ---- Scorecard ----
  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
        <ExitBar />
        <div className="rounded-xl border border-signal-green/40 bg-signal-green/5 p-6 text-center shadow-panel">
          <p className="text-xs font-display uppercase tracking-widest text-signal-green">Nation Command Complete</p>
          <p className="telemetry mt-2 text-3xl font-700 text-signal-amber">+{xpEarned} XP</p>
          <p className="mt-3 text-sm text-ink-300">Your reflection is saved. Come back and build a different nation any time.</p>
          <button
            type="button"
            onClick={onExit}
            className="mt-6 rounded-lg bg-signal-cyan px-5 py-2 font-display font-700 text-space-950 transition hover:brightness-110"
          >
            Return to Lessons
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
      <ExitBar />
      <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Turn 5 of 5 — Scorecard</p>
      <div className="mt-4 space-y-3 rounded-xl border border-space-700 bg-space-800 p-4">
        {SCORE_KEYS.map((key) => (
          <div key={key}>
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-300">{SCORE_LABELS[key]}</span>
              <span className={'font-display font-700 ' + (key === topScoreKey ? 'text-signal-amber' : 'text-ink-100')}>
                {scores[key]}
              </span>
            </div>
            <div className="mt-1 h-2 rounded-full bg-space-900">
              <div
                className={'h-2 rounded-full ' + (key === topScoreKey ? 'bg-signal-amber' : 'bg-signal-cyan')}
                style={{ width: `${Math.max(4, Math.min(100, scores[key] * 10))}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-signal-amber/30 bg-signal-amber/5 p-3">
        <p className="text-xs font-display uppercase tracking-widest text-signal-amber">
          Your highest score: {SCORE_LABELS[topScoreKey]}
        </p>
        <p className="mt-1 text-sm text-ink-300">
          Explain to Commander Nova, using real vocabulary from this unit ({government?.name}, {economy?.name},
          your trade choice, and your budget split), why your decisions led to your nation's strongest score
          being {SCORE_LABELS[topScoreKey]}.
        </p>
      </div>
      <textarea
        value={reflectionText}
        onChange={(e) => setReflectionText(e.target.value)}
        rows={5}
        placeholder="Type your explanation here..."
        className="mt-3 w-full rounded-lg border border-space-600 bg-space-900 px-4 py-3 text-ink-100 placeholder:text-ink-500 focus:border-signal-cyan focus:outline-none"
      />
      <p className="mt-1 text-xs text-ink-500">Ungraded — captured for you to look back on, never scored.</p>

      <NextButton onClick={handleFinish} disabled={false}>
        Finish Nation Command
      </NextButton>
    </div>
  );
}
