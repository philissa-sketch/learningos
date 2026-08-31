// ---------------------------------------------------------------------------
// MAKE THE ZIP FOR HIS COMPUTER.  Run: node scripts/package-update.mjs
//
// ---- WHY (Aug 10, 2026) ----
//
// The parent: "when selecting reading on my computer it opens to reading, when
// my son opens the link on his computer it has the coding not the reading."
//
// Neither computer was broken. Hers had the current code; his had a copy zipped
// the previous evening, from before the Reading & Literature lessons were
// switched on — so the row that is Reading on her screen was still the old
// rotating-block Technology lesson on his, which is coding.
//
// PROGRESS SYNCS BETWEEN THE TWO MACHINES. CODE DOES NOT, and never has. Until
// now the zip was made by hand, which means it was made when someone
// remembered, and dated by whatever the file system happened to say.
//
// This script does three things in one command, so they cannot come apart:
//   1. stamps src/lib/buildStamp.js with the moment of packaging
//   2. zips the app WITHOUT node_modules, the backups, or the old zip
//   3. prints what to do with the result, in her words not mine
//
// The stamp is printed in the top bar of the app on both computers. Same two
// screens, same text = same build. That is the check that did not exist.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Everything the app needs to RUN, and nothing else. node_modules is rebuilt by
// START-MISSION-CONTROL.bat on his machine (npm install, once), the backups are
// hundreds of megabytes of history he has no use for, and including the old zip
// inside the new zip is how a 6MB file becomes a 60MB one.
const INCLUDE = [
  'src',
  'scripts',
  'docs',
  'index.html',
  'package.json',
  'package-lock.json',
  'vite.config.js',
  'tailwind.config.js',
  'postcss.config.js',
  'README.md',
  'READ-ME-FIRST.txt',
  'START-MISSION-CONTROL.bat'
];

/**
 * ---- THIS NO LONGER STAMPS ANYTHING (Aug 24, 2026) ----
 *
 * It used to rewrite `export const BUILD_STAMP = '...'` in
 * src/lib/buildStamp.js with the moment of packaging, so the zip and the
 * stamp could never disagree.
 *
 * The app is on Netlify now. `vite.config.js` injects the stamp at build time
 * via `define`, which means the deployed copy stamps itself and there is no
 * longer a hand-written line to rewrite. Left as it was, the old function
 * would throw `could not find BUILD_STAMP to rewrite` the first time she ran
 * this — loud, at least, but for no reason.
 *
 * The zip itself still has a job: it is the offline copy, for the days the
 * internet is out. That copy runs `npm run dev`, which applies the same
 * `define`, so it stamps itself too.
 */
function stamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const text = stamp();
const out = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(REPO, 'mission-control-homeschool.zip');
try {
  fs.rmSync(out, { force: true });
} catch {
  // A locked or read-only old archive is not a reason to stop: both writers
  // below replace it in place anyway (-Force on Windows, -FS elsewhere).
}

const present = INCLUDE.filter((rel) => fs.existsSync(path.join(REPO, rel)));
const missing = INCLUDE.filter((rel) => !fs.existsSync(path.join(REPO, rel)));

/**
 * ---- THE ZIP IS WRITTEN HERE, NOT SHELLED OUT ----
 *
 * The first version called PowerShell's Compress-Archive on Windows and `zip`
 * everywhere else. Both are perfectly good; neither could be TESTED from where
 * this was written, and the whole reason this script exists is that a copy of
 * the app reached his computer without anyone being able to check it.
 *
 * A zip file is a documented format and node ships the only hard part
 * (deflate) in its standard library, so this writes it directly. No external
 * tool, nothing to install, same result on her machine and on his, and it can
 * be run and verified anywhere.
 */
const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i += 1) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function walk(rel) {
  const abs = path.join(REPO, rel);
  if (fs.statSync(abs).isFile()) return [rel];
  const out = [];
  for (const entry of fs.readdirSync(abs, { withFileTypes: true })) {
    out.push(...walk(path.join(rel, entry.name)));
  }
  return out;
}

function writeZip(destination, relPaths) {
  const locals = [];
  const central = [];
  let offset = 0;

  for (const rel of relPaths) {
    const name = Buffer.from(rel.split(path.sep).join('/'), 'utf8');
    const raw = fs.readFileSync(path.join(REPO, rel));
    const deflated = zlib.deflateRawSync(raw, { level: 9 });
    // Storing beats deflating when deflating made it bigger — which happens on
    // small or already-compressed files.
    const useDeflate = deflated.length < raw.length;
    const body = useDeflate ? deflated : raw;
    const method = useDeflate ? 8 : 0;
    const crc = crc32(raw);

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);          // version needed
    local.writeUInt16LE(0x0800, 6);      // UTF-8 names
    local.writeUInt16LE(method, 8);
    local.writeUInt16LE(0, 10);          // mod time — fixed, so identical input gives an identical file
    local.writeUInt16LE(0x21, 12);       // mod date — 1980-01-01
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(body.length, 18);
    local.writeUInt32LE(raw.length, 22);
    local.writeUInt16LE(name.length, 26);
    local.writeUInt16LE(0, 28);
    locals.push(local, name, body);

    const dir = Buffer.alloc(46);
    dir.writeUInt32LE(0x02014b50, 0);
    dir.writeUInt16LE(20, 4);
    dir.writeUInt16LE(20, 6);
    dir.writeUInt16LE(0x0800, 8);
    dir.writeUInt16LE(method, 10);
    dir.writeUInt16LE(0, 12);
    dir.writeUInt16LE(0x21, 14);
    dir.writeUInt32LE(crc, 16);
    dir.writeUInt32LE(body.length, 20);
    dir.writeUInt32LE(raw.length, 24);
    dir.writeUInt16LE(name.length, 28);
    dir.writeUInt32LE(0, 38);            // external attrs
    dir.writeUInt32LE(offset, 42);
    central.push(dir, name);

    offset += local.length + name.length + body.length;
  }

  const centralBuf = Buffer.concat(central);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(relPaths.length, 8);
  end.writeUInt16LE(relPaths.length, 10);
  end.writeUInt32LE(centralBuf.length, 12);
  end.writeUInt32LE(offset, 16);

  fs.writeFileSync(destination, Buffer.concat([...locals, centralBuf, end]));
}

const files = present.flatMap(walk);
writeZip(out, files);

const mb = (fs.statSync(out).size / (1024 * 1024)).toFixed(1);
console.log(`\nBuild ${text}  ->  ${path.basename(out)}  (${mb} MB, ${files.length} files)`);
if (missing.length) console.log(`(skipped, not present: ${missing.join(', ')})`);
console.log(`
ON HIS COMPUTER
  1. Copy mission-control-homeschool.zip across.
  2. Unzip it OVER the top of his existing folder, saying yes to replacing files.
  3. Start it as normal. His progress is in his browser, not in the folder, so
     nothing he has done is lost.
  4. Check the top bar of the app on BOTH computers. Both should read ${text}.
     If his still shows an older stamp, the unzip did not land in the right folder.
`);
