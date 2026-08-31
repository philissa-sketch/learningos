// ---------------------------------------------------------------------------
// CURATED EXERCISE DEMO VIDEOS — one specific, checked video per exercise.
//
// ---- WHY THIS FILE EXISTS ----
//
// The parent, Aug 10 2026: "Links were added to PE to youtube videos that has
// nothing in them. The links was supposed to show how to do the exercise."
// Then: "I will like to have videos linked so he can see the exercise."
//
// What was there before was not a video at all — it was a SEARCH scoped to one
// creator's channel, built fresh each time the page rendered. Thirty-four of
// the seventy exercises opened a page reading "This channel has no content that
// matched 'Bear Crawl form.'" Nobody could have checked it, because there was
// nothing fixed to check.
//
// This file is the opposite of that. Every entry is one specific video id,
// pinned. It can be opened, watched and replaced. If a video is pulled from
// YouTube the link breaks visibly rather than opening an empty search.
//
// ---- WHAT WAS AND WAS NOT CHECKED (read this before trusting it) ----
//
// For every one of the sixty-nine videos below I confirmed, on Aug 10 2026:
//   * the video id resolves — YouTube's oEmbed endpoint returns a record
//   * the exact title and channel recorded here are the ones YouTube returns
//   * the running time is what the search results reported
//   * the title is not body-image or weight-loss framing (a filter rejected
//     "shred", "six pack", "burn fat", "sexy", "booty" and similar outright)
//   * the equipment matches the exercise — a dumbbell demo was rejected for a
//     bodyweight movement, a demo without a band rejected for a band exercise
//
// I DID NOT WATCH ANY OF THEM. I cannot. A title, a channel and a duration are
// what a machine can verify; whether the coaching in the video is good, and
// whether the person on screen is someone you want your son learning from, is
// not. Treat this list as a first pass that saves you the searching, not as a
// vetted list. Every one of these can be replaced from the parent screen
// (PE > Exercise Videos), and anything you save there wins over what is here.
//
// ---- WHY ONE EXERCISE HAS NO VIDEO ----
//
// rm-easy-walk (Easy Recovery Walk) is deliberately absent. Nothing in the
// search results was a demonstration of walking; the candidates were adult
// podcast clips and a health-claims channel. He does not need a video to walk.
// Absent is an honest answer and stays available as one.
//
// ---- HOW THEY WERE PICKED ----
//
// YouTube search, videos-only, one query per exercise, top eight candidates
// each. Scored on: how much of the exercise name appears in the title;
// instructional wording ("proper form", "how to", "tutorial", "for
// beginners"); running time (15s-3min for a single movement, 2-15min for a
// routine or a sport); recognised coaching, physio and health-system channels;
// view count. Penalised: body-image framing, mismatched equipment, "common
// mistakes" videos that show the wrong thing first. Ten picks were overridden
// by hand where the top-scoring result was the wrong movement or the wrong
// tone for a twelve-year-old.
// ---------------------------------------------------------------------------

/**
 * exerciseId -> the one video to show for it.
 * title / channel / length are recorded so the parent screen can show what a
 * link is BEFORE anyone clicks it, and so a swapped-out video is obvious.
 */
