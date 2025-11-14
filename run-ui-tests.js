const { exec } = require('child_process');
const path = require('path');
require('dotenv').config();

// Set environment variables for testing
process.env.BASE_URL = process.env.BASE_URL || 'https://www.saucedemo.com';
process.env.TEST_USERNAME = process.env.TEST_USERNAME || 'standard_user';
process.env.TEST_PASSWORD = process.env.TEST_PASSWORD || 'secret_sauce';
process.env.HEADLESS = process.env.HEADLESS || 'false';
process.env.SLOWMO = process.env.SLOWMO || '0';

// Command to run the test
const command = 'npx playwright test src/flow/tests/login.spec.ts --reporter=list';

console.log('Running command:', command);

// Execute the command
const child = exec(command, {
  env: {
    ...process.env,
    BASE_URL: process.env.BASE_URL,
    TEST_USERNAME: process.env.TEST_USERNAME,
    TEST_PASSWORD: process.env.TEST_PASSWORD,
    HEADLESS: process.env.HEADLESS,
    SLOWMO: process.env.SLOWMO
  }
});

// Display output
child.stdout.on('data', (data) => {
  console.log(data);
});

child.stderr.on('data', (data) => {
  console.error(data);
});

child.on('exit', (code) => {
  console.log(`Test exited with code ${code}`);
}); 