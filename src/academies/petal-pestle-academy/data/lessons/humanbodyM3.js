// ---------------------------------------------------------------------------
// THE HUMAN BODY · MODULE 3 — BONES, THE FRAME
//
// Four lessons. Quarter 1, weeks 5 and 6. Tuesday and Thursday, 30 minutes.
//
// ---- THIS IS THE MODULE THAT GOES AT HER TWO FLOORS ----
//
// Geometry 2.00 and Measurement & Data 2.00 both hit the FLOOR of the Check-In.
// The item detail is precise and it is good news:
//
//     perimeter   0 of 3        units of measurement   0 of 3
//     area        0 of 2        elapsed time           0 of 1
//     naming shapes and sides   2 of 3  ✓
//
// She can name shapes. She has never been taught perimeter or area. Those are
// blanks, not weaknesses — and a blank is filled by doing the thing, not by
// being told she is behind.
//
// So the doctor's action here is measuring, twice over:
//
//   · HEIGHT AND ARM SPAN, in centimetres AND inches — two units for one body,
//     which is what "units of measurement" means when it is not a worksheet.
//   · HER OWN HAND TRACED ON SQUARED PAPER — perimeter by measuring round the
//     outline, area by counting the squares inside it. Both words, on her own
//     hand, in one sitting.
//
// It lives in the ACTIVITY. The prose stays under the Quarter 1 cap of 11 words
// a sentence, and nothing about measuring appears in the reading.
//
// ---- SAFETY ----
//
// NO WEIGHT. Height and arm span are lengths, and they are compared to EACH
// OTHER and to a doorframe — never to a chart of other children, never to what
// she "should" be. Nothing here is about size, shape or appearance. The broken-
// bone lesson is about how a bone mends, not about anything she should look for
// on herself or on anybody else.
// ---------------------------------------------------------------------------

// =========================================================== LESSON 1
const L1_CHECK_IN = {
  title: 'Stand up and feel for one',
  text: 'Press gently along your own arm, from your shoulder to your wrist.',
  question: 'You can feel something hard under there. What is it doing for you?'
};

const L1_BEATS = [
  {
    n: 1,
    label: 'Bones hold you up and keep you in shape',
    hook: 'Without a skeleton you would be a puddle in a bag of skin.',
    teachingText:
      'Bones are the frame of your body. They hold you up. They give you your shape. Everything else hangs on them or sits between them.',
    example:
      'A tent needs poles. Take the poles out and the canvas is a heap on the grass. Bones are your poles.',
    applyIt: {
      prompt: 'What do bones mainly do?',
      choices: ['Hold you up', 'Keep you warm', 'Pump blood', 'Digest food'],
      answer: 0,
      feedback: [
        null,
        'Skin and fat do more of that.',
        'That is your heart.',
        'That is your stomach and gut.'
      ]
    }
  },
  {
    n: 2,
    label: 'And they hide the soft parts behind them',
    hook: 'Your ribs are a cage, and your skull is a helmet you were born in.',
    teachingText:
      'Some bones are shields. Your skull is a hard box round your brain. Your ribs curve round your heart and lungs. The frame is armour as well.',
    example:
      'Tap your knuckle very gently on your head. The hard part is a bone, right over your brain.',
    applyIt: {
      prompt: 'Your ribs are there to:',
      choices: ['Help you breathe out', 'Protect your heart and lungs', 'Store food', 'Make you taller'],
      answer: 1,
      feedback: [
        'They move when you breathe, and protecting is the bigger job.',
        null,
        'Bones do not store food.',
        'Leg bones do more for height.'
      ]
    }
  }
];

const L1_ACTIVITY = {
  title: 'How tall, and how wide — in two units',
  prep: 'A tape measure with centimetres AND inches. A doorframe and a pencil.',
  needs: ['a tape measure with both units', 'a pencil', 'her notebook', 'a grown-up'],
  steps: [
    'Stand against the doorframe. Have a grown-up mark your height.',
    'Measure the mark in CENTIMETRES. Write it down.',
    'Measure the same mark in INCHES. Write that down too.',
    'Now stretch both arms out wide. Measure fingertip to fingertip, both units.',
    'Put the four numbers in a table. Is your arm span close to your height?'
  ],
  safety:
    'This is about LENGTH and nothing else. No weight, no comparing yourself to anybody, and no chart of what anybody your age "should" be. Two numbers for the same arm is the whole point.',
  minutes: 14
};

