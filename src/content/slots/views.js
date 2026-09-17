/**
 * =============================================================================
 * A SCHOOL'S OWN SCREENS.
 * =============================================================================
 *
 * ---- WHY THIS EXISTS (Sept 17, 2026) ----
 *
 * The parent, about two activities only her son does: *"They are supposed to be
 * in his school only."*
 *
 * `optional.js` took their twenty names off every other school's bill, and that
 * was only half the sentence. The screens themselves still sat in the shared
 * folder and were wired into the shell by name:
 *
 *     const GardenHome = lazy(() => import('./components/Garden/GardenHome.jsx')…);
 *     {view === 'garden' && <GardenHome … />}
 *
 * So the shell could render exactly the screens someone had written into it. A
 * school could already declare a tab of its own in the `nav` slot — and there
 * was nothing behind it, because no Academy could supply the screen that tab
 * opened. Every new activity meant editing the platform.
 *
 * ---- WHAT A SCHOOL SUPPLIES ----
 *
 *     export const views = {
 *       workshop: { load: () => import('./screens/Workshop/WorkshopHome.jsx')
 *                                 .then((m) => ({ default: m.WorkshopHome })) }
 *     };
 *
 * A tab id from that school's `nav`, and how to load the screen behind it. The
 * shell renders its own screens first and asks the school only for an id it
 * does not own itself, so no Academy can replace the dashboard or the parent
 * area.
 *
 * ---- WHAT EVERY SCHOOL VIEW IS GIVEN ----
 *
 * The same props the shell hands its own optional screens:
 *
 *     onExit         go back to the dashboard
 *     onStartPrompt  open a prompt in the writing engine, graded like any other
 *
 * Nothing else, and nothing named after any subject. A screen needing more than
 * that is asking the platform for a feature, which is a decision, not a prop.
 *
 * ---- WHY A BAD ANSWER RENDERS NOTHING ----
 *
 * Same rule as the other slots: a throw reaches the shell's catch and a child
 * sees a school that will not open. An entry that is not a component is an
 * authoring mistake, and the place to catch it is
 * `scripts/verify-school-views.mjs`, before a deploy — not a screen on a school
 * morning. An unusable entry is ignored and its tab renders empty.
 */

/** The shell's own screens. A school may not replace one. */
export const PLATFORM_VIEWS = Object.freeze([
  'academic', 'dashboard', 'games', 'journal', 'lessons', 'messages',
  'morning', 'parent', 'pe', 'progress', 'rewards', 'schedule', 'typing'
]);

/**
 * A school declares HOW to load a screen, not a React component:
 *
 *     views = { garden: { load: () => import('./views/GardenHome.jsx')
 *                                     .then((m) => ({ default: m.GardenHome })) } }
 *
 * Two reasons it is a loader and not the component itself. A manifest that
 * imported React could not be read by the check scripts, which load every
 * Academy's content.js in plain Node — and a loader is only called when the tab
 * is opened, so a school that never opens it never downloads it.
 */
function isLoadable(entry) {
  return Boolean(entry && typeof entry === 'object' && typeof entry.load === 'function');
}

/** Every usable screen this school supplies: tab id -> its loader. */
export function schoolViews(content) {
  const declared = content?.views;
  if (!declared || typeof declared !== 'object' || Array.isArray(declared)) return {};
  const out = {};
  for (const [id, entry] of Object.entries(declared)) {
    if (!id || PLATFORM_VIEWS.includes(id)) continue;
    if (isLoadable(entry)) out[id] = entry.load;
  }
  return out;
}

/** The loader for one tab id, or null — never a throw. */
export function schoolViewLoader(content, id) {
  if (!id || typeof id !== 'string') return null;
  return schoolViews(content)[id] || null;
}

/** The tab ids this school brings screens for. */
export function schoolViewIds(content) {
  return Object.keys(schoolViews(content));
}
