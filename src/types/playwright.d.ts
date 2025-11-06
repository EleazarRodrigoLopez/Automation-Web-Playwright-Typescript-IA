declare module '@playwright/test' {
  export interface Page {
    goto(url: string, options?: { waitUntil?: string, timeout?: number }): Promise<any>;
    fill(selector: string, value: string, options?: any): Promise<void>;
    click(selector: string, options?: any): Promise<void>;
    locator(selector: string): Locator;
    screenshot(options?: { path?: string, fullPage?: boolean }): Promise<Buffer>;
    waitForSelector(selector: string, options?: any): Promise<any>;
    waitForURL(url: string, options?: any): Promise<any>;
  }

  export interface Locator {
    toBeVisible(options?: { timeout?: number }): any;
    toContainText(text: string): any;
    textContent(): Promise<string | null>;
  }

  export interface TestInfo {
    attach(name: string, options: { body: Buffer, contentType: string }): Promise<void>;
  }

  export const test: {
    describe(name: string, callback: () => void): void;
    beforeEach(callback: (options?: any) => Promise<void>): void;
    (name: string, callback: (fixtures: { page: Page }, testInfo: TestInfo) => Promise<void>): void;
  };

  export const expect: {
    (locator: Locator): {
      toBeVisible(options?: { timeout?: number }): Promise<void>;
      toContainText(text: string): Promise<void>;
    };
  };
} 