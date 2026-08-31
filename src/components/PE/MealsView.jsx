import { useState, useMemo } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { todayDateStr, toDateStr } from '../../lib/scheduler.js';

// Local-timezone date — toISOString() is UTC and filed meals logged after
// ~8pm Eastern under TOMORROW'S date (same bug class fixed in the store,
// Batch A/B, Aug 2026).
function todayStr() {
  return todayDateStr();
}

const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

// Order meals within a day the natural way, whatever order they were logged.
const MEAL_ORDER = { Breakfast: 0, Lunch: 1, Dinner: 2, Snack: 3 };

function formatDay(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
}

/**
 * Meal Log (Part 5) — student-facing. Log what you actually ate, meal by meal,
 * to build awareness of fueling for strength and energy. Framing standard (same
 * as the rest of PE): this is about fuel, energy, and real habits — NEVER about
 * calories to cut, weight, or how you look. Protein is optional and framed as
 * "building-block fuel," with a general reference only.
 */
export function MealsView() {
  const peMeals = useAppStore((s) => s.peMeals);
  const addPEMeal = useAppStore((s) => s.addPEMeal);
  const deletePEMeal = useAppStore((s) => s.deletePEMeal);

  const today = todayStr();
  const [mealType, setMealType] = useState('Breakfast');
  const [description, setDescription] = useState('');
  const [protein, setProtein] = useState('');
  const [msg, setMsg] = useState('');

  const todayMeals = useMemo(
    () =>
      peMeals
        .filter((m) => m.date === today)
        .sort((a, b) => (MEAL_ORDER[a.mealType] ?? 9) - (MEAL_ORDER[b.mealType] ?? 9)),
    [peMeals, today]
  );

  const todayProtein = todayMeals.reduce((sum, m) => sum + (Number(m.proteinG) || 0), 0);

  // Last 7 days (including today) rolled up per day, newest first.
  const weekSummary = useMemo(() => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(`${today}T00:00:00`);
      d.setDate(d.getDate() - i);
      const key = toDateStr(d); // local, never UTC-shifted
      const meals = peMeals.filter((m) => m.date === key);
      if (meals.length === 0 && i !== 0) continue;
      days.push({
        date: key,
        count: meals.length,
        protein: meals.reduce((s, m) => s + (Number(m.proteinG) || 0), 0)
      });
    }
    return days;
  }, [peMeals, today]);

  const add = async () => {
    if (!description.trim()) {
      setMsg('Add a quick description of what you ate.');
      setTimeout(() => setMsg(''), 2500);
      return;
    }
    await addPEMeal({ date: today, mealType, description, proteinG: protein });
    setDescription('');
    setProtein('');
    setMsg('Logged!');
    setTimeout(() => setMsg(''), 1500);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Log a Meal or Snack</p>
        <p className="mt-1 text-sm text-ink-300">
          Write down what you actually ate — this is about noticing how you fuel for strength and energy, never
          about cutting food or counting to a limit. Protein is optional; a general reference for ages 9–13 is
          roughly 34g of protein a day, but your real target comes from your pediatrician, not this app.
        </p>

        <div className="mt-4">
          <p className="text-sm text-ink-300">Meal</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {MEAL_TYPES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setMealType(t)}
                className={
                  'rounded-full border px-3 py-1.5 text-xs font-display font-600 transition ' +
                  (mealType === t
                    ? 'border-signal-cyan bg-signal-cyan/15 text-signal-cyan'
                    : 'border-space-600 text-ink-300 hover:text-ink-100')
                }
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <label className="mt-4 block text-sm text-ink-300">
          What did you eat?
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Scrambled eggs, toast, and an orange"
            className="mt-1 w-full rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-ink-100"
          />
        </label>

        <label className="mt-3 block text-sm text-ink-300 sm:max-w-[12rem]">
          Protein (g, optional)
          <input
            type="number"
            min="0"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
            className="mt-1 w-full rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-ink-100"
          />
        </label>

        <button
          type="button"
          onClick={add}
          className="mt-4 rounded-lg bg-signal-cyan px-4 py-2 text-sm font-display font-700 text-space-950 hover:brightness-110"
        >
          Add to Today's Log
        </button>
        {msg && <span className="ml-3 text-sm text-signal-green">{msg}</span>}
      </div>

      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <div className="flex items-center justify-between">
          <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Today — {formatDay(today)}</p>
          {todayProtein > 0 && (
            <span className="rounded-full border border-signal-green/40 bg-signal-green/10 px-3 py-1 text-xs font-display text-signal-green">
              {todayProtein}g protein so far
            </span>
          )}
        </div>
        {todayMeals.length === 0 ? (
          <p className="mt-3 text-sm text-ink-500">No meals logged yet today. Add your first one above.</p>
        ) : (
          <div className="mt-3 space-y-2">
            {todayMeals.map((m) => (
              <div
                key={m.id}
                className="flex items-start justify-between gap-3 rounded-lg border border-space-700 bg-space-900 px-3 py-2"
              >
                <div className="min-w-0">
                  <p className="text-sm text-ink-100">
                    <span className="font-display font-700 text-signal-amber">{m.mealType}</span>
                    {m.proteinG ? <span className="text-ink-500"> · {m.proteinG}g protein</span> : ''}
                  </p>
                  <p className="text-sm text-ink-300">{m.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => deletePEMeal(m.id)}
                  className="flex-none text-xs text-ink-500 underline hover:text-signal-red"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {weekSummary.length > 0 && (
        <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
          <p className="text-xs font-display uppercase tracking-widest text-ink-500">Last 7 Days</p>
          <div className="mt-2 space-y-1.5">
            {weekSummary.map((d) => (
              <div
                key={d.date}
                className="flex items-center justify-between rounded-lg border border-space-700 bg-space-900 px-3 py-2 text-sm"
              >
                <span className="text-ink-300">{formatDay(d.date)}</span>
                <span className="text-ink-500">
                  {d.count} meal{d.count === 1 ? '' : 's'}
                  {d.protein > 0 ? ` · ${d.protein}g protein` : ''}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
