// ---------------------------------------------------------------------------
// HERBALISM & BOTANY — QUESTION BANK FOR THE SIX NEW LESSONS
//
//   HERBALISM_M4_NEW_BANK   hb-m4-04, hb-m4-05, hb-m4-06   Q1 · Week 8
//   HERBALISM_M8_NEW_BANK   hb-m8-04, hb-m8-05, hb-m8-06   Q2 · Week 8
//
// Sixty questions, ten per lesson. Three lessons at ten is a thirty-question
// pool, and Friday's weekly test draws eight from it — so a re-take is a
// genuinely different paper and spaced review has something to pull from.
//
// THESE ARE NOT ASKED AT THE END OF THE LESSON. Inside the lesson she answers
// five: two Apply-Its in the beats and a three-question check. These sixty are
// for Day 4, the morning warm-up, the spaced-review boxes and the extra
// practice the practice gate serves after a poor check.
//
// ---- SHAPE ----
//
// Copied from src/data/assessments/herbalismM1Bank.js, which was read before
// any of this was written:
//
//   id        unique across the whole bank
//   lesson    the lesson id it belongs to
//   prompt    one short question
//   choices   exactly four
//   answer    0-3
//   feedback  exactly four, NULL in the answer slot, a real sentence in the rest
//   why       shown on the review screen
//
// The id convention follows the M1 bank's own literals — t-hbm101a through
// t-hbm101j — so these are t-hbm404a..j, t-hbm405a..j, t-hbm406a..j and
// t-hbm804a..j, t-hbm805a..j, t-hbm806a..j.
//
// ---- THE DISTRACTOR RULE, APPLIED LITERALLY ----
//
// Where a question's payload is vocabulary, the three wrong choices are the
// OTHER WORDS FROM THAT LESSON. Ask what latex is and the wrong answers are
// trichome, thorn and the waxy skin — so a miss names the exact word that has
// not landed instead of telling you only that she guessed. No filler and no
// silly fourth option to pad it out.
//
// ---- READABILITY ----
//
// ~2.5, same bar as the lessons. Every prompt was held to ONE subject word so
// the long-word rule in check-assessment.mjs is not tripped twice in a
// sentence. The SUBJECT set still needs extending for these two modules — the
// exact list is in the header of m4m8Lessons.js.
//
// ---- SAFETY ----
//
// NO DOSING ANYWHERE. Module 4 is armour, smell and direction of growth — what
// a plant does about insects, never what a plant does to a person. Module 8 is
// method. Five questions carry the safety rules themselves rather than gesture
// at them:
//
//   t-hbm404e  shiny leaves in threes — point, do not touch
//   t-hbm405e  she crushed it and it smells great; she still cannot taste it
//   t-hbm804g  nothing from the yard goes in the tea jar
//   t-hbm804h  solar tea is a drink she made, and the wrong answers say plainly
//              what it is not
//   t-hbm806j  the one kind of claim we never test in this course
// ---------------------------------------------------------------------------

