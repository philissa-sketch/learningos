import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { GreenhouseScene } from './GreenhouseScene.jsx';
import { ApothecaryShelf } from './ApothecaryShelf.jsx';
import { HerbalistAvatar, AVATAR_SLOTS } from './HerbalistAvatar.jsx';
import { MarigoldMessage } from '../Mentor/MarigoldMessage.jsx';
import { greenhouseLine } from '../../lib/marigold.js';
import {
  GREENHOUSE_ITEMS,
  APRON_ITEMS,
  SHELF_ITEMS,
  BACKGROUND_ITEMS,
  getBackgroundLook,
  ALL_PETAL_ITEMS
} from '../../data/rewards/petalCatalog.js';

// ---------------------------------------------------------------------------
// MY GREENHOUSE — the place everything she buys actually goes.
//
// This screen exists because the Market did not have one. The grandmother:
// "you didn't create the greenhouse, avatar, or shelves." The shop was selling
// a stool, an apron and a jar into a void, which is worse than not selling them
// — a child who spends her Petals and gets a receipt learns that the money is
// pretend.
//
// Three views, one place: the room, the shelf, and her. Each one draws what she
// owns SOLID and what she does not as a dotted outline standing in its own spot
// with the price under it. The gaps do the motivating.
// ---------------------------------------------------------------------------

function ToggleGhosts({ value, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`rounded-full px-4 py-1.5 text-xs font-700 ${
        value ? 'bg-lavender-500 text-white' : 'border border-cream-300 bg-white text-ink-700'
      }`}
    >
      {value ? 'Showing what is missing' : 'Show what is missing'}
    </button>
  );
}

