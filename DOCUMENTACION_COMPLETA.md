# 📚 Documentación Completa - Playwright Hybrid Framework Refactorizado

## 🎯 Visión General del Proyecto

Este proyecto es un **Framework Híbrido de Automatización de Pruebas** que combina múltiples enfoques de testing:

- **Pruebas UI Tradicionales** con Playwright y TypeScript
- **Pruebas BDD (Behavior-Driven Development)** con Cucumber
- **Integración con Model Context Protocol (MCP)** para IA generativa
- **Integración con ReportPortal** para reportería avanzada
- **Self-healing capabilities** para mantenimiento automático de selectores
- **Generación automática de evidencias** (screenshots, videos, logs)

### 🤖 Concepto de IA Inteligente

El proyecto está diseñado para trabajar con IA generativa mediante MCP (Model Context Protocol), permitiendo:
- Generación automática de pruebas basada en prompts inteligentes
- Auto-reparación de selectores cuando cambia el DOM
- Análisis del DOM para sugerir mejores selectores
- Generación de code snippets optimizados

## 🏗️ Estructura Simplificada del Proyecto

```
playwright-hybrid-framework-refactored/
├── 📁 src/                           # Código fuente principal
│   ├── 📁 bdd/                       # Archivos BDD (Cucumber)
│   │   ├── 📁 steps/                 # Definiciones de pasos BDD
│   │   └── 📁 support/               # Archivos de soporte BDD
│   ├── 📁 flow/                      # Pruebas de flujo tradicionales
│   │   ├── 📁 pages/                 # Page Objects (POM)
│   │   ├── 📁 tests/                 # Pruebas UI en TypeScript
│   │   └── 📁 utils/                 # Utilidades específicas de flow
│   ├── 📁 utils/                     # Utilidades globales
│   ├── 📁 data/                      # Datos de prueba (Excel, JSON)
│   ├── 📁 db/                        # Pruebas de base de datos
│   └── 📁 types/                     # Declaraciones de tipos TypeScript
├── 📁 tests/                         # Directorio alternativo de pruebas
│   └── 📁 codegen/                   # Pruebas generadas automáticamente
├── 📁 mcp/                           # Model Context Protocol (IA)
│   ├── 📁 codegen/                   # Generación automática de código
│   ├── 📁 prompts/                   # Prompts específicos para IA
│   └── 📁 recordings/                # Grabaciones de sesiones
├── 📁 scripts/                       # Scripts de automatización
│   └── 📁 prompts/                   # Prompts adicionales
├── 📁 screenshots/                   # Capturas de pantalla
├── 📁 videos/                        # Videos de pruebas
├── 📁 logs/                          # Archivos de log
├── 📁 evidencias/                    # Evidencias generadas
├── 📁 test-results/                  # Resultados de pruebas
├── 📁 playwright-report/             # Reportes HTML de Playwright
├── 📁 types/                         # Tipos TypeScript globales
├── 📄 prompt-base-inteligente.txt    # PROMPT INTELIGENTE PRINCIPAL
├── 📄 package.json                   # Dependencias y scripts
├── 📄 playwright.config.ts           # Configuración principal
├── 📄 tsconfig.json                  # Configuración TypeScript
├── 📄 cucumber.js                    # Configuración Cucumber
├── 📄 reportportal.*.json            # Configuraciones ReportPortal
└── 📄 .env                           # Variables de entorno
```

## 🛠️ Tecnologías y Dependencias

### Core Framework
- **Playwright** `^1.40.1` - Framework de automatización web
- **TypeScript** `^5.3.2` - Lenguaje de programación tipado
- **Node.js** `^20.10.0` - Runtime de JavaScript

### BDD (Behavior-Driven Development)
- **Cucumber** `^10.0.1` - Framework BDD para JavaScript/TypeScript
- **Gherkin** - Lenguaje para escribir escenarios BDD

### Gestión de Datos
- **dotenv** `^16.3.1` - Gestión de variables de entorno
- **Excel Reader** - Lector personalizado de archivos Excel

### Reportería y Monitoring
- **ReportPortal** - Plataforma de reportería avanzada
- **HTML Reporter** - Reportes HTML nativos de Playwright
- **JSON Reporter** - Reportes en formato JSON

### Herramientas de Desarrollo
- **ts-node** `^10.9.1` - Ejecutor de TypeScript
- **Model Context Protocol (MCP)** - Protocolo para IA generativa

