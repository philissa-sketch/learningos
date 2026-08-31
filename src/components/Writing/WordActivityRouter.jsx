import { WordPracticeEngine } from './WordPracticeEngine.jsx';
import { TypedWordEngine } from './TypedWordEngine.jsx';
import { WordSearchGame } from './WordSearchGame.jsx';
import { WeeklyWordStudy } from './WeeklyWordStudy.jsx';
import { WeeklyQuizEngine } from './WeeklyQuizEngine.jsx';
import { activityFor } from '../../lib/weeklyWords.js';

/**
 * ONE DOOR FOR ALL TEN DAILY ACTIVITIES.
 *
 * Everything that opens word study passes a (skill, dayKey) and this decides
 * what to render. Routing lived in App.jsx before, when there were two shapes
 * to route between; with five activities per skill it would have meant a
 * ten-branch conditional in the app shell, and every future activity would
 * have needed editing there as well as here.
 *
 * The mapping is read from WORD_ACTIVITIES, so the schedule of which day holds
 * which activity is stated in exactly one place — lib/weeklyWords.js — and
 * this file cannot drift from it.
 */
export function WordActivityRouter({ skill, dayKey, onExit, onStartQuiz, onOpenActivity }) {
  const activity = activityFor(skill, dayKey);
  const type = activity ? activity.type : 'read';

  if (type === 'read') {
    return (
      <WeeklyWordStudy
        skill={skill}
        dayKey={dayKey}
        onStartQuiz={onStartQuiz}
        onOpenActivity={onOpenActivity}
        onExit={onExit}
      />
    );
  }
  if (type === 'wordsearch') {
    return <WordSearchGame skill={skill} dayKey={dayKey} onExit={onExit} />;
  }
  if (type === 'missing' || type === 'spell') {
    return <TypedWordEngine skill={skill} dayKey={dayKey} onExit={onExit} />;
  }
  // Vocabulary's Friday keeps WeeklyQuizEngine rather than being folded into
  // WordPracticeEngine. It is the graded one, it has been through the
  // reshuffle bug and out the other side, and scripts/verify-word-study.mjs
  // asserts against it by name. Rewriting a working graded path to save one
  // file is how a fixed bug comes back.
  if (type === 'test') {
    return <WeeklyQuizEngine skill={skill} onExit={onExit} />;
  }
  // choose | meaning | blank | recall — all multiple choice.
  return <WordPracticeEngine skill={skill} dayKey={dayKey} onExit={onExit} />;
}
