import { useState, useEffect, useRef } from 'react';
import { useAppStore } from '../../store/useAppStore.js';

function formatStamp(iso) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}

/**
 * Mission Comms (Part 5) — student side of the two-way parent ⇄ student thread.
 * The student reads what the parent sent and can reply. Opening the view marks
 * every parent message read (clears the dashboard unread badge). Kept warm and
 * encouraging; this is a family channel, not graded work.
 */
export function MissionCommsHome({ onExit }) {
  const messages = useAppStore((s) => s.messages);
  const sendMessage = useAppStore((s) => s.sendMessage);
  const markMessagesRead = useAppStore((s) => s.markMessagesRead);

  const [draft, setDraft] = useState('');
  const endRef = useRef(null);

  // Mark parent messages read whenever the thread is open / changes.
  useEffect(() => {
    markMessagesRead('student');
  }, [markMessagesRead, messages.length]);

  // Keep the newest message in view.
  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'nearest' });
  }, [messages.length]);

  const send = async () => {
    if (!draft.trim()) return;
    await sendMessage({ sender: 'student', body: draft });
    setDraft('');
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="mx-auto flex max-w-3xl flex-col px-4 py-6 sm:px-6" style={{ minHeight: '70vh' }}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-display uppercase tracking-widest text-ink-500">Mission Comms</p>
          <h2 className="mt-1 font-display text-2xl font-700 text-ink-100">Messages with Mission Control</h2>
          <p className="mt-1 text-sm text-ink-300">Notes back and forth with your parent — questions, wins, and reminders.</p>
        </div>
        {onExit && (
          <button
            type="button"
            onClick={onExit}
            className="flex-none rounded-lg border border-space-600 px-3 py-1.5 text-xs font-display font-600 text-ink-300 hover:text-ink-100"
          >
            Back
          </button>
        )}
      </div>

      <div className="mt-5 flex-1 space-y-3 overflow-y-auto rounded-xl border border-space-700 bg-space-900 p-4">
        {messages.length === 0 ? (
          <p className="text-sm text-ink-500">No messages yet. Say hi to Mission Control below.</p>
        ) : (
          messages.map((m) => {
            const mine = m.sender === 'student';
            return (
              <div key={m.id} className={'flex ' + (mine ? 'justify-end' : 'justify-start')}>
                <div
                  className={
                    'max-w-[80%] rounded-2xl px-4 py-2 shadow-panel ' +
                    (mine
                      ? 'rounded-br-sm bg-signal-cyan/15 border border-signal-cyan/30'
                      : 'rounded-bl-sm bg-space-800 border border-space-700')
                  }
                >
                  <p className="text-[10px] font-display uppercase tracking-widest text-ink-500">
                    {mine ? 'You' : 'Mission Control'} · {formatStamp(m.createdAt)}
                  </p>
                  <p className="mt-1 whitespace-pre-wrap text-sm text-ink-100">{m.body}</p>
                </div>
              </div>
            );
          })
        )}
        <div ref={endRef} />
      </div>

      <div className="mt-3 flex items-end gap-2">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          rows={2}
          placeholder="Write a message… (Enter to send, Shift+Enter for a new line)"
          className="flex-1 rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100"
        />
        <button
          type="button"
          onClick={send}
          disabled={!draft.trim()}
          className="flex-none rounded-lg bg-signal-cyan px-4 py-2.5 text-sm font-display font-700 text-space-950 transition hover:brightness-110 disabled:opacity-40"
        >
          Send
        </button>
      </div>
    </div>
  );
}