## 🧠 PROMPT INTELIGENTE PRINCIPAL

El archivo `prompt-base-inteligente.txt` contiene las instrucciones completas para la IA generativa:

### 📋 Reglas Principales

1. **Estructura del Proyecto**
   - Pruebas UI: `src/flow/tests/`
   - Pruebas BDD: `src/bdd/features/` y `src/bdd/steps/`
   - Page Objects: `src/flow/pages/`

2. **Reutilización de Componentes**
   - Revisar archivos existentes antes de crear nuevos
   - Reutilizar Page Objects, Step Definitions y funciones
   - Evitar duplicación de código

3. **Importación de Módulos**
   - Rutas absolutas para módulos entre directorios
   - Rutas relativas para archivos del mismo directorio
   - Verificación de tipos TypeScript

4. **Archivos de Declaración de Tipos**
   - Crear archivos `.d.ts` para utilidades reutilizables
   - Mantener consistencia entre declaraciones e implementaciones
   - Estructura en `src/types/` para compatibilidad

5. **Manejo de Errores TypeScript**
   - Resolver errores de módulos no encontrados
   - Crear declaraciones de tipos faltantes
   - Usar rutas absolutas consistentes
   - No ignorar errores con `@ts-ignore`

6. **Evidencias por Paso**
   - Captura de screenshot después de cada paso clave
   - Rutas específicas: `screenshots/ui/` y `screenshots/bdd/`
   - Nomenclatura: `{nombre-flujo}-stepX.png`

7. **Validaciones y Buenas Prácticas**
   - Usar siempre `expect()` para validaciones
   - Evitar `page.waitForTimeout()`
   - Aplicar patrón Page Object Model (POM)
   - Organizar BDD con Given/When/Then
   - Métodos en inglés, camelCase

8. **Estrategia de Ejecución**
   - Modo UI: generar solo `.spec.ts`
   - Modo BDD: generar `.feature` y `.steps.ts`
   - Si no se especifica: generar ambas versiones
   - Mantener separación clara entre modos

9. **Variables de Entorno**
   - Nunca usar valores hardcodeados
   - Usar `process.env` para URLs, usuarios, contraseñas
   - Asumir que `dotenv` está cargado
   - Generar `.env.example` si no existe `.env`

10. **Integración con ReportPortal**
    - Usar `testInfo` en cada test
    - Enviar logs con `reporter.sendLog()`
    - Adjuntar capturas y logs en pasos importantes
    - Configurar `takeScreenshot: "always"` para BDD

11. **Self-healing y Recuperación**
    - Buscar selectores alternativos si fallan
    - Logs claros en ReportPortal para fallos
    - Try/catch con mensajes descriptivos
    - Comentarios para pasos inestables

12. **Manejo de Errores y Comportamiento**
    - Crear archivos/carpetas automáticamente si no existen
    - Versiones incrementales para evitar sobrescritura
    - Alertas para problemas de conexión MCP
    - Pedir aclaración para prompts ambiguos

### 🎯 Ejemplos de Prompts Soportados

- "Flujo de login básico en modo UI con evidencia y reporte"
- "Agregar producto al carrito y validarlo en modo BDD"
- "Genera test de cierre de sesión reutilizando page object y steps existentes"
- "Validar redirección incorrecta con credenciales bloqueadas y captura de mensaje"

---

## 📋 PROMPT INTELIGENTE COMPLETO (214 líneas)

**Archivo:** `prompt-base-inteligente.txt`

### 🎯 Objetivo Principal
Eres parte de un sistema de automatización de pruebas que ya está conectado a un proyecto real mediante Model Context Protocol (MCP). Tu objetivo es generar, mantener y ajustar código de pruebas UI y BDD de forma inteligente.

### 📁 Estructura del Proyecto - Reglas de Organización

#### Ubicaciones Específicas:
- **Pruebas UI directas (Playwright):** `src/flow/tests/`
- **Pruebas BDD:**
  - Features: `src/bdd/features/`
  - Steps: `src/bdd/steps/`
- **Page Objects:** `src/flow/pages/`

### ♻️ Reutilización de Componentes - Principio DRY

