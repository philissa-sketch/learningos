// ---------------------------------------------------------------------------
// SOCIAL STUDIES · MODULE 12 — RECONSTRUCTION, AND WHAT CAME AFTER
//
// Weeks 7-8 of Quarter 3. Georgia: SS4H6c twice, SS4H6d twice.
// THIS MODULE COMPLETES THE COURSE.
//
// ---- WHY THESE FOUR ELEMENTS GOT FOUR LESSONS ----
//
// Georgia packs two mechanisms into SS4H6c: how slavery was replaced, AND how
// freed people were prevented from exercising rights they had just won. Those
// are different machines and they get a lesson each. SS4H6d likewise names the
// laws AND the practices.
//
// Gigi's standing rule is that the Black-American-educator requirement is not a
// nice-to-have on SS4H6c and SS4H6d. TWO OF THESE FOUR LESSONS CARRY LIKELY
// BLACK-LED CHANNELS — Black History Files on the taking of the vote, and The
// Blk History Channel on Jim Crow. A third is Georgia Public Broadcasting.
// Recorded as likely, not confirmed: identity is judged from name and
// presentation only, and unknown stays unknown.
//
// ---- LESSON 48 ENDS THE COURSE INSIDE LIVING MEMORY ----
//
// Jim Crow did not end in a history book. It ended within the lifetime of
// people Azianna can go and ask. Gigi was told this was the strongest thing in
// the course and asked whether she wanted it handled differently. She said
// continue. So the last lesson of forty-eight sends her to talk to somebody.
// ---------------------------------------------------------------------------

export const SOCIAL_M12_META = {
  courseId: 'social',
  module: 12,
  title: 'Reconstruction, and What Came After',
  blurb:
    'Slavery ended and the work did not change. The vote was won and then taken back, one rule at a time. And the laws that followed lasted long enough that somebody she knows can remember them.'
};

