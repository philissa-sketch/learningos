// ---------------------------------------------------------------------------
// THE SCIENCE LAB — MODULE 6, QUARTER 3, WEEKS 3-4
// THE SUN AND THE STARS
//
// Georgia S4E1b — "Construct an argument on why some stars (including the
// Earth's sun) appear to be larger or brighter than others."
// Georgia S4E1c — "Construct an explanation of the differences between stars
// and planets."
// Georgia S4E1a — "Ask questions to compare and contrast technological
// advances that have changed the amount and type of information on distant
// objects in the sky."
//
// ---- THE ORDER MATTERS HERE ----
//
// Lesson 31 exists so the next two have something to argue from. Until a child
// accepts that the sun IS a star — not a different kind of thing that happens
// to be in the sky — every question about brightness is unanswerable. It is one
// sentence and it takes a whole lesson to land.
//
// Then S4E1b is split in two, because brightness has TWO causes and a child who
// only meets one will confidently give the wrong answer half the time.
// Lesson 32 is distance. Lesson 33 is real size. Lesson 33 ends on the honest
// point: looking at a bright star, she cannot tell which cause it is.
//
// ---- SAFETY, AND IT IS THE RULE OF THIS WHOLE HALF OF THE COURSE ----
//
// NEVER LOOK AT THE SUN. Not for a second. Not through a telescope, not through
// binoculars, not through a pinhole she is looking into, not through smoked
// glass, sunglasses, or a phone camera.
//
// Every sun activity in Modules 6, 7 and 8 is done by PROJECTION — the sun
// behind her, the image cast onto paper, her eyes on the paper — or it is not
// done. Each step says which way she is facing.
// ---------------------------------------------------------------------------

// ================================================ LESSON 31 · THE SUN IS A STAR
const L31_CHECK_IN = {
  title: 'Count the stars, then count them again',
  text: 'On a clear night, count ten stars. In the morning, stand in the garden with your back to the sun and look at your shadow.',
  question: 'How many stars can you see in the daytime? Think carefully before you answer.'
};

const L31_BEATS = [
  {
    n: 1,
    label: 'She has been looking at a star all her life',
    hook: 'There is a star close enough to warm her face, and she has never once thought of it as one.',
    teachingText:
      'The sun is a star. It is not a different kind of thing. It is an ordinary star that happens to be extremely close to us, and everything it does is what stars do.',
    example:
      'Every star in the night sky is a sun. Some of them are bigger than ours and some are smaller, and each one is somebody else’s daytime.',
    applyIt: {
      prompt: 'The sun is best described as:',
      choices: ['A very hot planet', 'A star that is close to us', 'A different thing from a star', 'A giant lamp'],
      answer: 1,
      feedback: [
        'Planets do not make their own light.',
        null,
        'It is exactly the same kind of thing.',
        'Nobody built it and nothing switches it off.'
      ],
      why: 'One sentence, and the rest of this module rests on it.'
    }
  },
  {
    n: 2,
    label: 'The daytime sky is full of stars she cannot see',
    hook: 'The stars do not go away in the morning. They are still there, and something is drowning them out.',
    teachingText:
      'Sunlight bouncing around in our air makes the whole sky glow blue and bright. The other stars are still shining, and their light is simply lost in that glare.',
    example:
      'A candle in a dark room is easy to see. The same candle beside a floodlight is invisible, and nothing happened to the candle.',
    applyIt: {
      prompt: 'The other stars vanish in the daytime because:',
      choices: ['They switch off until night', 'They move behind the sun', 'Our bright sky drowns them out', 'They are too far away by day'],
      answer: 2,
      feedback: [
        'Nothing switches a star off.',
        'They are all over the sky, not behind it.',
        null,
        'They are the same distance all day.'
      ],
      why: 'They never stopped shining. The glare of our own sky is the problem.'
    }
  }
];

const L31_ACTIVITY = {
  title: 'The candle and the floodlight',
  prep: 'A torch, a small night light or a phone torch on its dimmest setting, and a dark room.',
  needs: ['a bright torch', 'a very dim light', 'a dark room', 'her notebook', 'paper and a pin'],
  steps: [
    'In a dark room, put the dim light at the far end. Look at it and write down how easily you see it.',
    'Now switch on the bright torch beside you, pointing at the same wall.',
    'Look for the dim light again. Is it still on? Can you still see it?',
    'Switch the bright torch off. Does the dim light come back?',
    'OUTSIDE, WITH YOUR BACK TO THE SUN: make a pinhole in card and let the sun shine THROUGH it onto a second sheet.',
    'Look only at the second sheet. That bright dot is a picture of the sun.',
    'Write one sentence saying where the stars go in the daytime.'
  ],
  safety:
    'NEVER look at the sun, not for a second, and never through the pinhole. Stand with your BACK to the sun and look only at the paper.',
  minutes: 14
};

