// ---------------------------------------------------------------------------
// THE SCIENCE LAB — MODULE 1, QUARTER 1, WEEKS 1-2
// PUSH, PULL, AND WHAT WINS
//
// Georgia S4P3a — "Plan and carry out an investigation on the effects of
// balanced and unbalanced forces on an object and communicate the results."
//
// ---- WHY THIS COURSE EXISTS ----
//
// Khan cannot teach her science. /science/3rd-, 4th- and 5th-grade-science were
// all rendered in a browser on Aug 16 2026 and every one returns "Page not
// found". Khan's science index now starts at 6th grade. Herbalism carries the
// ten Georgia elements a garden owns outright; these lessons carry six of the
// fifteen it cannot.
//
// ---- SIX LESSONS, SIX DIFFERENT TOPICS ----
//
// The first draft of this module put six lessons on one idea and then hunted
// six videos for it. Gigi caught it: "make sure you used the same format as
// Herbalism and just didnt add random videos that has nothing to do with the
// lesson." One lesson called "the pulley and the screw" had a video about
// levers.
//
// Herbalism works because every lesson is a genuinely different thing — seeds,
// the life cycle, dispersal, annuals, what a plant needs, look-alikes. So this
// module is six real topics: naming forces, balance, a measured tug of war,
// friction, direction and speed, and air pushing back. Every video below names
// its own lesson.
//
// RULE ADOPTED: if no video exists that teaches a lesson, the lesson is not
// distinct enough. That is not a licence to reach for something adjacent.
//
// ---- SHAPE ----
//
// The §10 beats standard, same as Inside a Seed: a Check-In, TWO beats each
// with a hook, teaching, a worked example and an Apply-It answered on the spot,
// then a 3-question check. Ten more questions live in the bank and the Thursday
// test draws from there.
//
// THIRTY MINUTES, not Herbalism's forty-five. This is blk-science at 2:10, and
// the activities are sized for it — nothing here needs a twenty-minute build.
//
// Reading level ~2.5. Force words are exempt from the long-word count the same
// way "photosynthesis" is in Herbalism.
//
// ---- SAFETY ----
//
// Nothing in this module is tasted, heated or thrown. The heaviest thing she
// lifts is a watering can. The tug-of-war uses string that is meant to snap.
// ---------------------------------------------------------------------------

// =========================================================== LESSON 1
const L1_CHECK_IN = {
  title: 'Move something without touching it with your hands',
  text: 'Put a seed tray on the bench. Move it using only one finger. Now move it back a different way.',
  question: 'You just did two different things to that tray. What were they?'
};

const L1_BEATS = [
  {
    n: 1,
    label: 'There are only two',
    hook: 'Every single way of moving anything is a push or a pull. There is no third one.',
    teachingText:
      'A force is a push or a pull. That is the whole word. When you slide a pot away from you, that is a push. When you drag it back, that is a pull.',
    example:
      'Opening the greenhouse door is a pull. Closing it is a push. Same door, same hand, two different forces.',
    applyIt: {
      prompt: 'You pick up a full watering can. Push or pull?',
      choices: ['A push', 'A pull', 'Neither', 'Both at once'],
      answer: 1,
      feedback: [
        'A push moves something away from you.',
        null,
        'Something moved, so a force did it.',
        'Lifting is one force, going one way — up, toward you.'
      ],
      why: 'Lifting is pulling something up toward you. Up is a direction like any other.'
    }
  },
  {
    n: 2,
    label: 'A force needs somewhere to go',
    hook: 'You can push a wall as hard as you like all afternoon and the wall will not care.',
    teachingText:
      'A force always has a direction. Not just how hard — which way. If you say "I pushed it," the next question is always "which way?"',
    example:
      'Push the wheelbarrow north and it goes north. Push the same wheelbarrow just as hard from the other side and it goes south. Same push, opposite way.',
    applyIt: {
      prompt: 'Two people push a wheelbarrow, one from each end, exactly as hard. Which way does it go?',
      choices: ['Toward the stronger one', 'Nowhere', 'It speeds up', 'It tips over'],
      answer: 1,
      feedback: [
        'Nobody is stronger — they push exactly as hard.',
        null,
        'Nothing is left over to speed it up.',
        'Both pushes are level, so nothing lifts it.'
      ],
      why: 'Two equal forces pointing opposite ways cancel out. Next lesson has a name for that.'
    }
  }
];

const L1_ACTIVITY = {
  title: 'The push and pull hunt',
  prep: 'Nothing to prepare. Do it in the greenhouse or the kitchen.',
  needs: ['her notebook', 'a pencil', 'ten minutes'],
  steps: [
    'Walk around and find ten things you can move.',
    'Move each one and write down: PUSH or PULL.',
    'Find one thing that needs both — a drawer is a good hunt.',
    'Find one thing you cannot move at all, however hard you push.',
    'Write down which way each force pointed. Not just how hard.'
  ],
  safety: 'Nothing heavy, nothing above her head, nothing with a blade on it.',
  minutes: 10
};

