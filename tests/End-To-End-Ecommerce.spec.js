const {test,expect} = require("@playwright/test");


//End to End Ecommerce Testing
test('End to End ECommerce Website Testing', async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client");
    await expect(page).toHaveTitle("Let's Shop");

    const userEmail = page.locator("#userEmail");
    const userPassword = page.locator("[type = 'password']");
    const signIn = page.locator("#login");

    await userEmail.fill("koushik2024@gmail.com");
    await userPassword.fill("Texas@123#");
    await signIn.click();

    //await page.waitForLoadState("networkidle");
    await page.locator(".card-body b").first().waitFor();
    const products = page.locator(".card-body");
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    //ADD IPHONE 13 PRO to cart
    const productName = "IPHONE 13 PRO"

    const productsCount =await products.count();
    for(let i=0;i<productsCount;i++){
        if(await products.nth(i).locator("b").textContent() === productName){
            //await products.nth(i).locator("text=Add To Cart").click();
            await products.nth(i).locator("button").nth(1).click();
            break;
        }
    }

    //goto cart page
    const cartBtn = page.locator("[routerlink*='cart']");
    await cartBtn.click();

    //wait until the cart items are loaded
    await page.locator("div li").first().waitFor();

    // const bool = await page.locator("h3:has-text(productName)").isVisible();
    // expect(bool).toBeTruthy();

    //await page.locator("text=Checkout").click();
    const checkout = page.locator("[type='button']").nth(1);
    await checkout.click();



    //goto checkout page

    await page.locator("[placeholder*='Country']").pressSequentially("ind",{delay:100});
    const dropDown = page.locator(".ta-results");
    await dropDown.waitFor();
    const optionsCount = await dropDown.locator("button").count();
    const countryName = " India";

    for(let i=0;i<optionsCount;i++){
        if(await dropDown.locator("button").nth(i).textContent() === countryName){
            await dropDown.locator("button").nth(i).click();
            break;
        }
    }

    const placeOrder = page.locator("text=PLACE ORDER");
    await placeOrder.click();

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();

    await page.locator("button[routerlink*='myorders']").click();

    await page.locator("tbody tr th").first().waitFor();

    const orderItems = page.locator("tbody tr");

    const orderCount = await orderItems.count();

    for(let i=0; i<orderCount;i++){

        const rowOrderId = await orderItems.nth(i).locator("th").textContent();
        if(orderId.includes(rowOrderId)){
            await orderItems.nth(i).locator("button").first().click();
            break;
        }
    }

    await page.waitForLoadState('networkidle');

    //await expect(page.locator(".email-title")).toHaveText(" order summary ");

    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();



    await page.pause();







    //await page.pause();




});