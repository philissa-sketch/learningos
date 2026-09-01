// ---------------------------------------------------------------------------
// THE SCIENCE LAB — MODULE 4, QUARTER 1, WEEKS 7-8
// LIGHT, AND WHAT IT MEETS
//
// Georgia S4P1a, S4P1b, S4P1c — three elements in one module, and this is the
// only module in Quarter 1 that carries more than one. That is not a bundle for
// convenience: Georgia genuinely splits light into three questions, and each
// gets two lessons.
//
//   S4P1a  what happens when light MEETS a thing   opaque, transparent,
//          translucent — and the shadow an opaque thing throws
//   S4P1b  how light TRAVELS                       in straight lines, and what
//          a mirror does to that line
//   S4P1c  how light BENDS                         the pencil in the glass, and
//          a water drop working as a lens
//
// ---- THE GREENHOUSE IS THE BEST CLASSROOM SHE HAS FOR THIS ----
//
// A greenhouse is a building made of the thing this module is about. The glass
// is transparent, the staging is opaque, the milky plastic on the roof panels is
// translucent, and all three are within arm's reach at once. Every sorting
// activity here is done with things she can pick up in it.
//
// Lesson 20 is the one that pays off twice: a shadow is not a thing, it is an
// ABSENCE — the place light could not get to because something opaque stood in
// the way. A child who has that sentence has S4P1a for good, and she will use it
// again in Quarter 3 when the moon puts the Earth's shadow on itself.
//
// ---- WHAT THIS MODULE DOES NOT DO ----
//
// It does not teach colour, and it does not teach that white light is made of
// colours. Both are wonderful and neither is in Georgia's fourth-grade
// standards, and a module that wanders is a module that runs out of fortnight.
// The prism stays in the drawer.
//
// SAFETY, and it is the one rule of this module: NEVER look at the sun, and
// never point a mirror or a lens at it or at anybody's eyes. It is written into
// every activity here rather than said once at the top.
//
// Shape, reading level: as Modules 1 to 3. Thirty minutes, two beats, an
// Apply-It inside each, a three-question check, ten in the bank.
// ---------------------------------------------------------------------------

// ============================================ LESSON 19 · WHAT LIGHT MEETS
const L19_CHECK_IN = {
  title: 'Three things, one flashlight',
  text: 'Shine a flashlight through a pane of glass, then through a sheet of greenhouse plastic, then at a plant pot.',
  question: 'Three things, three different results. What are the three?'
};

const L19_BEATS = [
  {
    n: 1,
    label: 'All the way, some of the way, or none',
    hook: 'Every single thing in her greenhouse does one of three things to light, and there is no fourth.',
    teachingText:
      'Transparent means light goes straight through and she can see clearly. Translucent means some light gets through but the picture is fuzzy. Opaque means no light gets through at all.',
    example:
      'Window glass is transparent. The milky plastic roof panel is translucent. The clay pot is opaque.',
    applyIt: {
      prompt: 'Light gets through, but she cannot see clearly. That is:',
      choices: ['Transparent', 'Opaque', 'Translucent', 'A shadow'],
      answer: 2,
      feedback: [
        'Transparent means she sees clearly.',
        'Opaque means no light gets through.',
        null,
        'A shadow is what opaque things make.'
      ],
      why: 'Some light through, and a fuzzy picture, is exactly what translucent means.'
    }
  },
  {
    n: 2,
    label: 'The middle one is the one people forget',
    hook: 'Most people can name clear and solid. The interesting one is the one in between.',
    teachingText:
      'Translucent things are everywhere once she starts looking: waxed paper, frosted glass, a thin leaf held to the window, milky plastic. Light gets in, and the picture does not.',
    example:
      'The greenhouse roof is translucent on purpose. It lets the light in for the plants and spreads it out so nothing gets scorched.',
    applyIt: {
      prompt: 'Which of these is translucent?',
      choices: ['A thin leaf held up to the light', 'A brick', 'A clean window', 'A tin can'],
      answer: 0,
      feedback: [
        null,
        'No light at all gets through a brick.',
        'She can see straight through that.',
        'A can lets nothing through.'
      ],
      why: 'Light glows through the leaf and she still cannot read through it.'
    }
  }
];

const L19_ACTIVITY = {
  title: 'Sort the whole greenhouse into three piles',
  prep: 'A flashlight and about ten things from the greenhouse and the kitchen.',
  needs: ['a flashlight', 'a pane or jar of clear glass', 'waxed paper', 'a clay pot', 'a thin leaf', 'a plastic bag', 'her notebook'],
  steps: [
    'Rule three columns in the notebook: TRANSPARENT, TRANSLUCENT, OPAQUE.',
    'Hold each thing up and shine the flashlight through it from behind.',
    'Ask two questions each time: does light get through, and can you see the shape behind it?',
    'Both yes is transparent. Light but no shape is translucent. Neither is opaque.',
    'Find one thing that was hard to decide, and write down why it was hard.',
    'Now go and find the translucent things in the house. There are more than she thinks.'
  ],
  safety: 'The flashlight points at objects, never at eyes. Never at the sun, and never at anybody.',
  minutes: 12
};

