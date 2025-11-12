import { test, expect, TestInfo } from '@playwright/test';
import { GrupoBalLoginPage } from '../pages/GrupoBalLoginPage';
import { ReportPortalHelper } from '../../utils/reportPortalHelper';
import { createScreenshotDir } from '../../utils/hooks';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

test.describe('Flujo de Login Grupo BAL - Modo UI', () => {
  let loginPage: GrupoBalLoginPage;
  const screenshotDir = 'screenshots/ui/grupo-bal-login';

  test.beforeEach(async ({ page }) => {
    loginPage = new GrupoBalLoginPage(page);
    
    // Create screenshot directory if it doesn't exist
    createScreenshotDir(screenshotDir);
  });

  test('Validar carga de pagina', async ({ page }, testInfo: TestInfo) => {
    try {
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Iniciando navegación a la página de login de Grupo BAL');
      await loginPage.navigateToLogin();
      const step1Screenshot = await loginPage.captureStepScreenshot('bal-step1-navegacion', screenshotDir);
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Navegación a página de login completada', step1Screenshot);

      // Verify that we are on the login page by checking for a key element
      const isOnLoginPage = await loginPage.isOnLoginPage();
      expect(isOnLoginPage).toBeTruthy();
      await ReportPortalHelper.sendLog(testInfo, 'INFO', '✅ Carga de página validada correctamente.');

    } catch (error) {
      const errorScreenshot = await loginPage.captureStepScreenshot('bal-load-error', screenshotDir);
      await ReportPortalHelper.sendLog(testInfo, 'ERROR', `❌ Error en la validación de carga de página: ${error}`, errorScreenshot);
      throw error;
    }
  });

  test('Login con credenciales válidas', async ({ page }, testInfo: TestInfo) => {
    // IMPORTANT: Set GRUPOBAL_USERNAME and GRUPOBAL_PASSWORD in your .env file
    const username = process.env.GRUPOBAL_USERNAME || 'user';
    const password = process.env.GRUPOBAL_PASSWORD || 'password';

    try {
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Iniciando test con credenciales válidas');
      await loginPage.navigateToLogin();
      
      await ReportPortalHelper.sendLog(testInfo, 'INFO', `Ingresando usuario: ${username}`);
      await loginPage.enterUsername(username);

      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Ingresando contraseña');
      await loginPage.enterPassword(password);

      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Haciendo clic en el botón de login');
      await loginPage.clickLoginButton();
      
      // This step will likely fail until you provide the correct URL to wait for
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Validando redirección post-login');
      await loginPage.validateSuccessfulLogin();
      const step5Screenshot = await loginPage.captureStepScreenshot('bal-login-step5-dashboard', screenshotDir);
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Login exitoso - Usuario redirigido al dashboard', step5Screenshot);

      await ReportPortalHelper.sendLog(testInfo, 'INFO', '✅ Test de login con credenciales válidas completado exitosamente');

    } catch (error) {
      const errorScreenshot = await loginPage.captureStepScreenshot('bal-login-error', screenshotDir);
      await ReportPortalHelper.sendLog(testInfo, 'ERROR', `❌ Error en test de login válido: ${error}`, errorScreenshot);
      throw error;
    }
  });

  test('Login con credenciales inválidas', async ({ page }, testInfo: TestInfo) => {
    try {
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Iniciando test con credenciales inválidas');
      await loginPage.navigateToLogin();

      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Intentando login con credenciales inválidas');
      await loginPage.login('usuario_invalido', 'password_invalido');
      const step2Screenshot = await loginPage.captureStepScreenshot('bal-login-invalid-step2-intento', screenshotDir);
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Intento de login con credenciales inválidas realizado', step2Screenshot);

      // This step will likely fail until you provide the correct selector for the error message
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Validando mensaje de error');
      await loginPage.validateErrorMessage();
      const errorMessage = await loginPage.getErrorMessageText();
      // TODO: Update with the expected error message text
      expect(errorMessage).toContain('mensaje de error esperado'); 
      const step3Screenshot = await loginPage.captureStepScreenshot('bal-login-invalid-step3-error', screenshotDir);
      await ReportPortalHelper.sendLog(testInfo, 'INFO', `Mensaje de error validado: ${errorMessage}`, step3Screenshot);

      await ReportPortalHelper.sendLog(testInfo, 'INFO', '✅ Test de login con credenciales inválidas completado exitosamente');

    } catch (error) {
      const errorScreenshot = await loginPage.captureStepScreenshot('bal-login-invalid-error', screenshotDir);
      await ReportPortalHelper.sendLog(testInfo, 'ERROR', `❌ Error en test de login inválido: ${error}`, errorScreenshot);
      throw error;
    }
  });
});
