# Bàn giao: tiếp tục xây "Kinh tế từ số 0" từ bất cứ máy nào

Cập nhật 28/11/2026, sau trang 11. File này để một phiên Claude mới (tài khoản mới, máy mới) đọc là làm tiếp được ngay, không phải nghiên cứu lại.

- Repo: https://github.com/khanhnhanbk/kinh-te-tu-so-0 (public)
- Web: https://khanhnhanbk.github.io/kinh-te-tu-so-0/ (push `main` thì GitHub Actions tự build và đưa lên Pages)

## 1. Câu mở đầu để dán vào phiên mới

```
Mình là Novian. Tiếp tục xây sách web "Kinh tế từ số 0" ở repo
github.com/khanhnhanbk/kinh-te-tu-so-0 (clone về nếu chưa có).
Trước khi làm, đọc theo thứ tự: docs/BAN-GIAO.md, CLAUDE.md, docs/van-phong.md,
rồi docs/nghien-cuu/ghi-chu-noi-dung.md. Đừng nghiên cứu lại những gì đã ghi ở đó.
Xưng "mình", gọi mình là "bạn". Dự án 100% AI code: tự quyết kỹ thuật, chỉ hỏi
khi đụng hướng nội dung. Mỗi trang một PR có ảnh chụp, CI xanh thì tự squash merge.
Câu hỏi tiếp theo của mình: <viết câu hỏi ở đây>
```

Câu hỏi đó thành tiêu đề trang mới (trang 12, cha mặc định là trang mới nhất Novian vừa đọc, xem cây ở mục 4). Không có câu hỏi thì chọn một trong ba gợi ý ở mục 4.

## 2. Đọc gì, theo thứ tự

| File | Chứa gì |
|---|---|
| `CLAUDE.md` | Luật của cuốn sách + cách thêm một trang + luật kỹ thuật |
| `docs/van-phong.md` | 19 điều câu chữ + bảng lỗi đã gặp. Soát mọi trang mới theo file này |
| `docs/nghien-cuu/ghi-chu-noi-dung.md` | Bảng trang 1–9 (câu hỏi, ý chính, trò tương tác), dàn ý dự phòng cho các trang sau (Coase, Ostrom, Diamond–Dybvig, Friedman, Solow, Romer, Krugman…), nguồn nền |
| `docs/nghien-cuu/2026-11-27-tro-tuong-tac.md` | Nghiên cứu kiểu trò tương tác hợp Novian (explorable explanations, trò mặc cả kiểu Vernon Smith) |
| `docs/soat/` | Các lượt soát từ vựng đã làm |
| `src/trang/*/meta.json` | Câu hỏi, cha, khái niệm của từng trang. Nguồn đầy đủ nằm trong `details` nguồn cuối mỗi `Trang.astro` |

## 3. Quy trình một trang (đã chạy trơn qua PR #1–#25)

1. Máy mới: `pnpm i`. Ubuntu 26.04: Playwright chưa tải được Chromium cho bản này; dùng bản Chromium có sẵn trong `~/.cache/ms-playwright` (tạo symlink tên bản mới trỏ sang bản cũ) và chạy script với `NODE_PATH=<thư mục node_modules có playwright>`. Script chụp ảnh cần Playwright + Chromium: `npm i -g playwright && npx playwright install chromium` (hoặc chỉ `npx playwright install chromium` nếu playwright đã có).
2. Tạo nhánh từ `main`, thêm `src/trang/<số>-<slug>/{meta.json,Trang.astro}` theo CLAUDE.md, thêm một dòng vào bảng trong README.
3. Soát: `pnpm kiem` (cây + khái niệm), `pnpm build`, rồi chạy `pnpm preview --port 4321` ở nền và:
   - `pnpm soat`: tìm nhãn/nút/ô số liệu bị rớt dòng ở 1280px và 390px. Hai chỗ tiêu đề bảng ở trang 1–2 (390px) đã biết và chấp nhận được.
   - `pnpm chup <slug> <thư-mục> [selector…]`: ảnh máy tính sáng + điện thoại tối (deviceScaleFactor 2) vào `docs/screenshots/<thư-mục>/`, in luôn độ tràn ngang (phải 0px) và lỗi console. Đừng dùng lại tên thư mục ảnh của PR cũ.
