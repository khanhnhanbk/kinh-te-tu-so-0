# Kinh tế từ số 0

Dự án 100% AI code. Novian đặt câu hỏi, Claude dựng trang trả lời. Không cần hỏi chi tiết kỹ thuật, chỉ hỏi khi đụng hướng nội dung.

## Luật của cuốn sách

- **Lật trang bằng câu hỏi.** Mỗi trang mới trả lời đúng câu Novian hỏi. Câu hỏi nằm ở `.cau-hoi-mo` đầu trang (giữ nguyên ý Novian, sửa chính tả cho gọn) và ở nút `.nut-hoi` cuối trang trước. Tên trang (`h1`) ngắn, không ngắt dòng lủng củng.
- Trang mới nhất luôn kết bằng ô `.cho-cau-hoi` "Trang N đang chờ câu hỏi của bạn" + 3 gợi ý. Khi có câu hỏi mới: đổi ô đó thành nút `.nut-hoi data-den="trang-N"`.
- Không theo lịch sử, đi từ đơn giản đến trừu tượng. Số dân (`.so-dan`) ở đầu mỗi trang.
- Câu hỏi xuyên suốt: "+100k / −100k sao không phải tổng bằng không?" CHƯA trả lời; mỗi trang gieo thêm một mảnh trong khối `.cau-hoi-lon`.
- Mỗi trang: ít nhất một thứ bấm/kéo được (mục tiêu "lật trang là wow"), rồi ghi nhớ + từ khóa Việt–Anh, tự kiểm tra, nguồn (gập trong `details`).
- Kiến thức chuẩn vi mô/vĩ mô, có nguồn thật; ưu tiên ý từ người đoạt Nobel kinh tế. Không bịa trích dẫn.
- Mục lục giấu sau nút ☰, chỉ hiện trang đã mở.

## Kỹ thuật

- Một file `index.html` (CSS + JS trong file), không build. Mỗi trang là `<section class="trang" id="trang-N" data-so="N" data-ten="...">`.
- Nút sáng/tối `position: absolute`, không fixed. Cuộn mượt link `#`. Link ra ngoài `target="_blank" rel="noopener"`.
- Mỗi trang mới một PR, kèm ảnh chụp ở `docs/screenshots/<chủ-đề>/` (máy tính sáng + điện thoại tối). Soát: không tràn ngang ở 390px, không lỗi console.
- Thêm trang thì cập nhật bảng "Các trang" trong README.