const L31_LEDGER = {
  prompt: 'Where do the stars go in the daytime? Answer with the candle and the floodlight in your explanation.',
  ifSheIsStuck: 'The dim light never went off. Ask her what actually changed in the room.'
};

// ============================================ LESSON 32 · BRIGHTNESS AND DISTANCE
const L32_CHECK_IN = {
  title: 'The same torch, twice',
  text: 'Have a grown-up hold a torch two steps away in a dark room, then twenty steps away, pointing at you the whole time.',
  question: 'The torch never changed. So why did it look so different the second time?'
};

const L32_BEATS = [
  {
    n: 1,
    label: 'Far away means faint',
    hook: 'The sun is not a special star. It is a nearby one, and that is nearly the whole story.',
    teachingText:
      'Light spreads out as it travels, so the further away something is, the less of its light reaches her eye. A star exactly like our sun would look like a tiny dot from far enough away.',
    example:
      'Our sun is about eight light minutes away. The next nearest star is over four light years away, and it is only a speck.',
    applyIt: {
      prompt: 'A star just like our sun, but very far away, would look:',
      choices: ['Exactly as bright', 'Like a faint dot', 'Bigger than our sun', 'Completely invisible'],
      answer: 1,
      feedback: [
        'Distance always costs brightness.',
        null,
        'Distance makes things look smaller.',
        'Faint is not the same as gone.'
      ],
      why: 'The same star at a greater distance sends her far less light.'
    }
  },
  {
    n: 2,
    label: 'Why the sun looks so much bigger too',
    hook: 'Everything looks smaller the further away it is, and stars are not an exception.',
    teachingText:
      'A thing far away covers less of her view than the same thing close up. The sun looks like a wide disc and every other star looks like a point, and the only difference is distance.',
    example:
      'Her thumb held at arm’s length can cover a whole house down the road. It has not grown. The house has not shrunk.',
    applyIt: {
      prompt: 'The sun looks much larger than other stars mainly because it is:',
      choices: ['Hotter than they are', 'Much closer to us', 'Younger than they are', 'A different shape'],
      answer: 1,
      feedback: [
        'Plenty of stars are hotter.',
        null,
        'Age does not change how big it looks.',
        'Stars are all round.'
      ],
      why: 'Closer things cover more of her view. That is all a big-looking sun means.'
    }
  }
];

const L32_ACTIVITY = {
  title: 'Walk the torch away',
  prep: 'A dark garden or a long dark hallway, and a torch. A tape measure if you have one.',
  needs: ['a torch', 'a long dark space', 'chalk or markers', 'her notebook', 'a second identical torch if there is one'],
  steps: [
    'Grown-up stands two steps away holding the torch toward you. Score its brightness out of 10.',
    'Have them step back five steps at a time. Score it again at each stop.',
    'Mark the ground where the brightness dropped to about half.',
    'Draw a graph in the notebook: steps along the bottom, brightness up the side.',
    'If you have two torches, put one close and one far. Can you tell they are the same torch?',
    'Write down what this tells you about a bright star and a faint one.'
  ],
  safety: 'Walk in a cleared space, looking where you are going. Do not shine the torch into anybody’s eyes.',
  minutes: 14
};

const L32_LEDGER = {
  prompt: 'Your brightness graph, and one sentence on why our sun looks so much bigger and brighter than every other star.',
  ifSheIsStuck: 'Nothing about the torch ever changed. Only how far away it was.'
};

// ============================================ LESSON 33 · BIG STARS AND SMALL
const L33_CHECK_IN = {
  title: 'Two dots, one question',
  text: 'Two stars in the night sky look equally bright. One is a giant a very long way off; the other is small and much nearer.',
  question: 'Looking up at them, can you tell which is which? Say why or why not.'
};

const L33_BEATS = [
  {
    n: 1,
    label: 'Some stars really are far bigger than others',
    hook: 'Our sun is a fairly ordinary star, and some stars would swallow it whole.',
    teachingText:
      'Stars come in very different sizes, and a bigger star gives out more light. So brightness has a second cause that has nothing to do with distance: some stars simply glow more.',
    example:
      'Betelgeuse in Orion is enormous compared with our sun. It is also very far away, and it still looks bright.',
    applyIt: {
      prompt: 'Two stars sit the same distance away. The brighter one is probably:',
      choices: ['Closer to us', 'Bigger or hotter', 'Younger', 'Moving faster'],
      answer: 1,
      feedback: [
        'The question says they are the same distance.',
        null,
        'Age is not what she can see here.',
        'Speed does not change how bright it looks.'
      ],
      why: 'Same distance, so the difference has to be the star itself.'
    }
  },
  {
    n: 2,
    label: 'Looking up, she cannot tell which cause it is',
    hook: 'This is the honest part, and it is the part most books leave out.',
    teachingText:
      'A bright dot in the sky could be a small star nearby or a giant star far away. Both look the same from here. Working out which is which needs measuring, not looking, and that is what the next lesson is about.',
    example:
      'A torch two steps away and a floodlight across a field can look equally bright from where she is standing.',
    applyIt: {
      prompt: 'She sees a very bright star. From looking alone, she can say:',
      choices: ['It must be close', 'It must be huge', 'It could be either', 'It must be both'],
      answer: 2,
      feedback: [
        'A giant far away looks bright too.',
        'A small nearby star looks bright too.',
        null,
        'It only needs to be one of them.'
      ],
      why: 'Two different causes, one identical view. That is why astronomers measure.'
    }
  }
];

