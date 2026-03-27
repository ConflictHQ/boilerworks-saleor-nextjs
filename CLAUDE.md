# Claude -- Boilerworks Saleor + Next.js

Primary conventions doc: [`bootstrap.md`](bootstrap.md)

Read it before writing any code.

## Stack

- **Backend**: Saleor 3.22 (Django + Strawberry GraphQL)
- **Frontend**: Next.js 16.2.1 (App Router, React 19, TypeScript)
- **API**: Saleor GraphQL (Relay-style pagination)
- **Client**: Apollo Client 4 (cache-and-network, error link → login redirect)
- **Auth**: Saleor JWT (access token in memory, refresh in httpOnly cookie)
- **Jobs**: Celery + Redis (Saleor built-in)
- **Dashboard**: Saleor Dashboard (separate React SPA)
- **UI**: shadcn/ui + Tailwind CSS 4 + Radix primitives
- **i18n**: next-intl (7 languages: en, es, fr, de, pt, ja, zh)
- **Theme**: Boilerworks dark admin theme (oklch color space)

## Quick Reference

| Service | URL |
|---------|-----|
| Storefront | http://localhost:3000 |
| Saleor API | http://localhost:8000/graphql/ |
| Dashboard | http://localhost:9003 |
| Mailpit | http://localhost:8025 |
| Health | http://localhost:3000/api/health |

## Commands

```bash
make up          # Start all services
make seed        # Populate with sample data
make lint        # Lint storefront
make test        # Run tests
make e2e         # Playwright E2E
make logs        # Tail all logs
```

## Structure

```
storefront/
  app/(shop)/       # Public storefront (products, cart, checkout, account)
  app/(auth)/       # Login/register
  app/api/          # Health endpoint
  components/       # UI, product, cart, checkout, layout
  graphql/          # Products, checkout, account, categories
  lib/              # Apollo, auth, constants, utils
  hooks/            # useCart, useDebounce
  messages/         # i18n translations
```

## Testing Notes

- Playwright E2E against running Saleor + storefront
- Assert pages render, cart operations work, checkout flow completes
- Real database -- never mock

## Rules

- Saleor provides the backend. Extend via plugins/apps, never modify core.
- All product queries require channel parameter.
- Checkout mutations return errors array -- always check it.
- JWT access tokens in memory only, never localStorage.
- No co-authorship messages in commits.
