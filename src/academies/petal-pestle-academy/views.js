/**
 * ---- THIS SCHOOL'S OWN SCREENS ----
 *
 * Tab id -> how to load the screen behind it. The shell asks for one of these
 * only when the tab id is not one of its own (src/content/slots/views.js), so
 * nothing here can replace a shared screen. It sits BESIDE them, and her nav
 * decides which ones she is shown.
 *
 * A loader, not a component: content.js is read in plain Node by every check
 * script, and a loader is only called when the tab is actually opened.
 *
 * content.js re-exports this file. Add a screen here and a tab for it in the
 * nav section of content.js, in the same change — verify-school-views fails a
 * screen with no way to reach it, and a tab with nothing behind it.
 */
export const views = {
  school: { load: () => import('./screens/HerSchool/HerSchool.jsx').then((m) => ({ default: m.HerSchool })) },
  grownups: { load: () => import('./screens/GrownUpCorner/GrownUpCorner.jsx').then((m) => ({ default: m.GrownUpCorner })) }
};
