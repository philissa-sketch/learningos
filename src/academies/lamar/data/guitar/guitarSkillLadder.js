// ---------------------------------------------------------------------------
// Electric Guitar — the full-year skill ladder. Thirty skills, in order.
// (Q1's eight shipped Aug 8, 2026; Q2 through Summer added Aug 25 — audit O-5.)
//
// THIS IS A ROUTINE, NOT A LESSON, and the difference is the whole design.
// Theory (guitarTheory.js) is short, real and quizzable. Playing is not. You
// cannot quiz whether a twelve-year-old's fretting hand is relaxed, and
// pretending otherwise produces a score that measures nothing. So this file
// carries a DAILY CARD: fifteen minutes, one technique, one piece of a song.
//
// FIFTEEN MINUTES, NOT THIRTY. He will do fifteen most days. He will not do
// forty-five, and a routine he skips teaches him that he is someone who skips.
// This subject exists because he is not self-disciplined with the guitar, so
// every number in this file is set to what actually gets done, not to what
// would be ideal if he were a different boy.
//
// HE SHOULD BE PLAYING SOMETHING RECOGNISABLE BY WEEK TWO. Nobody sticks with
// guitar through scales; they stick because they can play something they know.
// That is why the riff arrives at step 4 and not at step 12.
//
// -- ELECTRIC IS AN ADVANTAGE HERE, NOT A COMPROMISE --------------------------
// Power chords are two fingers and they move, which is easier for a
// twelve-year-old's hands than the open chords an acoustic course starts with.
// Single-note riffs sound like the record almost immediately. A beginner simply
// sounds GOOD faster on an electric.
//
// -- WHY TWO STEPS COME FROM GRADE 2 -----------------------------------------
// JustinGuitar's Grade 1 never teaches power chords; his sequence is built
// acoustic-first around open chords, and power chords land in Grade 2 Module 12.
// Steps 5 and 8 below deliberately jump there. THAT IS ON PURPOSE — do not
// "correct" it back to Grade 1. An electric player who waits for Grade 2 to
// play a power chord spends three months not sounding like the music he wants
// to play, which is the fastest way to lose him.
//
// -- WHY STEP 6 HAS NO VIDEO -------------------------------------------------
// Changing between two power chords in time is not a thing to watch. It is a
// thing to do slowly, with a click, until it stops being hard. It gets the
// metronome and a tempo target instead of a lesson, and that is the correct
// answer rather than a gap.
//
// EVERY URL BELOW WAS OPENED AND READ ON 2026-08-08 — see guitarTools.js.
// ---------------------------------------------------------------------------

/** The daily practice block. Fifteen minutes, and the schedule names it (block-10, 3:00-3:15). */
export const GUITAR_DAILY_MINUTES = 15;

/** How the fifteen minutes are spent. Same shape every day, so it needs no deciding. */
export const GUITAR_SESSION_SHAPE = [
  { id: 'warm-up', minutes: 2, label: 'Warm up', detail: 'Tune first. Then loosen your hands — one finger per fret, up and back, slowly.' },
  { id: 'technique', minutes: 8, label: "Today's skill", detail: 'The one thing on the card. Slow and correct beats fast and sloppy, every time.' },
  { id: 'song', minutes: 5, label: 'A piece of a song', detail: 'Not the whole song. One bar, one riff, the part you cannot play yet.' }
];

