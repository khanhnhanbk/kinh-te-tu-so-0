# Kinh tế từ số 0

Dự án 100% AI code. Novian đặt câu hỏi, Claude dựng trang trả lời. Không cần hỏi chi tiết kỹ thuật, chỉ hỏi khi đụng hướng nội dung. Sách có thể lên 100, 1000 trang vì "câu hỏi thì không bao giờ hết": mọi thứ phải thêm trang mới mà không sửa trang cũ.

## Luật của cuốn sách

- **Lật trang bằng câu hỏi.** Mỗi trang mới trả lời đúng câu Novian hỏi. Câu hỏi ghi ở `cauHoi` trong `meta.json` (giữ nguyên ý Novian, sửa chính tả cho gọn); nó hiện ở đầu trang mới và thành nút ở cuối trang cha. Tên trang (`ten`) ngắn, không ngắt dòng lủng củng.
- Các trang nối thành **cây**: mỗi trang có `cha` (trang mà câu hỏi được hỏi ở đó, hoặc `"bia"`). Một trang có thể có nhiều câu hỏi con. Mặc định cha là trang mới nhất Novian vừa đọc; nếu câu hỏi rõ ràng nối từ trang khác thì chọn trang đó.
- Trang chưa có con tự hiện ô "đang chờ câu hỏi" + `goiY` (3 gợi ý).
- Không theo lịch sử, đi từ đơn giản đến trừu tượng. `danSo` là số người trên hành tinh lúc đó.
- Câu hỏi xuyên suốt: "+100k / −100k sao không phải tổng bằng không?" CHƯA trả lời thẳng; mỗi trang gieo thêm một mảnh trong khối `.cau-hoi-lon`.
- Mỗi trang: ít nhất một thứ bấm/kéo được (mục tiêu "lật trang là wow"), rồi ghi nhớ + từ khóa Việt–Anh, tự kiểm tra, nguồn (gập trong `details.gap`).
- Kiến thức chuẩn vi mô/vĩ mô, có nguồn thật; ưu tiên ý từ người đoạt Nobel kinh tế. Không bịa trích dẫn.
- **Khái niệm nối trang.** Khái niệm mới của trang khai ở `khaiNiem` trong `meta.json` (`id`, `ten`, `en`, `nghia` 1–2 câu), chỗ định nghĩa trong `Trang.astro` mang `id="kn-<id>"`. Trang sau nhắc lại thì viết `<KN id="<id>">chữ</KN>` (import `../../components/KN.astro`), KHÔNG ghi kiểu "(…, trang 1)": bấm vào hiện thẻ định nghĩa ngay tại chỗ, kèm link về đúng đoạn ở trang cũ. `pnpm kiem` soát id.
- **Câu chữ:** soát theo `docs/van-phong.md` (11 điều + bảng lỗi đã gặp) trước khi mở PR; gặp lỗi mới thì thêm vào bảng.
- Mục lục giấu sau nút ☰, chỉ hiện trang đã mở (lưu ở trình duyệt người đọc).

## Thêm một trang

1. Tạo `src/trang/<số 4 chữ số>-<slug>/` với `meta.json` (xem trang có sẵn: `so`, `slug`, `ten`, `cauHoi`, `cha`, `danSo`, `ngay`, `moTa`, `goiY`) và `Trang.astro` (chỉ phần thân: hình, chữ, trò tương tác, ghi nhớ, tự kiểm tra, nguồn). Đầu trang và cuối trang do `DauTrang`/`CuoiTrang` tự vẽ.
2. JS của trang để trong `<script is:inline>` bọc `(function(){ ... })()`, id phần tử có tiền tố riêng của trang để không đụng trang khác. CSS dùng chung ở `src/styles/sach.css`, chỉ thêm lớp mới khi cần.
3. `pnpm kiem` (soát cây) rồi `pnpm build`. Chụp ảnh qua `pnpm preview`.
4. Thêm một dòng vào bảng "Các trang" trong README.

## Kỹ thuật

- Astro 7, build tĩnh, `base: /kinh-te-tu-so-0`. Link nội bộ dùng `duongDan()` / `duongTep()` trong `src/lib/trang.ts`, không viết cứng đường dẫn.
- Lật trang là View Transitions giữa hai tài liệu (`@view-transition`), câu hỏi bay nhờ cùng `view-transition-name: q-<so>`. Tự tắt khi người đọc bật giảm chuyển động.
- Nút sáng/tối `position: absolute`, không fixed. Cuộn mượt link `#`. Link ra ngoài `target="_blank" rel="noopener"`.
- Mỗi trang mới một PR (Claude tự squash merge khi CI xanh, Novian chốt 27/11), kèm ảnh chụp ở `docs/screenshots/<chủ-đề>/` (máy tính sáng + điện thoại tối). Soát: không tràn ngang ở 390px, không lỗi console.
- Push lên `main` thì GitHub Actions tự soát, build và đưa lên GitHub Pages.
