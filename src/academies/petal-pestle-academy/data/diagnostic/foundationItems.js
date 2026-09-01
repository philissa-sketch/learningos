// ---------------------------------------------------------------------------
// THE EASY BAND — questions below 2.3.
//
// WHY THIS FILE EXISTS. This is the most consequential bug found in the app so
// far, and it was found by reading a real child's real results.
//
// Azianna took the Check-In and came out with Geometry 2.00 and Measurement
// 2.00 — the floor. The obvious reading is "she is very weak at those." That
// reading is wrong, and the data says so.
//
// The engine's floor is 2.0. THE ITEM BANK'S FLOOR WAS 2.3 to 2.5, depending
// on strand. There were no questions below that. So for a child whose true
// level sits under the bank's easiest question, this happens:
//
//   1. She gets the easiest available item wrong.
//   2. Her estimate drops toward 2.0.
//   3. The engine asks for an item near 2.0 — and the nearest one that exists
//      is still 2.4, which she has already seen.
//   4. Having exhausted the easy ones it serves the NEXT nearest, which is
//      HARDER: perimeter at 3.1, then area at 3.7.
//   5. She gets those wrong too, and the number pins at the floor.
//
// That is exactly her geometry transcript: three shape questions at 2.4 (two
// right), then three perimeter at 3.1 (all wrong), then two area at 3.7 (all
// wrong). The test walked UPHILL away from her because it had nowhere to go
// down. The 2.00 measured the bank, not the child.
//
// FOUR of her nine strands sat at or below the bank's easiest item — geometry,
// measurement, grammar and writing. Four numbers, not the two I first reported.
//
// So: every strand now has questions at roughly 1.5, 1.8 and 2.1, the engine's
// floor drops to 1.5, and scripts/verify-itembank.mjs fails the build if any
// strand's easiest item is ever again above the engine's floor.
//
// ---- WRITING AT THIS LEVEL ----
//
// A question at 1.5 has to be readable by a child who is barely reading. Short
// words, one clause, no subordinate sentences, numbers small enough to count on
// fingers. check-readability.mjs holds these to the same rule as everything
// else: no item may read harder than the level it tests. That rule is much
// harder to meet down here, which is part of why the band was missing.
//
// The herb theme stays. A child who is behind should not be handed
// stripped-down worksheet questions while everyone else gets the greenhouse.
// ---------------------------------------------------------------------------

import { choiceSet, int, pick, materialise } from './itemHelpers.js';

/* ============================ MATHS ============================ */

const foundationNumbers = [
  {
    id: 'fo-count',
    level: 1.2,
    make: (r) => {
      const a = int(r, 3, 6);
      const b = int(r, 2, 4);
      return {
        prompt: `You pick ${a} mint leaves. Then you pick ${b} more. How many leaves now?`,
        ...choiceSet(r, a + b, [
          { v: a, why: 'That is just the first pile. You picked more after that.' },
          { v: b, why: 'That is just the second pile. Add it to the first one.' },
          { v: a + b + 1, why: 'One too many. Count them again slowly.' }
        ]),
        explanation: `${a} and ${b} more makes ${a + b}.`
      };
    }
  },
  {
    id: 'fo-takeaway',
    level: 1.9,
    make: (r) => {
      const a = int(r, 7, 12);
      const b = int(r, 2, 5);
      return {
        prompt: `There are ${a} seeds in a pot. ${b} of them grow. How many did not grow?`,
        ...choiceSet(r, a - b, [
          { v: a + b, why: 'You added them. The question asks how many are left over.' },
          { v: b, why: 'That is the ones that grew. We want the other ones.' },
          { v: a - b - 1, why: 'One too few. Take away slowly and count what is left.' }
        ]),
        explanation: `${a} take away ${b} is ${a - b}.`
      };
    }
  },
  {
    id: 'fo-tens',
    level: 2.1,
    make: (r) => {
      const t = int(r, 2, 5);
      return {
        prompt: `You tie mint into bunches of 10. You have ${t} bunches. How many stems?`,
        ...choiceSet(r, t * 10, [
          { v: t, why: 'That is the number of bunches. Each bunch holds 10 stems.' },
          { v: t + 10, why: 'You added 10 once. There are 10 in every bunch.' },
          { v: t * 10 + 10, why: 'That is one bunch too many.' }
        ]),
        explanation: `${t} tens is ${t * 10}.`
      };
    }
  }
];

