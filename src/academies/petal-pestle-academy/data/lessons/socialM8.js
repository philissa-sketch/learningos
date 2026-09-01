// ---------------------------------------------------------------------------
// SOCIAL STUDIES · MODULE 8 — WHY PEOPLE CHOSE WHAT THEY CHOSE
//
// Weeks 7-8 of Quarter 2. Georgia: SS4E1b, then SS4E1c+d+e together, then
// SS4E1f twice. This module completes Quarter 2 and unlocks its exam.
//
// ---- LESSON 30 CARRIES THREE ELEMENTS, AND THAT WAS FORCED ----
//
// SS4E1c specialization and SS4E1d voluntary exchange were blueprinted as their
// own lessons. NO USABLE VIDEO EXISTS for either at an elementary level that is
// not from an advocacy organisation — Learn Liberty and the Foundation for
// Economic Education were the only on-topic results, excluded on the same rule
// as PragerU, which appeared in six of the twenty-one searches for this half of
// the course. Under the v3.24 rule that is a re-cut, not permission to reach.
//
// They fold in with SS4E1e trade, which is where Georgia's own wording puts
// them: SS4E1 asks for these concepts "to illustrate historical events".
//
// ---- LESSON 32 IS THE ONE THAT MATTERS MOST IN THIS QUARTER ----
//
// Georgia asks for technological advances and their impact on productivity. The
// honest answer for the cotton gin is that a machine which saved labour made
// slavery LARGER, not smaller, because it made cotton worth growing everywhere.
// The verified video says so in its own title. The lesson does not soften it.
// ---------------------------------------------------------------------------

export const SOCIAL_M8_META = {
  courseId: 'social',
  module: 8,
  title: 'Why People Chose What They Chose',
  blurb:
    'Price told farmers what to plant, trade let two strangers both walk away better off, and four machines changed the work — including one that made slavery bigger rather than smaller.'
};

