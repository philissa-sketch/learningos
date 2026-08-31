import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import {
  blackExcellenceBooksForSubject,
  blackAmericanAuthorsForSubject,
  BLACK_EXCELLENCE_KNOWN_GAPS
} from '../../academies/lamar/data/academicSuccessCenter/blackExcellenceLibrary.js';
import { subjectHeading } from './academicUi.js';

/**
 * Black American Excellence Library shelf (PROJECT_PLAN.md Part 9).
 *
 * Shown inside a subject's Book Library. Every title is a real,
 * verified book — see blackExcellenceLibrary.js's header for how each
 * was checked. Nothing here is auto-assigned: these are candidates the
 * parent adds with one tap, which is Part 9's approval workflow at the
 * scale that actually makes sense for a curated list.
 *
 * A book already in the subject's library shows as "In library" rather
 * than offering a second copy.
 *
 * CHANGED Aug 6, 2026, when the Social Studies expansion took that
 * subject from 4 titles to 16. Three things the old flat list could not
 * do at that size:
 *
 *  1. GROUPED BY FIELD. Sixteen cards in one undifferentiated column is
 *     a wall, not a shelf. Grouping is derived from each book's existing
 *     `field`, so it needs no new data and no per-subject configuration.
 *  2. CONTENT WARNINGS SURFACED. Several of the new titles cover a
 *     massacre, lynching, and enslavement in detail. `heads_up` already
 *     existed on the data but was never rendered here — so the parent
 *     could add a book about the Tulsa massacre for a 12-year-old with
 *     nothing on screen telling her. That was the real bug.
 *  3. AUTHOR ROSTER. Part 4 asked for a Black American author list for
 *     Social Studies. It renders from `blackAmericanAuthorsForSubject`,
 *     which derives it from these same books, so it cannot drift.
 */
export function BlackExcellenceShelf({ subject, academicBooks }) {
  const addRecommendedBook = useAppStore((s) => s.addRecommendedBook);
  const [open, setOpen] = useState(false);
  const [authorsOpen, setAuthorsOpen] = useState(false);

  const recommendations = blackExcellenceBooksForSubject(subject);
  if (recommendations.length === 0) return null;

  const titlesInLibrary = new Set(
    academicBooks
      .filter((b) => b.subject === subject && b.title)
      .map((b) => b.title.trim().toLowerCase())
  );
  const addedCount = recommendations.filter((r) => titlesInLibrary.has(r.title.trim().toLowerCase())).length;
  const gap = BLACK_EXCELLENCE_KNOWN_GAPS.find((g) => g.subject === subject);
  const authors = blackAmericanAuthorsForSubject(subject);

  // Group by `field`, preserving the order fields first appear in the
  // data file — that order is already curated (genealogy before the
  // history surveys before civil rights), so it needs no second list.
  const groups = [];
  for (const book of recommendations) {
    let group = groups.find((g) => g.field === book.field);
    if (!group) {
      group = { field: book.field, books: [] };
      groups.push(group);
    }
    group.books.push(book);
  }

  return (
    <div className="mt-4 rounded-lg border border-signal-amber/30 bg-signal-amber/5 px-3 py-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 text-left"
      >
        <span>
          <span className="block text-[10px] font-display uppercase tracking-widest text-signal-amber">
            Black American Excellence Library
          </span>
          <span className="mt-0.5 block text-xs text-ink-300">
            {recommendations.length} real, verified {recommendations.length === 1 ? 'title' : 'titles'} for{' '}
            {subjectHeading(subject)}
            {addedCount > 0 ? ` · ${addedCount} already in the library` : ''}
          </span>
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 10 10"
          fill="none"
          aria-hidden="true"
          className={open ? 'flex-none rotate-180 transition-transform' : 'flex-none transition-transform'}
        >
          <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="mt-3 space-y-4">
          {authors.length > 0 && (
            <div className="rounded-lg border border-space-700 bg-space-900 px-3 py-2">
              <button
                type="button"
                onClick={() => setAuthorsOpen((v) => !v)}
                aria-expanded={authorsOpen}
                className="flex w-full items-center justify-between gap-2 text-left"
              >
                <span className="text-xs text-ink-300">
                  <span className="font-display uppercase tracking-widest text-ink-500">Authors · </span>
                  {authors.length} Black American {authors.length === 1 ? 'author' : 'authors'} on this shelf
                </span>
                <span className="flex-none text-xs text-ink-600">{authorsOpen ? 'Hide' : 'Show'}</span>
              </button>
              {authorsOpen && (
                <ul className="mt-2 space-y-1">
                  {authors.map((a) => (
                    <li key={a.author} className="text-xs text-ink-400">
                      <span className="text-ink-200">{a.author}</span>
                      {a.titles.length > 1 ? ` · ${a.titles.length} titles` : ''}
                      <span className="text-ink-600"> · {a.fields.join(', ')}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {groups.map((group) => (
            <div key={group.field} className="space-y-2">
              <p className="text-[10px] font-display uppercase tracking-widest text-ink-500">
                {group.field} · {group.books.length}
              </p>
              {group.books.map((book) => {
                const inLibrary = titlesInLibrary.has(book.title.trim().toLowerCase());
                return (
                  <div key={book.id} className="rounded-lg border border-space-700 bg-space-900 px-3 py-2">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-display font-700 text-ink-100">{book.title}</p>
                        <p className="text-xs text-ink-500">
                          {book.author} · {book.publisher}, {book.year} · {book.level}
                        </p>
                      </div>
                      {inLibrary ? (
                        <span className="flex-none rounded-full border border-signal-cyan/40 bg-signal-cyan/10 px-2 py-0.5 text-[10px] font-display uppercase tracking-widest text-signal-cyan">
                          In library
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => addRecommendedBook(subject, book)}
                          className="flex-none rounded-lg bg-signal-cyan px-3 py-1 text-xs font-display font-700 text-space-950 transition hover:brightness-110"
                        >
                          Add
                        </button>
                      )}
                    </div>
                    <p className="mt-1.5 text-xs text-ink-300">{book.about}</p>
                    <p className="mt-1 text-xs text-ink-600">Why this one: {book.why}</p>
                    {book.heads_up && (
                      <p className="mt-1.5 rounded-lg border border-signal-amber/40 bg-signal-amber/10 px-2 py-1 text-xs text-ink-200">
                        <span className="font-display uppercase tracking-widest text-signal-amber">Heads up — </span>
                        {book.heads_up}
                      </p>
                    )}
                    {book.source && (
                      <a
                        href={book.source}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 inline-block text-[10px] text-ink-600 underline decoration-dotted underline-offset-2 hover:text-ink-400"
                      >
                        Verified against this source
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          ))}

          {gap && (
            <p className="rounded-lg border border-space-700 bg-space-900 px-3 py-2 text-xs text-ink-500">
              <span className="font-display uppercase tracking-widest text-ink-600">Known gap — </span>
              {gap.note}
            </p>
          )}

          <p className="text-xs text-ink-600">
            Every title above was individually verified against publisher and library sources before it was added
            here — no book in this app is ever suggested from memory.
          </p>
        </div>
      )}
    </div>
  );
}
