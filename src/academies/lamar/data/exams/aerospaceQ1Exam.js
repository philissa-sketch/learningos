// ---------------------------------------------------------------------------
// Aerospace Q1 2026-2027 Quarterly Cumulative Exam
//
// Per the parent's confirmed assessment framework (see docs/PROJECT_LOG.md
// and the memory file `lesson-assessment-structure`): a subject-specific
// quarterly exam, 20-25 items, covering ONLY material actually taught in
// that quarter — never material from later quarters. This exam covers
// exactly Q1's 10 lessons (History of Flight I/II, How Airplanes Fly I/II,
// Lift I/II, Drag I/II, Thrust I/II) and nothing beyond them.
//
// ARCHITECTURE NOTE: this is deliberately structured as a lesson object
// with NO `novaIntro` (no teaching beats) — the existing lesson engine
// already skips straight to the question phase when novaIntro is absent
// (confirmed directly in FeedbackPanel.jsx before building this). That
// means this exam plugs into the exact same rendering, grading, and
// Lesson Roster UI already working for every other lesson — no new
// components needed. It's tagged `isQuarterlyExam: true` and
// `unlocksAfter` (the 10 lesson ids it covers) so the Roster/gating logic
// can require those lessons be completed first — this doubles as a real,
// quarter-level mastery gate, not just a label.
//
// Format, per the confirmed exam spec for Aerospace: 22 items (within the
// 20-25 range) — multiple-choice on flight physics principles, true/false
// on safety protocols and mission timelines, and diagram-style items
// (asking students to identify/reason about labeled parts) reframed as
// multiple-choice, since this app has no drag-and-drop diagram UI yet —
// noted honestly as a real format gap, not hidden.
// ---------------------------------------------------------------------------

