/**
 * Black American Excellence Library — PROJECT_PLAN.md Part 9.
 *
 * Part 9's own words: "Every applicable subject should intentionally
 * include Black American experts and innovators — Aerospace Engineers,
 * Astronauts, Scientists, Inventors, Mathematicians, Engineers,
 * Computer Scientists... The system should recommend biographies and
 * autobiographies appropriate to the student's age."
 *
 * This is that recommendation list. It is a CURATED REAL LIST, not an
 * algorithm — Part 9's "AI automatically recommends books" idea stays
 * deferred, because this app has no live AI integration and a random
 * picker dressed up as a recommendation engine would be worse than not
 * shipping one.
 *
 * EVERY TITLE HERE IS REAL AND WAS VERIFIED BY WEB SEARCH ON
 * AUG 5, 2026 — title, author, publisher, and that the book actually
 * exists at a middle-grade or young-adult reading level. Nothing on
 * this list is generated, guessed, or approximated. Sources checked
 * included School Library Journal's "#BlackinSTEM" nonfiction list,
 * Junior Library Guild, the publishers' own catalog pages
 * (HarperCollins, Abrams, Simon & Schuster, Abdo, Scholastic), and the
 * New York Public Library's Black History STEAM booklist. See
 * docs/PROJECT_LOG.md's Black American Excellence Library entry for the
 * full source list.
 *
 * If a title is ever added here later, it must be verified the same
 * way. This file is the one place in the app where real book titles
 * appear, and that is only acceptable because they were checked.
 *
 * `year` is the edition year of the specific edition named. `level` is
 * the publisher's or a library review source's stated audience, not an
 * invented Lexile number. `field` and `subjects` drive which subject's
 * library this book is offered under.
 */

