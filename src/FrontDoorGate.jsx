import { useCallback, useEffect, useState } from 'react';
import HomePage from './components/FrontDoor/HomePage.jsx';
import FrontDoor from './components/FrontDoor/FrontDoor.jsx';
import FirstRun from './components/FrontDoor/FirstRun.jsx';
import ParentCorner from './components/FrontDoor/ParentCorner.jsx';
import AcademyShell from './components/Academy/AcademyShell.jsx';
import { closeAcademy, openAcademy } from './db/db.js';
import {
  clearSession,
  loadAcademyRecords,
  loadHouseholdParentAuth,
  loadSession,
  openHousehold,
  putAcademyRecord,
  saveHouseholdParentAuth,
  saveSession
} from './db/householdDb.js';
import { dbNameFor, getAcademy } from './academies/registry.js';

/**
 * ---- THE BOOT GATE ----
 *
 * Everything that happens before there is a school on screen.
 *
 *   boot
 *    └─ someone remembered on this machine?
 *        ├─ yes → straight into their Academy
 *        └─ no  → the LearningOS home page
 *                  ├─ Student Login     → name + PIN → their Academy
 *                  ├─ Parent Login      → passcode   → the grown-up corner
 *                  │                                    ├─ Open  → that Academy
 *                  │                                    └─ Add   → first run
 *                  └─ Create an Academy → first run
 *   Sign Out → the home page
 *
 * ---- WHY THE PARENT DOOR OPENS ONTO A CHOICE ----
 *
 * It used to open onto `academies[0]`. One line, and it made the platform
 * single-school from the outside no matter how well separated the databases
 * underneath were: a parent could not pick which child's school to open, and
 * could not create a second Academy once one existed, because the home page's
 * "Create an Academy" routes a grown-up through the passcode first and the
 * passcode landed her inside Academy number one.
 *
 * A phase, rather than a panel over the home page, because this screen renders
 * children's names and the home page is shown to whoever sits down. The two are
 * separated by authentication and they are separated by file — see the note at
 * the top of ParentCorner.jsx.
 *
 * ---- WHY A REMEMBERED LEARNER SKIPS THE DOOR ----
 *
 * The household database remembers which Academy this machine last signed into.
 * A child opening their school in the morning lands where they landed
 * yesterday, rather than typing a name and four numbers before they can start.
 *
 * That is a convenience on their own machine, not an authentication decision,
 * and it does not weaken the rule the door keeps: the session record holds an
 * id and a timestamp. Nothing about anybody is rendered before it resolves —
 * the boot frame below is deliberately wordless.
 *
 * ---- WHY THIS WRAPS RATHER THAN LIVES INSIDE THE APP ----
 *
 * The Academy's own UI must not have to know about sign-in, and the gate must
 * not have to know about school. They meet at one prop.
 */