export const SOCIAL_M8 = [
  {
    id: 'ss-m8-01',
    course: 'social',
    module: 8,
    quarter: 2,
    week: 7,
    day: 1,
    n: 29,
    title: 'Why a farmer planted cotton',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'When the price of something rises, more people grow it, and that is a price incentive.',
    standards: ['SS4E1b'],
    offGrade: null,
    words: ['price', 'incentive', 'supply', 'demand'],
    glossary: [
      { word: 'price', plain: 'What something costs to buy.' },
      { word: 'incentive', plain: 'A reason that makes somebody act.' },
      { word: 'supply', plain: 'How much of a thing there is to sell.' },
      { word: 'demand', plain: 'How much of a thing people want to buy.' }
    ],
    video: {
      id: 'pnJu0yNiIV8',
      url: 'https://www.youtube.com/watch?v=pnJu0yNiIV8',
      title: 'All About Supply and Demand? (Facts for Kids)',
      channel: 'Hey! Guess What',
      minutes: 4,
      verified: '2026-08-17',
      teaches: ['supply', 'demand', 'price', 'buyers', 'sellers'],
      sourceGap:
        'A PragerU Kids video on supply and demand was in the top three of this search and is NOT used. Channel identity unknown for the chosen video and recorded as unknown. No Black American educator identified. Open.'
    },
    checkIn: {
      title: 'Everybody wants the same thing',
      text: 'One stall has ten apples. Thirty people all want an apple this morning.',
      question: 'What do you think happens to the price, and why?'
    },
    beats: [
      {
        n: 1,
        label: 'Price is a message',
        hook: 'A price is not just a number. It is information about what people want.',
        teachingText:
          'When many people want a thing and there is little of it, the price rises. When there is plenty and few want it, the price falls.',
        example:
          'Strawberries cost more in winter. There are fewer of them and people still want them.',
        applyIt: {
          prompt: 'When many people want a thing and there is little of it, the price:',
          choices: ['Falls', 'Rises', 'Stays', 'Vanishes'],
          answer: 1,
          feedback: ['That is the opposite.', null, 'It moves.', 'Prices do not vanish.'],
          why: 'That is what supply and demand means.'
        }
      },
      {
        n: 2,
        label: 'And farmers listen to it',
        hook: 'Nobody told southern farmers to grow cotton. The price did.',
        teachingText:
          'Mills in Britain and the north wanted cotton, so the price was high. Farmers who could grow it grew it instead of food.',
        example:
          'A farmer choosing cotton over corn was following an incentive, and taking a risk if the price fell.',
        applyIt: {
          prompt: 'An incentive is a reason that makes somebody:',
          choices: ['Wait', 'Act', 'Sleep', 'Argue'],
          answer: 1,
          feedback: ['Not the meaning.', null, 'Not the meaning.', 'Not the meaning.'],
          why: 'A high price is one of the strongest there is.'
        }
      }
    ],
    activity: {
      title: 'Run a market with ten counters',
      prep: 'Nothing to buy. Counters and two other people if possible.',
      needs: ['ten counters or sweets', 'two other people if possible', 'her notebook'],
      steps: [
        'Put out ten counters. Ask two people how many they each want.',
        'If they want more than ten between them, raise the price in claps.',
        'Keep raising until only ten are wanted. Write that price down.',
        'Now put out thirty counters and start again.',
        'Write down what happened to the price the second time.',
        'Write one sentence on why a farmer would plant cotton.'
      ],
      safety: 'Nothing edible unless a grown-up says so.',
      minutes: 12
    },
    ledger: {
      prompt:
        'Write what happens to a price when lots of people want a scarce thing. End with your two market prices.',
      ifSheIsStuck:
        'Ask her which round felt easier for the buyers. The one with thirty counters, and the price shows it.'
    },
    hook: {
      title: 'Everybody wants the same thing',
      text: 'One stall has ten apples. Thirty people all want an apple this morning.',
      question: 'What do you think happens to the price, and why?'
    },
    core: [
      { heading: 'Price is a message', text: 'When many people want a thing and there is little of it, the price rises. When there is plenty and few want it, the price falls.' },
      { heading: 'And farmers listen to it', text: 'Mills in Britain and the north wanted cotton, so the price was high. Farmers who could grow it grew it instead of food.' }
    ],
    doing:
      'Put out ten counters and ask two people how many each wants. Raise the price in claps until only ten are wanted, and write that price down. Try again with thirty counters.',
    practice: [
      { ask: 'What is an incentive?', answer: 'A reason that makes somebody act.', why: 'A high price is one of the strongest.' },
      { ask: 'Why did southern farmers grow cotton?', answer: 'The price was high because mills wanted it.', why: 'They grew it instead of food.' }
    ],
    check: [
      { prompt: 'When many want a thing and there is little of it, the price:', choices: ['Falls', 'Rises', 'Stays', 'Vanishes'], answer: 1, feedback: ['Opposite.', null, 'It moves.', 'Not a thing.'] },
      { prompt: 'An incentive is a reason that makes somebody:', choices: ['Wait', 'Act', 'Sleep', 'Argue'], answer: 1, feedback: ['Not it.', null, 'Not it.', 'Not it.'] },
      { prompt: 'Supply means how much of a thing there is to:', choices: ['Hide', 'Sell', 'Eat', 'Weigh'], answer: 1, feedback: ['Not it.', null, 'Not it.', 'Not it.'] }
    ]
  },

  {
    id: 'ss-m8-02',
    course: 'social',
    module: 8,
    quarter: 2,
    week: 7,
    day: 2,
    n: 30,
    title: 'Both sides walk away better off',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'People do what they are best at and swap for the rest, and a swap both sides agreed to leaves both better off.',
    standards: ['SS4E1c', 'SS4E1d', 'SS4E1e'],
    offGrade: null,
    words: ['trade', 'exchange', 'goods', 'specialise'],
    glossary: [
      { word: 'trade', plain: 'Swapping goods, or buying and selling them.' },
      { word: 'exchange', plain: 'Giving one thing and getting another.' },
      { word: 'goods', plain: 'Things that are made or grown to be sold.' },
      { word: 'specialise', plain: 'To do one job and get very good at it.' }
    ],
    video: {
      id: '6zKT75tjclE',
      url: 'https://www.youtube.com/watch?v=6zKT75tjclE',
      title: 'Trade | Economics for Grades K-12',
      channel: 'Wonderland Economics',
      minutes: 3,
      verified: '2026-08-17',
      teaches: ['trade', 'exchange', 'goods', 'buyers', 'sellers'],
      sourceGap:
        '⚠️ THIS LESSON CARRIES THREE ELEMENTS BECAUSE TWO HAD NO VIDEO. Four searches for specialization and voluntary exchange at an elementary level returned only CrashCourse (high school), Learn Liberty and the Foundation for Economic Education — advocacy organisations, excluded on the same rule as PragerU. The cost is recorded rather than hidden. No Black American educator identified. Open.'
    },
    checkIn: {
      title: 'Nobody is good at everything',
      text: 'One person bakes well and cannot sew. Another sews well and burns everything.',
      question: 'What is the obvious thing for those two to do?'
    },
    beats: [
      {
        n: 1,
        label: 'Do one thing well',
        hook: 'A person who tries to make everything makes everything badly.',
        teachingText:
          'To specialise is to do one job and get very good at it. The north specialised in making things. The south specialised in growing them.',
        example:
          'Northern mills spun cloth. Southern farms grew the cotton the mills needed. Neither could do the other well.',
        applyIt: {
          prompt: 'To specialise means to do one job and get very:',
          choices: ['Rich', 'Good at it', 'Tired', 'Busy'],
          answer: 1,
          feedback: ['Not the meaning.', null, 'Not the meaning.', 'Not the meaning.'],
          why: 'It is why trade is worth doing at all.'
        }
      },
      {
        n: 2,
        label: 'Then swap, and both gain',
        hook: 'A trade both sides agreed to is a trade both sides thought was worth it.',
        teachingText:
          'That is voluntary exchange. In a Gold Rush town, a miner wanted a shovel more than his coins, and the shop wanted the coins more than the shovel.',
        example:
          'Ships crossed the Atlantic in both directions. Cotton went east and finished cloth came back.',
        applyIt: {
          prompt: 'In a trade both sides agreed to, how many sides gain?',
          choices: ['Neither', 'One', 'Both', 'Only the seller'],
          answer: 2,
          feedback: ['Then nobody would agree.', 'Then one would refuse.', null, 'The buyer gains too.'],
          why: 'Each wanted the other thing more.'
        }
      }
    ],
    activity: {
      title: 'Trade until everyone is happier',
      prep: 'Nothing to buy. Six small objects and three people.',
      needs: ['six small objects', 'two other people', 'her notebook'],
      steps: [
        'Give each person two objects at random. Nobody chooses.',
        'Each person scores their own two out of ten and writes the total.',
        'Now let everybody swap freely for five minutes.',
        'Score again out of ten and write the new total.',
        'Compare the two totals for the whole group.',
        'Write one sentence on why the totals went up without anything new arriving.'
      ],
      safety: 'Nothing traded that belongs to somebody else.',
      minutes: 14
    },
    ledger: {
      prompt:
        'Write what specialising means and what voluntary exchange means. End with your two group totals.',
      ifSheIsStuck:
        'Ask her whether anything new came into the room. Nothing did, and everybody was happier.'
    },
    hook: {
      title: 'Nobody is good at everything',
      text: 'One person bakes well and cannot sew. Another sews well and burns everything.',
      question: 'What is the obvious thing for those two to do?'
    },
    core: [
      { heading: 'Do one thing well', text: 'To specialise is to do one job and get very good at it. The north specialised in making things. The south specialised in growing them.' },
      { heading: 'Then swap, and both gain', text: 'A trade both sides agreed to is voluntary exchange. Each side wanted what the other had more than what they were giving up.' }
    ],
    doing:
      'Give three people two random objects each. Everybody scores their own two out of ten. Let them swap freely for five minutes, then score again and compare the group totals.',
    practice: [
      { ask: 'What does it mean to specialise?', answer: 'To do one job and get very good at it.', why: 'It is why trade is worth doing.' },
      { ask: 'Who gains in a voluntary exchange?', answer: 'Both sides.', why: 'Each wanted the other thing more.' }
    ],
    check: [
      { prompt: 'To specialise means to do one job and get very:', choices: ['Rich', 'Good at it', 'Tired', 'Busy'], answer: 1, feedback: ['Not it.', null, 'Not it.', 'Not it.'] },
      { prompt: 'In a trade both sides agreed to, how many sides gain?', choices: ['Neither', 'One', 'Both', 'Only the seller'], answer: 2, feedback: ['Nobody would agree.', 'One would refuse.', null, 'The buyer gains too.'] },
      { prompt: 'Goods are things made or grown to be:', choices: ['Kept', 'Sold', 'Hidden', 'Counted'], answer: 1, feedback: ['Not it.', null, 'Not it.', 'Not it.'] }
    ]
  },

  {
    id: 'ss-m8-03',
    course: 'social',
    module: 8,
    quarter: 2,
    week: 8,
    day: 1,
    n: 31,
    title: 'Four machines that changed the work',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'The cotton gin, the steamboat, the locomotive and the telegraph each let people do far more in the same time.',
    standards: ['SS4E1f'],
    offGrade: null,
    words: ['invention', 'productivity', 'engine', 'signal'],
    // 'telegraph' is in the glossary and NOT reworded out of the bank, which is
    // a judgement and it is written down. The derived exemption (v3.25) forgives
    // a long word only where a lesson teaches it BY NAME. Georgia's SS4E1f names
    // the telegraph explicitly, beat 2 teaches it, and it is defined here — the
    // same allowance made for "friction" and "refraction" in The Science Lab.
    // "Benedict", "Madison", "Gettysburg" and "newspaper" got no such allowance
    // and were reworded, because none of them is content this course teaches.
    glossary: [
      { word: 'invention', plain: 'A new thing somebody made for the first time.' },
      { word: 'productivity', plain: 'How much work gets done in a set time.' },
      { word: 'engine', plain: 'A machine that makes something move.' },
      { word: 'signal', plain: 'A message sent as a sign rather than a word.' },
      { word: 'telegraph', plain: 'A machine that sent messages along a wire.' }
    ],
    video: {
      id: 'y8uRR6aFPaU',
      url: 'https://www.youtube.com/watch?v=y8uRR6aFPaU',
      title: 'How the Cotton Gin and Railroad Transformed Life in the South',
      channel: 'GPB Education',
      minutes: 6,
      verified: '2026-08-17',
      teaches: ['cotton gin', 'railroad', 'the South', 'productivity', 'invention'],
      sourceGap:
        'Georgia Public Broadcasting again — her own state’s broadcaster, and this one is specifically about the South. It covers two of the four machines; the steamboat and telegraph are carried in beat 2. No Black American educator identified. Open.'
    },
    checkIn: {
      title: 'The same hour, twice the work',
      text: 'A machine does not add hours to the day. It changes how much fits inside one.',
      question: 'Name one machine in your house that saves somebody an hour.'
    },
    beats: [
      {
        n: 1,
        label: 'The gin and the rails',
        hook: 'One cleaned cotton faster. The other moved it faster.',
        teachingText:
          'The cotton gin separated seeds from cotton far faster than hands could. Railroads then carried the bales to ports and mills.',
        example:
          'A job that took a person a whole day could be done in an hour. That is productivity.',
        applyIt: {
          prompt: 'The cotton gin separated cotton from its:',
          choices: ['Leaves', 'Seeds', 'Roots', 'Water'],
          answer: 1,
          feedback: ['Not the job.', null, 'Not the job.', 'Not the job.'],
          why: 'By hand it was slow and painful work.'
        }
      },
      {
        n: 2,
        label: 'The steamboat and the telegraph',
        hook: 'One beat the river. The other beat the horse.',
        teachingText:
          'Steamboats could travel upstream against the current. The telegraph sent signals along a wire, so news moved faster than any rider.',
        example:
          'Before the telegraph, news travelled at the speed of a horse or a ship. Afterwards it travelled at once.',
        applyIt: {
          prompt: 'The telegraph sent messages along a:',
          choices: ['Road', 'Wire', 'River', 'Rail'],
          answer: 1,
          feedback: ['Not how.', null, 'Not how.', 'Not how.'],
          why: 'News stopped travelling at the speed of a horse.'
        }
      }
    ],
    activity: {
      title: 'Time one job twice',
      prep: 'Nothing to buy. A pile of mixed small things.',
      needs: ['a bowl of mixed dried beans and pasta', 'a timer', 'a colander or sieve', 'her notebook'],
      steps: [
        'Mix a cup of dried beans with a cup of pasta in a bowl.',
        'Separate them by hand for two minutes and count what you got.',
        'Now mix a fresh batch and use a sieve or colander.',
        'Time two minutes again and count.',
        'Write both numbers down and work out how many times faster the tool was.',
        'Write one sentence about what the cotton gin did for a grower.'
      ],
      safety: 'Dried food goes back in the cupboard, not in mouths.',
      minutes: 14
    },
    ledger: {
      prompt:
        'Name the four machines and what each one changed. End with your two counts and how much faster the tool was.',
      ifSheIsStuck:
        'Ask her which round she would rather do all day. That is the whole answer.'
    },
    hook: {
      title: 'The same hour, twice the work',
      text: 'A machine does not add hours to the day. It changes how much fits inside one.',
      question: 'Name one machine in your house that saves somebody an hour.'
    },
    core: [
      { heading: 'The gin and the rails', text: 'The cotton gin separated seeds from cotton far faster than hands could. Railroads then carried the bales to ports and mills.' },
      { heading: 'The steamboat and the telegraph', text: 'Steamboats could travel upstream against the current. The telegraph sent signals along a wire, so news moved faster than any rider.' }
    ],
    doing:
      'Mix beans and pasta in a bowl. Separate them by hand for two minutes and count. Mix a fresh batch, use a sieve for two minutes, and count again. Work out how many times faster the tool was.',
    practice: [
      { ask: 'What is productivity?', answer: 'How much work gets done in a set time.', why: 'A machine changes it without adding hours.' },
      { ask: 'What did the telegraph change?', answer: 'News stopped travelling at the speed of a horse.', why: 'Signals went along a wire instead.' }
    ],
    check: [
      { prompt: 'The cotton gin separated cotton from its:', choices: ['Leaves', 'Seeds', 'Roots', 'Water'], answer: 1, feedback: ['Not the job.', null, 'Not the job.', 'Not the job.'] },
      { prompt: 'The telegraph sent messages along a:', choices: ['Road', 'Wire', 'River', 'Rail'], answer: 1, feedback: ['Not how.', null, 'Not how.', 'Not how.'] },
      { prompt: 'A steamboat could do what no earlier boat could easily do:', choices: ['Float', 'Travel upstream', 'Carry people', 'Cross a lake'], answer: 1, feedback: ['All boats float.', null, 'All boats did.', 'All boats did.'] }
    ]
  },

  {
    id: 'ss-m8-04',
    course: 'social',
    module: 8,
    quarter: 2,
    week: 8,
    day: 2,
    n: 32,
    title: 'The machine that made slavery bigger',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'The cotton gin saved labour and increased slavery, because it made growing cotton worth doing on far more land.',
    standards: ['SS4E1f'],
    offGrade: null,
    words: ['labour', 'profit', 'spread', 'enslaved'],
    glossary: [
      { word: 'labour', plain: 'Work done by people.' },
      { word: 'profit', plain: 'Money left over after the costs are paid.' },
      { word: 'spread', plain: 'To reach across more places than before.' },
      { word: 'enslaved', plain: 'Held as property by another person, by force.' }
    ],
    video: {
      id: 'uTFpV7wDkNM',
      url: 'https://www.youtube.com/watch?v=uTFpV7wDkNM',
      title: 'How the Cotton Gin Changed America | Slavery, Cotton & U.S. History | DAILY BELLRINGER',
      channel: 'The Daily Bellringer',
      minutes: 5,
      verified: '2026-08-17',
      teaches: ['cotton gin', 'slavery', 'cotton', 'the South', 'Eli Whitney'],
      sourceGap:
        'CHOSEN BECAUSE IT STATES THE CONNECTION IN ITS OWN TITLE. Most cotton-gin videos are about how the machine works and stop there, which would teach the standard and hide the answer. Georgia asks for the impact on productivity; this is what productivity did here. No Black American educator identified in this search, which is worth recording on this topic in particular. Open.'
    },
    checkIn: {
      title: 'A machine that saved work',
      text: 'A new machine does a hard job much faster. It seems obvious that fewer people would be needed.',
      question: 'Can you think of a way that might turn out the other way round?'
    },
    beats: [
      {
        n: 1,
        label: 'It made cotton worth growing everywhere',
        hook: 'Before the gin, cleaning cotton was so slow that growing much of it made no sense.',
        teachingText:
          'The gin removed that bottleneck. Suddenly cotton could be grown and cleaned in huge amounts, and there was profit in it.',
        example:
          'Land that had not been worth planting with cotton became worth planting. Growers wanted more of it.',
        applyIt: {
          prompt: 'After the cotton gin, growing cotton became:',
          choices: ['Pointless', 'Worth far more', 'Illegal', 'Slower'],
          answer: 1,
          feedback: ['The opposite.', null, 'It was not.', 'It was faster.'],
          why: 'The slow part of the job had been removed.'
        }
      },
      {
        n: 2,
        label: 'And so it needed more enslaved people, not fewer',
        hook: 'The gin cleaned the cotton. It did not plant it, weed it or pick it.',
        teachingText:
          'All of that was still done by hand, by enslaved people. More cotton meant more of that work, so slavery spread west and grew instead of shrinking.',
        example:
          'A machine that saves labour in one step can increase the labour needed in every other step.',
        applyIt: {
          prompt: 'After the cotton gin, the number of enslaved people:',
          choices: ['Fell sharply', 'Grew', 'Stayed exactly the same', 'Reached zero'],
          answer: 1,
          feedback: ['It did not fall.', null, 'It changed a great deal.', 'Far from it.'],
          why: 'Picking and planting were still done by hand.'
        }
      }
    ],
    activity: {
      title: 'Which step did the machine help?',
      prep: 'Nothing to buy. Paper and a pencil.',
      needs: ['paper', 'a pencil', 'a grown-up', 'her notebook'],
      steps: [
        'Write the steps of growing cotton in order: clear land, plant, weed, pick, clean, bale.',
        'Circle the one step the cotton gin made faster.',
        'Now count the steps it did not touch.',
        'Ask a grown-up who did those steps, and write the answer down.',
        'Underline every step still done by hand.',
        'Write one sentence on why the machine made slavery bigger.'
      ],
      safety:
        'A grown-up stays for this one. It ends by saying plainly that the people doing that work were held by force.',
      minutes: 12
    },
    ledger: {
      prompt:
        'Write what the cotton gin sped up and what it did not. End with why slavery grew rather than shrank.',
      ifSheIsStuck:
        'Ask her how many steps she underlined. The machine touched one of six, and people did the other five.'
    },
    hook: {
      title: 'A machine that saved work',
      text: 'A new machine does a hard job much faster. It seems obvious that fewer people would be needed.',
      question: 'Can you think of a way that might turn out the other way round?'
    },
    core: [
      { heading: 'It made cotton worth growing everywhere', text: 'The gin removed the slow step. Suddenly cotton could be grown and cleaned in huge amounts, and there was profit in it.' },
      { heading: 'And so it needed more enslaved people, not fewer', text: 'Planting, weeding and picking were still done by hand, by enslaved people. More cotton meant more of that work, so slavery spread west and grew.' }
    ],
    doing:
      'Write the steps of growing cotton in order. Circle the one the gin made faster and count the ones it did not touch. Ask a grown-up who did those steps, and underline every one still done by hand.',
    practice: [
      { ask: 'What did the cotton gin speed up?', answer: 'Cleaning the seeds out of cotton.', why: 'One step out of six.' },
      { ask: 'What happened to slavery after the gin?', answer: 'It grew and spread west.', why: 'Every other step was still done by hand.' }
    ],
    check: [
      { prompt: 'After the cotton gin, growing cotton became:', choices: ['Pointless', 'Worth far more', 'Illegal', 'Slower'], answer: 1, feedback: ['Opposite.', null, 'It was not.', 'It was faster.'] },
      { prompt: 'After the cotton gin, the number of enslaved people:', choices: ['Fell sharply', 'Grew', 'Stayed the same', 'Reached zero'], answer: 1, feedback: ['It did not fall.', null, 'It changed greatly.', 'Far from it.'] },
      { prompt: 'The gin did not plant, weed or:', choices: ['Clean', 'Pick', 'Bale', 'Sell'], answer: 1, feedback: ['That was its job.', null, 'Not the point.', 'Not the point.'] }
    ]
  }
];

export function m8LessonById(id) {
  return SOCIAL_M8.find((l) => l.id === id) || null;
}

export default SOCIAL_M8;
