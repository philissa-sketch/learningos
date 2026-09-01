// ---------------------------------------------------------------------------
// MATH ITEM BANK — five strands, generated from templates.
//
// WHY GENERATED AND NOT HAND-WRITTEN. Maths is the one subject where the same
// question with different numbers is genuinely the same question. Seven
// templates per strand at seven different grade levels, three variants each,
// gives twenty-one real items per strand — enough that a full eight-question
// strand can be re-sat twice with nothing repeating. Hand-writing 105 maths
// questions to get the same coverage would take longer and be more likely to
// contain an arithmetic slip.
//
// Reading, writing and science are NOT generated. See elaItems.js for why.
//
// Every distractor carries feedback naming the specific mistake that produces
// it, so a wrong answer teaches something instead of just being wrong.
// ---------------------------------------------------------------------------

import { choiceSet, int, pick, materialise, HERBS, herbPlural, cap } from './itemHelpers.js';

// ===========================================================================
// NUMBERS & OPERATIONS
// ===========================================================================
const numbersTemplates = [
  {
    id: 'no-add2',
    level: 2.2,
    make: (r) => {
      const herb = pick(r, HERBS);
      const a = int(r, 24, 48);
      const b = int(r, 25, 45);
      return {
        prompt: `Grandma dried ${a} ${herbPlural(herb)} on Monday and ${b} more on Tuesday. How many did she dry in all?`,
        ...choiceSet(r, a + b, [
          { v: a + b - 10, why: 'Close! It looks like a ten went missing when you carried. Try adding the ones column first, then the tens.' },
          { v: a - b, why: 'That is what you get by subtracting. "In all" means the two piles are joined, so this one adds.' },
          { v: a + b + 10, why: 'That is ten too many — an extra ten got carried. Check the ones column adds up to what you carried.' }
        ]),
        explanation: `${a} + ${b} = ${a + b}. "In all" means put the two piles together, so you add.`
      };
    }
  },
  {
    id: 'no-sub2',
    level: 2.8,
    make: (r) => {
      const herb = pick(r, HERBS);
      const total = int(r, 61, 94);
      const used = int(r, 25, 48);
      return {
        prompt: `There were ${total} ${herbPlural(herb)} in the jar. Grandma used ${used} to make a tea blend. How many are left in the jar?`,
        ...choiceSet(r, total - used, [
          { v: total + used, why: 'That adds the two numbers. Herbs were taken OUT of the jar, so the number left has to be smaller than what you started with.' },
          { v: total - used + 10, why: 'Ten too many — it looks like a ten was borrowed but never taken away from the tens column.' },
          { v: total - used - 10, why: 'Ten too few. Check the tens column: only borrow when the top digit really is smaller than the bottom one.' }
        ]),
        explanation: `${total} − ${used} = ${total - used}. Used up means take away.`
      };
    }
  },
  {
    id: 'no-mult1',
    level: 3.3,
    make: (r) => {
      const herb = pick(r, HERBS);
      const rows = int(r, 4, 9);
      const per = int(r, 4, 9);
      return {
        prompt: `Grandma plants ${rows} rows of ${herb}. Each row has ${per} plants. How many ${herb} plants are there in all?`,
        ...choiceSet(r, rows * per, [
          { v: rows + per, why: 'That adds the two numbers. Here there are equal groups repeated, so it multiplies: rows × plants in each row.' },
          { v: rows * per - per, why: 'That is one row short. Count the rows again — every row has the same number of plants.' },
          { v: rows * per + per, why: 'That is one row too many. Multiply the number of rows by the number in each row, and no extra.' }
        ]),
        explanation: `${rows} × ${per} = ${rows * per}. Equal groups repeated means multiply.`
      };
    }
  },
  {
    id: 'no-div1',
    level: 3.9,
    make: (r) => {
      const herb = pick(r, HERBS);
      const jars = int(r, 4, 8);
      const per = int(r, 6, 11);
      const total = jars * per;
      return {
        prompt: `Grandma has ${total} ${herbPlural(herb)} and shares them equally between ${jars} jars. How many go in each jar?`,
        ...choiceSet(r, per, [
          { v: total - jars, why: 'That subtracts. Sharing equally between jars is division: total ÷ number of jars.' },
          { v: per + 1, why: 'One too many per jar. Multiply your answer back by the number of jars and see if you land on the total.' },
          { v: total * jars, why: 'That multiplies, which makes the number much bigger. Sharing out makes each pile smaller than the total.' }
        ]),
        explanation: `${total} ÷ ${jars} = ${per}. Shared equally means divide.`
      };
    }
  },
  {
    id: 'no-mult2x1',
    level: 4.5,
    make: (r) => {
      const herb = pick(r, HERBS);
      const per = int(r, 14, 38);
      const bags = int(r, 4, 8);
      return {
        prompt: `Each bag holds ${per} grams of dried ${herb}. Grandma fills ${bags} bags. How many grams did she use in total?`,
        ...choiceSet(r, per * bags, [
          { v: per * bags - 10 * bags, why: 'The tens got left out. Multiply the ones AND the tens by the number of bags, then add the two parts.' },
          { v: per + bags, why: 'That adds. The same amount is repeated in every bag, so this one multiplies.' },
          { v: (per % 10) * bags + Math.floor(per / 10) * 10, why: 'Only part of the number got multiplied. Break it up: multiply the tens, multiply the ones, then add both results.' }
        ]),
        explanation: `${per} × ${bags} = ${per * bags}. Break it up if it helps: ${Math.floor(per / 10) * 10} × ${bags} = ${Math.floor(per / 10) * 10 * bags}, and ${per % 10} × ${bags} = ${(per % 10) * bags}. Add them.`
      };
    }
  },
  {
    id: 'no-mult2x2',
    level: 5.4,
    make: (r) => {
      const a = int(r, 13, 29);
      const b = int(r, 12, 24);
      return {
        prompt: `A herb farm plants ${a} beds. Each bed holds ${b} plants. How many plants is that in total?`,
        ...choiceSet(r, a * b, [
          { v: a * (b % 10) + a * 10, why: 'One of the partial products is wrong. Multiply by the ones, then by the TENS (which means adding a zero), then add.' },
          { v: a * b - a, why: 'One bed short. Check you multiplied by the full number of beds.' },
          { v: a + b, why: 'That adds. The same number of plants repeats in every bed, so multiply.' }
        ]),
        explanation: `${a} × ${b} = ${a * b}.`
      };
    }
  },
  {
    id: 'no-order',
    level: 6.1,
    make: (r) => {
      const a = int(r, 3, 8);
      const b = int(r, 4, 9);
      const c = int(r, 2, 6);
      const correct = a + b * c;
      return {
        prompt: `Grandma already had ${a} jars of salve. She makes ${b} more batches with ${c} jars in each batch. Which is the total, and what is it?  ${a} + ${b} × ${c}`,
        ...choiceSet(r, correct, [
          { v: (a + b) * c, why: 'That works left to right. Multiplication and division always happen BEFORE addition and subtraction, no matter which comes first on the page.' },
          { v: a + b + c, why: 'That adds all three. The batches are groups of jars, so that part multiplies first.' },
          { v: a * b * c, why: 'That multiplies everything. Only the batches-times-jars part multiplies; the jars she already had are added on.' }
        ]),
        explanation: `Multiply first: ${b} × ${c} = ${b * c}. Then add: ${a} + ${b * c} = ${correct}.`
      };
    }
  }
];

