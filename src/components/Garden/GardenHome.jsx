import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { getGardenDayForWeekOf, getNextGardenDay } from '../../academies/lamar/data/gardening/gardenCalendar.js';
import { GardenBriefView } from './GardenBriefView.jsx';
import { SunSurveyView } from './SunSurveyView.jsx';
import { GardenLogView } from './GardenLogView.jsx';
import { BuildTrackView } from './BuildTrackView.jsx';
import { SeasonCalendarView } from './SeasonCalendarView.jsx';
import { NovaGardenGuide } from './NovaGardenGuide.jsx';
import { DomainProjectView } from '../Domains/DomainProjectView.jsx';

const TABS = [
  { id: 'friday', label: 'Mission' },
  { id: 'survey', label: 'Sun Survey' },
  { id: 'log', label: 'Garden Log' },
  { id: 'builds', label: 'Build Track' },
  // The domains-layer entry type (PROJECT_PLAN "Applied Learning"), added
  // Aug 9 2026. It lands in the Garden first because the garden is the
  // domain with a live project: the sun survey starts Friday Aug 14, and it
  // is the exact shape this form was designed to hold.
  { id: 'project', label: 'Improvement Project' },
  { id: 'season', label: 'Season' }
];

/**
 * Gardening — student-facing home. Mirrors PEHome's tabbed shape rather than
 * inventing a new one, which is right for more than consistency: PE is the
 * other PARTICIPATION subject in this app, and these two screens are doing the
 * same job — showing real work that is recorded by what he did, not graded.
 *
 * The garden: 4 ft x 8 ft, 7 ft of headroom, under an awning, in buckets.
 */
export function GardenHome({ onExit, onStartPrompt }) {
  const [tab, setTab] = useState('friday');
  const currentRank = useAppStore((s) => s.currentRank);
  const gardenLog = useAppStore((s) => s.gardenLog);

  // The Friday of the current week, so the brief is reachable on a Wednesday.
  // Falls forward to the next scheduled day outside the Q1 window.
  const day = getGardenDayForWeekOf() || getNextGardenDay();

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:px-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-display uppercase tracking-widest text-ink-500">Gardening</p>
          <h2 className="mt-1 font-display text-2xl font-700 text-ink-100">
            32 square feet, and everything above it
          </h2>
          <p className="mt-1 text-sm text-ink-300">
            A 4 ft x 8 ft bucket garden under an awning, worked as a design problem. Measure it, build for
            it, write down what changed. Recorded by what you actually did — there is no grade here.
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

      <NovaGardenGuide tab={tab} day={day} />

      {tab === 'friday' && <GardenBriefView day={day} onOpenProject={onStartPrompt} />}
      {tab === 'survey' && <SunSurveyView />}
      {tab === 'log' && <GardenLogView />}
      {tab === 'builds' && <BuildTrackView />}
      {tab === 'project' && <DomainProjectView defaultDomain="garden" />}
      {tab === 'season' && <SeasonCalendarView />}

      <p className="text-xs text-ink-600">
        {gardenLog.length} entries in the garden log · Rank:{' '}
        <span className="text-signal-amber">{currentRank?.name}</span>
      </p>
    </div>
  );
}
