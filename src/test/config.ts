// better handling of unhandled exceptions
process.on('unhandledRejection', reason => {
  throw reason;
});

export const config = {
  TEST_URL: process.env.TEST_URL || 'https://localhost:3100',
  TEST_API_URL: process.env.TEST_API_URL || 'http://localhost:4000/api/v1',
  TestHeadlessBrowser: process.env.TEST_HEADLESS ? process.env.TEST_HEADLESS === 'true' : true,
  TestSlowMo: 250,
  WaitForTimeout: 10000,

  Gherkin: {
    features: ['./functional/features/home-page.feature', './functional/features/add-task.feature', './functional/features/update-task-status.feature'],
    steps: ['./steps/common.ts', './steps/addTask.steps.ts'],
  },
  helpers: {},
};

config.helpers = {
  Playwright: {
    url: config.TEST_URL,
    show: !config.TestHeadlessBrowser,
    browser: 'chromium',
    waitForTimeout: config.WaitForTimeout,
    waitForAction: 1000,
    waitForNavigation: 'networkidle0',
    ignoreHTTPSErrors: true,
  }
};
