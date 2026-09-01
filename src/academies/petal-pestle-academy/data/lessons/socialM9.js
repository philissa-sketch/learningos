// ---------------------------------------------------------------------------
// SOCIAL STUDIES · MODULE 9 — THE PEOPLE WHO SAID NO
//
// Weeks 1-2 of Quarter 3. Georgia: SS4H4a three times, then SS4H5a.
//
// ---- SS4H4a IS THREE LESSONS, AND THAT IS THE POINT OF QUARTER 3 ----
//
// Georgia names five people in one element: Susan B. Anthony, Frederick
// Douglass, Elizabeth Cady Stanton, Sojourner Truth and Harriet Tubman. One
// lesson makes them a list to be recited. Three lessons make them people.
//
// Quarter 3 was deliberately given six spare lessons in the blueprint, and this
// is where half of them went. Gigi's standing rule: the Black-American-educator
// requirement is NOT a nice-to-have on SS4H4, SS4H6c and SS4H6d.
//
// ---- ⭐ AND THE SEARCHES FINALLY DELIVERED ON THAT ----
//
// The Science Lab came up 0 of 48 across 33 searches. Quarter 1 came up 0 of 16
// across 18. Quarter 3 found four channels that read as Black-led from name and
// presentation, and two of them are in this module: Seed of Melanin Kids on
// Frederick Douglass, and The Magic In Me TV — Black History Series For Kids —
// on Harriet Tubman.
//
// Recorded as LIKELY, not confirmed. Identity is judged from name and
// presentation only, and unknown is recorded as unknown, never as a gap closed.
//
// ---- QUARTER 3 READING RAMP ----
//
// Cap 14 words a sentence, FLOOR 6.5, long-word cap 10%. The floor is the part
// that matters: by January she has had two terms and questions written too easy
// are as wrong as questions written too hard. Measured per course since v3.29.
// ---------------------------------------------------------------------------

export const SOCIAL_M9_META = {
  courseId: 'social',
  module: 9,
  title: 'The People Who Said No',
  blurb:
    'Five people Georgia names in a single line, given three lessons instead of one. A man who taught himself to read, a woman who went back nineteen times, another who asked a question nobody could answer, and two who spent fifty years on the vote.'
};

