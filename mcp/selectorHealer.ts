import { Page } from '@playwright/test';

export async function tryAlternativeSelectors(page: Page, selectors: string[]): Promise<string | null> {
  for (const selector of selectors) {
    try {
      const element = await page.$(selector);
      if (element) {
        return selector;
      }
    } catch (error) {
      continue;
    }
  }
  return null;
}
