// ---------------------------------------------------------------------------
// Black STEM & Aerospace Trailblazers — 17 real, fact-checked biographies
// (PROJECT_PLAN.md Part 4). Originally authored for the Reading &
// Literature subject (see src/data/lessons/reading7.js — those original
// lessons stay in place, untouched, as the historical/archived record),
// then ported here as an active Social Studies enrichment unit once
// Reading was archived in favor of Khan Academy (Part 0) and this
// content had no active home anymore.
//
// Confirmed scope decision with the parent (Aug 2026): port into Social
// Studies as its own unit rather than a new standalone subject, since
// Social Studies already covers Black history/civil rights. Deliberately
// NOT added to Social Studies' quarter-paced curriculum (Q1/Q2, both
// already complete at the confirmed 18-lesson semester budget) or to any
// Quarterly Exam's unlocksAfter — these are untagged by quarter and
// unlocked from day one as a browsable library, so they don't silently
// double Social Studies' locked ~18-week content-volume target. Every
// `id` is renamed with an `ss7-tb-` prefix (not reusing the original
// `r7-` ids) so this is tracked as a genuinely distinct lesson attempt
// in lessonProgress, separate from any already-recorded archived-Reading
// progress on the same content.
//
// Content itself (passage + questions) is copied verbatim from the
// original, already fact-checked reading7.js lessons — no new research
// needed, per the project's "verify once, don't re-verify unchanged
// facts" convention.
// ---------------------------------------------------------------------------

