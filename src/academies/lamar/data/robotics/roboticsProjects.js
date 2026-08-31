// ---------------------------------------------------------------------------
// Hands-on Robotics projects — Tier 1, Q4. Same infrastructure as
// aerospaceProjects.js, scienceExperiments.js and technologyProjects.js:
// `category: 'experiment'` routes these through WritingPromptEngine /
// submitWritingEntry, so a finished project becomes a real Portfolio entry and
// a graded Writing Journal submission rather than an activity that disappears.
//
// WHY THESE EXIST (Aug 8, 2026): the 8 Robotics lessons teach sensors,
// thresholds, PWM, setup/loop, conditionals, state and proportional control —
// and without these, none of it would ever be built. Exactly the gap the CAD
// projects were written to close in November.
//
// EVERYTHING RUNS IN TINKERCAD CIRCUITS. Free, no second signup beyond the
// Tinkercad account he already uses for CAD, no Arduino board, no kit, no
// soldering. Circuits simulates an Arduino on a breadboard with sensors,
// servos and DC motors, and codes in drag-and-drop blocks or C++ side by side.
//
// HONEST LIMIT, stated rather than glossed: Circuits simulates the CIRCUIT and
// the CODE, not a chassis driving through space. There is no physics arena. The
// line-following project below therefore reasons about the control logic and
// tests it against sensor values, rather than watching a robot drive a track.
// If he later wants a robot that physically moves, that is hardware to buy —
// not another subscription.
// ---------------------------------------------------------------------------

