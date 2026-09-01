// ---------------------------------------------------------------------------
// HERBALISM & BOTANY — QUARTER 1: MEET THE PLANTS
//
// Thirteen lessons. Her signature course, the counterpart to her brother's
// Aerospace Engineering.
//
// ---- WHY THESE ARE WRITTEN THIS PLAINLY ----
//
// Her Check-In put Reading Comprehension at 3.46 and Vocabulary at 2.91 — and
// TEN of her thirteen reading questions were read aloud to her, so both of those
// are listening scores. Her independent reading is lower than either number.
//
// A botany lesson written for a nine-year-old's AGE would fail her for reading
// reasons, and she would conclude that herbalism is hard when the truth is that
// the sentences were. That is the same mistake the diagnostic made before the
// reading-load guard went in, and it is worth not making twice.
//
// So every lesson here is written at about a 2.5 reading level — sentences
// under about eleven words, almost no three-syllable words — and
// scripts/check-lessons.mjs holds them to it. Read-aloud is on every screen.
//
// Simple sentences are not simple ideas. Plant families, keying out a specimen
// and why look-alikes matter are all real botany. Only the sentences are short.
//
// ---- THE SHAPE OF EVERY LESSON ----
//
// hook -> core -> doing -> practice -> check. The same four-part shape the
// grandmother set for Lamar's course, with one addition: `doing`. This is a
// herbalist's course and she has a real garden. A lesson that never asks her to
// go outside and look at something is a worksheet with a plant on it.
//
// ---- THE SAFETY RULE ----
//
// No dosing. No "take this for that". No plant is ever described as a treatment
// for anything. What she learns is identification, growing, structure, history,
// and how to tell a real claim from a story. Lesson 12 is explicitly about
// never putting a plant in your mouth without a grown-up — taught as the first
// rule of the field, which is exactly what it is.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// VIDEOS — ADDED v3.7, Aug 14 2026. Thirteen of thirteen.
//
// Every id below was searched for, then VERIFIED against YouTube's oEmbed
// endpoint, then verified a SECOND time independently before it was written
// here. The title on each one is the title YouTube returned, character for
// character — not the title a search result claimed, which can be stale.
//
// ---- THE BLACK-AMERICAN-EDUCATOR REQUIREMENT: 0 OF 13 ----
//
// This is the standing rule of the project and it came up empty on all
// thirteen. That is a finding, not a shortcut. Three independent searches ran
// roughly a dozen angles each — Black science educators, Black gardeners and
// farmers, Black foragers, Black herbalists, Black botanists, Black naturalists,
// Black homeschool channels, Black-created kids' channels, Black Botanists Week,
// HBCU 1890 extension programmes and 4-H youth programming.
//
// The gap is NOT in Black expertise. Dr. Beronda Montgomery, Alexis Nikole
// Nelson, Ron Finley, Soul Fire Farm, Corina Newsome and the 1890 extensions
// are all real and all excellent. The gap is in Black-made ELEMENTARY-AGE
// botany video. What exists is lectures, interviews, conference talks and
// foraging vlogs — adult and teen level, every time.
//
// Two things recorded so they are not misread later:
//
//   * "Black Rock Forest" (hb-1-11) is a PLACE — a K-12 field station in New
//     York's Hudson Highlands. It is not a Black-led channel and must never be
//     counted as one.
//
//   * Alexis Nikole Nelson was checked seriously and rejected ON PURPOSE for
//     hb-1-12. She is exactly who the brief pointed at, and hb-1-12 is the
//     safety lesson — never taste a plant without a grown-up. Her catalogue is
//     built around finding and eating wild food. She belongs in this app, in
//     Black Women in Medicine & Botany or a supervised foraging lesson, not
//     behind a lesson she would contradict.
//
// Every fallback carries its own `sourceGap` string saying what was searched
// and not found. scripts/check-videos.mjs prints all of them on every run, so
// the gap is on the screen rather than in someone's memory.
// ---------------------------------------------------------------------------

