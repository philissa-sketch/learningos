// ---------------------------------------------------------------------------
// SOMETHING TO DO WHEN THE LESSON IS FINISHED AND THE DAY IS NOT.
//
// Gigi, Aug 19 2026: "I want there to be a tab where there are learning game
// links. When she completes a lesson early she can do those instead of walk
// away."
//
// ---- HOW THESE WERE CHOSEN, AND WHAT WAS THROWN OUT ----
//
// EVERY ADDRESS BELOW WAS OPENED IN A BROWSER AND LOOKED AT. Not fetched, not
// status-checked, LOOKED AT.
//
// ⚠️ AND THE FIRST DRAFT OF THIS FILE SAID THAT SENTENCE WHILE IT WAS FALSE.
// Eight of eleven addresses had been INFERRED from the names on the tiles
// rather than confirmed. Four of them were the Cyberchase games, and when they
// were finally opened, ALL FOUR WERE 404s: the real pattern is
// /games/play/<slug>/<numeric-id>, which no amount of sensible guessing gets
// to. The correct addresses were then read off the page's own anchors.
//
// That is the RoomRecess mistake, made a second time inside the file that
// records the RoomRecess mistake, in the same hour. A note that claims more
// than was checked is the same class of lie as a check that overstates.
//
// This project learned the underlying rule the hard way on Aug 16:
//
//   "This was cc-SECOND-grade-math, which returns 'Oops! Page not found'. Khan
//    serves HTTP 200 for the dead address and draws the error in JavaScript
//    afterwards, so NO STATUS CHECK COULD HAVE CAUGHT IT."
//
// Three addresses failed on the day these were gathered, and every one of them
// would have looked perfectly reasonable typed into this file. They are in
// REJECTED below, with what happened, because a failed search that is not
// written down gets run again by the next person.
//
// ---- THE BAR, AND IT IS GIGI'S ----
//
//   1. NO PAYMENT PROMPT ON THE PAGE. Her rule, Aug 19, and it excluded a site
//      this search WANTED to include — see blackeducationstation.com below.
//      A nine-year-old alone with a laptop should not be shown a Subscribe
//      button. The rule did not bend for a result that was otherwise good.
//
//      ⭐ AND IT HAS EXACTLY ONE EXCEPTION, DECLARED. Gigi asked for Blooket,
//      Gimkit and Kahoot by name the same afternoon, and chose to add them as a
//      NAMED exception rather than loosen the rule. They carry `exception: true`
//      and they link to the JOIN pages, never the marketing pages — which is
//      what keeps Kahoot's $3/$19/$19 storefront away from her. THE WAY BACK:
//      drop the three entries; nothing else in this file depends on them.
//   2. No account, no sign-in wall, no ads.
//   3. Advocacy organisations are not educational publishers. Unchanged.
//   4. AIMED AT A NINE-YEAR-OLD. This is the ONE place her AGE outranks her
//      measured level. Lessons are written to her level — 2.20 to 3.89 — but a
//      games tab that opens with Elmo is a tab she decides is for babies and
//      never opens again. pbskids.org/games is excellent and was rejected for
//      exactly this.
//
// ---- WEIGHTED TOWARD HER GAPS, BUT NOT ONLY HER GAPS ----
//
// Gigi's call: "her four weakest strands, plus some she enjoys." A tab that is
// entirely remediation is a tab she learns to avoid, and "instead of walk away"
// only works if she WANTS to be there.
//
// ---- ⚠️ GRAMMAR IS EMPTY AND THAT IS DECLARED, NOT AN OVERSIGHT ----
//
// Grammar-Usage is her LOWEST strand at 2.20 and nothing found on Aug 19 passed
// the bar. See GAPS below. An empty strand that is merely absent looks like an
// oversight and gets quietly forgotten; declared, it stays on somebody's list.
// check-links fails the build if this file stops declaring it.
// ---------------------------------------------------------------------------

/** How often an external address has to be opened and looked at again. */
export const REVERIFY_DAYS = 120;

