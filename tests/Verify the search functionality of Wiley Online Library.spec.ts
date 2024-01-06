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

  // Verify the title
  await expect(page).toHaveTitle("Wiley Online Library | Scientific research articles, journals, books, and reference works", { timeout: 10000 });

  // Input the book ISBN in the search box
  await page.locator(SEARCH_BOX_INPUT).type(BOOK_ISBN);
  await page.keyboard.press('Enter');
  test.slow();
  await expect(page.locator(SEARCH_RESULT_TEXT1)).toHaveText(`1`,{ timeout: 20000 });

  await expect(page.locator(SEARCH_RESULT_TEXT2)).toHaveText(`results for`,{ timeout: 20000 });
  await expect(page.locator(SEARCH_RESULT_TEXT3)).toHaveText(`"${BOOK_ISBN}"  anywhere `,{ timeout: 20000 });
  await expect(page.locator(PRODUCT_TITLE).first()).toHaveText(BOOK_NAME);

  // Navigate and click the "About this Book" element
  await page.click(`text=${ABOUT_THIS_BOOK}`,{ timeout: 50000 });
  await page.waitForURL('**/action/doSearch?AllField=9783527610853#');
});
