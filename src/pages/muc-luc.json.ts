// Danh sách trang gọn cho mục lục giấu (tải khi người đọc bấm nút ☰).
import { tatCa } from '../lib/trang';

export function GET() {
  const ds = tatCa.map(({ so, slug, ten, cha }) => ({ so, slug, ten, cha }));
  return new Response(JSON.stringify(ds), { headers: { 'Content-Type': 'application/json' } });
}
