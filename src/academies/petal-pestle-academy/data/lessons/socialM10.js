// ---------------------------------------------------------------------------
// SOCIAL STUDIES · MODULE 10 — WHY IT BROKE
//
// Weeks 3-4 of Quarter 3. Georgia: SS4H5b, SS4H5c twice, SS4H5d.
//
// ---- LESSON 37 DOES NOT DODGE THE QUESTION ----
//
// SS4H5b asks how "the issues of states' rights and slavery increased tensions".
// Those are not two separate causes politely sharing a sentence. The right the
// states were claiming was the right to hold people as property, and the
// secession documents said so themselves. The lesson says it plainly and lets
// her read the states' own words.
//
// ---- LESSON 39 HAPPENED WHERE SHE LIVES ----
//
// The Atlanta Campaign and the March to the Sea are named in the standard and
// they came through her state. She can put them on a map she already owns.
// ---------------------------------------------------------------------------

export const SOCIAL_M10_META = {
  courseId: 'social',
  module: 10,
  title: 'Why It Broke',
  blurb:
    'The argument that split the country, the first shot and the turning point — and a campaign that came through Georgia and out to the sea.'
};

export const SOCIAL_M10 = [
  {
    id: 'ss-m10-01',
    course: 'social',
    module: 10,
    quarter: 3,
    week: 3,
    day: 1,
    n: 37,
    title: 'States’ rights to do what',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'Southern states claimed the right to decide for themselves, and the thing they were deciding was whether people could be held as property.',
    standards: ['SS4H5b'],
    offGrade: null,
    words: ['secede', 'union', 'property', 'declaration'],
    glossary: [
      { word: 'secede', plain: 'To leave a country and set up on your own.' },
      { word: 'union', plain: 'The states joined together as one country.' },
      { word: 'property', plain: 'Something a person owns.' },
      { word: 'declaration', plain: 'A public statement of what you believe and why.' }
    ],
    video: {
      id: 'USxFjU87BqE',
      url: 'https://www.youtube.com/watch?v=USxFjU87BqE',
      title: 'Causes of the American Civil War - Educational Social Studies Video for Elementary Students & Kids',
      channel: 'Bow Tie Guy and Wife',
      minutes: 6,
      verified: '2026-08-17',
      teaches: ['causes of the Civil War', 'slavery', 'states rights', 'North', 'South'],
      sourceGap:
        'A PragerU video titled "Was the Civil War About Slavery?" was in the top five of this search and is NOT used — an advocacy organisation with a stated position on a contested framing is exactly the wrong source here. A TED-Ed lesson on the Lost Cause myth (XP0_wnaW-a0) was found and is held unverified; a CrashCourse Black American History episode was found and is pitched at high school. No Black American educator identified at elementary level. Open.'
    },
    checkIn: {
      title: 'Whose decision is it?',
      text: 'Two people argue about who gets to decide something. That is one argument.',
      question: 'What is the second argument hiding underneath it?'
    },
    beats: [
      {
        n: 1,
        label: 'Two economies, one country',
        hook: 'The north made things and the south grew them, and they wanted different laws.',
        teachingText:
          'Northern states had mills and cities and had ended slavery. Southern states grew cotton using enslaved labour, and their wealth depended on it.',
        example:
          'Every time a new state joined, both sides fought over whether slavery would be allowed there.',
        applyIt: {
          prompt: 'To secede means to leave a country and:',
          choices: ['Join another', 'Set up on your own', 'Give up land', 'Ask for help'],
          answer: 1,
          feedback: ['Not what they did.', null, 'Not the meaning.', 'Not the meaning.'],
          why: 'Eleven states did exactly this in 1860 and 1861.'
        }
      },
      {
        n: 2,
        label: 'And they wrote down why',
        hook: 'You do not have to guess what the argument was about. They published it.',
        teachingText:
          'States that seceded wrote declarations giving their reasons. Several named the protection of slavery directly, in their own words.',
        example:
          'People sometimes say the war was only about states’ rights. The states themselves said which right they meant.',
        applyIt: {
          prompt: 'The seceding states explained their reasons in written:',
          choices: ['Songs', 'Declarations', 'Maps', 'Receipts'],
          answer: 1,
          feedback: ['Not the form.', null, 'Not the form.', 'Not the form.'],
          why: 'Which is why we can read them now instead of guessing.'
        }
      }
    ],
    activity: {
      title: 'Two columns and a question',
      prep: 'Nothing to buy. Paper and a ruler.',
      needs: ['paper', 'a pencil', 'a grown-up', 'her notebook'],
      steps: [
        'Rule a page into two columns headed North and South.',
        'Write four things in each: what they made, what they grew, who did the work.',
        'Circle every line where the two columns disagree.',
        'Now write one question at the bottom: what right were the states claiming?',
        'Answer your own question in one sentence.',
        'Ask a grown-up whether your answer matches what the states wrote.'
      ],
      safety: 'A grown-up reads the finished page with her.',
      minutes: 12
    },
    ledger: {
      prompt:
        'Write the two things the north and south disagreed about most. End with the right the states were claiming.',
      ifSheIsStuck:
        'Ask her to read her own circled lines again. Every one of them comes back to who did the work, and whether they were paid.'
    },
    hook: {
      title: 'Whose decision is it?',
      text: 'Two people argue about who gets to decide something. That is one argument.',
      question: 'What is the second argument hiding underneath it?'
    },
    core: [
      { heading: 'Two economies, one country', text: 'Northern states had mills and cities and had ended slavery. Southern states grew cotton using enslaved labour, and their wealth depended on it.' },
      { heading: 'And they wrote down why', text: 'States that seceded wrote declarations giving their reasons. Several named the protection of slavery directly, in their own words.' }
    ],
    doing:
      'Rule a page into two columns, North and South. Write four things in each: what they made, what they grew, who did the work. Circle every disagreement and answer one question at the bottom.',
    practice: [
      { ask: 'What does secede mean?', answer: 'To leave a country and set up on your own.', why: 'Eleven states did it in 1860 and 1861.' },
      { ask: 'How do we know why the states seceded?', answer: 'They wrote declarations saying so.', why: 'Several named slavery directly.' }
    ],
    check: [
      { prompt: 'To secede means to leave a country and:', choices: ['Join another', 'Set up on your own', 'Give up land', 'Ask for help'], answer: 1, feedback: ['Not what they did.', null, 'Not it.', 'Not it.'] },
      { prompt: 'The seceding states explained their reasons in written:', choices: ['Songs', 'Declarations', 'Maps', 'Receipts'], answer: 1, feedback: ['Not the form.', null, 'Not the form.', 'Not the form.'] },
      { prompt: 'The Union means the states that were joined together as one:', choices: ['Army', 'Country', 'City', 'Farm'], answer: 1, feedback: ['Not the meaning.', null, 'Not the meaning.', 'Not the meaning.'] }
    ]
  },

  {
    id: 'ss-m10-02',
    course: 'social',
    module: 10,
    quarter: 3,
    week: 3,
    day: 2,
    n: 38,
    title: 'The first shot and the turning point',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'The war began at Fort Sumter in 1861 and turned at Gettysburg in 1863, after which the Confederacy never invaded the north again.',
    standards: ['SS4H5c'],
    offGrade: null,
    words: ['confederacy', 'invade', 'casualty', 'turning point'],
    glossary: [
      { word: 'confederacy', plain: 'The eleven states that left the Union.' },
      { word: 'invade', plain: 'To enter another country by force.' },
      { word: 'casualty', plain: 'Somebody killed or wounded in a battle.' },
      { word: 'turning point', plain: 'The moment after which everything goes the other way.' }
    ],
    video: {
      id: '7ALyq3seK2g',
      url: 'https://www.youtube.com/watch?v=7ALyq3seK2g',
      title: 'The Battle of Gettysburg: The Civil War in Four Minutes',
      channel: 'American Battlefield Trust',
      minutes: 5,
      verified: '2026-08-17',
      teaches: ['Gettysburg', 'Civil War', 'Lee', 'Union', 'turning point'],
      sourceGap:
        'It covers Gettysburg and not Fort Sumter, so beat 1 carries the opening shot directly. An American Battlefield Trust Fort Sumter battle map (Hfn5BZZBpoU) was found and is held unverified. No Black American educator identified. Open.'
    },
    checkIn: {
      title: 'The moment it tips',
      text: 'In a long game there is often one moment after which everything runs one way.',
      question: 'Can you tell at the time, or only afterwards?'
    },
    beats: [
      {
        n: 1,
        label: 'It started at a fort in a harbour',
        hook: 'The war began with a fort that would not surrender and a harbour full of guns.',
        teachingText:
          'Fort Sumter sat in Charleston harbour in South Carolina. In April 1861 Confederate guns fired on it. That was the first shot of the war.',
        example:
          'Nobody was killed in the bombardment itself. Four years and enormous casualties followed it.',
        applyIt: {
          prompt: 'The Civil War began with firing on Fort:',
          choices: ['McHenry', 'Sumter', 'Ticonderoga', 'Pulaski'],
          answer: 1,
          feedback: ['That was 1814.', null, 'That was earlier.', 'Not the first.'],
          why: 'April 1861, in Charleston harbour.'
        }
      },
      {
        n: 2,
        label: 'And it turned in a small town',
        hook: 'Three days of fighting in Pennsylvania, and the Confederacy never invaded the north again.',
        teachingText:
          'At Gettysburg in July 1863 Lee’s army attacked and was beaten. The casualties on both sides were enormous. It is called the turning point.',
        example:
          'Lincoln went there months later and gave a speech of about two minutes that people still learn by heart.',
        applyIt: {
          prompt: 'After Gettysburg, the Confederacy never again:',
          choices: ['Fought', 'Invaded the north', 'Had generals', 'Grew cotton'],
          answer: 1,
          feedback: ['The war went on.', null, 'It still did.', 'It still did.'],
          why: 'That is why it is called the turning point.'
        }
      }
    ],
    activity: {
      title: 'Mark the two moments',
      prep: 'Nothing to buy. Her map from Quarter 2.',
      needs: ['her map from lesson 26', 'coloured pencils', 'her notebook'],
      steps: [
        'Take out the map you labelled in Quarter 2.',
        'Find Charleston in South Carolina and mark it 1861.',
        'Find Gettysburg in Pennsylvania and mark it 1863.',
        'Draw a line between them and write the number of years on it.',
        'Write down which of the two is further north.',
        'Write one sentence on why Lee going north mattered so much.'
      ],
      safety: 'None needed. Keep the map for the next lesson.',
      minutes: 12
    },
    ledger: {
      prompt:
        'Write where the war started and where it turned. End with why Gettysburg is called the turning point.',
      ifSheIsStuck:
        'Ask her which direction Lee was going at Gettysburg, and which direction the Confederacy went afterwards.'
    },
    hook: {
      title: 'The moment it tips',
      text: 'In a long game there is often one moment after which everything runs one way.',
      question: 'Can you tell at the time, or only afterwards?'
    },
    core: [
      { heading: 'It started at a fort in a harbour', text: 'Fort Sumter sat in Charleston harbour in South Carolina. In April 1861 Confederate guns fired on it. That was the first shot of the war.' },
      { heading: 'And it turned in a small town', text: 'At Gettysburg in July 1863 Lee’s army attacked and was beaten. The casualties on both sides were enormous. It is called the turning point.' }
    ],
    doing:
      'Take out your map. Mark Charleston 1861 and Gettysburg 1863, draw a line between them and write the number of years on it. Note which is further north.',
    practice: [
      { ask: 'Where did the Civil War begin?', answer: 'Fort Sumter, in Charleston harbour.', why: 'April 1861.' },
      { ask: 'Why is Gettysburg called the turning point?', answer: 'The Confederacy never invaded the north again.', why: 'Lee attacked there and was beaten.' }
    ],
    check: [
      { prompt: 'The Civil War began with firing on Fort:', choices: ['McHenry', 'Sumter', 'Ticonderoga', 'Pulaski'], answer: 1, feedback: ['That was 1814.', null, 'Earlier.', 'Not the first.'] },
      { prompt: 'After Gettysburg, the Confederacy never again:', choices: ['Fought', 'Invaded the north', 'Had generals', 'Grew cotton'], answer: 1, feedback: ['War went on.', null, 'It still did.', 'It still did.'] },
      { prompt: 'A casualty is somebody killed or:', choices: ['Captured', 'Wounded', 'Promoted', 'Sent home'], answer: 1, feedback: ['Not the word.', null, 'Not the word.', 'Not the word.'] }
    ]
  },

  {
    id: 'ss-m10-03',
    course: 'social',
    module: 10,
    quarter: 3,
    week: 4,
    day: 1,
    n: 39,
    title: 'It came through Georgia',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'Sherman took Atlanta in 1864 and then marched to the sea, destroying what the South needed to keep fighting.',
    standards: ['SS4H5c'],
    offGrade: null,
    words: ['campaign', 'siege', 'supply line', 'surrender'],
    glossary: [
      { word: 'campaign', plain: 'A series of battles with one aim.' },
      { word: 'siege', plain: 'Surrounding a city until it gives up.' },
      { word: 'supply line', plain: 'The route food and weapons travel to an army.' },
      { word: 'surrender', plain: 'To give up and stop fighting.' }
    ],
    video: {
      id: 'FP-BQJE2C64',
      url: 'https://www.youtube.com/watch?v=FP-BQJE2C64',
      title: 'The Atlanta Campaign: The Civil War in Four Minutes',
      channel: 'American Battlefield Trust',
      minutes: 4,
      verified: '2026-08-17',
      teaches: ['Atlanta Campaign', 'Sherman', 'Georgia', 'Civil War', 'railroads'],
      sourceGap:
        'GPB has an hour-long documentary on Sherman in Georgia (U8kSUDp2BC0), far too long for the block but a real option for a grown-up. It is recorded here rather than lost. No Black American educator identified. Open.'
    },
    checkIn: {
      title: 'This happened here',
      text: 'Every battle so far has been somewhere else. This one came through your state.',
      question: 'Does knowing a thing happened near you change how you read it?'
    },
    beats: [
      {
        n: 1,
        label: 'Atlanta was a railway city',
        hook: 'Sherman did not want Atlanta for its buildings. He wanted its railways.',
        teachingText:
          'Atlanta was where southern railways met, so supplies moved through it. Sherman fought his way to it through 1864 and took it in September.',
        example:
          'Cut the railway and you cut the food, the weapons and the reinforcements at the same time.',
        applyIt: {
          prompt: 'Atlanta mattered in 1864 mainly because of its:',
          choices: ['Rivers', 'Railways', 'Mountains', 'Harbour'],
          answer: 1,
          feedback: ['Not why.', null, 'Not why.', 'It has none.'],
          why: 'Southern supply lines met there.'
        }
      },
      {
        n: 2,
        label: 'And then he marched to the sea',
        hook: 'From Atlanta his army walked to Savannah, wrecking as it went.',
        teachingText:
          'The March to the Sea destroyed railways, farms and stores across Georgia. The aim was to break the South’s ability to keep fighting.',
        example:
          'Thousands of enslaved people left plantations and followed the army as it moved.',
        applyIt: {
          prompt: 'Sherman’s March to the Sea ended at the city of:',
          choices: ['Atlanta', 'Savannah', 'Charleston', 'Richmond'],
          answer: 1,
          feedback: ['That is where it started.', null, 'Different state.', 'Different state.'],
          why: 'From the middle of Georgia out to the coast.'
        }
      }
    ],
    activity: {
      title: 'Trace it across your own state',
      prep: 'Nothing to buy. A map of Georgia.',
      needs: ['a map of Georgia, on paper or a screen', 'her notebook', 'a pencil'],
      steps: [
        'Find Atlanta and Savannah on a map of Georgia.',
        'Draw the line between them and measure it with the scale.',
        'Mark any town you know that sits near that line.',
        'Work out how many days the walk took at ten miles a day.',
        'Write down the distance and the number of days.',
        'Write one sentence about what it means that this came through here.'
      ],
      safety: 'A grown-up is nearby. If she names a town she knows, let her talk about it.',
      minutes: 12
    },
    ledger: {
      prompt:
        'Write why Sherman wanted Atlanta and what the March to the Sea destroyed. End with your distance.',
      ifSheIsStuck:
        'Ask her to name the towns she marked. This is the only lesson in the course she can point at from a car window.'
    },
    hook: {
      title: 'This happened here',
      text: 'Every battle so far has been somewhere else. This one came through your state.',
      question: 'Does knowing a thing happened near you change how you read it?'
    },
    core: [
      { heading: 'Atlanta was a railway city', text: 'Atlanta was where southern railways met, so supplies moved through it. Sherman fought his way to it through 1864 and took it in September.' },
      { heading: 'And then he marched to the sea', text: 'The March to the Sea destroyed railways, farms and stores across Georgia. The aim was to break the South’s ability to keep fighting.' }
    ],
    doing:
      'Find Atlanta and Savannah on a map of Georgia. Draw the line between them and measure it. Mark any town you know near it, and work out the days at ten miles a day.',
    practice: [
      { ask: 'Why did Sherman want Atlanta?', answer: 'It was where the southern railways met.', why: 'Cutting it cut the supply lines.' },
      { ask: 'Where did the March to the Sea end?', answer: 'Savannah, on the coast.', why: 'It crossed the whole state.' }
    ],
    check: [
      { prompt: 'Atlanta mattered in 1864 mainly because of its:', choices: ['Rivers', 'Railways', 'Mountains', 'Harbour'], answer: 1, feedback: ['Not why.', null, 'Not why.', 'It has none.'] },
      { prompt: 'Sherman’s March to the Sea ended at the city of:', choices: ['Atlanta', 'Savannah', 'Charleston', 'Richmond'], answer: 1, feedback: ['It started there.', null, 'Different state.', 'Different state.'] },
      { prompt: 'A supply line is the route food and weapons travel to an:', choices: ['Island', 'Army', 'Office', 'Orchard'], answer: 1, feedback: ['Not it.', null, 'Not it.', 'Not it.'] }
    ]
  },

  {
    id: 'ss-m10-04',
    course: 'social',
    module: 10,
    quarter: 3,
    week: 4,
    day: 2,
    n: 40,
    title: 'Two presidents at once',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'Abraham Lincoln led the Union and Jefferson Davis led the Confederacy, and each was trying to hold something together.',
    standards: ['SS4H5d'],
    offGrade: null,
    words: ['president', 'emancipation', 'proclamation', 'inaugural'],
    glossary: [
      { word: 'president', plain: 'The elected leader of a country.' },
      { word: 'emancipation', plain: 'Setting people free from being owned.' },
      { word: 'proclamation', plain: 'An official announcement made in public.' },
      { word: 'inaugural', plain: 'To do with the day a president begins.' }
    ],
    video: {
      id: 'MT5bRX6FWSI',
      url: 'https://www.youtube.com/watch?v=MT5bRX6FWSI',
      title: 'Lincoln v. Davis: A Tale of Two Leaders',
      channel: 'Untold History',
      minutes: 2,
      verified: '2026-08-17',
      teaches: ['Abraham Lincoln', 'Jefferson Davis', 'Union', 'Confederacy', 'leadership'],
      sourceGap:
        'Two minutes is short for the block, so both beats carry substantial teaching. A Homeschool Pop Lincoln video (RiyrVM9EeAQ, 10:17) and a Bedtime History Jefferson Davis video (ipZEyCgXAWk, 3:49) were found and are held unverified. No Black American educator identified. Open.'
    },
    checkIn: {
      title: 'The same job, opposite ways',
      text: 'Two people have the same title at the same time, and each says the other has no right to it.',
      question: 'How can both be a president of the same land?'
    },
    beats: [
      {
        n: 1,
        label: 'Lincoln held the Union together',
        hook: 'He was elected, states left before he took office, and he refused to accept that they could.',
        teachingText:
          'Lincoln argued that the Union could not be broken. In 1863 he issued the Emancipation Proclamation, declaring enslaved people in rebelling states to be free.',
        example:
          'It did not free everyone at once. It changed what the war was for, and it let Black soldiers join the Union army.',
        applyIt: {
          prompt: 'Emancipation means setting people free from being:',
          choices: ['Taxed', 'Owned', 'Watched', 'Moved'],
          answer: 1,
          feedback: ['Not the meaning.', null, 'Not the meaning.', 'Not the meaning.'],
          why: 'The Proclamation was announced in 1863.'
        }
      },
      {
        n: 2,
        label: 'Davis held a country that was new',
        hook: 'Jefferson Davis had to build a government and fight a war at the same time.',
        teachingText:
          'Davis was president of the Confederacy. He had fewer factories, fewer railways and fewer people, and states that disliked being told what to do.',
        example:
          'A country founded on states deciding for themselves is a hard country to run in a war.',
        applyIt: {
          prompt: 'Jefferson Davis was president of the:',
          choices: ['Union', 'Confederacy', 'Congress', 'Court'],
          answer: 1,
          feedback: ['That was Lincoln.', null, 'Not a country.', 'Not a country.'],
          why: 'The eleven states that had seceded.'
        }
      }
    ],
    activity: {
      title: 'Compare the two sides on paper',
      prep: 'Nothing to buy. Paper and a pencil.',
      needs: ['paper', 'a pencil', 'her notebook'],
      steps: [
        'Rule two columns headed Union and Confederacy.',
        'Write the president at the top of each.',
        'Add three lines: more people, more factories, more railways.',
        'Tick which side had more of each.',
        'Count the ticks in each column.',
        'Write one sentence on why the war still lasted four years.'
      ],
      safety: 'None needed.',
      minutes: 12
    },
    ledger: {
      prompt:
        'Write who led each side and one thing each was trying to hold together. End with your tick counts.',
      ifSheIsStuck:
        'Ask her why a side with fewer of everything fought for four years. Ground she knew, and something to lose.'
    },
    hook: {
      title: 'The same job, opposite ways',
      text: 'Two people have the same title at the same time, and each says the other has no right to it.',
      question: 'How can both be a president of the same land?'
    },
    core: [
      { heading: 'Lincoln held the Union together', text: 'Lincoln argued that the Union could not be broken. In 1863 he issued the Emancipation Proclamation, declaring enslaved people in rebelling states to be free.' },
      { heading: 'Davis held a country that was new', text: 'Davis was president of the Confederacy. He had fewer factories, fewer railways and fewer people, and states that disliked being told what to do.' }
    ],
    doing:
      'Rule two columns headed Union and Confederacy, with the president at the top of each. Add three lines for people, factories and railways, tick which side had more, and count.',
    practice: [
      { ask: 'What was the Emancipation Proclamation?', answer: 'Lincoln’s 1863 announcement freeing enslaved people in rebelling states.', why: 'It changed what the war was for.' },
      { ask: 'Who led the Confederacy?', answer: 'Jefferson Davis.', why: 'He had to build a government and fight at once.' }
    ],
    check: [
      { prompt: 'Emancipation means setting people free from being:', choices: ['Taxed', 'Owned', 'Watched', 'Moved'], answer: 1, feedback: ['Not it.', null, 'Not it.', 'Not it.'] },
      { prompt: 'Jefferson Davis was president of the:', choices: ['Union', 'Confederacy', 'Congress', 'Court'], answer: 1, feedback: ['That was Lincoln.', null, 'Not a country.', 'Not a country.'] },
      { prompt: 'A proclamation is an official announcement made in:', choices: ['Secret', 'Public', 'Court', 'Writing only'], answer: 1, feedback: ['Opposite.', null, 'Not the meaning.', 'Not only.'] }
    ]
  }
];

export function m10LessonById(id) {
  return SOCIAL_M10.find((l) => l.id === id) || null;
}

export default SOCIAL_M10;