export const HERBALISM_M4_NEW_BANK = [
  // =========================================================================
  // hb-m4-04 · Thorns, fuzz and thick skin
  // =========================================================================
  {
    id: 't-hbm404a',
    lesson: 'hb-m4-04',
    prompt: 'What is an adaptation?',
    choices: [
      'A body part that helps a plant survive',
      'A tiny hair on a leaf',
      'Thick white goo from a stem',
      'A sharp point on a stem'
    ],
    answer: 0,
    feedback: [
      null,
      'That is a trichome. It is one kind of adaptation.',
      'That is latex. Also one kind.',
      'That is a thorn. Also one kind.'
    ],
    why: 'Adaptation is the big word. Thorns, hairs and goo are all examples of it.'
  },
  {
    id: 't-hbm404b',
    lesson: 'hb-m4-04',
    prompt: 'What is latex?',
    choices: [
      'The tiny hairs on a leaf',
      'A smooth coat on a leaf',
      'A sharp point on a stem',
      'Thick white goo from a broken stem'
    ],
    answer: 3,
    feedback: [
      'Those are trichomes.',
      'That is the waxy skin.',
      'That is a thorn.',
      null
    ],
    why: 'Latex oozes out when a stem breaks. It gums up an insect mouth.'
  },
  {
    id: 't-hbm404c',
    lesson: 'hb-m4-04',
    prompt: 'A drop of water beads up on a leaf. What does that show?',
    choices: ['It has trichomes', 'It is full of latex', 'It has a waxy skin', 'It has spines'],
    answer: 2,
    feedback: [
      'Hairs would hold the drop up in a mess, not a neat bead.',
      'Latex comes out when you break it. Nothing was broken.',
      null,
      'A spine is sharp. You can see there are none.'
    ],
    why: 'Wax keeps water out. It makes the leaf harder to bite too.'
  },
  {
    id: 't-hbm404d',
    lesson: 'hb-m4-04',
    prompt: 'Why can a plant not run from an animal?',
    choices: ['It is too slow', 'It is asleep', 'It is rooted in one spot', 'It cannot see'],
    answer: 2,
    feedback: [
      'It is not slow. It cannot move at all.',
      'Dormant is a seed word. This plant is growing.',
      null,
      'Seeing would not help. It still could not leave.'
    ],
    why: 'Stuck in one spot means the defence has to be built into the body.'
  },
  {
    id: 't-hbm404e',
    lesson: 'hb-m4-04',
    prompt: 'You find shiny leaves growing in threes. What do you do?',
    choices: [
      'Touch it gently with one finger',
      'Pick one to show Gigi',
      'Point at it and leave it alone',
      'Smell it first'
    ],
    answer: 2,
    feedback: [
      'One finger is enough to get the oil on you.',
      'Picking it is touching it.',
      null,
      'You have to hold it to smell it. Same problem.'
    ],
    why: 'Shiny leaves in threes is poison ivy. Point, name it, walk on.'
  },
  {
    id: 't-hbm404f',
    lesson: 'hb-m4-04',
    prompt: 'A bug crawls onto a fuzzy leaf, then leaves. What stopped it?',
    choices: ['A thorn', 'The waxy skin', 'Latex', 'The trichomes'],
    answer: 3,
    feedback: [
      'A thorn is one big spike. This leaf has none.',
      'A wax coat is smooth. This leaf is fuzzy.',
      'Nothing oozed out. Nothing was broken.',
      null
    ],
    why: 'Under a magnifier the fuzz is a field of tiny spears.'
  },
  {
    id: 't-hbm404g',
    lesson: 'hb-m4-04',
    prompt: 'A cactus point is really a changed leaf. What is it called?',
    choices: ['A thorn', 'A trichome', 'A spine', 'Latex'],
    answer: 2,
    feedback: [
      'A thorn grows out of a stem, not a leaf.',
      'A trichome is a hair. You could not sit on one.',
      null,
      'Latex is goo. This is hard and sharp.'
    ],
    why: 'Spines are leaves that turned into points. Thorns come from stems.'
  },
  {
    id: 't-hbm404h',
    lesson: 'hb-m4-04',
    prompt: 'Goats eat thorny plants anyway. What does that tell you?',
    choices: [
      'Thorns do nothing at all',
      'That plant has no adaptation',
      'Goats are plants',
      'Some animals get past a defence'
    ],
    answer: 3,
    feedback: [
      'They stop most animals. Most is not all.',
      'It has thorns. That is an adaptation.',
      'A goat eats. A plant does not.',
      null
    ],
    why: 'Armour works on most eaters. A few work out how to beat it.'
  },
  {
    id: 't-hbm404i',
    lesson: 'hb-m4-04',
    prompt: 'Ginger has a thick skin you have to scrape. How does that help it?',
    choices: [
      'It is hard to bite through',
      'It makes the ginger taller',
      'It pulls water up',
      'It calls insects in'
    ],
    answer: 0,
    feedback: [
      null,
      'Skin does not add height.',
      'Roots do that job.',
      'A tough skin keeps them off, not on.'
    ],
    why: 'Thick skin is armour, same as a thorn. It just does it quietly.'
  },
  {
    id: 't-hbm404j',
    lesson: 'hb-m4-04',
    prompt: 'What are the papery layers round a garlic clove for?',
    choices: [
      'Feeding the clove',
      'Holding it in the soil',
      'Pulling in bees',
      'Keeping the clove safe and dry'
    ],
    answer: 3,
    feedback: [
      'Papers are dry and dead. Nothing is feeding.',
      'Roots hold it down. The papers wrap it.',
      'Bees go to flowers, not to buried cloves.',
      null
    ],
    why: 'It is armour and a raincoat at once. Same idea as a seed coat.'
  },

  // =========================================================================
  // hb-m4-05 · Why plants smell strong
  // =========================================================================
  {
    id: 't-hbm405a',
    lesson: 'hb-m4-05',
    prompt: 'What does repel mean?',
    choices: [
      'To pull something towards you',
      'To squash a leaf',
      'To float off into the air',
      'To push something away'
    ],
    answer: 3,
    feedback: [
      'That is attract.',
      'That is crushing it.',
      'That is what volatile means.',
      null
    ],
    why: 'Repel pushes away. It is what a strong smell does to many insects.'
  },
  {
    id: 't-hbm405b',
    lesson: 'hb-m4-05',
    prompt: 'What does attract mean?',
    choices: [
      'To push something away',
      'To smell of nothing',
      'To pull something towards you',
      'To grow towards light'
    ],
    answer: 2,
    feedback: [
      'That is repel. The opposite.',
      'A plant with no smell attracts nothing by smell.',
      null,
      'That is a tropism, from another lesson.'
    ],
    why: 'Some plant smells pull helpers in. That is attracting.'
  },
  {
    id: 't-hbm405c',
    lesson: 'hb-m4-05',
    prompt: 'What does volatile mean?',
    choices: [
      'Very green',
      'Sharp and hard',
      'Thick and sticky',
      'Light enough to float into the air'
    ],
    answer: 3,
    feedback: [
      'Colour has nothing to do with smell.',
      'That is a thorn, from the day before.',
      'That is latex, also from the day before.',
      null
    ],
    why: 'A volatile smell lifts off the leaf and travels to your nose.'
  },
  {
    id: 't-hbm405d',
    lesson: 'hb-m4-05',
    prompt: 'Why does a leaf smell stronger after you crush it?',
    choices: [
      'Your hand adds the smell',
      'The leaf grew while you held it',
      'Crushing makes it warmer',
      'Crushing breaks the tiny pockets'
    ],
    answer: 3,
    feedback: [
      'Your hand smelled of nothing before you touched it.',
      'It takes one second. Nothing grew.',
      'Your hand is barely warm. The smell arrives at once.',
      null
    ],
    why: 'The smell was already inside. Breaking the leaf lets it out.'
  },
  {
    id: 't-hbm405e',
    lesson: 'hb-m4-05',
    prompt: 'You crushed a mint leaf and it smells great. Can you taste it?',
    choices: [
      'Yes, mint is always fine',
      'Yes, if it smells good',
      'Only a tiny piece',
      'No. Ask a grown-up first, every time'
    ],
    answer: 3,
    feedback: [
      'Knowing a name is not the same as knowing it is safe.',
      'A good smell tells you nothing about safety.',
      'A tiny piece is still tasting it.',
      null
    ],
    why: 'The first rule of the field. Smelling is not permission to taste.'
  },
  {
    id: 't-hbm405f',
    lesson: 'hb-m4-05',
    prompt: 'Slugs eat the lettuce and never touch the rosemary. Which word fits?',
    choices: ['Attract', 'Volatile', 'Repel', 'Aromatic'],
    answer: 2,
    feedback: [
      'Attract would mean pulling them in. They stay away.',
      'Volatile is about the smell travelling, not what it does.',
      null,
      'Aromatic just means it smells strong. This is about the slugs.'
    ],
    why: 'The rosemary is pushing them away with a chemical.'
  },
  {
    id: 't-hbm405g',
    lesson: 'hb-m4-05',
    prompt: 'A cotton plant being eaten puffs out a smell. What is it doing?',
    choices: [
      'Calling in wasps that go after the caterpillars',
      'Making the caterpillars grow',
      'Watering itself',
      'Growing a thorn'
    ],
    answer: 0,
    feedback: [
      null,
      'It is trying to stop them, not feed them.',
      'A smell is not water.',
      'Thorns take weeks. This happens the same day.'
    ],
    why: 'That is attract. The plant calls in something that eats its problem.'
  },
  {
    id: 't-hbm405h',
    lesson: 'hb-m4-05',
    prompt: 'Why did mint, garlic and basil end up in kitchens?',
    choices: [
      'They are the easiest plants to grow',
      'They have the biggest leaves',
      'People liked the taste of the plant defence',
      'They have no smell at all'
    ],
    answer: 2,
    feedback: [
      'Lettuce is easier than most of them.',
      'Cabbage leaves are far bigger.',
      null,
      'They are the strongest smellers in the garden.'
    ],
    why: 'The strong taste is the plant protecting itself. We liked it.'
  },
  {
    id: 't-hbm405i',
    lesson: 'hb-m4-05',
    prompt: 'What is an aromatic plant?',
    choices: [
      'One with a strong smell',
      'One with sharp thorns',
      'One that climbs a stick',
      'One that grows only in water'
    ],
    answer: 0,
    feedback: [
      null,
      'Thorns are about biting, not smelling.',
      'That is a climber. Different lesson.',
      'Where it grows is not the same as how it smells.'
    ],
    why: 'Aromatic means you can smell it from a step away.'
  },
  {
    id: 't-hbm405j',
    lesson: 'hb-m4-05',
    prompt: 'A whole clove is quiet. A cut one is loud. What did the knife do?',
    choices: [
      'Added a smell of its own',
      'Made the garlic older',
      'Warmed the garlic up',
      'Broke the pockets and let the smell out'
    ],
    answer: 3,
    feedback: [
      'The knife had no smell on it before.',
      'It is the same clove, one second later.',
      'A cold knife does not heat anything.',
      null
    ],
    why: 'Nothing was added. Something that was shut got opened.'
  },

  // =========================================================================
  // hb-m4-06 · Climbing, creeping, reaching for light
  // =========================================================================
  {
    id: 't-hbm406a',
    lesson: 'hb-m4-06',
    prompt: 'What is a tropism?',
    choices: [
      'Growth aimed in a direction',
      'A curling thread on a climber',
      'A stick you push in the soil',
      'A plant that runs along the ground'
    ],
    answer: 0,
    feedback: [
      null,
      'That is a tendril.',
      'That is a stake.',
      'That is a creeper.'
    ],
    why: 'A tropism is growing on purpose towards something.'
  },
  {
    id: 't-hbm406b',
    lesson: 'hb-m4-06',
    prompt: 'A shoot works round two flaps to reach one hole of light. Which one?',
    choices: ['Gravitropism', 'Phototropism', 'Thigmotropism', 'A tendril'],
    answer: 1,
    feedback: [
      'That one is about up and down. This went sideways.',
      null,
      'That one needs a touch. It touched nothing.',
      'A tendril is a part, not a kind of growing.'
    ],
    why: 'Photo means light. It grew towards the light it could reach.'
  },
  {
    id: 't-hbm406c',
    lesson: 'hb-m4-06',
    prompt: 'You plant a bean upside down. The root still heads down. Which one?',
    choices: ['Phototropism', 'A creeper', 'Thigmotropism', 'Gravitropism'],
    answer: 3,
    feedback: [
      'There is no light down in the soil to aim at.',
      'A creeper is a kind of plant, not a kind of growing.',
      'Nothing touched the root. It turned on its own.',
      null
    ],
    why: 'A seed senses gravity. You met this in Week 1 without the word.'
  },
  {
    id: 't-hbm406d',
    lesson: 'hb-m4-06',
    prompt: 'What is a tendril?',
    choices: [
      'A thin thread a climber grabs with',
      'A stick pushed into the soil',
      'A tiny hair on a leaf',
      'Growth aimed at light'
    ],
    answer: 0,
    feedback: [
      null,
      'That is the stake. The tendril holds it.',
      'That is a trichome, from another lesson.',
      'That is phototropism.'
    ],
    why: 'A tendril feels for something solid and coils round it.'
  },
  {
    id: 't-hbm406e',
    lesson: 'hb-m4-06',
    prompt: 'Which kind of growing needs a touch first?',
    choices: ['Phototropism', 'Gravitropism', 'Thigmotropism', 'None of them'],
    answer: 2,
    feedback: [
      'Light does not touch. It shines.',
      'Gravity pulls without touching.',
      null,
      'One of them does. It is the climbing one.'
    ],
    why: 'The tendril has to feel the stick before it starts to wind.'
  },
  {
    id: 't-hbm406f',
    lesson: 'hb-m4-06',
    prompt: 'Why grow a thin tendril instead of a thick stem?',
    choices: [
      'Tendrils hold water',
      'Tendrils grow flowers',
      'Thick stems cannot bend',
      'A thick stem costs a lot of food'
    ],
    answer: 3,
    feedback: [
      'A tendril is a grabber, not a bottle.',
      'Flowers grow from buds, not tendrils.',
      'Plenty of thick stems bend fine.',
      null
    ],
    why: 'Climbing lets something else hold you up. The food goes into leaves.'
  },
  {
    id: 't-hbm406g',
    lesson: 'hb-m4-06',
    prompt: 'What does a creeper do?',
    choices: [
      'Winds up a stick',
      'Digs down into the soil',
      'Grows straight up alone',
      'Runs flat along the ground'
    ],
    answer: 3,
    feedback: [
      'That is a climber.',
      'Roots go down. The creeper stays on top.',
      'That needs the thick stem a creeper skips.',
      null
    ],
    why: 'A creeper spreads sideways and drops roots as it travels.'
  },
  {
    id: 't-hbm406h',
    lesson: 'hb-m4-06',
    prompt: 'You turn a pot half way round. What happens in a week?',
    choices: [
      'The stem leans back towards the window',
      'The stem stays exactly as it is',
      'The plant dies',
      'The roots come up'
    ],
    answer: 0,
    feedback: [
      null,
      'It aims again. It just takes days, not minutes.',
      'Turning a pot does not hurt a plant.',
      'Roots head down. Turning does not change that.'
    ],
    why: 'New growth aims at the light. Move the plant and it aims again.'
  },
  {
    id: 't-hbm406i',
    lesson: 'hb-m4-06',
    prompt: 'You want to help a vine climb. What is the right move?',
    choices: [
      'Tie the stem tight with wire',
      'Pull the vine up by the tip',
      'Add a stake and wrap a tendril once, gently',
      'Cut the tendrils off'
    ],
    answer: 2,
    feedback: [
      'Wire cuts into a growing stem.',
      'Pulling snaps it. It has to grow there itself.',
      null,
      'The tendrils are how it holds on at all.'
    ],
    why: 'Give it something to grab and it will do the rest by itself.'
  },
  {
    id: 't-hbm406j',
    lesson: 'hb-m4-06',
    prompt: 'Which one is a part, not a kind of growing?',
    choices: ['Phototropism', 'Tendril', 'Gravitropism', 'Thigmotropism'],
    answer: 1,
    feedback: [
      'That is growing towards light.',
      null,
      'That is roots growing down.',
      'That is growing round something after a touch.'
    ],
    why: 'Three of these are tropisms. One is the thread that does the grabbing.'
  }
];

