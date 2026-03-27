import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("header shows logo and nav links", async ({ page }) => {
    await page.goto("/products");

    const header = page.locator("header");
    await expect(header).toBeVisible();

    // Logo
    await expect(header.getByText("Boilerworks")).toBeVisible();

    // Desktop nav links
    const nav = header.locator("nav");
    await expect(nav.getByRole("link", { name: /products/i })).toBeVisible();
    await expect(nav.getByRole("link", { name: /categories/i })).toBeVisible();
    await expect(nav.getByRole("link", { name: /collections/i })).toBeVisible();
  });

  test("footer renders with links", async ({ page }) => {
    await page.goto("/products");

    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
    await expect(footer.getByText("Boilerworks Store")).toBeVisible();
    await expect(footer.getByRole("link", { name: "Products" })).toBeVisible();
    await expect(footer.getByRole("link", { name: "Categories" })).toBeVisible();
    await expect(footer.getByRole("link", { name: "Collections" })).toBeVisible();
  });

  test("clicking Products nav link navigates to /products", async ({ page }) => {
    await page.goto("/categories");

    const header = page.locator("header");
    await header
      .locator("nav")
      .getByRole("link", { name: /products/i })
      .click();
    await expect(page).toHaveURL(/\/products/);
  });

  test("mobile menu button exists", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/products");

    const menuButton = page.getByRole("button", { name: "Menu" });
    await expect(menuButton).toBeVisible();
  });
});
