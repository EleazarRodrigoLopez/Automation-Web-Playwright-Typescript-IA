import { chromium } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

async function inspectLoginPage() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    const baseUrl = process.env.BAL_BASE_URL || 'https://grupobalstage.prod.acquia-sites.com/ingresar';
    await page.goto(baseUrl);
    
    console.log('📍 Página cargada. Inspecciona manualmente los selectores.');
    console.log('🔍 Abre DevTools (F12) y encuentra:');
    console.log('   1. Input de email');
    console.log('   2. Input de password');
    console.log('   3. Botón de login/enviar');
    
    // Mantener la página abierta para inspeccionar
    await page.pause();
    
  } finally {
    await browser.close();
  }
}

inspectLoginPage().catch(console.error);
