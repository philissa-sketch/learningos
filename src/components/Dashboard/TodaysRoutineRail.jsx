import { useState, useEffect, useMemo } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { resolveBlockLabel, ROTATING_BLOCK_ID } from '../../lib/rotatingBlock.js';
import { scheduleStatus, formatClock, minutesSinceMidnight } from '../../lib/classBell.js';
import { todayDateStr } from '../../lib/scheduler.js';
import { academyContent } from '../../content/academyContent.js';

const { dayPattern = () => null } = academyContent().timetable;

/**
 * TODAY'S ROUTINE, ON MISSION CONTROL. (Aug 9, 2026.)
 *
 * The parent: "Can you put the Planner, daily, schedule, on the mission control
 * page in the upper left so he can see it without going to the schedule page.
 * So he can follow the schedule with having to go back and forth to that tab."
 *
 * The schedule was a whole separate tab, and following it meant leaving the
 * screen with the work on it. A twelve-year-old does not tab back and forth to
 * check what time Science ends — he just stops following the schedule. This
 * project has already been caught by that once, in her words: "I told him to
 * follow that schedule but that isn't there."
 *
 * It is READ-ONLY on purpose. Editing lives in Scheduler, behind the parent's
 * own screen, and a mis-tap on his home screen must not be able to rewrite the
 * school day.
 *
 * WHAT IT SHOWS THAT THE SCHEDULE TAB DOES NOT:
 *
 *   - Only the blocks that run TODAY. `scheduleBlocks` is one template reused
 *     Monday to Friday and Gardening carries `days: [5]`, so the schedule tab
 *     lists a Friday block on a Tuesday. normaliseBlocks() drops it here.
 *   - The rotating 2:15 block resolved to the subject actually running today,
 *     rather than the four-name fallback label.
 *   - Where he is right now, what is behind him, and how far through the
 *     current block he is.
 */

const DOT = {
  past: 'bg-space-600',
  now: 'bg-signal-cyan',
  future: 'bg-space-500'
};

function useNow() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    // 20s is enough for a bar that moves across 15-to-60-minute blocks, and
    // cheap enough to leave running all day on his machine.
    const id = setInterval(() => setNow(new Date()), 20000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export function TodaysRoutineRail({ onOpenSchedule }) {
  const scheduleBlocks = useAppStore((s) => s.scheduleBlocks);
  const khanAcademyAssignments = useAppStore((s) => s.khanAcademyAssignments);
  const now = useNow();

  const today = todayDateStr();
  const pattern = dayPattern(new Date(today + 'T12:00:00'));
  const isSchoolDay = pattern.kind === 'core';
  const minutes = minutesSinceMidnight(now);
  const weekday = now.getDay();

  const status = useMemo(
    () => scheduleStatus(scheduleBlocks, { minutes, isSchoolDay, weekday }),
    [scheduleBlocks, minutes, isSchoolDay, weekday]
  );

  const blocks = status.blocks;
  if (!blocks.length) return null;

  const currentId = status.current ? status.current.id : null;

  return (
    <div className="rounded-xl border border-space-700 bg-space-800 shadow-panel">
      <div className="flex items-baseline justify-between gap-2 border-b border-space-700 px-4 py-3">
        <p className="font-display text-[11px] uppercase tracking-widest text-ink-500">Today's Routine</p>
        {onOpenSchedule && (
          <button
            type="button"
            onClick={onOpenSchedule}
            className="text-[11px] font-display text-signal-cyan transition hover:brightness-125"
          >
            Full schedule
          </button>
        )}
      </div>

      {/* A DAY OFF SAYS SO RATHER THAN SHOWING AN EMPTY BOX or, worse, a normal
          school day he is not meant to be doing. The blocks stay visible and
          dimmed, because "what does a school day look like" is still a fair
          question to ask on a Sunday. */}
      {!isSchoolDay && (
        <p className="border-b border-space-700 px-4 py-2 text-[11px] text-signal-amber">
          {pattern.kind === 'holiday' ? `${pattern.holiday} — no classes today.` : 'No classes today.'} This is what a
          school day looks like.
        </p>
      )}

      <ol className="px-2 py-2">
        {blocks.map((block) => {
          const isNow = isSchoolDay && block.id === currentId;
          const isPast = isSchoolDay && minutes >= block.endMin;
          const label = resolveBlockLabel(block, now, khanAcademyAssignments);
          const span = Math.max(1, block.endMin - block.startMin);
          const through = isNow ? Math.min(100, Math.max(0, ((minutes - block.startMin) / span) * 100)) : 0;

          return (
            <li
              key={block.id}
              className={
                'relative rounded-lg px-2 py-1.5 transition ' +
                (isNow ? 'bg-signal-cyan/10 ring-1 ring-signal-cyan/50' : '')
              }
            >
              <div className="flex items-start gap-2">
                <span
                  aria-hidden="true"
                  className={'mt-1.5 h-1.5 w-1.5 flex-none rounded-full ' + (isNow ? DOT.now : isPast ? DOT.past : DOT.future)}
                />
                <div className="min-w-0 flex-1">
                  <p
                    className={
                      'font-display text-[10px] uppercase tracking-widest ' +
                      (isNow ? 'text-signal-cyan' : 'text-ink-600')
                    }
                  >
                    {formatClock(block.startMin)} – {formatClock(block.endMin)}
                  </p>
                  <p
                    className={
                      'text-[13px] leading-snug ' +
                      (isNow ? 'font-700 text-ink-100' : isPast ? 'text-ink-600 line-through' : 'text-ink-300')
                    }
                  >
                    {label}
                  </p>
                  {block.id === ROTATING_BLOCK_ID && !isPast && (
                    <p className="text-[10px] text-ink-600">Rotating block</p>
                  )}
                  {isNow && (
                    <div className="mt-1.5 h-0.5 w-full overflow-hidden rounded-full bg-space-700">
                      <div className="h-full bg-signal-cyan" style={{ width: through + '%' }} />
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {/* The bell card above already counts the current block down to the
          second. This line is for the other question -- "am I behind?" -- which
          the countdown cannot answer. */}
      {isSchoolDay && status.phase === 'after' && (
        <p className="border-t border-space-700 px-4 py-2 text-[11px] text-ink-500">
          The school day is finished.
        </p>
      )}
      {isSchoolDay && status.phase === 'before' && (
        <p className="border-t border-space-700 px-4 py-2 text-[11px] text-ink-500">
          The day starts at {formatClock(blocks[0].startMin)}.
        </p>
      )}
    </div>
  );
}
