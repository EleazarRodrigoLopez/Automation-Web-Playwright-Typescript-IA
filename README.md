# Playwright Hybrid Framework

Este proyecto implementa un framework híbrido de automatización utilizando Playwright, soportando tanto pruebas escritas en TypeScript como BDD con Cucumber.

## Estructura del Proyecto

```
playwright-hybrid-framework/
├── src/
│   ├── bdd/           # Archivos relacionados con BDD (Cucumber)
│   │   └── steps/     # Definiciones de pasos para escenarios BDD
│   ├── flow/          # Pruebas de flujo tradicionales
│   │   ├── pages/     # Page Objects para los flujos de prueba
│   │   └── tests/     # Pruebas de flujo escritas en TypeScript
│   ├── types/         # Definiciones de tipos TypeScript
│   └── utils/         # Utilidades y helpers
├── screenshots/       # Capturas de pantalla generadas durante las pruebas
├── .env               # Variables de entorno
├── .env.example       # Ejemplo de archivo de variables de entorno
├── package.json       # Dependencias y scripts del proyecto
├── playwright.config.ts  # Configuración de Playwright
└── tsconfig.json      # Configuración de TypeScript
```

## Requisitos previos

- Node.js 16 o superior
- npm 7 o superior

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:
   ```
   npm install
   ```
3. Instalar navegadores de Playwright:
   ```
   npx playwright install
   ```

## Configuración

1. Copiar el archivo `.env.example` a `.env`
2. Actualizar las variables según sea necesario

## Ejecución de Pruebas

### Pruebas de Flujo (TypeScript)

```
npm test
```

### Pruebas con interfaz de usuario visible

```
npm run test:headed
```

### Pruebas en modo debug

```
npm run test:debug
```

### Ejecutar prueba de login específica

```
npm run test:login
```

### Abrir reporte de pruebas

```
npm run report
```

## Autores

- Equipo de QA

## Licencia

Este proyecto está licenciado bajo ISC.