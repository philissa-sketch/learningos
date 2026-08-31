import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { demoLinkFor } from '../../academies/lamar/data/pe/peVideoSource.js';
import { ExerciseTimer } from './ExerciseTimer.jsx';
import { parseMinutesRange } from '../../lib/exerciseTiming.js';
import { useToday } from '../../lib/useToday.js';

export function WorkoutView({ workout }) {
  const peWorkoutLog = useAppStore((s) => s.peWorkoutLog);
  const recordPEWorkoutCompletion = useAppStore((s) => s.recordPEWorkoutCompletion);
  const [justCompleted, setJustCompleted] = useState(false);

  const today = useToday();
  const completedToday = peWorkoutLog.some((w) => w.date === today && w.category === workout.category);

  const handleComplete = async () => {
    await recordPEWorkoutCompletion(workout.category, workout.exercises.map((e) => e.id));
    setJustCompleted(true);
  };

  // What he can open here is always ONE SPECIFIC VIDEO: the one his mother saved
  // for this exercise, or the curated default pinned by id in
  // data/pe/exerciseDemoVideos.js. Never a search, never a channel, never a URL
  // assembled at render time from the exercise name.
  //
  // That last sentence is the whole fix (Aug 10, 2026). A creator-channel search
  // WAS being handed to him wherever she had saved nothing, and 34 of the 70
  // exercises opened an empty page: "This channel has no content that matched
  // 'Bear Crawl form.'" An exercise with no video shows none, and the form cues
  // below are detailed enough to stand on their own. See data/pe/peVideoSource.js.
  const exerciseVideos = useAppStore((s) => s.exerciseVideos) || {};
  const videosEnabled = useAppStore((s) => s.exerciseVideosEnabled) !== false;

  const isDone = completedToday || justCompleted;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">
              {workout.categoryLabel} · Week {workout.weekNumber}
            </p>
            <h3 className="mt-1 font-display text-lg font-700 text-ink-100">{workout.title}</h3>
          </div>
          {isDone && (
            <span className="flex-none rounded-full border border-signal-green/40 bg-signal-green/10 px-3 py-1 text-xs font-display text-signal-green">
              Completed today
            </span>
          )}
        </div>
        <p className="mt-3 text-sm text-ink-300">
          <span className="font-display font-600 text-ink-100">Warm-up: </span>
          {workout.warmup}
        </p>

        {/**
          * THE WARM-UP GETS A TIMER TOO. (Aug 11, 2026.)
          *
          * The parent: "the timer isn't on the lower body strength warmup for
          * 3 - 5 minutes."
          *
          * The first pass timed only the rounds-and-seconds holds, on the
          * reasoning that a 40-minute bike ride does not want a countdown on a
          * laptop left in the kitchen. That reasoning holds — but the warm-up
          * is not that. It happens on the spot, at the start, in front of the
          * screen he has just opened, and "3-5 minutes of light movement" is
          * precisely the instruction a twelve-year-old shortens to ninety
          * seconds when nothing is counting.
          *
          * Recovery days say "No warm-up needed today", which carries no
          * minutes, so parseMinutesRange returns null and no timer appears.
          */}
        {(() => {
          const mins = parseMinutesRange(workout.warmup);
          if (!mins) return null;
          return (
            <ExerciseTimer
              spec={{
                roundsMin: 1,
                roundsMax: 1,
                secondsMin: mins.minutesMin * 60,
                secondsMax: mins.minutesMax * 60,
                perSide: false,
                sideLabel: 'side',
                label: 'Warm-up'
              }}
            />
          );
        })()}
      </div>

      <div className="space-y-3">
        {workout.exercises.map((ex) => (
          <div key={ex.id} className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
            <div className="flex items-start justify-between gap-3">
              <p className="font-display text-base font-700 text-ink-100">{ex.name}</p>
              <span className="flex-none rounded-full border border-signal-cyan/30 bg-signal-cyan/10 px-2 py-1 text-xs font-display text-signal-cyan">
                {ex.target}
              </span>
            </div>
            <p className="mt-1 text-xs text-ink-500">{ex.focus}</p>

            {(() => {
              const link = demoLinkFor(ex, {
                savedVideos: exerciseVideos,
                enabled: videosEnabled
              });
              if (!link) return null;
              return (
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-signal-cyan/40 bg-signal-cyan/10 px-3 py-1.5 text-xs font-display font-700 text-signal-cyan transition hover:brightness-110"
                >
                  ▶ {link.label}
                </a>
              );
            })()}

            {/* Only appears on a hold measured in seconds — see lib/exerciseTiming.js
                for why a 40-minute bike ride deliberately gets no countdown. */}
            <ExerciseTimer exercise={ex} />

            <div className="mt-3">
              <p className="text-xs font-display uppercase tracking-widest text-ink-500">Form Cues</p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-ink-300">
                {ex.formCues.map((cue, i) => (
                  <li key={i}>{cue}</li>
                ))}
              </ul>
            </div>

            <div className="mt-3 rounded-lg border border-signal-amber/30 bg-signal-amber/5 p-3">
              <p className="text-xs font-display uppercase tracking-widest text-signal-amber">Safety Note</p>
              <p className="mt-1 text-sm text-ink-300">{ex.safetyNotes}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
        <p className="text-sm text-ink-300">
          <span className="font-display font-600 text-ink-100">Cool-down: </span>
          {workout.cooldown}
        </p>
      </div>

      <button
        type="button"
        onClick={handleComplete}
        disabled={isDone}
        className={
          'w-full rounded-lg px-4 py-3 text-sm font-display font-700 transition ' +
          (isDone
            ? 'cursor-default bg-space-700 text-ink-500'
            : 'bg-signal-cyan text-space-950 hover:brightness-110')
        }
      >
        {isDone ? 'Workout Logged — Nice Work' : 'Mark Workout Complete'}
      </button>
    </div>
  );
}