4. Soát câu chữ và TỪ VỰNG theo `docs/van-phong.md`.
5. Commit, push, mở PR (nhúng ảnh), CI xanh thì squash merge. Nhánh có thể đã bị xóa sau merge: tạo lại từ `main`.

## 4. Cây hiện tại và câu hỏi đang chờ

```
bìa
└ 1 Thế giới không có gì cả
  └ 2 Ngân hàng của một người
    └ 3 Rau đổi cá
      └ 4 Người may áo
        ├ 5 Ba người, ba món
        │ └ 6 Đồng tiền đầu tiên
        │   ├ 7 Ai làm ra muối?
        │   │ └ 11 Người giữ kho muối   ← trang mới nhất
        │   └ 8 Kẻ cướp và 99 người
        │     └ 9 Nhìn kỹ vụ cướp
        └ 10 Được mùa mất giá
```

Trang 10 (con của trang 4) có gợi ý: "Sao nông dân không bỏ ruộng lên phố hết cho nhanh?", "Nhà nước mua lúa giá cao cho nông dân thì sao?", "Máy móc làm được cả việc dịch vụ thì người ta làm gì?". Gợi ý đang hiện ở cuối trang 9: "Kẻ cướp ở lại thì có khác gì nhà nước thu thuế?" (Olson, kẻ cướp đứng yên, đã gieo ở trang 9), "Lật được kẻ cướp rồi, ai giữ trật tự?", "Người bỏ đi thì đi đâu, và nơi họ đến được gì?". Trang 11 (con của trang 7) có gợi ý: "Ai đứng sau ngân hàng, và ngân hàng trung ương ra đời thế nào?", "Ngân hàng cho vay ra tiền mới thì có gây lạm phát như thợ muối không?", "Lãi suất cao hay thấp là do ai quyết?".

Câu hỏi xuyên suốt "+100k / −100k sao không phải tổng bằng không?" vẫn CHƯA trả lời thẳng; mỗi trang gieo một mảnh trong khối `.cau-hoi-lon`.

## 5. Gu của Novian (học được qua góp ý, giữ nguyên)

- "Mỗi lần lật trang là một lần wow": mỗi trang một ý ngắn + một thứ bấm được.
- Trò chơi là **bấm chuột + điền tham số** (ô số −/+, chọn mẫu luật), KHÔNG bắt viết code (PR #10 → #11).
- Mô phỏng phải nói rõ mỗi ô, mỗi điểm, mỗi đường biểu diễn cái gì. Không "phù phép", không có đường nào "từ hư vô" (PR #15, #22).
- Giả định mô hình nói bằng hình ảnh đời thường ("mỗi người ăn 4 phần mỗi mùa, như ngày 3 bữa, làm nhiều cũng không ăn nhiều hơn") và nói thẳng đó là giả định, không phải số thật (PR #24).
- Soát cả **từ vựng**, không chỉ câu ("cái may" sượng → "sự may mắn"). `nghia` của khái niệm viết chung, không dính ví dụ một trang.
- Các mục cùng cấp phải cùng một kiểu trình bày (PR #25: ba cảnh, cảnh 3 không được tách đoạn khác).
- Nhãn, nút, ô số liệu không rớt dòng lẻ ở 1280px và 390px; soát cả màn lớn ~2000px (chữ gốc clamp 16→20px).
- Chế độ tối: nền xanh than `#151b26`, khối `#212a39` có viền, chữ `#d6dce4` (không trắng tinh). Nếu Novian vẫn kêu khó đọc: thử chữ không chân cho thân bài ở chế độ tối.
- Góp lỗi kiểu QA: không xin lỗi, sửa luôn.
- Novian thích hiểu tận gốc ("vì sao ra số 35?"): con số nào cũng phải chỉ được nó từ đâu ra.

## 6. Chưa chốt với Novian (hỏi khi đụng tới)

- *demand*: "cầu" hay "nhu cầu".
- "phần dư" đang mang 2 nghĩa ở trang 3 và trang 4.
- Tên Việt cho *extractive institutions*: "bóc lột" hay "chiếm đoạt".
- Ô số hiện dấu chấm thập phân ("0.05") thay vì dấu phẩy.
- Dấu ngoặc kép đang lẫn thẳng và cong.
