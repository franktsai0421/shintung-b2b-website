# SHINTUNG B2B Website - Development Rules

This file applies to the entire repository. It is the repository-readable version of the owner reference `SHINTUNG_B2B_AGENTS_MD_V1_EN.pdf`, with project-specific clarifications added for safe day-to-day work.

## 1. Mission and approved scope

Maintain and improve the existing SHINTUNG B2B website. Do not rebuild the application unless the owner explicitly requests it in an approved requirement.

An approved requirement (REQ) is either:

- the owner's direct request in the active task; or
- an owner-approved file under `requirements/`.

Make the smallest safe change that fully satisfies that REQ. Higher-priority system, developer, and user instructions always take precedence over this file.

## 2. Core working principles

1. Understand the relevant implementation before editing.
2. Make the smallest change that solves the REQ.
3. Do not modify unrelated code.
4. Do not refactor working code unless the REQ requires it.
5. Preserve existing business logic and working behavior.
6. Reuse existing components and functions before creating new ones.
7. Prefer a simple solution over unnecessary abstraction.
8. Fix the root cause instead of stacking workarounds.
9. Never remove working functionality without explicit approval.
10. Never guess a business rule. If a necessary rule is unclear, report `BLOCKED`.

## 3. Before editing

Identify only what is necessary:

- the exact REQ and expected result;
- affected files, functions, components, and routes;
- direct dependencies and reusable implementation;
- likely regression risks; and
- the verification required by `TESTING.md`.

Use targeted inspection. Do not scan, rewrite, or redesign the entire repository unless the approved REQ requires it. Check the working tree before editing and preserve unrelated user changes.

## 4. Protected SHINTUNG business logic

Do not change any of the following unless the approved REQ explicitly requires it:

- Customer Level;
- User Override or customer-specific override;
- List Price;
- Quantity Discount;
- PCS/CTN;
- Product, Category, and SKU relationships;
- product specifications;
- customer-specific pricing;
- cart and checkout pricing;
- order records, history, and status logic; and
- Vietnamese and Traditional Chinese language switching.

When a change touches these areas, read `BUSINESS_RULES.md` first. That file documents the current implementation; it is not permission to invent or change policy. If code, a REQ, and `BUSINESS_RULES.md` disagree, stop and report the conflict.

## 5. Pricing safety rules

Pricing is high-risk. A pricing change must preserve consistency across List Price, Customer Level, Quantity Discount, User Override, Product/SKU, Cart, Checkout, and stored Order Record values.

- A customer-specific override must never be silently overwritten by general pricing logic.
- Do not simplify, combine, or redesign pricing rules without explicit approval.
- Preserve historical order line prices unless the REQ defines a migration.
- Verify every affected pricing surface end-to-end using `TESTING.md`.

## 6. UI, UX, and language rules

Preserve the current UI and UX unless the REQ explicitly requests a change. For UI work, consider the relevant Mobile, Desktop, Product, Navigation, Cart, Checkout, Account, and Admin surfaces. Do not fix one viewport by breaking another or redesign unrelated pages.

Vietnamese is the primary customer language and Traditional Chinese is secondary. New or changed customer-facing text must be supplied and checked in both VI and ZH. Do not break the language switch while changing another feature.

## 7. Images, data, dependencies, and security

Product content currently uses local assets and legacy external SHINTUNG URLs. Other approved content may use generated assets, TikTok, or YouTube. Do not bulk-replace images, remove sources, change URLs, or remove external dependencies without checking usage and impact.

The current catalogue, customer, pricing, and order flows are prototype data in `app/page.tsx`, persisted to browser `localStorage`. The database schema is currently a placeholder. Do not present this as production persistence, add a major dependency, or migrate data without an approved REQ.

Do not expose or commit secrets, production credentials, tokens, private customer data, or `.env` files. Demo authentication is not production-grade authentication.

## 8. Scope control

If completing a REQ requires changes outside its approved scope, stop before making those additional changes. Report:

- the additional change required;
- why it is required; and
- the existing functions or flows that may be affected.

Wait for approval before expanding scope.

## 9. Testing rules

After editing:

1. Test the requested feature.
2. Test directly related existing behavior.
3. Perform a regression check proportional to the change.
4. For UI changes, check Mobile and Desktop.
5. For pricing changes, check the relevant pricing flow end-to-end.
6. For order changes, check creation, details, status, and history as applicable.
7. For language changes, check Vietnamese and Traditional Chinese.
8. Run the commands and manual checks defined in `TESTING.md` that match the change.
9. Never claim `PASS` for a test that was not actually run.

Documentation-only changes require checking Markdown structure, links, consistency, and scope; they do not require an application build unless they change executable configuration or the REQ asks for it.

## 10. Prohibited autonomous actions

Do not autonomously:

- rebuild the entire website;
- perform large unrelated refactors;
- change unrelated functionality or business rules;
- delete working features;
- add major dependencies;
- rewrite working code only for style preferences; or
- claim tests passed when they were not executed.

## 11. Keep project documentation synchronized

When an approved change alters a confirmed business rule, architecture boundary, test command, or regression requirement, update the corresponding Markdown file in the same REQ. Do not turn assumptions into confirmed rules; mark unresolved items as owner decisions.

## 12. Concise completion reporting

After implementation, report only what changed, what was actually tested, any remaining risk, and status:

```text
CHANGED
- ...

TESTED
- ...

RISK
- None / ...

STATUS
- READY FOR TEST / BLOCKED
```

When blocked, use:

```text
BLOCKED

Required additional change:
- ...

Reason:
- ...

Potential impact:
- ...

Status:
Waiting for approval.
```
