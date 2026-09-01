// ---------------------------------------------------------------------------
// THE HUMAN BODY · MODULE 10 — THE GUT, A LONG TUBE
//
// Four lessons. Quarter 3, weeks 3 and 4. Tuesday and Thursday, 30 minutes.
// Module 9 got food as far as the stomach. This module takes it the rest of
// the way and asks the only question that matters: how does what she eats get
// out of the tube and into the blood she measured in Module 6?
//
// ---- THE DOCTOR'S ACTION: MEASURE OUT SEVEN METRES OF STRING ----
//
// Her small intestine is about seven metres long, coiled up behind her belly
// button. She lays that out as string on the floor or in the yard, in metres
// AND in centimetres, and walks its length. That is MEASUREMENT and UNIT
// CONVERSION — she scored 0 of 3 on units and 2.00 on measurement, both at the
// test floor. A number she has walked the length of is a number she keeps.
//
// Lesson 3 adds AREA: the lining is folded so small that the inside surface of
// that tube is roughly the size of a tennis court. She works out the area of a
// rectangle drawn on squared paper to see what "folded to gain surface" buys.
// Perimeter was 0 of 3 and area 0 of 2. Both live here, in a real question.
//
// ---- READING CAP ----
//
// Quarter 3: 14 words a sentence, floor 6.5. §10.1.
//
// ---- SAFETY ----
//
// The same narrowing as Module 9, and one more. Bacteria in the gut is a topic
// that goes straight to supplements, "gut health", and food rules if it is let
// off the lead. So Lesson 4 teaches ONE fact — some living things in the tube
// are useful and are meant to be there — and teaches it as biology. No
// probiotics, no fermented-food advice, no "eat this for your gut", nothing
// about anybody's digestion including her own, and nothing anywhere about
// weight, amounts, or how a body looks.
// ---------------------------------------------------------------------------

// =========================================================== LESSON 1
const L1_CHECK_IN = {
  title: 'One long tube',
  text: 'Food goes in at your mouth and what is left comes out at the other end.',
  question: 'Do you think that is one connected tube, or lots of separate parts?'
};

const L1_BEATS = [
  {
    n: 1,
    label: 'It is one tube, from your mouth to the end',
    hook: 'You are shaped a bit like a doughnut, and that is not a joke.',
    teachingText:
      'Your mouth, throat, stomach, small intestine and large intestine are all one connected tube. Food inside that tube has not really entered your body yet. It is still passing through.',
    example:
      'A doughnut has a hole running through the middle. Food in your gut is in the hole, not in the dough.',
    applyIt: {
      prompt: 'Food sitting in your gut is best described as:',
      choices: ['Inside your blood', 'Still passing through a tube', 'Part of your muscles', 'Gone'],
      answer: 1,
      feedback: [
        'Not yet. That comes later, and only some of it.',
        null,
        'Nothing is built out of it until it crosses over.',
        'It is very much still there.'
      ]
    }
  },
  {
    n: 2,
    label: 'The tube squeezes food along by itself',
    hook: 'You could eat lying upside down and the food would still arrive.',
    teachingText:
      'The walls of the tube are muscle, and they squeeze in waves behind the food. That wave pushes it forward whichever way up you are. Gravity is not doing the work.',
    example:
      'Squeeze a tube of toothpaste from the bottom and the paste moves up. Your gut does that to itself, over and over.',
    applyIt: {
      prompt: 'What moves food along the tube?',
      choices: ['Gravity', 'Breathing', 'Waves of muscle squeezing', 'Nothing, it falls'],
      answer: 2,
      feedback: [
        'An astronaut in space still digests food.',
        'Breathing moves air, not food.',
        null,
        'Then upside down would be a problem.'
      ]
    }
  }
];

const L1_ACTIVITY = {
  title: 'Draw the whole journey',
  prep: 'A long strip of paper, or two sheets taped end to end.',
  needs: ['a long strip of paper', 'a pencil', 'a ruler', 'her notebook'],
  steps: [
    'Draw one long wiggly tube from the top of the paper to the bottom.',
    'Mark the mouth, the throat, the stomach, then the two intestines in order.',
    'Write beside each one what happens to food there, in your own words.',
    'Draw three arrows on the tube showing which way the squeezing waves travel.',
    'Write one sentence saying why the tube counts as outside your body.'
  ],
  safety:
    'A drawing of a body in general, not of hers and not of anybody else’s. Nothing here is about how a person looks.',
  minutes: 13
};

