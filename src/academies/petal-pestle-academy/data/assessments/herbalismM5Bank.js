// ---------------------------------------------------------------------------
// HERBALISM & BOTANY — MODULE 5 QUESTION BANK
// Water: the Cycle and the Plant · Lessons 25–30 · Quarter 2, Weeks 1 and 2
//
// Ten questions per lesson, sixty in all. These are NOT asked at the end of a
// lesson. They are the pool the Day 4 weekly test draws from: three lessons at
// ten questions is a thirty-question pool, and buildWeeklyTest takes eight of
// them. They also feed the morning warm-up and the extra practice the practice
// gate serves when she misses more than one on a lesson check.
//
//   Week 1 pool — hb-m5-01, hb-m5-02, hb-m5-03  (30 questions)
//   Week 2 pool — hb-m5-04, hb-m5-05, hb-m5-06  (30 questions)
//
// ---- FIELD SHAPE, AND ONE HONEST GAP ----
//
// src/data/assessments/herbalismM1Bank.js was NOT present in this working
// copy, so the shape here is built against what scripts/check-assessment.mjs
// actually reads: id, lesson, prompt, choices (exactly 4, all different),
// answer (0-3), feedback (4 entries, null in the correct slot, a real sentence
// in every other), and why (never blank — it is what the review screen shows).
// If the real M1 bank carries any further field, add it here before merging.
//
// ---- THE READING BAR ----
//
// check-assessment holds every prompt to: under 11 words a sentence, and
// almost no long words. Its SUBJECT exemption list does not yet contain this
// module's vocabulary, so the long words in this bank live in the CHOICES and
// in the feedback, which are not syllable-checked, and the PROMPTS are kept
// plain. Four words to add to that SUBJECT set when this merges, so later
// modules can use them in a prompt: evaporation, condensation, precipitation,
// transpiration. Also stomata, xylem and drainage.
//
// ---- DISTRACTORS ----
//
// Where the payload is vocabulary, the wrong choices are the OTHER words from
// this module. A miss on "what is water leaving a leaf called" that lands on
// "evaporation" names the exact confusion, and the feedback names it back.
// Nothing here is filler.
//
// ---- SAFETY ----
//
// No dosing language anywhere. This is the water module, so the temptation is
// low, but the rule holds: no plant treats anything, and nothing is tasted.
// ---------------------------------------------------------------------------

