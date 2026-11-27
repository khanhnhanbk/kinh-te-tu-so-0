// Danh sách mọi trang của sách, đọc tự động từ src/trang/<0000-slug>/{meta.json, Trang.astro}.
// Các trang nối nhau thành một cây: mỗi trang có một "cha" (trang có câu hỏi dẫn tới nó), gốc là "bia".
import type { AstroComponentFactory } from 'astro/runtime/server/index.js';

export interface MetaTrang {
  so: number;          // số thứ tự theo ngày viết, duy nhất
  slug: string;        // đường dẫn /trang/<slug>/, duy nhất
  ten: string;         // tên trang (h1), ngắn
  cauHoi: string;      // câu hỏi đã mở ra trang này (của người đọc)
  cha: string;         // slug trang cha, hoặc "bia"
  danSo: number | string; // số người trên hành tinh ở trang này
  ngay: string;        // ngày viết, YYYY-MM-DD
  moTa: string;        // một câu mô tả, dùng cho thẻ meta
  goiY?: string[];     // gợi ý câu hỏi khi trang chưa có trang con
}
export interface Trang extends MetaTrang { NoiDung: AstroComponentFactory }

const metas = import.meta.glob<MetaTrang>('../trang/*/meta.json', { eager: true, import: 'default' });
const noiDung = import.meta.glob<{ default: AstroComponentFactory }>('../trang/*/Trang.astro', { eager: true });

export const tatCa: Trang[] = Object.entries(metas)
  .map(([duong, meta]) => {
    const comp = noiDung[duong.replace('meta.json', 'Trang.astro')];
    if (!comp) throw new Error(`Thiếu Trang.astro cạnh ${duong}`);
    return { ...meta, NoiDung: comp.default };
  })
  .sort((a, b) => a.so - b.so);

// Kiểm tra cây ngay lúc build: trùng số/slug hoặc cha không tồn tại thì build hỏng.
const slugs = new Set<string>();
for (const t of tatCa) {
  if (slugs.has(t.slug)) throw new Error(`Trùng slug: ${t.slug}`);
  slugs.add(t.slug);
}
for (const t of tatCa) {
  if (t.cha !== 'bia' && !slugs.has(t.cha)) throw new Error(`Trang ${t.slug} có cha không tồn tại: ${t.cha}`);
}

export const trangCon = (slug: string) => tatCa.filter((t) => t.cha === slug);
export const timTrang = (slug: string) => tatCa.find((t) => t.slug === slug);

const BASE = import.meta.env.BASE_URL.replace(/\/?$/, '/');
export const duongDan = (slug: string) => (slug === 'bia' ? BASE : `${BASE}trang/${slug}/`);
export const duongTep = (tep: string) => BASE + tep;