export const blackExcellenceLibrary = [
  // ---- Aerospace, NASA, and aviation ----
  {
    id: 'bex-hidden-figures-yr',
    title: "Hidden Figures: Young Readers' Edition",
    author: 'Margot Lee Shetterly',
    publisher: 'HarperCollins',
    year: 2016,
    level: 'Middle grade',
    field: 'Mathematics & Aerospace',
    subjects: ['aerospace', 'math', 'socialStudies'],
    about:
      'The Black women mathematicians at NASA Langley — Katherine Johnson, Dorothy Vaughan, Mary Jackson, Christine Darden — whose calculations put Americans in orbit.',
    why: 'The single closest match in print to what Lamar wants to be: real Black engineers and mathematicians doing real aerospace work.'
  },
  {
    id: 'bex-reaching-for-the-moon',
    title: 'Reaching for the Moon: The Autobiography of NASA Mathematician Katherine Johnson',
    author: 'Katherine Johnson',
    publisher: 'Atheneum / Simon & Schuster',
    year: 2019,
    level: 'Middle grade',
    field: 'Mathematics & Aerospace',
    subjects: ['aerospace', 'math'],
    about:
      'Katherine Johnson telling her own story — skipping grades, the segregated schools she went through, and the orbital mechanics she computed by hand for John Glenn.',
    why: 'A first-person account of a mathematician, in her own voice — pairs directly with the Aerospace orbital-mechanics lessons.'
  },
  {
    id: 'bex-hidden-human-computers',
    title: 'Hidden Human Computers: The Black Women of NASA',
    author: 'Sue Bradford Edwards and Duchess Harris',
    publisher: 'Essential Library / Abdo',
    year: 2016,
    level: 'Middle school / young adult',
    field: 'Aerospace History',
    subjects: ['aerospace', 'socialStudies'],
    about:
      'A researched account of NASA\'s Black women "computers," written by a historian whose own grandmother was one of them.',
    why: 'Written at a genuinely research-paper-friendly level, with sourcing — a good spine for the Aerospace or Social Studies research paper slot.'
  },
  {
    id: 'bex-chasing-space-yr',
    title: "Chasing Space: Young Readers' Edition",
    author: 'Leland Melvin',
    publisher: 'Amistad / HarperCollins',
    year: 2017,
    level: 'Middle grade',
    field: 'Aerospace Engineering',
    subjects: ['aerospace', 'pe'],
    about:
      'NFL wide receiver turned NASA astronaut and engineer — including the training injury that nearly ended it and how he flew anyway.',
    why: 'Athletics and engineering in one life, which lines up with both the Aerospace track and the PE goals.'
  },
  {
    id: 'bex-find-where-the-wind-goes',
    title: 'Find Where the Wind Goes: Moments from My Life',
    author: 'Mae Jemison',
    publisher: 'Scholastic',
    year: 2001,
    level: 'Middle grade / young adult',
    field: 'Aerospace & Medicine',
    subjects: ['aerospace', 'science'],
    about:
      'The first Black woman in space, in her own words — chemical engineering, medical school, the Peace Corps, and the shuttle.',
    why: 'A real memoir showing an engineering degree opening into more than one career.'
  },
  {
    id: 'bex-red-tail-angels',
    title: 'Red-Tail Angels: The Story of the Tuskegee Airmen of World War II',
    author: 'Patricia C. McKissack and Fredrick L. McKissack',
    publisher: 'Walker & Company',
    year: 1995,
    level: 'Middle grade',
    field: 'Aviation History',
    subjects: ['aerospace', 'socialStudies'],
    about:
      'The Tuskegee Airmen — the training program, the combat record, and the fight to be allowed to fly at all.',
    why: 'Aviation history and civil-rights history in the same book, which is exactly where Aerospace and Social Studies overlap.'
  },
  {
    id: 'bex-talkin-about-bessie',
    title: "Talkin' About Bessie: The Story of Aviator Elizabeth Coleman",
    author: 'Nikki Grimes',
    publisher: 'Orchard Books',
    year: 2002,
    level: 'Upper elementary / middle grade',
    field: 'Aviation History',
    subjects: ['aerospace', 'socialStudies', 'reading'],
    about:
      "Bessie Coleman's life told as a series of poems in the voices of people who knew her. Coretta Scott King Author Honor book.",
    why: "Lamar already has Bessie Coleman's biography in the Social Studies Trailblazers unit — this is the same person at book length, in a different form."
  },

  // ---- Science, invention, and engineering ----
  {
    id: 'bex-changing-the-equation',
    title: 'Changing the Equation: 50+ US Black Women in STEM',
    author: 'Tonya Bolden',
    publisher: 'Abrams',
    year: 2020,
    level: 'Middle grade / young adult',
    field: 'STEM — collective biography',
    subjects: ['science', 'technology', 'math', 'aerospace'],
    about:
      'Short researched profiles of more than fifty Black American women across engineering, computing, medicine, mathematics, and the sciences.',
    why: 'The best single starting point for a "pick someone and research them" assignment — fifty real people to choose from in one book.'
  },
  {
    id: 'bex-black-stars-women',
    title: 'Black Stars: African American Women Scientists and Inventors',
    author: 'Otha Richard Sullivan',
    publisher: 'Jossey-Bass / Wiley',
    year: 2002,
    level: 'Middle grade',
    field: 'Science & Invention',
    subjects: ['science', 'technology'],
    about:
      'Profiles of Black American women scientists and inventors from the 1800s through the modern era.',
    why: 'Short chapters — works well as a reading assignment paced a profile or two per week.'
  },
  {
    id: 'bex-black-stars-inventors',
    title: 'African American Inventors (Black Stars)',
    author: 'Otha Richard Sullivan with Jim Haskins',
    publisher: 'Jossey-Bass / Wiley',
    year: 2011,
    level: 'Middle grade',
    field: 'Invention & Engineering',
    subjects: ['technology', 'science'],
    about:
      'Black American inventors and the real problems their inventions solved — from Lewis Latimer and Garrett Morgan to modern engineers.',
    why: 'Closest fit for the Technology & Computer Science track, and a natural pairing with the design-and-build projects.'
  },

  // -------------------------------------------------------------------
  // SOCIAL STUDIES EXPANSION — added Aug 6, 2026.
  //
  // PROJECT_PLAN.md Part 4's Social Studies section asked for "a
  // substantially expanded list of Black American authors, woven in
  // alongside the existing author list for this subject — not a
  // separate, siloed list." This block is that expansion, and "woven
  // in" is meant literally: these entries live in the SAME array, in
  // the SAME shape, so they flow through `blackExcellenceBooksForSubject`
  // into the shelf that already exists. No second list, no second UI,
  // nothing to keep in sync. The author roster the parent asked for is
  // DERIVED from these entries further down this file rather than typed
  // out again, so an author can never appear on the roster without a
  // real verified book behind them.
  //
  // Before this block, Social Studies drew only 4 titles, all of them
  // aviation/NASA books shared with Aerospace. The subject's own real
  // content — genealogy and primary-source research, racial
  // reclassification in the records, evidence evaluation, the Dawes
  // Rolls investigation — had no books of its own.
  //
  // EVERY ENTRY BELOW WAS VERIFIED ON AUG 6, 2026 against a publisher
  // page, the ALA's own award announcement, Wikipedia's sourced
  // bibliographic record, or the author's official site. Each carries
  // the `source` URL it was checked against — a field the older entries
  // above predate. Award claims were checked individually and NOT
  // assumed: "Now Is Your Time!" turned out to be a Coretta Scott King
  // Author HONOR book rather than the winner, and it is recorded that
  // way here.
  //
  // `heads_up` matters more on this block than anywhere else in the
  // app. Several of these books cover a massacre, lynching, and
  // enslavement in real detail. He is 12. The parent should see that
  // before she taps Add, not after he starts reading.

  // ---- Genealogy, records, and primary sources ----
  // These four pair directly with the Q1 lessons already built:
  // Genealogy Research Methods I/II, Racial Reclassification I/II,
  // Evaluating Historical Evidence I/II, and the Indigenous Ancestry
  // guided investigation.
  {
    id: 'bex-searching-for-sarah-rector',
    title: 'Searching for Sarah Rector: The Richest Black Girl in America',
    author: 'Tonya Bolden',
    publisher: 'Abrams Books for Young Readers',
    year: 2014,
    level: 'Ages 8-12 (80 pages)',
    field: 'Genealogy & Primary Sources',
    subjects: ['socialStudies'],
    about:
      'A Black girl in Indian Territory whose allotment land turned out to sit on oil, told through the court records, census records, and family interviews Bolden used to reconstruct a life that had been half-erased.',
    why: "The single best match in print for Q1's genealogy unit — Bolden shows her own research method on the page, in the exact Indian Territory and allotment world the Dawes Rolls investigation covers.",
    source: 'https://www.abramsbooks.com/product/searching-for-sarah-rector_9781419708466/'
  },
  {
    id: 'bex-freedom-over-me',
    title: 'Freedom Over Me: Eleven Slaves, Their Lives and Dreams Brought to Life',
    author: 'Ashley Bryan',
    publisher: 'Atheneum / Caitlyn Dlouhy Books',
    year: 2016,
    level: 'Grades 4-6 (56 pages)',
    field: 'Genealogy & Primary Sources',
    subjects: ['socialStudies', 'reading'],
    about:
      'Built from a real 1828 estate appraisal listing eleven enslaved people beside the livestock, with the document reproduced on the page. Bryan gives each of the eleven a name, a voice, and a dream against the price written next to them. Newbery Honor, and both a Coretta Scott King Author and Illustrator Honor.',
    why: "Shows in 56 pages exactly what Q1's lessons teach about the pre-1870 census: enslaved people appear in the records as property, unnamed. Short enough to read in one sitting and hard to forget.",
    heads_up:
      'The premise is an appraisal document valuing human beings in dollars. Emotionally heavy by design, and the reading level is below his — which is fine here, since the weight is in the idea rather than the vocabulary.',
    source: 'https://www.simonandschuster.com/books/Freedom-Over-Me/Ashley-Bryan/9781481456906'
  },
  {
    id: 'bex-maritcha',
    title: 'Maritcha: A Nineteenth-Century American Girl',
    author: 'Tonya Bolden',
    publisher: 'Abrams',
    year: 2005,
    level: 'Middle grade / young adult',
    field: 'Genealogy & Primary Sources',
    subjects: ['socialStudies'],
    about:
      'A free Black girl growing up in 1850s-60s New York, reconstructed from her own unpublished memoir plus period photographs and documents. Coretta Scott King Author Honor and James Madison Book Award winner.',
    why: 'A worked example of the free-Black-family records Q1 teaches him to look for — the side of the census that DID name people before 1870.',
    heads_up: 'Includes the 1863 New York City draft riots, in which Black New Yorkers were attacked and killed.',
    source: 'https://en.wikipedia.org/wiki/Tonya_Bolden'
  },
  {
    id: 'bex-schomburg',
    title: 'Schomburg: The Man Who Built a Library',
    author: 'Carole Boston Weatherford',
    publisher: 'Candlewick Press',
    year: 2017,
    level: 'Picture-book biography, ages 7-10 (reads up well)',
    field: 'Genealogy & Primary Sources',
    subjects: ['socialStudies'],
    about:
      'Arturo Schomburg was told as a boy that Black people had no history worth recording, and spent his life collecting the proof otherwise — the collection that became the Schomburg Center. Illustrated by Eric Velasquez. Carter G. Woodson Book Award.',
    why: 'The origin story of an actual archive, which is what makes it useful here rather than too young: it answers "why do these records exist at all" right before he starts using them.',
    source: 'https://www.candlewick.com/9780763680466/schomburg-the-man-who-built-a-library/'
  },

  // ---- Black American history surveys ----
  {
    id: 'bex-now-is-your-time',
    title: 'Now Is Your Time! The African-American Struggle for Freedom',
    author: 'Walter Dean Myers',
    publisher: 'HarperCollins',
    year: 1991,
    level: 'Middle grade / young adult',
    field: 'Black American History',
    subjects: ['socialStudies', 'reading'],
    about:
      'A survey from the transatlantic slave trade through the civil rights movement, built around individual documented lives rather than dates. Coretta Scott King Author Honor Book, Orbis Pictus Honor, and a Carter G. Woodson Outstanding Merit Book.',
    why: 'The best single full-year spine on this list, and Myers traces his own family back through the same kinds of records the genealogy unit uses.',
    heads_up: 'Covers the Middle Passage, enslavement, and lynching honestly.',
    source: 'https://walterdeanmyers.net/bibliography/awards/'
  },
  {
    id: 'bex-hand-in-hand',
    title: 'Hand in Hand: Ten Black Men Who Changed America',
    author: 'Andrea Davis Pinkney',
    publisher: 'Disney / Jump at the Sun',
    year: 2012,
    level: 'Middle grade',
    field: 'Black American History',
    subjects: ['socialStudies', 'reading'],
    about:
      'Ten linked biographies — Benjamin Banneker, Frederick Douglass, Booker T. Washington, W. E. B. Du Bois, A. Philip Randolph, Thurgood Marshall, Jackie Robinson, Malcolm X, Martin Luther King Jr., and Barack Obama. Illustrated by Brian Pinkney. Winner of the 2013 Coretta Scott King Author Award.',
    why: 'The chapter-per-person structure makes it the easiest book here to pace at one profile a week, and Banneker — a self-taught astronomer and surveyor — is a direct STEM link.',
    source: 'https://www.ala.org/news/2013/01/andrea-davis-pinkney-bryan-collier-win-2013-coretta-scott-king-book-awards'
  },
  {
    id: 'bex-facing-frederick',
    title: 'Facing Frederick: The Life of Frederick Douglass, a Monumental American Man',
    author: 'Tonya Bolden',
    publisher: 'Abrams Books for Young Readers',
    year: 2020,
    level: 'Ages 10-14 (208 pages)',
    field: 'Black American History',
    subjects: ['socialStudies'],
    about:
      'Douglass past the famous narrative — newspaperman, statesman, suffragist, and the most photographed American of the 1800s, who sat for portraits deliberately to control how Black Americans were pictured.',
    why: 'The photography thread is a genuine primary-source lesson: Douglass used the newest technology of his day as an argument, which is a very engineering way to think.',
    source: 'https://www.abramsbooks.com/product/facing-frederick_9781419737596/'
  },
  {
    id: 'bex-stamped',
    title: 'Stamped: Racism, Antiracism, and You',
    author: 'Jason Reynolds and Ibram X. Kendi',
    publisher: 'Little, Brown Books for Young Readers',
    year: 2020,
    level: 'Young adult (320 pages)',
    field: 'Black American History',
    subjects: ['socialStudies'],
    about:
      "Reynolds's remix of Kendi's National Book Award-winning history, tracing where racist ideas came from and who profited from them, written in a deliberately conversational voice.",
    why: 'The one book here that argues rather than narrates — useful practice at the historiography skill Q1 teaches: noticing that a history has a point of view, and evaluating it.',
    heads_up:
      'Written for teens, and it takes strong positions. Worth reading alongside him rather than handing over, which is also the best way to use it.',
    source:
      'https://www.hachettebookgroup.com/titles/jason-reynolds/stamped-racism-antiracism-and-you/9780316453707/?lens=little-brown-books-for-young-readers'
  },

  // ---- Civil rights and the segregation era ----
  {
    id: 'bex-march-book-one',
    title: 'March: Book One',
    author: 'John Lewis, Andrew Aydin, and Nate Powell',
    publisher: 'Top Shelf Productions',
    year: 2013,
    level: 'Graphic memoir, teen (128 pages)',
    field: 'Civil Rights',
    subjects: ['socialStudies', 'reading'],
    about:
      "Congressman John Lewis's own account of growing up in rural Alabama and of the Nashville lunch-counter sit-ins, drawn as a graphic memoir. Coretta Scott King Honor Book.",
    why: 'A first-person primary source that happens to be a comic — the format carries a reluctant reader through real civil-rights history without lowering the content.',
    heads_up: 'Depicts beatings of nonviolent protesters.',
    source: 'https://www.topshelfcomix.com/catalog/march-book-one/760'
  },
  {
    id: 'bex-this-promise-of-change',
    title: "This Promise of Change: One Girl's Story in the Fight for School Equality",
    author: 'Jo Ann Allen Boyce and Debbie Levy',
    publisher: "Bloomsbury Children's Books",
    year: 2019,
    level: 'Ages 10 and up',
    field: 'Civil Rights',
    subjects: ['socialStudies'],
    about:
      'Boyce was one of the Clinton 12, who desegregated a Tennessee high school in 1956 — a year before Little Rock. Her own memoir, in verse, with archival photographs and documents in the back matter. Boston Globe-Horn Book Award for Nonfiction and a Sibert Honor.',
    why: 'A first-person account by someone who was his age when it happened, and the back matter models exactly how to pair memory with documents.',
    heads_up: 'Mob harassment and threats against children.',
    source: 'https://www.debbielevybooks.com/this-promise-of-change'
  },
  {
    id: 'bex-overground-railroad-ya',
    title:
      'Overground Railroad (The Young Adult Adaptation): The Green Book and the Roots of Black Travel in America',
    author: 'Candacy Taylor',
    publisher: 'Amulet Books',
    year: 2022,
    level: 'Ages 12+ (272 pages)',
    field: 'Civil Rights',
    subjects: ['socialStudies'],
    about:
      "The Green Book — the travel guide that listed which businesses would serve Black travelers between 1936 and 1966 — with Taylor's own photographs of the surviving sites alongside archival images and interviews.",
    why: 'Turns segregation into geography he can see on a map, and the Green Book itself is a primary source he can search online while reading.',
    source: 'https://www.abramsbooks.com/product/overground-railroad-the-young-adult-adaptation_9781419749490/'
  },
  {
    id: 'bex-black-birds-in-the-sky',
    title: 'Black Birds in the Sky: The Story and Legacy of the 1921 Tulsa Race Massacre',
    author: 'Brandy Colbert',
    publisher: 'Balzer + Bray / HarperCollins',
    year: 2021,
    level: 'Middle grade / young adult',
    field: 'Civil Rights',
    subjects: ['socialStudies'],
    about:
      'The destruction of the Greenwood district, the history that led to it, and the decades in which it was left out of Oklahoma textbooks. Boston Globe-Horn Book Award for Nonfiction; YALSA Excellence in Nonfiction finalist.',
    why: 'The clearest real case of a documented event going missing from the official record — the exact problem Q1\'s "Evaluating Historical Evidence" lessons train him to notice.',
    heads_up:
      'A massacre, told plainly: mob violence, aerial firebombing of a neighborhood, and mass death. The heaviest book on this list. Best read with you.',
    source: 'https://en.wikipedia.org/wiki/Black_Birds_in_the_Sky'
  }
];

