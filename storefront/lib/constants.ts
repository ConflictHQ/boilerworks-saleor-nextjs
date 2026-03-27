export const SALEOR_API_URL =
  process.env.NEXT_PUBLIC_SALEOR_API_URL || "http://localhost:8000/graphql/";

// Server-side URL for SSR (uses Docker service name when running in Docker)
export const SALEOR_API_URL_SSR =
  process.env.SALEOR_API_URL || SALEOR_API_URL;

export const DEFAULT_CHANNEL = process.env.NEXT_PUBLIC_DEFAULT_CHANNEL || "default-channel";

export const CHECKOUT_ID_COOKIE = "saleor-checkout-id";
export const AUTH_TOKEN_COOKIE = "saleor-auth-token";
export const REFRESH_TOKEN_COOKIE = "saleor-refresh-token";

export const PRODUCTS_PER_PAGE = 12;
export const SEARCH_DEBOUNCE_MS = 300;
