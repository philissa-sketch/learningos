// ─────────────────────────────────────────────────────────────────────────────
// DRAFT — seeds/lamar.js
//
// Lamar's setup expressed as questionnaire answers. Filed in docs/ on purpose:
// this is a draft to review, not live code. When it moves to src/seeds/ it must
// run through the SAME code path a typed questionnaire answer does — one way to
// create an Academy, never two. (LEARNINGOS_PACK_SPEC.md §1)
//
// Every value below was read out of the live repo on Aug 30, 2026.
// Three fields marked NEW do not exist anywhere in the app yet — see the notes
// at the bottom. Everything else is quoted from a real file.
// ─────────────────────────────────────────────────────────────────────────────

export const LAMAR = {

  id: 'lamar',

  // ── Section A · The learner ────────────────────────────────────────────────
  profile: {
    displayName: 'Lamar',                     // novaVoice.js:81  STUDENT_NAME
    academyName: 'Mission Control Academy',
    careerTrack: 'aerospace',
    gradeLevel: '7th',                        // NEW — see note 1
    age: 12,                                  // NEW — see note 1
    readingLevel: 7
  },

  household: {
    state: 'GA'                               // see STATE_COMPLIANCE_DATA.md
  },

  // ── Section C · Their world ───────────────────────────────────────────────
  guide: {
    name: 'Commander Nova',                   // novaVoice.js:15  NOVA_NAME
    honorific: 'cadet',                       // NEW — see note 2
    tone: 'brief',
    linesModule: 'academies/lamar/lines.js'   // from novaVoice.js + dailyLines.js
  },

  theme: {
    id: 'theme-telemetry',                    // themes.js DEFAULT_THEME_ID
    mode: 'dark',
    // The seven CSS variables in index.css :root. Space-separated RGB channels,
    // NOT hex — Tailwind reads them as rgb(var(--x) / <alpha-value>).
    vars: {
      '--space-950': '7 11 20',
      '--space-900': '11 17 32',
      '--space-800': '19 27 46',
      '--space-700': '28 39 61',
      '--space-600': '42 55 82',
      '--accent':    '34 211 238',
      '--accent-glow': 'rgba(34, 211, 238, 0.06)'
    },
    unlockableThemes: [
      'theme-deep-space',      // 200
      'theme-mars',            // 250
      'theme-launch-pad',      // 300
      'theme-ocean-recovery',  // 350
      'theme-blueprint'        // 400
    ],
    fonts: {
      display: 'Rajdhani',
      body: 'Inter',
      mono: 'JetBrains Mono'
    }
  },

  // ── Section D · Subjects ──────────────────────────────────────────────────
  // config/subjects.js, verbatim
  subjects: {
    signature: 'aerospace',
    active:        ['aerospace', 'technology', 'socialStudies', 'pe', 'robotics'],
    khanTaught:    ['math', 'reading', 'science'],
    participation: ['pe', 'gardening', 'guitar'],
    lessonTrack:   ['reading'],
    rotating:      ['aerospace', 'technology', 'socialStudies', 'robotics'],  // lib/pacing.js
    retiredMerges: { writing: 'reading' },

    labels: {
      math:          'Mathematics',
      reading:       'English Language Arts',
      science:       'Science',
      aerospace:     'Aerospace Engineering',
      technology:    'Technology & Computer Science',
      socialStudies: 'Social Studies',
      pe:            'PE & Nutrition',
      robotics:      'Robotics & Automation',
      gardening:     'Gardening & Applied Engineering',
      guitar:        'Electric Guitar'
    },
    cardLabels: {
      reading:   'Language Arts',
      typing:    'Typing',
      gardening: 'Garden',
      guitar:    'Guitar'
    },
    strands: {
      reading: [
        { id: 'reading',       label: 'Reading & Literature' },
        { id: 'language-arts', label: 'Grammar & Writing' }
      ]
    }
  },

  // ── Section B · How they learn ────────────────────────────────────────────
  timetable: {
    schoolYearStart: '2026-08-03',             // schoolQuarter.js SCHOOL_YEAR_START_DATE
    schoolDays: [1, 2, 3, 4, 5],
    dayStart: '08:30',
    dayEnd: '16:45',

    // data/schedule/defaultSchedule.js — 13 blocks
    blocks: [
      { id: 'block-1',  start: '08:30', end: '09:00', label: 'Morning Meeting, Goals & Calendar', colorKey: 'neutral' },
      { id: 'block-2',  start: '09:00', end: '10:00', label: 'Mathematics',                        colorKey: 'math' },
      { id: 'block-3',  start: '10:00', end: '10:15', label: 'Reading Lesson',                     colorKey: 'reading' },
      { id: 'block-4',  start: '10:15', end: '10:30', label: 'Break',                              colorKey: 'break' },
      { id: 'block-5',  start: '10:30', end: '11:15', label: 'Science',                            colorKey: 'science' },
      { id: 'block-5b', start: '11:15', end: '11:30', label: 'Typing Practice',                    colorKey: 'reading' },
      { id: 'block-6',  start: '11:30', end: '12:30', label: 'Lunch & Outdoor Time',               colorKey: 'break' },
      { id: 'block-7',  start: '12:30', end: '13:30', label: 'Language Arts & Writing Journal',    colorKey: 'math' },
      { id: 'block-7b', start: '13:30', end: '13:45', label: 'Spelling & Vocabulary',              colorKey: 'reading' },
      { id: 'block-8',  start: '13:45', end: '14:15', label: 'Physical Education',                 colorKey: 'pe' },
      { id: 'block-9',  start: '14:15', end: '15:00', label: 'Rotating Block',                     colorKey: 'science' },
      { id: 'block-10', start: '15:00', end: '15:15', label: 'Electric Guitar Practice',           colorKey: 'reading' },
      { id: 'block-11', start: '15:15', end: '16:45', label: 'Gardening',                          colorKey: 'science', days: [5] }
    ],

    // data/schedule/weekPattern.js — `subjects` is an order of PREFERENCE, not a
    // list of what runs. The first subject with live lessons this quarter owns
    // the rotating block (lib/rotatingBlock.js).
    weekPattern: {
      1: { label: 'Monday',    kind: 'core', subjects: ['aerospace'] },
      2: { label: 'Tuesday',   kind: 'core', subjects: ['technology', 'robotics'], morningSubjects: ['socialStudies'] },
      3: { label: 'Wednesday', kind: 'core', subjects: ['aerospace', 'socialStudies'],
           subjectsByQuarter: { Q1: ['socialStudies', 'aerospace'] } },
      4: { label: 'Thursday',  kind: 'core', subjects: ['socialStudies', 'technology'],
           subjectsByQuarter: { Q1: ['technology', 'socialStudies'] } },
      5: { label: 'Friday',    kind: 'core', flex: true, subjects: [], afterSchool: ['gardening'] },
      6: { label: 'Saturday',  kind: 'weekend', subjects: [] },
      0: { label: 'Sunday',    kind: 'weekend', subjects: [] }
    }
  },

  // ── Section F · Rewards ───────────────────────────────────────────────────
  economy: {
    paysForCorrect: true,                      // ← THE fork vs. Azianna's Academy
    xpPerCoin: 2,                              // economy.js XP_PER_COIN
    xpPerCredit: 5,                            // economy.js XP_PER_CREDIT
    currencies: [
      { id: 'coin',   name: 'Mission Coins',   short: 'Coins',   icon: '🪙' },
      { id: 'credit', name: 'Mission Credits', short: 'Credits', icon: '🎟️' }
    ],
    creditAutoApproveMax: 100,
    creditAutoApproveWeeklyCap: 150,
    dreamMatchRate: 0.25,

    calibratedLessonCount: 356,                // ranks.js — per-Academy, see note 3
    ranks: [
      { tier: 1, name: 'Junior Engineer',        minXp: 0,    minMasteredForTier: 0   },
      { tier: 2, name: 'Flight Cadet',           minXp: 500,  minMasteredForTier: 32  },
      { tier: 3, name: 'Rocket Builder',         minXp: 1200, minMasteredForTier: 75  },
      { tier: 4, name: 'Aircraft Designer',      minXp: 2100, minMasteredForTier: 129 },
      { tier: 5, name: 'Mission Specialist',     minXp: 3200, minMasteredForTier: 188 },
      { tier: 6, name: 'Space Explorer',         minXp: 4500, minMasteredForTier: 242 },
      { tier: 7, name: 'Aerospace Innovator',    minXp: 6000, minMasteredForTier: 290 },
      { tier: 8, name: 'College Ready Engineer', minXp: 7800, minMasteredForTier: 333 }
    ]
  },

  // ── Curriculum ────────────────────────────────────────────────────────────
  curriculum: {
    lessons:    () => import('../academies/lamar/lessons/index.js'),
    generators: () => import('../academies/lamar/problemTemplates.js'),
    lessonCount: 328    // actual lesson ROWS. 356 above is the rank calibration.
  }
};
