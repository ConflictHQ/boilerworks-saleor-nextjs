# Agents -- Boilerworks Saleor + Next.js

Read [`bootstrap.md`](bootstrap.md) before writing any code. It contains all conventions, patterns, and structure for this project.

## Stack Summary

- **Backend**: Saleor 3.22 (Django + Strawberry GraphQL) -- Docker image, not custom code
- **Frontend**: Next.js 16.2.1 (App Router, React 19, TypeScript)
- **API**: Saleor GraphQL with Apollo Client 4
- **Auth**: Saleor JWT (access token in memory, refresh in httpOnly cookie)
- **UI**: shadcn/ui + Tailwind CSS 4
- **i18n**: next-intl (7 languages)

## Key Files

- `storefront/` -- Next.js storefront application
- `docker/docker-compose.yml` -- All services
- `Makefile` -- Common commands
- `scripts/seed.sh` -- Seed data script

## Quick Commands

```bash
make up    # Start services
make seed  # Seed data
make lint  # Lint
make test  # Test
```
