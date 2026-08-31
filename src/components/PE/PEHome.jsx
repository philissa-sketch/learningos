import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { getTodaysWorkout } from '../../academies/lamar/data/pe/weeklyWorkoutPlan.js';
import { WorkoutView } from './WorkoutView.jsx';
import { NutritionView } from './NutritionView.jsx';
import { TrackersView } from './TrackersView.jsx';
import { MealsView } from './MealsView.jsx';
import { WeeklyGoalCard } from './WeeklyGoalCard.jsx';
import { NovaPEGuide } from './NovaPEGuide.jsx';

const TABS = [
  { id: 'workout', label: "Today's Workout" },
  { id: 'nutrition', label: 'Nutrition' },
  { id: 'meals', label: 'Meals' },
  { id: 'trackers', label: 'Trackers' },
  { id: 'goals', label: 'Weekly Goal' }
];

/**
 * PE & Nutrition — student-facing home. Mirrors the tabbed-section
 * pattern used elsewhere in this app (Parent Dashboard's SECTIONS,
 * Typing's home screen) rather than inventing a new navigation shape.
 * Framing standard (hard requirement): everything here is written and
 * displayed around strength, energy, health, and real habits — never
 * appearance, weight loss, or body comparison.
 */
export function PEHome({ onExit }) {
  const [tab, setTab] = useState('workout');
  const todaysWorkout = getTodaysWorkout();
  const currentRank = useAppStore((s) => s.currentRank);

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:px-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-display uppercase tracking-widest text-ink-500">PE &amp; Nutrition</p>
          <h2 className="mt-1 font-display text-2xl font-700 text-ink-100">
            {todaysWorkout.dayName}: {todaysWorkout.title}
          </h2>
          <p className="mt-1 text-sm text-ink-300">
            Strength, energy, and real habits — never about how you look. Every session and every
            tracker here is about getting stronger and healthier, week after week.
          </p>
        </div>
        {onExit && (
          <button
            type="button"
            onClick={onExit}
            className="flex-none rounded-lg border border-space-600 px-3 py-1.5 text-xs font-display font-600 text-ink-300 hover:text-ink-100"
          >
            Back
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-1 rounded-lg bg-space-800 p-1 shadow-panel">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={
              'rounded-md px-3 py-1.5 text-sm font-display font-600 transition-colors ' +
              (tab === t.id ? 'bg-signal-cyan/15 text-signal-cyan' : 'text-ink-300 hover:text-ink-100')
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      <NovaPEGuide tab={tab} />

      {tab === 'workout' && <WorkoutView workout={todaysWorkout} />}
      {tab === 'nutrition' && <NutritionView />}
      {tab === 'meals' && <MealsView />}
      {tab === 'trackers' && <TrackersView />}
      {tab === 'goals' && <WeeklyGoalCard />}

      <p className="text-xs text-ink-600">
        Rank: <span className="text-signal-amber">{currentRank?.name}</span>
      </p>
    </div>
  );
}
