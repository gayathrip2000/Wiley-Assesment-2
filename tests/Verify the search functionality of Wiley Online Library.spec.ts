// Verify the search functionality of Wiley Online Library
// 1. Go to the Wiley Online Library website
// 2. Checks if the page title matches the expected title.
// 3. Enters a predefined book ISBN in the search box
// 4. Press 'Enter' to perform the search.
// 5. Validates the following aspects of the search results,
//      5.1. Verifies the count of search results to be '1'.
//      5.2. Confirms the presence of text indicating search results for the entered ISBN.
//      5.3. Checks that the product title matches the predefined book name.
// 6. Clicks on the "About this Book" link associated with the searched book.
// 7. Waits for the URL change, indicating navigation to a specific book's page.


import { test, expect } from '@playwright/test';

const BOOK_ISBN = "9783527610853";
const BOOK_NAME = "100 Years Werner Heisenberg";
const ABOUT_THIS_BOOK = "About this Book";

const SEARCH_BOX_INPUT = '//*[@id="searchField1"]';
const SEARCH_RESULT_TEXT1 = '//span[@class=\'result__count\']\n';
const SEARCH_RESULT_TEXT2 = '//span[@class=\'result__sep\']\n';
const SEARCH_RESULT_TEXT3 = '//span[@class=\'result__suffix\']\n';
const PRODUCT_TITLE = '//span[@class=\'hlFld-Title\']';

test('Verify the search functionality of Wiley Online Library', async ({ page }) => {

  await page.goto('https://onlinelibrary.wiley.com/');

  await expect(page).toHaveTitle("Wiley Online Library | Scientific research articles, journals, books, and reference works", { timeout: 10000 });

  await page.locator(SEARCH_BOX_INPUT).pressSequentially(BOOK_ISBN);
  await page.keyboard.press('Enter');
  await expect(page.locator(SEARCH_RESULT_TEXT1)).toHaveText(`1`,{ timeout: 20000 });

  await expect(page.locator(SEARCH_RESULT_TEXT2)).toHaveText(`results for`,{ timeout: 20000 });
  await expect(page.locator(SEARCH_RESULT_TEXT3)).toHaveText(`"${BOOK_ISBN}"  anywhere `,{ timeout: 20000 });
  await expect(page.locator(PRODUCT_TITLE).first()).toHaveText(BOOK_NAME);

  await page.click(`text=${ABOUT_THIS_BOOK}`,{ timeout: 50000 });
  await page.waitForURL('**/action/doSearch?AllField=9783527610853#');
});