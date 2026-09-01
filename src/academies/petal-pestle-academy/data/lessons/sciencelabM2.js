// ---------------------------------------------------------------------------
// THE SCIENCE LAB — MODULE 2, QUARTER 1, WEEKS 3-4
// GRAVITY, AND WHICH WAY IS DOWN
//
// Georgia S4P3b — "Construct an argument to support the claim that
// gravitational force affects the motion of an object."
//
// ---- THE WORD "ARGUMENT" IS THE WHOLE STANDARD ----
//
// Georgia does not ask her to KNOW about gravity. It asks her to CONSTRUCT AN
// ARGUMENT. So Lesson 12 is not a summary lesson bolted on the end — it is the
// element itself, and the five before it exist to give her something to argue
// from. She collects evidence for four lessons and then makes a case.
//
// ---- LESSON 9 IS THE ONE THAT JUSTIFIES THIS COURSE EXISTING ----
//
// STANDARD_OWNERS has carried this vehicle since v3.5, written before there was
// any lesson to put it in: "Gravity — and the root that grows down whichever
// way the seed lay." A bean jar turned on its side is physical science taught
// through her own garden, and Science Buddies has a real video for exactly it.
// Herbalism could not honestly claim S4P3b. This is how the split pays off.
//
// ---- WHAT THIS MODULE DOES NOT DO ----
//
// It does not teach why gravity exists. Nobody teaches that to a nine-year-old
// honestly, and the ones who try end up saying "mass bends space" to a child
// who has not met either word. It teaches what gravity DOES, which is what the
// standard asks and what she can actually check with her own hands.
//
// The heavy/light drop in Lesson 8 is the misconception every child arrives
// with and most adults keep. It gets its own lesson and its own experiment
// rather than a sentence.
//
// Shape, reading level, safety: as Module 1. Thirty minutes, two beats, an
// Apply-It inside each, a three-question check, ten in the bank. Nothing is
// dropped from higher than a grown-up can safely reach, and the grown-up does
// all the dropping.
// ---------------------------------------------------------------------------

// =========================================================== LESSON 7
const L7_CHECK_IN = {
  title: 'Let go of something. Anything.',
  text: 'Hold a pot over the bench and let go. Now try to make it fall UP instead. Try hard.',
  question: 'Why can nobody in the world do that?'
};

const L7_BEATS = [
  {
    n: 1,
    label: 'A pull that never stops',
    hook: 'Gravity has been pulling on that pot every second it has sat on the shelf, and on you, right now.',
    teachingText:
      'Gravity is a pull. The Earth pulls everything toward itself, all the time, and it never switches off. That is why "down" means the same thing everywhere in the garden.',
    example:
      'Water tipped from a can falls down. Soil knocked off a root falls down. A leaf let go falls down. Same pull, every time.',
    applyIt: {
      prompt: 'A pot has sat on the shelf all year without moving. Is gravity pulling on it?',
      choices: ['No, it is not moving', 'Yes, and the shelf pushes back just as hard', 'Only when you touch it', 'Only if it is heavy'],
      answer: 1,
      feedback: [
        'Take the shelf away and see what happens.',
        null,
        'Gravity does not wait to be asked.',
        'It pulls on a feather too.'
      ],
      why: 'Gravity never stops. The shelf is the only reason the pot stays put — that is balanced forces from Module 1.'
    }
  },
  {
    n: 2,
    label: 'Weight is gravity, doing its work',
    hook: 'When you say a watering can is heavy, you are describing how hard the Earth is pulling on it.',
    teachingText:
      'Weight is the name for how strongly gravity pulls on something. A full can is heavier than an empty one because there is more in it for the Earth to pull on.',
    example:
      'Lift the empty can, then the full one. Your arm can feel the difference, and the difference is gravity.',
    applyIt: {
      prompt: 'Why is a full watering can harder to lift than an empty one?',
      choices: ['Water is sticky', 'Gravity pulls harder on more stuff', 'Empty cans are slippery', 'The handle changes'],
      answer: 1,
      feedback: [
        'Sticky would not make it heavier.',
        null,
        'The handle is the same both times.',
        'It is the same handle.'
      ],
      why: 'More stuff means a stronger pull. That stronger pull is what heavy means.'
    }
  }
];

const L7_ACTIVITY = {
  title: 'Down is the same everywhere',
  prep: 'Nothing.',
  needs: ['a small pot', 'a marble or pebble', 'a leaf', 'a bowl of water'],
  steps: [
    'Drop the pebble in four different corners of the greenhouse. Which way did it go each time?',
    'Tip a little water out of a can. Which way?',
    'Hold a leaf high and let go. Which way, in the end?',
    'Now lie on the floor and drop the pebble from there. Still down?',
    'Write one sentence: what does gravity do, every single time?'
  ],
  safety: 'Nothing dropped from above shoulder height. Nothing dropped on a foot.',
  minutes: 10
};

