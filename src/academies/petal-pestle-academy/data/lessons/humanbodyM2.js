// ---------------------------------------------------------------------------
// THE HUMAN BODY · MODULE 2 — SKIN, THE COVER
//
// Four lessons. Quarter 1, weeks 3 and 4. Tuesday and Thursday, 30 minutes.
//
// The doctor's action: DESCRIBE HOW A CUT CLOSES, IN STAGES. A doctor looking
// at a healing cut is reading time — how long ago, and how it is going. That is
// observation with a sequence attached, and it follows Module 1 exactly.
//
// ---- SAFETY, AND IT SHAPES LESSON 3 ----
//
// The healing lesson is about a cut she ALREADY has or one that has already
// healed. Nothing here asks her to make a cut, look after one, or decide
// whether one is infected. No dosing, no self-treatment, and nothing that
// teaches her to diagnose herself or her family — a healing cut is watched and
// described, never judged.
//
// And nothing in this module is about how skin LOOKS. Not colour, not marks,
// not clear or spotty. Skin is taught here as a working organ — a barrier, a
// thermostat and a repair system — because that is what it is, and because the
// rule against appearance is absolute.
//
// Quarter 1 cap: 11 words a sentence.
// ---------------------------------------------------------------------------

// =========================================================== LESSON 1
const L1_CHECK_IN = {
  title: 'The biggest organ you own',
  text: 'Look at the back of your hand. Now look at your arm. It is all one thing.',
  question: 'Your skin covers all of you. What do you think it is FOR?'
};

const L1_BEATS = [
  {
    n: 1,
    label: 'Skin is an organ, and it is the largest one',
    hook: 'Your skin is one organ, and it weighs more than your brain.',
    teachingText:
      'An organ is a body part with a job. Your heart is one. Your skin is one too. It is the biggest you have, and it covers every part of you.',
    example:
      'Your heart has a job — pumping. Your skin has a job as well. It is a wall.',
    applyIt: {
      prompt: 'Which of these is an organ?',
      choices: ['A bone', 'Your skin', 'A hair', 'A fingernail'],
      answer: 1,
      feedback: [
        'Bones are important and they are not organs.',
        null,
        'Hair grows out of skin. It is not the organ.',
        'The same — it grows out of skin.'
      ]
    }
  },
  {
    n: 2,
    label: 'A wall that keeps things out and water in',
    hook: 'You are mostly water, and your skin is why you do not dry out.',
    teachingText:
      'Skin keeps germs and dirt outside your body. It also keeps your water inside. Without it you would dry out like a leaf. It is doing both jobs all the time.',
    example:
      'Sit in a bath for an hour and you do not fill up with water. Your skin is holding the line.',
    applyIt: {
      prompt: 'Skin keeps water:',
      choices: ['Out of you', 'Inside you', 'Cold', 'Moving'],
      answer: 1,
      feedback: [
        'It does that too, and the bigger job is the other way.',
        null,
        'Temperature is a different job.',
        'Your blood does the moving.'
      ]
    }
  }
];

const L1_ACTIVITY = {
  title: 'The wall test',
  prep: 'A glass of water and a paper towel.',
  needs: ['a glass of water', 'a paper towel', 'her notebook'],
  steps: [
    'Put one finger in the water for ten seconds. Take it out.',
    'Now put a corner of the paper towel in for ten seconds.',
    'Write down what happened to each one.',
    'The towel soaked it up. Your finger did not. Write down why.',
    'Look at the back of your hand and find where skin folds at a knuckle.'
  ],
  safety: 'Plain cool water only. Nothing hot, and nothing on a cut.',
  minutes: 10
};

const L1_LEDGER = {
  prompt: 'Write one sentence about what would happen if you had no skin at all.',
  ifSheIsStuck:
    'Ask her what happened to the paper towel. Then ask what would happen to her if she worked like a paper towel. Wet, and full of everything she touched, are both right.'
};