// ===========================================================================
// FRACTIONS & DECIMALS
// ===========================================================================
const fractionTemplates = [
  {
    id: 'fd-halfset',
    level: 2.5,
    make: (r) => {
      const herb = pick(r, HERBS);
      const half = int(r, 4, 9);
      const total = half * 2;
      return {
        prompt: `Grandma picks ${total} ${herbPlural(herb)} and gives away half of them. How many did she give away?`,
        ...choiceSet(r, half, [
          { v: total, why: 'That is all of them. Half means the pile is split into two equal parts and only one part is given away.' },
          { v: half + 1, why: 'One too many — the two halves would not be equal. Both halves have to be exactly the same size.' },
          { v: 2, why: 'That is the number of PARTS, not how many are in each part. Split the whole pile into 2 equal groups and count one group.' }
        ]),
        explanation: `Half of ${total} is ${half}, because ${half} + ${half} = ${total}.`
      };
    }
  },
  {
    id: 'fd-equiv',
    level: 3.2,
    make: (r) => {
      const m = int(r, 2, 4);
      return {
        prompt: `Grandma fills 1/2 of a jar with dried lavender. Which fraction shows the SAME amount?`,
        ...choiceSet(r, `${m}/${m * 2}`, [
          { v: '1/3', why: 'Thirds are smaller pieces than halves, and one of them is less than half a jar.' },
          { v: '2/3', why: 'Two thirds is MORE than half a jar. Picture the jar: two out of three pieces fills past the middle.' },
          { v: '1/4', why: 'One quarter is half of a half. You would need two of those to match.' }
        ]),
        explanation: `1/2 = ${m}/${m * 2}. Multiply the top and the bottom by the same number and the amount does not change.`
      };
    }
  },
  {
    id: 'fd-compare',
    level: 3.8,
    make: (r) => {
      const d = pick(r, [5, 6, 8, 10]);
      const a = int(r, 2, d - 2);
      const b = a + 1;
      return {
        prompt: `One tea bag holds ${a}/${d} of an ounce of peppermint. Another holds ${b}/${d} of an ounce. Which bag holds more?`,
        ...choiceSet(r, `the ${b}/${d} bag`, [
          { v: `the ${a}/${d} bag`, why: 'The bottom numbers are the same, so the pieces are the same size — the bag with MORE pieces holds more.' },
          { v: 'they hold the same', why: 'They are different: same size pieces, but a different number of them.' },
          { v: 'you cannot tell', why: 'You can tell here, because both fractions have the same bottom number. That means the pieces are identical in size.' }
        ]),
        explanation: `Same denominator means same-size pieces, so ${b}/${d} > ${a}/${d}.`
      };
    }
  },
  {
    id: 'fd-addlike',
    level: 4.4,
    make: (r) => {
      const d = pick(r, [6, 8, 10, 12]);
      const a = int(r, 1, Math.floor(d / 2) - 1);
      const b = int(r, 1, Math.floor(d / 2) - 1);
      return {
        prompt: `A salve recipe uses ${a}/${d} cup of calendula oil and ${b}/${d} cup of olive oil. How much oil is that altogether?`,
        ...choiceSet(r, `${a + b}/${d}`, [
          { v: `${a + b}/${d * 2}`, why: 'The bottom numbers got added too. When the pieces are already the same size, only the top numbers add — the piece size does not change.' },
          { v: `${a * b}/${d}`, why: 'That multiplies the tops. "Altogether" means add them.' },
          { v: `${Math.abs(a - b)}/${d}`, why: 'That subtracts. Two oils poured into one bowl means add.' }
        ]),
        explanation: `${a}/${d} + ${b}/${d} = ${a + b}/${d}. Same-size pieces, so count them up and leave the bottom number alone.`
      };
    }
  },
  {
    id: 'fd-decplace',
    level: 5.0,
    make: (r) => {
      const whole = int(r, 2, 8);
      const tenth = int(r, 1, 8);
      const hundredth = int(r, 1, 8);
      const a = Number(`${whole}.${tenth}${hundredth}`);
      const b = Number(`${whole}.${hundredth}${tenth}`);
      const bigger = a > b ? a : b;
      const smaller = a > b ? b : a;
      return {
        prompt: `One jar of dried ginger weighs ${a.toFixed(2)} ounces. Another weighs ${b.toFixed(2)} ounces. Which jar is heavier?`,
        ...choiceSet(r, `the ${bigger.toFixed(2)} ounce jar`, [
          { v: `the ${smaller.toFixed(2)} ounce jar`, why: 'Compare left to right. The whole numbers match, so look at the TENTHS place next — the bigger tenths digit wins.' },
          { v: 'they weigh the same', why: 'The digits are the same digits, but they are in different places, and place is what gives a digit its value.' },
          { v: 'the one with more digits', why: 'Both have the same number of digits here. Length does not decide size in decimals — place value does.' }
        ]),
        explanation: `Compare place by place: the whole numbers tie, so the tenths decide. ${bigger.toFixed(2)} > ${smaller.toFixed(2)}.`
      };
    }
  },
  {
    id: 'fd-addunlike',
    level: 5.6,
    make: (r) => {
      const pairs = [
        [1, 2, 1, 4, '3/4'],
        [1, 3, 1, 6, '1/2'],
        [1, 2, 1, 3, '5/6'],
        [1, 4, 1, 8, '3/8']
      ];
      const [an, ad, bn, bd, ans] = pick(r, pairs);
      return {
        prompt: `A tea blend uses ${an}/${ad} cup of chamomile and ${bn}/${bd} cup of lemon balm. How much dried herb is that in total?`,
        ...choiceSet(r, ans, [
          { v: `${an + bn}/${ad + bd}`, why: 'Tops and bottoms both got added. Before you can add fractions the pieces must be the SAME size — rewrite them with a common bottom number first.' },
          { v: `${an + bn}/${Math.max(ad, bd)}`, why: 'Only one fraction was rewritten. Both have to be changed to the common bottom number before the tops are added.' },
          { v: `${an + bn}/${Math.min(ad, bd)}`, why: 'The pieces are still different sizes. Find a bottom number that both will divide into, change both fractions, then add.' }
        ]),
        explanation: `Rewrite both with the same bottom number, then add the tops. ${an}/${ad} + ${bn}/${bd} = ${ans}.`
      };
    }
  },
  {
    id: 'fd-multfrac',
    level: 6.2,
    make: (r) => {
      const whole = pick(r, [6, 8, 9, 12]);
      const d = whole % 3 === 0 ? 3 : 4;
      const n = 2;
      const ans = (whole / d) * n;
      return {
        prompt: `A recipe makes ${whole} jars of salve. Grandma only wants to make ${n}/${d} of the recipe. How many jars will that make?`,
        ...choiceSet(r, ans, [
          { v: whole / d, why: 'That is only ONE of the parts. The recipe is cut into ' + d + ' parts and she is making ' + n + ' of them.' },
          { v: whole * d, why: 'That multiplies by the bottom number, which makes it much bigger. Taking a fraction OF something makes it smaller.' },
          { v: whole - d, why: 'That subtracts. "2/3 of" means multiply — split into equal parts, then take that many parts.' }
        ]),
        explanation: `${n}/${d} of ${whole}: split ${whole} into ${d} parts (${whole / d} each), then count ${n} of those parts = ${ans}.`
      };
    }
  }
];

