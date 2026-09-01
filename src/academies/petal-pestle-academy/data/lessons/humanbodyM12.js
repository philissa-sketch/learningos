// ---------------------------------------------------------------------------
// THE HUMAN BODY · MODULE 12 — THE BRAIN AND THE NERVES
//
// Four lessons. Quarter 3, weeks 7 and 8. Tuesday and Thursday, 30 minutes.
// The last module of Quarter 3, and the one every earlier module has been
// pointing at: nerves turned up in the tooth, in the bladder, in the muscle
// that pulled. This is where they get a lesson of their own.
//
// ---- THE DOCTOR'S ACTION: THE TWO-POINT TEST, IN MILLIMETRES ----
//
// Two blunt points touched on the skin. On a fingertip she feels two even when
// they are a few millimetres apart. On her back she feels one until they are
// several centimetres apart. It is a real neurology bedside test, it is
// completely safe, and it gives her a NEW UNIT — the millimetre — with a
// conversion to centimetres she has to do herself. Units scored 0 of 3.
//
// Lesson 1 measures VOLUME again, this time 1200 millilitres in a bag, because
// that is roughly the size of a brain and holding it beats being told.
//
// ---- READING CAP ----
//
// Quarter 3: 14 words a sentence, floor 6.5. §10.1.
//
// ---- SAFETY ----
//
// The brain is the topic where a course like this drifts into how a person
// thinks, learns, or behaves — and that is the last thing a child who has just
// been told she is behind needs from a lesson. So:
//
//   · NOTHING about how clever anybody is, how fast anybody learns, memory
//     being good or bad, or one brain being better than another.
//   · Nothing about mental illness, head injury, or what goes wrong.
//   · No self-inspection and no diagnosing. She is measuring skin, not herself.
//   · Lesson 4 explains brain freeze but does NOT ask her to cause one. Nothing
//     in this module hurts, and nothing cold is eaten to prove a point.
//   · The two-point test uses two BLUNT points — cotton buds or hairgrips, not
//     pins — and a grown-up hands them over.
// ---------------------------------------------------------------------------

// =========================================================== LESSON 1
const L1_CHECK_IN = {
  title: 'Everything at once',
  text: 'Right now you are sitting, breathing, hearing, and reading this.',
  question: 'Something is running all of that at the same time. What do you think it is?'
};

const L1_BEATS = [
  {
    n: 1,
    label: 'It sits in a bone box, floating in liquid',
    hook: 'Your brain never touches the bone around it.',
    teachingText:
      'The skull is a hard box built round the brain. Inside, the brain floats in a thin layer of liquid. That liquid stops it knocking against the bone when you move.',
    example:
      'Shake a jar with a plum in water and the plum drifts. Shake a dry jar and it rattles.',
    applyIt: {
      prompt: 'The brain is protected by:',
      choices: ['Muscle only', 'Bone and a layer of liquid', 'Skin alone', 'Nothing'],
      answer: 1,
      feedback: [
        'Muscle is not what shields it.',
        null,
        'Skin is the outermost layer, not the shield.',
        'It is very well protected.'
      ]
    }
  },
  {
    n: 2,
    label: 'Different parts do different jobs',
    hook: 'It is not one lump doing one thing.',
    teachingText:
      'The big wrinkled part at the top handles seeing, hearing and deciding. A smaller part at the back keeps you balanced. A stalk underneath runs breathing and heartbeat without asking you.',
    example:
      'You do not decide to breathe while you sleep. The stalk does it whether you are awake or not.',
    applyIt: {
      prompt: 'The part that keeps breathing going while you sleep is:',
      choices: ['The wrinkled top', 'The stalk underneath', 'The skull', 'The liquid'],
      answer: 1,
      feedback: [
        'That part handles deciding.',
        null,
        'The skull is bone.',
        'The liquid only cushions.'
      ]
    }
  }
];

const L1_ACTIVITY = {
  title: 'Hold 1200 millilitres',
  prep: 'A strong sealable bag, a measuring jug, and water.',
  needs: ['a sealable bag', 'a measuring jug', 'water', 'her notebook'],
  steps: [
    'Measure 1200 millilitres of water into the jug, filling it in stages if you need to.',
    'Write down how many pours it took and what each one measured.',
    'Pour it into the bag, seal it properly, and hold it in both hands.',
    'Write down what 1200 millilitres is in litres.',
    'Write one sentence about what surprised you when you held it.'
  ],
  safety:
    'Water, a sealed bag and a sink. Nothing about anybody’s head is measured, and nothing here is about how big anybody is.',
  minutes: 14
};

