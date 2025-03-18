const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    const formURL = 'https://docs.google.com/forms/d/e/DEMO_FORM_ID/viewform'; // Replace with actual Google Form URL
    await page.goto(formURL, { waitUntil: 'networkidle2' });

    // Filling a text input field with a demo entry ID
    await page.type('input[name="entry.123456789"]', `DemoUser${Math.floor(Math.random() * 1000)}`);

    // Selecting a random multiple-choice option
    const radioButtons = await page.$$('div[role="radio"]');
    if (radioButtons.length > 0) {
        const randomIndex = Math.floor(Math.random() * radioButtons.length);
        await radioButtons[randomIndex].click();
    }

    // Selecting a random checkbox
    const checkboxes = await page.$$('div[role="checkbox"]');
    if (checkboxes.length > 0) {
        const randomIndex = Math.floor(Math.random() * checkboxes.length);
        await checkboxes[randomIndex].click();
    }

    // Submitting the form
    await page.click('div[role="button"]');
    await page.waitForTimeout(2000);

    await browser.close();
})();