// =========================================================== LESSON 2
const L2_CHECK_IN = {
  title: 'Wet on purpose',
  text: 'Think about the last time you were really hot. Your skin got damp.',
  question: 'Your body made you wet on purpose. Why would it do that?'
};

const L2_BEATS = [
  {
    n: 1,
    label: 'Sweat is your body cooling itself',
    hook: 'You have millions of tiny holes that let water out when you are hot.',
    teachingText:
      'When you get hot, your skin pushes water out through tiny holes. That water is sweat. As it dries off your skin, it takes heat away with it.',
    example:
      'Wet the back of your hand and blow on it. It feels cold. That is drying taking heat.',
    applyIt: {
      prompt: 'Sweat cools you down when it:',
      choices: ['Comes out', 'Dries off your skin', 'Tastes salty', 'Soaks your shirt'],
      answer: 1,
      feedback: [
        'Coming out is only half of it.',
        null,
        'Salt is in it and salt is not the cooling.',
        'That is a side effect.'
      ]
    }
  },
  {
    n: 2,
    label: 'Skin is a thermostat, both ways',
    hook: 'Goose bumps are your skin trying to keep you warm.',
    teachingText:
      'Skin works the other way too. When you are cold, tiny muscles pull each hair upright. That is a goose bump. It traps a thin layer of warm air near you.',
    example:
      'A bird fluffs up its feathers in the cold for the same reason. You are doing a smaller version.',
    applyIt: {
      prompt: 'Goose bumps happen when you are:',
      choices: ['Hot', 'Cold', 'Hungry', 'Running'],
      answer: 1,
      feedback: [
        'Then you sweat instead.',
        null,
        'Nothing to do with food.',
        'Running usually makes you hot.'
      ]
    }
  }
];

const L2_ACTIVITY = {
  title: 'Two hands, one warm and one cool',
  prep: 'A bowl of cool water and a towel.',
  needs: ['a bowl of cool water', 'a towel', 'her notebook', 'a timer'],
  steps: [
    'Wet ONE hand in the cool water. Dry the other on the towel.',
    'Hold both hands up and count to sixty.',
    'Write down which hand felt colder, and by how much.',
    'Now blow gently on the wet hand. Write what changed.',
    'Find a goose bump on your arm if you can, and draw one.'
  ],
  safety: 'Cool water, never cold. If it stops being comfortable, stop.',
  minutes: 12
};

const L2_LEDGER = {
  prompt: 'Write down why the wet hand felt colder than the dry one.',
  ifSheIsStuck:
    'Ask her where the water on that hand went. It dried. Ask what it took with it as it went. Heat is the answer, and "the cold" is close enough to build on.'
};

// =========================================================== LESSON 3
const L3_CHECK_IN = {
  title: 'A cut you already had',
  text: 'Think of a scrape you have had. It bled, then it stopped, then it went hard.',
  question: 'That happened in an order. Can you say the order out loud?'
};

const L3_BEATS = [
  {
    n: 1,
    label: 'Bleeding stops itself, and that is step one',
    hook: 'Your blood can turn solid on purpose, and only where it needs to.',
    teachingText:
      'A cut bleeds first. Then the blood at the cut goes sticky and plugs the hole. That plug hardens into a scab. The scab is a lid.',
    example:
      'The scab is doing the job your skin was doing. It is a temporary wall.',
    applyIt: {
      prompt: 'What is a scab actually for?',
      choices: [
        'To make it itch',
        'To cover the hole while skin rebuilds',
        'To stop it hurting',
        'To make a scar'
      ],
      answer: 1,
      feedback: [
        'Itching is a side effect.',
        null,
        'It does not really do that.',
        'A scar is what may come after.'
      ]
    }
  },
  {
    n: 2,
    label: 'Then new skin builds underneath',
    hook: 'The repair happens under the scab, where you cannot watch it.',
    teachingText:
      'Under the scab, new skin grows across the gap. When it has joined up, the scab is not needed. It comes off on its own. Picking it off early opens the wall again.',
    example:
      'Four stages: bleed, plug, scab, new skin. A doctor can guess the day from the stage.',
    applyIt: {
      prompt: 'Why should a scab be left alone?',
      choices: [
        'It is rude to pick',
        'The skin underneath is not finished',
        'It will grow back bigger',
        'It hurts more later'
      ],
      answer: 1,
      feedback: [
        'True, and not the reason.',
        null,
        'Scabs do not grow.',
        'Maybe, and that is not the reason either.'
      ]
    }
  }
];

