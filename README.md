# SHINTUNG B2B WEBSITE

**Tân Đông Pro / SHINTUNG Vietnam 經銷商 B2B 訂貨系統**  
**SHINTUNG Vietnam B2B Dealer Ordering Portal**  
**Cổng đặt hàng B2B dành cho đại lý SHINTUNG Vietnam**

本 Repository 為 SHINTUNG B2B 經銷商訂貨網站的公開原始碼基準。目前 GitHub `main` 以 **V1.1 / Version 11** 為 Stable Baseline。

This repository contains the public source baseline for the SHINTUNG B2B dealer ordering website. The current GitHub `main` baseline is based on **V1.1 / Version 11**.

Kho mã nguồn này chứa phiên bản nền công khai của website đặt hàng B2B dành cho đại lý SHINTUNG. Nhánh `main` hiện tại được xây dựng từ **V1.1 / Version 11**.

---

## 1. 專案解決什麼問題 / What problem this project solves / Dự án giải quyết vấn đề gì

SHINTUNG B2B WEBSITE 用於協助經銷商與公司內部人員集中管理 B2B 訂貨流程，重點包含快速選擇產品、客戶專屬價格、數量折扣、購物車確認、結帳、訂單紀錄與後台管理。

SHINTUNG B2B WEBSITE is designed to help dealers and internal staff manage B2B ordering in one place. It focuses on fast product selection, customer-specific pricing, quantity discounts, cart review, checkout, order history, and administration.

SHINTUNG B2B WEBSITE được xây dựng để giúp đại lý và nhân viên nội bộ quản lý quy trình đặt hàng B2B tập trung tại một nơi. Hệ thống tập trung vào tìm sản phẩm nhanh, giá theo từng khách hàng, chiết khấu theo số lượng, kiểm tra giỏ hàng, thanh toán, lịch sử đơn hàng và quản trị.

主要使用者 / Main users / Đối tượng sử dụng chính:

- 大盤商 / Wholesalers / Nhà bán sỉ lớn
- 經銷商 / Distributors / Nhà phân phối
- 零售經銷商 / Dealers / Đại lý
- SHINTUNG 業務人員 / SHINTUNG sales staff / Nhân viên kinh doanh SHINTUNG
- 訂單處理人員 / Order-processing staff / Nhân viên xử lý đơn hàng
- 管理員 / Administrators / Quản trị viên

---

## 2. 主要功能 / Main features / Chức năng chính

### 經銷商訂貨 / Dealer ordering / Đặt hàng cho đại lý

- 產品目錄與分類 / Product catalogue and category browsing / Danh mục sản phẩm và phân loại
- 產品搜尋 / Product search / Tìm kiếm sản phẩm
- 多 SKU / 規格選擇 / Multiple SKU / specification options / Nhiều SKU và quy cách
- PCS / CTN 資訊 / PCS / CTN information / Thông tin số lượng PCS / CTN
- 數量輸入 / Quantity entry / Nhập số lượng
- 加入訂單 / Add-to-order workflow / Thêm vào đơn hàng
- 浮動購物車 / Floating cart / Giỏ hàng nổi
- 結帳與訂單確認 / Checkout and order review / Kiểm tra và xác nhận đơn hàng
- 訂單紀錄與快速再訂 / Order history and reorder workflow / Lịch sử đơn hàng và đặt lại nhanh

### 價格與折扣 / Pricing / Giá và chiết khấu

目前 Prototype 支援 / The prototype includes support for / Phiên bản prototype hiện hỗ trợ:

- 牌價 / List price / Giá niêm yết
- 客戶等級 / Customer level / Cấp khách hàng
- 產品分類價格規則 / Category pricing rules / Quy tắc giá theo nhóm sản phẩm
- 數量折扣級距 / Quantity discount tiers / Chiết khấu theo bậc số lượng
- 個別客戶特殊價格 / User-specific / override pricing / Giá đặc biệt theo từng tài khoản

Pricing 是核心 Business Logic。任何價格修改都必須同步檢查 Product、SKU、Customer、Cart、Checkout、Order 與 Admin 的連動影響。

Pricing is core business logic. Changes to pricing must be checked across Product, SKU, Customer, Cart, Checkout, Order, and Admin flows.

