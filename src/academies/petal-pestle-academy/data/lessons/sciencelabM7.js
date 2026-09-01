// ---------------------------------------------------------------------------
// THE SCIENCE LAB — MODULE 7, QUARTER 3, WEEKS 5-6
// THE SOLAR SYSTEM, AND WHAT A MODEL GETS WRONG
//
// Georgia S4E1d — "Evaluate strengths and limitations of models of our solar
// system in describing relative size, order, appearance and composition of
// planets and the sun."
// Georgia S4E1a — technological advances that changed what we know.
//
// ---- "STRENGTHS AND LIMITATIONS" IS THE STANDARD, AND MOST CLASSROOMS SKIP IT ----
//
// Georgia does not ask her to build a solar system model. It asks her to
// EVALUATE one. Almost every version of this taught anywhere ends with a
// painted polystyrene mobile and a sentence about how models are useful.
//
// So this module is built the other way round. She builds a model where the
// SIZES are right (Lesson 39). She builds a second where the DISTANCES are
// right (Lesson 40). Then Lesson 41 puts her own two models side by side and
// asks why they disagree — because they cannot both be right at once, and
// finding that out herself is worth more than being told.
//
// Lesson 41 is the hardest lesson in this course to source a video for. Three
// searches found nothing usable for a child; the fourth found a short film of a
// group building a scale model seven miles across in a desert, made for exactly
// this reason. It is for a general audience and it runs longer than the block,
// so it CLOSES the lesson and the beats do the teaching. Recorded rather than
// glossed over.
//
// ---- SAFETY ----
//
// NEVER LOOK AT THE SUN. The sun is a member of this model and it is drawn,
// measured and talked about — never looked at. Any activity that needs the real
// sun is done by projection with the sun behind her.
// ---------------------------------------------------------------------------

// ============================================== LESSON 37 · EIGHT WORLDS
const L37_CHECK_IN = {
  title: 'Name as many as you can',
  text: 'Without looking anything up, write down every planet you can name, in any order.',
  question: 'How many did you get, and are you sure every one of them is a planet?'
};

const L37_BEATS = [
  {
    n: 1,
    label: 'Eight worlds, and the order never changes',
    hook: 'The order is the one thing every picture of the solar system gets right.',
    teachingText:
      'Eight planets go round our sun, and they always sit in the same order going outward: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune. Their order is the part a model can show honestly.',
    example:
      'Earth is third. That is not an opinion and it does not change, however the picture is drawn.',
    applyIt: {
      prompt: 'Counting outward from the sun, Earth sits in position:',
      choices: ['First', 'Second', 'Third', 'Fourth'],
      answer: 2,
      feedback: [
        'That is Mercury.',
        'That is Venus.',
        null,
        'That is Mars, just outside us.'
      ],
      why: 'Mercury, Venus, Earth. Third, always.'
    }
  },
  {
    n: 2,
    label: 'Everything goes round the sun, and the sun holds it all',
    hook: 'Gravity from Module 2 is doing every bit of the work here.',
    teachingText:
      'The sun holds almost all the material in the solar system, and its pull keeps every planet in orbit. Each planet falls toward the sun and keeps moving sideways, exactly as the moon does around us.',
    example:
      'She met this in Lesson 12. An orbit is falling and moving sideways at once, and nothing has changed except the size.',
    applyIt: {
      prompt: 'What keeps the eight planets going round the sun?',
      choices: ['The sun’s gravity', 'The pull of the moon', 'The air between them', 'Nothing at all'],
      answer: 0,
      feedback: [
        null,
        'Our moon is far too small.',
        'There is no air out there.',
        'Something must bend their paths.'
      ],
      why: 'Same rule as the moon, on a much bigger stage.'
    }
  }
];

const L37_ACTIVITY = {
  title: 'Eight cards, one order',
  prep: 'Eight index cards and a marker. No painting and nothing to buy.',
  needs: ['eight index cards', 'a marker', 'a clear floor or table', 'her notebook'],
  steps: [
    'Write one planet name on each card, plus a ninth card for the sun.',
    'Shuffle them and lay them out in the order you think is right.',
    'Check against the lesson. How many were in the right place?',
    'Shuffle and do it again until you get all eight, twice running.',
    'Now put the sun card down and lay the eight out from it in order.',
    'Write the order into the notebook in your own handwriting, from memory.'
  ],
  safety: 'None needed for this one. It is cards on a table.',
  minutes: 12
};

const L37_LEDGER = {
  prompt: 'The eight planets in order, written from memory, and one sentence on what holds them all.',
  ifSheIsStuck: 'She does not need a rhyme. Say the four rocky ones, then the four big ones, and it splits in half.'
};

// ====================================== LESSON 38 · ROCK AND GAS
const L38_CHECK_IN = {
  title: 'Where could you stand?',
  text: 'Of the eight planets, imagine trying to land a spacecraft and step out onto the ground.',
  question: 'On which of them could you actually stand on something solid? Guess before the lesson.'
};

