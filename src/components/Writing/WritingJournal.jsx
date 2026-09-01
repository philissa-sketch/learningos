import { useMemo } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { scheduleForItem } from '../../lib/plannerFeeds.js';
import { orderScheduledCards, scheduleSortDate } from '../../lib/academicOrder.js';
import { todayDateStr, toDateStr, addDays, parseDateStr } from '../../lib/scheduler.js';
import { academyContent } from '../../content/academyContent.js';

const { gardenProjects } = academyContent().electives;
const { aerospaceProjects, roboticsProjects, scienceExperiments, technologyProjects } = academyContent().projects;
const { writingPrompts } = academyContent().writing;

/** Short, readable, and never through new Date('YYYY-MM-DD') - that is UTC. */
function formatDue(dateStr) {
  return parseDateStr(dateStr).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
}

/** 'September 2026' - the heading a chronological list needs to stay readable. */
function monthLabel(dateStr) {
  if (!dateStr) return 'No date yet';
  return parseDateStr(dateStr).toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
}

/**
 * WHICH KIND OF WORK THIS IS.
 *
 * The seven section headings this screen used to have. They were the whole
 * organising principle until Aug 17; now they are one word on the card, which
 * is all the job they were ever really doing once every card had a date.
 */
const KINDS = [
  { label: 'Science', items: scienceExperiments },
  { label: 'Aerospace', items: aerospaceProjects },
  { label: 'Technology', items: technologyProjects },
  { label: 'Robotics', items: roboticsProjects },
  { label: 'Garden', items: gardenProjects },
  { label: 'Writing skill', items: writingPrompts.filter((p) => p.category === 'skill') },
  { label: 'Recurring project', items: writingPrompts.filter((p) => p.category === 'project') }
];

/**
 * WHEN IT IS DUE, AND WHICH WEEK IT BELONGS TO.
 *
 * The parent: "Why doesn't it show where all the journals are linked to and
 * when they are due?"
 *
 * Every one of these has been dated since Aug 14. This screen grouped by
 * category and printed difficulty and minutes - useful, and not the question
 * anyone actually has standing in front of it on a Tuesday.
 *
 * Takes the schedule already computed for the list rather than looking it up
 * again: the card SORTS and PRINTS off one lookup, so the two can never
 * disagree.
 */
function ScheduleLine({ schedule, today }) {
  if (!schedule) {
    return (
      <p className="mt-1 text-xs text-ink-600">
        Not on the schedule - do it any time
      </p>
    );
  }
  const { show, next, times, missed } = schedule;
  const overdue = !next && missed > 0;
  const dueSoon = next && next.dueDate <= toDateStr(addDays(parseDateStr(today), 10));

  return (
    <p
      className={
        'mt-1 text-xs ' +
        (overdue ? 'text-signal-red' : dueSoon ? 'text-signal-amber' : 'text-ink-500')
      }
    >
      <span className="font-display font-700">Week {show.schoolWeek || '-'}</span>
      {' · '}
      {next ? 'due ' : 'was due '}
      {formatDue(show.dueDate)}
      {show.startBy && <> · start by {formatDue(show.startBy)}</>}
      {times > 1 && <span className="text-ink-600"> · {times}× this year</span>}
      {missed > 0 && next && <span className="text-signal-amber"> · {missed} missed</span>}
    </p>
  );
}