#### Antes de crear cualquier archivo:
1. **Revisar si ya existe** un Page Object, Step Definition o archivo de prueba
2. **Reutilizar funciones existentes** (ej: login()) en lugar de reescribirlas
3. **Usar steps definidos** en archivos existentes antes de crear nuevos
4. **Crear variantes** con sufijo incremental o más específico si se requiere

### 🔄 Importación de Módulos - Estrategia de Paths

#### Rutas Absolutas (Entre Directorios):
```typescript
import { LoginPage } from '../../../src/flow/pages/LoginPage';
import { createScreenshotDir } from '../../../src/utils/hooks';
```

#### Rutas Relativas (Mismo Directorio):
```typescript
import { CustomWorld } from './world';
import { someFunction } from './helpers/utils';
```

#### Reglas:
- **Evitar rutas relativas** que suban múltiples niveles cuando sea posible
- **Verificar tipos** ejecutando verificación de TypeScript
- **Consistencia** en patrones de importación

### 📝 Archivos de Declaración de Tipos (.d.ts)

#### Para Utilidades Reutilizables:
```typescript
// Ejemplo para src/utils/hooks.ts crear src/utils/hooks.d.ts
import { Page } from '@playwright/test';

export function functionName(param: ParamType): ReturnType;
```

#### Estructura Dual:
- **Principal:** `src/utils/hooks.d.ts`
- **Compatibilidad:** `src/types/utils/hooks.d.ts`
- **Librerías externas:** `src/types/vendor/`

### ⚠️ Manejo de Errores de TypeScript

#### Errores "Cannot find module":
1. **Verificar** que el archivo existe en la ruta especificada
2. **Crear archivo .d.ts** si no existe
3. **Usar rutas absolutas** en lugar de relativas
4. **Consistencia** en patrones de importación

#### Errores de Compilación:
- **Compatibilidad de tipos** entre parámetros y retornos
- **Declaración correcta** de interfaces y types
- **Consistencia** en tipos genéricos
- **❌ NUNCA usar** `// @ts-ignore` o `any` - resolver adecuadamente

### 📸 Evidencias por Paso - Documentación Visual

#### Después de Cada Paso Clave:
- **Acciones:** click, fill, assert, goto, etc.
- **Ubicación UI:** `screenshots/ui/{nombre-flujo}/`
- **Ubicación BDD:** `screenshots/bdd/{nombre-flujo}/`
- **Nomenclatura:** `{nombre-flujo}-stepX.png` (ej: login-step2.png)

#### Implementación:
```typescript
await page.screenshot({ path: '...' });
// Asegurar que la carpeta existe antes
```

### 🧪 Validaciones y Buenas Prácticas

#### Validaciones:
- **Siempre usar** `expect(...)` para validar resultados
- **❌ NO usar** `page.waitForTimeout()`, preferir `await expect(...)` o `waitForSelector`

#### Patrones:
- **Pruebas UI:** Aplicar Page Object Model (POM)
- **Pruebas BDD:** Organizar con Given / When / Then
- **Nomenclatura:** Métodos en inglés, camelCase, empezar con verbo

#### Reutilización:
- **No repetir código**
- **Reutilizar funciones** y POM

### 🧠 Estrategia de Ejecución de Pruebas

#### Decisión por Prompt:
- **"modo UI" explícito:** Solo `.spec.ts`
- **"modo BDD" explícito:** Solo `.feature` y `.steps.ts`
- **Sin especificar + flujo genérico:** **AMBAS versiones**
- **❌ No mezclar** modos en el mismo archivo

### 🔐 Variables de Entorno (.env) - Configuración Dinámica

#### Uso Obligatorio:
```typescript
await page.goto(process.env.BASE_URL);
await page.fill('#user-name', process.env.TEST_USERNAME);
```

#### Reglas:
- **❌ Nunca hardcodear** URLs, usuarios, contraseñas
- **Asumir** que `dotenv` ya está cargado
- **Generar `.env.example`** con variables dummy si no existe `.env`

### 🧩 Integración con ReportPortal

#### Pruebas Tradicionales:
```typescript
await reporter.sendLog(testInfo, 'INFO', 'Descripción del paso', { name, type, content });
```

#### Parámetros Obligatorios:
- **testInfo** como parámetro en cada test
- **Adjuntar capturas** y logs en pasos importantes

### 📊 Integración BDD con ReportPortal

#### Configuración:
```json
// reportportal.bdd.config.json
{
  "takeScreenshot": "always"
}
```

