import { toDateStr } from './scheduler.js';
import { profileAnswers, hasProfileSection } from './learnerProfile.js';

/**
 * Answers for the four questions Learning Analytics used to list as
 * "can't tell you". Each one now has a setup (something the parent can do)
 * or a derivation (something the app now works out), instead of a paragraph
 * of reasons.
 *
 * Nothing here is typed in twice. Pace comes from the year plan, focus comes
 * from the same records the rest of the dashboard reads, and learning style
 * comes from the setup question the family already answers. A planner that
 * has to be maintained is wrong by October.
 *
 * Shared code: no school, learner or subject names live here. Subject labels
 * arrive from the caller.
 */

const AHEAD = 1.1;
const BEHIND = 0.8;

function paceWord(mastered, expected) {
  if (expected < 1) return 'not-started';
  const ratio = mastered / expected;
  if (ratio >= AHEAD) return 'ahead';
  if (ratio < BEHIND) return 'behind';
  return 'on-pace';
}

/**
 * Is he on track for the year?
 *
 * Two measures, both derived:
 *   - days: logged school days against the days the calendar says should be
 *     done by now, and whether the required total is still reachable;
 *   - lessons: for the CURRENT quarter, lessons mastered against the share of
 *     the quarter's school days already gone, per subject.
 *
 * `expected` is a straight line through the quarter. Lessons are not taught at
 * an even rate, so this is a prompt to look, labelled as such, not a verdict.
 */
export function onTrackForYear({ yearPlan = [], progress = null, today = toDateStr(new Date()), schoolDaysBetween, started = {}, pace = {} }) {
  const current = yearPlan.find((q) => q.status === 'current') || null;
  const doneDays = yearPlan.filter((q) => q.status === 'complete').reduce((n, q) => n + (q.schoolDays || 0), 0);
  let elapsedInCurrent = 0;
  if (current && typeof schoolDaysBetween === 'function') {
    elapsedInCurrent = schoolDaysBetween(current.start, today);
  }
  const expectedDays = doneDays + elapsedInCurrent;
  const daysLogged = yearPlan.reduce((n, q) => n + (q.daysLogged || 0), 0);

  let rows = [];
  let quarterShare = 0;
  if (current && current.schoolDays > 0) {
    quarterShare = Math.min(1, elapsedInCurrent / current.schoolDays);
    rows = Object.entries(current.bySubject || {})
      .map(([subject, v]) => {
        const own = pace[subject] || null;
        // A subject taught in a shared block is paced against the days it
        // actually OWNS, not against the calendar, and a subject whose quarter
        // holds more work than days is over-scheduled, which is not the same
        // as falling behind.
        const share = own && own.days > 0 ? Math.min(1, own.daysSoFar / own.days) : quarterShare;
        const expected = Math.round(v.total * share * 10) / 10;
        const begun = Math.max(0, (started[subject] || 0) - v.mastered);
        const overloaded = Boolean(own && (own.state === 'over' || own.state === 'buffered'));
        return {
          subject,
          total: v.total,
          mastered: v.mastered,
          expected,
          word: overloaded ? 'overloaded' : paceWord(v.mastered, expected),
          startedNotMastered: begun,
          ownedDays: own ? own.days : null,
          neededDays: own ? own.needs : null
        };
      })
      .sort((a, b) => a.mastered - a.expected - (b.mastered - b.expected));
  }

  const daysWord = expectedDays < 5 ? 'not-started' : paceWord(daysLogged, expectedDays * 0.9);
  const behindSubjects = rows.filter((r) => r.word === 'behind');
  const overloadedSubjects = rows.filter((r) => r.word === 'overloaded');

  return {
    currentLabel: current ? current.id : null,
    quarterShare,
    expectedDays,
    daysLogged,
    daysWord,
    required: progress?.required ?? null,
    reachable: progress ? Boolean(progress.onTrack) : null,
    rows,
    behindSubjects,
    overloadedSubjects,
    overall:
      daysWord === 'behind' || behindSubjects.length >= 2 || progress?.onTrack === false
        ? 'behind'
        : behindSubjects.length === 1
          ? 'watch'
          : rows.length === 0 && daysWord === 'not-started'
            ? 'not-started'
            : 'on-track'
  };
}

