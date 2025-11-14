import { World, setWorldConstructor, IWorldOptions } from '@cucumber/cucumber';
import { chromium, Browser, Page, BrowserContext } from '@playwright/test';
import { setPage } from '../../../src/utils/hooks';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Custom Cucumber World with Playwright integration
 */
export class CustomWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;

  constructor(options: IWorldOptions) {
    super(options);
  }

  /**
   * Initialize Playwright browser and page
   */
  async init() {
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
    setPage(this.page);
    return this.page;
  }

  /**
   * Clean up Playwright resources
   */
  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

setWorldConstructor(CustomWorld); 