#### Implementación en Steps:
```typescript
import { BDDReportHelper } from '../../../src/utils/bddReportHelper';

Then('descripción del paso', async function(this: ICustomWorld) {
  if (this.page) {
    // Lógica del paso...
    const screenshotPath = 'screenshots/bdd/carpeta/nombre-paso.png';
    await this.page.screenshot({ path: screenshotPath });
    await BDDReportHelper.sendLog(this, 'INFO', 'Mensaje descriptivo', screenshotPath);
  }
});
```

#### Valores por Defecto:
```typescript
const username = process.env.TEST_USERNAME || 'standard_user';
const password = process.env.TEST_PASSWORD || 'secret_sauce';
```

### 🛡️ Self-healing y Recuperación

#### Cuando un Selector Falla:
1. **Buscar alternativas:** texto visible, rol, `data-testid`
2. **Log en ReportPortal** con descripción del fallo
3. **Comentario en código** documentando el problema

#### Manejo de Errores:
```typescript
try {
  // lógica
} catch (error) {
  throw new Error("❌ No se encontró el selector '#login-button'. Verifica el DOM actualizado.");
}
```

#### Pasos Inestables:
```typescript
// ⚠️ Este paso podría necesitar actualización si el flujo cambió.
```

### 🚨 Manejo de Errores y Comportamiento Esperado

#### Archivos/Carpetas Faltantes:
- **Crear automáticamente** si no existen

#### Archivos Existentes:
- **❌ No sobrescribir**
- **Generar versión incremental:** `login-2.spec.ts`, `logout-alt.steps.ts`

#### Problemas de Conexión:
```
"⚠️ No se detectó la estructura del proyecto. Asegúrate que el servidor MCP filesystem esté corriendo."
```

#### Prompts Ambiguos:
```
"❓ ¿Deseas generar esta prueba en modo UI o modo BDD?"
```

### 🧠 Modo de Ejecución Automático

#### Decisión por Keyword:
- **"modo UI"** → `.spec.ts` con POM
- **"modo BDD"** → `.feature` + `.steps.ts`
- **Reutilización:** No duplicar lógica, reutilizar POM en ambos

### 📛 Convenciones de Nombres

#### Archivos:
- **Nombres:** kebab-case basados en el flujo
- **UI:** `src/flow/tests/{flujo}.spec.ts`
- **BDD Features:** `src/bdd/features/{flujo}.feature`
- **BDD Steps:** `src/bdd/steps/{flujo}.steps.ts`
- **Duplicados:** Sufijo incremental

#### Tests/Scenarios:
- **describe(), test(), Feature:** Nombres legibles, capitalizados, con espacios

### 🎯 Casos de Uso de Ejemplo

#### Ejemplo Completo del Prompt Base:
```
Flujo de login con credenciales válidas en modo UI.

Usar como URL base la definida en el archivo .env (BASE_URL).

Escenario:
- Ir a la página de login
- Ingresar el usuario definido en TEST_USERNAME
- Ingresar la contraseña definida en TEST_PASSWORD
- Hacer clic en el botón de login
- Validar que el usuario sea redirigido al inventario correctamente
- Capturar evidencia por paso y guardar video

Generar:
- El archivo src/flow/tests/login.spec.ts usando POM
- El Page Object src/flow/pages/LoginPage.ts si no existe
```

### 📚 Entendimiento de Prompts Esperados

#### Formatos Soportados:
- "Flujo de login básico en modo UI con evidencia y reporte"
- "Agregar producto al carrito y validarlo en modo BDD"
- "Genera test de cierre de sesión reutilizando page object y steps existentes"
- "Validar redirección incorrecta con credenciales bloqueadas y captura de mensaje"

---

## 🚀 Scripts y Comandos Disponibles

### Package.json Scripts
```json
{
  "test": "playwright test",
  "test:ui": "playwright test --ui",
  "test:debug": "playwright test --debug",
  "test:headed": "playwright test --headed",
  "test:login": "playwright test src/flow/tests/login.spec.ts --headed",
  "bdd": "cucumber-js",
  "report": "playwright show-report"
}
```

### Scripts Personalizados
- **`run-login-tests.js`** - Ejecutor especializado para pruebas de login
- **`run-login-bdd.js`** - Ejecutor para pruebas BDD de login
- **`run-ui-tests.js`** - Ejecutor general para pruebas UI
- **`scripts/run-mcp.js`** - Ejecutor para funcionalidades MCP
- **`scripts/generate-word-report.ts`** - Generador de reportes en Word

