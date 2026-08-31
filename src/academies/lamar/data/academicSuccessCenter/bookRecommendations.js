import { blackExcellenceBooksForSubject } from './blackExcellenceLibrary.js';

/**
 * Book recommendations — real, verified candidate books per slot.
 *
 * WHY THIS EXISTS: Part 9's "Parent Approval Workflow" says
 * recommendations should arrive Pending and the parent should Approve,
 * Reject, or Replace them. The first version of the Academic Success
 * Center shipped blank slots for her to fill in instead — which the
 * parent flagged directly: "I thought the books were to be assigned per
 * subject and I will just agree or disagree with the book." She was
 * right. This file is the fix.
 *
 * The original reasoning ("never invent a book title") is still correct
 * and still enforced. What it got wrong was concluding that meant no
 * recommendations at all. Inventing a title and recommending a
 * researched real one are completely different things — the Black
 * American Excellence Library already proved the second one works.
 *
 * EVERY TITLE HERE WAS VERIFIED BY WEB RESEARCH ON AUG 5, 2026 against
 * publisher pages, Junior Library Guild, School Library Journal, Kirkus,
 * Publishers Weekly, Common Sense Media, Booksource, or library catalog
 * records. Each entry carries the `source` URL it was verified against.
 * Nothing here is recalled from memory or approximated. Any title added
 * later must be verified the same way.
 *
 * `level` is the publisher's or a review source's stated audience — not
 * an invented Lexile. `heads_up` carries real content warnings a parent
 * would want before assigning: this is a 12-year-old, and several of
 * these books contain death, war, or refugee violence. Surfacing that
 * at the approval moment is the whole point of an approval workflow.
 *
 * Keyed by `slotId` from placeholders.js. Order matters — candidate [0]
 * is offered first, and rejecting it advances to [1], then [2].
 */
