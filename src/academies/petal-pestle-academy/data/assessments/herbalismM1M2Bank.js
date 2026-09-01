// ---------------------------------------------------------------------------
// HERBALISM — THE QUESTION BANK FOR THE FIVE NEW MODULE 1 AND MODULE 2 LESSONS.
//
// Written against /home/claude/pp/src/data/assessments/herbalismM1Bank.js, which
// is the reference. Same object shape, same id convention, same rules.
//
//   HERBALISM_M1_NEW_BANK   30 questions
//     hb-m1-02   t-hbm102a … t-hbm102j
//     hb-m1-04   t-hbm104a … t-hbm104j
//     hb-m1-05   t-hbm105a … t-hbm105j
//
//   HERBALISM_M2_NEW_BANK   20 questions
//     hb-m2-03   t-hbm203a … t-hbm203j
//     hb-m2-06   t-hbm206a … t-hbm206j
//
// ---- WHY TEN PER LESSON, AND WHY THEY ARE NOT AT THE END OF THE LESSON ----
//
// Unchanged from the reference bank, and it is worth not re-deciding. Lamar's
// app carries ten test questions per lesson. Hers is 45 minutes with a
// 20-minute activity away from the screen in the middle of it, so ten at the
// end would measure tiredness. The ten live here instead. Three lessons at ten
// is a thirty-question pool and Friday's weekly test draws eight from it.
//
// Inside the lesson she answers five: two Apply-Its in the beats and a
// three-question check. Two of those five arrive while the teaching is warm.
//
// ---- WEEK POOLS, SO NOBODY HAS TO WORK THEM OUT AGAIN ----
//
//   Week 1  hb-m1-01 + hb-m1-02 + hb-m1-03     (01 and 03 live elsewhere)
//   Week 2  hb-m1-04 + hb-m1-05 + hb-m1-06     (06 lives elsewhere)
//   Week 3  hb-m2-01 + hb-m2-02 + hb-m2-03     (01 and 02 live elsewhere)
//   Week 4  hb-m2-04 + hb-m2-05 + hb-m2-06     (04 and 05 live elsewhere)
//
// This file supplies 10 of the 30 for weeks 1, 3 and 4, and 20 of the 30 for
// week 2. Nothing here depends on the questions written for the other lessons.
//
// ---- THE WRITING RULES ----
//
//  * Reading level ~2.5. Her reading is the constraint, not her age. The
//    subject words — pollination, perennial, rhizome, hydroponics, fibrous,
//    humus, decomposer — are exempt from the long-word count for the same
//    reason photosynthesis is.
//  * WHERE THE PAYLOAD IS VOCABULARY, EVERY WRONG CHOICE IS ONE OF THE OTHER
//    WORDS FROM THAT LESSON. So a guess is a real guess, and a miss names the
//    exact word that has not landed. No filler distractors anywhere.
//  * Every wrong choice gets its own sentence saying why it is wrong.
//  * The right answer moves around.
//  * NO DOSING. Garlic, ginger and turmeric appear repeatedly and not one
//    question says what any of them is for. Three questions test the opposite:
//    t-hbm104f, t-hbm105j and t-hbm206j.
//
// ---- ONE THING TO KNOW ABOUT t-hbm102d ----
//
// It hands her a straight-line drawing and asks what is wrong with it. That is
// the only question in the pool where the stem contains the mistake rather than
// the choices, and it is deliberate: a life cycle drawn as a row is the single
// misconception this whole module is built to prevent, because a cycle with an
// end makes pollination senseless when Module 6 asks why a flower bothers.
// ---------------------------------------------------------------------------

