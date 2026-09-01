// ---------------------------------------------------------------------------
// THE SCIENCE LAB — MODULE 5, QUARTER 3, WEEKS 1-2
// SOUND IN THE GREENHOUSE
//
// Georgia S4P2a — "Plan and carry out an investigation utilizing everyday
// objects to produce sound and predict the effects of changing the strength or
// speed of vibrations."
// Georgia S4P2b — "Design and construct a device to communicate across a
// distance using light and/or sound."
//
// ---- "STRENGTH OR SPEED" IS WHY THERE ARE TWO LESSONS, NOT ONE ----
//
// Georgia names two things and they are the single most-merged pair in
// elementary sound. A child who believes "high" means "loud" gets questions
// wrong in both directions and nobody notices, because she can still say the
// word "vibration" when asked.
//
// So Lesson 26 is loudness and nothing else, Lesson 27 is pitch and nothing
// else, and each has its own experiment. Part of Lesson 27's bank exists purely
// to catch the merge.
//
// ---- QUARTER 3 READS HARDER ON PURPOSE ----
//
// The reading ramp set at v3.9 gives Q3 a cap of 14 words a sentence AND A
// FLOOR OF 6.5. The floor is the part that matters: by January she has had a
// year of instruction, and writing her at September's level in March holds her
// back and starts to feel babyish. check-assessment fails in BOTH directions.
//
// ---- THE SETTING ----
//
// A greenhouse is a good room for sound. It is hard-walled and it rings. The
// bench, the glass, a row of pots, a hose reel and a handful of rubber bands
// are every instrument this module needs, and none of it costs anything.
//
// Safety here is quiet rather than sharp: nothing loud near an ear, and the
// string telephone is string, never wire.
// ---------------------------------------------------------------------------

// ====================================================== LESSON 25 · VIBRATION
const L25_CHECK_IN = {
  title: 'Put your fingers on your throat and hum',
  text: 'Rest two fingers lightly on the front of your throat. Now hum a long note, then stop, then hum again.',
  question: 'You felt something under your fingers while the sound was there. What was it doing?'
};

const L25_BEATS = [
  {
    n: 1,
    label: 'Every sound is something shaking',
    hook: 'There has never been a sound in the history of the world that was not something shaking.',
    teachingText:
      'A sound is made when something vibrates, which means it shakes very fast, back and forth. Stop the shaking and the sound stops at exactly the same moment.',
    example:
      'Pluck a rubber band stretched over a pot and you can see it blur as it shakes. Put a finger on it and the blur and the sound stop together.',
    applyIt: {
      prompt: 'She stops the ringing rubber band with one finger. The sound then:',
      choices: ['Carries on for a while', 'Stops at the same moment', 'Gets higher', 'Gets louder'],
      answer: 1,
      feedback: ['The shaking stopped, so the sound stopped.', null, 'Stopping it does not change the note.', 'Stopping it adds nothing.'],
      why: 'No shaking, no sound. They arrive and leave together.'
    }
  },
  {
    n: 2,
    label: 'You can see a vibration if you make it big enough',
    hook: 'Most vibrations are far too fast and too small to watch, so scientists make them show up another way.',
    teachingText:
      'Sprinkle something light on a surface that is about to vibrate and the grains jump. They are being thrown about by a shaking she cannot see on its own.',
    example:
      'Stretch cling film over a bowl, sprinkle a few grains of salt on it, and bang a tray beside it. The salt hops without anything touching it.',
    applyIt: {
      prompt: 'The salt grains hop when she bangs a tray nearby. That is because:',
      choices: ['The salt heard the noise', 'Her breath blew them upward', 'The film under them was vibrating', 'Salt is very light'],
      answer: 2,
      feedback: ['Salt has no ears.', 'She did not blow on it.', null, 'Light things still need something to move them.'],
      why: 'The sound made the film shake, and the shaking threw the salt into the air.'
    }
  }
];

const L25_ACTIVITY = {
  title: 'Four ways to see a sound',
  prep: 'Nothing to buy. Cling film, a bowl, salt and a rubber band will do all four.',
  needs: ['a bowl', 'cling film', 'a few grains of salt or dry rice', 'a metal tray', 'a rubber band', 'her notebook'],
  steps: [
    'Fingers on your throat. Hum, stop, hum. Write down what you felt.',
    'Stretch a rubber band between two fingers and pluck it. Watch it blur.',
    'Stretch cling film tightly over the bowl and sprinkle a few salt grains on top.',
    'Bang the metal tray close to the bowl, without touching it. Watch the salt.',
    'Now bang it further away. Do the grains still jump?',
    'Write one sentence that is true of all four things you just did.'
  ],
  safety: 'Nothing banged close to an ear. The tray is loud — hold it at arm’s length and away from faces.',
  minutes: 12
};

