/**
 * WHY EACH BOOK ON THE SHELF IS ON THE SHELF.
 *
 * The parent, Aug 7 2026: "I wasn't told why that book was chosen. In the
 * future when a book is recommended I want to know why the book was chosen so
 * he can reference it back to there."
 *
 * The reasoning already existed — in bookRecommendations.js, with a source URL
 * for every title — but it was only ever shown on the SUGGESTION card, before
 * she approved it. The moment a book was accepted into a slot the reasoning
 * vanished, and the slot's note still read "book TBD". So the app's own answer
 * to "why this book?" was, literally, "to be decided."
 *
 * This file is the permanent answer, keyed by slotId so it survives a title
 * change, and it is rendered on every book in the Library where Lamar can read
 * it himself.
 *
 * THE SELECTION RULE, in the parent's words: "I want the first selection to be
 * Black American books but if there isn't a book you can select one out of
 * that range. Black Americans don't [have] a full range of books."
 *
 * So every entry records WHICH of three cases applies, and never leaves the
 * third unexplained:
 *
 *   'by-and-about'  a Black American author writing about Black Americans
 *   'about'         about Black Americans; the author is not
 *   'outside'       outside the range — and `rangeNote` must say WHY, either
 *                   because no such book exists or because the slot itself is
 *                   about something else
 *
 * Six of twenty slots are 'outside'. Every one of those was searched first
 * against Black American authors, and the note says what was looked for and
 * what was found. That is the point: a gap in the market recorded honestly is
 * useful to him; a gap hidden behind a swap is not.
 */

export const BOOK_RANGE_LABELS = {
  'by-and-about': 'Black American author, Black American subject',
  about: 'About Black Americans',
  outside: 'Outside the Black American range — see the note'
};

