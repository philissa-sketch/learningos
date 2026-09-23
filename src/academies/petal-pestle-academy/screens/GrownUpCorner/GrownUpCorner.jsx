import { ParentGate } from '../../../../components/Dashboard/ParentGate.jsx';
import { BackupPanel } from './BackupPanel.jsx';

/**
 * ---- HER GROWN-UP CORNER (Sept 22, 2026) ----
 *
 * The parent: "I don't want the Parent Dashboard to be shared. There are too
 * many differences in there. I want to just go into her school and open her
 * parent dashboard from there."
 *
 * So this school has its own parent screen, in its own folder, and its nav
 * points the parent button here instead of at the shared dashboard. The shared
 * one is untouched and is simply never shown in this school.
 *
 * It sits behind the platform's passcode lock — the same ParentGate the shared
 * dashboard uses — so a child who taps the button meets the lock, not the
 * grown-up screens. The lock is mechanism, not content, which is why it is
 * borrowed rather than copied.
 *
 * ---- WHY IT IS NEARLY EMPTY ----
 *
 * Her real parent screens (report, gradebook, her work, hours, settings) come
 * across from the standalone app one group at a time, starting with the
 * report. Until each one lands, this page says plainly what is coming rather
 * than showing a screen that looks finished and is not.
 */

const COMING = [
  { group: 'Report', items: 'One-page report · Strand detail · Re-measure · Goals · Hours (Georgia) · Annual report' },
  { group: 'Gradebook', items: 'Tests · Answer history · Khan grades · Writing pieces' },
  { group: 'Her work', items: 'Her journal · Rewards to approve' },
  { group: 'Everything else', items: 'Write to her · Her day · Settings' }
];

/**
 * `onExit` is the shell's "back to the dashboard". This school's nav has no
 * tab for the dashboard, so every screen of hers carries its own way back.
 */
export function GrownUpCorner({ onExit }) {
  return (
    <ParentGate>
      <section className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
        {onExit ? (
          <button
            type="button"
            onClick={onExit}
            className="mb-4 rounded-lg border border-space-600 px-3 py-1.5 text-xs font-display font-700 text-ink-100 hover:border-signal-cyan hover:text-signal-cyan"
          >
            ← Back to her day
          </button>
        ) : null}
        <p className="font-display text-xs uppercase tracking-widest text-ink-500">Grown-Up Corner</p>
        <h1 className="mt-1 font-display text-2xl font-700 text-ink-100">Her records</h1>
        <p className="mt-2 text-sm text-ink-300">
          She is still using the Petal &amp; Pestle app. Keep using that one for grading and reports until this
          corner is complete.
        </p>
        <div className="mt-5">
          <BackupPanel />
        </div>
        <p className="mt-8 font-display text-xs uppercase tracking-widest text-ink-500">Still to come</p>
        <ul className="mt-3 space-y-3">
          {COMING.map((row) => (
            <li key={row.group} className="rounded-xl border border-space-700 bg-space-800 px-4 py-3">
              <p className="font-display text-sm font-700 text-ink-100">{row.group}</p>
              <p className="mt-0.5 text-xs text-ink-500">{row.items}</p>
            </li>
          ))}
        </ul>
      </section>
    </ParentGate>
  );
}