const L25_LEDGER = {
  prompt: 'Four sounds, and the one thing all four had in common. Write the common thing last, in your own words.',
  ifSheIsStuck: 'Ask her what was moving each time. Her throat, the band, the film, the tray. Every one was shaking.'
};

// ================================================== LESSON 26 · LOUD AND SOFT
const L26_CHECK_IN = {
  title: 'Pluck it gently, then pluck it hard',
  text: 'Stretch a rubber band over an open pot. Pluck it as gently as you can, then pluck it as hard as you dare.',
  question: 'The band did not change and neither did its length. So what did you change?'
};

const L26_BEATS = [
  {
    n: 1,
    label: 'Loudness is how BIG the shake is',
    hook: 'Plucking harder does not make the band move faster. It makes it move further.',
    teachingText:
      'How loud a sound is depends on how far the thing swings as it vibrates. A big swing carries more energy to her ear, and her ear reads that as loud. Scientists call the size of that swing the amplitude.',
    example:
      'A gently plucked band barely blurs and is barely heard. The same band plucked hard swings wide and can be heard across the greenhouse.',
    applyIt: {
      prompt: 'To make the same rubber band louder without changing anything else, she should:',
      choices: ['Pluck it harder so it swings further', 'Shorten it', 'Tighten it', 'Pluck it more often'],
      answer: 0,
      feedback: [null, 'That changes the note, not the loudness.', 'That changes the note too.', 'That gives more sounds, not a louder one.'],
      why: 'A bigger swing is a louder sound. That swing is the amplitude.'
    }
  },
  {
    n: 2,
    label: 'Loud fades with distance, and the shake is why',
    hook: 'The same sound is loud at the bench and faint at the greenhouse door, and nothing about the sound changed.',
    teachingText:
      'A vibration spreads out in every direction as it travels. The further it goes, the more thinly it is spread, so less of it reaches any one ear. That is why walking away makes a sound quieter without making it lower.',
    example:
      'Stand beside the bowl of hopping salt and it is loud. Stand at the door and it is faint. The tray was banged the same way both times.',
    applyIt: {
      prompt: 'She walks to the far end of the garden while the same bell rings. It now sounds:',
      choices: ['Lower', 'Higher', 'Quieter', 'Faster'],
      answer: 2,
      feedback: ['Distance does not change the note.', 'It does not raise it either.', null, 'The bell rings at the same speed.'],
      why: 'The shaking spreads out, so less of it reaches her. Quieter, not lower.'
    }
  }
];

const L26_ACTIVITY = {
  title: 'The loudness ladder',
  prep: 'One rubber band, one pot, and somewhere with room to walk away.',
  needs: ['a rubber band', 'an open pot or tin', 'salt and cling film from Lesson 25', 'a tape measure', 'her notebook'],
  steps: [
    'Stretch the band over the pot. Pluck it as gently as you can and write down what you heard.',
    'Pluck it a bit harder. Then harder again. Give each one a number from 1 to 5 for loudness.',
    'Now watch the band each time. Does it swing further when it is louder?',
    'Put the salt-on-film bowl beside it and pluck gently, then hard. Which pluck moved more salt?',
    'Now have a grown-up pluck it hard while you walk away, stopping every three steps.',
    'Write down at how many steps you could only just hear it.',
    'Answer this in the notebook: did the sound get LOWER as you walked away, or only quieter?'
  ],
  safety: 'Nothing plucked or banged close to an ear. Walk away on a clear path, looking where you are going.',
  minutes: 14
};

const L26_LEDGER = {
  prompt: 'What you changed to make it louder, and what you did NOT change. Both halves matter.',
  ifSheIsStuck: 'She changed how far she pulled the band back. She did not change its length, its tightness, or the band itself.'
};

// ================================================== LESSON 27 · HIGH AND LOW
const L27_CHECK_IN = {
  title: 'Same band, two different notes',
  text: 'Stretch a rubber band between your fingers and pluck it. Now stretch it tighter and pluck it again, just as gently.',
  question: 'You plucked with the same gentleness both times. So why did the note change?'
};

const L27_BEATS = [
  {
    n: 1,
    label: 'Pitch is how FAST the shake is',
    hook: 'Loudness and pitch are two different things, and almost everybody mixes them up at first.',
    teachingText:
      'How high or low a sound is depends on how many times a second the thing vibrates. Fast shaking makes a high note. Slow shaking makes a low note. That is called the pitch, and it has nothing at all to do with loudness.',
    example:
      'A tight, short band shakes fast and sings high. A loose, long band shakes slowly and hums low. Either one can be plucked gently or hard.',
    applyIt: {
      prompt: 'A band is tightened and then plucked just as gently as before. The note is:',
      choices: ['Louder', 'Softer', 'Lower', 'Higher'],
      answer: 3,
      feedback: ['She plucked it with the same gentleness.', 'She plucked it with the same gentleness.', 'Tighter shakes faster, not slower.', null],
      why: 'Tighter means faster shaking, and faster shaking means a higher note.'
    }
  },
  {
    n: 2,
    label: 'Three things change the pitch, and none of them is how hard you pluck',
    hook: 'Every stringed instrument in the world uses the same three tricks.',
    teachingText:
      'A string sings higher if it is shorter, if it is tighter, or if it is thinner. It sings lower if it is longer, looser, or thicker. How hard she plucks changes the loudness and leaves the pitch alone.',
    example:
      'The thin bands in the box sing higher than the fat ones at the same length, and pressing a band halfway along makes it jump up a note.',
    applyIt: {
      prompt: 'She wants a lower note from the same rubber band, so she makes it:',
      choices: ['Longer', 'Tighter', 'Thinner', 'Plucked more gently'],
      answer: 0,
      feedback: [null, 'Tighter goes higher.', 'Thinner goes higher.', 'That changes the loudness, not the note.'],
      why: 'Longer, looser and thicker all shake more slowly, and slower is lower.'
    }
  }
];