const L1_LEDGER = {
  prompt: 'Write down the two things that protect your brain, and roughly what size it is.',
  ifSheIsStuck:
    'Bone and liquid, and about 1200 millilitres. She held that. Ask her to say it in litres as well as millilitres.'
};

// =========================================================== LESSON 2
const L2_CHECK_IN = {
  title: 'A message from your foot',
  text: 'Stand on something small and you know about it straight away.',
  question: 'How does news from your foot get all the way up to your head?'
};

const L2_BEATS = [
  {
    n: 1,
    label: 'Nerves are wires, and they run everywhere',
    hook: 'There is no part of you a nerve does not reach.',
    teachingText:
      'Nerves are thin cords that carry messages as tiny electric signals. A thick bundle runs down inside your spine. Smaller ones branch off it and reach every part of you.',
    example:
      'The main bundle is the spinal cord. Branches leave it the way roads leave a motorway.',
    applyIt: {
      prompt: 'Nerves carry messages as:',
      choices: ['Water', 'Tiny electric signals', 'Air', 'Blood'],
      answer: 1,
      feedback: [
        'Water carries waste, not messages.',
        null,
        'Air goes to the lungs.',
        'Blood carries food and oxygen.'
      ]
    }
  },
  {
    n: 2,
    label: 'Some skin has far more nerve endings than other skin',
    hook: 'Your fingertips are crowded. Your back is not.',
    teachingText:
      'Nerve endings are packed close together in your fingertips and lips. On your back and your arm they are spread far apart. That is why a fingertip tells you so much more.',
    example:
      'You can read a coin with a fingertip. You could not tell what it was with your elbow.',
    applyIt: {
      prompt: 'Which has the most nerve endings packed together?',
      choices: ['Your back', 'Your fingertip', 'Your upper arm', 'Your knee'],
      answer: 1,
      feedback: [
        'They are spread far apart there.',
        null,
        'Spread apart there too.',
        'Fewer than a fingertip.'
      ]
    }
  }
];

const L2_ACTIVITY = {
  title: 'The two-point test',
  prep: 'Two cotton buds or two hairgrips, a ruler with millimetres, and a helper.',
  needs: ['two blunt points', 'a ruler with millimetres', 'a helper', 'her notebook'],
  steps: [
    'Hold the two points 5 millimetres apart and touch them gently to a fingertip.',
    'With your eyes shut, say whether you feel one point or two.',
    'Move them further apart until you can tell there are two, and write that distance in millimetres.',
    'Do the same on the back of the hand, the forearm, and the back of the neck.',
    'Write the four distances in a list, and write the largest one in centimetres as well.'
  ],
  safety:
    'BLUNT points only — cotton buds or hairgrips, handed over by a grown-up. Never a pin, never a needle, and touched gently enough that it does not hurt. Stop the moment anybody says stop.',
  minutes: 16
};

const L2_LEDGER = {
  prompt: 'Write down your four distances in millimetres, smallest first.',
  ifSheIsStuck:
    'Ten millimetres make one centimetre. If her largest was 40 mm, that is 4 cm. Getting the order right matters more than the exact numbers.'
};

// =========================================================== LESSON 3
const L3_CHECK_IN = {
  title: 'Your hand moved first',
  text: 'Touch something unexpectedly hot and your hand is already away before you notice.',
  question: 'If your hand moved before you decided to move it, who decided?'
};

