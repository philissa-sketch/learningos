/**
 * =============================================================================
 * INSIDE THE SHIP.
 * =============================================================================
 *
 * The parent, Sept 27 2026, asked for the flat ship on the My Ship screen — the
 * hull where each system fills as its own subject's work comes in — to become a
 * place that can be entered. It was a picture. Now it is somewhere to stand.
 * (Her words verbatim are in the session note, not here: this is platform code,
 * and the vehicle's theme belongs to the Academy that chose it.)
 *
 * ---- WHY THIS FILE IS PLAIN JAVASCRIPT ----
 *
 * Same reason `hqGeometry.js`, `hqRooms.js`, `hqCrew.js` and `hqTruth.js` are:
 * a guard has to be able to run it. "Which deck is the fuel tank on", "does
 * every system on the hull have a station inside", "does a station with no
 * record show an empty state" are questions a suite must answer without a
 * browser.
 *
 * ---- THE ONE RULE THE INSIDE INHERITS ----
 *
 * The hull outside and the decks inside read the SAME counters. There is no
 * second definition of how full a fuel tank is: `shipSystems.js` owns that,
 * and every station here names the system it mirrors. A second copy of "how
 * far along is propulsion" is how the outside and the inside end up disagreeing
 * in front of him, which is worse than either number alone.
 *
 * Empty is drawn as empty. A tank at zero is an empty tank with a label, never
 * a tank drawn part-full to look better — the rule `hqTruth.js` already holds
 * the HQ objects to.
 */

/** The two decks, top to bottom. Order is the ladder order. */
export const DECKS = [
  {
    id: 'flight-deck',
    name: 'Flight Deck',
    blurb: 'Where the ship is flown from.',
    /** Screen band this deck occupies when both are drawn in one frame. */
    band: { y0: 0, y1: 0.55 }
  },
  {
    id: 'hold',
    name: 'Cargo Hold',
    blurb: 'Fuel, stores, and everything he has earned.',
    band: { y0: 0.55, y1: 1 }
  }
];

export const HOME_DECK = 'flight-deck';

/**
 * ---- THE STATIONS ----
 *
 * `system` names the hull system this station is the inside of, and it is the
 * whole reason the two views cannot drift: the station draws whatever
 * `getShipStatus` says about that id.
 *
 * `reads` names the record behind a station that is NOT one of the seven
 * systems — the viewport reads the journey, the rank plate reads the rank.
 * Exactly one of `system` or `reads` is set on every station, and the guard
 * checks that, because a station with both would have two sources of truth and
 * a station with neither is decoration pretending to be a record.
 *
 * `u` and `v` are floor coordinates in that deck's own box, fed to
 * `projectFloor` from hqGeometry — the same projection the HQ uses, so the
 * cadet is the same size in both places and nothing had to be re-derived.
 */