const L27_ACTIVITY = {
  title: 'A greenhouse instrument, tuned',
  prep: 'Collect rubber bands of several thicknesses. An open box or tin is the body.',
  needs: ['rubber bands of different thicknesses', 'an open box or tin', 'a row of jars', 'water', 'her notebook'],
  steps: [
    'Stretch three bands of different thicknesses over the box. Pluck each one gently.',
    'Write them in order from lowest note to highest. Which was thickest?',
    'Now take one band and press it halfway along, then pluck the short side. Higher or lower?',
    'Fill five jars with different amounts of water. Tap each one gently with a spoon.',
    'Put those five in order from lowest to highest too.',
    'Now play one note LOUDLY and the same note SOFTLY. Did the pitch move at all?',
    'Write down the answer to that last question. It is the whole point of the lesson.'
  ],
  safety: 'Tap the jars gently — a spoon can crack glass. Jars stay in the middle of the bench, away from the edge.',
  minutes: 14
};

const L27_LEDGER = {
  prompt: 'Your three bands in order, and the three things that change a note. Then say what does NOT change it.',
  ifSheIsStuck: 'Length, tightness and thickness change the note. How hard she plucks does not — that only changes how loud it is.'
};

// ============================================ LESSON 28 · SOUND NEEDS A ROAD
const L28_CHECK_IN = {
  title: 'Scratch the far end of the bench',
  text: 'Put your ear flat on the potting bench while a grown-up scratches the wood at the other end. Now lift your head and listen to the same scratching through the air.',
  question: 'Same scratch, two ways of listening. Which was clearer, and what did the sound travel through each time?'
};

const L28_BEATS = [
  {
    n: 1,
    label: 'A vibration has to have something to pass along',
    hook: 'Sound cannot cross an empty room the way light can. It needs stuff to shove.',
    teachingText:
      'A vibration works by pushing the thing next to it, which pushes the thing next to that. Air can do this, and so can water, and so can wood and glass and string. Where there is nothing at all, sound simply cannot go.',
    example:
      'The scratch reaches her through the bench and through the air. It travels through the wood better, because the wood is packed together tightly.',
    applyIt: {
      prompt: 'Sound travels best through which of these?',
      choices: ['Empty space', 'Air', 'Something solid like wood', 'Nothing can carry it'],
      answer: 2,
      feedback: ['There is nothing there to pass it along.', 'Air works, but not as well as wood.', null, 'Air, water and wood all carry it.'],
      why: 'The more tightly packed the stuff, the better it passes a shake along.'
    }
  },
  {
    n: 2,
    label: 'This is why space is silent',
    hook: 'There is no air between the planets, so the loudest explosion out there would reach her as nothing at all.',
    teachingText:
      'In films, spaceships roar. In real space there is almost nothing to pass a vibration along, so there is no sound to hear. Light crosses it perfectly well, which is why she can see stars and never hear one.',
    example:
      'A bell ringing inside a jar with the air pumped out can still be seen swinging and cannot be heard at all.',
    applyIt: {
      prompt: 'Two astronauts float side by side in space and shout. They hear:',
      choices: ['Each other clearly', 'A faint echo', 'Nothing at all', 'Only the high notes'],
      answer: 2,
      feedback: ['There is nothing between them to carry it.', 'An echo needs a road too.', null, 'No note gets through, high or low.'],
      why: 'No stuff, no road. Sound cannot cross emptiness.'
    }
  }
];

const L28_ACTIVITY = {
  title: 'Three roads for one sound',
  prep: 'A bowl of water, the potting bench, and a spoon.',
  needs: ['a large bowl of water', 'two spoons', 'the potting bench', 'her notebook'],
  steps: [
    'Tap two spoons together in the air and listen. Give it a clearness score from 1 to 5.',
    'Ear flat on the bench, grown-up scratching the far end. Score that too.',
    'Now the water: hold the bowl still, put your ear against the outside of it, and have a grown-up tap the spoons under the water.',
    'Score that one as well.',
    'Put the three roads in order, best to worst.',
    'Write down which was best, and what all three had that empty space does not.'
  ],
  safety: 'Ears go against the bowl, never into the water. A grown-up does the tapping under the water. Wipe up spills straight away.',
  minutes: 14
};

