# SHINTUNG B2B WEBSITE

**Tân Đông Pro / SHINTUNG Vietnam Dealer Ordering Portal**  
**Cổng đặt hàng B2B dành cho đại lý SHINTUNG Vietnam**

This repository contains the public source baseline for the SHINTUNG B2B dealer ordering website. The current GitHub `main` baseline is based on **V1.1 / Version 11**.

Kho mã nguồn này chứa phiên bản nền công khai của website đặt hàng B2B dành cho đại lý SHINTUNG. Nhánh `main` hiện tại được xây dựng từ **V1.1 / Version 11**.

---

## 1. What problem this project solves / Dự án giải quyết vấn đề gì

SHINTUNG B2B WEBSITE is designed to help dealers and internal staff manage B2B ordering in one place. It focuses on fast product selection, customer-specific pricing, quantity discounts, cart review, checkout, order history, and administration.

SHINTUNG B2B WEBSITE được xây dựng để giúp đại lý và nhân viên nội bộ quản lý quy trình đặt hàng B2B tập trung tại một nơi. Hệ thống tập trung vào tìm sản phẩm nhanh, giá theo từng khách hàng, chiết khấu theo số lượng, kiểm tra giỏ hàng, thanh toán, lịch sử đơn hàng và quản trị.

Main users include:

Đối tượng sử dụng chính bao gồm:

- Wholesalers / Nhà bán sỉ lớn
- Distributors / Nhà phân phối
- Dealers / Đại lý
- SHINTUNG sales staff / Nhân viên kinh doanh SHINTUNG
- Order-processing staff / Nhân viên xử lý đơn hàng
- Administrators / Quản trị viên

---

## 2. Main features / Chức năng chính

### Dealer ordering / Đặt hàng cho đại lý

- Product catalogue and category browsing / Danh mục sản phẩm và phân loại
- Product search / Tìm kiếm sản phẩm
- Multiple SKU / specification options / Nhiều SKU và quy cách
- PCS / CTN information / Thông tin số lượng PCS / CTN
- Quantity entry / Nhập số lượng
- Add-to-order workflow / Thêm vào đơn hàng
- Floating cart / Giỏ hàng nổi
- Checkout and order review / Kiểm tra và xác nhận đơn hàng
- Order history and reorder workflow / Lịch sử đơn hàng và đặt lại nhanh

### Pricing / Giá và chiết khấu

The prototype includes support for:

Phiên bản prototype hiện hỗ trợ:

- List price / Giá niêm yết
- Customer level / Cấp khách hàng
- Category pricing rules / Quy tắc giá theo nhóm sản phẩm
- Quantity discount tiers / Chiết khấu theo bậc số lượng
- User-specific / override pricing / Giá đặc biệt theo từng tài khoản

Pricing is core business logic. Changes to pricing must be checked across Product, SKU, Customer, Cart, Checkout, Order, and Admin flows.

Pricing là logic nghiệp vụ cốt lõi. Mọi thay đổi về giá phải được kiểm tra đồng bộ giữa Product, SKU, Customer, Cart, Checkout, Order và Admin.

### Floating cart / Giỏ hàng nổi

The cart surface is intended to show:

Giỏ hàng nổi được thiết kế để hiển thị:

- Product / Sản phẩm
- Specification / Quy cách
- Quantity / Số lượng
- Unit price / Đơn giá
- Discount / Chiết khấu
- Subtotal / Thành tiền
- Current total / Tổng giá trị hiện tại

### Administration / Quản trị

The current application includes prototype administration surfaces for:

Ứng dụng hiện tại bao gồm các khu vực quản trị prototype cho:

- Customers / Khách hàng
- Products / Sản phẩm
- Pricing / Giá và chiết khấu
- Orders / Đơn hàng

### Languages / Ngôn ngữ

The interface supports Traditional Chinese and Vietnamese content.

Giao diện hỗ trợ nội dung bằng tiếng Trung phồn thể và tiếng Việt.

---

## 3. Installation / Cài đặt

### Requirements / Yêu cầu

- Node.js `>=22.13.0`
- npm
- Git
- Linux is recommended for the bundled build helper scripts because they use GNU utilities such as `timeout` and `flock`
- Khuyến nghị sử dụng Linux vì một số script build sử dụng các tiện ích GNU như `timeout` và `flock`

### Clone the repository / Sao chép repository

```bash
git clone https://github.com/franktsai0421/shintung-b2b-website.git
cd shintung-b2b-website
```

### Install dependencies / Cài dependency

```bash
npm ci
```

For normal local development, you may also use:

Để phát triển local thông thường, có thể dùng:

```bash
npm install
```

---

## 4. Usage / Cách sử dụng

### Development server / Chạy môi trường phát triển

```bash
npm run dev
```

Open the local URL printed by the development server.

Mở URL local được hiển thị trong terminal sau khi server khởi động.

### Build

```bash
npm run build
```

