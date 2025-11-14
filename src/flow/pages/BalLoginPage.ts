import { Page, expect } from '@playwright/test';
import { BasePage } from '../../pages/BasePage';
import { createScreenshotDir } from '../../utils/hooks';

export class BalLoginPage extends BasePage {
    // Selectores encontrados en inspección
    private readonly emailInputSelector = '#edit-name';
    private readonly passwordInputSelector = '#edit-pass';
    private readonly loginButtonSelector = '#edit-submit';
    
    // Selectores alternativos por si la página cambia
    private readonly emailInputSelectors = [
        '#edit-name',
        'input[type="email"]',
        'input[name="name"]',
        'input[placeholder*="Correo" i]'
    ];
    
    private readonly passwordInputSelectors = [
        '#edit-pass',
        'input[type="password"]',
        'input[name="pass"]',
        'input[placeholder*="Contraseña" i]'
    ];
    
    private readonly loginButtonSelectors = [
        '#edit-submit',
        'button[type="submit"]',
        'input[type="submit"]'
    ];
    
    private readonly errorMessageSelector = '[role="alert"]';

    constructor(page: Page) {
        super(page);
    }

    /**
     * Encuentra el primer selector que existe en la página
     */
    private async findSelector(selectors: string[]): Promise<string | null> {
        for (const selector of selectors) {
            try {
                const element = await this.page.$(selector);
                if (element) {
                    return selector;
                }
            } catch (e) {
                // Continuar con el siguiente selector
            }
        }
        return null;
    }

    /**
     * Navega a la página de login de BAL
     */
    async navigateToLogin(): Promise<void> {
        const baseUrl = process.env.BAL_BASE_URL || 'https://grupobalstage.prod.acquia-sites.com/ingresar';
        await this.page.goto(baseUrl);
        await this.page.waitForLoadState('domcontentloaded');
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    /**
     * Ingresa el email
     */
    async enterEmail(email: string): Promise<void> {
        const selector = await this.findSelector(this.emailInputSelectors);
        if (!selector) {
            throw new Error('❌ No se encontró el campo de email');
        }
        await this.page.fill(selector, email);
        
        // Disparar eventos para que Drupal/JS reconozca el cambio
        await this.page.evaluate((sel) => {
            const el = document.querySelector(sel);
            if (el) {
                el.dispatchEvent(new Event('change', { bubbles: true }));
                el.dispatchEvent(new Event('input', { bubbles: true }));
                el.dispatchEvent(new Event('blur', { bubbles: true }));
            }
        }, selector);
        
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    /**
     * Ingresa la contraseña
     */
    async enterPassword(password: string): Promise<void> {
        const selector = await this.findSelector(this.passwordInputSelectors);
        if (!selector) {
            throw new Error('❌ No se encontró el campo de contraseña');
        }
        await this.page.fill(selector, password);
        
        // Disparar eventos para que Drupal/JS reconozca el cambio
        await this.page.evaluate((sel) => {
            const el = document.querySelector(sel);
            if (el) {
                el.dispatchEvent(new Event('change', { bubbles: true }));
                el.dispatchEvent(new Event('input', { bubbles: true }));
                el.dispatchEvent(new Event('blur', { bubbles: true }));
            }
        }, selector);
        
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    /**
     * Hace clic en el botón de login
     */
    async clickLoginButton(): Promise<void> {
        const selector = await this.findSelector(this.loginButtonSelectors);
        if (!selector) {
            throw new Error('❌ No se encontró el botón de login');
        }
        console.log(`✅ Haciendo clic en selector: ${selector}`);
        
        // Esperar a que esté visible
        await this.page.waitForSelector(selector, { state: 'visible' });
        
        // Forzar el click
        await this.page.click(selector, { force: true, delay: 100 });
        
        // Esperar menos tiempo - solo 2 segundos para la redirección
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    /**
     * Realiza el flujo completo de login
     */
    async login(email: string, password: string): Promise<void> {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    /**
     * Valida que el login fue exitoso
     */
    async validateSuccessfulLogin(): Promise<void> {
        // Esperar brevemente para que la navegación se complete
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const currentUrl = this.page.url();
        console.log(`📍 URL actual después de login: ${currentUrl}`);
        
        // Validar que NO estamos en la página de ingresar
        if (currentUrl.includes('ingresar')) {
            throw new Error('❌ La redirección falló - aún en página de login');
        }
        
        console.log('✅ Login exitoso - redirección confirmada');
    }

    /**
     * Verifica si hay mensaje de error
     */
    async hasErrorMessage(): Promise<boolean> {
        try {
            await this.page.waitForSelector(this.errorMessageSelector, { timeout: 3000 });
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Obtiene el texto del mensaje de error
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
            const emailSelector = await this.findSelector(this.emailInputSelectors);
            const passwordSelector = await this.findSelector(this.passwordInputSelectors);
            return emailSelector !== null && passwordSelector !== null;
        } catch {
            return false;
        }
    }

    /**
     * Captura una screenshot
     */
    async captureStepScreenshot(stepName: string, screenshotDir: string): Promise<string> {
        createScreenshotDir(screenshotDir);
        const screenshotPath = `${screenshotDir}/${stepName}.png`;
        await this.page.screenshot({ path: screenshotPath, fullPage: true });
        return screenshotPath;
    }
}


