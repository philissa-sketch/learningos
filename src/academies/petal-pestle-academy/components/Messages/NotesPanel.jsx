import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { senderById } from '../../config/senders.js';

// ---------------------------------------------------------------------------
// NOTES FROM GIGI AND MOM.
//
// This lives on her Home screen rather than behind a tab of its own,
// deliberately. A message she has to go and look for is a message she reads
// once and then forgets exists; a message sitting on the first screen she opens
// is one she reads every time. Her brother's app puts them front and centre for
// the same reason, and it is reportedly the most-used thing in it.
//
// ---- WHY NOTHING HERE IS AUTOMATIC ----
//
// The app does not generate encouragement. Every word in this panel was typed
// by an actual person who knows her. A "Great job!" produced by software is
// worth nothing the moment a child works out where it came from, and children
// work that out fast. Dr. Marigold has her own separate voice and never
// pretends to be family.
//
// ---- READ STATE IS NOT A RECEIPT ----
//
// Opening a note marks it read so the unread badge means something. That is all
// it does. The grown-up's side shows "she has read this" and nothing more —
// no timestamps of when, no "seen 4 times". A child's attention is not a
// metric to report on.
// ---------------------------------------------------------------------------

function timeAgo(iso) {
  const then = new Date(iso).getTime();
  if (!Number.isFinite(then)) return '';
  const mins = Math.max(0, Math.round((Date.now() - then) / 60000));
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return hours === 1 ? 'an hour ago' : `${hours} hours ago`;
  const days = Math.round(hours / 24);
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days} days ago`;
  try {
    return new Date(iso).toLocaleDateString(undefined, { month: 'long', day: 'numeric' });
  } catch {
    return '';
  }
}

function Note({ message, onOpen }) {
  const sender = senderById(message.from);
  const unread = !message.readAt;

  return (
    <button
      type="button"
      onClick={() => onOpen(message)}
      className={`w-full rounded-petal border-2 px-4 py-3 text-left transition ${
        unread ? `${sender.ring} ${sender.wash} shadow-lift` : 'border-cream-300 bg-white'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="font-display text-sm text-ink-900">
          <span aria-hidden="true" className="mr-1">
            {sender.icon}
          </span>
          From {sender.name}
        </p>
        <span className="flex items-center gap-2">
          {unread && (
            <span className={`rounded-full ${sender.pill} px-2 py-0.5 text-[0.65rem] font-700 text-white`}>
              new
            </span>
          )}
          <span className="text-[0.7rem] text-ink-500">{timeAgo(message.at)}</span>
        </span>
      </div>
      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-700">
        {message.sticker ? `${message.sticker} ` : ''}
        {message.text}
      </p>
    </button>
  );
}

export function NotesPanel({ limit = 3 }) {
  const messages = useAppStore((s) => s.messagesNewestFirst());
  const unreadCount = useAppStore((s) => s.unreadMessages().length);
  const markRead = useAppStore((s) => s.markMessageRead);
  const [open, setOpen] = useState(null);
  const [showAll, setShowAll] = useState(false);

  if (messages.length === 0) return null;

  const shown = showAll ? messages : messages.slice(0, limit);

  function openNote(m) {
    setOpen(m);
    markRead(m.messageId);
  }

  return (
    <section className="panel px-5 py-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-display text-lg text-ink-900">
          Notes for you
          {unreadCount > 0 && (
            <span className="ml-2 rounded-full bg-blush-500 px-2.5 py-0.5 align-middle text-xs font-700 text-white">
              {unreadCount} new
            </span>
          )}
        </h2>
        {messages.length > limit && (
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="text-xs font-700 text-lavender-700 hover:underline"
          >
            {showAll ? 'Show fewer' : `See all ${messages.length}`}
          </button>
        )}
      </div>

      <div className="mt-3 space-y-2">
        {shown.map((m) => (
          <Note key={m.messageId} message={m} onOpen={openNote} />
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 px-4"
          onClick={() => setOpen(null)}
        >
          <div
            className="w-full max-w-md rounded-petal bg-white px-6 py-6 shadow-lift"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="label-caps">{senderById(open.from).name} wrote</p>
            {open.sticker && <p className="mt-2 text-center text-5xl">{open.sticker}</p>}
            <p className="mt-3 whitespace-pre-wrap font-body text-base leading-relaxed text-ink-900">
              {open.text}
            </p>
            <p className="mt-3 text-xs text-ink-500">{timeAgo(open.at)}</p>
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="rounded-full bg-blush-500 px-6 py-2.5 text-sm font-700 text-white hover:bg-blush-700"
              >
                Thank you 🫶
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
