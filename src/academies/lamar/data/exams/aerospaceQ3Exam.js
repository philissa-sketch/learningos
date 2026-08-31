// ---------------------------------------------------------------------------
// Aerospace Q3 2026-2027 Quarterly Cumulative Exam
//
// Same confirmed assessment framework as the Q1/Q2 exams: 20-25 items,
// covering ONLY material actually taught in this quarter. This exam covers
// exactly Q3's 10 lessons (Orbital Mechanics I/II, Satellites I/II, NASA
// Missions I/II, Moon Missions I/II, Mars Missions I/II) and nothing
// beyond them. Every question is grounded directly in that quarter's real
// lesson content (teachingText/example), not invented separately from what
// was actually taught.
//
// No `novaIntro` (skips straight to the question phase). Tagged
// `isQuarterlyExam: true` with `unlocksAfter` set to Q3's 10 lesson ids —
// a real mastery gate on the quarter.
//
// 22 items, mixing multiple-choice and true/false, matching Q1/Q2's exact
// question format and style.
// ---------------------------------------------------------------------------

export const aerospaceQ3Exam = {
  id: 'exam-aerospace-q3-2026-2027',
  subject: 'aerospace',
  tier: 1,
  quarter: 'Q3 2026-2027',
  title: 'Quarterly Exam — Orbits & Missions (Q3)',
  theme: 'Cumulative exam covering Orbital Mechanics, Satellites, NASA Missions, Moon Missions, and Mars Missions',
  isQuarterlyExam: true,
  unlocksAfter: [
    'ae7-orbital-mechanics', 'ae7-orbital-mechanics-2',
    'ae7-satellites', 'ae7-satellites-2',
    'ae7-nasa-missions', 'ae7-nasa-missions-2',
    'ae7-moon-missions', 'ae7-moon-missions-2',
    'ae7-mars-missions', 'ae7-mars-missions-2'
  ],
  questions: [
    {
      id: 'q1',
      type: 'choice',
      prompt: 'What force keeps a satellite or spacecraft in a stable orbit around a planet?',
      choices: ["Gravity, balanced by the object's forward velocity", 'Thrust only', 'Magnetism', 'Air pressure'],
      answer: 0,
      explanation: "An orbit results from gravity constantly pulling an object while its forward velocity keeps it from falling straight down.",
      choiceFeedback: [null, 'Thrust might get an object into orbit, but a stable orbit is maintained by gravity balanced against velocity.', "Magnetism isn't what holds a satellite in orbit.", 'Most orbits are in the vacuum of space with no meaningful air pressure.'],
      xp: 10
    },
    {
      id: 'q2',
      type: 'choice',
      prompt: "True or False: A spacecraft in an elliptical orbit travels fastest at apoapsis, the farthest point from the body it orbits.",
      choices: ['True', 'False'],
      answer: 1,
      explanation: 'False — a spacecraft moves fastest at periapsis (closest point), where gravity pulls hardest, and slowest at apoapsis.',
      choiceFeedback: ['This is backwards — speed is highest at periapsis, not apoapsis. The statement is False.', null],
      xp: 10
    },
    {
      id: 'q3',
      type: 'choice',
      prompt: 'What is a "gravity assist" maneuver?',
      choices: [
        "Using a planet's gravity and motion to change a spacecraft's speed and direction without burning fuel",
        "Firing a spacecraft's engines at maximum power near a planet",
        "A technique used only for landing on a planet's surface",
        'A maneuver that has never actually been used in a real mission'
      ],
      answer: 0,
      explanation: "A gravity assist uses a planet's own motion and gravity to change a spacecraft's path, saving propellant.",
      choiceFeedback: [null, "A gravity assist uses the planet's gravity and motion, not primarily engine thrust.", 'Gravity assists are used for flybys, not specifically for landing.', 'Gravity assists have been used in real missions, including Voyager 2’s grand tour.'],
      xp: 10
    },
    {
      id: 'q4',
      type: 'choice',
      prompt: "According to Kepler's first law, what shape does every orbit take?",
      choices: ['An ellipse (with a circle as a special case)', 'A perfect circle, always', 'A straight line', 'A random, unpredictable curve'],
      answer: 0,
      explanation: "Kepler's first law states every orbit is an ellipse, with the orbited body at one focus.",
      choiceFeedback: [null, 'A perfect circle is only the special case of an ellipse with zero eccentricity.', "A straight line isn't a closed orbit at all.", "Orbits are precisely predictable using Kepler's laws, not random."],
      xp: 10
    },
    {
      id: 'q5',
      type: 'choice',
      prompt: 'Which real spacecraft used gravity assists at Jupiter, Saturn, and Uranus to reach Neptune in just 12 years?',
      choices: ['Voyager 2', 'Apollo 11', 'Perseverance', 'The James Webb Space Telescope'],
      answer: 0,
      explanation: "Voyager 2, launched in 1977, used gravity assists for its 'grand tour' of the outer solar system, reaching Neptune in just 12 years.",
      choiceFeedback: [null, 'Apollo 11 was the 1969 Moon landing mission.', 'Perseverance is a Mars rover, not an outer-planet flyby mission.', 'Webb is a space telescope in Earth orbit, not a planetary flyby mission.'],
      xp: 10
    },
    {
      id: 'q6',
      type: 'choice',
      prompt: 'A satellite that stays fixed above the same point on Earth, useful for weather and communications, is in ___ orbit.',
      choices: ['Geostationary orbit', 'Low Earth orbit', 'Polar orbit only', 'Elliptical orbit only'],
      answer: 0,
      explanation: "Geostationary orbit matches Earth's rotation, keeping the satellite fixed above one point.",
      choiceFeedback: [null, 'Low Earth orbit satellites move quickly relative to the ground, completing an orbit in about 90 minutes.', 'A polar orbit passes over the poles and does not stay fixed above one point.', 'An elliptical orbit varies in altitude and speed throughout the orbit.'],
      xp: 10
    },
    {
      id: 'q7',
      type: 'choice',
      prompt: 'What powers most satellites’ onboard systems while in orbit?',
      choices: ['Solar panels', 'Gasoline engines', 'Wind turbines', 'Nuclear reactors exclusively'],
      answer: 0,
      explanation: 'Most satellites use solar panels to generate electrical power from sunlight, paired with batteries for eclipse periods.',
      choiceFeedback: [null, "Gasoline engines require oxygen to burn fuel, which doesn't exist in the vacuum of space.", "There's no wind in the vacuum of space for a turbine to use.", 'While some deep-space missions use nuclear power, most satellites specifically use solar panels.'],
      xp: 10
    },
    {
      id: 'q8',
      type: 'choice',
      prompt: 'What term describes a group of many satellites working together to provide continuous coverage, such as GPS or Starlink?',
      choices: ['A constellation', 'A cluster only', 'A formation only', 'A network exclusively'],
      answer: 0,
      explanation: 'A satellite constellation is a coordinated group of satellites providing continuous coverage together.',
      choiceFeedback: [null, "'Cluster' isn't the standard aerospace term for this.", "'Formation' isn't the standard aerospace term for this.", "'Network' can describe the concept loosely, but the specific aerospace term is constellation."],
      xp: 10
    },
    {
      id: 'q9',
      type: 'choice',
      prompt: "True or False: If a dead satellite isn't deliberately deorbited, it can become dangerous space debris that collides with working spacecraft at thousands of miles per hour.",
      choices: ['True', 'False'],
      answer: 0,
      explanation: 'True — this is exactly why modern regulators require planned end-of-life deorbiting.',
      choiceFeedback: [null, 'This is a real, documented risk, which is why deorbit rules exist — the statement is True.'],
      xp: 10
    },
    {
      id: 'q10',
      type: 'choice',
      prompt: 'What does the acronym NASA stand for?',
      choices: ['National Aeronautics and Space Administration', 'North American Space Agency', 'National Astronomy and Space Association', 'National Air and Space Authority'],
      answer: 0,
      explanation: 'NASA stands for the National Aeronautics and Space Administration.',
      choiceFeedback: [null, "That's not the real name.", "NASA is about aeronautics broadly, and it's an Administration, not an Association.", "That's close but not exact."],
      xp: 10
    },
    {
      id: 'q11',
      type: 'choice',
      prompt: 'Which NASA program used partially reusable spacecraft to carry astronauts and cargo to orbit from 1981 to 2011?',
      choices: ['The Space Shuttle program', 'Apollo', 'Artemis', 'Project Mercury'],
      answer: 0,
      explanation: 'The Space Shuttle program flew from 1981 to 2011, using partially reusable spacecraft — a major shift from Apollo’s single-use capsules.',
      choiceFeedback: [null, 'Apollo used single-use capsules, not reusable spacecraft.', "Artemis is NASA's current Moon program, using the Orion capsule.", "Project Mercury was NASA's first crewed program, using single-use capsules."],
      xp: 10
    },
    {
      id: 'q12',
      type: 'choice',
      prompt: 'What was the name of NASA’s reusable orbiter lost during a 2003 reentry accident, when foam insulation damage let superheated gas destroy its wing?',
      choices: ['Columbia', 'Challenger', 'Discovery', 'Atlantis'],
      answer: 0,
      explanation: 'Columbia was lost during reentry on February 1, 2003, due to heat shield damage from a foam strike during launch.',
      choiceFeedback: [null, 'Challenger was lost in a different accident, 73 seconds after launch in 1986.', 'Discovery completed its missions and was later retired, not lost.', 'Atlantis completed its missions and was later retired, not lost.'],
      xp: 10
    },
    {
      id: 'q13',
      type: 'choice',
      prompt: 'What NASA program directly followed Mercury and developed skills like spacewalking and orbital docking needed for the Moon landings?',
      choices: ['Project Gemini', 'Apollo', 'Skylab', 'Artemis'],
      answer: 0,
      explanation: 'Project Gemini (1961-1966) developed spacewalking and docking techniques ahead of Apollo.',
      choiceFeedback: [null, 'Apollo came after Gemini and relied on the techniques Gemini proved.', 'Skylab was a later 1970s space station program, not the Mercury-to-Apollo bridge.', "Artemis is NASA's current program, many decades later."],
      xp: 10
    },
    {
      id: 'q14',
      type: 'choice',
      prompt: 'Who were the first two humans to walk on the Moon, during Apollo 11 in July 1969?',
      choices: ['Neil Armstrong and Buzz Aldrin', 'John Glenn and Alan Shepard', 'Michael Collins and Neil Armstrong', 'Jim Lovell and Buzz Aldrin'],
      answer: 0,
      explanation: 'Neil Armstrong and Buzz Aldrin walked on the Moon while Michael Collins orbited above in the command module.',
      choiceFeedback: [null, 'Glenn and Shepard were early Project Mercury astronauts.', 'Michael Collins stayed in orbit and did not walk on the surface.', 'Jim Lovell commanded Apollo 13, a later mission that never landed.'],
      xp: 10
    },
    {
      id: 'q15',
      type: 'choice',
      prompt: 'How many Apollo missions successfully landed astronauts on the Moon between 1969 and 1972?',
      choices: ['Six', 'Only one', 'All seventeen', 'None'],
      answer: 0,
      explanation: 'Six Apollo missions (11, 12, 14, 15, 16, and 17) successfully landed astronauts on the Moon.',
      choiceFeedback: [null, 'Apollo 11 was the first, but five more missions also successfully landed after it.', 'Not every Apollo mission was a landing attempt — Apollo 13 famously was not.', 'Six Apollo missions genuinely landed astronauts on the lunar surface.'],
      xp: 10
    },
    {
      id: 'q16',
      type: 'choice',
      prompt: 'What happened to Apollo 13, and why is it well known?',
      choices: [
        'An in-flight oxygen tank explosion forced the crew to abort the Moon landing, and they returned safely',
        'It was the first mission to successfully land on the Moon',
        'It was a fully successful mission with no complications',
        'The crew was lost and never returned to Earth'
      ],
      answer: 0,
      explanation: 'Apollo 13 suffered an oxygen tank explosion, forcing the crew to abort their landing and return safely to Earth.',
      choiceFeedback: [null, 'Apollo 11 was the first to land, in 1969.', 'Apollo 13 is famous precisely because of its in-flight emergency.', 'The Apollo 13 crew survived and returned safely to Earth.'],
      xp: 10
    },
    {
      id: 'q17',
      type: 'choice',
      prompt: "What is NASA's current program working to return astronauts to the Moon, which completed a crewed lunar flyby (Artemis II) in April 2026?",
      choices: ['Artemis', 'Apollo', 'Constellation', 'Gemini'],
      answer: 0,
      explanation: "Artemis is NASA's current Moon program; Artemis II flew a crewed lunar flyby in April 2026, without landing.",
      choiceFeedback: [null, 'Apollo was the earlier program that first landed humans on the Moon, 1969-1972.', 'Constellation was an earlier, now-cancelled NASA Moon program.', 'Gemini was a 1960s program developing spaceflight skills before Apollo.'],
      xp: 10
    },
    {
      id: 'q18',
      type: 'choice',
      prompt: "True or False: Artemis II, launched April 1, 2026, actually landed astronauts on the Moon's surface.",
      choices: ['True', 'False'],
      answer: 1,
      explanation: "False — Artemis II was a crewed flyby that tested Orion's systems on a path around the Moon; it did not land. The first crewed landing since Apollo is now planned for Artemis IV.",
      choiceFeedback: ["Artemis II specifically did not land — it was a flyby mission. The statement is False.", null],
      xp: 10
    },
    {
      id: 'q19',
      type: 'choice',
      prompt: "What type of vehicle has NASA used to explore the surface of Mars, including Curiosity and Perseverance?",
      choices: ['Robotic rovers', 'Crewed landers', 'Balloons', 'Submarines'],
      answer: 0,
      explanation: 'Curiosity and Perseverance are robotic rovers that explore the Martian surface; no human has ever landed on Mars.',
      choiceFeedback: [null, 'No human has ever landed on Mars — every Mars surface mission so far has been robotic.', 'Balloons are not how NASA has explored the Martian surface.', 'Submarines would have no purpose on the dry surface of Mars.'],
      xp: 10
    },
    {
      id: 'q20',
      type: 'choice',
      prompt: 'What is the name of the small experimental helicopter that flew alongside Perseverance, becoming the first aircraft to achieve powered, controlled flight on another planet?',
      choices: ['Ingenuity', 'Curiosity', 'Opportunity', 'Spirit'],
      answer: 0,
      explanation: 'Ingenuity flew 72 total flights on Mars over nearly three years, far beyond its original five-flight test goal.',
      choiceFeedback: [null, 'Curiosity is a Mars rover, not a helicopter.', 'Opportunity was an earlier Mars rover, not a helicopter.', 'Spirit was an earlier Mars rover, not a helicopter.'],
      xp: 10
    },
    {
      id: 'q21',
      type: 'choice',
      prompt: "Why does landing a rover on Mars require a complex, multi-stage sequence NASA calls the 'Seven Minutes of Terror,' rather than a parachute alone like on Earth?",
      choices: [
        "Mars's atmosphere is thick enough to require a heat shield, but too thin for a parachute alone to slow a heavy rover down safely",
        'Mars has no atmosphere at all, so no heat shield is needed',
        "Mars's atmosphere is thicker than Earth's, making parachutes work even better",
        'There is no real difficulty landing on Mars compared to Earth'
      ],
      answer: 0,
      explanation: "Mars's thin atmosphere creates real heat during entry but can't slow a heavy rover enough on its own, forcing a multi-stage sequence: heat shield and parachute, then retrorockets, then the sky crane.",
      choiceFeedback: [null, "Mars does have a real, if thin, atmosphere — thick enough to require a heat shield.", "Mars's atmosphere is actually far thinner than Earth's, not thicker.", 'This landing sequence exists precisely because of a genuine engineering difficulty.'],
      xp: 10
    },
    {
      id: 'q22',
      type: 'choice',
      prompt: "True or False: Because Mars is so far from Earth, mission control cannot control a rover's landing sequence in real time — by the time a signal confirming descent has started even reaches Earth, the rover has already either landed safely or crashed.",
      choices: ['True', 'False'],
      answer: 0,
      explanation: "True — this communication delay is exactly why NASA calls it the 'Seven Minutes of Terror': the entire landing must run automatically, with no possibility of human intervention.",
      choiceFeedback: [null, 'This is a real, well-documented constraint of interplanetary distance — the statement is True.'],
      xp: 10
    }
  ]
};