const L19_LEDGER = {
  prompt: 'Your three columns, with at least three things in each. Then the one that was hard to sort.',
  ifSheIsStuck: 'Two questions in order: did light get through at all, and could she see the SHAPE behind it.'
};

// ================================================= LESSON 20 · SHADOWS
const L20_CHECK_IN = {
  title: 'Stand in the sun and look down',
  text: 'Go outside in the morning and draw round your own shadow in chalk. Do it again after lunch.',
  question: 'You did not move. So why did it?'
};

const L20_BEATS = [
  {
    n: 1,
    label: 'A shadow is a place light could not reach',
    hook: 'A shadow is not a thing. It is a hole in the light, shaped like whatever was in the way.',
    teachingText:
      'A shadow happens when an opaque thing blocks light. The dark patch is not dark stuff — it is the place the light could not get to. That is why only opaque things make sharp shadows.',
    example:
      'The clay pot throws a solid black shape on the bench. A jam jar next to it barely throws one at all.',
    applyIt: {
      prompt: 'A shadow is:',
      choices: ['A place light could not reach', 'Dark stuff sticking to the ground', 'A kind of light', 'Something the object gives off'],
      answer: 0,
      feedback: [
        null,
        'She cannot pick it up or sweep it away.',
        'It is the absence of light.',
        'Nothing comes out of the pot.'
      ],
      why: 'Something opaque stood in the way, and the shadow is the gap it left.'
    }
  },
  {
    n: 2,
    label: 'Move the light and the shadow obeys',
    hook: 'Her shadow is long at breakfast, short at noon and long again at supper, and she never grows.',
    teachingText:
      'Where the shadow falls and how long it is depend on where the light is. A low light makes a long shadow. A light straight overhead makes a short one. Move the light closer and the shadow gets bigger.',
    example:
      'A flashlight held low beside the pot throws its shadow right across the bench. Held above it, the shadow shrinks to a ring at its foot.',
    applyIt: {
      prompt: 'The sun is low in the sky. Her shadow is:',
      choices: ['Short', 'Long', 'Gone', 'The same as at noon'],
      answer: 1,
      feedback: [
        'Short shadows come from a high sun.',
        null,
        'It is longest of all then.',
        'Noon is when it is shortest.'
      ],
      why: 'A low light stretches the shadow out along the ground.'
    }
  }
];

const L20_ACTIVITY = {
  title: 'Chalk the same shadow three times',
  prep: 'A sunny day and a piece of chalk. Choose one spot and mark it so she stands in exactly the same place.',
  needs: ['chalk', 'a sunny yard or path', 'a plant pot', 'a flashlight', 'a tape measure'],
  steps: [
    'Mark a cross on the ground and stand on it. Have someone draw round your shadow.',
    'Write the time next to it.',
    'Come back at midday and do it again from the same cross. Then once more in the late afternoon.',
    'Measure all three. Which was longest?',
    'Indoors: put a pot on the bench and move a flashlight from low, to high, to low again.',
    'Write one sentence saying what decides how long a shadow is.'
  ],
  safety: 'NEVER look straight at the sun, not even for a second, and not through anything. Look at the ground.',
  minutes: 14
};

const L20_LEDGER = {
  prompt: 'Your three chalk shadows with their times and lengths. Then say what was moving all day.',
  ifSheIsStuck:
    'She stayed on the cross. The pot stayed on the bench. The only thing that moved was where the light was coming from.'
};

// ================================== LESSON 21 · LIGHT TRAVELS IN STRAIGHT LINES
const L21_CHECK_IN = {
  title: 'Three cards and a pinhole',
  text: 'Make a small hole in the middle of three index cards and stand them in a row so the holes line up.',
  question: 'Look through. Now slide the middle card sideways an inch. Where did the light go?'
};

