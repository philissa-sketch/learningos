// ---------------------------------------------------------------------------
// SOCIAL STUDIES · MODULE 6 — GOING WEST, AND WHAT IT COST
//
// Weeks 3-4 of Quarter 2. Georgia: SS4H3c twice, SS4H3b twice.
//
// ---- THE TWO HALVES OF THIS MODULE ARE THE SAME EVENT ----
//
// Lessons 21 and 22 are people going west. Lessons 23 and 24 are what happened
// to the people already there. They are not separate topics and the module does
// not present them as such: the trail that carried one family carried the
// policy that removed another.
//
// ---- LESSON 23 IS GEORGIA'S OWN, AND IT SAYS SO ----
//
// Cherokee people were removed from THIS STATE. The Supreme Court said the
// removal was unlawful and it happened anyway. Gigi was asked whether she
// wanted that handled differently and said continue, so it is written plainly.
//
// The video is GPB Education's own "Tragedy in Georgia" — her state's public
// broadcaster telling her state's story. Nothing else found came close.
//
// ---- LESSON 24 USES A VIDEO FROM THE NATIVE AMERICAN PERSPECTIVE ----
//
// Deliberately. The standard's own wording asks for the IMPACT of expansion on
// American Indians, and most material on Little Bighorn is told from the other
// side of the field.
//
// ---- WHAT LESSON 22'S VIDEO DOES NOT COVER, STATED PLAINLY ----
//
// SS4H3c names Texas and the Alamo. The verified video covers the Oregon Trail
// and the Gold Rush and NOT the Alamo, so beat 1 carries Texas directly rather
// than pretending the video does. That is written in the video's sourceGap.
// ---------------------------------------------------------------------------

export const SOCIAL_M6_META = {
  courseId: 'social',
  module: 6,
  title: 'Going West, and What It Cost',
  blurb:
    'The Shoshone woman the expedition could not have done without, the trails and the gold that pulled families across a continent — and the people who were already there when they arrived.'
};

