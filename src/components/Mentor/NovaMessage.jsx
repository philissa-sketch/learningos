import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { NovaAvatar } from './NovaAvatar.jsx';
import { NOVA_NAME } from '../../lib/novaVoice.js';
import {
  cancelSpeech,
  getVoiceSettings,
  isSpeechSupported,
  onVoiceSettingsChange,
  packById,
  shouldAutoSpeak,
  speak
} from '../../lib/speech.js';
import { playChirp, unlockAudio } from '../../lib/sfx.js';

/**
 * tone: 'brief' | 'mastery' | 'review' | 'hint' — only affects the accent
 * color, so Nova's voice reads consistently everywhere he appears.
 */
const TONE_STYLES = {
  brief: 'border-signal-cyan/40 bg-signal-cyan/5',
  mastery: 'border-signal-green/40 bg-signal-green/5',
  review: 'border-signal-amber/40 bg-signal-amber/5',
  hint: 'border-signal-amber/30 bg-space-900'
};

/**
 * Pull plain text out of whatever was passed as children.
 *
 * Nova's callers pass React nodes, not strings — sometimes a bare string,
 * sometimes a fragment with <strong> inside. The speech engine needs one flat
 * string, and asking every caller to pass its text twice would guarantee the
 * two drift apart. Walking the tree keeps a single source of truth.
 *
 * Callers CAN pass an explicit `speak` prop when the spoken form should differ
 * from the written one (a formula that reads badly out loud, for instance).
 *
 * Siblings are concatenated with NO separator, because that is what React
 * actually renders: `You earned <strong>40</strong> coins` puts the spacing in
 * the surrounding strings, and inserting our own would make Nova say
 * "You earned  40  coins". Whitespace is normalized once at the top by the
 * caller rather than at every level of the recursion, where it would destroy
 * spaces that belong there.
 */
function extractText(node) {
  if (node == null || node === false || node === true) return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (typeof node === 'object' && node.props) return extractText(node.props.children);
  return '';
}

export function NovaMessage({ children, tone = 'brief', label, speak: speakText }) {
  const [speaking, setSpeaking] = useState(false);
  const [settings, setSettings] = useState(() => getVoiceSettings());
  const supported = isSpeechSupported();
  // Tracks the text of the line we last auto-spoke, so a re-render for any
  // other reason does not make Nova repeat himself.
  const autoSpokenFor = useRef(null);

  const text = useMemo(() => {
    const raw = typeof speakText === 'string' ? speakText : extractText(children);
    return raw.replace(/\s+/g, ' ').trim();
  }, [speakText, children]);

  useEffect(() => onVoiceSettingsChange(setSettings), []);

  const say = useCallback(
    (force) => {
      if (!text) return;
      const pack = packById(settings.packId);
      const withChirp = Boolean(pack.chirp);
      if (withChirp) playChirp();
      const ok = speak(text, {
        force,
        onStart: () => setSpeaking(true),
        onEnd: () => {
          setSpeaking(false);
          if (withChirp) playChirp();
        }
      });
      if (ok) setSpeaking(true);
    },
    [text, settings.packId]
  );

  // Nova speaks on his own ONLY at the moments worth interrupting for — see
  // shouldAutoSpeak() in speech.js. Everything else waits for the button.
  useEffect(() => {
    if (!text || autoSpokenFor.current === text) return;
    if (!shouldAutoSpeak(tone)) return;
    autoSpokenFor.current = text;
    say(false);
  }, [text, tone, say]);

  // Leaving the screen must stop him mid-sentence. Without this he keeps
  // talking over the next view, which is the fastest way to get muted.
  useEffect(() => () => cancelSpeech(), []);

  const handleClick = () => {
    // This button is almost always the first real user gesture in a session,
    // which is exactly what browsers require before any audio may play. Waking
    // the audio engine here means the first coin chime later actually sounds.
    unlockAudio();
    if (speaking) {
      cancelSpeech();
      setSpeaking(false);
      return;
    }
    say(true); // an explicit tap overrides the auto-speak rules
  };

  return (
    <div className={'flex gap-3 rounded-xl border p-4 shadow-panel ' + (TONE_STYLES[tone] || TONE_STYLES.brief)}>
      <NovaAvatar size={48} className="flex-none" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-display uppercase tracking-widest text-ink-500">{label || NOVA_NAME}</p>
          {supported && text ? (
            <button
              type="button"
              onClick={handleClick}
              aria-label={speaking ? 'Stop Commander Nova' : 'Hear Commander Nova'}
              title={speaking ? 'Stop' : 'Hear this'}
              className={
                'flex-none rounded-md border px-2 py-0.5 text-xs transition ' +
                (speaking
                  ? 'border-signal-cyan/60 bg-signal-cyan/15 text-signal-cyan'
                  : 'border-space-600 text-ink-500 hover:border-signal-cyan hover:text-signal-cyan')
              }
            >
              {speaking ? '■' : '🔊'}
            </button>
          ) : null}
        </div>
        <div className="mt-1 text-sm leading-relaxed text-ink-100">{children}</div>
      </div>
    </div>
  );
}
