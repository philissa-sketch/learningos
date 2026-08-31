import { useAppStore } from '../../store/useAppStore.js';
import {
  candidatesForBook,
  nextRecommendationForBook
} from '../../academies/lamar/data/academicSuccessCenter/bookRecommendations.js';

/**
 * A real book, suggested for an empty slot, awaiting a yes or no.
 *
 * This is Part 9's "Parent Approval Workflow" at the scale it actually
 * matters: the parent's words were "I thought the books were to be
 * assigned per subject and I will just agree or disagree with the book."
 * So the job here is two buttons, not a form.
 *
 * Every title shown is a real book verified against publisher and
 * library sources (see bookRecommendations.js) — this app never invents
 * a title, and suggesting a researched real one is a different thing
 * entirely from making one up.
 *
 * `heads_up` is shown prominently rather than buried. Several of these
 * books contain war, refugee violence, or a character's death, and a
 * parent approving a book for a 12-year-old should see that at the
 * moment she decides, not discover it in chapter four.
 */
export function PendingBookSuggestion({ book }) {
  const approveBookRecommendation = useAppStore((s) => s.approveBookRecommendation);
  const rejectBookRecommendation = useAppStore((s) => s.rejectBookRecommendation);
  const resetBookRecommendations = useAppStore((s) => s.resetBookRecommendations);

  const suggestion = nextRecommendationForBook(book);
  const all = candidatesForBook(book);
  const rejectedCount = (book.rejectedRecommendationIds || []).length;

  // Nothing left to suggest, but she turned some down — offer the way back.
  if (!suggestion) {
    if (rejectedCount === 0) return null;
    return (
      <div className="mb-2 rounded-lg border border-space-700 bg-space-900 px-3 py-2">
        <p className="text-xs text-ink-500">
          You've passed on {rejectedCount === all.length ? 'all' : rejectedCount} of the{' '}
          {all.length} suggestions for this slot. Enter your own book below, or{' '}
          <button
            type="button"
            onClick={() => resetBookRecommendations(book.id)}
            className="text-signal-cyan underline hover:brightness-110"
          >
            see them again
          </button>
          .
        </p>
      </div>
    );
  }

  const remaining = all.length - rejectedCount;

  return (
    <div className="mb-2 rounded-lg border border-signal-cyan/40 bg-signal-cyan/5 px-3 py-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[10px] font-display uppercase tracking-widest text-signal-cyan">
          Suggested for this slot
        </p>
        <p className="text-[10px] font-display uppercase tracking-widest text-ink-600">
          {remaining} option{remaining === 1 ? '' : 's'} left
        </p>
      </div>

      <p className="mt-1.5 font-display text-base font-700 text-ink-100">{suggestion.title}</p>
      <p className="text-xs text-ink-500">
        {suggestion.author} · {suggestion.publisher}, {suggestion.year} · {suggestion.level}
      </p>

      <p className="mt-2 text-sm text-ink-300">{suggestion.about}</p>
      <p className="mt-1 text-xs text-ink-500">
        <span className="font-display uppercase tracking-widest text-ink-600">Why this one — </span>
        {suggestion.why}
      </p>

      {suggestion.heads_up && (
        <p className="mt-2 rounded-lg border border-signal-amber/40 bg-signal-amber/10 px-2.5 py-1.5 text-xs text-signal-amber">
          <span className="font-display uppercase tracking-widest">Heads up — </span>
          {suggestion.heads_up}
        </p>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => approveBookRecommendation(book.id, suggestion)}
          className="rounded-lg bg-signal-cyan px-3 py-1.5 text-xs font-display font-700 text-space-950 transition hover:brightness-110"
        >
          Use this book
        </button>
        <button
          type="button"
          onClick={() => rejectBookRecommendation(book.id, suggestion.id)}
          className="rounded-lg border border-space-600 px-3 py-1.5 text-xs font-display font-600 text-ink-300 transition hover:text-ink-100"
        >
          {remaining > 1 ? 'Not this one — show another' : 'Not this one'}
        </button>
        {suggestion.source && (
          <a
            href={suggestion.source}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-ink-500 underline hover:text-ink-100"
          >
            Look it up
          </a>
        )}
      </div>
    </div>
  );
}

/**
 * Count of slots still waiting on a yes/no, for the banner at the top of
 * Parent Setup. Pure — takes the reactive array rather than reading the
 * store, so it can't go stale.
 */
export function countPendingSuggestions(academicBooks) {
  return academicBooks.filter((b) => nextRecommendationForBook(b)).length;
}
