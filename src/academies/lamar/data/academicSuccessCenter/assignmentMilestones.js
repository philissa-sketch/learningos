import { toDateStr, parseDateStr, addDays } from '../../../../lib/scheduler.js';

/**
 * Multi-week milestones for heavy assignments.
 *
 * The scheduling guidance the parent brought, in its words: "Break a
 * single project down into tiny daily pieces instead of asking for a
 * full paper at once... Write exactly one short paragraph per day. By
 * Friday, he will easily have a full rough draft done without a single
 * late-night writing session."
 *
 * That is the piece this app was missing. A Research Paper was one task
 * with one date six weeks out — which for a 12-year-old means nothing
 * happens for five weeks and then a bad weekend. Now the same paper is
 * four weekly checkpoints he can actually see coming.
 *
 * WHICH ASSIGNMENTS GET THEM: only work that genuinely spans weeks.
 * A Portfolio Entry is a write-up of a project he already did in one
 * sitting, and a Reading Assignment's whole content IS its pacing —
 * wrapping either in fake milestones would be ceremony, not help.
 */

const MILESTONE_TEMPLATES = {
  'Research Paper': [
    {
      id: 'sources',
      label: 'Gather sources & read',
      detail: 'Find at least three real sources and read them. Jot down facts worth using as you go — index cards or a notes doc, whatever he prefers.'
    },
    {
      id: 'outline',
      label: 'Outline & main point',
      detail: 'Organize the notes into an order that makes sense, then write one sentence saying what the paper is actually arguing.'
    },
    {
      id: 'draft',
      label: 'Rough draft',
      detail: 'One short paragraph a day. Nothing has to be good yet — the only goal is a complete draft by the end of the week.'
    },
    {
      id: 'polish',
      label: 'Edit & finish',
      detail: 'Spelling one day, grammar the next, sources cited, then print or save the final copy. Stop when it is done.'
    }
  ],
  'Book Report': [
    {
      id: 'read',
      label: 'Read the book',
      detail: 'Just read. Mark anything worth coming back to — a line, a turning point, a moment the character changes.'
    },
    {
      id: 'notes',
      label: 'Notes & structure',
      detail: 'Pull the marked moments together and decide the three or four points the report will actually make.'
    },
    {
      id: 'draft',
      label: 'Rough draft',
      detail: 'One paragraph a day against the points from last week. Evidence from the book for each.'
    },
    {
      id: 'polish',
      label: 'Edit & finish',
      detail: 'Read it out loud once — it catches more than proofreading does — then fix, finish, and turn it in.'
    }
  ],
  Presentation: [
    {
      id: 'plan',
      label: 'Plan what to say',
      detail: 'Decide the one thing the audience should walk away knowing, then the three points that get them there.'
    },
    {
      id: 'build',
      label: 'Build it',
      detail: 'Slides, poster, model, or demo — whichever fits. Fewer words than feels right; he is the one talking.'
    },
    {
      id: 'rehearse',
      label: 'Practice out loud',
      detail: 'Twice, standing up, all the way through without stopping. Out loud is the whole point — reading it silently does not count.'
    }
  ]
};

/**
 * HOW LONG BEFORE THE DUE DATE THE WORK HAS TO START.
 *
 * ---- WHY (Aug 14, 2026) ----
 *
 * The parent: "for projects that has a due date, add the time needed that leads
 * to the due date to start any pre-requisites."
 *
 * The app knew every due date and had never once told her when something had to
 * BEGIN. A book report due Oct 9 needs the book read by Sep 18 — three weeks of
 * lead — and until today the only place that fact existed was inside the
 * milestone list, on a card she had to open the assignment to see. Coming Up
 * showed the due date and nothing else, so a four-week project and a one-day
 * worksheet looked identical until the week it was due.
 *
 * For types with milestones the lead time is already known: one week per step
 * beyond the first, which is what buildMilestones has always used. For the
 * types without milestones it is stated here rather than guessed at the call
 * site, because a Reading Assignment genuinely does need lead time — a novel is
 * not started the night before — and nothing in this app had ever said so.
 *
 * These are LEAD DAYS, not estimates of effort. The question is "how long
 * before the deadline does this have to be underway", which for a book is
 * governed by its length and for a poster by the glue drying.
 */
export const LEAD_DAYS_BY_TYPE = {
  'Research Paper': 21,        // 4 milestones: sources, outline, draft, polish
  'Book Report': 21,           // 4 milestones: read, notes, draft, polish
  Presentation: 14,            // 3 milestones: plan, build, rehearse
  'Reading Assignment': 21,    // a novel is not read the night before
  'Portfolio Entry': 7,        // written up in one sitting, but the PROJECT is not
  'Writing Portfolio Entry': 7,
  Project: 14
};

/** The default when a type has no entry — a week, so nothing lands with zero warning. */
export const DEFAULT_LEAD_DAYS = 7;

export function leadDaysFor(type) {
  return LEAD_DAYS_BY_TYPE[type] ?? DEFAULT_LEAD_DAYS;
}

/**
 * The date work has to be underway by. For anything with milestones this is the
 * FIRST milestone's date, so the two can never disagree — that list is already
 * the plan, and computing a second answer beside it is how two dates that mean
 * the same thing come to differ by a day.
 */
export function startByFor(assignment) {
  if (!assignment?.dueDate) return null;
  const steps = milestonesFor(assignment);
  if (steps.length > 0) return steps[0].dueDate;
  return toDateStr(addDays(parseDateStr(assignment.dueDate), -leadDaysFor(assignment.type)));
}

