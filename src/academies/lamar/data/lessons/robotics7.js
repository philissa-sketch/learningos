// ---------------------------------------------------------------------------
// ROBOTICS & AUTOMATION — Tier 1, Q4 2026-2027 (April-May)
//
// Its own subject at last. PROJECT_PLAN Part 3 has said since the Khan Academy
// pivot that Robotics "should become its own genuine subject, not stay folded
// into Technology," and two quiz-only lessons (Robotics Programming I/II) sat
// inside technology7.js untouched through every Technology rebuild waiting for
// this. Those two are absorbed here as lessons 5 and 6, rebuilt to the beats
// standard: real teaching, worked examples, per-wrong-answer diagnosis, and a
// verified video. They are removed from technology7.js in the same change, so
// no lesson exists in two places.
//
// SLOT: Technology runs Q1-Q3 and stops. Robotics takes Q4 on the same
// Tuesday/Thursday pair, so the 4+1 week never carries three live subjects in
// one day — Technology finishes exactly as Robotics begins.
//
// TOOL — read this before adding a lesson that needs software. Everything here
// is doable in TINKERCAD CIRCUITS, the same free login he already uses for
// CAD. No second account, no Arduino board, no kit. Verified on Tinkercad's
// own Circuits page (Aug 7, 2026): "From blinking your first LED to building
// autonomous robots... Place and wire electronic components to create a
// virtual circuit from scratch. No additional hardware required. Learning with
// Arduino or micro:bit? Open the code editor to program using Codeblocks."
// If a future lesson needs something Circuits cannot simulate, say so out loud
// rather than quietly assuming hardware the family has not bought.
//
// AEROSPACE SPINE: every lesson lands on a real flown machine — the Canadarm2
// Stephanie Wilson operated, Perseverance driving itself across Jezero,
// Ingenuity flying where no human hand could steer it in time. Robotics is not
// a detour from his goal; it is how modern aerospace actually gets done.
// ---------------------------------------------------------------------------

