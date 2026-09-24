// ---------------------------------------------------------------------------
// check-morning-circle — Morning Circle, Dr. Marigold's voice, and the test
// rules approved by Gigi on Sept 23 2026.
//
// Run from the learningos folder:
//     node src/academies/petal-pestle-academy/checks/check-morning-circle.mjs
//     node src/academies/petal-pestle-academy/checks/check-morning-circle.mjs --self-test
//
// It lives in HER folder, not scripts/, for the same reason check-reading-course
// does: the platform suite is shared with another school.
//
// ---- WHY THIS EXISTS ----
// Her record, Sept 12–23 2026: Morning Circle ticked on every school day (once
// seven seconds before Mathematics), zero warm-up questions answered, 152 of
// 188 review cards overdue, three tests sat in one day, re-takes sat without
// going back to the lessons, "Read it to me" used on 0 of 50 test questions,
// and one test that asked the same question twice under two ids.
//
// ---- WHAT IT ASSERTS ----
//  1. WARM-UP SIZE — 5 while more than 30 cards are due, then 3; and the store
//     asks warmUpSize() for it.
//  2. CIRCLE IS FINISHED, NOT TICKED — it can only finish with the warm-up done
//     (or nothing to warm up on) AND the plants watered; its tick on Today
//     opens the Circle screen; the warm-up lives in Circle and not on Home;
//     Morning Circle's block opens the Circle screen.
//  3. REMINDER, NOT LOCK — other blocks go through the reminder on Today; the
//     reminder offers "Continue anyway"; the Circle block never reminds itself.
//  4. DR. MARIGOLD'S WORDS — greeting names her, Morning Circle and the
//     warm-up; "Good morning" before noon, "Hello" after; each line once a day.
//  5. HER VOICE — run against a pretend browser: a line waits for her first tap
//     (on pointerup, which a touch screen needs), is spoken once, is marked
//     said only once spoken, and the Grown-Up Corner switch silences it.
//  6. ONE TEST A DAY — a weekly or quarter test today closes the next one; a
//     reading check does not count.
//  7. RE-TAKE AFTER GOING BACK — a re-take opens only when every lesson missed
//     on the last attempt has been re-read AFTER it; the 2-day and 3-attempt
//     rules still hold; LessonsView uses testGate for both kinds of test.
//  8. NO QUESTION TWICE ON ONE PAPER — every weekly paper in every course, for
//     attempts 1–3, and the quarter papers, are built and compared by the
//     question's words, not its id.
//  9. READ-ALOUD REMINDER — on the first question of weekly and quarter tests.
//
// ---- WHAT IT DOES NOT TEST ----
//  · That the screens look right. They are checked by eye after the build.
//  · That Chrome on her Chromebook actually plays the voice. Only a real
//    browser can say that; the pretend one proves the logic around it.
//
// --self-test puts each bug back in, one at a time (in the real source, loaded
// from a temporary copy), and fails if this check does not catch it.
// ---------------------------------------------------------------------------

import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { tmpdir } from 'node:os';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const SELF_TEST = process.argv.includes('--self-test');

const SRC = {
  circleLib: 'lib/morningCircle.js',
  voiceLib: 'lib/marigoldVoice.js',
  speech: 'lib/speech.js',
  message: 'components/Mentor/MarigoldMessage.jsx',
  gateLib: 'lib/testGate.js',
  engine: 'lib/assessmentEngine.js',
  links: 'lib/blockLinks.js',
  store: 'store/useAppStore.js',
  today: 'components/Schedule/TodayView.jsx',
  circleView: 'components/Schedule/MorningCircleView.jsx',
  home: 'components/Home/HomeDashboard.jsx',
  school: 'screens/HerSchool/HerSchool.jsx',
  lessons: 'components/Lessons/LessonsView.jsx',
  test: 'components/Assess/TestView.jsx',
  parent: 'components/Parent/ParentDashboard.jsx'
};

