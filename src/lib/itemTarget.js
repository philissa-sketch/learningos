import { findScheduledItem } from './plannerFeeds.js';

/**
 * WHAT A DATED ROW OPENS. One answer, shared by every screen that lists dated
 * work, so a row cannot be linked on one screen and plain text on the next.
 *
 * Oct 2, 2026 -- the parent, twice in one day: "in the Parent Dashboard
 * nothing in there is linked to the assignments", then, with screenshots,
 * "None of these link back to his assignment." The first fix linked the rows
 * that carried an academic id and left the Writing Journal, project and
 * step rows as text, and left his own "What today looks like" card unlinked.
 * That is the fifth report of one rule: a row that names a thing must open
 * that thing. The rule lives here now, not at each call site.
 *
 *   academic   -> { kind: 'academic', id }     the Academic Center assignment
 *   milestone  -> its parent assignment (academic) or the planner (custom)
 *   planner    -> { kind: 'planner' }          a custom Planner assignment
 *   a prompt   -> { kind: 'prompt', prompt }   a Journal piece / project
 *   a screen   -> { kind: 'view', view }      the feed names it (openView)
 *   fieldTrip  -> { kind: 'fieldTrip' }
 *   mission    -> { kind: 'mission' }
 *
 * Returns null when a row has nothing to open, so callers render no button
 * instead of one that does nothing.
 */
export function itemTarget(item) {
  if (!item) return null;
  const src = item.source === 'milestone' ? item.recordSource : item.source;
  if (src === 'academic') {
    return typeof item.recordId === 'number' ? { kind: 'academic', id: item.recordId } : null;
  }
  if (src === 'planner') return { kind: 'planner' };
  if (item.source === 'fieldTrip') return { kind: 'fieldTrip' };
  // Anything that IS a Journal prompt or project opens the place he types it.
  // A hands-on build, a project and a weekly writing piece all carry one.
  if (item.promptId) {
    const prompt = findScheduledItem(item.promptId);
    if (prompt) return { kind: 'prompt', prompt };
  }
  // A row whose feed names a screen (see plannerFeeds) opens that screen.
  if (item.openView) return { kind: 'view', view: item.openView };
  if (typeof item.key === 'string' && item.key.startsWith('mission::')) return { kind: 'mission' };
  return null;
}
