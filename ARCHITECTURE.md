# SHINTUNG B2B Architecture

## Current system at a glance

This repository is a Next.js 16 / React 19 TypeScript application built through Vinext and Vite for a Cloudflare Worker deployment. The current business experience is a client-side prototype; most UI state and business logic are concentrated in `app/page.tsx`.

```text
Browser
  -> app/layout.tsx (metadata and root document)
  -> app/page.tsx (login, catalogue, pricing, cart, orders, Admin, VI/ZH)
  -> app/globals.css (responsive presentation)
  -> browser localStorage (prototype customers/products/orders)

Cloudflare request
  -> worker/index.ts
  -> Vinext App Router handler
  -> built assets / optional image optimization
```

## Feature-to-file map

| Area | Primary files | Notes and dependencies |
| --- | --- | --- |
| Root page and metadata | `app/layout.tsx`, `app/page.tsx` | `lang="vi"`; development preview metadata is covered by an automated test. |
| Login and account state | `app/page.tsx` | Client-side demo login plus a no-login visitor entry. Do not treat as production authentication. |
| Catalogue and product variants | `app/page.tsx` | Prototype product data and external image URLs are defined inline. |
| Pricing and customer entitlement | `app/page.tsx` | `hasBestPrice`, `stageFor`, `percent`, and `price` are the critical calculation path. Read `BUSINESS_RULES.md`. |
| Cart and checkout | `app/page.tsx` | Uses the same selected variant and pricing functions as catalogue surfaces. |
| Order creation/history/reorder | `app/page.tsx` | Order line values are snapshotted at submission; records remain browser-local. |
| Admin | `app/page.tsx` | Edits customers, category entitlements, price stages, variants, packing, and orders. |
| Responsive styling | `app/globals.css` | Shared by login, catalogue, cart, account, and Admin. Check Mobile and Desktop. |
| Optional ChatGPT auth helper | `app/chatgpt-auth.ts` | Provides header parsing and safe return paths; not wired into the current main page. |
| Database access | `db/index.ts`, `db/schema.ts` | D1 helper exists; schema is intentionally empty. Example schema is under `examples/d1/`. |
| Worker and image optimization | `worker/index.ts` | Dispatches image optimization and the Vinext app handler. |
| Build and hosting | `vite.config.ts`, `next.config.ts`, `build/`, `scripts/` | Cloudflare/Vinext build. Local hosting config is optional and Git-ignored. |
| Automated regression | `tests/rendered-html.test.mjs` | Currently verifies rendered HTML and development preview metadata only. |

## State and pricing flow

```text
initial prototype data
  -> React state
  -> Admin/customer interaction
  -> localStorage persistence

customer + selected product variant + quantity
  -> customer/category lowest-price entitlement
  -> applicable quantity stage
  -> unit price
  -> line subtotal
  -> cart total
  -> submitted order-line snapshot
```

Any change to this flow is pricing-sensitive and requires the end-to-end checks in `TESTING.md`.

## Important boundaries

- `app/page.tsx` is currently a large, coupled client component. Do not split or refactor it as incidental cleanup; do so only under a scoped REQ with regression coverage.
- `db/` is an available infrastructure seam, not an active production data source.
- `worker/index.ts` is the Cloudflare boundary. Changes can affect every route and image request.
- External product images are runtime dependencies. URL changes can affect catalogue, modal, cart, history, and Admin displays.
- Visitor visibility is enforced by conditional rendering in the client component. It hides commercial and ordering surfaces but does not remove pricing from the browser-delivered prototype data.
- `.openai/hosting.json` is optional, environment-specific, and intentionally ignored. Never commit secrets or production identifiers.

## Known architecture risks

- Business rules and UI are co-located in one client component.
- Prototype authentication and data persistence are client-side.
- Automated coverage is currently limited and does not exercise pricing, orders, Admin, responsive layout, or bilingual behavior.
- Product images depend on legacy external URLs.

These are documented risks, not authorization for a broad rewrite. Address them only through owner-approved, separately scoped requirements.
