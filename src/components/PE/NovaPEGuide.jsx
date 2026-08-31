import { NovaMessage } from '../Mentor/NovaMessage.jsx';

// ---------------------------------------------------------------------------
// NOVA ON THE PE & NUTRITION SCREEN.
// (Built Aug 8, 2026.)
//
// THE FRAMING RULE HERE IS NOT A STYLE CHOICE. PEHome states it as a hard
// requirement: everything on this screen is about strength, energy and real
// habits — never appearance, never weight, never comparison. That rule matters
// more coming from Nova than from a heading, because a character's offhand
// remark lands harder than a label does, and this is a twelve-year-old reading
// about his own body.
//
// So these lines never mention how he looks, never frame food as something to
// limit, and never treat a number as a verdict. Where a tracker records body
// measurements, Nova says plainly that the numbers move slowly and unevenly and
// that this is normal — because the alternative is a boy deciding on his own
// what a flat week means.
//
// Rest is stated as part of training rather than a failure to train. A missed
// day is described as ordinary. Both are deliberate: the most likely way this
// screen does harm is by making consistency feel like a test he can fail.
//
// tone='brief' keeps him tap-to-hear, per the restraint rule in speech.js.
// ---------------------------------------------------------------------------

const GUIDES = {
  workout: {
    body: (
      <>
        Today&rsquo;s session is already picked for you — you do not have to plan anything. Work through
        it at a pace you can hold, and <strong>form beats speed every time</strong>; a clean set of five
        is worth more than a sloppy set of fifteen. Tap the button at the end to log it. If a day gets
        away from you, the next session is the one that counts.
      </>
    ),
    speak:
      'Today’s session is already picked for you, so you do not have to plan anything. Work through it at a pace you can hold. Form beats speed every time. A clean set of five is worth more than a sloppy set of fifteen. Tap the button at the end to log it. And if a day gets away from you, the next session is the one that counts.'
  },

  nutrition: {
    body: (
      <>
        This is the fuel side. Astronauts train hard, and none of it works without eating enough to
        build on — <strong>food here is something you add, not something you cut</strong>. Protein is
        what your body rebuilds muscle from, water keeps you working, and eating regularly is what
        makes a hard session possible the next day. Read one section at a time; you do not need all of
        it today.
      </>
    ),
    speak:
      'This is the fuel side. Astronauts train hard, and none of it works without eating enough to build on. Food here is something you add, not something you cut. Protein is what your body rebuilds muscle from, water keeps you working, and eating regularly is what makes a hard session possible the next day. Read one section at a time. You do not need all of it today.'
  },

  meals: {
    body: (
      <>
        Log what you actually ate — <strong>this is a record, not a report card</strong>, and nobody is
        marking it. Pick the meal type, write it in, and add the protein if you know it. The daily total
        and the seven-day view are there so you can spot patterns, like whether breakfast is quietly
        getting skipped. Patterns are the useful part; a single day tells you almost nothing.
      </>
    ),
    speak:
      'Log what you actually ate. This is a record, not a report card, and nobody is marking it. Pick the meal type, write it in, and add the protein if you know it. The daily total and the seven day view are there so you can spot patterns, like whether breakfast is quietly getting skipped. Patterns are the useful part. A single day tells you almost nothing.'
  },

  trackers: {
    body: (
      <>
        Water, protein, sleep, activity and mood — tap through them as your day goes. <strong>Sleep is
        not the boring one</strong>: your body does its actual rebuilding while you are asleep, so a
        good night counts as much as a good session. The growth check-in is just a measurement written
        down over time. Those numbers move slowly and unevenly, and a flat week means nothing on its
        own — that is how bodies work, not a sign you did something wrong.
      </>
    ),
    speak:
      'Water, protein, sleep, activity and mood. Tap through them as your day goes. Sleep is not the boring one. Your body does its actual rebuilding while you are asleep, so a good night counts as much as a good session. The growth check in is just a measurement written down over time. Those numbers move slowly and unevenly, and a flat week means nothing on its own. That is how bodies work, not a sign you did something wrong.'
  },

  goals: {
    body: (
      <>
        One target for the week. Pick something you are fairly sure you can hit — <strong>a goal you
        reach four weeks running builds more than one you miss twice and abandon</strong>. Make it
        something you control, like the number of sessions you log or nights you get to bed on time,
        rather than something you can only hope for. You can change it whenever you want.
      </>
    ),
    speak:
      'One target for the week. Pick something you are fairly sure you can hit. A goal you reach four weeks running builds more than one you miss twice and abandon. Make it something you control, like the number of sessions you log, or nights you get to bed on time, rather than something you can only hope for. And you can change it whenever you want.'
  }
};

/** Nova's explanation for one PE tab. Renders nothing for an unknown tab. */
export function NovaPEGuide({ tab }) {
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

export const NOVA_PE_TAB_IDS = Object.keys(GUIDES);