export const GAME_LINKS = [
  // ---- MEASUREMENT & GEOMETRY — both re-measuring, both were floored at 2.00 ----
  {
    id: 'mlc-geoboard',
    label: 'Geoboard',
    blurb: 'Stretch bands round pegs to make shapes, then read off their area and perimeter.',
    url: 'https://apps.mathlearningcenter.org/geoboard/',
    strands: ['geometry'],
    kind: 'tool',
    source: 'The Math Learning Center',
    verifiedOn: '2026-08-19',
    saw: 'Opened and used it. Board draws, bands work, no ads, no account, no payment prompt.'
  },
  {
    id: 'mlc-pattern-shapes',
    label: 'Pattern Shapes',
    blurb: 'Fit shapes together to fill an outline. Angles and fractions without saying so.',
    url: 'https://apps.mathlearningcenter.org/pattern-shapes/',
    strands: ['geometry', 'fractions-decimals'],
    kind: 'tool',
    source: 'The Math Learning Center',
    verifiedOn: '2026-08-19',
    saw:
      'Opened it. Shape tray draws, no ads, no account, no payment prompt.'
  },
  {
    id: 'mlc-math-clock',
    label: 'Math Clock',
    blurb: 'Move the hands and see time as fractions of an hour.',
    url: 'https://apps.mathlearningcenter.org/math-clock/',
    strands: ['measurement-data'],
    kind: 'tool',
    source: 'The Math Learning Center',
    verifiedOn: '2026-08-19',
    saw:
      'Opened it. Clock toolbar draws, no ads, no account, no payment prompt.'
  },
  {
    id: 'mlc-number-line',
    label: 'Number Line',
    blurb: 'Jump along a line to see what the numbers between the numbers are.',
    url: 'https://apps.mathlearningcenter.org/number-line/',
    strands: ['measurement-data', 'numbers-operations'],
    kind: 'tool',
    source: 'The Math Learning Center',
    verifiedOn: '2026-08-19',
    saw:
      'Opened it. Line renders with whole numbers, fractions and decimals settings.'
  },
  {
    id: 'mlc-fractions',
    label: 'Fractions',
    blurb: 'Cut circles and bars into pieces and compare them.',
    url: 'https://apps.mathlearningcenter.org/fractions/',
    strands: ['fractions-decimals'],
    kind: 'tool',
    source: 'The Math Learning Center',
    verifiedOn: '2026-08-19',
    saw:
      'Opened it. Page title reads "Fractions by The Math Learning Center".'
  },

  // ---- CYBERCHASE — the one children's maths series aimed squarely at 8–11 ----
  {
    id: 'cyberchase-fill-it',
    label: 'Can You Fill It?',
    blurb: 'Work out which container holds more before you pour.',
    url: 'https://pbskids.org/games/play/can-you-fill-it/18927',
    strands: ['measurement-data'],
    kind: 'game',
    source: 'PBS KIDS · Cyberchase',
    verifiedOn: '2026-08-19',
    saw:
      'OPENED AND PLAYED. Title card and Play button. ⚠️ The guessed /cyberchase/games/ address was a 404.'
  },
  {
    id: 'cyberchase-poddle',
    label: 'Poddle Weigh In',
    blurb: 'Balance the scales. The first real algebra there is, dressed up as a puzzle.',
    url: 'https://pbskids.org/games/play/poddle-weigh-in/18975',
    strands: ['measurement-data', 'patterns-algebra'],
    kind: 'game',
    source: 'PBS KIDS · Cyberchase',
    verifiedOn: '2026-08-19',
    saw:
      'OPENED AND PLAYED. Balance scales with a not-equals sign. ⚠️ The guessed address was a 404.'
  },
  {
    id: 'cyberchase-tangram',
    label: 'Tangram Game',
    blurb: 'Seven flat shapes, one outline to fill. Rotating and flipping, by hand.',
    url: 'https://pbskids.org/games/play/tangram-game/19016',
    strands: ['geometry'],
    kind: 'game',
    source: 'PBS KIDS · Cyberchase',
    verifiedOn: '2026-08-19',
    saw:
      'OPENED AND PLAYED. Tangram square with Hint and Break Apart controls. ⚠️ The guessed address was a 404.'
  },
  {
    id: 'cyberchase-pattern-player',
    label: 'Cyber Pattern Player',
    blurb: 'Build a pattern out of sound and watch it repeat.',
    url: 'https://pbskids.org/games/play/cyber-pattern-player/18932',
    strands: ['patterns-algebra'],
    kind: 'game',
    source: 'PBS KIDS · Cyberchase',
    verifiedOn: '2026-08-19',
    saw:
      'OPENED AND PLAYED. Keyboard grid renders. ⚠️ The guessed address was a 404.'
  },

  // ---- ⭐ THE THREE GIGI ASKED FOR BY NAME — A DECLARED EXCEPTION ----
  //
  // Gigi, Aug 19: "Can we add blooket and gimkit to the games." Then: "and
  // kahoot." Asked how to square that with the rule she set the same afternoon
  // — a payment prompt on the page rules a site out — she chose: ADD THEM AS A
  // NAMED EXCEPTION, RECORDED. The rule stands for everything else.
  //
  // Handled the way RE_DIAGNOSTIC was at v3.55: her words, her date, her
  // reason, and a way back — not a rule quietly bending.
  //
  // ---- ⚠️ AND THEY LINK TO THE DOOR, NOT THE SHOP ----
  //
  // Their marketing homepages were opened on Aug 19 and they are not the same
  // thing at all:
  //
  //   blooket.com   — a Sign up button. No prices.
  //   gimkit.com    — Sign Up, plus "Group Pricing" in the nav, twice.
  //   kahoot.com    — A FULL STOREFRONT. Three tiers at $3, $19 and $19 a
  //                   month, "Save 20% until August 23", and "Contact sales" —
  //                   in front of a nine-year-old sitting alone.
  //
  // So none of those addresses are used. The JOIN pages are, and they were
  // opened too: play.blooket.com/play is "Join a Game / Log In", gimkit.com/join
  // is one word, and kahoot.it is "Enter Game PIN". That removes the pricing
  // entirely for two of them and reduces Kahoot to a single "get started for
  // free" line with no figures on it.
  //
  // ---- ⚠️ THE HONEST LIMITATION, AND IT IS NOT THE PRICING ----
  //
  // ALL THREE NEED A GAME CODE FROM SOMEBODY HOSTING. They are classroom
  // tools. Every other thing in this tab is "open it and play"; these are "join
  // a game someone is running". A child who finishes early, opens the tab alone
  // and finds an empty PIN box has been handed a locked door with no key.
  //
  // So they carry kind: 'hosted' and the screen says so plainly rather than
  // letting her find out by typing nothing into a box.
  {
    id: 'blooket',
    label: 'Blooket',
    blurb: 'Needs a game code from Gigi. Quiz games where the questions are the easy part.',
    url: 'https://play.blooket.com/play',
    strands: [],
    kind: 'hosted',
    source: 'Blooket',
    verifiedOn: '2026-08-19',
    exception: true,
    saw:
      'Opened both. The join page is "Join a Game / Log In" and nothing else. The MARKETING ' +
      'page at blooket.com carries a Sign up button but shows no prices — the cleanest of the ' +
      'three. Needs a host code.'
  },
  {
    id: 'gimkit',
    label: 'Gimkit',
    blurb: 'Needs a game code from Gigi. Answer questions, earn cash, buy upgrades.',
    url: 'https://www.gimkit.com/join',
    strands: [],
    kind: 'hosted',
    source: 'Gimkit',
    verifiedOn: '2026-08-19',
    exception: true,
    saw:
      'Opened both. The join page is a single "Join" box. The marketing page at gimkit.com ' +
      'carries "Sign Up For Free" AND "Group Pricing" twice in the nav, which is why the join ' +
      'address is the one used. Needs a host code.'
  },
  {
    id: 'kahoot',
    label: 'Kahoot!',
    blurb: 'Needs a game PIN from Gigi. The one with the music and the countdown.',
    url: 'https://kahoot.it/',
    strands: [],
    kind: 'hosted',
    source: 'Kahoot!',
    verifiedOn: '2026-08-19',
    exception: true,
    saw:
      '⚠️ THE ONE THAT MOST NEEDED THE JOIN ADDRESS. kahoot.com is a full storefront — Kahoot! ' +
      'Plus from $3/mo, One and 360 from $19/mo, "Save 20% until August 23", "Contact sales". ' +
      'kahoot.it is "Enter Game PIN" with one small "Get started for FREE at kahoot.com" line ' +
      'and no figures. Needs a host PIN.'
  },

  // ---- AND SOME THAT ARE JUST GOOD ----
  //      Per Gigi: not only her gaps, or she will not choose it.
  {
    id: 'cyberchase-all',
    label: 'All the Cyberchase games',
    blurb: 'Sixteen of them. Space, railways, bats, rubbish collection.',
    url: 'https://pbskids.org/cyberchase/all-games',
    strands: [],
    kind: 'game',
    source: 'PBS KIDS · Cyberchase',
    verifiedOn: '2026-08-19',
    saw:
      'Opened it. 16 games, aimed 8–11, no ads, no account, no payment prompt. ' +
      '⚠️ Produced by The WNET Group, © 2026 THIRTEEN Productions LLC, read off the page footer. ' +
      'The Cybersquad cast is racially diverse and two of these games open on a Black girl — ' +
      'the PRODUCER is NOT claimed to be Black-led, because that has not been verified. ' +
      'Unknown is recorded as unknown.'
  },
  {
    id: 'mlc-all',
    label: 'All the Math Learning Center apps',
    blurb: 'Thirteen things to build with, including money, clocks and number racks.',
    url: 'https://www.mathlearningcenter.org/apps',
    strands: [],
    kind: 'tool',
    source: 'The Math Learning Center',
    verifiedOn: '2026-08-19',
    saw:
      'Opened it. 13 apps listed, all free web versions, no account, no payment prompt. ' +
      '⚠️ A HEADS UP banner sits across the top of every app promoting their new Math ' +
      'MultiApp — it is a link to another FREE product of theirs, not a payment prompt, and it ' +
      'is recorded here rather than glossed over so Gigi can judge it herself.'
  }
];

