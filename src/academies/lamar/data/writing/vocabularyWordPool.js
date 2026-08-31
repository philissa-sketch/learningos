// ---------------------------------------------------------------------------
// Master vocabulary word pool for the Weekly Word List system.
// Words are introduced in this fixed order as "new" words are needed to
// fill out a week's list of 10 (see useAppStore.js::advanceWeeklyWordList).
//
// EVERY CONTEXT SENTENCE IS SET IN AEROSPACE, AVIATION OR ENGINEERING.
// (Rewritten Aug 9 2026, at the parent's instruction: "Vocab is supposed to be
// aerospace based.") The first ~120 words already were; from there the pool had
// drifted into general science, math, civics and academic vocabulary, so a word
// he met in November taught him nothing about the career the whole curriculum is
// pointed at.
//
// The sentence is not decoration -- it is the teaching. Three of the five daily
// activities read it: Tuesday infers the meaning from it, Wednesday blanks the
// word out of it and asks which word fits, Friday tests on it. So each sentence
// has to make the meaning GUESSABLE by someone who does not know the word. A
// sentence that would work equally well with any word teaches nothing, and
// scripts/verify-word-study.mjs checks the mechanical half of that rule.
// ---------------------------------------------------------------------------

export const vocabularyWordPool = [
  {
    id: "vc-01",
    word: "prototype",
    sentence: "Before the real drone was built, a rough {word} flew in the hangar to test the controls.",
    correct: "An early working model used for testing",
    distractors: ["A final, mass-produced version", "A type of fastening bolt", "A safety inspection report"]
  },
  {
    id: "vc-02",
    word: "iterate",
    sentence: "Each week the wing team would {word}, changing the shape a little and testing it again.",
    correct: "To repeat a process with small improvements each time",
    distractors: ["To destroy and start over from nothing", "To copy someone else's design exactly", "To submit a design for a patent"]
  },
  {
    id: "vc-03",
    word: "calibrate",
    sentence: "Ground crews {word} the fuel gauges so every reading matches the true amount in the tank.",
    correct: "To adjust an instrument so its readings are accurate",
    distractors: ["To paint a new coat on equipment", "To permanently disable a device", "To transport equipment to a new location"]
  },
  {
    id: "vc-04",
    word: "tolerance",
    sentence: "Machinists allow a {word} of half a millimeter, and parts outside that range are rejected.",
    correct: "The acceptable range of variation a design can safely handle",
    distractors: ["The total weight a bridge can hold", "The number of years a bridge will last", "A type of building material"]
  },
  {
    id: "vc-05",
    word: "redundancy",
    sentence: "Spare oxygen pumps give the capsule {word}, so one failure will not end the mission.",
    correct: "A backup system that takes over if the main one fails",
    distractors: ["The main and only system with no backup", "A type of lightweight metal", "A scheduled maintenance check"]
  },
  {
    id: "vc-06",
    word: "torque",
    sentence: "Turning the wrench applies {word} to the bolt, twisting it tighter with every pull.",
    correct: "A twisting or turning force",
    distractors: ["A type of adhesive", "The weight of an object", "A measurement of temperature"]
  },
  {
    id: "vc-07",
    word: "payload",
    sentence: "Inside the nose cone sat the {word}: a weather satellite the rocket was hired to carry.",
    correct: "The cargo or equipment a vehicle carries to accomplish its mission",
    distractors: ["The fuel used to launch a rocket", "A rocket's outer shell", "The ground crew operating a mission"]
  },
  {
    id: "vc-08",
    word: "velocity",
    sentence: "Mission control tracked the capsule's {word}, 500 miles per hour straight toward the landing zone.",
    correct: "Speed in a specific direction",
    distractors: ["Total distance traveled", "The mass of an object", "A type of engine fuel"]
  },
  {
    id: "vc-09",
    word: "specification",
    sentence: "Every bolt must match the exact {word} written in the drawing, down to the last millimeter.",
    correct: "A detailed, precise requirement a design or part must meet",
    distractors: ["A rough estimate with no fixed numbers", "A finished product ready to ship", "A type of safety inspection"]
  },
  {
    id: "vc-10",
    word: "feasibility",
    sentence: "Nobody funds a Mars greenhouse until a {word} study shows the plan could actually work.",
    correct: "Whether something is possible or practical to do",
    distractors: ["The total cost of a finished project", "A legal contract between companies", "The color scheme of a design"]
  },
  {
    id: "vc-11",
    word: "optimize",
    sentence: "Wind tunnel tests helped the designers {word} the wing until drag was as low as possible.",
    correct: "To make something as effective or efficient as possible",
    distractors: ["To make something heavier", "To submit something for approval", "To completely stop working on something"]
  },
  {
    id: "vc-12",
    word: "constraint",
    sentence: "Weight was the tightest {word} on the rover design, ruling out every heavy metal part.",
    correct: "A limitation or restriction on what is possible",
    distractors: ["An award for good design", "A tool used to measure length", "A type of engine part"]
  },
  {
    id: "vc-13",
    word: "thrust",
    sentence: "When the jet engines lit, their {word} pushed the plane forward down the runway.",
    correct: "A forward force produced by an engine",
    distractors: ["A backward pulling force", "A type of fuel", "A cooling system"]
  },
  {
    id: "vc-14",
    word: "orbit",
    sentence: "Gravity keeps the small moon on a curved {word} around the giant planet.",
    correct: "The curved path an object follows around another body due to gravity",
    distractors: ["A type of rocket engine", "A ground control station", "The surface of a planet"]
  },
  {
    id: "vc-15",
    word: "propulsion",
    sentence: "Ion engines give the probe gentle {word}, slowly driving it forward for years.",
    correct: "The force that drives something forward",
    distractors: ["A type of metal alloy", "A navigation system", "A communication signal"]
  },
  {
    id: "vc-16",
    word: "aerodynamic",
    sentence: "Designers gave the jet a {word} nose so it slips through air with very little resistance.",
    correct: "Designed to move through air with minimal resistance",
    distractors: ["Extremely heavy", "Resistant to heat", "Powered by solar energy"]
  },
  {
    id: "vc-17",
    word: "friction",
    sentence: "When the landing wheels rub the runway, {word} slows the plane and heats the tires.",
    correct: "A force that resists motion between two surfaces in contact",
    distractors: ["A measurement of speed", "A type of engine", "The pull of gravity"]
  },
  {
    id: "vc-18",
    word: "momentum",
    sentence: "Because it is heavy and fast, the booster has huge {word} and cannot stop quickly.",
    correct: "The quantity of motion an object has, based on mass and speed",
    distractors: ["The temperature of an object", "The color of an object", "The cost of building something"]
  },
  {
    id: "vc-19",
    word: "durable",
    sentence: "Rover wheels must be {word} enough to keep rolling over sharp rocks for many years.",
    correct: "Able to withstand wear and last a long time",
    distractors: ["Extremely lightweight", "Easily broken", "Very inexpensive"]
  },
  {
    id: "vc-20",
    word: "component",
    sentence: "Each {word} of the jet engine was tested alone before the whole engine was assembled.",
    correct: "One part of a larger system or machine",
    distractors: ["The entire finished machine", "A type of measurement", "A safety certificate"]
  },
  {
    id: "vc-21",
    word: "simulate",
    sentence: "Computers {word} a storm landing so pilots can practice the danger without leaving the ground.",
    correct: "To create a model or imitation of a real process or condition",
    distractors: ["To permanently destroy something", "To sell a finished product", "To photograph an object"]
  },
  {
    id: "vc-22",
    word: "hypothesis",
    sentence: "Her {word} was that colder air would make the model rocket fly higher, so she tested it.",
    correct: "An educated guess or proposed explanation to be tested",
    distractors: ["A proven scientific law", "A type of laboratory equipment", "A final conclusion"]
  },
  {
    id: "vc-23",
    word: "variable",
    sentence: "In the wind tunnel test, wing angle was the one {word} the students changed each run.",
    correct: "A factor that can change or be changed in an experiment",
    distractors: ["A fixed constant that never changes", "A type of measuring tool", "The final result of an experiment"]
  },
  {
    id: "vc-24",
    word: "data",
    sentence: "Sensors on the test stand recorded thousands of numbers, and that {word} was studied for weeks.",
    correct: "Facts and information collected for analysis",
    distractors: ["A single opinion", "A type of engine part", "A finished product"]
  },
  {
    id: "vc-25",
    word: "analysis",
    sentence: "Careful {word} of the crash recordings showed exactly which bolt had cracked first.",
    correct: "A detailed examination of something to understand it better",
    distractors: ["A quick guess with no evidence", "A type of building material", "A public presentation"]
  },
  {
    id: "vc-26",
    word: "innovation",
    sentence: "A lighter battery was the {word} that finally made small electric planes possible.",
    correct: "A new idea, method, or invention",
    distractors: ["An old, outdated method", "A type of safety inspection", "A financial loss"]
  },
  {
    id: "vc-27",
    word: "sustainable",
    sentence: "Life on Mars would need a {word} water supply that never runs out over many years.",
    correct: "Able to be maintained over the long term without running out",
    distractors: ["Extremely expensive to produce", "Used only once", "Illegal in most countries"]
  },
  {
    id: "vc-28",
    word: "efficient",
    sentence: "Newer jet engines are more {word}, flying just as far while burning much less fuel.",
    correct: "Achieving maximum output with minimum wasted effort or resources",
    distractors: ["Producing the most noise possible", "Using as much fuel as possible", "Built from the heaviest materials available"]
  },
  {
    id: "vc-29",
    word: "precision",
    sentence: "Cutting a mirror for a space telescope demands {word} down to a fraction of a hair's width.",
    correct: "Exactness and accuracy in measurement or action",
    distractors: ["Guessing without measurement", "The overall size of an object", "The cost of a project"]
  },
  {
    id: "vc-30",
    word: "malfunction",
    sentence: "A valve {word} stopped the countdown because the part refused to open correctly.",
    correct: "A failure of a machine or system to work correctly",
    distractors: ["A scheduled maintenance check", "A successful test result", "A type of safety certificate"]
  },
  {
    id: "vc-31",
    word: "diagnostic",
    sentence: "Before touching anything, the crew ran a {word} to find what was causing the warning light.",
    correct: "A test used to identify the cause of a problem",
    distractors: ["A final product report", "A type of fuel additive", "A public announcement"]
  },
  {
    id: "vc-32",
    word: "integrate",
    sentence: "Technicians must {word} the new radio with the old cockpit wiring so everything works as one.",
    correct: "To combine parts into a working whole",
    distractors: ["To completely remove a part from a system", "To sell a product to customers", "To paint a new design"]
  },
  {
    id: "vc-33",
    word: "deploy",
    sentence: "Once in orbit, the satellite will {word} its folded solar panels into position.",
    correct: "To put into use or position for a specific purpose",
    distractors: ["To permanently disable something", "To reduce the size of something", "To recall a product"]
  },
  {
    id: "vc-34",
    word: "resilience",
    sentence: "The heat shield's {word} let it survive fiery reentry and still come home in one piece.",
    correct: "The ability to withstand or recover from difficult conditions",
    distractors: ["The total weight of an object", "A type of electrical current", "A scheduled inspection"]
  },
  {
    id: "vc-35",
    word: "autonomous",
    sentence: "The Mars rover is {word}, steering around rocks by itself when no one on Earth can help.",
    correct: "Operating independently, without outside control",
    distractors: ["Requiring constant human operation", "Powered only by solar energy", "Built entirely of metal"]
  },
  {
    id: "vc-36",
    word: "interface",
    sentence: "One {word} connects the spacesuit to the airlock so air and signals pass between them.",
    correct: "A point where two systems meet and interact",
    distractors: ["A type of fuel tank", "A safety harness", "A written report"]
  },
  {
    id: "vc-37",
    word: "load-bearing",
    sentence: "The {word} struts under the launch pad hold the entire weight of the rocket above.",
    correct: "Designed to support weight or structural force",
    distractors: ["Purely decorative with no structural purpose", "Made only of glass", "Used only in furniture"]
  },
  {
    id: "vc-38",
    word: "schematic",
    sentence: "Following the wiring {word}, the technician traced every cable drawn in the diagram.",
    correct: "A detailed diagram showing how a system is arranged or connected",
    distractors: ["A finished, working product", "A type of safety helmet", "A verbal instruction with no diagram"]
  },
  {
    id: "vc-39",
    word: "threshold",
    sentence: "When cabin pressure dropped past a set {word}, the oxygen masks released automatically.",
    correct: "A specific point or level that triggers a change once reached",
    distractors: ["The total cost of a project", "A type of engine part", "A finished report"]
  },
  {
    id: "vc-40",
    word: "mitigate",
    sentence: "Thick shielding helps {word} radiation damage, making the danger to astronauts much smaller.",
    correct: "To make something less severe or serious",
    distractors: ["To make something worse", "To ignore a known risk", "To publicly announce a problem"]
  },
  {
    id: "vc-41",
    word: "force",
    sentence: "A gentle push from a thruster is the only {word} needed to turn a satellite in space.",
    correct: "A push or pull that can change an object's motion",
    distractors: ["A measurement of temperature", "A type of chemical reaction", "The total mass of an object"]
  },
  {
    id: "vc-42",
    word: "mass",
    sentence: "Even on the Moon, a toolbox keeps the same {word} because it still holds the same matter.",
    correct: "The amount of matter in an object",
    distractors: ["The speed of an object", "The shape of an object", "The color of an object"]
  },
  {
    id: "vc-43",
    word: "motion",
    sentence: "Nothing slows the probe out in space, so its steady {word} carries it onward for years.",
    correct: "Movement from one place to another",
    distractors: ["A type of energy storage", "A chemical reaction", "A measurement of weight"]
  },
  {
    id: "vc-44",
    word: "energy",
    sentence: "Burning fuel releases the {word} that a rocket needs to do the hard work of lifting off.",
    correct: "The capacity to do work or cause change",
    distractors: ["A type of solid material", "A unit of distance", "A type of gas"]
  },
  {
    id: "vc-45",
    word: "power",
    sentence: "Two engines can do the same job, but the stronger one has more {word} and finishes sooner.",
    correct: "The rate at which work is done or energy is transferred",
    distractors: ["The total weight of an object", "The temperature of a system", "The color of a material"]
  },
  {
    id: "vc-46",
    word: "load",
    sentence: "Each wing strut is tested to hold a {word} three times heavier than the plane itself.",
    correct: "The weight or force a structure must support",
    distractors: ["The speed of a vehicle", "A type of chemical bond", "The distance traveled"]
  },
  {
    id: "vc-47",
    word: "stress",
    sentence: "Sensors on the test stand measure the {word} inside each bolt, in pounds per square inch.",
    correct: "The internal force a material experiences per unit area",
    distractors: ["The total weight of a structure", "A measurement of temperature", "The color of a material"]
  },
  {
    id: "vc-48",
    word: "equilibrium",
    sentence: "A rocket hovers in {word} when its engine thrust exactly cancels the pull of gravity.",
    correct: "A state of balance between opposing forces",
    distractors: ["A state of constant acceleration", "A chemical reaction", "A type of energy"]
  },
  {
    id: "vc-49",
    word: "inertia",
    sentence: "Because of {word}, a coasting probe keeps moving at the same speed until a thruster fires.",
    correct: "The tendency of an object to resist changes in its motion",
    distractors: ["The total energy of an object", "The weight of an object", "A type of friction"]
  },
  {
    id: "vc-50",
    word: "acceleration",
    sentence: "Telemetry showed the booster's {word} rising as its speed climbed by 30 mph each second.",
    correct: "The rate at which velocity changes over time",
    distractors: ["The total distance traveled", "The weight of an object", "A measurement of temperature"]
  },
  {
    id: "vc-51",
    word: "wavelength",
    sentence: "Radio antennas are sized to match the {word}, the distance from one wave crest to the next.",
    correct: "The distance between two identical points on a wave",
    distractors: ["The speed of a wave", "The height of a wave", "The color of a wave"]
  },
  {
    id: "vc-52",
    word: "amplitude",
    sentence: "On the rocket's vibration trace, a taller {word} means the wave rises farther above its resting line.",
    correct: "The maximum height of a wave from its resting position",
    distractors: ["The speed of a wave", "The distance between two waves", "The number of waves per second"]
  },
  {
    id: "vc-53",
    word: "refraction",
    sentence: "Starlight seems to shift because {word} bends it as it crosses from space into thick air.",
    correct: "The bending of a wave as it passes between different materials",
    distractors: ["The bouncing of light off a surface", "The absorption of light by an object", "The speed of light in a vacuum"]
  },
  {
    id: "vc-54",
    word: "reflection",
    sentence: "Radar depends on {word}, since pulses bounce off an aircraft's metal skin and come back.",
    correct: "The bouncing of a wave off a surface",
    distractors: ["The bending of light through a material", "The absorption of energy", "A change in wave frequency"]
  },
  {
    id: "vc-55",
    word: "spectrum",
    sentence: "Space telescopes scan the whole {word}, from long radio waves to short X-rays.",
    correct: "The full range of a type of wave, arranged by wavelength or frequency",
    distractors: ["A single color of light", "A type of lens", "A measurement of sound"]
  },
  {
    id: "vc-56",
    word: "conductor",
    sentence: "Copper wiring makes a great {word}, letting current run to the rover's motors with little loss.",
    correct: "A material that allows electric current to flow through it easily",
    distractors: ["A material that blocks electric current", "A type of magnet", "A measurement of voltage"]
  },
  {
    id: "vc-57",
    word: "insulator",
    sentence: "Rubber sleeving acts as an {word}, stopping stray current from leaping between cockpit wires.",
    correct: "A material that resists the flow of electric current",
    distractors: ["A material that conducts electricity well", "A type of battery", "A unit of electrical power"]
  },
  {
    id: "vc-58",
    word: "circuit",
    sentence: "A burned wire broke the {word}, so current could not complete its loop to the satellite's radio.",
    correct: "A closed loop through which electric current can flow",
    distractors: ["A type of magnet", "A unit of electrical resistance", "A single electrical wire with no loop"]
  },
  {
    id: "vc-59",
    word: "current",
    sentence: "Solar panels push a steady {word} of charge along the wires into the station's batteries.",
    correct: "The flow of electric charge through a conductor",
    distractors: ["The force pushing electric charge", "The resistance in a wire", "The total energy stored in a battery"]
  },
  {
    id: "vc-60",
    word: "voltage",
    sentence: "Higher {word} pushes more current through the drone's motor, making the propellers spin faster.",
    correct: "The electrical force that pushes current through a circuit",
    distractors: ["The total electric charge stored", "The resistance of a wire", "The speed of electric current"]
  },
  {
    id: "vc-61",
    word: "atom",
    sentence: "Each {word} of hydrogen is the smallest piece of that element a fuel tank can hold.",
    correct: "The smallest basic unit of a chemical element",
    distractors: ["A type of chemical reaction", "A large molecule made of many elements", "A unit of measurement for mass"]
  },
  {
    id: "vc-62",
    word: "element",
    sentence: "Titanium is a pure {word}, built from only one kind of atom throughout the airframe.",
    correct: "A pure substance made of only one type of atom",
    distractors: ["A mixture of two or more substances", "A type of chemical reaction", "A compound made of multiple types of atoms"]
  },
  {
    id: "vc-63",
    word: "molecule",
    sentence: "Two hydrogen atoms bond with one oxygen atom to form a water {word} in the exhaust.",
    correct: "Two or more atoms bonded together",
    distractors: ["A single atom by itself", "A type of energy", "A physical state of matter"]
  },
  {
    id: "vc-64",
    word: "reaction",
    sentence: "Inside the engine, a fiery {word} turns fuel and oxygen into hot steam and gas.",
    correct: "A process where substances change into different substances",
    distractors: ["A physical change with no new substance formed", "A measurement of temperature", "A type of solid material"]
  },
  {
    id: "vc-65",
    word: "solution",
    sentence: "Salt vanished completely into the water, forming a clear {word} for the rover's soil test.",
    correct: "A mixture where one substance is fully dissolved in another",
    distractors: ["A mixture where substances are not evenly combined", "A pure element", "A solid material"]
  },
  {
    id: "vc-66",
    word: "catalyst",
    sentence: "A metal grid acts as a {word}, speeding the fuel's breakdown while staying unchanged itself.",
    correct: "A substance that speeds up a reaction without being consumed",
    distractors: ["A substance that slows down a reaction", "The main product of a reaction", "A type of chemical bond"]
  },
  {
    id: "vc-67",
    word: "acid",
    sentence: "Battery {word} on the launch pad tested at pH 2, low enough to fizz against baking soda.",
    correct: "A substance with a pH below 7 that can react with bases",
    distractors: ["A substance with a pH above 7", "A type of metal", "A neutral substance with a pH of 7"]
  },
  {
    id: "vc-68",
    word: "base",
    sentence: "The cleanup crew's {word} measured pH 11 and neutralized the acid spilled near the pad.",
    correct: "A substance with a pH above 7 that can neutralize acids",
    distractors: ["A substance with a pH below 7", "A type of solid metal", "A neutral substance"]
  },
  {
    id: "vc-69",
    word: "solvent",
    sentence: "Technicians use a {word} that dissolves grease off jet parts and carries it away.",
    correct: "A substance that dissolves another substance to form a solution",
    distractors: ["The substance being dissolved", "A solid left over after a reaction", "A type of acid"]
  },
  {
    id: "vc-70",
    word: "precipitate",
    sentence: "Mixing the two rover samples left a chalky {word} sitting at the bottom of the tube.",
    correct: "A solid that forms and separates out of a liquid solution during a chemical reaction",
    distractors: ["A type of gas released during a reaction", "The liquid part of a mixture", "A measurement of temperature"]
  },
  {
    id: "vc-71",
    word: "organism",
    sentence: "Scientists search Mars soil for even one tiny {word}, a living thing of any kind.",
    correct: "Any individual living thing",
    distractors: ["A non-living object", "A type of chemical compound", "A single cell only"]
  },
  {
    id: "vc-72",
    word: "cell",
    sentence: "Under the station's microscope, each plant {word} is the smallest living building block.",
    correct: "The smallest basic structural and functional unit of life",
    distractors: ["A large organ in the body", "A type of tissue", "A non-living particle"]
  },
  {
    id: "vc-73",
    word: "tissue",
    sentence: "Muscle {word} in astronauts is a bundle of similar cells working together, and it weakens in orbit.",
    correct: "A group of similar cells that work together to perform a function",
    distractors: ["A single individual cell", "An entire organ system", "A type of chemical reaction"]
  },
  {
    id: "vc-74",
    word: "organ",
    sentence: "The heart is one {word} doctors watch in orbit, a body part built from tissues doing one job.",
    correct: "A structure made of tissues that performs a specific function",
    distractors: ["A single cell", "A type of chemical element", "The smallest unit of life"]
  },
  {
    id: "vc-75",
    word: "ecosystem",
    sentence: "Inside a sealed space greenhouse, plants, microbes, and air form a tiny {word} together.",
    correct: "A community of living things interacting with their environment",
    distractors: ["A single species living alone", "A type of rock formation", "A chemical reaction in nature"]
  },
  {
    id: "vc-76",
    word: "adaptation",
    sentence: "A camel's water-saving {word} helps it survive desert heat, and drone designers study that trick.",
    correct: "A trait that helps an organism survive in its environment",
    distractors: ["A random genetic mutation with no benefit", "A disease affecting an organism", "A behavior learned only from humans"]
  },
  {
    id: "vc-77",
    word: "photosynthesis",
    sentence: "Lamps on the space station let lettuce use {word} to turn light into stored food energy.",
    correct: "The process plants use to convert light energy into chemical energy",
    distractors: ["The process of breaking down food for energy", "The process of cell division", "The process of water evaporation"]
  },
  {
    id: "vc-78",
    word: "respiration",
    sentence: "Astronauts burn food for energy through {word}, using oxygen and breathing out carbon dioxide.",
    correct: "The process of releasing energy from food, usually using oxygen",
    distractors: ["The process of making food using sunlight", "The process of cell division", "The process of waste removal only"]
  },
  {
    id: "vc-79",
    word: "evolution",
    sentence: "Fossil study shows the slow {word} of birds over millions of years, which inspired wing designs.",
    correct: "The gradual change in species over generations",
    distractors: ["A sudden change in one individual's lifetime", "A type of ecosystem", "A single genetic mutation"]
  },
  {
    id: "vc-80",
    word: "habitat",
    sentence: "Satellite maps show forests shrinking, wiping out the {word} where those animals normally live.",
    correct: "The natural environment where an organism normally lives",
    distractors: ["A type of food an organism eats", "A behavior an organism performs", "A physical trait of an organism"]
  },
  {
    id: "vc-81",
    word: "nebula",
    sentence: "Through the telescope, that glowing {word} looks like a huge cloud of gas and dust.",
    correct: "A giant cloud of gas and dust in space",
    distractors: ["A dead star that has collapsed", "A rocky object orbiting the sun", "A type of space telescope"]
  },
  {
    id: "vc-82",
    word: "asteroid",
    sentence: "Cameras caught a lumpy {word}, a small rock circling the sun between Mars and Jupiter.",
    correct: "A small rocky object that orbits the sun",
    distractors: ["A giant cloud of gas and dust", "A moon orbiting a planet", "A star nearing the end of its life"]
  },
  {
    id: "vc-83",
    word: "comet",
    sentence: "As it swung near the sun, the icy {word} grew a long glowing tail behind it.",
    correct: "An icy object that develops a glowing tail near the sun",
    distractors: ["A rocky object with no ice", "A star that has exploded", "A man-made satellite"]
  },
  {
    id: "vc-84",
    word: "satellite",
    sentence: "Our Moon is a natural {word} because it circles Earth, just as weather craft do.",
    correct: "An object that orbits a larger body in space",
    distractors: ["A star that produces its own light", "A cloud of space dust", "A type of rocket engine"]
  },
  {
    id: "vc-85",
    word: "eclipse",
    sentence: "During the {word}, the Moon slid in front of the Sun and darkened the launch pad.",
    correct: "An event where one celestial body blocks the light of another",
    distractors: ["The explosion of a dying star", "The formation of a new planet", "A type of meteor shower"]
  },
  {
    id: "vc-86",
    word: "gravity",
    sentence: "Earth's {word} pulls every rocket back down, and heavier planets pull even harder.",
    correct: "The force of attraction between objects with mass",
    distractors: ["The force that pushes objects apart", "A type of electromagnetic radiation", "The speed of an orbiting object"]
  },
  {
    id: "vc-87",
    word: "lightyear",
    sentence: "One {word} is how far light travels in a year, far beyond any probe's reach.",
    correct: "The distance light travels in one year",
    distractors: ["A unit of time equal to one year", "A measurement of a star's brightness", "The speed of light itself"]
  },
  {
    id: "vc-88",
    word: "telescope",
    sentence: "Faraway moons look sharp and close through the observatory's giant {word} on clear nights.",
    correct: "An instrument used to observe distant objects in detail",
    distractors: ["A device that measures temperature in space", "A type of spacecraft engine", "A tool for calculating orbits"]
  },
  {
    id: "vc-89",
    word: "exoplanet",
    sentence: "Astronomers found an {word} circling a distant star far outside our own solar system.",
    correct: "A planet that orbits a star outside our solar system",
    distractors: ["A moon orbiting a planet in our solar system", "A star that has no planets", "An asteroid orbiting the sun"]
  },
  {
    id: "vc-90",
    word: "galaxy",
    sentence: "Our {word} holds billions of stars plus gas and dust, all bound together by gravity.",
    correct: "A massive system of stars, gas, and dust held together by gravity",
    distractors: ["A single star system with one planet", "A cloud of gas with no stars", "A cluster of asteroids"]
  },
  {
    id: "vc-91",
    word: "crust",
    sentence: "Rover drills bit into the hard outer {word} covering the planet before reaching softer rock.",
    correct: "The solid, outermost layer of a planet",
    distractors: ["The planet's molten center", "The layer of gases surrounding a planet", "A type of tectonic plate movement"]
  },
  {
    id: "vc-92",
    word: "mantle",
    sentence: "Probes suggest a thick rock layer, the {word}, lies between the planet's crust and its center.",
    correct: "The thick layer of rock between a planet's crust and core",
    distractors: ["The planet's outermost solid layer", "The planet's liquid metal center", "The atmosphere surrounding a planet"]
  },
  {
    id: "vc-93",
    word: "core",
    sentence: "Magnetic readings from orbit hint that iron fills the deepest {word} at the planet's center.",
    correct: "The innermost layer of a planet",
    distractors: ["The outermost rocky layer of a planet", "The layer of gas surrounding a planet", "A type of rock formation on the surface"]
  },
  {
    id: "vc-94",
    word: "tectonics",
    sentence: "Satellite images of sliding crustal plates give plate {word} experts new clues about quakes.",
    correct: "The study of the movement and structure of Earth's crustal plates",
    distractors: ["The study of weather patterns", "The study of ocean currents", "The study of star formation"]
  },
  {
    id: "vc-95",
    word: "erosion",
    sentence: "Photos from orbit show wind {word} slowly wearing away the canyon walls on Mars.",
    correct: "The gradual wearing away of rock or soil by natural forces",
    distractors: ["The rapid formation of new rock", "The process of a volcano erupting", "The freezing of water into ice"]
  },
  {
    id: "vc-96",
    word: "sediment",
    sentence: "Orbiting cameras spotted layers of {word} that had settled out of ancient Martian water.",
    correct: "Small particles of rock and organic material that settle out of water",
    distractors: ["Molten rock beneath the surface", "A type of gemstone", "A gas released during volcanic eruptions"]
  },
  {
    id: "vc-97",
    word: "mineral",
    sentence: "Quartz, a natural solid {word} with its own chemical makeup, showed up in the rover's sample.",
    correct: "A naturally occurring solid substance with a specific chemical structure",
    distractors: ["Any liquid found underground", "A type of living organism", "A gas found in the atmosphere"]
  },
  {
    id: "vc-98",
    word: "fossil",
    sentence: "Rovers hunt for any {word} that might preserve traces of ancient life in Martian rock.",
    correct: "The preserved remains or traces of an ancient organism",
    distractors: ["A living organism found underground", "A type of rock formed by volcanoes", "A modern animal bone"]
  },
  {
    id: "vc-99",
    word: "magma",
    sentence: "Orbiter heat maps found melted rock, or {word}, hiding under the volcano's surface.",
    correct: "Molten rock found beneath Earth's surface",
    distractors: ["Molten rock that has reached the surface", "A type of solid mineral", "A gas released from volcanoes"]
  },
  {
    id: "vc-100",
    word: "seismic",
    sentence: "A lander on Mars recorded {word} waves shaking the ground during a marsquake.",
    correct: "Relating to earthquakes or vibrations in the Earth",
    distractors: ["Relating to ocean currents", "Relating to weather patterns", "Relating to volcanic gases only"]
  },
  {
    id: "vc-101",
    word: "fuselage",
    sentence: "Technicians in the hangar bolted the wings onto the long tube-shaped {word} of the jet.",
    correct: "The main body of an aircraft",
    distractors: ["The wing of an aircraft", "The engine of an aircraft", "The tail section only"]
  },
  {
    id: "vc-102",
    word: "cockpit",
    sentence: "Inside the {word}, the pilot sat surrounded by switches that steered the whole airplane.",
    correct: "The compartment where the pilot sits and controls the aircraft",
    distractors: ["The cargo storage area", "The engine compartment", "The passenger seating area"]
  },
  {
    id: "vc-103",
    word: "avionics",
    sentence: "Every radio, radar and computer aboard the jet counts as {word} for the flight crew.",
    correct: "The electronic systems used in aircraft and spacecraft",
    distractors: ["The mechanical engine parts of an aircraft", "The fuel storage systems", "The physical structure of the wings"]
  },
  {
    id: "vc-104",
    word: "altimeter",
    sentence: "Fog hid the ground, so the pilot trusted the {word} to show her height above sea level.",
    correct: "An instrument that measures altitude",
    distractors: ["An instrument that measures speed", "An instrument that measures fuel level", "An instrument that measures air temperature"]
  },
  {
    id: "vc-105",
    word: "throttle",
    sentence: "Pushing the {word} forward gave the jet engine more power for takeoff.",
    correct: "A control that regulates the power or speed of an engine",
    distractors: ["A control that steers the aircraft left or right", "A control that adjusts cabin temperature", "A control that deploys the landing gear"]
  },
  {
    id: "vc-106",
    word: "aileron",
    sentence: "Tilting the hinged {word} on each wing makes the plane roll to one side.",
    correct: "A hinged part of the wing that controls roll",
    distractors: ["A part of the tail that controls up-and-down pitch", "The main body of the wing", "The aircraft's main engine"]
  },
  {
    id: "vc-107",
    word: "rudder",
    sentence: "Kicking the pedals swings the hinged {word} on the tail so the nose turns sideways.",
    correct: "A hinged part of the tail that controls yaw (left-right turning)",
    distractors: ["A part of the wing that controls roll", "The aircraft's front landing wheel", "The main cabin door"]
  },
  {
    id: "vc-108",
    word: "altitude",
    sentence: "Air traffic control told the jet to hold an {word} of ten thousand feet above sea level.",
    correct: "The height of an object above sea level or the ground",
    distractors: ["The speed of an aircraft", "The weight of an aircraft", "The distance traveled"]
  },
  {
    id: "vc-109",
    word: "descent",
    sentence: "Twenty miles from the runway the airliner began a slow {word} toward the ground.",
    correct: "The downward movement of an aircraft",
    distractors: ["The upward movement of an aircraft", "Level flight at a constant altitude", "A sudden stop in mid-air"]
  },
  {
    id: "vc-110",
    word: "ascent",
    sentence: "Flames roared as the rocket began a steep {word}, climbing fast above the launch pad.",
    correct: "The upward movement of an aircraft or rocket",
    distractors: ["The downward movement toward landing", "Level flight at a constant altitude", "A complete stop in motion"]
  },
  {
    id: "vc-111",
    word: "reentry",
    sentence: "Glowing heat shields protect a capsule during {word}, when it plunges back into Earth's atmosphere.",
    correct: "The return of a spacecraft into a planet's atmosphere",
    distractors: ["The launch of a spacecraft into orbit", "The docking of two spacecraft", "The landing of an aircraft on a runway"]
  },
  {
    id: "vc-112",
    word: "docking",
    sentence: "After hours of careful steering, the cargo ship's {word} with the station locked them together.",
    correct: "The joining of two spacecraft in space",
    distractors: ["The separation of a rocket's stages", "The landing of a spacecraft on the ground", "The launch of a satellite"]
  },
  {
    id: "vc-113",
    word: "module",
    sentence: "Astronauts floated into the station's newest {word}, a sealed section built just for experiments.",
    correct: "A self-contained section of a spacecraft with a specific function",
    distractors: ["The main engine of a rocket", "The entire spacecraft as a whole", "A type of spacesuit"]
  },
  {
    id: "vc-114",
    word: "capsule",
    sentence: "Four astronauts squeezed into the tiny sealed {word} that would carry them home.",
    correct: "A small enclosed spacecraft, often used to carry crew or cargo",
    distractors: ["The main body of an airplane", "A large space station", "A type of rocket engine"]
  },
  {
    id: "vc-115",
    word: "booster",
    sentence: "Two extra {word}s fired at liftoff, adding thrust until the rocket cleared the pad.",
    correct: "A rocket stage that provides additional thrust at launch",
    distractors: ["The main engine used for the entire flight", "The capsule that carries the crew", "A type of satellite"]
  },
  {
    id: "vc-116",
    word: "stage",
    sentence: "Once its engine burned all the fuel, the lower {word} separated and dropped away.",
    correct: "A separable section of a rocket with its own engine and fuel",
    distractors: ["The entire rocket from launch to landing", "The payload carried by a rocket", "A type of spacesuit"]
  },
  {
    id: "vc-117",
    word: "mission",
    sentence: "The crew trained two years for one {word} with a single goal, landing a rover safely.",
    correct: "A planned task or operation with a specific goal",
    distractors: ["A single rocket engine", "The physical structure of a spacecraft", "A type of orbit"]
  },
  {
    id: "vc-118",
    word: "trajectory",
    sentence: "Flight computers plotted the curved {word} the probe would follow all the way to Jupiter.",
    correct: "The path an object follows through space",
    distractors: ["The total weight of a spacecraft", "The speed of a spacecraft", "The fuel capacity of a rocket"]
  },
  {
    id: "vc-119",
    word: "rendezvous",
    sentence: "Both craft fired thrusters for a {word} at the exact spot and minute planned.",
    correct: "A planned meeting of two spacecraft at the same place and time",
    distractors: ["The separation of a spacecraft's stages", "The launch of a rocket", "The landing of a spacecraft"]
  },
  {
    id: "vc-120",
    word: "countdown",
    sentence: "Loudspeakers echoed the {word} from ten to zero as the engines lit.",
    correct: "The counting backward to the moment of a rocket launch",
    distractors: ["The process of refueling a rocket", "The path a rocket follows to orbit", "The testing of a rocket's engines"]
  },
  {
    id: "vc-121",
    word: "algorithm",
    sentence: "The rover's landing {word} lists every step the computer follows to pick a safe spot.",
    correct: "A step-by-step set of instructions for solving a problem",
    distractors: ["A type of computer hardware", "The physical wiring inside a computer", "A unit of data storage"]
  },
  {
    id: "vc-122",
    word: "binary",
    sentence: "Telemetry from the satellite arrives as {word} code, nothing but ones and zeros.",
    correct: "A number system using only two digits, 0 and 1",
    distractors: ["A number system using ten digits", "A type of computer virus", "A programming language"]
  },
  {
    id: "vc-123",
    word: "database",
    sentence: "Every part on the launch vehicle is listed in a searchable {word} on the ground computers.",
    correct: "An organized collection of data stored electronically",
    distractors: ["A single computer file with no organization", "A type of computer virus", "A physical storage device only"]
  },
  {
    id: "vc-124",
    word: "software",
    sentence: "A bug in the flight {word} was fixed by uploading new code to the spacecraft.",
    correct: "The programs and instructions that run on a computer",
    distractors: ["The physical parts of a computer", "A type of computer network", "A unit of data storage"]
  },
  {
    id: "vc-125",
    word: "hardware",
    sentence: "Radiation damaged the rover's {word}, so the chips and memory boards had to be replaced.",
    correct: "The physical components of a computer system",
    distractors: ["The programs that run on a computer", "A type of computer network", "A programming language"]
  },
  {
    id: "vc-126",
    word: "network",
    sentence: "Ground stations around the world form one {word} of linked computers tracking every satellite.",
    correct: "A group of interconnected computers or devices",
    distractors: ["A single standalone computer", "A type of software program", "A unit of data storage"]
  },
  {
    id: "vc-127",
    word: "encryption",
    sentence: "Commands sent to the satellite use {word} so spies see only scrambled code.",
    correct: "The process of converting data into a coded format for security",
    distractors: ["The process of deleting data permanently", "The process of compressing files to save space", "The process of copying data to a backup"]
  },
  {
    id: "vc-128",
    word: "protocol",
    sentence: "Radios on the station follow a strict {word} of rules for sending messages back and forth.",
    correct: "A set of rules that governs how data is exchanged",
    distractors: ["A type of computer hardware", "A programming language", "A unit of data storage"]
  },
  {
    id: "vc-129",
    word: "processor",
    sentence: "A radiation-proof {word} inside the rover runs millions of calculations every second.",
    correct: "The component of a computer that performs calculations and executes instructions",
    distractors: ["The component that stores data permanently", "The component that displays images", "The component that connects to the internet"]
  },
  {
    id: "vc-130",
    word: "bandwidth",
    sentence: "Deep space antennas have low {word}, so photos trickle back a few bits per second.",
    correct: "The amount of data that can be transmitted over a connection in a given time",
    distractors: ["The total storage capacity of a computer", "The speed of a computer's processor", "The number of devices on a network"]
  },
  {
    id: "vc-131",
    word: "sensor",
    sentence: "Tiny heat {word}s on the wing notice icing and warn the pilot instantly.",
    correct: "A device that detects and responds to input from the environment",
    distractors: ["A device that stores data permanently", "A type of motor", "A programming language"]
  },
  {
    id: "vc-132",
    word: "actuator",
    sentence: "An electric {word} turns battery power into the motion that folds the landing gear.",
    correct: "A device that converts energy into motion",
    distractors: ["A device that detects light or sound", "A device that stores electrical charge", "A type of computer chip"]
  },
  {
    id: "vc-133",
    word: "servo",
    sentence: "Each drone camera mount uses a {word} that turns to an exact angle on command.",
    correct: "A motor that can be controlled to move to a precise position",
    distractors: ["A motor that only spins at one constant speed", "A device that measures distance", "A type of battery"]
  },
  {
    id: "vc-134",
    word: "manipulator",
    sentence: "The station's long robotic {word} grabs cargo pods and moves them into place.",
    correct: "A robotic arm or device used to handle and move objects",
    distractors: ["A sensor that detects motion", "A type of computer software", "A power source for robots"]
  },
  {
    id: "vc-135",
    word: "feedback",
    sentence: "Wobble data flows back to the rocket's computer as {word} so it can correct its aim.",
    correct: "Information returned to a system to help it self-correct",
    distractors: ["The initial instructions given to a robot", "The physical structure of a robot", "A type of electrical current"]
  },
  {
    id: "vc-136",
    word: "kinematics",
    sentence: "Rover arm {word} maps how each joint moves, ignoring the forces that cause the motion.",
    correct: "The study of motion without considering the forces that cause it",
    distractors: ["The study of electrical circuits", "The study of chemical reactions", "The study of computer programming"]
  },
  {
    id: "vc-137",
    word: "gearbox",
    sentence: "Inside the drone's motor housing, a {word} of meshed gears trades speed for extra turning force.",
    correct: "A mechanical device that controls speed and torque using gears",
    distractors: ["A device that stores electrical energy", "A sensor that detects obstacles", "A type of computer processor"]
  },
  {
    id: "vc-138",
    word: "microcontroller",
    sentence: "Barely bigger than a stamp, the {word} runs code controlling the CubeSat's cameras and radios.",
    correct: "A small computer chip that controls the operations of a device",
    distractors: ["A large computer used only for data storage", "A type of electric motor", "A sensor that measures temperature"]
  },
  {
    id: "vc-139",
    word: "automation",
    sentence: "Rocket factory {word} lets machines weld fuel tanks all night with almost no people watching.",
    correct: "The use of technology to perform tasks with minimal human involvement",
    distractors: ["The manual completion of tasks by workers", "A type of computer virus", "A method of storing data"]
  },
  {
    id: "vc-140",
    word: "consistency",
    sentence: "Wind tunnel fans are prized for {word}, blowing at exactly the same speed on every run.",
    correct: "The quality of performing the same way reliably every time",
    distractors: ["The overall speed of a machine", "The total weight of a machine", "The cost of building a machine"]
  },
  {
    id: "vc-141",
    word: "alloy",
    sentence: "Titanium mixed with aluminum makes an {word} light enough for a jet engine fan blade.",
    correct: "A mixture of two or more metals",
    distractors: ["A pure, single metal element", "A type of plastic polymer", "A non-metal mineral"]
  },
  {
    id: "vc-142",
    word: "composite",
    sentence: "Rocket fairings built from a {word} join carbon fibers and glue into one stronger material.",
    correct: "A material made from two or more different materials combined",
    distractors: ["A material made from a single pure element", "A type of liquid metal", "A naturally occurring mineral"]
  },
  {
    id: "vc-143",
    word: "polymer",
    sentence: "Spacesuit fabric uses a {word}, one huge molecule built from thousands of identical repeating links.",
    correct: "A large molecule made of many repeating smaller units",
    distractors: ["A single small molecule", "A pure metal element", "A type of rock"]
  },
  {
    id: "vc-144",
    word: "ductile",
    sentence: "Copper is {word} enough to be pulled into hair-thin wire for satellite harnesses without snapping.",
    correct: "Able to be stretched into a thin wire without breaking",
    distractors: ["Easily shattered under stress", "Unable to conduct electricity", "Resistant to melting at any temperature"]
  },
  {
    id: "vc-145",
    word: "brittle",
    sentence: "Frozen overnight, the plastic drone cover turned {word} and cracked apart at the lightest tap.",
    correct: "Likely to break or shatter easily under stress",
    distractors: ["Able to stretch without breaking", "Highly flexible and bendable", "Resistant to all forms of damage"]
  },
  {
    id: "vc-146",
    word: "corrosion",
    sentence: "Salty air near the launch pad causes {word}, slowly eating away at the steel towers.",
    correct: "The gradual destruction of a material through chemical reactions with its environment",
    distractors: ["The intentional shaping of a metal", "The process of melting a metal", "The strengthening of a material over time"]
  },
  {
    id: "vc-147",
    word: "tensile",
    sentence: "A parachute cable's {word} strength shows how hard you can pull before it stretches and snaps.",
    correct: "Relating to a material’s ability to withstand pulling or stretching forces",
    distractors: ["Relating to a material's ability to withstand heat", "Relating to a material's color and appearance", "Relating to a material's electrical conductivity"]
  },
  {
    id: "vc-148",
    word: "malleable",
    sentence: "Aluminum sheets are {word}, so a press can shape them into wing panels without cracking.",
    correct: "Able to be hammered or pressed into shape without breaking",
    distractors: ["Unable to change shape under any pressure", "Resistant to being melted at high temperatures", "Naturally magnetic"]
  },
  {
    id: "vc-149",
    word: "conductivity",
    sentence: "Copper busbars on the space station have high {word}, letting electricity flow through them easily.",
    correct: "A material’s ability to allow electricity or heat to pass through it",
    distractors: ["A material's ability to resist bending", "A material's overall weight", "A material's resistance to corrosion"]
  },
  {
    id: "vc-150",
    word: "density",
    sentence: "Foam insulation has low {word} because very little mass fills each cubic inch of space.",
    correct: "The amount of mass contained in a given volume",
    distractors: ["The total weight of an object regardless of size", "The strength of a material under stress", "The temperature at which a material melts"]
  },
  {
    id: "vc-151",
    word: "requirement",
    sentence: "Every bolt on the booster must meet one strict {word} before inspectors will approve the design.",
    correct: "A necessary condition that a design must satisfy",
    distractors: ["A suggestion that can be safely ignored", "The final approved design", "A type of testing equipment"]
  },
  {
    id: "vc-152",
    word: "benchmark",
    sentence: "Fuel numbers from the old jet became the {word} that every new engine had to beat.",
    correct: "A standard used to measure or compare performance",
    distractors: ["The final version of a product", "A type of raw material", "A team of engineers"]
  },
  {
    id: "vc-153",
    word: "milestone",
    sentence: "Firing the engine for a full minute was a {word} showing how far the project had come.",
    correct: "A significant point or event marking progress in a project",
    distractors: ["The final delivery of a finished product", "A type of engineering material", "A budget report"]
  },
  {
    id: "vc-154",
    word: "workflow",
    sentence: "Hangar crews mapped their {word}, listing each step from inspection to fueling in the right order.",
    correct: "The sequence of steps or tasks in a process",
    distractors: ["The physical layout of a factory", "The total cost of a project", "A single completed task"]
  },
  {
    id: "vc-155",
    word: "documentation",
    sentence: "Without {word}, nobody could read how the old wind tunnel had been wired and built.",
    correct: "Written records that explain how something works or was built",
    distractors: ["The physical prototype of a design", "A verbal explanation with no written record", "The final testing phase only"]
  },
  {
    id: "vc-156",
    word: "verification",
    sentence: "During {word}, the launch team checks each part against the written specs to prove it was built right.",
    correct: "The process of confirming that something meets its specified requirements",
    distractors: ["The process of confirming a design works well in real-world use", "The initial brainstorming phase of design", "The manufacturing of final parts"]
  },
  {
    id: "vc-157",
    word: "validation",
    sentence: "Flying the finished drone in real wind is {word}, proving it works the way pilots need.",
    correct: "The process of confirming a finished product works as intended in real use",
    distractors: ["The process of checking a design against written specifications only", "The initial idea-generation phase", "The disposal of failed prototypes"]
  },
  {
    id: "vc-158",
    word: "assessment",
    sentence: "Inspectors wrote an {word} of the parachute design, judging its quality and listing weak points.",
    correct: "An evaluation or judgment of something’s quality or performance",
    distractors: ["The final manufacturing step", "A type of raw material", "The initial idea stage"]
  },
  {
    id: "vc-159",
    word: "refinement",
    sentence: "Each wind tunnel run brought another {word}, a small tweak that made the wing slightly better.",
    correct: "The process of making small improvements to something over time",
    distractors: ["The very first rough draft of a design", "The complete replacement of a design", "The manufacturing of final parts"]
  },
  {
    id: "vc-160",
    word: "criteria",
    sentence: "Judges scored each rover against three {word}: weight, cost, and how far it could climb.",
    correct: "Standards or requirements used to judge or decide something",
    distractors: ["The final approved design", "A single measurement of weight", "A type of manufacturing tool"]
  },
  {
    id: "vc-161",
    word: "budget",
    sentence: "Satellite planners set a strict {word}, deciding how every dollar would be spent before building.",
    correct: "A plan for how money will be spent",
    distractors: ["The total profit a company makes", "A type of financial investment", "A record of past expenses only"]
  },
  {
    id: "vc-162",
    word: "revenue",
    sentence: "The rocket company's {word} climbed as more customers paid to launch their satellites.",
    correct: "The total income a business earns from its activities",
    distractors: ["The total cost of running a business", "The profit remaining after all expenses", "A type of business loan"]
  },
  {
    id: "vc-163",
    word: "expense",
    sentence: "Jet fuel is an airline's biggest {word}, costing more each month than any other purchase.",
    correct: "Money spent on goods or services",
    distractors: ["Money earned from sales", "A type of financial investment", "A company's total assets"]
  },
  {
    id: "vc-164",
    word: "investment",
    sentence: "Buying the new welding robot was an {word} that should save the shop money for years.",
    correct: "Money put into something with the expectation of future benefit or profit",
    distractors: ["Money spent with no expectation of return", "A type of tax payment", "A record of past sales"]
  },
  {
    id: "vc-165",
    word: "contract",
    sentence: "Both firms signed a {word}, a legal agreement binding them to deliver rocket parts on time.",
    correct: "A legally binding agreement between two or more parties",
    distractors: ["An informal verbal agreement with no legal standing", "A type of financial report", "A company's internal policy"]
  },
  {
    id: "vc-166",
    word: "negotiation",
    sentence: "After weeks of {word}, the launch provider and the customer finally agreed on a price.",
    correct: "A discussion aimed at reaching an agreement",
    distractors: ["A legally binding signed contract", "A one-sided demand with no discussion", "A type of financial audit"]
  },
  {
    id: "vc-167",
    word: "resume",
    sentence: "His one-page {word} listed every science class and summer job he hoped would land a NASA offer.",
    correct: "A document summarizing a person’s work experience and qualifications",
    distractors: ["A legal contract between employer and employee", "A performance review written by a manager", "A company's annual financial report"]
  },
  {
    id: "vc-168",
    word: "qualification",
    sentence: "A pilot's license is one {word} needed before anyone may fly the new test aircraft.",
    correct: "A skill or requirement that makes someone suitable for a role",
    distractors: ["A performance review score", "A type of employee benefit", "A company's mission statement"]
  },
  {
    id: "vc-169",
    word: "internship",
    sentence: "Her summer {word} at the rocket plant gave ten weeks of real hands-on work experience.",
    correct: "A temporary position that provides practical work experience",
    distractors: ["A permanent full-time job", "A type of academic degree", "A company's retirement plan"]
  },
  {
    id: "vc-170",
    word: "salary",
    sentence: "Flight controllers earn a {word}, the same amount paid every month no matter how many launches happen.",
    correct: "A fixed regular payment for work, usually paid monthly or annually",
    distractors: ["A one-time bonus payment", "A type of stock investment", "Money earned only from overtime hours"]
  },
  {
    id: "vc-171",
    word: "legislature",
    sentence: "The state {word} debated for months before its lawmakers voted to fund a new spaceport.",
    correct: "A group of people with the power to make laws",
    distractors: ["A court that interprets laws", "A group that enforces laws only", "A private business organization"]
  },
  {
    id: "vc-172",
    word: "constitution",
    sentence: "A moon colony would need a {word}, the written document setting out its most basic laws.",
    correct: "A written document establishing the fundamental laws and principles of a government",
    distractors: ["A single new law passed by a legislature", "A court ruling on a specific case", "A political party's platform"]
  },
  {
    id: "vc-173",
    word: "amendment",
    sentence: "Adding an {word} to the launch safety rules formally changed one line of the original text.",
    correct: "A formal change or addition to a law or document",
    distractors: ["The complete replacement of a constitution", "A court's final ruling", "A political election result"]
  },
  {
    id: "vc-174",
    word: "referendum",
    sentence: "Townspeople settled the new runway question by holding a {word} and voting on it directly.",
    correct: "A direct vote by citizens on a specific issue",
    distractors: ["A vote taken only by elected officials", "A court ruling on a law", "A private company decision"]
  },
  {
    id: "vc-175",
    word: "sovereignty",
    sentence: "No country may claim {word} over the Moon, ruling it alone without any outside say.",
    correct: "The authority of a state to govern itself without outside interference",
    distractors: ["A country's total population", "A country's military strength only", "A type of trade agreement"]
  },
  {
    id: "vc-176",
    word: "diplomat",
    sentence: "During talks about the shared space station, one {word} spoke for her whole country.",
    correct: "An official who represents their country in relations with other countries",
    distractors: ["A judge who rules on international law", "A soldier stationed abroad", "A journalist covering foreign news"]
  },
  {
    id: "vc-177",
    word: "treaty",
    sentence: "Many nations signed a {word} agreeing that space belongs to everyone and not to one country.",
    correct: "A formal agreement between two or more countries",
    distractors: ["An internal law passed by one country", "A court ruling on a dispute", "A private business contract"]
  },
  {
    id: "vc-178",
    word: "advocate",
    sentence: "As an {word} for cleaner rockets, he speaks at schools supporting greener launch fuel.",
    correct: "A person who publicly supports a particular cause",
    distractors: ["A judge who rules on legal cases", "An elected head of government", "A private citizen with no public involvement"]
  },
  {
    id: "vc-179",
    word: "delegate",
    sentence: "Each robotics club sent one {word} to speak for its members at the design conference.",
    correct: "A person chosen to represent others at a meeting or event",
    distractors: ["An elected head of state", "A judge who rules on disputes", "A private business owner"]
  },
  {
    id: "vc-180",
    word: "jurisdiction",
    sentence: "That court lacked {word} over the launch site, so it could not rule on the case.",
    correct: "The official power or authority to make legal decisions in a certain area",
    distractors: ["The total population of a region", "A type of legal document", "A country's military authority"]
  },
  {
    id: "vc-181",
    word: "continent",
    sentence: "From the station window Africa looked like one giant landmass, a whole {word} at once.",
    correct: "One of the world’s main continuous landmasses",
    distractors: ["A single country within a larger region", "A large body of water", "A chain of islands"]
  },
  {
    id: "vc-182",
    word: "peninsula",
    sentence: "Rockets launch from Florida, a {word} with ocean on three of its four sides.",
    correct: "A piece of land surrounded by water on three sides",
    distractors: ["A landmass completely surrounded by water on all sides", "A large flat elevated area of land", "A chain of connected islands"]
  },
  {
    id: "vc-183",
    word: "plateau",
    sentence: "Our rover climbed onto a wide, flat {word} that rose high above the plains below.",
    correct: "A large area of flat land that is elevated above the surrounding land",
    distractors: ["A deep valley between mountains", "A landmass surrounded by water on three sides", "A chain of islands"]
  },
  {
    id: "vc-184",
    word: "archipelago",
    sentence: "Satellite photos showed an {word} of hundreds of small islands scattered across the blue sea.",
    correct: "A group or chain of islands",
    distractors: ["A single large island", "A landmass surrounded by water on three sides", "A flat elevated region of land"]
  },
  {
    id: "vc-185",
    word: "hemisphere",
    sentence: "Earth's equator splits the planet in two, and the ISS crossed into the southern {word}.",
    correct: "Half of the Earth, usually divided by the equator or a meridian",
    distractors: ["A single country's territory", "A chain of islands", "A type of ocean current"]
  },
  {
    id: "vc-186",
    word: "latitude",
    sentence: "Launch sites near the equator sit at a low {word}, measured in degrees north or south.",
    correct: "A measurement of distance north or south of the equator",
    distractors: ["A measurement of distance east or west of a meridian", "The elevation of a location above sea level", "The distance between two cities"]
  },
  {
    id: "vc-187",
    word: "longitude",
    sentence: "Mission control reported the capsule's {word} as 40 degrees west of the Prime Meridian.",
    correct: "A measurement of distance east or west of the Prime Meridian",
    distractors: ["A measurement of distance north or south of the equator", "The elevation of a location above sea level", "A measurement of temperature"]
  },
  {
    id: "vc-188",
    word: "climate",
    sentence: "Mars has a cold, dusty {word} that stays freezing year after year, so rovers need heaters.",
    correct: "The long-term weather pattern typical of a region",
    distractors: ["The weather on a single specific day", "A type of landform", "A measurement of altitude"]
  },
  {
    id: "vc-189",
    word: "terrain",
    sentence: "Rover cameras scanned rocky, crater-filled {word} before the driver picked a safe path.",
    correct: "The physical features of an area of land",
    distractors: ["The weather conditions of a region", "The population of a region", "A type of political boundary"]
  },
  {
    id: "vc-190",
    word: "topography",
    sentence: "Orbiting radar mapped the moon's {word}, recording every crater, ridge, and change in elevation.",
    correct: "The detailed description or mapping of the physical features of a land area",
    distractors: ["The political boundaries of a region", "The climate patterns of a region", "The population density of a region"]
  },
  {
    id: "vc-191",
    word: "revolution",
    sentence: "Cheap reusable rockets sparked a {word} that changed the whole space industry within a few years.",
    correct: "A dramatic and often sudden change, especially in government or society",
    distractors: ["A gradual, unnoticed change over centuries", "A single peaceful election", "A type of trade agreement"]
  },
  {
    id: "vc-192",
    word: "colonization",
    sentence: "Mars {word} would mean settlers claiming and ruling new territory far from their home planet.",
    correct: "The process of settling and establishing control over a foreign territory or people",
    distractors: ["The process of gaining independence from a foreign power", "A peaceful trade agreement between nations", "The formation of a new local government"]
  },
  {
    id: "vc-193",
    word: "industrialization",
    sentence: "New rocket factories brought {word}, turning quiet farm towns into busy manufacturing cities.",
    correct: "The development of industries and factories on a large scale",
    distractors: ["The decline of manufacturing in favor of farming", "A single new invention with no wider impact", "A type of government reform"]
  },
  {
    id: "vc-194",
    word: "migration",
    sentence: "The {word} of thousands of aerospace workers to the coast filled the new launch town.",
    correct: "The movement of people from one place to another",
    distractors: ["The permanent settlement in one's birthplace", "A type of trade agreement", "A change in government leadership"]
  },
  {
    id: "vc-195",
    word: "monarchy",
    sentence: "Because a {word} ruled the nation, the king personally approved every satellite launch.",
    correct: "A form of government headed by a king or queen",
    distractors: ["A government elected directly by the people", "A government run by military leaders only", "A government with no single leader"]
  },
  {
    id: "vc-196",
    word: "democracy",
    sentence: "In a {word}, voters elect the leaders who decide how much money the space program gets.",
    correct: "A system of government in which citizens vote for their leaders",
    distractors: ["A system ruled by a single unelected king", "A system ruled entirely by military leaders", "A system with no leaders at all"]
  },
  {
    id: "vc-197",
    word: "empire",
    sentence: "A planetarium show explained how one ancient {word} ruled many lands under a single emperor.",
    correct: "A large group of states or territories ruled by a single authority",
    distractors: ["A single small independent country", "A temporary military alliance", "A type of trade organization"]
  },
  {
    id: "vc-198",
    word: "artifact",
    sentence: "Museum visitors can see a burned heat shield, an {word} from early human spaceflight.",
    correct: "An object made by humans, especially one of historical interest",
    distractors: ["A naturally occurring rock formation", "A modern manufactured product", "A written law or treaty"]
  },
  {
    id: "vc-199",
    word: "chronology",
    sentence: "Investigators wrote a {word} of the countdown, listing each event in the order it happened.",
    correct: "The arrangement of events in the order they occurred",
    distractors: ["A written record of a single event only", "A map of where events took place", "A list of important historical people"]
  },
  {
    id: "vc-200",
    word: "heritage",
    sentence: "Air shows honor our flying {word}, passing old traditions and stories down to new generations.",
    correct: "Traditions, achievements, and beliefs passed down through generations",
    distractors: ["A type of government policy", "A modern invention with no historical roots", "A legal document"]
  },
  {
    id: "vc-201",
    word: "coefficient",
    sentence: "In the drag formula 3v, the number 3 is the {word} multiplied by the speed variable.",
    correct: "A number multiplied by a variable in an expression",
    distractors: ["The variable itself in an expression", "The answer to an equation", "A type of geometric shape"]
  },
  {
    id: "vc-202",
    word: "equation",
    sentence: "Our fuel {word} showed both sides equal once we solved for the missing thrust value.",
    correct: "A mathematical statement showing two expressions are equal",
    distractors: ["A single number with no variables", "A geometric shape", "A measurement of probability"]
  },
  {
    id: "vc-203",
    word: "function",
    sentence: "Each throttle setting feeds a {word} that returns exactly one thrust value for that input.",
    correct: "A relationship where each input has exactly one output",
    distractors: ["A relationship where one input can have many outputs", "A single fixed number", "A type of geometric shape"]
  },
  {
    id: "vc-204",
    word: "ratio",
    sentence: "Tank readings showed a fuel-to-oxygen {word} of two to one, one amount divided by the other.",
    correct: "A comparison of two quantities by division",
    distractors: ["The sum of two quantities", "The difference between two quantities", "A single fixed measurement"]
  },
  {
    id: "vc-205",
    word: "proportion",
    sentence: "The wind tunnel model kept exact {word}, its wing-to-body ratio equal to the real jet's.",
    correct: "An equation stating that two ratios are equal",
    distractors: ["A single ratio with no comparison", "The total size of an object", "A type of geometric angle"]
  },
  {
    id: "vc-206",
    word: "exponent",
    sentence: "Star distances get huge, so 10 with an {word} of 6 means ten multiplied by itself six times.",
    correct: "The number showing how many times a base is multiplied by itself",
    distractors: ["The base number being multiplied", "The final answer of a calculation", "A type of fraction"]
  },
  {
    id: "vc-207",
    word: "integer",
    sentence: "Countdown numbers like -9 and 9 are {word}s, whole values with nothing after the decimal point.",
    correct: "A whole number, including negatives, with no fractional part",
    distractors: ["A number that includes a fraction or decimal", "Only a positive whole number", "A number used only in geometry"]
  },
  {
    id: "vc-208",
    word: "probability",
    sentence: "Weather officers said the {word} of a lightning delay to the launch was about one chance in four.",
    correct: "The likelihood that a specific event will occur",
    distractors: ["The exact outcome of an event", "The total number of possible outcomes only", "A measurement of distance"]
  },
  {
    id: "vc-209",
    word: "statistic",
    sentence: "Average landing speed is one {word} calculated from thousands of recorded flight data points.",
    correct: "A numerical value calculated from a set of data",
    distractors: ["A single raw data point with no calculation", "A geometric shape", "A type of algebraic equation"]
  },
  {
    id: "vc-210",
    word: "constant",
    sentence: "Gravity near Earth's surface acts as a {word} in our math because the value never changes.",
    correct: "A fixed value that does not change",
    distractors: ["A value that can change depending on conditions", "The main operation in an equation", "A type of geometric shape"]
  },
  {
    id: "vc-211",
    word: "narrative",
    sentence: "The astronaut's memoir tells a {word} of her training, her first launch, and her return home.",
    correct: "A spoken or written account of connected events; a story",
    distractors: ["A list of facts with no connected story", "A single isolated sentence", "A type of poem with no plot"]
  },
  {
    id: "vc-212",
    word: "protagonist",
    sentence: "Every chapter of the flight-school novel follows the {word}, a young pilot with big dreams.",
    correct: "The main character in a story",
    distractors: ["The character who opposes the main character", "A minor background character", "The author of the story"]
  },
  {
    id: "vc-213",
    word: "metaphor",
    sentence: "Calling a rocket a fire-breathing dragon is a {word}, since it is not truly a dragon.",
    correct: "A figure of speech comparing two unlike things without using ‘like’ or ‘as’",
    distractors: ["A comparison using the words 'like' or 'as'", "A literal, factual statement", "A type of rhyme scheme"]
  },
  {
    id: "vc-214",
    word: "symbolism",
    sentence: "A rising star on the mission patch works as {word} for hope and new beginnings.",
    correct: "The use of objects or images to represent deeper meanings or ideas",
    distractors: ["The literal description of an object with no deeper meaning", "The main plot of a story", "A type of grammatical structure"]
  },
  {
    id: "vc-215",
    word: "foreshadowing",
    sentence: "A flickering warning light in chapter one is {word} for the engine failure later.",
    correct: "A hint or clue about events that will happen later in a story",
    distractors: ["A summary of events that already happened", "A description of a character's appearance", "A type of rhyme scheme"]
  },
  {
    id: "vc-216",
    word: "dialogue",
    sentence: "Sharp {word} between the pilot and the controller shows how much the two disagree.",
    correct: "A conversation between two or more characters in a story",
    distractors: ["A character's private thoughts with no spoken words", "The narrator's description of a setting", "A list of characters in a story"]
  },
  {
    id: "vc-217",
    word: "theme",
    sentence: "Never giving up is the central {word} of the novel about a failed rocket launch.",
    correct: "The central message or underlying idea of a piece of writing",
    distractors: ["The setting where a story takes place", "A single character's name", "The order in which events occur"]
  },
  {
    id: "vc-218",
    word: "tone",
    sentence: "One pilot's memoir starts with a joking {word} but turns serious once the storm hits.",
    correct: "The author’s attitude toward the subject, shown through word choice and style",
    distractors: ["The physical setting of a story", "The main plot of a story", "A list of characters"]
  },
  {
    id: "vc-219",
    word: "genre",
    sentence: "Space adventure is his favorite {word} of book, right beside mystery and fantasy.",
    correct: "A category of artistic work characterized by a particular style or subject",
    distractors: ["The main character of a story", "The author's writing style only", "A single chapter of a book"]
  },
  {
    id: "vc-220",
    word: "allegory",
    sentence: "That tale of a lost satellite is an {word}, where every character stands for a bigger idea.",
    correct: "A story in which characters and events represent broader ideas or messages",
    distractors: ["A story with no deeper meaning beyond its plot", "A type of rhyme scheme", "A factual historical account"]
  },
  {
    id: "vc-221",
    word: "conservation",
    sentence: "Water {word} on the ISS means recycling every drop carefully so the supply is never wasted.",
    correct: "The protection and careful management of natural resources",
    distractors: ["The unrestricted use of natural resources", "A type of pollution", "The construction of new factories"]
  },
  {
    id: "vc-222",
    word: "pollution",
    sentence: "Old jet engines added smoke and harmful chemicals to the air, a serious kind of {word}.",
    correct: "The introduction of harmful substances into the environment",
    distractors: ["The natural cleaning of air and water", "A type of renewable energy", "The protection of natural habitats"]
  },
  {
    id: "vc-223",
    word: "renewable",
    sentence: "Solar panels on the satellite use {word} energy from sunlight that never runs out.",
    correct: "Able to be replenished naturally and not depleted with use",
    distractors: ["Limited in supply and unable to be replaced", "Harmful to the environment only", "Available only underground"]
  },
  {
    id: "vc-224",
    word: "biodiversity",
    sentence: "Satellites track rainforest {word}, showing how many different plant and animal species live there.",
    correct: "The variety of living species in a particular habitat or ecosystem",
    distractors: ["The total weight of all organisms in an area", "A single dominant species in a habitat", "The temperature range of an ecosystem"]
  },
  {
    id: "vc-225",
    word: "emission",
    sentence: "Cleaner jet fuel cuts the harmful {word}s that engines release into the air we breathe.",
    correct: "A substance released into the air, especially a pollutant",
    distractors: ["A substance absorbed from the air", "A type of renewable energy", "A natural weather pattern"]
  },
  {
    id: "vc-226",
    word: "deforestation",
    sentence: "Satellite photos showed {word} where thick jungle had been cut down and cleared away.",
    correct: "The clearing or removal of forests",
    distractors: ["The planting of new trees to restore a forest", "A type of natural forest fire", "The protection of forest land from development"]
  },
  {
    id: "vc-227",
    word: "recycling",
    sentence: "On the space station, {word} turns used water and old trash into fresh supplies again.",
    correct: "The process of converting waste materials into reusable products",
    distractors: ["The permanent disposal of waste in landfills", "The burning of waste for energy", "The extraction of raw materials from the earth"]
  },
  {
    id: "vc-228",
    word: "contamination",
    sentence: "Technicians feared {word} when harmful dust particles got inside the sealed satellite chamber.",
    correct: "The presence of a harmful or unwanted substance in something",
    distractors: ["The natural purification of water", "A type of renewable resource", "The protection of a natural resource"]
  },
  {
    id: "vc-229",
    word: "drought",
    sentence: "Orbiting cameras tracked the {word} as the desert region went two years without rain.",
    correct: "A prolonged period of abnormally low rainfall",
    distractors: ["A sudden, brief period of heavy rain", "A type of ocean current", "A seasonal temperature change"]
  },
  {
    id: "vc-230",
    word: "runoff",
    sentence: "After the storm, {word} carried spilled oil off the launch pad into a nearby creek.",
    correct: "Water that flows over the land surface, often carrying pollutants, after rain or snowmelt",
    distractors: ["Water that soaks completely into the ground", "Water stored underground in an aquifer", "Water evaporated into the atmosphere"]
  },
  {
    id: "vc-231",
    word: "nutrient",
    sentence: "Freeze-dried meals give astronauts every {word} their bodies need to grow strong and stay healthy.",
    correct: "A substance that provides nourishment necessary for growth and health",
    distractors: ["A substance with no nutritional value", "A type of exercise", "A unit of measurement for food weight"]
  },
  {
    id: "vc-232",
    word: "metabolism",
    sentence: "Doctors study how a pilot's {word} turns breakfast into the energy needed for long flights.",
    correct: "The chemical processes in the body that convert food into energy",
    distractors: ["The physical structure of the digestive system", "The total weight of a person's body", "A type of exercise routine"]
  },
  {
    id: "vc-233",
    word: "protein",
    sentence: "Astronauts eat extra {word} to build and repair muscle that weakens during long missions.",
    correct: "A nutrient essential for building and repairing muscle and tissue",
    distractors: ["A nutrient that provides quick, short-term energy only", "A type of vitamin found only in fruit", "A substance with no role in the body"]
  },
  {
    id: "vc-234",
    word: "carbohydrate",
    sentence: "Flight crews load up on {word}s like rice and bread for quick energy before night shifts.",
    correct: "A nutrient that is a major source of energy for the body",
    distractors: ["A nutrient used only for building muscle", "A type of vitamin", "A substance the body cannot digest at all"]
  },
  {
    id: "vc-235",
    word: "hydration",
    sentence: "Drinking from a suit tube keeps {word} up so an astronaut's body never runs dry.",
    correct: "The process of maintaining an adequate level of water in the body",
    distractors: ["The process of building muscle through exercise", "The process of digesting food", "The process of storing energy as fat"]
  },
  {
    id: "vc-236",
    word: "calorie",
    sentence: "Mission planners count every {word} in the food so the crew gets enough energy.",
    correct: "A unit of measurement for the energy content of food",
    distractors: ["A unit of measurement for a food's weight", "A type of vitamin", "A unit of measurement for water content"]
  },
  {
    id: "vc-237",
    word: "vitamin",
    sentence: "Space rations include one tiny daily {word} because the body needs small amounts to work right.",
    correct: "An organic compound the body needs in small amounts for normal function",
    distractors: ["A type of protein used for muscle building", "A unit of measurement for energy", "A substance with no role in the body"]
  },
  {
    id: "vc-238",
    word: "digestion",
    sentence: "In microgravity {word} still breaks food down so the body can absorb its nutrients.",
    correct: "The process of breaking down food so the body can absorb nutrients",
    distractors: ["The process of building new muscle tissue", "The process of storing energy as fat", "The process of releasing energy through exercise"]
  },
  {
    id: "vc-239",
    word: "immune",
    sentence: "Long missions can weaken the {word} system that defends the body against germs and disease.",
    correct: "Relating to the body’s system for defending against disease",
    distractors: ["Relating to the body's digestive system", "Relating to the body's muscular system", "Relating to the body's energy storage"]
  },
  {
    id: "vc-240",
    word: "cardiovascular",
    sentence: "Daily treadmill runs protect {word} health, keeping the heart and blood vessels strong in orbit.",
    correct: "Relating to the heart and blood vessels",
    distractors: ["Relating to the digestive system", "Relating to the skeletal system", "Relating to the nervous system"]
  },
  {
    id: "vc-241",
    word: "cognition",
    sentence: "Flight tests measure a pilot's {word}, or how well the mind learns and understands things.",
    correct: "The mental process of acquiring knowledge and understanding",
    distractors: ["The physical process of muscle movement", "A type of emotional reaction", "A measurement of physical strength"]
  },
  {
    id: "vc-242",
    word: "motivation",
    sentence: "Seeing a night launch gave Maya the {word} that drove her to study engineering.",
    correct: "The drive or reason behind a person’s actions",
    distractors: ["A physical skill developed through practice", "A type of academic grade", "A measurement of intelligence"]
  },
  {
    id: "vc-243",
    word: "perception",
    sentence: "In a flight simulator your {word} of speed comes from what your eyes and ears sense.",
    correct: "The way something is understood or interpreted through the senses",
    distractors: ["A physical action taken in response to a stimulus", "A fixed, unchangeable fact", "A type of memory storage"]
  },
  {
    id: "vc-244",
    word: "memory",
    sentence: "Pilots repeat checklists until {word} lets them store and recall each step without looking.",
    correct: "The mental process of storing and recalling information",
    distractors: ["The physical process of learning a motor skill", "A type of emotional response", "A measurement of intelligence"]
  },
  {
    id: "vc-245",
    word: "behavior",
    sentence: "During training, instructors record each cadet's {word} to see how they act under pressure.",
    correct: "The way a person or animal acts or responds",
    distractors: ["A person's internal thoughts with no outward action", "A physical trait present at birth", "A type of academic subject"]
  },
  {
    id: "vc-246",
    word: "reinforcement",
    sentence: "A gold star after each clean landing acted as {word}, encouraging cadets to keep flying carefully.",
    correct: "Something that strengthens or encourages a behavior to continue",
    distractors: ["Something that discourages a behavior from continuing", "A type of academic test", "A physical reflex"]
  },
  {
    id: "vc-247",
    word: "habit",
    sentence: "Checking the fuel gauge became such a {word} that the pilot did it automatically.",
    correct: "A regular behavior pattern, often done automatically",
    distractors: ["A single one-time action", "A physical skill requiring conscious effort each time", "A type of academic grade"]
  },
  {
    id: "vc-248",
    word: "concentration",
    sentence: "Silence in mission control protects the {word} each operator needs to focus on one screen.",
    correct: "The ability to focus one’s attention on a single task",
    distractors: ["The ability to remember information long-term", "A physical reflex action", "A measurement of intelligence"]
  },
  {
    id: "vc-249",
    word: "curiosity",
    sentence: "Pure {word} about black holes pushed Jae to read every telescope article he could find.",
    correct: "A strong desire to learn or know more about something",
    distractors: ["A fear of trying new things", "A physical skill developed through practice", "A type of memory disorder"]
  },
  {
    id: "vc-250",
    word: "empathy",
    sentence: "After the scrubbed launch, her {word} let her feel exactly how disappointed the crew was.",
    correct: "The ability to understand and share the feelings of another person",
    distractors: ["A complete lack of concern for others", "A physical measurement of strength", "A type of academic achievement"]
  },
  {
    id: "vc-251",
    word: "humidity",
    sentence: "Hangar sensors track {word} because water vapor in the air can rust airplane parts.",
    correct: "The amount of water vapor present in the air",
    distractors: ["The temperature of the air", "The speed of the wind", "The air pressure at sea level"]
  },
  {
    id: "vc-252",
    word: "barometric",
    sentence: "An altimeter reads {word} pressure, using the weight of the air to find altitude.",
    correct: "Relating to atmospheric pressure, as measured by a barometer",
    distractors: ["Relating to wind speed only", "Relating to temperature only", "Relating to humidity only"]
  },
  {
    id: "vc-253",
    word: "meteorology",
    sentence: "Launch teams rely on {word}, the science of weather and the atmosphere, before every countdown.",
    correct: "The scientific study of weather and the atmosphere",
    distractors: ["The scientific study of stars and planets", "The scientific study of rocks and minerals", "The scientific study of ocean currents only"]
  },
  {
    id: "vc-254",
    word: "forecast",
    sentence: "The Friday {word} predicted clear skies, so the countdown continued exactly as planned.",
    correct: "A prediction of future weather conditions",
    distractors: ["A record of past weather conditions", "A measurement of current temperature only", "A type of severe storm"]
  },
  {
    id: "vc-255",
    word: "monsoon",
    sentence: "Test flights pause during the {word}, when seasonal winds dump heavy rain for months.",
    correct: "A seasonal wind that brings heavy rainfall to a region",
    distractors: ["A sudden, brief thunderstorm", "A period of drought", "A type of ocean current"]
  },
  {
    id: "vc-256",
    word: "turbulence",
    sentence: "Rough {word} shook the jet as choppy, uneven air tossed it up and down.",
    correct: "Irregular, disruptive air movement that causes shaking or instability",
    distractors: ["Smooth, steady airflow", "A type of cloud formation", "A measurement of air temperature"]
  },
  {
    id: "vc-257",
    word: "precipitation",
    sentence: "Weather radar at the airfield shows any {word} falling as rain, snow, or hail.",
    correct: "Water that falls from the atmosphere as rain, snow, sleet, or hail",
    distractors: ["Water vapor held in the air", "The movement of air currents", "A measurement of air pressure"]
  },
  {
    id: "vc-258",
    word: "atmosphere",
    sentence: "A heat shield glows as the capsule slams into the gases surrounding our planet, the {word}.",
    correct: "The layer of gases surrounding a planet",
    distractors: ["The solid outer layer of a planet", "The magnetic field surrounding a planet", "The ocean covering a planet's surface"]
  },
  {
    id: "vc-259",
    word: "temperature",
    sentence: "Sensors on the test stand read a {word} of 900 degrees inside the glowing nozzle.",
    correct: "A measurement of how hot or cold something is",
    distractors: ["A measurement of air pressure", "A measurement of wind speed", "A measurement of humidity"]
  },
  {
    id: "vc-260",
    word: "front",
    sentence: "A cold {word} slid over the runway where warm and cool air masses met.",
    correct: "The boundary between two air masses with different temperatures",
    distractors: ["The center of a storm system", "A type of ocean current", "A measurement of wind speed"]
  },
  {
    id: "vc-261",
    word: "spacewalk",
    sentence: "During the {word}, Lena floated outside the station to bolt on a new antenna.",
    correct: "An activity where an astronaut exits a spacecraft to work in space",
    distractors: ["The launch of a rocket from Earth", "The return of a spacecraft to Earth", "A test conducted inside a spacecraft"]
  },
  {
    id: "vc-262",
    word: "splashdown",
    sentence: "Rescue boats circled the capsule after its {word} in the calm Pacific ended the mission.",
    correct: "The landing of a spacecraft in water at the end of a mission",
    distractors: ["The launch of a spacecraft from Earth", "The docking of two spacecraft in orbit", "The deployment of a satellite"]
  },
  {
    id: "vc-263",
    word: "liftoff",
    sentence: "At {word} the boosters roared and the rocket finally left the ground behind.",
    correct: "The moment a rocket leaves the ground at launch",
    distractors: ["The moment a spacecraft lands back on Earth", "The separation of a rocket's stages", "The docking of two spacecraft"]
  },
  {
    id: "vc-264",
    word: "flyby",
    sentence: "The spacecraft's {word} took it close past Saturn without landing or circling the planet.",
    correct: "A close pass of a spacecraft by a planet or object without landing or orbiting",
    distractors: ["A spacecraft landing directly on a planet's surface", "A spacecraft entering a long-term orbit", "The launch of a spacecraft from Earth"]
  },
  {
    id: "vc-265",
    word: "probe",
    sentence: "No crew rides aboard the {word} that flies to Neptune and beams data home.",
    correct: "An unmanned spacecraft sent to explore and gather data",
    distractors: ["A crewed spacecraft carrying astronauts", "A satellite that only orbits Earth", "A telescope located on the ground"]
  },
  {
    id: "vc-266",
    word: "lander",
    sentence: "Legs and thrusters let the {word} settle gently onto the dusty surface of the moon.",
    correct: "A spacecraft designed to land on a planet or moon’s surface",
    distractors: ["A spacecraft designed only to orbit a planet", "A telescope used to observe planets from Earth", "A rocket stage used only for launch"]
  },
  {
    id: "vc-267",
    word: "rover",
    sentence: "Six wheels carry the {word} across rocky Martian ground toward a crater miles away.",
    correct: "A vehicle designed to travel across the surface of a planet or moon",
    distractors: ["A spacecraft that only orbits a planet", "A telescope used to observe distant stars", "A capsule used to return astronauts to Earth"]
  },
  {
    id: "vc-268",
    word: "controller",
    sentence: "Each {word} at her console watches the capsule's data and sends orders from the ground.",
    correct: "A person or team who monitors and manages a spacecraft mission from the ground",
    distractors: ["An astronaut piloting the spacecraft", "A robotic arm on a rover", "A telescope in orbit"]
  },
  {
    id: "vc-269",
    word: "spacesuit",
    sentence: "Sealed gloves and a helmet make the {word} keep an astronaut alive in airless space.",
    correct: "A protective suit that allows astronauts to survive in space",
    distractors: ["A uniform worn only inside the spacecraft", "A type of parachute used for landing", "A device used to communicate with Earth"]
  },
  {
    id: "vc-270",
    word: "quarantine",
    sentence: "Returning crews sat in {word} for weeks, kept apart in case they carried germs back.",
    correct: "A period of isolation to prevent the spread of possible contamination or disease",
    distractors: ["A celebration held after a successful mission", "A type of pre-launch training", "A mission planning meeting"]
  },
  {
    id: "vc-271",
    word: "dataset",
    sentence: "Rover teams stored thousands of soil readings in one {word} they could search anytime.",
    correct: "A structured collection of data used for analysis or training",
    distractors: ["A single individual piece of data", "A type of computer hardware", "A finished report with no raw data"]
  },
  {
    id: "vc-272",
    word: "pattern",
    sentence: "Vibration readings repeated the same up-and-down {word} on every wind tunnel run.",
    correct: "A regular, repeated way in which something happens or is arranged",
    distractors: ["A single random, unrelated event", "A type of computer hardware", "A finished conclusion with no evidence"]
  },
  {
    id: "vc-273",
    word: "prediction",
    sentence: "Before launch, forecasters made a {word} that winds would calm down by noon.",
    correct: "A statement about what is expected to happen in the future",
    distractors: ["A record of what already happened in the past", "A type of computer hardware", "A random guess with no basis in data"]
  },
  {
    id: "vc-274",
    word: "classification",
    sentence: "Mars rover software uses {word} to sort rocks into groups by color and shape.",
    correct: "The process of organizing things into categories based on shared characteristics",
    distractors: ["The process of deleting unneeded data", "The process of collecting new data", "The process of displaying data visually"]
  },
  {
    id: "vc-275",
    word: "training",
    sentence: "After weeks of {word}, the landing program had studied millions of example photos.",
    correct: "The process of teaching a computer model using example data",
    distractors: ["The process of deleting a model's data", "The process of displaying a finished result", "The process of connecting to a network"]
  },
  {
    id: "vc-276",
    word: "accuracy",
    sentence: "Our drone's landing {word} improved until it touched down within inches of the target.",
    correct: "How close a result or prediction is to being correct",
    distractors: ["The total amount of data used in training", "The speed at which a model processes data", "The cost of building a model"]
  },
  {
    id: "vc-277",
    word: "bias",
    sentence: "A tilted sensor added the same small {word} to every reading, always guessing too high.",
    correct: "A systematic error or unfair tendency in results",
    distractors: ["A completely random and unpredictable error", "The total size of a dataset", "A measure of processing speed"]
  },
  {
    id: "vc-278",
    word: "model",
    sentence: "Flight software runs a {word} that studies past data to predict engine problems early.",
    correct: "A computer program built to make predictions or decisions based on data",
    distractors: ["The raw, unprocessed data itself", "The physical computer hardware", "A finished written report"]
  },
  {
    id: "vc-279",
    word: "input",
    sentence: "Whatever the airspeed sensor sends becomes {word} for the autopilot to process.",
    correct: "Data or information given to a system for processing",
    distractors: ["Data or a result produced by a system", "The physical computer hardware", "A finished conclusion"]
  },
  {
    id: "vc-280",
    word: "output",
    sentence: "After crunching the numbers, the navigation computer's {word} was a course correction in degrees.",
    correct: "The result or information produced by a system after processing",
    distractors: ["Data given to a system before processing", "The physical computer hardware", "The training data used to build a model"]
  },
  {
    id: "vc-281",
    word: "broadcast",
    sentence: "Millions of people around the world watched the live {word} of the rocket liftoff.",
    correct: "A transmission of information sent out to a wide audience",
    distractors: ["A private message sent to a single recipient", "A written report shared only within a company", "A recorded video with no audience"]
  },
  {
    id: "vc-282",
    word: "signal",
    sentence: "A faint radio {word} from the distant probe finally reached the antennas on Earth.",
    correct: "Information transmitted through electrical, radio, or other means",
    distractors: ["A physical object sent through the mail", "A written document with no transmission", "A type of computer hardware"]
  },
  {
    id: "vc-283",
    word: "media",
    sentence: "Television stations, radio shows, and news websites are the {word} that covered the launch.",
    correct: "The means of mass communication, such as television, radio, or the internet",
    distractors: ["A single private conversation", "A type of computer hardware", "A government agency"]
  },
  {
    id: "vc-284",
    word: "journalism",
    sentence: "Reporters at the launch site practice {word} by gathering facts and writing news stories.",
    correct: "The activity of gathering and reporting news",
    distractors: ["The activity of writing fictional stories only", "The activity of designing advertisements only", "The activity of managing a business"]
  },
  {
    id: "vc-285",
    word: "censorship",
    sentence: "Strict {word} kept reporters from publishing anything about the country's failed rocket test.",
    correct: "The suppression or restriction of information or speech",
    distractors: ["The free and open sharing of information", "A type of news reporting technique", "A method of fact-checking articles"]
  },
  {
    id: "vc-286",
    word: "propaganda",
    sentence: "That space-race poster was pure {word}, made to persuade people rather than report facts.",
    correct: "Biased or misleading information used to promote a particular viewpoint",
    distractors: ["A neutral, fact-based news report", "A private personal opinion shared with no wider audience", "A type of scientific research"]
  },
  {
    id: "vc-287",
    word: "credible",
    sentence: "Space news from a NASA engineer is more {word} than a random anonymous post.",
    correct: "Believable and trustworthy",
    distractors: ["Untrustworthy and unreliable", "Extremely brief and short", "Written only for entertainment"]
  },
  {
    id: "vc-288",
    word: "transmission",
    sentence: "Because Mars is so far away, {word} of each command takes many minutes.",
    correct: "The sending of a signal or message from one place to another",
    distractors: ["The permanent storage of a signal", "The complete loss of a signal", "The physical hardware used to build a radio"]
  },
  {
    id: "vc-289",
    word: "interference",
    sentence: "Static from the thunderstorm caused {word} that weakened the tower's radio link with pilots.",
    correct: "A disturbance that disrupts or weakens a signal",
    distractors: ["A boost that strengthens a signal", "A type of antenna", "A method of encrypting a signal"]
  },
  {
    id: "vc-290",
    word: "frequency",
    sentence: "Each radio {word} is measured in cycles per second, and pilots tune to the right one.",
    correct: "The number of wave cycles that occur per second",
    distractors: ["The total distance a wave travels", "The height of a wave", "The speed of light"]
  },
  {
    id: "vc-291",
    word: "supply",
    sentence: "When the factory built extra rocket parts, the larger {word} pushed prices down for buyers.",
    correct: "The amount of a good or service available for purchase",
    distractors: ["The amount of a good or service that consumers want to buy", "The total cost of producing a good", "A type of government tax"]
  },
  {
    id: "vc-292",
    word: "demand",
    sentence: "So many airlines wanted the new jet that {word} for it outran the factory's output.",
    correct: "The desire and ability of consumers to buy a good or service",
    distractors: ["The amount of a good available for sale", "The total cost of producing a good", "A type of government regulation"]
  },
  {
    id: "vc-293",
    word: "inflation",
    sentence: "Rising {word} meant the same titanium bolts cost the rocket shop more each year.",
    correct: "A general increase in prices and fall in the purchasing power of money",
    distractors: ["A general decrease in prices over time", "A fixed, unchanging price level", "A type of government tax"]
  },
  {
    id: "vc-294",
    word: "currency",
    sentence: "Buying rocket parts in Japan meant trading dollars for that country's own {word} first.",
    correct: "The system of money used in a particular country",
    distractors: ["A type of international trade agreement", "A government tax on imported goods", "A measure of a country's total wealth"]
  },
  {
    id: "vc-295",
    word: "tariff",
    sentence: "Congress placed a {word} on imported jet parts, a tax that made foreign engines pricier.",
    correct: "A tax imposed on imported or exported goods",
    distractors: ["A tax on personal income", "A subsidy paid to local manufacturers", "A type of trade agreement with no tax involved"]
  },
  {
    id: "vc-296",
    word: "commodity",
    sentence: "Aluminum is a {word} that rocket builders buy by the ton at changing world prices.",
    correct: "A raw material or basic good that can be bought and sold",
    distractors: ["A finished manufactured product only", "A type of currency", "A government economic policy"]
  },
  {
    id: "vc-297",
    word: "trade",
    sentence: "Selling engines abroad and buying metal overseas are both part of global {word}.",
    correct: "The buying and selling of goods and services",
    distractors: ["The taxation of imported goods only", "The printing of a country's currency", "A government's total budget"]
  },
  {
    id: "vc-298",
    word: "market",
    sentence: "Satellite builders compete in a worldwide {word} where customers shop for the cheapest launch.",
    correct: "A system or place where goods, services, or securities are bought and sold",
    distractors: ["A government agency that regulates trade", "A type of currency", "A single company's total revenue"]
  },
  {
    id: "vc-299",
    word: "monopoly",
    sentence: "One rocket firm held a {word} because no rival company could launch satellites at all.",
    correct: "Complete control of a market by a single company, with no competition",
    distractors: ["A market with many competing companies", "A government-run trade agreement", "A type of consumer protection law"]
  },
  {
    id: "vc-300",
    word: "scarcity",
    sentence: "{word} of heat shield material slowed the build because far less existed than teams needed.",
    correct: "A limited availability of a resource relative to demand",
    distractors: ["An unlimited, abundant supply of a resource", "A fixed price set by the government", "A type of trade agreement"]
  },
  {
    id: "vc-301",
    word: "segregation",
    sentence: "At early NASA centers, {word} forced Black women mathematicians to work in separate rooms.",
    correct: "The enforced separation of different racial or social groups",
    distractors: ["The equal integration of all groups in society", "A type of voting law only", "A government economic policy"]
  },
  {
    id: "vc-302",
    word: "discrimination",
    sentence: "Early female pilots faced {word} when airlines refused to hire them just for being women.",
    correct: "Unfair treatment of a person or group based on characteristics like race or gender",
    distractors: ["Fair and equal treatment of all people", "A type of government tax policy", "A method of counting votes"]
  },
  {
    id: "vc-303",
    word: "equality",
    sentence: "Astronaut selection now aims for {word}, giving every qualified person the same chance to fly.",
    correct: "The state of being equal, especially in rights and opportunities",
    distractors: ["The state of having more rights than others", "A type of economic policy", "A method of segregating groups"]
  },
  {
    id: "vc-304",
    word: "activism",
    sentence: "Steady {word}, including marches and petitions, pushed the space agency to hire more women.",
    correct: "Efforts to bring about political or social change through direct action",
    distractors: ["A complete lack of interest in political issues", "A type of government job", "A legal court proceeding"]
  },
  {
    id: "vc-305",
    word: "protest",
    sentence: "Crowds gathered outside the launch gate in {word} of the noisy new night flights.",
    correct: "A public expression of disagreement or objection to something",
    distractors: ["A private, silent agreement with a policy", "A type of government election", "A legal contract"]
  },
  {
    id: "vc-306",
    word: "legislation",
    sentence: "Congress passed {word} creating NASA, and those new laws still guide the agency today.",
    correct: "Laws that have been enacted by a government",
    distractors: ["A court's ruling on a single case", "A private company's internal policy", "A public protest with no legal effect"]
  },
  {
    id: "vc-307",
    word: "injustice",
    sentence: "Being denied a pilot's license because of her skin color was a clear {word}.",
    correct: "A situation in which people are treated unfairly",
    distractors: ["A situation in which all people are treated fairly", "A type of government tax", "A legal contract between two parties"]
  },
  {
    id: "vc-308",
    word: "boycott",
    sentence: "Airline customers staged a {word}, refusing to buy tickets until the company changed its rules.",
    correct: "A refusal to buy or use something as a form of protest",
    distractors: ["An agreement to purchase more of a product", "A type of government tax", "A private business contract"]
  },
  {
    id: "vc-309",
    word: "integration",
    sentence: "Full {word} of the flight crew meant pilots of every race finally flew together equally.",
    correct: "The act of bringing different groups together into equal participation",
    distractors: ["The enforced separation of different groups", "A type of economic policy", "A private business merger"]
  },
  {
    id: "vc-310",
    word: "advocacy",
    sentence: "Her steady {word} for stronger airport safety rules convinced lawmakers to support the change.",
    correct: "Public support for or recommendation of a particular cause or policy",
    distractors: ["Public opposition to any form of change", "A type of legal punishment", "A government tax policy"]
  },
  {
    id: "vc-311",
    word: "analyze",
    sentence: "Crash investigators {word} every scrap of wreckage in detail to learn what went wrong.",
    correct: "To examine something in detail to understand it better",
    distractors: ["To ignore something without examining it", "To create something entirely new", "To memorize information without understanding it"]
  },
  {
    id: "vc-312",
    word: "synthesize",
    sentence: "Good mission reports {word} notes from pilots, sensors, and radar into one clear story.",
    correct: "To combine different ideas or pieces of information into a coherent whole",
    distractors: ["To separate information into smaller unrelated pieces", "To copy information exactly without changes", "To delete unnecessary information"]
  },
  {
    id: "vc-313",
    word: "evaluate",
    sentence: "Judges will {word} each rocket club design and score it for safety and cleverness.",
    correct: "To judge or assess the value or quality of something",
    distractors: ["To create something from scratch", "To copy an existing idea exactly", "To ignore the quality of something entirely"]
  },
  {
    id: "vc-314",
    word: "justify",
    sentence: "Before the review board, she had to {word} the heavier wing by proving it was reasonable.",
    correct: "To show or prove that something is reasonable or valid",
    distractors: ["To hide the reasoning behind a decision", "To copy someone else's reasoning exactly", "To ignore any need for reasoning"]
  },
  {
    id: "vc-315",
    word: "infer",
    sentence: "From scorch marks alone, technicians can {word} that the engine ran far too hot.",
    correct: "To reach a conclusion based on evidence and reasoning, rather than direct statement",
    distractors: ["To state something directly and explicitly", "To ignore all available evidence", "To copy a conclusion from another source"]
  },
  {
    id: "vc-316",
    word: "summarize",
    sentence: "After the launch, the flight director asked me to {word} the whole mission in three short sentences.",
    correct: "To give a brief statement of the main points of something",
    distractors: ["To rewrite something in full detail with nothing left out", "To ignore the main points entirely", "To translate something into another language"]
  },
  {
    id: "vc-317",
    word: "interpret",
    sentence: "Mission control had to {word} the strange telemetry signal to figure out what it meant.",
    correct: "To explain or understand the meaning of something",
    distractors: ["To ignore the meaning of something entirely", "To copy something exactly without understanding it", "To translate a document word for word"]
  },
  {
    id: "vc-318",
    word: "articulate",
    sentence: "During the design review, Maya could {word} her wing idea so clearly that everyone understood.",
    correct: "To express an idea or feeling clearly and effectively",
    distractors: ["To keep an idea completely private and unspoken", "To copy someone else's explanation exactly", "To ignore an idea entirely"]
  },
  {
    id: "vc-319",
    word: "differentiate",
    sentence: "New rover drivers learn to {word} between a harmless dust patch and dangerous soft sand.",
    correct: "To recognize or show the difference between things",
    distractors: ["To treat two different things as identical", "To combine two things into one", "To ignore the differences between things"]
  },
  {
    id: "vc-320",
    word: "substantiate",
    sentence: "To {word} his claim about the cracked fin, he showed wind tunnel data as proof.",
    correct: "To provide evidence to support or prove a claim",
    distractors: ["To state a claim with no supporting evidence", "To disprove a claim entirely", "To ignore a claim without response"]
  },
  {
    id: "vc-321",
    word: "emphasize",
    sentence: "Flight manuals {word} preflight checks by printing them in bold red capital letters.",
    correct: "To give special importance or attention to something",
    distractors: ["To ignore or downplay something's importance", "To remove something from consideration entirely", "To translate something into simpler terms"]
  },
  {
    id: "vc-322",
    word: "illustrate",
    sentence: "This cutaway drawing helps {word} how air moves through each stage of the jet engine.",
    correct: "To make something clear by using examples, pictures, or explanation",
    distractors: ["To hide the details of something intentionally", "To summarize something in a single word", "To ignore an explanation entirely"]
  },
  {
    id: "vc-323",
    word: "demonstrate",
    sentence: "Our robotics coach will {word} how the arm grips a sample before we try it.",
    correct: "To show clearly by example, action, or proof",
    distractors: ["To describe something without any proof or example", "To ignore a topic entirely", "To question whether something is true"]
  },
  {
    id: "vc-324",
    word: "clarify",
    sentence: "The tower repeated the landing instruction slowly to {word} it for the confused student pilot.",
    correct: "To make something clearer or easier to understand",
    distractors: ["To make something more confusing", "To ignore a question entirely", "To summarize something extremely briefly"]
  },
  {
    id: "vc-325",
    word: "elaborate",
    sentence: "At the design review the engineers wanted more detail, so they asked him to {word} on his answer.",
    correct: "To add more detail or explanation to something already stated",
    distractors: ["To shorten an explanation as much as possible", "To ignore a topic entirely", "To disagree with a previous statement"]
  },
  {
    id: "vc-326",
    word: "contrast",
    sentence: "Our report will {word} solid rocket boosters with liquid engines to show how they differ.",
    correct: "To compare things in order to highlight their differences",
    distractors: ["To describe only the similarities between two things", "To combine two things into one", "To ignore any differences between things"]
  },
  {
    id: "vc-327",
    word: "correlate",
    sentence: "Wind speed and drone battery drain {word} closely, since stronger gusts always cost more power.",
    correct: "To have a mutual relationship or connection between two or more things",
    distractors: ["To have absolutely no relationship between two things", "To cause one thing to directly create another", "To eliminate one variable from a study"]
  },
  {
    id: "vc-328",
    word: "generalize",
    sentence: "Do not {word} about all landing gear from a single bad test on one plane.",
    correct: "To form a broad statement or conclusion based on specific examples",
    distractors: ["To focus only on one very specific detail", "To ignore all available examples", "To prove something with absolute certainty"]
  },
  {
    id: "vc-329",
    word: "formulate",
    sentence: "Before the drone contest, our crew met to {word} a step-by-step plan for the flight.",
    correct: "To create or develop something in a systematic way, such as a plan or idea",
    distractors: ["To abandon a plan before it is created", "To copy an existing plan exactly", "To ignore the need for a plan"]
  },
  {
    id: "vc-330",
    word: "prioritize",
    sentence: "With the launch window closing, the crew had to {word} repairs, fixing the most urgent first.",
    correct: "To arrange tasks in order of importance",
    distractors: ["To treat every task as equally important", "To ignore all tasks entirely", "To complete tasks in a completely random order"]
  },
  {
    id: "vc-331",
    word: "obsolescence",
    sentence: "Those 1970s radar consoles fell into {word} once faster digital systems replaced them completely.",
    correct: "The state of becoming outdated or no longer useful",
    distractors: ["The state of constantly improving over time", "A type of manufacturing defect", "A method of extending a product's life"]
  },
  {
    id: "vc-332",
    word: "scalability",
    sentence: "Thanks to the ground network's {word}, it tracks ten satellites today and hundreds next year.",
    correct: "The ability of a system to handle a growing amount of work",
    distractors: ["The ability of a system to work only at a small, fixed size", "The total cost of building a system", "The physical size of a piece of hardware"]
  },
  {
    id: "vc-333",
    word: "interoperability",
    sentence: "Careful {word} lets rovers from different countries share maps and talk to the same satellite.",
    correct: "The ability of different systems or devices to work together",
    distractors: ["The ability of a system to work in complete isolation", "The total number of users a system supports", "The speed at which a system processes data"]
  },
  {
    id: "vc-334",
    word: "modularity",
    sentence: "Because the station is built with {word}, crews can unbolt one lab and attach another.",
    correct: "A design approach using separate, interchangeable parts or sections",
    distractors: ["A design approach using one single, unchangeable structure", "The total weight of a spacecraft", "The cost of manufacturing a design"]
  },
  {
    id: "vc-335",
    word: "reliability",
    sentence: "That engine's {word} is proven, since it has started perfectly on every flight for years.",
    correct: "The quality of performing consistently well over time",
    distractors: ["The quality of being extremely lightweight", "The quality of looking visually appealing", "The total cost of a system"]
  },
  {
    id: "vc-336",
    word: "robustness",
    sentence: "The rover's {word} let it keep driving through dust storms and freezing Martian nights.",
    correct: "The ability to withstand or overcome difficult conditions",
    distractors: ["The ability to operate only under perfect conditions", "The total weight of a design", "The appearance of a design"]
  },
  {
    id: "vc-337",
    word: "throughput",
    sentence: "Swapping in a bigger dish doubled our {word}, moving twice as many images per hour.",
    correct: "The amount of material or data processed in a given amount of time",
    distractors: ["The total storage capacity of a system", "The physical size of a device", "The cost of operating a system"]
  },
  {
    id: "vc-338",
    word: "latency",
    sentence: "Radio {word} to Mars means a rover waits many minutes before your command arrives.",
    correct: "The delay before data transfer begins following an instruction",
    distractors: ["The total amount of data that can be transferred", "The physical distance between two devices", "The cost of a network connection"]
  },
  {
    id: "vc-339",
    word: "bottleneck",
    sentence: "One slow paint booth became the {word} that held up every airplane on the line.",
    correct: "A point of congestion that limits the speed of an entire process",
    distractors: ["The fastest step in a process", "The total cost of a process", "The final finished product of a process"]
  },
  {
    id: "vc-340",
    word: "compatibility",
    sentence: "Techs tested the new sensor's {word} with the old flight computer so nothing would clash.",
    correct: "The ability of two things to work together without conflict",
    distractors: ["The inability of two things to ever work together", "The total cost of a component", "The physical weight of a component"]
  },
  {
    id: "vc-341",
    word: "licensure",
    sentence: "Aircraft mechanics must finish {word} before they are legally allowed to sign off on repairs.",
    correct: "The process of obtaining an official license to practice a profession",
    distractors: ["A voluntary training program with no official recognition", "A type of academic degree only", "A company's internal training program"]
  },
  {
    id: "vc-342",
    word: "certification",
    sentence: "Dad hung his framed welding {word} in the hangar to prove he passed the exam.",
    correct: "An official document or status confirming a qualification or achievement",
    distractors: ["A performance review written by a manager", "A company's mission statement", "A type of employee benefit"]
  },
  {
    id: "vc-343",
    word: "apprenticeship",
    sentence: "Jamal spent two years in an {word}, learning to build jet engines beside a master mechanic.",
    correct: "A position where a person learns a trade through practical experience under a skilled worker",
    distractors: ["A fully independent job with no supervision or training", "A type of academic degree earned only through exams", "A temporary volunteer position"]
  },
  {
    id: "vc-344",
    word: "credential",
    sentence: "No one enters the launch control room without a {word} proving they are trained and allowed.",
    correct: "A qualification or achievement that shows a person’s ability or authority",
    distractors: ["A performance review score", "A type of company policy", "A financial bonus payment"]
  },
  {
    id: "vc-345",
    word: "portfolio",
    sentence: "Her {word} held photos of every drone she had designed, built, and flown.",
    correct: "A collection of work samples that demonstrate a person’s skills and experience",
    distractors: ["A single job application form", "A company's financial report", "A type of academic transcript"]
  },
  {
    id: "vc-346",
    word: "aptitude",
    sentence: "Even at nine she showed such {word} for flying that her instructor at the airfield called it a gift.",
    correct: "A natural ability or talent for a particular skill or subject",
    distractors: ["A learned skill with no natural talent involved", "A type of academic degree", "A performance review score"]
  },
  {
    id: "vc-347",
    word: "vocation",
    sentence: "Repairing airplanes felt like his true {word}, the one job Grandpa was born to do.",
    correct: "A person’s main occupation, especially one they feel strongly suited to",
    distractors: ["A temporary job with no long-term commitment", "A type of academic degree", "A single work task"]
  },
  {
    id: "vc-348",
    word: "mentorship",
    sentence: "Through {word}, a veteran test pilot guided the rookie through her first year of flying.",
    correct: "A relationship where a more experienced person guides a less experienced one",
    distractors: ["A formal legal contract between employer and employee", "A type of academic exam", "A company's financial report"]
  },
  {
    id: "vc-349",
    word: "fieldwork",
    sentence: "Instead of studying indoors, the team did {word} at the desert crash site all week.",
    correct: "Practical work conducted outside of a classroom or office, in a real-world setting",
    distractors: ["Work done entirely through textbooks and lectures", "A type of financial audit", "A company's internal meeting"]
  },
  {
    id: "vc-350",
    word: "specialization",
    sentence: "Priya studied general aerospace topics for years before choosing a {word} in heat shields.",
    correct: "A focus on a specific area of expertise within a broader field",
    distractors: ["A broad, general knowledge of many unrelated fields", "A type of academic degree only", "A company's hiring policy"]
  },
  {
    id: "vc-351",
    word: "microgravity",
    sentence: "In {word} aboard the station, a dropped pencil just floats instead of falling.",
    correct: "A condition of very weak gravity, causing near-weightlessness",
    distractors: ["A condition of extremely strong gravity", "A condition found only on a planet's surface", "A type of artificial gravity created by spinning"]
  },
  {
    id: "vc-352",
    word: "thermodynamics",
    sentence: "Studying {word} explains how heat turns into energy and pushes a rocket forward.",
    correct: "The branch of physics dealing with heat, energy, and work",
    distractors: ["The branch of physics dealing with electric charge", "The branch of physics dealing with light and optics", "The branch of physics dealing with sound waves"]
  },
  {
    id: "vc-353",
    word: "interplanetary",
    sentence: "An {word} probe may spend years crossing the gap from Earth to Jupiter.",
    correct: "Occurring or traveling between planets",
    distractors: ["Occurring only within a single planet's atmosphere", "Occurring only between stars in different galaxies", "Occurring only on a planet's surface"]
  },
  {
    id: "vc-354",
    word: "extravehicular",
    sentence: "Any {word} repair means floating outside the capsule in a spacesuit, tethered to a handrail.",
    correct: "Taking place outside a spacecraft",
    distractors: ["Taking place entirely inside a spacecraft", "Taking place only before launch", "Taking place only after landing"]
  },
  {
    id: "vc-355",
    word: "heliocentric",
    sentence: "In a {word} map of our solar system, every planet circles the sun in the middle.",
    correct: "Having the sun at the center",
    distractors: ["Having the Earth at the center", "Having the moon at the center", "Having no fixed center at all"]
  },
  {
    id: "vc-356",
    word: "geostationary",
    sentence: "A {word} weather satellite hovers above the exact same spot on Earth day after day.",
    correct: "Remaining in a fixed position relative to a point on Earth while in orbit",
    distractors: ["Moving randomly with no fixed orbital pattern", "Orbiting only the moon", "Remaining fixed on the ground, never leaving Earth"]
  },
  {
    id: "vc-357",
    word: "ballistic",
    sentence: "Once its engine cuts off, a {word} rocket coasts in an arc like a thrown baseball.",
    correct: "Relating to an object propelled and then moving only under gravity and momentum",
    distractors: ["Relating to an object powered continuously throughout its flight", "Relating to an object that never leaves the ground", "Relating to an object that only moves in a straight line"]
  },
  {
    id: "vc-358",
    word: "subsonic",
    sentence: "A propeller plane stays {word}, flying slower than the sound of its own engine.",
    correct: "Slower than the speed of sound",
    distractors: ["Faster than the speed of sound", "Exactly equal to the speed of sound", "Faster than the speed of light"]
  },
  {
    id: "vc-359",
    word: "hypersonic",
    sentence: "A {word} test vehicle screams along at over five times the speed of sound.",
    correct: "Relating to speeds greater than five times the speed of sound",
    distractors: ["Relating to speeds slower than the speed of sound", "Relating to speeds equal to the speed of sound", "Relating to speeds measured only in miles per hour"]
  },
  {
    id: "vc-360",
    word: "terraforming",
    sentence: "Some students imagine {word} Mars, warming its air until people could breathe there someday.",
    correct: "The theoretical process of altering a planet’s environment to make it habitable for life",
    distractors: ["The process of mapping a planet's surface only", "The process of launching a rocket into orbit", "The process of collecting rock samples from a planet"]
  }
];
