import { useState } from 'react';
import {
  buildPasscodeRecord,
  buildSecretRecord,
  cryptoAvailable,
  generateRecoveryCode,
  validatePasscode
} from '../../lib/parentAuth.js';
import { isGuessablePin, matchAcademyByName, validatePin } from '../../lib/frontDoor.js';
import { newAcademyId } from '../../academies/registry.js';
import './frontDoor.css';

/**
 * Creating an Academy. Two steps, in this order and not the other, because the
 * second is a decision about a child and the first is proof you may make it.
 *
 *   1. The parent's passcode — created here, with a recovery code shown once.
 *      Skipped when one already exists and the parent has just signed in.
 *   2. The Academy: a name, four numbers, and a generated id.
 *
 * ---- WHAT IT CREATES ----
 *
 * An **Empty** Academy — the first of the three states in
 * docs/LEARNINGOS_PACK_SPEC.md §1. It exists, it has a database, and it can be
 * signed into. It has no subjects, no theme and no guide yet; the questionnaire
 * moves it to Configured and a placement moves it to Active.
 *
 * Importing an existing school is the OTHER door into this same room: it
 * creates a Configured Academy straight from a seed with no questionnaire
 * typed. Same code path underneath, different entry point.
 */
export default function FirstRun({ needsPasscode, existingAcademies = [], onComplete, onCancel }) {
  const [step, setStep] = useState(needsPasscode ? 1 : 2);
  const [parentRecord, setParentRecord] = useState(null);

  if (!cryptoAvailable()) {
    return (
      <Shell>
        <div className="fd-body">
          <h1>This address can&apos;t hold a passcode</h1>
          <p className="fd-hint">
            Passcodes are hashed using the browser&apos;s secure crypto, which is only available on
            <code> localhost </code>
            or an <code>https://</code> address. Open the app the usual way and this screen will
            work. Setting one here would look identical to you and protect nothing.
          </p>
        </div>
      </Shell>
    );
  }

  return (
    <Shell onCancel={onCancel}>
      {step === 1 ? (
        <PasscodeStep
          onDone={(record) => {
            setParentRecord(record);
            setStep(2);
          }}
        />
      ) : (
        <AcademyStep
          existingAcademies={existingAcademies}
          showStepNumbers={needsPasscode}
          onDone={(academy) => onComplete({ parentRecord, academy })}
        />
      )}
    </Shell>
  );
}

function Shell({ children, onCancel }) {
  return (
    <div className="fd">
      <div className="fd-panel-wrap">
        <div className="fd-panel">
          <div className="fd-panel-top">
            <div className="fd-glyph" aria-hidden="true">
              L
            </div>
            <div className="fd-brandname">
              Learning<span>OS</span>
            </div>
          </div>
          {onCancel ? (
            <button className="fd-close" type="button" onClick={onCancel} aria-label="Close">
              ×
            </button>
          ) : null}
          {children}
        </div>
      </div>
    </div>
  );
}

