// ---------------------------------------------------------------------------
// Typing Lessons — the actual "learn how to type" curriculum. Distinct from
// TypingPractice.jsx's speed-test passages, which assume the typist already
// knows where every key is. These lessons build up progressively: home row
// first, then top row, then bottom row, then numbers/punctuation, then
// real words and sentences — standard touch-typing pedagogy.
//
// Mastery here is accuracy-based (>=90%), not speed-based, since the goal
// at this stage is correct finger placement, not raw WPM. Once a student
// completes these, the existing Speed Test passages are the right next
// step for building speed on material they already know how to type.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// EDCLUB — where the daily 15 minutes actually happens. Added Aug 9 2026, the
// parent: "Can you add this link to his typing https://www.edclub.com/sportal/"
//
// This is a STUDENT PORTAL AND IT REQUIRES A LOGIN. That is stated here rather
// than discovered on screen, because a link that silently lands on a sign-in
// wall reads as a broken link to a twelve-year-old, and the fix is knowing to
// expect it.
//
// The lessons and speed test below are NOT replaced by it. They are the backup
// for a portal outage or no internet, and they are what feeds typingLessonProgress
// and the XP/mastery record the parent dashboard reports on — EdClub keeps its
// own progress and this app cannot see it.
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// THE CHECKLIST FROM THE LESSON, shown where he actually types.
//
// Added Aug 9 2026, the parent: "The typing II Typing II: Ergonomics & Accuracy
// I thought was linked to the typing in the dropdown. How should these work
// together?" They did not work together at all. Technology lesson
// `tech7-typing-2` taught posture and accuracy-before-speed in ten multiple
// choice questions in August, and then those ideas never appeared again at
// 11:15 when he was actually at the keyboard.
//
// SOURCED FROM `tech7-typing-2`'s TWO TEACHING BEATS — "Posture Protects Your
// Hands" and "Accuracy Before Speed" — condensed to what you can check yourself
// mid-session. This is a COPY, not a live read, because the lesson's
// teachingText is a paragraph and a checklist is not. The copy is the risk, so
// verify-typing.mjs asserts the source lesson still exists and still teaches
// exactly these two beats: rewrite the lesson and the guard fails rather than
// this quietly going stale.
// ---------------------------------------------------------------------------
export const TYPING_II_LESSON_ID = 'tech7-typing-2';
export const TYPING_II_BEAT_LABELS = ['Posture Protects Your Hands', 'Accuracy Before Speed'];

export const ERGONOMICS_CHECKLIST = [
  { id: 'feet', text: 'Feet flat on the floor, back straight.' },
  { id: 'wrists', text: 'Wrists neutral — not bent up, not resting on the desk edge.' },
  { id: 'screen', text: 'Screen about an arm\'s length away, at or just below eye level.' },
  { id: 'accuracy', text: 'Accuracy before speed. Slow and correct beats fast and wrong — sloppy habits are far harder to undo later than they are to avoid now.' }
];

export const EDCLUB_PORTAL_URL = 'https://www.edclub.com/sportal/';

