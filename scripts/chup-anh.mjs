// Chụp ảnh một trang cho PR: máy tính sáng (1280) + điện thoại tối (390), deviceScaleFactor 2.
// Cần bản preview đang chạy:  pnpm build && pnpm preview --port 4321
// Dùng:  node scripts/chup-anh.mjs <slug> <thư-mục-ảnh> [selector ...]
//   vd:  node scripts/chup-anh.mjs nhin-ky-vu-cuop trang-9-nhin-ky-vu-cuop "#t9m" "#t9n"
// Ảnh lưu ở docs/screenshots/<thư-mục-ảnh>/. In ra lỗi console và độ tràn ngang (phải là 0).
import { createRequire } from 'node:module';
// Tìm playwright: trong repo trước, rồi NODE_PATH / cài toàn cục (npm i -g playwright).
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
import { mkdirSync } from 'node:fs';

const [slug, thuMuc, ...chon] = process.argv.slice(2);
if (!slug || !thuMuc) { console.error('Dùng: node scripts/chup-anh.mjs <slug> <thư-mục-ảnh> [selector ...]'); process.exit(1); }
const goc = process.env.GOC || 'http://localhost:4321/kinh-te-tu-so-0/trang/';
const dir = `docs/screenshots/${thuMuc}/`;
mkdirSync(dir, { recursive: true });

const b = await chromium.launch();
const loi = [];
for (const [w, h, theme, ten] of [[1280, 900, 'light', 'may-tinh-sang'], [390, 844, 'dark', 'dien-thoai-toi']]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, colorScheme: theme, reducedMotion: 'reduce' });
  const p = await ctx.newPage();
  p.on('pageerror', e => loi.push(e.message));
  p.on('console', m => m.type() === 'error' && loi.push(m.text()));
  await p.goto(goc + slug + '/');
  await p.screenshot({ path: `${dir}${ten}-dau.png` });
  for (const s of chon) {
    await p.locator(s).first().screenshot({ path: `${dir}${ten}-${s.replace(/[^a-z0-9]/gi, '')}.png` });
  }
  const tran = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  console.log(`${ten}: tràn ngang ${tran}px`);
  await ctx.close();
}
console.log(loi.length ? 'LỖI CONSOLE:\n' + loi.join('\n') : 'Không lỗi console.');
await b.close();