const L3_ACTIVITY = {
  title: 'Read the stage, like a doctor',
  prep: 'Nothing. Use a mark that has ALREADY healed or is healing.',
  needs: ['her notebook', 'a pencil', 'a ruler if she has one'],
  steps: [
    'Find an old scrape or scar on you or on a willing grown-up.',
    'Draw it. Write down which of the four stages it is at.',
    'Ask the grown-up how long ago it happened. Write that down too.',
    'Draw the four stages in order, as four small boxes.',
    'Under each box, write one word for what is happening.'
  ],
  safety:
    'Look only. Do not touch, pick, clean or cover anybody’s cut, and do not use a fresh one. If a cut is new, sore or open, that is a grown-up’s job and a doctor’s — not this activity’s.',
  minutes: 12
};

const L3_LEDGER = {
  prompt: 'Write the four stages of healing in order, in your own words.',
  ifSheIsStuck:
    'Ask her what happened first, and then keep asking "and then?". She will get four steps out without needing the word for any of them.'
};

// =========================================================== LESSON 4
const L4_CHECK_IN = {
  title: 'Bath fingers',
  text: 'Stay in the bath a long time and your fingertips go wrinkly. Only fingers and toes.',
  question: 'Why do you think it happens there and nowhere else?'
};

const L4_BEATS = [
  {
    n: 1,
    label: 'Wrinkling is not your skin giving up',
    hook: 'Wrinkly bath fingers are switched ON by your body, not done to it.',
    teachingText:
      'For a long time people thought skin soaked up water and swelled. It does not. Your body narrows tiny tubes under the skin and pulls it into ridges.',
    example:
      'It happens on fingers and toes only. Those are the parts you grip with.',
    applyIt: {
      prompt: 'Bath wrinkles are caused by:',
      choices: [
        'Skin soaking up water',
        'Your body pulling the skin into ridges',
        'The water being too hot',
        'Soap drying you out'
      ],
      answer: 1,
      feedback: [
        'That was the old idea, and it turned out to be wrong.',
        null,
        'It happens in cool water too.',
        'It happens with no soap at all.'
      ]
    }
  },
  {
    n: 2,
    label: 'A wrong idea can last a long time',
    hook: 'Being sure is not the same as being right, even for grown-ups.',
    teachingText:
      'The soaking idea sounded sensible, so nobody checked it for years. Then somebody tested it and it failed. That is how science fixes itself.',
    example:
      'The test was simple. Wrinkles need working nerves — and with nerves damaged, the skin sits in water and stays smooth.',
    applyIt: {
      prompt: 'How was the old idea found to be wrong?',
      choices: [
        'Somebody argued better',
        'Somebody tested it',
        'It went out of fashion',
        'A doctor said so'
      ],
      answer: 1,
      feedback: [
        'Arguing does not settle it.',
        null,
        'Ideas are not clothes.',
        'Saying so is not showing so.'
      ]
    }
  }
];

const L4_ACTIVITY = {
  title: 'Ten minutes and a drawing',
  prep: 'A bowl of warm water, and ten minutes she can spare.',
  needs: ['a bowl of warm water', 'her notebook', 'a timer'],
  steps: [
    'Draw one fingertip before you start. Look closely.',
    'Put that hand in the water. Set the timer for ten minutes.',
    'Take it out and draw the same fingertip again.',
    'Put the two drawings side by side. Write down three differences.',
    'Check your elbow. Write down whether it wrinkled too, and why not.'
  ],
  safety: 'Warm, never hot. Test it with a grown-up first. Stop if it stings.',
  minutes: 14
};

