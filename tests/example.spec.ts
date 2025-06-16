import { test, expect } from '@playwright/test';

test('homepage has expected title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Portfolio/);
});

test('theme switcher works', async ({ page }) => {
  await page.goto('/');
  const themeButton = page.getByRole('button', { name: /theme/i });
  await expect(themeButton).toBeVisible();
  await themeButton.click();
  // Add assertions for theme change
}); 