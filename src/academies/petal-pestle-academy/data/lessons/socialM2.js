// ---------------------------------------------------------------------------
// SOCIAL STUDIES · MODULE 2 — WHAT THEY WERE FIGHTING FOR
//
// Weeks 3-4 of Quarter 1. Georgia: SS4H1d + SS4CG1a, SS4H1c, SS4G2a, SS4H2a.
//
// ---- LESSON 5 CARRIES TWO ELEMENTS, AND THAT WAS A DECISION ----
//
// SS4CG1a is "natural rights AS FOUND IN the Declaration of Independence". It
// was blueprinted as its own lesson and then four video searches found nothing
// both usable for a nine-year-old and neutral: Khan Academy's is pitched at
// high school, one channel could not be identified at all, and the rest were
// advocacy organisations. Under the v3.24 rule that is a re-cut, not a reach
// for something adjacent.
//
// Gigi's call, and mine to recommend: FOLD IT INTO THE DECLARATION LESSON.
// Natural rights taught away from the document they come from is the same
// mistake as civics taught away from the Revolution.
//
// The freed lesson went to Module 3, where SS4H2b splits so the Great
// Compromise and the Three-Fifths Compromise each get their own lesson and
// their own verified video. Nothing was lost. One element moved house.
//
// ---- LESSON 7 IS THE BEST FIT IN THE QUARTER ----
//
// SS4G2a asks how each side used the LAND at three named battle sites. An
// animated battle map is that question drawn, and one exists for Saratoga.
// ---------------------------------------------------------------------------

export const SOCIAL_M2_META = {
  courseId: 'social',
  module: 2,
  title: 'What They Were Fighting For',
  blurb:
    'The document that said why, the rights it claimed, the two battles that ended it, and the ground itself. Then the room in Philadelphia where they had to build something to replace a king.'
};