export const HERBALISM_Q1 = [
  {
    id: 'hb-1-01',
    course: 'herbalism',
    module: 2,
    quarter: 1,
    week: 3,
    day: 1,
    standards: [],
    video: {
      id: '18amLZ9vfG8',
      url: 'https://www.youtube.com/watch?v=18amLZ9vfG8',
      title: 'Plant Parts and Functions for Kids',
      channel: 'Homeschool Pop',
      minutes: 11,
      verified: '2026-08-14',
      sourceGap: 'Searched Black homeschool and kids\' science channels, GPB Let\'s Learn GA, Nine PBS Teaching in Room 9. Nothing Black-led at this level and length.'
    },
    n: 1,
    title: 'The parts of a plant',
    minutes: 30,
    words: ['root', 'stem', 'leaf', 'flower'],
    hook: {
      text: 'Every plant in your garden is built the same way. Once you know the parts, you can read any plant.',
      question: 'Look at one plant. How many different parts can you count?'
    },
    core: [
      {
        heading: 'Four main parts',
        text: 'Most plants have roots, a stem, leaves and flowers. Each part has one job. The plant needs all of them.'
      },
      {
        heading: 'They work as a team',
        text: 'Roots hold the plant down. The stem holds it up. Leaves catch the light. Flowers make new seeds.'
      },
      {
        heading: 'Not every plant has every part',
        text: 'A young plant may have no flower yet. That is normal. It will grow one later.'
      }
    ],
    doing: 'Pick one plant. Point to each part and say its name out loud.',
    practice: [
      {
        ask: 'Which part holds the plant in the soil?',
        answer: 'The roots.',
        why: 'Roots grip the soil so wind cannot pull the plant over.'
      },
      {
        ask: 'Which part makes the seeds?',
        answer: 'The flower.',
        why: 'Seeds start inside a flower. Later the flower dries and the seeds are ready.'
      }
    ],
    check: [
      {
        prompt: 'What is the job of a leaf?',
        choices: ['To catch the light', 'To hold the plant down', 'To make soil', 'To keep it warm'],
        answer: 0,
        feedback: [
          null,
          'That is what roots do.',
          'Plants grow in soil. They do not make it.',
          'Leaves do not warm the plant.'
        ]
      },
      {
        prompt: 'A plant has no flower yet. What does that mean?',
        choices: ['It may still be young', 'It is dead', 'It has no roots', 'It is not a plant'],
        answer: 0,
        feedback: [null, 'A plant with green leaves is alive.', 'Roots are under the soil.', 'It is still a plant.']
      },
      {
        prompt: 'Which part holds the plant up?',
        choices: ['The stem', 'The flower', 'The seed', 'The soil'],
        answer: 0,
        feedback: [null, 'Flowers sit on top of the stem.', 'A seed is not part of a grown plant.', 'Soil holds the roots.']
      }
    ]
  },

  {
    id: 'hb-1-02',
    course: 'herbalism',
    module: 2,
    quarter: 1,
    week: 3,
    day: 2,
    standards: [],
    video: {
      id: '11h_7lnflOA',
      url: 'https://www.youtube.com/watch?v=11h_7lnflOA',
      title: 'Functions of Root | Parts Of a Plant | Elementary Science | Short Videos |Tutway |',
      channel: 'TutWay',
      minutes: 1,
      verified: '2026-08-14',
      sourceGap: 'Searched Soul Fire Farm, Sankofa Farms, Rid-All, Truly Living Well (Atlanta), Ron Finley, and the 1890 HBCU extensions at Fort Valley State, Tuskegee and NC A&T. None has a short child-level video on roots.'
    },
    n: 2,
    title: 'What roots do',
    minutes: 30,
    words: ['root', 'soil', 'water'],
    hook: {
      text: 'Half of a plant is under the soil. You almost never see it.',
      question: 'How deep do you think the roots of a mint plant go?'
    },
    core: [
      {
        heading: 'Roots drink',
        text: 'Roots pull water out of the soil. The water goes up the stem to the leaves.'
      },
      {
        heading: 'Roots hold on',
        text: 'Roots spread out and grip. That is why wind does not blow a plant away.'
      },
      {
        heading: 'Roots can store food',
        text: 'A carrot is a root. The plant packed it with food to use later. So did the ginger in your kitchen.'
      }
    ],
    doing: 'Fill a jar with water. Stand a cut stem in it. Look each day for small white roots.',
    practice: [
      { ask: 'Why does a plant wilt when the soil is dry?', answer: 'The roots have no water to pull up.', why: 'Leaves go soft when no water reaches them.' },
      { ask: 'Name a root you have eaten.', answer: 'A carrot. Ginger too.', why: 'Both grow under the soil and store food.' }
    ],
    check: [
      {
        prompt: 'Where do roots get water?',
        choices: ['From the soil', 'From the air', 'From the sun', 'From the leaves'],
        answer: 0,
        feedback: [null, 'Roots are under the soil, not in the air.', 'The sun gives light, not water.', 'Water goes from roots TO leaves.']
      },
      {
        prompt: 'A carrot is which part of a plant?',
        choices: ['A root', 'A stem', 'A leaf', 'A flower'],
        answer: 0,
        feedback: [null, 'The stem is the part above the soil.', 'Carrot leaves are the green tops.', 'Carrots flower in their second year.']
      },
      {
        prompt: 'Why do roots spread out wide?',
        choices: ['To hold the plant down', 'To make flowers', 'To catch light', 'To keep out bugs'],
        answer: 0,
        feedback: [null, 'Flowers grow up top.', 'Roots are in the dark.', 'That is not what roots are for.']
      }
    ]
  },

  {
    id: 'hb-1-03',
    course: 'herbalism',
    module: 2,
    quarter: 1,
    week: 4,
    day: 1,
    standards: [],
    video: {
      id: '2klJcpdeEEc',
      url: 'https://www.youtube.com/watch?v=2klJcpdeEEc',
      title: 'Parts of a Plant - The Stem | Environmental Studies Grade 3 | Periwinkle',
      channel: 'Periwinkle',
      minutes: 3,
      verified: '2026-08-14',
      sourceGap: 'Searched Black educators doing the celery-and-food-colouring stem demo and Black-run elementary science channels. Only Periwinkle, MooMooMath and TutWay have stem-specific videos; none is Black-led.'
    },
    n: 3,
    title: 'What the stem does',
    minutes: 25,
    words: ['stem', 'stalk'],
    hook: {
      text: 'A stem is not just a stick. It is a pipe and a pole at the same time.',
      question: 'Squeeze a mint stem. Is it round or does it have edges?'
    },
    core: [
      { heading: 'The stem lifts', text: 'Leaves need light. The stem lifts them up to reach it.' },
      { heading: 'The stem carries', text: 'Water goes up inside the stem. Food made in the leaves goes back down.' },
      { heading: 'Stems can be a clue', text: 'Mint stems are square. Most stems are round. Rolling a stem in your fingers can tell you a lot.' }
    ],
    doing: 'Roll three different stems between your fingers. Write down which ones are square.',
    practice: [
      { ask: 'Why do plants in shade grow tall and thin?', answer: 'They are stretching the stem to reach light.', why: 'The stem grows toward light. In shade it must reach further.' },
      { ask: 'What shape is a mint stem?', answer: 'Square.', why: 'Mint and its whole family have square stems.' }
    ],
    check: [
      {
        prompt: 'What travels UP the stem?',
        choices: ['Water', 'Soil', 'Seeds', 'Light'],
        answer: 0,
        feedback: [null, 'Soil stays in the ground.', 'Seeds form in the flower.', 'Light lands on the leaves.']
      },
      {
        prompt: 'You roll a stem and feel four flat sides. What might it be?',
        choices: ['Mint', 'A rose', 'A carrot', 'Grass'],
        answer: 0,
        feedback: [null, 'Rose stems are round with thorns.', 'A carrot stem is round.', 'Grass stems are round.']
      },
      {
        prompt: 'Why does the stem lift the leaves?',
        choices: ['So they can reach the light', 'To keep them dry', 'To hide them', 'To make them heavy'],
        answer: 0,
        feedback: [null, 'Rain falls on leaves anyway.', 'Leaves need to be seen by the sun.', 'Height does not add weight.']
      }
    ]
  },

  {
    id: 'hb-1-04',
    course: 'herbalism',
    module: 2,
    quarter: 1,
    week: 4,
    day: 2,
    standards: [],
    video: {
      id: 'Iln136eMl4g',
      url: 'https://www.youtube.com/watch?v=Iln136eMl4g',
      title: 'Photosynthesis for Kids | Learn how plants MAKE their own food',
      channel: 'Learn Bright',
      minutes: 6,
      verified: '2026-08-14',
      sourceGap: 'Checked Mike Likes Science, Gracie\'s Corner, Learning with Ms. Houston, Michelle Labs and Raven the Science Maven. None has a photosynthesis or leaf-function video for 6-11s.'
    },
    n: 4,
    title: 'What leaves do',
    minutes: 30,
    words: ['leaf', 'light', 'vein'],
    hook: {
      text: 'A leaf is a kitchen. It takes light and makes food out of it.',
      question: 'Hold a leaf up to the sun. What can you see inside it?'
    },
    core: [
      { heading: 'Leaves make food', text: 'A leaf takes in light and air. It turns them into food for the plant. No other part can do this.' },
      { heading: 'Veins are pipes', text: 'Those lines in a leaf are pipes. Water comes in and food goes out through them.' },
      { heading: 'Flat and wide on purpose', text: 'A wide leaf catches more light. That is why most leaves are flat.' }
    ],
    doing: 'Hold three leaves up to the light. Draw the vein lines you can see.',
    practice: [
      { ask: 'Why are most leaves flat and wide?', answer: 'To catch as much light as they can.', why: 'More surface means more light and more food.' },
      { ask: 'What are the lines in a leaf?', answer: 'Veins. They are pipes.', why: 'They carry water in and food out.' }
    ],
    check: [
      {
        prompt: 'What does a leaf need to make food?',
        choices: ['Light and air', 'Soil and rocks', 'Only water', 'Nothing at all'],
        answer: 0,
        feedback: [null, 'Roots handle the soil.', 'Water helps, but light is the key.', 'A leaf in the dark makes nothing.']
      },
      {
        prompt: 'What are veins for?',
        choices: ['Carrying water and food', 'Holding the leaf stiff only', 'Keeping bugs off', 'Making the leaf green'],
        answer: 0,
        feedback: [null, 'They do help it hold shape, but that is not the main job.', 'Veins are inside the leaf.', 'Green comes from something else.']
      },
      {
        prompt: 'A plant is kept in a dark room. What will happen?',
        choices: ['It will run out of food', 'It will grow faster', 'It will make more flowers', 'Nothing will change'],
        answer: 0,
        feedback: [null, 'Plants need light to grow well.', 'Flowers take even more food.', 'Light matters a great deal.']
      }
    ]
  },

  {
    id: 'hb-1-05',
    course: 'herbalism',
    module: 4,
    quarter: 1,
    week: 7,
    day: 1,
    standards: [],
    video: {
      id: 'nrqBW1NILuA',
      url: 'https://www.youtube.com/watch?v=nrqBW1NILuA',
      title: 'Leaf Names & Shapes - Learn to Identify Trees by Their Leaves | Fun Nature Guide for Kids',
      channel: 'pure star kids',
      minutes: 3,
      verified: '2026-08-14',
      sourceGap: 'Alexis Nikole Nelson hosts Crash Course Botany, but those run 11-13 minutes at high-school level. Her own channel is foraging-and-eating content. Nothing of hers meets the age and length rules.'
    },
    n: 5,
    title: 'Leaf shapes',
    minutes: 25,
    words: ['oval', 'heart', 'narrow'],
    hook: {
      text: 'No two kinds of plant have quite the same leaf. Shape is your first clue.',
      question: 'Find two leaves that are not the same shape. What is different?'
    },
    core: [
      { heading: 'Some common shapes', text: 'Leaves can be long and thin. They can be like an egg. Some are shaped like a heart.' },
      { heading: 'Say what you see', text: 'Do not say a leaf is pretty. Say it is long, or wide, or pointed. That is what a herbalist writes down.' },
      { heading: 'Shape helps you name it', text: 'Basil leaves are like eggs. Rosemary leaves are like tiny needles. The shape tells you which is which.' }
    ],
    doing: 'Pick four leaves. Line them up from widest to thinnest.',
    practice: [
      { ask: 'How would you describe a rosemary leaf?', answer: 'Thin and pointed, like a needle.', why: 'Short and narrow with a sharp tip.' },
      { ask: 'Why is "pretty" a poor word for a field journal?', answer: 'It does not help anyone find the same plant.', why: 'A journal has to help you tell one plant from another.' }
    ],
    check: [
      {
        prompt: 'Which words describe a leaf best in a journal?',
        choices: ['Long and pointed', 'Very nice', 'My favourite', 'Quite good'],
        answer: 0,
        feedback: [null, 'That says nothing about the leaf.', 'That is about you, not the plant.', 'Someone else could not find it.']
      },
      {
        prompt: 'Rosemary leaves look most like —',
        choices: ['Needles', 'Hearts', 'Circles', 'Squares'],
        answer: 0,
        feedback: [null, 'Some leaves are, but not rosemary.', 'Rosemary leaves are long, not round.', 'Leaves are almost never square.']
      },
      {
        prompt: 'Why does leaf shape matter to a herbalist?',
        choices: ['It helps name the plant', 'It changes the colour', 'It makes it grow', 'It keeps it warm'],
        answer: 0,
        feedback: [null, 'Shape and colour are separate.', 'Shape does not make a plant grow.', 'Shape is not about warmth.']
      }
    ]
  },

  {
    id: 'hb-1-06',
    course: 'herbalism',
    module: 4,
    quarter: 1,
    week: 7,
    day: 2,
    standards: [],
    video: {
      id: 'jkMjYJCdmF0',
      url: 'https://www.youtube.com/watch?v=jkMjYJCdmF0',
      title: 'LEAF MARGINS, LOBES & TIPS',
      channel: 'UK Forestry and Natural Resources',
      minutes: 4,
      verified: '2026-08-14',
      sourceGap: 'Seven distinct searches across Black science educators, Black homeschool nature study, Black botanists, Black Botanists Week, HBCU extension and Black naturalists. Nothing at a nine-year-old\'s level on this narrow topic.'
    },
    n: 6,
    title: 'The edge of a leaf',
    minutes: 25,
    words: ['smooth', 'toothed', 'lobed'],
    hook: {
      text: 'Run your finger round the edge of a leaf. That edge has a name.',
      question: 'Is the edge you just felt smooth, or bumpy like a saw?'
    },
    core: [
      { heading: 'Three kinds of edge', text: 'A smooth edge has no bumps. A toothed edge has small points, like a saw. A lobed edge has big soft curves.' },
      { heading: 'The edge is a strong clue', text: 'Two leaves can be the same shape and colour. If one is toothed and one is smooth, they are not the same plant.' },
      { heading: 'Check more than one leaf', text: 'Leaves at the top of a plant can look different. Always check two or three.' }
    ],
    doing: 'Find one smooth leaf and one toothed leaf. Tape both into your journal.',
    practice: [
      { ask: 'An oak leaf has big soft curves. What is that edge called?', answer: 'Lobed.', why: 'Big rounded curves, not small points.' },
      { ask: 'Why check more than one leaf?', answer: 'Leaves on the same plant can differ.', why: 'Young top leaves often look different from old low ones.' }
    ],
    check: [
      {
        prompt: 'A leaf edge with small sharp points is called —',
        choices: ['Toothed', 'Smooth', 'Lobed', 'Round'],
        answer: 0,
        feedback: [null, 'Smooth means no points at all.', 'Lobed means big curves.', 'Round is a shape, not an edge.']
      },
      {
        prompt: 'Two leaves are the same shape. One is toothed, one is smooth. So —',
        choices: ['They are different plants', 'They are the same plant', 'One is dead', 'Both are weeds'],
        answer: 0,
        feedback: [null, 'The edge is a real difference.', 'Both can be alive.', 'Neither has to be a weed.']
      },
      {
        prompt: 'Why look at two or three leaves?',
        choices: ['They can look different on one plant', 'To pick the best one', 'To make the plant grow', 'To count them'],
        answer: 0,
        feedback: [null, 'You are looking, not choosing.', 'Looking does not change growth.', 'Counting is not the point here.']
      }
    ]
  },

  {
    id: 'hb-1-07',
    course: 'herbalism',
    module: 4,
    quarter: 1,
    week: 7,
    day: 3,
    standards: [],
    video: {
      id: 'Fb3EwbCnz1U',
      url: 'https://www.youtube.com/watch?v=Fb3EwbCnz1U',
      title: 'Tree Identification: Opposite, Alternate, and Whorled Arrangements',
      channel: 'American Woodlore and Forestcraft',
      minutes: 6,
      verified: '2026-08-14',
      sourceGap: 'The Black-creator nature channels found (@BlackWomenInNature, @ablackgirlinthewoods) are personal nature content, not botany instruction. The Nature Educator turned out to be a Canadian naturalist.'
    },
    n: 7,
    title: 'How leaves sit on the stem',
    minutes: 25,
    words: ['opposite', 'alternate', 'pair'],
    hook: {
      text: 'Look where a leaf joins the stem. Is there another leaf right across from it?',
      question: 'Do the leaves grow in pairs, or do they take turns?'
    },
    core: [
      { heading: 'Two ways', text: 'Leaves can grow in pairs, straight across from each other. Or they can take turns up the stem.' },
      { heading: 'Pairs are called opposite', text: 'Mint has leaves in pairs. So does basil. The whole mint family does.' },
      { heading: 'Taking turns is called alternate', text: 'One leaf, then a gap, then one on the other side. Sage does this.' }
    ],
    doing: 'Find one plant with paired leaves and one that takes turns. Draw both stems.',
    practice: [
      { ask: 'Mint has square stems and paired leaves. What does that tell you?', answer: 'It is in the mint family.', why: 'Square stem plus opposite leaves is the mint family sign.' },
      { ask: 'What does "alternate" mean here?', answer: 'The leaves take turns up the stem.', why: 'One side, then the other, never in pairs.' }
    ],
    check: [
      {
        prompt: 'Leaves growing straight across from each other are —',
        choices: ['Opposite', 'Alternate', 'Toothed', 'Lobed'],
        answer: 0,
        feedback: [null, 'Alternate means taking turns.', 'That word is about the edge.', 'That word is about the edge too.']
      },
      {
        prompt: 'A plant has a square stem and paired leaves. It is probably —',
        choices: ['In the mint family', 'A tree', 'A grass', 'A fern'],
        answer: 0,
        feedback: [null, 'Tree stems are round and woody.', 'Grass stems are round.', 'Ferns have no flowers at all.']
      },
      {
        prompt: 'Why is leaf order useful?',
        choices: ['It helps you name the plant', 'It makes leaves grow', 'It waters the plant', 'It changes the smell'],
        answer: 0,
        feedback: [null, 'Naming does not make things grow.', 'Order has nothing to do with water.', 'Smell comes from oils in the leaf.']
      }
    ]
  },

  {
    id: 'hb-1-08',
    course: 'herbalism',
    module: 6,
    quarter: 2,
    week: 3,
    day: 1,
    standards: [],
    video: {
      id: 'pnBoM4idf1k',
      url: 'https://www.youtube.com/watch?v=pnBoM4idf1k',
      title: 'Flowers and Their Pollinators: A Perfect Match! | Spring is Here! | SciShow Kids',
      channel: 'SciShow Kids',
      minutes: 5,
      verified: '2026-08-14',
      sourceGap: 'Searched Black beekeepers and flower farmers, Black homeschool science creators, and HBCU/1890 kids\' programming at Tuskegee, NC A&T, Southern University Ag Center and Lincoln. Closest was Crash Course Botany #9 with Alexis Nikole Nelson, but it is 11-13 minutes at high-school level.'
    },
    n: 8,
    title: 'What a flower is for',
    minutes: 30,
    words: ['petal', 'pollen', 'bee'],
    hook: {
      text: 'A flower is not there to look nice for us. It has a job.',
      question: 'Sit near a flower for two minutes. What comes to visit it?'
    },
    core: [
      { heading: 'Flowers make seeds', text: 'A flower is how a plant makes new seeds. Without it there are no new plants.' },
      { heading: 'Pollen has to move', text: 'A yellow dust called pollen must move from flower to flower. Bees carry it on their legs.' },
      { heading: 'Colour is an advert', text: 'Bright petals tell bees where to land. The colour is a sign, not decoration.' }
    ],
    doing: 'Watch one flower for two minutes. Write down every visitor you see.',
    practice: [
      { ask: 'Why do flowers have bright petals?', answer: 'To bring bees and other insects in.', why: 'Bright colour is easy for a bee to spot.' },
      { ask: 'What happens if no bee visits a flower?', answer: 'It may make no seeds.', why: 'Pollen has to travel for seeds to form.' }
    ],
    check: [
      {
        prompt: 'What is the main job of a flower?',
        choices: ['To make seeds', 'To look nice', 'To catch light', 'To hold the plant up'],
        answer: 0,
        feedback: [null, 'It looks nice to bees, for a reason.', 'Leaves catch the light.', 'The stem does that.']
      },
      {
        prompt: 'What do bees carry from flower to flower?',
        choices: ['Pollen', 'Water', 'Soil', 'Seeds'],
        answer: 0,
        feedback: [null, 'Bees drink but do not carry water about.', 'Bees stay out of the soil.', 'Seeds form after pollen moves.']
      },
      {
        prompt: 'Bright petals are best described as —',
        choices: ['A sign for insects', 'A way to stay warm', 'A kind of leaf edge', 'A root'],
        answer: 0,
        feedback: [null, 'Colour does not add warmth.', 'Edges belong to leaves.', 'Roots are under the soil.']
      }
    ]
  },

  {
    id: 'hb-1-09',
    course: 'herbalism',
    module: 1,
    quarter: 1,
    week: 1,
    day: 3,
    standards: [],
    video: {
      id: 'WqgVks9NViQ',
      url: 'https://www.youtube.com/watch?v=WqgVks9NViQ',
      title: 'How Do Plant Seeds Travel? | Spring is Here! | SciShow Kids',
      channel: 'SciShow Kids',
      minutes: 6,
      verified: '2026-08-14',
      sourceGap: 'Searched Black gardeners and farmers, Black-led seed organisations (Soul Fire Farm, Ujamaa, Ron Finley) and Black-created kids\' channels. Gracie\'s Corner, TAB TIME, JOOLS TV and MiSTER B are preschool music and literacy, not botany.'
    },
    n: 9,
    title: 'Seeds',
    minutes: 25,
    words: ['seed', 'sprout', 'germinate'],
    hook: {
      text: 'A seed is a whole plant, packed small, waiting.',
      question: 'What do you think a seed needs before it will start to grow?'
    },
    core: [
      { heading: 'What is inside', text: 'A seed holds a tiny plant and a store of food. The food feeds it until leaves can take over.' },
      { heading: 'What it needs', text: 'Most seeds need water, warmth and air. Light comes later, once the shoot is up.' },
      { heading: 'Waiting is normal', text: 'Some seeds sit for years. They wait until the year is right.' }
    ],
    doing: 'Wrap three bean seeds in a damp cloth. Look at them each day for a week.',
    practice: [
      { ask: 'Why can a seed grow in the dark at first?', answer: 'It has its own food inside.', why: 'It does not need light until it has leaves.' },
      { ask: 'Name the three things most seeds need.', answer: 'Water, warmth and air.', why: 'All three, or the seed stays asleep.' }
    ],
    check: [
      {
        prompt: 'What is stored inside a seed?',
        choices: ['A tiny plant and food', 'Only water', 'Soil', 'Pollen'],
        answer: 0,
        feedback: [null, 'Water comes in from outside.', 'Soil is not inside a seed.', 'Pollen comes before the seed forms.']
      },
      {
        prompt: 'A seed starts growing under the soil, in the dark. How?',
        choices: ['It uses the food inside it', 'It finds light in the soil', 'It does not need food', 'It eats the soil'],
        answer: 0,
        feedback: [null, 'Soil is dark all the way down.', 'Growing always takes food.', 'Plants do not eat soil.']
      },
      {
        prompt: 'Some seeds wait years before growing. This is —',
        choices: ['Normal for many plants', 'A sign they are dead', 'Very rare', 'Bad for the plant'],
        answer: 0,
        feedback: [null, 'They can still grow after years.', 'It is common.', 'Waiting for a good year helps them.']
      }
    ]
  },

  {
    id: 'hb-1-10',
    course: 'herbalism',
    module: 8,
    quarter: 2,
    week: 7,
    day: 1,
    standards: [],
    video: {
      id: 'lEx9Ra4xV6k',
      url: 'https://www.youtube.com/watch?v=lEx9Ra4xV6k',
      title: 'Botany For Kids - [Episode 18] A Hint of Mint',
      channel: 'Botany For Kids',
      minutes: 6,
      verified: '2026-08-14',
      sourceGap: 'Every Black-led result found (Natural History Institute, TeachEthnobotany, Dr. Beronda Montgomery, Black Girl Environmentalist) is adult or teen level, not a nine-year-old\'s.'
    },
    n: 10,
    title: 'Plant families',
    minutes: 30,
    words: ['family', 'group', 'related'],
    hook: {
      text: 'Plants have families, the way people do. Family members share traits.',
      question: 'Mint, basil and sage all smell strong. Do you think they are related?'
    },
    core: [
      { heading: 'What a family is', text: 'A plant family is a group that shares the same build. Same kind of stem, same kind of flower.' },
      { heading: 'The mint family', text: 'Square stems. Leaves in pairs. A strong smell when you rub them. Mint, basil and sage are all in it.' },
      { heading: 'Why this saves time', text: 'Learn one family and you can place dozens of plants at a glance. That is the real trick.' }
    ],
    doing: 'Rub a mint leaf and a sage leaf. Do they smell like family?',
    practice: [
      { ask: 'Give the three signs of the mint family.', answer: 'Square stem, paired leaves, strong smell.', why: 'All three together is a strong clue.' },
      { ask: 'Why learn families instead of single plants?', answer: 'One family covers many plants at once.', why: 'It is faster and it helps with plants you have never met.' }
    ],
    check: [
      {
        prompt: 'What do plants in a family share?',
        choices: ['The same kind of build', 'The same colour', 'The same height', 'The same name'],
        answer: 0,
        feedback: [null, 'Family members come in many colours.', 'Height varies a lot.', 'They each have their own name.']
      },
      {
        prompt: 'Which is NOT a sign of the mint family?',
        choices: ['Round woody stems', 'Square stems', 'Leaves in pairs', 'A strong smell'],
        answer: 0,
        feedback: [null, 'Square stems ARE a sign.', 'Paired leaves ARE a sign.', 'A strong smell IS a sign.']
      },
      {
        prompt: 'Why are families useful?',
        choices: ['They help you place a new plant fast', 'They make plants grow', 'They keep bugs away', 'They water the garden'],
        answer: 0,
        feedback: [null, 'Naming does not change growing.', 'Families are not about pests.', 'That is your job, not theirs.']
      }
    ]
  },

  {
    id: 'hb-1-11',
    course: 'herbalism',
    module: 8,
    quarter: 2,
    week: 7,
    day: 2,
    standards: [],
    video: {
      id: 'DsrsQ6k1HEk',
      url: 'https://www.youtube.com/watch?v=DsrsQ6k1HEk',
      title: 'Tree Identification: How to use a Dichotomous Key',
      channel: 'Black Rock Forest',
      minutes: 17,
      verified: '2026-08-14',
      sourceGap: 'WARNING FOR WHOEVER READS THIS NEXT: \'Black Rock Forest\' is a PLACE NAME, a K-12 field station in New York\'s Hudson Highlands. It is NOT a Black-led channel and must never be counted as one. Searched Black science teachers and naturalists doing dichotomous keys; found none at elementary level.'
    },
    n: 11,
    title: 'How to key out a plant',
    minutes: 35,
    words: ['key', 'clue', 'step'],
    hook: {
      text: 'You do not name a plant by guessing. You work through clues in order.',
      question: 'What would you look at first on a plant you had never seen?'
    },
    core: [
      { heading: 'One clue at a time', text: 'Start with the stem. Then the leaves. Then the edge. Then how they sit. Then the flower.' },
      { heading: 'Write each answer down', text: 'Square stem. Paired leaves. Toothed edge. Now you have four clues, not a feeling.' },
      { heading: 'Say what you are not sure about', text: 'If you cannot tell, write "not sure". A good herbalist writes down what she does not know.' }
    ],
    doing: 'Pick one plant. Work through all five clues and write each answer in your journal.',
    practice: [
      { ask: 'What do you look at first?', answer: 'The stem.', why: 'It is quick to check and it rules a lot out.' },
      { ask: 'You cannot tell if the edge is toothed. What do you write?', answer: '"Not sure."', why: 'A guess written as a fact is worse than a gap.' }
    ],
    check: [
      {
        prompt: 'What does it mean to key out a plant?',
        choices: ['Work through clues in order', 'Guess its name', 'Pick it and take it home', 'Draw it quickly'],
        answer: 0,
        feedback: [null, 'Guessing is what a key replaces.', 'You can key a plant without picking it.', 'Drawing helps, but is not keying.']
      },
      {
        prompt: 'You are not sure about a clue. The best thing to write is —',
        choices: ['Not sure', 'Your best guess as a fact', 'Nothing at all', 'A different plant name'],
        answer: 0,
        feedback: [null, 'A guess written as fact will mislead you later.', 'A blank tells you nothing next time.', 'That would be wrong on purpose.']
      },
      {
        prompt: 'Why write each clue down?',
        choices: ['Clues add up to an answer', 'To fill the page', 'To make it look neat', 'Because you must'],
        answer: 0,
        feedback: [null, 'The point is the answer, not the page.', 'Neat is nice but not the reason.', 'You do it because it works.']
      }
    ]
  },

  {
    id: 'hb-1-12',
    course: 'herbalism',
    module: 1,
    quarter: 1,
    week: 2,
    day: 3,
    standards: [],
    video: {
      id: 'w8Jkp4Lg2ao',
      url: 'https://www.youtube.com/watch?v=w8Jkp4Lg2ao',
      title: 'Yikes! Poisonous Plants! | Spot on Science',
      channel: 'NewsDepth',
      minutes: 4,
      verified: '2026-08-14',
      sourceGap: 'Alexis Nikole Nelson was checked seriously and REJECTED ON PURPOSE. She is a genuine Black American forager and belongs in this app, but her catalogue is built around finding and eating wild food. This is the safety lesson. A \'here is a snack I found\' video behind a lesson whose whole point is never taste anything without an adult would undercut the lesson. She belongs in Black Women in Medicine & Botany, or a later foraging lesson taught with an adult present.'
    },
    n: 12,
    title: 'Look-alikes, and the first rule',
    minutes: 35,
    words: ['look-alike', 'safe', 'sure'],
    hook: {
      text: 'Some plants look almost the same. One may be fine and one may not.',
      question: 'How sure would you need to be before you tasted a plant?'
    },
    core: [
      {
        heading: 'The first rule of the field',
        text: 'Never put any plant in your mouth unless a grown-up says yes. Not a leaf. Not a berry. Not once.'
      },
      {
        heading: 'Why the rule is so strict',
        text: 'Some plants have twins. They look the same to a new eye. Even grown-ups get them wrong.'
      },
      {
        heading: 'Being sure is a job, not a feeling',
        text: 'Sure means you checked the stem, the leaves, the edge and the flower. Feeling sure is not the same thing.'
      },
      {
        heading: 'What to do instead',
        text: 'Look. Draw. Write. Ask. Those four are always safe, and they are how you learn.'
      }
    ],
    doing: 'Find a plant you cannot name. Draw it and write four clues. Do not pick it.',
    practice: [
      { ask: 'You are almost sure a berry is safe. What do you do?', answer: 'Leave it. Ask a grown-up.', why: 'Almost sure is not sure. This rule has no "almost".' },
      { ask: 'What does being sure actually take?', answer: 'Checking every clue, one at a time.', why: 'Sure is work you did, not a feeling you had.' }
    ],
    check: [
      {
        prompt: 'When may you taste a plant you found?',
        choices: ['Only when a grown-up says yes', 'When you feel sure', 'When it smells nice', 'When it looks like mint'],
        answer: 0,
        feedback: [
          null,
          'Feeling sure is exactly how people get it wrong.',
          'Smell is not proof of anything.',
          'Look-alikes are the whole problem.'
        ]
      },
      {
        prompt: 'Why are look-alikes a problem?',
        choices: ['Two plants can look the same', 'They grow too fast', 'They have no flowers', 'They are hard to draw'],
        answer: 0,
        feedback: [null, 'Speed is not the issue.', 'Many do have flowers.', 'Drawing them is fine.']
      },
      {
        prompt: 'Which four things are always safe to do?',
        choices: ['Look, draw, write, ask', 'Pick, taste, chew, swallow', 'Guess and hope', 'Take it home and hide it'],
        answer: 0,
        feedback: [null, 'Three of those break the first rule.', 'Guessing is what the rule prevents.', 'Hiding it stops you asking.']
      }
    ]
  },

  {
    id: 'hb-1-13',
    course: 'herbalism',
    module: 8,
    quarter: 2,
    week: 7,
    day: 3,
    standards: [],
    video: {
      id: '4EnmiuKqBXI',
      url: 'https://www.youtube.com/watch?v=4EnmiuKqBXI',
      title: 'How to make a nature journal so you can record wildlife like a scientist',
      channel: 'Natural History Museum',
      minutes: 1,
      verified: '2026-08-14',
      sourceGap: 'Searched Outdoor Afro, Black Girl Environmentalist, Corina Newsome, Deja Perkins, the Wild Wonder nature-journaling conference and Black homeschool channels. The Black-led nature-journaling content found is adult conference talks and interviews, not a child-facing how-to.'
    },
    n: 13,
    title: 'Keeping a field journal',
    minutes: 30,
    words: ['journal', 'record', 'date'],
    hook: {
      text: 'A field journal is a tool, the same as a hand lens or a scale.',
      question: 'What would you need to write so you could find this plant again next year?'
    },
    core: [
      { heading: 'Date and place, always', text: 'Write the day and where you were. Without those, the rest is just a drawing.' },
      { heading: 'What you saw, not what you felt', text: 'Write "four white petals", not "lovely". One of those helps you next spring.' },
      { heading: 'Draw badly and often', text: 'A rough drawing you did beats a perfect photo you did not look at.' },
      { heading: 'Come back', text: 'Visit the same plant in a month. Write what changed. Noticing change is the whole skill.' }
    ],
    doing: 'Start a page for one plant. Date, place, four clues, a rough drawing. Go back in two weeks.',
    practice: [
      { ask: 'What two things must go on every page?', answer: 'The date and the place.', why: 'They let you return and compare.' },
      { ask: 'Why go back to the same plant?', answer: 'To see what has changed.', why: 'Change is what a field journal is really for.' }
    ],
    check: [
      {
        prompt: 'Every journal page needs —',
        choices: ['The date and the place', 'A perfect drawing', 'A photograph', 'A long story'],
        answer: 0,
        feedback: [null, 'Rough drawings are fine.', 'A photo is not required.', 'Short and clear beats long.']
      },
      {
        prompt: 'Which note is more useful?',
        choices: ['Four white petals, toothed leaves', 'A very lovely plant', 'I liked it', 'It was there'],
        answer: 0,
        feedback: [null, 'That will not help you find it again.', 'That is about you.', 'That says nothing at all.']
      },
      {
        prompt: 'Why visit the same plant again later?',
        choices: ['To record what changed', 'To pick it', 'To move it', 'To water it'],
        answer: 0,
        feedback: [null, 'You are watching, not harvesting.', 'Leave it where it grows.', 'Watering is not the point here.']
      }
    ]
  }
];

export const HERBALISM_Q1_META = {
  courseId: 'herbalism',
  quarter: 1,
  title: 'Meet the Plants',
  blurb: 'How a plant is built, how to look at one properly, and the first rule of the field.',
  lessons: HERBALISM_Q1
};