// ===========================================================================
// MEASUREMENT & DATA
// ===========================================================================
const measurementTemplates = [
  {
    id: 'md-time',
    level: 2.3,
    make: (r) => {
      const h = int(r, 1, 11);
      const m = pick(r, [15, 30, 45]);
      const label = m === 15 ? 'quarter past' : m === 30 ? 'half past' : 'quarter to';
      const shown = m === 45 ? `${h}:45` : `${h}:${m}`;
      const correct = m === 45 ? `quarter to ${h + 1}` : `${label} ${h}`;
      return {
        prompt: `Grandma's tea timer says ${shown}. How would you say that time out loud?`,
        ...choiceSet(r, correct, [
          { v: `${h} o'clock`, why: "O'clock only works when the minutes are at zero. Here the minute hand has moved past the top." },
          { v: `half past ${h + 1}`, why: 'Check both the hour and the minutes. Half past means 30 minutes exactly.' },
          { v: `quarter past ${h + 1}`, why: 'The hour is off by one. The hour is whichever number the hour hand has already passed.' }
        ]),
        explanation: `${shown} is ${correct}. A quarter of an hour is 15 minutes; half an hour is 30.`
      };
    }
  },
  {
    id: 'md-units',
    level: 3.0,
    make: (r) => {
      const herb = pick(r, HERBS);
      return {
        prompt: `Grandma wants to measure a small pinch of dried ${herb}. Which unit makes the most sense?`,
        ...choiceSet(r, 'grams', [
          { v: 'kilograms', why: 'A kilogram is about the weight of a big bag of sugar — far too big for a pinch of dried herb.' },
          { v: 'litres', why: 'Litres measure liquid, like water or oil. Dried herbs are weighed, not poured.' },
          { v: 'metres', why: 'Metres measure length, like how tall a plant is — not how heavy something is.' }
        ]),
        explanation: 'Grams measure small weights. Kilograms are for heavy things, litres for liquids, metres for length.'
      };
    }
  },
  {
    id: 'md-elapsed',
    level: 3.6,
    make: (r) => {
      const startH = int(r, 1, 9);
      const startM = pick(r, [10, 20, 40, 50]);
      const mins = pick(r, [25, 35, 45, 50]);
      const total = startM + mins;
      const endH = startH + Math.floor(total / 60);
      const endM = total % 60;
      const pad = (n) => String(n).padStart(2, '0');
      return {
        prompt: `Grandma puts chamomile in the dehydrator at ${startH}:${pad(startM)} and it needs ${mins} minutes. What time will it be done?`,
        ...choiceSet(r, `${endH}:${pad(endM)}`, [
          { v: `${startH}:${pad((startM + mins) % 100)}`, why: 'An hour has 60 minutes, not 100. Once the minutes pass 60, roll over into the next hour.' },
          { v: `${startH + 1}:${pad(startM)}`, why: `That adds a whole hour. Only ${mins} minutes were added, not 60.` },
          { v: `${endH}:${pad(Math.abs(endM - 10))}`, why: 'Close — recount the minutes. Add the minutes first, then carry into the hour if you go past 60.' }
        ]),
        explanation: `${pad(startM)} + ${mins} = ${total} minutes. That is ${Math.floor(total / 60)} hour(s) and ${endM} minutes, so ${endH}:${pad(endM)}.`
      };
    }
  },
  {
    id: 'md-convert',
    level: 4.2,
    make: (r) => {
      const kg = int(r, 2, 9);
      return {
        prompt: `Grandma harvested ${kg} kilograms of nettle. How many grams is that?`,
        ...choiceSet(r, kg * 1000, [
          { v: kg * 100, why: 'That converts by 100. There are 1,000 grams in a kilogram — the "kilo" part means one thousand.' },
          { v: kg * 10, why: 'That is far too small. A kilogram is 1,000 grams.' },
          { v: kg / 1000, why: 'That divides. Going from a BIG unit to a small one makes the number bigger, so multiply.' }
        ]),
        explanation: `1 kilogram = 1,000 grams, so ${kg} kg = ${kg * 1000} g.`
      };
    }
  },
  {
    id: 'md-bargraph',
    level: 4.9,
    make: (r) => {
      const a = int(r, 6, 14);
      const b = int(r, 15, 24);
      const c = int(r, 3, 5);
      return {
        prompt: `Grandma's harvest chart shows:  chamomile ${a} jars · peppermint ${b} jars · sage ${c} jars.  How many MORE jars of peppermint than sage did she harvest?`,
        ...choiceSet(r, b - c, [
          { v: b + c, why: '"How many more" is a comparison, so it subtracts. Adding tells you the total of the two, not the gap between them.' },
          { v: a - c, why: 'That compares the wrong two bars. Read the question again: peppermint compared with sage.' },
          { v: b, why: 'That is just the peppermint bar. The question asks for the DIFFERENCE between two bars.' }
        ]),
        explanation: `${b} − ${c} = ${b - c}. "How many more" means find the difference.`
      };
    }
  },
  {
    id: 'md-volume',
    level: 5.5,
    make: (r) => {
      const mlPerJar = pick(r, [125, 150, 250, 375]);
      const jars = int(r, 3, 6);
      const total = mlPerJar * jars;
      return {
        prompt: `Grandma pours ${mlPerJar} mL of elderberry syrup into each of ${jars} bottles. How many LITRES of syrup is that in total?`,
        ...choiceSet(r, `${(total / 1000).toFixed(3).replace(/0+$/, '').replace(/\.$/, '')} L`, [
          { v: `${total} L`, why: 'Those are millilitres, not litres. Divide by 1,000 at the end to turn mL into L.' },
          { v: `${(total / 100).toFixed(2)} L`, why: 'That divides by 100. There are 1,000 millilitres in a litre.' },
          { v: `${(mlPerJar / 1000).toFixed(3)} L`, why: 'That is only one bottle. Multiply by the number of bottles first, then convert.' }
        ]),
        explanation: `${mlPerJar} × ${jars} = ${total} mL, and ${total} ÷ 1000 = ${total / 1000} L.`
      };
    }
  },
  {
    id: 'md-mean',
    level: 6.0,
    make: (r) => {
      const base = int(r, 5, 12);
      const vals = [base, base + 3, base - 2, base + 7];
      const sum = vals.reduce((x, y) => x + y, 0);
      const mean = sum / 4;
      return {
        prompt: `Over four weeks Grandma harvested ${vals.join(', ')} bunches of thyme. What was the AVERAGE number of bunches per week?`,
        ...choiceSet(r, mean % 1 === 0 ? mean : mean.toFixed(2), [
          { v: sum, why: 'That is the total for all four weeks. An average shares that total out evenly, so divide by how many weeks there were.' },
          { v: Math.max(...vals), why: 'That is the biggest week. An average sits somewhere in the middle of all the numbers.' },
          { v: (sum / 3).toFixed(2), why: 'Divided by the wrong number. There are four weeks, so divide by 4.' }
        ]),
        explanation: `Add them: ${sum}. Divide by how many: ${sum} ÷ 4 = ${mean}.`
      };
    }
  }
];

