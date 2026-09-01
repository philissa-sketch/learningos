// ---------------------------------------------------------------------------
// HERBALISM & BOTANY — MODULE 11 QUESTION BANK
// The Apothecary · Lessons 61–66 · Quarter 3, Weeks 5 and 6
//
// Ten questions per lesson, sixty in all. These are NOT asked at the end of a
// lesson. They are the pool the Day 4 weekly test draws from: three lessons at
// ten questions is a thirty-question pool, and buildWeeklyTest takes eight.
// They also feed the morning warm-up and the extra practice the practice gate
// serves when she misses more than one on a lesson check.
//
//   Week 5 pool — hb-m11-01, hb-m11-02, hb-m11-03  (30 questions)
//   Week 6 pool — hb-m11-04, hb-m11-05, hb-m11-06  (30 questions)
//
// Field shape matches src/data/assessments/herbalismM1Bank.js exactly: id,
// lesson, prompt, choices (four, all different), answer (0-3), feedback (four
// entries, null in the correct slot, a real sentence in every other), and why
// (never blank — it is what the review screen shows).
//
// ---- DISTRACTORS ----
//
// Where the payload is vocabulary, the wrong choices are the OTHER words from
// this module. A miss on "hot water poured over leaves" that lands on DECOCTION
// names the exact confusion, and the feedback names it back. Nothing is filler.
//
// ---- SAFETY. READ THIS BEFORE ADDING A QUESTION HERE ----
//
// This module is technique, measurement and record-keeping, and the safety line
// is tighter here than anywhere else in the course. Not one question in these
// sixty asks what a plant is for, what it does to a person, or how much of
// anything anybody should take. The grams and millilitres in this bank are
// laboratory quantities in an extraction experiment, each sitting beside a
// temperature and a time — the same way a gram of salt sits in a dissolving
// experiment. If a future editor adds a "which herb helps with X" question, or
// an amount aimed at a person rather than at a glass, that is the failure this
// comment exists to prevent.
//
// Four questions test the opposite on purpose: t-hbm1101j, t-hbm1103j,
// t-hbm1104j and t-hbm1105i all check that she knows who does the hot work,
// what never gets tasted, and what happens to anything mouldy.
//
// ---- READING BAR ----
//
// Quarter 3 caps: prompts up to fourteen words a sentence, answer choices up to
// fifteen words, long-word rate up to ten percent. Written to sit inside those
// and above Quarter 1's level, which is the other direction the guard runs in.
// The long subject words — infusion, decoction, maceration, extraction,
// evaporation, apothecary, millilitre, spoilage — live mostly in the choices
// and the feedback and each carries a glossary card in the lesson. Add them to
// the SUBJECT exemption set in scripts/check-assessment.mjs when this merges.
// ---------------------------------------------------------------------------