const read = (rel) => readFileSync(join(ROOT, rel), 'utf8');

// A temporary copy of a module whose relative imports point back at the real
// files, so one line can be broken without touching her folder.
let tmp = null;
let tmpN = 0;
async function loadModule(rel, source) {
  if (source == null) return import(pathToFileURL(join(ROOT, rel)).href + `?v=${tmpN++}`);
  tmp = tmp || mkdtempSync(join(tmpdir(), 'pp-circle-'));
  const dir = dirname(join(ROOT, rel));
  const fixed = source.replace(/from\s+'(\.{1,2}\/[^']+)'/g, (_, p) => `from '${pathToFileURL(resolve(dir, p)).href}'`);
  const file = join(tmp, `m${tmpN++}-${rel.replace(/[\\/]/g, '_')}`);
  writeFileSync(file, fixed);
  return import(pathToFileURL(file).href);
}

// ---------------------------------------------------------------------------
// A pretend browser, just enough for marigoldVoice.js and speech.js.
// ---------------------------------------------------------------------------
function pretendBrowser({ tapped }) {
  const store = new Map();
  const listeners = new Map();
  const spoken = [];
  const win = {
    localStorage: {
      getItem: (k) => (store.has(k) ? store.get(k) : null),
      setItem: (k, v) => store.set(k, String(v)),
      removeItem: (k) => store.delete(k)
    },
    speechSynthesis: {
      getVoices: () => [{ name: 'Samantha', lang: 'en-US', localService: true }],
      speak: (u) => spoken.push(u.text),
      cancel: () => {
        win.cancels++;
      },
      speaking: false,
      pending: false,
      addEventListener: () => {},
      removeEventListener: () => {},
      onvoiceschanged: null
    },
    addEventListener: (t, fn) => listeners.set(t, [...(listeners.get(t) || []), fn]),
    removeEventListener: (t, fn) => listeners.set(t, (listeners.get(t) || []).filter((f) => f !== fn)),
    cancels: 0,
    fire: (t) => [...(listeners.get(t) || [])].forEach((fn) => fn({ type: t })),
    listening: (t) => (listeners.get(t) || []).length
  };
  globalThis.window = win;
  globalThis.localStorage = win.localStorage;
  globalThis.SpeechSynthesisUtterance = class {
    constructor(text) {
      this.text = text;
    }
  };
  const act = { hasBeenActive: tapped };
  Object.defineProperty(globalThis, 'navigator', { value: { userActivation: act }, configurable: true });
  return { win, spoken, act };
}

// ---------------------------------------------------------------------------
// THE CHECKS. Each takes the context and pushes plain-English failures.
// ---------------------------------------------------------------------------

