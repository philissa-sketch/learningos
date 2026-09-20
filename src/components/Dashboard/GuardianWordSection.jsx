import { useEffect, useState } from 'react';
import { loadAcademyRecord, putAcademyRecord } from '../../db/householdDb.js';
import { academyContent } from '../../content/academyContent.js';
import {
  GENERIC_WORDS,
  guardianWord,
  installSchoolWords,
  schoolWordsAcademyId
} from '../../lib/schoolWords.js';

/**
 * What this learner calls the grown-up.
 *
 * ---- WHY THIS IS A SETTING AND NOT A CONSTANT (audit finding 7) ----
 *
 * Thirty-three live lines named the adult by one household's word for her,
 * compiled in. Every one of them was correct for that household and wrong for
 * every other, and there was nowhere to put the right answer.
 *
 * ---- WHY IT IS PER ACADEMY AND NOT PER HOUSEHOLD ----
 *
 * Two children on one machine do not always use the same word for the same
 * adult, and one of them being told the app knows better is a small daily
 * insult. So it sits on the Academy record beside the name, and each child's
 * school says it their way.
 *
 * ---- THE WRITE PATH ----
 *
 * Write, then READ BACK, then trust the read — the same rule the front door's
 * curriculum picker learned the hard way. A write that reports success and a
 * read that comes home carrying the new value are two different facts, and
 * only the second one is worth showing a parent a tick for.
 *
 * The one drift worth naming: the front door holds its own copy of these
 * records for the door list. It does not show this word, and it re-reads every
 * record at boot, so a copy that is briefly stale there changes nothing on
 * screen. The words in the running school are refreshed here directly rather
 * than waiting for that.
 */
export function GuardianWordSection() {
  const academyId = schoolWordsAcademyId();
  const [value, setValue] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    if (!academyId) return undefined;
    loadAcademyRecord(academyId)
      .then((record) => {
        if (!cancelled) setValue(record?.guardianWord || '');
      })
      .catch(() => {
        if (!cancelled) setError('Could not read the saved word.');
      });
    return () => {
      cancelled = true;
    };
  }, [academyId]);

  async function save() {
    if (!academyId) return;
    setStatus('saving');
    setError('');
    try {
      const current = await loadAcademyRecord(academyId);
      await putAcademyRecord({ ...current, id: academyId, guardianWord: value.trim() });
      const stored = await loadAcademyRecord(academyId);
      // The read-back is the proof. Compare against what was asked for, not
      // against what was typed — a trimmed blank is a deliberate clearing.
      if ((stored?.guardianWord || '') !== value.trim()) {
        setStatus('idle');
        setError('The save did not stick. Nothing was changed.');
        return;
      }
      installSchoolWords({ record: stored, content: academyContent() });
      setStatus('saved');
    } catch {
      setStatus('idle');
      setError('Could not save. Nothing was changed.');
    }
  }

  if (!academyId) {
    return <p className="text-sm opacity-70">No school is open, so there is nothing to name yet.</p>;
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-600" htmlFor="guardian-word">
        What should the app call you when it talks to your learner?
      </label>
      <input
        id="guardian-word"
        className="w-full max-w-xs rounded border px-3 py-2"
        value={value}
        maxLength={40}
        placeholder={GENERIC_WORDS.guardian}
        onChange={(e) => {
          setValue(e.target.value);
          setStatus('idle');
        }}
      />
      <p className="text-sm opacity-70">
        Used in sentences like &ldquo;send my work to {guardianWord()}&rdquo;. Leave it blank and the
        app says &ldquo;{GENERIC_WORDS.guardian}&rdquo;.
      </p>
      <div className="flex items-center gap-3">
        <button className="rounded border px-3 py-1" onClick={save} disabled={status === 'saving'}>
          {status === 'saving' ? 'Saving…' : 'Save'}
        </button>
        {status === 'saved' && <span className="text-sm">Saved.</span>}
        {error && <span className="text-sm">{error}</span>}
      </div>
    </div>
  );
}