/**
 * Books offered under a given subject's library. A book can legitimately
 * belong to more than one subject (Hidden Figures is aerospace, math, AND
 * social studies) — that's real, not duplication.
 */
export function blackExcellenceBooksForSubject(subject) {
  return blackExcellenceLibrary.filter((b) => b.subjects.includes(subject));
}

/**
 * The author roster, DERIVED from the book list above rather than
 * maintained as a second list.
 *
 * PROJECT_PLAN.md Part 4 asked for the expanded Black American author
 * list to be "woven in alongside the existing author list for this
 * subject — not a separate, siloed list." A hand-typed roster would be
 * exactly the siloed version: it would drift the first time a book was
 * added or a name was spelled differently, and it would make it
 * possible to name an author with no verified book behind them. This
 * function removes that possibility by construction — every name it
 * returns comes from a book that was individually verified, and adding
 * a book updates the roster for free.
 *
 * Co-authored books are split on "and" / "," so each writer is credited
 * separately, which is the point of an author list. Co-authors who are
 * not Black American writers — and co-authors whose background could not
 * be established — are held off the roster via
 * `COAUTHOR_ROSTER_EXCLUSIONS` below, with the reason recorded for each.
 * This list is specifically about Black American authors, and the
 * accuracy of that claim is the whole value of it.
 *
 * Returns: [{ author, titles: [string], fields: [string] }], sorted by
 * how many titles on this list each author has, then alphabetically by
 * last word of the name.
 */
