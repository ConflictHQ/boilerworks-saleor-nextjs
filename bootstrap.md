# Boilerworks Saleor + Next.js -- Bootstrap

> Production-ready e-commerce with Saleor 3.22 backend and Next.js 16 storefront.
> This is the conventions document. Read it before writing any code.

---

## What's Built

| Layer | Technology | Notes |
|-------|-----------|-------|
| Backend | Saleor 3.22 (Django + Strawberry) | Docker image, full commerce engine |
| Frontend | Next.js 16.2.1 | App Router, React 19, TypeScript |
| GraphQL Client | Apollo Client 4 | cache-and-network, error link |
| UI | shadcn/ui + Tailwind CSS 4 | Radix primitives, oklch dark theme |
| Auth | Saleor JWT | Access token in memory, refresh in httpOnly cookie |
| i18n | next-intl | 7 languages |
| Theme | next-themes | Dark mode default |
| Database | Postgres 16 | Managed by Saleor |
| Cache | Redis 7 | Saleor cache + Celery broker |
| Jobs | Celery | Saleor built-in (orders, emails, webhooks) |
| Admin | Saleor Dashboard | Separate React app at :9003 |
| Email | Mailpit | Dev email catcher at :8025 |
| Docker | docker-compose.yml | All services boot with one command |

---

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
              |-- Celery worker (order processing, email, webhooks)
              |-- Postgres 16 (:5432)
              |-- Redis 7 (:6379)
              +-- Mailpit (:8025)
```

---

## Storefront Structure

```
storefront/
├── app/
│   ├── (shop)/              # Public storefront (Header + Footer layout)
│   │   ├── products/        # Product listing and detail
│   │   ├── categories/      # Category listing and detail
│   │   ├── collections/     # Collection listing and detail
│   │   ├── cart/            # Full cart page
│   │   ├── checkout/        # Multi-step checkout + confirmation
│   │   ├── search/          # Search results
│   │   └── account/         # Auth-gated customer pages
│   │       ├── orders/      # Order history and detail
│   │       ├── addresses/   # Address management
│   │       └── profile/     # Profile update
│   ├── (auth)/              # Login/register (minimal layout)
│   │   ├── login/
│   │   └── register/
│   ├── api/health/          # Health check endpoint
│   └── layout.tsx           # Root: ThemeProvider + NextIntl + Apollo
│
├── components/
│   ├── ui/                  # shadcn/ui (Button, Card, Input, Sheet, etc.)
│   ├── product/             # ProductCard, ProductGrid, VariantSelector, ImageGallery
│   ├── cart/                # CartDrawer
│   ├── checkout/            # (checkout components in page files)
│   └── layout/              # Header, Footer, ThemeToggle, SearchDialog, MobileMenu
│
├── graphql/
│   ├── products/            # types, queries, hooks (products, categories, collections, search)
│   ├── checkout/            # types, queries, mutations, hooks
│   ├── account/             # types, queries, mutations, hooks
│   └── categories/          # Re-exports from products
│
├── lib/
│   ├── apollo/              # client.ts (SSR), provider.tsx (client-side)
│   ├── auth/                # token-store.ts (memory + cookie)
│   ├── constants.ts         # API URL, channel, cookie names
│   ├── channels.ts          # Channel/currency mapping
│   ├── i18n.ts              # next-intl config
│   └── utils.ts             # cn(), formatPrice(), formatDate()
│
├── hooks/
│   ├── useCart.ts           # Cart operations (add, update, remove)
│   └── useDebounce.ts      # Debounce hook
│
└── messages/                # 7 languages (en, es, fr, de, pt, ja, zh)
```

---

## GraphQL Conventions

### Query Pattern
```typescript
import { gql, useQuery } from "@apollo/client";
import { DEFAULT_CHANNEL } from "@/lib/constants";

// SCREAMING_SNAKE for gql constants
export const GET_PRODUCTS = gql`...`;

