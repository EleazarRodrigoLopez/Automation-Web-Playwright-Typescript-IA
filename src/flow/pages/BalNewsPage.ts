import { Page, expect } from '@playwright/test';
import { BasePage } from '../../pages/BasePage';
import { createScreenshotDir } from '../../utils/hooks';

export class BalNewsPage extends BasePage {
    // Selectores
    private readonly newsContainerSelector = '[data-test="news-container"], .news-container';
    private readonly categoryFilterSelector = '[data-test="category-filter"], select[name="category"]';
    private readonly programFilterSelector = '[data-test="program-filter"], select[name="program"]';
    private readonly newsArticleSelector = '[data-test="news-article"], .news-article';
    private readonly newsDetailSelector = '[data-test="news-detail"], .news-detail';
    private readonly nextEventsSelector = '[data-test="next-events"], .next-events';
    private readonly recommendedNewsSelector = '[data-test="recommended-news"], .recommended-news';
    private readonly backButtonSelector = 'button:text("Volver"), button:text("Atrás"), [aria-label="back"]';

    constructor(page: Page) {
        super(page);
    }

    /**
     * Navega a noticias
     */
    async navigateToNews(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Filtra noticias por categoría
     */
    async filterByCategory(category: string): Promise<void> {
        const categorySelect = this.page.locator(this.categoryFilterSelector);
        await categorySelect.selectOption(category);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Filtra noticias por programa
     */
    async filterByProgram(program: string): Promise<void> {
        const programSelect = this.page.locator(this.programFilterSelector);
        await programSelect.selectOption(program);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Obtiene la cantidad de noticias mostradas
     */
    async getNewsCount(): Promise<number> {
        const articles = this.page.locator(this.newsArticleSelector);
        return await articles.count();
    }

    /**
     * Valida que hay noticias visibles
     */
    async validateNewsAreVisible(): Promise<void> {
        const count = await this.getNewsCount();
        expect(count).toBeGreaterThan(0);
    }

    /**
     * Hace clic en la primera noticia para ver detalle
     */
    async clickFirstNews(): Promise<void> {
        const firstArticle = this.page.locator(this.newsArticleSelector).first();
        await firstArticle.click();
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Valida que el detalle de noticia es visible
     */
    async validateNewsDetailIsVisible(): Promise<void> {
        const detail = this.page.locator(this.newsDetailSelector);
        await detail.toBeVisible();
    }

    /**
     * Valida que hay próximos eventos mostrados
     */
    async validateNextEventsAreVisible(): Promise<void> {
        const nextEvents = this.page.locator(this.nextEventsSelector);
        await nextEvents.toBeVisible();
    }

    /**
     * Valida que hay noticias recomendadas mostradas
     */
    async validateRecommendedNewsAreVisible(): Promise<void> {
        const recommended = this.page.locator(this.recommendedNewsSelector);
        await recommended.toBeVisible();
    }

    /**
     * Vuelve a la lista de noticias
     */
    async goBack(): Promise<void> {
        await this.page.click(this.backButtonSelector);
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
