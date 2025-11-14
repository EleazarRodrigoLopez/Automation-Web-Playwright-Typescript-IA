# Tests BAL - Documentación Completa

## 📋 Resumen

Se han creado tests completos para validar todas las funcionalidades de la plataforma BAL usando **Playwright en modo UI** (sin BDD). Los tests incluyen:

- ✅ Login y autenticación
- ✅ Perfil de usuario (cambiar contraseña, cerrar sesión, cancelar cuenta)
- ✅ Iniciativas (navegación, filtros, paginación, comunicados de presidencia)
- ✅ Eventos (semana, mes, año, detalle, agregar a calendarios)
- ✅ Noticias (filtros por categoría y programa, detalle, contenido relacionado)
- ✅ Comunidad Baleña (beneficios, promociones, detalles)

---

## 📁 Estructura de Archivos

### Page Objects (`src/flow/pages/`)
```
BalLoginPage.ts          - Login y autenticación
BalProfilePage.ts        - Gestión de perfil
BalInitiativesPage.ts    - Iniciativas y comunicados
BalEventsPage.ts         - Eventos y calendarios
BalNewsPage.ts           - Noticias y filtros
BalCommunityPage.ts      - Comunidad y beneficios
```

### Tests (`src/flow/tests/`)
```
bal-login.spec.ts        - Tests de login
bal-profile.spec.ts      - Tests de perfil
bal-initiatives.spec.ts  - Tests de iniciativas
bal-events.spec.ts       - Tests de eventos
bal-news.spec.ts         - Tests de noticias
bal-community.spec.ts    - Tests de comunidad
```

---

## 🚀 Ejecución de Tests

### Ejecutar un test específico
```bash
npm run test:bal-login      # Login
npm run test:bal-profile    # Perfil
npm run test:bal-initiatives # Iniciativas
npm run test:bal-events     # Eventos
npm run test:bal-news       # Noticias
npm run test:bal-community  # Comunidad
```

### Ejecutar todos los tests de BAL
```bash
npm run test:bal-all
```

### Ejecutar en modo UI interactivo
```bash
npx playwright test src/flow/tests/bal-login.spec.ts --ui
```

### Ejecutar con debug
```bash
npx playwright test src/flow/tests/bal-login.spec.ts --debug
```

---

## 📸 Captura de Evidencias

Todos los tests capturan evidencias en:
```
screenshots/ui/
├── bal-login/              # Evidencias de login
├── bal-profile/            # Evidencias de perfil
├── bal-initiatives/        # Evidencias de iniciativas
├── bal-events/             # Evidencias de eventos
├── bal-news/               # Evidencias de noticias
└── bal-community/          # Evidencias de comunidad
```

Cada paso del test genera una captura de pantalla con formato: `{nombre-flujo}-step{X}.png`

---

## 🔐 Configuración de Credenciales

Las credenciales se cargan desde variables de entorno (`.env`):

```env
BAL_BASE_URL=https://grupobalstage.prod.acquia-sites.com/ingresar
BAL_TEST_EMAIL=testing_bside@bal.com.mx
BAL_TEST_PASSWORD=Bside123456*
```

Si no existen, se usan valores por defecto.

---

## 📊 Integración con ReportPortal

Todos los tests envían logs y evidencias a ReportPortal mediante `ReportPortalHelper`:

- Cada paso genera un log con nivel INFO/WARN/ERROR
- Las capturas se adjuntan automáticamente
- Los errores incluyen screenshot de error

---

## ✅ Casos de Prueba

### Login (`bal-login.spec.ts`)
- ✅ Login exitoso con credenciales válidas
- ✅ Login fallido con credenciales inválidas

### Perfil (`bal-profile.spec.ts`)
- ✅ Cambiar contraseña - Navegación exitosa
- ✅ Cerrar sesión exitosamente
- ✅ Cancelar cuenta - Funcionalidad no disponible

