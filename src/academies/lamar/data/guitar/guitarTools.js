// ---------------------------------------------------------------------------
// Electric Guitar — every external link the subject uses, in ONE file.
//
// WHY THEY ARE ALL HERE: these are the links most likely to rot. Keeping them
// in one place means re-verifying this subject is opening one file and loading
// nine pages, not grepping four data files and a component tree.
//
// EVERY URL BELOW WAS OPENED AND READ ON 2026-08-08. Not pattern-matched, not
// inferred from a slug. One of them was already wrong when this was built: the
// design brief carried `get-your-guitar-in-tune-bc-109`, which redirects — the
// live canonical path is `how-to-tune-a-guitar-for-beginners-bc-109`, and that
// is what ships in guitarSkillLadder.js.
//
// THE HONEST LIMITATION, stated here because everything in this subject follows
// from it: THIS APP CANNOT HEAR HIM. It cannot tell whether the guitar is in
// tune, whether his timing drifts, or whether his fretting wrist is collapsing
// in a way that will hurt him in a year. No free software solves the last one.
// So the app owns curriculum, sequencing and discipline; JustinGuitar owns
// teaching; a browser tuner owns tuning; and a HUMAN owns technique correction,
// through recorded clips — see guitarRecording.md content in RecordingView.jsx.
//
// A PRACTICAL NOTE FOR ELECTRIC, and it belongs in front of him rather than in
// a comment: unplugged, an electric is quiet, and a laptop microphone may not
// hear it well enough to tune. Playing through a small amp and letting the mic
// hear the amp fixes it, as does a quiet room. This is said again in the
// tuning step of the ladder.
// ---------------------------------------------------------------------------

/** The date every URL in this file was last opened and confirmed. */
export const GUITAR_LINKS_VERIFIED_ON = '2026-08-08';

/**
 * Browser tools. These are BUTTONS on his screen, not names in a paragraph —
 * the same `toolUrl` / `toolLabel` pattern Tinkercad already uses in Technology
 * and Robotics. He works at a computer with this app open, so a web tool is one
 * click and a phone app is a chore.
 */
export const guitarTools = [
  {
    id: 'guitar-tool-tuner',
    toolLabel: 'Open the tuner',
    toolUrl: 'https://guitartuna.com/online-guitar-tuner',
    name: 'GuitarTuna online tuner',
    what: "Uses the browser's microphone to hear each string and tell you which way to turn the peg. Free, no download, no sign-up.",
    whenToUse: 'First. Every single session, before anything else.'
  },
  {
    id: 'guitar-tool-metronome',
    toolLabel: 'Open the metronome',
    toolUrl: 'https://www.justinguitar.com/metronome',
    name: 'JustinGuitar Metronome',
    what: 'A click at whatever speed you set it to. Free, in the browser.',
    whenToUse: 'Any time the skill is about timing — counting 4/4, downstrokes, or changing between two power chords without slowing down.'
  },
  {
    id: 'guitar-tool-justinguitar',
    toolLabel: 'Open the Beginner Course',
    // The COURSE page, not the homepage. A link to a site's front door is not a
    // link, it is a gesture at one — and it rots quietly into "somebody will
    // fix this later". This lands him on the course outline, Modules 0 through
    // 7, which is where he actually goes. Confirmed 2026-08-08: the
    // /categories/ path redirects here, so this is the canonical one.
    toolUrl: 'https://www.justinguitar.com/classes/beginner-guitar-course-grade-one',
    name: 'JustinGuitar — Beginner Guitar Course, Grade 1',
    what: 'The free, sequenced beginner course, Modules 0 to 7. Over 1,000 lessons on the site in total, funded by donations. The paid phone app is a separate product — the website is not.',
    whenToUse: 'The teaching layer for this whole subject. Every skill on the ladder points at a specific lesson inside it.'
  }
];