const L21_BEATS = [
  {
    n: 1,
    label: 'Light does not go round corners',
    hook: 'She has never once seen a beam of light bend round a plant pot to get to her.',
    teachingText:
      'Light travels in straight lines. A narrow beam is called a ray. It keeps going in a straight path until something stops it or turns it.',
    example:
      'Sun through a gap in the greenhouse blind lands as a straight bright stripe on the floor, not a curved one.',
    applyIt: {
      prompt: 'She slides the middle card sideways. Now she sees:',
      choices: ['A brighter light', 'The same as before', 'Nothing through the holes', 'A curved beam'],
      answer: 2,
      feedback: [
        'Blocking light does not brighten it.',
        'The path is broken now.',
        null,
        'Light does not curve round a card.'
      ],
      why: 'The holes no longer make a straight path, and light will not bend to find one.'
    }
  },
  {
    n: 2,
    label: 'Dust is how you see the beam itself',
    hook: 'She has been looking at rays of light her whole life without seeing a single one.',
    teachingText:
      'Light is invisible while it is travelling. What she sees is light that has bounced off something into her eye. Put dust or steam in the way and each speck bounces a little light to her, so the whole beam shows up.',
    example:
      'Clap two dusty cushions in a sunbeam and the beam appears out of nowhere as a straight bar of light.',
    applyIt: {
      prompt: 'Why can she suddenly see the beam when dust is in the air?',
      choices: ['Dust glows', 'Each speck bounces light to her eye', 'Dust makes more light', 'The beam got wider'],
      answer: 1,
      feedback: [
        'Dust makes no light of its own.',
        null,
        'The lamp makes the same light as before.',
        'It is the same beam.'
      ],
      why: 'She is not seeing the beam. She is seeing dust lit up along it.'
    }
  }
];

const L21_ACTIVITY = {
  title: 'The three-card path, and a beam made visible',
  prep: 'Three index cards, a pin, and a dim room. A torch with a narrow beam works best.',
  needs: ['three index cards', 'a pin', 'modelling clay to stand the cards up', 'a torch', 'a little flour or a steamy kettle'],
  steps: [
    'A grown-up makes one small hole in the centre of each card.',
    'Stand all three upright in clay, in a line, holes lined up.',
    'Put the torch behind the last one and look through the first. Can you see it?',
    'Slide the middle card a little to one side. Look again.',
    'Line them up again to prove it comes back.',
    'Now darken the room, shine the torch across it, and puff a tiny bit of flour into the beam.',
    'Draw what the beam looked like. Straight or curved?'
  ],
  safety:
    'A grown-up makes the pinholes. Never look into the torch beam directly, and NEVER at the sun. Flour is puffed away from faces.',
  minutes: 14
};

const L21_LEDGER = {
  prompt: 'Draw the three cards lined up, and again with the middle one moved. Mark where the light stops.',
  ifSheIsStuck: 'Ask her to draw the light as a ruler line. If the line cannot be straight, it cannot happen.'
};

// ============================================ LESSON 22 · MIRRORS AND ANGLES
const L22_CHECK_IN = {
  title: 'See round the corner',
  text: 'Hold a mirror at the corner of the greenhouse door and try to see what is round the other side.',
  question: 'Light travels in straight lines, so how did you just see round a corner?'
};

const L22_BEATS = [
  {
    n: 1,
    label: 'Light bounces off a mirror',
    hook: 'A mirror does not bend light. It turns it, in one clean bounce.',
    teachingText:
      'When light hits a mirror it reflects — it bounces off and carries on in a new straight line. Each straight line is still straight. There are just two of them now, meeting at the mirror.',
    example:
      'A torch beam pointed at a mirror on the potting bench lands as a bright spot on the far wall, nowhere near where it was aimed.',
    applyIt: {
      prompt: 'A mirror makes light:',
      choices: ['Bounce off in a new straight line', 'Bend into a curve', 'Stop dead', 'Disappear'],
      answer: 0,
      feedback: [
        null,
        'Straight lines stay straight. It changes direction once.',
        'The bright spot on the wall says otherwise.',
        'It went somewhere. Follow it.'
      ],
      why: 'Reflect means bounce. Two straight lines meeting at the glass.'
    }
  },
  {
    n: 2,
    label: 'The angle in equals the angle out',
    hook: 'The mirror follows one rule, and it never breaks it.',
    teachingText:
      'Light bounces off a mirror at the same angle it arrived at. Hit it straight on and it comes straight back. Hit it at a slant and it leaves at the same slant, the other way.',
    example:
      'Aim the torch at the mirror from the left at a slant, and the bright spot appears on the right at exactly the matching slant.',
    applyIt: {
      prompt: 'She shines the torch straight at a mirror. The light comes:',
      choices: ['Off to one side', 'Straight back at her', 'Nowhere', 'Round the corner'],
      answer: 1,
      feedback: [
        'That happens when she aims at a slant.',
        null,
        'It always goes somewhere.',
        'It needs a slant to do that.'
      ],
      why: 'The angle out matches the angle in. Straight in means straight back.'
    }
  }
];

const L22_ACTIVITY = {
  title: 'The torch, the mirror and the marked wall',
  prep: 'A small flat mirror propped upright, a torch, and sticky notes to mark where the spot lands.',
  needs: ['a small flat mirror', 'a torch', 'sticky notes', 'a dim room', 'her notebook'],
  steps: [
    'Prop the mirror upright on the bench so it cannot fall.',
    'Shine the torch straight at it. Stick a note where the bright spot lands.',
    'Now shine it from well over to the left. Mark that spot too.',
    'Now from well over to the right. Mark it.',
    'Look at your three notes. Is there a pattern?',
    'Now try to bounce the light off the mirror onto a chosen target, first try.',
    'Write down whether you could predict it before you tried.'
  ],
  safety:
    'The mirror is propped so it cannot fall and break. Never aim a mirror or a torch at anybody’s eyes, and NEVER at the sun.',
  minutes: 14
};

