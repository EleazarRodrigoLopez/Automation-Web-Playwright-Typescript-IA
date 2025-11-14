import { chromium } from '@playwright/test';
import fs from 'fs';

async function inspectLoginPage() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('🌐 Navegando a la página de login de BAL...');
    await page.goto('https://grupobalstage.prod.acquia-sites.com/ingresar', {
      waitUntil: 'domcontentloaded'
    });
    
    // Esperar a que la página cargue completamente
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    console.log('📸 Tomando captura inicial...');
    await page.screenshot({ path: 'screenshots/ui/bal-login-inspect.png', fullPage: true });
    
    // Obtener información de los elementos
    const emailInputs = await page.$$eval('input[type="email"], input[name*="email" i], input[name*="correo" i], input[placeholder*="email" i], input[placeholder*="correo" i]', els => 
      els.map(el => ({
        tag: el.tagName,
        type: el.getAttribute('type'),
        name: el.getAttribute('name'),
        id: el.getAttribute('id'),
        placeholder: el.getAttribute('placeholder'),
        class: el.getAttribute('class'),
        selector: el.id ? `#${el.id}` : el.name ? `input[name="${el.name}"]` : `input[placeholder="${el.getAttribute('placeholder')}"]`
      }))
    );
    
    const passwordInputs = await page.$$eval('input[type="password"], input[name*="password" i], input[name*="contraseña" i], input[placeholder*="password" i], input[placeholder*="contraseña" i]', els => 
      els.map(el => ({
        tag: el.tagName,
        type: el.getAttribute('type'),
        name: el.getAttribute('name'),
        id: el.getAttribute('id'),
        placeholder: el.getAttribute('placeholder'),
        class: el.getAttribute('class'),
        selector: el.id ? `#${el.id}` : el.name ? `input[name="${el.name}"]` : `input[placeholder="${el.getAttribute('placeholder')}"]`
      }))
    );
    
    const buttons = await page.$$eval('button, input[type="submit"]', els => 
      els.map(el => ({
        tag: el.tagName,
        type: el.getAttribute('type'),
        text: el.textContent?.trim() || '',
        id: el.getAttribute('id'),
        class: el.getAttribute('class'),
        name: el.getAttribute('name'),
        dataTestid: el.getAttribute('data-testid'),
        selector: el.id ? `#${el.id}` : el.textContent?.trim() ? `${el.tagName}:text("${el.textContent?.trim()}")` : el.getAttribute('data-testid') ? `[data-testid="${el.getAttribute('data-testid')}"]` : `${el.tagName}[type="${el.getAttribute('type') || ''}"]`
      }))
    );
    
    const report = {
      timestamp: new Date().toISOString(),
      url: page.url(),
      emailInputs,
      passwordInputs,
      buttons
    };
    
    console.log('\n📋 INSPECCIÓN COMPLETADA:\n');
    console.log('Email inputs encontrados:', emailInputs.length);
    if (emailInputs.length > 0) {
      console.log('Email input selector:', emailInputs[0].selector);
    }
    
    console.log('\nPassword inputs encontrados:', passwordInputs.length);
    if (passwordInputs.length > 0) {
      console.log('Password input selector:', passwordInputs[0].selector);
    }
    
    console.log('\nBotones encontrados:', buttons.length);
    buttons.forEach((btn, idx) => {
      console.log(`  ${idx + 1}. ${btn.text} - selector: ${btn.selector}`);
    });
    
    // Guardar reporte en JSON
    fs.writeFileSync('screenshots/ui/bal-login-inspection-report.json', JSON.stringify(report, null, 2));
    console.log('\n✅ Reporte guardado en: screenshots/ui/bal-login-inspection-report.json');
    
  } catch (error) {
    console.error('❌ Error durante la inspección:', error);
  } finally {
    await browser.close();
  }
}

inspectLoginPage();