/**
 * What should he focus on next week?
 *
 * Reads the same records as everything else and ranks plain, checkable
 * reasons. Every item says WHY, so a wrong suggestion is easy to spot and
 * ignore. Capped at five: a list of twelve is not a focus.
 */
export function nextWeekFocus({
  onTrack,
  assignments = [],
  momentum = [],
  reading = null,
  wellness = null,
  today = toDateStr(new Date()),
  labelFor = (s) => s,
  limit = 5
}) {
  const items = [];

  const late = assignments.filter(
    (a) => a.dueDate && a.dueDate < today && a.status !== 'completed' && a.status !== 'graded'
  );
  if (late.length > 0) {
    const oldest = [...late].sort((a, b) => a.dueDate.localeCompare(b.dueDate))[0];
    items.push({
      id: 'late',
      weight: 100 + Math.min(late.length, 20),
      title: `Clear the ${late.length} late assignment${late.length === 1 ? '' : 's'}`,
      why: `Oldest was due ${oldest.dueDate}. Late work hides what is actually learned.`,
      go: null
    });
  }

  for (const r of onTrack?.behindSubjects || []) {
    items.push({
      id: `pace-${r.subject}`,
      weight: 80 - Math.round(r.mastered - r.expected),
      title: `Extra time on ${labelFor(r.subject)}`,
      why:
        `${r.mastered} of ${r.total} lessons mastered; about ${Math.round(r.expected)} would be expected by now.` +
        (r.startedNotMastered > 0 ? ` ${r.startedNotMastered} more were started but not mastered, so finish those first.` : ''),
      go: null
    });
  }

  for (const r of onTrack?.overloadedSubjects || []) {
    items.push({
      id: `over-${r.subject}`,
      weight: 70,
      title: `${labelFor(r.subject)} has more work than days this quarter`,
      why: `It needs about ${r.neededDays} school days of work and owns ${r.ownedDays}. Move some of it to a later quarter or give it open Fridays (Planning, Pacing).`,
      go: null
    });
  }

  for (const m of momentum.filter((x) => x.change < 0 && x.prior > 0).slice(0, 2)) {
    items.push({
      id: `slip-${m.subject}`,
      weight: 60 + Math.abs(m.change),
      title: `${labelFor(m.subject)} is slowing down`,
      why: `${m.recent} lessons mastered in the last 4 weeks against ${m.prior} in the 4 before.`,
      go: null
    });
  }

  if (reading && reading.sessions === 0) {
    items.push({
      id: 'reading',
      weight: 50,
      title: 'Log his reading',
      why: 'Nothing is in the Reading Log for 4 weeks, so reading cannot be judged either way.',
      go: 'reading-log'
    });
  }

  if (wellness && wellness.daysLogged === 0) {
    items.push({
      id: 'daily-log',
      weight: 40,
      title: 'Start the daily food, sleep and water log',
      why:
        wellness.workouts > 0
          ? `${wellness.workouts} workouts are logged but no daily protein, sleep or activity, so the nutrition goal has no data.`
          : 'Nothing is logged yet, so the fitness and nutrition goals have no data.',
      go: 'pe-fitness-nutrition'
    });
  }

  if (items.length === 0) {
    return [
      {
        id: 'steady',
        weight: 0,
        title: 'Keep the current week',
        why: 'Nothing is late, nothing is behind pace, nothing has stopped.',
        go: 'pe-fitness-nutrition'
      }
    ];
  }
  return items.sort((a, b) => b.weight - a.weight).slice(0, limit);
}

/**
 * How he learns best.
 *
 * There is still no app-wide taxonomy of lessons by style, and inventing one
 * would be guessing. What the app can say honestly is what the parent has told
 * it, next to the evidence that exists (which subjects are speeding up). The
 * parent's answer is the setup; the moment it is saved, this fills in.
 */
export function learningStyleView({ profile = {}, momentum = [] }) {
  const a = profileAnswers(profile, 'learning');
  return {
    answered: hasProfileSection(profile, 'learning'),
    worksBest: Array.isArray(a.worksBest) ? a.worksBest : [],
    attention: typeof a.attention === 'string' ? a.attention : '',
    notes: typeof a.notes === 'string' ? a.notes : '',
    speedingUp: momentum.filter((m) => m.change > 0).slice(0, 3).map((m) => m.subject)
  };
}