/**
 * WHAT IS MISSING, SAID OUT LOUD.
 *
 * A strand with nothing behind it is a fact about the search, not about the
 * child. Declared here so it stays on a list rather than being noticed again in
 * six months by somebody scrolling past.
 */
export const GAPS = [
  {
    strandId: 'grammar-usage',
    note:
      'HER LOWEST STRAND, 2.20, AND NOTHING FOUND ON Aug 19 PASSED THE BAR. Khan Academy’s ' +
      'Grammar course (10 units, 100 skills) is free, has no ads and no payment prompt, and she ' +
      'is on Khan daily — but it is a COURSE, not a game, and this tab exists so she would ' +
      'rather stay than walk away. Putting schoolwork in it may defeat the point. Left open ' +
      'deliberately rather than filled with something that reads as more lessons.'
  },
  {
    strandId: 'writing-strategies',
    note:
      'Nothing found that clears the bar. Most free writing practice sites want an account so a ' +
      'teacher can read the writing back, which is the opposite of what is wanted here.'
  }
];

/**
 * REJECTED, AND WHY. Every one of these was opened.
 *
 * "Never invent or guess a URL. Confirm against the real domain. WRITE DOWN
 * EVERY FAILED SEARCH." A rejection that is not recorded is a rejection the
 * next person has to make again from scratch.
 */