function checkCircleRules(ctx, fail) {
  const c = ctx.circle;
  // 1. warm-up size
  [[152, 5], [31, 5], [30, 3], [0, 3]].forEach(([due, want]) => {
    if (c.warmUpSize(due) !== want) fail(`warm-up size with ${due} due is ${c.warmUpSize(due)}, expected ${want}`);
  });
  if (!/warmUpSize\(\s*get\(\)\.reviewDueCount\(\)\s*\)/.test(ctx.src.store)) {
    fail('the store does not ask warmUpSize(reviewDueCount()) for the warm-up size');
  }
  if (/pickWarmUp\([^)]*WARM_UP\.questions\)/.test(ctx.src.store)) {
    fail('the store still builds the warm-up with the fixed WARM_UP.questions');
  }

  // 2. finished, not ticked
  const t = '2026-09-24';
  const sat = (o) => c.warmUpSatisfied({ todayKey: t, ...o });
  if (!sat({ lastWarmUpDay: t, availableCount: 5 })) fail('a warm-up done today does not count as done');
  if (sat({ lastWarmUpDay: '2026-09-23', availableCount: 5 })) fail('yesterday’s warm-up counts for today');
  if (sat({ lastWarmUpDay: null, availableCount: 3 })) fail('the warm-up counts as done with questions still waiting');
  if (!sat({ lastWarmUpDay: null, availableCount: 0 })) {
    fail('with nothing to warm up on, Morning Circle could never be finished (a dead end)');
  }
  if (c.circleCanFinish({ warmUpDone: true, watered: false })) fail('Circle finishes without watering');
  if (c.circleCanFinish({ warmUpDone: false, watered: true })) fail('Circle finishes without the warm-up');
  if (!c.circleCanFinish({ warmUpDone: true, watered: true })) fail('Circle cannot finish with everything done');
  if (c.circleTickAction(false) !== 'open') fail('tapping an unfinished Circle on Today ticks it instead of opening it');
  if (c.circleTickAction(true) !== 'untick') fail('a finished Circle cannot be un-ticked (a mis-tap would be stuck)');

  // 3. reminder, not lock
  if (!c.needsCircleReminder({ blockId: 'blk-math', circleDone: false })) fail('no reminder before Circle is finished');
  if (c.needsCircleReminder({ blockId: 'blk-math', circleDone: true })) fail('a reminder after Circle is finished');
  if (c.needsCircleReminder({ blockId: c.CIRCLE_BLOCK_ID, circleDone: false })) fail('Circle reminds her about Circle');

  // 4. her words
  const g = c.circleLine('greeting', { name: 'Azianna', hour: 9 }).text;
  if (!/Good morning, Azianna/.test(g)) fail(`morning greeting is "${g}"`);
  if (!/Morning Circle/.test(g) || !/warm-up/i.test(g)) fail('the greeting does not name Morning Circle and the warm-up');
  if (!/^Hello, Azianna/.test(c.circleLine('greeting', { name: 'Azianna', hour: 14 }).text)) {
    fail('the greeting says good morning in the afternoon');
  }
  const r = c.circleLine('reminder', { name: 'Azianna' }).text;
  if (!/Azianna/.test(r) || !/first/.test(r)) fail(`reminder is "${r}"`);
  if (!/Next is Mathematics/.test(c.circleLine('finished', { name: 'A', nextLabel: 'Mathematics' }).text)) {
    fail('the well-done line does not say what is next');
  }
  if (!c.shouldSay('greeting', { greeting: '2026-09-23' }, t)) fail('a line said yesterday is not said today');
  if (c.shouldSay('greeting', { greeting: t }, t)) fail('a line is said twice in one day');
  if (c.shouldSay('lesson', {}, t)) fail('a line outside greeting/reminder/finished would be spoken aloud');
  if (c.shouldGreet({ circleDone: true, saidOn: {}, todayKey: t })) fail('she is told to do Circle after finishing it');
}

