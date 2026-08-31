/**
 * PE & Nutrition — Exercise Library
 *
 * Real, distinct exercises grouped by the 7 weekly day-types from
 * PROJECT_PLAN.md Part 4's Physical Education spec (Mon-Upper Body,
 * Tue-Lower Body, Wed-Cardio+Stretching, Thu-Core, Fri-Full Body,
 * Sat-Outdoor/Sports, Sun-Recovery/Mobility). 10 real exercises per
 * category (70 total) so `weeklyWorkoutPlan.js` can rotate/vary which
 * ones show up week to week across a full 36-week school year instead
 * of repeating the same 3-4 moves every single Monday.
 *
 * "Demonstrations" in this app means clear, accurate, step-by-step
 * written form cues — there is no way to generate real video/animation
 * here, so every exercise gets real coaching cues instead, same
 * standard as this project's other real-content, never-guessed rule.
 *
 * Framing standard (hard requirement, not a suggestion — Lamar is a
 * real 12-year-old working toward healthy weight/muscle gain and
 * progress must NEVER be framed around appearance): every exercise's
 * `focus` and `safetyNotes` describe strength, control, balance, and
 * function — never how a body looks.
 *
 * Youth strength-training grounding (American Academy of Pediatrics,
 * "Resistance Training for Children and Adolescents," Pediatrics 2020):
 * start with 1-2 sets of 6-15 reps per exercise, at an effort light
 * enough to finish the set with some fatigue but NOT to muscle failure;
 * preadolescents/adolescents should avoid powerlifting, bodybuilding,
 * and maximal (1-rep-max) lifts until they reach physical/skeletal
 * maturity. Every strength-style exercise's `target` and `safetyNotes`
 * below follow that guidance directly — bodyweight/light-resistance
 * reps, never "go until you can't do another one," never max-effort
 * lifts.
 */

export const EXERCISE_CATEGORIES = [
  'upperBody',
  'lowerBody',
  'cardioStretch',
  'core',
  'fullBody',
  'outdoorSports',
  'recovery'
];

export const CATEGORY_LABELS = {
  upperBody: 'Upper Body',
  lowerBody: 'Lower Body',
  cardioStretch: 'Cardio + Stretching',
  core: 'Core',
  fullBody: 'Full Body',
  outdoorSports: 'Outdoor / Sports',
  recovery: 'Recovery / Mobility'
};