const L33_ACTIVITY = {
  title: 'The two-torch puzzle',
  prep: 'A big torch and a small one, and somebody willing to hide how far away they stand.',
  needs: ['a bright torch', 'a dim torch', 'a long dark space', 'her notebook'],
  steps: [
    'Have a grown-up secretly choose one torch and one distance, then switch it on.',
    'Score how bright it looks. Now guess which torch it was and how far away.',
    'Have them tell you the answer. Were you right?',
    'Do it five more times, writing down each guess and each answer.',
    'Count how many you got right.',
    'Now they hold BOTH torches at distances that make them look equally bright. Measure both distances.',
    'Write one sentence about what you would need in order to be sure.'
  ],
  safety: 'A cleared dark space, and no torch shone into anybody’s eyes.',
  minutes: 14
};

const L33_LEDGER = {
  prompt: 'How many of your six guesses were right, and one sentence on why looking is not enough.',
  ifSheIsStuck:
    'Ask her what extra piece of information would have made every guess easy. It is the distance, and the sky does not hand it over.'
};

// ======================================= LESSON 34 · STARS MAKE LIGHT
const L34_CHECK_IN = {
  title: 'Which of these makes its own light?',
  text: 'A candle, the moon, a torch, a mirror, and a white plate on a sunny windowsill.',
  question: 'Sort them into two piles: makes its own light, and only shows light from somewhere else.'
};

const L34_BEATS = [
  {
    n: 1,
    label: 'A star burns. A planet does not.',
    hook: 'Every planet she has ever seen was shining with borrowed light.',
    teachingText:
      'A star makes its own light, deep inside itself, and pours it out in every direction. A planet makes none at all. What she sees when she looks at a planet is sunlight that bounced off it and came to her.',
    example:
      'Turn off every light in the greenhouse and a candle still glows. A white plate does not.',
    applyIt: {
      prompt: 'When she looks at a planet in the night sky, she is seeing:',
      choices: ['Light the planet made', 'Light from our own sun, bounced off it', 'Heat, not light', 'Light from another star'],
      answer: 1,
      feedback: [
        'Planets make no light at all.',
        null,
        'Her eyes cannot see heat.',
        'Other stars are far too faint for that.'
      ],
      why: 'Borrowed light. Exactly like the moon and the white plate.'
    }
  },
  {
    n: 2,
    label: 'That is why there are so few planets to see',
    hook: 'There are thousands of stars up there and she can count the planets on one hand.',
    teachingText:
      'Stars are everywhere in the sky because they make their own light and it reaches enormous distances. A planet only shines when a nearby star lights it up, so the only planets she can see are the handful in our own solar system.',
    example:
      'On a clear night she might see Venus, Mars, Jupiter and Saturn. Every other point of light is a star.',
    applyIt: {
      prompt: 'She can only see planets that are in our own solar system because a planet:',
      choices: ['Is too small to see far off', 'Moves about too quickly', 'Only shines on borrowed light', 'Is hidden by our air'],
      answer: 2,
      feedback: [
        'Some planets are enormous.',
        'They move slowly across the sky.',
        null,
        'Air does not hide the far ones especially.'
      ],
      why: 'No sun nearby, no borrowed light, nothing to see.'
    }
  }
];

const L34_ACTIVITY = {
  title: 'Two piles, and a borrowed-light test',
  prep: 'A dark room, a torch, and a handful of small objects including one white and one shiny.',
  needs: ['a torch', 'a white ball or plate', 'a mirror', 'a glow-in-the-dark toy if there is one', 'her notebook'],
  steps: [
    'Make two columns in the notebook: MAKES ITS OWN and BORROWS IT.',
    'In a dark room, put each object down and look at it with every light off.',
    'Which ones can you still see? Put those in the first column.',
    'Now shine the torch at each object in turn. Which ones show up now?',
    'Hold the white ball up and shine the torch on one side only. Look at it from the dark side.',
    'Draw what the ball looked like. You have just drawn a moon phase.',
    'Write down which column the sun goes in, and which column Mars goes in.'
  ],
  safety: 'No torch shone into eyes. A glass mirror stays flat on the bench.',
  minutes: 14
};

