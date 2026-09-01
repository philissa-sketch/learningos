import { derivedPlannerItems } from './plannerFeeds.js';
import { buildCalendarItems } from './scheduler.js';
import { academyContent } from '../content/academyContent.js';

const { milestonesFor = () => [] } = academyContent().academicCenter;

/**
 * The calendar, WITH the weekly steps of long assignments on it.
 *
 * The gap this closes, in the parent's words (Aug 7, 2026): "I will need
 * everything to be on the schedule for book reports research papers, etc. to
 * show up on daily weekly and the month, FROM WHEN HE SHOULD START WORKING ON
 * THEM to date due."
 *
 * Before this, a Book Report due Oct 23 appeared on the calendar exactly once
 * — on Oct 23. Which is the same failure the milestone engine was written to
 * fix in the first place: for a 12-year-old, one date six weeks out means
 * nothing happens for five weeks and then a bad weekend. The steps existed and
 * computed correctly; they simply had nowhere to appear.
 *
 * WHY A SEPARATE MODULE. `assignmentMilestones.js` already imports its date
 * helpers from `scheduler.js`. Teaching `scheduler.js` about milestones would
 * make those two files import each other — a cycle that happens to work under
 * ESM hoisting and then breaks the first time someone converts a function to a
 * const arrow. This module sits above both and depends on each one-way.
 *
 * The three Scheduler views import from here instead of from scheduler.js.
 */

/** Milestone templates key off the assignment type, which the two tables
 *  spell differently: Academic Center uses `type`, the Planner uses
 *  `assignmentType`. */
function assignmentType(a) {
  return a.type || a.assignmentType || null;
}

function isFinished(a) {
  return a.status === 'completed' || Boolean(a.completed);
}

/**
 * One dated calendar row per weekly checkpoint.
 *
 * Finished assignments contribute nothing — their steps are moot, and leaving
 * them on the calendar would bury the live work under history.
 */
function buildMilestoneItems({ assignments = [], academicAssignments = [] }) {
  const items = [];

  const emit = (a, source) => {
    if (!a.title || !a.dueDate || isFinished(a)) return;
    const steps = milestonesFor({ ...a, type: assignmentType(a) });
    if (!steps.length) return;

    steps.forEach((step, i) => {
      items.push({
        key: `${source}::${a.id}::step::${step.id}`,
        title: step.label,
        parentTitle: a.title,
        parentKey: `${source}::${a.id}`,
        parentDueDate: a.dueDate,
        subject: a.subject || null,
        typeLabel: assignmentType(a) || 'Assignment',
        detail: step.detail,
        dueDate: step.dueDate,
        done: Boolean(step.completedAt),
        stepIndex: i + 1,
        stepTotal: steps.length,
        isFinalStep: i === steps.length - 1,
        source: 'milestone'
      });
    });
  };

  for (const a of academicAssignments) emit(a, 'academic');
  for (const a of assignments) emit(a, 'planner');

  return items;
}

/**
 * Everything dated: real due dates, the steps leading up to them, and — since
 * Aug 14 2026 — the work that was scheduled but never dated.
 *
 * Forty-six items were invisible to every calendar in this app because they
 * were scheduled by SCHOOL WEEK NUMBER or, in the garden's case, by a calendar
 * nothing read. `derivedPlannerItems` turns both into real dates. The parent
 * found it the way it was always going to be found: "there are writing journals
 * with projects that I do not see the due dates for."
 *
 * Derived items are appended rather than merged into buildCalendarItems so the
 * two stay separable — these have no assignment record behind them, cannot be
 * graded, and must never be mistaken for one.
 */
export function buildPlannerItems(sources) {
  return [...buildCalendarItems(sources), ...buildMilestoneItems(sources), ...derivedPlannerItems(sources)];
}

/**
 * Same, keyed by date for O(1) cell lookups. Within a date, real due dates
 * sort ahead of steps — "this is due today" outranks "work on this today".
 */
export function buildPlannerItemsByDate(sources) {
  const byDate = new Map();
  for (const item of buildPlannerItems(sources)) {
    const list = byDate.get(item.dueDate);
    if (list) list.push(item);
    else byDate.set(item.dueDate, [item]);
  }
  for (const list of byDate.values()) {
    list.sort((a, b) => {
      const aStep = a.source === 'milestone' ? 1 : 0;
      const bStep = b.source === 'milestone' ? 1 : 0;
      return aStep - bStep || a.title.localeCompare(b.title);
    });
  }
  return byDate;
}

/** Split a day's rows into the two things they mean. */
export function splitPlannerItems(items = []) {
  const due = [];
  const steps = [];
  for (const item of items) (item.source === 'milestone' ? steps : due).push(item);
  return { due, steps };
}
