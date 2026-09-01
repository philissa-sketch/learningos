import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { parseDateStr, todayDateStr } from '../../lib/scheduler.js';
import { EvidenceLinkInput, EvidenceLinkEditor } from './EvidenceLink.jsx';
import { folderForRecordKind } from '../../lib/driveLinks.js';
import { academyContent } from '../../content/academyContent.js';

const { SUBJECT_LABELS } = academyContent().subjects;

/**
 * Administrative records — PROJECT_PLAN.md Part 8's field trip log,
 * volunteer/service hours, extracurricular activities, awards and
 * certificates, and standardized test records.
 *
 * ONE section, not five. The plan lists them separately, but they are
 * the same shape: a dated entry with a title and a note, plus one
 * type-specific number. Five separate logs would mean five forms to
 * learn, five places to look, and five chances for the compliance packet
 * to miss one. The `kind` filter does the separating.
 *
 * Volunteer hours get a real hours field and a running total, because
 * that total is the thing anyone ever actually asks for. Test records
 * matter for Georgia's every-three-years requirement, which the
 * Compliance section reads directly from these rows.
 *
 * WORK SAMPLES (added August 6, 2026): this kind was blocked for as long
 * as "keep a work sample" meant "store a scan in the browser," which was
 * declined for good reason. With Drive links the record is a title, a
 * date and a URL — the scan itself lives in Drive, backed up, and the
 * app holds nothing it could lose. Same shape as every other kind, so it
 * cost one row in this list rather than a new subsystem.
 */

const KINDS = [
  { id: 'field-trip', label: 'Field Trips', blurb: 'Museums, sites, tours — anywhere learning happened away from the desk.' },
  { id: 'volunteer', label: 'Volunteer Hours', blurb: 'Service hours, with a running total.' },
  { id: 'extracurricular', label: 'Extracurriculars', blurb: 'Clubs, teams, lessons, competitions.' },
  { id: 'award', label: 'Awards & Certificates', blurb: 'Anything he earned that is worth keeping on the record.' },
  { id: 'test', label: 'Standardized Tests', blurb: 'Georgia asks for one at least every three years from the end of 3rd grade.' },
  { id: 'work-sample', label: 'Work Samples', blurb: 'Scanned or photographed worksheets, essays, lab write-ups and drawings — kept as Drive links.' }
];

