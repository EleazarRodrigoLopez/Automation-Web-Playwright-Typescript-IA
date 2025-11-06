# Login Tests - UI Mode

Este archivo documenta las pruebas de login implementadas siguiendo las reglas del `prompt-base-inteligente.txt`.

## Archivos Creados

### 1. Page Object Model
- **Archivo**: `src/flow/pages/LoginPage.ts`
- **Propósito**: Implementa el patrón Page Object Model para la página de login
- **Funcionalidades**:
  - Navegación a la página de login
  - Ingreso de credenciales
  - Validación de login exitoso
  - Validación de errores

### 2. Test de UI
- **Archivo**: `src/flow/tests/login.spec.ts`
- **Propósito**: Pruebas de UI para el flujo de login
- **Casos de prueba**:
  - Login con credenciales válidas
  - Login con credenciales inválidas

### 3. Declaraciones de Tipos
- **Archivo**: `src/types/flow/pages/LoginPage.d.ts`
- **Propósito**: Declaraciones TypeScript para el Page Object

## Configuración de Variables de Entorno

El test utiliza las siguientes variables de entorno (crear archivo `.env` en la raíz del proyecto):

```env
# Base URL for the application
BASE_URL=https://www.saucedemo.com

# Test credentials
TEST_USERNAME=standard_user
TEST_PASSWORD=secret_sauce

# ReportPortal configuration
REPORT_PORTAL_URL=https://rp.your-company.com
REPORT_PORTAL_PROJECT=your-project
REPORT_PORTAL_TOKEN=your-token
```

## Funcionalidades Implementadas

### ✅ Cumplimiento de Reglas del Prompt

1. **Patrón Page Object Model**: ✅ Implementado en `LoginPage.ts`
2. **Variables de Entorno**: ✅ Uso de `process.env` para credenciales
3. **Evidencias por Paso**: ✅ Screenshots capturados en cada paso
4. **Integración ReportPortal**: ✅ Logs enviados con `ReportPortalHelper`
5. **Validaciones con expect()**: ✅ Validaciones robustas implementadas
6. **Estructura de Directorios**: ✅ Siguiendo la estructura definida
7. **Reutilización de Componentes**: ✅ Utilizando utilidades existentes
8. **Manejo de Errores**: ✅ Casos de éxito y error implementados

### 📸 Capturas de Pantalla

Las capturas se guardan en: `screenshots/ui/login/`

- `login-step1.png` - Navegación a página de login
- `login-step2.png` - Ingreso de usuario
- `login-step3.png` - Ingreso de contraseña
- `login-step4.png` - Clic en botón de login
- `login-step5.png` - Validación de redirección
- `login-step6.png` - Validación de elementos del inventario

### 🔧 Integración con ReportPortal

Cada paso del test envía información a ReportPortal:
- **Logs informativos** con descripción del paso
- **Capturas adjuntas** como evidencia
- **Manejo de errores** con logs de nivel ERROR

## Ejecución de las Pruebas

### Ejecutar solo las pruebas de login:
```bash
npx playwright test src/flow/tests/login.spec.ts
```

### Ejecutar con interfaz gráfica:
```bash
npx playwright test src/flow/tests/login.spec.ts --ui
```

### Ejecutar con reporte:
```bash
npx playwright test src/flow/tests/login.spec.ts --reporter=html
```

## Estructura del Test

### Test 1: Login con Credenciales Válidas
1. Navegar a la página de login
2. Ingresar usuario desde `TEST_USERNAME`
3. Ingresar contraseña desde `TEST_PASSWORD`
4. Hacer clic en botón de login
5. Validar redirección al inventario
6. Validar elementos del inventario

### Test 2: Login con Credenciales Inválidas
1. Navegar a la página de login
2. Intentar login con credenciales inválidas
3. Validar mensaje de error

## Funcionalidades del Page Object

### LoginPage
- `navigateToLogin()`: Navega a la página de login
- `enterUsername(username)`: Ingresa el nombre de usuario
- `enterPassword(password)`: Ingresa la contraseña
- `clickLoginButton()`: Hace clic en el botón de login
- `login(username, password)`: Flujo completo de login
- `validateSuccessfulLogin()`: Valida login exitoso
- `validateErrorMessage()`: Valida mensaje de error
- `getErrorMessageText()`: Obtiene el texto del error

## Selectores Utilizados

- `#user-name`: Campo de usuario
- `#password`: Campo de contraseña
- `#login-button`: Botón de login
- `[data-test="error"]`: Mensaje de error
- `#inventory_container`: Contenedor del inventario
- `.inventory_item`: Elementos del inventario
- `#react-burger-menu-btn`: Botón de menú
- `.app_logo`: Logo de la aplicación

## Notas Técnicas

- **Compatibilidad**: Funciona con Chromium, Firefox y WebKit
- **Timeouts**: Configurados automáticamente por Playwright
- **Retries**: Configurados en `playwright.config.ts`
- **Videos**: Se graban en fallos (configurado en playwright.config.ts)
- **Traces**: Disponibles en primer retry

## Siguientes Pasos

Para extender estas pruebas, considera:
1. Agregar más casos de prueba (usuarios bloqueados, etc.)
2. Implementar pruebas de logout
3. Agregar validaciones adicionales de UI
4. Crear pruebas de rendimiento
5. Implementar pruebas de accesibilidad 