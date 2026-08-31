import { useEffect, useState } from 'react';
import {
  DEFAULT_PACK_ID,
  VOICE_PACKS,
  cancelSpeech,
  getVoiceSettings,
  isSpeechSupported,
  loadVoices,
  previewLine,
  setVoiceSettings,
  speak
} from '../../lib/speech.js';
import { getSfxSettings, playCoin, setSfxSettings, unlockAudio } from '../../lib/sfx.js';

/**
 * The STUDENT's own voice controls (Aug 8, 2026).
 *
 * WHY THIS EXISTS SEPARATELY FROM VoiceSettingsPanel: the full panel lives in
 * the Parent Dashboard, which is behind the passcode gate. The parent asked
 * the obvious question — "how will Lamar change the voice?" — and the honest
 * answer was that he couldn't. That matters more than it sounds, because voice
 * settings are stored PER MACHINE: he works on his own computer, so a choice
 * made on hers never reaches him. Without this he would be stuck with whatever
 * voice his browser defaults to, permanently.
 *
 * WHAT HE CONTROLS AND WHAT HE DOESN'T — a deliberate split:
 *
 *   - COMFORT is his. On/off, which installed voice, speed, volume, sounds.
 *     He has to be able to silence Nova on his own. A student who cannot mute
 *     a talking companion mutes the whole browser tab instead, and then the
 *     feature is gone for good and nobody knows why. Giving him the off switch
 *     is what keeps it switched on.
 *
 *   - STYLE is earned. The Deep Space / Mission Control / Ground Team packs
 *     show here as locked, because Part 10 sells them in the Marketplace. He
 *     can SEE them, which is the point — a locked thing he knows about is what
 *     makes the unlock worth spending on.
 *
 * The installed-voice list is read from the machine at runtime, so this works
 * unchanged on his computer, hers, or a replacement years from now.
 */
export function NovaVoiceQuickSettings({ onClose }) {
  const [voices, setVoices] = useState([]);
  const [settings, setLocal] = useState(() => getVoiceSettings());
  const [sfx, setSfxLocal] = useState(() => getSfxSettings());
  const supported = isSpeechSupported();

  useEffect(() => {
    let alive = true;
    loadVoices().then((list) => alive && setVoices(list));
    return () => {
      alive = false;
      cancelSpeech();
    };
  }, []);

  const update = (changes) => setLocal(setVoiceSettings(changes));
  const preview = (o = {}) => {
    unlockAudio();
    speak(previewLine(), { force: true, ...o });
  };

  return (
    <div className="mt-2 space-y-3 rounded-xl border border-space-700 bg-space-900 p-3 shadow-panel">
      <div className="flex items-center justify-between gap-2">
        <p className="font-display text-sm font-700 text-ink-100">How Nova Sounds</p>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-space-600 px-2 py-0.5 text-xs text-ink-500 transition hover:border-signal-cyan hover:text-signal-cyan"
          >
            Close
          </button>
        )}
      </div>

      {!supported ? (
        <p className="text-xs text-ink-500">
          This browser can&rsquo;t do voices. Everything else works — try Chrome or Edge.
        </p>
      ) : (
        <>
          <label className="flex items-center justify-between gap-3 rounded-lg border border-space-700 bg-space-800 px-3 py-2">
            <span className="text-sm text-ink-100">Nova talks out loud</span>
            <input
              type="checkbox"
              checked={Boolean(settings.enabled)}
              onChange={(e) => {
                unlockAudio();
                update({ enabled: e.target.checked });
                if (e.target.checked) preview();
              }}
              className="h-4 w-4 accent-cyan-400"
            />
          </label>

          {voices.length > 0 && (
            <div>
              <p className="text-[10px] font-display uppercase tracking-widest text-ink-500">His voice</p>
              <div className="mt-1 flex gap-2">
                <select
                  value={settings.voiceURI || ''}
                  onChange={(e) => {
                    update({ voiceURI: e.target.value });
                    preview();
                  }}
                  className="min-w-0 flex-1 rounded-md border border-space-600 bg-space-950 px-2 py-1.5 text-sm text-ink-100"
                >
                  <option value="">Default</option>
                  {voices.map((v) => (
                    <option key={v.voiceURI} value={v.voiceURI}>
                      {v.name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => preview()}
                  className="flex-none rounded-md border border-space-600 px-3 py-1.5 text-xs font-display font-700 text-ink-100 transition hover:border-signal-cyan"
                >
                  Try it
                </button>
              </div>
              <p className="mt-1 text-[10px] text-ink-500">
                These are the voices on this computer — pick whichever one sounds most like Nova to you.
              </p>
            </div>
          )}

          <div>
            <p className="text-[10px] font-display uppercase tracking-widest text-ink-500">Style</p>
            <div className="mt-1 grid grid-cols-2 gap-2">
              {VOICE_PACKS.map((p) => {
                const unlocked = Boolean(p.free);
                const active = (settings.packId || DEFAULT_PACK_ID) === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    disabled={!unlocked}
                    onClick={() => {
                      update({ packId: p.id });
                      preview({ packId: p.id });
                    }}
                    className={
                      'rounded-lg border p-2 text-left transition ' +
                      (!unlocked
                        ? 'cursor-not-allowed border-space-700 bg-space-950 opacity-60'
                        : active
                          ? 'border-signal-cyan/50 bg-signal-cyan/10'
                          : 'border-space-700 bg-space-800 hover:border-signal-cyan/40')
                    }
                  >
                    <p
                      className={
                        'font-display text-xs font-700 ' +
                        (!unlocked ? 'text-ink-500' : active ? 'text-signal-cyan' : 'text-ink-100')
                      }
                    >
                      {unlocked ? p.name : `🔒 ${p.name}`}
                    </p>
                    <p className="text-[10px] text-ink-500">{unlocked ? p.desc : 'Unlock in the Marketplace'}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="text-[10px] font-display uppercase tracking-widest text-ink-500">
                Speed · {Number(settings.rate ?? 1).toFixed(2)}&times;
              </span>
              <input
                type="range"
                min="0.6"
                max="1.4"
                step="0.05"
                value={settings.rate ?? 1}
                onChange={(e) => update({ rate: Number(e.target.value) })}
                onMouseUp={() => preview()}
                onTouchEnd={() => preview()}
                className="mt-1 w-full accent-cyan-400"
              />
            </label>
            <label className="block">
              <span className="text-[10px] font-display uppercase tracking-widest text-ink-500">
                Volume · {Math.round((settings.volume ?? 1) * 100)}%
              </span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.volume ?? 1}
                onChange={(e) => update({ volume: Number(e.target.value) })}
                onMouseUp={() => preview()}
                onTouchEnd={() => preview()}
                className="mt-1 w-full accent-cyan-400"
              />
            </label>
          </div>
        </>
      )}

      <label className="flex items-center justify-between gap-3 rounded-lg border border-space-700 bg-space-800 px-3 py-2">
        <span className="text-sm text-ink-100">Mission sounds</span>
        <input
          type="checkbox"
          checked={Boolean(sfx.enabled)}
          onChange={(e) => {
            unlockAudio();
            setSfxLocal(setSfxSettings({ enabled: e.target.checked }));
            if (e.target.checked) playCoin();
          }}
          className="h-4 w-4 accent-cyan-400"
        />
      </label>

      <p className="text-[10px] text-ink-500">Saved on this computer, so this is your setup — it won&rsquo;t change anyone else&rsquo;s.</p>
    </div>
  );
}