/**
 * Co-authors held OFF the Black American author roster, each with the
 * reason recorded.
 *
 * Two different reasons live here on purpose, because collapsing them
 * would hide the more important one:
 *
 *   'not-black-american' — checked, and the person is not a Black
 *       American author. Their book still belongs on the shelf; their
 *       name just doesn't belong on this particular roster.
 *
 *   'unverified' — could not be established either way from available
 *       sources. Excluded rather than assumed, because the entire value
 *       of a "Black American authors" list is that the claim is true for
 *       every name on it. Recording the doubt here beats a silent guess,
 *       and beats padding the list by one name.
 *
 * A name is only listed here after being checked — never inferred from
 * the name itself. Anyone NOT listed here was affirmatively verified:
 * Fredrick L. McKissack, Jim Haskins, Carol Anderson, Ibram X. Kendi,
 * Jason Reynolds, Duchess Harris, and Margot Lee Shetterly are all Black
 * American authors and are therefore absent from this map by design.
 */
export const COAUTHOR_ROSTER_EXCLUSIONS = {
  // "March: Book One" — Lewis is the author and the subject; Aydin
  // co-wrote and Powell illustrated.
  'Andrew Aydin': 'not-black-american',
  'Nate Powell': 'not-black-american',
  // "This Promise of Change" — the memoir is Boyce's; Levy co-wrote it.
  'Debbie Levy': 'not-black-american',
  // "Hidden Human Computers" — Duchess Harris is a Black American author
  // (the book is about her own grandmother). A search on Aug 6, 2026 did
  // not establish Edwards's background either way, so she is held off
  // the roster rather than counted on an assumption.
  'Sue Bradford Edwards': 'unverified'
};