function Wardrobe() {
  const unlocked = useAppStore((s) => s.unlockedItems);
  const gear = useAppStore((s) => s.equippedGear);
  const equip = useAppStore((s) => s.equipItem);

  const ownedApron = APRON_ITEMS.filter((i) => unlocked.includes(i.id));

  return (
    <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div className="panel-white flex items-center justify-center px-4 py-6">
        <HerbalistAvatar gear={gear} size={210} />
      </div>

      <div className="panel px-4 py-4">
        <p className="label-caps">What you are wearing</p>
        {ownedApron.length === 0 ? (
          <p className="mt-2 text-sm text-ink-700">
            Nothing bought yet. Everything in <span className="font-700">Apron &amp; Kit</span> in the
            Market shows up on her the moment you buy it — the apron goes on, the gloves go on her
            hands, the hat sits on her head.
          </p>
        ) : (
          <div className="mt-3 space-y-3">
            {AVATAR_SLOTS.map((slot) => {
              const options = ownedApron.filter((i) => i.slot === slot.id);
              if (options.length === 0) return null;
              const current = gear[slot.id] || null;
              return (
                <div key={slot.id}>
                  <p className="text-[0.7rem] font-700 uppercase tracking-wide text-ink-500">
                    {slot.label}
                  </p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => equip(slot.id, null)}
                      className={`rounded-full px-3 py-1 text-xs font-700 ${
                        current == null
                          ? 'bg-blush-500 text-white'
                          : 'border border-cream-300 bg-white text-ink-700 hover:border-blush-500'
                      }`}
                    >
                      None
                    </button>
                    {options.map((o) => (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => equip(slot.id, o.id)}
                        className={`rounded-full px-3 py-1 text-xs font-700 ${
                          current === o.id
                            ? 'bg-blush-500 text-white'
                            : 'border border-cream-300 bg-white text-ink-700 hover:border-blush-500'
                        }`}
                      >
                        {o.icon} {o.name}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <p className="mt-4 rounded-xl bg-cream-200 px-3 py-2 text-[0.7rem] leading-relaxed text-ink-700">
          She is drawn, not made of emoji — which is the only reason the gear can actually go on
          her. Nothing here is locked behind a score.
        </p>
      </div>
    </div>
  );
}

/**
 * Which room look is showing, and the row that switches it.
 *
 * Only looks she OWNS appear, plus "Greenhouse" — the original, which is free,
 * always there and cannot be taken away. Buying a look does not apply it: the
 * whole point of a room she built herself is that nothing rearranges it without
 * her. If she owns none of them this row does not render at all, so the screen
 * does not advertise an empty shelf at her.
 */
function LookPicker() {
  const unlocked = useAppStore((s) => s.unlockedItems);
  const roomLook = useAppStore((s) => s.roomLook);
  const setRoomLook = useAppStore((s) => s.setRoomLook);

  const owned = BACKGROUND_ITEMS.filter((b) => unlocked.includes(b.id));
  if (owned.length === 0) return null;

  const options = [{ id: null, name: 'Greenhouse', icon: '🪴' }, ...owned];

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <span className="text-xs font-700 uppercase tracking-wide text-ink-500">The light</span>
      {options.map((o) => {
        const on = roomLook === o.id;
        return (
          <button
            key={o.id || 'default'}
            type="button"
            onClick={() => setRoomLook(o.id)}
            aria-pressed={on}
            className={`rounded-full border px-3 py-1 text-xs font-700 transition ${
              on
                ? 'border-sage-600 bg-sage-100 text-sage-900'
                : 'border-cream-300 bg-white text-ink-500 hover:border-sage-400'
            }`}
          >
            {o.icon} {o.name}
          </button>
        );
      })}
    </div>
  );
}

export function GreenhouseView({ onNavigate }) {
  const unlocked = useAppStore((s) => s.unlockedItems);
  const roomLook = useAppStore((s) => s.roomLook);
  const [tab, setTab] = useState('room');
  const [ghosts, setGhosts] = useState(true);

  const ownedIn = (list) => list.filter((i) => unlocked.includes(i.id)).length;

  const TABS = [
    ['room', '🏡 The Greenhouse', ownedIn(GREENHOUSE_ITEMS), GREENHOUSE_ITEMS.length],
    ['shelf', '🫙 Apothecary Shelf', ownedIn(SHELF_ITEMS), SHELF_ITEMS.length],
    ['me', '👧🏾 You', ownedIn(APRON_ITEMS), APRON_ITEMS.length]
  ];

  // A look she no longer owns must never keep showing — the picker only offers
  // owned ones, but state can outlive a reset, so the scene falls back here too.
  const look = unlocked.includes(roomLook) ? getBackgroundLook(roomLook) : null;

  const line = greenhouseLine({
    ownedCount: unlocked.length,
    totalCount: ALL_PETAL_ITEMS.length
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="label-caps">My Greenhouse</p>
          <h1 className="mt-1 font-display text-3xl text-ink-900">Everything you have earned</h1>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('market')}
          className="rounded-full bg-blush-500 px-5 py-2.5 text-sm font-700 text-white hover:bg-blush-700"
        >
          🧺 Go to the Market
        </button>
      </div>

      <div className="mt-4">
        <MarigoldMessage text={line} size="sm" />
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {TABS.map(([id, label, owned, total]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`rounded-full px-4 py-1.5 text-sm font-700 ${
                tab === id ? 'bg-sage-500 text-white' : 'text-ink-700 hover:bg-cream-200'
              }`}
            >
              {label}{' '}
              <span className={tab === id ? 'text-white/80' : 'text-ink-500'}>
                {owned}/{total}
              </span>
            </button>
          ))}
        </div>
        {tab !== 'me' && <ToggleGhosts value={ghosts} onChange={setGhosts} />}
      </div>

      <div className="mt-4">
        {tab === 'room' && (
          <div>
            <div className="overflow-hidden rounded-petal border border-cream-300 shadow-petal">
              <GreenhouseScene owned={unlocked} showGhosts={ghosts} look={look} />
            </div>
            <LookPicker />
          </div>
        )}
        {tab === 'shelf' && (
          <div className="overflow-hidden rounded-petal border border-cream-300 shadow-petal">
            <ApothecaryShelf owned={unlocked} showGhosts={ghosts} />
          </div>
        )}
        {tab === 'me' && <Wardrobe />}
      </div>

      <p className="mt-4 text-center text-xs text-ink-500">
        {unlocked.length} of {ALL_PETAL_ITEMS.length} things collected.
      </p>
    </div>
  );
}
