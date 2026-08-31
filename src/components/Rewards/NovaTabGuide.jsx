import { NovaMessage } from '../Mentor/NovaMessage.jsx';

// ---------------------------------------------------------------------------
// NOVA EXPLAINS EACH TAB.
// (Part 10, built Aug 8, 2026.)
//
// Ten tabs arrived in one day. Every one of them is obvious to whoever built
// it and to nobody else, and a twelve-year-old will not read a manual — but he
// will listen to Nova for fifteen seconds.
//
// ---- REWRITTEN FOR FOUR TABS (Aug 25, 2026) ----
//
// It grew to eleven guides, and the parent said what that meant: "I don't like
// the reward section. It is overwhelming. There are 11 tabs."
//
// Worth noticing that Nova's own words gave the duplication away before anyone
// went looking. The `journey` guide described eight stops you advance through
// and never go backwards from; the `missions` guide described eight ranks you
// advance through and unlock in order. Two guides for one idea, because there
// were two tabs for one array.
//
// The four below keep every line that was carrying weight — the two-currency
// rule, "look for the darkest part on the hull", "press Claim yourself", "the
// part a college actually reads" — and drop the ones that only existed to
// explain why a tab existed.
//
// TONE IS 'brief' ON PURPOSE. That tone is deliberately NOT in speech.js's
// AUTO_SPEAK_TONES, so Nova does not start talking every time a tab is tapped.
// He explains when asked, via the speaker button already built into
// NovaMessage. A voice that fires on every navigation becomes noise inside a
// week, gets muted, and never gets switched back on — the restraint rule in
// speech.js says this outright, and a guide that ignored it would be the exact
// feature most likely to lose him the voice entirely.
//
// EACH GUIDE ANSWERS THREE THINGS: what this tab is, how it actually works, and
// what he can do about it. The third one matters most — a screen that explains
// itself without giving him a move is a manual, not a companion.
//
// `speak` carries a smoother spoken version where the written line leans on
// layout (dashes, brackets, percentages) that sounds wrong read aloud.
// ---------------------------------------------------------------------------

const GUIDES = {
  shop: {
    body: (
      <>
        This is the <strong>Coins</strong> half, and Coins are yours — anything here unlocks the
        second you can afford it, no asking. Themes repaint the whole app, avatars change who you
        are, and the supply shelves kit out your room, your suit and your ship. One thing worth
        knowing: <strong>the crate is not a gamble</strong>. It only ever offers something worth at
        least what it costs, and never something you already own. At the bottom is where your coins
        went — read that before a big buy.
      </>
    ),
    speak:
      'This is the Coins half, and Coins are yours. Anything here unlocks the second you can afford it, no asking. Themes repaint the whole app, avatars change who you are, and the supply shelves kit out your room, your suit and your ship. One thing worth knowing: the crate is not a gamble. It only ever offers something worth at least what it costs, and never something you already own. At the bottom is where your coins went. Read that before a big buy.'
  },

  mine: {
    body: (
      <>
        Everything you own, and nothing you do not. Your cadet is wearing what you have equipped —
        tap any piece of gear to put it on, tap it again to take it off. The dashed shapes in your
        room are the pieces still in the shop, with their prices under them, so you can see what the
        place will look like finished. And every spacecraft part you have bought is bolted onto the
        ship at the bottom. <strong>That ship gets built by your subjects</strong>: look for the
        darkest part on the hull — that is the one your work is waiting on.
      </>
    ),
    speak:
      'Everything you own, and nothing you do not. Your cadet is wearing what you have equipped. Tap any piece of gear to put it on, tap it again to take it off. The dashed shapes in your room are the pieces still in the shop, with their prices under them, so you can see what the place will look like finished. And every spacecraft part you have bought is bolted onto the ship at the bottom. That ship gets built by your subjects. Look for the darkest part on the hull. That is the one your work is waiting on.'
  },

  progress: {
    body: (
      <>
        The top two cards are the only things on this screen you can act on today — the{' '}
        <strong>weekly challenge</strong> and the <strong>quarter operation</strong>. Both pay, and
        you have to press Claim yourself; I am not going to do it for you. Below them is the record:
        the route out to Deep Space, your badges, and the readiness skills. Badges calculate
        themselves from real work — pick the nearest one, it is usually one good afternoon away.
        Readiness is different: <strong>your mom awards those</strong>, and they are the part a
        college actually reads. Any badge with a certificate has a Print button on it.
      </>
    ),
    speak:
      'The top two cards are the only things on this screen you can act on today: the weekly challenge and the quarter operation. Both pay, and you have to press Claim yourself. I am not going to do it for you. Below them is the record. The route out to Deep Space, your badges, and the readiness skills. Badges calculate themselves from real work, so pick the nearest one. It is usually one good afternoon away. Readiness is different. Your mom awards those, and they are the part a college actually reads. Any badge with a certificate has a Print button on it.'
  },

  rewards: {
    body: (
      <>
        This is the <strong>Credits</strong> half, and Credits are the slow money — they buy real
        things, out in the world, and most of them need your mom to say yes. That is the whole rule:
        Coins are yours and unlock instantly; Credits buy things that cost somebody something. The
        dream goal at the bottom is a savings account for the big one, and{' '}
        <strong>she matches a quarter of everything you put in</strong>. Saving beats spending here,
        which is the opposite of the Shop, and that is on purpose.
      </>
    ),
    speak:
      'This is the Credits half, and Credits are the slow money. They buy real things, out in the world, and most of them need your mom to say yes. That is the whole rule. Coins are yours and unlock instantly. Credits buy things that cost somebody something. The dream goal at the bottom is a savings account for the big one, and she matches a quarter of everything you put in. Saving beats spending here, which is the opposite of the Shop, and that is on purpose.'
  }
};

/** Nova's explanation for one Rewards tab. Renders nothing for an unknown tab. */
export function NovaTabGuide({ tab }) {
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

export const NOVA_TAB_IDS = Object.keys(GUIDES);
