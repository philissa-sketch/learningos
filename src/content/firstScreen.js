/**
 * ---- WHICH SCREEN A SCHOOL OPENS ON (Sept 23, 2026) ----
 *
 * The shell always opened on its own home screen, and the parent area on its
 * own dashboard. A school whose day starts somewhere else — its own Today
 * page — could not say so, and a school with its own grown-up area was sent to
 * the shared one on a grown-up sign-in.
 *
 * A school may now name both, in its `nav` slot:
 *
 *     navStartTab   the screen a child lands on after signing in
 *     navParentTab  (already there) — also where a grown-up sign-in lands
 *
 * Both are honoured only when the school can actually open that id: one of
 * the shell's own screens, or a screen the school supplies in `views`. Anything
 * else falls back to exactly what happened before, so a school that names
 * nothing opens as it always did.
 */
import { PLATFORM_VIEWS, schoolViewLoader } from './slots/views.js';

export const DEFAULT_START = 'dashboard';
export const DEFAULT_PARENT = 'parent';

function canOpen(content, id) {
  if (!id || typeof id !== 'string') return false;
  return PLATFORM_VIEWS.includes(id) || Boolean(schoolViewLoader(content, id));
}

/** The first view for a sign-in. `enteredAs` is 'parent' for a grown-up. */
export function firstScreen(content, enteredAs) {
  const nav = (content && content.nav) || {};
  if (enteredAs === 'parent') {
    const id = nav.navParentTab && nav.navParentTab.id;
    return canOpen(content, id) ? id : DEFAULT_PARENT;
  }
  return canOpen(content, nav.navStartTab) ? nav.navStartTab : DEFAULT_START;
}
