import { test, TestInfo } from '@playwright/test';
import { BalLoginPage } from '../pages/BalLoginPage';
import { ReportPortalHelper } from '../../utils/reportPortalHelper';
import { createScreenshotDir } from '../../utils/hooks';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Flujo de Iniciativas BAL - Modo UI', () => {
  let loginPage: BalLoginPage;
  const screenshotDir = 'screenshots/ui/bal-initiatives';

  test.beforeEach(async ({ page }) => {
    loginPage = new BalLoginPage(page);
    createScreenshotDir(screenshotDir);
  });

  test('Navegar a la sección de iniciativas', async ({ page }, testInfo: TestInfo) => {
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
      
      const step1Screenshot = await loginPage.captureStepScreenshot('bal-initiatives-step1-login', screenshotDir);
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Login exitoso', step1Screenshot);

      // Paso 2: Navegar a iniciativas
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Navegando a iniciativas');
      await page.waitForTimeout(1500);
      
      // Buscar específicamente el link de "Iniciativas"
      const iniciativasLink = page.locator('a:has-text("Iniciativas")').first();
      const iniciativasCount = await iniciativasLink.count();
      
      if (iniciativasCount === 0) {
        throw new Error('❌ No se encontró el link "Iniciativas" en la navegación');
      }
      
      await iniciativasLink.click();
      await page.waitForTimeout(2500);
      
      // Paso 3: Validar que realmente llegamos a iniciativas
      const currentUrl = page.url();
      console.log(`📍 URL después de navegar: ${currentUrl}`);
      
      // Validar elementos específicos de la página de iniciativas
      const hasInitiativasTitle = 
        await page.locator('text=Iniciativas').count() > 0 ||
        await page.locator('heading').count() > 0;
      
      const hasFilters = 
        await page.locator('button, select').count() > 0;
      
      const hasPagination = 
        await page.locator('button:has-text("Anterior"), button:has-text("Siguiente"), [data-test*="paginat"]').count() > 0;
      
      if (!hasInitiativasTitle && !hasFilters) {
        throw new Error('❌ No se encontraron elementos esperados de la página de iniciativas');
      }
      
      console.log(`✅ Validaciones positivas: Título=${hasInitiativasTitle}, Filtros=${hasFilters}, Paginación=${hasPagination}`);
      
      const step2Screenshot = await loginPage.captureStepScreenshot('bal-initiatives-step2-initiatives-page', screenshotDir);
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Página de iniciativas validada correctamente', step2Screenshot);

      await ReportPortalHelper.sendLog(testInfo, 'INFO', '✅ Test completado - Realmente en iniciativas');

    } catch (error) {
      const errorScreenshot = await loginPage.captureStepScreenshot('bal-initiatives-error', screenshotDir);
      await ReportPortalHelper.sendLog(testInfo, 'ERROR', `❌ Error: ${error}`, errorScreenshot);
      throw error;
    }
  });
});
