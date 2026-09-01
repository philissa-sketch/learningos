import { useMemo } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { AVATARS, ROCKETS, avatarIconFor, DEFAULT_AVATAR_ID, DEFAULT_ROCKET_ID } from '../../lib/rewards.js';
import { playPurchase, unlockAudio } from '../../lib/sfx.js';
import { HQRoom } from './HQRoom.jsx';
import { CadetAvatar } from './CadetAvatar.jsx';
import { RocketSwatch } from './RocketSwatch.jsx';
import { academyContent } from '../../content/academyContent.js';

const { AVATAR_GEAR, HQ_ITEMS, MISSION_EQUIPMENT } = academyContent().rewards;

// ---------------------------------------------------------------------------
// INVENTORY — where the things he bought actually live.
// (Part 10, built Aug 8, 2026.)
//
// WHY THIS EXISTS: the Supply store shipped before this did, which meant a
// purchase debited real coins, wrote a ledger line, and then went nowhere the
// student could see. Buying something that vanishes is worse than not selling it
// at all — it is a broken promise, and this system's entire value rests on him
// trusting that what the app says is true.
//
// WHAT THIS WAS HONEST ABOUT, AND IS NO LONGER TRUE (updated Aug 25, 2026):
// "gear does not yet redraw the avatar, and HQ items are shown as a room
// inventory rather than a rendered room." Both limitations are gone — gear
// redraws him, equipment is worn on him, and the room is drawn and walkable.
// The note is kept rather than deleted because a stale caveat that outlives its
// limitation is exactly how this app spent two weeks telling him his purchases
// were "still being built" after they shipped.
// ---------------------------------------------------------------------------

function OwnedGrid({ items, empty }) {
  if (items.length === 0) {
    return <p className="mt-2 text-sm text-ink-500">{empty}</p>;
  }
  return (
    <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="rounded-xl border border-space-700 bg-space-900 p-2 text-center shadow-panel"
        >
          <div className="text-2xl">{item.icon}</div>
          <p className="mt-1 truncate text-[11px] leading-tight text-ink-300" title={item.name}>
            {item.name}
          </p>
        </div>
      ))}
    </div>
  );
}

/**
 * A grid of things he owns, one of which is currently ON.
 *
 * Every tile is a button and the equipped one says so — the two halves of the
 * fault this replaces, which rendered neither. The picture is the real product:
 * the character drawn, or the rocket in its own colour.
 */
function PickGrid({ items, equippedId, onPick }) {
  if (items.length === 0) return null;
  return (
    <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
      {items.map((item) => {
        const on = item.id === equippedId;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onPick(item)}
            aria-pressed={on}
            className={
              'flex flex-col items-center rounded-xl border p-2 text-center shadow-panel transition ' +
              (on
                ? 'border-signal-cyan/60 bg-signal-cyan/10'
                : 'border-space-700 bg-space-900 hover:border-signal-cyan/50')
            }
          >
            {item.type === 'rocket' ? (
              <RocketSwatch color={item.color} size={34} />
            ) : (
              <CadetAvatar avatar={item.id} size={40} />
            )}
            <p className="mt-1 w-full truncate text-[11px] leading-tight text-ink-300" title={item.name}>
              {item.name}
            </p>
            <p className={'text-[10px] font-display font-700 ' + (on ? 'text-signal-cyan' : 'text-ink-600')}>
              {on ? 'Equipped' : 'Tap to use'}
            </p>
          </button>
        );
      })}
    </div>
  );
}

