import { Page, expect } from '@playwright/test';
import { BasePage } from '../../pages/BasePage';
import { createScreenshotDir } from '../../utils/hooks';

export class BalInitiativesPage extends BasePage {
    // Selectores
    private readonly initiativesContainerSelector = '[data-test="initiatives"], .initiatives-container';
    private readonly filterButtonSelector = 'button:text("Filtrar"), [data-test="filter-button"]';
    private readonly programsLinkSelector = '[data-test="programs"], a:text("Programas")';
    private readonly paginationNextSelector = 'button[aria-label*="Siguiente"], button:text("Siguiente")';
    private readonly paginationPrevSelector = 'button[aria-label*="Anterior"], button:text("Anterior")';
    private readonly initiativeCardSelector = '[data-test="initiative-card"], .initiative-card';
    private readonly presidentialMessagesSelector = '[data-test="presidential-messages"], .presidential-messages';
    private readonly monthFilterSelector = 'select[name="month"], [data-test="month-filter"]';

    constructor(page: Page) {
        super(page);
    }

    /**
     * Navega a la página de iniciativas (home)
     */
    async navigateToInitiatives(): Promise<void> {
        // Suponiendo que ya está logueado y está en la página principal
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Aplica un filtro
     */
    async applyFilter(filterName: string): Promise<void> {
        await this.page.click(this.filterButtonSelector);
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Buscar la opción de filtro
        const filterOption = this.page.locator(`text="${filterName}"`);
        await filterOption.click();
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Navega a la sección de Programas
     */
    async navigateToPrograms(): Promise<void> {
        await this.page.click(this.programsLinkSelector);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Va a la siguiente página usando paginador
     */
    async goToNextPage(): Promise<void> {
        await this.page.click(this.paginationNextSelector);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Va a la página anterior usando paginador
     */
    async goToPreviousPage(): Promise<void> {
        await this.page.click(this.paginationPrevSelector);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Obtiene la cantidad de iniciativas mostradas
     */
    async getInitiativesCount(): Promise<number> {
        const initiatives = this.page.locator(this.initiativeCardSelector);
        return await initiatives.count();
    }

    /**
     * Valida que hay iniciativas visibles
     */
    async validateInitiativesAreVisible(): Promise<void> {
        const count = await this.getInitiativesCount();
        expect(count).toBeGreaterThan(0);
    }

    /**
     * Navega a ver comunicados de presidencia
     */
    async navigateToPresidentialMessages(): Promise<void> {
        await this.page.click(this.presidentialMessagesSelector);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Filtra comunicados por mes
     */
    async filterMessagesByMonth(month: string): Promise<void> {
        const monthSelect = this.page.locator(this.monthFilterSelector);
        await monthSelect.selectOption(month);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Captura screenshot
     */
    async captureStepScreenshot(stepName: string, screenshotDir: string): Promise<string> {
        createScreenshotDir(screenshotDir);
        const screenshotPath = `${screenshotDir}/${stepName}.png`;
        await this.page.screenshot({ path: screenshotPath, fullPage: true });
        return screenshotPath;
    }
}
