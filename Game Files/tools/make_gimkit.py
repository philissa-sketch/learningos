"""Gimkit test-prep kits for Azianna, one CSV per class (separate files, never combined).

usage: python3 make_gimkit.py <gamedata.json from extract_gamedata.mjs> <out folder> <file date prefix, e.g. "2026-10-01 Thu">

Each kit = every question from the lessons she HAS READ in the week she is in (the weekly test draws from these)
         + earlier-week questions she has missed (most-missed first)
         + if still under MIN, more earlier-week questions as spaced review.
Questions from lessons she has not read yet are never used.
"""
import csv, json, os, random, re, sys

DATA = json.load(open(sys.argv[1])); OUT = sys.argv[2]; PREFIX = sys.argv[3]
os.makedirs(OUT, exist_ok=True)
NAMES = {'herbalism': 'Herbalism', 'sciencelab': 'Science Lab', 'social': 'Social Studies', 'humanbody': 'Human Body'}
MIN, MAX_EARLIER_MISSED = 24, 12
NEEDS_CONTEXT = re.compile(r'\b(above|below|diagram|drawing|photo|this lesson|the lesson|today|you just read|in the picture|in the image|the picture shows|the image shows)\b', re.I)
missed = {q['id']: q['wrong'] for q in DATA['missed']}

def item(q): return (q['prompt'], q['choices'][q['answer']], [c for i, c in enumerate(q['choices']) if i != q['answer']])

report = []
for course, v in DATA['courses'].items():
    lesson_q = [q for l in v['lessons'] if l['read'] for q in l['items']]
    unread = [l['id'] for l in v['lessons'] if not l['read']]
    early = v['earlierItems']
    early_missed = sorted([q for q in early if q['id'] in missed], key=lambda q: (-missed[q['id']], q['id']))[:MAX_EARLIER_MISSED]
    chosen = lesson_q + early_missed
    if len(chosen) < MIN:
        have = {q['id'] for q in chosen}
        rest = [q for q in early if q['id'] not in have]
        random.Random(course).shuffle(rest)
        chosen += rest[:MIN - len(chosen)]
    seen, rows, dropped = set(), [], []
    for q in chosen:
        p, r, w = item(q)
        if p in seen: continue
        if NEEDS_CONTEXT.search(p) or any(NEEDS_CONTEXT.search(x) for x in [r] + w):
            dropped.append(q['id']); continue
        seen.add(p); rows.append((p, r, w))
    assert all(len(w) == 3 and r not in w for _, r, w in rows), course
    name = f"{PREFIX} - Gimkit - Test Prep - {NAMES[course]}.csv"
    with open(os.path.join(OUT, name), 'w', newline='', encoding='utf-8') as f:
        wr = csv.writer(f)
        wr.writerow(['Gimkit Spreadsheet Import Template', '', '', '', ''])
        wr.writerow(['Question', 'Correct Answer', 'Incorrect Answer 1', 'Incorrect Answer 2 (Optional)', 'Incorrect Answer 3 (Optional)'])
        for p, r, w in rows: wr.writerow([p, r] + w)
    report.append(dict(file=name, course=NAMES[course], week=v['week'], title=v['title'], total=len(rows),
                       from_week=len(lesson_q), earlier_missed=len(early_missed), unread=unread, dropped=dropped,
                       longest_q=max(len(p) for p, _, _ in rows), longest_a=max(len(x) for _, r, w in rows for x in [r] + w)))
json.dump(report, open(os.path.join(os.path.expanduser('~'), 'gimkit_report.json'), 'w'), indent=1)
for r in report: print(r)
