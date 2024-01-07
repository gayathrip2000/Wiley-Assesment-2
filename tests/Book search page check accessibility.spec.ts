// Verify the accessibility of search page Wiley Online Library//
// 1. Navigates to the Wiley Online Library website.
// 2. Checks if the page title matches the expected title.
// 3. Input a predefined book ISBN in the search box.
// 4. Presses 'Enter' to perform the search.
// 5. Check the search result contains the expected ISBN.
// 6. Validates that the first search result matches the predefined book name
// 7. Conducts an accessibility scan using AxeBuilder.
//    7.1. Specifies WCAG 2.1 AA tags for the scan.
//8. Asserts that there are no accessibility violations found


import { test, expect } from '@playwright/test';
import AxeBuilder from "@axe-core/playwright";

const BOOK_ISBN = "9783527610853";
const BOOK_NAME = "100 Years Werner Heisenberg"

const SEARCH_BOX_INPUT = '//*[@id="searchField1"]';
const SEARCH_RESULT_TEXT3 = '//span[@class=\'result__suffix\']\n'
const PRODUCT_TITLE = '//span[@class=\'hlFld-Title\']'

test('Verify the accessibility of search page Wiley Online Library', async ({ page }) => {

  await page.goto('https://onlinelibrary.wiley.com/');

  await expect(page).toHaveTitle("Wiley Online Library | Scientific research articles, journals, books, and reference works", { timeout: 30000 });

  await page.locator(SEARCH_BOX_INPUT).pressSequentially(BOOK_ISBN);

  await page.keyboard.press('Enter');

  await expect(page.locator(SEARCH_RESULT_TEXT3)).toHaveText(`"${BOOK_ISBN}"  anywhere `,{timeout:50000});

  await expect(page.locator(PRODUCT_TITLE).first()).toHaveText(BOOK_NAME);

    const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag21aa'])
        .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);

});
