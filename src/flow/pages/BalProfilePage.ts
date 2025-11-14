import { Page, expect } from '@playwright/test';
import { BasePage } from '../../pages/BasePage';
import { createScreenshotDir } from '../../utils/hooks';

export class BalProfilePage extends BasePage {
    // Selectores
    private readonly profileMenuSelector = '[aria-label*="perfil" i], [aria-label*="profile" i]';
    private readonly changePasswordButtonSelector = 'button:text("Cambiar contraseña"), [data-test="change-password"]';
    private readonly logoutButtonSelector = 'button:text("Cerrar sesión"), button:text("Logout"), [data-test="logout"]';
    private readonly cancelAccountButtonSelector = 'button:text("Cancelar la cuenta"), [data-test="cancel-account"]';
    private readonly profileSectionSelector = '[data-test="profile-section"], .profile-section';

    constructor(page: Page) {
        super(page);
    }

    /**
     * Abre el menú de perfil
     */
    async openProfileMenu(): Promise<void> {
        await this.page.click(this.profileMenuSelector);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    /**
     * Navega a cambiar contraseña
     */
    async navigateToChangePassword(): Promise<void> {
        await this.openProfileMenu();
        await this.page.click(this.changePasswordButtonSelector);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Cierra sesión
     */
    async logout(): Promise<void> {
        await this.openProfileMenu();
        await this.page.click(this.logoutButtonSelector);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Intenta cancelar la cuenta
     */
    async attemptCancelAccount(): Promise<void> {
        await this.openProfileMenu();
        try {
            await this.page.waitForSelector(this.cancelAccountButtonSelector, { timeout: 3000 });
            await this.page.click(this.cancelAccountButtonSelector);
        } catch {
            throw new Error('Botón de cancelar cuenta no está disponible');
        }
    }

    /**
     * Valida que estamos en la sección de perfil
     */
    async isOnProfileSection(): Promise<boolean> {
        try {
            await this.page.waitForSelector(this.profileSectionSelector, { timeout: 5000 });
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
