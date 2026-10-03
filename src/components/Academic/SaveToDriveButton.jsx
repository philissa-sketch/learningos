import { useEffect, useState } from 'react';
import { buildDocx, driveFileName } from '../../lib/docxWriter.js';
import { driveSaveSupported, rememberedFolder, chooseFolder, saveToFolder } from '../../lib/driveSave.js';

/**
 * "SAVE A COPY TO DRIVE" -- his typed work as a Word file Google Docs opens.
 * (Oct 3, 2026.)
 *
 * The parent: "When book reports, explanations, etc. is typed in the app can it
 * be saved in Google Docs, in the drive?" The app's own copy lives in the
 * browser, on one computer, which has already been emptied once. This puts a
 * second copy in the folder he picks -- Student Work Samples, as Drive for
 * desktop shows it -- the moment he asks.
 *
 * `build()` is called at click time (not render time) so the file is what is in
 * the box NOW, unsaved typing included. Same name overwrites, so pressing it
 * again updates the document rather than piling up copies.
 */
const FOLDER_KEY = 'work-sample';

export function SaveToDriveButton({ build, label = 'Save a copy to Drive' }) {
  const supported = driveSaveSupported();
  const [folderName, setFolderName] = useState(null);
  const [status, setStatus] = useState(null); // { tone: 'ok' | 'bad', text }
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!supported) return;
    let live = true;
    rememberedFolder(FOLDER_KEY).then((h) => { if (live && h) setFolderName(h.name); });
    return () => { live = false; };
  }, [supported]);

  if (!supported) {
    return (
      <p className="text-[11px] text-ink-500">
        Saving to Drive needs Chrome or Edge on this computer.
      </p>
    );
  }

  const save = async () => {
    const doc = build();
    if (!doc.sections.some((s) => s.text && s.text.trim())) {
      setStatus({ tone: 'bad', text: 'Nothing written yet — type something first.' });
      return;
    }
    setBusy(true);
    setStatus(null);
    const res = await saveToFolder(FOLDER_KEY, driveFileName(doc), buildDocx(doc));
    setBusy(false);
    if (res.ok) {
      setFolderName(res.folderName);
      setStatus({ tone: 'ok', text: `Saved to “${res.folderName}” as ${res.fileName}` });
    } else if (!res.cancelled) {
      setStatus({ tone: 'bad', text: res.error });
    }
  };

  const change = async () => {
    try {
      const h = await chooseFolder(FOLDER_KEY);
      setFolderName(h.name);
      setStatus(null);
    } catch { /* picker closed */ }
  };

  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={save}
          disabled={busy}
          className="rounded-md border border-signal-cyan/40 px-3 py-1 text-xs font-display font-700 text-signal-cyan transition hover:bg-signal-cyan/10 disabled:opacity-50"
        >
          {busy ? 'Saving…' : folderName ? label : 'Choose my Drive folder & save'}
        </button>
        {folderName && (
          <span className="text-[11px] text-ink-500">
            Folder: <span className="text-ink-300">{folderName}</span>{' '}
            <button type="button" onClick={change} className="underline decoration-dotted hover:text-ink-200">
              change
            </button>
          </span>
        )}
      </div>
      {status && (
        <p className={'mt-1 text-[11px] ' + (status.tone === 'ok' ? 'text-signal-green' : 'text-signal-amber')}>
          {status.text}
        </p>
      )}
    </div>
  );
}