const L1_LEDGER = {
  prompt: 'Write down the five parts of the tube in the order food meets them.',
  ifSheIsStuck:
    'Ask her to trace the route with a finger, starting at her lips. Naming a part while pointing at it is worth more than getting the order right on the first try.'
};

// =========================================================== LESSON 2
const L2_CHECK_IN = {
  title: 'Seven metres, coiled up',
  text: 'The small intestine is the longest part of the tube by a long way.',
  question: 'How long do you think it is, if you pulled it out straight?'
};

const L2_BEATS = [
  {
    n: 1,
    label: 'It is about seven metres long, folded up behind your belly button',
    hook: 'Seven metres of tube is packed into a space the size of a shoebox.',
    teachingText:
      'A grown person’s small intestine is around seven metres from end to end. It is coiled and folded many times over to fit inside. Yours is shorter, because you are shorter.',
    example:
      'Seven metres is about four of you lying end to end. All of it is curled up behind your belly button.',
    applyIt: {
      prompt: 'Seven metres written in centimetres is:',
      choices: ['70 cm', '700 cm', '7000 cm', '7 cm'],
      answer: 1,
      feedback: [
        'That is only seven tenths of a metre.',
        null,
        'That would be seventy metres.',
        'That is the number without its unit changed.'
      ]
    }
  },
  {
    n: 2,
    label: 'Long means slow, and slow is the point',
    hook: 'The length is not an accident. It buys time.',
    teachingText:
      'Food takes hours to travel that seven metres. All the way along, useful bits are pulled out of it and passed into the blood. A short tube would let too much go by unused.',
    example:
      'Panning for gold in a long stream finds more than panning in a puddle. More time in the water, more chances to catch something.',
    applyIt: {
      prompt: 'A longer small intestine means:',
      choices: ['Food moves faster', 'More time to take useful bits out', 'Less room for food', 'Food is heavier'],
      answer: 1,
      feedback: [
        'Longer takes longer, not less.',
        null,
        'It holds more, not less.',
        'Length does not change weight.'
      ]
    }
  }
];

const L2_ACTIVITY = {
  title: 'Seven metres of string',
  prep: 'A ball of string, a metre stick or tape measure, and floor space or a yard.',
  needs: ['string', 'a metre stick or tape measure', 'scissors', 'chalk or tape', 'her notebook'],
  steps: [
    'Measure and cut a piece of string exactly seven metres long.',
    'Write down that length in metres, and again in centimetres.',
    'Lay it out straight along the floor or the yard, and walk beside it.',
    'Now coil it up as small as you can and measure the pile across.',
    'Write down both numbers with their units, and one sentence about the difference.'
  ],
  safety:
    'Scissors with a grown-up nearby. Nothing goes round anybody’s neck, wrists or fingers — string is measured on the floor and stays on the floor.',
  minutes: 15
};

const L2_LEDGER = {
  prompt: 'Write down how long the small intestine is, in metres and in centimetres.',
  ifSheIsStuck:
    'The conversion is the part to hold on to, not the seven. One metre is a hundred centimetres, so seven metres is seven hundred. Let her say the times-table sentence out loud.'
};

// =========================================================== LESSON 3
const L3_CHECK_IN = {
  title: 'A towel and a sheet of glass',
  text: 'Spill water on a towel and it soaks in. Spill it on glass and it sits there.',
  question: 'What is different about the towel that makes it soak things up?'
};

