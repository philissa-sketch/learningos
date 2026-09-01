// ---------------------------------------------------------------------------
// SOCIAL STUDIES · MODULE 1 — THE ROAD TO REVOLUTION
//
// Weeks 1-2 of Quarter 1. Mondays and Wednesdays, four lessons.
// Georgia: SS4H1a (two lessons), SS4H1b, SS4H1c.
//
// ---- THE SHAPE OF THE MODULE ----
//
// Georgia's SS4H1a names SEVEN separate things in one element — a war, a tax,
// a slogan, two organisations and two confrontations. One lesson would be a
// list, so it is two: the war and the bill, then the people who refused.
//
// ---- WHAT THE VIDEO SEARCH CHANGED, BEFORE ANY OF THIS WAS WRITTEN ----
//
// The first sweep for lesson 2 returned twelve results and NOT ONE mentioned
// the Daughters of Liberty, whom Georgia names by name. Everything findable was
// Boston Tea Party. A dedicated second search found a video covering both Sons
// AND Daughters — which is the element exactly. The lesson was not written
// until that existed. Full record: claude/social-studies-q1-videos-log.md.
//
// ---- SS4H1b, AND A DECISION THAT IS GIGI'S ----
//
// SS4H1b names nine individuals AND the Black regiments in a single element.
// The search found three real videos on the Black soldiers of the Revolution,
// and I proposed splitting this into two lessons so they had their own.
// Gigi, Aug 17: "leave it." So it is one lesson, and the Black regiments are
// carried in beat 2 rather than in the video. That is written here so the
// choice is visible rather than looking like an oversight.
// ---------------------------------------------------------------------------

export const SOCIAL_M1_META = {
  courseId: 'social',
  module: 1,
  title: 'The Road to Revolution',
  blurb:
    'Britain won a war, could not pay for it, and sent the bill to people who had no say in it. What they did about that — and the morning the arguing turned into shooting.'
};

