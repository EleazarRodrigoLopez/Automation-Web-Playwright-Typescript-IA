import { test, TestInfo } from '@playwright/test';
import { BalLoginPage } from '../pages/BalLoginPage';
import { ReportPortalHelper } from '../../utils/reportPortalHelper';
import { createScreenshotDir } from '../../utils/hooks';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Flujo de Comunidad BAL - Modo UI', () => {
  let loginPage: BalLoginPage;
  const screenshotDir = 'screenshots/ui/bal-community';

  test.beforeEach(async ({ page }) => {
    loginPage = new BalLoginPage(page);
    createScreenshotDir(screenshotDir);
  });

  test('Navegar a la sección de comunidad', async ({ page }, testInfo: TestInfo) => {
    const email = process.env.BAL_TEST_EMAIL || 'testing_bside@bal.com.mx';
    const password = process.env.BAL_TEST_PASSWORD || 'Bside123456*';

    try {
      // Paso 1: Login
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Login inicial');
      await loginPage.navigateToLogin();
      await loginPage.enterEmail(email);
      await loginPage.enterPassword(password);
      await loginPage.clickLoginButton();
      await loginPage.validateSuccessfulLogin();
      
      const step1Screenshot = await loginPage.captureStepScreenshot('bal-community-step1-login', screenshotDir);
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Login exitoso', step1Screenshot);

      // Paso 2: Navegar a comunidad
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Navegando a comunidad');
      await page.waitForTimeout(1500);
      
      // Buscar específicamente el link de "Comunidad Baleña"
      const comunidadLink = page.locator('a:has-text("Comunidad"), button:has-text("Comunidad")').first();
      const comunidadCount = await comunidadLink.count();
      
      if (comunidadCount === 0) {
        throw new Error('❌ No se encontró el link "Comunidad" en la navegación');
      }
      
      await comunidadLink.click();
      await page.waitForTimeout(2500);
      
      // Paso 3: Validar que realmente llegamos a la sección de comunidad
      const currentUrl = page.url();
      console.log(`📍 URL después de navegar: ${currentUrl}`);
      
      // Validar elementos específicos de la página de comunidad
      const hasComunidadTitle = 
        await page.locator('text=Comunidad').count() > 0 ||
        await page.locator('heading').count() > 0;
      
      const hasBenefits = 
        await page.locator('text=Beneficio, text=Promoción, [data-test*="benefit"], [data-test*="promotion"]').count() > 0;
      
      const hasContent = 
        await page.locator('article, .benefit-item, .promotion, [data-test*="community"]').count() > 0 ||
        await page.locator('img').count() > 2; // Esperar imágenes de beneficios/promociones
      
      if (!hasComunidadTitle && !hasBenefits && !hasContent) {
        throw new Error('❌ No se encontraron elementos esperados de la página de comunidad');
      }
      
      console.log(`✅ Validaciones positivas: Título=${hasComunidadTitle}, Beneficios=${hasBenefits}, Contenido=${hasContent}`);
      
      const step2Screenshot = await loginPage.captureStepScreenshot('bal-community-step2-community-page', screenshotDir);
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Página de comunidad validada correctamente', step2Screenshot);

      await ReportPortalHelper.sendLog(testInfo, 'INFO', '✅ Test completado - Realmente en comunidad');

    } catch (error) {
      const errorScreenshot = await loginPage.captureStepScreenshot('bal-community-error', screenshotDir);
      await ReportPortalHelper.sendLog(testInfo, 'ERROR', `❌ Error: ${error}`, errorScreenshot);
      throw error;
    }
  });
});
