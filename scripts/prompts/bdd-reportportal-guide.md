# Guía para integrar capturas de pantalla en pruebas BDD con ReportPortal

Este documento explica cómo integrar correctamente las capturas de pantalla de Playwright en pruebas BDD (Cucumber) para que aparezcan en ReportPortal.

## Arquitectura de la solución

1. **BDDReportHelper**: Clase helper que gestiona el envío de logs y capturas a ReportPortal
2. **Configuración ReportPortal**: Ajustes en `reportportal.bdd.config.json`
3. **Implementación en pasos BDD**: Patrón para capturar y enviar imágenes

## Código del helper

El archivo `src/utils/bddReportHelper.ts` contiene la lógica para:
- Convertir capturas a formato Base64
- Adjuntar capturas al contexto de Cucumber (World)
- Formatear logs para que ReportPortal los reconozca

```typescript
import * as fs from 'fs';
import { World } from '@cucumber/cucumber';

export class BDDReportHelper {
  static async sendLog(world: World, level: string, message: string, screenshotPath?: string): Promise<void> {
    // Log en consola
    console.log(`[${level}] ${message}`);
    
    try {
      // Si hay una ruta y el archivo existe
      if (screenshotPath && fs.existsSync(screenshotPath)) {
        // Convertir imagen a Base64
        const screenshotBuffer = fs.readFileSync(screenshotPath);
        const base64Image = screenshotBuffer.toString('base64');
        
        // Log con formato que ReportPortal puede detectar
        console.log(`[RP] [${level}] ${message} - Screenshot: ${screenshotPath}`);
        
        // Si world tiene acceso a ReportPortal, adjuntar directamente
        if (world.attach) {
          await world.attach(base64Image, 'image/png');
        }
      } else {
        console.log(`[RP] [${level}] ${message}`);
      }
    } catch (error) {
      console.error(`Error al procesar log para ReportPortal: ${error}`);
    }
  }
}
```

## Configuración de ReportPortal

Asegúrate que en `reportportal.bdd.config.json` esté configurado para tomar capturas siempre:

```json
{
  "takeScreenshot": "always",
  ...
}
```

## Patrón de implementación en pasos BDD

Para cada paso de Cucumber, sigue este patrón:

```typescript
Then('descripción del paso', async function(this: ICustomWorld) {
  if (this.page) {
    // Lógica del paso...
    
    // Tomar y guardar captura
    const screenshotPath = 'screenshots/bdd/carpeta/nombre-paso.png';
    await this.page.screenshot({ path: screenshotPath });
    
    // Enviar a ReportPortal
    await BDDReportHelper.sendLog(this, 'INFO', 'Mensaje descriptivo', screenshotPath);
  }
});
```

## Comandos importantes

- **Ejecutar pruebas BDD con ReportPortal**: `npm run test:bdd`
- **Ejecutar pruebas BDD sin ReportPortal**: `npm run test:bdd:simple` o `node run-login-bdd.js`

---

Con estos ajustes, las capturas aparecerán correctamente en la interfaz de ReportPortal y mejorarán significativamente la calidad de los reportes. 