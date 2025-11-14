import { Page } from '@playwright/test';
import { BasePage } from '../pages/BasePage';

export class HomePage extends BasePage {
    // Selectors
    private readonly appLogoSelector = '.app_logo';
    private readonly menuButtonSelector = '#react-burger-menu-btn';
    private readonly inventoryContainerSelector = '#inventory_container';

    constructor(page: Page) {
        super(page);
    }

    /**
     * Verifies that the login was successful by checking for key elements on the home page
     * @returns Promise<boolean> - true if all elements are present, indicating successful login
     */
    async verifySuccessfulLogin(): Promise<boolean> {
        await this.page.waitForSelector(this.appLogoSelector);
        await this.page.waitForSelector(this.menuButtonSelector);
        await this.page.waitForSelector(this.inventoryContainerSelector);
        return true;
    }

    /**
     * Gets the title text of the home page
     * @returns Promise<string> - the title text
     */
    async getTitle(): Promise<string> {
        const titleElement = await this.page.locator(this.appLogoSelector);
        return await titleElement.textContent() || '';
    }
} 