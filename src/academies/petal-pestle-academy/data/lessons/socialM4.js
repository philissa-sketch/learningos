// ---------------------------------------------------------------------------
// SOCIAL STUDIES · MODULE 4 — HOW IT WORKS, AND WHAT IT CANNOT DO
//
// Weeks 7-8 of Quarter 1. Georgia: SS4CG1c, SS4CG3a, SS4CG3b, SS4CG2.
//
// This module finishes Quarter 1, which means the QUARTER EXAM can open. It
// refused to until now, and that is a rule rather than a courtesy: a quarter
// exam waits for its quarter to be BUILT, not just sat (v3.25). Four of eight
// weeks written would have produced a paper calling itself a quarter exam while
// drawing on half a quarter.
//
// ---- SS4CG2 GETS ITS OWN LESSON BECAUSE IT IS ITS OWN STANDARD ----
//
// The First Amendment has no lettered elements in Georgia's document — it is
// one undivided requirement. That is exactly why it would have been easy to
// fold into the Bill of Rights lesson and lose. georgiaSS4.js emits it as a
// whole-standard unit so it can be owned and checked like anything else, and
// it gets a lesson of its own here.
//
// ---- LESSON 13'S VIDEO IS GEORGIA PUBLIC BROADCASTING ----
//
// Her own state's public educational broadcaster, teaching her own state's
// standard. Chosen over a TED-Ed alternative for that reason.
// ---------------------------------------------------------------------------

export const SOCIAL_M4_META = {
  courseId: 'social',
  module: 4,
  title: 'How It Works, and What It Cannot Do',
  blurb:
    'Who holds which power, three branches that each stop the other two, and ten amendments that are not gifts from the government but limits on it.'
};