const L28_LEDGER = {
  prompt: 'Your three roads in order, and one sentence on why there is no sound in space.',
  ifSheIsStuck: 'Ask her what the wood, the water and the air all have that the space between the planets does not.'
};

// ================================================ LESSON 29 · MAKING IT LOUDER
const L29_CHECK_IN = {
  title: 'The band on its own, and the band on the box',
  text: 'Pluck a rubber band stretched between two fingers. Now stretch exactly the same band over an open box and pluck it the same way.',
  question: 'You plucked it identically both times. Where did all that extra loudness come from?'
};

const L29_BEATS = [
  {
    n: 1,
    label: 'A thin string moves hardly any air',
    hook: 'A rubber band by itself is a terrible instrument, and every guitar in the world knows it.',
    teachingText:
      'Loudness depends on how much air gets shoved. A thin band is so narrow that it slips through the air and barely pushes any of it, however hard she plucks.',
    example:
      'A band stretched between her fingers is almost private. She can hear it and somebody across the greenhouse cannot.',
    applyIt: {
      prompt: 'A rubber band stretched between two fingers is quiet mainly because it:',
      choices: ['Is not vibrating much', 'Pushes very little air', 'Is the wrong shape to shake', 'Is far too short'],
      answer: 1,
      feedback: ['It vibrates just as hard as it does on the box.', null, 'Its shape shakes perfectly well.', 'A long one on its own is quiet too.'],
      why: 'A thin thing slips through the air instead of shoving it.'
    }
  },
  {
    n: 2,
    label: 'The box takes over the shaking and does the shoving',
    hook: 'The band does not get louder. It hands the job to something with a much bigger face.',
    teachingText:
      'When the band is stretched over a hollow box, the shaking passes into the wood and into the air inside. The wide flat sides of the box push a great deal of air, so the same vibration arrives at her ear far louder.',
    example:
      'The same band on a box can be heard across the garden. Fill the box with cloth and it goes quiet again.',
    applyIt: {
      prompt: 'She packs the hollow box tightly with cloth and plucks the band again. It sounds:',
      choices: ['Louder still', 'Exactly the same', 'Quieter', 'Higher'],
      answer: 2,
      feedback: ['The cloth stops the box working.', 'The box is doing far less now.', null, 'The pitch does not depend on the box.'],
      why: 'A hollow box shoves a lot of air. A stuffed one cannot move.'
    }
  }
];

const L29_ACTIVITY = {
  title: 'Build a greenhouse guitar, then spoil it on purpose',
  prep: 'An open cardboard box or an empty tin. Bands of a few thicknesses.',
  needs: ['an open box or empty tin', 'three rubber bands', 'an old cloth or scarf', 'her notebook'],
  steps: [
    'Pluck each band stretched between your fingers. Score the loudness 1 to 5.',
    'Stretch the same bands over the open box. Pluck each one the same way and score again.',
    'Write down how much louder the box made each one.',
    'Now put your hand flat on the box while a band is ringing. What happens to the sound?',
    'Pack the box tightly with cloth and pluck again. Score it.',
    'Take the cloth out and check the loudness comes back.',
    'Write one sentence saying what the box was actually doing for the band.'
  ],
  safety: 'Nothing plucked close to an ear, and no glass jars used as the body for this one.',
  minutes: 14
};

const L29_LEDGER = {
  prompt: 'Your loudness scores with and without the box, and what the box was doing.',
  ifSheIsStuck: 'The band never changed. The box gave the shaking a much wider surface, and a wide surface pushes far more air.'
};

// ==================================== LESSON 30 · A MESSAGE ACROSS THE GARDEN
const L30_CHECK_IN = {
  title: 'A message with no shouting',
  text: 'You need to send one word to somebody at the far end of the garden. You may not shout and you may not walk over.',
  question: 'Sound and light are both allowed. What would you build, and which would you choose?'
};

