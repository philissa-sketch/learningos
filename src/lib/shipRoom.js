/**
 * =============================================================================
 * A ROOM AS A PLACE YOU GO INTO — sealed, or open with something inside it.
 * =============================================================================
 *
 * THE COMPLAINT THIS ANSWERS. (Sept 27, 2026.)
 *
 * The parent looked at the cutaway and said the rooms "look like doors that
 * open up to a room where actions can be done inside", and that they "should
 * open with growth but not the finality of the ship."
 *
 * Both halves are corrections of the same mistake. The first version drew ten
 * finished compartments on day one and let you walk a figure between them —
 * so the ship arrived complete and the only thing that changed afterwards was
 * how full the bars were. A door that never opens is a picture of a door.
 *
 * So:
 *
 *   1. A room is SEALED until the work behind it has started. It opens on the
 *      first real piece, not on a level, a purchase or a date. The ship is
 *      therefore never finished-looking at the start, and it grows a room at a
 *      time.
 *
 *   2. An OPEN room has an inside: what is already installed, what the next
 *      piece is, and one job that can be done from in there.
 *
 * ---- WHY SEALING IS DERIVED AND NOT STORED ----
 *
 * There is no `unlockedRooms` array anywhere, deliberately. A stored unlock is
 * a second copy of the truth, and the day it disagrees with the record the
 * room is either locked over work already done or standing open over nothing.
 * Sealing reads the SAME reading the room draws its bar from, so the two can
 * never disagree.
 *
 * ---- WHY THIS FILE KNOWS NOTHING ABOUT ANY SCHOOL ----
 *
 * What is installed in a room, what the next piece is, and what the job does
 * are all different per Academy — they are that school's units, books, entries
 * and logs. None of that is named here. It arrives as `supply`, already
 * assembled by whoever knows the school, and this file only decides SHAPE:
 * open or sealed, and what an open room is allowed to show.
 */

import { tierFor, TIER_NAMES } from './shipCutaway.js';

/**
 * ---- THE TWO ROOMS THAT ARE HIS BEFORE HE EARNS ANYTHING ----
 *
 * A ship with every door sealed is not inviting, it is a locked building. One
 * room per deck stands open from the first minute, and both are chosen because
 * they are his by being aboard rather than by being earned: the seat he flies
 * from, and the quarters he sleeps in. Neither reports an achievement, so
 * neither can be read as a reward handed out for nothing.
 */
export const ALWAYS_OPEN = ['pilot-seat', 'crew-quarters'];

/** The ladder is a way through, not a room, and is never sealed. */
function isPassage(station) {
  return station?.reads === 'deck-change';
}

/**
 * Sealed when nothing has been done behind it yet.
 *
 * `reading.empty` is the same flag the bar uses to decide it has nothing to
 * draw, which is the point: one source, two consequences.
 */
export function roomIsSealed(station, reading) {
  if (!station) return false;
  if (isPassage(station)) return false;
  if (ALWAYS_OPEN.includes(station.id)) return false;
  if (!reading) return true;
  return reading.empty === true;
}

/**
 * What a sealed hatch says about itself.
 *
 * The reading already carries a sentence for having nothing in it, and that
 * sentence is assembled from the Academy's own subject words rather than
 * written here. A sealed room says the same thing plus the one fact the hatch
 * has to carry: that finishing the first piece is what opens it.
 */
export function sealHint(station, reading) {
  if (!roomIsSealed(station, reading)) return null;
  const said = reading?.note || station?.empty || null;
  const opener = 'The hatch opens on the first one.';
  if (!said) return `Sealed. ${opener}`;
  /**
   * Some rooms already say what opens them — the window's sentence names the
   * first mastered lesson, for instance. Appending a second opener to those
   * produced "…opens with your first mastered lesson. The hatch opens on the
   * first one," which says the same thing twice and reads like a machine.
   */
  return /\bopens?\b/i.test(said) ? said : `${said} ${opener}`;
}

/** Every room currently open, by id. Used by the guards and the hull summary. */
export function openRooms(stations, readings = {}) {
  return (stations || [])
    .filter((s) => !isPassage(s))
    .filter((s) => !roomIsSealed(s, readings[s.id]))
    .map((s) => s.id);
}

/**
 * ---- WHAT IS INSIDE ----
 *
 * `supply` is the school's answer to three questions, and this file does not
 * check its contents beyond shape:
 *
 *   installed  what real work is already in this room, newest last
 *   next       the next piece, and where in the app it is done
 *   job        one thing that can be done from inside the room
 *
 * A SEALED ROOM SHOWS NOTHING. Not a greyed-out list, not a teaser of what is
 * coming — nothing. A hatch that previews its contents is a shop window, and
 * the thing that opens it is work, not wanting it.
 */
export function roomInterior(station, reading, supply = null) {
  if (!station || isPassage(station)) return null;
  const sealed = roomIsSealed(station, reading);
  const tier = tierFor(reading?.pct);

  return {
    id: station.id,
    name: station.name,
    sealed,
    sealHint: sealed ? sealHint(station, reading) : null,
    tier,
    tierName: TIER_NAMES[tier],
    detail: sealed ? null : (reading?.detail ?? null),
    doing: station.doing,
    nextStep: sealed ? null : (reading?.nextStep ?? null),
    installed: sealed ? [] : normalizeInstalled(supply?.installed),
    next: sealed ? null : (supply?.next ?? null),
    job: sealed ? null : (supply?.job ?? null)
  };
}

/**
 * The installed list, trimmed to what a room can actually show.
 *
 * A room with sixty units in it should not print sixty lines — the point of
 * standing in the doorway is seeing the shape of what is there. The newest few
 * are named and the rest are counted, which is also how a shelf reads.
 */
export const INSTALLED_SHOWN = 5;

function normalizeInstalled(list) {
  if (!Array.isArray(list)) return [];
  return list
    .filter((row) => row && (row.title || row.id))
    .map((row) => ({
      id: row.id ?? row.title,
      title: row.title || String(row.id),
      when: row.when || null
    }));
}

/** The newest few, and how many are not shown. */
export function installedShelf(installed, shown = INSTALLED_SHOWN) {
  const all = Array.isArray(installed) ? installed : [];
  const head = all.slice(0, shown);
  return { shown: head, hidden: Math.max(0, all.length - head.length), total: all.length };
}