export const SOCIAL_M2 = [
  // -------------------------------------------------------------------------
  {
    id: 'ss-m2-01',
    course: 'social',
    module: 2,
    quarter: 1,
    week: 3,
    day: 1,
    n: 5,
    title: 'The paper that said why',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'The Declaration of Independence was written a year into the war, and most of it is a list of what a king had done wrong.',
    standards: ['SS4H1d', 'SS4CG1a'],
    offGrade: null,
    words: ['declare', 'rights', 'tyranny', 'equal'],
    glossary: [
      { word: 'declare', plain: 'To say something out loud and mean it.' },
      { word: 'rights', plain: 'Things you may do that nobody may take.' },
      { word: 'tyranny', plain: 'Ruling by force, with no limits.' },
      { word: 'equal', plain: 'The same as, with nobody above.' }
    ],
    video: {
      id: 'eIO-7dFz2JU',
      url: 'https://www.youtube.com/watch?v=eIO-7dFz2JU',
      title: 'Declaration of Independence for Kids | American History Explained',
      channel: 'Homeschool Pop',
      minutes: 8,
      verified: '2026-08-17',
      teaches: ['Declaration of Independence', 'Thomas Jefferson', 'rights', 'king', 'independence'],
      sourceGap:
        'FOUR SEARCHES FOR A SEPARATE NATURAL-RIGHTS VIDEO FOUND NOTHING USABLE. Khan Academy’s is pitched at high school; one channel could not be identified; Tuttle Twins and Hillsdale College are advocacy organisations and are not used. Under the v3.24 rule that is a re-cut, so SS4CG1a folded into this lesson instead. No Black American educator identified for the Declaration at an elementary level. Open.'
    },
    checkIn: {
      title: 'Saying why, in writing',
      text: 'You leave a club. You could just walk out. Or you could write down exactly why you are going.',
      question: 'What does writing it down do that walking out does not?'
    },
    beats: [
      {
        n: 1,
        label: 'It came a year after the shooting started',
        hook: 'The war did not start because of this paper. The paper came later.',
        teachingText:
          'Fighting began in April 1775. The Declaration was signed in July 1776. Thomas Jefferson wrote most of it, and others changed it.',
        example:
          'Most of the Declaration is a list of complaints against King George III. It says exactly what he did.',
        applyIt: {
          prompt: 'The Declaration of Independence was written:',
          choices: [
            'Before any fighting',
            'A year after fighting began',
            'After the war ended',
            'A hundred years later'
          ],
          answer: 1,
          feedback: [
            'Fighting began first.',
            null,
            'The war ran on for years after.',
            'It was 1776.'
          ],
          why: 'April 1775 was the fighting. July 1776 was the paper.'
        }
      },
      {
        n: 2,
        label: 'And it claimed rights nobody gave',
        hook: 'It says people are born with rights. Not given them. Born with them.',
        teachingText:
          'It claims all men are created equal, with rights to life, liberty and the pursuit of happiness. These are called natural rights.',
        example:
          'A right you are born with cannot be taken by a king. That is the whole argument against tyranny.',
        applyIt: {
          prompt: 'Natural rights are rights that people:',
          choices: ['Buy', 'Are born with', 'Win in war', 'Vote for'],
          answer: 1,
          feedback: [
            'They are not for sale.',
            null,
            'Winning does not create them.',
            'A vote does not create them.'
          ],
          why: 'If a king could give them, a king could take them.'
        }
      }
    ],
    activity: {
      title: 'Write your own declaration',
      prep: 'Nothing to buy. Paper and a pencil.',
      needs: ['paper', 'a pencil', 'her notebook'],
      steps: [
        'Pick something in the house you think is unfair. Agree it with a grown-up first.',
        'Write one sentence saying what you believe is true.',
        'Then write three things, in a list, that are going wrong.',
        'End with one sentence saying what you want instead.',
        'Read it out loud to somebody.',
        'Write down whether the list or the ending felt stronger, and why.'
      ],
      safety: 'A grown-up agrees the topic first. This is about fairness, not about a person.',
      minutes: 12
    },
    ledger: {
      prompt:
        'Write what the Declaration of Independence is. Then write what a natural right is, in your own words.',
      ifSheIsStuck:
        'Ask her about her own list. She said what was true, then what was wrong. So did Jefferson.'
    },
    hook: {
      title: 'Saying why, in writing',
      text: 'You leave a club. You could just walk out. Or you could write down exactly why you are going.',
      question: 'What does writing it down do that walking out does not?'
    },
    core: [
      {
        heading: 'It came a year after the shooting started',
        text: 'Fighting began in April 1775. The Declaration was signed in July 1776. Thomas Jefferson wrote most of it, and others changed it.'
      },
      {
        heading: 'And it claimed rights nobody gave',
        text: 'It claims all men are created equal, with rights to life, liberty and the pursuit of happiness. These are called natural rights.'
      }
    ],
    doing:
      'Pick something you think is unfair, agreed with a grown-up. Write one sentence of what you believe is true, then three things going wrong, then what you want instead. Read it out loud.',
    practice: [
      {
        ask: 'Who wrote most of the Declaration?',
        answer: 'Thomas Jefferson.',
        why: 'Others changed it before it was signed.'
      },
      {
        ask: 'What is a natural right?',
        answer: 'A right you are born with.',
        why: 'Nobody gave it, so nobody can take it.'
      }
    ],
    check: [
      {
        prompt: 'The Declaration of Independence was written:',
        choices: [
          'Before any fighting',
          'A year after fighting began',
          'After the war ended',
          'A hundred years later'
        ],
        answer: 1,
        feedback: ['Fighting began first.', null, 'The war ran on for years.', 'It was 1776.']
      },
      {
        prompt: 'Natural rights are rights that people:',
        choices: ['Buy', 'Are born with', 'Win in war', 'Vote for'],
        answer: 1,
        feedback: ['They are not for sale.', null, 'Winning does not create them.', 'A vote does not.']
      },
      {
        prompt: 'Most of the Declaration is a list of:',
        choices: ['Battles won', 'Things the king did wrong', 'Names of soldiers', 'Prices of goods'],
        answer: 1,
        feedback: ['It is not a battle list.', null, 'It is not a name list.', 'It is not about prices.']
      }
    ]
  },

  // -------------------------------------------------------------------------
  {
    id: 'ss-m2-02',
    course: 'social',
    module: 2,
    quarter: 1,
    week: 3,
    day: 2,
    n: 6,
    title: 'How the smaller army won',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'Saratoga brought France in and Yorktown ended it, and the patriots won by lasting rather than by winning every battle.',
    standards: ['SS4H1c'],
    offGrade: null,
    words: ['surrender', 'ally', 'siege', 'supply'],
    glossary: [
      { word: 'surrender', plain: 'To give up and stop fighting.' },
      { word: 'ally', plain: 'A country that fights on your side.' },
      { word: 'siege', plain: 'Trapping an army until it gives up.' },
      { word: 'supply', plain: 'The food and powder an army needs.' }
    ],
    video: {
      id: 'NdRuU5ON-LU',
      url: 'https://www.youtube.com/watch?v=NdRuU5ON-LU',
      title: 'American Revolutionary War - Timelines and Maps - Animated US History',
      channel: 'History on Maps',
      minutes: 9,
      verified: '2026-08-17',
      teaches: ['Saratoga', 'Yorktown', 'timeline', 'France', 'surrender'],
      sourceGap:
        'No Black American educator identified for the battles of the Revolution at an elementary level. Searched "Battle of Saratoga Yorktown why Americans won revolutionary war for kids" and "how terrain geography affected revolutionary war battles Saratoga Yorktown". Channel identity unknown and recorded as unknown. Open.'
    },
    checkIn: {
      title: 'Losing and still not losing',
      text: 'Two teams play. One wins most of the games. The other refuses to stop playing.',
      question: 'Could the team that wins less still end up winning overall?'
    },
    beats: [
      {
        n: 1,
        label: 'Saratoga brought France in',
        hook: 'One American win convinced a whole country to join the war.',
        teachingText:
          'In 1777 a British army surrendered at Saratoga. France saw that the patriots could really win, and became an ally.',
        example:
          'France sent money, ships and soldiers. Benjamin Franklin had spent years asking for exactly that.',
        applyIt: {
          prompt: 'Saratoga mattered most because it brought in:',
          choices: ['Spain', 'France', 'Russia', 'Canada'],
          answer: 1,
          feedback: [
            'Spain was not the ally here.',
            null,
            'Russia did not join.',
            'Canada did not join.'
          ],
          why: 'A win big enough to change another country’s mind.'
        }
      },
      {
        n: 2,
        label: 'Yorktown ended it',
        hook: 'A British army was trapped between an army on land and a fleet at sea.',
        teachingText:
          'In 1781 Washington and French forces surrounded Yorktown. French ships blocked escape by sea. The British surrendered.',
        example:
          'Washington lost many battles. He never lost his army, and that is why he was still there in 1781.',
        applyIt: {
          prompt: 'At Yorktown the British could not escape because:',
          choices: [
            'Winter had come',
            'They had no map',
            'French ships blocked the sea',
            'The war was over'
          ],
          answer: 2,
          feedback: [
            'Weather was not the trap.',
            'Maps were not the problem.',
            null,
            'The war ended because of this.'
          ],
          why: 'Trapped on land and at sea at the same time.'
        }
      }
    ],
    activity: {
      title: 'Trapped on two sides',
      prep: 'Nothing to buy. A tray and some counters.',
      needs: ['a tray or large plate', 'counters or buttons', 'a strip of paper for the sea', 'her notebook'],
      steps: [
        'Lay the paper strip along one edge. That edge is the sea.',
        'Put five counters in the middle. That is the British army at Yorktown.',
        'Ring them with counters on the three land sides.',
        'Now put counters along the paper strip. That is the French fleet.',
        'Ask her to find a way out for the five. Let her try.',
        'Write down what happens when both land and sea are closed.'
      ],
      safety: 'None needed. Counters stay on the tray.',
      minutes: 12
    },
    ledger: {
      prompt:
        'Write why Saratoga mattered, and why Yorktown ended the war. Finish with why Washington kept going after losing.',
      ifSheIsStuck:
        'Ask her about the tray. There was no way out because both doors were shut at once.'
    },
    hook: {
      title: 'Losing and still not losing',
      text: 'Two teams play. One wins most of the games. The other refuses to stop playing.',
      question: 'Could the team that wins less still end up winning overall?'
    },
    core: [
      {
        heading: 'Saratoga brought France in',
        text: 'In 1777 a British army surrendered at Saratoga. France saw that the patriots could really win, and became an ally.'
      },
      {
        heading: 'Yorktown ended it',
        text: 'In 1781 Washington and French forces surrounded Yorktown. French ships blocked escape by sea. The British surrendered.'
      }
    ],
    doing:
      'Lay a paper strip for the sea. Put five counters in the middle for the British at Yorktown. Ring them on three land sides, then put counters on the sea strip. Ask her to find a way out.',
    practice: [
      {
        ask: 'Why did Saratoga matter?',
        answer: 'It brought France into the war.',
        why: 'France sent money, ships and soldiers.'
      },
      {
        ask: 'Where did the British finally surrender?',
        answer: 'Yorktown, in 1781.',
        why: 'They were trapped by land and by sea.'
      }
    ],
    check: [
      {
        prompt: 'Saratoga mattered most because it brought in:',
        choices: ['Spain', 'France', 'Russia', 'Canada'],
        answer: 1,
        feedback: ['Spain was not the ally.', null, 'Russia did not join.', 'Canada did not join.']
      },
      {
        prompt: 'At Yorktown the British could not escape because:',
        choices: [
          'Winter had come',
          'They had no map',
          'French ships blocked the sea',
          'The war was over'
        ],
        answer: 2,
        feedback: ['Weather was not the trap.', 'Maps were fine.', null, 'The war ended after this.']
      },
      {
        prompt: 'Washington kept the patriots in the war mainly by:',
        choices: [
          'Winning every battle',
          'Never losing his army',
          'Sailing to France',
          'Writing the Declaration'
        ],
        answer: 1,
        feedback: ['He lost many battles.', null, 'Franklin went to France.', 'Jefferson wrote it.']
      }
    ]
  },

  // -------------------------------------------------------------------------
  {
    id: 'ss-m2-03',
    course: 'social',
    module: 2,
    quarter: 1,
    week: 4,
    day: 1,
    n: 7,
    title: 'The ground itself',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'At Lexington, Saratoga and Yorktown the shape of the land helped one side and hurt the other, every time.',
    standards: ['SS4G2a'],
    offGrade: null,
    words: ['terrain', 'cover', 'ridge', 'harbour'],
    glossary: [
      { word: 'terrain', plain: 'The shape of a piece of ground.' },
      { word: 'cover', plain: 'Anything you can hide behind.' },
      { word: 'ridge', plain: 'A long high strip of land.' },
      { word: 'harbour', plain: 'A safe place for ships beside land.' }
    ],
    video: {
      id: 'wAEgYELqo_4',
      url: 'https://www.youtube.com/watch?v=wAEgYELqo_4',
      title: 'Battle of Saratoga | Animated Battle Map',
      channel: 'American Battlefield Trust',
      minutes: 10,
      verified: '2026-08-17',
      teaches: ['terrain', 'Saratoga', 'battle map', 'high ground', 'position'],
      sourceGap:
        'THE BEST FIT IN THE QUARTER. SS4G2a asks how each side used the LAND, and an animated battle map is that question drawn. It covers Saratoga only; the beats carry Lexington and Yorktown. No Black American educator identified. Open.'
    },
    checkIn: {
      title: 'The best place to stand',
      text: 'Two people play tag in a garden. One knows where every gate and bush is. The other has never been there.',
      question: 'Who has the advantage, and it is not about running faster?'
    },
    beats: [
      {
        n: 1,
        label: 'Walls and trees at Lexington',
        hook: 'A straight road is a terrible place to be shot at.',
        teachingText:
          'The British marched back to Boston on an open road. The militia fired from behind stone walls and trees.',
        example:
          'The soldiers were trained to stand in lines in open fields. The road gave them nowhere to hide.',
        applyIt: {
          prompt: 'The road back to Boston helped the militia because it gave the British:',
          choices: ['Better maps', 'No cover', 'More food', 'Fresh horses'],
          answer: 1,
          feedback: [
            'Maps did not matter here.',
            null,
            'Food was not the issue.',
            'Horses were not the issue.'
          ],
          why: 'Cover is the whole difference on open ground.'
        }
      },
      {
        n: 2,
        label: 'High ground and deep water',
        hook: 'At Saratoga the fight was over who held the higher ground.',
        teachingText:
          'Holding a ridge lets you see further and shoot down. At Yorktown the sea was behind the British, and French ships closed it.',
        example:
          'The same water can be a road out or a wall. It depends who owns the ships on it.',
        applyIt: {
          prompt: 'At Yorktown the sea behind the British became:',
          choices: ['A way to escape', 'A wall', 'A supply road', 'A place to hide'],
          answer: 1,
          feedback: [
            'French ships closed it.',
            null,
            'No supplies came through.',
            'There was nowhere to hide.'
          ],
          why: 'Water is only a road if your side holds it.'
        }
      }
    ],
    activity: {
      title: 'Two ways across the same garden',
      prep: 'Nothing to buy. Go outside, or use a large room.',
      needs: ['a garden or a room', 'her notebook', 'a grown-up'],
      steps: [
        'Walk from one end to the other along the most open path. Count your steps.',
        'Now walk it again, staying beside walls, hedges or furniture.',
        'Ask a grown-up to stand at one end and say when they could see you.',
        'Write down which route kept you hidden longer.',
        'Draw the room and mark the cover with a heavy line.',
        'Write one sentence about why the British hated the road home.'
      ],
      safety: 'Walking only, no running, and nothing climbed.',
      minutes: 12
    },
    ledger: {
      prompt:
        'Write about the two routes you walked. Then write how the land helped one side at Lexington and at Yorktown.',
      ifSheIsStuck:
        'Ask her when she was seen. That moment is what a soldier on an open road felt all day.'
    },
    hook: {
      title: 'The best place to stand',
      text: 'Two people play tag in a garden. One knows where every gate and bush is. The other has never been there.',
      question: 'Who has the advantage, and it is not about running faster?'
    },
    core: [
      {
        heading: 'Walls and trees at Lexington',
        text: 'The British marched back to Boston on an open road. The militia fired from behind stone walls and trees.'
      },
      {
        heading: 'High ground and deep water',
        text: 'Holding a ridge lets you see further and shoot down. At Yorktown the sea was behind the British, and French ships closed it.'
      }
    ],
    doing:
      'Walk across a room by the most open path, counting steps. Walk it again staying beside walls and furniture. Have a grown-up say when they could see you. Draw the room and mark the cover.',
    practice: [
      {
        ask: 'What does terrain mean?',
        answer: 'The shape of a piece of ground.',
        why: 'It decides who can hide and who can see.'
      },
      {
        ask: 'Why is high ground useful?',
        answer: 'You can see further and shoot down.',
        why: 'That is what the fight at Saratoga was about.'
      }
    ],
    check: [
      {
        prompt: 'The road back to Boston helped the militia by giving the British:',
        choices: ['Better maps', 'No cover', 'More food', 'Fresh horses'],
        answer: 1,
        feedback: ['Maps did not matter.', null, 'Food was not the issue.', 'Horses were not the issue.']
      },
      {
        prompt: 'At Yorktown the sea behind the British became:',
        choices: ['A way to escape', 'A wall', 'A supply road', 'A place to hide'],
        answer: 1,
        feedback: ['French ships closed it.', null, 'No supplies came.', 'Nowhere to hide.']
      },
      {
        prompt: 'Holding a ridge helps an army because it lets them:',
        choices: ['Move faster', 'Eat better', 'Sleep longer', 'See further'],
        answer: 3,
        feedback: ['Speed is not it.', 'Food is not it.', 'Rest is not it.', null]
      }
    ]
  },

  // -------------------------------------------------------------------------
  {
    id: 'ss-m2-04',
    course: 'social',
    module: 2,
    quarter: 1,
    week: 4,
    day: 2,
    n: 8,
    title: 'The men in the room',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'In 1787 a group met in Philadelphia to replace rules that were not working, and had to invent a government with no king in it.',
    standards: ['SS4H2a'],
    offGrade: null,
    words: ['convention', 'constitution', 'debate', 'framer'],
    glossary: [
      { word: 'convention', plain: 'A meeting held to decide something big.' },
      { word: 'constitution', plain: 'The rules that say how a country is run.' },
      { word: 'debate', plain: 'Arguing about something on purpose, to decide.' },
      { word: 'framer', plain: 'One of the people who built the rules.' }
    ],
    video: {
      id: 'PEpWnGC8gUM',
      url: 'https://www.youtube.com/watch?v=PEpWnGC8gUM',
      title: 'The Story of the Constitutional Convention | For Kids',
      channel: 'Bedtime History',
      minutes: 9,
      verified: '2026-08-17',
      teaches: ['Constitutional Convention', 'James Madison', 'Philadelphia', 'debate', 'constitution'],
      sourceGap:
        'No Black American educator identified for the Constitutional Convention at an elementary level. Searched "Constitutional Convention 1787 James Madison for kids" — two usable results, and PragerU’s was excluded as an advocacy source rather than a neutral educational publisher. Channel identity unknown and recorded as unknown. Open.'
    },
    checkIn: {
      title: 'The rules that stopped working',
      text: 'A game has rules everyone agreed to. After a while nobody can decide anything and the game keeps stopping.',
      question: 'Do you fix the rules, or start again with new ones?'
    },
    beats: [
      {
        n: 1,
        label: 'They met to mend, and built instead',
        hook: 'They were sent to repair the old rules. They wrote new ones.',
        teachingText:
          'In 1787 men met in Philadelphia. James Madison had studied governments for years. George Washington was chosen to lead the meeting.',
        example:
          'Benjamin Franklin was the oldest there, at eighty-one. Madison took notes on almost every day.',
        applyIt: {
          prompt: 'The meeting in Philadelphia in 1787 was led by:',
          choices: ['George Washington', 'Paul Revere', 'King George III', 'Benedict Arnold'],
          answer: 0,
          feedback: [
            null,
            'He was not there.',
            'He ruled Britain.',
            'He had changed sides.'
          ],
          why: 'They chose the man they trusted most to keep order.'
        }
      },
      {
        n: 2,
        label: 'Nobody had done this before',
        hook: 'Every country they knew of had a king. They were building one without.',
        teachingText:
          'The framers had to decide who makes laws, who carries them out and who settles arguments. They debated all summer with the windows shut.',
        example:
          'They kept the debates secret so people could change their minds without being shamed for it.',
        applyIt: {
          prompt: 'The framers kept their debates secret so that people could:',
          choices: ['Sleep', 'Change their minds', 'Leave early', 'Avoid the heat'],
          answer: 1,
          feedback: [
            'Sleep was not the reason.',
            null,
            'They stayed all summer.',
            'The windows were shut anyway.'
          ],
          why: 'Changing your mind in public is hard. They made it easier.'
        }
      }
    ],
    activity: {
      title: 'Write the rules for one room',
      prep: 'Nothing to buy. Choose one shared room in the house.',
      needs: ['paper', 'a pencil', 'one other person', 'her notebook'],
      steps: [
        'Pick a shared room. Write down three rules for how it is used.',
        'Now ask somebody else in the house to write three rules for it.',
        'Put the lists side by side and find where you disagree.',
        'Argue it out and agree one list you can both sign.',
        'Write down which rule was hardest to agree, and why.',
        'Write one sentence on why the framers argued all summer.'
      ],
      safety: 'It is a debate about a room, not about a person. Keep it there.',
      minutes: 12
    },
    ledger: {
      prompt:
        'Write what the framers met to do in 1787. Then write about the rule you and somebody else found hardest to agree.',
      ifSheIsStuck:
        'Ask her whether agreeing got easier or harder when a second person had a say. Now imagine fifty-five.'
    },
    hook: {
      title: 'The rules that stopped working',
      text: 'A game has rules everyone agreed to. After a while nobody can decide anything and the game keeps stopping.',
      question: 'Do you fix the rules, or start again with new ones?'
    },
    core: [
      {
        heading: 'They met to mend, and built instead',
        text: 'In 1787 men met in Philadelphia. James Madison had studied governments for years. George Washington was chosen to lead the meeting.'
      },
      {
        heading: 'Nobody had done this before',
        text: 'The framers had to decide who makes laws, who carries them out and who settles arguments. They debated all summer with the windows shut.'
      }
    ],
    doing:
      'Pick a shared room and write three rules for it. Ask somebody else to write three. Put the lists side by side, find the disagreements, and argue out one list you can both sign.',
    practice: [
      {
        ask: 'What is a constitution?',
        answer: 'The rules that say how a country is run.',
        why: 'It is written down so it does not depend on one person.'
      },
      {
        ask: 'Who led the Constitutional Convention?',
        answer: 'George Washington.',
        why: 'They chose the man they trusted most to keep order.'
      }
    ],
    check: [
      {
        prompt: 'The meeting in Philadelphia in 1787 was led by:',
        choices: ['George Washington', 'Paul Revere', 'King George III', 'Benedict Arnold'],
        answer: 0,
        feedback: [null, 'He was not there.', 'He ruled Britain.', 'He had changed sides.']
      },
      {
        prompt: 'The framers kept their debates secret so people could:',
        choices: ['Sleep', 'Change their minds', 'Leave early', 'Avoid the heat'],
        answer: 1,
        feedback: ['Sleep was not it.', null, 'They stayed all summer.', 'Windows were shut anyway.']
      },
      {
        prompt: 'James Madison is remembered at the convention for:',
        choices: [
          'Leading the army',
          'Sailing to France',
          'Studying governments and taking notes',
          'Ruling Britain'
        ],
        answer: 2,
        feedback: ['Washington led the army.', 'That was Franklin.', null, 'That was King George III.']
      }
    ]
  }
];

export function m2LessonById(id) {
  return SOCIAL_M2.find((l) => l.id === id) || null;
}

export default SOCIAL_M2;
