// ---------------------------------------------------------------------------
// HERBALISM & BOTANY — MODULE 7 QUESTION BANK
// Herbs in History · Lessons 37–42 · Quarter 2, Weeks 5 and 6
//
// Ten questions per lesson, sixty in all. These are NOT asked at the end of a
// lesson. They are the pool the Day 4 weekly test draws from: three lessons at
// ten questions is a thirty-question pool, and buildWeeklyTest takes eight of
// them. They also feed the morning warm-up and the extra practice the practice
// gate serves when she misses more than one on a lesson check.
//
//   Week 5 pool — hb-m7-01, hb-m7-02, hb-m7-03  (30 questions)
//   Week 6 pool — hb-m7-04, hb-m7-05, hb-m7-06  (30 questions)
//
// Field shape matches src/data/assessments/herbalismM1Bank.js exactly:
// id, lesson, prompt, choices (four, all different), answer (0-3), feedback
// (four entries, null in the correct slot, a real sentence in every other),
// and why (never blank — it is what the review screen shows).
//
// ---- DISTRACTORS ----
//
// Where the payload is vocabulary, the wrong choices are the OTHER words from
// this module. A miss on "ginger is which part" that lands on BULB names the
// exact confusion, and the feedback names it back. Nothing here is filler.
//
// ---- LESSON 40 ----
//
// Every question on lesson 40 is about people, about how knowledge travelled,
// and about what it takes to make a record. Not one of them asks what a plant
// was used for, because the lesson does not teach that and the bank must not
// smuggle it back in. If a future editor adds a "which herb was used for X"
// question here, that is the failure this comment exists to prevent.
//
// ---- SAFETY ----
//
// No dosing language anywhere in the sixty. Two questions (t-hbm701e and
// t-hbm706j) deliberately test the opposite: naming a plant is not permission
// to touch it or taste it.
//
// ---- READING BAR ----
//
// Prompts kept plain and short. The long subject words — herbarium, specimen,
// rhizome, sorghum, midwife, oral tradition — live mostly in the choices and
// the feedback, which are not syllable-checked. Add these to the SUBJECT
// exemption set in scripts/check-assessment.mjs when this merges: herbarium,
// specimen, rhizome, sorghum, cowpea, midwife, forage, cultivate.
// ---------------------------------------------------------------------------

