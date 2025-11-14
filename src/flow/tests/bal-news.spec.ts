import { test, TestInfo } from '@playwright/test';
import { BalLoginPage } from '../pages/BalLoginPage';
import { ReportPortalHelper } from '../../utils/reportPortalHelper';
import { createScreenshotDir } from '../../utils/hooks';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Flujo de Noticias BAL - Modo UI', () => {
  let loginPage: BalLoginPage;
  const screenshotDir = 'screenshots/ui/bal-news';

  test.beforeEach(async ({ page }) => {
    loginPage = new BalLoginPage(page);
    createScreenshotDir(screenshotDir);
  });

  test('Navegar a la sección de noticias', async ({ page }, testInfo: TestInfo) => {
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
      
      const step1Screenshot = await loginPage.captureStepScreenshot('bal-news-step1-login', screenshotDir);
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Login exitoso', step1Screenshot);

      // Paso 2: Navegar a noticias
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Navegando a noticias');
      await page.waitForTimeout(1500);
      
      // Buscar específicamente el link de "Noticias"
      const noticiasLink = page.locator('a:has-text("Noticias")').first();
      const noticiasCount = await noticiasLink.count();
      
      if (noticiasCount === 0) {
        throw new Error('❌ No se encontró el link "Noticias" en la navegación');
      }
      
      await noticiasLink.click();
      await page.waitForTimeout(2500);
      
      // Paso 3: Validar que realmente llegamos a la sección de noticias
      const currentUrl = page.url();
      console.log(`📍 URL después de navegar: ${currentUrl}`);
      
      // Validar elementos específicos de la página de noticias
      const hasNoticiasTitle = 
        await page.locator('text=Noticias').count() > 0 ||
        await page.locator('heading').count() > 0;
      
      const hasNewsList = 
        await page.locator('article, .news-item, .noticia').count() > 0 ||
        await page.locator('img').count() > 2; // Esperar imágenes de noticias
      
      const hasFilters = 
        await page.locator('button:has-text("Categoría"), button:has-text("Programa"), select, [data-test*="filter"]').count() > 0;
      
      if (!hasNoticiasTitle && !hasNewsList && !hasFilters) {
        throw new Error('❌ No se encontraron elementos esperados de la página de noticias');
      }
      
      console.log(`✅ Validaciones positivas: Título=${hasNoticiasTitle}, Noticias=${hasNewsList}, Filtros=${hasFilters}`);
      
      const step2Screenshot = await loginPage.captureStepScreenshot('bal-news-step2-news-page', screenshotDir);
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Página de noticias validada correctamente', step2Screenshot);

      await ReportPortalHelper.sendLog(testInfo, 'INFO', '✅ Test completado - Realmente en noticias');

    } catch (error) {
      const errorScreenshot = await loginPage.captureStepScreenshot('bal-news-error', screenshotDir);
      await ReportPortalHelper.sendLog(testInfo, 'ERROR', `❌ Error: ${error}`, errorScreenshot);
      throw error;
    }
  });
});
