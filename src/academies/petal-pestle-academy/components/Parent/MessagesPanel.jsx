import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { SENDERS, STICKERS, senderById } from '../../config/senders.js';

// ---------------------------------------------------------------------------
// WRITING TO HER — the grown-up's side.
//
// Two senders, chosen per note. Both of you write from this same screen on this
// same laptop, so "who is writing" is a choice you make each time rather than a
// mode left switched on. Without that, every note her mother writes arrives
// signed Gigi.
//
// ---- WHY THE BOX IS SMALL AND THE STICKERS ARE ONE TAP ----
//
// The feature that gets used is the one that takes ten seconds. A note that
// requires composing a paragraph gets written on the first Monday and never
// again. One line and a flower, sent on the way past the kitchen table, is the
// realistic version — and it is the one she will actually find waiting for her.
// ---------------------------------------------------------------------------

function whenText(iso) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  } catch {
    return String(iso).slice(0, 16);
  }
}

export function MessagesPanel() {
  const send = useAppStore((s) => s.sendMessage);
  const remove = useAppStore((s) => s.removeMessage);
  const messages = useAppStore((s) => s.messagesNewestFirst());

  const [from, setFrom] = useState('gigi');
  const [text, setText] = useState('');
  const [sticker, setSticker] = useState('');
  const [sent, setSent] = useState(false);

  async function submit() {
    if (!text.trim()) return;
    await send({ from, text, sticker });
    setText('');
    setSticker('');
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  }

  return (
    <div className="space-y-5">
      <section className="panel px-5 py-5">
        <h2 className="font-display text-lg text-ink-900">Write her a note</h2>
        <p className="mt-1 text-xs text-ink-700">
          It appears on her Home screen the next time she opens the app. Nothing here is generated —
          she only ever reads words one of you typed.
        </p>

        <div className="mt-4">
          <p className="label-caps">This one is from</p>
          <div className="mt-2 flex gap-2">
            {SENDERS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setFrom(s.id)}
                className={`rounded-full px-5 py-2 text-sm font-700 ${
                  from === s.id
                    ? `${s.pill} text-white shadow-lift`
                    : 'border border-cream-300 bg-white text-ink-700'
                }`}
              >
                <span aria-hidden="true" className="mr-1.5">
                  {s.icon}
                </span>
                {s.name}
              </button>
            ))}
          </div>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          placeholder="Proud of you for sticking with the fractions today."
          className="mt-4 w-full rounded-petal border border-cream-300 bg-white px-4 py-3 font-body text-sm leading-relaxed text-ink-900 outline-none focus:border-lavender-500"
        />

        <div className="mt-3">
          <p className="label-caps">Add a picture (optional)</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {STICKERS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSticker(sticker === s ? '' : s)}
                className={`h-10 w-10 rounded-full text-xl ${
                  sticker === s ? 'bg-lavender-300 ring-2 ring-lavender-500' : 'bg-cream-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end gap-3">
          {sent && <span className="text-xs font-700 text-sage-700">Sent — it is waiting for her ✓</span>}
          <button
            type="button"
            onClick={submit}
            disabled={!text.trim()}
            className="rounded-full bg-blush-500 px-6 py-2.5 text-sm font-700 text-white hover:bg-blush-700 disabled:opacity-40"
          >
            Send it
          </button>
        </div>
      </section>

      <section className="panel px-5 py-5">
        <h2 className="font-display text-lg text-ink-900">Notes already sent</h2>
        {messages.length === 0 ? (
          <p className="mt-3 text-sm text-ink-500">Nothing sent yet.</p>
        ) : (
          <div className="mt-3 space-y-2">
            {messages.map((m) => {
              const s = senderById(m.from);
              return (
                <div
                  key={m.messageId}
                  className="rounded-petal border border-cream-300 bg-white px-4 py-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs font-700 text-ink-700">
                      {s.icon} {s.name}
                      <span className="ml-2 font-400 text-ink-500">{whenText(m.at)}</span>
                    </p>
                    <span className="flex items-center gap-3">
                      <span
                        className={`text-[0.7rem] font-700 ${
                          m.readAt ? 'text-sage-700' : 'text-ink-500'
                        }`}
                      >
                        {m.readAt ? 'she has read this' : 'not opened yet'}
                      </span>
                      <button
                        type="button"
                        onClick={() => remove(m.messageId)}
                        className="text-[0.7rem] text-ink-500 hover:text-clay-500 hover:underline"
                      >
                        Delete
                      </button>
                    </span>
                  </div>
                  <p className="mt-1.5 whitespace-pre-wrap text-sm text-ink-900">
                    {m.sticker ? `${m.sticker} ` : ''}
                    {m.text}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
