import { useState } from 'react';
import { BookLibraryView } from './BookLibraryView.jsx';
import { AcademicAssignmentsView } from './AcademicAssignmentsView.jsx';
import { AcademicPortfolioView } from './AcademicPortfolioView.jsx';
import { AcademicParentSetupView } from './AcademicParentSetupView.jsx';
import { NovaAcademicGuide } from './NovaAcademicGuide.jsx';

const TABS = [
  { id: 'books', label: 'Book Library' },
  { id: 'assignments', label: 'Assignments' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'setup', label: 'Parent Setup' }
];

/**
 * Academic Success Center — v1 (PROJECT_PLAN.md Part 9).
 *
 * The shared home for books, major assignments, and completed academic
 * work across every subject, replacing the read-only preview that used
 * to live inside the Parent Dashboard.
 *
 * WHAT'S BUILT HERE (confirmed v1 scope): the Family/Subject Book
 * Library, real trackable quarterly assignments, and one Portfolio view
 * that aggregates completed work from the Writing Journal, this Center,
 * and the Parent Dashboard's hand-logged projects.
 *
 * WHAT'S DELIBERATELY NOT BUILT (still real Part 9 items, deferred by
 * the parent's own decision — don't add them without asking): the AI
 * reading planner that auto-recommends books, the workload balancer,
 * the annual academic planner / AI curriculum coach, the citation
 * manager, the research-skills curriculum, presentation-format tooling,
 * and the Black American Excellence Library curation project. This app
 * has no live AI integration, so anything described in Part 9 as "the
 * AI automatically decides X" cannot be built here as literal
 * automation and is not faked with a random picker.
 *
 * PARENT SETUP is a plain sub-tab, not a security boundary — this app
 * has no login yet. The Parent Dashboard login gate the parent asked
 * for is still queued; when it exists, this tab is the natural thing to
 * put behind it.
 */
/**
 * `focusAssignmentId` — open straight at one assignment.
 *
 * ---- WHY (Aug 15, 2026) ----
 *
 * The parent: "when book open is selected it takes him to all the book not the
 * specific one."
 *
 * The home screen names his book — "A Long Walk to Water — weekly chapter
 * pacing" — and the Open button landed him on the Book Library tab, a list of
 * every book in the year, with no indication which one he had just been sent
 * to read. He had to find it again by hand.
 *
 * This is the SECOND time this exact fault has been reported. The Writing
 * Journal row had it in August and the fix is recorded there in these words:
 * "Routing to the journal list made him hunt for the assignment he had just
 * been told to do — the parent caught it the first time she pressed the
 * button." A row that names a thing must open THAT thing.
 *
 * ---- AND A THIRD TIME (Aug 26, 2026) ----
 *
 * The parent: **"there isn't a link to lead him to the assignment from his
 * mission page. Open leads to the Book library not the assignment."**
 *
 * The fix above was applied to the reading row and NOT to
 * `AcademicCenterCard` — the card in her screenshot, which lists the book, the
 * step he is on and everything due this week, and where not one row was
 * clickable and the Open button passed nothing. Fixing one call site is not
 * fixing a rule.
 *
 * A SECOND FAULT, in the Aug 15 fix itself: it passed `currentBook.id` into a
 * parameter named `focusAssignmentId`. Books and assignments are different
 * tables with their own auto-increment, so in her live database "A Long Walk
 * to Water" (book 6) sent him to the assignments tab pointed at assignment 6 —
 * a different piece of work. `focus` is typed now: `{ kind, id }`. A bare id
 * cannot say what it is an id of.
 */
export function AcademicHome({ focus = null }) {
  const [tab, setTab] = useState(focus?.kind === 'assignment' ? 'assignments' : 'books');

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:px-6">
      <div>
        <p className="text-xs font-display uppercase tracking-widest text-ink-500">Academic Success Center</p>
        <h2 className="mt-1 font-display text-2xl font-700 text-ink-100">Books, Assignments &amp; Portfolio</h2>
        <p className="mt-2 text-sm text-ink-300">
          One shared home for reading, writing, research, and major assignments across every subject —
          instead of a separate system per subject.
        </p>
      </div>

      <div className="flex flex-wrap gap-1 rounded-lg bg-space-800 p-1 shadow-panel">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={
              'rounded-md px-3 py-1.5 text-sm font-display font-600 transition-colors ' +
              (tab === t.id ? 'bg-signal-cyan/15 text-signal-cyan' : 'text-ink-300 hover:text-ink-100')
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      <NovaAcademicGuide tab={tab} />

      {tab === 'books' && <BookLibraryView focusBookId={focus?.kind === 'book' ? focus.id : null} />}
      {tab === 'assignments' && (
        <AcademicAssignmentsView focusAssignmentId={focus?.kind === 'assignment' ? focus.id : null} />
      )}
      {tab === 'portfolio' && <AcademicPortfolioView />}
      {tab === 'setup' && <AcademicParentSetupView />}
    </div>
  );
}
