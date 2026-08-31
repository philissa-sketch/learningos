import { NovaMessage } from '../Mentor/NovaMessage.jsx';

// ---------------------------------------------------------------------------
// NOVA ON THE GUITAR SCREEN.
// (Built Aug 9, 2026.)
//
// This screen was built against a stated problem: the boy is not
// self-disciplined with this guitar, and that is the entire reason the subject
// exists. Every design choice on it follows from that — fifteen minutes and not
// forty-five, ONE skill on the card instead of eight, tune-first as a button
// rather than a sentence, and a streak that refuses to show a zero on a morning
// he simply has not practised yet.
//
// So Nova's job here is narrower than on other screens: **reinforce those
// choices, never undercut them.** The failure mode is obvious and tempting —
// praise the streak, encourage a longer session, treat the theory reading as a
// quiz. Each of those would quietly reverse a decision the screen made on
// purpose, and the screen is right.
//
// Three things the copy therefore refuses to do:
//   - It never pushes for MORE time. Fifteen minutes he actually does beats
//     forty-five he admires and skips.
//   - It never treats theory as a test. One question, recorded as
//     participation, no grade — saying otherwise turns the one relaxed tab
//     into school.
//   - It never implies the app can judge his playing. It cannot hear him, that
//     is deliberate, and pretending otherwise would be a lie he could catch.
// ---------------------------------------------------------------------------

const GUIDES = {
  practice: {
    body: (
      <>
        Fifteen minutes, one skill, same time every day. <strong>Tune first</strong> — an out-of-tune
        guitar is the fastest way for a beginner to decide he is bad at this, and he is usually wrong.
        The card only ever shows you one thing to work on, because deciding what to practise is where
        the fifteen minutes normally go. Do not stretch it to an hour; fifteen you actually do beats an
        hour you meant to.
      </>
    ),
    speak:
      'Fifteen minutes, one skill, same time every day. Tune first. An out of tune guitar is the fastest way for a beginner to decide he is bad at this, and he is usually wrong. The card only ever shows you one thing to work on, because deciding what to practise is where the fifteen minutes normally go. And do not stretch it to an hour. Fifteen you actually do beats an hour you meant to.'
  },

  theory: {
    body: (
      <>
        Short reading, one question at the end. <strong>This is not a test and there is no grade</strong> —
        it is recorded as participation, same as everything else here. The point is that the practice
        stops being mystery: once you know why a chord is built the way it is, your fingers stop
        memorising shapes and start understanding them. Read one, answer the question, go play.
      </>
    ),
    speak:
      'Short reading, one question at the end. This is not a test and there is no grade. It is recorded as participation, same as everything else here. The point is that the practice stops being a mystery. Once you know why a chord is built the way it is, your fingers stop memorising shapes and start understanding them. Read one, answer the question, go play.'
  },

  songs: {
    body: (
      <>
        Three songs come with the track. <strong>Three slots are yours</strong> — put in whatever you
        actually want to play, not what sounds impressive. That is the part that keeps you picking the
        guitar up, and nobody else can choose it for you. A song slightly too hard that you love beats
        an easy one you do not care about, as long as you are willing to be bad at it for a couple of
        weeks first.
      </>
    ),
    speak:
      'Three songs come with the track. Three slots are yours. Put in whatever you actually want to play, not what sounds impressive. That is the part that keeps you picking the guitar up, and nobody else can choose it for you. A song slightly too hard that you love beats an easy one you do not care about, as long as you are willing to be bad at it for a couple of weeks first.'
  },

  recording: {
    body: (
      <>
        Record it, then listen back. <strong>This app cannot hear you</strong> — nothing here is
        judging your playing, and that is on purpose. Recording is for <em>you</em>: playing takes all
        your attention, so you miss things while you are doing it that are obvious ten seconds later on
        playback. It is also the only honest way to notice you have improved, because you will not feel
        it happening day to day. Read the note above the button before your first one.
      </>
    ),
    speak:
      'Record it, then listen back. This app cannot hear you. Nothing here is judging your playing, and that is on purpose. Recording is for you. Playing takes all your attention, so you miss things while you are doing it that are obvious ten seconds later on playback. It is also the only honest way to notice you have improved, because you will not feel it happening day to day. Read the note above the button before your first one.'
  }
};

/** Nova's explanation for one Guitar tab. Renders nothing for an unknown tab. */
export function NovaGuitarGuide({ tab }) {
  const guide = GUIDES[tab];
  if (!guide) return null;
  return (
    <div className="mb-4">
      <NovaMessage tone="brief" speak={guide.speak}>
        {guide.body}
      </NovaMessage>
    </div>
  );
}

export const NOVA_GUITAR_TAB_IDS = Object.keys(GUIDES);
