// ---------------------------------------------------------------------------
// Aerospace Q4 2026-2027 Quarterly Cumulative Exam
//
// Same confirmed assessment framework as the Q1/Q2/Q3 exams: 20-25 items,
// covering ONLY material actually taught in this quarter. This exam covers
// exactly Q4's 10 lessons (SpaceX Innovations I/II, Future Space Travel
// I/II, Drones I/II, 3D Printing I/II, Engineering Design Process I/II)
// and nothing beyond them. Every question is grounded directly in that
// quarter's real lesson content (teachingText/example), not invented
// separately from what was actually taught.
//
// No `novaIntro` (skips straight to the question phase). Tagged
// `isQuarterlyExam: true` with `unlocksAfter` set to Q4's 10 lesson ids —
// a real mastery gate on the quarter.
//
// 22 items, mixing multiple-choice and true/false, matching the prior
// exams' exact question format and style.
// ---------------------------------------------------------------------------

export const aerospaceQ4Exam = {
  id: 'exam-aerospace-q4-2026-2027',
  subject: 'aerospace',
  tier: 1,
  quarter: 'Q4 2026-2027',
  title: 'Quarterly Exam — Innovation & Design (Q4)',
  theme: 'Cumulative exam covering SpaceX Innovations, Future Space Travel, Drones, 3D Printing, and the Engineering Design Process',
  isQuarterlyExam: true,
  unlocksAfter: [
    'ae7-spacex-innovations', 'ae7-spacex-innovations-2',
    'ae7-future-space-travel', 'ae7-future-space-travel-2',
    'ae7-drones', 'ae7-drones-2',
    'ae7-3d-printing', 'ae7-3d-printing-2',
    'ae7-engineering-design-process', 'ae7-engineering-design-process-2'
  ],
  questions: [
    {
      id: 'q1',
      type: 'choice',
      prompt: "What was SpaceX's major innovation that dramatically reduced the cost of spaceflight by landing and reusing rocket boosters?",
      choices: ['Reusable rocket boosters', 'Disposable rockets', 'Balloon-launched rockets', 'Only larger fuel tanks'],
      answer: 0,
      explanation: "SpaceX's reusable boosters, which land and fly again, significantly cut launch costs.",
      choiceFeedback: [null, 'Disposable, single-use rockets were the old standard SpaceX moved away from.', "SpaceX doesn't use balloon-launched rockets.", "Larger fuel tanks alone don't reduce cost the way reusability does."],
      xp: 10
    },
    {
      id: 'q2',
      type: 'choice',
      prompt: "In October 2024, SpaceX achieved a historic first with its Super Heavy booster. What was it?",
      choices: [
        "Catching the returning booster in mid-air using the launch tower's mechanical 'chopstick' arms",
        'Landing the booster in the ocean for the first time',
        'Launching a rocket to Mars for the first time',
        'Successfully refueling a rocket while still in flight'
      ],
      answer: 0,
      explanation: "SpaceX caught its returning Super Heavy booster using the launch tower's mechanical arms, a first for any rocket stage.",
      choiceFeedback: [null, 'Ocean splashdowns and droneship landings were already routine before this.', "This event was about landing method, not a Mars mission.", 'In-flight refueling is a separate, still-developing goal.'],
      xp: 10
    },
    {
      id: 'q3',
      type: 'choice',
      prompt: 'What is the name of SpaceX’s massive next-generation rocket system, designed to be fully reusable and selected by NASA (in modified form) as the Artemis Human Landing System?',
      choices: ['Starship', 'Falcon 9', 'Crew Dragon', 'Falcon Heavy'],
      answer: 0,
      explanation: 'Starship, designed for full reusability, was selected in modified form as the Human Landing System for Artemis III and IV.',
      choiceFeedback: [null, "Falcon 9 is SpaceX's earlier, smaller partially-reusable rocket.", 'Crew Dragon is a crew capsule for the ISS, not a lunar lander.', 'Falcon Heavy is a larger Falcon 9 variant, not the lunar lander.'],
      xp: 10
    },
    {
      id: 'q4',
      type: 'choice',
      prompt: "What is Crew Dragon, and roughly how many capsules has SpaceX built for its ISS missions?",
      choices: [
        "SpaceX's reusable astronaut capsule; only five have been built, each flying multiple missions",
        'A cargo-only capsule; dozens have been built and discarded after one use',
        "SpaceX's satellite internet service",
        "SpaceX's Mars-bound rocket"
      ],
      answer: 0,
      explanation: 'Crew Dragon carries astronauts to the ISS; SpaceX built just five capsules total and reuses each across multiple missions.',
      choiceFeedback: [null, 'Crew Dragon carries astronauts, and is reused rather than discarded after one flight.', 'That describes Starlink, a separate SpaceX system.', 'That describes Starship, a separate SpaceX vehicle.'],
      xp: 10
    },
    {
      id: 'q5',
      type: 'choice',
      prompt: "True or False: SpaceX's first successful landing of an orbital-class rocket booster at sea, on a floating droneship, happened before its first successful landing on solid ground.",
      choices: ['True', 'False'],
      answer: 1,
      explanation: 'False — the first successful booster landing was on solid ground in December 2015; the first successful droneship landing at sea followed a few months later, in April 2016.',
      choiceFeedback: ['This is backwards — the solid-ground landing came first, in December 2015. The statement is False.', null],
      xp: 10
    },
    {
      id: 'q6',
      type: 'choice',
      prompt: "What propulsion method uses electric fields to accelerate ionized gas, offering very high efficiency but low thrust, useful for long deep-space missions?",
      choices: ['Ion propulsion', 'Chemical propulsion', 'Solid rocket boosters', 'Jet engines'],
      answer: 0,
      explanation: 'Ion propulsion uses electric fields to accelerate ionized gas, trading low immediate thrust for very high long-term fuel efficiency.',
      choiceFeedback: [null, 'Chemical propulsion is the traditional high-thrust method — ion propulsion uses electric fields instead.', 'Solid rocket boosters burn solid chemical propellant, unrelated to ion propulsion.', 'Jet engines pull oxygen from the air and cannot function in the vacuum of space at all.'],
      xp: 10
    },
    {
      id: 'q7',
      type: 'choice',
      prompt: 'What propulsion concept uses the gentle pressure of sunlight against a large, thin reflective surface, eliminating the need for onboard propellant?',
      choices: ['A solar sail', 'A chemical rocket', 'A nuclear reactor', 'A gravity assist'],
      answer: 0,
      explanation: "A solar sail uses sunlight's pressure on a large reflective surface for propulsion, needing no onboard propellant at all.",
      choiceFeedback: [null, 'A chemical rocket burns onboard propellant, the opposite of a propellant-free solar sail.', 'A nuclear reactor is a different, separate propulsion concept (nuclear thermal propulsion).', 'A gravity assist uses a planet’s gravity and motion, not sunlight pressure.'],
      xp: 10
    },
    {
      id: 'q8',
      type: 'choice',
      prompt: "Why do astronauts on a long, deep-space mission (like to Mars) face significantly higher radiation exposure than ISS astronauts?",
      choices: [
        "They travel beyond the protection of Earth's magnetic field, which normally deflects much of that radiation",
        'There is actually no real difference in radiation exposure',
        'Deep space missions are always shorter, so this is not a real concern',
        "The Sun only produces radiation near Earth's orbit"
      ],
      answer: 0,
      explanation: "The ISS still orbits within Earth's protective magnetic field; deep-space astronauts lose that protection entirely.",
      choiceFeedback: [null, 'This is a genuine, well-documented engineering challenge, not a non-issue.', 'Deep space missions like a Mars trip are typically much longer, not shorter, than an ISS stay.', 'The Sun and deep space both produce radiation that reaches well beyond Earth’s orbit.'],
      xp: 10
    },
    {
      id: 'q9',
      type: 'choice',
      prompt: "True or False: NASA and DARPA's DRACO nuclear thermal propulsion program was cancelled in 2025-2026 due to cost concerns, showing that a scientifically sound concept doesn't automatically become funded, flying hardware.",
      choices: ['True', 'False'],
      answer: 0,
      explanation: 'True — DRACO was a real, funded effort that was cancelled, a documented example of the gap between a sound concept and an actually-flown program.',
      choiceFeedback: [null, 'This is a real, documented 2025-2026 event covered directly in the lesson — the statement is True.'],
      xp: 10
    },
    {
      id: 'q10',
      type: 'choice',
      prompt: 'What does the term UAV, often used for drones, stand for?',
      choices: ['Unmanned Aerial Vehicle', 'Universal Air Vessel', 'Under Automatic View', 'Unified Aviation Vehicle'],
      answer: 0,
      explanation: 'UAV stands for Unmanned Aerial Vehicle.',
      choiceFeedback: [
          null,
          "'Vessel' is a ship or container word. The V in UAV is Vehicle — the thing that actually flies.",
          "UAV describes what is missing from the aircraft, not what someone is watching. The U is Unmanned: nobody on board.",
          "'Unified' sounds official but names nothing. The U stands for Unmanned — that is the whole point of a drone."
        ],
      xp: 10
    },
    {
      id: 'q11',
      type: 'choice',
      prompt: 'What onboard sensor package detects a drone’s orientation and movement, feeding that data to the flight controller to keep it stable?',
      choices: ['An inertial measurement unit (IMU) / gyroscope', 'A solar panel', 'A parachute', 'A payload bay'],
      answer: 0,
      explanation: 'A gyroscope, or inertial measurement unit, detects orientation and movement, letting the flight controller make constant small corrections.',
      choiceFeedback: [null, 'A solar panel generates power, unrelated to sensing orientation.', 'A parachute is a landing-recovery device, unrelated to stabilization sensing.', 'A payload bay carries cargo or equipment, unrelated to stabilization sensing.'],
      xp: 10
    },
    {
      id: 'q12',
      type: 'choice',
      prompt: "How does a drone use GPS to fly autonomously and hold a steady position?",
      choices: [
        'By listening to signals from roughly 30 GPS satellites to pinpoint its own location and follow waypoints',
        'GPS is not actually used by drones at all',
        'A drone uses GPS only to take photographs, not for navigation',
        'GPS is only used after a drone has already landed'
      ],
      answer: 0,
      explanation: 'A drone uses GPS signals from roughly 30 orbiting satellites to pinpoint its location, hold position, follow waypoints, or auto-return.',
      choiceFeedback: [null, 'GPS is central to how most modern drones navigate autonomously.', 'GPS is a navigation system, not a photography tool.', 'GPS is used continuously during flight, not just after landing.'],
      xp: 10
    },
    {
      id: 'q13',
      type: 'choice',
      prompt: 'In the United States, what does a commercial drone operator need to hold before flying for pay, per FAA Part 107?',
      choices: ['A Part 107 Remote Pilot Certificate, earned by passing a knowledge test', 'No certification is required for any commercial drone flight', 'A traditional airplane pilot license only', 'A boating license'],
      answer: 0,
      explanation: 'Commercial drone operators must hold a Part 107 Remote Pilot Certificate, earned by passing an FAA knowledge test.',
      choiceFeedback: [null, 'The FAA specifically requires certification for commercial drone operation.', 'An airplane pilot license is a separate, different certification from a drone Remote Pilot Certificate.', 'A boating license has no relevance to drone regulation.'],
      xp: 10
    },
    {
      id: 'q14',
      type: 'choice',
      prompt: 'What is Remote ID, required for most registered drones since 2024?',
      choices: [
        "A requirement to broadcast the drone's identification and location in real time, like a digital license plate",
        'A requirement to paint a visible ID number on the drone body',
        'A one-time registration with no ongoing broadcast requirement',
        'A system that only applies to military drones'
      ],
      answer: 0,
      explanation: "Remote ID requires most registered drones to broadcast identification and location information in real time during flight.",
      choiceFeedback: [null, 'Remote ID is a real-time digital broadcast requirement, not just a painted physical marking.', 'Remote ID specifically requires an ongoing broadcast during flight, not just a one-time registration.', 'Remote ID applies to most registered civilian drones, not just military ones.'],
      xp: 10
    },
    {
      id: 'q15',
      type: 'choice',
      prompt: 'What is another common name for 3D printing, often used in engineering?',
      choices: ['Additive manufacturing', 'Subtractive manufacturing', 'Injection molding', 'Casting'],
      answer: 0,
      explanation: '3D printing is also called additive manufacturing, since it builds up material layer by layer rather than removing it.',
      choiceFeedback: [null, 'Subtractive manufacturing removes material, the opposite approach.', 'Injection molding forces liquid material into a mold shape, a different process.', 'Casting pours liquid material into a mold, a different traditional process.'],
      xp: 10
    },
    {
      id: 'q16',
      type: 'choice',
      prompt: "True or False: Real 3D-printed metal rocket engine parts have been successfully test-fired, withstanding temperatures around 6,000°F.",
      choices: ['True', 'False'],
      answer: 0,
      explanation: 'True — this is a documented demonstration that 3D-printed metal parts can handle the extreme conditions inside a working rocket engine.',
      choiceFeedback: [null, 'This is a real, documented fact from the lesson — the statement is True.'],
      xp: 10
    },
    {
      id: 'q17',
      type: 'choice',
      prompt: "Why do aerospace engineers specifically value 3D printing for parts like rocket engine fuel injectors and cooling channels?",
      choices: [
        "It can produce complex internal shapes traditional machining can't reach, and combine multiple parts into one, removing weak joints",
        'It is simply cheaper in every case, with no design advantage',
        '3D printing cannot actually produce metal parts, only plastic ones',
        'It has no real advantage over traditional machining for aerospace parts'
      ],
      answer: 0,
      explanation: "3D printing can create intricate internal geometry impossible with traditional machining, and combine several parts into one, eliminating weak joints and weld seams.",
      choiceFeedback: [null, 'The real advantage is about capability, not simply cost in every case.', 'Metal 3D printing (using metal powders melted by a laser or electron beam) is a real, established process.', 'There is a genuine, well-documented advantage for these specific aerospace applications.'],
      xp: 10
    },
    {
      id: 'q18',
      type: 'choice',
      prompt: 'What does "Design for Additive Manufacturing" (DfAM) mean?',
      choices: [
        'Designing a part specifically to take advantage of what 3D printing can do, rather than copying a traditionally-machined design',
        'Designing a part exactly the same way regardless of manufacturing method',
        'A rule that only applies to plastic parts, never metal',
        'A step that happens only after a part has already been manufactured'
      ],
      answer: 0,
      explanation: 'DfAM means designing specifically around what additive manufacturing enables, rather than reusing a design meant for traditional machining.',
      choiceFeedback: [null, 'DfAM specifically means designing differently, taking advantage of what 3D printing enables.', 'DfAM applies broadly, including metal additive manufacturing.', 'DfAM happens during the design phase, before manufacturing, not after.'],
      xp: 10
    },
    {
      id: 'q19',
      type: 'choice',
      prompt: 'What is typically the FIRST step in the engineering design process?',
      choices: ['Define the problem', 'Build the final product', 'Test the prototype', 'Sell the design'],
      answer: 0,
      explanation: 'Engineers start by clearly defining the problem, including requirements and constraints, before designing a solution.',
      choiceFeedback: [null, 'Building the final product comes near the end, not the beginning.', 'Testing a prototype comes after a design has already been created.', 'Selling a design comes after it has been fully developed and tested.'],
      xp: 10
    },
    {
      id: 'q20',
      type: 'choice',
      prompt: "What term describes repeating and refining a design through multiple rounds of testing and improvement?",
      choices: ['Iteration', 'Constraint', 'Prototype', 'Specification'],
      answer: 0,
      explanation: 'Iteration means testing a design and making repeated, refining improvements based on what testing reveals.',
      choiceFeedback: [null, 'A constraint is a real-world limitation on a design, like budget or materials — not the repeated-improvement process itself.', 'A prototype is an early working model, not the improvement process itself.', 'A specification is a written requirements document, not the improvement process itself.'],
      xp: 10
    },
    {
      id: 'q21',
      type: 'choice',
      prompt: "What is the difference between NASA's Preliminary Design Review (PDR) and Critical Design Review (CDR)?",
      choices: [
        'PDR confirms the basic design approach is sound before detailed work begins; CDR confirms a fully detailed, mature design is ready for manufacturing',
        'They are two names for exactly the same review, held at the same point in a project',
        'CDR always happens before PDR in a real project',
        'Neither review has any real connection to whether a project is allowed to proceed'
      ],
      answer: 0,
      explanation: 'PDR is an early checkpoint on the overall concept; CDR is a later checkpoint confirming a fully detailed design is ready to build.',
      choiceFeedback: [null, 'PDR and CDR check different levels of design maturity, at different points in a project.', 'PDR comes first, confirming the basic approach, before the more detailed CDR.', 'Passing each review is specifically what authorizes a project to move to its next, more expensive phase.'],
      xp: 10
    },
    {
      id: 'q22',
      type: 'choice',
      prompt: "Why do engineers value documentation throughout the design process, not just as an afterthought?",
      choices: [
        'It preserves the reasoning behind decisions so others can understand, maintain, or build on the design later',
        'Documentation is purely a formality with no real practical use',
        'Documentation is only useful during the very first design meeting',
        'Documentation replaces the need for design reviews entirely'
      ],
      answer: 0,
      explanation: 'Documentation preserves the reasoning behind design decisions, letting other engineers understand or maintain the design later without reverse-engineering it from scratch.',
      choiceFeedback: [null, 'Documentation has a genuine, ongoing practical purpose throughout a project’s life.', 'Documentation remains useful throughout a design’s life, including long after the project ends.', 'Documentation and design reviews are separate, complementary practices, not substitutes for each other.'],
      xp: 10
    }
  ]
};
