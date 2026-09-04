import { lazy, Suspense, useEffect, useState } from 'react';
import ImportSchool from './ImportSchool.jsx';
import {
  AcademyContentMissing,
  academyHasContent,
  availableAcademyFolders,
  contentPackFor,
  loadAcademyContent
} from '../../content/academyContent.js';
import '../FrontDoor/frontDoor.css';

/**
 * The school, reached only through a dynamic import.
 *
 * This is the line the platform does not cross. Everything behind it reads one
 * Academy's content; nothing behind it may be evaluated until that content is
 * loaded, which is why it is lazy rather than imported at the top of this file.
 */
const SchoolBoot = lazy(() => import('../../SchoolBoot.jsx'));

/**
 * What a signed-in Academy shows.
 *
 * Chosen by the Academy's state (spec §1) AND by whether this build carries its
 * curriculum:
 *
 *   empty                     → the setup screen. It exists, it has its own
 *                               database, and there is nothing in it yet.
 *   configured | active,      → the school.
 *     content present
 *   configured | active,      → its own room, saying so plainly.
 *     content missing
 *
 * ---- THE CASE THIS COMPONENT EXISTS TO PREVENT ----
 *
 * Before the content interface, this file rendered `<App />` for any Academy
 * that was not Empty, and App reached one Academy's folder by name. So a second
 * Academy — its own database, its own sign-in, not one row of anybody else's
 * records — rendered the FIRST Academy's school. Its subjects, its guide, its
 * timetable, and a field trip belonging to another child, marked past due.
 *
 * Records separated correctly the whole time. Curriculum had no concept of
 * whose it was. That is what C1 fixed, and the guarantee now lives here: an
 * Academy whose content is missing gets an honest screen naming itself. It
 * never falls through to a school belonging to someone else.
 */
