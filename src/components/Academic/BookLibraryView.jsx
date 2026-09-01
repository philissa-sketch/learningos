import { useEffect, useRef } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { matchReadingLogToBooks } from '../../lib/academicPortfolio.js';
import { BlackExcellenceShelf } from './BlackExcellenceShelf.jsx';
import { getCurrentQuarter } from '../../lib/schoolQuarter.js';
import { buildReadingPlan, currentReadingWeek, readingStatus } from '../../lib/readingPlan.js';
import { formatDueDate } from './academicUi.js';
import { orderBooks } from '../../lib/academicOrder.js';
import {
  BOOK_STATUS_LABELS,
  statusBadgeClass,
  subjectHeading,
  orderedSubjects
} from './academicUi.js';
import { academyContent } from '../../content/academyContent.js';

const { BOOK_RANGE_LABELS, nextRecommendationForBook, rationaleFor } = academyContent().academicCenter;

/**
 * Book Library — student-facing view of the Family/Subject Library
 * (PROJECT_PLAN.md Part 9, "Personal Book Library" / "Subject Reading
 * Libraries").
 *
 * Reading status is the one thing the student changes here. Titles,
 * authors, and which slots exist are the parent's, and are edited in
 * the Parent Setup tab — so this view stays a clean "what am I reading"
 * screen rather than a form.
 *
 * Empty slots are shown, not hidden: a subject with a Required book slot
 * and no book chosen yet is real, useful information for both of them,
 * and hiding it would make the Center look emptier than the plan
 * actually is. What is never done is filling that slot with a guessed
 * title.
 */
/**
 * `focusBookId` — open straight at one book.
 *
 * ---- WHY (Aug 26, 2026) ----
 *
 * The Aug 15 fix routed the reading row's Open button to a specific book. It
 * passed the book id into `focusAssignmentId`, which lives on a different
 * table — so it landed on the ASSIGNMENTS tab pointed at an unrelated
 * assignment. This tab had no way to focus a book at all, so even a correctly
 * typed id would have arrived here and done nothing.
 *
 * Same treatment the assignments list already had: scroll it into view and
 * ring it. Opening the right tab is not enough on a screen holding twenty
 * books across six subjects.
 */
