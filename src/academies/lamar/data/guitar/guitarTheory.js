// ---------------------------------------------------------------------------
// Electric Guitar — theory. The first four items.
//
// -- THESE ARE NOT LESSONS, AND THAT IS A DELIBERATE ARCHITECTURAL CHOICE -----
//
// NOTHING IN THIS FILE MAY EVER BE ADDED TO `allLessons`. Read that again
// before adding anything here to data/lessons/index.js, because the failure is
// silent and it is a bad one.
//
// getSubjects() builds the student's mission list, the Lesson Roster and the
// GRADED transcript by walking allLessons. The moment a guitar item appears
// there, Electric Guitar stops being a participation subject and becomes a
// graded one — and the grade would be computed from a handful of theory
// questions while saying precisely nothing about whether the boy can play the
// guitar. verify-curriculum.mjs would also start demanding ten questions,
// per-wrong-answer choiceFeedback and a 90% mastery gate on each of these,
// which is the wrong shape for a four-minute reading.
//
// So: `guitar` lives in PARTICIPATION_SUBJECTS (config/subjects.js) beside PE
// and Gardening, these are short readings with ONE check question each, and
// completing one is recorded as participation. scripts/verify-guitar.mjs
// asserts the zero-rows-in-allLessons property directly, so this cannot drift.
//
// The check question still carries per-wrong-answer choiceFeedback, because
// that is first class everywhere in this app and a wrong answer that just says
// "wrong" teaches nothing.
//
// -- WHERE THESE RUN ---------------------------------------------------------
// block-9 (2:15-3:00) on quiet gardening Fridays. Gardening is heavy in
// August-September and again in March and nearly silent in November; guitar
// theory has no seasonal pressure at all, so the two fill each other's gaps in
// one existing block and neither needs a minute that was not already there.
//
// -- WHY THE LINEAGE IS IN ITEM 1 AND NOT IN A FOOTNOTE ----------------------
// The electric guitar vocabulary he is learning this quarter — the riff, the
// power chord, the whole idea of an amplified guitar as the lead voice — is
// Black American music, and it is traceable to named people with citations.
// Putting that at the END, as a "fun fact", would teach him it was decoration.
// It is in the first theory item he ever opens, where it is load-bearing.
// ---------------------------------------------------------------------------

export const GUITAR_THEORY_QUARTER = 'Q1 2026-2027';

