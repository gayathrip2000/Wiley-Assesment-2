import { test, expect } from '@playwright/test';


//crate constant variable for search box
const BOOK_ISBN = "9783527610853";
const BOOK_NAME = "100 Years Werner Heisenberg"
const ABOUT_THIS_BOOK = "About this Book";

const SEARCH_BOX_INPUT = '//*[@id="searchField1"]';
const SEARCH_RESULT_TEXT1 = '//span[@class=\'result__count\']\n'
const SEARCH_RESULT_TEXT2 = '//span[@class=\'result__sep\']\n'
const SEARCH_RESULT_TEXT3 = '//span[@class=\'result__suffix\']\n'
const PRODUCT_TITLE = '//span[@class=\'hlFld-Title\']'

test('Verify the search functionality of Wiley Online Library', async ({ page }) => {
  await page.goto('https://onlinelibrary.wiley.com/');

  //verify the title
  await expect(page).toHaveTitle("Wiley Online Library | Scientific research articles, journals, books, and reference works",{timeout:10000});

  //input the book isbn in the search box
  await page.locator(SEARCH_BOX_INPUT).pressSequentially(BOOK_ISBN);

  await page.keyboard.press('Enter');

  //verify the search result for 9783527610853
  await expect(page.locator(SEARCH_RESULT_TEXT1)).toHaveText(`1`);
  await expect(page.locator(SEARCH_RESULT_TEXT2)).toHaveText(`results for`);
  await expect(page.locator(SEARCH_RESULT_TEXT3)).toHaveText(`"${BOOK_ISBN}"  anywhere `);

  //verify the book name
  await expect(page.locator(PRODUCT_TITLE).first()).toHaveText(BOOK_NAME,{timeout :5000});
  // Navigate and click element

  await page.getByText(ABOUT_THIS_BOOK).click();
  await page.waitForURL('**/action/doSearch?AllField=9783527610853#');


});


