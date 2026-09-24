import { useState } from 'react';
import { normalizeEvidenceUrl } from '../../lib/driveLinks.js';
import { SEEDED_FOLDER_URLS } from '../../lib/driveLinks.js';

/**
 * ---- THE PHOTO OF THE BUILD. (Sept 24, 2026.) ----
 *
 * The parent, looking at the cell-model card: *"There isn't a link for the
 * writing or to upload the picture of the project."*
 *
 * The format's own first line is **"The finished thing, photographed or
 * handed over"**, and its checklist ends with *"Photographed it for the
 * record"* — the card asked for a photo and gave him nowhere to put one. A
 * portfolio entry whose evidence is a model is the one kind of work where
 * the photo IS the submission.
 *
 * ---- WHY A LINK AND NOT AN UPLOAD ----
 *
 * This app stores no files, on purpose, and that rule is load-bearing rather
 * than lazy: the two computers trade a hand-carried JSON file every day, and
 * photographs inside it would make that file too big to move. Photos already
 * have a home — the Portfolio Projects folder in her Drive, which the
 * compliance packet already points at.
 *
 * So the flow is: open the folder, upload from the phone, paste the link
 * back. The link travels in the daily export, which means she can open the
 * photo from her own machine while she grades — which an upload trapped in
 * his browser could never have done.
 */
export function BuildPhotoLink({ assignment, onSave }) {
  const [value, setValue] = useState(assignment.photoUrl || '');
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);

  const saved = assignment.photoUrl || null;
  const dirty = value.trim() !== (saved || '');
  const folder = SEEDED_FOLDER_URLS.portfolio;

  async function save() {
    if (busy) return;
    const checked = normalizeEvidenceUrl(value);
    if (!checked.ok) {
      setMsg(checked.error);
      return;
    }
    setBusy(true);
    const res = await onSave(assignment.id, checked.url);
    setMsg(res?.ok ? (checked.url ? 'Photo linked.' : 'Photo link removed.') : res?.error || 'That did not save.');
    setBusy(false);
    setTimeout(() => setMsg(null), 2500);
  }

  return (
    <div className="mt-3 border-t border-space-700 pt-2">
      <p className="text-[10px] font-display uppercase tracking-widest text-signal-cyan">
        Photo of the build
      </p>

      {saved ? (
        <p className="mt-1 text-xs text-ink-300">
          Linked ·{' '}
          <a href={saved} target="_blank" rel="noreferrer" className="text-signal-cyan underline">
            Open the photo ↗
          </a>
        </p>
      ) : (
        <ol className="mt-1 space-y-0.5 text-xs text-ink-400">
          <li>1. Take the photo of the finished build.</li>
          <li>
            2.{' '}
            <a href={folder} target="_blank" rel="noreferrer" className="text-signal-cyan underline">
              Open the Portfolio Projects folder ↗
            </a>{' '}
            and upload it there.
          </li>
          <li>3. Copy its link and paste it below, so it travels with your work.</li>
        </ol>
      )}

      <div className="mt-2 flex flex-wrap gap-2">
        <input
          type="url"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="https://drive.google.com/..."
          className="min-w-0 flex-1 rounded-md border border-space-600 bg-space-900 px-2.5 py-1.5 text-sm text-ink-100 placeholder:text-ink-600 focus:border-signal-cyan focus:outline-none"
        />
        <button
          type="button"
          onClick={save}
          disabled={!dirty || busy}
          className={
            'rounded-md px-3 py-1.5 text-xs font-display font-700 transition ' +
            (dirty && !busy ? 'bg-signal-cyan text-space-950 hover:brightness-110' : 'border border-space-700 text-ink-600')
          }
        >
          {saved && !value.trim() ? 'Remove' : 'Save photo link'}
        </button>
      </div>
      {msg && <p className="mt-1 text-[11px] text-ink-400">{msg}</p>}
    </div>
  );
}
