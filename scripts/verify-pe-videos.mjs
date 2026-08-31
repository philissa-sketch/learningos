// ---------------------------------------------------------------------------
// PE DEMO VIDEOS: EVERY LINK IS ONE PINNED VIDEO, AND THE SCREEN SAYS SO.
// Run: node scripts/verify-pe-videos.mjs
//
// ---- ROUND ONE (Aug 10 2026) ----
//
// The parent: "Links were added to PE to youtube videos that has nothing in
// them. The links was supposed to show how to do the exercise."
//
// Measured against the live channel across all seventy exercises: **34 of them
// — 49% — opened a page reading "This channel has no content that matched
// 'Bear Crawl form.'"** Cat-Cow Stretch, Glute Bridges, Bird Dog, Dead Bug,
// Mountain Climbers, Bear Crawl, Box Breathing, every stretch, every sport.
//
// The cause was a default nobody could check: whenever she had not saved a
// video, the student was handed a SEARCH scoped to one creator's channel, built
// at render time from the exercise name. It rendered differently for every
// exercise and had never been opened for any of them.
//
// ---- ROUND TWO (same day) ----
//
// Her next message: "I will like to have videos linked so he can see the
// exercise." Seventy videos is not a realistic thing to ask a parent to source
// before the feature works at all, so there are defaults now — but the fix for
// a guess is not a better guess. exerciseDemoVideos.js pins ONE SPECIFIC VIDEO
// ID per exercise, each confirmed to resolve, each recorded with its title,
// channel and running time so it can be reviewed without being hunted for.
//
// So this file guards two different things, and they pull in opposite
// directions on purpose:
//
//   * NOTHING may be assembled at render time. Not a search, not a channel, not
//     a URL built from a name. That is round one and it must never come back.
//   * The curated table must be well-formed, complete, and unique — a bad id or
//     a duplicated id is round one wearing a different coat.
//
// And the third thing, which is what actually caused the parent to be misled:
//
//   * THE PARENT SCREEN MUST DESCRIBE WHAT THE CODE DOES. ExerciseVideoManager
//     used to promise "nothing is linked by default" while a third file linked a
//     channel search. It is not enough for the behaviour to be right; the
//     sentence on the screen has to move when the behaviour moves. It now has
//     to say both that defaults exist AND that nobody has watched them.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { demoLinkFor, HIDDEN_VIDEO } from '../src/academies/lamar/data/pe/peVideoSource.js';
import {
  EXERCISE_DEMO_VIDEOS,
  CURATED_VERIFIED_ON,
  curatedDemoFor
} from '../src/academies/lamar/data/pe/exerciseDemoVideos.js';
import { exerciseLibrary } from '../src/academies/lamar/data/pe/exerciseLibrary.js';
import { parseTimedTarget, parseMinutesRange } from '../src/lib/exerciseTiming.js';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
}
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');
const strip = (src) => src.split('\n').filter((l) => !/^\s*(\*|\/\/|\/\*)/.test(l)).join('\n');
const ALL = Object.values(exerciseLibrary).flat();

// Exercises deliberately left with no video, and why. An entry here is a
// decision; an exercise missing from BOTH this list and the curated table is a
// gap, and check 3 fails on it.
const NO_VIDEO_ON_PURPOSE = {
  'rm-easy-walk': 'nothing in the results demonstrated walking — the candidates were adult podcast clips and a health-claims channel'
};

console.log(`\nexercises: ${ALL.length}   curated: ${Object.keys(EXERCISE_DEMO_VIDEOS).length}`);

console.log('\n--- 1. no url is ever assembled at render time ---');
{
  const src = strip(read('src/academies/lamar/data/pe/peVideoSource.js'));
  ok('peVideoSource builds no youtube url at all', !/youtube\.com/i.test(src),
    'a channel search built here is what produced 34 empty pages');
  ok('...and no search url of any kind', !/search\?query|search_query|\/results/i.test(src));
  ok('the creator-channel default is gone for good',
    !/channelSearchUrl|VIDEO_SOURCES|DEFAULT_SOURCE_ID/.test(src));

  const data = strip(read('src/academies/lamar/data/pe/exerciseDemoVideos.js'));
  ok('the curated table builds only watch urls', !/search_query|\/results|\/@|youtube\.com\/c\//i.test(data),
    'a channel or search url in the data file is the same fault one layer down');
  const urls = [...data.matchAll(/youtube\.com\/([a-z?=$\{\}\w.]+)/gi)].map((m) => m[1]);
  ok('...and every one of them is watch?v=', urls.length > 0 && urls.every((u) => u.startsWith('watch?v=')),
    urls.filter((u) => !u.startsWith('watch?v=')).join(', '));

  const workout = strip(read('src/components/PE/WorkoutView.jsx'));
  ok('the student workout screen builds no url either', !/youtube\.com/i.test(workout));
  ok('it renders nothing when there is no link',
    /if \(!link\) return null;/.test(read('src/components/PE/WorkoutView.jsx')));
}