export const REJECTED = [
  {
    url: 'https://www.roomrecess.com/',
    why:
      '160 free games, K–6, built by an elementary teacher, no account needed to play and no ' +
      'ads seen — but a SUBSCRIBE button sits in the top-right corner. Gigi’s rule, ' +
      'Aug 19: a payment prompt on the page rules a site out.'
  },
  {
    url: 'https://www.blackeducationstation.com/',
    why:
      '⚠️ THE ONE THIS SEARCH WANTED. Real, commercial-free educational content made by ' +
      'Black educators for children 0–10. AND THE FRONT PAGE IS "SUBSCRIBE NOW" PLUS ' +
      '"purchase videos individually." It fails the bar set the same day. Recorded rather than ' +
      'quietly included, because a rule that bends for the result you were hoping for is not a ' +
      'rule. It is also video, not games. GIGI MAY WANT TO MAKE A DELIBERATE EXCEPTION — that ' +
      'is hers to decide, and it is written here so it can be.'
  },
  {
    url: 'https://pbskids.org/games/math',
    why:
      'Loads perfectly, no ads, no account. AND IT IS ELMO, CURIOUS GEORGE AND PEG + CAT — ' +
      'built for three-to-six-year-olds. She is nine. Her LEVEL is 2.20–3.89 and her lessons ' +
      'are written to it, but a games tab is the one place age outranks level: a tab that opens ' +
      'with Elmo is a tab she never opens twice.'
  },
  {
    url: 'https://www.roomrecess.com/pages/Grammar.html',
    why:
      '404. THE PATH WAS GUESSED rather than confirmed — rule 10, caught by opening it. ' +
      'Recorded because the guess looked entirely plausible and would have shipped.'
  },
  {
    url: 'https://pbskids.org/wordgirl/games',
    why:
      'REDIRECTS TO /videos/wordgirl. WordGirl’s games are gone; the page is episodes now. ' +
      'A vocabulary game aimed at 6–9 would have been a good fit for her grammar gap, and it ' +
      'no longer exists. Nothing errors — the redirect is silent, which is why it was opened.'
  }
];

/** Addresses that moved. Written down so nobody re-adds the old one. */
export const REDIRECTS = [
  {
    from: 'https://apps.mathlearningcenter.org',
    to: 'https://www.mathlearningcenter.org/apps',
    note: 'The bare root redirects. The individual /geoboard/ style app URLs do not.'
  },
  {
    from: 'https://pbskids.org/cyberchase/games',
    to: 'https://pbskids.org/cyberchase/all-games',
    note: 'Both work; the second is what the site actually serves.'
  }
];

/** Every strand id that has at least one thing behind it. */
export function strandsCovered() {
  return [...new Set(GAME_LINKS.flatMap((g) => g.strands))];
}

/** Links for one strand, or everything when no strand is given. */
export function linksForStrand(strandId) {
  if (!strandId) return GAME_LINKS;
  return GAME_LINKS.filter((g) => g.strands.includes(strandId));
}
