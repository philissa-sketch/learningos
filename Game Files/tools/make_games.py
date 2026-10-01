"""Make this week's Kahoot / Blooket / Gimkit files for Azianna from her backup data.

Rules (Gigi, Sept 30 2026):
  Mon-Wed  Today's game: that day's lesson questions for each class + Math and Language Arts unit questions.
  Thu      Test prep (before her Thursday tests): every question a weekly test can draw from this week,
           plus earlier-week questions she has missed (the test also takes 2 from earlier weeks).
  Fri      Redo: the questions she has missed most.
  One site a day: Mon Kahoot, Tue Blooket, Wed Gimkit, Thu Kahoot, Fri Blooket.
"""
import csv, json, random, sys, os
from openpyxl import Workbook
from openpyxl.styles import Font
sys.path.insert(0, os.path.dirname(__file__))
from unitq import MATH, GRAMMAR

DATA = json.load(open(sys.argv[1]))
OUT = sys.argv[2]
os.makedirs(OUT, exist_ok=True)
KAHOOT_Q, KAHOOT_A, TIME = 120, 75, 30
COURSE = {'herbalism': 'Herbalism', 'sciencelab': 'Science Lab', 'social': 'Social Studies', 'humanbody': 'Human Body'}

def bank(q):  # app bank item -> (prompt, right, wrongs)
    return (q['prompt'], q['choices'][q['answer']], [c for i, c in enumerate(q['choices']) if i != q['answer']])

def fits_kahoot(it):
    p, r, w = it
    return len(p) <= KAHOOT_Q and all(len(x) <= KAHOOT_A for x in [r] + w)

def dedupe(items):
    seen, out = set(), []
    for it in items:
        if it[0] in seen: continue
        seen.add(it[0]); out.append(it)
    return out

def ordered(it, seed):
    """Choices in a fixed shuffled order, and the number (1-4) of the right one."""
    p, r, w = it
    ch = [r] + list(w)
    random.Random(seed + p).shuffle(ch)
    return p, ch, ch.index(r) + 1

skipped = []
def write_kahoot(name, items):
    ok = [it for it in items if fits_kahoot(it)]
    skipped.extend((name, it[0]) for it in items if not fits_kahoot(it))
    wb = Workbook(); ws = wb.active; ws.title = 'Sheet1'
    ws['B2'] = 'Quiz template'; ws['B2'].font = Font(bold=True)
    ws['B3'] = 'Made for Azianna from Petal & Pestle. Import in Kahoot: Add question > Import spreadsheet.'
    ws.append([]); ws.append([]); ws.append([]); ws.append([])
    ws.append(['', 'Question - max 120 characters', 'Answer 1 - max 75 characters', 'Answer 2 - max 75 characters',
               'Answer 3 - max 75 characters', 'Answer 4 - max 75 characters',
               'Time limit (sec) – 5, 10, 20, 30, 60, 90, 120, or 240 secs', 'Correct answer(s) - choose at least one'])
    for i, it in enumerate(ok, 1):
        p, ch, n = ordered(it, name)
        ws.append([i, p] + ch + [TIME, n])
    wb.save(os.path.join(OUT, name + '.xlsx'))
    return len(ok)

def write_blooket(name, items):
    with open(os.path.join(OUT, name + '.csv'), 'w', newline='', encoding='utf-8') as f:
        w = csv.writer(f)
        w.writerow(['Blooket\nImport Template', '', '', '', '', '', '', ''])
        w.writerow(['Question #', 'Question Text', 'Answer 1', 'Answer 2', 'Answer 3\n(Optional)', 'Answer 4\n(Optional)',
                    'Time Limit (sec)\n(Max: 300 seconds)', 'Correct Answer(s)\n(Only include Answer #)'])
        for i, it in enumerate(items, 1):
            p, ch, n = ordered(it, name)
            w.writerow([i, p] + ch + [TIME, n])
    return len(items)

def write_gimkit(name, items):
    with open(os.path.join(OUT, name + '.csv'), 'w', newline='', encoding='utf-8') as f:
        w = csv.writer(f)
        w.writerow(['Gimkit Spreadsheet Import Template', '', '', '', ''])
        w.writerow(['Question', 'Correct Answer', 'Incorrect Answer 1', 'Incorrect Answer 2 (Optional)', 'Incorrect Answer 3 (Optional)'])
        for p, r, wr in items:
            w.writerow([p, r] + list(wr))
    return len(items)

WRITERS = {'Kahoot': write_kahoot, 'Blooket': write_blooket, 'Gimkit': write_gimkit}
C = DATA['courses']

def next_unread(course, k=0):
    un = [l for l in C[course]['lessons'] if not l['read']]
    return un[k] if len(un) > k else None

def lesson_items(l):
    return [bank(q) for q in l['items']] if l else []

math_pool, gram_pool = list(MATH), list(GRAMMAR)
def unit_take(pool, n):
    got = pool[:n]; del pool[:n]; return got

plan = []
# --- Wednesday Sept 30: Herbalism, Science Lab, Social Studies (Mon/Wed) + Math + Language Arts
wed_lessons = [('herbalism', next_unread('herbalism')), ('sciencelab', next_unread('sciencelab')), ('social', next_unread('social'))]
wed = []
for c, l in wed_lessons: wed += lesson_items(l)
wed += unit_take(math_pool, 5) + unit_take(gram_pool, 5)
wed = dedupe(wed)
plan.append(('2026-09-30 Wed - Gimkit - Todays Game', 'Gimkit', wed,
             ' + '.join(f"{COURSE[c]}: {l['title']}" for c, l in wed_lessons if l) + ' + Math Unit 6 + Grammar Unit 5'))

# --- Thursday Oct 1: test prep, one Kahoot per class test
missed_ids = {q['id'] for q in DATA['missed']}
for c in ['herbalism', 'sciencelab', 'social', 'humanbody']:
    v = C[c]
    week = [bank(q) for l in v['lessons'] for q in l['items']]
    earlier_missed = [bank(q) for q in v['earlierItems'] if q['id'] in missed_ids][:8]
    if len(earlier_missed) < 4:
        rest = [q for q in v['earlierItems'] if q['id'] not in missed_ids]
        random.Random(c).shuffle(rest)
        earlier_missed += [bank(q) for q in rest[:4 - len(earlier_missed)]]
    items = dedupe(week + earlier_missed)
    plan.append((f"2026-10-01 Thu - Kahoot - Test Prep - {COURSE[c]}", 'Kahoot', items,
                 f"{COURSE[c]} week {v['n']} ({v['title']}): all {len(week)} lesson questions the test draws from + {len(earlier_missed)} from earlier weeks"))

# --- Friday Oct 2: redo, the questions she has missed most + the rest of the unit questions
redo = [bank(q) for q in DATA['missed'][:24]] + unit_take(math_pool, 3) + unit_take(gram_pool, 3)
plan.append(('2026-10-02 Fri - Blooket - Redo', 'Blooket', dedupe(redo), 'The 24 questions she has missed most (as of Sept 30) + Math and Grammar'))

summary = []
for name, site, items, what in plan:
    n = WRITERS[site](name, items)
    summary.append((name, site, n, what))
for s in summary: print(' | '.join(map(str, s)))
print('skipped for Kahoot length:', skipped)
json.dump(summary, open(os.path.join(OUT, '_summary.json.scratch'), 'w'))