export function WritingJournal({ onStartPrompt }) {
  const writingEntries = useAppStore((s) => s.writingEntries);
  const gardenLog = useAppStore((s) => s.gardenLog);
  const today = todayDateStr();

  const entryCountFor = (promptId) => writingEntries.filter((e) => e.promptId === promptId).length;

  /**
   * ONE LIST, IN DATE ORDER.
   *
   * The parent: "filter the cards so that its from the latest due to the last
   * due." Seven sections became one run of cards from the next thing due to
   * the last thing due in the school year, undated at the foot.
   */
  const cards = useMemo(() => {
    const rows = KINDS.flatMap(({ label, items }) =>
      items.map((item) => ({
        item,
        kind: label,
        schedule: scheduleForItem(item.id, { writingEntries, gardenLog, today })
      }))
    );
    return orderScheduledCards(rows);
  }, [writingEntries, gardenLog, today]);

  const overdueRows = cards.filter((c) => c.schedule && !c.schedule.next && c.schedule.missed > 0);
  const upcomingRows = cards.filter((c) => c.schedule && c.schedule.next).slice(0, 5);

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:px-6">
      <p className="text-xs font-display uppercase tracking-widest text-ink-500">Writing Journal</p>

      {/**
        * WHAT IS ACTUALLY NEXT.
        *
        * The catalogue below is now in the same order, so this strip is a
        * shortcut rather than a correction - it lifts the overdue work out
        * where a date alone would let it scroll past.
        */}
      {(overdueRows.length > 0 || upcomingRows.length > 0) && (
        <div className="rounded-xl border border-space-700 bg-space-900 p-4">
          <p className="text-[10px] font-display uppercase tracking-widest text-signal-cyan">
            Coming up
          </p>
          <div className="mt-2 space-y-1.5">
            {overdueRows.slice(0, 3).map(({ item, schedule }) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onStartPrompt(item)}
                className="flex w-full flex-wrap items-baseline justify-between gap-2 rounded-lg border border-signal-red/30 bg-signal-red/5 px-3 py-2 text-left transition hover:border-signal-red/60"
              >
                <span className="font-display text-sm font-700 text-ink-100">{item.title}</span>
                <span className="text-xs text-signal-red">
                  was due {formatDue(schedule.show.dueDate)} · week {schedule.show.schoolWeek || '-'}
                </span>
              </button>
            ))}
            {upcomingRows.map(({ item, schedule }) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onStartPrompt(item)}
                className="flex w-full flex-wrap items-baseline justify-between gap-2 rounded-lg border border-space-700 bg-space-800 px-3 py-2 text-left transition hover:border-signal-cyan/50"
              >
                <span className="font-display text-sm font-700 text-ink-100">{item.title}</span>
                <span className="text-xs text-ink-400">
                  due {formatDue(schedule.next.dueDate)} · week {schedule.next.schoolWeek || '-'}
                </span>
              </button>
            ))}
          </div>
          <p className="mt-2 text-[11px] text-ink-600">
            Everything below is the full year, in the order it comes due.
          </p>
        </div>
      )}

      <div className="space-y-3">
        {cards.map(({ item, kind, schedule }, index) => {
          const count = entryCountFor(item.id);
          const recurring = kind === 'Recurring project';
          const month = monthLabel(scheduleSortDate(schedule));
          const newMonth = index === 0 || month !== monthLabel(scheduleSortDate(cards[index - 1].schedule));
          return (
            <div key={item.id}>
              {newMonth && (
                <h3
                  className={
                    'mb-3 border-b border-space-700 pb-1 font-display text-sm font-700 uppercase tracking-wide text-signal-cyan ' +
                    (index === 0 ? '' : 'mt-6')
                  }
                >
                  {month}
                </h3>
              )}
              <div className="flex items-center justify-between rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
                <div>
                  <div className="flex flex-wrap items-baseline gap-2">
                    <p className="font-display text-base font-700 text-ink-100">{item.title}</p>
                    <span className="rounded-full border border-space-600 px-2 py-0.5 text-[10px] font-display uppercase tracking-wide text-ink-500">
                      {kind}
                    </span>
                  </div>
                  <p className="text-xs text-ink-500">{item.theme}</p>
                  {item.difficulty && (
                    <p className="mt-1 text-xs text-ink-500">
                      {item.difficulty} · ~{item.estMinutes} min
                    </p>
                  )}
                  <ScheduleLine schedule={schedule} today={today} />
                  {item.topicPool && (
                    <p className="mt-1 text-xs text-ink-500">
                      {item.topicPool.length + 1} different topics - a fresh one each time
                    </p>
                  )}
                  {recurring && count > 0 && (
                    <p className="mt-1 text-xs text-ink-500">
                      {count} {count === 1 ? 'entry' : 'entries'} logged
                    </p>
                  )}
                  {/* Until Aug 8 2026 no project carried a URL - the CAD ones said
                      "Open Tinkercad" as prose and left him to go find it. Opens in
                      a new tab so his journal entry is never lost behind it. */}
                  {item.toolUrl && (
                    <a
                      href={item.toolUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-block text-xs font-display text-signal-cyan underline underline-offset-2 hover:brightness-125"
                    >
                      {item.toolLabel || 'Open the tool'} ↗
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {!recurring && count > 0 && (
                    <span className="rounded-full border border-signal-green/40 bg-signal-green/10 px-2 py-1 text-xs font-display text-signal-green">
                      Completed
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => onStartPrompt(item)}
                    className="shrink-0 rounded-lg bg-signal-cyan px-3 py-1.5 text-sm font-display font-700 text-space-950 transition hover:brightness-110"
                  >
                    {count > 0 ? (recurring ? 'New Entry' : 'Redo') : 'Start'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