const foundationFractions = [
  {
    id: 'fo-half',
    level: 1.2,
    make: (r) => {
      const n = pick(r, [4, 6, 8]);
      return {
        prompt: `You have ${n} petals. You give half to a friend. How many do you give?`,
        ...choiceSet(r, n / 2, [
          { v: n, why: 'That is all of them. Half means you keep some.' },
          { v: n / 2 + 1, why: 'One too many. Both piles must be the same size.' },
          { v: 2, why: 'Half means both piles match. Check that yours do.' }
        ]),
        explanation: `Half of ${n} is ${n / 2}.`
      };
    }
  },
  {
    id: 'fo-whole',
    level: 2.0,
    make: (r) => {
      const n = pick(r, [3, 4]);
      return {
        prompt: `A leaf is cut into ${n} equal parts. How many parts make the whole leaf?`,
        ...choiceSet(r, n, [
          { v: 1, why: 'One part is only a piece. You need all of them.' },
          { v: n - 1, why: 'One piece is missing. Then it is not the whole leaf.' },
          { v: n + 1, why: 'That is one piece too many.' }
        ]),
        explanation: `It takes all ${n} parts to make one whole.`
      };
    }
  },
  {
    id: 'fo-equalparts',
    level: 2.2,
    make: (r) => {
      const n = pick(r, [2, 4]);
      const word = n === 2 ? 'halves' : 'quarters';
      return {
        prompt: `A round pot of soil is cut into ${n} equal parts. Each part is called one of the ${word}. Are the parts the same size?`,
        ...choiceSet(r, 'Yes, all the same', [
          { v: 'No, one is bigger', why: 'Equal parts always match. That is what equal means.' },
          { v: 'Only two match', why: 'If they are equal parts, every one matches.' },
          { v: 'You cannot tell', why: 'The word equal tells you. They are the same.' }
        ]),
        explanation: 'Equal parts are always the same size as each other.'
      };
    }
  }
];

const foundationMeasurement = [
  {
    id: 'fo-longer',
    level: 1.2,
    make: (r) => {
      const a = int(r, 3, 6);
      const b = a + int(r, 2, 4);
      return {
        prompt: `One stem is ${a} inches. Another is ${b} inches. Which one is longer?`,
        ...choiceSet(r, `The ${b} inch one`, [
          { v: `The ${a} inch one`, why: 'That number is smaller, so that stem is shorter.' },
          { v: 'They are the same', why: 'The numbers are different, so the stems are different.' },
          { v: 'You cannot tell', why: 'The bigger number is the longer stem.' }
        ]),
        explanation: `${b} is more than ${a}, so that stem is longer.`
      };
    }
  },
  {
    id: 'fo-heavier',
    level: 1.8,
    make: (r) => {
      const a = int(r, 2, 5);
      const b = a + int(r, 2, 5);
      return {
        prompt: `A jar of dried mint weighs ${a} ounces. A jar of dried sage weighs ${b} ounces. Which jar is heavier?`,
        ...choiceSet(r, 'The sage', [
          { v: 'The mint', why: 'The mint has the smaller number, so it is lighter.' },
          { v: 'Both the same', why: 'The numbers are not the same, so the jars are not either.' },
          { v: 'Neither one', why: 'One of them must be heavier. Look at which number is bigger.' }
        ]),
        explanation: `${b} ounces is more than ${a} ounces.`
      };
    }
  },
  {
    id: 'fo-oclock',
    level: 2.1,
    make: (r) => {
      const h = int(r, 2, 9);
      return {
        prompt: `The big hand points at 12. The little hand points at ${h}. What time is it?`,
        ...choiceSet(r, `${h} o'clock`, [
          { v: `12 o'clock`, why: 'The big hand at 12 means o’clock. The little hand tells you the hour.' },
          { v: `${h} thirty`, why: 'Half past would have the big hand at 6, not 12.' },
          { v: `${h + 1} o'clock`, why: 'That is one hour later. Read the little hand again.' }
        ]),
        explanation: `Big hand on 12 means o’clock. Little hand on ${h} means ${h} o’clock.`
      };
    }
  }
];

