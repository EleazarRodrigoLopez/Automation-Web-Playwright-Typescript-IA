import { test, expect, TestInfo } from '@playwright/test';
import { BalLoginPage } from '../pages/BalLoginPage';
import { ReportPortalHelper } from '../../utils/reportPortalHelper';
import { createScreenshotDir } from '../../utils/hooks';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Flujo de Login BAL - Modo UI', () => {
  let loginPage: BalLoginPage;
  const screenshotDir = 'screenshots/ui/bal-login';

  test.beforeEach(async ({ page }) => {
    loginPage = new BalLoginPage(page);
    createScreenshotDir(screenshotDir);
  });

  test('Login exitoso con credenciales válidas', async ({ page }, testInfo: TestInfo) => {
    const email = process.env.BAL_TEST_EMAIL || 'testing_bside@bal.com.mx';
    const password = process.env.BAL_TEST_PASSWORD || 'Bside123456*';

    try {
      // Paso 1: Navegar a página de login
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Iniciando navegación a BAL');
      await loginPage.navigateToLogin();
      const step1Screenshot = await loginPage.captureStepScreenshot('bal-login-step1-navegacion', screenshotDir);
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Navegación completada', step1Screenshot);

      // Validar que estamos en página de login
      const isOnLoginPage = await loginPage.isOnLoginPage();
      expect(isOnLoginPage).toBeTruthy();

      // Paso 2: Ingresar email
      await ReportPortalHelper.sendLog(testInfo, 'INFO', `Ingresando email: ${email}`);
      await loginPage.enterEmail(email);
      const step2Screenshot = await loginPage.captureStepScreenshot('bal-login-step2-email', screenshotDir);
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Email ingresado', step2Screenshot);

      // Paso 3: Ingresar contraseña
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Ingresando contraseña');
      await loginPage.enterPassword(password);
      const step3Screenshot = await loginPage.captureStepScreenshot('bal-login-step3-password', screenshotDir);
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Contraseña ingresada', step3Screenshot);

      // Paso 4: Hacer clic en login
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Haciendo clic en botón de login');
      await loginPage.clickLoginButton();
      const step4Screenshot = await loginPage.captureStepScreenshot('bal-login-step4-click', screenshotDir);
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Clic realizado', step4Screenshot);

      // Paso 5: Validar login exitoso
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Validando redirección post-login');
      await loginPage.validateSuccessfulLogin();
      
      // Capturar screenshot de la página de inicio
      try {
        const step5Screenshot = await loginPage.captureStepScreenshot('bal-login-step5-success', screenshotDir);
        await ReportPortalHelper.sendLog(testInfo, 'INFO', '✅ Login exitoso', step5Screenshot);
      } catch (error) {
        console.log('⚠️  No se pudo capturar screenshot final:', (error as any).message);
        await ReportPortalHelper.sendLog(testInfo, 'INFO', '✅ Login exitoso (screenshot no disponible)');
      }

    } catch (error) {
      const errorScreenshot = await loginPage.captureStepScreenshot('bal-login-error', screenshotDir);
      await ReportPortalHelper.sendLog(testInfo, 'ERROR', `❌ Error en login: ${error}`, errorScreenshot);
      throw error;
    }
  });
});