const L38_BEATS = [
  {
    n: 1,
    label: 'The four nearest are made of rock',
    hook: 'The inner four are small, solid and close together, and one of them is under her feet.',
    teachingText:
      'Mercury, Venus, Earth and Mars are rocky planets. They have hard ground, they are fairly small, and they sit close in to the sun. She could stand on any of them, given a suit.',
    example:
      'Mars has mountains, canyons and dust storms, and rovers have driven across its ground for years.',
    applyIt: {
      prompt: 'Which of these is a rocky planet with solid ground?',
      choices: ['Jupiter', 'Saturn', 'Mars', 'Neptune'],
      answer: 2,
      feedback: [
        'It is a gas giant.',
        'It is a gas giant too.',
        null,
        'It is one of the far, icy giants.'
      ],
      why: 'Mercury, Venus, Earth, Mars. The inner four are the solid ones.'
    }
  },
  {
    n: 2,
    label: 'The four beyond are enormous balls of gas',
    hook: 'Fly a spacecraft at Jupiter expecting a landing and you would simply keep going.',
    teachingText:
      'Jupiter, Saturn, Uranus and Neptune are gas giants. They are vastly bigger than the rocky planets and they have no solid surface to stand on. Their outsides are cloud, all the way down.',
    example:
      'Jupiter is so large that every other planet would fit inside it with room left over.',
    applyIt: {
      prompt: 'A spacecraft trying to land on Jupiter would:',
      choices: ['Bounce off the surface', 'Find no solid ground at all', 'Land on ice', 'Land on rock'],
      answer: 1,
      feedback: [
        'There is nothing there to bounce off.',
        null,
        'The ice moons are separate worlds.',
        'The rock is buried unimaginably deep.'
      ],
      why: 'Cloud all the way down. That is what gas giant means.'
    }
  }
];

const L38_ACTIVITY = {
  title: 'Sort the eight into two families',
  prep: 'The eight cards from Lesson 37. Add a second colour of marker.',
  needs: ['the eight planet cards', 'two coloured markers', 'her notebook'],
  steps: [
    'Take the eight cards and sort them into two piles: ROCKY and GAS GIANT.',
    'Check your answer. Were the two families split neatly, or mixed up?',
    'Notice where the split falls. Are the rocky ones near the sun or far from it?',
    'Write down one thing all four rocky planets share.',
    'Write down one thing all four gas giants share.',
    'Answer this: which family is bigger, and which family is closer in?'
  ],
  safety: 'None needed. Cards and a notebook.',
  minutes: 12
};

const L38_LEDGER = {
  prompt: 'Your two families, and the one place in the row where the solar system changes character.',
  ifSheIsStuck: 'The split is not scattered. Four in, four out, and the change happens between Mars and Jupiter.'
};

// ====================================== LESSON 39 · A MODEL OF SIZE
const L39_CHECK_IN = {
  title: 'A pea and a beach ball',
  text: 'Somebody tells you the sun is a beach ball. Have a guess at how big the Earth would be in that same model.',
  question: 'Write your guess down before you measure anything. Guessing first is the point.'
};

const L39_BEATS = [
  {
    n: 1,
    label: 'A model shrinks everything by the same amount',
    hook: 'A model is only honest if every single thing in it shrinks by the same number.',
    teachingText:
      'To build a model of size, she picks a scale — say, the sun is as wide as a dinner plate — and then every planet must be shrunk by that same amount. Shrink one thing more than another and the model starts telling lies.',
    example:
      'If the sun is a 25 centimetre plate, the Earth is about 2 millimetres across. That is a grain of coarse salt.',
    applyIt: {
      prompt: 'For a size model to be honest, every object must be shrunk:',
      choices: ['By whatever looks best', 'By the same amount', 'Until it fits the page', 'Only if it is a planet'],
      answer: 1,
      feedback: [
        'Then it is a drawing, not a model.',
        null,
        'Fitting the page is what breaks most models.',
        'The sun has to shrink too.'
      ],
      why: 'One scale, applied to everything. That is what makes it a model.'
    }
  },
  {
    n: 2,
    label: 'The sun is the shock',
    hook: 'Almost nobody guesses how much bigger the sun is than everything else put together.',
    teachingText:
      'The sun holds far more material than all eight planets combined. Jupiter is the biggest planet by a long way, and the sun still dwarfs it. A model that shows the planets clearly usually has to cheat about the sun.',
    example:
      'With the sun as a 25 centimetre plate, Jupiter is about the size of a large pea and Mercury is a speck of dust.',
    applyIt: {
      prompt: 'In an honest size model with the sun as a dinner plate, Earth would be about:',
      choices: ['A tennis ball', 'A marble', 'A grain of salt', 'A dinner plate too'],
      answer: 2,
      feedback: [
        'Far too big by a long way.',
        'Still far too big.',
        null,
        'The sun is about a hundred times wider than Earth.'
      ],
      why: 'Two millimetres against twenty-five centimetres. That is the real ratio.'
    }
  }
];

