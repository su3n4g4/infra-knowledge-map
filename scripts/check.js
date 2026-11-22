#!/usr/bin/env node
// ノートの決まりを点検する。使い方：node scripts/check.js
// エラーが1つでもあれば終了コード 1 を返す。決まりの中身は README.md を参照。

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const MAP_DIR = '_maps';
const TOP_MAP = '00_全体マップ';
const KINDS = ['概念', '実装', '問題', '判断', '考え方'];
const SKIP_DIRS = new Set(['.git', '.obsidian', '.trash', '.claude', 'scripts', '_templates', 'node_modules']);

const errors = [];
const warnings = [];
const err = (file, msg) => errors.push(`${file}: ${msg}`);
const warn = (file, msg) => warnings.push(`${file}: ${msg}`);

// ---- 読み込み ----

function walk(dir) {
  return fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true }).flatMap((e) => {
    const rel = dir ? `${dir}/${e.name}` : e.name;
    if (e.isDirectory()) return SKIP_DIRS.has(e.name) ? [] : walk(rel);
    return [rel];
  });
}

const LINK = /\[\[([^\]|#]+?)(?:[|#][^\]]*)?\]\]/g;
const linksOf = (text) => new Set([...text.matchAll(LINK)].map((m) => m[1].replace(/\\$/, '').trim()));

function frontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  const fm = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(':');
    if (i > 0) fm[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return fm;
}

function section(text, heading) {
  const re = new RegExp(`^## ${heading}\\s*$([\\s\\S]*?)(?=^## |(?![\\s\\S]))`, 'm');
  const m = text.match(re);
  return m ? m[1] : null;
}

const files = walk('');
const EXCALIDRAW = '.excalidraw.md';
const notes = {}; // 名前 → { file, text, fm, links }
for (const file of files.filter((f) => f.endsWith('.md') && !f.endsWith(EXCALIDRAW) && f !== 'README.md')) {
  const name = path.basename(file, '.md');
  if (notes[name]) err(file, `同じ名前のノートが ${notes[name].file} にもある`);
  const text = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const links = linksOf(text);
  links.delete(name);
  notes[name] = { file, text, fm: frontmatter(text), links };
}

// 図は Obsidian のキャンバス（.canvas）か Excalidraw（.excalidraw.md）。1枚のマップにどちらか1つ
const canvases = {}; // 名前 → { file, ext, links }
const addFigure = (file, name, ext, links) => {
  if (canvases[name]) err(file, `同じマップの図が ${canvases[name].file} にもある（図はどちらか1つにする）`);
  canvases[name] = { file, ext, links };
};
for (const file of files.filter((f) => f.endsWith(EXCALIDRAW))) {
  const text = fs.readFileSync(path.join(ROOT, file), 'utf8');
  // リンクは「## Text Elements」に書かれる。%% から後（描画データ）は読まない
  const head = text.split(/^%%\s*$/m)[0];
  if (!/^## Text Elements\s*$/m.test(head)) err(file, 'Excalidraw のファイルとして読めない（## Text Elements が無い）');
  addFigure(file, path.basename(file, EXCALIDRAW), 'excalidraw', linksOf(head));
}
for (const file of files.filter((f) => f.endsWith('.canvas'))) {
  const name = path.basename(file, '.canvas');
  let data;
  try {
    data = JSON.parse(fs.readFileSync(path.join(ROOT, file), 'utf8'));
  } catch (e) {
    err(file, `JSON として読めない（${e.message}）`);
    continue;
  }
  const links = new Set();
  for (const node of data.nodes || []) {
    if (node.text) for (const l of linksOf(node.text)) links.add(l);
    if (node.type === 'file' && node.file) links.add(path.basename(node.file).replace(/\.[^.]+$/, ''));
  }
  addFigure(file, name, 'canvas', links);
}

const isMap = (n) => notes[n] && notes[n].file.startsWith(`${MAP_DIR}/`);
const isNote = (n) => notes[n] && !isMap(n);
const mapNames = Object.keys(notes).filter(isMap);
const noteNames = Object.keys(notes).filter(isNote);

// 全体マップの「これから書く解説」に挙げた名前は、まだファイルが無くてもリンクしてよい
const planned = new Set([...(notes[TOP_MAP] ? linksOf(section(notes[TOP_MAP].text, 'これから書く解説') || '') : [])].filter((l) => !isMap(l)));
for (const p of planned) {
  if (notes[p]) err(notes[TOP_MAP].file, `[[${p}]] はもう作ってある。「これから書く解説」から外し、「分類 → フォルダ」の表に移す`);
  else warn(notes[TOP_MAP].file, `[[${p}]] はまだ書いていない`);
}
const isPlanned = (n) => planned.has(n) && !notes[n];

// マップの説明ページや図の中で、解説（これから書くものを含む）を指しているリンクだけを取り出す
const noteLinks = (set) => new Set([...set].filter((l) => isNote(l) || isPlanned(l)));

// README の「小分類」の表から、使ってよい値を読む
const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');
const subTable = section(readme.replace(/^### /gm, '## '), '小分類') || '';
const allowedSub = {}; // 分類 → Set(小分類)
for (const row of subTable.split(/\r?\n/).filter((l) => l.startsWith('|') && !l.includes('---'))) {
  const cells = row.split('|').slice(1, -1).map((c) => c.trim());
  if (cells.length < 2 || cells[0] === '分類') continue;
  allowedSub[cells[0]] = new Set(cells[1].split('、').map((s) => s.replace(/`/g, '').trim()).filter(Boolean));
}
if (Object.keys(allowedSub).length === 0) err('README.md', '「小分類」の表が見つからない');

// ---- 点検 ----

// 1. 属性
for (const n of noteNames) {
  const { file, fm } = notes[n];
  if (!fm) { err(file, '先頭の属性（---）が無い'); continue; }
  for (const key of ['type', '種類', '分類', '小分類', '確認日']) if (!fm[key]) err(file, `属性 ${key} が空`);
  if (fm.type && fm.type !== '解説') err(file, `type が「解説」ではない（${fm.type}）`);
  if (fm['種類'] && !KINDS.includes(fm['種類'])) err(file, `種類「${fm['種類']}」は ${KINDS.join('／')} のどれでもない`);
  const folder = file.split('/')[0].replace(/^\d+_/, '');
  if (fm['分類'] && fm['分類'] !== folder) err(file, `分類「${fm['分類']}」がフォルダ（${folder}）と違う`);
  if (fm['分類'] && fm['小分類'] && allowedSub[fm['分類']] && !allowedSub[fm['分類']].has(fm['小分類'])) {
    err(file, `小分類「${fm['小分類']}」が README の「小分類」の表に無い`);
  }
  if (fm['確認日'] && !/^\d{4}-\d{2}(-\d{2})?$/.test(fm['確認日'])) err(file, `確認日「${fm['確認日']}」が YYYY-MM か YYYY-MM-DD の形ではない`);
}
for (const n of mapNames) {
  const { file, fm } = notes[n];
  if (!fm) { err(file, '先頭の属性（---）が無い'); continue; }
  for (const key of ['type', '視点', '環境']) if (!fm[key]) err(file, `属性 ${key} が空`);
}

// 2. リンク切れ
const figureLink = (l) => {
  const m = l.match(/^(.+)\.(canvas|excalidraw)$/);
  return m && canvases[m[1]] && canvases[m[1]].ext === m[2];
};
const exists = (l) => notes[l] || figureLink(l) || isPlanned(l) || l === 'README';
for (const n of Object.keys(notes)) for (const l of notes[n].links) if (!exists(l)) err(notes[n].file, `[[${l}]] の行き先が無い`);
for (const c of Object.keys(canvases)) for (const l of canvases[c].links) if (!exists(l)) err(canvases[c].file, `[[${l}]] の行き先が無い`);

// 3. 図と説明ページが同じ解説を指しているか
for (const m of mapNames) {
  if (m === TOP_MAP) continue;
  const c = canvases[m];
  if (!c) { err(notes[m].file, `図 ${MAP_DIR}/${m}.canvas か ${MAP_DIR}/${m}${EXCALIDRAW} が無い`); continue; }
  if (!notes[m].links.has(`${m}.${c.ext}`)) err(notes[m].file, `図へのリンク [[${m}.${c.ext}]] が無い`);
  if (!c.links.has(m)) err(c.file, `説明ページへのリンク [[${m}]] が無い`);
  const inMd = noteLinks(notes[m].links);
  const inCanvas = noteLinks(c.links);
  for (const l of inCanvas) if (!inMd.has(l)) err(notes[m].file, `図にある [[${l}]] が説明ページに無い`);
  for (const l of inMd) if (!inCanvas.has(l)) err(c.file, `説明ページにある [[${l}]] が図に無い`);
}
for (const c of Object.keys(canvases)) if (!notes[c]) err(canvases[c].file, '同じ名前の説明ページが無い');

// 4. すべての解説が全体マップに載っているか
if (notes[TOP_MAP]) {
  for (const n of noteNames) if (!notes[TOP_MAP].links.has(n)) err(notes[n].file, `${TOP_MAP} に載っていない`);
} else {
  err(MAP_DIR, `${TOP_MAP}.md が無い`);
}

// 5. 「前後のつながり」が、その解説を載せているマップを全部指しているか
const mapsOf = {}; // 解説 → そのマップに載っているマップ（全体マップを除く）
for (const n of noteNames) mapsOf[n] = new Set();
for (const m of mapNames) {
  if (m === TOP_MAP) continue;
  for (const l of noteLinks(notes[m].links)) if (mapsOf[l]) mapsOf[l].add(m);
}
for (const n of noteNames) {
  const { file, text } = notes[n];
  const sec = section(text, '前後のつながり');
  if (sec === null) { err(file, '「前後のつながり」の見出しが無い'); continue; }
  const listed = new Set([...linksOf(sec)].filter(isMap));
  for (const m of mapsOf[n]) if (!listed.has(m)) err(file, `「前後のつながり」に [[${m}]] の行が無い（そのマップに載っている）`);
  for (const m of listed) if (!mapsOf[n].has(m)) err(file, `「前後のつながり」の [[${m}]] に、この解説は載っていない`);
  if (mapsOf[n].size === 0 && !sec.includes('マップには直接載らない')) {
    err(file, 'どのマップにも載っていない。載せるか、「前後のつながり」に「マップには直接載らない（〜として載る）」と書く');
  }
  for (const line of sec.split(/\r?\n/).filter((l) => l.trim())) {
    if (!line.startsWith('- ')) err(file, `「前後のつながり」が「- [[マップ]]（位置）：…」の形の行になっていない：${line.slice(0, 30)}`);
  }
}

// 6. 「関連する解説」に書いた相手が、こちらへリンクしているか
for (const n of noteNames) {
  const sec = section(notes[n].text, '関連する解説');
  if (sec === null) { err(notes[n].file, '「関連する解説」の見出しが無い'); continue; }
  for (const l of linksOf(sec)) {
    if (isNote(l) && !notes[l].links.has(n)) err(notes[n].file, `関連する解説の [[${l}]] から、こちらへのリンクが無い`);
  }
}

// ---- 結果 ----

for (const w of warnings) console.log(`注意  ${w}`);
for (const e of errors) console.log(`エラー ${e}`);
console.log(`\n解説 ${noteNames.length} 本、マップ ${mapNames.length} 枚、図 ${Object.keys(canvases).length} 枚を点検。エラー ${errors.length} 件、注意 ${warnings.length} 件。`);
process.exit(errors.length ? 1 : 0);
