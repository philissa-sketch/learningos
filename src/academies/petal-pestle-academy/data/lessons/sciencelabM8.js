// ---------------------------------------------------------------------------
// THE SCIENCE LAB — MODULE 8, QUARTER 3, WEEKS 7-8
// THE MOON, THE DAY AND THE YEAR
//
// Georgia S4E2a — "Develop a model to support an explanation of why the length
// of day and night change throughout the year."
// Georgia S4E2b — "Develop a model based on observations to describe the
// repeating pattern of the phases of the moon (new, crescent, quarter, gibbous,
// and full)."
// Georgia S4E2c — "Construct an explanation of how the Earth's orbit, with its
// consistent tilt, affects seasonal changes."
//
// ---- THE LAST MODULE OF THE SCIENCE LAB ----
//
// Forty-eight lessons end here, and this one closes the course back into her
// garden. Lesson 48 is the tilt, and the tilt is why Georgia has a first and a
// last frost date at all — the number she already counts backwards from in
// Herbalism to find a sowing date.
//
// ---- WHY "WHY IT CHANGES" AND "WHAT IT IS CALLED" ARE TWO LESSONS ----
//
// Georgia names the phase vocabulary explicitly: new, crescent, quarter,
// gibbous, full. A child can explain the geometry perfectly and still have no
// word for what she is looking at, and she can recite five words with no idea
// why any of them happen. Lesson 45 is the reason. Lesson 46 is the names, and
// it is where her own month of drawings gets labelled.
//
// ---- THE MONTH-LONG OBSERVATION STARTS IN WEEK 7, NOT WEEK 8 ----
//
// S4E2b says "based on observations", and a moon record cannot be crammed into
// a Thursday. Lesson 44's activity starts the drawing log and Lesson 46 reads it
// back. That is written into the prep line of both.
//
// ---- SAFETY ----
//
// NEVER LOOK AT THE SUN. This module talks about the sun constantly and looks at
// it never. Every sun activity is done by shadow or by projection, with the sun
// behind her. The moon is entirely safe to look at, with eyes or binoculars.
// ---------------------------------------------------------------------------

// ============================================ LESSON 43 · THE SPINNING EARTH
const L43_CHECK_IN = {
  title: 'Watch a shadow move',
  text: 'Stand a stick upright in the garden in the morning and chalk round its shadow. Do it again two hours later.',
  question: 'Nobody moved the stick. So what moved?'
};

const L43_BEATS = [
  {
    n: 1,
    label: 'The Earth turns, and that is one day',
    hook: 'The sun has never once crossed the sky. She has been turning past it her whole life.',
    teachingText:
      'The Earth spins all the way round once every twenty-four hours. The half facing the sun has daytime and the half facing away has night. As she turns into the light it looks to her as though the sun is rising.',
    example:
      'Spin slowly on the spot with a lamp beside you. The lamp stays exactly where it is, and it still seems to sweep past your face.',
    applyIt: {
      prompt: 'Day and night happen because the Earth:',
      choices: ['Moves round the sun', 'Spins round once a day', 'Moves closer and further away', 'Is covered by the moon'],
      answer: 1,
      feedback: [
        'That takes a whole year and makes the seasons.',
        null,
        'Its distance barely changes.',
        'The moon covers almost nothing.'
      ],
      why: 'One spin, one day. Nothing to do with going round the sun.'
    }
  },
  {
    n: 2,
    label: 'A shadow is a clock she can read',
    hook: 'Her shadow has been telling the time since long before anybody built a clock.',
    teachingText:
      'As the Earth turns, the sun appears to move across the sky, and every shadow swings round and changes length in step with it. Long shadows in the morning, shortest around midday, long again in the evening.',
    example:
      'People told the time by exactly this for thousands of years, using nothing but a stick in the ground.',
    applyIt: {
      prompt: 'Her chalked shadow is shortest at about:',
      choices: ['Sunrise', 'Midday', 'Sunset', 'Midnight'],
      answer: 1,
      feedback: [
        'That is one of the longest.',
        null,
        'That is the other longest.',
        'There is no shadow at all.'
      ],
      why: 'Sun highest, shadow shortest. She saw it in Module 4.'
    }
  }
];

const L43_ACTIVITY = {
  title: 'Build a shadow clock',
  prep: 'A sunny day, a stick and chalk. Check back every hour or two, so pick a day she is home.',
  needs: ['a straight stick or a pencil in clay', 'chalk', 'a sunny patch of ground', 'a tape measure', 'her notebook'],
  steps: [
    'Push the stick upright into the ground somewhere sunny and mark its base so it cannot move.',
    'First thing in the morning, chalk round the shadow and write the time beside it.',
    'Come back every hour or two and do it again, all day.',
    'Measure each shadow and write the length beside the time.',
    'At the end of the day, look at all your chalk marks together. Which way did they swing?',
    'Indoors: spin slowly on the spot with a lamp beside you and keep your eyes forward.',
    'Write down what was really moving in the garden all day.'
  ],
  safety:
    'NEVER look at the sun, not even briefly, and not to see where it is. Judge everything from the shadow on the ground.',
  minutes: 16
};

