import { useEffect, useRef, useState } from 'react';
import { SIGN_IN_FAILED, lockoutMsFor, signInParent, signInStudent } from '../../lib/frontDoor.js';
import {
  buildPasscodeRecord,
  generateRecoveryCode,
  validatePasscode,
  verifyRecoveryCode
} from '../../lib/parentAuth.js';
import './frontDoor.css';

/**
 * The sign-in panel. Opens OVER the home page — it is not the whole screen.
 *
 * ---- WHAT THIS COMPONENT MAY NOT DO ----
 *
 * It receives `academies` so it can VERIFY a typed name, and it must never
 * RENDER one. No list to pick from, no "welcome back", no avatars, no count of
 * how many children live here. A child's information exists only after that
 * child signs in, and this panel is the last thing before that.
 *
 * The guard in scripts/verify-front-door.mjs checks this by reading the file,
 * because it is exactly the sort of rule a helpful future edit undoes.
 */
export default function FrontDoor({
  academies,
  parentAuth,
  initialTab = 'student',
  onStudentSignedIn,
  onParentSignedIn,
  onParentRecordReplaced,
  onClose
}) {
  const [tab, setTab] = useState(initialTab);
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  useEffect(() => {
    const field = tab === 'student' ? nameRef.current : emailRef.current;
    field?.focus();
  }, [tab]);

  useEffect(() => {
    if (!onClose) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fd" onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}>
      <div className="fd-panel-wrap">
        <div className="fd-panel" role="dialog" aria-modal="true" aria-label="Sign in to LearningOS">
          <div className="fd-panel-top">
            <div className="fd-glyph" aria-hidden="true">
              L
            </div>
            <div className="fd-brandname">
              Learning<span>OS</span>
            </div>
          </div>

          {onClose ? (
            <button className="fd-close" type="button" onClick={onClose} aria-label="Close">
              ×
            </button>
          ) : null}

          <div className="fd-tabs" role="tablist" aria-label="Who is signing in">
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'student'}
              onClick={() => setTab('student')}
            >
              Student
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'parent'}
              onClick={() => setTab('parent')}
            >
              Parent
            </button>
          </div>

          {tab === 'student' ? (
            academies && academies.length > 0 ? (
              <StudentTab academies={academies} onSignedIn={onStudentSignedIn} nameRef={nameRef} />
            ) : (
              <NoAcademyHere />
            )
          ) : (
            <ParentTab
              record={parentAuth}
              onSignedIn={onParentSignedIn}
              onRecordReplaced={onParentRecordReplaced}
              emailRef={emailRef}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * ---- AN EMPTY MACHINE MAY SAY SO ----
 *
 * Everywhere else this door refuses to reveal whether a name is known, because a
 * message that changes tells anyone willing to type who lives here.
 *
 * A computer with ZERO Academies is the one case where that reasoning does not
 * apply: there is no guest list to publish. Showing a child a login form that
 * cannot possibly succeed, and then telling him his numbers are wrong, is a lie
 * the privacy rule never asked for — and it happened, to a twelve-year-old on
 * the first evening after a move.
 *
 * Nothing to protect here, so nothing is withheld. The moment ONE Academy
 * exists, the vague message comes back and stays.
 */
function NoAcademyHere() {
  return (
    <div className="fd-body">
      <h1>This computer isn&apos;t set up yet</h1>
      <p className="fd-hint">
        Your name and numbers are probably fine — they just aren&apos;t on <em>this</em> computer
        yet. Schoolwork is saved on each computer separately, so every computer has to be set up
        once.
      </p>
      <p className="fd-note">
        <strong>Ask your grown-up.</strong> From the Parent tab they can set this computer up and
        bring your work across. It takes a few minutes, and nothing is lost — everything you have
        done is safe on the computer you did it on.
      </p>
      <p className="fd-helper">Nothing is broken. This computer just hasn&apos;t met you yet.</p>
    </div>
  );
}

function StudentTab({ academies, onSignedIn, nameRef }) {
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);
  const [failures, setFailures] = useState(0);
  const [waitUntil, setWaitUntil] = useState(0);
  const [now, setNow] = useState(Date.now());

  // Only ticks while a pause is actually running, so the door is not doing
  // per-second work all morning while a child stares at it.
  useEffect(() => {
    if (waitUntil <= Date.now()) return undefined;
    const t = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(t);
  }, [waitUntil]);

  const secondsLeft = Math.max(0, Math.ceil((waitUntil - now) / 1000));
  const paused = secondsLeft > 0;

  async function submit(event) {
    event.preventDefault();
    if (busy || paused) return;
    setBusy(true);
    setError(null);

    const result = await signInStudent(academies, name, pin);

    if (result.ok) {
      onSignedIn(result.academyId);
      return;
    }

    const next = failures + 1;
    setFailures(next);
    const pause = lockoutMsFor(next);
    if (pause) setWaitUntil(Date.now() + pause);
    setPin('');
    setError(SIGN_IN_FAILED);
    setBusy(false);
  }

  return (
    <form className="fd-body" onSubmit={submit}>
      <h1>Welcome back</h1>
      <p className="fd-hint">Type your name the way you always do, then your four numbers.</p>

      {error ? (
        <p className="fd-error" role="alert">
          {error}
          {paused ? ` Wait ${secondsLeft} second${secondsLeft === 1 ? '' : 's'}.` : ''}
        </p>
      ) : null}

      <label htmlFor="fd-name">Your name</label>
      <input
        id="fd-name"
        ref={nameRef}
        type="text"
        autoComplete="off"
        autoCapitalize="words"
        spellCheck="false"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="fd-pin">Your four numbers</label>
      <input
        id="fd-pin"
        className="fd-pin"
        type="password"
        inputMode="numeric"
        autoComplete="off"
        maxLength={4}
        placeholder="····"
        value={pin}
        onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
      />

      <button className="fd-btn" type="submit" disabled={busy || paused}>
        {busy ? 'Checking…' : 'Go to my Academy'}
      </button>

      <p className="fd-helper">Forgot your numbers? Ask your grown-up.</p>
    </form>
  );
}

function ParentTab({ record, onSignedIn, onRecordReplaced, emailRef }) {
  const [mode, setMode] = useState('passcode'); // 'passcode' | 'recovery' | 'reset'
  const [email, setEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);

    const result = await signInParent(record, email, passcode);

    if (result.ok) {
      onSignedIn();
      return;
    }
    setPasscode('');
    setError(result.error);
    setBusy(false);
  }

  if (mode === 'recovery' || mode === 'reset') {
    return (
      <RecoveryFlow
        record={record}
        mode={mode}
        setMode={setMode}
        onRecordReplaced={onRecordReplaced}
        onSignedIn={onSignedIn}
      />
    );
  }

  return (
    <form className="fd-body" onSubmit={submit}>
      <h1>Grown-up corner</h1>
      <p className="fd-hint">
        Records, grades, schedules, compliance, and setting up a new Academy.
      </p>

      {error ? (
        <p className="fd-error" role="alert">
          {error}
        </p>
      ) : null}

      <label htmlFor="fd-email">Email</label>
      <input
        id="fd-email"
        ref={emailRef}
        type="email"
        autoComplete="username"
        placeholder="someone@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="fd-pass">Passcode</label>
      <input
        id="fd-pass"
        type="password"
        autoComplete="current-password"
        value={passcode}
        onChange={(e) => setPasscode(e.target.value)}
      />

      <button className="fd-btn" type="submit" disabled={busy}>
        {busy ? 'Checking…' : 'Sign in'}
      </button>

      <p className="fd-helper">
        {record?.hint ? `Hint: ${record.hint}. ` : ''}
        <button
          type="button"
          onClick={() => setMode('recovery')}
          style={{
            background: 'none',
            border: 0,
            padding: 0,
            font: 'inherit',
            color: 'var(--fd-teal)',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          Forgot it — use my recovery code
        </button>
      </p>
    </form>
  );
}

/**
 * ---- THE WAY BACK IN ----
 *
 * This app has no accounts and no server, so there is no reset link to email.
 * Without a recovery path, a forgotten passcode is a LOCKOUT WITH THE RECORDS
 * INTACT AND UNREACHABLE — a year of attendance, grades and compliance sitting
 * in IndexedDB behind a gate that wraps the whole app.
 *
 * `ParentGate.jsx` in the original app offered this and the first version of
 * this door did not, which was a real regression. `verifyRecoveryCode` was
 * already written and exported; only the screen was missing.
 *
 * A used recovery code forces a NEW passcode and issues a NEW recovery code.
 * Leaving the old code live would mean one written-down string permanently
 * opens the dashboard, which is worse than the passcode it replaced.
 */
function RecoveryFlow({ record, mode, setMode, onRecordReplaced, onSignedIn }) {
  const [code, setCode] = useState('');
  const [passcode, setPasscode] = useState('');
  const [confirm, setConfirm] = useState('');
  const [hint, setHint] = useState('');
  const [issued, setIssued] = useState(null);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  async function checkCode(event) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);

    const matched = await verifyRecoveryCode(record, code);
    setBusy(false);
    if (!matched) {
      setError('That recovery code did not match.');
      return;
    }
    setMode('reset');
  }

  async function setNew(event) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);

    const check = validatePasscode(passcode);
    if (!check.ok) {
      setError(check.error);
      setBusy(false);
      return;
    }
    if (passcode !== confirm) {
      setError('The two passcodes are different.');
      setBusy(false);
      return;
    }

    const nextCode = generateRecoveryCode();
    const built = await buildPasscodeRecord(passcode, nextCode, hint);
    setIssued({ code: nextCode, record: { ...built, email: record?.email ?? null } });
    setBusy(false);
  }

  if (issued) {
    return (
      <div className="fd-body">
        <h1>Write this down now</h1>
        <p className="fd-hint">
          Your old recovery code no longer works. This one replaces it — put it with your homeschool
          records.
        </p>
        <p
          className="fd-note"
          style={{ fontFamily: 'var(--fd-label)', fontSize: '17px', letterSpacing: '0.08em' }}
        >
          {issued.code}
        </p>
        <button
          className="fd-btn"
          type="button"
          onClick={async () => {
            await onRecordReplaced(issued.record);
            onSignedIn();
          }}
        >
          I&apos;ve written it down
        </button>
      </div>
    );
  }

  if (mode === 'reset') {
    return (
      <form className="fd-body" onSubmit={setNew}>
        <h1>Choose a new passcode</h1>
        <p className="fd-hint">
          The recovery code matched. Set a new passcode and you&apos;ll get a fresh recovery code to
          keep.
        </p>

        {error ? (
          <p className="fd-error" role="alert">
            {error}
          </p>
        ) : null}

        <label htmlFor="fd-newpass">New passcode</label>
        <input
          id="fd-newpass"
          type="password"
          autoComplete="new-password"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
        />

        <label htmlFor="fd-newpass2">Type it again</label>
        <input
          id="fd-newpass2"
          type="password"
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <label htmlFor="fd-newhint">Hint (optional)</label>
        <input id="fd-newhint" type="text" value={hint} onChange={(e) => setHint(e.target.value)} />

        <button className="fd-btn" type="submit" disabled={busy}>
          {busy ? 'Saving…' : 'Set passcode'}
        </button>
      </form>
    );
  }

  return (
    <form className="fd-body" onSubmit={checkCode}>
      <h1>Use your recovery code</h1>
      <p className="fd-hint">
        The code you were shown when the passcode was set. Capitals, spaces and dashes don&apos;t
        matter.
      </p>

      {error ? (
        <p className="fd-error" role="alert">
          {error}
        </p>
      ) : null}

      <label htmlFor="fd-recovery">Recovery code</label>
      <input
        id="fd-recovery"
        type="text"
        autoComplete="off"
        spellCheck="false"
        placeholder="XXXX-XXXX-XXXX-XXXX"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button className="fd-btn" type="submit" disabled={busy}>
        {busy ? 'Checking…' : 'Continue'}
      </button>

      <p className="fd-helper">
        <button
          type="button"
          onClick={() => setMode('passcode')}
          style={{
            background: 'none',
            border: 0,
            padding: 0,
            font: 'inherit',
            color: 'var(--fd-teal)',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          Back to the passcode
        </button>
      </p>
    </form>
  );
}
