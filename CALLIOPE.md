# Calliope — Boilerworks Saleor + Next.js
<!-- Agent shim for https://github.com/calliopeai/calliope-cli -->

Primary conventions doc: [`bootstrap.md`](bootstrap.md)
Context seed: [`memory.md`](memory.md)

Read both before writing any code.

---

## Project-specific notes

- Backend is Saleor 3.22 (Django + Strawberry GraphQL); frontend is Next.js 16 (App Router, React 19, TypeScript) with Apollo Client 4.
- Saleor provides the backend — extend via plugins/apps, never modify core.
- All product queries require a channel parameter; checkout mutations return an `errors` array — always check it.
- Auth is Saleor JWT: access token in memory only (never localStorage), refresh in an httpOnly cookie.
- UI is shadcn/ui + Tailwind CSS 4 + Radix; i18n via next-intl (7 languages).
- `make up` / `make seed` to run; Playwright E2E runs against a real database — never mock.