export const roboticsLessons7 = [
  {
    id: 'rb7-sensors',
    subject: 'robotics',
    tier: 1,
    quarter: 'Q4 2026-2027',
    sequenceInQuarter: 1,
    title: 'Sensors I: How a Robot Knows Anything At All',
    theme: 'Digital and analog input, and why a robot with no senses is just a machine running blind',
    novaIntro: {
      glossary: {
        sensor: 'A component that turns something physical — light, distance, temperature, a button press — into an electrical signal the robot can read.',
        'digital input': 'A reading with exactly two states: HIGH or LOW, on or off, pressed or not pressed.',
        'analog input': 'A reading along a range rather than two states — on an Arduino, a whole number from 0 to 1023.',
        actuator: 'The opposite of a sensor: a component that turns an electrical signal into physical action.',
        'input pin': 'A numbered connection point on a microcontroller that has been set up to listen rather than to drive.'
      },
      beats: [
        {
          label: 'A robot is a loop between sensing and acting',
          hook: 'Take the sensors away from a robot and you do not get a dumber robot. You get a machine.',
          teachingText:
            'Everything that makes a robot a ROBOT rather than an appliance sits in one loop: it SENSES something about the world, DECIDES what that means, and ACTS. A washing machine runs a fixed sequence no matter what is inside it. A robot vacuum changes what it does because a bump sensor fired. The difference is not intelligence — it is input. A SENSOR is any component that converts something physical into an electrical signal: light into a voltage, distance into a pulse width, a press into a closed circuit. An ACTUATOR runs that conversion in reverse, turning a signal into motion. A robot is a sensor, an actuator, and a decision in between. Remove the sensor and the decision has nothing to work with, so the loop collapses back into a fixed sequence — a machine, not a robot.',
          example:
            'Perseverance takes a photograph of the ground ahead, works out where the rocks are, chooses a path, and drives. Radio takes minutes to reach Mars, so no one on Earth could steer it in time. The rover is a robot precisely because sensing and deciding happen on board.',
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'A toaster runs the same 3-minute cycle whatever you put in it. What single change would most make it a robot?',
            choices: [
              'Give it a sensor that reads how brown the bread is, and let that change when it stops',
              'Make the heating element hotter',
              'Add a second slot so it toasts more bread',
              'Give it a nicer case'
            ],
            answer: 0,
            explanation: 'Sensing something and letting it change the behaviour is exactly the sense-decide-act loop. Everything else just makes a better toaster.',
            choiceFeedback: [
              null,
              'A hotter element changes how fast it toasts, not whether it can respond to anything.',
              'More capacity, same fixed cycle — still not sensing anything.',
              'Appearance changes nothing about how it decides.'
            ]
          },
          practiceGeneratorId: 'gen-rb7-sensors',
          practiceCount: 3
        },
        {
          label: 'Two states, or a whole range',
          hook: 'The first real question about any sensor is not what it measures. It is how many answers it can give.',
          teachingText:
            'A DIGITAL INPUT has exactly two states — HIGH or LOW. A button is digital: pressed or not. There is no half-pressed. An ANALOG INPUT reports a value along a range; on an Arduino, analogRead returns a whole number from 0 to 1023, where 0 is zero volts and 1023 is the full supply voltage. A photoresistor is analog: it does not tell you "light" or "dark," it tells you 214, or 867. Which one you have determines what code you write. Digital sensors get a straight question — if the button is pressed, do this. Analog sensors do not, because there is no natural dividing line between "bright" and "dim." You have to choose one, and that choice is yours, not the sensor\'s. Wiring matters too: an input pin left connected to nothing does not read LOW, it FLOATS, drifting between states and producing readings that look like a fault in your code when the real problem is a missing resistor.',
          example:
            'In Tinkercad Circuits, wire a pushbutton and a photoresistor to the same Arduino. Print both to the Serial Monitor. The button prints 0 or 1 forever. The photoresistor prints a number that slides as you drag the light slider — same board, same code structure, two completely different kinds of answer.',
          applyItQuestion: {
            id: 'ai2',
            type: 'choice',
            prompt: 'Your photoresistor reads 214 in shadow and 867 in bright light. Why can the code not simply ask "is it light or dark?"',
            choices: [
              'Because an analog sensor reports a range, so you have to pick the threshold that divides light from dark yourself',
              'Because photoresistors are digital sensors',
              'Because 214 and 867 are both errors',
              'Because the Arduino cannot read photoresistors'
            ],
            answer: 0,
            explanation: 'Analog sensors hand you a number, not a category. Turning that number into a yes-or-no decision is a choice you make in code.',
            choiceFeedback: [
              null,
              'A photoresistor is analog — that is exactly why it returns a range rather than two states.',
              'Both are perfectly normal readings; the range really does run 0 to 1023.',
              'It reads them fine, on an analog input pin.'
            ]
          },
          practiceGeneratorId: 'gen-rb7-sensors',
          practiceCount: 3
        }
      ],
      connection:
        'How an aerospace engineer uses this: a spacecraft is mostly sensors. Attitude, temperature, pressure, fuel, current, radiation — thousands of channels, and every single one has to be classified as digital or analog before a single line of flight software is written, because the two are read differently, fail differently, and are calibrated differently. Engineers who skip that step do not find out on the bench. They find out in flight, when a floating input reads garbage and the fault tree says the code is broken when the wiring is.',
      // Dr. Carlotta A. Berry, PhD — "ESP32: Reading a Sonar Sensor" (0:40).
      // Verified: playabilityStatus OK, author confirmed, on-topic for this lesson.
      videoUrl: 'https://www.youtube.com/watch?v=h5d0P8YwnpA'
    },
    questions: [
      { id: 'q1', type: 'choice', prompt: 'What does a sensor do?', choices: ['Turns something physical into an electrical signal the robot can read', 'Turns an electrical signal into motion', 'Stores the robot’s program', 'Supplies power to the motors'], answer: 0, explanation: 'Sensors convert the physical world into readable signals.', choiceFeedback: [null, 'That is an actuator — the reverse conversion.', 'That is memory on the microcontroller.', 'That is the power supply.'], xp: 10 },
      { id: 'q2', type: 'choice', prompt: 'Which is a DIGITAL input?', choices: ['A pushbutton', 'A photoresistor', 'A temperature sensor reporting degrees', 'A potentiometer'], answer: 0, explanation: 'A button has exactly two states: pressed or not.', choiceFeedback: [null, 'A photoresistor reports a range of light levels — analog.', 'Degrees along a scale is a range — analog.', 'A potentiometer sweeps through a range — analog.'], xp: 10 },
      { id: 'q3', type: 'choice', prompt: 'On an Arduino, what range does analogRead return?', choices: ['0 to 1023', '0 to 1', '0 to 100', '0 to 255'], answer: 0, explanation: 'analogRead returns a whole number from 0 to 1023.', choiceFeedback: [null, 'That is a digital read — two states only.', 'A percentage is something you would calculate from the reading, not what it returns.', '0 to 255 is the range for analogWrite output, not analogRead input.'], xp: 10 },
      { id: 'q4', type: 'choice', prompt: 'What are the three steps of the loop that makes something a robot?', choices: ['Sense, decide, act', 'Power, wire, build', 'Input, store, delete', 'Design, print, assemble'], answer: 0, explanation: 'Sense-decide-act is the whole definition.', choiceFeedback: [null, 'Those are construction steps, not the operating loop.', 'Storing and deleting is data handling, not the robot loop.', 'That is a manufacturing process.'], xp: 10 },
      { id: 'q5', type: 'choice', prompt: 'An input pin connected to nothing at all will:', choices: ['Float, drifting unpredictably between HIGH and LOW', 'Always read LOW', 'Always read HIGH', 'Damage the board immediately'], answer: 0, explanation: 'An unconnected input floats — the readings look like a software bug but the fault is in the wiring.', choiceFeedback: [null, 'That is what a pull-down resistor would guarantee; without one it floats.', 'That is what a pull-up resistor would guarantee; without one it floats.', 'It does not damage anything — it just gives meaningless readings.'], xp: 10 },
      { id: 'q6', type: 'choice', prompt: 'Why can Perseverance not simply be driven from Earth in real time?', choices: ['Radio takes minutes to travel each way, so a human could not react in time', 'Mars has no radio reception', 'The rover has no radio transmitter', 'NASA does not have enough drivers'], answer: 0, explanation: 'Light-speed delay is why sensing and deciding have to happen on board.', choiceFeedback: [null, 'It communicates with Earth regularly — the issue is the delay, not the absence of a link.', 'It transmits constantly; the delay is the problem.', 'Staffing is not the constraint — physics is.'], xp: 10 },
      { id: 'q7', type: 'choice', prompt: 'What is an actuator?', choices: ['A component that turns an electrical signal into physical action', 'A component that measures light', 'A type of input pin', 'A programming loop'], answer: 0, explanation: 'Actuators are the output half of the loop — motors, servos, and the like.', choiceFeedback: [null, 'That is a sensor (a photoresistor).', 'Pins are connection points, not actuators.', 'A loop is code, not hardware.'], xp: 10 },
      { id: 'q8', type: 'choice', prompt: 'A washing machine runs the same cycle regardless of its contents. Why is that not a robot?', choices: ['Nothing it senses changes what it does', 'It has no motor', 'It is not connected to the internet', 'It uses too much electricity'], answer: 0, explanation: 'Without input changing behaviour, the sense-decide-act loop never closes.', choiceFeedback: [null, 'It has several motors — motors alone do not make a robot.', 'Connectivity has nothing to do with it.', 'Power consumption is irrelevant to the definition.'], xp: 10 },
      { id: 'q9', type: 'choice', prompt: 'Your analog light sensor reads 500 indoors. What does 500 mean on its own?', choices: ['Nothing until you decide what counts as bright or dim for your robot', 'Exactly half of full daylight', 'An error code', '500 lumens'], answer: 0, explanation: 'The raw number is meaningless until you set a threshold; the sensor does not label anything for you.', choiceFeedback: [null, 'The scale is not calibrated to daylight — it is just 0 to 1023 across the voltage range.', '500 is a perfectly ordinary reading.', 'The value is not in lumens or any physical unit.'], xp: 10 },
      { id: 'q10', type: 'choice', prompt: 'Which tool lets you wire and test all of this without buying any hardware?', choices: ['Tinkercad Circuits', 'A 3D printer', 'A soldering iron', 'A multimeter'], answer: 0, explanation: 'Tinkercad Circuits simulates Arduino, sensors, and code in the browser — the same login he already uses for CAD.', choiceFeedback: [null, 'Printing makes parts; it does not simulate circuits.', 'Soldering joins real components — the point here is that no real components are needed.', 'A multimeter measures real circuits, not simulated ones.'], xp: 10 }
    ]
  },
  {
    id: 'rb7-sensors-2',
    subject: 'robotics',
    tier: 1,
    quarter: 'Q4 2026-2027',
    sequenceInQuarter: 2,
    title: 'Sensors II: Thresholds, Noise, and Calibration',
    theme: 'Turning a stream of raw numbers into a decision you can trust',
    novaIntro: {
      glossary: {
        threshold: 'The value you choose as the dividing line between two decisions — above it do one thing, below it do another.',
        calibration: 'Measuring what your sensor actually reads under known conditions, then setting thresholds from those real numbers.',
        noise: 'Small random variation in a reading caused by the electronics and the environment, not by a real change in the world.',
        hysteresis: 'Using two thresholds instead of one — a higher value to switch on and a lower value to switch off — so a noisy signal cannot chatter.',
        averaging: 'Taking several readings and using their mean, so single noisy samples matter less.'
      },
      beats: [
        {
          label: 'The sensor gives you a number. The threshold is yours.',
          hook: 'Nobody ever sold you a sensor that knows what "dark" means. That decision is engineering, and it belongs to you.',
          teachingText:
            'A THRESHOLD is the value you pick as the dividing line between two behaviours. Pick it badly and a perfectly good sensor produces a robot that behaves erratically, and every hour you then spend rereading your code is wasted, because the code is fine. The way to pick it well is CALIBRATION: put the sensor in the conditions it will actually face, write down what it really reads, and set the threshold from those numbers rather than from a guess. Measure the room with the lights on. Measure it with the lights off. Measure it with a hand over the sensor. If bright reads 850 and dark reads 200, a threshold near 500 sits comfortably between them. A threshold of 840 sits so close to the bright reading that ordinary variation will cross it constantly. The habit that matters here is measuring before choosing — the numbers a datasheet promises are not the numbers your room produces.',
          example:
            'In Tinkercad Circuits, print a photoresistor to the Serial Monitor and drag the light slider slowly from one end to the other, noting the value at each end. That two-minute exercise is calibration, and it is the difference between a threshold you chose and a threshold you guessed.',
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'Bright reads 850, dark reads 200. Which threshold is the sound engineering choice?',
            choices: [
              'About 500, comfortably between the two measured extremes',
              'About 845, just under the bright reading',
              'About 205, just above the dark reading',
              '1023, the top of the range'
            ],
            answer: 0,
            explanation: 'A threshold in the middle of the measured gap tolerates ordinary variation at both ends.',
            choiceFeedback: [
              null,
              'That sits so close to bright that normal fluctuation will cross it constantly.',
              'Same problem at the other end — it will trigger on almost nothing.',
              'Nothing ever reaches the very top, so the condition would never fire.'
            ]
          },
          practiceGeneratorId: 'gen-rb7-sensors-2',
          practiceCount: 3
        },
        {
          label: 'Real signals wobble, and one threshold will chatter',
          hook: 'A robot that switches its light on and off forty times a second is not broken. It is sitting exactly on your threshold.',
          teachingText:
            'NOISE is small random variation that comes from the electronics and the environment rather than from any real change. A reading sitting near your threshold will cross it repeatedly just from noise, and the output will CHATTER — flickering on and off many times a second. There are two standard fixes and they work well together. AVERAGING takes several readings and uses their mean, so one odd sample cannot swing the decision. HYSTERESIS uses two thresholds instead of one: switch on above 600, but do not switch off again until the reading drops below 400. That gap between the two values is a deliberate dead zone, and noise inside it changes nothing. This is not a trick for hobby projects. Thermostats, cruise control, and spacecraft attitude systems all use hysteresis for exactly this reason — it is the standard answer to a signal that wobbles.',
          example:
            'A line-following robot whose sensor sits right on the edge of the tape will jerk left-right-left-right without hysteresis. Give it a gap — turn left below 400, turn right above 600, and go straight in between — and the same hardware drives smoothly.',
          applyItQuestion: {
            id: 'ai2',
            type: 'choice',
            prompt: 'Your robot\'s LED flickers rapidly whenever the light level sits right at your threshold. What is the best fix?',
            choices: [
              'Add hysteresis — one threshold to switch on, a lower one to switch off',
              'Raise the single threshold higher',
              'Read the sensor much faster',
              'Replace the photoresistor'
            ],
            answer: 0,
            explanation: 'A gap between the on and off thresholds means noise inside that gap changes nothing.',
            choiceFeedback: [
              null,
              'That moves where the chatter happens; it does not stop it happening.',
              'Faster reads make chatter worse, not better — more samples, more crossings.',
              'The sensor is fine; the problem is having a single dividing line.'
            ]
          },
          practiceGeneratorId: 'gen-rb7-sensors-2',
          practiceCount: 3
        }
      ],
      connection:
        'How an aerospace engineer uses this: every flight sensor is calibrated before launch, and the thresholds that trigger real action — abort, deploy, separate — are set from measured data with deliberate margin, never from a nominal figure in a datasheet. Hysteresis is everywhere in flight software for the same reason it fixes a flickering LED: a signal that wobbles across a single line makes a system that thrashes, and a thrashing system burns fuel, wears actuators, and in the worst case triggers an event nobody wanted.',
      // Dr. Carlotta A. Berry, PhD — "ESP32 Bumper Sensor Array Testing" (1:58).
      // Verified: playabilityStatus OK, author confirmed, on-topic for this lesson.
      videoUrl: 'https://www.youtube.com/watch?v=G-7KKVwStl8'
    },
    questions: [
      { id: 'q1', type: 'choice', prompt: 'What is a threshold?', choices: ['The value you choose as the dividing line between two decisions', 'The maximum a sensor can read', 'The speed a sensor responds at', 'The voltage a sensor needs'], answer: 0, explanation: 'A threshold is a choice you make, not a property of the sensor.', choiceFeedback: [null, 'That is the top of the range, which is fixed by the hardware.', 'That is response time.', 'That is the supply voltage.'], xp: 10 },
      { id: 'q2', type: 'choice', prompt: 'What is calibration?', choices: ['Measuring what the sensor really reads under known conditions, then setting thresholds from those numbers', 'Making the sensor more sensitive', 'Cleaning the sensor', 'Replacing the sensor'], answer: 0, explanation: 'Calibration replaces guessing with measuring.', choiceFeedback: [null, 'Sensitivity is fixed by the component; calibration is about knowing its real readings.', 'Maintenance, not calibration.', 'Replacement is not measurement.'], xp: 10 },
      { id: 'q3', type: 'choice', prompt: 'Bright reads 900, dark reads 300. The best threshold is closest to:', choices: ['600', '895', '305', '1023'], answer: 0, explanation: 'Sit in the middle of the measured gap so ordinary variation does not cross it.', choiceFeedback: [null, 'Far too close to bright — noise will cross it constantly.', 'Far too close to dark — it will trigger on almost nothing.', 'Nothing reaches the very top, so it would never fire.'], xp: 10 },
      { id: 'q4', type: 'choice', prompt: 'What is noise in a sensor reading?', choices: ['Small random variation from the electronics and environment, not a real change', 'A loud sound near the robot', 'A broken wire', 'A software bug'], answer: 0, explanation: 'Noise is variation that does not correspond to anything real happening.', choiceFeedback: [null, 'Sound is unrelated — this is electrical noise.', 'A broken wire gives a dead or floating reading, not noise.', 'Noise is a hardware and physics effect, not a code defect.'], xp: 10 },
      { id: 'q5', type: 'choice', prompt: 'What is hysteresis?', choices: ['Using two thresholds — a higher one to switch on and a lower one to switch off', 'Reading the sensor twice as fast', 'Averaging ten readings', 'Turning the sensor off between readings'], answer: 0, explanation: 'The gap between the two thresholds is a deliberate dead zone noise cannot cross.', choiceFeedback: [null, 'Faster reading makes chatter worse.', 'That is averaging — a different fix, often used alongside hysteresis.', 'Power cycling does nothing for chatter.'], xp: 10 },
      { id: 'q6', type: 'choice', prompt: 'Why does averaging several readings help?', choices: ['One unusual sample matters less when it is mixed with several ordinary ones', 'It makes the sensor more accurate physically', 'It uses less power', 'It speeds the robot up'], answer: 0, explanation: 'Averaging dilutes single noisy samples without changing the hardware.', choiceFeedback: [null, 'The sensor is unchanged — only how you use its output changes.', 'It costs slightly more time, not less power.', 'It slightly slows the loop, but buys reliability.'], xp: 10 },
      { id: 'q7', type: 'choice', prompt: 'A robot flickers its output rapidly. What does that most likely mean?', choices: ['The reading is sitting right at a single threshold and noise is crossing it', 'The battery is dead', 'The code will not compile', 'The motor is jammed'], answer: 0, explanation: 'Chatter at a threshold is the classic signature of a missing dead zone.', choiceFeedback: [null, 'A dead battery gives no output at all, not rapid flicker.', 'Code that will not compile never runs.', 'A jammed motor is a mechanical fault with different symptoms.'], xp: 10 },
      { id: 'q8', type: 'choice', prompt: 'Why set thresholds from measurements rather than from a datasheet figure?', choices: ['The real room produces different readings than nominal figures predict', 'Datasheets are usually wrong', 'Measuring is faster', 'Datasheets are hard to find'], answer: 0, explanation: 'Nominal values are typical, not yours — your wiring, supply, and lighting all shift the numbers.', choiceFeedback: [null, 'Datasheets are accurate about typical parts; your conditions are simply not typical.', 'Measuring takes longer — it is worth it anyway.', 'Availability is not the issue.'], xp: 10 },
      { id: 'q9', type: 'choice', prompt: 'Line-following robot jerks left and right constantly. Best first fix?', choices: ['Add a dead zone between the turn-left and turn-right thresholds', 'Double the motor speed', 'Use a wider strip of tape', 'Add a second robot'], answer: 0, explanation: 'A go-straight band between the two turn thresholds stops the thrashing.', choiceFeedback: [null, 'More speed makes the oscillation more violent.', 'Wider tape hides the symptom on one track and not others.', 'That is not a fix at all.'], xp: 10 },
      { id: 'q10', type: 'choice', prompt: 'Where else is hysteresis used?', choices: ['Thermostats, cruise control, and spacecraft attitude systems', 'Only in hobby robotics', 'Only in 3D printers', 'Nowhere outside classrooms'], answer: 0, explanation: 'It is the standard engineering answer to any signal that wobbles across a decision line.', choiceFeedback: [null, 'It is used at every level of engineering, up to flight hardware.', 'Printers use it too, but so does almost every control system.', 'It is a genuine, widely used technique.'], xp: 10 }
    ]
  },
  {
    id: 'rb7-actuators',
    subject: 'robotics',
    tier: 1,
    quarter: 'Q4 2026-2027',
    sequenceInQuarter: 3,
    title: 'Actuators: Making Something Actually Move',
    theme: 'DC motors, servos, and the difference between commanding a speed and commanding a position',
    novaIntro: {
      glossary: {
        'DC motor': 'A motor that spins continuously while power is applied. Give it more voltage and it spins faster; it has no idea where it is.',
        servo: 'A motor with a position sensor and a controller built into the same case. You tell it an ANGLE and it drives itself there and holds.',
        PWM: 'Pulse Width Modulation — switching a pin on and off very fast so that, on average, it behaves like a voltage in between.',
        'duty cycle': 'The fraction of each PWM cycle that the pin spends switched on, written as a percentage. 25% on means roughly a quarter of full power.',
        torque: 'Turning force. High torque means a motor can turn something heavy slowly; high speed and high torque rarely come in the same small package.'
      },
      beats: [
        {
          label: 'A DC motor holds a speed. A servo holds a position.',
          hook: 'Ask a DC motor to move exactly ninety degrees and it will cheerfully ignore you, because it has no idea what ninety degrees means.',
          teachingText:
            "Almost every mistake beginners make with robot motion comes from picking the wrong kind of actuator, so learn the split first. A DC MOTOR converts electricity into continuous spinning. Apply power and it turns; apply more and it turns faster; cut power and it coasts to a stop wherever momentum leaves it. What it does NOT have is any sense of position. It cannot tell you how far it has turned, because nothing inside it is measuring. A SERVO is a different animal: it is a small DC motor packaged together with a position sensor and a little control circuit, all in one case. You do not send a servo power levels — you send it an angle, and its internal controller compares where it is against where you asked for and drives the motor until those match, then holds against anything pushing back. The rule that follows is simple and worth memorizing. If the job is to keep going — a wheel, a fan, a drill — use a DC motor. If the job is to reach a specific place and stay there — a steering arm, a camera mount, a gripper, a control surface — use a servo. Choosing a DC motor for a positioning job means building the sensor and the controller yourself, which is exactly the work a servo already did for you.",
          example:
            "Look at a Mars rover and you can see both choices on one machine. The six wheels that carry Perseverance across Jezero Crater are driven by motors that just need to turn and keep turning — speed is what matters, not angle. But the mast that aims its cameras, and the steering actuators on the corner wheels, must go to a commanded angle and hold it while the rover bounces over rock. Those are position jobs, and they are built as position-controlled actuators for the same reason a servo exists.",
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'You are building a robotic arm that must reach out, stop at a precise angle, and hold a sample steady while a camera photographs it. Which actuator, and why?',
            choices: [
              'A servo, because the job is to reach a specific angle and hold it against load',
              'A DC motor, because it is stronger',
              'A DC motor, because it is simpler to wire',
              'Either one — they do the same thing at different speeds'
            ],
            answer: 0,
            explanation: 'Reaching an angle and holding it is the definition of a position job, and a servo already contains the sensor and controller that job needs.',
            choiceFeedback: [
              null,
              'Strength is about torque and gearing, not about motor type — and a strong motor that does not know where it is still cannot hold an angle.',
              'It is simpler to wire and far harder to use, because you would then have to add a position sensor and write the control loop yourself.',
              'They differ in kind, not in speed: one commands motion, the other commands position.'
            ]
          },
          practiceGeneratorId: 'gen-rb7-actuators',
          practiceCount: 3
        },
        {
          label: 'PWM: how an on-or-off pin produces half power',
          hook: 'A digital pin has exactly two settings, on and off. So how does a robot ever run a motor at forty percent?',
          teachingText:
            "A microcontroller pin cannot output half a voltage — it is a switch, and a switch is on or off. PULSE WIDTH MODULATION is the trick that gets around that, and it is one of the most useful ideas in all of robotics. Instead of holding the pin at some in-between level, you flip it on and off very fast — hundreds or thousands of times a second — and control the FRACTION of each cycle it spends switched on. That fraction is the DUTY CYCLE. At 100% duty the pin is simply on. At 0% it is simply off. At 50% it is on half of every cycle, and because the switching is far faster than a motor can physically respond, the motor cannot follow the individual pulses and instead behaves as though it were receiving about half the power. The motor is being fed a rapid stutter and is too slow to notice. On an Arduino, analogWrite() takes a number from 0 to 255 that sets the duty cycle, so analogWrite(128) is roughly half. The name is misleading and trips people up constantly: it is not analog output at all, it is fast digital switching that averages out to look analog. The same technique dims an LED, controls fan speed, and sets the brightness of the screen you are reading this on.",
          example:
            "The reason this matters beyond hobby projects is efficiency. A switch that is fully on or fully off wastes very little energy as heat, while a component that sits half-on to drop voltage turns the difference into waste heat. On a spacecraft, where every watt comes from a solar array and every watt of waste heat has to be radiated away, that difference is not a detail — it is the reason PWM is used to control power on flight hardware rather than the simpler-looking alternative.",
          applyItQuestion: {
            id: 'ai2',
            type: 'choice',
            prompt: 'A motor is driven at a 25% duty cycle and runs slowly. What is actually happening at the pin?',
            choices: [
              'The pin is switching fully on and fully off very fast, and is on about a quarter of the time',
              'The pin is holding steadily at about a quarter of the supply voltage',
              'The pin is on constantly but the motor is limited by a resistor',
              'The pin sends a quarter of the current the motor needs'
            ],
            answer: 0,
            explanation: 'PWM never produces an in-between voltage. It produces full on and full off, fast, and the motor averages it.',
            choiceFeedback: [
              null,
              'That would be true analog output, which a digital pin cannot do — this is exactly the misconception the name analogWrite creates.',
              'No resistor is involved, and a resistor would waste the difference as heat instead of switching.',
              'The pin does not meter current; it switches, and the duty cycle sets the average.'
            ]
          },
          practiceGeneratorId: 'gen-rb7-actuators',
          practiceCount: 3
        }
      ],
      connection:
        'How an aerospace engineer uses this: the split between commanding motion and commanding position runs all the way up to flight hardware. A turbopump is told a speed. A control surface, a solar array drive, a docking latch, a robotic arm joint — every one of those is told a position and must hold it against real forces, which means every one of them contains a sensor and a control loop, the same two things a hobby servo hides inside its case. When Stephanie Wilson operated Canadarm2, each joint she commanded was a position-controlled actuator holding an angle against the mass of whatever the arm was carrying.',
      // Dr. Carlotta A. Berry, PhD — "ESP32: Controlling a motor with PWM signal" (1:30).
      // Verified: playabilityStatus OK, author confirmed, on-topic for this lesson.
      videoUrl: 'https://www.youtube.com/watch?v=HKef_B6AQ_E'
    },
    questions: [
      { id: 'q1', type: 'choice', prompt: 'What does a DC motor fundamentally control?', choices: ['How fast it spins, for as long as power is applied', 'What angle it stops at', 'Its exact position', 'How much it weighs'], answer: 0, explanation: 'A DC motor is a speed device with no sense of where it is.', choiceFeedback: [null, 'It has no position sensor, so it cannot target an angle.', 'Position is exactly what it cannot know.', 'Weight is a physical property, not something a motor controls.'], xp: 10 },
      { id: 'q2', type: 'choice', prompt: 'What makes a servo different from a plain DC motor?', choices: ['It contains a position sensor and a controller, so it can drive itself to a commanded angle', 'It spins faster', 'It uses less electricity', 'It is always larger'], answer: 0, explanation: 'A servo is a motor plus the sensor and control loop needed to close the position loop.', choiceFeedback: [null, 'Servos are usually geared down and spin slower, trading speed for control and torque.', 'Power use depends on load, not on the type.', 'Hobby servos are typically small — size is not the distinction.'], xp: 10 },
      { id: 'q3', type: 'choice', prompt: 'What does PWM stand for, and what does it do?', choices: ['Pulse Width Modulation — switching on and off fast so the average acts like a level in between', 'Power Wire Management — routing power safely', 'Position Width Measurement — reading how far a motor turned', 'Pin Wave Mode — a special analog pin setting'], answer: 0, explanation: 'PWM controls the fraction of time a pin is on, and the load averages it.', choiceFeedback: [null, 'Not a real term — PWM is about signal timing, not wiring.', 'PWM is an output technique; it measures nothing.', 'There is no such mode, and the pin stays digital throughout.'], xp: 10 },
      { id: 'q4', type: 'choice', prompt: 'A pin runs at 75% duty cycle. What does that mean?', choices: ['It is switched on for about three quarters of every cycle and off for the rest', 'It outputs three quarters of a volt', 'It runs at three quarters the switching frequency', 'It is on three quarters of the pins'], answer: 0, explanation: 'Duty cycle is the fraction of each cycle spent on, nothing else.', choiceFeedback: [null, 'Duty cycle is a fraction of TIME, not a voltage level.', 'Frequency stays fixed; only the on-fraction changes.', 'Duty cycle describes one pin over time, not a count of pins.'], xp: 10 },
      { id: 'q5', type: 'choice', prompt: 'Why can a motor be driven at partial power by a pin that is only ever fully on or fully off?', choices: ['The switching is far faster than the motor can respond, so it averages the pulses', 'The pin secretly lowers its voltage', 'The motor has a built-in resistor', 'Motors ignore the off periods'], answer: 0, explanation: 'The motor is mechanically too slow to follow individual pulses, so it responds to the average.', choiceFeedback: [null, 'A digital pin cannot produce an intermediate voltage at all.', 'No resistor is involved, and one would waste energy as heat.', 'The off periods are exactly what reduces the average — they are not ignored.'], xp: 10 },
      { id: 'q6', type: 'choice', prompt: 'You need a wheel that turns continuously to drive a robot forward. Which actuator?', choices: ['A DC motor, because the job is continuous motion, not a target angle', 'A standard servo, because it is more precise', 'Neither — wheels need a stepper only', 'Either, since wheels do not care'], answer: 0, explanation: 'Continuous motion is a speed job, which is precisely what a DC motor is for.', choiceFeedback: [null, 'A standard servo only sweeps through a limited arc and cannot rotate continuously.', 'Steppers are one option but are not required for driving a wheel.', 'The choice matters: a standard servo physically cannot spin a drive wheel.'], xp: 10 },
      { id: 'q7', type: 'choice', prompt: 'What is torque?', choices: ['Turning force — how much twisting effort a motor can deliver', 'How fast a motor spins', 'How much current a motor draws at rest', 'The angle a servo can reach'], answer: 0, explanation: 'Torque is rotational force, and it trades against speed through gearing.', choiceFeedback: [null, 'That is rotational speed, which usually trades against torque.', 'Stall current is related but is a measure of electrical draw, not force.', 'That is a servo range specification, not a force.'], xp: 10 },
      { id: 'q8', type: 'choice', prompt: 'On an Arduino, analogWrite(128) on a PWM pin does what?', choices: ['Sets roughly a 50% duty cycle, since 128 is about half of 255', 'Outputs 128 volts', 'Reads an analog value of 128', 'Sets the pin to input mode'], answer: 0, explanation: 'analogWrite takes 0 to 255 and maps it onto the duty cycle.', choiceFeedback: [null, 'Nothing on the board approaches that voltage — the number is a duty scale.', 'Reading is analogRead; analogWrite only outputs.', 'Mode is set by pinMode, not by analogWrite.'], xp: 10 },
      { id: 'q9', type: 'choice', prompt: 'Why is PWM preferred over dropping voltage with a resistor on a power-limited machine?', choices: ['A fully-on or fully-off switch wastes very little energy as heat, while a resistor turns the difference into waste heat', 'PWM produces more torque', 'Resistors are hard to obtain', 'PWM is easier to wire'], answer: 0, explanation: 'Efficiency is the reason, and it matters most where power is scarce and heat is hard to shed.', choiceFeedback: [null, 'Torque comes from the motor and its gearing, not from the control method.', 'Resistors are cheap and everywhere — availability is not the issue.', 'PWM needs a driver circuit and is often more work to wire, not less.'], xp: 10 },
      { id: 'q10', type: 'choice', prompt: 'A robotic arm joint must hold a commanded angle while carrying a load. What must exist inside that system?', choices: ['A position sensor and a control loop comparing actual angle against commanded angle', 'A larger battery', 'A faster microcontroller', 'A second motor for backup'], answer: 0, explanation: 'Holding a position against load is closed-loop control, which requires measuring the actual position.', choiceFeedback: [null, 'More energy does not tell the joint where it currently is.', 'Speed of computation does not substitute for measurement.', 'Redundancy is a reliability choice, not what makes position holding possible.'], xp: 10 }
    ]
  },
  {
    id: 'rb7-microcontrollers',
    subject: 'robotics',
    tier: 1,
    quarter: 'Q4 2026-2027',
    sequenceInQuarter: 4,
    title: 'Microcontrollers: The Loop That Never Ends',
    theme: 'setup and loop, pin modes, and why a robot program is written to run forever',
    novaIntro: {
      glossary: {
        microcontroller: 'A whole small computer on one chip — processor, memory, and input/output pins — built to run a single program continuously rather than to run apps.',
        'setup()': 'The Arduino function that runs exactly once when the board powers on. Configuration goes here.',
        'loop()': 'The Arduino function that runs over and over, forever, as fast as it can, for as long as the board has power.',
        pinMode: 'The instruction that declares whether a pin will listen (INPUT) or drive (OUTPUT). A pin has no fixed direction until you set one.',
        sketch: 'The Arduino name for a program.'
      },
      beats: [
        {
          label: 'setup() runs once. loop() never stops.',
          hook: 'Every program you have written so far was built to finish. A robot program is built never to finish, and that changes how you think about it.',
          teachingText:
            "A MICROCONTROLLER is a complete little computer on a single chip, and unlike the machine on your desk it does not run many programs, does not have a desktop, and does not wait for you to click anything. It powers on, runs one program, and keeps running it until the power goes away. Arduino organizes that program into exactly two functions, and understanding the split is most of what you need. SETUP() runs one time, immediately at power-on. It is where you declare things that only need saying once — which pins are inputs, which are outputs, opening a serial connection. LOOP() runs immediately after setup finishes, and when it reaches its last line it starts again at its first, forever, thousands of times per second. Nothing calls it. Nothing stops it. That structure is not an Arduino quirk, it is the sense-decide-act cycle from your first lesson written directly into the shape of the program: every pass through loop() is one turn of sensing, deciding, and acting. If a robot is a machine that keeps responding to a changing world, then its program has to be one that keeps running, because a program that finishes is a robot that has stopped paying attention.",
          example:
            "Flight software works the same way and calls it the control loop. The software flying a rocket runs its cycle at a fixed rate — read the sensors, compute the correction, command the engines, repeat — and it does not exit until the mission phase ends. The consequence engineers care about is that everything inside the loop must finish before the next pass is due. One slow step delays every other decision behind it, which is why nothing that could block indefinitely is allowed inside a real control loop.",
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'You put the line that sets pin 9 as an output inside loop() instead of setup(). What happens?',
            choices: [
              'It still works, but the board wastefully re-declares the same thing thousands of times a second',
              'The program refuses to compile',
              'Pin 9 becomes an input instead',
              'The board resets on every pass'
            ],
            answer: 0,
            explanation: 'It is legal and it works, but configuration belongs in setup precisely because it only needs to happen once.',
            choiceFeedback: [
              null,
              'It is valid code in either place — the compiler has no objection.',
              'The instruction says OUTPUT, so it sets output; the location does not flip it.',
              'Nothing about calling pinMode causes a reset.'
            ]
          },
          practiceGeneratorId: 'gen-rb7-microcontrollers',
          practiceCount: 3
        },
        {
          label: 'A pin is an input or an output only because you said so',
          hook: 'The pins on a microcontroller do not arrive knowing what they are for. That is your job, and forgetting it produces some of the most confusing bugs in robotics.',
          teachingText:
            "A pin is a numbered connection between the chip and the world, and the same physical pin can either LISTEN or DRIVE — but not both at once, and never until you have declared which. PINMODE is that declaration, and it is the single most commonly forgotten line in beginner robotics. Set a pin to INPUT and it reads whatever voltage is present without pushing any of its own. Set it to OUTPUT and it actively drives that pin high or low, supplying current to whatever is attached. The reason this must be explicit is that getting it wrong does not usually announce itself. Wire a button to a pin, forget pinMode, and the pin sits in a floating state — connected to nothing definite, picking up electrical noise from the air, reporting HIGH and LOW at random. Nothing errors. Nothing crashes. The robot simply behaves strangely, and you go looking for a fault in your logic that was never there. There is a second distinction to keep straight alongside this one: digital pins deal in two states, HIGH and LOW, while analog input pins report a range of values. Which kind of pin a sensor needs is decided by the sensor, not by preference.",
          example:
            "Declaring the direction of every connection before use is not a beginner-only discipline. On flight hardware, every interface is defined in a document that states which side drives each line and what happens if nobody does, precisely because an undriven line does not fail loudly — it floats, and a floating line read as a command is how a system does something nobody ordered. The habit of writing pinMode for every pin is the same habit at a much smaller scale.",
          applyItQuestion: {
            id: 'ai2',
            type: 'choice',
            prompt: 'A button is wired to a pin, but pinMode was never called for it. Readings come back HIGH and LOW at random even when nobody touches the button. Why?',
            choices: [
              'The pin is floating — not held at any definite voltage — so it picks up electrical noise',
              'The button is broken',
              'The board is out of memory',
              'Buttons must always be wired to analog pins'
            ],
            answer: 0,
            explanation: 'An undeclared pin is connected to nothing definite, and a floating input reports noise as though it were data.',
            choiceFeedback: [
              null,
              'A broken button gives a stuck reading, not a randomly changing one.',
              'Memory exhaustion causes crashes and resets, not noisy pin reads.',
              'Buttons are two-state devices and belong on digital pins.'
            ]
          },
          practiceGeneratorId: 'gen-rb7-microcontrollers',
          practiceCount: 3
        }
      ],
      connection:
        'How an aerospace engineer uses this: the never-ending loop and the explicitly declared interface are both flight-software practice, not training-wheel simplifications. Real control software runs a fixed-rate loop and is written so that every step inside it completes in a bounded time, because a late decision is a wrong decision when the vehicle has already moved. And every signal line is documented with a declared direction and a defined behaviour when undriven, for the same reason forgetting pinMode produces phantom button presses: a floating line is not silent, it is noisy, and noise read as a command is how machines do things nobody asked for.',
      // Dr. Carlotta A. Berry, PhD — "ESP32 Digital versus PWM LEDs" (0:34).
      // Verified: playabilityStatus OK, author confirmed, on-topic for this lesson.
      videoUrl: 'https://www.youtube.com/watch?v=XmZKM5FBR90'
    },
    questions: [
      { id: 'q1', type: 'choice', prompt: 'How often does setup() run?', choices: ['Exactly once, when the board powers on or resets', 'Once per pass through loop()', 'Every time a sensor changes', 'Continuously, like loop()'], answer: 0, explanation: 'setup is for one-time configuration at start.', choiceFeedback: [null, 'That describes loop itself, not setup.', 'Sensors do not trigger setup — it runs at power-on only.', 'Running forever is what loop does; setup runs once.'], xp: 10 },
      { id: 'q2', type: 'choice', prompt: 'What happens when loop() reaches its last line?', choices: ['It starts again at its first line, and keeps doing so while the board has power', 'The program ends', 'The board resets', 'It waits for a button press'], answer: 0, explanation: 'loop repeats endlessly by design — that is the whole point.', choiceFeedback: [null, 'A robot program is written never to finish.', 'Reaching the end of loop is normal, not a reset condition.', 'Nothing waits unless you write code that waits.'], xp: 10 },
      { id: 'q3', type: 'choice', prompt: 'What does pinMode do?', choices: ['Declares whether a pin will listen as an input or drive as an output', 'Sets how much voltage a pin outputs', 'Chooses which pin number to use', 'Sets the speed of the processor'], answer: 0, explanation: 'A pin has no direction until pinMode gives it one.', choiceFeedback: [null, 'Voltage level is set by digitalWrite or analogWrite, not pinMode.', 'The pin number is an argument you pass, not something pinMode picks.', 'Clock speed is unrelated.'], xp: 10 },
      { id: 'q4', type: 'choice', prompt: 'What is a floating pin?', choices: ['An input not held at any definite voltage, so it reports electrical noise as data', 'A pin that has come loose from the board', 'A pin set to output', 'A pin reading exactly half the supply voltage'], answer: 0, explanation: 'Floating means undriven and undefined, which reads as random noise.', choiceFeedback: [null, 'This is an electrical state, not physical damage.', 'An output is actively driven, which is the opposite of floating.', 'A floating pin does not settle at any particular value — that is the problem.'], xp: 10 },
      { id: 'q5', type: 'choice', prompt: 'Why is forgetting pinMode such a hard bug to find?', choices: ['Nothing errors or crashes — the robot just behaves strangely, so you look for a logic fault that does not exist', 'It prevents the sketch from uploading', 'It erases the program', 'It always burns out the pin'], answer: 0, explanation: 'Silent failures are the dangerous kind, because they send you hunting in the wrong place.', choiceFeedback: [null, 'The sketch uploads and runs perfectly well.', 'Nothing is erased.', 'No damage occurs; the reading is simply meaningless.'], xp: 10 },
      { id: 'q6', type: 'choice', prompt: 'What is a microcontroller?', choices: ['A complete small computer on one chip, built to run a single program continuously', 'A type of motor', 'A sensor that measures control signals', 'A power supply for robots'], answer: 0, explanation: 'Processor, memory and pins on one chip, dedicated to one program.', choiceFeedback: [null, 'Motors are actuators; the microcontroller commands them.', 'It reads sensors but is not one itself.', 'It needs a power supply; it is not one.'], xp: 10 },
      { id: 'q7', type: 'choice', prompt: 'Which belongs in setup() rather than loop()?', choices: ['Declaring that pin 9 is an output', 'Reading a distance sensor', 'Deciding whether to turn', 'Driving a motor'], answer: 0, explanation: 'Configuration happens once; sensing, deciding and acting happen every pass.', choiceFeedback: [null, 'Sensor readings must be taken repeatedly to be useful.', 'Decisions depend on fresh readings, so they belong in the loop.', 'Actions respond to decisions and repeat every pass.'], xp: 10 },
      { id: 'q8', type: 'choice', prompt: 'Why must every step inside a real control loop finish in a bounded time?', choices: ['A slow step delays every decision behind it, and a late decision is a wrong one when the vehicle has already moved', 'Long steps use more memory', 'The compiler enforces a time limit', 'Loops can only run a fixed number of times'], answer: 0, explanation: 'Timeliness is part of correctness in a control system.', choiceFeedback: [null, 'Duration and memory use are separate concerns.', 'No compiler enforces this — it is a design discipline.', 'The loop runs indefinitely; there is no built-in count.'], xp: 10 },
      { id: 'q9', type: 'choice', prompt: 'What is the difference between a digital pin and an analog input pin?', choices: ['A digital pin deals in two states; an analog input reports a value across a range', 'Analog pins are faster', 'Digital pins cannot be outputs', 'Analog pins use less power'], answer: 0, explanation: 'Two states versus a range — and the sensor decides which you need.', choiceFeedback: [null, 'Analog reads are typically slower, since conversion takes time.', 'Digital pins are commonly used as outputs.', 'Power draw is not the distinction.'], xp: 10 },
      { id: 'q10', type: 'choice', prompt: 'Why is the setup-then-endless-loop structure a good fit for a robot?', choices: ['Each pass through the loop is one turn of sense, decide, act — a robot that stops looping stops responding', 'It makes the code shorter', 'It saves battery power', 'It is the only structure microcontrollers allow'], answer: 0, explanation: 'The program structure mirrors the definition of a robot.', choiceFeedback: [null, 'Length is not the point, and the structure does not shorten anything.', 'Running continuously uses more power, not less.', 'Other structures exist; this one fits the problem.'], xp: 10 }
    ]
  },
  {
    id: 'rb7-programming',
    subject: 'robotics',
    tier: 1,
    quarter: 'Q4 2026-2027',
    sequenceInQuarter: 5,
    title: 'Programming I: Sequence and Choice',
    theme: 'Order, conditionals, and how a robot makes a decision out of a number',
    novaIntro: {
      glossary: {
        sequence: 'The order instructions run in. A program is not a list of things that are true — it is a list of things that happen, one after another.',
        conditional: 'An instruction that runs only when a test passes. In code, an if statement.',
        'comparison operator': 'A symbol that compares two values and produces true or false: > greater than, < less than, == equal to, != not equal to.',
        boolean: 'A value that is only ever true or false. Every conditional test produces one.',
        'else': 'The branch that runs when the if test is false, guaranteeing exactly one of the two paths is taken.'
      },
      beats: [
        {
          label: 'A program is a sequence, and the order carries the meaning',
          hook: 'Swap two correct lines and you get a program made entirely of correct instructions that does the wrong thing.',
          teachingText:
            "A program is an ordered SEQUENCE of instructions, and the order is not a formatting detail — it is part of what the program means. This sounds obvious and is the source of an enormous share of real robot bugs, because every individual line can be perfectly correct while the sequence as a whole is wrong. Read the sensor, then decide, then act: that order works. Decide, then read the sensor, then act: every line is still valid code, nothing errors, and the robot now makes every decision using the reading from the PREVIOUS pass through the loop. It is one step behind the world forever, and it will look almost right, which is what makes it hard to find. The discipline that prevents this is to write down what must be true before each step can be meaningful. A decision needs a fresh reading, so reading comes first. An action needs a decision, so the decision comes before it. Once you state those dependencies out loud, the correct order is forced rather than guessed at, and you stop relying on the order feeling right.",
          example:
            "The order of operations in a launch sequence is not a preference either, and for the same reason. Release the hold-down clamps before the engines have reached full thrust and the vehicle does not lift cleanly; reach full thrust and never release, and it does not lift at all. Both instructions are correct. Only one order produces a launch, which is why the sequence itself is verified as carefully as any single step in it.",
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'A robot decides which way to turn, THEN reads its distance sensor, then turns. Every line compiles and runs. What is wrong?',
            choices: [
              'Each decision uses the reading from the previous pass, so the robot is permanently one step behind the world',
              'Nothing — the same instructions are all present',
              'The sensor will return an error because it is read too late',
              'The robot will never turn at all'
            ],
            answer: 0,
            explanation: 'A decision made before the reading it depends on is a decision based on stale data. It runs fine and behaves subtly wrongly.',
            choiceFeedback: [
              null,
              'Presence is not enough — a decision that precedes its input is using old information.',
              'The sensor reads normally; the problem is when the value gets used, not whether it works.',
              'It turns; it just turns based on where the world was last pass.'
            ]
          },
          practiceGeneratorId: 'gen-rb7-programming',
          practiceCount: 3
        },
        {
          label: 'if and else: turning a number into a decision',
          hook: 'A sensor hands you 412. Nothing about 412 tells the robot to stop. You are the one who decides what 412 means.',
          teachingText:
            "A CONDITIONAL is how a robot converts a measurement into an action, and it is the piece that makes the decide step of sense-decide-act real. An if statement tests something and runs its block only when that test is true. The test is built with a COMPARISON OPERATOR — greater than, less than, equal to, not equal to — and it always produces a BOOLEAN, a value that is only ever true or false. There is no maybe. Two details cause most of the trouble here. First, a single equals sign assigns a value while a double equals sign compares two, and confusing them produces code that quietly overwrites what it meant to check. Second, an if with no ELSE has a silent do-nothing path: when the test fails, execution simply carries on and the robot takes no action at all. Sometimes that is exactly right. Often it is a case nobody thought about, which is why writing else explicitly is a good habit even when it feels unnecessary — it forces you to say out loud what should happen in the other situation, and a robot that meets a situation its author never considered does nothing, which is rarely the safe choice.",
          example:
            "This is where the threshold work from Sensors II becomes code. The measured numbers gave you a dividing line; the conditional is the line written down and acted on. And when you add a dead zone for hysteresis, you are writing three branches rather than two — above the upper threshold do one thing, below the lower do another, and in between deliberately do nothing — which is a conditional structure expressing an engineering decision, not just a programming construct.",
          applyItQuestion: {
            id: 'ai2',
            type: 'choice',
            prompt: 'A robot has: if (distance < 20) { stop(); } and no else. The distance reads 45. What happens?',
            choices: [
              'The test is false, the block is skipped, and the robot takes no action at all in this pass',
              'The robot stops anyway',
              'The program throws an error because there is no else',
              'The robot reverses'
            ],
            answer: 0,
            explanation: 'An if with no else has a silent do-nothing path. Whether that is correct depends entirely on whether you intended it.',
            choiceFeedback: [
              null,
              'stop() sits inside the block, and the block only runs when the test passes.',
              'else is optional in every language here — its absence is legal and silent, which is the danger.',
              'Nothing in the code says to reverse.'
            ]
          },
          practiceGeneratorId: 'gen-rb7-programming',
          practiceCount: 3
        }
      ],
      connection:
        'How an aerospace engineer uses this: flight software is reviewed line by line for exactly the two failures in this lesson. Sequence is checked because an instruction that runs before the data it depends on produces a vehicle acting on stale state, and stale state at launch speeds is a long way from where the vehicle actually is. Untested branches are checked because the case nobody wrote an else for is the case that shows up once, in flight, and finds the software with no instruction for it. Both are reasons real flight code is required to handle every branch explicitly rather than letting a failed test quietly fall through.',
      // Dr. Carlotta A. Berry, PhD — "ESP32: Serial Input LED Blink Rate programmed 2 / Arduino IDE" (0:57).
      // Verified: playabilityStatus OK, author confirmed, on-topic for this lesson.
      videoUrl: 'https://www.youtube.com/watch?v=xQf_2qWv5nk'
    },
    questions: [
      { id: 'q1', type: 'choice', prompt: 'Besides its mechanical parts, what must a robot have to perform tasks automatically?', choices: ['A program — instructions that turn sensor readings into actions', 'A larger battery', 'A remote control', 'More motors'], answer: 0, explanation: 'The program is the decide step; without it the mechanics have nothing directing them.', choiceFeedback: [null, 'Power runs the parts but never decides what to do with them.', 'A remote control makes it operated, which is the opposite of automatic.', 'More actuators without a program is more machine, not more robot.'], xp: 10 },
      { id: 'q2', type: 'choice', prompt: 'What is a sequence in programming?', choices: ['The order instructions run in, which is part of what the program means', 'A list of variable names', 'The speed the processor runs at', 'A kind of sensor'], answer: 0, explanation: 'Order carries meaning — the same lines in a different order are a different program.', choiceFeedback: [null, 'Names are labels; sequence is about order of execution.', 'Clock speed affects how fast, not in what order.', 'Sequence is a code concept, not hardware.'], xp: 10 },
      { id: 'q3', type: 'choice', prompt: 'Why can a program made of entirely correct lines still be wrong?', choices: ['Because the order can be wrong, so a step runs before the information it depends on exists', 'Because correct lines cannot be wrong', 'Because the compiler reorders them randomly', 'Because comments change behaviour'], answer: 0, explanation: 'Correctness of the parts does not guarantee correctness of the arrangement.', choiceFeedback: [null, 'A set of valid instructions in the wrong order is a classic and very real bug.', 'Compilers preserve the meaning of your order; they do not shuffle logic.', 'Comments are ignored at run time.'], xp: 10 },
      { id: 'q4', type: 'choice', prompt: 'What does a comparison operator produce?', choices: ['A boolean — true or false, never anything in between', 'The larger of the two values', 'A number from 0 to 1023', 'An average of the two values'], answer: 0, explanation: 'Comparisons answer a yes-or-no question, and conditionals branch on that answer.', choiceFeedback: [null, 'It reports the relationship, not one of the operands.', 'That is the range of an analog reading, not a comparison result.', 'No arithmetic is performed on the operands.'], xp: 10 },
      { id: 'q5', type: 'choice', prompt: 'What is the difference between = and == ?', choices: ['A single equals assigns a value; a double equals compares two values', 'They are identical', 'Single equals is for numbers, double for text', 'Double equals is a typo that always errors'], answer: 0, explanation: 'Confusing them means overwriting a value where you meant to test it.', choiceFeedback: [null, 'They do genuinely different things, and mixing them up is a common silent bug.', 'Both work across types; the difference is assign versus compare.', 'Double equals is the correct comparison operator.'], xp: 10 },
      { id: 'q6', type: 'choice', prompt: 'An if statement has no else and its test is false. What happens?', choices: ['Nothing in that block runs, and execution simply continues — a silent do-nothing path', 'An error is raised', 'The block runs anyway', 'The loop restarts immediately'], answer: 0, explanation: 'The absence of else is legal and silent, which is exactly why it hides unconsidered cases.', choiceFeedback: [null, 'Omitting else is valid code, not an error.', 'The block is skipped precisely because the test failed.', 'Execution continues to the next line, not to a restart.'], xp: 10 },
      { id: 'q7', type: 'choice', prompt: 'Why is writing an explicit else a good habit even when it seems unnecessary?', choices: ['It forces you to state what should happen in the other case, instead of silently doing nothing', 'It makes the program run faster', 'It is required by the compiler', 'It reduces memory use'], answer: 0, explanation: 'A robot that meets an unconsidered case does nothing, and doing nothing is rarely the safe choice.', choiceFeedback: [null, 'It has no meaningful effect on speed.', 'It is optional in every language used here.', 'Memory use is unaffected.'], xp: 10 },
      { id: 'q8', type: 'choice', prompt: 'A robot has if (light > 700) turnOn(); The sensor reads 640. What does it do?', choices: ['Nothing — the test is false, so the block is skipped', 'Turns on, because 640 is close to 700', 'Errors, because 640 is below the threshold', 'Turns on and then off'], answer: 0, explanation: 'A comparison is exact; close does not pass the test.', choiceFeedback: [null, 'Closeness does not count — the test is strictly greater than.', 'A false test is a normal outcome, not an error.', 'Nothing in the code turns anything off.'], xp: 10 },
      { id: 'q9', type: 'choice', prompt: 'How does a conditional relate to a sensor threshold?', choices: ['The threshold is the number you chose; the conditional is that choice written as code and acted on', 'They are unrelated', 'A conditional sets the sensor range', 'A threshold replaces the need for conditionals'], answer: 0, explanation: 'Thresholds are the engineering decision; conditionals are how the robot enacts it.', choiceFeedback: [null, 'The conditional is exactly where a threshold becomes behaviour.', 'The sensor range is fixed by hardware.', 'A threshold is meaningless until something tests against it.'], xp: 10 },
      { id: 'q10', type: 'choice', prompt: 'Implementing hysteresis in code means writing:', choices: ['Three branches — above the upper threshold, below the lower one, and a deliberate do-nothing band in between', 'One if statement', 'A faster loop', 'Two sensors'], answer: 0, explanation: 'The dead zone is a real branch that intentionally takes no action.', choiceFeedback: [null, 'A single test is exactly the one-threshold design that chatters.', 'Loop speed does not create a dead zone.', 'Hysteresis is about thresholds, not about adding hardware.'], xp: 10 }
    ]
  },
  {
    id: 'rb7-programming-2',
    subject: 'robotics',
    tier: 1,
    quarter: 'Q4 2026-2027',
    sequenceInQuarter: 6,
    title: 'Programming II: Memory, Autonomy, and Failing Safely',
    theme: 'State between passes, combining sensors, and what a robot does when something goes wrong',
    novaIntro: {
      glossary: {
        'state variable': 'A value the robot keeps between passes through the loop, so it can remember what happened before.',
        autonomy: 'Deciding and acting on board, without a human in the loop, because no human can respond fast enough or at all.',
        'fail-safe': 'A behaviour deliberately chosen for when something goes wrong, picked so that the failure does the least harm.',
        'sensor fusion': 'Combining readings from more than one sensor so the weaknesses of each are covered by the others.',
        iteration: 'Repeating a block of instructions — the for and while loops that repeat work inside a single pass.'
      },
      beats: [
        {
          label: 'State: what the robot remembers between passes',
          hook: 'loop() runs thousands of times a second and forgets everything each time. So how does a robot ever know it has already done something?',
          teachingText:
            "Every pass through loop() starts fresh, and any value created inside it vanishes when that pass ends. That is fine for a robot that only reacts to right now, and useless for a robot that needs to know what just happened. A STATE VARIABLE is a value declared OUTSIDE the loop so that it survives from one pass to the next, and it is what gives a robot memory. The difference this makes is enormous. Without state, a robot can answer is there something in front of me. With state it can answer questions no single reading can: have I already picked this up, which direction was I turning before I stalled, is this the third time in a row the sensor has said the same thing. Counting, detecting a change rather than a level, and running through a series of steps in order all require remembering. The most common beginner version of this is detecting a button PRESS rather than a button being HELD: with no memory the robot sees held-down as a fresh press on every one of thousands of passes per second, and fires the action thousands of times. Store what the button read last pass, compare it to now, and act only when it changed — that comparison is impossible without state.",
          example:
            "Ingenuity, the helicopter that flew on Mars, could not be flown by anyone on Earth. The radio delay alone made human control impossible, so the entire flight — climb, translate, hover, land — had to be carried out by software that knew which phase of the flight it was in. That knowledge is state. A machine with only its current sensor readings and no memory of what it is partway through cannot execute a sequence at all.",
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'A robot should count how many times a button is pressed, but it counts thousands per second whenever the button is held. What is missing?',
            choices: [
              'A state variable holding what the button read last pass, so the code can count only when the reading CHANGES',
              'A faster processor',
              'A second button',
              'A larger battery'
            ],
            answer: 0,
            explanation: 'Without memory of the previous reading, held-down looks like a brand new press on every single pass through the loop.',
            choiceFeedback: [
              null,
              'A faster processor makes it count even faster — speed is the symptom, not the cause.',
              'One button is enough; what is missing is memory, not hardware.',
              'Power has nothing to do with detecting a change.'
            ]
          },
          practiceGeneratorId: 'gen-rb7-programming-2',
          practiceCount: 3
        },
        {
          label: 'Autonomy means deciding what to do when things go wrong',
          hook: 'Autonomy is not the impressive part. Deciding in advance how to fail is.',
          teachingText:
            "AUTONOMY means the robot decides and acts on board, without waiting for a human — and it is required whenever no human can respond in time, which on Mars means always. But autonomy creates an obligation: if nobody is watching, the robot must handle its own problems, so somebody has to decide in advance what it does when something goes wrong. That decision is a FAIL-SAFE, and the word safe is doing real work. A fail-safe is not a repair and does not fix anything. It is the behaviour chosen because it does the least harm when the situation is already bad. Stopping when an obstacle sensor fires is a fail-safe. So is holding position when a reading becomes implausible, rather than driving on using a number you no longer trust. The companion technique is SENSOR FUSION: combining several sensors so their weaknesses do not line up. A camera is defeated by darkness; an ultrasonic sensor does not care about light but is fooled by soft or angled surfaces that scatter its pulse. Together they cover situations neither survives alone, and just as importantly, when two sensors disagree the robot has learned something a single sensor could never tell it — that one of them is wrong, and this is a moment to be careful.",
          example:
            "Perseverance drives itself across terrain no one has walked, and its most important autonomous behaviour is knowing when to stop. If the navigation solution stops making sense, the rover halts and waits for Earth. Waiting costs a day; guessing costs the mission. That trade is the whole logic of a fail-safe: the safe action is chosen not because it accomplishes the goal but because it protects the vehicle when the information needed to accomplish the goal has become unreliable.",
          applyItQuestion: {
            id: 'ai2',
            type: 'choice',
            prompt: 'A robot uses a camera and an ultrasonic sensor. In a dark room they disagree about whether the path is clear. What has the robot actually learned?',
            choices: [
              'That one reading is unreliable right now, which is a reason to take the cautious action rather than pick a winner',
              'That both sensors are broken and need replacing',
              'That it should average the two readings',
              'That it should ignore the ultrasonic sensor'
            ],
            answer: 0,
            explanation: 'Disagreement is information a single sensor could never provide, and the right response to untrustworthy data is caution, not a coin toss.',
            choiceFeedback: [
              null,
              'Disagreement in the dark is expected behaviour for a camera, not evidence of a fault.',
              'Averaging a good reading with a bad one produces a number that is wrong and looks confident.',
              'The ultrasonic sensor is the one that still works in darkness — it is the camera that is impaired.'
            ]
          },
          practiceGeneratorId: 'gen-rb7-programming-2',
          practiceCount: 3
        }
      ],
      connection:
        'How an aerospace engineer uses this: every autonomous flight system is built around the two ideas in this lesson. State is how a vehicle knows which phase of flight it is in, and a vehicle that does not know whether it is ascending or descending cannot choose a correct action from sensor readings alone. Fail-safes are written before launch, argued over, and tested, because the entire point is that nobody will be available to improvise. And redundant, differently-designed sensors are standard on flight hardware for exactly the reason two sensors are better than one here: identical sensors fail identically, and the disagreement between unlike sensors is often the first warning that something is wrong.',
      // Dr. Carlotta A. Berry, PhD — "ESP32: For Loops and Arrays to Control Four LEDs" (0:29).
      // Verified: playabilityStatus OK, author confirmed, on-topic for this lesson.
      videoUrl: 'https://www.youtube.com/watch?v=qAp9qN33JIo'
    },
    questions: [
      { id: 'q1', type: 'choice', prompt: 'What is a control loop in robotics?', choices: ['A cycle that repeatedly senses, decides, and acts to keep adjusting behaviour', 'A loop of wire carrying control signals', 'A single decision made once at startup', 'A physical ring the robot drives around'], answer: 0, explanation: 'The control loop is sense-decide-act, repeated continuously.', choiceFeedback: [null, 'It is a software cycle, not wiring.', 'Repetition is the essential feature — one decision is not a loop.', 'It describes program structure, not a path.'], xp: 10 },
      { id: 'q2', type: 'choice', prompt: 'What is a state variable?', choices: ['A value kept outside the loop so it survives from one pass to the next', 'A variable that stores the country the robot is in', 'A sensor reading taken once at startup', 'A constant that never changes'], answer: 0, explanation: 'State is memory across passes, and it is what lets a robot know what already happened.', choiceFeedback: [null, 'State here means the condition of the system, not a location.', 'A one-time reading is not updated as things change.', 'State exists precisely so it can change and be remembered.'], xp: 10 },
      { id: 'q3', type: 'choice', prompt: 'Why does a robot with no memory count a held button thousands of times?', choices: ['Each pass sees the button as down and has nothing to compare against, so every pass looks like a new press', 'The button bounces mechanically', 'The processor is too fast', 'The battery voltage fluctuates'], answer: 0, explanation: 'Detecting a change requires knowing the previous value, which requires state.', choiceFeedback: [null, 'Bounce is a real and separate problem, but it causes a few extra counts, not thousands per second.', 'Speed determines how many times, not why it counts at all.', 'Voltage is unrelated to this logic error.'], xp: 10 },
      { id: 'q4', type: 'choice', prompt: 'What does autonomous navigation mean?', choices: ['The robot decides its own path on board, without waiting for human commands', 'The robot follows a pre-drawn line', 'A human drives it remotely', 'It moves only when told to'], answer: 0, explanation: 'Autonomy means the deciding happens on the vehicle.', choiceFeedback: [null, 'Line following is one technique and can be done with almost no autonomy.', 'Remote driving is the opposite of autonomous.', 'Waiting to be told is teleoperation.'], xp: 10 },
      { id: 'q5', type: 'choice', prompt: 'Why do engineers program a fail-safe such as stopping when an obstacle is detected?', choices: ['Because nobody is watching, so the least-harmful action must be chosen in advance', 'Because stopping fixes the problem', 'Because it saves battery', 'Because it is required by law'], answer: 0, explanation: 'A fail-safe does not repair anything; it limits damage when things are already wrong.', choiceFeedback: [null, 'Stopping resolves nothing — it prevents the situation getting worse.', 'Energy use is not the reason.', 'It is an engineering practice, not a legal requirement.'], xp: 10 },
      { id: 'q6', type: 'choice', prompt: 'Why use a camera and a distance sensor together rather than just one?', choices: ['Their weaknesses differ, so together they cover situations neither handles alone', 'Two sensors are always twice as accurate', 'It makes the robot faster', 'One is a backup that is never used'], answer: 0, explanation: 'Sensor fusion is about covering different failure modes, not about doubling precision.', choiceFeedback: [null, 'Accuracy does not simply double — the gain is in coverage of different conditions.', 'More sensing costs time rather than saving it.', 'Both are used continuously; this is not standby redundancy.'], xp: 10 },
      { id: 'q7', type: 'choice', prompt: 'Two sensors disagree. What is the most useful thing this tells the robot?', choices: ['That at least one reading is currently untrustworthy, which is a reason to act cautiously', 'That it should always trust the newer sensor', 'That both readings should be averaged', 'That the robot should shut down permanently'], answer: 0, explanation: 'Disagreement is genuine information that a single sensor could never provide.', choiceFeedback: [null, 'Newer is not the same as correct in the present conditions.', 'Averaging a reliable value with an unreliable one hides the problem.', 'A fail-safe is usually to pause or hold, not to end the mission.'], xp: 10 },
      { id: 'q8', type: 'choice', prompt: 'Why do robotics programs use loops that continuously check sensor readings?', choices: ['Because the world keeps changing, so a decision made once is out of date almost immediately', 'Because loops make code shorter', 'Because sensors only work inside loops', 'Because it uses less memory'], answer: 0, explanation: 'Continuous checking is what keeps the robot responding to the world as it is now.', choiceFeedback: [null, 'Brevity is a side effect, not the purpose.', 'Sensors can be read anywhere; the loop is about staying current.', 'Repetition does not reduce memory use.'], xp: 10 },
      { id: 'q9', type: 'choice', prompt: 'A robot must remember which phase of a task it is partway through. What does it need?', choices: ['State — a value kept outside the loop tracking the current phase', 'A faster sensor', 'More motors', 'A longer cable'], answer: 0, explanation: 'Running through steps in order is impossible without remembering which step you are on.', choiceFeedback: [null, 'Sensors report now; they say nothing about what came before.', 'Actuators act but do not remember.', 'Physical connections are unrelated to memory.'], xp: 10 },
      { id: 'q10', type: 'choice', prompt: 'Why is a rover that stops when its navigation stops making sense behaving correctly?', choices: ['Waiting costs a day, while driving on bad data can cost the mission', 'Stopping recharges the batteries', 'It is faster overall', 'Stopping repairs the sensors'], answer: 0, explanation: 'The safe action is chosen for what it protects, not for what it accomplishes.', choiceFeedback: [null, 'Charging is unrelated to the decision to halt.', 'It is deliberately slower, and that is the accepted cost.', 'Nothing is repaired by stopping.'], xp: 10 }
    ]
  },
  {
    id: 'rb7-feedback',
    subject: 'robotics',
    tier: 1,
    quarter: 'Q4 2026-2027',
    sequenceInQuarter: 7,
    title: 'Feedback: Closing the Loop',
    theme: 'Open-loop versus closed-loop control, error, and why a line-following robot is the whole idea in miniature',
    novaIntro: {
      glossary: {
        'open-loop': 'Commanding an action and never checking the result. The machine assumes it worked.',
        'closed-loop': 'Commanding an action, measuring what actually happened, and correcting the difference. The loop is closed by the measurement.',
        feedback: 'Sending the measured result back into the decision, so the next command accounts for what really occurred.',
        error: 'The difference between where you wanted to be and where you actually are. Control systems act on this number.',
        'proportional control': 'Correcting by an amount proportional to the error — a small error gets a gentle correction, a large one gets a strong correction.'
      },
      beats: [
        {
          label: 'Open loop hopes. Closed loop checks.',
          hook: 'Tell a motor to run for two seconds to cross the room, and it will run for exactly two seconds whether it crossed the room, hit a wall, or never moved at all.',
          teachingText:
            "There are only two ways to command anything, and the difference between them decides whether a machine works in the real world. OPEN-LOOP control issues a command and never looks. Run the motor for two seconds. Turn the servo to ninety degrees. It is simple, it needs no sensor, and it is built entirely on the assumption that what you commanded is what happened. That assumption holds in a clean simulation and fails constantly in reality: the battery sags, the carpet grips differently than tile, the wheel slips, something is in the way. CLOSED-LOOP control adds one thing — a measurement of what actually happened — and feeds it back into the next decision. That measurement is what closes the loop, and it is why the system can correct itself. The key quantity is ERROR: the difference between where you wanted to be and where you actually are. A closed-loop system does not act on the target and it does not act on the position. It acts on the gap between them, which is why it keeps working as conditions change. An open-loop robot repeats what it was told. A closed-loop robot pursues what it was asked for, and those are very different machines.",
          example:
            "This is why a rover measures its own wheel rotation and compares it against how far the landscape has actually shifted in its cameras. Commanded distance and travelled distance are not the same number on loose Martian soil, where wheels slip. A rover that trusted its commands would believe itself somewhere it had never reached, and would keep believing it, with the error growing every drive.",
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'A robot is told to drive forward for 3 seconds to reach a target. It runs on carpet instead of tile and falls short. Why does it not correct itself?',
            choices: [
              'It is open-loop — nothing measures the actual distance, so there is no error for it to act on',
              'The motor is too weak',
              'The battery is flat',
              'The program has a syntax error'
            ],
            answer: 0,
            explanation: 'With no measurement of what really happened, the robot has no way to know it fell short, and cannot correct a difference it cannot see.',
            choiceFeedback: [
              null,
              'A stronger motor would change how far it goes but still would not tell it where it ended up.',
              'It moved, so it had power — the issue is that nothing checked the result.',
              'The code ran exactly as written; the design, not the syntax, is the problem.'
            ]
          },
          practiceGeneratorId: 'gen-rb7-feedback',
          practiceCount: 3
        },
        {
          label: 'Line following: proportional correction in miniature',
          hook: 'A line-following robot is the entire theory of control systems, running on two dollars of parts.',
          teachingText:
            "Put a light sensor over a dark line on a pale floor and the reading tells you how far off centre the robot is. That is ERROR, measured continuously. The crude approach is to treat it as two states — off to the left, turn right; off to the right, turn left — and it produces the jerky weaving you already know how to diagnose from Sensors II, because a single dividing line makes the robot thrash. PROPORTIONAL CONTROL is the better answer and the idea is small: make the size of the correction match the size of the error. Slightly off centre gets a gentle nudge. Badly off gets a hard turn. The robot now glides along the line instead of sawing across it, and the reason is that the response is continuous rather than a switch. There is a real trade to understand here. Correct too weakly and the robot drifts and never quite settles on the line. Correct too strongly and it overshoots the centre, then overshoots coming back, and oscillates — the same thrashing behaviour arriving by a different route. Tuning that strength is genuine engineering work, done by testing rather than calculation, and the fact that both too little and too much produce visible failure is what makes a line follower such a good thing to build.",
          example:
            "Every altitude hold, every attitude control system, every autopilot is this same loop wearing better clothes: measure the error, apply a correction sized to it, measure again. Ingenuity held a hover on Mars in an atmosphere about one percent as dense as Earth's by running exactly this cycle hundreds of times a second, correcting a tiny error before it could grow into a large one. Small corrections applied often is what stability looks like from the inside.",
          applyItQuestion: {
            id: 'ai2',
            type: 'choice',
            prompt: 'A line-following robot overshoots the line, swings back past it, and oscillates without settling. What is the most likely cause?',
            choices: [
              'The correction is too strong for the size of the error, so each fix overshoots and creates a new error',
              'The line is too dark',
              'The sensor is reading too slowly',
              'The robot needs a second sensor'
            ],
            answer: 0,
            explanation: 'Over-correction is the classic oscillation signature: every fix is bigger than the problem, which manufactures the next problem.',
            choiceFeedback: [
              null,
              'Good contrast helps the reading; it is the response size causing the swing.',
              'Slow reading causes lag and sluggishness rather than energetic overshoot.',
              'More sensors give a better error measurement but do not fix a correction that is too aggressive.'
            ]
          },
          practiceGeneratorId: 'gen-rb7-feedback',
          practiceCount: 3
        }
      ],
      connection:
        'How an aerospace engineer uses this: closed-loop control is the discipline that makes controlled flight possible at all. A rocket does not fly straight because it was aimed well; it flies straight because it measures its attitude continuously and corrects the error hundreds of times a second, and it would tumble within seconds without that loop. The tuning problem is real at that scale too — a correction that is too aggressive makes a vehicle oscillate, and an oscillating vehicle can shake itself apart. Getting the strength of the response right is one of the central jobs in guidance and control, and a line-following robot on a kitchen floor is the same problem at a size where you can watch it fail.',
      // Dr. Carlotta A. Berry, PhD — "ESP32: Making a Line Following Robot Part I" (2:44).
      // Verified: playabilityStatus OK, author confirmed, on-topic for this lesson.
      videoUrl: 'https://www.youtube.com/watch?v=MSU9BYXJ1GA'
    },
    questions: [
      { id: 'q1', type: 'choice', prompt: 'What is open-loop control?', choices: ['Commanding an action and never measuring whether it worked', 'Controlling a robot with an open circuit', 'Any control that uses a loop in code', 'Driving a robot manually'], answer: 0, explanation: 'Open-loop means no measurement comes back, so the system cannot know its result.', choiceFeedback: [null, 'The name refers to the control loop, not to wiring.', 'Nearly all robot code uses loops; that is unrelated.', 'Manual driving is teleoperation.'], xp: 10 },
      { id: 'q2', type: 'choice', prompt: 'What actually closes the loop in closed-loop control?', choices: ['A measurement of what really happened, fed back into the next decision', 'A physical connection between motor and sensor', 'Repeating the command twice', 'A faster processor'], answer: 0, explanation: 'Feedback of a real measurement is the defining feature.', choiceFeedback: [null, 'The loop is informational, not a wire.', 'Repetition without measurement is still open-loop.', 'Speed does not supply knowledge of the result.'], xp: 10 },
      { id: 'q3', type: 'choice', prompt: 'What is error in a control system?', choices: ['The difference between where you wanted to be and where you actually are', 'A bug in the program', 'A sensor malfunction', 'A failed command'], answer: 0, explanation: 'Error is a measured quantity the controller acts on, not a fault.', choiceFeedback: [null, 'This is the everyday meaning, not the control-systems one.', 'A malfunction is a fault; error here is a normal, useful number.', 'Error exists even when every command succeeds.'], xp: 10 },
      { id: 'q4', type: 'choice', prompt: 'What does a closed-loop controller act on?', choices: ['The error — the gap between target and actual', 'The target value alone', 'The current position alone', 'The elapsed time'], answer: 0, explanation: 'Acting on the gap is what makes the system self-correcting.', choiceFeedback: [null, 'The target alone tells it nothing about how far off it is.', 'Position alone gives no sense of direction to correct in.', 'Time-based action is the open-loop approach.'], xp: 10 },
      { id: 'q5', type: 'choice', prompt: 'What is proportional control?', choices: ['Making the size of the correction match the size of the error', 'Correcting by a fixed amount every time', 'Correcting only when the error is large', 'Turning the motor fully on or fully off'], answer: 0, explanation: 'Bigger error, bigger correction — a continuous response rather than a switch.', choiceFeedback: [null, 'A fixed correction ignores how far off you actually are.', 'Ignoring small errors lets them grow before anything responds.', 'That is on-off control, the approach that causes thrashing.'], xp: 10 },
      { id: 'q6', type: 'choice', prompt: 'A line follower corrects too weakly. What do you see?', choices: ['It drifts and never quite settles onto the line', 'It oscillates violently', 'It stops entirely', 'It reverses'], answer: 0, explanation: 'Under-correction leaves error uncorrected, so the robot wanders.', choiceFeedback: [null, 'Violent oscillation is the signature of over-correction.', 'Weak correction still produces motion.', 'Nothing in proportional control commands reverse.'], xp: 10 },
      { id: 'q7', type: 'choice', prompt: 'Why does an open-loop robot fail when the surface changes from tile to carpet?', choices: ['Its command was calibrated for one surface and nothing measures the different real result', 'Carpet drains the battery', 'The processor slows down on carpet', 'Carpet damages the sensors'], answer: 0, explanation: 'Open-loop assumes conditions match the assumption baked into the command.', choiceFeedback: [null, 'Extra load draws more current but is not what causes the positional error.', 'Computation is unaffected by the floor.', 'No damage is involved.'], xp: 10 },
      { id: 'q8', type: 'choice', prompt: 'How is tuning the correction strength usually done?', choices: ['By testing and adjusting, because the right value depends on the real machine and surface', 'By calculating it exactly once from the datasheet', 'By always using the maximum', 'By copying another robot'], answer: 0, explanation: 'Real friction, mass and sensor behaviour make measurement more reliable than theory here.', choiceFeedback: [null, 'A datasheet cannot know your surface, mass, or wheel grip.', 'Maximum correction guarantees overshoot and oscillation.', 'Another robot has different physical properties.'], xp: 10 },
      { id: 'q9', type: 'choice', prompt: 'Why does a rover compare wheel rotation against what its cameras see?', choices: ['Wheels slip on loose soil, so commanded distance and actual distance differ', 'Cameras are more fun to use', 'To save power', 'Because wheel sensors are always broken'], answer: 0, explanation: 'Two independent measures reveal slip that either alone would miss.', choiceFeedback: [null, 'This is about accuracy, not preference.', 'Running both costs power rather than saving it.', 'Wheel sensors work; they simply cannot detect slip on their own.'], xp: 10 },
      { id: 'q10', type: 'choice', prompt: 'Why is a line-following robot a good way to learn control systems?', choices: ['It is the same measure-error-and-correct loop used in flight, at a size where you can watch it fail', 'Because lines are easy to draw', 'Because it needs no sensors', 'Because it cannot go wrong'], answer: 0, explanation: 'Both too little and too much correction produce visible, diagnosable failure.', choiceFeedback: [null, 'The tape is not the point; the feedback loop is.', 'It depends entirely on a sensor measuring error.', 'It goes wrong readily, which is exactly what makes it instructive.'], xp: 10 }
    ]
  },
  {
    id: 'rb7-design-challenge',
    subject: 'robotics',
    tier: 1,
    quarter: 'Q4 2026-2027',
    sequenceInQuarter: 8,
    title: 'The Design Challenge: Constraints, Iteration, and Machines That Flew',
    theme: 'Why constraints define the problem, why the first build is supposed to fail, and how real robots got built',
    novaIntro: {
      glossary: {
        constraint: 'A limit the design must respect — mass, power, size, time, cost. Constraints are not obstacles to the problem; they ARE the problem.',
        requirement: 'Something the design must accomplish, stated precisely enough that you can test whether it did.',
        'trade-off': 'Accepting less of one good thing to get more of another, because you cannot maximize everything at once.',
        iteration: 'Building a version, testing it, learning from how it failed, and building a better one.',
        prototype: 'A version built to be tested rather than to be finished — its job is to teach you something.'
      },
      beats: [
        {
          label: 'A constraint is not in the way of the problem. It is the problem.',
          hook: 'Anyone can design a robot arm with unlimited mass, power, and time. Nobody needs one.',
          teachingText:
            "Beginning designers treat constraints as annoyances standing between them and the real design. Engineers treat them as the definition of the work, and that shift in view is most of what separates the two. A CONSTRAINT is a limit the design must respect: it must fit this volume, draw under this many watts, weigh less than this, be finished by this date, cost under this much. A REQUIREMENT is what it must accomplish, stated precisely enough to test. Remove the constraints and the problem becomes trivial and useless — of course you can build a strong arm if it may weigh anything. The interesting question is always the constrained one, and constraints interact, which is where TRADE-OFFS come from. A stronger arm is heavier. A heavier arm needs bigger motors. Bigger motors draw more power. More power means more battery, which is more mass again. You cannot maximize everything, so you decide what to give up, deliberately and on the record. That habit of writing down what you sacrificed and why is what makes a design reviewable by someone else, and it is the difference between a decision and a guess that happened to work.",
          example:
            "Ingenuity had to fly in an atmosphere roughly one percent as dense as Earth's, which meant enormous rotors spinning very fast, which meant almost no mass could be spent anywhere else. The whole helicopter weighed under two kilograms. Every part of that machine was shaped by one constraint that could not be negotiated with, and the design is not a compromise around the thin atmosphere — the thin atmosphere is what the design is about.",
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'Your robot arm must lift more weight. You fit stronger motors, and now the robot is too heavy for its own drive wheels. What have you run into?',
            choices: [
              'A trade-off — gaining strength cost mass, and mass was constrained too',
              'A programming bug',
              'A sensor calibration problem',
              'A power supply failure'
            ],
            answer: 0,
            explanation: 'Constraints interact. Improving one thing spent a budget that something else was relying on.',
            choiceFeedback: [
              null,
              'Nothing about the code changed — this is a physical design consequence.',
              'No measurement is wrong; the machine genuinely got heavier.',
              'The supply may now be strained, but the cause is the mass you added.'
            ]
          },
          practiceGeneratorId: 'gen-rb7-design-challenge',
          practiceCount: 3
        },
        {
          label: 'The first version is supposed to be wrong',
          hook: 'A prototype that works perfectly first time usually means you did not test it hard enough to learn anything.',
          teachingText:
            "ITERATION is building a version, testing it honestly, learning from exactly how it failed, and building a better one — and the crucial word is honestly. A PROTOTYPE exists to teach you something, not to be finished, which means a prototype that fails informatively has done its job better than one that survives an easy test. The engineering habit worth taking from this is to test the thing you are least sure about FIRST, and to design the test so that it can actually fail. A test that cannot fail teaches nothing, and confidence built on unfalsifiable tests is the most expensive kind. This applies directly to the work in this course: build the sensor circuit in Tinkercad and confirm the reading changes before writing any logic that depends on it; get the motor turning before worrying about how precisely it stops. Each step verified before the next is built means that when something breaks, you know it was the thing you just added. Change three things at once and a failure tells you almost nothing, because you now have three suspects and no way to separate them.",
          example:
            "Canadarm2, the robotic arm on the International Space Station, was designed to be operated from inside the station to move cargo and even capture visiting spacecraft. Stephanie Wilson, a Black American astronaut and aerospace engineer, flew three shuttle missions and worked with the station robotic arm systems on orbit. Hardware like that is proven through years of iteration on the ground first, in simulators and test rigs, because there is no repair shop in orbit — every failure worth having has to happen while the machine is still somewhere you can fix it.",
          applyItQuestion: {
            id: 'ai2',
            type: 'choice',
            prompt: 'You change the sensor threshold, rewire the motor driver, and rewrite the control logic all at once. The robot behaves worse. What is the problem with what you did?',
            choices: [
              'Three changes means three suspects, and the failure cannot tell you which one caused it',
              'You should never change the threshold',
              'The robot needs to be restarted between changes',
              'Rewiring always breaks the code'
            ],
            answer: 0,
            explanation: 'Changing one thing at a time is what makes a test informative — otherwise the result is unattributable.',
            choiceFeedback: [
              null,
              'Adjusting the threshold is normal and often necessary; the issue is doing it alongside two other changes.',
              'Restarting does not help you attribute the cause.',
              'Wiring and code are independent — the problem is that you cannot tell which change did it.'
            ]
          },
          practiceGeneratorId: 'gen-rb7-design-challenge',
          practiceCount: 3
        }
      ],
      connection:
        'How an aerospace engineer uses this: mass, power and volume budgets are tracked line by line for the entire life of a spacecraft program, and every gram one subsystem gains is a gram another has to give up. That is the trade-off habit from this lesson, written into how whole organizations work. Aprille Ericsson, a Black American aerospace engineer at NASA Goddard, has spent her career on instrument and spacecraft design where exactly these budgets decide what an instrument is allowed to be. And the discipline of changing one thing at a time is why flight hardware is qualified through staged testing — component, then subsystem, then integrated vehicle — because a failure during an all-at-once test tells you that something is wrong without telling you what.',
      // Dr. Carlotta A. Berry, PhD — "Engineering 101: Lecture - What is Engineering?" (0:58).
      // Verified: playabilityStatus OK, author confirmed, on-topic for this lesson.
      videoUrl: 'https://www.youtube.com/watch?v=MxyzCZhyXLk'
    },
    questions: [
      { id: 'q1', type: 'choice', prompt: 'What is a design constraint?', choices: ['A limit the design must respect, such as mass, power, size, time, or cost', 'A part that keeps breaking', 'A feature the customer wants', 'A bug in the design software'], answer: 0, explanation: 'Constraints bound the solution space and define what the real problem is.', choiceFeedback: [null, 'That is a reliability problem, not a constraint.', 'A desired capability is a requirement, not a constraint.', 'Software faults are unrelated.'], xp: 10 },
      { id: 'q2', type: 'choice', prompt: 'How does a requirement differ from a constraint?', choices: ['A requirement is what it must accomplish; a constraint is a limit it must respect', 'They are the same', 'Requirements apply only to software', 'Constraints are optional'], answer: 0, explanation: 'One states the goal, the other bounds how you may reach it.', choiceFeedback: [null, 'They are distinct and are tracked separately in real projects.', 'Both apply to hardware and software alike.', 'A constraint that can be ignored was never a constraint.'], xp: 10 },
      { id: 'q3', type: 'choice', prompt: 'What is a trade-off?', choices: ['Accepting less of one good thing to gain more of another, because you cannot maximize everything', 'A design that fails', 'Swapping one supplier for another', 'A test that produces no result'], answer: 0, explanation: 'Trade-offs exist because constraints interact.', choiceFeedback: [null, 'A trade-off is a deliberate choice, not a failure.', 'That is procurement, not design.', 'An inconclusive test is a separate problem.'], xp: 10 },
      { id: 'q4', type: 'choice', prompt: 'Why does adding a stronger motor sometimes make a robot worse overall?', choices: ['It adds mass and power draw, spending budgets other parts of the design were relying on', 'Strong motors are less reliable', 'Stronger motors run slower', 'It always overloads the processor'], answer: 0, explanation: 'Constraints interact, so a local improvement can be a global loss.', choiceFeedback: [null, 'Reliability is a separate property and not automatically worse.', 'Gearing determines speed, and this is not the general rule.', 'The processor is unaffected by motor size.'], xp: 10 },
      { id: 'q5', type: 'choice', prompt: 'What is the purpose of a prototype?', choices: ['To teach you something by being tested, not to be a finished product', 'To show to customers', 'To be the final version', 'To use up spare parts'], answer: 0, explanation: 'A prototype earns its keep through what it reveals.', choiceFeedback: [null, 'Demonstration is a possible side use, not the purpose.', 'A prototype is deliberately not final.', 'That is not a design goal.'], xp: 10 },
      { id: 'q6', type: 'choice', prompt: 'Why is a prototype that fails informatively better than one that passes an easy test?', choices: ['A test that cannot fail teaches nothing, so confidence built on it is unearned', 'Failure is always better than success', 'Easy tests take longer', 'Failed prototypes cost less'], answer: 0, explanation: 'The value of a test is in what it can rule out.', choiceFeedback: [null, 'Not always — the point is about what the test can reveal.', 'Easy tests are usually quicker, which is part of their appeal.', 'Cost is not the criterion.'], xp: 10 },
      { id: 'q7', type: 'choice', prompt: 'Why change only one thing at a time when debugging a robot?', choices: ['So a change in behaviour can be attributed to a specific cause', 'Because multiple changes take longer', 'Because the compiler cannot handle several edits', 'Because hardware and software cannot change together'], answer: 0, explanation: 'Attribution is what makes a test informative.', choiceFeedback: [null, 'Time is not the issue; interpretability is.', 'Compilers handle many changes without difficulty.', 'They can change together — you just lose the ability to tell which mattered.'], xp: 10 },
      { id: 'q8', type: 'choice', prompt: 'Ingenuity had to fly in an atmosphere about one percent as dense as Earth\'s. What did that force?', choices: ['Very large, very fast rotors and almost no mass available for anything else', 'A larger battery than usual', 'Thicker rotor blades for strength', 'A pressurized cabin'], answer: 0, explanation: 'The dominant constraint shaped every other decision in the vehicle.', choiceFeedback: [null, 'Extra battery mass is exactly what the design could not afford.', 'Thicker means heavier, which the mass budget forbade.', 'It carried no crew, so no cabin was needed.'], xp: 10 },
      { id: 'q9', type: 'choice', prompt: 'Why is spaceflight hardware iterated so heavily on the ground first?', choices: ['There is no repair shop in orbit, so failures must happen while the machine can still be fixed', 'Ground testing is cheaper to schedule', 'Space testing is forbidden', 'Hardware behaves differently on the ground'], answer: 0, explanation: 'Iteration has to happen where learning from failure is still affordable.', choiceFeedback: [null, 'Cost matters, but irreversibility is the real driver.', 'On-orbit testing does happen, after ground qualification.', 'Some differences exist, which is why simulators model them — but that is not the reason.'], xp: 10 },
      { id: 'q10', type: 'choice', prompt: 'In building a robot circuit, what should you verify before writing logic that depends on it?', choices: ['That the sensor reading actually changes when the thing it measures changes', 'That the code compiles', 'That the battery is new', 'That the wires are the right colour'], answer: 0, explanation: 'Verify the foundation before building on it, so a later failure has one suspect.', choiceFeedback: [null, 'Code can compile perfectly and still read a dead sensor.', 'Fresh power does not prove the sensor responds.', 'Colour is an organizing convention, not a function.'], xp: 10 }
    ]
  },
];

// ---------------------------------------------------------------------------
// ALL 8 LESSONS WRITTEN. NOT imported by src/data/lessons/index.js, and
// deliberately so: an unfinished subject must not reach him mid-quarter.
//
// Remaining to build, in order:
//   8  rb7-design-challenge   Constraints, iteration, Canadarm2 / Perseverance / Ingenuity
//
// Then: 8 fact-bank generators in problemTemplates.js (gen-rb7-*), a 30-item
// exam in src/data/exams/roboticsQ4Exam.js spliced after rb7-design-challenge,
// a verified video per lesson, Tinkercad Circuits hands-on projects registered
// in ALL SIX consumer files (see the Aug 7 Tinkercad defect — registering in
// one is never enough), removal of the 2 absorbed lessons from technology7.js,
// and updating OLD_tech in verify-splice-regression.mjs from 44 to 42 entries.
//
// The subject registration (config/subjects.js, weekPattern.js, placeholders.js)
// was applied and then REVERTED, so nothing dangles. Re-apply it when the
// lessons are ready, not before.
// ---------------------------------------------------------------------------
