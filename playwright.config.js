// @ts-check
const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true, 
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  timeout: 30*1000,
  expect:{
    timeout: 5000
  },   
  use: {
    browserName: 'chromium',
    trace: 'on',
    headless: false,
    screenshot: 'on', 
  },
}
module.exports = config;


