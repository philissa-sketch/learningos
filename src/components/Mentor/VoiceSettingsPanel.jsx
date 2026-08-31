import { useEffect, useState } from 'react';
import {
  DEFAULT_PACK_ID,
  VOICE_PACKS,
  getVoiceSettings,
  isSpeechSupported,
  loadVoices,
  previewLine,
  setVoiceSettings,
  speak,
  cancelSpeech
} from '../../lib/speech.js';
import {
  getSfxSettings,
  isAudioSupported,
  playCoin,
  playRankUp,
  setSfxSettings,
  unlockAudio
} from '../../lib/sfx.js';

/**
 * Commander Nova's voice + sound controls (Release A, Aug 8, 2026).
 *
 * DELIBERATELY SELF-CONTAINED. It reads and writes localStorage through
 * speech.js / sfx.js and touches neither the store nor the database, so it can
 * be dropped into the Parent Dashboard — or anywhere else — with a single
 * import line and no wiring. It was built this way on purpose: the Dashboard
 * was being edited in a parallel session for the guitar build, and a
 * self-contained panel is a one-line merge instead of a conflict.
 *
 * WHY THE VOICE LIST IS BUILT AT RUNTIME RATHER THAN HARD-CODED: the installed
 * voices are a property of the computer. This app runs on the parent's machine
 * and on Lamar's, and may run on a replacement machine years from now. Listing
 * whatever is actually installed, and letting the voice be chosen by ear, is
 * what makes the feature survive a change of hardware. Expect the two machines
 * to offer different lists — that is normal, and each keeps its own choice.
 */
