# SHINTUNG B2B WEBSITE

**Tân Đông Pro / SHINTUNG Vietnam dealer ordering portal**

This repository contains the public source baseline for the SHINTUNG B2B dealer ordering website. The current GitHub `main` baseline is based on **V1.1 / Version 11**.

## 1. What problem this project solves

SHINTUNG B2B WEBSITE is designed to help dealers and internal staff manage B2B ordering in one place. It focuses on fast product selection, customer-specific pricing, quantity discounts, cart review, checkout, order history, and administration.

The website is intended for wholesalers, distributors, retail dealers, SHINTUNG sales staff, order-processing staff, and administrators.

## 2. Main features

### Dealer ordering

- Product catalogue and category browsing
- Product search
- Multiple SKU / specification options
- PCS / CTN information
- Quantity entry
- Add-to-order workflow
- Floating cart
- Checkout and order review
- Order history and reorder workflow

### Pricing

The prototype includes support for:

- List price
- Customer level
- Category pricing rules
- Quantity discount tiers
- User-specific / override pricing

Pricing is core business logic. Changes to pricing must be checked across Product, SKU, Customer, Cart, Checkout, Order, and Admin flows.

### Floating cart

The cart surface is intended to show:

- Product
- Specification
- Quantity
- Unit price
- Discount
- Subtotal
- Current total

### Administration

The current application includes prototype administration surfaces for:

- Customers
- Products
- Pricing
- Orders

### Languages

The interface supports Traditional Chinese and Vietnamese content.

## 3. Installation

### Requirements

- Node.js `>=22.13.0`
- npm
- Git
- Linux is recommended for the bundled build helper scripts because they use GNU utilities such as `timeout` and `flock`

### Clone

```bash
git clone https://github.com/franktsai0421/shintung-b2b-website.git
cd shintung-b2b-website
```

### Install dependencies

```bash
npm ci
```

For normal local development, you may also use:

```bash
npm install
```

## 4. Usage

### Development server

```bash
npm run dev
```

Open the local URL printed by the development server.

### Build

```bash
npm run build
```

### Test

```bash
npm test
```

### Other useful commands

```bash
npm run lint
npm run validate:artifact
npm run db:generate
```

## 5. Input / output examples

### Example: dealer adds a product

Input:

```text
Product: supply hose
Specification: 30 cm
Quantity: 200 PCS
```

Pricing flow:

```text
Quantity
-> pricing rule
-> discount
-> unit price
-> subtotal
-> cart total
```

Expected output shown to the customer includes:

```text
Product
Specification
Quantity
Discount
Unit price
Subtotal
Order total
```

### Example: quantity changes in cart

Input:

```text
Quantity: 100 PCS -> 200 PCS
```

The application recalculates the relevant discount tier, unit price, subtotal, and cart total. Product ordering, floating cart, checkout, and submitted order values should remain consistent.

## Project structure

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

## Development workflow

The team workflow is:

```text
MAIN
-> REQ
-> Owner APPROVED
-> REQ branch
-> Development
-> Personal TEST Site
-> TEST
-> Owner Approval
-> Merge to main
-> Regression
-> Stable release
```

`main` represents the latest Owner-approved stable baseline. Each formal requirement should be developed in its own branch and merged only after testing and Owner approval.

Example branch names:

```text
req/REQ-001-mobile-floating-cart
req/REQ-002-group-quantity-discount
```

## Current baseline

```text
Baseline: V1.1
Source version: Version 11
Handover source commit: 422f53626bb0b701c7aba0fc66d65524e35d7821
```

## Current limitations

- Product images are still dependent on external legacy SHINTUNG image URLs and have not all been migrated to controlled local assets.
- Authentication is still prototype/demo-level and must be replaced with production-grade server-side authentication before production use.
- Some customer, pricing, and order data remains prototype data rather than a production persistent database implementation.
- Formal TikTok / YouTube content sources are not yet configured.

Prototype demo credentials are intentionally not documented in this public README.

## Security notes

- Never commit `.env` files, API keys, access tokens, private keys, or production database credentials.
- Production secrets must be configured through the deployment platform's secret/environment-variable mechanism.
- Prototype/demo authentication is not suitable for production deployment.

## License

This project is licensed under the MIT License.

Copyright (c) 2026 SHINTUNG Vietnam Co., Ltd.

See [LICENSE](LICENSE) for details.