const L43_LEDGER = {
  prompt: 'Your shadow clock, with times and lengths. Then say what was actually moving, in your own words.',
  ifSheIsStuck: 'The stick did not move and the sun did not move. That leaves exactly one thing.'
};

// ============================================ LESSON 44 · THE MOON GOES ROUND
const L44_CHECK_IN = {
  title: 'Start the moon log tonight',
  text: 'Tonight, find the moon and draw its shape in your notebook with the date beside it. You will do this for a month.',
  question: 'Before you start: do you think it will look the same tomorrow? Write your guess down.'
};

const L44_BEATS = [
  {
    n: 1,
    label: 'The moon circles us, and that is a month',
    hook: 'The word month came from the word moon, and it is not a coincidence.',
    teachingText:
      'The moon travels round the Earth once every twenty-nine and a half days, held there by our gravity. That journey is where the idea of a month came from, long before anybody had a calendar.',
    example:
      'She met the reason in Lesson 12. The moon is falling toward us and moving sideways, so it keeps missing.',
    applyIt: {
      prompt: 'The moon takes about how long to travel once round the Earth?',
      choices: ['One day', 'One week', 'About a month', 'One year'],
      answer: 2,
      feedback: [
        'That is one spin of the Earth.',
        'That is about a quarter of the trip.',
        null,
        'That is the Earth going round the sun.'
      ],
      why: 'Twenty-nine and a half days, and that is where a month came from.'
    }
  },
  {
    n: 2,
    label: 'Three motions at once, and they do different jobs',
    hook: 'The Earth spins, the Earth circles the sun, and the moon circles us. Each one makes something different.',
    teachingText:
      'Keeping these three apart is the whole of this module. The Earth spinning makes day and night. The moon going round us makes the month and the phases. The Earth going round the sun makes the year and, with the tilt, the seasons.',
    example:
      'A day, a month and a year are three different journeys, and each is caused by a different one of those motions.',
    applyIt: {
      prompt: 'Which motion gives us the year?',
      choices: ['The Earth spinning', 'The moon circling us', 'The Earth circling the sun', 'The sun spinning'],
      answer: 2,
      feedback: [
        'That gives the day.',
        'That gives the month.',
        null,
        'The sun does spin, and it does not set our year.'
      ],
      why: 'Three motions, three units of time, and they never swap jobs.'
    }
  }
];

const L44_ACTIVITY = {
  title: 'Open the moon log — and keep it for a month',
  prep: 'THIS ONE STARTS NOW AND FINISHES IN LESSON 46. Rule up a page with a box for each night.',
  needs: ['her notebook', 'a ruler', 'a pencil', 'a clear view of the sky', 'a warm coat'],
  steps: [
    'Rule a grid of thirty small boxes, one for each night, and write the dates in.',
    'Every clear night, find the moon and draw its shape in that night’s box.',
    'Write the time beside each drawing, and note roughly where in the sky it was.',
    'If it is cloudy, leave the box empty and write CLOUD. An honest gap beats a guess.',
    'Indoors tonight: hold a ball and walk slowly round a lamp, watching the lit part change.',
    'Write down which motion the walking stood for, and which the spinning stood for.'
  ],
  safety:
    'A grown-up goes outside with her. The moon is completely safe to look at with eyes or binoculars. NEVER point binoculars anywhere near the sun.',
  minutes: 14
};

const L44_LEDGER = {
  prompt: 'Your moon log grid, opened and dated, and the three motions with what each one causes.',
  ifSheIsStuck: 'Spin makes the day. Moon round us makes the month. Earth round the sun makes the year.'
};

// ============================================ LESSON 45 · WHY THE SHAPE CHANGES
const L45_CHECK_IN = {
  title: 'The ball and the lamp',
  text: 'Hold a pale ball at arm’s length and have a grown-up shine a lamp at it from across the room. Turn slowly on the spot.',
  question: 'The ball is always half lit. So why does the lit part you can see keep changing shape?'
};

