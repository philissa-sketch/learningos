// ---------------------------------------------------------------------------
// THE HUMAN BODY · MODULE 8 — LISTENING TO A CHEST
//
// Four lessons. Quarter 2, weeks 7 and 8. The last module of Quarter 2; week 9
// is the quarter exam.
//
// The doctor's action, and it is the one the whole quarter has been building
// toward: LISTEN TO A CHEST. Module 5 gave her the pump, Module 6 the pipes,
// Module 7 the lungs. This module hands her the instrument and teaches her what
// the sounds are.
//
// ---- THE MODULE IS BUILT ROUND ONE PERSON ----
//
// Three of these four videos are Dr. Yama, a doctor who makes medical videos
// for children. That is deliberate. Azianna intends to be a doctor, and this is
// the module where she watches an actual doctor use an actual instrument and
// explain what she is hearing. Where every other module borrows a science
// channel, this one borrows a physician.
//
// ---- SAFETY, AND IT IS TIGHTER HERE THAN ANYWHERE ELSE ----
//
// A stethoscope is a listening tool, not a diagnostic one, and this module says
// so four times. She listens. She describes what she hears. She NEVER decides
// whether a sound is normal, and she is never asked to. Nothing here is about
// anybody being unwell. If a real worry comes up, the answer in every lesson is
// the same: tell a grown-up, and a doctor decides.
//
// Quarter 2 cap: 12 words a sentence.
// ---------------------------------------------------------------------------

// =========================================================== LESSON 1
const L1_CHECK_IN = {
  title: 'Press an ear against a chest',
  text: 'Ask a grown-up if you may put your ear on their back, between the shoulders.',
  question: 'You can hear something. Why is it clearer through their back than through the air?'
};

const L1_BEATS = [
  {
    n: 1,
    label: 'Sound travels better through solid things',
    hook: 'A sound you cannot hear across a room is loud through a body.',
    teachingText:
      'Sound spreads out and fades in air. Through something solid it stays together. That is why an ear on a chest hears a heart clearly.',
    example:
      'Put your ear on a table and tap the far end. It sounds much louder than through the air.',
    applyIt: {
      prompt: 'Sound travels best through:',
      choices: ['Empty air', 'Something solid', 'Nothing at all', 'Bright light'],
      answer: 1,
      feedback: [
        'It spreads out and fades.',
        null,
        'Sound needs something to travel through.',
        'Light is not sound.'
      ]
    }
  },
  {
    n: 2,
    label: 'A stethoscope is a funnel and a tube',
    hook: 'A stethoscope has no batteries. It is a shape, and that is all.',
    teachingText:
      'The round end catches the sound and gathers it. The tubes carry it to your ears without letting it spread out. Nothing is made louder by electricity.',
    example:
      'A cardboard tube against a chest does the same job, less well. The shape is what works.',
    applyIt: {
      prompt: 'A stethoscope works because of:',
      choices: ['Batteries', 'Its shape', 'A microphone', 'Magnets'],
      answer: 1,
      feedback: [
        'It has none.',
        null,
        'A plain one has no microphone.',
        'No magnets in it.'
      ]
    }
  }
];

const L1_ACTIVITY = {
  title: 'Build a stethoscope out of a tube',
  prep: 'A cardboard tube, or a funnel and some rubber tubing.',
  needs: ['a cardboard tube', 'a willing grown-up', 'her notebook'],
  steps: [
    'Hold the tube against a grown-up’s chest and put your ear to the other end.',
    'Write down what you can hear, in your own words.',
    'Now listen with your bare ear in the same spot. Write that down too.',
    'Try the tube on a wall, then on a table.',
    'Write one sentence about which surfaces carried sound best.'
  ],
  safety:
    'Always ask before you listen to anybody, and stop the moment they say so. This is about SOUND — nothing you hear tells you whether anybody is well or unwell.',
  minutes: 12
};

const L1_LEDGER = {
  prompt: 'Write why a stethoscope needs no batteries, in your own words.',
  ifSheIsStuck:
    'Ask what the round end does with the sound, and what the tubes stop it doing. Gathering and not spreading is the whole invention.'
};

