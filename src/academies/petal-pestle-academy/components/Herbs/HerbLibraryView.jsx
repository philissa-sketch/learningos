import { useState } from 'react';
import { herbs, SAFETY_LINE } from '../../data/herbs/herbLibrary.js';
import { MarigoldMessage } from '../Mentor/MarigoldMessage.jsx';
import { herbLine } from '../../lib/marigold.js';

/**
 * Reference material, not lessons — which is why it ships in version 1 without
 * breaking the "no lessons until after the diagnostic" rule.
 *
 * The safety line appears on EVERY card, not once at the top of the page. A
 * child browsing card 14 has scrolled far past a banner, and this is the one
 * piece of text in the app that must not be missable.
 */
export function HerbLibraryView() {
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState(null);

  const q = query.trim().toLowerCase();
  const shown = q
    ? herbs.filter(
        (h) =>
          h.name.toLowerCase().includes(q) ||
          h.latin.toLowerCase().includes(q) ||
          h.partsUsed.toLowerCase().includes(q)
      )
    : herbs;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <p className="label-caps">Herb Library</p>
      <h1 className="mt-1 font-display text-3xl text-ink-900">Twenty-four plants to know</h1>
      <p className="mt-2 max-w-2xl text-sm text-ink-700">
        What each plant is, where it grows, which part people use, and how to tell it apart from
        things it looks like. This library teaches botany and history — it never tells you to use a
        plant for anything.
      </p>

      <div className="mt-4">
        <MarigoldMessage text={herbLine()} size="sm" tone="start" />
      </div>

      <div className="mt-4 rounded-petal border-2 border-clay-500/40 bg-clay-500/10 px-4 py-3">
        <p className="text-sm font-700 text-ink-900">⚠️ {SAFETY_LINE}</p>
        <p className="mt-1 text-xs text-ink-700">
          Some plants have dangerous look-alikes. Identifying a plant from a picture is never enough
          — real herbalists learn plants in person, from someone who already knows them.
        </p>
      </div>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name, Latin name, or part used…"
        className="mt-5 w-full rounded-full border border-cream-300 bg-white px-5 py-2.5 text-sm outline-none focus:border-lavender-500"
      />

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((herb) => {
          const open = openId === herb.id;
          return (
            <button
              key={herb.id}
              type="button"
              onClick={() => setOpenId(open ? null : herb.id)}
              aria-expanded={open}
              className={`rounded-petal border-2 bg-white px-4 py-4 text-left shadow-petal transition ${
                open ? 'border-lavender-500' : 'border-cream-300 hover:border-sage-500'
              }`}
            >
              <div className="flex items-start gap-2">
                <span className="text-2xl leading-none">{herb.emoji}</span>
                <div>
                  <p className="font-display text-base leading-tight text-ink-900">{herb.name}</p>
                  <p className="text-[0.7rem] italic text-ink-500">{herb.latin}</p>
                </div>
              </div>
              <p className="mt-2 text-xs text-ink-700">
                <span className="font-700">Parts used:</span> {herb.partsUsed}
              </p>

              {open && (
                <div className="mt-3 space-y-2.5 border-t border-cream-300 pt-3 text-xs leading-relaxed text-ink-700">
                  <p>
                    <span className="font-700 text-ink-900">Where it grows: </span>
                    {herb.grows}
                  </p>
                  <p>
                    <span className="font-700 text-ink-900">How to tell it: </span>
                    {herb.lookFor}
                  </p>
                  <p>
                    <span className="font-700 text-ink-900">How people have used it: </span>
                    {herb.traditionalUse}
                  </p>
                  <p className="rounded-lg bg-sage-300/30 px-3 py-2">
                    <span className="font-700 text-ink-900">Worth knowing: </span>
                    {herb.fact}
                  </p>
                  <p className="rounded-lg bg-clay-500/10 px-3 py-2 font-700 text-ink-900">
                    ⚠️ {SAFETY_LINE}
                  </p>
                </div>
              )}
              {!open && <p className="mt-2 text-[0.7rem] text-lavender-700">Tap to read more →</p>}
            </button>
          );
        })}
      </div>

      {shown.length === 0 && (
        <p className="mt-8 text-center text-sm text-ink-500">
          Nothing matches “{query}”. Try a different word.
        </p>
      )}
    </div>
  );
}