function PasscodeStep({ onDone }) {
  const [email, setEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  const [confirm, setConfirm] = useState('');
  const [hint, setHint] = useState('');
  const [issued, setIssued] = useState(null);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  async function submit(event) {
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

    const code = generateRecoveryCode();
    const record = await buildPasscodeRecord(passcode, code, hint);
    setIssued({ code, record });
    setBusy(false);
  }

  // Shown once, and never again — there is no server to email it from.
  if (issued) {
    return (
      <div className="fd-body">
        <p className="fd-steps">Step 1 of 2 · Grown-up</p>
        <h1>Write this down now</h1>
        <p className="fd-hint">
          LearningOS has no accounts and no server, so there is no reset link. This code is the only
          way back in if the passcode is forgotten — and the records behind it are your attendance,
          grades and compliance file. Put it with your homeschool records.
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
          onClick={() => onDone({ ...issued.record, email: email.trim() || null })}
        >
          I&apos;ve written it down
        </button>
      </div>
    );
  }

  return (
    <form className="fd-body" onSubmit={submit}>
      <p className="fd-steps">Step 1 of 2 · Grown-up</p>
      <h1>Set a passcode</h1>
      <p className="fd-hint">
        This keeps records, grades and compliance separate from the school side on a shared
        computer, and it is how you get back into the grown-up corner.
      </p>

      {error ? (
        <p className="fd-error" role="alert">
          {error}
        </p>
      ) : null}

      <label htmlFor="fr-email">Email (optional)</label>
      <input
        id="fr-email"
        type="email"
        autoComplete="username"
        placeholder="someone@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="fr-pass">New passcode</label>
      <input
        id="fr-pass"
        type="password"
        autoComplete="new-password"
        value={passcode}
        onChange={(e) => setPasscode(e.target.value)}
      />

      <label htmlFor="fr-confirm">Type it again</label>
      <input
        id="fr-confirm"
        type="password"
        autoComplete="new-password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
      />

      <label htmlFor="fr-hint">Hint (optional)</label>
      <input id="fr-hint" type="text" value={hint} onChange={(e) => setHint(e.target.value)} />

      <button className="fd-btn" type="submit" disabled={busy}>
        {busy ? 'Saving…' : 'Continue'}
      </button>
    </form>
  );
}

function AcademyStep({ existingAcademies, showStepNumbers, onDone }) {
  const [displayName, setDisplayName] = useState('');
  const [pin, setPin] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);

    const name = displayName.trim();
    if (!name) {
      setError('Type the name they will use at the door.');
      setBusy(false);
      return;
    }

    // Two Academies answering to the same typed name would make the door
    // ambiguous, and it resolves by first match — which would silently send one
    // child into the other's school.
    if (matchAcademyByName(existingAcademies, name)) {
      setError('Someone on this computer already signs in with that name.');
      setBusy(false);
      return;
    }

    const check = validatePin(pin);
    if (!check.ok) {
      setError(check.error);
      setBusy(false);
      return;
    }
    if (pin !== confirm) {
      setError('The two sets of numbers are different.');
      setBusy(false);
      return;
    }
    if (isGuessablePin(pin)) {
      setError('Pick four numbers that are not all the same or in a row.');
      setBusy(false);
      return;
    }

    const record = await buildSecretRecord(pin);
    onDone({
      id: newAcademyId(name),
      displayName: name,
      pin: record,
      // Empty — §1's first state. It exists and can be signed into; it has no
      // subjects, theme or guide until the questionnaire runs.
      state: 'empty',
      createdAt: new Date().toISOString()
    });
  }

  return (
    <form className="fd-body" onSubmit={submit}>
      {showStepNumbers ? <p className="fd-steps">Step 2 of 2 · The learner</p> : null}
      <h1>Create an Academy</h1>
      <p className="fd-hint">
        The name is what they type at the door — the name they would write themselves. First name is
        plenty.
      </p>

      <p className="fd-note">
        This creates the Academy and its own private database. It starts empty: you&apos;ll answer
        the setup questions and enter their placement next, and that is what fills it in.
      </p>

      {error ? (
        <p className="fd-error" role="alert">
          {error}
        </p>
      ) : null}

      <label htmlFor="fr-name">Their name</label>
      <input
        id="fr-name"
        type="text"
        autoComplete="off"
        spellCheck="false"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />

      <label htmlFor="fr-pin">Four numbers</label>
      <input
        id="fr-pin"
        className="fd-pin"
        type="password"
        inputMode="numeric"
        autoComplete="off"
        maxLength={4}
        placeholder="····"
        value={pin}
        onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
      />

      <label htmlFor="fr-pin2">Type them again</label>
      <input
        id="fr-pin2"
        className="fd-pin"
        type="password"
        inputMode="numeric"
        autoComplete="off"
        maxLength={4}
        placeholder="····"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value.replace(/\D/g, ''))}
      />

      <button className="fd-btn" type="submit" disabled={busy}>
        {busy ? 'Creating…' : 'Create Academy'}
      </button>
    </form>
  );
}
