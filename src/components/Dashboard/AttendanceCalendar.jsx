import { useMemo, useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { academyContent } from '../../content/academyContent.js';
import { isSchoolDay as slotIsSchoolDay } from '../../content/slots/timetable.js';
import { instructionMinutes } from '../../lib/instructionTime.js';
import { scheduledMinutesByDate } from '../../lib/scheduledMinutes.js';
import { SCHOOL_YEAR_START_DATE } from '../../lib/schoolQuarter.js';
import { toDateStr, todayDateStr, getMonthGrid, formatMonthLabel, parseDateStr } from '../../lib/scheduler.js';
import {
  ATTENDANCE_MARKS,
  DAY_STATUSES,
  dayStatus,
  latestMarks,
  markLabel,
  markRecord,
  monthCounts
} from '../../lib/attendanceDay.js';
import { formatMinutes } from '../../lib/parentTime.js';

/**
 * The Attendance calendar (Sept 17, 2026) — audit gate 31: open any past date
 * and see that day's status, with the rule for a school day written on the
 * page. Status logic lives in lib/attendanceDay.js and asks the school's own
 * rule, so this screen and the compliance count agree by construction.
 *
 * `minutesPerDay`, `daysRequired` and `ruleSource` come from the dashboard,
 * which holds the school's numbers; this file holds none.
 */

const TONE = {
  green: 'border-signal-green/60 bg-signal-green/15 text-signal-green',
  amber: 'border-signal-amber/60 bg-signal-amber/15 text-signal-amber',
  red: 'border-signal-red/60 bg-signal-red/15 text-signal-red',
  muted: 'border-space-700 bg-space-900 text-ink-500'
};

function useScheduledByDate() {
  const khanDailyLog = useAppStore((s) => s.khanDailyLog);
  const peWorkoutLog = useAppStore((s) => s.peWorkoutLog);
  const guitarLog = useAppStore((s) => s.guitarLog);
  const typingLog = useAppStore((s) => s.typingLog);
  const gardenLog = useAppStore((s) => s.gardenLog);
  const scheduleBlocks = useAppStore((s) => s.scheduleBlocks);
  const weeklyWordState = useAppStore((s) => s.weeklyWords);
  const writingEntries = useAppStore((s) => s.writingEntries);
  const lessonProgress = useAppStore((s) => s.lessonProgress);
  const morningMeetings = useAppStore((s) => s.morningMeetings);
  const khanAcademyAssignments = useAppStore((s) => s.khanAcademyAssignments);
  return useMemo(
    () =>
      scheduledMinutesByDate({
        khanDailyLog, peWorkoutLog, guitarLog, typingLog, gardenLog, scheduleBlocks, writingEntries, weeklyWordState,
        lessonProgress,
        morningMeetings,
        khanAcademyAssignments
      }),
    [khanDailyLog, peWorkoutLog, guitarLog, typingLog, gardenLog, scheduleBlocks, writingEntries, weeklyWordState,
      lessonProgress, morningMeetings, khanAcademyAssignments]
  );
}

function DayDetail({ date, status, row, mark, onClose }) {
  const addParentRecord = useAppStore((s) => s.addParentRecord);
  const setOfflineInstructionMinutes = useAppStore((s) => s.setOfflineInstructionMinutes);
  const [choice, setChoice] = useState(mark?.mark || '');
  const [note, setNote] = useState(mark?.detail || '');
  const [offline, setOffline] = useState(row?.offlineMinutes ? String(row.offlineMinutes) : '');
  const [saved, setSaved] = useState(null);
  const [error, setError] = useState(null);
  const info = DAY_STATUSES[status.code];

  async function saveMark(e) {
    e.preventDefault();
    await addParentRecord(markRecord({ date, mark: choice || null, note }));
    setSaved(choice ? 'Mark saved.' : 'Mark cleared.');
  }

  async function saveOffline(e) {
    e.preventDefault();
    const result = await setOfflineInstructionMinutes(date, offline === '' ? 0 : offline);
    if (result && result.ok === false) {
      setError(result.error);
      return;
    }
    setError(null);
    setSaved('Offline minutes saved.');
  }

  return (
    <div className="mt-4 rounded-lg border border-signal-cyan/40 bg-space-900 p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-display text-base font-700 text-ink-100">
            {parseDateStr(date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          <p className={'mt-1 inline-block rounded-md border px-2 py-0.5 text-sm ' + TONE[info.tone]}>{info.label}</p>
          {mark?.mark && (
            <p className="mt-1 text-sm text-ink-100">
              Your mark: <strong>{markLabel(mark.mark)}</strong>
              {mark.detail ? <span className="text-ink-300"> — {mark.detail}</span> : null}
            </p>
          )}
        </div>
        <button type="button" onClick={onClose} className="text-sm text-ink-300 underline">Close</button>
      </div>

      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-sm sm:grid-cols-4">
        <dt className="text-ink-500">Counted time</dt>
        <dd className="text-ink-100">{formatMinutes(status.minutes)}</dd>
        <dt className="text-ink-500">Time in the app</dt>
        <dd className="text-ink-100">{formatMinutes(row?.activeMinutes || 0)}</dd>
        <dt className="text-ink-500">Offline time</dt>
        <dd className="text-ink-100">{formatMinutes(row?.offlineMinutes || 0)}</dd>
        <dt className="text-ink-500">Activities done</dt>
        <dd className="text-ink-100">{status.activities}</dd>
      </dl>

      {status.code !== 'future' && (
        <>
          <form onSubmit={saveMark} className="mt-4 space-y-2">
            <p className="text-xs font-display uppercase tracking-widest text-ink-500">Mark this day</p>
            <div className="flex flex-wrap gap-1">
              {ATTENDANCE_MARKS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setChoice(choice === m.id ? '' : m.id)}
                  className={
                    'rounded-md border px-3 py-1 text-sm ' +
                    (choice === m.id ? 'border-signal-cyan bg-signal-cyan/15 text-signal-cyan' : 'border-space-700 text-ink-300')
                  }
                >
                  {m.label}
                </button>
              ))}
            </div>
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Note (optional) — e.g. dentist 9–11, finished work after lunch"
              className="block w-full rounded-md border border-space-700 bg-space-800 px-2 py-1.5 text-sm text-ink-100"
            />
            <button type="submit" className="rounded-md bg-signal-cyan/15 px-3 py-1.5 text-sm text-signal-cyan">
              {choice ? 'Save mark' : 'Clear mark'}
            </button>
            <p className="text-xs text-ink-500">
              Your mark is kept beside the record. It does not change the counted time.
            </p>
          </form>

          <form onSubmit={saveOffline} className="mt-4 flex flex-wrap items-end gap-2">
            <label className="text-xs text-ink-500">
              Offline minutes (work away from the screen)
              <input
                type="number"
                min="0"
                value={offline}
                onChange={(e) => setOffline(e.target.value)}
                className="mt-0.5 block w-28 rounded-md border border-space-700 bg-space-800 px-2 py-1 text-sm text-ink-100"
              />
            </label>
            <button type="submit" className="rounded-md bg-signal-cyan/15 px-3 py-1.5 text-sm text-signal-cyan">
              Save minutes
            </button>
            <p className="w-full text-xs text-ink-500">
              Books, field trips, labs, PE outside. This <strong>does</strong> count toward the day.
            </p>
          </form>
        </>
      )}
      {saved && <p className="mt-2 text-sm text-signal-green">{saved}</p>}
      {error && <p className="mt-2 text-sm text-signal-red">{error}</p>}
    </div>
  );
}

