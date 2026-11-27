// Soát cây trang trước khi đẩy: chạy `pnpm kiem`.
// Mỗi thư mục src/trang/<0000-slug>/ phải có meta.json + Trang.astro, số và slug duy nhất, cha tồn tại,
// tên thư mục khớp số + slug, có nguồn và có ít nhất một thứ bấm/kéo được.
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const goc = new URL('../src/trang/', import.meta.url).pathname;
const loi = [];
const ds = readdirSync(goc, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
const theoSlug = new Map(), theoSo = new Map();
const bat = ['so', 'slug', 'ten', 'cauHoi', 'cha', 'danSo', 'ngay', 'moTa'];

for (const ten of ds) {
  const metaTep = join(goc, ten, 'meta.json'), trangTep = join(goc, ten, 'Trang.astro');
  if (!existsSync(metaTep)) { loi.push(`${ten}: thiếu meta.json`); continue; }
  if (!existsSync(trangTep)) loi.push(`${ten}: thiếu Trang.astro`);
  let m;
  try { m = JSON.parse(readFileSync(metaTep, 'utf8')); } catch (e) { loi.push(`${ten}: meta.json hỏng (${e.message})`); continue; }
  for (const k of bat) if (m[k] === undefined || m[k] === '') loi.push(`${ten}: meta.json thiếu "${k}"`);
  if (ten !== `${String(m.so).padStart(4, '0')}-${m.slug}`) loi.push(`${ten}: tên thư mục phải là ${String(m.so).padStart(4, '0')}-${m.slug}`);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(m.slug || '')) loi.push(`${ten}: slug chỉ gồm chữ thường không dấu, số, gạch ngang`);
  if (theoSlug.has(m.slug)) loi.push(`${ten}: trùng slug với ${theoSlug.get(m.slug)}`);
  if (theoSo.has(m.so)) loi.push(`${ten}: trùng số ${m.so} với ${theoSo.get(m.so)}`);
  theoSlug.set(m.slug, ten); theoSo.set(m.so, ten);
  if (existsSync(trangTep)) {
    const html = readFileSync(trangTep, 'utf8');
    if (!/class="gap nguon"/.test(html)) loi.push(`${ten}: chưa có khối Nguồn`);
    if (!/<(input|button)\b/.test(html)) loi.push(`${ten}: chưa có thứ gì bấm/kéo được`);
  }
}
for (const ten of ds) {
  const metaTep = join(goc, ten, 'meta.json');
  if (!existsSync(metaTep)) continue;
  try {
    const m = JSON.parse(readFileSync(metaTep, 'utf8'));
    if (m.cha !== 'bia' && !theoSlug.has(m.cha)) loi.push(`${ten}: cha "${m.cha}" không tồn tại`);
  } catch {}
}
if (loi.length) { console.error('Có lỗi:\n- ' + loi.join('\n- ')); process.exit(1); }
console.log(`Ổn: ${ds.length} trang.`);