const L39_ACTIVITY = {
  title: 'Build the size model on the kitchen bench',
  prep: 'A dinner plate for the sun, and a hunt through the kitchen for the rest.',
  needs: ['a 25cm plate', 'dried peas', 'coarse salt or poppy seeds', 'a peppercorn', 'a ruler', 'her notebook'],
  steps: [
    'Put the plate down. That is the sun, and everything else must match its scale.',
    'Earth and Venus are about 2mm — a grain of coarse salt each.',
    'Mercury and Mars are smaller still — a poppy seed each.',
    'Jupiter is about 25mm, a large pea. Saturn is a slightly smaller pea.',
    'Uranus and Neptune are about 9mm each — a peppercorn each.',
    'Lay them all out beside the plate in the right order and look at them together.',
    'Write down the one thing that surprised you most.'
  ],
  safety: 'Small dry seeds stay on the bench and out of mouths and noses. A grown-up clears them away afterwards.',
  minutes: 16
};

const L39_LEDGER = {
  prompt: 'Draw your bench model to scale and label every object. Then say what surprised you.',
  ifSheIsStuck: 'Nearly everybody is shocked by how small Earth is. Ask her whether the pictures in books had prepared her for it.'
};

// ====================================== LESSON 40 · A MODEL OF DISTANCE
const L40_CHECK_IN = {
  title: 'Now put them where they belong',
  text: 'Your bench model has the sizes right. Leave it where it is and look at how far apart you set the planets.',
  question: 'Were those gaps measured, or did you just space them out to look nice?'
};

const L40_BEATS = [
  {
    n: 1,
    label: 'Space is mostly the space',
    hook: 'The planets are the least of it. The solar system is overwhelmingly made of gap.',
    teachingText:
      'The distances between planets are enormous compared with the planets themselves. A model that gets the distances right has to be very long and very empty, which is why so few of them exist.',
    example:
      'On a strip of paper with the sun at one end and Neptune at the other, Earth sits about one thirtieth of the way along.',
    applyIt: {
      prompt: 'A model that gets the distances right is mostly made of:',
      choices: ['Planets', 'Empty gap', 'The sun', 'Moons'],
      answer: 1,
      feedback: [
        'They take up almost none of it.',
        null,
        'It sits at one end and is tiny in the picture.',
        'Smaller still.'
      ],
      why: 'That emptiness is the honest and startling part.'
    }
  },
  {
    n: 2,
    label: 'The four rocky ones are crowded and the rest are flung out',
    hook: 'The gaps are not even. They get bigger and bigger the further out she goes.',
    teachingText:
      'Mercury, Venus, Earth and Mars are bunched close to the sun. Beyond Mars the gaps grow enormously: the step from Saturn to Uranus is larger than everything inside Jupiter put together.',
    example:
      'Fold a strip of paper into equal parts and every inner planet lands in the first fold, with seven folds left for the rest.',
    applyIt: {
      prompt: 'Going outward from the sun, the gaps between planets:',
      choices: ['Stay the same', 'Get smaller', 'Get much larger', 'Change randomly'],
      answer: 2,
      feedback: [
        'They change enormously.',
        'That is the wrong way round.',
        null,
        'There is a clear pattern to it.'
      ],
      why: 'Crowded in close, flung far apart further out.'
    }
  }
];

const L40_ACTIVITY = {
  title: 'Walk the distances down the garden',
  prep: 'A long strip of paper or a roll of toilet paper, and a long path. This one needs room.',
  needs: ['a roll of toilet paper or a long paper strip', 'a marker', 'a long path or hallway', 'her notebook'],
  steps: [
    'Tear off exactly 40 sheets and lay them end to end. Sheet 0 is the sun; sheet 40 is Neptune.',
    'Mark Mercury at sheet 0.4 and Venus at 0.7. They are both almost on top of the sun.',
    'Mark Earth at sheet 1. One sheet out of forty.',
    'Mark Mars at 1.5, Jupiter at 5, Saturn at 9.5, Uranus at 19, and Neptune at 30.',
    'Walk slowly from the sun to Neptune and count your steps.',
    'Now go back and stand on Earth. Look at how much paper is still ahead of you.',
    'Write down how many sheets held the four rocky planets, and how many held the rest.'
  ],
  safety: 'Lay the strip on a clear path with nothing to trip over, and pick it all up afterwards.',
  minutes: 16
};

const L40_LEDGER = {
  prompt: 'Your paper strip with all eight marked, and one sentence on where most of the solar system actually is.',
  ifSheIsStuck: 'Ask her how much of the strip held the first four planets. It is barely the first sheet and a half.'
};

