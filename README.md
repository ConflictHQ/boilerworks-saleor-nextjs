# Boilerworks Saleor + Next.js

Production-ready e-commerce template with Saleor 3.22 backend and Next.js 16 storefront.

## Stack

| Layer | Technology |
|-------|-----------|
| Backend | Saleor 3.22 (Django + Strawberry GraphQL) |
| Frontend | Next.js 16.2.1 (App Router, React 19) |
| API | Saleor GraphQL (Relay pagination) |
| Client | Apollo Client 4 |
| UI | shadcn/ui + Tailwind CSS 4 |
| Auth | Saleor JWT |
| Database | Postgres 16 |
| Cache | Redis 7 |
| Jobs | Celery (Saleor built-in) |
| Admin | Saleor Dashboard |
| i18n | next-intl (7 languages) |
| Email | Mailpit (dev) |

## Features

- Full product catalog with categories, collections, and search
- Shopping cart with guest persistence (cookie-based checkout)
- Multi-step checkout (address, review, order placement)
- Customer accounts (login, register, order history, address management)
- Saleor Dashboard for admin/staff operations
- 7-language i18n (en, es, fr, de, pt, ja, zh)
- Dark mode with Boilerworks theme
- Responsive design with mobile navigation
- Docker Compose development environment
- Playwright E2E tests
- GitHub Actions CI pipeline

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js 20+ (for local development outside Docker)
- npm

### Quick Start

```bash
# Start all services
make up

# Wait for services to be healthy, then seed sample data
make seed

# Open the storefront
open http://localhost:3000
```

### Services

| Service | URL |
|---------|-----|
| Storefront | http://localhost:3000 |
| Saleor GraphQL API | http://localhost:8000/graphql/ |
| Saleor Dashboard | http://localhost:9003 |
| Mailpit (email) | http://localhost:8025 |
| Health check | http://localhost:3000/api/health |

### Default Credentials

After running `make seed`:
- **Admin**: admin@example.com / admin

### Commands

```bash
make up              # Start all services
make down            # Stop all services
make seed            # Populate with sample data
make lint            # Lint storefront
make test            # Run tests
make e2e             # Playwright E2E tests
make logs            # Tail all logs
make logs-api        # Tail Saleor API logs
make logs-storefront # Tail storefront logs
make status          # Show service status
make clean           # Remove containers, volumes, build artifacts
```

## Architecture

```
Browser
  |-- Storefront (Next.js :3000)
  |     +-- Apollo Client --> Saleor GraphQL API
  |
  +-- Dashboard (Saleor Dashboard :9003)
        +-- Built-in React app --> Saleor GraphQL API
              |
              v
        Saleor API (:8000)
              |-- Celery worker (async tasks)
              |-- Postgres 16
              |-- Redis 7
              +-- Mailpit
```

## Storefront Pages

| Route | Description |
|-------|------------|
| `/products` | Product catalog with grid |
| `/products/:slug` | Product detail with variants, images, add-to-cart |
| `/categories` | Category listing |
| `/categories/:slug` | Category products |
| `/collections` | Collection listing |
| `/collections/:slug` | Collection products |
| `/search?q=term` | Search results |
| `/cart` | Full cart page |
| `/checkout` | Multi-step checkout |
| `/login` | Customer login |
| `/register` | Customer registration |
| `/account` | Account dashboard |
| `/account/orders` | Order history |
| `/account/addresses` | Address management |
| `/account/profile` | Profile settings |

## Documentation

- [bootstrap.md](bootstrap.md) -- Conventions and patterns (read first)
- [CLAUDE.md](CLAUDE.md) -- Claude agent configuration
- [AGENTS.md](AGENTS.md) -- Generic agent shim

## License

See [LICENSE](LICENSE).

---

Boilerworks is a [CONFLICT](https://weareconflict.com) brand. CONFLICT is a registered trademark of CONFLICT LLC.