export const EXERCISE_DEMO_VIDEOS = {
  // --- Upper body ---
  'ub-pushup-standard': { videoId: 'lsRAK6cr5kY', length: '1:14', channel: 'wikiHow', title: 'How to Do a Push Up' },
  'ub-incline-pushup': { videoId: '49jfZ_z7-us', length: '1:02', channel: 'Tom Morrison', title: 'Incline Push Ups // Learn to Push Up for Beginners!' },
  'ub-pike-pushup': { videoId: 'XckEEwa1BPI', length: '0:17', channel: 'National Academy of Sports Medicine (NASM)', title: 'How to do a Pike Push-Up' },
  'ub-resistance-band-row': { videoId: 'LSkyinhmA8k', length: '0:49', channel: 'Get Healthy U - with Chris Freytag', title: 'How To Do A Resistance Band Row' },
  'ub-resistance-band-press': { videoId: 'Rn-hf5iauTc', length: '0:53', channel: 'Fitness My Life', title: 'How To Do Chest Press With Resistance Band' },
  'ub-resistance-band-curl': { videoId: 'AaA7Yj3zHiU', length: '0:27', channel: 'YuryFit', title: 'How to do Bicep curls with resistance bands' },
  'ub-plank-shoulder-tap': { videoId: 'gKA5LBy7WAI', length: '1:58', channel: 'Wellen', title: 'How To Properly Do a Plank with Shoulder Taps' },
  'ub-medicine-ball-chest-pass': { videoId: 'RoPShN7cFso', length: '0:34', channel: 'Hart Athletics', title: 'How to Medicine Ball Chest Pass' },
  'ub-medicine-ball-slam': { videoId: 'YFORkljMrEQ', length: '2:22', channel: 'Seriously Strong Training', title: 'How to do Medicine Ball Slams for Core Strength and Conditioning' },
  'ub-doorframe-row': { videoId: 'SkFBcrHVGn4', length: '0:28', channel: 'Jesse Curkpatrick', title: 'HOW TO perform a TOWEL ROW to hit the back with no weights' },

  // --- Lower body ---
  'lb-bodyweight-squat': { videoId: 'P-yaD24bUE8', length: '0:47', channel: 'Runna', title: 'Bodyweight Squat Tutorial - Proper Form and Technique' },
  'lb-lunge-forward': { videoId: 'g8-Ge9S0aUw', length: '0:26', channel: 'PureGym', title: 'How To Do A Forward Lunge' },
  'lb-lunge-reverse': { videoId: 'u_zSfK5ZFU4', length: '0:55', channel: 'BuiltLean', title: 'Reverse Lunge Exercise: Proper Form' },
  'lb-glute-bridge': { videoId: 'wPM8icPu6H8', length: '2:09', channel: 'Well+Good', title: 'How To Do A Glute Bridge | The Right Way' },
  'lb-calf-raise': { videoId: 'k8ipHzKeAkQ', length: '1:02', channel: "Children's Hospital Colorado", title: 'Exercises with an Athletic Trainer: Standing Calf Raises' },
  'lb-step-up': { videoId: 'vOiHvzj5XhA', length: '0:36', channel: 'Runna', title: 'Step Up Tutorial - Proper Form and Technique' },
  'lb-wall-sit': { videoId: 'JaZNYM3zAP0', length: '1:40', channel: 'Well+Good', title: 'How To Do a Wall Sit | The Right Way' },
  'lb-lateral-band-walk': { videoId: '5VtGyiddPh4', length: '0:37', channel: 'Foundation Chiropractic + Physiotherapy', title: 'Banded Lateral Walks' },
  'lb-single-leg-balance': { videoId: 'G6p1aCQ9Yeo', length: '2:10', channel: 'Dr. Evan Chait', title: 'How to Perform Single Leg Balance Reach Exercise' },
  'lb-cossack-squat': { videoId: 'iPZNB5GsOnM', length: '0:16', channel: 'The Active Life', title: 'Cossack Squat Movement Demo' },

  // --- Cardio & stretch ---
  'cs-jump-rope': { videoId: 'u3zgHI8QnqE', length: '2:44', channel: 'Well+Good', title: 'How To Jump Rope | The Right Way' },
  'cs-jumping-jacks': { videoId: 'XR0xeuK5zBU', length: '1:26', channel: 'P4P WORKOUTS', title: 'How to do Jumping Jacks exercise - video tutorial' },
  'cs-high-knees': { videoId: 'tx5rgpDAJRI', length: '1:08', channel: 'LivestrongWoman', title: 'High Knees' },
  'cs-butt-kicks': { videoId: 'RSY2mAxUPqQ', length: '0:29', channel: 'Live Lean TV Daily Exercises', title: 'How To Do The BUTT KICKS JOG | Exercise Demonstration' },
  'cs-mountain-climbers': { videoId: 'cnyTQDSE884', length: '1:17', channel: 'Well+Good', title: 'How to Do Mountain Climbers | The Right Way' },
  'cs-forward-fold-stretch': { videoId: 'sEBFsU_CnNw', length: '2:40', channel: 'Body By Yoga', title: 'How To Do Forward Fold For Beginners' },
  'cs-quad-stretch': { videoId: 'kia2OzZiwqw', length: '0:22', channel: 'Runna', title: 'Standing Quad Stretch Tutorial - Proper Form and Technique' },
  'cs-shoulder-cross-stretch': { videoId: 'q1QZ3h8HVtw', length: '0:54', channel: 'Live Lean TV Daily Exercises', title: 'How To: Standing Cross Body Shoulder Stretch' },
  'cs-cat-cow-stretch': { videoId: 'y_cKHKi9UaM', length: '2:45', channel: 'Well+Good', title: 'How to do a Cat-Cow | The Right Way' },
  'cs-dynamic-arm-circles': { videoId: 'VT9Vz_YRbDA', length: '0:45', channel: 'Bronte Vollebregt', title: 'Dynamic Stretching - Arm Circles' },

  // --- Core ---
  'co-plank': { videoId: 'mH5Sfb_KTGg', length: '1:42', channel: 'Well+Good', title: 'How to do a Forearm Plank | The Right Way' },
  'co-side-plank': { videoId: 'NXr4Fw8q60o', length: '1:54', channel: 'Howcast', title: 'How to Do a Side Plank' },
  'co-dead-bug': { videoId: 'psOZS-sVDww', length: '2:43', channel: 'Dr. Brian Abelson', title: 'Dead Bug Exercise Beginner - Strengthen and Stabilize Your Core' },
  'co-bird-dog': { videoId: 'wiFNA3sqjCA', length: '1:05', channel: 'Howcast', title: 'How to Do the Bird Dog Exercise' },
  'co-bicycle-crunch': { videoId: 'iAb1qlJvD9c', length: '1:10', channel: 'Howcast', title: 'How to Do Bicycle Crunches' },
  'co-reverse-crunch': { videoId: 'ewrE2xDXClU', length: '1:49', channel: 'Brian Syuki', title: 'How to Do Reverse Crunches for Beginners (with Instructions)' },
  'co-plank-up-down': { videoId: '9CvuiMeWQZo', length: '1:07', channel: 'Tone and Tighten', title: 'How to do an Up-Down Plank' },
  'co-hollow-hold': { videoId: 'TNHSgs_orU0', length: '1:24', channel: 'Well+Good', title: 'How to do a Hollow Hold | The Right Way' },
  'co-flutter-kicks': { videoId: 'K5wuM_gNWyw', length: '0:44', channel: 'Leap Fitness', title: 'How to Do: FLUTTER KICKS' },
  'co-russian-twist': { videoId: 'wkD8rjkodUI', length: '1:32', channel: 'Howcast', title: 'How to Do a Russian Twist' },

  // --- Full body ---
  'fb-burpee': { videoId: 'NCqbpkoiyXE', length: '0:52', channel: 'Nuffield Health', title: 'How To Burpee' },
  'fb-squat-to-press': { videoId: '0RJXwEZmcCg', length: '1:06', channel: 'Lift With Michelle - Exercise Form Tutorials', title: 'Dumbbell Thruster (Squat and Press) | Exercise Tutorial' },
  'fb-bear-crawl': { videoId: 'U3Y58Kyw7Xw', length: '0:39', channel: 'Runna', title: 'Bear Crawl Tutorial - Proper Form and Technique' },
  'fb-farmer-carry': { videoId: 'lLAw6fUccKA', length: '0:35', channel: 'Runna', title: "Farmer's Carry Tutorial - Proper Form and Technique" },
  'fb-inchworm': { videoId: 'VSp0z7Mp5IU', length: '1:29', channel: 'Howcast', title: 'How to Do an Inchworm' },
  'fb-jump-squat': { videoId: 'tZSYZdtbONc', length: '0:19', channel: 'National Academy of Sports Medicine (NASM)', title: 'How to do a Squat Jump | Proper Form & Technique' },
  'fb-plank-jack': { videoId: '8hjjYN7uKT8', length: '1:21', channel: 'Well+Good', title: 'How to do a Plank Jack | The Right Way' },
  'fb-renegade-row': { videoId: '_I98ircIcpE', length: '0:58', channel: 'Get Healthy U - with Chris Freytag', title: 'How To Do Renegade Rows' },
  'fb-lunge-with-band-row': { videoId: 'ZDJBThkqtbw', length: '0:49', channel: 'UpwardBalance', title: 'Reverse Lunge with Row using Resistance Bands' },
  'fb-crab-walk': { videoId: 'XAHZRIoNsHE', length: '1:08', channel: 'Rothman Orthopaedics', title: 'How to Do Crabwalk Exercises' },

  // --- Outdoor & sport ---
  'os-basketball-shooting': { videoId: 'nuiPr66rCcw', length: '6:08', channel: 'ILoveBasketballTV', title: 'How To Shoot a Basketball PERFECTLY' },
  'os-soccer-drills': { videoId: 'O-njByyCFk4', length: '5:53', channel: 'Kreider Academy', title: 'The BEST Dribbling Drills for Young Soccer Players & Beginners' },
  'os-bike-ride': { videoId: '280oreUTr6o', length: '1:35', channel: 'Transport Victoria', title: 'How to be a safe bike rider' },
  'os-swimming': { videoId: 'Gq2asyrI0MI', length: '5:16', channel: 'Rocket Swimming', title: 'Freestyle Swimming Breathing Technique | Step-by-Step Drills For Beginners' },
  'os-basketball-scrimmage': { videoId: '7up5JWqsmBY', length: '4:37', channel: 'Coach Russ', title: 'Basketball for Beginners: How the Game Works' },
  'os-hiking': { videoId: 'aIa9u3ZE6y0', length: '2:46', channel: 'REI', title: 'What to Bring on a Day Hike' },
  'os-tennis': { videoId: 'vA-JZ-BGNAQ', length: '8:46', channel: 'Tennis with Coach Alfred', title: 'How to hit a FOREHAND in Tennis (Beginner Guide with Easy Steps!)' },
  'os-frisbee': { videoId: 'YkMMqOUNyKk', length: '2:51', channel: 'Excel Ultimate', title: 'How to Play Ultimate Frisbee for Beginners' },
  'os-playground-circuit': { videoId: 'cfFV3_ue2gk', length: '3:01', channel: 'Veggie Vlad', title: 'Bodyweight Circuit at Kids Playground' },
  'os-skateboard-scooter': { videoId: 'p3NXd3DhH08', length: '5:42', channel: 'Braille Skateboarding', title: 'HOW TO SKATEBOARD FOR BEGINNERS | EPISODE 1' },

  // --- Recovery & mobility ---
  // 'rm-easy-walk' is intentionally absent — see the header.
  'rm-full-body-stretch-routine': { videoId: 'COO2S7lPBzA', length: '10:49', channel: 'Tone and Tighten', title: '10 Minute Total Body Stretch! [Daily Flexibility Routine for Beginners]' },
  'rm-foam-roll': { videoId: 'vRZdDalRz0U', length: '13:11', channel: 'Juice & Toya', title: '10 Minute Full Body Foam Roller Session [Guided For Beginners]' },
  'rm-yoga-flow-beginner': { videoId: 'C2RAjUEAoLI', length: '11:18', channel: 'Yoga with Kassandra', title: '10 min Gentle Morning Yoga for Beginners (NO PROPS)' },
  'rm-deep-breathing': { videoId: 'I0U0U2aShTw', length: '2:01', channel: 'Travis Goodman', title: 'HOW TO Practice BOX BREATHING: Grounding Exercise' },
  'rm-hip-flexor-stretch': { videoId: '6o-GpPIGR5w', length: '0:40', channel: 'Runna', title: 'Kneeling Hip Flexor Stretch Tutorial - Proper Form and Technique' },
  'rm-shoulder-mobility-flow': { videoId: '_3FoSnnLRuU', length: '14:43', channel: 'Journey to Mobility', title: '12 min Shoulder Mobility Stretches & Exercises (Follow Along)' },
  'rm-gentle-spine-twist': { videoId: '7CKr-RgOcIc', length: '2:24', channel: 'Howcast', title: 'How to Do a Seated Spinal Twist Pose' },
  'rm-mobility-circuit': { videoId: 'Ru1hYrwCZJo', length: '8:46', channel: 'Calisthenicmovement', title: 'The BEST Mobility Exercises For Each Joint!' },
  'rm-reflection-walk': { videoId: '29sxsubdzj4', length: '10:08', channel: 'National Center on Health, Physical Activity and Disability (NCHPAD)', title: 'The Ultimate 10 Minute Inclusive Walking Meditation' }
};

/** The date the ids above were confirmed to resolve. Re-check periodically. */
export const CURATED_VERIFIED_ON = '2026-08-10';

/**
 * A curated pick for one exercise, or null.
 * Always a watch URL for one specific video — never a search, never a channel.
 */
export function curatedDemoFor(exerciseId) {
  const v = EXERCISE_DEMO_VIDEOS[exerciseId];
  if (!v || !v.videoId) return null;
  return {
    url: `https://www.youtube.com/watch?v=${v.videoId}`,
    videoId: v.videoId,
    title: v.title,
    channel: v.channel,
    length: v.length
  };
}