// ============================ LESSON 41 · WHY NO MODEL CAN DO BOTH
const L41_CHECK_IN = {
  title: 'Put your two models together',
  text: 'Your bench model has the sizes right. Your paper strip has the distances right. Now try to build one model that has both.',
  question: 'Work out what would happen if you tried. How big would the room need to be?'
};

const L41_BEATS = [
  {
    n: 1,
    label: 'The two models disagree, and neither is lying',
    hook: 'She has built two honest models of the same thing, and they cannot be put together.',
    teachingText:
      'On her bench, Earth is a grain of salt beside a dinner plate. On her paper strip, Earth is one sheet out of forty. Put both rules together and the model stops fitting in the house: with a dinner-plate sun, Earth would be a grain of salt about thirty metres away, and Neptune would be nearly a kilometre off.',
    example:
      'Every solar system picture in every book has quietly given up on one of the two. Usually the distances.',
    applyIt: {
      prompt: 'A model with the sun as a dinner plate AND the distances right would need:',
      choices: ['A large table', 'A whole room', 'Most of a mile', 'A sheet of paper'],
      answer: 2,
      feedback: [
        'Nowhere near enough.',
        'Still nowhere near enough.',
        null,
        'That is where the cheating starts.'
      ],
      why: 'Thirty metres to Earth and nearly a kilometre to Neptune, from one dinner plate.'
    }
  },
  {
    n: 2,
    label: 'A model is a tool, and every tool leaves something out',
    hook: 'This is not a fault in her models. It is the honest answer to what Georgia asked.',
    teachingText:
      'A model is built to show one thing well. Her bench model shows size and lies about distance. Her paper strip shows distance and cannot show size at all. Knowing what a model leaves out is more useful than the model, and saying so out loud is what a scientist does.',
    example:
      'The picture in a book shows order and appearance honestly, and it is wrong about both size and distance at once.',
    applyIt: {
      prompt: 'The most useful thing to know about any model is:',
      choices: ['Who built it', 'What it leaves out', 'How pretty it looks', 'How long it took'],
      answer: 1,
      feedback: [
        'That does not tell her what to trust.',
        null,
        'Pretty models mislead just as easily.',
        'Effort is not accuracy.'
      ],
      why: 'That sentence is the whole of S4E1d.'
    }
  }
];

const L41_ACTIVITY = {
  title: 'Judge all three of your models',
  prep: 'Have her bench model, her paper strip, and any solar system picture from a book all in front of her.',
  needs: ['her bench size model', 'her paper distance strip', 'a solar system picture from a book', 'her notebook'],
  steps: [
    'Rule four columns: ORDER, SIZE, DISTANCE, APPEARANCE.',
    'Rule three rows: BENCH MODEL, PAPER STRIP, BOOK PICTURE.',
    'For every box, write GOOD or WRONG. Be hard on all three.',
    'Work out how far away Earth would be if the sun stayed a dinner plate and the distances were right.',
    'Now look at your table. Is there a single row with GOOD in every column?',
    'Watch the video and see how far a group had to go to build one that is honest about both.',
    'Write the answer to this: is a model that leaves things out still useful?'
  ],
  safety: 'None needed. This one is a table and an argument.',
  minutes: 16
};

const L41_LEDGER = {
  prompt: 'Your table of three models against four things. Then say which model you would use to explain the solar system to a friend, and what you would have to warn them about.',
  ifSheIsStuck:
    'There is no row with GOOD all the way across, and that is the answer rather than a failure. Ask her which column matters most for the thing she is trying to explain.'
};

// ============================ LESSON 42 · SEEING WHAT HER EYES CANNOT
const L42_CHECK_IN = {
  title: 'A photograph of something nobody had ever seen',
  text: 'A telescope in space takes pictures of things that were completely unknown before it was launched.',
  question: 'Galileo’s telescope sat on the ground. What could you gain by putting one above the air?'
};

const L42_BEATS = [
  {
    n: 1,
    label: 'Above the air, nothing wobbles',
    hook: 'She learned in Lesson 35 that our air makes stars shiver. Take the air away and it stops.',
    teachingText:
      'A telescope in space sits above all the moving air that makes stars twinkle. Nothing blurs its view, so it can see far finer detail than anything on the ground. It is also above the clouds, so it never has a bad night.',
    example:
      'Hubble has been sending pictures back from above the air for decades, and it never once waited for the weather.',
    applyIt: {
      prompt: 'A telescope above our air has one clear advantage, which is that:',
      choices: ['It is far cheaper', 'It can be much smaller', 'Nothing wobbles its view', 'It needs no looking after'],
      answer: 2,
      feedback: [
        'It costs a great deal more.',
        'They are usually enormous.',
        null,
        'It needs a great deal of looking after.'
      ],
      why: 'No air above it means no twinkling to blur the picture.'
    }
  },
  {
    n: 2,
    label: 'Every new tool has made the sky bigger',
    hook: 'The naked eye. Then Galileo. Then Hubble. Then Webb. Each one found things nobody knew were there.',
    teachingText:
      'Her eyes show a few thousand stars. Galileo’s telescope found moons and craters. Telescopes above the air show galaxies so far off that their light has been travelling since long before the Earth existed. Every time the tool improves, the answer changes.',
    example:
      'Webb can see a kind of light her eyes cannot detect at all, which lets it look straight through clouds of dust that used to hide things completely.',
    applyIt: {
      prompt: 'What has changed most about our knowledge of the sky over time?',
      choices: ['The tools we point at it', 'The sky itself', 'How many people look up', 'The names of the stars'],
      answer: 0,
      feedback: [
        null,
        'It has barely changed at all.',
        'That is not what found the galaxies.',
        'Names are labels, not discoveries.'
      ],
      why: 'Same sky, better instruments, bigger answer. Every single time.'
    }
  }
];