export function AdminRecordsSection() {
  const adminRecords = useAppStore((s) => s.adminRecords);
  const addAdminRecordEntry = useAppStore((s) => s.addAdminRecordEntry);
  const removeAdminRecord = useAppStore((s) => s.removeAdminRecord);
  const setAdminRecordDriveUrl = useAppStore((s) => s.setAdminRecordDriveUrl);
  const getAllSubjectsForRecordkeeping = useAppStore((s) => s.getAllSubjectsForRecordkeeping);
  const subjects = getAllSubjectsForRecordkeeping();

  const [kind, setKind] = useState('field-trip');
  const [date, setDate] = useState(todayDateStr());
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [hours, setHours] = useState('');
  const [subject, setSubject] = useState('');
  const [driveUrl, setDriveUrl] = useState('');
  const [score, setScore] = useState('');

  const active = KINDS.find((k) => k.id === kind);
  const rows = adminRecords.filter((r) => r.kind === kind);
  const totalHours = adminRecords
    .filter((r) => r.kind === 'volunteer')
    .reduce((n, r) => n + (r.hours || 0), 0);

  const handleAdd = async () => {
    if (!title.trim()) return;
    await addAdminRecordEntry({ kind, date, title, detail, hours, subject, driveUrl, score });
    setTitle('');
    setDetail('');
    setHours('');
    setSubject('');
    setDriveUrl('');
    setScore('');
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Records</p>
        <h3 className="mt-1 font-display text-lg font-700 text-ink-100">
          Field Trips, Service Hours, Activities, Awards &amp; Tests
        </h3>
        <p className="mt-2 text-sm text-ink-300">
          Everything that belongs in a homeschool record but isn't a lesson. All of it flows into the compliance
          packet automatically.
        </p>

        <div className="mt-3 flex flex-wrap gap-1 rounded-lg bg-space-900 p-1">
          {KINDS.map((k) => (
            <button
              key={k.id}
              type="button"
              onClick={() => setKind(k.id)}
              className={
                'rounded-md px-2.5 py-1 text-xs font-display font-600 transition-colors ' +
                (kind === k.id ? 'bg-signal-cyan/15 text-signal-cyan' : 'text-ink-500 hover:text-ink-100')
              }
            >
              {k.label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-ink-500">{active.blurb}</p>
        {kind === 'volunteer' && totalHours > 0 && (
          <p className="mt-1 font-display text-sm font-700 text-signal-cyan">{totalHours} hours total</p>
        )}
      </div>

      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Add a record</p>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={
            kind === 'test'
              ? 'Test name (e.g. Iowa Assessments)'
              : kind === 'award'
                ? 'What he earned'
                : 'What it was'
          }
          className="mt-2 w-full rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500 focus:border-signal-cyan focus:outline-none"
        />
        <textarea
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          rows={2}
          placeholder={kind === 'test' ? 'Scores, who administered it, anything worth keeping' : 'Details worth remembering'}
          className="mt-2 w-full resize-none rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500 focus:border-signal-cyan focus:outline-none"
        />
        <div className="mt-2">
          <EvidenceLinkInput
            value={driveUrl}
            onChange={setDriveUrl}
            folderKey={folderForRecordKind(kind)?.key}
            placeholder={
              kind === 'test'
                ? 'Drive link to the score report (optional)'
                : kind === 'award'
                  ? 'Drive link to the scanned certificate (optional)'
                  : kind === 'work-sample'
                    ? 'Drive link to the scan or photo (optional)'
                    : 'Drive link to photos or documents (optional)'
            }
          />
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100"
          />
          {kind === 'test' && (
            <input
              type="number"
              step="any"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              placeholder="Score"
              title="A number — percentile, scaled score, whatever this test reports. Same measure each time so it can be compared."
              className="w-28 rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500"
            />
          )}
          {kind === 'volunteer' && (
            <input
              type="number"
              min="0"
              step="0.5"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="Hours"
              className="w-28 rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500"
            />
          )}
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100"
          >
            <option value="">No subject</option>
            {subjects.map((subj) => (
              <option key={subj} value={subj}>
                {SUBJECT_LABELS[subj] || subj}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleAdd}
            disabled={!title.trim()}
            className="rounded-lg bg-signal-cyan px-4 py-2 font-display font-700 text-space-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Add
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {rows.length === 0 && <p className="text-sm text-ink-500">Nothing recorded under {active.label} yet.</p>}
        {rows.map((record) => (
          <div key={record.id} className="rounded-lg border border-space-700 bg-space-800 p-4 shadow-panel">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-display font-700 text-ink-100">{record.title}</p>
                <p className="text-xs text-ink-500">
                  {parseDateStr(record.date).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                  {record.hours ? ` · ${record.hours} hours` : ''}
                  {typeof record.score === 'number' ? ` · score ${record.score}` : ''}
                  {record.subject ? ` · ${SUBJECT_LABELS[record.subject] || record.subject}` : ''}
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeAdminRecord(record.id)}
                className="flex-none text-xs text-ink-500 hover:text-signal-red"
              >
                Delete
              </button>
            </div>
            {record.detail && <p className="mt-2 text-sm text-ink-300">{record.detail}</p>}
            <EvidenceLinkEditor
              url={record.driveUrl}
              recordKind={record.kind}
              onSave={(value) => setAdminRecordDriveUrl(record.id, value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Course descriptions — Part 8's "formal per-subject written
 * descriptions for transcripts/college applications."
 *
 * Free text on purpose. A real course description is prose that an
 * admissions office reads; a form with fields would produce something
 * that reads like a form.
 */
export function CourseDescriptionsSection() {
  const courseDescriptions = useAppStore((s) => s.courseDescriptions);
  const saveCourseDescription = useAppStore((s) => s.saveCourseDescription);
  const getAllSubjectsForRecordkeeping = useAppStore((s) => s.getAllSubjectsForRecordkeeping);
  const subjects = getAllSubjectsForRecordkeeping();

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Course Descriptions</p>
        <h3 className="mt-1 font-display text-lg font-700 text-ink-100">One Paragraph Per Subject</h3>
        <p className="mt-2 text-sm text-ink-300">
          What the course actually covered, in your words — the thing a transcript or college application asks
          for. Writing them as you go beats reconstructing four years of them at once in eleventh grade. These go
          into the compliance packet.
        </p>
      </div>

      {subjects.map((subject) => (
        <CourseDescriptionEditor
          key={subject}
          subject={subject}
          existing={courseDescriptions[subject]}
          onSave={saveCourseDescription}
        />
      ))}
    </div>
  );
}

function CourseDescriptionEditor({ subject, existing, onSave }) {
  const [text, setText] = useState(existing?.description || '');
  const [saved, setSaved] = useState(false);
  const dirty = text !== (existing?.description || '');

  const handleSave = async () => {
    await onSave(subject, text);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-display text-sm font-700 text-ink-100">
          {SUBJECT_LABELS[subject] || subject}
        </p>
        {existing?.description && !dirty && <span className="text-xs text-ink-600">Written</span>}
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        placeholder="What this course covered, what he did, and how it was assessed."
        className="mt-2 w-full resize-none rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500 focus:border-signal-cyan focus:outline-none"
      />
      <div className="mt-2 flex items-center gap-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={!dirty}
          className="rounded-lg bg-signal-cyan px-3 py-1.5 text-xs font-display font-700 text-space-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Save
        </button>
        {saved && <span className="text-xs text-signal-cyan">Saved</span>}
      </div>
    </div>
  );
}
