// ---------------------------------------------------------------------------
// SOCIAL STUDIES · MODULE 3 — BUILDING A GOVERNMENT
//
// Weeks 5-6 of Quarter 1. Georgia: SS4H2b twice, SS4CG1b, SS4CG1d.
//
// ---- SS4H2b IS TWO LESSONS, AND THE SECOND ONE IS THE HARD ONE ----
//
// Georgia's SS4H2b names four things in one element: the weaknesses of the
// Articles, states' rights, the Great Compromise, and slavery — the
// Three-Fifths Compromise. One video covering all four at an elementary level
// does not exist, and the two that DO exist teach different halves.
//
// Colonial Williamsburg's 2:27 is elementary and good on the Great Compromise
// and thin on the Three-Fifths. The Daily Bellringer's 5:13 is squarely about
// the Three-Fifths Compromise and slavery. Two videos, two lessons.
//
// The spare lesson came from Module 2, where SS4CG1a folded into the
// Declaration because no natural-rights video existed for a nine-year-old.
// Nothing was lost. One element moved house and paid for this split.
//
// ---- LESSON 11 ASKS HER A QUESTION SHE CAN ANSWER HERSELF ----
//
// "We the People" is SS4CG1b. Lesson 10 has just taught her that the framers
// counted enslaved people as three fifths of a person. So lesson 11 does not
// TELL her who those three words left out. It asks her.
//
// ⚠️ GIGI SHOULD SEE THIS ONE. Lesson 10's video is 5:13 and is squarely about
// slavery and the Constitution. It is verified and it is honest and she is
// nine. It has been flagged for Gigi in every report since it was found.
// ---------------------------------------------------------------------------

export const SOCIAL_M3_META = {
  courseId: 'social',
  module: 3,
  title: 'Building a Government',
  blurb:
    'Two arguments nearly broke the whole thing. One was about big states and small states. The other was about whether people could be counted as property, and it was settled in a way that lasted eighty years.'
};

