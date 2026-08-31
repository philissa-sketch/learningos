import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import {
  normalizeEvidenceUrl,
  describeEvidenceUrl,
  folderForRecordKind,
  EVIDENCE_FOLDERS
} from '../../lib/driveLinks.js';

/**
 * Shared UI for Google Drive evidence links (parent's request, August 6,
 * 2026: "For storage can we add Google Drive links").
 *
 * Three pieces, one place, because the same paste-validate-edit-clear
 * behaviour is needed in the Portfolio section, the Records section and
 * the Compliance section. Three copies would drift, and the one that
 * drifted would be the one that stopped validating.
 *
 * ALWAYS `rel="noreferrer"` alongside `target="_blank"`. Without it the
 * opened page gets a handle on this one via window.opener. These links
 * point at her own Drive, but the field accepts anything she pastes.
 */

/** A link, rendered. Returns null when there's nothing to show. */
export function EvidenceLinkChip({ url, className = '' }) {
  if (!url) return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className={
        'inline-flex items-center gap-1 rounded-full border border-signal-cyan/40 bg-signal-cyan/10 px-2 py-0.5 text-xs text-signal-cyan hover:brightness-125 ' +
        className
      }
    >
      <span aria-hidden="true">🔗</span>
      {describeEvidenceUrl(url)}
    </a>
  );
}

/**
 * The paste field used inside an "add a record" form, before the record
 * exists. Validation is advisory here rather than blocking: the store
 * drops an unparseable URL and keeps the record, because losing a logged
 * field trip over a mistyped link would be the worse outcome.
 */
export function EvidenceLinkInput({ value, onChange, folderKey, placeholder }) {
  const evidenceLinks = useAppStore((s) => s.evidenceLinks);
  const folder = EVIDENCE_FOLDERS.find((f) => f.key === folderKey);
  const folderUrl = folderKey ? evidenceLinks[folderKey] : null;
  const check = normalizeEvidenceUrl(value);

  return (
    <div>
      <input
        type="url"
        inputMode="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || 'Paste a Google Drive link (optional)'}
        className="w-full rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500 focus:border-signal-cyan focus:outline-none"
      />
      <p className="mt-1 text-xs text-ink-600">
        {!check.ok ? (
          <span className="text-signal-amber">{check.error}</span>
        ) : (
          <>
            Upload the file to Drive first, then paste the share link here. Nothing is stored in this app.
            {folderUrl && folder && (
              <>
                {' '}
                <a
                  href={folderUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-signal-cyan underline hover:brightness-110"
                >
                  Open the {folder.label} folder
                </a>
              </>
            )}
          </>
        )}
      </p>
    </div>
  );
}

/**
 * The attach-or-edit control shown on a record that already exists.
 *
 * This is the one that matters most in practice. The realistic sequence
 * is: log the field trip the evening it happens, scan the museum program
 * on Saturday. If a link could only be set at creation time, every
 * record would be missing its evidence.
 */
export function EvidenceLinkEditor({ url, onSave, recordKind }) {
  const evidenceLinks = useAppStore((s) => s.evidenceLinks);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(url || '');
  const [error, setError] = useState(null);

  const folder = recordKind ? folderForRecordKind(recordKind) : null;
  const folderUrl = folder ? evidenceLinks[folder.key] : null;

  const handleSave = async () => {
    const result = await onSave(draft);
    if (result && !result.ok) {
      setError(result.error);
      return;
    }
    setError(null);
    setEditing(false);
  };

  if (!editing) {
    return (
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <EvidenceLinkChip url={url} />
        <button
          type="button"
          onClick={() => {
            setDraft(url || '');
            setError(null);
            setEditing(true);
          }}
          className="text-xs text-ink-500 underline hover:text-signal-cyan"
        >
          {url ? 'Change link' : 'Attach a Drive link'}
        </button>
        {!url && folderUrl && (
          <a
            href={folderUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-ink-600 underline hover:text-signal-cyan"
          >
            Open {folder.label} folder
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="url"
          inputMode="url"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Paste the Drive share link"
          className="min-w-[12rem] flex-1 rounded-lg border border-space-600 bg-space-900 px-3 py-1.5 text-xs text-ink-100 placeholder:text-ink-500 focus:border-signal-cyan focus:outline-none"
        />
        <button
          type="button"
          onClick={handleSave}
          className="rounded-lg bg-signal-cyan px-3 py-1.5 text-xs font-display font-700 text-space-950 hover:brightness-110"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => {
            setEditing(false);
            setError(null);
          }}
          className="text-xs text-ink-500 hover:text-ink-100"
        >
          Cancel
        </button>
      </div>
      {error && <p className="mt-1 text-xs text-signal-amber">{error}</p>}
      {!error && url && (
        <p className="mt-1 text-xs text-ink-600">Clear the box and save to remove the link.</p>
      )}
    </div>
  );
}

/**
 * The folder index — every named folder, its link, and an inline editor.
 *
 * Lives in the Compliance section because that is where the packet is
 * generated and where "where do my actual files live" is the question
 * being asked. The eight folders were created in her Drive at her
 * request and seeded, so this opens populated rather than empty.
 */
export function EvidenceFoldersSection() {
  const evidenceLinks = useAppStore((s) => s.evidenceLinks);
  const setEvidenceFolderLink = useAppStore((s) => s.setEvidenceFolderLink);

  return (
    <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
      <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Where the files live</p>
      <h3 className="mt-1 font-display text-lg font-700 text-ink-100">Google Drive Folders</h3>
      <p className="mt-2 text-sm text-ink-300">
        This app stores <strong>no files</strong> — only links. Scans, photos, certificates and score reports
        go in Drive, where they're backed up and will outlive this app. That's the point: Georgia asks you to
        retain records for at least three years, and a browser reset would take anything kept here.
      </p>

      <div className="mt-3 space-y-2">
        {EVIDENCE_FOLDERS.map((folder) => (
          <FolderRow
            key={folder.key}
            folder={folder}
            url={evidenceLinks[folder.key] || null}
            onSave={(value) => setEvidenceFolderLink(folder.key, value)}
          />
        ))}
      </div>
    </div>
  );
}

function FolderRow({ folder, url, onSave }) {
  return (
    <div className="rounded-lg border border-space-700 bg-space-900 px-3 py-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-display text-sm font-700 text-ink-100">{folder.label}</p>
          <p className="mt-0.5 text-xs text-ink-500">{folder.blurb}</p>
        </div>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="flex-none rounded-lg border border-signal-cyan/40 bg-signal-cyan/10 px-2.5 py-1 text-xs font-display font-600 text-signal-cyan hover:brightness-125"
          >
            Open
          </a>
        )}
      </div>
      <EvidenceLinkEditor url={url} onSave={onSave} />
    </div>
  );
}
