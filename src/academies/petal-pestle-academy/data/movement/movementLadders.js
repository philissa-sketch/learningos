// ---------------------------------------------------------------------------
// SINGING & YOGA — THE TWO LADDERS, AND SHE ASKED FOR THEM HERSELF.
//
// Azianna, Aug 19 2026, via Gigi: she wants the singing and yoga course added.
// Queued as item 7b in the master plan since v3.2 and specified in §9:
// "two ladders of 6–8 verified videos. Participation, not a grade."
//
// ---- THE BLOCK EXISTED AND LED NOWHERE ----
//
// `blk-doing` — "Singing & Movement", 15:40, fifteen minutes — has been on her
// schedule since v3.2 with the note "Singing most days, yoga most days. Not
// graded, not optional." It was a TICK-BOX WITH NOTHING BEHIND IT. She could
// mark it done and there was no door to open. That is the fifth thing in this
// app to be correct and unreachable.
//
// ---- BOTH CHANNELS ARE GIGI'S OWN PICKS, NOT SEARCH RESULTS ----
//
// Verified Aug 14 2026 in claude/petal-pestle-video-sources.md and unchanged:
//
//   Cheryl Porter — a BLACK AMERICAN vocal coach, born in Detroit, based in
//   Italy, covered by Essence and PRX's The World. She meets the standing
//   requirement for Black American educators, and she was NAMED by Gigi rather
//   than found by a search.
//
//   Yoga Guppy — run by Rashmi, built for children from the ground up: asana
//   practice, breathing, yoga stories. Listed by Yoga Journal among kids' yoga
//   channels.
//
// ---- HOW EACH VIDEO WAS VERIFIED, Aug 19 ----
//
//   1. oEmbed at youtube.com/oembed?url=...&format=json — never noembed.com.
//      Title recorded CHARACTER FOR CHARACTER as YouTube returns it, below.
//   2. Length read off the page, never estimated.
//   3. ⭐ AND PLAYED INSIDE THE APP'S OWN ORIGIN, in a youtube-nocookie iframe
//      at localhost:5180 — because "a video that verifies at oEmbed and then
//      will not play is worse than one that never verified. Four have done it."
//      Embedding can be disabled on a video that plays perfectly on YouTube,
//      and only the iframe test catches that.
//
// ⚠️ AND THE EMBED TEST NEARLY THREW OUT ALL SIX YOGA VIDEOS. Loading
// youtube-nocookie.com/embed/<id> as a TOP-LEVEL PAGE returns "Error 153 —
// Video player configuration error" for videos that embed perfectly well; the
// player expects a framing page and a referrer. Rejecting a good video is the
// mirror of accepting a bad one, so the test was redone the way the app
// actually does it — an iframe on her own origin — and all twelve rendered.
//
// ---- WHY THESE ARE EMBEDDED AND NOT LINKED ----
//
// The Play tab links out. This does NOT. Every lesson video in this app is an
// iframe on youtube-nocookie with rel=0, and a link to youtube.com/watch drops
// a nine-year-old into YouTube proper — sidebar recommendations, autoplay,
// comments. Opening the watch pages during this verification put a pre-roll ad
// in front of every single one.
//
// ---- NEVER GRADED. THAT IS THE WHOLE POINT. ----
//
// §9: "Participation, not a grade." Nothing here writes an itemEvent, moves a
// review box, or reaches the Gradebook. She ticks the block if she did it.
// ---------------------------------------------------------------------------

/** Both channels, kept whole so a grown-up can always go to the source. */
export const MOVEMENT_CHANNELS = {
  singing: {
    label: 'Cheryl Porter Vocal Coach',
    url: 'https://www.youtube.com/@CherylPorterVocalCoach',
    canonical: 'https://www.youtube.com/channel/UCiuFR-m7cy1GW-JMMYBd1TQ',
    who:
      'Black American vocal coach, born in Detroit, based in Italy. Named by Gigi, ' +
      'not found in a search.',
    // §9 and the Aug 14 source note both say this plainly, and it is the reason
    // the rungs below are specific videos rather than "here is the channel".
    caution:
      'This channel is built for ADULT and pop singers. Most of its recent output is ' +
      'reaction and collaboration videos with famous performers. A nine-year-old handed the ' +
      'open channel ends up somewhere nobody chose, so only these rungs are offered to her — ' +
      'the channel link is here for Gigi.'
  },
  yoga: {
    label: 'Yoga Guppy',
    url: 'https://www.youtube.com/@yogaguppy',
    canonical: 'https://www.youtube.com/channel/UC02UfeIO6g1BrAC0nHgRGRw',
    who: 'Run by Rashmi. Kids’ yoga — asana practice, breathing, mindfulness, yoga stories.',
    caution: null
  }
};

/**
 * SINGING — six rungs, shortest first.
 *
 * Two of these are under half a minute. That is deliberate: a single exercise
 * she can actually finish beats a ten-minute routine she abandons in week two,
 * which is the same argument that set the warm-up at three questions.
 */
