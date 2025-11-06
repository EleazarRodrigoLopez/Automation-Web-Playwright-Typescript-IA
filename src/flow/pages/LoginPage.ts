import { Page, expect } from '@playwright/test';
import { BasePage } from '../../pages/BasePage';
import { createScreenshotDir } from '../../utils/hooks';

export class LoginPage extends BasePage {
    // Selectores de elementos
    private readonly usernameSelector = '#user-name';
    private readonly passwordSelector = '#password';
    private readonly loginButtonSelector = '#login-button';
    private readonly errorMessageSelector = '[data-test="error"]';
    private readonly inventoryContainerSelector = '[data-test="inventory-container"]';
    private readonly appLogoSelector = '.app_logo';
    private readonly menuButtonSelector = '#react-burger-menu-btn';

    constructor(page: Page) {
        super(page);
    }

    /**
     * Navega a la página de login
     */
    async navigateToLogin(): Promise<void> {
        const baseUrl = process.env.BASE_URL || 'https://www.saucedemo.com';
        await this.page.goto(baseUrl);
        await this.page.waitForSelector(this.usernameSelector);
    }

    /**
     * Ingresa el nombre de usuario
     * @param username - Nombre de usuario a ingresar
     */
    async enterUsername(username: string): Promise<void> {
        await this.page.fill(this.usernameSelector, username);
        await this.page.waitForSelector(this.usernameSelector);
    }

    /**
     * Ingresa la contraseña
     * @param password - Contraseña a ingresar
     */
    async enterPassword(password: string): Promise<void> {
        await this.page.fill(this.passwordSelector, password);
        await this.page.waitForSelector(this.passwordSelector);
    }

    /**
     * Hace clic en el botón de login
     */
    async clickLoginButton(): Promise<void> {
        await this.page.click(this.loginButtonSelector);
        // Esperar un poco para la redirección
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    /**
     * Realiza el flujo completo de login
     * @param username - Nombre de usuario
     * @param password - Contraseña
     */
    async login(username: string, password: string): Promise<void> {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    /**
     * Valida que el login fue exitoso verificando la redirección al inventario
     */
    async validateSuccessfulLogin(): Promise<void> {
        // Verificar que estamos en la página de inventario
        await this.page.waitForURL(/.*inventory\.html/);
        
        // Verificar elementos clave del inventario
        await expect(this.page.locator(this.inventoryContainerSelector)).toBeVisible();
        await expect(this.page.locator(this.appLogoSelector)).toBeVisible();
        await expect(this.page.locator(this.menuButtonSelector)).toBeVisible();
    }

    /**
     * Valida que aparece un mensaje de error
     */
    async validateErrorMessage(): Promise<void> {
        await expect(this.page.locator(this.errorMessageSelector)).toBeVisible();
    }

    /**
     * Obtiene el texto del mensaje de error
     * @returns El texto del mensaje de error
     */
    async getErrorMessageText(): Promise<string> {
        const errorElement = this.page.locator(this.errorMessageSelector);
        await expect(errorElement).toBeVisible();
        return await errorElement.textContent() || '';
    }

    /**
     * Verifica que estamos en la página de login
     */
    async isOnLoginPage(): Promise<boolean> {
        try {
            await this.page.waitForSelector(this.usernameSelector, { timeout: 5000 });
            await this.page.waitForSelector(this.passwordSelector, { timeout: 5000 });
            await this.page.waitForSelector(this.loginButtonSelector, { timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Captura una screenshot con un nombre específico
     * @param stepName - Nombre del paso para la screenshot
     * @param screenshotDir - Directorio donde guardar la screenshot
     */
    async captureStepScreenshot(stepName: string, screenshotDir: string): Promise<string> {
        createScreenshotDir(screenshotDir);
        const screenshotPath = `${screenshotDir}/${stepName}.png`;
        await this.page.screenshot({ path: screenshotPath, fullPage: true });
        return screenshotPath;
    }
}