const L30_BEATS = [
  {
    n: 1,
    label: 'The string telephone, and why the string must be tight',
    hook: 'Two cups and a piece of string carry a whisper further than a shout does.',
    teachingText:
      'Speaking into a cup makes its bottom vibrate. A tight string carries that vibration all the way along to the second cup, which shakes the air at the far end into the listener’s ear. A slack string sags and swallows the shaking instead of passing it on.',
    example:
      'Pulled tight the whisper arrives clearly. Let the string droop and it dies halfway along.',
    applyIt: {
      prompt: 'The string telephone stops working when the string goes slack because a loose string:',
      choices: ['Is too short to reach', 'Cannot pass the shaking along', 'Weighs far too much', 'Blocks out the light'],
      answer: 1,
      feedback: ['It is the same length either way.', null, 'Its weight has not changed.', 'Light is not carrying this message.'],
      why: 'A tight string passes the vibration on. A slack one absorbs it.'
    }
  },
  {
    n: 2,
    label: 'A code turns a signal into a message',
    hook: 'A torch can only be on or off, and that is enough to say anything at all.',
    teachingText:
      'A signal is any change somebody at the other end can notice. Agree beforehand what each signal means and it becomes a message: one flash for yes, two for no, three for come here. That agreement is the whole invention.',
    example:
      'One flash means the kettle is on. Nothing about the torch knows that. The two of them agreed it before she walked down the garden.',
    applyIt: {
      prompt: 'What turns a flashing torch into a message rather than just a light?',
      choices: ['How bright the beam is', 'How far the beam reaches', 'An agreement about what each flash means', 'The colour of the beam'],
      answer: 2,
      feedback: ['Brightness helps her see it, not understand it.', 'Distance is not meaning.', null, 'Colour could carry a code, but only if agreed first.'],
      why: 'A code is an agreement. Without one, a flash is only a flash.'
    }
  }
];

const L30_ACTIVITY = {
  title: 'Build both, then send a real message',
  prep: 'Two paper cups, a long piece of string, and a torch. Agree the code BEFORE anybody walks off.',
  needs: ['two paper or plastic cups', 'about ten metres of string', 'a pencil to make the holes', 'a torch', 'her notebook'],
  steps: [
    'A grown-up makes one small hole in the bottom of each cup.',
    'Thread the string through and knot it inside so it cannot pull out.',
    'Walk apart until the string is tight and off the ground. Whisper into one cup.',
    'Now let the string sag and whisper again. Write down the difference.',
    'Let the string touch a post while it is tight. What happens?',
    'Now the torch: agree a code of three signals and write it in the notebook FIRST.',
    'Walk to the far end of the garden and send one of the three.',
    'Compare what you sent with what they wrote down.'
  ],
  safety: 'String, never wire. Nothing is put round a neck or a wrist. Do not shine the torch into anybody’s eyes, and never at the sun.',
  minutes: 16
};

const L30_LEDGER = {
  prompt: 'Draw your string telephone and write your torch code. Then say which one worked better, and why.',
  ifSheIsStuck: 'Ask which one still worked when they could not see each other, and which one still worked when it was noisy. They are good at different things.'
};

