import { useState, useEffect, useMemo } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { resolveBlockLabel, ROTATING_BLOCK_ID } from '../../lib/rotatingBlock.js';
import { SUBJECT_LABELS } from '../../academies/lamar/subjects.js';
import { dayPattern } from '../../academies/lamar/data/schedule/weekPattern.js';
import {
  toDateStr,
  todayDateStr,
  formatShortDate,
  addDays,
  parseDateStr
} from '../../lib/scheduler.js';
import { buildPlannerItemsByDate, splitPlannerItems } from '../../lib/plannerCalendar.js';

const COLOR_STYLES = {
  neutral: 'border-space-600 bg-space-800',
  math: 'border-signal-cyan/40 bg-signal-cyan/10',
  reading: 'border-signal-amber/40 bg-signal-amber/10',
  science: 'border-signal-green/40 bg-signal-green/10',
  writing: 'border-signal-cyan/40 bg-signal-cyan/10',
  pe: 'border-signal-red/40 bg-signal-red/10',
  aerospace: 'border-signal-green/40 bg-signal-green/10',
  break: 'border-ink-500/30 bg-space-900'
};

const COLOR_OPTIONS = [
  { key: 'neutral', label: 'Neutral' },
  { key: 'math', label: 'Cyan' },
  { key: 'reading', label: 'Amber' },
  { key: 'science', label: 'Green' },
  { key: 'pe', label: 'Red' },
  { key: 'break', label: 'Dim (break)' }
];

function timeToMinutes(t) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

function formatTime(t) {
  const [h, m] = t.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const displayHour = h % 12 === 0 ? 12 : h % 12;
  return `${displayHour}:${String(m).padStart(2, '0')} ${period}`;
}

function useCurrentMinutes() {
  const [minutes, setMinutes] = useState(() => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  });
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setMinutes(now.getHours() * 60 + now.getMinutes());
    }, 30000);
    return () => clearInterval(interval);
  }, []);
  return minutes;
}

/**
 * Daily view — the original DailySchedule.jsx content, now date-aware
 * (accepts which date is being viewed, defaults to today) and folded
 * into the Daily/Weekly/Monthly Scheduler. The block template itself is
 * a single repeating routine (same every school day), not per-date —
 * editing it always edits that one template regardless of which date is
 * being viewed, called out explicitly in the UI so this isn't confusing.
 * What IS real per-date is the "Due Today" section, pulling actual
 * Planner assignments for the exact date being viewed.
 */