const L45_BEATS = [
  {
    n: 1,
    label: 'Half the moon is always lit, and she sees it from the side',
    hook: 'The moon does not change shape. Her view of it does.',
    teachingText:
      'The sun lights up half the moon at all times, exactly as it lights half the Earth. As the moon travels round us, she sees that lit half from different angles — sometimes face on, sometimes edge on, sometimes from behind.',
    example:
      'The ball in her hand is always half lit by the lamp, and it still looks like a crescent, a half and a full circle as she turns.',
    applyIt: {
      prompt: 'How much of the moon is lit by the sun at any moment?',
      choices: ['All of it', 'Half of it', 'A quarter of it', 'It changes'],
      answer: 1,
      feedback: [
        'The far side is always dark.',
        null,
        'It is always exactly half.',
        'The lit half never changes size.'
      ],
      why: 'Always half. What changes is how much of that half she can see.'
    }
  },
  {
    n: 2,
    label: 'It is not the Earth’s shadow',
    hook: 'This is the wrong answer nearly everybody gives, and it is worth naming out loud.',
    teachingText:
      'Phases are not the Earth’s shadow falling on the moon. That does happen, rarely, and it is called an eclipse. Phases happen every single month and are caused only by the angle she is looking from.',
    example:
      'If phases were our shadow there would be one every night and the pattern would never repeat so neatly.',
    applyIt: {
      prompt: 'The phases of the moon are caused by:',
      choices: ['The Earth’s shadow on it', 'Clouds passing across it', 'The angle we see the lit half from', 'The moon changing shape'],
      answer: 2,
      feedback: [
        'That is an eclipse, and it is rare.',
        'Clouds hide it rather than shape it.',
        null,
        'The moon is the same ball all month.'
      ],
      why: 'Angle, not shadow. This is the misconception this lesson exists to fix.'
    }
  }
];

const L45_ACTIVITY = {
  title: 'Make every phase with a ball and a lamp',
  prep: 'A darkened room, a bare lamp, and a pale ball on a stick if possible.',
  needs: ['a pale ball', 'a bright bare lamp', 'a darkened room', 'her notebook'],
  steps: [
    'Put the lamp on a table and turn the other lights off. The lamp is the sun.',
    'Hold the ball up at arm’s length. Your head is the Earth and the ball is the moon.',
    'Turn slowly on the spot, keeping the ball up, and watch its lit part change.',
    'Stop when the ball looks fully lit. Where is the lamp — in front of you or behind?',
    'Stop when you can see no lit part at all. Where is the lamp now?',
    'Draw the ball at eight points around your turn.',
    'Write down whether your own head ever cast a shadow on the ball.'
  ],
  safety: 'Do not touch a hot bulb. Turn slowly in a clear space with nothing to trip on.',
  minutes: 16
};

const L45_LEDGER = {
  prompt: 'Your eight drawings around one full turn, and one sentence saying what is NOT causing the phases.',
  ifSheIsStuck:
    'Ask her whether her head shadowed the ball when she saw a crescent. It did not, and that rules the shadow answer out.'
};

// ============================================ LESSON 46 · NAMING THE PHASES
const L46_CHECK_IN = {
  title: 'Read your own month back',
  text: 'Open your moon log and look at every drawing you made, in date order.',
  question: 'Can you see a pattern? Does it start again anywhere?'
};

const L46_BEATS = [
  {
    n: 1,
    label: 'Five names, and every phase is one of them',
    hook: 'She has already drawn all of these. Now they get their proper names.',
    teachingText:
      'New means she cannot see any lit part. Crescent is a thin curved sliver. Quarter is exactly half a disc. Gibbous is more than half but not all. Full is the whole disc lit. Every drawing in her log is one of those five.',
    example:
      'The confusing one is quarter, which looks like a half. It is called quarter because the moon is a quarter of the way round its journey.',
    applyIt: {
      prompt: 'A moon that looks like exactly half a disc is called:',
      choices: ['Half', 'Quarter', 'Gibbous', 'Crescent'],
      answer: 1,
      feedback: [
        'That is what it looks like, and not what it is called.',
        null,
        'That is more than half.',
        'That is a thin sliver.'
      ],
      why: 'Quarter of the way round the journey, and half a disc to look at.'
    }
  },
  {
    n: 2,
    label: 'The pattern repeats, and that is what makes it a model',
    hook: 'Georgia does not ask her to memorise five words. It asks her to describe a repeating pattern from her own observations.',
    teachingText:
      'The phases run in the same order every month: new, crescent, quarter, gibbous, full, then back down through gibbous, quarter and crescent to new. Her own log shows it, and a record she gathered herself is worth more than a diagram she was handed.',
    example:
      'Her cloudy nights leave gaps, and the pattern is still obvious across them. That is what a real record looks like.',
    applyIt: {
      prompt: 'After a full moon, the next phase she will see is:',
      choices: ['New', 'Crescent', 'Gibbous', 'Quarter'],
      answer: 2,
      feedback: [
        'That comes about two weeks later.',
        'That comes after the quarter.',
        null,
        'That comes after the gibbous.'
      ],
      why: 'It comes back down the same ladder it went up.'
    }
  }
];

const L46_ACTIVITY = {
  title: 'Label the log and find the repeat',
  prep: 'Her moon log from Lesson 44, with a month of drawings in it.',
  needs: ['her completed moon log', 'coloured pencils', 'her notebook'],
  steps: [
    'Go through every drawing and write its phase name underneath: new, crescent, quarter, gibbous or full.',
    'Count how many nights were cloudy and note that number honestly.',
    'Find your full moon. Count the nights from there back to the last new moon.',
    'Now count forward from the full moon to the next new moon.',
    'Are those two counts about the same?',
    'Draw the whole cycle as a circle, with the five names around it in order.',
    'Write down how many days your own log says one full cycle took.'
  ],
  safety: 'None needed indoors. Any further moon watching keeps the grown-up rule from Lesson 44.',
  minutes: 16
};