const L3_BEATS = [
  {
    n: 1,
    label: 'A reflex takes a shortcut and misses out the brain',
    hook: 'Some decisions are made in your back, not your head.',
    teachingText:
      'For the fastest moves the message only travels to the spinal cord and straight back out. Your brain finds out afterwards. Missing out the trip to your head saves time.',
    example:
      'That is why your hand is already moving before you have thought the word hot.',
    applyIt: {
      prompt: 'A reflex is fast because the message:',
      choices: ['Travels twice', 'Does not go all the way to the brain', 'Is louder', 'Waits its turn'],
      answer: 1,
      feedback: [
        'Twice would be slower.',
        null,
        'Loudness is not part of it.',
        'Waiting is slower.'
      ]
    }
  },
  {
    n: 2,
    label: 'Reflexes protect you, so you cannot switch them off',
    hook: 'Try not to blink when something comes at your face. You will lose.',
    teachingText:
      'Reflexes exist to keep you safe when there is no time to think. Blinking, pulling away from heat and coughing all happen on their own. You cannot simply decide to stop them.',
    example:
      'A doctor taps a knee to watch a reflex happen. She is checking the wiring, not testing you.',
    applyIt: {
      prompt: 'Reflexes happen:',
      choices: ['Only when you choose', 'On their own, to protect you', 'Once a day', 'Only when you are asleep'],
      answer: 1,
      feedback: [
        'You do not get a choice.',
        null,
        'Whenever they are needed.',
        'Awake as well.'
      ]
    }
  }
];

const L3_ACTIVITY = {
  title: 'Reflex or decision?',
  prep: 'Paper, a pencil, and a helper.',
  needs: ['paper', 'a pencil', 'a helper', 'her notebook'],
  steps: [
    'Rule two columns on your paper and head them Reflex and Decision.',
    'Try each of these and put it in a column: blinking, waving, coughing, writing your name.',
    'Add three more of your own, one in each column and one you are not sure about.',
    'Beside every reflex, write what you think it is protecting.',
    'Write one sentence about the one you could not decide.'
  ],
  safety:
    'Nothing here is done to anybody else, and nothing is done to startle anybody. Blinking is tried on yourself and stopped whenever you like.',
  minutes: 13
};

const L3_LEDGER = {
  prompt: 'Write down what a reflex is, and one thing it protects you from.',
  ifSheIsStuck:
    'Fast, automatic, and it skips the brain. Blinking protects an eye. If she has that, the rest is naming.'
};

// =========================================================== LESSON 4
const L4_CHECK_IN = {
  title: 'The wrong address',
  text: 'A cold drink can give you a sharp ache in your forehead.',
  question: 'Nothing cold touched your forehead. So why does it hurt there?'
};

const L4_BEATS = [
  {
    n: 1,
    label: 'The brain can get the address wrong',
    hook: 'Your brain is guessing where a message came from, and sometimes it guesses badly.',
    teachingText:
      'Nerves from different places share the same routes on the way up. When a strong signal arrives, your brain reads the route and names a place. Sometimes it names the wrong one.',
    example:
      'Cold on the roof of your mouth gets reported as pain in your forehead. That is brain freeze.',
    applyIt: {
      prompt: 'Brain freeze is felt in the forehead because:',
      choices: ['The forehead got cold', 'The brain named the wrong place', 'The brain froze', 'Skin is thin there'],
      answer: 1,
      feedback: [
        'Nothing cold touched it.',
        null,
        'Nothing about you freezes.',
        'Thickness is not the reason.'
      ]
    }
  },
  {
    n: 2,
    label: 'Why a doctor asks exactly where it hurts',
    hook: 'This is the reason for a question you have been asked all your life.',
    teachingText:
      'Because the brain can misname a place, where something hurts is a clue and not a proof. A doctor asks where, then checks whether the answer makes sense.',
    example:
      'Pain from one part of the body is sometimes felt in a shoulder. Doctors are taught to expect it.',
    applyIt: {
      prompt: 'Where a pain is felt is:',
      choices: ['Always exactly where the trouble is', 'A clue, not a proof', 'Never useful', 'Chosen by the person'],
      answer: 1,
      feedback: [
        'Not always, as brain freeze shows.',
        null,
        'It is a useful clue.',
        'Nobody chooses it.'
      ]
    }
  }
];

const L4_ACTIVITY = {
  title: 'Can you point to where you were touched?',
  prep: 'A washable felt pen, a ruler with centimetres, and a helper.',
  needs: ['a washable pen', 'a ruler', 'a helper', 'her notebook'],
  steps: [
    'Shut your eyes and have your helper touch one spot on the back of your hand.',
    'Keeping your eyes shut, point to where you think it was, and let them mark both spots.',
    'Open your eyes and measure the gap between the two marks in centimetres.',
    'Do it four more times, writing down the gap each time.',
    'Write down your smallest gap, your largest, and the difference between them.'
  ],
  safety:
    'A washable pen on the back of a hand, and gentle touching only. Stop whenever anybody wants to stop. Nothing here is a test of her and no result means anything is wrong.',
  minutes: 15
};

