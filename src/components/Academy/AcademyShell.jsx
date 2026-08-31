import { useEffect, useState } from 'react';
import App from '../../App.jsx';
import ImportSchool from './ImportSchool.jsx';
import { useAppStore } from '../../store/useAppStore.js';
import '../FrontDoor/frontDoor.css';

/**
 * What a signed-in Academy shows.
 *
 * Two things, chosen by the Academy's state (spec §1):
 *
 *   empty                → the setup screen below. It exists, it has its own
 *                          database, and there is nothing in it yet.
 *   configured | active  → the school.
 *
 * ---- WHY THE EMPTY STATE IS A REAL SCREEN AND NOT A STUB ----
 *
 * A family genuinely sits in it. Between creating an Academy and finishing the
 * questionnaire is about twenty-five minutes, plus however long the diagnostics
 * take, and a family who already has a school sits here until they have
 * imported it. Told plainly what they have and what comes next, that is a
 * waiting room. Shown a broken school, it is a bug report.
 */
export default function AcademyShell({ academy, enteredAs, onSignOut, onAcademyChanged }) {
  const state = academy?.state || 'empty';
  const [importing, setImporting] = useState(false);
  const hydrated = useAppStore((s) => s.hydrated);

  /**
   * The parent verified the same passcode against the same hash at the front
   * door. Asking again at ParentGate would add a keystroke, not a check.
   *
   * This is the only caller of unlockParentDashboard(), and
   * scripts/verify-front-door.mjs holds it to one.
   */
  useEffect(() => {
    if (enteredAs === 'parent' && hydrated && state !== 'empty') {
      useAppStore.getState().unlockParentDashboard();
    }
  }, [enteredAs, hydrated, state]);

  if (importing) {
    return (
      <ImportSchool
        academy={academy}
        onCancel={() => setImporting(false)}
        onDone={(outcome) => {
          setImporting(false);
          // An import that verified is the other door into a working Academy:
          // it has records now, and its content is on disk. It stops being
          // Empty for the same reason a finished questionnaire would end it.
          if (outcome?.ok) onAcademyChanged?.({ state: 'active' });
        }}
      />
    );
  }

  if (state !== 'empty') {
    return (
      <App initialView={enteredAs === 'parent' ? 'parent' : 'dashboard'} onSignOut={onSignOut} />
    );
  }

  return (
    <div className="fd" style={{ background: 'var(--fd-paper)' }}>
      <div className="fd-panel-wrap" style={{ maxWidth: '520px' }}>
        <div className="fd-panel">
          <div className="fd-panel-top">
            <div className="fd-glyph" aria-hidden="true">
              L
            </div>
            <div className="fd-brandname">
              Learning<span>OS</span>
            </div>
          </div>

          <div className="fd-body">
            <p className="fd-steps">The Academy exists · Nothing in it yet</p>
            <h1>Signed in</h1>
            <p className="fd-hint">
              This Academy has its own private database and can be signed into. It has no records
              yet — either bring an existing school across, or set it up from scratch.
            </p>

            <p className="fd-note">
              <strong>Already have a school?</strong> Import copies its records into this Academy
              and leaves the original completely untouched. You choose what travels, and you see
              what is in the file before anything moves.
            </p>

            {/*
              Offered here, on an Empty Academy, because that is exactly when a
              family who already has a school arrives: they have just created
              the Academy and a year of records is sitting in another database
              on this same machine.
            */}
            <button
              className="fd-btn"
              type="button"
              onClick={() => setImporting(true)}
              style={{ marginBottom: '10px' }}
            >
              Import an existing school
            </button>

            <button
              className="fd-btn"
              type="button"
              onClick={onSignOut}
              style={{
                background: 'transparent',
                color: 'var(--fd-text-mid)',
                border: '1px solid var(--fd-line)'
              }}
            >
              Sign out
            </button>

            <p className="fd-helper">
              Setting up from scratch — the questions and the placement — is the next thing being
              built.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
