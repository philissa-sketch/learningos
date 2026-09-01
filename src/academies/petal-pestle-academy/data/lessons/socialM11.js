// ---------------------------------------------------------------------------
// SOCIAL STUDIES · MODULE 11 — WHAT THE WAR DID
//
// Weeks 5-6 of Quarter 3. Georgia: SS4H5d, SS4H5e, SS4H6a, SS4H6b.
//
// The module turns from armies to consequences. Lesson 42 is about the people
// who were not soldiers, which the standard asks for and most courses skip.
// Lessons 43 and 44 begin Reconstruction — three amendments that promised a
// great deal, and one bureau that had to deliver it with almost nothing.
// ---------------------------------------------------------------------------

export const SOCIAL_M11_META = {
  courseId: 'social',
  module: 11,
  title: 'What the War Did',
  blurb:
    'Four generals and a surrender in a front parlour, what four years did to people who never fought, and the three amendments that changed the Constitution for ever.'
};

export const SOCIAL_M11 = [
  {
    id: 'ss-m11-01',
    course: 'social',
    module: 11,
    quarter: 3,
    week: 5,
    day: 1,
    n: 41,
    title: 'Four generals and a parlour',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'Lee, Grant, Jackson and Sherman each fought differently, and the war ended with two of them in a small front room.',
    standards: ['SS4H5d'],
    offGrade: null,
    words: ['general', 'strategy', 'terms', 'parlour'],
    glossary: [
      { word: 'general', plain: 'The officer who commands a whole army.' },
      { word: 'strategy', plain: 'The plan for winning a whole war, not one battle.' },
      { word: 'terms', plain: 'The conditions agreed when one side gives up.' },
      { word: 'parlour', plain: 'The front sitting room of a house.' }
    ],
    video: {
      id: 'r0cHwkJ8Lc0',
      url: 'https://www.youtube.com/watch?v=r0cHwkJ8Lc0',
      title: "[1865] Lee's Surrender at Appomattox",
      channel: 'You Will Love History',
      minutes: 3,
      verified: '2026-08-17',
      teaches: ['Appomattox', 'Robert E. Lee', 'Ulysses S. Grant', 'surrender', 'terms'],
      sourceGap:
        'It covers the surrender rather than all four generals, so beat 1 carries Jackson and Sherman directly. Channel identity is unknown and recorded as unknown. No Black American educator identified; searched "Robert E Lee Ulysses Grant Appomattox surrender for kids". Open.'
    },
    checkIn: {
      title: 'How a war actually stops',
      text: 'Wars do not stop when everyone is tired. Somebody has to decide, and somebody has to accept.',
      question: 'What do you think the winning side should ask for?'
    },
    beats: [
      {
        n: 1,
        label: 'Four different ways to fight',
        hook: 'They were all called general, and none of them fought like the others.',
        teachingText:
          'Lee led the Confederate army and took risks. Grant kept pressing and would not retreat. Jackson moved fast. Sherman attacked the things an army needed rather than the army.',
        example:
          'Grant’s strategy was simple and brutal: he had more of everything, so he refused to stop.',
        applyIt: {
          prompt: 'Strategy is the plan for winning a whole:',
          choices: ['Battle', 'War', 'Day', 'March'],
          answer: 1,
          feedback: ['Smaller than that.', null, 'Smaller than that.', 'Smaller than that.'],
          why: 'Sherman and Grant each had one, and they fitted together.'
        }
      },
      {
        n: 2,
        label: 'And it ended in a front room',
        hook: 'The surrender was signed in somebody’s parlour, at a table.',
        teachingText:
          'In April 1865 Lee surrendered to Grant at Appomattox Court House. Grant’s terms let the Confederate soldiers go home and keep their horses.',
        example:
          'He also sent food to Lee’s hungry army. The terms were meant to end the war rather than punish it.',
        applyIt: {
          prompt: 'Lee surrendered to Grant at Appomattox in the year:',
          choices: ['1861', '1865', '1848', '1876'],
          answer: 1,
          feedback: ['The war began then.', null, 'Long before.', 'Long after.'],
          why: 'Four years after Fort Sumter.'
        }
      }
    ],
    activity: {
      title: 'Write the terms yourself',
      prep: 'Nothing to buy. Paper and a pencil.',
      needs: ['paper', 'a pencil', 'a grown-up', 'her notebook'],
      steps: [
        'Imagine a long argument in the house is finally over.',
        'Write three terms the winning side could ask for.',
        'Now cross out any term that would keep the argument going.',
        'Read the remaining terms to a grown-up.',
        'Look up one thing Grant actually allowed at Appomattox.',
        'Write one sentence on why he sent food to the other army.'
      ],
      safety: 'Keep the imagined argument away from anything real in the house.',
      minutes: 12
    },
    ledger: {
      prompt:
        'Name the four generals and one thing about how each fought. End with why Grant’s terms were gentle.',
      ifSheIsStuck:
        'Ask her what harsh terms would have caused. Grant was trying to end a war, not win an argument.'
    },
    hook: {
      title: 'How a war actually stops',
      text: 'Wars do not stop when everyone is tired. Somebody has to decide, and somebody has to accept.',
      question: 'What do you think the winning side should ask for?'
    },
    core: [
      { heading: 'Four different ways to fight', text: 'Lee led the Confederate army and took risks. Grant kept pressing and would not retreat. Jackson moved fast. Sherman attacked the things an army needed.' },
      { heading: 'And it ended in a front room', text: 'In April 1865 Lee surrendered to Grant at Appomattox Court House. Grant’s terms let the Confederate soldiers go home and keep their horses.' }
    ],
    doing:
      'Imagine a long argument is over. Write three terms the winning side could ask for, then cross out any that would keep it going. Look up one thing Grant actually allowed.',
    practice: [
      { ask: 'Where did Lee surrender?', answer: 'Appomattox Court House, in April 1865.', why: 'Four years after Fort Sumter.' },
      { ask: 'What is strategy?', answer: 'The plan for winning a whole war.', why: 'Not the plan for one battle.' }
    ],
    check: [
      { prompt: 'Strategy is the plan for winning a whole:', choices: ['Battle', 'War', 'Day', 'March'], answer: 1, feedback: ['Smaller.', null, 'Smaller.', 'Smaller.'] },
      { prompt: 'Lee surrendered to Grant at Appomattox in the year:', choices: ['1861', '1865', '1848', '1876'], answer: 1, feedback: ['War began then.', null, 'Long before.', 'Long after.'] },
      { prompt: 'Terms are the conditions agreed when one side:', choices: ['Attacks', 'Gives up', 'Marches', 'Votes'], answer: 1, feedback: ['Not it.', null, 'Not it.', 'Not it.'] }
    ]
  },

  {
    id: 'ss-m11-02',
    course: 'social',
    module: 11,
    quarter: 3,
    week: 5,
    day: 2,
    n: 42,
    title: 'The people who never fought',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'Four years of war changed daily life for people in the north and the south who never carried a gun.',
    standards: ['SS4H5e'],
    offGrade: null,
    words: ['home front', 'shortage', 'blockade', 'inflation'],
    glossary: [
      { word: 'home front', plain: 'Life at home while a war goes on elsewhere.' },
      { word: 'shortage', plain: 'When there is not enough of something to go round.' },
      { word: 'blockade', plain: 'Ships stopping goods from reaching a coast.' },
      { word: 'inflation', plain: 'When money buys less than it did before.' }
    ],
    video: {
      id: '1HaWVXumg5w',
      url: 'https://www.youtube.com/watch?v=1HaWVXumg5w',
      title: 'Home Front: Daily Life in the Civil War North',
      channel: 'TerraAmericanArt',
      minutes: 5,
      verified: '2026-08-17',
      teaches: ['home front', 'daily life', 'Civil War', 'North', 'families'],
      sourceGap:
        '⚠️ IT COVERS THE NORTH ONLY, and the standard asks for both. Beat 2 carries the southern home front directly, and this gap is written here rather than glossed. No usable elementary video was found for the southern home front. No Black American educator identified. Open.'
    },
    checkIn: {
      title: 'The war you cannot see',
      text: 'Nobody in your house is a soldier. The war is hundreds of miles away.',
      question: 'Name three ways it could still change what happens at your table.'
    },
    beats: [
      {
        n: 1,
        label: 'In the north, factories and letters',
        hook: 'The north had more of everything, and it still felt the war every day.',
        teachingText:
          'Northern factories ran flat out making uniforms, weapons and food. Women took jobs men had left. Almost every family was waiting on a letter.',
        example:
          'Newspapers printed casualty lists. People read them the way you would read a register.',
        applyIt: {
          prompt: 'The home front means life at home while a war goes on:',
          choices: ['Nearby', 'Elsewhere', 'At sea', 'In the past'],
          answer: 1,
          feedback: ['Not the meaning.', null, 'Not the meaning.', 'Not the meaning.'],
          why: 'It is where most people actually experienced the war.'
        }
      },
      {
        n: 2,
        label: 'In the south, shortages and hunger',
        hook: 'A blockade does not fight anybody. It just stops things arriving.',
        teachingText:
          'Union ships blockaded southern ports, so imports stopped. Prices rose steeply, money bought less, and food ran short in whole cities.',
        example:
          'In 1863 women in Richmond marched through the streets demanding bread. That is a war that reached the kitchen.',
        applyIt: {
          prompt: 'A blockade means ships stopping goods from reaching a:',
          choices: ['Farm', 'Coast', 'Fort', 'Railway'],
          answer: 1,
          feedback: ['Not the meaning.', null, 'Not the meaning.', 'Not the meaning.'],
          why: 'The southern economy depended on ships.'
        }
      }
    ],
    activity: {
      title: 'One week without one thing',
      prep: 'Nothing to buy. Pick one ordinary item.',
      needs: ['her notebook', 'a grown-up', 'a calendar or tally'],
      steps: [
        'With a grown-up, pick one ordinary thing that comes from far away.',
        'Find out where it actually comes from, on the packet or online.',
        'Tally every time somebody in the house would have used it in two days.',
        'Write down what they would have used instead.',
        'Multiply your tally by fifty to imagine four years of it.',
        'Write one sentence about what a shortage really means.'
      ],
      safety: 'Nothing is actually removed from the house. This is a count, not a rule.',
      minutes: 12
    },
    ledger: {
      prompt:
        'Write two ways the war changed life in the north and two ways it changed life in the south.',
      ifSheIsStuck:
        'Ask her about her tally. Now imagine that number with nothing arriving to replace it, for four years.'
    },
    hook: {
      title: 'The war you cannot see',
      text: 'Nobody in your house is a soldier. The war is hundreds of miles away.',
      question: 'Name three ways it could still change what happens at your table.'
    },
    core: [
      { heading: 'In the north, factories and letters', text: 'Northern factories ran flat out making uniforms, weapons and food. Women took jobs men had left. Almost every family was waiting on a letter.' },
      { heading: 'In the south, shortages and hunger', text: 'Union ships blockaded southern ports, so imports stopped. Prices rose steeply, money bought less, and food ran short in whole cities.' }
    ],
    doing:
      'Pick one ordinary thing that comes from far away and find out where. Tally every time it would have been used in two days, and write what would have replaced it.',
    practice: [
      { ask: 'What is a blockade?', answer: 'Ships stopping goods from reaching a coast.', why: 'It caused shortages across the south.' },
      { ask: 'What is inflation?', answer: 'When money buys less than it did before.', why: 'Southern prices rose steeply during the war.' }
    ],
    check: [
      { prompt: 'The home front means life at home while a war goes on:', choices: ['Nearby', 'Elsewhere', 'At sea', 'In the past'], answer: 1, feedback: ['Not it.', null, 'Not it.', 'Not it.'] },
      { prompt: 'A blockade means ships stopping goods from reaching a:', choices: ['Farm', 'Coast', 'Fort', 'Railway'], answer: 1, feedback: ['Not it.', null, 'Not it.', 'Not it.'] },
      { prompt: 'A shortage is when there is not enough to go:', choices: ['Away', 'Round', 'Back', 'Down'], answer: 1, feedback: ['Not it.', null, 'Not it.', 'Not it.'] }
    ]
  },

  {
    id: 'ss-m11-03',
    course: 'social',
    module: 11,
    quarter: 3,
    week: 6,
    day: 1,
    n: 43,
    title: 'Three amendments',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'The 13th ended slavery, the 14th made citizens, and the 15th said the vote could not be refused because of race.',
    standards: ['SS4H6a'],
    offGrade: null,
    words: ['abolish', 'citizen', 'equal protection', 'ratify'],
    glossary: [
      { word: 'abolish', plain: 'To end something completely, by law.' },
      { word: 'citizen', plain: 'A full member of a country, with rights in it.' },
      { word: 'equal protection', plain: 'The law must treat everyone the same way.' },
      { word: 'ratify', plain: 'When enough states agree to make a change real.' }
    ],
    video: {
      id: 'lMD9ITvixnI',
      url: 'https://www.youtube.com/watch?v=lMD9ITvixnI',
      title: 'The 13th, 14th, and 15th Amendments Explained',
      channel: 'GPB Education',
      minutes: 7,
      verified: '2026-08-17',
      teaches: ['13th Amendment', '14th Amendment', '15th Amendment', 'citizenship', 'voting'],
      sourceGap:
        'Georgia Public Broadcasting again — her own state’s educational broadcaster. Chosen over a Bow Tie Guy and Wife alternative at 3:00 because the three amendments need the extra minutes. No Black American educator identified in this search. Open.'
    },
    checkIn: {
      title: 'A promise written into the rules',
      text: 'A promise anybody can take back is a wish. A promise written into the rules is harder to move.',
      question: 'Does writing it down make it true, or only make it harder to undo?'
    },
    beats: [
      {
        n: 1,
        label: 'Thirteen and fourteen',
        hook: 'The first one ended it. The second one said who counts as a person under the law.',
        teachingText:
          'The 13th Amendment abolished slavery in 1865. The 14th, in 1868, made everyone born here a citizen and promised equal protection of the laws.',
        example:
          'The Emancipation Proclamation had been a wartime order. An amendment is permanent, and needs states to ratify it.',
        applyIt: {
          prompt: 'The 13th Amendment abolished:',
          choices: ['Taxes', 'Slavery', 'Voting', 'Trade'],
          answer: 1,
          feedback: ['Not it.', null, 'The opposite.', 'Not it.'],
          why: 'Ratified in 1865, the year the war ended.'
        }
      },
      {
        n: 2,
        label: 'And fifteen said the vote',
        hook: 'The third one names the thing it will not allow.',
        teachingText:
          'The 15th Amendment, in 1870, said the right to vote could not be denied because of race or because a man had once been enslaved.',
        example:
          'It said nothing about women. Anthony and Stanton had spent decades on that, and the split from lesson 35 is why.',
        applyIt: {
          prompt: 'The 15th Amendment said the vote could not be refused because of:',
          choices: ['Age', 'Race', 'Money', 'Health'],
          answer: 1,
          feedback: ['Not what it named.', null, 'Not what it named.', 'Not what it named.'],
          why: 'And the next module is about how that was got around anyway.'
        }
      }
    ],
    activity: {
      title: 'Three cards, three promises',
      prep: 'Nothing to buy. Three cards.',
      needs: ['three cards or paper squares', 'a pencil', 'her notebook'],
      steps: [
        'Write 13, 14 and 15 on three cards, one number each.',
        'On the back of each, write the promise in your own words.',
        'Add the year each one was ratified.',
        'Shuffle them and put them back in order without looking.',
        'Ask a grown-up to test you on the backs.',
        'Write down which of the three promises you think was hardest to keep.'
      ],
      safety: 'None needed. Keep the cards for the last module.',
      minutes: 12
    },
    ledger: {
      prompt:
        'Write what each of the three amendments promised. End with the one you think was hardest to keep, and why.',
      ifSheIsStuck:
        'Ask her which promise depends on somebody else letting you do a thing. The vote needs a person at a desk to say yes.'
    },
    hook: {
      title: 'A promise written into the rules',
      text: 'A promise anybody can take back is a wish. A promise written into the rules is harder to move.',
      question: 'Does writing it down make it true, or only make it harder to undo?'
    },
    core: [
      { heading: 'Thirteen and fourteen', text: 'The 13th Amendment abolished slavery in 1865. The 14th, in 1868, made everyone born here a citizen and promised equal protection of the laws.' },
      { heading: 'And fifteen said the vote', text: 'The 15th Amendment, in 1870, said the right to vote could not be denied because of race or because a man had once been enslaved.' }
    ],
    doing:
      'Write 13, 14 and 15 on three cards. Write each promise in your own words on the back with its year. Shuffle, reorder them, and have a grown-up test you.',
    practice: [
      { ask: 'What did the 13th Amendment do?', answer: 'It abolished slavery.', why: 'Ratified in 1865.' },
      { ask: 'What is equal protection?', answer: 'The law must treat everyone the same way.', why: 'It is in the 14th Amendment.' }
    ],
    check: [
      { prompt: 'The 13th Amendment abolished:', choices: ['Taxes', 'Slavery', 'Voting', 'Trade'], answer: 1, feedback: ['Not it.', null, 'Opposite.', 'Not it.'] },
      { prompt: 'The 15th Amendment said the vote could not be refused because of:', choices: ['Age', 'Race', 'Money', 'Health'], answer: 1, feedback: ['Not named.', null, 'Not named.', 'Not named.'] },
      { prompt: 'To ratify means enough states agree to make a change:', choices: ['Cheap', 'Real', 'Short', 'Secret'], answer: 1, feedback: ['Not it.', null, 'Not it.', 'Not it.'] }
    ]
  },

  {
    id: 'ss-m11-04',
    course: 'social',
    module: 11,
    quarter: 3,
    week: 6,
    day: 2,
    n: 44,
    title: 'The bureau that had to do everything',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'The Freedmen’s Bureau set up schools and hospitals and enforced contracts for four million newly free people, with very little money and not much time.',
    standards: ['SS4H6b'],
    offGrade: null,
    words: ['bureau', 'contract', 'freedmen', 'agent'],
    glossary: [
      { word: 'bureau', plain: 'A government office set up to do one job.' },
      { word: 'contract', plain: 'A written agreement about work and pay.' },
      { word: 'freedmen', plain: 'People who had just been freed from slavery.' },
      { word: 'agent', plain: 'Somebody sent to do a job on behalf of an office.' }
    ],
    video: {
      id: 'a1Ymp9ruPCc',
      url: 'https://www.youtube.com/watch?v=a1Ymp9ruPCc',
      title: 'The Role of the Freedmen’s Bureau   |  Reconstruction 360',
      channel: 'South Carolina ETV',
      minutes: 2,
      verified: '2026-08-17',
      teaches: ["Freedmen's Bureau", 'Reconstruction', 'schools', 'contracts', 'freed people'],
      sourceGap:
        'Two minutes is short for the block, so both beats carry substantial teaching. A Gilder Lehrman Institute video (K5cFMD40onY) is aimed at AP students and was not used. A Daily Bellringer video covering the Bureau, sharecropping and Black Codes together (b1ap8EI4ckk) is held for the next module. No Black American educator identified. Open.'
    },
    checkIn: {
      title: 'Free, and then what?',
      text: 'Four million people are free on a Tuesday. They have no land, no wages owed, and no schools.',
      question: 'What is the very first thing they would need?'
    },
    beats: [
      {
        n: 1,
        label: 'Schools first, and they were wanted',
        hook: 'Where the Bureau opened schools, people queued to get into them.',
        teachingText:
          'The Freedmen’s Bureau built schools and hospitals across the south. Reading had been forbidden, so adults and children learned together in the same rooms.',
        example:
          'Some schools ran in churches and barns. Many teachers were Black, and many had been enslaved themselves.',
        applyIt: {
          prompt: 'A bureau is a government office set up to do one:',
          choices: ['Year', 'Job', 'Vote', 'Trade'],
          answer: 1,
          feedback: ['Not the meaning.', null, 'Not the meaning.', 'Not the meaning.'],
          why: 'This one had a very large job and very little money.'
        }
      },
      {
        n: 2,
        label: 'And it tried to make work fair',
        hook: 'A person who is free but owed nothing can still be trapped.',
        teachingText:
          'Bureau agents wrote contracts between freedmen and landowners, saying what work was done and what would be paid. They also tried to reunite families sold apart.',
        example:
          'The Bureau was closed after only about seven years. The job it was given was far bigger than that.',
        applyIt: {
          prompt: 'A contract is a written agreement about work and:',
          choices: ['Weather', 'Pay', 'Travel', 'Land only'],
          answer: 1,
          feedback: ['Not the meaning.', null, 'Not the meaning.', 'Not only land.'],
          why: 'Without one, a worker had nothing to point at.'
        }
      }
    ],
    activity: {
      title: 'Write a fair contract',
      prep: 'Nothing to buy. Paper and a grown-up.',
      needs: ['paper', 'a pencil', 'a grown-up', 'her notebook'],
      steps: [
        'Pick a real job in the house, like washing up for a week.',
        'Write down exactly what the work is, in one sentence.',
        'Write down exactly what is paid for it, and when.',
        'Ask a grown-up to find one thing in your contract that is unclear.',
        'Fix that line so it cannot be argued about.',
        'Write one sentence on why freed people needed these written down.'
      ],
      safety: 'The contract is real only if a grown-up agrees to it.',
      minutes: 12
    },
    ledger: {
      prompt:
        'Write two things the Freedmen’s Bureau did. End with the line in your own contract that was unclear.',
      ifSheIsStuck:
        'Ask her what would happen if the other side simply said no. That is the problem the Bureau could not always solve.'
    },
    hook: {
      title: 'Free, and then what?',
      text: 'Four million people are free on a Tuesday. They have no land, no wages owed, and no schools.',
      question: 'What is the very first thing they would need?'
    },
    core: [
      { heading: 'Schools first, and they were wanted', text: 'The Freedmen’s Bureau built schools and hospitals across the south. Reading had been forbidden, so adults and children learned together in the same rooms.' },
      { heading: 'And it tried to make work fair', text: 'Bureau agents wrote contracts between freedmen and landowners, saying what work was done and what would be paid. They also tried to reunite families sold apart.' }
    ],
    doing:
      'Pick a real job in the house. Write exactly what the work is and exactly what is paid, and when. Ask a grown-up to find one unclear line, and fix it so it cannot be argued about.',
    practice: [
      { ask: 'What did the Freedmen’s Bureau build?', answer: 'Schools and hospitals across the south.', why: 'Reading had been forbidden before.' },
      { ask: 'Why did contracts matter so much?', answer: 'Without one a worker had nothing to point at.', why: 'Being free is not the same as being paid.' }
    ],
    check: [
      { prompt: 'A bureau is a government office set up to do one:', choices: ['Year', 'Job', 'Vote', 'Trade'], answer: 1, feedback: ['Not it.', null, 'Not it.', 'Not it.'] },
      { prompt: 'A contract is a written agreement about work and:', choices: ['Weather', 'Pay', 'Travel', 'Land only'], answer: 1, feedback: ['Not it.', null, 'Not it.', 'Not only land.'] },
      { prompt: 'The Freedmen’s Bureau lasted roughly how long?', choices: ['Fifty years', 'Seven years', 'A century', 'One year'], answer: 1, feedback: ['Far less.', null, 'Far less.', 'A little longer.'] }
    ]
  }
];

export function m11LessonById(id) {
  return SOCIAL_M11.find((l) => l.id === id) || null;
}

export default SOCIAL_M11;