const foundationGeometry = [
  {
    id: 'fo-nameshape',
    level: 1.2,
    make: (r) => {
      const shapes = [
        ['3', 'triangle', 'square'],
        ['4', 'square', 'triangle']
      ];
      const [n, name, other] = pick(r, shapes);
      return {
        prompt: `A shape has ${n} straight sides. What is it called?`,
        ...choiceSet(r, `A ${name}`, [
          { v: `A ${other}`, why: `A ${other} does not have ${n} sides. Count them again.` },
          { v: 'A circle', why: 'A circle has no straight sides at all.' },
          { v: 'A line', why: 'A line is not a shape. A shape closes up.' }
        ]),
        explanation: `${n} straight sides makes a ${name}.`
      };
    }
  },
  {
    id: 'fo-corners',
    level: 1.9,
    make: (r) => {
      const n = pick(r, [3, 4]);
      const name = n === 3 ? 'triangle' : 'square';
      return {
        prompt: `How many corners does a ${name} have?`,
        ...choiceSet(r, n, [
          { v: n + 1, why: 'One too many. Touch each corner as you count.' },
          { v: n - 1, why: 'One short. Go all the way round and back to the start.' },
          { v: 0, why: 'Only a circle has no corners.' }
        ]),
        explanation: `A ${name} has ${n} corners, one for each side.`
      };
    }
  },
  {
    id: 'fo-sameshape',
    level: 2.2,
    make: (r) => {
      const a = pick(r, ['square', 'triangle', 'circle']);
      return {
        prompt: `You turn a ${a} upside down. Is it still a ${a}?`,
        ...choiceSet(r, 'Yes', [
          { v: 'No, it changes', why: 'Turning a shape does not change what it is. Only the way it sits changes.' },
          { v: 'Only sometimes', why: 'It works every time. A turned shape is the same shape.' },
          { v: 'It becomes a circle', why: 'Turning never changes one shape into another.' }
        ]),
        explanation: 'A shape stays the same shape when you turn it.'
      };
    }
  }
];

const foundationPatterns = [
  {
    id: 'fo-nextone',
    level: 1.2,
    make: (r) => {
      const start = int(r, 1, 4);
      const seq = [start, start + 1, start + 2, start + 3];
      return {
        prompt: `Pots in a row: ${seq[0]}, ${seq[1]}, ${seq[2]}. What comes next?`,
        ...choiceSet(r, seq[3], [
          { v: seq[2], why: 'That one is already there. The next one is bigger.' },
          { v: seq[3] + 1, why: 'That skips one. Each pot goes up by 1.' },
          { v: start, why: 'That is the first one. We want the one after the last.' }
        ]),
        explanation: `Each number goes up by 1, so next is ${seq[3]}.`
      };
    }
  },
  {
    id: 'fo-twos',
    level: 2.0,
    make: (r) => {
      const start = pick(r, [2, 4, 6]);
      return {
        prompt: `Count by twos: ${start}, ${start + 2}, ${start + 4}. What comes next?`,
        ...choiceSet(r, start + 6, [
          { v: start + 5, why: 'That is only 1 more. We are going up by 2 each time.' },
          { v: start + 4, why: 'That one is already in the list.' },
          { v: start + 8, why: 'That skips one. Go up by 2, not 4.' }
        ]),
        explanation: `Add 2 each time, so next is ${start + 6}.`
      };
    }
  },
  {
    id: 'fo-samepattern',
    level: 2.2,
    make: (r) => {
      const shape = pick(r, ['leaf', 'seed', 'flower']);
      return {
        prompt: `A pattern goes: red ${shape}, white ${shape}, red ${shape}, white ${shape}. What comes next?`,
        ...choiceSet(r, `Red ${shape}`, [
          { v: `White ${shape}`, why: 'The last one was white. Red comes after white here.' },
          { v: `Two red ones`, why: 'The pattern adds one at a time.' },
          { v: 'The pattern stops', why: 'A pattern keeps going the same way.' }
        ]),
        explanation: 'Red, white, red, white — so red is next.'
      };
    }
  }
];

