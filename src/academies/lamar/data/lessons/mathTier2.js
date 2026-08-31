// ---------------------------------------------------------------------------
// Math lessons — Tier 2 (Systems Cadet). Builds directly on Tier 1
// pre-algebra (one/two-step equations) and ratios (proportions).
// ---------------------------------------------------------------------------

export const mathLessonsTier2 = [
  {
    id: 'm7-expressions-1',
    subject: 'math',
    tier: 2,
    title: 'Expressions & Inequalities',
    theme: 'Evaluating expressions and solving inequalities, one step beyond equations',
    novaIntro: {
      concept: 'An algebraic expression is a math phrase with a variable, like 3x + 5. To evaluate it, substitute the given value for the variable and follow order of operations. An inequality (like x > 4) describes a range of possible values rather than one exact answer.',
      example: 'Evaluate 3x + 5 when x = 4: 3(4) + 5 = 12 + 5 = 17.',
      connection: 'Engineering formulas are almost always written as expressions with variables — plugging in real measurements to evaluate them is something engineers do dozens of times on any given project.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Evaluate: 3(x + 4) − 2x, when x = 5',
        answer: '17',
        explanation: '3(5 + 4) − 2(5) = 3(9) − 10 = 27 − 10 = 17.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Solve the inequality x + 6 > 15. What is the smallest whole number value of x that works?',
        answer: '10',
        explanation: 'x > 9, so the smallest whole number greater than 9 is 10.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'Solve the inequality 2x − 3 ≤ 11. What is the greatest whole number value of x that works?',
        answer: '7',
        explanation: '2x ≤ 14, so x ≤ 7. The greatest whole number is 7.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'Simplify and evaluate: 4x − (2x + 5), when x = 8',
        answer: '11',
        explanation: '4x − 2x − 5 = 2x − 5. When x = 8: 2(8) − 5 = 16 − 5 = 11.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-statistics-1',
    subject: 'math',
    tier: 2,
    title: 'Mission Data Statistics',
    theme: 'Mean, median, mode, and range from flight test data',
    novaIntro: {
      concept: 'Mean, median, and mode are three different ways to describe the "typical" value in a data set. Mean is the average (sum divided by count). Median is the middle value when sorted. Mode is the most frequent value.',
      example: 'Data: 4, 8, 6, 8, 10. Mean = (4+8+6+8+10)/5 = 7.2. Sorted: 4,6,8,8,10 — median = 8. Mode = 8 (appears twice).',
      connection: 'Engineers use these measures to summarize test results — like the average thrust across ten engine tests, or the most common failure point across a batch of parts.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Launch speeds (m/s) for 5 test flights: 120, 135, 128, 142, 130. What is the mean?',
        answer: '131',
        explanation: '(120+135+128+142+130) ÷ 5 = 655 ÷ 5 = 131.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Using the same speeds — 120, 135, 128, 142, 130 — what is the median?',
        answer: '130',
        explanation: 'Sorted: 120, 128, 130, 135, 142. The middle value is 130.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'A sensor logs these readings: 12, 15, 12, 18, 12, 20. What is the mode?',
        answer: '12',
        explanation: '12 appears three times, more than any other value.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'Five pressure readings are 45, 60, 55, 80, 40. What is the range?',
        answer: '40',
        explanation: 'Range = max − min = 80 − 40 = 40.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-probability-1',
    subject: 'math',
    tier: 2,
    title: 'Mission Probability',
    theme: 'Simple probability for parts inspection and launch scheduling',
    novaIntro: {
      concept: 'Probability measures how likely an event is, written as a fraction: favorable outcomes divided by total possible outcomes.',
      example: 'A 6-sided die: probability of rolling a 4 is 1/6 (one favorable outcome out of six possible).',
      connection: 'Engineers calculate probability constantly when assessing risk — like the probability a component fails during a mission, which directly informs how much redundancy a design needs.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt:
          'A parts bin has 8 good components and 2 defective ones. What is the probability of picking a defective one at random? (Answer as a fraction, like 1/5)',
        answer: '1/5',
        explanation: '2 defective out of 10 total = 2/10 = 1/5.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt:
          'A launch window has 6 equally likely time slots, and only 1 is optimal. What is the probability the optimal slot is picked at random?',
        answer: '1/6',
        explanation: '1 optimal slot out of 6 total = 1/6.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt:
          'A 6-sided die is used to simulate a system check. What is the probability of rolling an even number?',
        answer: '1/2',
        explanation: '3 even numbers (2, 4, 6) out of 6 = 3/6 = 1/2.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt:
          'A bin has 5 red wires and 3 blue wires. What is the probability of picking a blue wire at random?',
        answer: '3/8',
        explanation: '3 blue out of 8 total wires = 3/8.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-statistics-2',
    subject: 'math',
    tier: 2,
    title: 'Advanced Mission Data',
    theme: 'More mean, median, mode, and range practice',
    novaIntro: {
      concept: 'This continues practice with mean, median, and mode using different data sets, reinforcing that each measure can tell a different story about the same data.',
      example: 'Data: 15, 22, 18, 30, 25. Mean = 110/5 = 22. Sorted: 15,18,22,25,30 — median = 22.',
      connection: 'Comparing mean and median on the same data set can reveal whether a few extreme results are skewing the average — a useful check before trusting a single summary number.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Five readings: 15, 22, 18, 30, 25. What is the mean?',
        answer: '22',
        explanation: '(15+22+18+30+25) ÷ 5 = 110 ÷ 5 = 22.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Using the same readings — 15, 22, 18, 30, 25 — what is the median?',
        answer: '22',
        explanation: 'Sorted: 15, 18, 22, 25, 30. The middle value is 22.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'A sensor logs: 8, 12, 8, 15, 8, 20. What is the mode?',
        answer: '8',
        explanation: '8 appears three times, more than any other value.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'Five readings are 55, 40, 70, 35, 60. What is the range?',
        answer: '35',
        explanation: 'Range = max − min = 70 − 35 = 35.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-probability-2',
    subject: 'math',
    tier: 2,
    title: 'Compound Mission Probability',
    theme: 'More probability practice, including simple compound events',
    novaIntro: {
      concept: 'More probability practice, including situations with more than one favorable outcome out of the total.',
      example: 'A bin has 4 red and 6 blue parts. Probability of picking red: 4/10 = 2/5.',
      connection: 'Quality control sampling uses exactly this kind of probability — if 2 out of 100 parts in a batch are defective, that ratio tells engineers the probability any one part they pick will be faulty.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'A 6-sided die is rolled once. What is the probability of rolling a number greater than 4?',
        answer: '1/3',
        explanation: 'Numbers greater than 4 are 5 and 6 — that\'s 2 out of 6 = 2/6 = 1/3.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'A bin has 4 red components and 6 blue components. What is the probability of picking red at random?',
        answer: '2/5',
        explanation: '4 out of 10 total = 4/10 = 2/5.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'Two fair coins are flipped. What is the probability both land on heads?',
        answer: '1/4',
        explanation: 'Each coin has a 1/2 chance of heads: 1/2 × 1/2 = 1/4.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'A spinner has 8 equal sections, and 3 are labeled "GO." What is the probability of landing on GO?',
        answer: '3/8',
        explanation: '3 out of 8 equally likely sections = 3/8.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-expressions-2',
    subject: 'math',
    tier: 2,
    title: 'Expressions & Inequalities II',
    theme: 'More practice evaluating expressions and solving inequalities',
    novaIntro: {
      concept: 'More expression evaluation, plus solving simple inequalities — finding all values of a variable that make an inequality true, using the same steps as solving an equation.',
      example: 'Solve 3x − 2 > 10: add 2 (3x > 12), then divide by 3 (x > 4).',
      connection: 'Safety margins in engineering are almost always expressed as inequalities — like "stress must stay under 500 psi" — and solving for the boundary tells engineers exactly where the safe range ends.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Evaluate: 2(x − 3) + 5, when x = 7',
        answer: '13',
        explanation: '2(7 − 3) + 5 = 2(4) + 5 = 8 + 5 = 13.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Simplify and evaluate: 5x − 2x + 4, when x = 6',
        answer: '22',
        explanation: '5x − 2x = 3x. When x = 6: 3(6) + 4 = 18 + 4 = 22.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'Solve the inequality 3x − 2 > 10. What is the smallest integer value of x that works?',
        answer: '5',
        explanation: '3x > 12 → x > 4. The smallest integer greater than 4 is 5.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'Evaluate: 4(x + 2) − 3x, when x = 5',
        answer: '13',
        explanation: '4x + 8 − 3x = x + 8. When x = 5: 5 + 8 = 13.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-statistics-3',
    subject: 'math',
    tier: 2,
    title: 'Data Displays & Larger Data Sets',
    theme: 'Mean, median, mode, and range with larger data sets',
    novaIntro: {
      concept: 'This applies mean, median, mode, and range (the difference between the highest and lowest value) to larger data sets, where sorting carefully matters more.',
      example: 'Data: 55, 40, 70, 35, 60. Range = 70 − 35 = 35.',
      connection: 'Range tells engineers how spread out a set of measurements is — a small range across repeated tests suggests a reliable, consistent system; a large range signals something worth investigating.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Six readings: 10, 14, 12, 18, 16, 20. What is the mean?',
        answer: '15',
        explanation: '(10+14+12+18+16+20) ÷ 6 = 90 ÷ 6 = 15.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Using the same readings — 10, 14, 12, 18, 16, 20 — what is the median?',
        answer: '15',
        explanation: 'Sorted: 10, 12, 14, 16, 18, 20. With 6 values, the median is the average of the middle two: (14+16) ÷ 2 = 15.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'Data: 25, 30, 25, 40, 25, 50. What is the mode?',
        answer: '25',
        explanation: '25 appears three times, more than any other value.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'Data: 100, 85, 120, 95, 110. What is the range?',
        answer: '35',
        explanation: 'Range = max − min = 120 − 85 = 35.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-probability-3',
    subject: 'math',
    tier: 2,
    title: 'Compound Independent Events',
    theme: 'Probability of two independent events both happening',
    novaIntro: {
      concept: 'When two events happen one after another, multiply their individual probabilities together to find the probability both happen.',
      example: 'Two coins flipped: probability both land heads = 1/2 × 1/2 = 1/4.',
      connection: 'Calculating the probability that two independent systems both fail at once — important for understanding overall mission risk — uses exactly this kind of multiplication.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt:
          'A bag has 4 red and 6 blue marbles. If you pick one, replace it, then pick again, what is the probability both are red?',
        answer: '4/25',
        explanation: '(4/10) × (4/10) = 16/100 = 4/25.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Rolling two dice, what is the probability of getting a 6 on both?',
        answer: '1/36',
        explanation: '(1/6) × (1/6) = 1/36.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'A spinner has 4 equal sections numbered 1-4. Spinning twice, what is the probability of landing on 4 both times?',
        answer: '1/16',
        explanation: '(1/4) × (1/4) = 1/16.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'A coin is flipped 3 times. What is the probability of getting heads all three times?',
        answer: '1/8',
        explanation: '(1/2) × (1/2) × (1/2) = 1/8.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-statistics-4',
    subject: 'math',
    tier: 2,
    title: 'Weighted Averages',
    theme: 'Computing weighted averages, used for grading and scoring systems',
    novaIntro: {
      concept: 'A weighted average gives different amounts of importance to different values, rather than treating them all equally. Multiply each value by its weight (as a decimal), then add the results.',
      example: 'Test 1 (30% weight): 80. Test 2 (70% weight): 90. Weighted average = 80(0.30) + 90(0.70) = 24 + 63 = 87.',
      connection: 'Overall project scores or performance ratings often weight different factors differently — like weighting safety test results more heavily than cost, since safety matters more to the final decision.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: "A student's test scores are weighted: Test 1 (30%): 80, Test 2 (70%): 90. What is the weighted average?",
        answer: '87',
        explanation: '80 × 0.30 + 90 × 0.70 = 24 + 63 = 87.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: "A product's rating is based on 60% performance score of 85 and 40% price score of 70. What is the weighted score?",
        answer: '79',
        explanation: '85 × 0.60 + 70 × 0.40 = 51 + 28 = 79.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'Data: 4, 8, 15, 16, 23, 42. What is the mean?',
        answer: '18',
        explanation: '(4+8+15+16+23+42) ÷ 6 = 108 ÷ 6 = 18.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'Using the same data — 4, 8, 15, 16, 23, 42 — what is the median?',
        answer: '15.5',
        explanation: 'With 6 sorted values, the median is the average of the middle two: (15+16) ÷ 2 = 15.5.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-probability-4',
    subject: 'math',
    tier: 2,
    title: 'Counting Outcomes',
    theme: 'Counting total possible outcomes using multiplication',
    novaIntro: {
      concept: 'When counting the total number of possible combinations from multiple independent choices, multiply the number of options at each step together.',
      example: '3 main dishes × 2 sides = 3 × 2 = 6 possible combinations.',
      connection: 'Engineers use this counting principle to calculate how many possible configurations a system has — like how many different settings a control panel with several independent switches could be in.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'A meal combo has 3 main dish choices and 2 side choices. How many different combos are possible?',
        answer: '6',
        explanation: '3 × 2 = 6 possible combinations.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'A password uses 2 digits, each from 0-9 (repeats allowed). How many different passwords are possible?',
        answer: '100',
        explanation: '10 × 10 = 100 possible passwords.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'A team must choose a president and a vice president from 5 people (different roles, no repeats). How many ways can this be done?',
        answer: '20',
        explanation: '5 choices for president × 4 remaining choices for vice president = 20.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'A spinner has 5 equal sections. Spinning it twice, how many total possible outcomes are there?',
        answer: '25',
        explanation: '5 × 5 = 25 total possible outcomes.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-expressions-3',
    subject: 'math',
    tier: 2,
    title: 'Combining Like Terms',
    theme: 'Simplifying expressions with multiple variable terms before evaluating',
    novaIntro: {
      concept: 'Combining like terms means adding or subtracting terms that have the same variable, simplifying an expression before evaluating it — which makes the arithmetic much easier.',
      example: 'Simplify 3x + 5y − x + 2y: combine x terms (3x − x = 2x) and y terms (5y + 2y = 7y), giving 2x + 7y.',
      connection: 'Long engineering formulas often have redundant terms that can be combined first — simplifying before calculating reduces the chance of an arithmetic mistake in a complex equation.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Evaluate: 3x + 5y − x + 2y, when x = 4 and y = 3',
        answer: '29',
        explanation: 'Combine like terms first: 2x + 7y. Then 2(4) + 7(3) = 8 + 21 = 29.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Evaluate: 2(3x − 1) + 4, when x = 5',
        answer: '32',
        explanation: '2(15 − 1) + 4 = 2(14) + 4 = 28 + 4 = 32.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'Solve the inequality 4x + 3 < 19. What is the largest integer value of x that works?',
        answer: '3',
        explanation: '4x < 16 → x < 4. The largest integer less than 4 is 3.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'Evaluate: 5(x + 3) − 2(x − 1), when x = 2',
        answer: '23',
        explanation: '5(5) − 2(1) = 25 − 2 = 23.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-statistics-5',
    subject: 'math',
    tier: 2,
    title: 'Outliers in Data',
    theme: 'Recognizing outliers and how they affect the mean versus the median',
    novaIntro: {
      concept: 'An outlier is a data point far away from the rest of the values. Outliers can significantly shift the mean (since it uses every value) while barely affecting the median (which only depends on the middle position).',
      example: 'Data: 12, 14, 13, 15, 50, 13 — 50 is an outlier, far from the rest.',
      connection: 'Spotting outliers in sensor data is critical — an unusually high or low reading might mean a real problem, or it might mean a faulty sensor. Either way, an engineer needs to notice it before trusting the average.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Data: 12, 14, 13, 15, 50, 13. Which value is an outlier (far from the rest of the data)?',
        answer: '50',
        explanation: '50 is far higher than every other value in the set, making it the outlier.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Excluding the outlier 50, what is the mean of 12, 14, 13, 15, 13?',
        answer: '13.4',
        explanation: '(12+14+13+15+13) ÷ 5 = 67 ÷ 5 = 13.4.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'Data: 20, 22, 21, 19, 85, 20. What is the median?',
        answer: '20.5',
        explanation: 'Sorted: 19, 20, 20, 21, 22, 85. With 6 values, median = (20+21) ÷ 2 = 20.5.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'Why might an outlier affect the mean more than the median?',
        choices: [
          'Because the mean uses every value in its calculation, so one extreme value shifts it, while the median only depends on the middle value(s)',
          'Because the median always ignores half the data',
          'Outliers never affect either measure',
          'The mean is always more accurate than the median'
        ],
        answer: 0,
        explanation: 'The mean sums every value, so one extreme number shifts it noticeably; the median only depends on the middle position(s), which an outlier usually doesn\u2019t change.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-probability-5',
    subject: 'math',
    tier: 2,
    title: 'Independent & Dependent Events',
    theme: 'Probability without replacement, and telling independent from dependent events',
    novaIntro: {
      concept: 'Events are independent if one doesn’t affect the other (like separate coin flips). Events are dependent if the outcome of one changes the probability of the next — like picking items from a bag without replacing them.',
      example: 'A bag has 3 red, 7 blue marbles. Picking red then blue, without replacement: 3/10 × 7/9 = 21/90 = 7/30.',
      connection: 'Reliability testing on backup systems depends on whether components fail independently or not — if one failure makes another more likely (a dependent relationship), the overall risk calculation is very different.'
    },
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'A bag has 5 red and 5 blue marbles. If you pick one without replacing it, then pick again, is the second pick independent or dependent on the first?',
        choices: ['Dependent', 'Independent', 'Neither', 'Both'],
        answer: 0,
        explanation: 'Without replacement, the marbles remaining change based on the first pick, making the second pick dependent.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'If you flip a coin and then roll a die, are the two events independent or dependent?',
        choices: ['Independent', 'Dependent', 'Neither', 'Both'],
        answer: 0,
        explanation: 'The coin flip has no effect on the die roll, so the events are independent.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'A bag has 3 red and 7 blue marbles. What is the probability of picking red, then blue, without replacement?',
        answer: '7/30',
        explanation: 'P(red) = 3/10. Then P(blue | red taken) = 7/9. 3/10 × 7/9 = 21/90 = 7/30.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'Using the same bag (3 red, 7 blue), what is the probability of picking two reds in a row, without replacement?',
        answer: '1/15',
        explanation: '3/10 × 2/9 = 6/90 = 1/15.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-expressions-4',
    subject: 'math',
    tier: 2,
    title: 'Distributive Property with Negatives',
    theme: 'Distributing negative coefficients before evaluating',
    novaIntro: {
      concept: 'When distributing a negative number across parentheses, every term inside flips its sign. This is one of the most common places to make a sign error, so it’s worth double-checking.',
      example: 'Evaluate -2(x − 4) when x = 3: -2(3 − 4) = -2(-1) = 2.',
      connection: 'Formulas involving loss, decrease, or opposing forces often include a negative coefficient — getting the sign right when distributing is the difference between a correct and an inverted result.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Evaluate: -2(x − 4), when x = 3',
        answer: '2',
        explanation: '-2(3 − 4) = -2(-1) = 2.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Evaluate: -3(2x + 5), when x = 1',
        answer: '-21',
        explanation: '-3(2 + 5) = -3(7) = -21.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'Evaluate: 4 − 2(x + 1), when x = 3',
        answer: '-4',
        explanation: '4 − 2(4) = 4 − 8 = -4.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'Evaluate: -(x − 6), when x = 2',
        answer: '4',
        explanation: '-(2 − 6) = -(-4) = 4.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-statistics-6',
    subject: 'math',
    tier: 2,
    title: 'Quartiles & Spread',
    theme: 'Dividing sorted data into quarters to measure spread',
    novaIntro: {
      concept: 'Quartiles divide sorted data into four equal parts. The median splits the data in half; the lower quartile is the median of the lower half, and the upper quartile is the median of the upper half. The interquartile range (upper minus lower quartile) measures the spread of the middle 50% of data.',
      example: 'Data: 2,4,6,8,10,12,14. Median = 8. Lower quartile (median of 2,4,6) = 4. Upper quartile (median of 10,12,14) = 12. IQR = 12 − 4 = 8.',
      connection: 'Quartiles help engineers understand the typical spread of test results while ignoring extreme outliers — useful when deciding whether a manufacturing process is consistent.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Data (sorted): 2, 4, 6, 8, 10, 12, 14. What is the median?',
        answer: '8',
        explanation: 'The middle value of 7 sorted numbers is 8.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Using the same data, what is the lower quartile (the median of the lower half: 2, 4, 6)?',
        answer: '4',
        explanation: 'The median of 2, 4, 6 is 4.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'Using the same data, what is the upper quartile (the median of the upper half: 10, 12, 14)?',
        answer: '12',
        explanation: 'The median of 10, 12, 14 is 12.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'What is the interquartile range (upper quartile minus lower quartile)?',
        answer: '8',
        explanation: '12 − 4 = 8.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-statistics-7',
    subject: 'math',
    tier: 2,
    title: 'Comparing Two Data Sets',
    theme: 'Using range to compare consistency between data sets with the same mean',
    novaIntro: {
      concept: 'Two data sets can have the same mean but very different consistency. Comparing their range (or spread) reveals which set is more reliable, even when the averages look identical.',
      example: 'Team A: 10,12,14,16,18 (mean 14, range 8). Team B: 8,13,14,15,20 (mean 14, range 12). Same mean, but Team A is more consistent.',
      connection: 'Two engines might have the same average thrust, but if one has much more variation between tests, it\'s the less predictable — and often less trustworthy — choice for a real mission.'
    },
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt:
          'Team A scores: 10, 12, 14, 16, 18 (mean 14). Team B scores: 8, 13, 14, 15, 20 (mean 14). Both teams average 14. Which team is more consistent (has a smaller range)?',
        choices: ['Team A', 'Team B', 'Equally consistent', 'Cannot be determined'],
        answer: 0,
        explanation: "Team A's range is 8; Team B's range is 12. A smaller range means Team A is more consistent.",
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: "What is Team A's range (10, 12, 14, 16, 18)?",
        answer: '8',
        explanation: '18 − 10 = 8.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: "What is Team B's range (8, 13, 14, 15, 20)?",
        answer: '12',
        explanation: '20 − 8 = 12.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: "What is the mean of Team A's scores (10, 12, 14, 16, 18)?",
        answer: '14',
        explanation: '(10+12+14+16+18) ÷ 5 = 70 ÷ 5 = 14.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-probability-6',
    subject: 'math',
    tier: 2,
    title: 'Probability with Spinners & Cards',
    theme: 'More probability practice with common scenarios',
    novaIntro: {
      concept: 'More probability practice with common scenarios — spinners, dice, and cards — applying the same basic formula: favorable outcomes divided by total possible outcomes.',
      example: 'A standard deck has 52 cards, 13 of each suit. Probability of drawing a heart: 13/52 = 1/4.',
      connection: 'Random sampling during quality inspection works the same way — if 1 in 4 parts checked is expected to need adjustment, that’s the same math as the probability of drawing a specific card.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'A spinner has 6 equal sections numbered 1-6. What is the probability of landing on an even number?',
        answer: '1/2',
        explanation: '3 of the 6 numbers (2, 4, 6) are even: 3/6 = 1/2.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'A standard deck has 52 cards, 13 of each suit. What is the probability of drawing a heart?',
        answer: '1/4',
        explanation: '13/52 = 1/4.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'A spinner has 8 equal sections, and 5 are blue. What is the probability of NOT landing on blue?',
        answer: '3/8',
        explanation: '(8 − 5)/8 = 3/8.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'A deck has 52 cards, 4 of which are aces. What is the probability of drawing an ace?',
        answer: '1/13',
        explanation: '4/52 = 1/13.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-probability-7',
    subject: 'math',
    tier: 2,
    title: 'Expected Value Basics',
    theme: 'Estimating the average outcome of a game or bet over time',
    novaIntro: {
      concept: 'Expected value estimates the average outcome of a repeated event over the long run — multiply each possible outcome by its probability, then add the results together.',
      example: 'A game wins $5 with probability 1/5, otherwise nothing. Expected winnings = 5 × (1/5) = $1.',
      connection: 'Engineers and project managers use expected value to decide whether a risky investment — like a new material that might fail but could save costs — is worth it on average over many uses.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'A game costs $1 to play. You win $5 with probability 1/5, otherwise nothing. What is the expected winnings (not counting the cost)?',
        answer: '1',
        explanation: '5 × (1/5) = 1.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'Using Q1, if the game costs $1 to play and expected winnings are $1, what does this mean for the player on average?',
        choices: [
          'Break-even on average (expected winnings equal the cost)',
          'Profitable for the player',
          'Losing for the player',
          'Cannot be determined'
        ],
        answer: 0,
        explanation: 'Since expected winnings ($1) equal the cost ($1), the game breaks even on average.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'A raffle sells 100 tickets for $2 each, with one prize of $150. What is the expected value of one ticket (winnings only, not counting cost)?',
        answer: '1.5',
        explanation: '150 × (1/100) = 1.5.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'Using Q3, if a ticket costs $2 and expected winnings are $1.50, is buying a ticket a good financial bet on average?',
        choices: [
          'No, on average you would expect to lose money',
          'Yes, it is very profitable',
          'Break-even exactly',
          'Cannot be determined'
        ],
        answer: 0,
        explanation: 'Expected winnings ($1.50) are less than the cost ($2), so on average a ticket loses money.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-systems-3',
    subject: 'math',
    tier: 2,
    title: 'System Word Problems',
    theme: 'Setting up and solving systems from real scenarios',
    novaIntro: {
      concept: 'A system of two equations can be solved by combining them cleverly — often by adding or subtracting the equations to eliminate one variable, leaving a simple one-variable equation to solve.',
      example: 'Two numbers: sum is 20, difference is 4. Adding the equations (x+y=20, x−y=4) eliminates y: 2x = 24, so x = 12.',
      connection: 'Real engineering problems often have two unknowns linked by two separate conditions — like solving for two different tank pressures given both their total and their difference — which is exactly a system of equations.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Two numbers add up to 20. Their difference is 4. What is the larger number?',
        answer: '12',
        explanation: 'x+y=20, x-y=4. Adding: 2x=24 → x=12.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Using the same two numbers, what is the smaller number?',
        answer: '8',
        explanation: '20 − 12 = 8.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: '2 adult tickets and 3 kid tickets cost $37 total. If an adult ticket is $8, what is the price of a kid ticket?',
        answer: '7',
        explanation: '2(8) + 3y = 37 → 16 + 3y = 37 → 3y = 21 → y = 7.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: '3 apples and 2 oranges cost $13 total. If an orange costs $2, what is the price of an apple?',
        answer: '3',
        explanation: '3x + 2(2) = 13 → 3x + 4 = 13 → 3x = 9 → x = 3.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-expressions-5',
    subject: 'math',
    tier: 2,
    title: 'Combining & Distributing',
    theme: 'Evaluating expressions that combine multiple distributed terms',
    novaIntro: {
      concept: 'More practice combining distribution and combining like terms in a single expression — distribute first, then combine any matching terms before evaluating.',
      example: 'Evaluate 3(x + 2) + 2(x − 1) when x = 4: 3(6) + 2(3) = 18 + 6 = 24.',
      connection: 'Complex engineering formulas often have several distributed terms — simplifying the whole expression before plugging in numbers reduces the chance of a calculation error.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Evaluate: 3(x + 2) + 2(x − 1), when x = 4',
        answer: '24',
        explanation: '3(6) + 2(3) = 18 + 6 = 24.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Evaluate: 5x − 3(x + 2), when x = 6',
        answer: '6',
        explanation: '5(6) − 3(8) = 30 − 24 = 6.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'Evaluate: -2(x − 3) + 4x, when x = 5',
        answer: '16',
        explanation: '-2(2) + 20 = -4 + 20 = 16.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'Evaluate: 2(3x − 1) − (x + 4), when x = 3',
        answer: '9',
        explanation: '2(8) − (7) = 16 − 7 = 9.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-statistics-8',
    subject: 'math',
    tier: 2,
    title: 'Reading Frequency Tables',
    theme: 'Interpreting data organized in a frequency table',
    novaIntro: {
      concept: 'A frequency table shows how many times each value or category appears in a data set. Reading one means adding up totals, finding fractions of the whole, and identifying the most common (mode) category.',
      example: 'Survey: 5 chose red, 8 blue, 3 green, 4 yellow. Total = 20. Fraction who chose blue = 8/20 = 2/5.',
      connection: 'Survey results, defect categories, and test outcome logs are usually organized in frequency tables — reading them accurately is a basic but essential data-analysis skill for any engineer.'
    },
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'A survey shows: 5 people chose red, 8 chose blue, 3 chose green, 4 chose yellow. How many people were surveyed in total?',
        answer: '20',
        explanation: '5 + 8 + 3 + 4 = 20.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Using the same data, what fraction of people chose blue?',
        answer: '2/5',
        explanation: '8/20 simplifies to 2/5.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'Using the same data, what is the mode (the most commonly chosen color)?',
        choices: ['Blue', 'Red', 'Green', 'Yellow'],
        answer: 0,
        explanation: 'Blue was chosen by the most people (8), making it the mode.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'How many more people chose blue than green?',
        answer: '5',
        explanation: '8 − 3 = 5.',
        xp: 10
      }
    ]
  }
];
