// ---------------------------------------------------------------------------
// SOCIAL STUDIES · MODULE 5 — THE COUNTRY GROWS
//
// Weeks 1-2 of Quarter 2. Georgia: SS4H3a twice, SS4H3c twice.
//
// ---- QUARTER 2 READING RAMP ----
//
// Cap goes from eleven words a sentence to TWELVE, and the long-word cap from
// 6% to 7%. Small steps on purpose: by November she has had a term of
// instruction, not a year of it.
//
// ---- WHY SS4H3a IS TWO LESSONS ----
//
// Georgia names the burning of the Capitol AND the White House AND the writing
// of The Star Spangled Banner in one element. Two videos exist and they teach
// different halves — American Battlefield Trust on the burning, Free School on
// Fort McHenry and the song. Two videos, two lessons.
//
// ---- AND WHY QUARTER 2 HAS TWO MORE LESSONS THAN THE BLUEPRINT ----
//
// The blueprint gave SS4E1c specialization and SS4E1d voluntary exchange their
// own lessons. NO USABLE VIDEO EXISTS FOR EITHER at an elementary level that is
// not from an advocacy organisation — Learn Liberty and the Foundation for
// Economic Education were the only on-topic results, and they are excluded on
// the same rule as PragerU. Under the v3.24 rule that is a re-cut.
//
// Both folded into the trade lesson in Module 8, where Georgia's own wording
// puts them: SS4E1 asks for these concepts "to illustrate historical events",
// not to stand alone. The two freed lessons came here and to Module 6, where
// four verified videos were already waiting and being wasted.
// ---------------------------------------------------------------------------

export const SOCIAL_M5_META = {
  courseId: 'social',
  module: 5,
  title: 'The Country Grows',
  blurb:
    'A second war with Britain that burned the Capitol and produced a song, then a purchase that doubled the country overnight and the two men sent to find out what was in it.'
};

