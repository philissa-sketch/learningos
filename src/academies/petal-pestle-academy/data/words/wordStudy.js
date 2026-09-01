/**
 * WORD STUDY — 320 spelling words and 320 vocabulary words, ten of each a week
 * for the thirty-two weeks of her year.
 *
 * ---- WHERE EVERY WORD CAME FROM ----
 *
 * ⭐ EVERY WORD IS PULLED FROM THE 256 LESSONS SHE ACTUALLY READS. Gigi's call,
 * asked as a choice between a published grade-level list and her own material:
 * "pull from the 256 lessons."
 *
 * That means the spelling list is not a stack of words beside her week. It IS
 * her week. The apothecary fortnight gives her mortar, pestle, sieve and
 * strainer. Module 1 gives her seed coat, embryo and germination. She is
 * spelling what she is reading, the same week she reads it.
 *
 * VOCABULARY comes from each lesson's own `words:` array — the terms the
 * lesson was written to teach. All 256 lessons declare them: 1,024 entries,
 * 801 unique.
 *
 * SPELLING comes from the lesson PROSE, filtered to her measured level:
 *   · 4 to 9 letters, at most 2 syllables
 *   · appears in that week's lessons
 *   · NOT a proper noun — detected as capitalised mid-sentence across the whole
 *     corpus, never by a hand-typed list of names
 *   · NOT already a vocabulary term, so the two lists never teach one word twice
 *   · NOT a sight word she already reads without thinking. Spelling practice on
 *     "them" is a wasted week; these ten should be ten she might miss
 *   · never repeated in a later week
 *
 * ⚠️ THIRTY-TWO WEEKS, NOT THIRTY-SIX, AND THAT IS 320 WORDS AND NOT 360.
 * The backlog said 360 + 360. That number came from Lamar's app, whose year is
 * 36 weeks. HERS IS 32 — four quarters of eight, and `WEEKS` has said so since
 * the week table was built. Padding to 360 would have meant inventing four
 * weeks that do not exist in her schedule. Copying a number out of his app is
 * the same mistake as copying a mechanism out of it — §38, and §45.
 *
 * ⚠️ GENERATED, THEN FROZEN ON PURPOSE. Nothing here is hand-typed; it was
 * derived from WEEKS and the lesson prose in one pass. But it is stored rather
 * than recomputed at render, because a list that recomputes would RESHUFFLE HER
 * WORDS MID-YEAR the first time a lesson is reworded. A child who has learned
 * eight of ten words should not find that two of them changed overnight.
 * check-word-study asserts every word still traces to a lesson in its own week,
 * so the freeze is watched rather than trusted.
 *
 * ---- ⚠️ WHAT IS NOT BUILT YET ----
 *
 * THERE IS NO SCREEN. This is the word data and nothing else. She cannot see a
 * list, sit a test, or have a result recorded, and `db` has no table for one.
 * Until that exists this is paper — and "correct and unreachable" is the
 * failure this project has now made six times, so it is said here in the file
 * rather than discovered later.
 *
 * The carry-over rule is already decided and is NOT implemented here either.
 * From year-plan-03, taken from Lamar's app: the list rotates on a strict
 * 7-day cycle whether or not the test was passed; missed words carry into next
 * week and are topped up to ten; a test never taken carries the whole list
 * forward, treated as fully missed, never silently dropped.
 */

