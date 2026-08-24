# Requirements Workflow

Use one owner-approved Markdown file for each scoped change. Start from `REQ-TEMPLATE.md`, assign the next identifier, and keep unrelated work in separate REQs.

```text
requirements/REQ-001-short-name.md
requirements/REQ-002-short-name.md
```

A REQ is ready for implementation only when its status is `APPROVED` and its expected result, in-scope work, out-of-scope work, acceptance criteria, and owner decisions are unambiguous.

Minimal implementation prompt:

```text
Implement requirements/REQ-XXX-short-name.md. Follow AGENTS.md. Keep the change minimal and report only Changed, Tested, Risk, and Status.
```

Do not edit an approved REQ to conceal scope growth. Record an owner-approved revision or create a follow-up REQ.
