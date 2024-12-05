const {test,expect} = require("@playwright/test");

test("Client App Login", async ({page}) =>{
    const products = page.locator(".card-body");
    const email = "koushik2024@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Texas@123#");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');
    const productName = "ZARA COAT 3";
    const count = await products.count();
    
    console.log(count);

    for(let i = 0; i< count;i++){
        if(await products.nth(i).locator("b").textContent() === productName){
            await products.nth(i).locator("text=Add To Cart").click();
            break;
        }
    }

    const cartBtn = page.locator("[routerlink*='cart']");
    await cartBtn.click();

    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();

    await page.locator("text=Checkout").click();

    page.locator("text=CVV Code").locator(".text")

    //await page.pause();
    await page.locator("[placeholder*='Country']").type("ind");
 
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
       const text = await dropdown.locator("button").nth(i).textContent();
       if (text === " India") {
          await dropdown.locator("button").nth(i).click();
          break;
       }
    }
  
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();

    

});