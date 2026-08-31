// ---------------------------------------------------------------------------
// Math lessons — Tier 8 (College Ready Engineer). The Engineering
// Mathematics capstone, drawing on everything below it: arithmetic,
// algebra, and unit conversion, applied the way an engineer actually uses
// them (scientific notation, dimensional analysis, rate formulas).
// ---------------------------------------------------------------------------

export const mathLessonsTier8 = [
  {
    id: 'm7-engineering-math-1',
    subject: 'math',
    tier: 8,
    title: 'Engineering Mathematics: Applied Formulas',
    theme: 'Scientific notation, dimensional analysis, and rate formulas used in real engineering work',
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt:
          '45,000,000 can be written as 4.5 × 10 raised to what power? (Answer with just the exponent, like 3)',
        answer: '7',
        explanation: '45,000,000 = 4.5 × 10,000,000 = 4.5 × 10⁷, so the exponent is 7.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: '3.2 × 10⁻³ equals what decimal number?',
        answer: '0.0032',
        explanation: 'Moving the decimal point 3 places left: 3.2 × 10⁻³ = 0.0032.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'A probe travels at 7.5 km/s. How many km does it travel in 40 seconds?',
        answer: '300',
        explanation: '7.5 × 40 = 300 km.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'Using distance = rate × time, find the distance when rate = 250 m/s and time = 12 s.',
        answer: '3000',
        explanation: 'd = 250 × 12 = 3,000 meters.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-engineering-math-2',
    subject: 'math',
    tier: 8,
    title: 'Engineering Mathematics: Applied Formulas II',
    theme: 'Force, speed, and scientific notation practice with real engineering formulas',
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Using Force = mass × acceleration (F = ma), find the force when mass = 12 kg and acceleration = 5 m/s².',
        answer: '60',
        explanation: 'F = 12 × 5 = 60 newtons.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'Convert 2.5 × 10⁴ to standard decimal form.',
        answer: '25000',
        explanation: '2.5 × 10⁴ = 2.5 × 10,000 = 25,000.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'A probe travels 450 km in 3 hours. What is its average speed, in km/h?',
        answer: '150',
        explanation: '450 ÷ 3 = 150 km/h.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'A radio signal travels 900,000 km in 3 seconds. What is its speed, in km/s?',
        answer: '300000',
        explanation: '900,000 ÷ 3 = 300,000 km/s.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-engineering-math-3',
    subject: 'math',
    tier: 8,
    title: 'Engineering Mathematics: Dimensional Analysis',
    theme: 'Unit conversions and scientific notation for engineering calculations',
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Convert 5,000 meters to kilometers.',
        answer: '5',
        explanation: '5,000 ÷ 1,000 = 5 kilometers.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'A signal travels at 3 × 10⁵ km/s. How far does it travel in 10 seconds?',
        answer: '3000000',
        explanation: '3 × 10⁵ × 10 = 3,000,000 km.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'Convert 2.5 hours to minutes.',
        answer: '150',
        explanation: '2.5 × 60 = 150 minutes.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: "A probe's mass is 1.2 × 10³ kg. Express this in standard form.",
        answer: '1200',
        explanation: '1.2 × 10³ = 1.2 × 1,000 = 1,200.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-engineering-math-4',
    subject: 'math',
    tier: 8,
    title: 'Engineering Mathematics: Precision & Tolerance',
    theme: 'More dimensional analysis, plus manufacturing tolerance calculations',
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Convert 750 grams to kilograms.',
        answer: '0.75',
        explanation: '750 ÷ 1,000 = 0.75 kg.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'A satellite orbits at a speed of 7.8 km/s. How far does it travel in 5 minutes (300 seconds)?',
        answer: '2340',
        explanation: '7.8 × 300 = 2,340 km.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'Convert 3.5 × 10² to standard form.',
        answer: '350',
        explanation: '3.5 × 10² = 3.5 × 100 = 350.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: "A component's tolerance is ±0.05 mm on a 25 mm part. What is the maximum allowed size, in mm?",
        answer: '25.05',
        explanation: '25 + 0.05 = 25.05 mm.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-engineering-math-5',
    subject: 'math',
    tier: 8,
    title: 'Engineering Mathematics: Signal & Scale',
    theme: 'Scientific notation and speed-of-light calculations',
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: '0.0025 can be written as 2.5 × 10 raised to what power? (Answer with just the exponent, like -3)',
        answer: '-3',
        explanation: '0.0025 = 2.5 × 10⁻³, so the exponent is -3.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: "A spacecraft's speed is 11 km/s. Convert to m/s.",
        answer: '11000',
        explanation: '11 × 1,000 = 11,000 m/s.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt:
          'A radio signal takes 1.3 seconds to travel from the Moon to Earth at the speed of light (3 × 10⁵ km/s). Approximately how far away is the Moon, in km?',
        answer: '390000',
        explanation: '1.3 × 300,000 = 390,000 km.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'Convert 4 × 10⁻² to standard decimal form.',
        answer: '0.04',
        explanation: '4 × 10⁻² = 4 ÷ 100 = 0.04.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-engineering-math-6',
    subject: 'math',
    tier: 8,
    title: 'Engineering Mathematics: Frequency & Rate',
    theme: 'Applied conversions using scientific notation and acceleration',
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'Convert 8,000 meters to kilometers.',
        answer: '8',
        explanation: '8,000 ÷ 1,000 = 8 kilometers.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'A signal has a frequency of 2.4 × 10⁹ Hz (2.4 GHz). Express this in standard form.',
        answer: '2400000000',
        explanation: '2.4 × 10⁹ = 2.4 × 1,000,000,000 = 2,400,000,000.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: "A component's mass is 450 grams. Convert to kilograms.",
        answer: '0.45',
        explanation: '450 ÷ 1,000 = 0.45 kg.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'A probe accelerates from 0 to 3,000 m/s in 60 seconds. What is its acceleration, in m/s²?',
        answer: '50',
        explanation: '3,000 ÷ 60 = 50 m/s².',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-engineering-math-7',
    subject: 'math',
    tier: 8,
    title: 'Engineering Mathematics: Signals & Orbits',
    theme: 'Applied conversions for wavelength and orbital counting',
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'A signal has a wavelength of 0.06 meters. Convert to centimeters.',
        answer: '6',
        explanation: '0.06 × 100 = 6 centimeters.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'A satellite completes an orbit every 90 minutes. How many orbits does it complete in 24 hours (1,440 minutes)?',
        answer: '16',
        explanation: '1,440 ÷ 90 = 16 orbits.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'Convert 6.5 × 10⁶ to standard form.',
        answer: '6500000',
        explanation: '6.5 × 10⁶ = 6.5 × 1,000,000 = 6,500,000.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: 'A rocket burns fuel at 250 kg/s. How much fuel is used in 40 seconds?',
        answer: '10000',
        explanation: '250 × 40 = 10,000 kg.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-engineering-math-8',
    subject: 'math',
    tier: 8,
    title: 'Engineering Mathematics: Signal Strength & Budgets',
    theme: 'Applied ratios and scientific notation for engineering scenarios',
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'A signal-to-noise ratio requires signal power of at least 10× the noise power. If noise power is 2 milliwatts, what is the minimum signal power needed, in milliwatts?',
        answer: '20',
        explanation: '2 × 10 = 20 milliwatts.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: '0.00075 can be written as 7.5 × 10 raised to what power? (Answer with just the exponent, like -3)',
        answer: '-4',
        explanation: '0.00075 = 7.5 × 10⁻⁴, so the exponent is -4.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'A satellite dish has a diameter of 3.5 m. What is its radius, in meters?',
        answer: '1.75',
        explanation: '3.5 ÷ 2 = 1.75 m.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: "A rocket's total delta-v (change in velocity) budget is 9,400 m/s. If the first stage uses 4,200 m/s, how much remains for later stages?",
        answer: '5200',
        explanation: '9,400 − 4,200 = 5,200 m/s.',
        xp: 10
      }
    ]
  },
  {
    id: 'm7-engineering-math-9',
    subject: 'math',
    tier: 8,
    title: 'Engineering Mathematics: Temperature & Power',
    theme: 'Applied ranges, large-number multiplication, and unit conversion',
    questions: [
      {
        id: 'q1',
        type: 'numeric',
        prompt: 'A component must operate between -40°C and 85°C. What is the total temperature range it must withstand?',
        answer: '125',
        explanation: '85 − (-40) = 125 degrees.',
        xp: 10
      },
      {
        id: 'q2',
        type: 'numeric',
        prompt: 'A processor completes 3.2 × 10⁹ operations per second. How many operations does it complete in 5 seconds?',
        answer: '16000000000',
        explanation: '3.2 × 10⁹ × 5 = 1.6 × 10¹⁰ = 16,000,000,000.',
        xp: 10
      },
      {
        id: 'q3',
        type: 'numeric',
        prompt: 'Convert 250,000 Pa (pascals) to kilopascals (kPa), where 1 kPa = 1,000 Pa.',
        answer: '250',
        explanation: '250,000 ÷ 1,000 = 250 kPa.',
        xp: 10
      },
      {
        id: 'q4',
        type: 'numeric',
        prompt: "A drone's battery provides 4.5 amp-hours. If it draws 1.5 amps continuously, how many hours will it last?",
        answer: '3',
        explanation: '4.5 ÷ 1.5 = 3 hours.',
        xp: 10
      }
    ]
  }
];
