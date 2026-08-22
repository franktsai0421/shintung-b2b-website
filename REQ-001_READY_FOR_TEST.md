# READY FOR TEST｜REQ-001

## Thông tin REQ

-   **REQ:** REQ-001｜Mobile Floating Cart
-   **Developer:** Staff Duyen
-   **Base Version:** V1.1
-   **Test Version:** REQ-001 V3 -- 20% Compact Header
-   **Status:** READY FOR TEST

## Nội dung đã hoàn thành

-   Giữ nguyên Product Card phía trên.
-   Mobile Floating Cart mặc định ở Compact Mode.
-   Header Floating Cart được thu gọn còn khoảng **44px**.
-   `Đơn đang chọn` và số lượng sản phẩm nằm **cùng một dòng**.
-   Số lượng sản phẩm được tách riêng bằng hiển thị nhỏ hơn/badge.
-   Nhấn Header để **Expand / Collapse**.
-   Expanded Floating Cart giới hạn tối đa khoảng **20% viewport**.
-   Danh sách sản phẩm bên trong có thể **scroll riêng**.
-   Nút **"Kiểm tra & gửi đơn →"** giữ cố định và dễ thao tác ở đáy
    Cart.
-   Floating Cart giảm đáng kể diện tích che Product / Quantity / Add
    Order.
-   Không thay đổi Pricing Engine hoặc Business Rules.
-   Không thay đổi Product / SKU / Customer / Order / Admin / Database.
-   Không cập nhật MAIN Production.

## Phạm vi ảnh hưởng cần TEST

Mobile / Product Page / Floating Cart / Quantity / Cart / Checkout /
Desktop Regression

## Đề nghị Tester kiểm tra

1.  iPhone: Compact Cart không che khu vực đặt hàng.
2.  Android: Compact Cart không che khu vực đặt hàng.
3.  Header Cart chỉ khoảng 44px và hiển thị trên một dòng.
4.  `Đơn đang chọn` và số sản phẩm phân biệt rõ.
5.  Expand / Collapse hoạt động bình thường.
6.  Expanded Cart không vượt quá khoảng 20% màn hình.
7.  Cart có 1 sản phẩm hoạt động đúng.
8.  Cart có 3 sản phẩm hoạt động đúng.
9.  Cart có 5+ sản phẩm: danh sách scroll bên trong.
10. Nút **"Kiểm tra & gửi đơn →"** luôn sử dụng được.
11. Quantity trong Cart vẫn hoạt động bình thường.
12. Product Page phía sau vẫn dễ thao tác.
13. Cart → Checkout hoạt động bình thường.
14. Desktop không bị thay đổi ngoài phạm vi REQ-001.
15. Pricing / Discount hiện tại không bị thay đổi hoặc sai lệch.

## Known Issues

Chưa ghi nhận Critical Bug tại thời điểm bàn giao.

> **Không được sửa website trong TEST. Nếu FAIL, ghi Bug Report và trả
> về REQ-001 Branch.**

## Phân công TEST

Theo quy trình nhóm, đề xuất **Staff B** thực hiện TEST cuối.

-   **FAIL** → gửi Bug Report về Branch REQ-001 để Duyên sửa.
-   **PASS** → Staff B gửi `REQ-001｜TEST PASS` về MAIN để Owner nghiệm
    thu.

## Trạng thái chốt

-   **REQ-001 V3:** READY FOR TEST ✅
-   **Developer:** Staff Duyen
-   **Tester đề xuất:** Staff B
-   **MAIN:** chưa cập nhật
-   **CLOSED:** chưa

------------------------------------------------------------------------

## Kiểm tra bắt buộc theo SOP V1.3 hiện hành

Trước khi trạng thái **READY FOR TEST** có hiệu lực chính thức, cần bổ
sung/xác nhận:

-   **GitHub Branch:** `duyen/req-001-floating-cart`
-   **REQ Base main:** main commit/version thực tế
-   **Current MAIN Checked:** latest main đã kiểm tra
-   **Preview Commit:** branch SHA
-   **Vercel Preview URL:** URL Preview thực tế, trạng thái **Ready**
-   **Impact Scope:** Mobile / Cart
-   **Regression Scope:** Product / Cart / Checkout / Desktop /
    Pricing-Discount regression
-   **Known Issues:** như ghi ở trên

**Hard Rule:** Không có Vercel Preview URL, Preview không ở trạng thái
Ready, hoặc Branch cần sync latest main nhưng chưa sync thì **không được
READY FOR TEST**.