### Test

```bash
npm test
```

### Other useful commands / Các lệnh hữu ích khác

```bash
npm run lint
npm run validate:artifact
npm run db:generate
```

---

## 5. Input / output examples / Ví dụ đầu vào và đầu ra

### Example: dealer adds a product / Ví dụ: đại lý thêm sản phẩm

Input / Đầu vào:

```text
Product: Supply hose
Specification: 30 cm
Quantity: 200 PCS
```

Pricing flow / Quy trình tính giá:

```text
Quantity
-> Pricing Rule
-> Discount
-> Unit Price
-> Subtotal
-> Cart Total
```

Expected output / Kết quả hiển thị mong đợi:

```text
Product
Specification
Quantity
Discount
Unit Price
Subtotal
Order Total
```

### Example: quantity changes in cart / Ví dụ: thay đổi số lượng trong giỏ hàng

Input / Đầu vào:

```text
Quantity: 100 PCS -> 200 PCS
```

The application recalculates the relevant discount tier, unit price, subtotal, and cart total. Product ordering, floating cart, checkout, and submitted order values should remain consistent.

Hệ thống sẽ tính lại bậc chiết khấu tương ứng, đơn giá, thành tiền và tổng giá trị giỏ hàng. Giá trị hiển thị tại trang đặt hàng, giỏ hàng nổi, checkout và đơn hàng đã gửi phải luôn đồng nhất.

---

## 6. Project structure / Cấu trúc dự án

```text
app/            Main application UI and business-flow prototype
build/          Build helpers
db/             Database access placeholder and schema
drizzle/        Drizzle metadata
examples/       Optional examples
public/         Public static assets
scripts/        Install/build/validation helpers
tests/          Automated tests
worker/         Worker entry point
```

---

## 7. Development workflow / Quy trình phát triển

The team workflow is:

Quy trình làm việc của nhóm:

```text
MAIN
-> REQ
-> Owner APPROVED
-> REQ Branch
-> Development
-> Personal TEST Site
-> TEST
-> Owner Approval
-> Merge to main
-> Regression
-> Stable Release
```

`main` represents the latest Owner-approved stable baseline. Each formal requirement should be developed in its own branch and merged only after testing and Owner approval.

`main` đại diện cho phiên bản ổn định mới nhất đã được Owner xác nhận. Mỗi yêu cầu chính thức phải được phát triển trên branch riêng và chỉ được merge sau khi TEST PASS và Owner phê duyệt.

Example branch names / Ví dụ tên branch:

```text
req/REQ-001-mobile-floating-cart
req/REQ-002-group-quantity-discount
```

---

## 8. Current baseline / Phiên bản nền hiện tại

```text
Baseline: V1.1
Source Version: Version 11
Handover Source Commit: 422f53626bb0b701c7aba0fc66d65524e35d7821
```

---

## 9. Current limitations / Giới hạn hiện tại

- Product images are still dependent on external legacy SHINTUNG image URLs and have not all been migrated to controlled local assets.  
  Hình ảnh sản phẩm hiện vẫn phụ thuộc vào URL từ website SHINTUNG cũ và chưa được chuyển toàn bộ sang asset do dự án kiểm soát.

- Authentication is still prototype/demo-level and must be replaced with production-grade server-side authentication before production use.  
  Hệ thống đăng nhập hiện vẫn ở mức prototype/demo và cần được thay thế bằng cơ chế xác thực server-side đạt chuẩn production trước khi vận hành chính thức.

- Some customer, pricing, and order data remains prototype data rather than a production persistent database implementation.  
  Một phần dữ liệu khách hàng, giá và đơn hàng hiện vẫn là dữ liệu prototype, chưa phải hệ thống database production hoàn chỉnh.

- Formal TikTok / YouTube content sources are not yet configured.  
  Nguồn nội dung TikTok / YouTube chính thức hiện chưa được cấu hình.

Prototype demo credentials are intentionally not documented in this public README.

Thông tin đăng nhập demo của prototype được chủ động không công khai trong README này.

---

## 10. Security notes / Lưu ý bảo mật

- Never commit `.env` files, API keys, access tokens, private keys, or production database credentials.  
  Không commit file `.env`, API key, access token, private key hoặc thông tin đăng nhập database production.

- Production secrets must be configured through the deployment platform's secret/environment-variable mechanism.  
  Secret production phải được cấu hình thông qua hệ thống Secret / Environment Variable của nền tảng deploy.

- Prototype/demo authentication is not suitable for production deployment.  
  Authentication prototype/demo không phù hợp cho môi trường production.

---

## 11. License / Giấy phép

This project is licensed under the MIT License.

Dự án này được phát hành theo giấy phép MIT License.

Copyright (c) 2026 SHINTUNG Vietnam Co., Ltd.

See [LICENSE](LICENSE) for details.  
Xem chi tiết tại [LICENSE](LICENSE).