const L7_LEDGER = {
  prompt: 'Write down three things you saw fall today, and the one thing they had in common.',
  ifSheIsStuck: 'The common thing is the direction. Everything went the same way, and nothing chose it.'
};

// =========================================================== LESSON 8
const L8_CHECK_IN = {
  title: 'Guess first, then look',
  text: 'Hold a big stone in one hand and a small pebble in the other, at exactly the same height.',
  question: 'Which hits the bench first — and say it out loud before you let go.'
};

const L8_BEATS = [
  {
    n: 1,
    label: 'Almost everybody guesses wrong',
    hook: 'People believed heavy things fall faster for about two thousand years. They were wrong.',
    teachingText:
      'If two things are a similar shape, gravity brings them down together — however different their weights. The heavy one is pulled harder, but there is also more of it to get moving. The two cancel out.',
    example:
      'A big stone and a small pebble dropped together land together. Try it. It looks wrong the first time.',
    applyIt: {
      prompt: 'A big stone and a small pebble are dropped together. They land:',
      choices: ['Stone first, clearly', 'Pebble first', 'Together', 'It changes every time'],
      answer: 2,
      feedback: [
        'That is the guess almost everyone makes.',
        'Being small does not help either.',
        null,
        'Do it five times. It does not change.'
      ],
      why: 'Similar shapes fall together whatever they weigh. This is the one everybody has to see to believe.'
    }
  },
  {
    n: 2,
    label: 'So why does a leaf lose?',
    hook: 'If weight does not matter, why does a leaf take so long?',
    teachingText:
      'Shape matters, not weight. A wide flat leaf catches a lot of air on the way down, and that air pushes back. You met that force in Module 1 — air resistance.',
    example:
      'A leaf flutters. Crumple the same leaf into a ball, and it drops almost like a pebble. Same leaf, same weight, different shape.',
    applyIt: {
      prompt: 'What actually made the leaf slow, if not its weight?',
      choices: ['It is alive', 'Its wide flat shape catching air', 'Leaves are special', 'Gravity is weaker on leaves'],
      answer: 1,
      feedback: [
        'A dead dry leaf falls the same way.',
        null,
        'Paper cut to the same shape does it too.',
        'Gravity pulls on everything the same way.'
      ],
      why: 'Shape decides how much air resistance something gets. Weight had almost nothing to do with it.'
    }
  }
];

const L8_ACTIVITY = {
  title: 'The two-hand drop',
  prep: 'Pick pairs that are a similar shape but very different weights.',
  needs: ['a big stone and a small pebble', 'a full jar and an empty jar with lids on', 'two sheets of paper', 'her notebook'],
  steps: [
    'Write your prediction for each pair before you drop anything.',
    'Stone and pebble, same height, let go at exactly the same moment. Watch, do not blink.',
    'Do it three more times. Was it luck?',
    'Full jar and empty jar. Same test. Lids ON.',
    'Now the two sheets of paper — drop them flat. Same time?',
    'Crumple ONE sheet into a ball. Drop the flat one and the ball together.',
    'Write down which test surprised you and why.'
  ],
  safety:
    'Drop from waist height onto grass or a towel, never onto a foot and never onto glass. Jars stay shut.',
  minutes: 12
};

const L8_LEDGER = {
  prompt: 'You predicted something before you dropped them. Write what you predicted and what really happened.',
  ifSheIsStuck: 'If she predicted the stone would win, say so proudly on the page — so did everyone for two thousand years.'
};

// =========================================================== LESSON 9
const L9_CHECK_IN = {
  title: 'The bean that was planted upside down',
  text: 'Look at a bean that has sprouted in a jar. Find the root and the shoot.',
  question: 'Nobody told that root which way to grow. So how did it know?'
};

const L9_BEATS = [
  {
    n: 1,
    label: 'A root can feel which way is down',
    hook: 'Plant a seed upside down, sideways, any way you like. The root still finds down.',
    teachingText:
      'Roots sense gravity and grow toward it. Shoots sense the same pull and grow away from it. A seed does not need to be planted the right way up — it works it out.',
    example:
      'A bean sprouted in a jar, then turned on its side, will bend its root within a day or two. The tip curves down again.',
    applyIt: {
      prompt: 'She turns the sprouting jar on its side. In two days the root has:',
      choices: ['Kept going straight sideways', 'Curved to head down again', 'Stopped growing', 'Turned into a shoot'],
      answer: 1,
      feedback: [
        'It does not just carry on. It corrects.',
        null,
        'It keeps growing the whole time.',
        'A root stays a root.'
      ],
      why: 'The root re-reads which way gravity is pulling and turns to follow it.'
    }
  },
  {
    n: 2,
    label: 'This is gravity changing how something moves',
    hook: 'Growing is moving. It is just slow enough to need a camera.',
    teachingText:
      'Georgia asks her to argue that gravity affects how things move. A root turning is exactly that — gravity changed the direction of something that was already going.',
    example:
      'A dropped stone shows gravity in a second. A bending root shows the same force over two days, and she can watch it happen in her own kitchen.',
    applyIt: {
      prompt: 'Why is a bending root good evidence that gravity changes motion?',
      choices: [
        'Because roots are strong',
        'Because gravity changed the direction it was growing',
        'Because it grew faster',
        'Because it happened in the dark'
      ],
      answer: 1,
      feedback: [
        'Strength is not the point.',
        null,
        'Speed did not change. Direction did.',
        'Dark rules out light being the cause, but that is not the evidence itself.'
      ],
      why: 'Changing direction IS changing motion. That was Module 1, Lesson 5.'
    }
  }
];

