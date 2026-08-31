// ---------------------------------------------------------------------------
// Aerospace Q2 2026-2027 Quarterly Cumulative Exam
//
// Same confirmed assessment framework as the Q1 exam (see
// aerospaceQ1Exam.js's own header and docs/PROJECT_LOG.md): 20-25 items,
// covering ONLY material actually taught in this quarter — never material
// from later quarters. This exam covers exactly Q2's 10 lessons (Weight
// I/II, Aircraft Design I/II, Rocket Design I/II, Jet Engines I/II,
// Spacecraft I/II) and nothing beyond them. Every question is grounded
// directly in that quarter's real lesson content (teachingText/example),
// not invented separately from what was actually taught.
//
// Same architecture as Q1: no `novaIntro` (skips straight to the question
// phase, per LessonEngine/FeedbackPanel's existing behavior), tagged
// `isQuarterlyExam: true` with `unlocksAfter` set to Q2's 10 lesson ids —
// a real mastery gate on the quarter, not just a label.
//
// 22 items (within the 20-25 range), mixing multiple-choice and
// true/false, matching Q1's exact question format and style.
// ---------------------------------------------------------------------------

export const aerospaceQ2Exam = {
  id: 'exam-aerospace-q2-2026-2027',
  subject: 'aerospace',
  tier: 1,
  quarter: 'Q2 2026-2027',
  title: 'Quarterly Exam — Structures & Propulsion (Q2)',
  theme: 'Cumulative exam covering Weight, Aircraft Design, Rocket Design, Jet Engines, and Spacecraft',
  isQuarterlyExam: true,
  unlocksAfter: [
    'ae7-weight', 'ae7-weight-2',
    'ae7-aircraft-design', 'ae7-aircraft-design-2',
    'ae7-rocket-design', 'ae7-rocket-design-2',
    'ae7-jet-engines', 'ae7-jet-engines-2',
    'ae7-spacecraft', 'ae7-spacecraft-2'
  ],
  questions: [
    {
      id: 'q1',
      type: 'choice',
      prompt: "What must an aircraft's lift do relative to its weight to maintain level, constant-altitude flight?",
      choices: ['Equal it exactly', 'Exceed it', 'Be less than it', 'Ignore it entirely'],
      answer: 0,
      explanation: 'Level flight requires lift to exactly equal weight — more causes a climb, less causes a descent.',
      choiceFeedback: [null, 'If lift exceeded weight, the aircraft would climb, not fly level.', 'If lift were less than weight, the aircraft would descend, not fly level.', 'Lift and weight are directly, continuously related in flight.'],
      xp: 10
    },
    {
      id: 'q2',
      type: 'choice',
      prompt: "True or False: Propellant can make up 80-90% of a rocket's total launch weight, just to reach orbital speeds.",
      choices: ['True', 'False'],
      answer: 0,
      explanation: 'True — reaching orbit requires an enormous amount of propellant relative to the rest of the rocket.',
      choiceFeedback: [null, 'This is a real, documented figure — the statement is True.'],
      xp: 10
    },
    {
      id: 'q3',
      type: 'choice',
      prompt: "An aircraft's center of gravity sits too far forward. What is the main effect?",
      choices: [
        'The aircraft becomes nose-heavy — more stable, but less fuel-efficient',
        'The aircraft becomes impossible to fly under any circumstances',
        'The aircraft becomes tail-heavy',
        'There is no meaningful effect'
      ],
      answer: 0,
      explanation: 'A too-far-forward center of gravity makes an aircraft nose-heavy: more stable and easier to recover from a stall, but less efficient.',
      choiceFeedback: [null, 'A forward CG within limits is flyable — just less efficient and more nose-heavy.', "That's the opposite of what a forward CG causes.", 'Center of gravity location has real, well-documented effects on flight.'],
      xp: 10
    },
    {
      id: 'q4',
      type: 'choice',
      prompt: 'What term describes the certified maximum weight at which an aircraft is allowed to attempt takeoff?',
      choices: ['Maximum takeoff weight (MTOW)', 'Empty weight', 'Useful load', 'Center of gravity'],
      answer: 0,
      explanation: 'MTOW is the certified maximum weight an aircraft is allowed to have at takeoff.',
      choiceFeedback: [null, 'Empty weight is the opposite end of the scale — the structure alone with nothing loaded.', 'Useful load is the difference between MTOW and empty weight, not the max weight itself.', 'Center of gravity is about weight distribution, not the maximum total weight.'],
      xp: 10
    },
    {
      id: 'q5',
      type: 'choice',
      prompt: "True or False: Maximum landing weight (MLW) is typically LOWER than MTOW, because aircraft are expected to have burned fuel between takeoff and landing.",
      choices: ['True', 'False'],
      answer: 0,
      explanation: 'True — the structure and landing gear aren’t certified to absorb a landing impact at the full, unburned takeoff weight.',
      choiceFeedback: [null, 'This is a real, well-documented certification distinction — the statement is True.'],
      xp: 10
    },
    {
      id: 'q6',
      type: 'choice',
      prompt: "What is the tail assembly of an aircraft, which provides stability and control (not lift), called?",
      choices: ['The empennage', 'The fuselage', 'The nacelle', 'The spar'],
      answer: 0,
      explanation: 'The empennage is the tail assembly, providing stability and control.',
      choiceFeedback: [null, 'The fuselage is the main body, not the tail.', 'A nacelle is the streamlined housing around an engine.', 'A spar is an internal structural beam in a wing or tail surface.'],
      xp: 10
    },
    {
      id: 'q7',
      type: 'choice',
      prompt: 'What testing method applies simulated forces to an aircraft structure — often to the point of failure — to verify it can withstand real flight loads?',
      choices: ['Static load testing', 'Wind tunnel testing', 'Flutter testing only', 'Flight testing only'],
      answer: 0,
      explanation: 'Static load testing applies simulated forces to a structure to confirm it can survive real flight loads.',
      choiceFeedback: [null, 'Wind tunnel testing studies airflow, not structural strength under load.', 'Flutter testing checks for dangerous vibration specifically, a different risk category.', 'Flight testing comes only after ground tests like this one have already cleared the design.'],
      xp: 10
    },
    {
      id: 'q8',
      type: 'choice',
      prompt: "True or False: Flutter is a normal, harmless vibration every aircraft experiences equally in flight.",
      choices: ['True', 'False'],
      answer: 1,
      explanation: 'False — flutter is an unstable, self-reinforcing vibration that can lead to structural failure if not caught and controlled.',
      choiceFeedback: ['Flutter is a genuine, dangerous structural risk, not a normal harmless vibration — the statement is False.', null],
      xp: 10
    },
    {
      id: 'q9',
      type: 'choice',
      prompt: 'Which three control surfaces manage an aircraft’s roll, pitch, and yaw, in that order?',
      choices: ['Ailerons, elevators, rudder', 'Rudder, ailerons, elevators', 'Flaps, spoilers, slats', 'Spars, ribs, longerons'],
      answer: 0,
      explanation: 'Ailerons control roll, elevators control pitch, and the rudder controls yaw.',
      choiceFeedback: [null, 'The order/pairing is genuinely ailerons=roll, elevators=pitch, rudder=yaw.', 'Flaps and spoilers affect lift/drag, not the three-axis rotation this question asks about.', 'Spars, ribs, and longerons are structural components, not control surfaces.'],
      xp: 10
    },
    {
      id: 'q10',
      type: 'choice',
      prompt: 'What does it mean for an aircraft to have built-in "stability" as a design property?',
      choices: [
        'After a disturbance like a gust of wind, it naturally tends to return toward level flight on its own',
        'It can never be knocked off level flight by wind',
        'It requires constant pilot input to stay level',
        'It has no relationship to how the aircraft is shaped or balanced'
      ],
      answer: 0,
      explanation: 'A stable aircraft naturally tends to return toward level flight after a disturbance, without pilot input.',
      choiceFeedback: [null, 'Even a stable aircraft can be disturbed — stability is about how it responds afterward, not immunity to disturbance.', "That's the opposite of what stability means — a stable aircraft needs LESS constant correction, not more.", 'Stability comes directly from an aircraft’s shape and balance, like the dart example from the lesson.'],
      xp: 10
    },
    {
      id: 'q11',
      type: 'choice',
      prompt: 'Why does a multi-stage rocket separate into sections and drop used fuel tanks during flight?',
      choices: [
        'An empty stage is dead weight, and dropping it lets the remaining engines accelerate a lighter rocket',
        'It is purely a cost-saving measure with no performance benefit',
        'It has no real engineering purpose, just tradition',
        'It makes the rocket heavier, which improves stability'
      ],
      answer: 0,
      explanation: 'Dropping empty, spent stages reduces dead weight, letting the rocket reach higher velocity and altitude with less total propellant.',
      choiceFeedback: [null, 'Staging has a real, direct performance benefit, not just a cost angle.', 'Staging is a deliberate, well-documented engineering strategy, not tradition.', "It's the opposite — staging REDUCES weight, it doesn't add it."],
      xp: 10
    },
    {
      id: 'q12',
      type: 'choice',
      prompt: 'What is the key difference between a solid-fuel rocket engine and a liquid-fuel rocket engine?',
      choices: [
        'Solid-fuel engines cannot be throttled or shut off once ignited; liquid-fuel engines can be precisely controlled and restarted',
        'Liquid-fuel engines cannot be throttled or shut off once ignited; solid-fuel engines can be precisely controlled',
        'There is no real difference between the two types',
        'Solid-fuel engines are always more powerful than liquid-fuel engines'
      ],
      answer: 0,
      explanation: 'Solid-fuel engines burn continuously once ignited with no way to throttle or stop them; liquid-fuel engines allow precise throttle control and restart.',
      choiceFeedback: [
        null,
        "That's backwards — it's the solid-fuel engine that can't be throttled or stopped, not the liquid-fuel one.",
        'There is a real, significant difference between the two — this is a key design tradeoff.',
        'Raw power depends on engine size and design, not simply which propellant type is used.'
      ],
      xp: 10
    },
    {
      id: 'q13',
      type: 'choice',
      prompt: "True or False: The Space Shuttle used solid rocket boosters for a huge initial thrust burst at liftoff, combined with liquid-fuel main engines for precise control once airborne.",
      choices: ['True', 'False'],
      answer: 0,
      explanation: 'True — the Space Shuttle used both propellant types together, each for what it does best.',
      choiceFeedback: [null, 'This is a real, documented design choice — the statement is True.'],
      xp: 10
    },
    {
      id: 'q14',
      type: 'choice',
      prompt: 'What does "specific impulse" measure about a rocket engine?',
      choices: [
        'How efficiently the engine uses its propellant — the rocket equivalent of miles per gallon',
        'The total weight of the rocket at launch',
        'How many stages the rocket has',
        'The color of the rocket exhaust'
      ],
      answer: 0,
      explanation: 'Specific impulse measures how efficiently an engine uses propellant — a higher value means less fuel needed for the same speed.',
      choiceFeedback: [null, 'Total launch weight is a separate measurement (mass ratio relates to this, not specific impulse directly).', 'Number of stages is a design choice, not what specific impulse measures.', 'Exhaust color is not an efficiency measurement used in rocket design.'],
      xp: 10
    },
    {
      id: 'q15',
      type: 'choice',
      prompt: 'Why does a rocket have to carry its own oxidizer, unlike a jet engine?',
      choices: [
        "Once a rocket leaves the atmosphere (or climbs high enough), there's no air to draw oxygen from",
        'Oxidizer makes the rocket lighter overall',
        'Jet engines also carry their own oxidizer',
        'Rockets never actually need oxygen to burn fuel'
      ],
      answer: 0,
      explanation: 'A jet engine pulls oxygen from surrounding air, but a rocket needs its own oxidizer since there’s no air in space or at very high altitude.',
      choiceFeedback: [null, 'Oxidizer adds weight — it’s carried out of necessity, not to save weight.', "That's the opposite — jet engines pull oxygen from the air and don't carry their own.", 'Rocket engines still require oxygen (via their oxidizer) to burn fuel, just like any combustion.'],
      xp: 10
    },
    {
      id: 'q16',
      type: 'choice',
      prompt: 'In a jet engine, what powers the compressor, keeping the whole cycle running continuously?',
      choices: [
        'The turbine, which extracts energy from the hot exhaust gas and shares a rotating shaft with the compressor',
        'A separate battery-powered motor',
        'The nozzle',
        'The combustion chamber directly, with no turbine involved'
      ],
      answer: 0,
      explanation: 'The turbine extracts energy from the hot exhaust and, sharing a shaft with the compressor, powers it — sustaining the engine’s cycle.',
      choiceFeedback: [null, 'Jet engines are not powered by a separate battery motor — the turbine drives the compressor.', 'The nozzle accelerates exhaust for thrust; it doesn’t power the compressor.', 'The turbine is specifically what connects combustion energy back to the compressor.'],
      xp: 10
    },
    {
      id: 'q17',
      type: 'choice',
      prompt: 'Why do most modern subsonic passenger aircraft use high-bypass turbofan engines?',
      choices: [
        'High bypass ratio is significantly more fuel-efficient at typical airliner cruise speeds',
        'High bypass engines are always louder, which airlines prefer',
        'High bypass engines cannot produce enough thrust for airliners',
        'Bypass ratio has no effect on fuel efficiency'
      ],
      answer: 0,
      explanation: 'High-bypass turbofans are significantly more fuel-efficient at airliner cruise speeds, which is why they dominate commercial aviation.',
      choiceFeedback: [null, 'High-bypass engines are actually QUIETER than low-bypass engines, not louder.', 'High-bypass turbofans produce plenty of thrust for airliners — that’s exactly why they’re used.', 'Bypass ratio has a major, well-documented effect on fuel efficiency.'],
      xp: 10
    },
    {
      id: 'q18',
      type: 'choice',
      prompt: "True or False: A fighter jet typically uses a LOW bypass ratio engine because it prioritizes maximum thrust and speed over fuel efficiency.",
      choices: ['True', 'False'],
      answer: 0,
      explanation: 'True — fighter jets accept lower fuel efficiency from low-bypass engines in exchange for maximum thrust and speed.',
      choiceFeedback: [null, 'This is a real, deliberate engineering tradeoff — the statement is True.'],
      xp: 10
    },
    {
      id: 'q19',
      type: 'choice',
      prompt: 'Roughly how fast does a spacecraft typically travel during reentry from low Earth orbit, generating extreme heat?',
      choices: ['Roughly 17,500 mph', 'Roughly 100 mph', 'Roughly 1,000 mph', 'Roughly 500,000 mph'],
      answer: 0,
      explanation: 'Reentry from low Earth orbit happens at roughly 17,500 mph, generating temperatures that can exceed 3,000°F.',
      choiceFeedback: [null, 'That vastly understates real orbital reentry speed.', 'That still significantly understates the real reentry speed.', 'That vastly overstates real reentry speed — no spacecraft reenters anywhere near that fast.'],
      xp: 10
    },
    {
      id: 'q20',
      type: 'choice',
      prompt: 'How does an ablative heat shield protect a spacecraft during reentry?',
      choices: [
        "Its outer material chars, melts, and burns away in a controlled way, carrying heat away with it",
        'It reflects 100% of reentry heat with no material loss at all',
        'It actively cools itself using onboard refrigeration',
        'It has no real protective function — it is purely for appearance'
      ],
      answer: 0,
      explanation: 'Ablative shields work by sacrifice — the outer material burns away in a controlled, predictable way, carrying heat with it.',
      choiceFeedback: [null, 'Ablative shields work by controlled material loss, not by reflecting all heat with none lost.', 'Ablative heat shields are passive, material-based protection, not active refrigeration.', 'Ablative heat shields have a real, essential protective function.'],
      xp: 10
    },
    {
      id: 'q21',
      type: 'choice',
      prompt: 'What is the key difference between a spacecraft’s "attitude" and its "altitude"?',
      choices: [
        'Attitude is which direction it’s pointing; altitude is its height/distance',
        'They are two words for the exact same thing',
        'Attitude refers to height; altitude refers to direction',
        'Neither term applies to spacecraft, only aircraft'
      ],
      answer: 0,
      explanation: 'Attitude control is about orientation/direction, while altitude is about height — an easy pair of terms to confuse.',
      choiceFeedback: [null, 'These are genuinely different concepts, despite sounding similar.', "That's the reverse of the real definitions — attitude is direction, altitude is height.", 'Both terms are used for spacecraft, not just aircraft.'],
      xp: 10
    },
    {
      id: 'q22',
      type: 'choice',
      prompt: "True or False: A crewed spacecraft's life support, attitude control, and thermal control systems all run continuously and simultaneously for the whole length of a mission, not just at certain moments.",
      choices: ['True', 'False'],
      answer: 0,
      explanation: 'True — none of these systems can simply be "finished" and set aside; mission operations track all of them around the clock.',
      choiceFeedback: [null, 'This is exactly how these systems actually operate — the statement is True.'],
      xp: 10
    }
  ]
};