const L3_BEATS = [
  {
    n: 1,
    label: 'The lining is folded, and folding buys surface',
    hook: 'The inside of that tube is not smooth. It is shaggy.',
    teachingText:
      'The wall of the small intestine is covered in tiny fingers, and each finger is covered in smaller ones. Folding a surface like that makes far more of it fit in the same space.',
    example:
      'A flat bath towel folded into a small pile still has all its surface. That is why it dries you and glass does not.',
    applyIt: {
      prompt: 'Folding a surface many times means:',
      choices: ['There is less of it', 'There is more of it in the same space', 'It gets heavier', 'It gets smoother'],
      answer: 1,
      feedback: [
        'Folding hides it, it does not remove it.',
        null,
        'Weight does not change when you fold.',
        'Folding makes it rougher, not smoother.'
      ]
    }
  },
  {
    n: 2,
    label: 'Useful bits cross the wall into the blood',
    hook: 'This is the moment food finally enters you.',
    teachingText:
      'Every one of those tiny fingers has blood vessels inside it. Broken-down food passes through the thin wall and into the blood, which carries it away to the rest of you.',
    example:
      'It is the same swap you met in the lungs. A wall thin enough to cross, with blood waiting on the other side.',
    applyIt: {
      prompt: 'Food finally enters your body when it:',
      choices: ['Is swallowed', 'Reaches the stomach', 'Crosses the gut wall into blood', 'Is chewed'],
      answer: 2,
      feedback: [
        'It is still in the tube then.',
        'Still in the tube there too.',
        null,
        'Chewing only makes the pieces smaller.'
      ]
    }
  }
];

const L3_ACTIVITY = {
  title: 'How much surface does folding buy?',
  prep: 'Squared paper, a ruler and a pencil.',
  needs: ['squared paper', 'a ruler', 'a pencil', 'her notebook'],
  steps: [
    'Draw a rectangle 4 squares across and 3 squares down on the squared paper.',
    'Count the squares inside it and write that down as the area.',
    'Count round the outside and write that down as the perimeter.',
    'Now draw a strip 12 squares long and 1 square wide, and find its area and perimeter.',
    'Write one sentence about which shape had more edge for the same area.'
  ],
  safety:
    'Paper and pencil only. Nothing about anybody’s body is measured in this lesson.',
  minutes: 14
};

const L3_LEDGER = {
  prompt: 'Write down what folding does to a surface, and why a gut would want that.',
  ifSheIsStuck:
    'Both shapes had an area of 12, and the long thin one had far more edge. That is the whole idea. Let her say it in her own words before she writes it.'
};

// =========================================================== LESSON 4
const L4_CHECK_IN = {
  title: 'Not everything in there is you',
  text: 'Living things far too small to see are living in the last part of the tube.',
  question: 'Do you think they are there by accident, or are they supposed to be?'
};

const L4_BEATS = [
  {
    n: 1,
    label: 'The large intestine takes the water back',
    hook: 'By the end of the tube, most of the useful bits are already gone.',
    teachingText:
      'The last part of the tube is wider and much shorter. Its main job is taking water back out of what is left, so your body does not lose it.',
    example:
      'You drink water all day and you do not leak. Most of what your gut used gets pulled back here.',
    applyIt: {
      prompt: 'The main job of the large intestine is:',
      choices: ['Chewing', 'Taking water back', 'Making blood', 'Pumping'],
      answer: 1,
      feedback: [
        'That happened at the very start.',
        null,
        'Bones do that, not the gut.',
        'The heart does the pumping.'
      ]
    }
  },
  {
    n: 2,
    label: 'Useful living things share the tube with you',
    hook: 'You are carrying passengers, and they earn their ride.',
    teachingText:
      'Huge numbers of living things too small to see live in the last part of the tube. They break down bits your own body cannot, and they are meant to be there.',
    example:
      'Scientists call the whole crowd of them your gut bacteria. Doctors study them because most of them are helpful, not harmful.',
    applyIt: {
      prompt: 'The tiny living things in your gut are:',
      choices: ['Mostly helpful and meant to be there', 'Always harmful', 'Not really alive', 'Only there when you are ill'],
      answer: 0,
      feedback: [
        null,
        'Most do a useful job.',
        'They are alive, and they grow.',
        'They live there all the time.'
      ]
    }
  }
];

