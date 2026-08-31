// ---------------------------------------------------------------------------
// Technology & Computer Science — Tier 1. Semester-paced per the standing
// pacing directive (Technology/CS & Robotics is a semester subject, not
// full-year). Rebuilt to the full beats teaching standard (Aug 2026) —
// same novaIntro.beats shape as aerospace7.js / socialStudies7.js: real
// glossary terms, hook/teachingText/example/applyItQuestion per beat,
// a practiceGeneratorId + practiceCount wired to a real fact-bank
// generator in src/engine/problemTemplates.js, and a genuinely verified
// (web-searched, real, live) YouTube video per lesson.
//
// SCOPE: 32 of the 34 lessons in this file were rebuilt. The 2 Robotics
// Programming lessons (tech7-robotics-programming,
// tech7-robotics-programming-2) are deliberately left UNTOUCHED in their
// original quiz-only format and original array position — they are being
// split into their own standalone Robotics subject in a separate,
// dedicated work session (see PROJECT_LOG.md), not folded into this
// Technology rebuild.
//
// QUARTER TAGGING & Q1/Q2 SPLIT (confirmed decision): the 32 rebuilt
// lessons split 16/16 across Q1 2026-2027 and Q2 2026-2027. Rather than
// pairing each "I"/"II" topic back-to-back in the same quarter (the
// pattern used for Aerospace), Technology instead groups ALL 16 "Part I"
// foundational topics into Q1 (Typing through Automation, in the file's
// original order) and ALL 16 "Part II" deep-dive topics into Q2 (Python
// II through Automation II). This mirrors how the topics were already
// authored (16 originals, then 16 follow-ups) and reads pedagogically as
// "learn the foundations of every tool first, semester 1; go deeper on
// every tool, semester 2" — arguably a better fit for a survey-style
// Technology course covering many unrelated tools than Aerospace's
// single-throughline pairing was. sequenceInQuarter runs 1-16 in each
// quarter, in the same relative order as this file's original lesson
// list. tech7-robotics-programming physically sits between Q1's last
// lesson (tech7-automation) and Q2's first lesson (tech7-python-2) in
// this array — its original position — and tech7-robotics-programming-2
// sits at the very end, also its original position; see
// src/data/lessons/index.js for how the two Quarterly Exams splice in
// around them without touching either Robotics lesson.
// ---------------------------------------------------------------------------

export const technologyLessons7 = [
  {
    id: 'tech7-typing',
    subject: 'technology',
    tier: 1,
    quarter: 'Q1 2026-2027',
    sequenceInQuarter: 1,
    // PRACTICE HANDOFF. This lesson teaches typing; it cannot make him a typist.
    // Added Aug 9 2026 after the parent asked how "Typing II: Ergonomics &
    // Accuracy" and the Typing screen in the nav were meant to relate — they
    // did not relate at all, which is the same gap as work that lives in the
    // code and never reaches his screen.
    practiceLink: { view: 'typing', label: 'Practise on EdClub', detail: 'You know where the keys are now. The only thing that turns that into typing is reps — 15 minutes a day at 11:15.' },
    title: 'Typing Fundamentals',
    theme: 'Touch typing technique and measuring typing speed',
    novaIntro: {
      glossary: {
        'home row': 'The row of keys (A S D F G H J K L) where fingers rest between keystrokes.',
        'touch typing': 'Typing without looking at the keyboard, using muscle memory instead.',
        WPM: 'Words per minute — the standard measurement of typing speed.'
      },
      beats: [
        {
          label: 'The Home Row',
          // Motor skill, not an idea — see beatWantsReflection in LessonEngine.
          reflect: false,
          hook: 'Close your eyes — could your fingers still find every letter on the keyboard?',
          teachingText: 'Touch typists never look down at the keyboard. Instead, their fingers rest on the home row — A S D F for the left hand, J K L ; for the right — and reach out to other keys before returning home every time. The F and J keys have small raised bumps so your index fingers can find the home row by feel alone, without looking. Each finger is also responsible for its own column of keys, which is what spreads the work across all ten fingers instead of overloading two. That division of labour is what makes real speed possible without strain.',
          example: 'Try this: rest your left index finger on F and your right index finger on J right now. Without looking, you should feel the small bump on each key — that\'s your anchor point for every other key on the keyboard.',
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'Marcus keeps glancing down at his keyboard while typing a report. What technique would help him stop?',
            choices: [
              'Practicing touch typing using the home row as an anchor',
              'Typing faster so he has less time to look down',
              'Using only his two index fingers',
              'Memorizing the report instead of typing it'
            ],
            answer: 0,
            explanation: 'Touch typing trains your fingers to find every key from the home row by feel, which is exactly what stops the need to look down.',
            choiceFeedback: [
              null,
              'Typing faster without technique usually causes MORE errors and more looking down, not less.',
              'Using only two fingers ("hunt and peck") is the opposite of touch typing and is generally slower, not a fix for looking down.',
              'Memorizing content doesn\'t address the physical keyboard skill — Marcus needs touch typing technique, not memorization.'
            ],
            xp: 10
          },
          practiceGeneratorId: 'gen-tech-typing-home-row',
          practiceCount: 4
        },
        {
          label: 'Measuring Speed: WPM',
          reflect: false,
          hook: 'How fast do YOU think you type — and how would you even prove it?',
          teachingText: 'Typing speed is measured in WPM, or words per minute. Typing tests count how many words (usually assuming 5 characters = 1 word) you type correctly in a set time, then calculate errors against that. A beginner might type 15-20 WPM; an experienced touch typist often reaches 60-80+ WPM. Accuracy matters as much as raw speed, since most tests subtract points for mistakes. Because accuracy is folded into most scores, a typist who slows down slightly and stops making mistakes often ends up with a HIGHER measured WPM than one who races and has to backspace constantly.',
          example: 'If you type 150 characters correctly in one minute, that\'s roughly 30 words (150 ÷ 5), so your speed would be about 30 WPM.',
          practiceGeneratorId: 'gen-tech-typing-wpm',
          practiceCount: 3
        }
      ],
      connection: 'Touch typing and WPM aren\'t just school skills — nearly every job today, from engineering to journalism, rewards people who can get their ideas out of their head and onto a screen quickly and accurately.',
      videoUrl: 'https://www.youtube.com/watch?v=SPz9rF5KUcg'
    },
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'Which keys make up the home row for the left hand?',
        choices: ['A S D F', 'Q W E R', 'Z X C V', 'J K L ;'],
        answer: 0,
        explanation: 'The left hand rests on A S D F; the right hand rests on J K L ; — together these eight keys are the home row.',
        choiceFeedback: [
          null,
          'Q W E R is the top letter row, not the home row — your fingers reach UP to it from home position.',
          'Z X C V is the bottom letter row — your fingers reach DOWN to it from home position.',
          'J K L ; is the home row for the RIGHT hand. The question asked about the left hand: A S D F.'
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'Why do the F and J keys have small raised bumps on them?',
        choices: [
          'So your index fingers can find the home row by feel, without looking',
          'So you can tell which keys wear out fastest',
          'Because F and J are the most commonly typed letters',
          'To mark where to place your thumbs'
        ],
        answer: 0,
        explanation: 'The bumps are anchor points — they let a touch typist return both index fingers to home position without ever glancing down.',
        choiceFeedback: [
          null,
          'The bumps are a positioning aid, not a wear indicator — they are molded in when the keyboard is made.',
          'F and J are not especially common letters. E, T, and A are far more frequent in English; the bumps mark home position, not frequency.',
          'Thumbs rest on the space bar. The bumps guide the INDEX fingers to the home row.'
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'What does touch typing actually mean?',
        choices: [
          'Typing without looking at the keyboard, using muscle memory',
          'Typing gently so the keys last longer',
          'Typing on a touchscreen instead of a physical keyboard',
          'Typing with only the index fingers'
        ],
        answer: 0,
        explanation: 'Touch typing means your fingers know where every key is by feel, so your eyes stay on the screen or the source material instead of the keyboard.',
        choiceFeedback: [
          null,
          'How hard you press has nothing to do with it — "touch" here refers to finding keys by feel, not to gentleness.',
          'Touch typing is a technique, not a device. You can touch type on any physical keyboard.',
          'Using only two index fingers is called "hunt and peck" — it is the opposite of touch typing, which uses all ten fingers.'
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'WPM stands for what?',
        choices: ['Words per minute', 'Writing performance measure', 'Words per mistake', 'Windows per module'],
        answer: 0,
        explanation: 'WPM — words per minute — is the standard measurement of typing speed.',
        choiceFeedback: [
          null,
          'There is no standard metric by that name. WPM stands for words per minute.',
          'Mistakes are counted separately as accuracy. WPM measures words typed against TIME, not against errors.',
          'That is not a typing term at all — WPM means words per minute.'
        ],
        xp: 10
      },
      {
        id: 'q5',
        type: 'choice',
        prompt: 'Most typing tests assume how many characters equal one "word"?',
        choices: ['5', '3', '8', '10'],
        answer: 0,
        explanation: 'The standard convention is 5 characters = 1 word, so every test measures the same way regardless of how long the actual words are.',
        choiceFeedback: [
          null,
          'Three characters would make almost every real word count as two or more words, inflating every score.',
          'Eight is longer than the average English word, so this would undercount nearly everyone.',
          'Ten characters is roughly two average words — using it would cut every typing score in half.'
        ],
        xp: 10
      },
      {
        id: 'q6',
        type: 'choice',
        prompt: 'You type 200 characters correctly in one minute. Roughly what is your WPM?',
        choices: ['40 WPM', '20 WPM', '100 WPM', '200 WPM'],
        answer: 0,
        explanation: '200 characters ÷ 5 characters per word = 40 words, typed in one minute — so about 40 WPM.',
        choiceFeedback: [
          null,
          'That is 200 ÷ 10. The standard conversion divides by 5 characters per word, not 10.',
          'That is 200 ÷ 2. Each word counts as 5 characters, so divide by 5: 200 ÷ 5 = 40.',
          'That counts every character as a whole word. Divide by 5 first: 200 ÷ 5 = 40 WPM.'
        ],
        xp: 10
      },
      {
        id: 'q7',
        type: 'choice',
        prompt: 'A typing test reports 65 WPM but 12 errors. What does that tell you?',
        choices: [
          'Raw speed is strong but accuracy needs work — most tests penalize errors',
          'The score is excellent, since only speed matters',
          'The test is broken, because speed and errors cannot both be measured',
          'Errors do not matter as long as speed is above 60 WPM'
        ],
        answer: 0,
        explanation: 'Accuracy matters as much as raw speed. Most tests subtract for mistakes, and in real work a fast typist who has to fix 12 errors is not actually faster.',
        choiceFeedback: [
          null,
          'Speed alone is not the goal. Twelve errors in one minute means real time lost going back to correct them.',
          'Both are measured routinely and together — the two numbers describe different things about the same attempt.',
          'There is no speed threshold that makes errors stop mattering. Accuracy is tracked at every level.'
        ],
        xp: 10
      },
      {
        id: 'q8',
        type: 'choice',
        prompt: 'A beginning typist typically types at about what speed?',
        choices: ['15-20 WPM', '60-80 WPM', '100-120 WPM', '5 WPM'],
        answer: 0,
        explanation: 'Beginners usually land around 15-20 WPM; 60-80+ WPM is typical of an experienced touch typist.',
        choiceFeedback: [
          null,
          '60-80 WPM is the range for an EXPERIENCED touch typist, not a beginner.',
          '100-120 WPM is exceptionally fast — well above what even most professionals reach.',
          '5 WPM is slower than hunting for keys one at a time; most beginners already type faster than that.'
        ],
        xp: 10
      },
      {
        id: 'q9',
        type: 'choice',
        prompt: 'Why is typing speed genuinely useful to an aerospace engineer?',
        choices: [
          'Engineers write code, test reports, and design documentation constantly — getting ideas onto a screen quickly is part of the job',
          'Engineering software will not run unless you type above 60 WPM',
          'Typing speed is one of the scores NASA uses to select astronauts',
          'It is not useful; engineers only work with drawings'
        ],
        answer: 0,
        explanation: 'Engineering is a writing-heavy profession — code, lab reports, design documentation, and technical specifications all have to be typed.',
        choiceFeedback: [
          null,
          'No software has a typing-speed requirement. The benefit is time saved, not access.',
          'NASA astronaut selection looks at education, experience, and physical qualification — not typing tests.',
          'Engineers write constantly. Documentation is a core part of engineering work, not an optional extra.'
        ],
        xp: 10
      },
      {
        id: 'q10',
        type: 'choice',
        prompt: 'Marcus wants to stop looking down at his hands while typing. What should he practice?',
        choices: [
          'Returning his fingers to the home row after every key he reaches for',
          'Typing much faster so he has no time to look',
          'Watching his hands closely until he memorizes the layout',
          'Switching to a keyboard with larger letters printed on it'
        ],
        answer: 0,
        explanation: 'Home-row anchoring is the core habit of touch typing — every reach starts and ends at home position, which is what makes finding keys by feel possible.',
        choiceFeedback: [
          null,
          'Speeding up without technique usually produces more errors and MORE looking down, not less.',
          'Watching his hands is exactly the habit he is trying to break — it trains his eyes, not his fingers.',
          'Bigger printed letters make looking down easier, which reinforces the habit instead of ending it.'
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'tech7-typing-2',
    subject: 'technology',
    tier: 1,
    quarter: 'Q1 2026-2027',
    sequenceInQuarter: 2,
    // PRACTICE HANDOFF. This lesson teaches typing; it cannot make him a typist.
    // Added Aug 9 2026 after the parent asked how "Typing II: Ergonomics &
    // Accuracy" and the Typing screen in the nav were meant to relate — they
    // did not relate at all, which is the same gap as work that lives in the
    // code and never reaches his screen.
    practiceLink: { view: 'typing', label: 'Practise this now', detail: 'Posture and accuracy are habits, not facts. Go set them while this is fresh — slow and correct beats fast and wrong.' },
    title: 'Typing II: Ergonomics & Accuracy',
    theme: 'Healthy habits for long typing sessions',
    novaIntro: {
      glossary: {
        ergonomics: 'The study of designing tasks and equipment to fit the human body and reduce strain or injury.',
        'repetitive stress injury': 'An injury caused by repeating the same motion over and over, common in the wrists and hands of frequent typists.'
      },
      beats: [
        {
          label: 'Posture Protects Your Hands',
          reflect: false,
          hook: 'A habit that feels totally fine at age 12 can cause real pain by age 22 if it never gets corrected.',
          teachingText: 'Good typing posture — feet flat on the floor, back straight, wrists neutral (not bent up or down) — reduces strain and lowers the risk of repetitive stress injuries, which build up gradually from the same motion repeated thousands of times. A screen positioned roughly an arm\'s length away, at or slightly below eye level, also reduces eye strain during long sessions.',
          example: 'Typing with wrists bent sharply upward, resting on a hard desk edge, puts repeated pressure exactly where carpal tunnel-type strain tends to build up over months of habitual use.',
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'After a long homework session, Malik notices his wrists ache and he had them bent upward against the desk edge the whole time. What is the most likely cause?',
            choices: [
              'Poor wrist posture during typing, which builds repetitive strain over time',
              'Typing itself is inherently dangerous no matter the posture',
              'His keyboard is broken',
              'This has nothing to do with typing at all'
            ],
            answer: 0,
            explanation: 'Bent, unsupported wrist posture sustained over a long session is a classic, well-documented cause of typing-related strain.',
            choiceFeedback: [
              null,
              'Typing with GOOD posture is not inherently dangerous — the problem here is specifically the poor wrist position, not typing itself.',
              'A broken keyboard wouldn\'t specifically cause wrist ache tied to posture — this is a physical strain issue, not a hardware issue.',
              'The described symptoms (wrist ache after bent-wrist typing) are a very direct and common connection to typing posture.'
            ],
            xp: 10
          },
          practiceGeneratorId: 'gen-tech-typing-ergonomics',
          practiceCount: 4
        },
        {
          label: 'Accuracy Before Speed',
          reflect: false,
          hook: 'Typing experts agree on something that sounds backwards: slow down to actually get faster.',
          teachingText: 'Typing experts generally recommend prioritizing accuracy over raw speed when first learning, because habits built accurately are far easier to safely speed up later — while habits built sloppily (wrong fingers, constant looking down) are hard to unlearn and cap how fast you can ever safely go. Taking short breaks during long typing sessions also matters: it gives muscles and tendons time to recover from repeated motion. Speed and accuracy are not really a trade-off over the long run. Most typing tests subtract for errors, so a typist who slows slightly and stops making mistakes often posts a higher measured WPM than one who races and then backspaces — the corrections cost more time than the extra speed gained.',
          example: 'A student who practices slowly but with correct finger placement for a month often ends up faster, long-term, than one who rushed from day one with bad habits.',
          practiceGeneratorId: 'gen-tech-typing-accuracy',
          practiceCount: 3
        }
      ],
      connection: 'These habits matter for life, not just school — nearly every future job involves hours at a keyboard, and the posture patterns built now tend to stick for decades.',
      videoUrl: 'https://www.youtube.com/watch?v=kY6H2bHHv5M'
    },
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What does good typing posture involve?',
        choices: [
          'Feet flat on the floor, back straight, wrists neutral',
          'Leaning far forward with wrists resting on the desk edge',
          'Sitting as close to the screen as possible',
          'Keeping the elbows locked straight'
        ],
        answer: 0,
        explanation: 'Neutral wrists — not bent up or down — plus a supported back and flat feet is the posture that reduces strain over long sessions.',
        choiceFeedback: [
          null,
          'Resting bent wrists on a hard edge concentrates pressure exactly where strain tends to build up.',
          'Sitting too close increases eye strain. Roughly an arm\'s length is the guidance.',
          'Locked elbows create tension. The arms should be relaxed and supported.'
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'What does "wrists neutral" mean?',
        choices: [
          'Not bent upward or downward — roughly in line with the forearm',
          'Resting firmly against the desk at all times',
          'Held as high above the keyboard as possible',
          'Rotated so the palms face each other'
        ],
        answer: 0,
        explanation: 'A neutral wrist is a straight one. Bending it in either direction for hours is what accumulates strain.',
        choiceFeedback: [
          null,
          'Pressing the wrists against a hard surface is a common source of pressure, not a neutral position.',
          'Holding them high creates its own muscle fatigue. Neutral means aligned, not elevated.',
          'That rotation is not a typing position at all.'
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'What is a repetitive stress injury?',
        choices: [
          'An injury that builds up gradually from the same motion repeated thousands of times',
          'An injury caused by a single sudden impact',
          'An illness caused by staring at a screen',
          'A muscle cramp that goes away within minutes'
        ],
        answer: 0,
        explanation: 'The defining feature is accumulation. No single keystroke causes harm; hundreds of thousands of them in a poor position can.',
        choiceFeedback: [
          null,
          'A single impact injury is acute trauma — a different category entirely.',
          'Screen time can cause eye strain, but a repetitive stress injury relates to repeated physical motion.',
          'A brief cramp resolves. These build over weeks and months and can persist.'
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'Where should a screen be positioned to reduce eye strain?',
        choices: [
          'About an arm\'s length away, at or slightly below eye level',
          'As close as possible so text appears larger',
          'Well above eye level so you look upward',
          'Directly beside you, requiring a head turn'
        ],
        answer: 0,
        explanation: 'Arm\'s length, at or slightly below eye level, is the standard ergonomic guidance for long sessions.',
        choiceFeedback: [
          null,
          'Closer means more strain. If text is too small, increase the font size instead of moving nearer.',
          'Looking upward for long periods strains the neck and dries the eyes more quickly.',
          'A permanent head turn creates neck strain — the screen belongs in front of you.'
        ],
        xp: 10
      },
      {
        id: 'q5',
        type: 'choice',
        prompt: 'Why do experts recommend prioritizing accuracy over raw speed when learning to type?',
        choices: [
          'Habits built accurately are far easier to speed up later than sloppy habits are to unlearn',
          'Accurate typing uses less electricity',
          'Speed is impossible to measure for beginners',
          'Typing tests only score accuracy'
        ],
        answer: 0,
        explanation: 'Speed built on correct technique keeps rising. Speed built on wrong fingers and constant looking down hits a ceiling that is painful to undo.',
        choiceFeedback: [
          null,
          'Power use has nothing to do with technique.',
          'Speed is easy to measure at any level — WPM works from the first day.',
          'Most tests score both, and typically penalize errors against the speed figure.'
        ],
        xp: 10
      },
      {
        id: 'q6',
        type: 'choice',
        prompt: 'Two students practice for a month. One goes slowly with correct finger placement; the other rushes with bad habits. What is the likely long-term outcome?',
        choices: [
          'The careful student often ends up faster, because good habits scale and bad ones cap out',
          'The rushing student stays permanently ahead',
          'Both end up identical, since practice time was equal',
          'Neither improves without a typing tutor'
        ],
        answer: 0,
        explanation: 'This is the whole reason for the accuracy-first guidance — the early lead from rushing does not survive contact with the ceiling that bad technique creates.',
        choiceFeedback: [
          null,
          'The rushing student is often faster at first, but wrong fingers and looking down limit how far that can go.',
          'Equal hours do not produce equal results when the technique differs.',
          'Self-directed practice works well. Technique, not supervision, is the deciding factor.'
        ],
        xp: 10
      },
      {
        id: 'q7',
        type: 'choice',
        prompt: 'Why do short breaks matter during long typing sessions?',
        choices: [
          'They give muscles and tendons time to recover from repeated motion',
          'They let the computer cool down',
          'They reset the typing test score',
          'They are required before the keyboard will respond again'
        ],
        answer: 0,
        explanation: 'Recovery time is what interrupts the accumulation that leads to repetitive stress injury.',
        choiceFeedback: [
          null,
          'Modern computers manage their own cooling and are unaffected by whether you are typing.',
          'Scores are not reset by pausing.',
          'Keyboards do not lock out. The reason for breaks is physical, not technical.'
        ],
        xp: 10
      },
      {
        id: 'q8',
        type: 'choice',
        prompt: 'What is ergonomics?',
        choices: [
          'Designing how a person works or a workspace is set up to reduce strain and injury',
          'The study of typing speed records',
          'A brand of computer keyboard',
          'The science of computer processor design'
        ],
        answer: 0,
        explanation: 'Ergonomics fits the setup to the human body rather than expecting the body to adapt to a bad setup.',
        choiceFeedback: [
          null,
          'Speed records are a typing topic, but ergonomics is about physical wellbeing.',
          'Some keyboards are marketed as ergonomic, but the word names a field, not a brand.',
          'Processor design is computer engineering, unrelated to human posture.'
        ],
        xp: 10
      },
      {
        id: 'q9',
        type: 'choice',
        prompt: 'A student types for three hours daily with wrists bent sharply upward against a hard desk edge. What is the concern?',
        choices: [
          'Repeated pressure in one spot over months is exactly how carpal-tunnel-type strain accumulates',
          'The keyboard will wear out faster',
          'Their typing speed will drop immediately',
          'Nothing — bent wrists are the correct position'
        ],
        answer: 0,
        explanation: 'The harm is slow and cumulative, which is what makes it easy to ignore until it is well established.',
        choiceFeedback: [
          null,
          'Hardware wear is not the issue. The concern is the student\'s hands.',
          'Speed may be unaffected in the short term, which is precisely why this goes unnoticed.',
          'Neutral wrists are correct. Sharply bent wrists are the position to avoid.'
        ],
        xp: 10
      },
      {
        id: 'q10',
        type: 'choice',
        prompt: 'Why does an aerospace engineer have a real stake in typing ergonomics?',
        choices: [
          'It is a career spent at a keyboard writing code and documentation, so hand health over decades genuinely matters',
          'Ergonomic setups are required by NASA before launch',
          'Bent wrists cause errors in engineering calculations',
          'It has no relevance to engineering work'
        ],
        answer: 0,
        explanation: 'Engineering is a keyboard-intensive profession over a whole career. A habit set at twelve is a habit carried into decades of daily work.',
        choiceFeedback: [
          null,
          'There is no such launch requirement — this is about personal health, not mission rules.',
          'Wrist position does not affect arithmetic. It affects the person doing it.',
          'It is highly relevant precisely because so much engineering work happens at a keyboard.'
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'tech7-digital-citizenship',
    subject: 'technology',
    tier: 1,
    quarter: 'Q1 2026-2027',
    sequenceInQuarter: 3,
    title: 'Digital Citizenship',
    theme: 'Behaving safely, respectfully, and responsibly online',
    novaIntro: {
      glossary: {
        'digital citizenship': 'Behaving responsibly, safely, and respectfully while using technology and the internet.',
        'digital footprint': 'The ongoing trail of data a person leaves behind through their online activity.',
        cyberbullying: 'Repeatedly sending hurtful, threatening, or harassing messages to someone online.'
      },
      beats: [
        {
          label: 'Your Digital Footprint',
          hook: 'Every like, post, and comment you\'ve ever made online still exists somewhere — even the ones you deleted.',
          teachingText: 'A digital footprint is the trail of data you leave behind through your online activity: posts, comments, searches, photos, even the apps you use. Some of it you create on purpose ("active" footprint, like a post); some is collected without you directly typing it ("passive" footprint, like websites tracking what you click). Because screenshots and shares can outlive a deleted post, digital citizens think before posting, not just after. Employers and college admissions offices increasingly search for applicants online, so a footprint built at twelve can still be visible at eighteen.',
          example: 'A student posts an angry comment about a teacher, deletes it five minutes later feeling embarrassed — but a classmate already screenshotted it and it gets shared around school anyway.',
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'Before posting a photo of a friend online, what does good digital citizenship say you should do?',
            choices: [
              'Get your friend\'s permission first, since it affects their digital footprint too',
              'Post it immediately since it is your own account',
              'Add a filter so no one recognizes them',
              'Only worry about it if the friend complains afterward'
            ],
            answer: 0,
            explanation: 'A photo of someone else adds to THEIR digital footprint, not just yours — responsible digital citizens ask first.',
            choiceFeedback: [
              null,
              'It being your account doesn\'t erase the fact that the photo affects someone else\'s digital footprint and privacy.',
              'A filter doesn\'t solve the core issue of posting someone\'s image without asking them first.',
              'Waiting for a complaint means the harm (and the footprint) already happened — asking first prevents it.'
            ],
            xp: 10
          },
          practiceGeneratorId: 'gen-tech-digital-footprint',
          practiceCount: 4
        },
        {
          label: 'Cyberbullying and Respect',
          hook: 'Words typed from behind a screen can hurt just as much as words said face to face — sometimes more.',
          teachingText: 'Cyberbullying is repeated, intentional harm directed at someone through digital devices — mean texts, group chat pile-ons, embarrassing posts, or exclusion from online groups. It can feel "less real" to the person doing it, but the harm to the target is very real, and it can follow someone home in a way in-person bullying can\'t. Good digital citizens report cyberbullying to a trusted adult rather than joining in or staying silent.',
          example: 'A group chat starts mocking a classmate\'s photo. Even students who don\'t post anything, but stay in the chat and \'like\' the mean comments, are still part of the harm.',
          practiceGeneratorId: 'gen-tech-cyberbullying',
          practiceCount: 3
        }
      ],
      connection: 'Digital citizenship is really the same respect and responsibility you\'d show in person — it just has to travel through a screen, which makes it easier to forget the person on the other end is real.',
      videoUrl: 'https://www.youtube.com/watch?v=8pnZYI7mLnU'
    },
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What is a digital footprint?',
        choices: [
          'The trail of data a person leaves behind through their online activity',
          'The amount of storage space an app uses on a device',
          'A fingerprint scanner used to unlock a phone',
          'The number of devices a person owns'
        ],
        answer: 0,
        explanation: 'A digital footprint is everything your online activity leaves behind: posts, comments, searches, photos, and the apps you use.',
        choiceFeedback: [
          null,
          'Storage space is a technical measurement of a device. A digital footprint is the record of your ACTIVITY, wherever it lives.',
          'That is biometric security. A digital footprint has nothing to do with your actual fingerprints.',
          'Owning more devices does not create a footprint by itself — using them online does.'
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'Which of these is an example of a PASSIVE digital footprint?',
        choices: [
          'A website recording which links you clicked while browsing',
          'A photo you posted to a group chat',
          'A comment you wrote under a video',
          'A profile bio you filled out yourself'
        ],
        answer: 0,
        explanation: 'A passive footprint is data collected about you without you deliberately creating it — like a site tracking your clicks. Anything you deliberately post is an ACTIVE footprint.',
        choiceFeedback: [
          null,
          'Posting a photo is something you chose to do, which makes it an ACTIVE footprint.',
          'Writing a comment is deliberate, so it is an ACTIVE footprint. Passive data is collected without you typing it.',
          'Filling out a bio is deliberate — that is an ACTIVE footprint.'
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'Why does deleting a post not fully remove it from your digital footprint?',
        choices: [
          'Screenshots and shares can outlive the original post',
          'Deleted posts always reappear after 30 days',
          'Only paid accounts are allowed to delete posts',
          'Deleting a post also deletes your whole account'
        ],
        answer: 0,
        explanation: 'Once something is public, anyone can screenshot or reshare it. That copy exists independently of the original, which is why digital citizens think before posting rather than after.',
        choiceFeedback: [
          null,
          'There is no automatic 30-day reappearance. The issue is copies other people already made.',
          'Deletion is available on free accounts too — the problem is that deletion cannot reach copies made by others.',
          'Deleting one post does not delete an account. But it also does not recall copies already saved by others.'
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'What makes behavior cyberbullying rather than a single rude comment?',
        choices: [
          'It is repeated and intentional harm directed at someone through digital devices',
          'It happens on a phone rather than a computer',
          'It is written in all capital letters',
          'It happens outside of school hours'
        ],
        answer: 0,
        explanation: 'Cyberbullying is defined by repetition and intent to harm — not by the device, the time, or the formatting.',
        choiceFeedback: [
          null,
          'The device does not define it. The same behavior on a laptop, phone, or console is still cyberbullying.',
          'Capital letters may read as shouting, but formatting is not what makes something cyberbullying.',
          'Timing does not define it either. Cyberbullying can happen at any hour, which is part of why it follows people home.'
        ],
        xp: 10
      },
      {
        id: 'q5',
        type: 'choice',
        prompt: 'A group chat starts mocking a classmate\'s photo. You do not post anything, but you stay in the chat and "like" several of the mean comments. What is true?',
        choices: [
          'Liking the comments is participating — it encourages the harm even without writing anything',
          'You are completely uninvolved because you did not write a message',
          'Liking is fine as long as you do not screenshot anything',
          'Only the person who started the chat has any responsibility'
        ],
        answer: 0,
        explanation: 'Reactions are participation. A pile-on grows because bystanders signal approval, which is why good digital citizens step out or report rather than quietly encourage it.',
        choiceFeedback: [
          null,
          'A "like" is a public signal of approval. Staying and endorsing the comments is involvement, not neutrality.',
          'Screenshots are a separate issue. The like itself already encourages the behavior.',
          'The person who started it bears the most responsibility, but everyone amplifying it shares in the harm.'
        ],
        xp: 10
      },
      {
        id: 'q6',
        type: 'choice',
        prompt: 'What is the recommended response when you witness cyberbullying?',
        choices: [
          'Report it to a trusted adult rather than joining in or staying silent',
          'Reply with an insult so the bully knows how it feels',
          'Leave the chat quietly and tell no one',
          'Wait to see whether it continues for a full week'
        ],
        answer: 0,
        explanation: 'Reporting to a trusted adult is the recommended action. Silence lets it continue, and retaliating usually escalates it.',
        choiceFeedback: [
          null,
          'Retaliating adds a second person doing harm and usually escalates the situation rather than ending it.',
          'Leaving protects you but leaves the target alone. Reporting is what actually helps them.',
          'Waiting a week is a week of harm. Repetition is what defines cyberbullying — the pattern is already visible.'
        ],
        xp: 10
      },
      {
        id: 'q7',
        type: 'choice',
        prompt: 'Cyberbullying is often described as harder to escape than in-person bullying. Why?',
        choices: [
          'It can reach the target at home, at any hour, through their own devices',
          'It always involves more people',
          'It is illegal in every state, so it is investigated longer',
          'It only happens to students who post frequently'
        ],
        answer: 0,
        explanation: 'In-person bullying usually stops when the school day ends. Digital messages follow a person into their home and their private time.',
        choiceFeedback: [
          null,
          'Group size varies. Even one persistent person can cyberbully, and in-person bullying can also involve groups.',
          'Laws vary by state and situation. The reason it is hard to escape is reach, not legal process.',
          'Anyone can be targeted, including people who post rarely or not at all.'
        ],
        xp: 10
      },
      {
        id: 'q8',
        type: 'choice',
        prompt: 'Before posting a photo that includes a friend, what does good digital citizenship say to do?',
        choices: [
          'Ask the friend whether they are okay with it being posted',
          'Post it and offer to delete it if they complain',
          'Post it without tagging them, which removes any concern',
          'Post it only if it already has a lot of likes'
        ],
        answer: 0,
        explanation: 'The photo becomes part of THEIR digital footprint too. Asking first respects that, and deleting later cannot recall copies others have already saved.',
        choiceFeedback: [
          null,
          '"Delete if they complain" comes too late — by then screenshots may already exist and the harm is done.',
          'Removing a tag does not remove their face, their identity, or the ability of others to recognize and reshare it.',
          'Popularity is not consent. How many likes a photo has says nothing about whether your friend wanted it posted.'
        ],
        xp: 10
      },
      {
        id: 'q9',
        type: 'choice',
        prompt: 'Why might a college admissions officer or future employer care about your digital footprint?',
        choices: [
          'Public posts persist for years and can be found long after they were made',
          'They receive an automatic report of everything you have ever posted',
          'They can read your private messages at any time',
          'They only look at accounts you list on an application'
        ],
        answer: 0,
        explanation: 'Public content is durable and searchable. Something posted in 7th grade can still be findable years later, which is exactly why "think before posting" is the core habit.',
        choiceFeedback: [
          null,
          'No such automatic report exists. What is visible is what is public or has been reshared.',
          'Private messages are not openly readable by employers. Public posts and reshared content are the real exposure.',
          'Anything public can be searched for, whether or not you listed the account anywhere.'
        ],
        xp: 10
      },
      {
        id: 'q10',
        type: 'choice',
        prompt: 'Which best defines digital citizenship?',
        choices: [
          'Behaving responsibly, safely, and respectfully while using technology and the internet',
          'Holding an official online account issued by the government',
          'Owning a computer and a smartphone',
          'Knowing how to code a website'
        ],
        answer: 0,
        explanation: 'Digital citizenship is about conduct — how you treat other people and protect yourself while using technology.',
        choiceFeedback: [
          null,
          'It is not a legal or official status. It describes how a person behaves online.',
          'Owning devices is not citizenship. How you USE them is what the term describes.',
          'Coding is a technical skill. Digital citizenship is about responsible behavior, which applies to everyone online.'
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'tech7-digital-citizenship-2',
    subject: 'technology',
    tier: 1,
    quarter: 'Q1 2026-2027',
    sequenceInQuarter: 4,
    title: 'Digital Citizenship II: Privacy & Data',
    theme: 'Protecting personal information online',
    novaIntro: {
      glossary: {
        'privacy setting': 'A control that lets users limit who can see their posts, information, or activity on an online platform.',
        'data breach': 'An incident where hackers steal user information from a company\'s systems.',
        'identity theft': 'Using someone\'s stolen personal information to impersonate them, often for financial fraud.'
      },
      beats: [
        {
          label: 'Controlling Who Sees What',
          hook: 'A single public post with your home address in the background of a photo can travel further than you\'d ever guess.',
          teachingText: 'Privacy settings let users control who can see their posts, information, or activity — from "public" (anyone) to "friends only" to fully private. Sharing personal information like a home address or daily schedule publicly is risky because it can be misused by strangers for harassment, stalking, or other harm — information a stranger should never casually have access to. Individually harmless details combine into something that is not: a school name, a practice time, and a field location are each unremarkable, but posted together on a public account they tell a stranger exactly where someone will be and when.',
          example: 'A student sets their account to "friends only" instead of public, so a random stranger searching their name can\'t see their posts, photos, or daily activity.',
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'Why might a privacy expert recommend setting a new social media account to "friends only" instead of leaving it "public" by default?',
            choices: [
              'It limits who can see personal posts and information, reducing risk of misuse by strangers',
              'Public settings are required by law to be turned off within a week',
              '"Friends only" makes the account completely unhackable',
              'Privacy settings have no real effect on who can view content'
            ],
            answer: 0,
            explanation: 'Restricting visibility to trusted people directly reduces the pool of strangers who could misuse shared personal information.',
            choiceFeedback: [
              null,
              'There is no such blanket legal requirement — this is a personal safety best practice, not a law.',
              'No privacy setting makes an account "unhackable" — it limits WHO SEES content, which is a different (and still valuable) protection.',
              'Privacy settings have a real, direct, well-documented effect on exactly who can view an account\'s content.'
            ],
            xp: 10
          },
          practiceGeneratorId: 'gen-tech-privacy-settings',
          practiceCount: 4
        },
        {
          label: 'Data Breaches and Why They Matter',
          hook: 'Even a company you trust completely can still get hacked — and your information can go with it.',
          teachingText: 'A data breach happens when hackers steal user information from a company\'s systems — sometimes affecting millions of accounts at once. Stolen personal information can enable identity theft or fraud, which is exactly why experts recommend unique passwords per site (so one breach doesn\'t compromise all your accounts) and being cautious about how much personal information you share with any single platform.',
          example: 'If a game company suffers a data breach and a student used that SAME password for their email too, the attacker could now try that stolen password on the email account as well.',
          practiceGeneratorId: 'gen-tech-data-breaches',
          practiceCount: 3
        }
      ],
      connection: 'Privacy and data protection are lifelong habits — the accounts Lamar creates now, and the information he shares, will still exist and matter years from now.',
      videoUrl: 'https://www.youtube.com/watch?v=yiKeLOKc1tw'
    },
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What do privacy settings control?',
        choices: [
          'Who can see your posts, information, or activity',
          'How fast your posts upload',
          'How much storage your account uses',
          'Which language the site displays in'
        ],
        answer: 0,
        explanation: 'Privacy settings run from public, to friends only, to fully private — they decide the audience for what you share.',
        choiceFeedback: [
          null,
          'Upload speed depends on your connection, not on privacy settings.',
          'Storage is a separate account limit.',
          'Language is a display preference, unrelated to who can see your content.'
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'Why is publicly sharing information like a home address or daily schedule risky?',
        choices: [
          'It can be misused by strangers for harassment, stalking, or other harm',
          'It uses more of the site\'s storage',
          'It makes posts load more slowly',
          'It is against the rules of every website'
        ],
        answer: 0,
        explanation: 'Location and routine are exactly the details a stranger should never casually have — they turn an online contact into a physical risk.',
        choiceFeedback: [
          null,
          'Storage is irrelevant to the danger here.',
          'Loading speed has nothing to do with it.',
          'Many sites permit it. Being allowed and being wise are different questions.'
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'A student changes their account from public to "friends only." What does that actually accomplish?',
        choices: [
          'A stranger searching their name can no longer see their posts, photos, or daily activity',
          'It deletes everything they posted while the account was public',
          'It prevents friends from screenshotting anything',
          'It hides their account from the site itself'
        ],
        answer: 0,
        explanation: 'It closes the account to strangers going forward — a real improvement, with real limits.',
        choiceFeedback: [
          null,
          'Past posts remain, and anything already copied or reshared stays out there.',
          'Anyone who can see a post can screenshot it. Settings limit audience, not behavior.',
          'The platform itself always retains your data. Settings control other USERS.'
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'What is a data breach?',
        choices: [
          'Hackers stealing user information from a company\'s systems',
          'A user forgetting their own password',
          'A website being slow during busy hours',
          'Deleting your own account'
        ],
        answer: 0,
        explanation: 'A breach is theft from the company side, sometimes affecting millions of accounts at once — and nothing the individual user did caused it.',
        choiceFeedback: [
          null,
          'A forgotten password is an inconvenience, not a breach.',
          'Slowness is a performance issue with no security meaning.',
          'Closing your own account is a deliberate choice, not a breach.'
        ],
        xp: 10
      },
      {
        id: 'q5',
        type: 'choice',
        prompt: 'A game company suffers a data breach, and a student had used that same password for their email. What is the risk?',
        choices: [
          'The attacker can try the stolen password on the email account too',
          'The email account is automatically deleted',
          'Only the game account is ever affected',
          'The email provider changes the password for them'
        ],
        answer: 0,
        explanation: 'This is precisely why unique passwords per site are recommended — reuse turns one company\'s breach into a breach of everything.',
        choiceFeedback: [
          null,
          'No deletion occurs. The account is exposed, not removed.',
          'Reuse is what spreads the damage beyond the breached company.',
          'Providers may prompt a reset if they detect trouble, but you cannot count on it.'
        ],
        xp: 10
      },
      {
        id: 'q6',
        type: 'choice',
        prompt: 'What is identity theft?',
        choices: [
          'Someone using another person\'s stolen personal information to impersonate them or commit fraud',
          'Two people choosing the same username',
          'Forgetting which email you signed up with',
          'A company changing its name'
        ],
        answer: 0,
        explanation: 'Stolen personal information from a breach can enable someone to open accounts or make purchases as if they were you.',
        choiceFeedback: [
          null,
          'A username collision is a naming inconvenience, not a crime.',
          'That is a memory problem, not theft.',
          'A company rebranding has nothing to do with identity theft.'
        ],
        xp: 10
      },
      {
        id: 'q7',
        type: 'choice',
        prompt: 'Which two habits does this lesson recommend against the risk of data breaches?',
        choices: [
          'Unique passwords per site, and limiting how much personal information any one platform holds',
          'Posting publicly and using the same password everywhere',
          'Deleting your browser history daily and avoiding all websites',
          'Sharing your password with a trusted friend as a backup'
        ],
        answer: 0,
        explanation: 'You cannot prevent a company from being breached. You can control how much one breach costs you.',
        choiceFeedback: [
          null,
          'Both of those increase exposure rather than reducing it.',
          'Clearing history does nothing about a breach at a company, and avoiding the internet is not a realistic plan.',
          'A shared password is a password with twice the chances of being exposed.'
        ],
        xp: 10
      },
      {
        id: 'q8',
        type: 'choice',
        prompt: 'Why does limiting how much personal information you give any single platform help?',
        choices: [
          'If that platform is breached, less about you is exposed',
          'It makes the account load faster',
          'Platforms charge money for storing extra information',
          'It guarantees the platform will never be breached'
        ],
        answer: 0,
        explanation: 'Breaches are not fully within your control. The amount of your information sitting there is.',
        choiceFeedback: [
          null,
          'Speed is unaffected by how complete your profile is.',
          'Storing profile details is free to the user on essentially every platform.',
          'Nothing you do as a user prevents a company from being breached.'
        ],
        xp: 10
      },
      {
        id: 'q9',
        type: 'choice',
        prompt: 'What is the key difference between a privacy setting and a data breach, in terms of who controls the outcome?',
        choices: [
          'Privacy settings are within your control; a breach happens at the company and is not',
          'Both are entirely within your control',
          'Both are entirely outside your control',
          'A breach is something the user causes by posting publicly'
        ],
        answer: 0,
        explanation: 'Understanding which risks you can act on and which you can only limit the damage from is the actual skill in this lesson.',
        choiceFeedback: [
          null,
          'You cannot control whether a company gets hacked.',
          'Privacy settings are genuinely yours to set — that half is under your control.',
          'Public posting is a separate risk. A breach is theft from the company\'s systems.'
        ],
        xp: 10
      },
      {
        id: 'q10',
        type: 'choice',
        prompt: 'A student posts a photo captioned with their school, their team\'s practice time, and the field they use. Their account is public. What is the concern?',
        choices: [
          'Together those details tell a stranger exactly where they will be and when',
          'The photo will use too much storage',
          'The caption is too long to display',
          'Nothing — none of that is personal information'
        ],
        answer: 0,
        explanation: 'Each detail seems harmless alone. Combined on a public account, they are a location and a schedule — the exact pairing this lesson warns about.',
        choiceFeedback: [
          null,
          'Storage is not the risk being described.',
          'Caption length is a formatting matter, not a safety one.',
          'A place and a routine time absolutely are personal information, and are more revealing together than apart.'
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'tech7-google-workspace',
    subject: 'technology',
    tier: 1,
    quarter: 'Q1 2026-2027',
    sequenceInQuarter: 5,
    title: 'Google Workspace',
    theme: 'Docs, Sheets, Slides, and Google\'s cloud-based productivity tools',
    novaIntro: {
      glossary: {
        'cloud storage': 'Saving files on remote servers (like Google Drive) instead of only on one device, so they\'re accessible from anywhere.',
        'Google Docs': 'The word-processing app in Google Workspace, similar to Microsoft Word.',
        'Google Sheets': 'The spreadsheet app in Google Workspace, similar to Microsoft Excel.'
      },
      beats: [
        {
          label: 'The Google Workspace Toolkit',
          hook: 'What if every document you ever wrote automatically saved itself, forever, without you clicking anything?',
          teachingText: 'Google Workspace is a set of cloud-based productivity apps: Docs for writing, Sheets for spreadsheets and calculations, Slides for presentations, and Forms for surveys and quizzes. "Cloud-based" means your work saves automatically to Google Drive as you type, rather than sitting only on one computer, and you can open the same file from a phone, a school laptop, or a library computer. Because the file lives on Drive rather than on one machine, several people can also open and edit the same document at the same time, each seeing the others’ changes appear live as they type.',
          example: 'A student starts an essay in Google Docs on a school Chromebook, then finishes it that night on a home tablet — the same document, already saved, no flash drive needed.',
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'Priya\'s laptop dies mid-essay in Google Docs with unsaved-looking changes on screen. What\'s actually true?',
            choices: [
              'Google Docs auto-saves to the cloud continuously, so her recent changes are very likely already saved',
              'All her work is lost because she never clicked "Save"',
              'Only work saved to a USB drive survives a dead battery',
              'She has to retype the whole essay from memory'
            ],
            answer: 0,
            explanation: 'Google Docs saves changes to Google Drive automatically and continuously — there\'s no manual "Save" button needed for the file to be preserved.',
            choiceFeedback: [
              null,
              'This describes older, non-cloud software like a traditional Word document — Google Docs\' whole design point is continuous auto-save.',
              'Cloud-based apps like Docs don\'t need a USB drive at all — the save happens directly to Google Drive.',
              'Because of auto-save, Priya\'s essay is very likely intact and waiting for her when she reopens the file.'
            ],
            xp: 10
          },
          practiceGeneratorId: 'gen-tech-google-apps',
          practiceCount: 4
        },
        {
          label: 'Choosing the Right App',
          hook: 'Using Google Slides to build a budget spreadsheet would be like using a hammer to drive in a screw.',
          teachingText: 'Each Google Workspace app is purpose-built: Docs handles long-form writing with paragraphs, Sheets handles rows/columns of numbers and formulas, and Slides handles visual, one-idea-per-screen presentations. Picking the wrong tool makes simple tasks harder — like trying to build a budget table inside a Google Doc instead of Sheets, where formulas can calculate totals automatically.',
          example: 'A class project tracking weekly allowance and savings belongs in Google Sheets, where a SUM formula can total the numbers instantly — not in Google Docs, where you\'d have to add every number by hand.',
          practiceGeneratorId: 'gen-tech-google-choose-app',
          practiceCount: 3
        }
      ],
      connection: 'Google Workspace previews the exact kind of cloud collaboration used in real workplaces — engineers, journalists, and teachers all rely on the same "auto-saving, always-accessible" idea Lamar is using for a school essay today.',
      videoUrl: 'https://www.youtube.com/watch?v=TtYb-XDtH0g'
    },
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'Which Google Workspace app is purpose-built for spreadsheets and calculations?',
        choices: ['Google Sheets', 'Google Docs', 'Google Slides', 'Google Forms'],
        answer: 0,
        explanation: 'Sheets handles rows and columns of numbers and can calculate with formulas. Docs is for writing, Slides for presentations, Forms for surveys.',
        choiceFeedback: [
          null,
          'Docs is for long-form writing with paragraphs — it has no formula engine for calculating totals.',
          'Slides builds visual, one-idea-per-screen presentations, not calculations.',
          'Forms collects survey and quiz responses. It can send results INTO Sheets, but Sheets is where the calculating happens.'
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'What does "cloud-based" mean for a Google Workspace file?',
        choices: [
          'It saves automatically to Google Drive and opens from any device',
          'It can only be opened when the weather allows a satellite connection',
          'It is stored permanently on one specific computer',
          'It must be downloaded before it can be edited'
        ],
        answer: 0,
        explanation: 'Cloud storage means the file lives on Google\'s servers, saving as you type and opening from any signed-in device.',
        choiceFeedback: [
          null,
          '"Cloud" is a metaphor for remote servers, not actual weather. Nothing about it depends on the sky.',
          'Storing on one computer is the OPPOSITE of cloud storage — that is a local file.',
          'Cloud files are edited directly in the browser. Downloading is optional, not required.'
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'A student starts an essay on a school Chromebook and finishes it that night on a home tablet, with no flash drive. What makes that possible?',
        choices: [
          'The document is saved in cloud storage on Google Drive',
          'The Chromebook emails the file to the tablet automatically',
          'Both devices were made by the same company',
          'The essay was short enough to fit in the browser\'s memory'
        ],
        answer: 0,
        explanation: 'The file lives on Drive rather than on either device, so signing in from anywhere opens the same, already-saved document.',
        choiceFeedback: [
          null,
          'No email is sent. The file was never on one device to begin with — it lives on Drive.',
          'Manufacturer does not matter. Any device with a browser and the right sign-in can open the file.',
          'File size is irrelevant here. Cloud storage, not browser memory, is what carries the document between devices.'
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'Which Google Workspace app is designed for surveys and quizzes?',
        choices: ['Google Forms', 'Google Docs', 'Google Sheets', 'Google Slides'],
        answer: 0,
        explanation: 'Forms is built to collect responses; the responses can then flow into Sheets for analysis.',
        choiceFeedback: [
          null,
          'Docs is for writing documents. You could type questions in it, but it cannot collect and organize answers.',
          'Sheets is where Forms RESPONSES often land, but Forms is the app that actually asks the questions.',
          'Slides presents information to an audience — it does not gather responses back.'
        ],
        xp: 10
      },
      {
        id: 'q5',
        type: 'choice',
        prompt: 'A class project tracks weekly allowance and savings and needs running totals. Which app fits best, and why?',
        choices: [
          'Sheets, because a SUM formula totals the numbers automatically',
          'Docs, because it can hold a table',
          'Slides, because each week could be its own slide',
          'Forms, because it collects numbers'
        ],
        answer: 0,
        explanation: 'Picking the right tool is the point: Sheets recalculates totals instantly when a number changes, while any other option means adding by hand.',
        choiceFeedback: [
          null,
          'Docs can display a table, but it will not calculate the totals — you would add every number by hand and redo it after any change.',
          'A slide per week shows the numbers but cannot total them, and comparing across slides is harder than one column.',
          'Forms is for collecting responses, not for maintaining and recalculating a running total.'
        ],
        xp: 10
      },
      {
        id: 'q6',
        type: 'choice',
        prompt: 'Which task is Google Docs genuinely the best fit for?',
        choices: [
          'Writing a multi-paragraph research report',
          'Calculating the average of 200 test scores',
          'Building a 12-screen visual presentation for an audience',
          'Collecting survey responses from 30 classmates'
        ],
        answer: 0,
        explanation: 'Docs is built for long-form writing with paragraphs and formatting — exactly what a research report needs.',
        choiceFeedback: [
          null,
          'Averaging 200 numbers is a Sheets job — a formula does it instantly and updates when data changes.',
          'A visual, one-idea-per-screen presentation is what Slides is built for.',
          'Collecting responses from many people is what Forms does.'
        ],
        xp: 10
      },
      {
        id: 'q7',
        type: 'choice',
        prompt: 'What is the main advantage of Google Workspace files autosaving as you type?',
        choices: [
          'Work is not lost if the device shuts down unexpectedly',
          'The file becomes smaller each time it saves',
          'It prevents anyone else from opening the file',
          'It automatically corrects spelling errors'
        ],
        answer: 0,
        explanation: 'Autosave means there is no unsaved version to lose — a crash, a dead battery, or a closed tab does not erase your work.',
        choiceFeedback: [
          null,
          'Saving does not shrink a file. Autosave is about not losing work, not about size.',
          'Autosave has nothing to do with access. Sharing settings control who can open a file.',
          'Spell check is a separate feature that would work with or without autosave.'
        ],
        xp: 10
      },
      {
        id: 'q8',
        type: 'choice',
        prompt: 'Google Slides is best described as a tool for what?',
        choices: [
          'Visual, one-idea-per-screen presentations',
          'Storing large sets of numeric data',
          'Writing long documents with footnotes',
          'Sending and receiving email'
        ],
        answer: 0,
        explanation: 'Slides is built around presenting one clear idea per screen to an audience.',
        choiceFeedback: [
          null,
          'Large numeric data belongs in Sheets, where it can be sorted, filtered, and calculated.',
          'Long documents with footnotes are a Docs job — Slides is deliberately short-form.',
          'Email is Gmail. Slides does not send messages.'
        ],
        xp: 10
      },
      {
        id: 'q9',
        type: 'choice',
        prompt: 'Why does choosing the wrong Workspace app for a task actually cost you time?',
        choices: [
          'You end up doing by hand what the right app would have automated',
          'Google charges a fee for using an app incorrectly',
          'The file becomes permanently locked to that app',
          'The work cannot be shared with anyone else'
        ],
        answer: 0,
        explanation: 'Each app is purpose-built. Building a budget in Docs means adding every number manually and redoing it after every change — work Sheets would do instantly.',
        choiceFeedback: [
          null,
          'There is no penalty fee. The cost is your time, not money.',
          'Content can be copied between apps. The real cost is the manual work you did that did not need doing.',
          'Any Workspace file can be shared. Sharing is not what the wrong choice breaks.'
        ],
        xp: 10
      },
      {
        id: 'q10',
        type: 'choice',
        prompt: 'An engineering team logs rocket-motor test data — thrust readings across 40 test firings — and needs the average and the maximum. Which app, and why?',
        choices: [
          'Sheets, because formulas calculate the average and maximum and update as new tests are added',
          'Docs, because the readings can be typed as a list',
          'Slides, because each firing can be its own slide',
          'Forms, because the numbers were collected during a test'
        ],
        answer: 0,
        explanation: 'This is exactly the case Sheets exists for: numeric data plus calculations that need to stay correct as more data arrives.',
        choiceFeedback: [
          null,
          'A typed list in Docs holds the numbers but cannot compute the average or the maximum, and every new test means recalculating by hand.',
          'One slide per firing makes the data harder to compare, not easier, and still does not calculate anything.',
          'Forms could COLLECT the readings, but the analysis — average and maximum — happens in Sheets.'
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'tech7-google-workspace-2',
    subject: 'technology',
    tier: 1,
    quarter: 'Q1 2026-2027',
    sequenceInQuarter: 6,
    title: 'Google Workspace II: Collaboration Features',
    theme: 'Real-time editing, comments, forms, and version history',
    novaIntro: {
      glossary: {
        'real-time collaboration': 'A feature allowing multiple people to edit the same document simultaneously, seeing each other\'s changes live.',
        'version history': 'A Google Docs/Sheets feature that lets a user view and restore earlier versions of a document as it was edited over time.'
      },
      beats: [
        {
          label: 'Editing Together, Live',
          hook: 'Four students can write the same paragraph, at the same exact moment, from four different houses.',
          teachingText: 'Real-time collaborative editing lets multiple people edit the same Google Doc, Sheet, or Slide at once, with each person\'s cursor and changes visible live to everyone else. Comments let a user leave a note attached to a specific part of a document — a question, a suggestion — without actually changing the real text, keeping feedback separate from the content itself.',
          example: 'Three group members work on the same slide deck simultaneously, each editing a different slide, and see each other\'s changes appear instantly without ever emailing a file back and forth.',
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'A teacher wants to suggest a wording change on a student\'s essay draft WITHOUT actually editing the real text herself. What feature fits best?',
            choices: [
              'Comments, which attach a note without altering the actual text',
              'Deleting the sentence and typing her own version directly',
              'Real-time editing with no comment',
              'This is impossible in Google Docs'
            ],
            answer: 0,
            explanation: 'Comments are specifically designed to let someone leave feedback attached to specific text without changing the actual document content.',
            choiceFeedback: [
              null,
              'This directly changes the real text, which is the opposite of what the teacher wants — she wants to SUGGEST, not overwrite.',
              'Editing directly changes the actual text, not just leaving a suggestion — comments are the feature built for suggestions.',
              'Comments are a well-established, common Google Docs feature built for exactly this kind of non-destructive feedback.'
            ],
            xp: 10
          },
          practiceGeneratorId: 'gen-tech-google-collaboration',
          practiceCount: 4
        },
        {
          label: 'Version History as a Safety Net',
          hook: 'Accidentally delete an entire paragraph you wrote an hour ago? Google Docs quietly remembers it.',
          teachingText: 'Version history lets a user view and restore earlier versions of a document as it was edited over time — a safety net against accidental deletions or edits gone wrong. Google Forms, meanwhile, automatically collects and organizes responses into a spreadsheet, letting a teacher gather an entire class\'s answers without manually re-entering anything by hand. Version history also outlasts undo. Undo is limited and disappears when the tab closes, while version history keeps earlier states of the document for far longer — which is why a paragraph deleted twenty minutes ago is still recoverable when Ctrl+Z is long past helping.',
          example: 'A student accidentally deletes their whole conclusion paragraph, but opens version history and restores the document to how it looked 20 minutes earlier, recovering the lost text.',
          practiceGeneratorId: 'gen-tech-google-version-history-forms',
          practiceCount: 3
        }
      ],
      connection: 'These collaboration features are exactly why professional teams — including remote engineering teams around the world — can build things together without ever being in the same room.',
      videoUrl: 'https://www.youtube.com/watch?v=xIQYw7eJQZA'
    },
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What is real-time collaborative editing?',
        choices: [
          'Multiple people editing the same document at once, seeing each other\'s changes live',
          'Taking turns editing a file and emailing it back and forth',
          'One person editing while others watch a recording',
          'Automatically merging two separate documents into one'
        ],
        answer: 0,
        explanation: 'Everyone works in the same live document, with each person\'s cursor and changes visible to the others as they happen.',
        choiceFeedback: [
          null,
          'Emailing versions back and forth is exactly the older workflow this replaces.',
          'A recording is passive. Collaborative editing means everyone is actually editing.',
          'Merging separate files is a different operation. Here there is only ever one document.'
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'What is the point of a comment, as opposed to just editing the text?',
        choices: [
          'It attaches a note to a specific part of the document without changing the actual text',
          'It permanently locks that section so nobody can edit it',
          'It sends an email to everyone on the document',
          'It deletes the text it is attached to'
        ],
        answer: 0,
        explanation: 'Comments keep feedback separate from content — a suggestion or question can sit alongside the writing without altering it.',
        choiceFeedback: [
          null,
          'Comments do not lock anything. The text stays fully editable.',
          'Some comments trigger notifications, but that is not what a comment IS.',
          'A comment leaves the text untouched. That is the entire point.'
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'Three group members work on the same slide deck at once, each on a different slide. What makes this work?',
        choices: [
          'Real-time collaboration keeps one shared copy that everyone edits together',
          'Each person gets a private copy that merges at the end',
          'The file is emailed automatically after each change',
          'Only one person can save at a time, and the others wait'
        ],
        answer: 0,
        explanation: 'There is one document, not three. Nobody has to reconcile versions because no separate versions ever exist.',
        choiceFeedback: [
          null,
          'Private copies plus a merge is the older model, and it is where conflicting versions come from.',
          'No emailing happens. The changes are already in the shared file.',
          'There is no save queue. Edits appear as they are made.'
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'What does version history let you do?',
        choices: [
          'View and restore earlier versions of a document as it was edited over time',
          'See which websites the document was opened from',
          'Convert the document into a different file format',
          'Count how many words each person contributed'
        ],
        answer: 0,
        explanation: 'It is a safety net: accidental deletions and edits gone wrong can be undone long after the fact.',
        choiceFeedback: [
          null,
          'Version history tracks CHANGES to content, not browsing information.',
          'Format conversion is a separate export option.',
          'It shows what changed and when, not a word-count scoreboard.'
        ],
        xp: 10
      },
      {
        id: 'q5',
        type: 'choice',
        prompt: 'A student accidentally deletes their entire conclusion paragraph and does not notice for 20 minutes. What is the fix?',
        choices: [
          'Open version history and restore the document to how it looked before the deletion',
          'Nothing — the text is permanently gone',
          'Press undo, which always works no matter how much time has passed',
          'Re-download the file from Drive'
        ],
        answer: 0,
        explanation: 'This is exactly the case version history exists for — recovery well past the point where undo is practical.',
        choiceFeedback: [
          null,
          'It is recoverable. Version history keeps earlier states of the document.',
          'Undo is limited and can be lost by closing the tab or making many later edits. Version history is not.',
          'Re-downloading gets the CURRENT version, which is the one missing the paragraph.'
        ],
        xp: 10
      },
      {
        id: 'q6',
        type: 'choice',
        prompt: 'What does Google Forms do automatically with responses?',
        choices: [
          'Collects and organizes them into a spreadsheet',
          'Grades every answer for correctness',
          'Emails each response to every participant',
          'Deletes responses after 24 hours'
        ],
        answer: 0,
        explanation: 'Responses flow straight into Sheets, so a whole group\'s answers arrive organized with nothing re-entered by hand.',
        choiceFeedback: [
          null,
          'Forms can auto-grade quizzes if you set up answer keys, but organizing responses happens regardless.',
          'Responses go to the form owner, not out to all participants.',
          'Responses persist until the owner removes them.'
        ],
        xp: 10
      },
      {
        id: 'q7',
        type: 'choice',
        prompt: 'What manual work does Forms feeding into Sheets eliminate?',
        choices: [
          'Re-typing every person\'s answers into a spreadsheet by hand',
          'Writing the questions in the first place',
          'Deciding who to send the form to',
          'Reading the responses'
        ],
        answer: 0,
        explanation: 'Transcription is the error-prone, time-consuming step. Automating it removes both the time cost and a source of mistakes.',
        choiceFeedback: [
          null,
          'You still author the questions — that is the part requiring judgment.',
          'Choosing recipients is still your decision.',
          'You still have to read and interpret what came back.'
        ],
        xp: 10
      },
      {
        id: 'q8',
        type: 'choice',
        prompt: 'A teammate disagrees with a paragraph but does not want to change someone else\'s writing. What is the right tool?',
        choices: [
          'A comment attached to that paragraph',
          'Deleting the paragraph and rewriting it',
          'Restoring an old version from version history',
          'Making a private copy of the document'
        ],
        answer: 0,
        explanation: 'Comments exist for exactly this: raising a concern without overwriting a collaborator\'s work.',
        choiceFeedback: [
          null,
          'Rewriting someone\'s work without asking is the situation comments are designed to avoid.',
          'Restoring an old version would undo everyone\'s recent work, not just that paragraph.',
          'A private copy abandons the collaboration and creates the version confusion the shared document prevents.'
        ],
        xp: 10
      },
      {
        id: 'q9',
        type: 'choice',
        prompt: 'What is the underlying idea shared by real-time collaboration, comments, and version history?',
        choices: [
          'A single shared document can hold the work, the discussion about it, and its own history',
          'All three are ways to make documents load faster',
          'All three require a paid account',
          'All three replace the need to write anything'
        ],
        answer: 0,
        explanation: 'Instead of a file plus an email thread plus a folder of dated backups, everything lives in one place and stays connected.',
        choiceFeedback: [
          null,
          'None of the three are about speed.',
          'All three are available on free Google accounts.',
          'They support the writing; they do not do it for you.'
        ],
        xp: 10
      },
      {
        id: 'q10',
        type: 'choice',
        prompt: 'An engineering team on three continents co-writes a mission report. Which combination of these features matters most, and why?',
        choices: [
          'Collaboration plus version history — everyone works in one document, and any bad change can be traced and undone',
          'Forms plus comments, since a report is really a survey',
          'Version history alone, since only one person should ever write',
          'None — a report should be emailed between authors as attachments'
        ],
        answer: 0,
        explanation: 'On a document where accuracy matters and many people contribute, one shared copy plus a full recoverable history is the combination that protects the work.',
        choiceFeedback: [
          null,
          'A report is not a survey, and Forms collects responses rather than co-authoring a document.',
          'Restricting a multi-team report to one author defeats the purpose of the collaboration.',
          'Emailing attachments is exactly how conflicting versions of an important document get created.'
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'tech7-microsoft-office',
    subject: 'technology',
    tier: 1,
    quarter: 'Q1 2026-2027',
    sequenceInQuarter: 7,
    title: 'Microsoft Office',
    theme: 'Word, Excel, and PowerPoint — the traditional office productivity suite',
    novaIntro: {
      glossary: {
        'Microsoft Excel': 'The spreadsheet application in Microsoft Office, organizing data into rows and columns.',
        formula: 'In a spreadsheet, an equation (starting with =) that calculates a value, like =A1+A2.',
        cell: 'A single box in a spreadsheet, identified by its column letter and row number, like A1.'
      },
      beats: [
        {
          label: 'Word, Excel, PowerPoint — Who Does What',
          hook: 'Three apps, three completely different jobs — mix them up and you\'ll fight the software the whole time.',
          teachingText: 'Microsoft Word is for writing documents with paragraphs and formatting. Excel organizes data into a grid of cells (columns lettered A, B, C... and rows numbered 1, 2, 3...) and can calculate with formulas. PowerPoint builds slide-by-slide presentations for showing information visually to an audience. Knowing which one fits a task saves huge amounts of time. Office files are traditionally saved locally on one computer, though modern versions can also save to OneDrive — the same cloud idea Google Workspace was built around from the start.',
          example: 'A cell reference like B3 means column B, row 3 — the exact intersection where a specific piece of data lives in a spreadsheet.',
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'Coach Reyes wants a table where he can automatically total each player\'s season stats. Which app fits best?',
            choices: [
              'Microsoft Excel, using formulas to calculate totals automatically',
              'Microsoft Word, typing the numbers in a paragraph',
              'Microsoft PowerPoint, with one slide per player',
              'None of these apps can add up numbers'
            ],
            answer: 0,
            explanation: 'Excel is built specifically for organizing numeric data in rows/columns and calculating totals with formulas — exactly Coach Reyes\' need.',
            choiceFeedback: [
              null,
              'Word can hold text and even simple tables, but it has no real formula engine for automatic calculation the way Excel does.',
              'PowerPoint is for visual presentation of finished information, not for calculating and organizing raw stats.',
              'All three of these apps can handle numbers to some degree, but only Excel calculates with real formulas automatically.'
            ],
            xp: 10
          },
          practiceGeneratorId: 'gen-tech-office-apps',
          practiceCount: 4
        },
        {
          label: 'Writing a Basic Formula',
          hook: 'Type the wrong first character in Excel, and your formula becomes just... text.',
          teachingText: 'Every Excel formula must start with an equals sign (=), which tells Excel "calculate this" instead of "just display this text." A simple formula like =A1+A2 adds the values in cells A1 and A2. Without the equals sign, typing A1+A2 into a cell just displays the letters and symbols as plain text — it will not calculate anything. Formulas can also reference a whole range instead of single cells: =SUM(A1:A30) adds every value from A1 through A30 in one short expression, rather than listing thirty separate cell references.',
          example: 'Typing =A1+A2 into cell A3 makes A3 automatically display the sum of whatever numbers are in A1 and A2 — and it updates instantly if you change either number.',
          practiceGeneratorId: 'gen-tech-excel-formula-basics',
          practiceCount: 3
        }
      ],
      connection: 'Word, Excel, and PowerPoint are still the most widely used office software on the planet — mastering the "which tool for which job" instinct here transfers directly to nearly any future job.',
      videoUrl: 'https://www.youtube.com/watch?v=k1VUZEVuDJ8'
    },
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'Which Microsoft Office application organizes data into a grid of cells and calculates with formulas?',
        choices: ['Excel', 'Word', 'PowerPoint', 'Outlook'],
        answer: 0,
        explanation: 'Excel is the spreadsheet application — lettered columns, numbered rows, and formulas that calculate.',
        choiceFeedback: [
          null,
          'Word is for writing documents with paragraphs and formatting, not for calculating.',
          'PowerPoint builds slide-by-slide presentations, not spreadsheets.',
          'Outlook handles email and calendars. It does not do spreadsheet calculations.'
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'In Excel, what does the cell reference B3 mean?',
        choices: ['Column B, row 3', 'Row B, column 3', 'The third cell counting from the left', 'A formula named B3'],
        answer: 0,
        explanation: 'Columns are lettered and rows are numbered, so B3 is the exact intersection of column B and row 3.',
        choiceFeedback: [
          null,
          'It is the other way around: the LETTER is always the column and the NUMBER is always the row.',
          'Position alone does not identify a cell — you need both a column letter and a row number.',
          'B3 is an address, not a name for a formula. A formula could REFER to B3, but B3 itself is a location.'
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'Every Excel formula must start with which character?',
        choices: ['=', '+', '#', '@'],
        answer: 0,
        explanation: 'The equals sign tells Excel "calculate this" instead of "display this as text."',
        choiceFeedback: [
          null,
          'A plus sign starts an addition, but without an equals sign first Excel has no instruction to calculate at all.',
          'The # symbol appears in some Excel ERROR messages, and starts a comment in Python — it does not begin a formula.',
          'The @ symbol is used in email addresses and in some newer Excel functions, but it is not what starts a formula.'
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'You type A1+A2 into cell A3, with no equals sign. What happens?',
        choices: [
          'A3 displays the text "A1+A2" and calculates nothing',
          'A3 shows the sum of A1 and A2 anyway',
          'Excel shows an error message and refuses the entry',
          'Excel adds the equals sign for you automatically'
        ],
        answer: 0,
        explanation: 'Without the equals sign, Excel treats the entry as plain text. The characters appear exactly as typed.',
        choiceFeedback: [
          null,
          'Excel does not guess. Without the equals sign, there is no instruction to calculate.',
          'It is not an error — a valid piece of text is a perfectly acceptable cell entry. It just is not a formula.',
          'Excel will not insert the equals sign for you. That character is what tells it to calculate in the first place.'
        ],
        xp: 10
      },
      {
        id: 'q5',
        type: 'choice',
        prompt: 'Cell A3 contains =A1+A2. You then change the number in A1. What happens to A3?',
        choices: [
          'It updates instantly to reflect the new sum',
          'It keeps the old total until you retype the formula',
          'It shows an error because the data changed',
          'It updates only when the file is closed and reopened'
        ],
        answer: 0,
        explanation: 'A formula references cells, not fixed numbers — that live recalculation is exactly why spreadsheets beat adding by hand.',
        choiceFeedback: [
          null,
          'Formulas recalculate automatically. Retyping is never required after changing a referenced value.',
          'Changing input data is normal and expected — a formula is built to handle exactly that.',
          'Recalculation happens immediately, not on reopening the file.'
        ],
        xp: 10
      },
      {
        id: 'q6',
        type: 'choice',
        prompt: 'Which task is Microsoft Word genuinely the right tool for?',
        choices: [
          'Writing a formatted three-page lab report',
          'Adding 500 numbers and finding the average',
          'Presenting a project to a class on a projector',
          'Sorting a list of 1,000 names alphabetically with one click'
        ],
        answer: 0,
        explanation: 'Word is built for documents with paragraphs and formatting — reports, essays, letters.',
        choiceFeedback: [
          null,
          'Adding and averaging hundreds of numbers is Excel work — a single formula handles it.',
          'Presenting to an audience is what PowerPoint is designed for.',
          'One-click sorting of a large list is a spreadsheet feature — that is Excel.'
        ],
        xp: 10
      },
      {
        id: 'q7',
        type: 'choice',
        prompt: 'What is a "cell" in a spreadsheet?',
        choices: [
          'The box where one column and one row intersect',
          'An entire column of data',
          'A single spreadsheet file',
          'The formula bar at the top of the window'
        ],
        answer: 0,
        explanation: 'A cell is one box at the intersection of a lettered column and a numbered row — the smallest unit that can hold a value or formula.',
        choiceFeedback: [
          null,
          'A column is a whole vertical strip made up of many cells, not a single cell.',
          'A file is a workbook containing sheets, which contain many thousands of cells.',
          'The formula bar DISPLAYS the contents of the selected cell — it is not the cell itself.'
        ],
        xp: 10
      },
      {
        id: 'q8',
        type: 'choice',
        prompt: 'PowerPoint is best suited to which purpose?',
        choices: [
          'Showing information visually to an audience, slide by slide',
          'Performing statistical calculations on a data set',
          'Writing a ten-page research paper with citations',
          'Storing thousands of rows of customer records'
        ],
        answer: 0,
        explanation: 'PowerPoint builds slide-by-slide presentations designed to be shown to an audience.',
        choiceFeedback: [
          null,
          'Statistical calculation is Excel work — PowerPoint has no formula engine.',
          'A long paper with citations belongs in Word, which is built for exactly that.',
          'Thousands of rows of records is a spreadsheet or database job, not a presentation.'
        ],
        xp: 10
      },
      {
        id: 'q9',
        type: 'choice',
        prompt: 'In Excel, columns are labeled with ____ and rows are labeled with ____.',
        choices: ['letters; numbers', 'numbers; letters', 'letters; letters', 'numbers; numbers'],
        answer: 0,
        explanation: 'Columns run A, B, C...; rows run 1, 2, 3... That is why a cell address always reads as a letter followed by a number.',
        choiceFeedback: [
          null,
          'Reversed — a cell address like B3 puts the column LETTER first and the row NUMBER second.',
          'If both were letters, there would be no way to tell a column from a row in an address like B3.',
          'If both were numbers, an address like "23" would be ambiguous — that is exactly why one axis uses letters.'
        ],
        xp: 10
      },
      {
        id: 'q10',
        type: 'choice',
        prompt: 'A test engineer records the mass of 30 rocket components and needs the total to update whenever a part is redesigned. What is the best approach?',
        choices: [
          'Enter the masses in Excel and use a formula to total them',
          'Type the masses into Word and add them on a calculator each time',
          'Put each mass on its own PowerPoint slide',
          'Write the masses on paper and retotal them after every change'
        ],
        answer: 0,
        explanation: 'A formula recalculates the total automatically every time a mass changes — which is the whole reason spreadsheets exist in engineering work.',
        choiceFeedback: [
          null,
          'A calculator gives the right answer once, then goes stale the moment a part changes — and every redesign means redoing all 30.',
          'One mass per slide makes the data harder to see at once and still does not total anything.',
          'Paper cannot recalculate. Any change means adding all 30 numbers again by hand, with a fresh chance to make an error.'
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'tech7-microsoft-office-2',
    subject: 'technology',
    tier: 1,
    quarter: 'Q1 2026-2027',
    sequenceInQuarter: 8,
    title: 'Microsoft Office II: Formulas & Formatting',
    theme: 'Excel formulas, Word proofing tools, and PowerPoint themes',
    novaIntro: {
      glossary: {
        'SUM function': 'An Excel function, written =SUM(range), that adds together all values in a specified range of cells.',
        'theme (PowerPoint)': 'A design template that applies a consistent visual style (colors, fonts, layout) across all slides at once.'
      },
      beats: [
        {
          label: 'The SUM Function',
          hook: 'Add 50 numbers by hand, or let Excel do it in one line — which sounds better?',
          teachingText: 'The SUM function, written =SUM(A1:A10), adds together every value in the specified range of cells — here, A1 through A10 — in one step, instead of typing =A1+A2+A3... manually. It updates automatically if any number in that range changes, which is one of the biggest reasons spreadsheets beat doing math by hand. The colon in A1:A10 is the range operator and means "through," so it covers all ten cells rather than just the two named. Writing =A1+A2+A3 by hand gives the same answer for a handful of cells, but SUM is what scales: the same short formula works just as well across five hundred rows.',
          example: '=SUM(B2:B6) instantly adds up whatever five numbers are sitting in cells B2 through B6, and updates the moment any of those numbers change.',
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'A spreadsheet has weekly allowance amounts in cells C2 through C8. What formula adds them all together at once?',
            choices: [
              '=SUM(C2:C8)',
              'C2:C8',
              'ADD(C2,C8)',
              '=C2 to C8'
            ],
            answer: 0,
            explanation: 'The correct Excel SUM syntax is =SUM(range), where the range uses a colon between the first and last cell, like C2:C8.',
            choiceFeedback: [
              null,
              'Without the leading equals sign and SUM() function, Excel just displays this as plain text rather than calculating anything.',
              'ADD isn\'t a real Excel function name — the correct function for adding a range of cells is SUM.',
              '"to" is not valid Excel range syntax — a colon (:) is used between the first and last cell, like C2:C8.'
            ],
            xp: 10
          },
          practiceGeneratorId: 'gen-tech-excel-sum-formulas',
          practiceCount: 4
        },
        {
          label: 'Proofing Tools and Slide Themes',
          hook: 'One click can catch every typo in a five-page essay — or make an entire slide deck look professionally designed.',
          teachingText: 'Microsoft Word\'s built-in spelling and grammar check flags likely issues automatically while typing, catching many errors before a human proofreader even looks at the page. In PowerPoint, a slide theme (or design template) applies a consistent visual style — matching colors, fonts, and layout — across every slide at once, instead of manually formatting each slide separately.',
          example: 'Applying one PowerPoint theme to a 10-slide presentation instantly makes every title, background, and font consistent, instead of formatting each of the 10 slides one at a time.',
          practiceGeneratorId: 'gen-tech-office-proofing-themes',
          practiceCount: 3
        }
      ],
      connection: 'Formulas and formatting tools like these are exactly what separates someone who KNOWS office software from someone who can actually work fast and professionally in it.',
      videoUrl: 'https://www.youtube.com/watch?v=XYWstAuLTQY'
    },
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What does =SUM(A1:A10) do?',
        choices: [
          'Adds together every value in cells A1 through A10',
          'Adds only the values in A1 and A10',
          'Counts how many cells contain numbers',
          'Finds the largest value between A1 and A10'
        ],
        answer: 0,
        explanation: 'The colon means "through," so the range covers all ten cells, not just the two named.',
        choiceFeedback: [
          null,
          'That would be =A1+A10. The colon makes it a RANGE covering everything in between.',
          'Counting is the COUNT function. SUM adds values.',
          'Finding the largest is the MAX function.'
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'What is the main advantage of =SUM(B2:B6) over typing =B2+B3+B4+B5+B6?',
        choices: [
          'It is shorter, less error-prone, and scales to hundreds of cells just as easily',
          'It produces a different, more accurate total',
          'It is the only way to add numbers in Excel',
          'It permanently locks those cells from editing'
        ],
        answer: 0,
        explanation: 'Both give the same answer for five cells. The difference becomes decisive at fifty, where listing every reference by hand is impractical and easy to get wrong.',
        choiceFeedback: [
          null,
          'The totals are identical. What differs is how easy the formula is to write and check.',
          'Manual addition works too — SUM is simply better as the range grows.',
          'Formulas do not lock cells. The referenced cells stay fully editable.'
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'A cell holds =SUM(B2:B6). One of those five numbers changes. What happens?',
        choices: [
          'The total updates automatically',
          'The total stays the same until you retype the formula',
          'Excel shows an error',
          'The formula converts itself to plain text'
        ],
        answer: 0,
        explanation: 'Live recalculation is one of the biggest reasons spreadsheets beat doing the math by hand.',
        choiceFeedback: [
          null,
          'No retyping is ever needed. The formula references cells, not fixed numbers.',
          'Changing input data is completely normal and expected.',
          'The formula remains a formula.'
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'In the range A1:A10, what does the colon mean?',
        choices: ['Through — every cell from A1 to A10 inclusive', 'Divided by', 'Compared to', 'Or'],
        answer: 0,
        explanation: 'The colon is the range operator, and it includes both endpoints.',
        choiceFeedback: [
          null,
          'Division uses the forward slash.',
          'Comparison uses operators like = , >, and <.',
          'There is no "or" meaning here — the colon defines a continuous block of cells.'
        ],
        xp: 10
      },
      {
        id: 'q5',
        type: 'choice',
        prompt: 'What does Word\'s spelling and grammar check do?',
        choices: [
          'Flags likely issues automatically while you type',
          'Rewrites your sentences to improve them',
          'Guarantees a document contains no errors',
          'Checks that your facts are accurate'
        ],
        answer: 0,
        explanation: 'It catches many errors before a human proofreader looks at the page — flagging likely problems, not certifying correctness.',
        choiceFeedback: [
          null,
          'It may suggest alternatives, but it does not rewrite your work for you.',
          'It misses real errors and flags correct writing as wrong. It is an aid, not a guarantee.',
          'No spell checker verifies facts. A correctly spelled wrong date passes cleanly.'
        ],
        xp: 10
      },
      {
        id: 'q6',
        type: 'choice',
        prompt: 'What does a PowerPoint theme apply?',
        choices: [
          'A consistent visual style — matching colors, fonts, and layout — across every slide at once',
          'Animations to every slide transition',
          'The written content of the slides',
          'A password protecting the file'
        ],
        answer: 0,
        explanation: 'One theme choice replaces formatting every slide individually.',
        choiceFeedback: [
          null,
          'Transitions and animations are set separately from the theme.',
          'You write the content. The theme decides how it looks.',
          'File protection is a completely separate setting.'
        ],
        xp: 10
      },
      {
        id: 'q7',
        type: 'choice',
        prompt: 'Applying one theme to a 10-slide presentation replaces what manual work?',
        choices: [
          'Formatting each of the 10 slides one at a time',
          'Writing the text on each slide',
          'Choosing which slides to include',
          'Rehearsing the presentation'
        ],
        answer: 0,
        explanation: 'The saving is in consistency and time — every title, background, and font matches instantly instead of ten separate formatting passes.',
        choiceFeedback: [
          null,
          'Content is still yours to write.',
          'Which slides to include is an editorial decision a theme cannot make.',
          'Rehearsal is preparation, not formatting.'
        ],
        xp: 10
      },
      {
        id: 'q8',
        type: 'choice',
        prompt: 'What do the SUM function and a PowerPoint theme have in common as ideas?',
        choices: [
          'Both apply one instruction across many items instead of repeating the same work individually',
          'Both are only available in paid versions',
          'Both change the content of your work',
          'Both are used only in spreadsheets'
        ],
        answer: 0,
        explanation: 'Define it once, apply it broadly — the same principle behind a CSS rule styling every paragraph on a page.',
        choiceFeedback: [
          null,
          'Both are standard features, not premium add-ons.',
          'Neither changes your underlying content. They act on totals and on appearance.',
          'Themes are a PowerPoint feature; only SUM belongs to spreadsheets.'
        ],
        xp: 10
      },
      {
        id: 'q9',
        type: 'choice',
        prompt: 'Why should a writer still proofread carefully even with grammar check running?',
        choices: [
          'It flags likely issues but misses real errors and sometimes flags correct writing as wrong',
          'It only works on documents under one page',
          'It cannot check spelling, only grammar',
          'It stops working after the first hundred words'
        ],
        answer: 0,
        explanation: 'It is a first pass, not a final authority — which is exactly how a technical report or lab write-up should treat it.',
        choiceFeedback: [
          null,
          'Document length does not affect it.',
          'It checks both spelling and grammar.',
          'There is no word limit on the checker.'
        ],
        xp: 10
      },
      {
        id: 'q10',
        type: 'choice',
        prompt: 'An engineer logs mass readings for 40 rocket components and needs a running total that stays correct as parts are redesigned. What is the right formula, and why?',
        choices: [
          '=SUM over the whole range, because it recalculates automatically every time a value changes',
          'Adding the 40 cells individually, because it is more precise',
          'Typing the total as a plain number after adding on a calculator',
          'A PowerPoint theme, because it applies to everything at once'
        ],
        answer: 0,
        explanation: 'A range formula stays correct through every redesign. Any approach that produces a fixed number is stale the moment a part changes.',
        choiceFeedback: [
          null,
          'Both give the same total, but listing 40 references invites typing mistakes and is painful to update.',
          'A typed number does not recalculate, so it is wrong after the first change and nothing warns you.',
          'A theme controls appearance in a presentation. It cannot add numbers.'
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'tech7-internet-research',
    subject: 'technology',
    tier: 1,
    quarter: 'Q1 2026-2027',
    sequenceInQuarter: 9,
    title: 'Internet Research Skills',
    theme: 'Evaluating sources and searching effectively online',
    novaIntro: {
      glossary: {
        'keyword search': 'Searching using specific, targeted terms rather than a full sentence, to find more precise results.',
        credibility: 'How trustworthy and reliable a source is, based on things like the author\'s expertise and the site\'s purpose.',
        '.gov / .edu': 'Domain endings restricted to government and educational institutions, often (though not always) a sign of a more reliable source.'
      },
      beats: [
        {
          label: 'Searching Smarter',
          hook: 'Two students search the exact same topic — one gets useful results in seconds, one scrolls for ten minutes. What\'s the difference?',
          teachingText: 'A keyword search uses specific, targeted terms instead of a full sentence. Searching "causes American Revolution taxation" beats typing "why did the American Revolution happen can someone tell me please" — search engines match keywords, not conversational phrasing. Putting an exact phrase in quotation marks ("Boston Tea Party") also narrows results to that exact wording. Putting a minus sign before a word excludes it — searching jaguar -car filters out the vehicle and leaves results about the animal.',
          example: 'Searching "7th grade cell parts diagram" returns far more useful, specific results than searching "what are the parts of a cell I need this for school."',
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'Jasmine wants to know why the Wright brothers chose Kitty Hawk for their first flight. Which search is most effective?',
            choices: [
              '"Wright brothers Kitty Hawk reasons"',
              '"can someone please tell me everything about airplanes and how they were invented a long time ago"',
              'Just typing "airplanes"',
              '"the history of flight and also birds and also space"'
            ],
            answer: 0,
            explanation: 'Specific, targeted keywords directly matching the real question produce the most precise, useful search results.',
            choiceFeedback: [
              null,
              'This is a full conversational sentence, not targeted keywords — it will return much less precise results than a keyword search.',
              '"Airplanes" alone is far too broad to answer a specific question about the Wright brothers\' site choice.',
              'Mixing in unrelated topics like birds and space dilutes the search and moves it away from the actual question.'
            ],
            xp: 10
          },
          practiceGeneratorId: 'gen-tech-keyword-search',
          practiceCount: 4
        },
        {
          label: 'Judging a Source',
          hook: 'Not everything with a professional-looking website is actually telling the truth.',
          teachingText: 'Evaluating a source means checking who wrote it (do they have real expertise?), why it exists (to inform, sell, or persuade?), and when it was published (is it still accurate?). Domains ending in .gov or .edu are restricted to government and educational institutions, which is often — though not always — a signal of more careful fact-checking than a random .com site. Corroboration is the strongest check of all: when two genuinely independent sources report the same fact, that agreement is far more convincing than any single page, however official it looks.',
          example: 'A .gov site run by NASA about the Moon landing is generally more reliable for facts than a random blog post with no listed author and no sources.',
          practiceGeneratorId: 'gen-tech-source-evaluation',
          practiceCount: 3
        }
      ],
      connection: 'Every research skill here — precise keywords, checking who wrote something and why — is exactly what real journalists, scientists, and historians do before trusting any claim.',
      videoUrl: 'https://www.youtube.com/watch?v=TVptfuj6_yk'
    },
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What is a keyword search?',
        choices: [
          'A search using specific, targeted terms instead of a full conversational sentence',
          'A search that uses only one word, never more',
          'A search restricted to a single website',
          'A search that requires a password'
        ],
        answer: 0,
        explanation: 'Search engines match keywords, not conversational phrasing — so targeted terms return far more useful results than a full question written out.',
        choiceFeedback: [
          null,
          'Keyword searches often use several words. What matters is that each one is meaningful, not that there is only one.',
          'Limiting to one site is a different technique. Keyword searching is about WHICH words you choose, not where you look.',
          'No password is involved. The term describes how you phrase a search, not access to it.'
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'Which search would most likely return the most useful results?',
        choices: [
          'causes American Revolution taxation',
          'why did the American Revolution happen can someone tell me please',
          'history',
          'i need help with my social studies homework tonight'
        ],
        answer: 0,
        explanation: 'Three specific, meaningful keywords give the search engine exactly what to match on. Conversational filler words add nothing.',
        choiceFeedback: [
          null,
          'Most of those words — "why did," "can someone tell me please" — carry no information the search engine can match on.',
          '"History" is far too broad. It matches millions of pages about every era and place.',
          'That describes your situation, not your topic. The search engine has no subject to match on.'
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'What do quotation marks do in a search, as in "Boston Tea Party"?',
        choices: [
          'Narrow results to that exact wording',
          'Exclude those words from the results',
          'Search only news articles',
          'Translate the phrase into another language'
        ],
        answer: 0,
        explanation: 'Quotation marks force an exact-phrase match, so the words must appear together in that order.',
        choiceFeedback: [
          null,
          'Excluding a term is usually done with a minus sign, not quotation marks.',
          'Restricting to news is a separate filter. Quotation marks control WORDING, not source type.',
          'Search engines do not translate based on punctuation. Quotation marks mean "exact phrase."'
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'Evaluating a source means checking which three things?',
        choices: [
          'Who wrote it, why it exists, and when it was published',
          'How long it is, what color the site is, and how fast it loads',
          'How many images it has, its font, and its title',
          'How high it ranked in search results and how many ads it shows'
        ],
        answer: 0,
        explanation: 'Author expertise, purpose, and publication date are the three questions that actually tell you whether to trust a source.',
        choiceFeedback: [
          null,
          'Length, color, and loading speed are design and performance traits. None of them says anything about accuracy.',
          'Images, fonts, and titles are presentation. A well-designed page can still be wrong.',
          'Search ranking reflects popularity and optimization, not accuracy — and ads say nothing about whether facts are correct.'
        ],
        xp: 10
      },
      {
        id: 'q5',
        type: 'choice',
        prompt: 'Why are .gov and .edu domains often a signal of a more carefully checked source?',
        choices: [
          'They are restricted to government and educational institutions',
          'They are the oldest domains on the internet',
          'They are reviewed by a fact-checking agency before publishing',
          'They cannot legally contain any errors'
        ],
        answer: 0,
        explanation: 'Registration for these domains is restricted, so a real institution stands behind the content — which often, though not always, means more careful fact-checking than a random .com site.',
        choiceFeedback: [
          null,
          'Age is not the reason. The restriction on WHO can register them is what makes them a useful signal.',
          'No central agency reviews them. The signal comes from institutional accountability, not from pre-publication review.',
          'There is no such law, and institutional sites can still contain mistakes — which is why the lesson says "often, though not always."'
        ],
        xp: 10
      },
      {
        id: 'q6',
        type: 'choice',
        prompt: 'You find two pages about the Moon landing: a NASA .gov page and an anonymous blog post with no sources listed. Which is the better source for facts, and why?',
        choices: [
          'The NASA page, because a known expert institution stands behind it',
          'The blog, because it will be written in simpler language',
          'The blog, because it is more recent',
          'Neither — both are equally reliable'
        ],
        answer: 0,
        explanation: 'Known authorship and institutional accountability are exactly what source evaluation is looking for. An anonymous post with no sources offers neither.',
        choiceFeedback: [
          null,
          'Easier reading is not the same as accurate. Simpler wording says nothing about whether the facts are right.',
          'Recency is one of the three checks, but it does not outweigh having no author and no sources at all.',
          'They are not equal. One has a named expert institution behind it and the other has no author and no sources.'
        ],
        xp: 10
      },
      {
        id: 'q7',
        type: 'choice',
        prompt: 'A site about a nutrition supplement is written by the company that sells it. Which evaluation question does this most directly raise?',
        choices: [
          'Why does this source exist — to inform, sell, or persuade?',
          'When was it published?',
          'How many words long is it?',
          'Does the site load quickly?'
        ],
        answer: 0,
        explanation: 'Purpose is the check that catches this. A seller has a financial reason to present the product favorably, which shapes what gets included and left out.',
        choiceFeedback: [
          null,
          'Publication date is a real check, but it would not reveal the conflict of interest here.',
          'Length says nothing about motive. A long page can be just as promotional as a short one.',
          'Loading speed is a technical detail with no bearing on trustworthiness.'
        ],
        xp: 10
      },
      {
        id: 'q8',
        type: 'choice',
        prompt: 'For which topic does the publication DATE of a source matter most?',
        choices: [
          'The current number of confirmed exoplanets',
          'The year the Declaration of Independence was signed',
          'The chemical symbol for oxygen',
          'The number of sides on a hexagon'
        ],
        answer: 0,
        explanation: 'Exoplanet counts rise as new discoveries are confirmed, so a source from years ago is out of date even if it was accurate when written.',
        choiceFeedback: [
          null,
          'That date is fixed history — 1776 does not change, so an older source is not less accurate.',
          'Chemical symbols are standardized and stable. O has meant oxygen for well over a century.',
          'A hexagon has six sides by definition. Definitions in mathematics do not go out of date.'
        ],
        xp: 10
      },
      {
        id: 'q9',
        type: 'choice',
        prompt: 'Which search would give the most useful results for a diagram of plant cell parts for a 7th-grade assignment?',
        choices: [
          '"plant cell" diagram parts labeled',
          'cell',
          'what are the parts of a cell I need this for school please help',
          'science'
        ],
        answer: 0,
        explanation: 'Exact-phrase quotation marks plus the specific words "diagram," "parts," and "labeled" narrow directly to the kind of result wanted.',
        choiceFeedback: [
          null,
          '"Cell" alone matches prison cells, phone cells, battery cells, and blood cells as readily as plant cells.',
          'Almost every word there is conversational filler the search engine cannot use.',
          '"Science" is far too broad — it matches essentially every science page on the internet.'
        ],
        xp: 10
      },
      {
        id: 'q10',
        type: 'choice',
        prompt: 'Why do research skills matter directly to an aerospace engineer?',
        choices: [
          'Engineering decisions rest on verified data, and a wrong number taken from an unreliable source can reach a real design',
          'Engineers are graded on how many websites they visit',
          'Search engines rank engineering pages differently from other pages',
          'They do not — engineers only use information their employer provides'
        ],
        answer: 0,
        explanation: 'Material strengths, atmospheric data, and part specifications all get looked up. Sourcing a wrong figure carries real consequences downstream in a design.',
        choiceFeedback: [
          null,
          'Nobody is scored on pages visited. What matters is whether the information is correct.',
          'Ranking is the same across topics — and ranking is not a measure of accuracy anyway.',
          'Engineers research constantly: standards, materials data, prior missions, and published test results.'
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'tech7-internet-research-2',
    subject: 'technology',
    tier: 1,
    quarter: 'Q1 2026-2027',
    sequenceInQuarter: 10,
    title: 'Internet Research II: Fact-Checking Techniques',
    theme: 'Lateral reading and verifying claims online',
    novaIntro: {
      glossary: {
        'lateral reading': 'A fact-checking technique of opening new tabs to check what OTHER reliable sources say about a source, rather than only reading within the original page.',
        'reverse image search': 'Searching using an image instead of text, to confirm where that image originally came from.'
      },
      beats: [
        {
          label: 'Lateral Reading',
          hook: 'Professional fact-checkers almost never stay on the page they\'re evaluating — they leave it immediately.',
          teachingText: 'Lateral reading means opening new tabs to check what OTHER reliable sources say about a claim or website, instead of only reading deeper within the original page itself (which is called "vertical reading" — and is exactly what convincing scam or misinformation sites are designed to reward). Professional fact-checkers use lateral reading constantly, because a well-designed fake site can look completely convincing from the inside. The comparison worth remembering: vertical reading gathers evidence the site itself controls, while lateral reading gathers evidence it does not. A polished design, a confident tone, and a detailed About Us page are all things a site produces about itself — which is exactly why none of them settle the question.',
          example: 'Instead of trusting an unfamiliar site\'s own "About Us" page, a lateral reader opens a new tab and searches the site\'s name directly, checking what independent, established sources say about its reliability.',
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'An unfamiliar website makes a surprising claim about a new invention. What does lateral reading recommend doing first?',
            choices: [
              'Open a new tab and check what other independent, reliable sources say about this site or claim',
              'Keep reading deeper into that same site to find more convincing details',
              'Assume it\'s true since it\'s written confidently',
              'Assume it\'s false since it\'s an unfamiliar site'
            ],
            answer: 0,
            explanation: 'Lateral reading specifically means checking OUTSIDE sources, in new tabs, rather than trusting only what the original site itself claims about its own credibility.',
            choiceFeedback: [
              null,
              'This is "vertical reading" — staying within the same site — which is exactly the pattern lateral reading is designed to avoid.',
              'Confident writing style has no real connection to accuracy — plenty of false claims are written very confidently.',
              'Unfamiliarity alone doesn\'t prove something false either — the actual fix is checking independent sources, not guessing based on familiarity.'
            ],
            xp: 10
          },
          practiceGeneratorId: 'gen-tech-lateral-reading',
          practiceCount: 4
        },
        {
          label: 'Reverse Image Search',
          hook: 'A photo claiming to show a real, breaking disaster might actually be years old, from a totally different event.',
          teachingText: 'A reverse image search lets you search using an IMAGE instead of text, helping confirm where that image actually originated and whether it\'s being used out of its original context — a common technique behind misleading viral posts. Checking a claim against a dedicated fact-checking organization is another useful step, since these organizations research and verify claims using documented evidence.',
          example: 'A viral post claims a photo shows a current event, but a reverse image search reveals the exact same photo was published years earlier, showing it\'s being reused out of context.',
          practiceGeneratorId: 'gen-tech-reverse-image-search',
          practiceCount: 3
        }
      ],
      connection: 'Fact-checking skills like these matter more every year, as convincing fake content becomes easier to create — lateral reading is one of the most reliable defenses against it.',
      videoUrl: 'https://www.youtube.com/watch?v=as1IzVljNAw'
    },
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What is lateral reading?',
        choices: [
          'Opening new tabs to check what OTHER reliable sources say about a claim or site',
          'Reading a page from top to bottom carefully',
          'Reading two paragraphs side by side',
          'Skimming a page for keywords'
        ],
        answer: 0,
        explanation: 'Lateral reading leaves the page to check it from the outside, rather than digging deeper into the page itself.',
        choiceFeedback: [
          null,
          'Reading deeper within the original page is VERTICAL reading — the habit lateral reading replaces.',
          'It is about opening other SOURCES, not about physical layout on screen.',
          'Skimming is a reading speed choice. Lateral reading is about where you look next.'
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'Why is vertical reading a weak way to evaluate an unfamiliar site?',
        choices: [
          'A well-designed fake site is built to look convincing from the inside',
          'Vertical reading takes too long',
          'Most websites cannot be scrolled',
          'It only works on printed material'
        ],
        answer: 0,
        explanation: 'Scam and misinformation sites invest in looking credible on their own pages — which is exactly the evidence vertical reading relies on.',
        choiceFeedback: [
          null,
          'Speed is not the issue. The issue is that the evidence you gather that way is controlled by the site itself.',
          'Scrolling works fine. The problem is who wrote what you are scrolling through.',
          'Both approaches apply online; lateral reading is specifically a web technique.'
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'Instead of trusting a site\'s own "About Us" page, what does a lateral reader do?',
        choices: [
          'Opens a new tab and searches the site\'s name to see what independent sources say',
          'Reads the About Us page more slowly and carefully',
          'Checks whether the About Us page has photographs',
          'Counts how many pages the site has'
        ],
        answer: 0,
        explanation: 'An About Us page is written by the site about itself. Independent coverage is a genuinely separate source of evidence.',
        choiceFeedback: [
          null,
          'Reading self-description more carefully still leaves you with only self-description.',
          'Photos are easy to add and prove nothing about reliability.',
          'Site size says nothing about accuracy.'
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'Who uses lateral reading as a standard professional technique?',
        choices: ['Professional fact-checkers', 'Web designers', 'Software testers', 'Data entry clerks'],
        answer: 0,
        explanation: 'Fact-checkers use it constantly, and research comparing them to other readers is where the technique became widely known.',
        choiceFeedback: [
          null,
          'Designers build sites; they do not verify claims as their core work.',
          'Software testers check that programs behave correctly, not that claims are true.',
          'Data entry is transcription, not verification.'
        ],
        xp: 10
      },
      {
        id: 'q5',
        type: 'choice',
        prompt: 'What is a reverse image search?',
        choices: [
          'Searching using an image instead of text to find where it came from',
          'Flipping an image horizontally before saving it',
          'Searching for text that appears inside an image',
          'Finding images that are the opposite color'
        ],
        answer: 0,
        explanation: 'It answers "where has this picture appeared before?" — which is how reused, out-of-context images get caught.',
        choiceFeedback: [
          null,
          'Flipping is an editing operation, not a search.',
          'Reading text inside an image is optical character recognition — a different tool.',
          'Color inversion is an image effect, unrelated to searching.'
        ],
        xp: 10
      },
      {
        id: 'q6',
        type: 'choice',
        prompt: 'A viral post claims a photo shows a current event, but a reverse image search finds the same photo published years earlier. What does that establish?',
        choices: [
          'The photo is being reused out of its original context',
          'The photo is fake and was never real',
          'The original publisher stole the photo',
          'Nothing — old photos can still show current events'
        ],
        answer: 0,
        explanation: 'The image may be entirely genuine. What is false is the claim about when and what it shows.',
        choiceFeedback: [
          null,
          'The photo is likely real. The CAPTION is what misleads.',
          'Earlier publication normally indicates the original, not theft.',
          'A photo taken years ago cannot depict an event that happened last week.'
        ],
        xp: 10
      },
      {
        id: 'q7',
        type: 'choice',
        prompt: 'Why is checking a claim against a dedicated fact-checking organization useful?',
        choices: [
          'They research and verify claims using documented evidence',
          'They are legally required to be correct',
          'They only publish claims that are true',
          'They are always faster than searching yourself'
        ],
        answer: 0,
        explanation: 'The value is the documented evidence trail — you can follow their sources rather than taking their word for it.',
        choiceFeedback: [
          null,
          'No law compels accuracy. Their value comes from method and transparency.',
          'They publish assessments of claims including false ones — that is the point.',
          'Speed varies. Rigor is what makes them worth consulting.'
        ],
        xp: 10
      },
      {
        id: 'q8',
        type: 'choice',
        prompt: 'How do the Q1 skills and these Q2 skills fit together?',
        choices: [
          'Q1 was judging a source by who wrote it, why, and when; Q2 checks the source from OUTSIDE it',
          'Q2 replaces Q1 — source evaluation is no longer needed',
          'They apply to completely unrelated situations',
          'Q1 was for images and Q2 is for text'
        ],
        answer: 0,
        explanation: 'Author, purpose, and date are what you can see on the page. Lateral reading and reverse image search bring in evidence the page does not control.',
        choiceFeedback: [
          null,
          'Both matter. Lateral reading extends source evaluation rather than replacing it.',
          'They apply to the same task: deciding whether to trust something online.',
          'Q1 covered written sources; Q2 covers both text claims and images.'
        ],
        xp: 10
      },
      {
        id: 'q9',
        type: 'choice',
        prompt: 'A polished site with a professional design, an impressive About Us page, and confident writing makes a scientific claim you have never heard. What should you do first?',
        choices: [
          'Open a new tab and see what established sources say about the site and the claim',
          'Read the rest of the site to see whether it stays consistent',
          'Trust it, since the design is professional',
          'Check whether the page loads quickly'
        ],
        answer: 0,
        explanation: 'Every signal listed is one the site produced about itself. Polish is cheap; independent corroboration is not.',
        choiceFeedback: [
          null,
          'Internal consistency is easy to fake — a site can be perfectly consistent and entirely wrong.',
          'Design quality has no relationship to accuracy, and convincing design is exactly what a good fake invests in.',
          'Loading speed is a technical detail with no bearing on truth.'
        ],
        xp: 10
      },
      {
        id: 'q10',
        type: 'choice',
        prompt: 'Why do these fact-checking skills matter for an aerospace engineer specifically?',
        choices: [
          'Engineers look up material properties, standards, and prior results — a wrong figure from an unverified source can reach a real design',
          'Engineers must fact-check every photo they see',
          'Engineering journals publish only images',
          'They do not — engineers only use company data'
        ],
        answer: 0,
        explanation: 'Verification is not an academic exercise in engineering. A number sourced badly can propagate all the way into hardware.',
        choiceFeedback: [
          null,
          'Image verification is a useful skill, but the core professional need is verifying DATA and claims.',
          'Journals publish text, data, and figures together.',
          'Engineers routinely consult external standards, published research, and materials databases.'
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'tech7-scratch',
    subject: 'technology',
    tier: 1,
    quarter: 'Q1 2026-2027',
    sequenceInQuarter: 11,
    title: 'Scratch Programming',
    theme: 'Visual block-based coding with sprites, loops, and conditionals',
    novaIntro: {
      glossary: {
        sprite: 'A programmable character or object in a Scratch project that can move, speak, or interact.',
        loop: 'A block of code that repeats a set of actions, either a set number of times or forever.',
        conditional: 'A block like "if...then" that only runs its code when a certain condition is true.'
      },
      beats: [
        {
          label: 'Sprites and Blocks',
          hook: 'What if you could write real code without typing a single line of text?',
          teachingText: 'Scratch, built by MIT, uses drag-and-drop visual blocks instead of typed syntax — you snap blocks together like puzzle pieces to build a program. The characters or objects you control are called sprites, and each sprite has its own stack of code blocks controlling how it moves, looks, and reacts. Because the blocks are shaped to only fit together in valid ways, Scratch prevents many of the typing errors that trip up beginners in text-based languages.',
          example: 'Snapping a "move 10 steps" block under a "when green flag clicked" block makes a sprite walk forward 10 steps the instant you start the program.',
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'A Scratch project needs a cat sprite to spin in a circle 5 times whenever the space bar is pressed. What two block types does this need?',
            choices: [
              'A "when space key pressed" event block plus a loop block repeating a turn action',
              'Only a "move" block, repeated by copy-pasting it 100 times',
              'A variable block with no event or loop needed',
              'A costume block that changes the cat\'s picture instead of moving it'
            ],
            answer: 0,
            explanation: 'Detecting the key press needs an event block, and repeating the spin cleanly needs a loop wrapped around a turn action — the two core building blocks for this behavior.',
            choiceFeedback: [
              null,
              'Copy-pasting a move block many times works but is not how spinning in a circle is built, and it ignores detecting the key press entirely.',
              'A variable stores a value like a score — it does not detect key presses or make anything move or spin.',
              'A costume block changes appearance, not rotation or movement, and this project also needs to detect the key press.'
            ],
            xp: 10
          },
          practiceGeneratorId: 'gen-tech-scratch-sprites-blocks',
          practiceCount: 4
        },
        {
          label: 'Loops and Conditionals',
          hook: 'Why write the same instruction 100 times when you can tell the computer to just repeat it?',
          teachingText: 'A loop repeats a set of actions — a "repeat 10" block runs its contents exactly 10 times, while a "forever" block runs continuously until the program stops. A conditional, like an "if...then" block, only runs its contents when a condition is true, letting a sprite react differently to different situations (like touching an edge versus touching another sprite). Loops and conditionals are usually combined rather than used alone — a forever loop keeps checking while a conditional inside it decides whether to act. That pairing is the basic shape of nearly every interactive program, in any language.',
          example: 'A maze game might use "if touching color red, then go back to start" — the conditional only triggers the reset when the sprite actually touches the red wall.',
          practiceGeneratorId: 'gen-tech-scratch-loops-conditionals',
          practiceCount: 3
        }
      ],
      connection: 'Loops and conditionals are two of the most fundamental ideas in ALL programming — the exact same logic reappears later in Python, JavaScript, and every real coding language Lamar will ever touch.',
      videoUrl: 'https://www.youtube.com/watch?v=svC8TGqPHhE'
    },
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'In Scratch, what is a sprite?',
        choices: [
          'A character or object you control with code blocks',
          'A single command block',
          'The background image of a project',
          'A error message shown when code fails'
        ],
        answer: 0,
        explanation: 'Each sprite is an object in the project, and each has its own stack of blocks controlling how it moves, looks, and reacts.',
        choiceFeedback: [
          null,
          'A single command is a block. Sprites are the objects the blocks control.',
          'The background is called the stage or a backdrop, not a sprite.',
          'Scratch prevents most errors by design — and an error message would not be called a sprite.'
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'Who built Scratch?',
        choices: ['MIT', 'Google', 'NASA', 'Microsoft'],
        answer: 0,
        explanation: 'Scratch was built by MIT. Blockly, a similar block-based tool, is the one made by Google.',
        choiceFeedback: [
          null,
          'Google made Blockly, the other block-based language in this course — not Scratch.',
          'NASA publishes educational materials but did not build Scratch.',
          'Microsoft makes MakeCode, a different block-based environment. Scratch came from MIT.'
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'How does Scratch prevent many of the errors that trip up beginners in text-based languages?',
        choices: [
          'Blocks are shaped so they only fit together in valid ways',
          'It automatically corrects misspelled words as you type',
          'It refuses to run any program with more than 20 blocks',
          'It requires a teacher to approve each program'
        ],
        answer: 0,
        explanation: 'The physical shape of each block enforces valid structure, so whole categories of syntax mistakes cannot be made in the first place.',
        choiceFeedback: [
          null,
          'There is very little typing to misspell — you drag blocks rather than type commands.',
          'There is no block limit. Real Scratch projects can run to hundreds of blocks.',
          'No approval step exists. Prevention is built into the shape of the blocks themselves.'
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'A "repeat 10" block does what?',
        choices: [
          'Runs the blocks inside it exactly 10 times',
          'Runs the blocks inside it until the program is stopped',
          'Waits 10 seconds before running',
          'Makes 10 copies of the sprite'
        ],
        answer: 0,
        explanation: 'A "repeat 10" loop runs a fixed number of times. A "forever" loop is the one that runs continuously until the program stops.',
        choiceFeedback: [
          null,
          'Running until stopped describes a FOREVER loop. "Repeat 10" has a set count.',
          'Waiting is what a "wait" block does. "Repeat" controls how many times, not how long.',
          'Copying a sprite is cloning — a different block entirely.'
        ],
        xp: 10
      },
      {
        id: 'q5',
        type: 'choice',
        prompt: 'What does a conditional block, like "if...then," do?',
        choices: [
          'Runs its contents only when a condition is true',
          'Runs its contents a fixed number of times',
          'Runs its contents continuously',
          'Stops the program immediately'
        ],
        answer: 0,
        explanation: 'A conditional checks a situation and only acts when the condition is met, which is how a sprite reacts differently to different situations.',
        choiceFeedback: [
          null,
          'A fixed number of repetitions is a "repeat" loop, not a conditional.',
          'Running continuously is a "forever" loop. A conditional checks before acting.',
          'Stopping is what a "stop" block does. A conditional decides WHETHER to act, not whether to quit.'
        ],
        xp: 10
      },
      {
        id: 'q6',
        type: 'choice',
        prompt: 'In a maze game, which block combination would send a sprite back to the start whenever it touches a red wall?',
        choices: [
          'if touching color red, then go to start',
          'repeat 10, then go to start',
          'forever, go to start',
          'when green flag clicked, go to start'
        ],
        answer: 0,
        explanation: 'The reset should only happen in one specific situation — touching red — which is exactly what a conditional is for.',
        choiceFeedback: [
          null,
          '"Repeat 10" would reset after a fixed count regardless of where the sprite is, which is not what the rule describes.',
          '"Forever, go to start" would send the sprite back constantly, making the maze impossible to play.',
          'That runs once at the beginning of the game. It would not respond to touching a wall during play.'
        ],
        xp: 10
      },
      {
        id: 'q7',
        type: 'choice',
        prompt: 'What happens when you snap a "move 10 steps" block directly under a "when green flag clicked" block?',
        choices: [
          'The sprite moves forward 10 steps the moment the program starts',
          'The sprite moves 10 steps every second forever',
          'Nothing happens until you click the sprite itself',
          'The sprite grows 10 percent larger'
        ],
        answer: 0,
        explanation: 'The green-flag block is the trigger, and the block beneath it runs immediately once the program starts.',
        choiceFeedback: [
          null,
          'Repeating forever would require a loop block wrapped around the move block.',
          'Clicking the sprite is a DIFFERENT trigger block. The green flag starts the whole program.',
          '"Move" changes position, not size. Changing size is a separate "change size" block.'
        ],
        xp: 10
      },
      {
        id: 'q8',
        type: 'choice',
        prompt: 'What is the difference between a "repeat" loop and a "forever" loop?',
        choices: [
          '"Repeat" runs a set number of times; "forever" runs until the program stops',
          '"Repeat" is faster than "forever"',
          '"Forever" can only be used once per project',
          'There is no difference — they are two names for the same block'
        ],
        answer: 0,
        explanation: 'Both are loops. The difference is whether the number of repetitions is fixed or open-ended.',
        choiceFeedback: [
          null,
          'Speed is the same. The difference is how many times each one runs.',
          'A project can use as many "forever" loops as it needs, including one per sprite.',
          'They behave differently in an important way: one counts, the other does not stop on its own.'
        ],
        xp: 10
      },
      {
        id: 'q9',
        type: 'choice',
        prompt: 'A sprite should flip direction every time it hits the edge of the screen, no matter when that happens. What structure does this need?',
        choices: [
          'A forever loop containing a conditional that checks for touching the edge',
          'A single "turn 180 degrees" block with no loop',
          'A "repeat 4" loop with no conditional',
          'A "wait 1 second" block repeated many times'
        ],
        answer: 0,
        explanation: 'The check has to keep happening (forever loop) but the turn should only fire in one situation (conditional) — combining the two is the standard pattern.',
        choiceFeedback: [
          null,
          'A single turn block runs once and then never checks again.',
          '"Repeat 4" turns four times regardless of where the sprite actually is — the turn is not tied to hitting the edge.',
          'Waiting does not detect anything. Something has to CHECK for the edge.'
        ],
        xp: 10
      },
      {
        id: 'q10',
        type: 'choice',
        prompt: 'Why is learning loops and conditionals in Scratch genuinely useful even if you later switch to Python or JavaScript?',
        choices: [
          'Loops and conditionals are core ideas that exist in essentially every programming language',
          'Scratch code can be pasted directly into Python',
          'Professional software is usually written in Scratch',
          'Python and JavaScript have no loops'
        ],
        answer: 0,
        explanation: 'The blocks change but the concepts do not — repetition and conditional branching are fundamental to programming in any language.',
        choiceFeedback: [
          null,
          'Scratch blocks cannot be pasted into Python. Blockly is the tool that converts to text-based code, not Scratch.',
          'Scratch is a learning environment. Professional software is written in text-based languages.',
          'Both have loops — Python uses "for" and "while," JavaScript uses "for" and "while" too.'
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'tech7-scratch-2',
    subject: 'technology',
    tier: 1,
    quarter: 'Q1 2026-2027',
    sequenceInQuarter: 12,
    title: 'Scratch II: Broadcasting & Costumes',
    theme: 'Sprites communicating with each other and changing appearance',
    novaIntro: {
      glossary: {
        broadcast: 'A Scratch block that sends a signal other sprites can detect and respond to.',
        costume: 'One of the visual appearances a sprite can switch between, often used for animation.'
      },
      beats: [
        {
          label: 'Sprites Talking to Each Other',
          hook: 'How does one sprite tell a COMPLETELY DIFFERENT sprite, on the other side of the screen, that something just happened?',
          teachingText: 'Broadcast blocks let one sprite send a signal that any other sprite in the project can detect and respond to, using a matching "when I receive" block. This is how sprites communicate across a project — for example, a player sprite broadcasting "game over" the instant it touches an enemy, so a separate scoreboard sprite can react by displaying the final score. A broadcast reaches the WHOLE project at once, not one chosen sprite, so every sprite holding a matching "when I receive" block responds together. That is what makes it the right tool for a moment several sprites must react to simultaneously — a countdown reaching zero, or a game ending.',
          example: 'When a player sprite touches a coin, it can broadcast "coin collected," and a separate score-display sprite, listening with "when I receive coin collected," adds 1 to the visible score.',
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'A game has a player sprite and a separate "Game Over" text sprite that should appear only when the player touches a shark. What block lets the player sprite trigger the text sprite?',
            choices: [
              'Broadcast, sent when touching the shark, received by the text sprite',
              'Forever, since forever loops connect sprites automatically',
              'A costume change on the player sprite alone',
              'This requires combining both sprites into a single sprite'
            ],
            answer: 0,
            explanation: 'Broadcast is specifically built for cross-sprite communication — exactly this "one sprite tells another sprite something happened" scenario.',
            choiceFeedback: [
              null,
              'A forever loop repeats actions continuously — it has no built-in way to send a signal to a different sprite.',
              'Changing the player sprite\'s own costume doesn\'t affect a completely separate sprite at all.',
              'Sprites can absolutely stay separate and still communicate — that is exactly what broadcast blocks are for.'
            ],
            xp: 10
          },
          practiceGeneratorId: 'gen-tech-scratch-broadcast',
          practiceCount: 4
        },
        {
          label: 'Costumes and Animation',
          hook: 'A walking character in a game is really just a rapid slideshow of slightly different pictures.',
          teachingText: 'A costume is one of the visual appearances a sprite can switch between — most sprites start with at least one, but you can add more, like slightly different walking poses. Combining a loop with a "next costume" block, timed with short waits, creates the illusion of smooth animation, the same basic principle used in cartoons and games.',
          example: 'A cat sprite with 4 walking costumes, cycled with a loop and a tiny wait between each, appears to actually walk across the screen.',
          practiceGeneratorId: 'gen-tech-scratch-costumes',
          practiceCount: 3
        }
      ],
      connection: 'Broadcasting and costumes are what turn a simple single-sprite Scratch project into a real, multi-character animated game — the same techniques scale up to much bigger projects.',
      videoUrl: 'https://www.youtube.com/watch?v=0ZHalwPO1og'
    },
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What does a broadcast block do in Scratch?',
        choices: [
          'Sends a signal any other sprite in the project can detect and respond to',
          'Plays a sound through the speakers',
          'Posts the project publicly online',
          'Deletes all other sprites'
        ],
        answer: 0,
        explanation: 'Broadcasting is how sprites communicate — one sends a message, and any sprite with a matching receive block reacts.',
        choiceFeedback: [
          null,
          'Sound is handled by separate sound blocks. A broadcast is a silent internal signal.',
          'Sharing a project publicly is a separate action in the Scratch interface.',
          'Broadcasting communicates with sprites; it never removes them.'
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'Which block does a sprite need in order to react to a broadcast?',
        choices: ['"when I receive"', '"when green flag clicked"', '"when this sprite clicked"', '"forever"'],
        answer: 0,
        explanation: 'A broadcast needs a matching "when I receive" block on the listening side, or nothing happens.',
        choiceFeedback: [
          null,
          'The green flag responds to the program starting, not to a broadcast.',
          'That responds to the user clicking the sprite directly, not to a message from another sprite.',
          '"forever" is a loop. It repeats blocks; it does not listen for messages.'
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'A player sprite touches a coin and broadcasts "coin collected." A separate score sprite adds 1 to the score. Why is broadcasting the right tool here?',
        choices: [
          'The two sprites have separate code, and a broadcast is how one tells the other something happened',
          'Broadcasting makes the coin disappear automatically',
          'Only broadcasts can change a number',
          'The score sprite cannot run any code without it'
        ],
        answer: 0,
        explanation: 'Each sprite has its own stack of blocks. Broadcasting is the bridge that lets an event in one sprite trigger behavior in another.',
        choiceFeedback: [
          null,
          'Hiding or removing the coin needs its own separate blocks — a broadcast does not do it by itself.',
          'Any sprite can change a variable. The question is how it learns that the moment has arrived.',
          'The score sprite can run plenty of code on its own. What it cannot do is know when the coin was touched.'
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'What is a costume in Scratch?',
        choices: [
          'One of the visual appearances a sprite can switch between',
          'The background image behind the sprites',
          'A block that changes a sprite\'s speed',
          'The name shown above a sprite'
        ],
        answer: 0,
        explanation: 'A sprite can hold several costumes — slightly different poses or looks — and switch between them.',
        choiceFeedback: [
          null,
          'The background is the stage or a backdrop, which is a separate concept from a sprite costume.',
          'Speed comes from movement blocks and wait timing, not from costumes.',
          'A sprite\'s name is a label. A costume is what it LOOKS like.'
        ],
        xp: 10
      },
      {
        id: 'q5',
        type: 'choice',
        prompt: 'How do you create the illusion of smooth animation in Scratch?',
        choices: [
          'Loop through costumes with a "next costume" block and short waits between them',
          'Increase the sprite\'s size repeatedly',
          'Broadcast a message very quickly',
          'Add more sprites to the project'
        ],
        answer: 0,
        explanation: 'Switching between slightly different costumes at a steady pace is the same basic principle behind cartoons and games.',
        choiceFeedback: [
          null,
          'Growing a sprite changes its size, not its pose. That is scaling, not animation of movement.',
          'Broadcasts carry messages. They do not change what a sprite looks like.',
          'More sprites means more characters, not smoother motion for one of them.'
        ],
        xp: 10
      },
      {
        id: 'q6',
        type: 'choice',
        prompt: 'Why are the short waits between costume changes important?',
        choices: [
          'Without them the costumes switch too fast to read as motion',
          'They give the computer time to save the project',
          'They are required before any broadcast can be sent',
          'They make the sprite move across the screen'
        ],
        answer: 0,
        explanation: 'Animation depends on timing. Frames flipping instantly look like a blur or a flicker rather than a walk cycle.',
        choiceFeedback: [
          null,
          'Saving happens separately and is not affected by wait blocks.',
          'Broadcasts have no timing requirement.',
          'Moving across the screen needs motion blocks. Costume changes only alter appearance.'
        ],
        xp: 10
      },
      {
        id: 'q7',
        type: 'choice',
        prompt: 'A cat sprite has 4 walking costumes cycled in a loop, but it stays in one spot. What is missing?',
        choices: [
          'Motion blocks — costumes change appearance, not position',
          'More costumes',
          'A broadcast block',
          'A longer wait between costumes'
        ],
        answer: 0,
        explanation: 'Appearance and position are separate. A convincing walk needs the legs cycling AND the sprite actually moving.',
        choiceFeedback: [
          null,
          'Four costumes is plenty for a walk cycle. The problem is not the animation.',
          'A broadcast sends a message to other sprites; it does not move this one.',
          'Changing the timing alters how fast the legs cycle, not whether the cat travels.'
        ],
        xp: 10
      },
      {
        id: 'q8',
        type: 'choice',
        prompt: 'Three sprites all have a "when I receive game over" block. One sprite broadcasts "game over." What happens?',
        choices: [
          'All three respond, because any sprite with a matching receive block reacts',
          'Only the closest sprite responds',
          'Only the first sprite created responds',
          'Nothing happens unless each sprite is clicked'
        ],
        answer: 0,
        explanation: 'A broadcast goes to the whole project at once, which is precisely what makes it useful for coordinating several sprites.',
        choiceFeedback: [
          null,
          'Distance on the stage has no effect on broadcasts.',
          'Creation order does not matter. Every matching listener responds.',
          'Clicking is a different trigger entirely. A broadcast needs no click.'
        ],
        xp: 10
      },
      {
        id: 'q9',
        type: 'choice',
        prompt: 'What is the real advantage of broadcasting over putting all the code in one sprite?',
        choices: [
          'Each sprite keeps its own logic, so the project stays organized as it grows',
          'Broadcasts make the project run faster',
          'It reduces the number of blocks needed to zero',
          'Only broadcast projects can be saved'
        ],
        answer: 0,
        explanation: 'Separating responsibilities — one sprite handles play, another handles scoring — is a real programming principle, not just a Scratch convenience.',
        choiceFeedback: [
          null,
          'Speed is essentially unchanged. Organization is the benefit.',
          'You still write blocks in every sprite. They are just better arranged.',
          'Any Scratch project can be saved, broadcast or not.'
        ],
        xp: 10
      },
      {
        id: 'q10',
        type: 'choice',
        prompt: 'A student builds a rocket-launch animation: a countdown sprite, a rocket sprite, and a smoke sprite that must all react at liftoff. What is the cleanest approach?',
        choices: [
          'The countdown sprite broadcasts "liftoff," and the rocket and smoke sprites each respond with their own receive block',
          'Put every sprite\'s code inside the countdown sprite',
          'Have the student click each sprite at the right moment',
          'Give each sprite a forever loop that guesses when liftoff happened'
        ],
        answer: 0,
        explanation: 'One event, several independent responders — exactly the situation broadcasting was designed for.',
        choiceFeedback: [
          null,
          'One sprite cannot run another sprite\'s blocks. Each needs its own code.',
          'Manual clicking makes the animation depend on human timing, which defeats the purpose.',
          'Guessing is unreliable and wasteful. A broadcast tells them exactly when.'
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'tech7-blockly',
    subject: 'technology',
    tier: 1,
    quarter: 'Q1 2026-2027',
    sequenceInQuarter: 13,
    title: 'Blockly Programming',
    theme: 'Block-based coding as a bridge to text-based languages',
    novaIntro: {
      glossary: {
        Blockly: 'Google\'s block-based visual programming tool that can also generate real text-based code, like JavaScript or Python.',
        variable: 'A named place in a program that stores and can reuse a value, like a score or a name.'
      },
      beats: [
        {
          label: 'Snapping Together Real Code',
          hook: 'What if the blocks you snap together could turn into actual JavaScript or Python code with one click?',
          teachingText: 'Blockly, made by Google, works like Scratch — snap-together visual blocks instead of typed syntax — but with a key difference: many Blockly projects can be converted directly into real text-based code, like JavaScript or Python. This makes Blockly a genuine bridge between visual, beginner-friendly programming and the professional coding languages used in real software. Blockly is also open source, which is why it turns up inside many other learning tools and robotics kits rather than only in Google’s own products.',
          example: 'A Blockly program that repeats "move forward" 4 times to draw a square can generate the actual JavaScript code for (let i = 0; i < 4; i++) { moveForward(); } behind the scenes.',
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'A student wants to store a changing score in a Blockly maze game. What programming concept do they need?',
            choices: [
              'A variable, to name and store the score value so it can update',
              'A loop, since scores never change',
              'A comment, since comments store data permanently',
              'Nothing — Blockly cannot store any values'
            ],
            answer: 0,
            explanation: 'A variable is a named storage spot for a value that changes over time, which is exactly what a running score needs.',
            choiceFeedback: [
              null,
              'A loop repeats actions — it does not store or hold onto a value like a score by itself.',
              'Comments are notes for humans reading the code; they don\'t store or affect any actual data in the program.',
              'Blockly absolutely supports variables — they are one of its core building blocks, just like in text-based languages.'
            ],
            xp: 10
          },
          practiceGeneratorId: 'gen-tech-blockly-basics',
          practiceCount: 4
        },
        {
          label: 'Why Blocks Prevent Errors',
          hook: 'A single missing semicolon can break an entire text-based program — but a block simply won\'t snap in wrong.',
          teachingText: 'Text-based languages fail if you miss a semicolon, misspell a keyword, or mismatch a bracket — tiny errors called syntax errors. Blockly\'s blocks are physically shaped so they only connect in valid configurations, which prevents most syntax errors before they can even happen, letting beginners focus on the LOGIC of a program instead of exact spelling and punctuation. Syntax errors are different from logic errors, and the distinction matters: a syntax error stops a program from running at all, while a logic error runs perfectly and quietly produces the wrong answer.',
          example: 'You physically cannot snap a "number" block into a slot built for a "boolean true/false" block in Blockly — the shapes just won\'t fit, catching the mistake instantly.',
          practiceGeneratorId: 'gen-tech-blockly-syntax-prevention',
          practiceCount: 3
        }
      ],
      connection: 'Blockly is specifically designed as a stepping stone — the logic Lamar practices here (variables, loops, conditionals) is identical to the logic he\'ll use typing real Python and JavaScript later this semester.',
      videoUrl: 'https://www.youtube.com/watch?v=pXSbTQEdPBg'
    },
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'Who made Blockly?',
        choices: ['Google', 'MIT', 'Apple', 'NASA'],
        answer: 0,
        explanation: 'Blockly was made by Google. MIT is the one that built Scratch.',
        choiceFeedback: [
          null,
          'MIT built Scratch, the other block-based language in this course.',
          'Apple does not make Blockly. Google does.',
          'NASA publishes educational coding materials but did not create Blockly.'
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'What is the key difference between Blockly and Scratch?',
        choices: [
          'Many Blockly projects can be converted directly into real text-based code like JavaScript or Python',
          'Blockly uses typed commands instead of blocks',
          'Blockly can only make games',
          'Blockly requires a paid subscription'
        ],
        answer: 0,
        explanation: 'That conversion is what makes Blockly a genuine bridge between visual programming and the professional languages used in real software.',
        choiceFeedback: [
          null,
          'Blockly is block-based, just like Scratch. The difference is what the blocks can turn INTO.',
          'Blockly is used for many kinds of projects, not just games.',
          'Blockly is free and open source. Cost is not the difference.'
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'What is a syntax error?',
        choices: [
          'A mistake in the exact spelling, punctuation, or structure a language requires',
          'A mistake in the logic of what the program is trying to do',
          'A program that runs too slowly',
          'A program that uses too much memory'
        ],
        answer: 0,
        explanation: 'A missing semicolon, a misspelled keyword, or a mismatched bracket are all syntax errors — the program cannot even be read correctly, let alone run.',
        choiceFeedback: [
          null,
          'That is a LOGIC error: the code runs fine but does the wrong thing. Syntax errors stop it from running at all.',
          'Slowness is a performance problem, not a syntax problem.',
          'Memory use is also a performance issue. Syntax is about form, not resource use.'
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'How do Blockly blocks prevent most syntax errors?',
        choices: [
          'They are physically shaped so they only connect in valid configurations',
          'They automatically correct any misspelled word',
          'They will not let you write more than 50 lines of code',
          'They ask a teacher to check each connection'
        ],
        answer: 0,
        explanation: 'If two blocks would produce invalid code, their shapes simply will not fit together — so the mistake is caught before it can be made.',
        choiceFeedback: [
          null,
          'There is almost nothing to misspell, since you drag blocks rather than type commands.',
          'There is no line limit in Blockly.',
          'No approval step exists. The prevention is built into the block shapes themselves.'
        ],
        xp: 10
      },
      {
        id: 'q5',
        type: 'choice',
        prompt: 'What is a variable?',
        choices: [
          'A named container that stores a value which can change',
          'A command that repeats an action',
          'A block that can never be deleted',
          'An error in a program'
        ],
        answer: 0,
        explanation: 'Variables hold values — a score, a name, a temperature — and the stored value can be updated as the program runs.',
        choiceFeedback: [
          null,
          'Repeating an action is what a loop does. A variable stores a value.',
          'Variables can be created and deleted freely. Permanence is not what defines them.',
          'An error is a mistake in the code. A variable is a deliberate storage tool.'
        ],
        xp: 10
      },
      {
        id: 'q6',
        type: 'choice',
        prompt: 'A Blockly program repeats "move forward" 4 times to draw a square. Which JavaScript does that most closely correspond to?',
        choices: [
          'for (let i = 0; i < 4; i++) { moveForward(); }',
          'if (i = 4) { moveForward(); }',
          'let square = 4;',
          'function moveForward() { }'
        ],
        answer: 0,
        explanation: 'A "repeat 4" block generates a counted for loop — the loop runs while the counter is below 4, calling moveForward each pass.',
        choiceFeedback: [
          null,
          'That is a conditional, not a loop — it would check a condition once rather than repeating four times.',
          'That only stores the number 4 in a variable. It never moves anything.',
          'That DEFINES the moveForward function but never calls it, so nothing would be drawn.'
        ],
        xp: 10
      },
      {
        id: 'q7',
        type: 'choice',
        prompt: 'In Blockly, you cannot snap a "number" block into a slot built for a "true/false" block. Why is this useful?',
        choices: [
          'It catches a type mismatch instantly, before the program is ever run',
          'It makes the program run faster',
          'It saves storage space in the project file',
          'It prevents other students from editing your project'
        ],
        answer: 0,
        explanation: 'In a text language, that mismatch might not surface until the program runs and misbehaves. In Blockly the shapes simply do not fit, so it is caught immediately.',
        choiceFeedback: [
          null,
          'Speed is unaffected. The benefit is catching a mistake early.',
          'Block shapes have no effect on file size.',
          'Shape rules are about valid code, not about permissions or sharing.'
        ],
        xp: 10
      },
      {
        id: 'q8',
        type: 'choice',
        prompt: 'Because blocks handle spelling and punctuation, what can a beginner using Blockly focus on instead?',
        choices: [
          'The logic of what the program should actually do',
          'Memorizing keyboard shortcuts',
          'Choosing colors for the interface',
          'Typing speed'
        ],
        answer: 0,
        explanation: 'Removing the punctuation burden is the entire point — it frees a beginner to think about program structure and logic.',
        choiceFeedback: [
          null,
          'Shortcuts are a convenience, not what block-based tools are designed to free you up for.',
          'Interface colors have nothing to do with why blocks prevent syntax errors.',
          'Typing speed matters much less in Blockly precisely because you drag rather than type.'
        ],
        xp: 10
      },
      {
        id: 'q9',
        type: 'choice',
        prompt: 'Why is being able to see the generated JavaScript or Python behind a Blockly program valuable to a student?',
        choices: [
          'It shows how a familiar visual structure maps onto real professional code',
          'It makes the Blockly program run twice as fast',
          'It is required before a Blockly project can be saved',
          'It converts the project into a video file'
        ],
        answer: 0,
        explanation: 'Seeing the same logic in both forms is what makes the bridge real — the student already understands the structure, and now sees how professionals write it.',
        choiceFeedback: [
          null,
          'Viewing the generated code does not change execution speed at all.',
          'Saving works with or without viewing the code.',
          'Code generation produces text-based source code, not a video.'
        ],
        xp: 10
      },
      {
        id: 'q10',
        type: 'choice',
        prompt: 'A student writes text-based code and the program will not run at all, reporting a missing bracket. What kind of error is this, and why would Blockly have prevented it?',
        choices: [
          'A syntax error — Blockly blocks only connect in valid configurations, so a bracket cannot go missing',
          'A logic error — Blockly checks the meaning of every program',
          'A memory error — Blockly uses less memory',
          'A hardware error — Blockly runs on different hardware'
        ],
        answer: 0,
        explanation: 'A missing bracket is a classic syntax error, and it is exactly the class of mistake block shapes make structurally impossible.',
        choiceFeedback: [
          null,
          'Blockly does not check meaning. A Blockly program can still do the wrong thing — it just cannot be malformed.',
          'Memory is not involved. A missing bracket is a problem with the code\'s form.',
          'The same code fails on any hardware. This is about the language\'s rules, not the machine.'
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'tech7-python',
    subject: 'technology',
    tier: 1,
    quarter: 'Q1 2026-2027',
    sequenceInQuarter: 14,
    title: 'Python Programming',
    theme: 'Basic Python syntax — printing, comments, functions, and loops',
    novaIntro: {
      glossary: {
        Python: 'A popular, beginner-friendly text-based programming language known for its readable syntax.',
        function: 'A named, reusable block of code, defined in Python with the keyword "def".',
        syntax: 'The exact rules for how a programming language must be written to work correctly.'
      },
      beats: [
        {
          label: 'Your First Real Code',
          hook: 'Every Scratch block you\'ve snapped together has a hidden identity — real, typed code underneath.',
          teachingText: 'Python is one of the world\'s most widely used programming languages, prized for syntax that reads almost like plain English. print("Hello World") displays text on screen. A single-line comment — text the computer ignores, meant for humans reading the code — starts with a # symbol. Unlike Blockly\'s snap-together blocks, every character in Python syntax matters: a missing quotation mark or parenthesis breaks the program.',
          example: 'print("Hello World") displays exactly: Hello World — but print(Hello World), missing the quotation marks, causes an error because Python thinks Hello and World are undefined variables, not text.',
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'A student writes: # this prints my name \\n print("Lamar"). What happens when this code runs?',
            choices: [
              'Only "Lamar" is displayed — the comment line is ignored entirely',
              'Both lines are displayed as text',
              'The program crashes because comments aren\'t allowed before code',
              'Only the comment is displayed'
            ],
            answer: 0,
            explanation: 'Lines starting with # are comments — the Python interpreter skips them completely and only executes real code, like the print() statement.',
            choiceFeedback: [
              null,
              'Comments are invisible to the running program — only "Lamar" from the print statement actually displays.',
              'Comments are a completely normal and common part of Python code, placed anywhere including before real code.',
              'The comment is skipped entirely by the interpreter — it never displays; only the print() statement produces visible output.'
            ],
            xp: 10
          },
          practiceGeneratorId: 'gen-tech-python-print-comments',
          practiceCount: 4
        },
        {
          label: 'Functions and Loops',
          hook: 'Why type the same three lines of code five separate times when Python can just repeat them for you?',
          teachingText: 'A function, defined with the keyword def, is a named, reusable block of code — write it once, run it as many times as needed by calling its name. A for loop, like for i in range(5):, repeats its indented block a specific number of times (5 times, in this case) without retyping anything. Indentation is not decoration in Python — the spaces at the start of a line are how the language knows which lines belong inside a function or a loop. Two lines indented under a for loop both run on every pass, while a line left un-indented runs only once, after the loop has finished.',
          example: 'def greet(): print("Hello!") defines a reusable function; calling greet() anywhere later in the program runs those exact instructions again.',
          practiceGeneratorId: 'gen-tech-python-functions-loops',
          practiceCount: 3
        }
      ],
      connection: 'Python is used by NASA engineers, video game studios, and AI researchers alike — the exact syntax rules Lamar is learning here are the real rules used in professional software.',
      videoUrl: 'https://www.youtube.com/watch?v=m8DXAsyaMK0'
    },
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What does print("Hello World") do in Python?',
        choices: [
          'Displays the text Hello World on screen',
          'Sends the text to a printer',
          'Saves the text to a file named Hello World',
          'Creates a variable named Hello'
        ],
        answer: 0,
        explanation: 'Despite the name, print() writes output to the screen — it has nothing to do with paper.',
        choiceFeedback: [
          null,
          'The name is historical. Modern print() sends output to the screen, not a printer.',
          'Saving to a file requires different code entirely. print() only displays.',
          'No variable is created. The text inside the quotation marks is simply displayed.'
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'Which symbol starts a single-line comment in Python?',
        choices: ['#', '//', '/*', '<!--'],
        answer: 0,
        explanation: 'The # symbol marks a Python comment — text the computer ignores, written for humans reading the code.',
        choiceFeedback: [
          null,
          '// starts a comment in JavaScript, not Python.',
          '/* opens a multi-line comment in JavaScript and CSS, not in Python.',
          '<!-- opens an HTML comment, a different language entirely.'
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'What is a comment, and why write one?',
        choices: [
          'Text the computer ignores, written to explain the code to humans reading it',
          'A message the program displays to the user while running',
          'An error the program reports when something goes wrong',
          'A command that makes the program pause'
        ],
        answer: 0,
        explanation: 'Comments do not affect what the program does. They exist so that a person — often your future self — can understand why the code is written the way it is.',
        choiceFeedback: [
          null,
          'Displaying a message to the user is what print() does. Comments are never shown to the user.',
          'Errors are reported by the language itself. Comments are written deliberately by the programmer.',
          'Pausing requires a specific command. A comment does nothing at all when the program runs.'
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'Why does print(Hello World), without quotation marks, cause an error?',
        choices: [
          'Python reads Hello and World as undefined variables instead of text',
          'Python requires all text to be lowercase',
          'The word print cannot be used with two words',
          'Python only allows one word per line'
        ],
        answer: 0,
        explanation: 'Quotation marks are what tell Python "this is text." Without them Python looks for variables named Hello and World, finds none, and reports an error.',
        choiceFeedback: [
          null,
          'Capital letters are perfectly legal in Python text. The missing quotation marks are the problem.',
          'print() handles as many words as you like — as long as they are inside quotation marks.',
          'Python allows long lines with many words. The issue is that unquoted words are treated as variable names.'
        ],
        xp: 10
      },
      {
        id: 'q5',
        type: 'choice',
        prompt: 'Which keyword defines a function in Python?',
        choices: ['def', 'function', 'let', 'func'],
        answer: 0,
        explanation: 'Python uses def. JavaScript uses the keyword function, and let declares a JavaScript variable.',
        choiceFeedback: [
          null,
          '"function" is JavaScript\'s keyword. Python uses def.',
          '"let" declares a VARIABLE in JavaScript — it does not define a function in any of these languages.',
          '"func" is used in some other languages, but Python specifically uses def.'
        ],
        xp: 10
      },
      {
        id: 'q6',
        type: 'choice',
        prompt: 'What is the main benefit of writing a function?',
        choices: [
          'Write the code once, then run it as many times as needed by calling its name',
          'It makes the program run without any errors',
          'It automatically saves the program to a file',
          'It lets you skip using variables'
        ],
        answer: 0,
        explanation: 'Reuse is the point. A named block of code can be called from anywhere, so the same instructions never have to be retyped.',
        choiceFeedback: [
          null,
          'Functions can contain errors like any other code. They organize code; they do not verify it.',
          'Saving is a separate action entirely.',
          'Functions and variables are both used constantly, often together — one does not replace the other.'
        ],
        xp: 10
      },
      {
        id: 'q7',
        type: 'choice',
        prompt: 'How many times does for i in range(5): repeat its indented block?',
        choices: ['5', '4', '6', 'Until the program stops'],
        answer: 0,
        explanation: 'range(5) produces five values (0, 1, 2, 3, 4), so the indented block runs exactly five times.',
        choiceFeedback: [
          null,
          'It counts 0 through 4, which is five values, not four — a very common off-by-one mistake.',
          'The count starts at 0, not 1, so range(5) gives five values, not six.',
          'Running until stopped describes a while loop with a condition that never becomes false. A for loop over range(5) has a fixed count.'
        ],
        xp: 10
      },
      {
        id: 'q8',
        type: 'choice',
        prompt: 'You wrote def greet(): print("Hello!") and nothing appears on screen. Why?',
        choices: [
          'The function was defined but never called',
          'Functions cannot contain print statements',
          'The function name greet is reserved by Python',
          'Comments must be added before a function will run'
        ],
        answer: 0,
        explanation: 'Defining a function stores the instructions. Nothing runs until the name is called — greet() — somewhere in the program.',
        choiceFeedback: [
          null,
          'print() inside a function is completely normal and very common.',
          'greet is not a reserved word. You can name a function greet without any problem.',
          'Comments are ignored by Python and have no effect on whether code runs.'
        ],
        xp: 10
      },
      {
        id: 'q9',
        type: 'choice',
        prompt: 'What is the main difference between writing Python and building a program in Blockly?',
        choices: [
          'In Python every character matters — a missing quotation mark or parenthesis breaks the program',
          'Python cannot use loops or functions',
          'Blockly programs are always longer than Python programs',
          'Python does not allow comments'
        ],
        answer: 0,
        explanation: 'Blockly\'s shapes prevent malformed code. In Python, exact syntax is entirely the programmer\'s responsibility.',
        choiceFeedback: [
          null,
          'Python has both loops and functions — they are core features of the language.',
          'Length depends on the program. Neither is always longer.',
          'Python comments start with #. They are fully supported and widely used.'
        ],
        xp: 10
      },
      {
        id: 'q10',
        type: 'choice',
        prompt: 'Python is widely used at NASA and in aerospace work. Which quality of the language most explains its popularity for that kind of work?',
        choices: [
          'Its syntax reads almost like plain English, so code is easier to read, check, and hand to a colleague',
          'It is the only language that can perform calculations',
          'It runs without needing a computer',
          'It cannot produce incorrect results'
        ],
        answer: 0,
        explanation: 'Readability matters enormously when other engineers have to verify your work — code that reads clearly is code whose mistakes are easier to catch.',
        choiceFeedback: [
          null,
          'Every programming language can calculate. Python is popular for readability, not exclusivity.',
          'Python needs a computer to run, like any language.',
          'Python code can absolutely produce wrong answers if the logic is wrong. Readability helps humans FIND those mistakes.'
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'tech7-html',
    subject: 'technology',
    tier: 1,
    quarter: 'Q1 2026-2027',
    sequenceInQuarter: 15,
    title: 'HTML Basics',
    theme: 'The markup language that structures every webpage',
    novaIntro: {
      glossary: {
        HTML: 'HyperText Markup Language — the code that structures the content of every webpage.',
        tag: 'An HTML element written in angle brackets, like <p>, that marks up a piece of content.',
        hyperlink: 'A clickable link to another webpage, created in HTML with the <a> tag.'
      },
      beats: [
        {
          label: 'Tags Build the Page',
          hook: 'Every single website you\'ve ever visited — YouTube, school portals, games — starts as the exact same kind of code.',
          teachingText: 'HTML (HyperText Markup Language) structures the content of every webpage using tags — labels in angle brackets that mark what each piece of content IS. <h1> marks the biggest heading, <p> marks a paragraph, and most tags come in pairs: an opening tag like <p> and a matching closing tag like </p>, with the actual content sandwiched between them. Nesting matters too: tags must close in the reverse order they were opened, so <p><strong>text</strong></p> is valid while <p><strong>text</p></strong> is not. Getting that order wrong is one of the most common beginner mistakes in HTML.',
          example: '<h1>Welcome</h1> tells the browser "Welcome" is the page\'s biggest, most important heading, and displays it large and bold automatically.',
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'A student wants to add a clickable link to their school\'s website on their webpage. Which tag creates that?',
            choices: [
              '<a>, the anchor tag used for hyperlinks',
              '<h1>, since links need to be the biggest text',
              '<img>, since links display like pictures',
              '<p>, since a link is just a type of paragraph'
            ],
            answer: 0,
            explanation: 'The <a> (anchor) tag is specifically built to create clickable hyperlinks in HTML.',
            choiceFeedback: [
              null,
              '<h1> creates a large heading — it has nothing to do with making text clickable as a link.',
              '<img> inserts an image, not a clickable text link — a different tag entirely.',
              'A <p> tag marks a paragraph of regular text; it does not make that text into a clickable link on its own.'
            ],
            xp: 10
          },
          practiceGeneratorId: 'gen-tech-html-tags',
          practiceCount: 4
        },
        {
          label: 'Images and Headings',
          hook: 'One tag on this page never needs a closing tag — can you guess which?',
          teachingText: 'Heading tags come in six sizes, <h1> (biggest/most important) through <h6> (smallest). The <img> tag inserts an image using a src attribute pointing to the image file — and unlike most tags, <img> is self-closing, since an image has no inner content to wrap around. Attributes carry extra information inside an opening tag, written as name="value" — src is one of them. The alt attribute on an image holds a text description that screen readers announce to visitors who cannot see the picture, which is why it should never be left empty.',
          example: '<img src="rocket.png"> displays the image file rocket.png directly on the page, with no separate closing tag needed.',
          practiceGeneratorId: 'gen-tech-html-headings-images',
          practiceCount: 3
        }
      ],
      connection: 'HTML is the literal skeleton underneath every website on Earth — CSS (coming up next) will teach Lamar how to make that skeleton look good.',
      videoUrl: 'https://www.youtube.com/watch?v=2AFqocmyisI'
    },
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What does HTML stand for?',
        choices: [
          'HyperText Markup Language',
          'High Level Text Management Language',
          'Home Tool Markup Language',
          'Hyperlink Text Modeling Layout'
        ],
        answer: 0,
        explanation: 'HyperText Markup Language — "markup" because it marks up content with tags that say what each piece IS.',
        choiceFeedback: [
          null,
          'HTML is not a management language and does not describe levels — it marks up content structure.',
          '"Home Tool" is not part of the name. The H stands for HyperText.',
          'Hyperlinks are one feature of HTML, but the name is HyperText Markup Language.'
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'What is the job of an HTML tag?',
        choices: [
          'To label what a piece of content IS',
          'To set the color and font of the text',
          'To make a page load faster',
          'To store data permanently on the visitor\'s computer'
        ],
        answer: 0,
        explanation: 'Tags mark structure and meaning — this is a heading, this is a paragraph. How it LOOKS is CSS\'s job.',
        choiceFeedback: [
          null,
          'Color and font are CSS. HTML says what content is; CSS says how it looks.',
          'Loading speed depends on file sizes and the network, not on tags.',
          'Storing data on a visitor\'s computer involves cookies or browser storage, not HTML tags.'
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'Which tag marks the biggest, most important heading on a page?',
        choices: ['<h1>', '<h6>', '<p>', '<big>'],
        answer: 0,
        explanation: 'Heading tags run <h1> (biggest and most important) through <h6> (smallest).',
        choiceFeedback: [
          null,
          '<h6> is the SMALLEST of the six heading levels, not the biggest.',
          '<p> marks a paragraph of body text, not a heading.',
          '<big> is not a standard modern HTML heading tag. Headings are <h1> through <h6>.'
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'How many heading levels does HTML provide?',
        choices: ['6', '3', '10', '1'],
        answer: 0,
        explanation: 'Six: <h1> through <h6>, in decreasing order of size and importance.',
        choiceFeedback: [
          null,
          'There are more than three — the full range is <h1> through <h6>.',
          'There is no <h7> through <h10>. The range stops at <h6>.',
          'A page can use several heading levels. HTML defines six of them.'
        ],
        xp: 10
      },
      {
        id: 'q5',
        type: 'choice',
        prompt: 'Most HTML tags come in pairs. What does that mean?',
        choices: [
          'An opening tag like <p> and a matching closing tag like </p>, with content between them',
          'Every tag must be typed twice in a row',
          'Every tag needs a second, different tag beside it',
          'Tags must always be used in groups of two different types'
        ],
        answer: 0,
        explanation: 'The pair wraps the content: <p>text here</p>. The forward slash marks the closing tag.',
        choiceFeedback: [
          null,
          'They are not identical — the closing tag carries a forward slash, and the content sits between them.',
          'The pair is the SAME tag opened and closed, not two different tags.',
          'Different tag types are not required. A pair is one tag, opened and then closed.'
        ],
        xp: 10
      },
      {
        id: 'q6',
        type: 'choice',
        prompt: 'What is unusual about the <img> tag?',
        choices: [
          'It is self-closing — no separate closing tag, since an image has no inner content to wrap',
          'It must always appear at the top of the page',
          'It is the only tag that can be used more than once',
          'It requires a closing tag written as <img/end>'
        ],
        answer: 0,
        explanation: 'A closing tag exists to wrap content. An image IS the content, so there is nothing to wrap and no closing tag is needed.',
        choiceFeedback: [
          null,
          'Images can go anywhere in the page body.',
          'Almost every tag can be used repeatedly — <p> and <h2> appear many times on a typical page.',
          'There is no such syntax. <img> simply does not take a closing tag.'
        ],
        xp: 10
      },
      {
        id: 'q7',
        type: 'choice',
        prompt: 'In <img src="rocket.png">, what does src do?',
        choices: [
          'Points to the image file that should be displayed',
          'Sets the size of the image',
          'Adds a caption below the image',
          'Makes the image clickable'
        ],
        answer: 0,
        explanation: 'src is short for "source" — the attribute that tells the browser which file to load.',
        choiceFeedback: [
          null,
          'Size is set with width and height attributes, or with CSS — not with src.',
          'Captions come from separate elements like <figcaption>, not from src.',
          'Making an image clickable means wrapping it in a link tag. src only identifies the file.'
        ],
        xp: 10
      },
      {
        id: 'q8',
        type: 'choice',
        prompt: 'What does <h1>Welcome</h1> tell the browser?',
        choices: [
          'That "Welcome" is the page\'s biggest, most important heading',
          'That "Welcome" should appear exactly once on the page',
          'That "Welcome" is a paragraph of body text',
          'That "Welcome" is a clickable link'
        ],
        answer: 0,
        explanation: 'The browser renders it large and bold automatically, because <h1> declares it the top-level heading.',
        choiceFeedback: [
          null,
          'The tag says nothing about how many times a word may appear.',
          'Body paragraphs use <p>. <h1> specifically marks a top-level heading.',
          'Links are made with the anchor tag <a>, not <h1>.'
        ],
        xp: 10
      },
      {
        id: 'q9',
        type: 'choice',
        prompt: 'A hyperlink lets a visitor jump from one page to another. What does that make HTML good at?',
        choices: [
          'Connecting many separate documents into a navigable web of pages',
          'Calculating numbers across pages',
          'Storing large databases of information',
          'Editing photographs'
        ],
        answer: 0,
        explanation: 'Hyperlinking is where the "HyperText" in HTML comes from — documents that link to each other are what made the web a web.',
        choiceFeedback: [
          null,
          'Calculating is done by JavaScript or a spreadsheet, not by HTML.',
          'Databases are separate systems. HTML displays information; it does not store it at scale.',
          'Photo editing requires image software. HTML can only display an image.'
        ],
        xp: 10
      },
      {
        id: 'q10',
        type: 'choice',
        prompt: 'You want a page with a large title, then a paragraph explaining it, then a photo. Which tags, in order?',
        choices: [
          '<h1>, then <p>, then <img>',
          '<p>, then <h1>, then <img>',
          '<img>, then <h6>, then <p>',
          '<h1>, then <h1>, then <h1>'
        ],
        answer: 0,
        explanation: 'Each tag is chosen for what the content IS: a top-level heading, a paragraph, then an image.',
        choiceFeedback: [
          null,
          'That puts the paragraph before the title, which does not match the layout described.',
          'That leads with the photo and marks the title with the SMALLEST heading — the opposite of a large title.',
          'Three <h1> tags would mark all three pieces as top-level headings, which describes none of them correctly.'
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'tech7-css',
    subject: 'technology',
    tier: 1,
    quarter: 'Q1 2026-2027',
    sequenceInQuarter: 16,
    title: 'CSS Basics',
    theme: 'Styling and laying out webpages',
    novaIntro: {
      glossary: {
        CSS: 'Cascading Style Sheets — the code that controls a webpage\'s visual style and layout, separate from its HTML structure.',
        selector: 'The part of a CSS rule that specifies which HTML element(s) the style applies to.',
        property: 'A specific visual trait being styled in CSS, like color or font-size.'
      },
      beats: [
        {
          label: 'Structure vs. Style',
          hook: 'HTML builds a house\'s frame. CSS decides the paint color, the furniture, and where every wall goes.',
          teachingText: 'While HTML structures a page\'s content (what it IS), CSS controls its visual style and layout (what it LOOKS like) — completely separately. A CSS rule has a selector (which element to style, like p or h1) followed by curly braces { } containing declarations — property: value pairs, like color: blue;. Keeping style separate from structure means you can restyle an entire site by changing one CSS file. A selector does not have to be a tag name. A class selector, written with a leading dot like .warning, styles only the elements carrying that class — which is how two paragraphs on the same page can be made to look completely different.',
          example: 'p { color: blue; } tells every <p> paragraph on the page to display in blue text, without touching the HTML content at all.',
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'A webpage\'s paragraphs are hard to read because the text is too small. What\'s the CSS-appropriate fix?',
            choices: [
              'Add a CSS rule setting the font-size property on the paragraph selector',
              'Rewrite the paragraph text in the HTML file to say it should be bigger',
              'Add more <p> tags around the text',
              'This can only be fixed by changing the user\'s device settings'
            ],
            answer: 0,
            explanation: 'Font size is a visual style trait, which is exactly what CSS\'s property system (like font-size) is built to control.',
            choiceFeedback: [
              null,
              'HTML structures content; it has no way to describe visual sizing like this — that job belongs entirely to CSS.',
              'Adding more paragraph tags changes the structure, not the visual size of any existing text.',
              'This is a page-level styling issue fixable directly with CSS — it doesn\'t require the visitor to change any device settings.'
            ],
            xp: 10
          },
          practiceGeneratorId: 'gen-tech-css-structure-style',
          practiceCount: 4
        },
        {
          label: 'Writing a CSS Rule',
          hook: 'One line of CSS can repaint every single paragraph on an entire website at once.',
          teachingText: 'A full CSS rule looks like: selector { property: value; }. For example, h1 { color: red; font-size: 32px; } makes every <h1> heading on the page red and 32 pixels tall. Multiple declarations go inside the same curly braces, each ending with a semicolon. When two rules target the same element, the more specific one usually wins, and if they are equally specific the one written later in the file takes effect. That ordering rule is why a style that looks correct where you wrote it can still be overridden further down.',
          example: 'body { color: black; } sets the default text color for the ENTIRE page at once, since body wraps around all visible content.',
          practiceGeneratorId: 'gen-tech-css-writing-rules',
          practiceCount: 3
        }
      ],
      connection: 'CSS is what separates a plain, ugly HTML skeleton from the polished websites Lamar uses every day — the same selector-and-property system scales from one paragraph to an entire professional site.',
      videoUrl: 'https://www.youtube.com/watch?v=rsRUtQWs8PA'
    },
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What does CSS control on a webpage?',
        choices: [
          'Visual style and layout — what the page LOOKS like',
          'The content and structure — what each piece of content IS',
          'How fast the server responds',
          'Where the website is hosted'
        ],
        answer: 0,
        explanation: 'HTML structures content; CSS styles it. Keeping the two separate is a core idea of web development.',
        choiceFeedback: [
          null,
          'Structure and meaning are HTML\'s job. CSS handles appearance.',
          'Server speed is an infrastructure matter, unrelated to CSS.',
          'Hosting is where files live. CSS describes how they look once loaded.'
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'In the CSS rule p { color: blue; }, what is p?',
        choices: [
          'The selector — which elements to style',
          'The property being changed',
          'The value being applied',
          'A comment'
        ],
        answer: 0,
        explanation: 'The selector comes first and names which elements the rule applies to — here, every <p> paragraph.',
        choiceFeedback: [
          null,
          'The property is color — the thing being changed.',
          'The value is blue — what the property is being set to.',
          'CSS comments are written between /* and */. p is the selector.'
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'In h1 { color: red; }, which part is the property and which is the value?',
        choices: [
          'color is the property; red is the value',
          'red is the property; color is the value',
          'h1 is the property; color is the value',
          'The whole rule is one property'
        ],
        answer: 0,
        explanation: 'Declarations are always property: value pairs — the property names what to change, the value says what to change it to.',
        choiceFeedback: [
          null,
          'Reversed. The property always comes first, before the colon.',
          'h1 is the SELECTOR, which comes before the curly braces, not the property.',
          'A rule contains a selector plus one or more property: value declarations — they are distinct parts.'
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'What punctuation ends each declaration inside a CSS rule?',
        choices: ['A semicolon ;', 'A period .', 'A comma ,', 'A closing bracket >'],
        answer: 0,
        explanation: 'Each property: value declaration ends with a semicolon, which is what lets multiple declarations sit inside the same curly braces.',
        choiceFeedback: [
          null,
          'Periods have a different CSS meaning — they mark class selectors, like .header.',
          'Commas separate multiple SELECTORS (h1, h2 { }), not declarations.',
          'The > symbol is a combinator between selectors, not an end-of-declaration mark.'
        ],
        xp: 10
      },
      {
        id: 'q5',
        type: 'choice',
        prompt: 'What is the full shape of a CSS rule?',
        choices: [
          'selector { property: value; }',
          'property { selector: value; }',
          '{ selector } property: value',
          'value: property { selector }'
        ],
        answer: 0,
        explanation: 'Selector first, then curly braces containing one or more property: value declarations.',
        choiceFeedback: [
          null,
          'The selector always comes first, outside the braces — not the property.',
          'The braces come after the selector, not around it.',
          'That reverses every part of the rule. Order matters in CSS syntax.'
        ],
        xp: 10
      },
      {
        id: 'q6',
        type: 'choice',
        prompt: 'What does h1 { color: red; font-size: 32px; } do?',
        choices: [
          'Makes every <h1> heading on the page red and 32 pixels tall',
          'Makes only the first <h1> red and 32 pixels tall',
          'Makes every paragraph red and 32 pixels tall',
          'Creates a new heading with the text "red"'
        ],
        answer: 0,
        explanation: 'A tag selector applies to EVERY matching element on the page, and multiple declarations inside one set of braces all apply.',
        choiceFeedback: [
          null,
          'A plain h1 selector matches every h1, not just the first one.',
          'Paragraphs are selected with p. This rule selects h1.',
          'CSS styles existing elements; it does not create new headings or insert the word "red."'
        ],
        xp: 10
      },
      {
        id: 'q7',
        type: 'choice',
        prompt: 'Why does body { color: black; } affect text across the whole page?',
        choices: [
          'The body element wraps around all visible content, so its style applies throughout',
          'body is a special keyword that means "all pages"',
          'Black is the only color that applies globally',
          'It only works because black is the default color anyway'
        ],
        answer: 0,
        explanation: 'Everything visible sits inside <body>, so setting a text color there gives the page a default that the elements inside inherit.',
        choiceFeedback: [
          null,
          'It applies to one page — the one that loads this CSS. It is not a multi-page keyword.',
          'Any color works the same way. There is nothing special about black.',
          'The rule would work identically with any color. Its reach comes from body wrapping the content.'
        ],
        xp: 10
      },
      {
        id: 'q8',
        type: 'choice',
        prompt: 'What is the practical advantage of keeping style (CSS) separate from structure (HTML)?',
        choices: [
          'An entire site can be restyled by changing one CSS file, without touching the content',
          'Pages with CSS load without any HTML',
          'Separating them makes the site impossible to copy',
          'It doubles the speed of the internet connection'
        ],
        answer: 0,
        explanation: 'Separation of concerns is the point: change the look everywhere from one place, and change the content without disturbing the design.',
        choiceFeedback: [
          null,
          'CSS styles HTML — it cannot replace it. Without HTML there is no content to style.',
          'Both HTML and CSS are readable by anyone who visits the page. Separation is not a security measure.',
          'CSS has no effect on connection speed.'
        ],
        xp: 10
      },
      {
        id: 'q9',
        type: 'choice',
        prompt: 'A site\'s 40 pages all use blue headings, and the designer wants them green. With CSS used properly, what does the change require?',
        choices: [
          'Editing one rule in the shared CSS file',
          'Editing all 40 HTML pages by hand',
          'Rebuilding the site from scratch',
          'Changing the heading tags from <h1> to <h2>'
        ],
        answer: 0,
        explanation: 'This is exactly the payoff of separating style from structure — one edit, and every page that shares the file updates.',
        choiceFeedback: [
          null,
          'Editing 40 pages is what you would have to do if the color were written into each page\'s HTML — which is the problem CSS solves.',
          'No rebuild is needed. Only the style changes.',
          'Changing heading levels alters MEANING and size, not color, and would break the page structure.'
        ],
        xp: 10
      },
      {
        id: 'q10',
        type: 'choice',
        prompt: 'A page shows a paragraph in the wrong color. Which file most likely needs the fix?',
        choices: [
          'The CSS, because color is a style property',
          'The HTML, because the paragraph is written there',
          'The JavaScript, because it controls interactivity',
          'The image file, because color comes from images'
        ],
        answer: 0,
        explanation: 'Colour is appearance, and appearance lives in CSS. The HTML would only change if the paragraph itself were wrong.',
        choiceFeedback: [
          null,
          'The HTML holds the text. What color that text appears in is decided by CSS.',
          'JavaScript adds behavior — clicks, updates, form checks. Static color is a CSS matter.',
          'Text color has nothing to do with image files.'
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'tech7-javascript',
    subject: 'technology',
    tier: 1,
    quarter: 'Q1 2026-2027',
    sequenceInQuarter: 17,
    title: 'JavaScript Basics',
    theme: 'Adding interactivity to webpages',
    novaIntro: {
      glossary: {
        JavaScript: 'A programming language that adds interactivity and dynamic behavior to webpages.',
        let: 'A JavaScript keyword used to declare a variable that can be reassigned later.',
        'comment (JS)': 'Text ignored by the program, starting with // for a single line in JavaScript.'
      },
      beats: [
        {
          label: 'HTML, CSS, and JavaScript Together',
          hook: 'HTML is the skeleton, CSS is the appearance — but neither one can make a button actually DO anything when clicked.',
          teachingText: 'If HTML structures a page and CSS styles it, JavaScript makes it interactive and dynamic — responding to clicks, updating content without reloading, validating a form. JavaScript variables, which store values that can change, are commonly declared with let. Comments in JavaScript start with //, similar to Python\'s # but a different symbol. JavaScript runs inside the browser itself, which is why a page can respond to a click instantly instead of asking the server for a whole new page. That is the difference between a static document and an application.',
          example: 'let score = 0; creates a variable named score starting at 0 — clicking a button elsewhere in the code might run score = score + 1; to update it.',
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'A webpage needs a "Like" counter that goes up every time a button is clicked, without reloading the page. Which language makes that possible?',
            choices: [
              'JavaScript, since it adds interactivity and can update content live',
              'HTML alone, since <button> tags automatically count clicks',
              'CSS alone, since it controls what elements look like',
              'This is impossible without reloading the whole page'
            ],
            answer: 0,
            explanation: 'Live, click-driven behavior that changes content without a reload is exactly what JavaScript is built for — HTML and CSS alone can\'t do it.',
            choiceFeedback: [
              null,
              'An HTML <button> tag creates a clickable button, but it has no built-in ability to count clicks or change a number on its own.',
              'CSS controls visual appearance only — it has no ability to respond to a click event or update a number.',
              'JavaScript makes exactly this kind of dynamic, no-reload interactivity possible — it is a very common real feature.'
            ],
            xp: 10
          },
          practiceGeneratorId: 'gen-tech-javascript-role',
          practiceCount: 4
        },
        {
          label: 'Functions in JavaScript',
          hook: 'Curly braces show up again — but this time they group a whole reusable action, not just a style rule.',
          teachingText: 'A JavaScript function is declared with the function keyword, a name, parentheses, and curly braces holding the code: function sayHi() { }. Functions let you write an action once (like showing a welcome message) and reuse it anywhere a button click or event calls it. Functions can also take input, written inside the parentheses: function greet(name) { alert("Hello " + name); } lets the same function produce a different message every time it is called, just by passing in a different value.',
          example: 'function sayHi() { alert("Welcome!"); } defines a reusable pop-up message — calling sayHi() anywhere in the page triggers that same alert.',
          practiceGeneratorId: 'gen-tech-javascript-functions',
          practiceCount: 3
        }
      ],
      connection: 'HTML, CSS, and JavaScript together are the three languages behind literally every interactive website Lamar has ever used — structure, style, and behavior, working as a team.',
      videoUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk'
    },
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'If HTML structures a page and CSS styles it, what does JavaScript add?',
        choices: [
          'Interactivity and dynamic behavior — responding to clicks and updating content',
          'The text content of the page',
          'The colors and fonts',
          'The web address the page loads from'
        ],
        answer: 0,
        explanation: 'JavaScript is the behavior layer: reacting to events, updating the page without reloading, checking form input.',
        choiceFeedback: [
          null,
          'Text content is written in HTML.',
          'Colors and fonts are set by CSS.',
          'The address is determined by hosting and the link that was followed, not by JavaScript.'
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'Which keyword commonly declares a variable in JavaScript?',
        choices: ['let', 'def', 'var-name', 'set'],
        answer: 0,
        explanation: 'let declares a JavaScript variable. Python uses def for functions, which is a different language and a different purpose.',
        choiceFeedback: [
          null,
          'def defines a FUNCTION in Python — wrong language and wrong purpose.',
          '"var-name" is not a keyword in any of these languages.',
          '"set" is not how JavaScript declares a variable.'
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'How does a comment start in JavaScript?',
        choices: ['//', '#', '<!--', '**'],
        answer: 0,
        explanation: 'JavaScript uses // for a single-line comment. Python uses # — same idea, different symbol.',
        choiceFeedback: [
          null,
          '# starts a comment in PYTHON, not JavaScript. It is a common mix-up between the two languages.',
          '<!-- opens an HTML comment.',
          '** is not a comment marker in JavaScript.'
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'What does let score = 0; do?',
        choices: [
          'Creates a variable named score holding the value 0',
          'Permanently locks score at 0 so it can never change',
          'Displays the number 0 on the page',
          'Defines a function named score'
        ],
        answer: 0,
        explanation: 'It declares the variable and gives it a starting value. Because it was declared with let, that value can be updated later.',
        choiceFeedback: [
          null,
          'A value that can never change would be declared with const. let is specifically for values that CAN change.',
          'Nothing is displayed. Showing a value on the page requires separate code.',
          'Functions use the function keyword, not let.'
        ],
        xp: 10
      },
      {
        id: 'q5',
        type: 'choice',
        prompt: 'A button click runs score = score + 1;. What does that line do?',
        choices: [
          'Adds 1 to the current value of score and stores the result back in score',
          'Creates a second variable also named score',
          'Compares score to score plus 1',
          'Resets score to 1'
        ],
        answer: 0,
        explanation: 'The right side is calculated first using the current value, then the result is assigned back to the same variable.',
        choiceFeedback: [
          null,
          'No new variable is created — the existing one is updated.',
          'Comparison uses === in JavaScript. A single = assigns a value.',
          'It adds 1 to whatever score already is. If score was 7, it becomes 8, not 1.'
        ],
        xp: 10
      },
      {
        id: 'q6',
        type: 'choice',
        prompt: 'Which keyword declares a function in JavaScript?',
        choices: ['function', 'def', 'let', 'method'],
        answer: 0,
        explanation: 'JavaScript uses the function keyword, followed by a name, parentheses, and curly braces holding the code.',
        choiceFeedback: [
          null,
          'def is PYTHON\'s function keyword — a very common mix-up between the two languages.',
          'let declares a variable in JavaScript, not a function.',
          '"method" is a general programming term, not a JavaScript declaration keyword.'
        ],
        xp: 10
      },
      {
        id: 'q7',
        type: 'choice',
        prompt: 'What does function sayHi() { alert("Welcome!"); } accomplish?',
        choices: [
          'Defines a reusable action that shows a pop-up whenever sayHi() is called',
          'Immediately shows the pop-up once, then deletes itself',
          'Displays the word Welcome permanently on the page',
          'Creates a variable named sayHi holding the text Welcome'
        ],
        answer: 0,
        explanation: 'Defining a function stores the instructions. The pop-up appears each time sayHi() is actually called.',
        choiceFeedback: [
          null,
          'Defining a function does not run it. Nothing appears until it is called.',
          'An alert is a temporary pop-up the user dismisses, not permanent page text.',
          'This declares a function, not a variable — the function keyword is what makes the difference.'
        ],
        xp: 10
      },
      {
        id: 'q8',
        type: 'choice',
        prompt: 'What is the main reason to put an action inside a function rather than writing it out each time it is needed?',
        choices: [
          'Write the action once and reuse it anywhere an event calls it',
          'Functions run faster than the same code written directly',
          'Only code inside functions is allowed to use variables',
          'Functions prevent all errors'
        ],
        answer: 0,
        explanation: 'Reuse is the point. A welcome message triggered by three different buttons should be written once, not three times.',
        choiceFeedback: [
          null,
          'Speed is essentially the same. The benefit is organization and reuse.',
          'Variables can be used inside or outside functions.',
          'Functions organize code; they do not verify that the logic inside them is correct.'
        ],
        xp: 10
      },
      {
        id: 'q9',
        type: 'choice',
        prompt: 'A form should warn a visitor before submitting if the email field is empty, without reloading the page. Which of the three web languages handles that?',
        choices: ['JavaScript', 'HTML', 'CSS', 'None — that requires a separate program'],
        answer: 0,
        explanation: 'Checking input and reacting without a reload is exactly the behavior layer JavaScript provides.',
        choiceFeedback: [
          null,
          'HTML can mark a field as required, but reacting with custom logic and no reload is JavaScript\'s job.',
          'CSS could style a warning message, but it cannot check whether the field is empty.',
          'No separate program is needed — this is a standard use of JavaScript in a browser.'
        ],
        xp: 10
      },
      {
        id: 'q10',
        type: 'choice',
        prompt: 'A student writes # this counts clicks at the top of a JavaScript file and the program breaks. Why?',
        choices: [
          '# starts a comment in Python, not JavaScript — JavaScript needs //',
          'Comments are not allowed in JavaScript',
          'Comments must go at the bottom of a JavaScript file',
          'The word "clicks" is a reserved JavaScript keyword'
        ],
        answer: 0,
        explanation: 'Both languages support comments, but with different symbols. JavaScript sees # as invalid code rather than as a note to ignore.',
        choiceFeedback: [
          null,
          'JavaScript fully supports comments — using // for one line, or /* */ for several.',
          'Comments can appear anywhere in a JavaScript file.',
          '"clicks" is an ordinary word, not a reserved keyword. The # symbol is the problem.'
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'tech7-artificial-intelligence',
    subject: 'technology',
    tier: 1,
    quarter: 'Q1 2026-2027',
    sequenceInQuarter: 18,
    title: 'Artificial Intelligence Basics',
    theme: 'How machine learning systems learn from data',
    novaIntro: {
      glossary: {
        'artificial intelligence': 'A computer system\'s ability to perform tasks that typically require human intelligence, like recognizing images or understanding language.',
        'machine learning': 'An approach to AI where systems learn patterns from data rather than being explicitly programmed with every rule.',
        'bias (AI)': 'Unfair or skewed outcomes an AI system produces because of patterns in the data it was trained on.'
      },
      beats: [
        {
          label: 'How Machines "Learn"',
          hook: 'An AI that sorts photos of cats and dogs was never told what a cat looks like — so how does it know?',
          teachingText: 'Machine learning, the most common modern approach to AI, works by showing a system thousands (or millions) of labeled examples — photos already marked "cat" or "dog" — until it learns to recognize the PATTERNS that distinguish them, rather than following hand-written rules like "cats have pointy ears." The system essentially builds its own rules from the data, then applies them to new, never-seen examples.',
          example: 'An AI trained on 100,000 labeled cat and dog photos can usually correctly label a brand-new photo it has never seen, because it learned the underlying visual patterns, not just those specific 100,000 images.',
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'Why might an AI trained ONLY on photos of golden retrievers struggle to recognize a chihuahua as a dog?',
            choices: [
              'Its training data was too narrow, so it never learned the patterns for very different-looking dog breeds',
              'AI systems memorize every possible dog and can never be wrong',
              'Chihuahuas are not technically classified as dogs at all',
              'AI systems never make mistakes once trained'
            ],
            answer: 0,
            explanation: 'An AI can only recognize patterns it has actually seen in training data — narrow or unrepresentative data leads to poor performance on cases outside that narrow range.',
            choiceFeedback: [
              null,
              'AI doesn\'t memorize every possibility — it learns generalizable patterns, and narrow training data means those patterns don\'t generalize well.',
              'Chihuahuas are absolutely dogs — the AI\'s struggle would be a data/training limitation, not a fact about chihuahuas.',
              'AI systems regularly make mistakes, especially on cases their training data did not adequately cover — this is a well-documented limitation.'
            ],
            xp: 10
          },
          practiceGeneratorId: 'gen-tech-ai-machine-learning',
          practiceCount: 4
        },
        {
          label: 'Data Quality and Bias',
          hook: 'An AI trained mostly on one type of face can genuinely struggle with every other type — and that is a documented, real-world problem.',
          teachingText: 'Because AI systems learn from their training data, poor-quality, limited, or unrepresentative data can cause biased or inaccurate results — the AI reproduces and can even amplify patterns (including unfair ones) present in what it was trained on. This is a well-documented concern actively studied by AI researchers, not a hypothetical worry. Researchers work to reduce this by deliberately checking whether the training data represents everyone the system will actually be used on, and by measuring results separately for different groups rather than reporting one overall accuracy number that can hide a problem.',
          example: 'A hiring AI trained mostly on past resumes from one demographic group can end up unfairly favoring similar resumes in the future, reproducing a bias that existed in the original data.',
          practiceGeneratorId: 'gen-tech-ai-bias-data',
          practiceCount: 3
        }
      ],
      connection: 'AI Basics sets up the deeper dive later this semester into neural networks and training data — the core idea, "garbage in, garbage out," only gets more important as the systems get more powerful.',
      videoUrl: 'https://www.youtube.com/watch?v=1fJhya8WGns'
    },
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'How does machine learning differ from following hand-written rules?',
        choices: [
          'The system finds patterns in many labeled examples and builds its own rules from them',
          'A programmer writes out every rule the system will ever use',
          'The system copies answers from the internet as needed',
          'It memorizes each example and can only recognize those exact items'
        ],
        answer: 0,
        explanation: 'Instead of being told "cats have pointy ears," the system is shown thousands of labeled photos and works out the distinguishing patterns itself.',
        choiceFeedback: [
          null,
          'Hand-writing every rule is the OLDER approach machine learning replaced.',
          'Copying from the internet is not what training does — the system learns patterns from a prepared data set.',
          'Memorizing exact examples would make it useless on new photos. The point is that it generalizes to images it has never seen.'
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'What are "labeled examples" in machine learning?',
        choices: [
          'Training data where each item already carries the correct answer, like a photo marked "cat"',
          'Data that has been sorted alphabetically',
          'Data stored with a file name',
          'Examples written by the AI itself'
        ],
        answer: 0,
        explanation: 'The label is the known correct answer. Learning happens by comparing the system\'s guess to the label, over and over.',
        choiceFeedback: [
          null,
          'Alphabetical order is organization, not labeling. A label carries the correct ANSWER.',
          'A file name is not a label in this sense — the label states what the item actually is.',
          'The labels come from humans (or another trusted source), which is what makes them usable as correct answers.'
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'Why can an AI trained on 100,000 cat and dog photos usually label a brand-new photo correctly?',
        choices: [
          'It learned the underlying visual patterns, not just those specific images',
          'The new photo is always one of the original 100,000',
          'It searches the internet for that exact photo',
          'It guesses randomly and is right about half the time'
        ],
        answer: 0,
        explanation: 'Generalizing to unseen examples is the whole point of training — the system learned what distinguishes the categories, not the individual pictures.',
        choiceFeedback: [
          null,
          'The new photo is genuinely new. That is exactly what makes it a real test.',
          'No searching happens at that moment. The learned patterns are applied directly.',
          'A well-trained system performs far better than chance, and its accuracy comes from learned patterns, not luck.'
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'Why can poor or unrepresentative training data cause biased AI results?',
        choices: [
          'The system reproduces — and can amplify — patterns present in whatever it was trained on',
          'The system deliberately chooses to be unfair',
          'Bias only appears if the AI runs out of memory',
          'Biased results only happen with very small AI systems'
        ],
        answer: 0,
        explanation: 'The system has no source of knowledge other than its training data, so unfair patterns in that data become unfair patterns in its output.',
        choiceFeedback: [
          null,
          'The system has no intentions. It reflects patterns in its data, which is why the data itself matters so much.',
          'Memory limits are a performance issue, entirely separate from bias.',
          'Bias has been documented in very large systems too. Size does not prevent it.'
        ],
        xp: 10
      },
      {
        id: 'q5',
        type: 'choice',
        prompt: 'A hiring AI is trained mostly on past resumes from one demographic group. What is the documented risk?',
        choices: [
          'It may unfairly favor similar resumes in the future, reproducing the original bias',
          'It will refuse to process any resume',
          'It will run more slowly than usual',
          'It will automatically correct for the imbalance on its own'
        ],
        answer: 0,
        explanation: 'This is a well-documented, actively studied concern — the system learns "what past hires looked like" and treats that as what a good candidate looks like.',
        choiceFeedback: [
          null,
          'It will process resumes normally. The problem is HOW it ranks them.',
          'Speed is unrelated to the composition of the training data.',
          'Systems do not self-correct for bias. Correcting it takes deliberate work by the people building them.'
        ],
        xp: 10
      },
      {
        id: 'q6',
        type: 'choice',
        prompt: 'Which statement about AI bias is accurate?',
        choices: [
          'It is a well-documented concern actively studied by AI researchers',
          'It is a hypothetical worry that has never been observed',
          'It only affects systems built before 2010',
          'It can be eliminated simply by using more data'
        ],
        answer: 0,
        explanation: 'Bias in machine learning systems has been observed and documented repeatedly, and reducing it is an active field of research.',
        choiceFeedback: [
          null,
          'It has been observed in real deployed systems, not just imagined.',
          'It affects modern systems too, including very recent ones.',
          'More data of the same skewed kind reproduces the same bias. What matters is whether the data is REPRESENTATIVE, not just large.'
        ],
        xp: 10
      },
      {
        id: 'q7',
        type: 'choice',
        prompt: 'What does the word "training" mean in machine learning?',
        choices: [
          'The process of showing the system many examples so it can learn patterns from them',
          'Teaching a person how to operate the software',
          'Testing the finished system on new data',
          'Writing the rules the system will follow'
        ],
        answer: 0,
        explanation: 'Training is the learning phase. Checking the result on new, unseen data afterward is called testing or evaluation.',
        choiceFeedback: [
          null,
          'That is user training — a different meaning of the same word, not the technical one.',
          'Checking on new data comes AFTER training and is usually called testing.',
          'Writing rules by hand is the older approach machine learning replaced.'
        ],
        xp: 10
      },
      {
        id: 'q8',
        type: 'choice',
        prompt: 'Why is machine learning better than hand-written rules for a task like recognizing handwriting?',
        choices: [
          'Handwriting varies so much that no reasonable set of hand-written rules could cover it',
          'Hand-written rules are illegal for image tasks',
          'Machine learning uses no data at all',
          'Hand-written rules only work on numbers'
        ],
        answer: 0,
        explanation: 'Every person writes differently. Learning the patterns from thousands of real samples handles that variation far better than any rule list could.',
        choiceFeedback: [
          null,
          'Nothing is illegal about rule-based systems — they are simply a poor fit for highly variable tasks.',
          'Machine learning depends heavily on data. It is rules it does without, not data.',
          'Rule-based systems can handle text and images too. They just struggle with wide natural variation.'
        ],
        xp: 10
      },
      {
        id: 'q9',
        type: 'choice',
        prompt: 'An AI is trained to spot cracks in aircraft parts, but every training photo shows the same type of aluminum panel. What is the likely weakness?',
        choices: [
          'It may perform poorly on cracks in other materials or part shapes it never saw',
          'It will refuse to examine any part',
          'It will detect cracks perfectly on every possible material',
          'It will be slower than a human inspector'
        ],
        answer: 0,
        explanation: 'A system generalizes from what it was shown. Narrow training data produces narrow reliability — the same lesson as the hiring example, in an aerospace setting.',
        choiceFeedback: [
          null,
          'It will still run and produce answers. The concern is whether those answers are trustworthy outside its training range.',
          'Performing perfectly on unseen materials is exactly what limited training data does NOT support.',
          'Speed is not the issue here. Coverage of the training data is.'
        ],
        xp: 10
      },
      {
        id: 'q10',
        type: 'choice',
        prompt: 'What is the most accurate way to describe the relationship between AI and machine learning?',
        choices: [
          'Machine learning is the most common modern approach to building AI',
          'They are two completely unrelated fields',
          'AI is one specific technique used within machine learning',
          'Machine learning replaced AI entirely and the term AI is no longer used'
        ],
        answer: 0,
        explanation: 'AI is the broad goal of building systems that perform tasks needing intelligence; machine learning is the dominant modern method for getting there.',
        choiceFeedback: [
          null,
          'They are closely related — machine learning is a way of building AI.',
          'The relationship is the other way around: machine learning sits inside the broader field of AI.',
          'Both terms are in active use, and they mean different things.'
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'tech7-cybersecurity',
    subject: 'technology',
    tier: 1,
    quarter: 'Q1 2026-2027',
    sequenceInQuarter: 19,
    title: 'Cybersecurity Basics',
    theme: 'Protecting accounts and systems from common threats',
    novaIntro: {
      glossary: {
        phishing: 'A scam that tricks people into revealing personal information through fake messages or websites.',
        malware: 'Malicious software designed to damage, disrupt, or gain unauthorized access to a computer system.',
        'two-factor authentication': 'A login process requiring a second verification step, like a code sent to your phone, beyond just a password.'
      },
      beats: [
        {
          label: 'Recognizing Phishing',
          hook: 'An email that looks exactly like it\'s from your school could actually be from a stranger trying to steal your password.',
          teachingText: 'Phishing scams trick people into revealing personal information — passwords, credit card numbers — through fake messages or websites designed to look legitimate. Warning signs include urgent or scary language ("your account will be deleted!"), links that don\'t quite match the real company\'s website address, and requests for information a real company would never ask for by email.',
          example: 'An email claiming to be from "Your School IT Department," demanding you "click here immediately to verify your password or lose access," is a classic phishing pattern — real IT departments rarely demand passwords by email under urgent threats.',
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'Deja gets an email saying "URGENT: Your game account will be deleted in 1 hour unless you click this link and enter your password." What should she do?',
            choices: [
              'Be suspicious of the urgency and unusual request, and avoid clicking the link',
              'Click immediately since urgent messages are always legitimate',
              'Reply with her password to be safe',
              'Forward the email to all her friends so they can click it too'
            ],
            answer: 0,
            explanation: 'Manufactured urgency plus a request to enter a password through an email link is a textbook phishing pattern — the safe move is suspicion, not immediate action.',
            choiceFeedback: [
              null,
              'Urgency is actually a classic RED FLAG used deliberately to rush people into not thinking carefully — it is not a sign of legitimacy.',
              'Never enter a password by replying to an email — legitimate companies do not request passwords this way.',
              'Forwarding a phishing email spreads the scam to more people rather than protecting anyone.'
            ],
            xp: 10
          },
          practiceGeneratorId: 'gen-tech-cybersecurity-phishing',
          practiceCount: 4
        },
        {
          label: 'Passwords and Two-Factor Authentication',
          hook: 'If a hacker cracks one of your passwords, how many of your accounts should that actually put at risk? Ideally: just one.',
          teachingText: 'Using a different, strong password for each account means that if one account gets compromised, the damage stays contained — the attacker can\'t just reuse that same password everywhere else. Two-factor authentication adds a second verification step beyond the password, like a one-time code sent to your phone, so even a stolen password alone usually isn\'t enough to break in. A password manager is what makes unique passwords practical: it generates and stores a different long password for every account, so the only one you have to remember is the one that unlocks the manager itself.',
          example: 'If someone steals your email password but your email also requires a code sent to your phone (two-factor authentication), they still can\'t get in without your physical phone.',
          practiceGeneratorId: 'gen-tech-cybersecurity-passwords',
          practiceCount: 3
        }
      ],
      connection: 'These same threats — phishing, weak passwords, malware — target adults at real companies every single day; the habits Lamar builds now are the exact habits that protect a future paycheck and career.',
      videoUrl: 'https://www.youtube.com/watch?v=nVEyG3C-Mqw'
    },
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What is phishing?',
        choices: [
          'Tricking someone into revealing personal information through fake messages or websites',
          'Software that slows a computer down over time',
          'Guessing a password by trying millions of combinations',
          'Physically stealing a laptop'
        ],
        answer: 0,
        explanation: 'Phishing targets the PERSON rather than the machine — it works by deception, not by breaking any technical protection.',
        choiceFeedback: [
          null,
          'Software that harms or slows a system is malware, a different category of threat.',
          'Trying millions of combinations is a brute-force attack, not phishing.',
          'Physical theft is a real risk, but phishing happens through deceptive messages.'
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'Which is a classic warning sign of a phishing message?',
        choices: [
          'Urgent or scary language pressuring you to act immediately',
          'A greeting that uses your first name',
          'A message that arrives on a weekday',
          'A message containing more than one paragraph'
        ],
        answer: 0,
        explanation: 'Urgency is the core technique — panic makes people click before they check, which is exactly what the attacker needs.',
        choiceFeedback: [
          null,
          'Using your name is normal, and sophisticated phishing often does exactly that. It is not a warning sign by itself.',
          'Timing tells you nothing. Phishing arrives any day of the week.',
          'Length is not a signal. Real messages and fake ones both come in all lengths.'
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'An email from "Your School IT Department" says: "Click here immediately to verify your password or lose access." What should you conclude?',
        choices: [
          'It is very likely phishing — real IT departments do not demand passwords by email under urgent threats',
          'It is legitimate, because it names a department you recognize',
          'It is safe as long as you type the password rather than clicking',
          'It is safe if the logo at the top looks correct'
        ],
        answer: 0,
        explanation: 'Urgency plus a threat plus a password request is the textbook pattern. A recognizable name in the sender field is trivially easy to fake.',
        choiceFeedback: [
          null,
          'Sender names are easy to forge. Recognizing the department name proves nothing.',
          'Typing it on the linked fake site hands it over just as completely as clicking would.',
          'Logos can be copied from the real site in seconds. A correct-looking logo is not verification.'
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'Why should you check whether a link matches the real company\'s web address?',
        choices: [
          'Phishing sites use addresses that look close to the real one but are not',
          'Long web addresses always mean a page is fake',
          'Real companies never use links in email',
          'Links that use https are always safe'
        ],
        answer: 0,
        explanation: 'A near-miss address is a standard phishing tactic, because the small difference is easy to overlook when you are in a hurry.',
        choiceFeedback: [
          null,
          'Plenty of legitimate addresses are long. Length is not the signal — the DOMAIN is.',
          'Real companies use links constantly. The question is where the link actually points.',
          'https means the connection is encrypted, not that the site is honest. A phishing site can use https too.'
        ],
        xp: 10
      },
      {
        id: 'q5',
        type: 'choice',
        prompt: 'What is malware?',
        choices: [
          'Software written to damage, disrupt, or gain unauthorized access to a system',
          'A message designed to trick you into giving up a password',
          'A second verification step after entering a password',
          'A backup copy of important files'
        ],
        answer: 0,
        explanation: 'Malware is harmful software. Phishing is a deceptive message — the two are related threats but not the same thing.',
        choiceFeedback: [
          null,
          'That describes phishing, which targets the person rather than installing harmful software.',
          'A second verification step is two-factor authentication — a defense, not a threat.',
          'A backup is a protective measure, the opposite of malware.'
        ],
        xp: 10
      },
      {
        id: 'q6',
        type: 'choice',
        prompt: 'Why use a different password for every account?',
        choices: [
          'If one account is compromised, the damage stays contained to that account',
          'It makes each individual password harder to guess',
          'Websites refuse to accept a repeated password',
          'It makes accounts load faster'
        ],
        answer: 0,
        explanation: 'Attackers routinely try a stolen password on other services. Unique passwords are what stop one breach from becoming many.',
        choiceFeedback: [
          null,
          'Reuse does not change how strong an individual password is — it changes how far a single theft spreads.',
          'Most sites cannot tell whether you used the password elsewhere and do not block it.',
          'Passwords have no effect on loading speed.'
        ],
        xp: 10
      },
      {
        id: 'q7',
        type: 'choice',
        prompt: 'What is two-factor authentication?',
        choices: [
          'A second verification step beyond the password, like a one-time code sent to your phone',
          'Using two different passwords on the same account',
          'Having two people approve every login',
          'Logging in from two devices at once'
        ],
        answer: 0,
        explanation: 'The second factor is something separate from the password — usually a device you physically have — so a stolen password alone is not enough.',
        choiceFeedback: [
          null,
          'Two passwords are still two of the same kind of secret. The strength comes from a DIFFERENT kind of factor.',
          'That describes a dual-approval process used in some organizations, not two-factor authentication.',
          'Logging in from two devices is not a security feature at all.'
        ],
        xp: 10
      },
      {
        id: 'q8',
        type: 'choice',
        prompt: 'Someone steals your email password, but your account also requires a code sent to your phone. What happens?',
        choices: [
          'They still cannot get in without your physical phone',
          'They get in immediately, since they have the password',
          'Your account is deleted automatically',
          'The code is emailed to them along with the password'
        ],
        answer: 0,
        explanation: 'This is exactly why two-factor authentication is recommended — the password is only half of what is required.',
        choiceFeedback: [
          null,
          'The password alone is not sufficient once a second factor is required.',
          'Accounts are not deleted over a failed login. Access is simply refused.',
          'The code goes to your registered device, not to whoever is trying to log in.'
        ],
        xp: 10
      },
      {
        id: 'q9',
        type: 'choice',
        prompt: 'What information would a legitimate company essentially never request by email?',
        choices: [
          'Your account password',
          'Your first name',
          'Your preferred contact method',
          'Feedback about their service'
        ],
        answer: 0,
        explanation: 'A password request by email is one of the clearest phishing signals there is — real companies have no need to ask, because they never see your password in the first place.',
        choiceFeedback: [
          null,
          'A first name is routine, low-risk information that companies ask for all the time.',
          'Asking how you prefer to be contacted is an ordinary, harmless request.',
          'Feedback requests are common and carry no security risk.'
        ],
        xp: 10
      },
      {
        id: 'q10',
        type: 'choice',
        prompt: 'Why is cybersecurity a serious concern in aerospace specifically?',
        choices: [
          'Aircraft, satellites, and ground control systems all depend on software and networks that must not be tampered with',
          'Aerospace companies are the only organizations that face cyberattacks',
          'Spacecraft cannot use passwords',
          'It is not — aerospace systems are never connected to networks'
        ],
        answer: 0,
        explanation: 'Modern aerospace runs on networked software. Protecting flight systems, satellite links, and mission data is a genuine engineering responsibility.',
        choiceFeedback: [
          null,
          'Every industry faces cyberattacks. Aerospace is notable for the consequences, not for being uniquely targeted.',
          'Spacecraft and ground systems use authentication and encryption extensively.',
          'Aerospace systems are heavily networked — satellites, telemetry, and ground control all communicate constantly.'
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'tech7-cad',
    relatedProjectId: 'tech7-tinkercad-nameplate',
    subject: 'technology',
    tier: 1,
    quarter: 'Q1 2026-2027',
    sequenceInQuarter: 20,
    title: 'CAD Software Fundamentals',
    theme: 'Digital design tools used across engineering and manufacturing',
    novaIntro: {
      glossary: {
        CAD: 'Computer-Aided Design — software used to create precise digital models of physical objects.',
        prototype: 'An early physical or digital version of a design, built to test and refine it before final production.'
      },
      beats: [
        {
          label: 'Designing Before Building',
          hook: 'Engineers can crash-test a car thousands of times before a single real part is ever manufactured.',
          teachingText: 'CAD (Computer-Aided Design) software lets engineers, architects, and product designers build precise digital models of objects before manufacturing them physically. A huge benefit: flaws can be found and fixed digitally — free, in minutes — instead of discovered after spending real time and materials building a physical version. Most CAD software also lets designers rotate a model in full 3D, not just view a flat 2D drawing.',
          example: 'An engineer designs a drone frame in CAD, discovers in the 3D view that two parts would collide, and fixes it with a few clicks — catching a mistake that would have wasted real plastic and hours if built physically first.',
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'A team is designing a new phone case. What is the biggest advantage of testing the design in CAD software before manufacturing thousands of real cases?',
            choices: [
              'Design flaws can be caught and fixed digitally, saving real time and materials',
              'CAD software manufactures the final product automatically with no factory needed',
              'CAD guarantees the design will be perfect with zero possible issues',
              'CAD eliminates the need to ever test the product at all'
            ],
            answer: 0,
            explanation: 'The core value of CAD is catching problems in a cheap, fast digital model before committing real materials and manufacturing time to a flawed design.',
            choiceFeedback: [
              null,
              'CAD creates the digital design, but manufacturing still requires real factories, materials, and machines — CAD doesn\'t replace that step.',
              'CAD reduces mistakes by catching them early, but it does not guarantee a perfect design with zero possible issues.',
              'CAD is a powerful early testing step, but real physical prototypes and testing are usually still valuable before mass production.'
            ],
            xp: 10
          },
          practiceGeneratorId: 'gen-tech-cad-fundamentals',
          practiceCount: 4
        },
        {
          label: 'Where CAD Shows Up',
          hook: 'The chair you\'re sitting in, the phone in your pocket, and the building you\'re inside of all likely started as a CAD file.',
          teachingText: 'CAD is used across a huge range of industries: engineering (designing machine parts), architecture (designing buildings), product design (designing furniture, electronics, toys), and manufacturing (planning how parts fit together). Learning CAD fundamentals now — precise digital modeling, 3D thinking — applies directly to nearly any hands-on engineering or design career. NASA and its contractors model spacecraft components in CAD before anything is machined, because a part that turns out to be unreachable during assembly is far cheaper to discover on screen than on the launch pad.',
          example: 'An architect uses CAD to design a school building, checking that hallways are wide enough and doors open the correct direction, all before a single brick is laid.',
          practiceGeneratorId: 'gen-tech-cad-industries',
          practiceCount: 3
        }
      ],
      connection: 'CAD is the direct bridge between an idea in your head and a real, physical object — which is exactly why it connects so closely to 3D Modeling, coming up next.',
      videoUrl: 'https://www.youtube.com/watch?v=eeCP5LjJhhk'
    },
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What does CAD stand for?',
        choices: [
          'Computer-Aided Design',
          'Computer Analysis Data',
          'Creative Art Development',
          'Coded Assembly Drawing'
        ],
        answer: 0,
        explanation: 'Computer-Aided Design — software that lets designers build precise digital models before anything is manufactured.',
        choiceFeedback: [
          null,
          'CAD software does design work, not data analysis.',
          'CAD is an engineering and design tool, not an art program, and the D stands for Design.',
          'CAD produces far more than drawings — full, rotatable 3D models are standard.'
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'What is the biggest practical benefit of designing in CAD before building physically?',
        choices: [
          'Flaws can be found and fixed digitally — free, in minutes — instead of after materials are spent',
          'CAD models are stronger than physical parts',
          'CAD removes the need to test anything at all',
          'CAD files cost less to store than paper drawings'
        ],
        answer: 0,
        explanation: 'Catching a mistake on screen costs a few clicks. Catching the same mistake after building costs materials, time, and sometimes the whole part.',
        choiceFeedback: [
          null,
          'A digital model has no physical strength — it is a representation, not an object.',
          'Physical testing is still essential. CAD reduces how many expensive prototypes you need, not the need to test.',
          'Storage cost is a minor side benefit, not the reason engineers use CAD.'
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'What is a prototype?',
        choices: [
          'An early working version of a design, built to test it before final production',
          'The finished product sold to customers',
          'A drawing with no measurements',
          'The software used to create a design'
        ],
        answer: 0,
        explanation: 'A prototype exists to be tested and learned from — it comes before the final version, not after.',
        choiceFeedback: [
          null,
          'The finished product is what comes after prototypes have been tested and refined.',
          'A prototype is a built version, not a drawing — and engineering drawings carry precise measurements anyway.',
          'The software is the tool. The prototype is the thing produced with it.'
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'An engineer designs a drone frame in CAD and notices in the 3D view that two parts would collide. What did CAD just save?',
        choices: [
          'Real material and hours that would have been spent building a frame that could not work',
          'Electricity used by the computer',
          'The cost of the CAD software licence',
          'Nothing — the collision would have been obvious anyway'
        ],
        answer: 0,
        explanation: 'That is the entire value proposition: a few clicks on screen replaced wasted plastic and wasted build time.',
        choiceFeedback: [
          null,
          'Power use is negligible compared to wasted materials and labour.',
          'The licence is paid regardless. What was saved is the wasted physical build.',
          'Part collisions in a 3D assembly are frequently NOT obvious from flat drawings — which is exactly why 3D CAD views matter.'
        ],
        xp: 10
      },
      {
        id: 'q5',
        type: 'choice',
        prompt: 'What does most CAD software let designers do that a flat 2D drawing cannot?',
        choices: [
          'Rotate and inspect the model in full 3D',
          'Add written labels to parts',
          'Print the design on paper',
          'Show the design to another person'
        ],
        answer: 0,
        explanation: 'Full 3D rotation lets a designer see how parts actually fit together from any angle — a view a flat drawing simply cannot provide.',
        choiceFeedback: [
          null,
          'Labels and annotations appear on traditional drawings too.',
          'Paper drawings print just fine — printing is not the advantage.',
          'Any drawing can be shown to someone. The advantage is what they can SEE.'
        ],
        xp: 10
      },
      {
        id: 'q6',
        type: 'choice',
        prompt: 'Which of these industries does NOT typically use CAD?',
        choices: [
          'None of these — engineering, architecture, and product design all use it',
          'Architecture',
          'Product design',
          'Manufacturing'
        ],
        answer: 0,
        explanation: 'CAD is used across engineering, architecture, product design, and manufacturing — its reach is one of the reasons the skill transfers so widely.',
        choiceFeedback: [
          null,
          'Architects use CAD constantly for building design.',
          'Product designers use CAD for furniture, electronics, and toys.',
          'Manufacturing uses CAD to plan how parts fit and how they will be produced.'
        ],
        xp: 10
      },
      {
        id: 'q7',
        type: 'choice',
        prompt: 'An architect checks in CAD that hallways are wide enough and doors open the correct direction, before any brick is laid. What does this demonstrate?',
        choices: [
          'CAD lets design problems be found and corrected while changes are still cheap',
          'CAD can build the school automatically',
          'CAD replaces the need for building inspections',
          'CAD is only useful for very small objects'
        ],
        answer: 0,
        explanation: 'Changing a hallway width on screen costs minutes. Changing it after construction costs a rebuild.',
        choiceFeedback: [
          null,
          'CAD produces the design. Construction is done by people and machines.',
          'Inspections are a legal safety requirement and still take place.',
          'CAD is used for objects of every scale, from tiny components to entire buildings.'
        ],
        xp: 10
      },
      {
        id: 'q8',
        type: 'choice',
        prompt: 'Which skills learned in CAD transfer most directly to other engineering work?',
        choices: [
          'Precise digital modelling and thinking in three dimensions',
          'Fast typing and email etiquette',
          'Memorizing keyboard shortcuts',
          'Choosing attractive colour schemes'
        ],
        answer: 0,
        explanation: 'Precision and spatial reasoning are the transferable core — they apply in nearly any hands-on engineering or design career.',
        choiceFeedback: [
          null,
          'Both are useful workplace skills but are not what CAD specifically teaches.',
          'Shortcuts speed you up in one program and do not transfer as a way of thinking.',
          'Colour choice matters in visual design but is not the engineering skill CAD develops.'
        ],
        xp: 10
      },
      {
        id: 'q9',
        type: 'choice',
        prompt: 'Why does designing a satellite bracket in CAD matter more than designing a bookshelf in CAD?',
        choices: [
          'A launched satellite cannot be repaired, so errors must be caught before flight',
          'Satellites are larger than bookshelves',
          'CAD works better on metal than on wood',
          'It does not matter more — the two are identical problems'
        ],
        answer: 0,
        explanation: 'Spaceflight hardware gets one chance. That is why aerospace leans so heavily on catching problems in the digital model first.',
        choiceFeedback: [
          null,
          'Many satellites are small — some are the size of a shoebox. Size is not the issue.',
          'CAD models geometry, not material. It handles both equally.',
          'The consequence of an undetected error is dramatically different: a bookshelf can be rebuilt, an orbiting satellite cannot.'
        ],
        xp: 10
      },
      {
        id: 'q10',
        type: 'choice',
        prompt: 'A team builds three physical prototypes and each one fails for a reason visible in the digital model. What went wrong in their process?',
        choices: [
          'They skipped the digital checking step CAD exists to provide',
          'They used CAD too much',
          'Prototypes should never be built at all',
          'CAD models are unreliable, so physical builds are the only real test'
        ],
        answer: 0,
        explanation: 'CAD is meant to filter out exactly these failures before materials are spent — three wasted builds is the cost of skipping that step.',
        choiceFeedback: [
          null,
          'Using CAD more thoroughly is what would have prevented the wasted builds.',
          'Prototypes are valuable and necessary — they should just come after the digital checks.',
          'CAD is highly reliable for geometry problems like collisions and clearances, which is what failed here.'
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'tech7-3d-modeling',
    relatedProjectId: 'tech7-tinkercad-low-poly',
    subject: 'technology',
    tier: 1,
    quarter: 'Q1 2026-2027',
    sequenceInQuarter: 21,
    title: '3D Modeling',
    theme: 'Building and rendering digital three-dimensional objects',
    novaIntro: {
      glossary: {
        '3D model': 'A digital representation of an object with height, width, and depth.',
        rendering: 'The process of generating a realistic image or animation from a 3D model.',
        polygon: 'A small flat surface (or face) that, combined with many others, makes up the outer shape of a 3D model.'
      },
      beats: [
        {
          label: 'Building With Polygons',
          hook: 'Every curved, smooth 3D character in a video game is secretly made of thousands of flat triangles.',
          teachingText: 'A 3D model is a digital object with height, width, AND depth — unlike a flat 2D drawing. Most 3D models are built from polygons (usually triangles or four-sided faces) — small flat surfaces that, combined in large numbers, approximate curved, realistic shapes. More polygons generally means smoother, more detailed curves, but also a bigger, more demanding file. Polygon count is a budget rather than a target. Game artists and engineers deliberately build low-polygon versions of distant objects and high-polygon versions of whatever will be seen up close, so the detail is spent where it will actually be noticed.',
          example: 'A low-poly (few-polygon) sphere looks blocky and faceted, like a disco ball, while a high-poly sphere with thousands of tiny faces looks perfectly smooth and round.',
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'A 3D model of a soccer ball looks blocky and angular instead of smooth and round. What is the most likely cause?',
            choices: [
              'The model has too few polygons to approximate a smooth curve',
              'The model has no colors applied yet',
              'The model was built in the wrong file format',
              'This is impossible — all 3D models look identical'
            ],
            answer: 0,
            explanation: 'A blocky, faceted look is the classic sign of a low-polygon model — more, smaller polygons are needed to approximate a smooth curve.',
            choiceFeedback: [
              null,
              'Color has no effect on a model\'s underlying shape or smoothness — this is purely a geometry (polygon count) issue.',
              'File format affects compatibility with software, not the visual smoothness of the shape itself.',
              '3D models vary enormously in polygon count and detail — a blocky look specifically points to a low polygon count.'
            ],
            xp: 10
          },
          practiceGeneratorId: 'gen-tech-3d-modeling-polygons',
          practiceCount: 4
        },
        {
          label: 'Rendering and 3D Printing',
          hook: 'A finished 3D model can travel two very different directions: onto a screen, or into your hand.',
          teachingText: 'Rendering generates a realistic final image or animation from a 3D model — calculating how light, color, and materials should look. Alternatively, a completed 3D model can be exported and sent to a 3D printer, which builds an actual physical object out of material like plastic, layer by layer, turning the digital design into something you can hold.',
          example: 'A game studio renders a 3D dragon model into a realistic in-game image, while a hobbyist exports a similar 3D model of a phone stand to print a real, physical version on a home 3D printer.',
          practiceGeneratorId: 'gen-tech-3d-modeling-rendering-printing',
          practiceCount: 3
        }
      ],
      connection: '3D Modeling II, later this semester, goes deeper into making these models look truly realistic — through texture and lighting, the same techniques used in movies and video games.',
      videoUrl: 'https://www.youtube.com/watch?v=60xfIu-lqAs'
    },
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What makes a 3D model different from a 2D drawing?',
        choices: [
          'It has height, width, AND depth',
          'It is always in colour',
          'It is stored in a smaller file',
          'It can only be viewed from the front'
        ],
        answer: 0,
        explanation: 'The third dimension — depth — is what allows a model to be rotated and inspected from any angle.',
        choiceFeedback: [
          null,
          'Both 2D and 3D work can be colour or greyscale. Colour is not the distinction.',
          '3D models are usually LARGER files than flat drawings, not smaller.',
          'Being viewable from only one angle describes a flat 2D image — the opposite of a 3D model.'
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'What is a polygon in 3D modelling?',
        choices: [
          'A small flat surface — usually a triangle or four-sided face — used to build up a model',
          'A curved surface with no edges',
          'The colour applied to a model',
          'The file format a model is saved in'
        ],
        answer: 0,
        explanation: 'Many small flat faces, combined in large numbers, approximate the curved shapes we see in a finished model.',
        choiceFeedback: [
          null,
          'Polygons are flat by definition. Curves are APPROXIMATED by using many small flat polygons.',
          'Colour and surface appearance come from materials and textures, not from the polygons themselves.',
          'File formats are how a model is stored. Polygons are what it is built from.'
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'What is the trade-off of using more polygons in a model?',
        choices: [
          'Smoother, more detailed curves, but a bigger and more demanding file',
          'Smoother curves with no cost at all',
          'A smaller file but a blockier appearance',
          'Faster rendering and better detail together'
        ],
        answer: 0,
        explanation: 'More faces means finer detail and more data for the computer to handle — which is why game artists and engineers choose polygon counts deliberately.',
        choiceFeedback: [
          null,
          'There is a real cost: file size and the processing needed to display and render the model.',
          'Fewer polygons gives the smaller file AND the blockier look. More polygons reverses both.',
          'More polygons generally makes rendering SLOWER, not faster.'
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'Why does a low-poly sphere look blocky, like a disco ball?',
        choices: [
          'Too few flat faces are being used to approximate a curved surface',
          'The colour has not been applied yet',
          'The file was saved incorrectly',
          'Spheres cannot be modelled in 3D software'
        ],
        answer: 0,
        explanation: 'A sphere is genuinely curved, but polygons are flat. With few faces the flatness is visible; with thousands it is not.',
        choiceFeedback: [
          null,
          'Colour has no effect on the shape of the surface.',
          'This is normal, expected behaviour at a low polygon count, not a saving error.',
          'Spheres are one of the most common shapes in 3D modelling.'
        ],
        xp: 10
      },
      {
        id: 'q5',
        type: 'choice',
        prompt: 'What does rendering do?',
        choices: [
          'Generates a realistic final image or animation by calculating light, colour, and materials',
          'Sends the model to a 3D printer',
          'Adds more polygons to a model',
          'Converts a 3D model into a 2D sketch with no shading'
        ],
        answer: 0,
        explanation: 'Rendering is the calculation step that turns a model into a finished picture — working out how light should behave on every surface.',
        choiceFeedback: [
          null,
          'Sending to a printer is exporting for 3D printing, a different path entirely.',
          'Adding polygons changes the geometry. Rendering produces an IMAGE from geometry that already exists.',
          'Rendering specifically calculates lighting and materials, which is the opposite of an unshaded sketch.'
        ],
        xp: 10
      },
      {
        id: 'q6',
        type: 'choice',
        prompt: 'How does a 3D printer build a physical object from a digital model?',
        choices: [
          'By adding material layer by layer',
          'By carving the shape out of a solid block',
          'By pressing molten plastic into a mould',
          'By rendering an image of it'
        ],
        answer: 0,
        explanation: '3D printing is an additive process — the object is built up in thin layers until it is complete.',
        choiceFeedback: [
          null,
          'Carving away material is subtractive machining, such as CNC milling — a different manufacturing method.',
          'Pressing material into a mould is injection moulding, which needs a mould made in advance.',
          'Rendering produces an image on a screen, not a physical object you can hold.'
        ],
        xp: 10
      },
      {
        id: 'q7',
        type: 'choice',
        prompt: 'A game studio needs a dragon for a scene, and a hobbyist needs a phone stand they can hold. What is the key difference in what happens to each 3D model?',
        choices: [
          'The dragon is rendered into an image; the phone stand is exported to a 3D printer',
          'Only the dragon needs polygons',
          'Only the phone stand needs to be modelled in 3D',
          'There is no difference — both are rendered'
        ],
        answer: 0,
        explanation: 'The same kind of model can end up as a picture or as a physical object, depending on which output path it takes.',
        choiceFeedback: [
          null,
          'Both models are built from polygons.',
          'The dragon is fully three-dimensional too — it has to be, to be lit and viewed from any angle.',
          'The phone stand is printed, not rendered. That is exactly the difference.'
        ],
        xp: 10
      },
      {
        id: 'q8',
        type: 'choice',
        prompt: 'Why might a video game deliberately use lower-polygon models for distant objects?',
        choices: [
          'Fewer polygons are faster to display, and the loss of detail is not visible far away',
          'Distant objects must legally use fewer polygons',
          'Low-poly models look better than high-poly models',
          'High-poly models cannot be placed far from the camera'
        ],
        answer: 0,
        explanation: 'It is a deliberate performance trade-off: spend polygon budget where the player can actually see the detail.',
        choiceFeedback: [
          null,
          'There is no legal rule about polygon counts. This is an engineering decision.',
          'High-poly models look smoother up close. Low-poly is chosen for performance, not appearance.',
          'They can be placed anywhere — they are simply wasteful when the detail cannot be seen.'
        ],
        xp: 10
      },
      {
        id: 'q9',
        type: 'choice',
        prompt: 'How is 3D modelling used in real aerospace work?',
        choices: [
          'Parts are modelled and checked digitally, and some are 3D printed as real flight or test hardware',
          'It is only used to make promotional videos',
          'It is not used, because spacecraft parts are made by hand',
          'Only the paint scheme is designed in 3D'
        ],
        answer: 0,
        explanation: 'Additive manufacturing is genuinely used in aerospace — rocket engine components among them — alongside digital modelling for fit and clearance checks.',
        choiceFeedback: [
          null,
          'Promotional imagery is one small use. The engineering use is far larger.',
          'Modern aerospace parts are digitally modelled before manufacture as standard practice.',
          'Full structural geometry is modelled, not just surface appearance.'
        ],
        xp: 10
      },
      {
        id: 'q10',
        type: 'choice',
        prompt: 'A student\'s 3D model of a rocket nose cone looks faceted instead of smooth. What is the most likely cause and fix?',
        choices: [
          'Too few polygons — increasing the polygon count will smooth the curve',
          'The file is corrupted and must be started over',
          'The wrong colour was applied and needs changing',
          'The model needs to be rendered before it can have any curves'
        ],
        answer: 0,
        explanation: 'Faceting is the visible signature of a low polygon count on a curved surface — the same effect as a low-poly sphere looking like a disco ball.',
        choiceFeedback: [
          null,
          'Faceting is a normal result of low polygon density, not evidence of a damaged file.',
          'Colour has no effect on whether a surface reads as smooth or faceted.',
          'Rendering produces an image of the geometry that exists. It cannot add curvature that the model does not have.'
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'tech7-automation',
    subject: 'technology',
    tier: 1,
    quarter: 'Q1 2026-2027',
    sequenceInQuarter: 22,
    title: 'Automation',
    theme: 'Using technology to perform tasks with minimal human involvement',
    novaIntro: {
      glossary: {
        automation: 'Using technology to perform tasks with minimal human involvement.',
        'automated system': 'A device or program that automatically performs a repeated sequence of actions, such as a robotic arm on an assembly line.'
      },
      beats: [
        {
          label: 'What Automation Actually Replaces',
          hook: 'A single robotic arm can perform the exact same weld, thousands of times a day, without ever getting tired or distracted.',
          teachingText: 'Automation uses technology — robots, software, machines — to perform tasks with minimal human involvement, especially repetitive tasks. A factory robot arm that assembles car parts without a human operating each individual step is a clear real-world example. Automation is valued for increasing speed and consistency, and for reducing the human errors that creep in from fatigue on repetitive work.',
          example: 'A candy factory uses automated machines to wrap thousands of identical candies per hour — a task a human could do, but far slower and with far more mistakes over an 8-hour shift.',
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'Why might a factory automate the repetitive task of tightening the same bolt on every car that comes down the assembly line?',
            choices: [
              'Automation performs the identical action with more speed, consistency, and fewer errors than a tired human',
              'Automation is required by law for every single factory task',
              'Automated machines are always cheaper than human workers in every situation',
              'Bolts cannot physically be tightened by human hands'
            ],
            answer: 0,
            explanation: 'The classic case for automating a repetitive task is exactly this: speed, consistency, and reduced fatigue-related error on the same motion repeated constantly.',
            choiceFeedback: [
              null,
              'There\'s no such blanket legal requirement — automation is a business and engineering choice based on factors like this one.',
              'Cost comparisons between automation and human labor vary a lot by task and industry — it is not universally true in every case.',
              'Human hands can absolutely tighten bolts — that is not the reason automation is used here; consistency and speed are.'
            ],
            xp: 10
          },
          practiceGeneratorId: 'gen-tech-automation-basics',
          practiceCount: 4
        },
        {
          label: 'Automation Beyond Factories',
          hook: 'Automation isn\'t just robot arms in factories — it\'s quietly running in your house right now.',
          teachingText: 'Automation shows up far beyond factory floors: a dishwasher automates dish cleaning, a thermostat automates temperature control, spam filters automate sorting unwanted email, and self-checkout automates part of a store transaction. The common thread is always the same: a task that used to require constant human attention now runs with technology handling the repetitive part. Automation rarely removes a job outright. More often it removes the repetitive part and shifts the person toward setup, monitoring, and handling the exceptions the system was never built for — work that usually demands more skill, not less.',
          example: 'A washing machine automates an entire multi-step process — filling with water, agitating, draining, spinning — that used to require a person doing each step by hand.',
          practiceGeneratorId: 'gen-tech-automation-examples',
          practiceCount: 3
        }
      ],
      connection: 'Automation II, later this semester, dives into HOW automated systems actually sense the world and correct themselves — the sensors and feedback loops behind the scenes.',
      videoUrl: 'https://www.youtube.com/watch?v=5fI9AQt-iNM'
    },
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What is automation?',
        choices: [
          'Using technology to perform tasks with minimal human involvement',
          'Any task performed by a computer rather than a phone',
          'Replacing every human worker in a business',
          'Making a task faster by hiring more people'
        ],
        answer: 0,
        explanation: 'Automation means technology — robots, software, machines — handling work that would otherwise need constant human attention, especially repetitive work.',
        choiceFeedback: [
          null,
          'The device does not define it. A machine, a robot, or software can all automate a task.',
          'Automation usually handles specific repetitive tasks rather than replacing entire roles.',
          'Adding people is the opposite approach — automation reduces the human effort a task requires.'
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'Which kind of task is automation especially well suited to?',
        choices: [
          'Repetitive tasks performed the same way many times',
          'Tasks requiring a new creative decision every time',
          'Tasks that happen only once',
          'Tasks nobody has ever attempted before'
        ],
        answer: 0,
        explanation: 'Repetition is what automation is built for — consistent steps that can be defined once and then run over and over.',
        choiceFeedback: [
          null,
          'Genuinely new creative decisions are among the hardest things to automate.',
          'A one-time task rarely justifies the effort of automating it.',
          'Something never attempted has no established process to automate yet.'
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'Which are the two main benefits of automation named in this lesson?',
        choices: [
          'Increased speed and consistency, and fewer human errors from fatigue',
          'Lower electricity use and quieter workplaces',
          'Better product colours and packaging',
          'Shorter supply chains and cheaper shipping'
        ],
        answer: 0,
        explanation: 'A machine performing step 4,000 does it exactly like step 1 — humans doing repetitive work get tired and make mistakes.',
        choiceFeedback: [
          null,
          'Automated machinery often uses MORE electricity, and factories are rarely quieter.',
          'Colour and packaging are design decisions, not consequences of automation.',
          'Supply chains and shipping costs are logistics questions, separate from automating a task.'
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'A factory robot arm assembles car parts without a human operating each individual step. What does this best illustrate?',
        choices: [
          'Automation of a repetitive physical task',
          'Artificial intelligence making creative decisions',
          'A computer network sharing files',
          'A digital footprint being collected'
        ],
        answer: 0,
        explanation: 'The same physical motion, repeated precisely thousands of times, is the classic automation case.',
        choiceFeedback: [
          null,
          'The arm follows a defined process. Creative decision-making is a different capability.',
          'File sharing is networking, not automation of a physical task.',
          'Digital footprints are about online activity data, an unrelated topic.'
        ],
        xp: 10
      },
      {
        id: 'q5',
        type: 'choice',
        prompt: 'Which of these is an example of automation in an ordinary home?',
        choices: [
          'A thermostat that maintains temperature without anyone adjusting it',
          'A bookshelf holding books',
          'A window that lets in light',
          'A chair positioned near a desk'
        ],
        answer: 0,
        explanation: 'A thermostat monitors and acts on its own — that is automation of a task a person would otherwise do by hand.',
        choiceFeedback: [
          null,
          'A bookshelf holds objects but performs no task on its own.',
          'A window is passive — nothing about it runs a process.',
          'A chair does nothing without a person. There is no task being performed automatically.'
        ],
        xp: 10
      },
      {
        id: 'q6',
        type: 'choice',
        prompt: 'How does a spam filter fit the definition of automation?',
        choices: [
          'It sorts unwanted email automatically, a task a person would otherwise do by hand',
          'It writes new emails on your behalf',
          'It speeds up your internet connection',
          'It stores your email permanently'
        ],
        answer: 0,
        explanation: 'Sorting thousands of messages is exactly the kind of repetitive work automation handles well.',
        choiceFeedback: [
          null,
          'Filters sort incoming mail; they do not compose new messages.',
          'Connection speed is unaffected by filtering.',
          'Storage is a separate function of the email service.'
        ],
        xp: 10
      },
      {
        id: 'q7',
        type: 'choice',
        prompt: 'What is the common thread across a dishwasher, a thermostat, a spam filter, and self-checkout?',
        choices: [
          'Each takes a task that used to need constant human attention and lets technology handle the repetitive part',
          'Each was invented in the same decade',
          'Each requires an internet connection',
          'Each completely eliminates the need for a person'
        ],
        answer: 0,
        explanation: 'Automation shows up far beyond factory floors — the pattern is always technology absorbing the repetitive portion of a task.',
        choiceFeedback: [
          null,
          'They span very different eras — dishwashers and thermostats long predate spam filters.',
          'A dishwasher and a basic thermostat work with no internet at all.',
          'People still load the dishwasher and scan items at self-checkout. Automation handles a PART of the task.'
        ],
        xp: 10
      },
      {
        id: 'q8',
        type: 'choice',
        prompt: 'A washing machine fills with water, agitates, drains, and spins on its own. Why is this a good example of automation?',
        choices: [
          'An entire multi-step process that once required a person at each step now runs on its own',
          'It uses electricity',
          'It is found in most homes',
          'It has a digital display'
        ],
        answer: 0,
        explanation: 'It is the multi-step sequence running unattended — not the power source or the display — that makes it automation.',
        choiceFeedback: [
          null,
          'A lamp uses electricity and automates nothing. Power alone is not automation.',
          'How common something is says nothing about whether it automates a task.',
          'Older machines with mechanical dials automate the process just as fully.'
        ],
        xp: 10
      },
      {
        id: 'q9',
        type: 'choice',
        prompt: 'Why would consistency matter more than raw speed for an automated system checking rocket parts?',
        choices: [
          'A check performed identically every time is what makes a missed defect unlikely',
          'Speed cannot be measured on inspection tasks',
          'Consistency and speed are the same thing',
          'Rocket parts are never inspected'
        ],
        answer: 0,
        explanation: 'An inspection that varies is an inspection that misses things. Doing it the same way every single time is the safety property that matters.',
        choiceFeedback: [
          null,
          'Inspection speed is measurable and does matter — it is simply less critical than reliability here.',
          'They are different: something can be fast and erratic, or slow and perfectly repeatable.',
          'Aerospace inspection is extensive and heavily regulated.'
        ],
        xp: 10
      },
      {
        id: 'q10',
        type: 'choice',
        prompt: 'Why does a candy factory automate wrapping thousands of identical candies per hour, when a human could do the same job?',
        choices: [
          'A human could do it, but far slower and with far more mistakes over an eight-hour shift',
          'Humans are not physically capable of wrapping candy',
          'Automation makes the candy taste better',
          'It is required by food safety law'
        ],
        answer: 0,
        explanation: 'The task is possible by hand — automation wins on speed and on consistency across a long shift, which is exactly where human fatigue shows up.',
        choiceFeedback: [
          null,
          'A person can wrap candy perfectly well. The difference is throughput and consistency.',
          'Wrapping has no effect on flavour.',
          'Food safety law governs hygiene and handling, not whether a step must be automated.'
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'tech7-python-2',
    subject: 'technology',
    tier: 1,
    quarter: 'Q2 2026-2027',
    sequenceInQuarter: 1,
    title: 'Python II: Lists & Conditionals',
    theme: 'Storing multiple values and making decisions in code',
    novaIntro: {
      glossary: {
        list: 'A Python data structure that stores multiple values in order, created with square brackets, like [1, 2, 3].',
        index: 'A number identifying an item\'s position in a list — Python lists start counting at 0.',
        'if/else': 'A conditional structure where the "if" block runs when a condition is true and the "else" block runs when it\'s false.'
      },
      beats: [
        {
          label: 'Storing Many Values in a List',
          hook: 'Why write ten separate variables for ten scores when Python lets you store all ten in one place?',
          teachingText: 'A list stores multiple values in order, created with square brackets: scores = [88, 92, 75]. Python lists are zero-indexed, meaning the FIRST item is at position 0, not 1 — so scores[0] is 88, scores[1] is 92, and scores[2] is 75. This zero-indexing trips up almost every beginner at first, so it\'s worth memorizing early. Zero-indexing also explains a common error message: scores[3] on a three-item list raises an IndexError, because the valid positions are 0, 1, and 2 only. len(scores) gives the count, so the last valid index is always len(scores) - 1.',
          example: 'players = ["Lamar", "Jordan", "Alex"] creates a list of three names; players[0] refers to "Lamar", NOT players[1].',
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'Given colors = ["red", "blue", "green"], what does colors[1] refer to?',
            choices: [
              '"blue" — the second item, since indexing starts at 0',
              '"red" — the first item',
              '"green" — the last item',
              'An error, since 1 is not a valid index'
            ],
            answer: 0,
            explanation: 'Python lists are zero-indexed: index 0 is "red", index 1 is "blue", index 2 is "green" — so colors[1] is "blue".',
            choiceFeedback: [
              null,
              '"red" is at index 0, not index 1 — this is the classic zero-indexing mix-up.',
              '"green" is at index 2, the third position — index 1 is the SECOND item, "blue".',
              'Index 1 is completely valid for a 3-item list (valid indices are 0, 1, and 2) — it refers to "blue".'
            ],
            xp: 10
          },
          practiceGeneratorId: 'gen-tech-python-lists',
          practiceCount: 4
        },
        {
          label: 'Making Decisions with if/else',
          hook: 'Real programs constantly have to choose between two paths — that\'s exactly what if/else is for.',
          teachingText: 'An if statement runs its indented code only when a condition is true. Pairing it with else provides a fallback: else runs its code only when the if condition is FALSE. Together, if/else lets a program branch into exactly one of two paths depending on the situation, every single time it runs. elif ("else if") adds extra branches between the two: a grade checker might test for 90 and above, then elif for 80 and above, then else for everything remaining. Python checks each condition in order and runs only the FIRST one that is true, which is why the order the branches are written in changes the result.',
          example: 'if score >= 70: print("Pass") else: print("Try again") — this prints "Pass" for any score of 70 or higher, and "Try again" for anything lower, every single run.',
          practiceGeneratorId: 'gen-tech-python-if-else',
          practiceCount: 3
        }
      ],
      connection: 'Lists and conditionals combined — checking items in a list one at a time and reacting differently to each — is the exact pattern behind almost every real data-processing program ever written.',
      videoUrl: 'https://www.youtube.com/watch?v=QSvlIhNtBBg'
    },
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'In the list scores = [88, 92, 75], what does scores[0] refer to?',
        choices: ['88', '92', '75', 'The number of items in the list'],
        answer: 0,
        explanation: 'Python lists are zero-indexed, so the FIRST item sits at position 0.',
        choiceFeedback: [
          null,
          '92 is at index 1. Counting starts at 0, so index 1 is the second item.',
          '75 is at index 2, the third and last item in this list.',
          'The count comes from len(scores), which is 3. Indexing returns a value, not a count.'
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'What does "zero-indexed" mean?',
        choices: [
          'The first item is at position 0, not position 1',
          'The list starts out containing the number zero',
          'An empty list has a length of zero',
          'Indexes count backward from the end'
        ],
        answer: 0,
        explanation: 'Zero-indexing is the convention that positions begin at 0 — the source of most beginner off-by-one mistakes.',
        choiceFeedback: [
          null,
          'The list contains whatever you put in it. Zero refers to the POSITION numbering, not the contents.',
          'An empty list does have length 0, but that is a separate fact from what zero-indexing means.',
          'Python does support negative indexes that count from the end, but that is a different feature.'
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'What happens if you write scores[3] on the three-item list [88, 92, 75]?',
        choices: [
          'Python raises an IndexError, because the only valid positions are 0, 1, and 2',
          'It returns the last item, 75',
          'It returns None',
          'It adds a fourth item to the list'
        ],
        answer: 0,
        explanation: 'Three items occupy positions 0, 1, and 2. Position 3 does not exist, and Python stops rather than guessing.',
        choiceFeedback: [
          null,
          'The last item is at index 2, not 3. Reaching for 3 goes past the end of the list.',
          'Python does not quietly return None here — it raises an error, which is arguably more helpful.',
          'Indexing reads from a list; it never creates new positions.'
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'For any Python list, the last valid index is always what?',
        choices: ['len(list) - 1', 'len(list)', 'len(list) + 1', 'Always 10'],
        answer: 0,
        explanation: 'Because counting starts at 0, a list of 3 items ends at index 2 — one less than its length, every time.',
        choiceFeedback: [
          null,
          'len(list) is one PAST the last valid index. Using it directly is the classic off-by-one error.',
          'That is two past the end and would always fail.',
          'Lists can be any length. The rule scales with the list, it is not a fixed number.'
        ],
        xp: 10
      },
      {
        id: 'q5',
        type: 'choice',
        prompt: 'What creates a list in Python?',
        choices: ['Square brackets: [88, 92, 75]', 'Parentheses: (88, 92, 75)', 'Curly braces: {88, 92, 75}', 'Quotation marks: "88, 92, 75"'],
        answer: 0,
        explanation: 'Square brackets create a list. The other bracket types create different Python structures entirely.',
        choiceFeedback: [
          null,
          'Parentheses create a tuple — similar in some ways, but its contents cannot be changed after it is made.',
          'Curly braces create a set or a dictionary, not a list.',
          'Quotation marks would make the whole thing one piece of text, not a list of three numbers.'
        ],
        xp: 10
      },
      {
        id: 'q6',
        type: 'choice',
        prompt: 'What does an else block do?',
        choices: [
          'Runs its code only when the if condition is FALSE',
          'Runs its code every time, regardless of the condition',
          'Runs its code only when the if condition is TRUE',
          'Checks a second, different condition'
        ],
        answer: 0,
        explanation: 'if and else are two exclusive paths — exactly one of them runs on every pass.',
        choiceFeedback: [
          null,
          'Code that always runs would be written outside the if/else entirely.',
          'That describes the IF block. else is the fallback for when the condition fails.',
          'Checking a second condition is what elif does.'
        ],
        xp: 10
      },
      {
        id: 'q7',
        type: 'choice',
        prompt: 'What does elif add to an if/else structure?',
        choices: [
          'Extra branches to test between the if and the else',
          'A way to run two branches at the same time',
          'A loop that repeats the condition',
          'A comment explaining the condition'
        ],
        answer: 0,
        explanation: 'elif ("else if") lets a program choose among three or more paths instead of only two.',
        choiceFeedback: [
          null,
          'Only one branch ever runs. That is the point of the structure.',
          'Repeating is what a loop does. elif is about choosing, not repeating.',
          'Comments start with # and have no effect on which branch runs.'
        ],
        xp: 10
      },
      {
        id: 'q8',
        type: 'choice',
        prompt: 'A grade checker tests if score >= 90, then elif score >= 80, then else. A score of 95 is entered. Which branch runs?',
        choices: [
          'Only the first branch — Python runs the FIRST condition that is true and skips the rest',
          'Both the first and second, since 95 is above 90 and above 80',
          'Only the else branch',
          'All three branches, in order'
        ],
        answer: 0,
        explanation: 'Python checks conditions in order and stops at the first true one. 95 satisfies both tests, but only the first one gets to run.',
        choiceFeedback: [
          null,
          '95 does satisfy both conditions, but the structure runs only ONE branch — the first that matches.',
          'else only runs when every condition above it has failed. The first one succeeded here.',
          'if/elif/else is a choice, not a sequence. Exactly one branch runs.'
        ],
        xp: 10
      },
      {
        id: 'q9',
        type: 'choice',
        prompt: 'Why does the ORDER of elif branches change a program\'s result?',
        choices: [
          'Python runs the first true condition and skips the rest, so a broader test written first can swallow a narrower one',
          'Python runs the branches in alphabetical order',
          'Later branches always override earlier ones',
          'Order does not matter — Python tests all of them'
        ],
        answer: 0,
        explanation: 'Put "score >= 60" before "score >= 90" and every passing score reports as a D, because the broad test matches first and the specific one never gets checked.',
        choiceFeedback: [
          null,
          'Branches run in the order they are written, not alphabetically.',
          'The opposite is true: the FIRST matching branch wins and the rest are skipped.',
          'Python stops at the first true condition. It does not evaluate the remaining ones.'
        ],
        xp: 10
      },
      {
        id: 'q10',
        type: 'choice',
        prompt: 'A rocket flight computer stores 5 sensor readings in a list and must react differently to safe, warning, and critical values. Which two Python features does that need?',
        choices: [
          'A list to hold the readings, and if/elif/else to choose the response',
          'Two separate lists and no conditionals',
          'A comment and a print statement',
          'Only a single if statement with no else'
        ],
        answer: 0,
        explanation: 'Lists store the many values; conditional branching picks exactly one response per reading. Together they are the core of nearly every control program.',
        choiceFeedback: [
          null,
          'Splitting into two lists still leaves no way to DECIDE which response to take.',
          'A comment does nothing when the program runs, and printing does not choose a response.',
          'A single if with no else handles one case and silently ignores the other two.'
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'tech7-cybersecurity-2',
    subject: 'technology',
    tier: 1,
    quarter: 'Q2 2026-2027',
    sequenceInQuarter: 2,
    title: 'Cybersecurity II: Staying Protected',
    theme: 'VPNs, encrypted connections, and social engineering',
    novaIntro: {
      glossary: {
        VPN: 'Virtual Private Network — a tool that encrypts internet traffic and can hide a user\'s location for privacy and security.',
        encryption: 'Scrambling data so it can only be read by someone with the correct key, protecting it if intercepted.',
        'social engineering': 'Manipulating people, rather than technology, into revealing confidential information or taking unsafe actions.'
      },
      beats: [
        {
          label: 'VPNs and Encrypted Connections',
          hook: 'Even if someone intercepts your data on public WiFi, encryption can turn it into meaningless scrambled nonsense.',
          teachingText: 'A VPN (Virtual Private Network) encrypts your internet traffic and can hide your real location, adding privacy and security especially on public networks. Separately, a website URL starting with https:// (instead of http://) means the connection between your browser and that site is encrypted — though this only protects the connection itself, it doesn\'t guarantee the site\'s actual content is trustworthy. The two ideas are worth keeping separate: a VPN protects traffic on a network you do not control, while https protects the link to one particular site. Neither says anything about whether the site on the other end is honest — a phishing site can use https perfectly well, which is why the padlock is not a trust badge.',
          example: 'On public library WiFi, a VPN scrambles your data so someone else on that same network can\'t easily read what you\'re sending or receiving.',
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'A website URL begins with "https://" rather than "http://". What does the "s" actually guarantee?',
            choices: [
              'The connection between your browser and the site is encrypted',
              'The website\'s content is guaranteed to be completely true and safe',
              'The site has no advertisements at all',
              'The site cannot be visited on a phone'
            ],
            answer: 0,
            explanation: 'The "s" in https specifically indicates an encrypted connection — it says nothing about whether the site\'s content itself is trustworthy or accurate.',
            choiceFeedback: [
              null,
              'This is a very common misconception — https protects the CONNECTION, but a scam site can still use https and still lie or scam visitors.',
              'Advertisements are unrelated to the https/http distinction, which is purely about connection encryption.',
              'https has no connection to which devices can visit a site — it is purely about connection security.'
            ],
            xp: 10
          },
          practiceGeneratorId: 'gen-tech-cybersecurity-vpn-https',
          practiceCount: 4
        },
        {
          label: 'Social Engineering',
          hook: 'The weakest point in almost any security system isn\'t the code — it\'s a person being tricked.',
          teachingText: 'Social engineering manipulates PEOPLE, not computers, into revealing confidential information or taking unsafe actions — like a scammer calling and pretending to be tech support to convince someone to share a password. Regularly updating software also matters here: updates frequently patch newly discovered security vulnerabilities that attackers could otherwise exploit.',
          example: 'A caller pretending to be from "the school\'s IT department" asks a student to read back their login code over the phone — that\'s social engineering, not a technical hack.',
          practiceGeneratorId: 'gen-tech-cybersecurity-social-engineering',
          practiceCount: 3
        }
      ],
      connection: 'Cybersecurity II shows that the strongest passwords in the world still can\'t protect someone who gets tricked by a convincing lie — technology and human judgment both matter.',
      videoUrl: 'https://www.youtube.com/watch?v=F-CXP-tg58M'
    },
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What does a VPN do?',
        choices: [
          'Encrypts your internet traffic and can hide your real location',
          'Removes viruses already on your computer',
          'Makes your internet connection faster',
          'Blocks all advertisements permanently'
        ],
        answer: 0,
        explanation: 'A VPN — Virtual Private Network — scrambles your traffic and routes it elsewhere, which adds privacy especially on networks you do not control.',
        choiceFeedback: [
          null,
          'Removing existing infections is antivirus work. A VPN protects traffic in transit.',
          'A VPN usually makes a connection slightly SLOWER, since traffic takes a longer route and must be encrypted.',
          'Ad blocking is a separate tool. Some VPNs bundle it, but it is not what a VPN is.'
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'On public library WiFi, what does a VPN actually protect against?',
        choices: [
          'Someone else on that same network reading what you send and receive',
          'The library finding out you used their WiFi',
          'Your laptop battery draining quickly',
          'Websites loading in the wrong language'
        ],
        answer: 0,
        explanation: 'A shared public network is the classic VPN case: encryption means other users on it cannot easily read your traffic.',
        choiceFeedback: [
          null,
          'The network still sees that a device connected. What a VPN hides is the CONTENT of the traffic.',
          'Battery life is unrelated — if anything, encryption uses slightly more power.',
          'Language settings come from your browser and the site, not from network security.'
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'What does https:// at the start of a web address tell you?',
        choices: [
          'The connection between your browser and that site is encrypted',
          'The site\'s content has been fact-checked',
          'The site is owned by a government agency',
          'The site cannot contain any malware'
        ],
        answer: 0,
        explanation: 'https protects the connection, not the honesty of what is on the other end — an important distinction, since scam sites can and do use https.',
        choiceFeedback: [
          null,
          'No one verifies content as part of https. It secures the pipe, not the truth of what flows through it.',
          'Government sites use .gov domains. Any site can use https.',
          'A malicious site can use https perfectly well. Encryption says nothing about intent.'
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'What is encryption?',
        choices: [
          'Scrambling data so only someone with the right key can read it',
          'Permanently deleting data so it cannot be recovered',
          'Compressing a file so it takes up less space',
          'Copying data to a second location as a backup'
        ],
        answer: 0,
        explanation: 'Encryption makes data unreadable to anyone without the key, which is what protects it while it travels across a network.',
        choiceFeedback: [
          null,
          'Deletion removes data. Encryption keeps it, but makes it unreadable without the key.',
          'Compression shrinks a file. That is a size problem, not a security one.',
          'Backing up protects against LOSS. Encryption protects against being read.'
        ],
        xp: 10
      },
      {
        id: 'q5',
        type: 'choice',
        prompt: 'What makes social engineering different from a technical hack?',
        choices: [
          'It manipulates PEOPLE into revealing information or taking unsafe actions',
          'It only works on very old computers',
          'It requires expensive specialized software',
          'It can only be done in person'
        ],
        answer: 0,
        explanation: 'Social engineering bypasses technical protections entirely by targeting the human being who holds the key.',
        choiceFeedback: [
          null,
          'Machine age is irrelevant — the target is a person, not a system.',
          'Often it requires no software at all. A phone call can be enough.',
          'It works by phone, email, and text just as well as in person.'
        ],
        xp: 10
      },
      {
        id: 'q6',
        type: 'choice',
        prompt: 'A caller claiming to be from "the school\'s IT department" asks a student to read back their login code over the phone. What is this?',
        choices: [
          'Social engineering',
          'A data breach',
          'Malware',
          'Encryption'
        ],
        answer: 0,
        explanation: 'No system was broken into. The attack is entirely about convincing a person to hand over the code voluntarily.',
        choiceFeedback: [
          null,
          'A data breach is information stolen from a company\'s systems. Here, nothing was hacked.',
          'Malware is harmful software. No software is involved in a phone call.',
          'Encryption is a protection, not an attack.'
        ],
        xp: 10
      },
      {
        id: 'q7',
        type: 'choice',
        prompt: 'Why does regularly updating software matter for security?',
        choices: [
          'Updates frequently patch newly discovered vulnerabilities attackers could otherwise exploit',
          'Updates make programs run faster every time',
          'Updates automatically create backups of your files',
          'Updates delete any malware already installed'
        ],
        answer: 0,
        explanation: 'A known, unpatched vulnerability is a published road map for an attacker. Updating closes the door before it gets used.',
        choiceFeedback: [
          null,
          'Some updates improve speed and some slow things down. Security patching is the reason that matters here.',
          'Backups are a separate process you have to set up yourself.',
          'Removing existing infections is antivirus work, not what a routine update does.'
        ],
        xp: 10
      },
      {
        id: 'q8',
        type: 'choice',
        prompt: 'A site uses https and looks professional, but the address is subtly misspelled. What is the safest conclusion?',
        choices: [
          'The connection is encrypted, but the site itself may still be fake — https does not verify honesty',
          'It must be legitimate, since https means it is verified',
          'The misspelling proves the browser made an error',
          'https makes the misspelling irrelevant'
        ],
        answer: 0,
        explanation: 'This is exactly why the lesson separates the two ideas: https secures the connection, and a phishing site can secure a connection to itself perfectly well.',
        choiceFeedback: [
          null,
          'https certifies encryption, not identity or intent. Anyone can obtain it.',
          'Browsers show the address they actually loaded. A misspelled domain is a real, different site.',
          'The domain is what determines who you are actually talking to. Encryption to the wrong party protects nothing.'
        ],
        xp: 10
      },
      {
        id: 'q9',
        type: 'choice',
        prompt: 'Which pair of defenses best matches the two threats in this lesson — an untrusted network, and a convincing stranger?',
        choices: [
          'A VPN for the network; skepticism and verification for the stranger',
          'A VPN for both',
          'Software updates for both',
          'Antivirus for the network; a VPN for the stranger'
        ],
        answer: 0,
        explanation: 'Technical threats get technical defenses. Social engineering targets judgment, so the defense is verifying who you are actually talking to.',
        choiceFeedback: [
          null,
          'A VPN cannot help when you willingly tell someone your password — the traffic was never the weak point.',
          'Updates matter, but they do nothing about a phone call asking for your login code.',
          'Reversed, and neither pairing works: antivirus does not secure a network connection, and a VPN does not detect a lie.'
        ],
        xp: 10
      },
      {
        id: 'q10',
        type: 'choice',
        prompt: 'Why is social engineering considered especially dangerous in an organization with strong technical security?',
        choices: [
          'It bypasses the technical protections entirely by targeting the people who hold the keys',
          'It only works where security software is missing',
          'Strong security makes employees immune to it',
          'It is easily blocked by a firewall'
        ],
        answer: 0,
        explanation: 'Firewalls, encryption, and patching all protect systems. None of them stop an employee from being talked into handing over access.',
        choiceFeedback: [
          null,
          'It works regardless of the software in place, because software is not what it attacks.',
          'Technical security does not change how convincing a caller sounds. Training does.',
          'A firewall filters network traffic. It cannot filter a persuasive phone call.'
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'tech7-javascript-2',
    subject: 'technology',
    tier: 1,
    quarter: 'Q2 2026-2027',
    sequenceInQuarter: 3,
    title: 'JavaScript II: Arrays & Events',
    theme: 'Storing lists of data and responding to user actions',
    novaIntro: {
      glossary: {
        array: 'A JavaScript data structure that stores an ordered list of values, created with square brackets.',
        'event listener': 'Code that runs in response to a user action, like a click, on a webpage.',
        '=== (strict equality)': 'A JavaScript comparison operator that checks if two values are equal AND the same type.'
      },
      beats: [
        {
          label: 'Arrays: Lists in JavaScript',
          hook: 'A shopping list, a leaderboard, a playlist — all of these are the exact same data structure in code.',
          teachingText: 'A JavaScript array stores an ordered list of values using square brackets: let numbers = [1, 2, 3];. Like Python lists, JavaScript arrays are zero-indexed, so numbers[0] is the FIRST item. Arrays can hold numbers, text, or even other arrays, and are one of the most commonly used structures in real JavaScript programs. Arrays carry a length property — scores.length is 3 for a three-item array — and because indexing starts at 0, the last item is always at scores[length - 1]. Reaching past the end returns undefined rather than raising an error, which is why an off-by-one mistake in JavaScript can run quietly instead of stopping the program.',
          example: 'let scores = [95, 88, 76]; scores[0] refers to 95, the first item — not the second.',
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'Given let pets = ["cat", "dog", "fish"];, which index refers to "dog"?',
            choices: [
              'pets[1]',
              'pets[2]',
              'pets[0]',
              'pets[3]'
            ],
            answer: 0,
            explanation: 'JavaScript arrays are zero-indexed: "cat" is index 0, "dog" is index 1, "fish" is index 2 — so pets[1] is "dog".',
            choiceFeedback: [
              null,
              'pets[2] refers to "fish", the third item — "dog" is the SECOND item, at index 1.',
              'pets[0] refers to "cat", the first item, not "dog".',
              'There is no index 3 in a 3-item array — valid indices are only 0, 1, and 2.'
            ],
            xp: 10
          },
          practiceGeneratorId: 'gen-tech-javascript-arrays',
          practiceCount: 4
        },
        {
          label: 'Responding to Clicks with Event Listeners',
          hook: 'A button on a webpage does absolutely nothing on its own — it needs code specifically listening for the click.',
          teachingText: 'An event listener runs code in response to a user action, like a click, keypress, or mouse movement. And when JavaScript compares two values, === (strict equality) checks not just that the VALUES match, but that the TYPES match too — so 5 === "5" is false, since one is a number and one is text, even though they look similar. The looser == comparison converts types before comparing, so 5 == "5" is true while 5 === "5" is false. Professional JavaScript code almost always uses === for exactly that reason: it compares what is actually there instead of what the values could be converted into.',
          example: 'button.addEventListener("click", sayHi); tells the browser: whenever this button is clicked, run the sayHi function.',
          practiceGeneratorId: 'gen-tech-javascript-events',
          practiceCount: 3
        }
      ],
      connection: 'Arrays and event listeners are the backbone of nearly every interactive website Lamar uses — from a game\'s high-score list to a single button click that changes the whole page.',
      videoUrl: 'https://www.youtube.com/watch?v=8FmBEN0XZyI'
    },
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'In let scores = [95, 88, 76];, what does scores[0] refer to?',
        choices: ['95', '88', '76', 'The length of the array'],
        answer: 0,
        explanation: 'JavaScript arrays are zero-indexed, exactly like Python lists — the first item sits at position 0.',
        choiceFeedback: [
          null,
          '88 is at index 1, the second item.',
          '76 is at index 2, the third item.',
          'Length comes from scores.length, which is 3 here.'
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'What creates an array in JavaScript?',
        choices: ['Square brackets: [1, 2, 3]', 'Curly braces: {1, 2, 3}', 'Parentheses: (1, 2, 3)', 'The word array followed by values'],
        answer: 0,
        explanation: 'Square brackets — the same notation Python uses for lists, which is part of why the two transfer so readily.',
        choiceFeedback: [
          null,
          'Curly braces create an object in JavaScript, which stores named properties rather than an ordered list.',
          'Parentheses group expressions or hold function arguments; they do not create an array.',
          'There is no such syntax. Square brackets are the standard way.'
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'For a three-item array, what is scores.length?',
        choices: ['3', '2', '4', 'undefined'],
        answer: 0,
        explanation: 'length counts the items, so it is 3. The last valid INDEX, though, is 2.',
        choiceFeedback: [
          null,
          '2 is the last valid index, not the count. Length and last index differ by one.',
          'There are only three items, so the count cannot be 4.',
          'length is a real property of every array and always returns a number.'
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'What happens if you read past the end of a JavaScript array, like scores[5] on a three-item array?',
        choices: [
          'It returns undefined, and the program keeps running',
          'It throws an error and stops the program',
          'It returns the last item instead',
          'It adds a new empty item at position 5'
        ],
        answer: 0,
        explanation: 'This is a real difference from Python, which raises an IndexError. JavaScript stays quiet — so an off-by-one mistake can run silently and produce wrong results.',
        choiceFeedback: [
          null,
          'Stopping with an error is PYTHON\'s behavior. JavaScript keeps going.',
          'It does not substitute the last item. It reports undefined.',
          'Reading a position never creates one.'
        ],
        xp: 10
      },
      {
        id: 'q5',
        type: 'choice',
        prompt: 'Why can an off-by-one mistake be harder to catch in JavaScript than in Python?',
        choices: [
          'JavaScript returns undefined and keeps running, so nothing announces the mistake',
          'JavaScript arrays are one-indexed',
          'JavaScript has no arrays',
          'JavaScript hides all error messages'
        ],
        answer: 0,
        explanation: 'An error that stops the program is annoying but obvious. A silent undefined can flow downstream and corrupt a result with no warning at all.',
        choiceFeedback: [
          null,
          'JavaScript is zero-indexed, the same as Python. The difference is in what happens when you overshoot.',
          'Arrays are one of the most-used structures in JavaScript.',
          'JavaScript reports plenty of errors. Reading past an array end simply is not treated as one.'
        ],
        xp: 10
      },
      {
        id: 'q6',
        type: 'choice',
        prompt: 'What does an event listener do?',
        choices: [
          'Runs code in response to a user action like a click or keypress',
          'Listens to audio played on the page',
          'Records everything the user types and saves it',
          'Checks the page for spelling errors'
        ],
        answer: 0,
        explanation: 'Event listeners are what make a page interactive — code that waits for something to happen and then responds.',
        choiceFeedback: [
          null,
          '"Listener" is a metaphor for waiting on an event. No sound is involved.',
          'Recording keystrokes would be a keylogger — an entirely different and malicious thing.',
          'Spell checking is a browser or editor feature, unrelated to event handling.'
        ],
        xp: 10
      },
      {
        id: 'q7',
        type: 'choice',
        prompt: 'What does button.addEventListener("click", sayHi); do?',
        choices: [
          'Tells the browser to run sayHi whenever that button is clicked',
          'Clicks the button immediately',
          'Runs sayHi once, right now',
          'Renames the button to "click"'
        ],
        answer: 0,
        explanation: 'It registers the connection between an event and a response. Nothing runs until the click actually happens.',
        choiceFeedback: [
          null,
          'It does not click anything. It sets up what should happen IF a click occurs.',
          'Note there are no parentheses after sayHi — the function is handed over to be called later, not called now.',
          'The string "click" names the event to watch for; it is not a label for the button.'
        ],
        xp: 10
      },
      {
        id: 'q8',
        type: 'choice',
        prompt: 'Is 5 === "5" true or false, and why?',
        choices: [
          'False — strict equality requires the TYPES to match, and one is a number while the other is text',
          'True — both represent the value five',
          'True — JavaScript ignores types entirely',
          'False — the values are different numbers'
        ],
        answer: 0,
        explanation: 'Strict equality compares value AND type. A number 5 and a text "5" look alike on screen but are different kinds of thing.',
        choiceFeedback: [
          null,
          'They do represent the same quantity, but === also checks type, and those differ.',
          'JavaScript very much has types. === is the operator that refuses to ignore them.',
          'The numeric values are identical. It is the TYPES that differ.'
        ],
        xp: 10
      },
      {
        id: 'q9',
        type: 'choice',
        prompt: 'How does == differ from ===?',
        choices: [
          '== converts types before comparing, so 5 == "5" is true, while 5 === "5" is false',
          '== is used for numbers and === for text',
          'They behave identically; === is just older',
          '=== assigns a value and == compares'
        ],
        answer: 0,
        explanation: 'The loose == tries to make the two sides comparable first. That helpfulness is exactly what makes it unpredictable.',
        choiceFeedback: [
          null,
          'Both work on any type. The difference is whether conversion happens first.',
          'They genuinely behave differently, and === is the newer, stricter one.',
          'A single = assigns. Both == and === compare.'
        ],
        xp: 10
      },
      {
        id: 'q10',
        type: 'choice',
        prompt: 'Why does professional JavaScript code almost always use === instead of ==?',
        choices: [
          'It compares what is actually there rather than what the values could be converted into, so results are predictable',
          '=== runs measurably faster',
          '== was removed from the language',
          '=== works inside functions and == does not'
        ],
        answer: 0,
        explanation: 'Automatic type conversion produces surprising results in edge cases. Strict comparison removes the surprise, which is worth more than the convenience.',
        choiceFeedback: [
          null,
          'Any speed difference is irrelevant. Predictability is the reason.',
          '== still exists and still works — professionals simply choose not to rely on it.',
          'Both operators work anywhere in JavaScript code.'
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'tech7-blockly-2',
    subject: 'technology',
    tier: 1,
    quarter: 'Q2 2026-2027',
    sequenceInQuarter: 4,
    title: 'Blockly II: Debugging & Logic Blocks',
    theme: 'Finding errors and using loops and conditionals in visual programs',
    novaIntro: {
      glossary: {
        debugging: 'The process of reviewing a program\'s logic step by step to find where it doesn\'t produce the expected result.',
        'test case': 'A specific input used to check whether a program behaves correctly.'
      },
      beats: [
        {
          label: 'Finding Bugs Step by Step',
          hook: 'Even professional programmers spend more time fixing broken code than writing new code.',
          teachingText: 'Debugging means reviewing a program\'s blocks step by step to find exactly where the logic breaks down — comparing what SHOULD happen at each step against what the program ACTUALLY does. Rather than deleting everything and starting over, effective debugging isolates the problem to one specific block or connection, often by testing smaller pieces of the program separately.',
          example: 'A Blockly maze program keeps turning the wrong direction — stepping through block by block reveals the "turn left" and "turn right" blocks were accidentally swapped.',
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'A Blockly program that should repeat an action 5 times is instead running forever. What debugging approach fits best?',
            choices: [
              'Check whether a "repeat 5" block was accidentally replaced with a "forever" block',
              'Delete the entire program and start completely over',
              'Ignore the bug since Blockly programs cannot be debugged',
              'Assume the computer itself is broken'
            ],
            answer: 0,
            explanation: 'Targeted debugging checks the specific block causing the specific symptom — a program running forever instead of 5 times strongly suggests a forever/repeat mix-up.',
            choiceFeedback: [
              null,
              'Starting completely over skips the actual diagnostic step and risks losing correct parts of the program along with the bug.',
              'Blockly programs are absolutely debuggable — this is a normal, expected part of programming in any language, visual or text-based.',
              'This symptom points directly at the program\'s logic, not a hardware problem with the computer.'
            ],
            xp: 10
          },
          practiceGeneratorId: 'gen-tech-blockly-debugging',
          practiceCount: 4
        },
        {
          label: 'Testing With Multiple Inputs',
          hook: 'A program that works perfectly once might still be completely broken — you just haven\'t tested it enough yet.',
          teachingText: 'Testing a program with several different input values, rather than just one, helps confirm it works correctly across different situations — a program that works for the number 5 might break entirely for 0 or a negative number. This is exactly why real programmers use test cases: specific inputs chosen to check a program\'s behavior, including unusual or edge cases. Edge cases deserve deliberate attention: zero, negative numbers, empty lists, and values sitting exactly on a boundary are where programs most often behave incorrectly. A test that only uses comfortable middle-of-the-range numbers can pass while a real bug sits untouched.',
          example: 'A Blockly program that checks "if number > 10, then..." should be tested with a number above 10, a number below 10, AND exactly 10, to confirm all three cases behave correctly.',
          practiceGeneratorId: 'gen-tech-blockly-testing',
          practiceCount: 3
        }
      ],
      connection: 'Debugging is one of the single most transferable skills in ALL of programming — the exact same step-by-step, isolate-the-problem approach works in Blockly, Python, or any future language.',
      videoUrl: 'https://www.youtube.com/watch?v=LYoOPOTr8wo'
    },
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What does debugging mean?',
        choices: [
          'Reviewing a program step by step to find exactly where the logic breaks down',
          'Deleting a program and starting over',
          'Making a program run faster',
          'Adding comments explaining the code'
        ],
        answer: 0,
        explanation: 'Debugging compares what SHOULD happen at each step against what actually happens, until the gap is located.',
        choiceFeedback: [
          null,
          'Starting over discards the working parts along with the broken one — the opposite of debugging.',
          'Speeding up code is optimization, a different activity.',
          'Comments help humans read code but do not find errors.'
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'What is the most effective debugging approach?',
        choices: [
          'Isolate the problem to one specific block or connection, often by testing smaller pieces separately',
          'Change several things at once to save time',
          'Delete everything and rebuild from scratch',
          'Run the program repeatedly until it works'
        ],
        answer: 0,
        explanation: 'Narrowing down is what makes debugging systematic rather than guesswork.',
        choiceFeedback: [
          null,
          'Changing several things at once means that if the behavior changes, you cannot tell which change did it.',
          'Rebuilding throws away working code and usually reintroduces the same mistake.',
          'A deterministic program produces the same result every run. Repeating it changes nothing.'
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'A Blockly maze program keeps turning the wrong direction. Stepping through block by block shows "turn left" and "turn right" were swapped. What kind of error is this?',
        choices: [
          'A logic error — the program runs fine but does the wrong thing',
          'A syntax error — the blocks are malformed',
          'A hardware error',
          'A typing error in a variable name'
        ],
        answer: 0,
        explanation: 'Blockly prevents syntax errors by design. Logic errors it cannot prevent, because swapped blocks are perfectly valid code that means the wrong thing.',
        choiceFeedback: [
          null,
          'Both blocks connected properly, so the syntax is valid. The MEANING is wrong.',
          'The same swap produces the same wrong behavior on any machine.',
          'No name was mistyped — the blocks are correct and simply in the wrong places.'
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'Why does Blockly still need debugging even though it prevents syntax errors?',
        choices: [
          'Block shapes ensure code is well-formed, not that it does what you intended',
          'Blockly has more syntax errors than text languages',
          'Debugging is only needed when a program refuses to run',
          'Blockly randomly rearranges blocks'
        ],
        answer: 0,
        explanation: 'This is the practical version of the syntax-versus-logic distinction from Blockly I.',
        choiceFeedback: [
          null,
          'Blockly has far FEWER syntax errors — that is its main advantage.',
          'Most real bugs happen in programs that run perfectly and produce the wrong result.',
          'Blocks stay exactly where you put them.'
        ],
        xp: 10
      },
      {
        id: 'q5',
        type: 'choice',
        prompt: 'What is a test case?',
        choices: [
          'A specific input chosen to check how a program behaves',
          'A protective container for a computer',
          'A comment describing what a program does',
          'A record of how long a program took to write'
        ],
        answer: 0,
        explanation: 'Real programmers choose test cases deliberately, including unusual ones, rather than trying whatever comes to mind.',
        choiceFeedback: [
          null,
          '"Case" here means an example to test, not a physical case.',
          'A comment documents intent. A test case checks behavior.',
          'Development time is a project statistic, not a test.'
        ],
        xp: 10
      },
      {
        id: 'q6',
        type: 'choice',
        prompt: 'Why test a program with several different inputs instead of just one?',
        choices: [
          'A program that works for 5 might break entirely for 0 or a negative number',
          'Running it more times makes it faster',
          'One input is never enough to make a program run',
          'Each input permanently changes the program'
        ],
        answer: 0,
        explanation: 'One passing test proves the program works for one value. It says nothing about the values you did not try.',
        choiceFeedback: [
          null,
          'Repetition does not affect speed.',
          'A program runs fine on one input. The question is whether it is CORRECT on all of them.',
          'Running a program with an input does not modify the program.'
        ],
        xp: 10
      },
      {
        id: 'q7',
        type: 'choice',
        prompt: 'A program checks "if number > 10." Which three inputs should be tested?',
        choices: [
          'A number above 10, a number below 10, and exactly 10',
          'Only 11, since that is just above the boundary',
          'Three numbers all above 10',
          'Only very large numbers'
        ],
        answer: 0,
        explanation: 'Exactly 10 is the case most likely to be wrong, because "greater than" and "greater than or equal to" behave identically everywhere else.',
        choiceFeedback: [
          null,
          'One input on one side of the boundary leaves both the other side and the boundary itself unchecked.',
          'Three values on the same side all exercise the same branch.',
          'Large numbers all behave the same way. The interesting behavior is at the boundary.'
        ],
        xp: 10
      },
      {
        id: 'q8',
        type: 'choice',
        prompt: 'What is an edge case?',
        choices: [
          'An unusual or boundary input where a program is most likely to behave incorrectly',
          'The first input a programmer happens to try',
          'An error message displayed at the edge of the screen',
          'The last block in a program'
        ],
        answer: 0,
        explanation: 'Zero, negative numbers, empty lists, and exact boundary values are the classic edge cases — ordinary inputs rarely expose a bug.',
        choiceFeedback: [
          null,
          'The first input tried is usually a typical case, not an edge case.',
          'Edge here means the boundary of valid input, not a screen position.',
          'Position in the program is unrelated.'
        ],
        xp: 10
      },
      {
        id: 'q9',
        type: 'choice',
        prompt: 'A program calculating fuel remaining works for every positive value tested. Which untested input is most likely to reveal a bug?',
        choices: [
          'Zero, or a negative value',
          'A slightly larger positive number',
          'The same value entered twice',
          'A value in the middle of the tested range'
        ],
        answer: 0,
        explanation: 'Zero and negatives are exactly the boundary and out-of-range cases positive testing never touches — and "fuel below zero" is a real condition a flight program must handle.',
        choiceFeedback: [
          null,
          'Another positive number exercises the same path already shown to work.',
          'Repeating a passing input gives the same passing result.',
          'A middle value is surrounded by tested values and is the least likely to surprise you.'
        ],
        xp: 10
      },
      {
        id: 'q10',
        type: 'choice',
        prompt: 'How do debugging and test cases work together?',
        choices: [
          'Test cases reveal that something is wrong; debugging finds where',
          'They are two names for the same activity',
          'Debugging comes first, and test cases confirm the program is finished',
          'Test cases replace the need to debug'
        ],
        answer: 0,
        explanation: 'Testing detects; debugging diagnoses. A program with no tests can be broken without anyone noticing there is anything to debug.',
        choiceFeedback: [
          null,
          'They are distinct: one finds problems, the other locates their cause.',
          'You cannot debug a problem nobody has detected yet.',
          'Tests reveal failures but never explain where in the code the fault lies.'
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'tech7-html-2',
    subject: 'technology',
    tier: 1,
    quarter: 'Q2 2026-2027',
    sequenceInQuarter: 5,
    title: 'HTML II: Lists, Tables & Divs',
    theme: 'Structuring content beyond headings, links, and images',
    novaIntro: {
      glossary: {
        'unordered list': 'A bulleted list in HTML, created with the <ul> tag, containing <li> (list item) tags.',
        'ordered list': 'A numbered list in HTML, created with the <ol> tag.',
        div: 'An HTML tag used to group and organize a section of content on a page, with no visual style of its own.'
      },
      beats: [
        {
          label: 'Lists and Tables',
          diagramId: 'html-nesting-structure',
          hook: 'A recipe\'s ingredient list and a school\'s class schedule need two completely different HTML structures.',
          teachingText: 'An unordered list (<ul>) creates a bulleted list, while an ordered list (<ol>) creates a numbered one — both contain individual <li> (list item) tags for each entry. A <table> tag builds a grid of rows and columns, useful for structured data like a class schedule, using <tr> (table row) and <td> (table data/cell) tags inside it. Choose the tag by what the content IS, not by how you want it to look. A table is right for genuinely two-dimensional data with rows and columns; using one just to line text up neatly is a well-known bad practice, because positioning is CSS work and a table wrongly tells screen readers the content is a data grid.',
          example: '<ul><li>Milk</li><li>Eggs</li></ul> displays as a bulleted list: • Milk • Eggs — while the same content in <ol> would show 1. Milk 2. Eggs instead.',
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'A recipe page needs to show cooking steps that MUST be done in a specific numbered order. Which list tag fits best?',
            choices: [
              '<ol>, the ordered list, since sequence and numbering matter here',
              '<ul>, the unordered list, since bullets are always better',
              '<table>, since any list can be a table instead',
              '<div>, since divs can replace any other tag'
            ],
            answer: 0,
            explanation: 'Ordered lists (<ol>) are specifically for content where sequence matters and numbering communicates that order — exactly the case for numbered cooking steps.',
            choiceFeedback: [
              null,
              'Bullets (<ul>) do not communicate sequence or order — for numbered, sequential steps, <ol> is the more meaningful choice.',
              'A table is built for grid/row-column data, not a simple sequential list — <ol> is the more natural, meaningful fit here.',
              'A <div> has no built-in list formatting at all — it would require significant extra work to fake what <ol> already does automatically.'
            ],
            xp: 10
          },
          practiceGeneratorId: 'gen-tech-html-lists-tables',
          practiceCount: 4
        },
        {
          label: 'Divs: Organizing Without Styling',
          hook: 'This single tag has no visual style of its own — and that\'s exactly what makes it so useful.',
          teachingText: 'A <div> tag groups and organizes a section of content on a page — like a header, a sidebar, or a footer — with no visual style of its own by default. Divs become powerful when combined with CSS, since a CSS selector can target a specific div and style everything inside it as one visual section.',
          example: '<div id="sidebar"> wraps a whole group of links and content as one labeled section, which CSS can later style all at once using #sidebar { }.',
          practiceGeneratorId: 'gen-tech-html-divs',
          practiceCount: 3
        }
      ],
      connection: 'Lists, tables, and divs are the structural building blocks behind nearly every real website\'s layout — the same tags scale from a simple recipe page to a massive news site.',
      videoUrl: 'https://www.youtube.com/watch?v=mD8eFFz2g8o'
    },
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'Which tag creates a bulleted list?',
        choices: ['<ul>', '<ol>', '<li>', '<table>'],
        answer: 0,
        explanation: '<ul> is an unordered list — unordered meaning bulleted rather than numbered.',
        choiceFeedback: [
          null,
          '<ol> is an ORDERED list, which displays numbers.',
          '<li> marks each individual item, but it must sit inside a <ul> or <ol>.',
          '<table> builds a grid of rows and columns, not a list.'
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'What does <li> stand for and do?',
        choices: [
          'List item — it marks each individual entry inside a list',
          'Line indent — it shifts text to the right',
          'Link — it creates a hyperlink',
          'Large image — it displays a picture'
        ],
        answer: 0,
        explanation: 'Both <ul> and <ol> hold <li> tags; the list type decides whether each item shows a bullet or a number.',
        choiceFeedback: [
          null,
          'Indentation is styling, which is CSS\'s job, not a tag\'s meaning.',
          'Links use the anchor tag <a>.',
          'Images use <img>.'
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'How would <ul><li>Milk</li><li>Eggs</li></ul> display?',
        choices: [
          'As a bulleted list: • Milk • Eggs',
          'As a numbered list: 1. Milk 2. Eggs',
          'As one line reading "Milk Eggs"',
          'As a two-column table'
        ],
        answer: 0,
        explanation: 'Same content inside <ol> would number the items instead. The list tag is what decides.',
        choiceFeedback: [
          null,
          'Numbers come from <ol>. This is <ul>, which bullets.',
          'The <li> tags put each item on its own line.',
          'Tables require <table>, <tr>, and <td>.'
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'Which tags build a table row and a single cell?',
        choices: ['<tr> for the row, <td> for the cell', '<td> for the row, <tr> for the cell', '<table> for both', '<li> for both'],
        answer: 0,
        explanation: '<tr> is table row and <td> is table data — the cells live inside the rows.',
        choiceFeedback: [
          null,
          'Reversed. TR is table Row; TD is table Data, meaning one cell.',
          '<table> wraps the whole grid but does not create individual rows or cells.',
          '<li> belongs to lists, not tables.'
        ],
        xp: 10
      },
      {
        id: 'q5',
        type: 'choice',
        prompt: 'When is a <table> the right choice rather than a list?',
        choices: [
          'For structured data with rows AND columns, like a class schedule',
          'Whenever you want text to line up neatly on the page',
          'For any content longer than three items',
          'Whenever a page needs a border'
        ],
        answer: 0,
        explanation: 'Tables are for genuinely two-dimensional data. Using one just to position things is a layout job that belongs to CSS.',
        choiceFeedback: [
          null,
          'Using tables purely for visual alignment is a well-known bad practice — that is CSS work.',
          'Length does not decide it. A twenty-item shopping list is still a list.',
          'Borders are a CSS property and can be applied to any element.'
        ],
        xp: 10
      },
      {
        id: 'q6',
        type: 'choice',
        prompt: 'What does a <div> tag do?',
        choices: [
          'Groups and organizes a section of content, with no visual style of its own by default',
          'Divides the page into two equal halves automatically',
          'Draws a dividing line across the page',
          'Splits text into separate paragraphs'
        ],
        answer: 0,
        explanation: 'A div is a container. On its own it changes nothing visually — it exists so CSS and JavaScript have something to target.',
        choiceFeedback: [
          null,
          'It creates no automatic layout. Any columns come from CSS.',
          'A horizontal rule is <hr>. A div draws nothing.',
          'Paragraphs are <p>. A div groups larger sections.'
        ],
        xp: 10
      },
      {
        id: 'q7',
        type: 'choice',
        prompt: 'Why is a div useful if it has no visual style of its own?',
        choices: [
          'CSS can target it and style everything inside it as one section',
          'It makes the page load faster',
          'It automatically centers its contents',
          'It prevents the content inside from being edited'
        ],
        answer: 0,
        explanation: 'The div is the handle. <div id="sidebar"> lets #sidebar { } style that entire block at once.',
        choiceFeedback: [
          null,
          'Adding elements does not speed up loading.',
          'Centering requires a CSS rule. A div does nothing on its own.',
          'HTML tags do not lock content.'
        ],
        xp: 10
      },
      {
        id: 'q8',
        type: 'choice',
        prompt: 'What does <div id="sidebar"> allow a CSS author to do?',
        choices: [
          'Style that entire labeled section at once using #sidebar { }',
          'Automatically move the content to the right side of the page',
          'Turn the content into a list',
          'Hide the content from search engines'
        ],
        answer: 0,
        explanation: 'The id gives the section a name. Where it actually appears on screen is entirely up to the CSS.',
        choiceFeedback: [
          null,
          'The name "sidebar" is descriptive only — HTML does not position it. CSS does.',
          'List structure requires <ul> or <ol>.',
          'Search engines read div content normally.'
        ],
        xp: 10
      },
      {
        id: 'q9',
        type: 'choice',
        prompt: 'What idea connects <ul>, <table>, and <div>?',
        choices: [
          'Each marks what a piece of content IS structurally, leaving appearance to CSS',
          'Each applies a specific visual style automatically',
          'Each can only be used once per page',
          'Each requires JavaScript to work'
        ],
        answer: 0,
        explanation: 'This is the separation of structure from style, extended past headings and paragraphs into lists, data, and sections.',
        choiceFeedback: [
          null,
          'Browsers supply small default styles, but appearance is CSS\'s responsibility.',
          'All three can be used as many times as a page needs.',
          'All three are plain HTML and work with no JavaScript at all.'
        ],
        xp: 10
      },
      {
        id: 'q10',
        type: 'choice',
        prompt: 'A page must show a launch schedule with dates, times, and mission names, plus a grouped sidebar of related links. Which tags fit?',
        choices: [
          'A <table> for the schedule and a <div> to group the sidebar links',
          'A <div> for the schedule and a <table> for the links',
          '<ul> for both',
          '<p> tags for everything'
        ],
        answer: 0,
        explanation: 'Three related fields per launch is genuinely two-dimensional data — a table. A set of links that belong together is a section — a div.',
        choiceFeedback: [
          null,
          'Reversed. A div gives the schedule no row-and-column structure, and a table is overkill for a simple link group.',
          'A list cannot express three related columns per launch.',
          'Paragraphs carry no structure at all — the dates, times, and names would run together with nothing marking their relationship.'
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'tech7-css-2',
    subject: 'technology',
    tier: 1,
    quarter: 'Q2 2026-2027',
    sequenceInQuarter: 6,
    title: 'CSS II: Selectors & the Box Model',
    theme: 'Targeting elements and understanding element sizing',
    novaIntro: {
      glossary: {
        'class selector': 'A CSS selector starting with a period (.), targeting all elements with a matching class attribute.',
        'id selector': 'A CSS selector starting with a hash (#), targeting the one element with a matching id attribute.',
        'box model': 'How margin, border, padding, and content combine to determine an HTML element\'s total size.'
      },
      beats: [
        {
          label: 'Class vs. ID Selectors',
          hook: 'One symbol is a period, one is a hashtag — and mixing them up is one of the most common CSS beginner mistakes.',
          teachingText: 'A class selector, written with a period (.highlight), targets EVERY element with that class — useful for styling many elements the same way. An id selector, written with a hash (#header), targets exactly ONE element with that id, since ids must be unique on a page. Classes are for reusable styles; ids are for one specific, unique element.',
          example: 'If three different paragraphs all have class="highlight", the CSS rule .highlight { color: yellow; } styles all three at once — but #header { } would only ever style the single element with id="header".',
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'A webpage has five different <p> tags that should all turn green, plus one unique logo element that should turn gold. What selector setup fits best?',
            choices: [
              'A class selector (like .highlight) for the five paragraphs, and an id selector (like #logo) for the unique element',
              'Id selectors for all six elements',
              'Class selectors for all six elements',
              'This requires six separate CSS files'
            ],
            answer: 0,
            explanation: 'Classes are ideal for styling multiple elements the same way; ids are ideal for one specific, unique element — this matches exactly that pattern.',
            choiceFeedback: [
              null,
              'Ids must be unique per page — using an id selector for all five shared paragraphs would violate that (or require five different ids, defeating the point of shared styling).',
              'A class selector would work for the unique logo too, but an id is the more precise, standard tool for a single one-of-a-kind element.',
              'A single CSS file can absolutely hold styles for many different selectors — six files is unnecessary.'
            ],
            xp: 10
          },
          practiceGeneratorId: 'gen-tech-css-selectors',
          practiceCount: 4
        },
        {
          label: 'The Box Model',
          diagramId: 'css-box-model',
          hook: 'Every single HTML element on every webpage is secretly a rectangular box — even round buttons.',
          teachingText: 'The CSS box model describes how margin (space OUTSIDE the border), border (the edge line itself), padding (space INSIDE the border, around the content), and content combine to determine an element\'s total visible size. Padding specifically is the space between an element\'s actual content and its border — increasing padding pushes the border outward without changing the content itself. Margin and padding are the pair most often confused, and the difference is worth fixing in memory: padding pushes the border away from the CONTENT, while margin pushes OTHER ELEMENTS away from the border. Increasing padding therefore makes the element itself bigger; increasing margin does not.',
          example: 'A button with 10px of padding has 10 pixels of empty space between its text and its visible edge, making the button feel less cramped without changing the text size.',
          practiceGeneratorId: 'gen-tech-css-box-model',
          practiceCount: 3
        }
      ],
      connection: 'Selectors and the box model are the two ideas that unlock REAL control over a webpage\'s layout — nearly every CSS bug a beginner hits traces back to misunderstanding one of these two things.',
      videoUrl: 'https://www.youtube.com/watch?v=L9khsrjMwKw'
    },
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'How is a class selector written, and what does it target?',
        choices: [
          'With a period, like .highlight — it targets every element carrying that class',
          'With a hash, like #highlight — it targets one element',
          'With no symbol, like highlight — it targets a tag',
          'With a colon, like :highlight — it targets a state'
        ],
        answer: 0,
        explanation: 'Classes are for reusable styles applied to as many elements as you like.',
        choiceFeedback: [
          null,
          'A hash marks an ID selector, which targets exactly one unique element.',
          'A bare name selects a TAG type, like p or h1.',
          'A colon introduces a pseudo-class like :hover, which is a state, not a class name.'
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'How is an id selector written, and how many elements should carry that id?',
        choices: [
          'With a hash, like #header — exactly one, since ids must be unique on a page',
          'With a period, like .header — as many as you like',
          'With a hash, but any number of elements may share it',
          'With no symbol, and it applies to every tag of that name'
        ],
        answer: 0,
        explanation: 'Uniqueness is the rule that separates ids from classes: ids name one specific element.',
        choiceFeedback: [
          null,
          'A period marks a CLASS. Ids use a hash.',
          'The hash is right, but ids are specifically meant to be unique.',
          'A bare name is a tag selector, which is a third, different thing.'
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'Three paragraphs all have class="highlight". What does .highlight { color: yellow; } do?',
        choices: ['Styles all three', 'Styles only the first', 'Styles only the last', 'Styles none, since classes need a hash'],
        answer: 0,
        explanation: 'A class selector applies to every element carrying that class — which is the entire reason classes exist.',
        choiceFeedback: [
          null,
          'Classes do not stop at the first match.',
          'Order does not limit a class selector.',
          'A period is correct for a class. A hash would make it an id selector.'
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'When should you reach for a class instead of an id?',
        choices: [
          'When the same style should apply to many elements',
          'When exactly one element needs the style',
          'When the element is a heading',
          'When the style involves color'
        ],
        answer: 0,
        explanation: 'Classes are for reusable styles; ids are for one specific, unique element.',
        choiceFeedback: [
          null,
          'One unique element is exactly the id case.',
          'Tag type does not decide between class and id.',
          'The property being set has nothing to do with the choice.'
        ],
        xp: 10
      },
      {
        id: 'q5',
        type: 'choice',
        prompt: 'What four parts make up the CSS box model?',
        choices: [
          'Content, padding, border, and margin',
          'Content, color, border, and font',
          'Header, body, footer, and sidebar',
          'Width, height, depth, and weight'
        ],
        answer: 0,
        explanation: 'Working outward: the content itself, padding around it, the border, then margin outside that.',
        choiceFeedback: [
          null,
          'Color and font are properties of the content, not layers of the box.',
          'Those are page sections, not the parts of a single element\'s box.',
          'Web pages are two-dimensional, and weight is not a box-model layer.'
        ],
        xp: 10
      },
      {
        id: 'q6',
        type: 'choice',
        prompt: 'What is padding?',
        choices: [
          'The space INSIDE the border, between the content and the border',
          'The space OUTSIDE the border, separating elements',
          'The thickness of the border line',
          'The total width of the element'
        ],
        answer: 0,
        explanation: 'Padding is inside; margin is outside. Confusing the two is the most common box-model mistake.',
        choiceFeedback: [
          null,
          'Space outside the border is MARGIN.',
          'The line itself is the border.',
          'Total width comes from all four layers combined.'
        ],
        xp: 10
      },
      {
        id: 'q7',
        type: 'choice',
        prompt: 'What is the difference between margin and padding?',
        choices: [
          'Margin is outside the border; padding is inside it',
          'Margin is inside the border; padding is outside it',
          'They are two names for the same space',
          'Margin applies to text and padding applies to images'
        ],
        answer: 0,
        explanation: 'Padding pushes the border away from the content; margin pushes other elements away from the border.',
        choiceFeedback: [
          null,
          'Reversed — a very common mix-up worth committing to memory.',
          'They are genuinely different layers with different effects.',
          'Both apply to any element regardless of what it contains.'
        ],
        xp: 10
      },
      {
        id: 'q8',
        type: 'choice',
        prompt: 'A button has 10px of padding. What does that produce?',
        choices: [
          '10 pixels of empty space between the button text and its visible edge',
          '10 pixels of space between the button and the elements around it',
          'A border 10 pixels thick',
          'Text rendered 10 pixels larger'
        ],
        answer: 0,
        explanation: 'Padding makes the button feel less cramped without changing the text size at all.',
        choiceFeedback: [
          null,
          'Space between the button and its neighbours is margin.',
          'Border thickness is set by the border property.',
          'Text size comes from font-size.'
        ],
        xp: 10
      },
      {
        id: 'q9',
        type: 'choice',
        prompt: 'Increasing an element\'s padding does what to its total visible size?',
        choices: [
          'Pushes the border outward, making the element larger overall',
          'Leaves the total size unchanged',
          'Shrinks the element',
          'Changes only the text, not the box'
        ],
        answer: 0,
        explanation: 'Padding is a real layer of the box, so adding it adds to the total the element occupies.',
        choiceFeedback: [
          null,
          'The content stays the same size, but the box around it grows.',
          'Adding space cannot make the element smaller.',
          'The text is untouched; the box around it is what changes.'
        ],
        xp: 10
      },
      {
        id: 'q10',
        type: 'choice',
        prompt: 'A page needs one uniquely styled banner at the top and a warning style used on six different paragraphs. Which selectors fit?',
        choices: [
          'An id for the banner, and a class for the six warnings',
          'A class for the banner, and an id for the warnings',
          'Ids for both',
          'Tag selectors for both'
        ],
        answer: 0,
        explanation: 'One unique element takes an id; a style reused across six elements takes a class. That is the rule in one sentence.',
        choiceFeedback: [
          null,
          'Reversed: an id cannot be reused across six paragraphs, since ids must be unique.',
          'Six elements cannot share one id.',
          'Tag selectors would hit EVERY paragraph on the page, not just the six warnings.'
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'tech7-artificial-intelligence-2',
    subject: 'technology',
    tier: 1,
    quarter: 'Q2 2026-2027',
    sequenceInQuarter: 7,
    title: 'AI II: Neural Networks & Training Data',
    theme: 'How AI models learn, and what can go wrong',
    novaIntro: {
      glossary: {
        'neural network': 'A system of connected nodes loosely inspired by how neurons in the brain process information.',
        overfitting: 'When an AI model performs very well on its training data but poorly on new, unseen data.',
        'test set': 'A separate set of data an AI model never trains on, used to check its performance in an unbiased way.'
      },
      beats: [
        {
          label: 'What Is a Neural Network?',
          hook: 'The AI behind photo recognition, translation apps, and chatbots often shares the exact same basic structure.',
          teachingText: 'A neural network is a system of connected nodes (\'neurons\'), loosely inspired by how biological neurons process information, organized into layers. Data enters through an input layer, passes through one or more hidden layers doing calculations, and produces a result at an output layer. During training, the connections between nodes adjust repeatedly until the network\'s predictions get closer to being correct.',
          example: 'A neural network trained to recognize handwritten digits takes a pixelated image as input, processes it through hidden layers, and outputs its best guess at which digit (0-9) it sees.',
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'What best describes how a neural network is structured?',
            choices: [
              'Connected layers of nodes, loosely inspired by neurons in the brain, that process data step by step',
              'A single unchanging rule written once by a programmer',
              'A physical network of cables connecting different computers',
              'A type of computer virus that mimics brain activity'
            ],
            answer: 0,
            explanation: 'A neural network is specifically layers of connected nodes, inspired by biological neurons, processing data through the network to produce an output.',
            choiceFeedback: [
              null,
              'This describes traditional, hand-coded rule-based programming — a neural network instead LEARNS its own internal adjustments from data.',
              'This confuses a neural network (a software/mathematical structure) with physical computer networking hardware — they\'re unrelated concepts.',
              'A neural network is a legitimate AI structure, not any kind of malicious software.'
            ],
            xp: 10
          },
          practiceGeneratorId: 'gen-tech-neural-networks',
          practiceCount: 4
        },
        {
          label: 'Overfitting and Test Sets',
          hook: 'An AI model can ace every practice problem it\'s ever seen — and still fail completely on a brand-new one.',
          teachingText: 'Overfitting happens when a model performs very well on its training data but poorly on new, unseen data — essentially memorizing specific examples instead of learning generalizable patterns. To catch this, researchers hold back a separate test set the model NEVER trains on, providing an unbiased check of how well it actually performs on data it hasn\'t memorized. Overfitting and the training-data bias problem from the previous lesson are the same failure wearing different clothes: in both, a model reflects the narrow slice of the world it was shown rather than the world it will actually be used in. That is why a 99% score measured on training data is close to meaningless.',
          example: 'A model trained (and tested) on the SAME 1,000 photos might score 99% — but if it only memorized those exact photos rather than learning real patterns, it could score much worse on a genuinely new, held-out test set.',
          practiceGeneratorId: 'gen-tech-ai-overfitting',
          practiceCount: 3
        }
      ],
      connection: 'Neural networks and rigorous testing with held-out data are exactly what separate a genuinely useful AI system from one that only LOOKS good on the examples its creators happened to show it.',
      videoUrl: 'https://www.youtube.com/watch?v=fa1vQqUGynI'
    },
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What is a neural network?',
        choices: [
          'A system of connected nodes organized into layers, loosely inspired by biological neurons',
          'A network of computers wired together in a building',
          'A brain scan used to study how people learn',
          'A type of internet connection'
        ],
        answer: 0,
        explanation: '"Loosely inspired" is the key phrase — the layered node structure borrows an idea from biology without copying how a brain works.',
        choiceFeedback: [
          null,
          'That is a computer network, a completely different meaning of the word.',
          'Neural networks are software, not medical imaging.',
          'It has nothing to do with connectivity or bandwidth.'
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'What are the three kinds of layer in a neural network, in order?',
        choices: [
          'Input layer, hidden layer(s), output layer',
          'Output layer, hidden layer(s), input layer',
          'First layer, second layer, third layer',
          'Training layer, testing layer, result layer'
        ],
        answer: 0,
        explanation: 'Data enters at the input layer, is processed through one or more hidden layers, and a result emerges at the output layer.',
        choiceFeedback: [
          null,
          'Reversed — data enters at the input and leaves at the output.',
          'Networks can have many layers; the names describe roles, not just positions.',
          'Training and testing are phases of the process, not layers of the network.'
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'What actually changes inside a neural network during training?',
        choices: [
          'The connections between nodes adjust repeatedly until predictions get closer to correct',
          'New nodes are physically manufactured',
          'The input data is rewritten to match the answers',
          'Nothing changes — the network is fixed when it is built'
        ],
        answer: 0,
        explanation: 'Learning IS the adjustment of those connections. Nothing else about the structure has to change.',
        choiceFeedback: [
          null,
          'It is software. Nothing is physically built.',
          'Changing the data to fit the answers would defeat the entire purpose.',
          'If nothing changed, the network could never learn anything.'
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'A neural network trained on handwritten digits takes a pixelated image as input. What comes out of the output layer?',
        choices: [
          'Its best guess at which digit, 0 through 9, the image shows',
          'A cleaned-up version of the image',
          'The name of the person who wrote the digit',
          'The exact image it was given, unchanged'
        ],
        answer: 0,
        explanation: 'The output layer produces the network\'s answer to the question it was trained on — here, which digit it sees.',
        choiceFeedback: [
          null,
          'Image cleanup is a different task. This network classifies.',
          'It was trained to recognize digits, not identities.',
          'A network that returned its input unchanged would have learned nothing.'
        ],
        xp: 10
      },
      {
        id: 'q5',
        type: 'choice',
        prompt: 'What is overfitting?',
        choices: [
          'A model performs very well on its training data but poorly on new, unseen data',
          'A model that takes too long to train',
          'A model with too many layers to run',
          'A model that performs equally well on all data'
        ],
        answer: 0,
        explanation: 'An overfitted model has essentially memorized specific examples instead of learning patterns that generalize.',
        choiceFeedback: [
          null,
          'Long training time is a cost problem, not overfitting.',
          'Size can contribute to overfitting, but the term names the RESULT, not the structure.',
          'Performing equally well everywhere is the goal — the opposite of overfitting.'
        ],
        xp: 10
      },
      {
        id: 'q6',
        type: 'choice',
        prompt: 'What is a test set?',
        choices: [
          'Data held back that the model NEVER trains on, used as an unbiased check',
          'The first batch of data a model sees',
          'A collection of questions the model writes itself',
          'The hardware used to run the model'
        ],
        answer: 0,
        explanation: 'The value comes entirely from the model never having seen it — that is what makes the check honest.',
        choiceFeedback: [
          null,
          'The data a model learns from is the TRAINING set.',
          'The test set is prepared by researchers, not generated by the model.',
          'Hardware is unrelated to how performance is measured.'
        ],
        xp: 10
      },
      {
        id: 'q7',
        type: 'choice',
        prompt: 'A model is trained AND tested on the same 1,000 photos and scores 99%. Why is that score untrustworthy?',
        choices: [
          'It may have memorized those exact photos rather than learned real patterns',
          'A score above 95% is always a calculation error',
          '1,000 photos is too many to test on',
          'Photos cannot be used to measure accuracy'
        ],
        answer: 0,
        explanation: 'Testing on training data measures memory, not learning. The same model could score far worse on genuinely new photos.',
        choiceFeedback: [
          null,
          'High scores are achievable. The problem here is how the score was obtained.',
          '1,000 is a modest data set. The issue is overlap between training and testing, not size.',
          'Image data sets are among the most common ways model accuracy is measured.'
        ],
        xp: 10
      },
      {
        id: 'q8',
        type: 'choice',
        prompt: 'How does a held-out test set actually catch overfitting?',
        choices: [
          'A model that memorized rather than generalized scores much worse on data it has never seen',
          'It makes the model train faster',
          'It automatically corrects the model\'s mistakes',
          'It increases the amount of training data'
        ],
        answer: 0,
        explanation: 'The gap between training accuracy and test accuracy is the measurement — a big gap is the signature of overfitting.',
        choiceFeedback: [
          null,
          'Holding data back slightly reduces training data; it does not speed training up.',
          'It reveals a problem. Fixing it requires deliberate changes by the researchers.',
          'It does the opposite: some data is set aside rather than used for training.'
        ],
        xp: 10
      },
      {
        id: 'q9',
        type: 'choice',
        prompt: 'How does overfitting relate to the training-data bias problem from AI I?',
        choices: [
          'Both are failures of generalization — the model reflects its training data rather than the wider world',
          'They are unrelated problems with unrelated causes',
          'Overfitting only affects biased models',
          'Bias is a hardware issue and overfitting is a software issue'
        ],
        answer: 0,
        explanation: 'Narrow data produces narrow reliability, whether the narrowness is which photos were used or which people were represented.',
        choiceFeedback: [
          null,
          'Both trace back to the same root: what the model was shown is all it knows.',
          'Overfitting can happen with perfectly representative data too.',
          'Both are properties of how a model was trained, not of the machine it runs on.'
        ],
        xp: 10
      },
      {
        id: 'q10',
        type: 'choice',
        prompt: 'An AI is trained to spot cracks in aircraft parts using photos from one factory, and scores 99% on those same photos. What should an engineer insist on before trusting it?',
        choices: [
          'A test on held-out photos from other factories, parts, and lighting conditions',
          'Retraining on the same photos until it scores 100%',
          'Adding more hidden layers to the network',
          'Nothing — 99% is high enough to deploy'
        ],
        answer: 0,
        explanation: 'A score measured on the training data says almost nothing about real inspection performance, and the consequence of a missed crack in aerospace is severe.',
        choiceFeedback: [
          null,
          'Pushing training accuracy toward 100% typically makes overfitting WORSE, not better.',
          'More layers can increase capacity to memorize. It does not verify generalization.',
          'The 99% was measured on data it had already seen, which is exactly the untrustworthy case.'
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'tech7-cad-2',
    relatedProjectId: 'tech7-tinkercad-parametric-shelf',
    subject: 'technology',
    tier: 1,
    quarter: 'Q2 2026-2027',
    sequenceInQuarter: 8,
    title: 'CAD II: Parametric Design & Collaboration',
    theme: 'Linked dimensions, constraints, layers, and cloud-based CAD',
    novaIntro: {
      glossary: {
        'parametric design': 'A CAD approach where a model\'s dimensions are linked by rules, so changing one measurement automatically adjusts connected parts.',
        constraint: 'A CAD tool that maintains a specific relationship in a design (like two lines always staying parallel) even as other parts change.'
      },
      beats: [
        {
          label: 'Parametric Design',
          hook: 'Change one number in a parametric CAD model, and dozens of connected measurements update themselves instantly.',
          teachingText: 'In parametric design, a model\'s dimensions are linked by rules rather than fixed independently — so changing one measurement (like a table\'s width) automatically adjusts every connected part (like leg spacing) to match, instead of requiring the designer to manually re-adjust each one. Constraint tools help maintain specific relationships, such as forcing two lines to always stay parallel no matter how the rest of the design changes. The real protection is against a partial edit. Adjusting parts by hand works until one related feature gets missed, leaving a model whose pieces quietly disagree — and on flight hardware, the dimension nobody remembered to update is exactly the kind of error that reaches the machine shop.',
          example: 'In a parametric model of a bookshelf, widening the shelf by 2 inches automatically stretches every connected board and bracket to fit — the designer doesn\'t have to manually resize each piece.',
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'An engineer changes a single \'wheel diameter\' measurement in a parametric CAD model of a car, and 12 other connected parts automatically resize to match. What CAD concept explains this?',
            choices: [
              'Parametric design, where dimensions are linked by rules so one change propagates automatically',
              'This is impossible in any real CAD software',
              'The software has a bug and this should never happen',
              'Coincidence — the 12 parts changing is unrelated to the wheel diameter edit'
            ],
            answer: 0,
            explanation: 'This is the core benefit of parametric design — dimensions are linked so one change ripples through every connected, related measurement automatically.',
            choiceFeedback: [
              null,
              'This is a standard, well-documented, intentional feature of real parametric CAD software, not an impossibility.',
              'This is the CORRECT, intended behavior of parametric design — not a bug at all.',
              'This is a deliberate, engineered result of parametric linking — it\'s directly caused by the diameter edit, not a coincidence.'
            ],
            xp: 10
          },
          practiceGeneratorId: 'gen-tech-cad-parametric',
          practiceCount: 4
        },
        {
          label: 'Layers and Cloud Collaboration',
          hook: 'A complex CAD model with hundreds of parts would be nearly unreadable without a way to organize it.',
          teachingText: 'CAD layers let a designer organize and separately manage different components of a complex design — for example, viewing only the electrical wiring layer of a building without the plumbing layer cluttering the view. Cloud-based CAD software, similar in spirit to Google Workspace, allows real-time collaboration among team members working on the same design from different locations at once.',
          example: 'An architect toggles off the \'furniture\' layer in a building\'s CAD model to focus only on the structural walls, without deleting any of the furniture data.',
          practiceGeneratorId: 'gen-tech-cad-layers-collaboration',
          practiceCount: 3
        }
      ],
      connection: 'Parametric design and cloud collaboration are exactly how modern engineering teams design complex real products — like cars or airplanes — with hundreds of interconnected parts and people.',
      videoUrl: 'https://www.youtube.com/watch?v=WFSltgXz85A'
    },
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What is parametric design?',
        choices: [
          'A model whose dimensions are linked by rules, so changing one automatically adjusts the connected parts',
          'A model built entirely from measured photographs',
          'A design with no measurements at all',
          'A design that can only be viewed in 2D'
        ],
        answer: 0,
        explanation: 'Relationships, not fixed independent numbers, are what make a parametric model update itself.',
        choiceFeedback: [
          null,
          'Building from photographs is photogrammetry, a different technique.',
          'Parametric models are highly dimensioned — the dimensions are just linked rather than independent.',
          'Parametric CAD is fully three-dimensional.'
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'In a parametric bookshelf model, widening the shelf by 2 inches does what?',
        choices: [
          'Automatically stretches every connected board and bracket to fit',
          'Widens only the one board that was changed',
          'Breaks the model and requires starting over',
          'Changes nothing until the file is reopened'
        ],
        answer: 0,
        explanation: 'One change propagating correctly through the whole model is the entire payoff of building it parametrically.',
        choiceFeedback: [
          null,
          'Changing one part in isolation is what happens WITHOUT parametric relationships.',
          'A well-built parametric model handles this routinely.',
          'The update is immediate.'
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'What does a constraint tool do?',
        choices: [
          'Maintains a specific relationship, such as forcing two lines to stay parallel',
          'Locks the model so it cannot be edited',
          'Limits how many parts a design may contain',
          'Restricts who can open the file'
        ],
        answer: 0,
        explanation: 'A constraint holds a rule true no matter how the rest of the design changes.',
        choiceFeedback: [
          null,
          'Constraints govern geometric relationships; they do not prevent editing.',
          'There is no part-count limit involved.',
          'File permissions are an entirely separate matter.'
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'What is the real advantage of parametric design over adjusting each part by hand?',
        choices: [
          'A design change takes one edit instead of many, and the parts cannot drift out of agreement',
          'Parametric models render more attractively',
          'Parametric files are always smaller',
          'It removes the need to know any dimensions'
        ],
        answer: 0,
        explanation: 'Manual re-adjustment is slow and, worse, easy to do incompletely — leaving parts that no longer match.',
        choiceFeedback: [
          null,
          'Rendering quality is unrelated to how dimensions are linked.',
          'File size is not the benefit and can go either way.',
          'You still specify dimensions. They are simply related to one another.'
        ],
        xp: 10
      },
      {
        id: 'q5',
        type: 'choice',
        prompt: 'What do CAD layers let a designer do?',
        choices: [
          'Organize and separately manage different components of a complex design',
          'Stack multiple copies of the same part',
          'Increase the model\'s physical thickness',
          'Convert a 3D model into 2D'
        ],
        answer: 0,
        explanation: 'Layers are an organizational tool for complexity — electrical on one, plumbing on another, structure on a third.',
        choiceFeedback: [
          null,
          'Layers organize different components; they are not duplicates.',
          'They are an organizational concept, not a physical property of the model.',
          'Producing a 2D drawing from a 3D model is a separate operation.'
        ],
        xp: 10
      },
      {
        id: 'q6',
        type: 'choice',
        prompt: 'An architect toggles off the "furniture" layer in a building model. What happens to the furniture?',
        choices: [
          'It is hidden from view, but none of the data is deleted',
          'It is permanently deleted from the file',
          'It is moved to a separate file',
          'It is converted into structural walls'
        ],
        answer: 0,
        explanation: 'Layer visibility is a viewing control. Hiding clutter to focus on structure costs you nothing.',
        choiceFeedback: [
          null,
          'Toggling visibility never deletes anything.',
          'The data stays in the same file, simply not displayed.',
          'Toggling a layer does not transform geometry.'
        ],
        xp: 10
      },
      {
        id: 'q7',
        type: 'choice',
        prompt: 'What does cloud-based CAD allow that traditional installed CAD does not?',
        choices: [
          'Real-time collaboration among team members working from different locations',
          'Designing without any measurements',
          'Automatic manufacturing of the part',
          'Working without any internet connection'
        ],
        answer: 0,
        explanation: 'It is the same idea as Google Workspace, applied to engineering models rather than documents.',
        choiceFeedback: [
          null,
          'Measurements are still central to any CAD work.',
          'Manufacturing requires machines and a separate production process.',
          'Cloud CAD generally needs a connection — that is the trade-off for the collaboration.'
        ],
        xp: 10
      },
      {
        id: 'q8',
        type: 'choice',
        prompt: 'Cloud-based CAD is described as "similar in spirit" to which Q1 topic?',
        choices: [
          'Google Workspace and its shared cloud files',
          'Touch typing and WPM',
          'Phishing and password security',
          'Scratch sprites and blocks'
        ],
        answer: 0,
        explanation: 'One shared file living on a server, editable by several people at once, is the same architecture in both cases.',
        choiceFeedback: [
          null,
          'Typing technique is unrelated to where a file is stored.',
          'Security matters for cloud CAD, but it is not the parallel being drawn.',
          'Scratch is a programming environment, not a collaboration model.'
        ],
        xp: 10
      },
      {
        id: 'q9',
        type: 'choice',
        prompt: 'How do parametric design and constraints work together?',
        choices: [
          'Constraints define the relationships that parametric updates then follow automatically',
          'They are two words for the same feature',
          'Constraints must be removed before parameters can update',
          'Parameters apply to 2D and constraints to 3D'
        ],
        answer: 0,
        explanation: 'Without constraints there are no rules to propagate, and a parametric change would have nothing to follow.',
        choiceFeedback: [
          null,
          'They are distinct: one states a rule, the other is the behavior that results.',
          'Removing constraints would break the automatic updating entirely.',
          'Both apply in 2D sketches and 3D models alike.'
        ],
        xp: 10
      },
      {
        id: 'q10',
        type: 'choice',
        prompt: 'A satellite bracket is redesigned and its mounting hole spacing must change by 3 mm. Why does a parametric model matter here?',
        choices: [
          'Every feature tied to that spacing updates together, so no part is left at the old dimension by mistake',
          'It makes the bracket physically lighter',
          'It removes the need to test the bracket',
          'It automatically machines the new bracket'
        ],
        answer: 0,
        explanation: 'On flight hardware the danger is not the edit itself but the one related feature somebody forgets to update. Linked dimensions remove that possibility.',
        choiceFeedback: [
          null,
          'Mass comes from geometry and material, not from how the model was built.',
          'Physical testing is still required regardless.',
          'Manufacturing is a separate step performed by machines.'
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'tech7-3d-modeling-2',
    relatedProjectId: 'tech7-tinkercad-light-and-material',
    subject: 'technology',
    tier: 1,
    quarter: 'Q2 2026-2027',
    sequenceInQuarter: 9,
    title: '3D Modeling II: Textures & Lighting',
    theme: 'Making 3D models look realistic through surface detail and light',
    novaIntro: {
      glossary: {
        texture: 'Color, pattern, or surface detail applied to a 3D model\'s surface to make it look more realistic.',
        'UV mapping': 'The process of unfolding a 3D model\'s surface so a flat texture image can be applied to it correctly.'
      },
      beats: [
        {
          label: 'Textures Add Realism',
          hook: 'A plain gray 3D sphere and a photorealistic basketball can be the EXACT same underlying shape.',
          teachingText: 'A texture adds color, pattern, or surface detail to a model — like wood grain, skin, or brick — making an otherwise plain gray shape look genuinely realistic. Applying a texture correctly requires UV mapping: unfolding the 3D model\'s surface (imagine peeling an orange and flattening the peel) so a flat 2D texture image lines up correctly once wrapped back around the 3D shape.',
          example: 'A 3D model of a basketball uses UV mapping to unfold its round surface into a flat image, so the orange color and black seam pattern (the texture) wrap around correctly without stretching or distorting.',
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'A 3D model\'s brick texture looks stretched and distorted on a curved wall, even though the texture image itself looks fine. What\'s the most likely cause?',
            choices: [
              'The UV mapping (how the surface was unfolded) does not correctly match the curved shape',
              'The model has too many polygons',
              'The color of the bricks is wrong',
              'This is impossible to fix in any 3D software'
            ],
            answer: 0,
            explanation: 'Stretched, distorted textures on an otherwise correct texture image are the classic symptom of a UV mapping problem — the flat image isn\'t unfolding onto the curved surface correctly.',
            choiceFeedback: [
              null,
              'Polygon count affects smoothness of the shape itself, not how a texture image stretches or distorts across the surface.',
              'The problem described is about stretching/distortion, not incorrect coloring — that points to UV mapping, not color choice.',
              'UV mapping issues are a normal, well-understood, and fixable part of 3D texturing workflows.'
            ],
            xp: 10
          },
          practiceGeneratorId: 'gen-tech-3d-textures-uv',
          practiceCount: 4
        },
        {
          label: 'Lighting Changes Everything',
          hook: 'The exact same 3D model can look completely different — even completely unrecognizable — under different lighting.',
          teachingText: 'Lighting significantly affects how shapes, shadows, and materials appear in a rendered 3D scene — the same model can look flat and dull under poor lighting or dramatic and realistic under well-placed lighting. Game and film studios sometimes use lower-detail models for objects far from the camera, since distant objects don\'t need as much visual detail to look convincing, which improves performance without a noticeable visual cost. Geometry and surface are separate layers, and it is worth keeping them straight: polygons decide the SHAPE, textures decide the surface APPEARANCE, and lighting decides how both are seen. A low-polygon model with a beautiful texture still reads as blocky, because no amount of surface detail fixes the underlying form.',
          example: 'The same 3D castle model can look ominous and dramatic lit from below at sunset, or flat and boring lit evenly from directly overhead — the geometry never changed, only the lighting.',
          practiceGeneratorId: 'gen-tech-3d-lighting',
          practiceCount: 3
        }
      ],
      connection: 'Textures and lighting are what separate a technically correct 3D model from one that actually looks believable — the exact skills used in modern films, games, and product visualization.',
      videoUrl: 'https://www.youtube.com/watch?v=3g5YihV-fyA'
    },
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What does a texture add to a 3D model?',
        choices: [
          'Color, pattern, or surface detail — like wood grain, skin, or brick',
          'Additional polygons to smooth the shape',
          'Physical weight to the model',
          'The lighting for the scene'
        ],
        answer: 0,
        explanation: 'A texture is what turns an otherwise plain gray shape into something that reads as a real material.',
        choiceFeedback: [
          null,
          'Adding polygons changes the geometry. A texture changes the SURFACE appearance.',
          'Digital models have no physical weight.',
          'Lighting is set separately and affects how the texture appears.'
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'What is UV mapping?',
        choices: [
          'Unfolding a 3D model\'s surface flat so a 2D texture image lines up correctly when wrapped back on',
          'Adding ultraviolet lighting to a scene',
          'Measuring how much detail a model contains',
          'Converting a 3D model into a 2D drawing'
        ],
        answer: 0,
        explanation: 'The lesson\'s image is exact: imagine peeling an orange and flattening the peel — that flattened shape is what the texture is painted onto.',
        choiceFeedback: [
          null,
          'The letters U and V name the two axes of the flattened texture space; they have nothing to do with ultraviolet light.',
          'Detail is measured in polygon count, not by UV mapping.',
          'Producing a flat drawing is a different operation. UV mapping keeps the model 3D.'
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'Why does a basketball model need UV mapping?',
        choices: [
          'So the orange color and black seam pattern wrap around the round surface without stretching or distorting',
          'So the ball can bounce realistically',
          'So the ball has enough polygons to look round',
          'So the ball can be exported to a 3D printer'
        ],
        answer: 0,
        explanation: 'A flat image applied to a curved surface without proper mapping smears and stretches — UV mapping is what keeps the seams where they belong.',
        choiceFeedback: [
          null,
          'Bouncing is physics simulation, a separate system entirely.',
          'Roundness comes from polygon count, which is geometry rather than texture.',
          'Exporting for printing does not require textures at all — printers build shape, not color.'
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'A texture is applied to a model without proper UV mapping. What is the likely result?',
        choices: [
          'The image stretches or distorts across the surface',
          'The model loses its polygons',
          'The model becomes invisible',
          'The texture applies perfectly anyway'
        ],
        answer: 0,
        explanation: 'Stretching and smearing are the visual signature of a UV problem, and they are why the mapping step exists at all.',
        choiceFeedback: [
          null,
          'Geometry is unaffected by texture problems.',
          'The model still renders; it simply looks wrong.',
          'Software cannot guess how a flat image should wrap around a 3D shape without being told.'
        ],
        xp: 10
      },
      {
        id: 'q5',
        type: 'choice',
        prompt: 'How much does lighting affect a rendered 3D scene?',
        choices: [
          'Significantly — the same model can look flat and dull or dramatic and realistic',
          'Very little, since the geometry determines the appearance',
          'Only for outdoor scenes',
          'Only if textures have not been applied'
        ],
        answer: 0,
        explanation: 'Shapes, shadows, and materials all read differently under different light — with the geometry entirely unchanged.',
        choiceFeedback: [
          null,
          'Geometry is only half of it. Two renders of identical geometry can look completely different.',
          'Interior scenes depend on lighting just as heavily.',
          'Lighting affects textured and untextured models alike.'
        ],
        xp: 10
      },
      {
        id: 'q6',
        type: 'choice',
        prompt: 'The same castle model looks ominous lit from below at sunset, and flat lit evenly from overhead. What changed?',
        choices: [
          'Only the lighting — the geometry was never touched',
          'The polygon count was increased',
          'A different texture was applied',
          'The model was rebuilt'
        ],
        answer: 0,
        explanation: 'This is the cleanest demonstration of why lighting is treated as a discipline of its own in film and games.',
        choiceFeedback: [
          null,
          'Polygon count controls smoothness, not mood.',
          'Textures were unchanged in this example.',
          'The model is identical in both renders.'
        ],
        xp: 10
      },
      {
        id: 'q7',
        type: 'choice',
        prompt: 'Why do studios use lower-detail models for objects far from the camera?',
        choices: [
          'Distant objects do not need as much detail to look convincing, so it improves performance at no visible cost',
          'Distant objects are legally required to be simpler',
          'Low-detail models look better than high-detail ones',
          'High-detail models cannot be placed far away'
        ],
        answer: 0,
        explanation: 'It is a deliberate performance trade: spend the polygon budget where the viewer can actually see it.',
        choiceFeedback: [
          null,
          'There is no legal rule about polygon counts.',
          'Up close, high-detail models look better. Distance is what makes the difference invisible.',
          'They can be placed anywhere — they are simply wasteful when the detail cannot be perceived.'
        ],
        xp: 10
      },
      {
        id: 'q8',
        type: 'choice',
        prompt: 'Which pairing is correct?',
        choices: [
          'Polygons determine shape; textures determine surface appearance',
          'Polygons determine color; textures determine shape',
          'Both polygons and textures determine shape only',
          'Neither affects how a model looks'
        ],
        answer: 0,
        explanation: 'Geometry and surface are separate layers of a model — which is why a low-poly shape with a great texture still reads as blocky.',
        choiceFeedback: [
          null,
          'Reversed. Polygons build form; textures paint the surface.',
          'Textures do not change geometry at all.',
          'Both affect appearance substantially.'
        ],
        xp: 10
      },
      {
        id: 'q9',
        type: 'choice',
        prompt: 'A model is exported for 3D printing rather than rendering. Which of these matters LEAST?',
        choices: [
          'The lighting setup',
          'The polygon count',
          'The overall dimensions',
          'Whether surfaces are properly closed'
        ],
        answer: 0,
        explanation: 'Lighting exists to produce an image. A printer builds physical geometry and never sees a light source.',
        choiceFeedback: [
          null,
          'Polygon count affects how smooth the printed surface is.',
          'Dimensions determine whether the printed part actually fits.',
          'Open or broken surfaces are a common cause of failed prints.'
        ],
        xp: 10
      },
      {
        id: 'q10',
        type: 'choice',
        prompt: 'An engineer models a satellite for a mission visualization. Which of these choices is about communication rather than engineering accuracy?',
        choices: [
          'The lighting and textures used in the final render',
          'The dimensions of the solar panels',
          'The mounting positions of the instruments',
          'The overall mass distribution'
        ],
        answer: 0,
        explanation: 'A useful distinction: geometry and mass must be right because they describe the real hardware, while lighting and textures shape how people understand the picture.',
        choiceFeedback: [
          null,
          'Panel dimensions are real hardware specifications.',
          'Instrument placement affects the actual design and how the spacecraft works.',
          'Mass distribution affects real behavior in flight.'
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'tech7-automation-2',
    subject: 'technology',
    tier: 1,
    quarter: 'Q2 2026-2027',
    sequenceInQuarter: 10,
    title: 'Automation II: Sensors & Feedback Loops',
    theme: 'How automated systems sense conditions and self-correct',
    novaIntro: {
      glossary: {
        sensor: 'A component that detects real-world conditions, like temperature or light, that an automated system uses to make decisions.',
        'feedback loop': 'A process where a system\'s output is measured and used to adjust its future behavior.'
      },
      beats: [
        {
          label: 'Sensors Give Systems Eyes and Ears',
          hook: 'A thermostat has never once looked at a thermometer — but it still always knows the temperature.',
          teachingText: 'Sensors detect real-world conditions — temperature, light, distance, motion — that an automated system uses to make decisions. Without a sensor, a system has no way to know what\'s actually happening in the real world; it can only follow blind, fixed instructions with no ability to react to changing conditions.',
          example: 'A motion-sensor porch light uses a sensor to detect movement in the dark, turning on automatically — without that sensor, the light could only ever be manually switched or run on a fixed timer with no real awareness of motion.',
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'A smart sprinkler system waters the lawn automatically, but skips watering on days it detects rain. What must it have to make that decision?',
            choices: [
              'A moisture or rain sensor providing real-world data to base the decision on',
              'A calendar with no sensors at all',
              'Random chance',
              'A person manually checking the weather every day'
            ],
            answer: 0,
            explanation: 'Detecting actual rain requires a sensor providing real-world data — without one, the system has no way to know current weather conditions.',
            choiceFeedback: [
              null,
              'A calendar alone has no way to detect an unpredictable, day-to-day condition like whether it is currently raining.',
              'This is described as an automated decision based on real conditions, not random chance — that requires a sensor.',
              'The system is described as making this decision automatically, without a person checking manually each day — that requires a sensor.'
            ],
            xp: 10
          },
          practiceGeneratorId: 'gen-tech-automation-sensors',
          practiceCount: 4
        },
        {
          label: 'Feedback Loops: Sensing and Self-Correcting',
          hook: 'A thermostat doesn\'t just turn the heat on once — it keeps checking, again and again, forever.',
          teachingText: 'A feedback loop is a process where a system\'s OUTPUT is measured and used to adjust its FUTURE behavior — a repeating cycle, not a one-time action. A thermostat is a classic example: it continuously measures the current temperature (sensing), compares it to the target temperature, and turns heating or cooling on or off accordingly (acting) — then immediately measures again, over and over, to stay near the target. Feedback is also why some systems must run themselves. A rocket test stand that has to abort within milliseconds cannot wait for a human to notice a gauge, and a Mars rover cannot wait minutes for a radio round trip to Earth before avoiding a rock. In both cases the sense-and-adjust cycle has to live inside the machine.',
          example: 'Set a thermostat to 70°F: it checks the current temperature, turns on heat if it\'s below 70, checks again a moment later, and turns the heat off once it reaches 70 — continuously repeating this sense-and-adjust cycle.',
          practiceGeneratorId: 'gen-tech-automation-feedback-loops',
          practiceCount: 3
        }
      ],
      connection: 'Sensors and feedback loops are the exact concepts that make Robotics possible — a robot is really just automation with more sensors, more feedback loops, and more complex decisions layered on top.',
      videoUrl: 'https://www.youtube.com/watch?v=QUfNGwBQJ-s'
    },
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What does a sensor do in an automated system?',
        choices: [
          'Detects real-world conditions the system uses to make decisions',
          'Supplies electrical power to the system',
          'Stores the system\'s instructions',
          'Displays results to a human operator'
        ],
        answer: 0,
        explanation: 'Temperature, light, distance, motion — a sensor is how a system learns anything at all about the world outside itself.',
        choiceFeedback: [
          null,
          'Power comes from a battery or supply, not a sensor.',
          'Instructions live in the system\'s program or controller.',
          'Displaying results is an output function; sensing is input.'
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'What can a system without any sensor do?',
        choices: [
          'Only follow blind, fixed instructions with no ability to react to changing conditions',
          'React to its environment using its program alone',
          'Nothing at all',
          'Sense conditions less accurately than one with a sensor'
        ],
        answer: 0,
        explanation: 'Without input from the world, a system is running on faith — a timer, not an awareness.',
        choiceFeedback: [
          null,
          'A program can only act on information it receives. With no sensor, none arrives.',
          'It can still run its fixed instructions perfectly well — it just cannot adapt.',
          'It cannot sense at all, accurately or otherwise.'
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'Why is a motion-sensor porch light meaningfully different from one on a fixed timer?',
        choices: [
          'The sensor light responds to what is actually happening; the timer only responds to the clock',
          'The timer light uses more electricity',
          'The sensor light is brighter',
          'There is no real difference'
        ],
        answer: 0,
        explanation: 'A timer running at the wrong hour is useless. Sensing is what makes the response match reality.',
        choiceFeedback: [
          null,
          'Power use depends on the bulb, not on how it is triggered.',
          'Brightness comes from the bulb, not the trigger.',
          'One reacts to the world and one does not — that is a significant difference.'
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'What is a feedback loop?',
        choices: [
          'A repeating cycle where a system measures its own output and uses it to adjust future behavior',
          'A one-time correction applied after a system finishes',
          'A message sent from a user to a manufacturer',
          'A loop in a program that never ends'
        ],
        answer: 0,
        explanation: 'The word "repeating" carries the definition — sensing and adjusting continuously, not once.',
        choiceFeedback: [
          null,
          'A single correction is not a loop. The cycle is what makes it feedback.',
          'That is customer feedback, an unrelated everyday meaning of the word.',
          'An infinite loop is a programming structure. A feedback loop is a control concept.'
        ],
        xp: 10
      },
      {
        id: 'q5',
        type: 'choice',
        prompt: 'A thermostat set to 70°F does what, in order?',
        choices: [
          'Measures the temperature, compares it to 70, turns heating or cooling on or off, then measures again',
          'Heats continuously until it is switched off manually',
          'Heats for a fixed number of minutes decided in advance',
          'Measures the temperature once when it is set, and never again'
        ],
        answer: 0,
        explanation: 'Sense, compare, act, sense again — the cycle repeating is what holds the room near the target.',
        choiceFeedback: [
          null,
          'Continuous heating with no measurement would overshoot badly — that is a system with no feedback.',
          'A fixed run time is a timer, not a feedback loop.',
          'Measuring once cannot keep a room at temperature as conditions change.'
        ],
        xp: 10
      },
      {
        id: 'q6',
        type: 'choice',
        prompt: 'What makes a thermostat a feedback loop rather than just a sensor?',
        choices: [
          'Its own action changes the temperature it then measures again',
          'It has a digital display',
          'It can be programmed with a schedule',
          'It uses electricity'
        ],
        answer: 0,
        explanation: 'The output feeds back into the input. That circular relationship is precisely what "feedback" names.',
        choiceFeedback: [
          null,
          'A display shows information but creates no loop.',
          'Scheduling is a convenience feature; the loop works with or without it.',
          'Power is required but has nothing to do with the structure.'
        ],
        xp: 10
      },
      {
        id: 'q7',
        type: 'choice',
        prompt: 'How do sensors and feedback loops relate to each other?',
        choices: [
          'The sensor supplies the measurement; the feedback loop is the repeating cycle that acts on it',
          'They are two names for the same component',
          'A feedback loop works without any sensor',
          'A sensor works only inside a feedback loop'
        ],
        answer: 0,
        explanation: 'A sensor alone gives information. A feedback loop is what turns that information into continuous self-correction.',
        choiceFeedback: [
          null,
          'One is a component; the other is a process structure.',
          'With no measurement there is nothing to feed back.',
          'Sensors are useful on their own too — a simple alarm senses without any loop.'
        ],
        xp: 10
      },
      {
        id: 'q8',
        type: 'choice',
        prompt: 'A greenhouse system opens vents when it gets too warm and closes them when it cools. What is this?',
        choices: [
          'A feedback loop — the action changes the condition that is measured next',
          'A fixed timer with no sensing',
          'Social engineering',
          'A one-time calibration'
        ],
        answer: 0,
        explanation: 'Same structure as the thermostat, different hardware — measure, compare, act, measure again.',
        choiceFeedback: [
          null,
          'A timer would open the vents at set hours regardless of the actual temperature.',
          'Social engineering is a security topic about manipulating people.',
          'Calibration happens once at setup; this runs continuously.'
        ],
        xp: 10
      },
      {
        id: 'q9',
        type: 'choice',
        prompt: 'Why must a Mars rover rely heavily on its own sensors and feedback loops rather than being driven from Earth?',
        choices: [
          'The radio delay is far too long for a human to react to an obstacle in real time',
          'Mars has no radio signals at all',
          'Rovers are not allowed to receive commands',
          'Sensors are cheaper than radio equipment'
        ],
        answer: 0,
        explanation: 'Signals take minutes each way. By the time an operator on Earth saw a hazard and responded, the rover would already have reached it.',
        choiceFeedback: [
          null,
          'Radio works to and from Mars — it simply takes a long time to arrive.',
          'Rovers receive commands routinely. What they cannot do is wait for one during a hazard.',
          'Rovers carry both. Cost is not the reason for onboard autonomy.'
        ],
        xp: 10
      },
      {
        id: 'q10',
        type: 'choice',
        prompt: 'A rocket engine test stand must shut down within milliseconds if pressure exceeds a safe limit. Which design is correct, and why?',
        choices: [
          'A sensor feeding a feedback loop that acts automatically, because no human can react that fast',
          'A fixed timer that shuts down after a set number of seconds',
          'A human watching a gauge and pressing a button',
          'A single pressure measurement taken before the test begins'
        ],
        answer: 0,
        explanation: 'Automatic sensing and acting is not a convenience here — human reaction time is far too slow for a millisecond-scale abort.',
        choiceFeedback: [
          null,
          'A timer has no idea what the pressure is actually doing.',
          'Human reaction time is measured in hundreds of milliseconds at best — far too slow.',
          'A reading taken beforehand says nothing about what happens during the burn.'
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'tech7-engineering-design-process',
    subject: 'technology',
    tier: 1,
    quarter: 'Q3 2026-2027',
    sequenceInQuarter: 1,
    title: 'The Engineering Design Process I: Defining the Problem',
    theme: 'Criteria and constraints, and why writing them down first changes the design',
    novaIntro: {
      glossary: {
        criteria: 'What a successful design must DO — the requirements you will judge it against.',
        constraints: 'The limits a design must work within — budget, size, mass, time, materials.',
        'design process': 'The repeatable cycle engineers use: identify a problem, design and build a solution, test it, improve it.',
        'problem statement': 'A short written description of what actually needs solving, agreed before any designing starts.',
        tradeoff: 'Accepting less of one good thing to get more of another, because you cannot maximize everything at once.'
      },
      beats: [
        {
          label: 'Four steps, in order',
          hook: 'Most failed projects were not built badly. They were built to solve the wrong problem.',
          teachingText: 'NASA JPL describes the engineering design process in four steps: identify a problem, design and build a solution, test the solution, and improve on the design. What makes it a PROCESS rather than a list is that the fourth step feeds back into the second — you are meant to go around the loop more than once. The step people skip is the first one. Jumping straight to building feels productive, but a design can only be judged against a problem someone actually wrote down. Engineers therefore start with a problem statement, and then split the requirements into two kinds: CRITERIA, meaning what the design must do, and CONSTRAINTS, meaning the limits it must respect. Criteria are the goals. Constraints are the walls.',
          example: 'JPL\'s Mars Thermos challenge asks students to keep a container warm on Mars. The criterion is "maintain temperature above a target for a set time." The constraints are the materials allowed, the size, and the mass. Notice that a design can meet every criterion and still fail — if it works beautifully but weighs more than the lander can carry, the constraint kills it.',
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'A team is told: "Design a phone stand. It must hold the phone at eye level, and it must be printable in under two hours." Which part is a constraint?',
            choices: [
              'Printable in under two hours',
              'Holds the phone at eye level',
              'Both are criteria',
              'Neither — these are just suggestions'
            ],
            answer: 0,
            explanation: 'Print time is a limit the design must work within, which makes it a constraint. Holding the phone at eye level is what the design must DO, which makes it a criterion.',
            choiceFeedback: [
              null,
              'That is what the stand must DO, which makes it a criterion rather than a limit.',
              'Only one of them describes what the design must do; the other describes a limit it must respect.',
              'Both are real requirements. The design is judged against them.'
            ],
            xp: 10
          },
          practiceGeneratorId: 'gen-tech-design-process-basics',
          practiceCount: 3
        },
        {
          label: 'Why constraints are a gift',
          hook: 'Being told "make anything you want" is far harder than being told "make it fit in this box."',
          teachingText: 'Beginners often treat constraints as obstacles. Experienced engineers treat them as the most useful information in the brief, because constraints are what make a design decidable. If any solution is acceptable, there is no way to choose between two ideas. Add a mass limit and a cost ceiling and suddenly most ideas eliminate themselves, leaving a real decision about the few that survive. Constraints also expose TRADEOFFS — the places where you cannot have everything at once. A stronger bracket is usually a heavier bracket. A cheaper material is usually a weaker one. Naming the tradeoff honestly is engineering; pretending it does not exist is how a design fails at the worst possible moment.',
          example: 'Spacecraft engineers work under the tightest constraint in the business: mass. Every kilogram sent to Mars costs enormous fuel, so instruments compete for grams. That constraint is exactly why spacecraft design is so inventive — when you cannot solve a problem by adding material, you are forced to solve it by being cleverer about geometry.',
          practiceGeneratorId: 'gen-tech-design-process-basics',
          practiceCount: 3
        }
      ],
      connection: 'How an aerospace engineer uses this: every real mission begins as a requirements document, not a drawing. Before anyone sketches a spacecraft, someone writes down what it must accomplish and what it must fit inside — the rocket fairing, the mass budget, the power budget, the schedule. Engineers who can read a requirements list and correctly separate "must do" from "must not exceed" are useful on day one. Engineers who start sketching first tend to produce beautiful things that cannot be launched.',
      videoUrl: 'https://www.youtube.com/watch?v=SIj7CuwdVDA'
    },
    questions: [
      { id: 'q1', type: 'choice', prompt: 'What are the four steps of the engineering design process as NASA JPL describes it?', choices: ['Identify a problem, design and build a solution, test the solution, improve on the design', 'Sketch, build, sell, repeat', 'Guess, check, guess again, give up', 'Measure, cut, assemble, paint'], answer: 0, explanation: 'The fourth step feeds back into the second, which is what makes it a loop rather than a list.', choiceFeedback: [null, 'Selling is a business activity, not part of the engineering design process.', 'Guessing without testing or defining the problem is the opposite of a design process.', 'Those are fabrication steps that happen inside "build," not the process itself.'], xp: 10 },
      { id: 'q2', type: 'choice', prompt: 'What makes the design process a loop rather than a checklist?', choices: ['The final step feeds back into designing, so you go around more than once', 'Each step must be done exactly once, in order', 'The steps can be done in any order at all', 'It ends as soon as something is built'], answer: 0, explanation: 'Improving the design sends you back to designing and building again — iteration is the point.', choiceFeedback: [null, 'Doing each step once is what makes something a checklist, not a loop.', 'The order matters — testing before building is not possible.', 'Building is the middle of the process, not the end.'], xp: 10 },
      { id: 'q3', type: 'choice', prompt: 'What are criteria?', choices: ['What a successful design must DO', 'The limits a design must work within', 'The tools used to build the design', 'The people who will judge the design'], answer: 0, explanation: 'Criteria are the goals; constraints are the walls.', choiceFeedback: [null, 'That describes constraints.', 'Tools are part of how you build, not what makes the design successful.', 'Criteria are requirements, not people.'], xp: 10 },
      { id: 'q4', type: 'choice', prompt: 'What are constraints?', choices: ['The limits a design must work within — budget, size, mass, time, materials', 'The goals the design must achieve', 'Mistakes discovered during testing', 'Optional suggestions that can be ignored'], answer: 0, explanation: 'Constraints are hard limits. A design that meets every criterion but breaks a constraint still fails.', choiceFeedback: [null, 'Goals are criteria. Constraints are the limits around them.', 'Mistakes are found by testing; constraints are set before designing starts.', 'Constraints are requirements, not suggestions.'], xp: 10 },
      { id: 'q5', type: 'choice', prompt: 'Which step of the design process do people most often skip, and why is that costly?', choices: ['Identifying the problem — a design can only be judged against a problem someone wrote down', 'Testing, because testing is expensive', 'Building, because building takes the longest', 'Improving, because most designs are right the first time'], answer: 0, explanation: 'Jumping straight to building feels productive, but it produces solutions to problems nobody agreed on.', choiceFeedback: [null, 'Skipping testing is a real risk, but the step most commonly skipped is defining the problem first.', 'Building is rarely skipped — it is the step people rush TO.', 'Very few designs are right the first time, which is why the loop exists.'], xp: 10 },
      { id: 'q6', type: 'choice', prompt: 'In the Mars Thermos challenge, "must keep the contents above a target temperature for 30 minutes" is what?', choices: ['A criterion', 'A constraint', 'A tradeoff', 'A test result'], answer: 0, explanation: 'It describes what the design must DO, which makes it a criterion.', choiceFeedback: [null, 'A constraint would be a limit, like the materials allowed or the maximum mass.', 'A tradeoff is what you give up to get something else, not a requirement.', 'A test result is what you measure afterward.'], xp: 10 },
      { id: 'q7', type: 'choice', prompt: 'A design meets every criterion but exceeds the mass limit. What happens?', choices: ['It fails — a constraint is a hard limit, not a preference', 'It passes, because the criteria matter more', 'It passes if it only exceeds the limit slightly', 'The mass limit is automatically raised'], answer: 0, explanation: 'This is exactly why criteria and constraints are separated: meeting the goals does not excuse breaking a limit.', choiceFeedback: [null, 'Both must be satisfied. Constraints are not outranked by criteria.', 'A limit that bends is not a limit. Real mass budgets have real consequences.', 'Limits come from physics and budgets, not from how much a design wants them changed.'], xp: 10 },
      { id: 'q8', type: 'choice', prompt: 'Why do experienced engineers treat constraints as useful rather than as obstacles?', choices: ['Constraints make a design decidable — they eliminate most ideas and leave a real choice among the few that survive', 'Constraints make the project take longer, which increases pay', 'Constraints guarantee the design will work', 'Constraints remove the need for testing'], answer: 0, explanation: 'If any solution is acceptable, there is no way to choose between two ideas. Limits create the basis for a decision.', choiceFeedback: [null, 'Constraints usually make work harder and more focused, not longer for its own sake.', 'Nothing guarantees a design works — that is what testing is for.', 'Testing is still required regardless of how tight the constraints are.'], xp: 10 },
      { id: 'q9', type: 'choice', prompt: 'What is a tradeoff?', choices: ['Accepting less of one good thing to get more of another, because you cannot maximize everything at once', 'A design that fails all its criteria', 'Swapping one material for an identical one', 'A meeting where the design is presented'], answer: 0, explanation: 'A stronger bracket is usually heavier; a cheaper material is usually weaker. Naming the tradeoff honestly is engineering.', choiceFeedback: [null, 'A failed design is a failure, not a tradeoff.', 'If two materials are identical there is nothing being traded.', 'A design review is a meeting; a tradeoff is a decision about competing goods.'], xp: 10 },
      { id: 'q10', type: 'choice', prompt: 'Why is mass the tightest constraint in spacecraft design, and what effect does that have?', choices: ['Every kilogram costs enormous fuel, so engineers are forced to solve problems with cleverer geometry instead of more material', 'Mass has no effect once a spacecraft is in orbit', 'Heavier spacecraft are always more reliable', 'Mass only matters for the rocket, not the spacecraft'], answer: 0, explanation: 'When you cannot add material, you have to be smarter about shape — which is exactly why spacecraft design is so inventive.', choiceFeedback: [null, 'Mass affects fuel needed for every manoeuvre, not just launch.', 'Extra mass is extra cost and extra risk, not automatic reliability.', 'The spacecraft\'s own mass is precisely what the rocket has to lift.'], xp: 10 }
    ]
  },
  {
    id: 'tech7-engineering-design-process-2',
    subject: 'technology',
    tier: 1,
    quarter: 'Q3 2026-2027',
    sequenceInQuarter: 2,
    title: 'The Engineering Design Process II: Testing and Iterating',
    theme: 'Comparing competing designs, testing against data, and improving through iteration',
    novaIntro: {
      glossary: {
        iteration: 'One pass around the design loop — build, test, learn, change, repeat.',
        prototype: 'An early working version built to be tested and learned from, not to be sold.',
        'controlled test': 'A test where one variable changes at a time, so the result can be traced to a cause.',
        'failure analysis': 'Working out WHY something broke, rather than only that it broke.',
        'design review': 'A structured check of a design by people other than its author, before it is committed to.'
      },
      beats: [
        {
          label: 'Comparing designs instead of defending one',
          hook: 'The engineer who falls in love with their first idea is the most dangerous person on the team.',
          teachingText: 'NGSS puts real weight on comparing COMPETING solutions rather than developing a single favourite. The reason is human: once you have invested effort in an idea, you start defending it instead of evaluating it. The defence against that is generating several genuinely different candidates before judging any of them, then scoring all of them against the same criteria and constraints written down in the previous lesson. A design review — where people who did not create the design examine it — exists for the same reason. It is not a formality or a criticism ritual; it is the cheapest possible way to find the flaw you cannot see because you are too close to it.',
          example: 'A team designing a drone frame sketches three layouts: one lightest, one strongest, one cheapest to print. Scoring all three against the same criteria makes the decision an argument about evidence rather than about whose idea it was. It also often produces a fourth design that borrows the best feature from each.',
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'A student builds one design, likes it, and spends the rest of the project improving only that one. What has gone wrong?',
            choices: [
              'No competing designs were generated, so there is nothing to compare it against',
              'Nothing — improving one design is the correct approach',
              'They should have built nothing and only planned',
              'They needed a more expensive material'
            ],
            answer: 0,
            explanation: 'Without alternatives, "best" has no meaning — you can only say the design got better than itself, not that it is the right approach.',
            choiceFeedback: [
              null,
              'Iterating on one design is valuable, but only after comparing it against real alternatives.',
              'Building and testing is essential. The gap is in generating alternatives first.',
              'Material cost is unrelated to the problem of never comparing options.'
            ],
            xp: 10
          },
          practiceGeneratorId: 'gen-tech-testing-iteration',
          practiceCount: 3
        },
        {
          label: 'Testing that actually teaches you something',
          hook: 'A test that only tells you "it broke" has wasted most of its value.',
          teachingText: 'A useful test is a CONTROLLED test: change one variable at a time so the result can be traced to a cause. Change three things at once and a better result tells you nothing about which change caused it. Testing also has a second job beyond pass or fail, called FAILURE ANALYSIS — working out WHY something broke. Where did it crack? Under what load? Was it the material, the shape, or the assembly? An engineer who can answer that has learned something transferable; an engineer who only knows "it snapped" has learned almost nothing. This is why iteration works: each pass around the loop is supposed to add knowledge, not just another attempt.',
          example: 'A bridge made of craft sticks fails at 4 kg. If the team thickens the deck, adds a support, and switches glue all at once, and it now holds 6 kg, they cannot say which change helped — or whether one of them actually made things worse and was hidden by the other two.',
          practiceGeneratorId: 'gen-tech-testing-iteration',
          practiceCount: 3
        }
      ],
      connection: 'How an aerospace engineer uses this: NASA builds engineering models before flight models specifically so failures happen on the ground, where they teach instead of ending a mission. A component may be shaken, baked, frozen, and pressure-cycled to failure on purpose, because knowing the exact load at which a part fails is more valuable than hoping it never gets there. Iteration is not a sign that the first attempt was bad. It is the mechanism by which anything difficult is made reliable.',
      videoUrl: 'https://www.youtube.com/watch?v=Obyqku2vWc4'
    },
    questions: [
      { id: 'q1', type: 'choice', prompt: 'Why does NGSS emphasise comparing competing solutions instead of developing one favourite?', choices: ['Once you invest effort in an idea you start defending it instead of evaluating it', 'Comparing designs is faster than building one', 'One design is never allowed by the rules', 'Competing designs always cost less'], answer: 0, explanation: 'Generating several genuinely different candidates before judging any of them is the defence against that bias.', choiceFeedback: [null, 'Comparing takes MORE work up front; the payoff is a better decision.', 'There is no rule against a single design — the issue is the quality of the decision.', 'Cost varies. The reason is decision quality, not price.'], xp: 10 },
      { id: 'q2', type: 'choice', prompt: 'What is a design review, and why does it exist?', choices: ['A structured check by people other than the design\'s author — the cheapest way to find flaws the author is too close to see', 'A ceremony where the team celebrates a finished design', 'A test performed on the physical prototype', 'A meeting to decide the project budget'], answer: 0, explanation: 'It is not a criticism ritual. Outside eyes catch what familiarity hides.', choiceFeedback: [null, 'A review happens BEFORE committing to a design, not as a celebration afterward.', 'Reviews examine the design; physical testing is separate.', 'Budgets are a management matter, not the purpose of a design review.'], xp: 10 },
      { id: 'q3', type: 'choice', prompt: 'A team scores three drone-frame layouts against the same criteria. What does that change about the decision?', choices: ['It becomes an argument about evidence rather than about whose idea it was', 'It guarantees the lightest design wins', 'It removes the need to build anything', 'It makes all three designs equally good'], answer: 0, explanation: 'Scoring against shared criteria also often produces a fourth design borrowing the best feature from each.', choiceFeedback: [null, 'Lightest is only one criterion. The winner depends on all of them together.', 'Building and testing still follow — scoring narrows what gets built.', 'Scoring reveals differences between them; it does not flatten them.'], xp: 10 },
      { id: 'q4', type: 'choice', prompt: 'What is a controlled test?', choices: ['A test where one variable changes at a time, so a result can be traced to a cause', 'A test performed by a supervisor rather than a student', 'A test that the design is guaranteed to pass', 'A test done entirely in software'], answer: 0, explanation: 'Change three things at once and a better result tells you nothing about which change caused it.', choiceFeedback: [null, 'Who runs the test is not what "controlled" refers to.', 'A test you cannot fail teaches you nothing.', 'Controlled tests happen physically and digitally alike.'], xp: 10 },
      { id: 'q5', type: 'choice', prompt: 'A bridge fails at 4 kg. The team thickens the deck, adds a support, and changes glue all at once, and it now holds 6 kg. What is the problem?', choices: ['They cannot tell which change helped — or whether one made things worse and was hidden by the others', 'The bridge should have been tested at a lower weight', 'Three changes are always better than one', 'The improvement is too small to matter'], answer: 0, explanation: 'This is exactly the failure a controlled test prevents: an uninterpretable result.', choiceFeedback: [null, 'Testing to failure is appropriate. The issue is how many things changed at once.', 'More simultaneous changes make results LESS interpretable.', 'A 50 percent improvement is substantial — the problem is not knowing its cause.'], xp: 10 },
      { id: 'q6', type: 'choice', prompt: 'What is failure analysis?', choices: ['Working out WHY something broke — where, under what load, and due to material, shape, or assembly', 'Recording that a test was failed', 'Blaming the team member responsible', 'Repeating a test until it passes'], answer: 0, explanation: 'An engineer who knows why it broke has learned something transferable; one who knows only that it snapped has learned almost nothing.', choiceFeedback: [null, 'Recording the outcome is the start; analysis explains the cause.', 'Failure analysis is technical, not personal.', 'Repeating until it passes hides the problem rather than explaining it.'], xp: 10 },
      { id: 'q7', type: 'choice', prompt: 'What is a prototype for?', choices: ['To be tested and learned from before final production', 'To be sold to the first customer', 'To look identical to the finished product', 'To replace the need for a design process'], answer: 0, explanation: 'A prototype exists to generate information, which is why breaking one is often a success rather than a setback.', choiceFeedback: [null, 'Selling comes after a design is finished and validated.', 'Prototypes often look rough; appearance is not the point.', 'Prototyping is a step INSIDE the design process.'], xp: 10 },
      { id: 'q8', type: 'choice', prompt: 'Why does NASA deliberately test components to failure on the ground?', choices: ['Knowing the exact load at which a part fails is more valuable than hoping it never gets there', 'To use up spare parts before launch', 'Because ground testing is required to be destructive', 'To make the mission cheaper by skipping flight models'], answer: 0, explanation: 'Failures on the ground teach; failures in flight end missions.', choiceFeedback: [null, 'Test articles are built for testing, not left over.', 'Not all ground testing is destructive — much of it is not.', 'Flight models are still built; engineering models come first.'], xp: 10 },
      { id: 'q9', type: 'choice', prompt: 'What does iteration mean in engineering?', choices: ['One pass around the design loop — build, test, learn, change, repeat', 'Repeating the same test until the result changes', 'Producing many identical copies of a finished product', 'Reading the design requirements a second time'], answer: 0, explanation: 'Each pass is supposed to add knowledge, not just another attempt.', choiceFeedback: [null, 'Repeating an identical test on an unchanged design gives the same answer.', 'Producing copies is manufacturing, not iteration.', 'Re-reading requirements is careful, but it is not a design iteration.'], xp: 10 },
      { id: 'q10', type: 'choice', prompt: 'Why is needing several iterations NOT a sign that the first attempt was bad?', choices: ['Iteration is the mechanism by which anything difficult is made reliable', 'Because first attempts are usually perfect', 'Because iterations are required by law', 'Because each iteration is cheaper than the last'], answer: 0, explanation: 'Hard problems are not solved in one pass by anyone. The loop is the method, not an admission of failure.', choiceFeedback: [null, 'First attempts on hard problems are almost never right, which is precisely why the loop exists.', 'No law requires iteration; engineering practice does.', 'Cost per iteration varies and is not the reason iteration works.'], xp: 10 }
    ]
  },
  {
    id: 'tech7-sketching-dimensioning',
    subject: 'technology',
    tier: 1,
    quarter: 'Q3 2026-2027',
    sequenceInQuarter: 3,
    title: 'Sketching & Dimensioning I: Every Part Starts Flat',
    theme: 'The 2D sketch under every 3D model, and why "about right" is not a dimension',
    novaIntro: {
      glossary: {
        sketch: 'The 2D profile drawn on a plane that a CAD feature turns into 3D geometry.',
        dimension: 'An exact numeric measurement attached to a sketch, with units.',
        plane: 'A flat reference surface in CAD — usually front, top, or right — that a sketch is drawn on.',
        origin: 'The fixed zero point of a CAD model, where all coordinates are measured from.',
        'engineering drawing': 'A dimensioned technical drawing precise enough for someone else to manufacture the part from.'
      },
      beats: [
        {
          label: 'The flat drawing underneath the solid',
          hook: 'Every 3D printed object you have ever seen began as a flat outline.',
          teachingText: 'Almost every part in professional CAD starts as a 2D SKETCH drawn on a PLANE — a flat reference surface, usually front, top, or right. The sketch is the profile: the outline of the shape, seen straight on. Only after the sketch exists does a feature turn it into 3D. This matters because a sloppy sketch produces a sloppy solid, and fixing it later means going back to the sketch anyway. Every sketch is positioned relative to the ORIGIN, the model\'s fixed zero point. Anchoring a sketch to the origin rather than leaving it floating is what keeps a part predictable when it is later assembled with others.',
          example: 'In Tinkercad you can drag shapes together without ever drawing a sketch, which is exactly why it is a good first tool — you get building immediately. Onshape works the professional way: draw the profile, dimension it, then extrude. Moving between the two teaches something real, because the moment a Tinkercad model needs to be precise, you discover why the extra step exists.',
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'A student draws a bracket profile floating far from the origin, then builds the whole part from it. What problem is likely later?',
            choices: [
              'The part will sit in an unpredictable position when assembled with other parts',
              'The part cannot be 3D printed at all',
              'The sketch will delete itself',
              'The part will be the wrong colour'
            ],
            answer: 0,
            explanation: 'Position in CAD is measured from the origin. A part built far from it carries that offset into every assembly.',
            choiceFeedback: [
              null,
              'It can still be printed — the geometry is valid, just awkwardly located.',
              'Sketches do not delete themselves; they persist as editable history.',
              'Colour is a display setting, unrelated to sketch position.'
            ],
            xp: 10
          },
          practiceGeneratorId: 'gen-tech-sketching-dimensioning',
          practiceCount: 3
        },
        {
          label: '"About right" is not a dimension',
          hook: 'A drawing without numbers is art. A drawing with numbers is an instruction.',
          teachingText: 'A DIMENSION is an exact numeric measurement with units attached. This is the line between sketching an idea and specifying a part. If a hole is "about 8 millimetres," two people will make two different holes, and one of them will not fit the bolt. Units matter as much as the number: 8 mm and 8 cm differ by a factor of ten, and mixing millimetres with inches has destroyed real hardware. A properly dimensioned ENGINEERING DRAWING is precise enough that someone who has never spoken to you can manufacture the part correctly — which is the actual test of whether a drawing is finished.',
          example: 'In 1999 NASA lost the Mars Climate Orbiter because one team supplied data in pound-force seconds while the navigation software expected newton-seconds. The arithmetic was correct in both systems. Nobody agreed on the units, and a spacecraft that cost hundreds of millions entered the Martian atmosphere at the wrong altitude and was destroyed.',
          practiceGeneratorId: 'gen-tech-sketching-dimensioning',
          practiceCount: 3
        }
      ],
      connection: 'How an aerospace engineer uses this: an engineering drawing is a contract. The designer promises that a part built to these dimensions will work; the machinist promises to build to exactly those dimensions. Neither can do their job on "about right." That is why dimensioning is taught as a discipline rather than a formatting step — the number on the drawing is the thing everyone downstream is trusting.',
      videoUrl: 'https://www.youtube.com/watch?v=gOs6Mdj7y_4'
    },
    questions: [
      { id: 'q1', type: 'choice', prompt: 'What is a sketch in CAD?', choices: ['The 2D profile drawn on a plane that a feature then turns into 3D geometry', 'A rough freehand drawing on paper before using the computer', 'A photograph of the finished part', 'The final 3D model itself'], answer: 0, explanation: 'Almost every professional CAD part begins as a 2D sketch on a reference plane.', choiceFeedback: [null, 'Paper sketching is useful, but a CAD sketch is a precise digital profile.', 'A photograph records something that already exists.', 'The 3D model is what the sketch becomes, not the sketch itself.'], xp: 10 },
      { id: 'q2', type: 'choice', prompt: 'What is a plane in CAD?', choices: ['A flat reference surface — usually front, top, or right — that a sketch is drawn on', 'An aircraft used as a design reference', 'The flat bottom face of a printed part', 'A tool that flattens curved surfaces'], answer: 0, explanation: 'Planes give a sketch somewhere definite to live, which is what makes its orientation predictable.', choiceFeedback: [null, 'The word is a coincidence — a CAD plane is a geometric reference surface.', 'A part\'s bottom face is geometry, not a reference plane.', 'There is no flattening tool involved.'], xp: 10 },
      { id: 'q3', type: 'choice', prompt: 'What is the origin?', choices: ['The fixed zero point of a model, where all coordinates are measured from', 'The first sketch drawn in a file', 'The person who created the design', 'The country the design came from'], answer: 0, explanation: 'Anchoring a sketch to the origin keeps a part predictable when it is later assembled with others.', choiceFeedback: [null, 'The first sketch can be anywhere; the origin is a fixed reference point.', 'Authorship is metadata, not geometry.', 'Origin here is a coordinate term, not a place.'], xp: 10 },
      { id: 'q4', type: 'choice', prompt: 'Why anchor a sketch to the origin instead of leaving it floating?', choices: ['It keeps the part\'s position predictable when assembled with other parts', 'It makes the file smaller', 'It is the only way a sketch can be extruded', 'It changes the material the part is made of'], answer: 0, explanation: 'Position is measured from the origin, so a part built far from it carries that offset into every assembly.', choiceFeedback: [null, 'Sketch position has no meaningful effect on file size.', 'A floating sketch can still be extruded — it will simply sit somewhere awkward.', 'Material is a separate property entirely.'], xp: 10 },
      { id: 'q5', type: 'choice', prompt: 'What is a dimension?', choices: ['An exact numeric measurement with units attached', 'A rough estimate of a size', 'The number of sides a shape has', 'The colour assigned to a face'], answer: 0, explanation: 'The number plus its units is what turns a drawing from an idea into a specification.', choiceFeedback: [null, 'An estimate is precisely what a dimension is not.', 'Counting sides describes a shape but does not size it.', 'Colour is a display property.'], xp: 10 },
      { id: 'q6', type: 'choice', prompt: 'Why is "the hole is about 8 millimetres" a problem?', choices: ['Two people will make two different holes, and one of them will not fit the bolt', 'Millimetres are not a valid unit for holes', 'Holes cannot be dimensioned in CAD', 'It is fine as long as the bolt is also approximate'], answer: 0, explanation: 'A dimension exists so that everyone downstream produces the same part.', choiceFeedback: [null, 'Millimetres are a standard and appropriate unit.', 'Holes are dimensioned constantly in CAD.', 'Bolts are manufactured to precise standard sizes, not approximate ones.'], xp: 10 },
      { id: 'q7', type: 'choice', prompt: 'Why do units matter as much as the number itself?', choices: ['8 mm and 8 cm differ by a factor of ten, and mixing unit systems has destroyed real hardware', 'Units are only needed on official drawings', 'Units affect the colour of the dimension text', 'Units matter only when using inches'], answer: 0, explanation: 'The Mars Climate Orbiter is the standard cautionary example of exactly this.', choiceFeedback: [null, 'Units matter on every drawing, official or not.', 'Text formatting is unrelated.', 'Millimetres and centimetres can be confused just as easily as inches.'], xp: 10 },
      { id: 'q8', type: 'choice', prompt: 'What happened to NASA\'s Mars Climate Orbiter in 1999?', choices: ['One team supplied data in pound-force seconds while the software expected newton-seconds, and the spacecraft was destroyed', 'Its rocket exploded on the launch pad', 'It ran out of fuel on the way to Mars', 'Its camera failed and it returned no data'], answer: 0, explanation: 'The arithmetic was correct in both systems. Nobody agreed on the units.', choiceFeedback: [null, 'The launch was successful; the loss happened at Mars arrival.', 'Fuel was not the problem — the approach altitude was.', 'The spacecraft was destroyed before its instruments mattered.'], xp: 10 },
      { id: 'q9', type: 'choice', prompt: 'What is the real test of whether an engineering drawing is finished?', choices: ['Someone who has never spoken to you could manufacture the part correctly from it', 'It looks neat and is centred on the page', 'It uses at least ten dimensions', 'It has been saved in the right file format'], answer: 0, explanation: 'A drawing is a contract with someone downstream, and completeness is judged by whether they can act on it alone.', choiceFeedback: [null, 'Presentation matters less than sufficiency of information.', 'The right number of dimensions is however many the part needs.', 'File format matters for sharing, not for whether the drawing is complete.'], xp: 10 },
      { id: 'q10', type: 'choice', prompt: 'What does the lesson say you learn by moving from Tinkercad to Onshape?', choices: ['The moment a model needs to be precise, you discover why the sketch-and-dimension step exists', 'That Tinkercad produces better parts', 'That professional CAD is easier than beginner CAD', 'That sketches are optional in all CAD software'], answer: 0, explanation: 'Tinkercad gets you building immediately; Onshape shows why the extra discipline is worth it.', choiceFeedback: [null, 'Tinkercad is faster to start with; Onshape is more precise.', 'Professional CAD is more capable and initially harder, not easier.', 'Sketches are fundamental to parametric CAD.'], xp: 10 }
    ]
  },
  {
    id: 'tech7-sketching-dimensioning-2',
    subject: 'technology',
    tier: 1,
    quarter: 'Q3 2026-2027',
    sequenceInQuarter: 4,
    title: 'Sketching & Dimensioning II: Constraints and Parametric Thinking',
    theme: 'Why a driven dimension beats a dragged shape',
    novaIntro: {
      glossary: {
        'sketch constraint': 'A rule forcing geometry to stay a certain way — parallel, perpendicular, equal, concentric — no matter what else changes.',
        parametric: 'A model whose dimensions are linked by rules, so changing one updates everything connected to it.',
        'fully defined': 'A sketch where every point is pinned by dimensions and constraints, leaving nothing free to move.',
        'design intent': 'The reasoning behind a shape, captured so the model changes the way you meant it to.',
        underdefined: 'A sketch with geometry still free to move, which will shift unpredictably when something else changes.'
      },
      beats: [
        {
          label: 'Rules that survive a change',
          hook: 'Drag a shape into place and it looks right. Change one number and it falls apart.',
          teachingText: 'A SKETCH CONSTRAINT is a rule that forces geometry to stay a certain way regardless of what else changes: these two lines stay parallel, this line stays perpendicular to that one, these two circles stay the same size, this circle stays concentric with that hole. Constraints capture DESIGN INTENT — the reasoning behind the shape — so the model updates the way you meant rather than in some arbitrary way. A sketch where every point is pinned by dimensions and constraints is FULLY DEFINED. One with geometry still free to move is UNDERDEFINED, and it will shift unpredictably the moment something upstream changes. Professional CAD software colours these differently precisely because the difference matters so much.',
          example: 'Imagine a mounting plate with two holes that must always be centred on it. Drag them into place by eye and they look centred — until someone widens the plate, at which point they stay where they were and are now off-centre. Constrain them symmetrically about the centreline instead, and widening the plate moves both holes automatically, staying centred forever.',
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'Two holes were dragged into place by eye on a plate. The plate is later made 20 mm wider. What happens to the holes?',
            choices: [
              'They stay where they were and are now off-centre',
              'They move automatically to stay centred',
              'They are deleted by the change',
              'They double in size'
            ],
            answer: 0,
            explanation: 'Dragged geometry has no rule attached, so nothing tells it to move when the plate changes.',
            choiceFeedback: [
              null,
              'That is what a symmetry CONSTRAINT would do — dragging by eye creates no such rule.',
              'Changing a dimension does not delete geometry.',
              'Hole size is a separate dimension and is unaffected by plate width.'
            ],
            xp: 10
          },
          practiceGeneratorId: 'gen-tech-constraints-parametric',
          practiceCount: 3
        },
        {
          label: 'One number, everything follows',
          hook: 'The best CAD models are the ones where changing your mind is cheap.',
          teachingText: 'PARAMETRIC design means dimensions are linked by rules rather than set independently, so changing one automatically adjusts everything connected to it. This is the payoff of doing the constraint work up front. In a well-built parametric model, widening a shelf stretches every connected board and bracket to match; in a badly built one, the designer must find and fix each affected part by hand. The danger of the second approach is not the effort — it is the part somebody forgets. A model whose pieces quietly disagree with each other looks fine on screen and fails at assembly. Building parametrically means a design change is one edit rather than a hunt.',
          example: 'A satellite bracket has its mounting-hole spacing changed by 3 mm. In a parametric model every feature tied to that spacing updates together. In a dragged-together model, the holes move but the slot that clears them does not, and nothing warns you — the error is found by a technician holding two parts that will not fit.',
          practiceGeneratorId: 'gen-tech-constraints-parametric',
          practiceCount: 3
        }
      ],
      connection: 'How an aerospace engineer uses this: requirements change constantly, often late. A structure gets heavier, an instrument grows, a bolt pattern shifts. The engineers whose models absorb those changes cleanly are the ones whose work stays on schedule, and the difference is almost never talent — it is whether they captured design intent with constraints at the start, or dragged things into position because it was faster in the first hour.',
      videoUrl: 'https://www.youtube.com/watch?v=6STIrs0U8y4'
    },
    questions: [
      { id: 'q1', type: 'choice', prompt: 'What is a sketch constraint?', choices: ['A rule forcing geometry to stay parallel, perpendicular, equal, or concentric no matter what else changes', 'A limit on how many lines a sketch may contain', 'The maximum size a part is allowed to be', 'A password that locks a sketch from editing'], answer: 0, explanation: 'Constraints capture design intent so the model updates the way you meant it to.', choiceFeedback: [null, 'There is no limit on the number of lines in a sketch.', 'That would be a design constraint in the requirements sense, not a sketch constraint.', 'Constraints govern geometry, not access.'], xp: 10 },
      { id: 'q2', type: 'choice', prompt: 'What does "fully defined" mean?', choices: ['Every point in the sketch is pinned by dimensions and constraints, leaving nothing free to move', 'The sketch has been saved and closed', 'The sketch has at least ten dimensions', 'The part has been fully 3D printed'], answer: 0, explanation: 'Professional CAD colours defined and underdefined geometry differently because the difference matters so much.', choiceFeedback: [null, 'Saving does not pin geometry.', 'The right number of dimensions is however many the geometry needs.', 'Printing is a manufacturing step, unrelated to sketch definition.'], xp: 10 },
      { id: 'q3', type: 'choice', prompt: 'Why is an underdefined sketch risky?', choices: ['Geometry still free to move will shift unpredictably when something upstream changes', 'It cannot be extruded into 3D', 'It uses more memory than a defined sketch', 'It will not display on screen'], answer: 0, explanation: 'The danger is not that it fails immediately — it is that it moves later, quietly.', choiceFeedback: [null, 'An underdefined sketch can usually still be extruded.', 'Memory use is not the concern.', 'It displays normally, which is part of why the risk is easy to miss.'], xp: 10 },
      { id: 'q4', type: 'choice', prompt: 'Two holes are dragged into place on a plate. The plate is later widened. What happens?', choices: ['The holes stay put and are now off-centre', 'The holes move automatically to stay centred', 'The plate refuses to change width', 'The holes become larger'], answer: 0, explanation: 'Dragged geometry carries no rule, so nothing tells it to follow the change.', choiceFeedback: [null, 'That requires a symmetry constraint, which dragging does not create.', 'The plate width is a dimension and can be changed freely.', 'Hole diameter is a separate dimension.'], xp: 10 },
      { id: 'q5', type: 'choice', prompt: 'What is design intent?', choices: ['The reasoning behind a shape, captured so the model changes the way you meant it to', 'The deadline a design must be finished by', 'The intended customer for the product', 'A written summary of the project goals'], answer: 0, explanation: 'Constraints are how design intent gets stored in the model rather than only in the designer\'s head.', choiceFeedback: [null, 'Schedules are project management, not model structure.', 'The audience for a product is a marketing question.', 'A goals document is useful, but design intent lives in the geometry rules.'], xp: 10 },
      { id: 'q6', type: 'choice', prompt: 'What does parametric design mean?', choices: ['Dimensions are linked by rules, so changing one automatically adjusts everything connected', 'The model is built entirely from measured photographs', 'The design uses no dimensions at all', 'Each part is drawn separately and never linked'], answer: 0, explanation: 'It is the payoff for doing the constraint work up front.', choiceFeedback: [null, 'Building from photographs is photogrammetry, a different technique.', 'Parametric models are heavily dimensioned — the dimensions are simply linked.', 'Unlinked parts are exactly what parametric design avoids.'], xp: 10 },
      { id: 'q7', type: 'choice', prompt: 'What is the real danger of adjusting each part by hand instead of parametrically?', choices: ['The part somebody forgets — a model whose pieces quietly disagree looks fine on screen and fails at assembly', 'It takes slightly longer to do', 'The software will refuse to save the file', 'The model becomes impossible to 3D print'], answer: 0, explanation: 'The effort is not the problem. The silent inconsistency is.', choiceFeedback: [null, 'Time cost is real but secondary to the risk of a missed feature.', 'Saving works regardless of how the model was built.', 'It can still be printed — it will just be wrong.'], xp: 10 },
      { id: 'q8', type: 'choice', prompt: 'A satellite bracket\'s hole spacing changes by 3 mm. Why does a parametric model matter here specifically?', choices: ['Every feature tied to that spacing updates together, so no feature is left at the old dimension', 'It makes the bracket lighter', 'It removes the need to test the bracket', 'It automatically manufactures the new bracket'], answer: 0, explanation: 'On flight hardware the danger is the clearance slot nobody remembered to update — found by a technician holding two parts that will not fit.', choiceFeedback: [null, 'Mass comes from geometry and material, not from how the model was built.', 'Physical testing is still required.', 'Manufacturing is a separate step performed by machines.'], xp: 10 },
      { id: 'q9', type: 'choice', prompt: 'How do you make two holes stay centred on a plate no matter how wide it becomes?', choices: ['Constrain them symmetrically about the centreline', 'Drag them carefully to the middle', 'Give them a larger diameter', 'Place them on a separate sketch'], answer: 0, explanation: 'A symmetry constraint is a rule that survives the change; careful dragging is not.', choiceFeedback: [null, 'Careful placement looks right until the plate changes size.', 'Diameter has nothing to do with position.', 'A separate sketch does not by itself create a relationship to the centreline.'], xp: 10 },
      { id: 'q10', type: 'choice', prompt: 'Why does the lesson say the difference between engineers who absorb late changes cleanly is "almost never talent"?', choices: ['It is whether they captured design intent with constraints at the start, or dragged things into position because it was faster in the first hour', 'Because talent does not exist in engineering', 'Because all CAD software works identically', 'Because late changes never actually happen'], answer: 0, explanation: 'Requirements change constantly and often late — the model either absorbs it or it does not.', choiceFeedback: [null, 'Skill matters; the point is that this particular difference comes from a habit.', 'CAD packages differ considerably in capability.', 'Late changes are routine in real engineering work.'], xp: 10 }
    ]
  },
  {
    id: 'tech7-sketch-to-solid',
    subject: 'technology',
    tier: 1,
    quarter: 'Q3 2026-2027',
    sequenceInQuarter: 5,
    title: 'From Sketch to Solid I: Extrude and Revolve',
    theme: 'The two features that turn a flat profile into a 3D part, and the editable history behind them',
    novaIntro: {
      glossary: {
        extrude: 'Pushing a 2D profile straight out to a given depth, creating a solid with that cross-section.',
        revolve: 'Spinning a 2D profile around an axis to create a shape that is round about that axis.',
        'feature tree': 'The ordered list of every operation used to build a part, kept editable rather than baked in.',
        'cut / subtract': 'Removing material using a profile, rather than adding it — how holes and slots are made.',
        'axis of revolution': 'The line a profile is spun around during a revolve.'
      },
      beats: [
        {
          label: 'Push it out, or spin it around',
          hook: 'Two operations account for the majority of every part you have ever held.',
          teachingText: 'EXTRUDE pushes a 2D profile straight out to a given depth. Sketch a rectangle, extrude it 10 mm, and you have a rectangular block; sketch a circle and extrude it and you have a cylinder. The cross-section stays identical along the whole length, which is why extrude suits brackets, plates, and housings. REVOLVE spins a profile around an AXIS OF REVOLUTION instead, producing a shape that is round about that axis. Sketch the outline of one half of a bottle and revolve it 360 degrees and you get the whole bottle. The rule of thumb is simple: if the shape looks the same all the way along, extrude it; if it looks the same all the way around, revolve it. The same operations run in reverse to remove material — a CUT — which is how holes, slots, and pockets are made.',
          example: 'A rocket nozzle is a revolve. Its distinctive bell shape is a single curved profile spun around the engine\'s centreline, which is exactly why nozzles are round — not for looks, but because a revolve is the natural geometry for something that has to guide exhaust symmetrically in every direction.',
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'You need to model a hexagonal nut with a threaded hole through the middle. Which operations, in order?',
            choices: [
              'Extrude the hexagon to make the body, then cut a circle through it',
              'Revolve the hexagon around its centre, then extrude a circle',
              'Extrude the circle first, then revolve the hexagon around it',
              'Revolve both the hexagon and the circle'
            ],
            answer: 0,
            explanation: 'The nut body has the same hexagonal cross-section all the way through, so it extrudes. The hole removes material, so it is a cut.',
            choiceFeedback: [
              null,
              'Revolving a hexagon would produce a round shape, losing the flats a wrench needs.',
              'Building the hole first leaves nothing for it to pass through.',
              'A revolved hexagon is not a hexagon — revolving makes things round about the axis.'
            ],
            xp: 10
          },
          practiceGeneratorId: 'gen-tech-extrude-revolve',
          practiceCount: 3
        },
        {
          label: 'The history you can go back and edit',
          hook: 'In good CAD, nothing you did is ever really finished.',
          teachingText: 'Every operation you perform is recorded in the FEATURE TREE — an ordered list of the steps used to build the part. This is the difference between CAD and drawing: the model is not a finished picture, it is the recipe that produced it, and the recipe stays editable. Go back to the first sketch, change a dimension, and every later feature rebuilds on the new geometry. That is what makes the parametric thinking from the last lesson actually pay off. It also means ORDER matters. A fillet applied before a hole is cut may behave differently than one applied after, and features that depend on earlier geometry will fail if you delete what they were built on. Reading a feature tree tells you not just what a part is, but how its designer thought.',
          example: 'A student models a phone stand, then decides the phone is too thick for the slot. Rather than rebuilding, they open the original sketch, change 8 mm to 11 mm, and every feature built afterward — the fillets, the base, the cable cutout — regenerates around the new size in under a second.',
          practiceGeneratorId: 'gen-tech-extrude-revolve',
          practiceCount: 3
        }
      ],
      connection: 'How an aerospace engineer uses this: a feature tree is documentation that cannot go out of date, because it IS the part. Years after a component is designed, another engineer can open it and see exactly which dimensions were deliberate and which followed from something else. On hardware that stays in service for decades, that traceability is worth as much as the geometry itself.',
      videoUrl: 'https://www.youtube.com/watch?v=UdnvGq_8rRw'
    },
    questions: [
      { id: 'q1', type: 'choice', prompt: 'What does extrude do?', choices: ['Pushes a 2D profile straight out to a given depth, creating a solid with that cross-section', 'Spins a profile around an axis', 'Rounds the sharp edges of a part', 'Removes material from an existing solid only'], answer: 0, explanation: 'The cross-section stays identical along the whole length, which suits brackets, plates, and housings.', choiceFeedback: [null, 'That describes revolve.', 'That describes a fillet.', 'Extrude can add material as well as remove it.'], xp: 10 },
      { id: 'q2', type: 'choice', prompt: 'What does revolve do?', choices: ['Spins a 2D profile around an axis, producing a shape that is round about that axis', 'Pushes a profile out to a set depth', 'Rotates the whole model on screen for viewing', 'Copies a feature in a circular pattern'], answer: 0, explanation: 'Sketch half a bottle outline, revolve it 360 degrees, and you get the whole bottle.', choiceFeedback: [null, 'That is extrude.', 'Rotating the view changes what you see, not the geometry.', 'That is a circular pattern, a different feature.'], xp: 10 },
      { id: 'q3', type: 'choice', prompt: 'What is the rule of thumb for choosing between extrude and revolve?', choices: ['Same all the way along → extrude; same all the way around → revolve', 'Always extrude first, then revolve', 'Use revolve for metal and extrude for plastic', 'Use whichever has fewer clicks'], answer: 0, explanation: 'The geometry of the shape decides, not the material or convenience.', choiceFeedback: [null, 'Neither operation must come first — it depends on the shape.', 'Material has nothing to do with which feature suits the geometry.', 'Click count is not a design criterion.'], xp: 10 },
      { id: 'q4', type: 'choice', prompt: 'Why is a rocket nozzle a revolve?', choices: ['Its bell shape is one curved profile spun around the centreline, which is the natural geometry for guiding exhaust symmetrically in every direction', 'Because revolved parts are cheaper to manufacture', 'Because nozzles must be printed rather than machined', 'Because a bell shape cannot be drawn as a sketch'], answer: 0, explanation: 'Nozzles are round for a functional reason, not an aesthetic one.', choiceFeedback: [null, 'Cost depends on the process, not on which CAD feature was used.', 'Nozzles are made by several methods including machining.', 'The bell profile is exactly what gets sketched before revolving.'], xp: 10 },
      { id: 'q5', type: 'choice', prompt: 'How are holes and slots made in CAD?', choices: ['By running an extrude or revolve in reverse to remove material — a cut', 'By deleting faces from the solid', 'By drawing them directly in 3D with no sketch', 'By reducing the part\'s overall dimensions'], answer: 0, explanation: 'The same operations that add material also subtract it.', choiceFeedback: [null, 'Deleting faces leaves an invalid solid rather than a clean hole.', 'Cuts are driven by sketched profiles like any other feature.', 'Shrinking the part does not create a hole in it.'], xp: 10 },
      { id: 'q6', type: 'choice', prompt: 'What is the feature tree?', choices: ['The ordered list of every operation used to build the part, kept editable', 'A folder structure for organising CAD files', 'A diagram of how parts connect in an assembly', 'The list of materials a part is made from'], answer: 0, explanation: 'The model is not a finished picture — it is the recipe that produced it, and the recipe stays editable.', choiceFeedback: [null, 'File organisation is separate from a part\'s construction history.', 'That describes an assembly structure, not a feature tree.', 'Materials are a property, not a build history.'], xp: 10 },
      { id: 'q7', type: 'choice', prompt: 'What happens when you change a dimension in an early sketch?', choices: ['Every later feature rebuilds on the new geometry', 'Only that sketch changes and the solid stays as it was', 'The part must be rebuilt from scratch', 'The feature tree is deleted'], answer: 0, explanation: 'This regeneration is what makes parametric modelling pay off in practice.', choiceFeedback: [null, 'The solid is generated FROM the sketch, so it updates with it.', 'Rebuilding from scratch is what parametric CAD exists to avoid.', 'The tree persists — it is what performs the rebuild.'], xp: 10 },
      { id: 'q8', type: 'choice', prompt: 'Why does the ORDER of features matter?', choices: ['Features that depend on earlier geometry will fail if what they were built on is deleted or changed', 'Later features are always more important', 'CAD software runs features alphabetically', 'Order affects the part\'s colour'], answer: 0, explanation: 'A fillet applied before a hole is cut may also behave differently than one applied after.', choiceFeedback: [null, 'Importance is not about position in the tree.', 'Features run in the order they were created, not alphabetically.', 'Colour is a display property.'], xp: 10 },
      { id: 'q9', type: 'choice', prompt: 'A phone stand\'s slot is too narrow. What is the efficient fix in a well-built model?', choices: ['Open the original sketch, change 8 mm to 11 mm, and let every later feature regenerate', 'Delete the model and start again', 'Scale the entire part up until the slot fits', 'Print it anyway and file the slot wider by hand'], answer: 0, explanation: 'Everything built afterward regenerates around the new size in under a second.', choiceFeedback: [null, 'Rebuilding discards all the work that was correct.', 'Scaling the whole part changes every other dimension too.', 'Filing by hand fixes one printed copy and leaves the model wrong.'], xp: 10 },
      { id: 'q10', type: 'choice', prompt: 'Why is a feature tree described as documentation that cannot go out of date?', choices: ['It IS the part — another engineer can see which dimensions were deliberate and which followed from something else', 'It is automatically emailed to the whole team', 'It records who edited the file and when', 'It prevents anyone from changing the design later'], answer: 0, explanation: 'On hardware in service for decades, that traceability is worth as much as the geometry itself.', choiceFeedback: [null, 'Nothing is emailed automatically.', 'Edit history is version control, a separate system.', 'The tree exists precisely to make later changes possible.'], xp: 10 }
    ]
  },
  {
    id: 'tech7-sketch-to-solid-2',
    subject: 'technology',
    tier: 1,
    quarter: 'Q3 2026-2027',
    sequenceInQuarter: 6,
    title: 'From Sketch to Solid II: Fillets, Chamfers, and Why Corners Kill',
    theme: 'Finishing features, stress concentration, and the aircraft that taught the world about square windows',
    novaIntro: {
      glossary: {
        fillet: 'A rounded internal or external edge, added to blend two surfaces together.',
        chamfer: 'A flat angled cut across an edge, rather than a rounded one.',
        shell: 'Hollowing a solid to a set wall thickness, leaving a shell rather than a block.',
        'stress concentration': 'A local spike in stress where a shape changes abruptly, especially at a sharp internal corner.',
        'metal fatigue': 'Failure caused by many repeated loading cycles, at stresses well below what would break the part in one go.'
      },
      beats: [
        {
          label: 'Rounding an edge is not decoration',
          hook: 'The most important feature on many parts is the one that looks like a finishing touch.',
          teachingText: 'A FILLET rounds an edge; a CHAMFER cuts it flat at an angle. Both are often taught as cosmetic, and both are structural. Stress does not flow smoothly around a sharp internal corner — it piles up there, producing a STRESS CONCENTRATION where the local stress is far higher than the average across the part. Round that corner with a fillet and the stress flows around the curve instead of jamming into it. A SHELL is a third finishing feature, hollowing a solid to a set wall thickness so a part is strong without being a solid block of material, which matters enormously when mass is the constraint. Chamfers have their own jobs: easing a sharp edge so it is safe to handle, and helping a part start into a hole during assembly.',
          example: 'Look at almost any load-bearing bracket and you will find its inside corners rounded rather than square. That is not styling. It is the designer moving the point of highest stress away from the exact place a crack would otherwise start.',
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'A bracket keeps cracking at the same sharp inside corner. What is the most likely fix?',
            choices: [
              'Add a fillet to round that corner so stress flows around it',
              'Make the whole bracket thinner to reduce weight',
              'Paint the corner to protect it',
              'Add a second sharp corner beside the first'
            ],
            answer: 0,
            explanation: 'A crack starting repeatedly at the same sharp internal corner is the classic signature of stress concentration.',
            choiceFeedback: [
              null,
              'Thinning the bracket increases stress everywhere, including at the corner.',
              'Paint affects corrosion and appearance, not stress distribution.',
              'Adding another sharp corner adds another place for stress to pile up.'
            ],
            xp: 10
          },
          practiceGeneratorId: 'gen-tech-fillets-stress',
          practiceCount: 3
        },
        {
          label: 'The Comet: what square windows cost',
          hook: 'The first jet airliner in the world was beautiful, revolutionary, and it came apart in mid-air.',
          teachingText: 'The de Havilland Comet entered service as the world\'s first jet airliner, and in 1954 two of them broke up in flight — BOAC Flight 781 near Elba on 10 January, at 27,000 feet, killing 35, and South African Airways Flight 201 near Naples on 8 April, at 35,000 feet, killing 21. Investigators submerged an entire fuselage in a water tank and pressurised it over and over to simulate flights. After roughly 3,060 simulated flights it failed — at the corner of a square escape hatch window. The cause was METAL FATIGUE driven by STRESS CONCENTRATION at the abrupt corners of the rectangular windows. Modern aircraft windows are rounded for exactly this reason, and every fillet on every pressurised structure since traces back to what that investigation found.',
          example: 'There is a second, subtler lesson in the Comet, and engineers consider it the more important one. De Havilland HAD fatigue-tested a fuselage — but they tested the same specimen they had already pressurised to twice normal operating pressure. That overpressure cold-worked the metal and artificially extended its fatigue life to around 16,000 cycles. Production aircraft, never overpressured, failed at roughly 1,000. The test was real, the arithmetic was fine, and the answer was still wrong, because the thing tested was not representative of the thing flown.',
          practiceGeneratorId: 'gen-tech-fillets-stress',
          practiceCount: 3
        }
      ],
      connection: 'How an aerospace engineer uses this: two rules come out of the Comet and neither has expired. First, sharp internal corners in a structure that will be loaded repeatedly are a defect, not a style choice. Second — and this is the one that catches experienced teams — a test only tells you about the specimen you tested. If the test article differs from the production article in any way that matters, a passing result can be worse than no test at all, because it buys confidence that was never earned.',
      videoUrl: 'https://www.youtube.com/watch?v=YVvKk-rGJME'
    },
    questions: [
      { id: 'q1', type: 'choice', prompt: 'What is a fillet?', choices: ['A rounded edge added to blend two surfaces together', 'A flat angled cut across an edge', 'A hollowed-out solid with uniform wall thickness', 'A hole cut through a part'], answer: 0, explanation: 'Fillets round; chamfers cut flat at an angle.', choiceFeedback: [null, 'That is a chamfer.', 'That is a shell.', 'That is a cut.'], xp: 10 },
      { id: 'q2', type: 'choice', prompt: 'What is a stress concentration?', choices: ['A local spike in stress where a shape changes abruptly, especially at a sharp internal corner', 'The average stress across a whole part', 'The maximum weight a part can carry', 'A measure of how heavy a material is'], answer: 0, explanation: 'Stress does not flow smoothly around a sharp internal corner — it piles up there.', choiceFeedback: [null, 'The whole point is that local stress far exceeds the average.', 'That is load capacity, a different quantity.', 'That is density.'], xp: 10 },
      { id: 'q3', type: 'choice', prompt: 'What does a shell feature do, and why does it matter for spacecraft?', choices: ['Hollows a solid to a set wall thickness, making a part strong without being a solid block — which matters when mass is the constraint', 'Adds a protective outer coating', 'Rounds every edge at once', 'Splits a part into two halves'], answer: 0, explanation: 'Strength without unnecessary mass is close to the central problem of aerospace structures.', choiceFeedback: [null, 'Coatings are a surface treatment, not a geometry feature.', 'Rounding edges is filleting.', 'Splitting a part is a separate operation.'], xp: 10 },
      { id: 'q4', type: 'choice', prompt: 'What are the two jobs of a chamfer named in this lesson?', choices: ['Easing a sharp edge so it is safe to handle, and helping a part start into a hole during assembly', 'Adding mass and adding colour', 'Creating threads and creating holes', 'Reducing print time and reducing cost'], answer: 0, explanation: 'A chamfered leading edge acts like a funnel when two parts come together.', choiceFeedback: [null, 'Chamfers remove material rather than adding mass, and do not affect colour.', 'Threads and holes are made by other features.', 'Any print-time effect is incidental, not the purpose.'], xp: 10 },
      { id: 'q5', type: 'choice', prompt: 'What was the de Havilland Comet?', choices: ['The world\'s first jet airliner', 'The first supersonic passenger aircraft', 'An early NASA spacecraft', 'A British fighter aircraft of the 1940s'], answer: 0, explanation: 'It was revolutionary — and in 1954 two of them broke up in flight.', choiceFeedback: [null, 'That was Concorde, much later.', 'The Comet was a commercial airliner, not a spacecraft.', 'It was a civil jet airliner, not a fighter.'], xp: 10 },
      { id: 'q6', type: 'choice', prompt: 'What did the water tank test reveal?', choices: ['After roughly 3,060 simulated flights the fuselage failed at the corner of a square escape hatch window', 'That the engines were underpowered', 'That the wings were too short', 'That the fuel was contaminated'], answer: 0, explanation: 'Investigators pressurised an entire submerged fuselage over and over to simulate flight cycles.', choiceFeedback: [null, 'Engine power was not the cause of the breakups.', 'Wing length was not implicated.', 'Fuel quality was not the issue.'], xp: 10 },
      { id: 'q7', type: 'choice', prompt: 'What is metal fatigue?', choices: ['Failure caused by many repeated loading cycles, at stresses well below what would break the part in one go', 'Metal becoming soft when it gets hot', 'Rust weakening a structure over time', 'A part bending permanently under a single heavy load'], answer: 0, explanation: 'Each pressurisation cycle did no visible damage. The accumulation did.', choiceFeedback: [null, 'That is thermal softening, a different mechanism.', 'That is corrosion.', 'That is plastic deformation from a single overload.'], xp: 10 },
      { id: 'q8', type: 'choice', prompt: 'Why are modern aircraft windows rounded?', choices: ['Rounded corners let stress flow around the curve instead of piling up at an abrupt corner', 'Rounded glass is cheaper to manufacture', 'Passengers preferred the look', 'Round windows are lighter than square ones'], answer: 0, explanation: 'Every fillet on every pressurised structure since traces back to what the Comet investigation found.', choiceFeedback: [null, 'Cost was not the driver — structural safety was.', 'Preference had nothing to do with it.', 'Weight difference is negligible compared to the fatigue problem.'], xp: 10 },
      { id: 'q9', type: 'choice', prompt: 'De Havilland DID fatigue-test a fuselage. Why did that test give the wrong answer?', choices: ['They tested a specimen already pressurised to twice operating pressure, which cold-worked the metal and extended its fatigue life to about 16,000 cycles', 'The test was never actually completed', 'They tested a wing instead of a fuselage', 'The test equipment was broken'], answer: 0, explanation: 'Production aircraft, never overpressured, failed at roughly 1,000 cycles. The test was real and the answer was still wrong.', choiceFeedback: [null, 'The test was completed — that is what makes the story instructive.', 'A fuselage was tested; the problem was its prior history.', 'The equipment worked correctly.'], xp: 10 },
      { id: 'q10', type: 'choice', prompt: 'What is the deeper engineering lesson from the Comet, beyond rounded windows?', choices: ['A test only tells you about the specimen you tested — if it differs from the production article, a passing result buys confidence that was never earned', 'Never test anything to failure', 'Always test twice as long as you think you need to', 'Prototypes should be identical in appearance to production parts'], answer: 0, explanation: 'This is the one that catches experienced teams, which is why the FAA files it under lessons learned.', choiceFeedback: [null, 'Testing to failure is valuable — the issue is what you tested.', 'Duration was not the flaw; the specimen\'s history was.', 'Appearance is irrelevant; what matters is whether the material state matches.'], xp: 10 }
    ]
  },
  {
    id: 'tech7-assemblies-tolerances',
    subject: 'technology',
    tier: 1,
    quarter: 'Q3 2026-2027',
    sequenceInQuarter: 7,
    title: 'Assemblies & Tolerances I: Making Parts Fit Together',
    theme: 'Mates, clearance versus interference, and why parts that look fine separately collide',
    novaIntro: {
      glossary: {
        assembly: 'A CAD file containing several parts positioned relative to one another.',
        mate: 'A relationship that positions one part against another — coincident, concentric, parallel, or at a set distance.',
        clearance: 'Deliberate space left between two parts so they can fit or move.',
        interference: 'Two parts occupying the same space — an error that is invisible until they are checked together.',
        'degrees of freedom': 'The number of independent ways a part can still move; fully constraining a part removes all of them.'
      },
      beats: [
        {
          label: 'Parts are easy. Assemblies are where designs fail.',
          hook: 'Every part passed inspection. The machine still would not go together.',
          teachingText: 'An ASSEMBLY is a CAD file holding several parts positioned relative to one another, and it is where most real design errors surface. Each part may be perfectly modelled on its own and still be wrong in combination. Parts are positioned using MATES — relationships rather than dragged positions, exactly like sketch constraints one level up. A coincident mate puts two faces flat against each other; a concentric mate lines up two circular features on a shared axis; a distance mate holds a set gap. Each mate removes DEGREES OF FREEDOM, the independent ways a part can still move, until the part is held exactly where it belongs. INTERFERENCE is the error to fear: two parts occupying the same space. It is invisible while you look at parts one at a time, and CAD can check for it automatically — which is one of the strongest arguments for modelling the whole assembly rather than only the pieces.',
          example: 'The drone frame from the Q1 CAD lesson is the classic case. Two components each modelled correctly, each meeting its own dimensions, and in the 3D assembly view they pass straight through one another. On a flat drawing that is nearly impossible to see. In an assembly it is a highlighted volume and a warning.',
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'A bolt must sit centred in a hole and flush against the surface. Which mates does that need?',
            choices: [
              'Concentric between the bolt shaft and the hole, plus coincident between the bolt head and the surface',
              'Two coincident mates',
              'A distance mate only',
              'No mates — drag it into position'
            ],
            answer: 0,
            explanation: 'Concentric handles the centring, coincident handles the seating. Together they leave only rotation free.',
            choiceFeedback: [
              null,
              'Coincident alone cannot centre the bolt in the hole.',
              'A distance mate sets a gap; it does not align the axes.',
              'Dragging leaves the bolt unconstrained, so it shifts whenever anything else changes.'
            ],
            xp: 10
          },
          practiceGeneratorId: 'gen-tech-assemblies-mates',
          practiceCount: 3
        },
        {
          label: 'Leave room on purpose',
          hook: 'A shaft the exact diameter of its hole will not go in.',
          teachingText: 'CLEARANCE is space left between parts deliberately, and beginners almost always leave too little because a drawing looks tidiest when things touch. In reality, two surfaces modelled at exactly the same size cannot slide together — there is nowhere for either to go, and no real part is manufactured to a perfect dimension anyway. So designers add clearance wherever parts must fit or move: a shaft slightly smaller than its bore, a slot slightly wider than the tab entering it, a gap around a component that will get warm and expand. How much clearance depends on how the part is made and what it must do, which is the subject of the next lesson. The principle is that clearance is a decision recorded in the model, not an accident you hope for.',
          example: 'Spacecraft add clearance for a reason that never arises on a desk: thermal expansion. A part in sunlight and the same part in shadow can differ by well over a hundred degrees, and metal changes size with temperature. A joint that fits perfectly in a clean room can seize or crack in orbit if nobody left it somewhere to grow.',
          practiceGeneratorId: 'gen-tech-assemblies-mates',
          practiceCount: 3
        }
      ],
      connection: 'How an aerospace engineer uses this: spacecraft are assemblies of thousands of parts built by different teams, sometimes different companies, sometimes on different continents. Nobody can hold the whole thing in their head, which is why interference checking is run on the digital assembly rather than trusted to anyone\'s memory. Finding two parts in the same place on screen costs a click. Finding it during final integration, with a launch date fixed, costs a great deal more.',
      videoUrl: 'https://www.youtube.com/watch?v=7U1F85DO784'
    },
    questions: [
      { id: 'q1', type: 'choice', prompt: 'What is an assembly in CAD?', choices: ['A file containing several parts positioned relative to one another', 'A single part with many features', 'A folder of unrelated design files', 'The instructions for building a part by hand'], answer: 0, explanation: 'It is where most real design errors surface, because parts can each be right and still be wrong together.', choiceFeedback: [null, 'That is just a part with a long feature tree.', 'An assembly holds defined relationships, not merely files in a folder.', 'Those are work instructions, a separate document.'], xp: 10 },
      { id: 'q2', type: 'choice', prompt: 'What is a mate?', choices: ['A relationship that positions one part against another — coincident, concentric, parallel, or at a set distance', 'A duplicate copy of a part', 'A material assigned to a component', 'A note attached to a drawing'], answer: 0, explanation: 'Mates are relationships rather than dragged positions — sketch constraints one level up.', choiceFeedback: [null, 'A duplicate is a copy, not a positional relationship.', 'Material is a property, not a position.', 'Annotations do not position anything.'], xp: 10 },
      { id: 'q3', type: 'choice', prompt: 'What are degrees of freedom?', choices: ['The number of independent ways a part can still move', 'How many parts an assembly contains', 'The tolerance allowed on a dimension', 'The number of mates a part is allowed'], answer: 0, explanation: 'Each mate removes degrees of freedom until the part is held exactly where it belongs.', choiceFeedback: [null, 'That is the assembly\'s part count.', 'Tolerance is a manufacturing allowance, covered in the next lesson.', 'There is no fixed limit on mates.'], xp: 10 },
      { id: 'q4', type: 'choice', prompt: 'What is interference?', choices: ['Two parts occupying the same space', 'Radio noise affecting a control system', 'A gap left deliberately between parts', 'A part that is too light for its job'], answer: 0, explanation: 'It is invisible while you look at parts one at a time, which is why CAD checks for it automatically.', choiceFeedback: [null, 'That is a different meaning of the word, from electronics.', 'A deliberate gap is clearance — the opposite.', 'Mass is unrelated to interference.'], xp: 10 },
      { id: 'q5', type: 'choice', prompt: 'Why is interference nearly impossible to spot on a flat drawing?', choices: ['Two parts can each meet their own dimensions and still overlap in three dimensions, which a 2D view does not show', 'Flat drawings are always drawn at the wrong scale', 'Interference only occurs in printed parts', 'Drawings do not include dimensions'], answer: 0, explanation: 'In an assembly it is a highlighted volume and a warning; on a drawing it is nothing at all.', choiceFeedback: [null, 'Scale is not the issue — the missing third dimension is.', 'Interference is a geometric error regardless of manufacturing method.', 'Engineering drawings are heavily dimensioned.'], xp: 10 },
      { id: 'q6', type: 'choice', prompt: 'What is clearance?', choices: ['Space left between parts deliberately, so they can fit or move', 'The maximum load a joint can carry', 'The process of removing material from a solid', 'Permission to release a design for manufacture'], answer: 0, explanation: 'Clearance is a decision recorded in the model, not an accident you hope for.', choiceFeedback: [null, 'That is load capacity.', 'That is a cut.', 'That is a sign-off, a different meaning of the word.'], xp: 10 },
      { id: 'q7', type: 'choice', prompt: 'Why will a shaft modelled at exactly the same diameter as its hole not go in?', choices: ['There is nowhere for either surface to go, and no real part is manufactured to a perfect dimension anyway', 'The shaft would be too heavy', 'CAD refuses to allow equal dimensions', 'Holes are always slightly oval'], answer: 0, explanation: 'Beginners leave too little clearance because a drawing looks tidiest when things touch.', choiceFeedback: [null, 'Mass is unrelated to whether the parts slide together.', 'CAD allows it perfectly well — reality does not.', 'Manufacturing variation is real, but the core point is that zero clearance leaves no room at all.'], xp: 10 },
      { id: 'q8', type: 'choice', prompt: 'Which of these is a reason to add clearance?', choices: ['A component that will get warm and expand', 'A part that must look symmetrical', 'A design that uses many colours', 'A model with a long feature tree'], answer: 0, explanation: 'Thermal expansion is one of the standard reasons a joint needs somewhere to grow.', choiceFeedback: [null, 'Appearance does not require clearance.', 'Colour has no physical effect.', 'Feature count says nothing about fit.'], xp: 10 },
      { id: 'q9', type: 'choice', prompt: 'Why do spacecraft need clearance for thermal expansion specifically?', choices: ['A part in sunlight and the same part in shadow can differ by well over a hundred degrees, and metal changes size with temperature', 'Space is uniformly cold, so everything shrinks equally', 'Spacecraft parts are made of materials that do not expand', 'Thermal expansion only matters during launch'], answer: 0, explanation: 'A joint that fits perfectly in a clean room can seize or crack in orbit if nobody left it somewhere to grow.', choiceFeedback: [null, 'Sunlit and shadowed surfaces differ enormously — it is not uniform.', 'Essentially all engineering materials change size with temperature.', 'Orbital temperature swings continue for the whole mission.'], xp: 10 },
      { id: 'q10', type: 'choice', prompt: 'Why is interference checking run on the digital assembly rather than trusted to memory?', choices: ['Spacecraft are assemblies of thousands of parts built by different teams, and nobody can hold the whole thing in their head', 'Because engineers are not allowed to inspect hardware', 'Because digital models are always more accurate than reality', 'Because it is required before a file can be saved'], answer: 0, explanation: 'Finding two parts in the same place on screen costs a click; finding it during final integration costs a great deal more.', choiceFeedback: [null, 'Hardware inspection happens too — the digital check comes first.', 'Models approximate reality; the value here is scale and consistency.', 'Saving has no such requirement.'], xp: 10 }
    ]
  },
  {
    id: 'tech7-assemblies-tolerances-2',
    subject: 'technology',
    tier: 1,
    quarter: 'Q3 2026-2027',
    sequenceInQuarter: 8,
    title: 'Assemblies & Tolerances II: From Model to Real Object',
    theme: 'Tolerance and fit, real 3D-printing accuracy, and what a slicer actually does',
    novaIntro: {
      glossary: {
        tolerance: 'The allowable amount a real dimension may differ from the one on the drawing.',
        fit: 'How two mating parts are intended to go together — loose enough to slide, or tight enough to hold.',
        STL: 'A common export format that describes a model\'s surface as a mesh of triangles.',
        slicer: 'Software that converts a 3D model into the layer-by-layer instructions a printer follows.',
        'layer height': 'The thickness of each printed layer — smaller means finer detail and a longer print.'
      },
      beats: [
        {
          label: 'Nothing is ever exactly the dimension',
          hook: 'There is no such thing as a part that is exactly 10 millimetres.',
          teachingText: 'Every real part differs slightly from its drawing, so every dimension that matters carries a TOLERANCE: the amount it is allowed to differ. A shaft specified as 10 mm plus or minus 0.05 mm is acceptable anywhere from 9.95 to 10.05. Tolerance is where design meets cost, because tighter tolerances demand better machines, more time, and more rejected parts — so a designer who specifies tight tolerances everywhere has not been careful, they have been expensive. The related idea is FIT: how two mating parts are meant to go together. A clearance fit slides freely, a transition fit is snug, and an interference fit is deliberately slightly too tight and must be pressed or heated together so it grips permanently. Choosing the fit is a design decision; the tolerance is how you make that choice manufacturable.',
          example: 'A part machined to plus or minus 0.1 mm and the same part 3D printed at plus or minus 0.3 mm are not interchangeable, even though the model is identical. Fit calculations depend on the real accuracy of the process — which is why "what is it made on?" is a design question, not just a shop-floor one.',
          applyItQuestion: {
            id: 'ai1',
            type: 'choice',
            prompt: 'A designer specifies the tightest possible tolerance on every dimension of a bracket. What is wrong with that?',
            choices: [
              'Tight tolerances cost time, better machines, and more rejected parts — they should be spent only where they matter',
              'Nothing — tighter is always better engineering',
              'Tolerances cannot be specified on brackets',
              'It makes the bracket heavier'
            ],
            answer: 0,
            explanation: 'Specifying tight tolerances everywhere is not carefulness, it is expense — the skill is knowing which dimensions actually need it.',
            choiceFeedback: [
              null,
              'Unnecessary precision raises cost and scrap rate without improving function.',
              'Tolerances apply to any manufactured part.',
              'Tolerance affects allowable variation, not mass.'
            ],
            xp: 10
          },
          practiceGeneratorId: 'gen-tech-tolerance-printing',
          practiceCount: 3
        },
        {
          label: 'What the printer actually receives',
          hook: 'Your 3D printer has never seen your model.',
          teachingText: 'A printer does not read a CAD file. The model is usually exported as an STL, a format describing only the surface as a mesh of triangles — no feature tree, no dimensions, no design intent, just a shell of flat facets approximating your shape. That is why a curved surface exported at low resolution prints visibly faceted: the triangles were too coarse. The STL then goes to a SLICER, software that cuts the model into horizontal layers and generates the actual path the print head follows, including LAYER HEIGHT, infill density, and any support structures needed under overhangs. This is the step where most printing problems are really decided. The same model sliced two different ways can come out strong or weak, smooth or ridged, in two hours or in nine.',
          example: 'Layer height is the clearest tradeoff in the whole process. A 0.1 mm layer height gives fine detail and a smooth surface and takes a long time; 0.3 mm is much faster and visibly ridged. Neither is correct in general. A display model wants fine layers; a rough bracket being tested for fit wants speed, because it will be reprinted three more times before it is right.',
          practiceGeneratorId: 'gen-tech-tolerance-printing',
          practiceCount: 3
        }
      ],
      connection: 'How an aerospace engineer uses this: 3D printing is genuinely used for flight hardware, including rocket engine components, precisely because it makes shapes that cannot be machined at all — internal cooling channels that wind through a part with no way to reach them with a cutter. But a printed part carries its process with it: layer direction affects strength, and a part strong in one axis can be weak in another. Knowing how a thing will be made is part of designing it, not a step that happens afterward.',
      videoUrl: 'https://www.youtube.com/watch?v=G7wnGeR_69k'
    },
    questions: [
      { id: 'q1', type: 'choice', prompt: 'What is tolerance?', choices: ['The allowable amount a real dimension may differ from the one on the drawing', 'The maximum load a part can survive', 'The gap deliberately left between two parts', 'The number of layers in a 3D print'], answer: 0, explanation: 'Every real part differs slightly from its drawing, so every dimension that matters carries one.', choiceFeedback: [null, 'That is strength or load capacity.', 'That is clearance — related, but a different idea.', 'That is a slicing setting.'], xp: 10 },
      { id: 'q2', type: 'choice', prompt: 'A shaft is specified as 10 mm plus or minus 0.05 mm. Which finished shaft is acceptable?', choices: ['9.97 mm', '10.09 mm', '9.90 mm', '10.5 mm'], answer: 0, explanation: 'The acceptable range is 9.95 to 10.05 mm, and 9.97 falls inside it.', choiceFeedback: [null, '10.09 is above the 10.05 upper limit.', '9.90 is below the 9.95 lower limit.', '10.5 is ten times the allowed deviation.'], xp: 10 },
      { id: 'q3', type: 'choice', prompt: 'Why is specifying the tightest tolerance everywhere a mistake?', choices: ['Tighter tolerances demand better machines, more time, and more rejected parts — so it is expensive rather than careful', 'Tight tolerances make parts heavier', 'CAD software cannot store tight tolerances', 'Tight tolerances always cause interference'], answer: 0, explanation: 'The skill is knowing which few dimensions actually need precision.', choiceFeedback: [null, 'Tolerance governs allowable variation, not mass.', 'Software handles any tolerance value.', 'Tight tolerances do not by themselves cause overlap.'], xp: 10 },
      { id: 'q4', type: 'choice', prompt: 'What is an interference fit?', choices: ['A fit deliberately slightly too tight, pressed or heated together so it grips permanently', 'A fit with a large gap so parts slide freely', 'A fit where two parts accidentally overlap in CAD', 'A fit that can only be made by 3D printing'], answer: 0, explanation: 'Clearance fits slide, transition fits are snug, interference fits are pressed together on purpose.', choiceFeedback: [null, 'That describes a clearance fit.', 'Accidental overlap is an interference ERROR, not an interference fit.', 'Interference fits are common in machined metal parts.'], xp: 10 },
      { id: 'q5', type: 'choice', prompt: 'Why are a part machined to ±0.1 mm and the same part printed at ±0.3 mm not interchangeable?', choices: ['Fit calculations depend on the real accuracy of the process, so the same model behaves differently', 'The printed part is a different shape', 'The machined part uses a different CAD file', 'Printed parts cannot have tolerances at all'], answer: 0, explanation: '"What is it made on?" is a design question, not just a shop-floor one.', choiceFeedback: [null, 'The nominal geometry is identical — the achievable accuracy differs.', 'The same model can feed both processes.', 'Printed parts have tolerances too; they are simply looser.'], xp: 10 },
      { id: 'q6', type: 'choice', prompt: 'What is an STL file?', choices: ['A format describing a model\'s surface as a mesh of triangles — no feature tree, no dimensions', 'A compressed copy of the original CAD file', 'A photograph of the finished print', 'The list of printer settings used for a job'], answer: 0, explanation: 'It is a shell of flat facets approximating your shape, which is why design intent does not survive the export.', choiceFeedback: [null, 'It is a different representation entirely, not a compressed CAD file.', 'No image is involved.', 'Settings live in the slicer, not the STL.'], xp: 10 },
      { id: 'q7', type: 'choice', prompt: 'Why does a curved surface sometimes print visibly faceted?', choices: ['The STL was exported at low resolution, so the triangles approximating the curve were too coarse', 'The printer was too hot', 'Curves cannot be 3D printed', 'The layer height was too small'], answer: 0, explanation: 'The mesh, not the printer, is the source of that particular faceting.', choiceFeedback: [null, 'Temperature affects adhesion and stringing, not facet count.', 'Curves print routinely when the mesh is fine enough.', 'Smaller layers give MORE detail, not less.'], xp: 10 },
      { id: 'q8', type: 'choice', prompt: 'What does a slicer do?', choices: ['Cuts the model into horizontal layers and generates the path the print head follows, including layer height, infill, and supports', 'Removes unwanted parts of the model', 'Converts a 2D sketch into a 3D solid', 'Checks an assembly for interference'], answer: 0, explanation: 'This is the step where most printing problems are really decided.', choiceFeedback: [null, 'Trimming geometry is a CAD operation.', 'That is extrude or revolve.', 'Interference checking happens in CAD.'], xp: 10 },
      { id: 'q9', type: 'choice', prompt: 'What is the tradeoff in layer height?', choices: ['0.1 mm gives fine detail and a smooth surface but takes far longer; 0.3 mm is much faster and visibly ridged', 'Smaller layers are faster and smoother', 'Layer height affects only colour', 'Larger layers always produce stronger parts'], answer: 0, explanation: 'Neither is correct in general — a display model wants fine layers, a fit-check bracket wants speed.', choiceFeedback: [null, 'Smaller layers mean more of them, so prints take longer.', 'Layer height is a geometry and time setting, not colour.', 'Strength depends on several factors, not simply larger layers.'], xp: 10 },
      { id: 'q10', type: 'choice', prompt: 'Why is 3D printing genuinely used for rocket engine components?', choices: ['It makes shapes that cannot be machined at all — such as internal cooling channels no cutter could reach', 'Because printed metal is stronger than machined metal in every direction', 'Because it removes the need for any testing', 'Because printed parts have no tolerance limits'], answer: 0, explanation: 'A printed part also carries its process with it: layer direction affects strength, so a part strong in one axis can be weak in another.', choiceFeedback: [null, 'Printed parts are often anisotropic — strength varies by direction.', 'Flight hardware is tested extensively regardless of how it is made.', 'Printed parts have tolerances like anything else.'], xp: 10 }
    ]
  }

];
