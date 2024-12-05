import {test, expect} from '@playwright/test';

//test 1
test('playwright special locators',async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").check(); 
    //for checkboxes or radiobuttons we can also use check() instead of click()
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByRole("button",{name:'Submit'}).click();
    await page.getByRole("link",{name: 'Shop'}).click();
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();

});