const L1_LEDGER = {
  prompt: 'Write down the one thing you could not move, and what you would need to move it.',
  ifSheIsStuck:
    'Ask her to push the bench. Then ask her what would have to change for it to slide — more people, or wheels, or a slippier floor. Any of those is a right answer.'
};

// =========================================================== LESSON 2
const L2_CHECK_IN = {
  title: 'The tray that will not move',
  text: 'Put both hands on a seed tray, one on each end, and press toward the middle as hard as you can.',
  question: 'You are pushing hard with both hands. Why is nothing happening?'
};

const L2_BEATS = [
  {
    n: 1,
    label: 'Balanced means it stays put',
    hook: 'A pot sitting on a shelf has two forces on it right now, and it is not moving at all.',
    teachingText:
      'When the forces on something are equal and point opposite ways, we say they are balanced. Balanced forces do not change how something is moving. A still thing stays still.',
    example:
      'Gravity pulls the pot down. The shelf pushes it up, exactly as hard. Balanced. The pot has been sitting there all year.',
    applyIt: {
      prompt: 'A hanging basket dangles from a hook and does not move. What is pushing or pulling it?',
      choices: ['Nothing at all', 'Only gravity, pulling down', 'Gravity down and the rope up, equally', 'The wind'],
      answer: 2,
      feedback: [
        'If nothing pulled it, the rope would go slack.',
        'If only gravity pulled, it would fall.',
        null,
        'On a still day there is no wind, and it still hangs.'
      ],
      why: 'Two forces, equal, opposite. Balanced. That is why it hangs instead of falling.'
    }
  },
  {
    n: 2,
    label: 'Still is not the same as nothing',
    hook: 'The word "balanced" does not mean no forces. It means the forces have cancelled.',
    teachingText:
      'This is the part almost everybody gets wrong at first. Something sitting perfectly still can have big forces on it. They just add up to zero.',
    example:
      'Two people pulling a rope, dead even, and the knot in the middle does not budge. Both are pulling as hard as they can. The knot is balanced.',
    applyIt: {
      prompt: 'The rope knot is not moving. Are the two pullers working hard?',
      choices: ['No — nothing is moving', 'Yes — their forces cancel out', 'Only one of them is', 'You cannot tell'],
      answer: 1,
      feedback: [
        'Ask them afterwards how their arms feel.',
        null,
        'If only one pulled, the knot would move.',
        'You can. The rope is tight, so both are pulling.'
      ],
      why: 'Balanced does not mean lazy. It means equal and opposite.'
    }
  }
];

const L2_ACTIVITY = {
  title: 'Make three things balance',
  prep: 'Nothing.',
  needs: ['a ruler', 'a pencil', 'two identical small pots', 'a book'],
  steps: [
    'Lay the ruler across the pencil so it tips. Now make it sit level.',
    'Put one pot on each end. Level again?',
    'Move one pot in a little. Watch what happens.',
    'Hold a book flat on your palm. Your hand is pushing up. What is pulling down?',
    'Press two palms together, hard, and hold. Nothing moves. Say why out loud.'
  ],
  safety: 'Nothing above shoulder height. Empty pots, not full ones.',
  minutes: 10
};

const L2_LEDGER = {
  prompt: 'Draw the hanging basket. Draw one arrow for the rope and one for gravity. Make them the same length, and say why they are.',
  ifSheIsStuck:
    'Same length is the whole idea. If she draws one longer, ask her what the basket would be doing if that were true.'
};

// =========================================================== LESSON 3
const L3_CHECK_IN = {
  title: 'Guess before you pull',
  text: 'Tie a string to a full watering can. Then tie the same string to an empty one.',
  question: 'Which will need a harder pull to start moving, and how much harder?'
};

const L3_BEATS = [
  {
    n: 1,
    label: 'A scientist writes the guess down first',
    hook: 'A guess you wrote down is evidence. A guess you kept in your head is a memory of being right.',
    teachingText:
      'Before you test anything, you write down what you think will happen. That written guess is called a prediction. You are allowed to be wrong. That is the point.',
    example:
      'Write: "I think the full can needs about three times the pull." Then find out. If it was two, you learned something real.',
    applyIt: {
      prompt: 'Why write the guess down before the test instead of after?',
      choices: [
        'It is neater',
        'So you cannot change it once you know',
        'The teacher asks for it',
        'It makes the test work better'
      ],
      answer: 1,
      feedback: [
        'Neat is nice. That is not the reason.',
        null,
        'Nobody is checking. This is for her.',
        'The test works the same either way.'
      ],
      why: 'A guess written after the answer is not a guess. Writing it first is what makes it honest.'
    }
  },
  {
    n: 2,
    label: 'One thing at a time',
    hook: 'If you change two things at once and the answer changes, you will never know which one did it.',
    teachingText:
      'A fair test changes ONE thing and keeps everything else the same. Here the one thing is how heavy the can is. Same string, same floor, same puller.',
    example:
      'Swap to a longer string AND fill the can, and you cannot say whether it was the water or the string.',
    applyIt: {
      prompt: 'She tests the full can on concrete and the empty can on grass. What went wrong?',
      choices: [
        'Nothing — both were pulled',
        'Two things changed, not one',
        'The cans were different colours',
        'She should have used rope'
      ],
      answer: 1,
      feedback: [
        'Both were pulled, and the test still cannot answer anything.',
        null,
        'Colour does not pull.',
        'String is fine. The floor is the problem.'
      ],
      why: 'The weight changed and the ground changed. Two things. The result cannot tell you which mattered.'
    }
  }
];