console.log('\n--- 2. the curated table is well-formed ---');
{
  const entries = Object.entries(EXERCISE_DEMO_VIDEOS);
  const badId = entries.filter(([, v]) => !/^[A-Za-z0-9_-]{11}$/.test(v.videoId || ''));
  ok('every videoId is a real 11-character YouTube id', badId.length === 0,
    badId.map(([k]) => k).join(', '));

  const missingMeta = entries.filter(([, v]) => !v.title || !v.channel || !v.length);
  ok('every entry records its title, channel and running time', missingMeta.length === 0,
    missingMeta.map(([k]) => k).join(', '),);

  const known = new Set(ALL.map((e) => e.id));
  const orphans = entries.filter(([k]) => !known.has(k));
  ok('no entry points at an exercise that does not exist', orphans.length === 0,
    orphans.map(([k]) => k).join(', '));

  const seen = new Map();
  const dupes = [];
  for (const [k, v] of entries) {
    if (seen.has(v.videoId)) dupes.push(`${k} = ${seen.get(v.videoId)}`);
    else seen.set(v.videoId, k);
  }
  ok('no two exercises share a video id', dupes.length === 0,
    `${dupes.join('; ')} — a duplicate is a copy-paste error showing the wrong movement`);

  ok('the table records when the ids were last confirmed to resolve',
    /^\d{4}-\d{2}-\d{2}$/.test(CURATED_VERIFIED_ON || ''),
    'links rot; a date is what makes "re-check these" an actionable sentence');
}

console.log('\n--- 3. every exercise is either covered or covered by a decision ---');
{
  const uncovered = ALL.filter((e) => !curatedDemoFor(e.id) && !NO_VIDEO_ON_PURPOSE[e.id]);
  ok('no exercise silently lacks a video', uncovered.length === 0,
    uncovered.map((e) => `${e.id} (${e.name})`).join(', '));

  const staleExceptions = Object.keys(NO_VIDEO_ON_PURPOSE).filter((id) => curatedDemoFor(id));
  ok('the deliberate-exception list has no stale entries', staleExceptions.length === 0,
    staleExceptions.join(', '));

  ok('every exception carries a stated reason',
    Object.values(NO_VIDEO_ON_PURPOSE).every((r) => typeof r === 'string' && r.length > 25));
}

console.log('\n--- 4. precedence: hers, then the default, then nothing ---');
{
  const a = ALL[0];
  const b = ALL[1];

  const link = demoLinkFor(a, { savedVideos: { [a.id]: 'https://youtu.be/abc123' } });
  ok('her saved video is what he opens', link && link.url === 'https://youtu.be/abc123');
  ok('...and it is marked as hers', link && link.kind === 'parent');
  ok('...even though a curated default exists for it', Boolean(curatedDemoFor(a.id)));

  const def = demoLinkFor(b, { savedVideos: {} });
  ok('with nothing saved, the curated default is shown',
    def && def.url === curatedDemoFor(b.id).url);
  ok('...and it is marked as a default, not as hers', def && def.kind === 'curated');
  ok('...and it carries the title and channel for the parent screen',
    def && Boolean(def.title) && Boolean(def.channel));

  ok('HIDDEN means nothing, not the default',
    demoLinkFor(a, { savedVideos: { [a.id]: HIDDEN_VIDEO } }) === null,
    'without this she cannot remove a default she does not like');
  ok('the master switch still silences everything',
    demoLinkFor(a, { savedVideos: {}, enabled: false }) === null &&
    demoLinkFor(a, { savedVideos: { [a.id]: 'https://youtu.be/x' }, enabled: false }) === null);
  ok('a missing exercise does not throw', demoLinkFor(undefined, { savedVideos: {} }) === null);
  ok('an exercise with no curated video and nothing saved gets nothing',
    demoLinkFor({ id: 'rm-easy-walk' }, { savedVideos: {} }) === null);
  ok('a video saved for ANOTHER exercise never leaks across',
    demoLinkFor({ id: 'not-a-real-exercise' }, { savedVideos: { [a.id]: 'https://youtu.be/abc123' } }) === null);

  const store = read('src/store/useAppStore.js');
  ok('the store accepts the HIDDEN sentinel',
    /trimmed !== 'none'/.test(store),
    "otherwise Hide is rejected as a bad url and she is stuck with the default");
  ok('...and still refuses anything that is not http(s)',
    /\^https\?:\\\/\\\/\/i\.test\(trimmed\)/.test(store),
    'a javascript: url here would be handed straight to a link he taps');
}