const L22_LEDGER = {
  prompt: 'Draw the mirror with your three beams on it — in and out for each. Say what the pattern is.',
  ifSheIsStuck: 'Ask her to compare the slant going in with the slant coming out. They match, every time.'
};

// ============================================== LESSON 23 · THE BENDING PENCIL
const L23_CHECK_IN = {
  title: 'The broken pencil',
  text: 'Stand a pencil in a clear glass of water and look at it from the side.',
  question: 'It looks snapped in half at the surface. Take it out — is it broken?'
};

const L23_BEATS = [
  {
    n: 1,
    label: 'Light changes speed when it changes stuff',
    hook: 'The pencil is fine. The light is what got bent.',
    teachingText:
      'When light passes from air into water it slows down, and if it arrives at a slant it changes direction as it does. That bending is called refraction. Her eye still assumes the light came in a straight line, so it draws the pencil in the wrong place.',
    example:
      'Looking straight down at the pencil from above, it looks fine. From the side, at a slant, it looks snapped.',
    applyIt: {
      prompt: 'The pencil looks bent because the LIGHT:',
      choices: ['Stopped in the water', 'Changed direction going into the water', 'Made the pencil soft', 'Turned a new colour'],
      answer: 1,
      feedback: [
        'She can see the pencil, so it got through.',
        null,
        'Take it out. It is perfectly stiff.',
        'It is the same pencil colour.'
      ],
      why: 'Refraction. The light bent, and her eye believed it came straight.'
    }
  },
  {
    n: 2,
    label: 'This is why a pond is deeper than it looks',
    hook: 'Refraction is not a trick. It is the reason a stone in a stream is never quite where she reaches.',
    teachingText:
      'Everything she sees under water is a little out of place, and always in the same direction — things look shallower and closer than they really are. This is real and it matters to anyone reaching into water.',
    example:
      'A coin in the bottom of a jug looks close enough to pinch. Her fingers arrive above it every time.',
    applyIt: {
      prompt: 'A stone at the bottom of a stream looks:',
      choices: ['Deeper than it is', 'Shallower than it is', 'Exactly where it is', 'A different shape'],
      answer: 1,
      feedback: [
        'Refraction works the other way.',
        null,
        'Reach for one and find out.',
        'Its shape is fine.'
      ],
      why: 'Refraction lifts the picture, so everything under water looks nearer the top.'
    }
  }
];

const L23_ACTIVITY = {
  title: 'The pencil, the coin and the arrow',
  prep: 'A clear straight-sided glass, a jug, and a card with an arrow drawn on it.',
  needs: ['a clear glass', 'water', 'a pencil', 'a coin', 'a jug or bowl', 'a card with a bold arrow drawn on it'],
  steps: [
    'Stand the pencil in the empty glass and look from the side. Draw what you see.',
    'Fill the glass with water. Look again from the side. Draw that too.',
    'Look straight down from above. Does it still look broken?',
    'Put the coin in the empty jug. Step back until it just disappears behind the rim.',
    'Without moving, have a grown-up pour water in slowly. Watch the coin appear.',
    'Now hold the arrow card behind the full glass and look through. What happened to the arrow?',
    'Write down which one surprised you most.'
  ],
  safety: 'Glass on the bench, away from the edge. A grown-up pours. Wipe spills straight away.',
  minutes: 14
};

const L23_LEDGER = {
  prompt: 'Draw the pencil in the empty glass and in the full one. Then say what actually bent.',
  ifSheIsStuck: 'The pencil came out straight. So the only thing that could have bent is the light.'
};

// ======================================= LESSON 24 · A WATER DROP IS A LENS
const L24_CHECK_IN = {
  title: 'One drop on the newspaper',
  text: 'Put a single drop of water on a piece of clear plastic and hold it just above some small print.',
  question: 'The words got bigger. There is no glass anywhere. So what did it?'
};

