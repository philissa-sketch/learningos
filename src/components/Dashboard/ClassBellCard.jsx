import { useEffect, useMemo, useRef, useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { todayDateStr } from '../../lib/scheduler.js';
import {
  scheduleStatus,
  bellDue,
  bellKey,
  formatCountdown,
  formatClock,
  minutesSinceMidnight
} from '../../lib/classBell.js';
import {
  playBellWarning,
  playBellSwitch,
  playBellStart,
  unlockAudio,
  isAudioUnlocked,
  onAudioUnlockChange
} from '../../lib/sfx.js';
import { academyContent } from '../../content/academyContent.js';

const { dayPattern } = academyContent().timetable;

/**
 * THE CLASS BELL — a countdown and an alarm for switching subjects.
 * (Built Aug 9, 2026. The parent: "Is there anyway a timer and an alarm can be
 * added to the schedule so he know when to switch classes.")
 *
 * The schedule has existed since the beginning and it is a good one — eleven
 * named blocks from the 8:30 morning meeting to guitar at 3:00. But it was a
 * printed routine: it could tell him what the day looked like and never that
 * the current thing had ended. Knowing you have Science from 11 to 12 does not
 * help at 12:04 when you are still in it.
 *
 * ---- WHAT IT DOES ----
 *
 *   - Names the block he is in and counts down the time left in it.
 *   - Rings a soft warning two minutes before the block ends (parent-set).
 *   - Rings the switch bell at the boundary and names what is next.
 *   - Says what is next and when, so the countdown has a point.
 *
 * ---- TWO THINGS IT DOES NOT DO, SAID ON THE CARD RATHER THAN DISCOVERED ----
 *
 * 1. It cannot ring until something has been tapped once since the page
 *    loaded. Browsers refuse to play audio before a real interaction. An alarm
 *    that is armed but silently muted is worse than no alarm, because he would
 *    be relying on it — so the card asks for the tap in plain words and shows,
 *    at all times, whether sound is actually live.
 *
 *    IT NO LONGER DISARMS WHEN HE NAVIGATES. (Aug 10, 2026.) The parent: "the
 *    bell keeps turning off when he leaves the mission control." `armed` was
 *    React state on this card, so leaving the dashboard unmounted it and the
 *    bell went silent — and he had to know to come back and re-arm it, which
 *    is not a thing a twelve-year-old does three days running. The browser's
 *    gate is per PAGE LOAD, not per component mount, so the AudioContext is
 *    now the source of truth (isAudioUnlocked). It survives navigation and
 *    resets on reload, which is exactly the truth.
 * 2. It only runs while the app is open. It is a classroom bell, not a phone
 *    alarm, and the card says so.
 *
 * ---- WHY IT READS THE CLOCK INSTEAD OF COUNTING ----
 *
 * Browsers throttle timers in background tabs — a one-second interval can fire
 * once a minute. Anything that accumulates elapsed time drifts badly across a
 * school day. Every value here is recomputed from `Date.now()`, and the bell
 * fires on a boundary CHANGE rather than on a tick, so a tab that wakes up
 * forty seconds late still rings the boundary it missed, exactly once.
 */

const TONE = {
  'in-block': 'border-signal-cyan/40 bg-signal-cyan/5',
  gap: 'border-signal-amber/40 bg-signal-amber/5',
  before: 'border-space-700 bg-space-800',
  after: 'border-space-700 bg-space-800',
  'no-school': 'border-space-700 bg-space-800'
};

export function ClassBellCard() {
  const scheduleBlocks = useAppStore((s) => s.scheduleBlocks);
  const classBellEnabled = useAppStore((s) => s.classBellEnabled);
  const warningMinutes = useAppStore((s) => s.classBellWarningMinutes);

  // Armed is whether the browser will actually let a sound out, read from the
  // audio engine rather than remembered here — see the note above.
  const [armed, setArmed] = useState(() => isAudioUnlocked());
  useEffect(() => {
    // Any sound anywhere in the app unlocks audio, so subscribe rather than
    // assume this card's own button is the only way in.
    setArmed(isAudioUnlocked());
    return onAudioUnlockChange((on) => setArmed(on));
  }, []);
  const [now, setNow] = useState(() => new Date());
  const lastRungRef = useRef(null);

  // One second while a block is running so the last minute counts down
  // properly; the arithmetic is wall-clock either way, so the interval only
  // controls how often the screen refreshes, never correctness.
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // WAS `getHours() + getMinutes()/60 + getSeconds()/3600` -- hours, not
  // minutes. See minutesSinceMidnight in lib/classBell.js for what that cost.
  const minutes = minutesSinceMidnight(now);
  // A holiday is not a weekend, and before Aug 9 2026 this line only knew
  // about weekends — so the bell would have rung all day on Thanksgiving.
  const todayKind = dayPattern(now).kind;
  const isSchoolDay = todayKind !== 'weekend' && todayKind !== 'holiday';
  // Which weekday it is, so blocks that run on some days only are dropped from
  // the rest. Without this the after-school garden block (Fridays) would be
  // announced as the current class at 3:20 on a Tuesday.
  const weekday = now.getDay();
  const dateStr = todayDateStr();

  const status = useMemo(
    () => scheduleStatus(scheduleBlocks, { minutes, isSchoolDay, weekday }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scheduleBlocks, Math.floor(minutes * 60), isSchoolDay, weekday]
  );

  // --- the alarm ----------------------------------------------------------
  useEffect(() => {
    if (!classBellEnabled || !armed || !isSchoolDay) return;
    const due = bellDue(scheduleBlocks, { minutes, warningMinutes, isSchoolDay, weekday });
    const key = bellKey(dateStr, due);
    if (!key || key === lastRungRef.current) return;
    lastRungRef.current = key;
    if (due.kind === 'warning') playBellWarning();
    else if (due.kind === 'start') playBellStart();
    else playBellSwitch();
  }, [classBellEnabled, armed, isSchoolDay, scheduleBlocks, minutes, warningMinutes, dateStr]);

  const arm = () => {
    unlockAudio(); // this click is the gesture the browser is waiting for
    setArmed(isAudioUnlocked());
    // Ring once so he hears exactly what he is listening for, and so a muted
    // device or a broken audio context shows itself now rather than at 11am.
    playBellSwitch();
    // Do not re-ring a boundary that has already passed this minute.
    lastRungRef.current = bellKey(dateStr, bellDue(scheduleBlocks, { minutes, warningMinutes, isSchoolDay, weekday }));
  };

  if (!classBellEnabled) return null;

  const { phase, current, next, secondsLeftInBlock, secondsUntilNext } = status;
  const nearlyOver = secondsLeftInBlock !== null && secondsLeftInBlock <= warningMinutes * 60;

  let headline;
  let sub;
  if (phase === 'no-school') {
    headline = 'No classes today';
    sub = next ? `Next school day starts with ${next.label} at ${formatClock(next.startMin)}.` : null;
  } else if (phase === 'before') {
    headline = `School starts at ${formatClock(next.startMin)}`;
    sub = `First up: ${next.label} · starts in ${formatCountdown(secondsUntilNext)}`;
  } else if (phase === 'after') {
    headline = 'School day finished';
    sub = 'Everything on the schedule is done for today.';
  } else if (phase === 'gap') {
    headline = 'Between blocks';
    sub = next ? `${next.label} starts at ${formatClock(next.startMin)} — in ${formatCountdown(secondsUntilNext)}` : null;
  } else {
    headline = current.label;
    sub = next
      ? `Next: ${next.label} at ${formatClock(next.startMin)}`
      : 'Last block of the day.';
  }

  return (
    <div className={'mt-4 rounded-xl border p-4 shadow-panel ' + (TONE[phase] || TONE.before)}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">
            {phase === 'in-block' ? 'Right now' : 'Class bell'}
          </p>
          <h3 className="mt-0.5 font-display text-lg font-700 text-ink-100">{headline}</h3>
          {phase === 'in-block' && (
            <p className="text-xs text-ink-500">
              {formatClock(current.startMin)} – {formatClock(current.endMin)}
            </p>
          )}
          {sub && <p className="mt-1 text-sm text-ink-300">{sub}</p>}
        </div>

        {phase === 'in-block' && (
          <div className="flex-none text-right">
            <p
              className={
                'font-display text-3xl font-700 tabular-nums ' +
                (nearlyOver ? 'text-signal-amber' : 'text-ink-100')
              }
            >
              {formatCountdown(secondsLeftInBlock)}
            </p>
            <p className="text-[11px] text-ink-500">{nearlyOver ? 'wrap up' : 'left'}</p>
          </div>
        )}
      </div>

      {/* The whole day, so he can see where he is in it without leaving this
          screen. Past blocks stay visible rather than disappearing — seeing
          what is already done is most of what makes a schedule feel finishable. */}
      {isSchoolDay && status.blocks.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {status.blocks.map((b) => {
            const done = minutes >= b.endMin;
            const running = current && b.id === current.id;
            return (
              <span
                key={b.id}
                title={`${formatClock(b.startMin)} – ${formatClock(b.endMin)} · ${b.label}`}
                className={
                  'rounded px-1.5 py-0.5 text-[10px] font-display uppercase tracking-wide ' +
                  (running
                    ? 'bg-signal-cyan/20 text-signal-cyan'
                    : done
                      ? 'bg-space-700 text-ink-500 line-through'
                      : 'bg-space-800 text-ink-300')
                }
              >
                {b.label.length > 18 ? b.label.slice(0, 17) + '…' : b.label}
              </span>
            );
          })}
        </div>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-space-700 pt-3">
        {armed ? (
          <span className="rounded-full border border-signal-green/40 bg-signal-green/10 px-2.5 py-1 text-[11px] font-display text-signal-green">
            🔔 Bell is on
          </span>
        ) : (
          <button
            type="button"
            onClick={arm}
            className="rounded-lg bg-signal-cyan px-3 py-1.5 font-display text-sm font-700 text-space-950 transition hover:brightness-110"
          >
            🔔 Turn the bell on
          </button>
        )}
        {armed && (
          <button
            type="button"
            onClick={() => playBellSwitch()}
            className="rounded-lg border border-space-600 px-2.5 py-1 text-[11px] font-display text-ink-400 transition hover:border-signal-cyan hover:text-signal-cyan"
          >
            Hear it
          </button>
        )}
        <p className="text-[11px] text-ink-500">
          {armed
            ? `Rings ${warningMinutes > 0 ? `${warningMinutes} min before each block ends, and again ` : ''}when it is time to switch. It stays on while you move around the app — only closing or reloading the page turns it off.`
            : 'Your browser will not play a sound until you tap once. Tap and you will hear the bell straight away.'}
        </p>
      </div>
    </div>
  );
}