export function DailyView({ date, onChangeDate }) {
  const scheduleBlocks = useAppStore((s) => s.scheduleBlocks);
  // Needed to tell a subject that is genuinely running this quarter from one
  // that hands off — Social Studies runs on Khan Academy alone in Q1.
  const khanAcademyAssignments = useAppStore((s) => s.khanAcademyAssignments);
  const updateScheduleBlock = useAppStore((s) => s.updateScheduleBlock);
  const addScheduleBlock = useAppStore((s) => s.addScheduleBlock);
  const removeScheduleBlock = useAppStore((s) => s.removeScheduleBlock);
  const moveScheduleBlock = useAppStore((s) => s.moveScheduleBlock);
  const resetScheduleToDefault = useAppStore((s) => s.resetScheduleToDefault);
  const classBellEnabled = useAppStore((s) => s.classBellEnabled);
  const classBellWarningMinutes = useAppStore((s) => s.classBellWarningMinutes);
  const setClassBellSettings = useAppStore((s) => s.setClassBellSettings);
  const assignments = useAppStore((s) => s.assignments);
  const academicAssignments = useAppStore((s) => s.academicAssignments);
  // The evidence the writing and garden feeds decide `done` from. Omitting
  // these defaults them to [] inside the feed, which marks every journal
  // entry and every garden task permanently unfinished — see the comment on
  // buildPlannerItems in MissionControlBoard.jsx.
  const writingEntries = useAppStore((s) => s.writingEntries);
  const gardenLog = useAppStore((s) => s.gardenLog);
  const getTodaysMission = useAppStore((s) => s.getTodaysMission);
  const toggleAssignmentComplete = useAppStore((s) => s.toggleAssignmentComplete);
  const setAcademicAssignmentStatus = useAppStore((s) => s.setAcademicAssignmentStatus);

  /**
   * Let the STUDENT close out his own work. (Added Aug 8, 2026.)
   *
   * Academic Center assignments could already be marked complete by him, but
   * Planner assignments could only be ticked off from the Parent Dashboard —
   * and Nova's week-ahead briefing counts both. So he was being told "3 things
   * due this week" and given no way to clear one of them. From his side it
   * would never clear, and he would hear the same three again next Saturday.
   *
   * If Nova names it as his, he has to be able to close it. Splitting the list
   * instead would mean teaching him which of his assignments are secretly not
   * his, which is worse.
   *
   * The item key is 'planner::12' or 'academic::12' — the two tables
   * auto-increment separately, so the source prefix is what makes the id
   * unambiguous. Undo is deliberately available: a mis-tap must be reversible
   * without going to a parent.
   */
  const markDue = (item, done) => {
    const id = Number(String(item.key).split('::')[1]);
    if (!Number.isFinite(id)) return;
    if (item.source === 'academic') setAcademicAssignmentStatus(id, done ? 'completed' : 'in-progress');
    else toggleAssignmentComplete(id);
  };
  // Subscribing to lessonProgress is what makes "Today's Lessons" update
  // the moment a lesson is completed. getTodaysMission is a stable
  // function reference, so selecting it alone never re-renders — the
  // store documents this exact staleness bug for other getters. (Batch B.)
  const lessonProgress = useAppStore((s) => s.lessonProgress);

  const [editing, setEditing] = useState(false);
  const nowMinutes = useCurrentMinutes();

  const dateStr = toDateStr(date);
  const isToday = dateStr === todayDateStr();
  // Both real sources of dated work — Planner AND Academic Success
  // Center — so a scheduled Book Report shows up on the day it's due.
  // ...and, since Aug 7 2026, the weekly STEPS of long assignments, so a
  // Book Report appears on every day he should be working on it and not only
  // on the day it is already too late to start.
  const { due: dueToday, steps: stepsToday } = useMemo(
    () => splitPlannerItems(buildPlannerItemsByDate({ assignments, academicAssignments, writingEntries, gardenLog }).get(dateStr) ?? []),
    [assignments, academicAssignments, writingEntries, gardenLog, dateStr]
  );

  /**
   * The actual lessons for this day — PROJECT_PLAN.md Part 8's "daily
   * lesson plans (more granular than the current Planner's
   * upcoming-lesson preview)."
   *
   * The gap this closes is specific. The schedule already said WHEN
   * ("9:00 Aerospace") and the due list already said WHAT'S DUE. Neither
   * ever said WHICH LESSON, so the answer to "what am I doing today"
   * still required opening the Lesson Roster and working it out.
   *
   * Computed, never stored: it is the 4+1 rotation for this weekday
   * crossed with his next unmastered lesson in each of those subjects.
   * A stored daily plan would need maintaining and would be wrong the
   * first time he got ahead or fell behind.
   */
  const pattern = dayPattern(date);
  // eslint-disable-next-line react-hooks/exhaustive-deps -- lessonProgress is the real reactive input; getTodaysMission reads it via get()
  const todaysLessons = useMemo(
    () =>
      pattern.subjects
        .map((subject) => ({ subject, lesson: getTodaysMission(subject) }))
        .filter((row) => row.lesson),
    [dateStr, lessonProgress, getTodaysMission]
  );

  const handleReset = () => {
    if (window.confirm('Reset to the recommended schedule? This replaces your current customizations.')) {
      resetScheduleToDefault();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-display uppercase tracking-widest text-ink-500">Daily</p>
          <h2 className="mt-1 font-display text-2xl font-700 text-ink-100">
            {isToday ? "Today's Routine" : formatShortDate(date)}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onChangeDate(addDays(date, -1))}
            className="rounded-lg border border-space-600 px-2.5 py-1.5 text-sm text-ink-300 transition hover:text-ink-100"
            aria-label="Previous day"
          >
            ←
          </button>
          {!isToday && (
            <button
              type="button"
              onClick={() => onChangeDate(new Date())}
              className="rounded-lg border border-signal-cyan/40 px-3 py-1.5 text-sm font-display text-signal-cyan transition hover:bg-signal-cyan/10"
            >
              Today
            </button>
          )}
          <button
            type="button"
            onClick={() => onChangeDate(addDays(date, 1))}
            className="rounded-lg border border-space-600 px-2.5 py-1.5 text-sm text-ink-300 transition hover:text-ink-100"
            aria-label="Next day"
          >
            →
          </button>
        </div>
      </div>

      {pattern.kind === 'core' && (
        <div className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
          <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">
            {isToday ? "Today's Lessons" : 'Lessons This Day'}
          </p>
          <p className="mt-1 text-xs text-ink-500">{pattern.note}</p>
          {todaysLessons.length === 0 ? (
            <p className="mt-2 text-sm text-ink-500">
              Every lesson in {pattern.subjects.map((x) => SUBJECT_LABELS[x] || x).join(' and ')} is already
              mastered — a good day for the Academic Center or a project.
            </p>
          ) : (
            <div className="mt-2 space-y-1.5">
              {todaysLessons.map(({ subject, lesson }) => (
                <div
                  key={subject}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-space-700 bg-space-900 px-3 py-2"
                >
                  <div className="min-w-0">
                    <p className="font-display text-sm font-700 text-ink-100">{lesson.title}</p>
                    <p className="text-xs text-ink-500">{SUBJECT_LABELS[subject] || subject}</p>
                  </div>
                  <span className="flex-none rounded-full border border-space-600 px-2 py-0.5 text-[10px] font-display uppercase tracking-widest text-ink-500">
                    Next up
                  </span>
                </div>
              ))}
            </div>
          )}
          <p className="mt-2 text-xs text-ink-600">
            Core academics run every school day through Khan Academy; the lessons above are the rotating
            subjects for this weekday, each showing the next one he hasn’t mastered.
          </p>
        </div>
      )}

      {pattern.kind === 'holiday' && (
        <div className="rounded-xl border border-signal-amber/35 bg-signal-amber/5 p-4">
          <p className="font-display text-[11px] uppercase tracking-widest text-signal-amber">
            {pattern.holiday} — Day Off
          </p>
          <p className="mt-1 text-sm text-ink-300">{pattern.note}</p>
        </div>
      )}

      {pattern.flex && pattern.kind === 'core' && (
        <div className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
          <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Friday — Open Block</p>
          <p className="mt-1 text-sm text-ink-300">{pattern.note}</p>
        </div>
      )}

      {dueToday.length > 0 && (
        <div className="rounded-xl border border-signal-amber/40 bg-signal-amber/5 p-4 shadow-panel">
          <p className="text-xs font-display uppercase tracking-widest text-signal-amber">
            Due {isToday ? 'Today' : 'This Day'}
          </p>
          <div className="mt-2 space-y-1.5">
            {dueToday.map((a) => (
              <div key={a.key} className="flex items-center justify-between rounded-lg border border-space-700 bg-space-900 px-3 py-2">
                <div>
                  <p className="font-display text-sm font-700 text-ink-100">{a.title}</p>
                  <p className="text-xs text-ink-500">
                    {a.typeLabel}
                    {a.subject ? ` · ${SUBJECT_LABELS[a.subject] || a.subject}` : ''}
                    {a.source === 'academic' ? ' · Academic Center' : ''}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => markDue(a, !a.done)}
                  aria-label={a.done ? `Mark ${a.title} as not done` : `Mark ${a.title} done`}
                  title={a.done ? 'Tap to undo' : 'Mark it done'}
                  className={
                    'flex-none rounded-full border px-3 py-1 text-[10px] font-display uppercase tracking-widest transition ' +
                    (a.done
                      ? 'border-signal-green/40 bg-signal-green/10 text-signal-green hover:border-signal-green'
                      : 'border-space-600 text-ink-500 hover:border-signal-cyan hover:text-signal-cyan')
                  }
                >
                  {a.done ? '✓ Done' : 'Mark done'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* The steps, not the deadline. A Book Report due Oct 23 used to appear
          on the calendar exactly once — on Oct 23. These rows are the four
          weekly checkpoints that lead there, each on its own day, with the
          instruction for that week attached so "work on your book report" is
          never the whole of the guidance. */}
      {stepsToday.length > 0 && (
        <div className="rounded-xl border border-signal-cyan/40 bg-signal-cyan/5 p-4 shadow-panel">
          <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">
            Work On {isToday ? 'Today' : 'This Day'}
          </p>
          <div className="mt-2 space-y-1.5">
            {stepsToday.map((s) => (
              <div key={s.key} className="rounded-lg border border-space-700 bg-space-900 px-3 py-2">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <p className="font-display text-sm font-700 text-ink-100">
                    {s.title}
                    <span className="ml-2 font-sans text-xs font-400 text-ink-500">{s.parentTitle}</span>
                  </p>
                  <span className="flex-none rounded-full border border-space-600 px-2 py-0.5 text-[10px] font-display uppercase tracking-widest text-ink-500">
                    Step {s.stepIndex} of {s.stepTotal}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-ink-300">{s.detail}</p>
                <p className="mt-1 text-[11px] text-ink-500">
                  {s.typeLabel}
                  {s.subject ? ` · ${SUBJECT_LABELS[s.subject] || s.subject}` : ''}
                  {' · due '}
                  {formatShortDate(parseDateStr(s.parentDueDate))}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/**
        * CLASS BELL SETTINGS — parent-only, and deliberately here.
        *
        * They belong beside the blocks they ring for, not in a settings tab
        * two screens away. The bell is a property of this schedule.
        */}
      <div className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Class bell</p>
            <p className="mt-1 text-sm text-ink-300">
              A countdown on Lamar&rsquo;s dashboard showing the block he is in and how long is left, with a
              chime when it is time to switch.
            </p>
            <p className="mt-1 text-[11px] text-ink-500">
              He has to tap once to turn the sound on each time he opens the app — browsers will not play
              audio before someone interacts with the page, and a bell that looks armed but cannot ring would
              be worse than none. It only rings while the app is open.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setClassBellSettings({ enabled: !classBellEnabled })}
            className={
              'flex-none rounded-lg border px-3 py-1.5 text-xs font-display font-700 transition ' +
              (classBellEnabled
                ? 'border-signal-green/40 bg-signal-green/10 text-signal-green'
                : 'border-space-600 text-ink-300 hover:text-ink-100')
            }
          >
            {classBellEnabled ? 'On' : 'Off'}
          </button>
        </div>

        {classBellEnabled && (
          <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-space-700 pt-3">
            <span className="text-xs text-ink-300">Warn him</span>
            {[0, 1, 2, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setClassBellSettings({ warningMinutes: n })}
                className={
                  'rounded-full border px-2.5 py-1 text-[11px] font-display transition ' +
                  (classBellWarningMinutes === n
                    ? 'border-signal-cyan bg-signal-cyan/15 text-signal-cyan'
                    : 'border-space-600 text-ink-300 hover:text-ink-100')
                }
              >
                {n === 0 ? 'no warning' : `${n} min before`}
              </button>
            ))}
            <span className="text-[11px] text-ink-500">
              A soft single chime first, then the switch bell at the boundary.
            </span>
          </div>
        )}
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-display uppercase tracking-widest text-ink-500">
            Daily Routine Template — applies every school day
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="rounded-lg border border-space-600 px-3 py-1.5 text-xs font-display text-ink-300 transition hover:text-ink-100"
            >
              Reset to Recommended
            </button>
            <button
              type="button"
              onClick={() => setEditing((e) => !e)}
              className="rounded-lg bg-signal-cyan px-3 py-1.5 text-xs font-display font-700 text-space-950 transition hover:brightness-110"
            >
              {editing ? 'Done Editing' : 'Customize Schedule'}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {scheduleBlocks.map((block, index) => {
            const isNow = isToday && nowMinutes >= timeToMinutes(block.startTime) && nowMinutes < timeToMinutes(block.endTime);
            const colorClass = COLOR_STYLES[block.colorKey] || COLOR_STYLES.neutral;

            return (
              <div
                key={block.id}
                className={
                  'rounded-xl border p-4 shadow-panel transition ' +
                  colorClass +
                  (isNow ? ' ring-2 ring-signal-cyan' : '')
                }
              >
                {!editing ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-display text-sm text-ink-300">
                        {formatTime(block.startTime)} – {formatTime(block.endTime)}
                      </p>
                      <p className="mt-1 font-display text-base font-700 text-ink-100">
                        {resolveBlockLabel(block, date, khanAcademyAssignments)}
                      </p>
                      {block.id === ROTATING_BLOCK_ID && (
                        <p className="mt-0.5 text-[11px] text-ink-500">Rotating block — this is what runs today</p>
                      )}
                    </div>
                    {isNow && (
                      <span className="rounded-full border border-signal-cyan/50 bg-signal-cyan/15 px-2 py-1 text-xs font-display uppercase tracking-wide text-signal-cyan">
                        Happening now
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <input
                        type="time"
                        value={block.startTime}
                        onChange={(e) => updateScheduleBlock(block.id, { startTime: e.target.value })}
                        className="rounded-md border border-space-600 bg-space-900 px-2 py-1 text-sm text-ink-100"
                      />
                      <span className="text-ink-500">to</span>
                      <input
                        type="time"
                        value={block.endTime}
                        onChange={(e) => updateScheduleBlock(block.id, { endTime: e.target.value })}
                        className="rounded-md border border-space-600 bg-space-900 px-2 py-1 text-sm text-ink-100"
                      />
                      <select
                        value={block.colorKey}
                        onChange={(e) => updateScheduleBlock(block.id, { colorKey: e.target.value })}
                        className="rounded-md border border-space-600 bg-space-900 px-2 py-1 text-sm text-ink-100"
                      >
                        {COLOR_OPTIONS.map((opt) => (
                          <option key={opt.key} value={opt.key}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <input
                      type="text"
                      value={block.label}
                      onChange={(e) => updateScheduleBlock(block.id, { label: e.target.value })}
                      placeholder="Activity name"
                      className="w-full rounded-md border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100"
                    />
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => moveScheduleBlock(block.id, -1)}
                        disabled={index === 0}
                        className="rounded-md border border-space-600 px-2 py-1 text-xs font-display text-ink-300 transition hover:text-ink-100 disabled:opacity-30"
                      >
                        Move Up
                      </button>
                      <button
                        type="button"
                        onClick={() => moveScheduleBlock(block.id, 1)}
                        disabled={index === scheduleBlocks.length - 1}
                        className="rounded-md border border-space-600 px-2 py-1 text-xs font-display text-ink-300 transition hover:text-ink-100 disabled:opacity-30"
                      >
                        Move Down
                      </button>
                      <button
                        type="button"
                        onClick={() => addScheduleBlock(block.id)}
                        className="rounded-md border border-space-600 px-2 py-1 text-xs font-display text-ink-300 transition hover:text-ink-100"
                      >
                        + Add Block Below
                      </button>
                      <button
                        type="button"
                        onClick={() => removeScheduleBlock(block.id)}
                        className="rounded-md border border-signal-red/40 px-2 py-1 text-xs font-display text-signal-red transition hover:bg-signal-red/10"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {editing && (
            <button
              type="button"
              onClick={() => addScheduleBlock(scheduleBlocks[scheduleBlocks.length - 1]?.id)}
              className="w-full rounded-xl border border-dashed border-space-600 py-3 text-sm font-display text-ink-500 transition hover:border-signal-cyan hover:text-signal-cyan"
            >
              + Add Block at End of Day
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