/**
 * Where an assignment stands against its own lead time, as of a given day.
 *
 *   'not-yet'   — too early to start; nothing to say
 *   'start-now' — the start-by date has arrived and it has not been started
 *   'behind'    — the start-by date has passed and it has not been started
 *   'underway'  — he has started, or steps are ticked
 *   'done'
 *
 * 'behind' is the one that matters, and it is the state the app could not see
 * at all before today: an assignment that is not late yet, and already cannot
 * be done properly in the time left.
 */
export function leadStatus(assignment, todayStr) {
  if (!assignment?.dueDate) return null;
  if (assignment.status === 'completed') return 'done';
  const startBy = startByFor(assignment);
  if (!startBy) return null;
  const started =
    assignment.status === 'in-progress' ||
    milestonesFor(assignment).some((m) => m.completedAt);
  if (started) return 'underway';
  if (todayStr < startBy) return 'not-yet';
  if (todayStr === startBy) return 'start-now';
  return 'behind';
}

/** True if this assignment type is worth breaking into weekly steps. */
export function hasMilestones(type) {
  return Boolean(MILESTONE_TEMPLATES[type]);
}

/**
 * Builds the weekly checkpoints for an assignment, dated BACKWARD from
 * its real due date — one week apart, so the last step lands on the due
 * date itself and each earlier step lands on the Friday before.
 *
 * Backward rather than forward on purpose: the due date is the fixed
 * point, and working back from it guarantees the final step never lands
 * after the thing is due. All date math goes through parseDateStr and
 * toDateStr, never toISOString().
 */
export function buildMilestones(type, dueDate) {
  const template = MILESTONE_TEMPLATES[type];
  if (!template || !dueDate) return [];

  const due = parseDateStr(dueDate);
  const lastIndex = template.length - 1;

  return template.map((step, i) => ({
    ...step,
    dueDate: toDateStr(addDays(due, -7 * (lastIndex - i))),
    completedAt: null
  }));
}

/**
 * The milestones to show for an assignment: the stored ones if they
 * exist, otherwise freshly computed.
 *
 * Computing on demand is what lets milestones appear on assignments that
 * were approved BEFORE this feature existed, and lets them follow along
 * when the parent changes a due date — without a migration and without
 * silently overwriting steps he has already checked off. Stored
 * milestones win, because those carry his real progress.
 */
export function milestonesFor(assignment) {
  if (!assignment || !assignment.title || !assignment.dueDate) return [];
  if (assignment.milestones?.length) return assignment.milestones;
  return buildMilestones(assignment.type, assignment.dueDate);
}

/**
 * The step he should be working on: the first one not yet done. Returns
 * null when everything is checked off — at which point the assignment
 * itself is what's left, not another checkbox.
 */
export function currentMilestone(assignment) {
  return milestonesFor(assignment).find((m) => !m.completedAt) || null;
}

/**
 * WHEN A STEP'S WINDOW OPENS.
 *
 * ---- WHY THIS EXISTS (Aug 16, 2026) ----
 *
 * The parent, looking at a card headed "This week's step on longer work" that
 * listed three books: **"Why is it showing all these books to read when A Long
 * Walk to Water is the only book he should be reading right now?"**
 *
 * Because the card asked `currentMilestone` — the first step not yet ticked —
 * and that question has an answer for every assignment in the school year. It
 * never asked whether the step had STARTED. Hatchet's reading step was five
 * weeks out and Red-Tail Angels' was eleven, and both sat on his board under a
 * heading that said this week.
 *
 * Every milestone in this file carries a date meaning **finish by**. Not one
 * carried a date meaning **begin**. That is the same fault this project already
 * found and fixed at the assignment level on Aug 15 — *"a due date with no
 * run-up is half a date"* — sitting one level down, inside the milestone chain,
 * unnoticed because the fix above it looked complete.
 *
 * ---- THE RULE ----
 *
 * A step opens when the step before it is due, or as soon as that step is
 * actually ticked, whichever comes first — being ahead should never mean being
 * told to wait. The FIRST step has nothing before it, so it opens a lead time
 * before its own deadline, read from LEAD_DAYS_BY_TYPE, which already says a
 * Book Report needs 21 days and already says why: a novel is not read the
 * night before.
 *
 * Nothing new is stored. Both dates are derived from the one date the parent
 * actually chose — the assignment's due date.
 */
export function milestoneOpensOn(assignment, index) {
  const steps = milestonesFor(assignment);
  if (index < 0 || index >= steps.length) return null;
  if (index > 0) return steps[index - 1].dueDate;
  return toDateStr(addDays(parseDateStr(steps[0].dueDate), -leadDaysFor(assignment?.type)));
}

/**
 * The step he should have his hands on TODAY, or null if the next one has not
 * come round yet.
 *
 * Distinct from currentMilestone on purpose. Opening the assignment and seeing
 * "step 1 of 4 — Read the book" is right even in October, because that IS the
 * next step. Putting it on his board in August is not, because his board is a
 * list of what to do now.
 */
export function activeMilestone(assignment, todayStr) {
  const steps = milestonesFor(assignment);
  const i = steps.findIndex((m) => !m.completedAt);
  if (i === -1) return null;
  if (i > 0 && steps[i - 1].completedAt) return { ...steps[i], index: i, opensOn: null };
  const opens = milestoneOpensOn(assignment, i);
  if (opens && todayStr < opens) return null;
  return { ...steps[i], index: i, opensOn: opens };
}

export function milestoneProgress(assignment) {
  const all = milestonesFor(assignment);
  return { done: all.filter((m) => m.completedAt).length, total: all.length };
}