export function BookLibraryView({ focusBookId = null }) {
  const academicBooks = useAppStore((s) => s.academicBooks);
  const readingLog = useAppStore((s) => s.readingLog);
  const setAcademicBookStatus = useAppStore((s) => s.setAcademicBookStatus);
  const recordBookProgress = useAppStore((s) => s.recordBookProgress);
  const toggleBookFavorite = useAppStore((s) => s.toggleBookFavorite);
  const rateBook = useAppStore((s) => s.rateBook);

  const subjects = orderedSubjects(academicBooks);
  const { logByBookId, unmatched } = matchReadingLogToBooks(academicBooks, readingLog);

  const realBooks = academicBooks.filter((b) => b.title);
  const finished = realBooks.filter((b) => b.status === 'completed').length;
  const reading = realBooks.filter((b) => b.status === 'in-progress').length;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Book Library</p>
        <h3 className="mt-1 font-display text-lg font-700 text-ink-100">Every Subject's Books in One Place</h3>
        <p className="mt-2 text-sm text-ink-300">
          {realBooks.length === 0
            ? 'No books added yet. Each subject below has slots waiting for a real book — add them in the Parent Setup tab.'
            : `${realBooks.length} ${realBooks.length === 1 ? 'book' : 'books'} in the library — ${reading} being read now, ${finished} finished.`}
        </p>
      </div>

      {subjects.map((subject) => {
        const books = orderBooks(academicBooks.filter((b) => b.subject === subject));
        return (
          <div key={subject} className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
            <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">
              {subjectHeading(subject)}
            </p>
            <div className="mt-3 space-y-2">
              {books.map((book) => (
                <BookRow
                  key={book.id}
                  book={book}
                  focused={focusBookId != null && book.id === focusBookId}
                  logEntries={logByBookId.get(book.id) || []}
                  onSetStatus={setAcademicBookStatus}
                  onRecordProgress={recordBookProgress}
                  onToggleFavorite={toggleBookFavorite}
                  onRate={rateBook}
                />
              ))}
            </div>
            <BlackExcellenceShelf subject={subject} academicBooks={academicBooks} />
          </div>
        );
      })}

      {unmatched.length > 0 && (
        <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
          <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Other Logged Reading</p>
          <h3 className="mt-1 font-display text-lg font-700 text-ink-100">From the Reading Log</h3>
          <p className="mt-2 text-sm text-ink-300">
            Reading Log entries (Parent Dashboard) whose title doesn't match a book in the library yet.
            Nothing is missing — add a matching book above and its sessions move up under it automatically.
          </p>
          <div className="mt-3 space-y-1.5">
            {unmatched.map((entry) => (
              <div key={entry.id} className="rounded-lg border border-space-700 bg-space-900 px-3 py-2 text-sm">
                <p className="text-ink-100">{entry.title}</p>
                <p className="mt-0.5 text-xs text-ink-500">
                  {entry.author ? `${entry.author} · ` : ''}
                  {entry.amount} {entry.unit} · {entry.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Lamar's own 1-5 rating. Nothing scores him on it — it exists so the
 * library remembers what he actually thought, which is what makes a
 * family library worth keeping.
 */
function BookRating({ book, onRate }) {
  return (
    <span className="flex items-center gap-1">
      <span className="text-[10px] font-display uppercase tracking-widest text-ink-600">Your rating</span>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRate(book.id, star)}
          aria-label={`${star} star${star === 1 ? '' : 's'}`}
          aria-pressed={book.rating === star}
          className={
            'text-sm transition-colors ' +
            ((book.rating || 0) >= star ? 'text-signal-amber' : 'text-ink-600 hover:text-ink-300')
          }
        >
          ★
        </button>
      ))}
    </span>
  );
}

/**
 * This week's reading target, and where he actually is.
 *
 * Shows nothing but a prompt when the parent hasn't said how long the
 * book is — the app will not guess a chapter count to make a nicer UI.
 */
function ReadingPace({ book, onRecordProgress }) {
  if (!book.totalUnits) {
    return (
      <p className="mt-2 text-xs text-ink-600">
        No weekly reading pace yet — ask your parent to add how many chapters this book has.
      </p>
    );
  }

  const quarter = getCurrentQuarter().batchLabel;
  const plan = buildReadingPlan({ totalUnits: book.totalUnits, unit: book.unit, quarter });
  const week = currentReadingWeek(plan);
  const status = readingStatus(plan, book.unitsDone);
  if (!status) return null;

  const toneClass =
    status.state === 'behind'
      ? 'text-signal-amber'
      : status.state === 'finished'
        ? 'text-signal-cyan'
        : 'text-ink-500';

  return (
    <div className="mt-2 rounded-lg border border-space-700 bg-space-950/40 px-3 py-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[10px] font-display uppercase tracking-widest text-ink-600">Reading pace</p>
        <p className={'text-[10px] font-display uppercase tracking-widest ' + toneClass}>
          {status.state === 'finished'
            ? 'Finished'
            : status.state === 'behind'
              ? `${status.behindBy} ${status.unit} behind`
              : 'On track'}
        </p>
      </div>

      {week ? (
        <p className="mt-1 text-sm text-ink-100">
          This week: {status.unit === 'pages' ? 'pages' : 'chapters'} {week.from}
          {week.to !== week.from ? `-${week.to}` : ''}{' '}
          <span className="text-xs text-ink-500">by {formatDueDate(week.weekEnding)}</span>
        </p>
      ) : (
        <p className="mt-1 text-sm text-ink-300">Plan finished for this quarter.</p>
      )}

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className="text-xs text-ink-500">
          Done: {status.done} of {status.total} {status.unit}
        </span>
        <button
          type="button"
          onClick={() => onRecordProgress(book.id, (book.unitsDone || 0) - 1)}
          disabled={(book.unitsDone || 0) <= 0}
          className="rounded-md border border-space-600 px-2 py-0.5 text-xs font-display font-600 text-ink-300 transition hover:text-ink-100 disabled:opacity-30"
        >
          −
        </button>
        <button
          type="button"
          onClick={() => onRecordProgress(book.id, (book.unitsDone || 0) + 1)}
          className="rounded-md bg-signal-cyan px-2.5 py-0.5 text-xs font-display font-700 text-space-950 transition hover:brightness-110"
        >
          + Read one
        </button>
      </div>
    </div>
  );
}

const NEXT_STATUS_ACTIONS = [
  { status: 'not-started', label: 'Not started' },
  { status: 'in-progress', label: 'Reading' },
  { status: 'completed', label: 'Finished' }
];


/**
 * Why this book is on the shelf — shown on the book itself, permanently.
 *
 * The parent, Aug 7 2026: "I wasn't told why that book was chosen. In the
 * future when a book is recommended I want to know why the book was chosen so
 * he can reference it back to there."
 *
 * The reasoning was never missing; it was only ever shown on the SUGGESTION
 * card, before she approved the book. Once accepted, it disappeared and the
 * slot's note reverted to reading "book TBD" — so the app's own answer to "why
 * this book?" was "to be decided."
 *
 * Written to Lamar rather than about him. He is the one who asked to reference
 * it back, so it addresses him directly and it stays put.
 */
function WhyThisBook({ book }) {
  const r = rationaleFor(book);
  if (!r) return null;
  const outside = r.range === 'outside';

  return (
    <details className="mt-2 rounded-lg border border-space-700 bg-space-950/60">
      <summary className="cursor-pointer px-3 py-2 text-xs font-display uppercase tracking-widest text-signal-cyan marker:text-signal-cyan">
        Why this book
      </summary>
      <div className="space-y-2 px-3 pb-3 text-xs leading-relaxed text-ink-300">
        <p>{r.why}</p>

        <p
          className={
            'rounded border px-2 py-1 text-[11px] ' +
            (outside
              ? 'border-space-600 bg-space-900 text-ink-400'
              : 'border-signal-amber/30 bg-signal-amber/5 text-signal-amber')
          }
        >
          <span className="font-display uppercase tracking-widest">
            {BOOK_RANGE_LABELS[r.range] || r.range}
          </span>
          {/* The gap, stated. A book chosen from outside the range has to say
              what was searched for first and what was actually found — a gap
              recorded honestly teaches him something; a gap papered over does
              not. */}
          {r.rangeNote && <span className="mt-1 block font-sans normal-case tracking-normal">{r.rangeNote}</span>}
        </p>

        {r.headsUp && r.headsUp !== 'None.' && (
          <p className="text-ink-400">
            <span className="font-display uppercase tracking-widest text-ink-500">Heads-up </span>
            {r.headsUp}
          </p>
        )}

        <p className="text-ink-600">
          {r.level}
          {r.source && (
            <>
              {' · '}
              <a
                href={r.source}
                target="_blank"
                rel="noreferrer"
                className="text-signal-cyan underline hover:brightness-110"
              >
                verified against this source ↗
              </a>
            </>
          )}
        </p>
      </div>
    </details>
  );
}

function BookRow({ book, focused = false, logEntries, onSetStatus, onRecordProgress, onToggleFavorite, onRate }) {
  /**
   * Scroll the book he was sent here for into view, and ring it. `block:
   * 'center'` rather than 'start' so the row does not land under the header —
   * the same choice the assignments list made for the same reason.
   */
  const rowRef = useRef(null);
  useEffect(() => {
    if (focused && rowRef.current) {
      rowRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [focused]);

  const isReal = Boolean(book.title);
  // Surfaced read-only here so an empty slot doesn't look abandoned —
  // the actual yes/no lives in Parent Setup, since choosing the book is
  // the parent's call, not the student's.
  const suggestion = isReal ? null : nextRecommendationForBook(book);

  return (
    <div
      ref={rowRef}
      className={
        'rounded-lg border px-3 py-3 transition ' +
        (focused
          ? 'border-signal-cyan bg-signal-cyan/5 ring-2 ring-signal-cyan/40'
          : 'border-space-700 bg-space-900')
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-ink-600/40 bg-ink-900/20 px-2 py-0.5 text-[10px] font-display uppercase tracking-widest text-ink-500">
              {book.type}
            </span>
            {book.blackExcellence && (
              <span className="rounded-full border border-signal-amber/40 bg-signal-amber/10 px-2 py-0.5 text-[10px] font-display uppercase tracking-widest text-signal-amber">
                Black Excellence
              </span>
            )}
            {book.favorite && (
              <span className="rounded-full border border-signal-amber/40 bg-signal-amber/10 px-2 py-0.5 text-[10px] font-display uppercase tracking-widest text-signal-amber">
                ★ Family favorite
              </span>
            )}
            {book.isCustom && (
              <span className="rounded-full border border-ink-600/40 bg-ink-900/20 px-2 py-0.5 text-[10px] font-display uppercase tracking-widest text-ink-500">
                Added
              </span>
            )}
            <span
              className={
                'rounded-full border px-2 py-0.5 text-[10px] font-display uppercase tracking-widest ' +
                statusBadgeClass(book.status)
              }
            >
              {BOOK_STATUS_LABELS[book.status] || book.status}
            </span>
          </div>
          {isReal ? (
            <>
              <p className="mt-1.5 font-display font-700 text-ink-100">{book.title}</p>
              {book.author && <p className="text-xs text-ink-500">{book.author}</p>}
            </>
          ) : (
            <>
              <p className="mt-1.5 text-sm text-ink-500">{book.note}</p>
              {suggestion && (
                <p className="mt-1 text-xs text-signal-cyan">
                  Suggested: {suggestion.title} — waiting for approval in Parent Setup
                </p>
              )}
            </>
          )}
        </div>

        {isReal && (
          <div className="flex flex-none flex-wrap gap-1">
            {NEXT_STATUS_ACTIONS.map((action) => (
              <button
                key={action.status}
                type="button"
                onClick={() => onSetStatus(book.id, action.status)}
                aria-pressed={book.status === action.status}
                className={
                  'rounded-md px-2.5 py-1 text-xs font-display font-600 transition-colors ' +
                  (book.status === action.status
                    ? 'bg-signal-cyan/15 text-signal-cyan'
                    : 'text-ink-500 hover:text-ink-100')
                }
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {isReal && book.note && <p className="mt-2 text-xs text-ink-600">{book.note}</p>}

      {isReal && <WhyThisBook book={book} />}

      {isReal && book.status !== 'completed' && (
        <ReadingPace book={book} onRecordProgress={onRecordProgress} />
      )}

      {isReal && (
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => onToggleFavorite(book.id)}
            aria-pressed={Boolean(book.favorite)}
            className={
              'text-xs font-display font-600 transition-colors ' +
              (book.favorite ? 'text-signal-amber' : 'text-ink-600 hover:text-ink-300')
            }
          >
            {book.favorite ? '★ Family favorite' : '☆ Mark as family favorite'}
          </button>

          {/* Rating only once he's finished it — rating a book you
              haven't read is meaningless, and asking mid-book invites
              a guess. */}
          {book.status === 'completed' && <BookRating book={book} onRate={onRate} />}
        </div>
      )}

      {logEntries.length > 0 && (
        <div className="mt-2 border-t border-space-700 pt-2">
          <p className="text-[10px] font-display uppercase tracking-widest text-ink-600">
            Reading Log — {logEntries.length} {logEntries.length === 1 ? 'session' : 'sessions'}
          </p>
          <div className="mt-1 space-y-0.5">
            {logEntries.map((entry) => (
              <p key={entry.id} className="text-xs text-ink-500">
                {entry.date} · {entry.amount} {entry.unit}
                {entry.notes ? ` · ${entry.notes}` : ''}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