console.log('\n--- 5. the parent screen describes what the code actually does ---');
{
  const mgr = read('src/components/PE/ExerciseVideoManager.jsx');

  ok('the old promise is gone',
    !/nothing is linked by default/.test(mgr),
    'that sentence is now false, and a false promise here is what started all of this');
  ok('the screen says the defaults are NOT watched',
    /None of them has been watched/i.test(mgr),
    'the one thing a machine cannot verify has to be said out loud, not implied');
  ok('...and that hers replaces them', /replaces it|replace the default/i.test(mgr));
  ok('she can remove a default she does not want', /HIDDEN_VIDEO/.test(mgr) && /Hide/.test(mgr));
  ok('each row shows what he would actually open',
    /curatedDemoFor\(exercise\.id\)/.test(mgr) && /curated\.title/.test(mgr) && /curated\.channel/.test(mgr),
    'reviewing 69 videos has to be reading a line, not hunting for one');
  ok('she still gets a search, on her own gated screen', /search_query=/.test(mgr));
  ok('she can see the coverage count', /of \{total\} exercises have a video/.test(mgr));
  ok('...and how many are her own picks', /you chose yourself/.test(mgr));
}

console.log('\n--- 6. an exercise with no video is still teachable ---');
{
  // The whole reason "no link" stays an acceptable outcome rather than a gap.
  const noCues = ALL.filter((e) => !Array.isArray(e.formCues) || e.formCues.length < 2);
  ok('every exercise carries at least two form cues', noCues.length === 0,
    noCues.slice(0, 5).map((e) => e.name).join(', '));
  const noSafety = ALL.filter((e) => !e.safetyNotes || String(e.safetyNotes).trim().length < 20);
  ok('every exercise carries a real safety note', noSafety.length === 0,
    noSafety.slice(0, 5).map((e) => e.name).join(', '));
  ok('every exercise has a name and a focus', ALL.every((e) => e.name && e.focus));
}


console.log('\n--- 7. a held position gets a timer; a bike ride does not ---');
{
  /**
   * The parent, Aug 11 2026: "can you place timers on the workouts ex. wall
   * sit have a 40 sec timer on it."
   *
   * Twenty of the seventy exercises are holds measured in seconds. Counting
   * in your head is the first thing to go when your legs are shaking, and a
   * twelve-year-old counts fast when it hurts.
   *
   * The other eighteen `type: 'time'` exercises are SESSIONS measured in
   * minutes — a bike ride, a hike, a yoga flow. A countdown on a laptop he
   * has left in the kitchen helps nobody, and would teach him to interrupt
   * the workout to press a button. The split is the point of this section.
   */
  const timed = ALL.filter((e) => parseTimedTarget(e.target));
  const untimed = ALL.filter((e) => !parseTimedTarget(e.target));

  ok('every rounds-and-seconds hold is timeable', timed.length === 20, `${timed.length}`);
  ok('nothing measured in minutes gets a countdown',
    untimed.filter((e) => /\brounds?\b[\s\S]*seconds/i.test(e.target)).length === 0);
  ok('a minutes-only session is not timed',
    !parseTimedTarget('20-40 minutes') && !parseTimedTarget('15-25 minutes'));
  ok('a reps target is not timed', !parseTimedTarget('1-2 sets of 6-12 reps'));

  const wallSit = ALL.find((e) => e.id === 'lb-wall-sit');
  const spec = parseTimedTarget(wallSit.target);
  ok('wall sit reads as 2-3 rounds of 20-40 seconds',
    spec.roundsMin === 2 && spec.roundsMax === 3 && spec.secondsMin === 20 && spec.secondsMax === 40,
    JSON.stringify(spec));
  ok('...so the default offered is 40 seconds, the top of the range',
    spec.secondsMax === 40,
    'the range is a build-up, not a menu — the goal is the default');

  const perSide = ALL.map((e) => parseTimedTarget(e.target)).filter(Boolean).filter((p) => p.perSide);
  ok('per-leg and per-side holds are recognised as such', perSide.length >= 5,
    `${perSide.length} — he has to be told to switch, not silently given double the rounds`);

  const timer = read('src/components/PE/ExerciseTimer.jsx');
  ok('the countdown runs off wall-clock time, not accumulated ticks',
    /Date\.now\(\) \+ seconds \* 1000/.test(timer) && /endsAt - Date\.now\(\)/.test(timer),
    'a background tab throttles timers — an accumulating one drifts long and shortens every set');
  ok('it ends with a sound', /playTimerDone\(\)/.test(timer),
    'the point of a wall sit is that he is looking at the floor, not the screen');
  ok('...and warns at ten seconds', /playTimerWarning\(\)/.test(timer));
  ok('the first tap unlocks audio, like the bell', /unlockAudio\(\)/.test(timer));
  ok('the timer sounds are NOT the class bell',
    !/playSchoolBell|playBellSwitch/.test(timer),
    'that one means stop and switch subjects, and it rings across the house');
  ok('it counts rounds', /Round \{round\} of \{spec\.roundsMax\}/.test(timer));
  ok('a per-side hold says to switch', /Switch \{spec\.sideLabel\}s/.test(timer));

  const workout = read('src/components/PE/WorkoutView.jsx');
  ok('the workout screen renders it', /<ExerciseTimer exercise=\{ex\} \/>/.test(workout));

  /**
   * ---- THE WARM-UP, ADDED AFTER SHE ASKED (Aug 11, 2026) ----
   *
   * "the timer isn't on the lower body strength warmup for 3 - 5 minutes."
   *
   * The first pass timed only rounds-and-seconds holds. The warm-up is the
   * case that reasoning missed: it is minutes, but it happens on the spot in
   * front of the screen, and "3-5 minutes of light movement" is exactly what
   * gets shortened to ninety seconds when nothing is counting.
   */
  ok('a warm-up written in minutes is parseable',
    JSON.stringify(parseMinutesRange('3-5 minutes of light movement (easy jogging in place)')) === '{"minutesMin":3,"minutesMax":5}');
  ok('a recovery day carries no minutes, so it gets no timer',
    parseMinutesRange('No warm-up needed today — recovery days are meant to be gentle from the start.') === null);
  ok('the warm-up timer is mounted', /label: 'Warm-up'/.test(workout) && /parseMinutesRange\(workout\.warmup\)/.test(workout));
  ok('...as a single round, so no "Round 1 of 1" appears',
    /roundsMax: 1/.test(workout) && /spec\.roundsMax > 1 \?/.test(read('src/components/PE/ExerciseTimer.jsx')));
  ok('a minute-scale timer is labelled in minutes, not 300s',
    /value >= 60 \? `\$\{Math\.round\(value \/ 60\)\} min`/.test(read('src/components/PE/ExerciseTimer.jsx')));
}