const L42_ACTIVITY = {
  title: 'Four tools, one patch of sky',
  prep: 'Her own eyes, binoculars if there are any, and a search for real telescope pictures of one object.',
  needs: ['a clear night', 'binoculars if available', 'a grown-up with a screen', 'her notebook'],
  steps: [
    'Pick one target that is easy to find, such as the moon or the steady point from Lesson 35.',
    'Look at it with your eyes and draw exactly what you can see.',
    'Look at it through binoculars and draw that.',
    'Have a grown-up find a photograph of the same object taken through a large telescope.',
    'Then find one taken from a telescope in space.',
    'Line all four up in the notebook, from your eyes to the space picture.',
    'Write one sentence about what changed between the first drawing and the last picture.'
  ],
  safety:
    'Never point binoculars anywhere near the sun, not even while finding something else. This activity happens after dark, with a grown-up outside.',
  minutes: 16
};

const L42_LEDGER = {
  prompt: 'Your four views of one object, in order of the tool used. Then say what the sky did while the tools improved.',
  ifSheIsStuck: 'The sky did nothing at all. That is the answer, and it is the point of the whole lesson.'
};

const SG = 'No Black American educator confirmed for elementary astronomy. Searches recorded in full on sl-m6-01: the space searches surfaced National Geographic on Katherine Johnson and "Coco & Shea Butter Kids — BLACK HEROES OF SPACE", both real and both BIOGRAPHICAL, and no lesson in this module is about a person. Recorded as a gap in the blueprint rather than as a gap closed, and flagged to Gigi. Open.';