export const bookRecommendations = {
  // ---------------- Aerospace ----------------
  'book::aerospace::1': [
    {
      id: 'rec-apollo8',
      title: 'Apollo 8: The Mission That Changed Everything',
      author: 'Martin W. Sandler',
      publisher: 'Candlewick Press',
      year: 2018,
      level: 'Grades 5-8',
      about:
        'Narrative history of the 1968 mission that first carried humans out of Earth orbit, with crew profiles, source notes, and photographs.',
      why: 'A real mission, quarter-length, told as a story — the best single spine for a quarter of Aerospace reading.',
      source: 'https://www.juniorlibraryguild.com/apollo-8-the-mission-that-changed-everyt-9780763694890j'
    },
    {
      id: 'rec-space-race-nomad',
      title: 'The Space Race: How the Cold War Put Humans on the Moon',
      author: 'Matthew Brenden Wood',
      publisher: 'Nomad Press',
      year: 2017,
      level: 'Grades 7-9',
      about:
        'Six-chapter history of the US-Soviet space race with primary-source links, timelines, and built-in inquiry activities.',
      why: 'Has lesson structure baked in, so it paces itself across a quarter without you building a reading plan.',
      source: 'https://nomadpress.net/nomadpress-books/the-space-race/'
    },
    {
      id: 'rec-higher-steeper-faster',
      title: 'Higher, Steeper, Faster: The Daredevils Who Conquered the Skies',
      author: 'Lawrence Goldstone',
      publisher: 'Little, Brown Books for Young Readers',
      year: 2017,
      level: 'Ages 11-15',
      about:
        'Early aviation from 1903-1915, centered on exhibition flyer Lincoln Beachey and how stunt flying drove real aerodynamic advances.',
      why: 'Connects directly to the Aerospace lessons on lift and control surfaces — the daredevils were doing flight testing.',
      source: 'https://www.kirkusreviews.com/book-reviews/lawrence-goldstone/higher-steeper-faster/'
    }
  ],
  'book::aerospace::2': [
    {
      id: 'rec-spaceman-yr',
      title: 'Spaceman (Adapted for Young Readers)',
      author: 'Mike Massimino',
      publisher: 'Crown Books for Young Readers',
      year: 2020,
      level: 'Grades 4-7',
      about:
        "A working-class kid rejected by NASA three times who became a spacewalker on two Hubble servicing missions.",
      why: 'The strongest "how do you actually become an engineer at NASA" story of the three, including the rejections.',
      source: 'https://www.penguinrandomhouse.com/books/609745/spaceman-adapted-for-young-readers-by-mike-massimino/'
    },
    {
      id: 'rec-endurance-yr',
      title: 'Endurance, Young Readers Edition: My Year in Space and How I Got There',
      author: 'Scott Kelly',
      publisher: 'Crown Books for Young Readers',
      year: 2018,
      level: 'Grades 3-7',
      about: 'A year aboard the ISS, plus the path from struggling student to test pilot to astronaut.',
      why: 'Kelly was a poor student who turned it around — a genuinely useful message alongside the space content.',
      source: 'https://www.penguinrandomhouse.com/books/553875/endurance-young-readers-edition-by-scott-kelly/'
    },
    {
      id: 'rec-wright-brothers',
      title: 'The Wright Brothers: How They Invented the Airplane',
      author: 'Russell Freedman',
      publisher: 'Holiday House',
      year: 1991,
      level: 'Age 10+ (Newbery Honor)',
      about: 'Photo-illustrated biography focused on the brothers\' design-test-redesign method.',
      why: 'The clearest picture in print of the engineering design process the Aerospace course teaches.',
      source: 'https://holidayhouse.com/book/the-wright-brothers/'
    }
  ],
  'book::aerospace::3': [
    {
      id: 'rec-way-things-work-now',
      title: 'The Way Things Work Now',
      author: 'David Macaulay',
      publisher: 'Houghton Mifflin Harcourt',
      year: 2016,
      level: 'Grade 6+',
      about:
        'Illustrated reference explaining mechanisms from levers and turbines to jet engines, sensors, and computers.',
      why: 'The most durable shelf reference here — it will still be useful in high school.',
      source: 'https://www.slj.com/review/the-way-things-work-now'
    },
    {
      id: 'rec-rocketry-nomad',
      title: 'Rocketry: Investigate the Science and Technology of Rockets and Ballistics',
      author: 'Carla Mooney',
      publisher: 'Nomad Press',
      year: 2014,
      level: 'Grades 4-6 (Lexile 990L)',
      about: 'Thrust, drag, stability, fins, and recovery systems, plus 25 buildable projects.',
      why: 'The only true rocketry handbook that exists at a children\'s level — see the honest note below.',
      heads_up:
        'Reads a bit young on paper (grades 4-6), though its Lexile is on target. The real rocketry references (Stine\'s Handbook of Model Rocketry) are written for adults.',
      source: 'https://nomadpress.net/nomadpress-books/rocketry/'
    },
    {
      id: 'rec-engineering-nomad',
      title: 'Engineering: How the Six Simple Machines Support the World',
      author: 'Carla Mooney',
      publisher: 'Nomad Press',
      year: 2025,
      level: 'Grades 7-10',
      about: 'Mechanical advantage and the engineering design process, with hands-on activities.',
      why: 'Right reading level and right process, though general engineering rather than aerospace specifically.',
      source: 'https://nomadpress.net/nomadpress-books/engineering/'
    }
  ],

  // ---------------- Science ----------------
  'book::science::1': [
    {
      id: 'rec-cells-nomad',
      title: 'Cells: Experience Life at Its Tiniest',
      author: 'Karen Bush Gibson',
      publisher: 'Nomad Press',
      year: 2016,
      level: 'Grades 7-9',
      about: 'Cell structure and function, single-celled organisms, and cell science in medicine and agriculture.',
      why: "Maps almost directly onto Khan Academy's MS Biology cells unit, so it reinforces rather than competes.",
      source: 'https://nomadpress.net/nomadpress-books/cells/'
    },
    {
      id: 'rec-genetics-nomad',
      title: 'Genetics: Breaking the Code of Your DNA',
      author: 'Carla Mooney',
      publisher: 'Nomad Press',
      year: 2014,
      level: 'Grades 7-10',
      about: 'Chromosomes, DNA structure, heredity, GMOs, and stem cells, with a 3-D helix build and Punnett squares.',
      why: "Pairs with Khan's inheritance and variation unit, and the hands-on builds double as lab work.",
      source: 'https://nomadpress.net/nomadpress-books/genetics/'
    },
    {
      id: 'rec-bubonic-panic',
      title: 'Bubonic Panic: When Plague Invaded America',
      author: 'Gail Jarrow',
      publisher: 'Calkins Creek',
      year: 2016,
      level: 'Grade 5+',
      about: 'The 1900 San Francisco plague outbreak and the science that identified the bacterium and its carriers.',
      why: 'Real microbiology told as a detective story, with primary sources — good research-paper material.',
      heads_up: 'Deals with a real epidemic: illness, death, and period racism against San Francisco\'s Chinese community.',
      source: 'https://www.slj.com/review/bubonic-panic-when-plague-invaded-america'
    }
  ],
  'book::science::2': [
    {
      id: 'rec-vancleave-science-fair',
      title: "Janice VanCleave's A+ Science Fair Projects",
      author: 'Janice VanCleave',
      publisher: 'Wiley / Jossey-Bass',
      year: 2003,
      level: 'Grades 5-8',
      about:
        'The full science-fair method — topic selection, experimental design, display, presentation — plus 35 ready-to-run projects.',
      why: 'If a Science Fair project ever gets scheduled, this is the book that teaches him how to actually do one.',
      source: 'https://www.wiley.com/en-us/Janice+VanCleave%27s+A%2B+Science+Fair+Projects-p-9780471331025'
    },
    {
      id: 'rec-epic-engineering-disasters',
      title: 'The Book of Massively Epic Engineering Disasters',
      author: 'Sean Connolly',
      publisher: 'Workman',
      year: 2017,
      level: 'Ages 9-14',
      about:
        'Real engineering failures (Hindenburg, Tacoma Narrows) paired with 33 household-materials experiments that demonstrate the physics behind them.',
      why: 'Strong aerospace crossover, and failure analysis is real engineering practice, not just fun.',
      source: 'https://www.publishersweekly.com/9780761183945'
    },
    {
      id: 'rec-catastrophic-science',
      title: 'The Book of Potentially Catastrophic Science',
      author: 'Sean Connolly',
      publisher: 'Workman',
      year: 2010,
      level: 'Ages 9-14',
      about: '50 hands-on demonstrations from stone tools to particle physics, each with materials and safety notes.',
      why: 'Household materials only, which fits the "affordable materials" rule the Science experiments already follow.',
      source: 'https://www.kirkusreviews.com/book-reviews/sean-connolly/the-book-of-potentially-catastrophic-science/'
    }
  ],

  // ---------------- Technology ----------------
  'book::technology::1': [
    {
      id: 'rec-python-for-kids',
      title: 'Python for Kids, 2nd Edition: A Playful Introduction to Programming',
      author: 'Jason R. Briggs',
      publisher: 'No Starch Press',
      year: 2022,
      level: 'Grade 5+',
      about: 'Python 3 from variables through turtle graphics and tkinter, ending in two complete games.',
      why: 'Python is the language he will actually use for engineering work later. Builds to real finished programs.',
      source: 'https://nostarch.com/python-kids-2nd-edition'
    },
    {
      id: 'rec-get-coding',
      title: 'Get Coding! Learn HTML, CSS, and JavaScript',
      author: 'Young Rewired State',
      publisher: 'Candlewick Press',
      year: 2016,
      level: 'Grade 7+ (School Library Journal)',
      about: 'A mission-based story that teaches HTML, CSS, and JavaScript by building a real page, app, and game.',
      why: 'The closest match to the Q1 web-development lessons — same three technologies, same order.',
      source: 'https://www.candlewick.com/9780763692766/get-coding-learn-html-css-and-javascript-and-build-a-website-app-and-game/'
    },
    {
      id: 'rec-coding-games-python',
      title: 'Coding Games in Python',
      author: 'DK',
      publisher: 'DK Children',
      year: 2018,
      level: 'Grades 4-7',
      about: 'Step-by-step builds of eight Python games using Pygame Zero — loops, functions, and event handling.',
      why: 'Good project supplement if he wants to build something after the lessons rather than read about it.',
      heads_up: 'Reads younger than the other two — better as a project book than a main read.',
      source: 'https://penguinrandomhousesecondaryeducation.com/book/?isbn=9781465473615'
    }
  ],
  'book::technology::2': [
    {
      id: 'rec-boy-harnessed-wind-yr',
      title: 'The Boy Who Harnessed the Wind: Young Readers Edition',
      author: 'William Kamkwamba and Bryan Mealer',
      publisher: 'Dial Books',
      year: 2015,
      level: 'Grades 5-8',
      about:
        'A Malawian teenager teaches himself engineering from library books and builds a working windmill from scrap.',
      why: 'Self-taught engineering with no resources and no permission — the most directly inspiring book on this list.',
      source: 'https://www.juniorlibraryguild.com/the-boy-who-harnessed-the-wind-young-rea-9780803740808j'
    },
    {
      id: 'rec-steve-jobs-insanely-great',
      title: 'Steve Jobs: Insanely Great',
      author: 'Jessie Hartland',
      publisher: 'Anne Schwartz Books',
      year: 2015,
      level: 'Grade 7+',
      about: 'A hand-lettered graphic-novel biography from the garage-startup years through the products that followed.',
      why: 'Graphic-novel format makes it an easy read, and it covers the business side of technology, not just the code.',
      source: 'https://www.penguinrandomhouse.com/books/221297/steve-jobs-insanely-great-by-jessie-hartland/'
    },
    {
      id: 'rec-girls-who-code',
      title: 'Girls Who Code: Learn to Code and Change the World',
      author: 'Reshma Saujani',
      publisher: 'Viking',
      year: 2017,
      level: 'Middle grade',
      about: 'An illustrated introduction to coding concepts alongside profiles of real working programmers.',
      why: 'Concept-first rather than language-first, which makes it a good companion to the hands-on lessons.',
      source: 'https://www.juniorlibraryguild.com/girls-who-code-learn-to-code-and-change-9780425287538j'
    }
  ],

  // ---------------- Mathematics ----------------
  'book::math::1': [
    {
      id: 'rec-number-devil',
      title: 'The Number Devil: A Mathematical Adventure',
      author: 'Hans Magnus Enzensberger',
      publisher: 'Metropolitan Books',
      year: 1998,
      level: 'Ages 11+',
      about:
        'A boy meets a "number devil" across twelve dreams covering primes, powers, Fibonacci numbers, irrationals, and infinity.',
      why: 'Makes real mathematics feel like a story — good for a student who finds Khan Academy math dry.',
      source: 'https://www.publishersweekly.com/9780805057706'
    },
    {
      id: 'rec-archimedes-door',
      title: 'Archimedes and the Door of Science',
      author: 'Jeanne Bendick',
      publisher: 'Bethlehem Books',
      year: 1995,
      level: 'Grades 5-10',
      about: 'The life of Archimedes alongside the geometry, levers, buoyancy, and mechanics he discovered.',
      why: 'Bridges 7th-grade geometry straight into engineering — the same levers show up in the Technology course.',
      source: 'https://www.rainbowresource.com/000211.html'
    }
  ],

  // ---------------- PE & Nutrition ----------------
  'book::pe::1': [
    {
      id: 'rec-way-we-work',
      title: 'The Way We Work: Getting to Know the Amazing Human Body',
      author: 'David Macaulay',
      publisher: 'Houghton Mifflin',
      year: 2008,
      level: 'Ages 12+',
      about:
        'Cutaway-illustrated tour of human physiology from cells and muscle fibers through respiration and circulation.',
      why: 'How the body actually produces and uses energy and force — the "why" behind the workouts, not a fitness plan.',
      source: 'https://www.kirkusreviews.com/book-reviews/david-macaulay/the-way-we-work/'
    },
    {
      id: 'rec-human-body-theater',
      title: 'Human Body Theater: A Nonfiction Revue',
      author: 'Maris Wicks',
      publisher: 'First Second',
      year: 2015,
      level: 'Ages 10-14',
      about: 'A graphic-novel walkthrough of all eleven body systems, narrated by a skeleton emcee.',
      why: 'Genuinely funny and covers the muscular and skeletal systems properly — easy entry point.',
      source: 'https://www.commonsensemedia.org/book-reviews/human-body-theater'
    },
    {
      id: 'rec-fitness-for-life-ms',
      title: 'Fitness for Life: Middle School, 2nd Edition',
      author: 'Corbin, Le Masurier, and Lambdin',
      publisher: 'Human Kinetics',
      year: 2018,
      level: 'Middle school student text',
      about:
        'Standards-based student text on aerobic fitness, muscle fitness, flexibility, nutrition, and building a personal activity plan.',
      why: 'The only real student-facing fitness curriculum I could verify at this level.',
      heads_up:
        'Contains a body-composition unit. Worth previewing that chapter first if you want to keep his program strictly off weight and appearance.',
      source: 'https://us.humankinetics.com/products/fitness-for-life-middle-school-2nd-edition-with-web-resource'
    }
  ],
  'book::pe::2': [
    {
      id: 'rec-young-chefs',
      title: "The Complete Cookbook for Young Chefs",
      author: "America's Test Kitchen Kids",
      publisher: 'Sourcebooks Jabberwocky',
      year: 2018,
      level: 'Grade 4+',
      about: '100+ kid-tested recipes with knife and heat skills, kitchen basics, and MyPlate-based nutrition guidance.',
      why: 'A real cookbook he can cook from independently — a life skill and the Nutrition track at the same time.',
      source: 'https://www.slj.com/review/the-complete-cookbook-for-young-chefs'
    },
    {
      id: 'rec-young-scientists-cookbook',
      title: 'The Complete Cookbook for Young Scientists',
      author: "America's Test Kitchen Kids",
      publisher: "America's Test Kitchen Kids",
      year: 2021,
      level: 'Grades 3-7',
      about: '70+ recipes paired with food-science experiments on emulsions, browning, leavening, and proteins.',
      why: 'Cooking as applied chemistry — counts honestly toward both Nutrition and Science.',
      source: 'https://www.penguinrandomhouse.com/books/673349/the-complete-cookbook-for-young-scientists-by-americas-test-kitchen-kids/'
    },
    {
      id: 'rec-omnivores-dilemma-yr',
      title: "The Omnivore's Dilemma: Young Readers Edition",
      author: 'Michael Pollan',
      publisher: 'Dial Books',
      year: 2009,
      level: 'Grades 5-8',
      about: 'Traces four meals from source to plate — industrial, organic, local-sustainable, and foraged.',
      why: 'Food-systems literacy with no dieting or body-image content anywhere in it.',
      source: 'https://www.booksource.com/products/omnivores-dilemma-for-kids--the-secrets-behind-what-you-eat--the__9781101993835.aspx'
    }
  ],

  // ---------------- Writing ----------------
  'book::writing::1': [
    {
      id: 'rec-woe-is-i-jr',
      title: "Woe Is I Jr.: The Younger Grammarphobe's Guide to Better English",
      author: "Patricia T. O'Conner",
      publisher: "G.P. Putnam's Sons",
      year: 2007,
      level: 'Grades 5-7',
      about: 'A cartoon-illustrated grammar, punctuation, and usage reference built around the mistakes students actually make.',
      why: 'A reference he can look things up in mid-assignment, rather than a book he has to read cover to cover.',
      source: 'https://www.juniorlibraryguild.com/woe-is-i-jr-the-younger-grammarphobe-s-g-9780399243318j'
    },
    {
      id: 'rec-spilling-ink',
      title: "Spilling Ink: A Young Writer's Handbook",
      author: 'Anne Mazer and Ellen Potter',
      publisher: 'Roaring Brook Press',
      year: 2010,
      level: 'Grades 5-9',
      about: 'Two working novelists on voice, character, plot, revision, and beating writer\'s block, with prompts throughout.',
      why: 'Pairs with the Writing Journal — its prompts feed straight into entries he is already writing.',
      source: 'https://www.booksource.com/products/spilling-ink--a-young-writers-handbook__9781596436282.aspx'
    },
    {
      id: 'rec-grammar-girl-students',
      title: 'Grammar Girl Presents the Ultimate Writing Guide for Students',
      author: 'Mignon Fogarty',
      publisher: 'Henry Holt',
      year: 2011,
      level: 'Grades 5-6 text difficulty',
      about: 'Parts of speech, sentence construction, punctuation, style, and how to structure school papers.',
      why: 'The paper-structuring chapters are directly useful when a Research Paper gets assigned.',
      source: 'https://us.macmillan.com/books/9781250217516/grammargirlpresentstheultimatewritingguideforstudents/'
    }
  ],

  // ---------------- Social Studies ----------------
  'book::socialStudies::1': [
    {
      id: 'rec-long-walk-to-water',
      title: 'A Long Walk to Water',
      author: 'Linda Sue Park',
      publisher: 'Clarion Books',
      year: 2010,
      level: 'Grades 5-9 (Lexile 720L)',
      about:
        'Two true-to-life Sudanese stories — a 1985 "Lost Boy" walking across Africa and a girl fetching water in 2008 — that converge on a well-drilling project.',
      why: 'Ends on a real civil-engineering success story, so it connects Africa study to engineering. Short, at 128 pages.',
      heads_up: 'War, refugee camps, deaths of family members, and a lion attack. Widely taught in 6th-7th grade.',
      source: 'https://www.booksource.com/products/long-walk-to-water--a__9780547577319.aspx'
    },
    {
      id: 'rec-royal-kingdoms',
      title: 'The Royal Kingdoms of Ghana, Mali, and Songhay: Life in Medieval Africa',
      author: 'Patricia C. McKissack and Fredrick McKissack',
      publisher: 'Henry Holt',
      year: 1994,
      level: 'Ages 10-14',
      about: 'Narrative history of three West African empires from about AD 500-1700, drawing on folklore and Arab accounts.',
      why: "Matches Khan Academy's Africa unit almost point for point, including Mansa Musa and Timbuktu.",
      source: 'https://www.bu.edu/africa/outreach/teachingresources/history/ancient-to-medieval-history/west-kingdoms-bib/'
    },
    {
      id: 'rec-night-diary',
      title: 'The Night Diary',
      author: 'Veera Hiranandani',
      publisher: 'Dial Books',
      year: 2018,
      level: 'Grades 5-7 (Newbery Honor)',
      about:
        'Twelve-year-old Nisha flees across the newly drawn India-Pakistan border during the 1947 Partition, told in diary entries.',
      why: "Pairs with Khan's Southern Asia units, and the narrator is exactly his age.",
      heads_up: 'Refugee violence, sectarian killings, a stabbing, and starvation — handled soberly, not graphically.',
      source: 'https://www.juniorlibraryguild.com/the-night-diary-9780735228511j'
    }
  ],
  'book::socialStudies::2': [
    {
      id: 'rec-natgeo-genealogy',
      title: 'National Geographic Kids Guide to Genealogy',
      author: 'T. J. Resler',
      publisher: 'National Geographic Kids',
      year: 2018,
      level: 'Grades 3-7',
      about: 'Building a family tree, interviewing relatives, using census and immigration records, and understanding DNA testing.',
      why: 'The best starting point — current, visual, and covers online databases. Easy end of his range, which is fine for a how-to.',
      source: 'https://www.penguinrandomhouse.com/books/557956/national-geographic-kids-guide-to-genealogy-by-tj-resler/'
    },
    {
      id: 'rec-roots-for-kids',
      title: 'Roots for Kids: A Genealogy Guide for Young People, 3rd Edition',
      author: 'Susan Provost Beller',
      publisher: 'Genealogical Publishing Company',
      year: 2020,
      level: 'Grade 4+',
      about: 'A structured research course, built from a twelve-week classroom unit, on databases and primary historical records.',
      why: 'Teaches source citation and record-reading discipline — real research training that transfers to every other subject.',
      source: 'https://genealogical.com/store/roots-for-kids-a-genealogy-guide-for-young-people-3rd-edition/'
    },
    {
      id: 'rec-climbing-family-tree',
      title: 'Climbing Your Family Tree: Online and Off-Line Genealogy for Kids',
      author: 'Ira Wolfman',
      publisher: 'Workman Publishing',
      year: 2002,
      level: 'Middle grade',
      about: 'Immigration records, Ellis Island research, oral history interviewing, and reading old documents.',
      why: 'The most substantive kids\' genealogy manual ever published, with an introduction by Alex Haley.',
      heads_up: '2002 edition — the offline methods hold up well, but its online resource links are two decades out of date.',
      source: 'https://mymcpl.bibliocommons.com/item/show/122801110'
    }
  ],

  // ---------------- Reading & Literature ----------------
  'book::reading::1': [
    {
      id: 'rec-hatchet',
      title: 'Hatchet',
      author: 'Gary Paulsen',
      publisher: 'Atheneum / Aladdin',
      year: 1987,
      level: 'Grades 5-9 (Lexile 1020L, Newbery Honor)',
      about:
        'Thirteen-year-old Brian survives a bush-plane crash in the Canadian wilderness with nothing but a hatchet.',
      why: 'The highest reading level of the three and fundamentally an engineering book — hypothesis, failure, redesign. Ideal book-report material.',
      heads_up:
        "A plane crash and the pilot's onscreen death; Brian carries the secret of his mother's affair and his parents' divorce; a suicide attempt after a rescue plane passes him by.",
      source: 'https://www.booksource.com/products/hatchet__1416936475.aspx'
    },
    {
      id: 'rec-the-giver',
      title: 'The Giver',
      author: 'Lois Lowry',
      publisher: 'HarperCollins',
      year: 1993,
      level: 'Grades 6-12 (Newbery Medal)',
      about:
        'Twelve-year-old Jonas becomes Receiver of Memory and learns the price his engineered "perfect" community pays for stability.',
      why: 'The most commonly assigned 7th-grade novel in America, so discussion questions are everywhere. Also a real ethics-of-technology text.',
      heads_up:
        'An infant is euthanized by lethal injection (explicit in dialogue); the elderly are "released"; puberty is suppressed by pills.',
      source: 'https://www.booksource.com/products/giver--the__9780544336261.aspx'
    },
    {
      id: 'rec-refugee',
      title: 'Refugee',
      author: 'Alan Gratz',
      publisher: 'Scholastic Press',
      year: 2017,
      level: 'Ages 11+ (Common Sense Media)',
      about:
        'Three interlocking journeys — Nazi Germany in 1939, Cuba in 1994, and Aleppo in 2015 — connecting across seventy-five years.',
      why: 'Widely taught, and the Aleppo thread cross-links to the Social Studies Middle East unit — one book, two subjects.',
      heads_up:
        'Common Sense Media flags heavy violence: beatings, a fatal shark attack, a missile strike, drownings. Only two of the three main characters survive.',
      source: 'https://www.commonsensemedia.org/book-reviews/refugee'
    }
  ],
  'book::reading::2': [
    {
      id: 'rec-martian-classroom',
      title: 'The Martian: Classroom Edition',
      author: 'Andy Weir',
      publisher: 'Ballantine Books',
      year: 2016,
      level: 'Grade 5+',
      about:
        'An astronaut stranded alone on Mars has to solve food, water, oxygen, and communication to survive until rescue.',
      why:
        'The single best match on this whole list for an aspiring aerospace engineer. This is the publisher\'s real classroom edition — the profanity of the original is replaced and discussion questions are added.',
      heads_up: 'Still intense peril — decompression, an explosion, injury. No profanity in this edition, no sex.',
      source: 'https://www.penguinrandomhouse.com/books/547696/the-martian-classroom-edition-by-andy-weir/'
    },
    {
      id: 'rec-last-cuentista',
      title: 'The Last Cuentista',
      author: 'Donna Barba Higuera',
      publisher: 'Levine Querido',
      year: 2021,
      level: 'Grades 5-8 (Newbery Medal, Pura Belpré Award)',
      about:
        'Petra wakes from centuries of stasis aboard a generation ship, the only passenger who still remembers a destroyed Earth.',
      why: 'Real science fiction with serious literary credentials — a Newbery Medal and a Pura Belpré in the same year.',
      heads_up: "Earth's destruction, deaths of family members, and an authoritarian group that erases memory.",
      source: 'https://www.juniorlibraryguild.com/the-last-cuentista-9781646140893j'
    },
    {
      id: 'rec-countdown-conspiracy',
      title: 'The Countdown Conspiracy',
      author: 'Katie Slivensky',
      publisher: 'Harper',
      year: 2017,
      level: 'Ages 8-12',
      about:
        'Thirteen-year-old Miranda is one of six cadets training for the first crewed Mars mission when the base is attacked.',
      why: 'Written by a science educator, so the mission details hold up. A fun, on-theme lighter read.',
      heads_up: 'Kirkus found the plotting predictable — the weakest of the three literarily, though the science is sound.',
      source: 'https://www.kirkusreviews.com/book-reviews/katie-slivensky/the-countdown-conspiracy/'
    }
  ],
  'book::reading::3': [
    {
      id: 'rec-skyward',
      title: 'Skyward',
      author: 'Brandon Sanderson',
      publisher: 'Delacorte Press',
      year: 2018,
      level: 'Ages 12-15',
      about:
        'Spensa fights her way into fighter-pilot academy on a besieged planet and secretly rebuilds a wrecked, sarcastic AI starship in a cave.',
      why: 'Flight training plus rebuilding an aircraft from scrap — the closest thing to his exact interests in fiction. 528 pages of momentum.',
      heads_up: 'Military combat and the deaths of several classmates. No sex, only invented profanity.',
      source: 'https://www.kirkusreviews.com/book-reviews/brandon-sanderson/skyward-sanderson/'
    },
    {
      id: 'rec-space-case',
      title: 'Space Case (Moon Base Alpha, Book 1)',
      author: 'Stuart Gibbs',
      publisher: 'Simon & Schuster Books for Young Readers',
      year: 2015,
      level: 'Grades 3-7',
      about: "Twelve-year-old Dash, one of the first kids living on the Moon, investigates a scientist's suspicious death.",
      why: 'Funny and fast, with genuinely researched lunar-habitat engineering. First of a series, so it keeps going.',
      heads_up: 'A murder mystery, but bloodless and comedic. Some potty humor.',
      source: 'https://www.simonandschuster.com/books/Space-Case/Stuart-Gibbs/Moon-Base-Alpha/9781442494879'
    },
    {
      id: 'rec-ungifted',
      title: 'Ungifted',
      author: 'Gordon Korman',
      publisher: 'Balzer + Bray',
      year: 2012,
      level: 'Ages 9+',
      about:
        'A prankster is misfiled into the gifted academy and ends up carrying its robotics team to a combat-robot showdown.',
      why: 'Laugh-out-loud funny and built around a robotics lab — good for turning a slow reading week around.',
      heads_up: 'Mild crude humor, robot combat, and a sex-ed class with pregnancy references.',
      source: 'https://www.commonsensemedia.org/book-reviews/ungifted-book-1'
    }
  ]
};

/**
 * The ordered candidate list for a book slot.
 *
 * Black-Excellence slots draw from the curated Black American Excellence
 * Library instead of the table above, so those slots get real
 * subject-matched candidates too rather than falling through to nothing.
 * Custom books the parent added herself have no candidates — she already
 * chose those.
 */
export function candidatesForBook(book) {
  if (!book || book.isCustom) return [];
  if (book.blackExcellence) {
    return blackExcellenceBooksForSubject(book.subject).map((b) => ({
      id: b.id,
      title: b.title,
      author: b.author,
      publisher: b.publisher,
      year: b.year,
      level: b.level,
      about: b.about,
      why: b.why
    }));
  }
  return bookRecommendations[book.slotId] || [];
}

/**
 * The next candidate awaiting a yes/no on this slot — the first one she
 * hasn't already turned down. Returns null once she's seen them all (or
 * once the slot has a real book in it), which is when the UI falls back
 * to "enter your own."
 */
export function nextRecommendationForBook(book) {
  if (!book || book.title) return null;
  const rejected = new Set(book.rejectedRecommendationIds || []);
  return candidatesForBook(book).find((c) => !rejected.has(c.id)) || null;
}