// Arrow functions for hooks, explicit fetchPolicy
export const useProducts = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: { channel: DEFAULT_CHANNEL, first: 12 },
    fetchPolicy: "cache-and-network",
  });
  return { products: data?.products?.edges?.map(e => e.node) ?? [], loading, error };
};
```

### Mutation Pattern
All Saleor mutations return an `errors` array. Always check it:
```typescript
const { data } = await createCheckout({ variables: { input } });
if (data?.checkoutCreate?.errors?.length) {
  throw new Error(data.checkoutCreate.errors[0].message);
}
```

### Channel Parameter
Most product queries require a `channel` variable. Always pass `DEFAULT_CHANNEL` from constants.

### Relay Pagination
Saleor uses Relay-style pagination: `edges { node { ... } } pageInfo { hasNextPage endCursor }`.

---

## Auth Pattern

- **Login**: `tokenCreate` mutation → access token (in memory) + refresh token (httpOnly cookie)
- **Token refresh**: `tokenRefresh` mutation with refresh token
- **Logout**: Clear in-memory token + remove cookies
- **Auth gate**: Apollo error link catches `UNAUTHENTICATED` → redirect to /login
- **Access tokens never in localStorage** (XSS risk)

---

## Cart/Checkout Pattern

- Checkout ID stored in `saleor-checkout-id` cookie (persists for guests)
- `checkoutCreate` on first add-to-cart
- `checkoutLinesAdd` for subsequent items
- Multi-step checkout: address → review → place order
- Each mutation returns errors array — validate before proceeding

---

## Docker

```bash
cd docker && docker compose up -d --build
# OR
make up
```

| Service | Port | Health Check |
|---------|------|-------------|
| Saleor API | 8000 | /health/ |
| Storefront | 3000 | /api/health |
| Dashboard | 9003 | HTTP |
| Postgres | 5432 | pg_isready |
| Redis | 6379 | redis-cli ping |
| Mailpit | 8025 | HTTP |

### Seed Data
```bash
make seed
# Creates: admin@example.com / admin
# Products, categories, collections, shipping, warehouse
```

---

## Saleor Extension Points

- **Plugins**: Custom Python code in plugin directory with own migrations
- **Metadata**: Key-value store on most models (public + private)
- **Apps**: Separate services communicating via webhooks + Saleor API
- **Webhooks**: ORDER_CREATED, ORDER_PAID, PRODUCT_UPDATED, etc.

Never modify Saleor core models directly.

---

## Code Style

| Concern | Tool |
|---------|------|
| TypeScript formatting | Prettier |
| TypeScript linting | ESLint (next/core-web-vitals + prettier) |
| CSS | Tailwind CSS 4 |
| Import sorting | Prettier (auto) |

Run `make lint` before committing.

---

## Theme

Boilerworks dark admin theme using oklch color space:
- Primary: `oklch(0.55 0.2 16)` (#DC394C) — red/maroon
- Dark mode default via next-themes
- All components support dark mode via CSS variables

---

## Adding a New Page

1. Create route in `app/(shop)/your-page/page.tsx`
2. For data fetching: add queries in `graphql/your-domain/`
3. For components: add in `components/your-domain/`
4. For Server Components: use `getClient().query()` from `lib/apollo/client.ts`
5. For Client Components: use `useQuery`/`useMutation` hooks
6. Add translations to all 7 `messages/*.json` files
7. Add nav link in `components/layout/Header.tsx` if needed

---

## URLs

| URL | What |
|-----|------|
| http://localhost:3000 | Storefront |
| http://localhost:3000/products | Product listing |
| http://localhost:3000/categories | Categories |
| http://localhost:3000/collections | Collections |
| http://localhost:3000/cart | Cart |
| http://localhost:3000/checkout | Checkout |
| http://localhost:3000/login | Login |
| http://localhost:3000/register | Register |
| http://localhost:3000/account | Account |
| http://localhost:3000/search?q=term | Search |
| http://localhost:3000/api/health | Health check |
| http://localhost:8000/graphql/ | Saleor GraphQL API |
| http://localhost:9003 | Saleor Dashboard |
| http://localhost:8025 | Mailpit |