export const SINGING_LADDER = [
  {
    rung: 1,
    videoId: 'qwjD-KvdjAs',
    title: 'Easy Vocal Warmup for SINGERS w/Vocal Coach Cheryl Porter',
    seconds: 24,
    why: 'One exercise, twenty-four seconds. The whole point of rung one is that she finishes it.',
    verifiedOn: '2026-08-19'
  },
  {
    rung: 2,
    videoId: 'EpoOInahj3I',
    title: "Fun VIRAL Singer's Vocal Warmup Exercise w/Vocal Coach",
    seconds: 20,
    why: 'The one everybody has seen. Silly on purpose, and it is still a real warm-up.',
    verifiedOn: '2026-08-19'
  },
  {
    rung: 3,
    videoId: 'AMflexH42G0',
    title: 'High Notes Vocal Exercise w/Vocal Coach',
    seconds: 56,
    why: 'Reaching up, without straining. Under a minute.',
    verifiedOn: '2026-08-19'
  },
  {
    rung: 4,
    videoId: 'c-qin9xvSNY',
    title: 'Vocal Exercise for SOPRANOS w/ Cheryl Porter Vocal Coach!!',
    seconds: 56,
    why: 'A child’s voice sits in the soprano range, so this one is written for where she already is.',
    verifiedOn: '2026-08-19'
  },
  {
    rung: 5,
    videoId: 'Kyo6UJMwXpY',
    title: 'DUET The ARTICULATION SONG w/ Vocal Coach!!',
    seconds: 153,
    why: 'Consonants and diction, as a duet — so it is something to do WITH somebody rather than at.',
    verifiedOn: '2026-08-19'
  },
  {
    rung: 6,
    videoId: '9dVW9E40-Gw',
    title: "Cheryl Porter's 10 Minute Daily VOCAL WORKOUT (For Singing All Levels!)",
    seconds: 659,
    why: 'The full routine, and the top of the ladder. Eleven minutes fits the fifteen-minute block.',
    verifiedOn: '2026-08-19'
  }
];

/**
 * YOGA — six rungs: find your feet, then strength, then focus, then wind down.
 */
export const YOGA_LADDER = [
  {
    rung: 1,
    videoId: 'bXFoEmJDwI8',
    title: 'Kids Yoga for Beginners I Easy Yoga Poses for Flexibility & Strength I Yoga Guppy',
    seconds: 279,
    why: 'The starting point, and the one already verified on Aug 14. Basic poses, nothing held long.',
    verifiedOn: '2026-08-19'
  },
  {
    rung: 2,
    videoId: 'AHNBhkoL_Bw',
    title: 'Fun Yoga Poses for Kids to Improve Flexibility & Strength | Artistic Yoga | Yoga Guppy',
    seconds: 292,
    why: 'The same ground as rung one with more asked of her.',
    verifiedOn: '2026-08-19'
  },
  {
    rung: 3,
    videoId: 'oBkVMpVKN0I',
    title:
      'Brain Gym Yoga | Memory Game with for Kids | Improve Concentration | Yoga for Children | Yoga Guppy',
    seconds: 257,
    why: 'Movement and remembering at once. It sits at 15:40, after a full school day, on purpose.',
    verifiedOn: '2026-08-19'
  },
  {
    rung: 4,
    videoId: 'BUsIvUJbkds',
    title:
      'Fun Partner Yoga Poses for Kids | Improve Balance & Confidence | Yoga with Friends | Yoga Guppy',
    seconds: 326,
    why: 'Needs a second person — which makes this the one Gigi can do with her.',
    verifiedOn: '2026-08-19'
  },
  {
    rung: 5,
    videoId: '7TwfqOf-mZY',
    title: 'Fruit Ninja | Brain Break for Kids | Yoga Fun with Rainbow Healthy Foods | Yoga Guppy',
    seconds: 501,
    why: 'The longest and the most active. A brain break rather than a practice.',
    verifiedOn: '2026-08-19',
    // ⚠️ NOT WATCHED END TO END. See NEEDS_GIGI below.
    previewFirst: true
  },
  {
    rung: 6,
    videoId: '2jEC8sbWLXk',
    title: 'Yoga for Better Sleep for Children | Yoga Poses for Kids | Yoga Guppy',
    seconds: 339,
    why: 'The wind-down, and the last block of her school day ends here.',
    verifiedOn: '2026-08-19'
  }
];

/**
 * THE SAFETY LINE, AND IT IS SHORT ON PURPOSE.
 *
 * The Human Body course's standing fence applies here unchanged — NO weight, NO
 * body composition, NO appearance, and nothing that teaches her to judge her own
 * body. A kids' yoga channel about flexibility, breathing and posture sits
 * inside that with nothing to strip out, which is exactly why Gigi picked it.
 *
 * What yoga adds that a video lesson does not is a body that can be pushed too
 * far. So one sentence, in her words, and no lecture: a warning nobody reads is
 * not a warning.
 */
export const MOVEMENT_SAFETY =
  'If a pose hurts, stop and come out of it. Yoga is never meant to hurt — going only as ' +
  'far as YOUR body goes today is the whole skill, and it is different every day.';

/**
 * ⚠️ ONE THING FOR GIGI TO WATCH BEFORE SHE DOES.
 *
 * Handled the same way as the 3/5 Compromise video in Social Studies, which is
 * flagged for her to watch rather than quietly shipped.
 */
export const NEEDS_GIGI = [
  {
    videoId: '7TwfqOf-mZY',
    title: 'Fruit Ninja | Brain Break for Kids | Yoga Fun with Rainbow Healthy Foods | Yoga Guppy',
    why:
      'IT IS ABOUT FOOD, AND IT HAS NOT BEEN WATCHED END TO END. The Human Body fence set in ' +
      'Q3 says: "Food: nothing about calories, amounts, good and bad foods, or weight." A video ' +
      'built around "healthy foods" could stay well inside that or could sort foods into good ' +
      'and bad in a sentence. It is verified, it plays, and it is the one rung that has not ' +
      'been judged against the fence. Watch it, then keep it or say the word and it comes out.'
  }
];

/** Both ladders, for anything that needs to walk all of it. */
export const ALL_MOVEMENT_VIDEOS = [...SINGING_LADDER, ...YOGA_LADDER];

/** mm:ss, derived — never typed beside the number it describes. */
export function clockOf(seconds) {
  const m = Math.floor(seconds / 60);
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
}
