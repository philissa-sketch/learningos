// ---------------------------------------------------------------------------
// Reading & Literature lessons — Tier 1 (Junior Engineer).
// Passages are original prose written for this curriculum (not reproduced
// from any source) so there are no copyright concerns, but every fact is
// checked against real historical record.
//
// Per parent instruction: history/biography reading content in this
// curriculum is about Black Americans in aerospace. `recommendedBooks` are
// real, published, verified titles — checked before being added here, not
// invented. Ages noted are publisher-stated reading levels.
//
// New lesson fields used only by this subject (Lesson Engine handles both
// generically, so future subjects can reuse either or neither):
//   passage          — reading text shown once before the questions begin
//   recommendedBooks — [{ title, author, note }] shown on the debrief
// ---------------------------------------------------------------------------

export const readingLessons7 = [
  {
    id: 'r7-bessie-coleman',
    subject: 'reading',
    strand: 'reading',
    tier: 1,
    title: "First to Earn Her Wings: Bessie Coleman",
    theme: 'Biography — main idea, vocabulary in context, and inference',
    passage: `Bessie Coleman grew up in Texas in the early 1900s, the daughter of sharecroppers who picked cotton for a living. From a young age, she loved to read and dreamed of a life bigger than the one she saw around her. She moved to Chicago as a young woman, working as a manicurist, but she couldn't stop thinking about the barnstorming pilots she read about in the newspaper, who thrilled crowds with daring stunts in the sky.

Bessie wanted to fly more than anything, but every flight school in the United States turned her away. Some rejected her because she was a woman. Others rejected her because she was Black. Refusing to give up, she learned French and saved enough money to travel to France, where a flight school agreed to train her. In 1921, she became the first Black American woman, and the first Native American woman, to earn a pilot's license anywhere in the world.

When she returned home, Bessie became a barnstorming pilot herself, performing daring loops and dives at air shows across the country. She often refused to perform at shows that would not allow Black spectators to attend, using her fame to push for change. She dreamed of opening a flying school for Black Americans, but she died in a flying accident in 1926, before that dream came true. Decades later, pilots still study her story as one of the earliest triumphs over impossible odds in aviation history.`,
    recommendedBooks: [
      {
        title: 'Fly High! The Story of Bessie Coleman',
        author: 'Louise Borden & Mary Kay Kroeger',
        note: 'Ages 9–12 — a fuller biography written for readers his age.'
      }
    ],
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What is the main idea of this passage?',
        choices: [
          'Bessie Coleman was a manicurist in Chicago',
          'Bessie Coleman overcame discrimination to become a pioneering pilot',
          'Bessie Coleman invented the airplane',
          'Bessie Coleman only ever flew in France'
        ],
        answer: 1,
        explanation: 'The passage traces her journey from facing rejection to becoming a licensed pilot and using her platform for change — that arc is the main idea, not any single detail.',
        choiceFeedback: [
          "That is true, she did work as a manicurist, but it is one stop along the way rather than what the whole passage is built around.",
          null,
          "The passage never says this, and it did not happen; she learned to fly planes that other people had already designed and built.",
          "She trained in France, but the passage also describes her flying in shows back in the United States, so the word only does not hold up."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: "What does 'barnstorming' most likely mean, based on how it's used in the passage?",
        choices: [
          'Performing daring flying stunts for crowds',
          'Building barns for farmers',
          'Studying weather patterns',
          'Repairing airplane engines'
        ],
        answer: 0,
        explanation: 'The passage describes barnstorming pilots as ones who "thrilled crowds with daring stunts in the sky" — the context defines the word.',
        choiceFeedback: [
          null,
          "This grabs the barn hiding inside the word, but the sentence around it is about crowds watching stunts in the sky, not about building anything.",
          "Nothing near the word mentions clouds, storms, or forecasts. Let the words sitting right beside barnstorming tell you what it means.",
          "Mechanics matter to flying, but the passage links barnstorming to what crowds watched pilots do in the air, not to work done on the ground."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'Why did Bessie Coleman travel to France?',
        choices: [
          'To visit family',
          'Because U.S. flight schools refused to train her due to her race and gender',
          'To compete in an air race',
          'To study French literature'
        ],
        answer: 1,
        explanation: 'The passage states every U.S. flight school turned her away, so she went to France, where a school agreed to train her.',
        choiceFeedback: [
          "This is a reasonable guess about why anyone crosses an ocean, but the passage gives one specific reason for the trip and family is not it.",
          null,
          "Racing shows up in some pilots' stories, but this passage ties the trip to getting trained in the first place, before she could race anyone.",
          "She did learn French, though that was a tool for something else. Ask what she went to France to do once she got there."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: "Based on the passage, what can you infer about Bessie Coleman's character?",
        choices: [
          'She gave up easily when faced with obstacles',
          'She was determined and used her success to help others',
          'She preferred to stay out of the spotlight',
          'She was mainly interested in making money'
        ],
        answer: 1,
        explanation: 'She kept pursuing flying despite repeated rejection, and later refused to perform for segregated crowds — both point to determination used in service of others.',
        choiceFeedback: [
          "The passage shows the opposite pattern: she was turned away again and again, and each time she found another way to keep going.",
          null,
          "She performed for large crowds and spoke publicly about flying, so choosing to stay out of view does not match anything she actually did.",
          "Her shows did earn money, but the passage highlights a choice that cost her money, when she refused to fly for segregated crowds."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'r7-mae-jemison',
    subject: 'reading',
    strand: 'reading',
    tier: 1,
    title: 'Mae Jemison: Reaching for the Stars',
    theme: "Biography — main idea, vocabulary, supporting details, and author's purpose",
    passage: `Mae Jemison grew up in Chicago, where she spent hours in the library reading about astronomy and science. Even as a young girl, she was certain she would go to space one day, even though at the time no American woman of any background had ever flown there, and no Black American of any gender had either.

Mae didn't wait for someone to hand her that future. She studied hard, earning a degree in chemical engineering before going on to become a doctor. She worked as a physician in the Peace Corps, treating patients in West Africa, before applying to NASA's astronaut program. In 1987, NASA selected her to become an astronaut.

On September 12, 1992, Mae Jemison became the first Black American woman to travel to space, flying aboard the space shuttle Endeavour on an eight-day mission. During the flight, she conducted science experiments and represented, in her own words, the idea that space belongs to everyone who works hard enough to reach it.

After leaving NASA, Mae didn't stop pushing boundaries. She started a company to bring science education to students who might not otherwise have access to it, and she has led research into the idea of interstellar travel, imagining how humanity might one day reach other stars. For Mae Jemison, becoming an astronaut wasn't the end of the journey. It was only the beginning.`,
    recommendedBooks: [
      {
        title: 'Mae Among the Stars',
        author: 'Roda Ahmed',
        note: 'Ages 4–8 — a picture book on her childhood dream, good as a quick companion read.'
      }
    ],
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What is the main idea of this passage?',
        choices: [
          'Mae Jemison was only interested in medicine',
          'Mae Jemison combined science, medicine, and determination to become the first Black American woman in space, and kept breaking new ground afterward',
          'Mae Jemison never left Chicago',
          "Mae Jemison's main job was in the Peace Corps"
        ],
        answer: 1,
        explanation: 'The passage covers her path through engineering, medicine, spaceflight, and her later work — the throughline is her sustained drive to keep pushing further.',
        choiceFeedback: [
          "Medicine is a real part of her story, but the passage also covers engineering and spaceflight, and a main idea has to hold all of it.",
          null,
          "Chicago is where she grew up. The passage follows her far past it, so stopping there leaves out almost the entire arc.",
          "The Peace Corps was one job among several. A main idea names the pattern running through her whole career, not a single position on the way."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: "What does the word 'boundaries' mean in the phrase 'didn't stop pushing boundaries'?",
        choices: [
          'Fences around a yard',
          'Limits on what people believed was possible',
          'Rules of a sport',
          'Borders between countries'
        ],
        answer: 1,
        explanation: "In context, 'pushing boundaries' means going beyond accepted limits — here, limits on what she (and others) could achieve.",
        choiceFeedback: [
          "This is the everyday meaning of the word, but pushing boundaries is figurative here, and nothing in the phrase is something you could touch.",
          null,
          "Sports rules are one kind of limit, which makes this tempting, but nothing in the passage is about games or competitions.",
          "Borders are real lines drawn on a map. The limits she pushed against were ideas people held about what she could achieve."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'What job did Mae Jemison have before becoming an astronaut?',
        choices: [
          'Airline pilot',
          'Physician in the Peace Corps',
          'Elementary school teacher',
          'Newspaper reporter'
        ],
        answer: 1,
        explanation: 'The passage states she worked as a physician in the Peace Corps, treating patients in West Africa, before applying to NASA.',
        choiceFeedback: [
          "She rode to space aboard a shuttle rather than flying passenger aircraft, and the passage names a different profession she held before NASA.",
          null,
          "She has worked hard to encourage students, which makes this feel close, but the passage names an actual paid job and teaching school is not it.",
          "Reporting never appears in this passage. Go back to the sentence that says what she was doing right before she applied to NASA."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: "What is the author's main purpose in the final paragraph?",
        choices: [
          'To argue that being an astronaut is the hardest job in the world',
          'To show that Mae Jemison kept achieving new goals even after her spaceflight',
          "To criticize NASA's astronaut program",
          'To describe how airplanes work'
        ],
        answer: 1,
        explanation: 'The paragraph lists what she did after NASA — starting a company, researching interstellar travel — to show the spaceflight was a beginning, not an ending.',
        choiceFeedback: [
          "The paragraph is not ranking jobs by difficulty at all. Look at what it actually lists her doing and ask why the author included that list.",
          null,
          "Nothing in the paragraph finds fault with NASA. The focus is on what she chose to do next, not on anything the agency did wrong.",
          "That would belong in a science explanation. This paragraph is about one person's career after her flight, not about how machines work."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'r7-hidden-figures',
    subject: 'reading',
    strand: 'reading',
    tier: 1,
    title: 'Hidden Figures: The Human Computers of NASA',
    theme: 'Biography — main idea, vocabulary in context, and supporting details',
    passage: `Long before NASA had electronic computers, it relied on brilliant mathematicians to calculate the complex equations needed to send rockets into space. Many of these mathematicians were Black American women working at NASA's Langley Research Center in Virginia, and for years, their contributions went largely unrecognized outside NASA itself.

Katherine Johnson was one of these mathematicians. Her calculations verified the flight path for John Glenn's orbit of Earth in 1962, and she later helped calculate the trajectory for the Apollo 11 mission that landed the first humans on the moon. Glenn was so confident in Johnson's work that he asked engineers to have her personally check the numbers produced by an electronic computer before he would agree to fly.

Dorothy Vaughan worked alongside Johnson as a mathematician and became NASA's first Black American supervisor. When NASA introduced electronic computers, Vaughan taught herself and her team the programming language FORTRAN, making sure their skills would remain essential in a changing workplace.

Mary Jackson, another mathematician at Langley, became NASA's first Black female engineer after petitioning a Virginia court for permission to take the segregated night classes required for the position. All three women worked during a time when they faced both racial segregation and gender discrimination at their own workplace, and all three found ways to succeed anyway. Their story remained largely untold until the book and film Hidden Figures brought it to a wide audience decades later.`,
    recommendedBooks: [
      {
        title: 'Hidden Figures Young Readers\u2019 Edition',
        author: 'Margot Lee Shetterly',
        note: 'Ages 8–12 — the full story of Katherine Johnson, Dorothy Vaughan, Mary Jackson, and Christine Darden.'
      },
      {
        title: 'Reaching for the Moon: The Autobiography of NASA Mathematician Katherine Johnson',
        author: 'Katherine Johnson',
        note: 'Ages 10 and up — her own account, in her own words, of the Apollo era and the discrimination she navigated.'
      },
      {
        title: 'Counting on Katherine: How Katherine Johnson Saved Apollo 13',
        author: 'Helaine Becker',
        note: 'Ages 5–8 — a shorter picture-book biography, good for a quick companion read.'
      }
    ],
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What is the main idea of this passage?',
        choices: [
          'Electronic computers built the Apollo rockets by themselves',
          "Brilliant Black American women mathematicians made essential, long-uncredited contributions to NASA's early space missions",
          "Katherine Johnson was NASA's first supervisor",
          'NASA never employed human mathematicians'
        ],
        answer: 1,
        explanation: 'The passage centers on the essential, underrecognized work of Johnson, Vaughan, and Jackson at NASA.',
        choiceFeedback: [
          "Electronic computers do appear in the passage, but they did not work on their own, and machines are not who this passage is really about.",
          null,
          "This attaches a supervisor role to Johnson, and even if the title were right, one person's job title is far too small to be a main idea.",
          "The entire passage is about mathematicians NASA did employ, so this choice contradicts the pages you just read."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: "What does 'trajectory' most likely mean, as used in the passage?",
        choices: [
          'The path an object follows through space',
          'A type of rocket engine',
          'A mathematical equation used only by computers',
          'A NASA job title'
        ],
        answer: 0,
        explanation: "The passage uses 'trajectory' in the context of calculating a flight path for a moon landing — the path an object travels.",
        choiceFeedback: [
          null,
          "Engines push a spacecraft along its path, but the word in that sentence names the path itself, not the hardware doing the pushing.",
          "Equations were used to find it, yet trajectory names the thing being calculated rather than the math or the machine doing the calculating.",
          "Job titles really do fill this passage, which makes this tempting, but here the word is describing a flight, not a person's position."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: "Why did John Glenn want Katherine Johnson to check the computer's numbers?",
        choices: [
          "He didn't trust electronic computers to be as reliable as her calculations",
          'He was her supervisor',
          'She had built the computer herself',
          'It was required by NASA policy for every flight'
        ],
        answer: 0,
        explanation: 'The passage states he was "so confident in Johnson\'s work" that he wanted her to verify the computer\'s output before flying.',
        choiceFeedback: [
          null,
          "The passage does not place him above her in any chain of command. He was the astronaut about to fly the mission she checked.",
          "She checked the numbers the machine produced. Nothing in the passage says she designed, built, or assembled the computer itself.",
          "This turns one astronaut's personal request into an agency-wide rule the passage never mentions. Watch for answers that quietly widen a specific fact."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'What did Mary Jackson have to do to become an engineer?',
        choices: [
          'Move to a different state',
          'Petition a court for permission to take required, segregated night classes',
          'Build her own rocket',
          'Retire from her mathematician job'
        ],
        answer: 1,
        explanation: 'The passage states she petitioned a Virginia court for permission to take the segregated night classes required for the engineering position.',
        choiceFeedback: [
          "Moving away is one way someone might find open classes, but the passage describes her getting access to classes right where she already lived.",
          null,
          "Building things is what engineers often do, which makes this sound right, but her obstacle was permission to take classes, not a construction project.",
          "She moved forward into engineering rather than stepping away from work. Check exactly what the passage says she asked the court to allow."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'r7-guion-bluford',
    subject: 'reading',
    strand: 'reading',
    tier: 1,
    title: 'Guion Bluford: First Black American in Space',
    theme: "Biography — main idea, vocabulary in context, and author's purpose",
    passage: `Guion Bluford grew up loving airplanes, building model kits and reading about flight. After earning a degree in aerospace engineering, he joined the United States Air Force, where he became a fighter pilot and flew more than 140 combat missions during the Vietnam War. He continued his education after his military service, eventually earning a doctorate in aerospace engineering.

In 1978, NASA selected Bluford to join its astronaut program, at a time when the space agency was actively working to bring more diversity into its ranks of astronauts. On August 30, 1983, he became the first Black American to travel to space, launching aboard the space shuttle Challenger on mission STS-8.

Bluford went on to fly on three more shuttle missions over the course of his career, working on scientific experiments and satellite deployments in orbit. He often said he hoped his flight would show young people, especially young Black students, that a career in aerospace was something they could genuinely pursue. After retiring from NASA, he continued working in the aerospace industry and remained an advocate for STEM education, encouraging the next generation of engineers to reach for careers among the stars.`,
    recommendedBooks: [],
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What is the main idea of this passage?',
        choices: [
          'Guion Bluford was only ever a fighter pilot',
          'Guion Bluford combined military and engineering experience to become the first Black American in space, and used his story to encourage future engineers',
          'Guion Bluford built the space shuttle Challenger',
          "Guion Bluford's career ended after the Vietnam War"
        ],
        answer: 1,
        explanation: "The passage traces his path from aerospace engineering through the Air Force to NASA, and closes on his advocacy for future engineers — that's the throughline.",
        choiceFeedback: [
          "He truly was a fighter pilot, but the words only ever cut off the engineering and the spaceflight that the rest of the passage covers.",
          null,
          "He flew aboard the shuttle. The passage does not credit him with designing or constructing the orbiter, and flying a craft is not building it.",
          "Vietnam comes early in his story. The paragraphs that follow it are the ones carrying the main idea, so read past that point."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: "What does 'diversity' mean in the phrase 'diversity into its ranks of astronauts'?",
        choices: [
          'Having astronauts from a variety of backgrounds',
          'Having astronauts of many different heights',
          'Testing many different rockets',
          'Training astronauts in many different countries'
        ],
        answer: 0,
        explanation: 'In context, NASA "bringing more diversity into its ranks" refers to broadening the range of backgrounds represented among its astronauts.',
        choiceFeedback: [
          null,
          "This takes variety in the most physical way possible. The phrase is about who the astronauts were, not about their measurements.",
          "Rockets do get tested, but the sentence says diversity in its ranks of astronauts, which means the word is describing people.",
          "Where astronauts train is not what the sentence is counting. Ask what quality the astronauts themselves are said to bring."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'What did Guion Bluford do during the Vietnam War?',
        choices: [
          'He served as a doctor',
          'He flew more than 140 combat missions as a fighter pilot',
          'He worked as a NASA engineer',
          'He was a war correspondent'
        ],
        answer: 1,
        explanation: 'The passage states he became a fighter pilot and flew more than 140 combat missions during the Vietnam War.',
        choiceFeedback: [
          "Medicine belongs to a different person in this unit. Bluford's wartime role put him in a cockpit, so check whose paragraph you are in.",
          null,
          "He did work as an engineer, but the passage places his NASA years well after the war, so this is the right job at the wrong moment.",
          "Reporting on a war and flying in one are very different roles, and the passage clearly gives him the flying one."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: "Why does the author include Bluford's hope that his flight would inspire young Black students?",
        choices: [
          'To show that Bluford saw his flight as meaningful beyond his own personal achievement',
          'To prove that Bluford disliked being an astronaut',
          'To argue that NASA no longer needed astronauts',
          'To explain how rockets are built'
        ],
        answer: 0,
        explanation: "Including that hope shows the author wants readers to see his flight's significance for others, not just as a personal milestone.",
        choiceFeedback: [
          null,
          "Hoping your flight will inspire other people reads as caring about the work, not as resenting it or wishing you were somewhere else.",
          "His hope is aimed at the young people who come next, which points toward more astronauts in the future, not fewer.",
          "That would be a how-it-works explanation. This sentence is about what his flight might mean to students watching him."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'r7-context-clues',
    subject: 'reading',
    strand: 'reading',
    tier: 1,
    title: 'Context Clues & Vocabulary: Mission Briefings',
    theme: 'Determining word meaning from context in short mission-style sentences',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt:
          'The engineer scrutinized every bolt on the fuselage, checking each one twice before signing off on the inspection. What does "scrutinized" most likely mean?',
        choices: ['Examined closely and carefully', 'Ignored completely', 'Painted a new color', 'Removed and replaced'],
        answer: 0,
        explanation: 'Checking each bolt twice before signing off signals a careful, close examination — that\'s what "scrutinized" means here.',
        choiceFeedback: [
          null,
          "Checking each bolt twice is the exact opposite of ignoring it. Let the actions described in the sentence set the meaning of the word.",
          "Nothing in the sentence involves color or appearance. The engineer is inspecting the fuselage, not decorating it.",
          "He signs off on an inspection rather than swapping parts out, so the word describes careful looking rather than fixing."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt:
          'After the storm passed, the launch was no longer in jeopardy, and the team confirmed the countdown would proceed as planned. What does "jeopardy" most likely mean?',
        choices: ['Celebration', 'Danger or risk', 'A type of fuel', 'A scheduled delay'],
        answer: 1,
        explanation: 'Since the storm passing removed the launch from being "in jeopardy," and the countdown could then proceed, jeopardy means danger or risk.',
        choiceFeedback: [
          "The team is surely relieved, but the word describes the dangerous condition the storm created, not the mood once that condition lifted.",
          null,
          "No fuel is named anywhere in this sentence. The phrase in jeopardy is describing the state the launch was in before the storm passed.",
          "A delay is something jeopardy might cause, not what the word itself means. Keep a cause separate from its result."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt:
          'The rookie astronaut felt a mix of exhilaration and nerves as the rocket cleared the tower. What does "exhilaration" most likely mean?',
        choices: ['Exhaustion', 'Boredom', 'A feeling of great excitement', 'Sadness'],
        answer: 2,
        explanation: 'Paired with "nerves" during a thrilling moment like liftoff, exhilaration describes intense excitement.',
        choiceFeedback: [
          "Liftoff is tiring for a crew, but this feeling is paired with nerves at a thrilling moment, which points to energy rather than being worn out.",
          "Boredom does not fit a rookie astronaut watching a rocket clear the tower. The sentence is describing a rush of strong feeling.",
          null,
          "Nerves are uncomfortable, so sadness feels nearby, but the word is paired with nerves as a contrast to them rather than a match."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt:
          'Mission Control had to improvise a new plan after the primary antenna failed unexpectedly. What does "improvise" most likely mean?',
        choices: [
          'To create a solution on the spot, without advance preparation',
          'To follow a written manual exactly',
          'To cancel the mission entirely',
          'To repeat the same plan again'
        ],
        answer: 0,
        explanation: 'Needing a "new plan" after an unexpected failure means coming up with something on the spot — that\'s what "improvise" means.',
        choiceFeedback: [
          null,
          "Following a manual exactly is what they could not do. The failure was unexpected, so no page in the book covered it.",
          "They put together a new plan instead of stopping, so the word names what they did next rather than what they gave up on.",
          "Repeating the same plan is the opposite of what happened here, since the old plan depended on an antenna that had just failed."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'r7-charles-bolden',
    subject: 'reading',
    strand: 'reading',
    tier: 1,
    title: 'Charles Bolden: From Rejection to NASA Administrator',
    theme: "Biography — main idea, vocabulary in context, and supporting details",
    passage: `Charles Bolden grew up in Columbia, South Carolina, at a time when the American South was still legally segregated. As a high school student, he dreamed of attending the U.S. Naval Academy, but he was turned down for an official nomination by his state's congressional delegation. Rather than give up, he wrote directly to President Lyndon B. Johnson, and he was eventually admitted to the Academy, graduating in 1968.

Bolden became a Marine Corps pilot and flew more than 100 combat missions during the Vietnam War. After his military service, he trained as a test pilot, and in 1980, NASA selected him to become an astronaut. Over his career, Bolden flew on four space shuttle missions, including the 1990 flight that carried the Hubble Space Telescope into orbit, and he commanded two of those missions.

In 2009, President Barack Obama appointed Bolden to lead NASA as its Administrator, making him the first Black American to hold that position permanently. During his time as Administrator, Bolden oversaw NASA's transition away from the space shuttle program and guided new missions, including the Curiosity rover's landing on Mars. From a rejected college application to leading the entire space agency, Bolden's career shows how persistence can open doors that once seemed permanently closed.`,
    recommendedBooks: [],
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What is the main idea of this passage?',
        choices: [
          'Charles Bolden was only ever a Marine Corps pilot',
          'Charles Bolden overcame early rejection to become an astronaut and eventually the first Black American to lead NASA',
          'Charles Bolden built the Hubble Space Telescope',
          "Charles Bolden's career ended in 1968"
        ],
        answer: 1,
        explanation: 'The passage traces his path from a rejected Naval Academy nomination through his astronaut career to leading NASA — that arc of persistence is the main idea.',
        choiceFeedback: [
          "Marine aviation is a real part of his record, but the passage keeps going well past it, and only ever shuts the door too early.",
          null,
          "He flew the mission that carried Hubble into orbit. Deploying a telescope and building one are two different jobs.",
          "That year sits inside his story rather than at the end of it. The passage follows him for decades after that point."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: "What does 'persistence' mean, as used in the passage's final sentence?",
        choices: [
          'Giving up quickly when something is difficult',
          'Continuing to try despite setbacks or rejection',
          'Working alone without any help',
          "Following someone else's plan exactly"
        ],
        answer: 1,
        explanation: 'The passage shows Bolden repeatedly working past rejection — that\'s what "persistence" describes.',
        choiceFeedback: [
          "This is the opposite of what the passage shows. After each setback he looked for another route, and that behavior is what the word names.",
          null,
          "He worked alongside crews and even asked a president for help, so doing everything without support does not describe him.",
          "Following a plan exactly is not the point here. Persistence is about what you do when the plan you had falls apart."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: "What did Bolden do after his state's congressional delegation rejected his Naval Academy nomination?",
        choices: [
          'He gave up on attending the Academy',
          'He wrote directly to President Lyndon B. Johnson',
          'He joined the Air Force instead',
          'He moved to a different state'
        ],
        answer: 1,
        explanation: 'The passage states he wrote directly to President Johnson and was eventually admitted.',
        choiceFeedback: [
          "He clearly did not give up, because the passage goes on to describe him attending the Academy and graduating from it.",
          null,
          "The Marines, not the Air Force, is the branch this passage connects him to. Small mix-ups like this change the whole timeline.",
          "Moving might have found him a different delegation, but the passage describes him going over their heads instead of around them."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'What historic mission did Bolden pilot in 1990?',
        choices: [
          'The first shuttle flight ever flown',
          'The mission that deployed the Hubble Space Telescope',
          'The first Mars rover landing',
          'The final shuttle flight'
        ],
        answer: 1,
        explanation: 'The passage states his 1990 flight carried the Hubble Space Telescope into orbit.',
        choiceFeedback: [
          "The first shuttle flight came years earlier with a different crew, and the question gives you a specific year to match against the text.",
          null,
          "Mars rovers do not appear in this passage at all. Keep the mission tied to what the paragraph in front of you actually names.",
          "The shuttle program ran for many years after 1990, so this places his flight at the wrong end of the timeline."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'r7-lonnie-johnson',
    subject: 'reading',
    strand: 'reading',
    tier: 1,
    title: 'Lonnie Johnson: From NASA Engineer to Inventor',
    theme: 'Biography — main idea, vocabulary in context, and inference',
    passage: `Lonnie Johnson grew up in Mobile, Alabama, where he loved taking things apart to see how they worked and building his own toys and rockets from spare parts. He studied mechanical and nuclear engineering at Tuskegee University, and went on to work as an engineer for both the U.S. Air Force and NASA's Jet Propulsion Laboratory, where he helped design systems for the Galileo mission to Jupiter.

While Johnson's day job involved advanced spacecraft engineering, he spent his evenings and weekends tinkering with his own inventions. One night in 1982, while testing a homemade heat pump that used water instead of chemical refrigerant, he connected it to his bathroom sink and accidentally blasted a powerful stream of water across the room. Instead of seeing only a mess, Johnson saw an idea.

That accidental invention eventually became the Super Soaker, a water gun that used air pressure to shoot water farther than any toy before it. After years of refining the design and negotiating with toy companies, the Super Soaker launched in 1989 and went on to sell hundreds of millions of units worldwide. Johnson holds more than 100 patents, and he continues to invent new technology today, including more efficient batteries and solar power systems. His story shows how curiosity and careful engineering can turn an accident into an invention that changes how kids everywhere play.`,
    recommendedBooks: [
      {
        title: 'Lonnie Johnson: NASA Scientist and Inventor of the Super Soaker',
        author: 'Lucia Raatma',
        note: 'Ages 6–9 — a short, illustrated biography following his path from NASA engineer to inventor.'
      }
    ],
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What is the main idea of this passage?',
        choices: [
          'Lonnie Johnson only ever built toys',
          'Lonnie Johnson combined serious aerospace engineering experience with inventive curiosity to create one of the best-selling toys in history',
          'Lonnie Johnson worked exclusively at NASA his entire career',
          "Lonnie Johnson's invention failed commercially"
        ],
        answer: 1,
        explanation: 'The passage connects his aerospace engineering background to the accidental invention that became the Super Soaker.',
        choiceFeedback: [
          "The toy is the famous part, but the passage spends much of its space on his engineering work, so only leaves out half of who he is.",
          null,
          "NASA is one chapter of his career. The passage also covers the inventing he did on his own time, outside any agency.",
          "The passage calls it one of the best selling toys in history, which is the opposite of a product that failed."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: "What does 'tinkering' most likely mean, based on how it's used in the passage?",
        choices: [
          'Experimenting and making adjustments to something as a hobby',
          'Repairing broken household appliances for pay',
          'Studying for a school exam',
          'Traveling to a new city'
        ],
        answer: 0,
        explanation: 'The passage describes him "tinkering with his own inventions" in his spare time — informal experimenting.',
        choiceFeedback: [
          null,
          "In this passage the tinkering happens in his spare time on his own ideas, not as paid repair work done for other people.",
          "Studying and tinkering both take real effort, but one is reading toward a test and the other is hands-on experimenting with objects.",
          "Nothing about travel appears anywhere near the word. Look instead at what he was doing with his free hours at home."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'What accident led to the idea for the Super Soaker?',
        choices: [
          'A rocket engine malfunctioned during testing',
          'A homemade heat pump blasted water across his bathroom',
          'A toy company approached him with a concept',
          'He read about it in a science magazine'
        ],
        answer: 1,
        explanation: 'The passage describes the heat pump test that blasted water across the room as the origin of the idea.',
        choiceFeedback: [
          "Rocket engines match his day job, which makes this feel right, but the accident the passage describes happened at home instead.",
          null,
          "A toy company entered the story later. The idea itself arrived before any company was involved, so the order here is backwards.",
          "Reading about an idea is not the same as stumbling into one, and the passage describes something that happened to him directly."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: "Based on the passage, what can you infer about Johnson's approach to unexpected results?",
        choices: [
          'He avoided taking any risks in his work',
          'He saw unexpected results as opportunities rather than only mistakes',
          'He immediately abandoned the heat pump project',
          'He only trusted ideas that came from official assignments'
        ],
        answer: 1,
        explanation: 'The passage states that "instead of seeing only a mess, Johnson saw an idea" — he treated the accident as an opportunity.',
        choiceFeedback: [
          "Testing a homemade heat pump in your own bathroom is not exactly risk free. The passage shows him experimenting freely, not avoiding chances.",
          null,
          "He carried the water idea forward, which is very different from walking away from the project in frustration.",
          "The Super Soaker grew out of his own spare-time work, so official assignments were plainly not the only place his ideas came from."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'r7-annie-easley',
    subject: 'reading',
    strand: 'reading',
    tier: 1,
    title: 'Annie Easley: From Human Computer to Rocket Scientist',
    theme: 'Biography — main idea, vocabulary in context, and supporting details',
    passage: `Long before most people had ever used a computer, the word "computer" often referred to a person, not a machine. Annie Easley became one of these human computers in 1955, when she answered a newspaper article about two sisters working at a laboratory in Cleveland, Ohio, for an organization called NACA, which would later become NASA. She was hired within two weeks, becoming one of only four Black American employees in her division at the time.

Easley spent years performing complex mathematical calculations by hand for NASA's engineers and scientists. When electronic computers began to replace human calculators, Easley didn't get left behind. She taught herself computer programming languages, including one called FORTRAN, and became a skilled programmer instead.

Easley's programming work became essential to the Centaur rocket program, a high-powered upper-stage rocket that helped launch numerous satellites and spacecraft, including the Cassini mission to Saturn decades later. She also contributed to early research on battery technology that would eventually influence today's hybrid and electric vehicles.

Later in her 34-year NASA career, Easley took on an additional role as an equal employment opportunity counselor, helping resolve workplace discrimination complaints involving race, gender, and age. In 2021, years after her death, the International Astronomical Union named a crater on the Moon in her honor, recognizing a career built on adapting, teaching herself new skills, and helping others do the same.`,
    recommendedBooks: [
      {
        title: 'Women in Science and Technology: Annie Easley',
        author: 'M. M. Eboch',
        note: 'Ages 6–9 — an illustrated biography with a glossary and comprehension activities.'
      }
    ],
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What is the main idea of this passage?',
        choices: [
          'Annie Easley only ever performed calculations by hand',
          'Annie Easley adapted from human computer to skilled programmer, making essential contributions to NASA\u2019s rocket programs',
          'Annie Easley invented the Centaur rocket by herself',
          'Annie Easley worked in nursing before joining NASA'
        ],
        answer: 1,
        explanation: 'The passage traces her shift from manual calculation to programming, and her essential Centaur rocket contributions.',
        choiceFeedback: [
          "Hand calculation is where she began, and most of the passage is about what she did once that part of the job changed.",
          null,
          "Her programming work mattered enormously to Centaur, but a whole rocket program is built by many people, so this overstates it.",
          "Nursing never appears in this passage. Be careful not to fill in a career the text does not give her."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: "What does 'adapting' most likely mean, based on how the passage uses it?",
        choices: [
          'Refusing to change any habits or skills',
          'Adjusting and learning new skills as circumstances changed',
          'Moving to a new city for a job',
          'Retiring early from a career'
        ],
        answer: 1,
        explanation: 'The passage describes her learning programming when electronic computers replaced human calculators — adjusting to a changing role.',
        choiceFeedback: [
          "Refusing to change is the opposite of what she did when the work shifted under her feet.",
          null,
          "Moving is one way people adjust to change, but this passage ties the word to learning new skills rather than to a new address.",
          "Retiring brings a career to an end. This word is describing how she kept hers going through a big change."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'How did Easley respond when electronic computers began replacing human calculators?',
        choices: [
          'She retired from NASA',
          'She taught herself programming languages like FORTRAN',
          'She refused to learn the new technology',
          'She transferred to a different agency'
        ],
        answer: 1,
        explanation: 'The passage states she taught herself computer programming languages, including FORTRAN.',
        choiceFeedback: [
          "She stayed on and changed roles. Retiring would have ended the part of her story the passage cares about most.",
          null,
          "The passage shows her learning the new machines rather than digging in against them, so this reverses her response.",
          "Switching agencies is how some people handle change, but the text keeps her at NASA doing a different kind of work."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: "What rocket program became central to Easley's NASA career?",
        choices: [
          'The Saturn V rocket',
          'The Centaur upper-stage rocket',
          'The Space Shuttle main engine',
          'The Mercury capsule'
        ],
        answer: 1,
        explanation: 'The passage states her programming work became essential to the Centaur rocket program.',
        choiceFeedback: [
          "Saturn V is the most famous NASA rocket, which makes it an easy guess, but the passage names a different program as hers.",
          null,
          "Shuttle engines belong to a later stretch of NASA history. The passage ties her work to an upper-stage rocket instead.",
          "Mercury was NASA's early crewed capsule program, not the rocket program the passage places at the center of her career."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'r7-main-idea-practice',
    subject: 'reading',
    strand: 'reading',
    tier: 1,
    title: 'Main Idea Practice: Mission Reports',
    theme: 'Identifying the main idea in short nonfiction paragraphs',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt:
          'Airplane wings are shaped so that air moves faster over the top than underneath. This creates lower pressure above the wing, which helps generate the upward force called lift. Without this careful shape, called an airfoil, airplanes would need much more speed or power to get off the ground.\n\nWhat is the main idea of this paragraph?',
        choices: [
          'Air pressure has nothing to do with flight',
          'The airfoil shape of a wing helps generate the lift needed for flight',
          'Airplanes cannot fly without extremely powerful engines',
          'Wings are shaped only for appearance'
        ],
        answer: 1,
        explanation: 'The paragraph explains how the airfoil shape creates lift — that mechanism is the main idea, not any single supporting detail.',
        choiceFeedback: [
          "The paragraph says the reverse: lower pressure above the wing is exactly what helps create lift, so pressure is central here.",
          null,
          "Power is mentioned, but only to say the airfoil shape reduces how much you need. That is a supporting detail, not the point.",
          "The whole paragraph explains what the shape does to the air, which means looks are not the reason wings are built that way."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt:
          "Satellites orbit Earth at different altitudes depending on their job. Weather satellites often orbit far out, where they can watch large sections of the planet at once. Communication satellites frequently sit in a special orbit that matches Earth's rotation, so they appear to stay in the same spot in the sky. GPS satellites orbit somewhere in between.\n\nWhat is the main idea of this paragraph?",
        choices: [
          'All satellites orbit at the exact same altitude',
          'Different satellites use different orbits depending on the job they need to do',
          'GPS satellites are the only satellites in use today',
          'Weather satellites and communication satellites do the same job'
        ],
        answer: 1,
        explanation: 'The paragraph gives three examples, each showing orbit choice depends on the satellite\'s purpose — that pattern is the main idea.',
        choiceFeedback: [
          "The paragraph deliberately lists three different orbits, so this choice contradicts the examples it spends its whole space giving.",
          null,
          "GPS is one example out of three. A main idea has to account for the weather and communication satellites too.",
          "They are both satellites, but the paragraph contrasts their orbits precisely because the jobs they do are different."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt:
          'Robotic rovers like Curiosity and Perseverance are designed to survive extreme conditions on Mars, including intense cold, dust storms, and radiation. Engineers build these rovers with specialized wheels, radioisotope power sources, and shielded electronics so they can operate for years without a human ever visiting to repair them.\n\nWhat is the main idea of this paragraph?',
        choices: [
          'Mars rovers are simple machines with no special design considerations',
          "Mars rovers are engineered with specialized features to survive and operate for years in Mars's harsh environment",
          'Humans regularly travel to Mars to fix the rovers',
          "Mars has a mild climate similar to Earth's"
        ],
        answer: 1,
        explanation: 'The paragraph lists specialized features that all serve one purpose: surviving Mars\'s harsh, unattended conditions.',
        choiceFeedback: [
          "The paragraph lists special wheels, special power sources, and shielded electronics, which is the opposite of a simple machine.",
          null,
          "The paragraph says no human ever visits to repair them, and that is exactly why the engineering has to hold up alone.",
          "Intense cold, dust storms, and radiation are named in the very first sentence, so mild does not match the text."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt:
          'Aerospace engineers increasingly use 3D printing, also called additive manufacturing, to build rocket engine parts. This process builds a part layer by layer from metal powder, which can reduce the number of separate pieces needed and cut down on manufacturing time compared to traditional machining methods.\n\nWhat is the main idea of this paragraph?',
        choices: [
          'Aerospace has no use for 3D printing',
          '3D printing lets aerospace engineers build complex rocket parts more efficiently than traditional methods',
          '3D printed parts are always weaker than traditionally made parts',
          'Rocket engines cannot be manufactured using modern techniques'
        ],
        answer: 1,
        explanation: 'The paragraph explains the efficiency benefits of 3D printing for rocket parts — that benefit is the main idea.',
        choiceFeedback: [
          "The paragraph opens by saying engineers increasingly use 3D printing, so this choice turns the first sentence upside down.",
          null,
          "Strength is never compared in this paragraph. The comparison it makes is about fewer pieces and less time than traditional machining.",
          "3D printing is itself a modern technique, so saying it cannot be done contradicts the whole thing being described."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'r7-inference-practice',
    subject: 'reading',
    strand: 'reading',
    tier: 1,
    title: 'Inference Practice: Reading Between the Lines',
    theme: 'Drawing logical conclusions from what a passage implies but does not state directly',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt:
          'After the wind tunnel test, the engineers frowned at their data sheets and immediately scheduled a redesign meeting for the next morning.\n\nWhat can you infer from this sentence?',
        choices: [
          'The test results were exactly what they expected',
          'The test results revealed a problem that needed to be addressed',
          'The engineers were satisfied and moved on to the next project',
          'The wind tunnel itself was broken'
        ],
        answer: 1,
        explanation: 'Frowning at the data and scheduling an urgent redesign meeting implies the results showed an unwelcome problem.',
        choiceFeedback: [
          "Frowning at the data and calling a meeting for the next morning is not how people react to results that matched what they expected.",
          null,
          "A redesign meeting means going back to the same design, which is the opposite of being finished and moving on.",
          "This is a cause you could imagine, but the sentence points at the data sheets, not at the tunnel itself. Inference still needs evidence."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt:
          'Even though the launch had been delayed three times that week, the ground crew showed up before sunrise, ran through the checklist without complaint, and double-checked every connection twice.\n\nWhat can you infer about the ground crew?',
        choices: [
          'They were careless about their work',
          'They were dedicated and thorough despite the repeated setbacks',
          'They wanted the launch to fail',
          'They were unfamiliar with the checklist procedure'
        ],
        answer: 1,
        explanation: 'Showing up early, not complaining, and double-checking everything despite delays implies dedication and thoroughness.',
        choiceFeedback: [
          "Double-checking every connection twice is careful work, so every detail in the sentence pulls against this reading.",
          null,
          "Wanting a launch to fail would not get anyone out of bed before sunrise to run the checklist properly.",
          "They ran the checklist without complaint, which suggests they knew it well rather than that they were struggling with it."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt:
          "The young engineer's hands trembled slightly as she reached for the microphone, but her voice was steady and clear when she began presenting the mission results to the room of senior scientists.\n\nWhat can you infer about the engineer?",
        choices: [
          'She was completely unprepared for the presentation',
          'She felt nervous but was still prepared and composed enough to present well',
          'She refused to present the results',
          'She had given this exact presentation many times before with no nerves at all'
        ],
        answer: 1,
        explanation: 'Trembling hands suggest nerves, but a steady, clear voice implies she was prepared and composed despite that nervousness.',
        choiceFeedback: [
          "Trembling hands point to nerves, not to missing preparation. The steady, clear voice is the clue about how ready she actually was.",
          null,
          "She reached for the microphone and began presenting, so refusing does not fit what the sentence plainly describes her doing.",
          "This swings too far the other way. The trembling hands are right there in the sentence, telling you she felt something."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt:
          'The satellite stopped transmitting data exactly as it passed behind the far side of the Moon, and resumed transmitting the moment it came back into view.\n\nWhat can you infer caused the interruption?',
        choices: [
          'The satellite was damaged',
          'The Moon blocked the radio signal between the satellite and Earth',
          "The satellite's power ran out",
          'The mission had ended'
        ],
        answer: 1,
        explanation: 'The interruption lining up exactly with passing behind the Moon, and resuming exactly when it came back into view, implies the Moon physically blocked the signal.',
        choiceFeedback: [
          "Damage would not fix itself the instant the satellite came back into view, and the signal returned immediately once it did.",
          null,
          "Power does not run out and then come back exactly on schedule. The timing here lines up with the satellite's position instead.",
          "A finished mission would stay silent for good, but this signal came back, so whatever stopped it was temporary."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'r7-summarizing-practice',
    subject: 'reading',
    strand: 'reading',
    tier: 1,
    title: 'Summarizing Practice: Mission Recaps',
    theme: 'Choosing the sentence that best summarizes a short passage',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt:
          "In 1969, NASA's Apollo 11 mission successfully landed the first humans on the Moon. Astronauts Neil Armstrong and Buzz Aldrin walked on the lunar surface and collected rock samples, while Michael Collins orbited above in the command module. The mission proved that human spaceflight to another world was possible.\n\nWhich sentence best summarizes this passage?",
        choices: [
          'Michael Collins never left the command module during Apollo 11',
          'Apollo 11 was the first mission to successfully land humans on the Moon, a historic achievement in space exploration',
          'NASA has never sent humans to the Moon',
          'Neil Armstrong worked alone on the entire mission'
        ],
        answer: 1,
        explanation: 'A good summary captures the overall achievement, not an isolated detail like one astronaut staying in orbit.',
        choiceFeedback: [
          "Collins staying in the command module is a real detail from the passage, but a summary has to cover the whole mission, not one crew member's post.",
          null,
          "The passage opens by saying the landing succeeded, so this flips the passage into its opposite instead of shortening it.",
          "Three astronauts are named here, two walking and one orbiting above. Saying he worked alone drops most of the people the passage is about."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt:
          "Rockets need to overcome Earth's gravity to reach space, which requires enormous amounts of fuel. Multi-stage rockets solve part of this problem by dropping empty fuel tanks and used engine sections during flight, making the remaining rocket lighter and more efficient as it continues toward orbit.\n\nWhich sentence best summarizes this passage?",
        choices: [
          'Rockets never need much fuel to reach space',
          'Multi-stage rockets drop used parts during flight to become lighter and more efficient as they climb toward orbit',
          'Rockets become heavier as they use fuel',
          'Gravity has no effect on rocket launches'
        ],
        answer: 1,
        explanation: 'The summary captures the core mechanism — shedding weight in stages — rather than a contradicted or unrelated detail.',
        choiceFeedback: [
          "The very first sentence says reaching space takes enormous amounts of fuel, so this reverses the problem the passage sets out to explain.",
          null,
          "Staging works because the rocket gets lighter as empty tanks drop away. You have the mechanism running backwards.",
          "Gravity is the whole reason all that fuel is needed. Removing it erases the problem the multi-stage design was built to solve."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt:
          "The International Space Station is a research laboratory that orbits Earth, built and operated by multiple countries working together. Astronauts aboard the station conduct experiments in biology, physics, and materials science that would be difficult or impossible to perform on Earth, thanks to the station's microgravity environment.\n\nWhich sentence best summarizes this passage?",
        choices: [
          'The International Space Station is run by a single country',
          'The International Space Station is an international research lab in orbit, where scientists use microgravity to conduct experiments',
          'Astronauts on the station do not perform any experiments',
          'The space station is located on the Moon'
        ],
        answer: 1,
        explanation: 'This captures both key facts — international operation and its research purpose — without misstating either.',
        choiceFeedback: [
          "The passage says multiple countries built and run the station together, so this changes a stated fact rather than condensing it.",
          null,
          "Experiments in biology, physics, and materials science are named directly. A summary cannot delete the station's main purpose.",
          "The station orbits Earth. Space words blur together easily, so check where the passage actually places the thing before you answer."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt:
          'Early aviation pioneers faced enormous skepticism, with some experts insisting heavier-than-air flight was impossible. The Wright brothers spent years testing gliders and engines, carefully studying failed attempts, before achieving the first powered, controlled flight in 1903.\n\nWhich sentence best summarizes this passage?',
        choices: [
          'The Wright brothers succeeded on their very first attempt with no testing',
          'Despite widespread doubt, the Wright brothers achieved the first powered, controlled flight after years of careful testing',
          'Experts were confident heavier-than-air flight was easy',
          'The Wright brothers gave up on their idea after facing criticism'
        ],
        answer: 1,
        explanation: 'This captures both the skepticism they faced and the years of testing that led to their success.',
        choiceFeedback: [
          "Years of testing gliders and engines is stated plainly. This turns their slow, careful work into instant luck.",
          null,
          "Some experts insisted that kind of flight was impossible. You have the experts' opinion pointed the opposite direction from the passage.",
          "They met doubt and kept working until they flew in 1903. Ending the story with quitting throws away the outcome the passage builds toward."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'r7-literary-analysis',
    subject: 'reading',
    strand: 'reading',
    tier: 1,
    title: 'Literary Analysis: The Long Countdown',
    theme: 'Theme, character motivation, tone, and textual evidence in a short fiction excerpt',
    passage: `Jax pressed his palm against the cool metal of the simulator pod, watching the countdown numbers blur past on the screen. Three years of training had led to this moment, but his stomach twisted with a fear he hadn't expected: not fear of failure, but fear of finally finding out whether he was good enough.

Behind him, his instructor cleared her throat. "You know the numbers. You've run this sequence forty times. What's different now?"

"Now it counts," Jax said quietly.

"It always counted," she said. "The simulator doesn't care if you're scared. It only cares whether you do the work anyway."

Jax exhaled slowly, set his hands on the controls, and waited for zero. When the countdown hit one, his hands were steady.`,
    recommendedBooks: [],
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What is the central theme of this passage?',
        choices: [
          'Simulators are more important than real missions',
          'Courage means acting despite fear, not the absence of it',
          "Training is unnecessary if you're naturally talented",
          'Instructors should never challenge their students'
        ],
        answer: 1,
        explanation: 'Jax is afraid, but acts anyway — his hands are steady by the end despite the fear, not because the fear disappeared.',
        choiceFeedback: [
          "The simulator is the setting, not the point. A theme says something about people, not about which piece of equipment matters more.",
          null,
          "Nothing here says talent replaces work, and the instructor's line points the other way, toward doing the work. This idea comes from outside the story.",
          "The instructor's challenge is what steadies Jax. Reading her question as something the story warns against reverses its effect on him."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: "What is the source of Jax's fear, according to the passage?",
        choices: [
          'He is afraid of his instructor',
          'He is afraid of finally finding out whether he is good enough',
          'He is afraid the simulator will malfunction',
          'He is afraid of failing a written exam'
        ],
        answer: 1,
        explanation: 'The passage states directly: "not fear of failure, but fear of finally finding out whether he was good enough."',
        choiceFeedback: [
          "She is the one speaking when the fear shows up, so it is easy to pin the fear on her. The passage names what he fears, and it is not his instructor.",
          null,
          "The machine works fine in this scene. You have swapped a fear about himself for a fear about the equipment.",
          "No exam appears anywhere in the scene. When a passage states a character's fear outright, use the words it gives you instead of imagining a classroom."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: "How would you describe the tone of the instructor's dialogue?",
        choices: ['Mocking and dismissive', 'Firm but supportive', 'Angry and impatient', 'Indifferent and bored'],
        answer: 1,
        explanation: 'She challenges him directly ("What\'s different now?") but her point — that the simulator only cares if you do the work — is meant to steady him, not tear him down.',
        choiceFeedback: [
          "Her question is blunt, and blunt can sound cruel if you hear the tone without the aim. She is pushing him toward the work, not laughing at him.",
          null,
          "Being direct is not the same as being angry. Nothing in her words shows temper or rushing, only a steady point about what the simulator asks of him.",
          "Someone who did not care would not stop to challenge him at all. The effort she spends on him is evidence against this."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: "What does the detail 'his hands were steady' at the end suggest about Jax?",
        choices: [
          'He had become numb to the mission',
          'He overcame his fear enough to act with control',
          'He was no longer paying attention',
          'He had given up on the mission'
        ],
        answer: 1,
        explanation: 'Steady hands despite the fear established earlier show he moved forward with control, not that the fear vanished.',
        choiceFeedback: [
          "Numb would mean the feeling is gone. Steady hands show him holding the fear and moving anyway, which is the harder thing.",
          null,
          "Steadiness at the controls is a sign of focus, not of drifting off. Read the detail as a measure of control.",
          "He is moving forward at the end, not walking away. That is the opposite of quitting, and the detail sits at that moment for a reason."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'r7-technical-reading',
    subject: 'reading',
    strand: 'reading',
    tier: 1,
    title: 'Technical Reading: Pre-Launch Checklist',
    theme: 'Following sequence, safety instructions, and precise meaning in a technical procedure',
    passage: `MODEL ROCKET PRE-LAUNCH CHECKLIST

Step 1: Inspect the rocket body for cracks or damage before igniter installation.
Step 2: Insert the igniter fully into the engine nozzle, then attach the igniter clips, making sure they do not touch each other.
Step 3: Clear the launch area to a minimum safe distance of 15 feet for engines under D-class power.
Step 4: Connect the launch controller and verify the safety key is removed and held by the range safety officer until the countdown begins.
Step 5: Announce a countdown from 5, insert the safety key, and press the launch button only after confirming all personnel are clear.
Step 6: If the rocket does not ignite within 5 seconds, wait at least 60 seconds before approaching the pad to check the igniter.`,
    recommendedBooks: [],
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'According to the checklist, what must happen before the igniter is installed?',
        choices: [
          'The launch area must be cleared',
          'The rocket body must be inspected for cracks or damage',
          'The safety key must be inserted',
          'The countdown must begin'
        ],
        answer: 1,
        explanation: 'Step 1 requires inspecting the rocket body for damage before igniter installation in Step 2.',
        choiceFeedback: [
          "Clearing the area is a real step in this checklist, just not the one placed before igniter installation. Sequence questions need the right step, not only a true one.",
          null,
          "The safety key comes later, near countdown. Putting it before the igniter would arm the rocket while hands are still at the pad.",
          "The countdown is where the checklist ends, not a step before it. This flips the order of the whole procedure."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: "Why must the igniter clips not touch each other, based on where that instruction appears in the checklist?",
        choices: [
          'To prevent an accidental early ignition',
          'To keep the rocket lightweight',
          'To make installation easier',
          'To save battery power'
        ],
        answer: 0,
        explanation: 'This safety instruction appears right after igniter installation — touching clips could complete a circuit and fire the igniter unexpectedly, before the crew is ready.',
        choiceFeedback: [
          null,
          "Weight matters in rocketry, so this sounds sensible, but the instruction sits in the safety warning right after the igniter goes in. Placement tells you its purpose.",
          "The rule limits what you may do during installation rather than smoothing it. A caution is about danger, not convenience.",
          "Touching clips would complete a circuit, not merely drain one. The risk is current firing the igniter, not the cost of electricity."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'Who is responsible for holding the safety key until the countdown begins?',
        choices: [
          "The rocket's designer",
          'The range safety officer',
          'Any nearby spectator',
          'The igniter manufacturer'
        ],
        answer: 1,
        explanation: 'Step 4 specifically assigns the safety key to the range safety officer until the countdown begins.',
        choiceFeedback: [
          "Designing the rocket and running the range are different jobs. The checklist hands this key to the person in charge of pad safety.",
          null,
          "The point of naming one officer is to keep the key with one trained person. Handing it to whoever is standing nearby undoes that.",
          "The manufacturer is not at your launch site. Watch for answers that borrow a word from the checklist and attach it to the wrong role."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'If the rocket fails to ignite, what should happen before anyone approaches the pad?',
        choices: [
          'Approach immediately to fix it',
          'Wait at least 60 seconds before approaching',
          'Remove the safety key right away',
          'Add a second igniter immediately'
        ],
        answer: 1,
        explanation: 'Step 6 requires waiting at least 60 seconds — a misfire could still ignite unexpectedly if approached too soon.',
        choiceFeedback: [
          "A misfired igniter can still fire on its own. This is exactly the reaction the waiting rule exists to prevent.",
          null,
          "Removing the key is part of making the pad safe, but the procedure puts time first, before anyone walks toward the rocket.",
          "Adding hardware to a rocket that might still ignite puts you at the pad at the worst possible moment. No step in the checklist allows this."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'r7-research-skills',
    subject: 'reading',
    strand: 'reading',
    tier: 1,
    title: 'Research Skills: Finding Reliable Information',
    theme: 'Evaluating source credibility, primary vs. secondary sources, and search strategy',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt:
          "A student researching the exact thrust specifications of the Saturn V rocket finds two sources: NASA's official history archive, and a fan-made forum post with no citations. Which source is more reliable, and why?",
        choices: [
          "The forum post, because it's more recent",
          "NASA's official archive, because it's a primary organizational source with verifiable data",
          'Both are equally reliable',
          'Neither source, since only textbooks are reliable'
        ],
        answer: 1,
        explanation: "An official archive from the organization that built and flew the rocket is a far more verifiable source than an uncited forum post.",
        choiceFeedback: [
          "Newer is not the same as reliable. A recent post with no citations still gives you nothing you can check.",
          null,
          "One source built and flew the rocket, the other cites nothing. Calling every source equal skips the judgment the question is asking you to make.",
          "Textbooks are useful, but they are summaries of records like NASA's. A rule that rejects the original source is too strict to be right."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: "What is a 'primary source'?",
        choices: [
          'A summary written by someone who did not directly witness or create the original event or data',
          'A firsthand account or original document, like a mission report written by the engineers who ran the mission',
          'A fictional story based on real events',
          'Any website found on the first page of search results'
        ],
        answer: 1,
        explanation: 'A primary source comes directly from someone involved in or who created the original event or data, not a later summary of it.',
        choiceFeedback: [
          "That describes a secondary source. The two terms are easy to swap, so anchor on primary meaning first, straight from the person or place it came from.",
          null,
          "Fiction retells events with invention added. A primary source is a record made by someone who was actually there.",
          "Search ranking measures popularity, not closeness to the event. Where a page lands tells you nothing about who wrote it."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt:
          'A student wants to know how many crewed missions have landed on the Moon. Which search strategy would likely give the most accurate, useful results?',
        choices: [
          '"moon" (a single, very broad word)',
          '"crewed Moon landing missions NASA" (specific keywords)',
          '"space" (a single, very broad word)',
          'Copying an entire essay question into the search bar'
        ],
        answer: 1,
        explanation: 'Specific keywords that name the exact topic produce far more targeted, useful results than a single broad word or a full sentence.',
        choiceFeedback: [
          "One broad word returns everything from tides to song lyrics. Your search has to name the thing you actually want to count.",
          null,
          "This is even wider than the topic, and it drops the two ideas that matter most, crewed and landing.",
          "A full sentence buries the key terms among ordinary words like how many and have. Pull out the words that name the topic instead."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: "Why is it important to check the publication date of a source about current space missions?",
        choices: [
          'Older sources are always better because they are more established',
          'Newer information may have been discovered or changed since an older source was published',
          'Publication dates never matter for research',
          'Only sources published today can be trusted'
        ],
        answer: 1,
        explanation: 'Space missions, technology, and mission counts change over time — an older source may simply be out of date, not wrong at the time it was written.',
        choiceFeedback: [
          "Age can mean established, but for missions still underway it more often means out of date. The word always is doing too much work here.",
          null,
          "For a topic that changes month to month, the date is one of the first things worth checking.",
          "That would rule out nearly every good source. Checking a date means weighing it against how fast the topic changes, not demanding it be brand new."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'r7-ronald-mcnair',
    subject: 'reading',
    strand: 'reading',
    tier: 1,
    title: 'Ronald McNair: Physicist Among the Stars',
    theme: "Biography — main idea, vocabulary in context, and supporting details",
    passage: `Ronald McNair grew up in Lake City, South Carolina, the son of an auto mechanic and a schoolteacher. Even as a boy he had a gift for figuring out how things worked, earning him the nickname "Gizmo." He excelled in school despite growing up amid racial discrimination in the segregated South, and went on to earn a physics degree from North Carolina A&T State University in 1971.

McNair then pursued a doctorate in physics at the Massachusetts Institute of Technology, specializing in a cutting-edge field: chemical lasers, which use chemical reactions to produce laser light. He earned his PhD in 1976 and became a staff physicist studying lasers at a research laboratory in California.

In 1978, NASA selected McNair as an astronaut from a pool of about 11,000 applicants — one of only 35 chosen. In February 1984, he flew aboard the space shuttle Challenger, becoming the second Black American to travel to space. During that mission, he operated the shuttle's robotic arm to support a fellow astronaut's historic untethered spacewalk.

McNair was selected for a second mission, and on January 28, 1986, he and six crewmates were killed when the space shuttle Challenger broke apart shortly after launch. MIT later renamed its Center for Space Research in his honor, and a national scholarship program for underrepresented students, the McNair Scholars Program, continues to carry his name today.`,
    recommendedBooks: [],
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What is the main idea of this passage?',
        choices: [
          'Ronald McNair was only ever a schoolteacher',
          'Ronald McNair overcame early hardship to become an accomplished physicist and astronaut whose legacy continues today',
          'Ronald McNair built the space shuttle Challenger',
          "Ronald McNair's career ended when he earned his PhD"
        ],
        answer: 1,
        explanation: "The passage traces his path from a working-class childhood through physics research to spaceflight, closing on the lasting legacy of programs and buildings named in his honor.",
        choiceFeedback: [
          "The passage follows him into physics research and spaceflight. The word only shrinks a full career into something the passage never claims.",
          null,
          "He flew aboard Challenger; he did not build it. Flying a vehicle and building one are separate roles, and the passage keeps them separate.",
          "The PhD is a turning point partway through, not the end. A main idea has to cover what came after it too."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: "What does 'chemical lasers' most likely refer to, based on how the passage describes them?",
        choices: [
          'Lasers that use chemical reactions to produce laser light',
          'A type of telescope used to study chemistry',
          'A safety device used during rocket launches',
          'A type of spacesuit material'
        ],
        answer: 0,
        explanation: 'The passage defines the term directly: lasers "which use chemical reactions to produce laser light."',
        choiceFeedback: [
          null,
          "The word chemical pulled you toward chemistry as a school subject. The passage defines the term right where it appears, so use its own words.",
          "This attaches the term to launch equipment, but the passage places chemical lasers inside his physics research, not out on the pad.",
          "A laser is a beam of light, not a fabric. Check that your guess still fits the kind of thing the word names."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: "What did McNair do during his 1984 Challenger mission?",
        choices: [
          'He operated the robotic arm to support a spacewalk',
          'He piloted the shuttle back to Earth alone',
          'He built the shuttle before launch',
          'He remained at mission control on the ground'
        ],
        answer: 0,
        explanation: 'The passage states he operated the robotic arm to support a fellow astronaut\'s historic untethered spacewalk.',
        choiceFeedback: [
          null,
          "Bringing a shuttle home was the commander and pilot's work, and never one person's alone. The passage gives McNair a different job on this flight.",
          "Building the orbiter happened years earlier and by other people entirely. Keep a crew member's mission duties separate from manufacturing.",
          "He was aboard the shuttle for this flight. Supporting a crewmate's spacewalk was done from inside the orbiter, not from a console on the ground."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'What happened to McNair on January 28, 1986?',
        choices: [
          'He retired from NASA',
          'He and six crewmates were killed when the Challenger broke apart after launch',
          'He completed a successful second spaceflight',
          'He was selected for a third mission'
        ],
        answer: 1,
        explanation: 'The passage states the Challenger broke apart shortly after launch, killing McNair and six crewmates.',
        choiceFeedback: [
          "That date marks the Challenger accident, not a career decision. When a passage ties a specific date to an event, match the date to that event.",
          null,
          "This was indeed his second flight, which makes the answer tempting, but the passage says the shuttle broke apart shortly after launch.",
          "Nothing in the passage points past this date. Filling in a hopeful next step is adding to the text rather than reading it."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'r7-victor-glover',
    subject: 'reading',
    strand: 'reading',
    tier: 1,
    title: 'Victor Glover: To the Moon and Back',
    theme: 'Biography — main idea, vocabulary in context, and inference',
    passage: `Victor Glover grew up in Pomona, California, wanting to become a police officer like his father. That changed at age ten, when he watched a space shuttle launch on television and became fascinated with the idea of space travel. He earned an engineering degree from California Polytechnic State University in 1999 and joined the U.S. Navy, where he trained as a pilot and flew more than 40 types of aircraft over a long military career.

In 2013, NASA selected Glover as an astronaut. His first spaceflight came in November 2020, when he served as pilot on SpaceX's Crew-1 mission to the International Space Station. Over the following months, he became the first Black astronaut to complete a long-duration stay aboard the station, spending 168 days in orbit and performing four spacewalks.

In 2023, NASA assigned Glover to Artemis II, a mission that would carry a crew around the moon for the first time since 1972. The mission launched in April 2026, with Glover serving as pilot. During the flight, he became the first Black astronaut to travel to the moon, and he and his crewmates set a new record for the farthest distance any humans have traveled from Earth.

Speaking before the launch, Glover said he hoped his mission would eventually be remembered simply as "human history" rather than a racial milestone alone — while still recognizing what it meant for young people who could look at him and see themselves reflected in the possibility of reaching space.`,
    recommendedBooks: [
      {
        title: 'Victor J. Glover: Artemis Pilot',
        author: 'Gateway Biographies series',
        note: "A biography following his path from Pomona, California to piloting the Artemis II mission around the moon."
      }
    ],
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What is the main idea of this passage?',
        choices: [
          'Victor Glover only ever wanted to be a police officer',
          'Victor Glover built a distinguished military and NASA career culminating in becoming the first Black astronaut to travel to the moon',
          'Victor Glover invented the Artemis rocket',
          "Victor Glover's career ended after his first spaceflight"
        ],
        answer: 1,
        explanation: 'The passage traces his path from military pilot to ISS astronaut to the historic Artemis II lunar mission.',
        choiceFeedback: [
          "The passage is about a military and NASA career. Only ever pins him to one idea the passage does not build around.",
          null,
          "He flew the mission; rockets are designed by large engineering teams. The passage credits him with the flight, not the invention.",
          "His space station flight comes before the lunar mission here. A main idea cannot stop before the achievement the passage is heading toward."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: "What does 'long-duration stay' most likely mean, based on the passage?",
        choices: [
          'A single-day visit to the space station',
          'An extended stay aboard the space station lasting many months',
          'A brief spacewalk lasting a few hours',
          "A training exercise that never leaves Earth's surface"
        ],
        answer: 1,
        explanation: 'The passage specifies this stay lasted 168 days — several months — clarifying what "long-duration" means here.',
        choiceFeedback: [
          "A day is short by any measure, and the passage gives a number in the hundreds of days. Let the stated figure define the phrase.",
          null,
          "A spacewalk is one activity during a stay, not the stay itself. The phrase describes how long he lived aboard the station.",
          "The stay described here happened in orbit. Training is real, but this phrase is attached to time actually spent on the station."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'What historic achievement did Glover accomplish on the Artemis II mission?',
        choices: [
          'He became the first person ever to go to space',
          'He became the first Black astronaut to travel to the moon',
          'He became the first American to orbit Earth',
          'He built the Orion spacecraft'
        ],
        answer: 1,
        explanation: "The passage states he became the first Black astronaut to travel to the moon during the Artemis II mission.",
        choiceFeedback: [
          "Human spaceflight began decades before this mission. When an answer claims a first, check whether the passage names that particular first.",
          null,
          "That milestone belongs to a much earlier era of spaceflight. The passage ties his first to the lunar mission, not to Earth orbit.",
          "He is the crew member, not the builder. Naming the spacecraft correctly does not make the role correct."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: "Based on his quote about 'human history,' what can you infer about Glover's perspective on his own achievement?",
        choices: [
          'He believes his achievement has no wider significance for anyone',
          'He values what his flight means for representation while hoping such milestones eventually feel unremarkable, as simply part of everyone\u2019s shared history',
          'He wishes he had chosen a different career entirely',
          'He believes only the distance record matters, not who achieved it'
        ],
        answer: 1,
        explanation: 'His quote holds both ideas at once: he recognizes what it means for young people to see themselves in him, while hoping such firsts eventually become simply "human history."',
        choiceFeedback: [
          "He speaks about what young people see when they look at him, and that is significance. This hears only half of what he said.",
          null,
          "Nothing in the quote sounds like regret. This brings a feeling in from outside the passage and hangs it on him.",
          "His quote is about people and history, not mileage. It flattens two ideas he holds together into a single measurement."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'r7-jeanette-epps',
    subject: 'reading',
    strand: 'reading',
    tier: 1,
    title: 'Jeanette Epps: Persistence Beyond a Setback',
    theme: 'Biography — main idea, vocabulary in context, and supporting details',
    passage: `Jeanette Epps grew up in Syracuse, New York, and earned a physics degree from Le Moyne College before pursuing graduate study in aerospace engineering at the University of Maryland, where she completed both a master's degree and a doctorate. Her early research on collision-safety systems at Ford Motor Company led to patented work, and she later spent seven years as a Technical Intelligence Officer at the CIA before NASA selected her as an astronaut in 2009.

In January 2018, NASA announced that Epps would join a long-duration mission to the International Space Station — a milestone she had trained years for. Just months before launch, NASA abruptly reassigned her to a different astronaut, without publicly explaining why. The unexplained decision drew public attention and raised hard questions about fairness, though NASA maintained that diversity and inclusion remained central to its mission planning.

Rather than leaving the astronaut corps, Epps continued training and remained ready for a future assignment. She eventually flew to the International Space Station aboard a SpaceX crew mission, completing a long-duration stay and going on to log more cumulative time in space than any other Black American astronaut at that point in NASA's history.

Epps retired from NASA in 2025 after sixteen years with the agency. Her career is often remembered not only for her scientific and engineering achievements, but for the persistence she showed in continuing to work toward space after a very public and painful setback.`,
    recommendedBooks: [],
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What is the main idea of this passage?',
        choices: [
          'Jeanette Epps never became an astronaut',
          'Jeanette Epps built a strong scientific career and showed persistence after a painful setback on her way to eventually flying in space',
          'Jeanette Epps only worked at the CIA and never joined NASA',
          "Jeanette Epps's career ended in 2018"
        ],
        answer: 1,
        explanation: 'The passage centers on her academic and professional path, the 2018 reassignment, and her persistence afterward, which eventually led to her spaceflight.',
        choiceFeedback: [
          "The passage follows her all the way to a spaceflight. Reading the 2018 setback as the ending misses everything that comes after it.",
          null,
          "The intelligence work is one stop along her path, not the whole of it. A detail lifted from the middle rarely carries a whole passage.",
          "That year is the setback the passage is built around overcoming. Treating the low point as the finish line reverses the point."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: "What does 'reassigned' most likely mean, based on how the passage uses it?",
        choices: [
          'Given an award for outstanding performance',
          'Removed from a planned mission and replaced with someone else',
          'Promoted to lead the mission',
          'Sent to a different country for training'
        ],
        answer: 1,
        explanation: 'The passage explains she was "reassigned" and replaced by a different astronaut months before a planned launch.',
        choiceFeedback: [
          "The word reassigned sounds neutral on its own, but the sentence around it describes losing a seat months before launch. Context sets the meaning.",
          null,
          "Someone else took her place on that flight. A promotion would not require a replacement.",
          "Astronauts do train in other countries, so this sounds possible, but the passage attaches the word to her mission assignment, not to a location."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'What did Epps do after being unexpectedly removed from the 2018 mission?',
        choices: [
          'She left NASA immediately',
          'She continued training and remained ready for a future assignment',
          'She filed to become an astronaut at a different space agency',
          'She stopped working in aerospace entirely'
        ],
        answer: 1,
        explanation: 'The passage states she continued training rather than leaving the astronaut corps.',
        choiceFeedback: [
          "It is a natural guess about how someone might react, and the passage says the opposite. Inference still has to agree with what is stated.",
          null,
          "No other space agency appears in the passage. This invents a next step in place of the one the text actually gives.",
          "She stayed in the astronaut corps and kept training. Persistence is the trait this whole passage is built to show."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'What is Epps often remembered for, according to the passage?',
        choices: [
          'Only her work at the CIA',
          'Her scientific achievements and her persistence after a difficult setback',
          'Being the only astronaut ever reassigned from a mission',
          'Working at NASA for only one year'
        ],
        answer: 1,
        explanation: 'The final paragraph states her career is remembered for both her achievements and her persistence after the setback.',
        choiceFeedback: [
          "That work is real and worth noting, but only cuts out the scientific achievements the closing paragraph names right beside it.",
          null,
          "The passage describes her reassignment without ever calling it unique. Adding only astronaut ever claims something the text does not.",
          "Her time at NASA spans years of training and a spaceflight. This shrinks a long career to a length the passage never gives."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'r7-main-idea-2',
    subject: 'reading',
    strand: 'reading',
    tier: 1,
    title: 'Main Idea Practice II: Systems Briefings',
    theme: 'More main-idea practice with short nonfiction paragraphs',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt:
          'Modern jet engines pull in air at the front, compress it, mix it with fuel, and ignite it to produce a powerful stream of hot exhaust gas out the back. This forward-pushing reaction is what propels the aircraft through the sky.\n\nWhat is the main idea of this paragraph?',
        choices: [
          'Jet engines make aircraft heavier',
          'Jet engines generate forward thrust by compressing air, igniting it with fuel, and expelling hot exhaust gas',
          'Jet engines only work at very low altitudes',
          'Jet engines have no moving parts'
        ],
        answer: 1,
        explanation: 'The paragraph explains the full process by which a jet engine produces the thrust that propels a plane forward.',
        choiceFeedback: [
          "Weight is not discussed anywhere in this paragraph. It is tracking how thrust is produced, from intake to exhaust.",
          null,
          "The engine is described propelling aircraft through the sky, with no altitude limit given. This adds a restriction the paragraph never mentions.",
          "Air is pulled in and compressed, which takes machinery in motion. The process described here requires moving parts."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt:
          "The International Space Station orbits Earth roughly every 90 minutes, meaning astronauts aboard see about 16 sunrises and sunsets every single day. This rapid cycle can make it difficult for astronauts to maintain a normal sleep schedule.\n\nWhat is the main idea of this paragraph?",
        choices: [
          'Astronauts never sleep in space',
          "The station's fast orbital cycle creates frequent sunrises and sunsets that can disrupt astronauts' sleep",
          'The space station only orbits once per day',
          'Sunrises in space look identical to sunrises on Earth'
        ],
        answer: 1,
        explanation: 'The paragraph connects the rapid orbital cycle directly to the sleep-disruption challenge it creates.',
        choiceFeedback: [
          "The paragraph says keeping a normal sleep schedule is difficult, which is not the same as never sleeping. Watch how far an answer stretches a stated fact.",
          null,
          "An orbit about every 90 minutes works out to roughly sixteen trips a day, which is why the sunrises pile up. This drops the number the point rests on.",
          "How the sunrises look is never described. The paragraph cares about how often they come, not what they look like."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt:
          'Wind turbines convert the kinetic energy of moving air into electricity. As wind pushes against the blades, they spin a shaft connected to a generator, which produces electrical current that can be sent into the power grid.\n\nWhat is the main idea of this paragraph?',
        choices: [
          'Wind turbines store electricity for later use only',
          'Wind turbines convert the motion of wind into usable electricity through a spinning generator',
          'Wind turbines work best with no wind at all',
          'Wind turbines are a type of jet engine'
        ],
        answer: 1,
        explanation: 'The paragraph traces the full process: wind spins the blades, which turns a generator, which produces electricity.',
        choiceFeedback: [
          "The paragraph ends with current going out to the power grid, not into storage. You added a step the text does not include.",
          null,
          "Wind pushing the blades starts the whole chain. With no wind, nothing spins and nothing is generated.",
          "Both move air, which makes them feel related, but a turbine takes energy out of moving air while a jet engine pushes air out to make thrust."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt:
          "3D printing builds objects layer by layer from digital designs, using materials like plastic or metal powder. This allows engineers to create complex shapes that would be difficult or impossible to manufacture with traditional cutting and molding methods.\n\nWhat is the main idea of this paragraph?",
        choices: [
          '3D printing can only create simple flat shapes',
          '3D printing builds complex objects layer by layer, enabling designs traditional manufacturing struggles with',
          '3D printing is slower than every other manufacturing method',
          '3D printing only works with metal'
        ],
        answer: 1,
        explanation: 'The paragraph highlights both the layer-by-layer process and the design flexibility it enables compared to traditional methods.',
        choiceFeedback: [
          "The paragraph's point is the opposite: complex shapes that older methods struggle with. This reverses the advantage being described.",
          null,
          "Speed is never compared here. The comparison the paragraph draws is about which shapes are possible, not how fast they are made.",
          "Plastic and metal powder are both named. Taking one material from a list and calling it the only one narrows the paragraph."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'r7-inference-2',
    subject: 'reading',
    strand: 'reading',
    tier: 1,
    title: 'Inference Practice II: Reading the Situation',
    theme: 'More inference practice drawing conclusions beyond the literal text',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt:
          'The lab was silent except for the hum of machines, until a single monitor beeped twice and the lead engineer sat up straight, reaching for her notebook.\n\nWhat can you infer from this moment?',
        choices: [
          'Nothing unusual happened during the test',
          'The beep signaled something notable that the engineer wanted to record right away',
          'The engineer was about to leave for the day',
          'The machines had been turned off'
        ],
        answer: 1,
        explanation: 'Sitting up straight and immediately reaching for a notebook after a distinct sound implies she noticed something worth documenting.',
        choiceFeedback: [
          "A beep and a sudden change in posture are the only events in the sentence, so calling it nothing ignores the details you were handed.",
          null,
          "Reaching for a notebook is a sign of starting work, not packing up. Read what the action is for.",
          "The hum of machines and a beeping monitor both tell you the equipment is running."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt:
          'Despite finishing the marathon in last place, the runner crossed the finish line with both arms raised, grinning as the small crowd that remained cheered for her.\n\nWhat can you infer about the runner?',
        choices: [
          'She was ashamed of finishing last',
          'She felt proud of finishing the race regardless of her placement',
          'She did not know she had finished last',
          'She planned to quit running after this race'
        ],
        answer: 1,
        explanation: 'Raising her arms and grinning despite finishing last implies pride in completing the race, not shame about her placement.',
        choiceFeedback: [
          "Last place invites this guess, and the sentence gives you raised arms and a grin instead. Let the described behavior outrank the expectation.",
          null,
          "Nothing suggests she was confused about her placement. This rescues the shame idea by assuming she was unaware, which the sentence never hints at.",
          "The sentence stops at the finish line and says nothing about her future. Inference works from the evidence given, not from what might come next."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt:
          'The engineer read the failure report twice, then quietly rewrote the entire test plan from scratch before showing it to anyone else.\n\nWhat can you infer about the engineer\u2019s approach to the failure?',
        choices: [
          'She ignored the failure completely',
          'She took the failure seriously enough to fundamentally rethink her approach before involving others',
          'She blamed her teammates immediately',
          'She gave up on the project entirely'
        ],
        answer: 1,
        explanation: 'Reading the report twice and rewriting the entire plan before showing anyone suggests careful, serious reconsideration rather than a quick fix or a dismissal.',
        choiceFeedback: [
          "She read the failure report twice. That is close attention, the opposite of ignoring it.",
          null,
          "No teammates appear until she chooses to show them the plan. She turned to her own test design first, not to anyone else's fault.",
          "Rewriting the entire test plan is work aimed at trying again. Someone who had quit would not build a new plan."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt:
          'As the countdown reached ten seconds, the room fell completely silent, and even the engineers who had run this simulation a hundred times leaned forward in their chairs.\n\nWhat can you infer about this particular moment?',
        choices: [
          'This was a routine moment nobody cared about',
          'Even experienced engineers found this moment tense or significant, despite their familiarity with simulations',
          'The engineers were bored and about to leave',
          'The simulation had already failed before the countdown began'
        ],
        answer: 1,
        explanation: 'Experienced engineers leaning forward and the room falling silent, despite having run the simulation many times, implies this particular moment carried real significance.',
        choiceFeedback: [
          "A silent room and people leaning in is what caring looks like. Familiar and routine are not the same thing here.",
          null,
          "Leaning forward is the posture of attention. Bored people lean back, and nobody in the sentence is moving toward the door.",
          "The countdown is still running at ten seconds. This invents an outcome before the sentence gives one."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'r7-summarizing-2',
    subject: 'reading',
    strand: 'reading',
    tier: 1,
    title: 'Summarizing Practice II: Condensed Reports',
    theme: 'More practice choosing the best one-sentence summary of a passage',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt:
          "Satellites in low Earth orbit travel much faster than those in geostationary orbit, completing a full trip around the planet in about 90 minutes. Geostationary satellites, by contrast, orbit much farther out and match Earth's rotation, so they appear to stay fixed above one spot.\n\nWhich sentence best summarizes this passage?",
        choices: [
          'All satellites orbit at exactly the same speed and distance',
          'Low Earth orbit satellites circle quickly and closely, while geostationary satellites orbit farther out and stay fixed above one point',
          'Geostationary satellites are always faster than low Earth orbit satellites',
          'Satellites cannot orbit at different distances from Earth'
        ],
        answer: 1,
        explanation: 'This captures both key facts — the speed/distance difference and the fixed position of geostationary satellites — without contradicting either.',
        choiceFeedback: [
          "The passage exists to contrast two kinds of orbit. Erasing the difference removes the only thing it says.",
          null,
          "The low Earth orbit satellites are the fast ones, circling in about ninety minutes. You have the two orbits swapped.",
          "One orbit is described as much farther out than the other, so the passage states the very thing this answer denies."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt:
          'Before any crewed mission, engineers run through failure scenarios in simulations, deliberately testing what happens if key systems break down. This preparation helps the crew practice calm, correct responses long before any real emergency occurs.\n\nWhich sentence best summarizes this passage?',
        choices: [
          'Simulations are only used for entertainment, not real preparation',
          'Engineers use failure simulations to prepare crews to respond calmly and correctly to real emergencies',
          'Real emergencies never happen during actual missions',
          'Crews only train after a mission has already launched'
        ],
        answer: 1,
        explanation: 'This captures the purpose of the simulations — building calm, correct emergency responses ahead of time — without adding anything unsupported.',
        choiceFeedback: [
          "The passage gives simulations a serious job: rehearsing failures so a crew responds calmly when one happens for real.",
          null,
          "If emergencies never happened, this training would have no purpose. The passage prepares crews for them rather than ruling them out.",
          "The training described happens before any crewed mission. This puts the preparation after the moment it is meant to protect."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt:
          'Recycling aluminum uses about 95% less energy than producing new aluminum from raw ore. Because of this, recycled aluminum cans can be melted down and back on store shelves as new cans in as little as 60 days.\n\nWhich sentence best summarizes this passage?',
        choices: [
          'Aluminum cannot be recycled at all',
          'Recycling aluminum saves significant energy and allows cans to be quickly remade and resold',
          'New aluminum production uses less energy than recycling',
          'Recycled aluminum cans take years to return to store shelves'
        ],
        answer: 1,
        explanation: 'This captures both the energy savings and the quick turnaround time mentioned in the passage.',
        choiceFeedback: [
          "The whole passage describes cans being melted down and remade. This denies the process it explains.",
          null,
          "Recycling is the low-energy option here, by about 95 percent. The comparison points the other way.",
          "The passage gives 60 days as the fast turnaround. Reading a short span as a long one loses the point of the number."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt:
          'Early submarines struggled with limited underwater endurance because their batteries could only power them for short stretches before needing to surface and recharge. The invention of nuclear propulsion allowed submarines to stay submerged for months at a time.\n\nWhich sentence best summarizes this passage?',
        choices: [
          'Submarines have never been able to stay underwater for long periods',
          'Nuclear propulsion solved early battery limitations, letting submarines stay submerged for months instead of short stretches',
          'Nuclear propulsion made submarines slower than battery-powered ones',
          'Early submarines never needed to surface at all'
        ],
        answer: 1,
        explanation: 'This captures the contrast the passage draws between short battery-limited stretches and the much longer nuclear-powered endurance.',
        choiceFeedback: [
          "That was true of the early battery-powered boats only. The second sentence is about how that limit was overcome.",
          null,
          "Speed is never compared here. What the passage measures is endurance, how long a submarine can stay down.",
          "Surfacing to recharge is exactly the limit described. This reverses the problem nuclear propulsion solved."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'r7-frederick-gregory',
    subject: 'reading',
    strand: 'reading',
    tier: 1,
    title: 'Frederick Gregory: First to Pilot, First to Command',
    theme: "Biography — main idea, vocabulary in context, and supporting details",
    passage: `Frederick Gregory was born in Washington, D.C., in 1941, the nephew of Dr. Charles Drew, a pioneering medical researcher known for his work on blood plasma storage. Gregory developed an early love of flying after attending air shows as a teenager, and he graduated from the United States Air Force Academy in 1964.

Gregory trained as a helicopter pilot and flew rescue missions during the Vietnam War, later retraining as a fixed-wing pilot and then as a test pilot — an unusual path, since most future astronauts started out flying jets rather than helicopters. In 1978, NASA selected him as an astronaut in the same class as Ronald McNair and Guion Bluford, the first class to include Black astronauts.

In 1985, Gregory flew as pilot on the space shuttle Challenger's STS-51B mission, becoming the first Black American to pilot a spacecraft. Four years later, in 1989, he commanded the shuttle Discovery on mission STS-33, making him the first Black American to command a spaceflight. He would go on to fly a third mission in 1991.

After retiring from spaceflight, Gregory continued his career at NASA's headquarters, eventually becoming the agency's Deputy Administrator in 2002. In 2005, he briefly served as NASA's Acting Administrator, becoming the first Black American to lead the space agency, even in an interim role, before a new administrator was sworn in.`,
    recommendedBooks: [],
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What is the main idea of this passage?',
        choices: [
          'Frederick Gregory only ever flew helicopters',
          'Frederick Gregory broke barriers as both the first Black pilot and first Black commander of a spacecraft, later rising into NASA leadership',
          'Frederick Gregory never worked for NASA',
          "Frederick Gregory's career ended after his first mission"
        ],
        answer: 1,
        explanation: 'The passage traces both his historic firsts as pilot and commander, and his later leadership role at NASA headquarters.',
        choiceFeedback: [
          "He did begin in helicopters, but 'only ever' shuts out the shuttle missions and the NASA leadership job that fill the rest of the passage.",
          null,
          "Everything historic here happens at NASA: the piloting, the command, the leadership. This option asks you to erase the setting the whole passage takes place in.",
          "His first mission is where the passage picks up speed, not where it stops. Watch for the years that come after it, 1989 and then 2005."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: "What does the passage suggest was unusual about Gregory's path to becoming an astronaut?",
        choices: [
          'He never attended a military academy',
          'He started as a helicopter pilot rather than a jet pilot, unlike most future astronauts',
          'He never flew any missions before joining NASA',
          'He was the youngest person ever selected as an astronaut'
        ],
        answer: 1,
        explanation: 'The passage explicitly calls this "an unusual path, since most future astronauts started out flying jets rather than helicopters."',
        choiceFeedback: [
          "Look for where the passage uses the word 'unusual' — it lands on his flying background, not on his schooling. This choice reaches for a detail the text never highlights.",
          null,
          "He was an experienced military pilot well before NASA, and that flying is what put him in the running. This option erases the experience the passage builds on.",
          "Age is a fact the passage never gives you. When a question asks what was unusual, find the sentence that says so rather than guessing at a record."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'What historic achievement did Gregory accomplish in 1985?',
        choices: [
          'He became the first Black American to command a spaceflight',
          'He became the first Black American to pilot a spacecraft',
          'He became NASA Administrator',
          'He retired from NASA'
        ],
        answer: 1,
        explanation: 'The passage states his 1985 STS-51B mission made him the first Black American to pilot a spacecraft — the command milestone came later, in 1989.',
        choiceFeedback: [
          "Right man, wrong milestone. Commanding a spaceflight was his 1989 first; in 1985 he was in the pilot's seat. Two firsts, four years apart.",
          null,
          "That job came twenty years later, in 2005, and only on an interim basis. Dates in a biography are there to keep the achievements in order.",
          "Retirement is the end of a story, not the middle of one. In 1985 his most famous flying years were just getting started."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'What role did Gregory hold at NASA in 2005?',
        choices: [
          'He was still an active astronaut flying missions',
          'He briefly served as Acting Administrator, becoming the first Black American to lead NASA even in an interim role',
          'He was training to become an astronaut for the first time',
          'He had no further connection to NASA'
        ],
        answer: 1,
        explanation: 'The passage states he briefly served as Acting Administrator in 2005, the first Black American to lead the agency, even on an interim basis.',
        choiceFeedback: [
          "By 2005 his flying years were behind him and his work had moved to a desk at headquarters. The passage shifts from cockpit to leadership.",
          null,
          "Astronaut training belongs to the earliest part of his story, decades before 2005. Reading the timeline backwards puts a beginner where a leader stood.",
          "Because 2005 comes after his missions, it is tempting to assume he had walked away. The passage puts him at the top of the agency that year instead."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'r7-christine-darden',
    subject: 'reading',
    strand: 'reading',
    tier: 1,
    title: 'Christine Darden: Taming the Sonic Boom',
    theme: "Biography — main idea, vocabulary in context, and supporting details",
    passage: `Christine Darden grew up in Monroe, North Carolina, the daughter of parents who strongly valued education. She graduated as valedictorian of her high school and went on to earn a bachelor's degree in mathematics from Hampton Institute in 1962, briefly teaching high school math before pursuing a master's degree.

In 1967, Darden joined NASA's Langley Research Center as a data analyst, initially performing calculations by hand for engineers, much like the "human computers" of earlier NASA history. After six years, she was promoted to aerospace engineer, one of very few women in that role at Langley at the time. While working full-time and raising three children, she earned a PhD in engineering from George Washington University in 1983.

Darden's research focused on sonic booms — the thunderous shock waves produced when an aircraft flies faster than the speed of sound. Loud sonic booms had caused so many public complaints that laws were eventually passed banning supersonic flight over the continental United States. In 1989, Darden was appointed leader of NASA's Sonic Boom Group, where she worked to design quieter supersonic aircraft that could reduce or minimize the disruptive boom.

Over her 40-year NASA career, Darden authored more than 50 published papers and became the first Black American woman at NASA Langley promoted to the Senior Executive Service, the highest rank in the federal civil service. Her research on sonic booms continues to influence the design of quieter supersonic aircraft today.`,
    recommendedBooks: [
      {
        title: 'Hidden Figures Young Readers\u2019 Edition',
        author: 'Margot Lee Shetterly',
        note: 'Ages 8–12 — includes Christine Darden alongside Katherine Johnson, Dorothy Vaughan, and Mary Jackson.'
      }
    ],
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What is the main idea of this passage?',
        choices: [
          'Christine Darden only ever worked as a math teacher',
          'Christine Darden built a distinguished NASA career researching and working to reduce sonic booms in supersonic flight',
          'Christine Darden invented the first supersonic aircraft',
          "Christine Darden's career ended after six years at NASA"
        ],
        answer: 1,
        explanation: 'The passage centers on her rise from data analyst to leading sonic boom research at NASA over a 40-year career.',
        choiceFeedback: [
          "Teaching math was a real stop early on, but it is one chapter rather than the book. The passage keeps returning to her sonic boom research.",
          null,
          "Studying how supersonic flight makes noise is different from building the aircraft itself. She worked on the shock waves, not on inventing the plane.",
          "Six years would barely cover her start as a data analyst. The passage follows about forty years of work, all the way to a senior leadership post."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: "What does 'sonic boom' mean, based on how the passage defines it?",
        choices: [
          'The thunderous shock wave produced when an aircraft flies faster than the speed of sound',
          'A type of rocket engine',
          'A quiet hum produced by electric aircraft',
          'A weather pattern that affects flight schedules'
        ],
        answer: 0,
        explanation: 'The passage directly defines sonic booms as "the thunderous shock waves produced when an aircraft flies faster than the speed of sound."',
        choiceFeedback: [
          null,
          "A rocket engine makes noise, so the connection feels close. The passage ties the boom to speed, though: what happens when an aircraft outruns its own sound.",
          "The word 'thunderous' sits right inside the passage's own definition, which rules out anything quiet. A sonic boom is loud enough to be the problem she spent a career solving.",
          "Weather does affect flying, so this sounds like it belongs. The definition here points at the aircraft's speed, not at the sky around it."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'What historic achievement did Darden reach at NASA Langley?',
        choices: [
          'She became the first Black American woman there promoted to the Senior Executive Service',
          'She became the first person to fly a supersonic aircraft',
          'She was the first person hired at NASA Langley',
          'She retired after only two years at NASA'
        ],
        answer: 0,
        explanation: 'The passage states she became the first Black American woman at NASA Langley promoted to the Senior Executive Service.',
        choiceFeedback: [
          null,
          "She researched supersonic flight from the ground, running the math and the wind tunnel work. Studying a kind of flight is not the same as piloting it.",
          "NASA Langley had been staffed for decades before she arrived. Her first was about how high she rose there, not about being there first.",
          "Two years does not match a career that reached the Senior Executive Service. Long service is exactly what let her lead a research group."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'What role was Darden appointed to in 1989?',
        choices: [
          'Leader of the Sonic Boom Group',
          'NASA Administrator',
          'Head of the astronaut training program',
          'Chief financial officer of NASA'
        ],
        answer: 0,
        explanation: 'The passage states she was appointed leader of the Sonic Boom Group in 1989.',
        choiceFeedback: [
          null,
          "Administrator is the biggest title at NASA, so it can look like the natural prize. The passage hands her a research group to lead, not the whole agency.",
          "Astronaut training sits in a different part of NASA entirely. Her 1989 appointment kept her with the noise problem she had worked on for years.",
          "A finance role has no link to anything the passage describes her doing. Her appointment matched her expertise, and that expertise was sonic booms."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'r7-research-skills-2',
    subject: 'reading',
    strand: 'reading',
    tier: 1,
    title: 'Research Skills II: Evaluating Sources',
    theme: 'More practice judging source reliability and research strategy',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt:
          "A student researching current NASA mission schedules finds a source dated five years ago and one from NASA's official website updated this month. Which should they trust for current information?",
        choices: [
          'The five-year-old source, since it was found first',
          "NASA's official website updated this month, since mission schedules can change over time",
          'Both are equally reliable regardless of date',
          'Neither can be trusted for any information'
        ],
        answer: 1,
        explanation: 'For a topic that changes over time, like mission schedules, a recently updated official source is far more reliable than an outdated one.',
        choiceFeedback: [
          "Which source you happened to open first tells you nothing about whether it is right. Reliability comes from who published it and when.",
          null,
          "Dates matter more for some topics than others, and a launch schedule is exactly the kind that shifts. Five years is plenty of time for plans to change.",
          "Both sources may hold useful information; the older one is simply out of date for this particular question. Being careful is not the same as trusting nothing."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: "What is a 'secondary source'?",
        choices: [
          "A source that analyzes or summarizes someone else's original research or firsthand account",
          'An original document or firsthand account created by someone who witnessed an event',
          'A source that is always less accurate than a primary source',
          'A source with no author listed'
        ],
        answer: 0,
        explanation: 'A secondary source analyzes, interprets, or summarizes primary sources rather than being the original firsthand account itself.',
        choiceFeedback: [
          null,
          "That is the definition of a primary source. The two labels are easy to swap, so anchor on this: primary witnessed it, secondary wrote about it afterward.",
          "Secondary describes where the information came from, not how good it is. A careful secondary source can be more accurate than a sloppy firsthand account.",
          "A missing author is a reason to be cautious, but it does not decide the category. Plenty of secondary sources are signed, and plenty of primary ones are not."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt:
          'A student finds a website with strong opinions about a scientific topic but no citations, author name, or references to any studies. What should the student do?',
        choices: [
          'Treat the claims as fact without question',
          'Be skeptical of the claims and look for a source with citations, a named author, and verifiable evidence',
          'Only use this exact source for the entire research project',
          'Assume it is automatically wrong'
        ],
        answer: 1,
        explanation: 'A source with no citations, author, or verifiable evidence is a red flag — a careful researcher looks for more credible, well-supported sources.',
        choiceFeedback: [
          "Confidence is not evidence. Strong wording can make a page feel authoritative while it offers nothing you are able to check.",
          null,
          "Building a whole project on the weakest source you found makes every conclusion rest on it. One unsupported page cannot carry that much weight.",
          "Unproven and false are two different things. Without citations you cannot tell which this is, so the move is to go looking, not to decide."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt:
          'When researching a controversial scientific topic, why is it helpful to look at sources representing more than one perspective?',
        choices: [
          'It helps you understand the full picture and avoid relying on a single potentially biased source',
          'It is never useful and wastes research time',
          'It guarantees one of the sources must be completely wrong',
          'It is only necessary for topics with no disagreement at all'
        ],
        answer: 0,
        explanation: 'Looking at multiple credible perspectives helps a researcher understand the full picture rather than relying on one possibly biased account.',
        choiceFeedback: [
          null,
          "Time spent comparing sources is what keeps you from repeating one writer's blind spot. That is research working, not a detour from it.",
          "Disagreement does not mean one side must be entirely mistaken. Two credible sources can each hold a real piece of a complicated picture.",
          "This has it reversed. The topics people argue about are the ones that most need several viewpoints; where everyone agrees, one good source usually does."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'r7-aprille-ericsson',
    subject: 'reading',
    strand: 'reading',
    tier: 1,
    title: 'Aprille Ericsson: Instruments for the Stars',
    theme: "Biography — main idea, vocabulary in context, and supporting details",
    passage: `Aprille Ericsson grew up in Brooklyn, New York, watching television coverage of NASA's Apollo missions as a young girl. Her parents encouraged her curiosity, buying her science books and kits and never suggesting that engineering wasn't meant for girls or for Black children, despite the stereotypes common at the time.

Ericsson earned a bachelor's degree in aeronautical and astronautical engineering from the Massachusetts Institute of Technology. She then pursued graduate study at Howard University, earning both a master's degree and a PhD in mechanical engineering with an aerospace specialization. In doing so, she became the first Black American woman to earn a PhD in mechanical engineering from Howard University.

For more than 30 years, Ericsson worked as an instrument engineer at NASA's Goddard Space Flight Center in Maryland. Rather than designing entire spacecraft, her specialty was the precise scientific instruments spacecraft carry to actually gather data. Her work included the Lunar Orbiter Laser Altimeter, an instrument that launched in 2009 to map the Moon's surface in detail, and instrumentation for the James Webb Space Telescope, which observes some of the most distant galaxies ever detected.

Alongside her technical work, Ericsson became known as a dedicated advocate for women and underrepresented students in engineering, frequently mentoring students and speaking about her path into aerospace. Her career shows that groundbreaking space science depends not only on astronauts and mission commanders, but on the engineers who design the precise instruments making discovery possible.`,
    recommendedBooks: [],
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What is the main idea of this passage?',
        choices: [
          'Aprille Ericsson only ever watched Apollo missions on television',
          'Aprille Ericsson became a pioneering instrument engineer at NASA, designing precise scientific tools for major space missions',
          'Aprille Ericsson was an astronaut who traveled to the Moon',
          "Aprille Ericsson's career ended after earning her PhD"
        ],
        answer: 1,
        explanation: 'The passage centers on her rise to become an instrument engineer at NASA Goddard, contributing to major missions over a 30+ year career.',
        choiceFeedback: [
          "Watching those launches may have lit the spark, but the passage does not stop at the television. It follows her to a doctorate and to instruments on real missions.",
          null,
          "She built tools that traveled rather than traveling herself. Engineers and astronauts both work on missions, but the passage keeps her at NASA Goddard.",
          "Her doctorate opens the working part of her story instead of closing it. Nearly everything the passage highlights, she did after earning it."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: "What does 'instrument engineer' most likely mean, based on how the passage describes Ericsson's specialty?",
        choices: [
          'An engineer who designs the precise scientific tools spacecraft carry to gather data',
          'An engineer who only pilots spacecraft',
          'A musician who performs at NASA events',
          'An engineer who only manages financial budgets'
        ],
        answer: 0,
        explanation: 'The passage explains her specialty was "the precise scientific instruments spacecraft carry to actually gather data," rather than designing entire spacecraft.',
        choiceFeedback: [
          null,
          "Piloting is a separate job from designing what a spacecraft carries. The passage places her with the equipment, not at the controls.",
          "The word 'instrument' has an everyday musical meaning, and this option leans on it. In engineering it means a measuring device built to collect data.",
          "Budgets get managed on every mission, but that is not the specialty the passage names. Her instruments gathered data, not dollars."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'What historic achievement did Ericsson reach at Howard University?',
        choices: [
          'She became the first Black American woman to earn a PhD in mechanical engineering there',
          'She became the university president',
          'She was the first student ever enrolled there',
          'She refused to attend graduate school'
        ],
        answer: 0,
        explanation: 'The passage states she became the first Black American woman to earn a PhD in mechanical engineering from Howard University.',
        choiceFeedback: [
          null,
          "Leading a university is a different achievement from being the first to earn a particular degree there. Her first happened while she was a graduate student.",
          "Howard University had been educating students for well over a century before she arrived. What made her record was the degree, not the enrollment.",
          "She earned a doctorate, which means she went to graduate school and finished it. This choice reverses the very fact the question is built on."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'What instrument did Ericsson work on that launched in 2009 to map the Moon?',
        choices: [
          'The Lunar Orbiter Laser Altimeter',
          'The James Webb Space Telescope',
          'The Hubble Space Telescope',
          'The Apollo Guidance Computer'
        ],
        answer: 0,
        explanation: 'The passage states her work included the Lunar Orbiter Laser Altimeter, which launched in 2009.',
        choiceFeedback: [
          null,
          "Webb is a famous instrument, but it looks far out into the universe and reached space years later. The one here was pointed at the Moon in 2009.",
          "Hubble orbits Earth studying distant objects; it is not a Moon-mapping instrument, and it launched long before 2009.",
          "The Apollo computer belongs to the 1960s, when astronauts were landing there in person. Match the date in the question to the date in the passage."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'r7-technical-reading-2',
    subject: 'reading',
    strand: 'reading',
    tier: 1,
    title: 'Technical Reading II: Systems Check Procedure',
    theme: 'More technical-document reading — sequence, precision, and safety instructions',
    passage: `SPACECRAFT PRE-LAUNCH SYSTEMS CHECK

Step 1: Verify all communication systems are transmitting a clean signal to mission control before proceeding.
Step 2: Confirm the life support system maintains cabin pressure within the safe operating range for at least 10 continuous minutes.
Step 3: Run a full diagnostic on the guidance and navigation computer, and do not proceed if any error codes appear.
Step 4: Inspect all hatch seals visually and confirm a pressure-tight seal using the cabin leak-test procedure.
Step 5: Confirm the flight crew has completed all pre-launch health checks and is cleared by the flight surgeon.
Step 6: Once Steps 1 through 5 are confirmed complete, mission control may authorize the final countdown sequence.`,
    recommendedBooks: [],
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'According to the procedure, what must happen before the guidance and navigation computer diagnostic runs?',
        choices: [
          'Communication systems must be confirmed transmitting a clean signal',
          'The final countdown sequence must begin',
          'The flight crew must already be in space',
          'Nothing needs to happen first'
        ],
        answer: 0,
        explanation: 'Step 1 (communications) precedes Step 3 (guidance computer diagnostic) in the listed sequence.',
        choiceFeedback: [
          null,
          "The countdown is Step 6, the last gate in the entire procedure. Putting it ahead of Step 3 turns the sequence upside down.",
          "This is a pre-launch checklist, worked through while everyone is still on the ground. Nothing in it happens after the crew reaches orbit.",
          "Numbered steps exist precisely because order matters here. Step 3 has two steps standing in front of it."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'What should happen if the guidance and navigation computer diagnostic shows any error codes?',
        choices: [
          'The team should not proceed',
          'The team should proceed anyway since it is usually fine',
          'The team should skip directly to Step 6',
          'The procedure does not address this situation'
        ],
        answer: 0,
        explanation: 'Step 3 explicitly states not to proceed if any error codes appear.',
        choiceFeedback: [
          null,
          "'Usually fine' is exactly the kind of guess a written procedure is designed to remove. The step tells you what to do, and it is not to continue.",
          "Jumping to the final gate would leave a failed check behind you and unfixed. An error code stops the sequence rather than shortening it.",
          "The procedure does address this, in the same step that orders the diagnostic. Read to the end of a step before deciding it is silent."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'Who must clear the flight crew before launch, according to the procedure?',
        choices: ['The flight surgeon', 'Any team member', 'The guidance computer', 'No one — it is not required'],
        answer: 0,
        explanation: 'Step 5 states the crew must be cleared by the flight surgeon.',
        choiceFeedback: [
          null,
          "Procedures name a specific person so responsibility is never vague. 'Any team member' is the answer a checklist is written to prevent.",
          "The computer gets checked in Step 3; it does not do the checking of people. Clearing a crew is a medical judgment.",
          "Crew clearance is written into the steps as a requirement. If a step exists for it, someone has to sign off before launch."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'What must be true before mission control may authorize the final countdown sequence?',
        choices: [
          'Steps 1 through 5 must all be confirmed complete',
          'Only Step 1 needs to be complete',
          'The countdown can begin at any time regardless of other steps',
          'Only the flight crew needs to approve, with no other checks'
        ],
        answer: 0,
        explanation: 'Step 6 explicitly requires Steps 1 through 5 to be confirmed complete first.',
        choiceFeedback: [
          null,
          "Step 1 is the entry point, not the finish line. The final gate looks back across everything from communications through crew clearance.",
          "A countdown that could start at any moment would make the other five steps pointless. The whole design is that each one is a lock.",
          "The crew is the group being cleared in Step 5, not the group granting approval. Mission control authorizes, and only once every check is in."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'r7-stephanie-wilson',
    subject: 'reading',
    strand: 'reading',
    tier: 1,
    title: 'Stephanie Wilson: Operating the Robotic Arm',
    theme: "Biography — main idea, vocabulary in context, and supporting details",
    passage: `Stephanie Wilson grew up in Pittsfield, Massachusetts, and went on to earn a bachelor's degree in engineering science from Harvard University in 1988. She later earned a master's degree in aerospace engineering from the University of Texas at Austin.

Before becoming an astronaut, Wilson worked as a loads and dynamics engineer at Martin Marietta Astronautics, contributing to the Titan IV rocket program, and later as a project engineer at NASA's Jet Propulsion Laboratory, supporting the Galileo mission to Jupiter. NASA selected her as an astronaut candidate in 1996.

Wilson flew on three space shuttle missions: STS-121 in 2006, STS-120 in 2007, and STS-131 in 2010. On STS-120, she helped deliver and attach the Harmony connecting module to the International Space Station. Across her missions, Wilson became known for her skill operating the shuttle and station's robotic arms, using them to move equipment, attach new modules, and support spacewalking astronauts outside the spacecraft. She became the second Black American woman to travel to space, after Mae Jemison.

In 2020, NASA selected Wilson as a member of the Artemis Team, astronauts eligible for future missions to the Moon. Her career reflects a path many astronauts share: years of technical engineering work on the ground, building the exact skills needed to operate the complex machinery of human spaceflight.`,
    recommendedBooks: [],
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What is the main idea of this passage?',
        choices: [
          'Stephanie Wilson only ever worked as a rocket engineer on the ground',
          'Stephanie Wilson built an engineering career that led to three shuttle missions, where she became known for operating robotic arms',
          'Stephanie Wilson was the first woman ever to fly in space',
          "Stephanie Wilson's career ended after her first shuttle mission"
        ],
        answer: 1,
        explanation: 'The passage traces her engineering background through three shuttle missions and her robotic-arm expertise.',
        choiceFeedback: [
          "Her ground engineering work is real and it opens the passage, but she went on to fly three times. The word 'only' throws away the second half.",
          null,
          "That particular first belongs to someone else's story. Wilson's place here rests on her engineering and her robotic-arm work.",
          "One mission is where this option stops; the passage counts three. Check how many times a number appears before you settle on it."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: "What does 'loads and dynamics engineer' most likely involve, based on the passage's context?",
        choices: [
          'Technical engineering work analyzing forces and structural behavior for a rocket program',
          'Operating a spacecraft during an actual mission',
          'Selling rocket parts to customers',
          'Teaching elementary school science'
        ],
        answer: 0,
        explanation: 'The passage places this role within her technical engineering career on the Titan IV rocket program, before she became an astronaut.',
        choiceFeedback: [
          null,
          "Flying a spacecraft came later, after she was selected as an astronaut. This role sat on the ground, inside a rocket program's engineering work.",
          "'Loads' sounds like cargo, and cargo sounds like sales, but here the word means the forces pushing on a structure. Context puts her in engineering.",
          "Nothing places her in a classroom. The phrase appears alongside a rocket program, and that neighbouring detail is the clue to its meaning."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'What was Wilson specifically known for during her space shuttle missions?',
        choices: [
          'Operating the robotic arms to move equipment and attach modules',
          'Piloting the shuttle during launch',
          'Designing the Harmony module before it launched',
          'Serving as the mission commander'
        ],
        answer: 0,
        explanation: 'The passage states she became known for her skill operating the robotic arms during her missions.',
        choiceFeedback: [
          null,
          "A shuttle's pilot and its mission specialists had different jobs. Her reputation came from work done once the shuttle was already in orbit.",
          "Attaching a module with the arm is not the same as designing it. Operating and designing are two different roles, and the passage credits her with the first.",
          "Commander is a step above what the passage gives her. Her specific skill was the arm, and that is what this question asks about."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'What team was Wilson selected to join in 2020?',
        choices: [
          'The Artemis Team, astronauts eligible for future Moon missions',
          'The original Mercury astronaut class',
          'A team designing a new space telescope',
          'A team with no connection to spaceflight'
        ],
        answer: 0,
        explanation: 'The passage states NASA selected her for the Artemis Team in 2020.',
        choiceFeedback: [
          null,
          "The Mercury astronauts were chosen in 1959, decades before the year in this question. The date alone rules this one out.",
          "Telescope design is engineering work and she is an engineer, so the pairing feels reasonable. The passage names a Moon program instead.",
          "A 2020 selection with no link to spaceflight would be a strange thing for NASA to announce. Artemis points straight back to the Moon."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'r7-literary-analysis-2',
    subject: 'reading',
    strand: 'reading',
    tier: 1,
    title: 'Literary Analysis II: The Test Stand',
    theme: 'More practice with theme, character motivation, and tone in fiction',
    passage: `Dara stared at the numbers scrolling across the monitor, refusing to blink. Three months of work sat balanced on this one test — a redesigned valve that either solved the fuel leak problem or sent her back to a blank whiteboard.

Her mentor, watching from the next console, didn't offer reassurance. "Whatever happens in the next ninety seconds," he said, "you'll know something you didn't know an hour ago."

The test stand rumbled to life. Dara's hands stayed still on the console, though her mind was already racing three steps ahead, rehearsing what she'd check first if the pressure reading spiked.

Ninety seconds later, the numbers settled into a clean, steady line. Dara let out a breath she hadn't realized she was holding, then reached for her notebook — already writing down what she'd try next, win or not.`,
    recommendedBooks: [],
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What is the central theme of this passage?',
        choices: [
          'Testing is unnecessary once a design feels finished',
          'Genuine progress comes from treating every test as a source of learning, not just pass or fail',
          'Mentors should always reassure their students before a test',
          'Engineers should avoid taking any risks'
        ],
        answer: 1,
        explanation: "The mentor's comment and Dara's instinct to write down next steps regardless of outcome both point to this theme: learning matters more than a single pass/fail result.",
        choiceFeedback: [
          "The passage argues the reverse. A design that feels finished is exactly the one worth putting on the stand.",
          null,
          "Reassurance is what the mentor deliberately does not offer. He reframes the moment instead, and that difference is the whole point.",
          "Nobody in the scene avoids anything. Dara runs the test and prepares for it going wrong, which is risk handled rather than dodged."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: "What does Dara's mental rehearsal during the test suggest about her character?",
        choices: [
          'She was unprepared and panicking',
          'She was mentally prepared, staying ready to respond if something went wrong',
          'She had lost interest in the outcome',
          'She expected the test to fail'
        ],
        answer: 1,
        explanation: 'Rehearsing what to check first if something went wrong shows careful preparation, not panic or disinterest.',
        choiceFeedback: [
          "Running through what to check first is planning, not panic. Panic looks like freezing or scrambling, and she does neither.",
          null,
          "Someone who had stopped caring would not be rehearsing responses in her head. That mental work is a sign of investment.",
          "Preparing for a problem is different from predicting one. Good engineers rehearse the bad case while still hoping for the good one."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: "How would you describe the mentor's tone in his one line of dialogue?",
        choices: ['Dismissive and uninterested', 'Calm and grounding, reframing the moment rather than offering empty comfort', 'Angry and critical', 'Mocking'],
        answer: 1,
        explanation: 'Rather than simple reassurance, his comment calmly reframes the test as valuable regardless of outcome — steady, not dismissive.',
        choiceFeedback: [
          "One short line can still carry care. His words steady her rather than brush her aside, and the content is what tells you which it is.",
          null,
          "There is no criticism in what he says: no blame, no correction. Calm is being read as cold here.",
          "Mocking would need something at Dara's expense, and his line puts no one down. He is talking about the test, not about her."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: "What does Dara reaching for her notebook 'win or not' suggest about her?",
        choices: [
          'She only cared about a successful result',
          'She approached her work with a mindset of continuous learning, regardless of the immediate outcome',
          'She had already given up on the project',
          'She was bored by the test results'
        ],
        answer: 1,
        explanation: 'Writing down next steps regardless of the result reflects an ongoing, learning-focused approach rather than a fixation on pass/fail.',
        choiceFeedback: [
          "The phrase 'win or not' does the opposite work. It says the notebook comes out either way, so read the qualifier and not just the action.",
          null,
          "Someone who had given up would close a notebook, not open one. Writing down next steps assumes there are next steps.",
          "Boredom does not reach for a pen. Her instinct to record what comes next shows the results still mattered to her."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'r7-robert-lawrence',
    subject: 'reading',
    strand: 'reading',
    tier: 1,
    title: 'Robert Henry Lawrence Jr.: A Pioneer Who Never Flew',
    theme: "Biography — main idea, vocabulary in context, and supporting details",
    passage: `Robert Henry Lawrence Jr. was born in Chicago in 1935 and graduated near the top of his high school class. He earned a bachelor's degree in chemistry from Bradley University at just 20 years old, then joined the U.S. Air Force, where he trained as a pilot. Over the following years, Lawrence logged more than 2,500 hours of flight time, including 2,000 hours in jet aircraft, while also earning a PhD in physical chemistry from Ohio State University in 1965.

On June 30, 1967, the Air Force selected Lawrence for the Manned Orbiting Laboratory program, a military space project designed to test small crewed space stations in orbit. With that selection, Lawrence became the first Black American chosen as an astronaut by any national space program. Asked about the significance of the moment, Lawrence responded with characteristic modesty: "This is nothing dramatic. It's just a normal progression. I've been very fortunate."

Tragically, Lawrence never had the chance to travel to space. On December 8, 1967, just over five months after his selection, he was killed when the jet he was flying in crashed during a training exercise at Edwards Air Force Base. He was training another pilot on a steep landing technique designed to mimic how a spacecraft returns from orbit.

For thirty years, Lawrence's name was left off the Astronaut Memorial at Kennedy Space Center, since he had never technically flown a space mission. In 1997, that decision was reversed, and his name was finally added — recognizing him, at last, as the pioneer he was.`,
    recommendedBooks: [],
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What is the main idea of this passage?',
        choices: [
          'Robert Lawrence flew several successful space missions',
          'Robert Lawrence became the first Black American selected as an astronaut, but died in a training accident before he could fly to space',
          'Robert Lawrence refused to join the Air Force',
          "Robert Lawrence's achievements were quickly forgotten and never recognized"
        ],
        answer: 1,
        explanation: "The passage centers on his historic selection and his death before flying, closing with his eventual recognition in 1997.",
        choiceFeedback: [
          "This is the hardest fact in the passage: he was selected, but he died before reaching space. Even the title tells you he never flew.",
          null,
          "He served as an Air Force officer and pilot, and that career is what put him in line for selection. This turns his path into a refusal.",
          "The first thirty years fit this, and then 1997 changes it. A main idea has to hold true for the ending too."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: "What was the purpose of the training exercise Lawrence was flying when he died?",
        choices: [
          'Practicing a steep landing technique designed to mimic a spacecraft returning from orbit',
          'Testing a brand-new rocket engine',
          'Delivering supplies to a space station',
          'Repairing a satellite in orbit'
        ],
        answer: 0,
        explanation: 'The passage states he was training another pilot on a steep landing technique mimicking spacecraft reentry.',
        choiceFeedback: [
          null,
          "Engines do get tested in flight, so this sounds like the right kind of work. The passage names a landing technique instead.",
          "Supply runs happen in orbit, and he never reached it. The training flight took place in the atmosphere.",
          "Satellite repair requires being in space, which is the one thing his story never got to. Keep the flight where the passage puts it."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: "What can you infer from Lawrence's quote, 'This is nothing dramatic. It's just a normal progression'?",
        choices: [
          'He was being modest about a historically significant achievement',
          'He did not think his selection mattered to anyone',
          'He was disappointed by his selection',
          'He believed the achievement belonged to someone else'
        ],
        answer: 0,
        explanation: 'Downplaying a genuinely historic first, while clearly still proud enough to comment on it, suggests modesty rather than indifference.',
        choiceFeedback: [
          null,
          "Calling something a normal progression plays it down; it does not declare it meaningless. He spoke about it publicly, which suggests he knew people were watching.",
          "Nothing in those words carries disappointment. Reading a low-key tone as unhappiness adds a feeling the sentence never shows.",
          "He says nothing about anyone else deserving it. Being modest about your own achievement is different from handing it to someone else."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'What happened regarding the Astronaut Memorial at Kennedy Space Center, according to the passage?',
        choices: [
          "Lawrence's name was excluded for thirty years, then added in 1997",
          "Lawrence's name was included immediately after his death",
          "Lawrence's name has never been added to the memorial",
          'The memorial was built specifically for Lawrence'
        ],
        answer: 0,
        explanation: 'The passage states his name was left off for thirty years, then added in 1997.',
        choiceFeedback: [
          null,
          "This is what should have happened rather than what did. The passage is pointed about the gap between his death and the correction.",
          "The exclusion is only half the story. Keep reading to 1997, the year his name was finally added.",
          "The memorial honors many astronauts, and his was the name missing from it. It was built without him, not for him."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'r7-inference-3',
    subject: 'reading',
    strand: 'reading',
    tier: 1,
    title: 'Inference Practice III: Between the Lines',
    theme: 'More practice drawing conclusions beyond the literal text',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt:
          'She read the acceptance letter three times before setting it down, then immediately called her old teacher, the one who\u2019d told her years ago she could do this.',
        choices: [
          'She wanted to share the news with someone who had supported and believed in her',
          'She was disappointed by the letter',
          'She had never applied anywhere before',
          'She did not care about the outcome'
        ],
        answer: 0,
        explanation: 'Calling the teacher who had encouraged her years earlier suggests she wanted to share this meaningful moment with someone who had supported her.',
        choiceFeedback: [
          null,
          "Reading something three times can mean disbelief, but an acceptance letter and a phone call point toward joy. Weigh the whole sentence, not one gesture.",
          "The sentence mentions no earlier attempts, in either direction. An inference has to grow from something the text actually gives you.",
          "Calling someone immediately is what people do when news lands hard and good. Indifference does not pick up the phone."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt:
          'The engineer kept the failed prototype on a shelf in her office, visible from her desk, long after the successful redesign had shipped.',
        choices: [
          'She wanted to hide her failures from everyone',
          'She valued the failed prototype as a reminder of the process that led to eventual success',
          'She forgot the prototype was there',
          'She regretted ever attempting the redesign'
        ],
        answer: 1,
        explanation: 'Deliberately keeping a failed prototype visible, long after success, suggests she valued it as a meaningful reminder rather than something to hide.',
        choiceFeedback: [
          "It sits where she can see it from her desk, which is the opposite of hidden. Placement is the clue the sentence hands you.",
          null,
          "Forgetting would explain a prototype in a closet, not one in view long after the project ended. The word 'kept' signals a choice.",
          "The redesign succeeded and shipped. Regret does not fit an outcome she reached and a reminder she chose to hold onto."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt:
          'Every other team had already submitted their proposal. Marcus checked his watch, closed his laptop, and kept working through his lunch break anyway.',
        choices: [
          'Marcus had already given up on the deadline',
          'Marcus was committed to doing thorough work despite the time pressure from other teams finishing first',
          'Marcus did not know about the deadline',
          'Marcus\u2019s team had already submitted first'
        ],
        answer: 1,
        explanation: 'Continuing to work carefully through lunch, despite others finishing first, suggests commitment to quality over rushing to match the pace of others.',
        choiceFeedback: [
          "Giving up would mean closing the laptop and walking away. He closes it and then keeps going through lunch, and that second half is the detail that matters.",
          null,
          "He checks his watch, so the clock is clearly on his mind. Knowing the deadline is exactly what gives the moment its tension.",
          "The sentence says every other team had submitted, which places his team outside that group. Small words like 'other' carry the meaning."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt:
          'The coach called every player by name during the final huddle, even the ones who hadn\u2019t played a single minute all season.',
        choices: [
          'The coach only valued the players who had played the most',
          'The coach wanted every player, regardless of playing time, to feel like a valued part of the team',
          'The coach had forgotten most of the players\u2019 names',
          'The coach was ending the season early'
        ],
        answer: 1,
        explanation: 'Deliberately naming every player, including those who rarely played, suggests an intentional effort to make the whole team feel valued.',
        choiceFeedback: [
          "The players he named included the ones who never got on the field. If playing time were his measure, those names would have been the ones skipped.",
          null,
          "He said their names out loud, which is proof he had them. This reads the sentence as the reverse of what it reports.",
          "A final huddle is the last one of a season that has run its course. Nothing here says the season was cut short."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'r7-bernard-harris',
    subject: 'reading',
    strand: 'reading',
    tier: 1,
    title: 'Bernard Harris Jr.: First to Walk in Space',
    theme: "Biography — main idea, vocabulary in context, and supporting details",
    passage: `Bernard Harris Jr. was born in Temple, Texas, in 1956. At thirteen years old, he watched the Apollo 11 Moon landing on television and decided he wanted to become an astronaut. He wrote a letter to NASA asking what it would take, and the agency wrote back: he would need at least a master's degree, relevant experience, and the ability to work well as part of a team.

Harris took that advice seriously. Since there was no direct path to becoming an astronaut, he built his career around medicine instead, reasoning it would let him help people while working toward his larger goal. He earned a bachelor's degree in biology from the University of Houston in 1978, then a medical degree from Texas Tech University in 1982, and completed a residency in internal medicine at the Mayo Clinic in 1985.

In 1987, Harris joined NASA as a research fellow studying how astronauts lose bone density during spaceflight, and trained as a flight surgeon. His first application to the astronaut program in 1987 was unsuccessful, but he applied again in 1990 and was selected. He flew his first mission aboard the space shuttle Columbia in 1991, and a second mission aboard Discovery in February 1995.

During that second mission, Harris became the first Black American astronaut to perform a spacewalk, working outside the shuttle while it was docked in a historic rendezvous with the Russian space station Mir. He later said that seeing Earth from outside the spacecraft gave him "a sense of grounding," confirming his place in something much larger than himself. Harris left NASA in 1996 and went on to found a nonprofit foundation supporting math and science education for young people.`,
    recommendedBooks: [],
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What is the main idea of this passage?',
        choices: [
          'Bernard Harris Jr. was only ever a medical doctor with no connection to NASA',
          'Bernard Harris Jr. built a medical career specifically to work toward becoming an astronaut, eventually becoming the first Black American to walk in space',
          'Bernard Harris Jr. was the first person ever to walk in space',
          "Bernard Harris Jr.'s astronaut application was rejected and he never reapplied"
        ],
        answer: 1,
        explanation: 'The passage traces his deliberate path through medicine toward his childhood goal, culminating in his historic 1995 spacewalk.',
        choiceFeedback: [
          "He is a physician, and that part is accurate, but medicine was his route toward NASA rather than a life apart from it.",
          null,
          "Spacewalks had been happening for decades before 1995. His first was as the first Black American to do one, and the passage is careful about that.",
          "The 1987 rejection is real, and then he applied again in 1990 and was chosen. Stopping at the rejection cuts the story in half."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: "What does NASA's advice — that he needed a master's degree, relevant experience, and to work well as part of a team — suggest about the astronaut selection process?",
        choices: [
          'It considers more than just raw talent, valuing collaboration and sustained qualification over many years',
          'It only cares about physical fitness',
          'Anyone can become an astronaut with no preparation at all',
          'It has no specific requirements of any kind'
        ],
        answer: 0,
        explanation: 'The specific, multi-part requirements suggest a selective process valuing sustained preparation and teamwork, not just talent alone.',
        choiceFeedback: [
          null,
          "Fitness matters for astronauts, but it is not what NASA listed for him. The advice named a degree, relevant experience, and teamwork.",
          "If no preparation were needed, there would have been nothing for NASA to advise. He spent years meeting each item on that list.",
          "A list of three specific things is itself the evidence that requirements exist. The question is asking what that list reveals."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'What historic achievement did Harris accomplish during his 1995 mission?',
        choices: [
          'He became the first Black American to perform a spacewalk',
          'He became the first person to travel to Mars',
          'He was the first American in space',
          'He built the International Space Station single-handedly'
        ],
        answer: 0,
        explanation: 'The passage states he became the first Black American astronaut to perform a spacewalk during his 1995 mission.',
        choiceFeedback: [
          null,
          "No human has traveled to Mars. When a choice claims something that has not happened, check it against what the passage actually reports.",
          "The first American reached space in 1961, long before Harris. His own first was a spacewalk, and it came in 1995.",
          "Station assembly took many countries, many crews, and many years. No single astronaut on a single mission could be credited with it."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: "What happened when Harris first applied to NASA's astronaut program in 1987?",
        choices: [
          'His application was unsuccessful, but he reapplied in 1990 and was selected',
          'He was selected immediately on his first attempt',
          'He never applied to the astronaut program at all',
          'He was selected but declined the position'
        ],
        answer: 0,
        explanation: 'The passage states his 1987 application was unsuccessful, and he was selected after reapplying in 1990.',
        choiceFeedback: [
          null,
          "Immediate success would remove the part of his story the passage cares most about: that he was turned down and came back three years later.",
          "He applied twice, in 1987 and again in 1990. That first attempt is precisely what this question is asking about.",
          "Declining would mean the door opened and he walked away. What happened in 1987 is that it had not opened yet."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'r7-joan-higginbotham',
    subject: 'reading',
    strand: 'reading',
    tier: 1,
    title: 'Joan Higginbotham: Engineer Turned Astronaut',
    theme: "Biography — main idea, vocabulary in context, and supporting details",
    passage: `Joan Higginbotham was born in Chicago, Illinois, in 1964. She earned a bachelor's degree in electrical engineering from Southern Illinois University in 1987 and joined NASA that same year as a payload electrical engineer at the Kennedy Space Center in Florida.

Over the next nine years, Higginbotham steadily advanced through engineering roles at Kennedy Space Center, eventually becoming lead orbiter project engineer for the space shuttle Columbia. In that role, she held a key technical position in the launch firing room, helping manage testing and troubleshooting for the vehicle. Over her time at Kennedy, she supported 53 separate space shuttle launches — direct, hands-on experience with nearly every part of how a shuttle mission comes together on the ground.

In 1996, NASA selected Higginbotham as an astronaut candidate. Ten years later, in December 2006, she flew aboard the space shuttle Discovery on mission STS-116, becoming the third Black American woman to travel into space, after Mae Jemison and Stephanie Wilson. During the nearly thirteen-day mission, she helped operate the International Space Station's robotic arm as the crew continued assembling the station.

Higginbotham retired from NASA in 2007 after more than two decades with the agency, having worked her way from an entry-level engineering position to the crew of an actual spaceflight — a path that reflects how deeply ground-based engineering expertise and astronaut careers can be connected.`,
    recommendedBooks: [],
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What is the main idea of this passage?',
        choices: [
          'Joan Higginbotham became an astronaut with no prior technical experience',
          "Joan Higginbotham built nearly a decade of hands-on shuttle engineering experience before becoming the third Black American woman in space",
          'Joan Higginbotham was the first woman ever to fly in space',
          "Joan Higginbotham's engineering career had no connection to her later spaceflight"
        ],
        answer: 1,
        explanation: 'The passage traces her nine years of shuttle engineering work at Kennedy Space Center directly into her eventual selection and spaceflight.',
        choiceFeedback: [
          "The passage spends most of its space on her years of engineering work at Kennedy, so 'no prior technical experience' erases the very evidence the writing is built from.",
          null,
          "This borrows a much bigger 'first' than the passage claims. Read the milestone sentence closely, because it names a specific, qualified first rather than the first woman in space.",
          "Saying the two halves are unconnected misses the shape of the passage, which walks her engineering job straight into her selection as an astronaut."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: "What does supporting '53 separate space shuttle launches' suggest about Higginbotham's engineering experience before becoming an astronaut?",
        choices: [
          'She had extensive, repeated hands-on experience with shuttle operations long before she ever flew one herself',
          'She had never worked on a shuttle launch before her own mission',
          'She only observed launches without any technical role',
          'This detail is unrelated to her later astronaut career'
        ],
        answer: 0,
        explanation: 'Supporting 53 launches over nine years reflects deep, repeated hands-on experience with shuttle operations before her own flight.',
        choiceFeedback: [
          null,
          "The number 53 sits right in the question. Choosing this means the detail was read as a label rather than as a count of launches she actually worked.",
          "Watch the verb: she was supporting those launches, not standing by and watching them. Support names a technical job, not a seat in the viewing stands.",
          "The question asks what the detail suggests about her experience, so calling it unrelated skips the thinking step instead of doing it."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'What historic milestone did Higginbotham reach during her 2006 mission?',
        choices: [
          'She became the third Black American woman to travel into space',
          'She became the first woman ever to travel into space',
          'She became the first American to orbit Earth',
          'She was the first person to operate a robotic arm in space'
        ],
        answer: 0,
        explanation: 'The passage states she became the third Black American woman in space, after Mae Jemison and Stephanie Wilson.',
        choiceFeedback: [
          null,
          "Stretching one person's milestone into the largest possible version of it is a common trap. The passage names a specific place in a specific line of firsts.",
          "Orbiting Earth for the first time belongs to a different era of spaceflight entirely, decades before a 2006 shuttle mission to the station.",
          "Operating the robotic arm was part of her job on the mission, but the passage never calls it a first, and a task is not a milestone."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: "What was Higginbotham's role during the STS-116 mission?",
        choices: [
          "She helped operate the International Space Station's robotic arm during station assembly",
          'She piloted the space shuttle alone',
          'She remained on the ground the entire mission',
          'She built the shuttle before the mission began'
        ],
        answer: 0,
        explanation: 'The passage states she helped operate the robotic arm as the crew continued assembling the station.',
        choiceFeedback: [
          null,
          "Shuttles fly with a full crew and a designated pilot, and the passage describes her working the station's arm rather than flying the vehicle by herself.",
          "Staying on the ground describes her earlier Kennedy years, not 2006. Right detail, wrong moment in her life.",
          "Her engineering work prepared shuttles for launch, which is not the same as building one, and none of it happened during the mission itself."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'r7-main-idea-3',
    subject: 'reading',
    strand: 'reading',
    tier: 1,
    title: 'Main Idea Practice III: Field Notes',
    theme: 'More main-idea practice with short nonfiction paragraphs',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt:
          'Electric cars use regenerative braking to capture energy that would otherwise be lost as heat, feeding it back into the battery and improving overall efficiency compared to traditional braking systems.\n\nWhat is the main idea of this paragraph?',
        choices: [
          'Regenerative braking improves efficiency by capturing energy normally lost during braking',
          'Electric cars cannot use any form of braking',
          'Traditional braking is more efficient than regenerative braking',
          "Regenerative braking has no effect on a car's battery"
        ],
        answer: 0,
        explanation: 'The paragraph explains regenerative braking captures energy normally lost as heat, improving efficiency.',
        choiceFeedback: [
          null,
          "Regenerative braking is a form of braking, so this option denies the very system the paragraph is describing.",
          "Flip the comparison back the right way. The paragraph credits regenerative braking with better efficiency than the traditional kind, not worse.",
          "Follow where the captured energy goes: the paragraph sends it back into the battery, which is the opposite of having no effect on it."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt:
          'Coral reefs, despite covering less than 1% of the ocean floor, support around a quarter of all known marine species, making them one of the most biodiverse ecosystems on the planet.\n\nWhat is the main idea of this paragraph?',
        choices: [
          'Coral reefs support an extraordinary amount of marine life relative to their small size',
          'Coral reefs cover most of the ocean floor',
          'Coral reefs support very few species',
          'Coral reefs have no ecological importance'
        ],
        answer: 0,
        explanation: 'The paragraph highlights the disproportionate biodiversity coral reefs support relative to their small area.',
        choiceFeedback: [
          null,
          "Less than 1% is a tiny slice, and that smallness is the whole point of the sentence. Reading it as 'most' loses the contrast the paragraph is built on.",
          "A quarter of all known marine species is an enormous number. This option keeps the topic but reverses the size of the claim.",
          "Calling reefs unimportant contradicts 'one of the most biodiverse ecosystems on the planet', a phrase that exists to say the opposite."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt:
          "Vaccines work by exposing the immune system to a harmless piece of a pathogen, training the body to recognize and fight the real thing much faster if it's ever encountered again.\n\nWhat is the main idea of this paragraph?",
        choices: [
          'Vaccines train the immune system in advance to respond quickly to a real infection',
          'Vaccines directly cure existing infections',
          'Vaccines have no effect on the immune system',
          'Vaccines work by removing pathogens from the environment entirely'
        ],
        answer: 0,
        explanation: 'The paragraph explains vaccines train the immune system in advance, rather than curing existing infections.',
        choiceFeedback: [
          null,
          "Training ahead of time and curing an infection already underway are two different jobs. The paragraph describes preparation, not treatment.",
          "The immune system is exactly what the paragraph says vaccines act on, so 'no effect' throws out the sentence's main verb.",
          "Nothing here happens outside the body. The action described takes place in a person's immune system, not in the environment around them."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt:
          '3D printers build objects one thin layer at a time based on a digital design, allowing engineers to create complex shapes that traditional cutting or molding methods often cannot achieve.\n\nWhat is the main idea of this paragraph?',
        choices: [
          "3D printing's layer-by-layer process enables complex shapes traditional manufacturing struggles with",
          '3D printing can only create simple flat shapes',
          '3D printing is identical to traditional molding',
          '3D printing requires no digital design at all'
        ],
        answer: 0,
        explanation: 'The paragraph highlights how the layer-by-layer process enables shapes difficult for traditional manufacturing.',
        choiceFeedback: [
          null,
          "The paragraph credits 3D printing with complex shapes other methods cannot manage, so limiting it to simple flat ones reverses its point.",
          "Molding is named as the thing 3D printing can do more than, which makes it a contrast rather than a match.",
          "A digital design is where the process starts in this paragraph. Dropping it removes a stated step instead of summarizing the whole."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'r7-summarizing-3',
    subject: 'reading',
    strand: 'reading',
    tier: 1,
    title: 'Summarizing Practice III: Brief Reports',
    theme: 'More practice choosing the best one-sentence summary of a passage',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt:
          'Bees communicate the location of food to other members of the hive through a specific "waggle dance," using the angle and duration of their movements to indicate both direction and distance.\n\nWhich sentence best summarizes this passage?',
        choices: [
          "Bees use a waggle dance's angle and duration to communicate a food source's direction and distance",
          'Bees never communicate with each other',
          'The waggle dance only indicates danger, not food',
          'Bees communicate using sound instead of movement'
        ],
        answer: 0,
        explanation: 'This captures both key details — angle and duration communicating direction and distance.',
        choiceFeedback: [
          null,
          "The entire paragraph is about one way bees pass information to the hive, so denying that they communicate cancels the passage instead of summarizing it.",
          "Danger never appears in the paragraph. This narrows the dance to a message the text does not give it, and drops the food location it does.",
          "Angle and duration are movements, not sounds. A good summary keeps the method the paragraph actually names."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt:
          'Solar panels convert sunlight directly into electricity using semiconductor materials that release electrons when struck by photons, creating a flow of electrical current.\n\nWhich sentence best summarizes this passage?',
        choices: [
          'Solar panels generate electric current when photons striking semiconductor materials release electrons',
          'Solar panels store electricity generated elsewhere',
          'Solar panels work by burning sunlight as fuel',
          'Solar panels convert electricity into sunlight'
        ],
        answer: 0,
        explanation: 'This captures the core mechanism: photons releasing electrons in semiconductor material, creating current.',
        choiceFeedback: [
          null,
          "Storing energy made somewhere else is a battery's job. The paragraph describes the panel generating the current itself, right where the light lands.",
          "Nothing burns here. Photons knocking electrons loose in a semiconductor is a completely different process from combustion.",
          "Check the direction of the change: sunlight goes in and electricity comes out, not the other way around."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt:
          'A study found that students who took short breaks during long study sessions retained more information than those who studied continuously without pausing, suggesting rest periods support memory consolidation.\n\nWhich sentence best summarizes this passage?',
        choices: [
          'Taking breaks during study sessions appears to improve information retention compared to studying continuously',
          'Continuous studying without breaks always works best',
          'Breaks have no effect on memory',
          'The study found no difference between the two study methods'
        ],
        answer: 0,
        explanation: 'This captures the study\u2019s finding without overstating or misrepresenting the result.',
        choiceFeedback: [
          null,
          "The students who paused retained more, so 'always works best' hands the win to the group that actually did worse.",
          "Memory is precisely what the study measured, and the break group came out ahead, which is an effect rather than the absence of one.",
          "A finding of no difference would make the whole sentence pointless. The study reported a gap between the two groups and named which side it favored."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt:
          'Modern jet engines achieve greater fuel efficiency by using a larger fan that bypasses more air around the engine core, reducing fuel burned per unit of thrust produced.\n\nWhich sentence best summarizes this passage?',
        choices: [
          'Larger bypass fans in jet engines improve fuel efficiency by reducing fuel used per unit of thrust',
          'Larger fans always decrease fuel efficiency',
          'Jet engines cannot be made more fuel efficient',
          'Bypass air has no relationship to fuel efficiency'
        ],
        answer: 0,
        explanation: 'This captures the passage\u2019s explanation of how larger bypass fans improve fuel efficiency.',
        choiceFeedback: [
          null,
          "The larger fan is what the paragraph credits for the efficiency gain, so this turns the cause of the improvement into the cause of a loss.",
          "The sentence exists to describe an efficiency improvement already in use, which makes 'cannot be made more efficient' hard to square with it.",
          "Bypassing air around the core is the mechanism doing the work. Cutting that link removes the how from a passage that is mostly about the how."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'r7-literary-analysis-3',
    subject: 'reading',
    strand: 'reading',
    tier: 1,
    title: 'Literary Analysis III: The Blank Page',
    theme: 'Theme, character choices, tone, and figurative language',
    passage: `Priya stared at the blinking cursor, the blank page mocking her for the third night in a row. She'd rewritten the opening paragraph eleven times, each version worse than the last in her own estimation. Her roommate knocked gently. "Still stuck?" Priya almost lied, almost said she was fine, but instead she said, "Yeah. Completely." Something about saying it out loud, finally, made the tightness in her chest ease just slightly. She didn't finish the paragraph that night. But for the first time in three nights, she didn't feel quite so alone with it.`,
    recommendedBooks: [],
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What is the central theme of this passage?',
        choices: [
          'Being honest about struggling, rather than hiding it, can ease the burden even without solving the problem itself',
          'Working alone is always more effective than admitting difficulty',
          'Writing problems are impossible to overcome',
          'Roommates should never ask about each other\u2019s work'
        ],
        answer: 0,
        explanation: 'Priya\u2019s honesty eases her distress even though the writing problem itself remains unsolved, pointing to this theme.',
        choiceFeedback: [
          null,
          "Priya feels better after speaking up, not after retreating. A theme has to match what the scene actually rewards.",
          "The writing problem stays unsolved at the end, but 'unsolved for now' and 'impossible' are different claims, and the passage only supports the first.",
          "The roommate's question is what opens the door in this scene, so a rule against asking runs against the moment the passage treats as helpful."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'What does Priya\u2019s choice to say "Yeah. Completely." instead of lying suggest about her?',
        choices: [
          'She chose vulnerability and honesty over pretending everything was fine',
          'She no longer cared about finishing her work',
          'She was angry at her roommate',
          'She had already solved her writing problem'
        ],
        answer: 0,
        explanation: 'Choosing honesty over a comfortable lie reflects vulnerability rather than indifference or resolution.',
        choiceFeedback: [
          null,
          "Someone who had stopped caring would not be sitting with a blank page in distress. Her honesty shows the work still matters to her.",
          "There is no anger aimed at the roommate here. The two-word answer is short because admitting something hard is hard, not because she is annoyed.",
          "If the problem were solved she would have good news to share. She is admitting where she is stuck, which is a different kind of honesty."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'How would you describe the tone of the final two sentences?',
        choices: [
          'Quietly hopeful, acknowledging the problem remains but something has eased',
          'Completely triumphant and resolved',
          'Angry and bitter',
          'Entirely hopeless with no change at all'
        ],
        answer: 0,
        explanation: 'The ending is understated but hopeful — the problem persists, yet something genuinely improved.',
        choiceFeedback: [
          null,
          "Triumphant is too loud for an ending that leaves the page still blank. Something eased; nothing was won.",
          "Bitterness would show up in sharp words or blame, and the closing lines carry neither. Read the last two sentences again for their temperature.",
          "Hopeless would mean nothing changed at all, but the ending marks a real shift in how she feels even while the problem stays."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'What literary technique is used when the passage says "the blank page mocking her"?',
        choices: [
          'Personification — giving a non-living object human-like behavior',
          'Rhyme',
          'Alliteration',
          "A simile using 'like' or 'as'"
        ],
        answer: 0,
        explanation: 'Describing the page as "mocking" gives it a human-like behavior — personification.',
        choiceFeedback: [
          null,
          "Rhyme is about matching sounds at the ends of words, and there is no sound pattern in this phrase. The effect comes from what the page is doing.",
          "Alliteration needs repeated beginning sounds across nearby words, which this phrase does not have. The technique here is about behavior, not sound.",
          "A simile makes an open comparison using like or as. This phrase skips the comparison and hands the page a human action directly."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'r7-technical-reading-3',
    subject: 'reading',
    strand: 'reading',
    tier: 1,
    title: 'Technical Reading III: Battery Charging Procedure',
    theme: 'More technical-document reading — sequence, conditions, and safety limits',
    passage: `SATELLITE BATTERY CHARGING PROCEDURE

Step 1: Confirm the satellite's solar panels are fully deployed and facing the sun before beginning charging.
Step 2: Monitor battery temperature continuously; do not charge if temperature exceeds 45°C.
Step 3: Charge at the standard rate unless battery level is below 20%, in which case use the slow-charge setting to avoid damage.
Step 4: Stop charging automatically once battery level reaches 100%, and switch to trickle maintenance mode.
Step 5: Log all charging data for review by the ground engineering team.`,
    recommendedBooks: [],
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What must happen before charging begins, according to the procedure?',
        choices: [
          'The solar panels must be confirmed deployed and facing the sun',
          'The battery must already be at 100%',
          'The satellite must be out of contact with the ground',
          'No preparation is needed'
        ],
        answer: 0,
        explanation: 'Step 1 requires confirming the solar panels are deployed and facing the sun before charging begins.',
        choiceFeedback: [
          null,
          "A battery already at 100% would have nothing to charge. This treats the finish line as the starting condition.",
          "Ground contact is never named as a condition anywhere in the steps, so this is an assumption brought in from outside the document.",
          "Procedures put step 1 first for a reason. Jumping straight to charging ignores a check the document requires before anything else happens."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'What should happen if battery temperature exceeds 45°C?',
        choices: [
          'Charging should not occur',
          'Charging should proceed at double speed',
          'Temperature has no bearing on charging',
          'The satellite should be shut down entirely'
        ],
        answer: 0,
        explanation: 'Step 2 explicitly states not to charge if temperature exceeds 45°C.',
        choiceFeedback: [
          null,
          "Charging faster when the battery is already too hot pushes in the direction the limit exists to prevent.",
          "Temperature has its own numbered step with a hard number attached, which is the opposite of having no bearing on charging.",
          "The rule stops one activity, not the whole spacecraft. Check how far a limit reaches before applying it to everything."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'What charging setting should be used if the battery level is below 20%?',
        choices: ['The slow-charge setting', 'The standard rate only', 'The maximum-speed setting', 'No charging at all'],
        answer: 0,
        explanation: 'Step 3 specifies the slow-charge setting when battery level is below 20%, to avoid damage.',
        choiceFeedback: [
          null,
          "Standard is the default, and the document adds a special instruction precisely for the case where the level drops below 20%.",
          "Low charge might feel like an emergency worth rushing, but the step calls for the gentler setting to avoid damage.",
          "Below 20% is the moment charging matters most. The step tells you how to charge then, not whether to skip it."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'What happens once the battery reaches 100%, according to the procedure?',
        choices: [
          'Charging stops automatically and switches to trickle maintenance mode',
          'The satellite immediately deorbits',
          'The solar panels retract',
          'Nothing happens differently'
        ],
        answer: 0,
        explanation: 'Step 4 states charging stops automatically at 100%, switching to trickle maintenance mode.',
        choiceFeedback: [
          null,
          "Deorbiting is a mission-ending event and appears nowhere in a routine charging procedure. Nothing in the steps ties a full battery to reentry.",
          "Panel deployment belongs to step 1 as a setup condition. Turning it into a shutdown action moves a detail to the wrong end of the procedure.",
          "Trickle maintenance mode is a change of state, so 'nothing happens differently' skips the second half of the final step."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'r7-research-skills-3',
    subject: 'reading',
    strand: 'reading',
    tier: 1,
    title: 'Research Skills III: Peer Review & Source Reliability',
    theme: 'More practice evaluating scientific and research source reliability',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'Why is it generally considered less reliable to cite a random social media post as a primary source for a scientific claim?',
        choices: [
          'Social media posts often lack peer review, fact-checking, or verifiable credentials behind the claims',
          'Social media is always completely false',
          'Scientific claims never appear on social media',
          'Social media posts are automatically verified for accuracy'
        ],
        answer: 0,
        explanation: 'Social media posts typically lack the peer review and fact-checking that support more reliable sources.',
        choiceFeedback: [
          null,
          "Reliability is about how a claim was checked, not a verdict that everything posted is false. The question asks why it is weaker evidence, not worthless.",
          "Scientists post about their work all the time. The concern is what verification stands behind a post, not whether science shows up there.",
          "No automatic accuracy check sits behind an ordinary post, and that missing check is exactly what makes it a shaky primary source."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'What does "peer review" mean in the context of scientific research?',
        choices: [
          'Other experts in the field examine and critique research before it is published',
          'A popularity vote among the general public',
          'A review done only by the original researcher',
          'A process that has no bearing on research quality'
        ],
        answer: 0,
        explanation: 'Peer review means other experts examine and critique research before publication.',
        choiceFeedback: [
          null,
          "Peers here means other experts in the same field, not the public at large, and their judgment is a critique rather than a vote.",
          "Researchers checking their own work is what peer review is designed to go beyond. The whole value comes from outside eyes.",
          "Peer review is the main quality filter before publication, so calling it irrelevant to quality removes the reason the process exists."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'Why might a research paper published in a well-established scientific journal generally be considered more reliable than an unreviewed blog post on the same topic?',
        choices: [
          'Established journals typically require peer review and rigorous editorial standards before publication',
          'Blog posts are always more accurate than journal articles',
          'Journals never make mistakes',
          'Blog posts undergo the same peer review process as journals'
        ],
        answer: 0,
        explanation: 'Established journals require peer review and editorial standards that unreviewed blog posts typically lack.',
        choiceFeedback: [
          null,
          "Some blogs are excellent, but 'always more accurate' claims a guarantee no format earns. The question is about process, not about which side always wins.",
          "Journals do publish mistakes, and corrections get issued afterward. Reliability means better odds after review, not perfection.",
          "The words 'unreviewed blog post' rule this out, and that missing review step is the difference the question is pointing at."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'When researching a topic, why is it useful to check whether multiple independent, credible sources agree on the same facts?',
        choices: [
          'Agreement across independent, credible sources increases confidence that the information is accurate',
          'One source is always sufficient no matter what',
          'Multiple sources always contradict each other',
          'Independent verification has no research value'
        ],
        answer: 0,
        explanation: 'Agreement across multiple independent, credible sources increases confidence in accuracy.',
        choiceFeedback: [
          null,
          "One source can be right, but you cannot tell that from inside that one source. Checking others is how you find out whether it holds up.",
          "Credible independent sources often line up, and when they do, that agreement is useful information. This option assumes disagreement is the only possible result.",
          "Independent verification is the whole method the question describes, so calling it valueless answers a different question than the one asked."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'r7-authors-purpose-1',
    subject: 'reading',
    strand: 'reading',
    tier: 1,
    title: "Author's Purpose I: Inform, Persuade, or Entertain",
    theme: 'Identifying why a piece of writing was created',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt:
          'Did you know that the human body contains enough carbon to fill about 9,000 pencils? Our bones, muscles, and even our DNA rely on this versatile element.\n\nWhat is the author\u2019s primary purpose in this passage?',
        choices: ['To inform the reader with an interesting fact', 'To persuade the reader to buy pencils', 'To entertain with a fictional story', 'To criticize a scientific idea'],
        answer: 0,
        explanation: 'This passage shares a factual, informative detail with no persuasive angle or narrative.',
        choiceFeedback: [
          null,
          "Pencils are used here as a way to picture an amount of carbon, not as a product being sold. A measuring image is not a sales pitch.",
          "There is no character and no story, just a fact about the body. Interesting is not the same as fictional.",
          "Nothing in these two sentences pushes back against a scientific idea. They pass along a finding without arguing with anyone."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt:
          'You NEED to try this energy drink right now — it\u2019s the best decision you\u2019ll make all year, and you\u2019ll regret waiting even one more day!\n\nWhat is the author\u2019s primary purpose?',
        choices: ['To persuade the reader to buy a product', 'To simply inform with neutral facts', 'To tell a fictional story', 'To provide balanced, unbiased information'],
        answer: 0,
        explanation: 'The urgent, opinion-driven language is designed to persuade the reader to make a purchase.',
        choiceFeedback: [
          null,
          "Neutral information does not tell you that you will regret waiting. The urgency itself is the giveaway.",
          "No story is being told here. There is no character, no setting, and no events, only a pitch aimed straight at the reader.",
          "Balanced writing gives more than one side. This passage gives one side loudly and leaves out any reason to hesitate."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt:
          'Once upon a time, a small rover named Zee dreamed of seeing the stars up close, and one day, its dream finally came true.\n\nWhat is the author\u2019s primary purpose?',
        choices: ['To entertain the reader with a story', 'To persuade the reader to buy a rover', 'To provide a technical instruction manual', 'To present objective scientific data'],
        answer: 0,
        explanation: 'This is a narrative with a character and story arc, meant to entertain rather than inform or persuade.',
        choiceFeedback: [
          null,
          "Zee is a character with a dream, not a product with a price. Nothing here asks the reader to buy anything.",
          "Manuals give steps to follow. 'Once upon a time' signals the opposite kind of writing before the sentence even finishes.",
          "There is no data in these lines at all. A rover that dreams is imagination, not measurement."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'Which of these purposes describes writing that presents balanced information without trying to persuade or entertain?',
        choices: ['To inform', 'To persuade', 'To entertain', 'To criticize'],
        answer: 0,
        explanation: 'Writing meant "to inform" presents balanced information without a persuasive or entertainment goal.',
        choiceFeedback: [
          null,
          "Persuading means steering the reader toward a conclusion, which the question specifically rules out when it says 'without trying to persuade'.",
          "Entertaining aims at enjoyment through story or humor, and the question already sets that purpose aside.",
          "Criticizing takes a position and argues against something, which is a viewpoint rather than the balanced presentation the question describes."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'r7-authors-purpose-2',
    subject: 'reading',
    strand: 'reading',
    tier: 1,
    title: "Author's Purpose II: Reading with a Critical Eye",
    theme: 'More practice identifying purpose, plus why it matters for evaluating writing',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt:
          'This new safety helmet reduces impact force by 40% compared to older models — it\u2019s simply the smartest choice for any rider who values their safety.\n\nWhat is the author\u2019s primary purpose?',
        choices: [
          'To persuade the reader that this helmet is the best choice',
          'To only entertain with a fictional story',
          'To give completely neutral information with no viewpoint',
          'To criticize helmet safety standards in general'
        ],
        answer: 0,
        explanation: 'The framing ("simply the smartest choice") pushes the reader toward a conclusion — a persuasive purpose.',
        choiceFeedback: [
          null,
          "Look for a character and events before choosing entertain. This passage offers a helmet, a statistic, and a recommendation instead.",
          "The 40% figure is factual, but 'the smartest choice' is a judgment sitting right beside it, so the passage is not neutral.",
          "This helmet is being praised, not the standards being attacked. Check what a sentence is aimed at before calling it criticism."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt:
          'The James Webb Space Telescope orbits about 1 million miles from Earth and observes primarily in infrared light.\n\nWhat is the author\u2019s primary purpose?',
        choices: ['To inform the reader with factual information', 'To persuade the reader to become an astronomer', 'To entertain with an imaginative story', "To criticize NASA's telescope programs"],
        answer: 0,
        explanation: 'This is neutral, factual content with no persuasive or narrative elements.',
        choiceFeedback: [
          null,
          "Facts about a telescope can inspire someone, but inspiring is a side effect. The sentence itself makes no appeal and asks for nothing.",
          "Distance and infrared light are measurements, not imagination. An imaginative story would need a character and something happening.",
          "No complaint or judgment appears anywhere in the sentence. Stating what a telescope does is not the same as evaluating a program."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt:
          'The little robot rolled through the abandoned factory, humming a tune only it could hear, searching for a friend it wasn\u2019t sure still existed.\n\nWhat is the author\u2019s primary purpose?',
        choices: ['To entertain the reader with a narrative', 'To persuade the reader to build a robot', 'To provide technical repair instructions', 'To present statistical data'],
        answer: 0,
        explanation: 'This passage tells an emotional, imaginative story, meant to entertain.',
        choiceFeedback: [
          null,
          "No product, no pitch, no reader being addressed. The robot is a character in a scene rather than a suggestion aimed at you.",
          "Repair instructions would tell you what to do in order. This passage tells you what a robot is feeling, which serves a different purpose.",
          "Not a single number appears here. The details are mood and setting, and those belong to storytelling."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: "Why is it useful for a reader to identify an author's purpose before evaluating a piece of writing?",
        choices: [
          'Understanding the purpose helps the reader judge whether the content is meant to be objective or has a persuasive angle',
          'Purpose has no effect on how a piece should be read',
          'All writing has the exact same purpose',
          'Purpose only matters for fictional writing'
        ],
        answer: 0,
        explanation: 'Recognizing purpose helps readers judge whether content is objective or carries a persuasive angle.',
        choiceFeedback: [
          null,
          "Purpose changes how much trust a piece has earned before you weigh it, which is exactly an effect on how it should be read.",
          "The passages in this lesson sort into different purposes one after another, so treating all writing as identical undoes the skill being practiced.",
          "Ads, reports, and reviews are all nonfiction with sharply different purposes. Limiting the idea to fiction leaves out where it helps most."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'r7-compare-contrast-1',
    subject: 'reading',
    strand: 'reading',
    tier: 1,
    title: 'Compare & Contrast I: Two Engine Types',
    theme: 'Drawing conclusions by comparing details across a passage',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt:
          'Turbojet engines are simple and lightweight but become inefficient at low speeds. Turbofan engines add a large front fan, making them more fuel-efficient at typical airline speeds but heavier overall.\n\nBased on this passage, which engine type is generally better suited for commercial airliners flying at typical cruising speeds?',
        choices: [
          'Turbofan engines, due to better fuel efficiency at those speeds',
          'Turbojet engines, since they are always more efficient',
          'Both are exactly equally suited with no differences',
          'Neither engine type can be used for airliners'
        ],
        answer: 0,
        explanation: 'The passage states turbofans are more fuel-efficient at typical airline speeds, making them better suited.',
        choiceFeedback: [
          null,
          "The passage attaches turbojet inefficiency to low speeds and turbofan efficiency to airline speeds, so 'always more efficient' drops the speed condition entirely.",
          "The paragraph is built out of differences between the two engines, which makes 'exactly equally suited' the one reading the text rules out.",
          "Turbofans are described as fitted to typical airline speeds, so ruling out both engines throws away the answer the comparison was setting up."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'Using the same passage, what is one advantage of turbojet engines mentioned in the text?',
        choices: [
          'They are simple and lightweight',
          'They are always more fuel-efficient than turbofans',
          'They only work at supersonic speeds',
          'They have no advantages at all'
        ],
        answer: 0,
        explanation: 'The passage states turbojets are simple and lightweight.',
        choiceFeedback: [
          null,
          "Simple and lightweight is the advantage the text gives turbojets. Fuel efficiency is the point it hands to turbofans instead.",
          "Supersonic flight is never mentioned. This is outside knowledge filling a gap the passage did not leave open.",
          "Two turbojet strengths appear in the first few words, so 'no advantages' skips the part of the sentence that answers the question."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt:
          'Solid rocket boosters are simple and reliable but cannot be shut off once ignited. Liquid rocket engines are more complex but can be throttled, stopped, and restarted during flight.\n\nWhich type would be better suited for a mission requiring precise control over engine timing?',
        choices: [
          'Liquid rocket engines, because they can be throttled and restarted',
          'Solid rocket boosters, because they are always more controllable',
          'Both are identical in terms of control',
          'Neither type allows for any control at all'
        ],
        answer: 0,
        explanation: 'The passage states liquid engines can be throttled, stopped, and restarted, giving precise control.',
        choiceFeedback: [
          null,
          "Control is exactly what solid boosters lack here. Once lit they cannot be stopped, which is the opposite of controllable.",
          "The two engine types are separated by whether they can be throttled and restarted, so treating their control as identical erases the comparison.",
          "Liquid engines are described as throttled, stopped, and restarted, which adds up to a great deal of control rather than none."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'Using the same passage, what is a key limitation of solid rocket boosters?',
        choices: [
          'They cannot be shut off once ignited',
          'They are more complex than liquid engines',
          'They can be restarted at any time',
          'They provide no thrust at all'
        ],
        answer: 0,
        explanation: 'The passage explicitly states solid boosters cannot be shut off once ignited.',
        choiceFeedback: [
          null,
          "Complexity is listed as the liquid engine's cost, not the solid booster's. This trades the two engines' traits with each other.",
          "Restarting is the liquid engine's ability. Solid boosters cannot even be shut off, so they never get as far as a restart.",
          "Boosters that produced no thrust would not be worth flying. The stated limit is about control, not about power."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'r7-compare-contrast-2',
    subject: 'reading',
    strand: 'reading',
    tier: 1,
    title: 'Compare & Contrast II: Orbits & Heat Shields',
    theme: 'More practice comparing details to answer application questions',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt:
          'Low Earth orbit satellites circle the planet quickly, completing an orbit in about 90 minutes, and are often used for imaging and internet constellations. Geostationary satellites orbit much farther out and match Earth\u2019s rotation, staying fixed above one point, making them ideal for continuous communication coverage.\n\nWhich orbit type would be better suited for a satellite meant to continuously monitor one specific city\u2019s weather without moving?',
        choices: [
          'Geostationary orbit, since it stays fixed above one point',
          'Low Earth orbit, since it moves quickly around the planet',
          'Both are equally suited for this purpose',
          'Neither type can observe weather'
        ],
        answer: 0,
        explanation: 'The passage states geostationary orbit stays fixed above one point, ideal for continuous monitoring of a single location.',
        choiceFeedback: [
          null,
          "Moving quickly is real, but it is the wrong strength for this job. A satellite circling the planet every 90 minutes cannot stare at one city.",
          "One orbit stays put and the other does not, and that single difference decides the question. Equal suitability ignores it.",
          "Imaging is named as a low Earth orbit use and continuous coverage as a geostationary one, so both orbits watch the planet in some way."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'Using the same passage, what is an advantage of low Earth orbit satellites mentioned in the text?',
        choices: [
          'They are often used effectively for imaging and internet constellations',
          'They always stay fixed above one point',
          'They take much longer to orbit than geostationary satellites',
          'They cannot be used for communication at all'
        ],
        answer: 0,
        explanation: 'The passage states low Earth orbit satellites are often used for imaging and internet constellations.',
        choiceFeedback: [
          null,
          "Staying fixed above one point is the geostationary trait. This hands one orbit's defining feature to the other.",
          "About 90 minutes is the shorter time given in the passage, so this reverses which orbit takes longer to go around.",
          "Internet constellations are communication, and the passage lists them under low Earth orbit, which contradicts 'cannot be used for communication at all'."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt:
          'Ablative heat shields protect a spacecraft by burning away in a controlled manner during reentry, but they cannot be reused. Reusable thermal tiles, like those on the Space Shuttle, survive reentry intact and can be used on future flights, but require careful inspection after each use.\n\nWhich heat shield type would be more cost-effective for a spacecraft meant to fly many missions?',
        choices: [
          'Reusable thermal tiles, since they can be used on future flights',
          'Ablative heat shields, since they never require any inspection',
          'Both types are equally cost-effective for repeated use',
          'Neither type can survive a single reentry'
        ],
        answer: 0,
        explanation: 'The passage states reusable tiles can be used on future flights, making them more cost-effective for repeated missions.',
        choiceFeedback: [
          null,
          "Inspection is the drawback attached to reusable tiles, and the passage never says ablative shields skip inspections. It says they cannot be reused.",
          "Flying again many times versus being consumed on one flight is a cost difference, so calling them equally cost-effective sets that difference aside.",
          "Both types are described doing their job during reentry. One simply survives it while the other is consumed on purpose."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'Using the same passage, what is a stated drawback of reusable thermal tiles?',
        choices: [
          'They require careful inspection after each use',
          'They burn away completely after one use',
          'They cannot survive reentry at all',
          'They provide no protection whatsoever'
        ],
        answer: 0,
        explanation: 'The passage states reusable tiles require careful inspection after each use.',
        choiceFeedback: [
          null,
          "Burning away completely belongs to the ablative shield. This moves one material's behavior onto the other.",
          "The passage says the tiles survive reentry intact, which is the opposite of not surviving it, and their drawback comes after the flight.",
          "Tiles that protected nothing would not be worth inspecting. The stated cost is the work between flights, not a failure to shield."
        ],
        xp: 10
      }
    ]
  }
];