export const SOCIAL_M12 = [
  {
    id: 'ss-m12-01',
    course: 'social',
    module: 12,
    quarter: 3,
    week: 7,
    day: 1,
    n: 45,
    title: 'Free, and still in the same field',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'Sharecropping let landowners keep the same workers in the same fields by paying them in a share of the crop and keeping them in debt.',
    standards: ['SS4H6c'],
    offGrade: null,
    words: ['sharecropping', 'debt', 'landowner', 'harvest'],
    glossary: [
      { word: 'sharecropping', plain: 'Farming somebody else’s land for a share of the crop.' },
      { word: 'debt', plain: 'Money you owe and have to pay back.' },
      { word: 'landowner', plain: 'The person who owns the land being farmed.' },
      { word: 'harvest', plain: 'The crop when it is gathered in.' }
    ],
    video: {
      id: 'qYZBnAgS1oM',
      url: 'https://www.youtube.com/watch?v=qYZBnAgS1oM',
      title: 'Sharecropping Explained: How a New System Kept Freed Slaves in Poverty',
      channel: 'History Savant',
      minutes: 11,
      verified: '2026-08-17',
      teaches: ['sharecropping', 'debt', 'Reconstruction', 'freed people', 'landowners'],
      sourceGap:
        '⚠️ ELEVEN MINUTES AGAINST A TEN-MINUTE VIDEO SLOT, and it is used anyway because it states the mechanism in its own title rather than describing the arrangement neutrally. The caveat is written here rather than buried. An NBC News Learn alternative runs 2:11 and is far thinner. No Black American educator identified. Open.'
    },
    checkIn: {
      title: 'Paid at the end of the year',
      text: 'You do a whole year of work. You are paid once, at the end, out of what you produced.',
      question: 'What could go wrong between now and then?'
    },
    beats: [
      {
        n: 1,
        label: 'The land stayed where it was',
        hook: 'Slavery ended. Nobody handed out the land.',
        teachingText:
          'Freed people had no land and no money. Landowners had land and no workers. So sharecropping appeared: farm my land, keep a share of what you grow.',
        example:
          'The share was often a third or a half. The landowner decided how it was counted.',
        applyIt: {
          prompt: 'Sharecropping means farming somebody else’s land for a share of the:',
          choices: ['Land', 'Crop', 'Rent', 'Tools'],
          answer: 1,
          feedback: ['They kept the land.', null, 'Rent was owed, not shared.', 'Tools were lent.'],
          why: 'And the landowner counted the share.'
        }
      },
      {
        n: 2,
        label: 'And the debt held people in place',
        hook: 'The trap was not the work. It was the shop.',
        teachingText:
          'Seed, tools and food were bought on credit from the landowner’s store, at his prices. At harvest the debt was taken first. Many families ended the year owing more.',
        example:
          'A person who owes money for last year cannot leave to work somewhere else. That is how a free person is held.',
        applyIt: {
          prompt: 'The thing that stopped a sharecropper from leaving was usually:',
          choices: ['A law', 'Debt', 'A fence', 'A contract'],
          answer: 1,
          feedback: ['Not usually.', null, 'Not it.', 'Contracts were part of it.'],
          why: 'Owing money at the store did the work chains had done.'
        }
      }
    ],
    activity: {
      title: 'Run one year on paper',
      prep: 'Nothing to buy. Paper and simple sums.',
      needs: ['paper', 'a pencil', 'a grown-up', 'her notebook'],
      steps: [
        'Say the harvest is worth one hundred pounds of cotton.',
        'The landowner takes half. Write down what is left.',
        'Now take away thirty for seed, tools and food bought on credit.',
        'Write down what the family has at the end of the year.',
        'Do it again for a year where the harvest is only seventy.',
        'Write down what happens in the second year, and how it carries forward.'
      ],
      safety:
        'A grown-up stays for the second sum. It ends below zero, and that is the point of the lesson.',
      minutes: 14
    },
    ledger: {
      prompt:
        'Write what sharecropping was and how debt kept families in place. End with your second-year number.',
      ifSheIsStuck:
        'Ask her what the family does in year three. They cannot leave, because leaving does not cancel what is owed.'
    },
    hook: {
      title: 'Paid at the end of the year',
      text: 'You do a whole year of work. You are paid once, at the end, out of what you produced.',
      question: 'What could go wrong between now and then?'
    },
    core: [
      { heading: 'The land stayed where it was', text: 'Freed people had no land and no money. Landowners had land and no workers. So sharecropping appeared: farm my land, keep a share of what you grow.' },
      { heading: 'And the debt held people in place', text: 'Seed, tools and food were bought on credit from the landowner’s store, at his prices. At harvest the debt was taken first.' }
    ],
    doing:
      'Say the harvest is a hundred pounds of cotton. The landowner takes half. Take thirty more for seed and food bought on credit. Write what is left, then do it again with a harvest of seventy.',
    practice: [
      { ask: 'What is sharecropping?', answer: 'Farming somebody else’s land for a share of the crop.', why: 'The landowner counted the share.' },
      { ask: 'What kept sharecroppers from leaving?', answer: 'Debt owed at the landowner’s store.', why: 'Leaving did not cancel what was owed.' }
    ],
    check: [
      { prompt: 'Sharecropping means farming another’s land for a share of the:', choices: ['Land', 'Crop', 'Rent', 'Tools'], answer: 1, feedback: ['They kept the land.', null, 'Rent was owed.', 'Tools were lent.'] },
      { prompt: 'The thing that stopped a sharecropper leaving was usually:', choices: ['A law', 'Debt', 'A fence', 'A guard'], answer: 1, feedback: ['Not usually.', null, 'Not it.', 'Not it.'] },
      { prompt: 'At harvest time, the first thing taken out was the:', choices: ['Seed', 'Debt', 'Food', 'Rent'], answer: 1, feedback: ['Part of the debt.', null, 'Part of the debt.', 'After the debt.'] }
    ]
  },

  {
    id: 'ss-m12-02',
    course: 'social',
    module: 12,
    quarter: 3,
    week: 7,
    day: 2,
    n: 46,
    title: 'Taking the vote back',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'The 15th Amendment gave Black men the vote, and states took it away again using rules that never mentioned race.',
    standards: ['SS4H6c'],
    offGrade: null,
    words: ['poll tax', 'literacy test', 'grandfather clause', 'register'],
    glossary: [
      { word: 'poll tax', plain: 'Money a person had to pay before being allowed to vote.' },
      { word: 'literacy test', plain: 'A reading test given before a person could vote.' },
      { word: 'grandfather clause', plain: 'A rule letting a man vote if his grandfather had.' },
      { word: 'register', plain: 'To sign up on the list of people allowed to vote.' }
    ],
    video: {
      id: 'pc2s0hs5_Ok',
      url: 'https://www.youtube.com/watch?v=pc2s0hs5_Ok',
      title: 'How Did Literacy Tests Stop Black Voting In Reconstruction? - Black History Files',
      channel: 'Black History Files',
      minutes: 3,
      verified: '2026-08-17',
      teaches: ['literacy test', 'voting', 'Reconstruction', 'disenfranchisement', 'Black voters'],
      sourceGap:
        '⭐ A LIKELY BLACK-LED CHANNEL, recorded as likely and NOT confirmed. It runs 2:50, so beat 2 carries the poll tax and grandfather clause directly. A Jim Crow Museum video on voting rights and literacy tests (P2qPT_j2brk, 4:21) is verified and held as a second source — that is a real museum collection at a university.'
    },
    checkIn: {
      title: 'A rule that never says your name',
      text: 'A rule can be written so that it never mentions a group, and still keeps that group out.',
      question: 'How would you spot a rule like that?'
    },
    beats: [
      {
        n: 1,
        label: 'The test nobody could pass',
        hook: 'A reading test sounds fair until you find out who marks it.',
        teachingText:
          'Southern states required a literacy test before a man could register to vote. The clerk decided who passed. Black voters were failed on impossible questions.',
        example:
          'Some tests asked how many bubbles are in a bar of soap. The point was never the answer.',
        applyIt: {
          prompt: 'A literacy test was a test of reading given before a man could:',
          choices: ['Work', 'Vote', 'Marry', 'Travel'],
          answer: 1,
          feedback: ['Not the barrier.', null, 'Not the barrier.', 'Not the barrier.'],
          why: 'And the person marking it decided who passed.'
        }
      },
      {
        n: 2,
        label: 'The tax, and the clause that let others through',
        hook: 'Charge everybody, then let some people off. That is the whole trick.',
        teachingText:
          'A poll tax meant paying money to vote, which poor people could not. A grandfather clause let a man vote without the test if his grandfather had voted.',
        example:
          'A Black man’s grandfather had been enslaved and could not have voted. The clause let poor white men through and kept Black men out, without naming anybody.',
        applyIt: {
          prompt: 'A grandfather clause let a man vote if his grandfather had:',
          choices: ['Paid tax', 'Voted', 'Owned land', 'Read well'],
          answer: 1,
          feedback: ['Not the rule.', null, 'Not the rule.', 'Not the rule.'],
          why: 'Which no formerly enslaved man’s grandfather ever had.'
        }
      }
    ],
    activity: {
      title: 'Design a fair rule, then break it',
      prep: 'Nothing to buy. Paper and a grown-up.',
      needs: ['paper', 'a pencil', 'a grown-up', 'her notebook'],
      steps: [
        'Invent a rule for who gets the last slice of cake. Make it sound completely fair.',
        'Now find a way that rule could always favour one person.',
        'Write down the fair-sounding rule and the unfair result side by side.',
        'Ask a grown-up whether the rule mentions that person by name.',
        'Underline the words that do the real work.',
        'Write one sentence about how a poll tax kept people from voting.'
      ],
      safety: 'A grown-up reads the finished page with her and talks about it.',
      minutes: 12
    },
    ledger: {
      prompt:
        'Name the three rules used to stop Black men voting. End with your own fair-sounding rule and what it really did.',
      ifSheIsStuck:
        'Ask her whether her rule mentioned anybody by name. Neither did theirs, and that was the point.'
    },
    hook: {
      title: 'A rule that never says your name',
      text: 'A rule can be written so that it never mentions a group, and still keeps that group out.',
      question: 'How would you spot a rule like that?'
    },
    core: [
      { heading: 'The test nobody could pass', text: 'Southern states required a literacy test before a man could register to vote. The clerk decided who passed. Black voters were failed on impossible questions.' },
      { heading: 'The tax, and the clause that let others through', text: 'A poll tax meant paying money to vote. A grandfather clause let a man vote without the test if his grandfather had voted.' }
    ],
    doing:
      'Invent a rule for who gets the last slice of cake that sounds completely fair. Find a way it could always favour one person. Write the rule and the result side by side, and underline the words doing the work.',
    practice: [
      { ask: 'What was a poll tax?', answer: 'Money a person had to pay before voting.', why: 'Poor people could not pay it.' },
      { ask: 'Why did the grandfather clause keep Black men out?', answer: 'Their grandfathers had been enslaved and could not vote.', why: 'It never mentioned race at all.' }
    ],
    check: [
      { prompt: 'A literacy test was a reading test given before a man could:', choices: ['Work', 'Vote', 'Marry', 'Travel'], answer: 1, feedback: ['Not the barrier.', null, 'Not the barrier.', 'Not the barrier.'] },
      { prompt: 'A grandfather clause let a man vote if his grandfather had:', choices: ['Paid tax', 'Voted', 'Owned land', 'Read well'], answer: 1, feedback: ['Not the rule.', null, 'Not the rule.', 'Not the rule.'] },
      { prompt: 'To register means to sign up on the list of people allowed to:', choices: ['Work', 'Vote', 'Farm', 'Travel'], answer: 1, feedback: ['Not it.', null, 'Not it.', 'Not it.'] }
    ]
  },

  {
    id: 'ss-m12-03',
    course: 'social',
    module: 12,
    quarter: 3,
    week: 8,
    day: 1,
    n: 47,
    title: 'Separate, written down as law',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'Jim Crow laws required Black and white people to be kept apart in almost every public place, and a court said that was allowed.',
    standards: ['SS4H6d'],
    offGrade: null,
    words: ['segregation', 'separate', 'ruling', 'public'],
    glossary: [
      { word: 'segregation', plain: 'Keeping groups of people apart on purpose.' },
      { word: 'separate', plain: 'Kept away from each other.' },
      { word: 'ruling', plain: 'A decision a court makes about what a law means.' },
      { word: 'public', plain: 'Open to everybody, in theory.' }
    ],
    video: {
      id: 'nje1U7jJOHI',
      url: 'https://www.youtube.com/watch?v=nje1U7jJOHI',
      title: 'Jim Crow Laws and Racial Segregation in America | The Civil Rights Movement',
      channel: 'GPB Education',
      minutes: 6,
      verified: '2026-08-17',
      teaches: ['Jim Crow', 'segregation', 'separate but equal', 'laws', 'the South'],
      sourceGap:
        'Georgia Public Broadcasting — her own state’s educational broadcaster, on laws her own state had. Chosen over four alternatives for that reason. No Black American educator identified for this particular video; the next lesson’s video is from a likely Black-led channel. Open.'
    },
    checkIn: {
      title: 'Separate but equal',
      text: 'Somebody tells you two things are separate and also exactly equal.',
      question: 'How would you check whether that was true?'
    },
    beats: [
      {
        n: 1,
        label: 'It was written into the law',
        hook: 'This was not a habit or an attitude. It was printed in statute books.',
        teachingText:
          'From the 1870s southern states passed laws requiring separate schools, separate railway carriages, separate waiting rooms, drinking fountains and hospitals.',
        example:
          'The laws got their name from a stage character. The name was a joke. The laws were not.',
        applyIt: {
          prompt: 'Segregation means keeping groups of people apart:',
          choices: ['By accident', 'On purpose', 'For a day', 'In secret'],
          answer: 1,
          feedback: ['Not accidental.', null, 'Far longer.', 'It was public law.'],
          why: 'Jim Crow laws required it in almost every public place.'
        }
      },
      {
        n: 2,
        label: 'And a court said it was allowed',
        hook: 'In 1896 the Supreme Court looked at this and said it was fine.',
        teachingText:
          'The ruling was called separate but equal. In practice the separate things were almost never equal, and everybody involved knew it.',
        example:
          'Black schools got a fraction of the money, older books and shorter terms. The word equal was doing no work at all.',
        applyIt: {
          prompt: 'The 1896 ruling said facilities could be separate as long as they were:',
          choices: ['Cheap', 'Equal', 'New', 'Nearby'],
          answer: 1,
          feedback: ['Not the word.', null, 'Not the word.', 'Not the word.'],
          why: 'They almost never were, and the ruling stood for decades anyway.'
        }
      }
    ],
    activity: {
      title: 'Check whether equal is equal',
      prep: 'Nothing to buy. Two sets of anything.',
      needs: ['two unequal sets of the same thing', 'paper', 'her notebook'],
      steps: [
        'Make two piles of the same kind of thing, one clearly better than the other.',
        'Write a label for each saying only "separate" and "equal".',
        'Ask somebody to pick a pile using only the labels.',
        'Now show them the piles and ask again.',
        'Write down what the labels hid.',
        'Write one sentence about the words separate but equal.'
      ],
      safety: 'A grown-up talks it through with her at the end.',
      minutes: 12
    },
    ledger: {
      prompt:
        'Write what Jim Crow laws required and what the 1896 ruling said. End with what your two labels hid.',
      ifSheIsStuck:
        'Ask her which word in separate but equal was actually enforced. Only one of them was.'
    },
    hook: {
      title: 'Separate but equal',
      text: 'Somebody tells you two things are separate and also exactly equal.',
      question: 'How would you check whether that was true?'
    },
    core: [
      { heading: 'It was written into the law', text: 'From the 1870s southern states passed laws requiring separate schools, separate railway carriages, separate waiting rooms, drinking fountains and hospitals.' },
      { heading: 'And a court said it was allowed', text: 'In 1896 the Supreme Court ruled that separate but equal was lawful. In practice the separate things were almost never equal.' }
    ],
    doing:
      'Make two piles of the same thing, one clearly better. Label them only "separate" and "equal". Ask somebody to choose using the labels, then show them the piles and ask again.',
    practice: [
      { ask: 'What is segregation?', answer: 'Keeping groups of people apart on purpose.', why: 'Jim Crow laws required it by law.' },
      { ask: 'What did the 1896 ruling say?', answer: 'That separate but equal was lawful.', why: 'The separate things were almost never equal.' }
    ],
    check: [
      { prompt: 'Segregation means keeping groups of people apart:', choices: ['By accident', 'On purpose', 'For a day', 'In secret'], answer: 1, feedback: ['Not accidental.', null, 'Far longer.', 'It was public law.'] },
      { prompt: 'The 1896 ruling said facilities could be separate if they were:', choices: ['Cheap', 'Equal', 'New', 'Nearby'], answer: 1, feedback: ['Not the word.', null, 'Not the word.', 'Not the word.'] },
      { prompt: 'A ruling is a decision a court makes about what a law:', choices: ['Costs', 'Means', 'Weighs', 'Looks like'], answer: 1, feedback: ['Not it.', null, 'Not it.', 'Not it.'] }
    ]
  },

  {
    id: 'ss-m12-04',
    course: 'social',
    module: 12,
    quarter: 3,
    week: 8,
    day: 2,
    n: 48,
    title: 'How long it lasted',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'Jim Crow was not only written law but daily practice, and it lasted long enough that people alive today grew up inside it.',
    standards: ['SS4H6d'],
    offGrade: null,
    words: ['practice', 'custom', 'civil rights', 'living memory'],
    glossary: [
      { word: 'practice', plain: 'What people actually do, whether or not a law says so.' },
      { word: 'custom', plain: 'A way of doing things because it has always been done.' },
      { word: 'civil rights', plain: 'The rights every citizen is supposed to have.' },
      { word: 'living memory', plain: 'Close enough in time that people still remember it.' }
    ],
    video: {
      id: 'aIEEsQZZXpA',
      url: 'https://www.youtube.com/watch?v=aIEEsQZZXpA',
      title: 'What Was Jim Crow? A Simple Explanation for Young Minds',
      channel: 'The Blk History Channel',
      minutes: 3,
      verified: '2026-08-17',
      teaches: ['Jim Crow', 'segregation', 'civil rights', 'daily life', 'the South'],
      sourceGap:
        '⭐ A LIKELY BLACK-LED CHANNEL, and explicitly made for young children — recorded as likely and NOT confirmed, judged from name and presentation only. THIS IS THE LAST VIDEO IN THE COURSE and it is the right one to end on. A Twinkl segregation video and a Kids Academy Civil Rights Act video were found and held.'
    },
    checkIn: {
      title: 'Somebody you can ask',
      text: 'Most of this course is about people who are gone. This part is not.',
      question: 'Who in your family might remember the things in today’s lesson?'
    },
    beats: [
      {
        n: 1,
        label: 'The law was only half of it',
        hook: 'Some of it was written down. The rest was simply what happened.',
        teachingText:
          'Beyond the laws there were customs enforced by threat: which door to use, when to step aside, what could not be said. Breaking a custom could be as dangerous as breaking a law.',
        example:
          'Families taught children the rules carefully, because getting them wrong was not a small thing.',
        applyIt: {
          prompt: 'A practice is what people actually do, whether or not a law:',
          choices: ['Allows it', 'Says so', 'Is old', 'Is written'],
          answer: 1,
          feedback: ['Not the meaning.', null, 'Not the meaning.', 'Close, not it.'],
          why: 'Half of Jim Crow was never in a statute book.'
        }
      },
      {
        n: 2,
        label: 'And it ended inside living memory',
        hook: 'The Civil Rights Act was passed in 1964. Work out how long ago that is.',
        teachingText:
          'Jim Crow laws were struck down through the 1950s and 1960s, after decades of organised effort. People who went to segregated schools are alive now.',
        example:
          'That is under a hundred years. Somebody in her own family may have lived it, and can be asked.',
        applyIt: {
          prompt: 'The Civil Rights Act was passed in the year:',
          choices: ['1865', '1896', '1964', '2001'],
          answer: 2,
          feedback: ['The 13th Amendment.', 'The separate but equal ruling.', null, 'Much later.'],
          why: 'Within the lifetime of people she can go and ask.'
        }
      }
    ],
    activity: {
      title: 'Ask somebody',
      prep: 'Nothing to buy. One conversation, arranged with a grown-up.',
      needs: ['her notebook', 'a pencil', 'a grown-up to arrange it'],
      steps: [
        'With a grown-up, choose one older person in the family or nearby to talk to.',
        'Write three questions before you go. Keep them simple and open.',
        'Ask what school was like when they were nine.',
        'Listen more than you talk, and write down their exact words where you can.',
        'Thank them, and read your notes back the same day.',
        'Write one sentence about what surprised you most.'
      ],
      safety:
        'A grown-up arranges the conversation and is present. If the person would rather not, that is a complete answer and she thanks them anyway.',
      minutes: 14
    },
    ledger: {
      prompt:
        'Write the difference between a law and a practice. Then write the one thing you were told today that you did not know.',
      ifSheIsStuck:
        'Ask her what she wrote down word for word. That sentence is the end of the whole course, and she collected it herself.'
    },
    hook: {
      title: 'Somebody you can ask',
      text: 'Most of this course is about people who are gone. This part is not.',
      question: 'Who in your family might remember the things in today’s lesson?'
    },
    core: [
      { heading: 'The law was only half of it', text: 'Beyond the laws there were customs enforced by threat: which door to use, when to step aside, what could not be said. Breaking a custom could be as dangerous as breaking a law.' },
      { heading: 'And it ended inside living memory', text: 'Jim Crow laws were struck down through the 1950s and 1960s, after decades of organised effort. People who went to segregated schools are alive now.' }
    ],
    doing:
      'With a grown-up, choose one older person to talk to. Write three simple questions first. Ask what school was like when they were nine. Listen more than you talk and write their exact words.',
    practice: [
      { ask: 'What is the difference between a law and a practice?', answer: 'A law is written. A practice is what people actually do.', why: 'Half of Jim Crow was never written down.' },
      { ask: 'When was the Civil Rights Act passed?', answer: 'In 1964.', why: 'Within the lifetime of people she can ask.' }
    ],
    check: [
      { prompt: 'A practice is what people actually do, whether or not a law:', choices: ['Allows it', 'Says so', 'Is old', 'Is written'], answer: 1, feedback: ['Not it.', null, 'Not it.', 'Close, not it.'] },
      { prompt: 'The Civil Rights Act was passed in the year:', choices: ['1865', '1896', '1964', '2001'], answer: 2, feedback: ['The 13th Amendment.', 'The 1896 ruling.', null, 'Much later.'] },
      { prompt: 'Living memory means close enough in time that people still:', choices: ['Argue', 'Remember', 'Write', 'Travel'], answer: 1, feedback: ['Not the meaning.', null, 'Not the meaning.', 'Not the meaning.'] }
    ]
  }
];

export function m12LessonById(id) {
  return SOCIAL_M12.find((l) => l.id === id) || null;
}

export default SOCIAL_M12;
