import { test, expect } from "@playwright/test";

test.describe("Storefront pages", () => {
  test("homepage redirects to /products", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/products/);
  });

  test("products page loads and shows products or empty state", async ({ page }) => {
    await page.goto("/products");
    await expect(page).toHaveURL(/\/products/);
    await expect(page.locator("main")).toBeVisible();
  });

  test("categories page loads", async ({ page }) => {
    await page.goto("/categories");
    await expect(page).toHaveURL(/\/categories/);
    await expect(page.locator("main")).toBeVisible();
  });

  test("collections page loads", async ({ page }) => {
    await page.goto("/collections");
    await expect(page).toHaveURL(/\/collections/);
    await expect(page.locator("main")).toBeVisible();
  });

  test("search page with query parameter works", async ({ page }) => {
    await page.goto("/search?q=shirt");
    await expect(page).toHaveURL(/\/search\?q=shirt/);
    await expect(page.locator("main")).toBeVisible();
  });

  test("cart page loads with empty state", async ({ page }) => {
    await page.goto("/cart");
    await expect(page).toHaveURL(/\/cart/);
    await expect(page.locator("main")).toBeVisible();
  });

  test("health API endpoint returns healthy status", async ({ request }) => {
    const response = await request.get("/api/health");
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.status).toBe("healthy");
    expect(body.service).toBe("boilerworks-saleor-storefront");
    expect(body.timestamp).toBeDefined();
  });

  test("login page loads with form fields", async ({ page }) => {
    await page.goto("/login");
    await expect(page).toHaveURL(/\/login/);
    await expect(page.locator("#email")).toBeVisible();
    await expect(page.locator("#password")).toBeVisible();
  });

  test("register page loads with form fields", async ({ page }) => {
    await page.goto("/register");
    await expect(page).toHaveURL(/\/register/);
    await expect(page.locator("#firstName")).toBeVisible();
    await expect(page.locator("#lastName")).toBeVisible();
    await expect(page.locator("#email")).toBeVisible();
    await expect(page.locator("#password")).toBeVisible();
    await expect(page.locator("#confirmPassword")).toBeVisible();
  });

  test("account page loads and shows sign in prompt when not logged in", async ({ page }) => {
    await page.goto("/account");
    await expect(page).toHaveURL(/\/account/);
    await expect(page.getByText("Sign in to access your account")).toBeVisible();
  });
});
