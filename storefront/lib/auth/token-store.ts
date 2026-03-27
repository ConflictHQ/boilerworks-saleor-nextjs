import Cookies from "js-cookie";
import { AUTH_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@/lib/constants";

let memoryToken: string | null = null;

export function getAuthToken(): string | null {
  return memoryToken;
}

export function setAuthToken(token: string): void {
  memoryToken = token;
}

export function clearAuthToken(): void {
  memoryToken = null;
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return Cookies.get(REFRESH_TOKEN_COOKIE) ?? null;
}

export function setRefreshToken(token: string): void {
  Cookies.set(REFRESH_TOKEN_COOKIE, token, {
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: 30,
  });
}

export function clearTokens(): void {
  memoryToken = null;
  Cookies.remove(AUTH_TOKEN_COOKIE);
  Cookies.remove(REFRESH_TOKEN_COOKIE);
}
