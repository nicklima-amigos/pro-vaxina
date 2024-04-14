import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  const header = page.locator("h1");

  await expect(header).toContainText("Pro Vaxina");
});