export const HERBALISM_M1_NEW_BANK = [
  // ------------------- L2 · The circle — seed to seed -------------------
  {
    id: 't-hbm102a',
    lesson: 'hb-m1-02',
    prompt: 'What is a seedling?',
    choices: [
      'A young plant that just came out of its seed',
      'A plant big enough to make a flower',
      'The part that holds the seeds',
      'A seed that is still asleep'
    ],
    answer: 0,
    feedback: [
      null,
      'That is an adult plant.',
      'That is the fruit.',
      'That one is dormant. It has not started yet.'
    ],
    why: 'A seedling has a root, a shoot and its first leaves. It is stage two.'
  },
  {
    id: 't-hbm102b',
    lesson: 'hb-m1-02',
    prompt: 'Put these in order: fruit, seedling, flower, seed.',
    choices: [
      'Seed, seedling, flower, fruit',
      'Seed, flower, seedling, fruit',
      'Seedling, seed, fruit, flower',
      'Flower, fruit, seed, seedling'
    ],
    answer: 0,
    feedback: [
      null,
      'A flower needs a grown plant first. A seedling is not grown.',
      'A seed comes before a seedling, not after.',
      'You can start anywhere on a ring, but those steps are out of order.'
    ],
    why: 'Seed, seedling, adult plant, flower, fruit, and seeds again.'
  },
  {
    id: 't-hbm102c',
    lesson: 'hb-m1-02',
    prompt: 'Where are the seeds for the next plant?',
    choices: ['In the roots', 'In the stem', 'In the first leaves', 'Inside the fruit'],
    answer: 3,
    feedback: [
      'Roots hold the plant down and drink.',
      'The stem holds the plant up.',
      'The first leaves start making food.',
      null
    ],
    why: 'Fruit grows around seeds. Pull a kernel off a corn cob and you are holding one.'
  },
  {
    id: 't-hbm102d',
    lesson: 'hb-m1-02',
    prompt: 'Gigi draws the life cycle in a straight line. Seed on the left, fruit on the right. What is wrong with it?',
    choices: [
      'Nothing. That is how it works',
      'The seed should be on the right',
      'The fruit holds seeds. The line gives them nowhere to go',
      'She left out the roots'
    ],
    answer: 2,
    feedback: [
      'Then the plant would stop forever. It does not.',
      'Which end it starts at is not the problem. Having an end is.',
      null,
      'Roots are not one of the stages.'
    ],
    why: 'The last stage makes the first stage. So we draw it as a ring.'
  },
  {
    id: 't-hbm102e',
    lesson: 'hb-m1-02',
    prompt: 'What must happen to a flower before fruit can grow?',
    choices: ['Germination', 'Pollination', 'It has to die back', 'It has to be watered'],
    answer: 1,
    feedback: [
      'Germination is a seed waking up. That was stage one.',
      null,
      'Dying back happens at the end of a season.',
      'Water helps, but water alone makes no seeds.'
    ],
    why: 'A flower must be pollinated first. Then it can make fruit with seeds inside.'
  },
  {
    id: 't-hbm102f',
    lesson: 'hb-m1-02',
    prompt: 'Your corn plant dries up and dies. Is the life cycle finished?',
    choices: [
      'Yes. That plant is dead',
      'Yes, unless somebody waters it',
      'No. The very same plant will come back',
      'No. Its seeds can start the ring again'
    ],
    answer: 3,
    feedback: [
      'That plant is finished. The cycle is not one plant.',
      'Water will not wake a dead corn stalk.',
      'Corn does not come back. Its seed does.',
      null
    ],
    why: 'One plant ends. The cycle keeps going through its seeds.'
  },
  {
    id: 't-hbm102g',
    lesson: 'hb-m1-02',
    prompt: 'Which word means the stages that go round and round?',
    choices: ['Life cycle', 'Seedling', 'Pollination', 'Fruit'],
    answer: 0,
    feedback: [
      null,
      'A seedling is one stage, not all of them.',
      'Pollination is one step near the end.',
      'Fruit is one stage. It holds the seeds.'
    ],
    why: 'Life cycle is the name for the whole ring.'
  },
  {
    id: 't-hbm102h',
    lesson: 'hb-m1-02',
    prompt: 'Bag 3 sat in a dark closet and still grew. What does that tell you?',
    choices: [
      'The closet had light after all',
      'A seed carries its own food. It does not need light',
      'Dark is better than light for plants',
      'That bean was already a seedling on Day 1'
    ],
    answer: 1,
    feedback: [
      'The door stayed shut. You checked.',
      null,
      'It came out pale. That is not better.',
      'It was a dry bean. You put it in yourself.'
    ],
    why: 'The endosperm gets it started. Light matters once the lunch runs out.'
  },
  {
    id: 't-hbm102i',
    lesson: 'hb-m1-02',
    prompt: 'You find a green plant in the garden with no flower yet. What stage is it?',
    choices: ['A seedling or a young adult plant', 'A seed', 'A fruit', 'It is finished'],
    answer: 0,
    feedback: [
      null,
      'A seed has no leaves. This one is green and growing.',
      'Fruit comes after a flower, and there is no flower yet.',
      'It is still growing. Nothing is finished.'
    ],
    why: 'No flower yet just means it has not got that far round the ring.'
  },
  {
    id: 't-hbm102j',
    lesson: 'hb-m1-02',
    prompt: 'One kernel of corn falls off the cob into the dirt. What can it start?',
    choices: [
      'Nothing. Kernels are food only',
      'The whole life cycle, all over again',
      'Just a flower',
      'Just a root, and then it stops'
    ],
    answer: 1,
    feedback: [
      'A kernel is a seed. Plant one and watch.',
      null,
      'A flower comes much later, after a whole plant grows.',
      'The root is first. The rest follows it.'
    ],
    why: 'One seed can run the entire ring again. That is what makes it a ring.'
  },

  // ------------------- L4 · Annuals and perennials -------------------
  {
    id: 't-hbm104a',
    lesson: 'hb-m1-04',
    prompt: 'What is an annual?',
    choices: [
      'A plant that comes back every year',
      'A fat underground bud',
      'A root that creeps sideways',
      'A plant that lives one year, makes seed, and dies'
    ],
    answer: 3,
    feedback: [
      'That is a perennial.',
      'That is a bulb.',
      'That is a rhizome.',
      null
    ],
    why: 'An annual goes round the ring once. It leaves seed and nothing else.'
  },
  {
    id: 't-hbm104b',
    lesson: 'hb-m1-04',
    prompt: 'Which of your four containers is a true annual?',
    choices: ['Garlic', 'Ginger', 'Corn', 'Turmeric'],
    answer: 2,
    feedback: [
      'Garlic is a perennial we grow like an annual.',
      'Ginger comes back from its rhizome.',
      null,
      'Turmeric comes back from its rhizome too.'
    ],
    why: 'Corn dries up and dies. Only its kernels are left.'
  },
  {
    id: 't-hbm104c',
    lesson: 'hb-m1-04',
    prompt: 'A perennial dies back in winter. What part is still alive?',
    choices: [
      'The leaves',
      'The flowers',
      'The roots, bulb or rhizome under the soil',
      'Nothing. It starts again from seed'
    ],
    answer: 2,
    feedback: [
      'The leaves are the part that died back.',
      'Flowers are long gone by winter.',
      null,
      'That is what an annual does.'
    ],
    why: 'Die back means the top dies and the underground part waits.'
  },
  {
    id: 't-hbm104d',
    lesson: 'hb-m1-04',
    prompt: 'Garlic is a perennial. So why do we plant it each year?',
    choices: [
      'Because garlic seed blows away',
      'Because we dig up the whole bulb to harvest it',
      'Because garlic cannot survive a frost',
      'Because garlic only lives one year'
    ],
    answer: 1,
    feedback: [
      'Garlic is grown from cloves, not from seed.',
      null,
      'Garlic handles cold fine. That is not the reason.',
      'It is a perennial. It could live for years.'
    ],
    why: 'A perennial only comes back if the living part stays in the dirt.'
  },
  {
    id: 't-hbm104e',
    lesson: 'hb-m1-04',
    prompt: 'Your ginger pot is outside and a hard frost is coming tonight. What should you do?',
    choices: [
      'Nothing. Perennials are fine in winter',
      'Water it a lot before dark',
      'Bring the pot indoors',
      'Cut the leaves off and leave it out'
    ],
    answer: 2,
    feedback: [
      'Perennial does not mean frost-proof.',
      'Water will not stop a freeze. It may make it worse.',
      null,
      'The rhizome still freezes in a pot outdoors.'
    ],
    why: 'Ginger comes back every year, but only if the frost does not reach it.'
  },
  {
    id: 't-hbm104f',
    lesson: 'hb-m1-04',
    prompt: 'You dug up a garlic bulb and you know its name. Can you taste it?',
    choices: [
      'Yes. You grew it, so it is yours',
      'Yes, if it smells like garlic',
      'Only if you wash it first',
      'No. Ask a grown-up first, every time'
    ],
    answer: 3,
    feedback: [
      'Growing a plant is not the same as knowing it is safe.',
      'A smell tells you nothing about safety.',
      'Washing is a good idea. It is not the rule.',
      null
    ],
    why: 'The first rule of the field. A plant you can name is still a plant you ask about.'
  },
  {
    id: 't-hbm104g',
    lesson: 'hb-m1-04',
    prompt: 'What is a rhizome?',
    choices: [
      'A fat root that creeps sideways under the soil',
      'A fat underground bud made of layers',
      'A seed with a very hard coat',
      'The first root out of a seed'
    ],
    answer: 0,
    feedback: [
      null,
      'That is a bulb. Garlic is one.',
      'That is just a seed.',
      'That root comes out at germination.'
    ],
    why: 'Ginger and turmeric are both rhizomes. That is the part that survives winter.'
  },
  {
    id: 't-hbm104h',
    lesson: 'hb-m1-04',
    prompt: 'One plant leaves only seed behind. Another leaves a living bulb. Which is the annual?',
    choices: [
      'The one that left a bulb',
      'The one that left only seed',
      'Both of them',
      'Neither of them'
    ],
    answer: 1,
    feedback: [
      'A living bulb underground means it can come back.',
      null,
      'They did two different things. Only one is an annual.',
      'One of them is. Read what each left behind.'
    ],
    why: 'Seed only means starting over. A living part underground means coming back.'
  },
  {
    id: 't-hbm104i',
    lesson: 'hb-m1-04',
    prompt: 'A big oak tree is a hundred years old. What is it?',
    choices: ['A perennial', 'An annual', 'A bulb', 'A rhizome'],
    answer: 0,
    feedback: [
      null,
      'An annual gets one year. This one has had a hundred.',
      'A bulb is an underground part, not a whole tree.',
      'A rhizome is an underground part too.'
    ],
    why: 'Perennial just means it keeps coming back. Some do it for centuries.'
  },
  {
    id: 't-hbm104j',
    lesson: 'hb-m1-04',
    prompt: 'How many times does an annual go round the life cycle?',
    choices: ['Once', 'Twice', 'Every year for years', 'It never finishes'],
    answer: 0,
    feedback: [
      null,
      'It does not get a second turn. It dies after making seed.',
      'That is a perennial.',
      'It finishes. It makes seed and then it dies.'
    ],
    why: 'One trip round for an annual. Its seeds take the next trip.'
  },

  // ------------------- L5 · What a plant needs -------------------
  {
    id: 't-hbm105a',
    lesson: 'hb-m1-05',
    prompt: 'Which one is NOT on the list of plant needs?',
    choices: ['Water', 'Light', 'Air', 'Soil'],
    answer: 3,
    feedback: [
      'Every plant needs water.',
      'Leaves need light to make food.',
      'Leaves and roots both need air.',
      null
    ],
    why: 'Soil is the usual way a plant gets what it needs. It is not the need itself.'
  },
  {
    id: 't-hbm105b',
    lesson: 'hb-m1-05',
    prompt: 'What are nutrients?',
    choices: [
      'Tiny bits of food a plant drinks up through its roots',
      'The light a plant uses to make food',
      'Growing plants in water instead of soil',
      'Something to hold a plant up'
    ],
    answer: 0,
    feedback: [
      null,
      'That is sunlight.',
      'That is hydroponics.',
      'That is support.'
    ],
    why: 'Nutrients come in with the water. Soil normally holds them.'
  },
  {
    id: 't-hbm105c',
    lesson: 'hb-m1-05',
    prompt: 'What three jobs does soil do for a plant?',
    choices: [
      'Makes food, makes seeds, makes flowers',
      'Gives light, gives warmth, gives air',
      'Kills weeds, kills bugs, holds water',
      'Holds water, holds the plant up, holds nutrients'
    ],
    answer: 3,
    feedback: [
      'The plant does all three of those itself.',
      'Soil gives no light at all.',
      'Soil does not kill anything.',
      null
    ],
    why: 'Take the soil away and somebody has to do those three jobs by hand.'
  },
  {
    id: 't-hbm105d',
    lesson: 'hb-m1-05',
    prompt: 'What is hydroponics?',
    choices: [
      'Growing plants in water instead of soil',
      'Growing plants in the dark',
      'Growing plants without any water',
      'Growing plants from cuttings'
    ],
    answer: 0,
    feedback: [
      null,
      'Plants still need light. Dark is not a method.',
      'Water is the one thing hydroponics has plenty of.',
      'That is a different way to start a plant.'
    ],
    why: 'The roots sit in water. Nutrients get added to that water.'
  },
  {
    id: 't-hbm105e',
    lesson: 'hb-m1-05',
    prompt: 'Lettuce grows in a jar of plain water, then stops and turns yellow. What is missing?',
    choices: ['Light', 'Air', 'Nutrients', 'Support'],
    answer: 2,
    feedback: [
      'It is on the windowsill. Light is not the problem.',
      'There is air on the leaves and in the water.',
      null,
      'A jar holds a small plant up fine.'
    ],
    why: 'Plain water is not food. In a jar you have to add the nutrients yourself.'
  },
  {
    id: 't-hbm105f',
    lesson: 'hb-m1-05',
    prompt: 'Why did the seedling in the closet grow tall and pale?',
    choices: [
      'It got too much water',
      'It stretched looking for light and could not make green',
      'The closet was too cold',
      'It was a different kind of plant'
    ],
    answer: 1,
    feedback: [
      'Both pots got the same water. That was the rule.',
      null,
      'The closet is the same temperature as the room.',
      'They were the same kind and the same size on day one.'
    ],
    why: 'A plant in the dark reaches for light. Green needs light to be made.'
  },
  {
    id: 't-hbm105g',
    lesson: 'hb-m1-05',
    prompt: 'In your two-pot test, why did you change only ONE thing?',
    choices: [
      'To save time',
      'Because two pots is all we had',
      'So you know which change caused the difference',
      'Because plants only like one change at a time'
    ],
    answer: 2,
    feedback: [
      'It does not save any time. It takes the same two weeks.',
      'We could have used four. That is not the reason.',
      null,
      'Plants do not know how many things you changed.'
    ],
    why: 'Change two things and you cannot tell which one did it. Your bean bags worked the same way.'
  },
  {
    id: 't-hbm105h',
    lesson: 'hb-m1-05',
    prompt: 'A plant in a sealed jar of soil with no air holes wilts. What ran out?',
    choices: ['Light', 'Air', 'Soil', 'Support'],
    answer: 1,
    feedback: [
      'Glass lets light through.',
      null,
      'The soil is all still in there.',
      'The jar holds it up fine.'
    ],
    why: 'Air is on the list, at the leaves and down at the roots.'
  },
  {
    id: 't-hbm105i',
    lesson: 'hb-m1-05',
    prompt: 'What does support mean, for a plant?',
    choices: [
      'Food the roots drink',
      'Something to hold the plant up so it does not fall over',
      'The light it grows towards',
      'The water in the soil'
    ],
    answer: 1,
    feedback: [
      'Those are nutrients.',
      null,
      'That is sunlight.',
      'That is water.'
    ],
    why: 'Soil usually does the holding. In a jar, the jar does it.'
  },
  {
    id: 't-hbm105j',
    lesson: 'hb-m1-05',
    prompt: 'Your onion in the jar has grown new green tops. Can you taste them?',
    choices: [
      'Yes. You grew them yourself',
      'Yes, if the water looks clean',
      'No. Ask a grown-up first, every time',
      'Only if you rinse them'
    ],
    answer: 2,
    feedback: [
      'Growing a plant is not the same as knowing it is safe.',
      'Clean-looking water tells you nothing.',
      null,
      'Rinsing is sensible. It is not the rule.'
    ],
    why: 'Same rule every time, in the garden and at the sink. Ask first.'
  }
];

