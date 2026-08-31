import { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { IDLE_LOCK_MS, MIN_PASSCODE_LENGTH, cryptoAvailable } from '../../lib/parentAuth.js';

/**
 * The Parent Dashboard passcode gate.
 *
 * WHY: before this, "Parent Dashboard" was one tap from Mission Control,
 * and Lamar is in this app every school day. Grades, attendance,
 * compliance records, course descriptions and every grading screen were
 * open to him — readable and editable.
 *
 * WHAT IT HONESTLY IS: a lock on a door, in a house he already lives in.
 * The records sit in his own browser's storage; developer tools read them
 * regardless of this passcode. That limit is stated in the UI rather than
 * left for her to discover, because a parent who believes this is real
 * protection would make worse decisions than one who knows what it is.
 *
 * Three states: not set up (offer, allow declining), locked, unlocked.
 */
export function ParentGate({ children }) {
  const parentAuth = useAppStore((s) => s.parentAuth);
  const parentUnlocked = useAppStore((s) => s.parentUnlocked);
  const lockParentDashboard = useAppStore((s) => s.lockParentDashboard);

  // Idle auto-lock. The realistic failure isn't him guessing the
  // passcode — it's her unlocking to grade, getting pulled into a client
  // call, and the dashboard sitting open on the table.
  useEffect(() => {
    if (!parentUnlocked || !parentAuth.configured) return undefined;
    let timer = null;
    const reset = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => lockParentDashboard(), IDLE_LOCK_MS);
    };
    const events = ['mousedown', 'keydown', 'touchstart', 'scroll'];
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    reset();
    return () => {
      if (timer) clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, reset));
    };
  }, [parentUnlocked, parentAuth.configured, lockParentDashboard]);

  if (!parentAuth.configured && !parentAuth.declined) return <PasscodeSetup />;
  if (parentAuth.configured && !parentUnlocked) return <UnlockScreen />;

  return (
    <>
      {parentAuth.configured ? (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-space-700 bg-space-800 px-4 py-2.5">
          <p className="text-xs text-ink-500">
            Unlocked. Locks itself after 15 minutes of no activity, and whenever you close the tab.
          </p>
          <button
            type="button"
            onClick={lockParentDashboard}
            className="rounded-lg border border-space-600 px-3 py-1.5 text-xs font-display font-700 text-ink-100 hover:border-signal-cyan hover:text-signal-cyan"
          >
            Lock now
          </button>
        </div>
      ) : (
        <NotLockedNotice />
      )}
      {children}
    </>
  );
}

/** Shown once, on the first visit, before any passcode exists. */
function PasscodeSetup() {
  const setParentPasscode = useAppStore((s) => s.setParentPasscode);
  const declineParentPasscode = useAppStore((s) => s.declineParentPasscode);
  const evidenceLinks = useAppStore((s) => s.evidenceLinks);

  const [passcode, setPasscode] = useState('');
  const [confirm, setConfirm] = useState('');
  const [hint, setHint] = useState('');
  const [error, setError] = useState(null);
  const [recoveryCode, setRecoveryCode] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (passcode !== confirm) {
      setError('The two entries don’t match.');
      return;
    }
    setSaving(true);
    const result = await setParentPasscode(passcode, hint);
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setError(null);
    setRecoveryCode(result.recoveryCode);
  };

  if (recoveryCode) return <RecoveryCodeScreen code={recoveryCode} folderUrl={evidenceLinks.packets} />;

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Parent Dashboard</p>
        <h2 className="mt-1 font-display text-xl font-700 text-ink-100">Set a Passcode</h2>
        <p className="mt-2 text-sm text-ink-300">
          This dashboard holds grades, attendance, notes and your compliance records — and Lamar uses this app
          every school day. A passcode keeps him out of the screens that aren’t his.
        </p>
        <p className="mt-2 text-xs text-ink-500">
          <strong className="text-ink-300">Worth knowing:</strong> this is a lock, not security. Everything in
          this app lives in the browser’s own storage, so anyone who opens developer tools can read the records
          whether or not a passcode is set. It stops casual snooping, which is the actual problem here.
        </p>

        {!cryptoAvailable() && (
          <p className="mt-3 rounded-lg border border-signal-amber/40 bg-signal-amber/5 px-3 py-2 text-xs text-signal-amber">
            This browser can’t create a passcode securely at this address. Open the app at localhost or over
            https, then come back.
          </p>
        )}

        <input
          type="password"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          placeholder={`Passcode (at least ${MIN_PASSCODE_LENGTH} characters)`}
          className="mt-4 w-full rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500 focus:border-signal-cyan focus:outline-none"
        />
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Type it again"
          className="mt-2 w-full rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500 focus:border-signal-cyan focus:outline-none"
        />
        <input
          type="text"
          value={hint}
          onChange={(e) => setHint(e.target.value)}
          placeholder="Hint, if you want one (Lamar will see this)"
          className="mt-2 w-full rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500 focus:border-signal-cyan focus:outline-none"
        />
        {error && <p className="mt-2 text-xs text-signal-amber">{error}</p>}

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || passcode.length < MIN_PASSCODE_LENGTH || !cryptoAvailable()}
            className="rounded-lg bg-signal-cyan px-4 py-2 font-display font-700 text-space-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {saving ? 'Saving…' : 'Set Passcode'}
          </button>
          <button
            type="button"
            onClick={declineParentPasscode}
            className="text-xs text-ink-500 underline hover:text-ink-100"
          >
            Skip — run without a passcode
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * The recovery code, shown exactly once.
 *
 * There is no server and no account here, so there is no reset link.
 * Without this code, a forgotten passcode would cost a year of
 * attendance, grades and compliance records — much worse than the
 * snooping the lock prevents. It points at the Drive folder because
 * that is precisely what that folder is for.
 */
