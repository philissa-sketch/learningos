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

  if (state !== 'empty') {
    if (content === 'ready') {
      return (
        <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--fd-paper, #0e1a22)' }} />}>
          <SchoolBoot academy={academy} enteredAs={enteredAs} onSignOut={onSignOut} />
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

      {/*
        THE PICKER BELONGS HERE TOO, AND THIS IS THE SCREEN IT WAS MISSING FROM.

        A newly created Academy is `state: 'empty'`, and the only thing that
        used to move it off empty was a verified import. A family starting a
        second learner from scratch — no old school to bring across — reached
        this screen and had nothing to press. The curriculum was in the build
        and unreachable.

        Choosing here sets the pack AND marks the Academy active, because for a
        pack that ships its own subjects, timetable, guide and lessons there is
        nothing left pending: the next screen is the school. The questionnaire
        and placement path (§1's Configured state) is still to come, and when it
        lands it takes over this decision rather than sitting beside it.
      */}
      <ContentPackPicker
        canChoose={enteredAs === 'parent'}
        onChoosePack={(contentPack) => onAcademyChanged?.({ contentPack, state: 'active' })}
      />

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
function NoCurriculum({ academy, pack, error, broken, canChoose, onChoosePack, onSignOut }) {
  /**
   * ---- THE FIELD EXISTED BEFORE THE CONTROL THAT SETS IT ----
   *
   * `contentPackFor` reads `academy.contentPack` and falls back to the
   * Academy's id. Nothing in the app ever WROTE that field, so the fallback was
   * the only path — and an id is generated at the front door with a random
   * suffix precisely so two children sharing a name do not share records. It
   * can therefore never match a folder somebody authored. Every Academy but the
   * first was stuck on this screen with no way off it.
   *
   * Spec §3a is the reason this is a picker rather than a one-time setup step:
   * *"a career track is a field. It is never a foundation."* Changing what a
   * learner is working toward must not change her id, her database, or one hour
   * of what she has already earned. Choosing a pack rewrites one field on the
   * household record. Nothing else moves.
   */
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

      {broken ? null : (
        <ContentPackPicker canChoose={canChoose} onChoosePack={onChoosePack} />
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
 * ---- CHOOSING WHAT THIS ACADEMY IS WORKING TOWARD ----
 *
 * `contentPackFor` reads `academy.contentPack` and falls back to the Academy's
 * id. Nothing in the app ever WROTE that field, so the fallback was the only
 * path — and an id is generated at the front door with a random suffix,
 * precisely so two children sharing a name do not share records. It can
 * therefore never match a folder somebody authored. Every Academy but the very
 * first was stuck with no way to reach a curriculum at all.
 *
 * Spec §3a is why this is a PICKER rather than a one-time setup step:
 * *"a career track is a field. It is never a foundation."* Changing what a
 * learner is working toward must not change her id, her database, or one hour
 * of what she has already earned. This rewrites one field on the household
 * record. Nothing else moves.
 *
 * ---- WHY IT APPEARS ON TWO SCREENS ----
 *
 * A newly created Academy is `state: 'empty'`, and until now the only thing
 * that moved it off empty was importing an existing school. A family starting
 * fresh — which is the ordinary case for a second learner — landed on a screen
 * with no way forward at all. Both screens offer it, because both are places a
 * real family arrives with no curriculum yet.
 */
function ContentPackPicker({ canChoose, onChoosePack }) {
  const packs = availableAcademyFolders();
  const [chosen, setChosen] = useState('');

  if (!canChoose || packs.length === 0) {
    return (
      <p className="fd-note">
        Nothing is lost and nothing is wrong with the records. Curriculum is added to the app
        itself — until it is, this Academy stays here rather than opening somebody else&rsquo;s
        school.
        {!canChoose ? ' A grown-up signed in can choose one from this screen.' : ''}
      </p>
    );
  }

  return (
    <>
      <p className="fd-note">
        <strong>
          This app carries {packs.length} curriculum{packs.length === 1 ? '' : 's'}.
        </strong>{' '}
        Choosing one opens it for this Academy. It changes nothing else — the records, the hours
        and the grades belong to the Academy, not to the curriculum, and they stay exactly where
        they are if you change it again later.
      </p>

      <label className="fd-helper" style={{ display: 'block', textAlign: 'left' }}>
        Curriculum
        <select value={chosen} onChange={(e) => setChosen(e.target.value)}>
          <option value="">Choose…</option>
          {packs.map((id) => (
            <option key={id} value={id}>
              {id}
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