export const HERBALISM_M11_BANK = [
  // =========================================================================
  // LESSON 61 · hb-m11-01 · The tools on the bench
  // =========================================================================
  {
    id: 't-hbm1101a',
    lesson: 'hb-m11-01',
    prompt: 'What are the five jobs a working bench has to do?',
    choices: [
      'Crush, weigh, separate, store and record',
      'Wash, dry, cut, cook and eat',
      'Plant, water, weed, pick and sell',
      'Read, write, draw, sort and file'
    ],
    answer: 0,
    feedback: [
      null,
      'Cooking is a different room and a different job.',
      'That is the garden. This is the bench.',
      'Recording is one of the five, but only one.'
    ],
    why: 'Every tool on the bench is there because it does one of those five and nothing else.'
  },
  {
    id: 't-hbm1101b',
    lesson: 'hb-m11-01',
    prompt: 'Which tool is built for crushing?',
    choices: ['A scale', 'A sieve', 'A mortar and pestle', 'A funnel'],
    answer: 2,
    feedback: [
      'A scale measures mass and moves nothing.',
      'A sieve separates. It cannot crush anything.',
      null,
      'A funnel guides what you pour into a narrow jar.'
    ],
    why: 'The pestle does the crushing and the mortar holds it all still while you work.'
  },
  {
    id: 't-hbm1101c',
    lesson: 'hb-m11-01',
    prompt: 'Ground rosemary still has woody stems in it. What now?',
    choices: [
      'Weigh it again',
      'Tip it through a sieve',
      'Pour it into a funnel',
      'Grind it much harder'
    ],
    answer: 1,
    feedback: [
      'Weighing tells you how much, not which bits are which.',
      null,
      'A funnel moves it along without sorting anything out.',
      'Grinding harder gives you smaller stems, not fewer stems.'
    ],
    why: 'Separating is a job of its own, and a sieve is the tool built for it.'
  },
  {
    id: 't-hbm1101d',
    lesson: 'hb-m11-01',
    prompt: 'Why is a mortar made of heavy stone?',
    choices: [
      'So it looks old and important',
      'So the herbs stay cold inside it',
      'So it can go in the oven',
      'So it stays put while you press and turn'
    ],
    answer: 3,
    feedback: [
      'It does look handsome. That is not why it is heavy.',
      'Stone is not keeping anything cold on a warm counter.',
      'Nothing about grinding involves an oven.',
      null
    ],
    why: 'A light bowl skids away from the pestle, so the weight is part of the tool.'
  },
  {
    id: 't-hbm1101e',
    lesson: 'hb-m11-01',
    prompt: 'Crushing a dried leaf gives you more of what?',
    choices: ['Colour', 'Mass', 'Water', 'Surface area'],
    answer: 3,
    feedback: [
      'The colour was in there already, waiting to get out.',
      'The mass is the same before and after. It only changed shape.',
      'Crushing adds no water to anything.',
      null
    ],
    why: 'One piece becomes many pieces, so there is far more outside for water to reach.'
  },
  {
    id: 't-hbm1101f',
    lesson: 'hb-m11-01',
    prompt: 'Why does a tea bag brew faster than a whole leaf?',
    choices: [
      'The paper heats the water up',
      'The leaf inside was cut into tiny pieces',
      'Bags hold hotter water',
      'Whole leaves are always old'
    ],
    answer: 1,
    feedback: [
      'Paper heats nothing. The kettle did that.',
      null,
      'It is the same water either way.',
      'A whole leaf can be perfectly fresh and still be slow.'
    ],
    why: 'Small pieces mean more surface touching the water, so extraction is faster.'
  },
  {
    id: 't-hbm1101g',
    lesson: 'hb-m11-01',
    prompt: 'What did the word apothecary originally mean?',
    choices: ['A garden', 'A doctor', 'A storehouse', 'A stone bowl'],
    answer: 2,
    feedback: [
      'The growing happened elsewhere. This was where things were stored.',
      'It came to mean the person later. The word started with the room.',
      null,
      'That is a mortar, and it was one thing kept in that room.'
    ],
    why: 'It comes from a Greek word for a storehouse, so the room was named for its jars.'
  },
  {
    id: 't-hbm1101h',
    lesson: 'hb-m11-01',
    prompt: 'Why weigh the rosemary before you grind it?',
    choices: [
      'So you can check afterwards that nothing went missing',
      'Because grinding makes it heavier',
      'Because the scale only works on whole leaves',
      'So the mortar does not slide'
    ],
    answer: 0,
    feedback: [
      null,
      'Grinding changes the shape and leaves the mass alone.',
      'A scale weighs powder perfectly well.',
      'That is what your other hand is for.'
    ],
    why: 'A starting number is what lets you find out later whether anything was lost.'
  },
  {
    id: 't-hbm1101i',
    lesson: 'hb-m11-01',
    prompt: 'What is a funnel for?',
    choices: [
      'Sorting big pieces from small ones',
      'Guiding what you pour into a narrow jar',
      'Crushing seeds and bark',
      'Weighing small amounts'
    ],
    answer: 1,
    feedback: [
      'That is a sieve, and it is a different job.',
      null,
      'Nothing gets crushed in a funnel.',
      'A funnel has no numbers on it anywhere.'
    ],
    why: 'It is the STORE job: getting things into the jar instead of onto the counter.'
  },
  {
    id: 't-hbm1101j',
    lesson: 'hb-m11-01',
    prompt: 'You have ground a fine powder on the bench. May you taste it?',
    choices: [
      'Only a very small crumb',
      'Yes, you ground it yourself',
      'Yes, if it smells good',
      'No. Nothing on this bench is tasted'
    ],
    answer: 3,
    feedback: [
      'A crumb is still tasting, and the answer is still no.',
      'Grinding it does not make it yours to taste.',
      'A good smell tells you nothing at all about safety.',
      null
    ],
    why: 'The bench rule holds all module: you handle, weigh and label, and Gigi decides the rest.'
  },

  // =========================================================================
  // LESSON 62 · hb-m11-02 · Weighing and measuring properly
  // =========================================================================
  {
    id: 't-hbm1102a',
    lesson: 'hb-m11-02',
    prompt: 'What does mass tell you?',
    choices: [
      'How much matter is really in it',
      'How old something is',
      'How strong the smell is',
      'How much room something takes up'
    ],
    answer: 0,
    feedback: [
      null,
      'A scale cannot tell you the age of anything.',
      'Smell has almost no mass at all.',
      'That is volume, and it is the other question.'
    ],
    why: 'Mass is how much matter is there, and a scale is what measures it.'
  },
  {
    id: 't-hbm1102b',
    lesson: 'hb-m11-02',
    prompt: 'What does volume tell you?',
    choices: [
      'How dry it is',
      'How fresh it is',
      'How much room something takes up',
      'How much matter is in it'
    ],
    answer: 2,
    feedback: [
      'A jug says nothing about how dry a thing is.',
      'Freshness needs a date, not a jug.',
      null,
      'That is mass, and a cup cannot measure it.'
    ],
    why: 'Volume is space. A cup of feathers and a cup of sand are the same volume.'
  },
  {
    id: 't-hbm1102c',
    lesson: 'hb-m11-02',
    prompt: 'Which measurement could somebody else repeat exactly tomorrow?',
    choices: ['12 grams on a scale', 'A small handful', 'A good pinch', 'One heaped cup'],
    answer: 0,
    feedback: [
      null,
      'Your hand and my hand are not the same size.',
      'A pinch is a guess wearing a name.',
      'Heaped by whose hand? That number moves every time.'
    ],
    why: 'A measurement only counts if somebody else can land on the same number.'
  },
  {
    id: 't-hbm1102d',
    lesson: 'hb-m11-02',
    prompt: 'What does the tare button on a scale do?',
    choices: [
      'It saves the last number for you',
      'It turns the scale off',
      'It sets the display to zero so the jar is not counted',
      'It changes grams into millilitres'
    ],
    answer: 2,
    feedback: [
      'Nothing is saved. That is what your log is for.',
      'The scale stays on. It just forgets what is already there.',
      null,
      'Grams and millilitres measure two different things.'
    ],
    why: 'Tare it with the empty jar on, and the next number you read is the plant alone.'
  },
  {
    id: 't-hbm1102e',
    lesson: 'hb-m11-02',
    prompt: 'You measure 100 millilitres of water. About what does it weigh?',
    choices: ['10 grams', '100 grams', '500 grams', '1 gram'],
    answer: 1,
    feedback: [
      'That is ten times too light for that much water.',
      null,
      'Half a kilogram of water would fill a much bigger jug.',
      'One gram of water is barely a drip.'
    ],
    why: 'Water is the tidy one: 100 millilitres comes out at very nearly 100 grams.'
  },
  {
    id: 't-hbm1102f',
    lesson: 'hb-m11-02',
    prompt: 'One cup is packed down hard and one is spooned in loosely. Which holds more mint?',
    choices: [
      'The loose one',
      'They hold the same',
      'You could never tell',
      'The packed one'
    ],
    answer: 3,
    feedback: [
      'Loose leaves leave gaps of air where more mint could have gone.',
      'Same space, but not the same amount of leaf inside that space.',
      'You can tell exactly, as soon as both go on the scale.',
      null
    ],
    why: 'The volume was equal and the mass was not, which is why the scale settles it.'
  },
  {
    id: 't-hbm1102g',
    lesson: 'hb-m11-02',
    prompt: 'You write 65 in your log with no unit after it. What is wrong?',
    choices: [
      'The scale will lose the reading',
      'Nothing at all is wrong',
      'Sixty-five is far too big a number',
      'Nobody can tell later what 65 was measuring'
    ],
    answer: 3,
    feedback: [
      'The scale forgets everything the moment you lift the bowl.',
      'A number with no unit is not yet a measurement.',
      'The size of the number is not the problem here.',
      null
    ],
    why: 'Grams, millilitres or minutes? Without the unit the number cannot be used again.'
  },
  {
    id: 't-hbm1102h',
    lesson: 'hb-m11-02',
    prompt: 'Your three cup scoops all weighed something different. What does that show?',
    choices: [
      'That the scale is broken',
      'That a cup is not a reliable measurement',
      'That the mint was drying out',
      'That you did it badly'
    ],
    answer: 1,
    feedback: [
      'The scale is fine, and it is the thing that showed you the problem.',
      null,
      'Nothing dried out in the two minutes that took.',
      'You did it carefully. The cup is what let you down.'
    ],
    why: 'Three honest scoops and three different masses is exactly why bakers weigh.'
  },
  {
    id: 't-hbm1102i',
    lesson: 'hb-m11-02',
    prompt: 'Which tool measures the volume of a liquid?',
    choices: ['A mortar', 'A scale', 'A jug marked in millilitres', 'A sieve'],
    answer: 2,
    feedback: [
      'A mortar is for crushing and holds no marks.',
      'A scale gives you mass, which is the other question.',
      null,
      'A sieve separates, and liquid runs straight through it.'
    ],
    why: 'Read it on a flat table with your eye level with the mark, not from above.'
  },
  {
    id: 't-hbm1102j',
    lesson: 'hb-m11-02',
    prompt: 'Why zero the scale before you weigh anything?',
    choices: [
      'So it starts honest, with nothing counted already',
      'So it warms up first',
      'So it will weigh in grams',
      'So it remembers the last reading'
    ],
    answer: 0,
    feedback: [
      null,
      'A kitchen scale needs no warming up.',
      'The unit is chosen with a different button.',
      'You do the remembering, in the log.'
    ],
    why: 'A scale that starts at anything but zero is wrong by that much all day.'
  },

  // =========================================================================
  // LESSON 63 · hb-m11-03 · Drying, and why it works
  // =========================================================================
  {
    id: 't-hbm1103a',
    lesson: 'hb-m11-03',
    prompt: '50 grams of fresh mint dries down to 10 grams. What left it?',
    choices: ['Colour', 'Water, as vapour', 'Smell', 'Nothing at all'],
    answer: 1,
    feedback: [
      'The colour fades a little, but colour weighs almost nothing.',
      null,
      'A little smell goes as well. Not forty grams of it.',
      'Forty grams went somewhere, and the scale proves it.'
    ],
    why: 'Mass that goes missing while something dries left as water vapour into the air.'
  },
  {
    id: 't-hbm1103b',
    lesson: 'hb-m11-03',
    prompt: 'About how much of a fresh leaf is water?',
    choices: ['About a tenth', 'About a quarter', 'About half', 'About four fifths'],
    answer: 3,
    feedback: [
      'Far more than that, which is why an armful dries to one jar.',
      'Still too little. Weigh it before and after and see.',
      'Closer, but a leaf is wetter than that.',
      null
    ],
    why: 'Roughly four fifths, the same as a grape, which is why a raisin is so small.'
  },
  {
    id: 't-hbm1103c',
    lesson: 'hb-m11-03',
    prompt: 'How do you know for certain that the drying has finished?',
    choices: [
      'The mass stops changing from one day to the next',
      'A week has gone by',
      'It looks about right',
      'The colour has gone'
    ],
    answer: 0,
    feedback: [
      null,
      'A week is a guess. Some batches take four days and some take ten.',
      'Looking is where people go wrong. Weighing is not.',
      'Losing colour means it sat in the light, not that it is dry.'
    ],
    why: 'A number that has stopped moving means there is no water left to leave.'
  },
  {
    id: 't-hbm1103d',
    lesson: 'hb-m11-03',
    prompt: 'Why does Gigi slice ginger thin before it goes on the tray?',
    choices: [
      'It looks neater that way',
      'Thin slices weigh less',
      'Water has a shorter way out of a thin slice',
      'Thick pieces hold too much heat'
    ],
    answer: 2,
    feedback: [
      'It does look neater. That is not the reason.',
      'The mass is the same whether it is sliced or not.',
      null,
      'Heat is not what is trapped in there. Water is.'
    ],
    why: 'Water must reach the surface before it can leave, so thin dries and thick goes mouldy.'
  },
  {
    id: 't-hbm1103e',
    lesson: 'hb-m11-03',
    prompt: 'Which conditions dry herbs fastest?',
    choices: [
      'Warm moving air',
      'Sealed still air',
      'Cold damp air',
      'Still humid air'
    ],
    answer: 0,
    feedback: [
      null,
      'Sealed air fills with vapour and the drying stops dead.',
      'Cold and damp is the slowest place in the house.',
      'Still air sits there getting damper and takes up no more.'
    ],
    why: 'Warm air takes up more water, and moving air carries it away instead of holding it there.'
  },
  {
    id: 't-hbm1103f',
    lesson: 'hb-m11-03',
    prompt: 'You seal mint in a bag while it is still a little damp. What grows?',
    choices: ['Nothing', 'New leaves', 'Mould', 'New roots'],
    answer: 2,
    feedback: [
      'Damp and sealed is the worst mix there is.',
      'A picked stem makes no new leaves.',
      null,
      'A cut stem shut in a bag will not root.'
    ],
    why: 'Mould needs only a trace of water, and a sealed bag keeps every bit of it in there.'
  },
  {
    id: 't-hbm1103g',
    lesson: 'hb-m11-03',
    prompt: 'What does brittle mean?',
    choices: ['Bendy and soft', 'Dry enough to snap', 'Sticky', 'Heavy'],
    answer: 1,
    feedback: [
      'Bending is what a damp stem does.',
      null,
      'Sticky means there is still moisture in there.',
      'A dried stem is lighter than a fresh one, not heavier.'
    ],
    why: 'Snap a stem to check. A clean break means dry, and a bend means keep going.'
  },
  {
    id: 't-hbm1103h',
    lesson: 'hb-m11-03',
    prompt: 'Why spread the leaves out in a single layer?',
    choices: [
      'So they weigh less',
      'So they keep their colour',
      'So the tray looks full',
      'So air can reach every leaf'
    ],
    answer: 3,
    feedback: [
      'Spreading them out changes nothing about the mass.',
      'Colour is about light, and this is about air.',
      'A full-looking tray is a slow tray.',
      null
    ],
    why: 'A leaf buried under other leaves sits in still damp air and goes mouldy instead.'
  },
  {
    id: 't-hbm1103i',
    lesson: 'hb-m11-03',
    prompt: 'Why dry herbs out of direct sun?',
    choices: [
      'Sun will not dry them at all',
      'Sun makes them damp',
      'Sun attracts mould',
      'Sun takes the colour and the smell with it'
    ],
    answer: 3,
    feedback: [
      'Sun dries them very fast. That is not the problem.',
      'Sun does the opposite of making things damp.',
      'Mould wants damp and dark, not a sunny sill.',
      null
    ],
    why: 'You want the water gone and the smell left behind, and strong sun takes both.'
  },
  {
    id: 't-hbm1103j',
    lesson: 'hb-m11-03',
    prompt: 'One of your drying trays smells sour and looks furry. What do you do?',
    choices: [
      'Wash it and dry it again',
      'Give it to Gigi, and it goes in the bin',
      'Jar it anyway',
      'Pick out the good bits'
    ],
    answer: 1,
    feedback: [
      'Once mould is in, washing does not undo it.',
      null,
      'Nothing furry goes in a jar, ever.',
      'Mould spreads further than you can see it.'
    ],
    why: 'Mouldy plant material is never saved and never tasted. It goes, and you wash your hands.'
  },

  // =========================================================================
  // LESSON 64 · hb-m11-04 · Infusion, decoction, maceration
  // Every question here is about water, heat, time and plant parts. Read the
  // bank header before adding to this block.
  // =========================================================================
  {
    id: 't-hbm1104a',
    lesson: 'hb-m11-04',
    prompt: 'Hot water poured over leaves and left to stand is called what?',
    choices: ['Evaporation', 'A decoction', 'An infusion', 'A maceration'],
    answer: 2,
    feedback: [
      'Evaporation is water leaving, not water pulling something out.',
      'A decoction is a simmer, used on tough parts.',
      null,
      'Maceration is a cold soak with no heat at all.'
    ],
    why: 'Thin leaves and flowers give up quickly, so a hot pour and a few minutes is enough.'
  },
  {
    id: 't-hbm1104b',
    lesson: 'hb-m11-04',
    prompt: 'What is a decoction?',
    choices: [
      'A gentle simmer, for roots and bark',
      'A hot pour over leaves',
      'A cold overnight soak',
      'Drying on a rack'
    ],
    answer: 0,
    feedback: [
      null,
      'That is an infusion, and it takes minutes.',
      'That is maceration, and it uses no heat.',
      'Drying takes water out. This puts plant material in.'
    ],
    why: 'The word comes from a Latin word meaning boiled down, and dense parts need that time.'
  },
  {
    id: 't-hbm1104c',
    lesson: 'hb-m11-04',
    prompt: 'What is maceration?',
    choices: [
      'A hot pour with a lid on',
      'A long soak in cold water',
      'Grinding in a mortar',
      'A gentle simmer in a pan'
    ],
    answer: 1,
    feedback: [
      'That is an infusion, and it takes minutes rather than hours.',
      null,
      'Grinding is dry work. Maceration needs water.',
      'That is a decoction, and it uses heat.'
    ],
    why: 'Cold water gets there in the end, using hours of time instead of heat.'
  },
  {
    id: 't-hbm1104d',
    lesson: 'hb-m11-04',
    prompt: 'Your ginger is a dense rhizome. Which method suits it?',
    choices: ['A quick rinse', 'No water at all', 'A two-minute pour', 'A twenty-minute simmer'],
    answer: 3,
    feedback: [
      'A rinse washes the outside and gets nothing out of the inside.',
      'Water is the solvent here. Without it nothing happens.',
      'Two minutes barely touches anything that dense.',
      null
    ],
    why: 'Tough dense parts need heat and time together, which is what a decoction gives them.'
  },
  {
    id: 't-hbm1104e',
    lesson: 'hb-m11-04',
    prompt: 'Which plant parts suit an infusion best?',
    choices: ['Leaves and flowers', 'Whole rhizomes', 'Roots and bark', 'Seeds and nuts'],
    answer: 0,
    feedback: [
      null,
      'A whole rhizome is about as tough as it gets.',
      'Those are dense, so they get simmered instead.',
      'Seeds are hard and packed, so a short steep does little.'
    ],
    why: 'Leaves and flowers are thin, so hot water reaches all the way in within minutes.'
  },
  {
    id: 't-hbm1104f',
    lesson: 'hb-m11-04',
    prompt: 'Why put a saucer on top of a hot cup of mint?',
    choices: [
      'To keep the dust out',
      'To make it look finished',
      'To keep the vapour in, so it drips back',
      'To keep the water hotter for longer'
    ],
    answer: 2,
    feedback: [
      'Dust is not what a lid is doing here.',
      'A lid is doing real work, not decoration.',
      null,
      'It does hold heat a little. Holding the smell in matters more.'
    ],
    why: 'What you can smell across the room is exactly what the cup has already lost.'
  },
  {
    id: 't-hbm1104g',
    lesson: 'hb-m11-04',
    prompt: 'In all three methods, what is the solvent?',
    choices: ['Plain water', 'The leaf', 'The heat', 'The glass'],
    answer: 0,
    feedback: [
      null,
      'The leaf is what the water is pulling from.',
      'Heat speeds it up. Heat is not a liquid.',
      'The glass just holds it all still.'
    ],
    why: 'The solvent is the liquid doing the pulling out, and here it is water every time.'
  },
  {
    id: 't-hbm1104h',
    lesson: 'hb-m11-04',
    prompt: 'Why does hot water pull colour out faster than cold water?',
    choices: [
      'Cold water has no colour in it',
      'Hot water is wetter',
      'Its molecules move faster',
      'Hot water is heavier'
    ],
    answer: 2,
    feedback: [
      'Neither one starts with colour. Both get it from the plant.',
      'Wet is wet. That is not a difference.',
      null,
      'Hot water is very slightly lighter, and that is not why.'
    ],
    why: 'Faster-moving molecules get into the plant and carry more out in the same time.'
  },
  {
    id: 't-hbm1104i',
    lesson: 'hb-m11-04',
    prompt: 'A cold soak has no heat. What does it use instead?',
    choices: ['Salt', 'Time', 'Pressure', 'Light'],
    answer: 1,
    feedback: [
      'No salt goes anywhere near this.',
      null,
      'Nothing is being squeezed in a jar in the fridge.',
      'It works just as well in a dark fridge.'
    ],
    why: 'Hours of soaking do slowly what ten hot minutes do quickly.'
  },
  {
    id: 't-hbm1104j',
    lesson: 'hb-m11-04',
    prompt: 'Who does the boiling, the simmering and the pouring?',
    choices: [
      'Nobody, it is all cold',
      'You, carefully',
      'Whoever is nearest',
      'Gigi, every time'
    ],
    answer: 3,
    feedback: [
      'Two of the three glasses need real heat.',
      'Careful is not enough. Steam burns deeper than water does.',
      'This is not a job that goes to whoever is standing there.',
      null
    ],
    why: 'The kettle and the stove are grown-up jobs, and you stand well back while she pours.'
  },

  // =========================================================================
  // LESSON 65 · hb-m11-05 · Shelf life and spoilage
  // =========================================================================
  {
    id: 't-hbm1105a',
    lesson: 'hb-m11-05',
    prompt: 'What four things shorten the life of a jar of dried herbs?',
    choices: [
      'Glass, paper, tape and ink',
      'Salt, sugar, oil and dust',
      'Time, weight, colour and smell',
      'Water, air, light and heat'
    ],
    answer: 3,
    feedback: [
      'Those are what the jar and the label are made of.',
      'None of those four is going into your jar.',
      'Colour and smell are what you LOSE, not what does the damage.',
      null
    ],
    why: 'Water is the fast one, and air, light and heat all work slowly across months.'
  },
  {
    id: 't-hbm1105b',
    lesson: 'hb-m11-05',
    prompt: 'Which of the four does the most damage the fastest?',
    choices: ['Air', 'Water', 'Heat', 'Light'],
    answer: 1,
    feedback: [
      'Air dulls it slowly, and a good lid handles that.',
      null,
      'Heat speeds everything else up, but water is what mould needs.',
      'Light fades a jar over months, not days.'
    ],
    why: 'Mould needs only a trace of water, and once it starts the whole jar is finished.'
  },
  {
    id: 't-hbm1105c',
    lesson: 'hb-m11-05',
    prompt: 'You find water droplets under the lid of your jar. What happened?',
    choices: [
      'The mint made its own water',
      'The cupboard was too dark',
      'The leaves went in before they were fully dry',
      'The jar was too large'
    ],
    answer: 2,
    feedback: [
      'A picked leaf makes nothing. That water was inside it already.',
      'Dark is exactly where you want it. Dark is not the fault.',
      null,
      'A big jar holds more air, but air does not bead up like that.'
    ],
    why: 'Water left in a leaf comes back out in the jar, and that is where spoilage starts.'
  },
  {
    id: 't-hbm1105d',
    lesson: 'hb-m11-05',
    prompt: 'What does a best before date really tell you?',
    choices: [
      'The maker guess about quality',
      'The day it was made',
      'How long the shop had it',
      'The exact day the food goes bad'
    ],
    answer: 0,
    feedback: [
      null,
      'That is a different date, and it is not always printed.',
      'The shop is not what the date is about.',
      'Nothing flips over at midnight. Quality slides slowly.'
    ],
    why: 'Shelf life is a slope rather than a cliff, and that date is somebody judging the slope.'
  },
  {
    id: 't-hbm1105e',
    lesson: 'hb-m11-05',
    prompt: 'Where should a jar of dried herbs live?',
    choices: [
      'On the shelf right above the stove',
      'In a dark cupboard away from heat',
      'In an open bowl on the counter',
      'On a sunny windowsill'
    ],
    answer: 1,
    feedback: [
      'Above the stove is the hottest, steamiest shelf in the kitchen.',
      null,
      'An open bowl lets air, light and dust straight in.',
      'Sun is light and heat at once, which is two spoilers in one spot.'
    ],
    why: 'Dark and cool deals with light and heat, and a sealed lid deals with the air.'
  },
  {
    id: 't-hbm1105f',
    lesson: 'hb-m11-05',
    prompt: 'Two jars were filled the same day. The sill jar is pale. Why?',
    choices: [
      'Somebody opened it',
      'It was dried differently',
      'Pale mint was put in it',
      'Light and heat took its colour'
    ],
    answer: 3,
    feedback: [
      'Nobody opened either one. That was the whole point of the test.',
      'Both jars were filled from the same batch on the same day.',
      'Same batch, so it went in the same colour as the other one.',
      null
    ],
    why: 'One thing was different between those jars, and that one thing was where they stood.'
  },
  {
    id: 't-hbm1105g',
    lesson: 'hb-m11-05',
    prompt: 'Your own jar has no printed date anywhere. What do you do?',
    choices: [
      'Write the date you filled it',
      'Throw the jar out',
      'Guess how old it looks and write that',
      'Leave it blank and remember'
    ],
    answer: 0,
    feedback: [
      null,
      'The mint is fine. It was the record that was missing.',
      'A guessed date becomes a wrong fact the moment somebody trusts it.',
      'Nobody remembers. That is exactly what a label is for.'
    ],
    why: 'The date you write is the only date that jar will ever have.'
  },
  {
    id: 't-hbm1105h',
    lesson: 'hb-m11-05',
    prompt: 'Two undated jars of mint. One is green and one is pale. What is certain?',
    choices: [
      'They are the same age',
      'The pale one is older',
      'Only that one is paler than the other',
      'The green one was oven dried'
    ],
    answer: 2,
    feedback: [
      'With no dates you cannot claim they match either.',
      'Pale could mean old, or it could mean one week on a sunny sill.',
      null,
      'Nothing on either jar says how it was dried.'
    ],
    why: 'Without a date you have a colour and a story, and a story is not evidence.'
  },
  {
    id: 't-hbm1105i',
    lesson: 'hb-m11-05',
    prompt: 'A jar in the cupboard looks furry inside. What happens next?',
    choices: [
      'Lid on, and Gigi takes it from there',
      'Put it back where it was',
      'Open it and have a good sniff',
      'Tip out the bad bit and keep the rest'
    ],
    answer: 0,
    feedback: [
      null,
      'Putting it back leaves the problem for somebody else.',
      'Do not sniff mould. Waft, or better, do not open it at all.',
      'Mould spreads further than the part you can see.'
    ],
    why: 'Anything furry, spotted or sour goes to a grown-up, and then it goes in the bin.'
  },
  {
    id: 't-hbm1105j',
    lesson: 'hb-m11-05',
    prompt: 'What does airtight mean?',
    choices: [
      'Very light to lift',
      'Made of glass',
      'Sealed so no air gets in or out',
      'Full of air'
    ],
    answer: 2,
    feedback: [
      'Airtight is about the seal, not the weight.',
      'A plastic tub can be airtight too.',
      null,
      'The opposite. A sealed jar keeps air out.'
    ],
    why: 'An airtight lid keeps damp air away from leaves you worked a week to dry.'
  },

  // =========================================================================
  // LESSON 66 · hb-m11-06 · The label is the science
  // The spine of the module. Every question here is about the record.
  // =========================================================================
  {
    id: 't-hbm1106a',
    lesson: 'hb-m11-06',
    prompt: 'What five things does a full label have to say?',
    choices: [
      'Colour, size, smell, weight and shape',
      'Plant, part, picked, prepared and dated',
      'Plant, price, place, person and pot',
      'Name and date only'
    ],
    answer: 1,
    feedback: [
      'Those are things you can see by looking in the jar.',
      null,
      'Nothing on this bench is for sale.',
      'A name and a date is two lines out of five.'
    ],
    why: 'What plant, which part, when picked, how prepared, and the date it was jarred.'
  },
  {
    id: 't-hbm1106b',
    lesson: 'hb-m11-06',
    prompt: 'A label says PEPPERMINT · LEAF · picked 14 May. Which line is missing?',
    choices: ['The picking date', 'The plant', 'The part', 'How it was prepared'],
    answer: 3,
    feedback: [
      '14 May is on there. That is the picking date.',
      'Peppermint is right there on the first line.',
      'Leaf is on there. That is the part.',
      null
    ],
    why: 'Without the method you can never compare air drying against oven drying.'
  },
  {
    id: 't-hbm1106c',
    lesson: 'hb-m11-06',
    prompt: 'You cannot name the plant you dried. What goes on the label?',
    choices: [
      'Nothing, so leave the jar bare',
      'A question mark, and no date',
      'Your best guess at a name',
      'UNKNOWN, with every other line filled in'
    ],
    answer: 3,
    feedback: [
      'The date and the place are still good data. Keep them.',
      'Somebody can name it later. Nobody can add the date later.',
      'A guessed name becomes a wrong fact the moment somebody trusts it.',
      null
    ],
    why: 'UNKNOWN is a true answer, and it also hands you your next job.'
  },
  {
    id: 't-hbm1106d',
    lesson: 'hb-m11-06',
    prompt: 'What is a batch code for?',
    choices: [
      'So you know the price',
      'So two jars can never be mixed up',
      'So the jar looks official',
      'So you can charge for it'
    ],
    answer: 1,
    feedback: [
      'A code is not a price.',
      null,
      'It is not decoration. It does a job.',
      'Nothing on this bench is being sold.'
    ],
    why: 'Two jars of mint dried the same week need something that tells them apart.'
  },
  {
    id: 't-hbm1106e',
    lesson: 'hb-m11-06',
    prompt: 'Why fill in a label from your log instead of from memory?',
    choices: [
      'It is faster that way',
      'Because the log is graded',
      'Memory bends, and a written number does not',
      'Logs are neater to read'
    ],
    answer: 2,
    feedback: [
      'It is usually slower, and it is still worth it.',
      'Nothing in this course is graded.',
      null,
      'Neat is nice. Being right matters more.'
    ],
    why: 'You wrote the number down at the time for exactly this moment.'
  },
  {
    id: 't-hbm1106f',
    lesson: 'hb-m11-06',
    prompt: 'What turns a jar into a record?',
    choices: [
      'A full, dated label',
      'A pretty jar',
      'A tight lid',
      'A neat handwriting'
    ],
    answer: 0,
    feedback: [
      null,
      'How it looks is not what somebody needs from it in a year.',
      'A lid protects what is inside. It says nothing about it.',
      'Neat helps. It is not what makes it count.'
    ],
    why: 'Without the five lines and a date, it is a jar of leaves and nothing more.'
  },
  {
    id: 't-hbm1106g',
    lesson: 'hb-m11-06',
    prompt: 'Your method sheet says "some mint and a jug of water". What is wrong?',
    choices: [
      'Nothing is wrong with it',
      'Nobody could repeat it and get your result',
      'It is too short to read',
      'It uses the wrong plant'
    ],
    answer: 1,
    feedback: [
      'Some and a jug are not measurements.',
      null,
      'Length is not the problem. Numbers are.',
      'Mint is fine. How much mint is the question.'
    ],
    why: 'A method needs real numbers with units: grams, millilitres, minutes, lid on or off.'
  },
  {
    id: 't-hbm1106h',
    lesson: 'hb-m11-06',
    prompt: 'Your name goes on the label. What are you called there?',
    choices: ['The batch', 'The method', 'The record', 'The collector'],
    answer: 3,
    feedback: [
      'A batch is one lot made at one time.',
      'The method is the steps you followed.',
      'The record is the whole thing together.',
      null
    ],
    why: 'The collector is the person who picked it, and that is part of the science.'
  },
  {
    id: 't-hbm1106i',
    lesson: 'hb-m11-06',
    prompt: 'One jar is labelled and one is not. The labelled one smells stronger. So?',
    choices: [
      'You learned something real about the labelled jar',
      'You learned nothing from either jar',
      'The bare jar must be older',
      'Labels make herbs smell stronger'
    ],
    answer: 0,
    feedback: [
      null,
      'The labelled jar still tells its own story properly.',
      'There is nothing on that jar to tell you its age.',
      'A label is paper. It changes the record, not the plant.'
    ],
    why: 'A comparison only teaches you something when you know what was different.'
  },
  {
    id: 't-hbm1106j',
    lesson: 'hb-m11-06',
    prompt: 'Why is a guessed line on a label worse than a blank one?',
    choices: [
      'A blank line looks untidy',
      'A guess is quicker to write',
      'Somebody later will believe the guess',
      'There is no difference at all'
    ],
    answer: 2,
    feedback: [
      'Untidy is not the problem. Wrong is.',
      'Quick and wrong is the worst trade on this bench.',
      null,
      'One of them can mislead a person for years.'
    ],
    why: 'A blank line asks a question. A guess answers it wrongly and nobody ever checks.'
  }
];

export function itemsForLesson(lessonId) {
  return HERBALISM_M11_BANK.filter((q) => q.lesson === lessonId);
}

export function itemsForLessons(lessonIds) {
  const want = new Set(lessonIds);
  return HERBALISM_M11_BANK.filter((q) => want.has(q.lesson));
}

export default HERBALISM_M11_BANK;
