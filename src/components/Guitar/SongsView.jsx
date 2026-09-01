import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { academyContent } from '../../content/academyContent.js';

const { GUITAR_OWN_SLOTS, guitarEducators, guitarOwnSongGuidance, guitarPerformanceMoment, guitarStarterSongs } = academyContent().electives;

/**
 * The song list — and the three slots he fills himself.
 *
 * THE SLOTS ARE THE POINT. Adherence follows autonomy: a list somebody else
 * chose is homework, and homework is exactly the thing he is already not doing
 * with this guitar. Three songs ship, and then the screen stops and asks him.
 *
 * His picks are rows in the guitar log (kind 'song-picked'), not entries in a
 * data file — so they persist, they travel in the handoff export to his
 * mother's computer, and they land on his participation record as songs chosen.
 */
export function SongsView() {
  const guitarLog = useAppStore((s) => s.guitarLog);
  const recordGuitarLogEntry = useAppStore((s) => s.recordGuitarLogEntry);

  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [saving, setSaving] = useState(false);

  const picked = guitarLog.filter((r) => r.kind === 'song-picked');
  const learnedTitles = new Set(
    guitarLog.filter((r) => r.kind === 'song-learned').map((r) => (r.data?.title || r.title || '').toLowerCase())
  );
  const slotsLeft = Math.max(0, GUITAR_OWN_SLOTS - picked.length);

  const addSong = async () => {
    if (!title.trim()) return;
    setSaving(true);
    await recordGuitarLogEntry({
      kind: 'song-picked',
      title: title.trim(),
      data: { title: title.trim(), artist: artist.trim() || null }
    });
    setTitle('');
    setArtist('');
    setSaving(false);
  };

  const markLearned = async (songTitle, songArtist) => {
    setSaving(true);
    await recordGuitarLogEntry({
      kind: 'song-learned',
      title: songTitle,
      data: { title: songTitle, artist: songArtist || null }
    });
    setSaving(false);
  };

  const isLearned = (t) => learnedTitles.has((t || '').toLowerCase());

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Songs you can actually reach</p>
        <p className="mt-1 text-sm text-ink-300">
          Every one of these is playable with the eight skills on your ladder and nothing else. Each says which
          skill it needs, so nothing on this list is a way to feel bad.
        </p>
      </div>

      {guitarStarterSongs.map((song) => (
        <div key={song.id} className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-display uppercase tracking-widest text-ink-500">
                Needs skill {song.needsSkill} · {song.needsSkillLabel}
              </p>
              <p className="mt-0.5 font-display text-base font-700 text-ink-100">{song.title}</p>
              <p className="text-xs text-ink-500">{song.artist}</p>
            </div>
            <button
              type="button"
              onClick={() => markLearned(song.title, song.artist)}
              disabled={saving || isLearned(song.title)}
              className={
                'flex-none rounded-lg px-3 py-1.5 text-xs font-display font-700 transition ' +
                (isLearned(song.title)
                  ? 'bg-signal-green text-space-950'
                  : 'border border-signal-cyan/40 text-signal-cyan hover:bg-signal-cyan/10')
              }
            >
              {isLearned(song.title) ? 'Learned' : 'I can play this'}
            </button>
          </div>
          <p className="mt-2 text-sm text-ink-300">{song.why}</p>
          <a
            href={song.lesson.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-xs text-signal-cyan underline"
          >
            {song.lesson.label}
          </a>
        </div>
      ))}

      {/* --- his own slots ---------------------------------------------- */}
      <div className="rounded-xl border border-signal-amber/40 bg-signal-amber/5 p-4 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-amber">
          Your songs — {slotsLeft} slot{slotsLeft === 1 ? '' : 's'} left
        </p>
        <p className="mt-1 text-sm text-ink-300">
          Nobody else picks these. A list somebody else chose is homework.
        </p>
        <ul className="mt-2 space-y-1">
          {guitarOwnSongGuidance.map((g, i) => (
            <li key={i} className="flex gap-2 text-xs text-ink-300">
              <span className="flex-none text-ink-600">·</span>
              <span>{g}</span>
            </li>
          ))}
        </ul>

        {picked.length > 0 && (
          <div className="mt-3 space-y-2">
            {picked.map((row) => (
              <div key={row.id} className="flex items-center justify-between gap-3 rounded-lg bg-space-900 px-3 py-2">
                <span className="min-w-0">
                  <span className="block truncate text-sm text-ink-100">{row.data?.title || row.title}</span>
                  {row.data?.artist && <span className="block text-xs text-ink-500">{row.data.artist}</span>}
                </span>
                <button
                  type="button"
                  onClick={() => markLearned(row.data?.title || row.title, row.data?.artist)}
                  disabled={saving || isLearned(row.data?.title || row.title)}
                  className={
                    'flex-none rounded-lg px-3 py-1 text-xs font-display font-700 transition ' +
                    (isLearned(row.data?.title || row.title)
                      ? 'bg-signal-green text-space-950'
                      : 'border border-signal-cyan/40 text-signal-cyan hover:bg-signal-cyan/10')
                  }
                >
                  {isLearned(row.data?.title || row.title) ? 'Learned' : 'I can play this'}
                </button>
              </div>
            ))}
          </div>
        )}

        {slotsLeft > 0 && (
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Song you want to play"
              className="w-full rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100"
            />
            <input
              type="text"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              placeholder="Who plays it (optional)"
              className="w-full rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100"
            />
            <button
              type="button"
              onClick={addSong}
              disabled={saving || !title.trim()}
              className="sm:col-span-2 rounded-lg bg-signal-amber px-4 py-2 font-display text-sm font-700 text-space-950 transition hover:brightness-110 disabled:cursor-default disabled:bg-space-700 disabled:text-ink-500"
            >
              Add it to my list
            </button>
          </div>
        )}
      </div>

      {/* --- the performance moment -------------------------------------- */}
      <div className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">
          End of the quarter — {guitarPerformanceMoment.quarter}
        </p>
        <p className="mt-1 font-display text-base font-700 text-ink-100">{guitarPerformanceMoment.what}</p>
        <p className="mt-1 text-sm text-ink-300">{guitarPerformanceMoment.why}</p>
        <ul className="mt-2 space-y-1">
          {guitarPerformanceMoment.howToPrepare.map((step, i) => (
            <li key={i} className="flex gap-2 text-xs text-ink-300">
              <span className="flex-none text-ink-600">·</span>
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* --- where to go next -------------------------------------------- */}
      <div className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-ink-500">Players worth watching</p>
        <p className="mt-1 text-xs text-ink-500">
          Both of these are ahead of where you are right now, and that is the point of putting them here. The
          blues and R&amp;B they teach is where the riffs you are learning came from.
        </p>
        <div className="mt-2 space-y-2">
          {guitarEducators.map((e) => (
            <div key={e.id} className="rounded-lg bg-space-900 p-3">
              <a href={e.url} target="_blank" rel="noopener noreferrer" className="font-display text-sm font-700 text-signal-cyan underline">
                {e.name}
              </a>
              <p className="mt-1 text-xs text-ink-300">{e.what}</p>
              <p className="mt-1 text-xs text-ink-500">{e.whyForHim}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