const L9_ACTIVITY = {
  title: 'Turn the jar and wait',
  prep: 'Start this at the beginning of the week. It needs two days, and it is worth them.',
  needs: ['a clear jar', 'kitchen paper', 'three dried beans', 'water', 'a marker', 'tape'],
  steps: [
    'Line the jar with damp kitchen paper. Tuck three beans between the paper and the glass.',
    'Stand it somewhere warm. Keep the paper damp, never soaking.',
    'When roots are about as long as a fingernail, draw an arrow on the glass showing which way each points.',
    'Now lay the jar on its side. Tape it so it cannot roll.',
    'Predict: what will the roots do? Write it down.',
    'Check morning and evening for two days. Draw what you see each time.',
    'A dark cupboard is worth trying for one bean, so nobody can say it was following the light.'
  ],
  safety: 'Beans in the jar are not a snack. Glass jar stays on the bench, not near the edge.',
  minutes: 12
};

const L9_LEDGER = {
  prompt: 'Draw the root before and after you turned the jar. Then write one sentence saying what made it turn.',
  ifSheIsStuck:
    'Ask her what was different about the jar after she turned it. The only thing that changed was which way gravity pointed relative to the bean.'
};

// =========================================================== LESSON 10
const L10_CHECK_IN = {
  title: 'Two words people mix up every day',
  text: 'Put a bag of compost on the kitchen scale. Write down the number.',
  question: 'Is that number about how much compost there is, or about how hard the Earth is pulling it?'
};

const L10_BEATS = [
  {
    n: 1,
    label: 'Mass is how much stuff',
    hook: 'Take a bag of compost to the moon and none of it falls out. There is exactly as much of it there.',
    teachingText:
      'Mass is how much material something is made of. It does not change when you move it. A bag of compost has the same mass in the greenhouse, on a mountain, or on the moon.',
    example:
      'Pour half the compost out and the mass halves — because there is genuinely less of it now.',
    applyIt: {
      prompt: 'She carries the compost bag up a mountain. Its mass:',
      choices: ['Gets bigger', 'Gets smaller', 'Stays exactly the same', 'Disappears'],
      answer: 2,
      feedback: [
        'Nothing was added on the way up.',
        'Nothing fell out either.',
        null,
        'It is still in her arms.'
      ],
      why: 'Mass is about how much there is, and carrying something does not change that.'
    }
  },
  {
    n: 2,
    label: 'Weight is the pull on it',
    hook: 'The same bag would make the scale read differently on the moon, without losing a single crumb.',
    teachingText:
      'Weight is how hard gravity pulls on that mass. Change the gravity and the weight changes, even though the mass has not. On Earth they go together, which is why people mix the words up.',
    example:
      'Same bag, Earth: heavy. Same bag, moon: you could lift it with one hand. Same amount of compost either way.',
    applyIt: {
      prompt: 'On the moon, the compost bag would have:',
      choices: [
        'Less mass and less weight',
        'The same mass but less weight',
        'More mass and the same weight',
        'No mass at all'
      ],
      answer: 1,
      feedback: [
        'None of it fell out on the way.',
        null,
        'Nothing was added.',
        'It is still made of compost.'
      ],
      why: 'Mass travels with it. Weight depends on where it is standing.'
    }
  }
];

const L10_ACTIVITY = {
  title: 'Weigh the same thing three ways',
  prep: 'A kitchen scale and a spring scale or luggage scale if you have one.',
  needs: ['a kitchen scale', 'a bag of soil', 'a jug of water', 'a jug of dry leaves', 'her notebook'],
  steps: [
    'Fill three identical containers: one soil, one water, one dry leaves.',
    'Predict which has the most mass. Write it down.',
    'Weigh each one. Same container, so only the contents differ.',
    'Now say out loud, for each: "this much stuff, this much pull."',
    'Work out roughly what each would weigh on the moon — a moon pull is about a sixth of ours.',
    'Write down which number changed and which did not.'
  ],
  safety: 'Water near a kitchen scale gets wiped up straight away.',
  minutes: 12
};

