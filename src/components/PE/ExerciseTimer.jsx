import { useEffect, useRef, useState } from 'react';
import { parseTimedTarget, parseMinutesRange, formatSeconds } from '../../lib/exerciseTiming.js';
import { unlockAudio, playTimerWarning, playTimerDone } from '../../lib/sfx.js';

/**
 * A COUNTDOWN FOR A HELD POSITION.
 *
 * The parent, Aug 11 2026: "can you place timers on the workouts ex. wall sit
 * have a 40 sec timer on it."
 *
 * ---- WHAT IT IS FOR ----
 *
 * Twenty of the seventy exercises are holds measured in seconds — wall sit,
 * planks, hollow holds, bear crawls, stretches. Every one of them already
 * carried its prescription as text ("2-3 rounds of 20-40 seconds"), which is
 * fine to read and useless while you are doing it: counting in your head is
 * the first thing to go when your legs are shaking, and a twelve-year-old
 * counts fast when it hurts.
 *
 * ---- THREE DECISIONS WORTH STATING ----
 *
 * 1. IT COUNTS FROM WALL-CLOCK TIME, not by adding up ticks. Browsers throttle
 *    timers in a background tab, and an interval that accumulates would drift
 *    long — quietly making every set shorter than it claims. The end time is
 *    fixed the moment he presses start and every frame is measured against it,
 *    the same rule the class bell follows.
 *
 * 2. IT ENDS WITH A SOUND, because the point of a wall sit is that he is
 *    staring at the floor and not at this screen. A timer he has to watch has
 *    not saved him anything. There is also a single quiet blip at ten seconds
 *    — the part of a hold where knowing "nearly there" is worth most.
 *
 * 3. IT DEFAULTS TO THE TOP OF THE RANGE. The library says 20-40 seconds; the
 *    parent asked for 40. The range is a build-up, not a menu, so the goal is
 *    the default and the easier number is one tap away rather than the other
 *    way round. Choosing the shorter one is not framed as failing.
 */
export function ExerciseTimer({ exercise, spec: specOverride }) {
  const spec = specOverride || parseTimedTarget(exercise?.target);

  const [seconds, setSeconds] = useState(() => spec?.secondsMax ?? 30);
  const [endsAt, setEndsAt] = useState(null);      // ms timestamp, or null when idle
  const [left, setLeft] = useState(() => spec?.secondsMax ?? 30);
  const [round, setRound] = useState(1);
  const warnedRef = useRef(false);

  useEffect(() => {
    if (endsAt === null) return undefined;
    let raf;
    const tick = () => {
      const remaining = (endsAt - Date.now()) / 1000;
      if (remaining <= 10 && remaining > 0 && !warnedRef.current) {
        warnedRef.current = true;
        playTimerWarning();
      }
      if (remaining <= 0) {
        setLeft(0);
        setEndsAt(null);
        playTimerDone();
        return;
      }
      setLeft(remaining);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [endsAt]);

  if (!spec) return null;

  const running = endsAt !== null;
  const finished = !running && left <= 0;
  const options = spec.secondsMin === spec.secondsMax ? [spec.secondsMax] : [spec.secondsMin, spec.secondsMax];

  const start = () => {
    unlockAudio();               // this tap is the gesture the browser waits for
    warnedRef.current = false;
    setLeft(seconds);
    setEndsAt(Date.now() + seconds * 1000);
  };
  const stop = () => { setEndsAt(null); setLeft(seconds); warnedRef.current = false; };
  const pick = (value) => { if (running) return; setSeconds(value); setLeft(value); };
  const nextRound = () => { setRound((r) => r + 1); setLeft(seconds); warnedRef.current = false; };

  const pct = Math.max(0, Math.min(100, (left / Math.max(1, seconds)) * 100));

  return (
    <div className="mt-3 rounded-lg border border-space-700 bg-space-900 p-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-display uppercase tracking-widest text-ink-500">
            {spec.roundsMax > 1 ? (
              <>
                Round {round} of {spec.roundsMax}
                {spec.perSide ? ` · each ${spec.sideLabel}` : ''}
              </>
            ) : (
              spec.label || 'Timer'
            )}
          </p>
          <p
            className={
              'font-display text-4xl font-700 tabular-nums ' +
              (finished ? 'text-signal-green' : left <= 10 && running ? 'text-signal-amber' : 'text-ink-100')
            }
          >
            {finished ? 'Done' : formatSeconds(left)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {!running && !finished && options.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => pick(value)}
              aria-pressed={seconds === value}
              className={
                'rounded-md border px-2.5 py-1 text-xs font-display font-600 transition ' +
                (seconds === value
                  ? 'border-signal-cyan bg-signal-cyan/15 text-signal-cyan'
                  : 'border-space-600 text-ink-400 hover:text-ink-100')
              }
            >
              {value >= 60 ? `${Math.round(value / 60)} min` : `${value}s`}
            </button>
          ))}

          {finished ? (
            round < spec.roundsMax ? (
              <button
                type="button"
                onClick={nextRound}
                className="rounded-lg bg-signal-cyan px-4 py-1.5 font-display text-sm font-700 text-space-950 transition hover:brightness-110"
              >
                Next round
              </button>
            ) : (
              <button
                type="button"
                onClick={() => { setRound(1); setLeft(seconds); }}
                className="rounded-lg border border-space-600 px-3 py-1.5 font-display text-sm text-ink-400 transition hover:text-ink-100"
              >
                Start over
              </button>
            )
          ) : (
            <button
              type="button"
              onClick={running ? stop : start}
              className={
                'rounded-lg px-4 py-1.5 font-display text-sm font-700 transition ' +
                (running
                  ? 'border border-space-600 text-ink-300 hover:text-ink-100'
                  : 'bg-signal-cyan text-space-950 hover:brightness-110')
              }
            >
              {running ? 'Stop' : seconds >= 60 ? `Start ${Math.round(seconds / 60)} min` : `Start ${seconds}s`}
            </button>
          )}
        </div>
      </div>

      {/* A bar as well as a number, because the number is the thing he cannot
          look at while holding the position — peripheral vision catches a bar. */}
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-space-800">
        <div
          className={'h-full transition-[width] duration-100 ' + (left <= 10 && running ? 'bg-signal-amber' : 'bg-signal-cyan')}
          style={{ width: `${running || finished ? pct : 100}%` }}
        />
      </div>

      {finished && round >= spec.roundsMax && (
        <p className="mt-2 text-xs font-display text-signal-green">
          All {spec.roundsMax} rounds done{spec.perSide ? ` — both ${spec.sideLabel}s` : ''}. Nice work.
        </p>
      )}
      {finished && round < spec.roundsMax && spec.perSide && (
        <p className="mt-2 text-xs text-ink-400">Switch {spec.sideLabel}s, then start the next round.</p>
      )}
    </div>
  );
}
