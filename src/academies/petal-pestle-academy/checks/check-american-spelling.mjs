// ---------------------------------------------------------------------------
// check-american-spelling — everything she reads is spelled the American way
// (Sept 24 2026).
//
// Run from the learningos folder:
//     node src/academies/petal-pestle-academy/checks/check-american-spelling.mjs
//     node src/academies/petal-pestle-academy/checks/check-american-spelling.mjs --self-test
//
// ---- WHY THIS EXISTS ----
// Gigi: "Clean it up now." Her lessons, questions and screens were written
// with British spelling: colour 361 times, centimetres 129, vapour 69, mould
// 44, grey 45, and British words like "maths", "fortnight", "torch" (for a
// flashlight), "lorry" and "cling film". She is an American 4th grader
// learning to spell; the lessons were teaching her the other spelling. 1,717
// changes across 122 files.
//
// ---- WHAT IT ASSERTS ----
// No text she or a grown-up reads (strings and on-screen words, in every file
// of her school) uses a British spelling or a British word for an American
// thing. It looks for the SPELLING PATTERNS (-our, -tre, -ise, doubled l before
// -ed/-ing, -ence, grey, towards…), not a list of places, so a new lesson
// written tomorrow is held to it too.
//
// ---- ON PURPOSE, NOT CHECKED ----
//   · "Endeavour" — the space shuttle's real name.
//   · torches in Roman times — a real flaming torch, not a flashlight.
//   · code comments, ids and web addresses — she never sees them.
//   · config/buildStamp.js — the record of past changes, kept as written.
//   · data/words/wordPractice.js — its misspellings are wrong on purpose;
//     check-word-week guards its meanings and sentences.
// ---------------------------------------------------------------------------

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const require = createRequire(join(ROOT, '../../../package.json'));
const { parse } = require('@babel/parser');
const SELF_TEST = process.argv.includes('--self-test');

const SKIP_FILES = new Set(['config/buildStamp.js', 'data/words/wordPractice.js']);
const SKIP_KEYS = new Set(['url', 'href', 'src', 'source', 'sources', 'citation', 'author', 'authors', 'publisher', 'isbn', 'id', 'slug', 'key', 'file', 'className', 'icon', 'emoji', 'lessonId', 'videoId', 'youtube', 'link', 'path', 'route', 'view', 'kind', 'type', 'color']);

const STEMS = 'organis|recognis|realis|specialis|standardis|memoris|summaris|apologis|randomis|sterilis|categoris|criticis|prioritis|utilis|visualis|minimis|maximis|fertilis|optimis|civilis|colonis|harmonis|sympathis|symbolis|energis|authoris|vaporis|pasteuris|crystallis|neutralis|stabilis|finalis|personalis|customis|normalis|mobilis|localis|centralis|idealis|familiaris|capitalis|hospitalis|immunis|sanitis|moisturis|tenderis|caramelis|carbonis|emphasis(?=e|ed|es|ing)|synthesis(?=ed|ing)|hypothesis(?=ed|ing)|digitis|scrutinis|agonis|character';
const BRITISH = new RegExp(
  '\\b(' +
    [
      '\\w*(?:colou?r(?<=colour)|vapour|mould|harbour|neighbour|flavour|favour|labour|armour|parlour|rumour|honour|behaviour|tumour|endeavour|odour|humour|savour|glamour|clamour|vigour|rigour|splendour|valour)\\w*',
      '(?:centi|milli|kilo)?(?:metre|litre)s?',
      '(?:centre|fibre|theatre|calibre|lustre|sombre|spectre|meagre|sabre)s?',
      '(?:' + STEMS + ')(?:e|es|ed|er|ers|ing|ation|ations)',
      'analys(?:e|es|ed|ing)|paralys(?:e|es|ed|ing)',
      'grey(?:s|ed|ing|ish|er|est)?|towards|whilst|amongst|learnt|spelt',
      '\\w*(?:labell|modell|travell|levell|fuell|signall|totall|marvell|jewell|counsell|diall|funnell|tunnell|channell|quarrell|shovell)(?:ed|ing|er|ers|ous|ery)?',
      'cancell(?:ed|ing)',
      'defence|offence|licence|pretence',
      'practis(?:e|es|ed|ing)',
      'programmes?|catalogues?|dialogue(?=s? box)|judgement|ageing|fertilisers?|leukaemia|anaemia|haem\\w+|oesophagus|oestrogen|paediatric\\w*|foetus|diarrhoea|manoeuvre\\w*|aluminium|sulphur\\w*|ploughs?|cheques?|tyres?|kerbs?|pyjamas?|aeroplanes?|cosy|storeys?',
      'maths|fortnights?|fortnightly|lorry|lorries|motorways?|cling film|draughty?|nappy|nappies|trousers|jumpers?(?= because| for)|torch(?:es)?'
    ].join('|') +
    ')\\b',
  'i'
);
const ALLOWED = (word, text) =>
  word === 'Endeavour' ||
  (/^torch(es)?$/i.test(word) && /Roman|tallow|flame|Olympic/.test(text));

