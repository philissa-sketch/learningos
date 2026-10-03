/**
 * A WORD FILE WITHOUT A LIBRARY. (Oct 3, 2026.)
 *
 * The parent asked to get his typed reports into Google Docs in her Drive.
 * Google Docs opens a .docx and converts it, and a .docx is a zip of three
 * small XML files, so this writes one by hand rather than adding a dependency
 * (and an install step on a machine where the last install was wrong-platform)
 * for what is a title, some headings and some paragraphs.
 *
 * The zip is "stored" (no compression): reports are a few KB, the format is
 * trivial to get right, and every reader accepts it.
 */

const enc = new TextEncoder();

let CRC_TABLE = null;
function crc32(bytes) {
  if (!CRC_TABLE) {
    CRC_TABLE = new Uint32Array(256);
    for (let n = 0; n < 256; n += 1) {
      let c = n;
      for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      CRC_TABLE[n] = c >>> 0;
    }
  }
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i += 1) crc = CRC_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

/** entries: [{ name, data: Uint8Array }] -> Uint8Array (a zip, stored). */
export function zipStore(entries, now = new Date()) {
  const dosTime = (now.getHours() << 11) | (now.getMinutes() << 5) | (now.getSeconds() >> 1);
  const dosDate = ((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate();
  const parts = [];
  const central = [];
  let offset = 0;

  for (const e of entries) {
    const name = enc.encode(e.name);
    const crc = crc32(e.data);
    const local = new DataView(new ArrayBuffer(30));
    local.setUint32(0, 0x04034b50, true);
    local.setUint16(4, 20, true);
    local.setUint16(6, 0x0800, true); // names are UTF-8
    local.setUint16(8, 0, true); // stored
    local.setUint16(10, dosTime, true);
    local.setUint16(12, dosDate, true);
    local.setUint32(14, crc, true);
    local.setUint32(18, e.data.length, true);
    local.setUint32(22, e.data.length, true);
    local.setUint16(26, name.length, true);
    local.setUint16(28, 0, true);
    parts.push(new Uint8Array(local.buffer), name, e.data);

    const cd = new DataView(new ArrayBuffer(46));
    cd.setUint32(0, 0x02014b50, true);
    cd.setUint16(4, 20, true);
    cd.setUint16(6, 20, true);
    cd.setUint16(8, 0x0800, true);
    cd.setUint16(10, 0, true);
    cd.setUint16(12, dosTime, true);
    cd.setUint16(14, dosDate, true);
    cd.setUint32(16, crc, true);
    cd.setUint32(20, e.data.length, true);
    cd.setUint32(24, e.data.length, true);
    cd.setUint16(28, name.length, true);
    cd.setUint32(42, offset, true);
    central.push(new Uint8Array(cd.buffer), name);
    offset += 30 + name.length + e.data.length;
  }

  const cdSize = central.reduce((n, p) => n + p.length, 0);
  const end = new DataView(new ArrayBuffer(22));
  end.setUint32(0, 0x06054b50, true);
  end.setUint16(8, entries.length, true);
  end.setUint16(10, entries.length, true);
  end.setUint32(12, cdSize, true);
  end.setUint32(16, offset, true);

  const all = [...parts, ...central, new Uint8Array(end.buffer)];
  const out = new Uint8Array(all.reduce((n, p) => n + p.length, 0));
  let at = 0;
  for (const p of all) { out.set(p, at); at += p.length; }
  return out;
}

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    // XML 1.0 forbids most control characters; a stray one makes Word refuse the file.
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '');

function paragraph(text, { bold = false, size = 24, spaceAfter = 160 } = {}) {
  const rPr = `<w:rPr>${bold ? '<w:b/>' : ''}<w:sz w:val="${size}"/></w:rPr>`;
  const run = text === '' ? '' : `<w:r>${rPr}<w:t xml:space="preserve">${esc(text)}</w:t></w:r>`;
  return `<w:p><w:pPr><w:spacing w:after="${spaceAfter}"/></w:pPr>${run}</w:p>`;
}

/**
 * doc: { title, byline?, sections: [{ heading?, text }] }
 * Blank lines in `text` become paragraph breaks, single newlines stay line breaks
 * as separate paragraphs -- what he typed is what the page shows.
 */
export function buildDocx(doc) {
  const body = [];
  body.push(paragraph(doc.title, { bold: true, size: 36, spaceAfter: 80 }));
  if (doc.byline) body.push(paragraph(doc.byline, { size: 20, spaceAfter: 280 }));
  for (const s of doc.sections || []) {
    if (!s.text || !s.text.trim()) continue;
    if (s.heading) body.push(paragraph(s.heading, { bold: true, size: 28, spaceAfter: 100 }));
    for (const line of s.text.replace(/\r\n?/g, '\n').split('\n')) body.push(paragraph(line));
  }

  const documentXml =
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>' +
    body.join('') +
    '<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/></w:sectPr>' +
    '</w:body></w:document>';

  const contentTypes =
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
    '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
    '<Default Extension="xml" ContentType="application/xml"/>' +
    '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>' +
    '</Types>';

  const rels =
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
    '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>' +
    '</Relationships>';

  return zipStore([
    { name: '[Content_Types].xml', data: enc.encode(contentTypes) },
    { name: '_rels/.rels', data: enc.encode(rels) },
    { name: 'word/document.xml', data: enc.encode(documentXml) }
  ]);
}

/** `YYYY-MM-DD Subject — Title.docx`, the convention in the Drive READ ME. */
export function driveFileName({ date, subject, title }) {
  const clean = (s) => String(s || '').replace(/[\\/:*?"<>|\u0000-\u001F]/g, '').replace(/\s+/g, ' ').trim();
  const head = [clean(date), clean(subject)].filter(Boolean).join(' ');
  const name = [head, clean(title)].filter(Boolean).join(' — ').slice(0, 120).trim();
  return `${name || 'Untitled'}.docx`;
}