export const STATIONS = [
  // ---- Flight deck ----
  {
    id: 'viewport',
    deck: 'flight-deck',
    name: 'Viewport',
    reads: 'journey',
    u: 0.5, v: 0.08,
    empty: 'Nothing on the scope yet — the first destination opens with your first mastered lesson.',
    doing: 'The window. Whatever you are flying toward is out there, and it gets bigger as you get closer.'
  },
  {
    id: 'pilot-seat',
    deck: 'flight-deck',
    name: "Pilot's Seat",
    reads: 'rank',
    u: 0.5, v: 0.52,
    empty: 'No rank yet. The seat is still yours.',
    doing: 'Your seat. The plate on the back carries your rank, and it changes when you earn the next one.'
  },
  {
    id: 'guidance-console',
    deck: 'flight-deck',
    name: 'Guidance Console',
    system: 'guidance',
    u: 0.20, v: 0.34,
    empty: 'Guidance is dark.',
    doing: 'Guidance and navigation. Every unit you finish lights another segment of it.'
  },
  {
    id: 'comms-station',
    deck: 'flight-deck',
    name: 'Comms Station',
    system: 'comms',
    u: 0.80, v: 0.34,
    empty: 'Comms is silent.',
    doing: 'Comms and mission logs. It carries what you have written this year.'
  },
  {
    id: 'sensor-bank',
    deck: 'flight-deck',
    name: 'Sensor Bank',
    system: 'sensors',
    u: 0.13, v: 0.70,
    empty: 'Sensors are down — nothing has come online yet.',
    doing: 'Sensors and instruments. Every book you finish brings another one online.'
  },
  {
    id: 'ladder-down',
    deck: 'flight-deck',
    name: 'Ladder',
    reads: 'deck-change',
    u: 0.87, v: 0.74,
    empty: null,
    doing: 'The ladder down to the hold.'
  },

  // ---- Cargo hold ----
  {
    id: 'ladder-up',
    deck: 'hold',
    name: 'Ladder',
    reads: 'deck-change',
    u: 0.87, v: 0.16,
    empty: null,
    doing: 'The ladder back up to the flight deck.'
  },
  {
    id: 'fuel-tanks',
    deck: 'hold',
    name: 'Fuel Tanks',
    system: 'propulsion',
    u: 0.22, v: 0.22,
    empty: 'The tanks are empty.',
    doing: 'Propulsion. Almost all of a launch vehicle is fuel tank, and these fill as you master the work that feeds it.'
  },
  {
    id: 'systems-locker',
    deck: 'hold',
    name: 'Systems Locker',
    system: 'onboard',
    u: 0.72, v: 0.22,
    empty: 'The locker is bare.',
    doing: 'Onboard systems. The boards and parts in here come from the work that feeds this system.'
  },
  {
    id: 'life-support-bay',
    deck: 'hold',
    name: 'Life Support Bay',
    system: 'life-support',
    u: 0.20, v: 0.62,
    empty: 'Life support is offline.',
    doing: 'Life support. Air, water and food — the part that keeps a crew alive, and the reason those blocks are on your timetable.'
  },
  {
    id: 'crew-quarters',
    deck: 'hold',
    name: 'Crew Quarters',
    system: 'morale',
    u: 0.78, v: 0.62,
    empty: 'Quiet in here — nobody has clocked off yet.',
    doing: 'Crew quarters. Long missions are mostly waiting, and morale is a real system on a real ship.'
  },
  {
    id: 'badge-rack',
    deck: 'hold',
    name: 'Badge Rack',
    reads: 'awards',
    u: 0.50, v: 0.86,
    empty: 'No badges racked yet.',
    doing: 'The rack. Every badge you have actually been given is here, and nothing you have not.'
  }
];

/** Every station on one deck, in the order it should be drawn (back to front). */
export function stationsOn(deckId) {
  return STATIONS.filter((s) => s.deck === deckId).sort((a, b) => a.v - b.v);
}

/** Which deck a station is on, or null for a name nobody defined. */
export function deckOf(stationId) {
  const found = STATIONS.find((s) => s.id === stationId);
  return found ? found.deck : null;
}

/** The other deck — what the ladder leads to. */
export function otherDeck(deckId) {
  const i = DECKS.findIndex((d) => d.id === deckId);
  if (i < 0) return HOME_DECK;
  return DECKS[(i + 1) % DECKS.length].id;
}

/**
 * Where he arrives on a deck: at the foot of that deck's ladder, so stepping
 * through puts him where he would actually be standing rather than teleporting
 * him to the middle of the room.
 */
/**
 * How far from a station's floor point counts as "not standing on it".
 *
 * Sideways matters more than depth: a console is about a fifth of the floor
 * wide and its label sits under it, while a step toward the viewer separates
 * the figure cleanly. Two rendered frames were needed to learn that a depth
 * gap alone does not stop him overlapping a label.
 */
export const ARRIVAL_CLEARANCE = { u: 0.14, v: 0.22 };

/** Is this spot clear of every station on the deck except the ladder? */
export function spotIsClear(deckId, spot) {
  return !STATIONS.some((s) => (
    s.deck === deckId
    && s.reads !== 'deck-change'
    && Math.abs(s.u - spot.u) < ARRIVAL_CLEARANCE.u
    && Math.abs(s.v - spot.v) < ARRIVAL_CLEARANCE.v
  ));
}