// =========================================================== LESSON 2
const L2_CHECK_IN = {
  title: 'Two sounds, not one',
  text: 'Listen to a heart for a while. Count carefully.',
  question: 'People say a heart goes "thump". Is it really only one sound?'
};

const L2_BEATS = [
  {
    n: 1,
    label: 'A heartbeat is a pair of sounds',
    hook: 'One heartbeat makes two separate noises, close together.',
    teachingText:
      'A heartbeat is usually written as lub-dub. Those are two sounds, not one. They come from two sets of valves shutting at different moments.',
    example:
      'Say lub-dub out loud at your own pulse rate. The gap between the pair is short.',
    applyIt: {
      prompt: 'How many sounds are in one heartbeat?',
      choices: ['One', 'Two', 'Three', 'Four'],
      answer: 1,
      feedback: [
        'Listen again for the pair.',
        null,
        'Two is the usual answer.',
        'Two.'
      ]
    }
  },
  {
    n: 2,
    label: 'The sound is doors closing, not blood moving',
    hook: 'What you hear is not blood. It is valves.',
    teachingText:
      'You met valves in Module 5 — one-way doors between the rooms. The lub is one set shutting. The dub is the other set shutting.',
    example:
      'Blood moving is almost silent. The sound is the doors, exactly like a door in a house.',
    applyIt: {
      prompt: 'The lub-dub sound is made by:',
      choices: [
        'Blood rushing',
        'Valves shutting',
        'Muscles stretching',
        'Air moving'
      ],
      answer: 1,
      feedback: [
        'Moving blood is nearly silent.',
        null,
        'Muscles are quiet.',
        'No air in the heart.'
      ]
    }
  }
];

const L2_ACTIVITY = {
  title: 'Lub-dub, and a pulse at the same time',
  prep: 'A stethoscope if you have one, or the cardboard tube from Lesson 1.',
  needs: ['a tube or stethoscope', 'a grown-up', 'her notebook'],
  steps: [
    'Listen to a grown-up’s chest and find the lub-dub.',
    'Write down how you would describe the two sounds.',
    'Now put two fingers on their wrist to feel the pulse.',
    'Listen and feel at the same time. Write down whether they match.',
    'Write one sentence about what the lub and the dub actually are.'
  ],
  safety:
    'Ask first, every time. Listening only — you are describing sounds, not judging them. Nothing you hear says whether anybody is well.',
  minutes: 14
};

const L2_LEDGER = {
  prompt: 'Write what makes the lub and what makes the dub.',
  ifSheIsStuck:
    'Two sets of doors, shutting one after the other. She already knows what valves are — this is only naming their sound.'
};

// =========================================================== LESSON 3
const L3_CHECK_IN = {
  title: 'The other thing in there',
  text: 'Move the stethoscope up and out, onto the side of the back.',
  question: 'A different sound. Slower, and more like wind. What is making it?'
};

const L3_BEATS = [
  {
    n: 1,
    label: 'Lungs sound like moving air, because they are',
    hook: 'A heart clicks. A lung whooshes. They sound nothing alike.',
    teachingText:
      'Listening to lungs is listening to air moving through pipes. It is a soft rushing sound, in and then out, much slower than a heartbeat.',
    example:
      'Ask them to take a deep breath. The whoosh gets louder and longer.',
    applyIt: {
      prompt: 'Lung sounds are:',
      choices: ['Clicks', 'A soft rushing', 'Silent', 'Bangs'],
      answer: 1,
      feedback: [
        'That is nearer the heart.',
        null,
        'You can hear them clearly.',
        'Nothing bangs.'
      ]
    }
  },
  {
    n: 2,
    label: 'Which is why a doctor listens in several places',
    hook: 'A doctor moves the stethoscope around, and the moving is the method.',
    teachingText:
      'A doctor listens high and low, left and right, front and back. Different spots are nearer different parts. One spot is not the whole picture.',
    example:
      'Front and centre is nearest the heart. Out to the sides and on the back is nearest the lungs.',
    applyIt: {
      prompt: 'Why does a doctor listen in several places?',
      choices: [
        'To use up time',
        'Different spots are near different parts',
        'To warm the stethoscope',
        'Because one spot is broken'
      ],
      answer: 1,
      feedback: [
        'Time is not the reason.',
        null,
        'Warming is a kindness, not the reason.',
        'Nothing is broken.'
      ]
    }
  }
];

