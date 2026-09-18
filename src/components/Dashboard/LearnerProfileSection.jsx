import { useAppStore } from '../../store/useAppStore.js';
import { ProfileQuestions } from '../Academy/ProfileQuestions.jsx';

/**
 * The setup questions, in the parent area. (Sept 18, 2026, audit finding 5.)
 *
 * The questions themselves and the rules about them are the platform's
 * (src/components/Academy/ProfileQuestions.jsx, src/lib/learnerProfile.js).
 * This file is only where they are reachable from: the parent area is the one
 * screen that exists for every school whatever state it is in, and a family
 * whose Academy is already running would otherwise have no way to answer them
 * at all — the front door's setup screen is only ever shown to an Academy with
 * no records in it.
 *
 * The save goes straight through to the store, which refuses out loud rather
 * than silently, and the screen prints whatever it says back.
 */
export function LearnerProfileSection() {
  const profile = useAppStore((s) => s.learnerProfile);
  const saveProfileSection = useAppStore((s) => s.saveProfileSection);

  return (
    <ProfileQuestions
      profile={profile}
      onSave={saveProfileSection}
      heading="About this learner"
    />
  );
}
