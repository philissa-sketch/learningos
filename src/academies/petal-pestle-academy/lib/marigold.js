// ---------------------------------------------------------------------------
// WHAT DR. MARIGOLD SAYS, AND WHEN.
//
// Pure functions of the app's state — no React, no randomness. She reads the
// same numbers the screens read and says the most useful true thing about them.
//
// ---- THE RULE SHE IS WRITTEN TO ----
//
// She never praises ability. Not "you're so smart", not "you're a natural".
// Ability praise makes a child protect the label by avoiding hard things, and
// avoiding hard things is precisely what would wreck a diagnostic. Everything
// below points at effort, method, or a specific next action.
//
// She also never tells the child her measured LEVEL. Those numbers are in the
// Grown-Up Corner for a reason: mid-assessment, a level is a verdict, and a
// child who can see the verdict starts playing the verdict instead of the
// questions. Marigold talks about what has been finished and what is next.
// ---------------------------------------------------------------------------

import { STRANDS, getStrand } from '../config/strands.js';
import { SITTING_LENGTH } from '../engine/diagnosticEngine.js';
import { getDailyLine } from '../data/mentor/marigoldLines.js';

export const MARIGOLD = {
  name: 'Dr. Marigold',
  title: 'Physician & Herbalist',
  intro:
    'I am Dr. Marigold. I look after people, and I grow the plants I learn from — the same way you are planning to.'
};

function localDateKey(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/**
 * Her line for the home screen.
 *
 * @param s  { progress, answered, streak, sittingAnswered, plan, petals, unlockedCount }
 * @returns  { text, tone } — tone is only used to pick the bubble colour
 */
export function greetingFor(s) {
  const { progress, answered, streak, name } = s;
  const who = name ? `${name}` : 'there';

  if (answered === 0) {
    return {
      tone: 'start',
      text: `Hello, ${who}. Before we teach you anything, we find out what you already know — that is the Check-In, and it is not a test you can fail. Start whenever you like.`
    };
  }
  if (progress.complete) {
    return {
      tone: 'done',
      text: `Every strand is measured, ${who}. Your plan is ready, and it names the exact place to start in each subject. That is a real piece of work finished.`
    };
  }
  if (streak >= 3) {
    return {
      tone: 'good',
      text: `${streak} days in a row. That is the part most people cannot do — the questions are the easy half. ${progress.strandCount - progress.settledCount} strands to go.`
    };
  }
  if (progress.settledCount === 0) {
    return {
      tone: 'good',
      text: `You are ${answered} questions in, ${who}. Keep going and the first strand will finish — that is when the plan starts filling itself in.`
    };
  }
  return {
    tone: 'good',
    text: `${progress.settledCount} of ${progress.strandCount} strands finished. ${progress.strandCount - progress.settledCount} left. About ${SITTING_LENGTH} questions is a good sitting.`
  };
}

/** Her line before a sitting starts. */
export function beforeSittingLine(s) {
  if (s.answered === 0) {
    return 'Some of these will feel too easy and some will feel too hard. Both of those mean it is working — it has to guess before it can know. If you are stuck, pick the one you think is most likely and move on.';
  }
  if (s.progress.settledCount >= s.progress.strandCount - 2) {
    return 'Nearly through. The last strands are usually the quickest, because it already has a good idea where you are.';
  }
  return 'Right where you left off. Everything you have answered is saved — you have not lost a single one.';
}

/** Her line on the results/garden screen. Never quotes a level. */
export function levelsLine(s) {
  const { progress } = s;
  if (progress.askedCount === 0) {
    return 'Nothing measured yet. Every flower here fills in as you answer — you will watch the garden appear.';
  }
  if (progress.complete) {
    return 'Every strand measured. The short stems are not bad news — they are where your time will do the most good, which is the whole reason we did this.';
  }
  return 'The pale ones simply have not come up yet. Nothing is missing; it just has not been asked about.';
}

/**
 * Her line on the plan screen — the one that actually tells her what to DO.
 * Names a real strand and a real Khan unit.
 */
export function planLine(plan) {
  if (!plan || plan.measuredCount === 0) {
    return 'No plan yet. Answer a handful of questions and it starts building itself — you do not have to finish the whole Check-In first.';
  }
  const first = plan.focus[0];
  if (!first) return 'Everything measured is on level. Pick whichever of these looks most interesting.';
  return `Start with ${first.strand.label}. Open ${first.khan?.courseLabel} on Khan Academy and go to ${first.khan?.unit}. One thing at a time is faster than three things at once — that is not a saying, it is just true.`;
}

/** Her line in the Market. This is where the effort-not-accuracy rule gets said
 *  out loud, because a child WILL work out how a game pays and she should hear
 *  the true version from the mentor rather than guess at a wrong one. */
export function marketLine(s) {
  const { petals, canAfford, unlockedCount } = s;
  if (unlockedCount === 0 && canAfford === 0) {
    return 'Nothing you can afford yet. It comes quickly — you earn for every question you answer, right or wrong. Being wrong pays exactly the same. That is on purpose.';
  }
  if (canAfford > 0) {
    return `You have ${petals} Petals and ${canAfford} thing${canAfford === 1 ? '' : 's'} you could take home today. Or save. Saving is allowed and it is usually the better trick.`;
  }
  return 'Nothing new in range this minute. Answer a few more and come back — everything on these shelves is reachable.';
}

/** Her line in the greenhouse. */
export function greenhouseLine(s) {
  const { ownedCount, totalCount } = s;
  if (ownedCount === 0) {
    return 'This is yours. It is empty for now — the dotted shapes show where things go and what they cost. Fill it in whatever order you like; there is no right one.';
  }
  if (ownedCount >= totalCount) {
    return 'Every last thing. I have worked in worse greenhouses than this, and I am not being kind.';
  }
  return `${ownedCount} of ${totalCount} in place. The dotted outlines are the gaps — you can see exactly what each one costs before you spend anything.`;
}

/** Her line in the Herb Library, with the safety rule attached every time. */
export function herbLine() {
  return 'Learn the whole plant, not the picture — leaf, stem, where it grows, what time of year. And never touch, pick or use one without a grown-up. Some plants have dangerous look-alikes, and that is exactly the sort of thing a real herbalist checks in person.';
}

/** The daily line, stable for the whole day. */
export function dailyLine(date = new Date()) {
  return getDailyLine(localDateKey(date));
}

/**
 * Which strand she would point at next, for the "what should I do" nudge.
 * Prefers an unsettled strand with the fewest questions asked, so her advice
 * matches what the engine will actually serve.
 */
export function nextStrandHint(strands) {
  const unsettled = STRANDS.map((st) => ({ st, state: strands[st.id] })).filter(
    (r) => r.state && !r.state.settled
  );
  if (unsettled.length === 0) return null;
  unsettled.sort((a, b) => a.state.asked - b.state.asked);
  const pick = unsettled[0];
  return {
    strand: getStrand(pick.st.id),
    asked: pick.state.asked
  };
}
