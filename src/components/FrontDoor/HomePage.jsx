import './frontDoor.css';
import './homePage.css';

/**
 * The LearningOS home page.
 *
 * Built from docs/LEARNINGOS_FRONT_DOOR_MOCKUP.html, which is the approved
 * design. The copy below is that document's copy, kept rather than rewritten.
 *
 * ---- WHO SEES THIS ----
 *
 * Not the child, most mornings. A remembered learner goes straight into their
 * Academy and never passes through here. This page exists for a first visit,
 * for the signed-out state, and for anyone who reaches the URL not knowing what
 * this is.
 *
 * ---- WHAT IT MAY NOT CONTAIN ----
 *
 * Anything about a real learner. The three example goals in the hero are
 * illustrative marketing copy from the approved design — they name no one and
 * come from no record. Nothing on this page is read from the household
 * database, and the guard checks that it never starts being.
 */
export default function HomePage({ onOpenStudent, onOpenParent, onCreateAcademy }) {
  return (
    <div className="los">
      <div className="los-utility">
        <div className="inner">
          <nav aria-label="Site">
            <a href="#how">How it works</a>
            <a href="#different">What&apos;s different</a>
            <a href="#records">Records &amp; compliance</a>
            <a href="#privacy">Privacy</a>
          </nav>
          <div className="los-logins">
            <button className="los-login-btn" type="button" onClick={onOpenParent}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="4" y="10" width="16" height="11" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
              </svg>
              Parent Login
            </button>
            <button className="los-login-btn" type="button" onClick={onOpenStudent}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
              </svg>
              Student Login
            </button>
          </div>
        </div>
      </div>

      <div className="los-brandbar">
        <div className="inner">
          <div className="los-brand">
            <div className="fd-glyph" aria-hidden="true">
              L
            </div>
            <div>
              <div className="los-brandname">
                Learning<span>OS</span>
              </div>
              <div className="los-brandtag">
                A homeschool built around what your child wants to become
              </div>
            </div>
          </div>
          <div className="los-brand-actions">
            <a className="los-btn los-btn-ghost" href="#how">
              See how it works
            </a>
            <button className="los-btn los-btn-solid" type="button" onClick={onCreateAcademy}>
              Create an Academy
            </button>
          </div>
        </div>
      </div>

      <div className="los-hero">
        <div className="inner los-hero-grid">
          <div>
            <span className="eyebrow">Grades K–12 · Any state</span>
            <h1>
              Start with who they want to <em>become.</em>
            </h1>
            <p className="los-lede">
              Most programs sell a grade level and hope it fits. LearningOS starts from a goal —
              then places every subject where the child actually reads and works, measured by real
              diagnostics rather than assumed from their age.
            </p>
            <div className="los-hero-cta">
              <button
                className="los-btn los-btn-solid los-btn-lg"
                type="button"
                onClick={onCreateAcademy}
              >
                Create an Academy
              </button>
              <a
                className="los-btn los-btn-ghost los-btn-lg"
                href="#how"
                style={{ color: 'var(--fd-text)', borderColor: 'var(--fd-line)' }}
              >
                How it works
              </a>
            </div>
            <p className="los-hero-note">Already set up? Use Student Login above.</p>
          </div>

          <div className="los-goals">
            <h2>An Academy begins with one answer</h2>
            <div className="los-goal-row">
              <span className="age">12</span>
              <span className="want">An aerospace engineer</span>
            </div>
            <div className="los-goal-row">
              <span className="age">9</span>
              <span className="want">A doctor who heals with plants</span>
            </div>
            <div className="los-goal-row">
              <span className="age">15</span>
              <span className="want">A marine biologist</span>
            </div>
            <div className="los-goals-foot">
              Every subject, schedule, and reward in that child&apos;s Academy is built around their
              answer. Change the answer, and the school changes with it.
            </div>
          </div>
        </div>
      </div>

      <section id="how">
        <div className="inner">
          <div className="los-sec-head">
            <h2>How an Academy begins</h2>
            <p>
              About twenty-five minutes of setup, plus three free diagnostics you run separately.
            </p>
          </div>
          <div className="los-cols">
            <div className="los-col">
              <h3>One · The answer</h3>
              <p>
                What do they want to be? That answer picks the signature subject, the rank ladder,
                and the guide who walks them through it.
              </p>
            </div>
            <div className="los-col">
              <h3>Two · How they learn</h3>
              <p>
                Days a week, hours a day, when their brain is sharpest, how long they can focus, and
                whether they read instructions or need them read aloud.
              </p>
            </div>
            <div className="los-col">
              <h3>Three · Measured, not asked</h3>
              <p>
                Reading, maths and science levels come from free diagnostics you run yourself. The
                setup never asks you to guess a level.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="different">
        <div className="inner los-split">
          <div className="los-sec-head" style={{ marginBottom: 0 }}>
            <h2>What&apos;s different</h2>
            <p>
              Four decisions that shape everything else, and the reasons they were made that way.
            </p>
          </div>
          <div>
            <Fact
              title="Placed by measurement"
              body="Each subject opens at the level its weakest strand supports — never an average, never an age."
            />
            <Fact
              title="Read-aloud is recorded"
              body="A level reached by listening isn't the same claim as one reached by reading. The record says which."
            />
            <Fact
              title="A guide, not a mascot"
              body="Each Academy has its own character who greets, explains, and never tells a child their level."
            />
            <Fact
              title="Earned, not bought"
              body="Ranks and rewards come from work finished, on a ladder named for where the child is headed."
            />
          </div>
        </div>
      </section>

      <section id="privacy">
        <div className="inner">
          <div className="los-sec-head">
            <h2>One app. Separate everything.</h2>
            <p>Two children on the same computer share nothing at all.</p>
          </div>
          <div className="los-cols">
            <div className="los-col">
              <h3>Separate records</h3>
              <p>
                Each Academy keeps its own database. One child&apos;s attendance can&apos;t reach
                another&apos;s, even by accident during a transfer.
              </p>
            </div>
            <div className="los-col">
              <h3>Separate curriculum</h3>
              <p>
                Lessons live in their own folder per Academy. A child only ever loads the school
                that belongs to them.
              </p>
            </div>
            <div className="los-col">
              <h3>Nothing before sign-in</h3>
              <p>
                No names, ages, goals, or schedules appear on this page. A child&apos;s information
                exists only after that child signs in.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="records">
        <div className="inner los-split">
          <div className="los-sec-head" style={{ marginBottom: 0 }}>
            <h2>Records that hold up</h2>
            <p>
              Attendance, instructional hours, grades, portfolio, and an annual progress report —
              kept as you go, in the format your state expects. Pick your state and the requirements
              follow.
            </p>
          </div>
          <div>
            <Fact
              title="Days and hours, counted automatically"
              body="Every finished block adds to the ledger — including the garden, the instrument, and the field trip."
            />
            <Fact
              title="Your state's rules, not ours"
              body="Notification deadlines, required subjects, testing cadence and report format come from the state you choose."
            />
            <Fact
              title="Verified, or marked unverified"
              body="Every state's requirements carry a source and a date checked. Anything unconfirmed says so instead of guessing."
            />
          </div>
        </div>
      </section>

      <footer className="los-footer">
        <div className="inner">
          <div>
            <div className="los-foot-brand">LearningOS</div>
            <div style={{ fontSize: '12.5px', marginTop: '5px', opacity: 0.72 }}>
              Your curriculum. Your records. Your computer.
            </div>
          </div>
          <nav className="los-foot-links" aria-label="Footer">
            <a href="#how">How it works</a>
            <a href="#records">Compliance</a>
            <a href="#privacy">Privacy</a>
            <button type="button" onClick={onOpenParent}>
              Parent Login
            </button>
            <button type="button" onClick={onOpenStudent}>
              Student Login
            </button>
          </nav>
        </div>
      </footer>
    </div>
  );
}

function Fact({ title, body }) {
  return (
    <div className="los-fact">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M20 6 9 17l-5-5" />
      </svg>
      <div>
        <b>{title}</b>
        <span>{body}</span>
      </div>
    </div>
  );
}
