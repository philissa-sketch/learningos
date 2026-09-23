import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';

/**
 * A passcode, not security.
 *
 * Everything here lives in the browser on one computer; a determined
 * nine-year-old with the developer tools open can read it. This gate exists to
 * stop a curious child from wandering into her own raw numbers by accident,
 * which is a real risk and a real harm — the levels on this side are decimals
 * with confidence ratings attached, and they are written for an adult deciding
 * what to teach, not for the child being described.
 *
 * Saying so plainly on the unlock screen is deliberate. A parent who thinks
 * this is real security might put something here that needs real security.
 */
export function ParentGate({ children, onExit }) {
  const stored = useAppStore((s) => s.parentPasscode);
  const setParentPasscode = useAppStore((s) => s.setParentPasscode);
  const [unlocked, setUnlocked] = useState(false);
  const [entry, setEntry] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState(null);

  if (unlocked) return children;

  // First run: no passcode set yet.
  if (!stored) {
    return (
      <div className="mx-auto max-w-md px-4 py-14">
        <div className="panel px-6 py-8">
          <p className="text-4xl">🔒</p>
          <h1 className="mt-3 font-display text-xl text-ink-900">Set a grown-up passcode</h1>
          <p className="mt-2 text-sm text-ink-700">
            This corner holds the raw levels, the full answer history and the reset button. Pick four
            or more digits so she does not land in here by accident.
          </p>
          <p className="mt-2 rounded-xl bg-cream-200 px-3 py-2 text-xs text-ink-700">
            To be straight with you: this is a lock on a door, not a safe. Everything is stored in
            this browser on this computer. Do not put anything here that would matter if she found
            it.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (entry.length < 4) return setError('Use at least four digits.');
              if (entry !== confirm) return setError('The two entries do not match.');
              setParentPasscode(entry);
              setUnlocked(true);
            }}
            className="mt-5 space-y-3"
          >
            <input
              type="password"
              inputMode="numeric"
              value={entry}
              onChange={(e) => {
                setEntry(e.target.value.replace(/\D/g, ''));
                setError(null);
              }}
              placeholder="New passcode"
              className="w-full rounded-full border border-cream-300 bg-white px-5 py-3 text-center tracking-[0.3em] outline-none focus:border-lavender-500"
            />
            <input
              type="password"
              inputMode="numeric"
              value={confirm}
              onChange={(e) => {
                setConfirm(e.target.value.replace(/\D/g, ''));
                setError(null);
              }}
              placeholder="Type it again"
              className="w-full rounded-full border border-cream-300 bg-white px-5 py-3 text-center tracking-[0.3em] outline-none focus:border-lavender-500"
            />
            {error && <p className="text-center text-sm text-clay-500">{error}</p>}
            <button
              type="submit"
              className="w-full rounded-full bg-lavender-500 px-6 py-3 font-700 text-white hover:bg-lavender-700"
            >
              Set passcode and open
            </button>
          </form>
          <button
            type="button"
            onClick={onExit}
            className="mt-4 w-full text-sm text-ink-500 underline-offset-2 hover:underline"
          >
            Back to the greenhouse
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-14">
      <div className="panel px-6 py-8 text-center">
        <p className="text-4xl">🔒</p>
        <h1 className="mt-3 font-display text-xl text-ink-900">Grown-Up Corner</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (entry === stored) setUnlocked(true);
            else {
              setError('That is not the passcode.');
              setEntry('');
            }
          }}
          className="mt-5 space-y-3"
        >
          <input
            type="password"
            inputMode="numeric"
            autoFocus
            value={entry}
            onChange={(e) => {
              setEntry(e.target.value.replace(/\D/g, ''));
              setError(null);
            }}
            placeholder="Passcode"
            className="w-full rounded-full border border-cream-300 bg-white px-5 py-3 text-center tracking-[0.3em] outline-none focus:border-lavender-500"
          />
          {error && <p className="text-sm text-clay-500">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-full bg-lavender-500 px-6 py-3 font-700 text-white hover:bg-lavender-700"
          >
            Unlock
          </button>
        </form>
        <button
          type="button"
          onClick={onExit}
          className="mt-4 w-full text-sm text-ink-500 underline-offset-2 hover:underline"
        >
          Back to the greenhouse
        </button>
      </div>
    </div>
  );
}