const L3_ACTIVITY = {
  title: 'Six spots, and a map',
  prep: 'A stethoscope or the tube. A willing grown-up who has agreed.',
  needs: ['a tube or stethoscope', 'a grown-up', 'paper', 'coloured pencils'],
  steps: [
    'Draw a simple outline of a chest and back on your paper.',
    'Listen at six places: high left, high right, low left, low right, and two on the back.',
    'At each spot write ONE word for what you heard.',
    'Mark heart sounds in red and lung sounds in blue.',
    'Write down which spot the heart was loudest at.'
  ],
  safety:
    'Ask before every single spot, and stop if they want to stop. You are MAPPING sounds, not checking anybody. What the sounds mean is a doctor’s job.',
  minutes: 14
};

const L3_LEDGER = {
  prompt: 'Write the difference between heart sounds and lung sounds.',
  ifSheIsStuck:
    'Fast and clicky, slow and whooshy. Her own words are better than the proper ones here, and they are just as correct.'
};

// =========================================================== LESSON 4
const L4_CHECK_IN = {
  title: 'What listening is actually for',
  text: 'A doctor listens for maybe thirty seconds. Then she takes the stethoscope off.',
  question: 'In that half minute, what do you think she was actually doing?'
};

const L4_BEATS = [
  {
    n: 1,
    label: 'She is collecting information, not deciding',
    hook: 'Listening is one step. It is never the whole answer on its own.',
    teachingText:
      'A doctor listens to gather information. She puts it with everything else — what she observed, what you told her, and what she measured.',
    example:
      'That is the Module 1 order again: observe, ask, measure. Listening is a measurement.',
    applyIt: {
      prompt: 'Listening to a chest is which of the three steps?',
      choices: ['Observing', 'Asking', 'Measuring', 'Treating'],
      answer: 2,
      feedback: [
        'That is looking.',
        'That is questions.',
        null,
        'That comes much later.'
      ]
    }
  },
  {
    n: 2,
    label: 'And years of practice are what make it mean anything',
    hook: 'Anybody can hear a heart. Knowing what it means takes years.',
    teachingText:
      'Hearing the sound is easy. Knowing which sounds matter takes long training. That is the difference between listening and diagnosing.',
    example:
      'You can describe exactly what you heard, and that is real and useful. What it means is not yours to say.',
    applyIt: {
      prompt: 'If you hear something you are unsure about, you should:',
      choices: [
        'Decide what it is',
        'Tell a grown-up',
        'Listen again until you know',
        'Write it in the record'
      ],
      answer: 1,
      feedback: [
        'That is not yours to decide.',
        null,
        'More listening will not tell you.',
        'Telling comes first.'
      ]
    }
  }
];

const L4_ACTIVITY = {
  title: 'Be the doctor at the door, again',
  prep: 'Her notebook from Module 1, Lesson 1.',
  needs: ['her notebook', 'a tube or stethoscope', 'a grown-up'],
  steps: [
    'Find your notes from the very first lesson of this course.',
    'Do the whole thing again with the same grown-up: observe, ask, measure.',
    'For MEASURE, use three things now — pulse, breaths, and listening.',
    'Write all of it down as one short report.',
    'At the bottom, write what a doctor would do with your report.'
  ],
  safety:
    'Ask before listening, every time. Your report DESCRIBES — it never decides. The last line is always the same: a doctor reads this, not you.',
  minutes: 14
};

const L4_LEDGER = {
  prompt: 'Write one thing you can do now that you could not do in Module 1.',
  ifSheIsStuck:
    'She could count a pulse in week one. She can now count breaths, measure a breath in millilitres, and listen to two organs. Any one of those is the answer.'
};

