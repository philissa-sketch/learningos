// ---------------------------------------------------------------------------
// Aerospace Summer 2027 Quarterly Cumulative Exam
//
// Same confirmed assessment framework as the Q1-Q4 exams: 20-25 items,
// covering ONLY material actually taught in this quarter. This exam covers
// exactly Summer's 9 lessons (Space Suits, Reentry & Heat Shields, Wind
// Tunnels & Flight Testing, CAD I/II, Engineering Ethics I/II, Engineering
// Careers I/II) and nothing beyond them. Every question is grounded
// directly in that quarter's real lesson content (teachingText/example),
// not invented separately from what was actually taught.
//
// No `novaIntro` (skips straight to the question phase). Tagged
// `isQuarterlyExam: true` with `unlocksAfter` set to Summer's 9 lesson
// ids (one fewer than the other quarters, since Summer has 9 lessons
// instead of 10) — a real mastery gate on the quarter.
//
// 22 items, mixing multiple-choice and true/false, matching the prior
// exams' exact question format and style. This is the final quarterly
// exam of the Aerospace course.
// ---------------------------------------------------------------------------

export const aerospaceSummerExam = {
  id: 'exam-aerospace-summer-2027',
  subject: 'aerospace',
  tier: 1,
  quarter: 'Summer 2027',
  title: 'Quarterly Exam — Survival & Profession (Summer)',
  theme: 'Cumulative exam covering Space Suits, Reentry & Heat Shields, Wind Tunnels & Flight Testing, CAD, Engineering Ethics, and Engineering Careers',
  isQuarterlyExam: true,
  unlocksAfter: [
    'ae7-space-suits',
    'ae7-reentry-heat-shields',
    'ae7-wind-tunnels-flight-testing',
    'ae7-cad', 'ae7-cad-2',
    'ae7-engineering-ethics', 'ae7-engineering-ethics-2',
    'ae7-engineering-careers', 'ae7-engineering-careers-2'
  ],
  questions: [
    {
      id: 'q1',
      type: 'choice',
      prompt: "What is the main purpose of a spacesuit's pressurized layer?",
      choices: ['To maintain a safe internal pressure since space has no breathable atmosphere or pressure', 'To make the astronaut look impressive', 'To keep the suit lightweight only', 'To generate electricity'],
      answer: 0,
      explanation: "Space has essentially no pressure, so a spacesuit's most basic job is maintaining safe internal pressure around the astronaut's body.",
      choiceFeedback: [null, 'Appearance is not the engineering purpose of the pressurized layer.', 'Weight is a design consideration, but not the core purpose of pressurization.', 'Electricity generation is a separate function, not the pressurized layer’s job.'],
      xp: 10
    },
    {
      id: 'q2',
      type: 'choice',
      prompt: 'Why must astronauts "pre-breathe" pure oxygen for a couple of hours before a spacewalk?',
      choices: [
        'To purge dissolved nitrogen from their blood and avoid decompression sickness',
        'To help them stay awake during the spacewalk',
        'It is purely a tradition with no medical purpose',
        'To make the suit easier to put on'
      ],
      answer: 0,
      explanation: 'Pre-breathing pure oxygen purges nitrogen from the bloodstream, reducing the risk of decompression sickness ("the bends") when moving to the suit’s lower pressure.',
      choiceFeedback: [null, 'Pre-breathing is about a real physiological risk, not alertness.', 'This is a genuine, medically necessary safety step, not tradition.', 'Pre-breathing happens before suiting up, for a physiological reason, not to ease the suit-donning process.'],
      xp: 10
    },
    {
      id: 'q3',
      type: 'choice',
      prompt: 'What does the Primary/Portable Life Support System (PLSS) backpack provide during a spacewalk?',
      choices: [
        'Oxygen, carbon dioxide removal, cooling water circulation, power, and radio communication',
        'Only a radio for communication',
        'Only extra oxygen, with no cooling or power function',
        'Nothing — it is purely for storage of tools'
      ],
      answer: 0,
      explanation: 'The PLSS supplies oxygen, removes carbon dioxide, circulates cooling water, provides power, and carries the two-way radio — all independent of the spacecraft.',
      choiceFeedback: [null, 'The PLSS handles many functions well beyond just communication.', 'The PLSS handles multiple critical life-support functions at once, not just oxygen.', 'The PLSS is a life-support system, not a tool storage unit.'],
      xp: 10
    },
    {
      id: 'q4',
      type: 'choice',
      prompt: 'What is the dominant real cause of a spacecraft heating up dramatically during atmospheric reentry?',
      choices: [
        'Compression of air ahead of the spacecraft at extremely high speed, forming superheated plasma',
        "The spacecraft's engines burn hotter during reentry",
        'Reentry does not actually generate significant heat',
        'Reentry only generates heat if the spacecraft is damaged'
      ],
      answer: 0,
      explanation: 'Compression, not friction, is the dominant cause — extreme speed compresses air ahead of the spacecraft into superheated plasma.',
      choiceFeedback: [null, 'Engine burn is unrelated to reentry heating, which comes from atmospheric compression.', 'Reentry heating is real and extreme, reaching thousands of degrees.', 'Reentry heating happens on every reentry, regardless of spacecraft condition.'],
      xp: 10
    },
    {
      id: 'q5',
      type: 'choice',
      prompt: "True or False: A sharp, streamlined nose shape is safer for atmospheric reentry than a rounded, blunt shape.",
      choices: ['True', 'False'],
      answer: 1,
      explanation: "False — H. Julian Allen's discovery was the opposite: a blunt shape pushes the worst heat into a shockwave standing ahead of the vehicle, while a sharp nose lets the shockwave attach directly to the surface and channel heat in.",
      choiceFeedback: ["This is backwards — blunt shapes are actually safer for reentry, per Allen's discovery. The statement is False.", null],
      xp: 10
    },
    {
      id: 'q6',
      type: 'choice',
      prompt: 'What is the key difference between an ablative heat shield (like PICA-X) and a reusable ceramic tile heat shield (like the Space Shuttle used)?',
      choices: [
        'Ablative shields intentionally burn away layer by layer; reusable tiles survive reentry intact and can fly again',
        'Ablative shields can be reused indefinitely, unlike ceramic tiles',
        'There is no real difference between the two types',
        'Ceramic tiles are always heavier and never used on real spacecraft'
      ],
      answer: 0,
      explanation: 'Ablative shields sacrifice material by burning away; reusable ceramic tiles are designed to survive reentry intact.',
      choiceFeedback: [null, "It's ablative shields that burn away — reusable tiles are the ones designed to survive intact.", 'There is a genuine, significant difference in how these two shield types work.', 'Ceramic tiles were real, functioning shields used on the actual Space Shuttle.'],
      xp: 10
    },
    {
      id: 'q7',
      type: 'choice',
      prompt: 'What is the main purpose of testing a scale model in a wind tunnel before building a full-size aircraft?',
      choices: [
        'To study how air flows around the design and predict its real-world aerodynamic performance',
        'To simply display the model to investors',
        'To reduce the total weight of the final aircraft',
        'To eliminate the need for any future flight testing'
      ],
      answer: 0,
      explanation: 'A wind tunnel moves air past a stationary scale model to study airflow and predict full-size aerodynamic performance.',
      choiceFeedback: [null, 'Investor display is not the engineering purpose of wind tunnel testing.', 'Wind tunnel testing studies aerodynamics, not aircraft weight directly.', 'Even after wind tunnel testing, real flight testing is still needed to catch what simulations and models can miss.'],
      xp: 10
    },
    {
      id: 'q8',
      type: 'choice',
      prompt: 'What is a test pilot, and what did Chuck Yeager do in that role before breaking the sound barrier in 1947?',
      choices: [
        'A specially trained pilot evaluating new aircraft designs; Yeager flew the Bell X-1 dozens of times to learn its dangerous quirks first',
        'Someone who only inspects aircraft on the ground, never flying them',
        'A pilot who only flies aircraft that have already been fully certified as safe',
        'Yeager had no test pilot experience before his historic 1947 flight'
      ],
      answer: 0,
      explanation: 'A test pilot evaluates new or modified aircraft for performance and safety; Yeager flew the X-1 many times beforehand, deliberately learning its "gotchas."',
      choiceFeedback: [null, 'A test pilot specifically flies the aircraft being evaluated, not just inspects it on the ground.', 'A test pilot specifically flies aircraft that are NOT yet fully proven safe, to find out where the real limits are.', 'Yeager had extensive X-1 test flight experience before his historic 1947 flight.'],
      xp: 10
    },
    {
      id: 'q9',
      type: 'choice',
      prompt: 'What does the acronym CAD stand for?',
      choices: ['Computer-Aided Design', 'Central Aircraft Drawing', 'Coded Aerodynamic Data', 'Computerized Automated Drafting'],
      answer: 0,
      explanation: 'CAD stands for Computer-Aided Design.',
      choiceFeedback: [
          null,
          "CAD is not limited to aircraft, and it is not only drawing — engineers use it for a bridge, a bracket or a bottle rocket fin.",
          "Aerodynamic data is something you might get OUT of a CAD model, not what CAD is. The D is Design.",
          "Close — but CAD assists a designer, it does not automate one. The computer aids; the engineer decides."
        ],
      xp: 10
    },
    {
      id: 'q10',
      type: 'choice',
      prompt: 'What makes a "digital twin" different from a regular, static 3D CAD model?',
      choices: [
        'A digital twin is continuously updated with real sensor data to mirror the actual current state of its physical counterpart',
        'A digital twin is simply a nicer-looking version of the same static model',
        'A digital twin can only be used before a physical part is ever built',
        'There is no real difference between the two'
      ],
      answer: 0,
      explanation: 'A digital twin is continuously updated with real, current data, unlike a static original-design CAD model.',
      choiceFeedback: [null, 'The key difference is functional (continuous real data), not just visual.', 'A digital twin is specifically used to track a system throughout its real-world operational life.', 'There is a genuine, meaningful difference between the two.'],
      xp: 10
    },
    {
      id: 'q11',
      type: 'choice',
      prompt: 'Why do aerospace engineers often use finite element analysis (FEA) directly on a CAD model?',
      choices: [
        'It helps predict how a part will perform under real forces before it is ever physically built',
        'It replaces the need for the part to actually work',
        'It only works for very simple shapes',
        'It has no connection to real-world performance'
      ],
      answer: 0,
      explanation: 'FEA breaks a model into a mesh of small elements to predict how it responds to stress, heat, or vibration before physical testing.',
      choiceFeedback: [null, 'FEA is a prediction tool, not a substitute for the part actually functioning.', 'FEA is used on complex real-world shapes, not just simple ones.', 'FEA is specifically meant to predict real-world structural performance.'],
      xp: 10
    },
    {
      id: 'q12',
      type: 'choice',
      prompt: 'Why do aerospace companies maintain careful long-term digital archives of CAD files, sometimes for 50+ years?',
      choices: [
        'Aircraft and spacecraft often stay in service for decades and need usable files for future repairs and upgrades',
        'Old CAD files have no real future use once a part is manufactured',
        'This is only done for historical curiosity, with no practical use',
        'Files only need to remain usable for about one year after manufacturing'
      ],
      answer: 0,
      explanation: 'Aircraft like the Boeing 747 or B-52 have stayed in service for over 50 years, so their CAD files must remain usable for future engineers.',
      choiceFeedback: [null, 'Old CAD files remain genuinely useful for repairs, upgrades, and manufacturing replacement parts.', 'This archiving serves a real, practical engineering need, not mere curiosity.', 'Given multi-decade service lives, files need to remain usable far longer than just one year.'],
      xp: 10
    },
    {
      id: 'q13',
      type: 'choice',
      prompt: "Why is safety considered one of the most important ethical responsibilities of an engineer?",
      choices: ["Because engineering failures can put people's lives at risk", 'Because it makes designs look better', 'Because it is optional if a deadline is tight', 'Because it only matters for government projects'],
      answer: 0,
      explanation: 'Professional codes of ethics place duty to public safety above cost or speed, because engineering failures — especially in aerospace — can directly endanger lives.',
      choiceFeedback: [null, 'Aesthetics is not the ethical reason safety matters.', 'Engineering codes of ethics explicitly state safety should NOT be sacrificed for deadlines.', 'Public safety duty applies broadly, not only to government projects.'],
      xp: 10
    },
    {
      id: 'q14',
      type: 'choice',
      prompt: "In the Challenger disaster case study, what did engineer Roger Boisjoly do before the January 28, 1986 launch?",
      choices: [
        'He repeatedly raised documented concerns that cold temperatures could cause the O-ring seals to fail',
        'He personally approved the launch despite safety concerns',
        'He had no involvement or knowledge of any safety issue',
        'He resigned from his job with no attempt to warn anyone'
      ],
      answer: 0,
      explanation: 'Boisjoly wrote a memo in July 1985 and argued the night before launch against flying in cold conditions — but management overruled the recommendation.',
      choiceFeedback: [null, 'Boisjoly argued AGAINST launching, not for approving it.', 'Boisjoly was directly, personally involved in raising the documented concern.', 'Boisjoly actively tried to warn management, repeatedly, using real data.'],
      xp: 10
    },
    {
      id: 'q15',
      type: 'choice',
      prompt: "True or False: Thiokol management overruled the engineers' recommendation to delay the Challenger launch due to cold temperatures, and the Shuttle was lost 73 seconds after liftoff.",
      choices: ['True', 'False'],
      answer: 0,
      explanation: 'True — this is exactly what happened, and it remains one of the most widely taught engineering ethics case studies.',
      choiceFeedback: [null, 'This is a real, documented historical event covered directly in the lesson — the statement is True.'],
      xp: 10
    },
    {
      id: 'q16',
      type: 'choice',
      prompt: 'What is a "conflict of interest" for an engineer?',
      choices: [
        "A situation where an engineer's personal or financial interests could improperly influence their professional judgment",
        'Any disagreement between two engineers on a technical design choice',
        'A situation that never actually occurs in real engineering practice',
        'A formal safety inspection required before a product launch'
      ],
      answer: 0,
      explanation: 'A conflict of interest occurs when personal or financial interests could improperly bias professional judgment, like recommending a supplier a family member owns.',
      choiceFeedback: [null, 'A technical disagreement is a normal part of engineering work, not necessarily a conflict of interest.', 'Conflicts of interest are a real, recognized issue engineering codes of ethics specifically address.', 'A safety inspection is a different, separate process from a conflict of interest.'],
      xp: 10
    },
    {
      id: 'q17',
      type: 'choice',
      prompt: 'According to the NSPE (National Society of Professional Engineers) code of ethics, what must engineers "hold paramount"?',
      choices: [
        'The safety, health, and welfare of the public',
        'Loyalty to their employer above all else',
        'Meeting project deadlines above all else',
        'Personal financial success above all else'
      ],
      answer: 0,
      explanation: "The NSPE code of ethics states engineers must 'hold paramount the safety, health, and welfare of the public' — meaning it outranks loyalty to an employer or client when the two conflict.",
      choiceFeedback: [null, 'Public safety is specifically ranked ABOVE employer loyalty when the two conflict.', 'Public safety is specifically ranked ABOVE deadline pressure in engineering ethics codes.', 'Public safety, not personal financial success, is the paramount value in engineering codes of ethics.'],
      xp: 10
    },
    {
      id: 'q18',
      type: 'choice',
      prompt: 'What degree do most aerospace engineers typically need to enter the field?',
      choices: ["A bachelor's degree in aerospace engineering or a related field", 'No formal education', 'Only a high school diploma', 'Only an online certificate'],
      answer: 0,
      explanation: "Most aerospace engineering positions require at least a bachelor's degree in aerospace engineering or a closely related field.",
      choiceFeedback: [null, "A bachelor's degree is the typical minimum requirement for this field.", 'A high school diploma alone is not typically sufficient for this specific career.', 'An online certificate alone is not the typical path into this specific career.'],
      xp: 10
    },
    {
      id: 'q19',
      type: 'choice',
      prompt: "According to the U.S. Bureau of Labor Statistics, roughly what was the median annual wage for aerospace engineers as of May 2024, and what was the projected job growth through 2034?",
      choices: [
        'About $134,830, with about 6% growth — faster than the average for all occupations',
        'About $30,000, with declining job prospects',
        'About $500,000, with no meaningful job growth',
        'The BLS does not track this occupation at all'
      ],
      answer: 0,
      explanation: 'The median annual wage was about $134,830 as of May 2024, with about 6% projected growth from 2024 to 2034, faster than average.',
      choiceFeedback: [null, 'This significantly understates both the real wage and the real growth outlook.', 'This significantly overstates the real median wage figure.', 'The BLS does track this occupation, with real, documented figures.'],
      xp: 10
    },
    {
      id: 'q20',
      type: 'choice',
      prompt: 'What is a Professional Engineer (PE) license, and how common is it specifically in aerospace compared to civil or mechanical engineering?',
      choices: [
        'A credential certifying independent professional practice; it is actually less common in aerospace than in civil or mechanical engineering',
        'A requirement every aerospace engineer must have before any employment at all',
        'A basic requirement just to graduate college',
        "A synonym for 'intern'"
      ],
      answer: 0,
      explanation: 'A PE license certifies specific experience and exam requirements for independent practice, but it is less common in aerospace since much aerospace work happens under federal or corporate oversight rather than requiring an independent public stamp of approval.',
      choiceFeedback: [null, 'PE licensure is not a universal requirement for every aerospace engineering job.', 'A PE license is a professional credential earned after graduation and work experience, not a graduation requirement.', 'A PE license is a real professional credential, not simply another word for an entry-level position.'],
      xp: 10
    },
    {
      id: 'q21',
      type: 'choice',
      prompt: "What is the typical path to becoming licensed as a Professional Engineer?",
      choices: [
        'Pass the Fundamentals of Engineering (FE) exam, gain several years of work experience, then pass the PE exam for the discipline',
        'Simply apply and pay a fee, with no exams required',
        'Complete only a single exam right after high school graduation',
        'PE licensure requires no work experience at all'
      ],
      answer: 0,
      explanation: 'The typical path is the FE exam around graduation, several years (commonly around four) of relevant work experience, then the discipline-specific PE exam.',
      choiceFeedback: [null, 'PE licensure requires passing real exams, not just an application and fee.', 'PE licensure requires a college-level exam and real work experience, not just a high school exam.', 'Several years of relevant work experience is a genuine, required part of the PE path.'],
      xp: 10
    },
    {
      id: 'q22',
      type: 'choice',
      prompt: "True or False: Communication and teamwork skills are considered unimportant for aerospace engineers, since technical expertise alone is all that matters on a real project.",
      choices: ['True', 'False'],
      answer: 1,
      explanation: 'False — communication and teamwork skills are consistently cited as important alongside technical expertise, since real aerospace projects involve large teams that must coordinate closely.',
      choiceFeedback: ['This is the opposite of what the lesson teaches — these skills genuinely matter alongside technical expertise. The statement is False.', null],
      xp: 10
    }
  ]
};
