import { TestInfo, Page } from '@playwright/test';

export const setRPName = (name: string, testInfo: TestInfo): void => {
    testInfo.title = name;
};

export const logStep = async (
    testInfo: TestInfo,
    description: string,
    page: Page,
    action: () => Promise<void>
): Promise<void> => {
    try {
        await action();
        console.log(`✅ ${description}`);
    } catch (error) {
        console.error(`❌ ${description}:`, error);
        throw error;
    }
}; 