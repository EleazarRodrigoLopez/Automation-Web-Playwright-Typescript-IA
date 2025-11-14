import { test, TestInfo } from '@playwright/test';
import { BalLoginPage } from '../pages/BalLoginPage';
import { ReportPortalHelper } from '../../utils/reportPortalHelper';
import { createScreenshotDir } from '../../utils/hooks';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Flujo de Perfil BAL - Modo UI', () => {
  let loginPage: BalLoginPage;
  const screenshotDir = 'screenshots/ui/bal-profile';

  test.beforeEach(async ({ page }) => {
    loginPage = new BalLoginPage(page);
    createScreenshotDir(screenshotDir);
  });

  test('Acceder a la página de perfil después del login', async ({ page }, testInfo: TestInfo) => {
    const email = process.env.BAL_TEST_EMAIL || 'testing_bside@bal.com.mx';
    const password = process.env.BAL_TEST_PASSWORD || 'Bside123456*';

    try {
      // Paso 1: Login
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Iniciando flujo de perfil - Login');
      await loginPage.navigateToLogin();
      await loginPage.enterEmail(email);
      await loginPage.enterPassword(password);
      await loginPage.clickLoginButton();
      await loginPage.validateSuccessfulLogin();
      
      const step1Screenshot = await loginPage.captureStepScreenshot('bal-profile-step1-login-success', screenshotDir);
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Login exitoso', step1Screenshot);

      // Paso 2: Navegar a perfil buscando el ícono/botón de usuario
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Navegando a perfil');
      await page.waitForTimeout(1500);
      
      // Buscar el botón de usuario (está en la esquina superior derecha con iniciales del usuario)
      const profileSelectors = [
        'button[aria-label*="usuario" i]',
        'button[aria-label*="user" i]',
        '.user-profile-button',
        '[data-test="user-profile"]',
        'button:has-text(":not(empty)")' // Botón azul con iniciales
      ];
      
      let profileButton = null;
      for (const selector of profileSelectors) {
        const element = page.locator(selector).first();
        const count = await element.count();
        if (count > 0) {
          profileButton = element;
          break;
        }
      }
      
      // Si no encontramos por selectores, buscar el último botón de la navegación (suele ser el de usuario)
      if (!profileButton) {
        const allButtons = page.locator('nav button, header button').last();
        const allCount = await allButtons.count();
        if (allCount > 0) {
          profileButton = allButtons;
        }
      }
      
      if (!profileButton) {
        throw new Error('❌ No se encontró el botón de perfil/usuario');
      }
      
      await profileButton.click();
      await page.waitForTimeout(2000);
      
      // Paso 3: Validar que realmente llegamos a perfil
      // Buscar elementos característicos de la página de perfil
      const hasProfileElements = 
        await page.locator('text=Perfil').count() > 0 ||
        await page.locator('text=Mi Perfil').count() > 0 ||
        await page.locator('text=Cambiar contraseña').count() > 0 ||
        await page.locator('text=Cerrar sesión').count() > 0;
      
      if (!hasProfileElements) {
        throw new Error('❌ No se encontraron elementos característicos de la página de perfil');
      }
      
      console.log('✅ Validaciones de perfil exitosas');
      
      const step2Screenshot = await loginPage.captureStepScreenshot('bal-profile-step2-profile-page', screenshotDir);
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Página de perfil validada correctamente', step2Screenshot);

      await ReportPortalHelper.sendLog(testInfo, 'INFO', '✅ Test completado - Realmente en perfil');

    } catch (error) {
      const errorScreenshot = await loginPage.captureStepScreenshot('bal-profile-error', screenshotDir);
      await ReportPortalHelper.sendLog(testInfo, 'ERROR', `❌ Error: ${error}`, errorScreenshot);
      throw error;
    }
  });
});
