// ---------------------------------------------------------------------------
// Hands-on Science experiments — Tier 1. Per the master vision doc: "Hands-on
// experiments should use affordable household materials whenever possible."
// Reuses the Writing Journal's submission infrastructure (WritingPromptEngine,
// submitWritingEntry) for the reflection question, since that's already a
// working free-text-response system — these are NOT auto-graded, same
// reasoning as writing prompts. category: 'experiment' distinguishes them
// for the Writing Journal's grouping and for WritingPromptEngine's extra
// field rendering (materials/procedure/safety/concepts).
// ---------------------------------------------------------------------------

export const scienceExperiments = [
  {
    id: 'sci7-paper-airplane',
    subject: 'science',
    tier: 1,
    category: 'experiment',
    title: 'Paper Airplane Distance Test',
    theme: 'Aerodynamics — testing how design affects flight distance',
    relatedLessonId: 'ae7-how-airplanes-fly',
    objectives: 'Test how different paper airplane designs affect flight distance.',
    materials: ['Several sheets of paper', 'Measuring tape or ruler', 'Tape (optional)'],
    procedure: [
      'Fold three different paper airplane designs (for example, a dart, a glider, and a wide-wing design).',
      'Choose a consistent launch point and use the same throwing motion each time.',
      'Throw each design three times and measure the distance traveled each time.',
      'Record the results in a table.',
      'Calculate the average distance for each design.',
      'Determine which design flew the farthest on average.'
    ],
    safetyTips: ['Launch in a clear, open area away from people and breakable objects.'],
    concepts: ['Aerodynamics', 'Lift', 'Drag', 'Thrust', 'Weight'],
    difficulty: 'Beginner',
    estMinutes: 30,
    instructions:
      'Which design flew farthest, and why do you think its shape performed better? Connect your answer to the four forces of flight (lift, drag, thrust, weight).',
    minWords: 60,
    iterationPrompt:
      "Fold a fourth design, changing one thing on purpose based on what you learned (wing shape, weight, or fold style). Did it fly farther or shorter than your best design, and why do you think that happened?"
  },
  {
    id: 'sci7-balloon-rocket',
    subject: 'science',
    tier: 1,
    category: 'experiment',
    title: 'Balloon Rocket Race',
    theme: "Forces and Motion — demonstrating Newton's Third Law",
    relatedLessonId: 'ae7-thrust',
    objectives: "Demonstrate Newton's Third Law using a balloon-powered rocket on a string.",
    materials: ['A balloon', 'A plastic straw', 'String (10+ feet)', 'Tape'],
    procedure: [
      'Thread the string through the straw.',
      "Tie each end of the string to a fixed point (like two chairs) so it's taut.",
      'Inflate the balloon but do not tie it off — pinch it closed.',
      'Tape the balloon to the straw.',
      'Release the balloon and observe it travel along the string.',
      'Measure how far or how fast it travels, and repeat with different amounts of air.'
    ],
    safetyTips: ["Make sure the path is clear, and don't inflate the balloon past its safe limit."],
    concepts: ["Newton's Third Law", 'Thrust', 'Propulsion'],
    difficulty: 'Beginner',
    estMinutes: 20,
    instructions:
      "Explain why the balloon moved forward when air rushed out the back. Which of Newton's Laws does this demonstrate, and how is it similar to how a real rocket works?",
    minWords: 60,
    iterationPrompt:
      "Run it again with more or less air in the balloon, or a longer straw. What changed about the speed or distance, and does that match what you'd expect from a real rocket carrying more or less fuel?"
  },
  {
    id: 'sci7-egg-drop',
    subject: 'science',
    tier: 1,
    category: 'experiment',
    title: 'Egg Drop Challenge',
    theme: 'Engineering Design — protecting a fragile object from impact',
    relatedLessonId: 'ae7-engineering-design-process',
    objectives: 'Design a protective structure that keeps an egg from breaking when dropped.',
    materials: [
      'A raw egg',
      'Straws',
      'Cotton balls',
      'Tape',
      'Cardboard',
      'Plastic bags',
      'Rubber bands (any combination of household materials you choose)'
    ],
    procedure: [
      'Design a structure or container to protect the egg from impact.',
      'Build your design using only approved household materials.',
      'Drop your protected egg from a set height (with adult permission and supervision).',
      'Check whether the egg survived.',
      "If it broke, examine why and consider what you'd change."
    ],
    safetyTips: [
      'Get adult permission and supervision before dropping anything from height.',
      'Drop over an easy-to-clean surface, like outdoors or over a tarp.'
    ],
    concepts: ['Engineering design process', 'Impact force', 'Cushioning', 'Iteration'],
    difficulty: 'Intermediate',
    estMinutes: 45,
    instructions:
      "Describe your design and why you chose those materials. If the egg broke, what would you change in your next design? If it survived, what part of your design do you think worked best?",
    minWords: 60,
    iterationPrompt:
      "Build a second version using what you learned from the first drop — same materials, different design. Did the egg survive this time? Explain exactly what you changed and why."
  },
  {
    id: 'sci7-baking-soda-vinegar',
    subject: 'science',
    tier: 1,
    category: 'experiment',
    title: 'Baking Soda & Vinegar Reaction',
    theme: 'Chemistry — observing a chemical reaction',
    objectives: 'Observe a chemical reaction and identify the reactants, products, and evidence of a reaction.',
    materials: ['Baking soda', 'Vinegar', 'A small container or bottle', 'A balloon (optional)'],
    procedure: [
      'Pour a small amount of vinegar into a container.',
      'Add a spoonful of baking soda.',
      'Observe what happens (bubbling, fizzing).',
      "Optional: stretch a balloon over the container's opening before adding baking soda to catch the gas produced.",
      'Record your observations.'
    ],
    safetyTips: ['Work over a sink or tray in case of overflow.', 'Avoid getting the mixture in your eyes.'],
    concepts: ['Chemical reactions', 'Reactants and products', 'Gas production (carbon dioxide)'],
    difficulty: 'Beginner',
    estMinutes: 15,
    instructions:
      'What evidence did you observe that a chemical reaction occurred? What gas do you think was produced, and how could you test your idea?',
    minWords: 50,
    iterationPrompt:
      "Try it again with a different amount of baking soda or vinegar. What changed about how fast or how big the reaction was? Does more of one ingredient always mean a bigger reaction?"
  },
  {
    id: 'sci7-homemade-compass',
    subject: 'science',
    tier: 1,
    category: 'experiment',
    title: 'Homemade Compass',
    theme: "Magnetism — detecting Earth's magnetic field",
    objectives: "Build a simple compass using a magnetized needle to demonstrate magnetism and Earth's magnetic field.",
    materials: ['A sewing needle', 'A magnet', 'A small piece of cork or foam', 'A bowl of water'],
    procedure: [
      'Rub the needle against the magnet in one direction only (not back and forth) about 30-40 times to magnetize it.',
      'Carefully push the needle through the cork or foam so it lies flat.',
      'Float the cork with the needle in the bowl of water.',
      'Let it settle and observe which direction it points.',
      'Compare the direction to a real compass or phone compass app, if available.'
    ],
    safetyTips: ['Handle the needle carefully since it is sharp.'],
    concepts: ['Magnetism', 'Magnetic fields', "Earth's magnetic poles"],
    difficulty: 'Beginner',
    estMinutes: 20,
    instructions:
      "Which direction did your compass point, and how closely did it match a real compass? Explain why rubbing the needle with a magnet allowed it to detect Earth's magnetic field.",
    minWords: 50,
    iterationPrompt:
      "Re-magnetize the needle with more strokes, or try rubbing it in the opposite direction. Did the compass work better, worse, or point a different way? What does that tell you about how magnetization works?"
  },
  {
    id: 'sci7-solar-oven',
    subject: 'science',
    tier: 1,
    category: 'experiment',
    title: 'Solar Oven',
    theme: 'Energy — capturing and converting sunlight into heat',
    objectives: 'Build a simple solar oven and explore how sunlight can be captured and converted to heat energy.',
    materials: [
      'A pizza box or shoebox',
      'Aluminum foil',
      'Plastic wrap',
      'Black construction paper',
      'Tape',
      'A stick or ruler to prop open the reflector flap',
      'A thermometer or food like s\u2019mores ingredients (optional)'
    ],
    procedure: [
      'Cut a flap in the lid of the box and cover the inside of the flap with aluminum foil to act as a reflector.',
      'Line the inside bottom of the box with black construction paper to absorb heat.',
      'Cover the opening beneath the flap with plastic wrap to trap heat inside, like a mini greenhouse.',
      'Place your food or a thermometer inside on the black paper.',
      'Prop the reflector flap open at an angle facing the sun.',
      'Check the temperature or food every 10-15 minutes.'
    ],
    safetyTips: [
      'The inside of the oven can get hot — use caution when checking on it.',
      'Use adult supervision if food is involved.'
    ],
    concepts: ['Solar energy', 'Heat transfer', 'Reflection and absorption of light'],
    difficulty: 'Intermediate',
    estMinutes: 60,
    instructions:
      "How did the temperature change over time? Explain how the reflector, the black paper, and the plastic wrap each helped capture and trap the sun's energy.",
    minWords: 60,
    iterationPrompt:
      "Test it again with one change — a different reflector angle, no plastic wrap, or a different time of day. Did it heat up faster or slower this time? What does that tell you about which part matters most?"
  },
  {
    id: 'sci7-marble-roller-coaster',
    subject: 'science',
    tier: 1,
    category: 'experiment',
    title: 'Marble Roller Coaster',
    theme: 'Energy — exploring potential and kinetic energy transformation',
    objectives: 'Build a marble roller coaster from household materials to explore energy transformation.',
    materials: [
      'Cardboard tubes (paper towel or toilet paper rolls), cut lengthwise',
      'Tape',
      'A marble',
      'Books or boxes for height',
      'Scissors'
    ],
    procedure: [
      'Cut cardboard tubes lengthwise to create tracks.',
      'Tape tracks together to build a path with hills and turns.',
      'Prop up the start of the track using books or boxes for height.',
      'Release a marble from the top and observe its path.',
      'Adjust the design to keep the marble on the track through the whole course.',
      'Test how different starting heights affect how far the marble travels or how it handles hills.'
    ],
    safetyTips: [
      'Marbles are a choking hazard for young children — keep them away from small kids.',
      'Watch your fingers when cutting cardboard.'
    ],
    concepts: ['Potential energy', 'Kinetic energy', 'Energy transformation', 'Gravity'],
    difficulty: 'Intermediate',
    estMinutes: 45,
    instructions:
      "Explain how the marble's energy changed from potential to kinetic as it moved down the track. What happened when you changed the starting height?",
    minWords: 60,
    iterationPrompt:
      "Rebuild one section of the track with a steeper hill or a tighter turn. Did the marble make it through, or fly off the track? What would you redesign to fix it?"
  },
  {
    id: 'sci7-bridge-building',
    subject: 'science',
    tier: 1,
    category: 'experiment',
    title: 'Bridge Building Challenge',
    theme: 'Materials Science & Engineering Design — building a load-bearing structure',
    relatedLessonId: 'ae7-aircraft-design',
    objectives: 'Design and build a bridge from household materials that can support the most weight.',
    materials: [
      'Popsicle sticks or drinking straws',
      'Tape or glue',
      'String',
      'A small container to hold weight (like a cup)',
      'Coins or small weights'
    ],
    procedure: [
      'Design a bridge structure that spans a gap of a set distance (for example, 20 cm) between two supports, like two stacks of books.',
      'Build your bridge using only your chosen materials.',
      'Place your bridge across the gap.',
      'Hang or place a small container on the middle of the bridge.',
      'Slowly add weight (coins) to the container until the bridge fails.',
      'Record how much weight your bridge held before failing.'
    ],
    safetyTips: ['Be careful with scissors when cutting materials.'],
    concepts: ['Load-bearing structures', 'Tension', 'Compression', 'Engineering design'],
    difficulty: 'Intermediate',
    estMinutes: 45,
    instructions:
      'How much weight did your bridge hold? What design choices helped it hold weight, and what would you change to make it stronger?',
    minWords: 60,
    iterationPrompt:
      "Rebuild your bridge with the one change you identified — a different truss pattern, more material at a weak point, etc. How much weight did the new version hold compared to the first?"
  },
  {
    id: 'sci7-catapult',
    subject: 'science',
    tier: 1,
    category: 'experiment',
    title: 'Catapult',
    theme: 'Forces and Motion — stored energy and projectile motion',
    objectives: 'Build a simple catapult to explore how stored energy launches a projectile.',
    materials: [
      'Popsicle sticks (5-8)',
      'Rubber bands',
      'A plastic spoon or bottle cap',
      'Small soft projectiles, like pom-poms or mini marshmallows'
    ],
    procedure: [
      'Stack several popsicle sticks and wrap a rubber band tightly around one end to create a base.',
      'Wedge one more popsicle stick, with a spoon or cap taped to the end, between the stack near the wrapped end to create a lever arm.',
      'Secure the lever arm to the base with a rubber band in a crisscross pattern.',
      'Place a small soft projectile in the spoon or cap.',
      'Push down on the end of the lever arm and release to launch the projectile.',
      'Measure the distance traveled and try adjusting the design to launch farther.'
    ],
    safetyTips: [
      'Never aim the catapult at people, animals, or anything breakable.',
      'Only use soft projectiles.'
    ],
    concepts: ['Potential energy', 'Elastic energy', 'Levers', 'Projectile motion'],
    difficulty: 'Beginner',
    estMinutes: 30,
    instructions:
      'What happened when you changed the angle or force of your launch? Explain how stored (elastic) energy in the rubber band became motion energy in the projectile.',
    minWords: 50,
    iterationPrompt:
      "Adjust the lever arm length or the number of rubber bands and launch again. Did the projectile go farther or shorter? What does that tell you about where the launch energy comes from?"
  },
  {
    id: 'sci7-mars-rover-model',
    subject: 'science',
    tier: 1,
    category: 'experiment',
    title: 'Mars Rover Model',
    theme: 'Space Science & Engineering Design — mechanical design for rough terrain',
    relatedLessonId: 'ae7-mars-missions',
    objectives: 'Design and build a simple model rover that can move using household materials, exploring basic mechanical design.',
    materials: [
      'A small cardboard box or plastic container',
      '4 bottle caps or small wheels',
      '2 skewers or straws for axles',
      'A rubber band',
      'Tape',
      'A small motor and battery (optional, for a self-powered version)'
    ],
    procedure: [
      'Attach axles (skewers or straws) across the underside of the box.',
      'Attach wheels (bottle caps) to each end of the axles so they can spin freely.',
      'Decide how your rover will move: pull it with a string, use a rubber-band-powered mechanism, or attach a simple motor if available.',
      'Test your rover on a flat surface, then on a slightly bumpy or inclined surface to simulate rough terrain.',
      'Make adjustments to improve stability or movement.'
    ],
    safetyTips: ['Adult supervision needed if using tools to cut materials or working with a battery/motor.'],
    concepts: ['Mechanical design', 'Wheels and axles', 'Friction', 'Terrain navigation'],
    difficulty: 'Intermediate',
    estMinutes: 45,
    instructions:
      "How did your rover perform on flat ground versus rough terrain? What design changes would help it handle Mars's rocky, uneven surface better?",
    minWords: 60,
    iterationPrompt:
      "Modify the wheels or the wheelbase and test on rough terrain again. Did the change improve how it handled bumps or slopes? What would you try next?"
  },
  {
    id: 'sci7-satellite-model',
    subject: 'science',
    tier: 1,
    category: 'experiment',
    title: 'Satellite Model',
    theme: 'Space Science — the basic components real satellites need',
    relatedLessonId: 'ae7-satellites',
    objectives: 'Build a simple model satellite to explore the basic components real satellites need to function.',
    materials: [
      'A small box or container for the satellite body',
      'Aluminum foil (to represent solar panels or reflective surfaces)',
      'Cardboard or paper for solar panel shapes',
      'A small dowel or straw for an antenna',
      'Tape'
    ],
    procedure: [
      "Use the small box as the satellite's main body.",
      'Cut two rectangular "solar panels" from cardboard, cover them with foil, and attach them to opposite sides of the body.',
      'Attach a straw or dowel as an antenna for communication.',
      'Label the different parts of your model (solar panels, antenna, body) and what each does on a real satellite.',
      'Optional: research a real satellite and try to model your design after it.'
    ],
    safetyTips: ['Be careful with scissors when cutting materials.'],
    concepts: ['Satellite components', 'Solar power', 'Communication systems'],
    difficulty: 'Beginner',
    estMinutes: 30,
    instructions:
      'Explain what each part of your satellite model would do on a real satellite. Why do satellites need solar panels and antennas specifically?',
    minWords: 50,
    iterationPrompt:
      "Research one real satellite (like a GPS or weather satellite) and modify your model to better match it. What did you add or change, and why does that satellite need that feature?"
  },
  {
    id: 'sci7-drone-concepts',
    subject: 'science',
    tier: 1,
    category: 'experiment',
    title: 'Drone Concepts Model',
    theme: 'Engineering Design & Physics — multi-rotor balance and drone components',
    relatedLessonId: 'ae7-drones',
    objectives: 'Build a simple model to explore how drones balance multiple rotors and understand basic drone components.',
    materials: [
      'A small piece of cardboard or foam board (for the body)',
      '4 straws or wooden skewers (to represent rotor arms)',
      'Small paper circles or bottle caps (to represent rotors/propellers)',
      'Tape',
      'A marker'
    ],
    procedure: [
      "Cut a small square or X-shaped body from cardboard to represent the drone's frame.",
      'Attach 4 arms (straws) extending outward in an X or + pattern.',
      'Attach a paper circle or bottle cap "rotor" at the end of each arm.',
      'Label each part: frame, arm, rotor, and (if desired) where a battery or flight controller would go.',
      'Test the balance of your model by seeing if it balances evenly when supported at its center.',
      'Research how real drones use each rotor spinning at different speeds to control movement.'
    ],
    safetyTips: ['Be careful with scissors when cutting cardboard.'],
    concepts: ['Multi-rotor balance', 'Drone components', 'Center of gravity'],
    difficulty: 'Beginner',
    estMinutes: 30,
    instructions:
      "How did the placement of the four rotors affect your model's balance? Explain how you think a real drone uses its four rotors together to fly, turn, and hover in place.",
    minWords: 50,
    iterationPrompt:
      "Move the arms to an uneven spacing, or add weight to one side, and retest the balance. What happened, and what does that tell you about why real drones need each rotor spinning at a precisely controlled speed?"
  },
  {
    id: 'sci7-rubber-band-airplane',
    subject: 'science',
    tier: 1,
    category: 'experiment',
    title: 'Rubber Band Airplane',
    theme: 'Aerodynamics — propeller thrust from stored elastic energy',
    relatedLessonId: 'ae7-how-airplanes-fly-2',
    objectives: 'Build a simple rubber-band-powered airplane to explore propeller thrust and stored elastic energy.',
    materials: [
      'A balsa wood or foam airplane kit (or a simple frame from craft sticks or lightweight cardboard)',
      'A rubber band',
      'A small plastic or cardboard propeller',
      'A paperclip or hook to attach the rubber band',
      'Tape'
    ],
    procedure: [
      'Assemble the airplane body according to a kit, or build a simple frame from craft sticks or lightweight cardboard.',
      'Attach a hook at the front for the rubber band and a hook at the back to anchor the other end.',
      'Attach a propeller to the front hook so it can spin freely.',
      'Wind the propeller to twist the rubber band tightly (do not overwind).',
      'Release the plane by hand in an open area and observe its flight.',
      'Try adjusting the number of winds and compare flight distance or time.'
    ],
    safetyTips: [
      'Launch in a clear, open area away from people.',
      'Be careful not to overwind the rubber band, which can snap.'
    ],
    concepts: ['Elastic (stored) energy', 'Thrust', 'Propeller mechanics'],
    difficulty: 'Intermediate',
    estMinutes: 40,
    instructions:
      'How did the number of rubber band winds affect the flight? Explain how stored elastic energy in the rubber band becomes thrust when it unwinds.',
    minWords: 50,
    iterationPrompt:
      "Wind the rubber band a different number of times (more or fewer) and fly it again. Was there a point where more winds didn't help, or made it worse? What does that tell you about the limits of stored energy?"
  }
];