export function VoiceSettingsPanel() {
  const [voices, setVoices] = useState([]);
  const [settings, setLocal] = useState(() => getVoiceSettings());
  const [sfx, setSfxLocal] = useState(() => getSfxSettings());
  const [loading, setLoading] = useState(true);
  const speechOk = isSpeechSupported();
  const audioOk = isAudioSupported();

  useEffect(() => {
    let alive = true;
    // getVoices() is very often empty on the first call in Chrome; the real
    // list arrives later on 'voiceschanged'. loadVoices waits for it, with a
    // timeout so a machine that never fires the event still resolves.
    loadVoices().then((list) => {
      if (!alive) return;
      setVoices(list);
      setLoading(false);
    });
    return () => {
      alive = false;
      cancelSpeech();
    };
  }, []);

  const update = (changes) => setLocal(setVoiceSettings(changes));
  const updateSfx = (changes) => setSfxLocal(setSfxSettings(changes));

  const preview = (overrides = {}) => {
    unlockAudio();
    speak(previewLine(), { force: true, ...overrides });
  };

  return (
    <div className="space-y-4 rounded-xl border border-space-700 bg-space-900 p-4 shadow-panel">
      <div>
        <p className="font-display text-sm font-700 text-ink-100">Commander Nova&rsquo;s Voice</p>
        <p className="mt-0.5 text-[11px] text-ink-500">
          Nova can read his briefings, hints and celebrations out loud. The voices listed here are the ones
          installed on <em>this</em> computer, so pick one by ear. Lamar&rsquo;s computer will show its own list
          and keeps its own choice.
        </p>
      </div>

      {!speechOk ? (
        <p className="rounded-lg border border-signal-amber/40 bg-signal-amber/10 px-3 py-2 text-xs text-ink-300">
          This browser doesn&rsquo;t support speech. Everything else works normally — try Chrome or Edge.
        </p>
      ) : (
        <>
          <label className="flex items-center justify-between gap-3 rounded-lg border border-space-700 bg-space-800 px-3 py-2">
            <span className="text-sm text-ink-100">Nova speaks out loud</span>
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

          <div>
            <p className="text-[10px] font-display uppercase tracking-widest text-ink-500">Voice</p>
            {loading ? (
              <p className="mt-1 text-xs text-ink-500">Looking for installed voices&hellip;</p>
            ) : voices.length === 0 ? (
              <p className="mt-1 text-xs text-ink-500">
                No voices found on this computer. Windows can add more under Settings &rsaquo; Time &amp; language
                &rsaquo; Speech.
              </p>
            ) : (
              <div className="mt-1 flex gap-2">
                <select
                  value={settings.voiceURI || ''}
                  onChange={(e) => {
                    update({ voiceURI: e.target.value });
                    preview();
                  }}
                  className="min-w-0 flex-1 rounded-md border border-space-600 bg-space-950 px-2 py-1.5 text-sm text-ink-100"
                >
                  <option value="">Browser default</option>
                  {voices.map((v) => (
                    <option key={v.voiceURI} value={v.voiceURI}>
                      {v.name} {v.lang ? `(${v.lang})` : ''}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => preview()}
                  className="flex-none rounded-md border border-space-600 px-3 py-1.5 text-xs font-display font-700 text-ink-100 transition hover:border-signal-cyan"
                >
                  Preview
                </button>
              </div>
            )}
          </div>

          <div>
            <p className="text-[10px] font-display uppercase tracking-widest text-ink-500">Style</p>
            <div className="mt-1 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {VOICE_PACKS.map((p) => {
                const active = (settings.packId || DEFAULT_PACK_ID) === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      update({ packId: p.id });
                      preview({ packId: p.id });
                    }}
                    className={
                      'rounded-lg border p-2 text-left transition ' +
                      (active
                        ? 'border-signal-cyan/50 bg-signal-cyan/10'
                        : 'border-space-700 bg-space-800 hover:border-signal-cyan/40')
                    }
                  >
                    <p className={'font-display text-xs font-700 ' + (active ? 'text-signal-cyan' : 'text-ink-100')}>
                      {p.name}
                    </p>
                    <p className="text-[10px] text-ink-500">{p.desc}</p>
                  </button>
                );
              })}
            </div>
            <p className="mt-1 text-[10px] text-ink-500">
              These are speed and pitch presets, not different actors — but they sound clearly different.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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

          <label className="flex items-center justify-between gap-3 rounded-lg border border-space-700 bg-space-800 px-3 py-2">
            <span className="min-w-0 text-sm text-ink-100">
              Speak celebrations automatically
              <span className="block text-[10px] text-ink-500">
                Mastery and rank-ups only. Briefings and hints always wait for the 🔊 button.
              </span>
            </span>
            <input
              type="checkbox"
              checked={Boolean(settings.autoSpeak)}
              onChange={(e) => update({ autoSpeak: e.target.checked })}
              className="h-4 w-4 flex-none accent-cyan-400"
            />
          </label>
        </>
      )}

      {audioOk && (
        <div className="border-t border-space-700 pt-4">
          <p className="font-display text-sm font-700 text-ink-100">Mission Sounds</p>
          <p className="mt-0.5 text-[11px] text-ink-500">
            Short chimes for coins, mastery and rank-ups. Generated by the app — no downloads, and they sound
            the same on any computer.
          </p>

          <label className="mt-2 flex items-center justify-between gap-3 rounded-lg border border-space-700 bg-space-800 px-3 py-2">
            <span className="text-sm text-ink-100">Sound effects on</span>
            <input
              type="checkbox"
              checked={Boolean(sfx.enabled)}
              onChange={(e) => {
                unlockAudio();
                updateSfx({ enabled: e.target.checked });
                if (e.target.checked) playCoin();
              }}
              className="h-4 w-4 accent-cyan-400"
            />
          </label>

          <label className="mt-2 block">
            <span className="text-[10px] font-display uppercase tracking-widest text-ink-500">
              Sound volume · {Math.round((sfx.volume ?? 1) * 100)}%
            </span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={sfx.volume ?? 1}
              onChange={(e) => updateSfx({ volume: Number(e.target.value) })}
              onMouseUp={() => {
                unlockAudio();
                playCoin();
              }}
              onTouchEnd={() => {
                unlockAudio();
                playCoin();
              }}
              className="mt-1 w-full accent-cyan-400"
            />
          </label>

          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                unlockAudio();
                playCoin();
              }}
              className="rounded-md border border-space-600 px-3 py-1 text-xs font-display font-700 text-ink-100 transition hover:border-signal-cyan"
            >
              Hear a coin
            </button>
            <button
              type="button"
              onClick={() => {
                unlockAudio();
                playRankUp();
              }}
              className="rounded-md border border-space-600 px-3 py-1 text-xs font-display font-700 text-ink-100 transition hover:border-signal-cyan"
            >
              Hear a rank-up
            </button>
          </div>
        </div>
      )}

      <p className="text-[10px] text-ink-500">
        These settings are saved on this computer only — they aren&rsquo;t part of the export/import file, because
        the available voices differ from machine to machine.
      </p>
    </div>
  );
}