Pricing là logic nghiệp vụ cốt lõi. Mọi thay đổi về giá phải được kiểm tra đồng bộ giữa Product, SKU, Customer, Cart, Checkout, Order và Admin.

### 浮動購物車 / Floating cart / Giỏ hàng nổi

Floating Cart 預計顯示 / The cart surface is intended to show / Giỏ hàng nổi được thiết kế để hiển thị:

- 產品 / Product / Sản phẩm
- 規格 / Specification / Quy cách
- 數量 / Quantity / Số lượng
- 單價 / Unit price / Đơn giá
- 折扣 / Discount / Chiết khấu
- 小計 / Subtotal / Thành tiền
- 目前總額 / Current total / Tổng giá trị hiện tại

### 後台管理 / Administration / Quản trị

目前 Prototype 後台包含 / The current application includes prototype administration surfaces for / Ứng dụng hiện tại bao gồm các khu vực quản trị prototype cho:

- 客戶 / Customers / Khách hàng
- 產品 / Products / Sản phẩm
- 價格與折扣 / Pricing / Giá và chiết khấu
- 訂單 / Orders / Đơn hàng

### 語言 / Languages / Ngôn ngữ

網站介面目前支援繁體中文與越南文內容。

The interface currently supports Traditional Chinese and Vietnamese content.

Giao diện hiện hỗ trợ nội dung bằng tiếng Trung phồn thể và tiếng Việt.

---

## 3. 安裝 / Installation / Cài đặt

### 系統需求 / Requirements / Yêu cầu

- Node.js `>=22.13.0`
- npm
- Git
- 部分 Build Helper Scripts 使用 GNU `timeout`、`flock`，建議使用 Linux。
- Linux is recommended for the bundled build helper scripts because they use GNU utilities such as `timeout` and `flock`.
- Khuyến nghị sử dụng Linux vì một số script build sử dụng các tiện ích GNU như `timeout` và `flock`.

### Clone Repository / Sao chép repository

```bash
git clone https://github.com/franktsai0421/shintung-b2b-website.git
cd shintung-b2b-website
```

### 安裝 Dependencies / Install dependencies / Cài dependency

```bash
npm ci
```

一般 Local Development 也可以使用 / For normal local development, you may also use / Để phát triển local thông thường, có thể dùng:

```bash
npm install
```

---

## 4. 使用方式 / Usage / Cách sử dụng

### 開發環境 / Development server / Chạy môi trường phát triển

```bash
npm run dev
```

啟動後開啟 Terminal 顯示的 Local URL。

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

### 其他常用指令 / Other useful commands / Các lệnh hữu ích khác

```bash
npm run lint
npm run validate:artifact
npm run db:generate
```

---

## 5. 輸入 / 輸出範例 / Input & output examples / Ví dụ đầu vào và đầu ra

### 範例：經銷商加入產品 / Example: dealer adds a product / Ví dụ: đại lý thêm sản phẩm

輸入 / Input / Đầu vào:

```text
Product: Supply hose
Specification: 30 cm
Quantity: 200 PCS
```

價格計算流程 / Pricing flow / Quy trình tính giá:

```text
Quantity
-> Pricing Rule
-> Discount
-> Unit Price
-> Subtotal
-> Cart Total
```

預期顯示 / Expected output / Kết quả hiển thị mong đợi:

```text
Product
Specification
Quantity
Discount
Unit Price
Subtotal
Order Total
```

### 範例：購物車修改數量 / Example: quantity changes in cart / Ví dụ: thay đổi số lượng trong giỏ hàng

輸入 / Input / Đầu vào:

```text
Quantity: 100 PCS -> 200 PCS
```

系統重新計算對應的折扣級距、單價、小計與 Cart Total。Product Ordering、Floating Cart、Checkout 與 Submitted Order 的價格結果應保持一致。

The application recalculates the relevant discount tier, unit price, subtotal, and cart total. Product ordering, floating cart, checkout, and submitted order values should remain consistent.

Hệ thống sẽ tính lại bậc chiết khấu tương ứng, đơn giá, thành tiền và tổng giá trị giỏ hàng. Giá trị hiển thị tại trang đặt hàng, giỏ hàng nổi, checkout và đơn hàng đã gửi phải luôn đồng nhất.