export const HERBALISM_M2_NEW_BANK = [
  // ------------------- L9 · The Root Race -------------------
  {
    id: 't-hbm203a',
    lesson: 'hb-m2-03',
    prompt: 'What is a taproot?',
    choices: [
      'Many thin roots spread out wide',
      'One thick root going straight down',
      'Tiny hairs that soak up water',
      'A root that creeps sideways'
    ],
    answer: 1,
    feedback: [
      'Those are fibrous roots.',
      null,
      'Those are root hairs.',
      'That is a rhizome, from Module 1.'
    ],
    why: 'A carrot is a taproot. Small roots branch off the big one.'
  },
  {
    id: 't-hbm203b',
    lesson: 'hb-m2-03',
    prompt: 'Which plant has fibrous roots?',
    choices: ['A carrot', 'A dandelion', 'A beet', 'Grass'],
    answer: 3,
    feedback: [
      'A carrot is one fat taproot. You eat it.',
      'A dandelion has a deep taproot. That is why it is hard to pull.',
      'A beet is a taproot too.',
      null
    ],
    why: 'Grass roots are a wide mat of thin roots near the surface.'
  },
  {
    id: 't-hbm203c',
    lesson: 'hb-m2-03',
    prompt: 'What do root hairs mostly do?',
    choices: [
      'Absorb water and nutrients',
      'Anchor the plant in the ground',
      'Store food for winter',
      'Make food from sunlight'
    ],
    answer: 0,
    feedback: [
      null,
      'The whole root system does the anchoring.',
      'A thick taproot does the storing.',
      'Leaves do that, not roots.'
    ],
    why: 'Root hairs are tiny and there are millions. They do most of the drinking.'
  },
  {
    id: 't-hbm203d',
    lesson: 'hb-m2-03',
    prompt: 'You pull two weeds. One comes up whole with a fat pale root. Which shape was it?',
    choices: ['Fibrous roots', 'A taproot', 'Root hairs only', 'It had no roots'],
    answer: 1,
    feedback: [
      'A mat of thin roots grips in many places and tears.',
      null,
      'Root hairs are far too small to see on their own.',
      'It came up with a root in your hand.'
    ],
    why: 'One thick root pulls out in one piece. A mat of thin ones snaps.'
  },
  {
    id: 't-hbm203e',
    lesson: 'hb-m2-03',
    prompt: 'Why do we eat carrots, beets and turnips?',
    choices: [
      'They are stems full of water',
      'They are fibrous roots that grow fast',
      'They are seeds that swelled up',
      'They are taproots packed with stored food'
    ],
    answer: 3,
    feedback: [
      'They grow under the ground. Stems are above it.',
      'Fibrous roots are thin. There is nothing to eat.',
      'They are roots, not seeds.',
      null
    ],
    why: 'A taproot stores food for later. We eat the store.'
  },
  {
    id: 't-hbm203f',
    lesson: 'hb-m2-03',
    prompt: 'No rain for two weeks. Then a shower wets only the top inch of soil. Who drinks first?',
    choices: [
      'The dandelion, because its root is longest',
      'Nobody. One inch is not enough',
      'The grass, because its roots are already up there',
      'Both at exactly the same speed'
    ],
    answer: 2,
    feedback: [
      'Its root is deep. The water never reached most of it.',
      'One inch of wet soil is plenty for shallow roots.',
      null,
      'Their roots sit at different depths. Depth decides it.'
    ],
    why: 'Fibrous roots sit right where a light rain lands.'
  },
  {
    id: 't-hbm203g',
    lesson: 'hb-m2-03',
    prompt: 'A hillside is washing away in heavy rain. Which root shape holds the soil best?',
    choices: [
      'One deep taproot',
      'A wide mat of fibrous roots',
      'Neither. Roots do not hold soil',
      'Whichever root is longest'
    ],
    answer: 1,
    feedback: [
      'It goes deep in one spot. Deep is not the same as wide.',
      null,
      'Holding soil down is one of the two big root jobs.',
      'Length is not spread.'
    ],
    why: 'A wide mat grips a lot of soil at once, like a net.'
  },
  {
    id: 't-hbm203h',
    lesson: 'hb-m2-03',
    prompt: 'What does anchor mean?',
    choices: [
      'To hold something down so it cannot be pulled over',
      'To soak something up',
      'To keep food for later',
      'To grow straight down'
    ],
    answer: 0,
    feedback: [
      null,
      'That is absorb.',
      'That is store.',
      'That is what a taproot does, but it is not the word.'
    ],
    why: 'Roots anchor a plant. That is why wind does not take it away.'
  },
  {
    id: 't-hbm203i',
    lesson: 'hb-m2-03',
    prompt: 'In the Root Race, one cup had the deepest root and a different cup had the most roots. What does that show?',
    choices: [
      'One cup was watered wrong',
      'Deep and wide are two different plans, and both work',
      'The measuring was wrong',
      'One of those seeds is better than the other'
    ],
    answer: 1,
    feedback: [
      'All four got the same water. That was the rule.',
      null,
      'You measured them both the same way, on the same days.',
      'Neither is better. They do different jobs.'
    ],
    why: 'Root shape is a plan. There is no single best root.'
  },
  {
    id: 't-hbm203j',
    lesson: 'hb-m2-03',
    prompt: 'Seeds from a seed packet are left over after the Root Race. Can you eat them?',
    choices: [
      'Yes, they are just seeds',
      'Yes, if you rinse them',
      'No. Seeds for planting are not food. Ask a grown-up',
      'Only the corn ones'
    ],
    answer: 2,
    feedback: [
      'Planting seed is often treated. It is not sold as food.',
      'Rinsing does not remove a seed treatment.',
      null,
      'Corn seed for planting is treated too.'
    ],
    why: 'Same rule as always. Never taste a plant or a seed without a grown-up.'
  },

  // ------------------- L12 · Soil is alive -------------------
  {
    id: 't-hbm206a',
    lesson: 'hb-m2-06',
    prompt: 'What is humus?',
    choices: [
      'Tiny bits of ground-up rock',
      'Dead plants broken all the way down',
      'The top layer of the soil',
      'A living thing that breaks dead stuff down'
    ],
    answer: 1,
    feedback: [
      'Those are the minerals.',
      null,
      'That is topsoil.',
      'That is a decomposer.'
    ],
    why: 'Humus is the dark crumbly part. It was alive once.'
  },
  {
    id: 't-hbm206b',
    lesson: 'hb-m2-06',
    prompt: 'What is soil made of?',
    choices: [
      'Only ground-up rock',
      'Only dead plants',
      'Sand and water, nothing else',
      'Rock bits, humus, water, air and living things'
    ],
    answer: 3,
    feedback: [
      'Rock is only one of the five.',
      'Dead plants are one part of it. There are four more.',
      'That leaves out the living part entirely.',
      null
    ],
    why: 'Five things in one handful. Only one of them is rock.'
  },
  {
    id: 't-hbm206c',
    lesson: 'hb-m2-06',
    prompt: 'What does a decomposer do?',
    choices: [
      'Makes food from sunlight',
      'Breaks dead plants and animals down into humus',
      'Holds soil together with its roots',
      'Grinds rock into tiny bits'
    ],
    answer: 1,
    feedback: [
      'That is a plant, using its leaves.',
      null,
      'Roots do that, and roots are not decomposers.',
      'Weather and time do that, over hundreds of years.'
    ],
    why: 'Worms, bugs, fungi and bacteria are all decomposers.'
  },
  {
    id: 't-hbm206d',
    lesson: 'hb-m2-06',
    prompt: 'You pack the soil down hard. The plant does badly. Why?',
    choices: [
      'You squeezed the air out and the roots cannot breathe',
      'Packing makes soil too dry',
      'Packing kills the minerals',
      'Plants just like loose soil for no real reason'
    ],
    answer: 0,
    feedback: [
      null,
      'Packed wet soil is still wet. It is the gaps that went.',
      'Rock bits are not alive. They cannot be killed.',
      'There is a real reason, and it is about air.'
    ],
    why: 'Roots need the air in the gaps. Packing closes the gaps.'
  },
  {
    id: 't-hbm206e',
    lesson: 'hb-m2-06',
    prompt: 'Which of these will decomposers in the soil NOT break down?',
    choices: ['An apple core', 'Fallen leaves', 'A dead worm', 'A plastic fork'],
    answer: 3,
    feedback: [
      'Gone in weeks. It was alive once.',
      'That is exactly what happened under the oak tree.',
      'It was alive, so it breaks down like anything else.',
      null
    ],
    why: 'Decomposers only break down things that were once alive.'
  },
  {
    id: 't-hbm206f',
    lesson: 'hb-m2-06',
    prompt: 'A whole tree of leaves fell last fall and nobody raked them. They are gone. Where did they go?',
    choices: [
      'The wind blew all of them away',
      'Decomposers ate them and turned them into humus',
      'They dried up into nothing at all',
      'They sank down into the ground whole'
    ],
    answer: 1,
    feedback: [
      'Wind moves some leaves. It does not clear a whole tree.',
      null,
      'Things cannot dry into nothing. The stuff has to go somewhere.',
      'Dig and look. There are no whole leaves down there.'
    ],
    why: 'They were eaten bit by bit. They are the dark crumbly soil now.'
  },
  {
    id: 't-hbm206g',
    lesson: 'hb-m2-06',
    prompt: 'What is topsoil?',
    choices: [
      'The top layer, where almost everything lives and grows',
      'Humus you make on purpose out of scraps',
      'Ground-up rock with no life in it',
      'The water held between soil bits'
    ],
    answer: 0,
    feedback: [
      null,
      'That is compost.',
      'Those are minerals.',
      'That is just the water in the soil.'
    ],
    why: 'Topsoil takes about five hundred years to build one inch.'
  },
  {
    id: 't-hbm206h',
    lesson: 'hb-m2-06',
    prompt: 'You shake soil and water in a jar and let it settle. What sinks first?',
    choices: [
      'The humus',
      'The clay',
      'The sand, because it is heaviest',
      'Nothing sinks. It all floats'
    ],
    answer: 2,
    feedback: [
      'Humus is light. It floats on the top.',
      'Clay is the finest. It settles last.',
      null,
      'Give it a few hours and you will see layers.'
    ],
    why: 'Heaviest first. Sand, then silt, then clay, with humus floating.'
  },
  {
    id: 't-hbm206i',
    lesson: 'hb-m2-06',
    prompt: 'Which of these belongs in the compost scrap tub?',
    choices: ['Apple peel and carrot tops', 'A plastic bag', 'A metal spoon', 'A glass jar'],
    answer: 0,
    feedback: [
      null,
      'Nothing in the soil can eat plastic.',
      'Metal is not food for a decomposer.',
      'Glass never breaks down. It only breaks.'
    ],
    why: 'Decomposers eat what was alive. That is the whole rule of the tub.'
  },
  {
    id: 't-hbm206j',
    lesson: 'hb-m2-06',
    prompt: 'You dug up soil and found a worm and some roots. What do you do next?',
    choices: [
      'Taste a bit of the root to identify it',
      'Keep the worm in your pocket',
      'Put every living thing back and wash your hands',
      'Leave the hole open so more can get in'
    ],
    answer: 2,
    feedback: [
      'Never. Ask a grown-up before anything goes near your mouth.',
      'A worm needs damp soil. A pocket is not that.',
      null,
      'Fill the hole back in. It was somebody\'s home.'
    ],
    why: 'You are a visitor down there. Put it back, fill it in, wash your hands.'
  }
];

export default { HERBALISM_M1_NEW_BANK, HERBALISM_M2_NEW_BANK };