const L24_BEATS = [
  {
    n: 1,
    label: 'A curved drop bends light on purpose',
    hook: 'The bending that broke the pencil is the same bending that makes a magnifier work.',
    teachingText:
      'A water drop is not flat. It bulges into a curve. Light going through a curved surface bends, and a bulging curve bends all the light inward so the picture arrives at her eye looking bigger. A shape that does that is called a lens.',
    example:
      'A drop of water on a clear plastic sheet over newsprint makes the letters under it swell up.',
    applyIt: {
      prompt: 'What makes the water drop magnify?',
      choices: ['Its curved shape', 'Its weight', 'Its coldness', 'The colour of the paper'],
      answer: 0,
      feedback: [
        null,
        'A puddle is heavier and does nothing.',
        'Warm water does it too.',
        'It works on any paper.'
      ],
      why: 'The curve is the whole thing. Flatten it and the magnifying stops.'
    }
  },
  {
    n: 2,
    label: 'Fatter curve, bigger picture',
    hook: 'She can change how strong her magnifier is without adding anything to it.',
    teachingText:
      'A tall, fat drop has a steeper curve, so it bends the light more and magnifies more. A wide flat drop has a gentle curve and barely magnifies at all. Same water, different shape, different result.',
    example:
      'Nudge the drop until it spreads out flat and the letters shrink back to normal size.',
    applyIt: {
      prompt: 'Which drop magnifies more?',
      choices: ['A wide flat one', 'A small fat one', 'They are the same', 'Neither does'],
      answer: 1,
      feedback: [
        'A gentle curve bends light very little.',
        null,
        'Try both on the same word.',
        'She has already seen one work.'
      ],
      why: 'Steeper curve, more bending, bigger picture.'
    }
  }
];

const L24_ACTIVITY = {
  title: 'Build a water drop magnifier and read a leaf with it',
  prep: 'Clear plastic — a food bag, a sheet protector or the lid of a takeaway box.',
  needs: ['a piece of clear plastic', 'water', 'a straw or a dropper', 'newspaper', 'a leaf from the garden', 'her notebook'],
  steps: [
    'Lay the plastic flat over a line of small print.',
    'Use the straw to place ONE drop of water on the plastic. Look through it.',
    'Add a little more water to make the drop fatter. Look again.',
    'Now smear the drop out flat. Look again.',
    'Write down which shape magnified most.',
    'Now hold the plastic over a leaf and put a fresh drop on. Look at the veins.',
    'Draw what the leaf looked like through the drop and what it looked like without it.'
  ],
  safety:
    'NEVER hold a water drop, a lens or a magnifier up toward the sun. A lens can start a fire and it can hurt an eye instantly. This one points at paper and leaves only.',
  minutes: 14
};

const L24_LEDGER = {
  prompt: 'Draw your fat drop and your flat drop from the side, and say which one magnified more and why.',
  ifSheIsStuck:
    'Ask her to draw the side view of each drop as a hill. The steeper hill is the one that bent the light more.'
};