export default function FrontDoorGate() {
  // 'booting' → 'home' | 'choose' | 'first-run' | 'in'
  const [phase, setPhase] = useState('booting');
  const [panel, setPanel] = useState(null); // null | 'student' | 'parent'
  const [academies, setAcademies] = useState([]);
  const [parentAuth, setParentAuth] = useState(null);
  const [openId, setOpenId] = useState(null);
  const [enteredAs, setEnteredAs] = useState(null); // 'student' | 'parent'
  const [bootError, setBootError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        openHousehold();
        const [records, parent, session] = await Promise.all([
          loadAcademyRecords(),
          loadHouseholdParentAuth(),
          loadSession()
        ]);
        if (cancelled) return;

        setAcademies(records);
        setParentAuth(parent);

        const remembered = records.find((r) => r.id === session?.academyId);
        if (remembered) {
          openAcademy(remembered.id, dbNameFor(remembered.id));
          setOpenId(remembered.id);
          setEnteredAs('student');
          setPhase('in');
          return;
        }

        setPhase('home');
      } catch (error) {
        if (!cancelled) setBootError(error.message || String(error));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const enter = useCallback(
    async (academyId, as) => {
      // Throws rather than opening an empty database under an id nobody
      // registered — a typo must never look like a brand-new account.
      getAcademy(academies, academyId);
      openAcademy(academyId, dbNameFor(academyId));
      await saveSession(academyId);
      setOpenId(academyId);
      setEnteredAs(as);
      setPanel(null);
      setPhase('in');
    },
    [academies]
  );

  /**
   * Sign out: close the connection, forget the remembered Academy, and put the
   * home page back. `closeAcademy()` returns `db` to its sentinel, so any
   * helper firing during teardown says so by name rather than reading a
   * database belonging to nobody.
   */
  const signOut = useCallback(async () => {
    await clearSession();
    closeAcademy();
    setOpenId(null);
    setEnteredAs(null);
    setPhase('home');
    // A full reload is the honest way to drop state belonging to a learner who
    // has just left. Clearing it field by field would be a list that goes stale
    // the next time a field is added.
    window.location.reload();
  }, []);

  if (bootError) {
    return (
      <div className="fd">
        <div className="fd-panel-wrap">
          <div className="fd-panel">
            <div className="fd-body">
              <h1>LearningOS could not start</h1>
              <p className="fd-hint">{bootError}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Wordless on purpose: this frame renders before anyone has signed in, and is
  // the one frame a person other than the learner is most likely to see.
  if (phase === 'booting') return <div style={{ minHeight: '100vh', background: '#0e1a22' }} />;

  if (phase === 'first-run') {
    return (
      <FirstRun
        needsPasscode={!parentAuth?.hash}
        existingAcademies={academies}
        /**
         * Back to wherever this was reached from. A parent who has already
         * signed in and pressed "Add an Academy" is standing in the grown-up
         * corner; dropping her on the home page would make her type the
         * passcode again to get back to the list she was just looking at.
         */
        onCancel={() => setPhase(parentAuth?.hash && academies.length > 0 ? 'choose' : 'home')}
        onComplete={async ({ parentRecord, academy }) => {
          if (parentRecord) {
            await saveHouseholdParentAuth(parentRecord);
            setParentAuth(parentRecord);
          }
          await putAcademyRecord(academy);
          const next = [...academies, academy];
          setAcademies(next);
          getAcademy(next, academy.id);
          openAcademy(academy.id, dbNameFor(academy.id));
          await saveSession(academy.id);
          setOpenId(academy.id);
          setEnteredAs('parent');
          setPhase('in');
        }}
      />
    );
  }

  /**
   * The grown-up corner. Reached ONLY from a verified parent passcode — either
   * the parent tab below, or a recovery code that has just replaced one.
   *
   * This is the only screen in the sign-in flow that renders a child's name,
   * and the guard in scripts/verify-three-doors.mjs holds it to this one
   * entrance. If a future edit ever renders ParentCorner from the home phase,
   * that check fails, because the front door would then be publishing who
   * lives here to whoever sat down.
   */
  if (phase === 'choose') {
    return (
      <ParentCorner
        academies={academies}
        onOpenAcademy={(academyId) => enter(academyId, 'parent')}
        onAddAcademy={() => setPhase('first-run')}
        onClose={() => setPhase('home')}
      />
    );
  }

  if (phase === 'home') {
    return (
      <>
        <HomePage
          onOpenStudent={() => setPanel('student')}
          onOpenParent={() => setPanel('parent')}
          onCreateAcademy={() =>
            // A machine with no passcode has nobody to keep out, so creation
            // starts there. Once one exists, creating another Academy is a
            // grown-up action and goes through the parent door first.
            parentAuth?.hash ? setPanel('parent') : setPhase('first-run')
          }
        />
        {panel ? (
          <FrontDoor
            academies={academies}
            parentAuth={parentAuth}
            initialTab={panel}
            onClose={() => setPanel(null)}
            onStudentSignedIn={(academyId) => enter(academyId, 'student')}
            /**
             * A verified passcode ends at a CHOICE, never at an Academy.
             *
             * This line read `enter(academies[0].id, 'parent')` and that was
             * the whole of the platform's single-school behaviour. Picking the
             * first row of a list on the parent's behalf is not a shortcut when
             * the list has more than one child in it — it is the app deciding
             * which of her children she meant.
             *
             * A machine with no Academies has nothing to choose between, so it
             * goes straight to creating the first one.
             */
            onParentSignedIn={() => {
              setPanel(null);
              setPhase(academies.length === 0 ? 'first-run' : 'choose');
            }}
            onSetUpThisComputer={() => {
              setPanel(null);
              setPhase('first-run');
            }}
            onParentRecordReplaced={async (record) => {
              await saveHouseholdParentAuth(record);
              setParentAuth(record);
            }}
          />
        ) : null}
      </>
    );
  }

  const open = academies.find((a) => a.id === openId);

  return (
    <AcademyShell
      academy={open}
      enteredAs={enteredAs}
      onSignOut={signOut}
      /**
       * An Academy's state changes from inside it — a finished import, later a
       * finished questionnaire. The household record is the one place that
       * state lives, so the change goes back through here rather than being
       * held in a component that unmounts.
       */
      onAcademyChanged={async (patch) => {
        if (!open) return;
        const next = { ...open, ...patch };
        await putAcademyRecord(next);
        setAcademies((list) => list.map((a) => (a.id === next.id ? next : a)));
      }}
    />
  );
}