function files(dir) {
  let out = [];
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) {
      if (['checks', '_to_delete', 'node_modules'].includes(f)) continue;
      out = out.concat(files(p));
    } else if (/\.(js|jsx)$/.test(f)) out.push(p);
  }
  return out;
}
export const FILES = files(ROOT).map((p) => relative(ROOT, p).split('\\').join('/')).filter((f) => !SKIP_FILES.has(f));

function textsOf(code) {
  const ast = parse(code, { sourceType: 'module', plugins: ['jsx'] });
  const out = [];
  (function walk(node, parent, parentKey) {
    if (!node || typeof node.type !== 'string') return;
    let v = null;
    if (node.type === 'StringLiteral') {
      const keyed = parent && parent.type === 'ObjectProperty';
      const name = keyed && !parent.computed ? parent.key.name || parent.key.value : null;
      if (keyed && parent.key === node) v = null;
      else if (parent && /Import|Export/.test(parent.type)) v = null;
      else if (parent && parent.type === 'JSXAttribute' && SKIP_KEYS.has(parent.name.name)) v = null;
      else if (name && SKIP_KEYS.has(name)) v = null;
      else v = node.value;
    } else if (node.type === 'TemplateElement') v = node.value.cooked;
    else if (node.type === 'JSXText') v = node.value;
    if (v && !/^https?:/.test(v)) out.push(v);
    for (const [k, child] of Object.entries(node)) {
      if (k === 'loc' || k === 'start' || k === 'end' || k === 'extra' || k === 'leadingComments' || k === 'trailingComments' || k === 'innerComments') continue;
      if (Array.isArray(child)) child.forEach((c) => walk(c, node, k));
      else if (child && typeof child === 'object') walk(child, node, k);
    }
  })(ast.program, null, null);
  return out;
}

function run(sources) {
  const out = [];
  for (const f of FILES) {
    const code = sources[f] ?? readFileSync(join(ROOT, f), 'utf8');
    const outsideData = !f.startsWith('data/') && f !== 'lib/readingLoad.js';
    for (const t of textsOf(code)) {
      // A single bare word outside the lesson data is a screen or tab name in code, not text she reads.
      if (outsideData && /^[a-z]+$/.test(t.trim())) continue;
      const g = new RegExp(BRITISH.source, 'gi');
      let m;
      while ((m = g.exec(t))) {
        if (ALLOWED(m[0], t)) continue;
        out.push(`${f}: British "${m[0]}" in "${t.trim().slice(Math.max(0, m.index - 30), m.index + 40).replace(/\s+/g, ' ')}"`);
      }
    }
  }
  return out;
}

const BUGS = [
  ['mould back in a lesson question', 'data/lessons/herbalismM7.js', "'It goes moldy'", "'It goes mouldy'"],
  ['centimetres back in a question', 'data/assessments/herbalismM14Bank.js', 'Your mulched pots grew four centimeters. Nothing', 'Your mulched pots grew four centimetres. Nothing'],
  ['towards on her home screen', 'components/Home/GoalLine.jsx', 'What I am working toward<', 'What I am working towards<'],
  ['organised in social studies', 'data/lessons/socialM1.js', 'would not pay organized themselves', 'would not pay organised themselves'],
  ['grey on the test screen', 'components/Assess/TestView.jsx', 'Tap a gray dot', 'Tap a grey dot'],
  ['torch back for a flashlight', 'data/lessons/sciencelabM6.js', "prep: 'A flashlight, a small", "prep: 'A torch, a small"],
  ['a new British word the list never named', 'data/lessons/socialM1.js', 'would not pay organized themselves', 'would not pay theatre themselves']
];

const real = run({});
if (!SELF_TEST) {
  if (real.length) {
    real.slice(0, 40).forEach((f) => console.log(`FAIL  ${f}`));
    console.log(`\n${real.length} British spellings found.`);
    process.exit(1);
  }
  console.log(`${FILES.length} files of her school: every word she reads is spelled the American way.`);
  console.log('NOT TESTED HERE: code comments, and config/buildStamp.js (the record of past changes).');
  console.log('PASS');
  process.exit(0);
}
if (real.length) {
  console.log('The real files fail, so the self-test means nothing. Fix these first:');
  real.slice(0, 20).forEach((f) => console.log(`  ${f}`));
  process.exit(1);
}
let missed = 0;
for (const [name, f, from, to] of BUGS) {
  const original = readFileSync(join(ROOT, f), 'utf8');
  if (!original.includes(from)) {
    console.log(`CANNOT  ${name}: the text to break is not in ${f}`);
    missed++;
    continue;
  }
  const out = run({ [f]: original.replace(from, to) });
  if (out.length) console.log(`caught  ${name}  →  ${out[0]}`);
  else {
    console.log(`MISSED  ${name}`);
    missed++;
  }
}
// And the things kept on purpose must NOT fail it.
const shuttle = run({ 'data/lessons/humanbodyM16.js': readFileSync(join(ROOT, 'data/lessons/humanbodyM16.js'), 'utf8') });
if (shuttle.length) {
  console.log('WRONGLY FAILS  the shuttle Endeavour');
  missed++;
} else console.log('allowed  the shuttle Endeavour, Roman torches');
console.log(missed ? `\n${missed} of ${BUGS.length} bugs NOT caught.` : `\nAll ${BUGS.length} bugs caught.`);
process.exit(missed ? 1 : 0);
