import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { useToday } from '../../lib/useToday.js';

const MOOD_OPTIONS = ['Energized', 'Good', 'Okay', 'Tired', 'Sore'];

export function TrackersView() {
  const peDailyLog = useAppStore((s) => s.peDailyLog);
  const peBodyMetrics = useAppStore((s) => s.peBodyMetrics);
  const recordPEDailyLog = useAppStore((s) => s.recordPEDailyLog);
  const recordPEBodyMetrics = useAppStore((s) => s.recordPEBodyMetrics);

  const today = useToday();
  const todayLog = peDailyLog[today] || {};

  const [water, setWater] = useState(todayLog.waterOz ?? '');
  const [protein, setProtein] = useState(todayLog.proteinG ?? '');
  const [sleep, setSleep] = useState(todayLog.sleepHours ?? '');
  const [activityMinutes, setActivityMinutes] = useState(todayLog.activityMinutes ?? '');
  const [mood, setMood] = useState(todayLog.mood ?? '');
  const [savedMsg, setSavedMsg] = useState('');

  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [note, setNote] = useState('');
  const [metricsMsg, setMetricsMsg] = useState('');

  const saveDailyLog = async () => {
    await recordPEDailyLog({
      waterOz: water === '' ? null : Number(water),
      proteinG: protein === '' ? null : Number(protein),
      sleepHours: sleep === '' ? null : Number(sleep),
      activityMinutes: activityMinutes === '' ? null : Number(activityMinutes),
      mood: mood || null
    });
    setSavedMsg('Saved!');
    setTimeout(() => setSavedMsg(''), 2000);
  };

  const saveMetrics = async () => {
    if (height === '' && weight === '') return;
    await recordPEBodyMetrics({
      heightIn: height === '' ? null : Number(height),
      weightLb: weight === '' ? null : Number(weight),
      note
    });
    setHeight('');
    setWeight('');
    setNote('');
    setMetricsMsg('Logged — real growth tracking, not a goal number.');
    setTimeout(() => setMetricsMsg(''), 3000);
  };

  const recentMetrics = [...peBodyMetrics].slice(-5).reverse();

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Today's Quick Log</p>
        <p className="mt-1 text-sm text-ink-300">
          Water, protein, sleep, activity minutes, and how you're feeling — real daily habits, logged in a few
          seconds. General guideline reminders (not personalized medical targets) are shown as a reference:
          ages 9-13 have a general baseline of roughly up to 24 fl oz of plain water/day (on top of fluids from
          food and other drinks) and about 34g of protein/day. Your real, individual target should come from
          your pediatrician, not this app.
        </p>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="text-sm text-ink-300">
            Water (oz)
            <input
              type="number"
              min="0"
              value={water}
              onChange={(e) => setWater(e.target.value)}
              className="mt-1 w-full rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-ink-100"
            />
          </label>
          <label className="text-sm text-ink-300">
            Protein (g, estimated)
            <input
              type="number"
              min="0"
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
              className="mt-1 w-full rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-ink-100"
            />
          </label>
          <label className="text-sm text-ink-300">
            Sleep (hours)
            <input
              type="number"
              min="0"
              step="0.5"
              value={sleep}
              onChange={(e) => setSleep(e.target.value)}
              className="mt-1 w-full rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-ink-100"
            />
          </label>
          <label className="text-sm text-ink-300">
            Activity minutes
            <input
              type="number"
              min="0"
              value={activityMinutes}
              onChange={(e) => setActivityMinutes(e.target.value)}
              className="mt-1 w-full rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-ink-100"
            />
          </label>
        </div>

        <div className="mt-3">
          <p className="text-sm text-ink-300">How are you feeling today?</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {MOOD_OPTIONS.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMood(m)}
                className={
                  'rounded-full border px-3 py-1.5 text-xs font-display font-600 transition ' +
                  (mood === m
                    ? 'border-signal-cyan bg-signal-cyan/15 text-signal-cyan'
                    : 'border-space-600 text-ink-300 hover:text-ink-100')
                }
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={saveDailyLog}
          className="mt-4 rounded-lg bg-signal-cyan px-4 py-2 text-sm font-display font-700 text-space-950 hover:brightness-110"
        >
          Save Today's Log
        </button>
        {savedMsg && <span className="ml-3 text-sm text-signal-green">{savedMsg}</span>}
      </div>

      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Growth Check-In</p>
        <p className="mt-1 text-sm text-ink-300">
          Periodic height/weight tracking — this is a real growth record, the same kind of thing your
          pediatrician tracks, not a goal or an appearance number. Log it whenever you or a parent takes a
          real measurement, not on a fixed schedule.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="text-sm text-ink-300">
            Height (inches)
            <input
              type="number"
              min="0"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="mt-1 w-full rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-ink-100"
            />
          </label>
          <label className="text-sm text-ink-300">
            Weight (lb)
            <input
              type="number"
              min="0"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="mt-1 w-full rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-ink-100"
            />
          </label>
        </div>
        <label className="mt-3 block text-sm text-ink-300">
          Note (optional)
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. measured at the pediatrician visit"
            className="mt-1 w-full rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-ink-100"
          />
        </label>
        <button
          type="button"
          onClick={saveMetrics}
          className="mt-4 rounded-lg bg-signal-cyan px-4 py-2 text-sm font-display font-700 text-space-950 hover:brightness-110"
        >
          Log Growth Check-In
        </button>
        {metricsMsg && <span className="ml-3 text-sm text-signal-green">{metricsMsg}</span>}

        {recentMetrics.length > 0 && (
          <div className="mt-4 space-y-1.5">
            <p className="text-xs font-display uppercase tracking-widest text-ink-500">Recent Entries</p>
            {recentMetrics.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between rounded-lg border border-space-700 bg-space-900 px-3 py-2 text-sm"
              >
                <span className="text-ink-300">{m.date}</span>
                <span className="text-ink-500">
                  {m.heightIn ? `${m.heightIn} in` : '—'} · {m.weightLb ? `${m.weightLb} lb` : '—'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