const L46_LEDGER = {
  prompt: 'Your labelled log, your cycle drawn as a circle, and the number of days your own record gives for one cycle.',
  ifSheIsStuck:
    'If clouds took too many nights, the pattern is still there in what she has. Ask her to fill the gaps with a dotted outline and mark them as guesses.'
};

// ============================================ LESSON 47 · LONGER AND SHORTER DAYS
const L47_CHECK_IN = {
  title: 'What time did it get dark?',
  text: 'Think about supper time in June and supper time in December, at exactly the same hour on the clock.',
  question: 'One of them is in daylight and one is in the dark. Why, if the clock says the same thing?'
};

const L47_BEATS = [
  {
    n: 1,
    label: 'The amount of daylight changes through the year',
    hook: 'In June she could still be outside at nine. In December it is dark before supper.',
    teachingText:
      'The number of hours of daylight is not the same all year. It grows through spring to a longest day in June, shrinks through autumn to a shortest day in December, and does the same thing every year.',
    example:
      'On the longest day Georgia gets around fourteen hours of daylight. On the shortest it is closer to ten.',
    applyIt: {
      prompt: 'The longest day of the year in Georgia falls in:',
      choices: ['March', 'June', 'September', 'December'],
      answer: 1,
      feedback: [
        'Day and night are about equal then.',
        null,
        'About equal again then.',
        'That is the shortest.'
      ],
      why: 'Longest in June, shortest in December, equal in between.'
    }
  },
  {
    n: 2,
    label: 'The tilt decides how long the light lasts',
    hook: 'The Earth leans over, and it keeps leaning the same way all year.',
    teachingText:
      'The Earth is tilted, and that tilt stays pointing the same way as it travels round the sun. For half the year her side leans toward the sun and gets long days. For the other half it leans away and gets short ones.',
    example:
      'Tilt a ball toward a lamp and more of its top half is lit. Carry it round to the other side, still tilted the same way, and less is.',
    applyIt: {
      prompt: 'Her side of the Earth gets its longest days when it is tilted:',
      choices: ['Toward the sun', 'Away from the sun', 'Sideways to the sun', 'Not at all'],
      answer: 0,
      feedback: [
        null,
        'That gives the shortest days.',
        'That gives roughly equal ones.',
        'Without the tilt they would never change.'
      ],
      why: 'Leaning toward the light means more hours in it.'
    }
  }
];

const L47_ACTIVITY = {
  title: 'A year in four stops',
  prep: 'A ball with a knitting needle or pencil through it for the axis, and a lamp.',
  needs: ['a ball with a stick through it', 'a bright bare lamp', 'a darkened room', 'sticky notes', 'her notebook'],
  steps: [
    'Put the lamp in the middle of the table. That is the sun.',
    'Hold the ball with its stick leaning over, and keep that lean pointing the SAME WAY all the way round.',
    'Stop at four places around the lamp and mark them JUNE, SEPTEMBER, DECEMBER, MARCH.',
    'At each stop, look at the top half of the ball. How much of it is lit?',
    'Put a sticky dot on the ball where she lives and watch it at each stop.',
    'Now do the whole circuit again but let the lean wobble to point at the lamp each time.',
    'Write down what went wrong the second time, and why the lean must stay put.'
  ],
  safety: 'Do not touch a hot bulb. Keep the stick’s point away from faces.',
  minutes: 16
};

const L47_LEDGER = {
  prompt: 'Your four stops with how much of the top half was lit at each. Then say what would happen with no tilt at all.',
  ifSheIsStuck: 'With no tilt, every day everywhere would be the same length all year, and there would be no seasons.'
};

// ============================================ LESSON 48 · THE TILT AND THE FROST
const L48_CHECK_IN = {
  title: 'Why does she wait until April?',
  text: 'Every seed packet in the shed says something like "sow after the last frost". In Georgia that is usually late March or April.',
  question: 'The Earth is nearly the same distance from the sun all year. So why is there a frost date at all?'
};