/**
 * ---- WHERE HE LANDS WHEN HE COMES OFF THE LADDER ----
 *
 * Beside it, on the floor, and not inside anything. The spot is SEARCHED
 * rather than computed: candidates near the ladder, in order of how close to
 * the ladder they are, and the first clear one wins. If the deck were ever so
 * full that nothing is clear, the last candidate is returned — a slightly
 * awkward arrival is better than refusing to enter the room, and the guard
 * asserts the search finds a clear spot on the decks that exist today.
 */
export function arrivalOn(deckId) {
  const ladder = STATIONS.find((s) => s.deck === deckId && s.reads === 'deck-change');
  if (!ladder) return { u: 0.5, v: 0.6 };

  const candidates = [];
  for (const du of [-0.16, -0.26, -0.08, -0.36]) {
    for (const dv of [0.14, 0.26, -0.1, 0.38]) {
      const u = Math.min(0.95, Math.max(0.05, ladder.u + du));
      const v = Math.min(0.92, Math.max(0.06, ladder.v + dv));
      candidates.push({ u, v });
    }
  }
  return candidates.find((c) => spotIsClear(deckId, c)) || candidates[candidates.length - 1];
}

/**
 * ---- WHAT A STATION SHOWS, FROM THE REAL RECORD ----
 *
 * Takes the hull status (`getShipStatus(stats)`) and the handful of other
 * records, and answers for one station: how full, what to write on it, and
 * whether it is empty. Injected rather than imported for the guard's sake.
 *
 * `pct` is null — not 0 — when there is no record. Null draws the empty state;
 * zero would draw an empty tank as though the tank had been measured. The
 * difference matters on the day a source breaks: a null says "nothing came
 * back", a zero says "he has done nothing", and those must never look alike.
 */
export function stationReading(station, { shipStatus = null, journey = null, rank = null, awards = [] } = {}) {
  if (!station) return null;
  if (station.reads === 'deck-change') return { kind: 'ladder', pct: null, label: station.name, empty: false };

  if (station.system) {
    const sys = (shipStatus?.systems || []).find((s) => s.id === station.system) || null;
    if (!sys) return { kind: 'system', pct: null, label: station.name, empty: true, note: station.empty };
    return {
      kind: 'system',
      pct: sys.pct,
      label: sys.name,
      detail: `${sys.current} of ${sys.target} · ${sys.subjectLabel}`,
      empty: sys.current === 0,
      /**
       * THE SUBJECT COMES FROM THE HULL, NOT FROM THIS FILE.
       *
       * The first draft wrote each subject's name into the empty sentence
       * here — "Propulsion runs on Science and Aerospace" — and
       * verify-no-learner caught it: this is platform code, and one school's
       * subject names must not live in it. `subjectLabel` is the Academy's
       * own word for what feeds that system, so the sentence is assembled
       * rather than written, and a school with different subjects gets its
       * own words for free.
       */
      note: sys.current === 0 ? `${station.empty} It runs on ${sys.subjectLabel}.` : null
    };
  }

  if (station.reads === 'journey') {
    if (!journey?.next && !journey?.current) return { kind: 'journey', pct: null, label: station.name, empty: true, note: station.empty };
    const dest = journey.next || journey.current;
    return {
      kind: 'journey',
      /**
       * `progress` is the journey's own 0..1 toward the next rank — the same
       * number the Journey map draws the route line with. Read, never
       * recomputed, for the same reason the tanks read the hull.
       */
      pct: typeof journey.progress === 'number' ? journey.progress : null,
      label: dest.name,
      detail: journey.next ? 'Heading for' : 'Arrived',
      empty: false
    };
  }

  if (station.reads === 'rank') {
    if (!rank?.name) return { kind: 'rank', pct: null, label: station.name, empty: true, note: station.empty };
    return { kind: 'rank', pct: null, label: rank.name, detail: rank.title || null, empty: false };
  }

  if (station.reads === 'awards') {
    const count = Array.isArray(awards) ? awards.length : 0;
    return {
      kind: 'awards',
      pct: null,
      label: station.name,
      detail: count > 0 ? `${count} earned` : null,
      empty: count === 0,
      note: count === 0 ? station.empty : null
    };
  }

  return null;
}

/** Every hull system id this interior claims to hold a station for. */
export function systemsInside() {
  return STATIONS.filter((s) => s.system).map((s) => s.system);
}
