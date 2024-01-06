import { test, expect } from '@playwright/test';


test.only('Verify the search functionality of Wiley Online Library', async ({ page }) => {
  await page.goto('https://onlinelibrary.wiley.com/');

  //verify the title
  await expect(page).toHaveTitle("Wiley Online Library | Scientific research articles, journals, books, and reference works",{timeout:10000});




});


