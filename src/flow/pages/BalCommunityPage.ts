import { Page, expect } from '@playwright/test';
import { BasePage } from '../../pages/BasePage';
import { createScreenshotDir } from '../../utils/hooks';

export class BalCommunityPage extends BasePage {
    // Selectores
    private readonly communityLinkSelector = '[data-test="community-link"], a:text("Comunidad Baleña")';
    private readonly benefitsTabSelector = '[aria-label*="beneficio"], button:text("Beneficios")';
    private readonly promotionsTabSelector = '[aria-label*="promoci"], button:text("Promociones")';
    private readonly benefitCardSelector = '[data-test="benefit-card"], .benefit-card';
    private readonly promotionCardSelector = '[data-test="promotion-card"], .promotion-card';
    private readonly communityContainerSelector = '[data-test="community-container"], .community-container';
    private readonly benefitDetailSelector = '[data-test="benefit-detail"], .benefit-detail';

    constructor(page: Page) {
        super(page);
    }

    /**
     * Navega a la sección de comunidad baleña
     */
    async navigateToCommunity(): Promise<void> {
        await this.page.click(this.communityLinkSelector);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Ve la sección de beneficios
     */
    async viewBenefits(): Promise<void> {
        await this.page.click(this.benefitsTabSelector);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Ve la sección de promociones
     */
    async viewPromotions(): Promise<void> {
        await this.page.click(this.promotionsTabSelector);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Obtiene la cantidad de beneficios mostrados
     */
    async getBenefitsCount(): Promise<number> {
        const benefits = this.page.locator(this.benefitCardSelector);
        return await benefits.count();
    }

    /**
     * Obtiene la cantidad de promociones mostradas
     */
    async getPromotionsCount(): Promise<number> {
        const promotions = this.page.locator(this.promotionCardSelector);
        return await promotions.count();
    }

    /**
     * Valida que hay beneficios visibles
     */
    async validateBenefitsAreVisible(): Promise<void> {
        const count = await this.getBenefitsCount();
        expect(count).toBeGreaterThan(0);
    }

    /**
     * Valida que hay promociones visibles
     */
    async validatePromotionsAreVisible(): Promise<void> {
        const count = await this.getPromotionsCount();
        expect(count).toBeGreaterThan(0);
    }

    /**
     * Hace clic en el primer beneficio para ver detalle
     */
    async clickFirstBenefit(): Promise<void> {
        const firstBenefit = this.page.locator(this.benefitCardSelector).first();
        await firstBenefit.click();
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Valida que el detalle del beneficio es visible
     */
    async validateBenefitDetailIsVisible(): Promise<void> {
        const detail = this.page.locator(this.benefitDetailSelector);
        await detail.toBeVisible();
    }

    /**
     * Valida que estamos en la sección de comunidad
     */
    async isOnCommunitySection(): Promise<boolean> {
        try {
            await this.page.waitForSelector(this.communityContainerSelector, { timeout: 5000 });
            return true;
        } catch {
            return false;
        }
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