export const SOCIAL_M1 = [
  // -------------------------------------------------------------------------
  {
    id: 'ss-m1-01',
    course: 'social',
    module: 1,
    quarter: 1,
    week: 1,
    day: 1,
    n: 1,
    title: 'The war that came with a bill',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'Britain won a long war in America, the war cost a fortune, and the new taxes were the bill arriving.',
    standards: ['SS4H1a'],
    offGrade: null,
    words: ['colony', 'tax', 'debt', 'represent'],
    glossary: [
      { word: 'colony', plain: 'A place ruled by a country far away.' },
      { word: 'tax', plain: 'Money a government makes people pay.' },
      { word: 'debt', plain: 'Money you owe and have to pay back.' },
      { word: 'represent', plain: 'To speak for someone who is not there.' }
    ],
    video: {
      id: '9Su_GPNrk5k',
      url: 'https://www.youtube.com/watch?v=9Su_GPNrk5k',
      title:
        'The French & Indian War - Educational Social Studies History Video for Elementary Students & Kids',
      channel: 'Bow Tie Guy and Wife',
      minutes: 3,
      verified: '2026-08-17',
      teaches: ['French and Indian War', 'colony', 'Britain', 'France', 'land'],
      sourceGap:
        'No Black American educator found for the French and Indian War at an elementary level. Searched "French and Indian War Stamp Act causes of American Revolution for kids" — three usable results, all from channels whose identity is unknown and recorded as unknown. Open.'
    },
    checkIn: {
      title: 'Somebody else spends your pocket money',
      text: 'Imagine your pocket money is spent by a person in another town. You never met them. They did not ask you.',
      question: 'What is the first thing you would want to say to that person?'
    },
    beats: [
      {
        n: 1,
        label: 'Britain won, and then could not pay',
        hook: 'Winning a war can leave you poorer than losing one.',
        teachingText:
          'Britain and France fought for years over land in America. Britain won. But wars cost money, and Britain now owed a huge debt.',
        example:
          'Think of buying something big and paying for it later. The thing is yours. The bill still comes.',
        applyIt: {
          prompt: 'Britain won the war. Straight afterwards Britain was:',
          choices: ['Very rich', 'Deep in debt', 'Ruled by France', 'Out of America'],
          answer: 1,
          feedback: [
            'Winning did not fill the money box.',
            null,
            'Britain won, so France did not rule it.',
            'Britain had more land in America, not less.'
          ],
          why: 'The war was won and the debt was real. Both things are true.'
        }
      },
      {
        n: 2,
        label: 'The bill went to the colonies',
        hook: 'Britain decided the colonies should help pay, and did not ask them first.',
        teachingText:
          'New taxes arrived, like the Stamp Act of 1765. Colonists had no one speaking for them in Britain. So they said: no taxation without representation.',
        example:
          'The Stamp Act taxed paper. Newspapers, letters and even playing cards all cost more.',
        applyIt: {
          prompt: '“No taxation without representation” means colonists wanted:',
          choices: [
            'A say before being taxed',
            'Cheaper playing cards',
            'To move back to Britain',
            'A bigger army'
          ],
          answer: 0,
          feedback: [
            null,
            'The cards were the example, not the point.',
            'Most had no wish to leave.',
            'An army was not what they were asking for.'
          ],
          why: 'The complaint was not the money. It was having no voice.'
        }
      }
    ],
    activity: {
      title: 'A tax with no vote',
      prep: 'Nothing to buy. Ten counters, buttons or dried beans will do.',
      needs: ['ten counters, buttons or beans', 'a grown-up', 'her notebook'],
      steps: [
        'Give her ten counters. Tell her they are hers.',
        'Now take three away. Do not explain and do not ask.',
        'Ask her how that felt. Write her exact words down.',
        'Now do it again, but let her vote first on how many you take.',
        'Ask which one felt fair, and why. Write that down too.',
        'Write one sentence about what the colonists were actually angry about.'
      ],
      safety: 'Give the counters back at the end. The point is the feeling, not the loss.',
      minutes: 12
    },
    ledger: {
      prompt:
        'Britain won a war and sent the bill to the colonies. Write what the colonists said back, and why.',
      ifSheIsStuck:
        'Ask her about the counters. It was not really about three beans. It was about not being asked.'
    },
    hook: {
      title: 'Somebody else spends your pocket money',
      text: 'Imagine your pocket money is spent by a person in another town. You never met them. They did not ask you.',
      question: 'What is the first thing you would want to say to that person?'
    },
    core: [
      {
        heading: 'Britain won, and then could not pay',
        text: 'Britain and France fought for years over land in America. Britain won. But wars cost money, and Britain now owed a huge debt.'
      },
      {
        heading: 'The bill went to the colonies',
        text: 'New taxes arrived, like the Stamp Act of 1765. Colonists had no one speaking for them in Britain. So they said: no taxation without representation.'
      }
    ],
    doing:
      'Give her ten counters and take three without asking. Ask how it felt and write her words down. Do it again, but let her vote first. Ask which felt fair, and why.',
    practice: [
      {
        ask: 'Why did Britain want money from the colonies?',
        answer: 'The war had left Britain deep in debt.',
        why: 'The taxes were the bill for a war Britain had won.'
      },
      {
        ask: 'What did “no taxation without representation” mean?',
        answer: 'No taxing us unless we get a say.',
        why: 'The colonists had nobody speaking for them in Britain.'
      }
    ],
    check: [
      {
        prompt: 'Britain won the war. Straight afterwards Britain was:',
        choices: ['Very rich', 'Deep in debt', 'Ruled by France', 'Out of America'],
        answer: 1,
        feedback: [
          'Winning did not fill the money box.',
          null,
          'Britain won, so France did not rule it.',
          'Britain had more land, not less.'
        ]
      },
      {
        prompt: 'The Stamp Act of 1765 put a tax on:',
        choices: ['Tea', 'Bread', 'Paper', 'Shoes'],
        answer: 2,
        feedback: [
          'Tea was taxed later, not here.',
          'Bread was not taxed.',
          null,
          'Shoes were not taxed.'
        ]
      },
      {
        prompt: '“No taxation without representation” means colonists wanted:',
        choices: [
          'A say before being taxed',
          'Cheaper playing cards',
          'To move back to Britain',
          'A bigger army'
        ],
        answer: 0,
        feedback: [
          null,
          'The cards were an example, not the point.',
          'Most had no wish to leave.',
          'An army was not the request.'
        ]
      }
    ]
  },

  // -------------------------------------------------------------------------
  {
    id: 'ss-m1-02',
    course: 'social',
    module: 1,
    quarter: 1,
    week: 1,
    day: 2,
    n: 2,
    title: 'The people who refused',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'Colonists who would not pay organised themselves, and their protest turned into the Boston Massacre and the Boston Tea Party.',
    standards: ['SS4H1a'],
    offGrade: null,
    words: ['protest', 'boycott', 'massacre', 'liberty'],
    glossary: [
      { word: 'protest', plain: 'Saying loudly that something is wrong.' },
      { word: 'boycott', plain: 'Refusing to buy a thing, on purpose.' },
      { word: 'massacre', plain: 'A killing of people who were not fighting.' },
      { word: 'liberty', plain: 'Being free to choose for yourself.' }
    ],
    video: {
      id: 'lcTqgT9a8Rw',
      url: 'https://www.youtube.com/watch?v=lcTqgT9a8Rw',
      title:
        'Sons and Daughters of Liberty: Fighting for Fairness and Freedom - History of the United States ...',
      channel: 'Academy 4 Social Civics',
      minutes: 4,
      verified: '2026-08-17',
      teaches: ['Sons of Liberty', 'Daughters of Liberty', 'protest', 'boycott', 'liberty'],
      sourceGap:
        'FIRST SEARCH FAILED AND IT IS RECORDED. "Sons of Liberty Daughters of Liberty Boston Massacre Boston Tea Party for kids" returned twelve results and not one mentioned the Daughters of Liberty, whom Georgia names. A second search, "Daughters of Liberty colonial women boycott for kids", found this video covering both. No Black American educator identified in either search. Open.'
    },
    checkIn: {
      title: 'The thing you refuse to buy',
      text: 'A shop puts up the price of your favourite drink. You are cross. You could pay it, or you could stop buying it.',
      question: 'Which one makes the shop notice you more, and why?'
    },
    beats: [
      {
        n: 1,
        label: 'They organised, and they had a name',
        hook: 'Refusing on your own is a mood. Refusing together is a movement.',
        teachingText:
          'The Sons of Liberty organised protests. The Daughters of Liberty ran the boycotts. They wove their own cloth so they need not buy British cloth.',
        example:
          'A boycott only works if lots of people do it. One person not buying tea changes nothing.',
        applyIt: {
          prompt: 'The Daughters of Liberty wove their own cloth so that:',
          choices: [
            'They could sell it abroad',
            'They need not buy British cloth',
            'The army had uniforms',
            'It was warmer'
          ],
          answer: 1,
          feedback: [
            'Selling it was not the aim.',
            null,
            'That came later, not here.',
            'Warmth was not the point.'
          ],
          why: 'A boycott means refusing to buy. Making your own is how you manage it.'
        }
      },
      {
        n: 2,
        label: 'Then it stopped being only words',
        hook: 'In 1770 a crowd and some soldiers met in Boston, and five people died.',
        teachingText:
          'That was the Boston Massacre. Three years later, colonists tipped a whole shipload of tea into Boston harbour. That was the Boston Tea Party.',
        example:
          'They did not steal the tea. They destroyed it. Destroying it was the message.',
        applyIt: {
          prompt: 'At the Boston Tea Party the colonists:',
          choices: [
            'Drank the tea',
            'Sold the tea',
            'Threw the tea in the harbour',
            'Gave the tea away'
          ],
          answer: 2,
          feedback: [
            'They refused to drink it.',
            'Selling it would have been theft, not protest.',
            null,
            'Giving it away would still have meant using it.'
          ],
          why: 'Destroying the tea said the tax would not be paid at all.'
        }
      }
    ],
    activity: {
      title: 'Run a boycott at your own table',
      prep: 'Nothing to buy. Pick one everyday thing in the house.',
      needs: ['one everyday item, agreed with a grown-up', 'her notebook', 'a calendar or a tally'],
      steps: [
        'Choose one small thing to go without for two days. A grown-up agrees it first.',
        'Write down why you chose it and what you will use instead.',
        'Tally each time you would have used it and did not.',
        'Ask one other person in the house to join you.',
        'After two days, write whether it was harder alone or together.',
        'Write one sentence on why the Daughters of Liberty made their own cloth.'
      ],
      safety: 'Nothing to do with food she needs, and a grown-up agrees the item first.',
      minutes: 12
    },
    ledger: {
      prompt:
        'Write about the two days you went without. Then write what a boycott is, in your own words.',
      ifSheIsStuck:
        'Ask her whether one person refusing would change a shop’s mind. Then ask about a hundred.'
    },
    hook: {
      title: 'The thing you refuse to buy',
      text: 'A shop puts up the price of your favourite drink. You are cross. You could pay it, or you could stop buying it.',
      question: 'Which one makes the shop notice you more, and why?'
    },
    core: [
      {
        heading: 'They organised, and they had a name',
        text: 'The Sons of Liberty organised protests. The Daughters of Liberty ran the boycotts. They wove their own cloth so they need not buy British cloth.'
      },
      {
        heading: 'Then it stopped being only words',
        text: 'In 1770 a crowd and some soldiers met in Boston, and five people died. That was the Boston Massacre. In 1773 colonists tipped a shipload of tea into Boston harbour.'
      }
    ],
    doing:
      'Choose one small thing to go without for two days, agreed with a grown-up. Tally each time you would have used it. Ask someone to join you. Write whether it was harder alone or together.',
    practice: [
      {
        ask: 'What is a boycott?',
        answer: 'Refusing to buy something, on purpose.',
        why: 'It only works when many people do it at once.'
      },
      {
        ask: 'Who ran the boycotts?',
        answer: 'The Daughters of Liberty.',
        why: 'They wove their own cloth instead of buying British cloth.'
      }
    ],
    check: [
      {
        prompt: 'The Daughters of Liberty wove their own cloth so that:',
        choices: [
          'It was warmer',
          'They could sell it abroad',
          'The army had uniforms',
          'They need not buy British cloth'
        ],
        answer: 3,
        feedback: [
          'Warmth was not the point.',
          'Selling it was not the aim.',
          'That came later.',
          null
        ]
      },
      {
        prompt: 'At the Boston Tea Party the colonists:',
        choices: [
          'Drank the tea',
          'Sold the tea',
          'Threw the tea in the harbour',
          'Gave the tea away'
        ],
        answer: 2,
        feedback: [
          'They refused to drink it.',
          'Selling it would be theft, not protest.',
          null,
          'Giving it away still means using it.'
        ]
      },
      {
        prompt: 'The Boston Massacre happened when:',
        choices: [
          'A ship sank in the harbour',
          'A crowd and soldiers met and five died',
          'Britain raised the tea tax',
          'The colonies wrote a letter'
        ],
        answer: 1,
        feedback: [
          'No ship sank.',
          null,
          'The tax was a cause, not the event.',
          'A letter is not a massacre.'
        ]
      }
    ]
  },

  // -------------------------------------------------------------------------
  {
    id: 'ss-m1-03',
    course: 'social',
    module: 1,
    quarter: 1,
    week: 2,
    day: 1,
    n: 3,
    title: 'Who was on which side',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'The Revolution was fought by named people who each chose a side, and some of them were not free when they chose it.',
    standards: ['SS4H1b'],
    offGrade: null,
    words: ['loyalist', 'patriot', 'regiment', 'traitor'],
    glossary: [
      { word: 'loyalist', plain: 'A colonist who stayed on Britain’s side.' },
      { word: 'patriot', plain: 'A colonist who wanted to break away.' },
      { word: 'regiment', plain: 'A large group of soldiers who serve together.' },
      { word: 'traitor', plain: 'Somebody who turns against their own side.' }
    ],
    video: {
      id: 'hgeCMWW9-bY',
      url: 'https://www.youtube.com/watch?v=hgeCMWW9-bY',
      title:
        'Figures of the American Revolution - Educational Social Studies Video for Elementary Students & Kids',
      channel: 'Bow Tie Guy and Wife',
      minutes: 3,
      verified: '2026-08-17',
      teaches: ['George Washington', 'Benjamin Franklin', 'Thomas Jefferson', 'Paul Revere', 'King George III'],
      sourceGap:
        'THE VIDEO CARRIES THE NAMED INDIVIDUALS. IT HAS NOT BEEN CONFIRMED TO INCLUDE THE BLACK REGIMENTS, so beat 2 teaches them directly rather than relying on it. Three usable videos on Black soldiers of the Revolution WERE found — ethSOtfOcQc, -_J8oJA_74c, h7PVkGY4hhQ — and a split into two lessons was proposed so they had their own. Gigi, Aug 17: "leave it." Recorded so the choice is visible.'
    },
    checkIn: {
      title: 'Choosing a side is not always free',
      text: 'Two teams are picking. You can choose either one. Now imagine you are told which team you are on.',
      question: 'What is the difference between choosing and being placed?'
    },
    beats: [
      {
        n: 1,
        label: 'The names on both sides',
        hook: 'Nobody was born a patriot. Every one of them decided.',
        teachingText:
          'George Washington led the army. Benjamin Franklin got France to help. Thomas Jefferson wrote. Paul Revere rode with a warning. King George III ruled Britain.',
        example:
          'Benedict Arnold fought well for the patriots and then changed sides. His name still means traitor.',
        applyIt: {
          prompt: 'Benedict Arnold is remembered because he:',
          choices: [
            'Wrote the Declaration',
            'Changed sides',
            'Was King of Britain',
            'Rode through the night'
          ],
          answer: 1,
          feedback: [
            'Jefferson wrote it.',
            null,
            'That was King George III.',
            'That was Paul Revere.'
          ],
          why: 'He fought for one side, then joined the other.'
        }
      },
      {
        n: 2,
        label: 'The Black regiments',
        hook: 'Thousands of Black soldiers fought in this war, and many were not free men when they joined.',
        teachingText:
          'Black soldiers served on both sides. The 1st Rhode Island Regiment was made up largely of Black and Native soldiers. Some were promised freedom for serving.',
        example:
          'Britain also offered freedom to enslaved people who joined its side. Both sides made that offer, and both broke it often.',
        applyIt: {
          prompt: 'The 1st Rhode Island Regiment was made up largely of:',
          choices: [
            'British officers',
            'French sailors',
            'Black and Native soldiers',
            'Farmers from Georgia'
          ],
          answer: 2,
          feedback: [
            'They were not British.',
            'France helped, but not here.',
            null,
            'It was a Rhode Island regiment.'
          ],
          why: 'It is the best known Black regiment of the war.'
        }
      }
    ],
    activity: {
      title: 'A card for every person',
      prep: 'Nothing to buy. Paper cut into eight cards will do.',
      needs: ['eight small cards or paper squares', 'a pencil', 'her notebook'],
      steps: [
        'Write one name on each card: Washington, Franklin, Jefferson, Revere, Arnold, King George III, Patrick Henry, John Adams.',
        'On the back of each, write one thing that person did.',
        'Sort the cards into two piles: patriot side, British side.',
        'Now put Arnold somewhere. Ask a grown-up where he belongs.',
        'Add a ninth card for the 1st Rhode Island Regiment and write what they were promised.',
        'Write one sentence about why that ninth card is often missing.'
      ],
      safety: 'None needed. Keep the cards — she uses them again in Module 2.',
      minutes: 12
    },
    ledger: {
      prompt:
        'Pick the person on your cards you would most like to ask a question. Write the question, and why you would ask them.',
      ifSheIsStuck:
        'Ask her which card was hardest to place, and why. Arnold and the ninth card are both good answers.'
    },
    hook: {
      title: 'Choosing a side is not always free',
      text: 'Two teams are picking. You can choose either one. Now imagine you are told which team you are on.',
      question: 'What is the difference between choosing and being placed?'
    },
    core: [
      {
        heading: 'The names on both sides',
        text: 'George Washington led the army. Benjamin Franklin got France to help. Thomas Jefferson wrote. Paul Revere rode with a warning. King George III ruled Britain.'
      },
      {
        heading: 'The Black regiments',
        text: 'Black soldiers served on both sides. The 1st Rhode Island Regiment was made up largely of Black and Native soldiers. Some were promised freedom for serving.'
      }
    ],
    doing:
      'Write one name on each of eight cards and one deed on the back. Sort them into two piles. Decide where Benedict Arnold goes. Add a ninth card for the 1st Rhode Island Regiment.',
    practice: [
      {
        ask: 'Who led the patriot army?',
        answer: 'George Washington.',
        why: 'He kept an army together for years.'
      },
      {
        ask: 'Who was the 1st Rhode Island Regiment?',
        answer: 'A regiment largely of Black and Native soldiers.',
        why: 'Some were promised freedom in return for serving.'
      }
    ],
    check: [
      {
        prompt: 'Benedict Arnold is remembered because he:',
        choices: [
          'Wrote the Declaration',
          'Was King of Britain',
          'Rode through the night',
          'Changed sides'
        ],
        answer: 3,
        feedback: [
          'Jefferson wrote it.',
          'That was King George III.',
          'That was Paul Revere.',
          null
        ]
      },
      {
        prompt: 'The 1st Rhode Island Regiment was made up largely of:',
        choices: [
          'British officers',
          'French sailors',
          'Black and Native soldiers',
          'Farmers from Georgia'
        ],
        answer: 2,
        feedback: [
          'They were not British.',
          'France helped, but not here.',
          null,
          'It was a Rhode Island regiment.'
        ]
      },
      {
        prompt: 'Benjamin Franklin helped the patriots most by:',
        choices: [
          'Getting France to help',
          'Leading the army',
          'Ruling Britain',
          'Warning Concord'
        ],
        answer: 0,
        feedback: [
          null,
          'Washington led the army.',
          'King George III ruled Britain.',
          'Revere carried the warning.'
        ]
      }
    ]
  },

  // -------------------------------------------------------------------------
  {
    id: 'ss-m1-04',
    course: 'social',
    module: 1,
    quarter: 1,
    week: 2,
    day: 2,
    n: 4,
    title: 'The morning the shooting started',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'At Lexington and Concord in April 1775 the arguing turned into a war, and neither side had planned it for that day.',
    standards: ['SS4H1c'],
    offGrade: null,
    words: ['militia', 'retreat', 'supplies', 'battle'],
    glossary: [
      { word: 'militia', plain: 'Ordinary people who train to fight if needed.' },
      { word: 'retreat', plain: 'To go back the way you came.' },
      { word: 'supplies', plain: 'Food, powder and tools an army needs.' },
      { word: 'battle', plain: 'A fight between two armies.' }
    ],
    video: {
      id: 'RU-GYMXzasI',
      url: 'https://www.youtube.com/watch?v=RU-GYMXzasI',
      title: 'Battles of Lexington and Concord | Road to the Revolution',
      channel: 'Pursuit of History',
      minutes: 4,
      verified: '2026-08-17',
      teaches: ['Lexington', 'Concord', 'militia', 'British troops', 'first shot'],
      sourceGap:
        'No Black American educator identified for Lexington and Concord at an elementary level. Searched "Battles of Lexington and Concord for kids elementary" — one usable result, channel identity unknown and recorded as unknown. Open.'
    },
    checkIn: {
      title: 'Nobody decided that morning',
      text: 'Two groups meet. Both are frightened. Both are armed. Neither one came planning to start a war.',
      question: 'How can something huge start when nobody chose to start it?'
    },
    beats: [
      {
        n: 1,
        label: 'The British came for the supplies',
        hook: 'The soldiers were not marching out to start a war. They were sent to take gunpowder.',
        teachingText:
          'British troops marched towards Concord to seize the militia’s supplies. Riders went ahead to warn people. One of them was Paul Revere.',
        example:
          'The militia were farmers and shopkeepers. They kept powder in the town and trained on the green.',
        applyIt: {
          prompt: 'The British troops marched to Concord to:',
          choices: [
            'Take the militia’s supplies',
            'Crown a new king',
            'Collect the tea tax',
            'Build a fort'
          ],
          answer: 0,
          feedback: [
            null,
            'No king was crowned.',
            'That was not the errand.',
            'They were not building anything.'
          ],
          why: 'An army without powder cannot fight. That was the point of the march.'
        }
      },
      {
        n: 2,
        label: 'And then somebody fired',
        hook: 'Nobody knows who fired first at Lexington, and both sides said it was the other.',
        teachingText:
          'A shot was fired on Lexington green. By the end of the day the British were retreating, with militia firing from behind walls the whole way back.',
        example:
          'It became known as the shot heard round the world, because a small fight in a small town started a real war.',
        applyIt: {
          prompt: 'By the end of that day the British troops were:',
          choices: ['Marching on', 'Retreating', 'Crowning a king', 'Signing a treaty'],
          answer: 1,
          feedback: [
            'They turned around.',
            null,
            'No king was crowned.',
            'No treaty was signed.'
          ],
          why: 'They went back to Boston under fire the whole way.'
        }
      }
    ],
    activity: {
      title: 'The road back to Boston',
      prep: 'Nothing to buy. A long strip of paper or the garden path will do.',
      needs: ['a long strip of paper or a path', 'small stones or counters', 'her notebook'],
      steps: [
        'Draw a long road. Mark one end Boston and the other end Concord.',
        'Walk a counter along it to Concord. That is the march out.',
        'Now walk it back, and place a stone every few steps for a stone wall.',
        'Ask which journey was more dangerous, and why.',
        'Write down what the walls did for the militia.',
        'Write one sentence on why the way back was worse than the way out.'
      ],
      safety: 'If she uses the garden path, no running. Stones stay on the ground.',
      minutes: 12
    },
    ledger: {
      prompt:
        'Write what happened at Lexington and Concord. End with why nobody can say who fired first.',
      ifSheIsStuck:
        'Ask her about the walls she laid out. The militia could hide. The soldiers on the road could not.'
    },
    hook: {
      title: 'Nobody decided that morning',
      text: 'Two groups meet. Both are frightened. Both are armed. Neither one came planning to start a war.',
      question: 'How can something huge start when nobody chose to start it?'
    },
    core: [
      {
        heading: 'The British came for the supplies',
        text: 'British troops marched towards Concord to seize the militia’s supplies. Riders went ahead to warn people. One of them was Paul Revere.'
      },
      {
        heading: 'And then somebody fired',
        text: 'A shot was fired on Lexington green. By the end of the day the British were retreating, with militia firing from behind walls the whole way back.'
      }
    ],
    doing:
      'Draw a long road from Boston to Concord. Walk a counter out, then back, placing stones for walls. Ask which journey was more dangerous and write down what the walls did for the militia.',
    practice: [
      {
        ask: 'Why did the British march to Concord?',
        answer: 'To take the militia’s supplies.',
        why: 'An army without powder cannot fight.'
      },
      {
        ask: 'Who fired the first shot at Lexington?',
        answer: 'Nobody knows.',
        why: 'Each side said it was the other, and no one can prove it.'
      }
    ],
    check: [
      {
        prompt: 'The British troops marched to Concord to:',
        choices: [
          'Crown a new king',
          'Take the militia’s supplies',
          'Collect the tea tax',
          'Build a fort'
        ],
        answer: 1,
        feedback: [
          'No king was crowned.',
          null,
          'That was not the errand.',
          'They built nothing.'
        ]
      },
      {
        prompt: 'By the end of that day the British troops were:',
        choices: ['Marching on', 'Crowning a king', 'Signing a treaty', 'Retreating'],
        answer: 3,
        feedback: [
          'They turned around.',
          'No king was crowned.',
          'No treaty was signed.',
          null
        ]
      },
      {
        prompt: 'Who fired the first shot at Lexington?',
        choices: ['The militia', 'The British', 'Paul Revere', 'Nobody knows'],
        answer: 3,
        feedback: [
          'Each side blamed the other.',
          'Each side blamed the other.',
          'He carried a warning, not a gun.',
          null
        ]
      }
    ]
  }
];

export function m1LessonById(id) {
  return SOCIAL_M1.find((l) => l.id === id) || null;
}

export default SOCIAL_M1;