function RecoveryCodeScreen({ code, folderUrl }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <div className="rounded-xl border border-signal-amber/50 bg-signal-amber/5 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-amber">Save this now</p>
        <h2 className="mt-1 font-display text-xl font-700 text-ink-100">Your Recovery Code</h2>
        <p className="mt-2 text-sm text-ink-300">
          This is the only way back in if you forget your passcode. There’s no account and no server here, so
          there’s no reset email. <strong>You won’t be shown this again.</strong>
        </p>

        <p className="mt-4 select-all rounded-lg border border-space-600 bg-space-900 px-4 py-3 text-center font-mono text-lg font-700 tracking-widest text-signal-cyan">
          {code}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-lg border border-space-600 px-3 py-1.5 text-xs font-display font-700 text-ink-100 hover:border-signal-cyan hover:text-signal-cyan"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
          {folderUrl && (
            <a
              href={folderUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-signal-cyan underline hover:brightness-110"
            >
              Save it in your Compliance Packets folder
            </a>
          )}
        </div>

        <button
          type="button"
          onClick={() => useAppStore.setState({ parentUnlocked: true })}
          className="mt-4 w-full rounded-lg bg-signal-cyan px-4 py-2 font-display font-700 text-space-950 transition hover:brightness-110"
        >
          I’ve saved it — open the dashboard
        </button>
      </div>
    </div>
  );
}

function UnlockScreen() {
  const parentAuth = useAppStore((s) => s.parentAuth);
  const verifyParentPasscode = useAppStore((s) => s.verifyParentPasscode);
  const unlockWithRecoveryCode = useAppStore((s) => s.unlockWithRecoveryCode);

  const [attempt, setAttempt] = useState('');
  const [error, setError] = useState(null);
  const [usingRecovery, setUsingRecovery] = useState(false);
  const [checking, setChecking] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [usingRecovery]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setChecking(true);
    const result = usingRecovery
      ? await unlockWithRecoveryCode(attempt)
      : await verifyParentPasscode(attempt);
    setChecking(false);
    if (!result.ok) {
      setError(result.error);
      setAttempt('');
      return;
    }
    setError(null);
    setAttempt('');
  };

  return (
    <div className="mx-auto max-w-md">
      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel"
      >
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Parent Dashboard</p>
        <h2 className="mt-1 font-display text-xl font-700 text-ink-100">
          {usingRecovery ? 'Enter Your Recovery Code' : 'Locked'}
        </h2>
        <p className="mt-2 text-sm text-ink-300">
          {usingRecovery
            ? 'The code you saved when you set the passcode up.'
            : 'Grades, attendance and records live behind here.'}
        </p>

        <input
          ref={inputRef}
          type={usingRecovery ? 'text' : 'password'}
          value={attempt}
          onChange={(e) => setAttempt(e.target.value)}
          placeholder={usingRecovery ? 'XXXX-XXXX-XXXX-XXXX' : 'Passcode'}
          className="mt-4 w-full rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500 focus:border-signal-cyan focus:outline-none"
        />
        {!usingRecovery && parentAuth.hint && (
          <p className="mt-1 text-xs text-ink-600">Hint: {parentAuth.hint}</p>
        )}
        {error && <p className="mt-2 text-xs text-signal-amber">{error}</p>}

        <button
          type="submit"
          disabled={checking || !attempt}
          className="mt-4 w-full rounded-lg bg-signal-cyan px-4 py-2 font-display font-700 text-space-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {checking ? 'Checking…' : 'Unlock'}
        </button>

        <button
          type="button"
          onClick={() => {
            setUsingRecovery((v) => !v);
            setError(null);
            setAttempt('');
          }}
          className="mt-3 w-full text-center text-xs text-ink-500 underline hover:text-ink-100"
        >
          {usingRecovery ? 'Use the passcode instead' : 'Forgot it — use my recovery code'}
        </button>
      </form>
    </div>
  );
}