// ===========================================================================
// GEOMETRY
// ===========================================================================
const geometryTemplates = [
  {
    id: 'ge-sides',
    level: 2.4,
    make: (r) => {
      const shapes = [
        ['hexagon', 6, 'pentagon', 5],
        ['pentagon', 5, 'hexagon', 6],
        ['octagon', 8, 'hexagon', 6]
      ];
      const [name, sides, other, otherSides] = pick(r, shapes);
      return {
        prompt: `Grandma's herb bed is shaped like a ${name}. How many sides does it have?`,
        ...choiceSet(r, sides, [
          { v: otherSides, why: `That is how many sides a ${other} has. Count the straight edges of a ${name}.` },
          { v: sides - 1, why: 'One side short — it is easy to miss one when counting round. Start at a corner and go all the way back to it.' },
          { v: 4, why: 'Four sides makes a square or rectangle. This shape has more.' }
        ]),
        explanation: `A ${name} has ${sides} sides.`
      };
    }
  },
  {
    id: 'ge-perim',
    level: 3.1,
    make: (r) => {
      const w = int(r, 3, 9);
      const h = int(r, 3, 9);
      return {
        prompt: `Grandma's herb bed is ${w} feet wide and ${h} feet long. She wants to put a fence all the way around it. How many feet of fence does she need?`,
        ...choiceSet(r, 2 * (w + h), [
          { v: w * h, why: 'That is the AREA — how much ground the bed covers. A fence goes around the edge, so add up all four sides.' },
          { v: w + h, why: 'That is only two sides. A rectangle has four — two of each length.' },
          { v: 2 * (w + h) + 2, why: 'A little too much. Add the four sides exactly: width + length + width + length.' }
        ]),
        explanation: `Perimeter = ${w} + ${h} + ${w} + ${h} = ${2 * (w + h)} feet.`
      };
    }
  },
  {
    id: 'ge-area',
    level: 3.7,
    make: (r) => {
      const w = int(r, 4, 12);
      const h = int(r, 3, 9);
      return {
        prompt: `A rectangular drying tray is ${w} inches by ${h} inches. What is its AREA?`,
        ...choiceSet(r, `${w * h} square inches`, [
          { v: `${2 * (w + h)} square inches`, why: 'That is the perimeter — the distance around the edge. Area is how much surface is inside.' },
          { v: `${w + h} square inches`, why: 'That adds the two sides. Area multiplies length by width.' },
          { v: `${w * h} inches`, why: 'The number is right but the unit is not. Area is measured in SQUARE units, because it covers a surface.' }
        ]),
        explanation: `Area = length × width = ${w} × ${h} = ${w * h} square inches.`
      };
    }
  },
  {
    id: 'ge-angles',
    level: 4.3,
    make: (r) => {
      const opts = [
        [int(r, 20, 80), 'acute', 'less than 90°'],
        [int(r, 100, 170), 'obtuse', 'more than 90° but less than 180°'],
        [90, 'right', 'exactly 90°']
      ];
      const [deg, name, desc] = pick(r, opts);
      return {
        prompt: `Two stems on a rosemary plant meet at an angle of ${deg}°. What kind of angle is that?`,
        ...choiceSet(r, `${name} angle`, [
          { v: 'straight angle', why: 'A straight angle is exactly 180° — a flat line. This one is not flat.' },
          { v: name === 'acute' ? 'obtuse angle' : 'acute angle', why: name === 'acute' ? 'Obtuse angles are WIDER than a corner of a square (more than 90°). This one is narrower.' : 'Acute angles are NARROWER than a square corner (less than 90°). This one is wider.' },
          { v: name === 'right' ? 'acute angle' : 'right angle', why: 'A right angle is exactly 90° — the corner of a square or a book. This one is not.' }
        ]),
        explanation: `${deg}° is ${desc}, which makes it a ${name} angle.`
      };
    }
  },
  {
    id: 'ge-symmetry',
    level: 5.0,
    make: (r) => {
      const shapes = [
        ['square', 4],
        ['rectangle', 2],
        ['equilateral triangle', 3]
      ];
      const [name, lines] = pick(r, shapes);
      return {
        prompt: `Grandma cuts a ${name} out of paper to label a jar. How many lines of symmetry does a ${name} have?`,
        ...choiceSet(r, lines, [
          { v: 1, why: 'There is more than one. Try folding it a different way — every fold where the two halves match exactly is a line of symmetry.' },
          { v: lines + 2, why: 'Too many. A fold only counts if the two halves land exactly on top of each other.' },
          { v: 0, why: 'This shape does have symmetry. Fold it down the middle and the halves match.' }
        ]),
        explanation: `A ${name} has ${lines} line${lines === 1 ? '' : 's'} of symmetry — ${lines} ways to fold it so the halves match exactly.`
      };
    }
  },
  {
    id: 'ge-triangle',
    level: 5.7,
    make: (r) => {
      const b = pick(r, [6, 8, 10, 12]);
      const h = pick(r, [5, 7, 9, 11]);
      const area = (b * h) / 2;
      return {
        prompt: `A triangular corner of the herb garden has a base of ${b} feet and a height of ${h} feet. What is its area?`,
        ...choiceSet(r, `${area} square feet`, [
          { v: `${b * h} square feet`, why: 'That is the area of a RECTANGLE with those measurements. A triangle is exactly half of that rectangle, so halve it.' },
          { v: `${b + h} square feet`, why: 'That adds the two measurements. Area multiplies base by height, then halves it.' },
          { v: `${(b + h) / 2} square feet`, why: 'The halving is right but it was applied to the wrong thing. Multiply base × height FIRST, then take half.' }
        ]),
        explanation: `Area of a triangle = (base × height) ÷ 2 = (${b} × ${h}) ÷ 2 = ${area} square feet.`
      };
    }
  },
  {
    id: 'ge-prism',
    level: 6.1,
    make: (r) => {
      const l = int(r, 4, 9);
      const w = int(r, 3, 7);
      const h = int(r, 2, 6);
      return {
        prompt: `A storage box for dried herbs is ${l} inches long, ${w} inches wide and ${h} inches tall. What is its VOLUME?`,
        ...choiceSet(r, `${l * w * h} cubic inches`, [
          { v: `${l * w} cubic inches`, why: 'That is only the bottom of the box. Volume needs all three measurements, including how tall it is.' },
          { v: `${l + w + h} cubic inches`, why: 'That adds them. Volume multiplies length × width × height.' },
          { v: `${l * w * h} square inches`, why: 'The number is right, the unit is not. Volume fills a space, so it is measured in CUBIC units.' }
        ]),
        explanation: `Volume = length × width × height = ${l} × ${w} × ${h} = ${l * w * h} cubic inches.`
      };
    }
  }
];