const L1_LEDGER = {
  prompt: 'Write your height in both units. Then write which number is bigger, and why.',
  ifSheIsStuck:
    'Ask her which is longer, one centimetre or one inch. The smaller the unit, the more of them it takes — that is the whole idea, and she just proved it on herself.'
};

// =========================================================== LESSON 2
const L2_CHECK_IN = {
  title: 'Is a bone alive?',
  text: 'Think about a bone. Hard, dry, white, still.',
  question: 'Do you think a bone in your arm right now is alive or not?'
};

const L2_BEATS = [
  {
    n: 1,
    label: 'A bone is alive, and it is not solid',
    hook: 'Bones are alive. They bleed, they mend, and they change all your life.',
    teachingText:
      'A bone is not a dry stick. It has blood going through it. The outside is hard. The middle is soft and spongy, with spaces.',
    example:
      'The spongy middle is why a bone is strong but not heavy. Solid bone all through would be too much to carry.',
    applyIt: {
      prompt: 'The inside of a bone is:',
      choices: ['Solid all through', 'Soft and spongy with spaces', 'Empty', 'Full of water'],
      answer: 1,
      feedback: [
        'That would be far too heavy.',
        null,
        'It has plenty inside it.',
        'Blood, not water.'
      ]
    }
  },
  {
    n: 2,
    label: 'Bones grow, and you had more of them once',
    hook: 'A baby has about 300 bones. You have about 206. They joined up.',
    teachingText:
      'A baby’s bones are soft in places and there are more of them. As you grow, some bones join together. Grown-ups have about 206.',
    example:
      'Your skull started as several pieces with gaps. They grew together into one hard box.',
    applyIt: {
      prompt: 'Why does a baby have more bones than you?',
      choices: ['Babies grow extra ones', 'Some of them join up later', 'Babies are bigger', 'Nobody counted properly'],
      answer: 1,
      feedback: [
        'The number goes down, not up.',
        null,
        'Babies are smaller.',
        'They have been counted many times.'
      ]
    }
  }
];

const L2_ACTIVITY = {
  title: 'Her hand, on squared paper',
  prep: 'Squared paper. If there is none, draw a grid of 1 cm squares.',
  needs: ['squared paper', 'a pencil', 'a ruler', 'her notebook'],
  steps: [
    'Put your hand flat on the squared paper. Trace right round it.',
    'AREA: count every whole square inside your outline. Write the number.',
    'Count half squares too. Two halves make one whole.',
    'PERIMETER: measure right round the outline with the ruler. Write it in cm.',
    'Now do the other hand. Write down whether the two are the same.'
  ],
  safety:
    'Just a pencil and paper. Nothing here is about the size of anybody’s hand — it is about the two words, area and perimeter, on something that belongs to you.',
  minutes: 14
};

const L2_LEDGER = {
  prompt: 'Write what area means and what perimeter means, in your own words.',
  ifSheIsStuck:
    'Point at the squares she counted and say "that is area". Then run a finger round the outline and say "that is perimeter". Inside and around. She does not need better words than those.'
};

// =========================================================== LESSON 3
const L3_CHECK_IN = {
  title: 'Where you bend',
  text: 'Bend your elbow. Now try to bend your arm halfway between your elbow and your wrist.',
  question: 'It only bends in certain places. What do you think is there?'
};

