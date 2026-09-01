import { useMemo, useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { academyContent } from '../../content/academyContent.js';

const { LAUNCH_SCORE_LABELS: SCORE_LABELS, PROPELLANT_OPTIONS, STAGING_OPTIONS, TRAJECTORY_EVENT, WEIGHT_BUDGET_CATEGORIES, WEIGHT_BUDGET_TOTAL_POINTS } = academyContent().games;

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
 * "Launch Director" — the signature Aerospace simulation game, built the
 * same way "Nation Command" was for Social Studies (PROJECT_PLAN.md games
 * section, approved design). Real content: staging, propellant type, and a
 * trajectory-planning choice pulled directly from `ae7-rocket-design` and
 * `ae7-orbital-mechanics`; a weight-budget turn mirrors `ae7-weight`'s real
 * MTOW/empty-weight/useful-load tradeoff (see
 * `data/games/launchDirectorContent.js`). Every choice's point effect is
 * explained in real terms via `flavor`/`resultText`, same discipline
 * `NationCommand.jsx` already established — the scoring is a layer on top
 * of real facts, not a replacement for them.
 *
 * 5 turns: staging -> propellant -> trajectory event -> weight budget ->
 * scorecard (with a closing self-explanation sentence, ungraded, same
 * mechanic as Nation Command's close).
 */
export function LaunchDirector({ onExit }) {
  const submitLaunchDirector = useAppStore((s) => s.submitLaunchDirector);

  const [step, setStep] = useState('intro'); // intro -> staging -> propellant -> trajectory -> budget -> scorecard
  const [stagingId, setStagingId] = useState(null);
  const [propellantId, setPropellantId] = useState(null);
  const [trajectoryId, setTrajectoryId] = useState(null);
  const [budget, setBudget] = useState(() =>
    WEIGHT_BUDGET_CATEGORIES.reduce((acc, c) => ({ ...acc, [c.id]: Math.round(WEIGHT_BUDGET_TOTAL_POINTS / WEIGHT_BUDGET_CATEGORIES.length) }), {})
  );
  const [reflectionText, setReflectionText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  const staging = STAGING_OPTIONS.find((s) => s.id === stagingId);
  const propellant = PROPELLANT_OPTIONS.find((p) => p.id === propellantId);
  const trajectory = TRAJECTORY_EVENT.options.find((o) => o.id === trajectoryId);

  const budgetTotal = Object.values(budget).reduce((sum, v) => sum + v, 0);
  const budgetValid = budgetTotal === WEIGHT_BUDGET_TOTAL_POINTS;

  const scores = useMemo(() => {
    let s = emptyScores();
    if (staging) s = addPoints(s, staging.points);
    if (propellant) s = addPoints(s, propellant.points);
    if (trajectory) s = addPoints(s, trajectory.points);
    for (const category of WEIGHT_BUDGET_CATEGORIES) {
      const value = budget[category.id] || 0;
      s[category.scoreField] = (s[category.scoreField] || 0) + Math.round(value / 25);
    }
    return s;
  }, [staging, propellant, trajectory, budget]);

  const topScoreKey = useMemo(() => {
    let best = SCORE_KEYS[0];
    for (const key of SCORE_KEYS) {
      if (scores[key] > scores[best]) best = key;
    }
    return best;
  }, [scores]);

  const setBudgetValue = (id, raw) => {
    const value = Math.max(0, Math.min(WEIGHT_BUDGET_TOTAL_POINTS, Number(raw) || 0));
    setBudget((prev) => ({ ...prev, [id]: value }));
  };

  const handleFinish = async () => {
    const result = await submitLaunchDirector(reflectionText);
    setXpEarned(result?.xpEarned || 0);
    setSubmitted(true);
  };

  const ExitBar = () => (
    <div className="mb-4 flex items-center justify-between">
      <button type="button" onClick={onExit} className="text-sm text-ink-500 hover:text-ink-100">
        ← Exit Launch Director
      </button>
      <span className="text-sm text-ink-500">🚀 Launch Director</span>
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
          <h2 className="mt-2 font-display text-2xl font-700 text-ink-100">You Are the Launch Director</h2>
          <p className="mt-3 text-ink-300">
            Plan a real mission from the ground up. Every choice — staging, propellant, trajectory, and your
            weight budget — uses the REAL definitions and real tradeoffs from Rocket Design, Orbital Mechanics,
            and Weight. There's no single "correct" path; every option is a genuine engineering tradeoff, the
            same way it is for real rockets.
          </p>
          <p className="mt-3 text-sm text-ink-500">5 decisions, then a launch-readiness scorecard. Not graded — this is a low-stakes strategy game.</p>
        </div>
        <NextButton onClick={() => setStep('staging')}>Begin — Choose Your Staging</NextButton>
      </div>
    );
  }

  if (step === 'staging') {
    return (
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
        <ExitBar />
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Turn 1 of 5 — Staging</p>
        <p className="mt-2 text-ink-300">Choose how many stages your rocket will have.</p>
        <div className="mt-4 space-y-3">
          {STAGING_OPTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setStagingId(s.id)}
              className={
                'block w-full rounded-xl border p-4 text-left transition ' +
                (stagingId === s.id
                  ? 'border-signal-cyan bg-signal-cyan/10'
                  : 'border-space-700 bg-space-800 hover:border-signal-cyan/50')
              }
            >
              <p className="font-display text-base font-700 text-ink-100">{s.name}</p>
              {s.basedOn && <p className="text-xs text-signal-amber">Real-world example: {s.basedOn}</p>}
              <p className="mt-1 text-sm text-ink-300">{s.description}</p>
              <p className="mt-2 text-xs text-ink-500">{s.flavor}</p>
            </button>
          ))}
        </div>
        <NextButton onClick={() => setStep('propellant')} disabled={!stagingId}>
          Next — Choose Your Propellant
        </NextButton>
      </div>
    );
  }

  if (step === 'propellant') {
    return (
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
        <ExitBar />
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Turn 2 of 5 — Propellant Type</p>
        <p className="mt-2 text-ink-300">Choose the engine type that will power your rocket.</p>
        <div className="mt-4 space-y-3">
          {PROPELLANT_OPTIONS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPropellantId(p.id)}
              className={
                'block w-full rounded-xl border p-4 text-left transition ' +
                (propellantId === p.id
                  ? 'border-signal-cyan bg-signal-cyan/10'
                  : 'border-space-700 bg-space-800 hover:border-signal-cyan/50')
              }
            >
              <p className="font-display text-base font-700 text-ink-100">{p.name}</p>
              {p.basedOn && <p className="text-xs text-signal-amber">Real-world example: {p.basedOn}</p>}
              <p className="mt-1 text-sm text-ink-300">{p.description}</p>
              <p className="mt-2 text-xs text-ink-500">{p.flavor}</p>
            </button>
          ))}
        </div>
        <NextButton onClick={() => setStep('trajectory')} disabled={!propellantId}>
          Next — Plan Your Trajectory
        </NextButton>
      </div>
    );
  }

  if (step === 'trajectory') {
    return (
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
        <ExitBar />
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Turn 3 of 5 — Trajectory Plan</p>
        <div className="mt-2 rounded-lg border border-signal-amber/30 bg-signal-amber/5 p-3">
          <p className="text-sm text-ink-200">{TRAJECTORY_EVENT.scenario}</p>
        </div>
        <div className="mt-4 space-y-3">
          {TRAJECTORY_EVENT.options.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => setTrajectoryId(o.id)}
              className={
                'block w-full rounded-xl border p-4 text-left transition ' +
                (trajectoryId === o.id
                  ? 'border-signal-cyan bg-signal-cyan/10'
                  : 'border-space-700 bg-space-800 hover:border-signal-cyan/50')
              }
            >
              <p className="font-display text-base font-700 text-ink-100">{o.name}</p>
              {o.basedOn && <p className="text-xs text-signal-amber">Real-world example: {o.basedOn}</p>}
              <p className="mt-1 text-sm text-ink-300">{o.description}</p>
            </button>
          ))}
        </div>
        {trajectory && (
          <div className="mt-4 rounded-lg border border-signal-green/30 bg-signal-green/5 p-3 text-sm text-ink-200">
            {trajectory.resultText}
          </div>
        )}
        <NextButton onClick={() => setStep('budget')} disabled={!trajectoryId}>
          Next — Set Your Weight Budget
        </NextButton>
      </div>
    );
  }

  if (step === 'budget') {
    return (
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
        <ExitBar />
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Turn 4 of 5 — Weight Budget</p>
        <p className="mt-2 text-ink-300">
          Split exactly {WEIGHT_BUDGET_TOTAL_POINTS} points of your rocket's useful load across these 3 real
          categories — the same "every pound saved in structure is a pound available elsewhere" tradeoff the
          Weight lessons cover.
        </p>
        <div className="mt-4 space-y-4">
          {WEIGHT_BUDGET_CATEGORIES.map((c) => (
            <div key={c.id} className="rounded-xl border border-space-700 bg-space-800 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-display text-sm font-700 text-ink-100">{c.name}</p>
                  <p className="text-xs text-ink-500">{c.description}</p>
                </div>
                <input
                  type="number"
                  min={0}
                  max={WEIGHT_BUDGET_TOTAL_POINTS}
                  value={budget[c.id]}
                  onChange={(e) => setBudgetValue(c.id, e.target.value)}
                  className="w-20 rounded-lg border border-space-600 bg-space-900 px-2 py-1 text-right text-ink-100 focus:border-signal-cyan focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
        <p className={'mt-3 text-sm ' + (budgetValid ? 'text-signal-green' : 'text-signal-amber')}>
          Total: {budgetTotal} / {WEIGHT_BUDGET_TOTAL_POINTS} {budgetValid ? '— balanced' : '— must total exactly ' + WEIGHT_BUDGET_TOTAL_POINTS}
        </p>
        <NextButton onClick={() => setStep('scorecard')} disabled={!budgetValid}>
          Next — See Your Launch-Readiness Scorecard
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
          <p className="text-xs font-display uppercase tracking-widest text-signal-green">Launch Director Complete</p>
          <p className="telemetry mt-2 text-3xl font-700 text-signal-amber">+{xpEarned} XP</p>
          <p className="mt-3 text-sm text-ink-300">Your reflection is saved. Come back and plan a different mission any time.</p>
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
      <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Turn 5 of 5 — Launch-Readiness Scorecard</p>
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
          Explain to Commander Nova, using real vocabulary from these units ({staging?.name}, {propellant?.name},
          your trajectory choice, and your weight budget split), why your decisions led to your mission's
          strongest score being {SCORE_LABELS[topScoreKey]}.
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
        Finish Launch Director
      </NextButton>
    </div>
  );
}
