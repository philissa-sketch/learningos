import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { academyContent } from '../../content/academyContent.js';

const { getWeekNumber } = academyContent().pe;

function currentWeekKey() {
  const now = new Date();
  const week = getWeekNumber(now);
  return `${now.getFullYear()}-W${String(week).padStart(2, '0')}`;
}

const EXAMPLE_GOALS = [
  'Complete every planned workout this week.',
  'Do 3 full push-up sets without stopping.',
  'Hit my water goal every day this week.',
  'Try one new recipe from the Recipe Library.',
  'Hold a plank for 30 seconds with good form.',
  'Get 9 hours of sleep at least 5 nights this week.'
];

/**
 * Real, free-text weekly goals — deliberately not a numeric weight or
 * appearance target (see db.js's v15 schema comment). Framed entirely
 * around strength, energy, consistency, and skill.
 */
export function WeeklyGoalCard() {
  const weekKey = currentWeekKey();
  const peWeeklyGoals = useAppStore((s) => s.peWeeklyGoals);
  const updatePEWeeklyGoal = useAppStore((s) => s.updatePEWeeklyGoal);

  const existing = peWeeklyGoals[weekKey];
  const [goalText, setGoalText] = useState(existing?.goalText ?? '');
  const [msg, setMsg] = useState('');

  const save = async () => {
    await updatePEWeeklyGoal(weekKey, { goalText, achieved: existing?.achieved ?? false });
    setMsg('Goal saved!');
    setTimeout(() => setMsg(''), 2000);
  };

  const markAchieved = async () => {
    await updatePEWeeklyGoal(weekKey, { goalText, achieved: true });
    setMsg('Nice work — goal marked achieved!');
    setTimeout(() => setMsg(''), 2500);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">
          This Week's Goal ({weekKey})
        </p>
        <p className="mt-1 text-sm text-ink-300">
          Set one real goal for the week — about strength, energy, consistency, or a skill you're working on.
          Never about how you look.
        </p>

        <textarea
          value={goalText}
          onChange={(e) => setGoalText(e.target.value)}
          rows={3}
          placeholder="e.g. Do 3 full push-up sets without stopping"
          className="mt-3 w-full rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100"
        />

        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={save}
            className="rounded-lg bg-signal-cyan px-4 py-2 text-sm font-display font-700 text-space-950 hover:brightness-110"
          >
            Save Goal
          </button>
          {goalText && !existing?.achieved && (
            <button
              type="button"
              onClick={markAchieved}
              className="rounded-lg border border-signal-green/40 bg-signal-green/10 px-4 py-2 text-sm font-display font-700 text-signal-green hover:brightness-110"
            >
              Mark Achieved
            </button>
          )}
          {existing?.achieved && (
            <span className="rounded-full border border-signal-green/40 bg-signal-green/10 px-3 py-2 text-sm font-display text-signal-green">
              Achieved this week!
            </span>
          )}
        </div>
        {msg && <p className="mt-2 text-sm text-signal-green">{msg}</p>}
      </div>

      <div className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-ink-500">Need Ideas?</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-300">
          {EXAMPLE_GOALS.map((g, i) => (
            <li key={i}>{g}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
