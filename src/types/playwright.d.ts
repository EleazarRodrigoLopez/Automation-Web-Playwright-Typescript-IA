declare module '@playwright/test' {
  export interface Page {
    goto(url: string, options?: { waitUntil?: string, timeout?: number }): Promise<any>;
    fill(selector: string, value: string, options?: any): Promise<void>;
    click(selector: string, options?: any): Promise<void>;
    locator(selector: string): Locator;
    screenshot(options?: { path?: string, fullPage?: boolean }): Promise<Buffer>;
    waitForSelector(selector: string, options?: any): Promise<any>;
    waitForURL(url: string, options?: any): Promise<any>;
    waitForLoadState(state?: string, options?: any): Promise<void>;
    waitForTimeout(ms: number): Promise<void>;
    url(): string;
    $(selector: string): Promise<any>;
    evaluate(pageFunction: Function, arg?: any): Promise<any>;
  }

  export interface Locator {
    toBeVisible(options?: { timeout?: number }): any;
    toContainText(text: string): any;
    textContent(): Promise<string | null>;
    click(options?: any): Promise<void>;
    count(): Promise<number>;
    selectOption(value: string, options?: any): Promise<void>;
    first(): Locator;
    last(): Locator;
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
    (value: any): {
      toBeVisible(options?: { timeout?: number }): Promise<void>;
      toContainText(text: string): Promise<void>;
      toBeGreaterThan(value: number): any;
      toBeTruthy(): any;
      not: {
        toContain(value: any): any;
      };
    };
    (locator: Locator): {
      toBeVisible(options?: { timeout?: number }): Promise<void>;
      toContainText(text: string): Promise<void>;
    };
  };
} 