export const SOCIAL_M9 = [
  {
    id: 'ss-m9-01',
    course: 'social',
    module: 9,
    quarter: 3,
    week: 1,
    day: 1,
    n: 33,
    title: 'The man who taught himself to read',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'Frederick Douglass was born enslaved, learned to read in secret because it was forbidden, escaped, and spent the rest of his life making people listen.',
    standards: ['SS4H4a'],
    offGrade: null,
    words: ['abolitionist', 'escape', 'forbidden', 'speech'],
    glossary: [
      { word: 'abolitionist', plain: 'Somebody who worked to end slavery completely.' },
      { word: 'escape', plain: 'To get away from a place you are held in.' },
      { word: 'forbidden', plain: 'Not allowed, and punished if you do it.' },
      { word: 'speech', plain: 'A talk given out loud to a crowd of people.' }
    ],
    video: {
      id: 'hMqqz1mflMU',
      url: 'https://www.youtube.com/watch?v=hMqqz1mflMU',
      title: 'Frederick Douglass for Kids! | History for Kids | Seed of Melanin Kids!',
      channel: 'Seed of Melanin Kids!',
      minutes: 9,
      verified: '2026-08-17',
      teaches: ['Frederick Douglass', 'abolitionist', 'slavery', 'reading', 'escape'],
      sourceGap:
        '⭐ THE FIRST LIKELY BLACK-LED CHANNEL IN THIS WHOLE APP, after 0 of 48 in The Science Lab and 0 of 16 in Quarter 1. "Seed of Melanin Kids!" reads as Black-led from its name and presentation and it is recorded as LIKELY, NOT CONFIRMED — identity is judged from name and presentation only, and unknown stays unknown. Free School and Homeschool Pop alternatives are verified and held.'
    },
    checkIn: {
      title: 'A law against learning',
      text: 'In many states it was against the law to teach an enslaved person to read.',
      question: 'Why would anyone make a law like that? What were they afraid of?'
    },
    beats: [
      {
        n: 1,
        label: 'He learned anyway',
        hook: 'Somebody decided that reading was dangerous. He decided they were right, and learned.',
        teachingText:
          'Frederick Douglass was born enslaved in Maryland. Teaching him to read was forbidden, so he learned in pieces, from anyone who would tell him a letter.',
        example:
          'He traded bread with hungry white boys in the street for lessons. That is how a man taught himself the alphabet.',
        applyIt: {
          prompt: 'Teaching an enslaved person to read was:',
          choices: ['Encouraged', 'Forbidden', 'Required', 'Ignored'],
          answer: 1,
          feedback: [
            'The opposite.',
            null,
            'The opposite.',
            'It was punished, not ignored.'
          ],
          why: 'People who held others knew what reading would do.'
        }
      },
      {
        n: 2,
        label: 'And then he would not be quiet',
        hook: 'He escaped at about twenty, and the rest of his life was spent talking.',
        teachingText:
          'Douglass escaped north and became an abolitionist, giving speeches and writing books about his own life. Enormous crowds came to hear him.',
        example:
          'Some people refused to believe a formerly enslaved man could speak so well. So he wrote his life down, with names and places in it.',
        applyIt: {
          prompt: 'An abolitionist was somebody who worked to:',
          choices: ['Spread slavery', 'End slavery', 'Move west', 'Build canals'],
          answer: 1,
          feedback: [
            'The exact opposite.',
            null,
            'Not the meaning.',
            'Not the meaning.'
          ],
          why: 'Douglass became one of the most famous in the country.'
        }
      }
    ],
    activity: {
      title: 'Learn something in pieces',
      prep: 'Nothing to buy. A short text and a lot of patience.',
      needs: ['a short paragraph in a language she does not read', 'paper', 'her notebook'],
      steps: [
        'Find a few lines in a language you cannot read, in a book or on a packet.',
        'Work out what three of the letters or symbols probably are.',
        'Write down how you worked each one out.',
        'Now imagine doing that in secret, with no teacher and no book of your own.',
        'Ask a grown-up how long they think that would take.',
        'Write one sentence about why reading was made against the law.'
      ],
      safety: 'None needed. This is a thinking activity.',
      minutes: 12
    },
    ledger: {
      prompt:
        'Write how Frederick Douglass learned to read and what he did afterwards. End with why the law forbade it.',
      ifSheIsStuck:
        'Ask her what he could do once he could read that he could not do before. Write. Argue. Prove things.'
    },
    hook: {
      title: 'A law against learning',
      text: 'In many states it was against the law to teach an enslaved person to read.',
      question: 'Why would anyone make a law like that? What were they afraid of?'
    },
    core: [
      { heading: 'He learned anyway', text: 'Frederick Douglass was born enslaved in Maryland. Teaching him to read was forbidden, so he learned in pieces, from anyone who would tell him a letter.' },
      { heading: 'And then he would not be quiet', text: 'Douglass escaped north and became an abolitionist, giving speeches and writing books about his own life. Enormous crowds came to hear him.' }
    ],
    doing:
      'Find a few lines in a language you cannot read. Work out what three of the letters probably are and write down how. Then imagine doing that in secret, with no teacher and no book.',
    practice: [
      { ask: 'What is an abolitionist?', answer: 'Somebody who worked to end slavery completely.', why: 'Douglass became one of the most famous.' },
      { ask: 'Why did Douglass write his life down?', answer: 'Some people refused to believe he had been enslaved.', why: 'He put names and places in it.' }
    ],
    check: [
      { prompt: 'Teaching an enslaved person to read was:', choices: ['Encouraged', 'Forbidden', 'Required', 'Ignored'], answer: 1, feedback: ['Opposite.', null, 'Opposite.', 'It was punished.'] },
      { prompt: 'An abolitionist worked to:', choices: ['Spread slavery', 'End slavery', 'Move west', 'Build canals'], answer: 1, feedback: ['Exact opposite.', null, 'Not it.', 'Not it.'] },
      { prompt: 'After escaping, Douglass spent his life giving speeches and:', choices: ['Farming', 'Writing', 'Sailing', 'Mining'], answer: 1, feedback: ['Not his work.', null, 'Not his work.', 'Not his work.'] }
    ]
  },

  {
    id: 'ss-m9-02',
    course: 'social',
    module: 9,
    quarter: 3,
    week: 1,
    day: 2,
    n: 34,
    title: 'She went back nineteen times',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'Harriet Tubman escaped slavery and then returned again and again to lead others out, and Sojourner Truth used her voice the same way.',
    standards: ['SS4H4a'],
    offGrade: null,
    words: ['railroad', 'conductor', 'refuge', 'freedom'],
    glossary: [
      { word: 'railroad', plain: 'Here it means a secret network, not a train.' },
      { word: 'conductor', plain: 'Somebody who guided people along that network.' },
      { word: 'refuge', plain: 'A safe place to stop and hide.' },
      { word: 'freedom', plain: 'Being able to live without being owned by anyone.' }
    ],
    video: {
      id: 'b3BOZIdmjYE',
      url: 'https://www.youtube.com/watch?v=b3BOZIdmjYE',
      title: 'Storytime with Harriet  Tubman',
      channel: 'The Magic In Me TV - Black History Series For Kids',
      minutes: 2,
      verified: '2026-08-17',
      teaches: ['Harriet Tubman', 'Underground Railroad', 'escape', 'freedom', 'conductor'],
      sourceGap:
        '⭐ A SECOND LIKELY BLACK-LED CHANNEL, described in its own name as a Black History Series For Kids. Recorded as LIKELY, NOT CONFIRMED. It runs 2:21, which is short for the block, so beat 2 carries Sojourner Truth directly. TED-Ed’s Harriet Tubman lesson (Dv7YhVKFqbQ) is verified and held, and is AUTHORED BY JANELL HOBSON, a named scholar — a stronger attribution than a channel name.'
    },
    checkIn: {
      title: 'Going back',
      text: 'You escape from something dangerous. You are safe now. Nobody would blame you for staying safe.',
      question: 'What would make a person walk back into it, on purpose, nineteen times?'
    },
    beats: [
      {
        n: 1,
        label: 'Harriet Tubman went back',
        hook: 'She escaped once. Then she returned about nineteen times for other people.',
        teachingText:
          'Tubman guided around seventy people out of slavery along the Underground Railroad, a secret network of routes and safe houses. She was called a conductor.',
        example:
          'She travelled at night, in winter, and used songs as signals. She said she never lost a passenger.',
        applyIt: {
          prompt: 'The Underground Railroad was a secret network of routes and safe:',
          choices: ['Trains', 'Houses', 'Ships', 'Tunnels'],
          answer: 1,
          feedback: [
            'No trains were involved.',
            null,
            'Not ships.',
            'Not tunnels.'
          ],
          why: 'The railroad words were a code, not a description.'
        }
      },
      {
        n: 2,
        label: 'Sojourner Truth used her voice',
        hook: 'She could not read or write, and she was one of the best speakers of her century.',
        teachingText:
          'Sojourner Truth was born enslaved in New York and freed herself. She travelled the country speaking against slavery and for the rights of women.',
        example:
          'She once went to court to get her son back from a man who had sold him illegally, and she won.',
        applyIt: {
          prompt: 'Sojourner Truth spoke against slavery and for the rights of:',
          choices: ['Farmers', 'Women', 'Sailors', 'Soldiers'],
          answer: 1,
          feedback: [
            'Not her cause.',
            null,
            'Not her cause.',
            'Not her cause.'
          ],
          why: 'She argued for both at once, which was rare.'
        }
      }
    ],
    activity: {
      title: 'Follow a route by signal',
      prep: 'Nothing to buy. One other person and a song.',
      needs: ['one other person', 'a garden or a few rooms', 'her notebook'],
      steps: [
        'Agree two signals with a partner. One means go on, one means stop.',
        'Make the signals part of a song rather than words.',
        'Have your partner move through three rooms while you sing the signals.',
        'Swap over and try to follow the signals yourself.',
        'Write down how it felt to depend on somebody else knowing the way.',
        'Write one sentence about why songs were used on the Underground Railroad.'
      ],
      safety: 'Indoors or in a garden, with a grown-up knowing what is happening.',
      minutes: 12
    },
    ledger: {
      prompt:
        'Write what a conductor did on the Underground Railroad. Then write one thing about Sojourner Truth.',
      ifSheIsStuck:
        'Ask her what she would need most from a guide. Tubman gave that to about seventy people.'
    },
    hook: {
      title: 'Going back',
      text: 'You escape from something dangerous. You are safe now. Nobody would blame you for staying safe.',
      question: 'What would make a person walk back into it, on purpose, nineteen times?'
    },
    core: [
      { heading: 'Harriet Tubman went back', text: 'Tubman guided around seventy people out of slavery along the Underground Railroad, a secret network of routes and safe houses. She was called a conductor.' },
      { heading: 'Sojourner Truth used her voice', text: 'Sojourner Truth was born enslaved in New York and freed herself. She travelled the country speaking against slavery and for the rights of women.' }
    ],
    doing:
      'Agree two signals with a partner, one for go and one for stop, and hide them in a song. Guide each other through three rooms using only the song. Write down how it felt to depend on a guide.',
    practice: [
      { ask: 'What was the Underground Railroad?', answer: 'A secret network of routes and safe houses.', why: 'The railroad words were a code.' },
      { ask: 'What was Sojourner Truth known for?', answer: 'Speaking against slavery and for women’s rights.', why: 'She argued for both at once.' }
    ],
    check: [
      { prompt: 'The Underground Railroad was a network of routes and safe:', choices: ['Trains', 'Houses', 'Ships', 'Tunnels'], answer: 1, feedback: ['No trains.', null, 'Not ships.', 'Not tunnels.'] },
      { prompt: 'Sojourner Truth spoke against slavery and for the rights of:', choices: ['Farmers', 'Women', 'Sailors', 'Soldiers'], answer: 1, feedback: ['Not her cause.', null, 'Not her cause.', 'Not her cause.'] },
      { prompt: 'A conductor on that network was somebody who:', choices: ['Drove a train', 'Guided people', 'Sold tickets', 'Built track'], answer: 1, feedback: ['No trains.', null, 'No tickets.', 'No track.'] }
    ]
  },

  {
    id: 'ss-m9-03',
    course: 'social',
    module: 9,
    quarter: 3,
    week: 2,
    day: 1,
    n: 35,
    title: 'Fifty years for the vote',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'Susan B. Anthony and Elizabeth Cady Stanton spent their whole adult lives working for women to be allowed to vote, and neither lived to see it.',
    standards: ['SS4H4a'],
    offGrade: null,
    words: ['suffrage', 'convention', 'petition', 'amendment'],
    glossary: [
      { word: 'suffrage', plain: 'The right to vote in elections.' },
      { word: 'convention', plain: 'A large meeting held to argue for something.' },
      { word: 'petition', plain: 'A written request signed by many people.' },
      { word: 'amendment', plain: 'A change added to the Constitution.' }
    ],
    video: {
      id: 'trrd5nbbGb4',
      url: 'https://www.youtube.com/watch?v=trrd5nbbGb4',
      title: "Women's History Month for Kids | Susan B. Anthony, Elizabeth Cady Stanton & Sojourner Truth",
      channel: 'Fresberg Cartoon',
      minutes: 4,
      verified: '2026-08-17',
      teaches: ['Susan B. Anthony', 'Elizabeth Cady Stanton', 'Sojourner Truth', 'suffrage', 'voting'],
      sourceGap:
        'It carries all three women, including Sojourner Truth from the previous lesson, which is why it sits here rather than there. A PragerU Kids video on Susan B. Anthony was in the top three of this search and is NOT used. No Black American educator identified. Open.'
    },
    checkIn: {
      title: 'Working for something you will not see',
      text: 'You start something that will take longer than your own life to finish.',
      question: 'What would keep you going, knowing you would not be there at the end?'
    },
    beats: [
      {
        n: 1,
        label: 'They wrote it down and asked',
        hook: 'It started with a meeting and a list of complaints, which is a very American way to begin.',
        teachingText:
          'Stanton helped organise a convention in 1848 where women set out what they wanted. Anthony organised, travelled and gathered petitions for decades afterwards.',
        example:
          'Their document was written to sound like the Declaration of Independence on purpose. The echo was the argument.',
        applyIt: {
          prompt: 'Suffrage means the right to:',
          choices: ['Own land', 'Vote', 'Travel', 'Read'],
          answer: 1,
          feedback: [
            'Not the meaning.',
            null,
            'Not the meaning.',
            'Not the meaning.'
          ],
          why: 'Which is what they spent fifty years asking for.'
        }
      },
      {
        n: 2,
        label: 'And the movement split',
        hook: 'The abolition movement and the suffrage movement worked together, and then they did not.',
        teachingText:
          'When the vote was extended to Black men and not to women, some suffrage leaders opposed the change. It broke friendships that had lasted decades.',
        example:
          'Sojourner Truth and Frederick Douglass both argued that a right delayed for anyone is a right at risk for everyone.',
        applyIt: {
          prompt: 'The two movements worked together and later:',
          choices: ['Merged', 'Split', 'Won at once', 'Both ended'],
          answer: 1,
          feedback: [
            'The opposite happened.',
            null,
            'Neither won quickly.',
            'Both continued.'
          ],
          why: 'The split is part of the honest story, not a detail to leave out.'
        }
      }
    ],
    activity: {
      title: 'Write a petition and count the signatures',
      prep: 'Nothing to buy. Paper and the people in the house.',
      needs: ['paper', 'a pencil', 'people willing to be asked', 'her notebook'],
      steps: [
        'Pick one small change you would like at home. A grown-up agrees the topic.',
        'Write one sentence saying what you want and one saying why.',
        'Ask every person in the house to sign it if they agree.',
        'Count the signatures and write the number down.',
        'Now work out what fraction of the house that is.',
        'Write one sentence on how long fifty years of this would feel.'
      ],
      safety: 'The topic is agreed first and nobody is pressed to sign.',
      minutes: 12
    },
    ledger: {
      prompt:
        'Write what suffrage means and what Anthony and Stanton did. End with your own signature count.',
      ifSheIsStuck:
        'Ask her how many signatures she got and how long it took. Now imagine needing millions of them.'
    },
    hook: {
      title: 'Working for something you will not see',
      text: 'You start something that will take longer than your own life to finish.',
      question: 'What would keep you going, knowing you would not be there at the end?'
    },
    core: [
      { heading: 'They wrote it down and asked', text: 'Stanton helped organise a convention in 1848 where women set out what they wanted. Anthony organised, travelled and gathered petitions for decades afterwards.' },
      { heading: 'And the movement split', text: 'When the vote was extended to Black men and not to women, some suffrage leaders opposed the change. It broke friendships that had lasted decades.' }
    ],
    doing:
      'Pick one small change you would like at home, agreed with a grown-up. Write what you want and why in two sentences. Ask everyone in the house to sign if they agree, and count.',
    practice: [
      { ask: 'What does suffrage mean?', answer: 'The right to vote.', why: 'It is what they spent fifty years asking for.' },
      { ask: 'What is a petition?', answer: 'A written request signed by many people.', why: 'Anthony gathered them for decades.' }
    ],
    check: [
      { prompt: 'Suffrage means the right to:', choices: ['Own land', 'Vote', 'Travel', 'Read'], answer: 1, feedback: ['Not it.', null, 'Not it.', 'Not it.'] },
      { prompt: 'The abolition and suffrage movements worked together and later:', choices: ['Merged', 'Split', 'Won at once', 'Both ended'], answer: 1, feedback: ['Opposite.', null, 'Neither won quickly.', 'Both continued.'] },
      { prompt: 'The 1848 convention set out what women:', choices: ['Owned', 'Wanted', 'Feared', 'Sold'], answer: 1, feedback: ['Not it.', null, 'Not it.', 'Not it.'] }
    ]
  },

  {
    id: 'ss-m9-04',
    course: 'social',
    module: 9,
    quarter: 3,
    week: 2,
    day: 2,
    n: 36,
    title: 'A book and a raid',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'A novel changed how hundreds of thousands of people felt about slavery, and a raid on an armoury convinced the South that war was coming.',
    standards: ['SS4H5a'],
    offGrade: null,
    words: ['novel', 'raid', 'armoury', 'tension'],
    glossary: [
      { word: 'novel', plain: 'A long made-up story in a book.' },
      { word: 'raid', plain: 'A sudden attack by a small group.' },
      { word: 'armoury', plain: 'A building where weapons are stored.' },
      { word: 'tension', plain: 'The feeling before an argument turns into a fight.' }
    ],
    video: {
      id: 'rpP_B0BD018',
      url: 'https://www.youtube.com/watch?v=rpP_B0BD018',
      title: 'Uncle Tom’s Cabin Explained: The Book That Ignited the Civil War | 3-Minute History Spotlight',
      channel: 'History Savant',
      minutes: 3,
      verified: '2026-08-17',
      teaches: ["Uncle Tom's Cabin", 'Harriet Beecher Stowe', 'slavery', 'novel', 'Civil War'],
      sourceGap:
        'It covers the book and not John Brown’s raid, so beat 2 carries the raid directly. A Real-World Learning video on Harper’s Ferry (z5Nk-tAx81w) was found and is held unverified. No Black American educator identified; searched "Uncle Tom\'s Cabin John Brown Harpers Ferry causes of civil war students". Open.'
    },
    checkIn: {
      title: 'A story can do what an argument cannot',
      text: 'You can win an argument with somebody and change nothing about how they feel.',
      question: 'Has a story ever changed your mind about something real?'
    },
    beats: [
      {
        n: 1,
        label: 'The book',
        hook: 'A novel about enslaved people sold hundreds of thousands of copies and made readers cry.',
        teachingText:
          'Harriet Beecher Stowe wrote Uncle Tom’s Cabin in 1852. Northern readers who had never seen slavery felt it for the first time. Southern writers attacked it furiously.',
        example:
          'People who had argued about slavery for years found that a story reached those an argument never had.',
        applyIt: {
          prompt: 'Uncle Tom’s Cabin was a:',
          choices: ['Law', 'Novel', 'Speech', 'Map'],
          answer: 1,
          feedback: [
            'Not a law.',
            null,
            'Not a speech.',
            'Not a map.'
          ],
          why: 'A made-up story about a real system.'
        }
      },
      {
        n: 2,
        label: 'And the raid',
        hook: 'In 1859 a man tried to start an uprising by seizing a building full of guns.',
        teachingText:
          'John Brown attacked the armoury at Harper’s Ferry, hoping enslaved people would join him. It failed and he was hanged. The South read it as a warning.',
        example:
          'The North argued about whether he was a hero or a madman. The South stopped arguing and started preparing.',
        applyIt: {
          prompt: 'John Brown attacked an armoury, which is a building holding:',
          choices: ['Food', 'Weapons', 'Books', 'Cotton'],
          answer: 1,
          feedback: [
            'Not what it holds.',
            null,
            'Not what it holds.',
            'Not what it holds.'
          ],
          why: 'He hoped enslaved people would take them and rise.'
        }
      }
    ],
    activity: {
      title: 'Two ways to change a mind',
      prep: 'Nothing to buy. Paper and a pencil.',
      needs: ['paper', 'a pencil', 'a grown-up', 'her notebook'],
      steps: [
        'Pick something you believe should change. A grown-up agrees the topic.',
        'Write four lines arguing it, with reasons and facts.',
        'Now write four lines telling a short story that shows the same thing.',
        'Read both to a grown-up and ask which one landed harder.',
        'Write down their answer in their own words.',
        'Write one sentence on why a novel could do what speeches had not.'
      ],
      safety: 'The topic is agreed first and stays away from real people in her life.',
      minutes: 12
    },
    ledger: {
      prompt:
        'Write what Uncle Tom’s Cabin did and what John Brown did. End with which of your own two pieces worked better.',
      ifSheIsStuck:
        'Ask her which one she would rather read. That is usually the answer, and it is why the book mattered.'
    },
    hook: {
      title: 'A story can do what an argument cannot',
      text: 'You can win an argument with somebody and change nothing about how they feel.',
      question: 'Has a story ever changed your mind about something real?'
    },
    core: [
      { heading: 'The book', text: 'Harriet Beecher Stowe wrote Uncle Tom’s Cabin in 1852. Northern readers who had never seen slavery felt it for the first time. Southern writers attacked it furiously.' },
      { heading: 'And the raid', text: 'In 1859 John Brown attacked the armoury at Harper’s Ferry, hoping enslaved people would join him. It failed and he was hanged. The South read it as a warning.' }
    ],
    doing:
      'Pick something you believe should change. Write four lines arguing it with reasons, then four lines telling a story that shows the same thing. Ask a grown-up which landed harder.',
    practice: [
      { ask: 'What was Uncle Tom’s Cabin?', answer: 'A novel about slavery, written in 1852.', why: 'It reached people an argument never had.' },
      { ask: 'What did John Brown try to do?', answer: 'Seize an armoury and start an uprising.', why: 'It failed, and the South read it as a warning.' }
    ],
    check: [
      { prompt: 'Uncle Tom’s Cabin was a:', choices: ['Law', 'Novel', 'Speech', 'Map'], answer: 1, feedback: ['Not a law.', null, 'Not a speech.', 'Not a map.'] },
      { prompt: 'An armoury is a building where people store:', choices: ['Food', 'Weapons', 'Books', 'Cotton'], answer: 1, feedback: ['Not it.', null, 'Not it.', 'Not it.'] },
      { prompt: 'John Brown’s raid happened at Harper’s:', choices: ['Hill', 'Ferry', 'Bridge', 'Field'], answer: 1, feedback: ['Not the name.', null, 'Not the name.', 'Not the name.'] }
    ]
  }
];

export function m9LessonById(id) {
  return SOCIAL_M9.find((l) => l.id === id) || null;
}

export default SOCIAL_M9;
