import { test, expect } from '@playwright/test';
require('dotenv').config();


const LOGIN_TITLE =  '//span[@class=\'sign-in-label\']\n'
const INPUT_USERNAME = '//input[@id=\'username\']\n'
const INPUT_PASSWORD = '//input[@id=\'password\']\n'
const INTRO_TEXT = '//p[@class=\'intro-text--search\']\n'

const login =process.env.login;
const password =process.env.password;

test('Verify the login with valid credentials', async ({ page }) => {
  await page.goto('https://onlinelibrary.wiley.com/');
  //verify the title
  await expect(page).toHaveTitle("Wiley Online Library | Scientific research articles, journals, books, and reference works",{timeout:10000});

  await expect(page.locator(LOGIN_TITLE)).toHaveText(`Login / Register`,{timeout:30000});

  await page.locator(INPUT_USERNAME).pressSequentially(login);
  await page.locator(INPUT_PASSWORD).pressSequentially(password);


  await page.keyboard.press('Enter');

  await expect(page.locator(INTRO_TEXT)).toHaveText("Today's research, tomorrow's innovation", { timeout: 30000 });


});