const L48_BEATS = [
  {
    n: 1,
    label: 'Seasons are the tilt, not the distance',
    hook: 'We are very slightly CLOSER to the sun in January, which is the coldest month she has.',
    teachingText:
      'Seasons are not caused by moving nearer or further from the sun. They are caused by the tilt. When her side leans toward the sun, its light arrives more directly and for more hours, and that side warms up. When it leans away, the light comes in at a slant and there is less of it.',
    example:
      'Shine a torch straight down on paper and you get a small bright patch. Tilt it and the same light spreads out thin and weak.',
    applyIt: {
      prompt: 'Summer happens on her side of the Earth because that side is:',
      choices: ['Closer to the sun', 'Leaning toward the sun', 'Spinning faster', 'Facing the moon'],
      answer: 1,
      feedback: [
        'We are actually nearest in January.',
        null,
        'The spin is the same all year.',
        'The moon does not warm anything.'
      ],
      why: 'Tilt, not distance. This is the misconception the standard exists to fix.'
    }
  },
  {
    n: 2,
    label: 'That is where her frost dates come from',
    hook: 'Everything in this module comes back to a line on a seed packet.',
    teachingText:
      'Because the tilt is steady and the orbit repeats, the cold part of the year arrives at roughly the same time every year. That is why a gardener can be given a last frost date at all, and why she counts backwards from it to decide when to sow.',
    example:
      'She has been doing this in Herbalism all year: find the last frost date, count back the weeks a seed needs, and that is her sowing day.',
    applyIt: {
      prompt: 'A gardener can be given a last frost date because the seasons:',
      choices: ['Are decided by the weather report', 'Repeat at about the same time each year', 'Are different every single year', 'Depend on the moon'],
      answer: 1,
      feedback: [
        'Reports describe it; they do not set it.',
        null,
        'They shift a little, and the pattern holds.',
        'The moon does not set the seasons.'
      ],
      why: 'A steady tilt and a repeating orbit make the year predictable enough to plant by.'
    }
  }
];

const L48_ACTIVITY = {
  title: 'The torch, the slant, and her own frost date',
  prep: 'A torch, squared paper, and her Herbalism sowing notes if she has them.',
  needs: ['a torch', 'squared paper', 'a pencil', 'her Herbalism notes or a seed packet', 'her notebook'],
  steps: [
    'Shine the torch straight down onto the squared paper from about 30cm. Draw round the bright patch and count the squares.',
    'Now tilt the torch well over, same height, and draw round the patch again. Count those squares.',
    'Same torch, same light. Which patch got more light onto each square?',
    'Write down which one is like summer and which is like winter.',
    'Now find the last frost date for your area on a seed packet or in your Herbalism notes.',
    'Pick one seed and count backwards the weeks it needs before planting out.',
    'Write down the date you would sow it, and why the tilt is the reason that date exists.'
  ],
  safety: 'Do not shine the torch into eyes. NEVER look at the sun to compare — the torch does the whole job indoors.',
  minutes: 16
};

const L48_LEDGER = {
  prompt: 'Your two torch patches with their square counts, your last frost date, and your sowing date for one seed.',
  ifSheIsStuck:
    'The straight-down patch was small and bright; the tilted one was wide and weak. That is summer and winter, on a piece of squared paper.'
};

const SG8 = 'No Black American educator confirmed for elementary astronomy. Searches recorded in full on sl-m6-01, plus "African American educator moon phases for kids lesson" which returned Homeschool Pop and Fresberg Cartoon, neither identifiable. The space searches surfaced National Geographic on Katherine Johnson and "Coco & Shea Butter Kids — BLACK HEROES OF SPACE", both real and both BIOGRAPHICAL, and no lesson here is about a person. Recorded as a gap in the blueprint rather than as a gap closed, and flagged to Gigi. Open.';