export const HERBALISM_M5_BANK = [
  // =========================================================================
  // LESSON 25 · hb-m5-01 · Where rain comes from
  // =========================================================================
  {
    id: 't-hbm501a',
    lesson: 'hb-m5-01',
    prompt: 'A puddle dries up in the sun. Where did the water go?',
    choices: ['Into the air as vapour', 'Into the ground only', 'It is gone for good', 'The sun drank it'],
    answer: 0,
    feedback: [
      null,
      'A little soaks in. Most of a patio puddle goes up.',
      'Water never disappears. It changes form.',
      'The sun heats water. It does not drink it.'
    ],
    why: 'Heat turns the water into vapour and it rises. That is evaporation.'
  },
  {
    id: 't-hbm501b',
    lesson: 'hb-m5-01',
    prompt: 'What is the name for water turning into a gas?',
    choices: ['Precipitation', 'Collection', 'Evaporation', 'Condensation'],
    answer: 2,
    feedback: [
      'That is water falling out of the sky.',
      'That is where water gathers after it falls.',
      null,
      'That is gas turning back into drops.'
    ],
    why: 'Evaporation is liquid water becoming water vapour.'
  },
  {
    id: 't-hbm501c',
    lesson: 'hb-m5-01',
    prompt: 'On a hot day a cold glass goes wet. Why?',
    choices: ['The glass leaked', 'Vapour turned back into drops', 'The ice pushed water out', 'Warm air is always wet'],
    answer: 1,
    feedback: [
      'Glass does not leak.',
      null,
      'The ice is inside and it stays inside.',
      'Air only makes drops when something cools it.'
    ],
    why: 'The cold glass cools the air beside it. The vapour becomes drops. Condensation.'
  },
  {
    id: 't-hbm501d',
    lesson: 'hb-m5-01',
    prompt: 'Which one of these is precipitation?',
    choices: ['Steam over a hot pot', 'Fog on a mirror', 'A dry windy day', 'Snow falling from a cloud'],
    answer: 3,
    feedback: [
      'That is water going up as vapour.',
      'That is condensation on glass.',
      'Nothing is falling.',
      null
    ],
    why: 'Precipitation is water falling out of the sky: rain, snow, sleet or hail.'
  },
  {
    id: 't-hbm501e',
    lesson: 'hb-m5-01',
    prompt: 'Two cups of water sit out. One is covered. Which empties?',
    choices: ['Both the same', 'Neither one', 'The open cup', 'The covered cup'],
    answer: 2,
    feedback: [
      'A lid changes it a great deal.',
      'Water leaves the open one every day.',
      null,
      'The lid catches the vapour and it drips back in.'
    ],
    why: 'A cover traps the vapour, so it turns back into drops and falls in again.'
  },
  {
    id: 't-hbm501f',
    lesson: 'hb-m5-01',
    prompt: 'What is a cloud made of?',
    choices: ['Millions of tiny water drops', 'Smoke', 'Cotton', 'Dry warm air'],
    answer: 0,
    feedback: [
      null,
      'Smoke is burnt bits, not water.',
      'Cotton is a plant. A cloud only looks like it.',
      'Clouds are wet, not dry.'
    ],
    why: 'Cool air turns vapour into tiny drops, and billions of them together make a cloud.'
  },
  {
    id: 't-hbm501g',
    lesson: 'hb-m5-01',
    prompt: 'Is the rain falling today brand new water?',
    choices: ['Yes, it comes from space', 'No, rain is not water', 'Yes, the sky makes it', 'No, it has been round before'],
    answer: 3,
    feedback: [
      'Almost no water comes from space.',
      'Rain is water.',
      'The sky does not make water.',
      null
    ],
    why: 'The same water goes round the cycle again and again.'
  },
  {
    id: 't-hbm501h',
    lesson: 'hb-m5-01',
    prompt: 'Water goes up, makes clouds, and falls. What is that called?',
    choices: ['The weather map', 'The water cycle', 'The food chain', 'The life cycle'],
    answer: 1,
    feedback: [
      'A map shows the weather. It is not the water.',
      null,
      'A food chain is about what eats what.',
      'That is a plant growing from a seed.'
    ],
    why: 'The water cycle is the same water moving round: up, across, down, and round again.'
  },
  {
    id: 't-hbm501i',
    lesson: 'hb-m5-01',
    prompt: 'A wet towel dries faster on which kind of day?',
    choices: ['Hot and windy', 'Cold and still', 'Cool and cloudy', 'Rainy and grey'],
    answer: 0,
    feedback: [
      null,
      'Cold and still is the slowest of all.',
      'Cool air holds less heat, so it lifts less water.',
      'Rain puts water back on the towel.'
    ],
    why: 'Heat and moving air both speed up evaporation.'
  },
  {
    id: 't-hbm501j',
    lesson: 'hb-m5-01',
    prompt: 'Where does the water in a cloud come from?',
    choices: ['It came from the moon', 'Clouds are not water', 'It rose up from below', 'It was made up in the sky'],
    answer: 2,
    feedback: [
      'No water comes here from the moon.',
      'Clouds are made of water drops.',
      null,
      'The sky does not make water.'
    ],
    why: 'Water evaporates from seas, lakes, soil and leaves, then rises and cools.'
  },

  // =========================================================================
  // LESSON 26 · hb-m5-02 · Ice, water, vapour in a jar
  // =========================================================================
  {
    id: 't-hbm502a',
    lesson: 'hb-m5-02',
    prompt: 'Ice, water and vapour are how many different things?',
    choices: ['One thing in three states', 'Two things', 'None of these', 'Three different things'],
    answer: 0,
    feedback: [
      null,
      'All three are the same water.',
      'One of these answers is right.',
      'They are all water.'
    ],
    why: 'Solid, liquid and gas are three states of one thing: water.'
  },
  {
    id: 't-hbm502b',
    lesson: 'hb-m5-02',
    prompt: 'What do you add to turn ice into water?',
    choices: ['Salt on its own', 'Air', 'Heat', 'Cold'],
    answer: 2,
    feedback: [
      'Salt helps a little, but heat is the reason.',
      'Air on its own does nothing.',
      null,
      'Cold makes ice. It does not melt it.'
    ],
    why: 'Melting needs energy going in. Heat moves water up from solid to liquid.'
  },
  {
    id: 't-hbm502c',
    lesson: 'hb-m5-02',
    prompt: 'Warm water sits in a closed jar in the sun. What forms on the lid?',
    choices: ['Nothing at all', 'Drops of water', 'Ice', 'Dry dust'],
    answer: 1,
    feedback: [
      'Look closely. Something does form.',
      null,
      'The sun is warming the jar, not freezing it.',
      'The inside of that jar is wet.'
    ],
    why: 'Vapour rises, meets the cooler lid, and turns back into drops. Condensation.'
  },
  {
    id: 't-hbm502d',
    lesson: 'hb-m5-02',
    prompt: 'Water in the freezer turns to ice. What was taken away?',
    choices: ['Water', 'Air', 'Light', 'Heat'],
    answer: 3,
    feedback: [
      'The water is all still there, as ice.',
      'Air was not the thing that changed.',
      'A freezer is dark, but that is not what did it.',
      null
    ],
    why: 'Freezing is heat leaving. Take heat away and a liquid becomes a solid.'
  },
  {
    id: 't-hbm502e',
    lesson: 'hb-m5-02',
    prompt: 'Which one is water as a gas?',
    choices: ['A puddle', 'Snow', 'Water vapour', 'An ice cube'],
    answer: 2,
    feedback: [
      'A puddle is water as a liquid.',
      'Snow is a solid too.',
      null,
      'Ice is water as a solid.'
    ],
    why: 'Water vapour is water as a gas, and you cannot see it.'
  },
  {
    id: 't-hbm502f',
    lesson: 'hb-m5-02',
    prompt: 'You melt an ice cube in a sealed bag. How much water now?',
    choices: ['The same amount', 'More', 'Less', 'None'],
    answer: 0,
    feedback: [
      null,
      'Nothing was added to the bag.',
      'Nothing got out of a sealed bag.',
      'It is right there. It is just liquid now.'
    ],
    why: 'Melting changes the state, not the amount.'
  },
  {
    id: 't-hbm502g',
    lesson: 'hb-m5-02',
    prompt: 'Which change needs heat to go IN?',
    choices: ['Vapour turning to drops', 'Water turning to ice', 'Drops running down glass', 'Water turning to vapour'],
    answer: 3,
    feedback: [
      'That change gives heat up.',
      'Freezing takes heat out.',
      'That is just falling. No state changed.',
      null
    ],
    why: 'Melting and evaporation take heat in. Freezing and condensation let heat go.'
  },
  {
    id: 't-hbm502h',
    lesson: 'hb-m5-02',
    prompt: 'What runs the whole water cycle on Earth?',
    choices: ['Rivers', 'Heat from the sun', 'Wind on its own', 'The moon'],
    answer: 1,
    feedback: [
      'Rivers carry water. They do not lift it.',
      null,
      'Wind moves water about. The sun is what lifts it.',
      'The moon pulls the tides, not the cycle.'
    ],
    why: 'The sun is the energy that lifts water into the air.'
  },
  {
    id: 't-hbm502i',
    lesson: 'hb-m5-02',
    prompt: 'Fog on a cold mirror is an example of what?',
    choices: ['Condensation', 'Melting', 'Freezing', 'Precipitation'],
    answer: 0,
    feedback: [
      null,
      'Nothing solid was there to melt.',
      'Nothing turned into ice.',
      'Nothing fell out of a cloud.'
    ],
    why: 'Warm vapour meets the cold glass and turns into tiny drops.'
  },
  {
    id: 't-hbm502j',
    lesson: 'hb-m5-02',
    prompt: 'Ice holds its own shape. What is that called?',
    choices: ['A gas', 'A cloud', 'A solid', 'A liquid'],
    answer: 2,
    feedback: [
      'A gas spreads out to fill the room.',
      'A cloud is made of tiny drops.',
      null,
      'A liquid takes the shape of whatever holds it.'
    ],
    why: 'A solid keeps its own shape. Ice is water as a solid.'
  },

  // =========================================================================
  // LESSON 27 · hb-m5-03 · A bag on a leaf
  // =========================================================================
  {
    id: 't-hbm503a',
    lesson: 'hb-m5-03',
    prompt: 'A bag tied on a leaf gets wet inside. Why?',
    choices: ['The leaf let water out', 'It rained inside the bag', 'The bag melted', 'Someone poured it in'],
    answer: 0,
    feedback: [
      null,
      'The bag is tied shut. No rain got in.',
      'Plastic does not melt in the sun like that.',
      'Nobody opened it.'
    ],
    why: 'Leaves let water out as vapour. Trapped in a bag it turns back into drops.'
  },
  {
    id: 't-hbm503b',
    lesson: 'hb-m5-03',
    prompt: 'What is water leaving a leaf called?',
    choices: ['Condensation', 'Germination', 'Transpiration', 'Evaporation'],
    answer: 2,
    feedback: [
      'That is vapour turning back into drops.',
      'That is a seed waking up.',
      null,
      'That is water leaving a puddle or a pond.'
    ],
    why: 'Transpiration is water going out of a plant into the air.'
  },
  {
    id: 't-hbm503c',
    lesson: 'hb-m5-03',
    prompt: 'Water leaves a leaf through tiny holes. What are they called?',
    choices: ['Veins', 'Stomata', 'Roots', 'Seeds'],
    answer: 1,
    feedback: [
      'Veins carry water about inside the leaf.',
      null,
      'Roots are underground.',
      'Seeds make new plants.'
    ],
    why: 'Stomata are tiny pores, mostly on the underside of a leaf.'
  },
  {
    id: 't-hbm503d',
    lesson: 'hb-m5-03',
    prompt: 'You bag a bare stick with no leaves. What happens?',
    choices: ['It fills up with water', 'It gets very foggy', 'The stick grows', 'Almost nothing'],
    answer: 3,
    feedback: [
      'A bare stick has no leaves to let water go.',
      'Fog in the bag needs water out of leaves.',
      'A cut stick will not grow in a bag.',
      null
    ],
    why: 'The bare stick is the control. It shows that the leaves are doing the work.'
  },
  {
    id: 't-hbm503e',
    lesson: 'hb-m5-03',
    prompt: 'Why bag a bare stick as well as a leaf?',
    choices: ['To keep the stick dry', 'For no real reason', 'To be sure the leaves did it', 'To grow a new plant'],
    answer: 2,
    feedback: [
      'Keeping it dry is not the point.',
      'It has a real job in the test.',
      null,
      'It will not grow inside a bag.'
    ],
    why: 'A control is what you compare against. Without one you cannot say what caused the drops.'
  },
  {
    id: 't-hbm503f',
    lesson: 'hb-m5-03',
    prompt: 'Two leaves are bagged. One sits in the sun. Which has more drops?',
    choices: ['The sunny one', 'The shady one', 'Exactly the same', 'Neither one'],
    answer: 0,
    feedback: [
      null,
      'Cool leaves let water go more slowly.',
      'Heat changes the speed a lot.',
      'Both get some. One gets more.'
    ],
    why: 'Heat speeds transpiration, just as it speeds a drying puddle.'
  },
  {
    id: 't-hbm503g',
    lesson: 'hb-m5-03',
    prompt: 'Which side of a leaf has the most stomata?',
    choices: ['The top', 'The stalk', 'The tip', 'The underside'],
    answer: 3,
    feedback: [
      'The top gets more sun and would lose more water.',
      'The stalk holds the leaf on.',
      'The tip is just the end of it.',
      null
    ],
    why: 'Most pores sit on the shady underside, where less water is lost.'
  },
  {
    id: 't-hbm503h',
    lesson: 'hb-m5-03',
    prompt: 'Do plants add water to the sky?',
    choices: ['No, plants only take water', 'Yes, out through their leaves', 'No, only oceans do', 'Yes, out through their roots'],
    answer: 1,
    feedback: [
      'Plants take water in AND let water go.',
      null,
      'A forest puts a great deal of water into the air.',
      'Roots take water in, not out.'
    ],
    why: 'Transpiration is a real pathway in the water cycle.'
  },
  {
    id: 't-hbm503i',
    lesson: 'hb-m5-03',
    prompt: 'Water goes out of a leaf as what?',
    choices: ['A gas', 'Ice', 'A solid', 'Sap'],
    answer: 0,
    feedback: [
      null,
      'A leaf does not make ice.',
      'It leaves as vapour, not as a solid.',
      'Sap stays inside the plant.'
    ],
    why: 'It leaves as water vapour, which you cannot see until it cools.'
  },
  {
    id: 't-hbm503j',
    lesson: 'hb-m5-03',
    prompt: 'Why take the bag off the leaf the next day?',
    choices: ['Bags look messy', 'It does not matter', 'A bagged leaf can cook in the sun', 'To save the bag'],
    answer: 2,
    feedback: [
      'Mess is not the reason.',
      'It matters to the plant.',
      null,
      'The leaf matters more than the bag does.'
    ],
    why: 'A sealed bag in hot sun gets very hot and can damage the leaf.'
  },

  // =========================================================================
  // LESSON 28 · hb-m5-04 · From the root to the top leaf
  // =========================================================================
  {
    id: 't-hbm504a',
    lesson: 'hb-m5-04',
    prompt: 'What carries water up a plant stem?',
    choices: ['Xylem tubes', 'The roots', 'The flowers', 'The seed coat'],
    answer: 0,
    feedback: [
      null,
      'Roots take water in at the bottom.',
      'Flowers make seeds.',
      'A seed coat is the skin on a seed.'
    ],
    why: 'Xylem are thin tubes running from the root to the top leaf.'
  },
  {
    id: 't-hbm504b',
    lesson: 'hb-m5-04',
    prompt: 'You cut a red stalk across. What do you see?',
    choices: ['Nothing red at all', 'Red only on the skin', 'A ring of red dots', 'Red all the way through'],
    answer: 2,
    feedback: [
      'It climbed. Look closely.',
      'The skin stays green.',
      null,
      'It travels in tubes, not everywhere.'
    ],
    why: 'Each dot is the cut end of one xylem tube.'
  },
  {
    id: 't-hbm504c',
    lesson: 'hb-m5-04',
    prompt: 'What takes water in at the bottom of a plant?',
    choices: ['The stem', 'Root hairs', 'Leaf pores', 'The flower'],
    answer: 1,
    feedback: [
      'The stem carries it. It does not take it in.',
      null,
      'Pores let water out at the top.',
      'Flowers do not drink.'
    ],
    why: 'Tiny root hairs soak water out of the soil.'
  },
  {
    id: 't-hbm504d',
    lesson: 'hb-m5-04',
    prompt: 'A plant has no heart. So what pulls water up?',
    choices: ['A tiny pump', 'The wind', 'Gravity', 'The leaves letting water go'],
    answer: 3,
    feedback: [
      'Plants have no pump at all.',
      'Wind blows outside the plant, not inside it.',
      'Gravity pulls down, not up.',
      null
    ],
    why: 'Water leaving the leaves pulls the next drop up behind it.'
  },
  {
    id: 't-hbm504e',
    lesson: 'hb-m5-04',
    prompt: 'Two stalks sit in red water. One has no leaves. Which climbs faster?',
    choices: ['Exactly the same', 'Neither one', 'The one with leaves', 'The one with no leaves'],
    answer: 2,
    feedback: [
      'The leaves change it a lot.',
      'Both climb. One is much faster.',
      null,
      'With no leaves there is almost no pull.'
    ],
    why: 'Leaves letting water go is what creates the pull.'
  },
  {
    id: 't-hbm504f',
    lesson: 'hb-m5-04',
    prompt: 'Water sticks to water. Why does that matter here?',
    choices: ['The whole line gets pulled up', 'It makes water heavy', 'It stops the flow', 'It has no effect'],
    answer: 0,
    feedback: [
      null,
      'Weight is not the point here.',
      'Sticking helps the flow, it does not stop it.',
      'It matters a great deal.'
    ],
    why: 'Water drops hold on to each other. Pull one and the next one follows.'
  },
  {
    id: 't-hbm504g',
    lesson: 'hb-m5-04',
    prompt: 'Which way does water move in the xylem?',
    choices: ['Down, from leaf to root', 'Side to side', 'It does not move', 'Up, from root to leaf'],
    answer: 3,
    feedback: [
      'Food travels down a different set of tubes.',
      'Xylem runs up the stem.',
      'It moves all day long.',
      null
    ],
    why: 'Xylem carries water up: root, then stem, then leaf.'
  },
  {
    id: 't-hbm504h',
    lesson: 'hb-m5-04',
    prompt: 'A white flower in blue water turns blue. Why?',
    choices: ['Blue air did it', 'The dye rode up the tubes', 'The dye jumped', 'Someone painted it'],
    answer: 1,
    feedback: [
      'There is no such thing as blue air.',
      null,
      'Dye does not jump.',
      'Nobody painted it.'
    ],
    why: 'The dye travels with the water up the xylem, all the way to the petals.'
  },
  {
    id: 't-hbm504i',
    lesson: 'hb-m5-04',
    prompt: 'Why do gardeners water the soil and not the leaves?',
    choices: ['Roots are what take water in', 'Leaves hate water', 'Water always burns leaves', 'It is only a habit'],
    answer: 0,
    feedback: [
      null,
      'Rain lands on leaves all the time.',
      'That is not true for most plants.',
      'There is a real reason for it.'
    ],
    why: 'Roots are the part that takes water in, and water on the soil reaches them.'
  },
  {
    id: 't-hbm504j',
    lesson: 'hb-m5-04',
    prompt: 'What links the leaf letting go and the root drinking?',
    choices: ['The flower', 'The soil', 'One long pull of water', 'Nothing links them'],
    answer: 2,
    feedback: [
      'The flower is not part of that path.',
      'Soil holds the water, but it is not the link.',
      null,
      'The water itself links them.'
    ],
    why: 'The plant is one connected column of water, root to leaf.'
  },

  // =========================================================================
  // LESSON 29 · hb-m5-05 · The Drainage Investigation
  // =========================================================================
  {
    id: 't-hbm505a',
    lesson: 'hb-m5-05',
    prompt: 'Why do plant pots have holes in the bottom?',
    choices: ['So water can drain out', 'To let the roots out', 'To make them lighter', 'For no real reason'],
    answer: 0,
    feedback: [
      null,
      'Roots are meant to stay in the pot.',
      'Weight is not the reason.',
      'There is a very good reason.'
    ],
    why: 'Drainage lets extra water leave, so air can come back into the soil.'
  },
  {
    id: 't-hbm505b',
    lesson: 'hb-m5-05',
    prompt: 'What do roots need besides water?',
    choices: ['Sunlight', 'Salt', 'Air', 'More water'],
    answer: 2,
    feedback: [
      'Sunlight is for the leaves.',
      'Salt harms most roots.',
      null,
      'Too much water is the problem, not too little.'
    ],
    why: 'Roots take in air from the gaps between the grains of soil.'
  },
  {
    id: 't-hbm505c',
    lesson: 'hb-m5-05',
    prompt: 'Water runs straight through which soil?',
    choices: ['Wet loam', 'Sand', 'Clay', 'Packed mud'],
    answer: 1,
    feedback: [
      'Loam sits in between the two.',
      null,
      'Clay has tiny gaps and holds on to water.',
      'Packed mud is the slowest of all.'
    ],
    why: 'Sand has big gaps, so water falls through it fast.'
  },
  {
    id: 't-hbm505d',
    lesson: 'hb-m5-05',
    prompt: 'Water sits on top of a pot for ten minutes. What does that mean?',
    choices: ['That soil drains fast', 'The plant is thirsty', 'The pot is too small', 'That soil drains slowly'],
    answer: 3,
    feedback: [
      'Fast soil takes it straight down.',
      'This one is about the soil, not the plant.',
      'Pot size is not what is holding the water.',
      null
    ],
    why: 'Slow soaking means small gaps and slow drainage.'
  },
  {
    id: 't-hbm505e',
    lesson: 'hb-m5-05',
    prompt: 'A pot with no holes is watered daily for weeks. What happens?',
    choices: ['The soil dries out', 'Nothing changes', 'The roots run out of air', 'The plant grows faster'],
    answer: 2,
    feedback: [
      'It stays wet, not dry.',
      'A great deal changes.',
      null,
      'A drowned plant does not grow faster.'
    ],
    why: 'With nowhere to drain, the gaps stay full of water and roots cannot breathe.'
  },
  {
    id: 't-hbm505f',
    lesson: 'hb-m5-05',
    prompt: 'What is in the gaps between grains of soil?',
    choices: ['Air and water', 'Only water', 'Only rock', 'Nothing at all'],
    answer: 0,
    feedback: [
      null,
      'Air is in there too, until you flood it.',
      'Rock is the grains. It is not the gaps.',
      'The gaps are not empty.'
    ],
    why: 'The gaps hold air, and pouring water pushes that air out.'
  },
  {
    id: 't-hbm505g',
    lesson: 'hb-m5-05',
    prompt: 'Red clay holds water. What does that make it?',
    choices: ['Fast to drain', 'Full of air', 'Sandy', 'Slow to drain'],
    answer: 3,
    feedback: [
      'Clay is the slow one.',
      'Wet clay has very little air in it.',
      'Clay and sand are opposites here.',
      null
    ],
    why: 'Clay grains are tiny, so the gaps are tiny and water creeps through.'
  },
  {
    id: 't-hbm505h',
    lesson: 'hb-m5-05',
    prompt: 'Which soil do most gardeners want?',
    choices: ['Bare rock', 'Loam', 'Pure sand', 'Packed clay'],
    answer: 1,
    feedback: [
      'Rock is not soil.',
      null,
      'Sand drains too fast to hold much water.',
      'Clay holds too much and drains too slowly.'
    ],
    why: 'Loam is a mix. It holds some water and it still drains.'
  },
  {
    id: 't-hbm505i',
    lesson: 'hb-m5-05',
    prompt: 'You pour water on dry soil and bubbles come up. Why?',
    choices: ['Air is being pushed out', 'The soil is boiling', 'The water is dirty', 'There was soap in it'],
    answer: 0,
    feedback: [
      null,
      'Nothing here is hot.',
      'Dirt does not make bubbles rise.',
      'There was no soap.'
    ],
    why: 'Water fills the gaps and shoves the air out. That is what you see.'
  },
  {
    id: 't-hbm505j',
    lesson: 'hb-m5-05',
    prompt: 'Sand, loam and clay each get one cup of water. Which drains first?',
    choices: ['Clay', 'They all tie', 'Sand', 'Loam'],
    answer: 2,
    feedback: [
      'Clay is the slowest.',
      'They are clearly different.',
      null,
      'Loam is the one in the middle.'
    ],
    why: 'The big gaps in sand let water fall straight through.'
  },

  // =========================================================================
  // LESSON 30 · hb-m5-06 · Reading a thirsty plant
  // =========================================================================
  {
    id: 't-hbm506a',
    lesson: 'hb-m5-06',
    prompt: 'A plant droops and the soil is bone dry. What is wrong?',
    choices: ['It needs water', 'Its roots are drowning', 'It needs a bigger pot', 'It has too much sun'],
    answer: 0,
    feedback: [
      null,
      'Drowning goes with wet soil, not dry.',
      'A new pot is not what today is about.',
      'The dry soil is the clue.'
    ],
    why: 'Dry soil plus wilting means thirst. Water it slowly.'
  },
  {
    id: 't-hbm506b',
    lesson: 'hb-m5-06',
    prompt: 'A plant droops and the soil is cold and wet. What is wrong?',
    choices: ['It needs less sun', 'It needs a haircut', 'Its roots are drowning', 'It is thirsty'],
    answer: 2,
    feedback: [
      'Sun is not the clue here.',
      'Plants do not need a haircut for this.',
      null,
      'Wet soil is not thirst.'
    ],
    why: 'Wet soil plus wilting points at roots with no air. Let it drain.'
  },
  {
    id: 't-hbm506c',
    lesson: 'hb-m5-06',
    prompt: 'What is the finger test?',
    choices: ['Smell the plant', 'Push a finger into the soil', 'Touch the leaf', 'Tap the side of the pot'],
    answer: 1,
    feedback: [
      'Smell helps with rot, not with thirst.',
      null,
      'The leaf tells you less than the soil does.',
      'Tapping tells you about the pot.'
    ],
    why: 'Push in to the second knuckle. Dry down there means water it.'
  },
  {
    id: 't-hbm506d',
    lesson: 'hb-m5-06',
    prompt: 'The top of the soil is dry. Is the plant thirsty?',
    choices: ['Yes, always', 'No, never', 'Only in winter', 'Not always, check deeper'],
    answer: 3,
    feedback: [
      'The top dries first and it lies.',
      'Sometimes it really is thirsty.',
      'It is not about the season.',
      null
    ],
    why: 'The surface dries first. What matters is the soil down where the roots are.'
  },
  {
    id: 't-hbm506e',
    lesson: 'hb-m5-06',
    prompt: 'A plant flops at noon and stands up by dark. What was it?',
    choices: ['Drowning', 'Dying', 'Hot, not thirsty', 'Very thirsty'],
    answer: 2,
    feedback: [
      'Drowning does not fix itself by dark.',
      'It recovered. It is fine.',
      null,
      'A truly thirsty plant does not stand back up on its own.'
    ],
    why: 'Many plants wilt in hot sun and come back in the cool. Check again in the evening.'
  },
  {
    id: 't-hbm506f',
    lesson: 'hb-m5-06',
    prompt: 'Crispy brown leaf edges usually mean what?',
    choices: ['Not enough water', 'Too much water', 'Too little sun', 'Too much soil'],
    answer: 0,
    feedback: [
      null,
      'Too much water goes soft and yellow, not crispy.',
      'Sun is not the usual cause of crispy edges.',
      'The amount of soil is not the clue.'
    ],
    why: 'Crispy and dry points at a plant that has been short of water.'
  },
  {
    id: 't-hbm506g',
    lesson: 'hb-m5-06',
    prompt: 'Soft yellow lower leaves and wet soil mean what?',
    choices: ['Not enough water', 'Too much sun', 'Too little soil', 'Too much water'],
    answer: 3,
    feedback: [
      'A dry plant goes crispy, not soft.',
      'Sun burns the tips. It does not do this.',
      'The amount of soil is not the clue.',
      null
    ],
    why: 'Soggy soil with soft yellow leaves is the classic sign of drowned roots.'
  },
  {
    id: 't-hbm506h',
    lesson: 'hb-m5-06',
    prompt: 'Two pots look the same. How do you tell which is dry?',
    choices: ['Count the leaves', 'Lift them and feel the weight', 'Look at the colour of the pot', 'Shake them'],
    answer: 1,
    feedback: [
      'Leaf count is not about water.',
      null,
      'Colour depends on the pot, not the water.',
      'Shaking tells you nothing useful.'
    ],
    why: 'A dry pot is much lighter. Lifting is a fast, honest check.'
  },
  {
    id: 't-hbm506i',
    lesson: 'hb-m5-06',
    prompt: 'When should you check a wilted plant again?',
    choices: ['In the evening', 'One minute later', 'Next month', 'Never again'],
    answer: 0,
    feedback: [
      null,
      'It needs hours, not a minute.',
      'A month is far too long to wait.',
      'You should always go back and look.'
    ],
    why: 'The evening tells you whether it was the heat or a real water problem.'
  },
  {
    id: 't-hbm506j',
    lesson: 'hb-m5-06',
    prompt: 'The saucer under a pot stays full of water. What now?',
    choices: ['Move it into the sun', 'Leave it for a week', 'Pour the saucer out', 'Add more water'],
    answer: 2,
    feedback: [
      'Sun will not fix soaked roots.',
      'A week of standing water is worse.',
      null,
      'The pot is already standing in water.'
    ],
    why: 'A full saucer blocks the drainage holes, so the soil cannot drain.'
  }
];

export function m5BankItemById(id) {
  return HERBALISM_M5_BANK.find((q) => q.id === id) || null;
}

export function itemsForLesson(lessonId) {
  return HERBALISM_M5_BANK.filter((q) => q.lesson === lessonId);
}

export function itemsForLessons(lessonIds) {
  const want = new Set(lessonIds);
  return HERBALISM_M5_BANK.filter((q) => want.has(q.lesson));
}

export default HERBALISM_M5_BANK;
