# SHINTUNG B2B Business Rules

## Purpose and authority

This file records business-sensitive behavior verified in the current V1.1 prototype. It helps prevent accidental regressions; it does not authorize policy changes. Owner-approved REQs are required for new or changed business rules.

Use these labels:

- **Implemented** - verified in the current code.
- **Protected** - must not change without explicit approval.
- **Owner decision required** - not sufficiently defined to implement safely.

## Customer and pricing model

### Customer levels

**Implemented, protected:** Customers have one of three levels: `large`, `medium`, or `small`. Vietnamese and Traditional Chinese labels are defined in `app/page.tsx`.

**Implemented, protected:** In the prototype, a `large` customer receives the lowest configured price stage for every category. Other customers receive the lowest stage only for categories listed in that customer's `bestCategories` array.

The `bestCategories` behavior is the current implementation of a username/customer-specific price entitlement. Do not rename, broaden, overwrite, or replace it with a general tier rule without an approved REQ.

### Product, SKU, and packaging

**Implemented, protected:** A product belongs to a category and contains one or more variants. Each variant has its own:

- identifier and VI/ZH label;
- list price (`base`);
- PCS per carton (`packQty`); and
- ordered quantity price stages (`stages`).

Product, category, variant/SKU, and packaging relationships must remain aligned across catalogue, product modal, cart, checkout, order history, and Admin.

### Quantity pricing

**Implemented, protected:** Price stages are evaluated in ascending `minQty` order. A customer without the lowest-price entitlement receives the last stage whose `minQty` is less than or equal to the requested quantity. If none matches, the first stage is used.

**Implemented, protected:** A customer with the lowest-price entitlement receives the last configured stage regardless of quantity.

**Implemented, protected:** Only one percentage is selected. Discounts are not stacked.

```text
unit price = variant list price x selected percentage / 100
line subtotal = unit price x quantity
cart total = sum of line subtotals
```

Displayed VND values are formatted with the Vietnamese locale and rounded to the nearest 100 for presentation. Do not assume display rounding changes the stored numeric value without an approved requirement.

### Price consistency

**Protected:** The selected variant, quantity, percentage, unit price, and subtotal must agree in the Product card, Product modal, floating cart, full cart, checkout submission, and order record.

**Protected:** Submitted order lines snapshot `unitPrice`, `discountPercent`, `variantId`, `packQty`, carton count, and loose PCS. Historical order line prices must not be silently recalculated from later catalogue changes.

## Cart and orders

**Implemented, protected:** Quantity is at least 1 in customer-facing quantity controls. Cartons and loose PCS are derived from the selected variant's `packQty` when an order is submitted.

**Implemented, protected:** New orders begin in `waiting`. Supported statuses are:

```text
waiting -> confirmed -> preparing -> shipping -> completed
                         \-> cancelled (as administratively selected)
```

The UI currently allows Admin to select a status directly; the arrow sequence describes the displayed operational stages, not an enforced transition validator.

**Implemented, protected:** A customer may edit an order while it is `waiting`. Reorder loads historical lines into the cart. Admin may set confirmed amount, expected delivery date, packing information, and a customer-visible note.

**Owner decision required:** Production order-number generation, server timestamps, permitted status transitions, cancellation authorization, taxes, freight, currency conversion, inventory reservation, and ERP synchronization are not defined by this prototype.

## Languages

**Implemented, protected:** Vietnamese is primary and Traditional Chinese is secondary. The `t(vi, zh)` helper and bilingual model fields drive the current switch.

All new customer-visible labels, validation messages, and status text require both VI and ZH. Product identifiers, numeric values, prices, and order state must not change when language changes.

## Persistence and authentication

**Implemented, prototype only:** Customer, product, pricing, and order data are initialized in `app/page.tsx` and stored under a versioned browser `localStorage` key. This is device-local and is not ERP or cross-device persistence.

**Implemented, prototype only:** The visible login flow compares against client-side demo data. `app/chatgpt-auth.ts` contains separate helper code, but the main prototype page does not currently use it for customer authorization.

**Owner decision required:** Production identity provider, roles and permissions, password policy, server-side authorization, audit trail, persistent database schema, migration rules, backup, privacy, and retention.

## External content

**Implemented, protected:** Product images currently depend heavily on legacy `shintung-onspa.com` URLs. Check availability, licensing/ownership, caching, fallback behavior, and all references before changing a URL or migrating an asset.

**Owner decision required:** Approved TikTok and YouTube sources and the policy for generated assets.
