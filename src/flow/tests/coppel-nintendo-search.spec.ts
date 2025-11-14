import { test, expect, TestInfo } from '@playwright/test';
import { ReportPortalHelper } from '../../utils/reportPortalHelper';
import { createScreenshotDir } from '../../utils/hooks';
import { CoppelHomePage } from '../pages/CoppelHomePage';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

test.describe('Flujo de Búsqueda en Coppel - Consolas Nintendo Switch', () => {
  const screenshotDir = 'screenshots/ui/coppel-nintendo-search';

  test.beforeEach(async () => {
    // Crear directorio de screenshots si no existe
    createScreenshotDir(screenshotDir);
  });

  test('Buscar "consolas nintendo switch" en Coppel y validar resultados', async ({ page }, testInfo: TestInfo) => {
    const coppelHomePage = new CoppelHomePage(page);
    const searchTerm = 'consolas nintendo switch';

    try {
      // Paso 1: Navegar a Coppel.com
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Iniciando navegación a Coppel.com');
      await coppelHomePage.navigateToCoppel();
      const step1Screenshot = await coppelHomePage.captureStepScreenshot('coppel-nintendo-search-step1-navegacion', screenshotDir);
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Navegación a Coppel.com completada', {
        name: 'coppel-nintendo-search-step1-navegacion.png',
        type: 'image/png',
        content: step1Screenshot,
      });

      // Paso 2: Buscar "consolas nintendo switch"
      await ReportPortalHelper.sendLog(testInfo, 'INFO', `Buscando "${searchTerm}"`);
      await coppelHomePage.searchForProduct(searchTerm);
      const step2Screenshot = await coppelHomePage.captureStepScreenshot('coppel-nintendo-search-step2-busqueda', screenshotDir);
      await ReportPortalHelper.sendLog(testInfo, 'INFO', `Búsqueda de "${searchTerm}" realizada`, {
        name: 'coppel-nintendo-search-step2-busqueda.png',
        type: 'image/png',
        content: step2Screenshot,
      });

      // Paso 3: Validar que aparecen consolas nintendo switch en los resultados
      await ReportPortalHelper.sendLog(testInfo, 'INFO', `Validando que los resultados contienen "${searchTerm}"`);
      await coppelHomePage.validateSearchResultsContain('nintendo switch'); // Validar por una parte del término
      const step3Screenshot = await coppelHomePage.captureStepScreenshot('coppel-nintendo-search-step3-validacion-resultados', screenshotDir);
      await ReportPortalHelper.sendLog(testInfo, 'INFO', 'Resultados validados exitosamente', {
        name: 'coppel-nintendo-search-step3-validacion-resultados.png',
        type: 'image/png',
        content: step3Screenshot,
      });

      await ReportPortalHelper.sendLog(testInfo, 'INFO', '✅ Test de búsqueda de "consolas nintendo switch" en Coppel completado exitosamente');

    } catch (error) {
      const errorScreenshot = await coppelHomePage.captureStepScreenshot('coppel-nintendo-search-error', screenshotDir);
      await ReportPortalHelper.sendLog(testInfo, 'ERROR', `❌ Error en test de búsqueda en Coppel: ${error}`, {
        name: 'coppel-nintendo-search-error.png',
        type: 'image/png',
        content: errorScreenshot,
      });
      throw error;
    }
  });
});
