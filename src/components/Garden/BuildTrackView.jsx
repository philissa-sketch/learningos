import { useMemo } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { gardenBuildTrack, gardenCapstone } from '../../academies/lamar/data/gardening/gardenBuildTrack.js';
import { gardenProjects } from '../../academies/lamar/data/gardening/gardenProjects.js';
import { SUBJECT_LABELS } from '../../academies/lamar/subjects.js';
import { SUN_ZONES, SURVEY_DAYS_WANTED, sunSurveyStats, zoneClass } from '../../lib/sunSurvey.js';
import { gardenCalendarItems } from '../../lib/plannerFeeds.js';
import { wateringStats, formatAmounts } from '../../lib/wateringLog.js';
import { useToday } from '../../lib/useToday.js';
import { parseDateStr } from '../../lib/scheduler.js';

/** 'Fri 14 Aug'. */
function dayLabel(dateStr) {
  if (!dateStr) return null;
  return parseDateStr(dateStr).toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  });
}

/** '90 min' / '2 hrs' / '4 hrs' — never a bare three-digit minute count. */
function workTimeLabel(minutes) {
  if (!Number.isFinite(minutes)) return null;
  if (minutes < 120) return `${minutes} min`;
  const hrs = minutes / 60;
  return `${Number.isInteger(hrs) ? hrs : hrs.toFixed(1)} hrs`;
}

/**
 * The five-build track, and where each build's skills come from.
 *
 * Built Aug 8 2026 at the parent's question — "was there anything mentioning
 * building items so that there can be more grown in that small space, using
 * lessons learned in aerospace, nasa, robotics, tech?" The answer was yes in
 * the design and NOWHERE in the app. A connection that lives only in a planning
 * document is not a connection he can use.
 *
 * Locked builds are SHOWN, with the reason, not hidden. A locked build he can
 * read is a promise; a hidden one is a surprise. And the lock is real: every
 * build after the survey places a physical object in a zone, and until the
 * survey produces numbers nobody knows which zone.
 */