const L3_ACTIVITY = {
  title: 'The tug of war, measured',
  prep: 'Use thin string that will snap before anything breaks — not rope.',
  needs: ['thin string', 'a watering can', 'water', 'her notebook', 'a marker'],
  steps: [
    'Write your prediction first. How much harder will the full can be?',
    'Tie the string to the empty can. Pull it slowly along the floor.',
    'Mark on the string roughly where your hand was when it started to move.',
    'Now fill the can. Same string, same floor, same you.',
    'Pull again. Mark again.',
    'Compare the two marks. Was your prediction close?',
    'Write down what actually happened, even if it was not what you said.'
  ],
  safety:
    'Thin string on purpose — it snaps instead of pulling something over. Pull along the floor, never toward her face.',
  minutes: 12
};

const L3_LEDGER = {
  prompt: 'Write your prediction and what really happened, side by side. If they are different, say so — that is the interesting one.',
  ifSheIsStuck:
    'If she is embarrassed about a wrong prediction, say the wrong ones are the ones scientists write papers about. Then leave it alone.'
};

// =========================================================== LESSON 4
const L4_CHECK_IN = {
  title: 'Give it one shove',
  text: 'Push an empty pot across the potting bench once, then let go. Now do the same on the concrete path outside.',
  question: 'Same push. Why did one travel further?'
};

const L4_BEATS = [
  {
    n: 1,
    label: 'Something is pushing back',
    hook: 'A pot let go on a bench always stops. Something stopped it, and it was not you.',
    teachingText:
      'When two surfaces rub, there is a force between them called friction. Friction always pushes against the way a thing is moving. It is why nothing slides for ever.',
    example:
      'Smooth bench, less friction, the pot slides further. Rough concrete, more friction, it stops fast.',
    applyIt: {
      prompt: 'She pushes a pot and it slides right, then slows and stops. Which way is friction pushing?',
      choices: ['Right, with the pot', 'Left, against the pot', 'Down', 'Up'],
      answer: 1,
      feedback: [
        'Then it would speed up, not stop.',
        null,
        'Down is gravity, and that is a different lesson.',
        'Up is the bench holding it. Also not this.'
      ],
      why: 'Friction always points the opposite way to the movement. That is what slowing down is.'
    }
  },
  {
    n: 2,
    label: 'Friction is not the enemy',
    hook: 'Without friction she could not walk across the greenhouse, hold a trowel, or stand still on a slope.',
    teachingText:
      'Sometimes we want less friction, so we oil a hinge or fit a wheel. Sometimes we want more, so we put a rubber grip on a tool or grit on an icy path.',
    example:
      'A wheelbarrow has a wheel because rolling has far less friction than dragging. The handle has a rubber grip because there she wants MORE.',
    applyIt: {
      prompt: 'The greenhouse door is stiff and scrapes. She wants it easier. What helps?',
      choices: [
        'Oil the hinge — less friction',
        'Put grit on the hinge — more friction',
        'Push it harder every time',
        'Nothing can be done'
      ],
      answer: 0,
      feedback: [
        null,
        'Grit makes rubbing worse, not better.',
        'That works and it is still stiff tomorrow.',
        'Something can nearly always be done.'
      ],
      why: 'Oil puts a slippery layer between the surfaces so there is less to rub.'
    }
  }
];

const L4_ACTIVITY = {
  title: 'Four floors, one pot',
  prep: 'Collect four different surfaces she can push the same pot across.',
  needs: ['one empty pot', 'a towel', 'a tray', 'a wooden board', 'the concrete path', 'a ruler'],
  steps: [
    'Predict first: put the four surfaces in order, most slidey to least.',
    'Push the pot with the same shove on each surface. Same push every time.',
    'Measure how far it went. Write the number down.',
    'Put them in the real order and compare with your prediction.',
    'Now find one place in the garden where MORE friction is a good thing.'
  ],
  safety: 'Push along the ground. No throwing, no launching off the end of the bench.',
  minutes: 12
};

const L4_LEDGER = {
  prompt: 'Name one place friction helps you and one place it gets in your way. Same day, same garden.',
  ifSheIsStuck: 'Her shoes are the easy one. The stiff door is the other.'
};