const L3_BEATS = [
  {
    n: 1,
    label: 'A joint is where two bones meet',
    hook: 'You have joints wherever you can bend, and nowhere else.',
    teachingText:
      'Where two bones meet, that place is called a joint. Joints are why you can move at all. A body of bones with no joints could not sit down.',
    example:
      'Count the joints in one finger. Bend it slowly and you can feel three.',
    applyIt: {
      prompt: 'A joint is:',
      choices: ['A kind of bone', 'A place where two bones meet', 'A muscle', 'A soft bone'],
      answer: 1,
      feedback: [
        'It is the meeting place, not a bone.',
        null,
        'Muscles pull on bones. They are not joints.',
        'Bones are not soft there.'
      ]
    }
  },
  {
    n: 2,
    label: 'Different joints, different moves',
    hook: 'Your elbow and your shoulder do not move the same way. Try both.',
    teachingText:
      'Some joints bend one way only, like a door hinge. Your elbow and knee do that. Some go round and round, like a ball in a cup. Your shoulder and hip do that.',
    example:
      'Swing your arm in a big circle. Now try that with your elbow. The elbow refuses, and that is correct.',
    applyIt: {
      prompt: 'Which joint goes round and round?',
      choices: ['Elbow', 'Knee', 'Shoulder', 'Finger'],
      answer: 2,
      feedback: [
        'It bends one way, like a door.',
        'The same.',
        null,
        'Fingers are hinges too.'
      ]
    }
  }
];

const L3_ACTIVITY = {
  title: 'Hinge or ball — a survey of yourself',
  prep: 'Nothing to prepare.',
  needs: ['her notebook', 'a pencil'],
  steps: [
    'Make a two-column table: HINGE and BALL.',
    'Try your elbow, knee, shoulder, hip, finger, neck and wrist.',
    'Move each one and put it in the right column.',
    'Find one that does not fit either. Write down what it does instead.',
    'Ask a grown-up to try the same seven and compare your two tables.'
  ],
  safety:
    'Move gently and only as far as is comfortable. Stop if anything hurts, and never push somebody else’s joint for them.',
  minutes: 12
};

const L3_LEDGER = {
  prompt: 'Name one hinge joint and one ball joint, and say how you could tell.',
  ifSheIsStuck:
    'Ask her to draw a door opening and a ball sitting in a cup. Then ask which of her joints matches which picture. The pictures do the explaining.'
};

// =========================================================== LESSON 4
const L4_CHECK_IN = {
  title: 'Mending itself',
  text: 'A broken bone is not glued back together by a doctor. It mends itself.',
  question: 'So what do you think the plaster cast is actually for?'
};

const L4_BEATS = [
  {
    n: 1,
    label: 'A bone mends itself, given the chance',
    hook: 'Bone is the only part of you that heals back as strong as before.',
    teachingText:
      'When a bone breaks, your body builds new bone across the gap. It does the mending. Nobody sticks it back together.',
    example:
      'It works like the scab in Module 2 — a temporary bridge first, then the real thing underneath.',
    applyIt: {
      prompt: 'What actually mends a broken bone?',
      choices: ['The plaster cast', 'The doctor', 'Your own body', 'Medicine'],
      answer: 2,
      feedback: [
        'The cast only holds it still.',
        'The doctor sets it and does not mend it.',
        null,
        'Medicine can help the pain, not the mending.'
      ]
    }
  },
  {
    n: 2,
    label: 'The cast holds it still so the mending lines up',
    hook: 'The cast is not the cure. It is the clamp.',
    teachingText:
      'New bone must grow across the break in the right place. If the two ends keep moving, it cannot. The cast holds them still while your body works.',
    example:
      'A doctor takes an X-ray first to see where the ends are. That is measuring, before treating.',
    applyIt: {
      prompt: 'A cast works by:',
      choices: ['Healing the bone', 'Holding the bone still', 'Keeping it warm', 'Making it stronger'],
      answer: 1,
      feedback: [
        'Your body does that part.',
        null,
        'Warmth is not the job.',
        'The new bone does that.'
      ]
    }
  }
];

