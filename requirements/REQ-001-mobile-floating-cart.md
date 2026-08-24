# REQ-001: Mobile floating cart

## Control

- Status: APPROVED
- Owner: SHINTUNG
- Requested by: Staff Duyen
- Approved by: Repository owner
- Approval date: 2026-08-24
- Target baseline: `3d41261` (`main`)
- Target branch: `req/REQ-001-mobile-floating-cart`

## Problem

Trên màn hình điện thoại, Floating Cart hiện chiếm nhiều không gian và có thể che Product Card, Quantity và thao tác đặt hàng. Header đang hiển thị số lượng sản phẩm ở một dòng riêng và Cart chưa có Compact/Expand/Collapse.

## Expected result

Floating Cart trên Mobile mặc định ở Compact Mode, dễ mở rộng khi cần xem chi tiết, không che quá nhiều nội dung phía sau và vẫn giữ nguyên toàn bộ logic Cart, Checkout, Pricing và Discount hiện tại.

## In scope

- Thu gọn Header Floating Cart trên Mobile còn khoảng `44px`.
- Hiển thị `Đơn đang chọn · N sản phẩm` trên cùng một dòng; số lượng cập nhật tự động theo Cart.
- Giữ tổng tiền rõ ràng ở phía bên phải Header.
- Nhấn Header để Expand/Collapse; mặc định là Compact Mode.
- Khi Collapse, chỉ hiển thị tiêu đề, số lượng sản phẩm và tổng tiền.
- Khi Expand, hiển thị danh sách sản phẩm và nút `Kiểm tra & gửi đơn →`.
- Giới hạn riêng danh sách sản phẩm ở `max-height: 20vh; overflow-y: auto`; giới hạn không bao gồm Header và nút Checkout.
- Giữ nút Checkout cố định, luôn nhìn thấy và thao tác được ở đáy Floating Cart khi Expand.
- Kiểm tra Mobile, Product Page, Floating Cart, Quantity, Cart, Checkout, Desktop, tiếng Việt và tiếng Trung phồn thể.

## Out of scope

- Product Card và Quantity behavior.
- Pricing Engine, List Price, Discount Rules hoặc customer/category override.
- Product, Category, SKU, Customer, Order, Admin hoặc Database behavior.
- Quy trình Cart → Checkout.
- Thiết kế lại Desktop hoặc các màn hình không liên quan.

## Business rules and owner decisions

- Không thay đổi business rule đã xác nhận trong `BUSINESS_RULES.md`.
- Không thay đổi hoặc cộng dồn Pricing/Discount theo cách mới.
- Không được làm mất hoặc thay đổi Cart hiện có khi chuyển giữa Compact và Expanded.
- Chỉ cập nhật `main` sau khi implementation đã được kiểm thử và Owner chấp thuận.

## Acceptance criteria

- [ ] Mobile Floating Cart mặc định ở Compact Mode.
- [ ] Header cao khoảng `44px` và không bị cắt/chồng nội dung.
- [ ] `Đơn đang chọn` và số lượng sản phẩm nằm cùng một dòng.
- [ ] Số lượng hiển thị đúng khi Cart có 1, 3 và 5+ sản phẩm, kể cả khi thêm/xóa.
- [ ] Tổng tiền vẫn hiển thị rõ ở bên phải Header.
- [ ] Nhấn Header có thể Expand/Collapse bằng chuột và bàn phím.
- [ ] Danh sách sản phẩm Expanded không vượt quá `20vh` và cuộn dọc độc lập khi có 5+ sản phẩm.
- [ ] Header và nút Checkout không cuộn theo danh sách.
- [ ] Nút `Kiểm tra & gửi đơn →` luôn nhìn thấy và hoạt động khi Expanded.
- [ ] Quantity, remove item, Cart total và Cart → Checkout vẫn hoạt động đúng.
- [ ] Product Page phía sau vẫn dễ thao tác trên iPhone và Android đại diện.
- [ ] Desktop không thay đổi ngoài phạm vi REQ-001.
- [ ] Nội dung đúng bằng tiếng Việt và tiếng Trung phồn thể.
- [ ] Pricing/Discount và submitted order values không thay đổi hoặc sai lệch.

## UX and language notes

- Mobile reference viewport: `390 x 844` CSS pixels.
- Desktop regression viewport: `1440 x 900` CSS pixels.
- Customer-facing text phải có cả tiếng Việt và tiếng Trung phồn thể.
- Header phải có trạng thái expanded/collapsed có thể nhận biết bằng accessibility semantics.

## Test plan

- Run `npm run lint`, `npm test`, `npm run build`, and `npm run validate:artifact` as defined in `TESTING.md`.
- Verify Compact/Expand/Collapse, internal scrolling, fixed Checkout action, quantity changes and removal at Mobile width.
- Verify Cart → Checkout and submitted totals with fixed products and quantities.
- Verify Vietnamese and Traditional Chinese without losing Cart state.
- Verify Desktop has no layout or behavior regression.
- Record the implementation branch SHA and a Ready preview URL before changing status to `IN TEST`.

## Risks and rollback

- Risk: a fixed-height Mobile Cart can hide controls, trap scrolling or cover Product Page actions.
- Risk: changing Cart presentation can accidentally alter quantity or pricing state.
- Rollback: revert only the scoped UI commit; do not migrate or rewrite Cart/order data.

## Owner decisions

- Compact Mode is the default on Mobile.
- `20vh` applies only to the product list, not to Header or Checkout action.
- No application implementation is included in this documentation PR.
- Status must not move to `IN TEST` until the implementation is based on current `main`, has a recorded commit SHA, passes required checks and has a Ready preview URL.
