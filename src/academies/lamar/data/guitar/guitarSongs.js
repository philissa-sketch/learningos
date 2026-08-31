// ---------------------------------------------------------------------------
// Electric Guitar — the song list.
//
// -- HE PICKS SOME OF THESE, AND THAT IS THE DESIGN --------------------------
// Adherence follows autonomy. A list somebody else chose is homework, and
// homework is the thing he is already not doing with this guitar. So this file
// ships THREE songs that the Q1 skill ladder genuinely reaches, and then it
// stops and leaves GUITAR_OWN_SLOTS empty slots he fills himself. His picks are
// not stored here — they are rows in the guitar log (kind 'song-picked'), so
// they survive, travel in the handoff export, and appear on his record.
//
// -- WHY THE LIST IS SHORT ---------------------------------------------------
// Three is not a placeholder for twenty. Every song below is one he can
// actually play with the eight skills on the Q1 ladder and nothing else, and
// each one names the skill it needs. A song list padded with things he cannot
// play yet is a list of ways to feel bad.
//
// EVERY URL BELOW WAS OPENED AND READ ON 2026-08-08.
// ---------------------------------------------------------------------------

/** How many slots he fills himself. Three: enough to matter, few enough to finish. */
export const GUITAR_OWN_SLOTS = 3;

export const guitarStarterSongs = [
  {
    id: 'gt7-song-peter-gunn',
    title: 'Peter Gunn Theme',
    artist: 'Henry Mancini',
    needsSkill: 4,
    needsSkillLabel: 'A riff on one string',
    why: 'One note at a time, low on the neck, and it sounds like the record almost immediately. This is the first thing that will make somebody in the next room say "was that you?"',
    lesson: {
      label: 'Peter Gunn Theme — JustinGuitar',
      url: 'https://www.justinguitar.com/guitar-lessons/peter-gunn-theme-b1-207'
    }
  },
  {
    id: 'gt7-song-enter-sandman',
    title: 'Enter Sandman',
    artist: 'Metallica',
    needsSkill: 8,
    needsSkillLabel: 'One full riff, start to finish',
    why: 'The end-of-quarter target. Everything on the ladder is in it — single notes, power chords, changing between them, and counting. If you can play this, you can play.',
    lesson: {
      label: 'Enter Sandman — JustinGuitar',
      url: 'https://www.justinguitar.com/guitar-lessons/enter-sandman-bg-1205'
    }
  },
  {
    id: 'gt7-song-power-chord-workout',
    title: 'Two power chords, back and forth',
    artist: 'You',
    needsSkill: 6,
    needsSkillLabel: 'Changing between two, in time',
    why: 'Not a song anybody wrote — pick any two power chords and swap between them against a click. Half the rock songs ever recorded are two chords doing exactly this, so when you can do it cleanly, go and find one of them.',
    lesson: {
      label: 'JustinGuitar Metronome — set it to 60 and start there',
      url: 'https://www.justinguitar.com/metronome'
    }
  }
];

/**
 * What he is told when he picks his own. Deliberately in front of him rather
 * than in a comment — the point of the slots is that he chooses, and the only
 * useful guidance is how to choose something he will not abandon.
 */
export const guitarOwnSongGuidance = [
  'Pick something you actually want to play. Not something that looks easy — something you would be pleased to be able to play.',
  'Search for the song plus the words "guitar tab" or check whether JustinGuitar has a lesson for it.',
  'If the whole thing is too hard, that is fine. Learn the RIFF. Almost every song you love has one part that is the reason you love it — learn that part.',
  'Three slots. Do not fill all three on the same day; add one when you finish one.'
];

/**
 * A quarter ends with him playing one song for his mother.
 *
 * Deadlines create practice in a way that streak counters do not. A streak
 * rewards showing up; a date on the calendar with a person on the other side of
 * it rewards being ready. Both are in this subject on purpose.
 */
export const guitarPerformanceMoment = {
  id: 'gt7-performance-q1',
  quarter: 'Q1 2026-2027',
  what: 'One song, played start to finish, for your mother.',
  why: 'Not a test and not graded. It is a date on the calendar, and a date is the thing that makes anybody practise the boring part.',
  howToPrepare: [
    'Choose the song two weeks out, not the night before.',
    'Play it standing up at least once. It is different standing up.',
    'Play it all the way through even when you make a mistake — stopping and restarting is a habit, and it is the wrong one.',
    'Record it. That recording plus the one from the first week of the quarter is the whole story of this quarter, side by side.'
  ]
};
