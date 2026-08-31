// ---------------------------------------------------------------------------
// Hands-on Aerospace Engineering projects — Tier 1. Straight from the master
// vision doc's "Hands-on STEM Projects" list, specifically the aerospace-
// flavored ones. Same infrastructure as scienceExperiments.js — reuses
// WritingPromptEngine/submitWritingEntry via category: 'experiment'.
// ---------------------------------------------------------------------------

export const aerospaceProjects = [
  {
    id: 'ae7-bottle-rocket',
    subject: 'aerospace',
    tier: 1,
    category: 'experiment',
    title: 'Bottle Rocket',
    theme: "Rocket Design — water-powered propulsion and Newton's Third Law",
    relatedLessonId: 'ae7-rocket-design',
    objectives: "Build and launch a water-powered bottle rocket to explore Newton's Third Law and rocket propulsion.",
    materials: [
      'An empty plastic soda bottle',
      'Water',
      'A bicycle pump with a needle valve adapter, or a bottle rocket launcher kit',
      'Cardboard for fins',
      'Tape'
    ],
    procedure: [
      'Attach cardboard fins to the bottle for stability.',
      'Fill the bottle about 1/3 full with water.',
      'Attach the bottle to a launcher and pressurize it with air using a pump.',
      'Stand well clear and launch the rocket.',
      'Observe the flight and measure how high or far it traveled.',
      'Try adjusting the amount of water and repeat.'
    ],
    safetyTips: [
      'This experiment should be done outdoors with adult supervision, using a proper launcher.',
      'Stand well clear of the launch area and never aim the rocket at people.'
    ],
    concepts: ["Newton's Third Law", 'Thrust', 'Propulsion', 'Pressure'],
    difficulty: 'Intermediate',
    estMinutes: 45,
    instructions:
      "How did changing the amount of water affect the rocket's flight? Explain the role of pressure and Newton's Third Law in launching the rocket.",
    minWords: 60,
    iterationPrompt:
      "Now try it again with one change — different water amount, a different fin design, or more air pressure. What did you change, and did the rocket fly higher or farther? Was the result what you expected?"
  },
  {
    id: 'ae7-parachute-drop',
    subject: 'aerospace',
    tier: 1,
    category: 'experiment',
    title: 'Parachute Drop Test',
    theme: 'Spacecraft & Reentry — slowing a falling object using drag',
    relatedLessonId: 'ae7-reentry-heat-shields',
    objectives: 'Design a parachute that slows a falling object as much as possible, exploring air resistance.',
    materials: [
      'Plastic bags or tissue paper',
      'String',
      'Tape',
      'A small weight (like a toy figure or a washer)',
      'A stopwatch'
    ],
    procedure: [
      'Cut a square of plastic bag or tissue paper for the parachute canopy.',
      'Attach four strings to the corners of the canopy.',
      'Tie the strings to a small weight.',
      'Drop the parachute from a consistent height and time how long it takes to land.',
      'Try different canopy sizes and materials and compare fall times.'
    ],
    safetyTips: [
      'Drop from a safe height with adult permission.',
      'Be careful on stairs or furniture used for height.'
    ],
    concepts: ['Air resistance (drag)', 'Gravity', 'Surface area'],
    difficulty: 'Beginner',
    estMinutes: 30,
    instructions:
      'Which parachute design fell the slowest, and why? Explain the relationship between canopy size and air resistance.',
    minWords: 50,
    iterationPrompt:
      "Build a second parachute with one deliberate change — a different canopy shape, material, or string length. Which version fell slower, and did the result match your prediction?"
  },
  {
    id: 'ae7-wind-tunnel',
    subject: 'aerospace',
    tier: 1,
    category: 'experiment',
    title: 'Simple Wind Tunnel Test',
    theme: 'Aerodynamics — visualizing airflow around different shapes',
    relatedLessonId: 'ae7-wind-tunnels-flight-testing',
    objectives: 'Build a basic wind tunnel to observe how airflow behaves around different shapes.',
    materials: [
      'A box (shoebox or larger)',
      'A fan',
      'Tape',
      'Small paper or foam shapes to test (cone, cube, sphere)',
      'Tissue paper strips'
    ],
    procedure: [
      'Cut a hole in one end of the box for the fan to blow air through, and a viewing window on top or the side.',
      'Tape tissue paper strips inside to visualize airflow direction.',
      'Place different small object shapes in the airflow path, one at a time.',
      'Turn on the fan and observe how the tissue strips move around each shape.',
      'Record which shapes create smoother versus more turbulent airflow.'
    ],
    safetyTips: ['Keep fingers and hair away from the fan blades.'],
    concepts: ['Aerodynamics', 'Drag', 'Streamlining', 'Turbulence'],
    difficulty: 'Intermediate',
    estMinutes: 40,
    instructions:
      'Which shape created the smoothest airflow, and which created the most turbulence? How does this relate to why airplanes and rockets are shaped the way they are?',
    minWords: 50,
    iterationPrompt:
      "Test one more shape, or angle your fan differently, and predict what you'll see before you try it. Was your prediction right? What does that tell you about streamlining?"
  }
];
