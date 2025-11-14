import { Page, TestInfo } from '@playwright/test';

export function setRPName(name: string, testInfo: TestInfo) {
  testInfo.annotations.push({ type: 'rp.testCaseId', description: name });
  testInfo.annotations.push({ type: 'rp.displayName', description: name });
}

export async function logStep(
  testInfo: TestInfo,
  stepDescription: string,
  page: Page,
  action: () => Promise<void>
) {
  try {
    await action();
    const screenshot = await page.screenshot();
    testInfo.attach(stepDescription, { body: screenshot, contentType: 'image/png' });
  } catch (error) {
    const screenshot = await page.screenshot();
    testInfo.attach(`ERROR - ${stepDescription}`, { body: screenshot, contentType: 'image/png' });
    throw error;
  }
}