const L4_LEDGER = {
  prompt: 'Write about a time you were sure of something and then found out you were wrong.',
  ifSheIsStuck:
    'Tell her one of yours first. Being wrong out loud, from a grown-up, is what makes the question safe to answer honestly.'
};

// ---------------------------------------------------------------------------

export const HUMANBODY_M2 = [
  {
    id: 'body-m2-01',
    course: 'humanbody',
    module: 2,
    quarter: 1,
    week: 3,
    day: 1,
    n: 1,
    title: 'The organ you can see',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Skin is the largest organ, and its job is to keep things out and water in.',
    standards: [],
    offGrade: null,
    words: ['organ', 'barrier', 'waterproof'],
    glossary: [
      { word: 'organ', plain: 'A body part with a job of its own.' },
      { word: 'barrier', plain: 'Something that stops things getting through.' },
      { word: 'waterproof', plain: 'Water cannot soak through it.' }
    ],
    video: {
      id: 'yCWclrhsPQ8',
      url: 'https://www.youtube.com/watch?v=yCWclrhsPQ8',
      title: 'How Your Skin Works? - The Dr. Binocs Show | Best Learning Videos For Kids | Peekaboo Kidz',
      channel: 'Peekaboo Kidz',
      minutes: 5,
      verified: '2026-08-18 · youtube.com/oembed · length read from the duration badge',
      teaches: ['skin as an organ', 'its layers', 'what skin keeps out and keeps in'],
      sourceGap:
        'OPEN. Searched: "SciShow Kids OR Learn Bright skin layers what does skin do for kids video goosebumps" — returned KidsHealth, Ducksters, Dr. Binocs and Operation Ouch, no Black-educator-led channel. The two standing searches for Black American educators in this course are written down in full on body-m1-01.'
    },
    checkIn: L1_CHECK_IN,
    beats: L1_BEATS,
    activity: L1_ACTIVITY,
    ledger: L1_LEDGER,
    hook: L1_CHECK_IN,
    core: L1_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L1_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What makes skin an organ?', answer: 'It is a body part with a job.', why: 'Same test as the heart.' },
      { ask: 'Name its two big jobs.', answer: 'Keeps things out, keeps water in.', why: 'Both, all the time.' }
    ],
    check: [
      {
        prompt: 'Your largest organ is your:',
        choices: ['Heart', 'Brain', 'Skin', 'Stomach'],
        answer: 2,
        feedback: ['About the size of your fist.', 'Smaller than your skin.', null, 'Much smaller.']
      },
      {
        prompt: 'Skin stops which of these getting in?',
        choices: ['Germs and dirt', 'Sunlight', 'Sound', 'Cold air'],
        answer: 0,
        feedback: [null, 'Some gets through.', 'Sound goes straight past.', 'You still feel cold.']
      },
      {
        prompt: 'In the bath you do not fill up with water because:',
        choices: ['The water is warm', 'Your skin holds it out', 'You are holding your breath', 'Baths are shallow'],
        answer: 1,
        feedback: ['Temperature is not it.', null, 'Nothing to do with breathing.', 'Depth is not it either.']
      }
    ]
  },
  {
    id: 'body-m2-02',
    course: 'humanbody',
    module: 2,
    quarter: 1,
    week: 3,
    day: 2,
    n: 2,
    title: 'Sweat, and goose bumps',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Skin controls temperature both ways — sweat cools by drying, goose bumps trap warm air.',
    standards: [],
    offGrade: null,
    words: ['sweat', 'cool', 'trap'],
    glossary: [
      { word: 'sweat', plain: 'Water your skin pushes out when you are hot.' },
      { word: 'cool', plain: 'To take heat away from something.' },
      { word: 'trap', plain: 'To hold something in one place so it cannot leave.' }
    ],
    video: {
      id: 'c2_aN98p0RM',
      url: 'https://www.youtube.com/watch?v=c2_aN98p0RM',
      title: 'Why Do We Sweat? | Sports Science | SciShow Kids',
      channel: 'SciShow Kids',
      minutes: 4,
      verified: '2026-08-18 · youtube.com/oembed · length read from the duration badge',
      teaches: ['why sweating cools the body', 'that drying is what does the cooling', 'that other animals cool differently'],
      sourceGap: 'OPEN. Same searches as body-m2-01 and body-m1-01, both written down there.'
    },
    checkIn: L2_CHECK_IN,
    beats: L2_BEATS,
    activity: L2_ACTIVITY,
    ledger: L2_LEDGER,
    hook: L2_CHECK_IN,
    core: L2_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L2_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'When does sweat cool you?', answer: 'As it dries off your skin.', why: 'Drying is what carries heat away.' },
      { ask: 'What is a goose bump doing?', answer: 'Trapping warm air near you.', why: 'A tiny muscle pulls each hair up.' }
    ],
    check: [
      {
        prompt: 'Sweat cools you at the moment it:',
        choices: ['Appears', 'Dries', 'Drips', 'Tastes salty'],
        answer: 1,
        feedback: ['Appearing is only the start.', null, 'Dripping wastes it.', 'Salt does no cooling.']
      },
      {
        prompt: 'Goose bumps are made by:',
        choices: ['Tiny muscles pulling hairs up', 'Cold water', 'Sweat freezing', 'Your heart'],
        answer: 0,
        feedback: [null, 'They happen dry too.', 'Sweat does not freeze on you.', 'Not its job.']
      },
      {
        prompt: 'Your skin controls temperature:',
        choices: ['Only when hot', 'Only when cold', 'Both ways', 'Never'],
        answer: 2,
        feedback: ['Goose bumps say otherwise.', 'Sweat says otherwise.', null, 'It does it all day.']
      }
    ]
  },
  {
    id: 'body-m2-03',
    course: 'humanbody',
    module: 2,
    quarter: 1,
    week: 4,
    day: 1,
    n: 3,
    title: 'How a cut closes',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Healing runs in four stages — bleed, plug, scab, new skin — and the stage tells you roughly when.',
    standards: [],
    offGrade: null,
    words: ['scab', 'stage', 'repair'],
    glossary: [
      { word: 'scab', plain: 'The hard lid that forms over a cut.' },
      { word: 'stage', plain: 'One step of something that happens in order.' },
      { word: 'repair', plain: 'To mend something that was damaged.' }
    ],
    video: {
      id: 'cLEdznnTT8s',
      url: 'https://www.youtube.com/watch?v=cLEdznnTT8s',
      title: 'How Do Cuts Heal?',
      channel: 'SciShow Kids',
      minutes: 3,
      verified: '2026-08-18 · youtube.com/oembed · length read from the duration badge',
      teaches: ['what happens when skin is cut', 'why a scab forms', 'how the parts of the body work together to heal'],
      sourceGap:
        'OPEN. ⚠️ AND A REJECTION WORTH RECORDING: a search offered id BbiY-W4dHac as "How Do Cuts Heal?" by SciShow Kids. oEmbed returned "How Does a Cut Heal? | WebMD", by WEBMD — different title, different publisher, different id. A search result can be stale; oEmbed cannot. WebMD is excluded on principle for this course: it is a consumer medical-information site, not a children’s educational publisher, and this course carries an absolute rule that nothing may teach her to diagnose herself or her family.'
    },
    checkIn: L3_CHECK_IN,
    beats: L3_BEATS,
    activity: L3_ACTIVITY,
    ledger: L3_LEDGER,
    hook: L3_CHECK_IN,
    core: L3_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L3_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What is a scab for?', answer: 'A lid, while new skin builds.', why: 'It does skin’s job for a few days.' },
      { ask: 'Name the four stages.', answer: 'Bleed, plug, scab, new skin.', why: 'Always that order.' }
    ],
    check: [
      {
        prompt: 'The first thing that happens to a cut is:',
        choices: ['A scab forms', 'It bleeds', 'New skin grows', 'It itches'],
        answer: 1,
        feedback: ['That comes third.', null, 'That is last.', 'Later, and not a stage.']
      },
      {
        prompt: 'New skin grows:',
        choices: ['On top of the scab', 'Under the scab', 'Instead of a scab', 'Only if you help it'],
        answer: 1,
        feedback: ['The scab is the lid, not the floor.', null, 'The scab comes first.', 'It does it by itself.']
      },
      {
        prompt: 'A scab falls off when:',
        choices: [
          'You pick it',
          'It gets wet',
          'The skin underneath has joined up',
          'A week has passed'
        ],
        answer: 2,
        feedback: ['That opens it early.', 'Wet does not decide it.', null, 'It depends on the cut, not the calendar.']
      }
    ]
  },
  {
    id: 'body-m2-04',
    course: 'humanbody',
    module: 2,
    quarter: 1,
    week: 4,
    day: 2,
    n: 4,
    title: 'Why fingers wrinkle in water',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Bath wrinkles are switched on by the body, not soaked in — and the old explanation was tested and failed.',
    standards: [],
    offGrade: null,
    words: ['wrinkle', 'ridge', 'test'],
    glossary: [
      { word: 'wrinkle', plain: 'A small fold or line in something.' },
      { word: 'ridge', plain: 'A raised line, like the top of a tiny hill.' },
      { word: 'test', plain: 'To try something out to find whether it is true.' }
    ],
    video: {
      id: 'KpwoWtPaPPA',
      url: 'https://www.youtube.com/watch?v=KpwoWtPaPPA',
      title: 'Operation Ouch - Wrinkly Skin | Science for Kids',
      channel: 'Operation Ouch',
      minutes: 5,
      verified: '2026-08-18 · youtube.com/oembed · length read from the duration badge',
      teaches: ['why fingers wrinkle in water', 'that it is the body doing it on purpose', 'that the old soaking explanation is wrong'],
      sourceGap: 'OPEN. Same searches as body-m2-01 and body-m1-01, both written down there. Operation Ouch is a CBBC production.'
    },
    checkIn: L4_CHECK_IN,
    beats: L4_BEATS,
    activity: L4_ACTIVITY,
    ledger: L4_LEDGER,
    hook: L4_CHECK_IN,
    core: L4_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L4_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'Does skin soak up water in the bath?', answer: 'No. The body makes the ridges.', why: 'The old idea failed a test.' },
      { ask: 'Where does it happen?', answer: 'Fingers and toes only.', why: 'The parts you grip with.' }
    ],
    check: [
      {
        prompt: 'Bath wrinkles happen on your:',
        choices: ['Whole body', 'Fingers and toes', 'Elbows', 'Back'],
        answer: 1,
        feedback: ['Check your elbow next time.', null, 'Try it and see.', 'It stays smooth.']
      },
      {
        prompt: 'The old idea about wrinkles was:',
        choices: ['Right all along', 'That skin soaks up water', 'Never written down', 'About soap'],
        answer: 1,
        feedback: ['It was tested and failed.', null, 'It was taught for years.', 'Soap is not needed.']
      },
      {
        prompt: 'What settled it?',
        choices: ['A better argument', 'A test', 'A vote', 'Time passing'],
        answer: 1,
        feedback: ['Arguing does not settle it.', null, 'Science is not a vote.', 'Waiting proves nothing.']
      }
    ]
  }
];

export const HUMANBODY_M2_META = {
  courseId: 'humanbody',
  module: 2,
  title: 'Skin, the Cover',
  blurb:
    'The largest organ she owns — a wall that keeps water in, a thermostat that works both ways, and a repair system she can read the stages of.'
};

export function humanbodyM2LessonById(id) {
  return HUMANBODY_M2.find((l) => l.id === id) || null;
}

export default HUMANBODY_M2;
