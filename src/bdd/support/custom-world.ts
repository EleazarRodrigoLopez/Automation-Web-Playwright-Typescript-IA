import { World, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber';
import { Browser, Page, BrowserContext, TestInfo, chromium } from '@playwright/test';
import { LoginPage } from '../../../src/flow/pages/LoginPage';
import { setPage } from '../../../src/utils/hooks';

/**
 * ReportPortal reporter interface
 */
export interface IReporter {
  sendLog(testInfo: TestInfo, level: string, message: string, attachment?: any): Promise<void>;
}

/**
 * Custom Cucumber world interface with Playwright and ReportPortal integration
 */
export interface ICustomWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  testInfo?: TestInfo;
  reporter?: IReporter;
  loginPage: LoginPage;
  init(): Promise<Page>;
  cleanup(): Promise<void>;
}

/**
 * Custom World implementation for Cucumber with Playwright and ReportPortal
 */
export class CustomWorld extends World implements ICustomWorld {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  testInfo?: TestInfo;
  reporter?: IReporter;
  public loginPage!: LoginPage;

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
    this.context = await this.browser!.newContext({
      recordVideo: {
        dir: 'videos/bdd',
        size: { width: 1280, height: 720 }
      }
    });
    this.page = await this.context.newPage();
    
    // Set global page for access in step definitions
    if (this.page) {
      setPage(this.page);
      this.loginPage = new LoginPage(this.page);
    }
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
