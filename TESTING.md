# SHINTUNG B2B Testing Rules

## Honesty and scope

Run checks proportional to the approved change and report exactly what ran. Never report `PASS` for an unexecuted check. Record environment limitations as risk rather than silently skipping them.

## Standard commands

Requirements: Node.js `>=22.13.0`, npm, and installed dependencies.

```bash
npm run lint
npm run build
npm test
npm run validate:artifact
```

Notes:

- `npm test` already runs a build before the Node test suite.
- Build helpers are Bash scripts and expect GNU tools such as `timeout` and `flock`; use Linux, WSL, or the configured CI environment when native Windows cannot provide them.
- `npm run validate:artifact` validates an existing build artifact; it is not a substitute for feature testing.

## Minimum verification by change type

| Change type | Required checks |
| --- | --- |
| Documentation only | Review Markdown structure, links, terminology, and consistency with code/approved REQ. |
| TypeScript or component logic | Lint, build, automated tests, and the directly affected manual flow. |
| CSS or UI | Lint/build plus visual checks at representative Mobile and Desktop widths. Check overflow, focus, readability, and interaction. |
| Customer-facing text | Verify Vietnamese and Traditional Chinese; switch languages without losing state or changing values. |
| Product/SKU/packaging | Verify category, variant, list price, PCS/CTN, image, modal, cart, checkout, history, and Admin where affected. |
| Pricing or override | Complete the pricing matrix below and confirm submitted order snapshots. |
| Cart/checkout | Add, change quantity, remove, switch variant, verify total, submit, and verify the order record. |
| Orders | Check creation/edit/reorder, details, amount, packing, status, delivery data, history, and relevant Admin behavior. |
| Persistence | Reload the page, verify valid stored data, and test blocked/corrupt storage behavior if changed. |
| Worker/build/config | Build, rendered HTML test, affected route/asset request, and deployment-specific validation. |

## Pricing regression matrix

For every changed pricing path, use fixed products/variants and record expected versus actual values.

| Case | Customer entitlement | Quantities to check |
| --- | --- | --- |
| General pricing | No lowest-price category entitlement | Below first threshold, exactly at each threshold, between thresholds, above final threshold |
| Category override | Category is in `bestCategories` | Quantity 1 and a high quantity; both must use the configured final stage |
| Large customer | `large` level | At least two categories and quantity 1; final stage must apply |
| Variant isolation | Same product, different variants | Confirm each variant uses its own list price, stages, and PCS/CTN |
| End-to-end consistency | Any affected customer | Product card, modal, floating cart, cart, checkout, submitted order, and history agree |

Also verify that discounts do not stack and that a general pricing edit does not silently remove a customer/category entitlement.

## Order regression matrix

When order logic changes, verify as applicable:

1. A new order is created as `waiting` with the current customer, variant, quantity, unit price, discount percentage, and packing snapshot.
2. A waiting order can be edited without creating an unintended duplicate.
3. Reorder loads the historical products, variants, and quantities into the cart.
4. Admin updates to status, confirmed amount, delivery date, note, cartons, and loose PCS appear in customer history.
5. Completed or cancelled records remain readable and historical line prices do not silently change.

## Responsive and bilingual UI

For affected UI, check at minimum:

- Mobile: 390 x 844 CSS pixels.
- Desktop: 1440 x 900 CSS pixels.
- Vietnamese and Traditional Chinese.

Check login, navigation, changed surface, floating cart/full cart where relevant, modal/dialog behavior, account history, and Admin. Confirm there is no clipped content, horizontal overflow, overlapping controls, or desktop regression caused by a mobile fix.

## Current automated-test limitation

`tests/rendered-html.test.mjs` currently checks that the built worker renders HTML containing the development preview metadata. It does not cover pricing, orders, Admin, responsive UI, or the language switch. Until scoped automated coverage is added, these flows require explicit manual verification.
