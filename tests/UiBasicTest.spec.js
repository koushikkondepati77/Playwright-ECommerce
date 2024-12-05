const {test, expect} = require('@playwright/test');

//test1
test('Browser context playwright test', async ({browser}) =>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://google.com");
});

//test2
test("open google page", async ({page}) =>{
    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");

});

//test3
test("rahulshetty website login test",async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    const userName = page.locator("#username");
    const signIn = page.locator("#signInBtn");
    await userName.fill("koushik");
    await page.locator("[type = 'password']").fill("learning");
    await signIn.click();
    //test assertion login correct or incorrect
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();

    //console.log(await page.locator(".card-body a").nth(0).textContent());
    //await page.waitForLoadState("networkidle");
    await page.locator(".card-body a").waitFor();
    console.log(await page.locator(".card-body a").allTextContents());


    
});

//test 4
test.only("test UI controls", async ({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const userName = page.locator("#username");
    const signIn = page.locator("#signInBtn");

    

    await userName.fill("rahulshettyacademy"); //username
    await page.locator("[type = 'password']").fill("learning"); //password
    await page.locator(".radiotextsty").last().click(); //click on radio
    await page.locator("#okayBtn").click();
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    const dropDown = page.locator("select.form-control");
    await dropDown.selectOption("Consultant");

    await page.locator("#terms").click();
    

    await signIn.click();

    //await page.pause();



});

//test 5
test("page switching  blinking link", async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    //check for page title assertion
    console.log(await page.title());
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');

    const documentLink = page.locator("[href*= 'documents-request']");

    //three states of Promise => pending,rejected,fullfilled 
    const [newPage] = await Promise.all([
        context.waitForEvent('page'), //listen for any new page
        documentLink.click()
    ]);

    const redText = await newPage.locator(".red").textContent();
    const domain = redText.split("@")[1].split(" ")[0];
    console.log(redText);
    console.log(domain);

    
});