export const WORD_STUDY_WEEKS = [
  {
    quarter: 1,
    n: 1,
    spelling: [
      { word: 'forces', from: 'sl-m1-01' },
      { word: 'tray', from: 'sl-m1-01' },
      { word: 'bean', from: 'hb-m1-01' },
      { word: 'fingers', from: 'body-m1-02' },
      { word: 'hands', from: 'sl-m1-02' },
      { word: 'person', from: 'ss-m1-01' },
      { word: 'shoot', from: 'hb-m1-01' },
      { word: 'bowl', from: 'hb-m1-01' },
      { word: 'buying', from: 'ss-m1-01' },
      { word: 'called', from: 'hb-m1-01' }
    ],
    vocabulary: [
      { word: "seed coat", from: 'hb-m1-01' },
      { word: "embryo", from: 'hb-m1-01' },
      { word: "endosperm", from: 'hb-m1-01' },
      { word: "dormant", from: 'hb-m1-01' },
      { word: "germination", from: 'hb-m1-01' },
      { word: "life cycle", from: 'hb-m1-02' },
      { word: "seedling", from: 'hb-m1-02' },
      { word: "adult plant", from: 'hb-m1-02' },
      { word: "pollination", from: 'hb-m1-02' },
      { word: "fruit", from: 'hb-m1-02' }
    ]
  },
  {
    quarter: 1,
    n: 2,
    spelling: [
      { word: 'bench', from: 'sl-m1-04' },
      { word: 'again', from: 'hb-m1-04' },
      { word: 'beats', from: 'body-m1-03' },
      { word: 'needs', from: 'hb-m1-05' },
      { word: 'ones', from: 'hb-m1-04' },
      { word: 'side', from: 'ss-m1-03' },
      { word: 'sides', from: 'ss-m1-03' },
      { word: 'speeds', from: 'sl-m1-05' },
      { word: 'against', from: 'sl-m1-04' },
      { word: 'answer', from: 'body-m1-03' }
    ],
    vocabulary: [
      { word: "annual", from: 'hb-m1-04' },
      { word: "perennial", from: 'hb-m1-04' },
      { word: "bulb", from: 'hb-m1-04' },
      { word: "rhizome", from: 'hb-m1-04' },
      { word: "die back", from: 'hb-m1-04' },
      { word: "nutrients", from: 'hb-m1-05' },
      { word: "hydroponics", from: 'hb-m1-05' },
      { word: "sunlight", from: 'hb-m1-05' },
      { word: "air", from: 'hb-m1-05' },
      { word: "support", from: 'hb-m1-05' }
    ]
  },
  {
    quarter: 1,
    n: 3,
    spelling: [
      { word: 'grow', from: 'hb-1-01' },
      { word: 'hand', from: 'sl-m2-02' },
      { word: 'army', from: 'ss-m2-02' },
      { word: 'pebble', from: 'sl-m2-02' },
      { word: 'wins', from: 'ss-m2-02' },
      { word: 'covers', from: 'body-m2-01' },
      { word: 'falls', from: 'sl-m2-01' },
      { word: 'heavy', from: 'sl-m2-01' },
      { word: 'parts', from: 'hb-1-01' },
      { word: 'sprouted', from: 'sl-m2-03' }
    ],
    vocabulary: [
      { word: "root", from: 'hb-1-01' },
      { word: "stem", from: 'hb-1-01' },
      { word: "leaf", from: 'hb-1-01' },
      { word: "flower", from: 'hb-1-01' },
      { word: "soil", from: 'hb-1-02' },
      { word: "water", from: 'hb-1-02' },
      { word: "taproot", from: 'hb-m2-03' },
      { word: "fibrous roots", from: 'hb-m2-03' },
      { word: "root hairs", from: 'hb-m2-03' },
      { word: "anchor", from: 'hb-m2-03' }
    ]
  },
  {
    quarter: 1,
    n: 4,
    spelling: [
      { word: 'pulls', from: 'sl-m2-04' },
      { word: 'rules', from: 'ss-m2-04' },
      { word: 'game', from: 'ss-m2-04' },
      { word: 'happens', from: 'body-m2-03' },
      { word: 'road', from: 'ss-m2-03' },
      { word: 'round', from: 'hb-1-03' },
      { word: 'takes', from: 'hb-1-04' },
      { word: 'changes', from: 'sl-m2-04' },
      { word: 'decide', from: 'ss-m2-04' },
      { word: 'half', from: 'sl-m2-04' }
    ],
    vocabulary: [
      { word: "stalk", from: 'hb-1-03' },
      { word: "light", from: 'hb-1-04' },
      { word: "vein", from: 'hb-1-04' },
      { word: "humus", from: 'hb-m2-06' },
      { word: "minerals", from: 'hb-m2-06' },
      { word: "decomposer", from: 'hb-m2-06' },
      { word: "topsoil", from: 'hb-m2-06' },
      { word: "terrain", from: 'ss-m2-03' },
      { word: "cover", from: 'ss-m2-03' },
      { word: "ridge", from: 'ss-m2-03' }
    ]
  },
  {
    quarter: 1,
    n: 5,
    spelling: [
      { word: 'bucket', from: 'hb-m3-01' },
      { word: 'dead', from: 'hb-m3-01' },
      { word: 'trowel', from: 'sl-m3-01' },
      { word: 'seats', from: 'ss-m3-01' },
      { word: 'else', from: 'hb-m3-01' },
      { word: 'gets', from: 'hb-m3-02' },
      { word: 'middle', from: 'hb-m3-02' },
      { word: 'worm', from: 'hb-m3-01' },
      { word: 'along', from: 'sl-m3-02' },
      { word: 'barrow', from: 'sl-m3-02' }
    ],
    vocabulary: [
      { word: "producer", from: 'hb-m3-01' },
      { word: "consumer", from: 'hb-m3-01' },
      { word: "ecosystem", from: 'hb-m3-01' },
      { word: "compost", from: 'hb-m3-02' },
      { word: "decompose", from: 'hb-m3-02' },
      { word: "bacteria", from: 'hb-m3-02' },
      { word: "fungi", from: 'hb-m3-02' },
      { word: "energy", from: 'hb-m3-03' },
      { word: "food chain", from: 'hb-m3-03' },
      { word: "compromise", from: 'ss-m3-01' }
    ]
  },
  {
    quarter: 1,
    n: 6,
    spelling: [
      { word: 'elbow', from: 'body-m3-03' },
      { word: 'vote', from: 'ss-m3-03' },
      { word: 'means', from: 'hb-m3-04' },
      { word: 'eats', from: 'hb-m3-04' },
      { word: 'agreed', from: 'ss-m3-03' },
      { word: 'eater', from: 'hb-m3-04' },
      { word: 'country', from: 'ss-m3-03' },
      { word: 'easier', from: 'sl-m3-04' },
      { word: 'pencil', from: 'sl-m3-06' },
      { word: 'plank', from: 'sl-m3-04' }
    ],
    vocabulary: [
      { word: "food web", from: 'hb-m3-04' },
      { word: "arrow", from: 'hb-m3-04' },
      { word: "predict", from: 'hb-m3-05' },
      { word: "balance", from: 'hb-m3-05' },
      { word: "pollinator", from: 'hb-m3-06' },
      { word: "pollen", from: 'hb-m3-06' },
      { word: "scarce", from: 'hb-m3-06' },
      { word: "extinct", from: 'hb-m3-06' },
      { word: "over-abundant", from: 'hb-m3-06' },
      { word: "preamble", from: 'ss-m3-03' }
    ]
  },
  {
    quarter: 1,
    n: 7,
    spelling: [
      { word: 'shorter', from: 'body-m4-01' },
      { word: 'plastic', from: 'sl-m4-01' },
      { word: 'powers', from: 'ss-m4-01' },
      { word: 'short', from: 'sl-m4-02' },
      { word: 'belong', from: 'ss-m4-01' },
      { word: 'hole', from: 'sl-m4-02' },
      { word: 'rule', from: 'ss-m4-01' },
      { word: 'throws', from: 'sl-m4-02' },
      { word: 'annoying', from: 'ss-m4-02' },
      { word: 'bends', from: 'body-m4-02' }
    ],
    vocabulary: [
      { word: "oval", from: 'hb-1-05' },
      { word: "narrow", from: 'hb-1-05' },
      { word: "toothed", from: 'hb-1-06' },
      { word: "lobed", from: 'hb-1-06' },
      { word: "alternate", from: 'hb-1-07' },
      { word: "pair", from: 'hb-1-07' },
      { word: "federal", from: 'ss-m4-01' },
      { word: "state", from: 'ss-m4-01' },
      { word: "shared", from: 'ss-m4-01' },
      { word: "branch", from: 'ss-m4-02' }
    ]
  },
  {
    quarter: 1,
    n: 8,
    spelling: [
      { word: 'sees', from: 'hb-m4-04' },
      { word: 'slant', from: 'sl-m4-04' },
      { word: 'cannot', from: 'hb-m4-04' },
      { word: 'clove', from: 'hb-m4-04' },
      { word: 'looks', from: 'sl-m4-05' },
      { word: 'smell', from: 'hb-m4-05' },
      { word: 'above', from: 'sl-m4-05' },
      { word: 'corner', from: 'sl-m4-04' },
      { word: 'aimed', from: 'hb-m4-06' },
      { word: 'bending', from: 'sl-m4-05' }
    ],
    vocabulary: [
      { word: "adaptation", from: 'hb-m4-04' },
      { word: "thorn", from: 'hb-m4-04' },
      { word: "spine", from: 'hb-m4-04' },
      { word: "trichome", from: 'hb-m4-04' },
      { word: "latex", from: 'hb-m4-04' },
      { word: "aromatic", from: 'hb-m4-05' },
      { word: "chemical", from: 'hb-m4-05' },
      { word: "volatile", from: 'hb-m4-05' },
      { word: "repel", from: 'hb-m4-05' },
      { word: "attract", from: 'hb-m4-05' }
    ]
  },
  {
    quarter: 2,
    n: 1,
    spelling: [
      { word: 'drops', from: 'hb-m5-01' },
      { word: 'cube', from: 'hb-m5-02' },
      { word: 'puddle', from: 'hb-m5-01' },
      { word: 'pushes', from: 'hb-m5-02' },
      { word: 'steam', from: 'hb-m5-02' },
      { word: 'beaten', from: 'ss-m5-01' },
      { word: 'curl', from: 'hb-m5-02' },
      { word: 'dark', from: 'ss-m5-02' },
      { word: 'dish', from: 'hb-m5-02' },
      { word: 'fire', from: 'ss-m5-01' }
    ],
    vocabulary: [
      { word: "evaporation", from: 'hb-m5-01' },
      { word: "water vapour", from: 'hb-m5-01' },
      { word: "condensation", from: 'hb-m5-01' },
      { word: "precipitation", from: 'hb-m5-01' },
      { word: "water cycle", from: 'hb-m5-01' },
      { word: "solid", from: 'hb-m5-02' },
      { word: "liquid", from: 'hb-m5-02' },
      { word: "gas", from: 'hb-m5-02' },
      { word: "melting", from: 'hb-m5-02' },
      { word: "freezing", from: 'hb-m5-02' }
    ]
  },
  {
    quarter: 2,
    n: 2,
    spelling: [
      { word: 'gaps', from: 'hb-m5-05' },
      { word: 'sent', from: 'ss-m5-03' },
      { word: 'times', from: 'body-m5-03' },
      { word: 'holes', from: 'hb-m5-05' },
      { word: 'pots', from: 'hb-m5-05' },
      { word: 'second', from: 'hb-m5-06' },
      { word: 'droop', from: 'hb-m5-06' },
      { word: 'little', from: 'hb-m5-05' },
      { word: 'piece', from: 'ss-m5-03' },
      { word: 'beating', from: 'body-m5-03' }
    ],
    vocabulary: [
      { word: "xylem", from: 'hb-m5-04' },
      { word: "transpiration pull", from: 'hb-m5-04' },
      { word: "capillary action", from: 'hb-m5-04' },
      { word: "drainage", from: 'hb-m5-05' },
      { word: "air pockets", from: 'hb-m5-05' },
      { word: "sand", from: 'hb-m5-05' },
      { word: "clay", from: 'hb-m5-05' },
      { word: "loam", from: 'hb-m5-05' },
      { word: "wilting", from: 'hb-m5-06' },
      { word: "crispy", from: 'hb-m5-06' }
    ]
  },
  {
    quarter: 2,
    n: 3,
    spelling: [
      { word: 'lily', from: 'hb-m6-02' },
      { word: 'makes', from: 'hb-1-08' },
      { word: 'story', from: 'ss-m6-01' },
      { word: 'yellow', from: 'hb-1-08' },
      { word: 'carrying', from: 'body-m6-02' },
      { word: 'floating', from: 'ss-m6-01' },
      { word: 'lines', from: 'body-m6-02' },
      { word: 'often', from: 'hb-m6-03' },
      { word: 'walls', from: 'body-m6-02' },
      { word: 'wrist', from: 'body-m6-02' }
    ],
    vocabulary: [
      { word: "petal", from: 'hb-1-08' },
      { word: "bee", from: 'hb-1-08' },
      { word: "sepal", from: 'hb-m6-02' },
      { word: "stamen", from: 'hb-m6-02' },
      { word: "anther", from: 'hb-m6-02' },
      { word: "pistil", from: 'hb-m6-02' },
      { word: "stigma", from: 'hb-m6-02' },
      { word: "ovary", from: 'hb-m6-02' },
      { word: "nectar", from: 'hb-m6-03' },
      { word: "wind-pollinated", from: 'hb-m6-03' }
    ]
  },
  {
    quarter: 2,
    n: 4,
    spelling: [
      { word: 'squeezes', from: 'body-m6-04' },
      { word: 'apple', from: 'hb-m6-05' },
      { word: 'lets', from: 'body-m6-04' },
      { word: 'reach', from: 'hb-m6-06' },
      { word: 'sugar', from: 'hb-m6-06' },
      { word: 'thinner', from: 'hb-m6-06' },
      { word: 'threads', from: 'hb-m6-06' },
      { word: 'board', from: 'hb-m6-05' },
      { word: 'bottom', from: 'hb-m6-05' },
      { word: 'circle', from: 'hb-m6-06' }
    ],
    vocabulary: [
      { word: "habitat", from: 'hb-m6-04' },
      { word: "native bee", from: 'hb-m6-04' },
      { word: "bare ground", from: 'hb-m6-04' },
      { word: "shallow", from: 'hb-m6-04' },
      { word: "bloom", from: 'hb-m6-04' },
      { word: "disperse", from: 'hb-m6-05' },
      { word: "kernel", from: 'hb-m6-05' },
      { word: "pod", from: 'hb-m6-05' },
      { word: "fungus", from: 'hb-m6-06' },
      { word: "mycelium", from: 'hb-m6-06' }
    ]
  },
  {
    quarter: 2,
    n: 5,
    spelling: [
      { word: 'raisin', from: 'hb-m7-03' },
      { word: 'grape', from: 'hb-m7-03' },
      { word: 'lungs', from: 'body-m7-01' },
      { word: 'moved', from: 'body-m7-01' },
      { word: 'runs', from: 'ss-m7-01' },
      { word: 'town', from: 'ss-m7-02' },
      { word: 'started', from: 'hb-m7-02' },
      { word: 'tree', from: 'hb-m7-02' },
      { word: 'apart', from: 'ss-m7-01' },
      { word: 'boxes', from: 'hb-m7-01' }
    ],
    vocabulary: [
      { word: "forage", from: 'hb-m7-01' },
      { word: "cultivate", from: 'hb-m7-01' },
      { word: "wild plant", from: 'hb-m7-01' },
      { word: "tradition", from: 'hb-m7-01' },
      { word: "spice", from: 'hb-m7-02' },
      { word: "herb", from: 'hb-m7-02' },
      { word: "bark", from: 'hb-m7-02' },
      { word: "preserve", from: 'hb-m7-03' },
      { word: "moisture", from: 'hb-m7-03' },
      { word: "mould", from: 'hb-m7-03' }
    ]
  },
  {
    quarter: 2,
    n: 6,
    spelling: [
      { word: 'breath', from: 'body-m7-03' },
      { word: 'breaths', from: 'body-m7-03' },
      { word: 'crossed', from: 'hb-m7-05' },
      { word: 'gave', from: 'ss-m7-04' },
      { word: 'pressed', from: 'hb-m7-06' },
      { word: 'sheet', from: 'hb-m7-06' },
      { word: 'anyone', from: 'hb-m7-04' },
      { word: 'glued', from: 'hb-m7-06' },
      { word: 'hundred', from: 'hb-m7-06' },
      { word: 'keeps', from: 'hb-m7-04' }
    ],
    vocabulary: [
      { word: "midwife", from: 'hb-m7-04' },
      { word: "granny midwife", from: 'hb-m7-04' },
      { word: "oral tradition", from: 'hb-m7-04' },
      { word: "root doctor", from: 'hb-m7-04' },
      { word: "record", from: 'hb-m7-04' },
      { word: "okra", from: 'hb-m7-05' },
      { word: "sorghum", from: 'hb-m7-05' },
      { word: "cowpea", from: 'hb-m7-05' },
      { word: "staple crop", from: 'hb-m7-05' },
      { word: "herbarium", from: 'hb-m7-06' }
    ]
  },
  {
    quarter: 2,
    n: 7,
    spelling: [
      { word: 'hear', from: 'body-m8-01' },
      { word: 'shutting', from: 'body-m8-02' },
      { word: 'valves', from: 'body-m8-02' },
      { word: 'wanted', from: 'ss-m8-01' },
      { word: 'apples', from: 'ss-m8-01' },
      { word: 'badly', from: 'hb-1-13' },
      { word: 'bakes', from: 'ss-m8-02' },
      { word: 'burns', from: 'ss-m8-02' },
      { word: 'clearer', from: 'body-m8-01' },
      { word: 'cloth', from: 'ss-m8-02' }
    ],
    vocabulary: [
      { word: "family", from: 'hb-1-10' },
      { word: "group", from: 'hb-1-10' },
      { word: "related", from: 'hb-1-10' },
      { word: "key", from: 'hb-1-11' },
      { word: "clue", from: 'hb-1-11' },
      { word: "step", from: 'hb-1-11' },
      { word: "date", from: 'hb-1-13' },
      { word: "price", from: 'ss-m8-01' },
      { word: "incentive", from: 'ss-m8-01' },
      { word: "demand", from: 'ss-m8-01' }
    ]
  },
  {
    quarter: 2,
    n: 8,
    spelling: [
      { word: 'machine', from: 'ss-m8-03' },
      { word: 'hours', from: 'hb-m8-04' },
      { word: 'hour', from: 'hb-m8-04' },
      { word: 'listens', from: 'body-m8-03' },
      { word: 'says', from: 'hb-m8-06' },
      { word: 'cleaned', from: 'ss-m8-03' },
      { word: 'deep', from: 'hb-m8-04' },
      { word: 'grows', from: 'hb-m8-06' },
      { word: 'needed', from: 'ss-m8-04' },
      { word: 'saves', from: 'ss-m8-03' }
    ],
    vocabulary: [
      { word: "extraction", from: 'hb-m8-04' },
      { word: "infusion", from: 'hb-m8-04' },
      { word: "solar", from: 'hb-m8-04' },
      { word: "strain", from: 'hb-m8-04' },
      { word: "observation", from: 'hb-m8-04' },
      { word: "data", from: 'hb-m8-05' },
      { word: "pattern", from: 'hb-m8-05' },
      { word: "interval", from: 'hb-m8-05' },
      { word: "bar graph", from: 'hb-m8-05' },
      { word: "claim", from: 'hb-m8-06' }
    ]
  },
  {
    quarter: 3,
    n: 1,
    spelling: [
      { word: 'teeth', from: 'body-m9-01' },
      { word: 'tooth', from: 'body-m9-02' },
      { word: 'note', from: 'sl-m5-01' },
      { word: 'answers', from: 'hb-m9-02' },
      { word: 'gently', from: 'sl-m5-02' },
      { word: 'gives', from: 'hb-m9-02' },
      { word: 'plucked', from: 'sl-m5-02' },
      { word: 'rubber', from: 'sl-m5-01' },
      { word: 'shaking', from: 'sl-m5-01' },
      { word: 'beside', from: 'hb-m9-03' }
    ],
    vocabulary: [
      { word: "weather", from: 'hb-m9-01' },
      { word: "atmosphere", from: 'hb-m9-01' },
      { word: "temperature", from: 'hb-m9-01' },
      { word: "humidity", from: 'hb-m9-01' },
      { word: "meteorologist", from: 'hb-m9-01' },
      { word: "instrument", from: 'hb-m9-02' },
      { word: "thermometer", from: 'hb-m9-02' },
      { word: "rain gauge", from: 'hb-m9-02' },
      { word: "wind vane", from: 'hb-m9-02' },
      { word: "degrees", from: 'hb-m9-02' }
    ]
  },
  {
    quarter: 3,
    n: 2,
    spelling: [
      { word: 'clouds', from: 'hb-m9-04' },
      { word: 'morning', from: 'hb-m9-05' },
      { word: 'mouth', from: 'body-m9-03' },
      { word: 'wood', from: 'sl-m5-04' },
      { word: 'changed', from: 'hb-m9-05' },
      { word: 'enough', from: 'hb-m9-06' },
      { word: 'bottoms', from: 'hb-m9-04' },
      { word: 'juices', from: 'body-m9-04' },
      { word: 'stretched', from: 'sl-m5-05' },
      { word: 'argued', from: 'ss-m9-03' }
    ],
    vocabulary: [
      { word: "cirrus", from: 'hb-m9-04' },
      { word: "stratus", from: 'hb-m9-04' },
      { word: "cumulus", from: 'hb-m9-04' },
      { word: "sky cover", from: 'hb-m9-04' },
      { word: "cumulonimbus", from: 'hb-m9-05' },
      { word: "graph", from: 'hb-m9-06' },
      { word: "axis", from: 'hb-m9-06' },
      { word: "average", from: 'hb-m9-06' },
      { word: "suffrage", from: 'ss-m9-03' },
      { word: "petition", from: 'ss-m9-03' }
    ]
  },
  {
    quarter: 3,
    n: 3,
    spelling: [
      { word: 'torch', from: 'sl-m6-02' },
      { word: 'worth', from: 'hb-m10-02' },
      { word: 'metres', from: 'body-m10-02' },
      { word: 'percent', from: 'hb-m10-03' },
      { word: 'picture', from: 'hb-m10-01' },
      { word: 'candle', from: 'sl-m6-01' },
      { word: 'circles', from: 'hb-m10-02' },
      { word: 'daytime', from: 'sl-m6-01' },
      { word: 'fronts', from: 'hb-m10-01' },
      { word: 'mean', from: 'hb-m10-02' }
    ],
    vocabulary: [
      { word: "weather map", from: 'hb-m10-01' },
      { word: "front", from: 'hb-m10-02' },
      { word: "cold front", from: 'hb-m10-02' },
      { word: "warm front", from: 'hb-m10-02' },
      { word: "stationary front", from: 'hb-m10-02' },
      { word: "air mass", from: 'hb-m10-02' },
      { word: "overnight low", from: 'hb-m10-03' },
      { word: "chance of rain", from: 'hb-m10-03' },
      { word: "decision", from: 'hb-m10-03' },
      { word: "secede", from: 'ss-m10-01' }
    ]
  },
  {
    quarter: 3,
    n: 4,
    spelling: [
      { word: 'moons', from: 'sl-m6-06' },
      { word: 'spring', from: 'hb-m10-05' },
      { word: 'towel', from: 'body-m10-03' },
      { word: 'dots', from: 'sl-m6-06' },
      { word: 'grumpy', from: 'hb-m10-04' },
      { word: 'railways', from: 'ss-m10-03' },
      { word: 'single', from: 'hb-m10-04' },
      { word: 'autumn', from: 'hb-m10-05' },
      { word: 'might', from: 'sl-m6-04' },
      { word: 'planets', from: 'sl-m6-04' }
    ],
    vocabulary: [
      { word: "climate", from: 'hb-m10-04' },
      { word: "normal", from: 'hb-m10-04' },
      { word: "growing season", from: 'hb-m10-05' },
      { word: "hardiness zone", from: 'hb-m10-05' },
      { word: "frost-free", from: 'hb-m10-05' },
      { word: "tropical", from: 'hb-m10-05' },
      { word: "frost", from: 'hb-m10-06' },
      { word: "freeze", from: 'hb-m10-06' },
      { word: "first frost", from: 'hb-m10-06' },
      { word: "last frost", from: 'hb-m10-06' }
    ]
  },
  {
    quarter: 3,
    n: 5,
    spelling: [
      { word: 'grams', from: 'hb-m11-02' },
      { word: 'table', from: 'hb-m11-01' },
      { word: 'brim', from: 'hb-m11-02' },
      { word: 'cups', from: 'hb-m11-02' },
      { word: 'fresh', from: 'hb-m11-03' },
      { word: 'jobs', from: 'hb-m11-01' },
      { word: 'rather', from: 'hb-m11-02' },
      { word: 'strainer', from: 'hb-m11-01' },
      { word: 'wrong', from: 'hb-m11-01' },
      { word: 'bits', from: 'hb-m11-01' }
    ],
    vocabulary: [
      { word: "mortar", from: 'hb-m11-01' },
      { word: "pestle", from: 'hb-m11-01' },
      { word: "sieve", from: 'hb-m11-01' },
      { word: "surface area", from: 'hb-m11-01' },
      { word: "apothecary", from: 'hb-m11-01' },
      { word: "gram", from: 'hb-m11-02' },
      { word: "tare", from: 'hb-m11-02' },
      { word: "water content", from: 'hb-m11-03' },
      { word: "airflow", from: 'hb-m11-03' },
      { word: "brittle", from: 'hb-m11-03' }
    ]
  },
  {
    quarter: 3,
    n: 6,
    spelling: [
      { word: 'jars', from: 'hb-m11-05' },
      { word: 'labels', from: 'hb-m11-06' },
      { word: 'harder', from: 'hb-m11-04' },
      { word: 'paper', from: 'sl-m7-04' },
      { word: 'strip', from: 'sl-m7-04' },
      { word: 'poured', from: 'hb-m11-04' },
      { word: 'schools', from: 'ss-m11-04' },
      { word: 'bigger', from: 'ss-m11-04' },
      { word: 'ever', from: 'hb-m11-05' },
      { word: 'filled', from: 'hb-m11-05' }
    ],
    vocabulary: [
      { word: "decoction", from: 'hb-m11-04' },
      { word: "maceration", from: 'hb-m11-04' },
      { word: "solvent", from: 'hb-m11-04' },
      { word: "shelf life", from: 'hb-m11-05' },
      { word: "spoilage", from: 'hb-m11-05' },
      { word: "best before", from: 'hb-m11-05' },
      { word: "batch", from: 'hb-m11-06' },
      { word: "method", from: 'hb-m11-06' },
      { word: "repeatable", from: 'hb-m11-06' },
      { word: "abolish", from: 'ss-m11-03' }
    ]
  },
  {
    quarter: 3,
    n: 7,
    spelling: [
      { word: 'lamp', from: 'hb-m12-02' },
      { word: 'packet', from: 'hb-m12-01' },
      { word: 'weeks', from: 'hb-m12-01' },
      { word: 'pale', from: 'hb-m12-02' },
      { word: 'stick', from: 'sl-m8-01' },
      { word: 'counts', from: 'hb-m12-01' },
      { word: 'inches', from: 'hb-m12-02' },
      { word: 'length', from: 'sl-m8-01' },
      { word: 'money', from: 'ss-m12-01' },
      { word: 'outside', from: 'hb-m12-03' }
    ],
    vocabulary: [
      { word: "sowing date", from: 'hb-m12-01' },
      { word: "last frost date", from: 'hb-m12-01' },
      { word: "days to maturity", from: 'hb-m12-01' },
      { word: "counting back", from: 'hb-m12-01' },
      { word: "planting plan", from: 'hb-m12-01' },
      { word: "seed mix", from: 'hb-m12-02' },
      { word: "leggy", from: 'hb-m12-02' },
      { word: "sowing depth", from: 'hb-m12-02' },
      { word: "hardening off", from: 'hb-m12-03' },
      { word: "transplant", from: 'hb-m12-03' }
    ]
  },
  {
    quarter: 3,
    n: 8,
    spelling: [
      { word: 'saved', from: 'hb-m12-05' },
      { word: 'laws', from: 'ss-m12-03' },
      { word: 'leans', from: 'sl-m8-05' },
      { word: 'lifted', from: 'hb-m12-06' },
      { word: 'parent', from: 'hb-m12-05' },
      { word: 'supper', from: 'sl-m8-05' },
      { word: 'children', from: 'hb-m12-05' },
      { word: 'chopped', from: 'hb-m12-06' },
      { word: 'grew', from: 'hb-m12-05' },
      { word: 'simply', from: 'hb-m12-04' }
    ],
    vocabulary: [
      { word: "succession planting", from: 'hb-m12-04' },
      { word: "companion planting", from: 'hb-m12-04' },
      { word: "Three Sisters", from: 'hb-m12-04' },
      { word: "nitrogen", from: 'hb-m12-04' },
      { word: "open pollinated", from: 'hb-m12-05' },
      { word: "hybrid", from: 'hb-m12-05' },
      { word: "comes true", from: 'hb-m12-05' },
      { word: "winnowing", from: 'hb-m12-05' },
      { word: "seed label", from: 'hb-m12-05' },
      { word: "clearing", from: 'hb-m12-06' }
    ]
  },
  {
    quarter: 4,
    n: 1,
    spelling: [
      { word: 'crowd', from: 'hb-m13-03' },
      { word: 'tablet', from: 'hb-m13-02' },
      { word: 'willow', from: 'hb-m13-02' },
      { word: 'chemist', from: 'hb-m13-02' },
      { word: 'build', from: 'hb-m13-01' },
      { word: 'built', from: 'hb-m13-01' },
      { word: 'cells', from: 'body-m13-02' },
      { word: 'compounds', from: 'hb-m13-01' },
      { word: 'groups', from: 'hb-m13-03' },
      { word: 'hundreds', from: 'hb-m13-03' }
    ],
    vocabulary: [
      { word: "compound", from: 'hb-m13-01' },
      { word: "defence chemical", from: 'hb-m13-01' },
      { word: "herbivore", from: 'hb-m13-01' },
      { word: "bitter", from: 'hb-m13-01' },
      { word: "allicin", from: 'hb-m13-01' },
      { word: "salicin", from: 'hb-m13-02' },
      { word: "isolate", from: 'hb-m13-02' },
      { word: "active ingredient", from: 'hb-m13-02' },
      { word: "standardised", from: 'hb-m13-02' },
      { word: "mixture", from: 'hb-m13-03' }
    ]
  },
  {
    quarter: 4,
    n: 2,
    spelling: [
      { word: 'amount', from: 'hb-m13-04' },
      { word: 'hurt', from: 'hb-m13-05' },
      { word: 'bulk', from: 'hb-m13-04' },
      { word: 'coil', from: 'body-m13-03' },
      { word: 'itself', from: 'hb-m13-04' },
      { word: 'searching', from: 'hb-m13-06' },
      { word: 'stopped', from: 'hb-m13-06' },
      { word: 'bother', from: 'hb-m13-06' },
      { word: 'call', from: 'hb-m13-04' },
      { word: 'easy', from: 'hb-m13-06' }
    ],
    vocabulary: [
      { word: "excipient", from: 'hb-m13-04' },
      { word: "filler", from: 'hb-m13-04' },
      { word: "binder", from: 'hb-m13-04' },
      { word: "disintegrant", from: 'hb-m13-04' },
      { word: "batch number", from: 'hb-m13-04' },
      { word: "dose", from: 'hb-m13-05' },
      { word: "concentration", from: 'hb-m13-05' },
      { word: "dilution", from: 'hb-m13-05' },
      { word: "toxicology", from: 'hb-m13-05' },
      { word: "pharmacist", from: 'hb-m13-05' }
    ]
  },
  {
    quarter: 4,
    n: 3,
    spelling: [
      { word: 'better', from: 'hb-m14-02' },
      { word: 'seems', from: 'hb-m14-02' },
      { word: 'become', from: 'body-m14-01' },
      { word: 'changing', from: 'hb-m14-02' },
      { word: 'credit', from: 'hb-m14-03' },
      { word: 'eaten', from: 'hb-m14-01' },
      { word: 'explain', from: 'hb-m14-02' },
      { word: 'greener', from: 'hb-m14-02' },
      { word: 'kind', from: 'hb-m14-01' },
      { word: 'large', from: 'body-m14-01' }
    ],
    vocabulary: [
      { word: "anecdote", from: 'hb-m14-01' },
      { word: "sample size", from: 'hb-m14-01' },
      { word: "variation", from: 'hb-m14-01' },
      { word: "variable", from: 'hb-m14-02' },
      { word: "coincidence", from: 'hb-m14-02' },
      { word: "cause", from: 'hb-m14-02' },
      { word: "control group", from: 'hb-m14-03' },
      { word: "treatment group", from: 'hb-m14-03' },
      { word: "comparison", from: 'hb-m14-03' },
      { word: "baseline", from: 'hb-m14-03' }
    ]
  },
  {
    quarter: 4,
    n: 4,
    spelling: [
      { word: 'height', from: 'body-m14-03' },
      { word: 'nail', from: 'body-m14-04' },
      { word: 'taught', from: 'hb-m14-06' },
      { word: 'tells', from: 'hb-m14-04' },
      { word: 'trying', from: 'hb-m14-04' },
      { word: 'closed', from: 'body-m14-03' },
      { word: 'facts', from: 'hb-m14-05' },
      { word: 'bands', from: 'body-m14-03' },
      { word: 'base', from: 'body-m14-04' },
      { word: 'caused', from: 'hb-m14-06' }
    ],
    vocabulary: [
      { word: "placebo", from: 'hb-m14-04' },
      { word: "blinded", from: 'hb-m14-04' },
      { word: "double-blinded", from: 'hb-m14-04' },
      { word: "expectation", from: 'hb-m14-04' },
      { word: "bias", from: 'hb-m14-04' },
      { word: "ingredient", from: 'hb-m14-05' },
      { word: "net weight", from: 'hb-m14-05' },
      { word: "cherry-picking", from: 'hb-m14-05' },
      { word: "weasel word", from: 'hb-m14-05' },
      { word: "revise", from: 'hb-m14-06' }
    ]
  },
  {
    quarter: 4,
    n: 5,
    spelling: [
      { word: 'wrote', from: 'hb-m15-01' },
      { word: 'woman', from: 'hb-m15-01' },
      { word: 'degree', from: 'hb-m15-01' },
      { word: 'asking', from: 'hb-m15-03' },
      { word: 'earn', from: 'hb-m15-01' },
      { word: 'named', from: 'hb-m15-01' },
      { word: 'became', from: 'hb-m15-02' },
      { word: 'child', from: 'hb-m15-01' },
      { word: 'clean', from: 'body-m15-01' },
      { word: 'found', from: 'hb-m15-02' }
    ],
    vocabulary: [
      { word: "physician", from: 'hb-m15-01' },
      { word: "prevention", from: 'hb-m15-01' },
      { word: "doctress", from: 'hb-m15-01' },
      { word: "Freedmen's Bureau", from: 'hb-m15-01' },
      { word: "discourse", from: 'hb-m15-01' },
      { word: "sanitary visitor", from: 'hb-m15-02' },
      { word: "conditions", from: 'hb-m15-02' },
      { word: "overcrowding", from: 'hb-m15-02' },
      { word: "dispensary", from: 'hb-m15-02' },
      { word: "public health", from: 'hb-m15-02' }
    ]
  },
  {
    quarter: 4,
    n: 6,
    spelling: [
      { word: 'patient', from: 'hb-m15-04' },
      { word: 'drugs', from: 'hb-m15-04' },
      { word: 'fluid', from: 'hb-m15-05' },
      { word: 'drug', from: 'hb-m15-04' },
      { word: 'illness', from: 'body-m15-03' },
      { word: 'learned', from: 'hb-m15-04' },
      { word: 'team', from: 'hb-m15-04' },
      { word: 'cable', from: 'hb-m15-05' },
      { word: 'surgeon', from: 'hb-m15-05' },
      { word: 'tried', from: 'hb-m15-04' }
    ],
    vocabulary: [
      { word: "chemotherapy", from: 'hb-m15-04' },
      { word: "tumour", from: 'hb-m15-04' },
      { word: "tissue culture", from: 'hb-m15-04' },
      { word: "oncology", from: 'hb-m15-04' },
      { word: "nervous system", from: 'hb-m15-05' },
      { word: "hydrocephalus", from: 'hb-m15-05' },
      { word: "shunt", from: 'hb-m15-05' },
      { word: "virus", from: 'hb-m15-06' },
      { word: "vaccine", from: 'hb-m15-06' },
      { word: "immune system", from: 'hb-m15-06' }
    ]
  },
  {
    quarter: 4,
    n: 7,
    spelling: [
      { word: 'page', from: 'hb-m16-01' },
      { word: 'cloudy', from: 'body-m16-02' },
      { word: 'drawing', from: 'hb-m16-01' },
      { word: 'care', from: 'hb-m16-01' },
      { word: 'questions', from: 'hb-m16-03' },
      { word: 'school', from: 'body-m16-01' },
      { word: 'sight', from: 'body-m16-02' },
      { word: 'yourself', from: 'hb-m16-02' },
      { word: 'caring', from: 'body-m16-01' },
      { word: 'expect', from: 'hb-m16-01' }
    ],
    vocabulary: [
      { word: "log", from: 'hb-m16-01' },
      { word: "entry", from: 'hb-m16-01' },
      { word: "hindsight", from: 'hb-m16-01' },
      { word: "phenology", from: 'hb-m16-01' },
      { word: "field guide", from: 'hb-m16-02' },
      { word: "scale bar", from: 'hb-m16-02' },
      { word: "habit", from: 'hb-m16-02' },
      { word: "key feature", from: 'hb-m16-02' },
      { word: "testable question", from: 'hb-m16-03' },
      { word: "open question", from: 'hb-m16-03' }
    ]
  },
  {
    quarter: 4,
    n: 8,
    spelling: [
      { word: 'stops', from: 'hb-m16-04' },
      { word: 'trust', from: 'hb-m16-04' },
      { word: 'unsure', from: 'hb-m16-05' },
      { word: 'counted', from: 'hb-m16-06' },
      { word: 'design', from: 'hb-m16-04' },
      { word: 'skill', from: 'hb-m16-06' },
      { word: 'writing', from: 'hb-m16-06' },
      { word: 'clever', from: 'hb-m16-05' },
      { word: 'hardest', from: 'hb-m16-04' },
      { word: 'idea', from: 'hb-m16-04' }
    ],
    vocabulary: [
      { word: "protocol", from: 'hb-m16-04' },
      { word: "uncertainty", from: 'hb-m16-05' },
      { word: "limitation", from: 'hb-m16-05' },
      { word: "replicate", from: 'hb-m16-05' },
      { word: "measurement", from: 'hb-m16-06' },
      { word: "referral", from: 'hb-m16-06' },
      { word: "neurosurgeon", from: 'body-m16-03' },
      { word: "department", from: 'body-m16-03' },
      { word: "doubt", from: 'body-m16-03' },
      { word: "astronaut", from: 'body-m16-04' }
    ]
  }
];

/** Ten spelling words for one week, or null when that week is not in the year. */
export function spellingForWeek(quarter, n) {
  const w = WORD_STUDY_WEEKS.find((x) => x.quarter === quarter && x.n === n);
  return w ? w.spelling : null;
}

/** Ten vocabulary terms for one week, or null when that week is not in the year. */
export function vocabularyForWeek(quarter, n) {
  const w = WORD_STUDY_WEEKS.find((x) => x.quarter === quarter && x.n === n);
  return w ? w.vocabulary : null;
}

export const WORDS_PER_WEEK = 10;
export const WORD_STUDY_WEEK_COUNT = 32;