export function BuildTrackView({ onOpenProject }) {
  const gardenLog = useAppStore((s) => s.gardenLog);
  const writingEntries = useAppStore((s) => s.writingEntries);

  // The survey is done when its write-up exists — the same signal every other
  // hands-on project in this app uses to mean "finished", not a separate flag.
  const surveyWrittenUp = writingEntries.some((e) => e.promptId === 'gd7-project-sun-survey');
  const sunReadings = gardenLog.filter((r) => r.kind === 'sun-reading').length;

  /**
   * ---- THE EIGHT NUMBERS, ON THE SCREEN THAT PROMISED THEM (Aug 24, 2026) ----
   *
   * The parent: **"The readings didn't move over to the project."**
   *
   * They had moved — 32 of them, intact. What had not moved was the ANSWER.
   * This component already loaded `gardenLog` and already counted the
   * readings, then rendered the sentence "Direct-sun hours per zone — eight
   * numbers that did not exist before" and stopped. It described eight numbers
   * while holding the data to compute them.
   *
   * That is the same fault as the rest of this month's audit, in a fifteenth
   * place: the app knew, and the screen never asked.
   */
  const sun = useMemo(() => sunSurveyStats(gardenLog), [gardenLog]);

  const today = useToday();

  /**
   * ---- THE DATES WERE ALREADY THERE (Aug 24, 2026) ----
   *
   * The parent: **"I don't understand the builds. due dates for gardening. They
   * seem like these are builds that can be completed in a month."**
   *
   * Two separate things were making that read true, and neither was the plan.
   *
   * 1. THE CARD SHOWED A MONTH AND NOTHING ELSE. "Build 1 · August" is all it
   *    printed. The real dates exist — every build is opened by one Friday
   *    brief and closed by another, and `gardenCalendarItems` has been reading
   *    those two dates as a start date and a due date since Aug 14. The Build
   *    Track never asked for them. Same fault, again.
   *
   * 2. THE CARD SHOWED NO WORKING TIME. A build with a month beside it and no
   *    duration looks like a month of work. It is 90 minutes to 5 hours.
   *
   * Read through `gardenCalendarItems` rather than re-deriving from the briefs,
   * because the planner already answers this question and two components
   * computing the same date separately is how this codebase has been bitten
   * four times.
   */
  const scheduleByProject = useMemo(() => {
    const map = {};
    for (const item of gardenCalendarItems({ gardenLog })) {
      if (!item.key.startsWith('garden-build::')) continue;
      map[item.key.replace('garden-build::', '')] = item;
    }
    return map;
  }, [gardenLog]);

  const minutesByProject = useMemo(() => {
    const map = {};
    for (const p of gardenProjects || []) map[p.id] = p.estMinutes ?? null;
    return map;
  }, []);

  /** The habit the November build and the April capstone both rest on. */
  const water = useMemo(() => wateringStats(gardenLog, today), [gardenLog, today]);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">The Build Track</p>
        <h3 className="mt-1 font-display text-lg font-700 text-ink-100">
          32 square feet of floor. About 224 cubic feet of space.
        </h3>
        <p className="mt-1 text-sm text-ink-300">
          Five builds across the year, each one going after the difference between those two numbers. Every
          one draws on something you are already learning in another subject.
        </p>
        <p className="mt-2 text-xs text-ink-500">
          Q1 has no build on purpose — you do not bolt a rack into a zone nobody has measured. Building
          starts in Q2.
        </p>
      </div>

      {gardenBuildTrack.map((build) => {
        const unlocked = build.gatedBy === null || surveyWrittenUp;
        const sched = scheduleByProject[build.projectId] || null;
        const minutes = minutesByProject[build.projectId] ?? null;
        const writtenUp = writingEntries.some((e) => e.promptId === build.projectId);
        const overdue = Boolean(sched?.dueDate && sched.dueDate < today && !writtenUp);
        return (
          <div
            key={build.id}
            className={
              'rounded-xl border p-5 shadow-panel ' +
              (unlocked ? 'border-space-700 bg-space-800' : 'border-space-700 bg-space-900')
            }
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-display uppercase tracking-widest text-ink-500">
                  Build {build.number} · {build.when}
                </p>
                <h4
                  className={
                    'mt-1 font-display text-base font-700 ' + (unlocked ? 'text-ink-100' : 'text-ink-300')
                  }
                >
                  {build.title}
                </h4>
              </div>
              <span
                className={
                  'flex-none rounded-full border px-2 py-1 text-xs font-display ' +
                  (overdue
                    ? 'border-signal-red/40 bg-signal-red/10 text-signal-red'
                    : writtenUp
                      ? 'border-signal-green/40 bg-signal-green/10 text-signal-green'
                      : build.status === 'active'
                        ? 'border-signal-green/40 bg-signal-green/10 text-signal-green'
                        : unlocked
                          ? 'border-signal-cyan/40 bg-signal-cyan/10 text-signal-cyan'
                          : 'border-space-600 text-ink-500')
                }
              >
                {overdue
                  ? 'overdue'
                  : writtenUp
                    ? 'written up'
                    : build.status === 'active'
                      ? 'now'
                      : unlocked
                        ? 'unlocked'
                        : 'locked'}
              </span>
            </div>

            {/* ---- WHEN, AND FOR HOW LONG ---- */}
            {(sched || minutes) && (
              <div
                className={
                  'mt-2 rounded-lg border p-2.5 text-xs ' +
                  (overdue
                    ? 'border-signal-red/40 bg-signal-red/5'
                    : 'border-space-600 bg-space-900')
                }
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  {sched?.startBy && (
                    <span className="text-ink-300">
                      <span className="font-display uppercase tracking-widest text-ink-500">Starts </span>
                      <span className="font-display font-700 text-ink-100">{dayLabel(sched.startBy)}</span>
                    </span>
                  )}
                  {sched?.dueDate && (
                    <span className="text-ink-300">
                      <span className="font-display uppercase tracking-widest text-ink-500">Due </span>
                      <span
                        className={
                          'font-display font-700 ' + (overdue ? 'text-signal-red' : 'text-ink-100')
                        }
                      >
                        {dayLabel(sched.dueDate)}
                      </span>
                    </span>
                  )}
                  {minutes && (
                    <span className="text-ink-300">
                      <span className="font-display uppercase tracking-widest text-ink-500">Hands-on </span>
                      <span className="font-display font-700 text-signal-cyan">
                        {workTimeLabel(minutes)}
                      </span>
                    </span>
                  )}
                </div>
                {build.timeNote && <p className="mt-1.5 text-ink-500">{build.timeNote}</p>}
                {overdue && (
                  <p className="mt-1.5 text-signal-red">
                    Past due. The write-up in the Writing Journal is what closes it.
                  </p>
                )}
              </div>
            )}

            <p className="mt-2 text-sm text-ink-300">
              <span className="font-display font-600 text-ink-100">Builds: </span>
              {build.buildsWhat}
            </p>
            <p className="mt-2 text-sm text-ink-300">
              <span className="font-display font-600 text-ink-100">The problem: </span>
              {build.theProblem}
            </p>

            {!unlocked && build.gatedReason && (
              <p className="mt-2 rounded-lg border border-space-600 bg-space-800 p-3 text-xs text-ink-500">
                Locked until the sun survey is written up. {build.gatedReason}
              </p>
            )}

            <div className="mt-3">
              <p className="text-xs font-display uppercase tracking-widest text-ink-500">Draws on</p>
              <ul className="mt-1 space-y-2 text-sm text-ink-300">
                {build.drawsOn.map((d, i) => (
                  <li key={i}>
                    <span className="rounded-full border border-signal-cyan/30 bg-signal-cyan/10 px-2 py-0.5 font-display text-xs text-signal-cyan">
                      {SUBJECT_LABELS[d.subject] || d.subject}
                    </span>{' '}
                    <span className="font-display font-600 text-ink-100">{d.what}.</span> {d.detail}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-3 rounded-lg border border-signal-amber/30 bg-signal-amber/5 p-3 text-xs text-ink-300">
              <span className="font-display font-600 text-signal-amber">Measure before and after: </span>
              {build.measureBeforeAfter}
            </p>

            {/* The survey build shows its own result, because it has one. */}
            {build.projectId === 'gd7-project-sun-survey' && sunReadings > 0 && (
              <div className="mt-2 rounded-lg border border-space-600 bg-space-900 p-3">
                <p className="font-display text-xs font-700 uppercase tracking-widest text-signal-cyan">
                  The eight numbers
                </p>
                {sun.hasTrustworthyNumbers ? (
                  <>
                    <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-4">
                      {SUN_ZONES.map((zone) => {
                        const cls = zoneClass(sun.zones[zone].hoursPerDay);
                        return (
                          <div key={zone} className="flex items-baseline gap-1.5">
                            <span className="font-display text-xs text-ink-500">{zone}</span>
                            <span className={'font-display text-sm font-700 ' + cls.tone}>
                              {sun.zones[zone].hoursPerDay.toFixed(1)}
                            </span>
                            <span className="text-xs text-ink-600">h</span>
                          </div>
                        );
                      })}
                    </div>
                    <p className="mt-2 text-xs text-ink-500">
                      Direct sun per day, averaged over {sun.completeDays} complete{' '}
                      {sun.completeDays === 1 ? 'day' : 'days'}.
                      {sun.completeDays < SURVEY_DAYS_WANTED && (
                        <span className="text-signal-amber">
                          {' '}
                          One more full day would make these solid.
                        </span>
                      )}
                    </p>
                  </>
                ) : (
                  <p className="mt-1.5 text-xs text-ink-300">
                    <span className="text-ink-100">{sun.totalReadings} readings</span> recorded across{' '}
                    {sun.daysStarted} {sun.daysStarted === 1 ? 'day' : 'days'} — but no day is finished yet,
                    so there are no hours-per-zone to show.{' '}
                    <span className="text-signal-amber">
                      A day counts once all ten hourly checks are done.
                    </span>
                  </p>
                )}
              </div>
            )}

            {/**
             * ---- WHAT HE IS DOING BETWEEN NOW AND NOVEMBER ----
             *
             * The parent: **"The self watering buckets isnt until Nov. What is
             * he doing to prepare for that?"**
             *
             * Keeping the watering log. That is the honest answer, and it was
             * nowhere on this card. The Sep 25 brief totals four weeks of rows,
             * ranks the zones thirstiest-to-least, and THAT ranking picks the
             * zone this build goes in — so the preparation for a November build
             * is a weekly habit that starts in August, and the card said
             * nothing about it.
             */}
            {build.projectId === 'gd7-project-self-watering-bucket' && !writtenUp && (
              <div className="mt-2 rounded-lg border border-space-600 bg-space-900 p-3">
                <p className="font-display text-xs font-700 uppercase tracking-widest text-signal-cyan">
                  Preparing for this one
                </p>
                <p className="mt-1.5 text-xs text-ink-300">
                  The zone this bucket goes in is chosen from the watering log — the Sep 25 brief totals four
                  weeks of rows and ranks the zones thirstiest-to-least.{' '}
                  {water.canRankZones ? (
                    <span className="text-signal-green">
                      {water.weeksLoggedAllTime} weeks of rows are in. Enough to rank them.
                    </span>
                  ) : (
                    <span className="text-signal-amber">
                      {water.weeksLoggedAllTime} {water.weeksLoggedAllTime === 1 ? 'week' : 'weeks'} logged
                      so far — {water.weeksUntilRanking} more and the ranking can be made.
                    </span>
                  )}
                </p>
                <p className="mt-1.5 text-xs text-ink-500">
                  Watering log: {water.weeksCovered} of the last {water.weeksTracked} weeks
                  {water.streak > 1 && ` · ${water.streak} in a row`}
                  {formatAmounts(water.totalsByUnit) && ` · ${formatAmounts(water.totalsByUnit)} carried`}.
                </p>
              </div>
            )}

            {build.projectId && onOpenProject && unlocked && (
              <button
                type="button"
                onClick={() => onOpenProject(build.projectId)}
                className="mt-3 rounded-lg bg-signal-cyan px-3 py-2 text-sm font-display font-700 text-space-950 transition hover:brightness-110"
              >
                Open this build
              </button>
            )}
          </div>
        );
      })}

      <div className="rounded-xl border border-signal-amber/40 bg-signal-amber/5 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-amber">
          The capstone · {gardenCapstone.when}
        </p>
        <h4 className="mt-1 font-display text-base font-700 text-ink-100">{gardenCapstone.title}</h4>
        <p className="mt-1 text-sm text-ink-300">{gardenCapstone.summary}</p>
        <p className="mt-2 text-sm text-ink-300">
          <span className="font-display font-600 text-ink-100">Why it is real: </span>
          {gardenCapstone.whyItIsReal}
        </p>
        <p className="mt-2 text-sm text-ink-300">
          <span className="font-display font-600 text-ink-100">What it needs from now: </span>
          {gardenCapstone.needsFromNow}
        </p>
        <p className="mt-3 text-xs text-ink-500">
          Named in August on purpose — {sunReadings} sun readings and{' '}
          <span className="text-ink-100">{water.totalRows} watering rows</span> so far, and every one you log
          between now and April is data for this build.
        </p>
      </div>
    </div>
  );
}
