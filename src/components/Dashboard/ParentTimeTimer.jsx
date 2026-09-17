import { useEffect, useMemo, useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import {
  PARENT_TASKS,
  LONG_SESSION_MINUTES,
  openSession,
  sessionMinutes,
  startRecord,
  stopChanges,
  correctionChanges,
  weekSummary,
  weekStartOf,
  addDaysStr,
  localDateStr,
  taskLabel,
  formatMinutes,
  formatClock
} from '../../lib/parentTime.js';

/**
 * Parent Time — the Start/Stop button in the Parent Dashboard header, and the
 * weekly log it feeds. See lib/parentTime.js for why and where it is stored.
 */

function useNow(running) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!running) return undefined;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [running]);
  return now;
}

export function ParentTimeTimer({ onOpenLog }) {
  const adminRecords = useAppStore((s) => s.adminRecords);
  const addParentRecord = useAppStore((s) => s.addParentRecord);
  const updateParentRecord = useAppStore((s) => s.updateParentRecord);
  const running = useMemo(() => openSession(adminRecords), [adminRecords]);
  const now = useNow(Boolean(running));
  const [task, setTask] = useState('grading');
  const [busy, setBusy] = useState(false);

  const week = useMemo(
    () => weekSummary(adminRecords, weekStartOf(localDateStr(new Date(now))), new Date(now).toISOString()),
    [adminRecords, now]
  );

  async function start() {
    if (busy) return;
    setBusy(true);
    try {
      await addParentRecord(startRecord({ task }));
    } finally {
      setBusy(false);
    }
  }

  async function stop() {
    if (busy || !running) return;
    setBusy(true);
    try {
      await updateParentRecord(running.id, stopChanges(running));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="print-hide flex flex-wrap items-center gap-2 rounded-lg border border-space-700 bg-space-800 px-3 py-2 shadow-panel">
      <p className="text-xs font-display uppercase tracking-widest text-ink-500">Parent time</p>
      {running ? (
        <>
          <button
            type="button"
            onClick={stop}
            disabled={busy}
            className="rounded-md bg-signal-red/20 px-3 py-1.5 text-sm font-display font-700 text-signal-red hover:bg-signal-red/30"
          >
            ■ Stop · {formatClock(now - new Date(running.startedAt).getTime())}
          </button>
          <span className="text-xs text-ink-300">{taskLabel(running.task)}</span>
        </>
      ) : (
        <>
          <select
            value={task}
            onChange={(e) => setTask(e.target.value)}
            aria-label="What you are working on"
            className="rounded-md border border-space-700 bg-space-900 px-2 py-1.5 text-sm text-ink-100"
          >
            {PARENT_TASKS.map((t) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={start}
            disabled={busy}
            className="rounded-md bg-signal-green/20 px-3 py-1.5 text-sm font-display font-700 text-signal-green hover:bg-signal-green/30"
          >
            ▶ Start
          </button>
        </>
      )}
      <button
        type="button"
        onClick={onOpenLog}
        className="ml-auto text-xs text-ink-300 underline hover:text-ink-100"
      >
        This week: {formatMinutes(week.minutes)}
      </button>
    </div>
  );
}

function SessionRow({ s, nowIso }) {
  const updateParentRecord = useAppStore((st) => st.updateParentRecord);
  const removeAdminRecord = useAppStore((st) => st.removeAdminRecord);
  const [editing, setEditing] = useState(false);
  const [minutes, setMinutes] = useState(String(sessionMinutes(s, nowIso)));
  const [task, setTask] = useState(s.task || 'other');
  const [note, setNote] = useState(s.detail || '');
  const [error, setError] = useState(null);
  const mins = sessionMinutes(s, nowIso);
  const long = mins > LONG_SESSION_MINUTES;
  const started = new Date(s.startedAt);

  async function save(e) {
    e.preventDefault();
    const result = correctionChanges(s, { minutes, task, note });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    await updateParentRecord(s.id, result.changes);
    setEditing(false);
    setError(null);
  }

  return (
    <li className="rounded-lg border border-space-700 bg-space-900 px-3 py-2 text-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-ink-300">
          {started.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}{' '}
          {started.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })} · {taskLabel(s.task)}
          {s.detail ? <span className="text-ink-500"> — {s.detail}</span> : null}
        </span>
        <span className={long ? 'font-700 text-signal-amber' : 'text-ink-100'}>
          {s.endedAt ? formatMinutes(mins) : `running · ${formatMinutes(mins)}`}
          {s.correctedAt ? <span className="text-ink-500"> (corrected)</span> : null}
        </span>
      </div>
      {long && s.endedAt && !s.correctedAt && (
        <p className="mt-1 text-xs text-signal-amber">
          Over {LONG_SESSION_MINUTES / 60} hours — was the timer left running? Fix it below.
        </p>
      )}
      {s.endedAt && !editing && (
        <div className="mt-1 flex gap-3 text-xs">
          <button type="button" className="text-ink-300 underline" onClick={() => setEditing(true)}>Fix time</button>
          <button type="button" className="text-signal-red underline" onClick={() => removeAdminRecord(s.id)}>Delete</button>
        </div>
      )}
      {editing && (
        <form onSubmit={save} className="mt-2 flex flex-wrap items-end gap-2">
          <label className="text-xs text-ink-500">
            Minutes
            <input
              type="number"
              min="0"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              className="mt-0.5 block w-20 rounded-md border border-space-700 bg-space-800 px-2 py-1 text-sm text-ink-100"
            />
          </label>
          <label className="text-xs text-ink-500">
            Task
            <select
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="mt-0.5 block rounded-md border border-space-700 bg-space-800 px-2 py-1 text-sm text-ink-100"
            >
              {PARENT_TASKS.map((t) => (
                <option key={t.id} value={t.id}>{t.label}</option>
              ))}
            </select>
          </label>
          <label className="flex-1 text-xs text-ink-500">
            Note
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="mt-0.5 block w-full rounded-md border border-space-700 bg-space-800 px-2 py-1 text-sm text-ink-100"
            />
          </label>
          <button type="submit" className="rounded-md bg-signal-cyan/15 px-3 py-1 text-sm text-signal-cyan">Save</button>
          <button type="button" className="text-xs text-ink-300 underline" onClick={() => setEditing(false)}>Cancel</button>
          {error && <p className="w-full text-xs text-signal-red">{error}</p>}
        </form>
      )}
    </li>
  );
}

export function ParentTimeSection() {
  const adminRecords = useAppStore((s) => s.adminRecords);
  const running = useMemo(() => openSession(adminRecords), [adminRecords]);
  const now = useNow(Boolean(running));
  const nowIso = new Date(now).toISOString();
  const thisWeek = weekStartOf(localDateStr(new Date(now)));
  const [weekStart, setWeekStart] = useState(thisWeek);
  const week = useMemo(() => weekSummary(adminRecords, weekStart, nowIso), [adminRecords, weekStart, nowIso]);
  const days = Array.from({ length: 7 }, (_, i) => addDaysStr(weekStart, i));

  return (
    <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
      <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Parent Time</p>
      <h3 className="mt-1 font-display text-lg font-700 text-ink-100">How long your side of school takes</h3>
      <p className="mt-2 text-sm text-ink-300">
        Press <strong>Start</strong> at the top of the dashboard when you sit down to grade, plan,
        take attendance or check work, and <strong>Stop</strong> when you finish. It keeps counting
        if you switch screens, reload or the computer sleeps. Time one full week, then write the
        total down; that number is the answer to &ldquo;does upkeep fit the time I have?&rdquo;
      </p>

      <div className="mt-4 flex items-center justify-between gap-2">
        <button type="button" className="text-sm text-ink-300 underline" onClick={() => setWeekStart(addDaysStr(weekStart, -7))}>
          ← Previous week
        </button>
        <p className="text-sm font-display font-700 text-ink-100">Week of {weekStart}</p>
        <button
          type="button"
          className="text-sm text-ink-300 underline disabled:opacity-40"
          disabled={weekStart >= thisWeek}
          onClick={() => setWeekStart(addDaysStr(weekStart, 7))}
        >
          Next week →
        </button>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-space-700 bg-space-900 p-4">
          <p className="text-xs font-display uppercase tracking-widest text-ink-500">Week total</p>
          <p className="mt-1 font-display text-3xl font-700 text-signal-cyan">{formatMinutes(week.minutes)}</p>
          <p className="mt-1 text-xs text-ink-500">
            {week.minutes} minutes · {week.sessions.length} session{week.sessions.length === 1 ? '' : 's'}
          </p>
        </div>
        <div className="rounded-lg border border-space-700 bg-space-900 p-4">
          <p className="text-xs font-display uppercase tracking-widest text-ink-500">By task</p>
          <ul className="mt-1 space-y-0.5 text-sm text-ink-300">
            {PARENT_TASKS.filter((t) => week.byTask[t.id]).map((t) => (
              <li key={t.id} className="flex justify-between">
                <span>{t.label}</span>
                <span className="text-ink-100">{formatMinutes(week.byTask[t.id])}</span>
              </li>
            ))}
            {week.sessions.length === 0 && <li className="text-ink-500">Nothing timed this week yet.</li>}
          </ul>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-7 gap-1 text-center text-xs">
        {days.map((d) => (
          <div key={d} className="rounded-md border border-space-700 bg-space-900 px-1 py-1.5">
            <p className="text-ink-500">
              {new Date(`${d}T12:00:00`).toLocaleDateString(undefined, { weekday: 'short' })}
            </p>
            <p className="font-display text-ink-100">{week.byDay[d] ? formatMinutes(week.byDay[d]) : '—'}</p>
          </div>
        ))}
      </div>

      {week.long.length > 0 && (
        <p className="mt-3 text-sm text-signal-amber">
          {week.long.length} session{week.long.length === 1 ? ' is' : 's are'} over {LONG_SESSION_MINUTES / 60} hours.
          Check {week.long.length === 1 ? 'it' : 'them'} before you write the week down.
        </p>
      )}

      <ul className="mt-3 space-y-1.5">
        {week.sessions.map((s) => (
          <SessionRow key={s.id} s={s} nowIso={nowIso} />
        ))}
      </ul>
    </div>
  );
}
