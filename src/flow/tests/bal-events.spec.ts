import { test, TestInfo } from '@playwright/test';
import { BalLoginPage } from '../pages/BalLoginPage';
import { ReportPortalHelper } from '../../utils/reportPortalHelper';
import { createScreenshotDir } from '../../utils/hooks';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Flujo de Eventos BAL - Modo UI', () => {
  let loginPage: BalLoginPage;
  const screenshotDir = 'screenshots/ui/bal-events';

  test.beforeEach(async ({ page }) => {
    loginPage = new BalLoginPage(page);
    createScreenshotDir(screenshotDir);
  });

  test('Navegar a la sección de eventos', async ({ page }, testInfo: TestInfo) => {
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
      
      const step1Screenshot = await loginPage.captureStepScreenshot('bal-events-step1-login', screenshotDir);
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Login exitoso', step1Screenshot);

      // Paso 2: Navegar a eventos
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Navegando a eventos');
      await page.waitForTimeout(1500);
      
      // Buscar específicamente el link de "Eventos" en la navegación principal
      const eventosLink = page.locator('a:has-text("Eventos")').first();
      const eventosCount = await eventosLink.count();
      
      if (eventosCount === 0) {
        throw new Error('❌ No se encontró el link "Eventos" en la navegación');
      }
      
      await eventosLink.click();
      await page.waitForTimeout(2500);
      
      // Paso 3: Validar que realmente llegamos a la sección de eventos
      const currentUrl = page.url();
      console.log(`📍 URL después de navegar: ${currentUrl}`);
      
      // Validar elementos específicos de la página de eventos
      const hasCalendarioTitle = await page.locator('text=Calendario de Eventos').count() > 0;
      const hasTimeSlots = await page.locator('text=m.').count() > 5; // Busca horarios (08:00 a. m., etc)
      const hasCalendarNav = await page.locator('button:has-text("¿Qué hay esta semana?")').count() > 0;
      
      if (!hasCalendarioTitle && !hasTimeSlots && !hasCalendarNav) {
        throw new Error('❌ No se encontraron elementos esperados de la página de eventos');
      }
      
      console.log(`✅ Validaciones positivas: Título=${hasCalendarioTitle}, Horarios=${hasTimeSlots}, Nav=${hasCalendarNav}`);
      
      const step2Screenshot = await loginPage.captureStepScreenshot('bal-events-step2-events-page', screenshotDir);
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Página de eventos validada correctamente', step2Screenshot);

      await ReportPortalHelper.sendLog(testInfo, 'INFO', '✅ Test completado - Realmente en eventos');

    } catch (error) {
      const errorScreenshot = await loginPage.captureStepScreenshot('bal-events-error', screenshotDir);
      await ReportPortalHelper.sendLog(testInfo, 'ERROR', `❌ Error: ${error}`, errorScreenshot);
      throw error;
    }
  });
});
