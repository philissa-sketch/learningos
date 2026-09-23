import { useEffect } from 'react';
import { ParentGate } from '../../../../components/Dashboard/ParentGate.jsx';
import { useAppStore } from '../../store/useAppStore.js';
import { ParentDashboard } from '../../components/Parent/ParentDashboard.jsx';
import '../../styles/herApp.css';

/**
 * ---- HER GROWN-UP CORNER ----
 *
 * The parent (Sept 22, 2026): "I don't want the Parent Dashboard to be shared.
 * There are too many differences in there. I want to just go into her school
 * and open her parent dashboard from there."
 *
 * ---- WHAT IS HERE NOW (Sept 23) ----
 *
 * Her OWN parent dashboard, brought across from the standalone Petal & Pestle
 * app with its panels unchanged: the one-page report, strand detail,
 * re-measure, goals, Georgia hours, annual report, gradebook, answer history,
 * Khan grades, writing pieces, her journal, rewards, messages, her day and
 * settings. It reads her own records (db/db.js), which the platform never sees.
 *
 * One panel is swapped: "Bring her work here" is this school's add-only loader
 * (BackupPanel) rather than the standalone app's merge, because the parent's
 * rule for bringing her records across is that nothing already here is ever
 * overwritten. The standalone app's merge can replace a row with a newer copy.
 *
 * It sits behind the platform's passcode lock — the same one the shared
 * dashboard uses — so a child who taps the button meets the lock.
 *
 * `.pp-app` is the wrapper her app's styles are scoped to (styles/herApp.css).
 */
export function GrownUpCorner({ onExit }) {
  const hydrate = useAppStore((s) => s.hydrate);
  const hydrated = useAppStore((s) => s.hydrated);
  const hydrationError = useAppStore((s) => s.hydrationError);

  // Read her records fresh every time the corner opens, so a reading check sat
  // a minute ago is already in the gradebook.
  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <ParentGate>
      <div className="pp-app">
        {hydrationError ? (
          <p className="mx-auto max-w-3xl px-4 py-8 text-sm">Her records could not be read: {hydrationError}</p>
        ) : !hydrated ? (
          <p className="mx-auto max-w-3xl px-4 py-8 text-sm">Opening her records…</p>
        ) : (
          <ParentDashboard onExit={onExit} />
        )}
      </div>
    </ParentGate>
  );
}
