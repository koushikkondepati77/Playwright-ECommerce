const {test} = require("@playwright/test");

//test1
test("Rahulshetty academy website Login", async ({page}) =>{
    await page.goto("https://rahulshettyacademy.com/client");
    const email = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const login = page.locator("#login");

    await email.fill("koushik2024@gmail.com");
    await password.fill("Texas@123#");
    await login.click();

    //getting firstpage title example "ZARA COAT 3"
    //await page.waitForLoadState('networkidle'); this step sometimes get flaky
    await page.locator(".card-body b").first().waitFor();
    console.log(await page.locator(".card-body b").allTextContents());

});