export const SOCIAL_M6 = [
  // -------------------------------------------------------------------------
  {
    id: 'ss-m6-01',
    course: 'social',
    module: 6,
    quarter: 2,
    week: 3,
    day: 1,
    n: 21,
    title: 'The woman the expedition needed',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'Sacagawea travelled the whole expedition carrying a baby, and it succeeded because of what she knew.',
    standards: ['SS4H3c'],
    offGrade: null,
    words: ['interpreter', 'nation', 'trade', 'guide'],
    glossary: [
      { word: 'interpreter', plain: 'Somebody who turns one language into another.' },
      { word: 'nation', plain: 'A people with their own land, laws and language.' },
      { word: 'trade', plain: 'Swapping goods, or buying and selling them.' },
      { word: 'guide', plain: 'Somebody who shows the way through country they know.' }
    ],
    video: {
      id: 'lS5xP6-H0JY',
      url: 'https://www.youtube.com/watch?v=lS5xP6-H0JY',
      title: 'Sacajawea for Kids | Bedtime History',
      channel: 'Bedtime History',
      minutes: 6,
      verified: '2026-08-17',
      teaches: ['Sacagawea', 'Shoshone', 'Lewis and Clark', 'interpreter', 'expedition'],
      sourceGap:
        'The spelling differs between sources — this video uses "Sacajawea" and the lesson uses "Sacagawea", which is the more common form in Georgia materials. Both are recorded rather than one quietly corrected. No Black American educator identified. Open.'
    },
    checkIn: {
      title: 'The person nobody writes down',
      text: 'A job gets done by four people. Two of them get named in the story afterwards.',
      question: 'What does that tell you about the story, rather than about the job?'
    },
    beats: [
      {
        n: 1,
        label: 'She knew what they did not',
        hook: 'Two army officers were leading. Neither could speak to anybody they met.',
        teachingText:
          'Sacagawea was Shoshone. She spoke languages the expedition needed and worked as an interpreter. She also knew which plants were safe to eat.',
        example:
          'When a boat tipped, she saved the journals and instruments floating away. Those records are why we know the journey at all.',
        applyIt: {
          prompt: 'An interpreter is somebody who turns one language into:',
          choices: ['Writing', 'Another', 'Music', 'A map'],
          answer: 1,
          feedback: [
            'That is not it.',
            null,
            'That is not it.',
            'That is not it.'
          ],
          why: 'The expedition could not have spoken to anybody without her.'
        }
      },
      {
        n: 2,
        label: 'And the horses came from her people',
        hook: 'The expedition reached mountains it could not cross on foot.',
        teachingText:
          'They needed horses from the Shoshone. The Shoshone leader turned out to be her brother. They got the horses and crossed.',
        example:
          'She carried her son the whole way. A group with a woman and a baby was read as peaceful, not as a war party.',
        applyIt: {
          prompt: 'The expedition needed horses in order to cross the:',
          choices: ['Sea', 'Mountains', 'Desert', 'Canal'],
          answer: 1,
          feedback: [
            'They did not sail.',
            null,
            'That was not the barrier.',
            'No canal existed.'
          ],
          why: 'Her people had the horses, and she could ask.'
        }
      }
    ],
    activity: {
      title: 'Say it without the words',
      prep: 'Nothing to buy. One other person.',
      needs: ['one other person', 'her notebook', 'six small objects'],
      steps: [
        'Choose six objects and hide them around one room.',
        'Now tell the other person where they are without using any words.',
        'Time how long it takes to find all six.',
        'Swap over and try it again the other way round.',
        'Write down which object was hardest to explain.',
        'Write one sentence about why an interpreter changes everything.'
      ],
      safety: 'Nothing hidden anywhere she has to climb to reach.',
      minutes: 12
    },
    ledger: {
      prompt:
        'Write three things Sacagawea did for the expedition. End with what happened when you had no words.',
      ifSheIsStuck:
        'Ask her how long six objects took without speaking. Now imagine a whole continent of strangers.'
    },
    hook: {
      title: 'The person nobody writes down',
      text: 'A job gets done by four people. Two of them get named in the story afterwards.',
      question: 'What does that tell you about the story, rather than about the job?'
    },
    core: [
      {
        heading: 'She knew what they did not',
        text: 'Sacagawea was Shoshone. She spoke languages the expedition needed and worked as an interpreter. She also knew which plants were safe to eat.'
      },
      {
        heading: 'And the horses came from her people',
        text: 'They needed horses from the Shoshone to cross the mountains. The Shoshone leader turned out to be her brother.'
      }
    ],
    doing:
      'Hide six objects in a room. Tell somebody where they are without using words, and time it. Swap over. Write down which object was hardest to explain.',
    practice: [
      {
        ask: 'What nation was Sacagawea from?',
        answer: 'The Shoshone.',
        why: 'Her people supplied the horses for the mountains.'
      },
      {
        ask: 'What is an interpreter?',
        answer: 'Somebody who turns one language into another.',
        why: 'The expedition could not have spoken to anybody without her.'
      }
    ],
    check: [
      {
        prompt: 'An interpreter turns one language into:',
        choices: ['Writing', 'Another', 'Music', 'A map'],
        answer: 1,
        feedback: ['Not it.', null, 'Not it.', 'Not it.']
      },
      {
        prompt: 'The expedition needed horses in order to cross the:',
        choices: ['Sea', 'Mountains', 'Desert', 'Canal'],
        answer: 1,
        feedback: ['They did not sail.', null, 'Not the barrier.', 'None existed.']
      },
      {
        prompt: 'When a boat tipped, Sacagawea saved the:',
        choices: ['Horses', 'Journals', 'Food', 'Guns'],
        answer: 1,
        feedback: ['Not in the boat.', null, 'Not what mattered most.', 'Not what she saved.']
      }
    ]
  },

  // -------------------------------------------------------------------------
  {
    id: 'ss-m6-02',
    course: 'social',
    module: 6,
    quarter: 2,
    week: 3,
    day: 2,
    n: 22,
    title: 'Trails, a fort, and gold',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'Three more pieces joined the country in three different ways: Texas by fighting, Oregon by walking, and California by gold.',
    standards: ['SS4H3c'],
    offGrade: null,
    words: ['trail', 'wagon', 'independence', 'rush'],
    glossary: [
      { word: 'trail', plain: 'A rough path made by people going the same way.' },
      { word: 'wagon', plain: 'A big cart pulled by animals.' },
      { word: 'independence', plain: 'Being free from the rule of another country.' },
      { word: 'rush', plain: 'A sudden crowd of people all going for one thing.' }
    ],
    video: {
      id: 'X4MV7vrtHXw',
      url: 'https://www.youtube.com/watch?v=X4MV7vrtHXw',
      title: 'The American Westward Expansion: Oregon Trail And Gold Rush',
      channel: 'KidsMathTV',
      minutes: 7,
      verified: '2026-08-17',
      teaches: ['Oregon Trail', 'Gold Rush', 'westward expansion', 'wagon', 'California'],
      sourceGap:
        '⚠️ THIS VIDEO DOES NOT COVER TEXAS OR THE ALAMO, which SS4H3c names. Beat 1 carries Texas directly rather than pretending it does. A separate Texas video for this age was not found in the westward-expansion search and the gap is recorded rather than papered over. No Black American educator identified. Open.'
    },
    checkIn: {
      title: 'Two thousand miles at walking speed',
      text: 'A wagon crossing to Oregon covered about fifteen miles on a good day. The trip took months.',
      question: 'What would you take, if everything had to fit in one wagon?'
    },
    beats: [
      {
        n: 1,
        label: 'Texas fought for it',
        hook: 'Texas was part of Mexico, and then it was not.',
        teachingText:
          'Settlers in Texas fought Mexico for independence. The Alamo was a mission where a small group held out and were killed. Texas later joined the United States.',
        example:
          '"Remember the Alamo" became a shout used to get people to keep fighting after a defeat.',
        applyIt: {
          prompt: 'Before it joined the United States, Texas was part of:',
          choices: ['Canada', 'Mexico', 'Spain only', 'France'],
          answer: 1,
          feedback: [
            'Canada is north.',
            null,
            'Spain ruled it much earlier.',
            'France sold Louisiana instead.'
          ],
          why: 'Settlers there fought Mexico for independence.'
        }
      },
      {
        n: 2,
        label: 'Oregon walked, California ran',
        hook: 'One took months of walking. The other took a rumour about gold.',
        teachingText:
          'Families crossed to Oregon in wagon trains along the Oregon Trail. Then gold was found in California in 1848, and a rush of people arrived at once.',
        example:
          'Mining towns grew in months. Many miners found nothing. The people selling shovels and food often did better.',
        applyIt: {
          prompt: 'The California Gold Rush began after gold was found in:',
          choices: ['1776', '1803', '1848', '1861'],
          answer: 2,
          feedback: [
            'That was the Declaration.',
            'That was the Purchase.',
            null,
            'That was the Civil War.'
          ],
          why: 'Within a year the crowds had arrived.'
        }
      }
    ],
    activity: {
      title: 'Pack one wagon',
      prep: 'Nothing to buy. A box and a list.',
      needs: ['a box or a drawn rectangle', 'paper', 'her notebook'],
      steps: [
        'Draw a rectangle the size of a wagon bed. Everything must fit inside it.',
        'List twenty things a family might want to take.',
        'Now cross out until only ten are left, and say why each one went.',
        'Ask a grown-up which of your ten they would drop first.',
        'Look up one thing real families abandoned on the trail.',
        'Write one sentence on what people threw away, and why.'
      ],
      safety: 'None needed. The packing is on paper.',
      minutes: 12
    },
    ledger: {
      prompt:
        'Write how Texas, Oregon and California each joined the country. End with the last thing you crossed off your wagon list.',
      ifSheIsStuck:
        'Ask her what she kept and what she dropped. Real families made that choice on the road, not before it.'
    },
    hook: {
      title: 'Two thousand miles at walking speed',
      text: 'A wagon crossing to Oregon covered about fifteen miles on a good day. The trip took months.',
      question: 'What would you take, if everything had to fit in one wagon?'
    },
    core: [
      {
        heading: 'Texas fought for it',
        text: 'Settlers in Texas fought Mexico for independence. The Alamo was a mission where a small group held out and were killed. Texas later joined the United States.'
      },
      {
        heading: 'Oregon walked, California ran',
        text: 'Families crossed to Oregon in wagon trains along the Oregon Trail. Then gold was found in California in 1848, and a rush of people arrived at once.'
      }
    ],
    doing:
      'Draw a rectangle the size of a wagon bed. List twenty things a family might take, then cross out until ten remain, saying why each went. Ask a grown-up which of the ten they would drop first.',
    practice: [
      {
        ask: 'What was the Alamo?',
        answer: 'A mission where a small group held out and were killed.',
        why: 'It happened during the fight for Texan independence.'
      },
      {
        ask: 'What brought crowds to California?',
        answer: 'Gold, found in 1848.',
        why: 'Mining towns grew in months.'
      }
    ],
    check: [
      {
        prompt: 'Before joining the United States, Texas was part of:',
        choices: ['Canada', 'Mexico', 'Spain only', 'France'],
        answer: 1,
        feedback: ['Canada is north.', null, 'Spain ruled much earlier.', 'France sold Louisiana.']
      },
      {
        prompt: 'The California Gold Rush began after gold was found in:',
        choices: ['1776', '1803', '1848', '1861'],
        answer: 2,
        feedback: ['The Declaration.', 'The Purchase.', null, 'The Civil War.']
      },
      {
        prompt: 'Families crossed to Oregon in groups called wagon:',
        choices: ['Rushes', 'Trains', 'Forts', 'Trails'],
        answer: 1,
        feedback: ['Not the word.', null, 'Not the word.', 'The path, not the group.']
      }
    ]
  },

  // -------------------------------------------------------------------------
  {
    id: 'ss-m6-03',
    course: 'social',
    module: 6,
    quarter: 2,
    week: 4,
    day: 1,
    n: 23,
    title: 'Removed from her own state',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'Cherokee people were forced off their land in Georgia and marched west, after the highest court in the country said it was unlawful.',
    standards: ['SS4H3b'],
    offGrade: null,
    words: ['removal', 'treaty', 'unlawful', 'march'],
    glossary: [
      { word: 'removal', plain: 'Being forced to leave a place.' },
      { word: 'treaty', plain: 'A written agreement between two nations.' },
      { word: 'unlawful', plain: 'Against the law.' },
      { word: 'march', plain: 'A long walk people are made to take.' }
    ],
    video: {
      id: 'avYd7wanDmU',
      url: 'https://www.youtube.com/watch?v=avYd7wanDmU',
      title: 'Tragedy in Georgia: The Trail of Tears | Georgia Stories',
      channel: 'GPB Education',
      minutes: 6,
      verified: '2026-08-17',
      teaches: ['Trail of Tears', 'Cherokee', 'Georgia', 'Indian Removal', 'Andrew Jackson'],
      sourceGap:
        'CHOSEN OVER FOUR ALTERNATIVES BECAUSE IT IS GEORGIA PUBLIC BROADCASTING TELLING GEORGIA’S OWN STORY. This happened in her state. No Black American educator identified for the Trail of Tears; the requirement that matters most here is a Cherokee or Native voice, and none was confirmed in the four results. Recorded as an open gap of a different kind.'
    },
    checkIn: {
      title: 'A court said no, and it happened anyway',
      text: 'The highest court in the country ruled that a thing was against the law. The thing was done regardless.',
      question: 'What is a law worth if nobody enforces it?'
    },
    beats: [
      {
        n: 1,
        label: 'The Cherokee lived here',
        hook: 'This is not a story from far away. It happened in Georgia.',
        teachingText:
          'The Cherokee nation held land across north Georgia. They had a written language, a newspaper, farms and a constitution of their own.',
        example:
          'Sequoyah made a way of writing Cherokee. Within a few years many Cherokee people could read and write it.',
        applyIt: {
          prompt: 'The Cherokee nation held land in the north of:',
          choices: ['Texas', 'Georgia', 'Oregon', 'Maine'],
          answer: 1,
          feedback: [
            'Not there.',
            null,
            'Not there.',
            'Not there.'
          ],
          why: 'The removal happened in her own state.'
        }
      },
      {
        n: 2,
        label: 'And they were made to leave',
        hook: 'The Supreme Court said Georgia could not take Cherokee land. The removal went ahead.',
        teachingText:
          'Soldiers forced Cherokee families from their homes in 1838 and marched them west. Thousands died on the way. It is called the Trail of Tears.',
        example:
          'Some walked more than a thousand miles in winter. Families were taken with what they could carry.',
        applyIt: {
          prompt: 'The Supreme Court ruled that taking Cherokee land was:',
          choices: ['Fair', 'Unlawful', 'Needed', 'Cheap'],
          answer: 1,
          feedback: [
            'It did not say that.',
            null,
            'It did not say that.',
            'It did not say that.'
          ],
          why: 'And the removal happened anyway.'
        }
      }
    ],
    activity: {
      title: 'A thousand miles, measured',
      prep: 'Nothing to buy. A map and something to measure with.',
      needs: ['a map of the United States or a screen', 'her notebook', 'a ruler or string'],
      steps: [
        'Find north Georgia on a map. Mark it.',
        'Now find Oklahoma and mark that too.',
        'Measure the distance between them using the map scale.',
        'Work out how many days that is at ten miles a day.',
        'Write the number down and read it out loud.',
        'Write one sentence about walking it in winter with what you could carry.'
      ],
      safety: 'This one is heavy. A grown-up stays for it and it ends with a conversation.',
      minutes: 12
    },
    ledger: {
      prompt:
        'Write what the Trail of Tears was and where it started. End with the number of days you worked out.',
      ifSheIsStuck:
        'Ask her to say the number of days again. That is the part that is hard to hold, and it should be.'
    },
    hook: {
      title: 'A court said no, and it happened anyway',
      text: 'The highest court in the country ruled that a thing was against the law. The thing was done regardless.',
      question: 'What is a law worth if nobody enforces it?'
    },
    core: [
      {
        heading: 'The Cherokee lived here',
        text: 'The Cherokee nation held land across north Georgia. They had a written language, a newspaper, farms and a constitution of their own.'
      },
      {
        heading: 'And they were made to leave',
        text: 'Soldiers forced Cherokee families from their homes in 1838 and marched them west. Thousands died on the way. It is called the Trail of Tears.'
      }
    ],
    doing:
      'Find north Georgia and Oklahoma on a map and mark both. Measure the distance using the scale. Work out how many days that is at ten miles a day, and write the number down.',
    practice: [
      {
        ask: 'Where did the Trail of Tears begin?',
        answer: 'In Georgia and the states around it.',
        why: 'The Cherokee nation held land across north Georgia.'
      },
      {
        ask: 'What did the Supreme Court say about taking that land?',
        answer: 'That it was unlawful.',
        why: 'The removal happened anyway.'
      }
    ],
    check: [
      {
        prompt: 'The Cherokee nation held land in the north of:',
        choices: ['Texas', 'Georgia', 'Oregon', 'Maine'],
        answer: 1,
        feedback: ['Not there.', null, 'Not there.', 'Not there.']
      },
      {
        prompt: 'The Supreme Court ruled that taking Cherokee land was:',
        choices: ['Fair', 'Unlawful', 'Needed', 'Cheap'],
        answer: 1,
        feedback: ['It did not say that.', null, 'It did not say that.', 'It did not say that.']
      },
      {
        prompt: 'The forced march west in 1838 is called the:',
        choices: ['Oregon Trail', 'Trail of Tears', 'Gold Rush', 'Erie Canal'],
        answer: 1,
        feedback: ['That was different.', null, 'That was different.', 'That was different.']
      }
    ]
  },

  // -------------------------------------------------------------------------
  {
    id: 'ss-m6-04',
    course: 'social',
    module: 6,
    quarter: 2,
    week: 4,
    day: 2,
    n: 24,
    title: 'A battle won, and a system that came anyway',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'American Indian nations won at Little Bighorn and were still pushed onto reservations, because the pressure was policy rather than one battle.',
    standards: ['SS4H3b'],
    offGrade: null,
    words: ['reservation', 'policy', 'plains', 'bison'],
    glossary: [
      { word: 'reservation', plain: 'Land set aside where a nation was made to live.' },
      { word: 'policy', plain: 'A plan a government follows again and again.' },
      { word: 'plains', plain: 'Wide flat grassland.' },
      { word: 'bison', plain: 'The huge grazing animal of the plains.' }
    ],
    video: {
      id: '06UxXJ3yJ-E',
      url: 'https://www.youtube.com/watch?v=06UxXJ3yJ-E',
      title: 'THE BATTLE OF LITTLE BIGHORN 1876 | From the Native American perspective.',
      channel: 'LMAP',
      minutes: 6,
      verified: '2026-08-17',
      teaches: ['Little Bighorn', 'Lakota', 'Sitting Bull', 'Custer', 'plains'],
      sourceGap:
        'CHOSEN DELIBERATELY FOR ITS PERSPECTIVE. SS4H3b asks for the IMPACT of expansion on American Indians, and most Little Bighorn material is told from the other side of the field. Channel identity is unknown and recorded as unknown — the title states the perspective, which is not the same as confirming who made it. A Learn Bright video on Sitting Bull (KEcLitMbgms) is verified and held. Open.'
    },
    checkIn: {
      title: 'Winning the day and losing the year',
      text: 'One side wins a fight completely. A year later they have less than before it.',
      question: 'How can winning a battle leave you worse off?'
    },
    beats: [
      {
        n: 1,
        label: 'Little Bighorn was a defeat for the army',
        hook: 'In 1876 Lakota and Cheyenne fighters destroyed a United States cavalry force.',
        teachingText:
          'Sitting Bull and Crazy Horse led. Custer and his men were killed. It was one of the worst defeats the army suffered in the west.',
        example:
          'The victory was complete and it did not last. More soldiers came, and there were far more of them.',
        applyIt: {
          prompt: 'At Little Bighorn in 1876 the United States army was:',
          choices: ['Victorious', 'Defeated', 'Absent', 'At peace'],
          answer: 1,
          feedback: [
            'It was not.',
            null,
            'It was there.',
            'It was a battle.'
          ],
          why: 'One of the worst defeats the army suffered in the west.'
        }
      },
      {
        n: 2,
        label: 'The reservations came regardless',
        hook: 'A reservation is not a place people chose. It is where they were put.',
        teachingText:
          'Nations were moved onto reservations, land set aside and usually poor. The bison herds they lived on were hunted almost to nothing.',
        example:
          'Take away the herds and you take away the food, the clothing and the trade at once. That was understood at the time.',
        applyIt: {
          prompt: 'A reservation is land that was:',
          choices: ['Bought freely', 'Set aside for a nation', 'Left empty', 'Given as a gift'],
          answer: 1,
          feedback: [
            'It was not a free choice.',
            null,
            'People were made to live there.',
            'It was not a gift.'
          ],
          why: 'Set aside by a government, not chosen by the people moved there.'
        }
      }
    ],
    activity: {
      title: 'Draw the two maps',
      prep: 'Nothing to buy. Two sheets of paper.',
      needs: ['two sheets of paper', 'a pencil', 'her notebook'],
      steps: [
        'On the first sheet, draw a wide rectangle and shade nearly all of it.',
        'That is roughly the land American Indian nations held in 1800.',
        'On the second sheet, draw the same rectangle.',
        'Now shade only a few small patches for the reservations.',
        'Put the two sheets side by side and look at them.',
        'Write down what changed between the two pictures, and how.'
      ],
      safety: 'A grown-up looks at the two sheets with her and talks about it.',
      minutes: 12
    },
    ledger: {
      prompt:
        'Write who won at Little Bighorn and what happened afterwards. End with what your two maps showed.',
      ifSheIsStuck:
        'Ask her which sheet was quicker to draw. The second one takes almost no shading at all.'
    },
    hook: {
      title: 'Winning the day and losing the year',
      text: 'One side wins a fight completely. A year later they have less than before it.',
      question: 'How can winning a battle leave you worse off?'
    },
    core: [
      {
        heading: 'Little Bighorn was a defeat for the army',
        text: 'In 1876 Lakota and Cheyenne fighters destroyed a United States cavalry force. Sitting Bull and Crazy Horse led. Custer and his men were killed.'
      },
      {
        heading: 'The reservations came regardless',
        text: 'Nations were moved onto reservations, land set aside and usually poor. The bison herds they lived on were hunted almost to nothing.'
      }
    ],
    doing:
      'Draw a wide rectangle and shade nearly all of it — the land held in 1800. Draw the same rectangle again and shade only a few small patches for reservations. Put them side by side.',
    practice: [
      {
        ask: 'Who won at Little Bighorn?',
        answer: 'Lakota and Cheyenne fighters.',
        why: 'It was a complete defeat for the army.'
      },
      {
        ask: 'What is a reservation?',
        answer: 'Land set aside where a nation was made to live.',
        why: 'It was not chosen by the people moved there.'
      }
    ],
    check: [
      {
        prompt: 'At Little Bighorn in 1876 the United States army was:',
        choices: ['Victorious', 'Defeated', 'Absent', 'At peace'],
        answer: 1,
        feedback: ['It was not.', null, 'It was there.', 'It was a battle.']
      },
      {
        prompt: 'A reservation is land that was:',
        choices: ['Bought freely', 'Set aside for a nation', 'Left empty', 'Given as a gift'],
        answer: 1,
        feedback: ['Not a free choice.', null, 'People lived there.', 'Not a gift.']
      },
      {
        prompt: 'The plains nations depended most on herds of:',
        choices: ['Sheep', 'Bison', 'Horses', 'Cattle'],
        answer: 1,
        feedback: ['Not the herds.', null, 'Useful, but not food.', 'Not the herds.']
      }
    ]
  }
];

export function m6LessonById(id) {
  return SOCIAL_M6.find((l) => l.id === id) || null;
}

export default SOCIAL_M6;
