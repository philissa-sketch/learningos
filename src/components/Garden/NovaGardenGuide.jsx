import { NovaMessage } from '../Mentor/NovaMessage.jsx';
import { academyContent } from '../../content/academyContent.js';

const { getGardenBriefById = () => null } = academyContent().electives;

// ---------------------------------------------------------------------------
// NOVA IN THE GARDEN.
// (Built Aug 8, 2026. Mission tab made date-aware the same day, at the
// parent's question: "should that tab be a mission tab that gives new
// directions on the date needed and Nova states what needs to be done?")
//
// She was right, and the fix is smaller than it sounds because the data was
// already there. The garden calendar carries 51 dated entries through July
// 2027, 25 of them with a real brief, and every brief already has a `whyToday`
// field explaining why that job belongs to that date. Nova was ignoring all of
// it and saying something generic about Fridays.
//
// So the Mission guide now READS THE LIVE DAY: it names the date, the job, how
// long it takes, and why it is today rather than next week. An open day and a
// school holiday get their own honest lines instead of being dressed up as
// missions.
//
// TWO THINGS THE COPY WILL NOT DO. It will not reintroduce a grade — the screen
// promises the garden is recorded by what he did and carries no grade, and Nova
// must not quietly undo that. And it will not pretend plants are forgiving
// about time: the planting windows are real UGA Extension dates for North
// Georgia, and a missed one costs a year. Saying that plainly respects him more
// than softening it.
// ---------------------------------------------------------------------------

/** 'YYYY-MM-DD' -> 'Friday, August 14'. Built from parts: parsing a bare date
 *  string is treated as UTC and renders the previous day west of Greenwich. */