/* ============================= ELA ============================= */

const foundationReading = [
  {
    id: 'fo-rc-who',
    level: 1.2,
    make: () => ({
      passage: 'Mia has a plant. The plant is small. Mia gives it water.',
      prompt: 'Who has the plant?',
      choices: ['Mia', 'The water', 'Nobody', 'The pot'],
      answer: 0,
      whys: [
        '',
        'The water is what she gives it. It is not a person.',
        'The story names someone. Look at the first word.',
        'A pot is not in this story.'
      ],
      explanation: 'The first sentence says Mia has a plant.'
    })
  },
  {
    id: 'fo-rc-what',
    level: 1.9,
    make: () => ({
      passage: 'The seed is under the soil. Rain falls on it. A green stem comes up.',
      prompt: 'What comes up out of the soil?',
      choices: ['A green stem', 'The rain', 'The soil', 'A seed'],
      answer: 0,
      whys: [
        '',
        'The rain falls down, not up.',
        'The soil stays where it is.',
        'The seed was already there, under the soil.'
      ],
      explanation: 'The last sentence says a green stem comes up.'
    })
  },
  {
    id: 'fo-rc-order',
    level: 2.2,
    make: () => ({
      passage: 'First you dig a hole. Then you drop in a seed. Last you cover it with soil.',
      prompt: 'What do you do first?',
      choices: ['Dig a hole', 'Cover the seed', 'Drop in a seed', 'Water it'],
      answer: 0,
      whys: [
        '',
        'That is the last thing, not the first.',
        'That is the second thing. Something happens before it.',
        'The story does not say anything about water.'
      ],
      explanation: 'The word "first" tells you: dig a hole.'
    })
  }
];

const foundationVocabulary = [
  {
    id: 'fo-vo-mean',
    level: 1.2,
    make: () => ({
      // Was 13 words; the reading-load check caps a 1.5 item at 10.5 and was
      // right to reject it. A vocabulary question that needs strong reading to
      // parse is measuring reading, not vocabulary.
      prompt: 'Damp means a little bit of what?',
      choices: ['Water', 'Sun', 'Dirt', 'Wind'],
      answer: 0,
      whys: ['', 'Sun makes things dry, not damp.', 'Dirt is soil. Damp is about being wet.', 'Wind blows. It does not make things damp.'],
      explanation: 'Damp means a little bit wet.'
    })
  },
  {
    id: 'fo-vo-opposite',
    level: 1.8,
    make: () => ({
      // "opposite" is itself a three-syllable word — too long for a 1.5 item,
      // and a child who cannot read it cannot answer a question about it.
      prompt: 'Which word means NOT wet?',
      choices: ['Dry', 'Cold', 'Big', 'Green'],
      answer: 0,
      whys: ['', 'Cold is about heat, not water.', 'Big is about size.', 'Green is a colour.'],
      explanation: 'Wet and dry are opposites.'
    })
  },
  {
    id: 'fo-vo-group',
    level: 2.1,
    make: () => ({
      prompt: 'Mint, sage and basil are all kinds of what?',
      choices: ['Herbs', 'Rocks', 'Animals', 'Tools'],
      answer: 0,
      whys: ['', 'Rocks are not alive and do not grow.', 'These are plants, not animals.', 'A tool is a thing you hold to do a job.'],
      explanation: 'Mint, sage and basil are all herbs.'
    })
  }
];