/**
 * Where a recorded clip goes for real human feedback.
 *
 * RECORDED, NEVER LIVE, and that is a safety decision before it is anything
 * else. A twelve-year-old on a one-to-one video call with an unvetted adult is
 * not a thing this app will help set up. A short clip posted publicly, by his
 * mother, from her account, is a different category entirely.
 *
 * It is also better feedback. A reviewer can pause, rewatch and slow down a
 * hand position; live, they get one look.
 */
export const guitarFeedbackPlaces = [
  {
    id: 'guitar-feedback-justinguitar-community',
    name: 'JustinGuitar Community — Community Recordings',
    url: 'https://community.justinguitar.com/c/community-recordings/213',
    // Quoted from the category's own description, read 2026-08-08.
    what: 'Its own description: "Share your recordings. Enjoy support, encouragement and feedback from the Community."',
    whyHere:
      'Start here. It is attached to the free course he is actually learning from, so the people answering know exactly what he is supposed to be able to do at this stage.',
    recommended: true
  },
  {
    id: 'guitar-feedback-reddit',
    name: 'r/guitarlessons on Reddit',
    // DELIBERATELY NO URL. Named in the design as a second option, and people
    // there do post "am I holding this right" clips constantly — but the page
    // could not be opened and confirmed on 2026-08-08, and this project does
    // not ship a link it has not read. A named place she can search for is
    // honest; a URL nobody checked is not.
    url: null,
    what: 'People post short "am I holding this right" clips there constantly.',
    whyHere: 'A bigger, faster room than the JustinGuitar forum, and the quality of the answers varies a lot more. Search for it rather than following a link from here.',
    recommended: false
  }
];

/**
 * BLACK AMERICAN GUITAR EDUCATORS — a standing rule of this project, and worth
 * saying plainly what was and was not found.
 *
 * FOUND, VERIFIED, AND SHIPPING: the two channels below. Both are real, both
 * are free, and both belong in front of him.
 *
 * NOT FOUND: a free, sequenced, BEGINNER-level guitar course by a Black
 * American educator that meets this project's verification bar. JustinGuitar is
 * the week-one teacher because his course is sequenced, complete, free and has
 * a community attached to it — not because a search was skipped. Kerry and Kirk
 * both teach above where Lamar is in Q1, so they are here as players he grows
 * toward and as the Q3-Q4 source, which is what they honestly are. If a
 * beginner-level course by a Black American educator turns up later, it belongs
 * in the ladder, not in this footnote.
 *
 * The deeper connection is NOT in this list — it is in guitarTheory.js, where
 * the lineage from Sister Rosetta Tharpe through Chuck Berry to Jimi Hendrix
 * and Vernon Reid is taught as what it is: the electric guitar vocabulary he is
 * learning in Q1 is Black American music. That is a fact with citations, not a
 * gesture.
 */
export const guitarEducators = [
  {
    id: 'guitar-educator-kerry-2-smooth',
    name: 'Kerry "2 Smooth" Marshall',
    url: 'https://www.youtube.com/@Kerry2Smooth',
    // Quoted from the channel's own description, read 2026-08-08.
    what: 'His channel, in his own words: "Free online R&B lessons in HD. Helping beginner, intermediate and advanced guitar players learn and master R&B music."',
    whyForHim:
      'R&B and gospel guitar — the chord vocabulary that makes an electric sound smooth rather than loud. Most of it is ahead of Q1, and some of it is not: he covers beginner ground too.'
  },
  {
    id: 'guitar-educator-kirk-fletcher',
    name: 'Kirk Fletcher',
    url: 'https://www.youtube.com/@kirkfletcher2845',
    what: 'A working blues guitarist who teaches — the Blues, playing the guitar, and musicianship.',
    whyForHim:
      'Blues is where the rock riff came from. When the power chords start sounding easy, this is the next room.'
  }
];

/** Look a tool up by id — used by the components so no URL is typed twice. */
export function getGuitarTool(id) {
  return guitarTools.find((t) => t.id === id) || null;
}