function longDate(dateStr) {
  if (!dateStr) return '';
  const [y, m, d] = String(dateStr).split('-').map(Number);
  if (!y || !m || !d) return '';
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * The Mission line, built from whatever day the screen is actually showing.
 *
 * `whyToday` is quoted rather than paraphrased. It is the most useful sentence
 * in the whole brief — the reason this job belongs to this date — and rewriting
 * it here would mean two versions of the same fact drifting apart.
 */
function missionGuide(day) {
  if (!day) {
    return {
      body: (
        <>
          No garden day is scheduled right now. The calendar runs Fridays through the school year, so
          the next one will appear here on its own — nothing to chase.
        </>
      ),
      speak:
        'No garden day is scheduled right now. The calendar runs Fridays through the school year, so the next one will appear here on its own. Nothing to chase.'
    };
  }

  const when = longDate(day.date);

  if (day.closed) {
    return {
      body: (
        <>
          <strong>{when}</strong> is closed — school holiday, not a session you missed. The plants still
          want water if it has been dry, but there is no brief and nothing owed.
        </>
      ),
      speak: `${when} is closed. School holiday, not a session you missed. The plants still want water if it has been dry, but there is no brief and nothing owed.`
    };
  }

  const brief = day.briefId ? getGardenBriefById(day.briefId) : null;

  if (!brief) {
    return {
      body: (
        <>
          <strong>{when}</strong> is an open garden day — no set brief. That is not a day off: walk the
          box, see what it needs, and do that. <strong>Deciding what the garden needs is the skill</strong>,
          and it is the part nobody can write down for you. Log whatever you do.
        </>
      ),
      speak: `${when} is an open garden day, with no set brief. That is not a day off. Walk the box, see what it needs, and do that. Deciding what the garden needs is the skill, and it is the part nobody can write down for you. Log whatever you do.`
    };
  }

  const mins = brief.estMinutes ? `About ${brief.estMinutes} minutes.` : '';

  return {
    body: (
      <>
        <strong>{when} — {brief.title}.</strong> {brief.whyToday} {mins} Work through the steps below and
        log it when you are done; this screen records what you did, it does not grade it.
      </>
    ),
    speak: `${when}. ${brief.title}. ${brief.whyToday} ${mins} Work through the steps below and log it when you are done. This screen records what you did, it does not grade it.`
  };
}

const GUIDES = {
  // The domains layer, in Nova's voice (added Aug 9, 2026 with the entry
  // type itself). The tone is deliberate: this tab is the one place the app
  // asks him to run a real project rather than complete a task, and the
  // guide has to say why the boring parts are the parts that matter.
  project: {
    body: (
      <>
        This is the form that holds a whole project — problem, sources, the one thing you changed, and
        the number before and after. <strong>The number is the part that makes it real.</strong> "The
        back buckets need more light" is a feeling. "The back buckets get 2.5 hours and the front get
        5" is something you can act on, and something you can prove you did. Change one thing at a
        time, or when the number moves you will not know which change moved it. Whether the plant
        lives is not the thing being looked at here — there is no grade on that. What counts is
        whether you asked a real question, found a source you can defend, changed one thing, and
        measured it again.
      </>
    ),
    speak:
      'This is the form that holds a whole project. Problem, sources, the one thing you changed, and the number before and after. The number is the part that makes it real. The back buckets need more light is a feeling. The back buckets get two and a half hours and the front get five is something you can act on, and something you can prove you did. Change one thing at a time, or when the number moves you will not know which change moved it. Whether the plant lives is not the thing being looked at here. There is no grade on that. What counts is whether you asked a real question, found a source you can defend, changed one thing, and measured it again.'
  },

  survey: {
    body: (
      <>
        Eight zones, two rows of four, about two feet square each. You are measuring how much sun each
        one actually gets — not guessing, measuring, on different days.{' '}
        <strong>That awning changes everything</strong>, and where the light lands moves through the
        season. This is the same order of work as any engineering job: collect the data first, then
        decide what goes where. Plant before you survey and you are just hoping.
      </>
    ),
    speak:
      'Eight zones, two rows of four, about two feet square each. You are measuring how much sun each one actually gets. Not guessing, measuring, on different days. That awning changes everything, and where the light lands moves through the season. This is the same order of work as any engineering job. Collect the data first, then decide what goes where. Plant before you survey, and you are just hoping.'
  },

  log: {
    body: (
      <>
        Write down what you did and what you noticed — watered, repotted, something wilting, something
        finally taking off. <strong>The notes are worth more than they look</strong>: next spring the
        only way to know what worked in that corner is that you wrote it down this year. Nobody
        remembers a growing season accurately. Engineers keep logs for exactly this reason, and so do
        flight crews.
      </>
    ),
    speak:
      'Write down what you did and what you noticed. Watered, repotted, something wilting, something finally taking off. The notes are worth more than they look. Next spring, the only way to know what worked in that corner is that you wrote it down this year. Nobody remembers a growing season accurately. Engineers keep logs for exactly this reason, and so do flight crews.'
  },

  builds: {
    body: (
      <>
        Five builds, and every one is an engineering problem wearing gardening clothes. You have 32
        square feet of floor and <strong>seven feet of air above it</strong> — going vertical is the
        whole game, and that is a structures problem: load, materials, what holds when it is wet.
        Irrigation is fluid systems. A sensor rig is robotics. This is the same closed-loop food
        problem a Mars crew has to solve, at a size you can actually build.
      </>
    ),
    speak:
      'Five builds, and every one is an engineering problem wearing gardening clothes. You have thirty two square feet of floor and seven feet of air above it. Going vertical is the whole game, and that is a structures problem. Load, materials, what holds when it is wet. Irrigation is fluid systems. A sensor rig is robotics. This is the same closed loop food problem a Mars crew has to solve, at a size you can actually build.'
  },

  season: {
    body: (
      <>
        These are real planting windows for North Georgia, not general advice — we plant about two
        weeks earlier in the fall than the middle of the state does.{' '}
        <strong>This is the one deadline in this whole app that does not move.</strong> Miss a window
        and you wait a year, because the weather is not negotiating with your schedule. Check what is
        coming up before you plan a Friday, not after.
      </>
    ),
    speak:
      'These are real planting windows for North Georgia, not general advice. We plant about two weeks earlier in the fall than the middle of the state does. This is the one deadline in this whole app that does not move. Miss a window and you wait a year, because the weather is not negotiating with your schedule. Check what is coming up before you plan a Friday, not after.'
  }
};

/**
 * Nova's explanation for one Gardening tab.
 *
 * `day` is only used by the mission tab; the others are stable explanations of
 * what a screen is for and have no reason to change week to week.
 */
export function NovaGardenGuide({ tab, day = null }) {
  const guide = tab === 'friday' ? missionGuide(day) : GUIDES[tab];
  if (!guide) return null;
  return (
    <div className="mb-4">
      <NovaMessage tone="brief" speak={guide.speak}>
        {guide.body}
      </NovaMessage>
    </div>
  );
}

export const NOVA_GARDEN_TAB_IDS = ['friday', ...Object.keys(GUIDES)];