// =========================================================== LESSON 5
const L5_CHECK_IN = {
  title: 'Two ways to change a rolling thing',
  text: 'Roll a seed pot slowly along the bench. Now change what it is doing — but do not stop it.',
  question: 'How many different ways did you find?'
};

const L5_BEATS = [
  {
    n: 1,
    label: 'Faster, slower, or a different way',
    hook: 'A force can change how fast something goes, or which way it is going. Both count.',
    teachingText:
      'An unbalanced force always changes motion. It can speed something up, slow it down, or turn it. Turning counts as a change even if the speed never alters.',
    example:
      'Push a rolling pot from behind and it speeds up. Push it from the side and it goes the same speed but somewhere new.',
    applyIt: {
      prompt: 'She taps a rolling pot from the side. It keeps the same speed but goes a new way. Was that a force?',
      choices: ['No — the speed did not change', 'Yes — the direction changed', 'Only if it sped up', 'Only if it stopped'],
      answer: 1,
      feedback: [
        'Direction is half of motion.',
        null,
        'Speeding up is one way, not the only way.',
        'Stopping is another. Still not the only one.'
      ],
      why: 'Motion is speed AND direction. Change either one and a force did it.'
    }
  },
  {
    n: 2,
    label: 'How hard, and which way',
    hook: 'Two things about every force: how strong it is, and where it points. You need both to say what happens.',
    teachingText:
      'A gentle push and a hard push do different things. A push from behind and a push from the side do different things. Saying "I pushed it" tells you almost nothing.',
    example:
      'Same wheelbarrow, gentle push from behind: creeps forward. Hard push from behind: rolls off fast. Hard push from the side: tips.',
    applyIt: {
      prompt: 'Wind blows across the garden and the sunflower bends. Which part of the force made it bend that way?',
      choices: ['How strong it was', 'Which way it pointed', 'How long it lasted', 'The temperature'],
      answer: 1,
      feedback: [
        'Strength decides HOW FAR it bends, not which way.',
        null,
        'Time matters, but not for the direction.',
        'Warm wind and cold wind bend it the same way.'
      ],
      why: 'Strength sets how much. Direction sets which way. They are two different questions.'
    }
  }
];

const L5_ACTIVITY = {
  title: 'Steer it without stopping it',
  prep: 'A long clear run on the bench or floor.',
  needs: ['a small round pot or a ball', 'a ruler', 'a strip of card', 'chalk or tape'],
  steps: [
    'Mark a start line and a target with tape.',
    'Roll the pot and try to hit the target. Most people miss.',
    'Roll again, and use the card to nudge it sideways on the way — do not stop it.',
    'Now speed it up mid-roll with a tap from behind.',
    'Now slow it down without stopping it.',
    'Write down which of the three was hardest and why you think so.'
  ],
  safety: 'Rolling, not throwing. Keep it on the bench or the floor.',
  minutes: 12
};

const L5_LEDGER = {
  prompt: 'Write the three ways a force can change how something moves. Give a garden example of each.',
  ifSheIsStuck: 'Faster, slower, turn. She has just done all three with her own hands.'
};

// =========================================================== LESSON 6
const L6_CHECK_IN = {
  title: 'Drop a leaf and a pebble',
  text: 'Hold a flat dry leaf in one hand and a small pebble in the other, at the same height. Drop them together.',
  question: 'They both had gravity pulling them. Why did one dawdle?'
};

const L6_BEATS = [
  {
    n: 1,
    label: 'Air is a thing',
    hook: 'Air feels like nothing until you stick your hand out of a car window.',
    teachingText:
      'Air pushes back against anything moving through it. That push is called air resistance. It is a force, and it always points against the movement, just like friction.',
    example:
      'The leaf and the pebble are both pulled down by gravity. Air pushes up on the wide flat leaf far more, so the leaf loses.',
    applyIt: {
      prompt: 'She crumples the same leaf into a tight ball and drops it again. What happens?',
      choices: ['Falls slower', 'Falls faster', 'Exactly the same', 'Floats upward'],
      answer: 1,
      feedback: [
        'Less leaf is facing the air now, not more.',
        null,
        'It changed shape, so it changed how much air it catches.',
        'Nothing here can beat gravity.'
      ],
      why: 'Same leaf, same weight, smaller shape. Less air resistance, so it falls faster.'
    }
  },
  {
    n: 2,
    label: 'Big and flat catches more',
    hook: 'A parachute does not make you lighter. It makes you catch more air.',
    teachingText:
      'How much air resistance something gets depends on how big and flat it is facing the way it moves. Wide and flat catches a lot. Small and pointed catches little.',
    example:
      'A seed with a little parachute on it — a dandelion — drifts across the whole garden. The same seed with the fluff pulled off drops straight down.',
    applyIt: {
      prompt: 'Why does a dandelion seed travel and a sunflower seed does not?',
      choices: [
        'The dandelion seed is lighter only',
        'Its fluff catches air, so it falls slowly and the wind carries it',
        'Sunflower seeds are dead',
        'The wind only blows on dandelions'
      ],
      answer: 1,
      feedback: [
        'Lighter helps. The fluff is the bigger reason.',
        null,
        'They are very much alive.',
        'The wind blows on everything.'
      ],
      why: 'More air resistance means a slower fall, and a slow fall gives the wind time to move it.'
    }
  }
];

