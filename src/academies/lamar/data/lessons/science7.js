// ---------------------------------------------------------------------------
// Science — Tier 1. One curated lesson per unit listed in the master vision
// doc's Science section (Earth Science through Scientific Method), taught
// through engineering and discovery per the doc's framing. Same auto-graded
// quiz pattern as math/reading/writing — slots into the existing Lesson
// Engine and mastery system with no changes needed there.
// ---------------------------------------------------------------------------

export const scienceLessons7 = [
  {
    id: 's7-earth-science',
    subject: 'science',
    tier: 1,
    title: "Layers of the Earth",
    theme: 'Earth Science — the structure of our planet',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: "Earth's outer layer, where we live, is called the ___.",
        choices: ['Crust', 'Mantle', 'Core', 'Atmosphere'],
        answer: 0,
        explanation: 'The crust is the thin, solid, outermost layer of Earth.',
        choiceFeedback: [
          null,
          "The mantle is a real layer, but it sits underneath the crust as hot rock we never stand on. The question asks about the layer at the surface.",
          "The core is Earth's center, thousands of kilometers straight down. Nothing lives there, and it is the farthest layer from us.",
          "The atmosphere is the blanket of air above the ground, not a rock layer. We live on Earth's solid outer shell, not in the air."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: "The thick layer of hot, semi-solid rock beneath Earth's crust is called the ___.",
        choices: ['Mantle', 'Crust', 'Outer core', 'Atmosphere'],
        answer: 0,
        explanation: "The mantle sits between the crust and the core, made of hot, slowly flowing rock.",
        choiceFeedback: [
          null,
          "The crust is the thin rocky layer we stand on. This question asks about the much thicker layer sitting directly beneath it.",
          "The outer core is liquid metal, and it lies below the mantle, not right under the crust. The order going down is crust, mantle, then core.",
          "The atmosphere is above the crust, not below it. This question is tracing layers downward into the Earth."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: "Earth's innermost layer, made mostly of iron and nickel, is the ___.",
        choices: ['Core', 'Crust', 'Mantle', 'Lithosphere'],
        answer: 0,
        explanation: 'The core is at the center of the Earth, made mostly of iron and nickel.',
        choiceFeedback: [
          null,
          "You picked the outermost layer instead of the innermost one. The crust is thin rock; the center is metal, mostly iron and nickel.",
          "The mantle is the thick middle layer of hot rock. Keep traveling deeper, past the mantle, to reach the iron and nickel part.",
          "The lithosphere is the name for the rigid outer shell, the crust plus the very top of the mantle. That is the outside, not the center."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: "Which layer of Earth is broken into large moving plates that cause earthquakes?",
        choices: ['The crust', 'The outer core', 'The inner core', 'The stratosphere'],
        answer: 0,
        explanation: "Earth's crust is broken into tectonic plates that shift and cause earthquakes.",
        choiceFeedback: [
          null,
          "The outer core is liquid metal that flows and generates Earth's magnetic field. Flowing liquid cannot break into plates, but solid rock can.",
          "The inner core is a solid metal ball at Earth's center, far too deep to crack into moving plates. Earthquakes begin much closer to the surface.",
          "The stratosphere is a layer of the atmosphere where jets cruise, not a layer of rock. Earthquakes happen in the ground."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 's7-life-science',
    subject: 'science',
    tier: 1,
    title: 'Cells & Classification',
    theme: 'Life Science — the basic unit of life and how living things are grouped',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What is the basic structural and functional unit of all living things?',
        choices: ['Cell', 'Atom', 'Organ', 'Molecule'],
        answer: 0,
        explanation: 'The cell is the smallest basic unit of life.',
        choiceFeedback: [
          null,
          "Atoms are the smallest units of matter, but they are not alive. This question asks for the smallest unit of a living thing.",
          "An organ like a heart is built from many cells working together, so it is much bigger than the basic unit rather than being the basic unit.",
          "Molecules are groups of bonded atoms, and living things are packed with them, but one molecule cannot grow, use energy, or reproduce by itself."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'What word describes an organism whose cells lack a nucleus, like bacteria?',
        choices: ['Prokaryote', 'Eukaryote', 'Vertebrate', 'Invertebrate'],
        answer: 0,
        explanation: 'Prokaryotes, like bacteria, have cells without a nucleus.',
        choiceFeedback: [
          null,
          "You chose the opposite word. Eukaryotes are the ones that do have a nucleus, including plants, animals, and you.",
          "Vertebrate describes an animal with a backbone, which is a way of sorting whole animals. This question is about what sits inside a single cell.",
          "Invertebrates are animals without backbones, like insects and jellyfish. Their cells still contain nuclei, so this is a different kind of grouping."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'Plant cells have a rigid outer layer that animal cells lack, called the ___.',
        choices: ['Cell wall', 'Cell membrane', 'Nucleus', 'Cytoplasm'],
        answer: 0,
        explanation: 'The cell wall gives plant cells rigid structure; animal cells only have a cell membrane.',
        choiceFeedback: [
          null,
          "Both plant and animal cells have a membrane, so it cannot be the part animal cells are missing. The rigid layer sits outside the membrane.",
          "The nucleus is the control center inside the cell, and animal cells have one too. The question asks about a stiff layer on the outside.",
          "Cytoplasm is the jelly-like fluid filling the cell. It is soft and found in both plant and animal cells, so it provides no rigid structure."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'What process do plants use to make their own food using sunlight?',
        choices: ['Photosynthesis', 'Respiration', 'Digestion', 'Fermentation'],
        answer: 0,
        explanation: 'Photosynthesis converts light energy into chemical energy (food) in plants.',
        choiceFeedback: [
          null,
          "Respiration is how cells release energy from food they already have. Photosynthesis is the earlier step that creates the food.",
          "Digestion breaks existing food into smaller pieces. Plants do not take in food to break down, they build it from light, water, and air.",
          "Fermentation is how some cells get energy without oxygen, like yeast making bread rise. It uses up sugar instead of making it."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 's7-physical-science',
    subject: 'science',
    tier: 1,
    title: 'Matter & States',
    theme: 'Physical Science — states of matter and phase changes',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'Which state of matter has a fixed shape and a fixed volume?',
        choices: ['Solid', 'Liquid', 'Gas', 'Plasma'],
        answer: 0,
        explanation: 'Solids hold both their shape and volume.',
        choiceFeedback: [
          null,
          "Liquids keep a fixed volume but not a fixed shape. Pour water into a different cup and it changes shape, so only one condition is met.",
          "A gas spreads out until it fills whatever container holds it, so neither its shape nor its volume stays fixed.",
          "Plasma is superheated gas, like the glow inside a rocket exhaust plume. Like a gas, it has no shape or volume of its own."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'Which state of matter takes the shape of its container but keeps a fixed volume?',
        choices: ['Liquid', 'Solid', 'Gas', 'Plasma'],
        answer: 0,
        explanation: 'Liquids take the shape of their container while keeping the same volume.',
        choiceFeedback: [
          null,
          "A solid keeps its own shape no matter what container it sits in. Here you need something that changes shape but holds its volume.",
          "A gas does take the shape of its container, but it also expands to fill the entire space, so its volume is not fixed.",
          "Plasma behaves much like a gas and spreads to fill its container. That means its volume changes, which rules it out here."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'The process of a liquid turning into a gas is called ___.',
        choices: ['Evaporation', 'Condensation', 'Freezing', 'Melting'],
        answer: 0,
        explanation: 'Evaporation is the change from liquid to gas.',
        choiceFeedback: [
          null,
          "That is the same change running backwards. Condensation is gas becoming liquid, like water beading on a cold window.",
          "Freezing turns a liquid into a solid, like water into ice. Here the liquid is becoming a gas instead.",
          "Melting is a solid turning into a liquid. You started one step too early, because this change begins with the liquid."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'The process of a gas turning into a liquid is called ___.',
        choices: ['Condensation', 'Evaporation', 'Sublimation', 'Melting'],
        answer: 0,
        explanation: 'Condensation is the change from gas to liquid.',
        choiceFeedback: [
          null,
          "You flipped the direction. Evaporation goes from liquid to gas, while here the gas is turning back into liquid.",
          "Sublimation skips the liquid stage completely, going solid straight to gas the way dry ice smokes. This change ends as a liquid.",
          "Melting starts with a solid, not a gas. Check which state the change begins in before naming it."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 's7-physics',
    subject: 'science',
    tier: 1,
    title: 'Motion Basics',
    theme: 'Physics — speed, velocity, and the vocabulary of motion',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'Speed measures how fast an object moves, while ___ measures speed in a specific direction.',
        choices: ['Velocity', 'Acceleration', 'Force', 'Mass'],
        answer: 0,
        explanation: 'Velocity is speed with a direction attached.',
        choiceFeedback: [
          null,
          "Acceleration is how quickly velocity changes, not speed plus direction. A plane can cruise at steady velocity with zero acceleration.",
          "A force is a push or a pull. It can change how something moves, but it is not a measurement of how fast something is going.",
          "Mass is how much matter an object contains. It tells you nothing about how fast or which way that object travels."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: "What is it called when an object's velocity changes over time?",
        choices: ['Acceleration', 'Inertia', 'Momentum', 'Friction'],
        answer: 0,
        explanation: 'Acceleration is the rate of change of velocity.',
        choiceFeedback: [
          null,
          "Inertia is an object's resistance to changing its motion, the reason it keeps doing what it is already doing. The change itself has a different name.",
          "Momentum is mass times velocity, a measure of how hard something is to stop. This question asks about velocity changing over time.",
          "Friction is one force that can change motion, but it is a cause of the change rather than the name for the change."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: "According to Newton's First Law, an object at rest stays at rest unless acted on by a(n) ___.",
        choices: ['Unbalanced force', 'Balanced force', 'Vacuum', 'Magnetic field'],
        answer: 0,
        explanation: "Newton's First Law (inertia) requires an unbalanced force to change an object's motion.",
        choiceFeedback: [
          null,
          "Balanced forces cancel each other out, so the object keeps doing exactly what it was doing. One side has to win for motion to change.",
          "A vacuum is empty space with no air in it. Emptiness cannot push on anything, so an object sitting in a vacuum stays put.",
          "A magnetic field is only one particular kind of force and it acts on very few materials. Newton's law covers any unbalanced push or pull."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'What force opposes motion between two surfaces in contact?',
        choices: ['Friction', 'Gravity', 'Tension', 'Thrust'],
        answer: 0,
        explanation: 'Friction resists the relative motion of surfaces sliding against each other.',
        choiceFeedback: [
          null,
          "Gravity pulls objects toward each other, mostly downward here. It works across a distance and does not need two surfaces touching.",
          "Tension is the pulling force carried through a rope, cable, or chain. It pulls along that line rather than resisting sliding.",
          "Thrust is the forward push from an engine or propeller. It creates motion instead of opposing it."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 's7-chemistry',
    subject: 'science',
    tier: 1,
    title: 'Atoms & Reactions',
    theme: 'Chemistry — atoms, molecules, and chemical reactions',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What is the smallest unit of an element that still has the properties of that element?',
        choices: ['Atom', 'Molecule', 'Cell', 'Compound'],
        answer: 0,
        explanation: 'An atom is the basic unit of a chemical element.',
        choiceFeedback: [
          null,
          "A molecule is two or more atoms already joined together, so it is bigger than the smallest unit. Take it apart and you get atoms.",
          "Cells are the basic unit of living things, not of elements. This question is about chemistry rather than biology.",
          "A compound contains at least two different elements, so it is not a single element at all."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'Two or more atoms bonded together form a ___.',
        choices: ['Molecule', 'Element', 'Mixture', 'Solution'],
        answer: 0,
        explanation: 'A molecule is formed when atoms bond together.',
        choiceFeedback: [
          null,
          "An element is a substance made of only one kind of atom. Bonding atoms together produces something with a different name.",
          "In a mixture, substances are only stirred together and can be pulled apart without breaking bonds. Here the atoms are actually bonded.",
          "A solution is one substance dissolved in another, like salt in water. That is a kind of mixture, not a chemical bond."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'A substance made of two or more elements chemically combined is called a ___.',
        choices: ['Compound', 'Mixture', 'Solution', 'Atom'],
        answer: 0,
        explanation: 'A compound is a chemical combination of two or more different elements.',
        choiceFeedback: [
          null,
          "In a mixture the substances keep their own properties and can be separated physically. The phrase chemically combined points to something stronger.",
          "A solution looks evenly combined, but its parts are not chemically bonded. You can boil the water off and get the salt back unchanged.",
          "An atom is a single particle of one element. This question describes two or more different elements joined together."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'In a chemical reaction, the substances you start with are called ___.',
        choices: ['Reactants', 'Solutions', 'Catalysts', 'Precipitates'],
        answer: 0,
        explanation: 'Reactants are the starting substances in a chemical reaction; products are what results.',
        choiceFeedback: [
          null,
          "A solution describes how substances are mixed, not the role they play in a reaction. The starting substances have their own name.",
          "A catalyst speeds a reaction up but is not used up by it, so it is not one of the starting ingredients being changed.",
          "A precipitate is a solid that forms during the reaction, so it shows up at the end rather than at the start."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 's7-astronomy',
    subject: 'science',
    tier: 1,
    title: 'Our Solar System',
    theme: 'Astronomy — the sun, planets, and other bodies in our solar system',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'Which planet is closest to the sun?',
        choices: ['Mercury', 'Venus', 'Earth', 'Mars'],
        answer: 0,
        explanation: 'Mercury is the closest planet to the sun.',
        choiceFeedback: [
          null,
          "Venus is second from the sun and it is the hottest planet, which makes it easy to mix up. Hottest and closest are not the same thing.",
          "Earth is third from the sun. Two other planets orbit inside our path before you get out to us.",
          "Mars is fourth, one step farther out than Earth. It looks like you counted outward from us instead of inward toward the sun."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'Which planet is known for its prominent ring system?',
        choices: ['Saturn', 'Jupiter', 'Mars', 'Neptune'],
        answer: 0,
        explanation: "Saturn's rings, made of ice and rock, are the most visually prominent in the solar system.",
        choiceFeedback: [
          null,
          "Jupiter is the largest planet and it does have rings, but they are thin and dark. The bright, famous ones belong to its neighbor.",
          "Mars is a small rocky planet with two tiny moons and no rings at all. Ring systems belong to the giant outer planets.",
          "Neptune has narrow, faint rings that are hard to spot even with strong telescopes. The word prominent points to the bright, wide set."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'A large ball of ice and rock that develops a glowing tail near the sun is called a ___.',
        choices: ['Comet', 'Asteroid', 'Meteor', 'Planet'],
        answer: 0,
        explanation: 'Comets develop glowing tails as ice on their surface vaporizes near the sun.',
        choiceFeedback: [
          null,
          "Asteroids are mostly rock and metal with very little ice, so they do not grow tails. Vaporizing ice is what creates the tail.",
          "A meteor is the streak of light made when a small piece of space rock burns up in our atmosphere. That happens near Earth, not near the sun.",
          "Planets are large bodies on steady orbits and they never develop tails. The description here points to something small and icy."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'What is the closest star to Earth?',
        choices: ['The Sun', 'Proxima Centauri', 'Sirius', 'Polaris'],
        answer: 0,
        explanation: 'The Sun is a star, and it is by far the closest one to Earth.',
        choiceFeedback: [
          null,
          "Proxima Centauri is the nearest star other than our own, more than four light-years away. Our Sun counts as a star too, and it is far closer.",
          "Sirius is the brightest star in our night sky, which makes it feel nearby, but brightness is not distance. It sits about nine light-years away.",
          "Polaris is handy for navigation because it sits almost above the North Pole, but it is hundreds of light-years from us."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 's7-weather',
    subject: 'science',
    tier: 1,
    title: 'Atmosphere & Weather Patterns',
    theme: 'Weather — instruments and vocabulary for describing the atmosphere',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What instrument measures atmospheric pressure?',
        choices: ['Barometer', 'Thermometer', 'Anemometer', 'Hygrometer'],
        answer: 0,
        explanation: 'A barometer measures air pressure.',
        choiceFeedback: [
          null,
          "A thermometer measures temperature. Both pressure and temperature shift with the weather, but each has its own instrument.",
          "An anemometer measures wind speed with spinning cups. Pressure differences cause wind, but this tool measures the wind itself.",
          "A hygrometer measures humidity, the amount of water vapor in the air. That is moisture, not the weight of air pressing down."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'What instrument measures wind speed?',
        choices: ['Anemometer', 'Barometer', 'Thermometer', 'Rain gauge'],
        answer: 0,
        explanation: 'An anemometer measures wind speed.',
        choiceFeedback: [
          null,
          "A barometer reads air pressure. Pressure changes help forecasters predict wind, but the barometer never measures how fast it blows.",
          "A thermometer tracks how hot or cold the air is. Temperature and wind speed are two separate measurements.",
          "A rain gauge collects and measures fallen rain. It tells you how much water arrived, not how hard the wind was blowing."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'Water falling from the atmosphere as rain, snow, sleet, or hail is called ___.',
        choices: ['Precipitation', 'Humidity', 'Condensation', 'Evaporation'],
        answer: 0,
        explanation: 'Precipitation is water falling from clouds in any form.',
        choiceFeedback: [
          null,
          "Humidity is water vapor already floating in the air. This question is about water that has left the air and is coming down.",
          "Condensation is vapor turning into liquid droplets, which is how clouds form. The falling happens after that step.",
          "Evaporation lifts water up into the air as vapor. That is the opposite direction from rain, snow, or hail coming down."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'The boundary between two air masses of different temperatures is called a weather ___.',
        choices: ['Front', 'Barrier', 'Divide', 'Ridge'],
        answer: 0,
        explanation: 'A weather front marks the boundary between air masses of different temperature and density.',
        choiceFeedback: [
          null,
          "Barrier sounds right because it suggests a boundary, but it is not the term meteorologists use where two air masses meet.",
          "A divide usually describes land, like a continental divide separating which way rivers flow. Air masses get a different word.",
          "A ridge is a genuine weather term, but it means a stretched-out area of high pressure, not the edge between warm and cold air."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 's7-energy',
    subject: 'science',
    tier: 1,
    title: 'Forms & Transformations of Energy',
    theme: 'Energy — kinetic, potential, and conservation of energy',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'The energy an object has due to its motion is called ___ energy.',
        choices: ['Kinetic', 'Potential', 'Chemical', 'Thermal'],
        answer: 0,
        explanation: 'Kinetic energy is the energy of motion.',
        choiceFeedback: [
          null,
          "Potential energy is stored and waiting, based on position. Once the object is actually moving, that energy goes by another name.",
          "Chemical energy is stored in bonds, like the energy in rocket fuel before it burns. The energy of the movement itself is something different.",
          "Thermal energy comes from particles jiggling randomly inside an object, which we feel as heat. Here the whole object is moving together."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'The energy an object has due to its position, like being held up high, is called ___ energy.',
        choices: ['Potential', 'Kinetic', 'Nuclear', 'Electrical'],
        answer: 0,
        explanation: 'Potential energy is stored energy based on position or condition.',
        choiceFeedback: [
          null,
          "Kinetic energy only shows up when something is actually moving. An object held still up high is not moving yet.",
          "Nuclear energy is stored inside the centers of atoms and released by splitting or fusing them. Height has nothing to do with it.",
          "Electrical energy comes from charges moving through a circuit. Lifting an object does not create any current."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'Which law states that energy cannot be created or destroyed, only transformed?',
        choices: [
          'The law of conservation of energy',
          "Newton's first law",
          'The law of gravity',
          'The law of motion'
        ],
        answer: 0,
        explanation: 'The law of conservation of energy states total energy in a closed system stays constant.',
        choiceFeedback: [
          null,
          "Newton's First Law is about inertia, objects keeping their motion unless a force acts. It describes movement, not the total supply of energy.",
          "The law of gravity describes how masses attract one another. It explains one specific force rather than what happens to energy overall.",
          "Newton's laws of motion explain how forces change movement. Energy never being created or destroyed is a separate rule."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'Solar panels convert sunlight into which form of energy?',
        choices: ['Electrical energy', 'Nuclear energy', 'Chemical energy', 'Sound energy'],
        answer: 0,
        explanation: 'Solar panels convert light energy directly into electrical energy.',
        choiceFeedback: [
          null,
          "Nuclear energy comes from reactions inside atoms, which is how the Sun produces its light in the first place. The panel receives that light and makes something else.",
          "Chemical energy is what a battery stores. A solar panel can charge a battery, but the panel itself puts out current, not stored chemicals.",
          "Sound is energy carried by vibrations through air. Solar panels are silent, and sunlight is not a sound wave."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 's7-forces-motion',
    subject: 'science',
    tier: 1,
    title: "Newton's Laws of Motion",
    theme: "Forces and Motion — Newton's three laws in action",
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: "Newton's Second Law states that Force equals mass times ___.",
        choices: ['Acceleration', 'Velocity', 'Distance', 'Time'],
        answer: 0,
        explanation: 'F = ma is Newton\'s Second Law: force equals mass times acceleration.',
        choiceFeedback: [
          null,
          "Mass times velocity gives momentum, not force. Force shows up when velocity is changing, and that change is acceleration.",
          "Force times distance gives work, which is a different idea. Newton's Second Law links force to how quickly motion changes.",
          "Time is already tucked inside acceleration, since acceleration is velocity change per second. Mass times time on its own does not give force."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: "Newton's Third Law states that for every action there is an equal and opposite ___.",
        choices: ['Reaction', 'Force', 'Motion', 'Mass'],
        answer: 0,
        explanation: "Newton's Third Law: every action has an equal and opposite reaction.",
        choiceFeedback: [
          null,
          "A reaction is indeed a force, so your thinking is close. The specific word Newton paired with action is reaction.",
          "Motion is what you might see afterward, but the law is about paired pushes. Two objects can push equally and barely move at all.",
          "Mass is how much matter something has, and it is not equal and opposite to anything. A rocket and its exhaust have very different masses."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt:
          'A rocket launches upward because it pushes gas downward. This mainly demonstrates which of Newton\u2019s laws?',
        choices: ['Third Law (action-reaction)', 'First Law (inertia)', 'The Law of Gravity', 'Second Law only'],
        answer: 0,
        explanation: 'The rocket pushes exhaust down, and the exhaust pushes the rocket up — an action-reaction pair.',
        choiceFeedback: [
          null,
          "The First Law explains why a rocket keeps coasting after its engines shut off. It does not explain what created the upward push.",
          "Gravity is the force the rocket has to overcome, pulling it back toward Earth. The question asks what pushes it up.",
          "The Second Law does apply here, since it tells you how much the rocket accelerates. But the paired down-gas and up-rocket pushes are the Third Law."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt:
          "An object in motion stays in motion at a constant speed unless acted on by an unbalanced force — this is Newton's ___ Law.",
        choices: ['First', 'Second', 'Third', 'Fourth'],
        answer: 0,
        explanation: "This describes inertia, Newton's First Law.",
        choiceFeedback: [
          null,
          "The Second Law is F = ma, about how much a force accelerates a given mass. This statement is about motion continuing when no force acts.",
          "The Third Law covers action-reaction pairs, two objects pushing on each other. Here only one object is described, coasting alone.",
          "Newton wrote three laws of motion, so there is no fourth one to pick."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 's7-gravity',
    subject: 'science',
    tier: 1,
    title: 'Gravity & Orbits',
    theme: 'Gravity — how it shapes orbits and causes microgravity',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What force keeps planets in orbit around the sun?',
        choices: ['Gravity', 'Magnetism', 'Friction', 'Air pressure'],
        answer: 0,
        explanation: "Gravity is the attractive force that keeps planets in the sun's orbit.",
        choiceFeedback: [
          null,
          "Magnetism only pulls on certain materials like iron, and it weakens very fast with distance. Planets are held by a force that acts on all mass.",
          "Friction requires surfaces touching, and space is nearly empty. That emptiness is exactly why planets keep orbiting without slowing down.",
          "There is essentially no air between the planets, so there is nothing to press on them."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'The strength of gravity between two objects depends on their mass and their ___.',
        choices: ['Distance apart', 'Color', 'Temperature', 'Speed'],
        answer: 0,
        explanation: 'Gravitational force depends on the masses of the objects and the distance between them.',
        choiceFeedback: [
          null,
          "Color is about which light an object reflects. It has no effect on how strongly two objects pull on each other.",
          "Temperature tells you how much the particles inside are jiggling. A hot rock and a cold rock of equal mass pull equally hard.",
          "Speed shapes the path an object takes in orbit, but the pull itself depends on mass and separation. A parked spacecraft feels the same gravity as a fast one at that spot."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt:
          'An object in freefall near Earth accelerates at approximately ___ per second per second (ignoring air resistance).',
        choices: ['9.8 meters', '100 meters', '1 meter', '50 meters'],
        answer: 0,
        explanation: "Earth's gravitational acceleration is approximately 9.8 m/s².",
        choiceFeedback: [
          null,
          "That is roughly ten times too large. One second after you let go, a falling object is moving near 10 meters per second, not 100.",
          "That is far too gentle. Falling objects pick up speed much faster, reaching about 10 meters per second after just one second.",
          "This is about five times too big. Earth's pull adds close to 10 meters per second of speed with each passing second."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'Why do astronauts appear to "float" aboard the International Space Station?',
        choices: [
          'They and the station are continuously falling together around Earth (microgravity)',
          'There is no gravity at all in space',
          'The station blocks gravity',
          'They are much lighter in space'
        ],
        answer: 0,
        explanation: 'The ISS and everything in it are in continuous freefall around Earth, creating the sensation of weightlessness.',
        choiceFeedback: [
          null,
          "Gravity is still strong up there, roughly 90 percent of what you feel on the ground. Without it the station would fly off straight instead of circling Earth.",
          "Nothing we know of blocks gravity; it passes right through walls, metal, and even whole planets. The floating comes from falling, not shielding.",
          "Their mass does not change when they launch. They feel weightless because nothing is pushing up on them, not because matter disappeared."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 's7-aerodynamics',
    subject: 'science',
    tier: 1,
    title: 'How Things Fly',
    theme: 'Aerodynamics — the four forces of flight',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'Which four forces act on an airplane in flight?',
        choices: [
          'Lift, drag, thrust, and weight',
          'Only lift and gravity',
          'Only thrust and friction',
          'Speed, mass, distance, and time'
        ],
        answer: 0,
        explanation: 'Every aircraft in flight is acted on by lift, drag, thrust, and weight.',
        choiceFeedback: [
          null,
          "You caught the up-and-down pair, but a plane also has forces acting forward and backward. Thrust from the engine and drag from the air belong on the list too.",
          "Those are the forward and backward forces, so you were thinking horizontally. The plane also needs lift holding it up against its weight.",
          "Those are measurements, not forces. Speed and time describe how the plane moves; forces are the pushes and pulls that make it move."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'The upward force that allows an airplane to fly is called ___.',
        choices: ['Lift', 'Thrust', 'Drag', 'Weight'],
        answer: 0,
        explanation: 'Lift is the upward force generated mainly by the wings.',
        choiceFeedback: [
          null,
          "Thrust is a real force on the plane, but it points forward out of the engine, not upward. The wings are what push the plane up.",
          "Drag pulls backward against the plane's motion. It is the force that slows you down, not the one that holds you up.",
          "Weight pulls the plane down toward Earth. Lift is the force that has to overcome weight, so they point opposite ways."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'The forward force produced by an engine is called ___.',
        choices: ['Thrust', 'Lift', 'Drag', 'Gravity'],
        answer: 0,
        explanation: 'Thrust is the forward-driving force from the engine.',
        choiceFeedback: [
          null,
          "Lift is made by air moving over the wings, not by the engine. The engine's job is pushing the plane forward.",
          "Drag works against the engine instead of helping it. It is the air pushing back as the plane moves through it.",
          "Gravity is not produced by any engine. It is the pull of Earth on the plane's mass, and it acts downward."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: "The force that resists an aircraft's motion through the air is called ___.",
        choices: ['Drag', 'Lift', 'Thrust', 'Weight'],
        answer: 0,
        explanation: 'Drag is air resistance acting opposite to the direction of motion.',
        choiceFeedback: [
          null,
          "Lift acts upward, at a right angle to the plane's path. The force that fights the plane's forward motion is a different one.",
          "Thrust is the opposite of what the question describes. It drives the plane forward instead of holding it back.",
          "Weight does make a climb harder, but it always pulls straight down. The question is about the force from pushing through air."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 's7-electricity',
    subject: 'science',
    tier: 1,
    title: 'Circuits & Current',
    theme: 'Electricity — how current flows through circuits',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What is the flow of electric charge called?',
        choices: ['Current', 'Voltage', 'Resistance', 'Power'],
        answer: 0,
        explanation: 'Electric current is the flow of electric charge.',
        choiceFeedback: [
          null,
          "Voltage is the push that makes charge move, not the movement itself. Think of voltage as the pressure and the answer as the flow.",
          "Resistance measures how much a material fights the flow. It slows charge down rather than being the flow.",
          "Power tells you how fast electrical energy is being used, measured in watts. It depends on the flow but is not the same thing."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'A material that allows electricity to flow through it easily is called a ___.',
        choices: ['Conductor', 'Insulator', 'Resistor', 'Capacitor'],
        answer: 0,
        explanation: 'Conductors, like copper, allow electric current to flow easily.',
        choiceFeedback: [
          null,
          "That is the opposite property. Insulators block charge from moving, which is why wires are wrapped in them.",
          "A resistor is a part you add on purpose to limit how much current gets through, not a material that lets it pass easily.",
          "A capacitor stores charge for a moment and releases it. It does not simply let current run straight through."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'A material that resists the flow of electricity is called an ___.',
        choices: ['Insulator', 'Conductor', 'Circuit', 'Current'],
        answer: 0,
        explanation: 'Insulators, like rubber, resist the flow of electric current.',
        choiceFeedback: [
          null,
          "You flipped the two. Conductors let charge move through easily, which is the opposite of resisting it.",
          "A circuit is the whole loop the electricity travels around, not a type of material.",
          "Current is the flow of charge itself. The question is asking what the material is called, not what moves through it."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'A closed loop that electricity flows through is called a ___.',
        choices: ['Circuit', 'Conductor', 'Battery', 'Resistor'],
        answer: 0,
        explanation: 'A circuit is a closed loop through which current flows.',
        choiceFeedback: [
          null,
          "A conductor is the material the path is made from, like copper wire. The question is asking for the name of the complete loop.",
          "A battery supplies the push that starts the charge moving. It is one part sitting inside the loop, not the loop itself.",
          "A resistor is a single component placed along the path to limit current, not the whole closed path."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 's7-magnetism',
    subject: 'science',
    tier: 1,
    title: 'Magnets & Fields',
    theme: 'Magnetism — poles, fields, and electromagnets',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'Opposite magnetic poles ___ each other, while like poles ___ each other.',
        choices: ['Attract; repel', 'Repel; attract', 'Attract; attract', 'Repel; repel'],
        answer: 0,
        explanation: 'Opposite poles (N-S) attract; like poles (N-N or S-S) repel.',
        choiceFeedback: [
          null,
          "You have the two effects switched. North and south pull toward each other, while two norths push apart.",
          "If both cases attracted, two north poles would snap together, and they do not. Like poles push each other away.",
          "If both cases repelled, nothing would ever stick to a magnet. North and south actually pull toward each other."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'The invisible area around a magnet where magnetic force acts is called the ___.',
        choices: ['Magnetic field', 'Electric field', 'Gravity field', 'Current'],
        answer: 0,
        explanation: 'A magnetic field is the region where magnetic force can be detected.',
        choiceFeedback: [
          null,
          "An electric field surrounds electric charges. It is a close cousin of the right answer, but this question is about magnets.",
          "A gravity field surrounds anything with mass and pulls on everything. A magnet's region of force only affects certain materials.",
          "Current is moving electric charge. Current can create the region we are naming, but it is not the region itself."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'Which of these metals is strongly attracted to magnets?',
        choices: ['Iron', 'Aluminum', 'Copper', 'Gold'],
        answer: 0,
        explanation: 'Iron is ferromagnetic and strongly attracted to magnets, unlike aluminum, copper, or gold.',
        choiceFeedback: [
          null,
          "Aluminum is a metal, but a magnet will not stick to it. Aircraft skins are often aluminum partly because it is light, not magnetic.",
          "Copper carries electricity extremely well, which is a different property. A magnet passes right over it without grabbing.",
          "Gold conducts well and resists corrosion, but it is not pulled by magnets. Being a metal does not automatically mean magnetic."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'An electromagnet is created by wrapping wire around a core and passing ___ through the wire.',
        choices: ['Electric current', 'Water', 'Magnetic force', 'Sound waves'],
        answer: 0,
        explanation: 'Electric current flowing through coiled wire generates a magnetic field, creating an electromagnet.',
        choiceFeedback: [
          null,
          "Water does not flow through a solid wire, and it would not create magnetism if it did. Something electrical has to move through the coil.",
          "Magnetic force is the result you get, not the thing you send into the wire. You supply the cause, and the magnetism comes out.",
          "Sound waves are vibrations traveling through air or solids. They carry no electric charge, so they cannot magnetize the core."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 's7-materials-science',
    subject: 'science',
    tier: 1,
    title: 'Properties of Materials',
    theme: 'Materials Science — how engineers describe and choose materials',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'A material that can be stretched into a wire without breaking is called ___.',
        choices: ['Ductile', 'Brittle', 'Malleable', 'Elastic'],
        answer: 0,
        explanation: 'Ductile materials, like copper, can be stretched into wire without breaking.',
        choiceFeedback: [
          null,
          "Brittle is the opposite behavior. A brittle material snaps instead of stretching out into a long thin wire.",
          "That is a very close relative, but malleable means it can be hammered or rolled into flat sheets. Wire-making needs the stretching property.",
          "Elastic means it springs back to its old shape. Wire has to stay stretched permanently, so this is a different property."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'A material that shatters easily under stress is called ___.',
        choices: ['Brittle', 'Ductile', 'Malleable', 'Flexible'],
        answer: 0,
        explanation: 'Brittle materials, like glass, break rather than bend under stress.',
        choiceFeedback: [
          null,
          "Ductile materials stretch out long instead of shattering. Copper wire bends and pulls rather than breaking apart.",
          "Malleable materials flatten under a hammer without cracking. The question describes a material that does crack.",
          "Flexible means it can bend and hold together. A material that shatters cannot bend at all."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: "A material's ability to return to its original shape after being stretched or bent is called ___.",
        choices: ['Elasticity', 'Density', 'Conductivity', 'Corrosion'],
        answer: 0,
        explanation: 'Elasticity describes a material returning to its original shape after deformation.',
        choiceFeedback: [
          null,
          "Density compares how much mass is packed into a given space. It says nothing about bouncing back into shape.",
          "Conductivity is about how well heat or electricity moves through a material, which is a different kind of property.",
          "Corrosion is chemical damage over time, like rusting. The question is about a shape recovering, not a material breaking down."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt:
          "The gradual destruction of a metal through chemical reactions with its environment, like rust, is called ___.",
        choices: ['Corrosion', 'Erosion', 'Elasticity', 'Combustion'],
        answer: 0,
        explanation: 'Corrosion is the chemical breakdown of a material, such as metal rusting.',
        choiceFeedback: [
          null,
          "Erosion is physical wearing away by wind, water, or ice. Rust is a chemical change in the metal itself, not something scraping it off.",
          "Elasticity describes a material springing back into shape. It is a mechanical property, not a chemical breakdown.",
          "Combustion is burning with flame and fast heat release. Rusting also involves oxygen, but it happens slowly and without fire."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 's7-engineering-design',
    subject: 'science',
    tier: 1,
    title: 'The Engineering Design Process',
    theme: 'Engineering Design — how engineers move from problem to solution',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What is typically the FIRST step in the engineering design process?',
        choices: ['Define the problem', 'Build the final product', 'Test the prototype', 'Sell the design'],
        answer: 0,
        explanation: 'Engineers start by clearly defining the problem before designing a solution.',
        choiceFeedback: [
          null,
          "Building the finished version comes near the end, after testing has shown the design works. Starting there means guessing at what you need.",
          "Testing is a real step, but you can only test something once you know what problem you are trying to solve and have built a model.",
          "Selling comes long after the engineering work, if it happens at all. It is not part of designing the solution."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'A rough, early version of a design built for testing is called a ___.',
        choices: ['Prototype', 'Blueprint', 'Patent', 'Specification'],
        answer: 0,
        explanation: 'A prototype is an early working model used to test and refine a design.',
        choiceFeedback: [
          null,
          "A blueprint is a drawing on paper or a screen. The question describes something actually built that you can test with your hands.",
          "A patent is legal protection for an invention idea. It does not involve building anything you can try out.",
          "A specification is the written list of requirements a design must meet. It guides the build but is not the build."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'Testing a design and making small improvements repeatedly is called the process of ___.',
        choices: ['Iteration', 'Termination', 'Certification', 'Documentation'],
        answer: 0,
        explanation: 'Iteration means repeating a process with small improvements each time.',
        choiceFeedback: [
          null,
          "Termination means stopping something. The question describes repeating and improving, which is the opposite of stopping.",
          "Certification is an official check that a finished design meets safety or performance standards, and it comes later.",
          "Documentation means recording what you did and why. That is important work, but it is not the repeat-and-improve cycle."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'A detailed diagram showing how a system or part is built is called a ___.',
        choices: ['Schematic', 'Prototype', 'Patent', 'Warranty'],
        answer: 0,
        explanation: 'A schematic is a detailed diagram of how a system is arranged or connected.',
        choiceFeedback: [
          null,
          "A prototype is a physical model you can handle and test. The question asks for a diagram on paper, not an object.",
          "A patent protects who owns an invention. Patents can contain drawings, but the word itself means the legal right.",
          "A warranty is a promise to repair or replace something that fails. It has nothing to do with showing how a system is built."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 's7-environmental-science',
    subject: 'science',
    tier: 1,
    title: 'Ecosystems & Sustainability',
    theme: 'Environmental Science — ecosystems, biodiversity, and renewable resources',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'A community of living things interacting with their environment is called an ___.',
        choices: ['Ecosystem', 'Organism', 'Habitat', 'Population'],
        answer: 0,
        explanation: 'An ecosystem includes living things and their interactions with their environment.',
        choiceFeedback: [
          null,
          "An organism is a single living thing, like one frog. The question describes a whole community plus its surroundings.",
          "That is close in spirit, since a habitat is the place a species lives. But this word has to cover all the living things and their interactions too.",
          "A population is all the members of one species in an area. The question includes many different species interacting."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'Energy sources that can be replenished naturally, like solar and wind, are called ___.',
        choices: ['Renewable', 'Nonrenewable', 'Fossil fuels', 'Finite'],
        answer: 0,
        explanation: 'Renewable energy sources are naturally replenished and do not run out with use.',
        choiceFeedback: [
          null,
          "You picked the opposite. Nonrenewable sources run out because nature cannot replace them on a human timescale.",
          "Fossil fuels like coal and oil took millions of years to form, so burning them uses them up for good.",
          "Finite means limited in supply. Sun and wind keep arriving, so the word you want means the opposite of finite."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'The variety of living species in a habitat is called ___.',
        choices: ['Biodiversity', 'Ecosystem', 'Population', 'Extinction'],
        answer: 0,
        explanation: 'Biodiversity describes the range of different species living in an area.',
        choiceFeedback: [
          null,
          "An ecosystem is the whole system, including nonliving parts like water and soil. The question asks only about the variety of species.",
          "A population counts members of a single species. The question is about how many different kinds live there.",
          "Extinction is when a species disappears completely. Extinction reduces the thing being asked about rather than naming it."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'The process of converting waste materials into reusable products is called ___.',
        choices: ['Recycling', 'Composting', 'Combustion', 'Pollution'],
        answer: 0,
        explanation: 'Recycling converts used materials into new, reusable products.',
        choiceFeedback: [
          null,
          "Composting is a reasonable guess since it does reuse waste, but it turns food and yard scraps into soil rather than into new products.",
          "Combustion burns waste and destroys the material. The question describes turning it back into something usable.",
          "Pollution is harmful material released into the environment, which is the problem this process helps solve."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 's7-space-science',
    subject: 'science',
    tier: 1,
    title: 'Spacecraft & Satellites',
    theme: 'Space Science — the vehicles and equipment used to explore space',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'An unmanned spacecraft sent to explore and gather data is called a ___.',
        choices: ['Probe', 'Rover', 'Capsule', 'Booster'],
        answer: 0,
        explanation: 'A probe is an unmanned spacecraft used to explore and collect data.',
        choiceFeedback: [
          null,
          "Rovers are uncrewed too, so this is a fair guess. But rover specifically means the kind that drives across a surface.",
          "A capsule is the pressurized section that carries crew or cargo and brings them home again.",
          "A booster is the rocket stage that provides the power to leave the ground. It does not travel out to explore."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: "A vehicle designed to travel across the surface of a planet or moon is called a ___.",
        choices: ['Rover', 'Probe', 'Satellite', 'Module'],
        answer: 0,
        explanation: 'A rover is designed to travel across a planetary or lunar surface.',
        choiceFeedback: [
          null,
          "A probe is a broader term for an uncrewed explorer, and most probes fly past or orbit rather than drive on the ground.",
          "A satellite stays in orbit above a body. The question describes a vehicle moving along the surface itself.",
          "A module is a section of a spacecraft or station, like a lab or living compartment. It is not a surface vehicle."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'An object that orbits a larger body in space, like the Moon orbiting Earth, is called a ___.',
        choices: ['Satellite', 'Comet', 'Asteroid', 'Nebula'],
        answer: 0,
        explanation: 'A satellite is any object that orbits a larger body.',
        choiceFeedback: [
          null,
          "Comets do orbit the Sun, so you were thinking about orbits correctly. But comet names one specific icy kind of object, not the general term.",
          "Asteroids also orbit, yet the word describes rocky leftover bodies specifically. The Moon is not an asteroid.",
          "A nebula is a huge cloud of gas and dust where stars form. It is not something circling a larger body."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'A satellite that stays above the same point on Earth as it orbits is called ___.',
        choices: ['Geostationary', 'Heliocentric', 'Interplanetary', 'Subsonic'],
        answer: 0,
        explanation: "A geostationary satellite matches Earth's rotation, staying fixed above one point.",
        choiceFeedback: [
          null,
          "Heliocentric means sun-centered and describes our model of the solar system. It is not about a satellite's position over Earth.",
          "Interplanetary describes travel between planets. This satellite never leaves Earth orbit.",
          "Subsonic means slower than the speed of sound, which is an aircraft speed term, not an orbit description."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 's7-rocket-science',
    subject: 'science',
    tier: 1,
    title: 'How Rockets Work',
    theme: 'Rocket Science — propulsion, staging, and reentry',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'Rockets move forward by expelling mass (exhaust) in the opposite direction — this demonstrates which law?',
        choices: ["Newton's Third Law", "Newton's First Law", 'The Law of Gravity', 'The Law of Conservation of Mass'],
        answer: 0,
        explanation: 'The exhaust pushes backward, and the rocket is pushed forward — an action-reaction pair.',
        choiceFeedback: [
          null,
          "The First Law is about objects keeping their motion unless a force acts. It explains a rocket coasting, not what creates the push.",
          "Gravity is what a rocket has to fight on the way up. It does not explain how firing exhaust backward drives the rocket forward.",
          "Mass really is conserved as exhaust leaves, so you noticed something true. But this law does not describe the paired push and shove."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'The forward force produced by a rocket engine is called ___.',
        choices: ['Thrust', 'Lift', 'Drag', 'Weight'],
        answer: 0,
        explanation: 'Thrust is the forward-driving force produced by a rocket engine.',
        choiceFeedback: [
          null,
          "Lift comes from air flowing over a wing. Rockets fly where there is little or no air, so a different force does the work.",
          "Drag is the air pushing back on the rocket, slowing it down. It works against the engine rather than being produced by it.",
          "Weight is gravity pulling the rocket down. The engine has to beat weight, which means weight is not what the engine makes."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt:
          'A rocket that separates into sections during flight, dropping empty fuel tanks to become lighter, uses a ___ design.',
        choices: ['Multi-stage', 'Single-stage', 'Reusable-only', 'Solid-fuel-only'],
        answer: 0,
        explanation: 'Multi-stage rockets drop empty sections during flight to become lighter and more efficient.',
        choiceFeedback: [
          null,
          "A single-stage rocket stays in one piece the whole flight, carrying its empty tanks all the way up.",
          "Reusable describes whether parts are recovered and flown again. A rocket can drop stages without any of them being reused.",
          "Solid-fuel describes what the propellant is made of. Fuel type does not determine whether the rocket separates into sections."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: "The return of a spacecraft into a planet's atmosphere is called ___.",
        choices: ['Reentry', 'Liftoff', 'Docking', 'Splashdown'],
        answer: 0,
        explanation: 'Reentry is the return of a spacecraft into a planet\'s atmosphere.',
        choiceFeedback: [
          null,
          "Liftoff is the start of the mission, when the rocket leaves the pad. The question describes coming back in.",
          "Docking is when two spacecraft connect in space. It happens in orbit, not while passing through the atmosphere.",
          "Splashdown is the ocean landing at the very end. It comes after the part being named here."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 's7-planetary-science',
    subject: 'science',
    tier: 1,
    title: 'Comparing Planets',
    theme: 'Planetary Science — comparing the planets of our solar system',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'Which planet is known as the "Red Planet" due to iron oxide (rust) on its surface?',
        choices: ['Mars', 'Venus', 'Jupiter', 'Mercury'],
        answer: 0,
        explanation: "Mars's reddish color comes from iron oxide (rust) in its soil.",
        choiceFeedback: [
          null,
          "Venus is covered in pale yellowish clouds, not rusty soil. It is famous for its heat rather than its color.",
          "You may be thinking of Jupiter's Great Red Spot, but that is a giant storm in the clouds, not iron oxide on a surface.",
          "Mercury is gray and heavily cratered. Being close to the Sun does not turn a planet reddish."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'Which planet is the largest in our solar system?',
        choices: ['Jupiter', 'Saturn', 'Neptune', 'Earth'],
        answer: 0,
        explanation: 'Jupiter is the largest planet in the solar system by far.',
        choiceFeedback: [
          null,
          "Saturn is second largest, and its bright rings can make it look bigger than it is. The rings are not part of the planet's size.",
          "Neptune is far away and is an ice giant, but it is noticeably smaller than the biggest gas giant.",
          "Earth feels enormous because we live on it, but it would fit inside the largest planet more than a thousand times."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt:
          'Which planet has surface temperatures hot enough to melt lead, due to a thick, heat-trapping atmosphere?',
        choices: ['Venus', 'Mercury', 'Mars', 'Neptune'],
        answer: 0,
        explanation: "Venus is the hottest planet due to a runaway greenhouse effect, even hotter than Mercury despite being farther from the sun.",
        choiceFeedback: [
          null,
          "Closest to the Sun sounds like hottest, which is good reasoning. But Mercury has almost no atmosphere to trap heat, so its nights get freezing.",
          "Mars has a very thin atmosphere and is cold, averaging well below freezing.",
          "Neptune sits far from the Sun and is one of the coldest places in the solar system."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'Which of these is classified as a dwarf planet, not a full planet?',
        choices: ['Pluto', 'Mars', 'Mercury', 'Neptune'],
        answer: 0,
        explanation: 'Pluto was reclassified as a dwarf planet by the International Astronomical Union in 2006.',
        choiceFeedback: [
          null,
          "Mars is a full planet. It orbits the Sun, is round, and has cleared other objects out of its orbital path.",
          "Mercury is the smallest full planet, so small size alone does not make something a dwarf planet.",
          "Neptune is a large full planet and the farthest one from the Sun."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 's7-scientific-method',
    subject: 'science',
    tier: 1,
    title: 'Asking & Testing Questions',
    theme: 'Scientific Method — hypotheses, variables, and controls',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What is an educated guess that can be tested, made before an experiment?',
        choices: ['A hypothesis', 'A conclusion', 'A variable', 'A control'],
        answer: 0,
        explanation: 'A hypothesis is a testable, educated guess made before running an experiment.',
        choiceFeedback: [
          null,
          "A conclusion comes at the end, after you look at your results. The question asks about something you write before testing.",
          "A variable is a factor in the experiment that can change. It is part of the setup, not the prediction you are testing.",
          "A control is the unchanged version you compare against. It helps you test the prediction but is not the prediction."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'In an experiment, the factor that is deliberately changed is called the ___ variable.',
        choices: ['Independent', 'Dependent', 'Control', 'Constant'],
        answer: 0,
        explanation: 'The independent variable is the one the experimenter deliberately changes.',
        choiceFeedback: [
          null,
          "The dependent variable is the one you measure to see what happened. You do not set it yourself.",
          "The control is the untouched comparison setup. Nothing in it gets changed on purpose.",
          "Constants are the conditions you keep exactly the same in every trial, so they are the opposite of what you change."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'In an experiment, the factor that is measured and may change as a result is called the ___ variable.',
        choices: ['Dependent', 'Independent', 'Control', 'Constant'],
        answer: 0,
        explanation: 'The dependent variable is measured to see how it responds to the independent variable.',
        choiceFeedback: [
          null,
          "The independent variable is the one you choose and change on purpose. The question asks about the one that responds.",
          "A control is a whole comparison setup left unchanged, not the measurement you record.",
          "Constants are held steady on purpose so they cannot change. The variable being asked about is free to change."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'A part of an experiment that is not changed, used for comparison, is called the ___.',
        choices: ['Control', 'Hypothesis', 'Variable', 'Conclusion'],
        answer: 0,
        explanation: 'A control group is kept unchanged to provide a baseline for comparison.',
        choiceFeedback: [
          null,
          "A hypothesis is your testable prediction written before the experiment, not a part of the setup you leave alone.",
          "A variable is something that changes or gets measured, which is the opposite of the unchanged comparison being described.",
          "A conclusion is what you decide after reviewing the data, not a piece of the experiment itself."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 's7-chemistry-2',
    subject: 'science',
    tier: 1,
    title: 'Chemistry II: Acids, Bases & pH',
    theme: 'The pH scale and how it classifies acids and bases',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'The pH scale ranges from 0 to 14. A pH of 7 is considered ___.',
        choices: ['Neutral', 'Very acidic', 'Very basic', 'Undefined'],
        answer: 0,
        explanation: 'A pH of 7, like pure water, is considered neutral — neither acidic nor basic.',
        choiceFeedback: [
          null,
          "Very acidic solutions sit near the bottom of the scale, around 0 to 3. Seven is the middle of the 0 to 14 range, so it leans neither way.",
          "Very basic solutions are up near 12 to 14, at the top of the scale. It looks like you read the scale from the wrong end.",
          "A pH of 7 is a well-defined value, the pH of pure water. Undefined would mean the scale gives no reading there, and it does."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'A substance with a pH below 7 is ___.',
        choices: ['Acidic', 'Basic', 'Neutral', 'Undefined'],
        answer: 0,
        explanation: 'Substances with a pH below 7 are acidic.',
        choiceFeedback: [
          null,
          "You have the two ends of the scale flipped. Numbers below 7 mean more acid; basic solutions are the ones that read above 7.",
          "Neutral is exactly 7 and nothing else. Anything below that line has already tipped over to the acid side.",
          "Every number from 0 to 14 on the pH scale means something real. A reading below 7 tells you clearly that the solution is acidic."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'A substance with a pH above 7 is ___.',
        choices: ['Basic', 'Acidic', 'Neutral', 'Undefined'],
        answer: 0,
        explanation: 'Substances with a pH above 7 are basic (alkaline).',
        choiceFeedback: [
          null,
          "The scale is reversed here. Acids read below 7, and once you climb above 7 you are in basic, or alkaline, territory.",
          "Neutral is the single value 7, like pure water. A reading above it means the solution has moved onto the basic side.",
          "Readings above 7 are perfectly defined; soap and baking soda water land there. Scientists call that range basic, or alkaline."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'What color does litmus paper commonly turn when dipped in an acidic solution?',
        choices: ['Red', 'Blue', 'Green', 'Yellow'],
        answer: 0,
        explanation: 'Litmus paper turns red in acidic solutions and blue in basic solutions.',
        choiceFeedback: [
          null,
          "Blue is what litmus turns in a base, not an acid. A handy memory trick: acid turns litmus red.",
          "Green shows up on universal indicator paper near neutral, which may be what you pictured. Plain litmus paper only gives two colors, red and blue.",
          "Yellow appears with indicators like bromothymol blue or universal paper. Litmus itself has just the two colors, red for acid and blue for base."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 's7-physics-2',
    subject: 'science',
    tier: 1,
    title: 'Physics II: Simple Machines',
    theme: 'Levers, pulleys, and inclined planes — how simple machines make work easier',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'A ramp used to make lifting objects easier is an example of which simple machine?',
        choices: ['Inclined plane', 'Lever', 'Pulley', 'Wheel and axle'],
        answer: 0,
        explanation: 'A ramp is a classic example of an inclined plane.',
        choiceFeedback: [
          null,
          "A lever pivots on a fulcrum, like a seesaw or a crowbar. A ramp has no pivot at all, just a slanted surface.",
          "A pulley uses a wheel and a rope to redirect your pulling force. A ramp has neither, it spreads the lifting over a longer sloped path.",
          "A wheel and axle turns around a center shaft, like a doorknob or a steering wheel. A ramp does not rotate; it is a fixed slope."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'A seesaw is a classic example of which simple machine?',
        choices: ['Lever', 'Inclined plane', 'Pulley', 'Screw'],
        answer: 0,
        explanation: 'A seesaw pivots on a fulcrum, making it a lever.',
        choiceFeedback: [
          null,
          "An inclined plane is a fixed slope you slide or roll things up. A seesaw tips back and forth around a center point instead.",
          "Pulleys work by running a rope over a wheel. A seesaw is a stiff plank balancing on a fulcrum, with no rope and no wheel.",
          "A screw is an inclined plane wrapped into a spiral, like a bolt. A seesaw does not spiral, it pivots."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'A rope-and-wheel system used to lift heavy objects, like a flagpole, is an example of which simple machine?',
        choices: ['Pulley', 'Lever', 'Wedge', 'Screw'],
        answer: 0,
        explanation: 'A pulley uses a wheel and rope to change the direction (and sometimes amount) of force needed to lift something.',
        choiceFeedback: [
          null,
          "A lever is a rigid bar resting on a fulcrum. Here the force travels through a flexible rope bent around a wheel, which is what makes it a pulley.",
          "A wedge is a sharp shape that splits things apart, like an axe head or a chisel. Nothing on a flagpole is doing any splitting.",
          "A screw is a spiral ramp that lifts or holds when you turn it. The flagpole rope runs straight over a wheel instead."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'What is the main purpose of a simple machine?',
        choices: [
          'To make work easier by changing the amount or direction of force needed',
          'To eliminate the need for any force at all',
          'To make objects heavier',
          'To generate electricity'
        ],
        answer: 0,
        explanation: 'Simple machines make work easier by changing the amount or direction of force required, not by eliminating force entirely.',
        choiceFeedback: [
          null,
          "Machines trade force for distance: you may push less hard, but you push over a longer path. No machine lets you lift something using zero force.",
          "Weight comes from mass and gravity, and a machine changes neither one. What a machine changes is how much force you have to apply.",
          "Generators make electricity, and they are a different kind of machine. Simple machines like ramps and levers only redirect or reduce force."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 's7-earth-science-2',
    subject: 'science',
    tier: 1,
    title: 'Earth Science II: Plate Tectonics & Earthquakes',
    theme: 'How moving plates shape the planet and cause earthquakes',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What term describes the boundary where two tectonic plates slide past each other horizontally?',
        choices: ['A transform boundary', 'A convergent boundary', 'A divergent boundary', 'A subduction zone only'],
        answer: 0,
        explanation: 'A transform boundary is where plates slide past each other horizontally.',
        choiceFeedback: [
          null,
          "Convergent boundaries have plates pushing into each other, building mountains and trenches. Sliding side by side is a different motion entirely.",
          "Divergent means moving apart, which opens a gap where new crust forms. Here the plates stay in contact and grind past one another.",
          "Subduction happens when one plate dives beneath another, which requires plates colliding. Horizontal sliding does not send either plate downward."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'What term describes plates moving apart, often forming new crust, like at the Mid-Atlantic Ridge?',
        choices: ['A divergent boundary', 'A transform boundary', 'A convergent boundary exclusively', 'A fault line only'],
        answer: 0,
        explanation: 'A divergent boundary is where plates move apart, often forming new crust.',
        choiceFeedback: [
          null,
          "Transform boundaries slide past each other and do not build much new crust. The Mid-Atlantic Ridge is making new seafloor, so the plates must be separating.",
          "Convergent boundaries bring plates together and destroy crust at trenches. A ridge that creates new crust is doing the opposite.",
          "Fault names a crack where rock moves, and faults show up at every kind of boundary. The question asks which motion is happening: here, plates pulling apart."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'What instrument do scientists use to measure the intensity of ground shaking during an earthquake?',
        choices: ['A seismograph', 'A barometer', 'A thermometer', 'An anemometer'],
        answer: 0,
        explanation: 'A seismograph measures and records ground shaking during earthquakes.',
        choiceFeedback: [
          null,
          "A barometer tracks air pressure and helps forecast weather. Ground shaking calls for an instrument that senses motion in rock.",
          "Thermometers measure temperature. An earthquake is about ground movement, not heat.",
          "An anemometer measures wind speed. Nothing about it senses what the ground beneath it is doing."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'What term describes one tectonic plate sliding underneath another at a convergent boundary?',
        choices: ['Subduction', 'Transform motion', 'Divergence', 'Erosion'],
        answer: 0,
        explanation: 'Subduction is when one plate slides beneath another at a convergent boundary.',
        choiceFeedback: [
          null,
          "Transform motion is side-by-side sliding, with both plates staying at about the same depth. Here one plate is heading downward under the other.",
          "Divergence is plates pulling apart. At a convergent boundary they are pushing together, and that squeeze is what forces one plate down.",
          "Erosion is wind and water wearing away rock at the surface. This question is about whole plates moving deep inside the Earth."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 's7-life-science-2',
    subject: 'science',
    tier: 1,
    title: 'Life Science II: Genetics Basics',
    theme: 'DNA, genes, genotype, and phenotype',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What molecule carries genetic information in living cells?',
        choices: ['DNA', 'RNA only', 'Protein only', 'Glucose'],
        answer: 0,
        explanation: 'DNA carries the genetic information in living cells.',
        choiceFeedback: [
          null,
          "RNA is real and important: it carries copies of DNA instructions out to build proteins. The long-term storage of the genetic code, though, is DNA's job.",
          "Proteins are what the instructions build, things like enzymes, muscle, and hemoglobin. They do the work rather than store the code.",
          "Glucose is a sugar that cells burn for energy. It is fuel, not information."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'What term describes a specific segment of DNA that codes for a particular trait?',
        choices: ['A gene', 'A chromosome only', 'A cell wall', 'A ribosome'],
        answer: 0,
        explanation: 'A gene is a specific DNA segment coding for a particular trait.',
        choiceFeedback: [
          null,
          "A chromosome is the whole packaged strand of DNA and holds many instructions at once. The question asks about one segment coding for one trait.",
          "A cell wall is the stiff outer layer around plant and bacterial cells. It is structure, not a stretch of DNA.",
          "Ribosomes are the cell's builders; they read instructions and assemble proteins. They are machinery, not part of the DNA itself."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: "What term describes an organism's inherited genetic makeup, as opposed to its observable traits?",
        choices: ['Genotype', 'Phenotype', 'Mutation', 'Species'],
        answer: 0,
        explanation: 'Genotype refers to the inherited genetic makeup itself.',
        choiceFeedback: [
          null,
          "Phenotype is the part you can see or measure, like eye color or height. This question asks about the gene combination underneath instead.",
          "A mutation is a change in the DNA sequence. It can alter the genetic makeup, but it is not the word for that makeup itself.",
          "Species names a group of organisms that can breed together. That describes a kind of organism, not one individual's set of genes."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: "What term describes an organism's observable physical traits, resulting from genes and environment?",
        choices: ['Phenotype', 'Genotype', 'Mutation', 'Species'],
        answer: 0,
        explanation: 'Phenotype refers to the observable traits resulting from genes and environment.',
        choiceFeedback: [
          null,
          "You have the pair swapped. Genotype is the gene code you inherit; phenotype is how that code actually shows up.",
          "A mutation is a change to the DNA. It might alter what you observe, but the observable traits themselves go by a different name.",
          "Species refers to a whole group of similar organisms. Here we need the word for one organism's visible traits."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 's7-physical-science-2',
    subject: 'science',
    tier: 1,
    title: 'Physical Science II: Physical vs. Chemical Changes',
    theme: 'Telling reversible physical changes from true chemical reactions',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'Melting ice is an example of what type of change?',
        choices: ['A physical change', 'A chemical change', 'Neither type of change', 'Both simultaneously with no distinction'],
        answer: 0,
        explanation: 'Melting is a physical change — the substance (water) stays the same, just changing state.',
        choiceFeedback: [
          null,
          "Chemical changes create a brand new substance. Melted ice is still water, the same H2O, just liquid instead of solid.",
          "Something definitely changed here: the ice went from solid to liquid. A change of state counts as a physical change.",
          "There is a clear line in this case. No new substance forms, so it sits firmly on the physical side."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'Burning wood is an example of what type of change?',
        choices: ['A chemical change', 'A physical change only', 'Neither type of change', 'A change with no new substances formed'],
        answer: 0,
        explanation: 'Burning wood creates new substances (ash, smoke, gases), making it a chemical change.',
        choiceFeedback: [
          null,
          "In a physical change you can usually get the original back, the way water refreezes. Ash and smoke can never become wood again.",
          "A fire is one of the biggest changes there is. New gases and ash appear where there were none, and that makes it chemical.",
          "Ash, smoke, carbon dioxide, and water vapor were not there before the fire. Their appearance is exactly the sign of a chemical change."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'What is a key sign that a chemical change has occurred, such as a color change, gas production, or temperature change?',
        choices: [
          'Formation of a new substance with different properties',
          'No change in temperature ever',
          'Only a change in shape',
          'A change that is always reversible'
        ],
        answer: 0,
        explanation: 'Chemical changes form new substances with different properties from the original.',
        choiceFeedback: [
          null,
          "Chemical reactions usually do change temperature, giving off heat or soaking it up. Steady temperature is not the giveaway.",
          "Changing shape, like bending or crushing, leaves the material itself the same, so that is physical. A chemical change goes deeper than shape.",
          "Physical changes are the ones you can usually undo, like melting and refreezing. Chemical changes are often very hard or impossible to reverse."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'Is dissolving sugar in water a physical or chemical change?',
        choices: ['A physical change', 'A chemical change', 'Neither', 'Both equally'],
        answer: 0,
        explanation: 'Dissolving sugar is a physical change — the sugar molecules are still sugar, just dispersed in water.',
        choiceFeedback: [
          null,
          "Dissolving spreads sugar molecules out among the water molecules, but each one is still sugar. Boil the water away and the sugar comes right back.",
          "Something did change: the sugar went from visible crystals to spread throughout the liquid. That counts as a physical change.",
          "No new substance appears here, so there is no chemical half to it. Dissolving belongs entirely in the physical category."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 's7-weather-2',
    subject: 'science',
    tier: 1,
    title: 'Weather II: Clouds & Fronts',
    theme: 'Identifying cloud types and what they signal about weather',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What type of cloud is typically flat, gray, and covers the whole sky, often bringing steady rain?',
        choices: ['Stratus', 'Cumulus', 'Cirrus', 'Nimbus alone'],
        answer: 0,
        explanation: 'Stratus clouds are flat, gray, and often bring steady, widespread rain.',
        choiceFeedback: [
          null,
          "Cumulus clouds are the puffy, separated ones with blue sky showing between them. A gray sheet covering the whole sky is a different type.",
          "Cirrus are thin, wispy streaks very high up, and they never blanket the sky in gray. Pilots meet them near cruising altitude.",
          "Nimbo or nimbus is a word part meaning rain-producing, as in nimbostratus. By itself it does not name the flat, layered shape described here."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'What type of cloud is often described as puffy and white, associated with fair weather?',
        choices: ['Cumulus', 'Stratus', 'Cirrus', 'Cumulonimbus exclusively'],
        answer: 0,
        explanation: 'Cumulus clouds are puffy, white, and typically associated with fair weather.',
        choiceFeedback: [
          null,
          "Stratus clouds spread into a flat gray sheet and often bring drizzle. Puffy, separate cotton-ball clouds go by a different name.",
          "Cirrus clouds are thin and feathery, way up high. The puffy fair-weather ones sit much lower and have clear rounded edges.",
          "Cumulonimbus are the towering storm versions that grow tall and dark. Fair-weather puffs are their smaller, flat-bottomed cousins."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'What type of tall, towering cloud is associated with thunderstorms?',
        choices: ['Cumulonimbus', 'Cirrus', 'Stratus', 'Altostratus'],
        answer: 0,
        explanation: 'Cumulonimbus clouds are tall and towering, associated with thunderstorms.',
        choiceFeedback: [
          null,
          "Cirrus clouds are thin ice streaks, far too wispy to hold a thunderstorm. Storm clouds build upward into huge dense towers.",
          "Stratus clouds are low, flat layers that bring steady light rain rather than thunder. The question describes a cloud that grows tall.",
          "Altostratus is a mid-level gray sheet that dims the sun. It spreads sideways instead of towering upward."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'What type of high, wispy cloud made of ice crystals often signals a change in weather within a day or two?',
        choices: ['Cirrus', 'Stratus', 'Cumulus', 'Nimbostratus'],
        answer: 0,
        explanation: 'Cirrus clouds are high, wispy, and often precede a change in weather.',
        choiceFeedback: [
          null,
          "Stratus clouds sit low and gray and are usually already drizzling, not hinting at weather to come. This question describes high, thin ice clouds.",
          "Cumulus clouds are puffy and made of water droplets at lower altitude. The wispy ice ones ride much higher in the atmosphere.",
          "Nimbostratus is the thick dark rain layer sitting overhead. Wispy high streaks are the ones that arrive ahead of a change."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 's7-energy-2',
    subject: 'science',
    tier: 1,
    title: 'Energy II: Renewable vs. Nonrenewable',
    theme: 'Comparing energy sources and their environmental impact',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'Which of these is a renewable energy source?',
        choices: ['Solar power', 'Coal', 'Natural gas', 'Petroleum'],
        answer: 0,
        explanation: 'Solar power is naturally replenished, making it renewable.',
        choiceFeedback: [
          null,
          "Coal comes from plant matter buried and pressed for millions of years. Once a deposit is burned it is not coming back on any timescale we can use.",
          "Natural gas is a fossil fuel that formed underground over geological time. Supplies do not refill as we use them.",
          "Petroleum, or crude oil, is also a fossil fuel made from ancient buried organisms. Renewable sources refill continuously, like sunlight and wind."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'Which of these is a nonrenewable energy source?',
        choices: ['Coal', 'Wind', 'Solar', 'Hydropower'],
        answer: 0,
        explanation: 'Coal is a fossil fuel formed over millions of years and is nonrenewable on a human timescale.',
        choiceFeedback: [
          null,
          "Wind keeps blowing as long as the sun heats the air unevenly, so it renews itself constantly. That puts it on the renewable side.",
          "Sunlight arrives fresh every single day and we cannot use it up. Nonrenewable sources are the ones with a limited buried supply.",
          "Hydropower runs on the water cycle, which the sun keeps recharging through evaporation and rain. It renews naturally."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'Why are fossil fuels like coal and oil considered nonrenewable?',
        choices: [
          'They take millions of years to form and are being used much faster than they can be replaced',
          'They can be instantly regenerated',
          'They never run out',
          'They are the cleanest energy sources available'
        ],
        answer: 0,
        explanation: 'Fossil fuels form over millions of years, far slower than the rate they are consumed.',
        choiceFeedback: [
          null,
          "If they regenerated instantly they would be the very definition of renewable. The whole problem is that forming them takes millions of years.",
          "A source that never ran out would not be a concern at all. Fossil fuel supplies are finite, which is exactly why the word nonrenewable exists.",
          "How cleanly a fuel burns is a separate question from whether it can be replaced. Renewable or not depends on how fast nature makes more."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'What is a common environmental concern associated with burning fossil fuels?',
        choices: [
          'The release of greenhouse gases that contribute to climate change',
          'No environmental impact of any kind',
          'Fossil fuels only produce oxygen',
          'Burning fossil fuels cools the atmosphere'
        ],
        answer: 0,
        explanation: 'Burning fossil fuels releases greenhouse gases that contribute to climate change.',
        choiceFeedback: [
          null,
          "Burning any fuel sends gases and particles into the air, so there is always some effect. The main worry is the heat-trapping gases released.",
          "Burning uses up oxygen rather than making it. Plants are the ones that release oxygen, through photosynthesis.",
          "You may be thinking of ash and soot, which can block a little sunlight. The carbon dioxide released has a much larger warming effect."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 's7-forces-motion-2',
    subject: 'science',
    tier: 1,
    title: 'Forces and Motion II: Momentum',
    theme: 'Mass in motion and the conservation of momentum',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What is momentum, in physics terms?',
        choices: [
          'A measure of mass in motion, calculated as mass times velocity',
          "A measure of an object's temperature",
          'A type of energy stored at rest',
          "A measure of an object's color"
        ],
        answer: 0,
        explanation: 'Momentum is mass times velocity — a measure of mass in motion.',
        choiceFeedback: [
          null,
          "Temperature measures how fast particles jiggle inside an object. Momentum is about the whole object traveling from place to place.",
          "That describes potential energy, like a rocket on the pad holding fuel. Momentum only exists when something is actually moving.",
          "Color comes from the light an object reflects and has nothing to do with motion. Momentum combines how much mass is moving and how fast."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'If a heavier object and a lighter object move at the same speed, which has more momentum?',
        choices: ['The heavier object', 'The lighter object', 'Both have exactly equal momentum', 'Momentum does not depend on mass'],
        answer: 0,
        explanation: 'Since momentum is mass times velocity, the heavier object has more momentum at the same speed.',
        choiceFeedback: [
          null,
          "Momentum is mass times velocity, so more mass at the same speed gives a bigger number. You may be thinking of which one is easier to stop.",
          "Equal momentum would need the mass times velocity results to match. The speeds match here, but the masses do not.",
          "Mass sits right in the formula, momentum equals mass times velocity. That is why a loaded cargo jet is far harder to slow than a small plane at the same speed."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'What happens to the total momentum of a closed system during a collision, according to the law of conservation of momentum?',
        choices: [
          'Total momentum stays the same before and after the collision',
          'Momentum is always destroyed in a collision',
          'Momentum only exists after a collision',
          'Momentum doubles in every collision'
        ],
        answer: 0,
        explanation: 'The law of conservation of momentum states total momentum in a closed system stays constant.',
        choiceFeedback: [
          null,
          "Collisions do turn some kinetic energy into heat and sound, which may be what you had in mind. Momentum itself is not destroyed, it gets shared.",
          "The objects already have mass and velocity before they hit, so momentum exists beforehand. The law is all about comparing before with after.",
          "Nothing in the collision brings in extra mass or speed from outside. In a closed system the total gets passed around, not multiplied."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'A moving ball hits a stationary ball of equal mass and transfers its motion. What physics principle does this best demonstrate?',
        choices: ['Conservation of momentum', 'Conservation of color', 'The law of gravity only', "Newton's law of universal color"],
        answer: 0,
        explanation: 'Transferring motion between colliding objects demonstrates conservation of momentum.',
        choiceFeedback: [
          null,
          "There is no such law in physics. What passes from one ball to the other is motion, and motion is measured by momentum.",
          "Gravity pulls both balls toward Earth, but it is not what sends the second one rolling. The transfer happens through the collision itself.",
          "Newton's universal law is about gravitation, not color. Ball-to-ball transfer of motion is a momentum question."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 's7-gravity-2',
    subject: 'science',
    tier: 1,
    title: 'Gravity II: Weight vs. Mass',
    theme: 'Why an astronaut weighs less on the Moon but has the same mass',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What is the difference between mass and weight?',
        choices: [
          'Mass is the amount of matter in an object; weight is the force of gravity acting on that mass',
          'Mass and weight are exactly the same thing everywhere',
          'Weight never changes regardless of location',
          'Mass changes depending on gravity'
        ],
        answer: 0,
        explanation: 'Mass measures matter; weight measures the gravitational force on that matter.',
        choiceFeedback: [
          null,
          "They are linked but not identical. Take the same object to the Moon and the matter inside it is unchanged while the pull on it drops.",
          "Weight depends on how strong gravity is where you are, so it changes between Earth, the Moon, and orbit. Mass is the part that stays put.",
          "That is backwards. Gravity changes what you weigh, but the amount of matter in you stays exactly the same."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: "Would an astronaut's mass change if they traveled from Earth to the Moon?",
        choices: ['No, mass stays the same regardless of location', 'Yes, mass would double', 'Yes, mass would become zero', 'Mass only exists on Earth'],
        answer: 0,
        explanation: "Mass doesn't change with location — only weight changes based on local gravity.",
        choiceFeedback: [
          null,
          "Nothing about the trip adds matter to the astronaut. Weight is what changes, and it goes down rather than up.",
          "Floating astronauts look weightless, so this is a fair guess. They still have all their matter, which is why a drifting astronaut is still hard to stop.",
          "Every object anywhere in the universe has mass. It is a property of the matter itself, not of the planet you happen to stand on."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: "Would an astronaut's weight change if they traveled from Earth to the Moon?",
        choices: [
          "Yes, weight would decrease since the Moon's gravity is weaker",
          'No, weight never changes anywhere',
          'Weight would increase on the Moon',
          'Weight and mass are unrelated to gravity'
        ],
        answer: 0,
        explanation: "Weight depends on gravity, and the Moon's weaker gravity means less weight there.",
        choiceFeedback: [
          null,
          "You may be thinking of mass, which really does stay constant. Weight is the pull of gravity on you, and the Moon pulls more gently.",
          "The Moon is much smaller and less massive than Earth, so its surface gravity is weaker, roughly one sixth of ours. Weaker pull means less weight.",
          "Weight is defined by gravity: it is the gravitational force acting on an object's mass. Change the gravity and the weight changes with it."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'What unit is commonly used to measure mass in the metric system?',
        choices: ['Kilograms', 'Newtons', 'Watts', 'Joules'],
        answer: 0,
        explanation: 'Kilograms measure mass in the metric system; Newtons measure force/weight.',
        choiceFeedback: [
          null,
          "Newtons measure force, which is what weight is. Close cousin, but this question asks for the amount of matter.",
          "Watts measure power, meaning how fast energy is delivered or used, like an engine's output. That is not a measure of matter.",
          "Joules measure energy or work done. Handy for talking about fuel, but not for how much matter something contains."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 's7-aerodynamics-2',
    subject: 'science',
    tier: 1,
    title: 'Aerodynamics II: Airfoils & Angle of Attack',
    theme: 'The wing shape and angle that let airplanes and birds fly',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: "What shape do most airplane wings have, with a curved top and flatter bottom, that helps generate lift?",
        choices: ['An airfoil shape', 'A perfect circle', 'A perfect square', 'A straight flat plane only'],
        answer: 0,
        explanation: 'An airfoil shape, curved on top and flatter on the bottom, helps generate lift.',
        choiceFeedback: [
          null,
          "A circle meets the air the same way from every direction, so there is no smooth front-to-back flow. Wings need a leading edge and a tapering trailing edge.",
          "Sharp square corners would tear the airflow apart and create enormous drag. Wing cross-sections are smooth and streamlined instead.",
          "A flat plate does make some lift when tilted, so this is not a wild guess. The curved-top shape does the same job far more efficiently, which is why real wings use it."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: "What happens to lift if a wing's angle relative to oncoming air (angle of attack) increases moderately?",
        choices: [
          'Lift generally increases, up to a point',
          'Lift always immediately disappears',
          'Lift has no relationship to this angle',
          'The wing stops working entirely'
        ],
        answer: 0,
        explanation: 'Lift generally increases with angle of attack, up to the point where a stall occurs.',
        choiceFeedback: [
          null,
          "That does eventually happen, but only past the critical angle when the airflow separates and the wing stalls. A moderate increase does the opposite.",
          "Angle of attack is one of the main things a pilot adjusts to control lift. Raise the nose a little and lift goes up.",
          "A wing keeps making lift throughout the moderate range. Only when the angle gets too steep does the smooth airflow break away."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'What are the four forces that act on any object flying through the air?',
        choices: [
          'Lift, drag, thrust, and weight',
          'Only lift and drag',
          'Only thrust and gravity',
          'Speed, mass, time, and distance'
        ],
        answer: 0,
        explanation: 'Lift, drag, thrust, and weight are the four forces acting on any flying object.',
        choiceFeedback: [
          null,
          "Lift and drag are two of the four, and you named them correctly. Missing are the pair acting along the flight path and downward: thrust and weight.",
          "Thrust and weight are two real forces on an aircraft. This list leaves out what the wings create and what the air pushes back with, lift and drag.",
          "These are measurements, not forces. A force is a push or a pull, like the engine's thrust or gravity's downward pull."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'Why do birds and airplanes both rely on similar aerodynamic principles to fly?',
        choices: [
          'Both use wing shapes that interact with airflow to generate lift',
          'Birds and airplanes use completely unrelated methods to fly',
          'Only airplanes experience aerodynamic forces',
          'Birds do not experience lift or drag'
        ],
        answer: 0,
        explanation: 'Both birds and airplanes use wing shapes interacting with airflow to generate lift.',
        choiceFeedback: [
          null,
          "Early aircraft designers studied birds closely for exactly this reason. Both move a wing through air to make lift, even though one flaps and one uses engines.",
          "Any object moving through air feels aerodynamic forces, birds very much included. That is how a bird can glide without flapping.",
          "A hawk soaring without a wingbeat is lift in action, and a diving falcon folding its wings is a bird cutting drag."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 's7-electricity-2',
    subject: 'science',
    tier: 1,
    title: 'Electricity II: Series & Parallel Circuits',
    theme: 'How circuit design affects what happens when one part fails',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'In a series circuit, if one bulb burns out, what typically happens to the other bulbs in that circuit?',
        choices: ['They also stop working, since the circuit is broken', 'They stay lit exactly as before', 'They get brighter', 'Nothing changes in the circuit'],
        answer: 0,
        explanation: 'In a series circuit, a single break stops current everywhere, so all bulbs go out.',
        choiceFeedback: [
          null,
          "That is what happens in a parallel circuit, where each bulb has its own path. A series circuit is one single loop, so a break anywhere stops current for everyone.",
          "It makes sense to think one less bulb leaves more energy for the rest, but a burned-out bulb is a gap in the loop, not a shortcut. No complete path means no current at all.",
          "A burned-out bulb does not just quietly stop glowing. Its filament snaps, which opens the loop and changes the whole circuit."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'In a parallel circuit, if one bulb burns out, what typically happens to the other bulbs?',
        choices: [
          'They generally continue working, since each has its own path',
          'They immediately stop working too',
          'The whole circuit shorts out',
          'Nothing in a parallel circuit can ever fail'
        ],
        answer: 0,
        explanation: 'Parallel circuits give each component its own path, so others keep working if one fails.',
        choiceFeedback: [
          null,
          "You applied the series rule here. In parallel, each bulb sits on its own branch, so losing one branch still leaves the others connected.",
          "A short circuit is an unexpected low-resistance shortcut. A burned-out bulb is the opposite: a gap that simply closes off that one branch.",
          "Parts in a parallel circuit fail just as often. What parallel wiring changes is that one failure does not take everything else down with it."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'What is the main structural difference between a series and a parallel circuit?',
        choices: [
          'A series circuit has one single path for current; a parallel circuit has multiple paths',
          'A series circuit always has more paths than a parallel circuit',
          'They are identical with no structural difference',
          'A parallel circuit only works with one device'
        ],
        answer: 0,
        explanation: 'Series circuits have one path; parallel circuits have multiple independent paths.',
        choiceFeedback: [
          null,
          "You have the two names swapped. Extra paths are exactly what makes a circuit parallel, so a series circuit cannot have more of them.",
          "The names describe real wiring layouts, not just two words for one thing. How many paths the current can take is what separates them.",
          "One device on one path describes a simple series loop. Parallel wiring is built to run several devices at once, each on its own branch."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: "Which circuit type is commonly used in household wiring, so that one broken appliance doesn't shut off all the others?",
        choices: ['Parallel circuits', 'Series circuits exclusively', 'Neither type is used in homes', 'Both types are never mixed'],
        answer: 0,
        explanation: 'Household wiring uses parallel circuits so one broken device doesn\u2019t disable everything else.',
        choiceFeedback: [
          null,
          "Think about what that would mean at home: unplugging one lamp would shut off your whole house. Old-style holiday lights work that way, which is why one dead bulb killed the strand.",
          "Homes are full of circuits, one behind every outlet and switch. The real question is which layout keeps devices independent of each other.",
          "Homes do mix them, since a light switch sits in series with the light it controls. The question is asking about the main layout that keeps appliances independent."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 's7-magnetism-2',
    subject: 'science',
    tier: 1,
    title: 'Magnetism II: Electromagnets & Magnetic Poles',
    theme: 'Attraction, repulsion, and controllable magnetism',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What happens when you bring the same poles of two magnets close together (like north to north)?',
        choices: ['They repel each other', 'They attract each other', 'Nothing happens between them', 'They merge into one pole'],
        answer: 0,
        explanation: 'Like poles (north-north or south-south) repel each other.',
        choiceFeedback: [
          null,
          "You have the rule flipped. Attraction happens between opposite poles; two norths or two souths push apart.",
          "Magnets act on each other through the air before they ever touch, which is why you can feel that push building in your hands.",
          "Poles are not substances that blend together. Every magnet keeps both a north and a south, even if you break it in half."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'What happens when you bring opposite poles of two magnets close together (north to south)?',
        choices: ['They attract each other', 'They repel each other', 'Nothing happens between them', 'They cancel out completely'],
        answer: 0,
        explanation: 'Opposite poles (north-south) attract each other.',
        choiceFeedback: [
          null,
          "That is the rule for matching poles. North facing south is the pairing that pulls together.",
          "You can feel the pull before the magnets meet, so something is definitely happening across that gap.",
          "You may be treating north and south like plus one and minus one that add to zero. They do not neutralize each other, they pull toward each other."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'How can you increase the strength of an electromagnet?',
        choices: [
          'Increase the electric current or add more coils of wire',
          'Decrease the current to zero',
          'Remove the metal core entirely',
          'Use a material that blocks magnetism'
        ],
        answer: 0,
        explanation: 'More current or more coils of wire increases an electromagnet\u2019s strength.',
        choiceFeedback: [
          null,
          "Zero current is how you switch an electromagnet off. The magnetic field in an electromagnet comes from the current, so cutting it removes the magnetism.",
          "The iron core is doing real work, concentrating the magnetic field the coil produces. Taking it out makes the electromagnet weaker, not stronger.",
          "Shielding material redirects a magnetic field away from something. That protects nearby equipment, but it does not add strength to the magnet itself."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'Why are electromagnets useful in devices like electric motors and MRI machines, compared to permanent magnets?',
        choices: [
          'Electromagnets can be turned on/off and their strength adjusted by controlling electric current',
          'Electromagnets are always weaker than permanent magnets',
          'Electromagnets never lose their magnetism',
          'Permanent magnets can be turned off but electromagnets cannot'
        ],
        answer: 0,
        explanation: 'Electromagnets can be switched on/off and adjusted by controlling current, unlike permanent magnets.',
        choiceFeedback: [
          null,
          "Strength is not the limit here. An MRI machine uses an electromagnet far more powerful than any permanent magnet you could hold.",
          "An electromagnet loses its field the instant the current stops. That switchability is the whole advantage, not a flaw.",
          "You have the two backwards. A permanent magnet stays magnetic whether you want it to or not, while an electromagnet is the one you can control."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 's7-materials-science-2',
    subject: 'science',
    tier: 1,
    title: 'Materials Science II: Composites & Alloys',
    theme: 'Combining materials to get properties neither has alone',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What is a "composite material," like carbon fiber reinforced polymer?',
        choices: [
          'A material made by combining two or more different materials to get improved properties',
          'A pure single element with no other materials mixed in',
          'A material that only exists in liquid form',
          'A synonym for any metal'
        ],
        answer: 0,
        explanation: 'A composite combines different materials to achieve properties neither has alone.',
        choiceFeedback: [
          null,
          "A pure element is one kind of atom on its own, which is the opposite of a composite. Composites exist because combining materials beats either one alone.",
          "Composites are structural solids, used for wings, helmets, and bike frames. The liquid resin stage happens during manufacturing, then it hardens.",
          "Some composites include metal, but the word describes the combining, not the ingredient. A single metal by itself is not a composite."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'Why do engineers often prefer carbon fiber composites for aircraft parts, despite their higher cost?',
        choices: [
          'They offer a high strength-to-weight ratio, making structures lighter without sacrificing strength',
          'They are always heavier than metal',
          'They cannot withstand any stress at all',
          'They are the cheapest material available'
        ],
        answer: 0,
        explanation: 'Carbon fiber composites offer a high strength-to-weight ratio, valuable for aircraft.',
        choiceFeedback: [
          null,
          "It is the reverse. Carbon fiber is chosen because it can match a metal part's strength at noticeably less weight.",
          "Carbon fiber composites carry enormous loads, including the wings that hold up an airliner. Handling stress is exactly why engineers use them.",
          "The question itself mentions their higher cost, so price is not the selling point. What engineers are buying is strength for very little weight."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'What is an "alloy"?',
        choices: [
          'A mixture of two or more metals, or a metal combined with another element',
          'A pure, single metal element',
          'A type of plastic only',
          'A type of ceramic only'
        ],
        answer: 0,
        explanation: 'An alloy is a mixture of metals, or a metal combined with another element.',
        choiceFeedback: [
          null,
          "Pure means nothing else mixed in, which is the one thing an alloy is not. Copper by itself is a metal; copper plus tin is bronze, an alloy.",
          "Plastics are made of long carbon-based molecules, a different family of materials. Alloys start with metal.",
          "Ceramics are made from clay-like or mineral materials fired hard, and they are their own category. Alloys are metal-based."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: "Why is steel, an alloy of iron and carbon, generally stronger than pure iron alone?",
        choices: [
          "Adding carbon changes iron's internal structure, making it harder and stronger",
          "Carbon has no effect on iron's properties",
          'Pure iron is always stronger than any alloy',
          'Steel contains no iron at all'
        ],
        answer: 0,
        explanation: 'Carbon changes iron\u2019s internal structure, making steel harder and stronger than pure iron.',
        choiceFeedback: [
          null,
          "If carbon changed nothing, steel and iron would behave identically, and bridges could be built from either. A small amount of carbon changes iron a lot.",
          "You have it backwards. Pure iron is fairly soft, which is why people learned to alloy it.",
          "Steel is mostly iron, with just a small percentage of carbon added. The carbon is the adjustment, not the main ingredient."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 's7-engineering-design-2',
    subject: 'science',
    tier: 1,
    title: 'Engineering Design II: Prototyping & Testing',
    theme: 'Why engineers build rough versions and push designs to failure',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'Why do engineers often build a rough, low-cost prototype before investing in a polished final product?',
        choices: [
          'It allows testing and identifying problems early, before spending significant time and money',
          'Prototypes are always identical to the final product',
          'Prototyping wastes time with no benefit',
          'It is required to skip all future testing'
        ],
        answer: 0,
        explanation: 'Prototypes let engineers catch problems early, before major investment.',
        choiceFeedback: [
          null,
          "If a prototype were identical to the final product, there would be no reason to build it first. Early prototypes are deliberately rough so they are fast and cheap to change.",
          "Time spent early is what saves time later. Finding a flaw in a cardboard model costs almost nothing; finding it in a finished vehicle costs a great deal.",
          "A prototype starts the testing process rather than ending it. Every change made afterward still has to be tested."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'What is "failure testing," intentionally pushing a design to its breaking point?',
        choices: [
          "A method to understand a design's limits and improve safety margins",
          'A method with no useful engineering purpose',
          'A test that always destroys the final product with no data gained',
          'A test only used for entertainment'
        ],
        answer: 0,
        explanation: 'Failure testing reveals a design\u2019s limits, informing safety margins.',
        choiceFeedback: [
          null,
          "Breaking something on purpose in a controlled test is a real engineering tool. Knowing the exact point where a part fails tells you how much margin you actually have.",
          "Engineers break test articles built for that purpose, not the hardware that flies. And the breaking point itself is the data they came for.",
          "Crash tests and pressure tests look dramatic, but each one is recorded and measured. The video is a side effect of the measurement."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'Why might engineers test a design under extreme conditions (like very high or low temperatures) that it may rarely encounter?',
        choices: [
          'To ensure the design remains safe and functional even in rare, extreme circumstances',
          'Extreme condition testing has no engineering value',
          'Products never need to handle unusual conditions',
          'Testing under normal conditions is always sufficient'
        ],
        answer: 0,
        explanation: 'Extreme condition testing ensures safety and function even in rare circumstances.',
        choiceFeedback: [
          null,
          "Rare is not the same as never. A part that fails once in a thousand flights still fails, and someone is on that flight.",
          "Unusual conditions show up more than you would think. An airliner leaves a hot runway and cruises where the air is around fifty degrees below zero, on the same trip.",
          "Most designs behave fine under normal conditions, which is exactly why normal testing hides problems. Weaknesses appear at the edges."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'What term describes making incremental improvements to a design based on test results, repeating the cycle multiple times?',
        choices: ['Iterative design', 'A one-time final design', 'Ignoring test results entirely', 'Random redesign with no direction'],
        answer: 0,
        explanation: 'Iterative design means repeatedly refining based on test results.',
        choiceFeedback: [
          null,
          "That describes designing once and stopping, which is the opposite of the repeating cycle in the question. The key idea here is going around again.",
          "The term names a process that runs on test results, not one that discards them. Each round of testing points to the next improvement.",
          "Iteration is repeated, but not random. Each change is aimed at a specific problem the last test revealed."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 's7-environmental-science-2',
    subject: 'science',
    tier: 1,
    title: 'Environmental Science II: Carbon Cycle & Climate',
    theme: 'How carbon moves through the atmosphere, plants, and human activity',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What natural process do plants use to remove carbon dioxide from the atmosphere?',
        choices: ['Photosynthesis', 'Respiration only', 'Combustion', 'Erosion'],
        answer: 0,
        explanation: 'Photosynthesis removes carbon dioxide from the atmosphere as plants make food.',
        choiceFeedback: [
          null,
          "Plants really do carry out respiration, so this is a fair thought, but respiration releases carbon dioxide. The process that takes it in is the other one.",
          "Combustion is burning, and it puts carbon dioxide into the air. It also is not something a plant does.",
          "Erosion is wind and water wearing down rock and soil. It moves material around but is not how a plant handles gases."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'What term describes gases in the atmosphere, like carbon dioxide, that trap heat and contribute to warming?',
        choices: ['Greenhouse gases', 'Noble gases', 'Inert gases exclusively', 'Neutral gases'],
        answer: 0,
        explanation: 'Greenhouse gases trap heat in the atmosphere, contributing to warming.',
        choiceFeedback: [
          null,
          "Noble gases like helium and neon are grouped by their chemistry, since they barely react with anything. That grouping has nothing to do with trapping heat.",
          "Inert describes how easily a gas reacts, which is a different property entirely. Carbon dioxide and methane are grouped by what they do to heat.",
          "Neutral usually refers to charge or to pH, not to how a gas handles heat. The category you want is named for how a greenhouse holds warmth in."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'What human activity is widely cited as significantly increasing atmospheric carbon dioxide levels since the industrial era?',
        choices: ['Burning fossil fuels', 'Planting more trees', 'Reducing energy use', 'Using only renewable energy'],
        answer: 0,
        explanation: 'Burning fossil fuels is widely cited as a major driver of rising atmospheric CO2.',
        choiceFeedback: [
          null,
          "Planting trees pulls carbon dioxide out of the air rather than adding it. The question asks what pushed levels up.",
          "Using less energy means burning less fuel, which lowers emissions. You are looking for the activity that raised carbon dioxide, not one that reduces it.",
          "Renewable sources like wind and solar generate power without burning stored carbon. The rise came from a different source of energy."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'Why might reforestation (planting new trees) help address rising atmospheric carbon dioxide?',
        choices: [
          'Trees absorb carbon dioxide through photosynthesis as they grow',
          'Trees release large amounts of carbon dioxide with no absorption',
          'Reforestation has no effect on atmospheric carbon',
          'Trees only affect oxygen levels, not carbon dioxide'
        ],
        answer: 0,
        explanation: 'Growing trees absorb carbon dioxide through photosynthesis, helping offset emissions.',
        choiceFeedback: [
          null,
          "Trees do release some carbon dioxide when they respire, so you are half right. A growing forest takes in more than it gives off, locking the difference into wood.",
          "The wood, bark, and leaves of a tree are built largely from carbon the tree pulled out of the air. That carbon has to come from somewhere.",
          "Oxygen and carbon dioxide are two ends of the same reaction. A plant cannot release that oxygen without taking carbon dioxide in first."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 's7-space-science-2',
    subject: 'science',
    tier: 1,
    title: 'Space Science II: Space Stations & Life Support',
    theme: 'How humans live and work in orbit for months at a time',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What is the primary purpose of the International Space Station?',
        choices: [
          'To serve as a research laboratory for long-duration science in microgravity',
          'To serve only as a tourist destination',
          'To function as a weapon platform',
          'To replace all other satellites'
        ],
        answer: 0,
        explanation: 'The ISS serves primarily as a research laboratory for long-duration microgravity science.',
        choiceFeedback: [
          null,
          "A few private visitors have flown to the station, so this is not out of nowhere. But its full-time job is running experiments crews cannot run on Earth.",
          "The ISS is a civilian science station built and operated together by several countries, including partners who have been rivals on the ground.",
          "Satellites do jobs the station cannot, like GPS, weather imaging, and communications relay, from orbits chosen for each task. One station in one orbit cannot cover that."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'Why must a space station recycle air and water rather than simply venting used resources into space?',
        choices: [
          'Resupplying consumable resources from Earth is expensive and limited, so recycling extends how long a crew can stay',
          'Recycling has no benefit for long missions',
          'Space stations have unlimited resources with no need for recycling',
          'Venting resources is always safer than recycling them'
        ],
        answer: 0,
        explanation: 'Recycling extends how long a crew can stay, since resupply from Earth is costly and limited.',
        choiceFeedback: [
          null,
          "The longer the mission, the bigger the payoff. Recycling matters most exactly when a crew stays up for months.",
          "Every drop of water and breath of air up there was launched from Earth at great cost per kilogram. Nothing aboard is unlimited.",
          "Venting throws away the supplies keeping the crew alive. Stations do vent waste sometimes, but that is a last resort, not the safe default."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'What allows astronauts aboard a space station to communicate with mission control on Earth?',
        choices: [
          'Radio and satellite communication systems',
          'Only handwritten letters delivered by rocket',
          'No communication is possible once in space',
          'Telepathy'
        ],
        answer: 0,
        explanation: 'Radio and satellite communication systems let astronauts stay in contact with mission control.',
        choiceFeedback: [
          null,
          "Cargo flights arrive every few months, which is far too slow for a crew that talks with the ground many times a day.",
          "Radio waves are a form of light, and light crosses empty space just fine. You may be thinking of sound, which does need air to travel.",
          "Telepathy is not a real mechanism scientists can measure or build a system around. The station relies on equipment engineers can test."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'Why do space stations typically orbit at a specific altitude in low Earth orbit rather than much higher or lower?',
        choices: [
          'It balances practical communication, resupply logistics, and orbital stability',
          "It has no effect on a space station's operations",
          'Lower orbits are always more dangerous with no benefits',
          "Space stations must orbit exactly at the Moon's distance"
        ],
        answer: 0,
        explanation: 'The chosen altitude balances communication, resupply logistics, and orbital stability.',
        choiceFeedback: [
          null,
          "Altitude drives almost everything for a station: how much thin air drags on it, how much radiation it takes, and how hard resupply is.",
          "Lower orbits do have real benefits, since they are cheaper to reach and let a crew return quickly. The tradeoff is more atmospheric drag pulling the station down.",
          "The Moon is roughly a thousand times farther out than the space station orbits. At that distance, routine resupply or an emergency return would be out of reach."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 's7-rocket-science-2',
    subject: 'science',
    tier: 1,
    title: 'Rocket Science II: Staging & Specific Impulse',
    theme: 'Why rockets shed weight in stages and how engine efficiency is measured',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'Why do most large rockets use multiple stages instead of a single stage?',
        choices: [
          'Dropping empty, heavier stages during flight makes the rocket more efficient as it climbs',
          'Multiple stages always make a rocket less efficient',
          'Single-stage rockets are always superior',
          'Stages have no effect on rocket performance'
        ],
        answer: 0,
        explanation: 'Dropping empty stages reduces weight, improving efficiency as the rocket climbs.',
        choiceFeedback: [
          null,
          "It is the reverse. Once a tank is empty, hauling it upward wastes thrust, so dropping it helps.",
          "Single stage to orbit is a real goal engineers still chase, so the idea is not silly. The problem is that such a rocket must carry all its empty structure the whole way up.",
          "Mass is the central problem in rocketry, and staging is a way of shedding it mid-flight. That changes performance a great deal."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: "What is measured by a rocket engine's specific impulse?",
        choices: [
          'How efficiently the engine converts propellant into thrust',
          "The rocket's total weight at launch",
          "The rocket's color and appearance",
          'The number of people the rocket can carry'
        ],
        answer: 0,
        explanation: 'Specific impulse measures how efficiently an engine converts propellant into thrust.',
        choiceFeedback: [
          null,
          "That is liftoff mass, a completely different number. Specific impulse is about the engine's efficiency, not the vehicle's size.",
          "Appearance tells you nothing about performance. Specific impulse is a measured value about how well propellant is used.",
          "Crew capacity depends on the capsule, not the engine. Specific impulse describes what happens inside the engine."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'What are the two main components rocket propellant is generally divided into?',
        choices: ['Fuel and oxidizer', 'Only fuel, with no oxidizer needed', 'Water and air', 'Metal and plastic'],
        answer: 0,
        explanation: 'Rocket propellant generally consists of fuel and an oxidizer.',
        choiceFeedback: [
          null,
          "Skipping the oxidizer works for a car, which breathes air. A rocket has to bring along whatever the fuel needs in order to burn.",
          "Water does not burn, and air is not available where rockets go. Propellant needs something that burns plus something to burn it with.",
          "Metal and plastic are materials a rocket is built from. The question is about the two roles propellant fills once it reaches the engine."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'Why must rockets carry an oxidizer, unlike a car engine that uses air from the atmosphere?',
        choices: [
          'There is no oxygen available once a rocket leaves the atmosphere',
          'Oxidizers make rockets heavier with no benefit',
          'Cars do not require oxygen either',
          'Rockets never need to burn fuel'
        ],
        answer: 0,
        explanation: 'Rockets must carry their own oxidizer since there\u2019s no atmospheric oxygen once they leave the atmosphere.',
        choiceFeedback: [
          null,
          "The oxidizer really is heavy, often heavier than the fuel itself, so that part is true. Engineers carry it anyway because without it the fuel cannot burn at all.",
          "A car engine does use oxygen; it just pulls it in from the air through an intake. That is the whole difference the question is pointing at.",
          "Burning propellant and pushing the exhaust out the nozzle is how a chemical rocket produces thrust. That combustion is the engine's entire job."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 's7-planetary-science-2',
    subject: 'science',
    tier: 1,
    title: 'Planetary Science II: Moons & Rings',
    theme: 'Comparing moon counts and ring systems across the solar system',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'Which two planets in our solar system have no moons at all?',
        choices: ['Mercury and Venus', 'Earth and Mars', 'Jupiter and Saturn', 'Uranus and Neptune'],
        answer: 0,
        explanation: 'Mercury and Venus are the only two planets in our solar system with no moons.',
        choiceFeedback: [
          null,
          "Earth has our Moon, and Mars has two small ones. Neither belongs on a list of moonless planets.",
          "Those two are at the far opposite end, with dozens of known moons each, including giants like Ganymede and Titan.",
          "Both of those have large moon families, including Titania at Uranus and Triton at Neptune."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'Earth has one moon. How many moons does Mars have?',
        choices: ['Two (Phobos and Deimos)', 'Zero', 'One', 'Twelve'],
        answer: 0,
        explanation: 'Mars has two small moons, Phobos and Deimos.',
        choiceFeedback: [
          null,
          "Mars's moons are tiny and lumpy, more like captured asteroids than a moon such as ours, so they are easy to overlook. There are still two of them.",
          "You may have matched Mars to Earth's single moon. Mars actually has one more than we do.",
          "That is closer to what you would find at a giant planet like Jupiter or Saturn. A small planet like Mars holds onto far fewer."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'Which planet is known for having a spectacular, easily visible ring system made mostly of ice and rock?',
        choices: ['Saturn', 'Mercury', 'Venus', 'Earth'],
        answer: 0,
        explanation: 'Saturn is famous for its bright, easily visible ring system.',
        choiceFeedback: [
          null,
          "Mercury is a small, airless rocky world hugging the Sun, with no ring system at all.",
          "Venus shines very brightly in our sky, which may be what caught your eye, but that glare comes from thick clouds reflecting sunlight, not from rings.",
          "If Earth had a bright ring system, you could look up tonight and see it arcing across the sky."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'Besides Saturn, which other outer planets also have (much fainter) ring systems?',
        choices: ['Jupiter, Uranus, and Neptune', 'Only Earth and Mars', 'No other planets have rings', 'Only Mercury and Venus'],
        answer: 0,
        explanation: 'Jupiter, Uranus, and Neptune all have fainter ring systems in addition to Saturn.',
        choiceFeedback: [
          null,
          "The inner rocky planets have no rings. The ring systems in our solar system all belong to the outer giants.",
          "The other giants' rings are dark and faint rather than absent, which is why they went unnoticed for so long. Spacecraft and careful telescope work found them.",
          "Those two are the planets with no moons and no rings, so they are the least likely candidates here."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 's7-scientific-method-2',
    subject: 'science',
    tier: 1,
    title: 'Scientific Method II: Designing a Fair Experiment',
    theme: 'Controlling variables, replication, and avoiding bias',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'Why is it important to change only ONE variable at a time in a controlled experiment?',
        choices: [
          'Changing only one variable makes it possible to determine what actually caused an observed result',
          'Changing multiple variables always gives clearer results',
          'Variables have no effect on experimental results',
          'It is impossible to change just one variable'
        ],
        answer: 0,
        explanation: 'Isolating one variable at a time lets researchers determine what actually caused a result.',
        choiceFeedback: [
          null,
          "When two things change at once and the result shifts, you cannot tell which one caused it. Changing more variables gives you a muddier answer, not a clearer one.",
          "The variable is the very thing being tested, so it has to matter. The question is how to tell which variable did the work.",
          "It takes planning, but keeping everything else the same is exactly what a controlled experiment is designed to do."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'What term describes a study repeated multiple times to check whether the results are consistent?',
        choices: ['Replication', 'Contamination', 'Bias', 'Extrapolation'],
        answer: 0,
        explanation: 'Replication means repeating a study to check whether results are consistent.',
        choiceFeedback: [
          null,
          "Contamination is unwanted material getting into a sample and spoiling it. It is a problem to avoid, not a way of checking results.",
          "Bias is something that tilts results in one direction. It describes a flaw in a study rather than the act of repeating one.",
          "Extrapolation is stretching a conclusion beyond the range you actually tested. That is reaching further, not running the study again."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'Why might scientists use a large sample size (many test subjects or trials) rather than just one or two?',
        choices: [
          'Larger sample sizes generally produce more reliable, generalizable results',
          'Small sample sizes are always more accurate',
          'Sample size has no effect on reliability',
          'One trial is always sufficient for any experiment'
        ],
        answer: 0,
        explanation: 'Larger sample sizes generally produce more reliable and generalizable results.',
        choiceFeedback: [
          null,
          "It is the other way around. With only one or two subjects, a single unusual result can swing the entire conclusion.",
          "Sample size is one of the main things that decides how much you can trust a result. Random flukes even out as the number of trials grows.",
          "One trial cannot tell you whether a result repeats or was a lucky accident. That is why engineers run a test many times before trusting it."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'What is "bias," in the context of designing a fair experiment?',
        choices: [
          'A factor that skews results in a particular direction, reducing objectivity',
          'A synonym for a hypothesis',
          'A required part of every good experiment',
          'A type of control group'
        ],
        answer: 0,
        explanation: 'Bias is a factor that skews results in a particular direction, reducing objectivity.',
        choiceFeedback: [
          null,
          "A hypothesis is the testable prediction you make before the experiment. Bias is something that quietly pushes the results afterward.",
          "You may be thinking of controls, which every good experiment does need. Bias is the thing careful design tries to keep out.",
          "A control group is the comparison group you measure against. Bias is a distorting influence that can affect any group in a study."
        ],
        xp: 10
      }
    ]
  }
];