/**
 * Shown when she chose to run without a lock. Stated once, quietly, and
 * not turned into a recurring nag — she made a real choice and the
 * button is there when she changes her mind.
 *
 * "Set one" clears the declined flag in state only, which puts
 * ParentGate back into its setup branch. Nothing is written to the
 * database until she actually saves a passcode, so backing out here
 * leaves no trace.
 */
function NotLockedNotice() {
  const parentAuth = useAppStore((s) => s.parentAuth);

  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-space-700 bg-space-800 px-4 py-2.5">
      <p className="text-xs text-ink-500">
        No passcode set — Lamar can open this dashboard and change grades or attendance.
      </p>
      <button
        type="button"
        onClick={() => useAppStore.setState({ parentAuth: { ...parentAuth, declined: false } })}
        className="rounded-lg border border-space-600 px-3 py-1.5 text-xs font-display font-700 text-ink-100 hover:border-signal-cyan hover:text-signal-cyan"
      >
        Set one
      </button>
    </div>
  );
}

/**
 * Change or remove the passcode from inside the dashboard. Rendered as
 * its own Parent Dashboard section rather than living on the gate, since
 * by definition you can only reach it once you're already through.
 */
export function ParentPasscodeSection() {
  const parentAuth = useAppStore((s) => s.parentAuth);
  const changeParentPasscode = useAppStore((s) => s.changeParentPasscode);
  const removeParentPasscode = useAppStore((s) => s.removeParentPasscode);

  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [hint, setHint] = useState(parentAuth.hint || '');
  const [error, setError] = useState(null);
  const [recoveryCode, setRecoveryCode] = useState(null);

  const handleChange = async () => {
    const result = await changeParentPasscode(current, next, hint);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setError(null);
    setCurrent('');
    setNext('');
    setRecoveryCode(result.recoveryCode);
  };

  const handleRemove = async () => {
    const result = await removeParentPasscode(current);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setError(null);
    setCurrent('');
  };

  if (recoveryCode) {
    return (
      <div className="space-y-4">
        <RecoveryCodeScreen code={recoveryCode} folderUrl={useAppStore.getState().evidenceLinks.packets} />
        <button
          type="button"
          onClick={() => setRecoveryCode(null)}
          className="text-xs text-ink-500 underline hover:text-ink-100"
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Passcode</p>
        <h3 className="mt-1 font-display text-lg font-700 text-ink-100">
          {parentAuth.configured ? 'Change or Remove Your Passcode' : 'No Passcode Set'}
        </h3>
        <p className="mt-2 text-sm text-ink-300">
          {parentAuth.configured
            ? 'Changing it issues a new recovery code and retires the old one.'
            : 'Anyone using this app can open the dashboard and edit grades, attendance and records.'}
        </p>
        <p className="mt-2 text-xs text-ink-500">
          A reminder of what this is: the records live in this browser’s storage, so a passcode stops casual
          snooping, not someone determined to read the files.
        </p>

        {parentAuth.configured && (
          <input
            type="password"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            placeholder="Current passcode"
            className="mt-4 w-full rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500 focus:border-signal-cyan focus:outline-none"
          />
        )}
        <input
          type="password"
          value={next}
          onChange={(e) => setNext(e.target.value)}
          placeholder={`New passcode (at least ${MIN_PASSCODE_LENGTH} characters)`}
          className="mt-2 w-full rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500 focus:border-signal-cyan focus:outline-none"
        />
        <input
          type="text"
          value={hint}
          onChange={(e) => setHint(e.target.value)}
          placeholder="Hint, if you want one (Lamar will see this)"
          className="mt-2 w-full rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500 focus:border-signal-cyan focus:outline-none"
        />
        {error && <p className="mt-2 text-xs text-signal-amber">{error}</p>}

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleChange}
            disabled={next.length < MIN_PASSCODE_LENGTH}
            className="rounded-lg bg-signal-cyan px-4 py-2 font-display font-700 text-space-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {parentAuth.configured ? 'Change Passcode' : 'Set Passcode'}
          </button>
          {parentAuth.configured && (
            <button
              type="button"
              onClick={handleRemove}
              className="text-xs text-ink-500 underline hover:text-signal-red"
            >
              Remove the passcode
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