export const SOCIAL_M3 = [
  // -------------------------------------------------------------------------
  {
    id: 'ss-m3-01',
    course: 'social',
    module: 3,
    quarter: 1,
    week: 5,
    day: 1,
    n: 9,
    title: 'Big states, small states',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'The old rules had left the country too weak to decide anything, and the fight over how each state got a voice was settled by giving them two answers at once.',
    standards: ['SS4H2b'],
    offGrade: null,
    words: ['compromise', 'senate', 'population', 'article'],
    glossary: [
      { word: 'compromise', plain: 'Each side gives up part of what it wanted.' },
      { word: 'senate', plain: 'The house where every state has two votes.' },
      { word: 'population', plain: 'How many people live in a place.' },
      { word: 'article', plain: 'One numbered part of a set of rules.' }
    ],
    video: {
      id: 'C31YmCbHsX4',
      url: 'https://www.youtube.com/watch?v=C31YmCbHsX4',
      title: 'Constitutional Compromise | Government & Civics for Kids',
      channel: 'Colonial Williamsburg',
      minutes: 3,
      verified: '2026-08-17',
      teaches: ['compromise', 'Great Compromise', 'states', 'Congress', 'convention'],
      sourceGap:
        'THIS VIDEO IS THIN ON THE THREE-FIFTHS COMPROMISE, which SS4H2b also names. That is why SS4H2b is two lessons — the next one carries it with a video that is squarely about it. No Black American educator identified for the Great Compromise at an elementary level; searched "Great Compromise Three-Fifths Compromise explained for kids". Open.'
    },
    checkIn: {
      title: 'One vote each, or one vote per person',
      text: 'Two families choose a film. One family has two people. The other has nine.',
      question: 'Should each family get one vote, or should each person get one?'
    },
    beats: [
      {
        n: 1,
        label: 'The old rules could not decide anything',
        hook: 'The first set of rules made the country so weak it could barely act.',
        teachingText:
          'The Articles of Confederation gave states nearly all the power. The country could not raise money or settle arguments between states.',
        example:
          'A country that cannot collect taxes cannot pay soldiers. That was a real problem, not a theory.',
        applyIt: {
          prompt: 'Under the Articles of Confederation the country was:',
          choices: ['Too strong', 'Too weak to act', 'Ruled by a king', 'At war with France'],
          answer: 1,
          feedback: [
            'The opposite was the problem.',
            null,
            'There was no king.',
            'France was an ally.'
          ],
          why: 'That weakness is why they met at all.'
        }
      },
      {
        n: 2,
        label: 'So they said yes to both',
        hook: 'Big states wanted votes by size. Small states wanted one vote each.',
        teachingText:
          'The Great Compromise built two houses. In one, states get seats by population. In the other, every state gets two seats.',
        example:
          'Georgia and a much smaller state each send two senators. In the other house, the bigger state sends more.',
        applyIt: {
          prompt: 'In the Senate every state gets:',
          choices: ['Seats by size', 'Two seats', 'One seat', 'No seats'],
          answer: 1,
          feedback: [
            'That is the other house.',
            null,
            'It is two, not one.',
            'Every state has seats.'
          ],
          why: 'That is the half of the deal the small states won.'
        }
      }
    ],
    activity: {
      title: 'Run the vote both ways',
      prep: 'Nothing to buy. You need three or four people, or three or four soft toys.',
      needs: ['three or four people or toys', 'paper', 'her notebook'],
      steps: [
        'Make two teams. Give one team three members and the other team one.',
        'Pick something small to vote on, like the order of two jobs.',
        'Vote once with one vote per team. Write down who wins.',
        'Vote again with one vote per person. Write down who wins.',
        'Ask the team of one whether the second way felt fair.',
        'Write one sentence on why they built two houses instead of one.'
      ],
      safety: 'Keep the vote about something small. Nothing that matters to anybody.',
      minutes: 12
    },
    ledger: {
      prompt:
        'Write what a compromise is. Then write how the Great Compromise gave both sides part of what they wanted.',
      ifSheIsStuck:
        'Ask her which vote the team of one preferred, and which the team of three did. Both were right.'
    },
    hook: {
      title: 'One vote each, or one vote per person',
      text: 'Two families choose a film. One family has two people. The other has nine.',
      question: 'Should each family get one vote, or should each person get one?'
    },
    core: [
      {
        heading: 'The old rules could not decide anything',
        text: 'The Articles of Confederation gave states nearly all the power. The country could not raise money or settle arguments between states.'
      },
      {
        heading: 'So they said yes to both',
        text: 'The Great Compromise built two houses. In one, states get seats by population. In the other, every state gets two seats.'
      }
    ],
    doing:
      'Make two teams, one of three and one of one. Vote on something small with one vote per team, then again with one vote per person. Ask the team of one which felt fair.',
    practice: [
      {
        ask: 'What is a compromise?',
        answer: 'Each side gives up part of what it wanted.',
        why: 'Neither side won the whole argument.'
      },
      {
        ask: 'How many seats does each state get in the Senate?',
        answer: 'Two.',
        why: 'That is the half the small states won.'
      }
    ],
    check: [
      {
        prompt: 'Under the Articles of Confederation the country was:',
        choices: ['Too strong', 'Too weak to act', 'Ruled by a king', 'At war with France'],
        answer: 1,
        feedback: ['The opposite.', null, 'There was no king.', 'France was an ally.']
      },
      {
        prompt: 'In the Senate every state gets:',
        choices: ['Seats by size', 'Two seats', 'One seat', 'No seats'],
        answer: 1,
        feedback: ['That is the other house.', null, 'It is two.', 'Every state has seats.']
      },
      {
        prompt: 'The Great Compromise settled a fight between:',
        choices: ['Britain and France', 'Big states and small states', 'Farmers and sailors', 'North and South'],
        answer: 1,
        feedback: ['Not those two.', null, 'Not those two.', 'That was the other argument.']
      }
    ]
  },

  // -------------------------------------------------------------------------
  {
    id: 'ss-m3-02',
    course: 'social',
    module: 3,
    quarter: 1,
    week: 5,
    day: 2,
    n: 10,
    title: 'Counted as three fifths',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'The framers agreed to count each enslaved person as three fifths of a person, which gave slave states more power in Congress for eighty years.',
    standards: ['SS4H2b'],
    offGrade: null,
    words: ['enslaved', 'fraction', 'congress', 'power'],
    glossary: [
      { word: 'enslaved', plain: 'Held as property by another person, by force.' },
      { word: 'fraction', plain: 'A part of a whole, like three fifths.' },
      { word: 'congress', plain: 'The part of government that writes laws.' },
      { word: 'power', plain: 'How much say you get in a decision.' }
    ],
    video: {
      id: 'Lh8wC-qoqgw',
      url: 'https://www.youtube.com/watch?v=Lh8wC-qoqgw',
      title: '3/5 Compromise Explained | Constitutional Convention & Slavery | DAILY BELLRINGER',
      channel: 'The Daily Bellringer',
      minutes: 5,
      verified: '2026-08-17',
      teaches: ['Three-Fifths Compromise', 'slavery', 'Constitutional Convention', 'Congress', 'representation'],
      sourceGap:
        '⚠️ FLAGGED FOR GIGI SINCE THE DAY IT WAS FOUND. Five minutes, squarely about slavery and the Constitution, and she is nine. It is verified, it is honest, and Georgia names this element. Gigi should watch it before it plays. No Black American educator identified in this search, which is itself worth recording on this topic. Open.'
    },
    checkIn: {
      title: 'Counting people to win an argument',
      text: 'Two groups argue. Whoever has more people gets more say. So both sides start counting.',
      question: 'What happens if one side counts people it does not treat as people?'
    },
    beats: [
      {
        n: 1,
        label: 'Seats depend on how many people you have',
        hook: 'The Great Compromise made one house depend on population. That turned people into power.',
        teachingText:
          'A state with more people got more seats. So states began arguing about who counted as a person for that purpose.',
        example:
          'Southern states held huge numbers of enslaved people. They wanted them counted for seats, while giving them no rights at all.',
        applyIt: {
          prompt: 'Seats in the House depend on a state’s:',
          choices: ['Size on a map', 'Number of people', 'Age', 'Wealth'],
          answer: 1,
          feedback: [
            'Land does not decide it.',
            null,
            'Age does not decide it.',
            'Money does not decide it.'
          ],
          why: 'That is what made the next argument happen at all.'
        }
      },
      {
        n: 2,
        label: 'And they settled on a fraction',
        hook: 'They agreed to count each enslaved person as three fifths of a person.',
        teachingText:
          'That is the Three-Fifths Compromise. It gave slave states extra seats in Congress, and gave enslaved people nothing.',
        example:
          'Five enslaved people counted as three. The counting helped the state that held them, never them.',
        applyIt: {
          prompt: 'The Three-Fifths Compromise counted each enslaved person as:',
          choices: ['A whole person', 'Three fifths of a person', 'Nobody', 'Two people'],
          answer: 1,
          feedback: [
            'That is not what they agreed.',
            null,
            'They were counted, for seats.',
            'That is not what they agreed.'
          ],
          why: 'It bought agreement and it lasted eighty years.'
        }
      }
    ],
    activity: {
      title: 'Count it out with counters',
      prep: 'Nothing to buy. Ten counters and a grown-up to talk with.',
      needs: ['ten counters or buttons', 'her notebook', 'a grown-up'],
      steps: [
        'Line up ten counters. Say each one is a person.',
        'Now take away every fifth counter twice, so ten becomes six.',
        'Write down what six out of ten means, in her own words.',
        'Ask a grown-up: who did the counting help?',
        'Ask a second question: did it help the people being counted?',
        'Write one sentence about why a compromise can be agreed and still be wrong.'
      ],
      safety:
        'This one is a conversation, not a game. A grown-up stays for it, and it ends by saying plainly that it was wrong.',
      minutes: 12
    },
    ledger: {
      prompt:
        'Write what the Three-Fifths Compromise was. Then write who it gave more power to, and who it gave none.',
      ifSheIsStuck:
        'Ask her about the six counters. Somebody got more say because of people who got none at all.'
    },
    hook: {
      title: 'Counting people to win an argument',
      text: 'Two groups argue. Whoever has more people gets more say. So both sides start counting.',
      question: 'What happens if one side counts people it does not treat as people?'
    },
    core: [
      {
        heading: 'Seats depend on how many people you have',
        text: 'A state with more people got more seats. So states began arguing about who counted as a person for that purpose.'
      },
      {
        heading: 'And they settled on a fraction',
        text: 'They agreed to count each enslaved person as three fifths of a person. It gave slave states extra seats, and gave enslaved people nothing.'
      }
    ],
    doing:
      'Line up ten counters, one for each person. Take away every fifth counter twice so ten becomes six. Ask a grown-up who the counting helped, and whether it helped the people counted.',
    practice: [
      {
        ask: 'What did the Three-Fifths Compromise count?',
        answer: 'Each enslaved person as three fifths of a person.',
        why: 'It decided how many seats a state got.'
      },
      {
        ask: 'Who did that counting help?',
        answer: 'The states that held enslaved people.',
        why: 'It gave them extra seats and gave the enslaved nothing.'
      }
    ],
    check: [
      {
        prompt: 'Seats in the House depend on a state’s:',
        choices: ['Size on a map', 'Number of people', 'Age', 'Wealth'],
        answer: 1,
        feedback: ['Land does not decide it.', null, 'Age does not.', 'Money does not.']
      },
      {
        prompt: 'The Three-Fifths Compromise counted each enslaved person as:',
        choices: ['A whole person', 'Three fifths of a person', 'Nobody', 'Two people'],
        answer: 1,
        feedback: ['Not what they agreed.', null, 'They were counted, for seats.', 'Not what they agreed.']
      },
      {
        prompt: 'The extra seats it created went to:',
        choices: ['The enslaved people', 'The states that held them', 'Britain', 'Nobody'],
        answer: 1,
        feedback: ['They got nothing.', null, 'Britain had no seats.', 'The seats were real.']
      }
    ]
  },

  // -------------------------------------------------------------------------
  {
    id: 'ss-m3-03',
    course: 'social',
    module: 3,
    quarter: 1,
    week: 6,
    day: 1,
    n: 11,
    title: 'We the People',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'The Constitution opens by saying the people are the ones who agreed to it, and in 1787 the people it meant were far fewer than the words sound.',
    standards: ['SS4CG1b'],
    offGrade: null,
    words: ['preamble', 'consent', 'govern', 'citizen'],
    glossary: [
      { word: 'preamble', plain: 'The opening words that say what follows and why.' },
      { word: 'consent', plain: 'Saying yes to something on purpose.' },
      { word: 'govern', plain: 'To rule or run a place.' },
      { word: 'citizen', plain: 'A member of a country, with rights in it.' }
    ],
    video: {
      id: 'EdggncqQlKY',
      url: 'https://www.youtube.com/watch?v=EdggncqQlKY',
      title: 'Together We Can | What is the U.S. Constitution? | PBS KIDS',
      channel: 'PBS KIDS',
      minutes: 3,
      verified: '2026-08-17',
      teaches: ['Constitution', 'We the People', 'rules', 'government', 'citizens'],
      sourceGap:
        'PBS KIDS is pitched exactly at her age, which is why it was chosen over four longer alternatives. It does NOT raise who was excluded in 1787 — beat 2 does, and it asks her rather than telling her. No Black American educator identified; searched "We the People Preamble Constitution consent of the governed for kids". Open.'
    },
    checkIn: {
      title: 'Who is “we”?',
      text: 'Somebody says “we all agreed”. You were not asked. Neither were several other people.',
      question: 'Is it still true that “we” agreed?'
    },
    beats: [
      {
        n: 1,
        label: 'The power comes from the people',
        hook: 'It does not open with a king’s name. It opens with “We the People”.',
        teachingText:
          'Those first words mean the government has power because the people gave it. That is called consent of the governed.',
        example:
          'A king rules because of who his father was. A government here rules because people agreed it should.',
        applyIt: {
          prompt: '“We the People” means the government gets its power from:',
          choices: ['A king', 'The people', 'An army', 'Another country'],
          answer: 1,
          feedback: [
            'There is no king here.',
            null,
            'An army does not give it.',
            'No other country gives it.'
          ],
          why: 'Consent of the governed. The people said yes.'
        }
      },
      {
        n: 2,
        label: 'Now ask who “the People” meant',
        hook: 'You already know something that makes this a hard question.',
        teachingText:
          'In 1787 most people could not vote. Women could not. Enslaved people could not, and had just been counted as three fifths.',
        example:
          'The words were bigger than the country was. Later changes made the country grow into them.',
        applyIt: {
          prompt: 'In 1787 the people who could vote were:',
          choices: ['Everybody', 'A small part of the country', 'Only children', 'Only soldiers'],
          answer: 1,
          feedback: [
            'Far from everybody.',
            null,
            'Children could not vote.',
            'It was not only soldiers.'
          ],
          why: 'The words promised more than 1787 delivered.'
        }
      }
    ],
    activity: {
      title: 'Write your own preamble',
      prep: 'Nothing to buy. Paper and a pencil.',
      needs: ['paper', 'a pencil', 'her notebook'],
      steps: [
        'Write “We the people of this house” at the top of a page.',
        'Finish the sentence with three things the house is for.',
        'Now list every person the word “we” includes.',
        'Ask whether anybody in the house is missing from the list.',
        'Add them, and write down why they were easy to forget.',
        'Write one sentence on who “We the People” left out in 1787.'
      ],
      safety: 'None needed. Keep the list about her own house.',
      minutes: 12
    },
    ledger: {
      prompt:
        'Write what “We the People” means. Then answer, in your own words, who those three words left out in 1787.',
      ifSheIsStuck:
        'Ask her about the counters from last lesson. She already knows one group who could not say yes.'
    },
    hook: {
      title: 'Who is “we”?',
      text: 'Somebody says “we all agreed”. You were not asked. Neither were several other people.',
      question: 'Is it still true that “we” agreed?'
    },
    core: [
      {
        heading: 'The power comes from the people',
        text: 'Those first words mean the government has power because the people gave it. That is called consent of the governed.'
      },
      {
        heading: 'Now ask who “the People” meant',
        text: 'In 1787 most people could not vote. Women could not. Enslaved people could not, and had just been counted as three fifths.'
      }
    ],
    doing:
      'Write “We the people of this house” and finish it with three things the house is for. List every person “we” includes. Ask whether anybody is missing, add them, and write down why they were easy to forget.',
    practice: [
      {
        ask: 'What is a preamble?',
        answer: 'The opening words that say what follows and why.',
        why: 'The Constitution has a famous one.'
      },
      {
        ask: 'What does consent of the governed mean?',
        answer: 'The people agreed to be governed.',
        why: 'That is where the power comes from.'
      }
    ],
    check: [
      {
        prompt: '“We the People” means the power comes from:',
        choices: ['A king', 'The people', 'An army', 'Another country'],
        answer: 1,
        feedback: ['No king here.', null, 'An army does not give it.', 'No other country does.']
      },
      {
        prompt: 'In 1787 the people who could vote were:',
        choices: ['Everybody', 'A small part of the country', 'Only children', 'Only soldiers'],
        answer: 1,
        feedback: ['Far from everybody.', null, 'Children could not.', 'Not only soldiers.']
      },
      {
        prompt: 'A preamble is the part of a document that comes:',
        choices: ['Last', 'First', 'In the middle', 'On the back'],
        answer: 1,
        feedback: ['Not last.', null, 'Not the middle.', 'Not the back.']
      }
    ]
  },

  // -------------------------------------------------------------------------
  {
    id: 'ss-m3-04',
    course: 'social',
    module: 3,
    quarter: 1,
    week: 6,
    day: 2,
    n: 12,
    title: 'Why she elects somebody',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'A country too big to vote on everything sends people to vote for it, and that is what a republic is.',
    standards: ['SS4CG1d'],
    offGrade: null,
    words: ['elect', 'republic', 'represent', 'term'],
    glossary: [
      { word: 'elect', plain: 'To choose somebody by voting.' },
      { word: 'republic', plain: 'A country where people elect their leaders.' },
      { word: 'represent', plain: 'To speak and vote for other people.' },
      { word: 'term', plain: 'The set time a leader serves before the next vote.' }
    ],
    video: {
      id: 'Y-cPqBFz328',
      url: 'https://www.youtube.com/watch?v=Y-cPqBFz328',
      title: 'Together We Can | Who Are the Leaders in the United States? | PBS KIDS',
      channel: 'PBS KIDS',
      minutes: 3,
      verified: '2026-08-17',
      teaches: ['leaders', 'elections', 'voting', 'representative', 'government'],
      sourceGap:
        'Two PragerU videos on this exact topic were among the top results and are NOT used — an advocacy organisation with a stated political position is not a neutral educational publisher, and that exclusion is written down rather than quietly applied. An alternate is verified and held: SdNxeGUvQkg, History Illustrated, 3:13. No Black American educator identified. Open.'
    },
    checkIn: {
      title: 'A vote on every single thing',
      text: 'Imagine your whole town had to vote on every choice. What time bins go out. What colour a bench is.',
      question: 'How long would a week take?'
    },
    beats: [
      {
        n: 1,
        label: 'Too many choices for everybody to make',
        hook: 'There is not enough time in a life to vote on everything a country decides.',
        teachingText:
          'So people elect somebody to go and vote for them. That person represents them. A country run this way is a republic.',
        example:
          'She does not vote on every road repair. Somebody she helped choose does that for her.',
        applyIt: {
          prompt: 'A republic is a country where people:',
          choices: ['Vote on everything', 'Elect their leaders', 'Have a king', 'Do not vote'],
          answer: 1,
          feedback: [
            'There is not enough time.',
            null,
            'A republic has no king.',
            'Voting is the whole idea.'
          ],
          why: 'They choose the person, and that person decides.'
        }
      },
      {
        n: 2,
        label: 'And they can be sent home again',
        hook: 'The important part is not the choosing. It is that the choosing happens again.',
        teachingText:
          'Leaders serve for a set time called a term. When it ends there is another vote, and they can lose.',
        example:
          'A leader who knows another vote is coming has a reason to listen. A king has no such reason.',
        applyIt: {
          prompt: 'A term is the set time a leader serves before:',
          choices: ['Moving house', 'The next vote', 'A holiday', 'A birthday'],
          answer: 1,
          feedback: [
            'Not what it means.',
            null,
            'Not what it means.',
            'Not what it means.'
          ],
          why: 'That is what makes a leader answerable.'
        }
      }
    ],
    activity: {
      title: 'Elect somebody to decide for you',
      prep: 'Nothing to buy. Two or three other people.',
      needs: ['two or three people', 'paper for votes', 'her notebook'],
      steps: [
        'Agree on five small choices, like what music plays while you tidy.',
        'First, vote on all five as a whole group. Time how long it takes.',
        'Now elect one person to make all five choices.',
        'Time that too, and write both times down.',
        'Ask whether the elected person made a choice you disliked.',
        'Write one sentence on why the next vote matters more than the first.'
      ],
      safety: 'Keep the five choices small and easy to undo.',
      minutes: 12
    },
    ledger: {
      prompt:
        'Write what a republic is. Then write why leaders having a term matters more than the first vote.',
      ifSheIsStuck:
        'Ask her what she would do if the person she elected kept choosing music she hated. That answer is the term.'
    },
    hook: {
      title: 'A vote on every single thing',
      text: 'Imagine your whole town had to vote on every choice. What time bins go out. What colour a bench is.',
      question: 'How long would a week take?'
    },
    core: [
      {
        heading: 'Too many choices for everybody to make',
        text: 'People elect somebody to go and vote for them. That person represents them. A country run this way is a republic.'
      },
      {
        heading: 'And they can be sent home again',
        text: 'Leaders serve for a set time called a term. When it ends there is another vote, and they can lose.'
      }
    ],
    doing:
      'Agree five small choices. Vote on all five as a group and time it. Then elect one person to make all five, and time that. Ask whether the elected person made a choice you disliked.',
    practice: [
      {
        ask: 'What is a republic?',
        answer: 'A country where people elect their leaders.',
        why: 'Nobody has time to vote on everything.'
      },
      {
        ask: 'What is a term?',
        answer: 'The set time a leader serves before the next vote.',
        why: 'It is what makes a leader answerable.'
      }
    ],
    check: [
      {
        prompt: 'A republic is a country where people:',
        choices: ['Vote on everything', 'Elect their leaders', 'Have a king', 'Do not vote'],
        answer: 1,
        feedback: ['Not enough time.', null, 'A republic has no king.', 'Voting is the idea.']
      },
      {
        prompt: 'A term is the set time a leader serves before:',
        choices: ['Moving house', 'The next vote', 'A holiday', 'A birthday'],
        answer: 1,
        feedback: ['Not the meaning.', null, 'Not the meaning.', 'Not the meaning.']
      },
      {
        prompt: 'To represent people means to speak and vote:',
        choices: ['Against them', 'For them', 'Alone', 'Twice'],
        answer: 1,
        feedback: ['That is the opposite.', null, 'Not the meaning.', 'Not the meaning.']
      }
    ]
  }
];

export function m3LessonById(id) {
  return SOCIAL_M3.find((l) => l.id === id) || null;
}

export default SOCIAL_M3;