export const typingLessons = [
  {
    id: 'typing-lesson-1',
    order: 1,
    title: 'Home Row Basics',
    keysIntroduced: 'A S D F   J K L ;',
    fingerGuidance:
      'Rest your left-hand fingers on A S D F and your right-hand fingers on J K L ; — these are your home keys. Feel for the small raised bumps on F and J with your index fingers; that\u2019s how you find home position without looking down.',
    practiceText: 'asdf jkl; asdf jkl; aa ss dd ff jj kk ll ;; asdf jkl; fj fj dk dk sl sl a; a; asdf jkl;',
    minAccuracy: 90
  },
  {
    id: 'typing-lesson-2',
    order: 2,
    title: 'Home Row Words',
    keysIntroduced: 'A S D F   J K L ; (real words)',
    fingerGuidance:
      'Keep your fingers resting on the home row. Reach out with only the finger needed for each letter, then return to home position immediately after.',
    practiceText: 'ask sad lad all fall dad flask salad glass hall half flag dash gala ads add lads falls',
    minAccuracy: 90
  },
  {
    id: 'typing-lesson-3',
    order: 3,
    title: 'Top Row: Q W E R T Y U I O P',
    keysIntroduced: 'Q W E R T   Y U I O P',
    fingerGuidance:
      'Reach up and slightly in from your home row fingers: Q W E R T with your left hand, Y U I O P with your right hand. Return to home position after each reach.',
    practiceText: 'wear tour true part start trap trust dirt read grade trade stage adopt quest quiet quote',
    minAccuracy: 90
  },
  {
    id: 'typing-lesson-4',
    order: 4,
    title: 'Bottom Row: Z X C V B N M',
    keysIntroduced: 'Z X C V   B N M',
    fingerGuidance:
      'Reach down and slightly in from your home row fingers: Z X C V with your left hand, B N M with your right hand. Return to home position after each reach.',
    practiceText: 'van cab max zinc calm cave name mice vice zebra brave come come back back many mine',
    minAccuracy: 90
  },
  {
    id: 'typing-lesson-5',
    order: 5,
    title: 'Full Alphabet Words',
    keysIntroduced: 'All letter keys combined',
    fingerGuidance:
      'You now know every letter\u2019s position. Type these words using every row, keeping your eyes on the screen instead of your hands.',
    practiceText: 'quick brown fox jumps over the lazy dog every good typist practices daily to build real speed',
    minAccuracy: 88
  },
  {
    id: 'typing-lesson-6',
    order: 6,
    title: 'Number Row',
    keysIntroduced: '1 2 3 4 5   6 7 8 9 0',
    fingerGuidance:
      'Reach straight up to the number row: 1 2 3 4 5 with your left hand, 6 7 8 9 0 with your right hand.',
    practiceText: '123 456 789 0 12 34 56 78 90 100 250 375 1984 2026 42 007 365 24 60',
    minAccuracy: 85
  },
  {
    id: 'typing-lesson-7',
    order: 7,
    title: 'Punctuation & Capitalization',
    keysIntroduced: '. , \' Shift',
    fingerGuidance:
      'Use your right pinky for period, comma, and apostrophe. Hold Shift with your opposite hand\u2019s pinky while typing a letter to capitalize it.',
    practiceText: "The rocket launched. Did it reach orbit? Yes, it did! The team's hard work paid off.",
    minAccuracy: 88
  },
  {
    id: 'typing-lesson-8',
    order: 8,
    title: 'Common Sight Words',
    keysIntroduced: 'Frequent short words',
    fingerGuidance:
      'These short words appear constantly in real writing. Building speed and accuracy on them pays off in almost everything you type.',
    practiceText: 'the and for with that this from have will your what when make like time work more only',
    minAccuracy: 90
  },
  {
    id: 'typing-lesson-9',
    order: 9,
    title: 'Full Sentences',
    keysIntroduced: 'Complete sentences at a controlled pace',
    fingerGuidance:
      'Build up to full, natural sentences. Focus on accuracy and steady rhythm before worrying about speed.',
    practiceText: 'The engineer carefully reviewed every measurement before approving the final design for testing.',
    minAccuracy: 90
  },
  {
    id: 'typing-lesson-10',
    order: 10,
    title: 'Speed & Accuracy Challenge',
    keysIntroduced: 'Everything combined',
    fingerGuidance:
      'You\u2019ve learned every key on the keyboard. This final lesson combines letters, numbers, and punctuation — type it as accurately as you can. After this, the Speed Test passages are the place to build raw typing speed.',
    practiceText:
      'Mission control confirmed the spacecraft had reached a stable orbit at 250 miles, and the team began preparing for the next phase.',
    minAccuracy: 88
  }
];