export function InventorySection() {
  const unlocked = useAppStore((s) => s.unlockedCosmetics);
  const equippedAvatar = useAppStore((s) => s.equippedAvatar) || DEFAULT_AVATAR_ID;
  const equippedRocket = useAppStore((s) => s.equippedRocket);
  const equippedGear = useAppStore((s) => s.equippedGear) || {};
  const equipGear = useAppStore((s) => s.equipGear);
  const equipCosmetic = useAppStore((s) => s.equipCosmetic);

  /**
   * ==========================================================================
   * THE THINGS HE OWNS ARE CHOSEN WHERE HE OWNS THEM. (Aug 25, 2026.)
   * ==========================================================================
   *
   * The parent: **"Avatar and rockets wont allow selections in My Stuff."**
   *
   * They did not, and the comment directly above the grid said `these DO
   * equip` while the code rendered a plain <div> with no handler on it. Ten
   * avatars and five rockets, every one of them a dead tile, under a note
   * reading "Change these in the Store tab."
   *
   * That note was the whole mistake. The four tabs were split by VERB two days
   * ago — Shop is where you SPEND, My Stuff is what you OWN — and sending him
   * to the shop to change between two characters he already paid for puts a
   * price tag in front of a thing he has already bought.
   *
   * They also drew as `item.icon`, an emoji, on a screen whose entire point
   * since Aug 25 is that avatars are drawn characters and rockets have real
   * colours. Two of the ten avatar glyphs are the same picture at that size.
   */
  const pick = (item) => {
    unlockAudio();
    playPurchase();
    equipCosmetic(item);
  };

  const wear = (item) => {
    unlockAudio();
    playPurchase();
    equipGear(item);
  };

  const owned = useMemo(() => new Set(unlocked || []), [unlocked]);
  const has = (i) => owned.has(i.id);

  const equipment = useMemo(() => MISSION_EQUIPMENT.filter(has), [owned]);
  const gear = useMemo(() => AVATAR_GEAR.filter(has), [owned]);
  const hq = useMemo(() => HQ_ITEMS.filter(has), [owned]);

  // Avatars and rockets are free at tier 0, so "owned" includes the defaults.
  const avatars = useMemo(() => AVATARS.filter((a) => a.cost === 0 || owned.has(a.id)), [owned]);
  const rockets = useMemo(() => ROCKETS.filter((r) => r.cost === 0 || owned.has(r.id)), [owned]);

  const totalOwned = equipment.length + gear.length + hq.length + avatars.length + rockets.length;

  /**
   * What is currently worn, resolved from slot -> id back to the item.
   *
   * Searches BOTH catalogues from Aug 25 2026. It looked only in AVATAR_GEAR,
   * so the moment equipment became wearable a worn helmet would have been on
   * the drawing and missing from the list of what he is wearing — the same
   * shape of bug as everything else fixed this week, arriving inside the fix.
   */
  const loadout = useMemo(
    () => Object.values(equippedGear || {})
      .map((id) => AVATAR_GEAR.find((g) => g.id === id) || MISSION_EQUIPMENT.find((e) => e.id === id))
      .filter(Boolean),
    [equippedGear]
  );

  return (
    <div className="space-y-5">
      {/* -------- The crew member -------- */}
      <div className="rounded-xl border border-signal-cyan/40 bg-signal-cyan/5 p-4 shadow-panel">
        <div className="flex items-center gap-3">
          {/**
            * The cadet is drawn, so everything he is wearing is visibly on him.
            *
            * `avatar` added Aug 25 2026. This call passed only `gear` for
            * seventeen days, which is the whole of the bug the parent
            * reported: he equipped Robo-Helper and the figure on this screen
            * carried on being the same boy in a cadet jumpsuit. The avatar was
            * bought, saved, synced between two computers — and never drawn.
            */}
          <CadetAvatar avatar={equippedAvatar} gear={equippedGear} size={92} />
          <div>
            <p className="font-display text-xs uppercase tracking-widest text-signal-cyan">Your crew member</p>
            <p className="font-display text-lg font-700 text-ink-100">
              {(AVATARS.find((a) => a.id === equippedAvatar) || {}).name || 'Cadet'}
            </p>
            <p className="text-[11px] text-ink-500">
              {totalOwned} item{totalOwned === 1 ? '' : 's'} in inventory
              {equippedRocket ? ` · flying the ${(ROCKETS.find((r) => r.id === equippedRocket) || {}).name || 'Classic White'}` : ''}
            </p>
          </div>
        </div>

        {/* The loadout — what he is actually wearing right now. */}
        {loadout.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-signal-cyan/20 pt-3">
            <span className="text-[10px] uppercase tracking-widest text-ink-600">Loadout</span>
            {loadout.map((g) => (
              <span
                key={g.id}
                className="inline-flex items-center gap-1 rounded-full border border-signal-green/40 bg-signal-green/10 px-2 py-0.5 text-[11px] text-signal-green"
              >
                {g.icon} {g.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/*
        HQ and Mission Equipment render as a ROOM rather than a list. A list of
        owned things is a receipt; a room is a place, and a place fills up —
        which is the only reason to keep buying HQ items over six years. The
        slots he has not bought yet are drawn faintly rather than hidden, for
        the same reason locked badges now show progress.
      */}
      <HQRoom />

      {/* -------- Gear — tappable, one item per slot -------- */}
      <div>
        <p className="text-xs font-display uppercase tracking-widest text-signal-green">Avatar Gear</p>
        {gear.length === 0 ? (
          <p className="mt-2 text-sm text-ink-500">
            No gear yet — uniforms, glasses and victory moves are in the Supply store.
          </p>
        ) : (
          <>
            <p className="mt-1 text-[11px] text-ink-500">
              Tap to wear it. Tap it again to take it off.
            </p>
            <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
              {gear.map((item) => {
                const on = equippedGear[item.slot] === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => wear(item)}
                    className={
                      'rounded-xl border p-2 text-center shadow-panel transition ' +
                      (on
                        ? 'border-signal-green/60 bg-signal-green/10'
                        : 'border-space-700 bg-space-900 hover:border-signal-green/40')
                    }
                  >
                    <div className="text-2xl">{item.icon}</div>
                    <p className="mt-1 truncate text-[11px] leading-tight text-ink-300" title={item.name}>
                      {item.name}
                    </p>
                    <p className={'text-[10px] ' + (on ? 'text-signal-green' : 'text-ink-600')}>
                      {on ? 'Worn' : item.slot}
                    </p>
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-ink-600">
              Everything you wear shows on your cadet above — hair on his head, glasses over his eyes,
              gloves on his hands, a pose in his arms. One item per slot.
            </p>
          </>
        )}
      </div>

      {/* -------- HQ -------- */}
      <div>
        <p className="text-xs font-display uppercase tracking-widest text-signal-amber">Mission Control HQ</p>
        <OwnedGrid items={hq} empty="Your HQ is empty — workstations, a telescope, plants and posters are in the Supply store." />
        {/**
          * ---- "STILL BEING BUILT" — IT WAS BUILT (Aug 25, 2026) ----
          *
          * The room view is rendered fifty lines above this paragraph. It has
          * been, since HQRoom shipped. This line told him the opposite every
          * time he looked at the list of things he had paid for.
          *
          * Second of two identical faults found today, and together they are
          * the answer to the parent's question — she asked where the mission
          * equipment goes, and the app's own copy said nowhere.
          */}
        {hq.length > 0 && (
          <p className="mt-2 text-[11px] leading-relaxed text-ink-600">
            {hq.length} item{hq.length === 1 ? '' : 's'} installed — every one of them is drawn in your
            room above.
          </p>
        )}
      </div>

      {/**
        * ---- EQUIPMENT IS WORN NOW (Aug 25, 2026) ----
        *
        * The parent: **"Lamar wants to use the equipment he purchases not just
        * have it sitting in the equipment app."**
        *
        * This was a read-only receipt grid until today, because the equipment
        * had no `slot` and `equipGear` refuses anything without one. He owns a
        * Gold Visor, a Flight Helmet and Mission Boots — 750 coins of things he
        * could look at and never put on.
        *
        * Same tap-to-wear control as Avatar Gear, deliberately: it is the same
        * action, and giving it a second shape would make him learn it twice.
        */}
      <div>
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Mission Equipment</p>
        {equipment.length === 0 ? (
          <p className="mt-2 text-sm text-ink-500">
            No equipment yet — helmets, visors, boots and a manoeuvring unit are in the Supply store.
          </p>
        ) : (
          <>
            <p className="mt-1 text-[11px] text-ink-500">Tap to put it on. Tap it again to take it off.</p>
            <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
              {equipment.map((item) => {
                const on = item.slot && equippedGear[item.slot] === item.id;
                const wearable = Boolean(item.slot);
                return (
                  <button
                    key={item.id}
                    type="button"
                    disabled={!wearable}
                    onClick={() => wearable && wear(item)}
                    title={wearable ? item.name : `${item.name} — bolts onto your ship, not onto you`}
                    className={
                      'rounded-xl border p-2 text-center shadow-panel transition ' +
                      (on
                        ? 'border-signal-cyan/60 bg-signal-cyan/10'
                        : wearable
                          ? 'border-space-700 bg-space-900 hover:border-signal-cyan/40'
                          : 'cursor-default border-space-700 bg-space-900 opacity-60')
                    }
                  >
                    <div className="text-2xl">{item.icon}</div>
                    <p className="mt-1 truncate text-[11px] leading-tight text-ink-300" title={item.name}>
                      {item.name}
                    </p>
                    <p className={'text-[10px] ' + (on ? 'text-signal-cyan' : 'text-ink-500')}>
                      {on ? 'Worn' : wearable ? item.slot : 'on the ship'}
                    </p>
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-ink-600">
              Everything you put on shows on your cadet above — a helmet on his head, the gold visor
              down over it, boots on his feet, a pack on his back. The four ship parts are bolted onto
              your spacecraft instead; open <span className="text-signal-cyan">My Ship</span> to see
              them mounted.
            </p>
          </>
        )}
      </div>

      {/* -------- Avatars & rockets — pick one, right here -------- */}
      <div>
        <p className="text-xs font-display uppercase tracking-widest text-ink-300">Avatars</p>
        <p className="text-[11px] text-ink-500">Tap one to become it.</p>
        <PickGrid items={avatars} equippedId={equippedAvatar} onPick={pick} />
      </div>

      <div>
        <p className="text-xs font-display uppercase tracking-widest text-ink-300">Rockets</p>
        <p className="text-[11px] text-ink-500">Tap one to fly it. It is the rocket on your Mission Control board.</p>
        <PickGrid items={rockets} equippedId={equippedRocket || DEFAULT_ROCKET_ID} onPick={pick} />
      </div>
    </div>
  );
}