const EXCLUDED_FROM_ROSTER = new Set(Object.keys(COAUTHOR_ROSTER_EXCLUSIONS));

function splitAuthorNames(authorField) {
  // Split on ", " / " and " / " with ", then strip a leading "and" that
  // survives the Oxford comma — "A, B, and C" splits to "and C" on the
  // comma pass, which silently produced an author literally named
  // "and Nate Powell" the first time this ran.
  return authorField
    .split(/\s*,\s*|\s+and\s+|\s+with\s+/)
    .map((name) => name.replace(/^and\s+/i, '').trim())
    .filter(Boolean);
}

export function blackAmericanAuthorsForSubject(subject) {
  const byAuthor = new Map();
  for (const book of blackExcellenceBooksForSubject(subject)) {
    for (const name of splitAuthorNames(book.author)) {
      if (EXCLUDED_FROM_ROSTER.has(name)) continue;
      if (!byAuthor.has(name)) byAuthor.set(name, { author: name, titles: [], fields: new Set() });
      const entry = byAuthor.get(name);
      entry.titles.push(book.title);
      entry.fields.add(book.field);
    }
  }
  return [...byAuthor.values()]
    .map((e) => ({ author: e.author, titles: e.titles, fields: [...e.fields] }))
    .sort((a, b) => {
      if (b.titles.length !== a.titles.length) return b.titles.length - a.titles.length;
      const lastName = (n) => n.split(' ').at(-1);
      return lastName(a.author).localeCompare(lastName(b.author));
    });
}

/**
 * HONEST GAP, recorded rather than papered over: Technology & Computer
 * Science has the thinnest standalone coverage on this list. Black
 * computing pioneers (Annie Easley, Mark Dean, Clarence "Skip" Ellis,
 * Melba Roy Mouton) appear inside the collective biographies above, but
 * the search on Aug 5, 2026 did not turn up a strong single-subject
 * middle-grade book about any of them — most of what exists is either
 * picture-book level or written for adults. Rather than pad this list
 * with a book that's too young or too advanced, the gap is stated here.
 * Worth re-checking in a year; new middle-grade STEM biographies are
 * published constantly.
 */
export const BLACK_EXCELLENCE_KNOWN_GAPS = [
  {
    subject: 'technology',
    note: 'No standalone middle-grade biography of a Black computer scientist verified yet — Annie Easley, Mark Dean, and Clarence Ellis currently appear only inside the collective biographies on this list.'
  }
];
