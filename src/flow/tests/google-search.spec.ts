
import { test, expect, TestInfo } from '@playwright/test';
import { ReportPortalHelper } from '../../utils/reportPortalHelper';
import { createScreenshotDir } from '../../utils/hooks';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

test.describe('Flujo de Búsqueda en Google - Modo UI', () => {
  const screenshotDir = 'screenshots/ui/google-search';

  test.beforeEach(async ({ page }) => {
    // Crear directorio de screenshots si no existe
    createScreenshotDir(screenshotDir);
  });

  test('Búsqueda de "hola" en Google y validación de resultados', async ({ page }, testInfo: TestInfo) => {
    try {
      // Paso 1: Navegar a Google
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Iniciando navegación a Google');
      await page.goto('https://www.google.com');
      const step1Screenshot = await page.screenshot({ path: `${screenshotDir}/google-search-step1-navegacion.png` });
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Navegación a Google completada', {
        name: 'google-search-step1-navegacion.png',
        type: 'image/png',
        content: step1Screenshot,
      });

      // Verificar que estamos en la página de Google
      await expect(page).toHaveTitle(/Google/);

      // Paso 2: Escribir "hola" en el campo de búsqueda
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Escribiendo "hola" en el campo de búsqueda');
      await page.getByRole('combobox', { name: 'Buscar' }).fill('hola');
      const step2Screenshot = await page.screenshot({ path: `${screenshotDir}/google-search-step2-escribir-hola.png` });
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Texto "hola" escrito correctamente', {
        name: 'google-search-step2-escribir-hola.png',
        type: 'image/png',
        content: step2Screenshot,
      });

      // Paso 3: Presionar el botón de búsqueda
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Haciendo clic en el botón de búsqueda de Google');
      await page.getByRole('button', { name: 'Buscar con Google' }).first().click();
      const step3Screenshot = await page.screenshot({ path: `${screenshotDir}/google-search-step3-click-buscar.png` });
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Clic en botón de búsqueda realizado', {
        name: 'google-search-step3-click-buscar.png',
        type: 'image/png',
        content: step3Screenshot,
      });

      // Paso 4: Validar que se muestran resultados
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Validando que se muestren resultados de búsqueda');
      await page.waitForSelector('#search');
      const resultsContainer = page.locator('#search');
      await expect(resultsContainer).toBeVisible();
      const step4Screenshot = await page.screenshot({ path: `${screenshotDir}/google-search-step4-validacion-resultados.png` });
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Se han encontrado resultados de búsqueda', {
        name: 'google-search-step4-validacion-resultados.png',
        type: 'image/png',
        content: step4Screenshot,
      });

      await ReportPortalHelper.sendLog(testInfo, 'INFO', '✅ Test de búsqueda en Google completado exitosamente');

    } catch (error) {
      const errorScreenshot = await page.screenshot({ path: `${screenshotDir}/google-search-error.png` });
      await ReportPortalHelper.sendLog(testInfo, 'ERROR', `❌ Error en test de búsqueda en Google: ${error}`, {
        name: 'google-search-error.png',
        type: 'image/png',
        content: errorScreenshot,
      });
      throw error;
    }
  });
});