console.log('\n--- 8. the alarms are actually audible ---');
{
  /**
   * The parent: "make the alarms louder I could barely hear it."
   *
   * These sat at reward-sound levels — right for a coin chiming beside you,
   * wrong for a signal that has to cross a room and land on someone lying on
   * the floor mid-plank. The fix is not only a bigger number: raising gains
   * on the school bell (seven inharmonic partials struck twenty times a
   * second) would have pushed the sum past 1.0 into hard clipping, which
   * sounds broken rather than loud. Hence the limiter.
   */
  const sfx = read('src/lib/sfx.js');
  ok('there is a limiter across the whole output',
    /createDynamicsCompressor/.test(sfx) && /limiter\.ratio\.setValueAtTime\(20/.test(sfx),
    'without it, louder alarms clip instead of getting louder');
  ok('every voice is routed through it, not straight at the speakers',
    !/amp\.connect\(ctx\.destination\)/.test(sfx) && (sfx.match(/getMaster\(\) \|\| ctx\.destination/g) || []).length >= 2);
  ok('the limiter is built once and reused', /if \(masterNode\) return masterNode;/.test(sfx));
  ok('a failure to build it still leaves sound working', /masterNode = ctx\.destination;/.test(sfx),
    'no alarm at all is far worse than an unlimited one');

  const gainOf = (fn, re) => {
    const body = sfx.slice(sfx.indexOf(`export function ${fn}`), sfx.indexOf(`export function ${fn}`) + 700);
    const m = re.exec(body);
    return m ? Number(m[1]) : null;
  };
  ok('the end-of-set chime is loud', gainOf('playTimerDone', /gain: ([\d.]+)/) >= 0.35,
    `${gainOf('playTimerDone', /gain: ([\d.]+)/)} — it was 0.14`);
  ok('...and sounds twice, because once is missable',
    /phrase\(0\), \.\.\.phrase\(0\.62\)/.test(sfx));
  ok('the ten-second warning is audible but not startling',
    gainOf('playTimerWarning', /gain: ([\d.]+)/) >= 0.18);
  ok('the school bell is loud', /gain = 0\.3 \} = \{\}\) \{/.test(sfx), 'it has to carry across the house');
  ok('the bell warning was raised with it', gainOf('playBellWarning', /gain: ([\d.]+)/) >= 0.15);
  ok('her volume setting still applies to all of it',
    (sfx.match(/settings\.volume/g) || []).length >= 2,
    'louder by default must not mean the volume control stopped working');
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