### Iniciativas (`bal-initiatives.spec.ts`)
- ✅ Navegar entre iniciativas y usar filtros
- ✅ Validar paginación de iniciativas
- ✅ Ver comunicados de presidencia por mes

### Eventos (`bal-events.spec.ts`)
- ✅ Ver eventos de esta semana
- ✅ Ver eventos de este mes
- ✅ Ver eventos de este año
- ✅ Ver detalle de evento y agregar a calendarios

### Noticias (`bal-news.spec.ts`)
- ✅ Filtrar noticias por categoría
- ✅ Filtrar noticias por programa
- ✅ Ver detalle de noticia y contenido relacionado

### Comunidad (`bal-community.spec.ts`)
- ✅ Ver beneficios de empleados
- ✅ Ver promociones de empleados
- ✅ Ver detalle de beneficio
- ✅ Navegar entre beneficios y promociones

---

## 🛠️ Buenas Prácticas Implementadas

1. **Page Object Model (POM)**: Separación clara entre lógica y localizadores
2. **Reutilización de código**: Métodos compartidos en BasePage
3. **Manejo de errores**: Try/catch con logs descriptivos
4. **Evidencia por paso**: Screenshot después de cada acción importante
5. **Integración con ReportPortal**: Logs automáticos en cada paso
6. **Selectors flexibles**: Múltiples opciones de selección (data-test, aria-label, texto)
7. **Configuración externa**: Uso de variables de entorno
8. **Waits inteligentes**: waitForLoadState('networkidle') en navegaciones
9. **Validaciones explícitas**: expect() para cada resultado crítico
10. **Tratamiento de excepciones**: Try/catch/finally con manejo graceful

---

## ⚠️ Notas Importantes

### Selectores
Los selectores están construidos con múltiples opciones para mayor flexibilidad:
- `[data-test="..."]` (recomendado)
- `aria-label*="..."` (accesibilidad)
- `:text("...")`  (texto visible)
- Selectores CSS genéricos

Si los selectores no coinciden con la página real, es necesario actualizarlos.

### Manejo de Errores
Los tests incluyen bloques try/catch para:
- Funcionalidades no disponibles (WARN)
- Errores genuinos (ERROR)
- Permite que otros tests continúen

### Configuración de Timeout
- Global: 30 segundos (Playwright)
- Por paso: 1-3 segundos (esperas de carga)
- Por elemento: 5 segundos (waitForSelector)

---

## 🔧 Extensión de Tests

Para agregar más tests:

1. **Crear Page Object** en `src/flow/pages/{nombre}.ts`
   ```typescript
   export class Bal{Nombre}Page extends BasePage {
     constructor(page: Page) { super(page); }
     // métodos aquí
   }
   ```

2. **Crear Tests** en `src/flow/tests/bal-{nombre}.spec.ts`
   ```typescript
   test.describe('Flujo de {Nombre} BAL - Modo UI', () => {
     // tests aquí
   });
   ```

3. **Agregar Script npm** en `package.json`
   ```json
   "test:bal-{nombre}": "playwright test src/flow/tests/bal-{nombre}.spec.ts --headed"
   ```

---

## 📝 Tipos TypeScript

Se han actualizado los tipos en `src/types/playwright.d.ts` para agregar:
- `waitForLoadState()`
- `url()`
- `count()`
- `selectOption()`
- `first()`
- `toBeGreaterThan()`
- `toBeTruthy()`

---

## 🎯 Próximos Pasos Opcionales

1. Implementar datos de prueba desde JSON
2. Agregar tests de rendimiento
3. Integrar con CI/CD pipeline
4. Agregar tests de accesibilidad
5. Crear tests parametrizados
6. Implementar retry logic avanzada

---

## 📞 Soporte

Para problemas con los tests:

1. Verificar que `.env` tiene las credenciales correctas
2. Revisar los selectores en la página actual
3. Verificar que la URL base es correcta
4. Consultar ReportPortal para logs detallados
5. Ejecutar con `--debug` para inspeccionar paso a paso

