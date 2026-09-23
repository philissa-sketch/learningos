import { useEffect } from 'react';
import App from './App.jsx';
import { academyContent } from './content/academyContent.js';
import { firstScreen } from './content/firstScreen.js';
import { useAppStore } from './store/useAppStore.js';

/**
 * ---- THE FIRST SCHOOL MODULE, AND WHY IT IS A SEPARATE FILE ----
 *
 * Everything in this file and everything it imports is SCHOOL: it reads an
 * Academy's content. Nothing here may be loaded until that Academy's content
 * has been installed.
 *
 * `AcademyShell` — which is platform — used to import `App.jsx` and the store
 * directly. Two consequences, both bad:
 *
 *   1. The whole school, and through the store one Academy's entire
 *      curriculum, was pulled into the chunk that renders the front door. A
 *      family who had never signed in downloaded it anyway.
 *   2. Those modules evaluated at boot. School files read their content at the
 *      top of the module now, which is only safe if no school module is
 *      evaluated before `loadAcademyContent()` has resolved.
 *
 * Putting the seam here fixes both. The shell awaits content, then renders this
 * behind `React.lazy`, so the first school module is evaluated strictly after
 * the content it depends on exists. That ordering is what lets every other
 * school file destructure its slot at module scope and stay simple.
 */
export default function SchoolBoot({ enteredAs, onSignOut }) {
  const hydrated = useAppStore((s) => s.hydrated);

  /**
   * The parent verified the same passcode against the same hash at the front
   * door. Asking again at ParentGate would add a keystroke, not a check.
   *
   * This is the only caller of unlockParentDashboard(), and
   * scripts/verify-front-door.mjs holds it to one.
   */
  useEffect(() => {
    if (enteredAs === 'parent' && hydrated) {
      useAppStore.getState().unlockParentDashboard();
    }
  }, [enteredAs, hydrated]);

  // Which screen to open on is the school's to say (Sept 23, 2026) — see
  // src/content/firstScreen.js. A school that names nothing opens exactly as
  // before: the dashboard, or the parent dashboard for a grown-up sign-in.
  return <App initialView={firstScreen(academyContent(), enteredAs)} onSignOut={onSignOut} />;
}