export const guitarTheory = [
  {
    id: 'gt7-theory-string-names',
    number: 1,
    quarter: GUITAR_THEORY_QUARTER,
    sequenceInQuarter: 1,
    title: 'The Six Strings — and where this music came from',
    readingMinutes: 5,
    teaching: [
      {
        heading: 'Six strings, six names, thickest to thinnest',
        text:
          'Hold the guitar the way you play it and look down. The string closest to your face is the thickest one, and it makes the lowest sound. Going from that thickest string down to the thinnest, the six open strings are E, A, D, G, B, and E. Open means you play the string without pressing anything — no fingers on the neck at all. The first E and the last E share a name because they are the same note, just two octaves apart: the same letter, one deep and one bright. That is why tuning is always done in that order, thickest to thinnest, and why the tuner shows you those letters. Learn these six letters before you learn anything else about notes, because every single thing that follows is described in terms of them. When somebody says a riff is "on the low E", you now know exactly which piece of wire they mean.'
      },
      {
        heading: 'A mnemonic, and then throw it away',
        text:
          'Most people learn the six names with a sentence whose words start with the right letters — Eddie Ate Dynamite, Good Bye Eddie is one of the common ones, and you can make up a better one. Use it for about a week. Then stop using it, on purpose. A mnemonic is a set of stairs, not a room to live in: every time you have to run the sentence in your head to work out which string is D, you are adding half a second to something that needs to be instant. The goal is that you see the fourth string and think "D" the way you see the letter D and think "D". Test yourself by naming the strings out of order — name the B string, then the A, then the second E. If you can only do it by running the sentence forwards from the beginning, you are not there yet.'
      },
      {
        heading: 'The instrument you are holding is a Black American invention',
        text:
          'The electric guitar as a lead instrument — loud, amplified, playing the melody instead of quietly keeping time behind a singer — was not invented in a laboratory. It was invented on stage, mostly by Black American musicians, and the first great one was a woman. Sister Rosetta Tharpe was playing hard, distorted, single-note electric guitar lines in front of crowds in the 1930s and 1940s, years before the men usually given credit for rock and roll had recorded anything. NPR calls her the Godmother of Rock and Roll, and notes that she influenced a generation of musicians including Chuck Berry. Chuck Berry then built the rock guitar riff as we know it. Jimi Hendrix took the amplified guitar somewhere nobody had imagined it could go. Vernon Reid of Living Colour carried it into hard rock in the 1980s. That is a straight line, and you are standing on the end of it.'
      },
      {
        heading: 'Why that matters for what you are practising this week',
        text:
          'This is not a history detour bolted onto a guitar lesson. The riff you learn in step 4 of your skill ladder — one note at a time, low on the neck, repeating — is a Chuck Berry idea before it is anybody else’s. The power chord you learn in step 5 is what happens when that idea gets louder. When you learn Enter Sandman at the end of this quarter, you are playing a Metallica riff built out of a vocabulary that Black American musicians created. Knowing whose language you are speaking is part of learning to speak it. It also tells you where to go next: when the power chords start feeling easy, the blues is the room next door, and guitarists like Kirk Fletcher are teaching in it for free.'
      }
    ],
    check: {
      question: 'You are holding the guitar and looking down at it. Which string is closest to your face?',
      choices: [
        'The thinnest string, the high E',
        'The thickest string, the low E',
        'The middle string, D',
        'It depends on whether the guitar is electric or acoustic'
      ],
      answerIndex: 1,
      choiceFeedback: [
        'That one is furthest from your face — it is closest to the floor. The thin string sits at the bottom when you look down, which is also why it is drawn at the TOP of a tab.',
        'Right. Thickest and lowest-sounding, nearest your face, and it is the string most riffs start on.',
        'D is the fourth string, in the middle of the group — not at either edge. Go from the outside in: thickest first, thinnest last.',
        'It is the same on both. The six strings are in the same order and tuned to the same notes whether the guitar is plugged in or not.'
      ]
    },
    sources: [
      {
        label: 'Open String Note Names — JustinGuitar, Practical Music Theory',
        url: 'https://www.justinguitar.com/guitar-lessons/open-string-note-names-mt-0009'
      },
      {
        label: 'Forebears: Sister Rosetta Tharpe, The Godmother Of Rock ’N’ Roll — NPR',
        url: 'https://www.npr.org/2017/08/24/544226085/forebears-sister-rosetta-tharpe-the-godmother-of-rock-n-roll'
      }
    ]
  },

  {
    id: 'gt7-theory-note-names',
    number: 2,
    quarter: GUITAR_THEORY_QUARTER,
    sequenceInQuarter: 2,
    title: 'The Musical Alphabet, and what a fret actually does',
    readingMinutes: 5,
    teaching: [
      {
        heading: 'Seven letters, then it starts again',
        text:
          'The musical alphabet is A, B, C, D, E, F, G — and then back to A. That is the whole thing. There is no H. When you run off the end of G the next note is A again, higher up, and that repeat is called an octave. Every note you will ever play on a guitar is one of those seven letters, or one of the in-between notes that sit next to them. This is worth learning properly for one blunt reason: the guitar is the instrument where it is easiest to play for years without knowing what note you are playing. A piano shows you. A guitar hides it, because the same note appears in several places. Learning the alphabet is how you stop being a person who plays shapes and start being a person who plays music.'
      },
      {
        heading: 'A fret is one half step, every time',
        text:
          'Moving one fret towards the body of the guitar raises the note by the smallest distance in Western music: one half step, also called a semitone. Move one fret and the note goes up by a half step; move two frets and it goes up a whole step. That rule never changes anywhere on the neck, which is why the guitar is easier to understand than it looks. The in-between notes get the sharp and flat names: the note one fret above A is A sharp, written A#, and it is the same note as B flat, written Bb. Same fret, two names, depending on which direction you came from. So the full run of notes going up one fret at a time is A, A#, B, C, C#, D, D#, E, F, F#, G, G#, and then A again — twelve notes, and then everything repeats.'
      },
      {
        heading: 'The two places there is no in-between note',
        text:
          'Look at that list again and count the gaps. Between B and C there is nothing, and between E and F there is nothing. Those two pairs are already only one fret apart. Everywhere else there is a sharp sitting between the letters, but not there. This trips up nearly every beginner once, and then never again, so learn it now: there is no B sharp and no E sharp. You can prove it on your own guitar in ten seconds. Play the open B string, then play the first fret of the B string. That first fret is C. One fret, next letter, no in-between. This one fact is what makes the fretboard learnable — twelve frets and you are back where you started, an octave higher, which is why the twelfth fret has a double dot on it.'
      },
      {
        heading: 'Where this pays off for a rock guitarist',
        text:
          'You are about to learn power chords, and a power chord is named after one single note: the note under your first finger, on the thickest string of the shape. That is called the root. So the ONLY thing standing between "I know one power chord shape" and "I can play any power chord anybody names" is knowing the notes on the low E and A strings. That is twelve notes on each string, and you already know the pattern. Learn just the natural notes first — the letters with no sharps — on the low E string: open is E, third fret is G, fifth fret is A, seventh fret is B, eighth fret is C, tenth fret is D, twelfth fret is E again. Learn those seven positions and you can find any power chord on the neck without anybody telling you where it is.'
      }
    ],
    check: {
      question: 'You play the open B string, then the first fret of the B string. What note is that first fret?',
      choices: ['B sharp', 'C', 'B flat', 'A'],
      answerIndex: 1,
      choiceFeedback: [
        'There is no such note. B and C are the pair with no in-between note — that is exactly the exception this reading is about.',
        'Correct. B to C is already a half step, so one fret up from B lands straight on C with nothing between them.',
        'Flat means LOWER, and you moved up a fret. B flat is one fret below B, not above it.',
        'A is two frets below B. Moving up a fret raises the note; going to A would mean going down.'
      ]
    },
    sources: [
      {
        label: 'Open String Note Names — JustinGuitar, Practical Music Theory',
        url: 'https://www.justinguitar.com/guitar-lessons/open-string-note-names-mt-0009'
      }
    ]
  },

  {
    id: 'gt7-theory-reading-tab',
    number: 3,
    quarter: GUITAR_THEORY_QUARTER,
    sequenceInQuarter: 3,
    title: 'How to Read Tab',
    readingMinutes: 5,
    skillLink: 'gt7-skill-reading-tab',
    teaching: [
      {
        heading: 'Six lines, and they are upside down for a good reason',
        text:
          'Guitar tab is six horizontal lines, one for each string. The catch that confuses everybody on day one: the TOP line is the THINNEST string, the high E, and the BOTTOM line is the thickest, the low E. That feels backwards until you realise tab is drawn from your point of view. Sit with the guitar on your leg and look down at it — the thin string is nearest the floor, furthest from your eyes, and the thick string is nearest your face, at the top of what you can see. Tab is a picture of what you are looking at, not a picture of the guitar hanging on a wall. Once you have seen that once you never get it backwards again.'
      },
      {
        heading: 'The numbers are frets, not fingers',
        text:
          'A number on a line means press that string at that fret and play it. A 3 on the bottom line means press the third fret of the low E string. A 0 means play that string open, with no finger on it at all — zero is not "do nothing", it is "play it, but do not fret it", and beginners skip open strings constantly because the zero looks like a rest. Crucially, the number is the FRET, never the finger. Tab does not tell you which finger to use; that is your decision, and a good one to think about, because choosing the wrong finger is what makes the next note impossible to reach. Anything written to the left comes first, anything to the right comes later, and the horizontal distance roughly tracks time.'
      },
      {
        heading: 'Stacked numbers happen together',
        text:
          'When numbers sit directly on top of each other in a vertical column, they are played at the same moment. That is how a chord is written. A power chord in tab is two numbers stacked — one on the low E line, one on the A line, usually two frets higher. When numbers are spread out left to right one at a time, that is a riff or a melody, played one note after another. So you can tell at a glance what kind of thing you are looking at before you play a note: a wall of vertical stacks is chords, and a line of scattered single numbers is a riff. Everything you learn in your first quarter is one of those two shapes.'
      },
      {
        heading: 'What tab does not tell you, and why that matters',
        text:
          'Tab tells you WHERE. It does not tell you WHEN. Standard tab carries no reliable rhythm information at all — nothing about how long a note lasts, where the beat falls, or how fast it goes. That is why a riff you have read correctly from tab can still sound nothing like the record, and why the fix is never to read the tab harder. The fix is to listen to the song while you follow the tab, and to count. This is exactly why counting in 4/4 is its own theory item and its own skill on your ladder. Tab plus your ears is a complete instruction. Tab on its own is half of one, and it is the half that most self-taught players never notice is missing.'
      }
    ],
    check: {
      question: 'In a piece of guitar tab, what does the BOTTOM line represent?',
      choices: [
        'The thinnest string, high E',
        'The thickest string, low E',
        'The first fret',
        'The beat, so you know when to play'
      ],
      answerIndex: 1,
      choiceFeedback: [
        'That is the TOP line. Tab is drawn from your point of view looking down at the guitar, so the thin string — the one nearest the floor — is drawn at the top.',
        'Right. Thickest string at the bottom, and it is the line most riffs live on.',
        'Frets are the NUMBERS written on the lines, not the lines themselves. The six lines are the six strings.',
        'Tab carries no reliable rhythm information at all — that is the thing it does not tell you, and why you have to count and listen.'
      ]
    },
    sources: [
      {
        label: 'How To Read Guitar TAB — JustinGuitar, Grade 1 Module 4',
        url: 'https://www.justinguitar.com/guitar-lessons/how-to-read-guitar-tab-b1-405'
      }
    ]
  },

  {
    id: 'gt7-theory-counting-four-four',
    number: 4,
    quarter: GUITAR_THEORY_QUARTER,
    sequenceInQuarter: 4,
    title: 'Counting in 4/4',
    readingMinutes: 5,
    skillLink: 'gt7-skill-counting-four-four',
    teaching: [
      {
        heading: 'What the two numbers actually mean',
        text:
          'Almost every rock, pop and blues song you have ever heard is in 4/4 time. The top number tells you how many beats are in a bar: four. The bottom number tells you what kind of note gets one beat: a quarter note. So a bar of 4/4 is four steady beats, and then it starts again at one. That is it — the notation looks like a fraction and is not one. Because 4/4 is so common it is often just called common time and marked with a C. When you count a song in, you count 1-2-3-4 and start playing on the next 1, which is why every band in every film counts to four before they play. You are not counting down; you are showing everyone where the bar starts.'
      },
      {
        heading: 'The beat is a physical thing, so use your body',
        text:
          'Time is not something you think about, it is something you do, and the single most useful habit a beginner can build is tapping your foot on every beat. Not sometimes. Every beat, every time you pick up the guitar, until you stop noticing you are doing it. This feels stupid and it is the whole exercise. Your foot becomes an external clock that does not speed up when the music gets hard, and speeding up when the music gets hard is what nearly every self-taught guitarist does. Start with no guitar at all: put a song on and tap along for thirty seconds. Then count out loud, 1-2-3-4, while you tap. Only when both of those are boring should you add the guitar.'
      },
      {
        heading: 'Downstrokes, and why they come first',
        text:
          'A downstroke is your picking hand moving down across the strings, towards the floor. On a beat, in a rock song, that is what you play. Four downstrokes in a bar, one on each number, is the first strumming pattern anybody should learn, and a great deal of rock guitar never gets more complicated than that. Play it with one power chord and count out loud: DOWN two three four, DOWN two three four. The reason downstrokes come first is that they are physically consistent — your hand starts from the same place every time, so the sound is even. Upstrokes get added later, in the gaps between the numbers. Get the four solid first; a wobbly foundation with decorations on it is still wobbly.'
      },
      {
        heading: 'How to use a metronome without hating it',
        text:
          'A metronome clicks at a speed you set, measured in beats per minute. Set it slow — 60 is one click a second and is a perfectly respectable starting point, no matter what anyone says. Play your one chord, one downstroke per click, for a full minute without stopping. If you can do that with no stumble, move the speed up by five. Not by twenty. If you stumble twice, move it back down; there is no prize for the higher number, and practising a mistake fast just teaches your hands the mistake faster. The metronome is not there to make you play fast. It is there to tell you the truth about whether you are in time, which is a thing you genuinely cannot hear about yourself while you are playing.'
      }
    ],
    check: {
      question: 'In 4/4 time, what does the top number tell you?',
      choices: [
        'How fast to play, in beats per minute',
        'How many beats there are in one bar',
        'Which fret to start on',
        'How many strings to strum'
      ],
      answerIndex: 1,
      choiceFeedback: [
        'Speed is separate — that is what the metronome sets, in beats per minute. A song in 4/4 can be played at any tempo at all.',
        'Correct. Four beats to a bar, and then it starts again at one. The bottom 4 says a quarter note gets one of those beats.',
        'The time signature has nothing to do with where your fingers go. That is what tab is for.',
        'The number of strings you hit is up to you and the chord you are playing — a power chord is only two or three of them.'
      ]
    },
    sources: [
      {
        label: 'Tapping Your Foot — JustinGuitar, Grade 1 Module 2',
        url: 'https://www.justinguitar.com/guitar-lessons/tapping-your-foot-b1-203'
      },
      {
        label: 'JustinGuitar Metronome — free, in the browser',
        url: 'https://www.justinguitar.com/metronome'
      }
    ]
  }
];

export function getGuitarTheoryItem(id) {
  return guitarTheory.find((t) => t.id === id) || null;
}