export const SOCIAL_M4 = [
  // -------------------------------------------------------------------------
  {
    id: 'ss-m4-01',
    course: 'social',
    module: 4,
    quarter: 1,
    week: 7,
    day: 1,
    n: 13,
    title: 'Who has which power',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'Some powers belong to the whole country, some belong to each state, and some are shared by both.',
    standards: ['SS4CG1c'],
    offGrade: null,
    words: ['federal', 'state', 'shared', 'power'],
    glossary: [
      { word: 'federal', plain: 'To do with the whole country at once.' },
      { word: 'state', plain: 'One of the fifty parts, like Georgia.' },
      { word: 'shared', plain: 'Held by more than one at the same time.' },
      { word: 'power', plain: 'A thing a government is allowed to do.' }
    ],
    video: {
      id: 'vHm_b7QOc7U',
      url: 'https://www.youtube.com/watch?v=vHm_b7QOc7U',
      title: 'What Is Federalism? | Things Explained',
      channel: 'GPB Education',
      minutes: 6,
      verified: '2026-08-17',
      teaches: ['federalism', 'federal powers', 'state powers', 'shared powers', 'government'],
      sourceGap:
        'CHOSEN BECAUSE IT IS GEORGIA PUBLIC BROADCASTING — her own state’s public educational broadcaster teaching her own state’s standard. A TED-Ed alternative (HuFR5XBYLfU, 3:50) is verified and held. No Black American educator identified; searched "federalism federal state shared powers for kids". Open.'
    },
    checkIn: {
      title: 'Who decides bedtime?',
      text: 'Some rules in your life come from the whole house. Some come from one room. Some come from both.',
      question: 'Name one rule that comes from both, and say why that works.'
    },
    beats: [
      {
        n: 1,
        label: 'Three piles, not two',
        hook: 'It is not a country versus its states. It is three piles.',
        teachingText:
          'Federal powers belong to the whole country, like printing money. State powers belong to each state, like schools. Shared powers belong to both.',
        example:
          'Only the country prints money. Only Georgia sets its own driving age. Both of them collect taxes.',
        applyIt: {
          prompt: 'Printing money is a power held by:',
          choices: ['Each state', 'The whole country', 'Both', 'Neither'],
          answer: 1,
          feedback: [
            'States do not print it.',
            null,
            'It is not shared.',
            'Somebody prints it.'
          ],
          why: 'Fifty kinds of money would not work at all.'
        }
      },
      {
        n: 2,
        label: 'Sharing is not a mistake',
        hook: 'Both the country and her state can tax her. That is on purpose.',
        teachingText:
          'Shared powers let both levels do a job. Both can build roads. Both can run courts. Both can collect taxes.',
        example:
          'Georgia has its own courts and the country has its own. A case can move between them.',
        applyIt: {
          prompt: 'Collecting taxes is a power that is:',
          choices: ['Federal only', 'State only', 'Shared', 'Nobody’s'],
          answer: 2,
          feedback: [
            'States tax too.',
            'The country taxes too.',
            null,
            'Both do it.'
          ],
          why: 'Shared means both, at the same time.'
        }
      }
    ],
    activity: {
      title: 'Sort the powers into three piles',
      prep: 'Nothing to buy. Nine cards or paper squares.',
      needs: ['nine cards or paper squares', 'a pencil', 'her notebook'],
      steps: [
        'Write one power on each card: print money, run schools, collect taxes.',
        'Add six more: build roads, run an army, set a driving age, run courts, deliver post, hold elections.',
        'Make three headings on the table: whole country, state, both.',
        'Sort every card. Guess if you are not sure.',
        'Check them with a grown-up and move any that are wrong.',
        'Write down which card was hardest to place, and why.'
      ],
      safety: 'None needed. Keep the cards for the year plan.',
      minutes: 12
    },
    ledger: {
      prompt:
        'Write the three kinds of power and give one example of each. End with the card that was hardest to sort.',
      ifSheIsStuck:
        'Ask her whether Georgia could print its own money, and whether Georgia could set its own school year.'
    },
    hook: {
      title: 'Who decides bedtime?',
      text: 'Some rules in your life come from the whole house. Some come from one room. Some come from both.',
      question: 'Name one rule that comes from both, and say why that works.'
    },
    core: [
      {
        heading: 'Three piles, not two',
        text: 'Federal powers belong to the whole country, like printing money. State powers belong to each state, like schools. Shared powers belong to both.'
      },
      {
        heading: 'Sharing is not a mistake',
        text: 'Shared powers let both levels do a job. Both can build roads. Both can run courts. Both can collect taxes.'
      }
    ],
    doing:
      'Write nine powers on cards. Make three headings: whole country, state, both. Sort every card, guessing where unsure, then check with a grown-up and move any that are wrong.',
    practice: [
      {
        ask: 'Who prints money?',
        answer: 'The whole country, not the states.',
        why: 'Fifty kinds of money would not work.'
      },
      {
        ask: 'Name a shared power.',
        answer: 'Collecting taxes, building roads or running courts.',
        why: 'Shared means both levels do it.'
      }
    ],
    check: [
      {
        prompt: 'Printing money is a power held by:',
        choices: ['Each state', 'The whole country', 'Both', 'Neither'],
        answer: 1,
        feedback: ['States do not print it.', null, 'It is not shared.', 'Somebody prints it.']
      },
      {
        prompt: 'Collecting taxes is a power that is:',
        choices: ['Federal only', 'State only', 'Shared', 'Nobody’s'],
        answer: 2,
        feedback: ['States tax too.', 'The country taxes too.', null, 'Both do it.']
      },
      {
        prompt: 'Federal means to do with:',
        choices: ['One town', 'One state', 'The whole country', 'One family'],
        answer: 2,
        feedback: ['Too small.', 'Too small.', null, 'Too small.']
      }
    ]
  },

  // -------------------------------------------------------------------------
  {
    id: 'ss-m4-02',
    course: 'social',
    module: 4,
    quarter: 1,
    week: 7,
    day: 2,
    n: 14,
    title: 'Three branches that stop each other',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'One branch writes laws, one carries them out and one settles arguments, and each can stop the other two.',
    standards: ['SS4CG3a'],
    offGrade: null,
    words: ['branch', 'veto', 'court', 'balance'],
    glossary: [
      { word: 'branch', plain: 'One of the three parts of government.' },
      { word: 'veto', plain: 'When a president refuses to sign a bill.' },
      { word: 'court', plain: 'Where judges decide what a law means.' },
      { word: 'balance', plain: 'When no one part can win on its own.' }
    ],
    video: {
      id: 'X7uovPuH07Q',
      url: 'https://www.youtube.com/watch?v=X7uovPuH07Q',
      title:
        'Checks and Balances for Kids | Three Branches of Government | Checks and Balances Explained',
      channel: 'Learn Bright',
      minutes: 10,
      verified: '2026-08-17',
      teaches: ['three branches', 'checks and balances', 'veto', 'Congress', 'Supreme Court'],
      sourceGap:
        'No Black American educator identified; searched "three branches of government checks and balances for kids how a bill becomes a law". Ten results, several from Schoolhouse Rock and CrashCourse; channel identity unknown for the chosen video and recorded as unknown. Open.'
    },
    checkIn: {
      title: 'Nobody gets the last word',
      text: 'Three people share a job. Each one can stop the other two from finishing on their own.',
      question: 'Is that annoying, or is it the point?'
    },
    beats: [
      {
        n: 1,
        label: 'One job each',
        hook: 'Splitting a job three ways means no one person can do all of it.',
        teachingText:
          'Congress writes the laws. The President carries them out. The courts decide what a law means when people disagree.',
        example:
          'A bill is an idea for a law. It is not a law until it has been through more than one branch.',
        applyIt: {
          prompt: 'The branch that writes laws is:',
          choices: ['The courts', 'Congress', 'The President', 'The army'],
          answer: 1,
          feedback: [
            'They decide what laws mean.',
            null,
            'He carries them out.',
            'It is not a branch.'
          ],
          why: 'Writing and carrying out are two different jobs on purpose.'
        }
      },
      {
        n: 2,
        label: 'And each one can stop the others',
        hook: 'The stopping is not a fault in the design. It is the design.',
        teachingText:
          'A president can veto a bill. Congress can pass it anyway with enough votes. Courts can rule that a law breaks the Constitution.',
        example:
          'A bill she followed through Congress can still die on the President’s desk, and still come back.',
        applyIt: {
          prompt: 'When a president refuses to sign a bill it is called a:',
          choices: ['Vote', 'Veto', 'Term', 'Court'],
          answer: 1,
          feedback: [
            'A vote is different.',
            null,
            'A term is a length of time.',
            'A court is a place.'
          ],
          why: 'Congress can still pass it with enough votes.'
        }
      }
    ],
    activity: {
      title: 'Follow one bill through the house',
      prep: 'Nothing to buy. Three people, or two people and a toy.',
      needs: ['three people or stand-ins', 'paper', 'her notebook'],
      steps: [
        'Write one house rule you would like on a slip of paper. That is the bill.',
        'Person one is Congress. They vote yes or no.',
        'If it passes, person two is the President. They sign or veto.',
        'If vetoed, Congress votes again. Two out of three passes it anyway.',
        'Person three is the court. They say whether it fits the house rules already agreed.',
        'Write down every place your bill could have died.'
      ],
      safety: 'The bill has to be something harmless. A grown-up agrees it first.',
      minutes: 14
    },
    ledger: {
      prompt:
        'Write the job of each of the three branches. Then list every place your own bill could have died.',
      ifSheIsStuck:
        'Ask her how many people had to agree before her rule was real. That number is the whole idea.'
    },
    hook: {
      title: 'Nobody gets the last word',
      text: 'Three people share a job. Each one can stop the other two from finishing on their own.',
      question: 'Is that annoying, or is it the point?'
    },
    core: [
      {
        heading: 'One job each',
        text: 'Congress writes the laws. The President carries them out. The courts decide what a law means when people disagree.'
      },
      {
        heading: 'And each one can stop the others',
        text: 'A president can veto a bill. Congress can pass it anyway with enough votes. Courts can rule that a law breaks the Constitution.'
      }
    ],
    doing:
      'Write a house rule on a slip. That is the bill. One person is Congress and votes. One is the President and signs or vetoes. One is the court. Write down every place it could have died.',
    practice: [
      {
        ask: 'What are the three branches?',
        answer: 'Congress, the President and the courts.',
        why: 'Writing, carrying out, and deciding what laws mean.'
      },
      {
        ask: 'What is a veto?',
        answer: 'When a president refuses to sign a bill.',
        why: 'Congress can still pass it with enough votes.'
      }
    ],
    check: [
      {
        prompt: 'The branch that writes laws is:',
        choices: ['The courts', 'Congress', 'The President', 'The army'],
        answer: 1,
        feedback: ['They decide meaning.', null, 'He carries them out.', 'Not a branch.']
      },
      {
        prompt: 'When a president refuses to sign a bill it is a:',
        choices: ['Vote', 'Veto', 'Term', 'Court'],
        answer: 1,
        feedback: ['A vote is different.', null, 'A term is a time.', 'A court is a place.']
      },
      {
        prompt: 'Courts can rule that a law breaks the:',
        choices: ['Weather', 'Constitution', 'Map', 'Budget'],
        answer: 1,
        feedback: ['Not the meaning.', null, 'Not the meaning.', 'Not the meaning.']
      }
    ]
  },

  // -------------------------------------------------------------------------
  {
    id: 'ss-m4-03',
    course: 'social',
    module: 4,
    quarter: 1,
    week: 8,
    day: 1,
    n: 15,
    title: 'Ten limits on the government',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'The Bill of Rights is not a list of gifts from the government, it is a list of things the government may not do.',
    standards: ['SS4CG3b'],
    offGrade: null,
    words: ['amendment', 'limit', 'trial', 'search'],
    glossary: [
      { word: 'amendment', plain: 'A change added to the Constitution.' },
      { word: 'limit', plain: 'A line something is not allowed to cross.' },
      { word: 'trial', plain: 'A hearing where a court decides a case.' },
      { word: 'search', plain: 'Looking through somebody’s home or things.' }
    ],
    video: {
      id: 'skWNC3a8NkM',
      url: 'https://www.youtube.com/watch?v=skWNC3a8NkM',
      title: 'Bill of Rights for Kids | Learn about these 10 amendments of the Constitution',
      channel: 'Learn Bright',
      minutes: 9,
      verified: '2026-08-17',
      teaches: ['Bill of Rights', 'amendments', 'rights', 'Constitution', 'limits'],
      sourceGap:
        'No Black American educator identified; searched "Bill of Rights for kids ten amendments explained". Ten results. A Homeschool Pop alternative (7dSyMG8OJcY, 10:40) is verified and held. Channel identity unknown and recorded as unknown. Open.'
    },
    checkIn: {
      title: 'A rule for the rule-maker',
      text: 'Most rules tell you what you may not do. Imagine a rule that tells the rule-maker what THEY may not do.',
      question: 'Who does that kind of rule protect?'
    },
    beats: [
      {
        n: 1,
        label: 'Ten things the government may not do',
        hook: 'Read them again and notice who they are aimed at. It is not her.',
        teachingText:
          'The first ten amendments are the Bill of Rights. Each one says what the government may not do to a person.',
        example:
          'It may not search her home without good reason. It may not lock her up with no trial.',
        applyIt: {
          prompt: 'The Bill of Rights is a list of things the government:',
          choices: ['Must pay for', 'May not do', 'Owns', 'Sells'],
          answer: 1,
          feedback: [
            'It is not about money.',
            null,
            'It is not about property.',
            'Nothing is sold.'
          ],
          why: 'Limits on power, not gifts from it.'
        }
      },
      {
        n: 2,
        label: 'And they were the price of agreement',
        hook: 'Some states refused to sign the Constitution without them.',
        teachingText:
          'They were added in 1791, four years after the convention. Several states would not agree until the limits were written down.',
        example:
          'A promise that is not written down is a promise somebody can forget on purpose.',
        applyIt: {
          prompt: 'The Bill of Rights was added in the year:',
          choices: ['1776', '1787', '1791', '1812'],
          answer: 2,
          feedback: [
            'That was the Declaration.',
            'That was the convention.',
            null,
            'That was a later war.'
          ],
          why: 'Four years after the Constitution was written.'
        }
      }
    ],
    activity: {
      title: 'Write limits on yourself',
      prep: 'Nothing to buy. Paper and a pencil.',
      needs: ['paper', 'a pencil', 'a grown-up', 'her notebook'],
      steps: [
        'Imagine you make every rule in the house for a week.',
        'Write three rules for everybody else. That is easy.',
        'Now write three rules for YOURSELF that you may not break.',
        'Ask a grown-up which list was harder to write, and why.',
        'Read your three limits out loud to somebody.',
        'Write one sentence on why states wanted the limits written down.'
      ],
      safety: 'A grown-up sees the list. The limits are about fairness, not punishment.',
      minutes: 12
    },
    ledger: {
      prompt:
        'Write what the Bill of Rights is, and who it protects. End with which of your own three limits was hardest.',
      ifSheIsStuck:
        'Ask her whether a rule-maker would ever write a limit on themselves without being asked.'
    },
    hook: {
      title: 'A rule for the rule-maker',
      text: 'Most rules tell you what you may not do. Imagine a rule that tells the rule-maker what THEY may not do.',
      question: 'Who does that kind of rule protect?'
    },
    core: [
      {
        heading: 'Ten things the government may not do',
        text: 'The first ten amendments are the Bill of Rights. Each one says what the government may not do to a person.'
      },
      {
        heading: 'And they were the price of agreement',
        text: 'They were added in 1791, four years after the convention. Several states would not agree until the limits were written down.'
      }
    ],
    doing:
      'Imagine you make every house rule for a week. Write three rules for everybody else, then three rules for yourself that you may not break. Ask which list was harder.',
    practice: [
      {
        ask: 'What is an amendment?',
        answer: 'A change added to the Constitution.',
        why: 'The first ten are the Bill of Rights.'
      },
      {
        ask: 'Who does the Bill of Rights limit?',
        answer: 'The government.',
        why: 'They are limits on power, not gifts from it.'
      }
    ],
    check: [
      {
        prompt: 'The Bill of Rights is a list of things the government:',
        choices: ['Must pay for', 'May not do', 'Owns', 'Sells'],
        answer: 1,
        feedback: ['Not about money.', null, 'Not about property.', 'Nothing is sold.']
      },
      {
        prompt: 'The Bill of Rights was added in the year:',
        choices: ['1776', '1787', '1791', '1812'],
        answer: 2,
        feedback: ['That was the Declaration.', 'That was the convention.', null, 'That was later.']
      },
      {
        prompt: 'How many amendments are in the Bill of Rights?',
        choices: ['Three', 'Five', 'Ten', 'Fifty'],
        answer: 2,
        feedback: ['More than that.', 'More than that.', null, 'Far fewer.']
      }
    ]
  },

  // -------------------------------------------------------------------------
  {
    id: 'ss-m4-04',
    course: 'social',
    module: 4,
    quarter: 1,
    week: 8,
    day: 2,
    n: 16,
    title: 'Five freedoms in one sentence',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'The First Amendment protects five separate freedoms, and they are five, not one.',
    standards: ['SS4CG2'],
    offGrade: null,
    words: ['speech', 'religion', 'press', 'assembly'],
    glossary: [
      { word: 'speech', plain: 'Saying what you think out loud.' },
      { word: 'religion', plain: 'What a person believes about faith.' },
      { word: 'press', plain: 'Newspapers and news, and the people who make them.' },
      { word: 'assembly', plain: 'People gathering together on purpose.' }
    ],
    video: {
      id: 'e-qrRyWVYzk',
      url: 'https://www.youtube.com/watch?v=e-qrRyWVYzk',
      title:
        'The First Amendment - Bill of Rights - U.S. Constitution - Social Studies Educational Video for Kids',
      channel: 'Bow Tie Guy and Wife',
      minutes: 4,
      verified: '2026-08-17',
      teaches: ['First Amendment', 'freedom of speech', 'religion', 'press', 'assembly', 'petition'],
      sourceGap:
        'SS4CG2 HAS NO LETTERED ELEMENTS in Georgia’s document — it is one undivided requirement, which is exactly why it would have been easy to fold into the Bill of Rights lesson and lose. It gets its own lesson and its own video. Most material on this topic is pitched at teenagers; this one is explicitly for elementary students. No Black American educator identified. Open.'
    },
    checkIn: {
      title: 'Five things, not one',
      text: 'People say “freedom of speech” as if that is the whole amendment. It is one fifth of it.',
      question: 'Why might the other four get forgotten?'
    },
    beats: [
      {
        n: 1,
        label: 'Speech, religion and press',
        hook: 'One sentence, and it is doing five jobs at once.',
        teachingText:
          'You may say what you think. You may believe what you choose, or nothing. Newspapers may print what the government dislikes.',
        example:
          'A newspaper printing something rude about a president is the amendment working, not failing.',
        applyIt: {
          prompt: 'Freedom of the press protects:',
          choices: ['Printers only', 'News and the people who make it', 'Books only', 'Letters only'],
          answer: 1,
          feedback: [
            'It is wider than that.',
            null,
            'It is wider than that.',
            'It is wider than that.'
          ],
          why: 'The point is news the government cannot stop.'
        }
      },
      {
        n: 2,
        label: 'Assembly and petition',
        hook: 'The last two are about doing something together.',
        teachingText:
          'People may gather in a group. And people may ask the government to change something, which is called petition.',
        example:
          'The Sons and Daughters of Liberty did both, long before either was protected.',
        applyIt: {
          prompt: 'Assembly means people are allowed to:',
          choices: ['Print news', 'Gather together', 'Believe anything', 'Stay silent'],
          answer: 1,
          feedback: [
            'That is press.',
            null,
            'That is religion.',
            'That is not assembly.'
          ],
          why: 'A protest is an assembly. So is a meeting.'
        }
      }
    ],
    activity: {
      title: 'Find all five in one week',
      prep: 'Nothing to buy. Her notebook and a week of ordinary life.',
      needs: ['her notebook', 'a grown-up to talk to'],
      steps: [
        'Write the five freedoms down the side of a page.',
        'Over one week, find one real example of each near you.',
        'A newspaper counts for press. A church or a choice not to go counts for religion.',
        'A club or a meeting counts for assembly. A letter asking for change counts for petition.',
        'Tick each one off as you find it.',
        'Write which was hardest to find, and what that tells you.'
      ],
      safety: 'She observes and writes. She does not join anything new for this.',
      minutes: 12
    },
    ledger: {
      prompt:
        'List the five freedoms in the First Amendment. Then write your real example of the one that was hardest to find.',
      ifSheIsStuck:
        'Ask her which one people talk about most. Then ask why the other four are quieter.'
    },
    hook: {
      title: 'Five things, not one',
      text: 'People say “freedom of speech” as if that is the whole amendment. It is one fifth of it.',
      question: 'Why might the other four get forgotten?'
    },
    core: [
      {
        heading: 'Speech, religion and press',
        text: 'You may say what you think. You may believe what you choose, or nothing. Newspapers may print what the government dislikes.'
      },
      {
        heading: 'Assembly and petition',
        text: 'People may gather in a group. And people may ask the government to change something, which is called petition.'
      }
    ],
    doing:
      'Write the five freedoms down a page. Over one week find one real example of each near you and tick it off. Write which was hardest to find.',
    practice: [
      {
        ask: 'How many freedoms are in the First Amendment?',
        answer: 'Five.',
        why: 'Speech, religion, press, assembly and petition.'
      },
      {
        ask: 'What does assembly mean?',
        answer: 'People gathering together on purpose.',
        why: 'A protest is one. So is a meeting.'
      }
    ],
    check: [
      {
        prompt: 'How many freedoms are in the First Amendment?',
        choices: ['One', 'Three', 'Five', 'Ten'],
        answer: 2,
        feedback: ['More than one.', 'More than three.', null, 'That is the Bill of Rights.']
      },
      {
        prompt: 'Assembly means people are allowed to:',
        choices: ['Print news', 'Gather together', 'Believe anything', 'Stay silent'],
        answer: 1,
        feedback: ['That is press.', null, 'That is religion.', 'Not assembly.']
      },
      {
        prompt: 'Asking the government to change something is called:',
        choices: ['Press', 'Petition', 'Speech', 'Religion'],
        answer: 1,
        feedback: ['Not the word.', null, 'Not the word.', 'Not the word.']
      }
    ]
  }
];

export function m4LessonById(id) {
  return SOCIAL_M4.find((l) => l.id === id) || null;
}

export default SOCIAL_M4;
