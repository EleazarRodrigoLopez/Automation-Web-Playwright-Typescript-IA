const { chromium } = require('playwright');
const path = require('path');

async function testLoginClick() {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    
    try {
        console.log('🔍 Navegando a BAL...');
        await page.goto('https://grupobalstage.prod.acquia-sites.com/ingresar', {
            waitUntil: 'domcontentloaded'
        });
        
        await page.waitForTimeout(2000);
        
        // Inspeccionar el botón ANTES de hacer click
        const buttonInfo = await page.evaluate(() => {
            const btn = document.querySelector('#edit-submit');
            if (!btn) return 'BOTÓN NO ENCONTRADO';
            
            return {
                type: btn.getAttribute('type'),
                name: btn.getAttribute('name'),
                value: btn.getAttribute('value'),
                className: btn.getAttribute('class'),
                disabled: btn.hasAttribute('disabled'),
                visible: btn.offsetHeight > 0 && btn.offsetWidth > 0,
                clickable: window.getComputedStyle(btn).pointerEvents !== 'none'
            };
        });
        
        console.log('📋 Info del botón ANTES de click:', JSON.stringify(buttonInfo, null, 2));
        
        // Ingresar datos
        console.log('📝 Ingresando credenciales...');
        await page.fill('#edit-name', 'testing_bside@bal.com.mx');
        await page.waitForTimeout(100);
        
        // Disparar eventos para que el formulario reconozca el cambio
        await page.evaluate(() => {
            const emailInput = document.querySelector('#edit-name');
            if (emailInput) {
                emailInput.dispatchEvent(new Event('change', { bubbles: true }));
                emailInput.dispatchEvent(new Event('input', { bubbles: true }));
                emailInput.dispatchEvent(new Event('blur', { bubbles: true }));
            }
        });
        await page.waitForTimeout(500);
        
        await page.fill('#edit-pass', 'Password123');
        await page.waitForTimeout(100);
        
        // Disparar eventos en el password
        await page.evaluate(() => {
            const passInput = document.querySelector('#edit-pass');
            if (passInput) {
                passInput.dispatchEvent(new Event('change', { bubbles: true }));
                passInput.dispatchEvent(new Event('input', { bubbles: true }));
                passInput.dispatchEvent(new Event('blur', { bubbles: true }));
            }
        });
        await page.waitForTimeout(500);
        
        console.log('🖱️  Intentando hacer click en el botón...');
        
        // Método 1: Click normal
        try {
            await page.click('#edit-submit');
            console.log('✅ Click normal ejecutado');
        } catch (e) {
            console.log('❌ Click normal falló:', e.message);
        }
        
        // Esperar para ver si se redirige
        await page.waitForTimeout(5000);
        
        const finalUrl = page.url();
        console.log('📍 URL después del click:', finalUrl);
        
        // Inspeccionar página después del click
        const pageState = await page.evaluate(() => {
            return {
                url: window.location.href,
                title: document.title,
                errorMessages: Array.from(document.querySelectorAll('[role="alert"]')).map(e => e.textContent),
                stillOnLogin: !!document.querySelector('#edit-submit')
            };
        });
        
        console.log('📊 Estado de la página después:', JSON.stringify(pageState, null, 2));
        
        if (finalUrl.includes('ingresar')) {
            console.log('⚠️  Aún estamos en la página de login - el click no funcionó o hay validación fallida');
        } else {
            console.log('✅ Se redirigió correctamente');
        }
        
        // Dejar el navegador abierto un poco para inspección
        await page.waitForTimeout(3000);
        
    } catch (error) {
        console.error('❌ Error durante el test:', error);
    } finally {
        await browser.close();
    }
}

testLoginClick().catch(console.error);