const foundationGrammar = [
  {
    id: 'fo-gr-naming',
    level: 1.2,
    make: () => ({
      prompt: 'Which word is the name of a thing?  "The pot is red."',
      choices: ['pot', 'is', 'red', 'the'],
      answer: 0,
      whys: ['', 'That word tells you something about the pot.', 'That word tells you the colour.', 'That word points at the thing. It is not the thing.'],
      explanation: 'A pot is a thing, so "pot" is the naming word.'
    })
  },
  {
    id: 'fo-gr-doing',
    level: 1.8,
    make: () => ({
      prompt: 'Which word is a doing word?  "She waters the plant."',
      choices: ['waters', 'she', 'plant', 'the'],
      answer: 0,
      whys: ['', 'That tells you who. It is not what she does.', 'That is a thing, not an action.', 'That word points at the plant.'],
      explanation: 'Watering is the action, so "waters" is the doing word.'
    })
  },
  {
    id: 'fo-gr-capital',
    level: 2.1,
    make: () => ({
      prompt: 'Which sentence is written the right way?',
      choices: [
        'The mint is green.',
        'the mint is green.',
        'The mint is green',
        'the mint is green'
      ],
      answer: 0,
      whys: [
        '',
        'A sentence starts with a big letter.',
        'A sentence ends with a full stop.',
        'This one needs a big letter at the start and a full stop at the end.'
      ],
      explanation: 'A sentence starts with a capital letter and ends with a full stop.'
    })
  }
];

const foundationWriting = [
  {
    id: 'fo-ws-first',
    level: 1.2,
    make: () => ({
      prompt: 'You want to write about your garden. What do you write first?',
      choices: [
        'What the garden is',
        'The very last thing that happened',
        'Nothing at all',
        'Your name over and over'
      ],
      answer: 0,
      whys: [
        '',
        'The end goes at the end. Start by saying what it is.',
        'Writing needs words on the page.',
        'Your name once is enough. Then tell about the garden.'
      ],
      explanation: 'Start by telling the reader what you are writing about.'
    })
  },
  {
    id: 'fo-ws-detail',
    level: 1.9,
    make: () => ({
      prompt: 'Which sentence tells the reader more?',
      choices: [
        'The mint smells sharp and cool.',
        'The mint is nice.',
        'Mint.',
        'I like it.'
      ],
      answer: 0,
      whys: [
        '',
        '"Nice" does not tell the reader what it is like.',
        'One word is not a sentence.',
        'This tells about you, not about the mint.'
      ],
      explanation: 'Words like sharp and cool let the reader imagine it.'
    })
  },
  {
    id: 'fo-ws-stayon',
    level: 2.2,
    make: () => ({
      prompt: 'You are writing about growing beans. Which sentence does NOT belong?',
      choices: [
        'My cat is called Bo.',
        'I put the beans in the soil.',
        'I water them each day.',
        'The first leaves came up fast.'
      ],
      answer: 0,
      whys: [
        '',
        'That is about the beans, so it belongs.',
        'That is about looking after the beans.',
        'That is about the beans growing.'
      ],
      explanation: 'Every sentence should be about the thing you are writing about.'
    })
  }
];

/* --------------------------------------------------------------- *
 * Hand-written ELA items use the same shape materialise() expects,
 * but there is nothing random in them, so one variant each.
 * --------------------------------------------------------------- */
function materialiseWritten(templates, strandId) {
  return templates.map((t) => {
    const body = t.make();
    const { whys = [], ...rest } = body;
    return {
      id: `${t.id}-v0`,
      templateId: t.id,
      strand: strandId,
      level: t.level,
      type: 'choice',
      ...rest,
      // Same field name choiceSet() produces, so every screen reads one shape
      // whether the question was generated or hand-written. The correct answer
      // carries null, exactly as the generated items do.
      choiceFeedback: rest.choices.map((_, i) => (i === rest.answer ? null : whys[i] || ''))
    };
  });
}

export const foundationItems = [
  ...materialise(foundationNumbers, 'numbers-operations'),
  ...materialise(foundationFractions, 'fractions-decimals'),
  ...materialise(foundationMeasurement, 'measurement-data'),
  ...materialise(foundationGeometry, 'geometry'),
  ...materialise(foundationPatterns, 'patterns-algebra'),
  ...materialiseWritten(foundationReading, 'reading-comprehension'),
  ...materialiseWritten(foundationVocabulary, 'vocabulary'),
  ...materialiseWritten(foundationGrammar, 'grammar-usage'),
  ...materialiseWritten(foundationWriting, 'writing-strategies')
];
