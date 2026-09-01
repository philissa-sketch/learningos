// ---------------------------------------------------------------------------
// SOCIAL STUDIES · MODULE 7 — READING THE COUNTRY
//
// Weeks 5-6 of Quarter 2. Georgia: SS4G1a, SS4G1b, SS4G2b, SS4E1a.
//
// The map lessons come AFTER the expansion lessons on purpose. She has spent
// four lessons watching people cross this country. Now she learns what they
// were crossing, and why some routes existed and others did not.
//
// Lesson 28 turns the corner into economics, and it does it with the same
// families. Opportunity cost taught with a shopping example is a definition.
// Opportunity cost taught with a wagon somebody actually had to unload is a
// decision she can feel.
// ---------------------------------------------------------------------------

export const SOCIAL_M7_META = {
  courseId: 'social',
  module: 7,
  title: 'Reading the Country',
  blurb:
    'The plains, the divide, the great river and the lakes — then the places people built, the mountains that stopped them, and the first real question of economics: what did going west cost the people who went?'
};

export const SOCIAL_M7 = [
  {
    id: 'ss-m7-01',
    course: 'social',
    module: 7,
    quarter: 2,
    week: 5,
    day: 1,
    n: 25,
    title: 'What the land actually looks like',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'Six named features shape the whole country: a coastal plain, the great plains, a divide, a gulf, a river and the lakes.',
    standards: ['SS4G1a'],
    offGrade: null,
    words: ['plain', 'divide', 'gulf', 'basin'],
    glossary: [
      { word: 'plain', plain: 'A wide piece of flat land.' },
      { word: 'divide', plain: 'A high line that sends rivers two different ways.' },
      { word: 'gulf', plain: 'A large part of the sea reaching into land.' },
      { word: 'basin', plain: 'All the land whose water drains into one river.' }
    ],
    video: {
      id: 'K_wNWLZuTZQ',
      url: 'https://www.youtube.com/watch?v=K_wNWLZuTZQ',
      title: 'Eight Major Physical Features Of The U.S.A.',
      channel: 'Megan McGuire',
      minutes: 3,
      verified: '2026-08-17',
      teaches: ['Great Plains', 'Continental Divide', 'Mississippi', 'Great Lakes', 'Coastal Plain'],
      sourceGap:
        'It covers eight features where Georgia names six, so it is a superset rather than an exact fit — recorded rather than glossed. Channel identity is unknown and recorded as unknown. An Instructomania alternative runs 14:02, too long for the block. No Black American educator identified. Open.'
    },
    checkIn: {
      title: 'Which way does the water go?',
      text: 'Rain falls on a hill. Some of it runs down one side and some down the other.',
      question: 'Could two raindrops landing a step apart end up in different seas?'
    },
    beats: [
      {
        n: 1,
        label: 'Flat in the middle, high in the west',
        hook: 'The country is not the same shape all the way across.',
        teachingText:
          'The Atlantic Coastal Plain runs along the east. The Great Plains are the wide flat grassland in the middle. The Rockies rise in the west.',
        example:
          'Georgia sits on the coastal plain and the hills above it. That is why her soil changes as she drives north.',
        applyIt: {
          prompt: 'The Great Plains are best described as wide:',
          choices: ['Forests', 'Flat grassland', 'Mountains', 'Swamps'],
          answer: 1,
          feedback: ['Not forest.', null, 'Those are the Rockies.', 'Not swamp.'],
          why: 'The bison herds lived on them.'
        }
      },
      {
        n: 2,
        label: 'And the water tells you where you are',
        hook: 'The Continental Divide decides which ocean a raindrop reaches.',
        teachingText:
          'West of the divide, water runs to the Pacific. East of it, water runs towards the Mississippi and the Gulf of Mexico. The Great Lakes hold fresh water in the north.',
        example:
          'The Mississippi drains a basin covering much of the country. That is why New Orleans mattered so much.',
        applyIt: {
          prompt: 'The Continental Divide decides which way rivers:',
          choices: ['Freeze', 'Flow', 'Flood', 'Dry'],
          answer: 1,
          feedback: ['Not what it does.', null, 'Not what it does.', 'Not what it does.'],
          why: 'One side goes to the Pacific, the other towards the Gulf.'
        }
      }
    ],
    activity: {
      title: 'Six features, one map',
      prep: 'Nothing to buy. A blank map or a hand-drawn outline.',
      needs: ['a blank map of the United States, or paper', 'coloured pencils', 'her notebook'],
      steps: [
        'Draw or print an outline of the country.',
        'Mark and label the Atlantic Coastal Plain along the east.',
        'Shade the Great Plains in the middle and draw the Continental Divide.',
        'Draw the Mississippi River and the Gulf of Mexico.',
        'Add the Great Lakes in the north and label all six.',
        'Write down which feature was hardest to place, and why.'
      ],
      safety: 'None needed. Keep the map — she uses it again next lesson.',
      minutes: 12
    },
    ledger: {
      prompt:
        'Name the six features you labelled. End with the one you had to look up twice.',
      ifSheIsStuck:
        'Ask her to trace the Mississippi with one finger and say where it ends. That is the Gulf.'
    },
    hook: {
      title: 'Which way does the water go?',
      text: 'Rain falls on a hill. Some of it runs down one side and some down the other.',
      question: 'Could two raindrops landing a step apart end up in different seas?'
    },
    core: [
      {
        heading: 'Flat in the middle, high in the west',
        text: 'The Atlantic Coastal Plain runs along the east. The Great Plains are the wide flat grassland in the middle. The Rockies rise in the west.'
      },
      {
        heading: 'And the water tells you where you are',
        text: 'West of the divide, water runs to the Pacific. East of it, water runs towards the Mississippi and the Gulf of Mexico.'
      }
    ],
    doing:
      'Draw an outline of the country. Label the Atlantic Coastal Plain, shade the Great Plains, draw the Continental Divide, the Mississippi, the Gulf and the Great Lakes.',
    practice: [
      { ask: 'What are the Great Plains?', answer: 'Wide flat grassland in the middle of the country.', why: 'The bison herds lived on them.' },
      { ask: 'What does the Continental Divide do?', answer: 'It decides which way rivers flow.', why: 'One side to the Pacific, the other towards the Gulf.' }
    ],
    check: [
      { prompt: 'The Great Plains are best described as wide:', choices: ['Forests', 'Flat grassland', 'Mountains', 'Swamps'], answer: 1, feedback: ['Not forest.', null, 'Those are the Rockies.', 'Not swamp.'] },
      { prompt: 'The Continental Divide decides which way rivers:', choices: ['Freeze', 'Flow', 'Flood', 'Dry'], answer: 1, feedback: ['Not it.', null, 'Not it.', 'Not it.'] },
      { prompt: 'A gulf is a large part of the sea reaching into:', choices: ['Sky', 'Land', 'Ice', 'Cloud'], answer: 1, feedback: ['Not it.', null, 'Not it.', 'Not it.'] }
    ]
  },

  {
    id: 'ss-m7-02',
    course: 'social',
    module: 7,
    quarter: 2,
    week: 5,
    day: 2,
    n: 26,
    title: 'The places people built',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'Cities and canals were built where they were for a reason, and the Erie Canal changed which city grew biggest.',
    standards: ['SS4G1b'],
    offGrade: null,
    words: ['canal', 'port', 'capital', 'route'],
    glossary: [
      { word: 'canal', plain: 'A waterway dug by people for boats.' },
      { word: 'port', plain: 'A place where ships load and unload.' },
      { word: 'capital', plain: 'The city where a government meets.' },
      { word: 'route', plain: 'The path goods or people take.' }
    ],
    video: {
      id: 'KDBY6sXt3_4',
      url: 'https://www.youtube.com/watch?v=KDBY6sXt3_4',
      title: 'Erie Canal History (1825) | The Waterway That Built America | DAILY BELLRINGER',
      channel: 'The Daily Bellringer',
      minutes: 5,
      verified: '2026-08-17',
      teaches: ['Erie Canal', 'New York', 'Great Lakes', 'trade route', 'canal'],
      sourceGap:
        'Georgia names six built features and this video covers the canal in depth rather than all six. The other five are carried in beat 1 and on her map. No Black American educator identified; searched "Erie Canal for kids history". Open.'
    },
    checkIn: {
      title: 'Why is a town where it is?',
      text: 'Nobody puts a town somewhere at random. There is always a reason underneath it.',
      question: 'Name one reason a town might grow in one spot and not a mile away.'
    },
    beats: [
      {
        n: 1,
        label: 'Six places, six reasons',
        hook: 'Every one of these is where it is because of water, or a decision, or a battle.',
        teachingText:
          'New York, Boston and Philadelphia are ports. Washington D.C. was chosen as a capital. Gettysburg is remembered for a battle. The Erie Canal was dug.',
        example:
          'Philadelphia was the biggest city in the country when the Constitution was written there.',
        applyIt: {
          prompt: 'Washington D.C. exists mainly because it was:',
          choices: ['A port', 'Chosen as a capital', 'A battle site', 'A gold field'],
          answer: 1,
            feedback: ['Not why.', null, 'Not why.', 'Not why.'],
          why: 'It was planned as a capital rather than grown as a town.'
        }
      },
      {
        n: 2,
        label: 'And a ditch made New York',
        hook: 'The Erie Canal is a man-made river, and it decided which city got rich.',
        teachingText:
          'Opened in 1825, it linked the Great Lakes to the Hudson River and so to New York. Grain from the west could reach the sea cheaply.',
        example:
          'Before the canal, moving goods overland cost far more than sending them by water.',
        applyIt: {
          prompt: 'The Erie Canal linked the Great Lakes to:',
          choices: ['The Gulf', 'New York', 'Texas', 'Oregon'],
          answer: 1,
          feedback: ['Wrong direction.', null, 'Far away.', 'Far away.'],
          why: 'And that is why New York grew biggest.'
        }
      }
    ],
    activity: {
      title: 'Add the built things to your map',
      prep: 'Nothing to buy. The map from last lesson.',
      needs: ['her map from lesson 25', 'coloured pencils', 'her notebook'],
      steps: [
        'Take out your map from last lesson.',
        'Mark New York, Boston, Philadelphia and Washington D.C.',
        'Mark Gettysburg and draw the Erie Canal as a line to the lakes.',
        'For each one, write a single word for why it is there.',
        'Circle the two that are there because of water.',
        'Write one sentence on why New York grew biggest of all.'
      ],
      safety: 'None needed. Keep the map for Quarter 3.',
      minutes: 12
    },
    ledger: {
      prompt:
        'Write why the Erie Canal mattered. End with the one word you gave each of the six places.',
      ifSheIsStuck:
        'Ask her how grain from Ohio reached the sea before 1825, and how it did afterwards.'
    },
    hook: {
      title: 'Why is a town where it is?',
      text: 'Nobody puts a town somewhere at random. There is always a reason underneath it.',
      question: 'Name one reason a town might grow in one spot and not a mile away.'
    },
    core: [
      { heading: 'Six places, six reasons', text: 'New York, Boston and Philadelphia are ports. Washington D.C. was chosen as a capital. Gettysburg is remembered for a battle. The Erie Canal was dug.' },
      { heading: 'And a ditch made New York', text: 'Opened in 1825, the Erie Canal linked the Great Lakes to the Hudson River and so to New York. Grain from the west could reach the sea cheaply.' }
    ],
    doing:
      'Take out your map. Mark New York, Boston, Philadelphia, Washington D.C. and Gettysburg, and draw the Erie Canal. Write one word for why each is there and circle the two built for water.',
    practice: [
      { ask: 'What is a canal?', answer: 'A waterway dug by people for boats.', why: 'The Erie Canal is the famous one.' },
      { ask: 'Why did New York grow biggest?', answer: 'The canal brought western goods to its port.', why: 'Water carried goods far more cheaply than roads.' }
    ],
    check: [
      { prompt: 'Washington D.C. exists mainly because it was:', choices: ['A port', 'Chosen as a capital', 'A battle site', 'A gold field'], answer: 1, feedback: ['Not why.', null, 'Not why.', 'Not why.'] },
      { prompt: 'The Erie Canal linked the Great Lakes to:', choices: ['The Gulf', 'New York', 'Texas', 'Oregon'], answer: 1, feedback: ['Wrong way.', null, 'Far away.', 'Far away.'] },
      { prompt: 'A port is a place where ships:', choices: ['Are built only', 'Load and unload', 'Are painted', 'Are hidden'], answer: 1, feedback: ['Not only.', null, 'Not it.', 'Not it.'] }
    ]
  },

  {
    id: 'ss-m7-03',
    course: 'social',
    module: 7,
    quarter: 2,
    week: 6,
    day: 1,
    n: 27,
    title: 'What stopped them and what carried them',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'Between 1801 and 1861 mountains slowed people down and rivers, gaps and passes let them through.',
    standards: ['SS4G2b'],
    offGrade: null,
    words: ['barrier', 'gateway', 'pass', 'gap'],
    glossary: [
      { word: 'barrier', plain: 'Something that blocks the way.' },
      { word: 'gateway', plain: 'A way through a barrier.' },
      { word: 'pass', plain: 'A low route between two mountains.' },
      { word: 'gap', plain: 'A break in a ridge that people can walk through.' }
    ],
    video: {
      id: 'MPrrDJM_GWE',
      url: 'https://www.youtube.com/watch?v=MPrrDJM_GWE',
      title: 'Into the Frontier - Barriers, Policies & the Push for Westward Expansion',
      channel: 'Miacademy',
      minutes: 8,
      verified: '2026-08-17',
      teaches: ['barriers', 'gateways', 'Appalachians', 'westward expansion', 'rivers'],
      sourceGap:
        'A Bow Tie Guy and Wife video titled exactly for this element exists (g0_d9LqYjX4) but runs 56 seconds, too short to teach a lesson. It is verified and held as a closer. No Black American educator identified. Open.'
    },
    checkIn: {
      title: 'The long way round',
      text: 'You want to reach the other side of something big. Straight over is impossible.',
      question: 'What do you look for instead of a straight line?'
    },
    beats: [
      {
        n: 1,
        label: 'The Appalachians came first',
        hook: 'Before the Rockies there was a much older wall much closer to home.',
        teachingText:
          'The Appalachian Mountains run down the east and held settlement near the coast for years. People looked for gaps rather than climbing over.',
        example:
          'The Cumberland Gap is a low break in the ridge. Thousands of families walked through it.',
        applyIt: {
          prompt: 'A gap is a break in a ridge that people can:',
          choices: ['Climb', 'Walk through', 'Sail round', 'Fly over'],
          answer: 1,
          feedback: ['That is the hard way.', null, 'Not on land.', 'Not then.'],
          why: 'The Cumberland Gap is the famous one.'
        }
      },
      {
        n: 2,
        label: 'Rivers were roads',
        hook: 'Before good roads existed, the cheapest way to move anything was to float it.',
        teachingText:
          'The Ohio and Mississippi rivers carried people and goods west and south. A river is a gateway. A mountain range is a barrier.',
        example:
          'Steamboats made rivers work in both directions. Before them, going upstream was very slow.',
        applyIt: {
          prompt: 'For people moving west, a river usually acted as a:',
          choices: ['Barrier', 'Gateway', 'Wall', 'Border only'],
          answer: 1,
          feedback: ['Not usually.', null, 'That is a barrier.', 'Not only that.'],
          why: 'Floating was far cheaper than hauling.'
        }
      }
    ],
    activity: {
      title: 'Barrier or gateway?',
      prep: 'Nothing to buy. The map, and eight small cards.',
      needs: ['her map', 'eight cards or paper squares', 'her notebook'],
      steps: [
        'Write one feature on each card: Appalachians, Rockies, Ohio River, Mississippi River.',
        'Add four more: Cumberland Gap, Great Plains, Great Lakes, Gulf of Mexico.',
        'Make two piles: barrier, and gateway.',
        'Sort all eight, guessing where you are unsure.',
        'Ask a grown-up about any that could be both, and why.',
        'Write down which card was hardest to place.'
      ],
      safety: 'None needed.',
      minutes: 12
    },
    ledger: {
      prompt:
        'Write the difference between a barrier and a gateway. End with the card that could be both.',
      ifSheIsStuck:
        'Ask her whether the Great Plains helped or hindered. Flat is easy to cross and has almost no water.'
    },
    hook: {
      title: 'The long way round',
      text: 'You want to reach the other side of something big. Straight over is impossible.',
      question: 'What do you look for instead of a straight line?'
    },
    core: [
      { heading: 'The Appalachians came first', text: 'The Appalachian Mountains run down the east and held settlement near the coast for years. People looked for gaps rather than climbing over.' },
      { heading: 'Rivers were roads', text: 'The Ohio and Mississippi rivers carried people and goods west and south. A river is a gateway. A mountain range is a barrier.' }
    ],
    doing:
      'Write eight features on cards. Make two piles, barrier and gateway, and sort all eight. Ask a grown-up about any that could be both.',
    practice: [
      { ask: 'What is a gateway?', answer: 'A way through a barrier.', why: 'A gap or a river both count.' },
      { ask: 'Name a barrier settlers met early.', answer: 'The Appalachian Mountains.', why: 'They held settlement near the coast for years.' }
    ],
    check: [
      { prompt: 'A gap is a break in a ridge that people can:', choices: ['Climb', 'Walk through', 'Sail round', 'Fly over'], answer: 1, feedback: ['The hard way.', null, 'Not on land.', 'Not then.'] },
      { prompt: 'For people moving west, a river usually acted as a:', choices: ['Barrier', 'Gateway', 'Wall', 'Border only'], answer: 1, feedback: ['Not usually.', null, 'That is a barrier.', 'Not only.'] },
      { prompt: 'A barrier is something that:', choices: ['Helps you', 'Blocks the way', 'Carries goods', 'Marks a town'], answer: 1, feedback: ['Opposite.', null, 'That is a gateway.', 'Not it.'] }
    ]
  },

  {
    id: 'ss-m7-04',
    course: 'social',
    module: 7,
    quarter: 2,
    week: 6,
    day: 2,
    n: 28,
    title: 'What going west cost',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'Every choice gives something up, and the thing given up is called the opportunity cost.',
    standards: ['SS4E1a'],
    offGrade: null,
    words: ['choice', 'cost', 'scarce', 'trade-off'],
    glossary: [
      { word: 'choice', plain: 'Picking one thing when you cannot have both.' },
      { word: 'cost', plain: 'What something takes from you.' },
      { word: 'scarce', plain: 'There is not enough of it for everyone.' },
      { word: 'trade-off', plain: 'Getting one thing by giving up another.' }
    ],
    video: {
      id: 'SmuztM-WfuE',
      url: 'https://www.youtube.com/watch?v=SmuztM-WfuE',
      title: 'Scarcity and Opportunity Cost for kids',
      channel: 'Theteacherlab',
      minutes: 4,
      verified: '2026-08-17',
      teaches: ['opportunity cost', 'scarcity', 'choice', 'trade-off', 'economics'],
      sourceGap:
        'A PragerU Kids video on economic decisions was in this search and is NOT used. Channel identity unknown for the chosen video and recorded as unknown. No Black American educator identified. Open.'
    },
    checkIn: {
      title: 'You can have one',
      text: 'There is time to do exactly one thing this afternoon, and you want to do two.',
      question: 'What does choosing the first one cost you?'
    },
    beats: [
      {
        n: 1,
        label: 'Choosing means losing',
        hook: 'The cost of a thing is not only what you pay. It is what you gave up.',
        teachingText:
          'When you pick one thing you cannot have the other. The next best thing you gave up is the opportunity cost.',
        example:
          'Spend an hour reading and the opportunity cost is the hour of gardening you did not do.',
        applyIt: {
          prompt: 'Opportunity cost is the next best thing you:',
          choices: ['Bought', 'Gave up', 'Found', 'Sold'],
          answer: 1,
          feedback: ['Not it.', null, 'Not it.', 'Not it.'],
          why: 'Every choice has one, even a free one.'
        }
      },
      {
        n: 2,
        label: 'The families on the trail chose too',
        hook: 'Every item left beside the Oregon Trail was somebody making that choice.',
        teachingText:
          'A family going west gave up a farm, a house, and everybody they knew. On the road they gave up furniture to keep the wagon light enough.',
        example:
          'Trails were littered with abandoned goods. Each one was a decision made under pressure.',
        applyIt: {
          prompt: 'Things are scarce when there is not enough for:',
          choices: ['One person', 'Everyone', 'A week', 'A wagon'],
          answer: 1,
          feedback: ['Not the meaning.', null, 'Not the meaning.', 'Not the meaning.'],
          why: 'Space in a wagon was scarce, so things were left.'
        }
      }
    ],
    activity: {
      title: 'Price your own afternoon',
      prep: 'Nothing to buy. Paper and honesty.',
      needs: ['paper', 'a pencil', 'her notebook'],
      steps: [
        'List five things you would like to do this afternoon.',
        'Now choose one. Cross out the rest.',
        'Beside your choice, write the one you would most like to have kept.',
        'That crossed-out thing is your opportunity cost. Label it.',
        'Do the same for one thing a grown-up chose today.',
        'Write one sentence about the family who left a table beside the trail.'
      ],
      safety: 'None needed.',
      minutes: 12
    },
    ledger: {
      prompt:
        'Write what opportunity cost means. Then write yours from this afternoon, and why it was hard.',
      ifSheIsStuck:
        'Ask her what she nearly chose instead. That is the answer, and it is always the second favourite.'
    },
    hook: {
      title: 'You can have one',
      text: 'There is time to do exactly one thing this afternoon, and you want to do two.',
      question: 'What does choosing the first one cost you?'
    },
    core: [
      { heading: 'Choosing means losing', text: 'When you pick one thing you cannot have the other. The next best thing you gave up is the opportunity cost.' },
      { heading: 'The families on the trail chose too', text: 'A family going west gave up a farm, a house, and everybody they knew. On the road they gave up furniture to keep the wagon light.' }
    ],
    doing:
      'List five things you would like to do this afternoon. Choose one and cross out the rest. Write beside it the one you would most like to have kept, and label that your opportunity cost.',
    practice: [
      { ask: 'What is opportunity cost?', answer: 'The next best thing you gave up.', why: 'Every choice has one.' },
      { ask: 'What does scarce mean?', answer: 'There is not enough for everyone.', why: 'Wagon space was scarce on the trail.' }
    ],
    check: [
      { prompt: 'Opportunity cost is the next best thing you:', choices: ['Bought', 'Gave up', 'Found', 'Sold'], answer: 1, feedback: ['Not it.', null, 'Not it.', 'Not it.'] },
      { prompt: 'Things are scarce when there is not enough for:', choices: ['One person', 'Everyone', 'A week', 'A wagon'], answer: 1, feedback: ['Not it.', null, 'Not it.', 'Not it.'] },
      { prompt: 'A trade-off means getting one thing by giving up:', choices: ['Nothing', 'Another', 'Money only', 'Time only'], answer: 1, feedback: ['Then it is free.', null, 'Not only money.', 'Not only time.'] }
    ]
  }
];

export function m7LessonById(id) {
  return SOCIAL_M7.find((l) => l.id === id) || null;
}

export default SOCIAL_M7;
