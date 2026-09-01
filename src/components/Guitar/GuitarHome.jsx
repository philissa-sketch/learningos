import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { PracticeTrackerView } from './PracticeTrackerView.jsx';
import { TheoryView } from './TheoryView.jsx';
import { SongsView } from './SongsView.jsx';
import { RecordingView } from './RecordingView.jsx';
import { NovaGuitarGuide } from './NovaGuitarGuide.jsx';
import { academyContent } from '../../content/academyContent.js';

const { guitarSkillLadder = [] } = academyContent().electives;

const TABS = [
  { id: 'practice', label: 'Practice' },
  { id: 'theory', label: 'Theory' },
  { id: 'songs', label: 'Songs' },
  { id: 'recording', label: 'Recording' }
];

/**
 * Electric Guitar — student-facing home.
 *
 * Mirrors PEHome and GardenHome rather than inventing a third shape, and that
 * is right for more than consistency: these are this app's three PARTICIPATION
 * subjects, and all three are doing the same job — showing real work that is
 * recorded by what he did, not graded.
 *
 * TWO TRACKS, AND ONLY ONE OF THEM IS A LESSON. Theory is short, real and has a
 * question at the end. Practice is a fifteen-minute routine that cannot be
 * quizzed and should not be. Keeping them on separate tabs is what stops the
 * second one quietly turning into the first.
 */
export function GuitarHome({ onExit }) {
  const [tab, setTab] = useState('practice');
  const currentRank = useAppStore((s) => s.currentRank);
  const guitarLog = useAppStore((s) => s.guitarLog);
  const getGuitarPracticeStreak = useAppStore((s) => s.getGuitarPracticeStreak);

  const sessions = guitarLog.filter((r) => r.kind === 'practice').length;
  const minutes = guitarLog
    .filter((r) => r.kind === 'practice')
    .reduce((n, r) => n + (Number(r.data?.minutes) || 0), 0);

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:px-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-display uppercase tracking-widest text-ink-500">Electric Guitar</p>
          <h2 className="mt-1 font-display text-2xl font-700 text-ink-100">
            Fifteen minutes, every day, at three o'clock
          </h2>
          <p className="mt-1 text-sm text-ink-300">
            {guitarSkillLadder.length} skills this quarter, in order, ending with one riff you can play for
            somebody. Recorded by what you actually did — there is no grade here.
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

      <NovaGuitarGuide tab={tab} />

      {tab === 'practice' && <PracticeTrackerView onOpenRecording={() => setTab('recording')} />}
      {tab === 'theory' && <TheoryView />}
      {tab === 'songs' && <SongsView />}
      {tab === 'recording' && <RecordingView />}

      <p className="text-xs text-ink-600">
        {sessions} practice session{sessions === 1 ? '' : 's'} · {minutes} minutes · streak{' '}
        {getGuitarPracticeStreak()} · Rank <span className="text-signal-amber">{currentRank?.name}</span>
      </p>
    </div>
  );
}