export const aerospaceQ1Exam = {
  id: 'exam-aerospace-q1-2026-2027',
  subject: 'aerospace',
  tier: 1,
  quarter: 'Q1 2026-2027',
  title: 'Quarterly Exam — Flight Fundamentals (Q1)',
  theme: 'Cumulative exam covering History of Flight, How Airplanes Fly, Lift, Drag, and Thrust',
  isQuarterlyExam: true,
  unlocksAfter: [
    'ae7-history-of-flight', 'ae7-history-of-flight-2',
    'ae7-how-airplanes-fly', 'ae7-how-airplanes-fly-2',
    'ae7-lift', 'ae7-lift-2',
    'ae7-drag', 'ae7-drag-2',
    'ae7-thrust', 'ae7-thrust-2'
  ],
  questions: [
    {
      id: 'q1',
      type: 'choice',
      prompt: 'Who flew the first successful passenger-carrying hot air balloon, in 1783?',
      choices: ['The Montgolfier brothers', 'The Wright brothers', 'Otto Lilienthal', 'Chuck Yeager'],
      answer: 0,
      explanation: 'The Montgolfier brothers flew the first successful passenger-carrying hot air balloon in 1783.',
      choiceFeedback: [null, 'The Wright brothers achieved POWERED flight in 1903, 120 years later.', 'Lilienthal was a later 1890s glider pioneer.', 'Yeager broke the sound barrier in 1947, over a century later.'],
      xp: 10
    },
    {
      id: 'q2',
      type: 'choice',
      prompt: "True or False: Otto Lilienthal's death in a 1896 glider crash directly inspired the Wright brothers to begin their own study of aviation.",
      choices: ['True', 'False'],
      answer: 0,
      explanation: "True — news of Lilienthal's 1896 death directly inspired Orville and Wilbur Wright to start their own serious study of flight.",
      choiceFeedback: [null, 'This is a real, documented historical connection — it is True.'],
      xp: 10
    },
    {
      id: 'q3',
      type: 'choice',
      prompt: 'In what year did the Wright brothers achieve the first powered, controlled flight?',
      choices: ['1903', '1783', '1927', '1947'],
      answer: 0,
      explanation: 'The Wright brothers achieved powered flight in 1903.',
      choiceFeedback: [null, '1783 was the Montgolfier balloon flight, 120 years earlier.', '1927 was Lindbergh\u2019s transatlantic flight.', '1947 was Yeager breaking the sound barrier.'],
      xp: 10
    },
    {
      id: 'q4',
      type: 'choice',
      prompt: 'True or False: Concorde, which entered service in 1976, is still flying in regular commercial service today.',
      choices: ['True', 'False'],
      answer: 1,
      explanation: "False — Concorde's commercial service ended in 2003, and no supersonic passenger airliner has replaced it in regular service since.",
      choiceFeedback: ['Concorde\u2019s service actually ended in 2003 — it is not flying today.', null],
      xp: 10
    },
    {
      id: 'q5',
      type: 'choice',
      prompt: "What term describes smooth, orderly airflow over a wing's surface, as opposed to turbulent flow?",
      choices: ['Laminar flow', 'Vortex flow', 'Sonic flow', 'Wave flow'],
      answer: 0,
      explanation: 'Laminar flow describes smooth, orderly airflow over a surface.',
      choiceFeedback: [null, 'Vortex flow describes swirling, rotating air, like at a wingtip.', 'Sonic flow relates to speed relative to sound.', "'Wave flow' is not the standard term here."],
      xp: 10
    },
    {
      id: 'q6',
      type: 'choice',
      prompt: "Why do pilots increase an aircraft's angle of attack during takeoff and landing?",
      choices: [
        'To generate more lift and compensate for lower airspeed',
        'To reduce fuel consumption',
        'It has no real aerodynamic purpose',
        'To activate the landing gear'
      ],
      answer: 0,
      explanation: 'A higher angle of attack generates more lift, compensating for the lower airspeed during takeoff and landing.',
      choiceFeedback: [null, 'Fuel consumption is not the direct reason for this pitch change.', 'This has a real, specific aerodynamic purpose.', 'Landing gear operates independently of angle of attack.'],
      xp: 10
    },
    {
      id: 'q7',
      type: 'choice',
      prompt: 'What forms at a wingtip when high-pressure air below the wing curls around to the low-pressure air above?',
      choices: ['Wingtip vortices', 'Ground effect', 'The boundary layer', 'Shockwaves'],
      answer: 0,
      explanation: 'Wingtip vortices form as high-pressure air below curls around to the low-pressure air above the wingtip.',
      choiceFeedback: [null, 'Ground effect is what happens when these vortices interact with the ground.', 'The boundary layer is air clinging closest to the wing\u2019s surface, a different concept.', 'Shockwaves relate to supersonic/transonic effects.'],
      xp: 10
    },
    {
      id: 'q8',
      type: 'choice',
      prompt: 'True or False: Ground effect increases lift and reduces drag when an aircraft flies very close to the ground.',
      choices: ['True', 'False'],
      answer: 0,
      explanation: 'True — ground effect increases lift and reduces drag when an aircraft flies within roughly a wingspan\u2019s height of the ground.',
      choiceFeedback: [null, 'Ground effect is a real, documented aerodynamic phenomenon — this statement is True.'],
      xp: 10
    },
    {
      id: 'q9',
      type: 'choice',
      prompt: "According to Bernoulli's principle, as the speed of a fluid increases, what happens to its pressure?",
      choices: ['Pressure decreases', 'Pressure increases', 'Pressure stays the same', 'Pressure becomes zero'],
      answer: 0,
      explanation: "Bernoulli's principle states that faster-moving fluid has lower pressure.",
      choiceFeedback: [null, "It's the opposite — pressure DECREASES as speed increases.", 'Pressure genuinely changes with speed.', 'Pressure decreases relatively, not to literal zero.'],
      xp: 10
    },
    {
      id: 'q10',
      type: 'choice',
      prompt: 'What do airplane wing flaps do during takeoff and landing?',
      choices: [
        "Increase the wing's effective curvature and surface area to generate more lift at low speed",
        "Decrease the wing's surface area",
        'Increase engine thrust directly',
        'Have no real aerodynamic function'
      ],
      answer: 0,
      explanation: 'Flaps increase the wing\u2019s effective curvature and surface area, generating more lift at lower speeds.',
      choiceFeedback: [null, "It's the opposite — flaps INCREASE effective surface area.", 'Flaps are an aerodynamic surface, not an engine component.', 'Flaps have a real, well-documented aerodynamic function.'],
      xp: 10
    },
    {
      id: 'q11',
      type: 'choice',
      prompt: 'True or False: Lower air density at high altitude means MORE lift is generated at a given speed, all else equal.',
      choices: ['True', 'False'],
      answer: 1,
      explanation: "False — lower air density means fewer air molecules to generate lift, so lift DECREASES at a given speed.",
      // FIXED Aug 6, 2026: the null/text slots were backwards. `answer` is 1
      // ("False"), so slot 1 must be the null and slot 0 must carry the
      // feedback shown to a student who wrongly picks "True". As written
      // before, a student who answered True got NO explanation, and the
      // wrong-answer text was attached to the CORRECT choice. Same class of
      // bug caught and fixed in the Social Studies Q1 exam; this one was
      // missed then. scripts/verify-curriculum.mjs now checks every question
      // in every lesson and exam for it, so it cannot recur silently.
      choiceFeedback: [
        'Lower air density means FEWER air molecules for the wing to work on, so lift DECREASES at a given speed — the statement as written is False.',
        null
      ],
      xp: 10
    },
    {
      id: 'q12',
      type: 'choice',
      prompt: 'What term describes drag that becomes significant only near the speed of sound, from shockwave formation?',
      choices: ['Wave drag', 'Induced drag', 'Skin friction drag', 'Form drag'],
      answer: 0,
      explanation: 'Wave drag arises from shockwaves that form as an aircraft approaches the speed of sound.',
      choiceFeedback: [null, 'Induced drag is a side effect of generating lift, present at any speed.', 'Skin friction drag comes from air rubbing the surface at any speed.', "Form drag comes from an object's overall shape at any speed."],
      xp: 10
    },
    {
      id: 'q13',
      type: 'choice',
      prompt: 'Who first flew fast enough to break the sound barrier, in 1947?',
      choices: ['Chuck Yeager', 'The Wright brothers', 'Charles Lindbergh', 'Otto Lilienthal'],
      answer: 0,
      explanation: 'Chuck Yeager broke the sound barrier in 1947, flying the Bell X-1.',
      choiceFeedback: [null, 'The Wright brothers achieved powered flight in 1903, 44 years earlier.', "Lindbergh's famous flight was 1927.", 'Lilienthal was an 1890s glider pioneer.'],
      xp: 10
    },
    {
      id: 'q14',
      type: 'choice',
      prompt: 'What term describes the ratio of lift to drag for a given aircraft design?',
      choices: ['Lift-to-drag ratio', 'Thrust-to-weight ratio', 'Aspect ratio', 'Wing loading'],
      answer: 0,
      explanation: 'The lift-to-drag ratio measures how efficiently a design generates lift relative to the drag it creates.',
      choiceFeedback: [null, 'Thrust-to-weight compares thrust to weight, a different measure.', 'Aspect ratio describes wing shape, which influences but is not the same as lift-to-drag ratio.', 'Wing loading compares weight to wing area.'],
      xp: 10
    },
    {
      id: 'q15',
      type: 'choice',
      prompt: 'True or False: A glider is typically built with a HIGH aspect ratio (long, narrow wings) to reduce induced drag and maximize unpowered efficiency.',
      choices: ['True', 'False'],
      answer: 0,
      explanation: 'True — high aspect ratio wings reduce induced drag, which is exactly why gliders use long, narrow wings.',
      choiceFeedback: [null, 'This is a real, well-documented design choice — the statement is True.'],
      xp: 10
    },
    {
      id: 'q16',
      type: 'choice',
      prompt: 'What term describes engines that can adjust their thrust output during flight, rather than firing at one fixed power level?',
      choices: ['Throttleable engines', 'Fixed-thrust engines', 'Solid-fuel-only engines', 'Non-adjustable engines'],
      answer: 0,
      explanation: 'Throttleable engines can adjust thrust output during flight.',
      choiceFeedback: [null, "'Fixed-thrust' describes the OPPOSITE — engines locked at one power level.", 'Solid-fuel engines are usually the LEAST adjustable type.', 'The adjustable type is throttleable engines.'],
      xp: 10
    },
    {
      id: 'q17',
      type: 'choice',
      prompt: 'What system injects extra fuel into a jet engine\u2019s exhaust for a temporary, dramatic thrust boost?',
      choices: ['An afterburner', 'A bypass fan', 'A cold-gas thruster', 'A heat shield'],
      answer: 0,
      explanation: 'An afterburner injects extra fuel into the exhaust stream for a temporary thrust boost.',
      choiceFeedback: [null, 'A bypass fan pushes air around the engine core, unrelated to afterburning.', 'A cold-gas thruster is a simple, low-thrust maneuvering system.', 'A heat shield protects against reentry heat, unrelated to thrust boosting.'],
      xp: 10
    },
    {
      id: 'q18',
      type: 'choice',
      prompt: 'True or False: Thrust vectoring is especially important for rockets in the vacuum of space, since there is no air for aerodynamic control surfaces like a rudder to push against.',
      choices: ['True', 'False'],
      answer: 0,
      explanation: "True — with no air for control surfaces to use, thrust vectoring becomes the primary way rockets steer in the vacuum of space.",
      choiceFeedback: [null, 'This is a real, well-documented reason thrust vectoring matters so much for rockets — the statement is True.'],
      xp: 10
    },
    {
      id: 'q19',
      type: 'choice',
      prompt: 'Why might a multi-engine aircraft run different amounts of thrust on each side (asymmetric thrust)?',
      choices: [
        'To help control turning or compensate if one engine loses power',
        'To always fly in a straight line only',
        'To reduce total fuel consumption specifically',
        'To increase drag intentionally'
      ],
      answer: 0,
      explanation: 'Asymmetric thrust helps control turning or compensates for an engine failure.',
      choiceFeedback: [null, 'Asymmetric thrust is used to TURN or handle engine loss, not to fly perfectly straight.', 'Fuel savings is not the primary reason.', 'Increasing drag is not the goal.'],
      xp: 10
    },
    {
      id: 'q20',
      type: 'choice',
      prompt: 'What connects laminar flow/angle of attack to wingtip vortices/ground effect, as covered in How Airplanes Fly?',
      choices: [
        'Both trace back to the same pressure difference above and below the wing that creates lift',
        'They are four completely unrelated concepts',
        'They only apply to rockets, not airplanes',
        'They only matter during level cruise flight'
      ],
      answer: 0,
      explanation: 'All four concepts trace back to the same lift-generating pressure difference across the wing.',
      choiceFeedback: [null, 'These concepts are genuinely connected through the same underlying physics.', 'These are airplane wing aerodynamics concepts specifically.', 'Angle of attack and ground effect are especially relevant during takeoff and landing, not just cruise.'],
      xp: 10
    },
    {
      id: 'q21',
      type: 'choice',
      prompt: 'What real historical pattern connects the Montgolfier balloon, Lilienthal\u2019s gliders, and the Wright brothers\u2019 powered flight?',
      choices: [
        'Each milestone built directly on, or was inspired by, the one before it',
        'They are four completely unrelated, coincidental events',
        'They all happened in the exact same year',
        'None of these events actually influenced each other'
      ],
      answer: 0,
      explanation: 'Balloons proved flight was possible, gliders proved control was possible, and Lilienthal\u2019s death directly inspired the Wrights\u2014a real, connected chain of progress.',
      choiceFeedback: [null, 'These events are directly, historically connected, not coincidental.', 'These events span over a century, not one year.', 'There is a real, documented influence chain connecting these events.'],
      xp: 10
    },
    {
      id: 'q22',
      type: 'choice',
      prompt: 'True or False: A fighter jet engine typically uses a LOW bypass ratio because fighter jets prioritize maximum thrust and speed over fuel efficiency.',
      choices: ['True', 'False'],
      answer: 0,
      explanation: 'True — fighter jets accept a lower lift-to-drag/fuel-efficiency tradeoff from low-bypass engines in exchange for maximum thrust and speed.',
      choiceFeedback: [null, 'This is a real, deliberate engineering tradeoff — the statement is True.'],
      xp: 10
    }
  ]
};
