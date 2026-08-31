// ---------------------------------------------------------------------------
// Math lessons — Tier 4 (Mission Specialist). Geometry, building on the
// algebra/graphing foundation from Tier 3.
// ---------------------------------------------------------------------------

export const mathLessonsTier4 = [
  {
    id: 'm7-geometry-area-1',
    subject: 'math',
    tier: 4,
    title: 'Launch Pad Geometry',
    theme: 'Area and perimeter for facility and structure planning',
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'A rectangular launch pad is 25 m by 40 m. What is its area, in square meters?',
        answer: '1000',
        explanation: '25 × 40 = 1,000 square meters.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'A square hangar door has a side length of 12 m. What is its perimeter, in meters?',
        answer: '48',
        explanation: '4 × 12 = 48 meters.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'A triangular support brace has a base of 10 m and a height of 6 m. What is its area, in square meters?',
        answer: '30',
        explanation: 'Area = ½ × base × height = ½ × 10 × 6 = 30 square meters.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'A rectangular fuel storage room is 8 m by 15 m. What is its perimeter, in meters?',
        answer: '46',
        explanation: '2 × (8 + 15) = 2 × 23 = 46 meters.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-geometry-3d-1',
    subject: 'math',
    tier: 4,
    title: '3D Structures & Right Triangles',
    theme: 'Volume and the Pythagorean theorem for cargo bays and support struts',
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'A rectangular cargo box is 4 m × 3 m × 2 m. What is its volume, in cubic meters?',
        answer: '24',
        explanation: '4 × 3 × 2 = 24 cubic meters.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'A cube-shaped satellite module has a side length of 3 m. What is its volume, in cubic meters?',
        answer: '27',
        explanation: '3 × 3 × 3 = 27 cubic meters.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt:
          'A support strut forms a right triangle with legs of 6 m and 8 m. What is the length of the hypotenuse, in meters? (Pythagorean theorem)',
        answer: '10',
        explanation: '√(6² + 8²) = √(36 + 64) = √100 = 10 meters.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt:
          'A support cable (hypotenuse) is 13 m, and one leg of the right triangle it forms is 12 m. What is the length of the other leg, in meters?',
        answer: '5',
        explanation: '√(13² − 12²) = √(169 − 144) = √25 = 5 meters.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-geometry-circles-1',
    subject: 'math',
    tier: 4,
    title: 'Circular Components & Antennas',
    theme: 'Circumference and area of circular parts, rounding out the geometry unit',
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'A circular satellite dish has a radius of 7 m. Using π ≈ 22/7, what is its circumference, in meters?',
        answer: '44',
        explanation: 'C = 2πr = 2 × (22/7) × 7 = 44 meters.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'A circular access hatch has a diameter of 14 m. What is its radius, in meters?',
        answer: '7',
        explanation: 'Radius = diameter ÷ 2 = 14 ÷ 2 = 7 meters.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'A circular window has a radius of 5 m. Using π ≈ 3.14, what is its area, in square meters?',
        answer: '78.5',
        explanation: 'A = πr² = 3.14 × 5² = 3.14 × 25 = 78.5 square meters.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'A circular test track has a radius of 10 m. Using π ≈ 3.14, what is its circumference, in meters?',
        answer: '62.8',
        explanation: 'C = 2πr = 2 × 3.14 × 10 = 62.8 meters.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-geometry-surface-area-1',
    subject: 'math',
    tier: 4,
    title: 'Surface Area of Cargo Structures',
    theme: 'Total surface area of cubes and rectangular boxes',
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'A cube has a side length of 4 m. What is its total surface area, in square meters?',
        answer: '96',
        explanation: 'A cube has 6 equal faces: 6 × 4² = 6 × 16 = 96 square meters.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'A rectangular cargo box is 3 m × 4 m × 5 m. What is its total surface area, in square meters?',
        answer: '94',
        explanation: 'Surface area = 2(lw + lh + wh) = 2(3×4 + 3×5 + 4×5) = 2(12+15+20) = 2 × 47 = 94.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'A cube has a side length of 6 m. What is its total surface area, in square meters?',
        answer: '216',
        explanation: '6 × 6² = 6 × 36 = 216 square meters.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'A rectangular box is 2 m × 3 m × 4 m. What is its total surface area, in square meters?',
        answer: '52',
        explanation: '2(2×3 + 2×4 + 3×4) = 2(6+8+12) = 2 × 26 = 52.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-geometry-angles-1',
    subject: 'math',
    tier: 4,
    title: 'Angles & Triangles',
    theme: 'The triangle angle sum and finding missing angles',
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'The three angles of a triangle always add up to how many degrees?',
        answer: '180',
        explanation: 'The interior angles of any triangle always sum to 180°.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'A triangle has angles of 50° and 60°. What is the third angle?',
        answer: '70',
        explanation: '180 − 50 − 60 = 70°.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'A right triangle has one angle of 90° and another of 35°. What is the third angle?',
        answer: '55',
        explanation: '180 − 90 − 35 = 55°.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'An equilateral triangle has three equal angles. What is the measure of each angle?',
        answer: '60',
        explanation: '180 ÷ 3 = 60° per angle.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-geometry-cylinders-1',
    subject: 'math',
    tier: 4,
    title: 'Volume of Cylinders',
    theme: 'Calculating the volume of cylindrical fuel tanks and tubes',
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'A cylindrical fuel tank has a radius of 3 m and a height of 10 m. Using π ≈ 3.14, what is its volume (V = πr²h), in cubic meters?',
        answer: '282.6',
        explanation: 'V = 3.14 × 3² × 10 = 3.14 × 9 × 10 = 282.6 cubic meters.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'A cylindrical tank has a radius of 5 m and a height of 4 m. Using π ≈ 3.14, what is its volume, in cubic meters?',
        answer: '314',
        explanation: 'V = 3.14 × 5² × 4 = 3.14 × 25 × 4 = 314 cubic meters.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'A cylinder has a radius of 2 m and a height of 7 m. Using π ≈ 3.14, what is its volume, in cubic meters?',
        answer: '87.92',
        explanation: 'V = 3.14 × 2² × 7 = 3.14 × 4 × 7 = 87.92 cubic meters.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'A cylindrical tube has a diameter of 6 m (so a radius of 3 m) and a height of 5 m. Using π ≈ 3.14, what is its volume, in cubic meters?',
        answer: '141.3',
        explanation: 'V = 3.14 × 3² × 5 = 3.14 × 9 × 5 = 141.3 cubic meters.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-geometry-composite-1',
    subject: 'math',
    tier: 4,
    title: 'Area of Composite Shapes',
    theme: 'Finding the area of irregular shapes built from simpler ones',
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'A shape is a 6 m × 4 m rectangle with a 3 m × 2 m rectangle removed from a corner. What is the remaining area, in square meters?',
        answer: '18',
        explanation: '(6 × 4) − (3 × 2) = 24 − 6 = 18 square meters.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'An L-shaped room is a 5 m × 3 m rectangle plus a 2 m × 2 m rectangle attached. What is the total area, in square meters?',
        answer: '19',
        explanation: '(5 × 3) + (2 × 2) = 15 + 4 = 19 square meters.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'A figure combines a rectangle 8 m × 5 m with a triangle (base 5 m, height 4 m) on top. What is the total area, in square meters?',
        answer: '50',
        explanation: 'Rectangle: 8 × 5 = 40. Triangle: ½ × 5 × 4 = 10. Total: 40 + 10 = 50 square meters.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'A 10 m × 6 m rectangle has a 2 m × 2 m square cut from each of two corners (2 squares total removed). What is the remaining area, in square meters?',
        answer: '52',
        explanation: '(10 × 6) − 2 × (2 × 2) = 60 − 8 = 52 square meters.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-geometry-similar-1',
    subject: 'math',
    tier: 4,
    title: 'Similar Figures',
    theme: 'Using scale factor to find corresponding sides in similar shapes',
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Two similar rectangles have a scale factor of 3. If the smaller rectangle has a width of 4 m, what is the width of the larger rectangle?',
        answer: '12',
        explanation: '4 × 3 = 12 m.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Two similar triangles have a scale factor of 2. If the smaller triangle has a side of 6 m, what is the corresponding side on the larger triangle?',
        answer: '12',
        explanation: '6 × 2 = 12 m.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'Two similar figures have a scale factor of 5. If the larger figure has a side of 25 m, what is the corresponding side on the smaller figure?',
        answer: '5',
        explanation: '25 ÷ 5 = 5 m.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'Two rectangles are similar with a side ratio of 2:5. If the smaller rectangle has a length of 8 m, what is the length of the larger rectangle?',
        answer: '20',
        explanation: '8 × (5/2) = 20 m.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-geometry-pythagorean-2',
    subject: 'math',
    tier: 4,
    title: 'More Pythagorean Theorem Applications',
    theme: 'Real-world right-triangle problems',
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'A ladder leans against a wall. Its base is 6 m from the wall, and the ladder is 10 m long. How high up the wall does it reach?',
        answer: '8',
        explanation: '√(10² − 6²) = √(100 − 36) = √64 = 8 m.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'A rectangular field is 30 m by 40 m. What is the length of its diagonal?',
        answer: '50',
        explanation: '√(30² + 40²) = √(900 + 1,600) = √2,500 = 50 m.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'A right triangle has legs of 9 and 12. What is the length of the hypotenuse?',
        answer: '15',
        explanation: '√(9² + 12²) = √(81 + 144) = √225 = 15.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'A screen is 24 inches wide and 18 inches tall. What is its diagonal size, in inches?',
        answer: '30',
        explanation: '√(24² + 18²) = √(576 + 324) = √900 = 30 inches.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-geometry-coordinate-1',
    subject: 'math',
    tier: 4,
    title: 'Distance on the Coordinate Plane',
    theme: 'Finding the distance between two points using the Pythagorean theorem',
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'What is the distance between points (0, 0) and (3, 4)?',
        answer: '5',
        explanation: '√(3² + 4²) = √25 = 5.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'What is the distance between (1, 1) and (4, 5)?',
        answer: '5',
        explanation: '√((4−1)² + (5−1)²) = √(9 + 16) = √25 = 5.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'What is the distance between (2, 3) and (2, 8)?',
        answer: '5',
        explanation: 'Same x-coordinate, so the distance is just the difference in y: |8 − 3| = 5.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'What is the distance between (-1, 0) and (5, 0)?',
        answer: '6',
        explanation: 'Same y-coordinate, so the distance is just the difference in x: |5 − (-1)| = 6.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-geometry-transformations-1',
    subject: 'math',
    tier: 4,
    title: 'Translations & Reflections',
    theme: 'Moving points on the coordinate plane',
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'A point at (3, 4) is translated 5 units right and 2 units down. What is its new x-coordinate?',
        answer: '8',
        explanation: '3 + 5 = 8.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Using the same translation, what is the new y-coordinate?',
        answer: '2',
        explanation: '4 − 2 = 2.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'A point at (5, 3) is reflected over the y-axis. What is the new x-coordinate?',
        answer: '-5',
        explanation: 'Reflecting over the y-axis negates the x-coordinate: 5 becomes -5.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'A point at (2, -6) is reflected over the x-axis. What is the new y-coordinate?',
        answer: '6',
        explanation: 'Reflecting over the x-axis negates the y-coordinate: -6 becomes 6.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-geometry-cones-1',
    subject: 'math',
    tier: 4,
    title: 'Volume of Cones',
    theme: 'Calculating the volume of cone-shaped nose cones and containers',
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'A cone has a radius of 3 m and a height of 6 m. Using V = (1/3)πr²h and π ≈ 3.14, what is its volume, in cubic meters?',
        answer: '56.52',
        explanation: '(1/3) × 3.14 × 9 × 6 = (1/3) × 169.56 = 56.52 cubic meters.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'A cone has a radius of 4 m and a height of 9 m. Using π ≈ 3.14, what is its volume, in cubic meters?',
        answer: '150.72',
        explanation: '(1/3) × 3.14 × 16 × 9 = (1/3) × 452.16 = 150.72 cubic meters.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'A cone has a radius of 2 m and a height of 3 m. Using π ≈ 3.14, what is its volume, in cubic meters?',
        answer: '12.56',
        explanation: '(1/3) × 3.14 × 4 × 3 = (1/3) × 37.68 = 12.56 cubic meters.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'A cone has a radius of 5 m and a height of 6 m. Using π ≈ 3.14, what is its volume, in cubic meters?',
        answer: '157',
        explanation: '(1/3) × 3.14 × 25 × 6 = (1/3) × 471 = 157 cubic meters.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-geometry-scale-drawings-1',
    subject: 'math',
    tier: 4,
    title: 'Scale Drawings',
    theme: 'Converting between drawing measurements and real-world sizes',
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'A scale drawing uses a scale of 1:100. If a wall measures 5 cm on the drawing, what is its actual length, in meters?',
        answer: '5',
        explanation: '5 × 100 = 500 cm = 5 m.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'A scale drawing uses a scale of 1 cm : 2 m. If a room is 8 cm on the drawing, what is its actual length, in meters?',
        answer: '16',
        explanation: '8 × 2 = 16 m.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'A building is 60 m tall. Using a scale of 1 cm : 10 m, how tall would it be drawn, in cm?',
        answer: '6',
        explanation: '60 ÷ 10 = 6 cm.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'A scale model uses a 1:20 scale. If the real object is 100 cm long, how long is the model, in cm?',
        answer: '5',
        explanation: '100 ÷ 20 = 5 cm.',
        xp: 10
      }
    ]
  }
];