export const bookRationale = {
  // ---------------------------------------------------------------- Math ----
  'book::math::1': {
    title: 'Reaching for the Moon: The Autobiography of NASA Mathematician Katherine Johnson',
    range: 'by-and-about',
    why: 'Katherine Johnson tells her own story — a segregated West Virginia girlhood, college at fifteen, then hand-computing the flight trajectories for Alan Shepard, John Glenn and Apollo 11. It puts the math you are doing now on the same line as a spacecraft, in the voice of the woman who did it.',
    headsUp: 'Jim Crow segregation and school inequality described plainly. Her first husband dies of a brain tumor.',
    level: '272 pages · Lexile 1040L · Grades 5 and up',
    source: 'https://www.simonandschuster.com/books/Reaching-for-the-Moon/Katherine-Johnson/9781534440845'
  },

  // ------------------------------------------------------------- Reading ----
  'book::reading::1': {
    title: 'Ghost',
    range: 'by-and-about',
    why: 'A Black middle schooler your age is recruited onto an elite track team and has to learn to run toward something instead of away from it. Jason Reynolds was the National Ambassador for Young People’s Literature. Chosen as the required novel because 730L sits dead centre of your tested reading band, and because it is short enough to finish but deep enough to write a real book report about.',
    headsUp: 'Opens with his father shooting at him and his mother; his father is in prison. Ghost steals a pair of running shoes and faces the consequences. Bullying and a fight. No profanity or sexual content.',
    level: '208 pages · Lexile 730L · Grades 5-9',
    source: 'https://www.booksource.com/products/ghost__9781481450164.aspx'
  },
  'book::reading::2': {
    title: "Hidden Figures: Young Readers' Edition",
    range: 'by-and-about',
    why: 'The Black women mathematicians whose calculations put Americans in orbit, written by a Black American author whose own father worked at NASA Langley. It is the clearest available answer to the question of who actually built the space program.',
    headsUp: 'Segregated facilities and workplace discrimination described directly.',
    level: "240 pages · Lexile 1120L · Grades 4-7",
    source: 'https://www.booksource.com/products/hidden-figures-(young-readers-edition)__9780062662378.aspx'
  },
  'book::reading::3': {
    title: 'Tristan Strong Punches a Hole in the Sky',
    range: 'by-and-about',
    why: 'A seventh-grade Black boy punches a Bottle Tree, tears open a portal, and ends up fighting alongside John Henry, Brer Rabbit and Anansi. Chosen as the free-choice read because it is built entirely out of African American folklore and because it is the book on this shelf most likely to be finished in a weekend.',
    headsUp: 'Grief over a friend’s death drives the whole story. Fantasy battle violence, and the bone-ship imagery is a direct Middle Passage allegory that lands hard.',
    level: '496 pages · Ages 8-12 · book one of a trilogy',
    source: 'https://books.disney.com/book/tristan-strong-punches-a-hole-in-the-sky/'
  },
  'book::writing::1': {
    title: "Just Write: Here's How!",
    range: 'by-and-about',
    why: 'Walter Dean Myers showing young writers how he actually built his books — his six-box and four-box outlining systems, with pages from his own notebooks. Chosen because it gives you reusable structure rather than encouragement.',
    rangeNote: 'Searched first for a grammar handbook by a Black American author at middle-school level. There is not one — that shelf is entirely non-Black authors. This is a writing-craft book rather than a grammar reference, and it is aimed at 13+, so it reads a year ahead of you. Grammar mechanics are covered by the Khan Academy language-arts strand instead.',
    headsUp: 'Clean. A few examples come from his own novels about crime and war.',
    level: '176 pages · Grades 8-12',
    source: 'https://harpercollins.co.uk/products/just-write-heres-how-walter-dean-myers'
  },

  // ------------------------------------------------------ Social Studies ----
  'book::socialStudies::1': {
    title: 'A Long Walk to Water',
    range: 'outside',
    why: 'Two true-to-life Sudanese stories — a 1985 "Lost Boy" walking across Africa, and a girl walking eight hours a day for water in 2008 — that converge on a well-drilling project. It ends on a real civil-engineering success story, which is why it sits in an engineering-track curriculum: Salva Dut grew up to found Water for South Sudan and drill the wells.',
    rangeNote: 'This slot is the WORLD REGIONAL HISTORY read — Africa, the Middle East, or Southern and Eastern Asia — so it is deliberately not a Black American book. The author, Linda Sue Park, is Korean American and the subjects are Sudanese. African is not the same as Black American, and this book is not standing in for one: the Black American history read for this subject is Red-Tail Angels, below.',
    headsUp: 'War, refugee camps, deaths of family members, and a lion attack. Widely taught in 6th-7th grade.',
    level: '128 pages · Lexile 720L · Grades 5-9',
    source: 'https://www.booksource.com/products/long-walk-to-water--a__9780547577319.aspx'
  },
  'book::socialStudies::2': {
    title: 'National Geographic Kids Guide to Genealogy',
    range: 'outside',
    why: 'A step-by-step method for tracing a family tree, written for someone your age — interviews, records, and how to organise what you find. It is the how-to manual for the Q2 genealogy quarter.',
    rangeNote: 'Searched first for a middle-grade African American genealogy guide. There is not one. African American genealogy is a deep, well-documented field, but every substantive methods book in it is written for adults — the standard beginner text is Tony Burroughs’ Black Roots, which your mother can work from alongside this. The obstacles specific to tracing Black American ancestry, like the 1870 census wall and Freedmen’s Bureau records, are not covered here and will come from her.',
    headsUp: 'None.',
    level: 'Ages 8-12',
    source: 'https://www.nationalgeographic.com/books/'
  },
  'book::socialStudies::3': {
    title: 'Red-Tail Angels: The Story of the Tuskegee Airmen of World War II',
    range: 'by-and-about',
    why: 'The 332nd Fighter Group — the only all-Black flying unit of the war, who never lost a bomber they escorted — placed inside the wider history of Black American aviation and of segregation in the military. Written by two of the most decorated Black American authors of children’s nonfiction.',
    headsUp: 'Racial discrimination in the military and in American life, and combat losses.',
    level: '144 pages · Grades 6-12',
    source: 'https://www.abebooks.com/9780802782922/Red-Tail-Angels-Story-Tuskegee-Airmen-0802782922/plp'
  },

  // ----------------------------------------------------------- Aerospace ----
  'book::aerospace::1': {
    title: 'Black Wings: Courageous Stories of African Americans in Aviation and Space History',
    range: 'about',
    why: 'Eighty years of Black American flight in one book — 1920s barnstormers, Bessie Coleman, the Coffey School, the Tuskegee Airmen, the integration of the airlines, through to the Shuttle astronaut corps. Chosen because it gives you an unbroken line from crop-duster to spacecraft, with about two hundred real photographs.',
    rangeNote: 'The author, Von Hardesty, is a white Smithsonian curator. It is here on subject rather than authorship: it is the most complete book-length history of Black Americans in aviation and spaceflight in print.',
    headsUp: 'Jim Crow, segregated training, exclusion from the Army Air Corps, and wartime losses.',
    level: '192 pages · Smithsonian Books',
    source: 'https://www.goodreads.com/book/show/2636747-black-wings'
  },
  'book::aerospace::2': {
    title: "Eugene Bullard: World's First Black Fighter Pilot",
    range: 'about',
    why: 'Bullard ran away from Georgia at eleven, stowed away to Europe, and became the first Black American combat pilot — flying for France, because the United States Army Air Service refused him for being Black. Built from his own memoirs. Chosen because it is an aviation-pioneer story almost nobody knows, and because you should know it.',
    rangeNote: 'The author, Larry W. Greenly, is not Black American; Eugene Bullard was. Here on subject.',
    headsUp: 'His father narrowly escaped a lynching, which is what drives him out of Georgia. First World War combat. Racial slurs in period context.',
    level: '147 pages · Booklist Top 10 Multicultural Nonfiction for Youth',
    source: 'https://www.abebooks.com/9781588382801/Eugene-Bullard-Worlds-First-Black-158838280X/plp'
  },
  'book::aerospace::3': {
    title: 'Rocketry: Investigate the Science and Technology of Rockets and Ballistics',
    range: 'outside',
    why: 'The technical reference that stays on the shelf all year — thrust, drag, stability, staging, and the design decisions behind them. This is the book you open when a build does not fly, not one you read front to back.',
    rangeNote: 'Searched first for a rocketry, flight, or engineering-design reference by a Black American author at any level for your age. There is not one. The whole shelf — Stine’s Handbook of Model Rocketry, the Nomad Press and DK design series — is non-Black authors. Kept on technical merit. The Black American science book on the shelf beside it is Neil deGrasse Tyson’s Astrophysics for Young People in a Hurry, which covers the physics rocketry sits on top of.',
    headsUp: 'None.',
    level: 'Nomad Press · Ages 12-15',
    source: 'https://nomadpress.net/nomadpress-books/rocketry/'
  },
  'book::aerospace::4': {
    title: "Chasing Space: Young Readers' Edition",
    range: 'by-and-about',
    why: 'Leland Melvin was drafted by the Detroit Lions, lost the career to an injury, went back to engineering, and flew twice on the Space Shuttle. He also went temporarily deaf in NASA training and was told he would never fly. Chosen because it is the clearest story on this shelf about what happens after a plan falls apart.',
    headsUp: 'Serious injury and the loss of a career; the Columbia disaster.',
    level: "Young Readers' Edition · Grades 5-9",
    source: 'https://www.harpercollins.com/products/chasing-space-young-readers-edition-leland-melvin'
  },

  // ------------------------------------------------------------- Science ----
  'book::science::1': {
    title: 'The Immortal Life of Henrietta Lacks: The Young Reader’s Edition',
    range: 'about',
    why: 'Cells taken from Henrietta Lacks in 1951 without her knowledge became the first immortal human cell line, and they are behind the polio vaccine, cancer research and gene mapping. Chosen because it lands directly on the Khan Academy biology unit you are in — cell division, cancer, cell culture, genetics — and because it is also the clearest lesson available on consent and research ethics, which is engineering ethics too.',
    rangeNote: 'The authors, Rebecca Skloot and Gregory Mone, are not Black American. Henrietta Lacks and her family are, and the book is centrally about them. Here on subject.',
    headsUp: 'Her death from cervical cancer; medical exploitation; the Tuskegee syphilis study; her daughter’s treatment in a segregated institution. The young reader’s edition removes the adult book’s profanity and drug content, but it is still a heavy book.',
    level: '256 pages · Grades 4-8',
    source: 'https://www.betterworldbooks.com/product/detail/the-immortal-life-of-henrietta-lacks-the-young-reader-s-edition-9780375970153'
  },
  'book::science::2': {
    title: "Janice VanCleave's A+ Science Fair Projects",
    range: 'outside',
    why: 'The methods manual for building a real science-fair project — how to form a question, control a variable, record data, and present a result. Kept because it teaches the procedure, which is the part that transfers to every experiment you will ever run.',
    rangeNote: 'Searched first for a science-fair or experiment book by a Black American author at middle-school level. There is not one in mainstream publishing — the entire shelf is non-Black authors. The only titles that surfaced were self-published with no verifiable author or review record, and those are not going in front of you. Kept on merit; pair it with the scientists in Find Where the Wind Goes for what to investigate.',
    headsUp: 'None.',
    level: 'Ages 10-14',
    source: 'https://www.wiley.com/en-us/Janice+VanCleave%27s+A+Science+Fair+Projects-p-9780471331025'
  },
  'book::science::3': {
    title: 'Find Where the Wind Goes: Moments from My Life',
    range: 'by-and-about',
    why: 'Mae Jemison — the first Black woman in space — writing her own life: a Chicago childhood, medical school, the Peace Corps in West Africa, then the Shuttle. Chosen because she is a scientist, a doctor and an astronaut, and the book is about the curiosity underneath all three.',
    headsUp: 'Racism and sexism in school and in her training described directly.',
    level: '196 pages · Grades 5-9',
    source: 'https://www.scholastic.com/teachers/books/find-where-the-wind-goes-by-mae-jemison/'
  },

  // ------------------------------------------------------- PE & Nutrition ----
  'book::pe::1': {
    title: 'The Way We Work: Getting to Know the Amazing Human Body',
    range: 'outside',
    why: 'How the body actually works, drawn at a scale you can see — muscles, lungs, heart, bone. Kept because the physiology is the point of this slot: knowing what a muscle does under load is what makes training make sense.',
    rangeNote: 'Searched first for a sports-science, exercise-physiology or strength-training book for middle schoolers by a Black American author. There is not one — that market is entirely non-Black authors, and the Black-authored youth health shelf is memoir and mental health rather than physiology. Swapping this out would have cost the body-systems content the slot exists for, so it stays and the gap is recorded instead.',
    headsUp: 'Anatomical illustration throughout, including reproductive anatomy.',
    level: '336 pages · Ages 10 and up',
    source: 'https://www.hmhbooks.com/shop/books/the-way-we-work/9780618233786'
  },
  'book::pe::2': {
    title: 'The Complete Cookbook for Young Chefs',
    range: 'outside',
    why: 'Real cooking instruction written for someone your age — knife safety, heat, timing, and why a recipe works, tested by kids before it was published. Kept because it is the book that gets you cooking on your own safely.',
    rangeNote: 'Searched first for a kids’ cookbook by a Black American author. There is not one in mainstream publishing that could be verified. The strong Black American cookbooks — Carla Hall’s Soul Food, Lazarus Lynch’s Son of a Southern Chef — are adult trade books, excellent on heritage and technique but without the safety scaffolding a young cook needs. Carla Hall’s is worth having on the shelf beside this one.',
    headsUp: 'None.',
    level: "America's Test Kitchen Kids · Ages 8-13",
    source: 'https://www.americastestkitchen.com/kids/books'
  },

  // ---------------------------------------------------------- Technology ----
  'book::technology::1': {
    title: 'Python for Kids, 2nd Edition: A Playful Introduction to Programming',
    range: 'outside',
    why: 'The hands-on Python manual behind the Q1-Q2 technology lessons — syntax, loops, functions, and small games you build as you go. Kept because it is a tool you type along with, not a book you read.',
    rangeNote: 'Searched first for a coding manual by a Black American author at middle-school level, across publisher catalogues and computer-science reading lists. There is not one. Rather than swap the technical manual, the narrative computer-science read in this subject was changed instead — see Great Minds of Science, below, which is by a Black American author and profiles a Black American engineer and the mathematician behind GPS.',
    headsUp: 'None.',
    level: 'No Starch Press · Ages 10+',
    source: 'https://nostarch.com/python-kids-2nd-edition'
  },
  'book::technology::2': {
    title: 'Great Minds of Science (Black Lives #1): A Nonfiction Graphic Novel',
    range: 'by-and-about',
    why: 'Four Black Americans in science, drawn as a graphic novel: Matilda Evans the physician, Archie Alexander the civil engineer, Ayana Elizabeth Johnson the marine biologist, and Gladys West the mathematician. Gladys West’s satellite geodesy is the mathematical foundation of GPS — every aircraft and spacecraft that knows where it is depends on her work. Chosen for that connection.',
    headsUp: 'Segregation-era barriers described plainly; nothing graphic.',
    level: '128 pages · Grades 5-8 · Junior Library Guild selection',
    source: 'https://www.juniorlibraryguild.com/great-minds-of-science-9781419752698j'
  },
  'book::technology::3': {
    title: 'African American Inventors (Black Stars)',
    range: 'by-and-about',
    why: 'Short biographies of Black American inventors and engineers from the 1700s forward, in the Black Stars series. Chosen as the reference you flip through when you want to know who built something first.',
    headsUp: 'Slavery and segregation in historical context.',
    level: 'Grades 5-9 · Black Stars series',
    source: 'https://www.wiley.com/en-us/African+American+Inventors-p-9780471246497'
  }
};

/** The recorded reasoning for a book slot, or null. Matched on slotId so a
 *  title change never orphans it. */
export function rationaleFor(book) {
  if (!book || !book.slotId) return null;
  return bookRationale[book.slotId] || null;
}

/** Every slot whose book sits outside the Black American range, with the
 *  reason — so the gaps can be listed in one place rather than discovered
 *  one book at a time. */
export function outsideRangeSlots() {
  return Object.entries(bookRationale)
    .filter(([, r]) => r.range === 'outside')
    .map(([slotId, r]) => ({ slotId, title: r.title, rangeNote: r.rangeNote }));
}
