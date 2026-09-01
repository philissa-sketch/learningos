// ---------------------------------------------------------------------------
// Launch Director — real content source.
//
// Every staging, propellant, trajectory, and weight-budget option below is
// pulled directly from the real Aerospace lessons (`ae7-rocket-design` and
// `ae7-weight`, both Q2 2026-2027; `ae7-orbital-mechanics`, Q3 2026-2027, in
// `aerospace7.js`) — same standard as every other piece of content in this
// app, and the same pattern `nationCommandContent.js` already established:
// real definitions and real tradeoffs, with point totals as a game
// abstraction layered on TOP of the facts, never a substitute for them.
// ---------------------------------------------------------------------------

export const STAGING_OPTIONS = [
  {
    id: 'single-stage',
    name: 'Single-Stage Rocket',
    basedOn: 'The baseline case every staging comparison starts from',
    description:
      'One rocket body, one set of engines, no separation events — the whole vehicle (including every empty fuel tank) flies the entire mission.',
    points: { velocity: 1, payload: 1, simplicity: 3 },
    flavor:
      'Nothing to separate means nothing that can fail to separate — real simplicity. The real cost: it keeps hauling its own dead, empty tanks the whole way, so it reaches lower velocity and carries less payload than a staged design using the same total propellant.'
  },
  {
    id: 'two-stage',
    name: 'Two-Stage Rocket',
    basedOn: 'The real middle ground most orbital rockets actually use',
    description:
      'A first stage burns out and separates once its fuel is spent, so the second stage accelerates a real, lighter rocket for the rest of the flight.',
    points: { velocity: 2, payload: 2, simplicity: 2 },
    flavor:
      'Dropping the spent first stage genuinely reduces dead weight partway through the flight — a real, meaningful gain in reachable velocity and payload over a single stage, with one real separation event to get right.'
  },
  {
    id: 'three-stage',
    name: 'Three-Stage Rocket',
    basedOn: 'The Saturn V, which launched the real Apollo missions to the Moon',
    description:
      'Three stages fire, burn out, and separate in sequence — by the time the final stage fires, it is no longer carrying the dead weight of either earlier, already-spent stage.',
    points: { velocity: 3, payload: 3, simplicity: 0 },
    flavor:
      'The real Saturn V reached the Moon specifically because of this — the highest reachable velocity and payload of the three options, at the real cost of two separation events instead of one, and more that has to work correctly in sequence.'
  }
];

export const PROPELLANT_OPTIONS = [
  {
    id: 'solid-fuel',
    name: 'Solid-Fuel Engines',
    description:
      'A pre-cast solid propellant, simple to store for years and ready to fire quickly — but once ignited, it burns continuously until fully consumed, with no way to throttle or shut it off partway through.',
    points: { simplicity: 2, control: 0 },
    flavor: 'Real readiness and storability — the real tradeoff is zero in-flight control once it is lit.'
  },
  {
    id: 'liquid-fuel',
    name: 'Liquid-Fuel Engines',
    description:
      'Fuel and oxidizer stored separately as liquids and pumped into a combustion chamber — this allows real precise throttle control, and the engine can genuinely be stopped and restarted during flight.',
    points: { simplicity: 0, control: 3 },
    flavor: 'Real precision and restart capability — the real tradeoff is more complexity and propellant that typically has to be loaded shortly before launch.'
  },
  {
    id: 'both',
    name: 'Both — Solid Boosters + Liquid Main Engines',
    basedOn: 'The real Space Shuttle',
    description:
      'The Space Shuttle used two solid rocket boosters for a huge burst of real initial thrust at liftoff, combined with liquid-fuel main engines for precise control once airborne — each type used for exactly what it does best.',
    points: { simplicity: 1, control: 2 },
    flavor: 'A real, flight-proven combination — meaningful control without giving up all of solid fuel’s simple, powerful initial boost.'
  }
];

export const TRAJECTORY_EVENT = {
  scenario:
    'Your mission needs to reach a distant target with limited onboard propellant. How do you plan the trajectory?',
  options: [
    {
      id: 'direct-burn',
      name: 'Direct High-Thrust Burn',
      description: 'Burn hard and go straight there — simple to plan, but it spends real propellant the whole way.',
      points: { velocity: 1, simplicity: 2, control: 0 },
      resultText:
        'Real effect of a direct burn: the trajectory is simple to plan and fly, but every bit of speed comes from your own propellant — there is no free speed to borrow.'
    },
    {
      id: 'gravity-assist',
      name: 'Gravity-Assist Route',
      basedOn: "NASA's real Voyager 1 and 2 probes",
      description:
        "Use a planet's own real gravity and motion to change your spacecraft's speed and direction — essentially borrowing momentum from the planet for free.",
      points: { velocity: 3, simplicity: -1, control: 1 },
      resultText:
        'Real effect of a gravity assist: Voyager 1 and 2 gained genuine speed at each flyby of Jupiter, Saturn, and beyond — exactly how they reached deep space without carrying anywhere near enough fuel to do it on engines alone. The real cost: a much longer, more complex trajectory to plan correctly.'
    },
    {
      id: 'partial-assist',
      name: 'Partial Assist — One Flyby, Then a Direct Burn',
      description: 'Use a single real gravity assist for a genuine speed boost, then finish the trip on a direct burn.',
      points: { velocity: 2, simplicity: 1, control: 1 },
      resultText:
        'Real effect of a partial assist: a genuine, real speed gain from the one flyby, with a trajectory that stays simpler to plan than a multi-planet Voyager-style route.'
    }
  ]
};

// Real weight-budget parallel from `ae7-weight`/`ae7-weight-2`: useful load
// (MTOW minus empty weight) is split between fuel, payload, and structure —
// "every pound saved in structure is a pound available for payload or fuel"
// is the exact real tradeoff this turn is built on.
export const WEIGHT_BUDGET_CATEGORIES = [
  {
    id: 'fuelReserve',
    name: 'Fuel Reserve',
    description: 'Real propellant reserve — more fuel raises reachable velocity, the same way it does for any real rocket.',
    scoreField: 'velocity'
  },
  {
    id: 'payloadCapacity',
    name: 'Payload Capacity',
    description: 'Real payload space — crew, instruments, or cargo the mission actually delivers.',
    scoreField: 'payload'
  },
  {
    id: 'structuralReinforcement',
    name: 'Structural Reinforcement',
    description:
      'Real structural safety margin — the same "every pound saved in structure is a pound available elsewhere" tradeoff `ae7-weight-2` covers, just spent in the other direction here.',
    scoreField: 'safetyMargin'
  }
];

export const WEIGHT_BUDGET_TOTAL_POINTS = 100;

// Renamed from SCORE_LABELS: this Academy's two games each had one, and a slot
// cannot hold the same name twice. The importing component aliases it straight
// back to SCORE_LABELS, so nothing inside that component changed.
export const LAUNCH_SCORE_LABELS = {
  velocity: 'Velocity',
  payload: 'Payload Capacity',
  simplicity: 'Simplicity',
  control: 'Control',
  safetyMargin: 'Safety Margin'
};
