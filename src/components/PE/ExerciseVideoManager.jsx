import { useMemo, useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { academyContent } from '../../content/academyContent.js';

const { CATEGORY_LABELS, HIDDEN_VIDEO, curatedDemoFor, exerciseLibrary } = academyContent().pe;

// ---------------------------------------------------------------------------
// EXERCISE DEMO VIDEOS — one link per exercise, hers overriding a checked default.
//
// ---- HOW THIS SCREEN CHANGED, AND WHY (Aug 10, 2026) ----
//
// Built Aug 8 on a strict rule: the app links NOTHING by default, she watches
// and saves every video herself. The reasoning was that nobody can vouch for a
// third-party video, so nobody should pretend to.
//
// Two things then happened. First, the rule was not actually being kept — a
// creator-channel SEARCH was being handed to the student wherever she had saved
// nothing, and 34 of the 70 opened an empty page. Second, she said: "I will
// like to have videos linked so he can see the exercise." Seventy videos is not
// a realistic thing to ask a parent to source before the feature works at all.
//
// So there are defaults now, and the promise on this screen changed with them —
// it has to, or the screen goes back to claiming something the code does not do,
// which is the exact fault that produced the empty pages.
//
// WHAT THE DEFAULTS ARE: one specific pinned video id per exercise, each with
// its title, channel and running time recorded, each confirmed to resolve. Not
// a search, not a channel, not a guess that renders differently every time.
//
// WHAT THEY ARE NOT: watched. A machine can confirm a video exists and what it
// is called. It cannot confirm the coaching is any good. That is what this
// screen is for, and why every row shows the default's title and channel with a
// Preview link — so reviewing is reading a line, not hunting for it.
//
// Her options per exercise: keep the default, paste her own (wins), or Hide it
// (shows him nothing; the form cues and safety notes still stand on their own).
// The search link stays here, on the parent-gated screen. It is still never put
// in front of him — YouTube's own sidebar and autoplay are the surface worth
// keeping a twelve-year-old off.
// ---------------------------------------------------------------------------

function ExerciseRow({ exercise, saved, onSave }) {
  const [value, setValue] = useState(saved && saved !== HIDDEN_VIDEO ? saved : '');
  const [msg, setMsg] = useState(null);
  const curated = curatedDemoFor(exercise.id);
  const hidden = saved === HIDDEN_VIDEO;
  const mine = Boolean(saved) && !hidden;
  const dirty = value.trim() !== (mine ? saved : '');

  const commit = async (url) => {
    const res = await onSave(exercise.id, url);
    setMsg(res && res.ok ? 'Saved' : 'That needs to start with http:// or https://');
    if (res && res.ok) setTimeout(() => setMsg(null), 1500);
  };

  // Built for HER to preview candidates, on a parent-gated screen. The student
  // is never sent to search results — only to one specific video.
  const searchUrl =
    'https://www.youtube.com/results?search_query=' +
    encodeURIComponent(`${exercise.name} proper form kids technique`);

  const badge = mine
    ? { text: 'Yours', cls: 'border-signal-green/40 bg-signal-green/10 text-signal-green' }
    : hidden
      ? { text: 'Hidden', cls: 'border-space-600 bg-space-800 text-ink-500' }
      : curated
        ? { text: 'Default', cls: 'border-signal-cyan/40 bg-signal-cyan/10 text-signal-cyan' }
        : { text: 'No video', cls: 'border-signal-amber/40 bg-signal-amber/5 text-signal-amber' };

  return (
    <div className="rounded-lg border border-space-700 bg-space-900 px-3 py-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="font-display text-sm font-700 text-ink-100">{exercise.name}</p>
          <p className="truncate text-[11px] text-ink-500">{exercise.focus}</p>
        </div>
        <div className="flex flex-none items-center gap-2">
          <span
            className={
              'rounded-full border px-2 py-0.5 text-[10px] font-display uppercase tracking-widest ' +
              badge.cls
            }
          >
            {badge.text}
          </span>
          <a
            href={searchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-space-600 px-2 py-1 text-[11px] text-ink-400 transition hover:border-signal-cyan hover:text-signal-cyan"
          >
            Find one ↗
          </a>
        </div>
      </div>

      {curated && !mine && (
        <p className="mt-1.5 text-[11px] text-ink-400">
          {hidden ? 'Hidden from him. Default available: ' : 'He sees: '}
          <a
            href={curated.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-signal-cyan underline decoration-dotted underline-offset-2"
          >
            {curated.title}
          </a>{' '}
          <span className="text-ink-600">
            · {curated.channel} · {curated.length}
          </span>
        </p>
      )}

      <div className="mt-2 flex gap-2">
        <input
          type="url"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={curated ? 'Paste your own link to replace the default' : 'Paste a link you have watched'}
          className="min-w-0 flex-1 rounded-md border border-space-600 bg-space-950 px-2 py-1.5 text-xs text-ink-100 placeholder:text-ink-600 focus:border-signal-cyan focus:outline-none"
        />
        <button
          type="button"
          onClick={() => commit(value)}
          disabled={!dirty}
          className={
            'flex-none rounded-md px-3 py-1.5 text-xs font-display font-700 transition ' +
            (dirty
              ? 'bg-signal-cyan text-space-950 hover:brightness-110'
              : 'border border-space-700 text-ink-600')
          }
        >
          {value.trim() ? 'Save' : 'Clear'}
        </button>
        <button
          type="button"
          onClick={() => commit(hidden ? '' : HIDDEN_VIDEO)}
          className="flex-none rounded-md border border-space-700 px-2.5 py-1.5 text-xs font-display text-ink-400 transition hover:border-signal-amber hover:text-signal-amber"
        >
          {hidden ? 'Unhide' : 'Hide'}
        </button>
      </div>
      {msg && <p className="mt-1 text-[11px] text-ink-400">{msg}</p>}
    </div>
  );
}

export function ExerciseVideoManager() {
  const exerciseVideos = useAppStore((s) => s.exerciseVideos) || {};
  const setExerciseVideo = useAppStore((s) => s.setExerciseVideo);
  const [category, setCategory] = useState('upperBody');

  const categories = useMemo(() => Object.keys(exerciseLibrary), []);
  const list = exerciseLibrary[category] || [];
  const all = useMemo(() => Object.values(exerciseLibrary).flat(), []);

  const total = all.length;
  const mineCount = Object.values(exerciseVideos).filter((v) => v && v !== HIDDEN_VIDEO).length;
  const showing = all.filter((e) => {
    const s = exerciseVideos[e.id];
    if (s === HIDDEN_VIDEO) return false;
    return Boolean(s) || Boolean(curatedDemoFor(e.id));
  }).length;

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-ink-300">
          Every exercise starts with one <strong>specific</strong> demo video — not a search, not a
          channel. <strong>Anything you save here replaces it</strong>, and Hide shows him nothing at
          all for that exercise.
        </p>
        <p className="mt-1 text-[11px] text-ink-500">
          Be clear on what the defaults are: each one was checked to be a real, working video with the
          title and channel shown on its row. <strong>None of them has been watched.</strong> Whether
          the coaching is any good is the part only you can judge — the title and Preview link on each
          row are there so that takes a minute, not an afternoon. He is never sent to search results;
          YouTube's sidebar and autoplay are the surface worth keeping him off. Exercises with no video
          still show their full form cues and safety notes.
        </p>
        <p className="mt-2 text-xs font-display text-signal-cyan">
          {showing} of {total} exercises have a video · {mineCount} you chose yourself
        </p>
      </div>

      <div className="flex flex-wrap gap-1 rounded-lg bg-space-800 p-1">
        {categories.map((c) => {
          const done = (exerciseLibrary[c] || []).filter((e) => {
            const s = exerciseVideos[e.id];
            if (s === HIDDEN_VIDEO) return false;
            return Boolean(s) || Boolean(curatedDemoFor(e.id));
          }).length;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={
                'rounded-md px-2.5 py-1.5 text-xs font-display font-600 transition-colors ' +
                (category === c ? 'bg-signal-cyan/15 text-signal-cyan' : 'text-ink-300 hover:text-ink-100')
              }
            >
              {CATEGORY_LABELS[c] || c}
              <span className="ml-1 text-[10px] text-ink-600">
                {done}/{(exerciseLibrary[c] || []).length}
              </span>
            </button>
          );
        })}
      </div>

      <div className="space-y-2">
        {list.map((ex) => (
          <ExerciseRow
            key={ex.id}
            exercise={ex}
            saved={exerciseVideos[ex.id]}
            onSave={setExerciseVideo}
          />
        ))}
      </div>
    </div>
  );
}