export const SCIENCELAB_M7 = [
  {
    id: 'sl-m7-01', course: 'sciencelab', module: 7, quarter: 3, week: 5, day: 1, n: 37,
    title: 'Eight worlds, in order',
    minutes: 30, spec: '§10 · beats',
    concept: 'Eight planets orbit the sun in a fixed order, held there by the same gravity that keeps the moon going round us.',
    standards: ['S4E1d'], offGrade: null,
    words: ['planet', 'order', 'orbit', 'sun'],
    glossary: [
      { word: 'planet', plain: 'A big world going round a star.' },
      { word: 'order', plain: 'Which one comes after which, going outward.' },
      { word: 'orbit', plain: 'Going round and round because a pull keeps bending the path.' },
      { word: 'sun', plain: 'Our star. It holds the whole solar system together.' }
    ],
    video: {
      id: 'e8YzKyot4Pc', url: 'https://www.youtube.com/watch?v=e8YzKyot4Pc',
      title: 'Planets in the Solar System for Kids | Learn about the sun and the eight planets',
      channel: 'Learn Bright', minutes: 5, verified: '2026-08-16',
      teaches: ['planet', 'solar system', 'order', 'sun', 'orbit'],
      sourceGap: SG
    },
    checkIn: L37_CHECK_IN, beats: L37_BEATS, activity: L37_ACTIVITY, ledger: L37_LEDGER, hook: L37_CHECK_IN,
    core: L37_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L37_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'Name the eight planets in order.', answer: 'Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.', why: 'Order is the one thing every model gets right.' },
      { ask: 'What holds them all in orbit?', answer: 'The sun’s gravity.', why: 'Same rule as the moon, on a bigger stage.' }
    ],
    check: [
      { prompt: 'Counting outward from the sun, Earth sits in position:', choices: ['First', 'Second', 'Third', 'Fourth'], answer: 2, feedback: ['That is Mercury.', 'That is Venus.', null, 'That is Mars.'] },
      { prompt: 'What keeps the eight planets going round the sun?', choices: ['The sun’s gravity', 'The pull of our moon', 'The air between them', 'Nothing at all'], answer: 0, feedback: [null, 'Our moon is far too small.', 'There is no air out there.', 'Something must bend their paths.'] },
      { prompt: 'The planet just outside Earth, going outward, is:', choices: ['Venus', 'Jupiter', 'Mercury', 'Mars'], answer: 3, feedback: ['That is just inside us.', 'That is two steps out.', 'That is the innermost one.', null] }
    ]
  },
  {
    id: 'sl-m7-02', course: 'sciencelab', module: 7, quarter: 3, week: 5, day: 2, n: 38,
    title: 'Rocky worlds and gas giants',
    minutes: 30, spec: '§10 · beats',
    concept: 'The inner four planets are small and solid; the outer four are enormous and have no surface to stand on.',
    standards: ['S4E1d'], offGrade: null,
    words: ['rocky', 'gas', 'giant', 'solid'],
    glossary: [
      { word: 'rocky', plain: 'Made of stone, with hard ground she could stand on.' },
      { word: 'gas', plain: 'Not solid and not liquid. Cloud, all the way down.' },
      { word: 'giant', plain: 'Vastly bigger than the rocky planets.' },
      { word: 'solid', plain: 'Firm enough to stand on.' }
    ],
    video: {
      id: 'DTMBUjidqZs', url: 'https://www.youtube.com/watch?v=DTMBUjidqZs',
      title: 'Rock or Gas? 🪐 Gas Giants vs Rocky Planets',
      channel: 'Galaxy Giggles 🚀 | Learning Adventures', minutes: 4, verified: '2026-08-16',
      teaches: ['rocky', 'gas', 'giant', 'planet', 'solid'],
      sourceGap: SG
    },
    checkIn: L38_CHECK_IN, beats: L38_BEATS, activity: L38_ACTIVITY, ledger: L38_LEDGER, hook: L38_CHECK_IN,
    core: L38_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L38_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'Which four planets are rocky?', answer: 'Mercury, Venus, Earth and Mars.', why: 'The inner four, and the only ones with ground.' },
      { ask: 'What is under the clouds of a gas giant?', answer: 'More cloud. No surface to stand on.', why: 'That is what gas giant means.' }
    ],
    check: [
      { prompt: 'Which of these is a rocky planet with solid ground?', choices: ['Jupiter', 'Saturn', 'Mars', 'Neptune'], answer: 2, feedback: ['It is a gas giant.', 'It is a gas giant too.', null, 'It is one of the far giants.'] },
      { prompt: 'A spacecraft trying to land on Jupiter would:', choices: ['Bounce off the surface', 'Find no solid ground at all', 'Land on thick ice', 'Land on bare rock'], answer: 1, feedback: ['Nothing there to bounce off.', null, 'Its ice moons are separate worlds.', 'Any rock is buried impossibly deep.'] },
      { prompt: 'The solar system changes character between which two planets?', choices: ['Earth and Mars', 'Mars and Jupiter', 'Saturn and Uranus', 'Venus and Earth'], answer: 1, feedback: ['Both are rocky.', null, 'Both are gas giants.', 'Both are rocky.'] }
    ]
  },
  {
    id: 'sl-m7-03', course: 'sciencelab', module: 7, quarter: 3, week: 5, day: 3, n: 39,
    title: 'A model where the sizes are right',
    minutes: 30, spec: '§10 · beats',
    concept: 'An honest size model shrinks everything by the same amount, and doing so shows how enormously the sun dwarfs the planets.',
    standards: ['S4E1d'], offGrade: null,
    words: ['model', 'scale', 'size', 'shrink'],
    glossary: [
      { word: 'model', plain: 'A small stand-in built to show something real.' },
      { word: 'scale', plain: 'The amount everything in a model is shrunk by.' },
      { word: 'size', plain: 'How big a thing really is.' },
      { word: 'shrink', plain: 'To make smaller by the same amount as everything else.' }
    ],
    video: {
      id: 'ssAHq2Ryagw', url: 'https://www.youtube.com/watch?v=ssAHq2Ryagw',
      title: 'Earth, Planets and Sun Size Comparison - 3D',
      channel: 'kidomind', minutes: 4, verified: '2026-08-16',
      teaches: ['size', 'planet', 'sun', 'compare', 'scale'],
      sourceGap: SG
    },
    checkIn: L39_CHECK_IN, beats: L39_BEATS, activity: L39_ACTIVITY, ledger: L39_LEDGER, hook: L39_CHECK_IN,
    core: L39_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L39_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What makes a size model honest?', answer: 'Everything shrinks by the same amount.', why: 'Shrink one thing more and it starts telling lies.' },
      { ask: 'With the sun as a dinner plate, how big is Earth?', answer: 'About a grain of coarse salt.', why: 'Two millimetres against twenty-five centimetres.' }
    ],
    check: [
      { prompt: 'For a size model to be honest, every object must be shrunk:', choices: ['By whatever looks best', 'By the same amount', 'Until it fits the page', 'Only if it is a planet'], answer: 1, feedback: ['Then it is a drawing.', null, 'Fitting the page is what breaks most models.', 'The sun must shrink too.'] },
      { prompt: 'With the sun as a dinner plate, Earth would be about the size of:', choices: ['A tennis ball', 'A marble', 'A grain of salt', 'Another plate'], answer: 2, feedback: ['Far too big.', 'Still far too big.', null, 'The sun is about a hundred times wider.'] },
      { prompt: 'Compared with all eight planets put together, the sun holds:', choices: ['Far more material', 'About the same', 'A little less', 'Far less'], answer: 0, feedback: [null, 'It is not close.', 'It dwarfs them all.', 'It dwarfs them all.'] }
    ]
  },
  {
    id: 'sl-m7-04', course: 'sciencelab', module: 7, quarter: 3, week: 6, day: 1, n: 40,
    title: 'A model where the distances are right',
    minutes: 30, spec: '§10 · beats',
    concept: 'The solar system is overwhelmingly empty, and the gaps between planets grow enormously the further out she goes.',
    standards: ['S4E1d'], offGrade: null,
    words: ['distance', 'gap', 'empty', 'far'],
    glossary: [
      { word: 'distance', plain: 'How far apart two things are.' },
      { word: 'gap', plain: 'The empty space between one planet and the next.' },
      { word: 'empty', plain: 'With nothing in it. Most of the solar system is this.' },
      { word: 'far', plain: 'A very long way. The outer gaps are enormous.' }
    ],
    video: {
      id: 'NjjeLXF9i20', url: 'https://www.youtube.com/watch?v=NjjeLXF9i20',
      title: 'Toilet Paper Scale', channel: 'AusEarthEd', minutes: 4, verified: '2026-08-16',
      teaches: ['scale', 'distance', 'solar system', 'model', 'far'],
      sourceGap: SG
    },
    checkIn: L40_CHECK_IN, beats: L40_BEATS, activity: L40_ACTIVITY, ledger: L40_LEDGER, hook: L40_CHECK_IN,
    core: L40_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L40_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What is a distance model mostly made of?', answer: 'Empty gap.', why: 'The planets take up almost none of it.' },
      { ask: 'What happens to the gaps further out?', answer: 'They get much larger.', why: 'Crowded in close, flung far apart beyond Mars.' }
    ],
    check: [
      { prompt: 'A model that gets the distances right is mostly made of:', choices: ['Planets', 'Empty gap', 'The sun', 'Moons'], answer: 1, feedback: ['They take up almost none of it.', null, 'It sits at one end, tiny.', 'Smaller still.'] },
      { prompt: 'Going outward from the sun, the gaps between planets:', choices: ['Stay the same', 'Get smaller', 'Get much larger', 'Change at random'], answer: 2, feedback: ['They change enormously.', 'That is the wrong way round.', null, 'There is a clear pattern.'] },
      { prompt: 'On a forty-sheet strip from the sun to Neptune, Earth sits at about sheet:', choices: ['One', 'Ten', 'Twenty', 'Thirty'], answer: 0, feedback: [null, 'That is out past Saturn.', 'That is near Uranus.', 'That is Neptune itself.'] }
    ]
  },
  {
    id: 'sl-m7-05', course: 'sciencelab', module: 7, quarter: 3, week: 6, day: 2, n: 41,
    title: 'Why no model can do both at once',
    minutes: 30, spec: '§10 · beats',
    concept: 'Her size model and her distance model contradict each other, and knowing what a model leaves out is the point of the standard.',
    standards: ['S4E1d'], offGrade: null,
    words: ['model', 'scale', 'limit', 'distance'],
    glossary: [
      { word: 'model', plain: 'A stand-in built to show one thing well.' },
      { word: 'scale', plain: 'The amount everything is shrunk by.' },
      { word: 'limit', plain: 'What a model cannot show, however good it is.' },
      { word: 'distance', plain: 'The thing most models quietly give up on.' }
    ],
    video: {
      id: 'zR3Igc3Rhfg', url: 'https://www.youtube.com/watch?v=zR3Igc3Rhfg',
      title: 'To Scale: THE SOLAR SYSTEM', channel: 'To Scale:', minutes: 7, verified: '2026-08-16',
      teaches: ['scale', 'model', 'distance', 'solar system', 'size'],
      // NO coverageNote, and the check was right to refuse one. The video covers
      // three of this lesson's four words, which is comfortably over the line,
      // so an exemption here would be a waiver that is not needed — and a stale
      // exemption is how a rule quietly stops applying to anything.
      //
      // The story is still worth keeping, so it lives here as a note:
      //
      // This is the ONE lesson in Quarter 3 that nearly failed the distinctness
      // test. Three searches for a video about the LIMITATIONS of solar-system
      // models returned nothing usable for a child, which under this project's
      // own rule would have meant the lesson was not distinct enough and Module 7
      // had to be re-cut. The fourth search found this: a short film of a group
      // building a model seven miles across in a desert, made for exactly the
      // reason this lesson exists.
      //
      // Two caveats stated rather than buried. It is made for a general audience
      // rather than for children, and it runs about seven minutes against a
      // thirty-minute block. So it CLOSES the lesson and the two beats do the
      // teaching.
      sourceGap: SG
    },
    checkIn: L41_CHECK_IN, beats: L41_BEATS, activity: L41_ACTIVITY, ledger: L41_LEDGER, hook: L41_CHECK_IN,
    core: L41_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L41_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'Why can one model not show size and distance at once?', answer: 'With the sun as a plate, Neptune would be nearly a kilometre away.', why: 'It stops fitting anywhere.' },
      { ask: 'What is the most useful thing to know about a model?', answer: 'What it leaves out.', why: 'That sentence is the whole of S4E1d.' }
    ],
    check: [
      { prompt: 'A model with the sun as a dinner plate AND the distances right would need:', choices: ['A large table', 'A whole room', 'Most of a mile', 'A sheet of paper'], answer: 2, feedback: ['Nowhere near enough.', 'Still nowhere near enough.', null, 'That is where the cheating starts.'] },
      { prompt: 'The most useful thing to know about any model is:', choices: ['Who built it', 'What it leaves out', 'How pretty it looks', 'How long it took'], answer: 1, feedback: ['That does not tell her what to trust.', null, 'Pretty models mislead just as easily.', 'Effort is not accuracy.'] },
      { prompt: 'A solar system picture in a book is honest about its:', choices: ['Sizes', 'Distances', 'Order', 'Everything at once'], answer: 2, feedback: ['Those are always wrong.', 'Those are always wrong too.', null, 'No picture manages that.'] }
    ]
  },
  {
    id: 'sl-m7-06', course: 'sciencelab', module: 7, quarter: 3, week: 6, day: 3, n: 42,
    title: 'Seeing what her eyes cannot',
    minutes: 30, spec: '§10 · beats',
    concept: 'A telescope above the air sees without any wobble, and every better tool has made the known sky larger.',
    standards: ['S4E1a'], offGrade: null,
    words: ['telescope', 'discover', 'tool', 'air'],
    glossary: [
      { word: 'telescope', plain: 'A tool that gathers far more light than an eye.' },
      { word: 'discover', plain: 'To find something nobody knew was there.' },
      { word: 'tool', plain: 'A thing built to do a job better than hands alone.' },
      { word: 'air', plain: 'What wobbles starlight. A telescope in space sits above it.' }
    ],
    video: {
      id: 'MqrcuWOKeno', url: 'https://www.youtube.com/watch?v=MqrcuWOKeno',
      title: 'How Hubble Works | Spaced Out | Nat Geo Kids',
      channel: 'Nat Geo Kids', minutes: 4, verified: '2026-08-16',
      teaches: ['telescope', 'space', 'discover', 'light', 'air'],
      sourceGap: SG
    },
    checkIn: L42_CHECK_IN, beats: L42_BEATS, activity: L42_ACTIVITY, ledger: L42_LEDGER, hook: L42_CHECK_IN,
    core: L42_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L42_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'Why put a telescope above the air?', answer: 'Nothing wobbles its view.', why: 'The air is what makes stars twinkle.' },
      { ask: 'What has changed most about our knowledge of the sky?', answer: 'The tools we point at it.', why: 'The sky itself has barely changed at all.' }
    ],
    check: [
      { prompt: 'A telescope above our air has one clear advantage, which is that:', choices: ['It is far cheaper', 'It can be much smaller', 'Nothing wobbles its view', 'It needs no looking after'], answer: 2, feedback: ['It costs a great deal more.', 'They are usually enormous.', null, 'It needs a great deal of looking after.'] },
      { prompt: 'What has changed most about our knowledge of the sky over time?', choices: ['The tools we point at it', 'The sky itself', 'How many people look up', 'The names of the stars'], answer: 0, feedback: [null, 'It has barely changed.', 'That is not what found the galaxies.', 'Names are labels, not discoveries.'] },
      { prompt: 'Her four views of one object, from eyes to space telescope, differ because of the:', choices: ['Weather each night', 'Tool used each time', 'Object changing', 'Time of year'], answer: 1, feedback: ['She drew them all on clear nights.', null, 'The object did nothing at all.', 'The season changes nothing here.'] }
    ]
  }
];

export const SCIENCELAB_M7_META = {
  courseId: 'sciencelab',
  module: 7,
  title: 'The Solar System, and What a Model Gets Wrong',
  blurb:
    'Eight worlds in a fixed order, four made of rock and four of cloud. Then she builds a model where the sizes are right, a second where the distances are right, and discovers for herself that they cannot both be true at once — which is exactly what Georgia asked her to work out.'
};

export function m7LessonById(id) {
  return SCIENCELAB_M7.find((l) => l.id === id) || null;
}

export default SCIENCELAB_M7;