export const SCIENCELAB_M5 = [
  {
    id: 'sl-m5-01', course: 'sciencelab', module: 5, quarter: 3, week: 1, day: 1, n: 25,
    title: 'Something has to shake',
    minutes: 30, spec: '§10 · beats',
    concept: 'Every sound is made by something vibrating, and the sound stops the instant the shaking does.',
    standards: ['S4P2a'], offGrade: null,
    words: ['vibration', 'sound', 'shake', 'ear'],
    glossary: [
      { word: 'vibration', plain: 'Shaking very fast, back and forth.' },
      { word: 'sound', plain: 'What a vibration makes, and what her ear picks up.' },
      { word: 'shake', plain: 'To move quickly to and fro.' },
      { word: 'ear', plain: 'The part of her that catches a vibration in the air.' }
    ],
    video: {
      id: '3-xKZKxXuu0', url: 'https://www.youtube.com/watch?v=3-xKZKxXuu0',
      title: 'What is Sound? | Physics for Kids | SciShow Kids',
      channel: 'SciShow Kids', minutes: 4, verified: '2026-08-16',
      teaches: ['sound', 'vibration', 'shake', 'wave', 'ear'],
      sourceGap: 'No Black American educator confirmed for elementary sound. Searched "Black science teacher sound vibration elementary lesson", which surfaced "Allison Arthur May — Science Lesson on Sound", an individual creator whose identity was NOT established and is recorded as unknown rather than as a gap closed. Open.'
    },
    checkIn: L25_CHECK_IN, beats: L25_BEATS, activity: L25_ACTIVITY, ledger: L25_LEDGER, hook: L25_CHECK_IN,
    core: L25_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L25_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What makes a sound?', answer: 'Something vibrating.', why: 'There has never been a sound without one.' },
      { ask: 'What happens to the sound when the shaking stops?', answer: 'It stops at the same moment.', why: 'They arrive and leave together.' }
    ],
    check: [
      { prompt: 'She stops the ringing rubber band with one finger. The sound then:', choices: ['Carries on a while', 'Stops at the same moment', 'Gets higher', 'Gets louder'], answer: 1, feedback: ['The shaking stopped, so the sound stopped.', null, 'Stopping it does not change the note.', 'Stopping it adds nothing.'] },
      { prompt: 'Salt grains hop on cling film when a tray is banged nearby because the film:', choices: ['Heard the noise', 'Was blown by her breath', 'Was vibrating underneath them', 'Is very slippery'], answer: 2, feedback: ['Film has no ears.', 'Nobody blew on it.', null, 'Slippery would not throw them upward.'] },
      { prompt: 'Which of these is true of every single sound she has ever heard?', choices: ['Something was shaking', 'Something was hot', 'Something was moving across the ground', 'Something was bright'], answer: 0, feedback: [null, 'A cold bell rings perfectly well.', 'A humming throat goes nowhere.', 'Sound happens in the dark too.'] }
    ]
  },
  {
    id: 'sl-m5-02', course: 'sciencelab', module: 5, quarter: 3, week: 1, day: 2, n: 26,
    title: 'Loud and soft — how hard it shakes',
    minutes: 30, spec: '§10 · beats',
    concept: 'Loudness comes from how far the thing swings as it vibrates, and it has nothing to do with the note.',
    standards: ['S4P2a'], offGrade: null,
    words: ['loud', 'amplitude', 'strength', 'wave'],
    glossary: [
      { word: 'loud', plain: 'A sound that arrives strongly at her ear.' },
      { word: 'amplitude', plain: 'How far a vibrating thing swings. A big swing is a loud sound.' },
      { word: 'strength', plain: 'How hard she plucks or hits something.' },
      { word: 'wave', plain: 'How a vibration spreads out and travels.' }
    ],
    video: {
      id: '1NJHHA9bp5Y', url: 'https://www.youtube.com/watch?v=1NJHHA9bp5Y',
      title: 'Waves for Kids | Wavelength & Amplitude | Science Lesson for Grades 3-5 | Mini-Clip',
      channel: 'GenerationGenius', minutes: 4, verified: '2026-08-16',
      teaches: ['amplitude', 'loud', 'quiet', 'wave', 'wavelength'],
      sourceGap: 'No Black American educator found for loudness and amplitude at elementary level. Same searches as Lesson 25, recorded there. Open.'
    },
    checkIn: L26_CHECK_IN, beats: L26_BEATS, activity: L26_ACTIVITY, ledger: L26_LEDGER, hook: L26_CHECK_IN,
    core: L26_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L26_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What makes a sound louder?', answer: 'A bigger swing as it vibrates.', why: 'That swing is called the amplitude.' },
      { ask: 'Does walking away make a sound lower?', answer: 'No, only quieter.', why: 'The shaking spreads out, so less of it reaches her.' }
    ],
    check: [
      { prompt: 'To make the same rubber band louder without changing anything else, she should:', choices: ['Pluck it harder so it swings further', 'Shorten it', 'Tighten it', 'Pluck it more often'], answer: 0, feedback: [null, 'That changes the note.', 'That changes the note too.', 'That gives more sounds, not a louder one.'] },
      { prompt: 'The word for how far a vibrating thing swings is its:', choices: ['Pitch', 'Amplitude', 'Speed', 'Length'], answer: 1, feedback: ['That is how high or low it sounds.', null, 'Speed decides the note, not the loudness.', 'Length is one thing that sets the note.'] },
      { prompt: 'She walks to the far end of the garden while the same bell rings. It sounds:', choices: ['Lower', 'Higher', 'Quieter', 'Faster'], answer: 2, feedback: ['Distance does not change the note.', 'It does not raise it either.', null, 'The bell rings at the same speed.'] }
    ]
  },
  {
    id: 'sl-m5-03', course: 'sciencelab', module: 5, quarter: 3, week: 1, day: 3, n: 27,
    title: 'High and low — how fast it shakes',
    minutes: 30, spec: '§10 · beats',
    concept: 'Pitch comes from how fast something vibrates; length, tightness and thickness change it and plucking harder does not.',
    standards: ['S4P2a'], offGrade: null,
    words: ['pitch', 'high', 'low', 'fast'],
    glossary: [
      { word: 'pitch', plain: 'How high or low a note sounds.' },
      { word: 'high', plain: 'A note made by fast shaking.' },
      { word: 'low', plain: 'A note made by slow shaking.' },
      { word: 'fast', plain: 'Many shakes every second.' }
    ],
    video: {
      id: 'yMLTF_0PAQw', url: 'https://www.youtube.com/watch?v=yMLTF_0PAQw',
      title: 'Sound Waves: High Pitch and Low Pitch',
      channel: 'funsciencedemos', minutes: 5, verified: '2026-08-16',
      teaches: ['pitch', 'high', 'low', 'sound', 'vibration'],
      sourceGap: 'No Black American educator found for pitch at elementary level. Same searches as Lesson 25, recorded there. Open.'
    },
    checkIn: L27_CHECK_IN, beats: L27_BEATS, activity: L27_ACTIVITY, ledger: L27_LEDGER, hook: L27_CHECK_IN,
    core: L27_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L27_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What decides how high or low a note is?', answer: 'How fast the thing vibrates.', why: 'Fast is high, slow is low.' },
      { ask: 'Name three things that change a note.', answer: 'Length, tightness and thickness.', why: 'How hard she plucks is not one of them.' }
    ],
    check: [
      { prompt: 'A band is tightened and then plucked just as gently as before. The note is:', choices: ['Louder', 'Softer', 'Lower', 'Higher'], answer: 3, feedback: ['She plucked it the same.', 'She plucked it the same.', 'Tighter shakes faster.', null] },
      { prompt: 'She wants a lower note from the same rubber band, so she makes it:', choices: ['Longer', 'Tighter', 'Thinner', 'Plucked more gently'], answer: 0, feedback: [null, 'Tighter goes higher.', 'Thinner goes higher.', 'That changes the loudness only.'] },
      { prompt: 'Playing the same note loudly and then softly moves the pitch:', choices: ['Up a little', 'Down a little', 'Not at all', 'Only on thick bands'], answer: 2, feedback: ['Loudness and pitch are separate.', 'They are separate.', null, 'It is true of every band.'] }
    ]
  },
  {
    id: 'sl-m5-04', course: 'sciencelab', module: 5, quarter: 3, week: 2, day: 1, n: 28,
    title: 'Sound has to travel through something',
    minutes: 30, spec: '§10 · beats',
    concept: 'A vibration passes from one bit of stuff to the next, so sound needs a road and cannot cross empty space.',
    standards: ['S4P2a'], offGrade: null,
    words: ['travel', 'air', 'solid', 'space'],
    glossary: [
      { word: 'travel', plain: 'To go from one place to another.' },
      { word: 'air', plain: 'The stuff all around her. It carries sound to her ear.' },
      { word: 'solid', plain: 'Something firm like wood or glass. It carries sound very well.' },
      { word: 'space', plain: 'Beyond the air, where there is almost nothing at all.' }
    ],
    video: {
      id: 'AxNdr0Bcx20', url: 'https://www.youtube.com/watch?v=AxNdr0Bcx20',
      title: 'How Sound Travels Across Different Mediums',
      channel: 'Knowledge Platform', minutes: 4, verified: '2026-08-16',
      teaches: ['sound', 'travel', 'air', 'water', 'solid'],
      sourceGap: 'No Black American educator found for how sound travels at elementary level. Same searches as Lesson 25, recorded there. Open.'
    },
    checkIn: L28_CHECK_IN, beats: L28_BEATS, activity: L28_ACTIVITY, ledger: L28_LEDGER, hook: L28_CHECK_IN,
    core: L28_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L28_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What does sound need in order to travel?', answer: 'Stuff to pass the shaking along.', why: 'Air, water, wood — anything except nothing.' },
      { ask: 'Why is space silent?', answer: 'There is almost nothing there to carry a vibration.', why: 'Light crosses it. Sound cannot.' }
    ],
    check: [
      { prompt: 'Sound travels best through which of these?', choices: ['Empty space', 'Air', 'Something solid like wood', 'Nothing carries it'], answer: 2, feedback: ['There is nothing to pass it along.', 'Air works, but not as well.', null, 'Air, water and wood all carry it.'] },
      { prompt: 'Two astronauts float side by side in space and shout. They hear:', choices: ['Each other clearly', 'A faint echo', 'Nothing at all', 'Only the high notes'], answer: 2, feedback: ['Nothing between them carries it.', 'An echo needs a road too.', null, 'No note gets through at all.'] },
      { prompt: 'Her ear on the bench hears the far-end scratching clearly because wood is:', choices: ['Packed tightly together', 'Warmer than the air', 'Heavier than the air', 'A much better colour'], answer: 0, feedback: [null, 'Warmth is not the reason.', 'Weight is not the reason.', 'Colour carries nothing.'] }
    ]
  },
  {
    id: 'sl-m5-05', course: 'sciencelab', module: 5, quarter: 3, week: 2, day: 2, n: 29,
    title: 'The box that makes it louder',
    minutes: 30, spec: '§10 · beats',
    concept: 'A hollow box takes the shaking from a thin string and pushes far more air with it, which is why every instrument has a body.',
    standards: ['S4P2a'], offGrade: null,
    words: ['box', 'hollow', 'vibrate', 'louder'],
    glossary: [
      { word: 'box', plain: 'The body of an instrument, which does the pushing.' },
      { word: 'hollow', plain: 'Empty inside, with room for air to move.' },
      { word: 'vibrate', plain: 'To shake fast, back and forth.' },
      { word: 'louder', plain: 'Reaching her ear more strongly.' }
    ],
    video: {
      id: '9sBl_ZgIQ5Y', url: 'https://www.youtube.com/watch?v=9sBl_ZgIQ5Y',
      title: 'Rubber band with hollow box produces sound | Sound | Physics',
      channel: 'KClassScienceChannel', minutes: 3, verified: '2026-08-16',
      teaches: ['sound', 'rubber band', 'hollow', 'box', 'vibrate'],
      sourceGap: 'No Black American educator found for sound boxes at elementary level. Same searches as Lesson 25, recorded there. Open.'
    },
    checkIn: L29_CHECK_IN, beats: L29_BEATS, activity: L29_ACTIVITY, ledger: L29_LEDGER, hook: L29_CHECK_IN,
    core: L29_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L29_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'Why is a rubber band on its own so quiet?', answer: 'It pushes hardly any air.', why: 'A thin thing slips through the air instead of shoving it.' },
      { ask: 'What does the box actually do?', answer: 'Takes the shaking and pushes a lot of air with it.', why: 'Wide flat sides move far more air than a thin band.' }
    ],
    check: [
      { prompt: 'A rubber band stretched between two fingers is quiet mainly because it:', choices: ['Is not vibrating much', 'Pushes very little air', 'Is the wrong shape to shake', 'Is far too short'], answer: 1, feedback: ['It vibrates just as hard as on the box.', null, 'Its shape shakes perfectly well.', 'A long one on its own is quiet too.'] },
      { prompt: 'She packs the hollow box tightly with cloth and plucks again. It sounds:', choices: ['Louder still', 'Exactly the same', 'Quieter', 'Higher'], answer: 2, feedback: ['The cloth stops the box working.', 'The box is doing far less now.', null, 'The pitch does not depend on the box.'] },
      { prompt: 'Every guitar and violin has a hollow body because a wide surface:', choices: ['Looks better on a stage', 'Weighs much less to carry', 'Pushes a great deal more air', 'Makes the strings tighter'], answer: 2, feedback: ['Looks are not the reason.', 'Weight is not the reason.', null, 'The body does not tighten anything.'] }
    ]
  },
  {
    id: 'sl-m5-06', course: 'sciencelab', module: 5, quarter: 3, week: 2, day: 3, n: 30,
    title: 'Send a message across the garden',
    minutes: 30, spec: '§10 · beats',
    concept: 'A tight string carries a vibration a long way, and an agreed code is what turns any signal into a message.',
    standards: ['S4P2b'], offGrade: null,
    words: ['message', 'string', 'phone', 'signal'],
    glossary: [
      { word: 'message', plain: 'Something she means to say, sent to somebody else.' },
      { word: 'string', plain: 'What carries the shaking from one cup to the other.' },
      { word: 'phone', plain: 'A thing built to carry a voice across a distance.' },
      { word: 'signal', plain: 'A change somebody at the other end can notice.' }
    ],
    video: {
      id: '3yqB2KFwJCo', url: 'https://www.youtube.com/watch?v=3yqB2KFwJCo',
      title: 'The Science of the String Phone! - #sciencegoals',
      channel: 'SciShow Kids', minutes: 4, verified: '2026-08-16',
      teaches: ['string', 'phone', 'sound', 'vibration', 'message'],
      sourceGap: 'No Black American educator found for communication devices at elementary level. Same searches as Lesson 25, recorded there. Open.'
    },
    checkIn: L30_CHECK_IN, beats: L30_BEATS, activity: L30_ACTIVITY, ledger: L30_LEDGER, hook: L30_CHECK_IN,
    core: L30_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L30_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'Why must the string be tight?', answer: 'A slack string swallows the shaking instead of passing it on.', why: 'The vibration has to travel the whole way.' },
      { ask: 'What turns a flash into a message?', answer: 'An agreement about what it means.', why: 'Without the code it is only a light.' }
    ],
    check: [
      { prompt: 'The string telephone stops working when the string goes slack because a loose string:', choices: ['Is too short to reach', 'Cannot pass the shaking along', 'Weighs far too much', 'Blocks out the light'], answer: 1, feedback: ['It is the same length either way.', null, 'Its weight has not changed.', 'Light is not carrying this message.'] },
      { prompt: 'What turns a flashing torch into a message rather than just a light?', choices: ['How bright the beam is', 'How far the beam reaches', 'An agreement about what each flash means', 'The colour of the beam'], answer: 2, feedback: ['Brightness helps her see it, not understand it.', 'Distance is not meaning.', null, 'Colour could carry a code, but only if agreed first.'] },
      { prompt: 'Her string telephone would work worst if the tight string were:', choices: ['Made a little bit longer', 'Held higher off the ground', 'Resting against a fence post', 'Made of thin cotton thread'], answer: 2, feedback: ['Length matters less than she expects.', 'Off the ground is better, not worse.', null, 'Thin cotton works well when it is tight.'] }
    ]
  }
];

export const SCIENCELAB_M5_META = {
  courseId: 'sciencelab',
  module: 5,
  title: 'Sound in the Greenhouse',
  blurb:
    'Every sound is something shaking. How hard it shakes makes it loud, how fast it shakes makes it high, and those are two different things almost everybody mixes up. Then two cups, a tight string, and a message sent across the garden without shouting.'
};

export function m5LessonById(id) {
  return SCIENCELAB_M5.find((l) => l.id === id) || null;
}

export default SCIENCELAB_M5;