export const SCIENCELAB_M4 = [
  {
    id: 'sl-m4-01',
    course: 'sciencelab',
    module: 4,
    quarter: 1,
    week: 7,
    day: 1,
    n: 19,
    title: 'Transparent, translucent, opaque',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Everything does one of exactly three things to light, and the middle one is the one people forget.',
    standards: ['S4P1a'],
    offGrade: null,
    words: ['transparent', 'translucent', 'opaque', 'light'],
    glossary: [
      { word: 'transparent', plain: 'Light goes straight through and she can see clearly.' },
      { word: 'translucent', plain: 'Some light gets through, but the picture is fuzzy.' },
      { word: 'opaque', plain: 'No light gets through at all.' },
      { word: 'light', plain: 'What lets her see. It travels, and things get in its way.' }
    ],
    video: {
      id: 'wL_yVzBH40Q',
      url: 'https://www.youtube.com/watch?v=wL_yVzBH40Q',
      title: 'Opaque Transparent Translucent Objects (For Kids) | TutWay',
      channel: 'TutWay',
      minutes: 4,
      verified: '2026-08-16',
      teaches: ['transparent', 'translucent', 'opaque', 'light', 'see through'],
      sourceGap:
        'No Black American educator found for elementary light. Searched "Black science teacher light shadows reflection elementary" and "African American educator light refraction kids science channel". Results were instyn education, Aasoka, Ubongo Kids English and Super Sema — the last two are AFRICAN productions (Tanzanian and Kenyan), which is not the same thing as a Black American educator and is recorded as what it is rather than counted as a gap closed. Open.'
    },
    checkIn: L19_CHECK_IN,
    beats: L19_BEATS,
    activity: L19_ACTIVITY,
    ledger: L19_LEDGER,
    hook: L19_CHECK_IN,
    core: L19_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L19_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What are the three things a material can do to light?', answer: 'Let it all through, let some through, or let none through.', why: 'Transparent, translucent, opaque. There is no fourth.' },
      { ask: 'Which one is the greenhouse roof?', answer: 'Translucent.', why: 'Light in for the plants, spread out so nothing scorches.' }
    ],
    check: [
      { prompt: 'Light gets through but she cannot see clearly. That is:', choices: ['Transparent', 'Opaque', 'Translucent', 'A shadow'], answer: 2, feedback: ['That means she sees clearly.', 'That means no light at all.', null, 'That is what opaque things make.'] },
      { prompt: 'A clay pot is:', choices: ['Opaque', 'Transparent', 'Translucent', 'A lens'], answer: 0, feedback: [null, 'She cannot see through it.', 'No light gets through at all.', 'It does not magnify.'] },
      { prompt: 'Which one is waxed paper?', choices: ['Transparent', 'Opaque', 'A mirror', 'Translucent'], answer: 3, feedback: ['She cannot read through it.', 'It glows when light is behind it.', 'Nothing bounces off it.', null] }
    ]
  },
  {
    id: 'sl-m4-02',
    course: 'sciencelab',
    module: 4,
    quarter: 1,
    week: 7,
    day: 2,
    n: 20,
    title: 'Shadows — the place light could not reach',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'A shadow is not a thing but an absence, and where the light is decides its length and direction.',
    standards: ['S4P1a'],
    offGrade: null,
    words: ['shadow', 'block', 'source', 'opaque'],
    glossary: [
      { word: 'shadow', plain: 'The place light could not reach because something was in the way.' },
      { word: 'block', plain: 'To stop light getting past.' },
      { word: 'source', plain: 'Where the light is coming from.' },
      { word: 'opaque', plain: 'Lets no light through. Only opaque things make sharp shadows.' }
    ],
    video: {
      id: '9SWmdP0Rw28',
      url: 'https://www.youtube.com/watch?v=9SWmdP0Rw28',
      title: 'HOW SHADOWS ARE FORMED? || SCIENCE EDUCATIONAL VIDEO',
      channel: 'Make It Easy Education',
      minutes: 4,
      verified: '2026-08-16',
      teaches: ['shadow', 'light', 'block', 'opaque', 'source'],
      sourceGap:
        'No Black American educator found for shadows at elementary level. Searched "HOW SHADOWS ARE FORMED Make It Easy Education" and "how shadows are formed for kids science light"; results were Make It Easy Education, Peekaboo Kidz, Little School and learning junction, none identifiable. Open.'
    },
    checkIn: L20_CHECK_IN,
    beats: L20_BEATS,
    activity: L20_ACTIVITY,
    ledger: L20_LEDGER,
    hook: L20_CHECK_IN,
    core: L20_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L20_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What is a shadow, really?', answer: 'A place light could not reach.', why: 'It is an absence, not a substance.' },
      { ask: 'What decides how long her shadow is?', answer: 'How high the light is.', why: 'Low light, long shadow. High light, short one.' }
    ],
    check: [
      { prompt: 'A shadow is:', choices: ['A place light could not reach', 'Dark stuff on the ground', 'A kind of light', 'Something the pot gives off'], answer: 0, feedback: [null, 'She cannot sweep it up.', 'It is light missing.', 'Nothing comes out of the pot.'] },
      { prompt: 'Which of these makes the sharpest shadow?', choices: ['A jam jar', 'Waxed paper', 'A clay pot', 'A clean window'], answer: 2, feedback: ['Light goes straight through.', 'Some light still gets through.', null, 'She can see right through it.'] },
      { prompt: 'The sun is low in the sky. Her shadow is:', choices: ['Short', 'Gone', 'The same as at noon', 'Long'], answer: 3, feedback: ['Short comes from a high sun.', 'It is longest then.', 'Noon is the shortest.', null] }
    ]
  },
  {
    id: 'sl-m4-03',
    course: 'sciencelab',
    module: 4,
    quarter: 1,
    week: 7,
    day: 3,
    n: 21,
    title: 'Light travels straight, and dust proves it',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Light goes in straight lines and never round corners, and a beam is only visible when something scatters it into her eye.',
    standards: ['S4P1b'],
    offGrade: null,
    words: ['straight', 'beam', 'line', 'path'],
    glossary: [
      { word: 'straight', plain: 'Not bent and not curved.' },
      { word: 'beam', plain: 'A narrow stream of light going one way.' },
      { word: 'line', plain: 'The path light takes. Always a straight one.' },
      { word: 'path', plain: 'The route something travels along.' }
    ],
    video: {
      id: 'iXy9Z4J17xY',
      url: 'https://www.youtube.com/watch?v=iXy9Z4J17xY',
      title: 'Light Travels in a Straight Line | Science Experiment',
      channel: 'Hungry SciANNtist',
      minutes: 3,
      verified: '2026-08-16',
      teaches: ['light', 'straight', 'line', 'beam', 'travel'],
      sourceGap:
        'No Black American educator found for how light travels. The Turtlediary video that looked like the best match on the search page could NOT be used: its oEmbed returns HTTP 401 because embedding is disabled, and every video in this app plays inside the lesson. Recorded rather than quietly swapped. Open.'
    },
    checkIn: L21_CHECK_IN,
    beats: L21_BEATS,
    activity: L21_ACTIVITY,
    ledger: L21_LEDGER,
    hook: L21_CHECK_IN,
    core: L21_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L21_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What shape is the path light takes?', answer: 'A straight line.', why: 'It never goes round a corner on its own.' },
      { ask: 'Why does dust make a beam visible?', answer: 'Each speck bounces a little light to her eye.', why: 'She sees the dust, not the beam.' }
    ],
    check: [
      { prompt: 'Light travels in:', choices: ['Curves', 'Straight lines', 'Circles', 'Whichever way it likes'], answer: 1, feedback: ['It has never curved on its own.', null, 'A beam does not loop.', 'It follows one rule.'] },
      { prompt: 'She slides the middle card sideways. She sees:', choices: ['A brighter light', 'The same as before', 'Nothing through the holes', 'A curved beam'], answer: 2, feedback: ['Blocking does not brighten.', 'The path is broken.', null, 'Light will not curve to get there.'] },
      { prompt: 'Dust in the air makes a beam show up because each speck:', choices: ['Glows by itself', 'Makes new light', 'Blocks the beam', 'Bounces light to her eye'], answer: 3, feedback: ['Dust makes no light.', 'The lamp is unchanged.', 'Then she would see less.', null] }
    ]
  },
  {
    id: 'sl-m4-04',
    course: 'sciencelab',
    module: 4,
    quarter: 1,
    week: 8,
    day: 1,
    n: 22,
    title: 'The mirror and the angle',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'A mirror bounces light off in a new straight line, and the angle it leaves at matches the angle it arrived at.',
    standards: ['S4P1b'],
    offGrade: null,
    words: ['mirror', 'reflect', 'angle', 'bounce'],
    glossary: [
      { word: 'mirror', plain: 'A smooth shiny surface that bounces light.' },
      { word: 'reflect', plain: 'To bounce off and carry on in a new direction.' },
      { word: 'angle', plain: 'How slanted something is.' },
      { word: 'bounce', plain: 'To hit something and come back off it.' }
    ],
    video: {
      id: 'cxsI0Av5624',
      url: 'https://www.youtube.com/watch?v=cxsI0Av5624',
      title: 'Reflection of light - Elementary Science',
      channel: 'Elearnin',
      minutes: 4,
      verified: '2026-08-16',
      teaches: ['reflection', 'mirror', 'light', 'bounce', 'angle'],
      sourceGap:
        'No Black American educator found for reflection at elementary level. Same searches as Lesson 19, recorded there. Open.'
    },
    checkIn: L22_CHECK_IN,
    beats: L22_BEATS,
    activity: L22_ACTIVITY,
    ledger: L22_LEDGER,
    hook: L22_CHECK_IN,
    core: L22_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L22_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What does a mirror do to light?', answer: 'Bounces it off in a new straight line.', why: 'Two straight lines meeting at the glass.' },
      { ask: 'What is the rule a mirror never breaks?', answer: 'The angle out matches the angle in.', why: 'That is why she can aim a bounce.' }
    ],
    check: [
      { prompt: 'A mirror makes light:', choices: ['Bounce off in a new straight line', 'Bend into a curve', 'Stop dead', 'Vanish'], answer: 0, feedback: [null, 'It changes direction once, sharply.', 'The bright spot says otherwise.', 'It went somewhere.'] },
      { prompt: 'She shines a torch straight at a mirror. The light comes:', choices: ['Off to one side', 'Nowhere', 'Round the corner', 'Straight back at her'], answer: 3, feedback: ['That needs a slant.', 'It always goes somewhere.', 'That needs a slant too.', null] },
      { prompt: 'Seeing round a corner with a mirror works because light:', choices: ['Bends round the wall', 'Bounces off at an angle', 'Goes through the wall', 'Slows down'], answer: 1, feedback: ['Light never bends round walls.', null, 'A wall is opaque.', 'Speed is not the reason.'] }
    ]
  },
  {
    id: 'sl-m4-05',
    course: 'sciencelab',
    module: 4,
    quarter: 1,
    week: 8,
    day: 2,
    n: 23,
    title: 'The pencil that bends in a glass of water',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Light changes direction going from air into water, and her eye still believes it came in a straight line.',
    standards: ['S4P1c'],
    offGrade: null,
    words: ['refraction', 'bend', 'water', 'glass'],
    glossary: [
      { word: 'refraction', plain: 'Light changing direction as it goes from one thing into another.' },
      { word: 'bend', plain: 'To change direction rather than carry straight on.' },
      { word: 'water', plain: 'Light slows down going into it, and bends if it arrives at a slant.' },
      { word: 'glass', plain: 'Light bends going into this too, for the same reason.' }
    ],
    video: {
      id: 'SeaWCamCHWQ',
      url: 'https://www.youtube.com/watch?v=SeaWCamCHWQ',
      title: 'Refraction of Light - Why does a pencil look bent in water? | #aumsum #kids #science',
      channel: "It's AumSum Time",
      minutes: 3,
      verified: '2026-08-16',
      teaches: ['refraction', 'light', 'bend', 'water', 'pencil'],
      sourceGap:
        'No Black American educator found for refraction at elementary level. The search "African American educator light refraction kids science channel" surfaced Ubongo Kids English and Super Sema, both with a refraction-in-water video that maps well to this lesson. Both are AFRICAN productions (Ubongo is Tanzanian, Super Sema is Kenyan-set), which is Black-led educational media but is NOT a Black American educator, and the standing requirement says Black American. Recorded as a real find and as what it actually is, not as a gap closed, and flagged to Gigi as hers to decide. Ids 3ti_50Qg71o and 5axEfQpb9xI. Open.'
    },
    checkIn: L23_CHECK_IN,
    beats: L23_BEATS,
    activity: L23_ACTIVITY,
    ledger: L23_LEDGER,
    hook: L23_CHECK_IN,
    core: L23_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L23_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What actually bent — the pencil or the light?', answer: 'The light.', why: 'The pencil comes out perfectly straight.' },
      { ask: 'What is that bending called?', answer: 'Refraction.', why: 'Light changing direction going from air into water.' }
    ],
    check: [
      { prompt: 'The pencil looks bent because the light:', choices: ['Stopped in the water', 'Changed direction going in', 'Made the pencil soft', 'Turned a new colour'], answer: 1, feedback: ['She can see it, so it got through.', null, 'Take it out. It is stiff.', 'Same colour as always.'] },
      { prompt: 'A stone at the bottom of a stream looks:', choices: ['Deeper than it is', 'Shallower than it is', 'Exactly where it is', 'A different shape'], answer: 1, feedback: ['Refraction works the other way.', null, 'Reach for one and find out.', 'Its shape is fine.'] },
      { prompt: 'Looking straight down at the pencil from above, it looks:', choices: ['Even more bent', 'Broken in three', 'Fine', 'Twice as long'], answer: 2, feedback: ['The slant is what does it.', 'It only ever looked snapped once.', null, 'Its length looks about right.'] }
    ]
  },
  {
    id: 'sl-m4-06',
    course: 'sciencelab',
    module: 4,
    quarter: 1,
    week: 8,
    day: 3,
    n: 24,
    title: 'A water drop is a magnifier',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'A curved drop bends light inward so the picture arrives bigger, and a steeper curve magnifies more.',
    standards: ['S4P1c'],
    offGrade: null,
    words: ['magnifier', 'curve', 'drop', 'lens'],
    glossary: [
      { word: 'magnifier', plain: 'Something that makes a picture look bigger.' },
      { word: 'curve', plain: 'A bulging shape, not a flat one.' },
      { word: 'drop', plain: 'A small round bead of water.' },
      { word: 'lens', plain: 'A curved shape that bends light to make a picture.' }
    ],
    video: {
      id: 'w4d85VAIqdA',
      url: 'https://www.youtube.com/watch?v=w4d85VAIqdA',
      title: 'How To Make a Water Drop Magnifier - Easy Science Experiment For Kids',
      channel: 'RonyesTech',
      minutes: 4,
      verified: '2026-08-16',
      teaches: ['magnifier', 'water drop', 'curve', 'light', 'bigger'],
      sourceGap:
        'No Black American educator found for lenses or magnifiers at elementary level. Same searches as Lesson 19, recorded there. Open.'
    },
    checkIn: L24_CHECK_IN,
    beats: L24_BEATS,
    activity: L24_ACTIVITY,
    ledger: L24_LEDGER,
    hook: L24_CHECK_IN,
    core: L24_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L24_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What makes a water drop magnify?', answer: 'Its curved shape.', why: 'Flatten it and the magnifying stops.' },
      { ask: 'Which magnifies more, a fat drop or a flat one?', answer: 'The fat one.', why: 'A steeper curve bends the light more.' }
    ],
    check: [
      { prompt: 'What makes the water drop magnify?', choices: ['Its curved shape', 'Its weight', 'Its coldness', 'The paper colour'], answer: 0, feedback: [null, 'A puddle is heavier and does nothing.', 'Warm water works too.', 'It works on any paper.'] },
      { prompt: 'Which drop magnifies more?', choices: ['A wide flat one', 'A small fat one', 'They are the same', 'Neither does'], answer: 1, feedback: ['A gentle curve bends light very little.', null, 'Try both on one word.', 'She has seen one work.'] },
      { prompt: 'A curved shape that bends light to make a picture is called a:', choices: ['Mirror', 'Shadow', 'Lens', 'Beam'], answer: 2, feedback: ['A mirror bounces light.', 'A shadow is missing light.', null, 'A beam is a stream of light.'] }
    ]
  }
];

export const SCIENCELAB_M4_META = {
  courseId: 'sciencelab',
  module: 4,
  title: 'Light, and What It Meets',
  blurb:
    'Her greenhouse is built out of this module. Glass that light goes straight through, staging it cannot pass at all, a milky roof in between — plus straight beams made visible with dust, a mirror that sees round a corner, and a pencil that is not really broken.'
};

export function m4LessonById(id) {
  return SCIENCELAB_M4.find((l) => l.id === id) || null;
}

export default SCIENCELAB_M4;