export const exerciseLibrary = {
  upperBody: [
    {
      id: 'ub-pushup-standard',
      name: 'Push-Ups',
      type: 'reps',
      target: '1-2 sets of 6-12 reps',
      focus: 'Chest, shoulders, triceps, core control',
      formCues: [
        'Hands slightly wider than shoulders, fingers spread, directly under your shoulders.',
        'Body forms one straight line from head to heels — no sagging hips, no piked-up butt.',
        'Lower your chest toward the floor by bending your elbows at about a 45-degree angle from your body, not flared straight out to the sides.',
        'Go down until your upper arms are about parallel to the floor, then press back up to a full arm extension without locking your elbows hard.',
        'Breathe in on the way down, breathe out as you push up.'
      ],
      safetyNotes:
        'If a full push-up is too hard to control with good form, do it from your knees or with your hands elevated on a step — a smaller, correct rep is worth more than a bigger, sloppy one. Stop a set once your form starts to break down, not when your arms give out completely.'
    },
    {
      id: 'ub-incline-pushup',
      name: 'Incline Push-Ups',
      type: 'reps',
      target: '1-2 sets of 8-15 reps',
      focus: 'Chest, shoulders, triceps (easier entry point than a flat push-up)',
      formCues: [
        'Place both hands on a sturdy surface (a step, a low table, a wall) higher than the floor.',
        'Keep the same straight-line body position as a regular push-up.',
        'Lower your chest toward the surface, elbows at about 45 degrees, then press back up.',
        'The higher the surface, the easier the exercise — pick a height where you can do all your reps with good form.'
      ],
      safetyNotes:
        'A great way to build toward a full push-up without needing to go to failure. Keep the surface stable and non-slip.'
    },
    {
      id: 'ub-pike-pushup',
      name: 'Pike Push-Ups',
      type: 'reps',
      target: '1-2 sets of 5-10 reps',
      focus: 'Shoulders, upper chest, triceps',
      formCues: [
        'Start in a downward-dog position — hips high, hands and feet on the floor, forming an upside-down V.',
        'Bend your elbows to lower the top of your head toward the floor between your hands.',
        'Keep your hips high throughout instead of letting them drop toward the floor.',
        'Press back up to the starting position.'
      ],
      safetyNotes:
        'Move slowly and under control near the floor — this puts more load through the shoulders than a flat push-up, so smaller controlled reps are better than fast, bouncy ones.'
    },
    {
      id: 'ub-resistance-band-row',
      name: 'Resistance Band Rows',
      type: 'reps',
      target: '1-2 sets of 10-15 reps',
      focus: 'Upper back, shoulders, posture muscles',
      formCues: [
        'Anchor the band around a sturdy post or doorframe attachment at chest height.',
        'Hold one end in each hand, step back until there is light tension, feet shoulder-width apart.',
        'Pull both handles toward your ribs, squeezing your shoulder blades together, elbows staying close to your body.',
        'Control the return — don\'t let the band yank your arms back out.'
      ],
      safetyNotes:
        'Choose a band with light-to-moderate resistance where you can complete every rep with some fatigue on the last couple, but not straining or losing form. Check the band and anchor for wear or slipping before pulling hard.'
    },
    {
      id: 'ub-resistance-band-press',
      name: 'Resistance Band Chest Press',
      type: 'reps',
      target: '1-2 sets of 10-15 reps',
      focus: 'Chest, shoulders, triceps',
      formCues: [
        'Anchor the band behind you at chest height, one handle in each hand.',
        'Stand in a small staggered stance for balance, hands starting near your chest.',
        'Press both hands forward until your arms are extended (not locked), then return with control.',
        'Keep your core braced so your lower back doesn\'t arch as you press.'
      ],
      safetyNotes:
        'Same light-to-moderate resistance rule as every band exercise here — you should never need to strain or use jerky momentum to move the band.'
    },
    {
      id: 'ub-resistance-band-curl',
      name: 'Resistance Band Bicep Curls',
      type: 'reps',
      target: '1-2 sets of 10-15 reps',
      focus: 'Biceps, forearms',
      formCues: [
        'Stand on the middle of the band with feet shoulder-width apart, one handle in each hand.',
        'Keep your elbows pinned close to your sides the whole rep — only your forearms move.',
        'Curl both hands up toward your shoulders, then lower with control back to a full arm extension.',
        'Avoid swinging your body or using your back to help lift the band.'
      ],
      safetyNotes:
        'If you have to lean back or swing to move the band, it\'s too much resistance — step further up the band (less tension) instead.'
    },
    {
      id: 'ub-plank-shoulder-tap',
      name: 'Plank Shoulder Taps',
      type: 'reps',
      target: '1-2 sets of 10-16 total taps (5-8 per side)',
      focus: 'Shoulders, chest, anti-rotation core stability',
      formCues: [
        'Start in a high plank (push-up top position), feet a bit wider than hip-width for stability.',
        'Keeping your hips as still and level as possible, lift one hand and tap the opposite shoulder.',
        'Return that hand to the floor, then repeat with the other hand.',
        'Move slowly enough that your hips don\'t rock side to side.'
      ],
      safetyNotes:
        'The goal is a still, quiet torso while your hand moves — if your hips are swinging a lot, widen your foot stance or slow down.'
    },
    {
      id: 'ub-medicine-ball-chest-pass',
      name: 'Medicine Ball Chest Pass',
      type: 'reps',
      target: '1-2 sets of 8-12 reps',
      focus: 'Chest, shoulders, explosive upper-body power',
      formCues: [
        'Hold the medicine ball at chest height with both hands, elbows out.',
        'Stand facing a wall (or a partner) a few feet away.',
        'Push the ball straight out from your chest toward the wall, extending your arms fully.',
        'Catch it on the rebound (or have your partner pass it back) and reset at your chest before the next rep.'
      ],
      safetyNotes:
        'Use a light medicine ball (a 2-4 lb ball is plenty for a 12-year-old building this skill) and make sure there\'s clear space with nothing breakable nearby.'
    },
    {
      id: 'ub-medicine-ball-slam',
      name: 'Medicine Ball Overhead Slams',
      type: 'reps',
      target: '1-2 sets of 6-10 reps',
      focus: 'Shoulders, core, full-body power',
      formCues: [
        'Hold the medicine ball with both hands, feet shoulder-width apart.',
        'Raise the ball overhead, reaching tall through your whole body.',
        'Slam the ball down to the floor in front of your feet, hinging at your hips and bracing your core as you do.',
        'Pick it up with a bend at the hips and knees (not a rounded back) and reset.'
      ],
      safetyNotes:
        'Use a soft or rubber slam ball if available, and make sure the slam space is clear of feet, toes, and breakables. Slow down and reset your grip between reps rather than rushing.'
    },
    {
      id: 'ub-doorframe-row',
      name: 'Towel/Doorframe Rows',
      type: 'reps',
      target: '1-2 sets of 8-12 reps',
      focus: 'Upper back, biceps, grip',
      formCues: [
        'Loop a sturdy towel around a solid, stable anchor (a secure railing works well) at about waist height.',
        'Hold both ends, lean back with arms extended and feet braced, body in a straight line.',
        'Pull your chest toward your hands, squeezing your shoulder blades together.',
        'Lower back down under control to a full arm extension.'
      ],
      safetyNotes:
        'Only use an anchor point you\'re sure is completely secure and won\'t slip or come loose — check it with a light tug before leaning your full weight into it.'
    }
  ],

  lowerBody: [
    {
      id: 'lb-bodyweight-squat',
      name: 'Bodyweight Squats',
      type: 'reps',
      target: '1-2 sets of 10-15 reps',
      focus: 'Quads, glutes, hamstrings, balance',
      formCues: [
        'Feet shoulder-width apart, toes pointed slightly outward.',
        'Push your hips back and bend your knees like you\'re sitting into a chair, keeping your chest up.',
        'Go down until your thighs are at least close to parallel with the floor, keeping your heels flat on the ground.',
        'Keep your knees tracking in the same direction as your toes — don\'t let them cave inward.',
        'Drive through your heels to stand back up.'
      ],
      safetyNotes:
        'Only squat as low as you can while keeping your heels down and your back naturally straight (not rounding). A smaller range of motion with good form beats a deep squat with a rounded back.'
    },
    {
      id: 'lb-lunge-forward',
      name: 'Forward Lunges',
      type: 'reps',
      target: '1-2 sets of 8-12 reps per leg',
      focus: 'Quads, glutes, hamstrings, balance',
      formCues: [
        'Stand tall, then step one foot forward into a long stride.',
        'Bend both knees to lower straight down, front knee tracking over (not past) your front foot.',
        'Keep your torso upright and your back knee hovering just above the floor.',
        'Push off your front foot to return to standing, then switch legs.'
      ],
      safetyNotes:
        'Take a stride long enough that your front knee doesn\'t travel far past your toes. If balance is hard at first, hold onto a wall or chair with one hand while you build it up.'
    },
    {
      id: 'lb-lunge-reverse',
      name: 'Reverse Lunges',
      type: 'reps',
      target: '1-2 sets of 8-12 reps per leg',
      focus: 'Glutes, hamstrings, quads, balance',
      formCues: [
        'Stand tall, then step one foot backward into a long stride.',
        'Bend both knees to lower down, keeping most of your weight on your front leg.',
        'Keep your torso upright, front knee tracking over your front foot.',
        'Push off your back foot to return to standing, then switch legs.'
      ],
      safetyNotes:
        'Reverse lunges are usually gentler on the front knee than forward lunges — a good option if forward lunges feel uncomfortable. Step onto a flat, clear surface each time.'
    },
    {
      id: 'lb-glute-bridge',
      name: 'Glute Bridges',
      type: 'reps',
      target: '1-2 sets of 12-15 reps',
      focus: 'Glutes, hamstrings, lower back stability',
      formCues: [
        'Lie on your back, knees bent, feet flat on the floor about hip-width apart, close to your glutes.',
        'Press through your heels to lift your hips up until your body forms a straight line from shoulders to knees.',
        'Squeeze your glutes at the top without arching your lower back excessively.',
        'Lower back down under control and repeat.'
      ],
      safetyNotes:
        'Keep the lift smooth and controlled — no sudden thrusting. Stop the rise at a straight line; going higher than that just arches the lower back without adding benefit.'
    },
    {
      id: 'lb-calf-raise',
      name: 'Calf Raises',
      type: 'reps',
      target: '1-2 sets of 12-20 reps',
      focus: 'Calves, ankle stability',
      formCues: [
        'Stand tall, feet hip-width apart, holding onto a wall or chair for balance if needed.',
        'Rise up onto the balls of your feet as high as you comfortably can.',
        'Pause briefly at the top, then lower back down under control — don\'t just drop.',
        'Keep your knees soft, not locked.'
      ],
      safetyNotes:
        'A simple, low-impact exercise — good for warming up ankles before higher-impact cardio work later in a session.'
    },
    {
      id: 'lb-step-up',
      name: 'Step-Ups',
      type: 'reps',
      target: '1-2 sets of 8-12 reps per leg',
      focus: 'Quads, glutes, balance, coordination',
      formCues: [
        'Stand facing a sturdy step or low bench.',
        'Place your whole foot on the step, then drive through that heel to step fully up, bringing both feet together on top.',
        'Step back down under control, one foot at a time.',
        'Keep your chest up and avoid pushing off your back foot to "hop" up.'
      ],
      safetyNotes:
        'Start with a lower step height and increase only once you can do the movement smoothly and under control on both legs.'
    },
    {
      id: 'lb-wall-sit',
      name: 'Wall Sit',
      type: 'time',
      target: '2-3 rounds of 20-40 seconds',
      focus: 'Quads, glutes, isometric leg endurance',
      formCues: [
        'Lean your back flat against a wall, feet shoulder-width apart, about two feet out from the wall.',
        'Slide down until your knees are bent to roughly 90 degrees, like sitting in an invisible chair.',
        'Keep your knees over your ankles (not past your toes) and your back flat against the wall.',
        'Hold, breathing normally, then slide back up to stand.'
      ],
      safetyNotes:
        'Stop early if your knees start to shake badly or the position breaks down — an imperfect-form hold doesn\'t build the same strength safely.'
    },
    {
      id: 'lb-lateral-band-walk',
      name: 'Resistance Band Lateral Walks',
      type: 'reps',
      target: '1-2 sets of 10-12 steps per direction',
      focus: 'Hips, glutes (side), knee stability',
      formCues: [
        'Loop a light resistance band around both legs, just above the ankles or knees.',
        'Get into a quarter-squat position, feet hip-width apart, keeping tension on the band.',
        'Step sideways with control, keeping your toes pointed forward the whole time.',
        'Take the same number of steps back the other direction.'
      ],
      safetyNotes:
        'Keep your knees pointing the same direction as your toes throughout — this exercise specifically builds the hip control that helps knees track correctly during squats and jumps.'
    },
    {
      id: 'lb-single-leg-balance',
      name: 'Single-Leg Balance Reach',
      type: 'reps',
      target: '1-2 sets of 6-8 reaches per leg',
      focus: 'Balance, ankle and hip stability',
      formCues: [
        'Stand on one leg with a soft bend in the standing knee.',
        'Reach the opposite hand toward your toes (or as far down as balance allows) while the other leg extends behind you.',
        'Return to standing tall on one leg, then repeat.',
        'Switch legs after completing the set.'
      ],
      safetyNotes:
        'Stay near a wall or chair the first few times in case balance is off. Progress the reach distance only as balance improves.'
    },
    {
      id: 'lb-cossack-squat',
      name: 'Cossack Squats (Side Squats)',
      type: 'reps',
      target: '1-2 sets of 6-10 reps per side',
      focus: 'Hips, inner/outer thighs, mobility',
      formCues: [
        'Stand with feet wider than shoulder-width, toes turned out slightly.',
        'Shift your weight to one side, bending that knee and sitting your hips back while keeping the other leg straight, foot flat.',
        'Keep your chest up and your bent knee tracking over your foot.',
        'Push back through the bent-leg heel to return to center, then repeat on the other side.'
      ],
      safetyNotes:
        'Go only as deep as your hip and ankle mobility comfortably allow — a smaller range with control is the right starting point and will improve over time.'
    }
  ],

  cardioStretch: [
    {
      id: 'cs-jump-rope',
      name: 'Jump Rope',
      type: 'time',
      target: '3-5 rounds of 30-60 seconds',
      focus: 'Cardiovascular endurance, coordination, bone-strengthening impact',
      formCues: [
        'Hold the rope handles lightly, wrists doing most of the turning work, not big arm swings.',
        'Jump just high enough to clear the rope — small, quick hops, landing softly on the balls of your feet.',
        'Keep a slight bend in your knees to absorb each landing.',
        'Find a steady rhythm rather than rushing.'
      ],
      safetyNotes:
        'Jump on a surface with a little give (not bare concrete) if possible, and wear real shoes. This is a genuine bone-strengthening activity — the CDC includes activities like jumping rope in the "at least 3 days a week" bone-strengthening recommendation for kids and teens.'
    },
    {
      id: 'cs-jumping-jacks',
      name: 'Jumping Jacks',
      type: 'time',
      target: '3-4 rounds of 30-45 seconds',
      focus: 'Cardiovascular endurance, full-body coordination',
      formCues: [
        'Start standing tall, feet together, arms at your sides.',
        'Jump your feet out wide while raising your arms overhead at the same time.',
        'Jump back to the starting position, arms back down.',
        'Keep landings soft with slightly bent knees.'
      ],
      safetyNotes:
        'A classic, low-equipment way to raise your heart rate — good as a warm-up or as its own cardio interval.'
    },
    {
      id: 'cs-high-knees',
      name: 'High Knees',
      type: 'time',
      target: '3-4 rounds of 20-30 seconds',
      focus: 'Cardiovascular endurance, hip flexor strength, running form',
      formCues: [
        'Jog in place, driving your knees up toward hip height with each step.',
        'Pump your arms in rhythm with your legs, like running.',
        'Stay light on your feet, landing on the balls of your feet.',
        'Keep your chest tall instead of hunching forward.'
      ],
      safetyNotes:
        'Start at a comfortable pace and speed up only once the coordination feels smooth.'
    },
    {
      id: 'cs-butt-kicks',
      name: 'Butt Kicks',
      type: 'time',
      target: '3-4 rounds of 20-30 seconds',
      focus: 'Cardiovascular endurance, hamstring activation',
      formCues: [
        'Jog in place, kicking each heel back to try to tap your glutes.',
        'Keep your knees pointing down toward the floor, not swinging forward.',
        'Pump your arms naturally in rhythm.',
        'Stay light and quick on your feet.'
      ],
      safetyNotes:
        'A good warm-up mover before running-based cardio or Saturday outdoor/sports activities.'
    },
    {
      id: 'cs-mountain-climbers',
      name: 'Mountain Climbers',
      type: 'time',
      target: '3-4 rounds of 20-30 seconds',
      focus: 'Cardiovascular endurance, core, shoulder stability',
      formCues: [
        'Start in a high plank position, hands under shoulders.',
        'Drive one knee toward your chest, then quickly switch legs, like running in place horizontally.',
        'Keep your hips low and steady — don\'t let them pike up into the air.',
        'Keep your core braced throughout.'
      ],
      safetyNotes:
        'Slow the pace down if your lower back starts to sag or your hips start bouncing — form matters more than speed here.'
    },
    {
      id: 'cs-forward-fold-stretch',
      name: 'Standing Forward Fold Stretch',
      type: 'time',
      target: '2-3 rounds of 20-30 seconds',
      focus: 'Hamstring and lower back flexibility',
      formCues: [
        'Stand with feet hip-width apart.',
        'Hinge forward at your hips, letting your upper body hang toward your toes, knees slightly bent.',
        'Let your head and neck relax; don\'t force yourself flat.',
        'Breathe slowly and let gravity gently deepen the stretch over the hold, without bouncing.'
      ],
      safetyNotes:
        'Never bounce in a stretch — ease in gradually and stop at a gentle pull, never pain.'
    },
    {
      id: 'cs-quad-stretch',
      name: 'Standing Quad Stretch',
      type: 'time',
      target: '2 rounds of 20-30 seconds per leg',
      focus: 'Quadriceps flexibility, balance',
      formCues: [
        'Stand tall, holding a wall or chair for balance if needed.',
        'Bend one knee, bringing that heel toward your glutes, and hold your ankle or foot with one hand.',
        'Keep your knees close together and your hips level, not tilted.',
        'Hold gently, then switch legs.'
      ],
      safetyNotes:
        'Stop if you feel any pinch in the knee joint itself — the stretch should be felt in the front of the thigh, not the joint.'
    },
    {
      id: 'cs-shoulder-cross-stretch',
      name: 'Cross-Body Shoulder Stretch',
      type: 'time',
      target: '2 rounds of 15-20 seconds per arm',
      focus: 'Shoulder flexibility',
      formCues: [
        'Bring one arm straight across your chest at shoulder height.',
        'Use your other hand to gently press that arm closer to your chest.',
        'Keep your shoulders relaxed and down, away from your ears.',
        'Hold gently, then switch arms.'
      ],
      safetyNotes:
        'A gentle stretch — you should feel mild tension in the back of the shoulder, never pain.'
    },
    {
      id: 'cs-cat-cow-stretch',
      name: 'Cat-Cow Stretch',
      type: 'reps',
      target: '1-2 sets of 8-10 slow cycles',
      focus: 'Spine mobility, core awareness',
      formCues: [
        'Start on hands and knees, wrists under shoulders, knees under hips.',
        'Inhale, drop your belly, lift your chest and tailbone (Cow).',
        'Exhale, round your spine up toward the ceiling, tucking your chin (Cat).',
        'Move slowly, syncing the movement with your breathing.'
      ],
      safetyNotes:
        'Keep the movement smooth and controlled — this is a mobility drill, not a strength exercise, so there\'s no need to force the range.'
    },
    {
      id: 'cs-dynamic-arm-circles',
      name: 'Dynamic Arm Circles',
      type: 'time',
      target: '2 rounds of 15-20 seconds each direction',
      focus: 'Shoulder mobility, warm-up circulation',
      formCues: [
        'Stand tall, arms extended straight out to the sides at shoulder height.',
        'Make small circles with your arms, gradually increasing the size over a few seconds.',
        'Reverse direction halfway through.',
        'Keep your shoulders relaxed rather than shrugged up.'
      ],
      safetyNotes:
        'A great warm-up mover for any day involving push-ups, bands, or medicine ball work.'
    }
  ],

  core: [
    {
      id: 'co-plank',
      name: 'Forearm Plank',
      type: 'time',
      target: '2-3 rounds of 15-30 seconds',
      focus: 'Whole-core stability, posture',
      formCues: [
        'Forearms on the floor, elbows under shoulders, body in a straight line from head to heels.',
        'Squeeze your glutes and brace your core like you\'re about to be gently poked in the stomach.',
        'Keep your hips level — not sagging down, not piked up.',
        'Keep breathing normally throughout the hold; don\'t hold your breath.'
      ],
      safetyNotes:
        'A shorter hold with a perfectly straight line is worth more than a longer hold with sagging hips. Stop as soon as your hips start to drop.'
    },
    {
      id: 'co-side-plank',
      name: 'Side Plank',
      type: 'time',
      target: '2 rounds of 10-20 seconds per side',
      focus: 'Obliques, lateral core stability',
      formCues: [
        'Lie on your side, prop up on one forearm directly under your shoulder.',
        'Stack your feet (or stagger them for more balance) and lift your hips off the floor into a straight line.',
        'Keep your top hip stacked over the bottom hip, not rotating forward or back.',
        'Hold, then switch sides.'
      ],
      safetyNotes:
        'Start with knees bent (a modified side plank) if the full version is hard to hold with good form at first.'
    },
    {
      id: 'co-dead-bug',
      name: 'Dead Bug',
      type: 'reps',
      target: '1-2 sets of 8-10 reps per side',
      focus: 'Deep core control, spine stability',
      formCues: [
        'Lie on your back, arms reaching straight up, knees bent at 90 degrees over your hips.',
        'Press your lower back gently into the floor and keep it there the whole exercise.',
        'Slowly lower one arm overhead and the opposite leg straight out, just above the floor.',
        'Return to the start and switch sides, keeping your lower back flat throughout.'
      ],
      safetyNotes:
        'If your lower back arches off the floor, only lower your arm/leg as far as you can while keeping it flat — that\'s the real range that\'s working for you right now.'
    },
    {
      id: 'co-bird-dog',
      name: 'Bird Dog',
      type: 'reps',
      target: '1-2 sets of 8-10 reps per side',
      focus: 'Core stability, balance, lower back support',
      formCues: [
        'Start on hands and knees, wrists under shoulders, knees under hips.',
        'Extend one arm straight forward and the opposite leg straight back at the same time.',
        'Keep your hips and shoulders square to the floor — don\'t let them twist or tilt.',
        'Return to the start with control and switch sides.'
      ],
      safetyNotes:
        'Move slowly enough that your balance stays steady — quality of the hold matters more than speed.'
    },
    {
      id: 'co-bicycle-crunch',
      name: 'Bicycle Crunches',
      type: 'reps',
      target: '1-2 sets of 12-16 total reps',
      focus: 'Obliques, upper and lower abs',
      formCues: [
        'Lie on your back, hands lightly behind your head, knees bent and lifted.',
        'Bring one elbow toward the opposite knee while extending the other leg out.',
        'Switch sides in a smooth pedaling motion.',
        'Use your core to rotate — don\'t yank on your neck with your hands.'
      ],
      safetyNotes:
        'Keep your hands lightly supporting your head, not pulling it — your neck should stay relaxed the whole time.'
    },
    {
      id: 'co-reverse-crunch',
      name: 'Reverse Crunches',
      type: 'reps',
      target: '1-2 sets of 10-15 reps',
      focus: 'Lower abs',
      formCues: [
        'Lie on your back, arms at your sides, knees bent, feet lifted off the floor.',
        'Curl your knees up and in toward your chest, lifting your hips slightly off the floor.',
        'Lower back down with control, without letting your legs swing or using momentum.',
        'Keep the movement slow and controlled rather than fast and swingy.'
      ],
      safetyNotes:
        'Momentum-free reps are what actually build strength here — swinging your legs just uses gravity, not your abs.'
    },
    {
      id: 'co-plank-up-down',
      name: 'Plank Up-Downs',
      type: 'reps',
      target: '1-2 sets of 6-10 reps',
      focus: 'Core stability, shoulder and tricep strength',
      formCues: [
        'Start in a forearm plank.',
        'Press up one arm at a time into a high plank (push-up position).',
        'Lower back down one arm at a time to forearms.',
        'Keep your hips as still and level as possible the whole time — try not to let them rock side to side.'
      ],
      safetyNotes:
        'If your hips sway a lot, widen your foot stance for a more stable base.'
    },
    {
      id: 'co-hollow-hold',
      name: 'Hollow Body Hold',
      type: 'time',
      target: '2 rounds of 10-20 seconds',
      focus: 'Whole-core tension and control',
      formCues: [
        'Lie on your back, arms extended overhead, legs extended long.',
        'Press your lower back into the floor and lift your shoulders and legs a few inches off the ground.',
        'Keep your lower back flat against the floor the entire hold — this determines how high your legs/arms should be.',
        'Breathe steadily; don\'t hold your breath.'
      ],
      safetyNotes:
        'The lower back staying flat on the floor is the safety rule here, not how high the limbs are lifted — lower the legs/arms until your back stays down if you feel it arching.'
    },
    {
      id: 'co-flutter-kicks',
      name: 'Flutter Kicks',
      type: 'time',
      target: '2 rounds of 15-20 seconds',
      focus: 'Lower abs, hip flexors',
      formCues: [
        'Lie on your back, hands under your lower back or glutes for support, legs extended.',
        'Lift both legs a few inches off the floor and kick them in a small, steady up-and-down flutter.',
        'Keep your lower back pressed toward the floor the whole time.',
        'Keep the kicks small and controlled rather than big and fast.'
      ],
      safetyNotes:
        'If your lower back lifts off the floor, raise your legs a bit higher (a smaller range) until your back stays supported.'
    },
    {
      id: 'co-russian-twist',
      name: 'Russian Twists',
      type: 'reps',
      target: '1-2 sets of 10-16 total twists',
      focus: 'Obliques, rotational core control',
      formCues: [
        'Sit with knees bent, leaning back slightly to about a 45-degree torso angle, chest tall.',
        'Clasp your hands together (or hold a light ball) in front of your chest.',
        'Rotate your torso to tap the floor beside one hip, then the other, keeping your chest lifted.',
        'Move at a controlled pace, not a fast twisting blur.'
      ],
      safetyNotes:
        'Keep your back straight rather than rounded through the twist — a rounded lower back under rotation is the thing to avoid here.'
    }
  ],

  fullBody: [
    {
      id: 'fb-burpee',
      name: 'Burpees (Step-Back Version)',
      type: 'reps',
      target: '1-2 sets of 5-10 reps',
      focus: 'Full-body strength and cardiovascular endurance',
      formCues: [
        'Start standing, then squat down and place your hands on the floor.',
        'Step (not jump, if that\'s easier on the joints) both feet back into a high plank.',
        'Do one push-up (optional, or lower to the floor and back up), then step both feet back up to your hands.',
        'Stand and finish with a small reach or hop overhead.'
      ],
      safetyNotes:
        'The step-back version is easier on the knees and wrists than jumping in and out — a fine substitute that still trains the same full-body pattern. Slow down anytime the movement feels rushed or sloppy.'
    },
    {
      id: 'fb-squat-to-press',
      name: 'Squat to Overhead Press',
      type: 'reps',
      target: '1-2 sets of 8-12 reps',
      focus: 'Legs, shoulders, full-body coordination',
      formCues: [
        'Hold a light medicine ball or a pair of light objects at shoulder height.',
        'Perform a bodyweight squat, keeping your chest up.',
        'As you stand up, press the weight straight overhead.',
        'Lower the weight back to your shoulders as you lower into the next squat.'
      ],
      safetyNotes:
        'Use light enough weight that your squat form doesn\'t change from adding the press — bodyweight-only squats are just as valid if no light weight is available.'
    },
    {
      id: 'fb-bear-crawl',
      name: 'Bear Crawl',
      type: 'time',
      target: '2-3 rounds of 15-20 seconds',
      focus: 'Full-body coordination, shoulder and core stability',
      formCues: [
        'Start on hands and feet, knees hovering just above the floor, hips low.',
        'Crawl forward by moving opposite hand and foot together (right hand + left foot, then left hand + right foot).',
        'Keep your back flat and hips level, not piking up in the air.',
        'Move slowly and under control.'
      ],
      safetyNotes:
        'Crawl on a clear, soft-enough surface (a rug or mat, not gravel) to protect hands and knees.'
    },
    {
      id: 'fb-farmer-carry',
      name: 'Farmer Carries',
      type: 'time',
      target: '2-3 rounds of 20-30 seconds of walking',
      focus: 'Grip, shoulders, core, full-body posture',
      formCues: [
        'Hold a moderately heavy, evenly weighted object (like two water jugs or light dumbbells) at your sides.',
        'Stand tall, shoulders back and down, core braced — don\'t let the weight pull you into a hunch.',
        'Walk at a normal, controlled pace for the set distance/time.',
        'Set the weights down with control at the end, don\'t drop them.'
      ],
      safetyNotes:
        'Choose a weight light enough that you can walk the whole time with tall, good posture — if your shoulders start hunching or you\'re shuffling, the weight is too heavy for right now.'
    },
    {
      id: 'fb-inchworm',
      name: 'Inchworms',
      type: 'reps',
      target: '1-2 sets of 6-10 reps',
      focus: 'Hamstring flexibility, shoulder and core strength',
      formCues: [
        'Stand tall, then hinge at the hips and walk your hands out on the floor to a high plank.',
        'Hold briefly in the plank, keeping your core braced.',
        'Walk your feet forward toward your hands, keeping your legs as straight as comfortable.',
        'Stand back up tall to finish one rep.'
      ],
      safetyNotes:
        'Bend your knees slightly if your hamstrings are tight — this should feel like a stretch-and-strength combo, not a painful pull.'
    },
    {
      id: 'fb-jump-squat',
      name: 'Squat Jumps',
      type: 'reps',
      target: '1-2 sets of 6-10 reps',
      focus: 'Legs, explosive power, bone-strengthening impact',
      formCues: [
        'Start in a bodyweight squat position.',
        'Explode upward into a jump, reaching arms overhead.',
        'Land softly, bending your knees immediately to absorb the landing, straight back into the squat position.',
        'Reset your breathing between reps if needed rather than rushing.'
      ],
      safetyNotes:
        'Landing softly with bent knees is the most important safety cue here — a stiff, straight-legged landing is what to avoid. This is a genuine bone-strengthening, impact-based activity, matching the CDC\'s recommendation of bone-strengthening activity at least 3 days a week.'
    },
    {
      id: 'fb-plank-jack',
      name: 'Plank Jacks',
      type: 'time',
      target: '2-3 rounds of 15-20 seconds',
      focus: 'Core, shoulders, cardiovascular endurance',
      formCues: [
        'Start in a high plank position.',
        'Jump both feet out wide, then jump them back together, like a jumping jack done in a plank.',
        'Keep your hips level and steady the whole time — they shouldn\'t bounce up and down.',
        'Land softly on the balls of your feet.'
      ],
      safetyNotes:
        'Slow the pace down if your hips start piking up or sagging — a slower, controlled plank jack still trains the same thing safely.'
    },
    {
      id: 'fb-renegade-row',
      name: 'Modified Renegade Rows (Plank Band Rows)',
      type: 'reps',
      target: '1-2 sets of 6-8 reps per side',
      focus: 'Core anti-rotation stability, back, shoulders',
      formCues: [
        'Loop a light resistance band under both hands in a high plank, or start from a wide-stance plank on knees if easier.',
        'Row one hand up toward your ribs while keeping your hips as still and square as possible.',
        'Lower with control, then switch sides.',
        'Widen your foot/knee stance for more stability if your hips are twisting a lot.'
      ],
      safetyNotes:
        'This is an advanced core-stability move — it\'s completely fine to do it from the knees instead of full plank while building up control.'
    },
    {
      id: 'fb-lunge-with-band-row',
      name: 'Lunge with Band Row',
      type: 'reps',
      target: '1-2 sets of 8-10 reps per side',
      focus: 'Legs, back, full-body coordination',
      formCues: [
        'Anchor a band at chest height in front of you.',
        'Step back into a reverse lunge while simultaneously rowing the band toward your ribs.',
        'Return to standing as you extend your arms back out, then repeat, alternating legs.',
        'Keep your torso upright through both the lunge and the row.'
      ],
      safetyNotes:
        'Master the lunge and the band row separately first if the combined movement feels rushed or off-balance — combining them is a later-stage progression, not a requirement.'
    },
    {
      id: 'fb-crab-walk',
      name: 'Crab Walk',
      type: 'time',
      target: '2 rounds of 15-20 seconds',
      focus: 'Triceps, shoulders, core, glutes',
      formCues: [
        'Sit with hands behind you, fingers pointing toward your feet, knees bent.',
        'Lift your hips off the ground so your body forms a tabletop shape.',
        'Walk forward or backward using opposite hand and foot together.',
        'Keep your hips lifted the whole time rather than letting them sag toward the floor.'
      ],
      safetyNotes:
        'A fun, playful full-body move — keep wrists aligned under shoulders to avoid strain.'
    }
  ],

  outdoorSports: [
    {
      id: 'os-basketball-shooting',
      name: 'Basketball Shooting Practice',
      type: 'time',
      target: '15-25 minutes',
      focus: 'Coordination, upper-body strength, cardiovascular activity',
      formCues: [
        'Warm up with a few minutes of easy dribbling and light jogging first.',
        'Practice good shooting form: elbow under the ball, follow through with your wrist snapping down.',
        'Mix in movement — shoot from different spots rather than standing in one place the whole time.',
        'Rest briefly between shooting sets if you\'re out of breath.'
      ],
      safetyNotes:
        'Great real-world way to hit the CDC\'s recommendation of 60+ minutes of moderate-to-vigorous activity most days — sport play counts fully toward that, not just structured workouts.'
    },
    {
      id: 'os-soccer-drills',
      name: 'Soccer Dribbling & Passing Drills',
      type: 'time',
      target: '15-25 minutes',
      focus: 'Footwork, coordination, cardiovascular endurance',
      formCues: [
        'Warm up with a light jog and some dynamic leg swings first.',
        'Practice dribbling with both the inside and outside of your foot, keeping the ball close.',
        'Set up simple passing targets (cones, water bottles) and practice accuracy at a jog.',
        'Include short bursts of faster running between drills to build real game-speed conditioning.'
      ],
      safetyNotes:
        'Play on a reasonably flat, clear surface, and wear real athletic shoes with good ankle support.'
    },
    {
      id: 'os-bike-ride',
      name: 'Bike Ride',
      type: 'time',
      target: '20-40 minutes',
      focus: 'Cardiovascular endurance, leg strength',
      formCues: [
        'Adjust the seat height so your knee has a slight bend at the bottom of the pedal stroke.',
        'Keep a steady, sustainable pace for most of the ride, with a few faster pushes mixed in if you want more of a workout.',
        'Use hand signals and follow real traffic/pedestrian safety rules if riding near roads.',
        'Cool down with a couple minutes of easy, slow pedaling at the end.'
      ],
      safetyNotes:
        'Always wear a properly fitted helmet. This is real vigorous aerobic activity toward the CDC\'s "at least 3 days a week" vigorous-activity guideline when ridden at a brisk pace.'
    },
    {
      id: 'os-swimming',
      name: 'Swimming',
      type: 'time',
      target: '20-30 minutes',
      focus: 'Full-body cardiovascular endurance, low-impact strength',
      formCues: [
        'Warm up with a few easy, relaxed laps or pool-walking first.',
        'Mix strokes (freestyle, backstroke, breaststroke) to work different muscle groups.',
        'Focus on steady, controlled breathing rather than rushing strokes.',
        'Take rest breaks at the wall as needed rather than pushing through exhaustion.'
      ],
      safetyNotes:
        'Only swim with proper supervision and in a safe, approved swimming area. Never swim alone.'
    },
    {
      id: 'os-basketball-scrimmage',
      name: 'Pickup Basketball / Scrimmage',
      type: 'time',
      target: '20-40 minutes',
      focus: 'Cardiovascular endurance, agility, teamwork',
      formCues: [
        'Warm up with light jogging and dynamic stretches before playing full-speed.',
        'Play at game intensity, but take water breaks between points/possessions as needed.',
        'Focus on moving your feet on defense and communicating with teammates.',
        'Cool down with a slow walk and some stretching after the game.'
      ],
      safetyNotes:
        'Real, vigorous, game-based activity — this fully counts toward the CDC\'s vigorous-aerobic-activity guideline, and it\'s a genuinely fun way to hit it.'
    },
    {
      id: 'os-hiking',
      name: 'Hiking / Nature Walk',
      type: 'time',
      target: '30-60 minutes',
      focus: 'Cardiovascular endurance, leg strength, balance on uneven terrain',
      formCues: [
        'Wear real closed-toe shoes with good tread, appropriate for the trail.',
        'Set a pace where you can talk but are still breathing harder than resting — pick up the pace on flatter stretches for more benefit.',
        'Watch your footing on uneven ground, roots, and rocks.',
        'Bring water, especially on warm days.'
      ],
      safetyNotes:
        'Tell a family member your route and expected return time before heading out on a real trail.'
    },
    {
      id: 'os-tennis',
      name: 'Tennis Rally Practice',
      type: 'time',
      target: '20-30 minutes',
      focus: 'Coordination, agility, cardiovascular endurance',
      formCues: [
        'Warm up with some easy rallying from the service line before moving to the baseline.',
        'Focus on a smooth, consistent swing rather than trying to hit every ball as hard as possible.',
        'Move your feet to get in position for each shot instead of just reaching with your arm.',
        'Take short breaks between rallying sets.'
      ],
      safetyNotes:
        'Court surfaces can get hot in direct sun — bring water and take shade breaks as needed.'
    },
    {
      id: 'os-frisbee',
      name: 'Ultimate Frisbee / Disc Games',
      type: 'time',
      target: '20-40 minutes',
      focus: 'Agility, cardiovascular endurance, hand-eye coordination',
      formCues: [
        'Warm up with some easy throwing and light jogging first.',
        'Practice both backhand and forehand throws for accuracy.',
        'When playing a game, focus on quick changes of direction and communicating with teammates.',
        'Take water breaks between points.'
      ],
      safetyNotes:
        'Play on open, clear grass or field space away from roads, obstacles, and other groups.'
    },
    {
      id: 'os-playground-circuit',
      name: 'Playground Strength Circuit',
      type: 'time',
      target: '15-25 minutes',
      focus: 'Upper-body and core strength, agility, fun outdoor movement',
      formCues: [
        'Use monkey bars for hanging holds or assisted pull-up attempts (feet lightly touching ground if needed).',
        'Use a low wall or bench for step-ups or incline push-ups.',
        'Mix in stretches of running or skipping between stations.',
        'Move between 3-4 stations for a couple rounds, resting briefly between each.'
      ],
      safetyNotes:
        'Check that equipment is sturdy and appropriately sized before using it, and land softly if dropping down from any hang.'
    },
    {
      id: 'os-skateboard-scooter',
      name: 'Skateboarding / Scootering',
      type: 'time',
      target: '20-30 minutes',
      focus: 'Balance, leg strength, coordination',
      formCues: [
        'Start on a flat, smooth, clear surface away from traffic.',
        'Keep knees slightly bent and weight centered for balance.',
        'Practice pushing off and gliding with control before attempting any tricks.',
        'Take breaks to avoid fatigue-related falls.'
      ],
      safetyNotes:
        'Always wear a helmet, and wrist/knee/elbow pads are strongly recommended, especially while still building balance and control.'
    }
  ],

  recovery: [
    {
      id: 'rm-easy-walk',
      name: 'Easy Recovery Walk',
      type: 'time',
      target: '15-25 minutes',
      focus: 'Gentle movement, blood flow, active recovery',
      formCues: [
        'Walk at a relaxed, easy pace — you should be able to talk in full sentences the whole time.',
        'Let your arms swing naturally and keep your posture tall and relaxed.',
        'Breathe easily and evenly.',
        'Use this time to notice how your body feels after a week of training, not to push a pace.'
      ],
      safetyNotes:
        'The whole point of a recovery day is low intensity — this should feel easy the entire time, never like a workout.'
    },
    {
      id: 'rm-full-body-stretch-routine',
      name: 'Full-Body Stretch Routine',
      type: 'time',
      target: '10-15 minutes',
      focus: 'Flexibility, muscle relaxation across the whole body',
      formCues: [
        'Move slowly through a sequence: neck, shoulders, chest, hips, hamstrings, quads, calves.',
        'Hold each stretch for about 20-30 seconds, breathing slowly and steadily.',
        'Never bounce — ease into each stretch gently and hold still.',
        'Stretch both sides evenly.'
      ],
      safetyNotes:
        'A stretch should feel like a gentle pull, never pain. Ease off immediately if anything feels sharp or pinchy.'
    },
    {
      id: 'rm-foam-roll',
      name: 'Foam Rolling (or Tennis Ball Self-Massage)',
      type: 'time',
      target: '8-12 minutes',
      focus: 'Muscle recovery, releasing tightness',
      formCues: [
        'Roll slowly over larger muscle groups (calves, quads, upper back) for about 30-45 seconds each.',
        'Pause a few extra seconds on any spot that feels especially tight, using gentle, comfortable pressure.',
        'Breathe slowly and stay relaxed rather than tensing up against the pressure.',
        'Avoid rolling directly over joints or bones.'
      ],
      safetyNotes:
        'Pressure should feel like a firm, comfortable massage, never sharp pain — ease off if it feels like too much.'
    },
    {
      id: 'rm-yoga-flow-beginner',
      name: 'Beginner Yoga Flow',
      type: 'time',
      target: '15-20 minutes',
      focus: 'Flexibility, balance, body awareness, calm breathing',
      formCues: [
        'Move slowly between simple poses: child\'s pose, downward dog, cat-cow, low lunge, seated forward fold.',
        'Hold each pose for 4-6 slow breaths before moving to the next.',
        'Focus on smooth, controlled breathing throughout — in through the nose, out through the mouth.',
        'Move at your own pace; this isn\'t timed or competitive.'
      ],
      safetyNotes:
        'Every pose should be comfortable enough to breathe calmly through it — back off any pose that feels strained.'
    },
    {
      id: 'rm-deep-breathing',
      name: 'Deep Breathing / Box Breathing',
      type: 'time',
      target: '5-8 minutes',
      focus: 'Recovery, nervous system reset, stress relief',
      formCues: [
        'Sit or lie in a comfortable position.',
        'Breathe in slowly through your nose for a count of 4.',
        'Hold gently for a count of 4, then breathe out slowly through your mouth for a count of 4.',
        'Repeat the cycle, keeping your shoulders relaxed the whole time.'
      ],
      safetyNotes:
        'If counting to 4 feels uncomfortable, use a shorter count — the goal is a slow, steady rhythm, not a specific number.'
    },
    {
      id: 'rm-hip-flexor-stretch',
      name: 'Kneeling Hip Flexor Stretch',
      type: 'time',
      target: '2 rounds of 20-30 seconds per side',
      focus: 'Hip flexibility (especially after running/jumping days)',
      formCues: [
        'Kneel on one knee with the other foot planted in front, both knees at roughly 90 degrees.',
        'Gently shift your hips forward while keeping your torso upright.',
        'You should feel a stretch in the front of the hip of your kneeling leg.',
        'Hold gently, then switch sides.'
      ],
      safetyNotes:
        'Kneel on a soft surface (mat, towel, or carpet) to protect your knee.'
    },
    {
      id: 'rm-shoulder-mobility-flow',
      name: 'Shoulder Mobility Flow',
      type: 'time',
      target: '8-10 minutes',
      focus: 'Shoulder joint mobility, recovery after upper-body/band days',
      formCues: [
        'Move slowly through arm circles, cross-body reaches, and gentle overhead reaches.',
        'Keep the movements slow and controlled, well within a comfortable range.',
        'Sync your breathing with the movement.',
        'Never force a stretch to go further than what feels easy and comfortable.'
      ],
      safetyNotes:
        'This is about restoring easy range of motion, not stretching to a limit — stay well inside a comfortable range.'
    },
    {
      id: 'rm-gentle-spine-twist',
      name: 'Seated Gentle Spine Twist',
      type: 'time',
      target: '2 rounds of 15-20 seconds per side',
      focus: 'Spinal mobility, gentle core release',
      formCues: [
        'Sit tall on the floor or a chair with a straight spine.',
        'Place one hand behind you and gently rotate your torso to look over that shoulder.',
        'Keep the twist gentle and controlled, coming from the whole spine rather than yanking the neck.',
        'Hold gently, then switch sides.'
      ],
      safetyNotes:
        'Keep this stretch light and easy — a gentle rotation, not a deep forced twist.'
    },
    {
      id: 'rm-mobility-circuit',
      name: 'Joint Mobility Circuit (Ankles, Hips, Wrists, Neck)',
      type: 'time',
      target: '10-12 minutes',
      focus: 'Overall joint mobility and body awareness',
      formCues: [
        'Move slowly through ankle circles, hip circles, wrist circles, and gentle neck rolls.',
        'Do about 8-10 slow, controlled circles at each joint, both directions.',
        'Stay within a comfortable, pain-free range the entire time.',
        'Use this as a chance to notice any spots that feel stiffer than others.'
      ],
      safetyNotes:
        'Nothing here should ever feel forced — mobility work should feel like gentle, easy motion.'
    },
    {
      id: 'rm-reflection-walk',
      name: 'Reflection & Goal-Setting Walk',
      type: 'time',
      target: '10-15 minutes',
      focus: 'Mental recovery, planning the week ahead',
      formCues: [
        'Take an easy walk (indoors or outdoors) at a relaxed pace.',
        'Use the time to think back on the past week\'s workouts — what felt strong, what felt hard.',
        'Think ahead to one real, specific goal for next week (not appearance-based — think strength, energy, or a skill).',
        'No pace or distance target — this is about the mental reset as much as the movement.'
      ],
      safetyNotes:
        'A great moment to log a Weekly Goal in the tracker afterward, framed around strength, energy, or skill — never how your body looks.'
    }
  ]
};

export function getExercisesForCategory(category) {
  return exerciseLibrary[category] || [];
}

export function getExerciseById(id) {
  for (const category of EXERCISE_CATEGORIES) {
    const found = exerciseLibrary[category].find((ex) => ex.id === id);
    if (found) return found;
  }
  return null;
}