const L34_LEDGER = {
  prompt: 'Your two columns, with the sun, the moon, Mars and a candle each in the right one.',
  ifSheIsStuck: 'One question sorts everything: if every other light went out, would it still glow?'
};

// ======================================= LESSON 35 · TWINKLE
const L35_CHECK_IN = {
  title: 'Look for the one that is holding still',
  text: 'On a clear night, look at several bright points of light and watch each one for a slow count of ten.',
  question: 'Some flickered and shivered. One or two held perfectly steady. What might that difference mean?'
};

const L35_BEATS = [
  {
    n: 1,
    label: 'Our own moving air makes stars shiver',
    hook: 'The twinkling does not happen at the star. It happens in the last few miles of the journey.',
    teachingText:
      'A star is so far away that its light arrives as a single thin beam. That beam has to cross our moving air, and the wobbling air bends it about, so the point of light seems to shiver.',
    example:
      'Look along a hot road in summer and everything beyond it wobbles. Starlight crosses air doing exactly that, all night.',
    applyIt: {
      prompt: 'A star twinkles because of something happening:',
      choices: ['Inside the star itself', 'In our air, near the end of the trip', 'Halfway across space', 'Inside her own eye'],
      answer: 1,
      feedback: [
        'The star shines quite steadily.',
        null,
        'There is nothing out there to wobble it.',
        'Everybody in the garden sees the same flicker.'
      ],
      why: 'Our air is moving, and it bends the thin beam about as it passes.'
    }
  },
  {
    n: 2,
    label: 'A planet is a tiny disc, and a disc does not shiver',
    hook: 'This is a test she can do herself, from the back step, with no equipment at all.',
    teachingText:
      'A planet is much nearer, so its light reaches her as a small disc rather than a single point. The air wobbles different parts of that disc in different directions at once, and the wobbles cancel out. So planets shine steadily and stars twinkle.',
    example:
      'Jupiter holds rock steady all evening while the stars around it flicker.',
    applyIt: {
      prompt: 'A steady, unblinking point of light in the night sky is most likely:',
      choices: ['A very hot star', 'A very cold star', 'A planet', 'A star behind cloud'],
      answer: 2,
      feedback: [
        'Heat does not stop the twinkling.',
        'Nor does cold.',
        null,
        'Cloud dims it rather than steadying it.'
      ],
      why: 'A disc averages the wobbles out. A point cannot.'
    }
  }
];

const L35_ACTIVITY = {
  title: 'The steady one and the shivering ones',
  prep: 'A clear night and somewhere with a decent view of the sky. Warm coats.',
  needs: ['a clear night', 'her notebook', 'a torch with red paper over it', 'a warm coat'],
  steps: [
    'Go out after dark and let your eyes adjust for a full ten minutes. No bright screens.',
    'Pick six bright points of light. Watch each one for a slow count of ten.',
    'Mark each one TWINKLING or STEADY in the notebook.',
    'For any steady one, note roughly where it is and come back the next clear night.',
    'Did the steady one move against the stars around it?',
    'Indoors: look at a distant streetlight through the shimmer above a warm radiator.',
    'Write one sentence connecting the radiator shimmer to the twinkling.'
  ],
  safety:
    'A grown-up goes outside with her. Red paper over the torch keeps night eyes working. NEVER do any of this looking anywhere near the sun.',
  minutes: 16
};

const L35_LEDGER = {
  prompt: 'Your six points of light marked twinkling or steady, and what you think the steady ones were.',
  ifSheIsStuck:
    'Ask her whether the twinkling is happening at the star or on the way. Then ask what is between her and it.'
};

// ======================================= LESSON 36 · THE TELESCOPE
const L36_CHECK_IN = {
  title: 'Four dots that changed everything',
  text: 'In 1610 a man pointed a new invention at Jupiter and saw four small dots beside it. He looked again the next night and they had moved.',
  question: 'What could four moving dots beside a planet possibly mean?'
};

const L36_BEATS = [
  {
    n: 1,
    label: 'A better tool shows you more sky',
    hook: 'For all of human history before Galileo, the sky was only ever what an eye could see.',
    teachingText:
      'A telescope gathers far more light than an eye and bends it to make a bigger picture. Galileo built one, pointed it upward, and found craters on the moon, spots on the sun and four moons going round Jupiter.',
    example:
      'Those four moons are still called the Galilean moons, and a decent pair of binoculars will show them to her tonight.',
    applyIt: {
      prompt: 'A telescope helps mainly because it:',
      choices: ['Gathers much more light than an eye', 'Moves the stars closer', 'Makes stars brighter than they are', 'Removes our air'],
      answer: 0,
      feedback: [
        null,
        'Nothing moves. Only the picture changes.',
        'It collects their light rather than adding any.',
        'The air is still in the way.'
      ],
      why: 'A wider opening catches more light, and more light means more detail.'
    }
  },
  {
    n: 2,
    label: 'New tools keep changing the answer',
    hook: 'Every time somebody builds a better instrument, the sky turns out to be bigger than anyone thought.',
    teachingText:
      'What we know about the sky has always been limited by the tools we had. The naked eye gave us a few thousand stars. Galileo’s telescope gave us moons and craters. Telescopes above the air give us pictures of things nobody knew existed.',
    example:
      'Galileo’s moons settled an argument that had run for centuries: not everything goes round the Earth.',
    applyIt: {
      prompt: 'Galileo seeing four moons circling Jupiter mattered because it showed that:',
      choices: ['Jupiter is very large', 'Not everything circles the Earth', 'Moons are common', 'Telescopes are useful'],
      answer: 1,
      feedback: [
        'Its size was not the argument.',
        null,
        'True, and not what the argument was about.',
        'True, and much smaller than the real point.'
      ],
      why: 'Four things going round something that was not us. That is why it caused such trouble.'
    }
  }
];

