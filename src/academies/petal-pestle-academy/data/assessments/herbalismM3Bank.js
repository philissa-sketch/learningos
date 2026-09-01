// ---------------------------------------------------------------------------
// HERBALISM & BOTANY — MODULE 3 QUESTION BANK
// THE GARDEN IS AN ECOSYSTEM · Quarter 1, Weeks 5 and 6 · S4L1 a-d
//
// Sixty questions. Ten for each of the six lessons, which is what the two
// weekly tests need: three lessons at ten is a thirty-question pool, an
// eight-question paper draws six from it, and a re-take can still be a
// genuinely different paper.
//
// THESE ARE NOT ASKED AT THE END OF THE LESSON. Inside the lesson she answers
// two Apply-Its and a three-question check, five in all. These sixty feed Day 4,
// the morning warm-up, the spaced-review boxes and the extra practice the
// practice gate serves after a poor check.
//
// ---- SHAPE, AND WHY IT IS RECONSTRUCTED RATHER THAN COPIED ----
//
// src/data/assessments/herbalismM1Bank.js IS NOT PRESENT IN THIS CHECKOUT, so
// this file is built against what scripts/check-assessment.mjs and
// src/lib/assessmentEngine.js actually require of a bank item, which they state
// unambiguously:
//
//   id        unique across the whole bank
//   lesson    must match a real lesson id
//   prompt    <= 11 words a sentence; <= 1 long word if under 12 words
//   choices   exactly 4, all different, none over 12 words
//   answer    0-3
//   feedback  exactly 4, NULL in the answer slot, a real sentence in the rest
//   why       required, shown on the review screen
//
// The id convention is inferred from the single literal in the check script,
// 't-hb101a'. Here that gives t-hbm3<lesson><letter> — t-hbm301a through
// t-hbm306j. If the real M1 bank numbers differently this needs a rename and
// nothing else.
//
// ---- THE DISTRACTOR RULE, APPLIED LITERALLY ----
//
// Where a question's payload is vocabulary, the three wrong choices are the
// OTHER WORDS FROM THAT LESSON. Ask which word means "only a few left" and the
// wrong answers are extinct, over-abundant and pollen — so a miss names the
// exact word that has not landed, and the Gradebook can say which one. No
// filler, and no obviously silly option to pad the four out.
//
// ---- READABILITY ----
//
// Same bar as the lessons: ~2.5. Every prompt was written short on purpose.
// NOTE: check-assessment.mjs will flag this module's subject vocabulary as
// "long words" until its SUBJECT set is extended — see judgement call 4 in the
// header of m3Lessons.js for the exact list to add. That is a checker update,
// not a rewrite of these questions: you cannot ask about decomposers in a word
// shorter than "decomposers", which is the same allowance already made for
// "endosperm".
//
// ---- SAFETY ----
//
// No dosing, no treatment, no "good for". Nothing in this module touches what a
// plant does to a body — it is who eats whom and where the energy goes. Two
// questions do carry the safety rule itself: t-hbm302g (what must stay out of
// the bin) and t-hbm306j (sit still, do not chase the bees).
// ---------------------------------------------------------------------------