---

## 6. 專案結構 / Project structure / Cấu trúc dự án

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

## 7. 開發流程 / Development workflow / Quy trình phát triển

團隊正式流程 / Team workflow / Quy trình làm việc của nhóm:

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

`main` 只代表最新經 Owner 確認的 Stable Baseline。每個正式需求應使用獨立 Branch 開發，TEST PASS 並取得 Owner Approval 後才能 Merge 回 `main`。

`main` represents the latest Owner-approved stable baseline. Each formal requirement should be developed in its own branch and merged only after testing and Owner approval.

`main` đại diện cho phiên bản ổn định mới nhất đã được Owner xác nhận. Mỗi yêu cầu chính thức phải được phát triển trên branch riêng và chỉ được merge sau khi TEST PASS và Owner phê duyệt.

Branch 範例 / Example branch names / Ví dụ tên branch:

```text
req/REQ-001-mobile-floating-cart
req/REQ-002-group-quantity-discount
```

---

## 8. 目前 Baseline / Current baseline / Phiên bản nền hiện tại

```text
Baseline: V1.1
Source Version: Version 11
Handover Source Commit: 422f53626bb0b701c7aba0fc66d65524e35d7821
```

---

## 9. 目前限制 / Current limitations / Giới hạn hiện tại

- 產品圖片目前仍依賴舊 SHINTUNG 網站 URL，尚未全部遷移到專案自行控制的 Local Assets。  
  Product images are still dependent on external legacy SHINTUNG image URLs and have not all been migrated to controlled local assets.  
  Hình ảnh sản phẩm hiện vẫn phụ thuộc vào URL từ website SHINTUNG cũ và chưa được chuyển toàn bộ sang asset do dự án kiểm soát.

- Authentication 目前仍屬 Prototype / Demo 階段，正式 Production 前必須改為 Production-grade Server-side Authentication。  
  Authentication is still prototype/demo-level and must be replaced with production-grade server-side authentication before production use.  
  Hệ thống đăng nhập hiện vẫn ở mức prototype/demo và cần được thay thế bằng cơ chế xác thực server-side đạt chuẩn production trước khi vận hành chính thức.

- 部分 Customer、Pricing、Order Data 仍屬 Prototype Data，尚未完成正式 Persistent Database Implementation。  
  Some customer, pricing, and order data remains prototype data rather than a production persistent database implementation.  
  Một phần dữ liệu khách hàng, giá và đơn hàng hiện vẫn là dữ liệu prototype, chưa phải hệ thống database production hoàn chỉnh.

- TikTok / YouTube 正式內容來源尚未設定完成。  
  Formal TikTok / YouTube content sources are not yet configured.  
  Nguồn nội dung TikTok / YouTube chính thức hiện chưa được cấu hình.

Public README 不公開 Prototype Demo 登入資訊。

Prototype demo credentials are intentionally not documented in this public README.

Thông tin đăng nhập demo của prototype được chủ động không công khai trong README này.

---

## 10. 安全注意事項 / Security notes / Lưu ý bảo mật

- 不得 Commit `.env`、API Key、Access Token、Private Key 或 Production Database Credentials。  
  Never commit `.env` files, API keys, access tokens, private keys, or production database credentials.  
  Không commit file `.env`, API key, access token, private key hoặc thông tin đăng nhập database production.

- Production Secrets 必須透過部署平台的 Secret / Environment Variable 機制設定。  
  Production secrets must be configured through the deployment platform's secret/environment-variable mechanism.  
  Secret production phải được cấu hình thông qua hệ thống Secret / Environment Variable của nền tảng deploy.

- Prototype / Demo Authentication 不適合直接用於正式 Production。  
  Prototype/demo authentication is not suitable for production deployment.  
  Authentication prototype/demo không phù hợp cho môi trường production.

---

## 11. 授權 / License / Giấy phép

本專案採用 MIT License。

This project is licensed under the MIT License.

Dự án này được phát hành theo giấy phép MIT License.

Copyright (c) 2026 SHINTUNG Vietnam Co., Ltd.

詳細內容請參閱 [LICENSE](LICENSE)。  
See [LICENSE](LICENSE) for details.  
Xem chi tiết tại [LICENSE](LICENSE).
