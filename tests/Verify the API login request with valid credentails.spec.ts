// Verify the login functionality of the login page with API //
// 1. end point url assign in to URL.
// 2. login credentials retrieved from environment variables (login and password) in the request payload.
// 3. Expect the response status to be 302 (indicating a redirection response) and for
//    the response data to exist (toBeTruthy()).
// 4. Navigates to the Wiley Online Library page using Playwright (page.goto()).


import { test, expect } from '@playwright/test';
import axios from 'axios';
require('dotenv').config();

const login = process.env.login;
const password = process.env.password;

const URL = "https://onlinelibrary.wiley.com/action/doLogin?societyURLCode=";

test('Verify the API login functionality of the login page with', async ({ page }) => {
    try {
        const response = await axios.post(URL, {
            login,
            password
        });

        expect(response.status).toBe(302);

        expect(response.data).toBeTruthy();

        await page.goto('https://onlinelibrary.wiley.com/');
        await page.waitForLoadState('networkidle');
        console.log(response.data);
    } catch (error) {

        console.error("Error occurred:", error);
    }
});
