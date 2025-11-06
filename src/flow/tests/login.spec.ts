import { test, expect, TestInfo } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ReportPortalHelper } from '../../utils/reportPortalHelper';
import { createScreenshotDir } from '../../utils/hooks';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

test.describe('Flujo de Login - Modo UI', () => {
  let loginPage: LoginPage;
  const screenshotDir = 'screenshots/ui/login';

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    
    // Crear directorio de screenshots si no existe
    createScreenshotDir(screenshotDir);
  });

  test('Login con credenciales válidas', async ({ page }, testInfo: TestInfo) => {
    // Obtener credenciales de variables de entorno con valores por defecto
    const username = process.env.TEST_USERNAME || 'standard_user';
    const password = process.env.TEST_PASSWORD || 'secret_sauce';

    try {
      // Paso 1: Navegar a la página de login
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Iniciando navegación a la página de login');
      await loginPage.navigateToLogin();
      const step1Screenshot = await loginPage.captureStepScreenshot('login-step1-navegacion', screenshotDir);
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Navegación a página de login completada', step1Screenshot);

      // Verificar que estamos en la página de login
      const isOnLoginPage = await loginPage.isOnLoginPage();
      expect(isOnLoginPage).toBeTruthy();

      // Paso 2: Ingresar usuario
      await ReportPortalHelper.sendLog(testInfo, 'INFO', `Ingresando usuario: ${username}`);
      await loginPage.enterUsername(username);
      const step2Screenshot = await loginPage.captureStepScreenshot('login-step2-usuario', screenshotDir);
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Usuario ingresado correctamente', step2Screenshot);

      // Paso 3: Ingresar contraseña
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Ingresando contraseña');
      await loginPage.enterPassword(password);
      const step3Screenshot = await loginPage.captureStepScreenshot('login-step3-password', screenshotDir);
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Contraseña ingresada correctamente', step3Screenshot);

      // Paso 4: Hacer clic en el botón de login
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Haciendo clic en el botón de login');
      await loginPage.clickLoginButton();
      const step4Screenshot = await loginPage.captureStepScreenshot('login-step4-click-login', screenshotDir);
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Clic en botón de login realizado', step4Screenshot);

      // Paso 5: Validar redirección al inventario
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Validando redirección al inventario');
      await loginPage.validateSuccessfulLogin();
      const step5Screenshot = await loginPage.captureStepScreenshot('login-step5-inventario', screenshotDir);
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Login exitoso - Usuario redirigido al inventario', step5Screenshot);

      // Paso 6: Validar elementos del inventario (validación adicional)
      await expect(page.locator('.inventory_list')).toBeVisible();
      const inventoryItems = page.locator('.inventory_item');
      const itemCount = await inventoryItems.count();
      expect(itemCount).toBe(6); // SauceDemo tiene 6 productos
      const step6Screenshot = await loginPage.captureStepScreenshot('login-step6-validacion-inventario', screenshotDir);
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Validación de elementos del inventario completada', step6Screenshot);

      await ReportPortalHelper.sendLog(testInfo, 'INFO', '✅ Test de login con credenciales válidas completado exitosamente');

    } catch (error) {
      const errorScreenshot = await loginPage.captureStepScreenshot('login-error', screenshotDir);
      await ReportPortalHelper.sendLog(testInfo, 'ERROR', `❌ Error en test de login: ${error}`, errorScreenshot);
      throw error;
    }
  });

  test('Login con credenciales inválidas', async ({ page }, testInfo: TestInfo) => {
    try {
      // Paso 1: Navegar a la página de login
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Iniciando test con credenciales inválidas');
      await loginPage.navigateToLogin();
      const step1Screenshot = await loginPage.captureStepScreenshot('login-invalid-step1-navegacion', screenshotDir);
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Navegación a página de login completada', step1Screenshot);

      // Paso 2: Intentar login con credenciales inválidas
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Intentando login con credenciales inválidas');
      await loginPage.login('usuario_invalido', 'password_invalido');
      const step2Screenshot = await loginPage.captureStepScreenshot('login-invalid-step2-intento', screenshotDir);
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Intento de login con credenciales inválidas realizado', step2Screenshot);

      // Paso 3: Validar mensaje de error
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Validando mensaje de error');
      await loginPage.validateErrorMessage();
      const errorMessage = await loginPage.getErrorMessageText();
      expect(errorMessage).toContain('Epic sadface');
      const step3Screenshot = await loginPage.captureStepScreenshot('login-invalid-step3-error', screenshotDir);
      await ReportPortalHelper.sendLog(testInfo, 'INFO', `Mensaje de error validado: ${errorMessage}`, step3Screenshot);

      await ReportPortalHelper.sendLog(testInfo, 'INFO', '✅ Test de login con credenciales inválidas completado exitosamente');

    } catch (error) {
      const errorScreenshot = await loginPage.captureStepScreenshot('login-invalid-error', screenshotDir);
      await ReportPortalHelper.sendLog(testInfo, 'ERROR', `❌ Error en test de login inválido: ${error}`, errorScreenshot);
      throw error;
    }
  });
});