function checkWiring(ctx, fail) {
  const s = ctx.src;
  // Circle block opens the Circle screen
  const target = ctx.links.resolveBlockTarget({ id: 'blk-open', subject: 'notes' }, {}, [], [], new Date());
  if (!target || target.view !== 'circle') fail('the Morning Circle block does not open the Circle screen');
  if (!/view === 'circle' && <MorningCircleView/.test(s.school)) fail('her school has no route to the Circle screen');
  // one place for the warm-up
  if (!/<WarmUpCard\s*\/>/.test(s.circleView)) fail('the warm-up is not in Morning Circle');
  if (/<WarmUpCard\s*\/>/.test(s.home)) fail('the warm-up is on Home as well as in Circle');
  if (!/if \(!canFinish\) return;/.test(s.circleView)) fail('Circle can be finished without the warm-up and watering');
  if (!/circleTickAction\(isDone\) === 'open'\) onNavigate\?\.\('circle'\)/.test(s.today)) {
    fail('the Circle tick on Today ticks it instead of opening Circle');
  }
  if (!/throughCircle\(b\.id, \(\) => toggleBlock\(day, b\.id\)\)/.test(s.today)) {
    fail('ticking a class on Today skips the Morning Circle reminder');
  }
  if (!/throughCircle\(b\.id, \(\) =>\s*onNavigate\?\.\(target\.view, target\.course, target\.lessonId\)/.test(s.today)) {
    fail('opening a lesson from Today skips the Morning Circle reminder');
  }
  if (!/throughCircle\(b\.id, \(\) => window\.open\(url/.test(s.today)) fail('opening Khan from Today skips the reminder');
  if (!/Continue anyway/.test(s.today)) fail('the reminder has no way through — it has become a lock');
  if (!/sayOncePerDay\('greeting'/.test(s.today)) fail('Dr. Marigold does not say good morning on Today');
  if (!/sayOncePerDay\('reminder'/.test(s.today)) fail('Dr. Marigold does not say the reminder out loud');
  if (!/sayOncePerDay\('finished'/.test(s.circleView)) fail('Dr. Marigold does not say well done when Circle finishes');
  if (!/useEffect\(\(\) => \{\s*sayMessage\(\[text, quoteText\]\);\s*\}, \[text, quoteText\]\);/.test(s.message)) {
    fail('Dr. Marigold’s message box does not say its message out loud when it appears or changes');
  }
  if (!/setMarigoldSpeaksAloud\(/.test(s.parent)) fail('the Grown-Up Corner has no switch for Dr. Marigold speaking');
  // tests
  if (/retakeStatus\(\s*[wq]Attempts/.test(s.lessons)) fail('LessonsView still gates a test with retakeStatus alone');
  if (!/const wRetake = gateFor\(wAttempts\)/.test(s.lessons) || !/const qRetake = gateFor\(qAttempts\)/.test(s.lessons)) {
    fail('LessonsView does not use testGate for weekly and quarter tests');
  }
  if (!/index === 0 &&\s*!usedReadAloud &&\s*\(form\?\.kind === 'weekly' \|\| form\?\.kind === 'quarter'\)/.test(s.test)) {
    fail('no "Read it to me" reminder on the first question of a weekly or quarter test');
  }
}

async function checkVoice(ctx, fail) {
  // A page not yet tapped: the line waits for her first tap.
  const b1 = pretendBrowser({ tapped: false });
  const v1 = await ctx.loadVoice();
  const day = '2026-09-24';
  v1.sayOncePerDay('greeting', 'Good morning, Azianna!', day);
  if (b1.spoken.length) fail('she spoke before the page was tapped (Chrome would refuse and the line is lost)');
  if (v1.saidOnRecord().greeting === day) {
    fail('a line still waiting for her first tap was marked as said, so it would be lost for the day');
  }
  if (!b1.win.listening('pointerup')) fail('the waiting line does not listen for pointerup (a touch screen tap)');
  b1.win.fire('pointerup');
  if (b1.spoken.length !== 1) fail(`after her first tap, ${b1.spoken.length} lines were spoken, expected 1`);
  v1.sayOncePerDay('greeting', 'Good morning, Azianna!', day);
  if (b1.spoken.length !== 1) fail('the greeting was spoken twice in one day');

  // A tapped page: spoken straight away; switch off silences it.
  const b2 = pretendBrowser({ tapped: true });
  const v2 = await ctx.loadVoice();
  v2.sayOncePerDay('reminder', 'Wait, Azianna.', day);
  if (b2.spoken.length !== 1) fail('on a tapped page the reminder was not spoken');
  const b3 = pretendBrowser({ tapped: true });
  const v3 = await ctx.loadVoice();
  v3.setMarigoldSpeaksAloud(false);
  v3.sayOncePerDay('greeting', 'Good morning', day);
  if (b3.spoken.length) fail('with the Grown-Up Corner switch off, she still spoke');

  // EVERY MESSAGE, OUT LOUD (Gigi, Sept 24 2026).
  const b5 = pretendBrowser({ tapped: true });
  const v5 = await ctx.loadVoice();
  v5.sayMessage(['Right now it is Mathematics.']);
  if (b5.spoken.length !== 1) fail('a Dr. Marigold message was not said out loud when it appeared');
  v5.sayMessage(['Right now it is Mathematics.']);
  if (b5.spoken.length !== 1) fail('the same message was said twice within a minute');
  const cancelsBefore = b5.win.cancels;
  v5.sayMessage(['Good morning, Azianna!']);
  if (b5.spoken.length !== 2) fail('a second, different message on the same screen was not said');
  if (b5.win.cancels !== cancelsBefore) fail('a second message on the same screen cut off the first one');
  const b6 = pretendBrowser({ tapped: false });
  const v6 = await ctx.loadVoice();
  v6.sayMessage(['One.']);
  v6.sayMessage(['Two.']);
  if (b6.spoken.length) fail('messages were spoken before the page was tapped');
  b6.win.fire('pointerup');
  if (b6.spoken.join('|') !== 'One.|Two.') fail(`after her first tap the waiting messages were: ${b6.spoken.join('|') || 'none'}`);
  const b7 = pretendBrowser({ tapped: true });
  const v7 = await ctx.loadVoice();
  v7.setMarigoldSpeaksAloud(false);
  v7.sayMessage(['Hello.']);
  if (b7.spoken.length) fail('with the Grown-Up Corner switch off, a message was still said');
  const b8 = pretendBrowser({ tapped: true });
  const v8 = await ctx.loadVoice();
  v8.sayMessage(['Good morning, Azianna!']);
  v8.sayOncePerDay('greeting', 'Good morning, Azianna!', day);
  if (b8.spoken.length !== 1) fail('the greeting box and the greeting line were both spoken (said twice)');
  if (v8.saidOnRecord().greeting !== day) fail('the greeting was heard but not recorded as said, so it comes again');
  // A "read it to me" button (no queue) must still stop her.
  const b9 = pretendBrowser({ tapped: true });
  const sp = await ctx.loadSpeech();
  sp.speakChunks(['a'], { queue: true });
  if (b9.win.cancels !== 0) fail('a queued message stops whatever was being said');
  sp.speakChunks(['b']);
  if (b9.win.cancels !== 1) fail('a read-it-to-me button no longer stops Dr. Marigold first');

  // Not marked said when speech could not start.
  const b4 = pretendBrowser({ tapped: true });
  b4.win.speechSynthesis.getVoices = () => [];
  delete b4.win.speechSynthesis;
  const v4 = await ctx.loadVoice();
  v4.sayOncePerDay('greeting', 'Good morning', day);
  if (v4.saidOnRecord().greeting === day) fail('a line that was never spoken was marked as said for the day');
}

function checkGate(ctx, fail) {
  const g = ctx.gate;
  const today = '2026-09-24';
  const at = (d, h = '14:00') => `${d}T${h}:00.000Z`;
  const weekly = (d, extra = {}) => ({ kind: 'weekly', dayKey: d, at: at(d), fraction: 0.5, revisit: [], ...extra });

  // 6. one a day
  const sat = [weekly(today, { testId: 'x' })];
  if (g.testGate({ attemptsForTest: [], allAttempts: sat, lessonReads: {}, todayKey: today }).allowed) {
    fail('a second test opens on the same day (Sept 18: three in one sitting)');
  }
  const rc = [{ kind: 'reading-check', dayKey: today, at: at(today) }];
  if (!g.testGate({ attemptsForTest: [], allAttempts: rc, lessonReads: {}, todayKey: today }).allowed) {
    fail('a reading check counts as the day’s test');
  }
  if (!g.testGate({ attemptsForTest: [], allAttempts: [weekly('2026-09-23')], lessonReads: {}, todayKey: today }).allowed) {
    fail('yesterday’s test blocks today’s');
  }

  // 7. re-take after going back
  const last = weekly('2026-09-21', { revisit: [{ lesson: 'hb-1-04', misses: 3 }, { lesson: 'hb-m1-05', misses: 1 }] });
  const before = { 'hb-1-04': { lastReadAt: at('2026-09-20') }, 'hb-m1-05': { lastReadAt: at('2026-09-22') } };
  const r1 = g.testGate({ attemptsForTest: [last], allAttempts: [last], lessonReads: before, todayKey: today, titleOf: (id) => `T:${id}` });
  if (r1.allowed) fail('a re-take opens with a missed lesson not gone back over');
  if (!(r1.reReadFirst || []).includes('hb-1-04') || (r1.reReadFirst || []).includes('hb-m1-05')) {
    fail(`the lessons to go back over are wrong: ${JSON.stringify(r1.reReadFirst)}`);
  }
  if (!/T:hb-1-04/.test(r1.reason || '')) fail('the re-take message does not name the lesson to go back over');
  const after = { ...before, 'hb-1-04': { lastReadAt: at('2026-09-23') } };
  if (!g.testGate({ attemptsForTest: [last], allAttempts: [last], lessonReads: after, todayKey: today }).allowed) {
    fail('a re-take stays closed after every missed lesson was gone back over');
  }
  // retakeStatus still holds
  const recent = weekly('2026-09-23', { revisit: [] });
  if (g.testGate({ attemptsForTest: [recent], allAttempts: [], lessonReads: {}, todayKey: today }).allowed) {
    fail('the two-day wait between re-takes is gone');
  }
  const three = [weekly('2026-09-10'), weekly('2026-09-14'), weekly('2026-09-18')];
  if (g.testGate({ attemptsForTest: three, allAttempts: [], lessonReads: {}, todayKey: today }).allowed) {
    fail('a fourth attempt opens');
  }
  if (!g.testGate({ attemptsForTest: [], allAttempts: [], lessonReads: {}, todayKey: today }).allowed) {
    fail('a first attempt is blocked');
  }
}

async function checkPapers(ctx, fail, facts) {
  const e = ctx.engine;
  const { WEEKS } = await import(pathToFileURL(join(ROOT, 'config/assessment.js')).href);
  const { bankItemById } = await import(pathToFileURL(join(ROOT, 'data/assessments/appBank.js')).href);
  let papers = 0;
  let twins = 0;
  const firstTwin = [];
  const look = (form) => {
    if (!form) return;
    papers++;
    const seen = new Map();
    for (const id of form.questionIds) {
      const key = e.samePrompt(bankItemById(id)?.prompt);
      if (seen.has(key)) {
        twins++;
        if (firstTwin.length < 3) firstTwin.push(`${form.testId} #${form.attempt}: ${seen.get(key)} + ${id}`);
      } else seen.set(key, id);
    }
  };
  for (const weeks of Object.values(WEEKS)) {
    for (const w of weeks) {
      let asked = [];
      for (let attempt = 1; attempt <= 3; attempt++) {
        const f = e.buildWeeklyTest(w.id, { attempt, alreadyAsked: asked });
        look(f);
        if (f) asked = asked.concat(f.questionIds);
      }
    }
  }
  for (const course of Object.keys(WEEKS)) {
    for (let q = 1; q <= 4; q++) {
      for (let attempt = 1; attempt <= 2; attempt++) look(e.buildQuarterTest(`${course}-q${q}`, { attempt }));
    }
  }
  facts.push(`${papers} papers built (every weekly test ×3 attempts, quarter tests ×2): ${twins} repeated questions`);
  if (twins) fail(`${twins} papers ask the same question twice, e.g. ${firstTwin.join('; ')}`);
  // The exact Sept 3 pair must never share a paper.
  if (e.samePrompt(bankItemById('t-hb104e')?.prompt) !== e.samePrompt(bankItemById('t-hb104f')?.prompt)) {
    fail('the Sept 3 twins no longer read as the same question — samePrompt is comparing the wrong thing');
  }
}

async function runAll(ctx) {
  const failures = [];
  const facts = [];
  const fail = (m) => failures.push(m);
  checkCircleRules(ctx, fail);
  checkWiring(ctx, fail);
  await checkVoice(ctx, fail);
  checkGate(ctx, fail);
  await checkPapers(ctx, fail, facts);
  return { failures, facts };
}

async function context(broken = {}) {
  const src = {};
  for (const [k, rel] of Object.entries(SRC)) src[k] = broken.src?.[k] ?? read(rel);
  const circle = await loadModule(SRC.circleLib, broken.src?.circleLib);
  const gate = await loadModule(SRC.gateLib, broken.src?.gateLib);
  const engine = await loadModule(SRC.engine, broken.src?.engine);
  const links = await loadModule(SRC.links, broken.src?.links);
  const loadVoice = () => loadModule(SRC.voiceLib, src.voiceLib);
  const loadSpeech = () => loadModule(SRC.speech, src.speech);
  return { src, circle, gate, engine, links, loadVoice, loadSpeech };
}

// ---------------------------------------------------------------------------
// THE BUGS, PUT BACK IN
// ---------------------------------------------------------------------------
const BUGS = [
  ['warm-up stuck at 3', 'circleLib', 'catchUp: 5,', 'catchUp: 3,'],
  ['store ignores warmUpSize', 'store', 'const size = warmUpSize(get().reviewDueCount());\n    return pickWarmUp(get().reviewItems, dayKeyOf(), get().eligibleQuestionIds(), size);', 'return pickWarmUp(get().reviewItems, dayKeyOf(), get().eligibleQuestionIds(), WARM_UP.questions);'],
  ['Circle a dead end with no cards', 'circleLib', 'return (Number(availableCount) || 0) === 0;', 'return false;'],
  ['Circle finishes without watering', 'circleLib', 'return !!warmUpDone && !!watered;', 'return !!warmUpDone;'],
  ['the old tap-to-tick', 'circleLib', "return isDone ? 'untick' : 'open';", "return 'untick';"],
  ['Circle reminds itself', 'circleLib', 'return blockId !== CIRCLE_BLOCK_ID;', 'return true;'],
  ['greeting forgets the warm-up', 'circleLib', "Don't forget your Morning Circle and your warm-up.", "Don't forget your Morning Circle."],
  ['said every time', 'circleLib', 'return (saidOn || {})[kind] !== todayKey;', 'return true;'],
  ['Circle block opens Home again', 'links', "if (block?.id === 'blk-open') {", "if (block?.id === 'blk-open-x') {"],
  ['no route to Circle', 'school', "{view === 'circle' && <MorningCircleView onNavigate={navigate} />}", ''],
  ['warm-up back on Home', 'home', '<NotesPanel />', '<NotesPanel /><WarmUpCard />'],
  ['finish without the steps', 'circleView', 'if (!canFinish) return;', ''],
  ['Today ticks Circle', 'today', "if (circleTickAction(isDone) === 'open') onNavigate?.('circle');", "if (false) onNavigate?.('x');"],
  ['ticks skip the reminder', 'today', 'throughCircle(b.id, () => toggleBlock(day, b.id));', 'toggleBlock(day, b.id);'],
  ['reminder is a lock', 'today', 'Continue anyway', 'OK'],
  ['no spoken greeting', 'today', "sayOncePerDay('greeting'", "void ('greeting'"],
  ['voice on pointerdown', 'voiceLib', "window.addEventListener('pointerup', onFirstTap, true);", "window.addEventListener('pointerdown', onFirstTap, true);"],
  ['switch ignored', 'voiceLib', 'if (!marigoldSpeaksAloud() || !speechSupported()) return false;', 'if (!speechSupported()) return false;'],
  ['marked said while still waiting', 'voiceLib', 'if (pending.length < MAX_WAITING) pending.push(item);', 'if (pending.length < MAX_WAITING) pending.push(item); if (item.kind) markSaid(item.kind, item.dayKey);'],
  ['messages not spoken', 'message', 'sayMessage([text, quoteText]);', ''],
  ['repeats herself', 'voiceLib', 'const repeat = lastSpoken && lastSpoken.key === key && now - lastSpoken.at < REPEAT_WINDOW_MS;', 'const repeat = false;'],
  ['cuts herself off', 'voiceLib', 'const queue = now - lastStartedAt < SAME_SCREEN_MS;', 'const queue = false;'],
  ['waiting messages dropped', 'voiceLib', 'list.forEach(speakItem);', 'list.slice(0, 1).forEach(speakItem);'],
  ['greeting said twice', 'voiceLib', 'if (!repeat) {', 'if (true) {'],
  ['queue ignored in speech', 'speech', 'if (!queue) stopSpeaking();', 'stopSpeaking();'],
  ['buttons stop nothing', 'speech', 'if (!queue) stopSpeaking();', ''],
  ['no switch in the Grown-Up Corner', 'parent', 'setMarigoldSpeaksAloud(e.target.checked);', ''],
  ['three tests in a day', 'gateLib', 'if (testsSatToday(allAttempts, todayKey) >= 1) {', 'if (false) {'],
  ['reading check counts', 'gateLib', "export const COUNTED_TEST_KINDS = ['weekly', 'quarter'];", "export const COUNTED_TEST_KINDS = ['weekly', 'quarter', 'reading-check'];"],
  ['re-take without going back', 'gateLib', 'if (reReadFirst.length) {', 'if (false) {'],
  ['re-read compared backwards', 'gateLib', 'row.lastReadAt > latest.at', 'row.lastReadAt < latest.at'],
  ['LessonsView back to retakeStatus', 'lessons', 'const wRetake = gateFor(wAttempts);', 'const wRetake = retakeStatus(wAttempts, today);'],
  ['same question twice', 'engine', 'return distinctPrompts([...fresh, ...repeats], n, usedPrompts);', 'return [...fresh, ...repeats].slice(0, n);'],
  ['no read-aloud reminder', 'test', "(form?.kind === 'weekly' || form?.kind === 'quarter') && (", "false && ("]
];

async function main() {
  const real = await runAll(await context());
  real.facts.forEach((f) => console.log(f));

  if (!SELF_TEST) {
    if (real.failures.length) {
      real.failures.forEach((f) => console.log(`FAIL  ${f}`));
      console.log(`\n${real.failures.length} failed.`);
      process.exit(1);
    }
    console.log('Morning Circle, Dr. Marigold’s voice, one test a day, re-take after going back, no repeated question, read-aloud reminder.');
    console.log('NOT TESTED HERE: how the screens look, and whether Chrome on her Chromebook plays the voice.');
    console.log('PASS');
    return;
  }

  if (real.failures.length) {
    console.log('The real code fails, so the self-test cannot mean anything. Fix these first:');
    real.failures.forEach((f) => console.log(`  ${f}`));
    process.exit(1);
  }
  let missed = 0;
  for (const [name, key, from, to] of BUGS) {
    const original = read(SRC[key]);
    if (!original.includes(from)) {
      console.log(`CANNOT  ${name}: the line to break is not in ${SRC[key]} (update this self-test)`);
      missed++;
      continue;
    }
    const broken = original.replace(from, to);
    const { failures } = await runAll(await context({ src: { [key]: broken } }));
    if (failures.length) console.log(`caught  ${name}  →  ${failures[0]}`);
    else {
      console.log(`MISSED  ${name}`);
      missed++;
    }
  }
  console.log(missed ? `\n${missed} of ${BUGS.length} bugs NOT caught.` : `\nAll ${BUGS.length} bugs caught.`);
  process.exit(missed ? 1 : 0);
}

await main();