const L4_ACTIVITY = {
  title: 'How much water comes back?',
  prep: 'Two identical cups, water, a wet sponge and a measuring jug.',
  needs: ['two cups', 'water', 'a sponge', 'a measuring jug', 'her notebook'],
  steps: [
    'Measure 200 millilitres of water into a cup and write the number down.',
    'Soak the sponge in it, then lift the sponge out and let it drip for ten seconds.',
    'Pour what is left in the cup into the jug and write down that number.',
    'Squeeze the sponge hard over the second cup and measure what comes out.',
    'Write one sentence about how much you got back, and how much stayed in the sponge.'
  ],
  safety:
    'Water and a clean sponge, over a sink or a tray. Nothing is drunk and nothing is tasted in this activity.',
  minutes: 14
};

const L4_LEDGER = {
  prompt: 'Write down the two jobs the large intestine does.',
  ifSheIsStuck:
    'Water back, and useful passengers. She squeezed the sponge for the first one, and the video gave her the second.'
};

// ---------------------------------------------------------------------------

export const HUMANBODY_M10 = [
  {
    id: 'body-m10-01',
    course: 'humanbody',
    module: 10,
    quarter: 3,
    week: 3,
    day: 1,
    n: 1,
    title: 'One tube, all the way through',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'The gut is one connected tube from mouth to end, and muscle waves push food along it whichever way up you are.',
    standards: [],
    offGrade: null,
    words: ['gut', 'intestine', 'wave'],
    glossary: [
      { word: 'gut', plain: 'The whole tube food travels down, from mouth to end.' },
      { word: 'intestine', plain: 'The long coiled part of that tube below the stomach.' },
      { word: 'wave', plain: 'A squeeze that travels along, pushing what is in front of it.' }
    ],
    video: {
      id: 'AX34MoaLmzE',
      url: 'https://www.youtube.com/watch?v=AX34MoaLmzE',
      title: 'Operation Ouch - Digestion | Biology for Kids',
      channel: 'Operation Ouch',
      minutes: 5,
      verified: '2026-08-18 · youtube.com/oembed · 4:36 read from the playlist duration badge',
      teaches: ['the whole route food takes', 'that the gut is one connected tube', 'that muscle waves move food along'],
      sourceGap:
        'OPEN. Searched: "small intestine villi absorption for kids youtube SciShow Kids OR Dr. Binocs OR Nemours" — returned Peekaboo Kidz, FuseSchool and several GCSE revision channels, no Black-educator-led channel. Recorded unknown, not closed. The two standing searches for this course are written down in full on body-m1-01.'
    },
    checkIn: L1_CHECK_IN,
    beats: L1_BEATS,
    activity: L1_ACTIVITY,
    ledger: L1_LEDGER,
    hook: L1_CHECK_IN,
    core: L1_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L1_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'Is the gut one tube or many parts?', answer: 'One connected tube.', why: 'Mouth to end, joined all the way.' },
      { ask: 'What pushes food along it?', answer: 'Waves of muscle squeezing.', why: 'Not gravity — upside down still works.' }
    ],
    check: [
      {
        prompt: 'Food sitting in your gut is best described as:',
        choices: ['Inside your blood', 'Still passing through a tube', 'Part of your muscles', 'Gone'],
        answer: 1,
        feedback: ['Not yet, and only some of it.', null, 'Nothing is built from it yet.', 'It is still there.']
      },
      {
        prompt: 'What moves food along the tube?',
        choices: ['Gravity', 'Waves of muscle squeezing', 'Breathing', 'Nothing, it falls'],
        answer: 1,
        feedback: ['Astronauts digest food too.', null, 'Breathing moves air.', 'Then upside down would fail.']
      },
      {
        prompt: 'The order food meets the parts is:',
        choices: ['Stomach, mouth, intestines', 'Mouth, stomach, intestines', 'Intestines, stomach, mouth', 'All at once'],
        answer: 1,
        feedback: ['The mouth is first.', null, 'That is backwards.', 'It is a journey, in order.']
      }
    ]
  },
  {
    id: 'body-m10-02',
    course: 'humanbody',
    module: 10,
    quarter: 3,
    week: 3,
    day: 2,
    n: 2,
    title: 'Seven metres of small intestine',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'The small intestine is about seven metres long and folded to fit, and its length buys the time needed to pull useful bits out.',
    standards: [],
    offGrade: 'Measurement and unit conversion: metres to centimetres. Her Check-In scored 2.00 on measurement and 0 of 3 on units, both at the test floor.',
    words: ['metre', 'centimetre', 'coiled'],
    glossary: [
      { word: 'metre', plain: 'A length about as tall as a door handle is high.' },
      { word: 'centimetre', plain: 'A small length. A hundred of them make one metre.' },
      { word: 'coiled', plain: 'Wound round and round to fit in a smaller space.' }
    ],
    video: {
      id: 'pe73u9GWZj4',
      url: 'https://www.youtube.com/watch?v=pe73u9GWZj4',
      title: 'Science for Kids - Learn About Intestines | Operation Ouch',
      channel: 'Operation Ouch',
      minutes: 5,
      verified: '2026-08-18 · youtube.com/oembed · 4:47 read from the playlist duration badge',
      teaches: ['how long the small intestine really is', 'how it coils to fit', 'why length matters for taking food in'],
      sourceGap: 'OPEN. Same searches as body-m10-01 and body-m1-01, both written down there.'
    },
    checkIn: L2_CHECK_IN,
    beats: L2_BEATS,
    activity: L2_ACTIVITY,
    ledger: L2_LEDGER,
    hook: L2_CHECK_IN,
    core: L2_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L2_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'How long is the small intestine?', answer: 'About seven metres.', why: 'Coiled behind the belly button.' },
      { ask: 'Seven metres in centimetres?', answer: '700 centimetres.', why: 'One metre is a hundred centimetres.' }
    ],
    check: [
      {
        prompt: 'Seven metres written in centimetres is:',
        choices: ['70 cm', '7000 cm', '700 cm', '7 cm'],
        answer: 2,
        feedback: ['That is under a metre.', 'That would be seventy metres.', null, 'The unit has to change too.']
      },
      {
        prompt: 'A longer small intestine means:',
        choices: ['More time to take useful bits out', 'Food moves faster', 'Less room for food', 'Food is heavier'],
        answer: 0,
        feedback: [null, 'Longer takes longer.', 'It holds more.', 'Length is not weight.']
      },
      {
        prompt: 'Three metres written in centimetres is:',
        choices: ['30 cm', '300 cm', '3000 cm', '3 cm'],
        answer: 1,
        feedback: ['Ten times too small.', null, 'Ten times too big.', 'Unit unchanged.']
      }
    ]
  },
  {
    id: 'body-m10-03',
    course: 'humanbody',
    module: 10,
    quarter: 3,
    week: 4,
    day: 1,
    n: 3,
    title: 'A shaggy lining, and why',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'The gut lining is folded into tiny fingers, which packs far more surface into the same space, and food crosses that surface into the blood.',
    standards: [],
    offGrade: 'Area and perimeter of a rectangle on squared paper. Her Check-In scored 0 of 2 on area and 0 of 3 on perimeter.',
    words: ['surface', 'area', 'perimeter'],
    glossary: [
      { word: 'surface', plain: 'The outside face of something — the part you could touch.' },
      { word: 'area', plain: 'How much flat space is inside a shape. Count the squares.' },
      { word: 'perimeter', plain: 'The distance all the way round the outside of a shape.' }
    ],
    video: {
      id: 'ZBZWgrfZFbU',
      url: 'https://www.youtube.com/watch?v=ZBZWgrfZFbU',
      title: 'Digestive System | The Dr. Binocs Show | Learn Videos For Kids',
      channel: 'Peekaboo Kidz',
      minutes: 4,
      verified: '2026-08-18 · youtube.com/oembed · 3:47 read from the playlist duration badge',
      teaches: ['what the gut lining looks like close up', 'how food crosses into the blood', 'why the lining is folded'],
      sourceGap: 'OPEN. Same searches as body-m10-01 and body-m1-01, both written down there.'
    },
    checkIn: L3_CHECK_IN,
    beats: L3_BEATS,
    activity: L3_ACTIVITY,
    ledger: L3_LEDGER,
    hook: L3_CHECK_IN,
    core: L3_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L3_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'Why is the lining folded?', answer: 'To fit more surface in the same space.', why: 'Like a towel folded into a pile.' },
      { ask: 'Where does food go from there?', answer: 'Through the wall into the blood.', why: 'Blood vessels sit inside every finger.' }
    ],
    check: [
      {
        prompt: 'Folding a surface many times means:',
        choices: ['There is less of it', 'It gets smoother', 'There is more of it in the same space', 'It gets heavier'],
        answer: 2,
        feedback: ['Folding hides it, not removes it.', 'It gets rougher.', null, 'Weight is unchanged.']
      },
      {
        prompt: 'A rectangle 4 squares by 3 squares has an area of:',
        choices: ['7 squares', '14 squares', '12 squares', '4 squares'],
        answer: 2,
        feedback: ['That is adding the sides.', 'That is the perimeter.', null, 'That is one side.']
      },
      {
        prompt: 'Food finally enters your body when it:',
        choices: ['Is swallowed', 'Crosses the gut wall into blood', 'Reaches the stomach', 'Is chewed'],
        answer: 1,
        feedback: ['Still in the tube.', null, 'Still in the tube.', 'Only smaller pieces.']
      }
    ]
  },
  {
    id: 'body-m10-04',
    course: 'humanbody',
    module: 10,
    quarter: 3,
    week: 4,
    day: 2,
    n: 4,
    title: 'The last part, and its passengers',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'The large intestine takes water back out of what is left, and useful living things too small to see share that part of the tube.',
    standards: [],
    offGrade: 'Volume in millilitres, measured and compared. Measurement scored 2.00, at the test floor.',
    words: ['bacteria', 'millilitre', 'absorb'],
    glossary: [
      { word: 'bacteria', plain: 'Living things far too small to see. Most are harmless and many are useful.' },
      { word: 'millilitre', plain: 'A small amount of liquid. A thousand of them fill a litre bottle.' },
      { word: 'absorb', plain: 'To soak something up and take it in.' }
    ],
    video: {
      id: 'JFMK3OUntDU',
      url: 'https://www.youtube.com/watch?v=JFMK3OUntDU',
      title: 'Operation Ouch - Body Bacteria | Biology for Kids',
      channel: 'Operation Ouch',
      minutes: 6,
      verified: '2026-08-18 · youtube.com/oembed · 5:26 read from the playlist duration badge',
      teaches: ['that living things share the gut', 'that most of them are useful', 'how scientists study them'],
      sourceGap: 'OPEN. Same searches as body-m10-01 and body-m1-01, both written down there.'
    },
    checkIn: L4_CHECK_IN,
    beats: L4_BEATS,
    activity: L4_ACTIVITY,
    ledger: L4_LEDGER,
    hook: L4_CHECK_IN,
    core: L4_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L4_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What does the large intestine mainly do?', answer: 'Takes water back.', why: 'So your body does not lose it.' },
      { ask: 'Are gut bacteria supposed to be there?', answer: 'Yes, most are useful.', why: 'They break down bits you cannot.' }
    ],
    check: [
      {
        prompt: 'The main job of the large intestine is:',
        choices: ['Chewing', 'Making blood', 'Pumping', 'Taking water back'],
        answer: 3,
        feedback: ['That was the very start.', 'Bones do that.', 'The heart does that.', null]
      },
      {
        prompt: 'The tiny living things in your gut are:',
        choices: ['Always harmful', 'Not really alive', 'Only there when ill', 'Mostly helpful and meant to be there'],
        answer: 3,
        feedback: ['Most do a useful job.', 'They are alive.', 'They live there always.', null]
      },
      {
        prompt: 'You start with 200 ml and 60 ml stays in the sponge. What is left?',
        choices: ['260 ml', '120 ml', '160 ml', '140 ml'],
        answer: 3,
        feedback: ['That is adding them.', 'Check the subtraction.', 'Check the subtraction.', null]
      }
    ]
  }
];

export const HUMANBODY_M10_META = {
  courseId: 'humanbody',
  module: 10,
  title: 'The Gut, a Long Tube',
  blurb:
    'Seven metres of string laid out on the floor and walked beside, a lining folded like a towel to buy surface, and the discovery that food is not really inside her until it crosses the wall.'
};

export function humanbodyM10LessonById(id) {
  return HUMANBODY_M10.find((l) => l.id === id) || null;
}

export default HUMANBODY_M10;