export const SOCIAL_M5 = [
  // -------------------------------------------------------------------------
  {
    id: 'ss-m5-01',
    course: 'social',
    module: 5,
    quarter: 2,
    week: 1,
    day: 1,
    n: 17,
    title: 'The year they burned the Capitol',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'In 1814 British troops marched into Washington and set the Capitol and the White House on fire.',
    standards: ['SS4H3a'],
    offGrade: null,
    words: ['capitol', 'invade', 'evacuate', 'treaty'],
    glossary: [
      { word: 'capitol', plain: 'The building where Congress meets.' },
      { word: 'invade', plain: 'To enter a country by force.' },
      { word: 'evacuate', plain: 'To leave a place quickly because of danger.' },
      { word: 'treaty', plain: 'A written agreement that ends a war.' }
    ],
    video: {
      id: 'zk8c9DARWiI',
      url: 'https://www.youtube.com/watch?v=zk8c9DARWiI',
      title: 'The Burning of Washington: The War of 1812 in Four Minutes',
      channel: 'American Battlefield Trust',
      minutes: 4,
      verified: '2026-08-17',
      teaches: ['War of 1812', 'burning of Washington', 'Capitol', 'White House', 'British troops'],
      sourceGap:
        'PragerU Kids appeared in this search with a Francis Scott Key video and is NOT used — an advocacy organisation with a stated political position is not a neutral educational publisher, and the exclusion is written down rather than quietly applied. No Black American educator identified for the War of 1812 at an elementary level. Open.'
    },
    checkIn: {
      title: 'The second time',
      text: 'America had already beaten Britain once. Thirty years later they were fighting again.',
      question: 'Does winning a war once mean it is finished for good?'
    },
    beats: [
      {
        n: 1,
        label: 'Britain came back',
        hook: 'The Revolution ended in 1783. By 1812 the two countries were at war again.',
        teachingText:
          'Britain was stopping American ships and taking their sailors. America declared war in 1812. It is sometimes called the second war of independence.',
        example:
          'The new country was small and its navy was tiny. Britain had the strongest navy in the world.',
        applyIt: {
          prompt: 'The War of 1812 was fought against:',
          choices: ['France', 'Britain', 'Spain', 'Mexico'],
          answer: 1,
          feedback: [
            'France was an ally in the last war.',
            null,
            'Spain was not the enemy.',
            'Mexico came later.'
          ],
          why: 'The same country, thirty years on.'
        }
      },
      {
        n: 2,
        label: 'And they burned the capital',
        hook: 'In August 1814 British soldiers walked into Washington and set fire to it.',
        teachingText:
          'They burned the Capitol and the White House. The president had to evacuate. His wife Dolley Madison saved a portrait of Washington before she left.',
        example:
          'A storm put much of the fire out that same night. The buildings were repaired and used again.',
        applyIt: {
          prompt: 'In 1814 British troops burned the White House and the:',
          choices: ['Erie Canal', 'Capitol', 'Alamo', 'Statue of Liberty'],
          answer: 1,
          feedback: [
            'That was not built yet.',
            null,
            'That is in Texas.',
            'That came much later.'
          ],
          why: 'The two most important buildings in the capital.'
        }
      }
    ],
    activity: {
      title: 'What would you carry out?',
      prep: 'Nothing to buy. One bag and five minutes.',
      needs: ['a bag or box', 'her notebook', 'a timer', 'a grown-up'],
      steps: [
        'Set a timer for five minutes. Pretend you must leave the house now.',
        'Put in the bag only what fits and only what you could carry.',
        'Write down every item and why you chose it.',
        'Ask a grown-up what they would have chosen instead.',
        'Look up what Dolley Madison saved, and write why she chose it.',
        'Write one sentence about what a country saves when it has to run.'
      ],
      safety: 'Nothing is actually packed away. Everything goes back afterwards.',
      minutes: 12
    },
    ledger: {
      prompt:
        'Write what happened in Washington in 1814. Then write what you put in your bag, and why.',
      ifSheIsStuck:
        'Ask her whether she chose things that were useful or things that mattered. Dolley Madison chose a painting.'
    },
    hook: {
      title: 'The second time',
      text: 'America had already beaten Britain once. Thirty years later they were fighting again.',
      question: 'Does winning a war once mean it is finished for good?'
    },
    core: [
      {
        heading: 'Britain came back',
        text: 'Britain was stopping American ships and taking their sailors. America declared war in 1812. It is sometimes called the second war of independence.'
      },
      {
        heading: 'And they burned the capital',
        text: 'They burned the Capitol and the White House. The president had to evacuate. Dolley Madison saved a portrait of Washington before she left.'
      }
    ],
    doing:
      'Set a timer for five minutes and pack one bag as if you had to leave now. Write every item and why. Ask a grown-up what they would choose. Look up what Dolley Madison saved.',
    practice: [
      {
        ask: 'Who did America fight in the War of 1812?',
        answer: 'Britain.',
        why: 'The same country as the Revolution, thirty years later.'
      },
      {
        ask: 'What did British troops burn in 1814?',
        answer: 'The Capitol and the White House.',
        why: 'The two most important buildings in the capital.'
      }
    ],
    check: [
      {
        prompt: 'The War of 1812 was fought against:',
        choices: ['France', 'Britain', 'Spain', 'Mexico'],
        answer: 1,
        feedback: ['France was an ally before.', null, 'Not Spain.', 'Mexico came later.']
      },
      {
        prompt: 'In 1814 British troops burned the White House and the:',
        choices: ['Erie Canal', 'Capitol', 'Alamo', 'Statue of Liberty'],
        answer: 1,
        feedback: ['Not built yet.', null, 'That is in Texas.', 'Much later.']
      },
      {
        prompt: 'To evacuate means to leave a place because of:',
        choices: ['Boredom', 'Danger', 'Rain', 'Cost'],
        answer: 1,
        feedback: ['Not the meaning.', null, 'Not the meaning.', 'Not the meaning.']
      }
    ]
  },

  // -------------------------------------------------------------------------
  {
    id: 'ss-m5-02',
    course: 'social',
    module: 5,
    quarter: 2,
    week: 1,
    day: 2,
    n: 18,
    title: 'A song written while a fort was shelled',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'Francis Scott Key watched a night of bombardment from a ship and wrote a poem that became the national anthem.',
    standards: ['SS4H3a'],
    offGrade: null,
    words: ['anthem', 'bombard', 'fort', 'banner'],
    glossary: [
      { word: 'anthem', plain: 'The official song of a country.' },
      { word: 'bombard', plain: 'To fire at something for a long time.' },
      { word: 'fort', plain: 'A strong building made to defend a place.' },
      { word: 'banner', plain: 'A flag, especially a large one.' }
    ],
    video: {
      id: 'Umg8v6DLZjs',
      url: 'https://www.youtube.com/watch?v=Umg8v6DLZjs',
      title:
        'The History of the Star-Spangled Banner for Kids: Francis Scott Key and Fort McHenry - FreeSchool',
      channel: 'Free School',
      minutes: 3,
      verified: '2026-08-17',
      teaches: ['Star-Spangled Banner', 'Francis Scott Key', 'Fort McHenry', 'flag', 'anthem'],
      sourceGap:
        'No Black American educator identified for the writing of the national anthem at an elementary level. Searched "War of 1812 for kids Star Spangled Banner burning of Washington" — four usable results and one PragerU Kids video, which is not used. Channel identity unknown and recorded as unknown. Open.'
    },
    checkIn: {
      title: 'Watching all night for one thing',
      text: 'You are stuck somewhere in the dark. You cannot do anything. You can only watch one thing and wait.',
      question: 'What would you be watching for, and how would you feel at sunrise?'
    },
    beats: [
      {
        n: 1,
        label: 'A whole night of noise',
        hook: 'Francis Scott Key spent a night on a ship, watching a fort being shelled.',
        teachingText:
          'British ships bombarded Fort McHenry near Baltimore for twenty-five hours. Key was on a ship nearby and could not leave.',
        example:
          'While the shelling continued, he could see the fort had not surrendered. When it stopped, he did not know.',
        applyIt: {
          prompt: 'Francis Scott Key watched the bombardment of:',
          choices: ['Fort Sumter', 'Fort McHenry', 'the Alamo', 'the Capitol'],
          answer: 1,
          feedback: [
            'That was a later war.',
            null,
            'That is in Texas.',
            'That was burned, not shelled.'
          ],
          why: 'A fort guarding Baltimore harbour.'
        }
      },
      {
        n: 2,
        label: 'And a flag still there at dawn',
        hook: 'At first light he looked for the flag, and it was still flying.',
        teachingText:
          'He wrote a poem about that moment. It was set to music and became The Star Spangled Banner, the national anthem.',
        example:
          'The whole poem is really one long question, and the answer is a flag he can see.',
        applyIt: {
          prompt: 'The Star Spangled Banner became the country’s:',
          choices: ['Flag', 'Anthem', 'Motto', 'Seal'],
          answer: 1,
          feedback: [
            'The flag is in the song.',
            null,
            'A motto is a short phrase.',
            'A seal is a stamp.'
          ],
          why: 'A poem about one night became the official song.'
        }
      }
    ],
    activity: {
      title: 'Write the sunrise',
      prep: 'Nothing to buy. Paper and a pencil.',
      needs: ['paper', 'a pencil', 'her notebook'],
      steps: [
        'Think of a night you waited for something and did not know the answer.',
        'Write four lines about the waiting. Do not say what happened.',
        'Now write two lines about the moment you found out.',
        'Read the six lines out loud and listen to where they change.',
        'Find the first verse of the anthem and look for the same turn.',
        'Write down where in the anthem the answer arrives.'
      ],
      safety: 'A grown-up agrees the memory first if it was a hard one.',
      minutes: 12
    },
    ledger: {
      prompt:
        'Write who Francis Scott Key was and what he saw. Then write the line of your own poem you like best.',
      ifSheIsStuck:
        'Ask her what she was looking for at the end of her night. He was looking for a flag.'
    },
    hook: {
      title: 'Watching all night for one thing',
      text: 'You are stuck somewhere in the dark. You cannot do anything. You can only watch one thing and wait.',
      question: 'What would you be watching for, and how would you feel at sunrise?'
    },
    core: [
      {
        heading: 'A whole night of noise',
        text: 'British ships bombarded Fort McHenry near Baltimore for twenty-five hours. Key was on a ship nearby and could not leave.'
      },
      {
        heading: 'And a flag still there at dawn',
        text: 'He wrote a poem about that moment. It was set to music and became The Star Spangled Banner, the national anthem.'
      }
    ],
    doing:
      'Think of a night you waited without knowing the answer. Write four lines about the waiting without saying what happened, then two about finding out. Find the same turn in the anthem.',
    practice: [
      {
        ask: 'What fort did Francis Scott Key watch?',
        answer: 'Fort McHenry, near Baltimore.',
        why: 'It was shelled for twenty-five hours.'
      },
      {
        ask: 'What did his poem become?',
        answer: 'The Star Spangled Banner, the national anthem.',
        why: 'It was set to music afterwards.'
      }
    ],
    check: [
      {
        prompt: 'Francis Scott Key watched the bombardment of:',
        choices: ['Fort Sumter', 'Fort McHenry', 'the Alamo', 'the Capitol'],
        answer: 1,
        feedback: ['A later war.', null, 'That is in Texas.', 'That was burned.']
      },
      {
        prompt: 'The Star Spangled Banner became the country’s:',
        choices: ['Flag', 'Anthem', 'Motto', 'Seal'],
        answer: 1,
        feedback: ['The flag is in the song.', null, 'A motto is a phrase.', 'A seal is a stamp.']
      },
      {
        prompt: 'At dawn Key looked for and saw the:',
        choices: ['Ships', 'Flag', 'Sun', 'Harbour'],
        answer: 1,
        feedback: ['Not what he sought.', null, 'Not what he sought.', 'Not what he sought.']
      }
    ]
  },

  // -------------------------------------------------------------------------
  {
    id: 'ss-m5-03',
    course: 'social',
    module: 5,
    quarter: 2,
    week: 2,
    day: 1,
    n: 19,
    title: 'Doubling the country with a signature',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'In 1803 the United States bought a piece of land from France that doubled the size of the country.',
    standards: ['SS4H3c'],
    offGrade: null,
    words: ['purchase', 'territory', 'border', 'double'],
    glossary: [
      { word: 'purchase', plain: 'Something bought with money.' },
      { word: 'territory', plain: 'A large area of land a country holds.' },
      { word: 'border', plain: 'The line where one country stops.' },
      { word: 'double', plain: 'To become twice as big.' }
    ],
    video: {
      id: 'TCCP4MCy0Ck',
      url: 'https://www.youtube.com/watch?v=TCCP4MCy0Ck',
      title:
        'The Louisiana Purchase for Kids: Facts About the Louisiana Purchase for Children - FreeSchool',
      channel: 'Free School',
      minutes: 6,
      verified: '2026-08-17',
      teaches: ['Louisiana Purchase', 'Thomas Jefferson', 'France', 'territory', 'Mississippi'],
      sourceGap:
        'No Black American educator identified for the Louisiana Purchase at an elementary level. Searched "Louisiana Purchase for kids explained" — four usable results, channel identity unknown for the chosen video and recorded as unknown. Open.'
    },
    checkIn: {
      title: 'Buying something you have never seen',
      text: 'Somebody offers to sell you a huge piece of land. Nobody selling it has walked across it either.',
      question: 'What would you want to know before you agreed?'
    },
    beats: [
      {
        n: 1,
        label: 'They only meant to buy a city',
        hook: 'Jefferson sent people to buy one port. France offered the whole thing.',
        teachingText:
          'America wanted New Orleans, because whoever held it controlled the Mississippi River. France offered all of Louisiana instead.',
        example:
          'France needed money for its own wars in Europe, and could not defend the land anyway.',
        applyIt: {
          prompt: 'The United States first wanted to buy just:',
          choices: ['Texas', 'New Orleans', 'California', 'Florida'],
          answer: 1,
          feedback: [
            'Texas came later.',
            null,
            'California came later.',
            'Florida was Spanish.'
          ],
          why: 'Whoever held it controlled the river.'
        }
      },
      {
        n: 2,
        label: 'And the country doubled',
        hook: 'One agreement in 1803 made the country twice the size it had been.',
        teachingText:
          'The Louisiana Purchase added a vast territory stretching north and west. Almost none of it had been mapped by the buyers.',
        example:
          'People already lived there. American Indian nations had held that land for a very long time, and were not asked.',
        applyIt: {
          prompt: 'The Louisiana Purchase made the country:',
          choices: ['Smaller', 'Twice as big', 'Ten times bigger', 'The same size'],
          answer: 1,
          feedback: [
            'It grew.',
            null,
            'Not that much.',
            'It changed a great deal.'
          ],
          why: 'One signature, and the map was different.'
        }
      }
    ],
    activity: {
      title: 'Double it on paper',
      prep: 'Nothing to buy. Paper, a pencil and a ruler if she has one.',
      needs: ['paper', 'a pencil', 'a map of the United States or a screen', 'her notebook'],
      steps: [
        'Draw a rough shape for the country as it was in 1800, along the east coast.',
        'Now draw a second shape beside it that is about the same size.',
        'That second shape is the Louisiana Purchase. Label it.',
        'Find the Mississippi River on a real map and mark it on your drawing.',
        'Write down why New Orleans mattered so much.',
        'Write one sentence about who was already living on the land.'
      ],
      safety: 'None needed. Keep the drawing for Module 6.',
      minutes: 12
    },
    ledger: {
      prompt:
        'Write what the Louisiana Purchase was and why America wanted New Orleans. End with who was not asked.',
      ifSheIsStuck:
        'Ask her to trace the river on her drawing. Everything grown upstream had to come down it to reach the sea.'
    },
    hook: {
      title: 'Buying something you have never seen',
      text: 'Somebody offers to sell you a huge piece of land. Nobody selling it has walked across it either.',
      question: 'What would you want to know before you agreed?'
    },
    core: [
      {
        heading: 'They only meant to buy a city',
        text: 'America wanted New Orleans, because whoever held it controlled the Mississippi River. France offered all of Louisiana instead.'
      },
      {
        heading: 'And the country doubled',
        text: 'The Louisiana Purchase added a vast territory stretching north and west. Almost none of it had been mapped by the buyers.'
      }
    ],
    doing:
      'Draw the country as it was in 1800 along the east coast. Draw a second shape the same size beside it and label it the Louisiana Purchase. Find the Mississippi on a real map and mark it.',
    practice: [
      {
        ask: 'Who did America buy Louisiana from?',
        answer: 'France, in 1803.',
        why: 'France needed money and could not defend it.'
      },
      {
        ask: 'Why did America want New Orleans?',
        answer: 'Whoever held it controlled the Mississippi River.',
        why: 'Everything grown upstream had to come down it.'
      }
    ],
    check: [
      {
        prompt: 'The United States first wanted to buy just:',
        choices: ['Texas', 'New Orleans', 'California', 'Florida'],
        answer: 1,
        feedback: ['Texas came later.', null, 'California came later.', 'Florida was Spanish.']
      },
      {
        prompt: 'The Louisiana Purchase made the country:',
        choices: ['Smaller', 'Twice as big', 'Ten times bigger', 'The same size'],
        answer: 1,
        feedback: ['It grew.', null, 'Not that much.', 'It changed a great deal.']
      },
      {
        prompt: 'The Louisiana Purchase happened in the year:',
        choices: ['1776', '1803', '1814', '1861'],
        answer: 1,
        feedback: ['That was the Declaration.', null, 'That was the burning.', 'That was the war.']
      }
    ]
  },

  // -------------------------------------------------------------------------
  {
    id: 'ss-m5-04',
    course: 'social',
    module: 5,
    quarter: 2,
    week: 2,
    day: 2,
    n: 20,
    title: 'Two men sent to find out',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'Lewis and Clark were sent to cross the new territory, map it, and write down everything they saw.',
    standards: ['SS4H3c'],
    offGrade: null,
    words: ['expedition', 'journal', 'specimen', 'route'],
    glossary: [
      { word: 'expedition', plain: 'A long journey made for a purpose.' },
      { word: 'journal', plain: 'A record written day by day.' },
      { word: 'specimen', plain: 'A sample of a plant or animal, kept to study.' },
      { word: 'route', plain: 'The path taken from one place to another.' }
    ],
    video: {
      id: '91IbDuiJNdM',
      url: 'https://www.youtube.com/watch?v=91IbDuiJNdM',
      title:
        'Lewis and Clark for Kids | Learn about the Louis and Clark expedition and the Louisiana Purchase',
      channel: 'Learn Bright',
      minutes: 10,
      verified: '2026-08-17',
      teaches: ['Lewis and Clark', 'expedition', 'Louisiana Purchase', 'Sacagawea', 'mapping'],
      sourceGap:
        'TWO PragerU Kids videos were in the top four of this search and NEITHER is used. Both are on Lewis and Clark specifically, so this exclusion cost real options here — recorded rather than hidden. No Black American educator identified. Open.'
    },
    checkIn: {
      title: 'Write down everything',
      text: 'You are sent somewhere nobody you know has been. Your job is not to change it. It is to record it.',
      question: 'What would be hardest about that job?'
    },
    beats: [
      {
        n: 1,
        label: 'Their job was to write it down',
        hook: 'They were not sent to conquer anything. They were sent to describe it.',
        teachingText:
          'Jefferson sent Meriwether Lewis and William Clark in 1804. They were to map a route, record plants and animals, and meet the nations living there.',
        example:
          'They kept journals almost every day and brought back specimens and drawings.',
        applyIt: {
          prompt: 'The main job of the expedition was to:',
          choices: ['Build towns', 'Record and map', 'Collect taxes', 'Fight battles'],
          answer: 1,
          feedback: [
            'They built nothing.',
            null,
            'No taxes were collected.',
            'That was not the errand.'
          ],
          why: 'Journals, maps, plants and animals.'
        }
      },
      {
        n: 2,
        label: 'And it would have failed without Sacagawea',
        hook: 'A Shoshone woman travelled with them, carrying a baby, and the journey depended on her.',
        teachingText:
          'Sacagawea knew plants, spoke languages the men did not, and helped them get horses. A group travelling with a woman and child was read as peaceful.',
        example:
          'She is on her own lesson next week, because one paragraph is not enough for what she did.',
        applyIt: {
          prompt: 'Sacagawea helped the expedition most by:',
          choices: ['Rowing boats', 'Drawing maps', 'Guiding and translating', 'Writing journals'],
          answer: 2,
          feedback: [
            'Not her main help.',
            'The men drew those.',
            null,
            'The men kept those.'
          ],
          why: 'She spoke languages they did not, and knew the land.'
        }
      }
    ],
    activity: {
      title: 'Keep an expedition journal',
      prep: 'Nothing to buy. A short walk outdoors.',
      needs: ['her notebook', 'a pencil', 'a grown-up for the walk'],
      steps: [
        'Walk a route you know well. Go slowly.',
        'Write down every plant and animal you can see, even the boring ones.',
        'Draw one of them carefully rather than quickly.',
        'Note where the ground rises, falls or gets wet.',
        'At home, draw a rough map of the route from memory.',
        'Compare your map to the real path and write what you got wrong.'
      ],
      safety: 'A grown-up goes on the walk. Nothing is picked or tasted.',
      minutes: 14
    },
    ledger: {
      prompt:
        'Write what Lewis and Clark were sent to do. Then write the one thing your own map got wrong.',
      ifSheIsStuck:
        'Ask her how hard the map was for a path she already knew. Now imagine a route nobody had drawn.'
    },
    hook: {
      title: 'Write down everything',
      text: 'You are sent somewhere nobody you know has been. Your job is not to change it. It is to record it.',
      question: 'What would be hardest about that job?'
    },
    core: [
      {
        heading: 'Their job was to write it down',
        text: 'Jefferson sent Meriwether Lewis and William Clark in 1804. They were to map a route, record plants and animals, and meet the nations living there.'
      },
      {
        heading: 'And it would have failed without Sacagawea',
        text: 'Sacagawea knew plants, spoke languages the men did not, and helped them get horses. A group travelling with a woman and child was read as peaceful.'
      }
    ],
    doing:
      'Walk a route you know well, slowly. Write down every plant and animal, even the boring ones. Draw one carefully. Note where the ground rises or gets wet. Draw the route from memory and compare it.',
    practice: [
      {
        ask: 'What were Lewis and Clark sent to do?',
        answer: 'Map a route and record what they found.',
        why: 'They kept journals almost every day.'
      },
      {
        ask: 'What is a specimen?',
        answer: 'A sample of a plant or animal, kept to study.',
        why: 'They brought many back with them.'
      }
    ],
    check: [
      {
        prompt: 'The main job of the expedition was to:',
        choices: ['Build towns', 'Record and map', 'Collect taxes', 'Fight battles'],
        answer: 1,
        feedback: ['They built nothing.', null, 'No taxes.', 'Not the errand.']
      },
      {
        prompt: 'Sacagawea helped the expedition most by:',
        choices: ['Rowing boats', 'Drawing maps', 'Guiding and translating', 'Writing journals'],
        answer: 2,
        feedback: ['Not her main help.', 'The men drew those.', null, 'The men kept those.']
      },
      {
        prompt: 'A journal is a record written:',
        choices: ['Once a year', 'Day by day', 'After ten years', 'By somebody else'],
        answer: 1,
        feedback: ['Too rare.', null, 'Too late.', 'It is your own.']
      }
    ]
  }
];

export function m5LessonById(id) {
  return SOCIAL_M5.find((l) => l.id === id) || null;
}

export default SOCIAL_M5;
