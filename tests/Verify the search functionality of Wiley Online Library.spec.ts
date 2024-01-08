// Verify the search functionality of Wiley Online Library
// 1. Go to the Wiley Online Library website
// 2. Checks if the page title matches the expected title.
// 3. Enters a predefined book ISBN in the search box
// 4. Press 'Enter' to perform the search.
// 5. Wait for search results to load
// 6. Validates the following aspects of the search results,
//      6.1. Verifies the count of search results to be '1'.
//      6.2. Confirms the presence of text indicating search results for the entered ISBN.
//      6.3. Checks that the product title matches the predefined book name.
// 7. Clicks on the "About this Book" link associated with the searched book.
// 8. Waits for the URL change, indicating navigation to a specific book's page.


import { test, expect } from '@playwright/test';

const BOOK_ISBN = "9783527610853";
const BOOK_NAME = "100 Years Werner Heisenberg";
const ABOUT_THIS_BOOK = "About this Book";

const SEARCH_BOX_INPUT = 'input#searchField1';
const SEARCH_RESULT_TEXT1 = 'span.result__count';
const SEARCH_RESULT_TEXT2 = 'span.result__sep';
const SEARCH_RESULT_TEXT3 = 'span.result__suffix';
const PRODUCT_TITLE = 'span.hlFld-Title';


test('Verify the search functionality of Wiley Online Library', async ({ page }) => {

  await page.goto('https://onlinelibrary.wiley.com/', { timeout: 30000 });

  await expect(page).toHaveTitle(
      "Wiley Online Library | Scientific research articles, journals, books, and reference works",
      { timeout: 15000 }
  );

  await page.locator(SEARCH_BOX_INPUT).pressSequentially(BOOK_ISBN);
  await page.keyboard.press('Enter');

  await page.waitForLoadState('networkidle',{ timeout: 20000 });
  await expect(page.locator(SEARCH_RESULT_TEXT1)).toHaveText(`1`,{ timeout: 20000 });
  await expect(page.locator(SEARCH_RESULT_TEXT2)).toHaveText(`results for`,{ timeout: 30000 });
  await expect(page.locator(SEARCH_RESULT_TEXT3)).toHaveText(`"${BOOK_ISBN}"  anywhere `,{ timeout: 30000 });
  await expect(page.locator(PRODUCT_TITLE).first()).toHaveText(BOOK_NAME);


  await page.click(`text=${ABOUT_THIS_BOOK}`,{ timeout: 30000 });
  await page.waitForURL('**/action/doSearch?AllField=9783527610853#');



});