export const guitarSkillLadder = [
  {
    number: 1,
    id: 'gt7-skill-tuning',
    title: 'Tuning',
    quarter: 'Q1 2026-2027',
    whatItIs: 'Getting all six strings to the right pitch, with a tuner, before you play a note.',
    whyFirst:
      'This is non-negotiable and it is first. An out-of-tune guitar makes everything you play sound wrong, and a beginner cannot tell whether it is the guitar or himself. That is the fastest possible route to deciding he is bad at this.',
    lesson: {
      label: 'How To Tune A Guitar For Beginners — JustinGuitar',
      url: 'https://www.justinguitar.com/guitar-lessons/how-to-tune-a-guitar-for-beginners-bc-109'
    },
    toolId: 'guitar-tool-tuner',
    practice: [
      'Open the tuner and let the browser use the microphone.',
      'Tune from the thickest string to the thinnest: E A D G B E.',
      'Play each string again after you finish — tuning one string can pull the others.',
      'If the mic cannot hear you: plug into a small amp and let the mic hear the amp, or move somewhere quiet. An unplugged electric is very quiet, and that is the guitar, not you.'
    ],
    youWillKnowItWhen: 'You can tune all six strings on your own in under two minutes without asking anyone.'
  },
  {
    number: 2,
    id: 'gt7-skill-holding-it',
    title: 'Holding it',
    quarter: 'Q1 2026-2027',
    whatItIs: 'Where the guitar sits, what each hand does, and what your back is doing while you play.',
    whyFirst:
      'Bad habits set in the first month are the ones you spend a year undoing. A collapsed wrist is not just sloppy — it hurts, eventually.',
    lesson: {
      label: 'How To Hold Your Guitar — JustinGuitar',
      url: 'https://www.justinguitar.com/guitar-lessons/how-to-hold-your-guitar-b1-102'
    },
    alsoWatch: {
      label: 'Positive Finger Placement — JustinGuitar',
      url: 'https://www.justinguitar.com/guitar-lessons/positive-finger-placement-b1-103'
    },
    toolId: null,
    practice: [
      'Guitar on your right leg, right arm resting over the front of it.',
      'Check that your fretting hand is NOT holding the guitar up — you should be able to take it off the neck entirely and nothing moves.',
      'Do not lean the guitar back towards you to see the strings. Look over the top instead.',
      'Sit up. Notice when you start hunching, and stop.'
    ],
    youWillKnowItWhen: 'You can take your fretting hand off the neck mid-song and the guitar stays exactly where it was.'
  },
  {
    number: 3,
    id: 'gt7-skill-reading-tab',
    title: 'Reading tab',
    quarter: 'Q1 2026-2027',
    whatItIs: 'Six lines, one per string, with numbers on them telling you which fret to press.',
    whyFirst:
      'Tab is how every riff you will ever want to learn is written down. Once you can read it, you stop needing anyone to show you a song.',
    lesson: {
      label: 'How To Read Guitar TAB — JustinGuitar',
      url: 'https://www.justinguitar.com/guitar-lessons/how-to-read-guitar-tab-b1-405'
    },
    toolId: null,
    practice: [
      'Remember which line is which: the BOTTOM line is the thickest string, low E. Tab is drawn the way the guitar looks when you look down at it.',
      'A 0 means play the string open — no finger.',
      'Numbers stacked on top of each other are played together. Numbers side by side are played one after another.',
      'Read the Peter Gunn tab from step 4 out loud before you play it: "low E, open, open, third fret..."'
    ],
    youWillKnowItWhen: 'You can look at a tab you have never seen and work out where your fingers go, without a video.',
    theoryLink: 'gt7-theory-reading-tab'
  },
  {
    number: 4,
    id: 'gt7-skill-one-string-riff',
    title: 'A riff on one string',
    quarter: 'Q1 2026-2027',
    whatItIs: 'One note at a time, all on the low strings — a real riff that sounds like the record.',
    whyFirst:
      'This is the week it starts being fun. One string, one finger at a time, and it sounds exactly like the thing you meant to play.',
    lesson: {
      label: 'Peter Gunn Theme — JustinGuitar',
      url: 'https://www.justinguitar.com/guitar-lessons/peter-gunn-theme-b1-207'
    },
    toolId: 'guitar-tool-metronome',
    practice: [
      'Learn it four notes at a time. Do not try to play the whole riff on day one.',
      'Play it slowly enough that you never make a mistake. Speed is the last thing you add, not the first.',
      'Then put the metronome on at a speed where it is easy, and only then start moving it up.'
    ],
    youWillKnowItWhen: 'You can play it start to finish, in time, three times in a row without a mistake.'
  },
  {
    number: 5,
    id: 'gt7-skill-power-chords',
    title: 'Power chords',
    quarter: 'Q1 2026-2027',
    whatItIs: 'Two fingers, one shape, and it slides anywhere on the neck. Root 5 and Root 6 shapes.',
    whyFirst:
      'This is the big unlock on an electric. It is the shape behind most rock songs ever written, it takes two fingers instead of four, and because it moves, one shape you have learned is every power chord there is.',
    lesson: {
      label: 'Power Chords — JustinGuitar (Grade 2, Module 12)',
      url: 'https://www.justinguitar.com/guitar-lessons/power-chords-bg-1201'
    },
    toolId: null,
    fromGrade2: true,
    practice: [
      'Learn the Root 6 shape first — root note on the thickest string.',
      'Then the Root 5 shape — same idea, one string over.',
      'Move the shape to five different frets and play it at each one. It is the SAME chord shape with a different name.',
      'Mute what you are not playing. A power chord with three extra strings ringing is a mess, not a chord.'
    ],
    youWillKnowItWhen: 'You can put a power chord anywhere on the neck and name it, and nothing rings that should not.'
  },
  {
    number: 6,
    id: 'gt7-skill-power-chord-changes',
    title: 'Changing between two, in time',
    quarter: 'Q1 2026-2027',
    whatItIs: 'Two power chords, back and forth, without the music stopping while your hand moves.',
    whyFirst:
      'Knowing a chord and being able to GET to it are two different skills, and the second one is what songs are made of. Almost everyone who quits guitar quits somewhere in this step.',
    // Deliberately null — see the file header. This is practice with a click,
    // not something to watch someone else do.
    lesson: null,
    toolId: 'guitar-tool-metronome',
    practice: [
      'Pick two power chords. Set the metronome slow — slower than feels sensible. 60 is fine.',
      'Four clicks on the first chord, four on the second. The point is that the change happens ON the click, not near it.',
      'When you can do a whole minute with no stumble, move the metronome up by 5. Not by 20.',
      'If you stumble twice, go back down. There is no prize for the higher number.'
    ],
    youWillKnowItWhen: 'You can swap between two power chords for a solid minute at a steady tempo without the beat wobbling.',
    noLessonReason:
      'There is no video for this because there is nothing to watch. It is repetition against a click, and the metronome is the tool.'
  },
  {
    number: 7,
    id: 'gt7-skill-counting-four-four',
    title: 'Counting 4/4 and downstrokes',
    quarter: 'Q1 2026-2027',
    whatItIs: 'Counting 1-2-3-4 out loud, tapping your foot on every number, and hitting the strings downward on each one.',
    whyFirst:
      'A guitarist who cannot keep time cannot play with anyone. Foot tapping is the thing that separates people who can play along with a record from people who cannot.',
    lesson: {
      label: 'Tapping Your Foot — JustinGuitar',
      url: 'https://www.justinguitar.com/guitar-lessons/tapping-your-foot-b1-203'
    },
    toolId: 'guitar-tool-metronome',
    practice: [
      'Foot first, guitar second. Tap and count 1-2-3-4 out loud with no guitar at all for thirty seconds.',
      'Now add ONE power chord, one downstroke per number.',
      'Count out loud while you play. It feels ridiculous and it is the whole exercise.',
      'Put a song on and tap your foot to it without playing anything.'
    ],
    youWillKnowItWhen: 'You can count out loud and play at the same time without either one falling apart.',
    theoryLink: 'gt7-theory-counting-four-four'
  },
  {
    number: 8,
    id: 'gt7-skill-one-full-riff',
    title: 'One full riff, start to finish',
    quarter: 'Q1 2026-2027',
    whatItIs: 'A whole riff, played all the way through, in time, well enough to play it for somebody.',
    whyFirst:
      'This is the end of the quarter and the point of the quarter. Not eight half-learned things — one thing you can actually play.',
    lesson: {
      label: 'Enter Sandman — JustinGuitar (Grade 2, Module 12)',
      url: 'https://www.justinguitar.com/guitar-lessons/enter-sandman-bg-1205'
    },
    toolId: 'guitar-tool-metronome',
    fromGrade2: true,
    practice: [
      'Everything from steps 4, 5, 6 and 7 is in this riff. That is why it is last.',
      'Learn it in pieces. Play the pieces slowly. Join them up last.',
      'Record it once now, before you can play it. You will want that recording later.',
      'Play it for your mother at the end of the quarter. That is the deadline, and deadlines make people practise in a way that streaks do not.'
    ],
    youWillKnowItWhen: 'You can play it start to finish for another person, and it sounds like the song.'
  },

  /* =========================================================================
   * Q2 — CHORDS, AND A RIGHT HAND THAT KEEPS TIME.
   *
   * (Audit item O-5, written Aug 25, 2026. The parent: "complete guitar.")
   *
   * Q1 ended at eight skills and the ladder ended with it. `getCurrentGuitarSkill`
   * falls back to the last rung once everything is cleared, and Guitar has a
   * block every school day with no day restriction — so from roughly November
   * the card would have shown **Enter Sandman, every day, for 181 days.**
   *
   * A routine that stops moving is a routine he stops doing, and this subject
   * exists in the first place because he is not self-disciplined with the
   * guitar. The ladder now runs the full year.
   *
   * THE ARC, and it is deliberate:
   *   Q1      hold it, tune it, read tab, play a riff          (done)
   *   Q2      palm muting, movable shapes, first open chords
   *   Q3      strumming, a whole song, and the pentatonic
   *   Q4      barre chords, dynamics, playing WITH something
   *   Summer  ear, blues, improvising, and playing for people
   *
   * SAME PACE AS Q1, which was eight skills across thirteen weeks — about one
   * every eleven days. Nothing here is faster than that, because the thing
   * being built is a habit and the habit is fifteen minutes.
   *
   * ---- ON THE MISSING VIDEO LINKS ----
   *
   * Every URL in Q1 was opened and read on 2026-08-08 before it was written
   * down; that is the standing rule for every external link in this project,
   * and a dead link inside a twelve-year-old's daily routine is worse than no
   * link at all. justinguitar.com could not be opened from this session, so
   * NO URL BELOW IS GUESSED. Each skill carries either:
   *
   *   noLessonReason  — it is a doing-thing, not a watching-thing. Step 6
   *                      already set this precedent: "Changing between two
   *                      power chords in time is not a thing to watch."
   *   lessonPending    — a video genuinely helps and the exact lesson is named
   *                      so it can be found and verified in one pass.
   *
   * The PRACTICE is the skill. The video is support, and the card is complete
   * and usable without it.
   *
   * ---- VERIFIED 2026-08-25, WITH HER APPROVAL ----
   *
   * justinguitar.com was searched and five lesson pages were OPENED AND READ
   * before their URLs were written down — steps 10, 12 (two links), 17 and 19.
   *
   * The rule earned itself immediately. The palm-muting URL this file would
   * have guessed was `palm-muting-bg-1207`; the real one is `bg-1203`. A
   * guessed link looks completely plausible in review and 404s on the first day
   * he clicks it.
   *
   * The remaining seven were confirmed the same day through the BROWSER rather
   * than a plain fetch — justinguitar.com returns 406 to the fetcher but loads
   * normally in Chrome. Each page was opened and its real title read back:
   * "Palm Muting", "THE Strumming Pattern", "Beginner 3: G, C & Technique",
   * "String Bending Vibrato", "The F Chord", "E Shape Barre Chords: Major",
   * "12 Bar Blues Progressions". **Nothing here is `lessonPending` any more,
   * and nothing was guessed.**
   *
   * ONE DELIBERATE REJECTION, recorded so nobody re-adds it: "Shifting The F"
   * (bg-1103) was opened, is real, and was NOT used for step 22. It shifts the
   * F shape to DIAGNOSE a buzzing barre — it is not a lesson on transposing the
   * shape to play other chords. A real page that teaches the wrong thing is a
   * worse link than none, because nothing about it looks broken.
   * ========================================================================= */

  {
    number: 9,
    id: 'gt7-skill-palm-muting',
    title: 'Palm muting',
    quarter: 'Q2 2026-2027',
    whatItIs: 'Resting the edge of your strumming hand on the strings where they meet the bridge, so the notes go short and tight instead of ringing.',
    whyFirst:
      'This is the single biggest jump in sounding like a record rather than like a beginner. The same power chords you already know become a completely different thing the moment you mute them. It is one hand position and it takes a week.',
    lesson: {
      label: 'Palm Muting — JustinGuitar',
      url: 'https://www.justinguitar.com/guitar-lessons/palm-muting-bg-1203'
    },
    toolId: null,
    practice: [
      'Rest the fleshy edge of your picking hand on the strings right where they touch the bridge. Not on the pickups — on the bridge.',
      'Play the low E. Too muffled means your hand is too far forward; still ringing means it is too far back. Move it a few millimetres at a time.',
      'Play four downstrokes muted, four open, four muted. That contrast IS the technique.',
      'Take the Enter Sandman riff from step 8 and palm mute the whole thing. Same notes. It will suddenly sound right.'
    ],
    youWillKnowItWhen: 'You can switch between muted and ringing in the middle of a riff without stopping to reposition your hand.'
  },
  {
    number: 10,
    id: 'gt7-skill-a-shape-power-chord',
    title: 'The other power chord',
    quarter: 'Q2 2026-2027',
    whatItIs: 'The same shape you already know, rooted on the A string instead of the low E — which doubles every chord you can reach without learning anything new.',
    whyFirst:
      'You already know one movable shape. This is the second, and between the two of them you can play every power chord that exists. There is no third one to learn.',
    lesson: {
      label: 'Power Chords 2 — JustinGuitar',
      url: 'https://www.justinguitar.com/guitar-lessons/power-chords-2-bc-186'
    },
    toolId: null,
    practice: [
      'Same finger shape as the E-string power chord. Move the whole thing down one string.',
      'Find D (5th fret, A string), G (10th fret), C (3rd fret). Say the name out loud as you play it.',
      'Practise jumping between an E-string root and an A-string root: E5 to A5, then A5 to D5.',
      'Mute the strings you are not playing with the underside of your fretting fingers. A power chord with a stray open string in it is not a power chord.'
    ],
    youWillKnowItWhen: 'Someone names a chord — G5, C5, D5 — and you find it on either string without counting up from the nut.'
  },
  {
    number: 11,
    id: 'gt7-skill-riff-two',
    title: 'A second riff, learned on your own',
    quarter: 'Q2 2026-2027',
    whatItIs: 'One riff you pick yourself, find the tab for yourself, and learn without anyone teaching it to you.',
    whyFirst:
      'Step 3 taught you to read tab. This is the first time you use it the way you will use it for the rest of your life — to learn something nobody assigned you. Pick a riff you actually like. That part is not negotiable.',
    lesson: null,
    noLessonReason: 'The entire point is that nobody shows him this one. A lesson here would remove the skill being taught.',
    toolId: 'guitar-tool-metronome',
    practice: [
      'Pick a song with a riff you can hum. If you cannot hum it, you cannot check yourself.',
      'Find the tab. Read it before you play it — work out where your fingers go while the guitar is on your lap.',
      'Learn it four notes at a time. Four notes clean beats sixteen notes messy.',
      'Slow with the metronome, then faster. If you make the same mistake twice, you are going too fast.'
    ],
    youWillKnowItWhen: 'You can play it in time with the actual recording, not just on your own.'
  },
  {
    number: 12,
    id: 'gt7-skill-first-open-chords',
    title: 'Em, Am and D',
    quarter: 'Q2 2026-2027',
    whatItIs: 'Your first three open chords — the shapes that use open strings and cannot be moved around.',
    whyFirst:
      'Power chords got you playing fast, and they are two notes. These are real chords, and they are what almost every song you know is actually built out of. Em is two fingers and is the easiest chord on the guitar; start there.',
    lesson: {
      label: 'The E Minor Chord — JustinGuitar',
      url: 'https://www.justinguitar.com/guitar-lessons/the-e-minor-chord-b1-302'
    },
    alsoWatch: {
      label: 'The A Minor Chord — JustinGuitar',
      url: 'https://www.justinguitar.com/guitar-lessons/the-a-minor-chord-b1-303'
    },
    toolId: 'guitar-tool-justinguitar',
    practice: [
      'Em first. Two fingers. Play each string one at a time and listen for a dead one.',
      'Fingertips, not pads. Come down on the string from above so you are not touching the one next to it.',
      'A dead string is almost always a finger leaning on its neighbour, not a finger pressing too softly.',
      'Add Am, then D. D is the awkward one — everybody finds it awkward.'
    ],
    youWillKnowItWhen: 'You can play all three and every string in every chord rings clean.'
  },
  {
    number: 13,
    id: 'gt7-skill-one-minute-changes',
    title: 'Changing chords in time',
    quarter: 'Q2 2026-2027',
    whatItIs: 'Getting from one chord to another fast enough that the music does not stop while you do it.',
    whyFirst:
      'Everybody can play chords. Almost nobody can change between them, and that is the actual wall. This is where most people quit, so it gets its own step and a number to beat.',
    lesson: null,
    noLessonReason: 'Step 6 settled this: changing between shapes in time is not a thing to watch, it is a thing to do slowly with a click until it stops being hard.',
    toolId: 'guitar-tool-metronome',
    practice: [
      'One minute on a timer. Change between two chords — Em and Am — as many times as you can, counting each clean change.',
      'Write the number down. Tomorrow, beat it.',
      'Move the fingers that BOTH chords share last, or not at all. Em to Am moves the same shape across one string.',
      'Then do it with the metronome at 60 and change on beat 1 every bar. Slower and in time beats faster and ragged.'
    ],
    youWillKnowItWhen: 'You can get 30 clean changes in a minute between any two of Em, Am and D.'
  },

  /* ---- Q3: a right hand that strums, a whole song, and the first lead ---- */

  {
    number: 14,
    id: 'gt7-skill-strumming',
    title: 'A strumming pattern',
    quarter: 'Q3 2026-2027',
    whatItIs: 'Down, down-up, up-down-up — the one pattern that fits an enormous number of songs.',
    whyFirst:
      'Your right hand has only ever played single notes and downstrokes. A song needs a rhythm, and a rhythm needs a hand that keeps moving even when it is not hitting the strings.',
    lesson: {
      label: 'THE Strumming Pattern — JustinGuitar',
      url: 'https://www.justinguitar.com/guitar-lessons/the-strumming-pattern-b1-404'
    },
    toolId: 'guitar-tool-metronome',
    practice: [
      'Your hand never stops moving. Down on every beat, up on every off-beat, always — you just miss the strings on the ones you are not playing.',
      'Practise the motion on muted strings first so you are listening to rhythm and not to chords.',
      'Add one chord. Just Em, for a whole minute, with the pattern.',
      'Then change chords once every four bars. Not more, yet.'
    ],
    youWillKnowItWhen: 'Your strumming hand keeps time through a chord change without hesitating.'
  },
  {
    number: 15,
    id: 'gt7-skill-g-c-d',
    title: 'G, C and D',
    quarter: 'Q3 2026-2027',
    whatItIs: 'Three more open chords — and with these, more songs than you could learn in a year.',
    whyFirst:
      'G, C and D is the most common chord group in popular music, and adding Em to it gives you four chords that between them cover a genuinely enormous amount of what you already listen to.',
    lesson: {
      label: 'Beginner 3: G, C & Technique — JustinGuitar',
      url: 'https://www.justinguitar.com/modules/beginner-3-g-c-technique'
    },
    alsoWatch: {
      label: 'How To Play The D Chord — JustinGuitar',
      url: 'https://www.justinguitar.com/guitar-lessons/how-to-play-the-d-chord-b1-105'
    },
    toolId: 'guitar-tool-justinguitar',
    practice: [
      'C is the hard one. Your third finger stretches further than it wants to; it gets easier in about two weeks.',
      'One-minute changes again, on the new pairs: G to C, C to D, G to D.',
      'Anchor finger: G to Em keeps your second finger almost in place. Find the shared fingers and stop lifting them.',
      'Then play G, C, D, G with the strumming pattern from step 14.'
    ],
    youWillKnowItWhen: 'You can play G, C, D and Em in any order, strumming, without looking down at your hand for every change.'
  },
  {
    number: 16,
    id: 'gt7-skill-a-whole-song',
    title: 'A whole song, start to finish',
    quarter: 'Q3 2026-2027',
    whatItIs: 'Not a riff. Not a verse. One song, from the first bar to the last, without stopping.',
    whyFirst:
      'This is the step that turns a person who plays guitar into a guitarist. Everything before it was pieces. Playing something all the way through — including the boring bits, including the bit you keep fluffing — is a different skill from playing it well.',
    lesson: null,
    noLessonReason: 'The song is his choice. A video of somebody else\'s song would be a different assignment.',
    toolId: 'guitar-tool-metronome',
    practice: [
      'Pick a song that uses chords you already have. G, C, D and Em is enough for hundreds.',
      'Map it out on paper first: intro, verse, chorus, verse, chorus, end. Know the shape before you play it.',
      'Practise the CHANGES that are hard, on their own, out of the song.',
      'Then play it through and do not stop for mistakes. Stopping to fix things is a different exercise, and it is not this one.'
    ],
    youWillKnowItWhen: 'You play it start to finish, mistakes and all, without stopping.'
  },
  {
    number: 17,
    id: 'gt7-skill-pentatonic',
    title: 'The minor pentatonic — box 1',
    quarter: 'Q3 2026-2027',
    whatItIs: 'Five notes in one shape, which is the shape almost every rock and blues solo you have ever heard comes out of.',
    whyFirst:
      'Every lead line you want to play lives here. It is one shape, it moves, and learning it opens up soloing the same way the power chord shape opened up rhythm.',
    lesson: {
      label: 'Minor Pentatonic Pattern 1 — JustinGuitar',
      url: 'https://www.justinguitar.com/guitar-lessons/minor-pentatonic-pattern-1-bl-402'
    },
    toolId: 'guitar-tool-metronome',
    practice: [
      'Learn the shape at the 5th fret first — that is A minor pentatonic.',
      'Up and down, one note per beat, with the metronome. Alternate picking: down, up, down, up.',
      'Say the shape rather than reading it. You should be able to play it with your eyes shut inside two weeks.',
      'Move the whole shape to the 3rd fret. Now it is G minor pentatonic. That is the entire trick.'
    ],
    youWillKnowItWhen: 'You can play it cleanly up and down at 100bpm, and start it from any fret.'
  },
  {
    number: 18,
    id: 'gt7-skill-bends-and-vibrato',
    title: 'Bending and vibrato',
    quarter: 'Q3 2026-2027',
    whatItIs: 'Pushing a string sideways to raise its pitch, and shaking it to make the note sing.',
    whyFirst:
      'This is the difference between playing notes and playing music. The same five pentatonic notes sound like an exercise without these and like a guitar player with them.',
    lesson: {
      label: 'String Bending Vibrato — JustinGuitar',
      url: 'https://www.justinguitar.com/guitar-lessons/string-bending-vibrato-te-107'
    },
    toolId: 'guitar-tool-tuner',
    practice: [
      'Push with your third finger and put the first two behind it for strength. Never bend with one finger alone.',
      'Bend up to a note you already know — play the target fret first, then bend up until it matches. Use the tuner to check you are actually arriving.',
      'A bend that lands flat is the most common beginner sound there is. Land it.',
      'Vibrato is a small, controlled, repeated bend. Slow and wide beats fast and nervous.'
    ],
    youWillKnowItWhen: 'You can bend a full tone and land exactly on pitch, checked against the tuner, three times out of three.'
  },
  {
    number: 19,
    id: 'gt7-skill-hammer-pull',
    title: 'Hammer-ons and pull-offs',
    quarter: 'Q3 2026-2027',
    whatItIs: 'Sounding a note with your fretting hand alone — hammering onto a fret, or pulling off one to sound the note below.',
    whyFirst:
      'Your picking hand cannot move as fast as your fretting hand. These are how fast lines are actually played, and they make everything sound smoother even when it is slow.',
    lesson: {
      label: 'Beginner Hammer-Ons — JustinGuitar',
      url: 'https://www.justinguitar.com/guitar-lessons/beginner-hammer-ons-bg-1008'
    },
    toolId: null,
    practice: [
      'Hammer down hard and close to the fret. A weak hammer-on is a quiet note, and the fix is where you land, not how hard.',
      'A pull-off is a small sideways flick, not a lift. Lifting straight up gives you nothing.',
      'Run the pentatonic from step 17 picking only the first note of each string.',
      'Play it slowly enough that the hammered notes are exactly as loud as the picked ones.'
    ],
    youWillKnowItWhen: 'The hammered and pulled notes are as loud as the picked ones, without you trying.'
  },
  {
    number: 20,
    id: 'gt7-skill-first-solo',
    title: 'A short solo',
    quarter: 'Q3 2026-2027',
    whatItIs: 'Eight to twelve bars of lead — a real one, from a real song — using everything from steps 17, 18 and 19.',
    whyFirst:
      'Same reason the riff arrived at step 4. A scale you never use in music is homework; a solo is the thing the scale was for.',
    lesson: null,
    noLessonReason: 'His pick, learned from tab, the way step 11 taught him to.',
    toolId: 'guitar-tool-metronome',
    practice: [
      'Pick a short one. Famous, slow and eight bars beats impressive and impossible.',
      'Work out which pentatonic box it is sitting in before you learn a single note. It will be one you already know.',
      'Two bars at a time, slow, with a metronome.',
      'Record yourself playing it once a week. Listening back is the fastest feedback there is.'
    ],
    youWillKnowItWhen: 'You can play it along with the record, in time, with the bends landing on pitch.'
  },

  /* ---- Q4: barre chords, dynamics, and playing WITH something ---- */

  {
    number: 21,
    id: 'gt7-skill-f-barre',
    title: 'The F barre chord',
    quarter: 'Q4 2026-2027',
    whatItIs: 'One finger flattened across all six strings, with a chord shape on top of it.',
    whyFirst:
      'This is the hardest thing in beginner guitar and everybody struggles with it, including everybody you admire. It is a strength and a positioning problem, not a talent problem, and it takes about a month.',
    lesson: {
      label: 'The F Chord — JustinGuitar',
      url: 'https://www.justinguitar.com/guitar-lessons/the-f-chord-b2-901'
    },
    toolId: null,
    practice: [
      'Roll your first finger slightly onto its side. The flat pad has soft spots between the joints; the side edge is bone.',
      'Barre closer to the fret, not in the middle of it.',
      'Thumb behind the neck, roughly opposite your second finger. Not hooked over the top.',
      'Two minutes a day, no more. It is a strength thing, and strength comes from frequency rather than length. Stop when your hand aches.'
    ],
    youWillKnowItWhen: 'Every string rings when you play it, three days in a row.'
  },
  {
    number: 22,
    id: 'gt7-skill-movable-barres',
    title: 'Barre chords that move',
    quarter: 'Q4 2026-2027',
    whatItIs: 'The F shape slid anywhere on the neck, plus the A-string version — which between them give you every major and minor chord there is.',
    whyFirst:
      'Once F works, you did not learn one chord. You learned all of them. This is the moment the whole fretboard opens, and it is the same logic as the power chords in Q1, one step up.',
    lesson: {
      label: 'E Shape Barre Chords: Major — JustinGuitar',
      url: 'https://www.justinguitar.com/guitar-lessons/e-shape-barre-chords-major-4b-001'
    },
    alsoWatch: {
      label: 'A Shape Barre Chords — JustinGuitar',
      url: 'https://www.justinguitar.com/modules/a-shape-barre-chords'
    },
    toolId: null,
    practice: [
      'Slide the F shape up two frets — that is G. Up two more — A. Name each one out loud.',
      'Learn the minor version: it is the F shape with one finger lifted.',
      'Then the A-string root shapes, major and minor.',
      'Play a song you already know entirely in barre chords, in a different key. That is the proof.'
    ],
    youWillKnowItWhen: 'Somebody names any major or minor chord and you find it in under three seconds.'
  },
  {
    number: 23,
    id: 'gt7-skill-dynamics',
    title: 'Loud and quiet',
    quarter: 'Q4 2026-2027',
    whatItIs: 'Deliberately playing some parts softer and some parts harder, instead of everything at one volume.',
    whyFirst:
      'A beginner plays everything at the same level, and that is the main thing that makes playing sound flat even when every note is right. This costs nothing to learn and changes everything.',
    lesson: null,
    noLessonReason: 'This is a listening skill. Watching somebody else do it teaches less than recording yourself not doing it.',
    toolId: null,
    practice: [
      'Play the verse of a song you know quietly and the chorus loudly. Exaggerate it more than feels right.',
      'Record both. Listen back. It will be less different than you thought.',
      'Volume comes from how hard you pick, not from the amp knob.',
      'Find one place in one song where stopping — silence — is better than playing. Use it.'
    ],
    youWillKnowItWhen: 'Someone listening can hear where the chorus starts without being told.'
  },
  {
    number: 24,
    id: 'gt7-skill-play-along',
    title: 'Playing along with the record',
    quarter: 'Q4 2026-2027',
    whatItIs: 'Playing a whole song at the same time as the actual recording, all the way through, keeping up.',
    whyFirst:
      'On your own you slow down at the hard bits without noticing. A recording does not wait, and that is exactly what makes this worth doing. It is the closest thing to playing with other people you can do alone.',
    lesson: null,
    noLessonReason: 'The recording IS the lesson here — the whole skill is keeping up with something that does not slow down for you, and no video can supply that.',
    toolId: null,
    practice: [
      'Start with a song you can already play on your own. This is about time, not notes.',
      'If you fall behind, do not stop — find the next chorus and come back in. Getting back in is the skill.',
      'Play it three times through in a row. The third one is the honest one.',
      'When it works, do it with a song you have never played.'
    ],
    youWillKnowItWhen: 'You can play a song along with the record three times in a row without getting lost.'
  },
  {
    number: 25,
    id: 'gt7-skill-record-and-listen',
    title: 'Recording yourself',
    quarter: 'Q4 2026-2027',
    whatItIs: 'Recording a whole take on a phone and listening back to it properly.',
    whyFirst:
      'You cannot hear yourself accurately while you are playing — your hands take up too much attention. A recording is the only honest witness you have, and it is how you find the problem you have stopped noticing.',
    lesson: null,
    noLessonReason: 'There is nothing to watch. There is something to listen to, and it is him.',
    /* Deliberately null: the community recording page is a FEEDBACK resource,
       not a practice tool, and toolId resolves against the tool list only. */
    toolId: null,
    practice: [
      'Record one full take. Do not restart because you fluffed the intro.',
      'Listen once for timing only. Then again for clean notes only. Then again for dynamics. One thing at a time — listening for everything at once finds nothing.',
      'Write down ONE thing to fix, and practise only that for a week.',
      'Keep the file. Compare it to the same song in three months.'
    ],
    youWillKnowItWhen: 'You can listen to your own take and name one specific thing to fix, rather than just "it was bad".'
  },

  /* ---- Summer: the ear, the blues, and playing for people ---- */

  {
    number: 26,
    id: 'gt7-skill-by-ear',
    title: 'Working out a riff by ear',
    quarter: 'Summer 2027',
    whatItIs: 'Finding the notes of something yourself, from the recording, without tab.',
    whyFirst:
      'Tab made you independent of teachers. This makes you independent of tab. It is slow and frustrating the first three times and then it starts working, and it is the skill that separates people who play guitar for life.',
    lesson: null,
    noLessonReason: 'Watching somebody else work out a riff is watching them use their ear, not training yours.',
    toolId: null,
    practice: [
      'Pick something short and slow that you know by heart.',
      'Find the FIRST note only. Hum it, then hunt for it on the low strings. That one note takes the longest.',
      'Then the second note — is it higher or lower? By a lot or a little? That question is the whole method.',
      'Four bars is a win. Do not start with a solo.'
    ],
    youWillKnowItWhen: 'You work out four bars of something without looking up a single note.'
  },
  {
    number: 27,
    id: 'gt7-skill-twelve-bar-blues',
    title: '12-bar blues',
    quarter: 'Summer 2027',
    whatItIs: 'A twelve-bar chord pattern, the same one, under an enormous amount of the music you already like.',
    whyFirst:
      'It is one pattern, it uses chords you have, and once you know it you can play along with strangers who also know it — which is most guitar players alive. It is also the frame you will improvise over in step 28.',
    lesson: {
      label: '12 Bar Blues Progressions — JustinGuitar',
      url: 'https://www.justinguitar.com/guitar-lessons/12-bar-blues-progressions-bg-1303'
    },
    toolId: 'guitar-tool-metronome',
    practice: [
      'Learn the pattern by counting bars out loud: four of the I, two of the IV, two of the I, one V, one IV, two of the I.',
      'Play it in A with power chords first — A5, D5, E5.',
      'Then in A with the shuffle rhythm. The shuffle is what makes it sound like blues rather than like counting.',
      'Then in E, and in G. Same twelve bars, different starting chord.'
    ],
    youWillKnowItWhen: 'You can play twelve bars in three different keys without writing anything down.'
  },
  {
    number: 28,
    id: 'gt7-skill-improvising',
    title: 'Making something up',
    quarter: 'Summer 2027',
    whatItIs: 'Playing a lead line over the 12-bar blues that you did not learn from anywhere.',
    whyFirst:
      'Every skill on this ladder has been reproducing something somebody else made. This is the first one where the thing that comes out is yours. Nothing on this list will do more for whether he is still playing in five years.',
    lesson: null,
    noLessonReason: 'By definition. A lesson on what to improvise is a lesson on not improvising.',
    toolId: 'guitar-tool-metronome',
    practice: [
      'Record yourself playing twelve bars of blues in A. Play it back on a loop.',
      'Solo over it using only the A minor pentatonic from step 17. Every note in it will work — that is why the box is worth knowing.',
      'Start with THREE notes only. Restricting yourself is what forces you to make something rather than run a scale.',
      'Leave gaps. Silence is a note, and beginners never use it.'
    ],
    youWillKnowItWhen: 'You can play twelve bars of lead over your own backing without repeating yourself and without stopping.'
  },
  {
    number: 29,
    id: 'gt7-skill-write-a-riff',
    title: 'Writing a riff',
    quarter: 'Summer 2027',
    whatItIs: 'Making up a riff of your own, deciding it is finished, and being able to play it the same way twice.',
    whyFirst:
      'Improvising is making something up once. Writing is making something up and then keeping it. Deciding a thing is done, and being able to repeat it, is a different and harder skill — and it is the one engineers use too.',
    lesson: null,
    noLessonReason: 'It is his riff. A lesson on how to write your own riff would hand him somebody else\'s, which is the one thing this step must not do.',
    toolId: null,
    practice: [
      'Start from a rhythm, not from notes. Tap it out before you play anything.',
      'Two bars. Repeat them. A riff is a short thing said twice.',
      'Write it down in tab so it exists tomorrow. This is the step everybody skips and then loses the riff.',
      'Play it for someone without saying you wrote it, and see what they say.'
    ],
    youWillKnowItWhen: 'You can play your own riff identically twice in a row, from your own tab, a week after you wrote it.'
  },
  {
    number: 30,
    id: 'gt7-skill-play-a-set',
    title: 'Play a set',
    quarter: 'Summer 2027',
    whatItIs: 'Three songs, start to finish, in front of actual people, in one sitting.',
    whyFirst:
      'This is the end of the year and the point of the year. Not thirty half-learned skills — three things you can actually play, for someone, on purpose. Step 8 ended the quarter this way for exactly the same reason: a deadline with a person on the other end of it works in a way a streak does not.',
    lesson: null,
    noLessonReason: 'There is nothing left to watch. There is a room, and people in it.',
    toolId: null,
    practice: [
      'Pick three you can already play. This is not the week to learn anything.',
      'Decide the order and write it down. Play them in that order every day for a week.',
      'Practise starting. Most of what goes wrong in front of people goes wrong in the first bar.',
      'Play through mistakes. Nobody watching knows what you meant to play.',
      'Record it. Compare it to the recording you made back at step 8, in October.'
    ],
    youWillKnowItWhen: 'You have done it. Three songs, for people, in one sitting.'
  }
];

