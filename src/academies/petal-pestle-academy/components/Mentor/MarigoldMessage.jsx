import { useState } from 'react';
import { MarigoldAvatar } from './MarigoldAvatar.jsx';
import { MARIGOLD } from '../../lib/marigold.js';
import { speechSupported, speakChunks, stopSpeaking } from '../../lib/speech.js';

/**
 * Dr. Marigold, saying one thing.
 *
 * She appears in a fixed spot on each screen and says ONE thing. Her brother's
 * app learned this the hard way: a mentor who talks on every screen, at length,
 * becomes furniture a child scrolls past within a week. One short, specific,
 * true sentence keeps her worth reading.
 *
 * She is never on the question screen during the Check-In. A mentor watching
 * over a child's shoulder mid-assessment adds pressure to the one activity that
 * has to feel safe.
 */
export function MarigoldMessage({ text, tone = 'good', size = 'base', showName = true, quote = null }) {
  const [speaking, setSpeaking] = useState(false);

  const toneCls =
    tone === 'start'
      ? 'border-blush-500 bg-blush-300/25'
      : tone === 'done'
        ? 'border-gold-500 bg-gold-300/25'
        : 'border-cream-300 bg-cream-100';

  function toggleSpeak() {
    if (speaking) {
      stopSpeaking();
      setSpeaking(false);
      return;
    }
    const parts = [text];
    if (quote) parts.push(quote.text + (quote.who ? `, said ${quote.who}` : ''));
    if (speakChunks(parts, { onEnd: () => setSpeaking(false) })) setSpeaking(true);
  }

  return (
    <div className={`flex items-start gap-3 rounded-petal border-2 px-4 py-3.5 shadow-petal ${toneCls}`}>
      <MarigoldAvatar size={size === 'sm' ? 48 : 64} className="flex-none" />
      <div className="min-w-0 flex-1">
        {showName && (
          <p className="text-[0.68rem] font-700 uppercase tracking-[0.14em] text-ink-500">
            {MARIGOLD.name} · {MARIGOLD.title}
          </p>
        )}
        <p className={`${showName ? 'mt-1' : ''} text-sm leading-relaxed text-ink-900`}>{text}</p>
        {quote && (
          <p className="mt-2 border-l-2 border-gold-500 pl-3 text-xs italic leading-relaxed text-ink-700">
            “{quote.text}”
            {quote.who && <span className="not-italic text-ink-500"> — {quote.who}</span>}
          </p>
        )}
      </div>
      {speechSupported() && (
        <button
          type="button"
          onClick={toggleSpeak}
          aria-label={speaking ? 'Stop reading' : 'Read this to me'}
          className="flex-none rounded-full border border-cream-300 bg-white px-2.5 py-1 text-xs hover:border-lavender-500"
        >
          {speaking ? '⏹' : '🔊'}
        </button>
      )}
    </div>
  );
}