export const SCIENCELAB_M8 = [
  {
    id: 'sl-m8-01', course: 'sciencelab', module: 8, quarter: 3, week: 7, day: 1, n: 43,
    title: 'The Earth spins — that is one day',
    minutes: 30, spec: '§10 · beats',
    concept: 'The Earth turns once every twenty-four hours, which makes day and night and swings every shadow round.',
    standards: ['S4E2a'], offGrade: null,
    words: ['spin', 'day', 'night', 'shadow'],
    glossary: [
      { word: 'spin', plain: 'To turn round on the spot. The Earth does it once a day.' },
      { word: 'day', plain: 'The half of the turn facing the sun.' },
      { word: 'night', plain: 'The half of the turn facing away.' },
      { word: 'shadow', plain: 'The place light could not reach. It swings round as the Earth turns.' }
    ],
    video: {
      id: 'MtRzy2TJAOQ', url: 'https://www.youtube.com/watch?v=MtRzy2TJAOQ',
      title: 'Day and Night – The Rotation of the Earth', channel: 'Next Generation Science',
      minutes: 4, verified: '2026-08-16',
      teaches: ['day', 'night', 'spin', 'Earth', 'sun'],
      sourceGap: SG8
    },
    checkIn: L43_CHECK_IN, beats: L43_BEATS, activity: L43_ACTIVITY, ledger: L43_LEDGER, hook: L43_CHECK_IN,
    core: L43_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L43_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What causes day and night?', answer: 'The Earth spinning once a day.', why: 'Nothing to do with going round the sun.' },
      { ask: 'When is her shadow shortest?', answer: 'Around midday.', why: 'Sun highest, shadow shortest.' }
    ],
    check: [
      { prompt: 'Day and night happen because the Earth:', choices: ['Moves round the sun', 'Spins round once a day', 'Moves closer and further away', 'Is covered by the moon'], answer: 1, feedback: ['That takes a year and makes seasons.', null, 'Its distance barely changes.', 'The moon covers almost nothing.'] },
      { prompt: 'Her chalked shadow is shortest at about:', choices: ['Sunrise', 'Midday', 'Sunset', 'Midnight'], answer: 1, feedback: ['One of the longest.', null, 'The other longest.', 'There is no shadow at all.'] },
      { prompt: 'The stick did not move and the sun did not move. What did?', choices: ['The chalk', 'The Earth', 'The shadow only', 'The weather'], answer: 1, feedback: ['She held the chalk.', null, 'The shadow moved because something else did.', 'Weather does not swing a shadow.'] }
    ]
  },
  {
    id: 'sl-m8-02', course: 'sciencelab', module: 8, quarter: 3, week: 7, day: 2, n: 44,
    title: 'The moon goes round us — that is one month',
    minutes: 30, spec: '§10 · beats',
    concept: 'The moon circles the Earth in about twenty-nine and a half days, and three separate motions give us the day, the month and the year.',
    standards: ['S4E2b'], offGrade: null,
    words: ['moon', 'month', 'orbit', 'Earth'],
    glossary: [
      { word: 'moon', plain: 'The world that travels round ours.' },
      { word: 'month', plain: 'About how long one trip round the Earth takes.' },
      { word: 'orbit', plain: 'Going round and round because a pull keeps bending the path.' },
      { word: 'Earth', plain: 'Our world. It spins, and it also circles the sun.' }
    ],
    video: {
      id: 'riMAITbLqZI', url: 'https://www.youtube.com/watch?v=riMAITbLqZI',
      title: 'The Sun, Earth, and Moon - Solar System for Kids', channel: 'Smile and Learn - English',
      minutes: 5, verified: '2026-08-16',
      teaches: ['moon', 'Earth', 'sun', 'orbit', 'month'],
      sourceGap: SG8
    },
    checkIn: L44_CHECK_IN, beats: L44_BEATS, activity: L44_ACTIVITY, ledger: L44_LEDGER, hook: L44_CHECK_IN,
    core: L44_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L44_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'How long does the moon take to circle us?', answer: 'About twenty-nine and a half days.', why: 'That is where the idea of a month came from.' },
      { ask: 'Which motion gives us the year?', answer: 'The Earth circling the sun.', why: 'Three motions, three units of time.' }
    ],
    check: [
      { prompt: 'The moon takes about how long to travel once round the Earth?', choices: ['One day', 'One week', 'About a month', 'One year'], answer: 2, feedback: ['That is one spin of the Earth.', 'About a quarter of the trip.', null, 'That is the Earth round the sun.'] },
      { prompt: 'Which motion gives us the year?', choices: ['The Earth spinning', 'The moon circling us', 'The Earth circling the sun', 'The sun spinning'], answer: 2, feedback: ['That gives the day.', 'That gives the month.', null, 'The sun spins and does not set our year.'] },
      { prompt: 'What holds the moon in its orbit around us?', choices: ['Earth’s gravity', 'The sun’s heat', 'The air between them', 'Nothing at all'], answer: 0, feedback: [null, 'Heat does not bend a path.', 'There is no air out there.', 'Something must bend it.'] }
    ]
  },
  {
    id: 'sl-m8-03', course: 'sciencelab', module: 8, quarter: 3, week: 7, day: 3, n: 45,
    title: 'Why the moon changes shape',
    minutes: 30, spec: '§10 · beats',
    concept: 'Half the moon is always lit, and the phases come from the angle she views that lit half from — not from the Earth’s shadow.',
    standards: ['S4E2b'], offGrade: null,
    words: ['phase', 'lit', 'angle', 'moon'],
    glossary: [
      { word: 'phase', plain: 'The shape of the lit part she can see.' },
      { word: 'lit', plain: 'Shone on by the sun. Half the moon always is.' },
      { word: 'angle', plain: 'The direction she is looking from.' },
      { word: 'moon', plain: 'The same round ball all month. Only her view changes.' }
    ],
    video: {
      id: 'BQvo7vyCmuE', url: 'https://www.youtube.com/watch?v=BQvo7vyCmuE',
      title: 'Phases Of The Moon | Why Does The Moon Change Its Shape? | Space | Dr Binocs Show | Peekaboo Kidz',
      channel: 'Peekaboo Kidz', minutes: 5, verified: '2026-08-16',
      teaches: ['phase', 'moon', 'lit', 'shape', 'sun'],
      sourceGap: SG8
    },
    checkIn: L45_CHECK_IN, beats: L45_BEATS, activity: L45_ACTIVITY, ledger: L45_LEDGER, hook: L45_CHECK_IN,
    core: L45_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L45_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'How much of the moon is lit at any moment?', answer: 'Always exactly half.', why: 'What changes is how much of that half she can see.' },
      { ask: 'Are phases the Earth’s shadow?', answer: 'No. That is an eclipse, and it is rare.', why: 'Phases are about the angle she looks from.' }
    ],
    check: [
      { prompt: 'How much of the moon is lit by the sun at any moment?', choices: ['All of it', 'Half of it', 'A quarter of it', 'It keeps changing'], answer: 1, feedback: ['The far side is always dark.', null, 'It is always exactly half.', 'The lit half never changes size.'] },
      { prompt: 'The phases of the moon are caused by:', choices: ['The Earth’s shadow on it', 'Clouds passing across it', 'The angle we see the lit half from', 'The moon changing shape'], answer: 2, feedback: ['That is an eclipse, and it is rare.', 'Clouds hide it rather than shape it.', null, 'It is the same ball all month.'] },
      { prompt: 'In the ball and lamp activity, her own head cast a shadow on the ball:', choices: ['Every single time', 'Only at the crescent', 'At the full moon', 'Almost never'], answer: 3, feedback: ['It hardly ever did.', 'It did not.', 'It did not then either.', null] }
    ]
  },
  {
    id: 'sl-m8-04', course: 'sciencelab', module: 8, quarter: 3, week: 8, day: 1, n: 46,
    title: 'Naming the phases, from her own month',
    minutes: 30, spec: '§10 · beats',
    concept: 'New, crescent, quarter, gibbous and full name every shape she drew, and her own log shows the pattern repeating.',
    standards: ['S4E2b'], offGrade: null,
    words: ['crescent', 'quarter', 'gibbous', 'full'],
    glossary: [
      { word: 'crescent', plain: 'A thin curved sliver of light.' },
      { word: 'quarter', plain: 'Exactly half a disc lit. Named for a quarter of the journey.' },
      { word: 'gibbous', plain: 'More than half lit, but not all.' },
      { word: 'full', plain: 'The whole disc lit.' }
    ],
    video: {
      id: 'Ie2WRraxdPs', url: 'https://www.youtube.com/watch?v=Ie2WRraxdPs',
      title: 'Phases of the Moon for Kids | Science for Elementary Students', channel: 'Homeschool Pop',
      minutes: 5, verified: '2026-08-16',
      teaches: ['phases', 'crescent', 'quarter', 'gibbous', 'full', 'new moon'],
      sourceGap: SG8
    },
    checkIn: L46_CHECK_IN, beats: L46_BEATS, activity: L46_ACTIVITY, ledger: L46_LEDGER, hook: L46_CHECK_IN,
    core: L46_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L46_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'Name the five phase words in order.', answer: 'New, crescent, quarter, gibbous, full.', why: 'Then back down the same ladder.' },
      { ask: 'Why is a half-looking moon called a quarter?', answer: 'It is a quarter of the way round its journey.', why: 'The name is about the trip, not the shape.' }
    ],
    check: [
      { prompt: 'A moon that looks like exactly half a disc is called:', choices: ['Half', 'Quarter', 'Gibbous', 'Crescent'], answer: 1, feedback: ['That is what it looks like, not what it is called.', null, 'That is more than half.', 'That is a thin sliver.'] },
      { prompt: 'After a full moon, the next phase she will see is:', choices: ['New', 'Crescent', 'Gibbous', 'Quarter'], answer: 2, feedback: ['That comes about two weeks later.', 'That comes after the quarter.', null, 'That comes after the gibbous.'] },
      { prompt: 'A phase where she can see no lit part at all is called:', choices: ['New', 'Crescent', 'Dark', 'Quarter'], answer: 0, feedback: [null, 'That is a thin sliver of light.', 'That is not one of the five names.', 'That is half a disc.'] }
    ]
  },
  {
    id: 'sl-m8-05', course: 'sciencelab', module: 8, quarter: 3, week: 8, day: 2, n: 47,
    title: 'Why the days get longer and shorter',
    minutes: 30, spec: '§10 · beats',
    concept: 'The steady tilt of the Earth means her side leans toward the sun for half the year and away for the other half, changing the hours of daylight.',
    standards: ['S4E2a'], offGrade: null,
    words: ['tilt', 'daylight', 'longest', 'shortest'],
    glossary: [
      { word: 'tilt', plain: 'The Earth leaning over, always the same way.' },
      { word: 'daylight', plain: 'The hours the sun is up.' },
      { word: 'longest', plain: 'The day in June with the most daylight.' },
      { word: 'shortest', plain: 'The day in December with the least.' }
    ],
    video: {
      id: 'EtfKyaOUO2E', url: 'https://www.youtube.com/watch?v=EtfKyaOUO2E',
      title: 'Why are the Days Longer in Summer? - Summer and Winter Solstice Video - Learning Junction',
      channel: 'learning junction', minutes: 5, verified: '2026-08-16',
      teaches: ['daylight', 'longest', 'shortest', 'tilt', 'summer'],
      sourceGap: SG8
    },
    checkIn: L47_CHECK_IN, beats: L47_BEATS, activity: L47_ACTIVITY, ledger: L47_LEDGER, hook: L47_CHECK_IN,
    core: L47_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L47_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'When is the longest day in Georgia?', answer: 'In June.', why: 'Shortest in December, roughly equal in between.' },
      { ask: 'What makes the daylight hours change?', answer: 'The Earth’s steady tilt.', why: 'Leaning toward the sun means more hours in the light.' }
    ],
    check: [
      { prompt: 'The longest day of the year in Georgia falls in:', choices: ['March', 'June', 'September', 'December'], answer: 1, feedback: ['Day and night are about equal then.', null, 'About equal again then.', 'That is the shortest.'] },
      { prompt: 'Her side of the Earth gets its longest days when it is tilted:', choices: ['Toward the sun', 'Away from the sun', 'Sideways to the sun', 'Not at all'], answer: 0, feedback: [null, 'That gives the shortest days.', 'That gives roughly equal ones.', 'Then they would never change.'] },
      { prompt: 'If the Earth had no tilt at all, the length of a day would:', choices: ['Change even more', 'Stay the same all year', 'Change only in winter', 'Depend on the moon'], answer: 1, feedback: ['The tilt is what makes it change.', null, 'There would be no winter to speak of.', 'The moon does not set it.'] }
    ]
  },
  {
    id: 'sl-m8-06', course: 'sciencelab', module: 8, quarter: 3, week: 8, day: 3, n: 48,
    title: 'The tilt, and Georgia’s frost dates',
    minutes: 30, spec: '§10 · beats',
    concept: 'Seasons come from the tilt rather than from distance, and a steady tilt with a repeating orbit is why a gardener can be given a last frost date.',
    standards: ['S4E2c'], offGrade: null,
    words: ['season', 'tilt', 'orbit', 'frost'],
    glossary: [
      { word: 'season', plain: 'Summer, autumn, winter or spring.' },
      { word: 'tilt', plain: 'The Earth leaning over, always the same way. This is what makes seasons.' },
      { word: 'orbit', plain: 'The Earth’s year-long trip round the sun.' },
      { word: 'frost', plain: 'A cold night that kills tender seedlings. Her sowing date counts back from the last one.' }
    ],
    video: {
      id: 'BHbMW-6zhlg', url: 'https://www.youtube.com/watch?v=BHbMW-6zhlg',
      title: 'What Causes the Seasons? - Earth’s Tilt and Seasons',
      channel: 'Miacademy & MiaPrep Learning Channel', minutes: 5, verified: '2026-08-16',
      teaches: ['season', 'tilt', 'Earth', 'orbit', 'sun'],
      sourceGap: SG8
    },
    checkIn: L48_CHECK_IN, beats: L48_BEATS, activity: L48_ACTIVITY, ledger: L48_LEDGER, hook: L48_CHECK_IN,
    core: L48_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L48_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What causes the seasons?', answer: 'The Earth’s tilt.', why: 'Not distance. We are nearest to the sun in January.' },
      { ask: 'Why can a seed packet give a last frost date?', answer: 'The seasons repeat at about the same time each year.', why: 'A steady tilt and a repeating orbit make the year predictable.' }
    ],
    check: [
      { prompt: 'Summer happens on her side of the Earth because that side is:', choices: ['Closer to the sun', 'Leaning toward the sun', 'Spinning faster', 'Facing the moon'], answer: 1, feedback: ['We are actually nearest in January.', null, 'The spin is the same all year.', 'The moon warms nothing.'] },
      { prompt: 'A gardener can be given a last frost date because the seasons:', choices: ['Are set by the weather report', 'Repeat at about the same time each year', 'Are different every single year', 'Depend on the moon'], answer: 1, feedback: ['Reports describe it, they do not set it.', null, 'They shift a little and the pattern holds.', 'The moon does not set the seasons.'] },
      { prompt: 'Tilting a torch away from straight-down spreads its light out and makes it:', choices: ['Brighter on each square', 'Weaker on each square', 'A different colour', 'Warmer overall'], answer: 1, feedback: ['Spreading it out cannot strengthen it.', null, 'The colour is the same.', 'It is the same torch.'] }
    ]
  }
];

export const SCIENCELAB_M8_META = {
  courseId: 'sciencelab',
  module: 8,
  title: 'The Moon, the Day and the Year',
  blurb:
    'Three motions and three units of time: the Earth spins and makes a day, the moon circles us and makes a month, and the Earth circles the sun and makes a year. She keeps a moon log for a month and names every shape in it — and the last lesson of the whole course explains why her seed packets have a frost date on them.'
};

export function m8LessonById(id) {
  return SCIENCELAB_M8.find((l) => l.id === id) || null;
}

export default SCIENCELAB_M8;
