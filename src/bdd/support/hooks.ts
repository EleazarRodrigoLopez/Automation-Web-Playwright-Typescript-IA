import { BeforeAll, Before, After, AfterAll, Status } from '@cucumber/cucumber';
import { createScreenshotDir } from '../../../src/utils/hooks';
import fs from 'fs';
import path from 'path';
import { CustomWorld } from './world';
import { chromium } from '@playwright/test';
import { setPage } from '../../../src/utils/hooks';

// Create required directories
BeforeAll(async function() {
  createScreenshotDir('screenshots/bdd/login');
  createScreenshotDir('videos/bdd');
});

// Initialize the browser before each scenario
Before(async function(this: CustomWorld) {
  // Initialize browser, context and page
  this.browser = await chromium.launch({
    headless: process.env.HEADLESS !== 'false',
    slowMo: process.env.SLOWMO ? parseInt(process.env.SLOWMO) : 0
  });
  
  this.context = await this.browser.newContext({
    recordVideo: {
      dir: 'videos/bdd',
      size: { width: 1280, height: 720 }
    }
  });
  
  this.page = await this.context.newPage();
  
  // Set global page for access in step definitions
  if (this.page) {
    setPage(this.page);
  }
});

// Capture screenshots on failure and clean up after each scenario
After(async function(this: CustomWorld, scenario) {
  if (scenario.result?.status === Status.FAILED && this.page) {
    const screenshotDir = 'screenshots/bdd/failures';
    createScreenshotDir(screenshotDir);
    
    const screenshotPath = path.join(
      screenshotDir, 
      `${scenario.pickle.name.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.png`
    );
    
    await this.page.screenshot({ path: screenshotPath });
  }
  
  // Clean up resources
  if (this.browser) {
    await this.browser.close();
  }
});