export const HERBALISM_M3_BANK = [
  // =========================================================================
  // hb-m3-01 · Producers, consumers, decomposers · S4L1a
  // =========================================================================
  {
    id: 't-hbm301a',
    lesson: 'hb-m3-01',
    prompt: 'Which one makes its own food?',
    choices: ['A worm', 'Corn', 'A slug', 'A beetle'],
    answer: 1,
    feedback: [
      'A worm breaks dead stuff down. That is a decomposer.',
      null,
      'A slug eats living leaves. That is a consumer.',
      'A beetle eats other living things. That is a consumer too.'
    ],
    why: 'Only a producer makes its own food from sunlight. Corn is a producer.'
  },
  {
    id: 't-hbm301b',
    lesson: 'hb-m3-01',
    prompt: 'A worm eats dead leaves. What job is that?',
    choices: ['Producer', 'Consumer', 'Decomposer', 'No job at all'],
    answer: 2,
    feedback: [
      'A producer makes its own food. The worm eats.',
      'A consumer eats things that are alive. These leaves are dead.',
      null,
      'Every living thing in a garden has a job.'
    ],
    why: 'Eating dead things and breaking them down is what a decomposer does.'
  },
  {
    id: 't-hbm301c',
    lesson: 'hb-m3-01',
    prompt: 'What does a producer make food from?',
    choices: ['Sunlight', 'Soil', 'Water', 'Dead leaves'],
    answer: 0,
    feedback: [
      null,
      'Soil holds nutrients, but the food is not made from soil.',
      'Water is needed, but the food does not come from water.',
      'Dead leaves are what decomposers work on, not producers.'
    ],
    why: 'A producer catches sunlight and turns it into food. Nothing else can.'
  },
  {
    id: 't-hbm301d',
    lesson: 'hb-m3-01',
    prompt: 'A bug chews your garlic leaf. What is the bug doing?',
    choices: [
      'Making its own food',
      'Breaking down dead stuff',
      'Nothing at all',
      'Eating food that a plant made'
    ],
    answer: 3,
    feedback: [
      'Only a plant makes its own food here.',
      'The leaf is alive, not dead. That is not a decomposer.',
      'It is eating. That is a job.',
      null
    ],
    why: 'A consumer eats other living things. The garlic made that food first.'
  },
  {
    id: 't-hbm301e',
    lesson: 'hb-m3-01',
    prompt: 'Most decomposers hide. Where should you look?',
    choices: [
      'On the tallest leaves',
      'Under pots and down in the soil',
      'Up in the air',
      'On the open flowers'
    ],
    answer: 1,
    feedback: [
      'Leaf eaters are up there. Decomposers are not.',
      null,
      'Nothing is breaking down dead stuff in mid air.',
      'Flowers bring visitors that want food, not dead leaves.'
    ],
    why: 'Decomposers work on dead stuff, and dead stuff falls. Look down and underneath.'
  },
  {
    id: 't-hbm301f',
    lesson: 'hb-m3-01',
    prompt: 'Nothing broke dead leaves down. What runs out in the soil?',
    choices: ['Sunlight', 'Water', 'Nutrients', 'Air'],
    answer: 2,
    feedback: [
      'The sun keeps shining whatever happens in the soil.',
      'You water the pot yourself. That is not what stops.',
      null,
      'Air does not come out of a dead leaf.'
    ],
    why: 'Decomposers put nutrients back. Stop them and the soil slowly empties.'
  },
  {
    id: 't-hbm301g',
    lesson: 'hb-m3-01',
    prompt: 'Your corn feeds a bug. What feeds your corn?',
    choices: ['A bird', 'A worm', 'The bug', 'The sun'],
    answer: 3,
    feedback: [
      'A bird might eat the bug. It does not feed the corn.',
      'A worm puts nutrients back, but the food comes from light.',
      'The bug takes food from the corn. It gives none back.',
      null
    ],
    why: 'A producer feeds itself from sunlight. That is where every chain starts.'
  },
  {
    id: 't-hbm301h',
    lesson: 'hb-m3-01',
    prompt: 'A pot, its soil, its plant and its bugs. What is that?',
    choices: ['A small ecosystem', 'One decomposer', 'One producer', 'A pile of dirt'],
    answer: 0,
    feedback: [
      null,
      'A decomposer is one living thing, not a whole pot.',
      'The plant is the producer. The pot is more than that.',
      'It holds living things doing jobs. It is not just dirt.'
    ],
    why: 'An ecosystem is the living things in one place plus the soil, air and water.'
  },
  {
    id: 't-hbm301i',
    lesson: 'hb-m3-01',
    prompt: 'Which of these was never alive?',
    choices: ['A worm', 'A corn leaf', 'A stone in the pot', 'A slug'],
    answer: 2,
    feedback: [
      'A worm is alive and it has a job.',
      'A leaf is part of a living plant.',
      null,
      'A slug is alive. It eats leaves.'
    ],
    why: 'Decomposers only break down things that were once alive. A stone never was.'
  },
  {
    id: 't-hbm301j',
    lesson: 'hb-m3-01',
    prompt: 'A dead leaf falls in your pot. Who takes it apart?',
    choices: ['The roots', 'Decomposers', 'The sun', 'Producers'],
    answer: 1,
    feedback: [
      'Roots pull nutrients up after the work is done.',
      null,
      'The sun dries it. It does not break it down.',
      'A producer makes food. It does not eat a dead leaf.'
    ],
    why: 'Decomposers break dead things into nutrients the soil can hold.'
  },

  // =========================================================================
  // hb-m3-02 · Build the compost bin · S4L1a
  // =========================================================================
  {
    id: 't-hbm302a',
    lesson: 'hb-m3-02',
    prompt: 'Which one will NOT break down in a compost bin?',
    choices: ['An apple core', 'Dry leaves', 'A plastic fork', 'Used tea leaves'],
    answer: 2,
    feedback: [
      'An apple was alive once, so it can be taken apart.',
      'Leaves were part of a living plant. They break down well.',
      null,
      'Tea leaves were leaves. They break down fast.'
    ],
    why: 'Decomposers only break down what was once alive. Plastic never was.'
  },
  {
    id: 't-hbm302b',
    lesson: 'hb-m3-02',
    prompt: 'Why does a compost bin need holes in it?',
    choices: ['To let air in', 'To look nice', 'To keep worms out', 'To let the rain in'],
    answer: 0,
    feedback: [
      null,
      'Nobody drills twenty holes to make a tub prettier.',
      'You want worms in there. They are doing the work.',
      'Too much water is what makes a bin go slimy.'
    ],
    why: 'Decomposers need air. Shut the air out and the bin goes slow and slimy.'
  },
  {
    id: 't-hbm302c',
    lesson: 'hb-m3-02',
    prompt: 'What do decomposers put back into the soil?',
    choices: ['Seeds', 'Nutrients', 'Sunlight', 'Air'],
    answer: 1,
    feedback: [
      'A few seeds may survive, but that is not the job.',
      null,
      'Sunlight comes from the sun. Nothing puts it in soil.',
      'Air gets in through the holes. It is not made in there.'
    ],
    why: 'Nutrients are what a decomposer hands back, and roots pull them up again.'
  },
  {
    id: 't-hbm302d',
    lesson: 'hb-m3-02',
    prompt: 'You put one shovel of garden soil in. Why?',
    choices: [
      'To make the bin heavier',
      'To add water to it',
      'It brings the decomposers in',
      'To keep the smell down'
    ],
    answer: 2,
    feedback: [
      'Weight does nothing for a compost bin.',
      'Soil is not how you water a bin. A jug is.',
      null,
      'The smell tells you how the bin is doing. Do not hide it.'
    ],
    why: 'Garden soil is already full of bacteria and fungi. You are moving them in.'
  },
  {
    id: 't-hbm302e',
    lesson: 'hb-m3-02',
    prompt: 'Gigi packed her bin tight. It went slimy. What was missing?',
    choices: ['Water', 'Air', 'Scraps', 'Nutrients'],
    answer: 1,
    feedback: [
      'A slimy bin has too much water, not too little.',
      null,
      'The scraps were there. They are what went slimy.',
      'Nutrients come out of a bin. They are not put in.'
    ],
    why: 'Packing a bin tight shuts the air out, and decomposers cannot work without it.'
  },
  {
    id: 't-hbm302f',
    lesson: 'hb-m3-02',
    prompt: 'Twice as much brown as green. What do the browns do?',
    choices: [
      'Let air through the pile',
      'Feed the bin fastest',
      'Add the water',
      'Add the nutrients'
    ],
    answer: 0,
    feedback: [
      null,
      'The wet greens are the fast food. Browns are slower.',
      'Browns are dry. Water comes from the jug and the greens.',
      'Nutrients are what comes out at the end, not what goes in.'
    ],
    why: 'Dry brown stuff holds the pile open so air can move through it.'
  },
  {
    id: 't-hbm302g',
    lesson: 'hb-m3-02',
    prompt: 'Which of these must stay OUT of the bin?',
    choices: ['A banana peel', 'Dry leaves', 'A chicken bone', 'Used tea leaves'],
    answer: 2,
    feedback: [
      'Peel is a green scrap. It goes in.',
      'Dry leaves are the browns. They go in.',
      null,
      'Tea leaves go in. They break down quickly.'
    ],
    why: 'Meat, bones, milk and oil bring rats. That is the rule for this bin.'
  },
  {
    id: 't-hbm302h',
    lesson: 'hb-m3-02',
    prompt: 'The middle of the bin has gone warm. Why?',
    choices: [
      'Sunlight on the lid',
      'The plastic is melting',
      'The water is heating up',
      'Decomposers are hard at work'
    ],
    answer: 3,
    feedback: [
      'The bin stands in the shade. The lid is not hot.',
      'Nothing in a compost bin gets near that hot.',
      'Warm water does not appear on its own.',
      null
    ],
    why: 'A working bin makes its own heat. Feeling it is how you know it started.'
  },
  {
    id: 't-hbm302i',
    lesson: 'hb-m3-02',
    prompt: 'Finished compost goes on your pots. What is it giving them?',
    choices: ['Nutrients', 'Energy', 'Sunlight', 'Seeds'],
    answer: 0,
    feedback: [
      null,
      'Energy comes from the sun, and only a producer can catch it.',
      'Sunlight cannot be carried in a bucket.',
      'A bin is not for growing seeds. It is for feeding soil.'
    ],
    why: 'Compost is nutrients. The roots pull them up and the plant grows on them.'
  },
  {
    id: 't-hbm302j',
    lesson: 'hb-m3-02',
    prompt: 'Leaves fall in a forest yearly. Why is it not piled high?',
    choices: [
      'The wind blows them away',
      'Decomposers break them down',
      'Animals eat all of them',
      'Trees pull them back up'
    ],
    answer: 1,
    feedback: [
      'Wind moves leaves about. It does not make them vanish.',
      null,
      'Some get eaten. Not nearly all of them.',
      'A tree cannot take a fallen leaf back.'
    ],
    why: 'The forest floor is one huge compost bin, running all the time.'
  },

  // =========================================================================
  // hb-m3-03 · The food web starts at the sun · S4L1b
  // =========================================================================
  {
    id: 't-hbm303a',
    lesson: 'hb-m3-03',
    prompt: 'Where does every food chain start?',
    choices: ['At the soil', 'At the worm', 'At the sun', 'At the bird'],
    answer: 2,
    feedback: [
      'Soil holds nutrients. It does not hold the energy.',
      'A worm is at the end of a chain, not the start.',
      null,
      'A bird is near the top. Nothing starts there.'
    ],
    why: 'A food chain is energy moving, and all of it starts as sunlight.'
  },
  {
    id: 't-hbm303b',
    lesson: 'hb-m3-03',
    prompt: 'Sun, corn, bug, bird. Which one is the producer?',
    choices: ['The corn', 'The sun', 'The bug', 'The bird'],
    answer: 0,
    feedback: [
      null,
      'The sun gives the energy, but it is not alive.',
      'The bug eats the corn. That makes it a consumer.',
      'The bird eats the bug. Also a consumer.'
    ],
    why: 'A producer is the living thing that catches the sunlight first.'
  },
  {
    id: 't-hbm303c',
    lesson: 'hb-m3-03',
    prompt: 'A food chain is a picture of what moving?',
    choices: ['Water', 'Energy', 'Soil', 'Seeds'],
    answer: 1,
    feedback: [
      'Water matters, but a food chain is not about water.',
      null,
      'Soil stays where it is. The chain does not carry it.',
      'Seeds travel, but that is a different lesson.'
    ],
    why: 'A food chain is a model of energy moving from one living thing to the next.'
  },
  {
    id: 't-hbm303d',
    lesson: 'hb-m3-03',
    prompt: 'You shut your corn in a dark closet. What stops first?',
    choices: [
      'The corn drinking water',
      'The soil holding nutrients',
      'The corn making food',
      'The bugs breathing'
    ],
    answer: 2,
    feedback: [
      'Roots pull water up in the dark just fine.',
      'The soil does not care about the light.',
      null,
      'They breathe fine. They just run out of food later.'
    ],
    why: 'Cut the light and the producer stops first. Everything above it follows.'
  },
  {
    id: 't-hbm303e',
    lesson: 'hb-m3-03',
    prompt: 'Which link in a food chain is not alive?',
    choices: ['The plant', 'The bug', 'The bird', 'The sun'],
    answer: 3,
    feedback: [
      'A plant is alive. It is the producer.',
      'A bug is alive. It is a consumer.',
      'A bird is alive. It is a consumer too.',
      null
    ],
    why: 'The sun is on the chain because the energy starts there. It is not living.'
  },
  {
    id: 't-hbm303f',
    lesson: 'hb-m3-03',
    prompt: 'Grass, rabbit, hawk. Which one eats a plant?',
    choices: ['The rabbit', 'The grass', 'The hawk', 'None of them'],
    answer: 0,
    feedback: [
      null,
      'Grass IS the plant. It makes its own food.',
      'A hawk eats the rabbit, not the grass.',
      'One of them eats grass. Look again.'
    ],
    why: 'The rabbit is the first consumer. It takes the energy straight from the producer.'
  },
  {
    id: 't-hbm303g',
    lesson: 'hb-m3-03',
    prompt: 'Which one can use sunlight to make food?',
    choices: ['A bird', 'A worm', 'A slug', 'A plant'],
    answer: 3,
    feedback: [
      'A bird has to eat. It cannot use light as food.',
      'A worm eats dead stuff in the dark.',
      'A slug eats leaves that a plant already made.',
      null
    ],
    why: 'Only producers use sunlight directly. Everything else has to eat.'
  },
  {
    id: 't-hbm303h',
    lesson: 'hb-m3-03',
    prompt: 'A bug ate a corn leaf. Where did that food start?',
    choices: ['In the sunlight', 'In the soil', 'In the bug', 'In the water'],
    answer: 0,
    feedback: [
      null,
      'Soil gave nutrients. The food itself was built from light.',
      'The bug got it from the leaf. It did not start there.',
      'Water helped, but the energy came from the sun.'
    ],
    why: 'Follow any food backwards far enough and you always land on sunlight.'
  },
  {
    id: 't-hbm303i',
    lesson: 'hb-m3-03',
    prompt: 'Sun, corn, bug, bird. How many links are alive?',
    choices: ['Four', 'Three', 'Two', 'One'],
    answer: 1,
    feedback: [
      'Four links, but one of them is the sun.',
      null,
      'Corn, bug and bird are all living.',
      'Only one is not alive, not three.'
    ],
    why: 'Corn, bug and bird are alive. The sun is a link but it is not living.'
  },
  {
    id: 't-hbm303j',
    lesson: 'hb-m3-03',
    prompt: 'The sun goes out. What happens to the food chain?',
    choices: [
      'Only the plants stop',
      'Only the birds stop',
      'Nothing stops',
      'The whole chain stops'
    ],
    answer: 3,
    feedback: [
      'The plants stop first, but they are not the only ones.',
      'The birds go last, not first.',
      'Everything on the chain runs on that energy.',
      null
    ],
    why: 'Every link gets its energy from the sun in the end. Cut it and all of it stops.'
  },

  // =========================================================================
  // hb-m3-04 · Draw your bucket's food web · S4L1b
  // =========================================================================
  {
    id: 't-hbm304a',
    lesson: 'hb-m3-04',
    prompt: 'What does an arrow in a food web mean?',
    choices: ['Runs away from', 'Gives its energy to', 'Lives next to', 'Is bigger than'],
    answer: 1,
    feedback: [
      'A web is not about running. It is about energy.',
      null,
      'They may live near each other. The arrow says more.',
      'Size is not what an arrow shows.'
    ],
    why: 'The arrow follows the energy. It points from the food to the eater.'
  },
  {
    id: 't-hbm304b',
    lesson: 'hb-m3-04',
    prompt: 'A bird eats bugs off two plants. What does that make?',
    choices: ['Two chains that cross', 'One long chain', 'Two gardens', 'No chain'],
    answer: 0,
    feedback: [
      null,
      'It is not longer. It is on two chains at once.',
      'It is one garden. The bird just eats twice.',
      'It eats, so it is on a chain. On two, in fact.'
    ],
    why: 'One eater on two foods makes two chains, and crossing chains are a web.'
  },
  {
    id: 't-hbm304c',
    lesson: 'hb-m3-04',
    prompt: 'Corn and a bug. Which way does the arrow point?',
    choices: ['Bug to corn', 'Both ways', 'Corn to bug', 'Neither way'],
    answer: 2,
    feedback: [
      'That is the way the mouth goes, not the way the energy goes.',
      'Energy only travels one way here.',
      null,
      'One of them gives energy to the other. There is an arrow.'
    ],
    why: 'The corn gives and the bug gets, so the arrow runs from corn to bug.'
  },
  {
    id: 't-hbm304d',
    lesson: 'hb-m3-04',
    prompt: 'What is a food web made of?',
    choices: [
      'Only producers',
      'Only decomposers',
      'One long food chain',
      'Lots of food chains at once'
    ],
    answer: 3,
    feedback: [
      'Producers are only the start of it.',
      'Decomposers are the end of it, not all of it.',
      'One chain is a chain. A web is many.',
      null
    ],
    why: 'A web is every chain in one place, drawn together and crossing.'
  },
  {
    id: 't-hbm304e',
    lesson: 'hb-m3-04',
    prompt: 'On your web, what points at the decomposers?',
    choices: ['Almost everything', 'Only the corn', 'Only the birds', 'Nothing does'],
    answer: 0,
    feedback: [
      null,
      'Everything dies in the end, not only the corn.',
      'Birds too, but so does everything else.',
      'Then they would have nothing to break down.'
    ],
    why: 'Everything on the web dies sooner or later, and all of it goes to the decomposers.'
  },
  {
    id: 't-hbm304f',
    lesson: 'hb-m3-04',
    prompt: 'Your sun has four arrows leaving it. Why four?',
    choices: ['Four is the rule', 'You drew it wrong', 'You have four plants', 'You have four bugs'],
    answer: 2,
    feedback: [
      'There is no rule about four. It depends on the garden.',
      'Four is right for four buckets.',
      null,
      'Bugs do not take energy from the sun directly.'
    ],
    why: 'The sun feeds every producer, so it needs one arrow to each of her four plants.'
  },
  {
    id: 't-hbm304g',
    lesson: 'hb-m3-04',
    prompt: 'A web is drawn crossing, not in a line. Why?',
    choices: [
      'It looks better that way',
      'Lines are too hard to draw',
      'There is no reason',
      'Eaters eat more than one thing'
    ],
    answer: 3,
    feedback: [
      'How it looks is not the reason.',
      'A line is easy. It is just not true.',
      'There is a real reason, and it is about eating.',
      null
    ],
    why: 'Hardly anything eats only one food, so the chains cannot stay in tidy lines.'
  },
  {
    id: 't-hbm304h',
    lesson: 'hb-m3-04',
    prompt: 'You drew an arrow from a bird to a bug. What is wrong?',
    choices: [
      'It points the wrong way',
      'Birds do not eat bugs',
      'Birds are producers',
      'Nothing is wrong'
    ],
    answer: 0,
    feedback: [
      null,
      'They do eat bugs. That part is right.',
      'A bird eats. Only plants are producers here.',
      'It is backwards. The bug gives and the bird gets.'
    ],
    why: 'The bug is the food, so the arrow has to start at the bug.'
  },
  {
    id: 't-hbm304i',
    lesson: 'hb-m3-04',
    prompt: 'One arrow goes from decomposers back up to plants. Why?',
    choices: [
      'Plants eat decomposers',
      'Nutrients go back to the roots',
      'Decomposers need light',
      'It was a mistake'
    ],
    answer: 1,
    feedback: [
      'A plant does not eat anything. It makes its own food.',
      null,
      'They work in the dark under pots. Light is not it.',
      'It belongs there. It is what closes the loop.'
    ],
    why: 'Decomposers hand nutrients back to the soil, and the roots take them up again.'
  },
  {
    id: 't-hbm304j',
    lesson: 'hb-m3-04',
    prompt: 'Is a web stronger or weaker than one chain?',
    choices: ['Weaker, it is messy', 'Exactly the same', 'Stronger, it has other ways', 'Neither one'],
    answer: 2,
    feedback: [
      'Messy on paper is not the same as weak.',
      'A web has spare routes. A single chain has none.',
      null,
      'One of them handles a loss better than the other.'
    ],
    why: 'Lose one link in a chain and it breaks. In a web there is often another route.'
  },

  // =========================================================================
  // hb-m3-05 · Change one thing — what follows · S4L1c
  // =========================================================================
  {
    id: 't-hbm305a',
    lesson: 'hb-m3-05',
    prompt: 'Why do you change only one thing in a test?',
    choices: [
      'So it is quicker',
      'So the plant lives',
      'So the sheet looks tidy',
      'So you know what caused it'
    ],
    answer: 3,
    feedback: [
      'It takes the same ten days either way.',
      'Both pots are meant to survive it.',
      'Tidy is not the point of a test.',
      null
    ],
    why: 'Change one thing and the difference has only one thing it can have come from.'
  },
  {
    id: 't-hbm305b',
    lesson: 'hb-m3-05',
    prompt: 'You shaded a pot and watered it less. What can you say?',
    choices: ['The shade did it', 'Nothing for sure', 'The water did it', 'Both did half each'],
    answer: 1,
    feedback: [
      'Maybe. But the water changed too, so you cannot be sure.',
      null,
      'Maybe. But the light changed too. Same trouble.',
      'That is a guess. The test cannot split it.'
    ],
    why: 'Two changes at once and the test can never tell you which one did the work.'
  },
  {
    id: 't-hbm305c',
    lesson: 'hb-m3-05',
    prompt: 'Why write down what you think before you look?',
    choices: [
      'So you cannot change it later',
      'So the plant grows faster',
      'So Gigi can mark it',
      'So the test is quicker'
    ],
    answer: 0,
    feedback: [
      null,
      'Writing does nothing at all to the plant.',
      'Nothing here is marked. A wrong guess is fine.',
      'It takes ten days whatever you wrote.'
    ],
    why: 'A guess written down afterwards is not a guess. It is just the answer.'
  },
  {
    id: 't-hbm305d',
    lesson: 'hb-m3-05',
    prompt: 'Pot A is left alone. What is pot A for?',
    choices: [
      'To grow the best plant',
      'To hold spare soil',
      'To compare pot B against',
      'Nothing at all'
    ],
    answer: 2,
    feedback: [
      'It is not a contest. It is a measuring stick.',
      'It has a whole plant in it, not spare soil.',
      null,
      'Without it you would have nothing to compare to.'
    ],
    why: 'The pot you do not touch is what tells you the other pot changed at all.'
  },
  {
    id: 't-hbm305e',
    lesson: 'hb-m3-05',
    prompt: 'The monkeys leave a forest. What happens to the seeds?',
    choices: ['They grow faster', 'They get bigger', 'Nothing happens', 'They stop getting scattered'],
    answer: 3,
    feedback: [
      'Speed is not what the monkeys were doing.',
      'Size is not it either.',
      'The monkeys had a job. Losing them changes something.',
      null
    ],
    why: 'The monkeys ate fruit and dropped seeds all over. No monkeys, no scattering.'
  },
  {
    id: 't-hbm305f',
    lesson: 'hb-m3-05',
    prompt: 'Every bug is gone from your garden. Who feels it next?',
    choices: ['The birds that ate them', 'The sun', 'The soil', 'Nobody'],
    answer: 0,
    feedback: [
      null,
      'The sun is not part of the garden and does not change.',
      'The soil is not eating the bugs.',
      'Something was eating those bugs. It notices.'
    ],
    why: 'The change travels up the arrow. It does not stop where it started.'
  },
  {
    id: 't-hbm305g',
    lesson: 'hb-m3-05',
    prompt: 'It is day six and nothing has changed. What now?',
    choices: [
      'Stop the test today',
      'Keep going and keep measuring',
      'Say the test failed',
      'Change a second thing'
    ],
    answer: 1,
    feedback: [
      'Six days is not long for a plant.',
      null,
      'No change is a real result. It is not a failure.',
      'Now you would have two changes and no answer at all.'
    ],
    why: 'A slow result is still a result. Changing a second thing would ruin the test.'
  },
  {
    id: 't-hbm305h',
    lesson: 'hb-m3-05',
    prompt: 'You guessed wrong. What should you write down?',
    choices: ['What you hoped for', 'Nothing at all', 'A better guess instead', 'What really happened'],
    answer: 3,
    feedback: [
      'Hoping is not what a record is for.',
      'A blank page tells nobody anything.',
      'Swapping the guess afterwards hides what you learned.',
      null
    ],
    why: 'A wrong guess and a true record is good science. It is worth the same petals.'
  },
  {
    id: 't-hbm305i',
    lesson: 'hb-m3-05',
    prompt: 'A change in one place travels along what?',
    choices: ['The roots only', 'The arrows of the web', 'The soil only', 'Nothing at all'],
    answer: 1,
    feedback: [
      'Roots are one part of it. The change goes further.',
      null,
      'Soil carries nutrients, not the whole change.',
      'It travels. That is the whole idea.'
    ],
    why: 'Every arrow is a route, and a change follows the routes to things you never touched.'
  },
  {
    id: 't-hbm305j',
    lesson: 'hb-m3-05',
    prompt: 'You measure both pots at the same time daily. Why?',
    choices: [
      'So the time is not a second change',
      'So you do not forget',
      'So it is quicker',
      'So the plants like it'
    ],
    answer: 0,
    feedback: [
      null,
      'Forgetting is a worry, but it is not the reason.',
      'It takes the same few minutes whenever you do it.',
      'A plant does not mind when you look at it.'
    ],
    why: 'Measuring at different times would sneak in a change you never meant to make.'
  },

  // =========================================================================
  // hb-m3-06 · When the pollinators stop coming · S4L1d
  // =========================================================================
  {
    id: 't-hbm306a',
    lesson: 'hb-m3-06',
    prompt: 'What does a pollinator do for a flower?',
    choices: ['Waters it', 'Gives it energy', 'Moves pollen to it', 'Breaks down its leaves'],
    answer: 2,
    feedback: [
      'Rain and a watering can do that. Not a bee.',
      'Energy comes from the sun, not from a visitor.',
      null,
      'That is a decomposer, and it happens after the leaf dies.'
    ],
    why: 'A flower cannot make a seed until pollen is carried to it.'
  },
  {
    id: 't-hbm306b',
    lesson: 'hb-m3-06',
    prompt: 'A squash flowered all summer but grew no squash. Why?',
    choices: [
      'No pollen was moved to it',
      'It had no leaves at all',
      'It got no water',
      'Squash grows from the roots'
    ],
    answer: 0,
    feedback: [
      null,
      'It flowered, so it had leaves and it was healthy.',
      'A dry plant does not flower all summer.',
      'The squash grows from the flower, once pollen has moved.'
    ],
    why: 'Flowers with no visitors make no seed and no fruit. The plant did its part.'
  },
  {
    id: 't-hbm306c',
    lesson: 'hb-m3-06',
    prompt: 'Slugs went from a few to hundreds. Which word fits?',
    choices: ['Scarce', 'Extinct', 'Over-abundant', 'Pollen'],
    answer: 2,
    feedback: [
      'Scarce means hardly any are left. There are hundreds.',
      'Extinct means none left anywhere, ever again.',
      null,
      'Pollen is dust from a flower, not a number of animals.'
    ],
    why: 'Over-abundant means far too many, and that empties a web as fast as too few.'
  },
  {
    id: 't-hbm306d',
    lesson: 'hb-m3-06',
    prompt: 'Only a few are left. Which word is that?',
    choices: ['Over-abundant', 'Scarce', 'Extinct', 'Pollen'],
    answer: 1,
    feedback: [
      'Over-abundant means far too many, not a few.',
      null,
      'Extinct means none at all, not a few.',
      'Pollen is the dust a flower makes.'
    ],
    why: 'Scarce means only a few are left. A scarce animal can still come back.'
  },
  {
    id: 't-hbm306e',
    lesson: 'hb-m3-06',
    prompt: 'None are left anywhere, ever again. Which word is that?',
    choices: ['Scarce', 'Over-abundant', 'Pollen', 'Extinct'],
    answer: 3,
    feedback: [
      'Scarce means a few are still hanging on.',
      'Over-abundant means far too many.',
      'Pollen is the dust a flower makes.',
      null
    ],
    why: 'Extinct means gone for good. Those arrows on the web never work again.'
  },
  {
    id: 't-hbm306f',
    lesson: 'hb-m3-06',
    prompt: 'Bees go scarce in your garden. What happens to seeds?',
    choices: ['More seeds get made', 'Fewer seeds get made', 'Seeds get bigger', 'Nothing changes'],
    answer: 1,
    feedback: [
      'Fewer visits means less pollen moved, not more.',
      null,
      'Size is not what changes. The number is.',
      'Seeds need pollen moved, so fewer bees means fewer seeds.'
    ],
    why: 'Fewer pollinators means fewer flowers get their pollen, so fewer seeds form.'
  },
  {
    id: 't-hbm306g',
    lesson: 'hb-m3-06',
    prompt: 'You counted for ten minutes once. Is that enough?',
    choices: [
      'Yes, ten minutes is plenty',
      'Yes, if you counted well',
      'No, one count is a small look',
      'No, you must count all day'
    ],
    answer: 2,
    feedback: [
      'One short count on one day is not much to go on.',
      'Counting well still only tells you about ten minutes.',
      null,
      'All day is not needed. More days would be better than more hours.'
    ],
    why: 'One count is a start. Counting again on other days is what makes it solid.'
  },
  {
    id: 't-hbm306h',
    lesson: 'hb-m3-06',
    prompt: 'Your count and a printed count differ. Why might that be?',
    choices: [
      'One of them must be wrong',
      'Counts are always the same',
      'You can never tell',
      'Different gardens and different days'
    ],
    answer: 3,
    feedback: [
      'Both can be right. They counted different places.',
      'Two honest counts are hardly ever the same.',
      'You can say quite a lot. Start with where and when.',
      null
    ],
    why: 'Two true counts can differ because the place, the day and the weather differ.'
  },
  {
    id: 't-hbm306i',
    lesson: 'hb-m3-06',
    prompt: 'The plants are fine but the bees are gone. What is lost?',
    choices: ['The seeds they would have made', 'The leaves', 'The roots', 'The soil'],
    answer: 0,
    feedback: [
      null,
      'The leaves are still on the plant. It looks healthy.',
      'The roots are untouched.',
      'The soil has not changed at all.'
    ],
    why: 'A healthy plant with no visitors still makes no seed. The next crop is what goes.'
  },
  {
    id: 't-hbm306j',
    lesson: 'hb-m3-06',
    prompt: 'Why do you sit still while you count bees?',
    choices: [
      'So you do not get tired',
      'So visitors are not scared off',
      'So the timer works',
      'So the flowers open'
    ],
    answer: 1,
    feedback: [
      'Ten minutes is not tiring.',
      null,
      'A timer runs whether you move or not.',
      'Flowers open with the sun, not with you.'
    ],
    why: 'Move about and you chase them off, so you count fewer than are really there. Sitting still is also how you avoid a sting.'
  }
];

/** Every question for one lesson. */
export function itemsForLesson(lessonId) {
  return HERBALISM_M3_BANK.filter((q) => q.lesson === lessonId);
}

/** Every question across a list of lessons — what the weekly test draws from. */
export function itemsForLessons(lessonIds) {
  const set = new Set(lessonIds || []);
  return HERBALISM_M3_BANK.filter((q) => set.has(q.lesson));
}

export function m3BankItemById(id) {
  return HERBALISM_M3_BANK.find((q) => q.id === id) || null;
}

export default HERBALISM_M3_BANK;