## ⚙️ Configuraciones Múltiples

### Playwright Configs
1. **`playwright.config.ts`** - Configuración principal
   - Múltiples navegadores (Chrome, Firefox, Safari)
   - Base URL configurable via ambiente
   - Screenshots y videos en fallos
   - Trace en reintentos

2. **`playwright.config.login.ts`** - Configuración específica para login
3. **`playwright.config.circulo.ts`** - Configuración para pruebas específicas
4. **`playwright.config.simple.ts`** - Configuración simplificada

### ReportPortal Configs
- **`reportportal.config.js`** - Configuración general
- **`reportportal.bdd.config.json`** - Configuración específica BDD
- **`.reportportalrc.json`** - Configuración RC

### Cucumber Config
- **`cucumber.js`** - Configuración para pruebas BDD

## 🔧 Utilidades y Helpers

### Hooks y Utilities
- **`src/utils/hooks.ts`** - Hooks para setup y screenshots
- **`src/utils/bddReportHelper.ts`** - Helper para reportes BDD
- **`src/utils/reportPortalHelper.ts`** - Integración ReportPortal
- **`src/utils/ExcelReader.ts`** - Lector de datos Excel

### MCP (Model Context Protocol) Components

#### 🤖 Servidores MCP Utilizados

##### 1. **`@executeautomation/playwright-mcp-server`**
- **Tipo:** Servidor oficial de MCP para Playwright
- **Función:** Ejecuta comandos de Playwright mediante prompts de lenguaje natural
- **Uso:** Automatización web principal
- **Ejecución:** `npx @executeautomation/playwright-mcp-server`

##### 2. **`MCP filesystem`**
- **Tipo:** Servidor MCP para operaciones de archivos
- **Función:** Permite leer, escribir y gestionar archivos del proyecto
- **Uso:** Auto-generación y mantenimiento de código
- **Referencia:** Mencionado en prompt-base-inteligente.txt para gestión de estructura de proyecto

#### 📝 Prompts Específicos Disponibles
- **`mcp/prompts/prompt-login-flow.txt`** - Flujo de login automatizado
- **`mcp/prompts/prompt carrito.txt`** - Flujo de carrito de compras
- **`mcp/prompts/circulo_credito.txt`** - Flujo específico de círculo de crédito

#### 🔧 Componentes MCP Personalizados
- **`mcp/selectorHealer.ts`** - Auto-reparación de selectores
- **`mcp/domObserver.ts`** - Observador de cambios en DOM
- **`mcp/aiAdvisor.ts`** - Asesor de IA para optimizaciones

#### 🚀 Ejecución de MCP
```bash
# Ejecutar un prompt específico
node scripts/run-mcp.js prompt-login-flow.txt

# El script combina automáticamente:
# 1. prompt-base-inteligente.txt (base)
# 2. El prompt específico elegido
# 3. Ejecuta via @executeautomation/playwright-mcp-server
```

## 🌍 Variables de Entorno

### Archivo .env (ejemplo)
```env
# URL base de la aplicación
BASE_URL=https://www.saucedemo.com

# Credenciales de prueba
TEST_USERNAME=standard_user
TEST_PASSWORD=secret_sauce

# Configuración ReportPortal
RP_ENDPOINT=https://your-rp-instance.com
RP_TOKEN=your-token-here
RP_PROJECT=your-project-name

# Configuración de ambiente
NODE_ENV=test
DEBUG=false
```

## 🏁 Flujos de Trabajo

### 1. Desarrollo de Pruebas UI
```bash
# Crear nueva prueba UI
npm run test:ui
# Ejecutar en modo debug
npm run test:debug
# Ejecutar con interfaz visible
npm run test:headed
```

### 2. Desarrollo de Pruebas BDD
```bash
# Ejecutar pruebas BDD
npm run bdd
# Ejecutar BDD específico de login
node run-login-bdd.js
```

### 3. Generación Automática con IA (MCP)
```bash
# Ejecutar prompt de login
node scripts/run-mcp.js prompt-login-flow.txt

# Ejecutar prompt de carrito
node scripts/run-mcp.js "prompt carrito.txt"

# Ejecutar prompt de círculo de crédito
node scripts/run-mcp.js circulo_credito.txt

# El sistema combina automáticamente el prompt base + el específico
```