export default function AcademyShell({ academy, enteredAs, onSignOut, onAcademyChanged }) {
  const state = academy?.state || 'empty';
  const [importing, setImporting] = useState(false);
  const [changingCurriculum, setChangingCurriculum] = useState(false);

  // 'idle' before anything is needed, then 'loading' → 'ready' | 'missing'.
  const [content, setContent] = useState(state === 'empty' ? 'idle' : 'loading');
  const [contentError, setContentError] = useState(null);

  const pack = contentPackFor(academy);

  useEffect(() => {
    if (state === 'empty' || !academy) return undefined;

    let cancelled = false;
    setContent('loading');

    (async () => {
      try {
        const loaded = await loadAcademyContent(pack);
        if (cancelled) return;
        // The stylesheet travels in this Academy's chunk. Loading it here, once
        // content has resolved, is what keeps one Academy's palette out of
        // every other learner's download.
        await loaded.theme?.load?.();
        if (!cancelled) setContent('ready');
      } catch (error) {
        if (cancelled) return;
        setContentError(error);
        setContent(error instanceof AcademyContentMissing ? 'missing' : 'broken');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [academy, pack, state]);

  if (importing) {
    return (
      <ImportSchool
        academy={academy}
        onCancel={() => setImporting(false)}
        onDone={(outcome) => {
          setImporting(false);
          // An import that verified is the other door into a working Academy:
          // it has records now. It stops being Empty for the same reason a
          // finished questionnaire would end it.
          if (outcome?.ok) onAcademyChanged?.({ state: 'active' });
        }}
      />
    );
  }

  /**
   * ---- REPOINTING A SCHOOL THAT IS ALREADY RUNNING ----
   *
   * The school reads its content at module scope, so by the time it is on
   * screen every one of its modules has already destructured the pack that was
   * installed when it mounted. Swapping `installed` underneath it would leave a
   * running school holding values from a curriculum it is no longer pointed at
   * — the worst possible version of this, because it looks like it worked.
   *
   * A reload is the honest way, and it is the same reasoning sign-out already
   * uses: the field is written first, so the reload boots into the new pack.
   */
  async function repointCurriculum(contentPack) {
    await onAcademyChanged?.({ contentPack });
    window.location.reload();
  }

  if (state !== 'empty') {
    if (content === 'ready') {
      /**
       * ---- §3a's THIRD DOOR ----
       *
       * *"Change what you're working toward"*, in the grown-up corner of every
       * Academy. Specified, and for a long time not built.
       *
       * `contentPack` was written in exactly two places, and both of them were
       * only reachable when the Academy was ALREADY BROKEN — the empty room and
       * the no-curriculum room. That is not a writer. A parent whose Academy
       * worked, and was pointed at the wrong child's curriculum, had no screen
       * anywhere that could change it, and nothing on any screen that even said
       * which curriculum was loaded. A wrong choice stayed invisible until she
       * recognised another child's school.
       *
       * So this is reachable from a WORKING Academy, it names the pack before
       * it offers to change it, and it is parent-only — a learner must not swap
       * her own curriculum mid-morning.
       */
      if (changingCurriculum) {
        return (
          <Panel
            steps="Signed in · Grown-up"
            title={academy?.displayName ? `${academy.displayName}'s curriculum` : 'This curriculum'}
          >
            <p className="fd-hint">
              This Academy is working through <strong>{pack}</strong>.
            </p>

            <ContentPackPicker
              current={pack}
              canChoose={enteredAs === 'parent'}
              onChoosePack={repointCurriculum}
            />

            <button
              className="fd-btn"
              type="button"
              onClick={() => setChangingCurriculum(false)}
              style={{
                background: 'transparent',
                color: 'var(--fd-text-mid)',
                border: '1px solid var(--fd-line)'
              }}
            >
              Back to the school
            </button>
          </Panel>
        );
      }

      return (
        <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--fd-paper, #0e1a22)' }} />}>
          <SchoolBoot enteredAs={enteredAs} onSignOut={onSignOut} />
          {enteredAs === 'parent' ? (
            <CurriculumChip pack={pack} onOpen={() => setChangingCurriculum(true)} />
          ) : null}
        </Suspense>
      );
    }

    if (content === 'loading') {
      // Wordless, like the boot frame: this renders before this Academy's own
      // theme has been applied, and a message styled in nobody's colours is
      // worse than a moment of nothing.
      return <div style={{ minHeight: '100vh', background: '#0e1a22' }} />;
    }

    return (
      <NoCurriculum
        academy={academy}
        pack={pack}
        error={contentError}
        broken={content === 'broken'}
        canChoose={enteredAs === 'parent'}
        onChoosePack={(contentPack) => onAcademyChanged?.({ contentPack })}
        onSignOut={onSignOut}
      />
    );
  }

  return (
    <Panel steps="The Academy exists · Nothing in it yet" title="Signed in">
      <p className="fd-hint">
        This Academy has its own private database and can be signed into. It has no records yet —
        either bring an existing school across, or set it up from scratch.
      </p>

      <p className="fd-note">
        <strong>Already have a school?</strong> Import copies its records into this Academy and
        leaves the original completely untouched. You choose what travels, and you see what is in
        the file before anything moves.
      </p>

      {/*
        Offered here, on an Empty Academy, because that is exactly when a family
        who already has a school arrives: they have just created the Academy and
        a year of records is sitting in another database on this same machine.
      */}
      <button
        className="fd-btn"
        type="button"
        onClick={() => setImporting(true)}
        style={{ marginBottom: '10px' }}
      >
        Import an existing school
      </button>

      {/*
        A brand-new Academy needs to be pointed at a curriculum, and until this
        existed the only way off this screen was importing an old school. A
        family starting a second learner from scratch had nothing to press.
      */}
      <ContentPackPicker
        current={null}
        canChoose={enteredAs === 'parent'}
        onChoosePack={(contentPack) => onAcademyChanged?.({ contentPack, state: 'active' })}
      />

      <SignOutButton onSignOut={onSignOut} />

      <p className="fd-helper">
        Setting up from scratch — the questions and the placement — is the next thing being built.
      </p>
    </Panel>
  );
}

/**
 * An Academy that has records but no curriculum in this build.
 *
 * A real state, not a corrupt one. An Academy is created at the front door
 * minutes after a family first opens the app; its curriculum is authored
 * afterwards. This is the room it sits in until then — its own, named after
 * itself, offering the one thing that moves forward.
 */
/**
 * ---- POINT AN ACADEMY AT A CURRICULUM ----
 *
 * `contentPackFor` reads `academy.contentPack` and falls back to the Academy's
 * id. Until this control existed that field was READ IN ONE PLACE AND WRITTEN
 * IN NONE, which had two consequences and both of them bit.
 *
 *   A second Academy could be created, named, given a passcode and its own
 *   database — and then never pointed at any curriculum at all. Not "hard to
 *   point at one". No screen anywhere could do it.
 *
 *   And an Academy that LOST the field was unrecoverable from the app. It
 *   happened: a record whose id carried the random suffix every id gets, and
 *   whose curriculum folder did not, fell back to the id, found no folder of
 *   that name, and showed the empty room. Every record was intact — the
 *   passcode, the state, a year of work — and the school was unreachable over
 *   one missing string. It took a hand-written database write, on each of the
 *   family's computers, to put back.
 *
 * ---- WHY A FIELD AND NOT THE ID ----
 *
 * Spec §3a: *"a career track is a field. It is never a foundation."* An id is
 * generated at the front door with a random suffix so two children sharing a
 * name never share records, and it is the database name. If the curriculum were
 * the id, changing what a child works toward would change her database and cost
 * her every hour, grade and record she had earned.
 *
 * So the record points at a pack, the pack can be repointed, and the records
 * stay where they are. This control is that repointing, and it writes exactly
 * one field.
 */
function ContentPackPicker({ current, canChoose, onChoosePack }) {
  const packs = availableAcademyFolders();
  const [chosen, setChosen] = useState('');

  if (packs.length === 0) {
    return (
      <p className="fd-note">
        This copy of the app carries no curriculum folders at all, so there is nothing to point
        this Academy at yet.
      </p>
    );
  }

  // A learner must not be able to swap her own curriculum mid-morning. The
  // passcode was already verified at the front door, so this asks for no second
  // one — the same reasoning ParentGate uses.
  if (!canChoose) {
    return (
      <p className="fd-note">
        Nothing is lost and nothing is wrong with the records. A grown-up signed in can choose the
        curriculum for this Academy from this screen.
      </p>
    );
  }

  return (
    <>
      <p className="fd-note">
        <strong>
          This app carries {packs.length} curriculum{packs.length === 1 ? '' : 's'}.
        </strong>{' '}
        Choosing one opens it for this Academy and changes nothing else. The records, the hours and
        the grades belong to the Academy rather than to the curriculum, and they stay exactly where
        they are if it is changed again later.
      </p>

      <label className="fd-helper" style={{ display: 'block', textAlign: 'left' }}>
        Curriculum
        <select value={chosen} onChange={(e) => setChosen(e.target.value)}>
          <option value="">Choose…</option>
          {packs.map((id) => (
            <option key={id} value={id}>
              {id}
              {id === current ? ' — currently set' : ''}
            </option>
          ))}
        </select>
      </label>

      <button
        className="fd-btn"
        type="button"
        disabled={!chosen}
        onClick={() => onChoosePack?.(chosen)}
        style={{ marginBottom: '10px' }}
      >
        Open this curriculum
      </button>
    </>
  );
}

function NoCurriculum({ academy, pack, error, broken, canChoose, onChoosePack, onSignOut }) {
  return (
    <Panel
      steps={broken ? 'The Academy exists · Its curriculum is incomplete' : 'The Academy exists · No curriculum yet'}
      title={academy?.displayName ? `${academy.displayName}'s Academy` : 'This Academy'}
    >
      <p className="fd-hint">
        {broken
          ? 'This Academy has a curriculum folder, but it is missing something the school cannot run without.'
          : 'This Academy has its own records and its own database. Its lessons, subjects, timetable and guide have not been added yet.'}
      </p>

      {broken ? (
        <p className="fd-note">
          Nothing is lost and nothing is wrong with the records. This one needs fixing in the app
          itself rather than from this screen.
        </p>
      ) : (
        <ContentPackPicker current={pack} canChoose={canChoose} onChoosePack={onChoosePack} />
      )}

      {error?.message ? (
        <p className="fd-helper" style={{ textAlign: 'left' }}>
          <strong>Looking for:</strong> {pack}
          <br />
          {error.message}
        </p>
      ) : null}

      <SignOutButton onSignOut={onSignOut} />
    </Panel>
  );
}

/**
 * The one thing on a working school that says which curriculum it is running.
 *
 * Small, cornered and parent-only. It is deliberately a plain label rather than
 * an icon: the failure it exists to catch is a school that looks fine and is
 * pointed at the wrong pack, and an icon would not have caught it.
 *
 * It renders over the school rather than inside it because the school belongs
 * to an Academy and this belongs to the platform. Nothing behind this line may
 * know that more than one Academy exists.
 */
function CurriculumChip({ pack, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      title="Change what this Academy is working toward"
      style={{
        position: 'fixed',
        left: '10px',
        bottom: '10px',
        zIndex: 9000,
        maxWidth: '46vw',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        padding: '5px 10px',
        borderRadius: '999px',
        border: '1px solid rgba(255,255,255,0.25)',
        background: 'rgba(14,26,34,0.82)',
        color: 'rgba(255,255,255,0.72)',
        font: '500 11px/1.2 system-ui, sans-serif',
        letterSpacing: '0.03em',
        cursor: 'pointer'
      }}
    >
      Curriculum: {pack}
    </button>
  );
}

function SignOutButton({ onSignOut }) {
  return (
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
  );
}

function Panel({ steps, title, children }) {
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
            <p className="fd-steps">{steps}</p>
            <h1>{title}</h1>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export { academyHasContent };