const L36_ACTIVITY = {
  title: 'Watch Jupiter’s moons move',
  prep: 'Binoculars, a clear night, and something to rest your elbows on. This one takes two nights.',
  needs: ['binoculars', 'a clear night', 'a fence or wall to steady your arms', 'her notebook'],
  steps: [
    'Find the steadiest bright point from Lesson 35. That is very likely a planet.',
    'Rest your elbows on a wall and look at it through binoculars. Steady arms matter more than big lenses.',
    'Draw exactly what you see, including any small dots beside it, and write the time.',
    'Come back the next clear night at about the same time and draw it again.',
    'Compare your two drawings. Did the small dots move?',
    'Now the tool comparison: look at the same patch of sky with your eyes, then the binoculars. Count the stars in each.',
    'Write down both counts. That difference is the whole of this lesson.'
  ],
  safety:
    'NEVER point binoculars anywhere near the sun, not even by accident while finding something. Binoculars come out only after dark, and a grown-up is outside with her.',
  minutes: 16
};

const L36_LEDGER = {
  prompt: 'Your two drawings of Jupiter, and your two star counts. Then say what a better tool actually gave you.',
  ifSheIsStuck:
    'The sky did not change between her two counts. Ask her what did, and what that means about everything we think we know.'
};

export const SCIENCELAB_M6 = [
  {
    id: 'sl-m6-01', course: 'sciencelab', module: 6, quarter: 3, week: 3, day: 1, n: 31,
    title: 'The sun is a star, and the nearest one',
    minutes: 30, spec: '§10 · beats',
    concept: 'The sun is an ordinary star that happens to be very close, and the other stars never stop shining in the daytime.',
    standards: ['S4E1b'], offGrade: null,
    words: ['star', 'sun', 'light', 'sky'],
    glossary: [
      { word: 'star', plain: 'A huge ball that makes its own light. The sun is one.' },
      { word: 'sun', plain: 'Our own star, close enough to warm her face.' },
      { word: 'light', plain: 'What a star pours out in every direction.' },
      { word: 'sky', plain: 'What she sees looking up. By day it glows and hides the stars.' }
    ],
    video: {
      id: 'vQSECrMIygg', url: 'https://www.youtube.com/watch?v=vQSECrMIygg',
      title: 'The Sun for Kids | Solar System Science', channel: 'Homeschool Pop',
      minutes: 5, verified: '2026-08-16',
      teaches: ['sun', 'star', 'light', 'heat', 'sky'],
      sourceGap: 'No Black American educator confirmed for elementary astronomy. Searched "Black astronomer kids science channel stars planets for children", "Black STEM educator solar system planets lesson for children" and "Black woman scientist space astronomy videos for elementary students". The last surfaced National Geographic on Katherine Johnson and "Coco & Shea Butter Kids — BLACK HEROES OF SPACE", both real and both BIOGRAPHICAL, and no lesson in this module is about a person. Recorded as a gap in the blueprint rather than as a gap closed, and flagged to Gigi. Open.'
    },
    checkIn: L31_CHECK_IN, beats: L31_BEATS, activity: L31_ACTIVITY, ledger: L31_LEDGER, hook: L31_CHECK_IN,
    core: L31_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L31_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What is the sun?', answer: 'A star, close to us.', why: 'Not a different kind of thing at all.' },
      { ask: 'Where do the stars go in the daytime?', answer: 'Nowhere. Our bright sky hides them.', why: 'Like a candle beside a floodlight.' }
    ],
    check: [
      { prompt: 'The sun is best described as:', choices: ['A very hot planet', 'A star that is close to us', 'A different thing from a star', 'A giant lamp'], answer: 1, feedback: ['Planets make no light of their own.', null, 'It is exactly the same kind of thing.', 'Nobody built it.'] },
      { prompt: 'The other stars cannot be seen in the daytime because:', choices: ['They switch off until night', 'They move behind the sun', 'Our bright sky drowns them out', 'They are further away by day'], answer: 2, feedback: ['Nothing switches a star off.', 'They are all over the sky.', null, 'They are the same distance all day.'] },
      { prompt: 'Every star she sees at night is best thought of as:', choices: ['Somebody else’s sun', 'A hole in the sky', 'A very bright planet', 'A reflection of our sun'], answer: 0, feedback: [null, 'It is a real object, not a gap.', 'Planets do not make light.', 'They shine on their own.'] }
    ]
  },
  {
    id: 'sl-m6-02', course: 'sciencelab', module: 6, quarter: 3, week: 3, day: 2, n: 32,
    title: 'Why some stars look brighter — distance',
    minutes: 30, spec: '§10 · beats',
    concept: 'Light spreads out as it travels, so distance alone can make an identical star look faint and small.',
    standards: ['S4E1b'], offGrade: null,
    words: ['brightness', 'distance', 'far', 'star'],
    glossary: [
      { word: 'brightness', plain: 'How strongly a light arrives at her eye.' },
      { word: 'distance', plain: 'How far away something is.' },
      { word: 'far', plain: 'A long way off. Far things look faint and small.' },
      { word: 'star', plain: 'A huge ball that makes its own light.' }
    ],
    video: {
      id: 'nwAS0HhRk5M', url: 'https://www.youtube.com/watch?v=nwAS0HhRk5M',
      title: 'A star’s distance from Earth affects its brightness | MightyOwl Science | 5th Grade',
      channel: 'MightyOwl', minutes: 5, verified: '2026-08-16',
      teaches: ['star', 'distance', 'brightness', 'Earth', 'far'],
      sourceGap: 'No Black American educator found for star brightness at elementary level. Same searches as Lesson 31, recorded there. Open.'
    },
    checkIn: L32_CHECK_IN, beats: L32_BEATS, activity: L32_ACTIVITY, ledger: L32_LEDGER, hook: L32_CHECK_IN,
    core: L32_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L32_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'Why does a far-off star look faint?', answer: 'Its light spreads out on the way.', why: 'Less of it reaches her eye.' },
      { ask: 'Why does the sun look so much bigger?', answer: 'It is far closer than any other star.', why: 'Close things cover more of her view.' }
    ],
    check: [
      { prompt: 'A star just like our sun, but very far away, would look:', choices: ['Exactly as bright', 'Like a faint dot', 'Bigger than our sun', 'Completely invisible'], answer: 1, feedback: ['Distance always costs brightness.', null, 'Distance makes things look smaller.', 'Faint is not the same as gone.'] },
      { prompt: 'The sun looks much larger than other stars mainly because it is:', choices: ['Hotter than they are', 'Younger than they are', 'Much closer to us', 'A different shape'], answer: 2, feedback: ['Plenty of stars are hotter.', 'Age does not change its size.', null, 'Stars are all round.'] },
      { prompt: 'A torch is carried twenty steps further away. What actually changed?', choices: ['The torch got dimmer', 'How much of its light reaches her', 'The colour of the beam', 'The size of the bulb'], answer: 1, feedback: ['The torch is untouched.', null, 'The colour is the same.', 'The bulb is the same.'] }
    ]
  },
  {
    id: 'sl-m6-03', course: 'sciencelab', module: 6, quarter: 3, week: 3, day: 3, n: 33,
    title: 'Big stars and small stars',
    minutes: 30, spec: '§10 · beats',
    concept: 'Brightness has two causes — real size and distance — and looking at the sky alone cannot tell her which one she is seeing.',
    standards: ['S4E1b'], offGrade: null,
    words: ['bright', 'size', 'glow', 'star'],
    glossary: [
      { word: 'bright', plain: 'Giving out a lot of light, or seeming to.' },
      { word: 'size', plain: 'How big something really is.' },
      { word: 'glow', plain: 'To give out light of its own.' },
      { word: 'star', plain: 'A huge ball that makes its own light. Some are far bigger than others.' }
    ],
    video: {
      id: 'Zo-sKzMWYFA', url: 'https://www.youtube.com/watch?v=Zo-sKzMWYFA',
      title: 'Glow On: Crash Course Kids #20.2', channel: 'Crash Course Kids',
      minutes: 4, verified: '2026-08-16',
      teaches: ['star', 'bright', 'glow', 'size', 'light'],
      sourceGap: 'No Black American educator found for star size and brightness at elementary level. Same searches as Lesson 31, recorded there. Open.'
    },
    checkIn: L33_CHECK_IN, beats: L33_BEATS, activity: L33_ACTIVITY, ledger: L33_LEDGER, hook: L33_CHECK_IN,
    core: L33_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L33_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'Name the two reasons a star can look bright.', answer: 'It is close, or it is big.', why: 'Both give the same view from here.' },
      { ask: 'Can she tell which by looking?', answer: 'No.', why: 'That is why astronomers measure instead.' }
    ],
    check: [
      { prompt: 'Two stars sit the same distance away. The brighter one is probably:', choices: ['Closer to us', 'Bigger or hotter', 'Younger', 'Moving faster'], answer: 1, feedback: ['They are the same distance.', null, 'Age is not what she sees.', 'Speed does not change brightness.'] },
      { prompt: 'She sees a very bright star. From looking alone she can say it:', choices: ['Must be close', 'Must be huge', 'Could be either', 'Must be both'], answer: 2, feedback: ['A giant far off looks bright too.', 'A small close one looks bright too.', null, 'It only needs to be one.'] },
      { prompt: 'To decide whether a bright star is close or huge, she would need to know its:', choices: ['Colour', 'Name', 'Age', 'Distance'], answer: 3, feedback: ['Colour hints at heat, not distance.', 'The name tells her nothing.', 'Age is not the missing piece.', null] }
    ]
  },
  {
    id: 'sl-m6-04', course: 'sciencelab', module: 6, quarter: 3, week: 4, day: 1, n: 34,
    title: 'Stars make light. Planets only borrow it.',
    minutes: 30, spec: '§10 · beats',
    concept: 'A star makes its own light; a planet shines only with light that bounced off it, which is why so few planets are visible.',
    standards: ['S4E1c'], offGrade: null,
    words: ['star', 'planet', 'reflect', 'light'],
    glossary: [
      { word: 'star', plain: 'Makes its own light, deep inside itself.' },
      { word: 'planet', plain: 'Makes no light at all. It only shows light that hit it.' },
      { word: 'reflect', plain: 'To bounce light off and send it somewhere else.' },
      { word: 'light', plain: 'What she sees by. Some things make it, some only pass it on.' }
    ],
    video: {
      id: '0TMi3Prd7Qg', url: 'https://www.youtube.com/watch?v=0TMi3Prd7Qg',
      title: 'Stars and Planets - What is the difference?', channel: 'funsciencedemos',
      minutes: 5, verified: '2026-08-16',
      teaches: ['star', 'planet', 'light', 'reflect', 'difference'],
      sourceGap: 'No Black American educator found for stars against planets at elementary level. Same searches as Lesson 31, recorded there. Open.'
    },
    checkIn: L34_CHECK_IN, beats: L34_BEATS, activity: L34_ACTIVITY, ledger: L34_LEDGER, hook: L34_CHECK_IN,
    core: L34_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L34_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What is the difference between a star and a planet?', answer: 'A star makes its own light. A planet borrows it.', why: 'That one sentence is the standard.' },
      { ask: 'Why are so few planets visible?', answer: 'Only the ones near our own sun get lit up.', why: 'No nearby star, nothing to bounce.' }
    ],
    check: [
      { prompt: 'When she looks at a planet in the night sky, she is seeing:', choices: ['Light the planet made itself', 'Heat rather than light', 'Light from another star', 'Our own sunlight, bounced off it'], answer: 3, feedback: ['Planets make none.', 'Eyes cannot see heat.', 'Far too faint for that.', null] },
      { prompt: 'Which of these makes its own light?', choices: ['The sun', 'The moon', 'Mars', 'A mirror'], answer: 0, feedback: [null, 'It shines with borrowed sunlight.', 'So does Mars.', 'A mirror only passes it on.'] },
      { prompt: 'She can only see planets from our own solar system because a planet:', choices: ['Is far too small to see', 'Moves about too quickly', 'Only shines on borrowed light', 'Is hidden behind our air'], answer: 2, feedback: ['Some are enormous.', 'They drift slowly.', null, 'Air does not single them out.'] }
    ]
  },
  {
    id: 'sl-m6-05', course: 'sciencelab', module: 6, quarter: 3, week: 4, day: 2, n: 35,
    title: 'Why stars twinkle and planets do not',
    minutes: 30, spec: '§10 · beats',
    concept: 'Twinkling happens in our own moving air, and a planet arrives as a small disc whose wobbles cancel out.',
    standards: ['S4E1c'], offGrade: null,
    words: ['twinkle', 'planet', 'star', 'air'],
    glossary: [
      { word: 'twinkle', plain: 'To shiver and flicker rather than shine steadily.' },
      { word: 'planet', plain: 'Near enough to arrive as a tiny disc, so it holds steady.' },
      { word: 'star', plain: 'So far off that it arrives as a single point of light.' },
      { word: 'air', plain: 'The moving stuff above her that bends the light about.' }
    ],
    video: {
      id: 'OGo7ZQhxwG8', url: 'https://www.youtube.com/watch?v=OGo7ZQhxwG8',
      title: '⭐ Why Stars Twinkle and Planets Don’t! | Space Facts for Kids', channel: 'Toy Time Town',
      minutes: 4, verified: '2026-08-16',
      teaches: ['twinkle', 'star', 'planet', 'air', 'light'],
      sourceGap: 'No Black American educator found for twinkling at elementary level. Same searches as Lesson 31, recorded there. Open.'
    },
    checkIn: L35_CHECK_IN, beats: L35_BEATS, activity: L35_ACTIVITY, ledger: L35_LEDGER, hook: L35_CHECK_IN,
    core: L35_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L35_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'Where does the twinkling actually happen?', answer: 'In our own moving air.', why: 'Not at the star at all.' },
      { ask: 'How can she spot a planet from the back step?', answer: 'It holds steady while the stars flicker.', why: 'A disc averages the wobbles out.' }
    ],
    check: [
      { prompt: 'A star twinkles because of something happening:', choices: ['Inside the star itself', 'In our air, near the end of the trip', 'Halfway across space', 'Inside her own eye'], answer: 1, feedback: ['The star shines steadily.', null, 'Nothing out there wobbles it.', 'Everyone sees the same flicker.'] },
      { prompt: 'A steady, unblinking point of light in the night sky is most likely:', choices: ['A very hot star', 'A very cold star', 'A planet', 'A star behind cloud'], answer: 2, feedback: ['Heat does not steady it.', 'Nor does cold.', null, 'Cloud dims rather than steadies.'] },
      { prompt: 'A planet holds steady because its light reaches her as:', choices: ['A small disc rather than a point', 'A single thin point', 'A much stronger beam', 'A different colour'], answer: 0, feedback: [null, 'That is what a star does.', 'Strength is not the reason.', 'Colour is not the reason.'] }
    ]
  },
  {
    id: 'sl-m6-06', course: 'sciencelab', module: 6, quarter: 3, week: 4, day: 3, n: 36,
    title: 'Before the telescope, and after it',
    minutes: 30, spec: '§10 · beats',
    concept: 'A telescope gathers far more light than an eye, and every better tool has changed what we know the sky contains.',
    standards: ['S4E1a'], offGrade: null,
    words: ['telescope', 'Galileo', 'Jupiter', 'discover'],
    glossary: [
      { word: 'telescope', plain: 'A tool that gathers much more light than an eye can.' },
      { word: 'Galileo', plain: 'The man who first pointed one at the sky, in 1610.' },
      { word: 'Jupiter', plain: 'The big planet where he found four moons going round.' },
      { word: 'discover', plain: 'To find out something nobody knew before.' }
    ],
    video: {
      id: 'JI36dazqEwU', url: 'https://www.youtube.com/watch?v=JI36dazqEwU',
      title: 'Galileo Galilei for Kids | Learn about this famous scientist and mathematician',
      channel: 'Learn Bright', minutes: 5, verified: '2026-08-16',
      teaches: ['Galileo', 'telescope', 'scientist', 'moons', 'discovery'],
      sourceGap: 'No Black American educator found for the history of the telescope at elementary level. Same searches as Lesson 31, recorded there. Open.'
    },
    checkIn: L36_CHECK_IN, beats: L36_BEATS, activity: L36_ACTIVITY, ledger: L36_LEDGER, hook: L36_CHECK_IN,
    core: L36_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L36_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What does a telescope actually do?', answer: 'Gathers far more light than an eye.', why: 'More light means more detail.' },
      { ask: 'Why did four moons at Jupiter cause such trouble?', answer: 'They showed not everything goes round the Earth.', why: 'A tool settled an argument centuries old.' }
    ],
    check: [
      { prompt: 'A telescope helps mainly because it:', choices: ['Gathers much more light than an eye', 'Moves the stars closer to us', 'Makes stars brighter than they are', 'Takes our air out of the way'], answer: 0, feedback: [null, 'Nothing moves. Only the picture changes.', 'It collects light rather than adding it.', 'The air is still there.'] },
      { prompt: 'Galileo seeing four moons circling Jupiter mattered because it showed:', choices: ['Jupiter is very large', 'Not everything circles the Earth', 'Moons are quite common', 'Telescopes are useful'], answer: 1, feedback: ['Its size was not the argument.', null, 'True, and not the point.', 'True, and far smaller than the point.'] },
      { prompt: 'What we know about the sky has always been limited by our:', choices: ['Imagination', 'Tools', 'Eyesight alone', 'Distance from the sun'], answer: 1, feedback: ['People imagined plenty.', null, 'Eyes were only the first tool.', 'That has never changed.'] }
    ]
  }
];

export const SCIENCELAB_M6_META = {
  courseId: 'sciencelab',
  module: 6,
  title: 'The Sun and the Stars',
  blurb:
    'The sun is a star and she has been looking at one her whole life. Why some stars look brighter, and why looking alone cannot tell her whether that is size or distance. What separates a star from a planet, how to spot one from the back step, and the four dots beside Jupiter that changed everything.'
};

export function m6LessonById(id) {
  return SCIENCELAB_M6.find((l) => l.id === id) || null;
}

export default SCIENCELAB_M6;