### 4. Reportería
```bash
# Ver reporte HTML
npm run report
# Generar reporte Word
npx ts-node scripts/generate-word-report.ts
```

## 🔄 Patrones de Diseño Implementados

### 1. Page Object Model (POM)
- Separación de la lógica de la UI
- Reutilización de componentes
- Mantenimiento simplificado

### 2. Patrón BDD
- Escenarios legibles en Gherkin
- Separación Given/When/Then
- Colaboración entre equipos técnicos y no técnicos

### 3. Self-Healing Pattern
- Detección automática de cambios en selectores
- Sugerencias de selectores alternativos
- Logging de cambios para análisis

### 4. Factory Pattern
- Creación dinámica de helpers
- Configuración flexible por ambiente
- Extensibilidad para nuevos reporteros

## 🛡️ Estrategias de Mantenimiento

### Auto-healing
- Detección de selectores rotos
- Búsqueda de alternativas automáticas
- Sugerencias de mejoras

### Logging Inteligente
- Logs estructurados en ReportPortal
- Capturas automáticas en fallos
- Trazabilidad completa de ejecución

### Gestión de Datos
- Datos de prueba externalizados en Excel
- Variables de entorno para configuración
- Separación por ambientes

## 🔮 Capacidades de IA Integradas

### Model Context Protocol (MCP)
El proyecto implementa MCP para:
- **Generación automática de código** basada en prompts
- **Análisis del DOM** para mejores selectores
- **Sugerencias de optimización** en tiempo real
- **Auto-reparación de pruebas** cuando cambia la UI

### Prompt Engineering
El archivo `prompt-base-inteligente.txt` contiene:
- **214 líneas de instrucciones específicas**
- **Patrones de nomenclatura** consistentes
- **Estrategias de reutilización** de código
- **Manejo de errores** inteligente
- **Integración con herramientas** de reportería

## 🎯 Casos de Uso Principal

### Ejemplo: Flujo de Login Automatizado
```typescript
// Prompt de ejemplo del archivo prompt-base-inteligente.txt:
"Flujo de login con credenciales válidas en modo UI.
Usar como URL base la definida en el archivo .env (BASE_URL).

Escenario:
- Ir a la página de login
- Ingresar el usuario definido en TEST_USERNAME
- Ingresar la contraseña definida en TEST_PASSWORD
- Hacer clic en el botón de login
- Validar que el usuario sea redirigido al inventario correctamente
- Capturar evidencia por paso y guardar video

Generar:
- El archivo src/flow/tests/login.spec.ts usando POM
- El Page Object src/flow/pages/LoginPage.ts si no existe"
```

## 🚀 Próximos Pasos y Evolución

### Funcionalidades Planificadas
1. **Integración con CI/CD** más robusta
2. **Dashboard en tiempo real** de ejecución
3. **IA predictiva** para detectar problemas antes de que ocurran
4. **Integración con herramientas de monitoreo** de aplicaciones

### Extensibilidad
- **Plugins personalizados** para diferentes dominios
- **Conectores** a bases de datos adicionales
- **Reporteros** para otras plataformas
- **Integraciones** con herramientas de testing adicionales

---

## 📞 Contexto para IA Generativa

**Para otra IA que necesite trabajar con este proyecto:**

1. **Sempre revisar** el archivo `prompt-base-inteligente.txt` antes de generar código
2. **Utilizar las rutas establecidas** en la estructura del proyecto
3. **Mantener consistencia** con los patrones existentes
4. **Reutilizar componentes** antes de crear nuevos
5. **Seguir las convenciones** de nomenclatura definidas
6. **Integrar con ReportPortal** para trazabilidad
7. **Generar evidencias** automáticamente
8. **Manejar errores** de forma inteligente
9. **Usar variables de entorno** para configuración
10. **Mantener separación** entre pruebas UI y BDD

Este framework está diseñado para ser **auto-mantenible** y **extensible** mediante IA, con patrones claros y documentación exhaustiva para facilitar la generación automática de pruebas de alta calidad.

---

*Documentación generada automáticamente - Versión 1.0*
*Proyecto: Playwright Hybrid Framework Refactorizado*
*Fecha: Diciembre 2024* 