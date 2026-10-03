// ---------------------------------------------------------------------------
// HIS TYPED WORK, AS A FILE IN DRIVE. Run: node scripts/verify-drive-save.mjs
//
// The parent, Oct 3 2026: "When book reports, explanations, etc. is typed in the
// app can it be saved in Google Docs, in the drive?" -> a Word file Google Docs
// opens, written into the folder he picks. These checks hold the two things
// that fail silently: a file Word/Docs refuses to open, and a button that is
// on one screen and missing from the other.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { buildDocx, driveFileName, zipStore } from '../src/lib/docxWriter.js';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
}
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');

console.log('\n--- 1. the file is a real .docx ---');
const bytes = buildDocx({
  title: 'Hatchet — reading response',
  byline: 'Reading · due 2026-10-09',
  sections: [
    { heading: 'Notes', text: 'Brian “loses” the hatchet & <regrets> it.\n\nSecond paragraph.' },
    { heading: 'Rough draft', text: '   ' },
    { heading: 'Finished copy', text: 'He survives.\r\nHe learns.' }
  ]
});
const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
ok('starts as a zip', dv.getUint32(0, true) === 0x04034b50);
ok('ends with an end-of-directory record', dv.getUint32(bytes.length - 22, true) === 0x06054b50);

// Walk the zip independently of the writer and check every CRC.
const entries = {};
{
  const count = dv.getUint16(bytes.length - 22 + 10, true);
  let p = dv.getUint32(bytes.length - 22 + 16, true);
  for (let i = 0; i < count; i += 1) {
    const crc = dv.getUint32(p + 16, true);
    const size = dv.getUint32(p + 24, true);
    const nameLen = dv.getUint16(p + 28, true);
    const off = dv.getUint32(p + 42, true);
    const name = new TextDecoder().decode(bytes.subarray(p + 46, p + 46 + nameLen));
    const dataStart = off + 30 + dv.getUint16(off + 26, true) + dv.getUint16(off + 28, true);
    const data = bytes.subarray(dataStart, dataStart + size);
    entries[name] = { data, crcOk: zlib.crc32(data) === crc };
    p += 46 + nameLen;
  }
}
ok('has the three parts Word requires', ['[Content_Types].xml', '_rels/.rels', 'word/document.xml'].every((n) => entries[n]));
ok('every part’s CRC matches', Object.values(entries).every((e) => e.crcOk));
const xml = new TextDecoder().decode(entries['word/document.xml']?.data || new Uint8Array());
ok('what he typed is in the document', xml.includes('He survives.') && xml.includes('Second paragraph.'));
ok('& and < in his text are escaped, so the XML stays valid',
  xml.includes('&amp; &lt;regrets&gt;') && !/<regrets>/.test(xml));
ok('an empty section is left out rather than printing a bare heading',
  !xml.includes('Rough draft'));
ok('curly quotes and accents survive', xml.includes('“loses”'));

console.log('\n--- 2. the file name follows the Drive READ ME ---');
ok('YYYY-MM-DD Subject — Title.docx',
  driveFileName({ date: '2026-10-09', subject: 'Reading', title: 'Hatchet' }) === '2026-10-09 Reading — Hatchet.docx');
ok('characters Drive and Windows refuse are removed',
  !/[\\/:*?"<>|]/.test(driveFileName({ date: '2026-10-09', subject: 'Sci', title: 'a/b: c?*"<>|' })));
ok('a missing date or subject does not leave a dangling dash',
  driveFileName({ title: 'Cell model' }) === 'Cell model.docx');
ok('an absurdly long title is cut', driveFileName({ title: 'x'.repeat(400) }).length <= 125);
ok('zipStore is deterministic about size', zipStore([{ name: 'a', data: new Uint8Array([1, 2, 3]) }]).length === 30 + 1 + 3 + 46 + 1 + 22);

console.log('\n--- 3. it is on BOTH places he types ---');
const writer = read('src/components/Academic/AssignmentWriter.jsx');
const engine = read('src/components/Writing/WritingPromptEngine.jsx');
const btn = read('src/components/Academic/SaveToDriveButton.jsx');
ok('assignment writing boxes (notes, rough draft, finished copy) have it',
  /<SaveToDriveButton/.test(writer) && /Notes & structure[\s\S]{0,80}text: notes/.test(writer) && /Finished copy', text: final/.test(writer));
ok('Writing Journal / project entries have it', /<SaveToDriveButton/.test(engine));
ok('the button is visible on the card, not hidden inside the collapsed "Write it here" box',
  writer.indexOf('<SaveToDriveButton') > writer.indexOf('{msg && <p'),
  'the parent saw only the photo-link field because it was inside the closed box');
ok('she can file his work herself from the grading screen',
  /<SaveToDriveButton[\s\S]{0,60}Save his work to Drive/.test(read('src/components/Academic/AssignmentFormatPicker.jsx')));
ok('the file is built at click time, so unsaved typing is included',
  /const doc = build\(\)/.test(btn) && /build=\{\(\) =>/.test(writer));
ok('a browser without the folder picker is told so, not left with a dead button',
  /Chrome or Edge/.test(btn) && /driveSaveSupported\(\)/.test(btn));

console.log('\n--- 4. the folder is remembered per computer, never exported ---');
const save = read('src/lib/driveSave.js');
ok('the folder handle is stored outside the Dexie schema', /indexedDB\.open\(DB, 1\)/.test(save) && /mc-drive-folders/.test(save));
ok('saving the same document again overwrites it', /getFileHandle\(fileName, \{ create: true \}\)/.test(save));
ok('permission is re-asked when the browser forgot it', /requestPermission/.test(save));
ok('no folder id or Drive URL ships in the code', !/drive\.google\.com\/drive\/folders\/[A-Za-z0-9_-]{20,}/.test(save + btn));
ok('no new dependency was added for it',
  !/"docx"|"jszip"|"file-saver"/.test(read('package.json')));

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) { console.log(`\n${failures.length} CHECK(S) FAILED`); process.exitCode = 1; }
else console.log('\nALL CHECKS PASSED');