export function AttendanceCalendar({ minutesPerDay, daysRequired, ruleSource = null }) {
  const allAttendance = useAppStore((s) => s.allAttendance);
  const adminRecords = useAppStore((s) => s.adminRecords);
  const scheduledByDate = useScheduledByDate();
  const today = todayDateStr();
  const [cursor, setCursor] = useState(() => {
    const d = parseDateStr(today);
    return { y: d.getFullYear(), m: d.getMonth() };
  });
  const [selected, setSelected] = useState(null);
  const [jump, setJump] = useState('');

  // Read inside the component, never at module scope.
  // Read at call time from the school that is open now — see
  // src/content/slots/timetable.js (Sept 22, 2026).
  const isSchoolDay = (...args) => slotIsSchoolDay(academyContent(), ...args);
  const { instructionProgress = null } = academyContent().compliance;
  const schoolYearStart = toDateStr(SCHOOL_YEAR_START_DATE);
  const marks = useMemo(() => latestMarks(adminRecords), [adminRecords]);

  const statusOf = (date) =>
    dayStatus(date, {
      row: allAttendance[date] || {},
      scheduled: scheduledByDate[date] || 0,
      today,
      schoolYearStart,
      isSchoolDay,
      instructionProgress,
      minutesOf: instructionMinutes
    });

  const weeks = getMonthGrid(cursor.y, cursor.m);
  const monthDates = weeks.flat().filter((d) => d.getMonth() === cursor.m).map(toDateStr);
  const counts = monthCounts(monthDates.map(statusOf));

  function shift(n) {
    const d = new Date(cursor.y, cursor.m + n, 1);
    setCursor({ y: d.getFullYear(), m: d.getMonth() });
    setSelected(null);
  }

  function openDate(e) {
    e.preventDefault();
    if (!jump) return;
    const d = parseDateStr(jump);
    setCursor({ y: d.getFullYear(), m: d.getMonth() });
    setSelected(jump);
  }

  const hours = minutesPerDay ? minutesPerDay / 60 : null;

  return (
    <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
      <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Attendance</p>
      <h3 className="mt-1 font-display text-lg font-700 text-ink-100">Attendance calendar</h3>

      <div className="mt-3 rounded-lg border border-space-700 bg-space-900 p-3 text-sm text-ink-300">
        <p className="font-display font-700 text-ink-100">What counts as a school day</p>
        <ol className="mt-1 list-decimal space-y-0.5 pl-5">
          <li>It is on or after the first day of school ({parseDateStr(schoolYearStart).toLocaleDateString()}).</li>
          <li>It is a school day on the school calendar — or, on any other day, real work was checked off or offline minutes were entered.</li>
          <li>Something was actually done: a lesson, a check-off, writing, typing, or counted time.</li>
          {hours ? <li>A <strong>full</strong> day has at least {hours} hours of counted time. Less than that is a <strong>short</strong> day, which still counts as a day.</li> : null}
          {daysRequired ? <li>{daysRequired} counted days are required for the year.</li> : null}
        </ol>
        <p className="mt-1 text-xs text-ink-500">
          Counted time = the larger of time in the app and the scheduled time of the work that was checked off, plus offline minutes you enter.
          {ruleSource ? ` Source: ${ruleSource}.` : ''} Time the app is open on the Parent Dashboard never counts.
        </p>
      </div>

      <form onSubmit={openDate} className="mt-4 flex flex-wrap items-end gap-2">
        <label className="text-xs text-ink-500">
          Open a date
          <input
            type="date"
            value={jump}
            max={today}
            onChange={(e) => setJump(e.target.value)}
            className="mt-0.5 block rounded-md border border-space-700 bg-space-900 px-2 py-1 text-sm text-ink-100"
          />
        </label>
        <button type="submit" className="rounded-md bg-signal-cyan/15 px-3 py-1.5 text-sm text-signal-cyan">Open</button>
      </form>

      <div className="mt-4 flex items-center justify-between">
        <button type="button" onClick={() => shift(-1)} className="text-sm text-ink-300 underline">← Previous</button>
        <p className="font-display font-700 text-ink-100">{formatMonthLabel(new Date(cursor.y, cursor.m, 1))}</p>
        <button type="button" onClick={() => shift(1)} className="text-sm text-ink-300 underline">Next →</button>
      </div>
      <p className="mt-1 text-center text-xs text-ink-500">
        This month: {counts.full} full · {counts.short} short · {counts.none} with no work recorded
      </p>

      <div className="mt-2 grid grid-cols-7 gap-1 text-center text-[11px] text-ink-500">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => <div key={d}>{d}</div>)}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {weeks.flat().map((d) => {
          const date = toDateStr(d);
          const inMonth = d.getMonth() === cursor.m;
          if (!inMonth) return <div key={date} />;
          const st = statusOf(date);
          const mark = marks[date];
          return (
            <button
              key={date}
              type="button"
              onClick={() => setSelected(date)}
              title={DAY_STATUSES[st.code].label}
              className={
                'min-h-[3.25rem] rounded-md border p-1 text-left text-xs ' +
                TONE[DAY_STATUSES[st.code].tone] +
                (selected === date ? ' ring-2 ring-signal-cyan' : '') +
                (date === today ? ' font-700' : '')
              }
            >
              <span className="block">{d.getDate()}</span>
              {st.minutes > 0 && <span className="block text-[10px]">{formatMinutes(st.minutes)}</span>}
              {mark?.mark && <span className="block truncate text-[10px] text-ink-100">{markLabel(mark.mark)}</span>}
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
        {['full', 'short', 'none', 'off'].map((code) => (
          <span key={code} className={'rounded-md border px-2 py-0.5 ' + TONE[DAY_STATUSES[code].tone]}>
            {DAY_STATUSES[code].label}
          </span>
        ))}
      </div>

      {selected && (
        <DayDetail
          key={selected}
          date={selected}
          status={statusOf(selected)}
          row={allAttendance[selected]}
          mark={marks[selected]}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