export const roboticsProjects = [
  {
    id: 'rb7-project-first-reading',
    subject: 'robotics',
    tier: 1,
    category: 'experiment',
    title: 'Make a Sensor Talk',
    theme: 'Sensors I — getting a real number out of the physical world',
    relatedLessonId: 'rb7-sensors',
    toolUrl: 'https://www.tinkercad.com/circuits',
    toolLabel: 'Open Tinkercad Circuits',
    objectives:
      "Wire one sensor to an Arduino, print its readings to the serial monitor, and watch the number move as the world changes. The goal is not a working robot — it is seeing with your own eyes that a sensor is a thing that produces numbers.",
    materials: [
      'A computer with a web browser',
      'A free Tinkercad account (the same one used for CAD — Circuits is included)',
      'No hardware, no board, no purchase required'
    ],
    procedure: [
      'Open Tinkercad Circuits and start a new circuit.',
      'Drag an Arduino Uno onto the workplane, then a breadboard beside it.',
      'Add a photoresistor and a 10k ohm resistor to build a voltage divider, and wire its middle point to analog pin A0.',
      'Open the code editor and switch it to Text so you can see real C++.',
      'In setup(), call Serial.begin(9600). This opens the channel the readings travel on.',
      'In loop(), read the pin with analogRead(A0), print it with Serial.println(), and add a short delay.',
      'Start the simulation and open the serial monitor.',
      'Now change the world: drag the photoresistor slider from dark to bright and watch the numbers climb.',
      'WRITE DOWN the number you see in full brightness and the number in full darkness. You will need both in the next project.'
    ],
    safetyTips: [
      'This project is entirely on screen — there is nothing to cut, heat, or handle.',
      'If the reading never changes, check that A0 is wired to the point BETWEEN the photoresistor and the resistor, not to either end.'
    ],
    concepts: ['Sensor', 'Analog input', 'Voltage divider', 'Serial monitor', 'Sense-decide-act'],
    difficulty: 'Beginner',
    estMinutes: 30,
    instructions:
      "Write down the two numbers you measured — bright and dark — and describe what happened to the readings as you moved the slider. Did the number change smoothly, or jump? Explain in your own words why this is an ANALOG input and not a digital one.",
    minWords: 60,
    iterationPrompt:
      'Swap the photoresistor for a temperature sensor or an ultrasonic distance sensor and repeat. What is different about the numbers it produces, and what would you have to change in your code?'
  },
  {
    id: 'rb7-project-threshold',
    subject: 'robotics',
    tier: 1,
    category: 'experiment',
    title: 'Choose the Line, Then Stop the Chatter',
    theme: 'Sensors II — calibration, and building a dead zone with your own hands',
    relatedLessonId: 'rb7-sensors-2',
    toolUrl: 'https://www.tinkercad.com/circuits',
    toolLabel: 'Open Tinkercad Circuits',
    objectives:
      'Turn the two numbers you measured into a working threshold, watch an LED chatter at a single dividing line, then fix it with hysteresis and see the flicker stop.',
    materials: [
      'The circuit from the previous project',
      'One LED and a 220 ohm resistor',
      'No hardware required'
    ],
    procedure: [
      'Reopen your sensor circuit and add an LED with a 220 ohm resistor on digital pin 9.',
      'Take your bright and dark readings and choose a threshold roughly halfway between them. Write the number down — this is YOUR choice, not the sensor\'s.',
      'Write an if/else: above the threshold turn the LED off, below it turn the LED on.',
      'Run it and move the slider slowly until the reading sits right AT your threshold. Watch the LED flicker.',
      'Now add hysteresis. Replace the single threshold with two: an upper number to switch on and a lower number to switch off, about 60 apart.',
      'Structure it as three cases — above the upper, below the lower, and in between do NOTHING at all.',
      'Run it again and park the slider in the middle. The flicker should be gone.'
    ],
    safetyTips: [
      'Entirely on screen — nothing to handle.',
      'If the LED never lights, check that your threshold actually sits between your two measured numbers rather than outside them.'
    ],
    concepts: ['Threshold', 'Calibration', 'Noise', 'Hysteresis', 'Dead zone'],
    difficulty: 'Beginner',
    estMinutes: 40,
    instructions:
      'Describe the flicker you saw with one threshold, and explain WHY it happened using the word noise. Then explain what the dead zone between your two thresholds actually does. Give one real machine other than a robot that needs the same fix.',
    minWords: 70,
    iterationPrompt:
      'Make the gap between your two thresholds much larger, then much smaller. What goes wrong at each extreme? There is a cost to a dead zone that is too wide — describe it.'
  },
  {
    id: 'rb7-project-motor-servo',
    subject: 'robotics',
    tier: 1,
    category: 'experiment',
    title: 'Speed Versus Position',
    theme: 'Actuators — proving to yourself that a DC motor and a servo are different in kind',
    relatedLessonId: 'rb7-actuators',
    toolUrl: 'https://www.tinkercad.com/circuits',
    toolLabel: 'Open Tinkercad Circuits',
    objectives:
      'Drive a DC motor at several duty cycles, then command a servo to specific angles, and see directly that one takes a SPEED and the other takes a POSITION.',
    materials: [
      'A computer with a web browser',
      'Tinkercad Circuits (free)',
      'No motor, no servo, no battery to buy'
    ],
    procedure: [
      'Start a new circuit with an Arduino Uno.',
      'Add a DC motor driven from a PWM-capable pin through a transistor or motor driver block.',
      'Use analogWrite() to run it at 64, then 128, then 255. Watch the simulated speed change.',
      'Note what you CANNOT do: there is no instruction that tells this motor to turn ninety degrees and stop there.',
      'Now add a servo on a separate pin and include the Servo library.',
      'Command it to 0 degrees, then 90, then 180, with a delay between each.',
      'Watch it drive itself to each angle and HOLD there.',
      'Write down, in one sentence each, what you had to send the motor and what you had to send the servo.'
    ],
    safetyTips: [
      'On screen only.',
      'If the motor does not turn, check it is on a pin that supports PWM — not every pin does.'
    ],
    concepts: ['DC motor', 'Servo', 'PWM', 'Duty cycle', 'Position control'],
    difficulty: 'Intermediate',
    estMinutes: 45,
    instructions:
      'Explain the difference between what you sent the DC motor and what you sent the servo. Then answer this: if you only had a DC motor and needed it to stop at an exact angle, what two things would you have to add yourself?',
    minWords: 70,
    iterationPrompt:
      'Write a sweep — move the servo smoothly from 0 to 180 and back using a loop. Then explain why a DC motor cannot be made to do the same thing with the same code.'
  },
  {
    id: 'rb7-project-setup-loop',
    subject: 'robotics',
    tier: 1,
    category: 'experiment',
    title: 'The Loop That Never Ends',
    theme: 'Microcontrollers — setup versus loop, and what a floating pin really looks like',
    relatedLessonId: 'rb7-microcontrollers',
    toolUrl: 'https://www.tinkercad.com/learn/circuits',
    toolLabel: 'Tinkercad Circuits — Learn',
    objectives:
      'See for yourself what setup() and loop() each do, and then deliberately create the floating-pin bug so you recognise it the next time it happens by accident.',
    materials: ['A computer with a web browser', 'Tinkercad Circuits (free)'],
    procedure: [
      'Start a new circuit with an Arduino and one LED on pin 13.',
      'In setup(), add Serial.begin(9600) and a Serial.println("SETUP RAN").',
      'In loop(), print a counter that increases every pass, then blink the LED.',
      'Run it and watch the serial monitor: SETUP RAN appears ONCE, the counter climbs forever.',
      'Now the deliberate bug. Add a pushbutton wired to pin 2 and read it in loop() — but do NOT call pinMode for it.',
      'Print the button reading each pass. Run the simulation and touch nothing.',
      'Watch the reading flip between HIGH and LOW on its own. That is a floating pin.',
      'Now add pinMode(2, INPUT_PULLUP) in setup() and run again. The reading should go steady.'
    ],
    safetyTips: [
      'On screen only.',
      'Keep the print delay at 200ms or more or the serial monitor scrolls too fast to read.'
    ],
    concepts: ['Microcontroller', 'setup()', 'loop()', 'pinMode', 'Floating pin'],
    difficulty: 'Beginner',
    estMinutes: 35,
    instructions:
      'Describe exactly what you saw in the serial monitor before and after adding pinMode. Then explain why a floating pin is a harder bug to find than a pin that is simply broken.',
    minWords: 60,
    iterationPrompt:
      'Move your Serial.begin() line from setup() into loop(). Does it still work? What is wasteful about it, and what does that tell you about what setup() is for?'
  },
  {
    id: 'rb7-project-button-decision',
    subject: 'robotics',
    tier: 1,
    category: 'experiment',
    title: 'A Machine That Decides',
    theme: 'Programming I — turning a reading into an action, and finding the silent do-nothing path',
    relatedLessonId: 'rb7-programming',
    toolUrl: 'https://www.tinkercad.com/circuits',
    toolLabel: 'Open Tinkercad Circuits',
    objectives:
      'Write your first real conditional, then break it on purpose by removing the else, and watch the robot do nothing at all in a case you did not plan for.',
    materials: ['A computer with a web browser', 'Tinkercad Circuits (free)'],
    procedure: [
      'Build a circuit with a button on pin 2 (with pinMode set properly this time) and two LEDs, green on pin 9 and red on pin 10.',
      'Write an if/else: button pressed lights green, otherwise lights red.',
      'Run it and confirm exactly one LED is lit at any moment.',
      'Now delete the else branch and the line that turns the green LED off.',
      'Run it again. Press the button, then release it. The green LED stays on — nothing ever told it to stop.',
      'Fix it by restoring the else, and write down what the else was actually doing.',
      'Finally, swap == for = in your comparison and read the error. Then change it back.'
    ],
    safetyTips: [
      'On screen only.',
      'If both LEDs light at once, you have two separate ifs rather than an if/else — that is worth understanding before you fix it.'
    ],
    concepts: ['Conditional', 'Comparison operator', 'Boolean', 'else', 'Silent do-nothing path'],
    difficulty: 'Beginner',
    estMinutes: 40,
    instructions:
      'Describe what happened when you removed the else. Explain in your own words why an if with no else is dangerous in a robot, and give an example of a situation where a robot doing nothing would be a serious problem.',
    minWords: 70,
    iterationPrompt:
      'Add a third state using a light sensor: bright, dim, and dark, each lighting a different LED. How many branches did you need, and which one was easiest to forget?'
  },
  {
    id: 'rb7-project-line-follower',
    subject: 'robotics',
    tier: 1,
    category: 'experiment',
    title: 'Correct in Proportion',
    theme: 'Feedback — error, proportional response, and tuning something until it stops fighting itself',
    relatedLessonId: 'rb7-feedback',
    toolUrl: 'https://www.tinkercad.com/circuits',
    toolLabel: 'Open Tinkercad Circuits',
    objectives:
      'Build the decision half of a line-following robot: compute error from a sensor, turn that error into a correction sized to it, and tune the strength until the response is neither sluggish nor wild.',
    materials: [
      'A computer with a web browser',
      'Tinkercad Circuits (free)',
      'NOTE: Circuits simulates the circuit and the code, not a robot driving a track. You will test with sensor values rather than watch it drive.'
    ],
    procedure: [
      'Build a circuit with a light sensor on A0 and two DC motors on PWM pins — left and right.',
      'Decide a target reading that means "centred on the line". Write it down.',
      'In loop(), compute error = reading - target. Print it so you can see it go positive and negative.',
      'Turn error into a correction: correction = error * gain, starting with a small gain like 0.5.',
      'Set left motor speed to base + correction and right motor to base - correction, using analogWrite.',
      'Constrain both speeds to 0-255 so a large error cannot produce a nonsense value.',
      'Now tune. Sweep the sensor slider across the target and watch the printed motor speeds. Raise the gain until the correction slams from one extreme to the other; lower it until the response barely moves.',
      'Write down the gain that felt right, and the two that clearly did not.'
    ],
    safetyTips: [
      'On screen only.',
      'Always constrain motor values. An unconstrained correction can compute a speed far outside 0-255, which is a real bug on real hardware, not just here.'
    ],
    concepts: ['Open-loop vs closed-loop', 'Error', 'Proportional control', 'Gain tuning', 'Constrain'],
    difficulty: 'Advanced',
    estMinutes: 60,
    instructions:
      'Report the three gain values you tried and what each one did. Explain what error means in your own words, and why a controller acts on the error rather than on the target. Then describe what you would need to add to actually test this on a real robot.',
    minWords: 90,
    iterationPrompt:
      'Set the gain deliberately far too high and describe the behaviour precisely. Rockets and aircraft can shake themselves apart from exactly this. Explain why over-correction is dangerous in a way under-correction is not.'
  }
];