const L4_ACTIVITY = {
  title: 'Build a splint, and test what still moves',
  prep: 'Two rulers or two straight sticks, and a soft scarf or bandage.',
  needs: ['two rulers or sticks', 'a soft scarf', 'her notebook', 'a willing grown-up'],
  steps: [
    'Hold a ruler along each side of a grown-up’s forearm.',
    'Tie the scarf round loosely, so the rulers stay put. LOOSELY.',
    'Ask them to try to bend their wrist. Write down what happens.',
    'Take it off. Write one sentence about what the splint stopped.',
    'Draw the four stages of a bone mending, like you did for a cut.'
  ],
  safety:
    'LOOSE, and on a grown-up who has agreed. Never tight, never on a real injury, and take it off straight away if they ask. This is a model, not first aid — a real break is a doctor’s job and only a doctor’s.',
  minutes: 14
};

const L4_LEDGER = {
  prompt: 'Write down what the cast does and what your body does. Two different jobs.',
  ifSheIsStuck:
    'Ask who is doing the mending. Then ask what the cast is doing while that happens. Holding still, and building — she has both halves already.'
};

// ---------------------------------------------------------------------------

export const HUMANBODY_M3 = [
  {
    id: 'body-m3-01',
    course: 'humanbody',
    module: 3,
    quarter: 1,
    week: 5,
    day: 1,
    n: 1,
    title: 'The frame you stand up with',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Bones hold the body up, give it shape, and shield the soft parts behind them.',
    standards: [],
    offGrade: null,
    words: ['skeleton', 'frame', 'protect'],
    glossary: [
      { word: 'skeleton', plain: 'All your bones together.' },
      { word: 'frame', plain: 'The strong part that holds a thing up.' },
      { word: 'protect', plain: 'To keep something safe from harm.' }
    ],
    video: {
      id: 'VHCCgrNSSOg',
      url: 'https://www.youtube.com/watch?v=VHCCgrNSSOg',
      title: 'The Skeletal System - Bones for Kids (Updated Version)',
      channel: 'Smile and Learn - English',
      minutes: 3,
      verified: '2026-08-18 · youtube.com/oembed · length read from the duration badge',
      teaches: ['what the skeleton is', 'what bones do for the body', 'which bones protect which organs'],
      sourceGap:
        'OPEN. Searched: "Smile and Learn OR Learn Bright OR Homeschool Pop joints for kids video skeleton how bones move" — returned printables, KidsHealth PDFs and homeschool blogs, no Black-educator-led channel. The two standing searches for this course are written down in full on body-m1-01.'
    },
    checkIn: L1_CHECK_IN,
    beats: L1_BEATS,
    activity: L1_ACTIVITY,
    ledger: L1_LEDGER,
    hook: L1_CHECK_IN,
    core: L1_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L1_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'Two jobs bones do.', answer: 'Hold you up, and protect soft parts.', why: 'Frame and armour at once.' },
      { ask: 'Which bones guard your brain?', answer: 'Your skull.', why: 'A hard box you were born wearing.' }
    ],
    check: [
      {
        prompt: 'Without a skeleton your body would:',
        choices: ['Move faster', 'Have no shape', 'Be warmer', 'Grow taller'],
        answer: 1,
        feedback: ['Nothing to push against.', null, 'Bones are not for warmth.', 'Bones are what height is.']
      },
      {
        prompt: 'Your ribs curve around your:',
        choices: ['Stomach only', 'Heart and lungs', 'Brain', 'Legs'],
        answer: 1,
        feedback: ['They cover more than that.', null, 'That is your skull.', 'Nowhere near.']
      },
      {
        prompt: 'One centimetre compared with one inch is:',
        choices: ['Longer', 'Shorter', 'The same', 'It depends'],
        answer: 1,
        feedback: ['The other way round.', null, 'They are different.', 'It never changes.']
      }
    ]
  },
  {
    id: 'body-m3-02',
    course: 'humanbody',
    module: 3,
    quarter: 1,
    week: 5,
    day: 2,
    n: 2,
    title: 'Bones are alive',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'A bone is living tissue — hard outside, spongy inside — and the number of bones changes as you grow.',
    standards: [],
    offGrade: null,
    words: ['alive', 'spongy', 'join'],
    glossary: [
      { word: 'alive', plain: 'Living. It grows and it can mend itself.' },
      { word: 'spongy', plain: 'Full of small spaces, like a sponge.' },
      { word: 'join', plain: 'To become one thing instead of two.' }
    ],
    video: {
      id: '3MN-M4gsDX0',
      url: 'https://www.youtube.com/watch?v=3MN-M4gsDX0',
      title: 'Bones for Kids | Learn about the Skeletal System for Kids',
      channel: 'Learn Bright',
      minutes: 7,
      verified: '2026-08-18 · youtube.com/oembed · length read from the duration badge',
      teaches: ['that bones are living tissue', 'what is inside a bone', 'how many bones a body has and why it changes'],
      sourceGap: 'OPEN. Same searches as body-m3-01 and body-m1-01, both written down there.'
    },
    checkIn: L2_CHECK_IN,
    beats: L2_BEATS,
    activity: L2_ACTIVITY,
    ledger: L2_LEDGER,
    hook: L2_CHECK_IN,
    core: L2_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L2_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'Is a bone alive?', answer: 'Yes. It has blood and it mends.', why: 'A dry stick cannot mend.' },
      { ask: 'Area or perimeter — counting squares inside?', answer: 'Area.', why: 'Inside is area, around is perimeter.' }
    ],
    check: [
      {
        prompt: 'The middle of a bone is:',
        choices: ['Solid', 'Spongy, with spaces', 'Empty', 'Made of skin'],
        answer: 1,
        feedback: ['Far too heavy.', null, 'There is plenty in there.', 'Not skin.']
      },
      {
        prompt: 'A baby has about 300 bones and you have about 206 because:',
        choices: ['Some joined up', 'Some wore away', 'Babies grow extras', 'Nobody counted'],
        answer: 0,
        feedback: [null, 'They do not wear away.', 'The number goes down.', 'They have been counted.']
      },
      {
        prompt: 'Counting the squares inside your hand outline gives you the:',
        choices: ['Perimeter', 'Height', 'Area', 'Weight'],
        answer: 2,
        feedback: ['That is the distance round it.', 'Not a height.', null, 'Nothing here weighs anything.']
      }
    ]
  },
  {
    id: 'body-m3-03',
    course: 'humanbody',
    module: 3,
    quarter: 1,
    week: 6,
    day: 1,
    n: 3,
    title: 'Joints, and the two kinds',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'A joint is where two bones meet, and different joints allow different movements.',
    standards: [],
    offGrade: null,
    words: ['joint', 'hinge', 'socket'],
    glossary: [
      { word: 'joint', plain: 'The place where two bones meet.' },
      { word: 'hinge', plain: 'A join that bends one way only, like a door.' },
      { word: 'socket', plain: 'A cup that something round sits in.' }
    ],
    video: {
      id: 'VsBJ4oUff10',
      url: 'https://www.youtube.com/watch?v=VsBJ4oUff10',
      title: 'Joints of the Skeleton',
      channel: 'Daniel Izzo',
      minutes: 1,
      verified: '2026-08-18 · youtube.com/oembed · length read from the duration badge',
      teaches: ['what a joint is', 'hinge joints', 'ball and socket joints'],
      sourceGap:
        'OPEN. ⚠️ AND A NOTE ON THIS ONE, HONESTLY: at 45 seconds it is the shortest video in the app, and the channel is an individual rather than an educational publisher. It was kept because it is short, correct and squarely on the lesson, and because the ACTIVITY is what teaches this lesson — she surveys seven of her own joints. If a better hinge-and-socket video for children turns up, this is the first one to replace. Identity of the channel is UNKNOWN and recorded as unknown.'
    },
    checkIn: L3_CHECK_IN,
    beats: L3_BEATS,
    activity: L3_ACTIVITY,
    ledger: L3_LEDGER,
    hook: L3_CHECK_IN,
    core: L3_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L3_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What is a joint?', answer: 'Where two bones meet.', why: 'It is a place, not a part.' },
      { ask: 'Elbow — hinge or ball?', answer: 'Hinge.', why: 'One direction, like a door.' }
    ],
    check: [
      {
        prompt: 'Your shoulder is a:',
        choices: ['Hinge joint', 'Ball and socket joint', 'Fixed joint', 'Muscle'],
        answer: 1,
        feedback: ['Hinges go one way.', null, 'It moves plenty.', 'Not a muscle.']
      },
      {
        prompt: 'A hinge joint moves:',
        choices: ['Round and round', 'One way, back and forth', 'Sideways only', 'Not at all'],
        answer: 1,
        feedback: ['That is a ball and socket.', null, 'Try your knee sideways — it will not.', 'It moves.']
      },
      {
        prompt: 'Your arm does not bend between elbow and wrist because:',
        choices: ['The muscle stops it', 'There is no joint there', 'It is too thin', 'It would hurt'],
        answer: 1,
        feedback: ['Muscles pull, they do not block.', null, 'Thickness is not it.', 'There is nothing to bend.']
      }
    ]
  },
  {
    id: 'body-m3-04',
    course: 'humanbody',
    module: 3,
    quarter: 1,
    week: 6,
    day: 2,
    n: 4,
    title: 'When a bone breaks',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'A broken bone mends itself with new bone — the cast holds it still so the mending lines up.',
    standards: [],
    offGrade: null,
    words: ['break', 'cast', 'mend'],
    glossary: [
      { word: 'break', plain: 'A crack or a snap in a bone.' },
      { word: 'cast', plain: 'A hard cover that holds a bone still while it mends.' },
      { word: 'mend', plain: 'To make whole again.' }
    ],
    video: {
      id: 'iapYNqXvHnw',
      url: 'https://www.youtube.com/watch?v=iapYNqXvHnw',
      title: 'All about BREAKING Bones! | Compilation | Science for Kids | Operation Ouch',
      channel: 'Operation Ouch',
      minutes: 25,
      verified: '2026-08-18 · youtube.com/oembed · length read from the duration badge',
      teaches: ['what happens inside a broken bone', 'what an X-ray shows', 'what a cast is for and how it is put on'],
      sourceGap:
        'OPEN. Same searches as body-m3-01 and body-m1-01. ⚠️ LENGTH: 25 minutes, which is longer than the 30-minute lesson can hold in one sitting. Gigi’s call on Aug 17: "Just leave the videos alone the way they are. It maybe good to have her watch the full videos." A compilation is made of separate items, so it can be stopped and picked up again on the Thursday, or watched whole if she wants it.'
    },
    checkIn: L4_CHECK_IN,
    beats: L4_BEATS,
    activity: L4_ACTIVITY,
    ledger: L4_LEDGER,
    hook: L4_CHECK_IN,
    core: L4_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L4_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What mends a broken bone?', answer: 'Your own body.', why: 'It builds new bone across the gap.' },
      { ask: 'What is the cast for?', answer: 'Holding the ends still.', why: 'So the new bone lines up.' }
    ],
    check: [
      {
        prompt: 'A plaster cast:',
        choices: ['Heals the bone', 'Holds the bone still', 'Keeps it warm', 'Makes it grow'],
        answer: 1,
        feedback: ['Your body heals it.', null, 'Warmth is not the job.', 'New bone does that.']
      },
      {
        prompt: 'Before setting a break, a doctor takes an X-ray to:',
        choices: ['Treat it', 'See where the ends are', 'Make it hurt less', 'Check your height'],
        answer: 1,
        feedback: ['That comes after.', null, 'It does not.', 'Nothing to do with height.']
      },
      {
        prompt: 'If somebody has a real broken bone, you should:',
        choices: ['Build them a splint', 'Tell a grown-up straight away', 'Move the arm to check', 'Wait and see'],
        answer: 1,
        feedback: ['The activity uses an uninjured arm only.', null, 'Never move it.', 'Never wait.']
      }
    ]
  }
];

export const HUMANBODY_M3_META = {
  courseId: 'humanbody',
  module: 3,
  title: 'Bones, the Frame',
  blurb:
    'The frame she stands up with — measured in two units, traced on squared paper for area and perimeter, surveyed joint by joint, and mended by her own body when it breaks.'
};

export function humanbodyM3LessonById(id) {
  return HUMANBODY_M3.find((l) => l.id === id) || null;
}

export default HUMANBODY_M3;