export const HERBALISM_M7_BANK = [
  // =========================================================================
  // LESSON 37 · hb-m7-01 · Before grocery stores and pharmacies
  // =========================================================================
  {
    id: 't-hbm701a',
    lesson: 'hb-m7-01',
    prompt: 'What does it mean to forage?',
    choices: [
      'To plant something and tend it',
      'To find food that grew on its own',
      'To dry a plant for winter',
      'To trade for food'
    ],
    answer: 1,
    feedback: [
      'That is to cultivate.',
      null,
      'Drying comes after you already have the plant.',
      'Trading is not the same as finding.'
    ],
    why: 'Foraging is going out and gathering what grew by itself.'
  },
  {
    id: 't-hbm701b',
    lesson: 'hb-m7-01',
    prompt: 'Nobody planted the weeds by the fence. What are they?',
    choices: [ 'A staple', 'A tradition','Cultivated', 'Wild plants'],
    answer: 3,
    feedback: [
      'A staple is the food a family eats most days.',
      'A tradition is something handed down.'
    ,
      'Cultivated means somebody planted it on purpose.',
      null],
    why: 'A wild plant came up on its own. Nobody chose that spot for it.'
  },
  {
    id: 't-hbm701c',
    lesson: 'hb-m7-01',
    prompt: 'Your garlic is in a pot because you put it there. That is what?',
    choices: [ 'Cultivating', 'A wild plant', 'A tradition','Foraging'],
    answer: 0,
    feedback: [
      null,
      'A wild plant is one nobody planted.',
      'A tradition is knowledge handed down.'
    ,
      'Foraging is finding, not planting.'],
    why: 'To cultivate is to plant something on purpose and look after it.'
  },
  {
    id: 't-hbm701d',
    lesson: 'hb-m7-01',
    prompt: 'It is 1820. How do you learn which plants are food?',
    choices: [
      'Guess from the colour'
    ,
      'Read the label',
      'Ask someone older who knows',
      'Taste a little and wait'],
    answer: 2,
    feedback: [
      'Colour tells you nothing about safety.'
    ,
      'Nothing had a label on it.',
      null,
      'Tasting to find out is how people got hurt.'],
    why: 'The knowledge lived in people. You got it by asking and watching.'
  },
  {
    id: 't-hbm701e',
    lesson: 'hb-m7-01',
    prompt: 'You can name a plant in the yard. Can you taste it?',
    choices: [
      'Yes, if it smells nice',
      'Only the green parts',
      'No. Ask a grown-up first, every time'
    ,
      'Yes, naming it means it is safe'],
    answer: 2,
    feedback: [
      'A good smell tells you nothing at all.',
      'Green does not mean safe.',
      null
    ,
      'Naming a plant is not the same as knowing it is safe.'],
    why: 'The first rule of the field. A plant you can name is still a plant you ask about.'
  },
  {
    id: 't-hbm701f',
    lesson: 'hb-m7-01',
    prompt: 'Gigi learned a plant name from her grandmother. What is that?',
    choices: ['A tradition', 'Foraging', 'Cultivating', 'A staple'],
    answer: 0,
    feedback: [
      null,
      'Foraging is going out and finding it.',
      'Cultivating is planting and tending it.',
      'A staple is a food, not a way of learning.'
    ],
    why: 'A tradition is something handed down from older people to younger ones.'
  },
  {
    id: 't-hbm701g',
    lesson: 'hb-m7-01',
    prompt: 'A family plants sorghum. What can they get from it?',
    choices: [
      'Nothing useful'
    ,
      'Only grain',
      'Only brooms',
      'Grain, sweet syrup and broom straw'],
    answer: 3,
    feedback: [
      'It was one of the most useful plants they had.'
    ,
      'They used far more of it than that.',
      'Brooms were one job out of several.',
      null],
    why: 'One useful plant did several jobs. That is why it got space in the field.'
  },
  {
    id: 't-hbm701h',
    lesson: 'hb-m7-01',
    prompt: 'A gourd is grown, then dried until hard. What is it now?',
    choices: ['A seed', 'A bowl or a dipper', 'Compost', 'A broom'],
    answer: 1,
    feedback: [
      'Its seeds are inside, but the gourd itself is the tool.',
      null,
      'It was too useful to throw on the heap.',
      'Brooms came from broomcorn, not gourds.'
    ],
    why: 'Before plastic, a dried gourd was a bowl, a dipper or a bottle.'
  },
  {
    id: 't-hbm701i',
    lesson: 'hb-m7-01',
    prompt: 'You survey the yard and write UNKNOWN by one plant. Is that wrong?',
    choices: [
      'No. UNKNOWN is a true answer',
      'Yes, guess a name instead',
      'Only if Gigi knows it'
    ,
      'Yes, always write something'],
    answer: 0,
    feedback: [
      null,
      'A guessed name in a notebook becomes a wrong fact later.',
      'It is true whether she knows it or not.'
    ,
      'Writing a made-up name is worse than writing nothing.'],
    why: 'A record says what you actually know. UNKNOWN is honest, and it gives you a job.'
  },
  {
    id: 't-hbm701j',
    lesson: 'hb-m7-01',
    prompt: 'What is a staple?',
    choices: [
      'A name handed down'
    ,
      'A plant nobody planted',
      'The food a family ate most days',
      'A plant used for rope'],
    answer: 2,
    feedback: [
      'That is a tradition.'
    ,
      'That is a wild plant.',
      null,
      'Rope plants were useful, but staples were the everyday food.'],
    why: 'Corn, rice and beans were staples. They were what stood between a family and hunger.'
  },

  // =========================================================================
  // LESSON 38 · hb-m7-02 · Kitchen physic
  // =========================================================================
  {
    id: 't-hbm702a',
    lesson: 'hb-m7-02',
    prompt: 'What part of a plant is cinnamon?',
    choices: ['A leaf', 'Bark', 'A seed', 'A root'],
    answer: 1,
    feedback: [
      'Leaves are what make a plant a herb.',
      null,
      'Seeds are things like mustard and cumin.',
      'Roots grow down. This grew on a trunk.'
    ],
    why: 'Cinnamon is the inner bark of a tree, peeled and rolled as it dries.'
  },
  {
    id: 't-hbm702b',
    lesson: 'hb-m7-02',
    prompt: 'Your ginger and turmeric are which part?',
    choices: [ 'Bark', 'Seeds','Bulbs', 'Rhizomes'],
    answer: 3,
    feedback: [
      'Bark is the skin of a stem or trunk.',
      'Seeds are what your corn gives you.'
    ,
      'A bulb is a packed ball of leaves, like garlic.',
      null],
    why: 'A rhizome is a fat stem growing sideways underground. It looks like a root but it is not.'
  },
  {
    id: 't-hbm702c',
    lesson: 'hb-m7-02',
    prompt: 'Garlic grows underground as a packed ball. What is it?',
    choices: [ 'A rhizome', 'A flower bud', 'Bark','A bulb'],
    answer: 3,
    feedback: [
      'A rhizome grows sideways, like your ginger.',
      'A flower bud is a closed flower, like a clove.',
      'Bark is the skin of a stem or a trunk.'
    ,
      null],
    why: 'A bulb is short leaves packed tight around a tiny stem.'
  },
  {
    id: 't-hbm702d',
    lesson: 'hb-m7-02',
    prompt: 'A clove is picked before it opens. What is it?',
    choices: ['A seed', 'A flower bud', 'A rhizome', 'A leaf'],
    answer: 1,
    feedback: [
      'Seeds come after the flower, not before it.',
      null,
      'A rhizome grows underground.',
      'Leaves are green and flat.'
    ],
    why: 'A bud is a flower still folded up. Cloves are picked closed.'
  },
  {
    id: 't-hbm702e',
    lesson: 'hb-m7-02',
    prompt: 'Dried mint leaves. Herb or spice?',
    choices: [ 'Both','Spice, because it is dried', 'Herb, because it is the leaf', 'Neither'],
    answer: 2,
    feedback: [
      'The leaf makes it a herb. Spices are the other parts.'
    ,
      'Drying does not change which part it is.',
      null,
      'It is one of the two. Look at the part.'],
    why: 'Herb means the leaf. Spice means bark, seed, bud, fruit or root.'
  },
  {
    id: 't-hbm702f',
    lesson: 'hb-m7-02',
    prompt: 'Black pepper is a small dried ball. What is it?',
    choices: [ 'A dried fruit', 'A flower bud', 'A piece of bark','A seed pod'],
    answer: 0,
    feedback: [
      null,
      'Cloves are the flower buds, not peppercorns.',
      'Bark comes off a trunk in sheets.'
    ,
      'A pod holds seeds. A peppercorn is the fruit itself.'],
    why: 'A peppercorn is the dried fruit of a climbing vine.'
  },
  {
    id: 't-hbm702g',
    lesson: 'hb-m7-02',
    prompt: 'You find a jar of dried leaves with no label. What do you know?',
    choices: [
      'That it is safe',
      'That it is a leaf, and no more',
      'Nothing at all'
    ,
      'Exactly which plant it is'],
    answer: 1,
    feedback: [
      'A jar with no label is never safe.',
      null,
      'You do know it is a leaf. That is something.'
    ,
      'A leaf shape alone is rarely enough to name it.'],
    why: 'The part is easy to see. The name needs a label.'
  },
  {
    id: 't-hbm702h',
    lesson: 'hb-m7-02',
    prompt: 'What did kitchen physic mean?',
    choices: [
      'A shop that sold spices',
      'A kind of stove'
    ,
      'A recipe for soup',
      'The plant know-how kept in a home kitchen'],
    answer: 3,
    feedback: [
      'It was what the household knew, not what a shop sold.',
      'Physic is about plants, not equipment.'
    ,
      'It was knowledge, not one dish.',
      null],
    why: 'Physic is an old word for plant know-how. Kitchen physic was the know-how kept at home.'
  },
  {
    id: 't-hbm702i',
    lesson: 'hb-m7-02',
    prompt: 'Corn kernels in a jar. Which plant part are they?',
    choices: ['Seeds', 'Bulbs', 'Rhizomes', 'Bark'],
    answer: 0,
    feedback: [
      null,
      'A bulb is packed leaves, like garlic.',
      'A rhizome is an underground stem, like ginger.',
      'Bark is tree skin.'
    ],
    why: 'Every kernel of corn is a seed. Plant one and see.'
  },
  {
    id: 't-hbm702j',
    lesson: 'hb-m7-02',
    prompt: 'Four pots on your step. How many different plant parts are you growing?',
    choices: ['One', 'Two', 'Three', 'Four'],
    answer: 2,
    feedback: [
      'Look again. Garlic and ginger are not the same kind of thing.',
      'There is a third one hiding.',
      null,
      'Ginger and turmeric are both rhizomes. That counts once.'
    ],
    why: 'A bulb (garlic), two rhizomes (ginger and turmeric) and a seed (corn). Three kinds.'
  },

  // =========================================================================
  // LESSON 39 · hb-m7-03 · Drying and storing for winter
  // =========================================================================
  {
    id: 't-hbm703a',
    lesson: 'hb-m7-03',
    prompt: 'A raisin keeps for a year. What is missing from it?',
    choices: [ 'Seeds','Sugar', 'Moisture', 'Skin'],
    answer: 2,
    feedback: [
      'Seeds are not what makes food spoil.'
    ,
      'A raisin is very sweet. The sugar stayed.',
      null,
      'It still has its skin.'],
    why: 'A raisin is a grape with the water taken out. That is the whole trick.'
  },
  {
    id: 't-hbm703b',
    lesson: 'hb-m7-03',
    prompt: 'Why does mould need water?',
    choices: [
      'It is alive, and living things need a drink',
      'It is made of water',
      'It cannot see without it',
      'It does not need water'
    ],
    answer: 0,
    feedback: [
      null,
      'It is a fungus, not a puddle.',
      'Mould has no eyes.',
      'Water is exactly what it needs.'
    ],
    why: 'Mould is a living fungus. Take the water away and it cannot get started.'
  },
  {
    id: 't-hbm703c',
    lesson: 'hb-m7-03',
    prompt: 'You seal damp mint in a bag. What grows in there?',
    choices: [ 'New roots', 'New leaves','Nothing', 'Mould'],
    answer: 3,
    feedback: [
      'A cut stem in a shut bag will not root.',
      'A picked stem does not make new leaves.'
    ,
      'Damp and sealed is the worst mix there is.',
      null],
    why: 'Water plus still air is what mould wants. Dry first, seal after.'
  },
  {
    id: 't-hbm703d',
    lesson: 'hb-m7-03',
    prompt: 'Why hang drying herbs somewhere dim?',
    choices: [
      'Dark makes them dry faster',
      'Sun fades the colour and takes the smell',
      'They are shy of light',
      'It stops them freezing'
    ],
    answer: 1,
    feedback: [
      'Sun dries faster. It also ruins them.',
      null,
      'Plants do not mind being seen.',
      'Freezing is not the problem here.'
    ],
    why: 'You want the water gone and the smell left behind. Sun takes both.'
  },
  {
    id: 't-hbm703e',
    lesson: 'hb-m7-03',
    prompt: 'Why hang bundles upside down instead of laying them flat?',
    choices: [
      'Air can get all around them',
      'Gravity dries the leaves',
      'It looks nicer',
      'The stems would snap'
    ],
    answer: 0,
    feedback: [
      null,
      'Gravity does not pull water out of a leaf.',
      'It does look nice. That is not the reason.',
      'A flat stem does not snap.'
    ],
    why: 'Moving air all around is what dries it fast, before mould can win.'
  },
  {
    id: 't-hbm703f',
    lesson: 'hb-m7-03',
    prompt: 'What does airtight mean?',
    choices: [
      'Full of holes'
    ,
      'Full of air',
      'Shut so no air gets in or out',
      'Very light'],
    answer: 2,
    feedback: [
      'Holes are exactly what it does not have.'
    ,
      'The opposite. A sealed jar keeps air out.',
      null,
      'Airtight is about sealing, not weight.'],
    why: 'An airtight jar keeps damp air away from your dried leaves.'
  },
  {
    id: 't-hbm703g',
    lesson: 'hb-m7-03',
    prompt: 'Should you store dried mint whole or crushed?',
    choices: [
      'Crushed, it packs smaller',
      'Whole, then crush it later',
      'It makes no difference',
      'Crushed, it dries better'
    ],
    answer: 1,
    feedback: [
      'It does pack smaller. It also loses its smell.',
      null,
      'It makes a big difference over months.',
      'It is already dry by then.'
    ],
    why: 'Crushing is what lets the smell out. Do it in your hand, not in the jar.'
  },
  {
    id: 't-hbm703h',
    lesson: 'hb-m7-03',
    prompt: 'What must go on the jar label?',
    choices: [
      'Just the date',
      'Nothing, you will remember'
    ,
      'Just the plant name',
      'The plant name and the date'],
    answer: 3,
    feedback: [
      'Then next year you will not know what it is.',
      'You will not. Nobody does.'
    ,
      'Then next year you will not know how old it is.',
      null],
    why: 'Name plus date. That is what turns a jar into a record.'
  },
  {
    id: 't-hbm703i',
    lesson: 'hb-m7-03',
    prompt: 'What does it mean to preserve food?',
    choices: [
      'To grow more of it',
      'To share it out'
    ,
      'To cook it',
      'To keep it from going bad'],
    answer: 3,
    feedback: [
      'Growing more is a different job.',
      'Sharing does not make it last.'
    ,
      'Cooking is one thing you might do. It is not preserving.',
      null],
    why: 'Preserving is anything that stops food spoiling. Drying is the oldest way there is.'
  },
  {
    id: 't-hbm703j',
    lesson: 'hb-m7-03',
    prompt: 'One bundle in your test went furry and black. What do you do?',
    choices: [
      'Cut the good bits off',
      'Bin it, unopened, and wash your hands',
      'Put it in the jar anyway'
    ,
      'Wash it and dry it again'],
    answer: 1,
    feedback: [
      'Mould spreads further than you can see.',
      null,
      'Nothing mouldy goes in a jar, ever.'
    ,
      'Once mould is in, it is in. Washing does not fix it.'],
    why: 'Mouldy food is never saved and never tasted. It goes in the bin and you wash up.'
  },

  // =========================================================================
  // LESSON 40 · hb-m7-04 · The granny midwives and the root doctors
  // Every question here is about people, knowledge and records. Read the
  // bank header before adding to this block.
  // =========================================================================
  {
    id: 't-hbm704a',
    lesson: 'hb-m7-04',
    prompt: 'What is a midwife?',
    choices: [
      'A doctor at a hospital',
      'A person who writes books'
    ,
      'A person who helps at a birth',
      'A person who knows local plants'],
    answer: 2,
    feedback: [
      'Midwives worked in homes, not hospitals.',
      'The books mostly came later, from other people.'
    ,
      null,
      'That is a root doctor or a herb woman.'],
    why: 'A midwife helps a mother when a baby is being born.'
  },
  {
    id: 't-hbm704b',
    lesson: 'hb-m7-04',
    prompt: 'Who was Mary Francis Hill Coley?',
    choices: [
      'A granny midwife in Albany, Georgia',
      'A doctor in Atlanta',
      'A writer from Alabama'
    ,
      'A herb woman in North Carolina'],
    answer: 0,
    feedback: [
      null,
      'She worked in homes, not in a hospital.',
      'Onnie Lee Logan was the Alabama one, and she told her story out loud.'
    ,
      'That was Emma Dupree, in Fountain, North Carolina.'],
    why: 'Mrs Coley helped over three thousand babies be born in Albany, Georgia.'
  },
  {
    id: 't-hbm704c',
    lesson: 'hb-m7-04',
    prompt: 'A film was made about Mrs Coley in 1952. Who keeps it now?',
    choices: ['Nobody', 'The Library of Congress', 'Her family only', 'It was lost'],
    answer: 1,
    feedback: [
      'It was thought important enough to save.',
      null,
      'It went much further than one family.',
      'It survived. That is the point of a record.'
    ],
    why: 'It was used to train midwives across the South, and it is kept as a national record.'
  },
  {
    id: 't-hbm704d',
    lesson: 'hb-m7-04',
    prompt: 'In 1930 a Georgia family lived far from any doctor. Who came?',
    choices: [
      'Nobody',
      'A nurse from the city'
    ,
      'A hospital doctor',
      'The granny midwife nearby'],
    answer: 3,
    feedback: [
      'Babies were born. Someone was there.',
      'There was no such service on those roads.'
    ,
      'The hospital was miles off, and often closed to them.',
      null],
    why: 'For a long time these women delivered most of the babies in the rural South.'
  },
  {
    id: 't-hbm704e',
    lesson: 'hb-m7-04',
    prompt: 'Knowledge passed on by talking and watching is called what?',
    choices: [ 'Oral tradition', 'A generation', 'An interview','A record'],
    answer: 0,
    feedback: [
      null,
      'A generation is one step in a family.',
      'An interview is how you turn one into the other.'
    ,
      'A record is written down and dated.'],
    why: 'Oral tradition is knowledge carried in people, never on paper.'
  },
  {
    id: 't-hbm704f',
    lesson: 'hb-m7-04',
    prompt: 'What was a root doctor?',
    choices: [
      'Someone who dug wells'
    ,
      'A tree surgeon',
      'Someone who knew their local plants very well',
      'A hospital doctor'],
    answer: 2,
    feedback: [
      'The word root here means plants, not digging.'
    ,
      'Nothing to do with tree surgery.',
      null,
      'People went to root doctors because a hospital doctor was far off.'],
    why: 'It was a Southern name for a person who knew the plants of their county better than anyone.'
  },
  {
    id: 't-hbm704g',
    lesson: 'hb-m7-04',
    prompt: 'The last person who knows a thing dies. No one wrote it down. What now?',
    choices: [
      'It was never real'
    ,
      'It is in a library',
      'It is lost',
      'It comes back later'],
    answer: 2,
    feedback: [
      'It was real. It was just never written.'
    ,
      'A library only holds what somebody wrote.',
      null,
      'Lost knowledge does not come back on its own.'],
    why: 'This is why asking matters. An interview is how oral tradition gets saved.'
  },
  {
    id: 't-hbm704h',
    lesson: 'hb-m7-04',
    prompt: 'Why was so little of this written down at the time?',
    choices: [
      'Reading was kept from many of them by law',
      'It was a secret',
      'They forgot it too fast'
    ,
      'Nobody thought it mattered'],
    answer: 0,
    feedback: [
      null,
      'It was not secret. Whole communities used it.',
      'They held it for a lifetime. That was the problem when they died.'
    ,
      'People walked miles to ask these women. It mattered plenty.'],
    why: 'For a long time it was against the law in the South to teach enslaved people to read.'
  },
  {
    id: 't-hbm704i',
    lesson: 'hb-m7-04',
    prompt: 'What makes your interview notes a record and not just notes?',
    choices: [
      'How long they are',
      'Using a pen, not a pencil'
    ,
      'Neat handwriting',
      'The name, the place and the date on them'],
    answer: 3,
    feedback: [
      'A short dated page beats ten undated ones.',
      'Pen or pencil, it still needs a date.'
    ,
      'Neat helps. It is not what makes it count.',
      null],
    why: 'Who, where and when. Without those three, nobody later can use it.'
  },
  {
    id: 't-hbm704j',
    lesson: 'hb-m7-04',
    prompt: 'Gigi names a plant her own grandma grew. What do you do?',
    choices: [
      'Go and find some',
      'Write the name down and stop there',
      'Try a little',
      'Look up what it does'
    ],
    answer: 1,
    feedback: [
      'Today the job is the record, not the plant.',
      null,
      'We never try anything. This lesson is history.',
      'We study who these people were. We do not copy them.'
    ],
    why: 'This lesson is history, not instructions. Write it, date it, and leave the plant alone.'
  },

  // =========================================================================
  // LESSON 41 · hb-m7-05 · Plants that crossed the ocean
  // =========================================================================
  {
    id: 't-hbm705a',
    lesson: 'hb-m7-05',
    prompt: 'Okra, sorghum and black-eyed peas came from where?',
    choices: [ 'Africa', 'Europe', 'Mexico','Georgia'],
    answer: 0,
    feedback: [
      null,
      'Okra reached Europe from Africa as well.',
      'Corn came from Mexico. These did not.'
    ,
      'They grow here now. They did not start here.'],
    why: 'They crossed the Atlantic on slave ships, with the people who knew them.'
  },
  {
    id: 't-hbm705b',
    lesson: 'hb-m7-05',
    prompt: 'Which plant gives you black-eyed peas?',
    choices: ['Sorghum', 'Okra', 'The cowpea', 'Rice'],
    answer: 2,
    feedback: [
      'Sorghum is a tall grain, used for syrup.',
      'Okra grows as a green pod.',
      null,
      'Rice is the grain grown in flooded fields.'
    ],
    why: 'Black-eyed peas are the seed of the cowpea, a West African plant.'
  },
  {
    id: 't-hbm705c',
    lesson: 'hb-m7-05',
    prompt: 'Where did the English word okra come from?',
    choices: [
      'Spanish'
    ,
      'An African language',
      'Latin',
      'A farmer named Okra'],
    answer: 1,
    feedback: [
      'It reached English from Africa, not Spain.'
    ,
      null,
      'Plants have Latin names, but this word is not one.',
      'It is not named after a person.'],
    why: 'The word came with the plant and the people. It shows up in Virginia writing in 1679.'
  },
  {
    id: 't-hbm705d',
    lesson: 'hb-m7-05',
    prompt: 'Peanuts came from South America. How did they get to Georgia?',
    choices: [
      'From Europe',
      'They have always been here'
    ,
      'Straight from South America',
      'By way of Africa, with enslaved people'],
    answer: 3,
    feedback: [
      'Europe was not the route for peanuts.',
      'Nothing about this crop has always been here.'
    ,
      'They went east first, then came back across.',
      null],
    why: 'They travelled to Africa first. Goober, the old Southern word for peanut, came from an African language.'
  },
  {
    id: 't-hbm705e',
    lesson: 'hb-m7-05',
    prompt: 'What is a staple crop?',
    choices: [
      'A crop that is rare',
      'A crop used for rope'
    ,
      'A crop grown for flowers',
      'The crop a family eats most days'],
    answer: 3,
    feedback: [
      'A staple is the opposite of rare. It is the everyday one.',
      'Rope plants were useful, but not the daily food.'
    ,
      'Flowers were not what kept people fed.',
      null],
    why: 'Rice, corn and peas were staples. They were the everyday food.'
  },
  {
    id: 't-hbm705f',
    lesson: 'hb-m7-05',
    prompt: 'Someone hands you rice seed and a wet field. What else do you need?',
    choices: [
      'Nothing, seed grows itself',
      'The skill to build and flood a rice field',
      'Drier ground',
      'A bigger bag of seed'
    ],
    answer: 1,
    feedback: [
      'A rice field has to be made. It does not happen on its own.',
      null,
      'Rice is grown in flooded fields on purpose.',
      'More seed with no skill is still no rice.'
    ],
    why: 'Knowledge travels in people. That is the whole lesson.'
  },
  {
    id: 't-hbm705g',
    lesson: 'hb-m7-05',
    prompt: 'Where was African rice first grown?',
    choices: [
      'In Brazil'
    ,
      'In Georgia',
      'On the Niger River in Africa',
      'In China'],
    answer: 2,
    feedback: [
      'It reached Brazil on ships, from Africa.'
    ,
      'Georgia rice fields came thousands of years later.',
      null,
      'Asia has its own rice. This is a different one.'],
    why: 'African rice was grown on the Upper Niger about three thousand years ago.'
  },
  {
    id: 't-hbm705h',
    lesson: 'hb-m7-05',
    prompt: 'Families say women braided seeds into their hair. How do we know this?',
    choices: [
      'Families have told it for generations',
      'Somebody guessed',
      'A photograph shows it'
    ,
      'It was written down at the time'],
    answer: 0,
    feedback: [
      null,
      'A story kept for generations is not a guess.',
      'There were no cameras on those ships.'
    ,
      'Nobody was writing down what those women did.'],
    why: 'It is oral history. The same kind of knowledge you were collecting yesterday.'
  },
  {
    id: 't-hbm705i',
    lesson: 'hb-m7-05',
    prompt: 'What is sorghum?',
    choices: [
      'A flooded-field crop'
    ,
      'A tall African grain',
      'A green pod',
      'A kind of pea'],
    answer: 1,
    feedback: [
      'That is rice.'
    ,
      null,
      'That is okra.',
      'That is the cowpea.'],
    why: 'Sorghum is an African grain. Georgia farms still boil its juice into syrup.'
  },
  {
    id: 't-hbm705j',
    lesson: 'hb-m7-05',
    prompt: 'A Georgia cookbook from 1850 has okra in it. What does that show?',
    choices: [
      'The book made it up',
      'Okra came from Europe'
    ,
      'Okra is native to Georgia',
      'Okra had already crossed the ocean'],
    answer: 3,
    feedback: [
      'Okra was common across the South by then.',
      'Okra reached Europe from Africa too.'
    ,
      'Okra is African. It is not from Georgia.',
      null],
    why: 'The plant was here because people were brought here. They travelled together.'
  },

  // =========================================================================
  // LESSON 42 · hb-m7-06 · Build a flower press
  // =========================================================================
  {
    id: 't-hbm706a',
    lesson: 'hb-m7-06',
    prompt: 'What is a herbarium?',
    choices: [
      'A library of pressed plants on sheets',
      'A jar of dried leaves',
      'A book about plants'
    ,
      'A garden of growing herbs'],
    answer: 0,
    feedback: [
      null,
      'That is storage. A herbarium keeps whole pressed plants.',
      'A book has no plants in it.'
    ,
      'The plants in a herbarium are picked and pressed.'],
    why: 'A herbarium is a room of pressed, dried plants, each glued to a labelled sheet.'
  },
  {
    id: 't-hbm706b',
    lesson: 'hb-m7-06',
    prompt: 'Why does a pressed plant last for centuries?',
    choices: [
      'The glue stops rot'
    ,
      'It was never alive',
      'The water is gone',
      'It is kept cold'],
    answer: 2,
    feedback: [
      'Glue holds it down. It does not dry it.'
    ,
      'It was alive. Somebody picked it.',
      null,
      'Herbarium rooms are not cold rooms.'],
    why: 'Same rule as drying herbs. No water means no mould.'
  },
  {
    id: 't-hbm706c',
    lesson: 'hb-m7-06',
    prompt: 'What four things must a label say?',
    choices: [
      'What and where only',
      'Just the name'
    ,
      'What, where, when, who',
      'Colour, size, smell, shape'],
    answer: 2,
    feedback: [
      'Without when and who, nobody can use it later.',
      'A name on its own is not a record.'
    ,
      null,
      'Those are things you can see in the specimen itself.'],
    why: 'What it is, where exactly, the date, and the collector. Four lines, every time.'
  },
  {
    id: 't-hbm706d',
    lesson: 'hb-m7-06',
    prompt: 'A pressed flower with no label is what?',
    choices: [ 'A pretty leaf', 'A record','A specimen', 'Data'],
    answer: 0,
    feedback: [
      null,
      'A record has to be dated. This is not.'
    ,
      'A specimen comes with its label.',
      'Data needs the where and the when.'],
    why: 'The plant is half of it. The label is the other half.'
  },
  {
    id: 't-hbm706e',
    lesson: 'hb-m7-06',
    prompt: 'Your name on the label. What are you called there?',
    choices: [ 'The press', 'The herbarium','The specimen', 'The collector'],
    answer: 3,
    feedback: [
      'The press is the two boards.',
      'A herbarium is a whole room of sheets.'
    ,
      'The specimen is the plant itself.',
      null],
    why: 'The collector is the person who picked it. That is part of the science.'
  },
  {
    id: 't-hbm706f',
    lesson: 'hb-m7-06',
    prompt: 'Why turn one leaf over in the press?',
    choices: [
      'It dries faster that way',
      'So the back of a leaf can be seen',
      'It looks better',
      'To save room'
    ],
    answer: 1,
    feedback: [
      'Both sides dry at the same speed.',
      null,
      'It is not for looks. It is for looking.',
      'It takes the same room either way.'
    ],
    why: 'The back of a leaf carries clues the front does not. Real herbaria always do this.'
  },
  {
    id: 't-hbm706g',
    lesson: 'hb-m7-06',
    prompt: 'Scientists found some plants now flower earlier. How did they find out?',
    choices: [
      'They read dates on old herbarium labels',
      'They asked farmers',
      'They watched one plant for a year'
    ,
      'They guessed'],
    answer: 0,
    feedback: [
      null,
      'Memory is not a record. Labels are.',
      'One year tells you nothing about a hundred.'
    ,
      'This is a measured finding, not a hunch.'],
    why: 'An 1899 sheet and a sheet from today, side by side. Two labels, one finding.'
  },
  {
    id: 't-hbm706h',
    lesson: 'hb-m7-06',
    prompt: 'You leave damp newspaper in the press. What happens?',
    choices: [
      'The label smudges'
    ,
      'It dries faster',
      'The plant can go mouldy',
      'Nothing'],
    answer: 2,
    feedback: [
      'A smudge is not the real problem here.'
    ,
      'Damp paper holds water in, not out.',
      null,
      'Something definitely happens.'],
    why: 'Damp paper keeps the water near the plant. Swap it out and keep drying.'
  },
  {
    id: 't-hbm706i',
    lesson: 'hb-m7-06',
    prompt: 'You cannot name the plant you pressed. Is it worth keeping?',
    choices: [
      'No, throw it out',
      'Yes. Write UNKNOWN and keep the rest of the label',
      'Only if it is pretty',
      'Guess a name so it looks finished'
    ],
    answer: 1,
    feedback: [
      'The where and when are still good data.',
      null,
      'Looks are not what makes a specimen useful.',
      'A guessed name becomes a wrong fact later.'
    ],
    why: 'Somebody can name it later. Nobody can add the date later.'
  },
  {
    id: 't-hbm706j',
    lesson: 'hb-m7-06',
    prompt: 'Before you pick anything for the press, what do you do?',
    choices: [
      'Take the whole plant',
      'Taste a bit to check'
    ,
      'Pick first, ask after',
      'Ask a grown-up first, every time'],
    answer: 3,
    feedback: [
      'Never take the last one. Leave the patch as you found it.',
      'Nothing in this course is ever tasted to check.'
    ,
      'Some plants sting, and some belong to someone else.',
      null],
    why: 'Gigi says yes first. Gloves for prickly plants, and nothing is ever tasted.'
  }
];

export function itemsForLesson(lessonId) {
  return HERBALISM_M7_BANK.filter((q) => q.lesson === lessonId);
}

export function itemsForLessons(lessonIds) {
  const want = new Set(lessonIds);
  return HERBALISM_M7_BANK.filter((q) => want.has(q.lesson));
}

export default HERBALISM_M7_BANK;
