// Soát chữ rớt dòng ở nhãn, nút, ô số liệu trên mọi trang, ở 1280px và 390px (Novian 28/11: "Mất, không ai được" rớt dòng).
// Cần bản preview đang chạy:  pnpm build && pnpm preview --port 4321
// Dùng:  node scripts/soat-rot-dong.mjs        → in ra những chỗ chữ ngắn bị tách thành 2+ dòng.
// Chú giải biểu đồ (.chu-giai) và tiêu đề khối (.nhan) dài trên điện thoại được phép xuống dòng nên không soát.
import { createRequire } from 'node:module';
// Tìm playwright: trong repo trước, rồi NODE_PATH / cài toàn cục (npm i -g playwright).
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
import { readdirSync } from 'node:fs';

const goc = process.env.GOC || 'http://localhost:4321/kinh-te-tu-so-0/trang/';
const slugs = readdirSync('src/trang').map(d => d.replace(/^\d{4}-/, ''));
const CHON = '.cot-hat .nhan, .do span, .chip, .nut-nho, .dong-gia > span:not(.o-so), th, .thanh label > span';

const b = await chromium.launch();
let tong = 0;
for (const w of [1280, 390]) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  for (const s of slugs) {
    await p.goto(goc + s + '/');
    const ra = await p.evaluate((chon) => {
      const out = [];
      document.querySelectorAll(chon).forEach(e => {
        if (!e.offsetParent) return;
        const t = e.textContent.trim().replace(/\s+/g, ' ');
        if (!t || t.length > 45) return;
        const r = document.createRange(); r.selectNodeContents(e);
        const dong = new Set([...r.getClientRects()].filter(x => x.width > 1).map(x => Math.round(x.top))).size;
        if (dong > 1) out.push(`${dong} dòng | ${t}`);
      });
      return out;
    }, CHON);
    if (ra.length) { tong += ra.length; console.log(`== ${w}px ${s}\n  ` + ra.join('\n  ')); }
  }
  await p.close();
}
console.log(tong ? `${tong} chỗ cần xem lại (xem ảnh để chắc).` : 'Không chỗ nào rớt dòng.');
await b.close();
