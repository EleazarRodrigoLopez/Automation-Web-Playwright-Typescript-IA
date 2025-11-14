import { TestInfo } from '@playwright/test';
import fs from 'fs';

/**
 * Helper para enviar logs a ReportPortal
 */
export class ReportPortalHelper {
  /**
   * Enviar un log a ReportPortal con una captura de pantalla adjunta
   * @param testInfo Información de la prueba
   * @param level Nivel del log (INFO, ERROR, WARN)
   * @param message Mensaje a registrar
   * @param screenshotPath Ruta a la captura de pantalla (opcional)
   */
  static async sendLog(testInfo: TestInfo, level: string, message: string, screenshotPath?: string): Promise<void> {
    // Log en consola
    console.log(`[${level}] ${message}`);
    
    // Si hay una ruta de captura de pantalla y el archivo existe
    if (screenshotPath && fs.existsSync(screenshotPath)) {
      // Intentar adjuntar la captura a TestInfo (que ReportPortal utilizará)
      try {
        const screenshotBuffer = fs.readFileSync(screenshotPath);
        await testInfo.attach(screenshotPath, {
          body: screenshotBuffer,
          contentType: 'image/png'
        });
        
        // Añadir mensaje a los logs (ReportPortal capturará esto a través del reporter)
        console.log(`[RP] [${level}] ${message} - Screenshot: ${screenshotPath}`);
      } catch (error) {
        console.error(`Error al adjuntar captura ${screenshotPath}:`, error);
      }
    } else {
      // Solo añadir mensaje a los logs
      console.log(`[RP] [${level}] ${message}`);
    }
  }
} 