const L6_ACTIVITY = {
  title: 'Build the slowest parachute',
  prep: 'Cut squares of thin plastic bag ahead of time if scissors are a bother.',
  needs: ['thin plastic bag', 'string', 'tape', 'a small washer or a spare key', 'scissors', 'a chair to stand a grown-up on'],
  steps: [
    'Predict: will a big canopy or a small one fall slower? Write it down.',
    'Cut a square about the size of a sheet of paper.',
    'Tape four strings to the corners and tie them to the washer.',
    'A GROWN-UP drops it from as high as they can safely reach. She watches and counts.',
    'Make a second one half the size. Same washer, same string.',
    'Drop them both and count again.',
    'Now drop the washer on its own. Count that too.'
  ],
  safety:
    'A grown-up does all the dropping and does the standing on anything. She watches and counts. Plastic bags never go near a face.',
  minutes: 14
};

const L6_LEDGER = {
  prompt: 'Which parachute was slowest, and why? Then say what a dandelion seed and your parachute have in common.',
  ifSheIsStuck: 'Both of them catch air on purpose. That is the whole answer.'
};

// ---------------------------------------------------------------------------

export const SCIENCELAB_M1 = [
  {
    id: 'sl-m1-01',
    course: 'sciencelab',
    module: 1,
    quarter: 1,
    week: 1,
    day: 1,
    n: 1,
    title: 'Every push and every pull',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'A force is a push or a pull, and it always has a direction as well as a strength.',
    standards: ['S4P3a'],
    offGrade: null,
    words: ['force', 'push', 'pull', 'direction'],
    glossary: [
      { word: 'force', plain: 'A push or a pull. That is all it means.' },
      { word: 'push', plain: 'Moving something away from you.' },
      { word: 'pull', plain: 'Moving something toward you.' },
      { word: 'direction', plain: 'Which way something points or goes.' }
    ],
    video: {
      id: 'ZLDUrPaLQWE',
      url: 'https://www.youtube.com/watch?v=ZLDUrPaLQWE',
      title: 'Push and Pull for Kids | Forces in Science',
      channel: 'Homeschool Pop',
      minutes: 5,
      verified: '2026-08-16',
      teaches: ['force', 'push', 'pull', 'direction'],
      sourceGap:
        'No Black American educator found for elementary forces. Searched: "Black science teacher forces and motion elementary students", "African American educator physical science kids channel", "STEM with a Black teacher forces push pull elementary lesson". Open.'
    },
    checkIn: L1_CHECK_IN,
    beats: L1_BEATS,
    activity: L1_ACTIVITY,
    ledger: L1_LEDGER,
    hook: L1_CHECK_IN,
    core: L1_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L1_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What is a force?', answer: 'A push or a pull.', why: 'Those are the only two.' },
      {
        ask: 'Two things you have to say about a force to describe it properly.',
        answer: 'How strong it is, and which way it points.',
        why: '"I pushed it" does not tell anyone what happened.'
      }
    ],
    check: [
      {
        prompt: 'You drag a bag of compost toward you. Push or pull?',
        choices: ['A push', 'A pull', 'Neither', 'Both'],
        answer: 1,
        feedback: ['A push goes away from you.', null, 'It moved, so a force did it.', 'It only went one way.']
      },
      {
        prompt: 'Which of these is NOT a force?',
        choices: ['Pushing a door shut', 'Pulling a weed', 'The colour of a pot', 'Lifting a can'],
        answer: 2,
        feedback: ['That is a push.', 'That is a pull.', null, 'That is a pull, upward.']
      },
      {
        prompt: 'Two people push a wheelbarrow from opposite ends, exactly as hard. What happens?',
        choices: ['It goes forward', 'It goes backward', 'It stays put', 'It speeds up'],
        answer: 2,
        feedback: [
          'One would have to push harder.',
          'Same again, the other way.',
          null,
          'Nothing is left over to speed it up.'
        ]
      }
    ]
  },
  {
    id: 'sl-m1-02',
    course: 'sciencelab',
    module: 1,
    quarter: 1,
    week: 1,
    day: 2,
    n: 2,
    title: 'Balanced — when nothing moves',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Balanced forces are equal and opposite, and they leave motion exactly as it was.',
    standards: ['S4P3a'],
    offGrade: null,
    words: ['balanced', 'equal', 'opposite', 'cancel'],
    glossary: [
      { word: 'balanced', plain: 'Forces that are equal and point opposite ways.' },
      { word: 'equal', plain: 'The same size as each other.' },
      { word: 'opposite', plain: 'Pointing the other way.' },
      { word: 'cancel', plain: 'When two forces add up to nothing happening.' }
    ],
    video: {
      id: 'rnlHxAYwCbg',
      url: 'https://www.youtube.com/watch?v=rnlHxAYwCbg',
      title: 'Forces for Kids | Balanced and Unbalanced | Science Lesson for Grades 3-5 | Mini-Clip',
      channel: 'GenerationGenius',
      minutes: 4,
      verified: '2026-08-16',
      teaches: ['balanced', 'unbalanced', 'equal', 'opposite', 'cancel'],
      sourceGap: 'No Black American educator found for elementary forces. Same three searches as Lesson 1. Open.'
    },
    checkIn: L2_CHECK_IN,
    beats: L2_BEATS,
    activity: L2_ACTIVITY,
    ledger: L2_LEDGER,
    hook: L2_CHECK_IN,
    core: L2_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L2_ACTIVITY.steps.join(' '),
    practice: [
      {
        ask: 'What does balanced mean?',
        answer: 'The forces are equal and point opposite ways.',
        why: 'They cancel, so nothing about the motion changes.'
      },
      {
        ask: 'A pot sits still on a shelf. How many forces are on it?',
        answer: 'Two. Gravity pulling down and the shelf pushing up.',
        why: 'Still does not mean no forces. It means they cancel.'
      }
    ],
    check: [
      {
        prompt: 'A hanging basket hangs without moving. The forces on it are:',
        choices: ['None', 'Balanced', 'Unbalanced', 'All pointing down'],
        answer: 1,
        feedback: ['Then the rope would be slack.', null, 'Then it would be moving.', 'Then it would fall.']
      },
      {
        prompt: 'Two children pull a rope dead even and the knot does not move. Are they pulling hard?',
        choices: ['No', 'Yes, and the pulls cancel', 'Only one is', 'Impossible to say'],
        answer: 1,
        feedback: ['Ask their arms.', null, 'Then the knot would move.', 'The rope is tight, so both are.']
      },
      {
        prompt: 'Which one has balanced forces on it?',
        choices: ['A falling apple', 'A book resting on a table', 'A rolling ball slowing down', 'A door swinging shut'],
        answer: 1,
        feedback: ['It is speeding up.', null, 'It is slowing, so something is unbalanced.', 'It is moving.']
      }
    ]
  },
  {
    id: 'sl-m1-03',
    course: 'sciencelab',
    module: 1,
    quarter: 1,
    week: 1,
    day: 3,
    n: 3,
    title: 'Tug of war with string and weights',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'A fair test changes one thing, and the prediction is written down before the answer is known.',
    standards: ['S4P3a'],
    offGrade: null,
    words: ['prediction', 'fair test', 'evidence', 'result'],
    glossary: [
      { word: 'prediction', plain: 'What you think will happen, written down before you find out.' },
      { word: 'fair test', plain: 'A test where you change one thing and keep everything else the same.' },
      { word: 'evidence', plain: 'What actually happened, written down.' },
      { word: 'result', plain: 'The answer the test gave you, even if you did not want it.' }
    ],
    video: {
      id: 'MCr-C-QaDGA',
      url: 'https://www.youtube.com/watch?v=MCr-C-QaDGA',
      title: 'Physics Tug of War',
      channel: 'Teach Engineering',
      minutes: 4,
      verified: '2026-08-16',
      teaches: ['balanced', 'unbalanced', 'fair test', 'measuring a force'],
      // DECLARED: this video covers less than half the lesson's words, and that
      // is correct rather than a mismatch. The lesson's vocabulary is METHOD
      // vocabulary — prediction, evidence, result — and no video teaches those;
      // a grown-up and a notebook do. The video's job is to show the tug of war
      // the method is practised on, and it does exactly that.
      //
      // Written here rather than fixed by padding the teaches list above with
      // words this video does not actually cover. check-sciencelab requires the
      // reason, not just the exemption.
      coverageNote:
        'The lesson teaches how to run a fair test; the video demonstrates the tug of war it is run on. Method words are taught by the grown-up, not the screen.',
      sourceGap: 'No Black American educator found for elementary forces investigations. Same searches. Open.'
    },
    checkIn: L3_CHECK_IN,
    beats: L3_BEATS,
    activity: L3_ACTIVITY,
    ledger: L3_LEDGER,
    hook: L3_CHECK_IN,
    core: L3_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L3_ACTIVITY.steps.join(' '),
    practice: [
      {
        ask: 'Why write your prediction down before you test?',
        answer: 'So you cannot quietly change it once you know the answer.',
        why: 'A guess written afterwards is not a guess.'
      },
      {
        ask: 'What makes a test fair?',
        answer: 'Only one thing changes. Everything else stays the same.',
        why: 'Change two and you cannot say which one mattered.'
      }
    ],
    check: [
      {
        prompt: 'She tests the full can on concrete and the empty can on grass. What is wrong?',
        choices: ['Nothing', 'Two things changed, not one', 'The cans were different sizes', 'She needed rope'],
        answer: 1,
        feedback: ['The test cannot answer anything.', null, 'They were the same can.', 'String was fine.']
      },
      {
        prompt: 'Her prediction was wrong. What should she write down?',
        choices: [
          'The prediction only',
          'The result only',
          'Both, side by side',
          'Nothing — start again'
        ],
        answer: 2,
        feedback: [
          'That hides what happened.',
          'That hides what she thought.',
          null,
          'A wrong prediction is the interesting kind.'
        ]
      },
      {
        prompt: 'A heavier can needs a harder pull to start moving. That pull is:',
        choices: ['Balanced', 'Unbalanced', 'Not a force', 'Friction only'],
        answer: 1,
        feedback: ['Then it would not start.', null, 'It is a pull, so it is a force.', 'Friction is part of it, not all.']
      }
    ]
  },
  {
    id: 'sl-m1-04',
    course: 'sciencelab',
    module: 1,
    quarter: 1,
    week: 2,
    day: 1,
    n: 4,
    title: 'Friction — the force that slows the wheelbarrow',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Friction is the force between rubbing surfaces, and it always pushes against the movement.',
    standards: ['S4P3a'],
    offGrade: null,
    words: ['friction', 'surface', 'rough', 'smooth'],
    glossary: [
      { word: 'friction', plain: 'The force between two things rubbing together.' },
      { word: 'surface', plain: 'The outside face of something — the part that touches.' },
      { word: 'rough', plain: 'Bumpy. More friction.' },
      { word: 'smooth', plain: 'Slippery. Less friction.' }
    ],
    video: {
      id: '1ZxkwKPHluU',
      url: 'https://www.youtube.com/watch?v=1ZxkwKPHluU',
      title: 'Forces: Friction for Kids!',
      channel: 'Learn and Play Online!',
      minutes: 4,
      verified: '2026-08-16',
      teaches: ['friction', 'surface', 'rough', 'smooth', 'slowing down'],
      sourceGap: 'No Black American educator found teaching friction at elementary level. Searched. Open.'
    },
    checkIn: L4_CHECK_IN,
    beats: L4_BEATS,
    activity: L4_ACTIVITY,
    ledger: L4_LEDGER,
    hook: L4_CHECK_IN,
    core: L4_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L4_ACTIVITY.steps.join(' '),
    practice: [
      {
        ask: 'Which way does friction push?',
        answer: 'Against the way the thing is moving.',
        why: 'That is what slowing down is.'
      },
      {
        ask: 'Name one time you want MORE friction.',
        answer: 'Shoes on a wet path. A rubber grip on a tool.',
        why: 'Friction is not always the enemy.'
      }
    ],
    check: [
      {
        prompt: 'A pot slides right, slows, and stops. Friction pushed:',
        choices: ['Right', 'Left', 'Down', 'Up'],
        answer: 1,
        feedback: ['Then it would speed up.', null, 'That is gravity.', 'That is the bench.']
      },
      {
        prompt: 'Same pot, same push. Which surface lets it go furthest?',
        choices: ['A towel', 'Concrete', 'A smooth tray', 'Gravel'],
        answer: 2,
        feedback: ['Very rough.', 'Rough.', null, 'Roughest of the four.']
      },
      {
        prompt: 'The greenhouse door scrapes and sticks. What helps most?',
        choices: ['Oil the hinge', 'Add grit', 'Push harder', 'Paint it'],
        answer: 0,
        feedback: [null, 'That makes rubbing worse.', 'Still stiff tomorrow.', 'Paint does not slide.']
      }
    ]
  },
  {
    id: 'sl-m1-05',
    course: 'sciencelab',
    module: 1,
    quarter: 1,
    week: 2,
    day: 2,
    n: 5,
    title: 'Which way it goes, and how fast',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'An unbalanced force changes motion — speeding up, slowing down, or turning all count.',
    standards: ['S4P3a'],
    offGrade: null,
    words: ['unbalanced', 'motion', 'speed', 'strength'],
    glossary: [
      { word: 'unbalanced', plain: 'When the forces do not cancel, so something changes.' },
      { word: 'motion', plain: 'How something is moving — both how fast and which way.' },
      { word: 'speed', plain: 'How fast.' },
      { word: 'strength', plain: 'How hard a force pushes or pulls.' }
    ],
    video: {
      id: 'hWg6QPutUas',
      url: 'https://www.youtube.com/watch?v=hWg6QPutUas',
      title: 'Forces and Motion – Magnitude and Direction',
      channel: 'Next Generation Science',
      minutes: 5,
      verified: '2026-08-16',
      teaches: ['unbalanced', 'motion', 'speed', 'direction', 'strength'],
      sourceGap: 'No Black American educator found for elementary forces and motion. Searched. Open.'
    },
    checkIn: L5_CHECK_IN,
    beats: L5_BEATS,
    activity: L5_ACTIVITY,
    ledger: L5_LEDGER,
    hook: L5_CHECK_IN,
    core: L5_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L5_ACTIVITY.steps.join(' '),
    practice: [
      {
        ask: 'Three ways a force can change how something moves.',
        answer: 'Speed it up, slow it down, or turn it.',
        why: 'Turning counts even when the speed never changes.'
      },
      {
        ask: 'Two things you must know about a force to say what it will do.',
        answer: 'How strong it is and which way it points.',
        why: 'Strength says how much. Direction says which way.'
      }
    ],
    check: [
      {
        prompt: 'A rolling pot is tapped from the side. Same speed, new direction. Was that a force?',
        choices: ['No', 'Yes', 'Only if it sped up', 'Only if it stopped'],
        answer: 1,
        feedback: ['Direction is half of motion.', null, 'Not the only way.', 'Not the only way.']
      },
      {
        prompt: 'Wind bends the sunflower east. What decided EAST?',
        choices: ['How strong the wind was', 'Which way it pointed', 'How warm it was', 'How tall the plant is'],
        answer: 1,
        feedback: ['Strength says how far.', null, 'Warm and cold bend it the same way.', 'Height does not choose a direction.']
      },
      {
        prompt: 'Forces on a ball are unbalanced. What must be true?',
        choices: ['It is standing still', 'Its motion is changing', 'It has no friction', 'It is very heavy'],
        answer: 1,
        feedback: ['Then they would be balanced.', null, 'Friction can be there too.', 'Weight is a different question.']
      }
    ]
  },
  {
    id: 'sl-m1-06',
    course: 'sciencelab',
    module: 1,
    quarter: 1,
    week: 2,
    day: 3,
    n: 6,
    title: 'Air pushes back — the parachute and the falling leaf',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Air resistance pushes against anything moving through air, and a wide flat shape catches more of it.',
    standards: ['S4P3a'],
    offGrade: null,
    words: ['air resistance', 'shape', 'parachute', 'drift'],
    glossary: [
      { word: 'air resistance', plain: 'The push air gives back to anything moving through it.' },
      { word: 'shape', plain: 'How wide or flat something is facing the way it moves.' },
      { word: 'parachute', plain: 'A wide canopy made to catch as much air as it can.' },
      { word: 'drift', plain: 'To float slowly sideways instead of dropping straight down.' }
    ],
    video: {
      id: 'Ab_g5sLoXoY',
      url: 'https://www.youtube.com/watch?v=Ab_g5sLoXoY',
      title: 'Playtime with Parachutes | Physics for Kids',
      channel: 'SciShow Kids',
      minutes: 5,
      verified: '2026-08-16',
      teaches: ['air resistance', 'parachute', 'shape', 'falling slowly'],
      sourceGap: 'No Black American educator found for elementary air resistance. Searched. Open.'
    },
    checkIn: L6_CHECK_IN,
    beats: L6_BEATS,
    activity: L6_ACTIVITY,
    ledger: L6_LEDGER,
    hook: L6_CHECK_IN,
    core: L6_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L6_ACTIVITY.steps.join(' '),
    practice: [
      {
        ask: 'Why does a flat leaf fall slower than a pebble?',
        answer: 'It catches far more air on the way down.',
        why: 'Air pushes up against it. That is air resistance.'
      },
      {
        ask: 'What does a dandelion seed have in common with a parachute?',
        answer: 'Both are made wide to catch air so they fall slowly.',
        why: 'A slow fall gives the wind time to carry it somewhere new.'
      }
    ],
    check: [
      {
        prompt: 'The same leaf is crumpled into a ball and dropped again. It falls:',
        choices: ['Slower', 'Faster', 'Exactly the same', 'Upward'],
        answer: 1,
        feedback: ['Less of it faces the air now.', null, 'The shape changed, so the air push changed.', 'Nothing beats gravity here.']
      },
      {
        prompt: 'Which parachute falls slowest, same weight hanging under each?',
        choices: ['A small one', 'A big one', 'They are identical', 'The heavier string one'],
        answer: 1,
        feedback: ['Small catches less air.', null, 'Size changes how much air it catches.', 'String weight barely matters.']
      },
      {
        prompt: 'Air resistance pushes:',
        choices: [
          'The same way the object moves',
          'Against the way the object moves',
          'Always downward',
          'Only on heavy things'
        ],
        answer: 1,
        feedback: ['Then it would speed things up.', null, 'It pushes back, whichever way you go.', 'It pushes on everything.']
      }
    ]
  }
];

export const SCIENCELAB_M1_META = {
  courseId: 'sciencelab',
  module: 1,
  title: 'Push, Pull, and What Wins',
  blurb:
    'Every way of moving anything is a push or a pull. What happens when two of them are equal, what happens when they are not, and why nothing slides for ever.'
};

export function m1LessonById(id) {
  return SCIENCELAB_M1.find((l) => l.id === id) || null;
}

export default SCIENCELAB_M1;