export const HERBALISM_M8_NEW_BANK = [
  // =========================================================================
  // hb-m8-04 · The Solar Tea Lab
  // =========================================================================
  {
    id: 't-hbm804a',
    lesson: 'hb-m8-04',
    prompt: 'What does extraction mean?',
    choices: [
      'Pulling something out of something else',
      'Pouring through a sieve',
      'A drink made by soaking a plant',
      'Something you wrote down'
    ],
    answer: 0,
    feedback: [
      null,
      'That is straining.',
      'That is an infusion.',
      'That is an observation.'
    ],
    why: 'The warm water pulls the colour out of the leaves. That is extraction.'
  },
  {
    id: 't-hbm804b',
    lesson: 'hb-m8-04',
    prompt: 'What is an infusion?',
    choices: [
      'A sieve for taking bits out',
      'The gap between two checks',
      'A drink made by soaking a plant in water',
      'A guess about tomorrow'
    ],
    answer: 2,
    feedback: [
      'That is a strainer.',
      'That is an interval.',
      null,
      'That is a prediction.'
    ],
    why: 'Your jar of sun tea is an infusion. Plant plus water plus time.'
  },
  {
    id: 't-hbm804c',
    lesson: 'hb-m8-04',
    prompt: 'What does strain mean?',
    choices: [
      'To soak a plant in water',
      'To write down what you saw',
      'To pull colour out of a leaf',
      'To pour through a sieve so the bits stay behind'
    ],
    answer: 3,
    feedback: [
      'That is steeping.',
      'That is an observation.',
      'That is extraction.',
      null
    ],
    why: 'You strain at the end. The leaves stay in the sieve.'
  },
  {
    id: 't-hbm804d',
    lesson: 'hb-m8-04',
    prompt: 'What is the lid on the jar for?',
    choices: [
      'Keeping the trapped heat in',
      'Keeping the light out',
      'Holding the leaves down',
      'Making the water heavier'
    ],
    answer: 0,
    feedback: [
      null,
      'Light goes straight through glass. You want it in.',
      'They float about with the lid on or off.',
      'A lid changes nothing about weight.'
    ],
    why: 'Light gets in and turns to heat. The lid stops the heat drifting off.'
  },
  {
    id: 't-hbm804e',
    lesson: 'hb-m8-04',
    prompt: 'One jar in sun went deep red. The shady one stayed pale. Why?',
    choices: [
      'The sunny jar had more leaves',
      'Warm water pulls colour out faster',
      'Shade makes water thicker',
      'The shady lid was loose'
    ],
    answer: 1,
    feedback: [
      'Both got the same handful. You counted them.',
      null,
      'Nothing about the water changed but its heat.',
      'You tightened both lids yourself.'
    ],
    why: 'Heat speeds extraction up. That is the whole reason for the sunny spot.'
  },
  {
    id: 't-hbm804f',
    lesson: 'hb-m8-04',
    prompt: 'Why check the jar every 30 minutes?',
    choices: [
      'To open it and let air in',
      'To move it to a new spot',
      'To stir the leaves round',
      'Because the change is the thing you are studying'
    ],
    answer: 3,
    feedback: [
      'The lid stays on the whole time.',
      'Moving it would spoil the test.',
      'You never open it, so you never stir it.',
      null
    ],
    why: 'Six boxes in a row show the change. One look at the end does not.'
  },
  {
    id: 't-hbm804g',
    lesson: 'hb-m8-04',
    prompt: 'Can leaves from the yard go in your tea jar?',
    choices: [
      'Yes, if they smell nice',
      'Yes, if you wash them',
      'No. Only named herbs from the food cupboard',
      'Yes, if they are green'
    ],
    answer: 2,
    feedback: [
      'A good smell says nothing about safety.',
      'Washing does not change what a plant is.',
      null,
      'Green does not mean safe. It never did.'
    ],
    why: 'Nothing from the yard goes in this jar. Gigi names every herb first.'
  },
  {
    id: 't-hbm804h',
    lesson: 'hb-m8-04',
    prompt: 'What is the solar tea you made?',
    choices: [
      'A medicine for a cough',
      'A drink she made with the sun',
      'Something to take when you feel bad',
      'A drink that fixes things'
    ],
    answer: 1,
    feedback: [
      'No. We never make anything to treat anything.',
      null,
      'No. It is not for anything at all.',
      'It fixes nothing. It is just a nice drink.'
    ],
    why: 'It is a drink, the same as lemonade. She made it, and that is the point.'
  },
  {
    id: 't-hbm804i',
    lesson: 'hb-m8-04',
    prompt: 'What is an observation?',
    choices: [
      'What somebody told you',
      'What you hoped would happen',
      'What you really saw, written down',
      'A guess about later'
    ],
    answer: 2,
    feedback: [
      'That is a claim, not an observation.',
      'Hoping is not seeing.',
      null,
      'That is a prediction.'
    ],
    why: 'Write what the jar did, not what you wanted it to do.'
  },
  {
    id: 't-hbm804j',
    lesson: 'hb-m8-04',
    prompt: 'You strain the tea. Where has the colour gone?',
    choices: [
      'It stayed in the sieve with the leaves',
      'It is in the water in the cup',
      'It disappeared',
      'It went back into the leaves'
    ],
    answer: 1,
    feedback: [
      'The sieve holds bits, not colour.',
      null,
      'The cup is red. It did not go anywhere.',
      'It came out of them. It is not going back.'
    ],
    why: 'The colour was extracted into the water. Straining only removes the leaves.'
  },

  // =========================================================================
  // hb-m8-05 · Measuring change over time
  // =========================================================================
  {
    id: 't-hbm805a',
    lesson: 'hb-m8-05',
    prompt: 'What is data?',
    choices: [
      'The numbers you wrote down',
      'A guess about next week',
      'The shape the bars make',
      'The ruler you used'
    ],
    answer: 0,
    feedback: [
      null,
      'That is a prediction.',
      'That is the pattern.',
      'That is the tool, not the numbers.'
    ],
    why: 'Data is what you collected. Everything else comes from it.'
  },
  {
    id: 't-hbm805b',
    lesson: 'hb-m8-05',
    prompt: 'What is a pattern?',
    choices: [
      'One measurement on its own',
      'Something that keeps happening the same way',
      'The tool you measure with',
      'A number you guessed'
    ],
    answer: 1,
    feedback: [
      'One number cannot make a pattern.',
      null,
      'That is the ruler.',
      'A guess is not a pattern.'
    ],
    why: 'A pattern only shows up once you have a row of numbers.'
  },
  {
    id: 't-hbm805c',
    lesson: 'hb-m8-05',
    prompt: 'Why mark a zero line on the lolly stick?',
    choices: [
      'To label which pot is which',
      'To show how deep the roots are',
      'To hold the plant up',
      'So the starting point never moves'
    ],
    answer: 3,
    feedback: [
      'The label on the pot does that.',
      'You cannot see roots from up there.',
      'A lolly stick holds nothing up.',
      null
    ],
    why: 'Move the start and the number changes without the plant changing.'
  },
  {
    id: 't-hbm805d',
    lesson: 'hb-m8-05',
    prompt: 'Your bars go 2, 4, 7, 11, 11, 11. What do the last three say?',
    choices: [
      'It grew fastest at the end',
      'You measured wrong',
      'It stopped growing taller',
      'It is shrinking'
    ],
    answer: 2,
    feedback: [
      'The big jumps are at the start.',
      'Three the same is a pattern, not a slip.',
      null,
      'Shrinking would go down. These stay level.'
    ],
    why: 'Flat bars are a real result. No change is still an answer.'
  },
  {
    id: 't-hbm805e',
    lesson: 'hb-m8-05',
    prompt: 'Why measure the pot every week when it never grows?',
    choices: [
      'To see if the pot grows',
      'To check your measuring is steady',
      'To fill up the sheet',
      'Because pots do change size'
    ],
    answer: 1,
    feedback: [
      'It cannot. That is exactly why it is useful.',
      null,
      'It is a check, not busy work.',
      'They do not. If the number moved, you did.'
    ],
    why: 'A number that must not change tells you when your method slipped.'
  },
  {
    id: 't-hbm805f',
    lesson: 'hb-m8-05',
    prompt: 'What is an interval?',
    choices: [
      'The same gap of time between checks',
      'The numbers you wrote down',
      'The bars on a graph',
      'Something that keeps repeating'
    ],
    answer: 0,
    feedback: [
      null,
      'That is data.',
      'That is the bar graph.',
      'That is a pattern.'
    ],
    why: 'Every 30 minutes, or every Monday. The gap has to stay the same.'
  },
  {
    id: 't-hbm805g',
    lesson: 'hb-m8-05',
    prompt: 'She measured from the soil, then from the pot rim. What went wrong?',
    choices: [
      'The ruler broke',
      'The starting point moved',
      'The plant shrank',
      'She used the wrong pot'
    ],
    answer: 1,
    feedback: [
      'The ruler was fine. What she did with it was not.',
      null,
      'Plants do not shrink like that. Her number did.',
      'It was the same pot both weeks.'
    ],
    why: 'Same tool, same start, same day. Break one and the number lies.'
  },
  {
    id: 't-hbm805h',
    lesson: 'hb-m8-05',
    prompt: 'What does predict mean here?',
    choices: [
      'Say the next number before you know it',
      'Write down the number you measured',
      'Colour in a bar',
      'Check the pot has not changed'
    ],
    answer: 0,
    feedback: [
      null,
      'That is recording data.',
      'That is the bar graph.',
      'That is the steadiness check.'
    ],
    why: 'You guess first, then measure. That is how you find out if you understand it.'
  },
  {
    id: 't-hbm805i',
    lesson: 'hb-m8-05',
    prompt: 'Why measure on the same day each week?',
    choices: [
      'So it is easy to remember',
      'So nothing but the plant has changed',
      'Because plants grow only on that day',
      'To use up the sheet faster'
    ],
    answer: 1,
    feedback: [
      'Easy to remember is nice. It is not the reason.',
      null,
      'They grow every day. You just check on one.',
      'The sheet lasts as long as it lasts.'
    ],
    why: 'Hold everything still except the thing you are watching.'
  },
  {
    id: 't-hbm805j',
    lesson: 'hb-m8-05',
    prompt: 'You want to know how long the root is. What do you do?',
    choices: [
      'Pull the plant up and look',
      'Dig round the side a bit',
      'Leave it, and measure what is above the soil',
      'Cut the plant off at the soil'
    ],
    answer: 2,
    feedback: [
      'That ends the experiment and the plant.',
      'Digging tears the fine roots you cannot see.',
      null,
      'Then there is nothing left to measure next week.'
    ],
    why: 'A long study needs a living plant. Measure what you can see.'
  },

  // =========================================================================
  // hb-m8-06 · Making a claim and testing it
  // =========================================================================
  {
    id: 't-hbm806a',
    lesson: 'hb-m8-06',
    prompt: 'What is a claim?',
    choices: [
      'Something somebody says is true',
      'What you saw and wrote down',
      'Your guess, written before you look',
      'What the numbers let you say at the end'
    ],
    answer: 0,
    feedback: [
      null,
      'That is evidence.',
      'That is a hypothesis.',
      'That is a conclusion.'
    ],
    why: 'A claim might be true. Nobody has checked it yet.'
  },
  {
    id: 't-hbm806b',
    lesson: 'hb-m8-06',
    prompt: 'What is evidence?',
    choices: [
      'Something somebody says is true',
      'What you saw and wrote down yourself',
      'A guess before you start',
      'The one thing you change'
    ],
    answer: 1,
    feedback: [
      'That is a claim.',
      null,
      'That is a hypothesis.',
      'That is the variable.'
    ],
    why: 'Evidence is measured. That is the whole difference.'
  },
  {
    id: 't-hbm806c',
    lesson: 'hb-m8-06',
    prompt: 'What is a hypothesis?',
    choices: [
      'What somebody told you',
      'The sieve you used',
      'The numbers on your sheet',
      'Your best guess, written before you look'
    ],
    answer: 3,
    feedback: [
      'That is a claim.',
      'That belongs to another lesson.',
      'That is the data.',
      null
    ],
    why: 'It goes down in pen, first, so you cannot quietly change it later.'
  },
  {
    id: 't-hbm806d',
    lesson: 'hb-m8-06',
    prompt: 'What makes a test fair?',
    choices: [
      'You change one thing and keep the rest the same',
      'Both plants get whatever they need',
      'You do it twice in one day',
      'You already know the answer'
    ],
    answer: 0,
    feedback: [
      null,
      'Then they got different things. That is the problem.',
      'Doing it fast does not make it fair.',
      'If you knew, there would be nothing to test.'
    ],
    why: 'One change at a time, or the answer belongs to nobody.'
  },
  {
    id: 't-hbm806e',
    lesson: 'hb-m8-06',
    prompt: 'She changed the light AND gave one pot extra water. What now?',
    choices: [
      'A better test',
      'She cannot tell which change did it',
      'Nothing is wrong',
      'She has proved light works'
    ],
    answer: 1,
    feedback: [
      'Two changes is blurrier, not better.',
      null,
      'Two things moved at once. That is the fault.',
      'It might have been the water instead.'
    ],
    why: 'Two variables at once and the result cannot answer either question.'
  },
  {
    id: 't-hbm806f',
    lesson: 'hb-m8-06',
    prompt: 'Someone told you garlic grows faster in shade. Is that evidence?',
    choices: [
      'Yes, they are a grown-up',
      'Yes, if they sound sure',
      'No. It is a claim you could test',
      'Yes, if they say it twice'
    ],
    answer: 2,
    feedback: [
      'Age does not turn a sentence into a measurement.',
      'Sounding sure is not the same as being right.',
      null,
      'Saying it twice is still saying it.'
    ],
    why: 'Someone told me is where a question starts, not where it ends.'
  },
  {
    id: 't-hbm806g',
    lesson: 'hb-m8-06',
    prompt: 'Your numbers say your guess was wrong. What do you do?',
    choices: [
      'Change the guess to match',
      'Throw the sheet away',
      'Keep the numbers and write what they say',
      'Ask somebody for the answer'
    ],
    answer: 2,
    feedback: [
      'Then it was never a guess and you learned nothing.',
      'The numbers are the best part. They are true.',
      null,
      'Asking gets you a claim. You already have evidence.'
    ],
    why: 'Being wrong on paper is a result. It is not a failure.'
  },
  {
    id: 't-hbm806h',
    lesson: 'hb-m8-06',
    prompt: 'What is a variable?',
    choices: [
      'What somebody says is true',
      'The numbers you collect',
      'The one thing you change on purpose',
      'The end of the test'
    ],
    answer: 2,
    feedback: [
      'That is a claim.',
      'That is data.',
      null,
      'That is the conclusion.'
    ],
    why: 'One variable at a time. Everything else stays still.'
  },
  {
    id: 't-hbm806i',
    lesson: 'hb-m8-06',
    prompt: 'Which claim could a ruler settle?',
    choices: [
      'Corn is prettier than garlic',
      'Corn in the big bucket grows taller',
      'Ginger is the best plant',
      'Gardens are nicer in summer'
    ],
    answer: 1,
    feedback: [
      'Prettier is an opinion. No ruler measures it.',
      null,
      'Best is an opinion too.',
      'Nicer is about how you feel, not a number.'
    ],
    why: 'A testable claim names something you can measure and compare.'
  },
  {
    id: 't-hbm806j',
    lesson: 'hb-m8-06',
    prompt: 'Which kind of claim do we never test in this course?',
    choices: [
      'A claim about which pot grows taller',
      'A claim about what a plant does to a person',
      'A claim about which leaf is longer',
      'A claim about how fast water drains'
    ],
    answer: 1,
    feedback: [
      'That is a ruler and two pots. Go ahead.',
      null,
      'That is a ruler and two leaves. Go ahead.',
      'That is a jug and a clock. Go ahead.'
    ],
    why: 'We test how plants grow. What a plant does to a body is not ours to test.'
  }
];

export default [...HERBALISM_M4_NEW_BANK, ...HERBALISM_M8_NEW_BANK];
