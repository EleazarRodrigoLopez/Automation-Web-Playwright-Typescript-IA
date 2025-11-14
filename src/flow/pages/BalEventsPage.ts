import { Page, expect } from '@playwright/test';
import { BasePage } from '../../pages/BasePage';
import { createScreenshotDir } from '../../utils/hooks';

export class BalEventsPage extends BasePage {
    // Selectores
    private readonly weekEventsTabSelector = '[aria-label*="Esta semana"], button:text("Esta semana")';
    private readonly monthEventsTabSelector = '[aria-label*="Mes"], button:text("Este mes")';
    private readonly yearEventsTabSelector = '[aria-label*="Año"], button:text("Este año")';
    private readonly viewEventButtonSelector = 'button:text("Ver evento"), [data-test="view-event"]';
    private readonly addToGoogleCalendarSelector = 'button:text("Agregar a Google Calendar"), [data-test="add-google-calendar"]';
    private readonly addToOutlookCalendarSelector = 'button:text("Agregar a Outlook"), [data-test="add-outlook"]';
    private readonly eventCardSelector = '[data-test="event-card"], .event-card';
    private readonly eventDetailSelector = '[data-test="event-detail"], .event-detail';

    constructor(page: Page) {
        super(page);
    }

    /**
     * Navega a eventos de esta semana
     */
    async viewWeekEvents(): Promise<void> {
        await this.page.click(this.weekEventsTabSelector);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Navega a eventos de este mes
     */
    async viewMonthEvents(): Promise<void> {
        await this.page.click(this.monthEventsTabSelector);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Navega a eventos de este año
     */
    async viewYearEvents(): Promise<void> {
        await this.page.click(this.yearEventsTabSelector);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Ve el detalle de un evento
     */
    async viewEventDetail(): Promise<void> {
        const firstViewButton = this.page.locator(this.viewEventButtonSelector).first();
        await firstViewButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Agrega el evento a Google Calendar
     */
    async addToGoogleCalendar(): Promise<void> {
        await this.page.click(this.addToGoogleCalendarSelector);
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    /**
     * Agrega el evento a Outlook Calendar
     */
    async addToOutlookCalendar(): Promise<void> {
        await this.page.click(this.addToOutlookCalendarSelector);
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    /**
     * Obtiene la cantidad de eventos mostrados
     */
    async getEventsCount(): Promise<number> {
        const events = this.page.locator(this.eventCardSelector);
        return await events.count();
    }

    /**
     * Valida que hay eventos visibles
     */
    async validateEventsAreVisible(): Promise<void> {
        const count = await this.getEventsCount();
        expect(count).toBeGreaterThan(0);
    }

    /**
     * Valida que el detalle del evento es visible
     */
    async validateEventDetailIsVisible(): Promise<void> {
        const detail = this.page.locator(this.eventDetailSelector);
        await detail.toBeVisible();
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