// ===========================================================================
// PATTERNS & EARLY ALGEBRA
// ===========================================================================
const patternTemplates = [
  {
    id: 'pa-pattern',
    level: 2.4,
    make: (r) => {
      const start = int(r, 2, 8);
      const step = pick(r, [2, 3, 5, 10]);
      const seq = [start, start + step, start + 2 * step, start + 3 * step];
      const next = start + 4 * step;
      return {
        prompt: `Grandma plants seeds in a pattern: ${seq.join(', ')}, ___ . What number comes next?`,
        ...choiceSet(r, next, [
          { v: next + step, why: 'That skips one. Work out the jump between two numbers next to each other, then add exactly one jump.' },
          { v: seq[3] + 1, why: 'The pattern does not go up by one. Find the gap between the numbers first.' },
          { v: seq[3] - step, why: 'That goes backwards. The numbers are getting bigger each time.' }
        ]),
        explanation: `The pattern adds ${step} each time, so ${seq[3]} + ${step} = ${next}.`
      };
    }
  },
  {
    id: 'pa-missadd',
    level: 3.0,
    make: (r) => {
      const total = int(r, 30, 60);
      const known = int(r, 12, 25);
      return {
        prompt: `Grandma needs ${total} sprigs of thyme in all. She has already picked ${known}. How many more does she need?`,
        ...choiceSet(r, total - known, [
          { v: total + known, why: 'That adds. She already has some, so the number still needed is smaller than the total.' },
          { v: known, why: 'That is what she already has, not what is missing.' },
          { v: total, why: 'That is the whole amount she needs. Take away what she has already picked.' }
        ]),
        explanation: `${known} + ___ = ${total}, so ___ = ${total} − ${known} = ${total - known}.`
      };
    }
  },
  {
    id: 'pa-rule',
    level: 3.6,
    make: (r) => {
      const mult = int(r, 3, 6);
      const ins = [1, 2, 3, 4];
      const outs = ins.map((i) => i * mult);
      return {
        prompt: `Every tea bag holds the same number of leaves. 1 bag → ${outs[0]} leaves. 2 bags → ${outs[1]}. 3 bags → ${outs[2]}. How many leaves in ${ins[3]} bags?`,
        ...choiceSet(r, outs[3], [
          { v: outs[2] + 1, why: 'The rule is not "add one". Look at the jump between each row — it is the same jump every time.' },
          { v: ins[3] + mult, why: 'That adds the rule instead of multiplying by it. Each bag holds ' + mult + ' leaves, so 4 bags holds 4 lots of ' + mult + '.' },
          { v: outs[3] + mult, why: 'That is one bag too many. Count the bags again.' }
        ]),
        explanation: `The rule is × ${mult}. So ${ins[3]} × ${mult} = ${outs[3]}.`
      };
    }
  },
  {
    id: 'pa-missfactor',
    level: 4.2,
    make: (r) => {
      const per = int(r, 6, 12);
      const groups = int(r, 4, 9);
      const total = per * groups;
      return {
        prompt: `Grandma packs ${total} rose hips into bags with ${per} in each bag. How many bags does she fill?  ${per} × ___ = ${total}`,
        ...choiceSet(r, groups, [
          { v: total - per, why: 'That subtracts. The question asks how many equal GROUPS fit, which is division.' },
          { v: total * per, why: 'That multiplies, giving a number far bigger than the total. The answer has to be smaller than the total.' },
          { v: groups + 1, why: 'One bag too many — that would need more rose hips than she has. Check by multiplying back.' }
        ]),
        explanation: `${total} ÷ ${per} = ${groups}, so ${per} × ${groups} = ${total}.`
      };
    }
  },
  {
    id: 'pa-twostep',
    level: 4.9,
    make: (r) => {
      const start = int(r, 30, 60);
      const per = int(r, 4, 8);
      const bags = int(r, 3, 6);
      const answer = start - per * bags;
      return {
        prompt: `Grandma starts with ${start} dried calendula flowers. She fills ${bags} bags with ${per} flowers in each. How many flowers are left over?`,
        ...choiceSet(r, answer, [
          { v: start - per, why: 'That only fills one bag. She filled ' + bags + ', so multiply first, then subtract.' },
          { v: start - bags, why: 'That takes away the number of BAGS, not the number of flowers those bags used up.' },
          { v: per * bags, why: 'That is how many flowers went INTO the bags. The question asks how many are left over.' }
        ]),
        explanation: `First the flowers used: ${per} × ${bags} = ${per * bags}. Then what is left: ${start} − ${per * bags} = ${answer}.`
      };
    }
  },
  {
    id: 'pa-express',
    level: 5.6,
    make: (r) => {
      const per = int(r, 3, 7);
      const extra = int(r, 2, 9);
      return {
        prompt: `Each jar holds ${per} ounces of dried herb. Grandma also has ${extra} loose ounces on the shelf. Let j stand for the number of jars. Which expression shows the total?`,
        ...choiceSet(r, `${per}j + ${extra}`, [
          { v: `${per} + j + ${extra}`, why: 'Each jar holds ' + per + ' ounces, so the jars part multiplies: ' + per + ' times j, not ' + per + ' plus j.' },
          { v: `${per}(j + ${extra})`, why: 'The brackets multiply the loose ounces by ' + per + ' too. Those ' + extra + ' ounces are not in jars, so they are just added on at the end.' },
          { v: `j + ${extra}`, why: 'That counts each jar as one ounce. Every jar holds ' + per + ' ounces.' }
        ]),
        explanation: `${per} ounces per jar × j jars = ${per}j, plus the ${extra} loose ounces = ${per}j + ${extra}.`
      };
    }
  },
  {
    id: 'pa-solve',
    level: 6.2,
    make: (r) => {
      const coef = int(r, 3, 7);
      const x = int(r, 4, 12);
      const add = int(r, 5, 15);
      const total = coef * x + add;
      return {
        prompt: `Grandma has ${total} ounces of herbs. That is ${add} loose ounces plus ${coef} equal jars. How many ounces are in each jar?  ${coef}x + ${add} = ${total}`,
        ...choiceSet(r, x, [
          { v: total - add, why: 'That subtracts but stops too early. After taking off the ' + add + ' loose ounces you still have to share the rest between the ' + coef + ' jars.' },
          { v: Math.round(total / coef), why: 'The loose ounces got divided up too. Subtract the ' + add + ' first, THEN divide.' },
          { v: x + 1, why: 'Close. Put your answer back into the equation and check that it really makes ' + total + '.' }
        ]),
        explanation: `Subtract first: ${total} − ${add} = ${coef * x}. Then divide: ${coef * x} ÷ ${coef} = ${x}.`
      };
    }
  }
];

export const mathItems = [
  ...materialise(numbersTemplates, 'numbers-operations'),
  ...materialise(fractionTemplates, 'fractions-decimals'),
  ...materialise(measurementTemplates, 'measurement-data'),
  ...materialise(geometryTemplates, 'geometry'),
  ...materialise(patternTemplates, 'patterns-algebra')
];