/**
 * The skill to work on today.
 *
 * He clears a skill himself — there is no way for this app to know, and
 * pretending to know would be worse than asking. Once every skill is cleared,
 * the last one stays up rather than the card going blank; the ladder ending is
 * not a reason for the routine to end.
 */
export function getCurrentGuitarSkill(clearedNumbers = []) {
  const cleared = new Set(clearedNumbers);
  const next = guitarSkillLadder.find((s) => !cleared.has(s.number));
  if (next) return next;
  /**
   * ---- THE LADDER ENDING IS NOT THE ROUTINE ENDING (Audit item O-5) ----
   *
   * This used to return the last rung silently, forever. With eight skills and
   * a block every single school day, that meant the card showed **Enter
   * Sandman, unchanged, for the rest of the year** — and said nothing about
   * why. A card that never changes is a card he stops reading.
   *
   * It still returns the last rung, because a blank card would be worse. But
   * it says so, and the screen can then tell him the truth: the ladder is
   * finished and the fifteen minutes are still his.
   */
  const last = guitarSkillLadder[guitarSkillLadder.length - 1];
  return last ? { ...last, ladderComplete: true } : null;
}

/** How far up the ladder he is, for the card and for her record. */
export function guitarLadderProgress(clearedNumbers = []) {
  const cleared = new Set(clearedNumbers);
  const done = guitarSkillLadder.filter((s) => cleared.has(s.number)).length;
  return { done, total: guitarSkillLadder.length, complete: done >= guitarSkillLadder.length };
}

export function getGuitarSkillByNumber(number) {
  return guitarSkillLadder.find((s) => s.number === number) || null;
}
