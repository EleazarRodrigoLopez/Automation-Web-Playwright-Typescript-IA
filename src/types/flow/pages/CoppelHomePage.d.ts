import { Page } from '@playwright/test';
import { BasePage } from '../../../src/pages/BasePage';

export declare class CoppelHomePage extends BasePage {
    private readonly searchInputSelector;
    private readonly searchButtonSelector;
    private readonly productCardSelector;
    private readonly productTitleSelector;
    constructor(page: Page);
    navigateToCoppel(): Promise<void>;
    searchForProduct(productName: string): Promise<void>;
    validateSearchResultsContain(expectedText: string): Promise<void>;
    captureStepScreenshot(stepName: string, screenshotDir: string): Promise<string>;
}
