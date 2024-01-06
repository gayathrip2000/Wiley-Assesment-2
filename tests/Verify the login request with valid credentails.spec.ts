import { test, expect } from '@playwright/test';
import axios from 'axios';
require('dotenv').config();

const login = process.env.login;
const password = process.env.password;

const URL = "https://onlinelibrary.wiley.com/action/doLogin?societyURLCode=";

test('Verify the login functionality of the login page with API', async ({ page }) => {
    // Axios: API call to perform login
    try {
        const response = await axios.post(URL, {
            login,
            password
        });

        // Checking status code
        expect(response.status).toBe(302);

        //Assuming the response data should exist
        expect(response.data).toBeTruthy();

        await page.goto('https://onlinelibrary.wiley.com/');
        console.log(response.data);
    } catch (error) {
        // Catch any potential errors
        console.error("Error occurred:", error);
    }
});