const L10_LEDGER = {
  prompt: 'Write the difference between mass and weight in your own words, using the compost bag.',
  ifSheIsStuck:
    'Two questions: how much is there, and how hard is it being pulled. One of those changes on the moon and one does not.'
};

// =========================================================== LESSON 11
const L11_CHECK_IN = {
  title: 'The same girl, six different numbers',
  text: 'Write down what you weigh. Now imagine standing on six different worlds with the same scale.',
  question: 'Would the scale say the same thing on every one? Why not?'
};

const L11_BEATS = [
  {
    n: 1,
    label: 'Bigger world, stronger pull',
    hook: 'On the moon she could jump nearly six times as high, in the same body.',
    teachingText:
      'How hard a world pulls depends on how much of it there is. The moon is much smaller than Earth, so its pull is about a sixth of ours. Jupiter is enormous, so its pull is far stronger.',
    example:
      'A girl who weighs 60 pounds here would tip the scale at about 10 pounds on the moon, and about 140 on Jupiter. Same girl, three numbers.',
    applyIt: {
      prompt: 'She weighs less on the moon because:',
      choices: [
        'She lost some of herself getting there',
        'The moon pulls more weakly than Earth',
        'There is no gravity on the moon',
        'Space is cold'
      ],
      answer: 1,
      feedback: [
        'She arrived entirely intact.',
        null,
        'There is. It is weaker, not absent — astronauts come back down.',
        'Cold does not weigh anything.'
      ],
      why: 'The moon has less material, so its pull is weaker. Her mass never changed.'
    }
  },
  {
    n: 2,
    label: 'Her garden would be strange there',
    hook: 'A watering can on the moon pours, but the water arcs slowly and lands a long way off.',
    teachingText:
      'Everything gravity does here would still happen on the moon, only gentler. Things would still fall — they would just take longer about it, and land further away.',
    example:
      'Drop a trowel on the moon and it lands. It takes about two and a half times as long, and you would have time to watch it.',
    applyIt: {
      prompt: 'A trowel dropped on the moon would:',
      choices: ['Float away', 'Fall, but more slowly', 'Fall exactly as fast as on Earth', 'Fall upward'],
      answer: 1,
      feedback: [
        'Weaker gravity is not no gravity.',
        null,
        'The pull is weaker, so it takes longer.',
        'Nowhere works like that.'
      ],
      why: 'A weaker pull still pulls. It just takes its time.'
    }
  }
];

const L11_ACTIVITY = {
  title: 'Your weight on six worlds',
  prep: 'Use these rough multipliers — the Moon 0.17, Mars 0.38, Earth 1, Saturn 1.07, Neptune 1.14, Jupiter 2.34.',
  needs: ['a scale', 'a calculator', 'her notebook', 'coloured pencils'],
  steps: [
    'Weigh yourself, or weigh a favourite thing if you would rather.',
    'Multiply that number by each of the six numbers above.',
    'Draw a bar for each world, tallest to shortest.',
    'Which world is nearest to Earth? Which is the strangest?',
    'Now do the same for your watering can.',
    'Write one sentence about what did NOT change on any of the six.'
  ],
  safety: 'None. This one is arithmetic and colouring.',
  minutes: 12
};

const L11_LEDGER = {
  prompt: 'Which world would you most like to garden on, and what would be hard about it?',
  ifSheIsStuck:
    'Mars is the popular answer. Ask her what a watering can would do there, and whether a tall sunflower could hold itself up.'
};

// =========================================================== LESSON 12
const L12_CHECK_IN = {
  title: 'A question with a real answer',
  text: 'The Earth pulls on the moon. You have spent four lessons proving that gravity pulls things down.',
  question: 'So why has the moon not landed on us?'
};

const L12_BEATS = [
  {
    n: 1,
    label: 'It IS falling. It keeps missing.',
    hook: 'The moon is falling toward the Earth right now, and has been for four and a half billion years.',
    teachingText:
      'The moon is moving sideways very fast at the same time as being pulled down. It falls, and it moves past, and it falls, and it moves past. Going round and round like that is called an orbit.',
    example:
      'Whirl a conker on a string. The string pulls it toward your hand and it never arrives, because it keeps going sideways. Let the string go and it flies off in a straight line.',
    applyIt: {
      prompt: 'If the Earth suddenly stopped pulling on the moon, the moon would:',
      choices: ['Fall straight down onto us', 'Fly off in a straight line', 'Stop dead', 'Go round faster'],
      answer: 1,
      feedback: [
        'It falls because it is pulled. Stop pulling and it stops falling.',
        null,
        'It is already moving fast sideways.',
        'Nothing would be left to bend its path.'
      ],
      why: 'Gravity is the thing bending its path into a circle. Take it away and it goes straight.'
    }
  },
  {
    n: 2,
    label: 'Now make the argument',
    hook: 'Georgia does not ask her to know about gravity. It asks her to argue for it, with evidence.',
    teachingText:
      'An argument needs a claim and then evidence for it. The claim is: gravity changes how things move. Everything in this module is evidence — the drop, the root, the moon.',
    example:
      'Claim: gravity changes how things move. Evidence: a dropped stone speeds up. A root turned sideways bends back down. The moon travels in a circle instead of a straight line.',
    applyIt: {
      prompt: 'Which of these is the strongest evidence that gravity changes DIRECTION, not just speed?',
      choices: [
        'A stone falls fast',
        'A root turned sideways bends back down',
        'A full can is heavy',
        'Water is wet'
      ],
      answer: 1,
      feedback: [
        'That shows speed changing, which is true but not direction.',
        null,
        'That shows weight, not a change of motion.',
        'Not evidence for anything here.'
      ],
      why: 'The root was going one way and ended up going another. That is direction, and she grew it herself.'
    }
  }
];

