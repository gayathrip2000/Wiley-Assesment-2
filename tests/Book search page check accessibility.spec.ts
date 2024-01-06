import { test, expect } from '@playwright/test';
import AxeBuilder from "@axe-core/playwright";


//crate constant variable for search box
const BOOK_ISBN = "9783527610853";
const BOOK_NAME = "100 Years Werner Heisenberg"

const SEARCH_BOX_INPUT = '//*[@id="searchField1"]';
const SEARCH_RESULT_TEXT3 = '//span[@class=\'result__suffix\']\n'
const PRODUCT_TITLE = '//span[@class=\'hlFld-Title\']'

test('Verify the accessibility of search page Wiley Online Library', async ({ page }) => {

  await page.goto('https://onlinelibrary.wiley.com/');

  //verify the title
  await expect(page).toHaveTitle("Wiley Online Library | Scientific research articles, journals, books, and reference works", { timeout: 30000 });

  //input the book isbn in the search box
  await page.locator(SEARCH_BOX_INPUT).pressSequentially(BOOK_ISBN);

  await page.keyboard.press('Enter');

  //verify the search result for 9783527610853
  await expect(page.locator(SEARCH_RESULT_TEXT3)).toHaveText(`"${BOOK_ISBN}"  anywhere `,{timeout:50000});

    //verify the book name
  await expect(page.locator(PRODUCT_TITLE).first()).toHaveText(BOOK_NAME);

  // Navigate and click element
    const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag21aa'])
        .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);

});


