// ---------------------------------------------------------------------------
// Math lessons — Tier 3 (Flight Trainee). Builds on Tier 2 expressions/
// inequalities toward full linear-equation algebra and coordinate graphing.
// ---------------------------------------------------------------------------

export const mathLessonsTier3 = [
  {
    id: 'm7-algebra-1',
    subject: 'math',
    tier: 3,
    title: 'Multi-Step Trajectory Equations',
    theme: 'Solving equations with variables on both sides',
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Solve for x: 3x + 5 = x + 17',
        answer: '6',
        explanation: '3x − x = 17 − 5 → 2x = 12 → x = 6.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Solve for x: 5x − 4 = 2x + 11',
        answer: '5',
        explanation: '5x − 2x = 11 + 4 → 3x = 15 → x = 5.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'Solve for x: 2(x + 3) = 16',
        answer: '5',
        explanation: '2x + 6 = 16 → 2x = 10 → x = 5.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'Solve for x: 4x − 7 = 2x + 9',
        answer: '8',
        explanation: '4x − 2x = 9 + 7 → 2x = 16 → x = 8.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-graphing-1',
    subject: 'math',
    tier: 3,
    title: 'Coordinate Plane & Slope',
    theme: 'Plotting flight paths and reading slope on the coordinate plane',
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: "A rocket's tracked position is plotted at the point (3, 7). What is its y-coordinate?",
        answer: '7',
        explanation: 'In (x, y), the second number is the y-coordinate: 7.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'A flight path line passes through (0, 4) and (2, 10). What is the slope?',
        answer: '3',
        explanation: 'slope = (10 − 4) ÷ (2 − 0) = 6 ÷ 2 = 3.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'A line has a slope of 2 and a y-intercept of 5. What is y when x = 4?',
        answer: '13',
        explanation: 'y = 2x + 5 → y = 2(4) + 5 = 8 + 5 = 13.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'A line passes through (1, 2) and (4, 11). What is the slope?',
        answer: '3',
        explanation: 'slope = (11 − 2) ÷ (4 − 1) = 9 ÷ 3 = 3.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-algebra-2',
    subject: 'math',
    tier: 3,
    title: 'Complex Trajectory Equations',
    theme: 'More multi-step equations, including distribution on both sides',
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Solve for x: 2(x + 4) + 3x = 28',
        answer: '4',
        explanation: '2x + 8 + 3x = 28 → 5x + 8 = 28 → 5x = 20 → x = 4.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Solve for x: 5x − 3(x − 2) = 16',
        answer: '5',
        explanation: '5x − 3x + 6 = 16 → 2x + 6 = 16 → 2x = 10 → x = 5.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'Solve for x: 4(2x − 1) = 28',
        answer: '4',
        explanation: '8x − 4 = 28 → 8x = 32 → x = 4.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'Solve for x: 3x + 7 = 2(x + 9)',
        answer: '11',
        explanation: '3x + 7 = 2x + 18 → 3x − 2x = 18 − 7 → x = 11.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-graphing-2',
    subject: 'math',
    tier: 3,
    title: 'Linear Equations & Intercepts',
    theme: 'Reading and using slope-intercept form',
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'A line is given by y = 3x − 2. What is the y-intercept?',
        answer: '-2',
        explanation: 'In y = mx + b form, b is the y-intercept: here b = -2.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'For the line y = 3x − 2, what is y when x = 5?',
        answer: '13',
        explanation: 'y = 3(5) − 2 = 15 − 2 = 13.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'A line passes through (2, 7) with a slope of 4. What is y when x = 5?',
        answer: '19',
        explanation: 'y = 7 + 4(5 − 2) = 7 + 4(3) = 7 + 12 = 19.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'A line has the equation y = -2x + 10. What is the x-intercept (where y = 0)?',
        answer: '5',
        explanation: '0 = -2x + 10 → 2x = 10 → x = 5.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-systems-1',
    subject: 'math',
    tier: 3,
    title: 'Intro to Systems of Equations',
    theme: 'Solving two equations with two unknowns together',
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Solve the system: x + y = 10 and x − y = 2. What is x?',
        answer: '6',
        explanation: 'Adding the two equations: 2x = 12 → x = 6.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Using the same system — x + y = 10 and x − y = 2 — what is y?',
        answer: '4',
        explanation: 'Since x = 6, substitute into x + y = 10: 6 + y = 10 → y = 4.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'Solve the system: 2x + y = 13 and y = 3. What is x?',
        answer: '5',
        explanation: 'Substitute y = 3: 2x + 3 = 13 → 2x = 10 → x = 5.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'Solve the system: x = 2y and x + y = 12. What is x?',
        answer: '8',
        explanation: 'Substitute x = 2y into x + y = 12: 2y + y = 12 → 3y = 12 → y = 4, so x = 2(4) = 8.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-graphing-3',
    subject: 'math',
    tier: 3,
    title: 'Writing Equations from Two Points',
    theme: 'Finding slope and y-intercept from two given points',
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'A line passes through (0, 3) and (4, 11). What is its slope?',
        answer: '2',
        explanation: '(11 − 3) ÷ (4 − 0) = 8 ÷ 4 = 2.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Using the same points — (0, 3) and (4, 11) — what is the y-intercept?',
        answer: '3',
        explanation: 'Since the line passes through (0, 3), the y-intercept is 3.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'Using a slope of 2 and a y-intercept of 3, what is y when x = 10?',
        answer: '23',
        explanation: 'y = 2(10) + 3 = 20 + 3 = 23.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'A line passes through (2, 5) and (6, 13). What is its slope?',
        answer: '2',
        explanation: '(13 − 5) ÷ (6 − 2) = 8 ÷ 4 = 2.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-algebra-3',
    subject: 'math',
    tier: 3,
    title: 'Equations with Fractions',
    theme: 'Solving equations that include fractional terms',
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Solve for x: x/3 + 4 = 9',
        answer: '15',
        explanation: 'x/3 = 5 → x = 15.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Solve for x: (x + 2)/4 = 5',
        answer: '18',
        explanation: 'x + 2 = 20 → x = 18.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'Solve for x: 2x/5 = 8',
        answer: '20',
        explanation: '2x = 40 → x = 20.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'Solve for x: x/2 − 3 = x/4',
        answer: '12',
        explanation: 'Multiply both sides by 4: 2x − 12 = x → x = 12.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-systems-2',
    subject: 'math',
    tier: 3,
    title: 'More Systems of Equations',
    theme: 'Additional practice solving two equations together',
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Solve the system: 3x + 2y = 16 and x = 2. What is y?',
        answer: '5',
        explanation: '3(2) + 2y = 16 → 6 + 2y = 16 → 2y = 10 → y = 5.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Solve the system: x + y = 15 and x − y = 5. What is x?',
        answer: '10',
        explanation: 'Adding the two equations: 2x = 20 → x = 10.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'Using the same system — x + y = 15 and x − y = 5 — what is y?',
        answer: '5',
        explanation: 'Since x = 10, substitute into x + y = 15: 10 + y = 15 → y = 5.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'Solve the system: 4x − y = 10 and y = 2x. What is x?',
        answer: '5',
        explanation: 'Substitute y = 2x: 4x − 2x = 10 → 2x = 10 → x = 5.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-algebra-4',
    subject: 'math',
    tier: 3,
    title: 'Solving Formulas for a Variable',
    theme: 'Rearranging real engineering formulas to solve for a different variable',
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Solve for r in the formula C = 2πr, if C = 31.4 and π ≈ 3.14.',
        answer: '5',
        explanation: 'r = 31.4 ÷ (2 × 3.14) = 31.4 ÷ 6.28 = 5.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Solve for h in the formula V = lwh, if V = 120, l = 4, and w = 5.',
        answer: '6',
        explanation: 'h = 120 ÷ (4 × 5) = 120 ÷ 20 = 6.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'Solve for t in the formula d = rt, if d = 300 and r = 60.',
        answer: '5',
        explanation: 't = 300 ÷ 60 = 5.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'Solve for b in the formula A = ½bh, if A = 48 and h = 8.',
        answer: '12',
        explanation: '48 = ½ × b × 8 = 4b → b = 12.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-graphing-4',
    subject: 'math',
    tier: 3,
    title: 'Interpreting Motion Graphs',
    theme: 'Reading slope as a rate of change on a distance/altitude-vs-time graph',
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt:
          "A graph shows a rocket's altitude over time as a straight line from (0, 0) to (10, 500). What is the rate of ascent (slope), in meters per second?",
        answer: '50',
        explanation: '500 ÷ 10 = 50 meters per second.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Using the same line (slope of 50 m/s starting at 0), what altitude is reached at t = 6 seconds?',
        answer: '300',
        explanation: '50 × 6 = 300 meters.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: "A line on a graph has a slope of 0. What does this mean about the object's motion?",
        choices: ['It is not moving (constant position)', 'It is moving at constant speed', 'It is accelerating', 'It is decelerating'],
        answer: 0,
        explanation: 'A slope of 0 means no change in position over time — the object is stationary.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'Two parallel lines on a graph have the same ___.',
        choices: ['Slope', 'y-intercept', 'x-intercept', 'Length'],
        answer: 0,
        explanation: 'Parallel lines always share the same slope.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-graphing-5',
    subject: 'math',
    tier: 3,
    title: 'Direct Variation',
    theme: 'Finding and using the constant of variation between two quantities',
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'If y varies directly with x, and y = 12 when x = 3, what is the constant of variation (k)?',
        answer: '4',
        explanation: 'y = kx → 12 = k × 3 → k = 4.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Using k = 4, what is y when x = 7?',
        answer: '28',
        explanation: 'y = 4 × 7 = 28.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'A car travels at a constant speed, covering 150 miles in 3 hours. What is its speed (the constant of variation)?',
        answer: '50',
        explanation: '150 ÷ 3 = 50 mph.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'Using that speed (50 mph), how far would the car travel in 5 hours?',
        answer: '250',
        explanation: '50 × 5 = 250 miles.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-algebra-5',
    subject: 'math',
    tier: 3,
    title: 'Absolute Value Equations',
    theme: 'Solving equations involving absolute value',
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Solve: |x − 3| = 5. What is the positive solution for x?',
        answer: '8',
        explanation: 'x − 3 = 5 → x = 8 (the other solution is x = -2).',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Solve: |x + 2| = 6. What is the positive solution for x?',
        answer: '4',
        explanation: 'x + 2 = 6 → x = 4 (the other solution is x = -8).',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'Solve: |2x| = 10. What is the positive solution for x?',
        answer: '5',
        explanation: '2x = 10 → x = 5 (the other solution is x = -5).',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'Solve: |x − 5| = 5. What is the positive solution for x?',
        answer: '10',
        explanation: 'x − 5 = 5 → x = 10 (the other solution is x = 0).',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-algebra-6',
    subject: 'math',
    tier: 3,
    title: 'Multi-Step Equations with Distribution',
    theme: 'Combining distribution with variables on multiple terms',
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Solve for x: 3(x + 2) − 2x = 12',
        answer: '6',
        explanation: '3x + 6 − 2x = 12 → x + 6 = 12 → x = 6.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Solve for x: 2(x − 5) + 3x = 15',
        answer: '5',
        explanation: '2x − 10 + 3x = 15 → 5x − 10 = 15 → 5x = 25 → x = 5.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'Solve for x: 4x − 2(x + 3) = 10',
        answer: '8',
        explanation: '4x − 2x − 6 = 10 → 2x − 6 = 10 → 2x = 16 → x = 8.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'Solve for x: 5(x − 1) − 3x = 7',
        answer: '6',
        explanation: '5x − 5 − 3x = 7 → 2x − 5 = 7 → 2x = 12 → x = 6.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-graphing-6',
    subject: 'math',
    tier: 3,
    title: 'Finding Slope from a Table',
    theme: 'Reading the rate of change directly from a table of values',
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'A table shows: x=0, y=5; x=1, y=8; x=2, y=11. What is the slope (rate of change)?',
        answer: '3',
        explanation: '(8 − 5) ÷ (1 − 0) = 3.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Using the same table, what is y when x = 2?',
        answer: '11',
        explanation: 'The table directly shows y = 11 when x = 2.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'A table shows: x=0, y=20; x=2, y=14; x=4, y=8. What is the slope?',
        answer: '-3',
        explanation: '(14 − 20) ÷ (2 − 0) = -6 ÷ 2 = -3.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'Using that table (slope -3, starting at y=20 when x=0), what is y when x = 6?',
        answer: '2',
        explanation: '20 + (-3 × 6) = 20 − 18 = 2.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-systems-4',
    subject: 'math',
    tier: 3,
    title: 'Solving by Elimination',
    theme: 'Adding or subtracting equations to eliminate a variable',
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Solve: x + y = 12 and x − y = 2. What is x?',
        answer: '7',
        explanation: 'Adding the equations eliminates y: 2x = 14 → x = 7.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Using the same system, what is y?',
        answer: '5',
        explanation: 'y = 12 − 7 = 5.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'Solve: 2x + y = 11 and x − y = 1. What is x?',
        answer: '4',
        explanation: 'Adding the equations eliminates y: 3x = 12 → x = 4.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'Using the same system, what is y?',
        answer: '3',
        explanation: 'y = x − 1 = 3.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-algebra-7',
    subject: 'math',
    tier: 3,
    title: 'Writing & Solving Word Equations',
    theme: 'Translating word problems into equations before solving',
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'A number tripled, then increased by 5, equals 26. What is the number?',
        answer: '7',
        explanation: '3x + 5 = 26 → 3x = 21 → x = 7.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Twice a number, decreased by 8, equals 10. What is the number?',
        answer: '9',
        explanation: '2x − 8 = 10 → 2x = 18 → x = 9.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'A number decreased by 7, then doubled, equals 18. What is the number?',
        answer: '16',
        explanation: '2(x − 7) = 18 → x − 7 = 9 → x = 16.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'Five more than three times a number equals 29. What is the number?',
        answer: '8',
        explanation: '3x + 5 = 29 → 3x = 24 → x = 8.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-graphing-7',
    subject: 'math',
    tier: 3,
    title: 'Point-Slope Applications',
    theme: 'Using a slope and one known point to find other points on a line',
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'A line has a slope of 3 and passes through (2, 7). What is y when x = 5?',
        answer: '16',
        explanation: 'y = 7 + 3(5 − 2) = 7 + 9 = 16.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'A line has a slope of -2 and passes through (1, 10). What is y when x = 4?',
        answer: '4',
        explanation: 'y = 10 + (-2)(4 − 1) = 10 − 6 = 4.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'A line has a slope of 4 and passes through (0, -3). What is y when x = 3?',
        answer: '9',
        explanation: 'y = -3 + 4(3) = -3 + 12 = 9.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'A line has a slope of -1 and passes through (5, 5). What is y when x = 0?',
        answer: '10',
        explanation: 'y = 5 + (-1)(0 − 5) = 5 + 5 = 10.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-systems-5',
    subject: 'math',
    tier: 3,
    title: 'More System Word Problems',
    theme: 'Setting up systems from money and quantity scenarios',
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'The sum of two numbers is 30. One number is twice the other. What is the smaller number?',
        answer: '10',
        explanation: 'x + 2x = 30 → 3x = 30 → x = 10.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Using the same two numbers, what is the larger number?',
        answer: '20',
        explanation: '2 × 10 = 20.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'A total of $50 is split between two accounts. One account has $10 more than the other. How much is in the smaller account?',
        answer: '20',
        explanation: 'x + (x + 10) = 50 → 2x + 10 = 50 → 2x = 40 → x = 20.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'Using the same accounts, how much is in the larger account?',
        answer: '30',
        explanation: '20 + 10 = 30.',
        xp: 10
      }
    ]
  }
];
