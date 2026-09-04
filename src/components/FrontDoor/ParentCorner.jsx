import { academyHasContent, contentPackFor } from '../../content/academyContent.js';
import './frontDoor.css';

/**
 * ---- THE GROWN-UP CORNER: WHICH ACADEMY, AND ONE MORE ----
 *
 * What a parent sees immediately after the passcode, and before any school.
 *
 * ---- WHY THIS EXISTS ----
 *
 * The gate used to do this instead:
 *
 *     enter(academies[0].id, 'parent');   // always the first Academy
 *
 * One line, and it made LearningOS single-school from the outside no matter
 * what the databases underneath were doing. A parent could not choose which
 * child's school to open, and could not create a second Academy once one
 * existed — "Create an Academy" on the home page routes through the parent
 * door, and the parent door signed her into Academy number one. The verdict
 * that produced this file was a parent saying there was no option to choose
 * either school — pressing either one put her back in the same child's.
 *
 * The separation underneath was real the whole time. It was not reachable.
 *
 * ---- WHY IT IS A SEPARATE COMPONENT FROM THE DOOR ----
 *
 * This is the one screen in the sign-in flow that DOES render children's names,
 * and that is not a loosening of the front-door rule — it is the other side of
 * it.
 *
 * `FrontDoor.jsx` may never render a name, because it is shown to whoever sits
 * down at the keyboard, and a list of names published to a stranger is the
 * thing that rule exists to prevent. By the time this component renders, a
 * passcode has been verified against a PBKDF2 hash. The person reading it is
 * the parent, and refusing to show her her own children's names would protect
 * nobody and make the screen useless.
 *
 * Keeping them in two files is what makes that difference checkable. A guard
 * that has to decide whether a given `.map()` is before or after authentication
 * is a guard that will eventually be wrong. `scripts/verify-three-doors.mjs`
 * asserts instead that this component has exactly one caller and that the
 * caller reaches it only from the signed-in parent phase.
 *
 * ---- WHY IT SHOWS THE CURRICULUM BY NAME ----
 *
 * Nothing anywhere used to display which curriculum an Academy was pointed at,
 * so a wrong pack was invisible until a parent recognised another child on the
 * screen. `availableAcademyFolders()` sorts, which means the alphabetically
 * first child's folder was the first option in every dropdown — a wrong choice
 * that looks exactly like no choice at all.
 *
 * A field nobody can see is a field nobody can correct. So the pack is named
 * here, next to the Academy it belongs to, before anything is opened.
 */
export default function ParentCorner({ academies = [], onOpenAcademy, onAddAcademy, onClose }) {
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

          {onClose ? (
            <button className="fd-close" type="button" onClick={onClose} aria-label="Close">
              ×
            </button>
          ) : null}

          <div className="fd-body">
            <p className="fd-steps">Signed in · Grown-up</p>
            <h1>Which school?</h1>

            {academies.length === 0 ? (
              <p className="fd-hint">
                There are no Academies on this computer yet. Adding one creates it and its own
                private database.
              </p>
            ) : (
              <p className="fd-hint">
                Each Academy keeps its own records in its own database. Opening one shows you that
                child&apos;s school and nothing of anybody else&apos;s.
              </p>
            )}

            <ul style={{ listStyle: 'none', margin: '0 0 14px', padding: 0, textAlign: 'left' }}>
              {academies.map((academy) => (
                <AcademyRow
                  key={academy.id}
                  academy={academy}
                  onOpen={() => onOpenAcademy?.(academy.id)}
                />
              ))}
            </ul>

            {/*
              The second door. Until this button existed, creating an Academy
              once one already existed was impossible from inside the app: the
              home page sent a parent through the passcode first, and the
              passcode opened Academy number one.
            */}
            <button className="fd-btn" type="button" onClick={onAddAcademy}>
              Add an Academy
            </button>

            <p className="fd-helper">
              Adding an Academy asks for a name and four numbers. It does not touch any Academy
              already on this computer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * One Academy, and the truth about it.
 *
 * The state and the curriculum are both shown because they answer two different
 * questions a parent actually has at this screen — *has this one been set up
 * yet*, and *is it pointed at the right work*. A row that showed only a name
 * would send her into the school to find out.
 */
function AcademyRow({ academy, onOpen }) {
  const pack = contentPackFor(academy);
  const present = pack ? academyHasContent(pack) : false;
  const state = academy?.state || 'empty';

  return (
    <li
      style={{
        border: '1px solid var(--fd-line)',
        borderRadius: '10px',
        padding: '12px 14px',
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600 }}>{academy.displayName}</div>
        <div className="fd-helper" style={{ margin: '2px 0 0', textAlign: 'left' }}>
          {state === 'empty' ? 'Nothing in it yet' : null}
          {state !== 'empty' && pack && present ? `Curriculum: ${pack}` : null}
          {state !== 'empty' && pack && !present
            ? `Curriculum: ${pack} — not in this copy of the app`
            : null}
          {state !== 'empty' && !pack ? 'No curriculum chosen yet' : null}
        </div>
      </div>

      <button
        className="fd-btn"
        type="button"
        onClick={onOpen}
        style={{ width: 'auto', margin: 0, padding: '8px 16px', flex: '0 0 auto' }}
      >
        Open
      </button>
    </li>
  );
}