const L4_LEDGER = {
  prompt: 'Write down your five gaps, then your largest, smallest and the difference.',
  ifSheIsStuck:
    'She has done a difference three times now. Largest take away smallest, with the unit on all three numbers.'
};

// ---------------------------------------------------------------------------

export const HUMANBODY_M12 = [
  {
    id: 'body-m12-01',
    course: 'humanbody',
    module: 12,
    quarter: 3,
    week: 7,
    day: 1,
    n: 1,
    title: 'The brain, in a bone box',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'The brain floats in liquid inside the skull, and different parts of it do different jobs — including ones you never decide.',
    standards: [],
    offGrade: 'Volume in millilitres, built up in stages and converted to litres. Measurement 2.00 and units 0 of 3, both at the test floor.',
    words: ['skull', 'balance', 'automatic'],
    glossary: [
      { word: 'skull', plain: 'The hard bone box that holds and protects your brain.' },
      { word: 'balance', plain: 'Staying upright without falling over.' },
      { word: 'automatic', plain: 'Happening on its own, without you deciding.' }
    ],
    video: {
      id: 'ndDpjT0_IM0',
      url: 'https://www.youtube.com/watch?v=ndDpjT0_IM0',
      title: 'How Your Brain Works? - The Dr. Binocs Show | Best Learning Videos For Kids | Peekaboo Kidz',
      channel: 'Peekaboo Kidz',
      minutes: 5,
      verified: '2026-08-18 · youtube.com/oembed · 4:49 read from the playlist duration badge',
      teaches: ['where the brain sits and what protects it', 'the main parts and their jobs', 'what happens without you deciding'],
      sourceGap:
        'OPEN. Searched: "Black science educator YouTube channel for kids human body anatomy lessons elementary" — returned round-up listicles naming Homeschool Pop, Colossal Cranium, Operation Ouch and Kids Learning Tube, and one promising name, "Learning Science with Michelle". Searched YouTube for that channel on nervous-system topics and it did not appear in results. RECORDED AS UNKNOWN, NOT CLOSED. The two standing searches for this course are written down in full on body-m1-01.'
    },
    checkIn: L1_CHECK_IN,
    beats: L1_BEATS,
    activity: L1_ACTIVITY,
    ledger: L1_LEDGER,
    hook: L1_CHECK_IN,
    core: L1_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L1_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What protects the brain?', answer: 'Bone, and a layer of liquid.', why: 'It never touches the skull.' },
      { ask: 'What runs your breathing while you sleep?', answer: 'The stalk underneath the brain.', why: 'It never asks you first.' }
    ],
    check: [
      {
        prompt: 'The brain is protected by:',
        choices: ['Muscle only', 'Skin alone', 'Bone and a layer of liquid', 'Nothing'],
        answer: 2,
        feedback: ['Muscle is not the shield.', 'Skin is outermost, not the shield.', null, 'It is well protected.']
      },
      {
        prompt: 'The part that keeps breathing going while you sleep is:',
        choices: ['The stalk underneath', 'The wrinkled top', 'The skull', 'The liquid'],
        answer: 0,
        feedback: [null, 'That part decides things.', 'The skull is bone.', 'The liquid cushions.']
      },
      {
        prompt: '1200 millilitres written in litres is:',
        choices: ['12 litres', '120 litres', '1.2 litres', '0.12 litres'],
        answer: 2,
        feedback: ['Ten times too many.', 'A hundred times too many.', null, 'Ten times too few.']
      }
    ]
  },
  {
    id: 'body-m12-02',
    course: 'humanbody',
    module: 12,
    quarter: 3,
    week: 7,
    day: 2,
    n: 2,
    title: 'Nerves, the wires',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Nerves carry messages as tiny electric signals along a spinal bundle and its branches, and they are packed far closer in some skin than in others.',
    standards: [],
    offGrade: 'Millimetres, and converting them to centimetres. Units scored 0 of 3, at the test floor.',
    words: ['nerve', 'spinal cord', 'millimetre'],
    glossary: [
      { word: 'nerve', plain: 'A thin cord that carries messages around your body.' },
      { word: 'spinal cord', plain: 'The thick bundle of nerves running down inside your spine.' },
      { word: 'millimetre', plain: 'A tiny length. Ten of them make one centimetre.' }
    ],
    video: {
      id: 'KZVeFTDszTs',
      url: 'https://www.youtube.com/watch?v=KZVeFTDszTs',
      title: 'The Nervous System  | Video for Kids',
      channel: 'learning junction',
      minutes: 3,
      verified: '2026-08-18 · youtube.com/oembed · 2:59 read from the playlist duration badge',
      teaches: ['what nerves are and what they carry', 'the spinal cord and its branches', 'how a message reaches the brain'],
      sourceGap: 'OPEN. Same searches as body-m12-01 and body-m1-01, both written down there.'
    },
    checkIn: L2_CHECK_IN,
    beats: L2_BEATS,
    activity: L2_ACTIVITY,
    ledger: L2_LEDGER,
    hook: L2_CHECK_IN,
    core: L2_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L2_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What do nerves carry?', answer: 'Tiny electric signals.', why: 'Messages, not liquid.' },
      { ask: 'Where are nerve endings packed closest?', answer: 'Fingertips and lips.', why: 'Which is why they tell you most.' }
    ],
    check: [
      {
        prompt: 'Nerves carry messages as:',
        choices: ['Tiny electric signals', 'Water', 'Air', 'Blood'],
        answer: 0,
        feedback: [null, 'Water carries waste.', 'Air goes to the lungs.', 'Blood carries food and oxygen.']
      },
      {
        prompt: 'Which has the most nerve endings packed together?',
        choices: ['Your back', 'Your upper arm', 'Your knee', 'Your fingertip'],
        answer: 3,
        feedback: ['Spread far apart.', 'Spread far apart.', 'Fewer than a fingertip.', null]
      },
      {
        prompt: '40 millimetres written in centimetres is:',
        choices: ['400 cm', '4 cm', '0.4 cm', '40 cm'],
        answer: 1,
        feedback: ['Far too big.', null, 'Ten times too small.', 'The unit did not change.']
      }
    ]
  },
  {
    id: 'body-m12-03',
    course: 'humanbody',
    module: 12,
    quarter: 3,
    week: 8,
    day: 1,
    n: 3,
    title: 'Reflexes, faster than thinking',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'A reflex message turns round at the spinal cord instead of travelling to the brain, which is why it is fast and why you cannot switch it off.',
    standards: [],
    offGrade: null,
    words: ['reflex', 'shortcut', 'protect'],
    glossary: [
      { word: 'reflex', plain: 'A fast move your body makes on its own, without you deciding.' },
      { word: 'shortcut', plain: 'A quicker route that misses out part of the long way round.' },
      { word: 'protect', plain: 'To keep something safe from harm.' }
    ],
    video: {
      id: '483eonLwznc',
      url: 'https://www.youtube.com/watch?v=483eonLwznc',
      title: 'THE NERVOUS SYSTEM | Educational Videos for Kids | Happy Learning',
      channel: 'Happy Learning English',
      minutes: 4,
      verified: '2026-08-18 · youtube.com/oembed · 3:39 read from the playlist duration badge',
      teaches: ['what a reflex is', 'the route a reflex message takes', 'why some moves are automatic'],
      sourceGap:
        'OPEN. Searched: "reflexes for kids youtube Dr. Binocs OR SciShow Kids OR Nemours knee jerk reflex how fast" and "nervous system reflex arc spinal cord video for kids Happy Learning OR Smile and Learn OR Homeschool Pop". REJECTED: kj-L-6MfaE0 ("The Reaction Time Test!", Operation Ouch) verified at oEmbed but DROPPED OUT OF A PLAYLIST TWICE, which is the pattern the region-locked BBC Teach video showed. A video that verifies and will not play is worse than one that never verified, so it is not used. Also rejected on length: GUCcsMmZVec (Operation Ouch, 44:56) — a 45-minute video does not fit a 30-minute lesson.'
    },
    checkIn: L3_CHECK_IN,
    beats: L3_BEATS,
    activity: L3_ACTIVITY,
    ledger: L3_LEDGER,
    hook: L3_CHECK_IN,
    core: L3_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L3_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'Why is a reflex so fast?', answer: 'It skips the trip to the brain.', why: 'It turns round at the spinal cord.' },
      { ask: 'Can you switch a reflex off?', answer: 'No. It happens on its own.', why: 'It is there to protect you.' }
    ],
    check: [
      {
        prompt: 'A reflex is fast because the message:',
        choices: ['Travels twice', 'Is louder', 'Does not go all the way to the brain', 'Waits its turn'],
        answer: 2,
        feedback: ['Twice is slower.', 'Loudness is not part of it.', null, 'Waiting is slower.']
      },
      {
        prompt: 'Reflexes happen:',
        choices: ['On their own, to protect you', 'Only when you choose', 'Once a day', 'Only when asleep'],
        answer: 0,
        feedback: [null, 'You get no choice.', 'Whenever needed.', 'Awake as well.']
      },
      {
        prompt: 'Which of these is a reflex?',
        choices: ['Writing your name', 'Waving', 'Blinking when something comes at you', 'Reading'],
        answer: 2,
        feedback: ['That is a decision.', 'That is a decision.', null, 'That is a decision.']
      }
    ]
  },
  {
    id: 'body-m12-04',
    course: 'humanbody',
    module: 12,
    quarter: 3,
    week: 8,
    day: 2,
    n: 4,
    title: 'When the brain gets the place wrong',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Nerves share routes on the way up, so the brain sometimes names the wrong place — which is why where it hurts is a clue rather than a proof.',
    standards: [],
    offGrade: 'Length in centimetres over five trials, then largest, smallest and the difference. Measurement 2.00, at the test floor.',
    words: ['signal', 'route', 'clue'],
    glossary: [
      { word: 'signal', plain: 'A message being sent from one place to another.' },
      { word: 'route', plain: 'The path something travels along to get somewhere.' },
      { word: 'clue', plain: 'Something that helps you work out an answer, without proving it.' }
    ],
    video: {
      id: '8v6EPDD3Wu0',
      url: 'https://www.youtube.com/watch?v=8v6EPDD3Wu0',
      title: 'Why Do We Get Brain Freeze? | The Dr. Binocs Show | Best Learning Videos For Kids | Peekaboo Kidz',
      channel: 'Peekaboo Kidz',
      minutes: 6,
      verified: '2026-08-18 · youtube.com/oembed · 6:08 read from the playlist duration badge',
      teaches: ['what brain freeze actually is', 'why it is felt in the forehead', 'that nerves share routes'],
      sourceGap: 'OPEN. Same searches as body-m12-01 and body-m1-01, both written down there.'
    },
    checkIn: L4_CHECK_IN,
    beats: L4_BEATS,
    activity: L4_ACTIVITY,
    ledger: L4_LEDGER,
    hook: L4_CHECK_IN,
    core: L4_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L4_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'Why is brain freeze felt in the forehead?', answer: 'The brain named the wrong place.', why: 'Nerves share routes on the way up.' },
      { ask: 'Is where it hurts a proof?', answer: 'No, it is a clue.', why: 'A doctor checks whether it makes sense.' }
    ],
    check: [
      {
        prompt: 'Brain freeze is felt in the forehead because:',
        choices: ['The forehead got cold', 'The brain froze', 'Skin is thin there', 'The brain named the wrong place'],
        answer: 3,
        feedback: ['Nothing cold touched it.', 'Nothing about you freezes.', 'Thickness is not it.', null]
      },
      {
        prompt: 'Where a pain is felt is:',
        choices: ['A clue, not a proof', 'Always exactly right', 'Never useful', 'Chosen by the person'],
        answer: 0,
        feedback: [null, 'Not always, as brain freeze shows.', 'It is a useful clue.', 'Nobody chooses it.']
      },
      {
        prompt: 'Your largest gap is 7 cm and your smallest is 2 cm. The difference is:',
        choices: ['9 cm', '5 cm', '2 cm', '7 cm'],
        answer: 1,
        feedback: ['That is adding them.', null, 'That is the smallest.', 'That is the largest.']
      }
    ]
  }
];

export const HUMANBODY_M12_META = {
  courseId: 'humanbody',
  module: 12,
  title: 'The Brain and the Nerves',
  blurb:
    'Twelve hundred millilitres held in both hands, a real bedside test done in millimetres on four patches of her own skin, and the reason a doctor always asks exactly where it hurts.'
};

export function humanbodyM12LessonById(id) {
  return HUMANBODY_M12.find((l) => l.id === id) || null;
}

export default HUMANBODY_M12;
