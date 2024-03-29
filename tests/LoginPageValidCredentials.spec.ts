// Verify the login with valid credentials
// 1. Navigates to the Wiley Online Library website.
// 2. Checks if the page title matches the expected title.
// 3. Checks for the existence of the login/register element on the page.
// 4. Input the login credentials (username and password) obtained from
//    environment variables into their respective input fields.
// 5. Validates an introductory text ("Today's research, tomorrow's innovation") after the login.


import { test, expect } from '@playwright/test';
require('dotenv').config();

const LOGIN_TITLE =  '//span[@class=\'sign-in-label\']\n'
const INPUT_USERNAME = '#username';
const INPUT_PASSWORD = '#password';
const INTRO_TEXT = '.intro-text--search';

const login =process.env.login;
const password =process.env.password;

test('Verify the login with valid credentials', async ({ page }) => {

  await page.goto('https://onlinelibrary.wiley.com/');
  await expect(page).toHaveTitle("Wiley Online Library | Scientific research articles, journals, books, and reference works",{timeout:30000});

  await expect(page.locator(LOGIN_TITLE)).toHaveText(`Login / Register`,{timeout:50000});

  await page.locator(INPUT_USERNAME).pressSequentially(login);
  await page.locator(INPUT_PASSWORD).pressSequentially(password);


  await page.keyboard.press('Enter');


  await expect(page.locator(INTRO_TEXT)).toHaveText("Today's research, tomorrow's innovation", { timeout: 70000 });


});