export const trailblazerBios7 = [
  {
    "id": "ss7-tb-bessie-coleman",
    "subject": "socialStudies",
    "tier": 1,
    "isTrailblazerBio": true,
    "sequenceInLibrary": 1,
    "title": "First to Earn Her Wings: Bessie Coleman",
    "theme": "Biography — main idea, vocabulary in context, and inference",
    "passage": "Bessie Coleman grew up in Texas in the early 1900s, the daughter of sharecroppers who picked cotton for a living. From a young age, she loved to read and dreamed of a life bigger than the one she saw around her. She moved to Chicago as a young woman, working as a manicurist, but she couldn't stop thinking about the barnstorming pilots she read about in the newspaper, who thrilled crowds with daring stunts in the sky.\n\nBessie wanted to fly more than anything, but every flight school in the United States turned her away. Some rejected her because she was a woman. Others rejected her because she was Black. Refusing to give up, she learned French and saved enough money to travel to France, where a flight school agreed to train her. In 1921, she became the first Black American woman, and the first Native American woman, to earn a pilot's license anywhere in the world.\n\nWhen she returned home, Bessie became a barnstorming pilot herself, performing daring loops and dives at air shows across the country. She often refused to perform at shows that would not allow Black spectators to attend, using her fame to push for change. She dreamed of opening a flying school for Black Americans, but she died in a flying accident in 1926, before that dream came true. Decades later, pilots still study her story as one of the earliest triumphs over impossible odds in aviation history.",
    "questions": [
      {
        "id": "q1",
        "type": "choice",
        "prompt": "What is the main idea of this passage?",
        "choices": [
          "Bessie Coleman was a manicurist in Chicago",
          "Bessie Coleman overcame discrimination to become a pioneering pilot",
          "Bessie Coleman invented the airplane",
          "Bessie Coleman only ever flew in France"
        ],
        "answer": 1,
        "explanation": "The passage traces her journey from facing rejection to becoming a licensed pilot and using her platform for change — that arc is the main idea, not any single detail.",
        "choiceFeedback": [
          "True, but small. The manicurist job is one stop on her way to flying, and a main idea has to cover the whole climb, not one job.",
          null,
          "That belongs to the Wright brothers, almost twenty years before Bessie flew. She learned to fly planes that already existed.",
          "Watch the word 'only.' France is where she trained, but she came home and flew at air shows all across the United States."
        ],
        "xp": 10
      },
      {
        "id": "q2",
        "type": "choice",
        "prompt": "What does 'barnstorming' most likely mean, based on how it's used in the passage?",
        "choices": [
          "Performing daring flying stunts for crowds",
          "Building barns for farmers",
          "Studying weather patterns",
          "Repairing airplane engines"
        ],
        "answer": 0,
        "explanation": "The passage describes barnstorming pilots as ones who \"thrilled crowds with daring stunts in the sky\" — the context defines the word.",
        "choiceFeedback": [
          null,
          "You are reading the word part by part. 'Barn' sits inside it, but the passage ties barnstorming to pilots thrilling crowds with stunts in the sky.",
          "The 'storm' inside the word pulled you toward weather. The sentence around it is about daring stunts performed for a crowd.",
          "Right world, wrong job. Barnstormers were the performers in the air, not the mechanics working on planes on the ground."
        ],
        "xp": 10
      },
      {
        "id": "q3",
        "type": "choice",
        "prompt": "Why did Bessie Coleman travel to France?",
        "choices": [
          "To visit family",
          "Because U.S. flight schools refused to train her due to her race and gender",
          "To compete in an air race",
          "To study French literature"
        ],
        "answer": 1,
        "explanation": "The passage states every U.S. flight school turned her away, so she went to France, where a school agreed to train her.",
        "choiceFeedback": [
          "The passage never mentions family in France. It gives one clear reason she crossed an ocean: American flight schools would not take her.",
          null,
          "She could not race yet, because she had no license. She went to France to get trained in the first place; the stunt flying came after.",
          "She did learn French, but as a tool for getting into flight school. The language was the means, not the reason for the trip."
        ],
        "xp": 10
      },
      {
        "id": "q4",
        "type": "choice",
        "prompt": "Based on the passage, what can you infer about Bessie Coleman's character?",
        "choices": [
          "She gave up easily when faced with obstacles",
          "She was determined and used her success to help others",
          "She preferred to stay out of the spotlight",
          "She was mainly interested in making money"
        ],
        "answer": 1,
        "explanation": "She kept pursuing flying despite repeated rejection, and later refused to perform for segregated crowds — both point to determination used in service of others.",
        "choiceFeedback": [
          "Someone who gives up easily does not learn a new language and cross an ocean after every school at home says no.",
          null,
          "She flew loops and dives in front of crowds and used her fame to push for change. That is a person using the spotlight, not avoiding it.",
          "She turned down paying shows that barred Black spectators. Money is not what she was steering by."
        ],
        "xp": 10
      }
    ]
  },
  {
    "id": "ss7-tb-mae-jemison",
    "subject": "socialStudies",
    "tier": 1,
    "isTrailblazerBio": true,
    "sequenceInLibrary": 2,
    "title": "Mae Jemison: Reaching for the Stars",
    "theme": "Biography — main idea, vocabulary, supporting details, and author's purpose",
    "passage": "Mae Jemison grew up in Chicago, where she spent hours in the library reading about astronomy and science. Even as a young girl, she was certain she would go to space one day, even though at the time no American woman of any background had ever flown there, and no Black American of any gender had either.\n\nMae didn't wait for someone to hand her that future. She studied hard, earning a degree in chemical engineering before going on to become a doctor. She worked as a physician in the Peace Corps, treating patients in West Africa, before applying to NASA's astronaut program. In 1987, NASA selected her to become an astronaut.\n\nOn September 12, 1992, Mae Jemison became the first Black American woman to travel to space, flying aboard the space shuttle Endeavour on an eight-day mission. During the flight, she conducted science experiments and represented, in her own words, the idea that space belongs to everyone who works hard enough to reach it.\n\nAfter leaving NASA, Mae didn't stop pushing boundaries. She started a company to bring science education to students who might not otherwise have access to it, and she has led research into the idea of interstellar travel, imagining how humanity might one day reach other stars. For Mae Jemison, becoming an astronaut wasn't the end of the journey. It was only the beginning.",
    "questions": [
      {
        "id": "q1",
        "type": "choice",
        "prompt": "What is the main idea of this passage?",
        "choices": [
          "Mae Jemison was only interested in medicine",
          "Mae Jemison combined science, medicine, and determination to become the first Black American woman in space, and kept breaking new ground afterward",
          "Mae Jemison never left Chicago",
          "Mae Jemison's main job was in the Peace Corps"
        ],
        "answer": 1,
        "explanation": "The passage covers her path through engineering, medicine, spaceflight, and her later work — the throughline is her sustained drive to keep pushing further.",
        "choiceFeedback": [
          "The word 'only' breaks this one. Medicine is a single chapter; she also has an engineering degree, a spaceflight, and a company afterward.",
          null,
          "Chicago is where she started reading about the stars. She left it for West Africa and eventually for orbit.",
          "Her Peace Corps years were real, but they are one step along the way. A main idea has to hold the whole path."
        ],
        "xp": 10
      },
      {
        "id": "q2",
        "type": "choice",
        "prompt": "What does the word 'boundaries' mean in the phrase 'didn't stop pushing boundaries'?",
        "choices": [
          "Fences around a yard",
          "Limits on what people believed was possible",
          "Rules of a sport",
          "Borders between countries"
        ],
        "answer": 1,
        "explanation": "In context, 'pushing boundaries' means going beyond accepted limits — here, limits on what she (and others) could achieve.",
        "choiceFeedback": [
          "That is the literal meaning of the word. Here it is used as a picture: the limits people believed she could not pass.",
          null,
          "You have borrowed a meaning from sports. Nothing in this passage is about a game or its rules.",
          "Borders is a close cousin of this word, but she was not crossing a line on a map. She was crossing what people thought was possible."
        ],
        "xp": 10
      },
      {
        "id": "q3",
        "type": "choice",
        "prompt": "What job did Mae Jemison have before becoming an astronaut?",
        "choices": [
          "Airline pilot",
          "Physician in the Peace Corps",
          "Elementary school teacher",
          "Newspaper reporter"
        ],
        "answer": 1,
        "explanation": "The passage states she worked as a physician in the Peace Corps, treating patients in West Africa, before applying to NASA.",
        "choiceFeedback": [
          "You are assuming every astronaut starts out flying. Jemison's route ran through chemical engineering and then medicine.",
          null,
          "Teaching never appears in this passage. Her work before NASA was treating patients as a doctor.",
          "Reading is what she did as a girl in the library, which is not the same as writing for a paper. The passage puts her in a clinic."
        ],
        "xp": 10
      },
      {
        "id": "q4",
        "type": "choice",
        "prompt": "What is the author's main purpose in the final paragraph?",
        "choices": [
          "To argue that being an astronaut is the hardest job in the world",
          "To show that Mae Jemison kept achieving new goals even after her spaceflight",
          "To criticize NASA's astronaut program",
          "To describe how airplanes work"
        ],
        "answer": 1,
        "explanation": "The paragraph lists what she did after NASA — starting a company, researching interstellar travel — to show the spaceflight was a beginning, not an ending.",
        "choiceFeedback": [
          "The last paragraph is not ranking jobs by difficulty. It lists what she did after NASA, which is a different point entirely.",
          null,
          "Nothing in the ending finds fault with NASA. The tone there is about what she went on to build next.",
          "No part of this passage explains machinery. A purpose question asks what the writer wants you to take away."
        ],
        "xp": 10
      }
    ]
  },
  {
    "id": "ss7-tb-hidden-figures",
    "subject": "socialStudies",
    "tier": 1,
    "isTrailblazerBio": true,
    "sequenceInLibrary": 3,
    "title": "Hidden Figures: The Human Computers of NASA",
    "theme": "Biography — main idea, vocabulary in context, and supporting details",
    "passage": "Long before NASA had electronic computers, it relied on brilliant mathematicians to calculate the complex equations needed to send rockets into space. Many of these mathematicians were Black American women working at NASA's Langley Research Center in Virginia, and for years, their contributions went largely unrecognized outside NASA itself.\n\nKatherine Johnson was one of these mathematicians. Her calculations verified the flight path for John Glenn's orbit of Earth in 1962, and she later helped calculate the trajectory for the Apollo 11 mission that landed the first humans on the moon. Glenn was so confident in Johnson's work that he asked engineers to have her personally check the numbers produced by an electronic computer before he would agree to fly.\n\nDorothy Vaughan worked alongside Johnson as a mathematician and became NASA's first Black American supervisor. When NASA introduced electronic computers, Vaughan taught herself and her team the programming language FORTRAN, making sure their skills would remain essential in a changing workplace.\n\nMary Jackson, another mathematician at Langley, became NASA's first Black female engineer after petitioning a Virginia court for permission to take the segregated night classes required for the position. All three women worked during a time when they faced both racial segregation and gender discrimination at their own workplace, and all three found ways to succeed anyway. Their story remained largely untold until the book and film Hidden Figures brought it to a wide audience decades later.",
    "questions": [
      {
        "id": "q1",
        "type": "choice",
        "prompt": "What is the main idea of this passage?",
        "choices": [
          "Electronic computers built the Apollo rockets by themselves",
          "Brilliant Black American women mathematicians made essential, long-uncredited contributions to NASA's early space missions",
          "Katherine Johnson was NASA's first supervisor",
          "NASA never employed human mathematicians"
        ],
        "answer": 1,
        "explanation": "The passage centers on the essential, underrecognized work of Johnson, Vaughan, and Jackson at NASA.",
        "choiceFeedback": [
          "This flips who was doing the work. Glenn wanted a person to check the machine's numbers, not the other way around.",
          null,
          "That milestone belongs to Dorothy Vaughan. Katherine Johnson is the one whose calculations verified flight paths.",
          "Watch the word 'never.' The whole passage exists because NASA employed exactly these mathematicians for years."
        ],
        "xp": 10
      },
      {
        "id": "q2",
        "type": "choice",
        "prompt": "What does 'trajectory' most likely mean, as used in the passage?",
        "choices": [
          "The path an object follows through space",
          "A type of rocket engine",
          "A mathematical equation used only by computers",
          "A NASA job title"
        ],
        "answer": 0,
        "explanation": "The passage uses 'trajectory' in the context of calculating a flight path for a moon landing — the path an object travels.",
        "choiceFeedback": [
          null,
          "You reached for another space word. A trajectory is not hardware; it is the path the hardware follows.",
          "Close to the math but off twice over: it names a path rather than an equation, and Johnson worked these out by hand.",
          "This is a thing, not a person. Trajectory names what was being calculated, not who was doing the calculating."
        ],
        "xp": 10
      },
      {
        "id": "q3",
        "type": "choice",
        "prompt": "Why did John Glenn want Katherine Johnson to check the computer's numbers?",
        "choices": [
          "He didn't trust electronic computers to be as reliable as her calculations",
          "He was her supervisor",
          "She had built the computer herself",
          "It was required by NASA policy for every flight"
        ],
        "answer": 0,
        "explanation": "The passage states he was \"so confident in Johnson's work\" that he wanted her to verify the computer's output before flying.",
        "choiceFeedback": [
          null,
          "Glenn was an astronaut, not her boss. He asked because he trusted her math, not because he could order it.",
          "She did the math; she did not build the machine. Her authority here came from her calculations being reliable.",
          "This turns one man's personal request into a general rule. The passage describes what Glenn himself asked for."
        ],
        "xp": 10
      },
      {
        "id": "q4",
        "type": "choice",
        "prompt": "What did Mary Jackson have to do to become an engineer?",
        "choices": [
          "Move to a different state",
          "Petition a court for permission to take required, segregated night classes",
          "Build her own rocket",
          "Retire from her mathematician job"
        ],
        "answer": 1,
        "explanation": "The passage states she petitioned a Virginia court for permission to take the segregated night classes required for the engineering position.",
        "choiceFeedback": [
          "She stayed in Virginia. The barrier was not distance, it was needing a court's permission to sit in a segregated classroom.",
          null,
          "The obstacle here was a legal one, not a building project. What she needed was permission to take required classes.",
          "She was moving up, not stepping away. The engineering job came in addition to her mathematics work."
        ],
        "xp": 10
      }
    ]
  },
  {
    "id": "ss7-tb-guion-bluford",
    "subject": "socialStudies",
    "tier": 1,
    "isTrailblazerBio": true,
    "sequenceInLibrary": 4,
    "title": "Guion Bluford: First Black American in Space",
    "theme": "Biography — main idea, vocabulary in context, and author's purpose",
    "passage": "Guion Bluford grew up loving airplanes, building model kits and reading about flight. After earning a degree in aerospace engineering, he joined the United States Air Force, where he became a fighter pilot and flew more than 140 combat missions during the Vietnam War. He continued his education after his military service, eventually earning a doctorate in aerospace engineering.\n\nIn 1978, NASA selected Bluford to join its astronaut program, at a time when the space agency was actively working to bring more diversity into its ranks of astronauts. On August 30, 1983, he became the first Black American to travel to space, launching aboard the space shuttle Challenger on mission STS-8.\n\nBluford went on to fly on three more shuttle missions over the course of his career, working on scientific experiments and satellite deployments in orbit. He often said he hoped his flight would show young people, especially young Black students, that a career in aerospace was something they could genuinely pursue. After retiring from NASA, he continued working in the aerospace industry and remained an advocate for STEM education, encouraging the next generation of engineers to reach for careers among the stars.",
    "questions": [
      {
        "id": "q1",
        "type": "choice",
        "prompt": "What is the main idea of this passage?",
        "choices": [
          "Guion Bluford was only ever a fighter pilot",
          "Guion Bluford combined military and engineering experience to become the first Black American in space, and used his story to encourage future engineers",
          "Guion Bluford built the space shuttle Challenger",
          "Guion Bluford's career ended after the Vietnam War"
        ],
        "answer": 1,
        "explanation": "The passage traces his path from aerospace engineering through the Air Force to NASA, and closes on his advocacy for future engineers — that's the throughline.",
        "choiceFeedback": [
          "'Only' shuts out too much. He was also an aerospace engineer with a doctorate, then an astronaut, then a STEM advocate.",
          null,
          "He rode Challenger; he did not construct it. Flying a vehicle and building one are different jobs.",
          "The war sits early in his story. His doctorate, four shuttle missions, and industry career all came afterward."
        ],
        "xp": 10
      },
      {
        "id": "q2",
        "type": "choice",
        "prompt": "What does 'diversity' mean in the phrase 'diversity into its ranks of astronauts'?",
        "choices": [
          "Having astronauts from a variety of backgrounds",
          "Having astronauts of many different heights",
          "Testing many different rockets",
          "Training astronauts in many different countries"
        ],
        "answer": 0,
        "explanation": "In context, NASA \"bringing more diversity into its ranks\" refers to broadening the range of backgrounds represented among its astronauts.",
        "choiceFeedback": [
          null,
          "You have taken variety in a physical sense. Here it means the range of backgrounds and experiences astronauts come from.",
          "The phrase says 'ranks of astronauts,' so it describes the people NASA was hiring, not the vehicles it tested.",
          "Location is not what the word is doing here. It is about who gets included in the group, not where they train."
        ],
        "xp": 10
      },
      {
        "id": "q3",
        "type": "choice",
        "prompt": "What did Guion Bluford do during the Vietnam War?",
        "choices": [
          "He served as a doctor",
          "He flew more than 140 combat missions as a fighter pilot",
          "He worked as a NASA engineer",
          "He was a war correspondent"
        ],
        "answer": 1,
        "explanation": "The passage states he became a fighter pilot and flew more than 140 combat missions during the Vietnam War.",
        "choiceFeedback": [
          "Medicine belongs to other people in this unit. Bluford trained in aerospace engineering, and during the war he flew.",
          null,
          "Right kind of work, wrong decade. NASA selected him in 1978, years after the war ended.",
          "Nothing in the passage puts him behind a notebook. He was in a cockpit for more than 140 missions."
        ],
        "xp": 10
      },
      {
        "id": "q4",
        "type": "choice",
        "prompt": "Why does the author include Bluford's hope that his flight would inspire young Black students?",
        "choices": [
          "To show that Bluford saw his flight as meaningful beyond his own personal achievement",
          "To prove that Bluford disliked being an astronaut",
          "To argue that NASA no longer needed astronauts",
          "To explain how rockets are built"
        ],
        "answer": 0,
        "explanation": "Including that hope shows the author wants readers to see his flight's significance for others, not just as a personal milestone.",
        "choiceFeedback": [
          null,
          "Hoping to inspire others is not the same as regret. The quote is generous, not unhappy.",
          "Nothing here argues against the program. He is talking about who might come next, not about shutting it down.",
          "An author's-purpose question asks why a detail was included. This detail is about people, not machinery."
        ],
        "xp": 10
      }
    ]
  },
  {
    "id": "ss7-tb-charles-bolden",
    "subject": "socialStudies",
    "tier": 1,
    "isTrailblazerBio": true,
    "sequenceInLibrary": 5,
    "title": "Charles Bolden: From Rejection to NASA Administrator",
    "theme": "Biography — main idea, vocabulary in context, and supporting details",
    "passage": "Charles Bolden grew up in Columbia, South Carolina, at a time when the American South was still legally segregated. As a high school student, he dreamed of attending the U.S. Naval Academy, but he was turned down for an official nomination by his state's congressional delegation. Rather than give up, he wrote directly to President Lyndon B. Johnson, and he was eventually admitted to the Academy, graduating in 1968.\n\nBolden became a Marine Corps pilot and flew more than 100 combat missions during the Vietnam War. After his military service, he trained as a test pilot, and in 1980, NASA selected him to become an astronaut. Over his career, Bolden flew on four space shuttle missions, including the 1990 flight that carried the Hubble Space Telescope into orbit, and he commanded two of those missions.\n\nIn 2009, President Barack Obama appointed Bolden to lead NASA as its Administrator, making him the first Black American to hold that position permanently. During his time as Administrator, Bolden oversaw NASA's transition away from the space shuttle program and guided new missions, including the Curiosity rover's landing on Mars. From a rejected college application to leading the entire space agency, Bolden's career shows how persistence can open doors that once seemed permanently closed.",
    "questions": [
      {
        "id": "q1",
        "type": "choice",
        "prompt": "What is the main idea of this passage?",
        "choices": [
          "Charles Bolden was only ever a Marine Corps pilot",
          "Charles Bolden overcame early rejection to become an astronaut and eventually the first Black American to lead NASA",
          "Charles Bolden built the Hubble Space Telescope",
          "Charles Bolden's career ended in 1968"
        ],
        "answer": 1,
        "explanation": "The passage traces his path from a rejected Naval Academy nomination through his astronaut career to leading NASA — that arc of persistence is the main idea.",
        "choiceFeedback": [
          "'Only' cuts the story off early. After the Marines came test piloting, four shuttle flights, and running the agency.",
          null,
          "He flew the mission that carried Hubble to orbit. Delivering a telescope and building one are two different jobs.",
          "1968 is when he graduated from the Naval Academy, which is a starting line, not a finish. Nearly everything notable came after."
        ],
        "xp": 10
      },
      {
        "id": "q2",
        "type": "choice",
        "prompt": "What does 'persistence' mean, as used in the passage's final sentence?",
        "choices": [
          "Giving up quickly when something is difficult",
          "Continuing to try despite setbacks or rejection",
          "Working alone without any help",
          "Following someone else's plan exactly"
        ],
        "answer": 1,
        "explanation": "The passage shows Bolden repeatedly working past rejection — that's what \"persistence\" describes.",
        "choiceFeedback": [
          "This is the opposite of the word. He was told no and wrote to the President instead of walking away.",
          null,
          "You have swapped in 'independence.' Persistence is about how long you keep going, not whether anyone helps you.",
          "That describes obedience. Bolden did the opposite of following the plan he was handed, going around a closed door."
        ],
        "xp": 10
      },
      {
        "id": "q3",
        "type": "choice",
        "prompt": "What did Bolden do after his state's congressional delegation rejected his Naval Academy nomination?",
        "choices": [
          "He gave up on attending the Academy",
          "He wrote directly to President Lyndon B. Johnson",
          "He joined the Air Force instead",
          "He moved to a different state"
        ],
        "answer": 1,
        "explanation": "The passage states he wrote directly to President Johnson and was eventually admitted.",
        "choiceFeedback": [
          "If he had given up here, there would be no rest of the passage. The whole point is what he did instead.",
          null,
          "Wrong branch. He kept aiming at the Naval Academy and became a Marine Corps pilot.",
          "Moving would be one way around a state delegation, but it is not what he did. He wrote straight to the President."
        ],
        "xp": 10
      },
      {
        "id": "q4",
        "type": "choice",
        "prompt": "What historic mission did Bolden pilot in 1990?",
        "choices": [
          "The first shuttle flight ever flown",
          "The mission that deployed the Hubble Space Telescope",
          "The first Mars rover landing",
          "The final shuttle flight"
        ],
        "answer": 1,
        "explanation": "The passage states his 1990 flight carried the Hubble Space Telescope into orbit.",
        "choiceFeedback": [
          "The first shuttle flight was in 1981, and he was not aboard. His 1990 flight was one of four he made.",
          null,
          "Rovers land without a pilot aboard. Mars enters his story later, when he led NASA during the Curiosity landing.",
          "The shuttle program ran until 2011. 1990 sits in the middle of it, not at the end."
        ],
        "xp": 10
      }
    ]
  },
  {
    "id": "ss7-tb-lonnie-johnson",
    "subject": "socialStudies",
    "tier": 1,
    "isTrailblazerBio": true,
    "sequenceInLibrary": 6,
    "title": "Lonnie Johnson: From NASA Engineer to Inventor",
    "theme": "Biography — main idea, vocabulary in context, and inference",
    "passage": "Lonnie Johnson grew up in Mobile, Alabama, where he loved taking things apart to see how they worked and building his own toys and rockets from spare parts. He studied mechanical and nuclear engineering at Tuskegee University, and went on to work as an engineer for both the U.S. Air Force and NASA's Jet Propulsion Laboratory, where he helped design systems for the Galileo mission to Jupiter.\n\nWhile Johnson's day job involved advanced spacecraft engineering, he spent his evenings and weekends tinkering with his own inventions. One night in 1982, while testing a homemade heat pump that used water instead of chemical refrigerant, he connected it to his bathroom sink and accidentally blasted a powerful stream of water across the room. Instead of seeing only a mess, Johnson saw an idea.\n\nThat accidental invention eventually became the Super Soaker, a water gun that used air pressure to shoot water farther than any toy before it. After years of refining the design and negotiating with toy companies, the Super Soaker launched in 1989 and went on to sell hundreds of millions of units worldwide. Johnson holds more than 100 patents, and he continues to invent new technology today, including more efficient batteries and solar power systems. His story shows how curiosity and careful engineering can turn an accident into an invention that changes how kids everywhere play.",
    "questions": [
      {
        "id": "q1",
        "type": "choice",
        "prompt": "What is the main idea of this passage?",
        "choices": [
          "Lonnie Johnson only ever built toys",
          "Lonnie Johnson combined serious aerospace engineering experience with inventive curiosity to create one of the best-selling toys in history",
          "Lonnie Johnson worked exclusively at NASA his entire career",
          "Lonnie Johnson's invention failed commercially"
        ],
        "answer": 1,
        "explanation": "The passage connects his aerospace engineering background to the accidental invention that became the Super Soaker.",
        "choiceFeedback": [
          "'Only toys' leaves out his day job. He designed systems for the Galileo mission to Jupiter before the Super Soaker existed.",
          null,
          "'Exclusively' is too tight. He also worked for the Air Force and spent decades inventing on his own time.",
          "This reverses the ending. The Super Soaker went on to sell hundreds of millions of units."
        ],
        "xp": 10
      },
      {
        "id": "q2",
        "type": "choice",
        "prompt": "What does 'tinkering' most likely mean, based on how it's used in the passage?",
        "choices": [
          "Experimenting and making adjustments to something as a hobby",
          "Repairing broken household appliances for pay",
          "Studying for a school exam",
          "Traveling to a new city"
        ],
        "answer": 0,
        "explanation": "The passage describes him \"tinkering with his own inventions\" in his spare time — informal experimenting.",
        "choiceFeedback": [
          null,
          "Two things slipped in that are not there: getting paid, and fixing other people's things. He was building his own ideas.",
          "He was long out of school by 1982. The word sits in a sentence about evenings and weekends spent on his inventions.",
          "Nothing about travel is in this sentence. Tinkering is hands-on work, usually done in one place."
        ],
        "xp": 10
      },
      {
        "id": "q3",
        "type": "choice",
        "prompt": "What accident led to the idea for the Super Soaker?",
        "choices": [
          "A rocket engine malfunctioned during testing",
          "A homemade heat pump blasted water across his bathroom",
          "A toy company approached him with a concept",
          "He read about it in a science magazine"
        ],
        "answer": 1,
        "explanation": "The passage describes the heat pump test that blasted water across the room as the origin of the idea.",
        "choiceFeedback": [
          "His day job was aerospace, so this sounds right, but the accident happened at home at a bathroom sink.",
          null,
          "This reverses the order. He had the idea first, then spent years negotiating with toy companies.",
          "The idea came from something that happened in front of him, not from a page. He was testing a heat pump he had built."
        ],
        "xp": 10
      },
      {
        "id": "q4",
        "type": "choice",
        "prompt": "Based on the passage, what can you infer about Johnson's approach to unexpected results?",
        "choices": [
          "He avoided taking any risks in his work",
          "He saw unexpected results as opportunities rather than only mistakes",
          "He immediately abandoned the heat pump project",
          "He only trusted ideas that came from official assignments"
        ],
        "answer": 1,
        "explanation": "The passage states that \"instead of seeing only a mess, Johnson saw an idea\" — he treated the accident as an opportunity.",
        "choiceFeedback": [
          "Building an experimental heat pump in your own bathroom is not risk avoidance. He experimented on purpose.",
          null,
          "He did not walk away from the mess. He looked at it and saw something worth building.",
          "His biggest idea arrived on his own time, from nobody's assignment. That is the opposite of waiting to be told."
        ],
        "xp": 10
      }
    ]
  },
  {
    "id": "ss7-tb-annie-easley",
    "subject": "socialStudies",
    "tier": 1,
    "isTrailblazerBio": true,
    "sequenceInLibrary": 7,
    "title": "Annie Easley: From Human Computer to Rocket Scientist",
    "theme": "Biography — main idea, vocabulary in context, and supporting details",
    "passage": "Long before most people had ever used a computer, the word \"computer\" often referred to a person, not a machine. Annie Easley became one of these human computers in 1955, when she answered a newspaper article about two sisters working at a laboratory in Cleveland, Ohio, for an organization called NACA, which would later become NASA. She was hired within two weeks, becoming one of only four Black American employees in her division at the time.\n\nEasley spent years performing complex mathematical calculations by hand for NASA's engineers and scientists. When electronic computers began to replace human calculators, Easley didn't get left behind. She taught herself computer programming languages, including one called FORTRAN, and became a skilled programmer instead.\n\nEasley's programming work became essential to the Centaur rocket program, a high-powered upper-stage rocket that helped launch numerous satellites and spacecraft, including the Cassini mission to Saturn decades later. She also contributed to early research on battery technology that would eventually influence today's hybrid and electric vehicles.\n\nLater in her 34-year NASA career, Easley took on an additional role as an equal employment opportunity counselor, helping resolve workplace discrimination complaints involving race, gender, and age. In 2021, years after her death, the International Astronomical Union named a crater on the Moon in her honor, recognizing a career built on adapting, teaching herself new skills, and helping others do the same.",
    "questions": [
      {
        "id": "q1",
        "type": "choice",
        "prompt": "What is the main idea of this passage?",
        "choices": [
          "Annie Easley only ever performed calculations by hand",
          "Annie Easley adapted from human computer to skilled programmer, making essential contributions to NASA’s rocket programs",
          "Annie Easley invented the Centaur rocket by herself",
          "Annie Easley worked in nursing before joining NASA"
        ],
        "answer": 1,
        "explanation": "The passage traces her shift from manual calculation to programming, and her essential Centaur rocket contributions.",
        "choiceFeedback": [
          "'Only by hand' stops the story in the 1950s. The turning point is that she taught herself to program when the machines arrived.",
          null,
          "One person does not build a rocket program alone. Her programming was essential to Centaur, which is different from inventing it.",
          "Nursing never appears here. She came to the job by answering a newspaper article about two sisters doing math at a lab."
        ],
        "xp": 10
      },
      {
        "id": "q2",
        "type": "choice",
        "prompt": "What does 'adapting' most likely mean, based on how the passage uses it?",
        "choices": [
          "Refusing to change any habits or skills",
          "Adjusting and learning new skills as circumstances changed",
          "Moving to a new city for a job",
          "Retiring early from a career"
        ],
        "answer": 1,
        "explanation": "The passage describes her learning programming when electronic computers replaced human calculators — adjusting to a changing role.",
        "choiceFeedback": [
          "That is the reverse. Adapting means she did change, picking up a whole new skill when her old one was replaced.",
          null,
          "You have made this about geography. The change happened inside her work, not on a map.",
          "She stayed 34 years. Adapting is what let her keep going, not a reason to leave."
        ],
        "xp": 10
      },
      {
        "id": "q3",
        "type": "choice",
        "prompt": "How did Easley respond when electronic computers began replacing human calculators?",
        "choices": [
          "She retired from NASA",
          "She taught herself programming languages like FORTRAN",
          "She refused to learn the new technology",
          "She transferred to a different agency"
        ],
        "answer": 1,
        "explanation": "The passage states she taught herself computer programming languages, including FORTRAN.",
        "choiceFeedback": [
          "That would have ended her story in the 1960s. Instead this is the moment her career changed direction and kept going.",
          null,
          "The passage points the other way: she taught herself the new tools rather than turning away from them.",
          "She stayed put. What changed was the skill she used, not the place she worked."
        ],
        "xp": 10
      },
      {
        "id": "q4",
        "type": "choice",
        "prompt": "What rocket program became central to Easley's NASA career?",
        "choices": [
          "The Saturn V rocket",
          "The Centaur upper-stage rocket",
          "The Space Shuttle main engine",
          "The Mercury capsule"
        ],
        "answer": 1,
        "explanation": "The passage states her programming work became essential to the Centaur rocket program.",
        "choiceFeedback": [
          "Saturn V is real, but it belongs to Apollo. Easley's work was on Centaur, an upper stage that launched satellites and probes.",
          null,
          "The shuttle came later and is not mentioned here. Her programming supported the Centaur upper stage.",
          "Mercury was the early crewed capsule program, and a capsule is not an upper-stage rocket. Centaur is the one tied to her."
        ],
        "xp": 10
      }
    ]
  },
  {
    "id": "ss7-tb-ronald-mcnair",
    "subject": "socialStudies",
    "tier": 1,
    "isTrailblazerBio": true,
    "sequenceInLibrary": 8,
    "title": "Ronald McNair: Physicist Among the Stars",
    "theme": "Biography — main idea, vocabulary in context, and supporting details",
    "passage": "Ronald McNair grew up in Lake City, South Carolina, the son of an auto mechanic and a schoolteacher. Even as a boy he had a gift for figuring out how things worked, earning him the nickname \"Gizmo.\" He excelled in school despite growing up amid racial discrimination in the segregated South, and went on to earn a physics degree from North Carolina A&T State University in 1971.\n\nMcNair then pursued a doctorate in physics at the Massachusetts Institute of Technology, specializing in a cutting-edge field: chemical lasers, which use chemical reactions to produce laser light. He earned his PhD in 1976 and became a staff physicist studying lasers at a research laboratory in California.\n\nIn 1978, NASA selected McNair as an astronaut from a pool of about 11,000 applicants — one of only 35 chosen. In February 1984, he flew aboard the space shuttle Challenger, becoming the second Black American to travel to space. During that mission, he operated the shuttle's robotic arm to support a fellow astronaut's historic untethered spacewalk.\n\nMcNair was selected for a second mission, and on January 28, 1986, he and six crewmates were killed when the space shuttle Challenger broke apart shortly after launch. MIT later renamed its Center for Space Research in his honor, and a national scholarship program for underrepresented students, the McNair Scholars Program, continues to carry his name today.",
    "questions": [
      {
        "id": "q1",
        "type": "choice",
        "prompt": "What is the main idea of this passage?",
        "choices": [
          "Ronald McNair was only ever a schoolteacher",
          "Ronald McNair overcame early hardship to become an accomplished physicist and astronaut whose legacy continues today",
          "Ronald McNair built the space shuttle Challenger",
          "Ronald McNair's career ended when he earned his PhD"
        ],
        "answer": 1,
        "explanation": "The passage traces his path from a working-class childhood through physics research to spaceflight, closing on the lasting legacy of programs and buildings named in his honor.",
        "choiceFeedback": [
          "The schoolteacher in this passage is his mother. He earned a physics PhD and became an astronaut.",
          null,
          "He flew aboard Challenger; he was not on the crew that assembled it. Riding a vehicle and manufacturing it are separate jobs.",
          "The PhD in 1976 opened the next part: laser research first, then astronaut selection in 1978."
        ],
        "xp": 10
      },
      {
        "id": "q2",
        "type": "choice",
        "prompt": "What does 'chemical lasers' most likely refer to, based on how the passage describes them?",
        "choices": [
          "Lasers that use chemical reactions to produce laser light",
          "A type of telescope used to study chemistry",
          "A safety device used during rocket launches",
          "A type of spacesuit material"
        ],
        "answer": 0,
        "explanation": "The passage defines the term directly: lasers \"which use chemical reactions to produce laser light.\"",
        "choiceFeedback": [
          null,
          "A laser makes light; a telescope collects it. The passage says these lasers use chemical reactions to produce laser light.",
          "You attached this to spaceflight because the passage is about an astronaut. It was his physics research, done before he ever flew.",
          "This names a material rather than a device that produces light. The definition sits right there in the sentence."
        ],
        "xp": 10
      },
      {
        "id": "q3",
        "type": "choice",
        "prompt": "What did McNair do during his 1984 Challenger mission?",
        "choices": [
          "He operated the robotic arm to support a spacewalk",
          "He piloted the shuttle back to Earth alone",
          "He built the shuttle before launch",
          "He remained at mission control on the ground"
        ],
        "answer": 0,
        "explanation": "The passage states he operated the robotic arm to support a fellow astronaut's historic untethered spacewalk.",
        "choiceFeedback": [
          null,
          "Mission specialists like McNair are not the ones flying the shuttle, and nobody flies one alone. His job was the robotic arm.",
          "Astronauts train to operate the vehicle, not to assemble it. On this flight he was working the arm in orbit.",
          "He was aboard the shuttle, not on the ground. Mission control is a separate team entirely."
        ],
        "xp": 10
      },
      {
        "id": "q4",
        "type": "choice",
        "prompt": "What happened to McNair on January 28, 1986?",
        "choices": [
          "He retired from NASA",
          "He and six crewmates were killed when the Challenger broke apart after launch",
          "He completed a successful second spaceflight",
          "He was selected for a third mission"
        ],
        "answer": 1,
        "explanation": "The passage states the Challenger broke apart shortly after launch, killing McNair and six crewmates.",
        "choiceFeedback": [
          "That date marks the Challenger accident, not a retirement. He had been selected for a second flight and was aboard.",
          null,
          "The second mission is the one that ended in the accident shortly after launch. It did not reach orbit.",
          "The selection for his second mission came before this date. January 28, 1986 is the day of the accident itself."
        ],
        "xp": 10
      }
    ]
  },
  {
    "id": "ss7-tb-victor-glover",
    "subject": "socialStudies",
    "tier": 1,
    "isTrailblazerBio": true,
    "sequenceInLibrary": 9,
    "title": "Victor Glover: To the Moon and Back",
    "theme": "Biography — main idea, vocabulary in context, and inference",
    "passage": "Victor Glover grew up in Pomona, California, wanting to become a police officer like his father. That changed at age ten, when he watched a space shuttle launch on television and became fascinated with the idea of space travel. He earned an engineering degree from California Polytechnic State University in 1999 and joined the U.S. Navy, where he trained as a pilot and flew more than 40 types of aircraft over a long military career.\n\nIn 2013, NASA selected Glover as an astronaut. His first spaceflight came in November 2020, when he served as pilot on SpaceX's Crew-1 mission to the International Space Station. Over the following months, he became the first Black astronaut to complete a long-duration stay aboard the station, spending 168 days in orbit and performing four spacewalks.\n\nIn 2023, NASA assigned Glover to Artemis II, a mission that would carry a crew around the moon for the first time since 1972. The mission launched in April 2026, with Glover serving as pilot. During the flight, he became the first Black astronaut to travel to the moon, and he and his crewmates set a new record for the farthest distance any humans have traveled from Earth.\n\nSpeaking before the launch, Glover said he hoped his mission would eventually be remembered simply as \"human history\" rather than a racial milestone alone — while still recognizing what it meant for young people who could look at him and see themselves reflected in the possibility of reaching space.",
    "questions": [
      {
        "id": "q1",
        "type": "choice",
        "prompt": "What is the main idea of this passage?",
        "choices": [
          "Victor Glover only ever wanted to be a police officer",
          "Victor Glover built a distinguished military and NASA career culminating in becoming the first Black astronaut to travel to the moon",
          "Victor Glover invented the Artemis rocket",
          "Victor Glover's career ended after his first spaceflight"
        ],
        "answer": 1,
        "explanation": "The passage traces his path from military pilot to ISS astronaut to the historic Artemis II lunar mission.",
        "choiceFeedback": [
          "That was true until he was ten. The passage marks the shuttle launch he watched on television as the moment his goal changed.",
          null,
          "He piloted an Artemis mission; he did not design the rocket. Crew roles and engineering roles are different.",
          "His first spaceflight was in 2020. The lunar mission and the distance record both came after it."
        ],
        "xp": 10
      },
      {
        "id": "q2",
        "type": "choice",
        "prompt": "What does 'long-duration stay' most likely mean, based on the passage?",
        "choices": [
          "A single-day visit to the space station",
          "An extended stay aboard the space station lasting many months",
          "A brief spacewalk lasting a few hours",
          "A training exercise that never leaves Earth's surface"
        ],
        "answer": 1,
        "explanation": "The passage specifies this stay lasted 168 days — several months — clarifying what \"long-duration\" means here.",
        "choiceFeedback": [
          "One day against 168 is off by more than a hundred times. The number in the passage is what fixes the meaning.",
          null,
          "You have swapped the stay for the spacewalks. He did four of those, but they happened during a stay measured in months.",
          "This one never leaves the ground. The phrase describes time actually spent aboard the station."
        ],
        "xp": 10
      },
      {
        "id": "q3",
        "type": "choice",
        "prompt": "What historic achievement did Glover accomplish on the Artemis II mission?",
        "choices": [
          "He became the first person ever to go to space",
          "He became the first Black astronaut to travel to the moon",
          "He became the first American to orbit Earth",
          "He built the Orion spacecraft"
        ],
        "answer": 1,
        "explanation": "The passage states he became the first Black astronaut to travel to the moon during the Artemis II mission.",
        "choiceFeedback": [
          "Humans had been flying to space for over sixty years by then. His first was specifically about reaching the moon.",
          null,
          "John Glenn did that in 1962. Victor Glover's milestone was lunar, not orbital.",
          "Building the spacecraft is the work of engineering teams on the ground. His role on this mission was pilot."
        ],
        "xp": 10
      },
      {
        "id": "q4",
        "type": "choice",
        "prompt": "Based on his quote about 'human history,' what can you infer about Glover's perspective on his own achievement?",
        "choices": [
          "He believes his achievement has no wider significance for anyone",
          "He values what his flight means for representation while hoping such milestones eventually feel unremarkable, as simply part of everyone’s shared history",
          "He wishes he had chosen a different career entirely",
          "He believes only the distance record matters, not who achieved it"
        ],
        "answer": 1,
        "explanation": "His quote holds both ideas at once: he recognizes what it means for young people to see themselves in him, while hoping such firsts eventually become simply \"human history.\"",
        "choiceFeedback": [
          "You kept half of what he said. He also spoke about young people seeing themselves in him, which is the opposite of no significance.",
          null,
          "There is no regret anywhere in the quote. He is talking about how the flight should be remembered, not about wanting a different life.",
          "The distance record is a fact in the passage, but his quote is about people, not miles. 'Only' throws out what he emphasised."
        ],
        "xp": 10
      }
    ]
  },
  {
    "id": "ss7-tb-jeanette-epps",
    "subject": "socialStudies",
    "tier": 1,
    "isTrailblazerBio": true,
    "sequenceInLibrary": 10,
    "title": "Jeanette Epps: Persistence Beyond a Setback",
    "theme": "Biography — main idea, vocabulary in context, and supporting details",
    "passage": "Jeanette Epps grew up in Syracuse, New York, and earned a physics degree from Le Moyne College before pursuing graduate study in aerospace engineering at the University of Maryland, where she completed both a master's degree and a doctorate. Her early research on collision-safety systems at Ford Motor Company led to patented work, and she later spent seven years as a Technical Intelligence Officer at the CIA before NASA selected her as an astronaut in 2009.\n\nIn January 2018, NASA announced that Epps would join a long-duration mission to the International Space Station — a milestone she had trained years for. Just months before launch, NASA abruptly reassigned her to a different astronaut, without publicly explaining why. The unexplained decision drew public attention and raised hard questions about fairness, though NASA maintained that diversity and inclusion remained central to its mission planning.\n\nRather than leaving the astronaut corps, Epps continued training and remained ready for a future assignment. She eventually flew to the International Space Station aboard a SpaceX crew mission, completing a long-duration stay and going on to log more cumulative time in space than any other Black American astronaut at that point in NASA's history.\n\nEpps retired from NASA in 2025 after sixteen years with the agency. Her career is often remembered not only for her scientific and engineering achievements, but for the persistence she showed in continuing to work toward space after a very public and painful setback.",
    "questions": [
      {
        "id": "q1",
        "type": "choice",
        "prompt": "What is the main idea of this passage?",
        "choices": [
          "Jeanette Epps never became an astronaut",
          "Jeanette Epps built a strong scientific career and showed persistence after a painful setback on her way to eventually flying in space",
          "Jeanette Epps only worked at the CIA and never joined NASA",
          "Jeanette Epps's career ended in 2018"
        ],
        "answer": 1,
        "explanation": "The passage centers on her academic and professional path, the 2018 reassignment, and her persistence afterward, which eventually led to her spaceflight.",
        "choiceFeedback": [
          "She was selected in 2009 and did eventually fly to the station. The setback delayed the flight; it did not end the career.",
          null,
          "The seven CIA years are real, but they come before NASA selected her. 'Never joined NASA' contradicts the rest of the passage.",
          "2018 is the setback, not the finish. She kept training, flew to the station, and retired in 2025."
        ],
        "xp": 10
      },
      {
        "id": "q2",
        "type": "choice",
        "prompt": "What does 'reassigned' most likely mean, based on how the passage uses it?",
        "choices": [
          "Given an award for outstanding performance",
          "Removed from a planned mission and replaced with someone else",
          "Promoted to lead the mission",
          "Sent to a different country for training"
        ],
        "answer": 1,
        "explanation": "The passage explains she was \"reassigned\" and replaced by a different astronaut months before a planned launch.",
        "choiceFeedback": [
          "You have read the tone backwards. The passage calls this an abrupt, unexplained decision that drew hard questions, not an honour she received.",
          null,
          "This points the wrong direction. She was taken off the flight and another astronaut took her seat.",
          "You read it as a change of place. It was a change of assignment."
        ],
        "xp": 10
      },
      {
        "id": "q3",
        "type": "choice",
        "prompt": "What did Epps do after being unexpectedly removed from the 2018 mission?",
        "choices": [
          "She left NASA immediately",
          "She continued training and remained ready for a future assignment",
          "She filed to become an astronaut at a different space agency",
          "She stopped working in aerospace entirely"
        ],
        "answer": 1,
        "explanation": "The passage states she continued training rather than leaving the astronaut corps.",
        "choiceFeedback": [
          "The passage says 'rather than leaving.' She stayed in the astronaut corps and kept training.",
          null,
          "Switching agencies is a reasonable guess, but it is not in the passage. She stayed at NASA.",
          "She was still flying missions years later. Nothing here shows her leaving the field."
        ],
        "xp": 10
      },
      {
        "id": "q4",
        "type": "choice",
        "prompt": "What is Epps often remembered for, according to the passage?",
        "choices": [
          "Only her work at the CIA",
          "Her scientific achievements and her persistence after a difficult setback",
          "Being the only astronaut ever reassigned from a mission",
          "Working at NASA for only one year"
        ],
        "answer": 1,
        "explanation": "The final paragraph states her career is remembered for both her achievements and her persistence after the setback.",
        "choiceFeedback": [
          "'Only' drops the doctorate, the patents, the spaceflight, and the record for cumulative time in space.",
          null,
          "The passage never claims she was the only one this happened to. It says her response to it is what people remember.",
          "Sixteen years, not one. The passage gives both her 2009 selection and her 2025 retirement."
        ],
        "xp": 10
      }
    ]
  },
  {
    "id": "ss7-tb-frederick-gregory",
    "subject": "socialStudies",
    "tier": 1,
    "isTrailblazerBio": true,
    "sequenceInLibrary": 11,
    "title": "Frederick Gregory: First to Pilot, First to Command",
    "theme": "Biography — main idea, vocabulary in context, and supporting details",
    "passage": "Frederick Gregory was born in Washington, D.C., in 1941, the nephew of Dr. Charles Drew, a pioneering medical researcher known for his work on blood plasma storage. Gregory developed an early love of flying after attending air shows as a teenager, and he graduated from the United States Air Force Academy in 1964.\n\nGregory trained as a helicopter pilot and flew rescue missions during the Vietnam War, later retraining as a fixed-wing pilot and then as a test pilot — an unusual path, since most future astronauts started out flying jets rather than helicopters. In 1978, NASA selected him as an astronaut in the same class as Ronald McNair and Guion Bluford, the first class to include Black astronauts.\n\nIn 1985, Gregory flew as pilot on the space shuttle Challenger's STS-51B mission, becoming the first Black American to pilot a spacecraft. Four years later, in 1989, he commanded the shuttle Discovery on mission STS-33, making him the first Black American to command a spaceflight. He would go on to fly a third mission in 1991.\n\nAfter retiring from spaceflight, Gregory continued his career at NASA's headquarters, eventually becoming the agency's Deputy Administrator in 2002. In 2005, he briefly served as NASA's Acting Administrator, becoming the first Black American to lead the space agency, even in an interim role, before a new administrator was sworn in.",
    "questions": [
      {
        "id": "q1",
        "type": "choice",
        "prompt": "What is the main idea of this passage?",
        "choices": [
          "Frederick Gregory only ever flew helicopters",
          "Frederick Gregory broke barriers as both the first Black pilot and first Black commander of a spacecraft, later rising into NASA leadership",
          "Frederick Gregory never worked for NASA",
          "Frederick Gregory's career ended after his first mission"
        ],
        "answer": 1,
        "explanation": "The passage traces both his historic firsts as pilot and commander, and his later leadership role at NASA headquarters.",
        "choiceFeedback": [
          "Helicopters are where he started. He retrained on fixed-wing aircraft, then as a test pilot, then flew the shuttle.",
          null,
          "NASA is most of his story: three missions, then Deputy Administrator, then Acting Administrator.",
          "His first mission in 1985 was followed by commanding one in 1989, a third flight in 1991, and years of NASA leadership."
        ],
        "xp": 10
      },
      {
        "id": "q2",
        "type": "choice",
        "prompt": "What does the passage suggest was unusual about Gregory's path to becoming an astronaut?",
        "choices": [
          "He never attended a military academy",
          "He started as a helicopter pilot rather than a jet pilot, unlike most future astronauts",
          "He never flew any missions before joining NASA",
          "He was the youngest person ever selected as an astronaut"
        ],
        "answer": 1,
        "explanation": "The passage explicitly calls this \"an unusual path, since most future astronauts started out flying jets rather than helicopters.\"",
        "choiceFeedback": [
          "He graduated from the Air Force Academy in 1964. That part of his path was typical, not unusual.",
          null,
          "He flew rescue missions in Vietnam before NASA. What set him apart was the aircraft he flew, not whether he flew.",
          "Age is never mentioned in this passage. The unusual detail is helicopters instead of jets."
        ],
        "xp": 10
      },
      {
        "id": "q3",
        "type": "choice",
        "prompt": "What historic achievement did Gregory accomplish in 1985?",
        "choices": [
          "He became the first Black American to command a spaceflight",
          "He became the first Black American to pilot a spacecraft",
          "He became NASA Administrator",
          "He retired from NASA"
        ],
        "answer": 1,
        "explanation": "The passage states his 1985 STS-51B mission made him the first Black American to pilot a spacecraft — the command milestone came later, in 1989.",
        "choiceFeedback": [
          "Right man, wrong milestone. Commanding came in 1989 aboard Discovery; 1985 is the year he piloted.",
          null,
          "That comes twenty years later, and even then it was as Acting Administrator.",
          "1985 was the start of his flying career at NASA, not the end of it."
        ],
        "xp": 10
      },
      {
        "id": "q4",
        "type": "choice",
        "prompt": "What role did Gregory hold at NASA in 2005?",
        "choices": [
          "He was still an active astronaut flying missions",
          "He briefly served as Acting Administrator, becoming the first Black American to lead NASA even in an interim role",
          "He was training to become an astronaut for the first time",
          "He had no further connection to NASA"
        ],
        "answer": 1,
        "explanation": "The passage states he briefly served as Acting Administrator in 2005, the first Black American to lead the agency, even on an interim basis.",
        "choiceFeedback": [
          "His flying ended in 1991. By 2005 he had moved into leadership at NASA headquarters.",
          null,
          "That would put his training almost thirty years too late. He was selected as an astronaut back in 1978.",
          "2005 is the year he was running the agency, which is about as connected to NASA as a person can get."
        ],
        "xp": 10
      }
    ]
  },
  {
    "id": "ss7-tb-christine-darden",
    "subject": "socialStudies",
    "tier": 1,
    "isTrailblazerBio": true,
    "sequenceInLibrary": 12,
    "title": "Christine Darden: Taming the Sonic Boom",
    "theme": "Biography — main idea, vocabulary in context, and supporting details",
    "passage": "Christine Darden grew up in Monroe, North Carolina, the daughter of parents who strongly valued education. She graduated as valedictorian of her high school and went on to earn a bachelor's degree in mathematics from Hampton Institute in 1962, briefly teaching high school math before pursuing a master's degree.\n\nIn 1967, Darden joined NASA's Langley Research Center as a data analyst, initially performing calculations by hand for engineers, much like the \"human computers\" of earlier NASA history. After six years, she was promoted to aerospace engineer, one of very few women in that role at Langley at the time. While working full-time and raising three children, she earned a PhD in engineering from George Washington University in 1983.\n\nDarden's research focused on sonic booms — the thunderous shock waves produced when an aircraft flies faster than the speed of sound. Loud sonic booms had caused so many public complaints that laws were eventually passed banning supersonic flight over the continental United States. In 1989, Darden was appointed leader of NASA's Sonic Boom Group, where she worked to design quieter supersonic aircraft that could reduce or minimize the disruptive boom.\n\nOver her 40-year NASA career, Darden authored more than 50 published papers and became the first Black American woman at NASA Langley promoted to the Senior Executive Service, the highest rank in the federal civil service. Her research on sonic booms continues to influence the design of quieter supersonic aircraft today.",
    "questions": [
      {
        "id": "q1",
        "type": "choice",
        "prompt": "What is the main idea of this passage?",
        "choices": [
          "Christine Darden only ever worked as a math teacher",
          "Christine Darden built a distinguished NASA career researching and working to reduce sonic booms in supersonic flight",
          "Christine Darden invented the first supersonic aircraft",
          "Christine Darden's career ended after six years at NASA"
        ],
        "answer": 1,
        "explanation": "The passage centers on her rise from data analyst to leading sonic boom research at NASA over a 40-year career.",
        "choiceFeedback": [
          "She did teach high school math briefly, but that was before 1967. The forty years after it are what the passage is about.",
          null,
          "Supersonic flight existed long before her research. Her work was on reducing the boom those aircraft make.",
          "Six years is when she was promoted to engineer, not when she stopped. Her NASA career ran about forty years."
        ],
        "xp": 10
      },
      {
        "id": "q2",
        "type": "choice",
        "prompt": "What does 'sonic boom' mean, based on how the passage defines it?",
        "choices": [
          "The thunderous shock wave produced when an aircraft flies faster than the speed of sound",
          "A type of rocket engine",
          "A quiet hum produced by electric aircraft",
          "A weather pattern that affects flight schedules"
        ],
        "answer": 0,
        "explanation": "The passage directly defines sonic booms as \"the thunderous shock waves produced when an aircraft flies faster than the speed of sound.\"",
        "choiceFeedback": [
          null,
          "A sonic boom is something that happens, not something you install. It is the shock wave an aircraft leaves behind.",
          "This has it backwards. The boom is the loud part, and quieting it was the problem she spent her career on.",
          "The word 'thunderous' pulled you toward weather. The sound comes from the aircraft itself, not from the sky around it."
        ],
        "xp": 10
      },
      {
        "id": "q3",
        "type": "choice",
        "prompt": "What historic achievement did Darden reach at NASA Langley?",
        "choices": [
          "She became the first Black American woman there promoted to the Senior Executive Service",
          "She became the first person to fly a supersonic aircraft",
          "She was the first person hired at NASA Langley",
          "She retired after only two years at NASA"
        ],
        "answer": 0,
        "explanation": "The passage states she became the first Black American woman at NASA Langley promoted to the Senior Executive Service.",
        "choiceFeedback": [
          null,
          "She was a researcher, not a test pilot. Her milestone was a rank in the civil service, not a flight.",
          "Langley had been running for decades before she arrived in 1967. Her first was a promotion, not an opening-day hire.",
          "Two years against forty. The passage gives her whole career length, and it is not a short one."
        ],
        "xp": 10
      },
      {
        "id": "q4",
        "type": "choice",
        "prompt": "What role was Darden appointed to in 1989?",
        "choices": [
          "Leader of the Sonic Boom Group",
          "NASA Administrator",
          "Head of the astronaut training program",
          "Chief financial officer of NASA"
        ],
        "answer": 0,
        "explanation": "The passage states she was appointed leader of the Sonic Boom Group in 1989.",
        "choiceFeedback": [
          null,
          "That job runs the entire agency. She was appointed to lead one research group, the one working on sonic booms.",
          "Her field was aircraft research, not human spaceflight. She never worked on training astronauts.",
          "A finance role has nothing to do with what she did. Her appointment was to lead technical research."
        ],
        "xp": 10
      }
    ]
  },
  {
    "id": "ss7-tb-aprille-ericsson",
    "subject": "socialStudies",
    "tier": 1,
    "isTrailblazerBio": true,
    "sequenceInLibrary": 13,
    "title": "Aprille Ericsson: Instruments for the Stars",
    "theme": "Biography — main idea, vocabulary in context, and supporting details",
    "passage": "Aprille Ericsson grew up in Brooklyn, New York, watching television coverage of NASA's Apollo missions as a young girl. Her parents encouraged her curiosity, buying her science books and kits and never suggesting that engineering wasn't meant for girls or for Black children, despite the stereotypes common at the time.\n\nEricsson earned a bachelor's degree in aeronautical and astronautical engineering from the Massachusetts Institute of Technology. She then pursued graduate study at Howard University, earning both a master's degree and a PhD in mechanical engineering with an aerospace specialization. In doing so, she became the first Black American woman to earn a PhD in mechanical engineering from Howard University.\n\nFor more than 30 years, Ericsson worked as an instrument engineer at NASA's Goddard Space Flight Center in Maryland. Rather than designing entire spacecraft, her specialty was the precise scientific instruments spacecraft carry to actually gather data. Her work included the Lunar Orbiter Laser Altimeter, an instrument that launched in 2009 to map the Moon's surface in detail, and instrumentation for the James Webb Space Telescope, which observes some of the most distant galaxies ever detected.\n\nAlongside her technical work, Ericsson became known as a dedicated advocate for women and underrepresented students in engineering, frequently mentoring students and speaking about her path into aerospace. Her career shows that groundbreaking space science depends not only on astronauts and mission commanders, but on the engineers who design the precise instruments making discovery possible.",
    "questions": [
      {
        "id": "q1",
        "type": "choice",
        "prompt": "What is the main idea of this passage?",
        "choices": [
          "Aprille Ericsson only ever watched Apollo missions on television",
          "Aprille Ericsson became a pioneering instrument engineer at NASA, designing precise scientific tools for major space missions",
          "Aprille Ericsson was an astronaut who traveled to the Moon",
          "Aprille Ericsson's career ended after earning her PhD"
        ],
        "answer": 1,
        "explanation": "The passage centers on her rise to become an instrument engineer at NASA Goddard, contributing to major missions over a 30+ year career.",
        "choiceFeedback": [
          "That is the first sentence, not the point. Watching Apollo is where her curiosity started; the passage is about the engineering that followed.",
          null,
          "She built instruments that went to the Moon; she did not go herself. The passage is careful about that difference.",
          "The PhD is a door, not a destination. More than thirty years at Goddard came after it."
        ],
        "xp": 10
      },
      {
        "id": "q2",
        "type": "choice",
        "prompt": "What does 'instrument engineer' most likely mean, based on how the passage describes Ericsson's specialty?",
        "choices": [
          "An engineer who designs the precise scientific tools spacecraft carry to gather data",
          "An engineer who only pilots spacecraft",
          "A musician who performs at NASA events",
          "An engineer who only manages financial budgets"
        ],
        "answer": 0,
        "explanation": "The passage explains her specialty was \"the precise scientific instruments spacecraft carry to actually gather data,\" rather than designing entire spacecraft.",
        "choiceFeedback": [
          null,
          "Piloting is not engineering, and she did neither. She designed the sensing tools that spacecraft carry.",
          "You have picked the musical meaning of 'instrument.' In science it means a precise tool for measuring things.",
          "The passage never puts her near budgets. Her work was hands-on design of scientific hardware."
        ],
        "xp": 10
      },
      {
        "id": "q3",
        "type": "choice",
        "prompt": "What historic achievement did Ericsson reach at Howard University?",
        "choices": [
          "She became the first Black American woman to earn a PhD in mechanical engineering there",
          "She became the university president",
          "She was the first student ever enrolled there",
          "She refused to attend graduate school"
        ],
        "answer": 0,
        "explanation": "The passage states she became the first Black American woman to earn a PhD in mechanical engineering from Howard University.",
        "choiceFeedback": [
          null,
          "She was a graduate student there, not an administrator. Her first was earning a degree nobody like her had earned there before.",
          "Howard University is well over a century old. Her milestone was about a specific doctorate, not the school's first enrollment.",
          "She earned both a master's and a PhD there. This says the opposite of what happened."
        ],
        "xp": 10
      },
      {
        "id": "q4",
        "type": "choice",
        "prompt": "What instrument did Ericsson work on that launched in 2009 to map the Moon?",
        "choices": [
          "The Lunar Orbiter Laser Altimeter",
          "The James Webb Space Telescope",
          "The Hubble Space Telescope",
          "The Apollo Guidance Computer"
        ],
        "answer": 0,
        "explanation": "The passage states her work included the Lunar Orbiter Laser Altimeter, which launched in 2009.",
        "choiceFeedback": [
          null,
          "Webb is in the passage, but it studies distant galaxies and launched much later. The 2009 lunar mapper is the other one.",
          "Hubble went up in 1990 and looks out into deep space. It is not a Moon-mapping instrument.",
          "That is 1960s hardware, from before she was an engineer. The instrument in this question launched in 2009."
        ],
        "xp": 10
      }
    ]
  },
  {
    "id": "ss7-tb-stephanie-wilson",
    "subject": "socialStudies",
    "tier": 1,
    "isTrailblazerBio": true,
    "sequenceInLibrary": 14,
    "title": "Stephanie Wilson: Operating the Robotic Arm",
    "theme": "Biography — main idea, vocabulary in context, and supporting details",
    "passage": "Stephanie Wilson grew up in Pittsfield, Massachusetts, and went on to earn a bachelor's degree in engineering science from Harvard University in 1988. She later earned a master's degree in aerospace engineering from the University of Texas at Austin.\n\nBefore becoming an astronaut, Wilson worked as a loads and dynamics engineer at Martin Marietta Astronautics, contributing to the Titan IV rocket program, and later as a project engineer at NASA's Jet Propulsion Laboratory, supporting the Galileo mission to Jupiter. NASA selected her as an astronaut candidate in 1996.\n\nWilson flew on three space shuttle missions: STS-121 in 2006, STS-120 in 2007, and STS-131 in 2010. On STS-120, she helped deliver and attach the Harmony connecting module to the International Space Station. Across her missions, Wilson became known for her skill operating the shuttle and station's robotic arms, using them to move equipment, attach new modules, and support spacewalking astronauts outside the spacecraft. She became the second Black American woman to travel to space, after Mae Jemison.\n\nIn 2020, NASA selected Wilson as a member of the Artemis Team, astronauts eligible for future missions to the Moon. Her career reflects a path many astronauts share: years of technical engineering work on the ground, building the exact skills needed to operate the complex machinery of human spaceflight.",
    "questions": [
      {
        "id": "q1",
        "type": "choice",
        "prompt": "What is the main idea of this passage?",
        "choices": [
          "Stephanie Wilson only ever worked as a rocket engineer on the ground",
          "Stephanie Wilson built an engineering career that led to three shuttle missions, where she became known for operating robotic arms",
          "Stephanie Wilson was the first woman ever to fly in space",
          "Stephanie Wilson's career ended after her first shuttle mission"
        ],
        "answer": 1,
        "explanation": "The passage traces her engineering background through three shuttle missions and her robotic-arm expertise.",
        "choiceFeedback": [
          "The ground work is real and it matters, but it is the first half. She flew three shuttle missions after it.",
          null,
          "That first happened in 1963, long before her. The passage names her the second Black American woman in space.",
          "Her first flight was in 2006, followed by 2007 and 2010, and Artemis Team selection in 2020."
        ],
        "xp": 10
      },
      {
        "id": "q2",
        "type": "choice",
        "prompt": "What does 'loads and dynamics engineer' most likely involve, based on the passage's context?",
        "choices": [
          "Technical engineering work analyzing forces and structural behavior for a rocket program",
          "Operating a spacecraft during an actual mission",
          "Selling rocket parts to customers",
          "Teaching elementary school science"
        ],
        "answer": 0,
        "explanation": "The passage places this role within her technical engineering career on the Titan IV rocket program, before she became an astronaut.",
        "choiceFeedback": [
          null,
          "This role sits at a desk before launch. The passage places it at Martin Marietta on the Titan IV program, years before she flew.",
          "'Loads' can sound like shipping, but here it means the physical forces acting on a rocket, not cargo being sold.",
          "Nothing in the passage puts her in a classroom. Every job listed before NASA is technical engineering."
        ],
        "xp": 10
      },
      {
        "id": "q3",
        "type": "choice",
        "prompt": "What was Wilson specifically known for during her space shuttle missions?",
        "choices": [
          "Operating the robotic arms to move equipment and attach modules",
          "Piloting the shuttle during launch",
          "Designing the Harmony module before it launched",
          "Serving as the mission commander"
        ],
        "answer": 0,
        "explanation": "The passage states she became known for her skill operating the robotic arms during her missions.",
        "choiceFeedback": [
          null,
          "Mission specialists do not fly the shuttle. Her specialty was the robotic arms, used once the crew was already in orbit.",
          "She delivered and attached Harmony. Designing it was somebody else's work, years earlier.",
          "Commander is a different seat. The passage names arm operation, not command, as what she became known for."
        ],
        "xp": 10
      },
      {
        "id": "q4",
        "type": "choice",
        "prompt": "What team was Wilson selected to join in 2020?",
        "choices": [
          "The Artemis Team, astronauts eligible for future Moon missions",
          "The original Mercury astronaut class",
          "A team designing a new space telescope",
          "A team with no connection to spaceflight"
        ],
        "answer": 0,
        "explanation": "The passage states NASA selected her for the Artemis Team in 2020.",
        "choiceFeedback": [
          null,
          "The Mercury astronauts were chosen in 1959, decades before this. Her 2020 selection was for Artemis.",
          "Telescopes are not what 2020 put her on. The Artemis Team is about crews for future Moon missions.",
          "Everything about this selection is spaceflight. Artemis is NASA's program for returning humans to the Moon."
        ],
        "xp": 10
      }
    ]
  },
  {
    "id": "ss7-tb-robert-lawrence",
    "subject": "socialStudies",
    "tier": 1,
    "isTrailblazerBio": true,
    "sequenceInLibrary": 15,
    "title": "Robert Henry Lawrence Jr.: A Pioneer Who Never Flew",
    "theme": "Biography — main idea, vocabulary in context, and supporting details",
    "passage": "Robert Henry Lawrence Jr. was born in Chicago in 1935 and graduated near the top of his high school class. He earned a bachelor's degree in chemistry from Bradley University at just 20 years old, then joined the U.S. Air Force, where he trained as a pilot. Over the following years, Lawrence logged more than 2,500 hours of flight time, including 2,000 hours in jet aircraft, while also earning a PhD in physical chemistry from Ohio State University in 1965.\n\nOn June 30, 1967, the Air Force selected Lawrence for the Manned Orbiting Laboratory program, a military space project designed to test small crewed space stations in orbit. With that selection, Lawrence became the first Black American chosen as an astronaut by any national space program. Asked about the significance of the moment, Lawrence responded with characteristic modesty: \"This is nothing dramatic. It's just a normal progression. I've been very fortunate.\"\n\nTragically, Lawrence never had the chance to travel to space. On December 8, 1967, just over five months after his selection, he was killed when the jet he was flying in crashed during a training exercise at Edwards Air Force Base. He was training another pilot on a steep landing technique designed to mimic how a spacecraft returns from orbit.\n\nFor thirty years, Lawrence's name was left off the Astronaut Memorial at Kennedy Space Center, since he had never technically flown a space mission. In 1997, that decision was reversed, and his name was finally added — recognizing him, at last, as the pioneer he was.",
    "questions": [
      {
        "id": "q1",
        "type": "choice",
        "prompt": "What is the main idea of this passage?",
        "choices": [
          "Robert Lawrence flew several successful space missions",
          "Robert Lawrence became the first Black American selected as an astronaut, but died in a training accident before he could fly to space",
          "Robert Lawrence refused to join the Air Force",
          "Robert Lawrence's achievements were quickly forgotten and never recognized"
        ],
        "answer": 1,
        "explanation": "The passage centers on his historic selection and his death before flying, closing with his eventual recognition in 1997.",
        "choiceFeedback": [
          "He never reached space, and that is the hard centre of the passage. He died five months after being selected.",
          null,
          "He joined the Air Force and trained as a pilot there, logging more than 2,500 flight hours.",
          "The recognition was slow, but it came. His name was added to the Astronaut Memorial in 1997."
        ],
        "xp": 10
      },
      {
        "id": "q2",
        "type": "choice",
        "prompt": "What was the purpose of the training exercise Lawrence was flying when he died?",
        "choices": [
          "Practicing a steep landing technique designed to mimic a spacecraft returning from orbit",
          "Testing a brand-new rocket engine",
          "Delivering supplies to a space station",
          "Repairing a satellite in orbit"
        ],
        "answer": 0,
        "explanation": "The passage states he was training another pilot on a steep landing technique mimicking spacecraft reentry.",
        "choiceFeedback": [
          null,
          "He was in a jet, teaching another pilot. No engine test appears anywhere in the passage.",
          "This was practice on Earth, at Edwards Air Force Base. The station program he was selected for never flew a crew.",
          "He never went to orbit. The exercise was a landing technique flown in the atmosphere."
        ],
        "xp": 10
      },
      {
        "id": "q3",
        "type": "choice",
        "prompt": "What can you infer from Lawrence's quote, 'This is nothing dramatic. It's just a normal progression'?",
        "choices": [
          "He was being modest about a historically significant achievement",
          "He did not think his selection mattered to anyone",
          "He was disappointed by his selection",
          "He believed the achievement belonged to someone else"
        ],
        "answer": 0,
        "explanation": "Downplaying a genuinely historic first, while clearly still proud enough to comment on it, suggests modesty rather than indifference.",
        "choiceFeedback": [
          null,
          "Playing something down is not the same as thinking it worthless. He called himself 'very fortunate,' which is not indifference.",
          "There is no disappointment in the words. Calling it a normal progression is a way of staying humble about a first.",
          "He does not hand the credit away. He accepts it quietly, as a step in a path he had been walking for years."
        ],
        "xp": 10
      },
      {
        "id": "q4",
        "type": "choice",
        "prompt": "What happened regarding the Astronaut Memorial at Kennedy Space Center, according to the passage?",
        "choices": [
          "Lawrence's name was excluded for thirty years, then added in 1997",
          "Lawrence's name was included immediately after his death",
          "Lawrence's name has never been added to the memorial",
          "The memorial was built specifically for Lawrence"
        ],
        "answer": 0,
        "explanation": "The passage states his name was left off for thirty years, then added in 1997.",
        "choiceFeedback": [
          null,
          "The opposite happened. His name was left off for thirty years before that decision was reversed.",
          "His name was added, just thirty years late. 1997 is the year the memorial decision was finally reversed.",
          "The memorial honours astronauts who died in the line of duty. He was the one nearly left out of it, not the reason for it."
        ],
        "xp": 10
      }
    ]
  },
  {
    "id": "ss7-tb-bernard-harris",
    "subject": "socialStudies",
    "tier": 1,
    "isTrailblazerBio": true,
    "sequenceInLibrary": 16,
    "title": "Bernard Harris Jr.: First to Walk in Space",
    "theme": "Biography — main idea, vocabulary in context, and supporting details",
    "passage": "Bernard Harris Jr. was born in Temple, Texas, in 1956. At thirteen years old, he watched the Apollo 11 Moon landing on television and decided he wanted to become an astronaut. He wrote a letter to NASA asking what it would take, and the agency wrote back: he would need at least a master's degree, relevant experience, and the ability to work well as part of a team.\n\nHarris took that advice seriously. Since there was no direct path to becoming an astronaut, he built his career around medicine instead, reasoning it would let him help people while working toward his larger goal. He earned a bachelor's degree in biology from the University of Houston in 1978, then a medical degree from Texas Tech University in 1982, and completed a residency in internal medicine at the Mayo Clinic in 1985.\n\nIn 1987, Harris joined NASA as a research fellow studying how astronauts lose bone density during spaceflight, and trained as a flight surgeon. His first application to the astronaut program in 1987 was unsuccessful, but he applied again in 1990 and was selected. He flew his first mission aboard the space shuttle Columbia in 1991, and a second mission aboard Discovery in February 1995.\n\nDuring that second mission, Harris became the first Black American astronaut to perform a spacewalk, working outside the shuttle while it was docked in a historic rendezvous with the Russian space station Mir. He later said that seeing Earth from outside the spacecraft gave him \"a sense of grounding,\" confirming his place in something much larger than himself. Harris left NASA in 1996 and went on to found a nonprofit foundation supporting math and science education for young people.",
    "questions": [
      {
        "id": "q1",
        "type": "choice",
        "prompt": "What is the main idea of this passage?",
        "choices": [
          "Bernard Harris Jr. was only ever a medical doctor with no connection to NASA",
          "Bernard Harris Jr. built a medical career specifically to work toward becoming an astronaut, eventually becoming the first Black American to walk in space",
          "Bernard Harris Jr. was the first person ever to walk in space",
          "Bernard Harris Jr.'s astronaut application was rejected and he never reapplied"
        ],
        "answer": 1,
        "explanation": "The passage traces his deliberate path through medicine toward his childhood goal, culminating in his historic 1995 spacewalk.",
        "choiceFeedback": [
          "Medicine was his route, not the whole trip. He joined NASA as a research fellow and flew two missions.",
          null,
          "The first spacewalk by anyone happened in 1965, thirty years earlier. His first was more specific than that.",
          "The 1987 rejection is real, but 'never reapplied' is wrong. He applied again in 1990 and was selected."
        ],
        "xp": 10
      },
      {
        "id": "q2",
        "type": "choice",
        "prompt": "What does NASA's advice — that he needed a master's degree, relevant experience, and to work well as part of a team — suggest about the astronaut selection process?",
        "choices": [
          "It considers more than just raw talent, valuing collaboration and sustained qualification over many years",
          "It only cares about physical fitness",
          "Anyone can become an astronaut with no preparation at all",
          "It has no specific requirements of any kind"
        ],
        "answer": 0,
        "explanation": "The specific, multi-part requirements suggest a selective process valuing sustained preparation and teamwork, not just talent alone.",
        "choiceFeedback": [
          null,
          "Fitness is not on the list NASA sent him. Every item was about education, experience, or working with others.",
          "The reply named three specific requirements. That is the opposite of needing no preparation.",
          "NASA answered with a concrete list. A list is exactly what a requirement looks like."
        ],
        "xp": 10
      },
      {
        "id": "q3",
        "type": "choice",
        "prompt": "What historic achievement did Harris accomplish during his 1995 mission?",
        "choices": [
          "He became the first Black American to perform a spacewalk",
          "He became the first person to travel to Mars",
          "He was the first American in space",
          "He built the International Space Station single-handedly"
        ],
        "answer": 0,
        "explanation": "The passage states he became the first Black American astronaut to perform a spacewalk during his 1995 mission.",
        "choiceFeedback": [
          null,
          "No human has travelled to Mars. His 1995 mission stayed in Earth orbit, docked with the station Mir.",
          "That belongs to Alan Shepard in 1961. Harris's first was about stepping outside the spacecraft.",
          "The station in this passage is Mir, and no station is built by one person. He was a spacewalker, not a construction crew."
        ],
        "xp": 10
      },
      {
        "id": "q4",
        "type": "choice",
        "prompt": "What happened when Harris first applied to NASA's astronaut program in 1987?",
        "choices": [
          "His application was unsuccessful, but he reapplied in 1990 and was selected",
          "He was selected immediately on his first attempt",
          "He never applied to the astronaut program at all",
          "He was selected but declined the position"
        ],
        "answer": 0,
        "explanation": "The passage states his 1987 application was unsuccessful, and he was selected after reapplying in 1990.",
        "choiceFeedback": [
          null,
          "The first attempt did not work. What the passage highlights is that he tried again three years later.",
          "He applied twice: 1987 was the first try, and 1990 was the successful one.",
          "He was not turning anything down. He wanted the job enough to reapply after being turned down himself."
        ],
        "xp": 10
      }
    ]
  },
  {
    "id": "ss7-tb-joan-higginbotham",
    "subject": "socialStudies",
    "tier": 1,
    "isTrailblazerBio": true,
    "sequenceInLibrary": 17,
    "title": "Joan Higginbotham: Engineer Turned Astronaut",
    "theme": "Biography — main idea, vocabulary in context, and supporting details",
    "passage": "Joan Higginbotham was born in Chicago, Illinois, in 1964. She earned a bachelor's degree in electrical engineering from Southern Illinois University in 1987 and joined NASA that same year as a payload electrical engineer at the Kennedy Space Center in Florida.\n\nOver the next nine years, Higginbotham steadily advanced through engineering roles at Kennedy Space Center, eventually becoming lead orbiter project engineer for the space shuttle Columbia. In that role, she held a key technical position in the launch firing room, helping manage testing and troubleshooting for the vehicle. Over her time at Kennedy, she supported 53 separate space shuttle launches — direct, hands-on experience with nearly every part of how a shuttle mission comes together on the ground.\n\nIn 1996, NASA selected Higginbotham as an astronaut candidate. Ten years later, in December 2006, she flew aboard the space shuttle Discovery on mission STS-116, becoming the third Black American woman to travel into space, after Mae Jemison and Stephanie Wilson. During the nearly thirteen-day mission, she helped operate the International Space Station's robotic arm as the crew continued assembling the station.\n\nHigginbotham retired from NASA in 2007 after more than two decades with the agency, having worked her way from an entry-level engineering position to the crew of an actual spaceflight — a path that reflects how deeply ground-based engineering expertise and astronaut careers can be connected.",
    "questions": [
      {
        "id": "q1",
        "type": "choice",
        "prompt": "What is the main idea of this passage?",
        "choices": [
          "Joan Higginbotham became an astronaut with no prior technical experience",
          "Joan Higginbotham built nearly a decade of hands-on shuttle engineering experience before becoming the third Black American woman in space",
          "Joan Higginbotham was the first woman ever to fly in space",
          "Joan Higginbotham's engineering career had no connection to her later spaceflight"
        ],
        "answer": 1,
        "explanation": "The passage traces her nine years of shuttle engineering work at Kennedy Space Center directly into her eventual selection and spaceflight.",
        "choiceFeedback": [
          "She had nine years of shuttle engineering before NASA selected her. That experience is the spine of the passage.",
          null,
          "That milestone dates to 1963. The passage places her third among Black American women to fly.",
          "The passage argues the opposite: the ground engineering and the spaceflight are directly connected."
        ],
        "xp": 10
      },
      {
        "id": "q2",
        "type": "choice",
        "prompt": "What does supporting '53 separate space shuttle launches' suggest about Higginbotham's engineering experience before becoming an astronaut?",
        "choices": [
          "She had extensive, repeated hands-on experience with shuttle operations long before she ever flew one herself",
          "She had never worked on a shuttle launch before her own mission",
          "She only observed launches without any technical role",
          "This detail is unrelated to her later astronaut career"
        ],
        "answer": 0,
        "explanation": "Supporting 53 launches over nine years reflects deep, repeated hands-on experience with shuttle operations before her own flight.",
        "choiceFeedback": [
          null,
          "Fifty-three launches is the evidence against this. She supported every one of them from the ground.",
          "Observing and supporting are different things. She held a key technical seat in the launch firing room.",
          "An inference question asks what a detail is doing there. This one shows how well she knew the vehicle before she rode it."
        ],
        "xp": 10
      },
      {
        "id": "q3",
        "type": "choice",
        "prompt": "What historic milestone did Higginbotham reach during her 2006 mission?",
        "choices": [
          "She became the third Black American woman to travel into space",
          "She became the first woman ever to travel into space",
          "She became the first American to orbit Earth",
          "She was the first person to operate a robotic arm in space"
        ],
        "answer": 0,
        "explanation": "The passage states she became the third Black American woman in space, after Mae Jemison and Stephanie Wilson.",
        "choiceFeedback": [
          null,
          "Women had been flying to space since 1963. The passage counts her third among Black American women.",
          "John Glenn did that in 1962, more than forty years earlier. Her 2006 flight was a shuttle mission to the space station.",
          "She did work the arm, but not first. Astronauts had been operating robotic arms on missions for years before hers."
        ],
        "xp": 10
      },
      {
        "id": "q4",
        "type": "choice",
        "prompt": "What was Higginbotham's role during the STS-116 mission?",
        "choices": [
          "She helped operate the International Space Station's robotic arm during station assembly",
          "She piloted the space shuttle alone",
          "She remained on the ground the entire mission",
          "She built the shuttle before the mission began"
        ],
        "answer": 0,
        "explanation": "The passage states she helped operate the robotic arm as the crew continued assembling the station.",
        "choiceFeedback": [
          null,
          "No shuttle ever flew with one person aboard, and she was a mission specialist rather than the pilot.",
          "Her ground years ended in 1996. On STS-116 she was aboard Discovery for nearly thirteen days.",
          "She tested and troubleshot shuttles, which is not the same as building them. This question also asks about her job during the flight."
        ],
        "xp": 10
      }
    ]
  }
];
