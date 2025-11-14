#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting SauceDemo Login UI Tests...');
console.log('📋 Running login flow tests in UI mode');
console.log('📸 Screenshots will be saved in ./screenshots/ui/login/');
console.log('🎭 Tests will run in UI mode (browser visible)');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

try {
  // Verificar que el archivo de test existe
  const testFile = 'src/flow/tests/login.spec.ts';
  if (!fs.existsSync(testFile)) {
    console.error(`❌ Test file not found: ${testFile}`);
    process.exit(1);
  }

  // Verificar que el page object existe
  const pageObjectFile = 'src/flow/pages/LoginPage.ts';
  if (!fs.existsSync(pageObjectFile)) {
    console.error(`❌ Page Object file not found: ${pageObjectFile}`);
    process.exit(1);
  }

  // Crear directorio de screenshots si no existe
  const screenshotDir = 'screenshots/ui/login';
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
    console.log(`📁 Created screenshot directory: ${screenshotDir}`);
  }

  // Verificar que existe el archivo .env
  if (!fs.existsSync('.env')) {
    console.log('⚠️  Warning: .env file not found');
    console.log('📝 Create .env file with:');
    console.log('   BASE_URL=https://www.saucedemo.com');
    console.log('   TEST_USERNAME=standard_user');
    console.log('   TEST_PASSWORD=secret_sauce');
    console.log('');
  }

  // Ejecutar tests
  const command = `npx playwright test ${testFile} --headed --workers=1 --reporter=html`;
  console.log(`🎯 Executing: ${command}`);
  console.log('');

  execSync(command, { stdio: 'inherit' });

  console.log('');
  console.log('✅ All login tests completed successfully!');
  console.log('📊 Test Results Summary:');
  console.log('   • Login with valid credentials: ✅ Expected to PASS');
  console.log('   • Login with invalid credentials: ❌ Expected to FAIL (Validation)');
  console.log('');
  console.log('📋 Generated Files:');
  console.log('   • Screenshots: ./screenshots/ui/login/');
  console.log('   • HTML Report: ./playwright-report/index.html');
  console.log('   • Videos: ./test-results/ (if any test failed)');
  console.log('');
  console.log('🎉 Login UI tests execution completed!');

} catch (error) {
  console.error('❌ Error running login tests:', error.message);
  console.log('');
  console.log('🔧 Troubleshooting:');
  console.log('   1. Verify Playwright is installed: npx playwright install');
  console.log('   2. Check internet connectivity to https://www.saucedemo.com');
  console.log('   3. Verify .env file exists with correct credentials');
  console.log('   4. Check file permissions for screenshot directory');
  console.log('   5. Verify TypeScript compilation: npx tsc --noEmit');
  process.exit(1);
} 