// ---------------------------------------------------------------------------

export const HUMANBODY_M8 = [
  {
    id: 'body-m8-01',
    course: 'humanbody',
    module: 8,
    quarter: 2,
    week: 7,
    day: 1,
    n: 1,
    title: 'How a stethoscope works',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Sound travels better through solids, and a stethoscope is a shape that gathers it and stops it spreading.',
    standards: [],
    offGrade: null,
    words: ['sound', 'gather', 'tube'],
    glossary: [
      { word: 'sound', plain: 'Something you hear. It travels through things.' },
      { word: 'gather', plain: 'To collect together into one place.' },
      { word: 'tube', plain: 'A long hollow pipe.' }
    ],
    video: {
      id: 'CUj2D7M0hbY',
      url: 'https://www.youtube.com/watch?v=CUj2D7M0hbY',
      title: 'Listen to heart sounds, play with a stethoscope - Dr. Yama Medical Educational videos for children',
      channel: 'Dr. Yama - Medical Educational Videos for Kids',
      minutes: 5,
      verified: '2026-08-18 · youtube.com/oembed · length read from the duration badge',
      teaches: ['what a stethoscope is', 'how to use one', 'what a heart sounds like through it'],
      sourceGap:
        'OPEN for a Black American educator. Searched: ""Happy Learning" the heart for kids video AND how a stethoscope works for children youtube" and ""Dr. Yama" medical educational videos for kids stethoscope lungs breathing heartbeat youtube" — no Black-educator-led channel found. ⭐ WORTH RECORDING SEPARATELY: Dr. Yama is a PHYSICIAN making medical videos for children, and three of this module’s four videos are hers. Azianna intends to be a doctor, and this is the module where she watches a real doctor use a real instrument. Identity is UNKNOWN and recorded as unknown, not as a gap closed.'
    },
    checkIn: L1_CHECK_IN,
    beats: L1_BEATS,
    activity: L1_ACTIVITY,
    ledger: L1_LEDGER,
    hook: L1_CHECK_IN,
    core: L1_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L1_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'Why is an ear on a chest clearer than across a room?', answer: 'Solids carry sound better.', why: 'In air it spreads and fades.' },
      { ask: 'What makes a stethoscope work?', answer: 'Its shape.', why: 'No batteries anywhere in it.' }
    ],
    check: [
      {
        prompt: 'Sound travels best through:',
        choices: ['Empty air', 'Something solid', 'Nothing at all', 'Bright light'],
        answer: 1,
        feedback: ['It spreads and fades.', null, 'Sound needs something.', 'Light is not sound.']
      },
      {
        prompt: 'A stethoscope works because of:',
        choices: ['Batteries', 'Its shape', 'A microphone', 'Magnets'],
        answer: 1,
        feedback: ['It has none.', null, 'A plain one has no microphone.', 'No magnets.']
      },
      {
        prompt: 'The round end of a stethoscope:',
        choices: ['Gathers the sound', 'Makes the sound', 'Warms the skin', 'Measures the pulse'],
        answer: 0,
        feedback: [null, 'The body makes it.', 'Warming is a kindness.', 'That is fingers.']
      }
    ]
  },
  {
    id: 'body-m8-02',
    course: 'humanbody',
    module: 8,
    quarter: 2,
    week: 7,
    day: 2,
    n: 2,
    title: 'Lub and dub',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'One heartbeat makes two sounds, and both are valves shutting rather than blood moving.',
    standards: [],
    offGrade: null,
    words: ['heartbeat', 'pair', 'shut'],
    glossary: [
      { word: 'heartbeat', plain: 'One full squeeze and rest of the heart.' },
      { word: 'pair', plain: 'Two things that go together.' },
      { word: 'shut', plain: 'To close.' }
    ],
    video: {
      id: 'aWuf6LlnAeM',
      url: 'https://www.youtube.com/watch?v=aWuf6LlnAeM',
      title: "Heart Anatomy, Cardiovascular system - Dr. Yama's Medical Educational Videos (inspired by Blippi)",
      channel: 'Dr. Yama - Medical Educational Videos for Kids',
      minutes: 5,
      verified: '2026-08-18 · youtube.com/oembed · length read from the duration badge',
      teaches: ['the parts of the heart', 'what the valves do', 'why a heartbeat sounds the way it does'],
      sourceGap: 'OPEN. Same searches as body-m8-01 and body-m1-01, both written down there.'
    },
    checkIn: L2_CHECK_IN,
    beats: L2_BEATS,
    activity: L2_ACTIVITY,
    ledger: L2_LEDGER,
    hook: L2_CHECK_IN,
    core: L2_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L2_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'How many sounds in one heartbeat?', answer: 'Two — lub and dub.', why: 'Two sets of valves.' },
      { ask: 'What makes the sound?', answer: 'Valves shutting.', why: 'Moving blood is nearly silent.' }
    ],
    check: [
      {
        prompt: 'One heartbeat makes how many sounds?',
        choices: ['One', 'Two', 'Three', 'Four'],
        answer: 1,
        feedback: ['Listen for the pair.', null, 'Two is the usual answer.', 'Two.']
      },
      {
        prompt: 'The lub-dub is made by:',
        choices: ['Blood rushing', 'Valves shutting', 'Muscles stretching', 'Air moving'],
        answer: 1,
        feedback: ['Nearly silent.', null, 'Muscles are quiet.', 'No air in the heart.']
      },
      {
        prompt: 'Valves were first met in:',
        choices: ['Module 5, the heart', 'Module 2, the skin', 'Module 3, bones', 'Module 7, lungs'],
        answer: 0,
        feedback: [null, 'That was healing.', 'That was joints.', 'That was the diaphragm.']
      }
    ]
  },
  {
    id: 'body-m8-03',
    course: 'humanbody',
    module: 8,
    quarter: 2,
    week: 8,
    day: 1,
    n: 3,
    title: 'Listening to lungs, and why the spot matters',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Lung sounds are moving air, and a doctor listens in several places because each is nearest a different part.',
    standards: [],
    offGrade: null,
    words: ['rushing', 'spot', 'map'],
    glossary: [
      { word: 'rushing', plain: 'A soft sound like wind moving.' },
      { word: 'spot', plain: 'One particular place.' },
      { word: 'map', plain: 'A drawing showing where things are.' }
    ],
    video: {
      id: 'GOc8FrwoH20',
      url: 'https://www.youtube.com/watch?v=GOc8FrwoH20',
      title: 'Introducing Dr. Yama - A doctor who loves to teach kids about medicine',
      channel: 'Dr. Yama - Medical Educational Videos for Kids',
      minutes: 5,
      verified: '2026-08-18 · youtube.com/oembed · length read from the duration badge',
      teaches: ['what a doctor does day to day', 'the instruments a doctor uses', 'that medicine is something a child can aim at'],
      sourceGap:
        'OPEN. Same searches as body-m8-01 and body-m1-01. ⚠️ AND AN HONEST NOTE ON FIT: this video is an INTRODUCTION to the doctor rather than a lesson on lung sounds specifically. It was kept because the module is about what a doctor does with an instrument, and because Azianna intends to be one — but the ACTIVITY is what teaches this lesson: she maps six listening spots on a real chest. If a children’s video on lung sounds specifically turns up, this is the one to replace.'
    },
    checkIn: L3_CHECK_IN,
    beats: L3_BEATS,
    activity: L3_ACTIVITY,
    ledger: L3_LEDGER,
    hook: L3_CHECK_IN,
    core: L3_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L3_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What do lungs sound like?', answer: 'A soft rushing, in and out.', why: 'It is air moving through pipes.' },
      { ask: 'Why listen in several places?', answer: 'Each spot is near a different part.', why: 'One spot is not the picture.' }
    ],
    check: [
      {
        prompt: 'Lung sounds are:',
        choices: ['Clicks', 'A soft rushing', 'Silent', 'Bangs'],
        answer: 1,
        feedback: ['Nearer the heart.', null, 'You can hear them.', 'Nothing bangs.']
      },
      {
        prompt: 'A doctor listens in several places because:',
        choices: ['To use up time', 'Different spots are near different parts', 'To warm it', 'One spot is broken'],
        answer: 1,
        feedback: ['Time is not it.', null, 'A kindness, not the reason.', 'Nothing is broken.']
      },
      {
        prompt: 'Compared with a heartbeat, lung sounds are:',
        choices: ['Faster', 'Slower', 'The same speed', 'Not there'],
        answer: 1,
        feedback: ['Breaths are slower than beats.', null, 'Count both and see.', 'They are there.']
      }
    ]
  },
  {
    id: 'body-m8-04',
    course: 'humanbody',
    module: 8,
    quarter: 2,
    week: 8,
    day: 2,
    n: 4,
    title: 'What listening is for',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Listening is a measurement that feeds a doctor’s picture — hearing a sound and knowing what it means are different skills.',
    standards: [],
    offGrade: null,
    words: ['information', 'training', 'report'],
    glossary: [
      { word: 'information', plain: 'Facts you have found out.' },
      { word: 'training', plain: 'Learning to do something properly, over a long time.' },
      { word: 'report', plain: 'A short written account of what you found.' }
    ],
    video: {
      id: 'YDY6xyZVvDw',
      url: 'https://www.youtube.com/watch?v=YDY6xyZVvDw',
      title: 'ASMR Heart and Lung Medical Checkup | Temperature, Breathing, Stethoscope Examination',
      channel: 'Dr. Yama - Medical Educational Videos for Kids',
      minutes: 23,
      verified: '2026-08-18 · youtube.com/oembed · length read from the duration badge',
      teaches: ['a full check-up from start to finish', 'temperature, breathing and listening in order', 'what a doctor does with each measurement'],
      sourceGap:
        'OPEN. Same searches as body-m8-01 and body-m1-01. ⚠️ LENGTH: 23 minutes, and it is a slow, quiet, complete examination rather than a compilation — which is exactly why it fits the last lesson of the quarter, where she repeats Module 1’s whole routine with three measurements instead of one. Gigi’s call, Aug 17: the full videos stay. It will need more than one sitting, or the Friday.'
    },
    checkIn: L4_CHECK_IN,
    beats: L4_BEATS,
    activity: L4_ACTIVITY,
    ledger: L4_LEDGER,
    hook: L4_CHECK_IN,
    core: L4_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L4_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'Listening is which of the three steps?', answer: 'Measuring.', why: 'Observe, ask, measure — Module 1.' },
      { ask: 'If you hear something you are unsure about?', answer: 'Tell a grown-up.', why: 'Deciding is not yours to do.' }
    ],
    check: [
      {
        prompt: 'Listening to a chest is which step?',
        choices: ['Observing', 'Asking', 'Measuring', 'Treating'],
        answer: 2,
        feedback: ['That is looking.', 'That is questions.', null, 'Much later.']
      },
      {
        prompt: 'Hearing a heart sound and knowing what it means are:',
        choices: ['The same skill', 'Different skills', 'Both easy', 'Both impossible'],
        answer: 1,
        feedback: ['Hearing is the easy half.', null, 'One takes years.', 'Both are possible.']
      },
      {
        prompt: 'If you hear something you are unsure about, you should:',
        choices: ['Decide what it is', 'Tell a grown-up', 'Listen until you know', 'Write it in a record'],
        answer: 1,
        feedback: ['Not yours to decide.', null, 'More listening will not tell you.', 'Telling comes first.']
      }
    ]
  }
];

export const HUMANBODY_M8_META = {
  courseId: 'humanbody',
  module: 8,
  title: 'Listening to a Chest',
  blurb:
    'The instrument the whole quarter was building toward — how a stethoscope works, the two sounds of a heartbeat, the rushing of lungs, and what listening is actually for.'
};

export function humanbodyM8LessonById(id) {
  return HUMANBODY_M8.find((l) => l.id === id) || null;
}

export default HUMANBODY_M8;
