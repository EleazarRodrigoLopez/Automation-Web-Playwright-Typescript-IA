import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Carga de variables de entorno
dotenv.config();

export default defineConfig({
  testDir: './src',
  /* Timeout de test: 60 segundos */
  timeout: 60000,
  /* Se detiene al primer fallo */
  fullyParallel: true,
  /* No fallar el conjunto si hay pruebas que fallan */
  forbidOnly: !!process.env.CI,
  /* Reintentar las pruebas que fallan */
  retries: process.env.CI ? 2 : 0,
  /* Usar el último conjunto de workers */
  workers: process.env.CI ? 1 : undefined,
  /* Reportero a usar */
  reporter: [
    ['html'],
    ['list']
  ],
  /* Configuración compartida para todos los proyectos */
  use: {
    /* Base URL a usar en la navegación si no se proporciona una URL */
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',

    /* Maximum time each action can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    
    /* Recoger información de rastreo cuando falla una prueba */
    trace: 'on-first-retry',
    
    /* Tomar capturas de pantalla en fallos */
    screenshot: 'only-on-failure',
    
    /* Vídeo en fallos */
    video: 'on-first-retry',
  },

  /* Ejecutar en diferentes navegadores */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    /*{
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }, */
  ],
});