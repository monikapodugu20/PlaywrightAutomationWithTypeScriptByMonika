import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  //globalTimeout: 6 * 60 * 1000,
  //timeout: 1* 60 * 100,
  // expect: {
  //   timeout: 5000,
  // },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  // forbidOnly: !!process.env.CI,
  // /* Retry on CI only */
  retries: 1,
  // /* Opt out of parallel tests on CI. */
  workers:4,
   //workers: process.env.CI ? 1 : 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //reporter: 'html',
  reporter: [['html'],
  //['list'],
  //['dot'],
  ['allure-playwright'],
  //['json', { outputFile: 'Json-test-report.json' }],
  ['junit', { outputFile: 'Junit-test-report.xml' }]
],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Run tests in headed mode by default so the browser window stays visible. */
    headless: false,
    screenshot: 'only-on-failure',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
    //video: 'on',
    testIdAttribute: 'data-tab-item',
    //actionTimeout: 10000,
    // launchOptions: {
    //   args: ['--start-maximized'],
    // },
  },

  /* Configure browser projects so the Playwright Test Explorer shows a multi-project view. */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        //viewport: { width: 1920, height: 1080 },
      },
    },
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },
    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //   },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    //  {
    //   name: 'Microsoft Edge',
    //    use: { ...devices['Desktop Edge'], channel: 'msedge' },
    //  },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
  
  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