const L12_ACTIVITY = {
  title: 'Write the argument',
  prep: 'Have her notebook from Lessons 7 to 11 open beside her. This lesson uses all of it.',
  needs: ['her notebook from this module', 'a conker or a ball on a string', 'a clear space outdoors'],
  steps: [
    'Whirl the ball on the string. Feel the pull in your fingers.',
    'Let go — safely, away from everyone — and watch which way it goes.',
    'Now open the notebook at Lessons 7, 8, 9 and 11.',
    'Write the claim at the top: "Gravity changes how things move."',
    'Underneath, write three pieces of evidence from your OWN four experiments.',
    'For each one, write a sentence saying what it proves.',
    'Read it out loud to a grown-up. If they can argue back, add another piece.'
  ],
  safety:
    'Let go of the string outdoors, pointing away from people, windows and the greenhouse. A soft ball, not a stone.',
  minutes: 14
};

const L12_LEDGER = {
  prompt: 'Your finished argument: the claim, then three pieces of evidence you gathered yourself.',
  ifSheIsStuck:
    'She has four experiments in the notebook. Point at any one and ask what it showed. That sentence is a piece of evidence, and she wrote it a week ago.'
};

// ---------------------------------------------------------------------------

export const SCIENCELAB_M2 = [
  {
    id: 'sl-m2-01',
    course: 'sciencelab',
    module: 2,
    quarter: 1,
    week: 3,
    day: 1,
    n: 7,
    title: 'The pull that never switches off',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Gravity is a pull toward the Earth that never stops, and weight is the name for how hard it pulls.',
    standards: ['S4P3b'],
    offGrade: null,
    words: ['gravity', 'pull', 'weight', 'Earth'],
    glossary: [
      { word: 'gravity', plain: 'The pull that the Earth gives everything, all the time.' },
      { word: 'pull', plain: 'A force that brings something toward something else.' },
      { word: 'weight', plain: 'How hard gravity is pulling on a thing.' },
      { word: 'Earth', plain: 'The world she is standing on. It does the pulling.' }
    ],
    video: {
      id: 'ljRlB6TuMOU',
      url: 'https://www.youtube.com/watch?v=ljRlB6TuMOU',
      title: 'Defining Gravity: Crash Course Kids #4.1',
      channel: 'Crash Course Kids',
      minutes: 4,
      verified: '2026-08-16',
      teaches: ['gravity', 'pull', 'weight', 'Earth', 'force'],
      sourceGap:
        'No Black American educator found for elementary gravity. Searched: "Black science teacher forces and motion elementary students", "African American educator physical science kids channel", "STEM with a Black teacher forces push pull elementary lesson". Open.'
    },
    checkIn: L7_CHECK_IN,
    beats: L7_BEATS,
    activity: L7_ACTIVITY,
    ledger: L7_LEDGER,
    hook: L7_CHECK_IN,
    core: L7_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L7_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What does gravity do?', answer: 'Pulls everything toward the Earth, all the time.', why: 'It never switches off.' },
      { ask: 'What is weight?', answer: 'How hard gravity is pulling on something.', why: 'More stuff means a stronger pull.' }
    ],
    check: [
      { prompt: 'A pot sits on a shelf all year. Is gravity pulling on it?', choices: ['Yes, and the shelf pushes back equally', 'No, it is not moving', 'Only when touched', 'Only if heavy'], answer: 0, feedback: [null, 'Remove the shelf and find out.', 'Gravity does not wait to be asked.', 'It pulls on a feather too.'] },
      { prompt: 'Why is a full watering can harder to lift?', choices: ['Water is sticky', 'The handle changes', 'Gravity pulls harder on more stuff', 'It is colder'], answer: 2, feedback: ['Sticky is not heavy.', 'Same handle both times.', null, 'Temperature has no weight.'] },
      { prompt: 'Which way does gravity pull, in every corner of the garden?', choices: ['Toward the greenhouse', 'Down', 'Toward the sun', 'It changes'], answer: 1, feedback: ['The greenhouse does not pull.', null, 'The sun is far too far away to notice here.', 'It is the same everywhere.'] }
    ]
  },
  {
    id: 'sl-m2-02',
    course: 'sciencelab',
    module: 2,
    quarter: 1,
    week: 3,
    day: 2,
    n: 8,
    title: 'Drop the heavy one and the light one together',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Things of a similar shape fall together whatever they weigh; it is shape, not weight, that slows a leaf.',
    standards: ['S4P3b'],
    offGrade: null,
    words: ['gravity', 'fall', 'heavier', 'shape'],
    glossary: [
      { word: 'gravity', plain: 'The pull of the Earth on everything.' },
      { word: 'fall', plain: 'To be pulled down by gravity.' },
      { word: 'heavier', plain: 'Pulled on more strongly by gravity.' },
      { word: 'shape', plain: 'How wide or flat something is as it moves.' }
    ],
    video: {
      id: 'b7jAzyxdbw4',
      url: 'https://www.youtube.com/watch?v=b7jAzyxdbw4',
      title: 'Do Heavier Objects Fall Faster? Easy Gravity Experiment!',
      channel: 'Mind of Mason',
      minutes: 4,
      verified: '2026-08-16',
      teaches: ['gravity', 'fall', 'heavier', 'shape', 'air resistance'],
      sourceGap:
        'Channel identity not confirmed either way and recorded as unknown rather than counted as a gap closed. No channel found that is confirmed as a Black American educator on this topic. Open.'
    },
    checkIn: L8_CHECK_IN,
    beats: L8_BEATS,
    activity: L8_ACTIVITY,
    ledger: L8_LEDGER,
    hook: L8_CHECK_IN,
    core: L8_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L8_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'A big stone and a small pebble, dropped together. Which lands first?', answer: 'They land together.', why: 'Similar shapes fall together whatever they weigh.' },
      { ask: 'So why is a leaf slow?', answer: 'Its wide flat shape catches air.', why: 'That is air resistance, not weight.' }
    ],
    check: [
      { prompt: 'A big stone and a small pebble are dropped together. They land:', choices: ['Stone first', 'Pebble first', 'Differently each time', 'Together'], answer: 3, feedback: ['The guess almost everyone makes.', 'Small does not help.', 'Try it five times.', null] },
      { prompt: 'The leaf falls slowly because of its:', choices: ['Shape', 'Weight', 'Colour', 'Age'], answer: 0, feedback: [null, 'Crumple it and it falls fast at the same weight.', 'Colour does not catch air.', 'A dry dead leaf does the same.'] },
      { prompt: 'Crumpling a leaf into a ball makes it fall faster because:', choices: ['It got heavier', 'It catches less air', 'Gravity got stronger', 'It is smaller so lighter'], answer: 1, feedback: ['Nothing was added.', null, 'Gravity did not change.', 'Its weight is exactly the same.'] }
    ]
  },
  {
    id: 'sl-m2-03',
    course: 'sciencelab',
    module: 2,
    quarter: 1,
    week: 3,
    day: 3,
    n: 9,
    title: 'The root that grows down whichever way the seed lay',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Roots sense gravity and grow toward it, which is gravity changing the direction of something living.',
    standards: ['S4P3b'],
    offGrade: null,
    words: ['gravity', 'root', 'down', 'direction'],
    glossary: [
      { word: 'gravity', plain: 'The pull of the Earth.' },
      { word: 'root', plain: 'The first part out of a seed. It always heads down.' },
      { word: 'down', plain: 'The way gravity pulls.' },
      { word: 'direction', plain: 'Which way something is going.' }
    ],
    video: {
      id: 'FSMbrMxCyYU',
      url: 'https://www.youtube.com/watch?v=FSMbrMxCyYU',
      title: 'Bending Plant Roots with Gravity | STEM Lesson Plan',
      channel: 'Science Buddies',
      minutes: 5,
      verified: '2026-08-16',
      teaches: ['gravity', 'root', 'down', 'direction', 'bending'],
      sourceGap: 'No Black American educator found for gravitropism at elementary level. Searched. Open.'
    },
    checkIn: L9_CHECK_IN,
    beats: L9_BEATS,
    activity: L9_ACTIVITY,
    ledger: L9_LEDGER,
    hook: L9_CHECK_IN,
    core: L9_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L9_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'A seed is planted upside down. Which way does the root grow?', answer: 'Down, the same as always.', why: 'It senses gravity and turns to follow it.' },
      { ask: 'Why is a bending root good evidence about gravity?', answer: 'Gravity changed the direction it was growing.', why: 'Changing direction is changing motion.' }
    ],
    check: [
      { prompt: 'The sprouting jar is turned on its side. In two days the root has:', choices: ['Stopped', 'Kept going sideways', 'Curved to head down again', 'Become a shoot'], answer: 2, feedback: ['It keeps growing.', 'It corrects itself.', null, 'A root stays a root.'] },
      { prompt: 'One bean is grown in a dark cupboard so that nobody can say the root was following:', choices: ['The light', 'The water', 'The soil', 'The wind'], answer: 0, feedback: [null, 'The paper is damp all over.', 'There is no soil in the jar.', 'There is no wind in a jar.'] },
      { prompt: 'A root turning shows gravity changing an object’s:', choices: ['Colour', 'Weight', 'Direction', 'Mass'], answer: 2, feedback: ['Roots stay white.', 'Its weight barely alters.', null, 'Nothing was added or taken away.'] }
    ]
  },
  {
    id: 'sl-m2-04',
    course: 'sciencelab',
    module: 2,
    quarter: 1,
    week: 4,
    day: 1,
    n: 10,
    title: 'Heavy is not the same as how much stuff',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Mass is how much material there is; weight is how hard gravity pulls on it, and only one of them travels.',
    standards: ['S4P3b'],
    offGrade: null,
    words: ['mass', 'weight', 'gravity'],
    glossary: [
      { word: 'mass', plain: 'How much stuff something is made of. It never changes when you move it.' },
      { word: 'weight', plain: 'How hard gravity pulls on that stuff. It changes if the gravity changes.' },
      { word: 'gravity', plain: 'The pull a world gives everything on it.' }
    ],
    video: {
      id: 'HG_Z1bKs6ow',
      url: 'https://www.youtube.com/watch?v=HG_Z1bKs6ow',
      title: 'Difference between MASS and WEIGHT',
      channel: 'MooMooMath and Science',
      minutes: 3,
      verified: '2026-08-16',
      teaches: ['mass', 'weight', 'gravity', 'difference'],
      sourceGap: 'No Black American educator found for mass and weight at elementary level. Searched. Open.'
    },
    checkIn: L10_CHECK_IN,
    beats: L10_BEATS,
    activity: L10_ACTIVITY,
    ledger: L10_LEDGER,
    hook: L10_CHECK_IN,
    core: L10_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L10_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What is mass?', answer: 'How much stuff something is made of.', why: 'Moving it does not change it.' },
      { ask: 'What is weight?', answer: 'How hard gravity pulls on that stuff.', why: 'Change the world you stand on and it changes.' }
    ],
    check: [
      { prompt: 'On the moon, the compost bag would have:', choices: ['Less mass and less weight', 'More mass, same weight', 'The same mass but less weight', 'No mass'], answer: 2, feedback: ['None of it fell out.', 'Nothing was added.', null, 'It is still compost.'] },
      { prompt: 'Carrying a bag up a mountain changes its:', choices: ['Mass a lot', 'Mass not at all', 'Colour', 'Shape'], answer: 1, feedback: ['Nothing was added or lost.', null, 'Carrying does not repaint it.', 'It is the same bag.'] },
      { prompt: 'People mix up mass and weight because on Earth:', choices: ['They always go together', 'They are the same word', 'Neither can be measured', 'Scales are broken'], answer: 0, feedback: [null, 'They are two different words for two different things.', 'Both can be measured.', 'Scales work fine.'] }
    ]
  },
  {
    id: 'sl-m2-05',
    course: 'sciencelab',
    module: 2,
    quarter: 1,
    week: 4,
    day: 2,
    n: 11,
    title: 'What she would weigh on the moon',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'How hard a world pulls depends on how much of it there is, so the same body weighs different amounts on different worlds.',
    standards: ['S4P3b'],
    offGrade: null,
    words: ['weight', 'moon', 'planet', 'gravity'],
    glossary: [
      { word: 'weight', plain: 'How hard the world you are on pulls you.' },
      { word: 'moon', plain: 'The small world that goes around ours. Its pull is about a sixth of ours.' },
      { word: 'planet', plain: 'A big world going around a star.' },
      { word: 'gravity', plain: 'The pull. Bigger worlds pull harder.' }
    ],
    video: {
      id: 'FAvyyT0LyW0',
      url: 'https://www.youtube.com/watch?v=FAvyyT0LyW0',
      title: 'Solar System :How much would you weigh on other planets??',
      channel: 'Very Important Things',
      minutes: 4,
      verified: '2026-08-16',
      teaches: ['weight', 'moon', 'planet', 'gravity', 'solar system'],
      sourceGap: 'No Black American educator found for weight on other worlds at elementary level. Searched. Open.'
    },
    checkIn: L11_CHECK_IN,
    beats: L11_BEATS,
    activity: L11_ACTIVITY,
    ledger: L11_LEDGER,
    hook: L11_CHECK_IN,
    core: L11_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L11_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'Why does she weigh less on the moon?', answer: 'The moon is smaller, so its pull is weaker.', why: 'Her mass never changed.' },
      { ask: 'Would a dropped trowel still fall on the moon?', answer: 'Yes, just more slowly.', why: 'Weaker gravity is not no gravity.' }
    ],
    check: [
      { prompt: 'She weighs less on the moon because:', choices: ['She lost part of herself', 'There is no gravity there', 'The moon pulls more weakly', 'Space is cold'], answer: 2, feedback: ['She arrived intact.', 'There is gravity — it is weaker.', null, 'Cold weighs nothing.'] },
      { prompt: 'A trowel dropped on the moon would:', choices: ['Float away', 'Fall as fast as on Earth', 'Fall upward', 'Fall, but more slowly'], answer: 3, feedback: ['Weaker is not absent.', 'The pull is weaker.', 'Nowhere works like that.', null] },
      { prompt: 'Jupiter pulls harder than Earth because it:', choices: ['Is further from the sun', 'Has much more material in it', 'Spins faster', 'Is colder'], answer: 1, feedback: ['Distance from the sun does not decide its own pull.', null, 'Spin is a different thing.', 'Cold does not pull.'] }
    ]
  },
  {
    id: 'sl-m2-06',
    course: 'sciencelab',
    module: 2,
    quarter: 1,
    week: 4,
    day: 3,
    n: 12,
    title: 'Why the moon does not fall on us',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'An orbit is falling and moving sideways at once — and this lesson is where she builds the argument the standard asks for.',
    standards: ['S4P3b'],
    offGrade: null,
    words: ['orbit', 'gravity', 'moon', 'evidence'],
    glossary: [
      { word: 'orbit', plain: 'Going round and round something because its pull keeps bending your path.' },
      { word: 'gravity', plain: 'The pull that does the bending.' },
      { word: 'moon', plain: 'The world going around ours.' },
      { word: 'evidence', plain: 'Something you saw yourself that backs up what you are claiming.' }
    ],
    video: {
      id: '7vDDChKwMTw',
      url: 'https://www.youtube.com/watch?v=7vDDChKwMTw',
      title: "🌙 Why Doesn't the Moon Fall Down? | Gravity & Orbits Explained for Kids! 🚀",
      channel: 'STEM Spark Zone',
      minutes: 5,
      verified: '2026-08-16',
      teaches: ['orbit', 'gravity', 'moon', 'falling', 'sideways'],
      // NO coverageNote, and that is deliberate. This carried one until v3.26,
      // written while Module 2 was drafted on its own: it said the video covers
      // the orbit and that "evidence" is taught by the grown-up. Both halves of
      // that are still true — but the video covers three of this lesson's four
      // words, which is well over the line the check draws, so the exemption is
      // not needed to pass and check-sciencelab fails the build for carrying one
      // that is not. A stale exemption is how a rule quietly stops applying to
      // anything, so the reason lives here as a note and not as a waiver.
      //
      // What it says is worth keeping: the second half of this lesson is her
      // building the S4P3b argument out of her own four experiments, and no
      // video teaches that. A grown-up and a notebook do.
      sourceGap: 'No Black American educator found for orbits at elementary level. Searched. Open.'
    },
    checkIn: L12_CHECK_IN,
    beats: L12_BEATS,
    activity: L12_ACTIVITY,
    ledger: L12_LEDGER,
    hook: L12_CHECK_IN,
    core: L12_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L12_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'Why does the moon not land on us?', answer: 'It is moving sideways fast, so it keeps missing.', why: 'That is what an orbit is.' },
      { ask: 'What are the two parts of an argument?', answer: 'A claim, and evidence for it.', why: 'She has four experiments of evidence.' }
    ],
    check: [
      { prompt: 'If the Earth stopped pulling on the moon, the moon would:', choices: ['Fly off in a straight line', 'Fall straight onto us', 'Stop dead', 'Go round faster'], answer: 0, feedback: [null, 'It falls because it is pulled.', 'It is already moving fast.', 'Nothing would bend its path.'] },
      { prompt: 'An orbit happens when something is:', choices: ['Standing still', 'Falling and moving sideways at once', 'Being pushed round', 'Too light to fall'], answer: 1, feedback: ['Then it would just drop.', null, 'Nothing is pushing it.', 'Weight is not the reason.'] },
      { prompt: 'Which is the strongest evidence that gravity changes DIRECTION?', choices: ['A stone falls fast', 'A full can is heavy', 'A root turned sideways bends back down', 'Water is wet'], answer: 2, feedback: ['That is speed, not direction.', 'That is weight.', null, 'Not evidence here.'] }
    ]
  }
];

export const SCIENCELAB_M2_META = {
  courseId: 'sciencelab',
  module: 2,
  title: 'Gravity, and Which Way Is Down',
  blurb:
    'The pull that never switches off. Why a stone and a pebble land together, why a root knows which way is down, and why the moon has been falling toward us for four and a half billion years without arriving.'
};

export function m2LessonById(id) {
  return SCIENCELAB_M2.find((l) => l.id === id) || null;
}

export default SCIENCELAB_M2;
